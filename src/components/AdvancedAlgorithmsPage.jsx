import { useEffect, useMemo, useRef, useState } from 'react'
import { algorithmsData } from '../data/algorithmsData'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

const accents = {
    violet: { main: '#7c3aed', soft: '#ede9fe', darkSoft: 'rgba(124, 58, 237, 0.16)' },
    emerald: { main: '#10b981', soft: '#d1fae5', darkSoft: 'rgba(16, 185, 129, 0.16)' },
    cyan: { main: '#0891b2', soft: '#cffafe', darkSoft: 'rgba(8, 145, 178, 0.16)' },
    blue: { main: '#3b82f6', soft: '#dbeafe', darkSoft: 'rgba(59, 130, 246, 0.16)' },
    amber: { main: '#f59e0b', soft: '#fef3c7', darkSoft: 'rgba(245, 158, 11, 0.16)' },
    rose: { main: '#e11d48', soft: '#ffe4e6', darkSoft: 'rgba(225, 29, 72, 0.16)' },
}

const cardColors = {
    red: '#ef4444',
    rose: '#e11d48',
    orange: '#f97316',
    amber: '#f59e0b',
    slate: '#64748b',
}

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
            <div
                className="h-full transition-[width] duration-100"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #10b981, #f59e0b)' }}
            />
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

function DifficultyBadge({ level }) {
    const config = {
        beginner: { label: 'Beginner', color: '#10b981' },
        intermediate: { label: 'Intermediate', color: '#f59e0b' },
        advanced: { label: 'Advanced', color: '#ef4444' },
    }
    const item = config[level] || config.beginner

    return (
        <span
            className="inline-flex min-h-9 items-center rounded-lg border px-3 text-xs font-bold"
            style={{ color: item.color, borderColor: `${item.color}55`, background: `${item.color}16` }}
        >
            {item.label}
        </span>
    )
}

