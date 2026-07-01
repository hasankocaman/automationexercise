import { useState } from 'react'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function normalize(value) {
    return (value || '').trim().toLowerCase().replace(/\s+/g, ' ')
}

// Renders codeTemplate with {BLANK} swapped for an inline text input. Accepts
// the exact answer or any of `alternatives`, case/whitespace-insensitive.
export default function FillBlank({ block, isTr, darkMode, onResult }) {
    const [value, setValue] = useState('')
    const [checked, setChecked] = useState(false)
    const [correct, setCorrect] = useState(false)

    const [before, after] = block.codeTemplate.split('{BLANK}')

    const handleCheck = () => {
        const normalized = normalize(value)
        const isCorrect = normalized === normalize(block.answer) || (block.alternatives || []).some(alt => normalize(alt) === normalized)
        setChecked(true)
        setCorrect(isCorrect)
        onResult({
            success: isCorrect,
            value,
            answer: block.answer,
        })
    }

    return (
        <div>
            <div
                className="flex flex-wrap items-center gap-1 overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-sm text-slate-100"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
                <span className="whitespace-pre">{before}</span>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !checked) handleCheck() }}
                    disabled={checked}
                    autoComplete="off"
                    spellCheck={false}
                    className={`min-h-8 w-24 rounded-md border-2 bg-slate-900 px-2 text-center font-mono text-sm text-amber-300 outline-none ${
                        !checked ? 'border-amber-500/60 focus:border-amber-400' : correct ? 'border-emerald-500/60' : 'border-rose-500/60'
                    }`}
                />
                <span className="whitespace-pre">{after}</span>
            </div>

            {!checked ? (
                <button onClick={handleCheck} className="mt-3 min-h-9 rounded-lg bg-sky-600 px-3 text-xs font-black text-white">
                    {isTr ? 'Kontrol Et' : 'Check'}
                </button>
            ) : (
                <div className={`mt-3 rounded-lg border px-3 py-2 text-xs font-bold ${correct ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-rose-500/40 bg-rose-500/10 ${darkMode ? 'text-rose-300' : 'text-rose-700'}`}`}>
                    {correct ? '✓ ' : `⚠ ${isTr ? `Doğru cevap: ${block.answer}` : `Correct answer: ${block.answer}`} — `}
                    {pick(block.explanation, isTr)}
                </div>
            )}
        </div>
    )
}
