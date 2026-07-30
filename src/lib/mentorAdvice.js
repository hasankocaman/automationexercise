// Kişisel AI Mentor — Katman A: deterministik (AI'sız) öğüt motoru (öğrenme yazısı #5).
// Plan: Documents/learning-science-upgrade-plan.md Bölüm 6 (O2).
//
// getPersistentWeakness() (mentorSnapshots.js) + getLearningAnalytics() verisini
// alıp KURAL TABANLI, kişiye özel, somut, iki dilli bir öğüt üretir. AI YOKKEN
// (üye değil / edge function kapalı) gösterilen budur; AI VARKEN de aynı öğüt,
// mentor-advice edge function'ına "bağlam" olarak beslenir.
//
// Bu motor herkese açık — üyelik/backend gerektirmez (CLAUDE.md §5). Öğüt metinleri
// TR Türkçe / EN İngilizce; teknik terimler (locator, fixture, JOIN...) İngilizce
// kalır (§8). Sonnet, ROUTE_ADVICE havuzunu daha çok route + daha somut adımla
// genişletebilir (plan görevi S1) — motor ve şema sabit kalır.

// Route → görünen kısa etiket (teknik adlar İngilizce kalır, §8).
const ROUTE_LABELS = {
    '/selenium': 'Selenium', '/playwright': 'Playwright', '/cypress': 'Cypress',
    '/python': 'Python', '/typescript': 'TypeScript', '/javascript': 'JavaScript',
    '/sql': 'SQL', '/java': 'Java', '/jmeter': 'JMeter', '/postman': 'Postman',
    '/api-testing': 'API Testing', '/qa-frontend': 'Frontend for QA', '/bruno': 'Bruno',
    '/rest-assured': 'REST Assured', '/gauge': 'Gauge', '/docker': 'Docker',
    '/jenkins': 'Jenkins', '/kubernetes': 'Kubernetes', '/kafka': 'Kafka',
    '/appium': 'Appium', '/browserstack': 'BrowserStack', '/aws': 'AWS', '/azure': 'Azure',
    '/test-frameworks': 'Test Frameworks', '/git-github': 'Git & GitHub', '/linux': 'Linux',
    '/security': 'Cyber Security', '/what-is-testing': 'Testing Basics', '/manual-testing': 'Manual Testing',
}

