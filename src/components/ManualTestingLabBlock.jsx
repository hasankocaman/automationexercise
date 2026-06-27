import { useEffect, useState } from 'react'
import BuggyLoginForm from './BuggyLoginForm'
import { BUGS, SEVERITIES, evaluateReport, xpForScore } from '../data/manualTestingLabBugs'
import { getXP, addXP, subscribeToXpChanges } from '../lib/xp'
import { XpStatCard } from './XpStat'

const STORAGE_KEY = 'manual_testing_lab_python'

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return { foundBugIds: [], reports: [] }
        const parsed = JSON.parse(raw)
        return {
            foundBugIds: Array.isArray(parsed.foundBugIds) ? parsed.foundBugIds : [],
            reports: Array.isArray(parsed.reports) ? parsed.reports : [],
        }
    } catch {
        return { foundBugIds: [], reports: [] }
    }
}

function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* localStorage unavailable, skip persistence */ }
}

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
}

function inputCls(darkMode) {
    return `min-h-10 w-full rounded-lg border px-3 text-base ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`
}

function BugReportForm({ isTr, darkMode, onSubmit }) {
    const [title, setTitle] = useState('')
    const [steps, setSteps] = useState(['', ''])
    const [expected, setExpected] = useState('')
    const [actual, setActual] = useState('')
    const [severity, setSeverity] = useState('')
    const [bugId, setBugId] = useState('')
    const [touched, setTouched] = useState(false)

    const updateStep = (idx, value) => setSteps(curr => curr.map((s, i) => i === idx ? value : s))
    const addStep = () => setSteps(curr => [...curr, ''])
    const removeStep = (idx) => setSteps(curr => curr.length > 1 ? curr.filter((_, i) => i !== idx) : curr)

    const canSubmit = title.trim() && bugId && severity && steps.some(s => s.trim())

    const handleSubmit = (event) => {
        event.preventDefault()
        setTouched(true)
        if (!canSubmit) return
        onSubmit({ title, steps, expected, actual, severity, bugId })
        setTitle(''); setSteps(['', '']); setExpected(''); setActual(''); setSeverity(''); setBugId(''); setTouched(false)
    }

    return (
        <form onSubmit={handleSubmit} className={`rounded-lg border p-4 md:p-5 ${panelCls(darkMode)}`}>
            <div className="mb-3 text-xs font-black uppercase tracking-wide opacity-60">
                📝 Bug Report
            </div>
            <div className="grid gap-3">
                <label className="grid gap-1 text-sm font-bold">
                    {isTr ? 'Başlık' : 'Title'}
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls(darkMode)}
                        placeholder={isTr ? 'Kısa ve açıklayıcı bir özet' : 'A short, descriptive summary'} />
                </label>

                <label className="grid gap-1 text-sm font-bold">
                    {isTr ? 'Hangi bug?' : 'Which bug?'}
                    <select value={bugId} onChange={(e) => setBugId(e.target.value)} className={inputCls(darkMode)}>
                        <option value="">{isTr ? '— Seç —' : '— Select —'}</option>
                        {BUGS.map(bug => (
                            <option key={bug.id} value={bug.id}>{bug.label[isTr ? 'tr' : 'en']}</option>
                        ))}
                    </select>
                </label>

                <div className="grid gap-1 text-sm font-bold">
                    {isTr ? 'Yeniden üretme adımları' : 'Steps to reproduce'}
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                value={step}
                                onChange={(e) => updateStep(idx, e.target.value)}
                                className={inputCls(darkMode)}
                                placeholder={`${idx + 1}. ${isTr ? 'adım' : 'step'}`}
                            />
                            <button type="button" onClick={() => removeStep(idx)} className="min-h-10 rounded-lg bg-slate-700 px-3 text-xs font-bold text-white">✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={addStep} className="mt-1 min-h-9 w-fit rounded-lg bg-slate-700 px-3 text-xs font-bold text-white">
                        + {isTr ? 'Adım ekle' : 'Add step'}
                    </button>
                </div>

                <label className="grid gap-1 text-sm font-bold">
                    {isTr ? 'Beklenen sonuç' : 'Expected result'}
                    <textarea value={expected} onChange={(e) => setExpected(e.target.value)} rows={2}
                        className={`${inputCls(darkMode)} min-h-0 py-2`} />
                </label>

                <label className="grid gap-1 text-sm font-bold">
                    {isTr ? 'Gerçek sonuç' : 'Actual result'}
                    <textarea value={actual} onChange={(e) => setActual(e.target.value)} rows={2}
                        className={`${inputCls(darkMode)} min-h-0 py-2`} />
                </label>

                <label className="grid gap-1 text-sm font-bold">
                    {isTr ? 'Önem derecesi (severity)' : 'Severity'}
                    <select value={severity} onChange={(e) => setSeverity(e.target.value)} className={inputCls(darkMode)}>
                        <option value="">{isTr ? '— Seç —' : '— Select —'}</option>
                        {SEVERITIES.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                </label>

                <button type="submit" className="min-h-10 rounded-lg bg-sky-600 px-4 text-sm font-black text-white">
                    {isTr ? 'Bug Report Gönder' : 'Submit Bug Report'}
                </button>
                {touched && !canSubmit && (
                    <div className="text-xs font-bold text-amber-400">
                        {isTr ? 'Başlık, bug seçimi, en az 1 adım ve severity zorunlu.' : 'Title, bug selection, at least 1 step, and severity are required.'}
                    </div>
                )}
            </div>
        </form>
    )
}

