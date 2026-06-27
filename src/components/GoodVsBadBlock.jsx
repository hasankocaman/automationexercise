import { useState } from 'react'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

// Simple positional line diff — good enough for short, illustrative snippets.
// Not a general-purpose diff (no LCS/alignment), by design: no external library.
function diffLines(badCode, goodCode) {
    const badLines = badCode.split('\n')
    const goodLines = goodCode.split('\n')
    const max = Math.max(badLines.length, goodLines.length)
    const badChanged = []
    const goodChanged = []
    for (let i = 0; i < max; i++) {
        const b = badLines[i]
        const g = goodLines[i]
        if (b !== g) {
            if (b !== undefined) badChanged.push(i)
            if (g !== undefined) goodChanged.push(i)
        }
    }
    return { badChanged, goodChanged }
}

function CodeLines({ code, changedLines, highlight, toneClass }) {
    const lines = code.split('\n')
    return (
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {lines.map((line, i) => {
                const isChanged = highlight && changedLines.includes(i)
                return (
                    <div
                        key={i}
                        className={`px-1.5 ${isChanged ? `${toneClass} rounded` : ''}`}
                    >
                        <span className="text-slate-100">{line || ' '}</span>
                    </div>
                )
            })}
        </pre>
    )
}

export default function GoodVsBadBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const [hovered, setHovered] = useState(null) // null | 'bad' | 'good'
    const [showDiff, setShowDiff] = useState(false)

    const { badChanged, goodChanged } = diffLines(block.bad.code, block.good.code)

    const cardBase = 'rounded-xl border-2 p-4 transition-all duration-300'
    const badDim = hovered === 'good' ? 'opacity-40 scale-[0.98]' : ''
    const goodDim = hovered === 'bad' ? 'opacity-40 scale-[0.98]' : ''
    const badGlow = hovered === 'bad' ? 'shadow-lg shadow-rose-500/20' : ''
    const goodGlow = hovered === 'good' ? 'shadow-lg shadow-emerald-500/20' : ''

    return (
        <div className="mt-4">
            {block.title && (
                <div className={`mb-2 text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {pick(block.title, isTr)}
                </div>
            )}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div
                    onMouseEnter={() => setHovered('bad')}
                    onMouseLeave={() => setHovered(null)}
                    className={`${cardBase} border-rose-500/50 bg-rose-500/5 ${badDim} ${badGlow}`}
                >
                    <div className="mb-2 text-sm font-black text-rose-400">❌ {isTr ? 'Kötü Örnek' : 'Bad Example'}</div>
                    <CodeLines code={block.bad.code} changedLines={badChanged} highlight={showDiff} toneClass="bg-amber-500/30" />
                    <div className="mt-3 flex items-start gap-2 text-xs font-bold text-rose-300">
                        <span>⚠</span>
                        <span>{isTr ? 'Neden kötü?' : 'Why is it bad?'} — {pick(block.bad.explanation, isTr)}</span>
                    </div>
                </div>

                <div
                    onMouseEnter={() => setHovered('good')}
                    onMouseLeave={() => setHovered(null)}
                    className={`${cardBase} border-emerald-500/50 bg-emerald-500/5 ${goodDim} ${goodGlow}`}
                >
                    <div className="mb-2 text-sm font-black text-emerald-400">✅ {isTr ? 'İyi Örnek' : 'Good Example'}</div>
                    <CodeLines code={block.good.code} changedLines={goodChanged} highlight={showDiff} toneClass="bg-amber-500/30" />
                    <div className="mt-3 flex items-start gap-2 text-xs font-bold text-emerald-300">
                        <span>✓</span>
                        <span>{isTr ? 'Neden iyi?' : 'Why is it good?'} — {pick(block.good.explanation, isTr)}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setShowDiff(s => !s)}
                className="mt-3 min-h-9 rounded-lg bg-amber-600 px-3 text-xs font-black text-white"
            >
                {showDiff ? (isTr ? 'Farkı Gizle' : 'Hide Diff') : (isTr ? '🔍 Farkı Göster' : '🔍 Show the Diff')}
            </button>
        </div>
    )
}
