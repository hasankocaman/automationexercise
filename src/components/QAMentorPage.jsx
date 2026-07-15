// src/components/QAMentorPage.jsx
// QA Mentor AI — Dinamik Zihin Haritası Sayfası
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import TopicHeader from './TopicHeader'
import CircularProgress from './CircularProgress'
import { DIALOG, MENTOR_STEPS, ALL_MAPS } from '../data/qaMentorData'

// ─── Scroll Progress Bar ────────────────────────────────────────────────────
function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const max = Math.max(1, scrollHeight - clientHeight)
            setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)))
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div className="fixed left-0 right-0 top-0 z-[9999] h-[3px] bg-transparent">
            <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)' }} />
        </div>
    )
}

// ─── Dark Mode Hook ─────────────────────────────────────────────────────────
function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        document.documentElement.classList.toggle('dark-mode', isDark)
        document.documentElement.classList.toggle('light-mode-forced', !isDark)
        return isDark
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark-mode', darkMode)
        document.documentElement.classList.toggle('light-mode-forced', !darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

// ─── Typing Indicator ───────────────────────────────────────────────────────
function TypingIndicator({ darkMode }) {
    return (
        <div className="flex items-center gap-2 px-4 py-3">
            <span className="text-xl">🤖</span>
            <div className={`flex items-center gap-1.5 rounded-2xl px-4 py-2.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {[0, 1, 2].map(i => (
                    <span
                        key={i}
                        className={`block h-2 w-2 rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-500'}`}
                        style={{ animation: `qaTypingDot 1.2s ${i * 0.2}s infinite ease-in-out` }}
                    />
                ))}
            </div>
        </div>
    )
}

// ─── Chat Bubble ────────────────────────────────────────────────────────────
function ChatBubble({ message, isBot, darkMode, visible }) {
    const formatText = (text) => {
        // Bold **text**
        // Split by paragraphs first, then handle bold within each
        const paragraphs = text.split('\n\n')
        return paragraphs.map((para, pIdx) => {
            const parts = para.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>
                }
                return part
            })
            return (
                <span key={pIdx}>
                    {parts}
                    {pIdx < paragraphs.length - 1 && <><br /><br /></>}
                </span>
            )
        })

    }

    return (
        <div
            className={`flex items-end gap-2 transition-all duration-500 ${isBot ? 'flex-row' : 'flex-row-reverse'} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: visible ? '0ms' : '0ms' }}
        >
            <span className="text-xl flex-shrink-0 mb-1">{isBot ? '🤖' : '👤'}</span>
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm md:text-base leading-relaxed shadow-lg ${
                    isBot
                        ? darkMode
                            ? 'bg-gray-700 text-gray-100 rounded-bl-sm'
                            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                        : darkMode
                            ? 'bg-indigo-600 text-white rounded-br-sm'
                            : 'bg-indigo-500 text-white rounded-br-sm'
                }`}
            >
                {formatText(message)}
            </div>
        </div>
    )
}

// ─── Option Button ──────────────────────────────────────────────────────────
function OptionButton({ option, onClick, darkMode, disabled }) {
    return (
        <button
            onClick={() => onClick(option)}
            disabled={disabled}
            className={`w-full text-left rounded-xl border-2 px-4 py-3 text-sm md:text-base font-medium transition-all duration-200
                ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'}
                ${darkMode
                    ? 'border-gray-600 bg-gray-800 text-gray-200 hover:border-purple-500 hover:bg-purple-900/30 hover:text-purple-200 hover:shadow-purple-500/20'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-indigo-200'
                }`}
        >
            {option.label}
        </button>
    )
}

