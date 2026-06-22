import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MessageSquare, X, Send, Lock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { loadComments, submitComment } from '../lib/commentsApi'

function Avatar({ name, avatarUrl, avatarEmoji }) {
    if (avatarEmoji) {
        return (
            <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-slate-700 border border-white/30 text-sm">
                {avatarEmoji}
            </div>
        )
    }
    if (avatarUrl) {
        return <img src={avatarUrl} alt={name} referrerPolicy="no-referrer" className="h-7 w-7 flex-shrink-0 rounded-full object-cover" />
    }
    return (
        <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-indigo-500 text-xs font-bold text-white">
            {(name || '?').trim().charAt(0).toUpperCase()}
        </div>
    )
}

// Sohbet widget'ının (ChatWidget) sağ-üst aynası: her sayfada sabit görünür,
// o anki route'un (pagePath) yorumlarını gösterir — CommentsSection'daki sayfa
// içi blok hâlâ duruyor (SEO/içerik derinliği için), bu sadece scroll etmeden
// hızlı erişim sağlar.
export default function CommentsWidget() {
    const { language } = useLanguage()
    const { session, displayName, avatarUrl, avatarEmoji } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [comments, setComments] = useState([])
    const [draft, setDraft] = useState('')
    const [status, setStatus] = useState('idle') // idle | loading | sending | error
    const listRef = useRef(null)
    const isTr = language === 'tr'
    const pagePath = location.pathname

    useEffect(() => {
        if (!open) return
        let active = true
        setStatus('loading')
        loadComments(pagePath)
            .then((data) => { if (active) { setComments(data); setStatus('idle') } })
            .catch(() => { if (active) setStatus('error') })
        return () => { active = false }
    }, [open, pagePath])

    if (!isSupabaseConfigured) return null

    async function handleSend(e) {
        e.preventDefault()
        const cleaned = draft.trim()
        if (!cleaned) return
        setStatus('sending')
        try {
            await submitComment({ userId: session.user.id, displayName, avatarUrl, avatarEmoji, pagePath, comment: cleaned })
            setDraft('')
            const fresh = await loadComments(pagePath)
            setComments(fresh)
            setStatus('idle')
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="fixed bottom-20 right-4 z-[999] flex flex-col items-end gap-3">
            {open && (
                <div className="flex max-h-[calc(100vh-7rem)] w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-emerald-700/40 bg-slate-900 shadow-2xl">
                    <div className="flex items-center justify-between bg-emerald-600 px-4 py-2.5">
                        <span className="text-sm font-bold text-white">
                            {isTr ? `💬 Yorumlar (${comments.length})` : `💬 Comments (${comments.length})`}
                        </span>
                        <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
                        {status === 'loading' && (
                            <p className="text-center text-xs text-slate-500">{isTr ? 'Yükleniyor…' : 'Loading…'}</p>
                        )}
                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-2 rounded-lg bg-slate-800 px-2.5 py-2">
                                <Avatar name={c.display_name} avatarUrl={c.avatar_url} avatarEmoji={c.avatar_emoji} />
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-xs font-semibold text-emerald-300">
                                            {c.display_name || (isTr ? 'Üye' : 'Member')}
                                        </span>
                                        <span className="text-[10px] text-slate-500">
                                            {new Date(c.created_at).toLocaleDateString(isTr ? 'tr-TR' : 'en-US')}
                                        </span>
                                    </div>
                                    <p className="break-words text-sm text-slate-100">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                        {!comments.length && status === 'idle' && (
                            <p className="text-center text-xs text-slate-500">
                                {isTr ? 'Henüz yorum yok — ilk yorumu sen yaz!' : 'No comments yet — be the first to write one!'}
                            </p>
                        )}
                    </div>

                    {session ? (
                        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-800 p-2.5">
                            <input
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                maxLength={1000}
                                placeholder={isTr ? 'Bu sayfa hakkında ne düşünüyorsun?' : 'What do you think about this page?'}
                                className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                disabled={!draft.trim() || status === 'sending'}
                                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-emerald-600 text-white disabled:opacity-40"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 border-t border-slate-800 px-4 py-3 text-center">
                            <Lock className="text-emerald-400" size={20} />
                            <button
                                onClick={() => navigate('/login')}
                                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
                            >
                                {isTr ? 'Yorum yazmak için üye ol / giriş yap' : 'Sign in to comment'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <span className="group relative">
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    data-testid="comments-widget-toggle"
                    aria-label={isTr ? 'Yorumlar' : 'Comments'}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.5)] transition-transform duration-200 hover:scale-125"
                >
                    {open ? <X size={22} /> : <MessageSquare size={22} />}
                </button>
                {!open && (
                    <span className="pointer-events-none absolute bottom-full right-0 mb-2.5 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
                        {isTr ? '💬 Yorum yazabilirsin!' : '💬 You can leave a comment!'}
                    </span>
                )}
            </span>
        </div>
    )
}
