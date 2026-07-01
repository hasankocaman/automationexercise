// src/components/LeaderboardPage.jsx
// Public XP leaderboard — top 10 members, read via the get_leaderboard RPC
// (SECURITY DEFINER) so we never need a broad public RLS policy on profiles.
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import TopicHeader from './TopicHeader'

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const update = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const max = Math.max(1, scrollHeight - clientHeight)
            setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)))
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
    }, [])
    return (
        <div className="fixed left-0 right-0 top-0 z-[9999] h-[3px] bg-transparent">
            <div className="h-full transition-[width] duration-100" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)' }} />
        </div>
    )
}

function useDarkModeState() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        const isDark = saved !== null ? JSON.parse(saved) : true
        document.documentElement.classList.toggle('dark-mode', isDark)
        document.documentElement.classList.toggle('light-mode-forced', !isDark)
        return isDark
    })
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.documentElement.classList.toggle('dark-mode', darkMode)
        document.documentElement.classList.toggle('light-mode-forced', !darkMode)
    }, [darkMode])
    return [darkMode, setDarkMode]
}

const RANK_EMOJI = ['🥇', '🥈', '🥉']

function RankAvatar({ displayName, avatarEmoji, avatarUrl, darkMode }) {
    const initial = (displayName || '?').trim().charAt(0).toUpperCase()
    if (avatarEmoji) {
        return (
            <div className={`grid h-9 w-9 place-items-center rounded-full text-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {avatarEmoji}
            </div>
        )
    }
    if (avatarUrl) {
        return <img src={avatarUrl} alt={displayName || 'avatar'} referrerPolicy="no-referrer" className="h-9 w-9 rounded-full object-cover" />
    }
    return (
        <div className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${darkMode ? 'bg-indigo-900/60 text-indigo-200' : 'bg-indigo-100 text-indigo-700'}`}>
            {initial}
        </div>
    )
}

function LeaderboardPage() {
    const { language } = useLanguage()
    const lang = language
    const [darkMode, setDarkMode] = useDarkModeState()
    const [rows, setRows] = useState([])
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        if (!isSupabaseConfigured) { setStatus('unavailable'); return }
        let cancelled = false
        supabase.rpc('get_leaderboard', { p_limit: 10 }).then(({ data, error }) => {
            if (cancelled) return
            if (error) {
                console.warn('get_leaderboard failed:', error)
                setStatus('error')
                return
            }
            setRows(data ?? [])
            setStatus('ready')
        })
        return () => { cancelled = true }
    }, [])

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-50'}`}>
            <ScrollProgressBar />
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-xl transition-all duration-200 hover:scale-110 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                title="Back to top"
            >
                🏠
            </button>

            <main className="container mx-auto max-w-2xl px-3 py-6 md:px-6 md:py-8">
                <div className="mb-6 text-center">
                    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-3 ${darkMode ? 'bg-purple-900/40 text-purple-200 border border-purple-700' : 'bg-purple-100 text-purple-700 border border-purple-300'}`}>
                        🏆 {lang === 'tr' ? 'XP Liderlik Tablosu' : 'XP Leaderboard'}
                    </div>
                    <h1 className={`text-2xl md:text-3xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {lang === 'tr' ? 'En Çok XP Kazanan 10 Üye' : 'Top 10 Members by XP'}
                    </h1>
                    <p className={`mt-2 text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {lang === 'tr'
                            ? 'Ders tamamlayıp quiz çözerek XP kazan, sıralamada yüksel.'
                            : 'Complete lessons and quizzes to earn XP and climb the ranking.'}
                    </p>
                </div>

                <div className={`rounded-2xl border shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    {status === 'loading' && (
                        <div className={`p-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr' ? 'Yükleniyor...' : 'Loading...'}
                        </div>
                    )}
                    {(status === 'unavailable' || status === 'error') && (
                        <div className={`p-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr' ? 'Liderlik tablosu şu anda yüklenemedi.' : 'Leaderboard could not be loaded right now.'}
                        </div>
                    )}
                    {status === 'ready' && rows.length === 0 && (
                        <div className={`p-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {lang === 'tr' ? 'Henüz kimse XP kazanmadı — ilk sen ol!' : 'Nobody has earned XP yet — be the first!'}
                        </div>
                    )}
                    {status === 'ready' && rows.map((row, index) => (
                        <div
                            key={`${row.display_name}-${index}`}
                            className={`flex items-center gap-3 px-4 py-3 ${index !== rows.length - 1 ? (darkMode ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''}`}
                        >
                            <div className={`w-7 flex-shrink-0 text-center text-sm font-black ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {RANK_EMOJI[index] || index + 1}
                            </div>
                            <RankAvatar displayName={row.display_name} avatarEmoji={row.avatar_emoji} avatarUrl={row.avatar_url} darkMode={darkMode} />
                            <div className={`min-w-0 flex-1 truncate font-semibold text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                {row.display_name || (lang === 'tr' ? 'İsimsiz üye' : 'Unnamed member')}
                            </div>
                            <div className={`flex-shrink-0 text-sm font-black ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
                                {row.xp ?? 0} XP
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default LeaderboardPage
