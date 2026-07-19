// Learning OS Faz 1 (Documents/learning-os-redesign-plan.md §5-F1) — günlük
// aktivite kaydı + streak/grace çekirdeği. Tamamen local-first, üyelik gerekmez
// (CLAUDE.md §5). React'sız saf fonksiyonlar; tüm localStorage erişimi try/catch.
//
// Tasarım ilkesi: günlük hedef SADECE gerçek öğrenme birimlerinden dolar
// (cevaplanan quiz + İLK kez tamamlanan egzersiz) — pasif okuma/scroll sayılmaz,
// aynı birim iki kez sayılmaz (countedIds ile tekilleştirme).

const ACTIVITY_LOG_KEY = 'learnqa_activity_log'
const ACTIVITY_EVENT = 'learnqa-activity-changed'

// Ayar eşikleri — ileride kalibrasyon kolaylığı için named const (plan §5-F1).
export const DAILY_GOAL_UNITS = 10 // günlük hedef: toplam birim
export const QUIZ_UNIT = 1 // cevaplanan her quiz (doğru ya da yanlış) 1 birim
export const EXERCISE_UNIT = 2 // ilk kez tamamlanan playground/challenge/film 2 birim
export const MAX_LOG_DAYS = 400 // bundan eski gün kayıtları temizlenir
export const MAX_COUNTED_IDS = 4000 // tekilleştirme listesi kapasitesi (FIFO)

const DAY_MS = 24 * 60 * 60 * 1000