function CodeBlock({ code, darkMode }) {
    const [copied, setCopied] = useState(false)
    const codeRef = useRef(null)
    const { language } = useLanguage()

    useEffect(() => {
        if (codeRef.current && window.Prism) window.Prism.highlightElement(codeRef.current)
    }, [code])

    const copy = () => {
        navigator.clipboard.writeText(code.trim())
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
    }

    return (
        <div className="relative mt-4 overflow-hidden rounded-lg border border-slate-700 bg-[#111827]">
            <div className="flex items-center justify-between border-b border-slate-700 px-3 py-2">
                <span className="font-mono text-xs font-semibold text-slate-400">Java</span>
                <button
                    onClick={copy}
                    className={`min-h-9 rounded-lg px-3 text-xs font-bold transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
                >
                    {copied ? (language === 'tr' ? 'Kopyalandi' : 'Copied') : (language === 'tr' ? 'Kopyala' : 'Copy')}
                </button>
            </div>
            <pre className={`overflow-x-auto p-4 text-xs leading-relaxed ${darkMode ? 'text-slate-100' : 'text-slate-100'}`}>
                <code ref={codeRef} className="language-java">{code.trim()}</code>
            </pre>
        </div>
    )
}

function CompletionToggle({ id, label, doneLabel }) {
    const storageKey = 'qa-platform-completed'
    const topicId = `algorithms-${id}`
    const [done, setDone] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || '[]').includes(topicId)
        } catch {
            return false
        }
    })

    const toggle = () => {
        let saved = []
        try {
            saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
        } catch {
            saved = []
        }
        const updated = done ? saved.filter(item => item !== topicId) : [...new Set([...saved, topicId])]
        localStorage.setItem(storageKey, JSON.stringify(updated))
        setDone(!done)
    }

    return (
        <label className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 text-xs font-bold text-emerald-300">
            <input type="checkbox" checked={done} onChange={toggle} className="h-4 w-4 accent-emerald-500" />
            <span>{done ? doneLabel : label}</span>
        </label>
    )
}

function QuizCard({ quiz, labels, darkMode }) {
    const [selected, setSelected] = useState('')
    const [checked, setChecked] = useState(false)
    const correct = checked && selected === quiz.correct
    const incorrect = checked && selected && selected !== quiz.correct

    useEffect(() => {
        setSelected('')
        setChecked(false)
    }, [quiz])

    return (
        <div className={`mt-5 rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
            <div className="mb-3 text-sm font-bold">{labels.quizTitle}</div>
            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{quiz.question}</p>
            <div className="mt-3 grid gap-2">
                {quiz.options.map(option => {
                    const isPicked = selected === option.id
                    return (
                        <button
                            key={option.id}
                            onClick={() => {
                                setSelected(option.id)
                                setChecked(false)
                            }}
                            className={`min-h-10 rounded-lg border px-3 text-left text-sm transition-all ${isPicked
                                ? 'border-violet-500 bg-violet-500/15 text-violet-200'
                                : darkMode ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                            }`}
                        >
                            <span className="font-mono text-xs font-bold">{option.id.toUpperCase()}.</span> {option.text}
                        </button>
                    )
                })}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                    onClick={() => selected && setChecked(true)}
                    disabled={!selected}
                    className="min-h-9 rounded-lg bg-violet-600 px-4 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {labels.answer}
                </button>
                {correct && <span className="text-sm font-bold text-emerald-400">{labels.correct}: {quiz.explanation}</span>}
                {incorrect && <span className="text-sm font-bold text-amber-400">{quiz.explanation}</span>}
            </div>
        </div>
    )
}

function FlowVisual({ data, darkMode }) {
    return (
        <div className="grid gap-3 md:grid-cols-3">
            {data.principles.map((item, index) => (
                <div
                    key={item.label}
                    className={`relative min-h-[130px] overflow-hidden rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
                >
                    <div
                        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20"
                        style={{ background: ['#7c3aed', '#10b981', '#f59e0b'][index] }}
                    />
                    <div className="relative z-10 text-xs font-bold uppercase tracking-wide text-slate-400">0{index + 1}</div>
                    <div className={`relative z-10 mt-2 text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
                    <p className={`relative z-10 mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.text}</p>
                </div>
            ))}
        </div>
    )
}

function SortLab({ section, labels, darkMode }) {
    const [items, setItems] = useState(section.lab.items)
    const [draggedId, setDraggedId] = useState(null)
    const expected = section.lab.expectedOrder
    const correctCount = items.filter((item, index) => expected[index] === item.id).length
    const solved = correctCount === expected.length

    useEffect(() => {
        setItems(section.lab.items)
        setDraggedId(null)
    }, [section.lab.items])

    const moveTo = (fromId, targetId) => {
        if (!fromId || fromId === targetId) return
        const next = [...items]
        const fromIndex = next.findIndex(item => item.id === fromId)
        const targetIndex = next.findIndex(item => item.id === targetId)
        if (fromIndex < 0 || targetIndex < 0) return
        const [moved] = next.splice(fromIndex, 1)
        next.splice(targetIndex, 0, moved)
        setItems(next)
    }

    const nudge = (id, direction) => {
        const index = items.findIndex(item => item.id === id)
        const target = index + direction
        if (index < 0 || target < 0 || target >= items.length) return
        const next = [...items]
        const [moved] = next.splice(index, 1)
        next.splice(target, 0, moved)
        setItems(next)
    }

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <button
                    onClick={() => setItems(section.lab.items)}
                    className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                    {labels.reset}
                </button>
            </div>
            <div className="grid gap-2">
                {items.map((item, index) => {
                    const isCorrect = expected[index] === item.id
                    return (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={() => setDraggedId(item.id)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => moveTo(draggedId, item.id)}
                            className={`group rounded-lg border p-3 transition-all ${isCorrect ? 'border-emerald-500/60' : darkMode ? 'border-slate-700' : 'border-slate-200'} ${draggedId === item.id ? 'scale-[0.98] opacity-70' : 'hover:-translate-y-0.5'} ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
                            style={{ boxShadow: isCorrect ? `0 0 0 1px ${cardColors[item.color]}33` : 'none' }}
                            data-testid={`algorithm-sort-card-${item.id}`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-black text-white"
                                    style={{ background: cardColors[item.color] || '#64748b' }}
                                >
                                    {item.score}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{index + 1}. {item.title}</div>
                                    <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.meta}</div>
                                </div>
                                <div className="flex flex-shrink-0 gap-1">
                                    <button onClick={() => nudge(item.id, -1)} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30" disabled={index === 0}>{labels.moveUp}</button>
                                    <button onClick={() => nudge(item.id, 1)} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30" disabled={index === items.length - 1}>{labels.moveDown}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={`mt-3 rounded-lg border px-3 py-2 text-sm font-bold ${solved ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}>
                {solved ? section.lab.success : `${correctCount}/${expected.length} ${labels.correct}. ${section.lab.hint}`}
            </div>
        </div>
    )
}

function BinarySearchLab({ section, labels, darkMode }) {
    const commits = section.lab.items
    const target = section.lab.targetIndex
    const [range, setRange] = useState({ low: 0, high: commits.length - 1 })
    const [probe, setProbe] = useState(null)
    const [history, setHistory] = useState([])
    const found = range.low === range.high

    const reset = () => {
        setRange({ low: 0, high: commits.length - 1 })
        setProbe(null)
        setHistory([])
    }

    useEffect(reset, [section])

    const step = () => {
        if (found) return
        const mid = Math.floor((range.low + range.high) / 2)
        const fails = mid >= target
        const nextRange = fails ? { low: range.low, high: mid } : { low: mid + 1, high: range.high }
        setProbe(mid)
        setHistory(prev => [...prev, { label: commits[mid], result: fails ? 'FAIL' : 'PASS', removed: fails ? 'right' : 'left' }])
        setRange(nextRange)
    }

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={step} disabled={found} className="min-h-9 rounded-lg bg-cyan-600 px-3 text-xs font-bold text-white hover:bg-cyan-500 disabled:opacity-40">
                        {found ? labels.done : labels.run}
                    </button>
                    <button onClick={reset} className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {labels.reset}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-2 md:grid-cols-12">
                {commits.map((commit, index) => {
                    const active = index >= range.low && index <= range.high
                    const isProbe = probe === index
                    const isTarget = found && index === target
                    return (
                        <div
                            key={commit}
                            className={`rounded-lg border px-2 py-3 text-center font-mono text-xs font-black transition-all ${active ? 'scale-100 opacity-100' : 'scale-95 opacity-30'} ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
                            style={{
                                borderColor: isTarget ? '#10b981' : isProbe ? '#f59e0b' : active ? '#0891b2' : '#64748b',
                                color: isTarget ? '#10b981' : isProbe ? '#f59e0b' : active ? '#38bdf8' : '#94a3b8',
                            }}
                        >
                            {commit}
                        </div>
                    )
                })}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1.2fr]">
                <div className={`rounded-lg border p-3 text-sm ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <div className="font-bold">low={commits[range.low]} / high={commits[range.high]}</div>
                    <div className="mt-2 h-2 rounded-full bg-slate-700">
                        <div
                            className="h-2 rounded-full bg-cyan-500 transition-all"
                            style={{ marginLeft: `${(range.low / (commits.length - 1)) * 100}%`, width: `${((range.high - range.low + 1) / commits.length) * 100}%` }}
                        />
                    </div>
                </div>
                <div className={`rounded-lg border p-3 text-xs ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                    {history.length === 0 ? section.lab.prompt : history.map((item, index) => (
                        <div key={`${item.label}-${index}`} className="mb-1 font-mono">
                            {item.label}{' -> '}<span className={item.result === 'FAIL' ? 'text-rose-400' : 'text-emerald-400'}>{item.result}</span>
                        </div>
                    ))}
                    {found && <div className="mt-2 font-bold text-emerald-400">{section.lab.success}</div>}
                </div>
            </div>
        </div>
    )
}

function GraphLab({ section, labels, darkMode }) {
    const [stepIndex, setStepIndex] = useState(-1)
    const [running, setRunning] = useState(false)
    const timersRef = useRef([])
    const order = section.lab.order
    const visited = order.slice(0, stepIndex + 1)
    const queue = order.slice(stepIndex + 1, stepIndex + 4)
    const done = stepIndex >= order.length - 1

    const clearTimers = () => {
        timersRef.current.forEach(clearTimeout)
        timersRef.current = []
    }

    const reset = () => {
        clearTimers()
        setStepIndex(-1)
        setRunning(false)
    }

    useEffect(() => clearTimers, [])
    useEffect(reset, [section])

    const run = () => {
        reset()
        setRunning(true)
        section.lab.order.forEach((_, index) => {
            const timer = setTimeout(() => {
                setStepIndex(index)
                if (index === section.lab.order.length - 1) setRunning(false)
            }, 450 * (index + 1))
            timersRef.current.push(timer)
        })
    }

    const nodeById = useMemo(() => Object.fromEntries(section.lab.nodes.map(node => [node.id, node])), [section.lab.nodes])

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={run} disabled={running} className="min-h-9 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white hover:bg-blue-500 disabled:opacity-40">
                        {done ? labels.again : labels.run}
                    </button>
                    <button onClick={reset} className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                        {labels.reset}
                    </button>
                </div>
            </div>
            <div className={`rounded-lg border p-2 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-white'}`}>
                <svg viewBox="0 0 430 310" className="h-auto w-full" role="img" aria-label="Checkout graph traversal">
                    {section.lab.edges.map(([from, to]) => {
                        const a = nodeById[from]
                        const b = nodeById[to]
                        const active = visited.includes(from) && visited.includes(to)
                        return (
                            <line
                                key={`${from}-${to}`}
                                x1={a.x}
                                y1={a.y}
                                x2={b.x}
                                y2={b.y}
                                stroke={active ? '#10b981' : darkMode ? '#475569' : '#cbd5e1'}
                                strokeWidth={active ? 4 : 2}
                                strokeLinecap="round"
                            />
                        )
                    })}
                    {section.lab.nodes.map(node => {
                        const active = visited.includes(node.id)
                        const current = visited[visited.length - 1] === node.id
                        return (
                            <g key={node.id}>
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={current ? 32 : 27}
                                    fill={active ? '#10b981' : darkMode ? '#1e293b' : '#f8fafc'}
                                    stroke={current ? '#f59e0b' : active ? '#34d399' : '#64748b'}
                                    strokeWidth={current ? 5 : 2}
                                    className={current ? 'animate-pulse' : ''}
                                />
                                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-current text-[11px] font-bold" style={{ color: active ? '#fff' : darkMode ? '#cbd5e1' : '#334155' }}>
                                    {node.id}
                                </text>
                            </g>
                        )
                    })}
                </svg>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className={`rounded-lg border p-3 text-xs ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <div className="mb-2 font-bold">Visited</div>
                    <div className="flex flex-wrap gap-2">{visited.length ? visited.map(item => <span key={item} className="rounded-lg bg-emerald-500/15 px-2 py-1 font-mono text-emerald-300">{item}</span>) : '-'}</div>
                </div>
                <div className={`rounded-lg border p-3 text-xs ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <div className="mb-2 font-bold">Queue</div>
                    <div className="flex flex-wrap gap-2">{queue.length ? queue.map(item => <span key={item} className="rounded-lg bg-blue-500/15 px-2 py-1 font-mono text-blue-300">{item}</span>) : '-'}</div>
                </div>
            </div>
            {done && <div className="mt-3 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm font-bold text-emerald-300">{section.lab.success}</div>}
        </div>
    )
}

function StateMachineLab({ section, labels, darkMode }) {
    const [current, setCurrent] = useState(section.lab.states[0])
    const [completed, setCompleted] = useState([])
    const [message, setMessage] = useState(section.lab.prompt)
    const requiredOrder = section.lab.events.map(event => event.id)
    const done = current === section.lab.states[section.lab.states.length - 1]

    const reset = () => {
        setCurrent(section.lab.states[0])
        setCompleted([])
        setMessage(section.lab.prompt)
    }

    useEffect(reset, [section])

    const fireEvent = (event) => {
        const expected = requiredOrder[completed.length]
        if (event.id !== expected || event.from !== current) {
            setMessage(event.message || 'Invalid transition')
            return
        }
        setCurrent(event.to)
        setCompleted(prev => [...prev, event.id])
        setMessage(event.to === 'submitted' ? section.lab.success : `${event.label} -> ${event.to}`)
    }

    const allEvents = [...section.lab.events, ...section.lab.traps]

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
                </div>
                <button onClick={reset} className={`min-h-9 rounded-lg border px-3 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                    {labels.reset}
                </button>
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {section.lab.states.map((state, index) => {
                        const active = current === state
                        const passed = section.lab.states.indexOf(current) > index
                        return (
                            <div
                                key={state}
                                className={`rounded-lg border p-3 text-center transition-all ${active ? 'scale-105 border-amber-400 bg-amber-500/15' : passed ? 'border-emerald-500/50 bg-emerald-500/10' : darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}
                            >
                                <div className={`text-xs font-bold uppercase ${active ? 'text-amber-300' : passed ? 'text-emerald-300' : darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{state}</div>
                            </div>
                        )
                    })}
                </div>
                <div className={`rounded-lg border p-3 text-sm font-bold ${done ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}>
                    {message}
                </div>
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
                {allEvents.map(event => (
                    <button
                        key={event.id}
                        onClick={() => fireEvent(event)}
                        className={`min-h-10 rounded-lg border px-3 text-left text-xs font-bold transition-all ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-amber-500' : 'border-slate-200 bg-white text-slate-700 hover:border-amber-500'}`}
                    >
                        {event.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

function ComplexityLab({ section, darkMode }) {
    const [n, setN] = useState(section.lab.defaultValue)
    const ops = [
        { label: 'O(1)', value: 1, color: '#10b981' },
        { label: 'O(log n)', value: Math.ceil(Math.log2(n)), color: '#3b82f6' },
        { label: 'O(n)', value: n, color: '#f59e0b' },
        { label: 'O(n^2)', value: n * n, color: '#ef4444' },
    ]
    const maxLog = Math.log10(n * n + 1)

    return (
        <div>
            <div className="mb-3">
                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{section.lab.title}</div>
                <p className={`mt-1 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{section.lab.prompt}</p>
            </div>
            <label className={`block rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                    <span>n</span>
                    <span className="font-mono">{n}</span>
                </div>
                <input
                    type="range"
                    min={section.lab.min}
                    max={section.lab.max}
                    value={n}
                    onChange={(event) => setN(Number(event.target.value))}
                    className="w-full accent-rose-600"
                />
            </label>
            <div className="mt-4 grid gap-3">
                {ops.map(item => {
                    const width = Math.max(8, (Math.log10(item.value + 1) / maxLog) * 100)
                    return (
                        <div key={item.label} className={`rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                            <div className="mb-2 flex items-center justify-between text-xs font-bold">
                                <span style={{ color: item.color }}>{item.label}</span>
                                <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{item.value.toLocaleString()} ops</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-700/60">
                                <div className="h-3 rounded-full transition-all duration-300" style={{ width: `${width}%`, background: item.color }} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-3 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm font-bold text-rose-300">{section.lab.success}</div>
        </div>
    )
}

function VisualLab({ section, labels, darkMode, data }) {
    if (section.visualKind === 'flow') return <FlowVisual data={data} darkMode={darkMode} />
    if (section.visualKind === 'sort') return <SortLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'binary') return <BinarySearchLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'graph') return <GraphLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'state') return <StateMachineLab section={section} labels={labels} darkMode={darkMode} />
    if (section.visualKind === 'complexity') return <ComplexityLab section={section} labels={labels} darkMode={darkMode} />
    return null
}

function SectionCard({ section, labels, darkMode, data }) {
    const accent = accents[section.accent] || accents.violet

    return (
        <section id={section.id} className="scroll-mt-24">
            <div className={`rounded-lg border p-4 shadow-xl md:p-6 ${darkMode ? 'border-slate-700 bg-slate-800/80' : 'border-slate-200 bg-white'}`}>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                        className="inline-flex min-h-9 items-center rounded-lg px-3 text-xs font-black uppercase tracking-wide text-white"
                        style={{ background: accent.main }}
                    >
                        {section.tag}
                    </span>
                    <DifficultyBadge level={section.difficulty} />
                    <CompletionToggle id={section.id} label={labels.markDone} doneLabel={labels.done} />
                </div>

                <h2 className={`text-xl font-black leading-tight md:text-2xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{section.title}</h2>

                <div
                    className="mt-4 rounded-lg border-l-4 p-4 text-sm leading-relaxed"
                    style={{ borderColor: '#f59e0b', background: darkMode ? 'rgba(245, 158, 11, 0.13)' : '#fef3c7', color: darkMode ? '#fde68a' : '#92400e' }}
                >
                    {section.analogy}
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid gap-3">
                        {[
                            [labels.algorithmIdea, section.definition],
                            [labels.qaUse, section.qaUse],
                            [labels.javaCompare, section.javaCompare],
                        ].map(([title, text]) => (
                            <div key={title} className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="text-xs font-black uppercase tracking-wide" style={{ color: accent.main }}>{title}</div>
                                <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{text}</p>
                            </div>
                        ))}
                    </div>
                    <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="text-xs font-black uppercase tracking-wide" style={{ color: accent.main }}>{labels.complexity}</div>
                        <div className="mt-3 grid gap-2">
                            {section.complexity.map(item => (
                                <div key={item} className={`rounded-lg px-3 py-2 text-sm font-bold ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-700'}`}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="mb-3 text-xs font-black uppercase tracking-wide" style={{ color: accent.main }}>{labels.visualTitle}</div>
                    <div
                        className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}`}
                        style={{ boxShadow: `0 0 0 1px ${accent.main}22, 0 18px 45px ${accent.main}10` }}
                    >
                        <VisualLab section={section} labels={labels} darkMode={darkMode} data={data} />
                    </div>
                </div>

                <CodeBlock code={section.code} darkMode={darkMode} />
                <QuizCard quiz={section.quiz} labels={labels} darkMode={darkMode} />
            </div>
        </section>
    )
}

function AdvancedAlgorithmsPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()
    const data = algorithmsData[language] || algorithmsData.tr
    const [activeId, setActiveId] = useState(data.sections[0].id)

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
        data.sections.forEach(section => {
            const node = document.getElementById(section.id)
            if (node) observer.observe(node)
        })
        return () => observer.disconnect()
    }, [data.sections])

    const navTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-900'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="mx-auto max-w-7xl px-3 py-5 md:px-6 md:py-8">
                <section className={`overflow-hidden rounded-lg border p-4 shadow-xl md:p-7 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-center">
                        <div>
                            <div className="inline-flex min-h-9 items-center rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 text-xs font-black uppercase tracking-wide text-violet-300">
                                {data.hero.eyebrow}
                            </div>
                            <h1 className={`mt-4 text-3xl font-black leading-tight md:text-4xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                                {data.hero.title}
                            </h1>
                            <p className={`mt-4 max-w-3xl text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                {data.hero.subtitle}
                            </p>
                            <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {data.hero.intro}
                            </p>
                        </div>
                        <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                            <FlowVisual data={data} darkMode={darkMode} />
                        </div>
                    </div>
                </section>

                <div className="mt-6 grid gap-5 lg:grid-cols-[250px_1fr]">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <nav className={`rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`} aria-label={data.page.navTitle}>
                            <div className={`mb-3 text-sm font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.navTitle}</div>
                            <div className="grid gap-2">
                                {data.sections.map(section => {
                                    const active = activeId === section.id
                                    const accent = accents[section.accent] || accents.violet
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => navTo(section.id)}
                                            className={`min-h-10 rounded-lg border px-3 text-left text-sm font-bold transition-all ${active ? 'text-white' : darkMode ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'}`}
                                            style={active ? { background: accent.main, borderColor: accent.main } : {}}
                                        >
                                            {section.shortTitle}
                                        </button>
                                    )
                                })}
                            </div>
                        </nav>
                    </aside>

                    <div className="grid gap-6">
                        {data.sections.map(section => (
                            <SectionCard key={section.id} section={section} labels={data.page} darkMode={darkMode} data={data} />
                        ))}

                        <section className={`rounded-lg border p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                            <h2 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.page.glossaryTitle}</h2>
                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                {data.glossary.map(item => (
                                    <div key={item.term} className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                                        <div className="text-sm font-black text-violet-300">{item.term}</div>
                                        <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.definition}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={language === 'tr' ? 'Sayfanin basina don' : 'Back to top'}
                className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-xl text-white shadow-lg shadow-violet-600/30 transition hover:scale-110 hover:bg-violet-500"
            >
                🏠
            </button>
        </div>
    )
}

export default AdvancedAlgorithmsPage
