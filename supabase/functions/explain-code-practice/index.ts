// supabase/functions/explain-code-practice/index.ts
// Backs the "AI Açıkla" button shown after a code-playground (CodePlaygroundBlock)
// practice/fix attempt fails. The local diagnostic (firstDifferentLine) already
// tells the user WHICH line differs — this function explains WHY the user's own
// code produces the wrong result, in plain language, so the user learns the
// underlying reasoning instead of just copy-pasting the expected line.
//
// Deploy: supabase functions deploy explain-code-practice --project-ref <ref>
// Reuses the same GROQ_API_KEY secret already set for qa-assistant /
// explain-quiz-answer / grade-interview-answer / judge-eval.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

const SYSTEM_PROMPT = `Sen bir QA otomasyon eğitmenisin. Sana bir kod pratiği görevi (task),
beklenen doğru çözüm (solutionCode) ve ÖĞRENCİNİN YAZDIĞI kod (userCode) verilecek.
Görevin, öğrencinin YAZDIĞI koda özel, kısa (2-4 cümle) bir açıklama yazmak:

- Öğrencinin kodu ile beklenen çözüm arasındaki farkı (satır bazlı ipucu zaten ayrıca
  gösteriliyor, onu tekrar etme) NEDEN yanlış olduğunu somut şekilde açıkla — "doğru kod
  şu" demek yetmez, öğrencinin muhtemel düşünce hatasını adresle (örn. yanlış metod,
  eksik parametre, yanlış sıralama, tip hatası vb.).
- Mümkünse bu hatanın gerçek bir otomasyon/QA senaryosunda (flaky test, yanlış PASS,
  production'da sessiz bug) nasıl bir soruna yol açabileceğine dair tek cümlelik bir
  not ekle.

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
        // fonksiyonlarıyla aynı politika: explain-quiz-answer, judge-eval, grade-interview-answer).
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler AI açıklaması alabilir. / Members only.' }, 401)
        }

        const { task, solutionCode, userCode, diagnosticLine, lang } = await req.json()
        if (!solutionCode || userCode === undefined) {
            return jsonResponse({ error: 'solutionCode and userCode are required' }, 400)
        }

        const promptInput = [
            task ? `GÖREV: ${String(task).slice(0, 800)}` : '',
            `BEKLENEN ÇÖZÜM:\n${String(solutionCode).slice(0, 1500)}`,
            `ÖĞRENCİNİN KODU:\n${String(userCode).slice(0, 1500)}`,
            diagnosticLine ? `SATIR BAZLI İPUCU (zaten ayrıca gösteriliyor, tekrar etme): ${String(diagnosticLine).slice(0, 300)}` : '',
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
        console.error('explain-code-practice function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
