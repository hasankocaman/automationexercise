// supabase/functions/qa-assistant/index.ts
// Deno Edge Function backing /qa-assistant. Keeps the Groq API key server-side —
// the browser only ever talks to this function via supabase.functions.invoke(),
// which forwards the signed-in user's JWT automatically.
//
// Deploy: supabase functions deploy qa-assistant --project-ref <ref>
// Secrets (per project — test and prod each need their own):
//   supabase secrets set GROQ_API_KEY=... --project-ref <ref>
// SUPABASE_URL / SUPABASE_ANON_KEY are injected automatically by the platform.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

const SYSTEM_PROMPT = `Sen LearnQA.dev platformunun resmi QA Asistanısın. Uzmanlık alanın
SADECE şudur: yazılım test otomasyonu ve QA mühendisliği — Selenium, Playwright, Cypress,
Appium, REST Assured, Postman, JMeter, Docker/Jenkins/Kubernetes for QA, AWS/Azure for QA,
Java/Python/TypeScript test kodu, manual testing, test case ve bug raporu yazımı, SQL for QA,
API testing ve LearnQA.dev'in kendi ders içerikleri/mülakat soruları/yol haritaları.

KURALLAR:
1. Kapsam dışı bir soru gelirse (genel sohbet, alakasız konular, kişisel tavsiye, siyaset,
   QA/test otomasyonu ile ilgisi olmayan başka bir programlama alanı vb.) KIBARCA reddet ve
   kullanıcıyı QA/test otomasyonu konularına yönlendir. Örnek ret cümlesi: "Bu konu benim
   uzmanlık alanımın dışında — sadece yazılım test otomasyonuyla ilgili sorularda
   yardımcı olabilirim. Selenium, Playwright, API testing gibi bir konuda sorun var mı?"
2. Kullanıcı kod paylaşırsa, kodu QA/test otomasyonu açısından somut ve uygulanabilir şekilde
   incele; mümkünse kısa, çalışan bir kod örneğiyle (fenced \`\`\` code block içinde) göster.
3. Kullanıcının yazdığı dilde (Türkçe veya İngilizce) cevap ver.
4. Kesin bilmediğin bir şeyi biliyormuş gibi söyleme; belirsizsen bunu açıkça belirt.
5. Cevapları gereksiz uzatma — net, adım adım ve QA mühendisinin gerçekte yapacağı şeye odaklı ol.`

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

        // QA Asistanı sadece üyelere açık — anon key ile gelen istekleri (giriş yapmamış
        // ziyaretçi) reddederiz, böylece AI maliyeti sadece gerçek kullanıcılara çıkar.
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler QA Asistanı kullanabilir. / Members only.' }, 401)
        }

        const { messages } = await req.json()
        if (!Array.isArray(messages) || messages.length === 0) {
            return jsonResponse({ error: 'messages array is required' }, 400)
        }

        // Maliyet/kötüye kullanım koruması: son 12 mesaj, mesaj başına 4000 karakter.
        const trimmedHistory = messages.slice(-12).map((m: { role: string; content: string }) => ({
            role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
            content: String(m.content ?? '').slice(0, 4000),
        }))

        const groqApiKey = Deno.env.get('GROQ_API_KEY')
        if (!groqApiKey) return jsonResponse({ error: 'AI servisi yapılandırılmadı.' }, 500)

        let reply: string
        try {
            reply = await callGroq(groqApiKey, [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmedHistory])
        } catch (err) {
            return jsonResponse({ error: (err as Error).message }, 502)
        }

        return jsonResponse({ reply: reply || 'Sorry, I could not generate a reply right now.' })
    } catch (error) {
        console.error('qa-assistant function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
