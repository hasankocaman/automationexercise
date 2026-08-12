import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLearningAnalytics } from '../lib/progressStore'

// ─────────────────────────────────────────────────────────────────────────────
// LearningAnalytics — "Öğrenme Analitiğin" panosu (öğrenme yazısı #7).
//
// Kullanıcının değerlendirmesinde istenen tek noktadan geri bildirim: ortalama
// quiz başarısı, en güçlü/en zayıf konu, en çok zorlanılan alan. Tüm veri
// `getLearningAnalytics()` ile mevcut localStorage'dan SALT-OKUNUR türetilir —
// backend/üyelik GEREKMEZ (CLAUDE.md §5, local-first). Henüz hiç quiz
// denenmemişse hiç render edilmez (yeni ziyaretçiye gürültü olmasın).
//
// Route→kısa etiket: tekniklerin adları İngilizce kalır (§8); bilinmeyen route
// için path'ten türetilir. HomePage'deki benzer haritayı ÇOĞALTMAK yerine burada
// self-contained tutuldu (bileşen tek başına taşınabilir olsun).
// ─────────────────────────────────────────────────────────────────────────────

const ROUTE_LABELS = {
    '/selenium': 'Selenium', '/playwright': 'Playwright', '/cypress': 'Cypress',
    '/python': 'Python', '/typescript': 'TypeScript', '/javascript': 'JavaScript',
    '/sql': 'SQL', '/java': 'Java', '/jmeter': 'JMeter', '/postman': 'Postman',
    '/api-testing': 'API Testing', '/qa-frontend': 'Frontend for QA', '/bruno': 'Bruno',
    '/rest-assured': 'REST Assured', '/gauge': 'Gauge', '/jira': 'Jira', '/docker': 'Docker',
    '/jenkins': 'Jenkins', '/kubernetes': 'Kubernetes', '/kafka': 'Kafka',
    '/appium': 'Appium', '/browserstack': 'BrowserStack', '/aws': 'AWS', '/azure': 'Azure',
    '/test-frameworks': 'Test Frameworks', '/git-github': 'Git & GitHub', '/linux': 'Linux',
    '/security': 'Cyber Security', '/what-is-testing': 'Testing Basics', '/manual-testing': 'Manual Testing',
}

