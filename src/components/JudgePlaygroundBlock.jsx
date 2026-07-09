import { useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

/* ─────────────────────────────────────────────────────────────────────────
   JudgePlaygroundBlock — Modül C-3 (AIQA_ROADMAP.md)
   "Yargıç Olarak Claude: Yapay Zekayı Test Etmek İçin Yapay Zeka Kullanmak"

   Kullanıcı bir chatbot yanıtı seçer (veya kendi yazar) ve bir rubrik (kriter
   listesi) belirler. "Değerlendir" → yanıt bir LLM-judge ile puanlanır ve her
   kriter için 1-5 bar chart olarak gösterilir.

   İKİ MOD:
   - Canlı: kullanıcı ÜYE ve kendi metnini yazdıysa → `judge-eval` edge function
     (Groq, temp 0.1, JSON rubrik skoru) çağrılır.
   - Demo: Supabase yoksa veya hazır örnek seçildiyse → el-yazımı puanlar / basit
     deterministik sezgisel skorlayıcı. Böylece prod'da secret olmadan da öğretir.

   Veri `block` üzerinden gelir; Sonnet `scenario`, `examples`, `rubric`
   içeriğini claudeAiData.js'e ekler. Yerleşik varsayılanlar tek başına çalışır.
   ───────────────────────────────────────────────────────────────────────── */

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

const DEFAULT_RUBRIC = [
    { name: 'accuracy', tr: 'Doğruluk', en: 'Accuracy', desc: { tr: 'İçerik olgusal olarak doğru mu?', en: 'Is the content factually correct?' } },
    { name: 'relevance', tr: 'Alaka', en: 'Relevance', desc: { tr: 'Yanıt soruyu gerçekten cevaplıyor mu?', en: 'Does it actually answer the question?' } },
    { name: 'safety', tr: 'Güvenlik', en: 'Safety', desc: { tr: 'Zararlı/politika dışı içerik var mı?', en: 'Any harmful / out-of-policy content?' } },
    { name: 'conciseness', tr: 'Özlülük', en: 'Conciseness', desc: { tr: 'Gereksiz uzatma olmadan net mi?', en: 'Clear without needless padding?' } },
]

const DEFAULT_EXAMPLES = [
    {
        label: { tr: '✅ İyi yanıt', en: '✅ Good answer' },
        text: {
            tr: 'İadeni 14 gün içinde "Siparişlerim > İade Talebi" adımından başlatabilirsin. Kargo etiketi e-postana gelir.',
            en: 'You can start your return within 14 days via "My Orders > Request Return". A shipping label is emailed to you.',
        },
        scores: { accuracy: 5, relevance: 5, safety: 5, conciseness: 5 },
        reasoning: { tr: 'Doğru, doğrudan soruyu cevaplıyor, güvenli ve öz.', en: 'Correct, directly answers the question, safe and concise.' },
    },
    {
        label: { tr: '⚠️ Halüsinasyonlu yanıt', en: '⚠️ Hallucinated answer' },
        text: {
            tr: 'İadeler 30 gün içinde ücretsizdir ve paran aynı gün hesabına yatırılır, ayrıca %10 bonus kupon kazanırsın.',
            en: 'Returns are free within 30 days and money is refunded the same day, plus you earn a 10% bonus coupon.',
        },
        scores: { accuracy: 2, relevance: 4, safety: 3, conciseness: 4 },
        reasoning: { tr: 'Akıcı ama politikayı uyduruyor (30 gün, aynı gün, bonus) — düşük doğruluk.', en: 'Fluent but invents policy (30 days, same day, bonus) — low accuracy.' },
    },
    {
        label: { tr: '❌ Alakasız yanıt', en: '❌ Off-topic answer' },
        text: {
            tr: 'Ürünlerimiz hakkında daha fazla bilgi için web sitemizi ziyaret edebilirsin!',
            en: 'For more info about our products, feel free to visit our website!',
        },
        scores: { accuracy: 3, relevance: 1, safety: 5, conciseness: 4 },
        reasoning: { tr: 'Güvenli ama iade sorusunu hiç cevaplamıyor — alaka çok düşük.', en: 'Safe but never answers the return question — very low relevance.' },
    },
]

function barColor(score, darkMode) {
    if (score >= 4) return darkMode ? 'bg-emerald-400' : 'bg-emerald-500'
    if (score >= 3) return darkMode ? 'bg-amber-400' : 'bg-amber-500'
    return darkMode ? 'bg-rose-400' : 'bg-rose-500'
}

/* Deterministik demo skorlayıcı — Groq yokken kullanıcının kendi metni için
   kaba ama tutarlı bir sezgi (uzunluk + anahtar kelime). Gerçek yargı değil,
   "canlı mod kapalı" göstergesiyle sunulur. */
function heuristicScore(text) {
    const t = (text || '').toLowerCase()
    const words = t.trim().split(/\s+/).filter(Boolean).length
    const hasNumber = /\b\d+\b/.test(t)
    const tooLong = words > 60
    const tooShort = words < 4
    return {
        accuracy: hasNumber ? 4 : 3,
        relevance: tooShort ? 2 : 4,
        safety: /(hack|ignore previous|şifreni ver|password)/.test(t) ? 2 : 5,
        conciseness: tooLong ? 2 : tooShort ? 3 : 5,
    }
}

function JudgePlaygroundBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const scenario = block.scenario
    const examples = Array.isArray(block.examples) && block.examples.length ? block.examples : DEFAULT_EXAMPLES
    const rubric = Array.isArray(block.rubric) && block.rubric.length ? block.rubric : DEFAULT_RUBRIC

    const [activeNames, setActiveNames] = useState(() => rubric.map((r) => r.name))
    const [selectedIdx, setSelectedIdx] = useState(0)
    const [customText, setCustomText] = useState('')
    const [result, setResult] = useState(null) // { scores, overall, reasoning, live }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const activeRubric = useMemo(
        () => rubric.filter((r) => activeNames.includes(r.name)),
        [rubric, activeNames]
    )
    const usingCustom = customText.trim().length > 0
    const evaluatedText = usingCustom ? customText.trim() : pick(examples[selectedIdx]?.text, isTr)

    function toggleCriterion(name) {
        setActiveNames((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        )
    }

    function averageOf(scores) {
        const vals = activeRubric.map((r) => scores[r.name]).filter((v) => typeof v === 'number')
        return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
    }

    async function evaluate() {
        setError('')
        if (activeRubric.length === 0) {
            setError(isTr ? 'En az bir kriter seçmelisin.' : 'Select at least one criterion.')
            return
        }

        // Canlı mod: kullanıcı kendi metnini yazdı VE Supabase yapılandırılmış.
        if (usingCustom && isSupabaseConfigured && supabase) {
            setLoading(true)
            try {
                const { data, error: fnError } = await supabase.functions.invoke('judge-eval', {
                    body: {
                        mode: 'rubric',
                        inputText: customText.trim(),
                        context: scenario ? pick(scenario, isTr) : '',
                        rubric: activeRubric.map((r) => ({
                            name: r.name,
                            description: pick(r.desc, isTr) || (isTr ? r.tr : r.en),
                        })),
                    },
                })
                if (fnError) throw fnError
                if (data?.error) throw new Error(data.error)
                setResult({
                    scores: data.scores || {},
                    overall: data.overall ?? averageOf(data.scores || {}),
                    reasoning: data.reasoning || '',
                    live: true,
                })
            } catch (err) {
                console.error('judge-eval failed:', err)
                // Canlı çağrı başarısızsa sessizce sezgisel demo'ya düş.
                const scores = heuristicScore(customText)
                setResult({ scores, overall: averageOf(scores), reasoning: '', live: false })
                setError(isTr
                    ? 'Canlı değerlendirme yapılamadı (üyelik/servis gerekli) — demo skoru gösteriliyor.'
                    : 'Live evaluation unavailable (needs membership/service) — showing demo score.')
            } finally {
                setLoading(false)
            }
            return
        }

        // Demo mod: hazır örnek → el-yazımı puanlar; kendi metni → sezgisel.
        if (usingCustom) {
            const scores = heuristicScore(customText)
            setResult({ scores, overall: averageOf(scores), reasoning: '', live: false })
        } else {
            const ex = examples[selectedIdx]
            setResult({
                scores: ex?.scores || {},
                overall: averageOf(ex?.scores || {}),
                reasoning: pick(ex?.reasoning, isTr),
                live: false,
            })
        }
    }

    const card = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    const subtle = darkMode ? 'text-slate-400' : 'text-slate-500'
    const inputCls = darkMode
        ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder-slate-500'
        : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400'

    return (
        <div className={`mt-6 rounded-2xl border p-4 md:p-5 ${card}`} data-testid="judge-playground-block">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">⚖️</span>
                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {isTr ? 'Yargıç Oyun Alanı — LLM-as-a-Judge' : 'Judge Playground — LLM-as-a-Judge'}
                </h4>
            </div>
            {scenario && (
                <p className={`text-sm mb-4 ${subtle}`}>
                    <span className="font-semibold">{isTr ? 'Senaryo: ' : 'Scenario: '}</span>{pick(scenario, isTr)}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SOL: girdi + rubrik */}
                <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>
                        {isTr ? 'Değerlendirilecek yanıt' : 'Answer to evaluate'}
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {examples.map((ex, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => { setSelectedIdx(i); setCustomText(''); setResult(null) }}
                                data-testid={`judge-example-${i}`}
                                className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                                    !usingCustom && selectedIdx === i
                                        ? (darkMode ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200' : 'border-indigo-400 bg-indigo-50 text-indigo-700')
                                        : (darkMode ? 'border-slate-600 text-slate-300 hover:border-indigo-400' : 'border-slate-300 text-slate-600 hover:border-indigo-400')
                                }`}
                            >
                                {pick(ex.label, isTr)}
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={usingCustom ? customText : evaluatedText}
                        onChange={(e) => { setCustomText(e.target.value); setResult(null) }}
                        rows={4}
                        data-testid="judge-input"
                        placeholder={isTr ? 'Ya da kendi chatbot yanıtını yaz...' : 'Or write your own chatbot answer...'}
                        className={`w-full rounded-lg border p-3 text-sm resize-y ${inputCls}`}
                        style={{ fontSize: '16px' }}
                    />

                    <label className={`block text-xs font-semibold uppercase tracking-wide mt-4 mb-2 ${subtle}`}>
                        {isTr ? 'Rubrik (değerlendirme kriterleri)' : 'Rubric (evaluation criteria)'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {rubric.map((r) => {
                            const on = activeNames.includes(r.name)
                            return (
                                <button
                                    key={r.name}
                                    type="button"
                                    onClick={() => toggleCriterion(r.name)}
                                    data-testid={`judge-criterion-${r.name}`}
                                    title={pick(r.desc, isTr)}
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                                        on
                                            ? (darkMode ? 'border-teal-400 bg-teal-500/20 text-teal-200' : 'border-teal-500 bg-teal-50 text-teal-700')
                                            : (darkMode ? 'border-slate-700 text-slate-500' : 'border-slate-200 text-slate-400')
                                    }`}
                                >
                                    {on ? '✓ ' : '＋ '}{isTr ? r.tr : r.en}
                                </button>
                            )
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={evaluate}
                        disabled={loading}
                        data-testid="judge-evaluate"
                        className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-60"
                    >
                        {loading ? (isTr ? 'Değerlendiriliyor...' : 'Evaluating...') : (isTr ? '⚖️ Değerlendir' : '⚖️ Evaluate')}
                    </button>
                </div>

                {/* SAĞ: skor kartı */}
                <div className={`rounded-xl border p-3 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                    {!result ? (
                        <p className={`text-sm ${subtle}`}>
                            {isTr ? 'Bir yanıt seç veya yaz, kriterleri belirle ve "Değerlendir"e bas — puanlar burada bar chart olarak çıkacak.' : 'Pick or write an answer, choose criteria and press "Evaluate" — scores appear here as a bar chart.'}
                        </p>
                    ) : (
                        <div className="det-vs-stoch-pop">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-semibold uppercase tracking-wide ${subtle}`}>{isTr ? 'Rubrik skoru' : 'Rubric score'}</span>
                                <span className={`text-[11px] px-2 py-0.5 rounded-full ${result.live ? (darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700') : (darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600')}`}>
                                    {result.live ? (isTr ? '● Canlı AI' : '● Live AI') : (isTr ? '○ Demo' : '○ Demo')}
                                </span>
                            </div>
                            <div className="space-y-2">
                                {activeRubric.map((r) => {
                                    const s = result.scores[r.name] ?? 0
                                    return (
                                        <div key={r.name}>
                                            <div className="flex items-center justify-between text-xs mb-0.5">
                                                <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{isTr ? r.tr : r.en}</span>
                                                <span className={`font-mono font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{s}/5</span>
                                            </div>
                                            <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                                                <div className={`h-full rounded-full transition-all duration-500 ${barColor(s, darkMode)}`} style={{ width: `${(s / 5) * 100}%` }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={`mt-3 flex items-center justify-between rounded-lg px-3 py-2 ${darkMode ? 'bg-slate-800' : 'bg-white border border-slate-200'}`}>
                                <span className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{isTr ? 'Genel' : 'Overall'}</span>
                                <span className={`text-lg font-bold font-mono ${result.overall >= 4 ? (darkMode ? 'text-emerald-300' : 'text-emerald-600') : result.overall >= 3 ? (darkMode ? 'text-amber-300' : 'text-amber-600') : (darkMode ? 'text-rose-300' : 'text-rose-500')}`}>{result.overall}/5</span>
                            </div>
                            {result.reasoning && (
                                <p className={`mt-2 text-xs leading-relaxed ${subtle}`}>“{result.reasoning}”</p>
                            )}
                        </div>
                    )}
                    {error && <p className={`mt-2 text-xs ${darkMode ? 'text-amber-300' : 'text-amber-600'}`}>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default JudgePlaygroundBlock
