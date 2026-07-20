import { useEffect, useRef, useState } from 'react'
import { getCompletedExercises, subscribeToXpChanges } from '../lib/xp'

// Framework Mimarisi pilotu (Documents/sandbox-and-framework-plan.md §4.0) —
// kullanıcı isteği (2026-07-21): "önce büyük resmi görsel/animasyonlu gör,
// sonra adım adım kendin inşa et, ilerledikçe bu parçayı tamamladın diye
// gör — yapboz parçaları gibi". Bu blok sekmenin EN BAŞINA konur: 4 mimari
// parçayı (Core/Base, POM, SOLID, Test/Data) görsel kartlar olarak gösterir,
// her parçanın kendi build-adımındaki code-playground'u (bkz. `exerciseId`)
// ilk kez başarıyla bitince o kart "kilitli"den "inşa edildi"ye döner —
// sayfa boyunca aşağı indikçe CANLI güncellenir (xp.js'in aynı
// subscribeToXpChanges/getCompletedExercises mekanizması, CodePlaygroundBlock
// ile birebir aynı veri kaynağı).

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

const PIECE_COLORS = [
    { stroke: '#f59e0b', bgLight: 'rgba(245,158,11,0.12)', bgDark: 'rgba(245,158,11,0.16)' },
    { stroke: '#0ea5e9', bgLight: 'rgba(14,165,233,0.12)', bgDark: 'rgba(14,165,233,0.16)' },
    { stroke: '#8b5cf6', bgLight: 'rgba(139,92,246,0.12)', bgDark: 'rgba(139,92,246,0.16)' },
    { stroke: '#10b981', bgLight: 'rgba(16,185,129,0.12)', bgDark: 'rgba(16,185,129,0.16)' },
]

export default function FrameworkPuzzleBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const pieces = block.pieces || []
    const [completed, setCompleted] = useState(() => getCompletedExercises())
    const seenDoneRef = useRef(new Set())
    const [justUnlocked, setJustUnlocked] = useState(null)

    useEffect(() => subscribeToXpChanges(() => setCompleted(getCompletedExercises())), [])

    useEffect(() => {
        for (const piece of pieces) {
            const isDone = completed.includes(piece.exerciseId)
            if (isDone && !seenDoneRef.current.has(piece.id)) {
                seenDoneRef.current.add(piece.id)
                setJustUnlocked(piece.id)
                const t = setTimeout(() => setJustUnlocked((cur) => (cur === piece.id ? null : cur)), 1500)
                return () => clearTimeout(t)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completed])

    const doneCount = pieces.filter((p) => completed.includes(p.exerciseId)).length
    const allDone = pieces.length > 0 && doneCount === pieces.length

    return (
        <div
            className={`mt-2 mb-6 rounded-2xl border-2 p-4 md:p-6 ${darkMode ? 'border-indigo-700/50 bg-gray-800/60' : 'border-indigo-200 bg-indigo-50/50'}`}
            data-testid="framework-puzzle"
        >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h3 className={`text-base md:text-lg font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    🧩 {pick(block.title, isTr)}
                </h3>
                <span
                    data-testid="framework-puzzle-progress"
                    className={`rounded-full px-3 py-1 text-xs font-black whitespace-nowrap ${allDone
                        ? (darkMode ? 'bg-emerald-800/60 text-emerald-200' : 'bg-emerald-100 text-emerald-700')
                        : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600 border border-gray-200')}`}
                >
                    {doneCount}/{pieces.length} {isTr ? 'parça tamamlandı' : 'pieces built'}
                </span>
            </div>
            {block.intro && (
                <p className={`text-sm mb-5 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {pick(block.intro, isTr)}
                </p>
            )}

            <div className="flex flex-col">
                {pieces.map((piece, i) => {
                    const isDone = completed.includes(piece.exerciseId)
                    const color = PIECE_COLORS[i % PIECE_COLORS.length]
                    const isJust = justUnlocked === piece.id
                    const isLast = i === pieces.length - 1
                    return (
                        <div key={piece.id} className="flex gap-3">
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div
                                    data-testid={`framework-piece-${piece.id}`}
                                    data-done={isDone}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${isJust ? 'scale-125' : 'scale-100'}`}
                                    style={{
                                        background: isDone ? color.stroke : 'transparent',
                                        border: `2.5px ${isDone ? 'solid' : 'dashed'} ${isDone ? color.stroke : (darkMode ? '#4b5563' : '#cbd5e1')}`,
                                        boxShadow: isJust ? `0 0 22px ${color.stroke}` : 'none',
                                    }}
                                >
                                    {isDone ? <span className="text-white">✓</span> : <span className="opacity-40">🔒</span>}
                                </div>
                                {!isLast && (
                                    <div
                                        className="flex-1 w-0.5 my-1"
                                        style={{ background: isDone ? color.stroke : (darkMode ? '#374151' : '#e2e8f0'), opacity: isDone ? 0.6 : 1, minHeight: '14px' }}
                                    />
                                )}
                            </div>
                            <div className={isLast ? 'flex-1' : 'flex-1 pb-3'}>
                                <div
                                    className={`rounded-xl border-2 px-4 py-3 transition-all duration-300 ${isDone ? '' : 'opacity-60'}`}
                                    style={{
                                        borderColor: isDone ? color.stroke : (darkMode ? '#374151' : '#e2e8f0'),
                                        background: isDone ? (darkMode ? color.bgDark : color.bgLight) : 'transparent',
                                    }}
                                >
                                    <div className={`font-bold text-sm flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        <span>{piece.emoji}</span> {pick(piece.label, isTr)}
                                    </div>
                                    <div className={`text-xs mt-0.5 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {pick(piece.desc, isTr)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {allDone && (
                <div
                    data-testid="framework-puzzle-complete"
                    className={`mt-4 rounded-xl border-2 px-4 py-3 text-center font-bold text-sm ${darkMode ? 'border-emerald-600 bg-emerald-900/30 text-emerald-200' : 'border-emerald-300 bg-emerald-50 text-emerald-700'}`}
                >
                    🎉 {isTr ? "Framework'ü uçtan uca inşa ettin!" : "You built the framework end to end!"}
                </div>
            )}
        </div>
    )
}
