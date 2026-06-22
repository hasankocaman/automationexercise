import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Genel oturum koruması: /backend gibi admin rotaları ve ileride eklenecek
// gerçek premium-only rotalar için kullanılır. CLAUDE.md Bölüm 5 gereği
// normal ders sayfaları (Selenium/Python/Java vb.) bu bileşenle SARILMAZ —
// onlar login olmadan da açık kalmalıdır; progress/rozet zaten anonim çalışır.
export default function ProtectedRoute({ children }) {
    const { loading, session } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <main className="min-h-screen grid place-items-center bg-slate-950">
                <div className="h-8 w-8 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
            </main>
        )
    }

    if (!session) {
        const next = encodeURIComponent(location.pathname + location.search)
        return <Navigate to={`/login?next=${next}`} replace />
    }

    return children
}
