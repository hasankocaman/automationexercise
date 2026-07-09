// supabase/functions/judge-eval/index.ts
// Backs the AI-QA "LLM-as-a-Judge" modules (AIQA_ROADMAP.md C-3 & L-4).
//
// Two modes, one function (both are just "score a text against a rubric with a
// low-temperature judge model and return strict JSON"):
//   - mode: 'rubric'  (C-3 Judge Playground) — score an AI output against N
//     user-defined criteria, each 1-5, plus an overall and one-line reasoning.
//   - mode: 'rag'     (L-4 RAG Lab) — score an answer against a source context on
//     grounding / relevance / faithfulness (1-5 each) + reasoning. This is the
//     "hallucination detective" scoring the roadmap describes.
//
// Deterministic-ish judging: temperature is pinned low (0.1) so the SCORING step
// is as repeatable as an LLM judge gets — the thing being judged is stochastic,
// the judge should not add extra noise on top.
//
// COST: members-only (same guard as grade-interview-answer) so anonymous traffic
// cannot burn the shared Groq quota. Reuses the GROQ_API_KEY secret already set
// for qa-assistant / grade-interview-answer.
//
// Deploy: supabase functions deploy judge-eval --project-ref <ref>

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

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

function clampScore(n: unknown): number {
    const v = Number(n)
    if (!Number.isFinite(v)) return 0
    return Math.max(1, Math.min(5, Math.round(v)))
}

// ── Rubric mode (C-3) ─────────────────────────────────────────────────────────
function buildRubricPrompt(rubric: Array<{ name: string; description?: string }>) {
    const criteria = rubric.map((r) => `- ${r.name}: ${r.description ?? ''}`).join('\n')
    return `Sen bir AI çıktı değerlendirme uzmanısın (LLM-as-a-Judge). Sana bir AI/chatbot yanıtı
ve (varsa) bir bağlam verilecek. Yanıtı AŞAĞIDAKİ kriterlerin HER BİRİNE göre 1-5 arası puanla
(1 = kriteri hiç karşılamıyor, 5 = tam karşılıyor). Ezbere değil, MANTIĞA göre değerlendir.

KRİTERLER:
${criteria}

SADECE şu JSON formatında yanıt ver, başka hiçbir metin/markdown ekleme. "scores" anahtarları
tam olarak yukarıdaki kriter isimleri olmalı:
{"scores": {"<kriter adı>": <1-5>}, "overall": <1-5 ortalama>, "reasoning": "<tek cümle, adayın dilinde gerekçe>"}`
}

// ── RAG mode (L-4) ────────────────────────────────────────────────────────────
const RAG_SYSTEM_PROMPT = `Sen bir RAG (Retrieval-Augmented Generation) değerlendirme uzmanısın —
bir "halüsinasyon dedektifi". Sana bir BAĞLAM (kaynak bilgi tabanı), bir SORU ve bir YANIT
verilecek. Yanıtı üç bağımsız eksende 1-5 arası puanla:

- grounding: Yanıt SADECE bağlamdaki bilgilere mi dayanıyor? Bağlamda olmayan bir iddia varsa
  (halüsinasyon) puanı düşür. 5 = tamamen bağlama dayalı, 1 = büyük ölçüde uydurma.
- relevance: Yanıt gerçekten SORULAN soruyu mu cevaplıyor? 5 = doğrudan ve tam, 1 = alakasız.
- faithfulness: Yanıttaki her somut iddia kaynak belgede doğrulanabiliyor mu? 5 = hepsi
  doğrulanabilir, 1 = çelişkili/desteksiz.

SADECE şu JSON formatında yanıt ver, başka hiçbir metin ekleme:
{"scores": {"grounding": <1-5>, "relevance": <1-5>, "faithfulness": <1-5>}, "overall": <1-5>, "reasoning": "<tek cümle, hangi iddianın bağlamda olduğunu/olmadığını belirt>"}`

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

        // Sadece üyeler — AI maliyeti anonim trafikten korunsun.
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler değerlendirme yapabilir. / Members only.' }, 401)
        }

        const groqApiKey = Deno.env.get('GROQ_API_KEY')
        if (!groqApiKey) return jsonResponse({ error: 'AI servisi yapılandırılmadı.' }, 500)

        const body = await req.json()
        const { mode = 'rubric', inputText, context, question, rubric } = body

        let systemPrompt: string
        let userContent: string

        if (mode === 'rag') {
            if (!inputText || !context) {
                return jsonResponse({ error: 'context and inputText (answer) are required for rag mode' }, 400)
            }
            systemPrompt = RAG_SYSTEM_PROMPT
            userContent = `BAĞLAM:\n${String(context).slice(0, 4000)}\n\nSORU:\n${String(question ?? '').slice(0, 1000)}\n\nDEĞERLENDİRİLECEK YANIT:\n${String(inputText).slice(0, 2000)}`
        } else {
            if (!inputText || !Array.isArray(rubric) || rubric.length === 0) {
                return jsonResponse({ error: 'inputText and a non-empty rubric are required for rubric mode' }, 400)
            }
            systemPrompt = buildRubricPrompt(rubric)
            userContent = `Değerlendirilecek yanıt:\n${String(inputText).slice(0, 2500)}\n\nBağlam (varsa):\n${context ? String(context).slice(0, 2000) : 'Yok'}`
        }

        let rawText: string
        try {
            rawText = await callGroq(
                groqApiKey,
                [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userContent },
                ],
                { temperature: 0.1, maxTokens: 500 }
            )
        } catch (err) {
            return jsonResponse({ error: (err as Error).message }, 502)
        }

        let parsed: Record<string, unknown>
        try {
            parsed = extractJson(rawText)
        } catch (parseError) {
            console.error('Could not parse judge-eval JSON:', rawText, parseError)
            return jsonResponse({ error: 'Değerlendirme sonucu işlenemedi.' }, 502)
        }

        // Skorları 1-5 aralığına sıkıştır (model bazen aralık dışına çıkar).
        const rawScores = (parsed.scores ?? {}) as Record<string, unknown>
        const scores: Record<string, number> = {}
        for (const [k, v] of Object.entries(rawScores)) scores[k] = clampScore(v)

        const overall =
            parsed.overall != null
                ? clampScore(parsed.overall)
                : Object.values(scores).length
                    ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
                    : 0

        return jsonResponse({
            mode,
            scores,
            overall,
            reasoning: String(parsed.reasoning ?? '').slice(0, 400),
        })
    } catch (error) {
        console.error('judge-eval function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
