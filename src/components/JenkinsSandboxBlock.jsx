import { useEffect, useRef, useState } from 'react'

// ─── Jenkins Sandbox — yazılabilir Jenkinsfile + canlı Stage View ───────────
// CP7 (contentplan.md): Docker/K8s Sandbox'larla aynı felsefe ama farklı biçim —
// Jenkins'in öğrenme engeli bir CLI değil, Jenkinsfile SÖZDİZİMİ ve stage/post
// akış mantığıdır. Bu yüzden terminal yerine düzenlenebilir bir Jenkinsfile
// editörü + "▶ Build Now" simüle edilir: kullanıcı dosyayı KENDİSİ değiştirir,
// build'i kendisi kırar, post{failure} ve SKIPPED stage'leri kendi gözüyle
// görür. Konsol çıktıları gerçek Jenkins log biçiminde ve İngilizce kalır
// (terminal çıktısı istisnası, CLAUDE.md §8); görev/ipucu metinleri bilingual.

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

// Verilen '{' konumundan itibaren dengeli bloğun İÇERİĞİNİ döndürür.
function blockAt(text, openIdx) {
    let depth = 0
    for (let i = openIdx; i < text.length; i += 1) {
        if (text[i] === '{') depth += 1
        else if (text[i] === '}') {
            depth -= 1
            if (depth === 0) return text.slice(openIdx + 1, i)
        }
    }
    return null
}

function lineOf(text, idx) {
    return text.slice(0, idx).split('\n').length
}