const PILL_TONE_CLS = {
    emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    amber: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    rose: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
}

const RESULT_TONE_CLS = {
    emerald: { panel: 'border-emerald-500/40 bg-emerald-500/10', text: 'text-emerald-300' },
    sky: { panel: 'border-sky-500/40 bg-sky-500/10', text: 'text-sky-300' },
    amber: { panel: 'border-amber-500/40 bg-amber-500/10', text: 'text-amber-300' },
    rose: { panel: 'border-rose-500/40 bg-rose-500/10', text: 'text-rose-300' },
}

function ScorePill({ score, max }) {
    const ratio = max ? score / max : 0
    const tone = ratio >= 0.8 ? 'emerald' : ratio >= 0.5 ? 'amber' : 'rose'
    return (
        <span className={`rounded-md border px-2 py-0.5 text-xs font-black ${PILL_TONE_CLS[tone]}`}>
            {score}/{max}
        </span>
    )
}

function ResultFeedback({ result, isTr }) {
    const { total, titleScore, stepsScore, eaScore, sevScore, xpEarned } = result
    const tone = total >= 80 ? 'emerald' : total >= 60 ? 'sky' : total >= 40 ? 'amber' : 'rose'
    const headline = total >= 80
        ? (isTr ? '🎉 Harika rapor!' : '🎉 Great report!')
        : total >= 60
            ? (isTr ? '👍 İyi iş, biraz daha detay eklenebilir.' : '👍 Good job, a bit more detail would help.')
            : total >= 40
                ? (isTr ? '🙂 Fena değil, ama eksikler var.' : '🙂 Not bad, but missing some parts.')
                : (isTr ? '🔧 Bu rapor yeniden üretilemez/anlaşılmaz olabilir.' : '🔧 This report may not be reproducible or clear.')

    return (
        <div className={`rounded-lg border p-4 ${RESULT_TONE_CLS[tone].panel}`}>
            <div className={`text-sm font-black ${RESULT_TONE_CLS[tone].text}`}>{headline} ({total}/100, +{xpEarned} XP)</div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span>{isTr ? 'Başlık' : 'Title'} <ScorePill score={titleScore} max={20} /></span>
                <span>{isTr ? 'Adımlar' : 'Steps'} <ScorePill score={stepsScore} max={30} /></span>
                <span>{isTr ? 'Beklenen/Gerçek' : 'Expected/Actual'} <ScorePill score={eaScore} max={30} /></span>
                <span>{isTr ? 'Severity' : 'Severity'} <ScorePill score={sevScore} max={20} /></span>
            </div>
        </div>
    )
}

