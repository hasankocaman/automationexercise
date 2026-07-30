// supabase/functions/mentor-advice/index.ts
// Kişisel AI Mentor — Katman B: AI öğüt katmanı (öğrenme yazısı #5).
// Plan: Documents/learning-science-upgrade-plan.md Bölüm 6 (O4).
//
// İskelet grade-interview-answer'dan alındı: CORS + supabase.auth.getUser() ile
// SADECE ÜYE kontrolü (AI maliyeti anonim trafikten korunur, karar §6.2-③④) +
// paylaşılan callGroq() + katı JSON çıktı. Mevcut GROQ_API_KEY secret'ını kullanır
// (qa-assistant/grade-interview-answer ile aynı) — yeni secret GEREKMEZ.
//
// Girdi: { persistentWeakness, analyticsSummary, lang }
//   persistentWeakness: { route, pageTitle, daysStruggling, snapshotsSeen, wrongCount, trend }
//   analyticsSummary:   { quizAccuracy, topicsStarted, topicsCompleted, strongest, weakest, mostMissed }
// Çıktı (katı JSON): { headline, diagnosis, actions: [{ label, route|null }], tone }
//
// Deploy: supabase functions deploy mentor-advice --project-ref <ref>

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'
import { callGroq } from '../_shared/groq.ts'

const SYSTEM_PROMPT = `Sen deneyimli bir QA öğrenme koçusun. Sana bir öğrencinin ZAYIFLIK VERİSİ
(hangi konuda kaç gündür zorlandığı, kaç soru kaçırdığı, eğilimi) ve genel öğrenme özeti verilecek.
Görevin: bu veriye dayanarak KISA, SOMUT, motive edici, aksiyon-odaklı bir koçluk mesajı üretmek.

KURALLAR:
- SADECE verilen veriye dayan. Veride olmayan bir konu/sayı/gün UYDURMA.
- Moralsizleştirme; ama gerçekçi ol. Eğilim kötüyse nazikçe uyar, iyiyse momentumu öv.
- "diagnosis" 2-4 cümle olsun: neden bu konuda takıldığını akla yatkın biçimde açıkla ve
  sıradaki 2-3 somut adımı söyle. Öğrenci zaten Core Java biliyor — uygunsa Java analojisi kur.
- "actions": en fazla 3 adet. Her biri { "label": kısa eylem metni, "route": izinli route veya null }.
  route SADECE sana verilen "izinli route listesi"nden biri olabilir; emin değilsen null bırak.
- Dil: öğrencinin diline (lang) yaz. Teknik terimler (locator, fixture, JOIN, assertion...) İngilizce kalır.

SADECE şu JSON'u döndür, başka hiçbir metin/markdown ekleme:
{
  "headline": "<tek satır, kişisel başlık>",
  "diagnosis": "<2-4 cümle koçluk>",
  "actions": [ { "label": "<kısa eylem>", "route": "<izinli route veya null>" } ],
  "tone": "encouraging" | "urgent" | "celebratory"
}`

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

        // Sadece üyeler — AI maliyeti anonim trafikten korunsun (karar §6.2-③④).
        const { data: userData, error: userError } = await supabase.auth.getUser()
        if (userError || !userData?.user) {
            return jsonResponse({ error: 'Sadece üyeler AI mentor kullanabilir. / Members only.' }, 401)
        }

        const groqApiKey = Deno.env.get('GROQ_API_KEY')
        if (!groqApiKey) return jsonResponse({ error: 'AI servisi yapılandırılmadı.' }, 500)

        const body = await req.json()
        const { persistentWeakness, analyticsSummary, lang } = body
        if (!persistentWeakness || !persistentWeakness.route) {
            return jsonResponse({ error: 'persistentWeakness (route ile) zorunlu.' }, 400)
        }

        // AI'nın uydurabileceği kırık linkleri önlemek için izinli route listesi:
        // yalnızca zayıf konunun route'u + ana sayfa. Client bunları <Link>'ler.
        const allowedRoutes = [persistentWeakness.route, '/'].filter(Boolean)

        const userInput = [
            `DİL (lang): ${lang === 'en' ? 'English' : 'Türkçe'}`,
            `ZAYIFLIK VERİSİ:`,
            `- Konu (route): ${persistentWeakness.route}${persistentWeakness.pageTitle ? ` (${persistentWeakness.pageTitle})` : ''}`,
            `- Kaç gündür zorlanıyor: ${persistentWeakness.daysStruggling ?? 0}`,
            `- Kaç snapshot boyunca zayıf: ${persistentWeakness.snapshotsSeen ?? 1}`,
            `- Tekrar kuyruğunda kaçırılan soru: ${persistentWeakness.wrongCount ?? 'bilinmiyor'}`,
            `- Eğilim: ${persistentWeakness.trend ?? 'stuck'}`,
            ``,
            `GENEL ÖZET:`,
            `- Ortalama quiz başarısı: ${analyticsSummary?.quizAccuracy ?? 'bilinmiyor'}%`,
            `- Başlanan/tamamlanan konu: ${analyticsSummary?.topicsStarted ?? 0}/${analyticsSummary?.topicsCompleted ?? 0}`,
            `- En güçlü konu: ${analyticsSummary?.strongest?.route ?? '—'}`,
            ``,
            `İZİNLİ ROUTE LİSTESİ (actions.route sadece bunlardan biri veya null olabilir): ${allowedRoutes.join(', ')}`,
        ].join('\n')

        let rawText: string
        try {
            rawText = await callGroq(groqApiKey, [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userInput },
            ], { temperature: 0.5, maxTokens: 700 })
        } catch (err) {
            return jsonResponse({ error: (err as Error).message }, 502)
        }

        let parsed: Record<string, unknown>
        try {
            parsed = extractJson(rawText)
        } catch (parseError) {
            console.error('Could not parse mentor-advice JSON:', rawText, parseError)
            return jsonResponse({ error: 'AI yanıtı işlenemedi.' }, 502)
        }

        // Güvenlik: actions.route yalnızca izinli listeden olabilir, yoksa null'a düşürülür.
        const rawActions = Array.isArray(parsed.actions) ? parsed.actions : []
        const actions = rawActions.slice(0, 3).map((a: Record<string, unknown>) => {
            const route = typeof a?.route === 'string' && allowedRoutes.includes(a.route) ? a.route : null
            return { label: String(a?.label ?? '').slice(0, 120), route }
        }).filter((a) => a.label)

        return jsonResponse({
            headline: String(parsed.headline ?? '').slice(0, 200),
            diagnosis: String(parsed.diagnosis ?? '').slice(0, 800),
            actions,
            tone: ['encouraging', 'urgent', 'celebratory'].includes(parsed.tone as string) ? parsed.tone : 'encouraging',
        })
    } catch (error) {
        console.error('mentor-advice function error:', error)
        return jsonResponse({ error: 'Beklenmeyen bir hata oluştu.' }, 500)
    }
})
