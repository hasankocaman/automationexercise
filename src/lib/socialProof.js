// src/lib/socialProof.js
// Ambient sosyal kanıt (retention-and-motivation-plan.md Aşama C + C.2) — "bu
// dersi X kişi bitirdi" sayacı. mapEvents.js'teki fire-and-forget, asla akışı
// bloklamayan/hata göstermeyen kalıp BİREBİR taklit edilir: RPC yoksa (henüz
// supabase/social_proof_schema.sql çalıştırılmadıysa), Supabase konfigüre
// değilse veya sorgu hata verirse sessizce null döner — çağıran taraf bu
// durumda sayacı hiç göstermez.

import { supabase } from './supabaseClient'

// Küçük sayılar motive etmez, tam tersi izlenim verir — sayaç bu eşiğin
// altında hiç gösterilmez.
export const SOCIAL_PROOF_MIN_COUNT = 5
// Zaman bazlı ("son 7 günde N kişi") pencere — tüm-zamanlar sayısından daha
// canlı/güncel hissettirir (momentum sinyali).
export const SOCIAL_PROOF_WINDOW_DAYS = 7

export async function getLessonCompletionCount(route, windowDays = null) {
    if (!supabase || typeof route !== 'string') return null
    try {
        const { data, error } = await supabase.rpc('get_lesson_completion_count', {
            p_route: route,
            p_window_days: windowDays,
        })
        if (error || typeof data !== 'number') return null
        return data
    } catch {
        return null
    }
}

// Önce haftalık (son SOCIAL_PROOF_WINDOW_DAYS gün) sayıyı dener — eşiği
// geçerse "daha canlı" haftalık sayı gösterilir. Haftalık sayı düşük trafikli
// bir ders için eşiğin altında kalırsa (haftalık pencere doğası gereği
// tüm-zamanlar toplamından küçüktür), tüm-zamanlar sayısına SESSİZCE düşülür
// — eksik/zayıf veri asla "göstermeme" ile aynı anlama gelmez, sadece daha
// geniş bir pencereye bakılır (progressStore.js::getMastery'deki "eksik
// bileşen dışlanır" ilkesiyle aynı ruh).
export async function getLessonSocialProof(route) {
    const weekly = await getLessonCompletionCount(route, SOCIAL_PROOF_WINDOW_DAYS)
    if (typeof weekly === 'number' && weekly >= SOCIAL_PROOF_MIN_COUNT) {
        return { count: weekly, windowDays: SOCIAL_PROOF_WINDOW_DAYS }
    }
    const allTime = await getLessonCompletionCount(route, null)
    if (typeof allTime === 'number' && allTime >= SOCIAL_PROOF_MIN_COUNT) {
        return { count: allTime, windowDays: null }
    }
    return null
}