// Basitleştirilmiş declarative Jenkinsfile parser'ı. Desteklenen alt küme:
// pipeline{}, agent any|none, stages{}, stage('Ad'){ steps{ sh/echo } },
// post{ always/success/failure { echo } }. Hata mesajları gerçek Jenkins
// derleyici çıktıları örnek alınarak yazıldı.
function parseJenkinsfile(src) {
    const text = src.replace(/\/\/[^\n]*/g, '')

    // 1) Süslü parantez dengesi
    let depth = 0
    let line = 1
    let lastOpenLine = 1
    for (const ch of text) {
        if (ch === '\n') line += 1
        if (ch === '{') { depth += 1; lastOpenLine = line }
        if (ch === '}') depth -= 1
        if (depth < 0) {
            return {
                error: `WorkflowScript: ${line}: expecting <block start>, found '}' @ line ${line}.`,
                hint: { tr: 'Süslü parantezler dengesiz — fazladan bir } var. Her açılan { yalnızca bir } ile kapanmalı.', en: 'Braces are unbalanced — there is an extra }. Every { must be closed by exactly one }.' },
            }
        }
    }
    if (depth > 0) {
        return {
            error: `WorkflowScript: ${lastOpenLine}: expecting '}', found '' @ line ${lastOpenLine}, column 1.`,
            hint: { tr: 'Süslü parantezler dengesiz — kapanmamış bir { var. Bloğu } ile kapatmayı unutma.', en: 'Braces are unbalanced — a { was never closed. Do not forget the closing }.' },
        }
    }

    // 2) pipeline kök bloğu
    const pipeMatch = text.match(/pipeline\s*\{/)
    if (!pipeMatch) {
        return {
            error: 'WorkflowScript: 1: Missing required section "pipeline"',
            hint: { tr: 'Her declarative Jenkinsfile "pipeline { ... }" kök bloğuyla başlar.', en: 'Every declarative Jenkinsfile starts with the "pipeline { ... }" root block.' },
        }
    }
    const pipeBody = blockAt(text, pipeMatch.index + pipeMatch[0].length - 1) ?? ''

    // 3) agent zorunlu
    if (!/agent\s+(any|none)/.test(pipeBody)) {
        return {
            error: 'WorkflowScript: 1: Missing required section "agent"',
            hint: { tr: 'Declarative pipeline\'da "agent" bölümü zorunludur — "agent any" satırını pipeline bloğunun içine geri ekle.', en: 'The "agent" section is required in a declarative pipeline — put "agent any" back inside the pipeline block.' },
        }
    }

    // 4) stages zorunlu
    const stagesMatch = pipeBody.match(/stages\s*\{/)
    if (!stagesMatch) {
        return {
            error: 'WorkflowScript: 1: Missing required section "stages"',
            hint: { tr: '"stages { stage(...) { ... } }" bölümü olmadan Jenkins\'in çalıştıracağı hiçbir şey yok.', en: 'Without a "stages { stage(...) { ... } }" section Jenkins has nothing to run.' },
        }
    }
    const stagesBody = blockAt(pipeBody, stagesMatch.index + stagesMatch[0].length - 1) ?? ''

    // 5) stage'leri çıkar
    const stages = []
    const stageRe = /stage\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\{/g
    let sm
    while ((sm = stageRe.exec(stagesBody)) !== null) {
        const name = sm[1]
        const body = blockAt(stagesBody, sm.index + sm[0].length - 1) ?? ''
        const stepsMatch = body.match(/steps\s*\{/)
        const stageLine = lineOf(text, text.indexOf(pipeBody) + pipeBody.indexOf(stagesBody) + sm.index)
        if (!stepsMatch) {
            return {
                error: `WorkflowScript: ${stageLine}: Nothing to execute within stage "${name}"`,
                hint: { tr: `"${name}" stage'inin içinde en az bir adım içeren bir "steps { ... }" bloğu olmalı.`, en: `Stage "${name}" must contain a "steps { ... }" block with at least one step.` },
            }
        }
        const stepsBody = blockAt(body, stepsMatch.index + stepsMatch[0].length - 1) ?? ''
        const steps = []
        for (const rawLine of stepsBody.split('\n')) {
            const stepMatch = rawLine.match(/^\s*(sh|echo)\s+['"](.*)['"]\s*$/)
            if (stepMatch) steps.push({ type: stepMatch[1], arg: stepMatch[2] })
        }
        if (steps.length === 0) {
            return {
                error: `WorkflowScript: ${stageLine}: Nothing to execute within stage "${name}"`,
                hint: { tr: `"${name}" stage'inin steps bloğu boş — içine bir sh '...' veya echo '...' adımı yaz.`, en: `The steps block of stage "${name}" is empty — add an sh '...' or echo '...' step.` },
            }
        }
        stages.push({ name, steps })
    }
    if (stages.length === 0) {
        return {
            error: 'WorkflowScript: 1: No stages specified',
            hint: { tr: 'stages bloğunun içinde en az bir stage(\'Ad\') { steps { ... } } tanımla.', en: 'Define at least one stage(\'Name\') { steps { ... } } inside the stages block.' },
        }
    }

    // 6) pipeline seviyesinde post (opsiyonel)
    const post = {}
    const postMatch = pipeBody.match(/(^|\s)post\s*\{/)
    if (postMatch) {
        const postBody = blockAt(pipeBody, postMatch.index + postMatch[0].length - 1) ?? ''
        for (const key of ['always', 'success', 'failure']) {
            const keyMatch = postBody.match(new RegExp(`${key}\\s*\\{`))
            if (keyMatch) {
                const keyBody = blockAt(postBody, keyMatch.index + keyMatch[0].length - 1) ?? ''
                const echos = []
                for (const rawLine of keyBody.split('\n')) {
                    const echoMatch = rawLine.match(/^\s*echo\s+['"](.*)['"]\s*$/)
                    if (echoMatch) echos.push(echoMatch[1])
                }
                post[key] = echos
            }
        }
    }

    return { stages, post }
}

// sh adımının sahte sonucu — bilinen komutlara gerçekçi çıktılar, 'exit 1'
// içeren komutlara gerçek Jenkins davranışı (stage FAIL + sonrakiler SKIPPED).
function shResult(cmd) {
    if (/(^|\s|;|&&)exit\s+1\b/.test(cmd) || /^false$/.test(cmd.trim())) return { fail: true }
    if (/npm (ci|install)/.test(cmd)) return { out: 'added 1290 packages in 12s' }
    if (/npm test/.test(cmd)) return { out: 'Tests: 24 passed, 24 total' }
    if (/pytest/.test(cmd)) return { out: '24 passed in 3.41s' }
    if (/playwright/.test(cmd)) return { out: '24 passed (18.3s)' }
    if (/mvn/.test(cmd)) return { out: 'BUILD SUCCESS' }
    return { out: null }
}

const STAGE_GLYPH = { pending: '⬜', running: '🔷', success: '✅', failed: '❌', skipped: '⏭️' }

export default function JenkinsSandboxBlock({ block, darkMode, language, onFirstSuccess }) {
    const isTr = language === 'tr'
    const starter = typeof block.starterFile === 'string' ? block.starterFile : pick(block.starterFile, isTr)
    const [editor, setEditor] = useState(starter)
    const [builds, setBuilds] = useState([])
    const [liveStages, setLiveStages] = useState([])
    const [livePost, setLivePost] = useState({})
    const [consoleLines, setConsoleLines] = useState([])
    const [running, setRunning] = useState(false)
    const [flash, setFlash] = useState(false)
    const [celebrate, setCelebrate] = useState(null)
    const [done, setDone] = useState(() => new Set())
    const consoleRef = useRef(null)
    const mountedRef = useRef(true)

    const missions = block.missions || []

    useEffect(() => {
        // StrictMode dev modda mount→cleanup→mount döngüsü yaptığı için ref
        // her mount'ta yeniden true'ya çekilmeli — sadece cleanup'ta false'a
        // çeken sürüm ikinci mount sonrası kalıcı olarak false kalıyordu.
        mountedRef.current = true
        return () => { mountedRef.current = false }
    }, [])
    useEffect(() => {
        if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }, [consoleLines])

    function pushLine(t, x) {
        if (!mountedRef.current) return
        setConsoleLines((prev) => [...prev, { t, x }])
    }

    function triggerFlash() {
        setFlash(true)
        setTimeout(() => { if (mountedRef.current) setFlash(false) }, 700)
    }

    function evaluateMissions(nextBuilds) {
        const newlyDone = []
        missions.forEach((m) => {
            if (!done.has(m.id) && JENKINS_MISSION_CHECKS[m.id] && JENKINS_MISSION_CHECKS[m.id]({ builds: nextBuilds })) {
                newlyDone.push(m.id)
            }
        })
        if (newlyDone.length > 0) {
            const nd = new Set(done)
            newlyDone.forEach((id) => nd.add(id))
            setDone(nd)
            const label = missions.find((m) => m.id === newlyDone[0])
            pushLine('ok', `🎉 ${isTr ? 'Görev tamamlandı:' : 'Mission complete:'} ${pick(label?.text, isTr)}`)
            setCelebrate(newlyDone[0])
            setTimeout(() => { if (mountedRef.current) setCelebrate(null) }, 2200)
            // Learning OS Faz 1 (plan §8.2-S1): senaryo tamamlama anı — TÜM
            // görevler bitince günlük hedefe 1 egzersiz olarak sayılır.
            if (missions.length > 0 && nd.size === missions.length) onFirstSuccess?.()
        }
    }

    async function runBuild() {
        if (running) return
        setRunning(true)
        setConsoleLines([])
        setLivePost({})
        const num = builds.length + 1
        pushLine('sys', `Started by user qa-engineer  —  Build #${num}`)

        const parsed = parseJenkinsfile(editor)
        if (parsed.error) {
            pushLine('err', 'org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:')
            pushLine('err', parsed.error)
            if (parsed.hint) pushLine('hint', `💡 ${pick(parsed.hint, isTr)}`)
            pushLine('sys', 'Finished: FAILURE')
            setLiveStages([])
            triggerFlash()
            const record = { num, status: 'FAILURE', stages: [], postRan: {}, failedStage: null, compileError: parsed.error }
            const nextBuilds = [...builds, record]
            setBuilds(nextBuilds)
            evaluateMissions(nextBuilds)
            setRunning(false)
            return
        }

        const stageStates = parsed.stages.map((s) => ({ name: s.name, status: 'pending' }))
        setLiveStages([...stageStates])
        pushLine('sys', '[Pipeline] Start of Pipeline')
        let failedStage = null

        for (let i = 0; i < parsed.stages.length; i += 1) {
            if (!mountedRef.current) return
            const stage = parsed.stages[i]
            if (failedStage) {
                stageStates[i] = { ...stageStates[i], status: 'skipped' }
                setLiveStages([...stageStates])
                pushLine('sys', `Stage "${stage.name}" skipped due to earlier failure(s)`)
                continue
            }
            stageStates[i] = { ...stageStates[i], status: 'running' }
            setLiveStages([...stageStates])
            pushLine('sys', `[Pipeline] stage (${stage.name})`)
            await sleep(450)
            if (!mountedRef.current) return

            for (const step of stage.steps) {
                if (step.type === 'echo') {
                    pushLine('out', step.arg)
                } else {
                    pushLine('cmd', `+ ${step.arg}`)
                    const res = shResult(step.arg)
                    if (res.fail) {
                        pushLine('err', 'script returned exit code 1')
                        failedStage = stage.name
                        break
                    }
                    if (res.out) pushLine('out', res.out)
                }
            }
            stageStates[i] = { ...stageStates[i], status: failedStage ? 'failed' : 'success' }
            setLiveStages([...stageStates])
            if (failedStage) {
                pushLine('hint', `💡 ${isTr
                    ? `"${failedStage}" stage'i başarısız oldu — gerçek Jenkins'te de sıfırdan farklı exit code build'i kırar ve SONRAKİ stage'ler hiç çalışmaz (SKIPPED).`
                    : `Stage "${failedStage}" failed — in real Jenkins a non-zero exit code breaks the build and the FOLLOWING stages never run (SKIPPED).`}`)
                triggerFlash()
            }
        }

        // post bölümü: always her zaman, success/failure sonuca göre koşar
        const postRan = {}
        const finalStatus = failedStage ? 'FAILURE' : 'SUCCESS'
        for (const key of ['always', failedStage ? 'failure' : 'success']) {
            if (parsed.post[key] !== undefined) {
                postRan[key] = true
                pushLine('sys', `[Pipeline] post (${key})`)
                parsed.post[key].forEach((msg) => pushLine('out', msg))
            }
        }
        setLivePost(postRan)
        pushLine('sys', `Finished: ${finalStatus}`)

        const record = { num, status: finalStatus, stages: stageStates, postRan, failedStage, compileError: null }
        const nextBuilds = [...builds, record]
        setBuilds(nextBuilds)
        evaluateMissions(nextBuilds)
        setRunning(false)
    }

    const lineColor = { sys: 'text-slate-400', cmd: 'text-emerald-400', out: 'text-slate-200', err: 'text-rose-400', hint: 'text-amber-300', ok: 'text-emerald-300 font-bold' }
    const stageChip = {
        pending: darkMode ? 'border-slate-600 text-slate-400' : 'border-slate-400 text-slate-300',
        running: 'border-sky-400 text-sky-300 animate-pulse',
        success: 'border-emerald-400 text-emerald-300',
        failed: 'border-rose-500 text-rose-300',
        skipped: 'border-slate-600 text-slate-500 border-dashed opacity-70',
    }
    const doneCount = missions.filter((m) => done.has(m.id)).length
    const lastBuild = builds[builds.length - 1]

    return (
        <div data-testid="jenkins-sandbox" className={`my-6 rounded-2xl border overflow-hidden ${darkMode ? 'border-red-900 bg-slate-900' : 'border-red-200 bg-white'} ${flash ? 'ring-4 ring-rose-500 transition' : 'transition'}`}>
            <div className={`px-4 py-3 flex items-center justify-between gap-2 ${darkMode ? 'bg-red-950' : 'bg-red-50'}`}>
                <div className="font-bold text-sm flex items-center gap-2">
                    <span>🔧</span>
                    <span className={darkMode ? 'text-red-200' : 'text-red-900'}>
                        {isTr ? 'Jenkins Sandbox — Jenkinsfile\'ı kendin değiştir, build\'i canlı izle' : 'Jenkins Sandbox — edit the Jenkinsfile yourself, watch the build live'}
                    </span>
                </div>
                {missions.length > 0 && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'}`}>
                        {doneCount}/{missions.length} {isTr ? 'görev' : 'missions'}
                    </span>
                )}
            </div>

            {missions.length > 0 && (
                <ol className={`px-4 py-3 space-y-1 text-sm border-b ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                    {missions.map((m) => {
                        const isDoneM = done.has(m.id)
                        const isNext = !isDoneM && missions.find((x) => !done.has(x.id)) === m
                        return (
                            <li key={m.id} data-testid={`jenkins-mission-${m.id}`} data-done={isDoneM ? 'true' : 'false'}
                                className={`flex items-start gap-2 ${isDoneM ? 'opacity-70' : ''} ${celebrate === m.id ? 'animate-bounce' : ''}`}>
                                <span>{isDoneM ? '✅' : isNext ? '👉' : '⬜'}</span>
                                <span className={`${isDoneM ? 'line-through' : ''} ${isNext ? 'font-bold' : ''} ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                    {pick(m.text, isTr)}
                                </span>
                            </li>
                        )
                    })}
                </ol>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-slate-950 flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">📝 Jenkinsfile</span>
                        <button type="button" data-testid="jenkins-sandbox-reset" onClick={() => setEditor(starter)}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-200 px-2 py-1.5 min-h-[36px]">
                            ↺ {isTr ? 'Sıfırla' : 'Reset'}
                        </button>
                    </div>
                    <textarea
                        data-testid="jenkins-sandbox-editor"
                        value={editor}
                        onChange={(e) => setEditor(e.target.value)}
                        spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off"
                        className="flex-1 min-h-[280px] w-full bg-transparent outline-none font-mono text-slate-100 px-3 py-2 leading-relaxed resize-y"
                        style={{ fontSize: '16px' }}
                    />
                    <div className="border-t border-slate-800 px-3 py-2">
                        <button type="button" data-testid="jenkins-sandbox-build" onClick={runBuild} disabled={running}
                            className={`text-xs font-bold px-4 py-2 rounded-lg min-h-[36px] text-white ${running ? 'bg-slate-700 cursor-wait' : 'bg-red-600 hover:bg-red-500'}`}>
                            {running ? (isTr ? '⏳ Build çalışıyor...' : '⏳ Build running...') : '▶ Build Now'}
                        </button>
                    </div>
                </div>

                <div className={`px-4 py-3 space-y-3 ${darkMode ? 'bg-slate-900' : 'bg-slate-800'}`}>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                            🏭 STAGE VIEW
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                            {liveStages.length === 0 && (
                                <span className="text-xs italic text-slate-500">
                                    {isTr ? 'henüz build yok — "▶ Build Now" ile başlat' : 'no build yet — start with "▶ Build Now"'}
                                </span>
                            )}
                            {liveStages.map((s, i) => (
                                <span key={`${s.name}-${i}`} className="flex items-center gap-1.5">
                                    {i > 0 && <span className="text-slate-600">→</span>}
                                    <span data-testid={`jenkins-stage-${i}`} data-status={s.status}
                                        className={`text-xs font-mono px-2.5 py-1.5 rounded-full border ${stageChip[s.status]}`}>
                                        {STAGE_GLYPH[s.status]} {s.name}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                            📮 POST
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {['always', 'success', 'failure'].map((key) => (
                                <span key={key} data-testid={`jenkins-post-${key}`} data-ran={livePost[key] ? 'true' : 'false'}
                                    className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${livePost[key]
                                        ? (key === 'failure' ? 'border-rose-400 text-rose-300 bg-rose-950' : 'border-emerald-400 text-emerald-300 bg-emerald-950')
                                        : 'border-slate-700 text-slate-500'}`}>
                                    {livePost[key] ? '⚡' : '·'} {key}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                            🕘 BUILD HISTORY ({builds.length})
                        </div>
                        <div className="space-y-1">
                            {builds.length === 0 && <span className="text-xs italic text-slate-500">{isTr ? 'henüz yok' : 'none yet'}</span>}
                            {builds.slice(-5).reverse().map((b) => (
                                <div key={b.num} data-testid={`jenkins-build-${b.num}`} data-status={b.status}
                                    className={`text-xs font-mono px-2 py-1 rounded-lg border flex items-center gap-2 ${b.status === 'SUCCESS' ? 'border-emerald-700 text-emerald-300' : 'border-rose-800 text-rose-300'}`}>
                                    <span>{b.status === 'SUCCESS' ? '✅' : '❌'}</span>
                                    <span className="font-bold">#{b.num}</span>
                                    <span>{b.status}</span>
                                    {b.failedStage && <span className="opacity-70">({b.failedStage})</span>}
                                    {b.compileError && <span className="opacity-70">({isTr ? 'derleme hatası' : 'compile error'})</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {celebrate && (
                        <div className="text-center text-2xl animate-bounce" aria-hidden="true">🎉✨🎉</div>
                    )}
                    {lastBuild && !running && (
                        <div className={`text-xs font-bold ${lastBuild.status === 'SUCCESS' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {lastBuild.status === 'SUCCESS'
                                ? (isTr ? '✅ Son build YEŞİL — montaj hattı akıyor.' : '✅ Last build is GREEN — the assembly line is flowing.')
                                : (isTr ? '❌ Son build KIRMIZI — gerçek işte şimdi ekibe bildirim giderdi.' : '❌ Last build is RED — in real work the team would be notified now.')}
                        </div>
                    )}
                </div>
            </div>

            <div ref={consoleRef} data-testid="jenkins-console"
                className="bg-slate-950 border-t border-slate-800 px-3 py-2 font-mono text-xs leading-relaxed max-h-56 overflow-y-auto">
                {consoleLines.length === 0 && (
                    <div className="text-slate-500">
                        {isTr ? '# Console Output — build başlatınca gerçek Jenkins log\'u gibi burada akar' : '# Console Output — streams here like a real Jenkins log once you start a build'}
                    </div>
                )}
                {consoleLines.map((l, i) => (
                    <div key={i} className={`whitespace-pre-wrap break-all ${lineColor[l.t] || 'text-slate-300'}`}>{l.x}</div>
                ))}
            </div>
        </div>
    )
}

// Görev kontrolleri — build geçmişinden state-bazlı otomatik tespit
// (Docker/Linux/Git/K8s Sandbox'larla aynı desen).
const JENKINS_MISSION_CHECKS = {
    'first-green': ({ builds }) => builds.some((b) => b.status === 'SUCCESS'),
    'add-deploy': ({ builds }) => builds.some((b) => b.status === 'SUCCESS' && b.stages.length >= 3 && b.stages.some((s) => /deploy/i.test(s.name))),
    'break-build': ({ builds }) => builds.some((b) => b.status === 'FAILURE' && b.stages.some((s) => s.status === 'skipped')),
    'post-failure': ({ builds }) => builds.some((b) => b.status === 'FAILURE' && b.postRan?.failure),
    'back-to-green': ({ builds }) => {
        const firstFail = builds.findIndex((b) => b.status === 'FAILURE')
        return firstFail !== -1 && builds.slice(firstFail + 1).some((b) => b.status === 'SUCCESS')
    },
}
