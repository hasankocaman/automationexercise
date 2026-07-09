import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

/* ─────────────────────────────────────────────────────────────────────────
   VisualDiffDetectiveBlock — Modül C-4 (AIQA_ROADMAP.md)
   "Gözüyle Test Eden Mühendis: AI Vision ile Visual Regression"

   Not: Roadmap bu modülü "Claude Vision" olarak tanımlıyordu, ama bu proje
   production AI servisi olarak Groq kullanır (bkz. CLAUDE.md/AIQA_ROADMAP §3.1
   "Modül C-4 istisnası"). Kullanıcı seçeneği: Anthropic key yerine Groq'un
   vision-destekli modeli (bkz. supabase/functions/visual-diff-judge).

   İKİ BÖLÜM:
   1) "Diff Dedektif" — kullanıcı gerçek iki ekran görüntüsü yükler (önce/sonra).
      Üye + Supabase yapılandırılmışsa `visual-diff-judge` edge function
      (Groq vision) çağrılır ve 3 kategoriden birine (kritik/kozmetik/kabul
      edilebilir) sınıflandırılır + gerekçe gösterilir. Üye değilse veya
      Supabase yoksa, canlı analiz yerine net bir bilgi mesajı gösterilir —
      görsel token'lar pahalı olduğu için anonim trafik gerçek çağrı yapmaz.
   2) "Hata Sınıflandırma Oyunu" — CSS/div tabanlı (dış görsel dosyası YOK)
      3 hazır UI mockup çifti üzerinde kullanıcı önce kendi tahminini yapar
      (kritik/kozmetik/kabul edilebilir), sonra uzman gerekçesiyle karşılaştırır.

   Veri `block.scenarios` üzerinden gelir; Sonnet gerçek senaryoları ekler.
   Yerleşik varsayılan tek başına çalışır.
   ───────────────────────────────────────────────────────────────────────── */

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

const CATEGORY_META = {
    kritik_degisiklik: { icon: '🚨', label: { tr: 'Kritik Değişiklik', en: 'Critical Change' }, cls: 'rose' },
    kozmetik_degisiklik: { icon: '🎨', label: { tr: 'Kozmetik Değişiklik', en: 'Cosmetic Change' }, cls: 'amber' },
    kabul_edilebilir: { icon: '✅', label: { tr: 'Kabul Edilebilir', en: 'Acceptable' }, cls: 'emerald' },
}

function categoryClasses(key, darkMode) {
    const map = {
        rose: darkMode ? 'border-rose-500 bg-rose-500/15 text-rose-200' : 'border-rose-500 bg-rose-50 text-rose-700',
        amber: darkMode ? 'border-amber-500 bg-amber-500/15 text-amber-200' : 'border-amber-500 bg-amber-50 text-amber-700',
        emerald: darkMode ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-emerald-500 bg-emerald-50 text-emerald-700',
    }
    return map[key] || map.amber
}

