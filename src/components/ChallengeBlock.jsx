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

function rawText(value) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return value.en ?? value.tr ?? ''
}

function recoveryBlock(question, correctText, decoyText, explanation) {
    if (!rawText(correctText)) return null
    const safeDecoy = rawText(decoyText) && rawText(decoyText) !== rawText(correctText)
        ? decoyText
        : { tr: 'Yanlış seçenekte kalmak', en: 'Keep the wrong choice' }

    return {
        question,
        explanation,
        options: [
            { id: 'decoy', text: safeDecoy, correct: false },
            { id: 'correct', text: correctText, correct: true },
        ],
    }
}

function buildRecoveryQuestion(block, result) {
    if (block.extraQuestion || block.retryQuestion || block.fallbackQuestion) {
        return block.extraQuestion ?? block.retryQuestion ?? block.fallbackQuestion
    }

    if (block.variant === 'multiple-choice') {
        const correct = result.correctOption ?? block.options?.find(option => option.correct)
        const selected = result.selectedOption?.correct ? block.options?.find(option => !option.correct) : result.selectedOption
        return recoveryBlock(
            {
                tr: 'Ekstra mini soru: Bu hatayı düzeltmek için hangi cevap seçilmeliydi?',
                en: 'Recovery mini-question: Which answer should fix this mistake?',
            },
            correct?.text,
            selected?.text,
            {
                tr: 'Doğru cevabı tekrar seçmek, hatalı mantığı hemen pekiştirmeden düzeltir.',
                en: 'Choosing the correct answer again fixes the reasoning before the mistake sticks.',
            },
        )
    }

    if (block.variant === 'order-sort') {
        const correctFirst = result.correctFirst ?? block.items?.find(item => item.order === 1)
        const currentFirst = result.currentFirst && rawText(result.currentFirst.text) !== rawText(correctFirst?.text)
            ? result.currentFirst
            : block.items?.find(item => item.order !== 1)
        return recoveryBlock(
            {
                tr: 'Ekstra mini soru: Bu akışta ilk adım hangisi olmalı?',
                en: 'Recovery mini-question: Which step should come first in this flow?',
            },
            correctFirst?.text,
            currentFirst?.text,
            {
                tr: 'Sıralama sorularında ilk adımı bulmak geri kalan akışı kurmayı kolaylaştırır.',
                en: 'In ordering challenges, finding the first step makes the rest of the flow easier.',
            },
        )
    }

    if (block.variant === 'fill-blank') {
        return recoveryBlock(
            {
                tr: 'Ekstra mini soru: Boşluğa hangi ifade gelmeliydi?',
                en: 'Recovery mini-question: Which expression belongs in the blank?',
            },
            result.answer ?? block.answer,
            result.value || { tr: 'Boş bırakmak', en: 'Leaving it blank' },
            {
                tr: 'Bu mini kontrol, doğru tokeni ezberletmeden önce nereye oturduğunu fark ettirir.',
                en: 'This quick check helps you notice where the correct token fits before memorizing it.',
            },
        )
    }

    if (block.variant === 'bug-spot') {
        const buggyLine = result.buggyLine ?? block.lines?.find(line => line.hasBug)
        const clickedLine = result.clickedLine && result.clickedLine.id !== buggyLine?.id
            ? result.clickedLine
            : block.lines?.find(line => !line.hasBug)
        return recoveryBlock(
            {
                tr: 'Ekstra mini soru: Bug hangi satırdaydı?',
                en: 'Recovery mini-question: Which line contains the bug?',
            },
            buggyLine ? {
                tr: `Satır ${buggyLine.id}: ${buggyLine.code || ''}`,
                en: `Line ${buggyLine.id}: ${buggyLine.code || ''}`,
            } : null,
            clickedLine ? {
                tr: `Satır ${clickedLine.id}: ${clickedLine.code || ''}`,
                en: `Line ${clickedLine.id}: ${clickedLine.code || ''}`,
            } : null,
            {
                tr: 'Bug avında hedef, hatanın bulunduğu satırı nedenleriyle ayırt edebilmektir.',
                en: 'In bug spotting, the goal is to identify the faulty line and the reason behind it.',
            },
        )
    }

    return null
}

function RecoveryQuestion({ recovery, darkMode, isTr, onAnswer }) {
    const [pickedId, setPickedId] = useState(null)

    const handlePick = (option) => {
        if (pickedId != null) return
        setPickedId(option.id)
        onAnswer(option.correct)
    }

    return (
        <div className={`mt-3 rounded-lg border p-3 ${darkMode ? 'border-amber-700 bg-amber-950/25' : 'border-amber-200 bg-amber-50'}`}>
            <div className={`mb-2 text-xs font-black ${darkMode ? 'text-amber-100' : 'text-amber-900'}`}>
                {pick(recovery.question, isTr)}
            </div>
            <div className="grid gap-2">
                {recovery.options.map(option => {
                    const answered = pickedId != null
                    const picked = pickedId === option.id
                    const tone = !answered
                        ? (darkMode ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-800')
                        : option.correct
                            ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                            : picked
                                ? 'border-rose-500/60 bg-rose-500/10 text-rose-200'
                                : 'border-slate-700 bg-slate-900/40 text-slate-400 opacity-60'

                    return (
                        <button
                            key={option.id}
                            onClick={() => handlePick(option)}
                            disabled={answered}
                            className={`min-h-10 rounded-lg border-2 px-3 py-2 text-left text-xs font-bold transition-all ${tone}`}
                        >
                            {answered && (option.correct ? 'OK ' : picked ? 'NO ' : '')}
                            {pick(option.text, isTr)}
                        </button>
                    )
                })}
            </div>
            {pickedId != null && recovery.explanation && (
                <div className={`mt-2 rounded-lg border px-3 py-2 text-xs font-bold ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                    {pick(recovery.explanation, isTr)}
                </div>
            )}
        </div>
    )
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
    const [recovery, setRecovery] = useState(null)

    useEffect(() => subscribeToXpChanges(() => {
        setXp(getXP())
        setCompleted(getCompletedExercises())
    }), [])

    const isDone = block.id ? completed.includes(block.id) : false
    const difficulty = difficultyFromXp(block.xpReward ?? 0)

    const awardXp = (amount = block.xpReward ?? 0) => {
        if (!isDone && block.id) {
            const reward = Math.max(0, amount)
            const newTotal = addXP(reward)
            markExerciseComplete(block.id)
            setXp(newTotal)
            setCompleted(getCompletedExercises())
            if (reward > 0) setXpPop({ amount: reward, at: Date.now() })
        }
    }

    const shakeWrong = () => {
        setShaking(true)
        setTimeout(() => setShaking(false), 500)
    }

    const handleResult = (result) => {
        const { success } = result
        if (success) {
            setStatus('correct')
            setRecovery(null)
            awardXp(block.xpReward ?? 0)
        } else {
            setStatus('wrong')
            setRecovery(buildRecoveryQuestion(block, result))
            shakeWrong()
        }
    }

    const handleRecoveryAnswer = (success) => {
        if (success) {
            setStatus('correct')
            setRecovery(null)
            awardXp(Math.max(0, (block.xpReward ?? 0) - 5))
        } else {
            setStatus('wrong')
            shakeWrong()
        }
    }

    const handleRetry = () => {
        setStatus('idle')
        setRecovery(null)
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

                {status === 'wrong' && recovery && (
                    <RecoveryQuestion recovery={recovery} darkMode={darkMode} isTr={isTr} onAnswer={handleRecoveryAnswer} />
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
