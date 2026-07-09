import { useMemo, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   ObservabilityDashboardBlock — Modül L-5 (AIQA_ROADMAP.md)
   "Gözlem Altındaki AI: Arize, Phoenix ve WhyLabs Mantığı"

   Statik ama animasyonlu bir "mock" observability dashboard:
   1) 7 günlük halüsinasyon oranı trend çizgisi + eşik çizgisi — eşik aşılınca
      🚨 kırmızı alert rozeti belirir.
   2) Latency/token dağılımı mini histogram.
   3) "Trace Analizi" egzersizi — kullanıcı "bu trace'de sorun nerede?" sorusunu
      adım adım tıklayarak yanıtlar; yanlış adımda kısa bir ipucu, doğru
      (kök neden) adımda yeşil vurgulu açıklama gösterilir.

   Gerçek API/veri çağrısı YOK — tamamı el yazımı, deterministik mock veri.
   Veri `block.days` / `block.latencyBuckets` / `block.trace` üzerinden gelir;
   Sonnet gerçek senaryoyu ekler. Yerleşik varsayılan tek başına çalışır.
   ───────────────────────────────────────────────────────────────────────── */

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

const DEFAULT_DAYS = [
    { label: { tr: 'Gün -6', en: 'Day -6' }, rate: 3 },
    { label: { tr: 'Gün -5', en: 'Day -5' }, rate: 3 },
    { label: { tr: 'Gün -4', en: 'Day -4' }, rate: 4 },
    { label: { tr: 'Gün -3', en: 'Day -3' }, rate: 5 },
    { label: { tr: 'Gün -2', en: 'Day -2' }, rate: 6 },
    { label: { tr: 'Gün -1', en: 'Day -1' }, rate: 7 },
    { label: { tr: 'Bugün', en: 'Today' }, rate: 11 },
]
const DEFAULT_THRESHOLD = 8

const DEFAULT_LATENCY_BUCKETS = [
    { label: '<1s', pct: 40 },
    { label: '1-2s', pct: 35 },
    { label: '2-4s', pct: 15 },
    { label: '>4s', pct: 10 },
]

const DEFAULT_TRACE = {
    steps: [
        { label: { tr: '1. Prompt Şablonu', en: '1. Prompt Template' }, detail: { tr: 'Sistem promptu son 7 gündür değişmedi.', en: "The system prompt hasn't changed in the last 7 days." } },
        { label: { tr: '2. Token Sayısı', en: '2. Token Count' }, detail: { tr: 'Ortalama girdi/çıktı token sayısı normal aralıkta.', en: 'Average input/output token count is within the normal range.' } },
        { label: { tr: '3. Retrieval (top_k)', en: '3. Retrieval (top_k)' }, detail: { tr: 'Retrieval adımı şu an sadece top_k=1 pasaj getiriyor — geçen hafta top_k=3 idi, bir deploy sırasında sessizce düşürülmüş.', en: 'The retrieval step now fetches only top_k=1 passages — last week it was top_k=3, silently lowered during a deploy.' } },
        { label: { tr: '4. Model Versiyonu', en: '4. Model Version' }, detail: { tr: 'Kullanılan model versiyonu değişmedi.', en: 'The model version in use has not changed.' } },
        { label: { tr: '5. Yanıt Süresi (Latency)', en: '5. Response Time (Latency)' }, detail: { tr: 'Ortalama yanıt süresi geçen haftayla aynı.', en: 'Average response time is the same as last week.' } },
    ],
    culprit: 2,
    explanation: {
        tr: 'top_k düşürüldüğü için model artık yeterli bağlam alamıyor ve eksik bilgiyi kendi tahminleriyle dolduruyor — halüsinasyon oranındaki artışın kök nedeni budur. Diğer tüm sinyaller (prompt, token, model versiyonu, latency) normal göründüğü için bu kolayca gözden kaçabilir; observability olmadan bu regresyon haftalarca fark edilmeyebilirdi.',
        en: 'Because top_k was lowered, the model no longer receives enough context and fills the gap with its own guesses — this is the root cause of the rising hallucination rate. Every other signal (prompt, tokens, model version, latency) looks normal, which is exactly why this is easy to miss; without observability this regression could go unnoticed for weeks.',
    },
}

function DashboardTrendChart({ days, threshold, darkMode, isTr }) {
    const W = 320, H = 120, PAD = 16
    const max = Math.max(threshold, ...days.map((d) => d.rate)) + 2
    const stepX = (W - PAD * 2) / (days.length - 1)
    const yFor = (v) => H - PAD - (v / max) * (H - PAD * 2)
    const points = days.map((d, i) => `${PAD + i * stepX},${yFor(d.rate)}`).join(' ')
    const thresholdY = yFor(threshold)
    const lastDay = days[days.length - 1]
    const breached = lastDay.rate > threshold

    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} className="overflow-visible">
            <line x1={PAD} y1={thresholdY} x2={W - PAD} y2={thresholdY} stroke={darkMode ? '#f59e0b' : '#d97706'} strokeWidth="1.5" strokeDasharray="4 3" />
            <text x={W - PAD} y={thresholdY - 4} textAnchor="end" fontSize="9" fill={darkMode ? '#f59e0b' : '#d97706'}>
                {isTr ? 'eşik' : 'threshold'} {threshold}%
            </text>
            <polyline points={points} fill="none" stroke={breached ? '#f43f5e' : '#6366f1'} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {days.map((d, i) => {
                const x = PAD + i * stepX
                const y = yFor(d.rate)
                const isLast = i === days.length - 1
                return (
                    <g key={i}>
                        <circle cx={x} cy={y} r={isLast ? 5 : 3} fill={isLast && breached ? '#f43f5e' : (darkMode ? '#818cf8' : '#6366f1')} />
                        <text x={x} y={H + 14} textAnchor="middle" fontSize="8" fill={darkMode ? '#94a3b8' : '#64748b'}>{pick(d.label, isTr)}</text>
                    </g>
                )
            })}
        </svg>
    )
}

function ObservabilityDashboardBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const days = Array.isArray(block.days) && block.days.length ? block.days : DEFAULT_DAYS
    const threshold = typeof block.threshold === 'number' ? block.threshold : DEFAULT_THRESHOLD
    const latencyBuckets = Array.isArray(block.latencyBuckets) && block.latencyBuckets.length ? block.latencyBuckets : DEFAULT_LATENCY_BUCKETS
    const trace = block.trace || DEFAULT_TRACE

    const [investigating, setInvestigating] = useState(false)
    const [triedSteps, setTriedSteps] = useState([]) // indices tried
    const [found, setFound] = useState(false)

    const lastDay = days[days.length - 1]
    const breached = lastDay.rate > threshold

    function tryStep(idx) {
        if (found) return
        setTriedSteps((prev) => (prev.includes(idx) ? prev : [...prev, idx]))
        if (idx === trace.culprit) setFound(true)
    }

    const card = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    const subtle = darkMode ? 'text-slate-400' : 'text-slate-500'
    const box = darkMode ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-200'

    return (
        <div className={`mt-6 rounded-2xl border p-4 md:p-5 ${card}`} data-testid="observability-dashboard-block">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">📡</span>
                <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {isTr ? 'Mock Observability Dashboard' : 'Mock Observability Dashboard'}
                </h4>
                {breached && (
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full det-vs-stoch-pop ${darkMode ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-700'}`}>
                        🚨 {isTr ? 'KIRMIZI ALERT' : 'RED ALERT'}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hallucination rate trend */}
                <div className={`rounded-xl border p-3 ${box}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>
                        {isTr ? 'Halüsinasyon oranı (son 7 gün)' : 'Hallucination rate (last 7 days)'}
                    </div>
                    <DashboardTrendChart days={days} threshold={threshold} darkMode={darkMode} isTr={isTr} />
                </div>

                {/* Latency/token histogram */}
                <div className={`rounded-xl border p-3 ${box}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>
                        {isTr ? 'Yanıt süresi dağılımı' : 'Latency distribution'}
                    </div>
                    <div className="flex items-end gap-3 h-[100px]">
                        {latencyBuckets.map((b) => (
                            <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
                                <div
                                    className={`w-full rounded-t-md ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`}
                                    style={{ height: `${b.pct}%`, transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                                />
                                <span className={`mt-1 text-[10px] ${subtle}`}>{b.label}</span>
                                <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>%{b.pct}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {breached && !investigating && (
                <button
                    type="button"
                    onClick={() => setInvestigating(true)}
                    data-testid="observability-investigate"
                    className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-500 transition-colors"
                >
                    {isTr ? '🔎 Spike\'ı İncele →' : '🔎 Investigate the Spike →'}
                </button>
            )}

            {investigating && (
                <div className={`mt-4 rounded-xl border p-3 det-vs-stoch-pop ${box}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>
                        {isTr ? 'Trace Analizi — bu trace\'de sorun nerede?' : 'Trace Analysis — where is the problem in this trace?'}
                    </div>
                    <div className="space-y-2">
                        {trace.steps.map((s, i) => {
                            const tried = triedSteps.includes(i)
                            const isCulprit = i === trace.culprit
                            const revealCorrect = found && isCulprit
                            const revealWrong = tried && !isCulprit
                            return (
                                <div key={i}>
                                    <button
                                        type="button"
                                        onClick={() => tryStep(i)}
                                        disabled={found}
                                        data-testid={`observability-trace-step-${i}`}
                                        className={`w-full text-left rounded-lg border px-3 py-2 text-sm transition-colors ${
                                            revealCorrect
                                                ? (darkMode ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-emerald-500 bg-emerald-50 text-emerald-700')
                                                : revealWrong
                                                    ? (darkMode ? 'border-rose-500/60 bg-rose-500/10 text-rose-200' : 'border-rose-300 bg-rose-50 text-rose-700')
                                                    : (darkMode ? 'border-slate-700 text-slate-300 hover:border-indigo-400' : 'border-slate-200 text-slate-700 hover:border-indigo-400')
                                        }`}
                                    >
                                        <span className="font-semibold">{pick(s.label, isTr)}</span>
                                        {tried && <span className="ml-2 text-xs">{pick(s.detail, isTr)}</span>}
                                    </button>
                                    {revealWrong && (
                                        <p className={`mt-1 ml-1 text-xs ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                                            {isTr ? '❌ Burası normal görünüyor, başka bir adıma bak.' : "❌ This looks normal, check another step."}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {found && (
                        <div className={`mt-3 rounded-lg p-3 text-sm leading-relaxed border-l-4 border-emerald-500 det-vs-stoch-pop ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'}`}>
                            <span className="font-semibold">{isTr ? '✅ Kök neden bulundu: ' : '✅ Root cause found: '}</span>{pick(trace.explanation, isTr)}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ObservabilityDashboardBlock
