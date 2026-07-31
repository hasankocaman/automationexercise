// src/components/SprintPage.jsx
// QA Sprint Simulator — /sprint
// (Documents/sprint-simulator-and-open-items-plan.md Faz 1)
//
// Challenge-first deneyimin zirvesi: kullanıcı bir ders sayfasında görev ARAMAZ,
// bir EKİBE girer ve sprint'e düşen bug'ları QA iş akışıyla kapatır.
//
// KRİTİK: bu sayfa YENİ SANDBOX / YENİ RENDERER YAZMAZ. Bug görevleri
// TopicPage'in `renderBlock` makinesinden geçer (plan §2.3) — böylece
// code-playground, prediction gibi ~60 blok tipi olduğu gibi çalışır.

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'
import ConfettiExplosion from './ConfettiExplosion'
import SprintBoard from './SprintBoard'
import { renderBlock } from './TopicPage'
import { sprintsData } from '../data/sprintsData'
import { addXP, subscribeToXpChanges } from '../lib/xp'
import { recordSkillSignal } from '../lib/skillSignals'
import {
    getBugStatus,
    pullBugIntoSprint,
    isSprintComplete,
    isSprintClosed,
    closeSprint,
    getSprintProgress,
    subscribeToSprintBoard,
} from '../lib/sprintStore'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

