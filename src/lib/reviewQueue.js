// "Bugünkü Tekrar" — Leitner-lite spaced repetition kuyruğu (fableplan.md WP4).
// Sadece yanlış cevaplanan quiz sorularını hedefler. Backend yok, üyelik gerekmez —
// tamamen localStorage tabanlı, tek anahtar altında saklanan bir JSON dizisi.

export const REVIEW_QUEUE_STORAGE_KEY = 'learnqa_review_queue'
export const REVIEW_QUEUE_MAX_SIZE = 100
export const REVIEW_QUEUE_INTERVALS_DAYS = [1, 3, 7] // streak 0→1: +1 gün, 1→2: +3 gün, 2→3: +7 gün (sonra mezun)
export const REVIEW_QUEUE_GRADUATION_STREAK = 3
export const REVIEW_QUEUE_SESSION_SIZE = 5 // ana sayfa panelinde tek seferde gösterilecek maksimum soru

const DAY_MS = 24 * 60 * 60 * 1000

function readQueue() {
    try {
        const raw = localStorage.getItem(REVIEW_QUEUE_STORAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

function writeQueue(queue) {
    try {
        localStorage.setItem(REVIEW_QUEUE_STORAGE_KEY, JSON.stringify(queue))
    } catch {
        // localStorage kapalı/dolu olabilir — sessizce yok say, kuyruk sadece bu oturum için bellekte kalır.
    }
}

/**
 * Yanlış cevaplanan bir quiz sorusunu kuyruğa ekler. Aynı `id` zaten kuyruktaysa
 * yeni kayıt AÇILMAZ — mevcut kaydın wrongCount'u artar, nextDue yarına çekilir,
 * streak sıfırlanır (kullanıcı bunu daha önce de yanlış yapmış, tekrar unutmuş demektir).
 */
export function addWrongAnswer(record) {
    const now = record.addedAt ?? Date.now()
    const queue = readQueue()
    const existingIndex = queue.findIndex((item) => item.id === record.id)

    if (existingIndex !== -1) {
        const existing = queue[existingIndex]
        queue[existingIndex] = {
            ...existing,
            question: record.question,
            options: record.options,
            correctIndex: record.correctIndex,
            explanation: record.explanation,
            wrongCount: (existing.wrongCount || 0) + 1,
            streak: 0,
            nextDue: now + DAY_MS,
        }
        writeQueue(queue)
        return
    }

    const newRecord = {
        id: record.id,
        route: record.route,
        pageTitle: record.pageTitle,
        question: record.question,
        options: record.options,
        correctIndex: record.correctIndex,
        explanation: record.explanation,
        wrongCount: 1,
        streak: 0,
        nextDue: now + DAY_MS,
        addedAt: now,
    }

    queue.push(newRecord)

    // Kapasite dolduysa en eski (addedAt en küçük) kayıt silinir.
    if (queue.length > REVIEW_QUEUE_MAX_SIZE) {
        queue.sort((a, b) => a.addedAt - b.addedAt)
        queue.splice(0, queue.length - REVIEW_QUEUE_MAX_SIZE)
    }

    writeQueue(queue)
}

/** Şu anda tekrar zamanı gelmiş (nextDue <= now) kayıtları döner, en eski önce. */
export function getDueItems(now = Date.now()) {
    return readQueue()
        .filter((item) => item.nextDue <= now)
        .sort((a, b) => a.nextDue - b.nextDue)
}

/**
 * Bir tekrar denemesinin sonucunu işler. Doğruysa streak artar ve nextDue
 * Leitner aralığına göre ertelenir; streak mezuniyet eşiğine ulaşınca kayıt
 * kuyruktan tamamen silinir. Yanlışsa streak sıfırlanır, nextDue yarına çekilir.
 */
export function recordReviewResult(id, isCorrect, now = Date.now()) {
    const queue = readQueue()
    const index = queue.findIndex((item) => item.id === id)
    if (index === -1) return

    if (!isCorrect) {
        queue[index] = { ...queue[index], streak: 0, wrongCount: (queue[index].wrongCount || 0) + 1, nextDue: now + DAY_MS }
        writeQueue(queue)
        return
    }

    const nextStreak = (queue[index].streak || 0) + 1
    if (nextStreak >= REVIEW_QUEUE_GRADUATION_STREAK) {
        queue.splice(index, 1)
        writeQueue(queue)
        return
    }

    // Kuyruğa giriş anında zaten +1 gün (INTERVALS[0]) uygulanmıştı — bu yüzden
    // streak arttıkça bir SONRAKİ aralık kullanılır: streak 0→1 olunca INTERVALS[1]
    // (3 gün), streak 1→2 olunca INTERVALS[2] (7 gün); streak 2→3 zaten yukarıda mezun eder.
    const intervalDays = REVIEW_QUEUE_INTERVALS_DAYS[nextStreak] ?? REVIEW_QUEUE_INTERVALS_DAYS[REVIEW_QUEUE_INTERVALS_DAYS.length - 1]
    queue[index] = { ...queue[index], streak: nextStreak, nextDue: now + intervalDays * DAY_MS }
    writeQueue(queue)
}

/** Ana sayfa kartı ve basit istatistikler için özet bilgi. */
export function getQueueStats(now = Date.now()) {
    const queue = readQueue()
    return {
        total: queue.length,
        dueCount: queue.filter((item) => item.nextDue <= now).length,
    }
}
