import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// HeapStackBlock — "Stack & Heap Canlı Bellek Modeli"
//
// Öğrenme yazısındaki #3 (heap/stack) ve #4 (ArrayList/HashMap/… bellek) eksiğini
// kapatır. `new Person()` yazınca ne olur? Stack'te bir REFERANS, Heap'te bir
// NESNE oluşur ve referans nesneyi işaret eder. Bunu adım adım, referans→nesne
// oku vurgusuyla gösterir. Java öğrenenler için değer paylaşımı (primitive) ile
// referans paylaşımı (object) farkını somutlaştırır — QA'da "iki değişken aynı
// listeyi mi değiştiriyor?" aliasing buglarının kökü budur.
//
// Video gerektirmez; saf React + CSS. Referans ilişkisi renk eşleşmesi + "→ id"
// etiketi + aktif adımda hedef nesnenin parlamasıyla gösterilir (kırılgan SVG
// çizgisi yerine sağlam görsel eşleşme).
//
// Şema (block):
//   {
//     type: 'heap-stack',
//     title: { tr, en },
//     code: 'çok satırlı kaynak',
//     codeLanguage: 'java',
//     steps: [
//       {
//         line: 3, note: { tr, en },
//         stack: [
//           { name: 'age', value: '30', kind: 'primitive' },
//           { name: 'p',   ref: 'obj1', kind: 'ref' },   // ref → heap[].id
//         ],
//         heap: [
//           { id: 'obj1', type: 'Person', fields: { name: '"Ada"', age: '30' } },
//         ],
//       },
//     ],
//   }
// ─────────────────────────────────────────────────────────────────────────────

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

// Referans → nesne eşleşmesi için sabit renk paleti (id'ye göre deterministik).
const REF_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6']
const colorForId = (id, heap) => {
    const i = heap.findIndex((o) => o.id === id)
    return REF_COLORS[(i < 0 ? 0 : i) % REF_COLORS.length]
}

