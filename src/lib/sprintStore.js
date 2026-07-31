// QA Sprint Simulator (Documents/sprint-simulator-and-open-items-plan.md, Faz 1) —
// PANO DURUMU deposu. Tamamen local-first, backend YOK.
//
// TEK DOĞRULUK NOKTASI İLKESİ (plan §2.2): bir bug'ın "bitti" bilgisi BURADA
// TUTULMAZ. Bug'ın görevi (`mission`) tamamlandığında `MissionBlock` zaten
// `xp.js` → `markExerciseComplete(mission.id)` çağırır; pano da "bitti mi?"
// sorusunu oradan türetir. İkinci bir tamamlanma state'i tutmak, iki deponun
// kaçınılmaz olarak birbirinden kayması demekti (CLAUDE.md §23.4 "drift" dersi).
//
// Bu depo yalnızca panonun KENDİ durumunu tutar:
//   - pulled: kullanıcının bilinçli olarak "Sprint'e al" dediği bug id'leri
//             (Backlog → In Progress geçişi; Kanban hissinin çekirdeği)
//   - closed: kapanış töreni oynatılmış sprint id'leri (bonus XP bir kez verilsin)
//
// Depo: tek localStorage anahtarı `learnqa_sprint_board`.

import { getCompletedExercises } from './xp'

const STORAGE_KEY = 'learnqa_sprint_board'
const BOARD_EVENT = 'learnqa-sprint-board'

function readState() {
    if (typeof localStorage === 'undefined') return { pulled: [], closed: [] }
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            return {
                pulled: Array.isArray(parsed.pulled) ? parsed.pulled : [],
                closed: Array.isArray(parsed.closed) ? parsed.closed : [],
            }
        }
    } catch { /* bozuk veri → varsayılana düş */ }
    return { pulled: [], closed: [] }
}

function writeState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* localStorage kapalı olabilir */ }
    if (typeof window !== 'undefined') window.dispatchEvent(new Event(BOARD_EVENT))
}

// ─── Bug durumu ──────────────────────────────────────────────────────────────

// Bir bug'ın panodaki kolonu: 'backlog' | 'progress' | 'done'.
// 'done' kararı xp.js'ten TÜRETİLİR (bkz. yukarıdaki tek-doğruluk notu).
export function getBugStatus(bug) {
    const missionId = bug?.mission?.id
    if (missionId && getCompletedExercises().includes(missionId)) return 'done'
    if (bug?.id && readState().pulled.includes(bug.id)) return 'progress'
    return 'backlog'
}

// "Sprint'e al" — bug'ı Backlog'dan In Progress'e çeker. Zaten çekilmişse no-op.
export function pullBugIntoSprint(bugId) {
    if (!bugId) return false
    const state = readState()
    if (state.pulled.includes(bugId)) return false
    writeState({ ...state, pulled: [...state.pulled, bugId] })
    return true
}

// ─── Sprint durumu ───────────────────────────────────────────────────────────

// Sprint'in tüm bug'ları bitti mi? (Kapatma düğmesinin ön koşulu.)
export function isSprintComplete(sprint) {
    const bugs = Array.isArray(sprint?.bugs) ? sprint.bugs : []
    if (!bugs.length) return false
    const completed = getCompletedExercises()
    return bugs.every((bug) => bug?.mission?.id && completed.includes(bug.mission.id))
}

export function isSprintClosed(sprintId) {
    if (!sprintId) return false
    return readState().closed.includes(sprintId)
}

// Kapanış töreni. Bonus XP'yi ÇAĞIRAN verir (bu depo XP'ye dokunmaz) — burada
// yalnızca "tören oynadı" işareti tutulur ki F5 sonrası konfeti tekrar patlamasın
// ve bonus ikinci kez eklenmesin. Yeni kapatma ise true, zaten kapalıysa false.
export function closeSprint(sprintId) {
    if (!sprintId) return false
    const state = readState()
    if (state.closed.includes(sprintId)) return false
    writeState({ ...state, closed: [...state.closed, sprintId] })
    return true
}

// Panonun ilerleme özeti — başlıktaki sayaç için.
export function getSprintProgress(sprint) {
    const bugs = Array.isArray(sprint?.bugs) ? sprint.bugs : []
    const done = bugs.filter((bug) => getBugStatus(bug) === 'done').length
    return { done, total: bugs.length, percent: bugs.length ? Math.round((done / bugs.length) * 100) : 0 }
}

export function subscribeToSprintBoard(callback) {
    if (typeof window === 'undefined') return () => {}
    window.addEventListener(BOARD_EVENT, callback)
    return () => window.removeEventListener(BOARD_EVENT, callback)
}