export function routeLabel(route) {
    if (!route) return '—'
    if (ROUTE_LABELS[route]) return ROUTE_LABELS[route]
    return route.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Route'a özel, SOMUT sonraki adımlar. Her adım o sayfaya (veya alt bölümüne)
// yönlendirir. Java analojisi (§15) uygun yerlerde diagnosis içinde verilir.
// Sonnet bu havuzu genişletir (S1): her ana route için 2-3 bilingual, somut öğüt.
const ROUTE_ADVICE = {
    '/selenium': {
        tip: {
            tr: 'Locator seçimi ve bekleme (wait) stratejisi Selenium\'da en çok hata alınan yer — CSS/XPath farkını ve explicit wait\'i pekiştir.',
            en: 'Locator choice and wait strategy are where Selenium trips people up most — reinforce CSS/XPath and explicit waits.',
        },
        actions: [
            { label: { tr: 'Locator ve wait bölümünü tekrar et', en: 'Revisit locators & waits' }, route: '/selenium' },
            { label: { tr: 'Bekleyen tekrar sorularını çöz', en: 'Clear your review queue' }, route: '/' },
        ],
    },
    '/playwright': {
        tip: {
            tr: 'Playwright\'te auto-wait çoğu bekleme sorununu çözer ama locator ve assertion zincirini yanlış kurmak flaky test üretir.',
            en: 'Playwright\'s auto-wait solves most timing issues, but the wrong locator/assertion chain still produces flaky tests.',
        },
        actions: [
            { label: { tr: 'Locator + auto-wait bölümünü tekrar et', en: 'Revisit locators & auto-wait' }, route: '/playwright' },
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/playwright' },
        ],
    },
    '/cypress': {
        tip: {
            tr: 'Cypress\'in zincirleme (chaining) ve retry mantığı Selenium\'dan farklı — komutların asenkron kuyruğa girdiğini unutma.',
            en: 'Cypress command chaining and retry differ from Selenium — remember commands enqueue asynchronously.',
        },
        actions: [
            { label: { tr: 'Komut zinciri bölümünü tekrar et', en: 'Revisit command chaining' }, route: '/cypress' },
        ],
    },
    '/python': {
        tip: {
            tr: 'Java\'da referans/değer ayrımı neyse Python\'da mutable/immutable ayrımı odur — is/==, mutable default arg ve liste kopyası tuzaklarını pekiştir.',
            en: 'Mutable/immutable in Python is like Java\'s reference/value split — drill is/==, mutable default args and list copies.',
        },
        actions: [
            { label: { tr: 'is/== ve mutable tuzaklarını tekrar et', en: 'Revisit is/== & mutable traps' }, route: '/python' },
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/python' },
        ],
    },
    '/javascript': {
        tip: {
            tr: 'Java\'da her şey sınıf içindeyken JS\'te hoisting, closure ve == coercion serbest kurallarla çalışır — bu üçü en sık kafa karıştırır.',
            en: 'Unlike Java\'s class-bound rules, JS hoisting, closures and == coercion follow looser rules — these three confuse most.',
        },
        actions: [
            { label: { tr: 'Hoisting/closure/== bölümlerini tekrar et', en: 'Revisit hoisting/closure/==' }, route: '/javascript' },
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/javascript' },
        ],
    },
    '/typescript': {
        tip: {
            tr: 'TypeScript tipleri derleme-zamanı kontrolüdür (Java gibi) ama structural typing ve any/unknown farkı runtime\'da sürpriz üretebilir.',
            en: 'TypeScript types are compile-time checks (like Java) but structural typing and any/unknown can surprise you at runtime.',
        },
        actions: [
            { label: { tr: 'any/unknown ve structural typing tekrarı', en: 'Revisit any/unknown & structural typing' }, route: '/typescript' },
        ],
    },
    '/sql': {
        tip: {
            tr: 'SQL\'de en pahalı hata NULL ve JOIN mantığında olur — = NULL yerine IS NULL, ve JOIN satır çoğalmasını (fan-out) test et.',
            en: 'The costliest SQL mistakes are around NULL and JOIN — use IS NULL not = NULL, and test JOIN row fan-out.',
        },
        actions: [
            { label: { tr: 'NULL ve JOIN bölümlerini tekrar et', en: 'Revisit NULL & JOIN' }, route: '/sql' },
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/sql' },
        ],
    },
    '/java': {
        tip: {
            tr: 'Zaten Java biliyorsun ama Integer cache (==), autoboxing NPE ve switch fall-through gibi tuzaklar mülakatta hâlâ eler — bunları tekrarla.',
            en: 'You already know Java, but traps like Integer cache (==), autoboxing NPE and switch fall-through still fail interviews — drill them.',
        },
        actions: [
            { label: { tr: 'Klasik Java tuzaklarını tekrar et', en: 'Revisit classic Java traps' }, route: '/java' },
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/java' },
        ],
    },
    '/api-testing': {
        tip: {
            tr: 'API testinde status code, header ve şema doğrulaması ayrı katmanlar — sadece 200 kontrol etmek gerçek bir assertion değildir.',
            en: 'In API testing, status code, headers and schema validation are separate layers — checking only 200 is not a real assertion.',
        },
        actions: [
            { label: { tr: 'Assertion ve şema bölümünü tekrar et', en: 'Revisit assertions & schema' }, route: '/api-testing' },
        ],
    },
    '/docker': {
        tip: {
            tr: 'Docker\'da image/container ve volume/bind-mount ayrımı en çok karıştırılan yer — kalıcı veri nerede yaşıyor, onu netleştir.',
            en: 'Image/container and volume/bind-mount are the most confused Docker concepts — clarify where persistent data actually lives.',
        },
        actions: [
            { label: { tr: 'Volume ve container bölümünü tekrar et', en: 'Revisit volumes & containers' }, route: '/docker' },
        ],
    },
    '/git-github': {
        tip: {
            tr: 'Git\'te merge/rebase ve HEAD/detached HEAD kavramları en çok korku üretir — küçük bir repo\'da güvenle deneyerek pekiştir.',
            en: 'Merge/rebase and HEAD/detached HEAD scare people most in Git — reinforce them by practicing safely in a small repo.',
        },
        actions: [
            { label: { tr: 'Merge/rebase bölümünü tekrar et', en: 'Revisit merge/rebase' }, route: '/git-github' },
        ],
    },
    '/linux': {
        tip: {
            tr: 'Linux\'ta pipe, redirection ve dosya izinleri (chmod/chown) QA otomasyonunda sürekli lazım — bunları komut ezberi değil mantığıyla kur.',
            en: 'Pipes, redirection and permissions (chmod/chown) come up constantly in QA automation — learn the logic, not just the commands.',
        },
        actions: [
            { label: { tr: 'Pipe ve izinler bölümünü tekrar et', en: 'Revisit pipes & permissions' }, route: '/linux' },
        ],
    },
}

const GENERIC_ADVICE = {
    tip: {
        tr: 'Bu konuda son tekrarlarında hata oranın yüksek. En etkili yol: önce konuyu tekrar oku, sonra tahmin (prediction) bloklarıyla kendini sına.',
        en: 'Your recent miss rate here is high. The most effective path: reread the topic, then test yourself with the prediction blocks.',
    },
}

function localize(obj, language) {
    if (!obj) return ''
    if (typeof obj === 'string') return obj
    return language === 'tr' ? (obj.tr ?? obj.en ?? '') : (obj.en ?? obj.tr ?? '')
}

// daysStruggling + trend → görsel önem derecesi (panel rengi için).
function severityOf(weakness) {
    const d = weakness.daysStruggling || 0
    if (d >= 7 || weakness.trend === 'worsening') return 'high'
    if (d >= 3) return 'medium'
    return 'low'
}

/**
 * Kişiye özel deterministik öğüt üretir. Döner:
 *   { headline, diagnosis, actions: [{label, route}], severity, label }
 * `weakness` yoksa (yeterli veri yok) null döner — çağıran bileşen boş-durum gösterir.
 */
export function buildLocalAdvice(weakness, analytics, language = 'tr') {
    if (!weakness || !weakness.route) return null
    const isTr = language === 'tr'
    const label = weakness.pageTitle || routeLabel(weakness.route)
    const days = weakness.daysStruggling || 0
    const entry = ROUTE_ADVICE[weakness.route] || GENERIC_ADVICE

    // Süreye göre başlık — dürüst ol: "bugün fark ettim" ile "N gündür" ayrımı.
    let headline
    if (days >= 1) {
        headline = isTr
            ? `${label} konusunda ${days} gündür zorlanıyorsun`
            : `You've been struggling with ${label} for ${days} day${days === 1 ? '' : 's'}`
    } else {
        headline = isTr
            ? `${label} konusunda takıldığını fark ettim`
            : `I noticed you're stuck on ${label}`
    }

    // Teşhis: hata sayısı + eğilim + route ipucu.
    const parts = []
    if (typeof weakness.wrongCount === 'number' && weakness.wrongCount > 0) {
        parts.push(isTr
            ? `Tekrar kuyruğunda bu konudan ${weakness.wrongCount} kaçırılan soru var.`
            : `You have ${weakness.wrongCount} missed question${weakness.wrongCount === 1 ? '' : 's'} from this topic in your review queue.`)
    }
    if (weakness.trend === 'worsening') {
        parts.push(isTr ? 'Üstelik eğilim kötüye gidiyor — şimdi araya girmek en iyisi.' : 'And the trend is getting worse — now is the time to intervene.')
    } else if (weakness.trend === 'improving') {
        parts.push(isTr ? 'İyi haber: eğilim düzeliyor, momentumu kaybetme.' : 'Good news: the trend is improving, don\'t lose the momentum.')
    }
    parts.push(localize(entry.tip, language))
    const diagnosis = parts.filter(Boolean).join(' ')

    const rawActions = (entry.actions && entry.actions.length ? entry.actions : [
        { label: { tr: 'Bu konuyu baştan tekrar et', en: 'Revisit this topic' }, route: weakness.route },
        { label: { tr: 'Bekleyen tekrar sorularını çöz', en: 'Clear your review queue' }, route: '/' },
    ])
    const actions = rawActions.slice(0, 3).map((a) => ({ label: localize(a.label, language), route: a.route }))

    return { headline, diagnosis, actions, severity: severityOf(weakness), label }
}
