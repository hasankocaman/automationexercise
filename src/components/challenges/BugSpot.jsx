import { useState } from 'react'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

// Click the line that contains the bug. Locks after the first click; reveals
// the actual buggy line (and its explanation) regardless of whether the pick was right.
export default function BugSpot({ block, isTr, darkMode, onResult }) {
    const [clickedId, setClickedId] = useState(null)
    const lines = block.lines
    const buggyLine = lines.find(l => l.hasBug)

    const handleClick = (line) => {
        if (clickedId != null) return
        setClickedId(line.id)
        onResult({
            success: line.hasBug,
            clickedLine: line,
            buggyLine,
        })
    }

    const answered = clickedId != null

    return (
        <div>
            <div className="overflow-x-auto rounded-lg bg-slate-950 p-2 font-mono text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {lines.map(line => {
                    const isClicked = clickedId === line.id
                    const isRevealedBug = answered && line.hasBug
                    const tone = !answered
                        ? 'hover:bg-slate-800'
                        : isRevealedBug
                            ? 'bg-emerald-500/15 border-l-4 border-emerald-500'
                            : isClicked
                                ? 'bg-rose-500/15 border-l-4 border-rose-500'
                                : ''

                    return (
                        <div
                            key={line.id}
                            onClick={() => handleClick(line)}
                            className={`flex cursor-pointer items-start gap-2 rounded px-2 py-1 transition-colors duration-200 ${tone} ${answered ? 'cursor-default' : ''}`}
                        >
                            <span className="w-5 shrink-0 select-none text-right text-slate-500">{line.id}</span>
                            <span className="whitespace-pre text-slate-100">{line.code || ' '}</span>
                            {isRevealedBug && <span className="ml-auto shrink-0">🐛</span>}
                            {isClicked && !line.hasBug && <span className="ml-auto shrink-0">👆</span>}
                        </div>
                    )
                })}
            </div>

            {answered && (
                <div className={`mt-3 rounded-lg border px-3 py-2 text-xs font-bold ${clickedId === buggyLine.id ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-rose-500/40 bg-rose-500/10 ${darkMode ? 'text-rose-300' : 'text-rose-700'}`}`}>
                    {clickedId === buggyLine.id
                        ? '✓ '
                        : `⚠ ${isTr ? `Hata satır ${buggyLine.id}'de` : `The bug is on line ${buggyLine.id}`} — `}
                    {pick(buggyLine.explanation, isTr)}
                </div>
            )}
        </div>
    )
}
