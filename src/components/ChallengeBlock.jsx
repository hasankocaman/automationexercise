import { useEffect, useState } from 'react'
import { getXP, addXP, getCompletedExercises, markExerciseComplete, subscribeToXpChanges } from '../lib/xp'
import { XpSummaryBar } from './XpStat'
import MultipleChoice from './challenges/MultipleChoice'
import OrderSort from './challenges/OrderSort'
import FillBlank from './challenges/FillBlank'
import BugSpot from './challenges/BugSpot'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
}

function difficultyFromXp(xp) {
    if (xp <= 10) return 'easy'
    if (xp <= 15) return 'medium'
    return 'hard'
}

const DIFFICULTY_LABEL = {
    easy: { tr: 'Kolay', en: 'Easy' },
    medium: { tr: 'Orta', en: 'Medium' },
    hard: { tr: 'Zor', en: 'Hard' },
}

const DIFFICULTY_CLS = {
    easy: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    medium: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    hard: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
}

const ANIM_KEYFRAMES = `
@keyframes challengeShake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
}
@keyframes challengePulseSuccess {
    0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    70% { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
}
`

// variant string -> component. Extended incrementally as each challenge type is built.
const VARIANT_COMPONENTS = {
    'multiple-choice': MultipleChoice,
    'order-sort': OrderSort,
    'fill-blank': FillBlank,
    'bug-spot': BugSpot,
}

// Dispatches to a challenges/* component based on block.variant, and owns the
// chrome shared by every challenge type: difficulty badge, question/instruction
// text, XP award (once per block.id, via src/lib/xp.js), shake/pulse feedback,
// and the "Tekrar Dene" reset (remounts the variant via a changing key).
export default function ChallengeBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const [xp, setXp] = useState(getXP)
    const [completed, setCompleted] = useState(getCompletedExercises)
    const [xpPop, setXpPop] = useState(null)
    const [status, setStatus] = useState('idle') // idle | correct | wrong
    const [shaking, setShaking] = useState(false)
    const [resetSignal, setResetSignal] = useState(0)

    useEffect(() => subscribeToXpChanges(() => {
        setXp(getXP())
        setCompleted(getCompletedExercises())
    }), [])

    const isDone = block.id ? completed.includes(block.id) : false
    const difficulty = difficultyFromXp(block.xpReward ?? 0)

    const handleResult = ({ success }) => {
        if (success) {
            setStatus('correct')
            if (!isDone && block.id) {
                const newTotal = addXP(block.xpReward ?? 0)
                markExerciseComplete(block.id)
                setXp(newTotal)
                setCompleted(getCompletedExercises())
                setXpPop({ amount: block.xpReward ?? 0, at: Date.now() })
            }
        } else {
            setStatus('wrong')
            setShaking(true)
            setTimeout(() => setShaking(false), 500)
        }
    }

    const handleRetry = () => {
        setStatus('idle')
        setResetSignal(s => s + 1)
    }

    const Variant = VARIANT_COMPONENTS[block.variant]
    const promptText = block.question ?? block.instruction

    return (
        <div className="mt-4">
            <style>{ANIM_KEYFRAMES}</style>
            <XpSummaryBar xp={xp} completedCount={completed.length} pop={xpPop} isTr={isTr} panelClassName={panelCls(darkMode)} />

            <div
                className={`relative rounded-xl border-2 p-4 ${panelCls(darkMode)} ${status === 'correct' ? 'border-emerald-500/60' : status === 'wrong' ? 'border-rose-500/60' : 'border-sky-500/30'}`}
                style={{ animation: shaking ? 'challengeShake 0.5s ease' : status === 'correct' ? 'challengePulseSuccess 0.8s ease' : undefined }}
            >
                <span className={`absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase ${DIFFICULTY_CLS[difficulty]}`}>
                    {pick(DIFFICULTY_LABEL[difficulty], isTr)}
                </span>

                {promptText && (
                    <div className={`mb-3 pr-20 text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        🎯 {pick(promptText, isTr)}
                    </div>
                )}

                {Variant ? (
                    <Variant key={resetSignal} block={block} isTr={isTr} darkMode={darkMode} onResult={handleResult} />
                ) : (
                    <div className="text-xs font-bold text-rose-400">Unknown challenge variant: {block.variant}</div>
                )}

                {status !== 'idle' && (
                    <button
                        onClick={handleRetry}
                        className="mt-3 min-h-9 rounded-lg bg-slate-700 px-3 text-xs font-bold text-white"
                    >
                        ↺ {isTr ? 'Tekrar Dene' : 'Try Again'}
                    </button>
                )}
            </div>
        </div>
    )
}
