import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { loadComments, submitComment } from '../lib/commentsApi'

function Avatar({ name, avatarUrl }) {
    if (avatarUrl) {
        return <img src={avatarUrl} alt={name} referrerPolicy="no-referrer" className="h-8 w-8 rounded-full object-cover" />
    }
    return (
        <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-500 text-xs font-bold text-white">
            {(name || '?').trim().charAt(0).toUpperCase()}
        </div>
    )
}

// Yorumlar herkese açık okunur, sadece üyeler yazabilir (CLAUDE.md: progress/rozet/sohbet/feedback
// üyelik zorunlu değildir kararının sosyal kanıt amaçlı uzantısı — okuma her zaman serbest kalır).
export default function CommentsSection({ pagePath, darkMode = true }) {
    const { language } = useLanguage()
    const { session, displayName, avatarUrl } = useAuth()
    const navigate = useNavigate()
    const [comments, setComments] = useState([])
    const [draft, setDraft] = useState('')
    const [status, setStatus] = useState('loading') // loading | idle | sending | error
    const isTr = language === 'tr'

    useEffect(() => {
        if (!isSupabaseConfigured) { setStatus('idle'); return }
        let active = true
        loadComments(pagePath)
            .then((data) => { if (active) { setComments(data); setStatus('idle') } })
            .catch(() => { if (active) setStatus('error') })
        return () => { active = false }
    }, [pagePath])

    if (!isSupabaseConfigured) return null

    async function handleSubmit(e) {
        e.preventDefault()
        const cleaned = draft.trim()
        if (!cleaned) return
        setStatus('sending')
        try {
            await submitComment({ userId: session.user.id, displayName, avatarUrl, pagePath, comment: cleaned })
            setDraft('')
            const fresh = await loadComments(pagePath)
            setComments(fresh)
            setStatus('idle')
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className={`mt-6 rounded-2xl p-4 md:p-6 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`mb-4 flex items-center gap-2 text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <MessageSquare size={20} />
                {isTr ? `Yorumlar (${comments.length})` : `Comments (${comments.length})`}
            </h3>

            {session ? (
                <form onSubmit={handleSubmit} className="mb-5 flex gap-2">
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        maxLength={1000}
                        rows={2}
                        placeholder={isTr ? 'Bu ders veya uygulama hakkında ne düşünüyorsun?' : 'What do you think about this lesson or the app?'}
                        className={`flex-1 resize-none rounded-lg border px-3 py-2 text-sm ${darkMode ? 'border-gray-700 bg-gray-900 text-white placeholder:text-gray-500' : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400'}`}
                    />
                    <button
                        type="submit"
                        disabled={!draft.trim() || status === 'sending'}
                        className="flex h-fit items-center gap-1.5 self-end rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40"
                    >
                        <Send size={14} />
                        {isTr ? 'Gönder' : 'Send'}
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => navigate('/login')}
                    className={`mb-5 w-full rounded-lg border px-3 py-2.5 text-left text-sm font-semibold ${darkMode ? 'border-indigo-700/50 bg-indigo-900/30 text-indigo-200 hover:bg-indigo-900/50' : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
                >
                    {isTr ? '🔑 Yorum yazmak için üye ol / giriş yap' : '🔑 Sign in to leave a comment'}
                </button>
            )}

            {status === 'error' && (
                <p className="mb-3 text-xs text-red-400">{isTr ? 'Bir şeyler ters gitti, tekrar dene.' : 'Something went wrong, try again.'}</p>
            )}

            <div className="space-y-3">
                {comments.map((c) => (
                    <div key={c.id} className="flex gap-2.5">
                        <Avatar name={c.display_name} avatarUrl={c.avatar_url} />
                        <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                                <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {c.display_name || (isTr ? 'Üye' : 'Member')}
                                </span>
                                <span className={`text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {new Date(c.created_at).toLocaleDateString(isTr ? 'tr-TR' : 'en-US')}
                                </span>
                            </div>
                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{c.comment}</p>
                        </div>
                    </div>
                ))}
                {!comments.length && status === 'idle' && (
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {isTr ? 'Henüz yorum yok — ilk yorumu sen yaz!' : 'No comments yet — be the first to write one!'}
                    </p>
                )}
            </div>
        </div>
    )
}
