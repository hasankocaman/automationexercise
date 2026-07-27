import { useEffect, useState } from 'react'
import { CodeBlock } from './TopicPage'
import { getCompletedExercises, markExerciseComplete, addXP, subscribeToXpChanges } from '../lib/xp'
import ConfettiExplosion from './ConfettiExplosion'

// ─────────────────────────────────────────────────────────────────────────────
// PredictionBlock — "Önce Tahmin Et, Sonra Gör" (Prediction / active recall)
//
// Öğrenme bilimindeki en güçlü tekniklerden biri "prediction"dır: kullanıcı kodun
// çıktısını GÖRMEDEN önce ne olacağını tahmin etmeye ZORLANIR (commitment).
// Tahminini onayladıktan sonra gerçek sonuç + neden açıklaması açılır. Bu, pasif
// okumayı aktif akıl yürütmeye çevirir (bkz. CLAUDE.md §17 Prediction, §18 dinamik
// hata akışı — yanlışta moral bozucu kırmızı ekran yok, mikro-geri bildirim var).
//
// Şema (block):
//   {
//     type: 'prediction',
//     id: 'java-int-overflow-pred',            // XP tekilliği için ZORUNLU
//     xpReward: 15,
//     relatedTopicId: 'java-primitives',        // hangi konunun devamı
//     prompt: { tr, en },                        // "Bu kodun çıktısı ne olur?"
//     code: { tr, en } | 'string',              // tahmin edilecek snippet
//     codeLanguage: 'java',
//     options: [
//       { id: 'a', label: { tr, en }, correct: true, why: { tr, en } },
//       ...
//     ],
//     reveal: { tr, en },   // doğru cevap açıklaması (neden bu sonuç?)
//     output: { tr, en },   // (ops.) gerçek program çıktısı / "Compile error: ..."
//   }
// ─────────────────────────────────────────────────────────────────────────────

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

