import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { sanitizeAiText } from '../lib/sanitizeAiText'
import { getLearningAnalytics } from '../lib/progressStore'
import { recordSnapshot, getPersistentWeakness, syncSnapshotsToCloud } from '../lib/mentorSnapshots'
import { buildLocalAdvice } from '../lib/mentorAdvice'

// ─────────────────────────────────────────────────────────────────────────────
// MentorPanel — Kişisel AI Mentor (öğrenme yazısı #5). Plan Bölüm 6 (O5).
//
// HomePage'de LearningAnalytics panosunun HEMEN ALTINA render edilir. LearningAnalytics
// "şu an en zayıf konu" der; bu panel onun üstüne ZAMAN boyutunu ("N gündür X'te
// takılıyorsun") + SOMUT sonraki adımları ekler.
//
// İKİ KATMAN (plan §6.1):
//  • Katman A (herkes, üyeliksiz): getPersistentWeakness() + buildLocalAdvice() ile
//    ANINDA yerel, kural tabanlı öğüt. Backend gerekmez (§5).
//  • Katman B (yalnızca üye): "Daha derin analiz al" butonu mentor-advice edge
//    function'ını çağırır, AI öğüdünü yerel öğüdün üstüne bindirir (progressive
//    enhancement). Üye değilse AI butonu/çıktısı HİÇ gösterilmez — sadece ince bir
//    "üye ol → AI koçu" teşviki (AI çağrısı yapılmaz).
//
// Proaktif (karar §6.2-②): HomePage açılınca panel kendiliğinden görünür (tıklama
// beklemez). Kalıcı zayıflık yoksa panel HİÇ render edilmez (LearningAnalytics ile
// aynı davranış — yeni ziyaretçiye gürültü olmasın).
// ─────────────────────────────────────────────────────────────────────────────

// Önem derecesi → kart aksan rengi (yeşil-düşük / amber-orta / kırmızı-yüksek).
function severityStyles(severity, darkMode) {
    if (severity === 'high') {
        return darkMode
            ? { border: 'border-rose-700/60', bg: 'bg-rose-950/30', chip: 'text-rose-300', bar: '#fb7185' }
            : { border: 'border-rose-300', bg: 'bg-rose-50', chip: 'text-rose-700', bar: '#e11d48' }
    }
    if (severity === 'medium') {
        return darkMode
            ? { border: 'border-amber-700/60', bg: 'bg-amber-950/30', chip: 'text-amber-300', bar: '#fbbf24' }
            : { border: 'border-amber-300', bg: 'bg-amber-50', chip: 'text-amber-700', bar: '#d97706' }
    }
    return darkMode
        ? { border: 'border-indigo-700/60', bg: 'bg-indigo-950/30', chip: 'text-indigo-300', bar: '#818cf8' }
        : { border: 'border-indigo-200', bg: 'bg-indigo-50', chip: 'text-indigo-700', bar: '#6366f1' }
}

