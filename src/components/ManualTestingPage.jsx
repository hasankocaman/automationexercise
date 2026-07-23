import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import TopicHeader from './TopicHeader'
import VideoSceneBlock from './VideoSceneBlock'
import LessonFinishBadge from './LessonFinishBadge'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { manualTestingData } from '../data/manualTestingData'

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
            <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #0ea5e9, #22c55e, #f59e0b, #ef4444)' }} />
        </div>
    )
}

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

function FlowVisual({ labels, darkMode }) {
    const steps = [
        { key: 'observe', color: '#0ea5e9' },
        { key: 'compare', color: '#22c55e' },
        { key: 'report', color: '#f59e0b' },
        { key: 'retest', color: '#ef4444' },
    ]

    return (
        <div className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-white'}`}>
            <div className="grid gap-3 sm:grid-cols-4">
                {steps.map((step, index) => (
                    <div key={step.key} className="relative">
                        <div className="flex min-h-24 flex-col items-center justify-center rounded-lg border px-3 text-center shadow-lg" style={{ borderColor: `${step.color}66`, background: `${step.color}18` }}>
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black text-white" style={{ background: step.color }}>{index + 1}</div>
                            <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{labels.flow[step.key]}</div>
                        </div>
                        {index < steps.length - 1 && <div className="absolute -right-2 top-1/2 hidden h-1 w-4 -translate-y-1/2 rounded-full bg-slate-400 sm:block" />}
                    </div>
                ))}
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700/30">
                <div className="h-full w-3/4 animate-pulse rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-rose-400" />
            </div>
        </div>
    )
}