export default function HeapStackBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const steps = Array.isArray(block.steps) ? block.steps : []
    const codeLines = (block.code || '').replace(/\n$/, '').split('\n')

    const [idx, setIdx] = useState(0)
    const [started, setStarted] = useState(false)
    const timerRef = useRef(null)
    const [playing, setPlaying] = useState(false)

    const cur = started ? steps[idx] : null
    const heap = cur?.heap || []
    const stack = cur?.stack || []

    useEffect(() => () => clearTimeout(timerRef.current), [])
    useEffect(() => {
        if (!playing) return
        if (idx >= steps.length - 1) { setPlaying(false); return }
        timerRef.current = setTimeout(() => setIdx((i) => Math.min(i + 1, steps.length - 1)), 1300)
        return () => clearTimeout(timerRef.current)
    }, [playing, idx, steps.length])

    const begin = () => { setStarted(true); setIdx(0) }
    const play = () => { if (!started) begin(); setPlaying(true) }
    const step = (d) => { setPlaying(false); if (!started) { begin(); return } setIdx((i) => Math.min(Math.max(i + d, 0), steps.length - 1)) }
    const reset = () => { setPlaying(false); setStarted(false); setIdx(0) }

    const border = darkMode ? '#334155' : '#e2e8f0'
    const textMain = darkMode ? '#e2e8f0' : '#1e293b'
    const textSub = darkMode ? '#94a3b8' : '#64748b'
    const panelBg = darkMode ? '#111827' : '#fff'
    const activeLine = cur ? cur.line : -1

    return (
        <div data-testid="heap-stack-block" style={{ margin: '24px 0', padding: '20px', background: darkMode ? '#0b1220' : '#f8fafc', border: `1px solid ${border}`, borderRadius: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20 }}>🧩</span>
                <span style={{ fontWeight: 800, fontSize: 15, color: textMain }}>
                    {tx(block.title, isTr) || (isTr ? 'Stack & Heap Bellek Modeli' : 'Stack & Heap Memory Model')}
                </span>
                {started && <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: textSub }}>{isTr ? 'Adım' : 'Step'} {idx + 1}/{steps.length}</span>}
            </div>

            {/* Kod — aktif satır vurgulu */}
            <pre style={{ margin: '0 0 14px', padding: '10px 0', background: darkMode ? '#020617' : '#0f172a', borderRadius: 10, overflowX: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, lineHeight: 1.7 }}>
                {codeLines.map((ln, i) => {
                    const on = (i + 1) === activeLine
                    return (
                        <div key={i} style={{ display: 'flex', padding: '0 12px', background: on ? (darkMode ? '#1e3a5f' : '#1e40af') : 'transparent', borderLeft: `3px solid ${on ? '#fbbf24' : 'transparent'}`, transition: 'background 0.25s ease' }}>
                            <span style={{ width: 22, flexShrink: 0, color: on ? '#fbbf24' : '#475569', textAlign: 'right', marginRight: 10, userSelect: 'none' }}>{i + 1}</span>
                            <code style={{ color: on ? '#fff' : '#cbd5e1', whiteSpace: 'pre' }}>{ln || ' '}</code>
                        </div>
                    )
                })}
            </pre>

            {/* İki kolon: Stack | Heap */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14 }} className="heap-stack-grid">
                {/* STACK */}
                <div style={{ padding: '12px', background: panelBg, border: `1px solid ${border}`, borderRadius: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: darkMode ? '#93c5fd' : '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
                        📚 STACK <span style={{ fontWeight: 500, textTransform: 'none', color: textSub }}>({isTr ? 'yerel değişkenler' : 'local vars'})</span>
                    </div>
                    {!started && <div style={{ fontSize: 12, color: textSub }}>{isTr ? '▶ ile başlat' : 'Press ▶'}</div>}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {stack.map((s, i) => {
                            const isRef = s.kind === 'ref' || s.ref != null
                            const c = isRef ? colorForId(s.ref, heap) : (darkMode ? '#475569' : '#94a3b8')
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, border: `2px solid ${c}`, background: darkMode ? c + '18' : c + '10', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
                                    <span style={{ fontWeight: 700, color: textMain }}>{s.name}</span>
                                    <span style={{ color: textSub }}>=</span>
                                    {isRef
                                        ? <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, color: c }}>
                                            <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: c, color: '#fff' }}>ref</span>→ {s.ref}
                                          </span>
                                        : <span style={{ marginLeft: 'auto', fontWeight: 800, color: textMain }}>{String(s.value)}</span>}
                                </div>
                            )
                        })}
                        {started && stack.length === 0 && <div style={{ fontSize: 12, color: textSub }}>—</div>}
                    </div>
                </div>

                {/* HEAP */}
                <div style={{ padding: '12px', background: panelBg, border: `1px solid ${border}`, borderRadius: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: darkMode ? '#6ee7b7' : '#047857', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
                        🗄️ HEAP <span style={{ fontWeight: 500, textTransform: 'none', color: textSub }}>({isTr ? 'nesneler' : 'objects'})</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {heap.map((o) => {
                            const c = colorForId(o.id, heap)
                            // Bir stack referansı bu nesneyi işaret ediyor mu? (aktif vurgu)
                            const pointed = stack.some((s) => (s.kind === 'ref' || s.ref != null) && s.ref === o.id)
                            return (
                                <div key={o.id} style={{ padding: '10px', borderRadius: 10, border: `2px solid ${c}`, background: darkMode ? c + '18' : c + '0d', boxShadow: pointed ? `0 0 0 3px ${c}33` : 'none', transition: 'box-shadow 0.3s ease' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                        <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 4, background: c, color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>{o.id}</span>
                                        <span style={{ fontWeight: 800, color: c, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{o.type}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {Object.entries(o.fields || {}).map(([k, v]) => (
                                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5 }}>
                                                <span style={{ color: textSub }}>{k}</span>
                                                <span style={{ color: textMain, fontWeight: 600 }}>{String(v)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                        {started && heap.length === 0 && <div style={{ fontSize: 12, color: textSub }}>{isTr ? 'Henüz nesne yok' : 'No objects yet'}</div>}
                    </div>
                </div>
            </div>

            {cur?.note && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: darkMode ? '#111827' : '#eef2ff', borderLeft: '3px solid #6366f1', borderRadius: '0 8px 8px 0', fontSize: 13.5, lineHeight: 1.55, color: textMain }}>
                    {tx(cur.note, isTr)}
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                {!playing
                    ? <button type="button" onClick={play} style={ctrlBtn('#6366f1', '#fff')}>▶ {isTr ? (started ? 'Oynat' : 'Başlat') : (started ? 'Play' : 'Start')}</button>
                    : <button type="button" onClick={() => setPlaying(false)} style={ctrlBtn('#f59e0b', '#fff')}>⏸ {isTr ? 'Duraklat' : 'Pause'}</button>}
                <button type="button" onClick={() => step(-1)} disabled={!started || idx === 0} style={ctrlBtn(darkMode ? '#1e293b' : '#e2e8f0', textMain, !started || idx === 0)}>⏮ {isTr ? 'Geri' : 'Prev'}</button>
                <button type="button" onClick={() => step(1)} disabled={started && idx >= steps.length - 1} style={ctrlBtn(darkMode ? '#1e293b' : '#e2e8f0', textMain, started && idx >= steps.length - 1)}>{isTr ? 'İleri' : 'Next'} ⏭</button>
                <button type="button" onClick={reset} style={{ ...ctrlBtn('transparent', textSub), border: `1px solid ${border}` }}>↺ {isTr ? 'Sıfırla' : 'Reset'}</button>
            </div>

            <style>{`@media (max-width: 640px){ .heap-stack-grid{ grid-template-columns: 1fr !important; } }`}</style>
        </div>
    )
}

function ctrlBtn(bg, fg, disabled = false) {
    return {
        padding: '8px 16px', minHeight: 40, background: bg, color: fg, border: 'none', borderRadius: 9,
        fontWeight: 700, fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
    }
}
