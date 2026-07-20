// Learning OS Faz 1 (Documents/learning-os-redesign-plan.md §5-F1) — dağınık
// localStorage ilerleme anahtarlarının üzerine SALT-OKUNUR adaptör. Migration
// YOKTUR: mevcut anahtarlar (learnqa_xp_*, learnqa_completed_routes, ...) aynen
// kalır, eski sayfalar aynen çalışır; bu modül sadece normalize ederek okur.
//
// Yazma istisnaları (sadece ikisi): learnqa_last_position (sekme-derinlikli
// "Devam et" CTA'sı — plan §5-F4) ve learnqa_interview_scores (mülakat AI
// puan ortalaması — plan §6/F7, job readiness formülü için gerekli; önceden
// hiçbir yerde kalıcı tutulmuyordu, InterviewPracticeBlock'un `avg`'ı sadece
// React state'inde yaşıyordu). Başka hiçbir anahtara yazılmaz.

import { getQueueStats } from './reviewQueue'
import { MASTERY_MANIFEST } from '../data/generated/masteryManifest'

const XP_KEY_PREFIX = 'learnqa_xp_'
const COMPLETED_ROUTES_KEY = 'learnqa_completed_routes'
const LAST_POSITION_KEY = 'learnqa_last_position'
const INTERVIEW_SCORES_KEY = 'learnqa_interview_scores'

// Mastery formülündeki bileşen ağırlıkları (toplamı 100 — bir bileşenin verisi
// yoksa o bileşen devre dışı kalır ve kalanlar kendi aralarında yeniden
// normalize edilir, bkz. getMastery). Plan §6/F7'deki tasarım kararı.
const MASTERY_WEIGHTS = {
  quizPrecision: 45,   // denenen sorularda doğru oranı (correct / attempted)
  quizCoverage: 20,    // sayfadaki TÜM quiz bloklarının ne kadarı denendi
  exerciseCoverage: 20, // sayfadaki TÜM egzersiz bloklarının ne kadarı bitti
  interview: 15,       // mülakat AI puan ortalaması
}

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

function readJsonObject(key) {
    try {
        const raw = localStorage.getItem(key)
        const parsed = raw ? JSON.parse(raw) : null
        return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
        return {}
    }
}

// ── Mülakat AI puanı (learnqa_interview_scores) ─────────────────────────────
// Şema: { [route]: { avgPercent: 0-100, gradedAt: epoch_ms } }. Sayfa başına
// TEK kayıt tutulur — mülakat pratiği tekrar yapılırsa üzerine yazılır (en
// güncel yeterlilik esas alınır, geçmiş denemelerin ortalaması değil).

export function recordInterviewMastery(route, avgPercent) {
    if (typeof route !== 'string' || !route.startsWith('/')) return
    if (typeof avgPercent !== 'number' || Number.isNaN(avgPercent)) return
    try {
        const all = readJsonObject(INTERVIEW_SCORES_KEY)
        all[route] = { avgPercent: Math.round(avgPercent), gradedAt: Date.now() }
        localStorage.setItem(INTERVIEW_SCORES_KEY, JSON.stringify(all))
    } catch { /* localStorage kapalı olabilir */ }
}

export function getInterviewStats(route) {
    const entry = readJsonObject(INTERVIEW_SCORES_KEY)[route]
    if (!entry || typeof entry.avgPercent !== 'number') return null
    return { avgPercent: entry.avgPercent, gradedAt: entry.gradedAt || 0 }
}

// ── Mastery (0-100, konu ustalık skoru) ─────────────────────────────────────
// Plan §6/F7: quiz doğruluğu (ilk deneme ağırlıklı DEĞİL — mevcut şema
// `quizScore_${pageKey}`/`quizAttempted_${pageKey}` yalnızca "şu an doğru mu"
// tutar, "ilk denemede mi doğruydu" ayrımını tutmaz; bu bilinçli bir
// basitleştirmedir, bkz. plan dokümanındaki not) + sayfa kapsamının ne kadarı
// denendi/bitti (MASTERY_MANIFEST'teki build-time toplamlarına göre) + mülakat
// AI puanı. Herhangi bir bileşenin verisi yoksa (örn. kullanıcı mülakat
// sekmesine hiç gelmediyse) o bileşen dışlanır ve kalan bileşenler kendi
// ağırlıklarına göre yeniden normalize edilir — eksik veri asla 0 gibi
// cezalandırılmaz.
export function getMastery(route) {
    const manifest = MASTERY_MANIFEST[route]
    if (!manifest) return null

    const { pageKey } = manifest
    const attemptedByTab = readJsonObject(`quizAttempted_${pageKey}`)
    const correctByTab = readJsonObject(`quizScore_${pageKey}`)
    let attempted = 0
    let correct = 0
    for (const tab of Object.keys(attemptedByTab)) attempted += Object.keys(attemptedByTab[tab] || {}).length
    for (const tab of Object.keys(correctByTab)) correct += Object.keys(correctByTab[tab] || {}).length

    let exerciseCompleted = 0
    try {
        const raw = localStorage.getItem(`learnqa_xp_${pageKey}`)
        const parsed = raw ? JSON.parse(raw) : null
        exerciseCompleted = Array.isArray(parsed?.completed) ? parsed.completed.length : 0
    } catch { /* localStorage kapalı olabilir */ }

    const interview = getInterviewStats(route)

    const components = []
    if (attempted > 0) components.push({ weight: MASTERY_WEIGHTS.quizPrecision, value: (correct / attempted) * 100 })
    if (manifest.totalQuizBlocks > 0) {
        components.push({ weight: MASTERY_WEIGHTS.quizCoverage, value: Math.min(100, (attempted / manifest.totalQuizBlocks) * 100) })
    }
    if (manifest.totalExerciseBlocks > 0) {
        components.push({ weight: MASTERY_WEIGHTS.exerciseCoverage, value: Math.min(100, (exerciseCompleted / manifest.totalExerciseBlocks) * 100) })
    }
    if (interview) components.push({ weight: MASTERY_WEIGHTS.interview, value: interview.avgPercent })

    if (components.length === 0) return null // hiç etkileşim yok — "başlanmadı"

    const totalWeight = components.reduce((sum, c) => sum + c.weight, 0)
    const score = components.reduce((sum, c) => sum + c.weight * c.value, 0) / totalWeight
    return Math.round(score)
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
