// supabase/functions/visual-diff-judge/index.ts
// Backs the "Diff Dedektif" module (AIQA_ROADMAP.md C-4, "Claude Vision ->
// Visual Regression Testing" -- renamed in-content to a provider-neutral
// "AI Vision" framing because this project's production AI service is Groq,
// not Anthropic; see CLAUDE.md/AIQA_ROADMAP.md Section 3.1 "Not - Modul C-4
// istisnasi". The user chose option 2 (swap for a Groq vision model) instead
// of storing an Anthropic key or asking users for their own key.
//
// Takes two screenshots (before/after, base64 data URLs) and asks a
// vision-capable Groq model to classify the visual difference into exactly
// one of three buckets a human QA engineer would use when triage-ing a
// visual regression report:
//   - kritik_degisiklik   (critical change -- breaks UX/functionality)
//   - kozmetik_degisiklik (cosmetic change -- visible but harmless)
//   - kabul_edilebilir    (acceptable -- effectively no meaningful diff)
//
// MODEL NAME NOTE: Groq's vision-capable model catalog changes over time
// (it moved from the Llama 3.2 Vision preview models to Llama 4 Scout/
// Maverick). Verify the current vision-capable model id in Groq's docs
// before deploying -- do not assume the constant below is still current.
//
// COST: members-only (same guard as grade-interview-answer/judge-eval) so
// anonymous traffic cannot burn the shared Groq quota on image tokens,
// which cost more than plain text. Reuses the GROQ_API_KEY secret already
// set for the other AI QA functions.
//
// Deploy: supabase functions deploy visual-diff-judge --project-ref <ref>

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

// Verify against https://console.groq.com/docs/vision before relying on this.
const VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

const SYSTEM_PROMPT = `Sen bir kıdemli QA mühendisisin ve visual regression raporlarını triyaj ediyorsun.
Sana bir UI'ın "ÖNCE" ve "SONRA" ekran görüntüsü verilecek. Aralarındaki farkı incele ve
AŞAĞIDAKİ ÜÇ kategoriden TAM OLARAK BİRİNİ seç:

- "kritik_degisiklik": Kullanıcı deneyimini veya işlevselliği bozan bir değişiklik (buton kayboldu,
  metin okunaksız hale geldi, layout kırıldı, kritik bir eleman görünmez oldu).
- "kozmetik_degisiklik": Görünür ama zararsız bir fark (renk tonu, gölge, küçük boşluk farkı) —
  kullanıcı deneyimini bozmaz.
- "kabul_edilebilir": Anlamlı bir fark yok (font render farkı, 1px kayma, ekran görüntüsü zamanlama
  farkı gibi gürültü).

SADECE şu JSON formatında yanıt ver, başka hiçbir metin/markdown ekleme:
{"category": "kritik_degisiklik" | "kozmetik_degisiklik" | "kabul_edilebilir", "reasoning": "<adayın dilinde, 1-2 cümlelik somut gerekçe>"}`

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

function extractJson(text: string) {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
    const raw = fenced ? fenced[1] : text
    return JSON.parse(raw.trim())
}

const VALID_CATEGORIES = ['kritik_degisiklik', 'kozmetik_degisiklik', 'kabul_edilebilir']

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

        // Sadece üyeler — görsel token'lar metinden daha pahalıdır, anonim trafikten korunsun.
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler visual diff analizi yapabilir. / Members only.' }, 401)
        }

        const groqApiKey = Deno.env.get('GROQ_API_KEY')
        if (!groqApiKey) return jsonResponse({ error: 'AI servisi yapılandırılmadı.' }, 500)

        const body = await req.json()
        const { beforeImage, afterImage } = body as { beforeImage?: string; afterImage?: string }

        if (!beforeImage || !afterImage) {
            return jsonResponse({ error: 'beforeImage and afterImage (base64 data URLs) are required' }, 400)
        }
        // Kaba boyut koruması: çok büyük base64 payload'ları reddet (~6MB sınırı).
        if (beforeImage.length > 8_000_000 || afterImage.length > 8_000_000) {
            return jsonResponse({ error: 'Görsel çok büyük, lütfen daha küçük bir ekran görüntüsü kullanın.' }, 413)
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: VISION_MODEL,
                temperature: 0.1,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: 'ÖNCE (before):' },
                            { type: 'image_url', image_url: { url: beforeImage } },
                            { type: 'text', text: 'SONRA (after):' },
                            { type: 'image_url', image_url: { url: afterImage } },
                        ],
                    },
                ],
            }),
        })

        if (!response.ok) {
            const errText = await response.text()
            console.error('Groq vision API error:', response.status, errText)
            return jsonResponse({ error: `AI servisinden yanıt alınamadı (HTTP ${response.status})` }, 502)
        }

        const result = await response.json()
        const rawText: string = result?.choices?.[0]?.message?.content ?? ''

        let parsed: Record<string, unknown>
        try {
            parsed = extractJson(rawText)
        } catch (parseError) {
            console.error('Could not parse visual-diff-judge JSON:', rawText, parseError)
            return jsonResponse({ error: 'Analiz sonucu işlenemedi.' }, 502)
        }

        const category = VALID_CATEGORIES.includes(parsed.category as string)
            ? (parsed.category as string)
            : 'kozmetik_degisiklik'

        return jsonResponse({
            category,
            reasoning: String(parsed.reasoning ?? '').slice(0, 400),
        })
    } catch (error) {
        console.error('visual-diff-judge function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