/* ── Dış görsel dosyası yok: CSS/div tabanlı mini UI kartı mockup'ı ── */
function MockLoginCard({ variant, phase, darkMode }) {
    const buttonColor =
        variant === 'color-shift' && phase === 'after'
            ? (darkMode ? '#0d9488' : '#0d9488')
            : (darkMode ? '#6366f1' : '#4f46e5')
    const showButton = !(variant === 'button-missing' && phase === 'after')
    const labelShift = variant === 'pixel-shift' && phase === 'after' ? 2 : 0

    return (
        <div className={`rounded-lg border p-3 w-full ${darkMode ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className={`h-2 w-16 rounded mb-3 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
            <div style={{ marginLeft: labelShift }} className={`h-2 w-24 rounded mb-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-200'}`} />
            <div className={`h-6 w-full rounded mb-2 border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
            <div className={`h-6 w-full rounded mb-3 border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
            {showButton ? (
                <div className="h-7 w-20 rounded text-[9px] text-white flex items-center justify-center font-semibold" style={{ background: buttonColor }}>
                    SUBMIT
                </div>
            ) : (
                <div className={`h-7 w-20 rounded border border-dashed ${darkMode ? 'border-slate-700' : 'border-slate-300'}`} />
            )}
        </div>
    )
}

const DEFAULT_SCENARIOS = [
    {
        id: 'button-missing',
        title: { tr: 'Senaryo 1: Giriş Formu', en: 'Scenario 1: Login Form' },
        category: 'kritik_degisiklik',
        reasoning: {
            tr: 'SUBMIT butonu tamamen kayboldu — kullanıcı formu göndermenin hiçbir yolu yok. Bu bir işlevsellik kırılmasıdır, kozmetik değil.',
            en: 'The SUBMIT button disappeared entirely — there is no way for the user to submit the form. This is a functional break, not cosmetic.',
        },
    },
    {
        id: 'color-shift',
        title: { tr: 'Senaryo 2: Buton Rengi', en: 'Scenario 2: Button Color' },
        category: 'kozmetik_degisiklik',
        reasoning: {
            tr: 'Buton rengi indigo\'dan çamgöbeğine değişti ama hâlâ görünür, okunur ve tıklanabilir — kullanıcı deneyimini bozmuyor.',
            en: 'The button color changed from indigo to teal, but it is still visible, legible, and clickable — it does not break the user experience.',
        },
    },
    {
        id: 'pixel-shift',
        title: { tr: 'Senaryo 3: Etiket Konumu', en: 'Scenario 3: Label Position' },
        category: 'kabul_edilebilir',
        reasoning: {
            tr: 'Etiket sadece birkaç piksel kaymış — muhtemelen font render veya tarayıcı zamanlama farkı, gerçek bir tasarım değişikliği değil.',
            en: 'The label shifted by only a couple of pixels — likely a font-rendering or timing artifact, not an intentional design change.',
        },
    },
]

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

function VisualDiffDetectiveBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const { session } = useAuth()
    const scenarios = Array.isArray(block.scenarios) && block.scenarios.length ? block.scenarios : DEFAULT_SCENARIOS

    /* ── 1. Diff Dedektif (gerçek yükleme + canlı analiz) ── */
    const [beforeFile, setBeforeFile] = useState(null)
    const [afterFile, setAfterFile] = useState(null)
    const [beforePreview, setBeforePreview] = useState(null)
    const [afterPreview, setAfterPreview] = useState(null)
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    const canAnalyzeLive = isSupabaseConfigured && !!session

    async function handleFileChange(e, which) {
        const file = e.target.files?.[0]
        if (!file) return
        const dataUrl = await fileToBase64(file)
        if (which === 'before') { setBeforeFile(file); setBeforePreview(dataUrl) }
        else { setAfterFile(file); setAfterPreview(dataUrl) }
        setResult(null)
        setError('')
    }

    async function analyze() {
        if (!beforePreview || !afterPreview) return
        setError('')
        if (!canAnalyzeLive) {
            setError(isTr
                ? 'Canlı analiz için üye girişi gerekiyor (görsel token maliyeti nedeniyle). Aşağıdaki sınıflandırma oyununu demo olarak deneyebilirsin.'
                : 'Live analysis requires signing in (image tokens carry a real cost). You can try the classification game below as a demo.')
            return
        }
        setAnalyzing(true)
        try {
            const { data, error: fnError } = await supabase.functions.invoke('visual-diff-judge', {
                body: { beforeImage: beforePreview, afterImage: afterPreview },
            })
            if (fnError) throw fnError
            if (data?.error) throw new Error(data.error)
            setResult({ category: data.category, reasoning: data.reasoning })
        } catch (err) {
            console.error('visual-diff-judge failed:', err)
            setError(isTr ? 'Analiz yapılamadı, lütfen tekrar dene.' : 'Could not analyze, please try again.')
        } finally {
            setAnalyzing(false)
        }
    }

    /* ── 2. Hata Sınıflandırma Oyunu (offline, CSS mockup) ── */
    const [idx, setIdx] = useState(0)
    const [guess, setGuess] = useState(null)
    const [correctCount, setCorrectCount] = useState(0)
    const [answered, setAnswered] = useState(() => new Set())

    const scenario = scenarios[idx]
    const finished = answered.size >= scenarios.length

    function chooseGuess(cat) {
        if (guess != null) return
        setGuess(cat)
        if (cat === scenario.category && !answered.has(idx)) setCorrectCount((c) => c + 1)
        setAnswered((prev) => { const next = new Set(prev); next.add(idx); return next })
    }

    function next() {
        setGuess(null)
        setIdx((i) => (i + 1) % scenarios.length)
    }

    function resetGame() {
        setIdx(0); setGuess(null); setCorrectCount(0); setAnswered(new Set())
    }

    const card = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    const subtle = darkMode ? 'text-slate-400' : 'text-slate-500'
    const inputCls = darkMode ? 'text-slate-300' : 'text-slate-600'

    return (
        <div className="mt-6 space-y-6" data-testid="visual-diff-detective-block">
            {/* ══════════ 1. DİFF DEDEKTİF ══════════ */}
            <div className={`rounded-2xl border p-4 md:p-5 ${card}`}>
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">🕵️</span>
                    <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {isTr ? 'Diff Dedektif — Kendi Ekran Görüntülerini Yükle' : 'Diff Detective — Upload Your Own Screenshots'}
                    </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[{ key: 'before', label: isTr ? 'Önce' : 'Before', preview: beforePreview }, { key: 'after', label: isTr ? 'Sonra' : 'After', preview: afterPreview }].map((slot) => (
                        <div key={slot.key} className={`rounded-xl border p-3 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                            <div className={`text-xs font-semibold uppercase tracking-wide mb-2 ${subtle}`}>{slot.label}</div>
                            {slot.preview ? (
                                <img src={slot.preview} alt={slot.label} className="w-full max-h-40 object-contain rounded border border-slate-700 mb-2" />
                            ) : (
                                <div className={`w-full h-24 rounded border border-dashed flex items-center justify-center text-xs mb-2 ${darkMode ? 'border-slate-700 text-slate-600' : 'border-slate-300 text-slate-400'}`}>
                                    {isTr ? 'Henüz yüklenmedi' : 'Not uploaded yet'}
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, slot.key)}
                                data-testid={`visual-diff-upload-${slot.key}`}
                                className={`text-xs ${inputCls}`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={analyze}
                    disabled={!beforePreview || !afterPreview || analyzing}
                    data-testid="visual-diff-analyze"
                    className="mt-4 text-sm font-semibold px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
                >
                    {analyzing ? (isTr ? 'Analiz ediliyor...' : 'Analyzing...') : (isTr ? '🔍 Analiz Et' : '🔍 Analyze')}
                </button>

                {!canAnalyzeLive && (
                    <p className={`mt-2 text-xs ${darkMode ? 'text-amber-300' : 'text-amber-600'}`}>
                        {isTr
                            ? 'ℹ️ Canlı analiz sadece üyeler için çalışır (görsel token maliyeti nedeniyle).'
                            : 'ℹ️ Live analysis is members-only (image tokens carry a real cost).'}
                    </p>
                )}
                {error && <p className={`mt-2 text-xs ${darkMode ? 'text-amber-300' : 'text-amber-600'}`}>{error}</p>}

                {result && (
                    <div className={`mt-4 rounded-xl border p-3 det-vs-stoch-pop ${categoryClasses(CATEGORY_META[result.category]?.cls, darkMode)}`}>
                        <div className="font-semibold text-sm mb-1">
                            {CATEGORY_META[result.category]?.icon} {pick(CATEGORY_META[result.category]?.label, isTr)}
                        </div>
                        <p className="text-sm leading-relaxed">{result.reasoning}</p>
                    </div>
                )}
            </div>

            {/* ══════════ 2. HATA SINIFLANDIRMA OYUNU ══════════ */}
            <div className={`rounded-2xl border p-4 md:p-5 ${card}`}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {isTr ? '🎮 Hata Sınıflandırma Oyunu' : '🎮 Diff Classification Game'}
                    </h4>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        {isTr ? `Doğru: ${correctCount}/${scenarios.length}` : `Correct: ${correctCount}/${scenarios.length}`}
                    </span>
                </div>

                {scenario && (
                    <div>
                        <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{pick(scenario.title, isTr)}</p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <div className={`text-[10px] uppercase tracking-wide mb-1 text-center ${subtle}`}>{isTr ? 'Önce' : 'Before'}</div>
                                <MockLoginCard variant={scenario.id} phase="before" darkMode={darkMode} />
                            </div>
                            <div>
                                <div className={`text-[10px] uppercase tracking-wide mb-1 text-center ${subtle}`}>{isTr ? 'Sonra' : 'After'}</div>
                                <MockLoginCard variant={scenario.id} phase="after" darkMode={darkMode} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(CATEGORY_META).map(([key, meta]) => {
                                const chosen = guess === key
                                const reveal = guess != null
                                const right = scenario.category === key
                                let cls = darkMode ? 'border-slate-600 text-slate-200 hover:border-indigo-400' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                                if (reveal && right) cls = categoryClasses('emerald', darkMode)
                                else if (reveal && chosen && !right) cls = categoryClasses('rose', darkMode)
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        disabled={reveal}
                                        onClick={() => chooseGuess(key)}
                                        data-testid={`visual-diff-guess-${key}`}
                                        className={`rounded-xl border-2 px-2 py-3 text-xs font-semibold transition-colors disabled:cursor-default ${cls}`}
                                    >
                                        <span className="block text-lg mb-1">{meta.icon}</span>{pick(meta.label, isTr)}
                                    </button>
                                )
                            })}
                        </div>

                        {guess != null && (
                            <div className={`mt-4 rounded-lg p-3 text-sm leading-relaxed border-l-4 ${guess === scenario.category ? 'border-emerald-500' : 'border-amber-500'} ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-50 text-slate-700'}`}>
                                <span className="font-semibold">{guess === scenario.category ? (isTr ? '✅ Doğru. ' : '✅ Correct. ') : (isTr ? '🤔 Uzman görüşü: ' : '🤔 Expert take: ')}</span>
                                {pick(scenario.reasoning, isTr)}
                            </div>
                        )}

                        <div className="mt-4 flex items-center gap-2">
                            {guess != null && !finished && (
                                <button type="button" onClick={next} data-testid="visual-diff-next"
                                    className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
                                    {isTr ? 'Sonraki →' : 'Next →'}
                                </button>
                            )}
                            {finished && (
                                <>
                                    <span className={`text-sm font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                                        {isTr ? `🎉 Bitti! ${correctCount}/${scenarios.length} doğru.` : `🎉 Done! ${correctCount}/${scenarios.length} correct.`}
                                    </span>
                                    <button type="button" onClick={resetGame}
                                        className={`text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${darkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                                        {isTr ? '↺ Baştan' : '↺ Restart'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VisualDiffDetectiveBlock
