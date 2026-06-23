// supabase/functions/grade-interview-answer/index.ts
// Backs the "Mülakat Pratiği" gate (80% threshold). Real interviews don't give
// multiple-choice options — the candidate reasons out loud and is judged on which
// concrete points they covered. This function asks Gemini to do the same: count how
// many checkable points (keyPoints if the question has them, otherwise points derived
// from the model answer) the user's free-text answer actually addresses. That keeps
// the grading objective (a count against a fixed checklist) instead of a vague
// subjective "is this good?" judgement.
//
// COST NOTE: the initial grading pass for all 5 sampled questions is sent as ONE
// batched AI call (`items` array) instead of 5 separate calls — this is what keeps
// free-tier per-minute rate limits from being hit by a single practice attempt.
// Re-grades and disputes (rare, user-initiated one at a time) still use the single-item path.
// Uses Groq (not Gemini) — this Google Cloud project's Gemini free-tier quota was
// effectively zero (HTTP 429 even on a single batched request); Groq's free tier
// is far more generous and speaks the same OpenAI-compatible chat/completions shape.
//
// Deploy: supabase functions deploy grade-interview-answer --project-ref <ref>
// Reuses the same GROQ_API_KEY secret already set for qa-assistant.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

const GRADING_RULES = `GÖREVİN: Adayın cevabının referans cevaptaki/kontrol noktalarındaki KAÇ somut noktaya
değindiğini objektif şekilde saymak. "İyi bir cevap mı" gibi öznel bir yorum YAPMA — sadece
her bir kontrol noktasının cevapta gerçekten ele alınıp alınmadığını kontrol et.

ÇOK ÖNEMLİ — MANTIĞA GÖRE DEĞERLENDİR, EZBERE GÖRE DEĞİL: Bir kontrol noktasını "değindi" say
EĞER aday farklı kelimelerle de olsa AYNI MANTIKSAL SONUCA/ANLAYIŞA ulaşıyorsa. Referans
cevaptaki cümleyle kelime kelime eşleşme ARAMA — bir senior mühendis konuyu kendi
tecrübesiyle, farklı bir örnekle veya referans cevaptan daha iyi bir açıklamayla anlatabilir;
bu durumda da o noktayı tam puan ver. Tersine, referans cevaptaki kelimeleri ezbere
tekrarlayan ama ALTINDAKİ MANTIĞI anlamadığı belli olan (örn. çelişkili, yüzeysel veya
bağlamsız kullanılan) bir cevaba o noktayı verme.

Eğer kontrol noktası listesi verilmemişse, önce referans cevaptan 3-4 somut, birbirinden
ayrı kontrol noktası çıkar (örn: "X kavramını doğru tanımlıyor", "Y örneğini veriyor", "Z
riskini/trade-off'unu belirtiyor"), sonra adayın cevabını SADECE bu noktalara göre değerlendir.`

const SINGLE_GRADING_SYSTEM_PROMPT = `Sen bir QA mülakat değerlendirme asistanısın. Sana bir mülakat
sorusu, bu sorunun referans/model cevabı (varsa ayrıca somut kontrol noktaları listesi) ve
adayın kendi yazdığı serbest metin cevap verilecek.

${GRADING_RULES}

EĞER sana bir "İTİRAZ" bölümü verilirse: bu, adayın senin ÖNCEKİ değerlendirmene katılmadığını
ve kendi gerekçesini yazdığı anlamına gelir (bazı senior mühendisler bir konuyu senden daha iyi
biliyor olabilir). İtirazı gerçek bir teknik tartışma gibi ciddiye al: aday haklıysa açıkça
kabul et ve puanı/missedPoints'i güncelle; haklı değilse NEDEN haklı olmadığını somut ve
teknik gerekçeyle açıkla (otorite olduğun için değil, doğru olduğun için). "disputeResponse"
alanına bu kararını ve gerekçeni yaz.

SADECE şu JSON formatında yanıt ver, başka hiçbir metin/markdown ekleme:
{
  "totalPoints": <number>,
  "coveredPoints": <number>,
  "missedPoints": ["kaçırılan nokta 1", "kaçırılan nokta 2"],
  "feedback": "<adayın yazdığı dilde, 1-2 cümlelik kısa ve yapıcı geri bildirim>",
  "disputeResponse": "<SADECE itiraz varsa doldur — adayın itirazına verdiğin yanıt, 2-4 cümle>"
}`

const BATCH_GRADING_SYSTEM_PROMPT = `Sen bir QA mülakat değerlendirme asistanısın. Sana NUMARALANMIŞ
birden fazla mülakat sorusu verilecek; her biri kendi referans cevabı (varsa kontrol noktaları) ve
adayın o soruya verdiği cevapla birlikte gelir. Her soruyu BİRBİRİNDEN BAĞIMSIZ değerlendir.

${GRADING_RULES}

SADECE şu JSON dizisini döndür, başka hiçbir metin/markdown ekleme. Dizinin sırası ve eleman
sayısı sana verilen soru sırasıyla VE sayısıyla TAM olarak aynı olmalı:
[
  { "totalPoints": <number>, "coveredPoints": <number>, "missedPoints": ["..."], "feedback": "<adayın dilinde, 1-2 cümle>" },
  ...
]`

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

function normalizeVerdict(parsed: Record<string, unknown>) {
    const totalPoints = Math.max(1, Number(parsed?.totalPoints) || 1)
    const coveredPoints = Math.min(totalPoints, Math.max(0, Number(parsed?.coveredPoints) || 0))
    return {
        totalPoints,
        coveredPoints,
        percent: Math.round((coveredPoints / totalPoints) * 100),
        missedPoints: Array.isArray(parsed?.missedPoints) ? (parsed.missedPoints as string[]).slice(0, 6) : [],
        feedback: String(parsed?.feedback ?? '').slice(0, 600),
    }
}

function buildItemBlock(item: { question: string; modelAnswer: string; keyPoints?: string[]; userAnswer: string }, lang: string, index?: number) {
    return [
        index !== undefined ? `### SORU ${index + 1}` : '',
        `SORU: ${String(item.question).slice(0, 1000)}`,
        `REFERANS CEVAP: ${String(item.modelAnswer).slice(0, 2000)}`,
        Array.isArray(item.keyPoints) && item.keyPoints.length
            ? `KONTROL NOKTALARI:\n${item.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
            : '(Kontrol noktası verilmedi — referans cevaptan kendin çıkar.)',
        `ADAYIN CEVABI (${lang === 'tr' ? 'Türkçe' : 'English'}): ${String(item.userAnswer).slice(0, 2000)}`,
    ].filter(Boolean).join('\n')
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

        // Sadece üyeler — AI maliyeti anonim trafikten korunsun.
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler mülakat pratiği yapabilir. / Members only.' }, 401)
        }

        const groqApiKey = Deno.env.get('GROQ_API_KEY')
        if (!groqApiKey) return jsonResponse({ error: 'AI servisi yapılandırılmadı.' }, 500)

        const body = await req.json()
        const { items, question, modelAnswer, keyPoints, userAnswer, lang, dispute } = body

        // ── Toplu mod: 5 soruyu TEK AI isteğinde değerlendirir (ilk değerlendirme). ──
        if (Array.isArray(items) && items.length) {
            const batchInput = items
                .map((item, i) => buildItemBlock(item, lang, i))
                .join('\n\n')

            let rawText: string
            try {
                rawText = await callGroq(groqApiKey, [
                    { role: 'system', content: BATCH_GRADING_SYSTEM_PROMPT },
                    { role: 'user', content: batchInput },
                ])
            } catch (err) {
                return jsonResponse({ error: (err as Error).message }, 502)
            }

            let parsedArray: unknown
            try {
                parsedArray = extractJson(rawText)
            } catch (parseError) {
                console.error('Could not parse batch grading JSON:', rawText, parseError)
                return jsonResponse({ error: 'Değerlendirme sonucu işlenemedi.' }, 502)
            }
            if (!Array.isArray(parsedArray)) {
                return jsonResponse({ error: 'Değerlendirme sonucu beklenmeyen formatta.' }, 502)
            }

            const results = items.map((_, i) => normalizeVerdict((parsedArray[i] as Record<string, unknown>) ?? {}))
            return jsonResponse({ results })
        }

        // ── Tekli mod: re-grade ve itiraz akışları için (kullanıcı tek tek tetikler). ──
        if (!question || !modelAnswer || !userAnswer) {
            return jsonResponse({ error: 'question, modelAnswer and userAnswer are required' }, 400)
        }

        const gradingInput = [
            buildItemBlock({ question, modelAnswer, keyPoints, userAnswer }, lang),
            dispute ? [
                `ÖNCEKİ DEĞERLENDİRMEN: ${dispute.previousVerdict?.coveredPoints}/${dispute.previousVerdict?.totalPoints} nokta. Kaçırılan: ${(dispute.previousVerdict?.missedPoints || []).join('; ')}`,
                `İTİRAZ (adayın gerekçesi): ${String(dispute.rebuttal ?? '').slice(0, 1500)}`,
            ].join('\n') : '',
        ].filter(Boolean).join('\n\n')

        let rawText: string
        try {
            rawText = await callGroq(groqApiKey, [
                { role: 'system', content: SINGLE_GRADING_SYSTEM_PROMPT },
                { role: 'user', content: gradingInput },
            ])
        } catch (err) {
            return jsonResponse({ error: (err as Error).message }, 502)
        }

        let parsed: Record<string, unknown>
        try {
            parsed = extractJson(rawText)
        } catch (parseError) {
            console.error('Could not parse grading JSON:', rawText, parseError)
            return jsonResponse({ error: 'Değerlendirme sonucu işlenemedi.' }, 502)
        }

        return jsonResponse({
            ...normalizeVerdict(parsed),
            disputeResponse: dispute ? String(parsed.disputeResponse ?? '').slice(0, 600) : null,
        })
    } catch (error) {
        console.error('grade-interview-answer function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
