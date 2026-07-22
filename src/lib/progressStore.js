// Learning OS Faz 1 (Documents/learning-os-redesign-plan.md §5-F1) — dağınık
// localStorage ilerleme anahtarlarının üzerine SALT-OKUNUR adaptör. Migration
// YOKTUR: mevcut anahtarlar (learnqa_xp_*, learnqa_completed_routes, ...) aynen
// kalır, eski sayfalar aynen çalışır; bu modül sadece normalize ederek okur.
//
// Yazma istisnaları (sadece ikisi): learnqa_last_position (sekme-derinlikli
// "Devam et" CTA'sı — plan §5-F4) ve learnqa_interview_scores (mülakat AI
// puan ortalaması — plan §6/F7, job readiness formülü için gerekli; önceden
// hiçbir yerde kalıcı tutulmuyordu, InterviewPracticeBlock'un `avg`'ı sadece
// React state'inde yaşıyordu). Başka hiçbir anahtara yazılmaz.

import { getQueueStats } from './reviewQueue'
import { MASTERY_MANIFEST } from '../data/generated/masteryManifest'

const XP_KEY_PREFIX = 'learnqa_xp_'
const COMPLETED_ROUTES_KEY = 'learnqa_completed_routes'
const LAST_POSITION_KEY = 'learnqa_last_position'
const INTERVIEW_SCORES_KEY = 'learnqa_interview_scores'

// Mastery formülündeki bileşen ağırlıkları (toplamı 100 — bir bileşenin verisi
// yoksa o bileşen devre dışı kalır ve kalanlar kendi aralarında yeniden
// normalize edilir, bkz. getMastery). Plan §6/F7'deki tasarım kararı.
//
// v2 (2026-07-20, kullanıcı bildirimi): İlk sürümde "quizCoverage" (kaç quiz
// DENENDİ) ve "exerciseCoverage" (kaç egzersiz İLK KEZ bitirildi) ayrı ayrı
// ölçülüyordu — ama sitenin KENDİ "sekme tamamlandı" tanımı sadece bir
// sekmedeki quizlerin %60'ını doğru cevaplamayı ister, o sekmedeki HER
// egzersizi çalıştırmayı ZORUNLU KILMAZ. Sonuç: kullanıcı sayfanın TÜM
// sekmelerini (6/6) tamamladığı halde, hiç code-playground çalıştırmadıysa
// exerciseCoverage=0 kalıyor ve mastery yanlışlıkla %76'da kilitleniyordu —
// "bitirdim" dediği bir sayfada "bitirmedin" gibi görünen bir çelişki.
// Düzeltme: exerciseCoverage/quizCoverage yerine `tabCompletion` — sitenin
// HER YERDE gösterdiği "X/Y sekme tamamlandı" ile BİREBİR aynı sinyal
// (bkz. getCompletedTabCount). Sekmelerin TAMAMI bitince mastery de %100'e
// ulaşabilir; egzersiz/quiz denemesi ayrı bir "derinlik" metriği olarak
// zorunlu tutulmuyor (isteğe bağlı pratik hâlâ quizPrecision'ı iyileştirir).
const MASTERY_WEIGHTS = {
  quizPrecision: 45,  // denenen sorularda doğru oranı (correct / attempted)
  tabCompletion: 35,  // sayfadaki sekmelerin kaçı GERÇEKTEN tamamlandı (X/Y)
  interview: 20,      // mülakat AI puan ortalaması
}

// Tüm konuların yerel XP toplamı (learnqa_xp_* anahtarlarının taraması).
export function getTotalXp() {
    let total = 0
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (!key || !key.startsWith(XP_KEY_PREFIX)) continue
            try {
                const parsed = JSON.parse(localStorage.getItem(key))
                if (parsed && typeof parsed.xp === 'number') total += parsed.xp
            } catch { /* bozuk tekil kayıt atlanır */ }
        }
    } catch { /* localStorage kapalı olabilir */ }
    return total
}

