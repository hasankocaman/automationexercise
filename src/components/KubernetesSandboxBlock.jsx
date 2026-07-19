import { useEffect, useRef, useState } from 'react'

// ─── Kubernetes Sandbox — durum-makineli interaktif kubectl terminali ───────
// CP5.3 (contentplan.md): Docker Sandbox'la (CP1) aynı mimari — kullanıcı
// komutu KENDİSİ yazar, sahte ama durumlu bir cluster engine'i (deployment'lar,
// pod'lar, service'ler) sağdaki panelde canlı güncellenir. Kubernetes'e özgü
// en öğretici an: bir pod SİLİNDİĞİNDE, deployment'a bağlıysa birkaç saniye
// içinde OTOMATİK olarak yeniden oluşturulur (self-healing) — Docker
// container'larının asla yapmadığı bir şey, bu yüzden ayrı bir "aha" anı.

function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

function fakeHash(len = 5) {
    let s = ''
    for (let i = 0; i < len; i += 1) s += '0123456789abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 36)]
    return s
}

// Sahte manifest kayıt defteri — "kubectl apply -f <dosya>" bu dosyaları tanır.
const MANIFEST_REGISTRY = {
    'deployment.yaml': { kind: 'deployment', name: 'nginx-deployment', image: 'nginx:1.25', replicas: 3 },
    'service.yaml': { kind: 'service', name: 'nginx-service', type: 'ClusterIP', port: 80 },
}

