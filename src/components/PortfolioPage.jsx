// src/components/PortfolioPage.jsx
// QA Portfolyo — /portfolio
//
// Bu sayfa bir GENERATOR değil, bir AGGREGATOR'dür: kullanıcı için yeni bir şey
// üretmez, ZATEN ürettiklerini toplayıp görünür kılar. Kendi ilerleme state'i
// TUTMAZ (tek istisna: kullanıcının kendi yazdığı ad/unvan), quiz motoruna
// dokunmaz, backend/üyelik gerektirmez. Tüm türetme portfolioSnapshot.js'te.
//
// Sayfa kabuğu SprintPage kalıbını izler (TopicHeader + ScrollProgressBar +
// useDarkModeState + sabit ana sayfa butonu) — CLAUDE.md §8 zorunluları.

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'
import { portfolioData } from '../data/portfolioData'
import { getPortfolioSnapshot, saveIdentity, toMarkdown } from '../lib/portfolioSnapshot'

const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

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
            <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #0ea5e9, #14b8a6, #22c55e)' }} />
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

const routeLabel = (route, isTr) => {
    const entry = portfolioData.routeLabels[route]
    return entry ? tx(entry, isTr) : route
}

const formatDate = (ts, isTr) => {
    if (!ts) return tx(portfolioData.ui.unknownDate, isTr)
    try {
        return new Date(ts).toLocaleDateString(isTr ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
        return tx(portfolioData.ui.unknownDate, isTr)
    }
}

// ─── Rakamlarla özet şeridi ─────────────────────────────────────────────────
// Her rakamın altında NE ANLAMA GELDİĞİ yazar — ham sayı tek başına motive
// etmiyor. Verisi olmayan metrik (örn. hiç quiz denenmemişse doğruluk) "0"
// olarak DEĞİL, hiç gösterilmez.
function StatStrip({ stats, isTr, darkMode }) {
    const ui = portfolioData.ui
    const cells = [
        { key: 'xp', value: stats.totalXp, label: ui.statXp, meaning: ui.statXpMeaning },
        { key: 'missions', value: stats.solvedMissions, label: ui.statMissions, meaning: ui.statMissionsMeaning },
        { key: 'bugs', value: stats.closedBugs, label: ui.statBugs, meaning: ui.statBugsMeaning },
        { key: 'lessons', value: stats.completedRoutes, label: ui.statLessons, meaning: ui.statLessonsMeaning },
        stats.quizAccuracy !== null ? { key: 'accuracy', value: `%${stats.quizAccuracy}`, label: ui.statAccuracy, meaning: ui.statAccuracyMeaning } : null,
        stats.activeDays > 0 ? { key: 'days', value: stats.activeDays, label: ui.statActiveDays, meaning: ui.statActiveDaysMeaning } : null,
    ].filter(Boolean)

    return (
        <section data-testid="portfolio-stats" className="mb-8">
            <h2 className={`mb-3 text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {tx(portfolioData.ui.statsHeading, isTr)}
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {cells.map((cell) => (
                    <div
                        key={cell.key}
                        data-testid={`portfolio-stat-${cell.key}`}
                        className={`rounded-2xl border p-4 ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'}`}
                    >
                        <p className={`text-3xl font-extrabold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>{cell.value}</p>
                        <p className={`mt-1 text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{tx(cell.label, isTr)}</p>
                        <p className={`mt-0.5 text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(cell.meaning, isTr)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ─── Kimlik kartı ───────────────────────────────────────────────────────────
// Sayfadaki TEK yazma noktası. İlerleme verisi değil, kullanıcının kendi
// yazdığı ad/unvan — türetilecek bir kaynağı yok, ikinci kopyası da yok.
function IdentityCard({ identity, onSave, isTr, darkMode }) {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(identity.name)
    const [title, setTitle] = useState(identity.title)
    const ui = portfolioData.ui

    const inputCls = `w-full rounded-lg border px-3 py-2 text-base ${darkMode ? 'border-gray-600 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}`

    if (editing) {
        return (
            <div className={`mb-6 rounded-2xl border p-4 ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'}`}>
                <div className="grid gap-3 md:grid-cols-2">
                    <input
                        data-testid="portfolio-identity-name"
                        className={inputCls}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={tx(ui.identityNamePlaceholder, isTr)}
                        aria-label={tx(ui.identityNamePlaceholder, isTr)}
                    />
                    <input
                        data-testid="portfolio-identity-title"
                        className={inputCls}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={tx(ui.identityTitlePlaceholder, isTr)}
                        aria-label={tx(ui.identityTitlePlaceholder, isTr)}
                    />
                </div>
                <div className="mt-3 flex gap-2">
                    <button
                        type="button"
                        data-testid="portfolio-identity-save"
                        onClick={() => { onSave({ name, title }); setEditing(false) }}
                        className="min-h-9 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-700"
                    >
                        {tx(ui.identitySave, isTr)}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setName(identity.name); setTitle(identity.title); setEditing(false) }}
                        className={`min-h-9 rounded-lg px-4 py-2 text-sm font-bold ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
                    >
                        {tx(ui.identityCancel, isTr)}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div data-testid="portfolio-identity" className={`mb-6 flex flex-wrap items-center gap-3 rounded-2xl border p-4 ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-2xl">🧑‍💻</div>
            <div className="min-w-0">
                <p className={`text-lg font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {identity.name || tx(ui.defaultName, isTr)}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {identity.title || tx(ui.defaultTitle, isTr)}
                </p>
            </div>
            <button
                type="button"
                data-testid="portfolio-identity-edit"
                onClick={() => setEditing(true)}
                className={`ml-auto min-h-9 rounded-lg px-3 py-1.5 text-xs font-bold ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
                {tx(ui.identityEdit, isTr)}
            </button>
        </div>
    )
}

// ─── Boş durum: sıfır kademesi ──────────────────────────────────────────────
// Bölümler HİÇ render edilmez; tek bir davet ekranı gösterilir.
function EmptyInvite({ isTr, darkMode }) {
    const es = portfolioData.emptyState
    const cardCls = `flex-1 rounded-2xl border p-4 transition-transform hover:scale-[1.02] ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'}`
    return (
        <section data-testid="portfolio-empty" className={`rounded-2xl border p-5 md:p-8 ${darkMode ? 'border-teal-800 bg-teal-950/30' : 'border-teal-200 bg-teal-50'}`}>
            <h2 className={`mb-3 text-xl font-extrabold md:text-2xl ${darkMode ? 'text-teal-200' : 'text-teal-800'}`}>
                {tx(es.title, isTr)}
            </h2>
            <p className={`mb-6 max-w-3xl text-sm leading-relaxed md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {tx(es.body, isTr)}
            </p>
            <div className="flex flex-col gap-3 md:flex-row">
                <Link
                    to="/selenium"
                    state={{ openTab: portfolioData.missionCatalog['selenium-login-mission']?.openTab }}
                    data-testid="portfolio-empty-mission-cta"
                    className={cardCls}
                >
                    <p className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tx(es.missionCta, isTr)}</p>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx(es.missionCtaNote, isTr)}</p>
                </Link>
                <Link to="/sprint" data-testid="portfolio-empty-sprint-cta" className={cardCls}>
                    <p className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tx(es.sprintCta, isTr)}</p>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx(es.sprintCtaNote, isTr)}</p>
                </Link>
            </div>
        </section>
    )
}

// Kısmi kademede eksik bölümün yerine geçen tek satırlık davet.
function SectionHint({ hint, isTr, darkMode, testId }) {
    return (
        <p
            data-testid={testId}
            className={`mb-6 rounded-xl border border-dashed px-4 py-3 text-sm ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'}`}
        >
            💡 {tx(hint, isTr)}
        </p>
    )
}

export default function PortfolioPage() {
    const { language } = useLanguage()
    const isTr = language === 'tr'
    const [darkMode, setDarkMode] = useDarkModeState()
    const ui = portfolioData.ui

    // Snapshot her mount'ta ve kimlik değişiminde YENİDEN türetilir — sayfa
    // kendi kopyasını saklamaz, `revision` yalnızca yeniden hesaplamayı tetikler.
    const [revision, setRevision] = useState(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const snapshot = useMemo(() => getPortfolioSnapshot(), [revision])

    const [copied, setCopied] = useState(false)

    const handleSaveIdentity = useCallback((identity) => {
        saveIdentity(identity)
        setRevision((r) => r + 1)
    }, [])

    const handleCopy = useCallback(async () => {
        const markdown = toMarkdown(snapshot, language)
        try {
            await navigator.clipboard.writeText(markdown)
        } catch {
            // Clipboard API yoksa/izin verilmediyse gizli bir textarea üzerinden kopyala.
            const area = document.createElement('textarea')
            area.value = markdown
            area.setAttribute('readonly', '')
            area.style.position = 'fixed'
            area.style.opacity = '0'
            document.body.appendChild(area)
            area.select()
            try { document.execCommand('copy') } catch { /* kopyalama desteklenmiyor */ }
            document.body.removeChild(area)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }, [snapshot, language])

    const panelBase = darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-white'
    const isEmpty = snapshot.tier === 'empty'

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-teal-50'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                data-testid="back-to-top-btn"
                className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-xl transition-all duration-200 hover:scale-110 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                title={isTr ? 'Başa dön' : 'Back to top'}
            >
                🏠
            </button>

            <main className="container mx-auto px-3 py-6 md:px-6 md:py-10">
                <header className="mb-6">
                    <h1 className={`mb-2 text-2xl font-extrabold md:text-4xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {tx(portfolioData.hero.title, isTr)}
                    </h1>
                    <p className={`max-w-3xl text-sm leading-relaxed md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {tx(portfolioData.hero.intro, isTr)}
                    </p>
                </header>

                {isEmpty ? (
                    <EmptyInvite isTr={isTr} darkMode={darkMode} />
                ) : (
                    <>
                        <IdentityCard identity={snapshot.identity} onSave={handleSaveIdentity} isTr={isTr} darkMode={darkMode} />

                        {/* Markdown dışa aktarım — boş portfolyoda HİÇ görünmez */}
                        <div className="mb-8 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                data-testid="portfolio-export-btn"
                                onClick={handleCopy}
                                className="min-h-11 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-700"
                            >
                                {copied ? tx(ui.exportCopied, isTr) : tx(ui.exportButton, isTr)}
                            </button>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tx(ui.exportHint, isTr)}</span>
                        </div>

                        <StatStrip stats={snapshot.stats} isTr={isTr} darkMode={darkMode} />

                        {/* ── Sıradaki görev — ileriye bakan tek CTA ──────────── */}
                        {snapshot.nextMission && (
                            <section
                                data-testid="portfolio-next-mission"
                                data-mission-id={snapshot.nextMission.missionId}
                                className={`mb-8 rounded-2xl border p-4 md:p-5 ${darkMode ? 'border-teal-800 bg-teal-950/30' : 'border-teal-200 bg-teal-50'}`}
                            >
                                <h2 className={`mb-1 text-lg font-bold ${darkMode ? 'text-teal-200' : 'text-teal-800'}`}>
                                    {tx(ui.nextMissionHeading, isTr)}
                                </h2>
                                <p className={`mb-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {tx(ui.nextMissionIntro, isTr)}
                                </p>
                                <h3 className={`mb-1 text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {tx(snapshot.nextMission.taskTitle, isTr)}
                                </h3>
                                {snapshot.nextMission.skill && (
                                    <p className={`mb-3 text-xs font-semibold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                                        {tx(ui.skillLabel, isTr)}: {tx(snapshot.nextMission.skill, isTr)}
                                    </p>
                                )}
                                <Link
                                    to={snapshot.nextMission.route}
                                    state={typeof snapshot.nextMission.openTab === 'number' ? { openTab: snapshot.nextMission.openTab } : undefined}
                                    data-testid="portfolio-next-mission-cta"
                                    className="inline-block min-h-11 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-700"
                                >
                                    {tx(ui.nextMissionCta, isTr)}
                                </Link>
                            </section>
                        )}

                        {/* ── İnşa Ettiklerin — portfolyonun kalbi ────────────── */}
                        {snapshot.missions.length > 0 ? (
                            <section data-testid="portfolio-missions" className="mb-8">
                                <h2 className={`mb-1 text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {tx(ui.missionsHeading, isTr)}
                                </h2>
                                <p className={`mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx(ui.missionsIntro, isTr)}</p>
                                <div className="grid gap-3 md:grid-cols-2">
                                    {snapshot.missions.map((mission) => (
                                        <article
                                            key={mission.missionId}
                                            data-testid="portfolio-mission-card"
                                            data-mission-id={mission.missionId}
                                            className={`rounded-2xl border p-4 ${panelBase}`}
                                        >
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${darkMode ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>
                                                    {routeLabel(mission.route, isTr)}
                                                </span>
                                                <span className={`text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {formatDate(mission.ts, isTr)}
                                                </span>
                                            </div>
                                            <h3 className={`mb-1 text-base font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {mission.isKnown
                                                    ? tx(mission.title, isTr)
                                                    : `${routeLabel(mission.route, isTr)} ${tx(ui.genericMission, isTr)}`}
                                            </h3>
                                            {mission.skill && (
                                                <p className={`mb-2 text-xs font-semibold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                                                    {tx(ui.skillLabel, isTr)}: {tx(mission.skill, isTr)}
                                                </p>
                                            )}
                                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {mission.isKnown ? tx(mission.whatYouBuilt, isTr) : tx(ui.genericMissionNote, isTr)}
                                            </p>
                                            {mission.route && (
                                                <Link
                                                    to={mission.route}
                                                    state={typeof mission.openTab === 'number' ? { openTab: mission.openTab } : undefined}
                                                    data-testid="portfolio-mission-open-link"
                                                    className={`mt-3 inline-block text-xs font-bold ${darkMode ? 'text-teal-300 hover:text-teal-200' : 'text-teal-700 hover:text-teal-800'}`}
                                                >
                                                    {tx(ui.openLesson, isTr)}
                                                </Link>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <SectionHint hint={portfolioData.emptyState.hints.missions} isTr={isTr} darkMode={darkMode} testId="portfolio-hint-missions" />
                        )}

                        {/* ── Sprint deneyimi ─────────────────────────────────── */}
                        {snapshot.sprints.closedBugs.length > 0 ? (
                            <section data-testid="portfolio-sprints" className="mb-8">
                                <h2 className={`mb-1 text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {tx(ui.sprintHeading, isTr)}
                                </h2>
                                <p className={`mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx(ui.sprintIntro, isTr)}</p>

                                {snapshot.sprints.closedSprints.length > 0 && (
                                    <div className="mb-3 flex flex-wrap gap-2">
                                        {snapshot.sprints.closedSprints.map((s) => (
                                            <span
                                                key={s.sprintId}
                                                data-testid="portfolio-closed-sprint"
                                                className={`rounded-full px-3 py-1 text-xs font-bold ${darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}
                                            >
                                                🏆 {s.code} · {tx(s.title, isTr)} — {tx(ui.sprintClosedLabel, isTr)}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="grid gap-3 md:grid-cols-2">
                                    {snapshot.sprints.closedBugs.map((bug) => (
                                        <article
                                            key={bug.missionId}
                                            data-testid="portfolio-bug-card"
                                            data-bug-key={bug.key}
                                            className={`rounded-2xl border p-4 ${panelBase}`}
                                        >
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                                    {bug.key}
                                                </span>
                                                <span className={`rounded px-2 py-0.5 text-[11px] font-bold ${bug.severity === 'critical'
                                                    ? (darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700')
                                                    : bug.severity === 'major'
                                                        ? (darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700')
                                                        : (darkMode ? 'bg-gray-600/40 text-gray-300' : 'bg-gray-100 text-gray-600')
                                                    }`}>
                                                    {tx(ui.severityLabels[bug.severity], isTr)}
                                                </span>
                                            </div>
                                            <h3 className={`mb-1 text-base font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {tx(bug.title, isTr)}
                                            </h3>
                                            <p className={`mb-2 text-[11px] font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {tx(ui.sprintFlow, isTr)}
                                            </p>
                                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {tx(bug.whatYouFixed, isTr)}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                                <Link to="/sprint" className={`mt-3 inline-block text-xs font-bold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                                    {tx(ui.openSprint, isTr)}
                                </Link>
                            </section>
                        ) : (
                            <SectionHint hint={portfolioData.emptyState.hints.sprint} isTr={isTr} darkMode={darkMode} testId="portfolio-hint-sprint" />
                        )}

                        {/* ── Beceri haritası ─────────────────────────────────── */}
                        {snapshot.skills.some((s) => s.value !== null) && (
                            <section data-testid="portfolio-skills" className="mb-8">
                                <h2 className={`mb-1 text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {tx(ui.skillsHeading, isTr)}
                                </h2>
                                <p className={`mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx(ui.skillsIntro, isTr)}</p>
                                <div className={`space-y-3 rounded-2xl border p-4 ${panelBase}`}>
                                    {snapshot.skills.map((skill) => (
                                        <div key={skill.id} data-testid="portfolio-skill-row">
                                            <div className="mb-1 flex items-center justify-between text-xs">
                                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{tx(skill.label, isTr)}</span>
                                                <span className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {skill.value === null ? tx(ui.skillNoData, isTr) : `%${skill.value}`}
                                                </span>
                                            </div>
                                            <div className={`h-2 overflow-hidden rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${skill.value ?? 0}%`, background: skill.value === null ? 'transparent' : 'linear-gradient(90deg, #14b8a6, #22c55e)' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Ustalık tablosu ─────────────────────────────────── */}
                        {snapshot.mastery.length > 0 && (
                            <section data-testid="portfolio-mastery" className="mb-8">
                                <h2 className={`mb-1 text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {tx(ui.masteryHeading, isTr)}
                                </h2>
                                <p className={`mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx(ui.masteryIntro, isTr)}</p>
                                <div className={`overflow-x-auto rounded-2xl border ${panelBase}`}>
                                    <table className="w-full min-w-[420px] text-sm">
                                        <thead>
                                            <tr className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                                <th className="px-4 py-2 text-left text-xs font-bold">{tx(ui.masteryColTopic, isTr)}</th>
                                                <th className="px-4 py-2 text-left text-xs font-bold">{tx(ui.masteryColScore, isTr)}</th>
                                                <th className="px-4 py-2 text-left text-xs font-bold">{tx(ui.masteryColInterview, isTr)}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {snapshot.mastery.map((row) => (
                                                <tr key={row.route} data-testid="portfolio-mastery-row" data-route={row.route} className={darkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'}>
                                                    <td className="px-4 py-2">
                                                        <Link to={row.route} className={`font-semibold ${darkMode ? 'text-gray-200 hover:text-teal-300' : 'text-gray-800 hover:text-teal-700'}`}>
                                                            {routeLabel(row.route, isTr)}
                                                        </Link>
                                                        {row.isCompleted && (
                                                            <span className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold ${darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                                ✓ {tx(ui.completedBadge, isTr)}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className={`px-4 py-2 font-bold ${darkMode ? 'text-teal-300' : 'text-teal-700'}`}>%{row.mastery}</td>
                                                    <td className={`px-4 py-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {row.interview ? `%${row.interview.avgPercent}` : '—'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}

                        {/* ── Kariyer rozetleri — profil yoksa bölüm tamamen gizlenir ── */}
                        {snapshot.milestones === null ? (
                            <SectionHint hint={portfolioData.emptyState.hints.careerMap} isTr={isTr} darkMode={darkMode} testId="portfolio-hint-career-map" />
                        ) : snapshot.milestones.length > 0 && (
                            <section data-testid="portfolio-milestones" className="mb-8">
                                <h2 className={`mb-1 text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {tx(ui.milestonesHeading, isTr)}
                                </h2>
                                <p className={`mb-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tx(ui.milestonesIntro, isTr)}</p>
                                <div className="flex flex-wrap gap-2">
                                    {snapshot.milestones.map((m) => (
                                        <span
                                            key={m.id}
                                            data-testid="portfolio-milestone"
                                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'}`}
                                        >
                                            {m.emoji} {tx(m.label, isTr)}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Mülakat ipucu: hiçbir konuda mülakat puanı yoksa */}
                        {snapshot.mastery.length > 0 && !snapshot.mastery.some((row) => row.interview) && (
                            <SectionHint hint={portfolioData.emptyState.hints.interview} isTr={isTr} darkMode={darkMode} testId="portfolio-hint-interview" />
                        )}
                    </>
                )}

                {/* ── Dürüstlük notu — her kademede görünür ──────────────────── */}
                <p
                    data-testid="portfolio-honesty-note"
                    className={`mt-8 rounded-xl border px-4 py-3 text-xs leading-relaxed ${darkMode ? 'border-gray-700 bg-gray-800/40 text-gray-400' : 'border-gray-200 bg-white text-gray-500'}`}
                >
                    {tx(portfolioData.honestyNote, isTr)}
                </p>
            </main>
        </div>
    )
}
