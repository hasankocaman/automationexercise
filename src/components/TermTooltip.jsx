import { useEffect, useId, useRef, useState } from 'react'
import { TERM_GLOSSARY } from '../data/termGlossary'

// ─────────────────────────────────────────────────────────────────────────────
// TermTooltip + highlightGlossaryTerms — Kavram Tooltip'i
// (Documents/challenge-first-experience-plan.md §3.6, Phase 1.5)
//
// Yazılım bilmeyen kullanıcı için: metinde geçen yazılım terimlerinin ÜSTÜne
// gelince (hover/focus) / dokununca (tap) küçük bir baloncukta günlük-hayat
// benzetmesi gösterilir. `highlightGlossaryTerms` düz metni gezip bilinen
// terimlerin İLK geçtiği yeri <TermTooltip> ile sarar (blok başına en çok
// MAX_PER_TEXT). Yalnız prose render'larında kullanılır — kod blokları ASLA
// sarılmaz (TopicPage yalnız 'text'/'simple-box' string'ine uygular).
// ─────────────────────────────────────────────────────────────────────────────

const MAX_PER_TEXT = 8

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

// — Modül seviyesinde tek sefer: yüzey→key lookup + birleşik regex —
function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\/-]/g, '\\$&')
}

const SURFACE_TO_KEY = new Map()
const ALL_SURFACES = []
for (const [key, entry] of Object.entries(TERM_GLOSSARY)) {
    for (const surface of (entry.aliases || [])) {
        const low = surface.toLowerCase()
        if (!SURFACE_TO_KEY.has(low)) {
            SURFACE_TO_KEY.set(low, key)
            ALL_SURFACES.push(surface)
        }
    }
}
// Uzun formu önce eşle ("flaky test" > "flaky", "css selector" > "selector").
ALL_SURFACES.sort((a, b) => b.length - a.length)

// `\b` ASCII kelime-sınırı kullanılır (lookbehind uyumluluk riski yok; tüm
// yüzey formları ASCII). "API'ye" → "API" eşleşir; "rapid" içindeki "api"
// eşleşmez; "flaky test" tek parça eşleşir.
const TERM_REGEX = ALL_SURFACES.length
    ? new RegExp(`\\b(?:${ALL_SURFACES.map(escapeRegex).join('|')})\\b`, 'gi')
    : null

// Düz metni React düğümleri dizisine çevirir; bilinen terimlerin İLK geçtiği
// yeri <TermTooltip> ile sarar. Eşleşme yoksa metni olduğu gibi döndürür.
export function highlightGlossaryTerms(text, language, darkMode) {
    if (!TERM_REGEX || !text || typeof text !== 'string' || text.length < 3) return text
    TERM_REGEX.lastIndex = 0
    const wraps = []
    const usedKeys = new Set()
    let m
    while ((m = TERM_REGEX.exec(text)) !== null) {
        const surface = m[0]
        const key = SURFACE_TO_KEY.get(surface.toLowerCase())
        if (!key || usedKeys.has(key)) continue // her terim blok başına 1 kez
        usedKeys.add(key)
        wraps.push({ start: m.index, end: m.index + surface.length, key, surface })
        if (usedKeys.size >= MAX_PER_TEXT) break
    }
    if (wraps.length === 0) return text

    const out = []
    let cursor = 0
    wraps.forEach((w, idx) => {
        if (w.start < cursor) return // güvenlik: örtüşme
        if (w.start > cursor) out.push(text.slice(cursor, w.start))
        out.push(
            <TermTooltip
                key={`gt-${idx}-${w.start}`}
                entry={TERM_GLOSSARY[w.key]}
                surface={w.surface}
                language={language}
                darkMode={darkMode}
            />
        )
        cursor = w.end
    })
    if (cursor < text.length) out.push(text.slice(cursor))
    return out
}

export default function TermTooltip({ entry, surface, language, darkMode }) {
    const isTr = language === 'tr'
    const [open, setOpen] = useState(false)
    const wrapRef = useRef(null)
    const popId = useId()

    // Açıkken: ESC ve dışarı-tık kapatır (mobil/tap deneyimi için gerekli).
    useEffect(() => {
        if (!open) return
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
        const onDocClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
        document.addEventListener('keydown', onKey)
        document.addEventListener('mousedown', onDocClick)
        document.addEventListener('touchstart', onDocClick)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.removeEventListener('mousedown', onDocClick)
            document.removeEventListener('touchstart', onDocClick)
        }
    }, [open])

    const accent = darkMode ? '#818cf8' : '#6366f1'
    const popBg = darkMode ? '#0b1220' : '#ffffff'
    const popBorder = darkMode ? '#334155' : '#c7d2fe'
    const textMain = darkMode ? '#e2e8f0' : '#1e293b'
    const textSub = darkMode ? '#94a3b8' : '#475569'

    return (
        <span ref={wrapRef} style={{ position: 'relative', display: 'inline' }}>
            <span
                role="button"
                tabIndex={0}
                aria-expanded={open}
                aria-describedby={open ? popId : undefined}
                onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((v) => !v) }
                }}
                style={{
                    borderBottom: `1px dashed ${accent}`,
                    cursor: 'help',
                    color: 'inherit',
                    padding: '0 1px',
                    whiteSpace: 'normal',
                }}
            >
                {surface}
            </span>

            {open && (
                <span
                    id={popId}
                    role="tooltip"
                    style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: 0,
                        marginBottom: 8,
                        zIndex: 60,
                        display: 'block',
                        minWidth: 200,
                        maxWidth: 'min(300px, 82vw)',
                        padding: '10px 12px',
                        background: popBg,
                        border: `1px solid ${popBorder}`,
                        borderRadius: 12,
                        boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(15,23,42,0.15)',
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        lineHeight: 1.5,
                        fontWeight: 400,
                        cursor: 'default',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        <span style={{ fontSize: 13 }}>💬</span>
                        <strong style={{ fontSize: 13, color: accent, fontFamily: 'JetBrains Mono, monospace' }}>
                            {tx(entry.term, isTr) || surface}
                        </strong>
                    </span>
                    <span style={{ display: 'block', fontSize: 13, color: textMain, marginBottom: 6 }}>
                        {tx(entry.analogy, isTr)}
                    </span>
                    <span style={{ display: 'block', fontSize: 12, color: textSub }}>
                        {tx(entry.short, isTr)}
                    </span>
                </span>
            )}
        </span>
    )
}
