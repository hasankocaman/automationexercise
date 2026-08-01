import { useEffect, useState } from 'react'
import { getCompletedExercises, markExerciseComplete, addXP, subscribeToXpChanges } from '../lib/xp'
import { recordSkillSignal } from '../lib/skillSignals'
import { trackEvent } from '../lib/analytics'
import ConfettiExplosion from './ConfettiExplosion'

// ─────────────────────────────────────────────────────────────────────────────
// MissionBlock — "Challenge-First Görev Zinciri"
// (Documents/challenge-first-experience-plan.md, Phase 1)
//
// Yazının isteği: "Ben burada ders okumuyorum, burada QA oluyorum." Deneyimi
// ders-merkezli olmaktan çıkarıp GÖREV-merkezli yapar:
//     Görev → adım → takıldın mı? → mini-lesson → tekrar → tamamla
//
// Bu bileşen YENİ SANDBOX YAZMAZ — her adım MEVCUT bir interaktif bloğu
// (code-playground, prediction, editor, challenge, sandbox…) `renderInner`
// callback'i ile TopicPage'in `renderBlock` makinesinden geçirerek gömer.
// Adımlar SIRAYLA kilit açar; gömülü blok başarıyı bildirince (onFirstSuccess)
// adım otomatik tamamlanır. Tüm adımlar bitince görev XP + konfeti verir ve
// bir BECERİ SİNYALİ (skillSignals) biriktirir (Phase 3'te SkillRadar besler).
//
// Şema: plan §3.2. Kısaca:
//   {
//     type: 'mission', id: 'mission-...', xpReward: 40, relatedTopicId: '...',
//     scenario: {tr,en}, persona: {tr,en}?,
//     steps: [{ id, brief:{tr,en}, block:<gömülü blok>, miniLesson:{tr,en},
//               successCriterion: 'onFirstSuccess' | 'manual' }],
//     debrief: {tr,en},
//   }
//
// Not (Sonnet için): `successCriterion` varsayılanı 'onFirstSuccess' — o adımın
// gömülü bloğu MUTLAKA onFirstSuccess EMEN bir tip olmalı (prediction /
// code-playground / editor / *-sandbox / git-practice). onFirstSuccess EMMEYEN
// bloklar (challenge, saf anlatım blokları) için successCriterion:'manual' kullan;
// o zaman adım "✓ Adımı tamamladım" düğmesiyle ilerler.
// ─────────────────────────────────────────────────────────────────────────────

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

