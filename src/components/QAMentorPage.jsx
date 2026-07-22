// src/components/QAMentorPage.jsx
// QA Mentor AI — Dinamik Zihin Haritası Sayfası
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import TopicHeader from './TopicHeader'
import CircularProgress from './CircularProgress'
import { SkillRadar, JobReadinessCard } from './SkillRadar'
import { DIALOG, MENTOR_STEPS, ALL_MAPS, WEEKLY_HOURS, pickBaseMapId, resolveMap } from '../data/qaMentorData'
import {
    readMentorProfile,
    saveMentorProfile,
    clearMentorProfile,
    readWizardDraft,
    saveWizardDraft,
    clearWizardDraft,
    getLocalCompletedRoutes,
    totalEstimatedHours,
    weeksForHours,
    finishMonthLabel,
} from '../utils/careerMapProfile'
import { trackMapEvent } from '../utils/mapEvents'

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
// badge: plan §2.2 — S1=sıfır iken S2'de "Kararsızım" seçeneği default vurgulu
// gösterilir ("✨ Önerilen" rozeti + renkli çerçeve). Tıklamayı değiştirmez.
function OptionButton({ option, onClick, darkMode, disabled, badge }) {
    return (
        <button
            onClick={() => onClick(option)}
            disabled={disabled}
            data-testid={`mentor-option-${option.id}`}
            className={`w-full text-left rounded-xl border-2 px-4 py-3 text-sm md:text-base font-medium transition-all duration-200
                ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'}
                ${badge
                    ? darkMode
                        ? 'border-purple-500 bg-purple-900/20 text-purple-100 hover:bg-purple-900/40 hover:shadow-purple-500/20'
                        : 'border-indigo-400 bg-indigo-50/70 text-indigo-800 hover:bg-indigo-50 hover:shadow-indigo-200'
                    : darkMode
                        ? 'border-gray-600 bg-gray-800 text-gray-200 hover:border-purple-500 hover:bg-purple-900/30 hover:text-purple-200 hover:shadow-purple-500/20'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-indigo-200'
                }`}
        >
            <span className="flex items-center justify-between gap-2">
                <span>{option.label}</span>
                {badge && (
                    <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${
                        darkMode ? 'bg-purple-700/70 text-purple-100' : 'bg-indigo-600 text-white'
                    }`}>
                        {badge}
                    </span>
                )}
            </span>
        </button>
    )
}

// ─── Mind Map Path (eğrisel bağlantı + "buradasın" işareti) ────────────────
// Mevcut düğüm listesine (space-y-3, testleri bozmayacak şekilde) SADECE
// görsel bir SVG katmanı EKLER — hiçbir testid/metin/tıklama davranışı
// değişmez. containerRef'in doğrudan çocuklarının gerçek DOM konumu ölçülüp
// (ResizeObserver) düğümler arasından yumuşak bir S-eğrisi geçirilir; segment
// rengi hedef düğümün durumuna göre değişir (done=yeşil dolu, next=vurgulu,
// future=soluk kesik çizgi — kilit değil, sadece "henüz oraya gelmedin" hissi).
function MindMapPath({ containerRef, statuses, darkMode }) {
    const [anchors, setAnchors] = useState([])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        function measure() {
            const children = Array.from(container.children)
            const containerRect = container.getBoundingClientRect()
            const points = children.map((child, i) => {
                const rect = child.getBoundingClientRect()
                const wiggle = i % 2 === 0 ? -5 : 5
                return { x: 7 + wiggle, y: rect.top - containerRect.top + rect.height / 2 }
            })
            setAnchors(points)
        }

        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(container)
        return () => ro.disconnect()
    }, [containerRef, statuses.length])

    if (anchors.length < 2) return null

    const height = Math.max(...anchors.map((p) => p.y)) + 24
    const hereIndex = statuses.findIndex((s) => s === 'next')
    const here = hereIndex >= 0 ? anchors[hereIndex] : null
    const hereColor = darkMode ? '#818cf8' : '#4f46e5'

    function segmentStyle(toStatus) {
        if (toStatus === 'done') return { stroke: '#22c55e', width: 3, dash: 'none', opacity: 0.9 }
        if (toStatus === 'next') return { stroke: hereColor, width: 3, dash: 'none', opacity: 1 }
        return { stroke: darkMode ? '#4b5563' : '#d1d5db', width: 2, dash: '5,6', opacity: 0.7 }
    }

    return (
        <svg
            className="absolute left-0 top-0 z-0"
            width={40}
            height={height}
            style={{ overflow: 'visible' }}
            aria-hidden="true"
            data-testid="mind-map-path"
        >
            {anchors.slice(1).map((point, idx) => {
                const prev = anchors[idx]
                const style = segmentStyle(statuses[idx + 1])
                const midY = (prev.y + point.y) / 2
                const d = `M ${prev.x},${prev.y} C ${prev.x},${midY} ${point.x},${midY} ${point.x},${point.y}`
                return (
                    <path
                        key={idx}
                        d={d}
                        fill="none"
                        stroke={style.stroke}
                        strokeWidth={style.width}
                        strokeDasharray={style.dash}
                        strokeLinecap="round"
                        opacity={style.opacity}
                    />
                )
            })}
            {here && (
                <g data-testid="mind-map-here-marker">
                    <circle
                        cx={here.x}
                        cy={here.y}
                        r={11}
                        fill="none"
                        stroke={hereColor}
                        strokeWidth={2}
                        opacity={0.55}
                        className="animate-ping"
                        style={{ transformOrigin: `${here.x}px ${here.y}px` }}
                    />
                    <circle cx={here.x} cy={here.y} r={6} fill={hereColor} stroke={darkMode ? '#1f2937' : '#ffffff'} strokeWidth={2} />
                </g>
            )}
        </svg>
    )
}

// ─── Mind Map Node ──────────────────────────────────────────────────────────
// status: 'done' (tamamlandı) | 'next' (sıradaki, pulse vurgusu) | 'future' (soluk
// ama tıklanabilir — kilit yok, meraklı kullanıcı ileriye bakabilmeli, plan §7 risk 4)
function MindMapNode({ node, index, lang, darkMode, animDelay, status, durationLabel, dialog }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), animDelay)
        return () => clearTimeout(t)
    }, [animDelay])

    const navigate = useNavigate()
    const isDone = status === 'done'
    const isNext = status === 'next'
    const isFuture = status === 'future'

    return (
        <div
            className={`relative transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
            <div
                className={`ml-3 group relative z-10 overflow-hidden rounded-xl border-2 p-3.5 md:p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl
                    ${isDone
                        ? darkMode ? 'bg-slate-900 border-teal-500/60 shadow-lg shadow-teal-950/40 brick-bevel' : 'bg-teal-50/60 border-teal-400 shadow-md brick-bevel'
                        : isNext
                        ? darkMode ? 'bg-amber-950/30 border-amber-500 ring-2 ring-amber-500/50 site-lamp-glow' : 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/50 site-lamp-glow'
                        : darkMode ? 'bg-slate-900/80 border-slate-800 opacity-75 border-dashed' : 'bg-white border-slate-200 opacity-75 border-dashed'}`}
                onClick={() => navigate(node.route)}
                title={lang === 'tr' ? node.title.tr : node.title.en}
                data-testid={`map-node-${node.route.replace(/\//g, '')}`}
            >
                {/* Glow overlay on hover */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${isDone ? 'rgba(20, 184, 166, 0.25)' : node.glow}, transparent 70%)` }}
                />

                <div className="relative z-10 flex items-center gap-3">
                    {/* 3D Tuğla Kat Numarası Badge */}
                    <div
                        className={`flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-lg border brick-bevel ${
                            isDone
                                ? 'bg-gradient-to-tr from-teal-600 to-cyan-400 text-slate-950 border-teal-300'
                                : isNext
                                ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-amber-300 animate-pulse'
                                : darkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                    >
                        {isDone ? '🧱 ✓' : `#${index + 1}`}
                    </div>

                    {/* Emoji */}
                    <span className="text-xl md:text-2xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                        {node.emoji}
                    </span>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                        <div className={`font-bold text-sm md:text-base flex items-center gap-2 flex-wrap ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {lang === 'tr' ? node.title.tr : node.title.en}
                            {isDone && (
                                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black bg-teal-500/20 text-teal-300 border border-teal-400/40">
                                    🧱 {lang === 'tr' ? 'TUĞLA ÖRÜLDÜ' : 'BRICK LAID'}
                                </span>
                            )}
                            {isNext && (
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black ${darkMode ? 'bg-amber-900/60 text-amber-300' : 'bg-amber-100 text-amber-800'}`}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    🚧 {lang === 'tr' ? 'ŞANTİYE KATI ÖRÜLÜYOR' : 'BUILDING FLOOR'}
                                </span>
                            )}
                        </div>
                        <div className={`text-xs mt-0.5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr' ? node.desc.tr : node.desc.en}
                        </div>
                    </div>

                    {/* Süre chip'i + hover oku */}
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                        {durationLabel && (
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                isDone
                                    ? darkMode ? 'bg-teal-900/50 text-teal-300' : 'bg-teal-100 text-teal-700'
                                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {isDone ? `🧱 ${dialog.statusDone}` : `⏱ ${durationLabel}`}
                            </span>
                        )}
                        <div
                            className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 whitespace-nowrap"
                            style={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}
                        >
                            →
                        </div>
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
function MindMapView({ mapData, lang, darkMode, dialog, onRestart, progress, certificateId, weeklyHours, completedSet }) {
    const [headerVisible, setHeaderVisible] = useState(false)
    const [noteVisible, setNoteVisible] = useState(false)
    const navigate = useNavigate()
    const pathContainerRef = useRef(null)

    useEffect(() => {
        const t1 = setTimeout(() => setHeaderVisible(true), 100)
        const t2 = setTimeout(() => setNoteVisible(true), mapData.nodes.length * 80 + 400)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [mapData.nodes.length])

    const mentorNote = lang === 'tr' ? mapData.mentorNote.tr : mapData.mentorNote.en

    // Düğüm durumları + süre hesabı (plan §4.1/§4.2): tamamlanan / sıradaki / gelecek
    const completed = completedSet || new Set()
    const nextNode = mapData.nodes.find((n) => !completed.has(n.route)) || null
    const nodeStatus = (node) =>
        completed.has(node.route) ? 'done' : node === nextNode ? 'next' : 'future'
    const nodeDurationLabel = (node) => {
        if (!node.estimatedHours) return null
        // Tempo biliniyorsa hafta, bilinmiyorsa saat cinsinden göster
        if (weeklyHours) return `~${weeksForHours(node.estimatedHours, weeklyHours)} ${dialog.weeksShort}`
        return `~${node.estimatedHours} ${dialog.hoursShort}`
    }

    const totalHours = totalEstimatedHours(mapData.nodes)
    const remainingHours = totalEstimatedHours(mapData.nodes.filter((n) => !completed.has(n.route)))
    let durationLine
    if (weeklyHours) {
        const totalWeeks = weeksForHours(totalHours, weeklyHours)
        // Plan §7 risk 2: tahmin tek nokta değil ARALIK olarak verilir ("6-8 ay") —
        // geride kalan kullanıcı "tarihi kaçırdım" hissine kapılmasın diye üst
        // sınır ~%25 pay içerir.
        const monthsLow = Math.max(1, Math.round(totalWeeks / 4.345))
        const monthsHigh = monthsLow + Math.max(1, Math.round(monthsLow * 0.25))
        const remainingWeeks = weeksForHours(remainingHours, weeklyHours)
        durationLine = `📅 ~${monthsLow}-${monthsHigh} ${dialog.monthsShort} (${weeklyHours} ${dialog.estPerWeek}) · ${dialog.estRemaining}: ~${remainingWeeks} ${dialog.weeksShort} · ${dialog.estFinish}: ${finishMonthLabel(remainingWeeks, lang)}`
    } else {
        durationLine = `⏱️ ${dialog.estTotal}: ~${totalHours} ${dialog.hoursShort}`
    }

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

                    {/* Süre tahmini rozeti (plan §2.3): tempo + kalan + somut bitiş ayı */}
                    <div
                        data-testid="map-duration-line"
                        className={`mt-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold ${darkMode ? 'bg-gray-700/80 text-gray-200' : 'bg-indigo-50 text-indigo-700'}`}
                    >
                        {durationLine}
                    </div>

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

            {/* Learning OS Faz 2 (plan §6.2-6.3/F8-F9): Skill Radar + Job Readiness —
                haritadaki route'lara göre kişiselleştirilmiş, en az 1 ders
                tamamlanmadan (progress null iken) render edilmez. */}
            {progress && (
                <div className={`transition-all duration-700 delay-150 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`rounded-2xl p-4 md:p-6 shadow-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                            <h3 className={`text-sm font-bold mb-2 text-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                {lang === 'tr' ? '🎯 Yetenek Radarı' : '🎯 Skill Radar'}
                            </h3>
                            <SkillRadar
                                darkMode={darkMode}
                                language={lang}
                                routeFilter={mapData.nodes.map((n) => n.route)}
                            />
                        </div>
                        <JobReadinessCard
                            darkMode={darkMode}
                            language={lang}
                            routes={mapData.nodes.map((n) => n.route)}
                            roadmapPercent={progress.percent}
                        />
                    </div>
                </div>
            )}

            {/* Tek büyük CTA (plan §2.3): odak her zaman bir sonraki tek adım */}
            {nextNode && (
                <button
                    onClick={() => {
                        // Plan §9.1 funnel: yalnız İLK ders tıklaması ölçülür (aktivasyon metriği)
                        if (!progress || progress.completedCount === 0) {
                            trackMapEvent('map_first_lesson_clicked', { route: nextNode.route, mapId: mapData.id })
                        }
                        navigate(nextNode.route)
                    }}
                    data-testid="career-map-cta"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm md:text-base font-black text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-indigo-500/40"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                >
                    {(progress?.completedCount > 0 ? dialog.continueCta : dialog.startCta)}
                    {': '}
                    {lang === 'tr' ? nextNode.title.tr : nextNode.title.en}
                    <span aria-hidden="true">→</span>
                </button>
            )}

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

                <div className="relative space-y-3" ref={pathContainerRef}>
                    <MindMapPath
                        containerRef={pathContainerRef}
                        statuses={mapData.nodes.map(nodeStatus)}
                        darkMode={darkMode}
                    />
                    {mapData.nodes.map((node, i) => (
                        <MindMapNode
                            key={node.id}
                            node={node}
                            index={i}
                            lang={lang}
                            darkMode={darkMode}
                            animDelay={200 + i * 80}
                            status={nodeStatus(node)}
                            durationLabel={nodeDurationLabel(node)}
                            dialog={dialog}
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
                        data-testid="mentor-restart-btn"
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
                {/* Yeniden oluşturma kaygısını azaltan not (plan §7 risk 5) */}
                <p className={`mt-2 text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    🔒 {dialog.progressSafeNote}
                </p>
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

    const [step, setStep] = useState(MENTOR_STEPS.STEP_LEVEL)
    const [messages, setMessages] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [resolvedMap, setResolvedMap] = useState(null)
    const [answers, setAnswers] = useState({})
    const [progress, setProgress] = useState(null)
    const [completedSet, setCompletedSet] = useState(null)
    const [certificateId, setCertificateId] = useState(null)
    const chatBottomRef = useRef(null)
    const resumedRef = useRef(false)
    // Geri düğmesi için soru anlık görüntüleri: {step, count, answers}
    const historyRef = useRef([])
    const messagesCountRef = useRef(0)
    // v1 career_goal migrasyonu: harita belli, sadece zaman sorusu soruluyor
    const pendingMapIdRef = useRef(null)

    useEffect(() => { messagesCountRef.current = messages.length }, [messages])

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

    // Initialize — kalıcılık öncelik sırası (plan §2.1):
    // 1) v2 local profil varsa sihirbaz atlanır, doğrudan harita gösterilir
    //    (sihirbaz "işe alım görüşmesi"dir bir kez yapılır; harita "çalışma masası"dır).
    // 2) v1 üye migrasyonu: career_goal kayıtlı ama local profil yok → harita korunur,
    //    yalnızca süre tahmini için tek zaman sorusu sorulur (plan §7 risk 6).
    // 3) Hiçbiri yoksa tam sihirbaz başlar.
    useEffect(() => {
        if (authLoading || resumedRef.current) return
        resumedRef.current = true

        const savedProfile = readMentorProfile()
        if (savedProfile) {
            const resolved = resolveMap(savedProfile)
            if (resolved) {
                // Harita tanımı bu sürümde değişmiş olabilir; HomePage kutusunun
                // kullandığı hafif düğüm kopyasını her ziyarette tazele
                saveMentorProfile({ answers: savedProfile.answers, mapId: savedProfile.mapId, nodes: resolved.nodes })
                setAnswers(savedProfile.answers || {})
                setResolvedMap(resolved)
                setStep(savedProfile.mapId)
                trackMapEvent('map_revisited', { mapId: savedProfile.mapId })
                return
            }
            clearMentorProfile()
        }

        const savedGoal = profile?.career_goal
        if (savedGoal && ALL_MAPS[savedGoal]) {
            pendingMapIdRef.current = savedGoal
            const initTimeOnly = async () => {
                await addBotMessage('timeOnly.bot', 800)
                await addBotMessage('stepTime.bot', 800)
                setStep(MENTOR_STEPS.STEP_TIME)
                setShowOptions(true)
            }
            initTimeOnly()
            return
        }

        // Yarıda kalan sihirbaz (plan §7 risk 3): son cevaplanan sorunun taslağı
        // varsa baştan başlatma — kaldığı sorudan devam ettir. map_wizard_started
        // burada TEKRAR atılmaz (ilk başlangıçta zaten atıldı — çift sayım olmasın).
        const draft = readWizardDraft()
        const draftPromptKey = {
            [MENTOR_STEPS.STEP_LANG]: 'stepLang.bot',
            [MENTOR_STEPS.STEP_TOOL]: 'stepTool.bot',
            [MENTOR_STEPS.STEP_TIME]: 'stepTime.bot',
        }[draft?.step]
        if (draft && draftPromptKey) {
            setAnswers(draft.answers || {})
            const initDraft = async () => {
                await addBotMessage('resumeDraft.bot', 800)
                await addBotMessage(draftPromptKey, 700)
                setStep(draft.step)
                setShowOptions(true)
            }
            initDraft()
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
        trackMapEvent('map_wizard_started')
        const init = async () => {
            await addBotMessage('welcome.bot', 800)
            await addBotMessage('welcome.bot2', 900)
            await addBotMessage('stepLevel.bot', 700)
            setShowOptions(true)
        }
        init()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authLoading])

    // Haritadaki tamamlanma yüzdesini hesaplar — artık anonim kullanıcı için de
    // (CLAUDE.md §5: progress üyelik gerektirmez). Local tamamlanan route seti her
    // zaman okunur; üye ise Supabase seti ile birleştirilir. %100'e ulaşan ÜYE için
    // sertifika talep edilir (claimCertificate idempotent; sertifika doğrulanabilir
    // kimlik gerektirdiğinden üyelikte kalır — plan §5.4).
    useEffect(() => {
        if (!resolvedMap) { setProgress(null); setCompletedSet(null); setCertificateId(null); return }
        let cancelled = false
        const localSet = getLocalCompletedRoutes()

        const apply = (set) => {
            if (cancelled) return
            setCompletedSet(set)
            const total = resolvedMap.nodes.length
            const completedCount = resolvedMap.nodes.filter((node) => set.has(node.route)).length
            const percent = total ? (completedCount / total) * 100 : 0
            setProgress({ percent, completedCount, total })

            if (percent === 100 && session) {
                claimCertificate(resolvedMap.id).then((id) => { if (!cancelled) setCertificateId(id) })
            }
        }

        if (session) {
            getCompletedRoutePaths().then((remoteSet) => apply(new Set([...localSet, ...remoteSet])))
        } else {
            apply(localSet)
        }
        return () => { cancelled = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedMap, session])

    // Restart — profil dahil her şeyi sıfırla, tam sihirbazı yeniden başlat.
    // Ders ilerlemesi (learnqa_completed_routes) bilinçli olarak SİLİNMEZ —
    // "İlerlemen güvende" vaadi (plan §7 risk 5).
    const handleRestart = useCallback(() => {
        trackMapEvent('map_regenerated', { mapId: resolvedMap?.id || null })
        clearMentorProfile()
        clearWizardDraft()
        pendingMapIdRef.current = null
        historyRef.current = []
        setStep(MENTOR_STEPS.STEP_LEVEL)
        setMessages([])
        setShowOptions(false)
        setIsTyping(false)
        setResolvedMap(null)
        setAnswers({})
        setProgress(null)
        setCompletedSet(null)
        setCertificateId(null)
        const init = async () => {
            await addBotMessage('welcome.bot', 800)
            await addBotMessage('welcome.bot2', 900)
            await addBotMessage('stepLevel.bot', 700)
            setShowOptions(true)
        }
        init()
    }, [addBotMessage, resolvedMap])

    // Sihirbaz tamamlandığında: harita çözülür, profil localStorage'a yazılır
    // (kalıcılık) ve üye ise career_goal senkronlanır.
    const finalizeMap = useCallback((answersFinal, mapIdOverride) => {
        const mapId = mapIdOverride || pickBaseMapId(answersFinal)
        const resolved = resolveMap({ answers: answersFinal, mapId })
        if (!resolved) return
        saveMentorProfile({ answers: answersFinal, mapId, nodes: resolved.nodes })
        clearWizardDraft()
        trackMapEvent('map_wizard_completed', { answers: answersFinal, mapId })
        setResolvedMap(resolved)
        setStep(mapId)
        if (session) setCareerGoal(mapId)
    }, [session, setCareerGoal])

    // Seçenek tıklanınca: v2 akışı S1 seviye → S2 dil → S3 araç → S4 zaman → harita
    const handleOption = useCallback(async (option) => {
        setShowOptions(false)
        // Geri düğmesi anlık görüntüsü — kullanıcı mesajı eklenmeden ÖNCE alınır
        historyRef.current.push({ step, count: messagesCountRef.current, answers: { ...answers } })
        addUserMessage(`userChoice.${option.id}`)

        if (step === MENTOR_STEPS.STEP_LEVEL) {
            const level = option.id === 'L_ZERO' ? 'zero' : option.id === 'L_MANUAL' ? 'manual' : 'coder'
            setAnswers(prev => ({ ...prev, level }))
            // Yarıda kalma taslağı (plan §7 risk 3): cevap alınır alınmaz, bot yazarken
            // sekme kapansa bile bir sonraki soru adımı kayıtlı olsun
            saveWizardDraft({ step: MENTOR_STEPS.STEP_LANG, answers: { ...answers, level } })
            await addBotMessage(`ackLevel.${option.id}`, 700)
            await addBotMessage('stepLang.bot', 800)
            setStep(MENTOR_STEPS.STEP_LANG)
            setShowOptions(true)
        } else if (step === MENTOR_STEPS.STEP_LANG) {
            let answersNext
            if (option.id === 'LANG_UNDECIDED') {
                answersNext = { ...answers, lang: 'java', langAuto: true }
                setAnswers(answersNext)
                saveWizardDraft({ step: MENTOR_STEPS.STEP_TOOL, answers: answersNext })
                // Karar felcindeki kullanıcı kaybedilmez: gerekçeli Java önerisi (plan §2.2).
                // Öneri balonunun kendisi onay görevi görür — ayrıca ack eklenmez.
                await addBotMessage('langRecommend.bot', 1100)
            } else {
                // Tek dil seçimi (ürün kararı 2026-07-19): java | python | typescript
                const lang = option.id === 'LANG_JAVA' ? 'java' : option.id === 'LANG_PYTHON' ? 'python' : 'typescript'
                answersNext = { ...answers, lang }
                setAnswers(answersNext)
                saveWizardDraft({ step: MENTOR_STEPS.STEP_TOOL, answers: answersNext })
                // Plan §6.2: her cevaptan sonra 1 cümlelik mentor onayı (araç-nötr)
                await addBotMessage(`ackLang.${option.id}`, 700)
            }
            await addBotMessage('stepTool.bot', 800)
            setStep(MENTOR_STEPS.STEP_TOOL)
            setShowOptions(true)
        } else if (step === MENTOR_STEPS.STEP_TOOL) {
            const uiTool = option.id === 'TOOL_SELENIUM' ? 'selenium' : option.id === 'TOOL_PLAYWRIGHT' ? 'playwright' : 'both'
            setAnswers(prev => ({ ...prev, uiTool }))
            saveWizardDraft({ step: MENTOR_STEPS.STEP_TIME, answers: { ...answers, uiTool } })
            // Plan §6.2: araç seçimi onayı
            await addBotMessage(`ackTool.${option.id}`, 700)
            // Modern yol + Playwright: v1'deki Playwright vs Cypress gerekçesi korunur
            // (java dışındaki tüm dillerde: python | typescript | legacy 'modern')
            if (uiTool === 'playwright' && answers.lang !== 'java') {
                await addBotMessage('playwrightCypressCompare.bot', 1200)
            }
            await addBotMessage('stepTime.bot', 800)
            setStep(MENTOR_STEPS.STEP_TIME)
            setShowOptions(true)
        } else if (step === MENTOR_STEPS.STEP_TIME) {
            const weeklyHours = WEEKLY_HOURS[option.id] || 8
            const answersFinal = { ...answers, weeklyHours }
            setAnswers(answersFinal)
            await addBotMessage(`ackTime.${option.id}`, 700)
            // Kısa "hazırlanıyor" beklemesi: kişiselleştirme algısını güçlendirir (plan §6.2)
            await addBotMessage('preparing', 900)
            await addBotMessage('mapReady', 1500)
            finalizeMap(answersFinal, pendingMapIdRef.current)
        }
    }, [step, answers, addBotMessage, addUserMessage, finalizeMap])

    // Geri düğmesi: son sorunun anlık görüntüsüne döner (plan §6.2 — yanlış cevap
    // veren kullanıcı baştan başlamak zorunda kalmaz)
    const handleBack = useCallback(() => {
        const snap = historyRef.current.pop()
        if (!snap) return
        setIsTyping(false)
        setMessages(prev => prev.slice(0, snap.count))
        setAnswers(snap.answers)
        setStep(snap.step)
        setShowOptions(true)
        // Taslağı da geri alınan adıma senkronla — yoksa reload'da kullanıcı
        // geri aldığı cevabıyla bir ileri adımda "devam ettirilir"
        if (snap.step === MENTOR_STEPS.STEP_LEVEL) clearWizardDraft()
        else saveWizardDraft({ step: snap.step, answers: snap.answers })
    }, [])

    const isMapStep = [
        MENTOR_STEPS.MAP_A,
        MENTOR_STEPS.MAP_B,
        MENTOR_STEPS.MAP_B_SEL,
        MENTOR_STEPS.MAP_C1,
        MENTOR_STEPS.MAP_C2,
    ].includes(step)

    // Current options to display
    const currentOptions = (() => {
        if (step === MENTOR_STEPS.STEP_LEVEL) return dialog.stepLevel.options
        if (step === MENTOR_STEPS.STEP_LANG) return dialog.stepLang.options
        if (step === MENTOR_STEPS.STEP_TOOL) return dialog.stepTool.options
        if (step === MENTOR_STEPS.STEP_TIME) return dialog.stepTime.options
        return []
    })()

    // 4 soruluk v2 akışının adım göstergesi
    const totalSteps = 4
    const currentStepNum =
        step === MENTOR_STEPS.STEP_LEVEL ? 1
        : step === MENTOR_STEPS.STEP_LANG ? 2
        : step === MENTOR_STEPS.STEP_TOOL ? 3
        : step === MENTOR_STEPS.STEP_TIME ? 4
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
                title={lang === 'tr' ? 'Başa dön' : 'Back to top'}
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
                            ? '4 kısa soru · ~1 dakika — cevaplarına göre süre tahminli, sana özel bir öğrenme yolu hazırlanır.'
                            : '4 quick questions · ~1 minute — get a personalized learning path with a time estimate.'}
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
                            <div className="flex items-center justify-between mb-3">
                                <p className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {lang === 'tr' ? '↑ Bir seçenek belirle:' : '↑ Choose an option:'}
                                </p>
                                {historyRef.current.length > 0 && (
                                    <button
                                        onClick={handleBack}
                                        data-testid="mentor-back-btn"
                                        className={`text-xs font-bold rounded-lg px-2.5 py-1 transition-colors ${
                                            darkMode
                                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {dialog.back}
                                    </button>
                                )}
                            </div>
                            {currentOptions.map(opt => (
                                <OptionButton
                                    key={opt.id}
                                    option={opt}
                                    onClick={handleOption}
                                    darkMode={darkMode}
                                    disabled={isTyping}
                                    badge={
                                        // Plan §2.2: sıfırdan başlayana dil sorusunda "Kararsızım"
                                        // default vurgulu gösterilir — mentor önerisine yönlendirir
                                        step === MENTOR_STEPS.STEP_LANG && answers.level === 'zero' && opt.id === 'LANG_UNDECIDED'
                                            ? dialog.recommendedBadge
                                            : null
                                    }
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
                {isComplete && resolvedMap && (
                    <MindMapView
                        mapData={resolvedMap}
                        lang={lang}
                        darkMode={darkMode}
                        dialog={dialog}
                        onRestart={handleRestart}
                        progress={progress}
                        certificateId={certificateId}
                        weeklyHours={answers?.weeklyHours || null}
                        completedSet={completedSet}
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
