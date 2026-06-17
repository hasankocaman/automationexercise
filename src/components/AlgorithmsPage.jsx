import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import TopicHeader from './TopicHeader'
import { useLanguage } from '../context/LanguageContext'
import { beginnerAlgorithmsData } from '../data/beginnerAlgorithmsData'

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
            <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #22c55e, #06b6d4, #f59e0b)' }} />
        </div>
    )
}

function useDarkModeState() {
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

    return [darkMode, setDarkMode]
}

function StepPill({ children, color }) {
    return (
        <div className="flex min-h-12 items-center justify-center rounded-lg border px-3 py-2 text-center text-sm font-black text-white shadow-lg" style={{ background: color, borderColor: `${color}aa` }}>
            {children}
        </div>
    )
}

function Arrow() {
    return <div className="hidden items-center justify-center text-2xl font-black text-slate-400 md:flex">→</div>
}

function ConceptVisual({ lesson, labels, darkMode }) {
    const color = lesson.color
    const visual = labels.visual
    const boxClass = darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'

    if (lesson.visual === 'recipe') {
        return (
            <div className="grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr]">
                <StepPill color={color}>{visual.ingredient}</StepPill>
                <Arrow />
                <StepPill color="#06b6d4">{visual.order}</StepPill>
                <Arrow />
                <StepPill color="#10b981">{visual.result}</StepPill>
            </div>
        )
    }

    if (lesson.visual === 'machine') {
        return (
            <div className="grid gap-3 md:grid-cols-[1fr_1.2fr_1fr] md:items-center">
                <StepPill color="#06b6d4">Input</StepPill>
                <div className={`relative overflow-hidden rounded-lg border p-4 text-center ${boxClass}`}>
                    <div className="absolute inset-y-0 left-0 w-1/3 animate-pulse bg-cyan-400/10" />
                    <div className="relative text-3xl">⚙️</div>
                    <div className="relative mt-2 text-sm font-black">{visual.process}</div>
                </div>
                <StepPill color="#10b981">Output</StepPill>
            </div>
        )
    }

    if (lesson.visual === 'decision') {
        return (
            <svg viewBox="0 0 520 220" className="h-auto w-full" role="img" aria-label="Decision flowchart">
                <rect x="28" y="78" width="120" height="56" rx="8" fill={color} />
                <text x="88" y="111" textAnchor="middle" fill="white" fontSize="15" fontWeight="800">{visual.weather}</text>
                <path d="M148 106 L220 106" stroke={darkMode ? '#94a3b8' : '#64748b'} strokeWidth="4" strokeLinecap="round" />
                <polygon points="260,50 340,106 260,162 180,106" fill={darkMode ? '#1e293b' : '#f8fafc'} stroke={color} strokeWidth="4" />
                <text x="260" y="111" textAnchor="middle" fill={darkMode ? '#f8fafc' : '#0f172a'} fontSize="14" fontWeight="800">{visual.rainy}</text>
                <path d="M340 106 L408 72" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                <path d="M340 106 L408 140" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <rect x="408" y="44" width="88" height="48" rx="8" fill="#10b981" />
                <rect x="408" y="116" width="88" height="48" rx="8" fill="#ef4444" />
                <text x="452" y="73" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">{visual.umbrella}</text>
                <text x="452" y="145" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">{visual.continue}</text>
            </svg>
        )
    }

    if (lesson.visual === 'loop') {
        return (
            <div className="flex flex-col items-center gap-3">
                <div className="relative h-40 w-40 rounded-full border-8 border-emerald-400/30">
                    <div className="absolute left-1/2 top-2 h-10 w-10 -translate-x-1/2 animate-bounce rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
                    <div className={`absolute inset-8 flex items-center justify-center rounded-full border text-center text-sm font-black ${boxClass}`}>{visual.repeat}</div>
                </div>
                <div className={`rounded-lg border px-3 py-2 text-xs font-bold ${boxClass}`}>{visual.repeatNote}</div>
            </div>
        )
    }

    if (lesson.visual === 'memory') {
        return (
            <div className="grid gap-3 md:grid-cols-3">
                {visual.memoryItems.map((item, index) => (
                    <div key={item} className={`rounded-lg border p-4 text-center ${boxClass}`}>
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg text-2xl font-black text-white" style={{ background: ['#3b82f6', '#10b981', '#f59e0b'][index] }}>
                            {index + 1}
                        </div>
                        <div className="text-sm font-black">{item}</div>
                        <div className="mt-1 text-xs opacity-70">{visual.memoryBox}</div>
                    </div>
                ))}
            </div>
        )
    }

    if (lesson.visual === 'debug') {
        return (
            <div className="grid gap-3 md:grid-cols-3">
                {visual.debugItems.map((item, index) => (
                    <div key={item} className={`rounded-lg border p-4 ${boxClass}`}>
                        <div className="text-2xl">{index === 0 ? '🔎' : index === 1 ? '🔀' : '✅'}</div>
                        <div className="mt-2 text-sm font-black">{item}</div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr]">
            <StepPill color="#7c3aed">{visual.start}</StepPill>
            <Arrow />
            <StepPill color="#06b6d4">{visual.missingStep}</StepPill>
            <Arrow />
            <StepPill color="#10b981">{visual.finish}</StepPill>
        </div>
    )
}

function SequenceGame({ lesson, labels, darkMode }) {
    const [items, setItems] = useState(lesson.game.items)
    const [checked, setChecked] = useState(false)
    const [dragIndex, setDragIndex] = useState(null)
    const solved = items.every((item, index) => item.id === lesson.game.expected[index])

    useEffect(() => {
        setItems(lesson.game.items)
        setChecked(false)
        setDragIndex(null)
    }, [lesson])

    const reorder = (from, to) => {
        if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return
        const next = [...items]
        const [item] = next.splice(from, 1)
        next.splice(to, 0, item)
        setItems(next)
        setChecked(false)
    }

    const move = (index, direction) => reorder(index, index + direction)

    return (
        <div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={() => setDragIndex(index)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                            if (dragIndex !== null) reorder(dragIndex, index)
                            setDragIndex(null)
                        }}
                        onDragEnd={() => setDragIndex(null)}
                        className={`flex cursor-grab items-center gap-2 rounded-lg border p-3 transition active:cursor-grabbing ${dragIndex === index ? 'scale-[1.02] border-cyan-400 opacity-80' : ''} ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white" style={{ background: lesson.color }}>{index + 1}</div>
                        <div className="min-w-0 flex-1 text-sm font-bold">{item.text}</div>
                        <button onClick={() => move(index, -1)} disabled={index === 0} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveUp}</button>
                        <button onClick={() => move(index, 1)} disabled={index === items.length - 1} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveDown}</button>
                    </div>
                ))}
            </div>
            <GameResult checked={checked} solved={solved} success={lesson.game.success} labels={labels} onCheck={() => setChecked(true)} />
        </div>
    )
}

function MachineGame({ lesson, labels, darkMode }) {
    const [selected, setSelected] = useState(null)
    const picked = lesson.game.options.find(item => item.id === selected)

    return (
        <div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => setSelected(option.id)} className={`min-h-12 rounded-lg border px-3 text-sm font-black transition ${selected === option.id ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200' : darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {option.label}
                    </button>
                ))}
            </div>
            {picked && (
                <div className={`mt-3 rounded-lg border p-3 text-sm font-bold ${picked.valid ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}>
                    {labels.result}: {picked.output}
                </div>
            )}
        </div>
    )
}

function DecisionGame({ lesson, labels }) {
    const [selected, setSelected] = useState(lesson.game.options[0])

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => setSelected(option)} className={`min-h-10 rounded-lg px-3 text-sm font-black text-white transition ${selected.id === option.id ? 'scale-105 shadow-lg' : 'opacity-80'}`} style={{ background: lesson.color }}>
                        {option.label}
                    </button>
                ))}
            </div>
            <div className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm font-black text-amber-300">
                {labels.result}: {selected.output}
            </div>
        </div>
    )
}

function LoopGame({ lesson, labels }) {
    const [count, setCount] = useState(0)
    const total = lesson.game.total
    const done = count >= total

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-2xl">
                {Array.from({ length: total }).map((_, index) => (
                    <span key={index} className={`transition-all ${index < count ? 'scale-110 text-yellow-300' : 'text-slate-600'}`}>★</span>
                ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => setCount(Math.min(total, count + 1))} disabled={done} className="min-h-10 rounded-lg bg-emerald-600 px-4 text-sm font-black text-white disabled:opacity-40">{labels.play}</button>
                <button onClick={() => setCount(0)} className="min-h-10 rounded-lg bg-slate-700 px-4 text-sm font-black text-white">{labels.reset}</button>
            </div>
            {done && <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm font-black text-emerald-300">{lesson.game.success}</div>}
        </div>
    )
}

function MemoryGame({ lesson, labels }) {
    const [score, setScore] = useState(0)
    const done = score >= lesson.game.target

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 flex items-center gap-3">
                <div className="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-blue-400/50 bg-blue-500/10">
                    <div className="text-xs font-bold text-blue-300">score</div>
                    <div className="font-mono text-3xl font-black text-blue-200">{score}</div>
                </div>
                <button onClick={() => setScore(score + 1)} className="min-h-10 rounded-lg bg-blue-600 px-4 text-sm font-black text-white">+1</button>
                <button onClick={() => setScore(0)} className="min-h-10 rounded-lg bg-slate-700 px-4 text-sm font-black text-white">{labels.reset}</button>
            </div>
            {done && <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm font-black text-emerald-300">{lesson.game.success}</div>}
        </div>
    )
}

function DebugGame({ lesson, labels, darkMode }) {
    const [selected, setSelected] = useState('')
    const checked = Boolean(selected)
    const solved = selected === lesson.game.badStep

    return (
        <div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {lesson.game.items.map((item, index) => (
                    <button key={item.id} onClick={() => setSelected(item.id)} className={`min-h-14 rounded-lg border px-3 text-sm font-black transition ${selected === item.id ? 'border-rose-400 bg-rose-500/15 text-rose-200' : darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {index + 1}. {item.text}
                    </button>
                ))}
            </div>
            <GameResult checked={checked} solved={solved} success={lesson.game.success} labels={labels} />
        </div>
    )
}

function FlowchartGame({ lesson, labels }) {
    const [selected, setSelected] = useState(null)
    const picked = lesson.game.options.find(item => item.id === selected)

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr] md:items-center">
                <StepPill color="#7c3aed">{labels.visual.wakeUp}</StepPill>
                <Arrow />
                <div className="rounded-lg border-2 border-dashed border-cyan-400 p-3 text-center text-sm font-black text-cyan-300">{picked?.label || labels.visual.missing}</div>
                <Arrow />
                <StepPill color="#10b981">{labels.visual.goSchool}</StepPill>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => setSelected(option.id)} className="min-h-10 rounded-lg bg-violet-600 px-3 text-sm font-black text-white">{option.label}</button>
                ))}
            </div>
            {picked && (
                <div className={`mt-3 rounded-lg border p-3 text-sm font-black ${picked.valid ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}>
                    {picked.valid ? lesson.game.success : labels.wrong}
                </div>
            )}
        </div>
    )
}

function GameResult({ checked, solved, success, labels, onCheck }) {
    return (
        <div className="mt-3 flex flex-wrap items-center gap-3">
            {onCheck && (
                <button onClick={onCheck} className="min-h-10 rounded-lg bg-cyan-600 px-4 text-sm font-black text-white hover:bg-cyan-500">
                    {labels.check}
                </button>
            )}
            {checked && (
                <div className={`rounded-lg border px-3 py-2 text-sm font-black ${solved ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}>
                    {solved ? success : labels.wrong}
                </div>
            )}
        </div>
    )
}

