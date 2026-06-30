import { useEffect, useState } from 'react'
import { CodeBlock } from './TopicPage'
import { getXP, addXP, getCompletedExercises, markExerciseComplete, subscribeToXpChanges } from '../lib/xp'
import { XpSummaryBar } from './XpStat'

const HINT_PENALTY = 5

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
}

function normalizeCode(code) {
    return (code || '')
        .split('\n')
        .map(line => line.trimEnd())
        .join('\n')
        .trim()
}

function firstDifferentLine(actual, expected) {
    const actualLines = normalizeCode(actual).split('\n')
    const expectedLines = normalizeCode(expected).split('\n')
    const max = Math.max(actualLines.length, expectedLines.length)

    for (let i = 0; i < max; i += 1) {
        if ((actualLines[i] ?? '') !== (expectedLines[i] ?? '')) {
            return {
                line: i + 1,
                actual: actualLines[i] ?? '',
                expected: expectedLines[i] ?? '',
            }
        }
    }

    return null
}

function nextSafeStep(diff, isTr) {
    if (!diff.actual) {
        return isTr
            ? `Önce ${diff.line}. satıra eksik kodu ekle, sonra tekrar kontrol et.`
            : `First add the missing code on line ${diff.line}, then check again.`
    }
    if (!diff.expected) {
        return isTr
            ? `${diff.line}. satır fazladan görünüyor — silmeyi dene, sonra tekrar kontrol et.`
            : `Line ${diff.line} looks extra — try removing it, then check again.`
    }
    return isTr
        ? `${diff.line}. satırı "Beklenen" ile karşılaştır, sadece o satırı düzelt ve tekrar kontrol et.`
        : `Compare line ${diff.line} with "Expected", fix just that line, then check again.`
}

function DiagnosticPanel({ diff, isTr }) {
    if (!diff) return null

    return (
        <div className="mt-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300">
            <div>{isTr ? `Satır ${diff.line} farklı görünüyor.` : `Line ${diff.line} looks different.`}</div>
            <div className="mt-1 font-mono">
                {isTr ? 'Beklenen' : 'Expected'}: {diff.expected || '(empty)'}
            </div>
            <div className="font-mono">
                {isTr ? 'Senin kodun' : 'Your code'}: {diff.actual || '(empty)'}
            </div>
            <div className="mt-1.5 font-sans font-semibold opacity-90">
                👉 {nextSafeStep(diff, isTr)}
            </div>
        </div>
    )
}

// Types out `text` line by line into a terminal-styled panel, like a live run.
function TerminalRun({ text, isTr, runId }) {
    const [shown, setShown] = useState('')

    useEffect(() => {
        setShown('')
        if (!text) return
        let i = 0
        const interval = setInterval(() => {
            i += 1
            setShown(text.slice(0, i))
            if (i >= text.length) clearInterval(interval)
        }, 18)
        return () => clearInterval(interval)
    }, [text, runId])

    const done = shown.length === text.length

    return (
        <div className="mt-3 rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-emerald-400">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                {isTr ? '▶ çalışıyor...' : '▶ running...'}
            </div>
            <pre className="whitespace-pre-wrap">{shown}{!done && <span className="animate-pulse">▋</span>}</pre>
        </div>
    )
}

function HintPanel({ hints, isTr, darkMode, onReveal }) {
    const [level, setLevel] = useState(0)
    const revealed = hints.slice(0, level)
    const hasMore = level < hints.length

    const revealNext = () => {
        const next = level + 1
        setLevel(next)
        onReveal(next)
    }

    return (
        <div className={`mt-3 rounded-lg border p-3 ${panelCls(darkMode)}`}>
            {revealed.length > 0 && (
                <div className="mb-2 grid gap-1.5">
                    {revealed.map((hint, idx) => (
                        <div key={idx} className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-1.5 text-xs font-bold text-amber-300">
                            💡 {isTr ? `İpucu ${idx + 1}` : `Hint ${idx + 1}`}: {pick(hint, isTr)}
                        </div>
                    ))}
                </div>
            )}
            {hasMore ? (
                <button
                    onClick={revealNext}
                    className="min-h-9 rounded-lg bg-amber-600 px-3 text-xs font-black text-white"
                >
                    💡 {isTr ? `${level === 0 ? 'İpucu göster' : 'Sonraki ipucu'} (${level + 1}/${hints.length})` : `${level === 0 ? 'Show hint' : 'Next hint'} (${level + 1}/${hints.length})`}
                </button>
            ) : (
                <div className="text-xs font-bold opacity-60">{isTr ? 'Tüm ipuçları gösterildi.' : 'All hints revealed.'}</div>
            )}
        </div>
    )
}

function FixThePanel({ buggyCode, fixedCode, isTr, darkMode, onPass }) {
    const [draft, setDraft] = useState(buggyCode)
    const [attempts, setAttempts] = useState(0)
    const [result, setResult] = useState(null) // null | 'pass' | 'fail'

    useEffect(() => {
        setDraft(buggyCode || '')
        setAttempts(0)
        setResult(null)
    }, [buggyCode, fixedCode])

    const handleCheck = () => {
        const isCorrect = normalizeCode(draft) === normalizeCode(fixedCode)
        setResult(isCorrect ? 'pass' : 'fail')
        setAttempts(a => a + 1)
        if (isCorrect) onPass()
    }

    const diff = result === 'fail' ? firstDifferentLine(draft, fixedCode) : null

    return (
        <div className={`mt-3 rounded-lg border p-3 ${panelCls(darkMode)}`}>
            <div className="mb-2 text-xs font-bold opacity-70">
                {isTr
                    ? 'Aşağıdaki kutu, yukarıdaki bozuk kodun düzenlenebilir bir kopyası. Hatayı bul, kodu burada düzelt ve "Kontrol Et"e bas — "Beklenen Çıktı" ile eşleşince yeşil onayı göreceksin:'
                    : 'The box below is an editable copy of the buggy code above. Find the bug, fix it here, then click "Check" — you\'ll get a green confirmation once it matches the "Expected Output":'}
            </div>
            <textarea
                value={draft}
                onChange={(e) => { setDraft(e.target.value); setResult(null) }}
                rows={Math.max(4, (buggyCode || '').split('\n').length)}
                spellCheck={false}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-100"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
                <button onClick={handleCheck} className="min-h-9 rounded-lg bg-rose-600 px-3 text-xs font-black text-white">
                    🐛 {isTr ? 'Kontrol Et' : 'Check'}
                </button>
                {attempts >= 2 && result !== 'pass' && (
                    <button onClick={() => setDraft(fixedCode)} className="min-h-9 rounded-lg bg-slate-700 px-3 text-xs font-bold text-white">
                        {isTr ? 'Çözümü göster' : 'Show solution'}
                    </button>
                )}
            </div>
            {result === 'pass' && (
                <div className="mt-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-300">
                    🎉 {isTr ? 'Doğru! Test artık geçiyor.' : 'Correct! The test passes now.'}
                </div>
            )}
            {result === 'fail' && (
                <div className="mt-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300">
                    {isTr ? '🔧 Henüz değil, tekrar dene — İpucu butonuna göz at.' : "🔧 Not yet, try again — check the Hint button."}
                </div>
            )}
            <DiagnosticPanel diff={diff} isTr={isTr} />
        </div>
    )
}

function PracticePanel({ starterCode, solutionCode, expected, isTr, darkMode, onPass, language }) {
    const [draft, setDraft] = useState(starterCode)
    const [attempts, setAttempts] = useState(0)
    const [result, setResult] = useState(null) // null | 'pass' | 'fail'
    const [runId, setRunId] = useState(0)

    useEffect(() => {
        setDraft(starterCode || '')
        setAttempts(0)
        setResult(null)
        setRunId(0)
    }, [starterCode, solutionCode])

    const handleRun = () => {
        const isCorrect = normalizeCode(draft) === normalizeCode(solutionCode)
        setResult(isCorrect ? 'pass' : 'fail')
        setAttempts(a => a + 1)
        if (isCorrect) {
            setRunId(id => id + 1)
            onPass()
        }
    }

    const diff = result === 'fail' ? firstDifferentLine(draft, solutionCode) : null
    const rows = Math.max(6, (starterCode || solutionCode || '').split('\n').length)

    return (
        <div className={`mt-3 rounded-lg border p-3 ${panelCls(darkMode)}`}>
            <div className="mb-2 text-xs font-bold opacity-70">
                {isTr
                    ? `Bu alanda kodu veya komutu kendin yazıp kontrollü şekilde sonucu görebilirsin. Gerçek ${language || 'kod'} derleyici/yorumlayıcısı/terminali değildir; bu egzersizin beklenen çözümüyle karşılaştırır.`
                    : `Write the code or command yourself here and see a controlled result. This is not a real ${language || 'code'} compiler/interpreter/terminal; it compares against this exercise solution.`}
            </div>
            <textarea
                value={draft}
                onChange={(e) => { setDraft(e.target.value); setResult(null) }}
                rows={rows}
                spellCheck={false}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-100"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
                <button onClick={handleRun} className="min-h-9 rounded-lg bg-emerald-600 px-3 text-xs font-black text-white">
                    {'>'} {isTr ? 'Çalıştır ve Kontrol Et' : 'Run and Check'}
                </button>
                <button onClick={() => { setDraft(starterCode || ''); setResult(null) }} className="min-h-9 rounded-lg bg-slate-700 px-3 text-xs font-bold text-white">
                    {isTr ? 'Başlangıca Dön' : 'Reset Starter'}
                </button>
                {attempts >= 2 && result !== 'pass' && (
                    <button onClick={() => { setDraft(solutionCode); setResult(null) }} className="min-h-9 rounded-lg bg-sky-700 px-3 text-xs font-bold text-white">
                        {isTr ? 'Çözümü Uygula' : 'Apply Solution'}
                    </button>
                )}
            </div>

            {result === 'pass' && (
                <>
                    <div className="mt-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-300">
                        {isTr ? 'Doğru! Kod beklenen çözümle eşleşti.' : 'Correct! Your code matches the expected solution.'}
                    </div>
                    <TerminalRun text={expected || (isTr ? 'Test geçti.' : 'Test passed.')} isTr={isTr} runId={runId} />
                </>
            )}
            {result === 'fail' && (
                <>
                    <div className="mt-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-300">
                        {isTr ? 'Henüz değil. Önce farklı satırı düzelt, sonra tekrar çalıştır.' : 'Not yet. Fix the different line first, then run again.'}
                    </div>
                    <DiagnosticPanel diff={diff} isTr={isTr} />
                </>
            )}
        </div>
    )
}

