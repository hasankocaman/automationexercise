// src/utils/careerMapProfile.js
// Kariyer Haritası v2 — sihirbaz profili kalıcılığı, anonim tamamlanan-route kaydı
// ve süre tahmini yardımcıları. CLAUDE.md §5 gereği tümü local-first çalışır:
// üyelik yalnızca senkronizasyon katmanıdır, hiçbir fonksiyon session gerektirmez.

const PROFILE_KEY = 'qaMentorProfile'
const COMPLETED_ROUTES_KEY = 'learnqa_completed_routes'

// Soru seti değişirse bu sürüm artırılır; eski sürümlü profil okunmaz ve
// sihirbaz yeniden sorulur (sessiz bozulma yerine temiz yeniden başlangıç).
export const PROFILE_VERSION = 2

// ─── Profil kalıcılığı ──────────────────────────────────────────────────────

export function readMentorProfile() {
    try {
        const raw = localStorage.getItem(PROFILE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed || parsed.version !== PROFILE_VERSION || !parsed.mapId) return null
        return parsed
    } catch {
        return null
    }
}

export function saveMentorProfile({ answers, mapId, nodes }) {
    // nodes: HomePage kutusunun qaMentorData'yı import etmeden "kaldığın yer"
    // gösterebilmesi için hafif bir görüntü kopyası ({route, title, emoji}).
    const profile = {
        version: PROFILE_VERSION,
        answers: answers || {},
        mapId,
        nodes: (nodes || []).map((n) => ({ route: n.route, title: n.title, emoji: n.emoji })),
        createdAt: new Date().toISOString(),
    }
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)) } catch { /* localStorage kapalı/dolu olabilir */ }
    return profile
}

export function clearMentorProfile() {
    try { localStorage.removeItem(PROFILE_KEY) } catch { /* localStorage kapalı olabilir */ }
}

// ─── Anonim tamamlanan route kaydı ──────────────────────────────────────────
// Üyedeki getCompletedRoutePaths ile aynı bar: bir route'ta en az bir konu
// "completed" işaretlendiyse o route tamamlanmış sayılır.

export function getLocalCompletedRoutes() {
    try {
        const raw = localStorage.getItem(COMPLETED_ROUTES_KEY)
        const arr = raw ? JSON.parse(raw) : []
        return new Set(Array.isArray(arr) ? arr : [])
    } catch {
        return new Set()
    }
}

export function recordLocalCompletedRoute(routePath) {
    if (!routePath) return
    try {
        const set = getLocalCompletedRoutes()
        if (set.has(routePath)) return
        set.add(routePath)
        localStorage.setItem(COMPLETED_ROUTES_KEY, JSON.stringify([...set]))
    } catch { /* localStorage kapalı/dolu olabilir */ }
}

// ─── Süre tahmini yardımcıları ──────────────────────────────────────────────

export function totalEstimatedHours(nodes) {
    return (nodes || []).reduce((sum, n) => sum + (n.estimatedHours || 0), 0)
}

export function weeksForHours(hours, weeklyHours) {
    return Math.max(1, Math.ceil(hours / Math.max(1, weeklyHours || 0)))
}

const MONTH_NAMES = {
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

// Bugünden itibaren verilen hafta sayısı sonrasının "Ay Yıl" etiketi —
// "bu tempoda bitiş: Kasım 2026" gibi somut bir motivasyon çapası üretir.
export function finishMonthLabel(weeks, lang) {
    const target = new Date(Date.now() + weeks * 7 * 24 * 60 * 60 * 1000)
    const names = MONTH_NAMES[lang] || MONTH_NAMES.tr
    return `${names[target.getMonth()]} ${target.getFullYear()}`
}
