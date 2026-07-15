import { useEffect, useMemo, useRef, useState } from 'react'
import { getCompletedExercises, addXP, markExerciseComplete, subscribeToXpChanges } from '../lib/xp'

/* ─────────────────────────────────────────────────────────────────────────
   VideoSceneBlock — `type: 'video-scene'` (Film Bloğu)

   Veri-güdümlü mini film oynatıcı: aktörler (emoji + etiket) yüzde
   koordinatlarla sahneye yerleşir, sahneden sahneye CSS transition ile
   süzülerek hareket eder; aktörler arası akış SVG "beam" çizgileriyle
   gösterilir. Altyazı barı + opsiyonel kod satırı + oynatıcı kontrolleri
   (▶/⏸, ⏮/⏭, ↺, hız, tıklanabilir bölüm pip'leri) video hissi verir.

   Veri şeması PILOT_PLAN_ve_PROMPT.md §2'de; ilk kullanım llmAgentsData.js
   `ragPipelineFilm`. XP tekilliği block.id üzerinden lib/xp.js ile sağlanır
   (ChallengeBlock kalıbı). prefers-reduced-motion → geçişsiz slayt modu.
   ───────────────────────────────────────────────────────────────────────── */

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

const SPEEDS = [1, 1.5, 2]
const DEFAULT_SCENE_MS = 3200
const DEFAULT_STAGE_HEIGHT = 260

