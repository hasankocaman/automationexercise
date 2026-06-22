import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

export default function AuthCallback() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [message, setMessage] = useState('Giriş doğrulanıyor...')

    useEffect(() => {
        let alive = true

        async function finishAuth() {
            if (!isSupabaseConfigured) {
                setMessage('Supabase yapılandırılmadı (.env.local eksik).')
                return
            }
            try {
                const code = searchParams.get('code')
                const rawNext = searchParams.get('next') || '/'
                const safeNext = rawNext.startsWith('/') ? rawNext : '/'

                if (code) {
                    const { error } = await supabase.auth.exchangeCodeForSession(code)
                    if (error) throw error
                }

                const { data, error } = await supabase.auth.getSession()
                if (error) throw error
                if (!data.session) throw new Error('Session bulunamadı. Link süresi dolmuş olabilir.')

                if (alive) navigate(safeNext, { replace: true })
            } catch (error) {
                if (alive) setMessage(error.message || 'Giriş tamamlanamadı.')
            }
        }

        finishAuth()
        return () => { alive = false }
    }, [navigate, searchParams])

    return (
        <main className="min-h-screen grid place-items-center bg-slate-950 text-white px-4">
            <section className="w-full max-w-md rounded-xl border border-cyan-800 bg-slate-900 p-6 text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-cyan-400/20 grid place-items-center">🔐</div>
                <h1 className="text-xl font-bold">LearnQA.dev Auth</h1>
                <p className="mt-3 text-sm text-slate-300">{message}</p>
            </section>
        </main>
    )
}
