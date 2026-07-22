// src/lib/socialProof.js
// Ambient sosyal kanıt (retention-and-motivation-plan.md Aşama C) — "bu dersi
// X kişi bitirdi" sayacı. mapEvents.js'teki fire-and-forget, asla akışı
// bloklamayan/hata göstermeyen kalıp BİREBİR taklit edilir: RPC yoksa (henüz
// supabase/social_proof_schema.sql çalıştırılmadıysa), Supabase konfigüre
// değilse veya sorgu hata verirse sessizce null döner — çağıran taraf bu
// durumda sayacı hiç göstermez.

import { supabase } from './supabaseClient'

export async function getLessonCompletionCount(route) {
    if (!supabase || typeof route !== 'string') return null
    try {
        const { data, error } = await supabase.rpc('get_lesson_completion_count', { p_route: route })
        if (error || typeof data !== 'number') return null
        return data
    } catch {
        return null
    }
}