export default function MentorPanel({ darkMode, language }) {
    const isTr = language === 'tr'
    const { session } = useAuth()
    const [advice, setAdvice] = useState(null)      // yerel (deterministik) öğüt
    const [weakness, setWeakness] = useState(null)
    const [aiAdvice, setAiAdvice] = useState(null)  // AI (edge function) öğüdü
    const [aiLoading, setAiLoading] = useState(false)
    const [aiError, setAiError] = useState('')

    // Mount'ta: bugünün snapshot'ını kaydet (gün başına idempotent) → kalıcı
    // zayıflığı türet → yerel öğüdü kur. Tümü senkron/yerel, AI beklemez.
    useEffect(() => {
        try {
            recordSnapshot()
            const w = getPersistentWeakness()
            const analytics = getLearningAnalytics()
            setWeakness(w)
            setAdvice(buildLocalAdvice(w, analytics, language))
        } catch {
            setAdvice(null)
        }
    }, [language])

    // Üye ise yerel snapshot'ları buluta senkronla (cihazlar-arası). Backend
    // yoksa/hata olursa sessizce geçer — yerel deneyim etkilenmez.
    useEffect(() => {
        if (session) syncSnapshotsToCloud(session).catch(() => {})
    }, [session])

    // Kalıcı zayıflık yoksa panel hiç görünmez (proaktif ama gürültüsüz).
    if (!advice) return null

    const s = severityStyles(advice.severity, darkMode)
    const cardText = darkMode ? 'text-gray-200' : 'text-gray-800'
    const subText = darkMode ? 'text-gray-400' : 'text-gray-500'
    const aiEnabled = isSupabaseConfigured && Boolean(session)

    function requestAiAdvice() {
        if (!aiEnabled || aiLoading) return
        setAiLoading(true)
        setAiError('')
        const analytics = (() => { try { return getLearningAnalytics() } catch { return null } })()
        supabase.functions.invoke('mentor-advice', {
            body: {
                persistentWeakness: weakness,
                analyticsSummary: analytics && {
                    quizAccuracy: analytics.quizAccuracy,
                    topicsStarted: analytics.topicsStarted,
                    topicsCompleted: analytics.topicsCompleted,
                    strongest: analytics.strongest,
                    weakest: analytics.weakest,
                    mostMissed: analytics.mostMissed,
                },
                lang: isTr ? 'tr' : 'en',
            },
        }).then(({ data, error }) => {
            if (error) throw error
            if (data?.error) throw new Error(data.error)
            setAiAdvice({
                headline: sanitizeAiText(data.headline || ''),
                diagnosis: sanitizeAiText(data.diagnosis || ''),
                actions: Array.isArray(data.actions) ? data.actions.slice(0, 4) : [],
            })
        }).catch((err) => {
            console.error('mentor-advice failed:', err)
            setAiError(isTr ? 'AI koçu şu an yanıt veremedi. Yukarıdaki öneriyle devam edebilirsin.' : 'The AI coach could not respond right now. You can continue with the guidance above.')
        }).finally(() => setAiLoading(false))
    }

    return (
        <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
            <div className={`rounded-2xl border-2 p-4 md:p-6 shadow-lg animate-fadeIn ${s.border} ${s.bg}`} data-testid="mentor-panel">
                {/* Başlık */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">🧭</span>
                    <div>
                        <div className={`text-[11px] font-bold uppercase tracking-wide ${s.chip}`}>
                            {isTr ? 'Kişisel Mentorun' : 'Your Personal Mentor'}
                        </div>
                        <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {advice.headline}
                        </h2>
                    </div>
                </div>

                {/* Teşhis */}
                <p className={`text-sm leading-relaxed ${cardText}`}>{advice.diagnosis}</p>

                {/* Somut sonraki adımlar */}
                {advice.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {advice.actions.map((a, i) => (
                            <Link
                                key={`${a.route}-${i}`}
                                to={a.route}
                                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs md:text-sm font-bold min-h-[36px] transition-transform hover:scale-[1.02] ${darkMode
                                    ? 'border-gray-600 bg-gray-800 text-gray-100 hover:border-gray-400'
                                    : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'}`}
                            >
                                <span aria-hidden="true">→</span>{a.label}
                            </Link>
                        ))}
                    </div>
                )}

                {/* ── Katman B: AI koçu — SADECE üyelere (karar §6.2-③④) ── */}
                {aiEnabled ? (
                    <div className={`mt-4 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        {!aiAdvice && (
                            <button
                                onClick={requestAiAdvice}
                                disabled={aiLoading}
                                data-testid="mentor-ai-button"
                                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs md:text-sm font-bold min-h-[36px] transition-all ${darkMode
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60'
                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60'}`}
                            >
                                {aiLoading
                                    ? <><span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden="true" />{isTr ? 'AI koçu düşünüyor…' : 'AI coach thinking…'}</>
                                    : <>✨ {isTr ? 'Daha derin analiz al' : 'Get a deeper analysis'}</>}
                            </button>
                        )}

                        {aiError && <p className={`mt-2 text-xs animate-fadeIn ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>{aiError}</p>}

                        {aiAdvice && (
                            <div className={`rounded-xl border p-3 animate-scaleIn shadow-focus-accent ${darkMode ? 'border-purple-700/50 bg-purple-950/30' : 'border-purple-200 bg-purple-50'}`} data-testid="mentor-ai-result">
                                <div className={`text-[11px] font-bold uppercase tracking-wide mb-1 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                                    ✨ {isTr ? 'AI Koçunun Analizi' : 'Your AI Coach\'s Analysis'}
                                </div>
                                {aiAdvice.headline && <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{aiAdvice.headline}</div>}
                                {aiAdvice.diagnosis && <p className={`mt-1 text-sm leading-relaxed ${cardText}`}>{aiAdvice.diagnosis}</p>}
                                {aiAdvice.actions.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {aiAdvice.actions.map((a, i) => (
                                            a?.route
                                                ? <Link key={i} to={a.route} className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold min-h-[36px] ${darkMode ? 'border-purple-600 bg-purple-900/40 text-purple-100' : 'border-purple-200 bg-white text-purple-800'}`}>→ {sanitizeAiText(a.label || a.route)}</Link>
                                                : <span key={i} className={`text-xs ${cardText}`}>• {sanitizeAiText(a?.label || '')}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className={`mt-4 pt-3 border-t text-[11px] ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                        {isTr
                            ? '✨ Üye olursan AI koçun bu analizi kişiye özel derinleştirir.'
                            : '✨ Sign in and your AI coach will deepen this analysis for you.'}
                    </p>
                )}

                <p className={`mt-3 text-[11px] ${subText}`}>
                    {isTr
                        ? 'Bu öneri yalnızca senin cihazındaki ilerlemenden hesaplanır — üyelik gerekmez.'
                        : 'This guidance is computed only from progress on your device — no account needed.'}
                </p>
            </div>
        </div>
    )
}
