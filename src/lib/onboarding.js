// src/lib/onboarding.js
// İlk ziyaretçi "hoş geldin turu" durumu (retention-and-motivation-plan.md
// §6.4 Aşama E.3). Local-first, üyelik gerekmez (CLAUDE.md §5/§7) — tek bir
// localStorage bayrağı, saf fonksiyonlar.

const ONBOARDING_SEEN_KEY = 'learnqa_onboarding_seen'

export function hasSeenOnboarding() {
    try {
        return localStorage.getItem(ONBOARDING_SEEN_KEY) === 'true'
    } catch {
        return true // localStorage kapalıysa turu göstermeye ısrar etme
    }
}

export function markOnboardingSeen() {
    try {
        localStorage.setItem(ONBOARDING_SEEN_KEY, 'true')
    } catch { /* localStorage kapalı olabilir, sessizce yok say */ }
}
