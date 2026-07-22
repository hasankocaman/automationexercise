import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Save, ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { search as searchContent } from '../utils/searchIndex'
import { readMentorProfile, getLocalCompletedRoutes } from '../utils/careerMapProfile'
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
import NeuroLocateLab from './NeuroLocateLab'
import MembershipPromo from './MembershipPromo'
import TrendingSkillsWidget from './TrendingSkillsWidget'
import CommentsSection from './CommentsSection'
import ReviewQueuePanel from './ReviewQueuePanel'
import ActivityHeatmap from './ActivityHeatmap'
import OnboardingTour from './OnboardingTour'
import { hasSeenOnboarding, markOnboardingSeen } from '../lib/onboarding'
import { getQueueStats, REVIEW_QUEUE_SESSION_SIZE } from '../lib/reviewQueue'
import { getDailyGoalProgress, getStreak, subscribeToActivityChanges, checkStreakStatus } from '../lib/activityLog'
import { readLastPosition, getWeakCompletedTopics } from '../lib/progressStore'
import { trackMapEvent } from '../utils/mapEvents'
import { getAudioContext, createRainLoop, fadeGain, stopRainLoop, playThunder } from '../lib/ambientSound'
import '../homepage-effects.css'
import '../night-sky-effects.css'

const SOUND_PREF_KEY = 'ambientSoundEnabled'
const THUNDER_INTERVAL_MS = 10000 // home-lightning-flash CSS animasyonuyla aynı 10s döngü

// Resume banner'da rota yerine okunabilir ders adı göstermek için (lessonSlug
// sayfa başlığından türetildiği için düzensiz olabilir, routePath sabit kalır).
const RESUME_LESSON_NAMES = {
    '/selenium': { tr: 'Selenium', en: 'Selenium' },
    '/playwright': { tr: 'Playwright', en: 'Playwright' },
    '/cypress': { tr: 'Cypress', en: 'Cypress' },
    '/python': { tr: 'Python', en: 'Python' },
    '/typescript': { tr: 'TypeScript', en: 'TypeScript' },
    '/javascript': { tr: 'JavaScript', en: 'JavaScript' },
    '/sql': { tr: 'SQL', en: 'SQL' },
    '/java': { tr: 'Java', en: 'Java' },
    '/jmeter': { tr: 'JMeter', en: 'JMeter' },
    '/postman': { tr: 'Postman', en: 'Postman' },
    '/bruno': { tr: 'Bruno', en: 'Bruno' },
    '/rest-assured': { tr: 'REST Assured', en: 'REST Assured' },
    '/gauge': { tr: 'Gauge', en: 'Gauge' },
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
    '/security': { tr: 'Siber Güvenlik', en: 'Cyber Security' },
}

