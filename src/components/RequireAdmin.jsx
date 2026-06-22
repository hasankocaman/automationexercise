import { useAuth } from '../context/AuthContext'

function GoogleSignInButton() {
    const { signInWithGoogle } = useAuth()
    return (
        <button
            type="button"
            onClick={() => signInWithGoogle('/backend')}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500"
        >
            Google ile giriş yap
        </button>
    )
}

function SignOutAndRetryButton() {
    const { signOut } = useAuth()
    return (
        <button
            type="button"
            onClick={() => signOut()}
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800"
        >
            Çıkış yap, farklı hesapla dene
        </button>
    )
}

function SignedInAsBadge({ displayName, email, avatarUrl }) {
    if (!email) return null
    return (
        <div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-slate-800/70 px-3 py-2 text-xs text-slate-300">
            {avatarUrl ? (
                <img src={avatarUrl} alt={displayName || email} referrerPolicy="no-referrer" className="h-5 w-5 rounded-full" />
            ) : (
                <span>👤</span>
            )}
            <span>Şu an giriş yapılan hesap: <strong className="text-white">{displayName ? `${displayName} (${email})` : email}</strong></span>
        </div>
    )
}

function BlockedScreen({ reason, displayName, email, avatarUrl, hasSession, action = 'sign-in' }) {
    return (
        <main className="min-h-screen grid place-items-center bg-slate-950 px-4 text-center text-white">
            <section className="max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8">
                <div className="mb-4 text-4xl">🔒</div>
                <h1 className="text-xl font-bold">Bu sayfa sadece admin için</h1>
                <p className="mt-2 text-sm text-slate-400">{reason}</p>
                {hasSession && <div className="mt-4"><SignedInAsBadge displayName={displayName} email={email} avatarUrl={avatarUrl} /></div>}
                <div className="mt-6">
                    {action === 'sign-in' ? <GoogleSignInButton /> : <SignOutAndRetryButton />}
                </div>
            </section>
        </main>
    )
}

export default function RequireAdmin({ children }) {
    const { loading, session, displayName, email, avatarUrl, isAdmin, isSupabaseConfigured } = useAuth()

    if (!isSupabaseConfigured) {
        return <BlockedScreen reason="Supabase yapılandırılmadı (.env.local eksik). Bu sayfa şu an hiç kimseye açılamaz." />
    }
    if (loading) {
        return (
            <main className="min-h-screen grid place-items-center bg-slate-950">
                <div className="h-8 w-8 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
            </main>
        )
    }
    if (!session) {
        return <BlockedScreen reason="Devam etmek için admin Google hesabınla giriş yap." />
    }
    if (!isAdmin) {
        return (
            <BlockedScreen
                reason="Bu hesap admin olarak işaretli değil. Yanlış hesapla girdiysen çıkış yapıp doğru hesapla tekrar dene."
                displayName={displayName}
                email={email}
                avatarUrl={avatarUrl}
                hasSession
                action="sign-out"
            />
        )
    }
    return children
}
