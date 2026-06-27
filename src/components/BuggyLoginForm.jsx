import { useState } from 'react'

function panelCls(darkMode) {
    return darkMode ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
}

function inputCls(darkMode) {
    return `min-h-10 w-full rounded-lg border px-3 text-base ${darkMode ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`
}

// The intentionally buggy demo login form — left panel of the Manual Testing Lab.
export default function BuggyLoginForm({ isTr, darkMode }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [view, setView] = useState('login')
    const [message, setMessage] = useState(null)
    const [requestCount, setRequestCount] = useState(0)
    const [log, setLog] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        const next = requestCount + 1
        setRequestCount(next)
        setLog(curr => [...curr, `POST /api/login  (#${next})  email="${email}"`].slice(-6))

        // BUG: empty password shows an unrelated, misleading message instead of "password required"
        if (!password) {
            setMessage(isTr ? 'Geçersiz email adresi.' : 'Invalid email address.')
            return
        }
        // BUG: every other failure shows the exact same generic text, no real detail
        setMessage(isTr ? 'Bir hata oluştu, lütfen tekrar deneyin.' : 'Something went wrong, please try again.')
        // (No email format validation happens above on purpose — that's bug #1.)
    }

    if (view === '404') {
        return (
            <div className={`rounded-lg border p-6 text-center ${panelCls(darkMode)}`}>
                <div className="text-4xl font-black text-rose-400">404</div>
                <p className="mt-2 text-sm opacity-80">{isTr ? 'Sayfa bulunamadı.' : 'Page not found.'}</p>
                <button
                    onClick={() => setView('login')}
                    className="mt-4 min-h-10 rounded-lg bg-sky-600 px-4 text-sm font-bold text-white"
                >
                    {isTr ? '← Giriş ekranına dön' : '← Back to login'}
                </button>
            </div>
        )
    }

    return (
        <div className={`rounded-lg border p-4 md:p-5 ${panelCls(darkMode)}`}>
            <div className="mb-3 text-xs font-black uppercase tracking-wide opacity-60">
                🧪 {isTr ? 'Demo Uygulama (kasıtlı hatalı)' : 'Demo App (intentionally buggy)'}
            </div>
            <form onSubmit={handleSubmit} className="grid gap-3">
                <label className="grid gap-1 text-sm font-bold">
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className={inputCls(darkMode)}
                    />
                </label>
                <label className="grid gap-1 text-sm font-bold">
                    {isTr ? 'Şifre' : 'Password'}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputCls(darkMode)}
                    />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <button type="submit" className="min-h-10 rounded-lg bg-emerald-600 px-4 text-sm font-black text-white">
                        {isTr ? 'Giriş Yap' : 'Log In'}
                    </button>
                    <a
                        href="#forgot-password"
                        onClick={(e) => { e.preventDefault(); setView('404') }}
                        className="text-sm font-bold text-sky-400 underline"
                    >
                        {isTr ? 'Şifremi Unuttum' : 'Forgot password?'}
                    </a>
                </div>
            </form>
            {message && (
                <div className="mt-3 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm font-bold text-rose-300">
                    {message}
                </div>
            )}
            {requestCount > 1 && (
                <div className="mt-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300">
                    ⚠️ {isTr ? `${requestCount} kez istek gönderildi` : `${requestCount} requests sent`}
                </div>
            )}
            {log.length > 0 && (
                <div className="mt-3 rounded-lg border border-slate-700 bg-slate-950/60 p-2 font-mono text-[11px] text-slate-400">
                    {log.map((line, idx) => <div key={idx}>{line}</div>)}
                </div>
            )}
        </div>
    )
}