function HomePage() {
    const { language, t, toggleLanguage } = useLanguage()
    const { session, isAdmin, displayName, getResumePoint } = useAuth()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState('basic')
    const [resumePoint, setResumePoint] = useState(null)
    const [rulesOpen, setRulesOpen] = useState(false)
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
    // Odak Modu — dekoratif efektleri (parçacık, gece gökyüzü, glitch, 3D tilt, ambiyans sesi)
    // sadece CSS ile kapatır (bkz. src/focus-mode.css). darkMode ile birebir aynı kalıp.
    const [focusMode, setFocusMode] = useState(() => {
        const saved = localStorage.getItem('focusMode')
        const isFocus = saved !== null ? JSON.parse(saved) : false
        if (isFocus) {
            document.documentElement.classList.add('focus-mode')
        } else {
            document.documentElement.classList.remove('focus-mode')
        }
        return isFocus
    })
    // WP4 "Bugünkü Tekrar": daha önce yanlış cevaplanmış, tekrar zamanı gelmiş
    // quiz sorusu sayısı — 0 ise kart hiç gösterilmez.
    const [dueReviewCount, setDueReviewCount] = useState(0)
    const [reviewPanelOpen, setReviewPanelOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const searchInputRef = useRef(null)
    const practiceSectionRef = useRef(null)
    const contentSectionRef = useRef(null)
    const [soundOn, setSoundOn] = useState(() => {
        try { return localStorage.getItem(SOUND_PREF_KEY) === 'true' } catch { return false }
    })
    const audioNodesRef = useRef(null) // { ctx, rain: {source, gain} }
    const thunderTimerRef = useRef(null)
    // İlk ziyaretçi hoş geldin turu (retention-and-motivation-plan.md §6.4
    // Aşama E.3) — localStorage bayrağı `false` dönene kadar (SSR/ilk render
    // güvenliği için) gösterilmez, mount sonrası bir kez kontrol edilir.
    const [showOnboarding, setShowOnboarding] = useState(false)
    useEffect(() => {
        if (!hasSeenOnboarding()) setShowOnboarding(true)
    }, [])
    function dismissOnboarding() {
        markOnboardingSeen()
        setShowOnboarding(false)
    }

    useEffect(() => {
        setDueReviewCount(getQueueStats(Date.now()).dueCount)
    }, [])

    // "Bugün" şeridi (Learning OS Faz 1, plan §5-F3) — activityLog'dan senkron
    // okunur (mentorMapState kalıbı); aynı sekmede quiz/egzersiz tamamlanırsa
    // subscribeToActivityChanges ile canlı güncellenir.
    const readDailyLoop = () => ({
        goal: getDailyGoalProgress(Date.now()),
        streak: getStreak(Date.now()),
        lastPos: readLastPosition(),
        weakTopics: getWeakCompletedTopics(2),
    })
    const [dailyLoop, setDailyLoop] = useState(readDailyLoop)
    useEffect(() => subscribeToActivityChanges(() => setDailyLoop(readDailyLoop())), [])

    // Plan §8.2-S5 — event ölçümü (fire-and-forget, mapEvents.js kalıbı):
    // dashboard_viewed yalnızca "Bugün" şeridi AKTİF durumdayken (davet
    // modunda DEĞİLKEN), oturum başına 1 kez tetiklenir — ilk mount'taki
    // dailyLoop değeri kullanılır, sonraki state güncellemeleri tekrar
    // TETİKLEMEZ. checkStreakStatus zaman geçmesiyle sessizce kırılan
    // streak'leri (kullanıcı hiç dönmeden) mount başına yakalar.
    // dailyLoopEventsFiredRef: React.StrictMode dev modda mount→cleanup→
    // mount döngüsü yaptığından (bkz. JenkinsSandboxBlock.jsx mountedRef
    // kalıbı) ref olmadan bu blok geliştirme ortamında 2 kez çalışıp
    // streak_broken'ı yanlışlıkla iki kez atardı — üretimde StrictMode
    // devre dışı olsa da ref korumasız bırakmak riskli.
    const dailyLoopEventsFiredRef = useRef(false)
    useEffect(() => {
        if (dailyLoopEventsFiredRef.current) return
        dailyLoopEventsFiredRef.current = true
        const isInviteAtMount = dailyLoop.goal.units === 0 && dailyLoop.streak.streak === 0
        if (!isInviteAtMount) trackMapEvent('dashboard_viewed')
        checkStreakStatus(Date.now())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Kariyer Haritası kutusunun 3 durumu (plan §6.1): harita yok (davet) /
    // ilerleme var (kişisel pano girişi) / ana yol bitti (uzmanlık dalları).
    // Local-first: profil ve tamamlanan route'lar localStorage'dan senkron okunur;
    // profil sihirbaz tamamlandığında düğüm görüntü kopyasıyla birlikte yazılır.
    const [mentorMapState] = useState(() => {
        const mentorProfile = readMentorProfile()
        if (!mentorProfile || !Array.isArray(mentorProfile.nodes) || mentorProfile.nodes.length === 0) {
            return { state: 'none' }
        }
        const completedRoutes = getLocalCompletedRoutes()
        const total = mentorProfile.nodes.length
        const done = mentorProfile.nodes.filter((n) => completedRoutes.has(n.route)).length
        const nextNode = mentorProfile.nodes.find((n) => !completedRoutes.has(n.route))
        if (!nextNode) return { state: 'done', total }
        return { state: 'progress', done, total, percent: Math.round((done / total) * 100), nextNode }
    })

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

    useEffect(() => {
        localStorage.setItem('focusMode', JSON.stringify(focusMode))
        if (focusMode) {
            document.documentElement.classList.add('focus-mode')
        } else {
            document.documentElement.classList.remove('focus-mode')
        }
    }, [focusMode])

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

    // Yüzen parçacıklar (indigo/mor/pembe — homepage-effects.css §Ambient)
    useEffect(() => {
        const wrapper = document.querySelector('.homepage-page')
        if (!wrapper) return
        const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (noMotion) return

        const particles = []
        const pColors = ['#818cf8', '#c084fc', '#f472b6']
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div')
            p.className = 'home-particle'
            const size = 2 + Math.random() * 3.5
            p.style.left = `${Math.random() * 100}%`
            p.style.width = p.style.height = `${size}px`
            p.style.setProperty('--dur',   `${10 + Math.random() * 10}s`)
            p.style.setProperty('--delay', `${Math.random() * 13}s`)
            p.style.background = pColors[Math.floor(Math.random() * pColors.length)]
            wrapper.appendChild(p)
            particles.push(p)
        }

        return () => particles.forEach(p => p.remove())
    }, [])

    // Yağmur/Gökgürültüsü Ambiyansı (yalnızca soundOn && light mode) — ses
    // dosyası kullanılmaz, Web Audio API ile sentezlenir (bkz. lib/ambientSound.js).
    useEffect(() => {
        if (!soundOn || darkMode) {
            if (audioNodesRef.current) {
                stopRainLoop(audioNodesRef.current.rain, audioNodesRef.current.ctx)
                audioNodesRef.current = null
            }
            if (thunderTimerRef.current) {
                clearInterval(thunderTimerRef.current)
                thunderTimerRef.current = null
            }
            return
        }

        const ctx = getAudioContext()
        const rain = createRainLoop(ctx)
        fadeGain(ctx, rain.gain, 0.06, 1.2)
        audioNodesRef.current = { ctx, rain }

        thunderTimerRef.current = setInterval(() => {
            playThunder(ctx, 0.35)
        }, THUNDER_INTERVAL_MS)

        return () => {
            if (audioNodesRef.current) {
                stopRainLoop(audioNodesRef.current.rain, audioNodesRef.current.ctx)
                audioNodesRef.current = null
            }
            if (thunderTimerRef.current) {
                clearInterval(thunderTimerRef.current)
                thunderTimerRef.current = null
            }
        }
    }, [soundOn, darkMode])

    function handleToggleSound() {
        getAudioContext()
        setSoundOn(prev => {
            const next = !prev
            try { localStorage.setItem(SOUND_PREF_KEY, String(next)) } catch { /* localStorage kapalı olabilir */ }
            return next
        })
    }

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
        { id: 'neuro-locate', name: t('nav.neuroLocate') || '🧠 Neuro-Locate Lab', shortName: t('home.section.neuroLocateShort') || '🧠 Neuro-Locate' },
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
            case 'neuro-locate': return <NeuroLocateLab darkMode={darkMode} />
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
        <div className="homepage-page">
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>

            {showOnboarding && (
                <OnboardingTour darkMode={darkMode} language={language} onDone={dismissOnboarding} />
            )}

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
                            <button
                                onClick={() => setFocusMode(!focusMode)}
                                data-testid="focus-mode-toggle"
                                aria-label={language === 'tr' ? 'Odak modu — dekoratif efektleri kapat' : 'Focus mode — turn off decorative effects'}
                                title={language === 'tr' ? 'Odak modu — dekoratif efektleri kapat' : 'Focus mode — turn off decorative effects'}
                                className={`min-w-[36px] min-h-[36px] px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 ${focusMode
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-400 ring-2 ring-emerald-300'
                                    : darkMode
                                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                        : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                                    }`}
                            >
                                🎯
                            </button>
                            {!darkMode && (
                                <button
                                    type="button"
                                    onClick={handleToggleSound}
                                    className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 bg-white/20 text-white hover:bg-white/30${soundOn ? ' ring-2 ring-pink-300' : ''}`}
                                    title={
                                        language === 'tr'
                                            ? (soundOn ? 'Yağmur sesini kapat' : 'Yağmur sesini aç')
                                            : (soundOn ? 'Mute rain sound' : 'Unmute rain sound')
                                    }
                                    data-testid="homepage-sound-toggle"
                                >
                                    {soundOn ? '🔊' : '🔇'}
                                </button>
                            )}
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

            {/* ── QA Mentor AI Banner — Yeni misin? Buradan Başla ──
                retention-and-motivation-plan.md §6.4 Aşama E: bu banner önceden
                TrendingSkillsWidget/MembershipPromo'nun ALTINDA render ediliyordu
                — yeni bir ziyaretçi "bu site ne işe yarar"dan önce trend
                widget'ını ve üyelik promosunu görüyordu. Component YENİDEN
                YAZILMADI, sadece render sırası yukarı taşındı; learning-os-
                redesign-plan.md §3.2'deki "büyük yeni hero bloğu yazma, mevcut
                yüzeyleri aynı dille yeniden düzenle" kararıyla uyumlu. ── */}
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

                    {/* Text — 3 durumlu içerik (plan §6.1) */}
                    <div className="min-w-0 flex-1">
                        {mentorMapState.state === 'progress' ? (
                            <>
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-black ${
                                        darkMode ? 'bg-indigo-800/60 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                                    }`}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                        {language === 'tr' ? 'HARİTAN' : 'YOUR MAP'}
                                    </span>
                                    <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {language === 'tr'
                                            ? `🗺️ Haritan seni bekliyor — Kaldığın yer: ${mentorMapState.nextNode.emoji || ''} ${mentorMapState.nextNode.title?.tr || ''}`
                                            : `🗺️ Your map is waiting — You're at: ${mentorMapState.nextNode.emoji || ''} ${mentorMapState.nextNode.title?.en || ''}`}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`h-1.5 flex-1 max-w-[180px] rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-indigo-100'}`}>
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${mentorMapState.percent}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)' }}
                                        />
                                    </div>
                                    <p className={`text-xs font-bold ${darkMode ? 'text-purple-200/80' : 'text-indigo-700'}`}>
                                        {language === 'tr'
                                            ? `${mentorMapState.done}/${mentorMapState.total} adım · %${mentorMapState.percent}`
                                            : `${mentorMapState.done}/${mentorMapState.total} steps · ${mentorMapState.percent}%`}
                                    </p>
                                </div>
                            </>
                        ) : mentorMapState.state === 'done' ? (
                            <>
                                <h2 className={`text-sm md:text-base font-black mb-0.5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {language === 'tr' ? '🏆 Haritandaki ana yolu bitirdin!' : '🏆 You finished your map\'s main path!'}
                                </h2>
                                <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-purple-200/80' : 'text-indigo-700'}`}>
                                    {language === 'tr'
                                        ? 'Ekstra dallarla uzmanlaş: Appium, JMeter, BrowserStack… ✨'
                                        : 'Specialize with extra branches: Appium, JMeter, BrowserStack… ✨'}
                                </p>
                            </>
                        ) : (
                            <>
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
                                        ? '4 kısa soru · ~1 dakika — sana özel, süre tahminli öğrenme yolu ve zihin haritası hazırlansın. ✨'
                                        : '4 quick questions · ~1 minute — get a personalized learning path and mind map with a time estimate. ✨'}
                                </p>
                            </>
                        )}
                    </div>

                    {/* CTA arrow */}
                    <div className={`flex-shrink-0 flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:gap-2 whitespace-nowrap ${
                        darkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                    >
                        {mentorMapState.state === 'progress'
                            ? (language === 'tr' ? 'Devam et' : 'Continue')
                            : mentorMapState.state === 'done'
                                ? (language === 'tr' ? 'Haritana git' : 'View map')
                                : (language === 'tr' ? 'Başla' : 'Start')}
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </div>
                </Link>
            </div>

            {/* ── Trend Skill Widget — sayfayı açan herkes hemen görsün ── */}
            <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
                <TrendingSkillsWidget darkMode={darkMode} />
            </div>

            {/* ── Üyelik Tanıtım Banner'ı — sadece misafirler için ── */}
            {!session && <MembershipPromo darkMode={darkMode} />}

            {/* ── Kaldığın Yerden Devam Et Banner ── */}
            {/* resumePoint yalnızca "📍 Kaldığın yeri kaydet" butonuna EN SON ne zaman
                basıldığını tutar — o route'un GERÇEKTEN tamamlanıp tamamlanmadığını
                bilmez (saveProgress'in yazdığı point objesi status taşımaz). Kullanıcı
                bir sekmeyi bitirdikten SONRA bu düğmeye basmışsa (ya da bitirmeden önce
                basıp sonra bitirmişse), route zaten `learnqa_completed_routes`'a girmiş
                olabilir — bu durumda "kaldığın yerden devam et" demek "Haritan seni
                bekliyor" kartıyla ÇELİŞİR (bkz. 2026-07-20 kullanıcı bildirimi). Route
                zaten tamamlanmışsa bu kart hiç gösterilmez, doğru öneri zaten aşağıdaki
                kariyer haritası widget'ından gelir. */}
            {resumePoint?.routePath && !getLocalCompletedRoutes().has(resumePoint.routePath) && (() => {
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

            {/* ── "Bugün" şeridi (Learning OS Faz 1, plan §5-F3) — günlük hedef + streak + Devam et ── */}
            <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
                {(() => {
                    const { goal, streak, lastPos } = dailyLoop
                    const isInvite = goal.units === 0 && streak.streak === 0
                    // Devam-et hedefi tek kaynaktan: önce sekme-derinlikli son konum,
                    // yoksa kariyer haritasının sıradaki düğümü (plan §4 öneri 4).
                    // lastPos, o route ZATEN tamamlanmış olsa bile son ziyaret edilen
                    // sekmeyi hatırlamaya devam eder (her sekme değişiminde otomatik
                    // güncellenir, tamamlanma durumunu kontrol etmez) — bu yüzden
                    // "zaten tamamlanmış route'a geri dön" gibi çelişkili bir öneriye
                    // düşmemek için burada da tamamlanma kontrolü yapılır (bkz. yukarıdaki
                    // resume-banner'daki aynı düzeltme, 2026-07-20 kullanıcı bildirimi).
                    const lastPosCompleted = lastPos && getLocalCompletedRoutes().has(lastPos.route)
                    const continueTarget = (lastPos && !lastPosCompleted)
                        ? {
                            to: lastPos.route,
                            state: { openTab: lastPos.tabIndex },
                            label: RESUME_LESSON_NAMES[lastPos.route]?.[language]
                                || lastPos.route.replace(/^\//, '').replace(/-/g, ' '),
                        }
                        : mentorMapState.state === 'progress'
                            ? {
                                to: mentorMapState.nextNode.route,
                                state: undefined,
                                label: mentorMapState.nextNode.title?.[language] || '',
                            }
                            : null

                    if (isInvite) {
                        return (
                            <div
                                data-testid="daily-strip-invite"
                                className={`flex items-center gap-3 md:gap-4 rounded-2xl border-2 p-3.5 md:p-4 ${darkMode
                                    ? 'border-amber-700/60 bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-amber-900/40'
                                    : 'border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50'
                                    }`}
                            >
                                <div className={`flex-shrink-0 rounded-xl p-2.5 shadow-lg ${darkMode ? 'bg-amber-700/60' : 'bg-amber-500'}`}>
                                    <span className="text-xl md:text-2xl">🎯</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {language === 'tr' ? 'Bugün 10 birimle başla' : 'Start today with 10 units'}
                                    </h2>
                                    <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-amber-200/80' : 'text-amber-700'}`}>
                                        {language === 'tr'
                                            ? 'Quiz cevapla, egzersiz bitir — günlük hedefini doldur, streak\'ini başlat. 🔥'
                                            : 'Answer quizzes, finish exercises — hit your daily goal and start your streak. 🔥'}
                                    </p>
                                </div>
                            </div>
                        )
                    }

                    const percent = Math.min(100, Math.round((goal.units / goal.goal) * 100))
                    return (
                        <div
                            data-testid="daily-strip"
                            className={`flex flex-wrap items-center gap-3 md:gap-4 rounded-2xl border-2 p-3.5 md:p-4 ${darkMode
                                ? 'border-amber-700/60 bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-amber-900/40'
                                : 'border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50'
                                }`}
                        >
                            {/* Streak — grace kuralı: dün hedefliyse ❄️ donmuş görünür. */}
                            <span
                                data-testid="daily-streak"
                                title={streak.frozen
                                    ? (language === 'tr' ? 'Streak donmuş — bugün çalışırsan devam eder!' : 'Streak frozen — study today to keep it going!')
                                    : streak.streak === 0
                                        ? (language === 'tr' ? 'Bugünkü hedefi doldurunca serin başlar' : 'Hit today\'s goal to start your streak')
                                        : (language === 'tr' ? 'Üst üste hedefli gün sayın' : 'Consecutive goal-met days')}
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${darkMode ? 'bg-amber-800/60 text-amber-200' : 'bg-amber-100 text-amber-800'}`}
                            >
                                {streak.streak === 0 && !streak.frozen
                                    ? <>🌱 {language === 'tr' ? 'Bugün başladın!' : 'You started today!'}</>
                                    : <>{streak.frozen ? '❄️' : '🔥'} {streak.streak} {language === 'tr' ? 'gün' : streak.streak === 1 ? 'day' : 'days'}</>}
                            </span>

                            {/* Günlük hedef barı */}
                            <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                                <div
                                    data-testid="daily-goal-bar"
                                    role="progressbar"
                                    aria-valuenow={goal.units}
                                    aria-valuemin={0}
                                    aria-valuemax={goal.goal}
                                    aria-label={language === 'tr' ? `Günlük hedef: ${goal.units}/${goal.goal} birim` : `Daily goal: ${goal.units}/${goal.goal} units`}
                                    className={`h-2.5 flex-1 max-w-[220px] rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-amber-100'}`}
                                >
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${percent}%`, background: 'linear-gradient(90deg, #f59e0b, #f97316)' }}
                                    />
                                </div>
                                <p className={`text-xs font-bold whitespace-nowrap ${darkMode ? 'text-amber-200/90' : 'text-amber-700'}`}>
                                    {goal.units}/{goal.goal}
                                </p>
                                {goal.met && (
                                    <span
                                        data-testid="daily-goal-done"
                                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${darkMode ? 'bg-emerald-800/60 text-emerald-200' : 'bg-emerald-100 text-emerald-700'}`}
                                    >
                                        🎉 {language === 'tr' ? 'Bugünkü hedef tamam!' : 'Daily goal done!'}
                                    </span>
                                )}
                            </div>

                            {/* Devam et — sekme-derinlikli son konum ya da haritanın sıradaki düğümü */}
                            {continueTarget && (
                                <Link
                                    to={continueTarget.to}
                                    state={continueTarget.state}
                                    data-testid="daily-continue"
                                    className="flex-shrink-0 inline-flex min-h-[36px] items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 whitespace-nowrap"
                                    style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
                                >
                                    ▶️ {language === 'tr' ? 'Devam et' : 'Continue'}{continueTarget.label ? `: ${continueTarget.label}` : ''}
                                </Link>
                            )}
                        </div>
                    )
                })()}

                {/* Weak Topic Reminders */}
                {dailyLoop.weakTopics && dailyLoop.weakTopics.length > 0 && (
                    <div
                        data-testid="weak-topic-reminder"
                        className={`mt-3 flex flex-wrap items-center gap-2 rounded-xl p-2.5 px-4 text-xs font-medium border ${darkMode
                            ? 'bg-indigo-950/40 border-indigo-800/60 text-indigo-200'
                            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                            }`}
                    >
                        <p className={`text-xs font-bold ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
                            {language === 'tr' ? 'Bir tekrar iyi gelir:' : 'A quick refresher would help:'}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {dailyLoop.weakTopics.map((w) => (
                                <Link
                                    key={w.route}
                                    to={w.route}
                                    data-testid="weak-topic-link"
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${darkMode
                                        ? 'bg-indigo-900/60 text-indigo-200 hover:bg-indigo-800/70'
                                        : 'bg-white text-indigo-700 hover:bg-indigo-100'
                                        }`}
                                >
                                    {RESUME_LESSON_NAMES[w.route]?.[language] || w.route.replace(/^\//, '').replace(/-/g, ' ')}
                                    <span className={darkMode ? 'text-indigo-400' : 'text-indigo-500'}>%{w.mastery}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <ActivityHeatmap darkMode={darkMode} language={language} />
            </div>

            {/* ── "Bugünkü Tekrar" kartı (WP4) — sadece tekrar zamanı gelmiş soru varsa görünür ── */}
            {dueReviewCount > 0 && (
                <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
                    <button
                        onClick={() => setReviewPanelOpen(true)}
                        data-testid="review-queue-card"
                        className={`group w-full flex items-center gap-3 md:gap-4 rounded-2xl border-2 p-3.5 md:p-5 text-left transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl ${darkMode
                            ? 'border-emerald-700/60 bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-emerald-900/40 hover:border-emerald-500/80'
                            : 'border-emerald-300 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 hover:border-emerald-400'
                            }`}
                    >
                        <div className={`flex-shrink-0 rounded-xl p-2.5 md:p-3 shadow-lg transition-transform duration-200 group-hover:scale-110 ${darkMode ? 'bg-emerald-700/60' : 'bg-emerald-600'}`}>
                            <span className="text-2xl md:text-3xl">🔄</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {language === 'tr' ? '🔄 Bugünkü Tekrar' : '🔄 Today\'s Review'}
                                </h2>
                                {/* Mikro-oturum zaman çerçevesi (retention-and-motivation-plan.md Aşama D,
                                    learning-os-redesign-plan.md §7 Faz 3 dilimi) — "Flow State" endişesine
                                    cevap: açık bir süre taahhüdü, düşük bağlılık hissi verir. Panel zaten
                                    en fazla REVIEW_QUEUE_SESSION_SIZE soru gösterdiği için (bkz.
                                    ReviewQueuePanel.jsx) tahmin buna göre hesaplanır, ~30sn/soru. */}
                                <span
                                    data-testid="review-queue-time-estimate"
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${darkMode ? 'bg-emerald-800/60 text-emerald-200' : 'bg-emerald-100 text-emerald-700'}`}
                                >
                                    ⏱ {language === 'tr'
                                        ? `~${Math.max(1, Math.round(Math.min(dueReviewCount, REVIEW_QUEUE_SESSION_SIZE) * 0.5))} dk`
                                        : `~${Math.max(1, Math.round(Math.min(dueReviewCount, REVIEW_QUEUE_SESSION_SIZE) * 0.5))} min`}
                                </span>
                            </div>
                            <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-emerald-200/80' : 'text-emerald-700'}`}>
                                {language === 'tr'
                                    ? `${dueReviewCount} soru seni bekliyor — daha önce yanlış yaptıkların.`
                                    : `${dueReviewCount} question${dueReviewCount === 1 ? '' : 's'} waiting for you — ones you got wrong before.`}
                            </p>
                        </div>
                        <div className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-lg whitespace-nowrap ${darkMode ? 'bg-emerald-600' : 'bg-emerald-600'}`}>
                            {language === 'tr' ? 'Başla' : 'Start'} →
                        </div>
                    </button>
                </div>
            )}

            {reviewPanelOpen && (
                <ReviewQueuePanel
                    darkMode={darkMode}
                    language={language}
                    onClose={() => {
                        setReviewPanelOpen(false)
                        setDueReviewCount(getQueueStats(Date.now()).dueCount)
                    }}
                />
            )}

            {/* ── Ders Tamamlama Kuralları — herkese açık, şeffaflık için ── */}
            <div className="container mx-auto px-3 pt-4 md:px-6 md:pt-6">
                <div className={`rounded-2xl border-2 overflow-hidden ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                    <button
                        onClick={() => setRulesOpen((prev) => !prev)}
                        data-testid="completion-rules-toggle"
                        className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl flex-shrink-0">📐</span>
                            <div>
                                <h2 className={`text-sm md:text-base font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {language === 'tr' ? 'Bir ders nasıl "tamamlandı" sayılır?' : 'How does a lesson count as "completed"?'}
                                </h2>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {language === 'tr' ? 'Tıkla ve kuralları gör — tüm kullanıcılar için geçerlidir.' : 'Tap to see the rules — the same for every user.'}
                                </p>
                            </div>
                        </div>
                        {rulesOpen ? <ChevronUp className={darkMode ? 'text-gray-400' : 'text-gray-500'} /> : <ChevronDown className={darkMode ? 'text-gray-400' : 'text-gray-500'} />}
                    </button>

                    {rulesOpen && (
                        <div className={`px-4 pb-5 md:px-5 space-y-3 text-sm leading-relaxed border-t ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-100 text-gray-700'}`}>
                            {[
                                {
                                    icon: '🧠',
                                    tr: ['Her sekmede en az bir quiz sorusu bulunur.', 'Bir sekmeyi manuel olarak "tamamlandı" diye işaretleyemezsin — gerçekten doğru cevaplaman gerekir.', 'Bir quiz sorusunu yanlış cevapladığında aynı soru tekrar gösterilmez — alternatif bir soru sorulur, doğru cevabı ezberleyip geçemezsin.'],
                                    en: ['Every tab has at least one quiz question.', 'You can\'t manually mark a tab "completed" — you have to actually answer it correctly.', 'If you answer a quiz question incorrectly, you won\'t see the same question again — you get an alternative question instead, so you can\'t pass by memorizing the answer.'],
                                },
                                {
                                    icon: '🔒',
                                    tr: ['Sayfadaki TÜM sekmelerin quizlerinin en az %60\'ını doğru cevaplamadan Mülakat Soruları sekmesine geçemezsin.', 'Sidebar\'da: boş kutu = henüz denenmedi, kırmızı ✗ = denendi ama %60\'ı geçemedi, yeşil ✓ = geçti.'],
                                    en: ['You can\'t unlock the Interview Questions tab until you\'ve answered at least 60% of the quizzes across ALL tabs on the page correctly.', 'In the sidebar: empty box = not tried yet, red ✗ = tried but below 60%, green ✓ = passed.'],
                                },
                                {
                                    icon: '🤖',
                                    tr: ['Bir quiz sorusunu cevapladığında AI, senin SEÇTİĞİN cevaba özel bir açıklama yazar — sadece "doğru cevap bu" demez, neden öyle olduğunu (veya neden yanlış seçtiğini) öğretir.'],
                                    en: ['When you answer a quiz question, the AI writes an explanation specific to YOUR choice — not just "the answer is X", but why (or why your pick was wrong).'],
                                },
                                {
                                    icon: '🎤',
                                    tr: ['Mülakat sorularında çoktan seçmeli şık YOKTUR — gerçek bir mülakatta olduğu gibi kendi cümlelerinle cevap yazarsın. Cevap sana önceden gösterilmez.', 'AI seni mantığına/akıl yürütmene göre değerlendirir, kelime ezberine göre değil.', 'AI\'ın değerlendirmesine katılmıyorsan itiraz edip kendi gerekçeni yazabilirsin — AI itirazını gerçek bir teknik tartışma gibi inceler.'],
                                    en: ['Interview questions have NO multiple-choice options — just like a real interview, you write your own answer in your own words. The answer is never shown to you in advance.', 'The AI judges your reasoning and logic, not rote keyword matching.', 'If you disagree with the AI\'s verdict, you can dispute it and write your own justification — the AI treats it as a real technical discussion.'],
                                },
                                {
                                    icon: '🏅',
                                    tr: ['Mülakat pratiğinde örnek sorularının ortalaması %80\'e ulaşınca o sekme — ve gerekli sekme sayısına ulaşıldığında bitirme rozeti — kazanılır.'],
                                    en: ['Once your average score on the sampled interview questions reaches 80%, that tab — and, once enough tabs are done, a completion badge — is earned.'],
                                },
                            ].map((rule, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-lg flex-shrink-0">{rule.icon}</span>
                                    <div className="space-y-1">
                                        {(language === 'tr' ? rule.tr : rule.en).map((line, j) => (
                                            <p key={j} className={j === 0 ? 'font-semibold' : 'opacity-90'}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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
                                <span className="relative inline-block">
                                    <Link to="/java" data-testid="nav-java" className={nb('orange')}>☕ Java</Link>
                                    <span aria-hidden="true" className="absolute -top-2 -right-1.5 z-10 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black leading-none pointer-events-none shadow-sm bg-amber-400 text-gray-900">③</span>
                                </span>
                                <Link to="/python" data-testid="nav-python" className={nb('yellow')}>🐍 Python</Link>
                                <Link to="/typescript" data-testid="nav-typescript" className={nb('indigo')}>💻 TS</Link>
                                <Link to="/javascript" data-testid="nav-javascript" className={nb('yellow')}>🟨 JS</Link>
                                <Link to="/sql" data-testid="nav-sql" className={nb('blue')}>🗄️ SQL</Link>
                                <span className="relative inline-block">
                                    <Link
                                        to="/algorithms"
                                        data-testid="nav-algorithms"
                                        className={`${nb('violet')} hover:scale-125 hover:backdrop-blur-xl hover:bg-white/20 hover:border-white/40 hover:shadow-[0_12px_32px_rgba(34,211,238,0.35)]`}
                                        style={{ backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
                                    >
                                        {t('home.learnAlgorithms')}
                                    </Link>
                                    <span aria-hidden="true" className="absolute -top-2 -right-1.5 z-10 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black leading-none pointer-events-none shadow-sm bg-amber-400 text-gray-900">①</span>
                                </span>
                                <a href="https://hasankocaman.github.io/boltJSTScompare/" className={nb('blue')}>JS↔TS</a>
                                <button onClick={() => { setActiveSection('lang-compare'); setTimeout(() => { contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 50) }} className={nb('violet')}>🔀 {language === 'tr' ? '3 Dil' : '3 Languages'}</button>
                            </div>
                        </div>

                        {/* 2. Test Otomasyon */}
                        <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-100 shadow-sm'}`}>
                            <div className={`px-3 py-2 flex items-center gap-1.5 border-b ${darkMode ? 'bg-emerald-900/30 border-gray-700' : 'bg-emerald-50 border-emerald-100'}`}>
                                <span className="text-sm">🧪</span>
                                <span className={`text-xs font-bold tracking-wide uppercase ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{t('home.category.testTools')}</span>
                            </div>
                            <div className="p-2 flex flex-wrap gap-1">
                                <span className="relative inline-block">
                                    <Link to="/what-is-testing" className={nb('violet')}>{t('home.learnTesting')}</Link>
                                    <span aria-hidden="true" className="absolute -top-2.5 -left-1.5 z-10 px-1.5 py-0.5 rounded-full text-[8px] font-black leading-none whitespace-nowrap pointer-events-none shadow-sm bg-rose-500 text-white">
                                        {language === 'tr' ? '🚀 Buradan başla' : '🚀 Start here'}
                                    </span>
                                </span>
                                <span className="relative inline-block">
                                    <Link to="/manual-testing" data-testid="nav-manual-testing" className={nb('blue')}>{t('home.learnManualTesting')}</Link>
                                    <span aria-hidden="true" className="absolute -top-2 -right-1.5 z-10 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black leading-none pointer-events-none shadow-sm bg-amber-400 text-gray-900">②</span>
                                </span>
                                <Link to="/selenium" data-testid="nav-selenium" className={nb('emerald')}>🟢 Selenium</Link>
                                <Link to="/playwright" className={nb('purple')}>🎭 Playwright</Link>
                                <Link to="/cypress" data-testid="nav-cypress" className={nb('purple')}>🌲 Cypress</Link>
                                <Link to="/rest-assured" data-testid="nav-rest-assured" className={nb('emerald')}>🧪 REST Assured</Link>
                                <Link to="/gauge" data-testid="nav-gauge" className={nb('orange')}>📏 Gauge</Link>
                                <Link to="/appium" data-testid="nav-appium" className={nb('green')}>📱 Appium</Link>
                                <Link to="/browserstack" data-testid="nav-browserstack" className={nb('orange')}>☁️ BrowserStack</Link>
                                <span className="relative inline-block">
                                    <Link to="/claude-ai" data-testid="nav-claude-ai" className={`inline-flex items-center gap-1.5 ${nb('orange')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="flex-shrink-0" aria-hidden="true">
                                            <g>
                                                <rect x="10.4" y="1" width="3.2" height="9.2" rx="1.6" />
                                                <rect x="10.4" y="13.8" width="3.2" height="9.2" rx="1.6" />
                                                <rect x="1" y="10.4" width="9.2" height="3.2" rx="1.6" />
                                                <rect x="13.8" y="10.4" width="9.2" height="3.2" rx="1.6" />
                                                <rect x="10.4" y="1" width="3.2" height="9.2" rx="1.6" transform="rotate(45 12 12)" />
                                                <rect x="10.4" y="13.8" width="3.2" height="9.2" rx="1.6" transform="rotate(45 12 12)" />
                                                <rect x="1" y="10.4" width="9.2" height="3.2" rx="1.6" transform="rotate(45 12 12)" />
                                                <rect x="13.8" y="10.4" width="9.2" height="3.2" rx="1.6" transform="rotate(45 12 12)" />
                                            </g>
                                        </svg>
                                        Claude AI
                                    </Link>
                                    <span aria-hidden="true" className="absolute -top-2.5 -right-1.5 z-10 px-1.5 py-0.5 rounded-full text-[8px] font-black leading-none whitespace-nowrap pointer-events-none shadow-sm bg-rose-500 text-white">
                                        {language === 'tr' ? 'YENİ' : 'NEW'}
                                    </span>
                                </span>
                                <Link to="/llm-agents" data-testid="nav-llm-agents" className={nb('violet')}>🧠 LLM & Agents</Link>
                                {isAdmin && <Link to="/security" data-testid="nav-security" className={nb('red')}>🔒 {language === 'tr' ? 'Siber Güvenlik' : 'Cyber Security'}</Link>}
                                <button onClick={() => { setActiveSection('comparison'); setTimeout(() => { contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 50) }} className={nb('violet')}>⚖️ {language === 'tr' ? 'Karşılaştır' : 'Compare Tools'}</button>
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
                                <Link to="/bruno" data-testid="nav-bruno" className={nb('blue')}>📦 Bruno</Link>
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
                                {isAdmin && <Link to="/backend" data-testid="nav-backend" className={nb('cyan')}>🧩 {language === 'tr' ? 'Basit Backend' : 'Simple Backend'}</Link>}
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
                                    { to: '/javascript', label: '🟨 JavaScript' },
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
                                    { to: '/gauge', label: '📏 Gauge' },
                                    { to: '/postman', label: '📮 Postman' },
                                    { to: '/bruno', label: '📦 Bruno' },
                                    { to: '/jmeter', label: '📊 JMeter' },
                                    { to: '/browserstack', label: '☁️ BrowserStack' },
                                    ...(isAdmin ? [{ to: '/security', label: language === 'tr' ? '🔒 Siber Güvenlik' : '🔒 Cyber Security' }] : []),
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
        </div>
    )
}

export default HomePage
