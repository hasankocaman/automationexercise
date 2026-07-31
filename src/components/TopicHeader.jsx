import { useNavigate, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import ZoomControls from './ZoomControls'
import AccountMenu from './AccountMenu'
import { readMentorProfile, getLocalCompletedRoutes } from '../utils/careerMapProfile'

// Kariyer Haritası Faz 2 (career-map-feature-plan.md §4.4c, S3.2): "dersten
// haritaya dönüş köprüsü". Bu sayfalarda harita bağlamı anlamsız — meta/araç
// sayfalarıdır, harita düğümü DEĞİLDİR.
const BREADCRUMB_EXCLUDED_PREFIXES = ['/qa-mentor', '/leaderboard', '/verify-certificate', '/qa-assistant', '/sprint']

// TopicHeader TÜM ders sayfalarında (TopicPage üzerinden ~25 teknoloji sayfası
// + Algorithms/ManualTesting/WhatIsTesting) paylaşıldığından, breadcrumb'ı
// BURADA eklemek tek noktadan tüm ders sayfalarına yayılmasını sağlar —
// TopicPage.jsx'in ~21k satırlık quiz motoruna DOKUNULMADAN (plan §6.2 S3.2 kısıtı).
function useMapBreadcrumb() {
    const location = useLocation()
    if (BREADCRUMB_EXCLUDED_PREFIXES.some((p) => location.pathname.startsWith(p))) return null

    const profile = readMentorProfile()
    if (!profile || !Array.isArray(profile.nodes) || profile.nodes.length === 0) return null

    // Anonim/üye ayrımı yapmadan yalnızca LOKAL tamamlama seti okunur — HomePage.jsx
    // `mentorMapState` ile aynı kalıp (senkron, üye Supabase seti burada birleştirilmez).
    const completed = getLocalCompletedRoutes()
    const total = profile.nodes.length
    const done = profile.nodes.filter((n) => completed.has(n.route)).length
    const position = Math.min(done + 1, total)

    return { total, done, position, allDone: done >= total }
}

function TopicHeader({ darkMode, setDarkMode, focusMode, setFocusMode, soundToggle, showQaMentorLink }) {
    const { language, t, toggleLanguage } = useLanguage()
    const navigate = useNavigate()
    const breadcrumb = useMapBreadcrumb()

    return (
        <header className={`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
            <div className="container mx-auto px-3 py-2.5 md:px-6 md:py-4">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col items-start gap-1.5 flex-shrink-0">
                        <button
                            onClick={() => navigate('/')}
                            data-testid="topic-back-btn"
                            className={`flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 ${darkMode
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                                }`}
                        >
                            {t('pages.backButton')}
                        </button>
                        {showQaMentorLink && (
                            <button
                                onClick={() => navigate('/qa-mentor')}
                                data-testid="topic-qa-mentor-btn"
                                className="flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 hover:scale-105 bg-amber-400/90 text-gray-900 hover:bg-amber-300 border border-amber-200/60"
                            >
                                {t('pages.qaMentorButton')}
                            </button>
                        )}
                        {breadcrumb && (
                            <button
                                onClick={() => navigate('/qa-mentor')}
                                data-testid="map-breadcrumb"
                                data-map-position={breadcrumb.position}
                                data-map-total={breadcrumb.total}
                                className={`flex items-center gap-1 px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-lg font-semibold text-[11px] md:text-xs transition-all duration-300 hover:scale-105 ${darkMode
                                    ? 'bg-gray-700/80 text-indigo-300 hover:bg-gray-600'
                                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                                    }`}
                            >
                                {breadcrumb.allDone
                                    ? (language === 'tr' ? '🗺️ Haritanı bitirdin! 🏆' : '🗺️ You finished your map! 🏆')
                                    : (language === 'tr'
                                        ? `🗺️ Haritanda ${breadcrumb.position}/${breadcrumb.total}. adımdasın`
                                        : `🗺️ You're at step ${breadcrumb.position}/${breadcrumb.total} on your map`)}
                            </button>
                        )}
                    </div>

                    <div className="flex gap-1.5 md:gap-3 items-center">
                        <div className="flex bg-white rounded-lg overflow-hidden" data-testid="language-toggle">
                            <button
                                onClick={() => language === 'tr' && toggleLanguage()}
                                className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                ENG
                            </button>
                            <button
                                onClick={() => language === 'en' && toggleLanguage()}
                                className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${language === 'tr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                TR
                            </button>
                        </div>
                        <ZoomControls darkMode={darkMode} />
                        <AccountMenu darkMode={darkMode} />
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            data-testid="dark-mode-toggle"
                            className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 ${darkMode
                                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                }`}
                        >
                            {darkMode ? `☀️ ` : `🌙 `}
                            <span className="hidden md:inline">{darkMode ? t('buttons.lightMode') : t('buttons.darkMode')}</span>
                        </button>
                        <button
                            onClick={() => setFocusMode(!focusMode)}
                            data-testid="focus-mode-toggle"
                            aria-label={language === 'tr' ? 'Odak modu — dekoratif efektleri kapat' : 'Focus mode — turn off decorative effects'}
                            title={language === 'tr' ? 'Odak modu — dekoratif efektleri kapat' : 'Focus mode — turn off decorative effects'}
                            className={`min-w-[36px] min-h-[36px] px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 ${focusMode
                                ? 'bg-emerald-500 text-white hover:bg-emerald-400 ring-2 ring-emerald-300'
                                : darkMode
                                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                                }`}
                        >
                            🎯
                        </button>
                        {soundToggle}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopicHeader
