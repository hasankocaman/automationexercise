// src/utils/mapEvents.js
// Kariyer Haritası minimal event ölçümü (career-map-feature-plan.md §9.1).
// Fire-and-forget: ölçüm HİÇBİR koşulda kullanıcı deneyimini bozamaz —
// Supabase konfigüre değilse, tablo yoksa veya insert patlarsa sessizce yutulur.
// Şema: supabase/map_events_schema.sql (SQL Editor'da bir kez elle çalıştırılır).

import { supabase } from '../lib/supabaseClient'

const ANON_ID_KEY = 'learnqa_anon_id'

// Anonim funnel takibi için cihaz başına rastgele kalıcı kimlik (plan §9.1).
// PII içermez; üye eşleşmesi DB tarafında auth.uid() default'uyla yapılır.
function getAnonId() {
    try {
        let id = localStorage.getItem(ANON_ID_KEY)
        if (!id) {
            id = crypto.randomUUID()
            localStorage.setItem(ANON_ID_KEY, id)
        }
        return id
    } catch {
        return 'unknown'
    }
}

export function trackMapEvent(eventName, payload = {}) {
    if (!supabase) return
    try {
        supabase
            .from('map_events')
            .insert({ anon_id: getAnonId(), event_name: eventName, payload })
            .then(() => {}, () => {})
    } catch { /* ölçüm asla akışı kesmez */ }
}
