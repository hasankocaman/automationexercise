import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Save } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { search as searchContent } from '../utils/searchIndex'
import ZoomControls from './ZoomControls'
import AccountMenu from './AccountMenu'
import BasicElements from './BasicElements'
import ComplexInteractions from './ComplexInteractions'
import AdvancedScenarios from './AdvancedScenarios'
import DataTable from './DataTable'
import APISimulation from './APISimulation'
import FrameworkComparison from './FrameworkComparison'
import LocatorGuide from './LocatorGuide'
import Practice from './Practice'
import PlaywrightLangCompare from './PlaywrightLangCompare'
import MembershipPromo from './MembershipPromo'
import CommentsSection from './CommentsSection'

// Resume banner'da rota yerine okunabilir ders adı göstermek için (lessonSlug
// sayfa başlığından türetildiği için düzensiz olabilir, routePath sabit kalır).
const RESUME_LESSON_NAMES = {
    '/selenium': { tr: 'Selenium', en: 'Selenium' },
    '/playwright': { tr: 'Playwright', en: 'Playwright' },
    '/cypress': { tr: 'Cypress', en: 'Cypress' },
    '/python': { tr: 'Python', en: 'Python' },
    '/typescript': { tr: 'TypeScript', en: 'TypeScript' },
    '/sql': { tr: 'SQL', en: 'SQL' },
    '/java': { tr: 'Java', en: 'Java' },
    '/jmeter': { tr: 'JMeter', en: 'JMeter' },
    '/postman': { tr: 'Postman', en: 'Postman' },
    '/rest-assured': { tr: 'REST Assured', en: 'REST Assured' },
    '/docker': { tr: 'Docker', en: 'Docker' },
    '/jenkins': { tr: 'Jenkins', en: 'Jenkins' },
    '/kubernetes': { tr: 'Kubernetes', en: 'Kubernetes' },
    '/kafka': { tr: 'Kafka', en: 'Kafka' },
    '/appium': { tr: 'Appium', en: 'Appium' },
    '/browserstack': { tr: 'BrowserStack', en: 'BrowserStack' },
    '/aws': { tr: 'AWS', en: 'AWS' },
    '/azure': { tr: 'Azure', en: 'Azure' },
    '/test-frameworks': { tr: 'Framework Karşılaştırma', en: 'Test Frameworks' },
    '/git-github': { tr: 'Git & GitHub', en: 'Git & GitHub' },
    '/linux': { tr: 'Linux', en: 'Linux' },
    '/algorithms': { tr: 'Algoritmalar', en: 'Algorithms' },
    '/advanced-algorithms': { tr: 'İleri Seviye Algoritmalar', en: 'Advanced Algorithms' },
    '/manual-testing': { tr: 'Manuel Test', en: 'Manual Testing' },
    '/what-is-testing': { tr: 'Yazılım Testi & QA Temelleri', en: 'Software Testing & QA Basics' },
}

