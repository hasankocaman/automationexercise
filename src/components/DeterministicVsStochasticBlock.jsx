import { useMemo, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   DeterministicVsStochasticBlock — Modül L-2 (AIQA_ROADMAP.md)
   "İki Dünya: Kesin Sonuç vs Olası Sonuç Testleri"

   İki interaktif eleman, tek blokta:
   1) "İki Ekran" — solda deterministik Playwright assertion (her koşuda AYNI
      PASS), sağda aynı senaryonun AI versiyonu (her koşuda FARKLI yanıt, rubrik
      ile puanlanır). "Tekrar Koş" ikisini de yeniden çalıştırır; sol taraf hep
      aynı, sağ taraf el ile yazılmış varyasyonlar arasında döner. "Neden farklı?"
      mekanizmayı açar.
   2) "Hangi Strateji?" — senaryolar gösterilir, kullanıcı deterministik mi /
      stokastik mi seçer, anında geri bildirim + skor.

   Gerçek API çağrısı YOK — tüm varyasyon el ile yazılmış veriden gelir
   (bkz. llmcreate.md "canlı API çağrısı yok" kuralı). Veri `block` üzerinden
   gelir; Sonnet içeriği llmAgentsData.js'te `det-vs-stoch` bloğuna ekler.
   ───────────────────────────────────────────────────────────────────────── */

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function scoreColor(score, darkMode) {
    if (score >= 4) return darkMode ? 'text-emerald-300' : 'text-emerald-600'
    if (score >= 3) return darkMode ? 'text-amber-300' : 'text-amber-600'
    return darkMode ? 'text-rose-300' : 'text-rose-500'
}

function DeterministicVsStochasticBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'

    const det = block.deterministic || {}
    const stoch = block.stochastic || {}
    const runs = Array.isArray(stoch.runs) ? stoch.runs : []
    const scenarios = Array.isArray(block.scenarios) ? block.scenarios : []

    /* ── 1. İki Ekran durumu ── */
    const [runCount, setRunCount] = useState(0)          // kaç kez koşuldu
    const [showWhy, setShowWhy] = useState(false)

    const activeRun = runs.length ? runs[runCount % runs.length] : null
    const detPasses = det.result?.verdict !== 'fail'     // deterministik: hep aynı

    function runAgain() {
        setRunCount(c => c + 1)
    }

    /* ── 2. Hangi Strateji? oyunu durumu ── */
    const [idx, setIdx] = useState(0)
    const [picked, setPicked] = useState(null)           // 'det' | 'stoch' | null
    const [correctCount, setCorrectCount] = useState(0)
    const [answeredIds, setAnsweredIds] = useState(() => new Set())

    const scenario = scenarios[idx]
    const finished = scenarios.length > 0 && answeredIds.size >= scenarios.length
    const isCorrect = picked != null && scenario && picked === scenario.answer

    function choose(choice) {
        if (picked != null || !scenario) return
        setPicked(choice)
        if (choice === scenario.answer && !answeredIds.has(idx)) {
            setCorrectCount(c => c + 1)
        }
        setAnsweredIds(prev => {
            const next = new Set(prev)
            next.add(idx)
            return next
        })
    }

    function nextScenario() {
        setPicked(null)
        setIdx(i => (i + 1) % scenarios.length)
    }

    function resetGame() {
        setIdx(0); setPicked(null); setCorrectCount(0); setAnsweredIds(new Set())
    }

    /* ── Ortak sınıflar ── */
    const card = darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    const subtle = darkMode ? 'text-slate-400' : 'text-slate-500'
    const codeBox = darkMode ? 'bg-black text-slate-200' : 'bg-slate-50 text-slate-800 border border-slate-200'

    const rubric = useMemo(() => activeRun?.scores || {}, [activeRun])

    return (
        <div className="mt-6 space-y-6" data-testid="det-vs-stoch-block">
            {/* ══════════ 1. İKİ EKRAN ══════════ */}
            <div className={`rounded-2xl border p-4 md:p-5 ${card}`}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {isTr ? '🖥️ İki Ekran: Aynı Senaryo, İki Test Dünyası' : '🖥️ Two Screens: Same Scenario, Two Testing Worlds'}
                    </h4>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                            {isTr ? `Koşu #${runCount + 1}` : `Run #${runCount + 1}`}
                        </span>
                        <button
                            type="button"
                            onClick={runAgain}
                            data-testid="det-vs-stoch-run"
                            className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                        >
                            {isTr ? '↻ Tekrar Koş' : '↻ Run Again'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SOL: Deterministik */}
                    <div className={`rounded-xl border p-3 ${darkMode ? 'border-emerald-500/40' : 'border-emerald-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">⚙️</span>
                            <span className={`font-semibold text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                {pick(det.label, isTr) || (isTr ? 'Deterministik (Playwright)' : 'Deterministic (Playwright)')}
                            </span>
                        </div>
                        {det.code && (
                            <pre className={`text-xs rounded-lg p-3 overflow-x-auto ${codeBox}`}><code>{pick(det.code, isTr)}</code></pre>
                        )}
                        <div
                            key={`det-${runCount}`}
                            className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-mono det-vs-stoch-pop ${
                                detPasses
                                    ? (darkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700')
                                    : (darkMode ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-50 text-rose-700')
                            }`}
                        >
                            <span>{detPasses ? '✅' : '❌'}</span>
                            <span>{pick(det.result?.text, isTr) || (detPasses ? 'PASS' : 'FAIL')}</span>
                        </div>
                        <p className={`mt-2 text-xs ${subtle}`}>
                            {isTr
                                ? 'Girdi aynıysa sonuç HER koşuda birebir aynı. Tek bir "doğru" string\'e karşı assert.'
                                : 'Same input → identical result on EVERY run. Assert against one single "correct" string.'}
                        </p>
                    </div>

                    {/* SAĞ: Stokastik */}
                    <div className={`rounded-xl border p-3 ${darkMode ? 'border-violet-500/40' : 'border-violet-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🎲</span>
                            <span className={`font-semibold text-sm ${darkMode ? 'text-violet-300' : 'text-violet-700'}`}>
                                {pick(stoch.label, isTr) || (isTr ? 'Stokastik (LLM-judge)' : 'Stochastic (LLM-judge)')}
                            </span>
                        </div>
                        {stoch.code && (
                            <pre className={`text-xs rounded-lg p-3 overflow-x-auto ${codeBox}`}><code>{pick(stoch.code, isTr)}</code></pre>
                        )}
                        {activeRun ? (
                            <div key={`stoch-${runCount}`} className="det-vs-stoch-pop">
                                <div className={`mt-3 rounded-lg px-3 py-2 text-sm ${darkMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>
                                    <span className={`block text-[11px] uppercase tracking-wide mb-1 ${subtle}`}>{isTr ? 'Modelin yanıtı' : "Model's answer"}</span>
                                    “{pick(activeRun.answer, isTr)}”
                                </div>
                                <div className="mt-2 space-y-1">
                                    {Object.entries(rubric).map(([k, v]) => (
                                        <div key={k} className="flex items-center justify-between text-xs">
                                            <span className={subtle}>{k}</span>
                                            <span className={`font-mono font-semibold ${scoreColor(v, darkMode)}`}>{v}/5</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-mono ${
                                    activeRun.verdict === 'pass'
                                        ? (darkMode ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700')
                                        : (darkMode ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-50 text-rose-700')
                                }`}>
                                    <span>{activeRun.verdict === 'pass' ? '✅' : '⚠️'}</span>
                                    <span>{activeRun.verdict === 'pass'
                                        ? (isTr ? 'Rubrik eşiğini geçti' : 'Passed the rubric threshold')
                                        : (isTr ? 'Rubrik eşiğinin altında' : 'Below the rubric threshold')}</span>
                                </div>
                            </div>
                        ) : (
                            <p className={`mt-3 text-xs ${subtle}`}>{isTr ? 'Koşmak için "Tekrar Koş"a bas.' : 'Press "Run Again" to run.'}</p>
                        )}
                        <p className={`mt-2 text-xs ${subtle}`}>
                            {isTr
                                ? 'Aynı girdi FARKLI yanıt üretebilir — tek string\'e değil, bir rubriğe göre değerlendirirsin.'
                                : 'Same input can produce DIFFERENT answers — you judge against a rubric, not one string.'}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        onClick={() => setShowWhy(w => !w)}
                        data-testid="det-vs-stoch-why"
                        className={`text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                            darkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                        {showWhy ? (isTr ? '▲ Gizle' : '▲ Hide') : (isTr ? '▼ Neden farklı?' : '▼ Why are they different?')}
                    </button>
                    {showWhy && (
                        <div className={`mt-3 rounded-xl p-4 text-sm leading-relaxed border-l-4 border-indigo-500 ${darkMode ? 'bg-indigo-500/10 text-slate-200' : 'bg-indigo-50 text-slate-700'}`}>
                            {pick(block.whyDifferent, isTr) || (isTr
                                ? 'Playwright çıktısı sabit bir DOM/HTTP durumundan gelir; assertion tek bir beklenen değere karşıdır. LLM ise her token\'ı bir olasılık dağılımından örnekler — sıcaklık > 0 olduğunda aynı prompt farklı yollar üretir. Bu yüzden AI testinde "== beklenen" yerine "rubriği karşılıyor mu?" sorulur ve pass/fail bir güven eşiğine bağlanır.'
                                : 'Playwright output comes from a fixed DOM/HTTP state; the assertion is against a single expected value. An LLM samples each token from a probability distribution — with temperature > 0 the same prompt yields different paths. That is why AI testing asks "does it satisfy the rubric?" instead of "== expected", and ties pass/fail to a confidence threshold.')}
                        </div>
                    )}
                </div>
            </div>

            {/* ══════════ 2. HANGİ STRATEJİ? ══════════ */}
            {scenarios.length > 0 && (
                <div className={`rounded-2xl border p-4 md:p-5 ${card}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <h4 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {isTr ? '🧭 Hangi Strateji? — Senaryo Sınıflandırma' : '🧭 Which Strategy? — Scenario Classification'}
                        </h4>
                        <span className={`text-xs font-mono px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                            {isTr ? `Doğru: ${correctCount}/${scenarios.length}` : `Correct: ${correctCount}/${scenarios.length}`}
                        </span>
                    </div>

                    {scenario && (
                        <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-800' : 'bg-slate-50 border border-slate-200'}`}>
                            <p className={`text-sm mb-1 ${subtle}`}>{isTr ? `Senaryo ${idx + 1}/${scenarios.length}` : `Scenario ${idx + 1}/${scenarios.length}`}</p>
                            <p className={`text-sm font-medium mb-4 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{pick(scenario.text, isTr)}</p>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { key: 'det', emoji: '⚙️', label: isTr ? 'Deterministik' : 'Deterministic' },
                                    { key: 'stoch', emoji: '🎲', label: isTr ? 'Stokastik' : 'Stochastic' },
                                ].map(opt => {
                                    const chosen = picked === opt.key
                                    const reveal = picked != null
                                    const right = scenario.answer === opt.key
                                    let cls = darkMode ? 'border-slate-600 hover:border-indigo-400 text-slate-200' : 'border-slate-300 hover:border-indigo-400 text-slate-700'
                                    if (reveal && right) cls = darkMode ? 'border-emerald-500 bg-emerald-500/15 text-emerald-200' : 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                    else if (reveal && chosen && !right) cls = darkMode ? 'border-rose-500 bg-rose-500/15 text-rose-200' : 'border-rose-500 bg-rose-50 text-rose-700'
                                    return (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            disabled={reveal}
                                            onClick={() => choose(opt.key)}
                                            data-testid={`det-vs-stoch-choice-${opt.key}`}
                                            className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold transition-colors disabled:cursor-default ${cls}`}
                                        >
                                            <span className="text-lg mr-1">{opt.emoji}</span>{opt.label}
                                        </button>
                                    )
                                })}
                            </div>

                            {picked != null && (
                                <div className={`mt-4 rounded-lg p-3 text-sm leading-relaxed border-l-4 ${
                                    isCorrect
                                        ? (darkMode ? 'border-emerald-500 bg-emerald-500/10 text-slate-200' : 'border-emerald-500 bg-emerald-50 text-slate-700')
                                        : (darkMode ? 'border-amber-500 bg-amber-500/10 text-slate-200' : 'border-amber-500 bg-amber-50 text-slate-700')
                                }`}>
                                    <span className="font-semibold">{isCorrect ? (isTr ? '✅ Doğru. ' : '✅ Correct. ') : (isTr ? '🤔 Tekrar düşün. ' : '🤔 Rethink. ')}</span>
                                    {pick(scenario.explain, isTr)}
                                </div>
                            )}

                            <div className="mt-4 flex items-center gap-2">
                                {picked != null && !finished && (
                                    <button type="button" onClick={nextScenario} data-testid="det-vs-stoch-next"
                                        className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
                                        {isTr ? 'Sonraki →' : 'Next →'}
                                    </button>
                                )}
                                {finished && (
                                    <>
                                        <span className={`text-sm font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                                            {isTr ? `🎉 Bitti! ${correctCount}/${scenarios.length} doğru.` : `🎉 Done! ${correctCount}/${scenarios.length} correct.`}
                                        </span>
                                        <button type="button" onClick={resetGame}
                                            className={`text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${darkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                                            {isTr ? '↺ Baştan' : '↺ Restart'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default DeterministicVsStochasticBlock