export default function PredictionBlock({ block, darkMode, language, onFirstSuccess }) {
    const isTr = language === 'tr'
    const options = Array.isArray(block.options) ? block.options : []
    const correctIdx = options.findIndex((o) => o.correct)

    const [picked, setPicked] = useState(null)      // seçilen ama henüz onaylanmamış
    const [revealed, setRevealed] = useState(false) // tahmin onaylandı mı
    const [wasRight, setWasRight] = useState(false)
    const [celebrating, setCelebrating] = useState(false)
    const [completed, setCompleted] = useState(getCompletedExercises)

    useEffect(() => subscribeToXpChanges(() => setCompleted(getCompletedExercises())), [])
    const alreadyDone = block.id ? completed.includes(block.id) : false

    const confirm = () => {
        if (picked == null) return
        const right = picked === correctIdx
        setWasRight(right)
        setRevealed(true)
        // XP yalnızca İLK denemede doğru tahmin için (ezbere tıklamayı ödüllendirme).
        if (right && block.id && !alreadyDone) {
            addXP(block.xpReward ?? 10)
            markExerciseComplete(block.id)
            setCompleted(getCompletedExercises())
            setCelebrating(true)
            onFirstSuccess?.()
        }
    }

    const retry = () => {
        setPicked(null)
        setRevealed(false)
        setWasRight(false)
    }

    const border = darkMode ? '#334155' : '#e2e8f0'
    const cardBg = darkMode ? '#0b1220' : '#f8fafc'
    const textMain = darkMode ? '#e2e8f0' : '#1e293b'
    const textSub = darkMode ? '#94a3b8' : '#64748b'

    return (
        <div style={{ position: 'relative', margin: '24px 0', padding: '20px', background: cardBg, border: `1px solid ${border}`, borderRadius: 16 }}>
            {celebrating && <ConfettiExplosion duration={2500} particleCount={18} onComplete={() => setCelebrating(false)} />}

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>🔮</span>
                <span style={{ fontWeight: 800, fontSize: 15, color: textMain }}>
                    {isTr ? 'Önce Tahmin Et' : 'Predict First'}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: textSub, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {isTr ? 'aktif hatırlama' : 'active recall'}
                </span>
            </div>

            <div style={{ fontSize: 14, fontWeight: 600, color: textMain, marginBottom: 8 }}>
                {tx(block.prompt, isTr)}
            </div>

            {block.code != null && (
                <CodeBlock code={block.code} language={block.codeLanguage || 'java'} darkMode={darkMode} />
            )}

            {/* Tahmin seçenekleri */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                {options.map((opt, i) => {
                    const isPicked = picked === i
                    const isCorrect = i === correctIdx
                    let bg = darkMode ? '#111827' : '#fff'
                    let bd = border
                    let fg = textMain
                    if (revealed) {
                        if (isCorrect) { bg = darkMode ? '#052e2b' : '#ecfdf5'; bd = '#10b981'; fg = darkMode ? '#6ee7b7' : '#047857' }
                        else if (isPicked) { bg = darkMode ? '#3b1d1d' : '#fef2f2'; bd = '#f97316'; fg = darkMode ? '#fdba74' : '#c2410c' }
                    } else if (isPicked) { bg = darkMode ? '#1e293b' : '#eef2ff'; bd = '#6366f1' }
                    return (
                        <button
                            key={opt.id ?? i}
                            type="button"
                            disabled={revealed}
                            onClick={() => setPicked(i)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                                padding: '11px 14px', minHeight: 44, background: bg, color: fg,
                                border: `2px solid ${bd}`, borderRadius: 10, cursor: revealed ? 'default' : 'pointer',
                                fontSize: 14, fontWeight: 600, transition: 'all 0.2s ease', width: '100%',
                            }}
                        >
                            <span style={{
                                flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                                border: `2px solid ${isPicked || (revealed && isCorrect) ? bd : textSub}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800,
                            }}>
                                {revealed && isCorrect ? '✓' : revealed && isPicked ? '✕' : String.fromCharCode(65 + i)}
                            </span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{tx(opt.label, isTr)}</span>
                        </button>
                    )
                })}
            </div>

            {!revealed && (
                <button
                    type="button"
                    onClick={confirm}
                    disabled={picked == null}
                    style={{
                        marginTop: 14, padding: '10px 20px', minHeight: 44,
                        background: picked == null ? (darkMode ? '#1e293b' : '#e2e8f0') : '#6366f1',
                        color: picked == null ? textSub : '#fff', border: 'none', borderRadius: 10,
                        fontWeight: 700, fontSize: 14, cursor: picked == null ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isTr ? 'Tahminimi Onayla' : 'Lock in my prediction'}
                </button>
            )}

            {/* Sonuç açıklaması */}
            {revealed && (
                <div style={{ marginTop: 16 }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10,
                        background: wasRight ? (darkMode ? '#052e2b' : '#ecfdf5') : (darkMode ? '#3b2f1d' : '#fffbeb'),
                        border: `1px solid ${wasRight ? '#10b981' : '#f59e0b'}`, marginBottom: 12,
                    }}>
                        <span style={{ fontSize: 18 }}>{wasRight ? '🎉' : '🧭'}</span>
                        <span style={{ fontWeight: 700, fontSize: 14, color: wasRight ? (darkMode ? '#6ee7b7' : '#047857') : (darkMode ? '#fcd34d' : '#b45309') }}>
                            {wasRight
                                ? (isTr ? 'Doğru tahmin! Zihnindeki model çalışıyor.' : 'Correct prediction! Your mental model works.')
                                : (isTr ? 'Yakındın — asıl öğrenme tam burada başlıyor. Neden?' : 'Close — the real learning starts right here. Here is why:')}
                        </span>
                    </div>

                    {block.output != null && (
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: textSub, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>
                                {isTr ? 'Gerçek Çıktı' : 'Actual Output'}
                            </div>
                            <pre style={{
                                margin: 0, padding: '10px 14px', background: darkMode ? '#020617' : '#0f172a',
                                color: '#4ade80', borderRadius: 8, fontFamily: 'JetBrains Mono, monospace',
                                fontSize: 13, overflowX: 'auto', whiteSpace: 'pre-wrap',
                            }}>
                                {tx(block.output, isTr)}
                            </pre>
                        </div>
                    )}

                    <div style={{ fontSize: 14, lineHeight: 1.6, color: textMain }}>
                        {tx(block.reveal, isTr)}
                    </div>

                    {/* Seçilen yanlış şıkkın kendi mini açıklaması (varsa) */}
                    {!wasRight && picked != null && options[picked]?.why && (
                        <div style={{ marginTop: 10, padding: '8px 12px', borderLeft: '3px solid #f59e0b', background: darkMode ? '#1e293b' : '#fff7ed', fontSize: 13, color: textSub, borderRadius: '0 8px 8px 0' }}>
                            {tx(options[picked].why, isTr)}
                        </div>
                    )}

                    {!wasRight && (
                        <button
                            type="button"
                            onClick={retry}
                            style={{
                                marginTop: 14, padding: '8px 18px', minHeight: 40, background: 'transparent',
                                color: '#6366f1', border: '2px solid #6366f1', borderRadius: 10,
                                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                            }}
                        >
                            {isTr ? '↻ Tekrar dene' : '↻ Try again'}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
