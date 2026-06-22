import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, X, Send, Lock, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { loadRecentMessages, sendChatMessage, subscribeToChat } from '../lib/chatApi'

const SLACK_INVITE_URL = 'https://join.slack.com/t/turkiyetester/shared_invite/zt-41mixupcm-kTkgWHb6~KRUNfstml3fiA'

export default function ChatWidget() {
    const { language } = useLanguage()
    const { session, displayName } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [draft, setDraft] = useState('')
    const [status, setStatus] = useState('idle') // idle | loading | error
    const listRef = useRef(null)
    const isTr = language === 'tr'

    useEffect(() => {
        if (!open || !session) return
        let active = true
        setStatus('loading')
        loadRecentMessages()
            .then((data) => { if (active) { setMessages(data); setStatus('idle') } })
            .catch(() => { if (active) setStatus('error') })

        const unsubscribe = subscribeToChat((row) => {
            setMessages((prev) => [...prev, row])
        })
        return () => { active = false; unsubscribe() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, !!session])

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    }, [messages])

    if (!isSupabaseConfigured) return null

    async function handleSend(e) {
        e.preventDefault()
        const cleaned = draft.trim()
        if (!cleaned) return
        setDraft('')
        try {
            await sendChatMessage({ userId: session.user.id, displayName, message: cleaned })
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="fixed bottom-20 left-4 z-[999] flex flex-col items-start gap-3">
            {open && (
                <div className="flex h-96 w-[20rem] flex-col overflow-hidden rounded-2xl border border-indigo-700/40 bg-slate-900 shadow-2xl">
                    <div className="flex items-center justify-between bg-indigo-600 px-4 py-2.5">
                        <span className="text-sm font-bold text-white">
                            {isTr ? '💬 Üye Sohbeti' : '💬 Member Chat'}
                        </span>
                        <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    <a
                        href={SLACK_INVITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-800/60 px-3 py-2 text-xs font-medium text-indigo-300 hover:bg-slate-800 hover:text-indigo-200"
                    >
                        <ExternalLink size={12} className="flex-shrink-0" />
                        {isTr
                            ? 'Daha uzun ve birebir sohbet için Slack topluluğumuza katıl'
                            : 'For longer, one-on-one chats, join our Slack community'}
                    </a>

                    {session ? (
                        <>
                            <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
                                {status === 'loading' && (
                                    <p className="text-center text-xs text-slate-500">{isTr ? 'Yükleniyor…' : 'Loading…'}</p>
                                )}
                                {messages.map((m) => (
                                    <div key={m.id} className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-100">
                                        <span className="mr-1.5 font-semibold text-indigo-300">{m.display_name || (isTr ? 'Üye' : 'Member')}:</span>
                                        <span className="break-words">{m.message}</span>
                                    </div>
                                ))}
                                {!messages.length && status === 'idle' && (
                                    <p className="text-center text-xs text-slate-500">
                                        {isTr ? 'İlk mesajı sen yaz!' : 'Be the first to say hi!'}
                                    </p>
                                )}
                            </div>
                            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-800 p-2.5">
                                <input
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    maxLength={500}
                                    placeholder={isTr ? 'Bir mesaj yaz…' : 'Type a message…'}
                                    className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!draft.trim()}
                                    className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-indigo-600 text-white disabled:opacity-40"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
                            <Lock className="text-indigo-400" size={28} />
                            <p className="text-sm font-semibold text-white">
                                {isTr ? 'Sohbete katılmak için üye ol' : 'Sign in to join the chat'}
                            </p>
                            <p className="text-xs text-slate-400">
                                {isTr
                                    ? 'Diğer üyelerle anlık sohbet edebilmek için ücretsiz hesap oluştur.'
                                    : 'Create a free account to chat live with other members.'}
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                            >
                                {isTr ? 'Üye Ol / Giriş Yap' : 'Join / Sign In'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={() => setOpen((prev) => !prev)}
                data-testid="chat-widget-toggle"
                title={isTr ? 'Üye sohbeti' : 'Member chat'}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-[0_4px_16px_rgba(79,70,229,0.5)] transition-transform hover:scale-110"
            >
                {open ? <X size={22} /> : <MessageCircle size={22} />}
            </button>
        </div>
    )
}
