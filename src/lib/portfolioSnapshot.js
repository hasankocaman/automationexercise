// src/lib/portfolioSnapshot.js
// QA Portfolyo — TÜRETME katmanı. Portfolyo KENDİ ilerleme state'ini TUTMAZ;
// her çağrıda mevcut depolardan yeniden hesaplanır. İkinci bir tamamlanma
// state'i kaçınılmaz olarak drift üretir (CLAUDE.md §23.4).
//
// ⚠ EN KRİTİK NOKTA — route-kapsamı tuzağı:
// `xp.js` depolama anahtarını BULUNULAN SAYFANIN URL'inden türetir
// (`learnqa_xp_${ilkPathSegment}`). Yani `getCompletedExercises()` /portfolio
// sayfasında çağrılırsa `learnqa_xp_portfolio` anahtarını okur — HER ZAMAN BOŞ.
// Aynı tuzak `sprintStore.getBugStatus()`/`isSprintComplete()` için de geçerli,
// çünkü ikisi de `getCompletedExercises()` üstüne kurulu: portfolyodan
// çağrılırlarsa hata vermeden, SESSİZCE "hiçbir bug kapatılmamış" derler.
//
// Bu yüzden burada `xp.js`/`sprintStore.js` FONKSİYONLARI ÇAĞRILMAZ. Onun
// yerine TÜM `learnqa_xp_*` anahtarları taranıp global bir "tamamlanmış
// egzersiz id" kümesi kurulur (`progressStore.getTotalXp()` ile aynı,
// projede kanıtlanmış tarama deseni). `xp.js` ve `sprintStore.js` DEĞİŞTİRİLMEZ
// — route-kapsamlılık bir bug değil, tüm sitenin bağımlı olduğu tasarım kararı.
//
// tests/portfolio-page.spec.ts'teki "dolu durum" testi bu kuralın bekçisidir:
// burası yanlışlıkla route-kapsamlı çağrıya dönerse o test KIRILIR.

import {
    getTotalXp,
    getCompletedRoutes,
    getMastery,
    getInterviewStats,
    getSkillRadarData,
    getLearningAnalytics,
} from './progressStore'
import { getSkillSignals } from './skillSignals'
import { getActivityStats } from './activityLog'
import { readMentorProfile, getLocalCompletedRoutes } from '../utils/careerMapProfile'
import { getEarnedMilestones, getStoredMilestoneIds, MILESTONE_DEFS } from '../utils/careerMapMilestones'
import { MASTERY_MANIFEST } from '../data/generated/masteryManifest'
import { portfolioData } from '../data/portfolioData'

const XP_KEY_PREFIX = 'learnqa_xp_'
const SPRINT_BOARD_KEY = 'learnqa_sprint_board'
const IDENTITY_KEY = 'learnqa_portfolio_identity'

// ─── Global tamamlanmış egzersiz kümesi (§ route-kapsamı tuzağının çözümü) ───
// Tüm konuların `learnqa_xp_*` anahtarlarındaki `completed` dizilerini birleştirir.
export function getAllCompletedExerciseIds() {
    const ids = new Set()
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (!key || !key.startsWith(XP_KEY_PREFIX)) continue
            try {
                const parsed = JSON.parse(localStorage.getItem(key))
                if (parsed && Array.isArray(parsed.completed)) {
                    for (const id of parsed.completed) {
                        if (typeof id === 'string') ids.add(id)
                    }
                }
            } catch { /* bozuk tekil kayıt atlanır */ }
        }
    } catch { /* localStorage kapalı olabilir */ }
    return ids
}

function readSprintBoard() {
    try {
        const raw = localStorage.getItem(SPRINT_BOARD_KEY)
        const parsed = raw ? JSON.parse(raw) : null
        return {
            pulled: Array.isArray(parsed?.pulled) ? parsed.pulled : [],
            closed: Array.isArray(parsed?.closed) ? parsed.closed : [],
        }
    } catch {
        return { pulled: [], closed: [] }
    }
}

