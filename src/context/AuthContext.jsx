import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(isSupabaseConfigured)

    useEffect(() => {
        if (!isSupabaseConfigured) return

        let active = true

        async function loadProfile(currentSession) {
            if (!currentSession) {
                if (active) setProfile(null)
                return
            }
            const { data, error } = await supabase
                .from('profiles')
                .select('id, display_name, email, avatar_url, avatar_emoji, is_admin, is_premium, premium_until')
                .eq('id', currentSession.user.id)
                .maybeSingle()
            // Bu sorgu sessizce başarısız olursa rol/avatar bilgisi hep boş görünür ve
            // sebebi anlaşılmaz. Hatayı konsola yazıyoruz (örn. PostgREST şema cache'i
            // yeni eklenen bir sütunu henüz tanımıyorsa burada 400/PGRST204 görünür).
            if (error) console.error('profiles select failed:', error)
            if (active) setProfile(data ?? null)
        }

        supabase.auth.getSession().then(({ data }) => {
            if (!active) return
            setSession(data.session)
            loadProfile(data.session).finally(() => active && setLoading(false))
        })

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession)
            loadProfile(nextSession)
        })

        return () => {
            active = false
            subscription.subscription.unsubscribe()
        }
    }, [])

    function getRedirectUrl(next = '/') {
        const safeNext = typeof next === 'string' && next.startsWith('/') ? next : '/'
        return window.location.origin + '/auth/callback?next=' + encodeURIComponent(safeNext)
    }

    async function signInWithProvider(provider, next = '/') {
        if (!isSupabaseConfigured) throw new Error('Supabase yapılandırılmadı (.env.local eksik).')
        const options = { redirectTo: getRedirectUrl(next) }
        // Azure/Microsoft tenant'ları email/profile scope'unu net istemezse bazı hesaplarda email eksik dönebilir.
        if (provider === 'azure') options.scopes = 'openid email profile'
        return supabase.auth.signInWithOAuth({ provider, options })
    }

    function signInWithGoogle(next = '/') {
        return signInWithProvider('google', next)
    }

    async function sendMagicLink({ fullName, email, next = '/' }) {
        if (!isSupabaseConfigured) throw new Error('Supabase yapılandırılmadı (.env.local eksik).')
        const cleanedFullName = fullName.trim().replace(/\s+/g, ' ')
        const cleanedEmail = email.trim().toLowerCase()
        if (cleanedFullName.length < 2) throw new Error('Ad Soyad en az 2 karakter olmalı.')
        if (!cleanedEmail.includes('@')) throw new Error('Geçerli bir e-posta yazmalısın.')

        return supabase.auth.signInWithOtp({
            email: cleanedEmail,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: getRedirectUrl(next),
                data: { full_name: cleanedFullName, display_name: cleanedFullName, signup_method: 'magic_link' },
            },
        })
    }

    async function signOut() {
        if (!isSupabaseConfigured) return
        await supabase.auth.signOut()
    }

    const RESUME_KEY = 'learnqa_resume_point'

    function readLocalResume() {
        try {
            const raw = localStorage.getItem(RESUME_KEY)
            return raw ? JSON.parse(raw) : null
        } catch {
            return null
        }
    }

    // "Kaldığım yeri kaydet" butonu: üye olmayan ziyaretçi için localStorage'a yazar,
    // üye için ayrıca Supabase user_progress'e upsert eder (CLAUDE.md Bölüm 5: progress
    // üyelik şart olmadan da çalışmalı, üyelik sadece senkronizasyon katmanıdır).
    async function saveProgress({ lessonSlug, topicSlug, topicLabel, routePath }) {
        const point = { lessonSlug, topicSlug, topicLabel, routePath, savedAt: new Date().toISOString() }
        try { localStorage.setItem(RESUME_KEY, JSON.stringify(point)) } catch { /* localStorage dolu/kapalı olabilir, sessizce geç */ }

        if (isSupabaseConfigured && session) {
            const { error } = await supabase.from('user_progress').upsert({
                user_id: session.user.id,
                lesson_slug: lessonSlug,
                topic_slug: topicSlug,
                status: 'started',
                last_position: { topicLabel, routePath },
                updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id,lesson_slug,topic_slug' })
            if (error) {
                console.error('saveProgress failed:', error)
                throw error
            }
        }
        return point
    }

    // Ana sayfada "kaldığın yerden devam et" göstermek için: üye ise en son güncellenen
    // Supabase satırını okur, değilse localStorage'daki tek kaydı döner.
    async function getResumePoint() {
        if (isSupabaseConfigured && session) {
            const { data, error } = await supabase
                .from('user_progress')
                .select('lesson_slug, topic_slug, last_position, updated_at')
                .eq('user_id', session.user.id)
                .order('updated_at', { ascending: false })
                .limit(1)
                .maybeSingle()
            if (error) {
                console.error('getResumePoint failed:', error)
            } else if (data) {
                return {
                    lessonSlug: data.lesson_slug,
                    topicSlug: data.topic_slug,
                    topicLabel: data.last_position?.topicLabel,
                    routePath: data.last_position?.routePath,
                    savedAt: data.updated_at,
                }
            }
        }
        return readLocalResume()
    }

    async function setAvatarEmoji(emoji) {
        if (!isSupabaseConfigured || !session) throw new Error('Önce giriş yapmalısın.')
        // profiles satırı (trigger ile) henüz oluşmadıysa update 0 satır günceller ve
        // sessizce "başarılı" görünür; .select() ile geri dönen satırı kontrol ederek bunu yakalıyoruz.
        const { data, error } = await supabase
            .from('profiles')
            .update({ avatar_emoji: emoji })
            .eq('id', session.user.id)
            .select('avatar_emoji')
            .maybeSingle()
        if (error) throw error
        if (!data) throw new Error('Profilin henüz oluşmadı. Sayfayı yenileyip tekrar dene.')
        setProfile((prev) => (prev ? { ...prev, avatar_emoji: emoji } : prev))
    }

    // profiles satırı henüz oluşmadıysa (trigger geç çalıştı veya hiç kurulmadıysa) bile
    // Google/GitHub gibi sağlayıcıların oturum açarken verdiği metadata'dan gerçek
    // isim/avatar gösterilsin — kullanıcı "İsimsiz kullanıcı" gibi boş bir ekran görmesin.
    const authMeta = session?.user?.user_metadata || {}
    const displayName = profile?.display_name
        || profile?.full_name
        || authMeta.full_name
        || authMeta.name
        || (session?.user?.email ? session.user.email.split('@')[0] : null)
    const avatarUrl = profile?.avatar_url || authMeta.avatar_url || authMeta.picture || null
    const avatarEmoji = profile?.avatar_emoji || null
    const email = profile?.email || session?.user?.email || null

    const value = {
        session,
        profile,
        displayName,
        avatarUrl,
        avatarEmoji,
        setAvatarEmoji,
        email,
        loading,
        isAdmin: profile?.is_admin === true,
        isPremium: profile?.is_premium === true,
        isSupabaseConfigured,
        signInWithGoogle,
        signInWithProvider,
        sendMagicLink,
        signOut,
        saveProgress,
        getResumePoint,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