// Adds Run / Show Expected Output / Fix the Failing Test / Hint controls under a code block.
// Run (always shows the correct code's output) and a passing Fix both earn
// block.xpReward XP — once per exercise id, reduced 5pts per hint revealed.
export default function CodePlaygroundBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'

    const codeText = pick(block.code, isTr)
    const expectedText = pick(block.expected, isTr)
    const buggyCode = pick(block.buggyCode, isTr)
    const fixedCode = pick(block.fixedCode, isTr)
    const starterCode = pick(block.starterCode, isTr) || buggyCode || codeText
    const solutionCode = pick(block.solutionCode, isTr) || fixedCode || codeText
    // Practice mode is opt-in: a block must explicitly provide starterCode or
    // solutionCode. Without this gate, every existing Fix-the-Bug exercise
    // (which only sets buggyCode/fixedCode) would also show a redundant
    // "Write Code" button doing the exact same thing as "Fix the Failing Test".
    const hasExplicitPractice = Boolean(block.starterCode || block.solutionCode)

    const hasExpected = Boolean(expectedText)
    const hasFix = Boolean(buggyCode && fixedCode)
    const hasPractice = hasExplicitPractice && Boolean(starterCode && solutionCode)
    const hasHints = Array.isArray(block.hints) && block.hints.length > 0

    // Auto-open the write panel for pure practice blocks (no fix-the-bug mode).
    // This way users see the editor immediately instead of having to click a button.
    const [activePanel, setActivePanel] = useState(() => hasPractice && !hasFix ? 'practice' : null)
    const [runId, setRunId] = useState(0)
    const [hintsUsed, setHintsUsed] = useState(0)
    const [xp, setXp] = useState(getXP)
    const [completed, setCompleted] = useState(getCompletedExercises)
    const [xpPop, setXpPop] = useState(null)

    useEffect(() => subscribeToXpChanges(() => {
        setXp(getXP())
        setCompleted(getCompletedExercises())
    }), [])

    const isDone = block.id ? completed.includes(block.id) : false

    const toggle = (panel) => setActivePanel(curr => (curr === panel ? null : panel))

    const awardXpOnce = () => {
        if (!block.id || isDone) return
        const reward = Math.max(0, (block.xpReward ?? 0) - hintsUsed * HINT_PENALTY)
        const newTotal = addXP(reward)
        markExerciseComplete(block.id)
        setXp(newTotal)
        setCompleted(getCompletedExercises())
        if (reward > 0) setXpPop({ amount: reward, at: Date.now() })
    }

    const runClick = () => {
        setRunId(id => id + 1)
        setActivePanel('run')
        awardXpOnce()
    }

    // Builds one guide sentence listing only the buttons that actually exist for
    // this block, so the user knows which order to try them in before clicking.
    const steps = []
    if (hasPractice) steps.push(isTr ? '✍️ Kod Yaz ve Dene\'yi kullanarak kendi çözümünü yaz' : 'write your own solution with ✍️ Write Code')
    if (hasExpected) steps.push(isTr ? '▶ Çalıştır\'a basıp tahminini kontrol et' : 'click ▶ Run to check your guess')
    if (hasFix) steps.push(isTr ? '🐛 ile bozuk kodu düzeltmeyi dene' : 'try fixing the bug with 🐛')
    if (hasHints) steps.push(isTr ? 'takılırsan 💡 İpucu\'na bak' : "if you're stuck, check 💡 Hint")
    const guideText = steps.length
        ? (isTr ? `Önce kodu oku, çıktıyı tahmin et; sonra ${steps.join(', ')}.` : `First read the code and guess the output; then ${steps.join(', ')}.`)
        : ''

    return (
        <div>
            <XpSummaryBar xp={xp} completedCount={completed.length} pop={xpPop} isTr={isTr} panelClassName={panelCls(darkMode)} />

            {block.label && (
                <div className={`mt-4 mb-1 text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {pick(block.label, isTr)}
                </div>
            )}
            {block.task && (
                <div className={`mb-3 rounded-lg border p-3 text-sm leading-relaxed ${darkMode ? 'border-indigo-700/40 bg-indigo-950/40 text-indigo-200' : 'border-indigo-200 bg-indigo-50 text-indigo-900'}`}>
                    {pick(block.task, isTr)}
                </div>
            )}

            {block.explanation && (
                <div className={`mb-2 rounded-lg border-l-4 border-sky-500 px-3 py-2 text-xs font-bold ${darkMode ? 'bg-sky-500/10 text-sky-200' : 'bg-sky-50 text-sky-900'}`}>
                    🎯 {pick(block.explanation, isTr)}
                </div>
            )}

            <CodeBlock code={codeText} language={block.language} darkMode={darkMode} />

            {guideText && (
                <div className={`mt-2 text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {guideText}
                </div>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
                {hasPractice && (
                    <button onClick={() => toggle('practice')} className="min-h-9 rounded-lg bg-violet-600 px-3 text-xs font-black text-white">
                        {isTr ? 'Kod Yaz ve Dene' : 'Write Code'}
                    </button>
                )}
                {hasExpected && (
                    <button onClick={runClick} className="min-h-9 rounded-lg bg-emerald-600 px-3 text-xs font-black text-white">
                        ▶ {isTr ? 'Çalıştır' : 'Run'}
                    </button>
                )}
                {hasExpected && (
                    <button onClick={() => toggle('expected')} className="min-h-9 rounded-lg bg-sky-600 px-3 text-xs font-black text-white">
                        👁 {isTr ? 'Beklenen Çıktıyı Göster' : 'Show Expected Output'}
                    </button>
                )}
                {hasFix && (
                    <button onClick={() => toggle('fix')} className="min-h-9 rounded-lg bg-rose-600 px-3 text-xs font-black text-white">
                        🐛 {isTr ? 'Bozuk Testi Düzelt' : 'Fix the Failing Test'}
                    </button>
                )}
                {hasHints && (
                    <button onClick={() => toggle('hint')} className="min-h-9 rounded-lg bg-amber-600 px-3 text-xs font-black text-white">
                        💡 {isTr ? 'İpucu' : 'Hint'}
                    </button>
                )}
            </div>

            {activePanel === 'practice' && (
                <PracticePanel
                    starterCode={starterCode}
                    solutionCode={solutionCode}
                    expected={expectedText}
                    isTr={isTr}
                    darkMode={darkMode}
                    onPass={awardXpOnce}
                    language={block.language}
                />
            )}

            {activePanel === 'run' && <TerminalRun text={expectedText} isTr={isTr} runId={runId} />}

            {activePanel === 'expected' && (
                <div className={`mt-3 rounded-lg border-l-4 border-emerald-500 p-3 font-mono text-xs ${darkMode ? 'bg-gray-900 text-emerald-400' : 'bg-emerald-50 text-emerald-800'}`}>
                    <div className={`mb-1 font-sans text-xs ${darkMode ? 'opacity-50' : 'opacity-60'}`}>
                        {isTr ? '▶ Beklenen Çıktı:' : '▶ Expected Output:'}
                    </div>
                    <pre className="whitespace-pre-wrap">{expectedText}</pre>
                    {block.explanation && (
                        <div className={`mt-2 font-sans text-xs font-normal ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {pick(block.explanation, isTr)}
                        </div>
                    )}
                </div>
            )}

            {activePanel === 'fix' && (
                <FixThePanel buggyCode={buggyCode} fixedCode={fixedCode} isTr={isTr} darkMode={darkMode} onPass={awardXpOnce} />
            )}

            {activePanel === 'hint' && <HintPanel hints={block.hints} isTr={isTr} darkMode={darkMode} onReveal={setHintsUsed} />}
        </div>
    )
}
