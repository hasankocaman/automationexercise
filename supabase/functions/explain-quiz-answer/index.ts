// supabase/functions/explain-quiz-answer/index.ts
// Backs the "AI Açıklama" panel shown right after a quiz/quiz-fill question is
// answered. The static `explanation` already in the data is the same for every
// user — this function personalizes it: it explains specifically why the user's
// own choice was right or wrong, not just what the correct answer is.
//
// Deploy: supabase functions deploy explain-quiz-answer --project-ref <ref>
// Reuses the same GROQ_API_KEY secret already set for qa-assistant.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

const SYSTEM_PROMPT = `Sen bir QA otomasyon eğitmenisin. Sana bir çoktan seçmeli/boşluk
doldurma quiz sorusu, doğru cevap, statik bir açıklama metni ve ÖĞRENCİNİN SEÇTİĞİ CEVAP
verilecek. Görevin, öğrencinin SEÇTİĞİ cevaba özel, kısa (2-4 cümle) bir açıklama yazmak:

- Öğrenci YANLIŞ seçtiyse: onun seçtiği cevabın neden yanlış olduğunu somut şekilde açıkla
  (genel "doğru cevap X" demek yetmez — onun düşünce hatasını adresle).
- Öğrenci DOĞRU seçtiyse: seçimini kısaca onayla ve konuyu bir adım daha derinleştiren ek bir
  detay/uyarı/gerçek hayat notu ekle (sadece "doğru!" deme, öğretmeye devam et).

DİL KURALI (KESİN — İSTİSNASIZ):
- Kullanıcı arayüzü dili Türkçe (tr) ise: yanıtın TAMAMI Türkçe olmalı.
- Kullanıcı arayüzü dili İngilizce (en) ise: yanıtın TAMAMI İngilizce olmalı.
- Hangi dil seçilmiş olursa olsun: Çince, Japonca, Korece veya Latin alfabesi dışındaki
  HİÇBİR alfabe/karakter kullanma. Teknik terimler (venv, assertion, fixture vb.) Latin
  harfleriyle olduğu gibi kalır.
- "DİL:" satırı hangi dili belirtiyorsa YALNIZCA o dilde yaz.

SADECE açıklama metnini yaz, markdown başlık veya JSON kullanma — düz, sıcak, mentor tonunda bir paragraf.`

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

        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler AI açıklaması alabilir. / Members only.' }, 401)
        }

        const { question, correctAnswer, userAnswer, isCorrect, staticExplanation, lang } = await req.json()
        if (!question || correctAnswer === undefined || userAnswer === undefined) {
            return jsonResponse({ error: 'question, correctAnswer and userAnswer are required' }, 400)
        }

        const promptInput = [
            `SORU: ${String(question).slice(0, 1000)}`,
            `DOĞRU CEVAP: ${String(correctAnswer).slice(0, 500)}`,
            `ÖĞRENCİNİN CEVABI: ${String(userAnswer).slice(0, 500)}`,
            `SONUÇ: ${isCorrect ? 'Doğru' : 'Yanlış'}`,
            staticExplanation ? `STATİK AÇIKLAMA (referans, tekrar etme, üzerine inşa et): ${String(staticExplanation).slice(0, 1000)}` : '',
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
        console.error('explain-quiz-answer function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
