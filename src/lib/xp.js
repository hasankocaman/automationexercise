// Shared local-first XP pool for lesson pages — used by both
// ManualTestingLabBlock (bug reports) and CodePlaygroundBlock / ChallengeBlock
// code exercises so XP earned inside the same lesson counts towards one total.
//
// One localStorage key per topic: { xp, completed }. `completed` tracks exercise
// ids that already paid out XP, so re-running/re-fixing the same exercise
// doesn't earn XP twice.

import { logActivity, logXpEarned } from './activityLog'

const XP_EVENT = 'learnqa-xp-changed'
const LEGACY_LAB_KEY = 'manual_testing_lab_python'

function getTopicKey() {
    if (typeof window === 'undefined') return 'python'
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0]
    return (firstSegment || 'python').replace(/[^a-z0-9-]/gi, '-').toLowerCase()
}

function getStorageKey() {
    return `learnqa_xp_${getTopicKey()}`
}

function readState() {
    try {
        const raw = localStorage.getItem(getStorageKey())
        if (raw) {
            const parsed = JSON.parse(raw)
            return {
                xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
                completed: Array.isArray(parsed.completed) ? parsed.completed : [],
            }
        }
    } catch { /* fall through to default */ }
    return { xp: 0, completed: [] }
}

function writeState(state) {
    try { localStorage.setItem(getStorageKey(), JSON.stringify(state)) } catch { /* localStorage unavailable, skip persistence */ }
    if (typeof window !== 'undefined') window.dispatchEvent(new Event(XP_EVENT))
}

// One-time migration: earlier builds stored XP inside the Manual Testing
// Lab's own blob. Seed the shared pool from it once so existing local
// progress isn't silently lost when this module takes over.
function migrateLegacyXpOnce() {
    if (typeof localStorage === 'undefined') return
    if (getTopicKey() !== 'python') return
    if (localStorage.getItem(getStorageKey()) !== null) return
    try {
        const legacyRaw = localStorage.getItem(LEGACY_LAB_KEY)
        if (!legacyRaw) return
        const legacy = JSON.parse(legacyRaw)
        if (typeof legacy.xp === 'number' && legacy.xp > 0) {
            writeState({ xp: legacy.xp, completed: [] })
        }
    } catch { /* ignore malformed legacy data */ }
}

export function getXP() {
    migrateLegacyXpOnce()
    return readState().xp
}

export function addXP(amount) {
    const state = readState()
    const next = Math.max(0, state.xp + amount)
    writeState({ ...state, xp: next })
    // Günlük istatistik (Learning OS Faz 1) — birim değil, hedef doldurmaz.
    if (amount > 0) logXpEarned(amount)
    return next
}

export function getCompletedExercises() {
    return readState().completed
}

export function markExerciseComplete(id) {
    const state = readState()
    if (state.completed.includes(id)) return state.completed
    const next = [...state.completed, id]
    writeState({ ...state, completed: next })
    // Günlük hedef (Learning OS Faz 1): egzersiz yalnız İLK tamamlanmada
    // sayılır — yukarıdaki `completed` kontrolü çifte sayımı zaten engeller.
    logActivity('exercise', `${getTopicKey()}:${id}`)
    return next
}

// Lets multiple simultaneously-mounted blocks (e.g. two playground exercises
// on the same tab) stay in sync when XP changes in one of them.
export function subscribeToXpChanges(callback) {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener(XP_EVENT, callback)
    return () => window.removeEventListener(XP_EVENT, callback)
}
