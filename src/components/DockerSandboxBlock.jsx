import { useEffect, useRef, useState } from 'react'

// ─── Docker Sandbox — durum-makineli interaktif terminal ────────────────────
// Kullanıcı komutu KENDİSİ yazar; sahte engine state'i (image'lar, container'lar,
// port eşlemeleri) sağdaki görsel panelde canlı güncellenir. Gerçek Docker
// çıktıları İngilizce kalır (terminal çıktısı istisnası, CLAUDE.md §8);
// görev metinleri ve "💡 Neden?" açıklamaları bilingual'dır.

// Sahte registry — pull edilebilen bilinen image'lar
const REGISTRY = {
    'hello-world': { size: '13.3kB' },
    'nginx': { size: '187MB' },
    'python': { size: '1.02GB' },
    'postgres': { size: '432MB' },
    'selenium/standalone-chrome': { size: '1.2GB' },
}

// Terminal satır tipleri: cmd (kullanıcı komutu), out (çıktı), err (hata), hint (💡 açıklama), ok (başarı)
function pick(value, isTr) {
    if (value == null) return ''
    if (typeof value === 'string') return value
    return isTr ? (value.tr ?? value.en ?? '') : (value.en ?? value.tr ?? '')
}

// Sahte container ID üretimi (gerçekçi 12 haneli hex)
function fakeId() {
    let s = ''
    for (let i = 0; i < 12; i += 1) s += '0123456789abcdef'[Math.floor(Math.random() * 16)]
    return s
}

// Image adını name + tag olarak ayır ("nginx:latest" → {name, tag})
function splitImage(ref) {
    const idx = ref.lastIndexOf(':')
    if (idx > 0 && !ref.slice(idx + 1).includes('/')) {
        return { name: ref.slice(0, idx), tag: ref.slice(idx + 1) }
    }
    return { name: ref, tag: 'latest' }
}

// Görev kontrolleri — id'ye göre engine state'inden otomatik tespit
const MISSION_CHECKS = {
    'pull-hello': ({ images }) => images.some((im) => im.name === 'hello-world'),
    'run-web': ({ containers }) => containers.some(
        (c) => c.name === 'web' && c.image.startsWith('nginx') && c.status === 'running'
            && c.ports.some((p) => p.host === '8080' && p.cont === '80'),
    ),
    'ps-list': ({ events }) => events.has('ps'),
    'logs-web': ({ events }) => events.has('logs:web'),
    'clean-web': ({ containers, done }) => done.has('run-web') && !containers.some((c) => c.name === 'web'),
}

// Pull çıktısı — gerçek Docker'ın katman katman indirme görüntüsü
function pullLines(name, tag) {
    return [
        { t: 'out', x: `${tag}: Pulling from library/${name}` },
        { t: 'out', x: `${fakeId()}: Pull complete` },
        { t: 'out', x: `${fakeId()}: Pull complete` },
        { t: 'out', x: `Status: Downloaded newer image for ${name}:${tag}` },
    ]
}

// Basit tablo hizalama (padEnd ile sütunlar)
function padRow(cols, widths) {
    return cols.map((c, i) => String(c).padEnd(widths[i])).join('')
}

