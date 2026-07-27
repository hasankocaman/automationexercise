import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// CodeTraceBlock — "Canlı Kod Yürüyüşü" (line-by-line execution trace)
//
// Öğrenme yazısındaki #2 eksiği kapatır: kullanıcı kodu sadece OKUMAZ, satır satır
// YÜRÜR — for döngüsünde i=0 → i=1 → i=2, her adımda hangi satırın çalıştığını ve
// değişkenlerin o an ne değerde olduğunu canlı görür. Video gerektirmez; saf
// React state + CSS. Java/Python öğrenenler için "kod kafamda çalışıyor" hissini
// verir (CLAUDE.md §9.1 görsel+animasyon, §20 frame-by-frame ilerleme).
//
// Şema (block):
//   {
//     type: 'code-trace',
//     title: { tr, en },                 // (ops.) başlık
//     code: 'çok satırlı kaynak kod',     // string; satırlar 1-indexli
//     codeLanguage: 'java',
//     steps: [
//       { line: 4, note: { tr, en }, vars: { i: '0', sum: '0' }, output: '' },
//       { line: 5, note: { tr, en }, vars: { i: '0', sum: '0' }, output: '0 ' },
//       ...
//     ],
//   }
// `line`  → o adımda vurgulanacak (1-indexli) kaynak satırı.
// `vars`  → o adımdaki değişken tablosu (yeni/değişen değer sarı parlar).
// `output`→ (ops.) o ana kadar birikmiş program çıktısı.
// ─────────────────────────────────────────────────────────────────────────────

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

