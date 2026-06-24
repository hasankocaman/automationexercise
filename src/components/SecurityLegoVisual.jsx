import React, { useState } from 'react'

export default function SecurityLegoVisual({ variant, darkMode, language }) {
    const isTr = language === 'tr'
    const [state, setState] = useState('vuln') // 'vuln' or 'secure'
    const [trigger, setTrigger] = useState(false)
    const [selectedHouse, setSelectedHouse] = useState(5)
    const [logs, setLogs] = useState([])

    // Helper: LEGO bump row
    const LegoBumps = ({ color, count = 4 }) => (
        <div className="flex justify-around px-2 h-2">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="w-3 h-2 rounded-t-sm border border-black/20 border-b-0"
                    style={{ background: color }}
                />
            ))}
        </div>
    )

    const handleAction = () => {
        setTrigger(true)
        setTimeout(() => setTrigger(false), 1500)
    }

    // Common wrappers
    const CardWrapper = ({ title, children, explanation, onAction }) => (
        <div className={`mt-6 border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
            {/* Header */}
            <div className={`px-4 py-3 border-b-2 flex items-center justify-between ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
                <div className="flex items-center gap-2">
                    <span className="text-xl">🧩</span>
                    <span className="font-bold text-xs uppercase tracking-wider">{title}</span>
                </div>
                <div className="flex gap-1.5">
                    <button
                        onClick={() => { setState('vuln'); setTrigger(false) }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            state === 'vuln'
                                ? 'bg-red-600 text-white shadow-md'
                                : darkMode ? 'bg-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
                        }`}
                    >
                        ⚠️ {isTr ? 'Zafiyetli Durum' : 'Vulnerable'}
                    </button>
                    <button
                        onClick={() => { setState('secure'); setTrigger(false) }}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            state === 'secure'
                                ? 'bg-emerald-600 text-white shadow-md'
                                : darkMode ? 'bg-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
                        }`}
                    >
                        🛡️ {isTr ? 'Güvenli Durum' : 'Secure'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col md:flex-row gap-6 items-center">
                {/* Animation Area */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 relative min-h-[220px] bg-slate-950/40 rounded-xl border border-slate-800 overflow-hidden">
                    {children}
                </div>

                {/* Info Text Area */}
                <div className="w-full md:w-1/2 space-y-3">
                    <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
                        state === 'vuln'
                            ? darkMode ? 'bg-red-950/20 border-red-900/40 text-red-200' : 'bg-red-50 border-red-200 text-red-800'
                            : darkMode ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                        <div className="font-bold mb-1">
                            {state === 'vuln' 
                                ? (isTr ? '🔴 Zafiyet Analizi:' : '🔴 Vulnerability Analysis:') 
                                : (isTr ? '🟢 Güvenli Çözüm:' : '🟢 Secure Solution:')}
                        </div>
                        {explanation}
                    </div>

                    <button
                        onClick={onAction || handleAction}
                        disabled={trigger}
                        className={`w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-transform active:scale-95 border border-slate-700 disabled:opacity-50`}
                    >
                        ⚡ {isTr ? 'Simülasyonu Çalıştır' : 'Run Simulation'}
                    </button>
                </div>
            </div>
        </div>
    )

    // ─────────────────────────────────────────────────────────────────────────
    // 1. SQLi Simulation
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'sqli') {
        const title = isTr ? "LEGO Yapboz Mantığı (SQLi)" : "LEGO Puzzle Logic (SQLi)"
        const explanation = state === 'vuln'
            ? (isTr 
                ? "Saldırgan girdi ucuna tırnak (') parçası takarak veritabanı kilit zincirini kırar. SQL motoru girdi ile komutu birleştirerek dolabın tüm kilitlerini açar."
                : "The attacker attaches a quote (') brick to their input. This breaks the SQL query chain. The SQL engine executes the input as a command, opening the vault.")
            : (isTr
                ? "Prepared Statement kullanarak girdi tuğlasını şeffaf koruyucu bir kapsül içine alırız. Veritabanı bunu sadece düz bir yazı olarak okur, komut olarak çalıştıramaz."
                : "Using Prepared Statements, the input brick is wrapped in a transparent protective capsule. The database treats it strictly as user data, neutralizing any SQL payload.")

        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes sqli-slide-open {
                        0% { transform: none; }
                        50% { transform: translateX(20px); }
                        100% { transform: none; }
                    }
                    @keyframes sqli-snap-vuln {
                        0% { transform: translateY(-40px); opacity: 0; }
                        30% { transform: translateY(0); opacity: 1; }
                        60% { transform: translateX(15px); }
                        100% { transform: none; }
                    }
                    .sqli-drawer-open { animation: sqli-slide-open 1.5s ease-in-out; }
                    .sqli-snap-action { animation: sqli-snap-vuln 1.5s ease; }
                `}} />

                {/* SQL Base Block */}
                <div className="w-48 bg-blue-600 rounded-lg p-3 text-white border-2 border-blue-700 shadow-md relative z-10">
                    <LegoBumps color="#2563eb" />
                    <div className="font-mono text-[9px] truncate">
                        SELECT * FROM users WHERE user=
                    </div>
                </div>

                {/* Input Block */}
                <div className={`mt-3 relative z-20 transition-all duration-300 ${trigger ? 'sqli-snap-action' : ''}`}>
                    {state === 'secure' ? (
                        // Secure Transparent Wrapper
                        <div className="border-2 border-emerald-400 bg-emerald-500/20 p-2 rounded-xl flex items-center justify-center">
                            <span className="text-[8px] font-bold text-emerald-300 mr-1.5 uppercase">SAFE</span>
                            <div className="bg-red-500 rounded p-1 text-white text-[9px] font-mono border border-red-600">
                                admin' OR 1=1
                            </div>
                        </div>
                    ) : (
                        // Vulnerable Block with sharp Quote
                        <div className="bg-red-500 rounded p-1.5 text-white text-[9px] font-mono border-2 border-red-600 flex items-center gap-1 shadow-md">
                            <span>admin' OR 1=1</span>
                            <span className="text-yellow-300 font-extrabold animate-pulse">⚡</span>
                        </div>
                    )}
                </div>

                {/* Database Cabinet representation */}
                <div className={`mt-4 w-32 h-16 bg-amber-800 border-2 border-amber-900 rounded-lg flex items-center justify-center gap-2 p-2 ${
                    trigger && state === 'vuln' ? 'sqli-drawer-open' : ''
                }`}>
                    <div className="w-10 h-10 bg-amber-600 border border-amber-700 rounded flex items-center justify-center font-bold text-white text-xs shadow-inner">
                        🔑 {trigger && state === 'vuln' ? '🔓' : '🔒'}
                    </div>
                    <span className="text-[9px] font-bold text-amber-200">
                        {trigger && state === 'vuln' ? 'OPEN' : 'LOCKED'}
                    </span>
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. XSS Simulation
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'xss') {
        const title = isTr ? "LEGO XSS Önleme" : "LEGO XSS Prevention"
        const explanation = state === 'vuln'
            ? (isTr
                ? "Saldırgan, ilan panosuna zehirli bir elektrik kablosu takar. Göbüş panoya bakınca elektrik kablosu aktifleşir ve Göbüş'ün tarayıcı çerezlerini hackera uçurur."
                : "The attacker mounts a malicious power wire on the board. When Goofy views the board, the wire energizes, exfiltrating cookies to the attacker's server.")
            : (isTr
                ? "Girdileri panoya asmadan önce üzerlerini şeffaf akrilik koruyucu (Sanitization) ile kaplarız. Kablolar panodaki devrelere temas edemez, zararsız plastik kalır."
                : "We coat the inputs with a transparent acrylic protective shield. Wires cannot connect to internal circuits, remaining harmless plastic decorations.")

        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes xss-sparkle {
                        0%, 100% { opacity: 0; transform: scale(0.5); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes xss-cookie-flow {
                        0% { left: 20%; bottom: 10px; opacity: 1; }
                        100% { left: 80%; bottom: 10px; opacity: 0; }
                    }
                    .xss-spark { animation: xss-sparkle 0.4s ease infinite; }
                    .xss-cookie { animation: xss-cookie-flow 1.5s ease-out; }
                `}} />

                {/* Bulletin Board */}
                <div className="w-52 h-20 bg-amber-900 border-4 border-amber-950 rounded-xl relative p-2 flex flex-col justify-center items-center shadow-lg">
                    <div className="absolute top-1 left-2 text-[8px] font-bold text-amber-200">
                        📢 {isTr ? "İLAN PANOSU" : "BULLETIN BOARD"}
                    </div>

                    {state === 'secure' ? (
                        // Sanitized Block
                        <div className="relative border-2 border-emerald-400 bg-emerald-500/20 p-1.5 rounded-lg flex items-center justify-center max-w-[90%]">
                            <span className="absolute top-0 right-1 text-[7px] text-emerald-400 font-bold">SHIELD</span>
                            <code className="text-[7px] font-mono text-emerald-200">&lt;script&gt;...</code>
                        </div>
                    ) : (
                        // Vulnerable Block with Sparking Wire
                        <div className="bg-red-500/90 border border-red-600 rounded p-1.5 text-white text-[8px] font-mono relative max-w-[90%] shadow-md">
                            <code>&lt;script&gt;steal()</code>
                            {trigger && (
                                <div className="absolute -top-2 -right-2 text-yellow-300 text-lg xss-spark">💥</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Victims & Hacker */}
                <div className="w-full flex justify-between items-center mt-6 px-4">
                    {/* Victim (Gobo) */}
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full bg-emerald-500 relative flex items-center justify-center border-2 border-emerald-600 ${
                            trigger && state === 'vuln' ? 'animate-bounce shadow-lg shadow-red-500/30' : ''
                        }`}>
                            <div className="absolute top-2.5 left-1.5 w-1.5 h-1.5 rounded-full bg-white flex items-center justify-center"><div className="w-0.5 h-0.5 bg-black rounded-full" /></div>
                            <div className="absolute top-2.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white flex items-center justify-center"><div className="w-0.5 h-0.5 bg-black rounded-full" /></div>
                            <div className={`absolute bottom-1 w-3 h-1.5 rounded-b-full bg-emerald-800 transition-all ${
                                trigger && state === 'vuln' ? 'h-3 bg-red-600' : ''
                            }`} />
                        </div>
                        <span className="text-[9px] mt-1 text-slate-400">Gobo</span>
                    </div>

                    {/* Stolen Cookie animation */}
                    {trigger && state === 'vuln' && (
                        <div className="absolute text-sm xss-cookie left-1/4">
                            🍪 <span className="text-[6px] font-mono bg-black text-red-400 p-0.5 rounded">SessionCookie</span>
                        </div>
                    )}

                    {/* Hacker */}
                    <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full bg-slate-800 relative flex items-center justify-center border-2 border-red-600 ${
                            trigger && state === 'vuln' ? 'scale-110 shadow-lg shadow-red-500/40' : ''
                        }`}>
                            <div className="absolute top-1 text-xs">🕶️</div>
                            <div className="absolute bottom-1.5 w-3 h-0.5 bg-red-600 rounded" />
                        </div>
                        <span className="text-[9px] mt-1 text-slate-400">Hacker</span>
                    </div>
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 3. JWT Authentication Simulation
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'jwt') {
        const title = isTr ? "Güvenli Bilet Kontrolü (JWT)" : "Secure Ticket Validation (JWT)"
        const explanation = state === 'vuln'
            ? (isTr
                ? "Bilet imza kontrolü zayıftır. Hacker biletin üstüne mavi bir LEGO yuvarlağı takıp sunucuya gönderir. Sunucu, imzanın sahte olup olmadığını doğrulamadan biletin içeriğine güvenir."
                : "Ticket validation is weak. The hacker tags a generic blue stud on the card. The server accepts it without verifying if the seal matches the key.")
            : (isTr
                ? "Sunucu, biletin arkasındaki imza çıkıntısını kendi gizli kalıbı (Secret Key) ile eşleştirir. Sadece birebir interlocking yapan orijinal parçalar onay alır."
                : "The server checks the signature grooves against its secret master key mold. Only original tickets that interlock perfectly are approved.")

        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes jwt-verify-shake {
                        0%, 100% { transform: none; }
                        25% { transform: rotate(-5deg); }
                        75% { transform: rotate(5deg); }
                    }
                    @keyframes jwt-success-pulse {
                        0%, 100% { box-shadow: 0 0 0 transparent; }
                        50% { box-shadow: 0 0 15px rgba(16,185,129,0.8); }
                    }
                    .jwt-check-shake { animation: jwt-verify-shake 0.4s ease 3; }
                    .jwt-success { animation: jwt-success-pulse 1s ease infinite; }
                `}} />

                {/* Ticket Wristband */}
                <div className={`w-40 p-2 rounded-xl text-white font-mono text-[8px] space-y-1 relative border-2 ${
                    state === 'secure' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400' : 'bg-slate-700 border-slate-600'
                } ${trigger ? 'jwt-check-shake' : ''}`}>
                    <div className="flex justify-between border-b border-white/20 pb-0.5">
                        <span>alg: {state === 'secure' ? 'HS256' : 'none'}</span>
                        <span>typ: JWT</span>
                    </div>
                    <div className="font-bold text-yellow-300">
                        role: ADMIN
                    </div>

                    {/* Seal representation */}
                    <div className="flex justify-end mt-1">
                        {state === 'secure' ? (
                            <div className="w-4 h-4 rounded-full bg-yellow-400 border border-yellow-600 flex items-center justify-center font-bold text-black text-[7px] shadow-sm">
                                👑
                            </div>
                        ) : (
                            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-blue-700 shadow-sm" />
                        )}
                    </div>
                </div>

                {/* Guard Scan Machine */}
                <div className="mt-4 w-44 p-3 bg-slate-900 border border-slate-700 rounded-lg flex flex-col items-center">
                    <div className="text-[8px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        {isTr ? "KONTROL SİSTEMİ" : "VALIDATION GUARD"}
                    </div>
                    
                    {trigger ? (
                        state === 'secure' ? (
                            <div className="text-[9px] font-bold text-emerald-400 animate-pulse">
                                ✓ APPROVED (KEY MATCH)
                            </div>
                        ) : (
                            <div className="text-[9px] font-bold text-red-400 animate-bounce">
                                ✗ FORGED SEAL DETECTED
                            </div>
                        )
                    ) : (
                        <div className="text-[9px] font-bold text-slate-400">
                            WAITING TICKET...
                        </div>
                    )}
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 4. IDOR Simulation
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'idor') {
        const title = isTr ? "IDOR Engelleme" : "IDOR Prevention"
        const explanation = state === 'vuln'
            ? (isTr
                ? "LEGO evlerin üzerindeki kapı numaraları cırt cırtlıdır. Saldırgan sadece kapı numarasını (userId) değiştirerek, muhafız engeline takılmadan başka bir eve girebilir."
                : "House ID plates are loose. The attacker peels off 'ID: 5' and sticks 'ID: 4'. The system lets them open Alice's chest without validating authorization.")
            : (isTr
                ? "Kapının arkasına akıllı bir kilit (Erişim Kontrolü) takarız. Bu kilit, biletteki aktif kullanıcı ile kapının gerçek sahibini doğrular. Eşleşmezse kapı kilitli kalır."
                : "We install an authorization puzzle piece inside the door frame. It verifies if the requester session matches the resource owner, keeping unauthorized users out.")



        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes idor-shake {
                        0%, 100% { transform: scale(1); }
                        20% { transform: scale(1.05) rotate(-3deg); }
                        60% { transform: scale(1.05) rotate(3deg); }
                    }
                    .idor-denied { animation: idor-shake 0.4s ease; }
                `}} />

                {/* API Input URL Panel */}
                <div className="w-full max-w-[240px] mb-4 p-2 bg-slate-900 border border-slate-700 rounded flex items-center justify-between text-[9px] font-mono text-slate-300">
                    <span>/api/getData?id=</span>
                    <select
                        value={selectedHouse}
                        onChange={(e) => setSelectedHouse(Number(e.target.value))}
                        className="bg-slate-800 text-yellow-300 font-bold border border-slate-600 rounded px-1"
                    >
                        <option value={5}>{isTr ? "5 (Kendi Evin)" : "5 (Your House)"}</option>
                        <option value={4}>{isTr ? "4 (Alice'in Evi)" : "4 (Alice's House)"}</option>
                    </select>
                </div>

                {/* LEGO House Graphics */}
                <div className="flex gap-4 items-end">
                    {[4, 5].map((num) => {
                        const isActive = selectedHouse === num
                        const doorOpen = trigger && isActive && (state === 'vuln' || num === 5)
                        const failed = trigger && isActive && state === 'secure' && num === 4

                        return (
                            <div
                                key={num}
                                className={`w-16 h-24 relative flex flex-col justify-end items-center rounded-lg border-2 ${
                                    num === 5 ? 'bg-amber-500 border-amber-600' : 'bg-blue-500 border-blue-600'
                                } ${failed ? 'idor-denied' : ''}`}
                            >
                                {/* Roof */}
                                <div className="absolute -top-3 w-18 h-4 bg-slate-700 rotate-6 rounded" style={{ width: '68px' }} />

                                {/* ID badge */}
                                <div className="absolute top-2 px-1 bg-white text-black font-bold text-[7px] rounded">
                                    ID: {num}
                                </div>

                                {/* Door */}
                                <div
                                    className="w-8 h-10 bg-yellow-950 border border-yellow-900 rounded-t-sm relative transition-transform duration-500"
                                    style={{
                                        transformOrigin: 'left',
                                        transform: doorOpen ? 'rotateY(-110deg)' : 'none'
                                    }}
                                >
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full absolute right-1 top-5" />
                                </div>

                                {/* Loot behind the door */}
                                {doorOpen && (
                                    <div className="absolute bottom-2 font-mono text-[7px] text-white bg-black/80 px-1 rounded animate-pulse">
                                        {num === 5 ? '🔑 MY_DATA' : '🎁 ALICE_SECRET'}
                                    </div>
                                )}

                                {/* Error/Lock icon */}
                                {failed && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold z-10">
                                        🔒
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 5. SSRF/XXE Simulation
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'ssrf') {
        const title = isTr ? "SSRF & XXE Koruma" : "SSRF & XXE Protection"
        const explanation = state === 'vuln'
            ? (isTr
                ? "Zafiyetli postacı (sunucu) dış dünyadan aldığı mektuptaki adresi sorgulamadan kalenin içindeki gizli depolara (localhost) gidip verileri hacker'a ulaştırır."
                : "The vulnerable postman (server) processes the destination letter blindly. He goes directly to local secure systems (localhost) and fetches gold for the hacker.")
            : (isTr
                ? "Postacının (sunucu) eline katı bir beyaz liste (allowlist) iliştiririz. Postacı localhost adreslerini görünce mektubu çöpe atar ve kalenin dışına çıkmaz."
                : "We attach a strict allowlist scroll to the postman's hand. When he sees local addresses (localhost), he discards the query instantly.")

        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes ssrf-postman-run {
                        0% { transform: translateX(-40px); }
                        30% { transform: translateX(0); }
                        50% { transform: scaleX(-1) translateX(25px); }
                        100% { transform: scaleX(1) translateX(-40px); }
                    }
                    .ssrf-run { animation: ssrf-postman-run 1.5s ease-in-out; }
                `}} />

                {/* Castle Wall */}
                <div className="w-full h-12 bg-slate-700 border-b-4 border-slate-800 relative flex items-center justify-center">
                    <span className="text-[8px] font-bold text-slate-400 absolute left-2 uppercase">
                        {isTr ? "KALE DUVARI (Sunucu Sınırı)" : "CASTLE WALL (Server Boundary)"}
                    </span>
                    <div className="w-6 h-8 bg-slate-900 border-x-2 border-t-2 border-slate-950 absolute right-4 bottom-0 flex items-center justify-center">
                        🛡️
                    </div>
                </div>

                {/* Interactive Scene */}
                <div className="w-full flex justify-between items-center mt-4 relative min-h-[80px]">
                    {/* The Postman / Fetcher */}
                    <div className={`flex flex-col items-center absolute left-10 ${trigger ? 'ssrf-run' : ''}`}>
                        <div className="w-8 h-10 bg-indigo-600 rounded-lg relative flex flex-col items-center justify-center border-2 border-indigo-700 shadow-md">
                            <span className="text-sm">✉️</span>
                            <div className="absolute -top-1.5 w-6 h-1.5 bg-slate-800 rounded-full" />
                        </div>
                        <span className="text-[8px] font-bold mt-1 text-slate-400">
                            {isTr ? "Postacı (Server)" : "Postman (Server)"}
                        </span>
                    </div>

                    {/* Allowlist filter box */}
                    {state === 'secure' && (
                        <div className="absolute left-24 border-2 border-emerald-400 bg-emerald-500/20 p-1 rounded text-[7px] font-bold text-emerald-300">
                            ALLOWLIST: ✓ safe.com / ✗ localhost
                        </div>
                    )}

                    {/* Private Resource Box */}
                    <div className="flex flex-col items-center absolute right-4">
                        <div className="w-10 h-10 bg-amber-600 border-2 border-amber-800 rounded-md flex items-center justify-center shadow-lg relative">
                            📦
                            {trigger && state === 'vuln' && (
                                <span className="absolute -top-2 text-yellow-300 text-xs animate-ping">🔑</span>
                            )}
                        </div>
                        <span className="text-[7px] font-mono mt-1 text-amber-300">127.0.0.1 (Local)</span>
                    </div>
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 6. Security Misconfigurations
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'config') {
        const title = isTr ? "Güvenli Yapılandırma" : "Security Hardening"
        const explanation = state === 'vuln'
            ? (isTr
                ? "Uygulama kalesinin ön kapısını kilitlerken, arkadaki küçük lego kapısını (varsayılan şifreler, debug mod) kilitlemeyi unuturuz."
                : "While armoring the main castle gate, we forget to lock the small default door (default passwords, active debug mode) on the back wall.")
            : (isTr
                ? "Tüm gereksiz varsayılan lego girişlerini düz kapatma plakalarıyla (capping) örteriz. Düşmanın sızabileceği hiçbir boş delik kalmaz."
                : "We cover all unused lego socket nodes with smooth capping tiles. Attackers have no ports or debug headers left to climb onto.")

        return (
            <CardWrapper title={title} explanation={explanation}>
                {/* Wall configuration */}
                <div className="w-52 h-24 bg-slate-800 rounded-xl border-4 border-slate-950 relative flex flex-col justify-end p-2 shadow-2xl">
                    <div className="absolute top-2 left-2 text-[8px] font-bold text-slate-400">
                        {isTr ? "LEGO KALE DUVARI" : "LEGO CASTLE WALL"}
                    </div>

                    {/* Unused nodes/sockets */}
                    <div className="flex justify-around mb-4">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="relative flex flex-col items-center">
                                {state === 'secure' ? (
                                    // Hardened with flat plate
                                    <div className="w-5 h-1 bg-emerald-500 rounded border border-emerald-600 shadow" />
                                ) : (
                                    // Open node / Default ports
                                    <div className="w-4 h-3 bg-red-500 rounded-t border-2 border-red-700 animate-pulse flex items-center justify-center">
                                        <span className="text-[6px] text-white">DB</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Main gate */}
                    <div className="w-16 h-12 bg-slate-900 border-x-4 border-t-4 border-slate-950 mx-auto rounded-t flex items-center justify-center">
                        🚪
                    </div>
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 7. Insecure Deserialization
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'deserialization') {
        const title = isTr ? "Güvenli Nesne Yapımı (Deserialization)" : "Safe Object Assembly"
        const explanation = state === 'vuln'
            ? (isTr
                ? "Dışarıdan gelen lego kutusundaki (byte stream) parçaları körü körüne birleştiririz. Lego yığınının içinden aniden fırlayan kırmızı bir kanca (gadget), masayı havaya uçurur."
                : "We assemble bricks directly from raw byte streams. When reconstructing the lego object, a spring-loaded TNT jack (gadget class) explodes the baseplate.")
            : (isTr
                ? "Kutuyu açmadan önce bir kontrol süzgeci (Allowlist Filtering) koyarız. Sadece izin verilen sarı ve mavi parçaları kabul eder, zararlı kırmızı lego kancasını çöpe fırlatırız."
                : "We install an allowlist parsing filter before assembly. We only process recognized blue and yellow shapes, dumping any unlisted red blocks into the reject bin.")

        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes des-monster-pop {
                        0% { transform: translateY(40px) scale(0.1); opacity: 0; }
                        50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
                        100% { transform: translateY(0) scale(1); opacity: 1; }
                    }
                    .des-monster { animation: des-monster-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                `}} />

                {/* The package delivery box */}
                <div className="w-44 p-3 bg-amber-800 border-2 border-amber-950 rounded-lg flex flex-col items-center shadow-lg">
                    <div className="text-[7px] text-amber-200 font-bold mb-1">
                        📦 {isTr ? "GELEN PAKET (Serialized Byte Stream)" : "INCOMING PACKAGE"}
                    </div>

                    {trigger ? (
                        state === 'secure' ? (
                            // Secure Filtered Block
                            <div className="flex gap-2 p-1.5 bg-emerald-500/20 border border-emerald-400 rounded">
                                <div className="w-4 h-4 bg-yellow-400 rounded-sm" />
                                <div className="w-4 h-4 bg-blue-500 rounded-sm" />
                                <span className="text-[7px] font-bold text-emerald-400 uppercase">CLEAN</span>
                            </div>
                        ) : (
                            // Vulnerable Monster pops up
                            <div className="flex flex-col items-center des-monster">
                                <div className="text-xl">👹</div>
                                <div className="w-6 h-6 bg-red-600 rounded-t border-2 border-red-700 flex items-center justify-center font-bold text-white text-[7px] shadow-lg">
                                    TNT
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="w-8 h-4 bg-amber-600 rounded animate-pulse" />
                    )}
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 8. Business Logic Flaws
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'logic') {
        const title = isTr ? "Mantıksal Sınırları Çizmek" : "Business Rule Limits"
        const explanation = state === 'vuln'
            ? (isTr
                ? "Sistem, eksi değerli (-5 adet) girdi lego bloklarını kabul eder. Bu mantıksal hata nedeniyle kule boyu yukarı uzayacağına aşağı çökerek temel plakayı kırar."
                : "The system accepts inputs with negative values (e.g. -5 items). This business logic oversight causes the tower models to collapse through the floor.")
            : (isTr
                ? "Giriş kapısına bir boyut filtresi (Sanity Check) yerleştiririz. Değeri sıfır veya eksi olan tüm uyumsuz lego parçalarını anında dışarı fırlatır."
                : "We install a mechanical sanity checking gate. Any brick declaring a negative value is instantly rejected and blocked from entering the tower build.")

        const [itemCount, setItemCount] = useState(1)

        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes logic-crash {
                        0% { transform: translateY(0); }
                        50% { transform: translateY(20px); filter: grayscale(1); }
                        100% { transform: translateY(0); }
                    }
                    .logic-tower-crash { animation: logic-crash 1.2s ease-in-out; }
                `}} />

                {/* Input Panel */}
                <div className="w-full max-w-[240px] mb-4 p-2 bg-slate-900 border border-slate-700 rounded flex items-center justify-between text-[9px] font-mono text-slate-300">
                    <span>{isTr ? "Sepete Ekle: " : "Add Bricks: "}</span>
                    <input
                        type="number"
                        value={itemCount}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        className="w-12 bg-slate-800 text-yellow-300 font-bold border border-slate-600 rounded px-1 text-center"
                    />
                </div>

                {/* The LEGO Tower structure */}
                <div className={`flex flex-col items-center ${
                    trigger && itemCount < 0 && state === 'vuln' ? 'logic-tower-crash' : ''
                }`}>
                    {/* Tower layers based on count */}
                    {itemCount < 0 && state === 'secure' ? (
                        // Secure rejected message
                        <div className="text-[8px] font-bold text-red-400 bg-red-950/20 border border-red-500 p-1.5 rounded animate-bounce">
                            ⚠️ BLOCK: NEGATIVE SIZE NOT ALLOWED
                        </div>
                    ) : (
                        <div className="flex flex-col-reverse items-center">
                            {/* Baseplate */}
                            <div className="w-20 h-3 bg-slate-700 rounded-b border-b-2 border-slate-800" />
                            {/* Bricks stack */}
                            {Array.from({ length: Math.max(1, Math.min(5, Math.abs(itemCount))) }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-14 h-5 border border-black/20 flex items-center justify-center font-bold text-[8px] text-white shadow ${
                                        itemCount < 0 ? 'bg-red-500' : 'bg-emerald-500'
                                    }`}
                                >
                                    {itemCount < 0 ? `-${idx + 1}` : `+${idx + 1}`}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 9. Logging & Monitoring
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'logging') {
        const title = isTr ? "Günlük Tutma (Logging)" : "Ledger Logging"
        const explanation = state === 'vuln'
            ? (isTr
                ? "LEGO karakterimiz odaya sessizce girer. Zemin pürüzsüz düz plaka olduğu için arkasında ayak izi (log) kalmaz, kimin ne yaptığını asla bilemeyiz."
                : "The rogue character walks across a smooth floor. Since there are no trace blocks, he leaves zero footprints. Admin has no logs to reconstruct the path.")
            : (isTr
                ? "Giriş kapısına basıldığında 'çıt' sesi çıkaran özel basma düğmeleri yerleştiririz. Her adım otomatik olarak yan taraftaki blok listesine (log ledger) yazılır."
                : "We install mechanical pressure plates along the walkway. Each step clicks down, automatically appending a log brick onto the security ledger board.")



        const handleRunAndLog = () => {
            handleAction()
            if (state === 'secure') {
                setLogs(prev => [...prev.slice(-3), isTr ? `Giriş tetiklendi: ${new Date().toLocaleTimeString()}` : `Access detected: ${new Date().toLocaleTimeString()}`])
            }
        }

        return (
            <CardWrapper title={title} explanation={explanation} onAction={handleRunAndLog}>
                <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                    {/* The Path */}
                    <div className="flex flex-col items-center">
                        <div className="flex gap-2">
                            {[1, 2, 3].map((num) => (
                                <div
                                    key={num}
                                    className={`w-8 h-8 rounded border flex items-center justify-center relative ${
                                        state === 'secure' ? 'bg-emerald-500/20 border-emerald-500' : 'bg-slate-800 border-slate-700'
                                    }`}
                                >
                                    🦶
                                    {trigger && state === 'secure' && (
                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">
                            {isTr ? "İŞLEM ADIMLARI" : "TRANSACTION STEP PATH"}
                        </span>
                    </div>

                    {/* The Ledger Output */}
                    <div className="w-36 p-2 bg-slate-900 border border-slate-700 rounded-lg min-h-[60px] flex flex-col justify-end text-[7px] font-mono text-slate-400">
                        <div className="text-[8px] font-bold text-slate-500 border-b border-slate-800 pb-0.5 mb-1">
                            📋 {isTr ? "GÜNLÜK KAYITLARI" : "SECURITY LEDGER"}
                        </div>
                        {logs.length > 0 ? (
                            logs.map((log, idx) => (
                                <div key={idx} className="text-emerald-400">
                                    {log}
                                </div>
                            ))
                        ) : (
                            <span className="italic">{isTr ? "Kayıt Yok (Sessiz)" : "No Logs Recorded"}</span>
                        )}
                    </div>
                </div>
            </CardWrapper>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 10. Sensitive Data Exposure
    // ─────────────────────────────────────────────────────────────────────────
    if (variant === 'sensitive-data') {
        const title = isTr ? "Şifreleme (Sensitive Data)" : "Cryptography (Sensitive Data)"
        const explanation = state === 'vuln'
            ? (isTr
                ? "Gizli şifreyi normal lego harfleriyle yan yana düz dizeriz. Masaya dışarıdan bakan her canavar şifreyi (plaintext) anında okuyabilir."
                : "We spell out the secret password using literal letter bricks. Any passing monster can read the plaintext combination immediately.")
            : (isTr
                ? "Harf tuğlalarını şifreleme mikserine (Bcrypt) atarız. Makine bunu tamamen şekilsiz karmaşık bir lego yığınına (hash) dönüştürür."
                : "We drop the letter bricks into a mixer machine (Bcrypt). It scrambles the input, producing a complex, unrecognizable block cluster (hash).")

        return (
            <CardWrapper title={title} explanation={explanation}>
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes logic-mix {
                        0% { transform: rotate(0); }
                        100% { transform: rotate(360deg); }
                    }
                    .logic-mixer-spin { animation: logic-mix 1s linear infinite; }
                `}} />

                {trigger ? (
                    state === 'secure' ? (
                        // Secure hashed block representation
                        <div className="flex flex-col items-center">
                            {/* Scrambled shape */}
                            <div className="w-12 h-12 bg-slate-700 border-2 border-slate-600 rounded-full flex items-center justify-center font-mono text-[7px] text-yellow-300 font-bold rotate-45 shadow-inner">
                                $2a$12$...
                            </div>
                            <span className="text-[7px] font-mono text-emerald-400 mt-1 uppercase">HASHED</span>
                        </div>
                    ) : (
                        // Plaintext letters
                        <div className="flex gap-1 justify-center">
                            {['P', 'A', 'S', 'S'].map((char, idx) => (
                                <div
                                    key={idx}
                                    className="w-6 h-6 bg-red-500 border border-red-700 rounded flex items-center justify-center font-bold text-white text-xs shadow"
                                >
                                    {char}
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    // Default idle state
                    <div className="flex gap-1 justify-center">
                        {['P', 'A', 'S', 'S'].map((char, idx) => (
                            <div
                                key={idx}
                                className="w-6 h-6 bg-slate-500 border border-slate-600 rounded flex items-center justify-center font-bold text-white text-xs shadow opacity-50"
                            >
                                {char}
                            </div>
                        ))}
                    </div>
                )}
            </CardWrapper>
        )
    }

    return null
}