// ─── Kimlik (§ tek state istisnası) ─────────────────────────────────────────
// Bu ilerleme verisi DEĞİL, kullanıcının kendi yazdığı ad/unvan — türetilecek
// bir kaynağı yok, ikinci kopyası da hiçbir yerde tutulmuyor (drift riski yok).
// Tamamen opsiyonel: boş bırakılırsa sayfa eksiksiz çalışır.
export function readIdentity() {
    try {
        const raw = localStorage.getItem(IDENTITY_KEY)
        const parsed = raw ? JSON.parse(raw) : null
        return {
            name: typeof parsed?.name === 'string' ? parsed.name : '',
            title: typeof parsed?.title === 'string' ? parsed.title : '',
        }
    } catch {
        return { name: '', title: '' }
    }
}

export function saveIdentity({ name, title }) {
    try {
        localStorage.setItem(IDENTITY_KEY, JSON.stringify({
            name: typeof name === 'string' ? name.slice(0, 60) : '',
            title: typeof title === 'string' ? title.slice(0, 80) : '',
        }))
    } catch { /* localStorage kapalı/dolu olabilir */ }
}

// ─── Görev vitrini ──────────────────────────────────────────────────────────
// Kaynak: `skillSignals` (zaman damgası TAŞIYAN tek kaynak). Katalogda olmayan
// bir missionId gelirse SESSİZCE DÜŞÜRÜLMEZ — `isKnown: false` ile jenerik
// kart olarak gösterilir (yeni bir mission eklenip kataloğa yazılmazsa
// portfolyo eksik değil, jenerik görünür).
function buildMissions(completedIds) {
    const { missionCatalog, bugCatalog } = portfolioData
    const signals = getSkillSignals()
    const seen = new Set()
    const rows = []

    for (const signal of signals) {
        const id = signal?.missionId
        if (!id || seen.has(id)) continue
        // Sprint bug görevleri ayrı bölümde (§ sprint deneyimi) gösterilir.
        if (bugCatalog[id]) continue
        // Sprint kapanış sinyali bir görev değil, tören kaydıdır.
        if (id.startsWith('sprint-close-')) continue
        seen.add(id)
        const entry = missionCatalog[id]
        rows.push({
            missionId: id,
            route: entry?.route || signal.route || '',
            openTab: typeof entry?.openTab === 'number' ? entry.openTab : null,
            title: entry?.title || null,
            skill: entry?.skill || null,
            whatYouBuilt: entry?.whatYouBuilt || null,
            ts: typeof signal.ts === 'number' ? signal.ts : 0,
            isKnown: Boolean(entry),
        })
    }

    // Beceri sinyali kaydedilmeden ÖNCE tamamlanmış görevler de olabilir
    // (sinyal deposu görev primitifinden sonra eklendi). XP kümesinde işaretli
    // ama sinyali olmayan katalog görevleri de vitrine girer — zaman damgası
    // bilinmediği için 0, yani listenin sonunda.
    for (const [id, entry] of Object.entries(missionCatalog)) {
        if (seen.has(id) || !completedIds.has(id)) continue
        seen.add(id)
        rows.push({
            missionId: id,
            route: entry.route,
            openTab: typeof entry.openTab === 'number' ? entry.openTab : null,
            title: entry.title,
            skill: entry.skill,
            whatYouBuilt: entry.whatYouBuilt,
            ts: 0,
            isKnown: true,
        })
    }

    // En yeni üstte — kronolojik kanıt hissi.
    return rows.sort((a, b) => b.ts - a.ts)
}

// ─── Sıradaki görev ─────────────────────────────────────────────────────────
// "İnşa Ettiklerin" geriye bakar (ne bitirdin); bu, ileriye bakar (sırada ne
// var). Katalog SIRASIYLA gezilir — ilk TAMAMLANMAMIŞ ders görevi döner.
// Sprint bug'ları kapsam DIŞI (ayrı bir panoda yaşıyorlar, `/sprint` CTA'sı
// zaten kalıcı olarak görünür). Hiçbiri kalmadıysa `null` — portfolyo
// olmayan bir görevi uydurmaz, kart tamamen gizlenir.
function buildNextMission(completedIds) {
    const { missionCatalog } = portfolioData
    for (const [id, entry] of Object.entries(missionCatalog)) {
        if (completedIds.has(id)) continue
        return {
            missionId: id,
            route: entry.route,
            openTab: typeof entry.openTab === 'number' ? entry.openTab : null,
            // `taskTitle` ileriye bakan, HENÜZ yapılmamış bir işi anlatır ("X'i
            // kurmak"); `title` geriye bakan bir bitirme cümlesidir ("X'i
            // kurdun"). "İnşa Ettiklerin" `title` kullanır, bu kart YANLIŞLIKLA
            // bitmiş gibi görünmesin diye `taskTitle` kullanır.
            taskTitle: entry.taskTitle || entry.title,
            skill: entry.skill,
        }
    }
    return null
}

