import { useEffect, useRef, useState } from 'react'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
}

const STEP_DELAY_MS = 600

export default function StepAnimationBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const steps = block.steps || []
    const [activeIndex, setActiveIndex] = useState(-1)
    const [completed, setCompleted] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [playing, setPlaying] = useState(false)
    const timeoutsRef = useRef([])

    useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), [])

    const reset = () => {
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []
        setPlaying(false)
        setActiveIndex(-1)
        setCompleted([])
        setSelectedIndex(null)
    }

    const play = () => {
        reset()
        setPlaying(true)
        steps.forEach((_, idx) => {
            const t = setTimeout(() => {
                setActiveIndex(idx)
                setSelectedIndex(idx)
                setCompleted(curr => (idx > 0 ? [...curr, idx - 1] : curr))
                if (idx === steps.length - 1) {
                    const finishT = setTimeout(() => {
                        setCompleted(curr => [...curr, idx])
                        setActiveIndex(-1)
                        setPlaying(false)
                    }, STEP_DELAY_MS)
                    timeoutsRef.current.push(finishT)
                }
            }, idx * STEP_DELAY_MS)
            timeoutsRef.current.push(t)
        })
    }

    const selected = selectedIndex != null ? steps[selectedIndex] : null

    return (
        <div className="mt-4">
            {block.title && (
                <div className={`mb-3 text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {pick(block.title, isTr)}
                </div>
            )}

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-0">
                {steps.map((step, idx) => {
                    const isActive = activeIndex === idx
                    const isDone = completed.includes(idx)
                    const isSelected = selectedIndex === idx
                    return (
                        <div key={step.id ?? idx} className="flex flex-1 items-center md:flex-col">
                            <button
                                onClick={() => setSelectedIndex(idx)}
                                className={`flex min-h-16 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 px-2 py-2 text-center transition-all duration-300 ${
                                    isActive
                                        ? 'animate-pulse border-sky-400 bg-sky-500/20 shadow-lg shadow-sky-500/30'
                                        : isDone
                                            ? 'border-emerald-500/60 bg-emerald-500/10'
                                            : isSelected
                                                ? `border-sky-500/60 ${panelCls(darkMode)}`
                                                : `border-dashed ${panelCls(darkMode)} opacity-70`
                                }`}
                            >
                                <span className="text-xl leading-none">{isDone ? '✅' : (step.icon || '🔹')}</span>
                                <span className={`text-xs font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {pick(step.label, isTr)}
                                </span>
                            </button>
                            {idx < steps.length - 1 && (
                                <span className={`mx-1 shrink-0 text-lg font-black opacity-50 md:rotate-0 ${darkMode ? 'text-slate-500' : 'text-slate-400'} rotate-90 md:mx-2`}>
                                    →
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>

            {selected && (
                <div className={`mt-3 rounded-lg border p-3 text-sm ${panelCls(darkMode)}`}>
                    <span className="mr-2">{selected.icon || '🔹'}</span>
                    <span className="font-black">{pick(selected.label, isTr)}</span>
                    <span className="opacity-50"> — </span>
                    <span className="opacity-90">{pick(selected.detail, isTr)}</span>
                </div>
            )}

            <div className="mt-3 flex gap-2">
                <button
                    onClick={play}
                    disabled={playing}
                    className="min-h-9 rounded-lg bg-emerald-600 px-3 text-xs font-black text-white disabled:opacity-50"
                >
                    ▶ {isTr ? 'Oynat' : 'Play'}
                </button>
                <button onClick={reset} className="min-h-9 rounded-lg bg-slate-700 px-3 text-xs font-bold text-white">
                    ↺ {isTr ? 'Tekrar' : 'Replay'}
                </button>
            </div>
        </div>
    )
}