export default function DockerSandboxBlock({ block, darkMode, language }) {
    const isTr = language === 'tr'
    const [images, setImages] = useState([])
    const [containers, setContainers] = useState([])
    const [events] = useState(() => new Set())
    const [done, setDone] = useState(() => new Set())
    const [history, setHistory] = useState([])
    const [input, setInput] = useState('')
    const [flash, setFlash] = useState(false)
    const [celebrate, setCelebrate] = useState(null)
    const termRef = useRef(null)

    const missions = block.missions || []

    // Terminal her yeni satırda en alta kaysın
    useEffect(() => {
        if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
    }, [history])

    // Hata durumunda paneli kısa süreliğine kırmızı parlat ("Cızz!" — CLAUDE.md §20)
    function triggerFlash() {
        setFlash(true)
        setTimeout(() => setFlash(false), 700)
    }

    // Bilingual 💡 açıklama satırı üret
    function hint(tr, en) {
        return { t: 'hint', x: `💡 ${isTr ? tr : en}` }
    }

    // Tek bir komutu çalıştır: yeni state + terminal satırları döndür
    function execute(raw, st) {
        const lines = []
        const tokens = raw.trim().split(/\s+/)
        const [head, sub] = tokens

        if (head === 'clear') return { ...st, clear: true, lines: [] }
        if (head === 'help' || (head === 'docker' && (sub === '--help' || sub === 'help'))) {
            lines.push({ t: 'out', x: 'Commands: docker pull|images|run|ps|stop|start|rm|rmi|logs|exec  •  help  •  clear' })
            lines.push(hint(
                'Önce "docker pull hello-world" ile başlamayı dene.',
                'Try starting with "docker pull hello-world".',
            ))
            return { ...st, lines }
        }
        if (head !== 'docker') {
            lines.push({ t: 'err', x: `bash: ${head}: command not found` })
            lines.push(hint(
                'Bu sandbox sadece docker komutlarını tanır. "help" yazarak listeyi görebilirsin.',
                'This sandbox only understands docker commands. Type "help" to see the list.',
            ))
            return { ...st, lines, error: true }
        }

        const args = tokens.slice(2)

        switch (sub) {
            case 'pull': {
                const ref = args[0]
                if (!ref) {
                    lines.push({ t: 'err', x: '"docker pull" requires exactly 1 argument.' })
                    lines.push(hint('Hangi image\'ı çekeceğini yazmalısın: docker pull nginx', 'You must say which image to pull: docker pull nginx'))
                    return { ...st, lines, error: true }
                }
                const { name, tag } = splitImage(ref)
                if (!REGISTRY[name]) {
                    lines.push({ t: 'err', x: `Error response from daemon: pull access denied for ${name}, repository does not exist or may require 'docker login'` })
                    lines.push(hint(
                        `Bu sandbox'taki sahte registry'de "${name}" yok. Mevcut image'lar: ${Object.keys(REGISTRY).join(', ')}`,
                        `The fake registry in this sandbox has no "${name}". Available images: ${Object.keys(REGISTRY).join(', ')}`,
                    ))
                    return { ...st, lines, error: true }
                }
                if (st.images.some((im) => im.name === name && im.tag === tag)) {
                    lines.push({ t: 'out', x: `Status: Image is up to date for ${name}:${tag}` })
                    return { ...st, lines }
                }
                lines.push(...pullLines(name, tag))
                return { ...st, images: [...st.images, { name, tag, size: REGISTRY[name].size }], lines }
            }

            case 'images':
            case 'image': {
                if (sub === 'image' && args[0] !== 'ls') break
                const widths = [32, 10, 15, 10]
                lines.push({ t: 'out', x: padRow(['REPOSITORY', 'TAG', 'IMAGE ID', 'SIZE'], widths) })
                st.images.forEach((im) => lines.push({ t: 'out', x: padRow([im.name, im.tag, fakeId(), im.size], widths) }))
                if (st.images.length === 0) {
                    lines.push(hint('Henüz hiç image yok — önce "docker pull nginx" dene.', 'No images yet — try "docker pull nginx" first.'))
                }
                return { ...st, lines }
            }

            case 'run': {
                // Flag'leri ayrıştır: -d, -p H:C, --name N, kalan ilk token image'dır
                let detached = false
                let name = null
                const ports = []
                let imageRef = null
                for (let i = 0; i < args.length; i += 1) {
                    const a = args[i]
                    if (a === '-d') detached = true
                    else if (a === '-p') {
                        const pv = args[i + 1] || ''
                        const [host, cont] = pv.split(':')
                        if (!host || !cont) {
                            lines.push({ t: 'err', x: `docker: invalid publish opts format: ${pv}` })
                            lines.push(hint('Port formatı HOST:CONTAINER olmalı, örn: -p 8080:80', 'Port format must be HOST:CONTAINER, e.g.: -p 8080:80'))
                            return { ...st, lines, error: true }
                        }
                        ports.push({ host, cont })
                        i += 1
                    } else if (a === '--name') { name = args[i + 1]; i += 1 }
                    else if (!a.startsWith('-') && !imageRef) imageRef = a
                }
                if (!imageRef) {
                    lines.push({ t: 'err', x: '"docker run" requires at least 1 argument.' })
                    lines.push(hint('Çalıştırılacak image adını yazmalısın: docker run -d nginx', 'You must give an image to run: docker run -d nginx'))
                    return { ...st, lines, error: true }
                }
                const { name: imgName, tag } = splitImage(imageRef)
                if (!REGISTRY[imgName]) {
                    lines.push({ t: 'err', x: `Unable to find image '${imgName}:${tag}' locally` })
                    lines.push({ t: 'err', x: `docker: Error response from daemon: pull access denied for ${imgName}, repository does not exist.` })
                    return { ...st, lines, error: true }
                }
                if (name && st.containers.some((c) => c.name === name)) {
                    lines.push({ t: 'err', x: `docker: Error response from daemon: Conflict. The container name "/${name}" is already in use.` })
                    lines.push(hint(
                        `"${name}" adı dolu. Önce eskisini sil (docker rm ${name}) ya da farklı bir --name ver.`,
                        `The name "${name}" is taken. Remove the old one first (docker rm ${name}) or pick another --name.`,
                    ))
                    return { ...st, lines, error: true }
                }
                const conflict = ports.find((p) => st.containers.some(
                    (c) => c.status === 'running' && c.ports.some((cp) => cp.host === p.host),
                ))
                if (conflict) {
                    lines.push({ t: 'err', x: `docker: Error response from daemon: Bind for 0.0.0.0:${conflict.host} failed: port is already allocated.` })
                    lines.push(hint(
                        `${conflict.host} portunu başka bir çalışan container kullanıyor. Onu durdur ya da farklı bir host portu seç.`,
                        `Port ${conflict.host} is used by another running container. Stop it or choose a different host port.`,
                    ))
                    return { ...st, lines, error: true }
                }
                let newImages = st.images
                if (!st.images.some((im) => im.name === imgName && im.tag === tag)) {
                    // Gerçek Docker davranışı: yerelde yoksa önce otomatik pull yapılır
                    lines.push({ t: 'out', x: `Unable to find image '${imgName}:${tag}' locally` })
                    lines.push(...pullLines(imgName, tag))
                    newImages = [...st.images, { name: imgName, tag, size: REGISTRY[imgName].size }]
                }
                const id = fakeId()
                const cname = name || `${imgName.replace(/\W/g, '_')}_${id.slice(0, 4)}`
                // hello-world çalışıp hemen çıkar; diğerleri servis gibi ayakta kalır
                const isHello = imgName === 'hello-world'
                if (isHello) {
                    lines.push({ t: 'out', x: 'Hello from Docker!' })
                    lines.push({ t: 'out', x: 'This message shows that your installation appears to be working correctly.' })
                } else if (detached) {
                    lines.push({ t: 'out', x: id + fakeId() + fakeId() + fakeId() + fakeId() + fakeId().slice(0, 4) })
                } else {
                    lines.push({ t: 'out', x: `${new Date().toISOString()} [notice] ${imgName} started` })
                    lines.push(hint(
                        '-d (detached) vermedin: gerçek Docker\'da terminal bu process\'e bağlı kalırdı. Sandbox yine de devam etmene izin veriyor.',
                        'You did not pass -d (detached): in real Docker your terminal would stay attached. The sandbox lets you continue anyway.',
                    ))
                }
                const newContainer = { id, name: cname, image: `${imgName}:${tag}`, status: isHello ? 'exited' : 'running', ports }
                return { ...st, images: newImages, containers: [...st.containers, newContainer], lines }
            }

            case 'ps': {
                const all = args.includes('-a')
                const list = all ? st.containers : st.containers.filter((c) => c.status === 'running')
                const widths = [15, 30, 12, 18, 10]
                lines.push({ t: 'out', x: padRow(['CONTAINER ID', 'IMAGE', 'STATUS', 'PORTS', 'NAMES'], widths) })
                list.forEach((c) => lines.push({
                    t: 'out',
                    x: padRow([c.id, c.image, c.status === 'running' ? 'Up' : 'Exited (0)', c.ports.map((p) => `${p.host}->${p.cont}/tcp`).join(','), c.name], widths),
                }))
                if (list.length === 0 && !all && st.containers.length > 0) {
                    lines.push(hint('Çalışan container yok ama durmuş olanlar var — hepsini görmek için "docker ps -a" dene.', 'No running containers, but stopped ones exist — try "docker ps -a" to see all.'))
                }
                st.events.add('ps')
                return { ...st, lines }
            }

            case 'stop':
            case 'start': {
                const target = args[0]
                const c = st.containers.find((x) => x.name === target || x.id.startsWith(target || ''))
                if (!target || !c) {
                    lines.push({ t: 'err', x: `Error response from daemon: No such container: ${target || ''}` })
                    lines.push(hint('Container adını "docker ps -a" ile kontrol et.', 'Check the container name with "docker ps -a".'))
                    return { ...st, lines, error: true }
                }
                const next = st.containers.map((x) => (x === c ? { ...x, status: sub === 'stop' ? 'exited' : 'running' } : x))
                lines.push({ t: 'out', x: c.name })
                return { ...st, containers: next, lines }
            }

            case 'rm': {
                const force = args.includes('-f')
                const target = args.find((a) => !a.startsWith('-'))
                const c = st.containers.find((x) => x.name === target || x.id.startsWith(target || ''))
                if (!target || !c) {
                    lines.push({ t: 'err', x: `Error response from daemon: No such container: ${target || ''}` })
                    return { ...st, lines, error: true }
                }
                if (c.status === 'running' && !force) {
                    lines.push({ t: 'err', x: `Error response from daemon: cannot remove container "/${c.name}": container is running: stop the container before removing or force remove` })
                    lines.push(hint(
                        `Çalışan container silinemez. Önce "docker stop ${c.name}", sonra "docker rm ${c.name}" — ya da tek adımda "docker rm -f ${c.name}".`,
                        `You cannot remove a running container. First "docker stop ${c.name}", then "docker rm ${c.name}" — or in one step "docker rm -f ${c.name}".`,
                    ))
                    return { ...st, lines, error: true }
                }
                lines.push({ t: 'out', x: c.name })
                return { ...st, containers: st.containers.filter((x) => x !== c), lines }
            }

            case 'rmi': {
                const target = args[0]
                const im = st.images.find((x) => x.name === target || `${x.name}:${x.tag}` === target)
                if (!target || !im) {
                    lines.push({ t: 'err', x: `Error response from daemon: No such image: ${target || ''}` })
                    return { ...st, lines, error: true }
                }
                if (st.containers.some((c) => c.image.startsWith(im.name))) {
                    lines.push({ t: 'err', x: `Error response from daemon: conflict: unable to remove repository reference "${im.name}" (must force) - container is using its referenced image` })
                    lines.push(hint('Bu image\'ı kullanan container var — önce container\'ı sil.', 'A container is using this image — remove the container first.'))
                    return { ...st, lines, error: true }
                }
                lines.push({ t: 'out', x: `Untagged: ${im.name}:${im.tag}` })
                return { ...st, images: st.images.filter((x) => x !== im), lines }
            }

            case 'logs': {
                const target = args[0]
                const c = st.containers.find((x) => x.name === target || x.id.startsWith(target || ''))
                if (!target || !c) {
                    lines.push({ t: 'err', x: `Error response from daemon: No such container: ${target || ''}` })
                    return { ...st, lines, error: true }
                }
                if (c.image.startsWith('hello-world')) {
                    lines.push({ t: 'out', x: 'Hello from Docker!' })
                } else {
                    lines.push({ t: 'out', x: `${new Date().toISOString()} [notice] 1#1: start worker processes` })
                    lines.push({ t: 'out', x: `${new Date().toISOString()} [notice] 1#1: ready for connections` })
                }
                st.events.add(`logs:${c.name}`)
                return { ...st, lines }
            }

            case 'exec': {
                const flagless = args.filter((a) => !a.startsWith('-'))
                const target = flagless[0]
                const cmd = flagless.slice(1).join(' ')
                const c = st.containers.find((x) => x.name === target || x.id.startsWith(target || ''))
                if (!target || !c) {
                    lines.push({ t: 'err', x: `Error response from daemon: No such container: ${target || ''}` })
                    return { ...st, lines, error: true }
                }
                if (c.status !== 'running') {
                    lines.push({ t: 'err', x: `Error response from daemon: container ${c.name} is not running` })
                    lines.push(hint('exec sadece ÇALIŞAN container içinde komut koşturur. Önce "docker start" ile başlat.', 'exec only runs commands inside a RUNNING container. Start it first with "docker start".'))
                    return { ...st, lines, error: true }
                }
                lines.push({ t: 'out', x: cmd.startsWith('ls') ? 'bin  etc  usr  var  index.html' : `(${cmd || 'sh'}: simulated output)` })
                return { ...st, lines }
            }

            default:
                break
        }

        lines.push({ t: 'err', x: `docker: '${sub || ''}' is not a docker command. See 'docker --help'` })
        lines.push(hint('Komut listesi için "help" yaz. Yazım hatası olabilir mi?', 'Type "help" for the command list. Could it be a typo?'))
        return { ...st, lines, error: true }
    }

    // Form submit: komutu çalıştır, görevleri yeniden değerlendir
    function onSubmit(e) {
        e.preventDefault()
        const raw = input.trim()
        if (!raw) return
        const st = { images, containers, events }
        const result = execute(raw, st)
        const newLines = [{ t: 'cmd', x: raw }, ...(result.lines || [])]

        // Görev tespiti: yeni state ile kontrolleri çalıştır
        const ctx = { images: result.images ?? images, containers: result.containers ?? containers, events, done }
        const newlyDone = []
        missions.forEach((m) => {
            if (!done.has(m.id) && MISSION_CHECKS[m.id] && MISSION_CHECKS[m.id](ctx)) newlyDone.push(m.id)
        })
        if (newlyDone.length > 0) {
            const nd = new Set(done)
            newlyDone.forEach((id) => nd.add(id))
            setDone(nd)
            const label = missions.find((m) => m.id === newlyDone[0])
            newLines.push({ t: 'ok', x: `🎉 ${isTr ? 'Görev tamamlandı:' : 'Mission complete:'} ${pick(label?.text, isTr)}` })
            setCelebrate(newlyDone[0])
            setTimeout(() => setCelebrate(null), 2200)
        }

        if (result.error) triggerFlash()
        setImages(result.images ?? images)
        setContainers(result.containers ?? containers)
        setHistory(result.clear ? [] : [...history, ...newLines])
        setInput('')
    }

    const lineColor = { cmd: 'text-emerald-400', out: darkMode ? 'text-slate-300' : 'text-slate-200', err: 'text-rose-400', hint: 'text-amber-300', ok: 'text-emerald-300 font-bold' }
    const doneCount = missions.filter((m) => done.has(m.id)).length

    return (
        <div data-testid="docker-sandbox" className={`my-6 rounded-2xl border overflow-hidden ${darkMode ? 'border-sky-800 bg-slate-900' : 'border-sky-200 bg-white'} ${flash ? 'ring-4 ring-rose-500 transition' : 'transition'}`}>
            {/* Başlık şeridi */}
            <div className={`px-4 py-3 flex items-center justify-between gap-2 ${darkMode ? 'bg-sky-950' : 'bg-sky-50'}`}>
                <div className="font-bold text-sm flex items-center gap-2">
                    <span>🐳</span>
                    <span className={darkMode ? 'text-sky-200' : 'text-sky-900'}>
                        {isTr ? 'Docker Sandbox — komutu kendin yaz, motoru canlı izle' : 'Docker Sandbox — type the command yourself, watch the engine live'}
                    </span>
                </div>
                {missions.length > 0 && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${darkMode ? 'bg-sky-900 text-sky-300' : 'bg-sky-100 text-sky-700'}`}>
                        {doneCount}/{missions.length} {isTr ? 'görev' : 'missions'}
                    </span>
                )}
            </div>

            {/* Görev listesi */}
            {missions.length > 0 && (
                <ol className={`px-4 py-3 space-y-1 text-sm border-b ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                    {missions.map((m) => {
                        const isDone = done.has(m.id)
                        const isNext = !isDone && missions.find((x) => !done.has(x.id)) === m
                        return (
                            <li key={m.id} data-testid={`mission-${m.id}`} data-done={isDone ? 'true' : 'false'}
                                className={`flex items-start gap-2 ${isDone ? 'opacity-70' : ''} ${celebrate === m.id ? 'animate-bounce' : ''}`}>
                                <span>{isDone ? '✅' : isNext ? '👉' : '⬜'}</span>
                                <span className={`${isDone ? 'line-through' : ''} ${isNext ? 'font-bold' : ''} ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                    {pick(m.text, isTr)}
                                </span>
                            </li>
                        )
                    })}
                </ol>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Sol: terminal */}
                <div className="bg-slate-950 flex flex-col min-h-[280px]">
                    <div ref={termRef} className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed max-h-72">
                        {history.length === 0 && (
                            <div className="text-slate-500">
                                {isTr ? '# Buraya komut yaz — örn: docker pull hello-world' : '# Type a command here — e.g.: docker pull hello-world'}
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
                            data-testid="sandbox-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isTr ? 'docker komutunu yaz ve Enter\'a bas' : 'type a docker command and press Enter'}
                            className="flex-1 bg-transparent outline-none font-mono text-sm text-slate-100 placeholder:text-slate-600"
                            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                            style={{ fontSize: '16px' }}
                        />
                        <button type="submit" className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 text-white min-h-[36px]">
                            {isTr ? 'Çalıştır' : 'Run'}
                        </button>
                    </form>
                </div>

                {/* Sağ: engine görünümü */}
                <div className={`px-4 py-3 space-y-3 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                    <div>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            📦 IMAGES ({images.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {images.length === 0 && <span className={`text-xs italic ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>{isTr ? 'raf boş' : 'shelf is empty'}</span>}
                            {images.map((im) => (
                                <span key={`${im.name}:${im.tag}`} data-testid={`sandbox-image-${im.name.replace(/\W/g, '-')}`}
                                    className={`text-xs font-mono px-2 py-1 rounded-lg border ${darkMode ? 'border-sky-700 bg-sky-950 text-sky-300' : 'border-sky-300 bg-sky-100 text-sky-800'}`}>
                                    📦 {im.name}:{im.tag} <span className="opacity-60">({im.size})</span>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            🚢 CONTAINERS ({containers.length})
                        </div>
                        <div className="space-y-1.5">
                            {containers.length === 0 && <span className={`text-xs italic ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>{isTr ? 'çalışan bir şey yok' : 'nothing running'}</span>}
                            {containers.map((c) => (
                                <div key={c.id} data-testid={`sandbox-container-${c.name.replace(/\W/g, '-')}`} data-status={c.status}
                                    className={`flex items-center gap-2 text-xs font-mono px-2 py-1.5 rounded-lg border ${c.status === 'running'
                                        ? (darkMode ? 'border-emerald-700 bg-emerald-950 text-emerald-300' : 'border-emerald-300 bg-emerald-50 text-emerald-800')
                                        : (darkMode ? 'border-slate-700 bg-slate-800 text-slate-400' : 'border-slate-300 bg-slate-100 text-slate-500')}`}>
                                    <span className={`inline-block w-2 h-2 rounded-full ${c.status === 'running' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                                    <span className="font-bold">{c.name}</span>
                                    <span className="opacity-70">{c.image}</span>
                                    {c.ports.map((p) => (
                                        <span key={p.host} className={`px-1.5 py-0.5 rounded ${darkMode ? 'bg-sky-900 text-sky-300' : 'bg-sky-200 text-sky-800'}`}>
                                            :{p.host}→{p.cont}
                                        </span>
                                    ))}
                                    <span className="ml-auto uppercase text-[9px] font-bold tracking-wide">{c.status === 'running' ? (isTr ? 'çalışıyor' : 'running') : (isTr ? 'durdu' : 'exited')}</span>
                                </div>
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
