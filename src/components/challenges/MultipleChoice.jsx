import { useState } from 'react'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'
}

// Single-choice question. Locks after the first pick — "Tekrar Dene" (handled
// by the parent ChallengeBlock, via remounting this component) is required to retry.
export default function MultipleChoice({ block, isTr, darkMode, onResult }) {
    const [pickedId, setPickedId] = useState(null)
    const picked = block.options.find(o => o.id === pickedId)

    const handlePick = (option) => {
        if (pickedId != null) return
        setPickedId(option.id)
        onResult({
            success: option.correct,
            selectedOption: option,
            correctOption: block.options.find(candidate => candidate.correct),
        })
    }

    return (
        <div className="grid gap-2">
            {block.options.map(option => {
                const isPicked = pickedId === option.id
                const answered = pickedId != null
                const tone = !answered
                    ? panelCls(darkMode)
                    : option.correct
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200'
                        : isPicked
                            ? 'border-rose-500/60 bg-rose-500/10 text-rose-200'
                            : `${panelCls(darkMode)} opacity-50`

                return (
                    <button
                        key={option.id}
                        onClick={() => handlePick(option)}
                        disabled={answered}
                        className={`min-h-11 rounded-lg border-2 px-3 py-2 text-left text-sm font-bold transition-all duration-200 ${tone}`}
                    >
                        {answered && (option.correct ? '✅ ' : isPicked ? '❌ ' : '')}
                        {pick(option.text, isTr)}
                    </button>
                )
            })}

            {picked && (
                <div className={`mt-1 rounded-lg border px-3 py-2 text-xs font-bold ${picked.correct ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-rose-500/40 bg-rose-500/10 ${darkMode ? 'text-rose-300' : 'text-rose-700'}`}`}>
                    {picked.correct ? '✓ ' : '⚠ '}{pick(picked.explanation, isTr)}
                </div>
            )}
        </div>
    )
}