export default function VideoSceneBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const actors = block.actors || []
    const scenes = block.scenes || []
    const sceneMs = block.sceneDurationMs ?? DEFAULT_SCENE_MS
    const stageHeight = block.stageHeight ?? DEFAULT_STAGE_HEIGHT

    const [sceneIdx, setSceneIdx] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [speedIdx, setSpeedIdx] = useState(0)
    const [completed, setCompleted] = useState(getCompletedExercises)
    const [xpPop, setXpPop] = useState(false)
    const timerRef = useRef(null)

    // Kullanıcı sistem ayarında animasyonları kapattıysa slayt moduna düş
    const noMotion = useMemo(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        []
    )

    useEffect(() => subscribeToXpChanges(() => setCompleted(getCompletedExercises())), [])
    useEffect(() => () => clearTimeout(timerRef.current), [])

    const scene = scenes[sceneIdx] || { positions: {} }
    const lastIdx = scenes.length - 1
    const atEnd = sceneIdx === lastIdx
    const alreadyPaid = block.id ? completed.includes(block.id) : true

    /* ── Otomatik oynatma: sahne süresi dolunca ilerle, sonda dur ── */
    useEffect(() => {
        clearTimeout(timerRef.current)
        if (!playing) return
        if (sceneIdx >= lastIdx) {
            setPlaying(false)
            return
        }
        timerRef.current = setTimeout(
            () => setSceneIdx(i => Math.min(i + 1, lastIdx)),
            sceneMs / SPEEDS[speedIdx]
        )
        return () => clearTimeout(timerRef.current)
    }, [playing, sceneIdx, speedIdx, sceneMs, lastIdx])

    /* ── Son sahneye ulaşınca XP'yi bir kez öde ── */
    useEffect(() => {
        if (!atEnd || scenes.length < 2) return
        if (!block.id || alreadyPaid) return
        addXP(Math.max(0, block.xpReward ?? 0))
        markExerciseComplete(block.id)
        setCompleted(getCompletedExercises())
        setXpPop(true)
    }, [atEnd]) // eslint-disable-line react-hooks/exhaustive-deps

    function seekTo(idx) {
        setPlaying(false)
        setSceneIdx(Math.max(0, Math.min(idx, lastIdx)))
    }

    function togglePlay() {
        if (atEnd && !playing) {
            // Sonda ▶'e basılırsa baştan oynat
            setSceneIdx(0)
            setPlaying(true)
            return
        }
        setPlaying(p => !p)
    }

    function replay() {
        setPlaying(false)
        setSceneIdx(0)
    }

    /* ── Ortak sınıflar ── */
    const card = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    const subtle = darkMode ? 'text-slate-400' : 'text-slate-500'
    const btnCls = `min-w-9 min-h-9 px-2 rounded-lg border text-sm font-semibold transition-colors ${
        darkMode
            ? 'border-slate-600 text-slate-200 hover:bg-slate-800 disabled:opacity-40'
            : 'border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40'
    }`

    const actorTransition = noMotion
        ? 'none'
        : 'left 0.8s cubic-bezier(0.4, 0, 0.2, 1), top 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'

    const beams = scene.beams || []

    return (
        <div className={`mt-6 rounded-2xl border p-4 md:p-5 ${card}`} data-testid="video-scene-block">
            {/* ── Başlık + XP durumu ── */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h4 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {pick(block.title, isTr)}
                </h4>
                <span className={`rounded px-2 py-1 font-mono text-xs ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                    {isTr ? `Sahne ${sceneIdx + 1}/${scenes.length}` : `Scene ${sceneIdx + 1}/${scenes.length}`}
                </span>
            </div>

            {/* ── Sahne ── */}
            <div
                className={`relative w-full overflow-hidden rounded-xl border ${
                    darkMode
                        ? 'border-slate-700 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/40'
                        : 'border-slate-200 bg-gradient-to-br from-slate-50 via-white to-violet-50'
                }`}
                style={{ height: stageHeight }}
            >
                {/* Beam'ler: aktör merkezleri arası animasyonlu akış çizgileri */}
                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    {beams.map((beam, bi) => {
                        const from = scene.positions?.[beam.from]
                        const to = scene.positions?.[beam.to]
                        if (!from || !to) return null
                        const fromActor = actors.find(a => a.id === beam.from)
                        return (
                            <line
                                key={`${sceneIdx}-${bi}`}
                                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                stroke={beam.color || fromActor?.color || '#8b5cf6'}
                                strokeWidth="2"
                                strokeDasharray="6 5"
                                strokeLinecap="round"
                                vectorEffect="non-scaling-stroke"
                                opacity="0.7"
                                className={noMotion ? '' : 'video-scene-beam'}
                            />
                        )
                    })}
                </svg>

                {/* Aktörler */}
                {actors.map(actor => {
                    const pos = scene.positions?.[actor.id]
                    const visible = Boolean(pos)
                    // Görünmeyen aktör son bilinen yerde saklanmak yerine merkezde şeffaf bekler
                    const x = pos?.x ?? 50
                    const y = pos?.y ?? 50
                    const scale = pos?.scale ?? 1
                    return (
                        <div
                            key={actor.id}
                            className="absolute flex flex-col items-center"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                opacity: visible ? (pos.opacity ?? 1) : 0,
                                transform: `translate(-50%, -50%) scale(${visible ? scale : 0.6})`,
                                transition: actorTransition,
                                zIndex: pos?.pulse ? 3 : 2,
                            }}
                        >
                            <span
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xl md:h-12 md:w-12 md:text-2xl ${
                                    !noMotion && pos?.pulse ? 'video-scene-pulse' : ''
                                }`}
                                style={{
                                    borderColor: actor.color || '#8b5cf6',
                                    background: darkMode ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.9)',
                                    boxShadow: pos?.pulse ? `0 0 14px ${actor.color || '#8b5cf6'}66` : 'none',
                                }}
                            >
                                {actor.emoji}
                            </span>
                            <span
                                className="mt-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-semibold md:text-xs"
                                style={{
                                    // Aktör rengi (actor.color) ikon kenarlığında zaten kullanılıyor;
                                    // burada SADECE aksan olarak border'da tutulur — ham rengi metin
                                    // rengi yapmak light mode'da beyaza yakın zeminde WCAG kontrastını
                                    // (çoğu Tailwind ara-tonu için ~2-3:1) ihlal ediyordu. Metin her
                                    // zaman nötr, yüksek kontrastlı bir tondan gelir.
                                    color: darkMode ? '#e2e8f0' : '#1e293b',
                                    background: darkMode ? 'rgba(2,6,23,0.7)' : 'rgba(255,255,255,0.92)',
                                    border: `1px solid ${(actor.color || '#8b5cf6')}55`,
                                }}
                            >
                                {pick(actor.label, isTr)}
                            </span>
                        </div>
                    )
                })}

                {/* Bitiş rozeti + XP pop */}
                {atEnd && (
                    <div
                        className={`absolute right-2 top-2 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                            darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                        } ${xpPop && !noMotion ? 'video-scene-xp-pop' : ''}`}
                        data-testid="video-scene-done"
                    >
                        🎬 {isTr ? 'Film bitti' : 'The end'}
                        {block.xpReward > 0 && (
                            <span>{alreadyPaid && !xpPop ? '✓' : `+${block.xpReward} XP`}</span>
                        )}
                    </div>
                )}
            </div>

            {/* ── Altyazı ── */}
            <div
                className={`mt-3 min-h-12 rounded-lg border-l-4 border-violet-500 px-3 py-2 text-sm leading-relaxed ${
                    darkMode ? 'bg-violet-500/10 text-slate-200' : 'bg-violet-50 text-slate-700'
                }`}
                data-testid="video-scene-caption"
                aria-live="polite"
            >
                {pick(scene.caption, isTr)}
            </div>
            {scene.code && (
                <pre className={`mt-2 overflow-x-auto rounded-lg p-3 text-xs ${darkMode ? 'bg-black text-slate-200' : 'border border-slate-200 bg-slate-50 text-slate-800'}`}>
                    <code>{pick(scene.code, isTr)}</code>
                </pre>
            )}

            {/* ── Kontroller ── */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
                <button type="button" className={btnCls} onClick={() => seekTo(sceneIdx - 1)} disabled={sceneIdx === 0}
                    data-testid="video-scene-prev" aria-label={isTr ? 'Önceki sahne' : 'Previous scene'}>
                    ⏮
                </button>
                <button
                    type="button"
                    onClick={togglePlay}
                    className="min-h-9 rounded-lg bg-violet-600 px-4 text-sm font-bold text-white transition-colors hover:bg-violet-500"
                    data-testid="video-scene-play"
                    aria-label={playing ? (isTr ? 'Duraklat' : 'Pause') : (isTr ? 'Oynat' : 'Play')}
                >
                    {playing ? '⏸' : '▶'}
                </button>
                <button type="button" className={btnCls} onClick={() => seekTo(sceneIdx + 1)} disabled={atEnd}
                    data-testid="video-scene-next" aria-label={isTr ? 'Sonraki sahne' : 'Next scene'}>
                    ⏭
                </button>
                <button type="button" className={btnCls} onClick={replay}
                    data-testid="video-scene-replay" aria-label={isTr ? 'Baştan oynat' : 'Replay'}>
                    ↺
                </button>
                <button
                    type="button"
                    className={btnCls}
                    onClick={() => setSpeedIdx(i => (i + 1) % SPEEDS.length)}
                    data-testid="video-scene-speed"
                    aria-label={isTr ? 'Oynatma hızı' : 'Playback speed'}
                >
                    {SPEEDS[speedIdx]}×
                </button>

                {/* Timeline: tıklanabilir bölüm pip'leri */}
                <div className="flex flex-1 items-center gap-1" role="group" aria-label={isTr ? 'Sahne zaman çizelgesi' : 'Scene timeline'}>
                    {scenes.map((s, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => seekTo(idx)}
                            data-testid={`video-scene-pip-${idx}`}
                            aria-label={(isTr ? 'Sahne ' : 'Scene ') + (idx + 1)}
                            aria-current={idx === sceneIdx ? 'step' : undefined}
                            className="h-4 min-w-4 flex-1 rounded-full transition-colors"
                            style={{
                                background: idx < sceneIdx
                                    ? '#8b5cf6'
                                    : idx === sceneIdx
                                        ? '#a78bfa'
                                        : darkMode ? '#334155' : '#e2e8f0',
                                outlineOffset: 2,
                            }}
                        />
                    ))}
                </div>
            </div>

            <p className={`mt-2 text-xs ${subtle}`}>
                {isTr
                    ? '▶ ile filmi izle, pip\'lere tıklayarak sahneler arasında gezin.'
                    : 'Press ▶ to watch the film; click the pips to jump between scenes.'}
            </p>
        </div>
    )
}