// Found bugs are revealed in green; not-yet-found ones stay masked so the
// answer key isn't spoiled before the user finds them.
function BugChecklist({ isTr, darkMode, foundBugIds }) {
    return (
        <div className={`rounded-lg border p-3 ${panelCls(darkMode)}`}>
            <div className="mb-2 text-xs font-black uppercase tracking-wide opacity-60">
                {isTr ? 'Bug Kontrol Listesi' : 'Bug Checklist'}
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
                {BUGS.map((bug, idx) => {
                    const found = foundBugIds.includes(bug.id)
                    return (
                        <div
                            key={bug.id}
                            className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-bold ${found ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-slate-700/50 bg-slate-800/20 text-slate-500'}`}
                        >
                            <span>{found ? '✅' : '🔒'}</span>
                            <span>{found ? bug.label[isTr ? 'tr' : 'en'] : (isTr ? `Bilinmeyen bug #${idx + 1}` : `Unknown bug #${idx + 1}`)}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function LabScoreboard({ isTr, darkMode, xp, foundCount, totalBugs, reportCount, xpPop }) {
    return (
        <div className="grid grid-cols-3 gap-2 md:gap-3">
            <XpStatCard value={xp} label="XP" pop={xpPop} panelClassName={panelCls(darkMode)} />
            <div className={`rounded-lg border p-3 text-center ${panelCls(darkMode)}`}>
                <div className="text-lg font-black text-sky-400">{foundCount}/{totalBugs}</div>
                <div className="text-[11px] font-bold opacity-70">{isTr ? 'Bulunan Bug' : 'Bugs Found'}</div>
            </div>
            <div className={`rounded-lg border p-3 text-center ${panelCls(darkMode)}`}>
                <div className="text-lg font-black text-sky-400">{reportCount}</div>
                <div className="text-[11px] font-bold opacity-70">{isTr ? 'Gönderilen Rapor' : 'Reports Sent'}</div>
            </div>
        </div>
    )
}

export default function ManualTestingLabBlock({ darkMode, language }) {
    const isTr = language === 'tr'
    const [state, setState] = useState(loadState)
    const [lastResult, setLastResult] = useState(null)
    const [xpPop, setXpPop] = useState(null)
    const [xp, setXp] = useState(getXP)

    useEffect(() => { saveState(state) }, [state])
    useEffect(() => subscribeToXpChanges(() => setXp(getXP())), [])

    const handleReportSubmit = (report) => {
        const bug = BUGS.find(b => b.id === report.bugId)
        const evaluation = evaluateReport(report, bug)
        const xpEarned = xpForScore(evaluation.total)
        const at = Date.now()

        setState(curr => {
            const found = evaluation.total >= 50 && !curr.foundBugIds.includes(report.bugId)
                ? [...curr.foundBugIds, report.bugId]
                : curr.foundBugIds
            return {
                foundBugIds: found,
                reports: [{ ...report, ...evaluation, xpEarned, bugLabel: bug?.label, at }, ...curr.reports].slice(0, 20),
            }
        })
        setXp(addXP(xpEarned))
        setLastResult({ ...evaluation, xpEarned, at })
        setXpPop({ amount: xpEarned, at })
    }

    return (
        <div className="mt-4 grid gap-4">
            <LabScoreboard
                isTr={isTr}
                darkMode={darkMode}
                xp={xp}
                foundCount={state.foundBugIds.length}
                totalBugs={BUGS.length}
                reportCount={state.reports.length}
                xpPop={xpPop}
            />
            <BugChecklist isTr={isTr} darkMode={darkMode} foundBugIds={state.foundBugIds} />
            <div className="grid gap-4 md:grid-cols-2">
                <BuggyLoginForm isTr={isTr} darkMode={darkMode} />
                <BugReportForm isTr={isTr} darkMode={darkMode} onSubmit={handleReportSubmit} />
            </div>
            {lastResult && <ResultFeedback result={lastResult} isTr={isTr} />}
        </div>
    )
}
