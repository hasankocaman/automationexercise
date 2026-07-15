import { useState } from 'react'

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
}

const BAND_H = 64
const GAP = 8
const MIN_W = 90
const MAX_W = 300
const VIEW_W = 320

function PyramidDiagram({ nodes, selectedId, onSelect }) {
    const n = nodes.length
    const viewH = n * (BAND_H + GAP) - GAP

    return (
        <svg viewBox={`0 0 ${VIEW_W} ${viewH}`} style={{ width: '100%', maxWidth: 360, height: 'auto' }} aria-label="diagram">
            {nodes.map((node, i) => {
                const y0 = i * (BAND_H + GAP)
                const y1 = y0 + BAND_H
                const topW = MIN_W + (MAX_W - MIN_W) * (i / n)
                const botW = MIN_W + (MAX_W - MIN_W) * ((i + 1) / n)
                const cx = VIEW_W / 2
                const points = [
                    [cx - topW / 2, y0],
                    [cx + topW / 2, y0],
                    [cx + botW / 2, y1],
                    [cx - botW / 2, y1],
                ].map(p => p.join(',')).join(' ')
                const isSelected = selectedId === node.id
                const isDimmed = selectedId && !isSelected

                return (
                    <g
                        key={node.id}
                        onClick={() => onSelect(node.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <polygon
                            points={points}
                            fill={node.color || '#6366f1'}
                            opacity={isDimmed ? 0.35 : 0.85}
                            stroke={isSelected ? '#fff' : 'transparent'}
                            strokeWidth={isSelected ? 3 : 0}
                            style={{ transition: 'opacity 0.3s ease, stroke-width 0.3s ease' }}
                        />
                        <text
                            x={cx}
                            y={(y0 + y1) / 2 + 5}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize="13"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                            style={{ pointerEvents: 'none' }}
                        >
                            {node.label}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

function ListDiagram({ nodes, selectedId, onSelect }) {
    return (
        <div className="grid gap-2">
            {nodes.map(node => {
                const isSelected = selectedId === node.id
                return (
                    <button
                        key={node.id}
                        onClick={() => onSelect(node.id)}
                        className="min-h-12 rounded-lg px-4 text-left text-sm font-black text-white transition-all duration-300"
                        style={{
                            background: node.color || '#6366f1',
                            opacity: selectedId && !isSelected ? 0.45 : 0.9,
                            outline: isSelected ? '3px solid white' : 'none',
                        }}
                    >
                        {node.label}
                    </button>
                )
            })}
        </div>
    )
}

export default function InteractiveDiagramBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const nodes = (block.nodes || []).map(node => ({ ...node, label: pick(node.label, isTr) }))
    const [selectedId, setSelectedId] = useState(null)
    const selected = nodes.find(n => n.id === selectedId)

    return (
        <div className="mt-4">
            {block.title && (
                <div className={`mb-3 text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {pick(block.title, isTr)}
                </div>
            )}

            <div className="flex justify-center">
                {block.variant === 'pyramid'
                    ? <PyramidDiagram nodes={nodes} selectedId={selectedId} onSelect={setSelectedId} />
                    : <ListDiagram nodes={nodes} selectedId={selectedId} onSelect={setSelectedId} />}
            </div>

            {selected ? (
                <div className={`mt-3 rounded-lg border p-4 ${panelCls(darkMode)}`}>
                    <div className="text-sm font-black" style={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                        {selected.label}
                    </div>
                    <p className="mt-1 text-sm opacity-90">{pick(selected.detail, isTr)}</p>
                    {selected.stats && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                            {Object.entries(selected.stats).map(([key, value]) => (
                                <span key={key} className={`rounded-md border px-2 py-1 ${panelCls(darkMode)}`}>
                                    {key}: <span style={{ color: darkMode ? '#f1f5f9' : '#1e293b' }}>{pick(value, isTr)}</span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className={`mt-3 rounded-lg border p-3 text-center text-xs font-bold opacity-60 ${panelCls(darkMode)}`}>
                    {isTr ? '👆 Detay görmek için bir katmana tıkla' : '👆 Click a layer to see details'}
                </div>
            )}
        </div>
    )
}