function GameBlock({ lesson, labels, darkMode }) {
    const game = lesson.game
    const common = { lesson, labels, darkMode }

    return (
        <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
            <div className="mb-3 text-sm font-black" style={{ color: lesson.color }}>{game.title}</div>
            {game.type === 'sequence' && <SequenceGame {...common} />}
            {game.type === 'machine' && <MachineGame {...common} />}
            {game.type === 'decision' && <DecisionGame {...common} />}
            {game.type === 'loop' && <LoopGame {...common} />}
            {game.type === 'memory' && <MemoryGame {...common} />}
            {game.type === 'debug' && <DebugGame {...common} />}
            {game.type === 'flowchart' && <FlowchartGame {...common} />}
        </div>
    )
}

function LessonCard({ lesson, labels, darkMode }) {
    return (
        <section id={lesson.id} className="scroll-mt-24">
            <div className={`rounded-lg border p-4 shadow-xl md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900/90' : 'border-slate-200 bg-white'}`}>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex min-h-9 items-center rounded-lg px-3 text-xs font-black uppercase tracking-wide text-white" style={{ background: lesson.color }}>
                        {lesson.shortTitle}
                    </span>
                    <span className={`inline-flex min-h-9 items-center rounded-lg border px-3 text-xs font-black ${darkMode ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                        {labels.beginnerBadge}
                    </span>
                </div>

                <h2 className={`text-xl font-black leading-tight md:text-2xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{lesson.title}</h2>

                <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="grid gap-4">
                        <div className={`rounded-lg border-l-4 p-4 text-sm leading-relaxed ${darkMode ? 'bg-amber-500/10 text-amber-100' : 'bg-amber-50 text-amber-900'}`} style={{ borderColor: '#f59e0b' }}>
                            <div className="mb-1 text-xs font-black uppercase tracking-wide">{labels.lesson}</div>
                            {lesson.analogy}
                        </div>
                        <div className={`rounded-lg border p-4 text-sm leading-relaxed ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                            <div className="mb-1 text-xs font-black uppercase tracking-wide" style={{ color: lesson.color }}>{labels.why}</div>
                            {lesson.why}
                        </div>
                    </div>
                    <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}>
                        <ConceptVisual lesson={lesson} labels={labels} darkMode={darkMode} />
                    </div>
                </div>

                <div className="mt-5">
                    <div className="mb-3 text-xs font-black uppercase tracking-wide" style={{ color: lesson.color }}>{labels.tryIt}</div>
                    <GameBlock lesson={lesson} labels={labels} darkMode={darkMode} />
                </div>
            </div>
        </section>
    )
}

function AlgorithmsPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()
    const data = beginnerAlgorithmsData[language] || beginnerAlgorithmsData.tr
    const [activeId, setActiveId] = useState(data.lessons[0].id)
    const lessonIds = useMemo(() => data.lessons.map(lesson => lesson.id), [data.lessons])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: '-25% 0px -65% 0px' }
        )
        lessonIds.forEach(id => {
            const node = document.getElementById(id)
            if (node) observer.observe(node)
        })
        return () => observer.disconnect()
    }, [lessonIds])

    const navTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-emerald-50 via-white to-cyan-50 text-slate-900'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-7xl px-3 py-5 md:px-6 md:py-8">
                <section className={`overflow-hidden rounded-lg border p-4 shadow-xl md:p-7 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
                        <div>
                            <div className="inline-flex min-h-9 items-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-black uppercase tracking-wide text-emerald-300">
                                {data.hero.eyebrow}
                            </div>
                            <h1 className={`mt-4 text-3xl font-black leading-tight md:text-5xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.hero.title}</h1>
                            <p className={`mt-4 max-w-3xl text-base leading-relaxed md:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{data.hero.subtitle}</p>
                            <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{data.hero.intro}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link to="/advanced-algorithms" className="inline-flex min-h-11 items-center rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-4 text-sm font-black text-cyan-200 shadow-lg shadow-cyan-500/10 transition hover:scale-105 hover:bg-cyan-500/20">
                                    {data.hero.advancedLabel}
                                </Link>
                            </div>
                        </div>
                        <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="grid gap-3 md:grid-cols-[1fr_32px_1fr_32px_1fr]">
                                <StepPill color="#22c55e">{data.page.heroSteps.input}</StepPill>
                                <Arrow />
                                <StepPill color="#06b6d4">{data.page.heroSteps.process}</StepPill>
                                <Arrow />
                                <StepPill color="#f59e0b">{data.page.heroSteps.output}</StepPill>
                            </div>
                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700/40">
                                <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-5 lg:grid-cols-[245px_1fr]">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <nav className={`rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`} aria-label={data.page.navTitle}>
                            <div className={`mb-3 text-sm font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.navTitle}</div>
                            <div className="grid gap-2">
                                {data.lessons.map(lesson => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => navTo(lesson.id)}
                                        className={`min-h-10 rounded-lg border px-3 text-left text-sm font-bold transition-all ${activeId === lesson.id ? 'text-white' : darkMode ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'}`}
                                        style={activeId === lesson.id ? { background: lesson.color, borderColor: lesson.color } : {}}
                                    >
                                        {lesson.shortTitle}
                                    </button>
                                ))}
                            </div>
                            <Link to="/advanced-algorithms" className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3 text-sm font-black text-cyan-200 transition hover:scale-105">
                                {data.hero.advancedLabel}
                            </Link>
                        </nav>
                    </aside>

                    <div className="grid gap-6">
                        {data.lessons.map(lesson => (
                            <LessonCard key={lesson.id} lesson={lesson} labels={data.page} darkMode={darkMode} />
                        ))}

                        <section className={`rounded-lg border p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                            <h2 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.glossaryTitle}</h2>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                {data.glossary.map(item => (
                                    <div key={item.term} className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                                        <div className="text-sm font-black text-emerald-300">{item.term}</div>
                                        <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                            <Link to="/advanced-algorithms" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-cyan-600 px-4 text-sm font-black text-white transition hover:scale-105 hover:bg-cyan-500">
                                {data.page.advancedCta}
                            </Link>
                        </section>
                    </div>
                </div>
            </main>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={language === 'tr' ? 'Sayfanın başına dön' : 'Back to top'}
                className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-xl text-white shadow-lg shadow-emerald-600/30 transition hover:scale-110 hover:bg-emerald-500"
            >
                🏠
            </button>
        </div>
    )
}

export default AlgorithmsPage
