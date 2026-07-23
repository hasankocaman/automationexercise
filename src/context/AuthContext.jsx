import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { recordLocalCompletedRoute } from '../utils/careerMapProfile'

const AuthContext = createContext()

// Kariyer haritasında bir route'un GERÇEKTEN tamamlandığını işaretlemek için
// ayrılmış sentinel topic_slug. Gerçek bir sekme/ders topicSlug'ı ile ASLA
// çakışmaz (tab index'leri ve lesson.id'ler bu formatta olamaz) — bkz.
// markRouteFullyCompleted / getCompletedRoutePaths.
const ROUTE_COMPLETE_TOPIC_SLUG = '__route_complete__'

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(isSupabaseConfigured)
    const [earnedBadges, setEarnedBadges] = useState([])

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
                .select('id, display_name, email, avatar_url, avatar_emoji, is_admin, is_premium, premium_until, career_goal, xp')
                .eq('id', currentSession.user.id)
                .maybeSingle()
            // Bu sorgu sessizce başarısız olursa rol/avatar bilgisi hep boş görünür ve
            // sebebi anlaşılmaz. Hatayı konsola yazıyoruz (örn. PostgREST şema cache'i
            // yeni eklenen bir sütunu henüz tanımıyorsa burada 400/PGRST204 görünür).
            if (error) console.error('profiles select failed:', error)
            if (active) setProfile(data ?? null)
        }

        async function loadBadges(currentSession) {
            if (!currentSession) {
                if (active) setEarnedBadges([])
                return
            }
            const { data, error } = await supabase
                .from('user_badges')
                .select('badge_id, awarded_at, badges(title, icon, description)')
                .eq('user_id', currentSession.user.id)
            if (error) console.error('user_badges select failed:', error)
            if (active) setEarnedBadges(data ?? [])
        }

        supabase.auth.getSession().then(({ data }) => {
            if (!active) return
            setSession(data.session)
            loadProfile(data.session).finally(() => active && setLoading(false))
            loadBadges(data.session)
        })

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession)
            loadProfile(nextSession)
            loadBadges(nextSession)
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

    const RESUME_KEY = 'learnqa_resume_point'

    // Üye çıkış yapınca local resume noktasını da temizler — yoksa hesaba bağlı
    // son konum, çıkış yapıldıktan sonra hâlâ "kaldığın yerden devam et" olarak
    // görünür (ve aynı tarayıcıyı kullanan farklı biri başkasının ilerlemesini görebilir).
    async function signOut() {
        try { localStorage.removeItem(RESUME_KEY) } catch { /* localStorage kapalı olabilir */ }
        if (!isSupabaseConfigured) return
        await supabase.auth.signOut()
    }

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
    async function saveProgress({ lessonSlug, topicSlug, topicLabel, routePath, status = 'started' }) {
        const point = { lessonSlug, topicSlug, topicLabel, routePath, savedAt: new Date().toISOString() }
        try { localStorage.setItem(RESUME_KEY, JSON.stringify(point)) } catch { /* localStorage dolu/kapalı olabilir, sessizce geç */ }

        // NOT: burada route'u Kariyer Haritasında "tamamlandı" işaretlemiyoruz —
        // bu fonksiyon TEK bir sekme/ders için çağrılır, route'un TAMAMI bitti
        // anlamına gelmez. Route'un tamamı bitince ayrıca markRouteFullyCompleted
        // çağrılmalı (gerçek kullanıcı bug raporu, 2026-07-23: eskiden ilk sekme
        // bitince tüm route yanlışlıkla "tamamlandı" görünüyordu).

        if (isSupabaseConfigured && session) {
            const row = {
                user_id: session.user.id,
                lesson_slug: lessonSlug,
                topic_slug: topicSlug,
                status,
                last_position: { topicLabel, routePath },
                updated_at: new Date().toISOString(),
            }
            if (status === 'completed') row.completed_at = new Date().toISOString()
            const { error } = await supabase
                .from('user_progress')
                .upsert(row, { onConflict: 'user_id,lesson_slug,topic_slug' })
            if (error) {
                console.error('saveProgress failed:', error)
                throw error
            }
        }
        return point
    }

    // AC07 "Reset" akışı: kullanıcı bir sayfanın mülakat sorularında %80 barajını
    // geçemezse, sayfadaki TÜM sekmelerin user_progress satırlarını siler (hard-reset).
    // RLS'de "users delete own progress" policy'si (auth.uid() = user_id) gerekiyor —
    // bkz. NEXT_SESSION.md, kullanıcı bu SQL'i learnqa-test + learnqa-prod'da çalıştırmalı.
    async function resetLessonProgress(lessonSlug) {
        if (!isSupabaseConfigured || !session) return
        const { error } = await supabase
            .from('user_progress')
            .delete()
            .eq('user_id', session.user.id)
            .eq('lesson_slug', lessonSlug)
        if (error) { console.error('resetLessonProgress failed:', error); throw error }
    }

    const LESSON_XP = 10

    // Bir ders/quiz tamamlandığında XP ekler. RPC sunucu tarafında auth.uid()===user_id
    // kontrolü yapar (SECURITY DEFINER) — kullanıcı kendi XP'sinden fazlasını isteyemez.
    async function awardXp(amount) {
        if (!isSupabaseConfigured || !session) return 0
        const { data, error } = await supabase.rpc('increment_user_xp', { user_id: session.user.id, amount })
        if (error) { console.error('increment_user_xp failed:', error); return 0 }
        setProfile((prev) => (prev ? { ...prev, xp: data } : prev))
        return amount
    }

    // Bir konuyu "tamamlandı" işaretlemek + XP + rozet kazanma kontrolü. Sadece üyeler
    // için gerçek XP/rozet satırı oluşturur; anonim kullanıcı için sadece progress kaydı
    // (yukarıdaki saveProgress zaten anonim de çalışır).
    async function markTopicCompleted({ lessonSlug, topicSlug, topicLabel, routePath }) {
        await saveProgress({ lessonSlug, topicSlug, topicLabel, routePath, status: 'completed' })
        if (!isSupabaseConfigured || !session) return { badges: [], xpAwarded: 0 }

        const xpAwarded = await awardXp(LESSON_XP)

        const { count, error: countError } = await supabase
            .from('user_progress')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', session.user.id)
            .eq('status', 'completed')
            // markRouteFullyCompleted'in yazdığı sentinel satır GERÇEK bir konu
            // değildir — rozet eşiğini şişirmemek için sayıma dahil edilmez.
            .neq('topic_slug', ROUTE_COMPLETE_TOPIC_SLUG)
        if (countError) {
            console.error('markTopicCompleted count failed:', countError)
            return { badges: [], xpAwarded }
        }

        const { data: badgeCatalog, error: catalogError } = await supabase
            .from('badges')
            .select('id, title, icon, description, required_completed_topics')
        if (catalogError) {
            console.error('badges select failed:', catalogError)
            return { badges: [], xpAwarded }
        }

        const eligibleBadgeIds = (badgeCatalog ?? [])
            .filter((badge) => (count ?? 0) >= badge.required_completed_topics)
            .map((badge) => badge.id)
        if (!eligibleBadgeIds.length) return { badges: [], xpAwarded }

        const { data: newlyAwarded, error: awardError } = await supabase
            .from('user_badges')
            .upsert(
                eligibleBadgeIds.map((badgeId) => ({ user_id: session.user.id, badge_id: badgeId })),
                { onConflict: 'user_id,badge_id', ignoreDuplicates: true }
            )
            .select('badge_id, awarded_at, badges(title, icon, description)')
        if (awardError) {
            console.error('user_badges upsert failed:', awardError)
            return { badges: [], xpAwarded }
        }

        setEarnedBadges((prev) => {
            const existingIds = new Set(prev.map((b) => b.badge_id))
            const merged = [...prev, ...(newlyAwarded ?? []).filter((b) => !existingIds.has(b.badge_id))]
            return merged
        })
        return { badges: newlyAwarded ?? [], xpAwarded }
    }

    // Kariyer Haritasında bir route'un (sayfanın) TAMAMEN tamamlandığını işaretler.
    // ÇAĞIRAN TARAF (TopicPage/AlgorithmsPage/ManualTestingPage) bunu SADECE
    // sayfadaki TÜM sekmeler/dersler bitince çağırmalı — tek bir sekme bitince
    // DEĞİL. Gerçek kullanıcı bug raporu (2026-07-23): önceden markTopicCompleted
    // her sekme/ders için çağrıldığında saveProgress otomatik olarak
    // recordLocalCompletedRoute çağırıyordu, bu yüzden İLK sekme bitince tüm
    // route (dolayısıyla /qa-mentor yol haritasında tüm ders) yanlışlıkla
    // "tamamlandı" görünüyordu. Bu fonksiyon saveProgress'i sentinel bir
    // topic_slug ile çağırır — markTopicCompleted'in aksine XP/rozet VERMEZ
    // (bunlar zaten her gerçek sekme/ders tamamlandığında ayrıca veriliyor).
    async function markRouteFullyCompleted({ lessonSlug, routePath }) {
        recordLocalCompletedRoute(routePath)
        await saveProgress({ lessonSlug, topicSlug: ROUTE_COMPLETE_TOPIC_SLUG, topicLabel: null, routePath, status: 'completed' })
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

    // QA Mentor yol haritası seçimini üye profilinde kalıcı kılar (cihazlar arası
    // senkron). Anonim kullanıcının kalıcılığı localStorage'daki qaMentorProfile ile
    // sağlanır (careerMapProfile.js) — üyelik senkron katmanıdır, ön koşul değil (§5).
    async function setCareerGoal(goalId) {
        if (!isSupabaseConfigured || !session) return
        const { data, error } = await supabase
            .from('profiles')
            .update({ career_goal: goalId })
            .eq('id', session.user.id)
            .select('career_goal')
            .maybeSingle()
        if (error) { console.error('setCareerGoal failed:', error); return }
        if (data) setProfile((prev) => (prev ? { ...prev, career_goal: data.career_goal } : prev))
    }

    // Bir yol haritasındaki tamamlanma yüzdesini hesaplamak için, üyenin TÜM
    // sekmelerini/derslerini bitirdiği route'ları okur. SADECE markRouteFullyCompleted'in
    // yazdığı sentinel satırları sayar — tek bir sekme/ders completed olması
    // YETMEZ (gerçek kullanıcı bug raporu, 2026-07-23: bkz. markRouteFullyCompleted).
    async function getCompletedRoutePaths() {
        if (!isSupabaseConfigured || !session) return new Set()
        const { data, error } = await supabase
            .from('user_progress')
            .select('last_position')
            .eq('user_id', session.user.id)
            .eq('status', 'completed')
            .eq('topic_slug', ROUTE_COMPLETE_TOPIC_SLUG)
        if (error) { console.error('getCompletedRoutePaths failed:', error); return new Set() }
        return new Set((data ?? []).map((row) => row.last_position?.routePath).filter(Boolean))
    }

    // user_progress.updated_at'teki aktif günleri analiz ederek ardışık giriş gün
    // sayısını hesaplar. Bugün henüz hiçbir aktivite yoksa (ör. henüz giriş yaptı ama
    // ders bitirmedi) dünden devam eden bir seri varsa onu hâlâ canlı sayar — gece
    // yarısı geçince seri sıfırlanmış gibi görünmesin diye.
    async function getStreak() {
        if (!isSupabaseConfigured || !session) return 0
        const { data, error } = await supabase
            .from('user_progress')
            .select('updated_at')
            .eq('user_id', session.user.id)
        if (error) { console.error('getStreak failed:', error); return 0 }

        const activeDates = new Set((data ?? []).map((row) => new Date(row.updated_at).toISOString().slice(0, 10)))
        if (!activeDates.size) return 0

        const dayMs = 24 * 60 * 60 * 1000
        const today = new Date()
        today.setUTCHours(0, 0, 0, 0)

        let cursor = activeDates.has(today.toISOString().slice(0, 10))
            ? today
            : new Date(today.getTime() - dayMs)
        if (!activeDates.has(cursor.toISOString().slice(0, 10))) return 0

        let streak = 0
        while (activeDates.has(cursor.toISOString().slice(0, 10))) {
            streak += 1
            cursor = new Date(cursor.getTime() - dayMs)
        }
        return streak
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

    // Bir yol haritası %100 tamamlanınca QAMentorPage bunu çağırır. unique(user_id,
    // career_goal) + ignoreDuplicates sayesinde aynı haritayı tekrar tamamlasa (veya
    // efekt iki kez çalışsa) bile sertifika çoğalmaz, var olan satırın id'si döner.
    async function claimCertificate(careerGoal) {
        if (!isSupabaseConfigured || !session) return null
        const { data, error } = await supabase
            .from('certificates')
            .upsert(
                { user_id: session.user.id, career_goal: careerGoal, display_name: displayName },
                { onConflict: 'user_id,career_goal', ignoreDuplicates: true }
            )
            .select('id')
            .maybeSingle()
        if (error) { console.error('claimCertificate failed:', error); return null }
        if (data) return data.id

        const { data: existing, error: fetchError } = await supabase
            .from('certificates')
            .select('id')
            .eq('user_id', session.user.id)
            .eq('career_goal', careerGoal)
            .maybeSingle()
        if (fetchError) { console.error('claimCertificate fetch failed:', fetchError); return null }
        return existing?.id ?? null
    }

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
        markTopicCompleted,
        markRouteFullyCompleted,
        resetLessonProgress,
        getResumePoint,
        earnedBadges,
        careerGoal: profile?.career_goal || null,
        setCareerGoal,
        getCompletedRoutePaths,
        xp: profile?.xp ?? 0,
        awardXp,
        getStreak,
        claimCertificate,
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
