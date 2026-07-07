import { useMemo, useState } from 'react'

/**
 * TokenPredictorBlock (Token Lab) — /llm-agents sayfasının interaktif "sandbox"ı.
 *
 * LLM'in çekirdek mekanizmasını (next-token prediction) YAŞATIR: kullanıcı hazır
 * bir bağlam seçer, modelin aday token'larını olasılıklarıyla görür ve tıklayarak
 * / greedy / sample ile cümleyi token token kurar. Temperature slider'ı gerçek
 * softmax yeniden ağırlıklandırması yapar (p^(1/T), normalize edilir). "Jaguar"
 * ikiz senaryosu bağlamın dağılımı nasıl değiştirdiğini; düşük olasılıklı "tuhaf"
 * token yolu halüsinasyonun kökenini gösterir. Deterministiktir, API çağrısı yok
 * (bkz. llmcreate.md "Kapsam Dışı").
 */

// ── Senaryo ağaçları (dil başına; olasılıklar taban dağılımdır, T=1.0) ────────
const SCENARIOS = {
    tr: [
        {
            id: 'selenium',
            label: 'Selenium cümlesi',
            context: 'Selenium bir test',
            root: {
                candidates: [
                    { t: 'otomasyon', p: 0.55, next: { candidates: [
                        { t: 'aracıdır.', p: 0.62 },
                        { t: "framework'üdür.", p: 0.2 },
                        { t: 'kütüphanesidir.', p: 0.13 },
                        { t: 'pastasıdır.', p: 0.05, weird: true },
                    ] } },
                    { t: 'aracı', p: 0.25, next: { candidates: [
                        { t: 'olarak bilinir.', p: 0.5 },
                        { t: 'değildir.', p: 0.3 },
                        { t: 'sayılır.', p: 0.15 },
                        { t: 'yemeğidir.', p: 0.05, weird: true },
                    ] } },
                    { t: 'mühendisi', p: 0.12, next: { candidates: [
                        { t: 'için vazgeçilmezdir.', p: 0.6 },
                        { t: 'olmayı gerektirmez.', p: 0.3 },
                        { t: 'tarafından yenilir.', p: 0.1, weird: true },
                    ] } },
                    { t: 'uzayıdır.', p: 0.08, weird: true },
                ],
            },
        },
        {
            id: 'jaguar-nature',
            label: 'Jaguar (belgesel)',
            context: 'Belgeselde izlediğimiz jaguar çok hızlı bir',
            root: {
                candidates: [
                    { t: 'hayvandır.', p: 0.62 },
                    { t: 'avcıdır.', p: 0.25 },
                    { t: 'arabadır.', p: 0.08, weird: true },
                    { t: 'işlemcidir.', p: 0.05, weird: true },
                ],
            },
        },
        {
            id: 'jaguar-car',
            label: 'Jaguar (galeri)',
            context: 'Galeride sergilenen jaguar çok hızlı bir',
            root: {
                candidates: [
                    { t: 'arabadır.', p: 0.6 },
                    { t: 'otomobildir.', p: 0.27 },
                    { t: 'hayvandır.', p: 0.08, weird: true },
                    { t: 'kedidir.', p: 0.05, weird: true },
                ],
            },
        },
    ],
    en: [
        {
            id: 'selenium',
            label: 'Selenium sentence',
            context: 'Selenium is a test',
            root: {
                candidates: [
                    { t: 'automation', p: 0.55, next: { candidates: [
                        { t: 'tool.', p: 0.62 },
                        { t: 'framework.', p: 0.2 },
                        { t: 'library.', p: 0.13 },
                        { t: 'cake.', p: 0.05, weird: true },
                    ] } },
                    { t: 'tool', p: 0.25, next: { candidates: [
                        { t: 'used worldwide.', p: 0.5 },
                        { t: 'indeed.', p: 0.3 },
                        { t: 'of choice.', p: 0.15 },
                        { t: 'sandwich.', p: 0.05, weird: true },
                    ] } },
                    { t: 'engineering', p: 0.12, next: { candidates: [
                        { t: 'essential.', p: 0.6 },
                        { t: 'skill.', p: 0.3 },
                        { t: 'dessert.', p: 0.1, weird: true },
                    ] } },
                    { t: 'galaxy.', p: 0.08, weird: true },
                ],
            },
        },
        {
            id: 'jaguar-nature',
            label: 'Jaguar (documentary)',
            context: 'The jaguar in the documentary is a very fast',
            root: {
                candidates: [
                    { t: 'animal.', p: 0.62 },
                    { t: 'predator.', p: 0.25 },
                    { t: 'car.', p: 0.08, weird: true },
                    { t: 'processor.', p: 0.05, weird: true },
                ],
            },
        },
        {
            id: 'jaguar-car',
            label: 'Jaguar (showroom)',
            context: 'The jaguar in the showroom is a very fast',
            root: {
                candidates: [
                    { t: 'car.', p: 0.6 },
                    { t: 'vehicle.', p: 0.27 },
                    { t: 'animal.', p: 0.08, weird: true },
                    { t: 'cat.', p: 0.05, weird: true },
                ],
            },
        },
    ],
}

