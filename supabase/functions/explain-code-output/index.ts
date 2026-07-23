// supabase/functions/explain-code-output/index.ts
// Backs the "AI Açıkla" button shown after a runtime editor (PyodideEditor/
// TSEditor/JSEditor/SQLEditor in TopicPage.jsx) produces output that does NOT
// match the block's `expected` field. Different concern from
// explain-code-practice: that function compares SOURCE CODE (solutionCode vs
// userCode) for CodePlaygroundBlock's string-diff exercises. Here the student's
// code actually RUNS — the deterministic panel already shows "Expected: X"
// next to the real captured output, so this function must reason about WHY
// the student's own code logic produced the wrong output, not repeat the diff.
//
// Deploy: supabase functions deploy explain-code-output --project-ref <ref>
// Reuses the same GROQ_API_KEY secret already set for qa-assistant /
// explain-quiz-answer / explain-code-practice / grade-interview-answer / judge-eval.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

const SYSTEM_PROMPT = `Sen bir QA otomasyon eğitmenisin. Sana bir kod pratiği görevi (task, opsiyonel),
BEKLENEN ÇIKTI (expectedOutput), ÖĞRENCİNİN YAZDIĞI KOD (userCode) ve bu kodun
GERÇEKTEN ÜRETTİĞİ ÇIKTI (actualOutput) verilecek. Öğrencinin kodu GERÇEKTEN
ÇALIŞTIRILDI — bu bir statik string karşılaştırması değil.

Görevin, öğrencinin YAZDIĞI kodun MANTIĞINA bakarak, kısa (2-4 cümle) bir açıklama yazmak:

- "Beklenen çıktı X, senin çıktın Y" gibi farkın kendisini TEKRAR ETME — bu zaten
  ayrıca kullanıcıya gösteriliyor. Bunun yerine kodun İÇİNDE bu farka yol açan
  MANTIK hatasını somut şekilde göster (örn. yanlış koşul, yanlış metod çağrısı,
  eksik/fazla döngü adımı, yanlış format string, off-by-one hata vb.).
- Mümkünse bu tür bir mantık hatasının gerçek bir otomasyon/QA senaryosunda
  (yanlış assertion, sessizce yanlış geçen bir test, production'da yanlış log
  formatı) nasıl bir soruna yol açabileceğine dair tek cümlelik bir not ekle.

DİL KURALI (KESİN — İSTİSNASIZ):
- Kullanıcı arayüzü dili Türkçe (tr) ise: yanıtın TAMAMI Türkçe olmalı.
- Kullanıcı arayüzü dili İngilizce (en) ise: yanıtın TAMAMI İngilizce olmalı.
- Hangi dil seçilmiş olursa olsun: Çince, Japonca, Korece veya Latin alfabesi dışındaki
  HİÇBİR alfabe/karakter kullanma. Teknik terimler (assertion, fixture, locator vb.)
  Latin harfleriyle olduğu gibi kalır.
- "DİL:" satırı hangi dili belirtiyorsa YALNIZCA o dilde yaz.

SADECE açıklama metnini yaz, markdown başlık veya JSON kullanma — düz, sıcak, mentor
tonunda bir paragraf.`

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function jsonResponse(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

    try {
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) return jsonResponse({ error: 'Missing Authorization header' }, 401)

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: authHeader } } }
        )

        // Sadece üyeler — AI maliyeti anonim trafikten korunsun (diğer AI
        // fonksiyonlarıyla aynı politika: explain-quiz-answer, explain-code-practice,
        // judge-eval, grade-interview-answer).
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler AI açıklaması alabilir. / Members only.' }, 401)
        }

        const { task, expectedOutput, userCode, actualOutput, lang } = await req.json()
        if (!expectedOutput || userCode === undefined || actualOutput === undefined) {
            return jsonResponse({ error: 'expectedOutput, userCode and actualOutput are required' }, 400)
        }

        const promptInput = [
            task ? `GÖREV: ${String(task).slice(0, 800)}` : '',
            `ÖĞRENCİNİN KODU:\n${String(userCode).slice(0, 1500)}`,
            `BEKLENEN ÇIKTI:\n${String(expectedOutput).slice(0, 500)}`,
            `GERÇEKTEN ÜRETİLEN ÇIKTI:\n${String(actualOutput).slice(0, 500)}`,
            `DİL: ${lang === 'tr' ? 'Türkçe' : 'English'}`,
        ].filter(Boolean).join('\n\n')

        const groqApiKey = Deno.env.get('GROQ_API_KEY')
        if (!groqApiKey) return jsonResponse({ error: 'AI servisi yapılandırılmadı.' }, 500)

        let explanation: string
        try {
            explanation = await callGroq(
                groqApiKey,
                [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: promptInput }],
                { temperature: 0.4, maxTokens: 300 }
            )
        } catch (err) {
            return jsonResponse({ error: (err as Error).message }, 502)
        }

        return jsonResponse({
            explanation: explanation.trim() || (lang === 'tr' ? 'Şu anda ek açıklama üretilemedi.' : 'Could not generate an extra explanation right now.'),
        })
    } catch (error) {
        console.error('explain-code-output function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
