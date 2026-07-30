// Kişisel AI Mentor — Katman A: zaman-serili zayıflık tespiti (öğrenme yazısı #5).
// Plan: Documents/learning-science-upgrade-plan.md Bölüm 6 (O1).
//
// getLearningAnalytics() sitenin ANLIK durumunu verir ("şu an en zayıf konu X").
// Mentorun "2 haftadır XPath'te zorlanıyorsun" diyebilmesi için ZAMAN boyutu gerekir.
// Bu modül, günde bir kez küçük bir analitik ÖZETİNİ tarihli bir halka-tampona
// (ring buffer) yazar ve "kaç gündür aynı konu zayıf" bilgisini türetir.
//
// TAMAMEN YEREL / BACKEND YOK / ÜYELİK GEREKMEZ (CLAUDE.md §5, progressStore.js
// ilkesi). Yeni yazılan tek anahtar `learnqa_mentor_snapshots`; başka hiçbir
// mevcut anahtara dokunulmaz — snapshot özeti getLearningAnalytics'ten SALT-OKUNUR
// türetilir. Cihazlar-arası senkron opsiyonel Katman B'de (syncSnapshotsToCloud).

import { getLearningAnalytics } from './progressStore'
import { supabase, isSupabaseConfigured } from './supabaseClient'

export const MENTOR_SNAPSHOTS_KEY = 'learnqa_mentor_snapshots'
export const MENTOR_SNAPSHOTS_MAX = 60 // ~2 ay günlük geçmiş yeter; eskiler düşer
const DAY_MS = 24 * 60 * 60 * 1000

// Bir snapshot'ın hangi güne ait olduğunu UTC gününe göre etiketler — aynı gün
// içinde birden çok kez açılırsa tek snapshot tutulur (üstüne yazılır).
function utcDay(ts) {
    return new Date(ts).toISOString().slice(0, 10)
}