// ─── Scroll Progress Bar (QAMentorPage ile aynı kalıp, CLAUDE.md §8) ────────
function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const max = Math.max(1, scrollHeight - clientHeight)
            setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)))
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div className="fixed left-0 right-0 top-0 z-[9999] h-[3px] bg-transparent">
            <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)' }} />
        </div>
    )
}

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        document.documentElement.classList.toggle('dark-mode', isDark)
        document.documentElement.classList.toggle('light-mode-forced', !isDark)
        return isDark
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark-mode', darkMode)
        document.documentElement.classList.toggle('light-mode-forced', !darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

export default function SprintPage() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const [darkMode, setDarkMode] = useDarkModeState()

    const sprints = sprintsData.sprints
    // Sprint seçici (S1: Sprint 2 eklendi — sabit sprints[0] artık ikinci
    // sprint'i asla göstermezdi). Varsayılan: ilk sprint.
    const [selectedSprintId, setSelectedSprintId] = useState(sprints[0]?.id ?? null)
    const sprint = sprints.find((s) => s.id === selectedSprintId) ?? sprints[0]
    const bugs = useMemo(() => sprint?.bugs ?? [], [sprint])

    const [selectedBugId, setSelectedBugId] = useState(null)
    const [celebrating, setCelebrating] = useState(false)
    // Pano durumu xp.js + sprintStore'dan TÜRETİLİR; bu sayaç yalnızca o
    // depolar değiştiğinde yeniden hesaplamayı tetikler (kendi state'i değil).
    const [revision, setRevision] = useState(0)
    const refresh = useCallback(() => setRevision((r) => r + 1), [])

    useEffect(() => subscribeToXpChanges(refresh), [refresh])
    useEffect(() => subscribeToSprintBoard(refresh), [refresh])

    const statusOf = useCallback((bug) => getBugStatus(bug), [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const progress = useMemo(() => getSprintProgress(sprint), [sprint, revision])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sprintDone = useMemo(() => isSprintComplete(sprint), [sprint, revision])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sprintClosed = useMemo(() => isSprintClosed(sprint?.id), [sprint, revision])

    const selectedBug = bugs.find((bug) => bug.id === selectedBugId) ?? null

    const handlePull = useCallback((bug) => {
        pullBugIntoSprint(bug.id)
        setSelectedBugId(bug.id)
    }, [])

    const handleSelectSprint = useCallback((id) => {
        setSelectedSprintId(id)
        setSelectedBugId(null) // farklı sprint'e geçince önceki bug detayı kapanır
    }, [])

    const handleCloseSprint = useCallback(() => {
        if (!closeSprint(sprint?.id)) return // zaten kapatılmış → bonus ikinci kez verilmez
        addXP(sprint?.xpBonus ?? 60)
        recordSkillSignal({ missionId: `sprint-close-${sprint?.id}`, route: '/sprint', skill: '/sprint' })
        setCelebrating(true)
    }, [sprint])

    const panelBase = darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-indigo-50'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            {celebrating && <ConfettiExplosion duration={4000} particleCount={60} onComplete={() => setCelebrating(false)} />}

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-testid="back-to-top-btn"
                className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-xl transition-all duration-200 hover:scale-110 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                title={isTr ? 'Başa dön' : 'Back to top'}
            >
                🏠
            </button>

            <main className="container mx-auto px-3 py-6 md:px-6 md:py-10">
                {/* ── Hero ─────────────────────────────────────────────────── */}
                <header className="mb-6">
                    <h1 className={`mb-2 text-2xl font-extrabold md:text-4xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {tx(sprintsData.hero.title, isTr)}
                    </h1>
                    <p className={`max-w-3xl text-sm leading-relaxed md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {tx(sprintsData.hero.intro, isTr)}
                    </p>
                </header>

                {/* ── Sprint seçici — birden fazla sprint varsa gösterilir ──── */}
                {sprints.length > 1 && (
                    <div data-testid="sprint-tabs" className="mb-4 flex flex-wrap gap-2">
                        {sprints.map((s) => {
                            const active = s.id === sprint.id
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    data-testid="sprint-tab"
                                    data-sprint-id={s.id}
                                    data-active={active}
                                    onClick={() => handleSelectSprint(s.id)}
                                    className={`min-h-9 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${active
                                        ? 'bg-indigo-600 text-white'
                                        : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {s.code} · {tx(s.title, isTr)}
                                </button>
                            )
                        })}
                    </div>
                )}

                {/* ── Sprint özeti ─────────────────────────────────────────── */}
                <section data-testid="sprint-summary" data-sprint-id={sprint.id} className={`mb-6 rounded-2xl border p-4 md:p-5 ${panelBase}`}>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                            {sprint.code}
                        </span>
                        <h2 className={`text-lg font-bold md:text-xl ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            {tx(sprint.title, isTr)}
                        </h2>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {tx(sprint.company, isTr)}
                        </span>
                    </div>

                    <p className={`mb-4 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>{isTr ? 'Sprint hedefi: ' : 'Sprint goal: '}</strong>
                        {tx(sprint.goal, isTr)}
                    </p>

                    <div className="flex items-center gap-3">
                        <div className={`h-2 flex-1 overflow-hidden rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${progress.percent}%`, background: sprintDone ? '#10b981' : '#6366f1' }}
                            />
                        </div>
                        <span data-testid="sprint-progress" className={`whitespace-nowrap text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {progress.done}/{progress.total} {isTr ? 'bug kapandı' : 'bugs closed'}
                        </span>
                    </div>

                    {/* Sprint kapatma töreni — tüm bug'lar bitince açılır */}
                    {sprintDone && !sprintClosed && (
                        <button
                            type="button"
                            data-testid="sprint-close-btn"
                            onClick={handleCloseSprint}
                            className="mt-4 min-h-11 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
                        >
                            {isTr ? `🏁 Sprint'i kapat (+${sprint.xpBonus} XP)` : `🏁 Close the sprint (+${sprint.xpBonus} XP)`}
                        </button>
                    )}

                    {sprintClosed && (
                        <div data-testid="sprint-retro" className={`mt-4 rounded-xl border p-4 ${darkMode ? 'border-emerald-700 bg-emerald-950/40' : 'border-emerald-300 bg-emerald-50'}`}>
                            <p className={`mb-2 text-sm font-extrabold ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                {isTr ? '🏆 Sprint kapandı — Retrospektif' : '🏆 Sprint closed — Retrospective'}
                            </p>
                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                {tx(sprint.retro, isTr)}
                            </p>
                        </div>
                    )}
                </section>

                {/* ── Kanban panosu ────────────────────────────────────────── */}
                <SprintBoard
                    bugs={bugs}
                    statusOf={statusOf}
                    isTr={isTr}
                    darkMode={darkMode}
                    selectedBugId={selectedBugId}
                    onOpen={(bug) => setSelectedBugId(bug.id)}
                    onPull={handlePull}
                />

                {/* ── Seçili bug: rapor + görev ────────────────────────────── */}
                {selectedBug && (
                    <section data-testid="sprint-bug-detail" data-bug-id={selectedBug.id} className={`mt-6 rounded-2xl border p-4 md:p-6 ${panelBase}`}>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                {selectedBug.key}
                            </span>
                            <h3 className={`text-base font-bold md:text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                {tx(selectedBug.title, isTr)}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setSelectedBugId(null)}
                                className={`ml-auto min-h-9 rounded-lg px-3 py-1.5 text-xs font-bold ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                {isTr ? '✕ Kapat' : '✕ Close'}
                            </button>
                        </div>

                        {/* Bug raporu — hikâye çerçevesi */}
                        <div className={`mb-5 rounded-xl border-l-4 border-amber-500 p-3 ${darkMode ? 'bg-gray-900/60' : 'bg-amber-50'}`}>
                            <p className={`mb-1 text-xs font-bold uppercase tracking-wide ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                                {isTr ? 'Bug raporu' : 'Bug report'} · {tx(selectedBug.reporter, isTr)}
                            </p>
                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                {tx(selectedBug.summary, isTr)}
                            </p>
                        </div>

                        {/* Görev zinciri — TopicPage'in renderBlock makinesinden geçer.
                            2. parametre React key'ine dönüşür: BUG ID verilmeli, sabit 0
                            DEĞİL. Sabit key'de React iki farklı bug'ın MissionBlock'unu
                            aynı instance sanıp yeniden kullanıyor, önceki bug'ın
                            "tamamlandı" state'i taşınıyor ve yeni bug hiç tamamlanmış
                            olarak işaretlenmiyordu (sprint-flow.spec.ts bunu yakaladı). */}
                        {renderBlock(selectedBug.mission, selectedBug.id, darkMode, language, undefined, tx(selectedBug.title, isTr), undefined, false, undefined, refresh)}
                    </section>
                )}
            </main>
        </div>
    )
}
