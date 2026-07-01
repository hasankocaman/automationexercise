import { useState } from 'react'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'
}

function shuffle(items) {
    const arr = [...items]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

// Drag-and-drop reordering via the native HTML5 DnD API, plus ↑/↓ buttons as
// an accessible/mobile-friendly fallback (native DnD doesn't work on touch).
export default function OrderSort({ block, isTr, darkMode, onResult }) {
    const [items, setItems] = useState(() => shuffle(block.items))
    const [dragIndex, setDragIndex] = useState(null)
    const [checked, setChecked] = useState(false)

    const reorder = (from, to) => {
        if (checked || from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return
        setItems(curr => {
            const next = [...curr]
            const [moved] = next.splice(from, 1)
            next.splice(to, 0, moved)
            return next
        })
    }

    const handleCheck = () => {
        const isCorrect = items.every((item, idx) => item.order === idx + 1)
        setChecked(true)
        onResult({
            success: isCorrect,
            items,
            currentFirst: items[0],
            correctFirst: block.items.find(item => item.order === 1),
        })
    }

    return (
        <div>
            <div className="grid gap-2">
                {items.map((item, idx) => {
                    const isRight = checked && item.order === idx + 1
                    const isWrong = checked && item.order !== idx + 1
                    return (
                        <div
                            key={item.id}
                            draggable={!checked}
                            onDragStart={() => setDragIndex(idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => { if (dragIndex !== null) reorder(dragIndex, idx); setDragIndex(null) }}
                            onDragEnd={() => setDragIndex(null)}
                            className={`flex items-center gap-2 rounded-lg border-2 p-2 transition-all duration-200 ${
                                !checked ? `cursor-grab active:cursor-grabbing ${panelCls(darkMode)}` : isRight ? 'border-emerald-500/60 bg-emerald-500/10' : 'border-rose-500/60 bg-rose-500/10'
                            } ${dragIndex === idx ? 'scale-[1.02] opacity-70' : ''}`}
                        >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky-600 text-xs font-black text-white">{idx + 1}</span>
                            <span className="flex-1 text-sm font-bold">{pick(item.text, isTr)}</span>
                            {isRight && <span>✅</span>}
                            {isWrong && <span>❌</span>}
                            {!checked && (
                                <>
                                    <button type="button" onClick={() => reorder(idx, idx - 1)} disabled={idx === 0} className="min-h-8 min-w-8 rounded-md bg-slate-700 text-xs font-bold text-white disabled:opacity-30">↑</button>
                                    <button type="button" onClick={() => reorder(idx, idx + 1)} disabled={idx === items.length - 1} className="min-h-8 min-w-8 rounded-md bg-slate-700 text-xs font-bold text-white disabled:opacity-30">↓</button>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>

            {!checked ? (
                <button onClick={handleCheck} className="mt-3 min-h-9 rounded-lg bg-sky-600 px-3 text-xs font-black text-white">
                    {isTr ? 'Kontrol Et' : 'Check Order'}
                </button>
            ) : (
                <div className={`mt-3 rounded-lg border px-3 py-2 text-xs font-bold ${items.every((it, idx) => it.order === idx + 1) ? `border-emerald-500/40 bg-emerald-500/10 ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}` : `border-rose-500/40 bg-rose-500/10 ${darkMode ? 'text-rose-300' : 'text-rose-700'}`}`}>
                    {items.every((it, idx) => it.order === idx + 1)
                        ? (isTr ? '🎉 Doğru sıra!' : '🎉 Correct order!')
                        : (isTr ? '🔧 Kırmızı satırlar yanlış yerde — Tekrar Dene ile yeni bir karışık sıra dene.' : '🔧 The red rows are out of place — hit Try Again for a fresh shuffle.')}
                </div>
            )}
        </div>
    )
}