function readSnapshots() {
    try {
        const raw = localStorage.getItem(MENTOR_SNAPSHOTS_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

function writeSnapshots(list) {
    try {
        localStorage.setItem(MENTOR_SNAPSHOTS_KEY, JSON.stringify(list))
    } catch {
        // localStorage kapalı/dolu olabilir — sessizce geç (snapshot en fazla bu oturumda kaybolur).
    }
}

/** Tüm snapshot'ları eskiden yeniye (ts artan) döner. */
export function getSnapshots() {
    return readSnapshots().slice().sort((a, b) => a.ts - b.ts)
}

// getLearningAnalytics() çıktısından KÜÇÜK bir özet üretir — tüm ham veriyi değil,
// mentorun zaman-analizi için gereken minimum alanı saklar (localStorage şişmesin).
function buildSummary(now) {
    let analytics
    try {
        analytics = getLearningAnalytics(now)
    } catch {
        return null
    }
    if (!analytics || !analytics.hasData) return null

    const missed = Array.isArray(analytics.mostMissed)
        ? analytics.mostMissed
            .filter((m) => m && (m.route || m.pageTitle))
            .slice(0, 3)
            .map((m) => ({ route: m.route || null, pageTitle: m.pageTitle || null, wrongCount: m.wrongCount || 0 }))
        : []

    return {
        ts: now,
        day: utcDay(now),
        quizAccuracy: typeof analytics.quizAccuracy === 'number' ? analytics.quizAccuracy : null,
        weakestRoute: analytics.weakest?.route || null,
        weakestMastery: typeof analytics.weakest?.mastery === 'number' ? analytics.weakest.mastery : null,
        missed,
    }
}

/**
 * Günün snapshot'ını kaydeder. Aynı UTC gününde tekrar çağrılırsa var olan kaydı
 * GÜNCELLER (yeni satır açmaz) — böylece "kaç gün" sayımı her gün +1 ilerler,
 * her açılışta değil. Analitik verisi henüz yoksa (hiç quiz denenmemişse) hiçbir
 * şey yazmaz. Kaydedilen (veya güncellenen) özeti döndürür; veri yoksa null.
 */
export function recordSnapshot(now = Date.now()) {
    const summary = buildSummary(now)
    if (!summary) return null

    const list = readSnapshots()
    const today = summary.day
    const existingIndex = list.findIndex((s) => s.day === today)
    if (existingIndex !== -1) {
        list[existingIndex] = summary
    } else {
        list.push(summary)
    }

    // Kapasite taşarsa en eski (ts en küçük) düşer.
    list.sort((a, b) => a.ts - b.ts)
    if (list.length > MENTOR_SNAPSHOTS_MAX) list.splice(0, list.length - MENTOR_SNAPSHOTS_MAX)

    writeSnapshots(list)
    return summary
}

// Bir snapshot'taki "birincil zayıf konu"yu seçer: önce en çok hata yapılan alan
// (mostMissed[0] — yanlış cevaplar en güçlü zorlanma sinyali), yoksa en düşük
// ustalıklı konu (weakest). Hiçbiri yoksa null.
function primaryWeak(snap) {
    if (snap.missed && snap.missed.length && snap.missed[0].route) {
        const m = snap.missed[0]
        return { route: m.route, pageTitle: m.pageTitle || null, wrongCount: m.wrongCount, mastery: snap.weakestMastery }
    }
    if (snap.weakestRoute) {
        return { route: snap.weakestRoute, pageTitle: null, wrongCount: null, mastery: snap.weakestMastery }
    }
    return null
}

/**
 * "Kaç gündür aynı konuda zorlanıyorsun" çekirdeği. En güncel snapshot'ın birincil
 * zayıf konusunu alır, geçmişe doğru AYNI konu zayıf kaldığı sürece yürür ve
 * kesintisiz süreyi ölçer. Mentorun "N gündür X'te takılıyorsun" cümlesini bu besler.
 *
 * Döner: { route, pageTitle, daysStruggling, snapshotsSeen, trend } veya null.
 * - daysStruggling: en eski kesintisiz snapshot ile en güncel arasındaki gün farkı
 *   (aynı gün → 0; "bugün fark ettim" ile "2 haftadır" ayrımını çağıran metin yapar).
 * - trend: 'improving' | 'worsening' | 'stuck' — hata sayısı (yoksa ustalık) eğilimi.
 */
export function getPersistentWeakness(now = Date.now(), windowDays = 30) {
    const snaps = getSnapshots().filter((s) => now - s.ts <= windowDays * DAY_MS)
    if (!snaps.length) return null

    const latest = snaps[snaps.length - 1]
    const latestWeak = primaryWeak(latest)
    if (!latestWeak) return null

    // En güncelden geriye doğru, aynı route zayıf kaldığı sürece topla.
    const consecutive = []
    for (let i = snaps.length - 1; i >= 0; i--) {
        const w = primaryWeak(snaps[i])
        if (w && w.route === latestWeak.route) {
            consecutive.unshift({ snap: snaps[i], weak: w })
        } else {
            break
        }
    }

    const first = consecutive[0]
    const daysStruggling = Math.max(0, Math.round((latest.ts - first.snap.ts) / DAY_MS))

    // Eğilim: hata sayısı azalıyorsa (veya ustalık artıyorsa) iyileşiyor.
    let trend = 'stuck'
    const firstWrong = first.weak.wrongCount
    const lastWrong = latestWeak.wrongCount
    if (typeof firstWrong === 'number' && typeof lastWrong === 'number' && firstWrong !== lastWrong) {
        trend = lastWrong < firstWrong ? 'improving' : 'worsening'
    } else {
        const firstM = first.snap.weakestMastery
        const lastM = latest.weakestMastery
        if (typeof firstM === 'number' && typeof lastM === 'number' && firstM !== lastM) {
            trend = lastM > firstM ? 'improving' : 'worsening'
        }
    }

    return {
        route: latestWeak.route,
        pageTitle: latestWeak.pageTitle,
        wrongCount: latestWeak.wrongCount,
        mastery: latestWeak.mastery,
        daysStruggling,
        snapshotsSeen: consecutive.length,
        trend,
    }
}

// ── Katman B (opsiyonel): cihazlar-arası senkron ────────────────────────────
// AI/senkron katmanı YALNIZCA üye ve Supabase yapılandırılmışsa çalışır (§5).
// Bu fonksiyon backend hazır olmadan çağrılsa bile güvenli: hata sessizce yutulur,
// yerel deneyim hiç bozulmaz. mentor_schema.sql (O3) çalıştırılmadan no-op'tur.

/** Yerel snapshot'ları Supabase'e upsert eder (gün başına tek satır). Üye değilse no-op. */
export async function syncSnapshotsToCloud(session) {
    if (!isSupabaseConfigured || !supabase || !session?.user?.id) return
    const local = getSnapshots()
    if (!local.length) return
    try {
        const rows = local.map((s) => ({
            user_id: session.user.id,
            day: s.day,
            ts: new Date(s.ts).toISOString(),
            payload: s,
        }))
        await supabase.from('mentor_snapshots').upsert(rows, { onConflict: 'user_id,day' })
    } catch (err) {
        // Tablo henüz kurulmamış olabilir (O3 SQL çalıştırılmadıysa) — sessizce geç.
        console.warn('syncSnapshotsToCloud skipped:', err?.message || err)
    }
}
