import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { AVATAR_EMOJIS } from '../lib/avatarEmojis'

function Avatar({ name, avatarUrl, avatarEmoji, size = 28 }) {
    const initial = (name || '?').trim().charAt(0).toUpperCase()
    if (avatarEmoji) {
        return (
            <div
                style={{ width: size, height: size, fontSize: size * 0.6 }}
                className="grid place-items-center rounded-full bg-slate-700 border border-white/30"
            >
                {avatarEmoji}
            </div>
        )
    }
    if (avatarUrl) {
        return (
            <img
                src={avatarUrl}
                alt={name || 'avatar'}
                referrerPolicy="no-referrer"
                style={{ width: size, height: size }}
                className="rounded-full object-cover border border-white/30"
            />
        )
    }
    return (
        <div
            style={{ width: size, height: size }}
            className="grid place-items-center rounded-full bg-indigo-500 text-xs font-bold text-white border border-white/30"
        >
            {initial}
        </div>
    )
}

export default function AccountMenu({ darkMode }) {
    const { language } = useLanguage()
    const { session, displayName, avatarUrl, avatarEmoji, setAvatarEmoji, email, isAdmin, signOut, earnedBadges } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [pickerOpen, setPickerOpen] = useState(false)
    const [pickerError, setPickerError] = useState('')
    const containerRef = useRef(null)
    const isTr = language === 'tr'

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false)
                setPickerOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!session) {
        return (
            <button
                onClick={() => navigate('/login')}
                data-testid="nav-login"
                className={`px-2 py-1 md:py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
                🔑 <span className="hidden sm:inline">{isTr ? 'Giriş Yap' : 'Sign In'}</span>
            </button>
        )
    }

    const roleLabel = isAdmin ? 'Admin' : (isTr ? 'Üye' : 'Member')
    const roleEmoji = isAdmin ? '👑' : '🎓'
    const nameLabel = displayName || (isTr ? 'Hesabım' : 'My account')

    async function handlePick(emoji) {
        setPickerError('')
        try {
            await setAvatarEmoji(emoji)
            setPickerOpen(false)
        } catch (error) {
            // Konsola da yaz: ekrandaki kısa mesaj yetmezse gerçek Supabase hatasını (kod/detay) burada görürsün.
            console.error('setAvatarEmoji failed:', error)
            setPickerError(
                (error.message || (isTr ? 'Avatar kaydedilemedi.' : 'Could not save avatar.'))
                + (error.code ? ` (${error.code})` : '')
            )
        }
    }

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                data-testid="nav-account"
                className={`flex items-center gap-1.5 px-1.5 py-1 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/20 hover:bg-white/30'}`}
            >
                <Avatar name={nameLabel} avatarUrl={avatarUrl} avatarEmoji={avatarEmoji} />
                <span className="hidden lg:inline text-xs font-semibold text-white max-w-[100px] truncate">
                    {nameLabel}
                </span>
                <span
                    title={roleLabel}
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isAdmin ? 'bg-amber-400 text-amber-950' : 'bg-slate-500 text-white'}`}
                >
                    {roleEmoji} {roleLabel}
                </span>
            </button>

            {open && (
                <div
                    className={`absolute right-0 mt-2 w-64 rounded-xl border shadow-xl z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >
                    <div className="flex items-center gap-3 p-4 border-b border-white/10">
                        <Avatar name={nameLabel} avatarUrl={avatarUrl} avatarEmoji={avatarEmoji} size={40} />
                        <div className="min-w-0">
                            <p className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {nameLabel}
                            </p>
                            <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {email}
                            </p>
                        </div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isAdmin ? 'bg-amber-400 text-amber-950' : 'bg-slate-500 text-white'}`}>
                            {roleEmoji} {isTr ? `Rol: ${roleLabel}` : `Role: ${roleLabel}`}
                        </span>
                        <button
                            onClick={() => { setPickerOpen((prev) => !prev); setPickerError('') }}
                            data-testid="nav-avatar-picker-toggle"
                            className={`text-xs font-semibold underline ${darkMode ? 'text-cyan-300' : 'text-indigo-600'}`}
                        >
                            {isTr ? 'Avatarı değiştir' : 'Change avatar'}
                        </button>
                    </div>

                    {pickerOpen && (
                        <div className="px-4 pb-3">
                            <div className="grid grid-cols-6 gap-1.5">
                                {AVATAR_EMOJIS.map((emoji) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => handlePick(emoji)}
                                        data-testid={`avatar-option-${emoji}`}
                                        className={`text-lg rounded-lg p-1 transition-colors ${avatarEmoji === emoji
                                            ? 'bg-indigo-500/40 ring-2 ring-indigo-400'
                                            : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                            {pickerError && <p className="mt-2 text-xs text-red-400">{pickerError}</p>}
                        </div>
                    )}

                    <div className="px-4 py-3 border-t border-white/10">
                        <div className={`text-xs font-bold mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {isTr ? `Rozetler (${earnedBadges.length})` : `Badges (${earnedBadges.length})`}
                        </div>
                        {earnedBadges.length ? (
                            <div className="flex flex-wrap gap-1.5">
                                {earnedBadges.map((b) => (
                                    <span
                                        key={b.badge_id}
                                        title={b.badges?.description}
                                        className={`inline-flex items-center gap-1 text-xs rounded-full px-2 py-1 ${darkMode ? 'bg-gray-700 text-amber-300' : 'bg-amber-50 text-amber-700'}`}
                                    >
                                        {b.badges?.icon || '🏅'} {b.badges?.title}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {isTr ? 'Henüz rozet yok — bir konuyu tamamla.' : 'No badges yet — finish a topic.'}
                            </p>
                        )}
                    </div>

                    <div className="p-2 border-t border-white/10">
                        <button
                            onClick={() => { setOpen(false); signOut() }}
                            data-testid="nav-signout"
                            className={`w-full text-left text-sm font-semibold px-3 py-2 rounded-lg ${darkMode ? 'text-red-300 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-50'}`}
                        >
                            {isTr ? '🚪 Çıkış Yap' : '🚪 Sign Out'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
