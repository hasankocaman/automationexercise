// Challenge-first deneyim (Documents/challenge-first-experience-plan.md, Phase 1) —
// BECERİ SİNYALİ deposu. Tamamen local-first, backend YOK.
//
// Amaç: yazının 4. gözlemi ("beceri ilerlemesi tamamlanan DERSLERDEN değil,
// gerçekten ÇÖZÜLEN challenge'lardan beslenmeli"). `mission` (görev zinciri)
// bloğu bir görev tamamlandığında burada bir sinyal biriktirir. Phase 3'te
// SkillRadar bu sinyalleri okuyup radarı GERÇEK çözülen görevlerden besleyecek;
// şimdilik yalnızca toplar (yan etkisiz, salt-ekleme).
//
// Depo: tek localStorage anahtarı `learnqa_skill_signals` → { signals: [...] }.
// Her sinyal: { missionId, route, skill, ts }. Aynı missionId yalnızca BİR kez
// sayılır (görevi tekrar açmak beceriyi şişirmesin — xp.js `completed` ilkesiyle
// aynı mantık).

const STORAGE_KEY = 'learnqa_skill_signals'
const SIGNAL_EVENT = 'learnqa-skill-signal'
const MAX_SIGNALS = 400 // halka-tampon üst sınırı (localStorage şişmesin)

function readState() {
    if (typeof localStorage === 'undefined') return { signals: [] }
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            return { signals: Array.isArray(parsed.signals) ? parsed.signals : [] }
        }
    } catch { /* bozuk veri → varsayılana düş */ }
    return { signals: [] }
}

function writeState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* localStorage yoksa atla */ }
    if (typeof window !== 'undefined') window.dispatchEvent(new Event(SIGNAL_EVENT))
}

// Geçerli sayfanın route segmentini döndürür (xp.js ile aynı kalıp), route
// açıkça verilmediyse kullanılır.
function currentRoute() {
    if (typeof window === 'undefined') return ''
    const seg = window.location.pathname.split('/').filter(Boolean)[0]
    return seg ? `/${seg.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}` : ''
}

// Bir görev (mission) tamamlanınca çağrılır. Aynı missionId ikinci kez sinyal
// üretmez (görevi tekrar oynamak beceriyi çifte saymaz). Yeni bir sinyal
// eklendiyse true, zaten kayıtlıysa false döner.
export function recordSkillSignal({ missionId, route, skill } = {}) {
    if (!missionId) return false
    const state = readState()
    if (state.signals.some((s) => s.missionId === missionId)) return false
    const signal = {
        missionId,
        route: route || currentRoute(),
        skill: skill || route || currentRoute(),
        ts: Date.now(),
    }
    const next = [...state.signals, signal].slice(-MAX_SIGNALS)
    writeState({ signals: next })
    return true
}

// Tüm ham sinyaller (en eskiden en yeniye).
export function getSkillSignals() {
    return readState().signals
}

// Route (beceri alanı) başına çözülen görev sayısı → { '/selenium': 3, ... }.
// Phase 3'te SkillRadar'ı beslemek için hazır agregasyon.
export function getSkillSignalCounts() {
    const counts = {}
    for (const s of readState().signals) {
        const key = s.skill || s.route
        if (!key) continue
        counts[key] = (counts[key] || 0) + 1
    }
    return counts
}

// Belirli bir görev daha önce tamamlandı mı (MissionBlock'un "zaten bitti"
// rozetini göstermesi için).
export function hasSkillSignal(missionId) {
    if (!missionId) return false
    return readState().signals.some((s) => s.missionId === missionId)
}

export function subscribeToSkillSignals(callback) {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener(SIGNAL_EVENT, callback)
    return () => window.removeEventListener(SIGNAL_EVENT, callback)
}