function routeLabel(route) {
    if (!route) return '—'
    if (ROUTE_LABELS[route]) return ROUTE_LABELS[route]
    return route.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Yeşil (≥75) / amber (≥50) / kırmızı (<50) — mastery ve accuracy eşikleri ortak.
function scoreColor(pct, darkMode) {
    if (pct >= 75) return darkMode ? '#4ade80' : '#16a34a'
    if (pct >= 50) return darkMode ? '#fbbf24' : '#d97706'
    return darkMode ? '#f87171' : '#dc2626'
}

export default function LearningAnalytics({ darkMode, language }) {
    const isTr = language === 'tr'
    const [data, setData] = useState(null)

    useEffect(() => {
        try { setData(getLearningAnalytics()) } catch { setData(null) }
    }, [])

    if (!data || !data.hasData) return null

    const { quizAccuracy, totalCorrect, totalAttempted, topicsStarted, topicsCompleted,
        strongest, weakest, reviewDue, reviewTotal, mostMissed } = data

    const cardBase = darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    const subText = darkMode ? 'text-gray-400' : 'text-gray-500'
    const maxMissed = mostMissed.length ? Math.max(...mostMissed.map((m) => m.wrongCount)) : 1

    const tiles = [
        {
            label: isTr ? 'Ortalama Quiz Başarın' : 'Average Quiz Score',
            value: quizAccuracy == null ? '—' : `%${quizAccuracy}`,
            sub: totalAttempted > 0 ? `${totalCorrect}/${totalAttempted} ${isTr ? 'doğru' : 'correct'}` : (isTr ? 'henüz quiz yok' : 'no quizzes yet'),
            color: quizAccuracy == null ? null : scoreColor(quizAccuracy, darkMode),
            emoji: '🎯',
        },
        {
            label: isTr ? 'Başladığın Konu' : 'Topics Started',
            value: String(topicsStarted),
            sub: `${topicsCompleted} ${isTr ? 'tamamlandı' : 'completed'}`,
            emoji: '📚',
        },
        {
            label: isTr ? 'Tekrar Bekleyen' : 'Awaiting Review',
            value: String(reviewDue),
            sub: reviewTotal > 0 ? `${reviewTotal} ${isTr ? 'toplam' : 'total'}` : (isTr ? 'kuyruk boş' : 'queue empty'),
            emoji: '🔁',
        },
    ]

    return (
        <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
            <div className={`rounded-2xl border-2 p-4 md:p-6 shadow-lg ${cardBase}`} data-testid="learning-analytics">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📊</span>
                    <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {isTr ? 'Öğrenme Analitiğin' : 'Your Learning Analytics'}
                    </h2>
                </div>

                {/* Stat tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {tiles.map((t) => (
                        <div key={t.label} className={`rounded-xl border p-3 md:p-4 ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}>
                            <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${subText}`}>
                                <span aria-hidden="true">{t.emoji}</span>{t.label}
                            </div>
                            <div className="mt-1 text-2xl md:text-3xl font-black tabular-nums" style={t.color ? { color: t.color } : undefined}>
                                <span className={t.color ? '' : (darkMode ? 'text-white' : 'text-gray-900')}>{t.value}</span>
                            </div>
                            <div className={`text-xs ${subText}`}>{t.sub}</div>
                            {t.label.includes('Quiz') && quizAccuracy != null && (
                                <div className={`mt-2 h-1.5 w-full rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${quizAccuracy}%`, background: scoreColor(quizAccuracy, darkMode) }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Strongest / Weakest topic */}
                {(strongest || weakest) && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {strongest && (
                            <Link to={strongest.route} className={`block rounded-xl border p-3 md:p-4 transition-transform hover:scale-[1.01] ${darkMode ? 'border-emerald-800/60 bg-emerald-950/30 hover:border-emerald-600' : 'border-emerald-200 bg-emerald-50 hover:border-emerald-400'}`}>
                                <div className={`text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                    💪 {isTr ? 'En Güçlü Konun' : 'Your Strongest Topic'}
                                </div>
                                <div className={`mt-1 flex items-baseline justify-between gap-2`}>
                                    <span className={`text-base md:text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{routeLabel(strongest.route)}</span>
                                    <span className="text-lg font-black tabular-nums" style={{ color: scoreColor(strongest.mastery, darkMode) }}>%{strongest.mastery}</span>
                                </div>
                            </Link>
                        )}
                        {weakest && (
                            <Link to={weakest.route} className={`block rounded-xl border p-3 md:p-4 transition-transform hover:scale-[1.01] ${darkMode ? 'border-amber-800/60 bg-amber-950/30 hover:border-amber-600' : 'border-amber-200 bg-amber-50 hover:border-amber-400'}`}>
                                <div className={`text-[11px] font-bold uppercase tracking-wide ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                                    🎯 {isTr ? 'En Çok Gelişebileceğin Konu' : 'Your Biggest Opportunity'}
                                </div>
                                <div className={`mt-1 flex items-baseline justify-between gap-2`}>
                                    <span className={`text-base md:text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{routeLabel(weakest.route)}</span>
                                    <span className="text-lg font-black tabular-nums" style={{ color: scoreColor(weakest.mastery, darkMode) }}>%{weakest.mastery}</span>
                                </div>
                            </Link>
                        )}
                    </div>
                )}

                {/* Most-missed areas (spaced-repetition wrong answers grouped by topic) */}
                {mostMissed.length > 0 && (
                    <div className="mt-3">
                        <div className={`text-[11px] font-bold uppercase tracking-wide mb-2 ${subText}`}>
                            🔥 {isTr ? 'En Çok Zorlandığın Alanlar' : 'Where You Struggle Most'}
                        </div>
                        <div className="flex flex-col gap-2">
                            {mostMissed.map((m, i) => {
                                const label = m.pageTitle || routeLabel(m.route)
                                const pct = Math.round((m.wrongCount / maxMissed) * 100)
                                const inner = (
                                    <>
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{label}</span>
                                            <span className={`text-xs font-bold tabular-nums ${darkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                                                {m.wrongCount} {isTr ? 'hata' : m.wrongCount === 1 ? 'miss' : 'misses'}
                                            </span>
                                        </div>
                                        <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: darkMode ? '#fb7185' : '#e11d48' }} />
                                        </div>
                                    </>
                                )
                                return m.route
                                    ? <Link key={m.route || i} to={m.route} className="block group">{inner}</Link>
                                    : <div key={i}>{inner}</div>
                            })}
                        </div>
                    </div>
                )}

                <p className={`mt-3 text-[11px] ${subText}`}>
                    {isTr
                        ? 'Bu pano yalnızca senin cihazında saklanan ilerlemenden hesaplanır — üyelik gerekmez.'
                        : 'This panel is computed only from progress stored on your device — no account needed.'}
                </p>
            </div>
        </div>
    )
}