function HomePage() {
    const { language, t, toggleLanguage } = useLanguage()
    const { session, isAdmin, displayName, getResumePoint } = useAuth()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState('basic')
    const [resumePoint, setResumePoint] = useState(null)
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        if (isDark) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
        return isDark
    })
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const searchInputRef = useRef(null)
    const practiceSectionRef = useRef(null)
    const contentSectionRef = useRef(null)

    useEffect(() => {
        getResumePoint().then(setResumePoint).catch(() => setResumePoint(null))
        // session değiştiğinde (giriş/çıkış) de yeniden okunur — yoksa çıkış yapan
        // kullanıcının resume banner'ı bir önceki oturumdan kalan state'le görünmeye devam eder.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        if (darkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode-forced')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode-forced')
        }
    }, [darkMode])

    // Debounced search
    useEffect(() => {
        if (searchQuery.trim().length < 2) { setSearchResults([]); return }
        const timer = setTimeout(() => {
            setSearchResults(searchContent(searchQuery, language))
        }, 250)
        return () => clearTimeout(timer)
    }, [searchQuery, language])

    // ESC closes modal
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') setSearchOpen(false) }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    // Auto-focus input when modal opens
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 50)
        } else if (!searchOpen) {
            setSearchQuery('')
            setSearchResults([])
        }
    }, [searchOpen])

    const handleSearchNavigate = (route, tabIndex) => {
        setSearchOpen(false)
        navigate(route, { state: { openTab: tabIndex } })
    }

    const sections = [
        { id: 'basic', name: t('nav.basic'), shortName: t('home.section.basicShort') },
        { id: 'locator-guide', name: t('nav.locatorGuide'), shortName: t('home.section.locatorShort') },
        { id: 'complex', name: t('nav.complex'), shortName: t('home.section.complexShort') },
        { id: 'advanced', name: t('nav.advanced'), shortName: t('home.section.advancedShort') },
        { id: 'table', name: t('nav.table'), shortName: t('home.section.tableShort') },
        { id: 'api', name: t('nav.api'), shortName: t('home.section.apiShort') },
        { id: 'practice', name: t('nav.practice') || '🛠️ Practice Playground', shortName: t('home.section.practiceShort') },
    ]



    const renderSection = () => {
        switch (activeSection) {
            case 'basic': return <BasicElements darkMode={darkMode} />
            case 'locator-guide': return <LocatorGuide darkMode={darkMode} />
            case 'complex': return <ComplexInteractions darkMode={darkMode} />
            case 'advanced': return <AdvancedScenarios darkMode={darkMode} />
            case 'table': return <DataTable darkMode={darkMode} />
            case 'api': return <APISimulation darkMode={darkMode} />
            case 'comparison': return <FrameworkComparison darkMode={darkMode} />
            case 'lang-compare': return <PlaywrightLangCompare darkMode={darkMode} />
            case 'practice': return <Practice darkMode={darkMode} onHomeClick={() => setActiveSection('basic')} />
            default: return <BasicElements darkMode={darkMode} />
        }
    }

    // Category label badge
    const CatLabel = ({ emoji, text }) => (
        <span className={`inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap select-none px-2 py-1 rounded-md mr-0.5 ${darkMode ? 'text-gray-400 bg-gray-700/50' : 'text-gray-500 bg-gray-100'
            }`}>
            {emoji} {text}
        </span>
    )

    // Colored nav button class generator
    const nb = (color) => {
        const palettes = {
            yellow: darkMode ? 'text-yellow-300 hover:bg-yellow-900/70 hover:text-yellow-100 hover:border-yellow-700' : 'text-yellow-700 hover:bg-yellow-100 hover:border-yellow-300',
            indigo: darkMode ? 'text-indigo-300 hover:bg-indigo-900/70 hover:text-indigo-100 hover:border-indigo-700' : 'text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300',
            blue: darkMode ? 'text-blue-300 hover:bg-blue-900/70 hover:text-blue-100 hover:border-blue-700' : 'text-blue-700 hover:bg-blue-100 hover:border-blue-300',
            purple: darkMode ? 'text-purple-300 hover:bg-purple-900/70 hover:text-purple-100 hover:border-purple-700' : 'text-purple-700 hover:bg-purple-100 hover:border-purple-300',
            emerald: darkMode ? 'text-emerald-300 hover:bg-emerald-900/70 hover:text-emerald-100 hover:border-emerald-700' : 'text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300',
            green: darkMode ? 'text-green-300 hover:bg-green-900/70 hover:text-green-100 hover:border-green-700' : 'text-green-700 hover:bg-green-100 hover:border-green-300',
            orange: darkMode ? 'text-orange-300 hover:bg-orange-900/70 hover:text-orange-100 hover:border-orange-700' : 'text-orange-700 hover:bg-orange-100 hover:border-orange-300',
            cyan: darkMode ? 'text-cyan-300 hover:bg-cyan-900/70 hover:text-cyan-100 hover:border-cyan-700' : 'text-cyan-700 hover:bg-cyan-100 hover:border-cyan-300',
            violet: darkMode ? 'text-violet-300 hover:bg-violet-900/70 hover:text-violet-100 hover:border-violet-700' : 'text-violet-700 hover:bg-violet-100 hover:border-violet-300',
        }
        return `px-2 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap
            transition-all duration-200 hover:scale-105 hover:shadow-md border
            ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}
            ${palettes[color] || ''}`
    }



    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>

            {/* Header */}
            <header className={`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
                <div className="container mx-auto px-3 py-2 md:px-6 md:py-4">
                    <div className="flex justify-between items-center gap-2 flex-wrap">
                        <div className="flex-1 text-center min-w-0 overflow-hidden">
                            <h1 className="text-base sm:text-xl md:text-3xl font-bold leading-tight text-white truncate" data-testid="main-title">
                                {t('header.title')}
                            </h1>
                            <p className={`text-xs hidden sm:block mt-0.5 ${darkMode ? 'text-gray-300' : 'text-indigo-100'}`}>
                                {t('header.subtitle')}
                            </p>
                        </div>
                        <div className="flex gap-1 md:gap-1.5 flex-shrink-0 items-center flex-wrap justify-end">
                            {/* Site Map button */}
                            <button
                                onClick={() => navigate('/what-is-testing', { state: { openTab: 5 } })}
                                title={t('header.siteMap')}
                                className={`px-2 py-1 md:py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 border border-transparent transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:backdrop-blur-md hover:shadow-[0_8px_24px_rgba(168,85,247,0.35)] ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white/20 text-white'}`}
                            >
                                🗺️ <span className="hidden lg:inline">{t('header.siteMap')}</span>
                            </button>
                            {/* Search button */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                title={t('search.tooltip')}
                                className={`px-2 py-1 md:py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 flex items-center gap-1 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
                            >
                                🔍 <span className="hidden lg:inline">{t('buttons.search')}</span>
                            </button>
                            <div className="flex bg-white rounded-lg overflow-hidden" data-testid="language-toggle">
                                <button
                                    onClick={() => language === 'tr' && toggleLanguage()}
                                    className={`px-2 md:px-3 py-1 md:py-1.5 text-xs font-semibold transition-all duration-300 ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    ENG
                                </button>
                                <button
                                    onClick={() => language === 'en' && toggleLanguage()}
                                    className={`px-2 md:px-3 py-1 md:py-1.5 text-xs font-semibold transition-all duration-300 ${language === 'tr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    TR
                                </button>
                            </div>
                            <ZoomControls darkMode={darkMode} />
                            <AccountMenu darkMode={darkMode} />
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                data-testid="dark-mode-toggle"
                                className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            >
                                {darkMode ? '☀️' : '🌙'}
                                <span className="hidden md:inline ml-1">{darkMode ? t('buttons.lightMode') : t('buttons.darkMode')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Modal */}
            {searchOpen && (
                <div
                    className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4"
                    style={{ background: 'rgba(0,0,0,0.75)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
                >
                    <div className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        {/* Search input */}
                        <div className={`flex items-center gap-3 p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <span className="text-xl flex-shrink-0">🔍</span>
                            <input
                                ref={searchInputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('search.placeholder')}
                                className={`flex-1 outline-none text-sm md:text-base bg-transparent ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
                                style={{ fontSize: '16px' }}
                            />
                            <button
                                onClick={() => setSearchOpen(false)}
                                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
                            >✕</button>
                        </div>

                        {/* Results */}
                        {searchResults.length > 0 && (
                            <div className="max-h-96 overflow-y-auto">
                                {searchResults.map((r, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSearchNavigate(r.route, r.tabIndex)}
                                        className={`w-full text-left px-4 py-3 border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-indigo-50'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className={`font-bold text-xs md:text-sm ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{r.pageName}</span>
                                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>›</span>
                                            <span className={`text-xs truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{r.tabName}</span>
                                        </div>
                                        <p className={`text-xs line-clamp-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{r.snippet}</p>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* No results */}
                        {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
                            <div className={`p-8 text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {t('search.noResults')}
                            </div>
                        )}

                        {/* Hint when empty */}
                        {searchQuery.trim().length < 2 && (
                            <div className={`p-4 text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                {t('search.hint')}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Üyelik Tanıtım Banner'ı — sadece misafirler için ── */}
            {!session && <MembershipPromo darkMode={darkMode} />}

            {/* ── Kaldığın Yerden Devam Et Banner ── */}
            {resumePoint?.routePath && (() => {
                const lessonName = RESUME_LESSON_NAMES[resumePoint.routePath]?.[language]
                    || resumePoint.routePath.replace(/^\//, '').replace(/-/g, ' ')
                const tabLabel = (resumePoint.topicLabel || '').replace(/^[^\p{L}\p{N}]+/u, '').trim()
                const resumeMessage = language === 'tr'
                    ? `${displayName ? `${displayName}, ` : ''}en son ${lessonName} dersinde${tabLabel ? ` ${tabLabel} sekmesinde` : ''} kalmıştın. Devam etmek ister misin?`
                    : `${displayName ? `${displayName}, ` : ''}you last left off${tabLabel ? ` at ${tabLabel}` : ''} in ${lessonName}. Want to continue?`

                return (
                    <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
                        <Link
                            to={resumePoint.routePath}
                            state={{ openTab: Number.isFinite(Number(resumePoint.topicSlug)) ? Number(resumePoint.topicSlug) : 0 }}
                            data-testid="resume-banner"
                            className={`group flex items-center gap-3 md:gap-4 rounded-2xl border-2 p-3.5 md:p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl ${
                                darkMode
                                    ? 'border-sky-700/60 bg-gradient-to-r from-sky-900/50 via-cyan-900/40 to-blue-900/40 hover:border-sky-500/80'
                                    : 'border-sky-300 bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 hover:border-sky-400'
                            }`}
                        >
                            <div className={`flex-shrink-0 rounded-xl p-2.5 md:p-3 shadow-lg ${darkMode ? 'bg-sky-700/60' : 'bg-sky-600'}`}>
                                <Save className="h-6 w-6 md:h-7 md:w-7 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {language === 'tr' ? 'Kaldığın yerden devam et' : 'Continue where you left off'}
                                </h2>
                                <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-sky-200/80' : 'text-sky-700'}`}>
                                    {resumeMessage}
                                </p>
                            </div>
                            <div className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-lg whitespace-nowrap ${darkMode ? 'bg-sky-600' : 'bg-sky-600'}`}>
                                {language === 'tr' ? 'Git' : 'Go'} →
                            </div>
                        </Link>
                    </div>
                )
            })()}

            {/* ── QA Mentor AI Banner — Yeni misin? Buradan Başla ── */}
            <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
                <Link
                    to="/qa-mentor"
                    data-testid="qa-mentor-banner"
                    className={`group flex items-center gap-3 md:gap-4 rounded-2xl border-2 p-3.5 md:p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl overflow-hidden relative ${
                        darkMode
                            ? 'border-purple-700/60 bg-gradient-to-r from-purple-900/50 via-indigo-900/40 to-fuchsia-900/40 hover:border-purple-500/80 hover:shadow-purple-900/40'
                            : 'border-indigo-300 bg-gradient-to-r from-indigo-50 via-purple-50 to-fuchsia-50 hover:border-indigo-400 hover:shadow-indigo-200/60'
                    }`}
                >
                    {/* Animated background sweep */}
                    <span className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/20 blur-xl transition-transform duration-700 group-hover:translate-x-[800%]" />

                    {/* Icon */}
                    <div className={`flex-shrink-0 rounded-xl p-2.5 md:p-3 shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                        darkMode ? 'bg-purple-700/60' : 'bg-indigo-600'
                    }`}>
                        <span className="text-2xl md:text-3xl">🧠</span>
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-black ${
                                darkMode ? 'bg-green-800/60 text-green-300' : 'bg-green-100 text-green-700'
                            }`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                                {language === 'tr' ? 'YENİ' : 'NEW'}
                            </span>
                            <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {language === 'tr' ? '👋 Yeni misin? Kişisel QA Kariyer Haritanı Oluştur' : '👋 New Here? Build Your Personalized QA Career Map'}
                            </h2>
                        </div>
                        <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-purple-200/80' : 'text-indigo-700'}`}>
                            {language === 'tr'
                                ? '3 kısa soruyu yanıtla — sana özel öğrenme yolu ve zihin haritası hazırlansın. ✨'
                                : 'Answer 3 quick questions — get a personalized learning path and mind map just for you. ✨'}
                        </p>
                    </div>

                    {/* CTA arrow */}
                    <div className={`flex-shrink-0 flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:gap-2 whitespace-nowrap ${
                        darkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                    >
                        {language === 'tr' ? 'Başla' : 'Start'}
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </div>
                </Link>
            </div>




            {/* Navigation — Category Cards Grid */}
            <nav
                ref={practiceSectionRef}
                className={`transition-colors duration-300 border-b ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                data-testid="main-navigation"
            >
                <div className="container mx-auto px-3 md:px-6 py-4 md:py-5">

                    {/* Category grid — 2 cols on sm, 3 on md, 4 on lg */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">

                        {/* 1. Programlama Dilleri */}
                        <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-indigo-100 shadow-sm'}`}>
                            <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-indigo-900/40 border-gray-700' : 'bg-indigo-50 border-indigo-100'}`}>
                                <span className="text-sm">🐍</span>
                                <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>{t('home.category.languages')}</span>
                            </div>
                            <div className="p-2 flex flex-wrap gap-1">
                                <Link to="/java" data-testid="nav-java" className={nb('orange')}>☕ Java</Link>
                                <Link to="/python" data-testid="nav-python" className={nb('yellow')}>🐍 Python</Link>
                                <Link to="/typescript" data-testid="nav-typescript" className={nb('indigo')}>💻 TS</Link>
                                <Link to="/sql" data-testid="nav-sql" className={nb('blue')}>🗄️ SQL</Link>
                                <Link
                                    to="/algorithms"
                                    data-testid="nav-algorithms"
                                    className={`${nb('violet')} hover:scale-125 hover:backdrop-blur-xl hover:bg-white/20 hover:border-white/40 hover:shadow-[0_12px_32px_rgba(34,211,238,0.35)]`}
                                    style={{ backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
                                >
                                    {t('home.learnAlgorithms')}
                                </Link>
                                <a href="https://hasankocaman.github.io/boltJSTScompare/" className={nb('blue')}>JS↔TS</a>
                                <button onClick={() => { setActiveSection('lang-compare'); setTimeout(() => { contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 50) }} className={nb('violet')}>🔀 3 Dil</button>
                            </div>
                        </div>

                        {/* 2. Test Otomasyon */}
                        <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-100 shadow-sm'}`}>
                            <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-emerald-900/30 border-gray-700' : 'bg-emerald-50 border-emerald-100'}`}>
                                <span className="text-sm">🧪</span>
                                <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{t('home.category.testTools')}</span>
                            </div>
                            <div className="p-2 flex flex-wrap gap-1">
                                <Link to="/what-is-testing" className={nb('violet')}>{t('home.learnTesting')}</Link>
                                <Link to="/manual-testing" data-testid="nav-manual-testing" className={nb('blue')}>{t('home.learnManualTesting')}</Link>
                                <Link to="/selenium" data-testid="nav-selenium" className={nb('emerald')}>🟢 Selenium</Link>
                                <Link to="/playwright" className={nb('purple')}>🎭 Playwright</Link>
                                <Link to="/cypress" data-testid="nav-cypress" className={nb('purple')}>🌲 Cypress</Link>
                                <Link to="/rest-assured" data-testid="nav-rest-assured" className={nb('emerald')}>🧪 REST Assured</Link>
                                <Link to="/appium" data-testid="nav-appium" className={nb('green')}>📱 Appium</Link>
                                <Link to="/browserstack" data-testid="nav-browserstack" className={nb('orange')}>☁️ BrowserStack</Link>
                                <button onClick={() => { setActiveSection('comparison'); setTimeout(() => { contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 50) }} className={nb('violet')}>⚖️ Karşılaştır</button>
                            </div>
                        </div>

                        {/* 3. API & Performans */}
                        <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-orange-100 shadow-sm'}`}>
                            <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-orange-900/30 border-gray-700' : 'bg-orange-50 border-orange-100'}`}>
                                <span className="text-sm">⚡</span>
                                <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>{t('home.category.performanceApi')}</span>
                            </div>
                            <div className="p-2 flex flex-wrap gap-1">
                                <Link to="/jmeter" data-testid="nav-jmeter" className={nb('orange')}>📊 JMeter</Link>
                                <Link to="/postman" data-testid="nav-postman" className={nb('orange')}>📮 Postman</Link>
                            </div>
                        </div>

                        {/* 4. DevOps & Cloud */}
                        <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-cyan-100 shadow-sm'}`}>
                            <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-cyan-900/30 border-gray-700' : 'bg-cyan-50 border-cyan-100'}`}>
                                <span className="text-sm">🛠️</span>
                                <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>{t('home.category.devOps')}</span>
                            </div>
                            <div className="p-2 flex flex-wrap gap-1">
                                <Link to="/docker" data-testid="nav-docker" className={nb('cyan')}>🐳 Docker</Link>
                                <Link to="/git-github" data-testid="nav-git-github" className={nb('emerald')}>🔀 Git/GitHub</Link>
                                <Link to="/linux" data-testid="nav-linux" className={nb('orange')}>🐧 Linux</Link>
                                {isAdmin && <Link to="/backend" data-testid="nav-backend" className={nb('cyan')}>🧩 Basit Backend</Link>}
                                <Link to="/jenkins" data-testid="nav-jenkins" className={nb('blue')}>🔧 Jenkins</Link>
                                <Link to="/kubernetes" data-testid="nav-kubernetes" className={nb('violet')}>☸️ K8s</Link>
                                <Link to="/kafka" data-testid="nav-kafka" className={nb('orange')}>🟠 Kafka</Link>
                                <Link to="/aws" data-testid="nav-aws" className={nb('orange')}>☁️ AWS</Link>
                                <Link to="/azure" data-testid="nav-azure" className={nb('blue')}>🔷 Azure</Link>
                            </div>
                        </div>

                    </div>

                    {/* Practice Area — full width below */}
                    <div className={`mt-3 rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100 shadow-sm'}`}>
                        <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-purple-900/30 border-gray-700' : 'bg-purple-50 border-purple-100'}`}>
                            <span className="text-sm">🎯</span>
                            <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>{t('home.category.practice')}</span>
                        </div>
                        <div className="p-2 flex flex-wrap gap-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    data-testid={`nav-${section.id}`}
                                    className={`px-2.5 py-1.5 rounded-lg font-semibold text-xs whitespace-nowrap border transition-all duration-200 hover:scale-105 hover:shadow-md ${
                                        activeSection === section.id
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105 border-transparent'
                                            : darkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-purple-900/70 hover:text-purple-100 hover:border-purple-700'
                                                : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-400'
                                    }`}
                                >
                                    <span className="sm:hidden">{section.shortName}</span>
                                    <span className="hidden sm:inline">{section.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </nav>

            {/* Main Content */}
            <main ref={contentSectionRef} className="container mx-auto px-3 py-4 md:px-6 md:py-8">
                <div className="animate-fadeIn">
                    {renderSection()}
                </div>

                {/* Uygulama hakkında genel yorumlar — herkes okuyabilir, sadece üyeler yazabilir */}
                <CommentsSection pagePath="/" darkMode={darkMode} />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-10 md:mt-16">
                {/* Main footer content */}
                <div className="container mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">

                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-2xl">🎓</span>
                                <span className="text-lg font-bold text-white">LearnQA.dev</span>
                            </div>
                            <p className="text-gray-400 text-xs leading-relaxed mb-4" data-testid="footer-text">
                                {t('footer.text')}
                            </p>
                            <div className="flex gap-2">
                                <a
                                    href="https://www.linkedin.com/in/hasankocaman/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="LinkedIn — Hasan Kocaman"
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#0077B5] text-white text-xs font-semibold shadow-lg hover:shadow-[#0A66C2]/40 transition-all duration-200 hover:scale-105 active:scale-95 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    <span>Hasan Kocaman</span>
                                </a>
                            </div>
                        </div>

                        {/* Diller */}
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-1.5">
                                <span>🐍</span> {language === 'tr' ? 'Diller' : 'Languages'}
                            </h3>
                            <ul className="space-y-1.5">
                                {[
                                    { to: '/java', label: '☕ Java' },
                                    { to: '/python', label: '🐍 Python' },
                                    { to: '/typescript', label: '💻 TypeScript' },
                                    { to: '/sql', label: '🗄️ SQL' },
                                    { to: '/algorithms', label: '🧠 Algorithms' },
                                ].map(({ to, label }) => (
                                    <li key={to}>
                                        <Link to={to} className="text-gray-400 hover:text-white text-xs transition-colors duration-200 flex items-center gap-1">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Test Araçları */}
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-1.5">
                                <span>🧪</span> {language === 'tr' ? 'Test Araçları' : 'Test Tools'}
                            </h3>
                            <ul className="space-y-1.5">
                                {[
                                    { to: '/selenium', label: '🟢 Selenium' },
                                    { to: '/manual-testing', label: language === 'tr' ? '🧭 Manuel Test' : '🧭 Manual Testing' },
                                    { to: '/playwright', label: '🎭 Playwright' },
                                    { to: '/appium', label: '📱 Appium' },
                                    { to: '/rest-assured', label: '🧪 REST Assured' },
                                    { to: '/postman', label: '📮 Postman' },
                                    { to: '/jmeter', label: '📊 JMeter' },
                                    { to: '/browserstack', label: '☁️ BrowserStack' },
                                    { to: '/test-frameworks', label: '⚖️ Framework Karş.' },
                                ].map(({ to, label }) => (
                                    <li key={to}>
                                        <Link to={to} className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* DevOps & Cloud */}
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-1.5">
                                <span>🛠️</span> DevOps & Cloud
                            </h3>
                            <ul className="space-y-1.5">
                                {[
                                    { to: '/docker', label: '🐳 Docker' },
                                    { to: '/git-github', label: '🔀 Git/GitHub' },
                                    { to: '/linux', label: '🐧 Linux' },
                                    ...(isAdmin ? [{ to: '/backend', label: language === 'tr' ? '🧩 Basit Backend' : '🧩 Simple Backend' }] : []),
                                    { to: '/jenkins', label: '🔧 Jenkins' },
                                    { to: '/kubernetes', label: '☸️ Kubernetes' },
                                    { to: '/kafka', label: '🟠 Kafka' },
                                    { to: '/aws', label: '☁️ AWS' },
                                    { to: '/azure', label: '🔷 Azure' },
                                ].map(({ to, label }) => (
                                    <li key={to}>
                                        <Link to={to} className="text-gray-400 hover:text-white text-xs transition-colors duration-200">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <p className="text-gray-500 text-[11px] leading-relaxed">{t('footer.hint')}</p>
                            </div>
                        </div>

                    </div>

                    {/* Stats Bar */}
                    <div className={`rounded-xl p-3 md:p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-800'}`}>
                        {[
                            { num: '23+', label: language === 'tr' ? 'Teknoloji' : 'Technologies' },
                            { num: '1000+', label: language === 'tr' ? 'Mülakat Sorusu' : 'Interview Q&A' },
                            { num: '100%', label: language === 'tr' ? 'Ücretsiz' : 'Free to Use' },
                            { num: '4', label: language === 'tr' ? 'Etkileşimli Editör' : 'Live Editors' },
                        ].map(({ num, label }) => (
                            <div key={label} className="text-center">
                                <div className="text-lg md:text-xl font-bold text-indigo-400">{num}</div>
                                <div className="text-gray-400 text-[11px] mt-0.5">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-gray-700 pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-gray-500 text-xs">
                            © 2025 LearnQA.dev — {language === 'tr' ? 'QA mühendisleri için özgürce kullanılabilir' : 'Free for QA engineers'}
                        </p>
                        <Link
                            to="/what-is-testing"
                            state={{ openTab: 5 }}
                            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-semibold transition-colors duration-200"
                        >
                            🗺️ {t('header.siteMap')}
                        </Link>
                    </div>
                </div>
            </footer>

            {/* Fixed LinkedIn Badge */}
            <a
                href="https://www.linkedin.com/in/hasankocaman/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full shadow-lg text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ background: '#0A66C2', color: '#fff' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                <span>{t('buttons.preparedBy')}&nbsp;</span>
                <span>Hasan Kocaman</span>
            </a>

            {/* Fixed Home Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={t('buttons.homeTooltip') || 'Back to top'}
                style={{
                    position: 'fixed', bottom: '16px', right: '16px',
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: '#7c3aed', color: '#fff', border: 'none',
                    cursor: 'pointer', fontSize: '22px', zIndex: 999,
                    boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.7)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.5)' }}
            >
                🏠
            </button>
        </div>
    )
}

export default HomePage
