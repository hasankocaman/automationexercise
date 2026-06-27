import { useEffect, useRef, useState } from 'react'

// Animates a number towards `value` whenever it changes. Shared by
// ManualTestingLabBlock and CodePlaygroundBlock so the XP count-up animation
// only lives in one place.
export function useCountUp(value, duration = 700) {
    const [display, setDisplay] = useState(value)
    const prevRef = useRef(value)
    useEffect(() => {
        const from = prevRef.current
        const to = value
        if (from === to) return
        let raf
        const start = performance.now()
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplay(Math.round(from + (to - from) * eased))
            if (t < 1) raf = requestAnimationFrame(tick)
            else prevRef.current = to
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [value, duration])
    return display
}

const XP_POP_KEYFRAMES = `
@keyframes sharedXpPop {
    0% { opacity: 0; transform: translate(-50%, 4px); }
    25% { opacity: 1; transform: translate(-50%, -6px); }
    100% { opacity: 0; transform: translate(-50%, -26px); }
}
`

function XpPop({ pop }) {
    if (!pop) return null
    return (
        <>
            <style>{XP_POP_KEYFRAMES}</style>
            <span
                key={pop.at}
                className="pointer-events-none absolute left-1/2 top-0 whitespace-nowrap text-sm font-black text-emerald-400"
                style={{ animation: 'sharedXpPop 1.1s ease-out forwards' }}
            >
                +{pop.amount} XP
            </span>
        </>
    )
}

// Full bordered stat card — used by ManualTestingLabBlock's scoreboard.
export function XpStatCard({ value, label, pop, panelClassName }) {
    const display = useCountUp(value)
    return (
        <div className={`relative overflow-visible rounded-lg border p-3 text-center ${panelClassName}`}>
            <XpPop pop={pop} />
            <div className="text-lg font-black text-sky-400">{display}</div>
            <div className="text-[11px] font-bold opacity-70">{label}</div>
        </div>
    )
}

// Compact inline summary row — used above each CodePlaygroundBlock exercise.
export function XpSummaryBar({ xp, completedCount, pop, isTr, panelClassName }) {
    const display = useCountUp(xp)
    return (
        <div className={`relative mb-2 flex w-fit items-center gap-2 overflow-visible rounded-lg border px-3 py-1.5 text-xs font-bold ${panelClassName}`}>
            <XpPop pop={pop} />
            <span className="text-sky-400">🏆 {display} XP</span>
            <span className="opacity-40">·</span>
            <span className="opacity-70">{completedCount} {isTr ? 'egzersiz tamamlandı' : 'exercises completed'}</span>
        </div>
    )
}
