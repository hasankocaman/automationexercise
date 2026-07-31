// src/utils/careerMapMilestones.js
// Kariyer Haritası Faz 2 — milestone/rozet sistemi
// (Documents/career-map-feature-plan.md §4.3, S3.1). Rozetler MVP'deki ders
// bitirme %80 rozetine (`claimCertificate`) DOKUNMAZ; haritanın ÜZERİNE
// yol-seviyesi bayraklar ekler. Tamamen local-first: mevcut ders tamamlama
// verisini (`getLocalCompletedRoutes`/`completedSet`) okur, KENDİ ilerleme
// state'i TUTMAZ — tek doğruluk kaynağı ilkesi (plan §4.4, CLAUDE.md §23.4).
//
// Plandaki "İlk quizin çözülmesi" gibi ders-içi granülerlik şu an mevcut
// altyapıda YOK (yalnızca route-seviyeli tam tamamlanma izleniyor) — bu yüzden
// "İlk adım" milestone'ı haritanın ilk düğümünün TAMAMLANMASINA bağlanmıştır;
// bu, mevcut anonim/üye ilerleme kaynağıyla tutarlı, dürüst bir sadeleştirmedir.

const STORAGE_KEY = 'learnqa_map_milestones'

const LANG_ROUTES = ['/java', '/python', '/typescript']
const AUTOMATION_ROUTES = ['/selenium', '/playwright']
const API_ROUTES = ['/postman', '/rest-assured']

export const MILESTONE_DEFS = [
    {
        id: 'first-step',
        emoji: '🏁',
        label: { tr: 'İlk adım', en: 'First step' },
        check: ({ nodes, completed }) => Boolean(nodes[0] && completed.has(nodes[0].route)),
    },
    {
        id: 'code-writing-tester',
        emoji: '🏁',
        label: { tr: 'Kod yazan testçi', en: 'Code-writing tester' },
        check: ({ nodes, completed }) => nodes.some((n) => LANG_ROUTES.includes(n.route) && completed.has(n.route)),
    },
    {
        id: 'automator',
        emoji: '🏁',
        label: { tr: 'Otomasyoncu', en: 'Automator' },
        check: ({ nodes, completed }) => nodes.some((n) => AUTOMATION_ROUTES.includes(n.route) && completed.has(n.route)),
    },
    {
        id: 'full-stack-tester',
        emoji: '🏁',
        label: { tr: 'Full-stack tester', en: 'Full-stack tester' },
        check: ({ nodes, completed }) => {
            const apiDone = nodes.some((n) => API_ROUTES.includes(n.route) && completed.has(n.route))
            const sqlDone = nodes.some((n) => n.route === '/sql' && completed.has(n.route))
            return apiDone && sqlDone
        },
    },
    {
        id: 'sdet-path-complete',
        emoji: '🏆',
        label: { tr: 'SDET yolu tamam', en: 'SDET path complete' },
        check: ({ nodes, completed }) => {
            const mainNodes = nodes.filter((n) => n.isMain)
            if (!mainNodes.length) return false
            const done = mainNodes.filter((n) => completed.has(n.route)).length
            return done / mainNodes.length >= 0.8
        },
    },
]

// Verilen düğüm listesi + tamamlanan route seti için o AN kazanılmış olan
// (henüz depoya yazılıp yazılmadığına bakmaksızın) tüm milestone'ları döner.
export function getEarnedMilestones(nodes, completedRoutes) {
    const ctx = { nodes: nodes || [], completed: completedRoutes || new Set() }
    return MILESTONE_DEFS.filter((m) => m.check(ctx))
}

function readEarnedIds() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const arr = raw ? JSON.parse(raw) : []
        return new Set(Array.isArray(arr) ? arr : [])
    } catch {
        return new Set()
    }
}

export function getStoredMilestoneIds() {
    return readEarnedIds()
}

// Yeni kazanılan milestone id'lerini depoya yazar ve SADECE bu çağrıda YENİ
// eklenenleri döner — çağıran taraf bunları konfeti/`trackMapEvent` için
// kullanır, aynı milestone ikinci kez kutlanmaz (xp.js `completed` ilkesiyle
// aynı desen).
export function recordNewMilestones(earnedIds) {
    const stored = readEarnedIds()
    const fresh = earnedIds.filter((id) => !stored.has(id))
    if (fresh.length) {
        const next = new Set([...stored, ...fresh])
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])) } catch { /* localStorage kapalı olabilir */ }
    }
    return fresh
}