export default function MissionBlock({ block, darkMode, language, onFirstSuccess, renderInner }) {
    const isTr = language === 'tr'
    const steps = Array.isArray(block.steps) ? block.steps : []

    const [completedIds, setCompletedIds] = useState(getCompletedExercises)
    const alreadyDone = block.id ? completedIds.includes(block.id) : false

    // activeStep = şu an açık adım; öncekiler bitti, sonrakiler kilitli.
    const [activeStep, setActiveStep] = useState(alreadyDone ? steps.length : 0)
    const [doneSteps, setDoneSteps] = useState(() => (alreadyDone ? steps.map((_, i) => i) : []))
    const [openLesson, setOpenLesson] = useState(null) // hangi adımın mini-lesson'ı açık
    const [celebrating, setCelebrating] = useState(false)

    useEffect(() => subscribeToXpChanges(() => setCompletedIds(getCompletedExercises())), [])

    const missionComplete = doneSteps.length >= steps.length && steps.length > 0

    // Görev bütünü ilk kez tamamlandığında: XP + konfeti + beceri sinyali (bir kez).
    useEffect(() => {
        if (!missionComplete) return
        if (!block.id) return
        if (getCompletedExercises().includes(block.id)) return
        addXP(block.xpReward ?? 40)
        markExerciseComplete(block.id)
        recordSkillSignal({ missionId: block.id, route: block.relatedTopicRoute, skill: block.skill })
        trackEvent('mission_completed', { missionId: block.id })
        setCompletedIds(getCompletedExercises())
        setCelebrating(true)
        onFirstSuccess?.()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [missionComplete])

    const completeStep = (idx) => {
        setDoneSteps((prev) => (prev.includes(idx) ? prev : [...prev, idx]))
        setActiveStep((prev) => Math.max(prev, idx + 1))
        setOpenLesson((cur) => (cur === idx ? null : cur))
    }

    const border = darkMode ? '#334155' : '#e2e8f0'
    const cardBg = darkMode ? '#0b1220' : '#f8fafc'
    const textMain = darkMode ? '#e2e8f0' : '#1e293b'
    const textSub = darkMode ? '#94a3b8' : '#64748b'
    const accent = '#6366f1'

    const progressPct = steps.length ? Math.round((doneSteps.length / steps.length) * 100) : 0

    return (
        <div data-testid="mission-block" data-mission-id={block.id} data-mission-complete={missionComplete} style={{ position: 'relative', margin: '28px 0', padding: '22px', background: cardBg, border: `1px solid ${border}`, borderRadius: 18 }}>
            {celebrating && <ConfettiExplosion duration={3200} particleCount={36} onComplete={() => setCelebrating(false)} />}

            {/* Başlık şeridi */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 22 }}>🎯</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: textMain }}>
                    {isTr ? 'Görev' : 'Mission'}
                </span>
                {block.persona && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: accent, background: darkMode ? '#1e1b4b' : '#eef2ff', padding: '3px 8px', borderRadius: 999 }}>
                        {tx(block.persona, isTr)}
                    </span>
                )}
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: textSub, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {isTr ? 'challenge-first' : 'challenge-first'}
                </span>
            </div>

            {/* Senaryo çerçevesi (gerçek QA bağlamı) */}
            {block.scenario && (
                <div style={{ fontSize: 14, lineHeight: 1.6, color: textMain, marginBottom: 14 }}>
                    {tx(block.scenario, isTr)}
                </div>
            )}

            {/* İlerleme çubuğu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ flex: 1, height: 8, background: darkMode ? '#1e293b' : '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${progressPct}%`, height: '100%', background: missionComplete ? '#10b981' : accent, borderRadius: 999, transition: 'width 0.4s ease' }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: textSub, whiteSpace: 'nowrap' }}>
                    {doneSteps.length}/{steps.length} {isTr ? 'adım' : 'steps'}
                </span>
            </div>

            {/* Adımlar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {steps.map((step, idx) => {
                    const isDone = doneSteps.includes(idx)
                    const isActive = idx === activeStep && !missionComplete
                    const isLocked = idx > activeStep && !isDone
                    const manual = step.successCriterion === 'manual'

                    const stepBorder = isDone ? '#10b981' : isActive ? accent : border
                    const numBg = isDone ? '#10b981' : isActive ? accent : (darkMode ? '#1e293b' : '#e2e8f0')
                    const numFg = isDone || isActive ? '#fff' : textSub

                    return (
                        <div key={step.id ?? idx} data-testid="mission-step" data-step-index={idx} data-step-locked={isLocked} data-step-done={isDone} style={{
                            border: `2px solid ${stepBorder}`, borderRadius: 14,
                            background: darkMode ? '#111827' : '#fff',
                            opacity: isLocked ? 0.55 : 1, padding: '14px 16px',
                            transition: 'border-color 0.3s ease, opacity 0.3s ease',
                        }}>
                            {/* Adım başlığı */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{
                                    flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                                    background: numBg, color: numFg, display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontWeight: 800, fontSize: 14,
                                }}>
                                    {isDone ? '✓' : isLocked ? '🔒' : idx + 1}
                                </span>
                                <span style={{ fontWeight: 700, fontSize: 14, color: textMain }}>
                                    {tx(step.brief, isTr)}
                                </span>
                            </div>

                            {/* Aktif veya bitmiş adımlarda gömülü blok + mini-lesson */}
                            {(isActive || isDone) && (
                                <div style={{ marginTop: 12 }}>
                                    {step.block && renderInner && (
                                        <div>
                                            {renderInner(step.block, idx, () => completeStep(idx))}
                                        </div>
                                    )}

                                    {isActive && (
                                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                                            {/* "Takıldın mı? → Mini-lesson" — challenge-first çekirdeği */}
                                            {step.miniLesson && (
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenLesson((cur) => (cur === idx ? null : idx))}
                                                    style={{
                                                        padding: '8px 14px', minHeight: 40, background: 'transparent',
                                                        color: accent, border: `2px solid ${accent}`, borderRadius: 10,
                                                        fontWeight: 700, fontSize: 13, cursor: 'pointer',
                                                    }}
                                                >
                                                    {openLesson === idx
                                                        ? (isTr ? '▲ Mini-lesson\'ı kapat' : '▲ Hide mini-lesson')
                                                        : (isTr ? '💡 Takıldın mı? Mini-lesson aç' : '💡 Stuck? Open mini-lesson')}
                                                </button>
                                            )}

                                            {/* Manuel tamamlama (onFirstSuccess emmeyen bloklar için) */}
                                            {manual && (
                                                <button
                                                    type="button"
                                                    onClick={() => completeStep(idx)}
                                                    style={{
                                                        padding: '8px 14px', minHeight: 40, background: accent,
                                                        color: '#fff', border: 'none', borderRadius: 10,
                                                        fontWeight: 700, fontSize: 13, cursor: 'pointer',
                                                    }}
                                                >
                                                    {isTr ? '✓ Adımı tamamladım' : '✓ Mark step done'}
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* Mini-lesson içeriği (reveal) */}
                                    {isActive && openLesson === idx && step.miniLesson && (
                                        <div data-testid="mission-mini-lesson" style={{
                                            marginTop: 12, padding: '12px 14px', borderLeft: `3px solid ${accent}`,
                                            background: darkMode ? '#1e293b' : '#eef2ff', borderRadius: '0 10px 10px 0',
                                            fontSize: 13.5, lineHeight: 1.6, color: textMain,
                                        }}>
                                            {tx(step.miniLesson, isTr)}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Görev tamamlanınca: debrief (gerçek QA bağlamı) */}
            {missionComplete && (
                <div data-testid="mission-complete-banner" style={{ marginTop: 18 }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10,
                        background: darkMode ? '#052e2b' : '#ecfdf5', border: '1px solid #10b981', marginBottom: block.debrief ? 12 : 0,
                    }}>
                        <span style={{ fontSize: 18 }}>🏆</span>
                        <span style={{ fontWeight: 700, fontSize: 14, color: darkMode ? '#6ee7b7' : '#047857' }}>
                            {isTr ? 'Görev tamamlandı! Bir QA gibi uçtan uca çözdün.' : 'Mission complete! You solved it end-to-end like a QA.'}
                        </span>
                    </div>
                    {block.debrief && (
                        <div style={{ fontSize: 14, lineHeight: 1.65, color: textMain }}>
                            {tx(block.debrief, isTr)}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
