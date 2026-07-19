// Learning OS Faz 1 (Documents/learning-os-redesign-plan.md §5-F1) — dağınık
// localStorage ilerleme anahtarlarının üzerine SALT-OKUNUR adaptör. Migration
// YOKTUR: mevcut anahtarlar (learnqa_xp_*, learnqa_completed_routes, ...) aynen
// kalır, eski sayfalar aynen çalışır; bu modül sadece normalize ederek okur.
//
// TEK yazma istisnası: learnqa_last_position (sekme-derinlikli "Devam et" CTA'sı
// için son konum kaydı — plan §5-F4). Başka hiçbir anahtara yazılmaz.

import { getQueueStats } from './reviewQueue'

const XP_KEY_PREFIX = 'learnqa_xp_'
const COMPLETED_ROUTES_KEY = 'learnqa_completed_routes'
const LAST_POSITION_KEY = 'learnqa_last_position'

// Tüm konuların yerel XP toplamı (learnqa_xp_* anahtarlarının taraması).
export function getTotalXp() {
    let total = 0
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (!key || !key.startsWith(XP_KEY_PREFIX)) continue
            try {
                const parsed = JSON.parse(localStorage.getItem(key))
                if (parsed && typeof parsed.xp === 'number') total += parsed.xp
            } catch { /* bozuk tekil kayıt atlanır */ }
        }
    } catch { /* localStorage kapalı olabilir */ }
    return total
}

// Anonim tamamlanan ders route'ları (AuthContext saveProgress'in yerel kaydı).
export function getCompletedRoutes() {
    try {
        const raw = localStorage.getItem(COMPLETED_ROUTES_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed.filter((r) => typeof r === 'string') : []
    } catch {
        return []
    }
}

// Tekrar kuyruğu istatistiği — reviewQueue'nun üzerinden geçirilir ki dashboard
// tek modülden beslenebilsin.
export function getReviewStats(now = Date.now()) {
    try { return getQueueStats(now) } catch { return { dueCount: 0, totalCount: 0 } }
}

// ── Son konum ("Devam et" derin bağlantısı) ─────────────────────────────────

// Kayıt şeması: { route: '/docker', tabIndex: 3, updatedAt: epoch_ms }
export function readLastPosition() {
    try {
        const raw = localStorage.getItem(LAST_POSITION_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed || typeof parsed.route !== 'string' || !parsed.route.startsWith('/')) return null
        return {
            route: parsed.route,
            tabIndex: Number.isFinite(parsed.tabIndex) ? parsed.tabIndex : 0,
            updatedAt: parsed.updatedAt || 0,
        }
    } catch {
        return null
    }
}

// TopicPage sekme değişiminde çağrılır — bu modülün TEK yazma noktası.
export function saveLastPosition(route, tabIndex) {
    if (typeof route !== 'string' || !route.startsWith('/')) return
    try {
        localStorage.setItem(LAST_POSITION_KEY, JSON.stringify({
            route,
            tabIndex: Number.isFinite(tabIndex) ? tabIndex : 0,
            updatedAt: Date.now(),
        }))
    } catch { /* localStorage kapalı olabilir */ }
}