// Yerel takvim gününü YYYY-MM-DD üretir (UTC değil — kullanıcının günü esas).
function dayKey(ts) {
    const d = new Date(ts)
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const g = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${m}-${g}`
}

// Gün ortası (12:00) zaman damgası — geriye doğru DAY_MS adımlarında saat
// kaymalarının takvim günü atlatmaması için çıpa noktası.
function noonOf(ts) {
    const d = new Date(ts)
    d.setHours(12, 0, 0, 0)
    return d.getTime()
}

function emptyLog() {
    return {
        version: 1,
        days: {}, // 'YYYY-MM-DD' -> { quizzes, exercises, xp, goalMet, goalEventSent }
        countedIds: [], // 'quiz:<id>' | 'exercise:<id>' — çifte sayım koruması
        lastKnownStreak: 0, // rezerv alan: streak_broken event karşılaştırması (plan §8.2-S5)
    }
}

function readLog() {
    try {
        const raw = localStorage.getItem(ACTIVITY_LOG_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            return {
                ...emptyLog(),
                ...parsed,
                days: parsed.days && typeof parsed.days === 'object' ? parsed.days : {},
                countedIds: Array.isArray(parsed.countedIds) ? parsed.countedIds : [],
            }
        }
    } catch { /* bozuk kayıt — boş log ile devam */ }
    return emptyLog()
}

function writeLog(log) {
    try { localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log)) } catch { /* localStorage kapalı olabilir */ }
    if (typeof window !== 'undefined') window.dispatchEvent(new Event(ACTIVITY_EVENT))
}

// MAX_LOG_DAYS'ten eski gün kayıtlarını siler (her yazımda çağrılır).
function pruneOldDays(log, now) {
    const cutoff = dayKey(now - MAX_LOG_DAYS * DAY_MS)
    for (const key of Object.keys(log.days)) {
        if (key < cutoff) delete log.days[key]
    }
    if (log.countedIds.length > MAX_COUNTED_IDS) {
        log.countedIds = log.countedIds.slice(log.countedIds.length - MAX_COUNTED_IDS)
    }
    return log
}

function emptyDay() {
    return { quizzes: 0, exercises: 0, xp: 0, goalMet: false, goalEventSent: false }
}

// Bir günün toplam birimi: quiz*1 + egzersiz*2.
function dayUnits(day) {
    if (!day) return 0
    return (day.quizzes || 0) * QUIZ_UNIT + (day.exercises || 0) * EXERCISE_UNIT
}

// Ana yazma noktası. kind: 'quiz' | 'exercise'; id sayfa+blok düzeyinde benzersiz
// olmalı (örn. 'docker:0:3'). Aynı id ikinci kez gelirse SAYILMAZ (çifte sayım
// koruması — XP'nin `completed` listesiyle aynı ilke). Sayıldıysa true döner.
export function logActivity(kind, id, now = Date.now()) {
    if (kind !== 'quiz' && kind !== 'exercise') return false
    if (!id) return false
    const log = readLog()
    const countKey = `${kind}:${id}`
    if (log.countedIds.includes(countKey)) return false
    log.countedIds.push(countKey)

    const key = dayKey(now)
    const day = { ...emptyDay(), ...(log.days[key] || {}) }
    if (kind === 'quiz') day.quizzes += 1
    else day.exercises += 1
    if (dayUnits(day) >= DAILY_GOAL_UNITS) day.goalMet = true
    log.days[key] = day

    writeLog(pruneOldDays(log, now))
    return true
}

// Kazanılan XP'yi günün istatistiğine ekler — birim DEĞİLDİR, hedefi doldurmaz;
// sadece istatistik/heatmap zenginliği için tutulur.
export function logXpEarned(amount, now = Date.now()) {
    if (typeof amount !== 'number' || amount <= 0) return
    const log = readLog()
    const key = dayKey(now)
    const day = { ...emptyDay(), ...(log.days[key] || {}) }
    day.xp += amount
    log.days[key] = day
    writeLog(pruneOldDays(log, now))
}

// Bugünün hedef durumu: { units, goal, met }.
export function getDailyGoalProgress(now = Date.now()) {
    const log = readLog()
    const units = dayUnits(log.days[dayKey(now)])
    return { units, goal: DAILY_GOAL_UNITS, met: units >= DAILY_GOAL_UNITS }
}

// Heatmap verisi: son n günün [{ date, units, xp }] listesi, eskiden yeniye.
export function getLastNDays(n, now = Date.now()) {
    const log = readLog()
    const result = []
    const anchor = noonOf(now)
    for (let i = n - 1; i >= 0; i--) {
        const key = dayKey(anchor - i * DAY_MS)
        const day = log.days[key]
        result.push({ date: key, units: dayUnits(day), xp: (day && day.xp) || 0 })
    }
    return result
}

// Streak (grace kurallı — plan §4 öneri 3): ardışık hedefli günler.
// - Bugün hedefli → normal sayım.
// - Bugün boş ama DÜN hedefli → streak korunur, frozen: true (❄️ — "bugün
//   çalışırsan devam eder" mesajı için).
// - 2+ gün boşluk → streak 0.
// Sayım geriye giderken aradaki TEK günlük boşluklar köprülenir; 2 gün üst
// üste boşluk zinciri koparır.
export function getStreak(now = Date.now()) {
    const log = readLog()
    const met = (key) => dayUnits(log.days[key]) >= DAILY_GOAL_UNITS
    const anchor = noonOf(now)

    let cursor
    let frozen
    if (met(dayKey(anchor))) {
        cursor = anchor
        frozen = false
    } else if (met(dayKey(anchor - DAY_MS))) {
        cursor = anchor - DAY_MS
        frozen = true
    } else {
        return { streak: 0, frozen: false }
    }

    let streak = 0
    let guard = 0
    while (guard++ < MAX_LOG_DAYS) {
        if (met(dayKey(cursor))) {
            streak += 1
            cursor -= DAY_MS
        } else if (met(dayKey(cursor - DAY_MS))) {
            cursor -= DAY_MS // tek günlük boşluk köprülenir (grace)
        } else {
            break
        }
    }
    return { streak, frozen }
}

// Kaba istatistik — Faz 2 mastery/dashboard genişlemesi için hazır uç.
export function getActivityStats(now = Date.now()) {
    const log = readLog()
    let totalQuizzes = 0
    let totalExercises = 0
    let totalXp = 0
    let activeDays = 0
    for (const day of Object.values(log.days)) {
        totalQuizzes += day.quizzes || 0
        totalExercises += day.exercises || 0
        totalXp += day.xp || 0
        if (dayUnits(day) > 0) activeDays += 1
    }
    return { totalQuizzes, totalExercises, totalXp, activeDays, today: getDailyGoalProgress(now), streak: getStreak(now) }
}

// Dashboard'un canlı güncellenmesi gerekirse (aynı sekmede) abone olunur.
export function subscribeToActivityChanges(callback) {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener(ACTIVITY_EVENT, callback)
    return () => window.removeEventListener(ACTIVITY_EVENT, callback)
}
