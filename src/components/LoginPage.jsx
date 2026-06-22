import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const PROVIDERS = [
    { id: 'google', label: 'Google' },
    { id: 'github', label: 'GitHub' },
    { id: 'azure', label: 'Microsoft' },
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
                    {PROVIDERS.map((provider) => (
                        <button
                            key={provider.id}
                            type="button"
                            onClick={() => handleProvider(provider.id)}
                            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            {provider.label} {isTr ? 'ile devam et' : ''}
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