// ─── Sprint deneyimi ────────────────────────────────────────────────────────
function buildSprints(completedIds) {
    const { bugCatalog, sprintCatalog } = portfolioData
    const board = readSprintBoard()

    const closedBugs = Object.entries(bugCatalog)
        .filter(([missionId]) => completedIds.has(missionId))
        .map(([missionId, bug]) => ({
            missionId,
            key: bug.key,
            severity: bug.severity,
            sprintId: bug.sprintId,
            sprintTitle: sprintCatalog[bug.sprintId]?.title || null,
            title: bug.title,
            whatYouFixed: bug.whatYouFixed,
        }))

    const closedSprints = board.closed
        .filter((id) => sprintCatalog[id])
        .map((id) => ({ sprintId: id, code: sprintCatalog[id].code, title: sprintCatalog[id].title }))

    return { closedBugs, closedSprints }
}

// ─── Ustalık tablosu ────────────────────────────────────────────────────────
// `getMastery()` null dönen route'lar tabloda HİÇ görünmez — "başlamadın"
// satırlarıyla tabloyu doldurmak portfolyoyu bir eksik-listesine çevirir.
function buildMastery(completedRoutes) {
    const completed = new Set(completedRoutes)
    return Object.keys(MASTERY_MANIFEST)
        .map((route) => ({
            route,
            mastery: getMastery(route),
            interview: getInterviewStats(route),
            isCompleted: completed.has(route),
        }))
        .filter((row) => typeof row.mastery === 'number')
        .sort((a, b) => b.mastery - a.mastery)
}

// ─── Rozetler ───────────────────────────────────────────────────────────────
// Kariyer haritası profili yoksa null → bölüm tamamen gizlenir.
// Profildeki düğüm kopyası hafiftir (`{route, title, emoji}`) ve `isMain`
// bayrağını TAŞIMAZ; bu yüzden "SDET yolu tamam" rozeti profil düğümlerinden
// hesaplanamaz. Harita sayfasında kazanıldığında zaten `learnqa_map_milestones`
// anahtarına yazılıyor — o kayıtla birleştirilir (yeni state DEĞİL, mevcut
// deponun okunması).
function buildMilestones() {
    const profile = readMentorProfile()
    if (!profile) return null
    const nodes = Array.isArray(profile.nodes) ? profile.nodes : []
    const earnedNow = getEarnedMilestones(nodes, getLocalCompletedRoutes()).map((m) => m.id)
    const stored = getStoredMilestoneIds()
    const earnedIds = new Set([...earnedNow, ...stored])
    return MILESTONE_DEFS
        .filter((m) => earnedIds.has(m.id))
        .map((m) => ({ id: m.id, emoji: m.emoji, label: m.label }))
}

// ─── Tek giriş noktası ──────────────────────────────────────────────────────
// Saf okuma, yan etkisiz. Boş/bozuk localStorage'da bile çökmez — her alt
// okuma kendi try/catch'ini taşır.
export function getPortfolioSnapshot() {
    const completedIds = getAllCompletedExerciseIds()
    const completedRoutes = getCompletedRoutes()
    const analytics = getLearningAnalytics()

    const missions = buildMissions(completedIds)
    const nextMission = buildNextMission(completedIds)
    const sprints = buildSprints(completedIds)
    const mastery = buildMastery(completedRoutes)
    const milestones = buildMilestones()
    const skills = getSkillRadarData()

    // `activityLog` "en uzun streak"i TUTMAZ (yalnızca güncel seri + aktif gün
    // sayısı türetilebilir). Olmayan bir metriği uydurmak yerine gerçekten
    // ölçülen ikisi gösterilir — portfolyo sahte kanıt üretmez.
    let activity = { streak: 0, activeDays: 0 }
    try {
        const s = getActivityStats()
        activity = { streak: s?.streak?.streak ?? 0, activeDays: s?.activeDays ?? 0 }
    } catch { /* activityLog okunamadı */ }

    const stats = {
        totalXp: getTotalXp(),
        completedRoutes: completedRoutes.length,
        solvedMissions: missions.length,
        closedBugs: sprints.closedBugs.length,
        quizAccuracy: analytics.quizAccuracy, // null = hiç quiz denenmemiş (0 DEĞİL)
        streak: activity.streak,
        activeDays: activity.activeDays,
    }

    // Kademe kararı: "portfolyoda gösterilecek GERÇEK bir eser var mı?"
    // Sadece sayfa gezmek portfolyo açmaz; en az bir çözülmüş görev, kapatılmış
    // bug, tamamlanmış ders ya da ustalık sinyali gerekir.
    const hasEvidence = missions.length > 0
        || sprints.closedBugs.length > 0
        || completedRoutes.length > 0
        || mastery.length > 0
    const isFull = missions.length > 0 && mastery.length > 0
        && (sprints.closedBugs.length > 0 || completedRoutes.length > 0)
    const tier = !hasEvidence ? 'empty' : (isFull ? 'full' : 'partial')

    return {
        hasAnyData: hasEvidence,
        tier,
        identity: readIdentity(),
        stats,
        missions,
        nextMission,
        sprints,
        skills,
        mastery,
        milestones,
    }
}

