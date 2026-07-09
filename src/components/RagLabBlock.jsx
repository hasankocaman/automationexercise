import { useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

/* ─────────────────────────────────────────────────────────────────────────
   RagLabBlock — Modül L-4 (AIQA_ROADMAP.md)
   "RAG'ı Test Etmek: Halüsinasyon Dedektifi Olmak"

   3 adımlı RAG değerlendirme laboratuvarı:
     1) Bağlam (bilgi tabanı) seç
     2) Soru + aday yanıt seç (iyi vs halüsinasyonlu)
     3) Metrikleri gör: grounding / relevance / faithfulness (progress ring'leri)

   Canlı mod (üye + Supabase): `judge-eval` edge function `mode:'rag'` — yanıtı
   bağlama karşı 3 eksende puanlar. Demo mod: el-yazımı puanlar. Skorlama
   öğretilen şeydir (üretim değil), o yüzden aday yanıt hazır seçilir.

   Veri `block.contexts` üzerinden gelir; Sonnet gerçek bilgi tabanı örnekleri
   ekler. Yerleşik varsayılan tek başına çalışır.
   ───────────────────────────────────────────────────────────────────────── */

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

const DEFAULT_CONTEXTS = [
    {
        label: { tr: 'İade Politikası', en: 'Return Policy' },
        text: {
            tr: 'İade Politikası: Ürünler teslim tarihinden itibaren 14 gün içinde iade edilebilir. İade kargosu ücretsizdir. Para iadesi, ürün depoya ulaştıktan sonra 5 iş günü içinde yapılır. Hediye kartları iade edilemez.',
            en: 'Return Policy: Items can be returned within 14 days of delivery. Return shipping is free. Refunds are issued within 5 business days after the item reaches the warehouse. Gift cards are non-refundable.',
        },
        question: { tr: 'Ürünümü kaç gün içinde iade edebilirim ve para ne zaman geri gelir?', en: 'Within how many days can I return my item, and when is the money refunded?' },
        candidates: [
            {
                label: { tr: '✅ Bağlama dayalı', en: '✅ Grounded' },
                answer: { tr: 'Ürününü teslimden sonra 14 gün içinde ücretsiz iade edebilirsin; paran ürün depoya ulaştıktan sonra 5 iş günü içinde iade edilir.', en: 'You can return your item free within 14 days of delivery; the money is refunded within 5 business days after it reaches the warehouse.' },
                scores: { grounding: 5, relevance: 5, faithfulness: 5 },
                reasoning: { tr: 'Her iddia (14 gün, ücretsiz, 5 iş günü) doğrudan bağlamda var.', en: 'Every claim (14 days, free, 5 business days) is directly in the context.' },
            },
            {
                label: { tr: '⚠️ Halüsinasyon', en: '⚠️ Hallucination' },
                answer: { tr: 'İadeni 30 gün içinde yapabilirsin ve paran aynı gün hesabına yatırılır, ayrıca hediye kartları da iade edilebilir.', en: 'You can return within 30 days and the money is refunded the same day, and gift cards are refundable too.' },
                scores: { grounding: 2, relevance: 4, faithfulness: 1 },
                reasoning: { tr: '30 gün, aynı gün ve hediye kartı iadesi bağlamla ÇELİŞİYOR — üç iddia da uydurma.', en: '30 days, same-day refund and gift-card returns CONTRADICT the context — three invented claims.' },
            },
        ],
    },
]

function ring(score, label, darkMode, isTr) {
    const pct = (score / 5) * 100
    const color = score >= 4 ? '#10b981' : score >= 3 ? '#f59e0b' : '#f43f5e'
    const R = 26
    const C = 2 * Math.PI * R
    const off = C - (pct / 100) * C
    return { pct, color, R, C, off, score, label }
}

function RagLabBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const contexts = Array.isArray(block.contexts) && block.contexts.length ? block.contexts : DEFAULT_CONTEXTS

    const [ctxIdx, setCtxIdx] = useState(0)
    const [candIdx, setCandIdx] = useState(0)
    const [result, setResult] = useState(null) // { scores:{grounding,relevance,faithfulness}, reasoning, live }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const ctx = contexts[ctxIdx] || {}
    const candidates = Array.isArray(ctx.candidates) ? ctx.candidates : []
    const cand = candidates[candIdx] || {}

    async function analyze() {
        setError('')
        const answerText = pick(cand.answer, isTr)
        if (!answerText) return

        if (isSupabaseConfigured && supabase) {
            setLoading(true)
            try {
                const { data, error: fnError } = await supabase.functions.invoke('judge-eval', {
                    body: {
                        mode: 'rag',
                        context: pick(ctx.text, isTr),
                        question: pick(ctx.question, isTr),
                        inputText: answerText,
                    },
                })
                if (fnError) throw fnError
                if (data?.error) throw new Error(data.error)
                setResult({ scores: data.scores || {}, reasoning: data.reasoning || '', live: true })
            } catch (err) {
                console.error('judge-eval (rag) failed:', err)
                setResult({ scores: cand.scores || {}, reasoning: pick(cand.reasoning, isTr), live: false })
                setError(isTr
                    ? 'Canlı değerlendirme yapılamadı (üyelik/servis gerekli) — demo skoru gösteriliyor.'
                    : 'Live evaluation unavailable (needs membership/service) — showing demo score.')
            } finally {
                setLoading(false)
            }
            return
        }

        setResult({ scores: cand.scores || {}, reasoning: pick(cand.reasoning, isTr), live: false })
    }

    const rings = useMemo(() => {
        if (!result) return []
        const s = result.scores
        return [
            ring(s.grounding ?? 0, isTr ? 'Grounding' : 'Grounding', darkMode, isTr),
            ring(s.relevance ?? 0, isTr ? 'Relevance' : 'Relevance', darkMode, isTr),
            ring(s.faithfulness ?? 0, isTr ? 'Faithfulness' : 'Faithfulness', darkMode, isTr),
        ]
    }, [result, darkMode, isTr])

    const card = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    const subtle = darkMode ? 'text-slate-400' : 'text-slate-500'
    const box = darkMode ? 'bg-slate-950 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'

    return (
        <div className={`mt-6 rounded-2xl border p-4 md:p-5 ${card}`} data-testid="rag-lab-block">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🔍</span>
                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {isTr ? 'RAG Test Laboratuvarı — Halüsinasyon Dedektifi' : 'RAG Test Lab — Hallucination Detective'}
                </h4>
            </div>

            {/* Adım 1: Bağlam */}
            <div className="mb-4">
                <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>{isTr ? 'Adım 1 · Bilgi tabanı (bağlam)' : 'Step 1 · Knowledge base (context)'}</div>
                {contexts.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {contexts.map((c, i) => (
                            <button key={i} type="button" onClick={() => { setCtxIdx(i); setCandIdx(0); setResult(null) }}
                                className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${ctxIdx === i ? (darkMode ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200' : 'border-indigo-400 bg-indigo-50 text-indigo-700') : (darkMode ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-600')}`}>
                                {pick(c.label, isTr)}
                            </button>
                        ))}
                    </div>
                )}
                <div className={`rounded-lg border p-3 text-sm leading-relaxed ${box}`}>{pick(ctx.text, isTr)}</div>
            </div>

            {/* Adım 2: Soru + aday yanıt */}
            <div className="mb-4">
                <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>{isTr ? 'Adım 2 · Soru & aday yanıt' : 'Step 2 · Question & candidate answer'}</div>
                <div className={`rounded-lg border p-3 text-sm mb-2 ${darkMode ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <span className="font-semibold">❓ </span>{pick(ctx.question, isTr)}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                    {candidates.map((c, i) => (
                        <button key={i} type="button" onClick={() => { setCandIdx(i); setResult(null) }}
                            data-testid={`rag-candidate-${i}`}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${candIdx === i ? (darkMode ? 'border-violet-400 bg-violet-500/20 text-violet-200' : 'border-violet-400 bg-violet-50 text-violet-700') : (darkMode ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-600')}`}>
                            {pick(c.label, isTr)}
                        </button>
                    ))}
                </div>
                <div className={`rounded-lg border p-3 text-sm leading-relaxed ${box}`}>{pick(cand.answer, isTr)}</div>
            </div>

            <button type="button" onClick={analyze} disabled={loading} data-testid="rag-analyze"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-60">
                {loading ? (isTr ? 'Analiz ediliyor...' : 'Analyzing...') : (isTr ? '🔍 Metrikleri Hesapla' : '🔍 Compute Metrics')}
            </button>

            {/* Adım 3: Metrikler */}
            {result && (
                <div className="mt-5 det-vs-stoch-pop">
                    <div className="flex items-center justify-between mb-3">
                        <div className={`text-xs font-semibold uppercase tracking-wide ${subtle}`}>{isTr ? 'Adım 3 · RAG metrikleri' : 'Step 3 · RAG metrics'}</div>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${result.live ? (darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700') : (darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600')}`}>
                            {result.live ? (isTr ? '● Canlı AI' : '● Live AI') : (isTr ? '○ Demo' : '○ Demo')}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {rings.map((r) => (
                            <div key={r.label} className={`rounded-xl border p-3 flex flex-col items-center ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                                <svg width="68" height="68" viewBox="0 0 68 68">
                                    <circle cx="34" cy="34" r={r.R} fill="none" stroke={darkMode ? '#1e293b' : '#e2e8f0'} strokeWidth="7" />
                                    <circle cx="34" cy="34" r={r.R} fill="none" stroke={r.color} strokeWidth="7" strokeLinecap="round"
                                        strokeDasharray={r.C} strokeDashoffset={r.off} transform="rotate(-90 34 34)"
                                        style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
                                    <text x="34" y="39" textAnchor="middle" fontSize="16" fontWeight="700" fill={darkMode ? '#e2e8f0' : '#334155'}>{r.score}</text>
                                </svg>
                                <span className={`mt-1 text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{r.label}</span>
                            </div>
                        ))}
                    </div>
                    {result.reasoning && (
                        <div className={`mt-3 rounded-lg p-3 text-sm leading-relaxed border-l-4 ${(result.scores.grounding ?? 0) >= 4 ? 'border-emerald-500' : 'border-rose-500'} ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-50 text-slate-700'}`}>
                            <span className="font-semibold">{isTr ? '🕵️ Dedektif notu: ' : '🕵️ Detective note: '}</span>{result.reasoning}
                        </div>
                    )}
                    {error && <p className={`mt-2 text-xs ${darkMode ? 'text-amber-300' : 'text-amber-600'}`}>{error}</p>}
                </div>
            )}
        </div>
    )
}

export default RagLabBlock