// Temperature ile yeniden ağırlıklandırma: p_i^(1/T) / toplam — gerçek formül.
function applyTemperature(candidates, temp) {
    const powered = candidates.map((c) => Math.pow(c.p, 1 / temp))
    const sum = powered.reduce((a, b) => a + b, 0)
    return candidates.map((c, i) => ({ ...c, adjP: powered[i] / sum }))
}

function TokenPredictorBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const scenarios = SCENARIOS[isTr ? 'tr' : 'en']

    const [scenarioIdx, setScenarioIdx] = useState(0)
    const [picked, setPicked] = useState([]) // seçilen token dizisi
    const [node, setNode] = useState(scenarios[0].root) // mevcut aday düğümü (null = cümle bitti)
    const [usedWeird, setUsedWeird] = useState(false)
    const [onlyGreedy, setOnlyGreedy] = useState(true)
    const [temp, setTemp] = useState(1.0)
    const [doneMissions, setDoneMissions] = useState([])
    const [shiftVisited, setShiftVisited] = useState([]) // ilk token'ı seçilen jaguar senaryoları

    const scenario = scenarios[scenarioIdx]
    const missions = Array.isArray(block?.missions) ? block.missions : []
    const adjusted = useMemo(
        () => (node ? applyTemperature(node.candidates, temp) : []),
        [node, temp]
    )

    function addMission(id) {
        setDoneMissions((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }

    function selectScenario(idx) {
        setScenarioIdx(idx)
        setPicked([])
        setNode(scenarios[idx].root)
        setUsedWeird(false)
        setOnlyGreedy(true)
    }

    function reset() {
        selectScenario(scenarioIdx)
    }

    function pick(candidate, viaGreedy) {
        if (!node) return
        const nextPicked = [...picked, candidate.t]
        setPicked(nextPicked)
        if (!viaGreedy) setOnlyGreedy(false)
        if (candidate.weird) { setUsedWeird(true); addMission('weird-path') }

        if (scenario.id.startsWith('jaguar') && picked.length === 0) {
            setShiftVisited((prev) => {
                const next = prev.includes(scenario.id) ? prev : [...prev, scenario.id]
                if (next.length >= 2) addMission('context-shift')
                return next
            })
        }

        const nextNode = candidate.next || null
        setNode(nextNode)
        // Cümle bitti ve tüm seçimler greedy ile yapıldıysa görev tamamlanır
        if (!nextNode && viaGreedy && onlyGreedy) addMission('greedy-complete')
    }

    function pickGreedy() {
        if (!node) return
        const best = adjusted.reduce((a, b) => (b.adjP > a.adjP ? b : a))
        pick(best, true)
    }

    function pickSample() {
        if (!node) return
        addMission('try-sample')
        if (temp >= 1.5) addMission('high-temp')
        let r = Math.random()
        let chosen = adjusted[adjusted.length - 1]
        for (const c of adjusted) {
            if (r < c.adjP) { chosen = c; break }
            r -= c.adjP
        }
        pick(chosen, false)
    }

    const panelBg = darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-violet-200'
    const softText = darkMode ? 'text-gray-300' : 'text-gray-700'
    const sentenceDone = node === null

    return (
        <div data-testid="token-lab" className={`rounded-xl border-2 ${panelBg} p-3 md:p-5 my-4 space-y-4`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-base md:text-lg">🧪 {isTr ? 'Token Lab — Bir LLM Gibi Tahmin Et' : 'Token Lab — Predict Like an LLM'}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-violet-900/40 text-violet-300' : 'bg-violet-100 text-violet-800'}`}>
                    {isTr ? 'Simülasyon — gerçek model çağrısı yok' : 'Simulation — no real model call'}
                </span>
            </div>

            {/* Senaryo seçimi */}
            <div className="flex flex-wrap gap-2">
                {scenarios.map((s, idx) => (
                    <button
                        key={s.id}
                        type="button"
                        data-testid={`token-lab-scenario-${s.id}`}
                        onClick={() => selectScenario(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs md:text-sm border min-h-[36px] transition ${idx === scenarioIdx
                            ? 'bg-violet-600 text-white border-violet-600'
                            : darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-violet-300 text-violet-800 hover:bg-violet-50'}`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Kurulan cümle */}
            <div data-testid="token-lab-output" className={`rounded-lg p-3 font-mono text-sm md:text-base ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-violet-50 text-gray-900'}`}>
                <span className={softText}>{scenario.context}</span>
                {picked.map((t, i) => (
                    <span key={i} className="ml-1 px-1 rounded bg-violet-600/20 text-violet-500 font-semibold">{t}</span>
                ))}
                {!sentenceDone && <span className="ml-1 animate-pulse">▁</span>}
                {sentenceDone && (
                    <span data-testid="token-lab-done" className="ml-2 text-green-500 font-semibold">
                        ✅ {isTr ? 'Cümle tamamlandı' : 'Sentence complete'}
                        {usedWeird && (
                            <span className="ml-2 text-amber-500">
                                ⚡ {isTr ? 'Akıcı ama YANLIŞ — halüsinasyon tam olarak budur: model düşük olasılıklı ama "mümkün" bir devamı seçti.' : 'Fluent but WRONG — this is exactly what a hallucination is: the model picked a low-probability yet "possible" continuation.'}
                            </span>
                        )}
                    </span>
                )}
            </div>

            {/* Temperature */}
            <div className="flex items-center gap-3 flex-wrap">
                <label className={`text-xs md:text-sm font-semibold ${softText}`} htmlFor="token-lab-temp">
                    🌡️ Temperature: {temp.toFixed(1)}
                </label>
                <input
                    id="token-lab-temp"
                    data-testid="token-lab-temp"
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={temp}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                    className="w-40 md:w-56 accent-violet-600"
                />
                <span className={`text-xs ${softText}`}>
                    {temp < 0.7
                        ? (isTr ? 'Düşük: dağılım sivrileşir, hep en olası kazanır' : 'Low: distribution sharpens, the most likely always wins')
                        : temp > 1.3
                            ? (isTr ? 'Yüksek: dağılım düzleşir, sürprizler olası' : 'High: distribution flattens, surprises become likely')
                            : (isTr ? 'Orta: taban dağılım' : 'Medium: base distribution')}
                </span>
            </div>

            {/* Aday token'lar */}
            {!sentenceDone && (
                <div data-testid="token-lab-candidates" className="space-y-1.5">
                    <p className={`text-xs font-semibold ${softText}`}>{isTr ? 'Modelin aday token\'ları (tıkla ve seç):' : 'The model\'s candidate tokens (click to pick):'}</p>
                    {adjusted.map((c, i) => (
                        <button
                            key={c.t}
                            type="button"
                            data-testid={`token-lab-candidate-${i}`}
                            onClick={() => pick(c, false)}
                            className={`w-full flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs md:text-sm min-h-[36px] transition hover:scale-[1.01] ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-violet-200 hover:bg-violet-50'}`}
                        >
                            <span className={`font-mono font-semibold ${c.weird ? 'text-amber-500' : 'text-violet-500'}`}>{c.t}</span>
                            <span className="flex-1 h-2 rounded bg-gray-500/20 overflow-hidden">
                                <span className={`block h-full ${c.weird ? 'bg-amber-500' : 'bg-violet-500'}`} style={{ width: `${Math.max(2, Math.round(c.adjP * 100))}%` }} />
                            </span>
                            <span className={`font-mono text-xs ${softText}`}>%{(c.adjP * 100).toFixed(1)}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Kontroller */}
            <div className="flex items-center gap-2 flex-wrap">
                <button
                    type="button"
                    data-testid="token-lab-greedy"
                    onClick={pickGreedy}
                    disabled={sentenceDone}
                    className="px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:opacity-90 transition min-h-[36px] disabled:opacity-40"
                >
                    🎯 {isTr ? 'En Olasıyı Seç (greedy)' : 'Pick Most Likely (greedy)'}
                </button>
                <button
                    type="button"
                    data-testid="token-lab-sample"
                    onClick={pickSample}
                    disabled={sentenceDone}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm border min-h-[36px] disabled:opacity-40 ${darkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-800' : 'border-violet-300 text-violet-800 hover:bg-violet-50'}`}
                >
                    🎲 {isTr ? 'Örnekle (sample)' : 'Sample'}
                </button>
                <button
                    type="button"
                    data-testid="token-lab-reset"
                    onClick={reset}
                    className={`px-3 py-2 rounded-lg text-sm border min-h-[36px] ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                    ↺ {isTr ? 'Sıfırla' : 'Reset'}
                </button>
            </div>

            {/* Görevler */}
            {missions.length > 0 && (
                <div className={`rounded-lg p-3 ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
                    <p className="font-semibold text-sm mb-2">🎯 {isTr ? 'Görevler' : 'Missions'} ({doneMissions.length}/{missions.length})</p>
                    <ul className="space-y-1">
                        {missions.map((m) => {
                            const done = doneMissions.includes(m.id)
                            return (
                                <li key={m.id} data-testid={`token-lab-mission-${m.id}`} data-done={done ? 'true' : 'false'} className={`flex items-start gap-2 text-xs md:text-sm ${done ? 'text-green-500 line-through' : softText}`}>
                                    <span aria-hidden="true">{done ? '✅' : '⬜'}</span>
                                    <span>{isTr ? m.text?.tr : m.text?.en}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default TokenPredictorBlock