// ─── Markdown dışa aktarım ──────────────────────────────────────────────────
// Yalnızca hazır snapshot'ı BİÇİMLENDİRİR — türetme mantığına dokunmaz.
// Dürüstlük notu çıktıya da girer: portfolyo bir sertifika değil, çalışma günlüğü.
const tx = (val, isTr) => {
    if (val == null) return ''
    if (typeof val === 'string') return val
    return isTr ? (val.tr ?? val.en ?? '') : (val.en ?? val.tr ?? '')
}

export function toMarkdown(snapshot, language = 'tr') {
    const isTr = language === 'tr'
    const t = portfolioData.export
    const lines = []

    const name = snapshot.identity.name || tx(portfolioData.ui.defaultName, isTr)
    lines.push(`# ${name} — ${tx(t.heading, isTr)}`)
    if (snapshot.identity.title) lines.push(`_${snapshot.identity.title}_`)
    lines.push('')

    lines.push(`## ${tx(t.statsHeading, isTr)}`)
    lines.push(`- ${tx(portfolioData.ui.statXp, isTr)}: ${snapshot.stats.totalXp}`)
    lines.push(`- ${tx(portfolioData.ui.statMissions, isTr)}: ${snapshot.stats.solvedMissions}`)
    lines.push(`- ${tx(portfolioData.ui.statBugs, isTr)}: ${snapshot.stats.closedBugs}`)
    lines.push(`- ${tx(portfolioData.ui.statLessons, isTr)}: ${snapshot.stats.completedRoutes}`)
    if (typeof snapshot.stats.quizAccuracy === 'number') {
        lines.push(`- ${tx(portfolioData.ui.statAccuracy, isTr)}: %${snapshot.stats.quizAccuracy}`)
    }
    lines.push('')

    if (snapshot.missions.length) {
        lines.push(`## ${tx(t.missionsHeading, isTr)}`)
        for (const m of snapshot.missions) {
            const title = m.isKnown ? tx(m.title, isTr) : `${m.route} ${tx(portfolioData.ui.genericMission, isTr)}`
            lines.push(`### ${title}`)
            if (m.skill) lines.push(`**${tx(portfolioData.ui.skillLabel, isTr)}:** ${tx(m.skill, isTr)}`)
            if (m.whatYouBuilt) lines.push(tx(m.whatYouBuilt, isTr))
            lines.push('')
        }
    }

    if (snapshot.sprints.closedBugs.length) {
        lines.push(`## ${tx(t.sprintHeading, isTr)}`)
        for (const bug of snapshot.sprints.closedBugs) {
            lines.push(`- **${bug.key}** (${bug.severity}) — ${tx(bug.title, isTr)}`)
            lines.push(`  ${tx(bug.whatYouFixed, isTr)}`)
        }
        lines.push('')
    }

    if (snapshot.mastery.length) {
        lines.push(`## ${tx(t.masteryHeading, isTr)}`)
        for (const row of snapshot.mastery) {
            const interview = row.interview ? ` · ${tx(portfolioData.ui.interviewLabel, isTr)}: %${row.interview.avgPercent}` : ''
            lines.push(`- ${row.route} — %${row.mastery}${interview}`)
        }
        lines.push('')
    }

    lines.push('---')
    lines.push(`_${tx(portfolioData.honestyNote, isTr)}_`)

    return lines.join('\n')
}