// ─── Mind Map Node ──────────────────────────────────────────────────────────
function MindMapNode({ node, index, lang, darkMode, animDelay }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), animDelay)
        return () => clearTimeout(t)
    }, [animDelay])

    const navigate = useNavigate()

    return (
        <div
            className={`relative transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
            {/* Connector line — left side indicator */}
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[60%] rounded-full"
                style={{ background: node.color, boxShadow: `0 0 8px ${node.glow}` }}
            />

            <div
                className={`ml-3 group relative overflow-hidden rounded-xl border p-3 md:p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl
                    ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                style={{
                    boxShadow: `0 0 0 0 ${node.glow}`,
                }}
                onClick={() => navigate(node.route)}
                title={lang === 'tr' ? node.title.tr : node.title.en}
            >
                {/* Glow overlay on hover */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${node.glow}, transparent 70%)` }}
                />

                <div className="relative z-10 flex items-center gap-3">
                    {/* Step number */}
                    <div
                        className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-lg"
                        style={{ background: node.color }}
                    >
                        {index + 1}
                    </div>

                    {/* Emoji */}
                    <span className="text-xl md:text-2xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                        {node.emoji}
                    </span>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        <div className={`font-bold text-sm md:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'tr' ? node.title.tr : node.title.en}
                        </div>
                        <div className={`text-xs mt-0.5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr' ? node.desc.tr : node.desc.en}
                        </div>
                    </div>

                    {/* Arrow */}
                    <div
                        className="flex-shrink-0 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 whitespace-nowrap"
                        style={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                    >
                        →
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Extra Node ─────────────────────────────────────────────────────────────
function ExtraNode({ node, lang, darkMode, animDelay }) {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), animDelay)
        return () => clearTimeout(t)
    }, [animDelay])

    return (
        <Link
            to={node.route}
            className={`group relative overflow-hidden rounded-xl border p-3 transition-all duration-200 hover:scale-[1.03] hover:shadow-lg
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                ${darkMode ? 'bg-gray-800/60 border-gray-700 hover:border-amber-500/50' : 'bg-amber-50/60 border-amber-200 hover:border-amber-400'}`}
            style={{ transitionDelay: `${animDelay}ms` }}
        >
            <div className="flex items-center gap-2">
                <span className="text-lg flex-shrink-0">{node.emoji}</span>
                <div className="min-w-0 flex-1">
                    <div className={`font-bold text-xs ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {lang === 'tr' ? node.title.tr : node.title.en}
                    </div>
                    <div className={`text-[10px] leading-tight mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {lang === 'tr' ? node.desc.tr : node.desc.en}
                    </div>
                </div>
                <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>→</span>
            </div>
        </Link>
    )
}

// ─── Mind Map View ──────────────────────────────────────────────────────────
function MindMapView({ mapData, lang, darkMode, dialog, onRestart, progress, certificateId }) {
    const [headerVisible, setHeaderVisible] = useState(false)
    const [noteVisible, setNoteVisible] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setHeaderVisible(true), 100)
        const t2 = setTimeout(() => setNoteVisible(true), mapData.nodes.length * 80 + 400)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [mapData.nodes.length])

    const mentorNote = lang === 'tr' ? mapData.mentorNote.tr : mapData.mentorNote.en

    const formatMentorNote = (text) => {
        return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className={darkMode ? 'text-purple-300' : 'text-indigo-700'}>{part.slice(2, -2)}</strong>
            }
            if (part === '\n\n') return <br key={i} />
            return part.split('\n\n').map((para, j) => (
                <span key={`${i}-${j}`}>{para}{j < part.split('\n\n').length - 1 && <><br /><br /></>}</span>
            ))
        })
    }

    return (
        <div className="space-y-6 pb-16">
            {/* Map Header */}
            <div className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className={`rounded-2xl p-4 md:p-6 text-center shadow-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                    <div
                        className="inline-block rounded-xl px-4 py-2 text-white text-xs font-bold mb-3 shadow-lg"
                        style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                    >
                        <span
                            className="inline-block rounded-xl px-4 py-2 text-white text-xs font-bold"
                            style={{ background: `linear-gradient(135deg, ${mapData.color.includes('violet') ? '#7c3aed' : mapData.color.includes('emerald') ? '#059669' : mapData.color.includes('blue') ? '#2563eb' : '#7c3aed'}, ${mapData.color.includes('fuchsia') ? '#a855f7' : mapData.color.includes('teal') ? '#0d9488' : mapData.color.includes('indigo') ? '#4f46e5' : '#a855f7'})` }}
                        >
                            {lang === 'tr' ? '🗺️ Kişiselleştirilmiş QA Yol Haritanız' : '🗺️ Your Personalized QA Roadmap'}
                        </span>
                    </div>
                    <h2 className={`text-xl md:text-2xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'tr' ? mapData.title.tr : mapData.title.en}
                    </h2>
                    <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'tr' ? mapData.subtitle.tr : mapData.subtitle.en}
                    </p>

                    {progress && (
                        <div className="mt-4 flex items-center justify-center">
                            <CircularProgress
                                percent={progress.percent}
                                darkMode={darkMode}
                                label={
                                    lang === 'tr'
                                        ? `${progress.completedCount}/${progress.total} ders tamamlandı`
                                        : `${progress.completedCount}/${progress.total} lessons completed`
                                }
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Main Path */}
            <div className={`rounded-2xl border p-4 md:p-6 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                <div className="flex items-center gap-2 mb-4">
                    <div className={`rounded-full px-3 py-1 text-xs font-black ${darkMode ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                        {dialog.mainPath}
                    </div>
                    <div className={`h-px flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {mapData.nodes.length} {lang === 'tr' ? 'adım' : 'steps'}
                    </span>
                </div>

                <div className="space-y-3">
                    {mapData.nodes.map((node, i) => (
                        <MindMapNode
                            key={node.id}
                            node={node}
                            index={i}
                            lang={lang}
                            darkMode={darkMode}
                            animDelay={200 + i * 80}
                        />
                    ))}
                </div>
            </div>

            {/* Extras */}
            {mapData.extras.length > 0 && (
                <div className={`rounded-2xl border p-4 md:p-6 ${darkMode ? 'bg-amber-900/10 border-amber-800/30' : 'bg-amber-50/60 border-amber-200'} shadow-lg`}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`rounded-full px-3 py-1 text-xs font-black ${darkMode ? 'bg-amber-900/40 text-amber-300 border border-amber-700' : 'bg-amber-100 text-amber-700 border border-amber-300'}`}>
                            {dialog.optional}
                        </div>
                        <div className={`h-px flex-1 ${darkMode ? 'bg-amber-900/40' : 'bg-amber-200'}`} />
                    </div>
                    <p className={`text-sm font-bold mb-3 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                        {dialog.extraTitle}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mapData.extras.map((node, i) => (
                            <ExtraNode
                                key={node.route}
                                node={node}
                                lang={lang}
                                darkMode={darkMode}
                                animDelay={mapData.nodes.length * 80 + 200 + i * 80}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Mentor Note */}
            <div className={`transition-all duration-700 ${noteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className={`rounded-2xl border p-4 md:p-6 shadow-xl ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-700/50' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'}`}>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🎓</span>
                        <h3 className={`font-black text-base md:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {dialog.mentorNoteTitle}
                        </h3>
                    </div>
                    <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formatMentorNote(mentorNote)}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className={`transition-all duration-700 delay-300 ${noteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={onRestart}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-105 border ${
                            darkMode
                                ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                    >
                        🔄 {dialog.restart}
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                    >
                        🖨️ {dialog.print}
                    </button>
                    {certificateId && (
                        <Link
                            to={`/verify-certificate/${certificateId}`}
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                            style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
                        >
                            📜 {lang === 'tr' ? 'Sertifikamı Görüntüle' : 'View My Certificate'}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── Resolve Dialog Key ──────────────────────────────────────────────────────
function resolveDialogKey(key, dialog) {
    if (!key) return ''
    const parts = key.split('.')
    let current = dialog
    for (const part of parts) {
        if (current && current[part] !== undefined) {
            current = current[part]
        } else {
            return key // fallback
        }
    }
    return current
}

// ─── Main Component ─────────────────────────────────────────────────────────
function QAMentorPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()
    const lang = language
    const dialog = DIALOG[lang]
    const { session, profile, loading: authLoading, setCareerGoal, getCompletedRoutePaths, claimCertificate } = useAuth()

    const [step, setStep] = useState(MENTOR_STEPS.STEP_1)
    const [messages, setMessages] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [selectedMap, setSelectedMap] = useState(null)
    const [choices, setChoices] = useState([])
    const [progress, setProgress] = useState(null)
    const [certificateId, setCertificateId] = useState(null)
    const chatBottomRef = useRef(null)
    const resumedRef = useRef(false)

    // Scroll to bottom on new messages
    useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping, showOptions])

    // Add a bot message with typing delay
    const addBotMessage = useCallback((key, delay = 600) => {
        return new Promise(resolve => {
            setIsTyping(true)
            setShowOptions(false)
            setTimeout(() => {
                setIsTyping(false)
                setMessages(prev => [...prev, { id: Date.now() + Math.random(), isBot: true, key, visible: false }])
                // Trigger visibility after mount
                setTimeout(() => {
                    setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, visible: true } : m))
                    resolve()
                }, 50)
            }, delay)
        })
    }, [])

    // Add a user message
    const addUserMessage = useCallback((key) => {
        setMessages(prev => [...prev, { id: Date.now() + Math.random(), isBot: false, key, visible: true }])
    }, [])

    // Initialize — eğer üye daha önce bir yol haritası seçip kaydettiyse (career_goal),
    // sihirbazı tekrar sormak yerine doğrudan kayıtlı haritayı gösterir.
    useEffect(() => {
        if (authLoading || resumedRef.current) return
        resumedRef.current = true

        const savedGoal = profile?.career_goal
        if (savedGoal && ALL_MAPS[savedGoal]) {
            setSelectedMap(ALL_MAPS[savedGoal])
            setStep(savedGoal)
            return
        }

        // Not: burada kasıtlı olarak bir "cancelled" guard'ı YOK. React 18
        // StrictMode (dev modu) bu efekti mount→cleanup→remount şeklinde iki kez
        // tetikler; eskiden buradaki cleanup zinciri "cancelled=true" yapıyordu ve
        // resumedRef zaten true olduğu için ikinci (gerçek) mount asla yeni bir
        // zincir başlatmıyordu — sonuç: sihirbaz tek bot mesajından sonra kalıcı
        // olarak takılı kalıyordu (gerçek kullanıcı bug raporu, 2026-06-23).
        // resumedRef tek zincirin başlamasını garantilediği için burada ekstra
        // cancellation gerekmiyor; component gerçekten unmount olursa devam eden
        // setState çağrıları React 18'de sessizce yok sayılır, hata vermez.
        const init = async () => {
            await addBotMessage('welcome.bot', 800)
            await addBotMessage('welcome.bot2', 900)
            await addBotMessage('step1.bot', 700)
            setShowOptions(true)
        }
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authLoading])

    // Seçilen yol haritasındaki tamamlanma yüzdesini hesaplar (sadece üyeler için —
    // anonim kullanıcının route bazlı geçmişi Supabase'de yaşamıyor). %100'e ulaşınca
    // bir sertifika talep eder (claimCertificate idempotent — tekrar tekrar çağrılsa
    // bile aynı sertifikayı döner, çoğaltmaz).
    useEffect(() => {
        if (!selectedMap || !session) { setProgress(null); setCertificateId(null); return }
        let cancelled = false
        getCompletedRoutePaths().then((completedSet) => {
            if (cancelled) return
            const total = selectedMap.nodes.length
            const completedCount = selectedMap.nodes.filter((node) => completedSet.has(node.route)).length
            const percent = total ? (completedCount / total) * 100 : 0
            setProgress({ percent, completedCount, total })

            if (percent === 100 && step) {
                claimCertificate(step).then((id) => { if (!cancelled) setCertificateId(id) })
            }
        })
        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMap, session])

    // Restart — reset everything
    const handleRestart = useCallback(() => {
        setStep(MENTOR_STEPS.STEP_1)
        setMessages([])
        setShowOptions(false)
        setIsTyping(false)
        setSelectedMap(null)
        setChoices([])
        // Re-trigger init
        let cancelled = false
        const init = async () => {
            await addBotMessage('welcome.bot', 800)
            if (cancelled) return
            await addBotMessage('welcome.bot2', 900)
            if (cancelled) return
            await addBotMessage('step1.bot', 700)
            if (cancelled) return
            setShowOptions(true)
        }
        init()
        return () => { cancelled = true }
    }, [addBotMessage])

    // Sihirbaz bir haritada karar kıldığında haritayı gösterir ve (üyeyse) career_goal'u kaydeder.
    const finalizeMap = useCallback((mapKey) => {
        setSelectedMap(ALL_MAPS[mapKey])
        setStep(mapKey)
        if (session) setCareerGoal(mapKey)
    }, [session, setCareerGoal])

    // Handle option selection
    const handleOption = useCallback(async (option) => {
        setShowOptions(false)
        addUserMessage(`userChoice.${option.id}`)
        setChoices(prev => [...prev, option.id])

        if (option.id === 'A') {
            // → Sıfırdan, direkt MAP_A
            await addBotMessage('mapReady', 900)
            finalizeMap('map_a')
        } else if (option.id === 'B') {
            // → Yazılım geçmişi var, sor: Java mı?
            await addBotMessage('step2.bot', 900)
            setStep(MENTOR_STEPS.STEP_2)
            setShowOptions(true)
        } else if (option.id === 'B1') {
            // → Java ile başlamak istiyor, sor: Selenium mi Playwright mı?
            await addBotMessage('step3.bot', 900)
            setStep(MENTOR_STEPS.STEP_3)
            setShowOptions(true)
        } else if (option.id === 'B2') {
            // → Python/TS yolu — önce Selenium sorusu
            await addBotMessage('stepBSelenium.bot', 900)
            setStep(MENTOR_STEPS.STEP_B_SELENIUM)
            setShowOptions(true)
        } else if (option.id === 'B_SEL_YES') {
            // → Python/TS + Selenium dahil
            await addBotMessage('mapReady', 900)
            finalizeMap('map_b_sel')
        } else if (option.id === 'B_SEL_NO') {
            // → Playwright vs Cypress tanıtımı, ardından MAP_B
            await addBotMessage('playwrightCypressCompare.bot', 1200)
            await addBotMessage('mapReady', 700)
            finalizeMap('map_b')
        } else if (option.id === 'C1') {
            // → Java + Selenium
            await addBotMessage('mapReady', 900)
            finalizeMap('map_c1')
        } else if (option.id === 'C2') {
            // → Java + Playwright
            await addBotMessage('mapReady', 900)
            finalizeMap('map_c2')
        }
    }, [addBotMessage, addUserMessage, finalizeMap])

    const isMapStep = [
        MENTOR_STEPS.MAP_A,
        MENTOR_STEPS.MAP_B,
        MENTOR_STEPS.MAP_B_SEL,
        MENTOR_STEPS.MAP_C1,
        MENTOR_STEPS.MAP_C2,
    ].includes(step)

    // Current options to display
    const currentOptions = (() => {
        if (step === MENTOR_STEPS.STEP_1) return dialog.step1.options
        if (step === MENTOR_STEPS.STEP_2) return dialog.step2.options
        if (step === MENTOR_STEPS.STEP_3) return dialog.step3.options
        if (step === MENTOR_STEPS.STEP_B_SELENIUM) return dialog.stepBSelenium.options
        return []
    })()

    // Progress steps (max 4 now with STEP_B_SELENIUM)
    const totalSteps = 4
    const currentStepNum =
        step === MENTOR_STEPS.STEP_1 ? 1
        : step === MENTOR_STEPS.STEP_2 ? 2
        : step === MENTOR_STEPS.STEP_3 ? 3
        : step === MENTOR_STEPS.STEP_B_SELENIUM ? 3
        : totalSteps
    const isComplete = isMapStep

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-50'}`}>
            <ScrollProgressBar />

            {/* Header */}
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Fixed home button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-testid="back-to-top-btn"
                className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-xl transition-all duration-200 hover:scale-110 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                title="Back to top"
            >
                🏠
            </button>

            {/* Page Content */}
            <main className="container mx-auto max-w-3xl px-3 py-6 md:px-6 md:py-8">
                {/* Page Title */}
                <div className="mb-6 text-center">
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3 ${darkMode ? 'bg-purple-900/40 text-purple-200 border border-purple-700' : 'bg-purple-100 text-purple-700 border border-purple-300'}`}>
                        🧠 {lang === 'tr' ? 'QA Akıl Hocası — Kişiselleştirilmiş Yol Haritası' : 'QA Mentor AI — Personalized Roadmap'}
                    </div>
                    <h1 className={`text-2xl md:text-3xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'tr' ? 'QA Kariyer Zihin Haritanı Çıkar' : 'Generate Your QA Career Mind Map'}
                    </h1>
                    <p className={`mt-2 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'tr'
                            ? '1–3 kısa soruya verdiğin cevaplara göre sana özel öğrenme yolu hazırlanır.'
                            : 'Answer 1–3 short questions to get your personalized learning path.'}
                    </p>
                </div>

                {/* Progress Indicator */}
                {!isComplete && (
                    <div className="mb-6 flex items-center justify-center gap-2">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="flex items-center gap-2">
                                <div
                                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                        n < currentStepNum
                                            ? 'bg-green-500 scale-110'
                                            : n === currentStepNum
                                                ? 'scale-125 shadow-lg'
                                                : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}
                                    style={n === currentStepNum ? { background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 0 10px rgba(99,102,241,0.6)' } : {}}
                                />
                                {n < 4 && <div className={`h-px w-6 ${n < currentStepNum ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />}
                            </div>
                        ))}

                    </div>
                )}

                {/* Chat Area */}
                <div className={`rounded-2xl border shadow-xl overflow-hidden mb-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    {/* Chat header */}
                    <div className={`flex items-center gap-3 px-4 py-3 border-b ${darkMode ? 'bg-gray-750 border-gray-700 bg-gray-900/40' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <span className="text-2xl">🤖</span>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            </div>
                            <div>
                                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    QA Mentor AI
                                </div>
                                <div className={`text-[10px] ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                    {lang === 'tr' ? '● Çevrimiçi' : '● Online'}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1" />
                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            LearnQA.dev
                        </div>
                    </div>

                    {/* Messages */}
                    <div className={`space-y-3 p-4 md:p-5 min-h-[200px] max-h-[420px] overflow-y-auto`}>
                        {messages.map(m => (
                            <ChatBubble
                                key={m.id}
                                message={resolveDialogKey(m.key, dialog)}
                                isBot={m.isBot}
                                darkMode={darkMode}
                                visible={m.visible}
                            />
                        ))}

                        {isTyping && <TypingIndicator darkMode={darkMode} />}

                        <div ref={chatBottomRef} />
                    </div>

                    {/* Options */}
                    {showOptions && currentOptions.length > 0 && (
                        <div className={`border-t p-4 space-y-2 ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'}`}>
                            <p className={`text-xs font-bold mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {lang === 'tr' ? '↑ Bir seçenek belirle:' : '↑ Choose an option:'}
                            </p>
                            {currentOptions.map(opt => (
                                <OptionButton
                                    key={opt.id}
                                    option={opt}
                                    onClick={handleOption}
                                    darkMode={darkMode}
                                    disabled={isTyping}
                                />
                            ))}
                        </div>
                    )}

                    {/* Map Ready indicator in chat */}
                    {isComplete && (
                        <div className={`border-t px-4 py-3 ${darkMode ? 'border-gray-700 bg-green-900/10' : 'border-gray-100 bg-green-50'}`}>
                            <p className={`text-xs font-bold flex items-center gap-1.5 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                {lang === 'tr' ? 'Haritanız aşağıda hazır →' : 'Your roadmap is ready below →'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Mind Map */}
                {isComplete && selectedMap && (
                    <MindMapView
                        mapData={selectedMap}
                        lang={lang}
                        darkMode={darkMode}
                        dialog={dialog}
                        onRestart={handleRestart}
                        progress={progress}
                        certificateId={certificateId}
                    />
                )}
            </main>

            {/* CSS for typing animation */}
            <style>{`
                @keyframes qaTypingDot {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-6px); opacity: 1; }
                }
                @media print {
                    header, .fixed, button { display: none !important; }
                    .rounded-2xl { page-break-inside: avoid; }
                }
            `}</style>
        </div>
    )
}

export default QAMentorPage