export default function KubernetesSandboxBlock({ block, darkMode, language, onFirstSuccess }) {
    const isTr = language === 'tr'
    const [deployments, setDeployments] = useState([])
    const [pods, setPods] = useState([])
    const [services, setServices] = useState([])
    const [events, setEvents] = useState(() => new Set())
    const [done, setDone] = useState(() => new Set())
    const [history, setHistory] = useState([])
    const [input, setInput] = useState('')
    const [flash, setFlash] = useState(false)
    const [celebrate, setCelebrate] = useState(null)
    const termRef = useRef(null)
    const healTimers = useRef([])

    const missions = block.missions || []

    useEffect(() => {
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
    }, [history])

    useEffect(() => () => { healTimers.current.forEach(clearTimeout) }, [])

    function triggerFlash() {
        setFlash(true)
        setTimeout(() => setFlash(false), 700)
    }

    function hint(tr, en) {
        return { t: 'hint', x: `💡 ${isTr ? tr : en}` }
    }

    function makePod(deploymentName, image) {
        return { name: `${deploymentName}-${fakeHash(5)}-${fakeHash(5)}`, deployment: deploymentName, image, status: 'Running', restarts: 0 }
    }

    // Bir pod silindiğinde, bir deployment'a bağlıysa Kubernetes onu otomatik
    // olarak yeniden oluşturur (ReplicaSet controller) — Docker'da bunun
    // karşılığı YOKTUR, bu yüzden bilinçli olarak öğretici bir gecikmeyle simüle edilir.
    function scheduleSelfHeal(deploymentName, image) {
        const timer = setTimeout(() => {
            setPods((prev) => {
                const stillShort = prev.filter((p) => p.deployment === deploymentName).length
                const dep = deployments.find((d) => d.name === deploymentName)
                if (!dep || stillShort >= dep.replicas) return prev
                const replacement = makePod(deploymentName, image)
                setHistory((h) => [...h, { t: 'ok', x: `🔁 ${isTr ? 'ReplicaSet controller yeni pod oluşturdu' : 'ReplicaSet controller created a replacement pod'}: ${replacement.name}` }])
                return [...prev, replacement]
            })
        }, 1800)
        healTimers.current.push(timer)
    }

    function execute(raw, st) {
        const lines = []
        const tokens = raw.trim().split(/\s+/)
        const [head, sub] = tokens

        if (head === 'clear') return { ...st, lines: [], clear: true }
        if (head === 'help') {
            lines.push({ t: 'out', x: 'Commands: kubectl apply -f <file> | get pods|deployments|services|all | describe pod <name> | logs <pod> | exec <pod> -- <cmd> | scale deployment <name> --replicas=N | delete pod|deployment <name>  •  help  •  clear' })
            lines.push(hint(
                'Önce "kubectl apply -f deployment.yaml" ile başlamayı dene.',
                'Try starting with "kubectl apply -f deployment.yaml".',
            ))
            return { ...st, lines }
        }
        if (head !== 'kubectl') {
            lines.push({ t: 'err', x: `bash: ${head}: command not found` })
            lines.push(hint('Bu sandbox sadece kubectl komutlarını tanır. "help" yazarak listeyi görebilirsin.', 'This sandbox only understands kubectl commands. Type "help" to see the list.'))
            return { ...st, lines, error: true }
        }

        const args = tokens.slice(2)

        switch (sub) {
            case 'apply': {
                const fIdx = args.indexOf('-f')
                const file = fIdx !== -1 ? args[fIdx + 1] : null
                if (!file) {
                    lines.push({ t: 'err', x: 'error: must specify -f' })
                    return { ...st, lines, error: true }
                }
                const manifest = MANIFEST_REGISTRY[file]
                if (!manifest) {
                    lines.push({ t: 'err', x: `error: the path "${file}" does not exist` })
                    lines.push(hint(
                        `Bu sandbox'ta tanınan manifest dosyaları: ${Object.keys(MANIFEST_REGISTRY).join(', ')}`,
                        `Manifests recognized by this sandbox: ${Object.keys(MANIFEST_REGISTRY).join(', ')}`,
                    ))
                    return { ...st, lines, error: true }
                }
                if (manifest.kind === 'deployment') {
                    const exists = st.deployments.some((d) => d.name === manifest.name)
                    if (exists) {
                        lines.push({ t: 'out', x: `deployment.apps/${manifest.name} unchanged` })
                        return { ...st, lines }
                    }
                    const newDep = { name: manifest.name, image: manifest.image, replicas: manifest.replicas }
                    const newPods = Array.from({ length: manifest.replicas }, () => makePod(manifest.name, manifest.image))
                    lines.push({ t: 'out', x: `deployment.apps/${manifest.name} created` })
                    return { ...st, deployments: [...st.deployments, newDep], pods: [...st.pods, ...newPods], lines }
                }
                const exists = st.services.some((s2) => s2.name === manifest.name)
                if (exists) {
                    lines.push({ t: 'out', x: `service/${manifest.name} unchanged` })
                    return { ...st, lines }
                }
                lines.push({ t: 'out', x: `service/${manifest.name} created` })
                return { ...st, services: [...st.services, { name: manifest.name, type: manifest.type, port: manifest.port }], lines }
            }

            case 'get': {
                const target = args[0]
                const widthsPod = [30, 8, 10, 10, 8]
                const padRow = (cols, widths) => cols.map((c, i) => String(c).padEnd(widths[i])).join('')
                if (target === 'pods' || target === 'pod') {
                    lines.push({ t: 'out', x: padRow(['NAME', 'READY', 'STATUS', 'RESTARTS', 'AGE'], widthsPod) })
                    st.pods.forEach((p) => lines.push({ t: 'out', x: padRow([p.name, '1/1', p.status, String(p.restarts), '5s'], widthsPod) }))
                    if (st.pods.length === 0) lines.push(hint('Henüz hiç pod yok — önce bir deployment apply et.', 'No pods yet — apply a deployment first.'))
                    const nextEvents = new Set(st.events)
                    nextEvents.add('get-pods')
                    return { ...st, events: nextEvents, lines }
                }
                if (target === 'deployments' || target === 'deployment' || target === 'deploy') {
                    const widths = [24, 10, 10]
                    lines.push({ t: 'out', x: padRow(['NAME', 'READY', 'IMAGE'], widths) })
                    st.deployments.forEach((d) => {
                        const ready = st.pods.filter((p) => p.deployment === d.name).length
                        lines.push({ t: 'out', x: padRow([d.name, `${ready}/${d.replicas}`, d.image], widths) })
                    })
                    if (st.deployments.length === 0) lines.push(hint('Henüz hiç deployment yok.', 'No deployments yet.'))
                    return { ...st, lines }
                }
                if (target === 'services' || target === 'service' || target === 'svc') {
                    const widths = [20, 14, 10]
                    lines.push({ t: 'out', x: padRow(['NAME', 'TYPE', 'PORT'], widths) })
                    st.services.forEach((s2) => lines.push({ t: 'out', x: padRow([s2.name, s2.type, String(s2.port)], widths) }))
                    if (st.services.length === 0) lines.push(hint('Henüz hiç service yok.', 'No services yet.'))
                    return { ...st, lines }
                }
                if (target === 'all') {
                    lines.push({ t: 'out', x: 'NAME'.padEnd(30) + 'KIND' })
                    st.deployments.forEach((d) => lines.push({ t: 'out', x: `deployment.apps/${d.name}`.padEnd(30) + 'Deployment' }))
                    st.pods.forEach((p) => lines.push({ t: 'out', x: `pod/${p.name}`.padEnd(30) + 'Pod' }))
                    st.services.forEach((s2) => lines.push({ t: 'out', x: `service/${s2.name}`.padEnd(30) + 'Service' }))
                    return { ...st, lines }
                }
                lines.push({ t: 'err', x: `error: the server doesn't have a resource type "${target || ''}"` })
                return { ...st, lines, error: true }
            }

            case 'describe': {
                const kind = args[0]
                const name = args[1]
                if (kind === 'pod') {
                    const p = st.pods.find((x) => x.name === name)
                    if (!p) { lines.push({ t: 'err', x: `Error from server (NotFound): pods "${name || ''}" not found` }); return { ...st, lines, error: true } }
                    lines.push({ t: 'out', x: `Name:         ${p.name}\nImage:        ${p.image}\nStatus:       ${p.status}\nRestarts:     ${p.restarts}\nControlled By: ReplicaSet/${p.deployment}` })
                    return { ...st, lines }
                }
                if (kind === 'deployment') {
                    const d = st.deployments.find((x) => x.name === name)
                    if (!d) { lines.push({ t: 'err', x: `Error from server (NotFound): deployments.apps "${name || ''}" not found` }); return { ...st, lines, error: true } }
                    const ready = st.pods.filter((p) => p.deployment === d.name).length
                    lines.push({ t: 'out', x: `Name:         ${d.name}\nImage:        ${d.image}\nReplicas:     ${d.replicas} desired | ${ready} current` })
                    return { ...st, lines }
                }
                lines.push({ t: 'err', x: 'usage: kubectl describe pod|deployment <name>' })
                return { ...st, lines, error: true }
            }

            case 'logs': {
                const name = args[0]
                const p = st.pods.find((x) => x.name === name)
                if (!p) { lines.push({ t: 'err', x: `Error from server (NotFound): pods "${name || ''}" not found` }); return { ...st, lines, error: true } }
                lines.push({ t: 'out', x: `${new Date().toISOString()} [notice] ${p.image.split(':')[0]} started\n${new Date().toISOString()} [notice] ready to accept connections` })
                const nextEvents = new Set(st.events)
                nextEvents.add('logs')
                return { ...st, events: nextEvents, lines }
            }

            case 'exec': {
                const name = args[0]
                const dashIdx = args.indexOf('--')
                const cmd = dashIdx !== -1 ? args.slice(dashIdx + 1).join(' ') : ''
                const p = st.pods.find((x) => x.name === name)
                if (!p) { lines.push({ t: 'err', x: `Error from server (NotFound): pods "${name || ''}" not found` }); return { ...st, lines, error: true } }
                if (!cmd) { lines.push({ t: 'err', x: 'usage: kubectl exec <pod> -- <command>' }); return { ...st, lines, error: true } }
                lines.push({ t: 'out', x: cmd.startsWith('ls') ? 'bin  etc  usr  var  app' : `(${cmd}: simulated output)` })
                return { ...st, lines }
            }

            case 'scale': {
                const kind = args[0]
                const name = args[1]
                const rIdx = args.findIndex((a) => a.startsWith('--replicas'))
                const replicasArg = rIdx !== -1 ? args[rIdx].split('=')[1] : null
                if (kind !== 'deployment' || !name || !replicasArg) {
                    lines.push({ t: 'err', x: 'usage: kubectl scale deployment <name> --replicas=N' })
                    return { ...st, lines, error: true }
                }
                const targetReplicas = parseInt(replicasArg, 10)
                const dep = st.deployments.find((d) => d.name === name)
                if (!dep) { lines.push({ t: 'err', x: `Error from server (NotFound): deployments.apps "${name}" not found` }); return { ...st, lines, error: true } }
                const currentPods = st.pods.filter((p) => p.deployment === name)
                let nextPods = st.pods
                if (targetReplicas > currentPods.length) {
                    const toAdd = Array.from({ length: targetReplicas - currentPods.length }, () => makePod(name, dep.image))
                    nextPods = [...st.pods, ...toAdd]
                } else if (targetReplicas < currentPods.length) {
                    const keep = currentPods.slice(0, targetReplicas)
                    const keepNames = new Set(keep.map((p) => p.name))
                    nextPods = st.pods.filter((p) => p.deployment !== name || keepNames.has(p.name))
                }
                const nextDeployments = st.deployments.map((d) => (d.name === name ? { ...d, replicas: targetReplicas } : d))
                lines.push({ t: 'out', x: `deployment.apps/${name} scaled` })
                return { ...st, deployments: nextDeployments, pods: nextPods, lines }
            }

            case 'delete': {
                const kind = args[0]
                const name = args[1]
                if (kind === 'pod') {
                    const p = st.pods.find((x) => x.name === name)
                    if (!p) { lines.push({ t: 'err', x: `Error from server (NotFound): pods "${name || ''}" not found` }); return { ...st, lines, error: true } }
                    lines.push({ t: 'out', x: `pod "${name}" deleted` })
                    const isManaged = st.deployments.some((d) => d.name === p.deployment)
                    let nextEvents = st.events
                    if (isManaged) {
                        lines.push(hint(
                            'Bu pod bir deployment tarafından yönetiliyor — ReplicaSet controller birkaç saniye içinde yerine yenisini oluşturacak (self-healing). Docker container\'ları bunu ASLA yapmaz.',
                            'This pod is managed by a deployment — the ReplicaSet controller will create a replacement within seconds (self-healing). Docker containers never do this on their own.',
                        ))
                        nextEvents = new Set(st.events)
                        nextEvents.add('deleted-managed-pod')
                        setTimeout(() => scheduleSelfHeal(p.deployment, p.image), 0)
                    }
                    return { ...st, pods: st.pods.filter((x) => x.name !== name), events: nextEvents, lines }
                }
                if (kind === 'deployment') {
                    const d = st.deployments.find((x) => x.name === name)
                    if (!d) { lines.push({ t: 'err', x: `Error from server (NotFound): deployments.apps "${name || ''}" not found` }); return { ...st, lines, error: true } }
                    lines.push({ t: 'out', x: `deployment.apps "${name}" deleted` })
                    return { ...st, deployments: st.deployments.filter((x) => x.name !== name), pods: st.pods.filter((p) => p.deployment !== name), lines }
                }
                lines.push({ t: 'err', x: 'usage: kubectl delete pod|deployment <name>' })
                return { ...st, lines, error: true }
            }

            default:
                break
        }

        lines.push({ t: 'err', x: `error: unknown command "${sub || ''}" for "kubectl"` })
        lines.push(hint('Komut listesi için "help" yaz.', 'Type "help" for the command list.'))
        return { ...st, lines, error: true }
    }

    function onSubmit(e) {
        e.preventDefault()
        const raw = input.trim()
        if (!raw) return
        const st = { deployments, pods, services, events }
        const result = execute(raw, st)
        const newLines = [{ t: 'cmd', x: raw }, ...(result.lines || [])]

        const nextDeployments = result.deployments ?? deployments
        const nextPods = result.pods ?? pods
        const nextServices = result.services ?? services
        const nextEvents = result.events ?? events

        const newlyDone = []
        missions.forEach((m) => {
            if (!done.has(m.id) && KUBERNETES_MISSION_CHECKS[m.id] && KUBERNETES_MISSION_CHECKS[m.id]({ deployments: nextDeployments, pods: nextPods, services: nextServices, events: nextEvents })) {
                newlyDone.push(m.id)
            }
        })
        if (newlyDone.length > 0) {
            const nd = new Set(done)
            newlyDone.forEach((id) => nd.add(id))
            setDone(nd)
            const label = missions.find((m) => m.id === newlyDone[0])
            newLines.push({ t: 'ok', x: `🎉 ${isTr ? 'Görev tamamlandı:' : 'Mission complete:'} ${pick(label?.text, isTr)}` })
            setCelebrate(newlyDone[0])
            setTimeout(() => setCelebrate(null), 2200)
            // Learning OS Faz 1 (plan §8.2-S1): senaryo tamamlama anı — TÜM
            // görevler bitince günlük hedefe 1 egzersiz olarak sayılır.
            if (missions.length > 0 && nd.size === missions.length) onFirstSuccess?.()
        }

        if (result.error) triggerFlash()
        setDeployments(nextDeployments)
        setPods(nextPods)
        setServices(nextServices)
        setEvents(nextEvents)
        setHistory(result.clear ? [] : [...history, ...newLines])
        setInput('')
    }

    const lineColor = { cmd: 'text-emerald-400', out: darkMode ? 'text-slate-300' : 'text-slate-200', err: 'text-rose-400', hint: 'text-amber-300', ok: 'text-emerald-300 font-bold' }
    const doneCount = missions.filter((m) => done.has(m.id)).length

    return (
        <div data-testid="k8s-sandbox" className={`my-6 rounded-2xl border overflow-hidden ${darkMode ? 'border-blue-800 bg-slate-900' : 'border-blue-200 bg-white'} ${flash ? 'ring-4 ring-rose-500 transition' : 'transition'}`}>
            <div className={`px-4 py-3 flex items-center justify-between gap-2 ${darkMode ? 'bg-blue-950' : 'bg-blue-50'}`}>
                <div className="font-bold text-sm flex items-center gap-2">
                    <span>☸️</span>
                    <span className={darkMode ? 'text-blue-200' : 'text-blue-900'}>
                        {isTr ? 'Kubernetes Sandbox — kubectl komutunu kendin yaz, cluster\'ı canlı izle' : 'Kubernetes Sandbox — type kubectl yourself, watch the cluster live'}
                    </span>
                </div>
                {missions.length > 0 && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
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
                            <li key={m.id} data-testid={`k8s-mission-${m.id}`} data-done={isDoneM ? 'true' : 'false'}
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
                <div className="bg-slate-950 flex flex-col min-h-[280px]">
                    <div ref={termRef} className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed max-h-72">
                        {history.length === 0 && (
                            <div className="text-slate-500">
                                {isTr ? '# Buraya komut yaz — örn: kubectl apply -f deployment.yaml' : '# Type a command here — e.g.: kubectl apply -f deployment.yaml'}
                            </div>
                        )}
                        {history.map((l, i) => (
                            <div key={i} className={`whitespace-pre-wrap break-all ${lineColor[l.t] || 'text-slate-300'}`}>
                                {l.t === 'cmd' ? `$ ${l.x}` : l.x}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-slate-800 px-3 py-2">
                        <span className="text-emerald-400 font-mono text-sm">$</span>
                        <input
                            data-testid="k8s-sandbox-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isTr ? 'kubectl komutunu yaz ve Enter\'a bas' : 'type a kubectl command and press Enter'}
                            className="flex-1 bg-transparent outline-none font-mono text-sm text-slate-100 placeholder:text-slate-600"
                            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                            style={{ fontSize: '16px' }}
                        />
                        <button type="submit" className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white min-h-[36px]">
                            {isTr ? 'Çalıştır' : 'Run'}
                        </button>
                    </form>
                </div>

                <div className={`px-4 py-3 space-y-3 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                    <div>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            📦 DEPLOYMENTS ({deployments.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {deployments.length === 0 && <span className={`text-xs italic ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>{isTr ? 'henüz yok' : 'none yet'}</span>}
                            {deployments.map((d) => {
                                const ready = pods.filter((p) => p.deployment === d.name).length
                                return (
                                    <span key={d.name} data-testid={`k8s-deployment-${d.name.replace(/\W/g, '-')}`}
                                        className={`text-xs font-mono px-2 py-1 rounded-lg border ${darkMode ? 'border-blue-700 bg-blue-950 text-blue-300' : 'border-blue-300 bg-blue-100 text-blue-800'}`}>
                                        📦 {d.name} <span className="opacity-60">({ready}/{d.replicas})</span>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            🚀 PODS ({pods.length})
                        </div>
                        <div className="space-y-1.5">
                            {pods.length === 0 && <span className={`text-xs italic ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>{isTr ? 'çalışan bir şey yok' : 'nothing running'}</span>}
                            {pods.map((p) => (
                                <div key={p.name} data-testid={`k8s-pod-${p.name.replace(/\W/g, '-')}`}
                                    className={`flex items-center gap-2 text-xs font-mono px-2 py-1.5 rounded-lg border ${darkMode ? 'border-emerald-700 bg-emerald-950 text-emerald-300' : 'border-emerald-300 bg-emerald-50 text-emerald-800'}`}>
                                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="font-bold truncate">{p.name}</span>
                                    <span className="ml-auto uppercase text-[9px] font-bold tracking-wide">{p.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            🌐 SERVICES ({services.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {services.length === 0 && <span className={`text-xs italic ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>{isTr ? 'henüz yok' : 'none yet'}</span>}
                            {services.map((s2) => (
                                <span key={s2.name} data-testid={`k8s-service-${s2.name.replace(/\W/g, '-')}`}
                                    className={`text-xs font-mono px-2 py-1 rounded-lg border ${darkMode ? 'border-sky-700 bg-sky-950 text-sky-300' : 'border-sky-300 bg-sky-100 text-sky-800'}`}>
                                    🌐 {s2.name} <span className="opacity-60">({s2.type}:{s2.port})</span>
                                </span>
                            ))}
                        </div>
                    </div>
                    {celebrate && (
                        <div className="text-center text-2xl animate-bounce" aria-hidden="true">🎉✨🎉</div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Görev kontrolleri — id'ye göre engine state'inden otomatik tespit (Docker/Linux/Git
// Sandbox'la aynı state-bazlı desen).
const KUBERNETES_MISSION_CHECKS = {
    'apply-deployment': ({ deployments }) => deployments.some((d) => d.name === 'nginx-deployment'),
    'get-pods': ({ events }) => events.has('get-pods'),
    'scale-up': ({ deployments }) => {
        const d = deployments.find((x) => x.name === 'nginx-deployment')
        return !!d && d.replicas === 5
    },
    'logs-viewed': ({ events }) => events.has('logs'),
    'self-heal': ({ events }) => events.has('deleted-managed-pod'),
}