// Anonim tamamlanan ders route'ları (AuthContext saveProgress'in yerel kaydı).
export function getCompletedRoutes() {
    try {
        const raw = localStorage.getItem(COMPLETED_ROUTES_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed.filter((r) => typeof r === 'string') : []
    } catch {
        return []
    }
}

// Tekrar kuyruğu istatistiği — reviewQueue'nun üzerinden geçirilir ki dashboard
// tek modülden beslenebilsin.
export function getReviewStats(now = Date.now()) {
    try { return getQueueStats(now) } catch { return { dueCount: 0, totalCount: 0 } }
}

function readJsonObject(key) {
    try {
        const raw = localStorage.getItem(key)
        const parsed = raw ? JSON.parse(raw) : null
        return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
        return {}
    }
}

// ── Mülakat AI puanı (learnqa_interview_scores) ─────────────────────────────
// Şema: { [route]: { avgPercent: 0-100, gradedAt: epoch_ms } }. Sayfa başına
// TEK kayıt tutulur — mülakat pratiği tekrar yapılırsa üzerine yazılır (en
// güncel yeterlilik esas alınır, geçmiş denemelerin ortalaması değil).

export function recordInterviewMastery(route, avgPercent) {
    if (typeof route !== 'string' || !route.startsWith('/')) return
    if (typeof avgPercent !== 'number' || Number.isNaN(avgPercent)) return
    try {
        const all = readJsonObject(INTERVIEW_SCORES_KEY)
        all[route] = { avgPercent: Math.round(avgPercent), gradedAt: Date.now() }
        localStorage.setItem(INTERVIEW_SCORES_KEY, JSON.stringify(all))
    } catch { /* localStorage kapalı olabilir */ }
}

export function getInterviewStats(route) {
    const entry = readJsonObject(INTERVIEW_SCORES_KEY)[route]
    if (!entry || typeof entry.avgPercent !== 'number') return null
    return { avgPercent: entry.avgPercent, gradedAt: entry.gradedAt || 0 }
}

// ── Mastery (0-100, konu ustalık skoru) ─────────────────────────────────────
// Plan §6/F7: quiz doğruluğu (ilk deneme ağırlıklı DEĞİL — mevcut şema
// `quizScore_${pageKey}`/`quizAttempted_${pageKey}` yalnızca "şu an doğru mu"
// tutar, "ilk denemede mi doğruydu" ayrımını tutmaz; bu bilinçli bir
// basitleştirmedir, bkz. plan dokümanındaki not) + sayfa kapsamının ne kadarı
// denendi/bitti (MASTERY_MANIFEST'teki build-time toplamlarına göre) + mülakat
// AI puanı. Herhangi bir bileşenin verisi yoksa (örn. kullanıcı mülakat
// sekmesine hiç gelmediyse) o bileşen dışlanır ve kalan bileşenler kendi
// ağırlıklarına göre yeniden normalize edilir — eksik veri asla 0 gibi
// cezalandırılmaz.
// Bir sayfada GERÇEKTEN tamamlanmış (quiz %60 eşiği veya elle işaretleme —
// bkz. TopicPage.jsx markTabAsVerifiedComplete/toggleTabComplete) sekme
// sayısı. `progress_<pageKey>` (completedTabs) VE `quizProgress_<pageKey>`
// (quizVerifiedTabs) BİRLİKTE kontrol edilir çünkü TopicPage.jsx'teki
// `isCompleted` kontrolü de ikisinin OR'udur — sadece birine bakmak bazı
// tamamlanmış sekmeleri kaçırır.
function getCompletedTabCount(pageKey) {
    const completed = readJsonObject(`progress_${pageKey}`)
    const quizVerified = readJsonObject(`quizProgress_${pageKey}`)
    const allKeys = new Set([...Object.keys(completed), ...Object.keys(quizVerified)])
    let count = 0
    for (const key of allKeys) {
        if (completed[key] || quizVerified[key]) count++
    }
    return count
}

export function getMastery(route) {
    const manifest = MASTERY_MANIFEST[route]
    if (!manifest) return null

    const { pageKey } = manifest
    const attemptedByTab = readJsonObject(`quizAttempted_${pageKey}`)
    const correctByTab = readJsonObject(`quizScore_${pageKey}`)
    let attempted = 0
    let correct = 0
    for (const tab of Object.keys(attemptedByTab)) attempted += Object.keys(attemptedByTab[tab] || {}).length
    for (const tab of Object.keys(correctByTab)) correct += Object.keys(correctByTab[tab] || {}).length

    const completedTabCount = getCompletedTabCount(pageKey)
    const interview = getInterviewStats(route)

    // "Hiç ziyaret edilmemiş" durumunu AYRI bir kapı ile yakalamak gerekir,
    // yoksa hiç dokunulmamış her sayfa yanlışlıkla "%0 mastery" (gerçek bir
    // başarısızlık gibi) döner, "başlanmadı" değil. En az bir GERÇEK sinyal
    // (quiz denemesi, tamamlanmış sekme veya mülakat puanı) yoksa null döner.
    const hasAnySignal = attempted > 0 || completedTabCount > 0 || interview !== null
    if (!hasAnySignal) return null // sayfa hiç ziyaret edilmemiş/denenmemiş

    const components = []
    if (attempted > 0) components.push({ weight: MASTERY_WEIGHTS.quizPrecision, value: (correct / attempted) * 100 })
    if (manifest.tabCount > 0) {
        components.push({ weight: MASTERY_WEIGHTS.tabCompletion, value: Math.min(100, (completedTabCount / manifest.tabCount) * 100) })
    }
    if (interview) components.push({ weight: MASTERY_WEIGHTS.interview, value: interview.avgPercent })

    const totalWeight = components.reduce((sum, c) => sum + c.weight, 0)
    const score = components.reduce((sum, c) => sum + c.weight * c.value, 0) / totalWeight
    return Math.round(score)
}

// ── Skill Radar (plan §6.2/F8) ──────────────────────────────────────────────
// Route→kategori eşlemesi elle tutulur (qaMentorData.js'in kariyer haritası
// node şemasına yeni bir alan eklemek yerine) — o dosya bambaşka bir amaca
// (kişiselleştirilmiş yol haritası) hizmet ediyor, ustalık kategorisi ayrı bir
// sınıflandırma ekseni.
export const SKILL_CATEGORIES = [
    {
        id: 'ui-automation',
        label: { tr: 'UI Otomasyon', en: 'UI Automation' },
        routes: ['/selenium', '/playwright', '/cypress', '/appium', '/browserstack', '/gauge'],
    },
    {
        id: 'api-backend',
        label: { tr: 'API/Backend', en: 'API/Backend' },
        routes: ['/postman', '/bruno', '/rest-assured', '/kafka'],
    },
    {
        id: 'languages',
        label: { tr: 'Diller', en: 'Languages' },
        routes: ['/python', '/typescript', '/javascript', '/java'],
    },
    {
        id: 'ci-infra',
        label: { tr: 'CI/CD', en: 'CI/CD' },
        routes: ['/docker', '/jenkins', '/kubernetes', '/aws', '/azure'],
    },
    {
        id: 'sql-data',
        label: { tr: 'SQL & Veri', en: 'SQL & Data' },
        routes: ['/sql'],
    },
    {
        id: 'foundations',
        label: { tr: 'Temel', en: 'Basics' },
        routes: ['/what-is-testing', '/git-github', '/linux'],
    },
]

// Her eksen için: routeFilter verilmişse (örn. kullanıcının kişisel kariyer
// haritasındaki route'lar) SADECE o kesişimin ortalaması alınır — böylece
// radar, kullanıcının hiç ilgilenmediği (haritasında olmayan) teknolojilerden
// etkilenmez. Kategoride hiç mastery verisi yoksa value `null` döner (0 DEĞİL
// — "veri yok" ile "gerçekten zayıf" ayrımı UI'da korunmalı).
export function getSkillRadarData(routeFilter = null) {
    return SKILL_CATEGORIES.map((cat) => {
        const routes = routeFilter ? cat.routes.filter((r) => routeFilter.includes(r)) : cat.routes
        const scores = routes.map((r) => getMastery(r)).filter((v) => typeof v === 'number')
        const value = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
        return { id: cat.id, label: cat.label, value, sampleSize: scores.length, routeCount: cat.routes.length }
    })
}

// ── Job Readiness (plan §6.3/F9) ────────────────────────────────────────────
// Aynı "eksik bileşen dışlanır, kalanlar yeniden normalize edilir" ilkesi
// (bkz. getMastery) — roadmap ilerlemesi her zaman mevcuttur (0 olsa bile),
// mastery/mülakat bileşenleri kullanıcı hiç başlamadıysa devre dışı kalır.
const JOB_READINESS_WEIGHTS = { roadmap: 40, mastery: 35, interview: 25 }

export function getJobReadiness(routes, roadmapPercent) {
    const routeList = Array.isArray(routes) ? routes : []
    const masteryScores = routeList.map((r) => getMastery(r)).filter((v) => typeof v === 'number')
    const interviewScores = routeList.map((r) => getInterviewStats(r)).filter(Boolean).map((s) => s.avgPercent)

    const components = []
    if (typeof roadmapPercent === 'number') components.push({ weight: JOB_READINESS_WEIGHTS.roadmap, value: roadmapPercent })
    if (masteryScores.length) components.push({ weight: JOB_READINESS_WEIGHTS.mastery, value: masteryScores.reduce((a, b) => a + b, 0) / masteryScores.length })
    if (interviewScores.length) components.push({ weight: JOB_READINESS_WEIGHTS.interview, value: interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length })

    if (components.length === 0) return null

    const totalWeight = components.reduce((sum, c) => sum + c.weight, 0)
    const score = Math.round(components.reduce((sum, c) => sum + c.weight * c.value, 0) / totalWeight)

    // "Seni en çok ilerletecek 3 şey": başlanmış (mastery !== null) ama en
    // düşük skorlu 3 route — hiç başlanmamış konular burada ÖNERİLMEZ, çünkü
    // "en zayıf" değil "hiç bakılmamış" olmaları farklı bir öneri kategorisi
    // (roadmap'teki "sıradaki düğüm" zaten bunu karşılıyor).
    const weakest = routeList
        .map((r) => ({ route: r, mastery: getMastery(r) }))
        .filter((x) => typeof x.mastery === 'number')
        .sort((a, b) => a.mastery - b.mastery)
        .slice(0, 3)

    return { score, weakest }
}

// ── Job Readiness kademeli motivasyon metni (retention-and-motivation-plan.md
// Aşama A) ─────────────────────────────────────────────────────────────────
// Ham yüzde tek başına self-efficacy'yi (Bandura) desteklemiyor — "%42"
// kullanıcıya ne anlama geldiğini söylemiyor. Eşikler, hedef kitlenin
// (CLAUDE.md §1) kariyer aşamalarına göre named const olarak tutulur; her
// tier "başarısızsın" değil "buradasın, sıradaki adım şu" tonunda yazılır
// (learning-os-redesign-plan.md §10 risk 7 ile aynı ilke).
const JOB_READINESS_TIERS = [
    { min: 0, id: 'starting', label: { tr: 'Yeni Başlıyorsun', en: 'Just Getting Started' }, message: { tr: 'Haritandaki ilk birkaç dersi bitirdiğinde skorun hızla yükselmeye başlayacak.', en: 'Finish the first few lessons on your map and your score will start climbing fast.' } },
    { min: 25, id: 'foundations', label: { tr: 'Temelleri Atıyorsun', en: 'Building Your Foundations' }, message: { tr: 'Temel konular oturuyor — bu tempoyla devam edersen kısa sürede Junior seviyesine yaklaşırsın.', en: 'Your foundations are settling in — keep this pace and you\'ll approach Junior level soon.' } },
    { min: 50, id: 'approaching-junior', label: { tr: "Junior'a Yaklaşıyorsun", en: 'Approaching Junior Level' }, message: { tr: 'Bir QA Automation Engineer mülakatına girecek olsan artık elin boş dönmezdi.', en: 'If you walked into a QA Automation Engineer interview today, you wouldn\'t come back empty-handed.' } },
    { min: 75, id: 'junior', label: { tr: 'Junior Seviyesindesin', en: "You're at Junior Level" }, message: { tr: 'Junior Automation Engineer olarak işe başlayacak bilgiye sahipsin — zayıf noktalarını güçlendirmek Mid-level\'a açılan kapı.', en: 'You have what it takes to start as a Junior Automation Engineer — closing your weak spots is the door to Mid-level.' } },
    { min: 90, id: 'mid-ready', label: { tr: "Mid-level'a Hazırsın", en: 'Ready for Mid-level' }, message: { tr: 'Kapsam genişliğin ve derinliğin Mid-level bir pozisyonu hak ediyor — mülakat pratiğine ağırlık ver.', en: 'Your breadth and depth earn a Mid-level role — now double down on interview practice.' } },
]

export function getJobReadinessTier(score) {
    if (typeof score !== 'number' || Number.isNaN(score)) return null
    let tier = JOB_READINESS_TIERS[0]
    for (const t of JOB_READINESS_TIERS) {
        if (score >= t.min) tier = t
    }
    return tier
}

// ── Retention v2 — zayıf tamamlanmış konu önerisi (learning-os-redesign-plan.md
// §6.4, retention-and-motivation-plan.md Aşama B) ──────────────────────────
// "Tamamlandı" ama mastery skoru düşük kalan konular — kullanıcı sekmeleri
// bitirdi ama quiz/mülakat performansı zayıf, yani bilgi kalıcı olmamış
// olabilir (Ebbinghaus unutma eğrisi). Sadece GERÇEKTEN tamamlanmış
// (getCompletedRoutes) route'lar arasından seçilir — hiç bitirilmemiş bir
// konuyu "zayıf" diye önermek roadmap'in "sıradaki düğüm" görevine karışır.
const WEAK_MASTERY_THRESHOLD = 50

export function getWeakCompletedTopics(limit = 2) {
    return getCompletedRoutes()
        .map((route) => ({ route, mastery: getMastery(route) }))
        .filter((x) => typeof x.mastery === 'number' && x.mastery < WEAK_MASTERY_THRESHOLD)
        .sort((a, b) => a.mastery - b.mastery)
        .slice(0, limit)
}

// ── Son konum ("Devam et" derin bağlantısı) ─────────────────────────────────

// Kayıt şeması: { route: '/docker', tabIndex: 3, updatedAt: epoch_ms }
export function readLastPosition() {
    try {
        const raw = localStorage.getItem(LAST_POSITION_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed || typeof parsed.route !== 'string' || !parsed.route.startsWith('/')) return null
        return {
            route: parsed.route,
            tabIndex: Number.isFinite(parsed.tabIndex) ? parsed.tabIndex : 0,
            updatedAt: parsed.updatedAt || 0,
        }
    } catch {
        return null
    }
}

// TopicPage sekme değişiminde çağrılır — bu modülün TEK yazma noktası.
export function saveLastPosition(route, tabIndex) {
    if (typeof route !== 'string' || !route.startsWith('/')) return
    try {
        localStorage.setItem(LAST_POSITION_KEY, JSON.stringify({
            route,
            tabIndex: Number.isFinite(tabIndex) ? tabIndex : 0,
            updatedAt: Date.now(),
        }))
    } catch { /* localStorage kapalı olabilir */ }
}