function ScenarioVisual({ lesson, darkMode }) {
    const panel = darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'

    if (lesson.id === 'mindset') {
        return (
            <div className={`rounded-lg border p-4 ${panel}`}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Happy path → Edge cases</div>
                <div className="grid gap-2">
                    {[
                        { label: 'Ödeme başarılı ✓', color: '#22c55e', delay: '0s', width: 'w-full' },
                        { label: 'Kupon süresi doldu?', color: '#f59e0b', delay: '0.3s', width: 'w-4/5' },
                        { label: 'Stok son anda bitti?', color: '#f97316', delay: '0.6s', width: 'w-3/5' },
                        { label: 'Kart reddedildi?', color: '#ef4444', delay: '0.9s', width: 'w-2/5' },
                    ].map((step) => (
                        <div key={step.label} className="flex items-center gap-2">
                            <div
                                className={`h-7 rounded-lg text-white text-[10px] font-black flex items-center px-2 transition-all ${step.width}`}
                                style={{ background: step.color, animationDelay: step.delay }}
                            >
                                {step.label}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`mt-3 text-[10px] opacity-60 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Manuel test happy path&apos;in ötesini görür
                </div>
            </div>
        )
    }

    if (lesson.id === 'test-case') {
        const steps = [
            { num: 'Pre', label: 'Kayıtlı kullanıcı hazır', color: '#7c3aed' },
            { num: '1', label: 'Login sayfasını aç', color: '#0891b2' },
            { num: '2', label: 'Email + şifre gir', color: '#0891b2' },
            { num: '3', label: 'Login butonuna bas', color: '#0891b2' },
            { num: 'Exp', label: 'Dashboard görünür', color: '#22c55e' },
        ]
        return (
            <div className={`rounded-lg border p-4 ${panel}`}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Precondition → Steps → Expected</div>
                <div className="grid gap-1.5">
                    {steps.map((s) => (
                        <div key={s.num} className="flex items-center gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-black text-white" style={{ background: s.color }}>{s.num}</div>
                            <div className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{s.label}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: '#0891b215' }}>
                    <div className="h-full rounded-full animate-pulse" style={{ width: '100%', background: 'linear-gradient(90deg,#7c3aed,#0891b2,#22c55e)' }} />
                </div>
            </div>
        )
    }

    if (lesson.id === 'exploratory') {
        return (
            <div className={`rounded-lg border p-4 ${panel}`}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Charter → Keşif → Not</div>
                <div className="relative h-40 overflow-hidden rounded-lg" style={{ background: darkMode ? '#0f172a' : '#f8fafc' }}>
                    {[
                        { left: '10%', top: '15%', size: 'h-8 w-8', color: '#7c3aed', label: '🎯', delay: '0s' },
                        { left: '55%', top: '10%', size: 'h-6 w-6', color: '#0891b2', label: '?', delay: '0.4s' },
                        { left: '30%', top: '55%', size: 'h-6 w-6', color: '#f59e0b', label: '!', delay: '0.8s' },
                        { left: '70%', top: '60%', size: 'h-5 w-5', color: '#ef4444', label: '🐛', delay: '1.2s' },
                        { left: '20%', top: '78%', size: 'h-5 w-5', color: '#22c55e', label: '✓', delay: '1.6s' },
                    ].map((node, i) => (
                        <div
                            key={i}
                            className={`absolute flex items-center justify-center rounded-full text-white text-xs font-black animate-bounce ${node.size}`}
                            style={{ left: node.left, top: node.top, background: node.color, animationDelay: node.delay, animationDuration: '2s' }}
                        >
                            {node.label}
                        </div>
                    ))}
                    <div className="absolute bottom-2 right-2 rounded bg-slate-700/60 px-2 py-1 text-[9px] text-slate-300 font-mono">
                        hipotez → gözlem → not
                    </div>
                </div>
            </div>
        )
    }

    if (lesson.id === 'regression') {
        const flows = [
            { label: 'Kupon fix', done: true, color: '#22c55e' },
            { label: 'Normal ödeme', done: true, color: '#22c55e' },
            { label: 'Havale', done: true, color: '#22c55e' },
            { label: 'İade', done: false, color: '#ef4444' },
            { label: 'Sipariş maili', done: false, color: '#f59e0b' },
        ]
        return (
            <div className={`rounded-lg border p-4 ${panel}`}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">Smoke Test — Etkilenen Akışlar</div>
                <div className="grid gap-1.5">
                    {flows.map((f) => (
                        <div key={f.label} className="flex items-center gap-2">
                            <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: f.color }} />
                            <div className={`text-xs font-bold flex-1 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{f.label}</div>
                            <div className="text-[10px] font-black" style={{ color: f.color }}>
                                {f.done ? '✓ PASS' : '— bekliyor'}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`mt-3 text-[10px] opacity-60 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Yeni fix → tüm ilgili akışlar kontrol edilir
                </div>
            </div>
        )
    }

    if (lesson.id === 'bug-report') {
        return (
            <div className={`rounded-lg border p-4 ${panel}`}>
                <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
                    <div className="rounded-lg border border-rose-400/40 bg-rose-500/10 p-3">
                        <div className={`text-xs font-black ${darkMode ? 'text-rose-300' : 'text-rose-700'}`}>Actual</div>
                        <div className="mt-2 h-28 rounded-lg border border-rose-400/50 bg-slate-950 p-3">
                            <div className="mx-auto mt-8 h-8 w-8 animate-spin rounded-full border-4 border-rose-300 border-t-transparent" />
                        </div>
                    </div>
                    <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-3">
                        <div className={`text-xs font-black ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>Evidence</div>
                        <div className="mt-2 space-y-2 font-mono text-xs">
                            <div>device: Pixel 8</div>
                            <div>version: 2.8.1</div>
                            <div>steps: cart - pay - blank</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (lesson.id === 'severity') {
        return (
            <div className={`rounded-lg border p-4 ${panel}`}>
                <div className="grid gap-3 md:grid-cols-3">
                    {['Critical', 'Major', 'Minor'].map((title, index) => (
                        <div key={title} className="min-h-24 rounded-lg border p-3 text-center" style={{ borderColor: ['#ef444466', '#f59e0b66', '#22c55e66'][index], background: ['#ef444418', '#f59e0b18', '#22c55e18'][index] }}>
                            <div className="text-sm font-black">{title}</div>
                            <div className="mt-3 h-2 animate-pulse rounded-full" style={{ background: ['#ef4444', '#f59e0b', '#22c55e'][index] }} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={`rounded-lg border p-4 ${panel}`}>
            <div className="relative mx-auto max-w-md rounded-lg border border-sky-400/40 bg-sky-500/10 p-4">
                <div className="grid gap-3">
                    <div className="h-3 w-1/2 rounded-full bg-sky-300/70" />
                    <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 rounded-lg bg-emerald-400/30" />
                        <div className="h-16 rounded-lg bg-amber-400/30" />
                        <div className="h-16 rounded-lg bg-rose-400/30" />
                    </div>
                    <div className="h-10 rounded-lg bg-sky-500 shadow-lg shadow-sky-500/30" />
                </div>
                <div className="absolute right-4 top-4 h-4 w-4 animate-ping rounded-full bg-rose-400" />
            </div>
        </div>
    )
}

function Result({ show, solved, success, labels, darkMode }) {
    if (!show) return null
    return (
        <div className={`mt-3 rounded-lg border px-3 py-2 text-sm font-black ${solved ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-amber-500/40 bg-amber-500/10 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}`}>
            {solved ? success : labels.wrong}
        </div>
    )
}

function ChecklistGame({ lesson, labels, onComplete, darkMode }) {
    const [selected, setSelected] = useState([])
    const [checked, setChecked] = useState(false)
    const required = lesson.game.required
    const solved = selected.length === required.length && required.every(id => selected.includes(id))

    useEffect(() => {
        if (checked && solved) onComplete()
    }, [checked, solved])

    const toggle = (id) => {
        setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
        setChecked(false)
    }

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => toggle(option.id)} className={`min-h-12 rounded-lg border px-3 text-left text-sm font-bold transition ${selected.includes(option.id) ? (darkMode ? 'border-sky-400 bg-sky-500/15 text-sky-200' : 'border-sky-500 bg-sky-100 text-sky-800') : (darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')}`}>
                        {option.label}
                    </button>
                ))}
            </div>
            <button onClick={() => setChecked(true)} className="mt-3 min-h-10 rounded-lg bg-sky-600 px-4 text-sm font-black text-white">{labels.check}</button>
            <Result show={checked} solved={solved} success={lesson.game.success} labels={labels} darkMode={darkMode} />
        </div>
    )
}

function SequenceGame({ lesson, labels, onComplete, darkMode }) {
    const [items, setItems] = useState(lesson.game.items)
    const [dragIndex, setDragIndex] = useState(null)
    const [checked, setChecked] = useState(false)
    const solved = items.every((item, index) => item.id === lesson.game.expected[index])

    useEffect(() => {
        setItems(lesson.game.items)
        setChecked(false)
    }, [lesson])

    useEffect(() => {
        if (checked && solved) onComplete()
    }, [checked, solved])

    const reorder = (from, to) => {
        if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return
        const next = [...items]
        const [item] = next.splice(from, 1)
        next.splice(to, 0, item)
        setItems(next)
        setChecked(false)
    }

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
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
                        className={`flex cursor-grab items-center gap-2 rounded-lg border p-3 transition active:cursor-grabbing ${dragIndex === index ? 'scale-[1.02] border-emerald-400 opacity-80' : ''} ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white" style={{ background: lesson.color }}>{index + 1}</div>
                        <div className="min-w-0 flex-1 text-sm font-bold">{item.text}</div>
                        <button onClick={() => reorder(index, index - 1)} disabled={index === 0} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveUp}</button>
                        <button onClick={() => reorder(index, index + 1)} disabled={index === items.length - 1} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveDown}</button>
                    </div>
                ))}
            </div>
            <button onClick={() => setChecked(true)} className="mt-3 min-h-10 rounded-lg bg-emerald-600 px-4 text-sm font-black text-white">{labels.check}</button>
            <Result show={checked} solved={solved} success={lesson.game.success} labels={labels} darkMode={darkMode} />
        </div>
    )
}

function ChoiceGame({ lesson, labels, onComplete, darkMode }) {
    const [selected, setSelected] = useState(null)
    const picked = lesson.game.options.find(option => option.id === selected)
    const solved = selected === lesson.game.correct

    useEffect(() => {
        if (solved) onComplete()
    }, [solved])

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className="mt-3 grid gap-2">
                {lesson.game.options.map(option => (
                    <button key={option.id} onClick={() => setSelected(option.id)} className={`min-h-12 rounded-lg border px-3 text-left text-sm font-bold transition ${selected === option.id ? (darkMode ? 'border-amber-400 bg-amber-500/15 text-amber-200' : 'border-amber-500 bg-amber-100 text-amber-900') : (darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')}`}>
                        {option.label}
                    </button>
                ))}
            </div>
            {picked && (
                <div className={`mt-3 rounded-lg border p-3 text-sm font-bold ${solved ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-amber-500/40 bg-amber-500/10 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}`}>
                    {picked.output || (solved ? lesson.game.success : labels.wrong)}
                </div>
            )}
        </div>
    )
}

function SeverityGame({ lesson, labels, onComplete, darkMode }) {
    const [assignments, setAssignments] = useState({})
    const [dragId, setDragId] = useState(null)
    const columns = ['critical', 'major', 'minor']
    const solved = lesson.game.cards.every(card => assignments[card.id] === card.severity)

    useEffect(() => {
        if (solved) onComplete()
    }, [solved])

    const assign = (cardId, column) => setAssignments(current => ({ ...current, [cardId]: column }))
    const cardsFor = (column) => lesson.game.cards.filter(card => (assignments[card.id] || 'backlog') === column)

    return (
        <div>
            <p className="text-sm opacity-80">{lesson.game.prompt}</p>
            <div className={`mt-3 rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-750'}`}>
                <div className="mb-2 text-xs font-black text-slate-400">Backlog</div>
                <div className="grid gap-2 md:grid-cols-3">
                    {cardsFor('backlog').map(card => (
                        <DefectCard key={card.id} card={card} labels={labels} onDragStart={setDragId} onAssign={assign} darkMode={darkMode} />
                    ))}
                </div>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
                {columns.map(column => (
                    <div
                        key={column}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                            if (dragId) assign(dragId, column)
                            setDragId(null)
                        }}
                        className={`min-h-36 rounded-lg border border-dashed p-3 ${darkMode ? 'border-slate-600 bg-slate-950/70 text-slate-200' : 'border-slate-300 bg-slate-50 text-slate-750'}`}
                    >
                        <div className={`mb-2 text-sm font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{labels.columns[column]}</div>
                        <div className="grid gap-2">
                            {cardsFor(column).map(card => (
                                <DefectCard key={card.id} card={card} labels={labels} onDragStart={setDragId} onAssign={assign} darkMode={darkMode} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {solved && <div className={`mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm font-black ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{lesson.game.success}</div>}
        </div>
    )
}

function DefectCard({ card, labels, onDragStart, onAssign, darkMode }) {
    return (
        <div draggable onDragStart={() => onDragStart(card.id)} className={`cursor-grab rounded-lg border p-3 text-sm font-bold active:cursor-grabbing transition ${darkMode ? 'border-violet-400/40 bg-violet-500/10 text-violet-200' : 'border-violet-200 bg-violet-50 text-violet-850'}`}>
            <div>{card.label}</div>
            <div className="mt-2 flex flex-wrap gap-1">
                {Object.keys(labels.columns).map(column => (
                    <button key={column} onClick={() => onAssign(card.id, column)} className={`min-h-8 rounded-md px-2 text-[11px] font-black transition ${darkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                        {labels.columns[column]}
                    </button>
                ))}
            </div>
        </div>
    )
}

function DragDropChallenge({ lesson, labels, darkMode }) {
    const [items, setItems] = useState(lesson.dragDrop.items)
    const [dragIndex, setDragIndex] = useState(null)
    const [checked, setChecked] = useState(false)
    const solved = items.every((item, index) => item.id === lesson.dragDrop.expected[index])

    useEffect(() => {
        setItems(lesson.dragDrop.items)
        setChecked(false)
    }, [lesson])

    const reorder = (from, to) => {
        if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return
        const next = [...items]
        const [item] = next.splice(from, 1)
        next.splice(to, 0, item)
        setItems(next)
        setChecked(false)
    }

    return (
        <div className={`rounded-lg border p-4 transition-all duration-300 ${darkMode ? 'border-violet-500/30 bg-violet-950/20 text-slate-200' : 'border-violet-200 bg-violet-50/60 text-slate-800'}`}>
            <div className="mb-3 text-sm font-black text-violet-500">{labels.dragDropTitle}</div>
            <div className="mb-2 text-xs font-black opacity-70">{lesson.dragDrop.title}</div>
            <p className="text-sm opacity-80">{lesson.dragDrop.prompt}</p>
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
                        className={`flex cursor-grab items-center gap-2 rounded-lg border p-3 transition active:cursor-grabbing ${dragIndex === index ? 'scale-[1.02] border-violet-400 opacity-80' : ''} ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500 text-sm font-black text-white">{index + 1}</div>
                        <div className="min-w-0 flex-1 text-sm font-bold">{item.text}</div>
                        <button onClick={() => reorder(index, index - 1)} disabled={index === 0} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveUp}</button>
                        <button onClick={() => reorder(index, index + 1)} disabled={index === items.length - 1} className="min-h-9 rounded-lg bg-slate-700 px-2 text-xs font-bold text-white disabled:opacity-30">{labels.moveDown}</button>
                    </div>
                ))}
            </div>
            <button onClick={() => setChecked(true)} className="mt-3 min-h-10 rounded-lg bg-violet-600 px-4 text-sm font-black text-white">{labels.check}</button>
            <Result show={checked} solved={solved} success={lesson.dragDrop.success} labels={labels} darkMode={darkMode} />
        </div>
    )
}

function PracticeWorkspace({ lesson, labels, darkMode }) {
    const [text, setText] = useState('')
    const [checked, setChecked] = useState(false)

    const normalize = (str) => {
        return str
            .toLowerCase()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
    }

    const keywordMatches = useMemo(() => {
        const normText = normalize(text)
        return lesson.practice.keywords.map(kw => {
            const normKw = normalize(kw)
            return {
                word: kw,
                matched: normText.includes(normKw)
            }
        })
    }, [text, lesson.practice.keywords])

    const matchCount = keywordMatches.filter(m => m.matched).length
    const scorePercentage = lesson.practice.keywords.length > 0 ? (matchCount / lesson.practice.keywords.length) * 100 : 0

    useEffect(() => {
        setText('')
        setChecked(false)
    }, [lesson])

    return (
        <div className={`rounded-lg border p-4 transition-all duration-300 ${darkMode ? 'border-emerald-500/30 bg-emerald-950/10 text-slate-200' : 'border-emerald-200 bg-emerald-50/50 text-slate-800'}`}>
            <div className="mb-2 text-sm font-black text-emerald-500">{labels.practiceTitle}</div>
            <p className="text-sm opacity-80">{lesson.practice.prompt}</p>

            <textarea
                value={text}
                onChange={(event) => {
                    setText(event.target.value)
                    setChecked(false)
                }}
                className={`mt-3 w-full min-h-[96px] rounded-lg border p-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${darkMode ? 'border-slate-700 bg-slate-950 text-slate-200 placeholder-slate-500' : 'border-slate-300 bg-white text-slate-800 placeholder-slate-400'}`}
                placeholder="..."
            />

            <div className="mt-3 flex flex-wrap gap-2">
                <button
                    onClick={() => setChecked(true)}
                    disabled={!text.trim()}
                    className="min-h-9 rounded-lg bg-emerald-600 px-4 text-xs font-black text-white transition hover:bg-emerald-500 disabled:opacity-50"
                >
                    {labels.practiceCheck}
                </button>
                <button
                    onClick={() => {
                        setText('')
                        setChecked(false)
                    }}
                    className={`min-h-9 rounded-lg px-4 text-xs font-black transition ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                    {labels.reset}
                </button>
            </div>

            {checked && (
                <div className="mt-4 space-y-3 border-t border-slate-700/30 pt-4">
                    <div>
                        <div className="text-xs font-black opacity-75">{labels.practiceKeywords}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {keywordMatches.map((item) => (
                                <span
                                    key={item.word}
                                    className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold border ${item.matched ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-500/10 border-slate-800 text-slate-400'}`}
                                >
                                    {item.word} {item.matched ? '✓' : '✗'}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={`rounded-lg border p-3 ${darkMode ? 'border-slate-850 bg-slate-900/60' : 'border-slate-200 bg-white'}`}>
                        <div className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">{labels.practiceModelLabel}</div>
                        <p className="mt-1.5 text-xs leading-relaxed font-medium">{lesson.practice.modelAnswer}</p>
                    </div>

                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs font-black text-emerald-500">
                        {labels.practiceSuccess} (%{Math.round(scorePercentage)})
                    </div>
                </div>
            )}
        </div>
    )
}

function GameBlock({ lesson, labels, onComplete, darkMode }) {
    const props = { lesson, labels, onComplete, darkMode }

    return (
        <div className={`rounded-lg border p-4 transition-all duration-300 ${darkMode ? 'border-slate-700 bg-slate-900/90 text-slate-200' : 'border-slate-200 bg-indigo-50/70 text-slate-800'}`}>
            <div className="mb-3 text-sm font-black" style={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{lesson.game.title}</div>
            {lesson.game.type === 'checklist' && <ChecklistGame {...props} />}
            {lesson.game.type === 'sequence' && <SequenceGame {...props} />}
            {['map', 'bug', 'quiz'].includes(lesson.game.type) && <ChoiceGame {...props} />}
            {lesson.game.type === 'severity' && <SeverityGame {...props} />}
        </div>
    )
}

// 🧠 NEW COMPONENTS FOR NEURO-OPTIMIZATION MODE

function SpacedRepetitionTracker({ labels, darkMode }) {
    const [cycle, setCycle] = useState(() => {
        const saved = localStorage.getItem('manual_testing_spaced_rep')
        return saved ? JSON.parse(saved) : null
    })

    const startCycle = () => {
        const newCycle = {
            startDate: new Date().toISOString(),
            completedDays: [1] // Day 1 completed automatically
        }
        localStorage.setItem('manual_testing_spaced_rep', JSON.stringify(newCycle))
        setCycle(newCycle)
    }

    const resetCycle = () => {
        localStorage.removeItem('manual_testing_spaced_rep')
        setCycle(null)
    }

    const completeDay = (day) => {
        if (!cycle) return
        const completedDays = [...cycle.completedDays]
        if (!completedDays.includes(day)) {
            completedDays.push(day)
        }
        const updated = { ...cycle, completedDays }
        localStorage.setItem('manual_testing_spaced_rep', JSON.stringify(updated))
        setCycle(updated)
    }

    if (!cycle) {
        return (
            <div className={`rounded-xl border p-5 text-center transition ${darkMode ? 'border-sky-500/20 bg-sky-950/20' : 'border-sky-200 bg-sky-50/50'}`}>
                <h3 className="text-lg font-black">{labels.spacedRepTitle}</h3>
                <p className="mt-2 text-sm opacity-80">{labels.neuroModeDesc}</p>
                <button onClick={startCycle} className="mt-4 min-h-10 rounded-lg bg-sky-600 px-5 text-sm font-black text-white shadow-md hover:scale-105 hover:bg-sky-500 transition">
                    {labels.spacedRepStart}
                </button>
            </div>
        )
    }

    const startDate = new Date(cycle.startDate)
    const getTargetDate = (daysToAdd) => {
        const d = new Date(startDate)
        d.setDate(d.getDate() + daysToAdd)
        return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
    }

    const milestones = [
        { day: 1, label: labels.spacedRepDay1, daysToAdd: 0 },
        { day: 3, label: labels.spacedRepDay3, daysToAdd: 2 },
        { day: 7, label: labels.spacedRepDay7, daysToAdd: 6 },
        { day: 30, label: labels.spacedRepDay30, daysToAdd: 29 }
    ]

    return (
        <div className={`rounded-xl border p-5 transition ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="text-base font-black flex items-center gap-2">
                    <span>📅</span> {labels.spacedRepTitle}
                </h3>
                <button onClick={resetCycle} className={`min-h-8 rounded-lg px-3 text-xs font-black transition ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {labels.spacedRepReset}
                </button>
            </div>
            
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {milestones.map((ms) => {
                    const isDone = cycle.completedDays.includes(ms.day)
                    const targetDateStr = getTargetDate(ms.daysToAdd)
                    const isPrevDone = ms.day === 1 || cycle.completedDays.includes(ms.day === 3 ? 1 : ms.day === 7 ? 3 : 7)
                    const isAvailable = !isDone && isPrevDone
                    
                    return (
                        <div key={ms.day} className={`rounded-lg border p-3 flex flex-col justify-between min-h-[110px] transition ${isDone ? (darkMode ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-emerald-200 bg-emerald-50/30') : isAvailable ? (darkMode ? 'border-sky-500/40 bg-sky-500/5' : 'border-sky-200 bg-sky-50/30') : 'opacity-40'}`}>
                            <div>
                                <div className="text-[10px] font-bold opacity-60">{targetDateStr}</div>
                                <div className={`mt-1 text-xs font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{ms.label}</div>
                            </div>
                            <div className="mt-3">
                                {isDone ? (
                                    <span className="text-xs font-black text-emerald-400">{labels.spacedRepDone}</span>
                                ) : isAvailable ? (
                                    <button onClick={() => completeDay(ms.day)} className="w-full min-h-8 rounded bg-sky-600 hover:bg-sky-500 text-xs font-black text-white transition">
                                        {labels.spacedRepTodayDone}
                                    </button>
                                ) : (
                                    <span className="text-xs font-black opacity-40">{labels.spacedRepLocked}</span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function FeynmanWorkspace({ lesson, labels, darkMode }) {
    const [text, setText] = useState('')
    const [checked, setChecked] = useState(false)
    
    const normalize = (str) => {
        return str
            .toLowerCase()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
    }

    const keywordMatches = useMemo(() => {
        const normText = normalize(text)
        return lesson.feynman.keywords.map(kw => {
            const normKw = normalize(kw)
            return {
                word: kw,
                matched: normText.includes(normKw)
            }
        })
    }, [text, lesson.feynman.keywords])

    const matchCount = keywordMatches.filter(m => m.matched).length
    const scorePercentage = lesson.feynman.keywords.length > 0 ? (matchCount / lesson.feynman.keywords.length) * 100 : 0

    return (
        <div className={`rounded-xl border p-4 transition-all duration-300 ${darkMode ? 'border-slate-800 bg-slate-950/50 hover:border-sky-500/20' : 'border-slate-200 bg-slate-50/50 hover:border-sky-500/20'}`}>
            <h4 className={`text-sm font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {labels.feynmanTitle}
            </h4>
            <p className="mt-2 text-xs opacity-80">{labels.feynmanPrompt}</p>
            
            <textarea
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                    setChecked(false)
                }}
                className={`mt-2 w-full min-h-[96px] rounded-lg border p-3 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-200 placeholder-slate-500' : 'border-slate-300 bg-white text-slate-800 placeholder-slate-400'}`}
                placeholder="..."
            />
            
            <div className="mt-3 flex flex-wrap gap-2">
                <button
                    onClick={() => setChecked(true)}
                    disabled={!text.trim()}
                    className="min-h-9 rounded-lg bg-sky-600 disabled:opacity-50 hover:bg-sky-500 px-4 text-xs font-black text-white transition"
                >
                    {labels.feynmanCheck}
                </button>
                <button
                    onClick={() => {
                        setText('')
                        setChecked(false)
                    }}
                    className={`min-h-9 rounded-lg px-4 text-xs font-black transition ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                    {labels.reset}
                </button>
            </div>

            {checked && (
                <div className="mt-4 space-y-4 border-t border-slate-700/30 pt-4">
                    <div>
                        <div className="text-xs font-black opacity-75">{labels.feynmanKeywords}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {keywordMatches.map((item) => (
                                <span
                                    key={item.word}
                                    className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold border ${item.matched ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-500/10 border-slate-800 text-slate-400'}`}
                                >
                                    {item.word} {item.matched ? '✓' : '✗'}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className={`rounded-lg border p-3 ${darkMode ? 'border-slate-850 bg-slate-900/60' : 'border-slate-200 bg-white'}`}>
                        <div className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Model Açıklama / Model Answer</div>
                        <p className="mt-1.5 text-xs leading-relaxed font-medium">{lesson.feynman.modelAnswer}</p>
                    </div>

                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs font-black text-emerald-400">
                        {labels.feynmanSuccess} (Kapsama Oranı: %{Math.round(scorePercentage)})
                    </div>
                </div>
            )}
        </div>
    )
}

function RecallFlashcard({ lesson, labels, darkMode }) {
    const [flipped, setFlipped] = useState(false)
    const [status, setStatus] = useState(null) // 'success' or 'fail'

    useEffect(() => {
        setFlipped(false)
        setStatus(null)
    }, [lesson])

    const saveRecallStatus = (success) => {
        setStatus(success ? 'success' : 'fail')
        const saved = localStorage.getItem('manual_testing_recall_progress')
        const progress = saved ? JSON.parse(saved) : {}
        progress[lesson.id] = success ? 'recalled' : 'failed'
        localStorage.setItem('manual_testing_recall_progress', JSON.stringify(progress))
    }

    return (
        <div className={`rounded-xl border p-4 transition-all duration-300 ${darkMode ? 'border-slate-800 bg-slate-950/50 hover:border-sky-500/20' : 'border-slate-200 bg-slate-50/50 hover:border-sky-500/20'}`}>
            <div className="flex items-center justify-between gap-2">
                <h4 className={`text-sm font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {labels.activeRecallTitle}
                </h4>
                {status && (
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'}`}>
                        {status === 'success' ? labels.correct : labels.wrong}
                    </span>
                )}
            </div>
            <p className="mt-2 text-xs opacity-80">{labels.activeRecallPrompt}</p>

            <div className="mt-3 relative min-h-[120px] rounded-lg overflow-hidden border border-slate-700/20 bg-slate-950/20">
                <div 
                    onClick={() => setFlipped(!flipped)}
                    className={`p-4 min-h-[120px] flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-500 ${flipped ? 'bg-emerald-950/25' : 'bg-sky-950/25'}`}
                >
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2" style={{ color: flipped ? (darkMode ? '#34d399' : '#047857') : (darkMode ? '#38bdf8' : '#0369a1') }}>
                        {flipped ? 'Cevap / Answer' : 'Soru / Question'}
                    </div>
                    <p className={`text-xs font-bold leading-relaxed px-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {flipped ? lesson.recall.answer : lesson.recall.question}
                    </p>
                    <div className="mt-3 text-[10px] font-bold opacity-60 border border-current rounded px-2 py-0.5 hover:opacity-100 transition select-none">
                        {labels.activeRecallFlip}
                    </div>
                </div>
            </div>

            {flipped && (
                <div className="mt-3 flex gap-2 justify-center">
                    <button
                        onClick={() => saveRecallStatus(true)}
                        className={`min-h-8 rounded-lg px-3 text-xs font-black text-white transition ${status === 'success' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                        {labels.activeRecallGotIt}
                    </button>
                    <button
                        onClick={() => saveRecallStatus(false)}
                        className={`min-h-8 rounded-lg px-3 text-xs font-black text-white transition ${status === 'fail' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                        {labels.activeRecallFailed}
                    </button>
                </div>
            )}
        </div>
    )
}

// Bolum quizi: dogru cevaplandiginda bolum OTOMATIK tamamlanir (bitirme rozetinin
// guvenilir yolu budur — oyunlar cozulmeden de ilerlenebilsin diye eklendi).
// CLAUDE.md §18: yanlis cevapta moral bozan kirmizi ekran yok; cesaretlendirici
// mikro-geri bildirim + alternatif (retry) soru sunulur.
function LessonQuiz({ quiz, labels, darkMode, color, passed, onPass }) {
    const [useRetry, setUseRetry] = useState(false)
    const [selected, setSelected] = useState(null)
    const [status, setStatus] = useState('idle') // 'idle' | 'correct' | 'wrong'

    const active = useRetry && quiz.retry ? quiz.retry : quiz
    const hasRetry = Boolean(quiz.retry)

    const handleSelect = (optionId) => {
        if (status === 'correct') return
        setSelected(optionId)
        if (optionId === active.correct) {
            setStatus('correct')
            onPass?.()
        } else {
            setStatus('wrong')
        }
    }

    if (passed && status !== 'correct') {
        return (
            <div className={`mt-5 rounded-lg border-2 p-4 ${darkMode ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-emerald-200 bg-emerald-50'}`}>
                <div className={`flex items-center gap-2 text-sm font-black ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    <span className="text-lg">🏅</span>
                    {labels.lessonQuizPassed}
                </div>
            </div>
        )
    }

    return (
        <div className={`mt-5 rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
            <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-wide" style={{ color }}>
                <span>🧠</span>{labels.lessonQuizTitle}
            </div>
            <p className={`mb-3 text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{labels.lessonQuizHint}</p>
            <p className={`text-sm font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{active.question}</p>

            <div className="mt-3 grid gap-2">
                {active.options.map(option => {
                    const isSelected = selected === option.id
                    const isCorrectOption = option.id === active.correct
                    const showCorrect = status !== 'idle' && isCorrectOption
                    const showWrong = status === 'wrong' && isSelected && !isCorrectOption
                    return (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            disabled={status === 'correct'}
                            data-testid={`quiz-opt-${option.id}`}
                            className={`min-h-11 rounded-lg border-2 px-3 py-2 text-left text-sm font-bold transition ${
                                showCorrect
                                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-500'
                                    : showWrong
                                        ? 'border-amber-500 bg-amber-500/10 text-amber-500 animate-pulse'
                                        : isSelected
                                            ? 'border-sky-400 bg-sky-500/10'
                                            : darkMode
                                                ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-500/50'
                                                : 'border-slate-200 bg-white text-slate-700 hover:border-sky-500/50'
                            }`}
                        >
                            {showCorrect ? '✓ ' : showWrong ? '✗ ' : ''}{option.text}
                        </button>
                    )
                })}
            </div>

            {status === 'correct' && (
                <div className={`mt-3 rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 p-3 text-sm font-bold ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>
                    <div className="font-black">🎉 {labels.lessonQuizCorrect}</div>
                    <div className="mt-1 opacity-90">{active.explanation}</div>
                </div>
            )}

            {status === 'wrong' && (
                <div className={`mt-3 rounded-lg border-2 border-amber-500/40 bg-amber-500/10 p-3 text-sm font-bold ${darkMode ? 'text-amber-200' : 'text-amber-700'}`}>
                    <div className="font-black">💡 {labels.lessonQuizWrong}</div>
                    {hasRetry && !useRetry ? (
                        <button
                            onClick={() => { setUseRetry(true); setSelected(null); setStatus('idle') }}
                            className="mt-2 min-h-9 rounded-lg bg-amber-500 px-4 text-xs font-black text-white transition hover:bg-amber-600"
                        >
                            {labels.lessonQuizRetry} →
                        </button>
                    ) : (
                        <button
                            onClick={() => { setSelected(null); setStatus('idle') }}
                            className="mt-2 min-h-9 rounded-lg bg-amber-500 px-4 text-xs font-black text-white transition hover:bg-amber-600"
                        >
                            {labels.lessonQuizTryAgain} →
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

function LessonCard({ lesson, labels, darkMode, complete, onComplete, neuroMode, language, quizPassed, onQuizPass }) {
    return (
        <section id={lesson.id} className="scroll-mt-24">
            <div className={`rounded-lg border p-4 shadow-xl md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900/95' : 'border-slate-200 bg-white'}`}>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex min-h-9 items-center rounded-lg px-3 text-xs font-black uppercase text-white" style={{ background: lesson.color }}>
                        {lesson.shortTitle}
                    </span>
                    {complete && (
                        <span className={`inline-flex min-h-9 items-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-black ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                            {labels.complete}
                        </span>
                    )}
                </div>
                <h2 className={`text-xl font-black leading-tight md:text-2xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{lesson.title}</h2>

                <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="grid gap-4">
                        <InfoBox label={labels.learn} text={lesson.analogy} color={lesson.color} darkMode={darkMode} />
                        <InfoBox label={labels.javaBridge} text={lesson.why} color="#f59e0b" darkMode={darkMode} />
                        <InfoBox label={labels.realLife} text={lesson.realLife} color="#22c55e" darkMode={darkMode} />
                    </div>
                    <div className="grid gap-4">
                        <ScenarioVisual lesson={lesson} darkMode={darkMode} />
                        <GameBlock lesson={lesson} labels={labels} onComplete={onComplete} darkMode={darkMode} />
                    </div>
                </div>

                {/* İzle → dene sırası: film (varsa) drag-drop/practice alıştırmalarından önce gelir */}
                {lesson.film && (
                    <VideoSceneBlock block={lesson.film} darkMode={darkMode} language={language} />
                )}

                <div className="mt-5 border-t border-slate-700/30 pt-5 grid gap-4 md:grid-cols-2">
                    <DragDropChallenge lesson={lesson} labels={labels} darkMode={darkMode} />
                    <PracticeWorkspace lesson={lesson} labels={labels} darkMode={darkMode} />
                </div>

                {/* Neuro-Optimization tools inside LessonCard */}
                {neuroMode && (
                    <div className="mt-5 border-t border-slate-700/30 pt-5 grid gap-4 md:grid-cols-2">
                        <FeynmanWorkspace lesson={lesson} labels={labels} darkMode={darkMode} />
                        <RecallFlashcard lesson={lesson} labels={labels} darkMode={darkMode} />
                    </div>
                )}

                {/* §9.1: quiz en sonda — konu anlatimi, film, oyun ve pratikten SONRA */}
                {lesson.quiz && (
                    <LessonQuiz
                        quiz={lesson.quiz}
                        labels={labels}
                        darkMode={darkMode}
                        color={lesson.color}
                        passed={quizPassed}
                        onPass={onQuizPass}
                    />
                )}
            </div>
        </section>
    )
}

function InfoBox({ label, text, color, darkMode }) {
    return (
        <div className={`rounded-lg border-l-4 p-4 text-sm leading-relaxed ${darkMode ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'}`} style={{ borderColor: color }}>
            <div className="mb-1 text-xs font-black uppercase" style={{ color }}>{label}</div>
            {text}
        </div>
    )
}

function FinalQuiz({ quiz, labels, darkMode }) {
    const [answers, setAnswers] = useState({})
    const score = quiz.filter((item, index) => answers[index] === item.answer).length

    return (
        <section className={`rounded-lg border p-4 md:p-6 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <h2 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{labels.quizTitle}</h2>
            <div className="mt-4 grid gap-3">
                {quiz.map((item, index) => (
                    <div key={item.question} className={`rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                        <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{index + 1}. {item.question}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {item.options.map(option => (
                                <button key={option} onClick={() => answers[index] === option ? setAnswers(current => {
                                    const next = { ...current }
                                    delete next[index]
                                    return next
                                }) : setAnswers(current => ({ ...current, [index]: option }))} className={`min-h-10 rounded-lg px-3 text-sm font-black transition ${answers[index] === option ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-100 hover:bg-slate-600'}`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                        {answers[index] && <div className={`mt-3 text-sm font-bold ${answers[index] === item.answer ? (darkMode ? 'text-emerald-300' : 'text-emerald-700') : (darkMode ? 'text-amber-300' : 'text-amber-700')}`}>{item.feedback}</div>}
                    </div>
                ))}
            </div>
            <div className="mt-4 rounded-lg border border-sky-400/40 bg-sky-500/10 p-3 text-sm font-black text-sky-200">
                {labels.result}: {score}/{quiz.length}
            </div>
        </section>
    )
}

function ManualTestingPage() {
    const { language } = useLanguage()
    const [darkMode, setDarkMode] = useDarkModeState()
    const data = manualTestingData[language] || manualTestingData.tr
    
    // Neuro-Optimization Mode Toggle State
    const [neuroMode, setNeuroMode] = useState(() => {
        const saved = localStorage.getItem('manual_testing_neuro_mode')
        return saved !== null ? JSON.parse(saved) : false
    })

    useEffect(() => {
        localStorage.setItem('manual_testing_neuro_mode', JSON.stringify(neuroMode))
    }, [neuroMode])

    const [activeId, setActiveId] = useState(data.lessons[0].id)
    // Bölüm tamamlama artık KALICI (ürün kararı 2026-07-19): eskiden sadece
    // component state'indeydi, sayfa yenilenince kayboluyordu. localStorage'a
    // yazılır ve kariyer haritasına işlenir. Her ders tamamlanması markTopicCompleted
    // ile XP/rozet kazandırır; kariyer haritasında route'un TAMAMEN bitmesi ise
    // AYRI olarak markRouteFullyCompleted ile işaretlenir (aşağıya bak) — SADECE
    // tek bir ders bitince değil (gerçek kullanıcı bug raporu, 2026-07-23: önceden
    // ilk ders bitince /manual-testing tüm route "tamamlandı" görünüyordu).
    const { markTopicCompleted, markRouteFullyCompleted } = useAuth()
    const [completed, setCompleted] = useState(() => {
        try {
            const saved = localStorage.getItem('manual_testing_completed_lessons')
            return saved ? JSON.parse(saved) : {}
        } catch { return {} }
    })
    const handleLessonComplete = (lesson) => {
        // Yan etkiler updater DIŞINDA — React StrictMode updater'ı iki kez çağırır
        if (completed[lesson.id]) return
        const updated = { ...completed, [lesson.id]: true }
        setCompleted(updated)
        try { localStorage.setItem('manual_testing_completed_lessons', JSON.stringify(updated)) } catch { /* localStorage kapalı olabilir */ }
        markTopicCompleted({ lessonSlug: 'manual-testing', topicSlug: lesson.id, topicLabel: lesson.shortTitle, routePath: '/manual-testing' })
            .catch(() => { /* progress senkronizasyonu başarısız olsa da UI bozulmaz */ })
        if (Object.keys(updated).length === data.lessons.length) {
            markRouteFullyCompleted({ lessonSlug: 'manual-testing', routePath: '/manual-testing' })
                .catch(() => { /* senkronizasyon başarısız olsa da UI bozulmaz */ })
        }
    }
    // Bolum quizi durumu ayri tutulur: "quiz gecildi" bilgisi, bolum tamamlanmis
    // olsa bile quiz kutusunun dogru ozeti gostermesi icin gerekir.
    const [quizPassed, setQuizPassed] = useState(() => {
        try {
            const saved = localStorage.getItem('manual_testing_quiz_passed')
            return saved ? JSON.parse(saved) : {}
        } catch { return {} }
    })
    const handleQuizPass = (lesson) => {
        if (!quizPassed[lesson.id]) {
            const updated = { ...quizPassed, [lesson.id]: true }
            setQuizPassed(updated)
            try { localStorage.setItem('manual_testing_quiz_passed', JSON.stringify(updated)) } catch { /* localStorage kapali olabilir */ }
        }
        // Quiz dogru cevaplandiginda bolum otomatik tamamlanir
        handleLessonComplete(lesson)
    }
    const lessonIds = useMemo(() => data.lessons.map(lesson => lesson.id), [data.lessons])
    const completionCount = data.lessons.filter(lesson => completed[lesson.id]).length

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(entry => {
                if (entry.isIntersecting) setActiveId(entry.target.id)
            }),
            { rootMargin: '-25% 0px -65% 0px' }
        )
        lessonIds.forEach(id => {
            const node = document.getElementById(id)
            if (node) observer.observe(node)
        })
        return () => observer.disconnect()
    }, [lessonIds])

    const navTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-900'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} showQaMentorLink />

            <main className="mx-auto max-w-7xl px-3 py-5 md:px-6 md:py-8">
                <section className={`overflow-hidden rounded-lg border p-4 shadow-xl md:p-7 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_460px] lg:items-center">
                        <div>
                            <div className={`inline-flex min-h-9 items-center rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 text-xs font-black uppercase ${darkMode ? 'text-sky-300' : 'text-sky-700'}`}>
                                {data.hero.eyebrow}
                            </div>
                            <h1 className={`mt-4 text-3xl font-black leading-tight md:text-5xl ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.hero.title}</h1>
                            <p className={`mt-4 max-w-3xl text-base leading-relaxed md:text-lg ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{data.hero.subtitle}</p>
                            <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{data.hero.intro}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <button onClick={() => navTo(data.lessons[0].id)} className="min-h-11 rounded-lg bg-sky-600 px-4 text-sm font-black text-white shadow-lg shadow-sky-600/20 transition hover:scale-105 hover:bg-sky-500">
                                    {data.hero.cta}
                                </button>
                                <button 
                                    onClick={() => setNeuroMode(!neuroMode)} 
                                    className={`min-h-11 rounded-lg px-4 text-sm font-black transition shadow-lg hover:scale-105 ${neuroMode ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-600/25 animate-pulse' : 'bg-slate-700 hover:bg-slate-600 text-white shadow-slate-700/20'}`}
                                >
                                    {data.ui.neuroModeToggle} {neuroMode ? '✓' : ''}
                                </button>
                            </div>
                        </div>
                        <div>
                            <FlowVisual labels={data.ui} darkMode={darkMode} />
                            <div className={`mt-4 rounded-lg border p-4 ${darkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                                <div className="flex items-center justify-between gap-3 text-sm font-black">
                                    <span>{data.ui.progressLabel}</span>
                                    <span>{completionCount}/{data.lessons.length}</span>
                                </div>
                                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-700/30">
                                    <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-[width]" style={{ width: `${(completionCount / data.lessons.length) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spaced Repetition Tracker when neuroMode is active */}
                {neuroMode && (
                    <div className="mt-6">
                        <SpacedRepetitionTracker labels={data.ui} darkMode={darkMode} />
                    </div>
                )}

                <div className="mt-6 grid gap-5 lg:grid-cols-[250px_1fr]">
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <nav className={`rounded-lg border p-3 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`} aria-label={data.ui.navTitle}>
                            <div className={`mb-3 text-sm font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{data.ui.navTitle}</div>
                            <div className="grid gap-2">
                                {data.lessons.map(lesson => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => navTo(lesson.id)}
                                        className={`min-h-10 rounded-lg border px-3 text-left text-sm font-bold transition-all ${activeId === lesson.id ? 'text-white' : darkMode ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'}`}
                                        style={activeId === lesson.id ? { background: lesson.color, borderColor: lesson.color } : {}}
                                    >
                                        {completed[lesson.id] ? '✓ ' : ''}{lesson.shortTitle}
                                    </button>
                                ))}
                            </div>
                            <Link to="/what-is-testing" className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-violet-400/40 bg-violet-500/10 px-3 text-sm font-black text-violet-200 transition hover:scale-105">
                                {data.ui.qaBasics}
                            </Link>
                        </nav>
                    </aside>

                    <div className="grid gap-6">
                        {data.lessons.map(lesson => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                labels={data.ui}
                                darkMode={darkMode}
                                complete={Boolean(completed[lesson.id])}
                                onComplete={() => handleLessonComplete(lesson)}
                                neuroMode={neuroMode}
                                language={language}
                                quizPassed={Boolean(quizPassed[lesson.id])}
                                onQuizPass={() => handleQuizPass(lesson)}
                            />
                        ))}
                        <FinalQuiz quiz={data.quiz} labels={data.ui} darkMode={darkMode} />

                        {/* Ders bitirme rozeti — son bölümün altında, tüm dersler bitince açılır */}
                        <LessonFinishBadge
                            language={language}
                            darkMode={darkMode}
                            completedCount={completionCount}
                            total={data.lessons.length}
                            lessonTitle={data.hero.title}
                        />
                    </div>
                </div>
            </main>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title={language === 'tr' ? 'Sayfanin basina don' : 'Back to top'}
                className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-xl text-white shadow-lg shadow-sky-600/30 transition hover:scale-110 hover:bg-sky-500"
            >
                🏠
            </button>
        </div>
    )
}

export default ManualTestingPage