export default function CodeTraceBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const steps = Array.isArray(block.steps) ? block.steps : []
    const codeLines = (block.code || '').replace(/\n$/, '').split('\n')

    const [idx, setIdx] = useState(0)          // -1 = başlamadı, 0..n-1 = adım
    const [started, setStarted] = useState(false)
    const [playing, setPlaying] = useState(false)
    const timerRef = useRef(null)

    const cur = started ? steps[idx] : null
    const prev = started && idx > 0 ? steps[idx - 1] : null

    useEffect(() => () => clearTimeout(timerRef.current), [])

    useEffect(() => {
        if (!playing) return
        if (idx >= steps.length - 1) { setPlaying(false); return }
        timerRef.current = setTimeout(() => setIdx((i) => Math.min(i + 1, steps.length - 1)), 1100)
        return () => clearTimeout(timerRef.current)
    }, [playing, idx, steps.length])

    const begin = () => { setStarted(true); setIdx(0) }
    const play = () => { if (!started) begin(); setPlaying(true) }
    const pause = () => setPlaying(false)
    const step = (d) => { setPlaying(false); if (!started) { begin(); return } setIdx((i) => Math.min(Math.max(i + d, 0), steps.length - 1)) }
    const reset = () => { setPlaying(false); setStarted(false); setIdx(0) }

    const border = darkMode ? '#334155' : '#e2e8f0'
    const textMain = darkMode ? '#e2e8f0' : '#1e293b'
    const textSub = darkMode ? '#94a3b8' : '#64748b'
    const activeLine = cur ? cur.line : -1

    // Değişen değişkenleri tespit et (sarı parlama için).
    const changedKeys = new Set()
    if (cur?.vars) {
        Object.keys(cur.vars).forEach((k) => {
            if (!prev?.vars || prev.vars[k] !== cur.vars[k]) changedKeys.add(k)
        })
    }

    return (
        <div style={{ margin: '24px 0', padding: '20px', background: darkMode ? '#0b1220' : '#f8fafc', border: `1px solid ${border}`, borderRadius: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20 }}>🚶</span>
                <span style={{ fontWeight: 800, fontSize: 15, color: textMain }}>
                    {tx(block.title, isTr) || (isTr ? 'Canlı Kod Yürüyüşü' : 'Live Code Walkthrough')}
                </span>
                {started && (
                    <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: textSub }}>
                        {isTr ? 'Adım' : 'Step'} {idx + 1}/{steps.length}
                    </span>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 14 }} className="code-trace-grid">
                {/* Kaynak kod — aktif satır vurgulu */}
                <pre style={{ margin: 0, padding: '12px 0', background: darkMode ? '#020617' : '#0f172a', borderRadius: 10, overflowX: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, lineHeight: 1.7 }}>
                    {codeLines.map((ln, i) => {
                        const on = (i + 1) === activeLine
                        return (
                            <div key={i} style={{
                                display: 'flex', padding: '0 12px',
                                background: on ? (darkMode ? '#1e3a5f' : '#1e40af') : 'transparent',
                                borderLeft: `3px solid ${on ? '#fbbf24' : 'transparent'}`,
                                transition: 'background 0.25s ease',
                            }}>
                                <span style={{ width: 24, flexShrink: 0, color: on ? '#fbbf24' : '#475569', userSelect: 'none', textAlign: 'right', marginRight: 12 }}>{i + 1}</span>
                                <code style={{ color: on ? '#fff' : '#cbd5e1', whiteSpace: 'pre' }}>{ln || ' '}</code>
                                {on && <span style={{ marginLeft: 8, color: '#fbbf24' }}>◀</span>}
                            </div>
                        )
                    })}
                </pre>

                {/* Değişken tablosu + çıktı */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ padding: '10px 12px', background: darkMode ? '#111827' : '#fff', border: `1px solid ${border}`, borderRadius: 10, minHeight: 80 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: textSub, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                            {isTr ? 'Değişkenler' : 'Variables'}
                        </div>
                        {!started && <div style={{ fontSize: 12, color: textSub }}>{isTr ? '▶ ile başlat' : 'Press ▶ to start'}</div>}
                        {cur?.vars && Object.keys(cur.vars).length === 0 && <div style={{ fontSize: 12, color: textSub }}>—</div>}
                        {cur?.vars && Object.entries(cur.vars).map(([k, v]) => {
                            const changed = changedKeys.has(k)
                            return (
                                <div key={k} style={{
                                    display: 'flex', justifyContent: 'space-between', gap: 10, padding: '4px 8px', marginBottom: 3, borderRadius: 6,
                                    background: changed ? (darkMode ? '#3b2f0a' : '#fef3c7') : 'transparent',
                                    fontFamily: 'JetBrains Mono, monospace', fontSize: 13, transition: 'background 0.3s ease',
                                }}>
                                    <span style={{ color: darkMode ? '#93c5fd' : '#1d4ed8', fontWeight: 700 }}>{k}</span>
                                    <span style={{ color: changed ? (darkMode ? '#fbbf24' : '#b45309') : textMain, fontWeight: changed ? 800 : 600 }}>{String(v)}</span>
                                </div>
                            )
                        })}
                    </div>

                    {cur && cur.output != null && (
                        <div style={{ padding: '8px 12px', background: darkMode ? '#020617' : '#0f172a', borderRadius: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>
                                {isTr ? 'Çıktı' : 'Output'}
                            </div>
                            <code style={{ color: '#4ade80', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, whiteSpace: 'pre-wrap' }}>{String(cur.output) || ' '}</code>
                        </div>
                    )}
                </div>
            </div>

            {/* Adım notu */}
            {cur?.note && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: darkMode ? '#111827' : '#eef2ff', borderLeft: '3px solid #6366f1', borderRadius: '0 8px 8px 0', fontSize: 13.5, lineHeight: 1.55, color: textMain }}>
                    {tx(cur.note, isTr)}
                </div>
            )}

            {/* Kontroller */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                {!playing
                    ? <button type="button" onClick={play} style={ctrlBtn('#6366f1', '#fff')}>▶ {isTr ? (started ? 'Oynat' : 'Başlat') : (started ? 'Play' : 'Start')}</button>
                    : <button type="button" onClick={pause} style={ctrlBtn('#f59e0b', '#fff')}>⏸ {isTr ? 'Duraklat' : 'Pause'}</button>}
                <button type="button" onClick={() => step(-1)} disabled={!started || idx === 0} style={ctrlBtn(darkMode ? '#1e293b' : '#e2e8f0', textMain, !started || idx === 0)}>⏮ {isTr ? 'Geri' : 'Prev'}</button>
                <button type="button" onClick={() => step(1)} disabled={started && idx >= steps.length - 1} style={ctrlBtn(darkMode ? '#1e293b' : '#e2e8f0', textMain, started && idx >= steps.length - 1)}>{isTr ? 'İleri' : 'Next'} ⏭</button>
                <button type="button" onClick={reset} style={{ ...ctrlBtn('transparent', textSub), border: `1px solid ${border}` }}>↺ {isTr ? 'Sıfırla' : 'Reset'}</button>
            </div>

            {started && idx >= steps.length - 1 && (
                <div style={{ marginTop: 12, padding: '8px 14px', background: '#10b98118', border: '1px solid #10b981', borderRadius: 8, fontSize: 13, color: '#10b981', fontWeight: 700 }}>
                    ✓ {isTr ? 'Yürüyüş tamamlandı — kod baştan sona çalıştı.' : 'Walkthrough complete — the code ran start to finish.'}
                </div>
            )}

            <style>{`@media (max-width: 640px){ .code-trace-grid{ grid-template-columns: 1fr !important; } }`}</style>
        </div>
    )
}

function ctrlBtn(bg, fg, disabled = false) {
    return {
        padding: '8px 16px', minHeight: 40, background: bg, color: fg, border: 'none', borderRadius: 9,
        fontWeight: 700, fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
    }
}
