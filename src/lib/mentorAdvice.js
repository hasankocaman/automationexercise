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
    '/rest-assured': 'REST Assured', '/gauge': 'Gauge', '/jira': 'Jira', '/docker': 'Docker',
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
//
// `openTab` (ops.): aksiyon o sayfanın BELİRLİ bir sekmesini açar (TopicPage
// location.state.openTab, HomePage kalıbı). AYNI route'a giden iki aksiyonun
// aynı sekmeye düşüp kullanıcıyı kandırmaması için kullanılır (ör. "tuzakları
// tekrar et" → genel giriş sekmesi 0, "tahmin bloklarıyla test et" → prediction
// bloğu OLAN sekme). Bu indeksler prediction içeren ilk sekmedir; içerik yeniden
// sıralanırsa `scripts/audit-learning-blocks.mjs` ROUTE_ADVICE guard'ı FAIL eder
// ve buranın güncellenmesini zorlar (indeks kayması sessizce sızmaz).
export const ROUTE_ADVICE = {
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
            // NOT: /playwright'te prediction bloğu YOK — "tahmin bloklarıyla test et"
            // yanıltıcıydı; dürüst ve farklı bir hedefe (tekrar kuyruğu) yönlendirir.
            { label: { tr: 'Bekleyen tekrar sorularını çöz', en: 'Clear your review queue' }, route: '/' },
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
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/python', openTab: 3 },
        ],
    },
    '/javascript': {
        tip: {
            tr: 'Java\'da her şey sınıf içindeyken JS\'te hoisting, closure ve == coercion serbest kurallarla çalışır — bu üçü en sık kafa karıştırır.',
            en: 'Unlike Java\'s class-bound rules, JS hoisting, closures and == coercion follow looser rules — these three confuse most.',
        },
        actions: [
            { label: { tr: 'Hoisting/closure/== bölümlerini tekrar et', en: 'Revisit hoisting/closure/==' }, route: '/javascript' },
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/javascript', openTab: 2 },
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
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/sql', openTab: 4 },
        ],
    },
    '/java': {
        tip: {
            tr: 'Zaten Java biliyorsun ama Integer cache (==), autoboxing NPE ve switch fall-through gibi tuzaklar mülakatta hâlâ eler — bunları tekrarla.',
            en: 'You already know Java, but traps like Integer cache (==), autoboxing NPE and switch fall-through still fail interviews — drill them.',
        },
        actions: [
            { label: { tr: 'Klasik Java tuzaklarını tekrar et', en: 'Revisit classic Java traps' }, route: '/java' },
            { label: { tr: 'Tahmin bloklarıyla kendini test et', en: 'Test yourself with predictions' }, route: '/java', openTab: 2 },
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
    '/rest-assured': {
        tip: {
            tr: 'Java\'da assertEquals tek satır kontrolse, REST Assured\'da given/when/then zinciri kurulumu, isteği ve doğrulamayı AYNI cümlede birleştirir — hangi adımın nerede bittiğini karıştırmak en sık hata.',
            en: 'Where plain Java uses a single assertEquals, REST Assured\'s given/when/then chain fuses setup, request and verification into one sentence — mixing up which step ends where is the most common slip.',
        },
        actions: [
            { label: { tr: 'given/when/then zincirini tekrar et', en: 'Revisit the given/when/then chain' }, route: '/rest-assured' },
            { label: { tr: 'JSON path doğrulamalarını tekrar et', en: 'Revisit JSON path assertions' }, route: '/rest-assured' },
        ],
    },
    '/postman': {
        tip: {
            tr: 'Environment ve Collection değişkenlerinin kapsamı (scope) farklı — bir pre-request script\'te set ettiğin değişkeni yanlış katmanda aramak "undefined" hatasının en sık nedeni.',
            en: 'Environment and Collection variables have different scopes — looking for a variable you set in a pre-request script in the wrong layer is the most common cause of "undefined" errors.',
        },
        actions: [
            { label: { tr: 'Değişken kapsamlarını tekrar et', en: 'Revisit variable scopes' }, route: '/postman' },
        ],
    },
    '/bruno': {
        tip: {
            tr: 'Bruno\'nun Git-native olması, .bru dosyalarının diff\'lenebilir olduğu anlamına gelir — ama secret\'ları environment dosyasına yazıp commit\'lemek en sık yapılan güvenlik hatası.',
            en: 'Bruno being Git-native means .bru files are diffable — but writing secrets into an environment file and committing it is the most common security mistake.',
        },
        actions: [
            { label: { tr: '.bru dosya yapısını tekrar et', en: 'Revisit the .bru file structure' }, route: '/bruno' },
        ],
    },
    '/jenkins': {
        tip: {
            tr: 'Declarative pipeline\'da post{} bloğu her zaman çalışır (stage başarısız olsa bile) — cleanup/bildirim mantığını stage içine gömmek yaygın bir mimari hata.',
            en: 'The post{} block in a declarative pipeline always runs (even if a stage fails) — burying cleanup/notification logic inside a stage instead is a common architecture mistake.',
        },
        actions: [
            { label: { tr: 'Pipeline post{} bloğunu tekrar et', en: 'Revisit the post{} block' }, route: '/jenkins' },
        ],
    },
    '/kubernetes': {
        tip: {
            tr: 'Pod tek başına kalıcı değildir — Deployment onu yeniden yaratır, Service ona sabit bir ağ adresi verir. Bu üçünü karıştırmak "pod\'a nasıl erişirim" sorusunun kaynağı.',
            en: 'A Pod alone is not durable — a Deployment recreates it, a Service gives it a stable network address. Confusing these three is the root of "how do I reach my pod" questions.',
        },
        actions: [
            { label: { tr: 'Pod/Deployment/Service farkını tekrar et', en: 'Revisit Pod vs Deployment vs Service' }, route: '/kubernetes' },
        ],
    },
    '/kafka': {
        tip: {
            tr: 'Consumer offset\'i ne zaman commit ettiğin, mesajın "en az bir kez" mi yoksa "tam bir kez" mi işlendiğini belirler — bu ayrımı test senaryosuna yansıtmamak sessiz veri kaybına/duplikasyona yol açar.',
            en: 'When a consumer commits its offset determines whether a message is processed at-least-once or exactly-once — not reflecting this in your test scenarios silently causes data loss or duplication.',
        },
        actions: [
            { label: { tr: 'Offset commit zamanlamasını tekrar et', en: 'Revisit offset commit timing' }, route: '/kafka' },
        ],
    },
    '/appium': {
        tip: {
            tr: 'Web\'de XPath genelde son çare iken, mobilde accessibility id / resource-id gibi platforma özel locator\'lar öncelik sırası XPath\'ten önce gelir — Selenium alışkanlığıyla direkt XPath\'e atlamak flaky testin en sık nedeni.',
            en: 'While XPath is usually a last resort on the web, mobile locators like accessibility id / resource-id should be tried before XPath — jumping straight to XPath out of Selenium habit is the top cause of flaky mobile tests.',
        },
        actions: [
            { label: { tr: 'Mobil locator önceliğini tekrar et', en: 'Revisit mobile locator priority' }, route: '/appium' },
        ],
    },
    '/aws': {
        tip: {
            tr: 'IAM\'de "en az yetki" (least privilege) ilkesini atlayıp root/geniş yetkiyle test ortamı kurmak, prod\'a taşınınca ciddi güvenlik açığına dönüşür — test hesaplarını da gerçek yetki sınırlarıyla kur.',
            en: 'Skipping IAM\'s least-privilege principle and setting up test environments with root/broad access turns into a real security gap once it reaches prod — build test accounts with real permission boundaries too.',
        },
        actions: [
            { label: { tr: 'IAM ve least privilege bölümünü tekrar et', en: 'Revisit IAM & least privilege' }, route: '/aws' },
        ],
    },
    '/azure': {
        tip: {
            tr: 'Azure DevOps pipeline\'ında variable group\'lar ve pipeline değişkenleri farklı kapsamlarda yaşar — bir stage\'de görünen değişkenin başka bir stage\'de görünmemesi genelde bu kapsam farkındandır, bug değil.',
            en: 'In Azure DevOps pipelines, variable groups and pipeline variables live in different scopes — a variable visible in one stage but not another is usually this scope difference, not a bug.',
        },
        actions: [
            { label: { tr: 'Pipeline değişken kapsamını tekrar et', en: 'Revisit pipeline variable scope' }, route: '/azure' },
        ],
    },
    '/jmeter': {
        tip: {
            tr: 'Bir önceki isteğin cevabından (ör. token) sonraki isteğe dinamik değer taşımak (correlation) yapılmazsa, thread sayısı ne kadar yüksek olursa olsun sonuçlar gerçek yükü yansıtmaz — sabit/statik veriyle test etmek yaygın tuzak.',
            en: 'Without correlating dynamic values (e.g. a token) from one response into the next request, results won\'t reflect real load no matter how many threads you run — testing with static/hardcoded data is the common trap.',
        },
        actions: [
            { label: { tr: 'Correlation (dinamik değer taşıma) bölümünü tekrar et', en: 'Revisit correlation (dynamic value passing)' }, route: '/jmeter' },
        ],
    },
    '/browserstack': {
        tip: {
            tr: 'Capabilities\'te (browser/os/device) küçük bir yazım/sürüm uyuşmazlığı, testin kendi hatasıymış gibi görünen bir session başlatma hatasına yol açar — önce capability\'yi, sonra testi şüphelen.',
            en: 'A small mismatch in capabilities (browser/os/device) causes a session-start failure that looks like it\'s the test\'s fault — suspect the capability config before the test itself.',
        },
        actions: [
            { label: { tr: 'Capabilities eşleşmesini tekrar et', en: 'Revisit capabilities matching' }, route: '/browserstack' },
        ],
    },
    '/gauge': {
        tip: {
            tr: 'Gauge\'de spec markdown dosyası HEM dokümantasyon HEM test olduğundan, bir step\'i parametrize etmeden kopyala-yapıştırmak specs\'i şişirir — Java\'da metot overload yerine parametre kullanmak gibi düşün.',
            en: 'Since a Gauge spec markdown file is both documentation and test, copy-pasting a step instead of parameterizing it bloats the spec — think of it like using a parameter instead of a Java method overload.',
        },
        actions: [
            { label: { tr: 'Step parametrizasyonunu tekrar et', en: 'Revisit step parameterization' }, route: '/gauge' },
        ],
    },
    '/test-frameworks': {
        tip: {
            tr: 'pytest/Selenium/Playwright arasında seçim yaparken "hangisi daha popüler" değil, "projenin dili, CI hızı ve ekip Java/Python bilgisi" sorusuna cevap ver — yanlış framework seçimi mimariyi sonradan tersine çevrilemez şekilde kilitler.',
            en: 'When choosing between pytest/Selenium/Playwright, don\'t ask "which is more popular" — ask about your project\'s language, CI speed and the team\'s Java/Python background. The wrong choice locks in an architecture that\'s hard to reverse later.',
        },
        actions: [
            { label: { tr: 'Framework karşılaştırmasını tekrar et', en: 'Revisit the framework comparison' }, route: '/test-frameworks' },
        ],
    },
    '/qa-frontend': {
        tip: {
            tr: 'Kaynak koddaki (JSX/HTML) bir elementle DOM\'da render edilen gerçek element aynı şey değildir — React re-render sonrası aynı görünen elementin referansı değişebilir (stale element), bu farkı Locator Lab\'da tekrar test et.',
            en: 'The element in source code (JSX/HTML) is not the same as the actual rendered DOM element — after a React re-render, an element that looks the same can have a new reference (stale element); retest that gap in the Locator Lab.',
        },
        actions: [
            { label: { tr: 'Kaynak→DOM→Locator akışını tekrar et', en: 'Revisit the source→DOM→locator flow' }, route: '/qa-frontend' },
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
    // openTab (varsa) korunur — MentorPanel <Link>'e state={{openTab}} olarak geçer,
    // böylece aynı route'a giden aksiyonlar farklı sekmeye açılır.
    const actions = rawActions.slice(0, 3).map((a) => ({
        label: localize(a.label, language),
        route: a.route,
        ...(typeof a.openTab === 'number' ? { openTab: a.openTab } : {}),
    }))

    return { headline, diagnosis, actions, severity: severityOf(weakness), label }
}
