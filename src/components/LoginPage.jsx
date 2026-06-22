import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

function GoogleIcon() {
    return (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    )
}

function GitHubIcon() {
    return (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
    )
}

function MicrosoftIcon() {
    return (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 23 23" aria-hidden="true">
            <rect x="1" y="1" width="10" height="10" fill="#F25022" />
            <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
            <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
            <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
        </svg>
    )
}

const PROVIDERS = [
    { id: 'google', label: 'Google', Icon: GoogleIcon },
    { id: 'github', label: 'GitHub', Icon: GitHubIcon },
    { id: 'azure', label: 'Microsoft', Icon: MicrosoftIcon },
]

export default function LoginPage() {
    const { language } = useLanguage()
    const { session, isSupabaseConfigured, signInWithProvider, sendMagicLink, signOut } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const next = searchParams.get('next') || '/'

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle | sending | sent | error
    const [errorMessage, setErrorMessage] = useState('')

    const isTr = language === 'tr'

    async function handleProvider(provider) {
        setErrorMessage('')
        try {
            await signInWithProvider(provider, next)
        } catch (error) {
            setErrorMessage(error.message || (isTr ? 'Giriş başlatılamadı.' : 'Could not start sign-in.'))
        }
    }

    async function handleMagicLinkSubmit(event) {
        event.preventDefault()
        setStatus('sending')
        setErrorMessage('')
        try {
            await sendMagicLink({ fullName, email, next })
            setStatus('sent')
        } catch (error) {
            setStatus('error')
            setErrorMessage(error.message || (isTr ? 'Bağlantı gönderilemedi.' : 'Could not send the link.'))
        }
    }

    if (!isSupabaseConfigured) {
        return (
            <main className="min-h-screen grid place-items-center bg-slate-950 px-4 text-center text-white">
                <p className="text-slate-400">
                    {isTr ? 'Supabase yapılandırılmadı (.env.local eksik).' : 'Supabase is not configured (.env.local missing).'}
                </p>
            </main>
        )
    }

    if (session) {
        return (
            <main className="min-h-screen grid place-items-center bg-slate-950 px-4 text-center text-white">
                <section className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
                    <div className="mb-3 text-3xl">👋</div>
                    <h1 className="text-lg font-bold">
                        {isTr ? 'Zaten giriş yaptın' : 'You are already signed in'}
                    </h1>
                    <div className="mt-6 flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            {isTr ? 'Ana sayfaya dön' : 'Back to home'}
                        </button>
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800"
                        >
                            {isTr ? 'Çıkış yap' : 'Sign out'}
                        </button>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="min-h-screen grid place-items-center bg-slate-950 px-4 py-12 text-white">
            <section className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
                <h1 className="text-xl font-bold">{isTr ? 'Giriş yap veya kayıt ol' : 'Sign in or sign up'}</h1>
                <p className="mt-1 text-sm text-slate-400">
                    {isTr
                        ? 'Sosyal hesabınla hemen gir veya şifresiz Magic Link ile e-postanı doğrula.'
                        : 'Continue instantly with a social account, or verify your email with a passwordless Magic Link.'}
                </p>

                <div className="mt-6 grid gap-2">
                    {PROVIDERS.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => handleProvider(id)}
                            className="flex items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-slate-600 hover:bg-slate-700"
                        >
                            <Icon />
                            {isTr ? `${label} ile devam et` : `Continue with ${label}`}
                        </button>
                    ))}
                </div>

                <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
                    <span className="h-px flex-1 bg-slate-700" />
                    {isTr ? 'veya' : 'or'}
                    <span className="h-px flex-1 bg-slate-700" />
                </div>

                {status === 'sent' ? (
                    <div className="rounded-lg border border-emerald-700 bg-emerald-900/30 p-4 text-sm text-emerald-200">
                        <div className="mb-2 text-2xl">✉️</div>
                        <p className="font-semibold">{isTr ? 'E-postanı kontrol et' : 'Check your email'}</p>
                        <p className="mt-1 text-emerald-300/80">
                            {isTr
                                ? `${email} adresine bir aktivasyon bağlantısı gönderdik. Linke tıkladığında oturumun açılır.`
                                : `We sent an activation link to ${email}. Clicking it will sign you in.`}
                        </p>
                        <button
                            type="button"
                            onClick={() => setStatus('idle')}
                            className="mt-3 text-xs font-semibold text-emerald-200 underline"
                        >
                            {isTr ? 'Farklı e-posta yaz' : 'Use a different email'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleMagicLinkSubmit} className="grid gap-3">
                        <label className="grid gap-1 text-sm font-semibold text-slate-300">
                            {isTr ? 'Ad Soyad' : 'Full name'}
                            <input
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                required
                                autoComplete="name"
                                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-normal text-white"
                                placeholder={isTr ? 'Ada Lovelace' : 'Ada Lovelace'}
                            />
                        </label>
                        <label className="grid gap-1 text-sm font-semibold text-slate-300">
                            {isTr ? 'E-posta' : 'Email'}
                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                type="email"
                                autoComplete="email"
                                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-normal text-white"
                                placeholder="ada@example.com"
                            />
                        </label>

                        {status === 'error' && (
                            <p className="rounded-lg bg-red-900/30 px-3 py-2 text-sm text-red-300">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-cyan-500 disabled:opacity-60"
                        >
                            {status === 'sending'
                                ? (isTr ? 'Bağlantı gönderiliyor...' : 'Sending link...')
                                : (isTr ? 'Magic Link ile kayıt ol' : 'Sign up with Magic Link')}
                        </button>
                    </form>
                )}

                {errorMessage && status !== 'error' && (
                    <p className="mt-4 rounded-lg bg-red-900/30 px-3 py-2 text-sm text-red-300">{errorMessage}</p>
                )}
            </section>
        </main>
    )
}
