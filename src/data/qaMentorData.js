// src/data/qaMentorData.js
// QA Mentor AI — Kişiselleştirilmiş Zihin Haritası Veri Dosyası

export const MENTOR_STEPS = {
    STEP_LEVEL: 'step_level',   // S1: deneyim seviyesi (3 kademeli)
    STEP_LANG: 'step_lang',     // S2: dil tercihi (Java / modern / kararsızım)
    STEP_TOOL: 'step_tool',     // S3: UI otomasyon aracı (Selenium / Playwright / ikisi)
    STEP_TIME: 'step_time',     // S4: haftalık zaman — süre tahmininin girdisi
    MAP_A: 'map_a',
    MAP_B: 'map_b',
    MAP_B_SEL: 'map_b_sel',              // Python/TS + Selenium dahil
    MAP_C1: 'map_c1',
    MAP_C2: 'map_c2',
}

// S4 cevabının süre hesabında kullanılan ortalama saat karşılığı
export const WEEKLY_HOURS = {
    TIME_LOW: 4,
    TIME_MID: 8,
    TIME_HIGH: 12,
}

// ─── Mülakat Diyalog Metinleri ─────────────────────────────────────────────
export const DIALOG = {
    tr: {
        welcome: {
            bot: 'Merhaba! 👋 Ben LearnQA.dev\'in QA Akıl Hocasıyım. Sana özel bir **QA Kariyer Zihin Haritası** çıkaracağım.',
            bot2: 'Bunun için sana birkaç kısa soru soracağım. Hazır mısın? 🚀',
        },
        stepLevel: {
            bot: 'Şu anki durumunu en iyi hangisi anlatıyor?',
            options: [
                { id: 'L_ZERO', label: '🌱 Tamamen sıfırım — yazılım/test geçmişim yok.' },
                { id: 'L_MANUAL', label: '🧪 Manuel test yapıyorum / az kod biliyorum — otomasyona geçmek istiyorum.' },
                { id: 'L_CODER', label: '💻 Kod yazabiliyorum — QA otomasyonunu sistemli öğrenmek istiyorum.' },
            ],
        },
        ackLevel: {
            L_ZERO: 'Harika bir başlangıç noktası! Sıfırdan başlamak dezavantaj değil — haritanı sağlam temellerden kuracağız. 💪',
            L_MANUAL: 'Manuel test deneyimi otomasyonda en büyük avantajın — test senaryosu düşünmeyi zaten biliyorsun, şimdi onu koda çevireceğiz! 🎯',
            L_CODER: 'Süper! Kod temelin olduğu için hızlı ilerleyeceğiz. 🚀',
        },
        // Ürün kararı 2026-07-19: eski "Python / TypeScript" birleşik seçeneği
        // ikiye bölündü — kullanıcı TEK dil seçer, seçilmeyen modern dil haritanın
        // "Ekstra Gelişim Dalları"na taşınır (105 saatlik çifte dil yükü kalktı).
        stepLang: {
            bot: 'Otomasyon dilin ne olsun?',
            options: [
                { id: 'LANG_JAVA', label: '☕ Java — kurumsal klasik' },
                { id: 'LANG_PYTHON', label: '🐍 Python — hızlı ve okunaklı başlangıç' },
                { id: 'LANG_TYPESCRIPT', label: '🟦 TypeScript — tip güvenli modern stack' },
                { id: 'LANG_UNDECIDED', label: '🤷 Kararsızım — sen öner' },
            ],
        },
        langRecommend: {
            bot: '**Önerim: Java.** ☕\n\nTürkiye\'de banka, telekom ve kurumsal QA ilanlarının büyük çoğunluğu Java + Selenium stack\'i istiyor; ayrıca sitedeki en derin içerik hattımız Java üzerine kurulu. Java ile sağlam bir temel attıktan sonra Python veya TypeScript\'e geçmek çok kolay — tersi daha zordur. Bu yüzden haritanı **Java yolundan** kuruyorum. 👍',
        },
        // Plan §6.2: her cevaptan sonra mentorun 1 cümlelik onayı — S2 dil seçimi.
        // DİKKAT: bu metinler ARAÇ-NÖTR olmalı — UI aracı (Selenium/Playwright)
        // henüz SORULMADI, burada araç adı geçerse S3 sorusuyla çelişir.
        ackLang: {
            LANG_JAVA: 'Sağlam tercih! Kurumsal QA ilanlarının büyük bölümü Java istiyor — güçlü bir temele yatırım yapıyorsun. ☕',
            LANG_PYTHON: 'Harika seçim! Python, QA otomasyonuna en hızlı giriş yapılan dil — okunaklı sözdizimiyle ilk haftadan test yazmaya başlarsın. 🐍',
            LANG_TYPESCRIPT: 'Modern tercih! TypeScript, tip güvenliğiyle test kodundaki hataları daha sen yazarken yakalar. 🟦',
        },
        stepTool: {
            bot: '**UI otomasyon** tarafında hangi araçla ilerleyelim?',
            options: [
                { id: 'TOOL_SELENIUM', label: '🔵 Selenium — sektörün klasiği' },
                { id: 'TOOL_PLAYWRIGHT', label: '🎭 Playwright — modern ve hızlı' },
                { id: 'TOOL_BOTH', label: '🏆 İkisi de — en geniş iş havuzu' },
            ],
        },
        // Plan §6.2: S3 araç seçimi onayı
        ackTool: {
            TOOL_SELENIUM: 'Sektörün klasiği! Selenium bilen QA mühendisi her zaman iş bulur — ilanların büyük bölümü hâlâ Selenium istiyor. 🔵',
            TOOL_PLAYWRIGHT: 'Modern seçim! Auto-wait ve Trace Viewer ile flaky test derdini en aza indireceksin. 🎭',
            TOOL_BOTH: 'En geniş iş havuzu! İki aracı da bilen mühendisler "Selenium\'dan Playwright\'a geçiş" projelerinde özellikle aranır. 🏆',
        },
        stepTime: {
            bot: 'Son soru: haftada kaç saat ayırabilirsin? Dürüst ol — haritanın süre tahmini buna göre hesaplanacak. 😊',
            options: [
                { id: 'TIME_LOW', label: '🐢 3-5 saat — işin/okulun yanında' },
                { id: 'TIME_MID', label: '🚶 6-10 saat — düzenli tempo' },
                { id: 'TIME_HIGH', label: '🏃 10+ saat — tam odak / kariyer değişimi modu' },
            ],
        },
        ackTime: {
            TIME_LOW: 'Yavaş ama eksiksiz — az zaman içeriği kısmaz, sadece takvimi uzatır. Düzenli olmak hızdan daha önemlidir. 🌱',
            TIME_MID: 'İdeal tempo! Haftalık düzenli çalışmayla şaşırtıcı hızda ilerleyeceksin. 💪',
            TIME_HIGH: 'Tam odak modu! Bu tempoyla haritayı rekor sürede bitirebilirsin. 🔥',
        },
        preparing: '✨ Cevaplarını değerlendiriyorum, haritan hazırlanıyor...',
        timeOnly: {
            bot: 'Tekrar hoş geldin! 👋 Kayıtlı yol haritanı buldum. Süre tahminini hesaplayabilmem için tek bir sorum var:',
        },
        // Plan §7 risk 3: yarıda kalan sihirbaz — dönüşte kaldığı sorudan devam
        resumeDraft: {
            bot: 'Tekrar hoş geldin! 👋 Sorulara kaldığın yerden devam edelim:',
        },
        // Plan §2.2: S1=sıfır iken S2'de "Kararsızım" seçeneğinin vurgu rozeti
        recommendedBadge: '✨ Önerilen',
        back: '↩ Geri',
        // Playwright vs Cypress karşılaştırma mesajı (B_SEL_NO seçilince)
        playwrightCypressCompare: {
            bot: `**Playwright vs Cypress — Kısa Tanıtım:**\n\n🎭 **Playwright** → Microsoft tarafından geliştirilen modern otomasyon çerçevesi. Python, TypeScript ve Java'yı destekler. Auto-wait, ağ stubbing, API testi, Trace Viewer ve paralel test koşusu ile öne çıkar. Büyük ve kurumsal projelerde tercih ediliyor.\n\n🌲 **Cypress** → Sadece JavaScript/TypeScript ile çalışır. Time-travel debugging, anlık screenshot ve kullanımı çok kolay arayüzü ile özellikle JS/TS ekipler arasında popüler. Ancak iframe ve multi-domain desteği kısıtlı.\n\n✅ **Tavsiyem: Playwright** — Hem Python hem TypeScript yoluna mükemmel entegre olur, daha geniş ekosistem ve kurumsal destek sunar.`,
        },

        userChoice: {
            L_ZERO: 'Tamamen sıfırım.',
            L_MANUAL: 'Manuel test yapıyorum, otomasyona geçiyorum.',
            L_CODER: 'Kod yazabiliyorum.',
            LANG_JAVA: 'Java ile ilerlemek istiyorum.',
            LANG_PYTHON: 'Python ile ilerlemek istiyorum.',
            LANG_TYPESCRIPT: 'TypeScript ile ilerlemek istiyorum.',
            LANG_UNDECIDED: 'Kararsızım — sen öner.',
            TOOL_SELENIUM: 'Selenium ile devam.',
            TOOL_PLAYWRIGHT: 'Playwright ile devam.',
            TOOL_BOTH: 'İkisini de öğrenmek istiyorum.',
            TIME_LOW: 'Haftada 3-5 saat ayırabilirim.',
            TIME_MID: 'Haftada 6-10 saat ayırabilirim.',
            TIME_HIGH: 'Haftada 10+ saat ayırabilirim.',
        },
        mapReady: '✨ Haritanı hazırladım! Seçimlerine göre kişiselleştirilmiş QA yol haritanı aşağıda görebilirsin.',
        restart: 'Haritamı Yeniden Oluştur',
        progressSafeNote: 'İlerlemen güvende — haritanı yeniden oluşturursan tamamladığın dersler korunur.',
        print: 'Haritamı Yazdır / PDF',
        optional: 'OPSİYONEL',
        mainPath: 'ANA YOL',
        extraTitle: '📌 Ekstra Gelişim Dalları (Opsiyonel)',
        viewTopic: 'Konuya Git →',
        mentorNoteTitle: '🎓 Mentor Notun',
        typing: 'yazılıyor...',
        startCta: '🚀 İlk dersine başla',
        continueCta: '🚀 Devam et',
        estPerWeek: 'sa/hafta',
        estRemaining: 'kalan',
        estFinish: 'bu tempoda bitiş',
        estTotal: 'tahmini toplam',
        hoursShort: 'sa',
        weeksShort: 'hf',
        monthsShort: 'ay',
        statusDone: 'tamamlandı',
    },
    en: {
        welcome: {
            bot: 'Hello! 👋 I\'m LearnQA.dev\'s QA Mentor AI. I\'ll create a personalized **QA Career Mind Map** just for you.',
            bot2: 'I\'ll ask you a few short questions to get started. Ready? 🚀',
        },
        stepLevel: {
            bot: 'Which of these best describes where you are right now?',
            options: [
                { id: 'L_ZERO', label: '🌱 Complete beginner — no software/testing background.' },
                { id: 'L_MANUAL', label: '🧪 Manual tester / know a little code — moving into automation.' },
                { id: 'L_CODER', label: '💻 I can code — I want to learn QA automation systematically.' },
            ],
        },
        ackLevel: {
            L_ZERO: 'A great starting point! Starting from scratch is not a disadvantage — we\'ll build your map on solid foundations. 💪',
            L_MANUAL: 'Manual testing experience is your biggest advantage in automation — you already think in test scenarios, now we\'ll turn that into code! 🎯',
            L_CODER: 'Awesome! With your coding background we\'ll move fast. 🚀',
        },
        // Product decision 2026-07-19: the combined "Python / TypeScript" option was
        // split — the user picks ONE language; the other modern language moves to
        // the map's "Extra Growth Branches" (no more 105-hour double-language load).
        stepLang: {
            bot: 'Which automation language should we build on?',
            options: [
                { id: 'LANG_JAVA', label: '☕ Java — the enterprise classic' },
                { id: 'LANG_PYTHON', label: '🐍 Python — fast and readable start' },
                { id: 'LANG_TYPESCRIPT', label: '🟦 TypeScript — type-safe modern stack' },
                { id: 'LANG_UNDECIDED', label: '🤷 Not sure — you recommend' },
            ],
        },
        langRecommend: {
            bot: '**My recommendation: Java.** ☕\n\nThe vast majority of enterprise QA job postings (banking, telecom, corporate) ask for the Java + Selenium stack, and our deepest content track is built on Java. Once you have a solid Java foundation, switching to Python or TypeScript is easy — the reverse is harder. So I\'m building your map on the **Java path**. 👍',
        },
        // Plan §6.2: one-sentence mentor acknowledgment after every answer — S2 language
        // choice. NOTE: these must stay TOOL-NEUTRAL — the UI tool (Selenium/Playwright)
        // has NOT been asked yet; naming a tool here would contradict question S3.
        ackLang: {
            LANG_JAVA: 'Solid choice! The majority of enterprise QA job postings ask for Java — you\'re investing in a strong foundation. ☕',
            LANG_PYTHON: 'Great pick! Python is the fastest on-ramp into QA automation — its readable syntax has you writing tests within the first week. 🐍',
            LANG_TYPESCRIPT: 'A modern choice! TypeScript\'s type safety catches mistakes in your test code while you\'re still writing it. 🟦',
        },
        stepTool: {
            bot: 'On the **UI automation** side, which tool should we go with?',
            options: [
                { id: 'TOOL_SELENIUM', label: '🔵 Selenium — the industry classic' },
                { id: 'TOOL_PLAYWRIGHT', label: '🎭 Playwright — modern and fast' },
                { id: 'TOOL_BOTH', label: '🏆 Both — the widest job pool' },
            ],
        },
        // Plan §6.2: S3 tool choice acknowledgment
        ackTool: {
            TOOL_SELENIUM: 'The industry classic! QA engineers who know Selenium always find work — most job postings still ask for it. 🔵',
            TOOL_PLAYWRIGHT: 'A modern pick! Auto-wait and Trace Viewer will cut your flaky-test troubles to a minimum. 🎭',
            TOOL_BOTH: 'The widest job pool! Engineers who know both tools are specifically sought out for "Selenium to Playwright migration" projects. 🏆',
        },
        stepTime: {
            bot: 'Last question: how many hours per week can you commit? Be honest — your map\'s time estimate will be calculated from this. 😊',
            options: [
                { id: 'TIME_LOW', label: '🐢 3-5 hours — alongside work/school' },
                { id: 'TIME_MID', label: '🚶 6-10 hours — steady pace' },
                { id: 'TIME_HIGH', label: '🏃 10+ hours — full focus / career-change mode' },
            ],
        },
        ackTime: {
            TIME_LOW: 'Slow but complete — less time doesn\'t cut content, it just stretches the calendar. Consistency beats speed. 🌱',
            TIME_MID: 'The ideal pace! With steady weekly work you\'ll progress surprisingly fast. 💪',
            TIME_HIGH: 'Full focus mode! At this pace you could finish the map in record time. 🔥',
        },
        preparing: '✨ Evaluating your answers, preparing your map...',
        timeOnly: {
            bot: 'Welcome back! 👋 I found your saved roadmap. I just need one answer to calculate your time estimate:',
        },
        // Plan §7 risk 3: abandoned wizard — resume from the question the user left off at
        resumeDraft: {
            bot: 'Welcome back! 👋 Let\'s pick up the questions right where you left off:',
        },
        // Plan §2.2: emphasis badge on "Not sure" when S1 = complete beginner
        recommendedBadge: '✨ Recommended',
        back: '↩ Back',
        // Playwright vs Cypress comparison message (when B_SEL_NO is selected)
        playwrightCypressCompare: {
            bot: `**Playwright vs Cypress — Quick Overview:**

🎭 **Playwright** → Modern automation framework by Microsoft. Supports Python, TypeScript, and Java. Stands out with auto-wait, network stubbing, API testing, Trace Viewer, and parallel test runs. Preferred in large and enterprise projects.

🌲 **Cypress** → Works only with JavaScript/TypeScript. Popular among JS/TS teams for its time-travel debugging, instant screenshots, and very easy-to-use interface. However, iframe and multi-domain support are limited.

✅ **My recommendation: Playwright** — Integrates beautifully with both your Python and TypeScript path, offering a wider ecosystem and enterprise-level support.`,
        },
        userChoice: {
            L_ZERO: 'Complete beginner.',
            L_MANUAL: 'Manual tester, moving into automation.',
            L_CODER: 'I can code.',
            LANG_JAVA: 'I\'ll go with Java.',
            LANG_PYTHON: 'I\'ll go with Python.',
            LANG_TYPESCRIPT: 'I\'ll go with TypeScript.',
            LANG_UNDECIDED: 'Not sure — you recommend.',
            TOOL_SELENIUM: 'Continue with Selenium.',
            TOOL_PLAYWRIGHT: 'Continue with Playwright.',
            TOOL_BOTH: 'I want to learn both.',
            TIME_LOW: 'I can commit 3-5 hours a week.',
            TIME_MID: 'I can commit 6-10 hours a week.',
            TIME_HIGH: 'I can commit 10+ hours a week.',
        },
        mapReady: '✨ Your map is ready! See your personalized QA roadmap below based on your choices.',
        restart: 'Rebuild My Map',
        progressSafeNote: 'Your progress is safe — completed lessons are kept if you rebuild your map.',
        print: 'Print / Save as PDF',
        optional: 'OPTIONAL',
        mainPath: 'MAIN PATH',
        extraTitle: '📌 Extra Growth Branches (Optional)',
        viewTopic: 'Go to Topic →',
        mentorNoteTitle: '🎓 Your Mentor Note',
        typing: 'typing...',
        startCta: '🚀 Start your first lesson',
        continueCta: '🚀 Continue',
        estPerWeek: 'h/week',
        estRemaining: 'remaining',
        estFinish: 'finish at this pace',
        estTotal: 'estimated total',
        hoursShort: 'h',
        weeksShort: 'wk',
        monthsShort: 'mo',
        statusDone: 'completed',
    },
}

// ─── Harita Düğümleri ──────────────────────────────────────────────────────
// estimatedHours: modülün tahmini tamamlama eforu (quiz + pratikler dahil).
// İlk geçiş değerleridir; gerçek içerik hacmine göre kalibrasyonu Sonnet görevi
// S1'de yapılır (bkz. Documents/career-map-feature-plan.md §10).

// SQL node (tüm haritalarda ortak kullanılan obje referansı)
const SQL_NODE = (id) => ({
    id,
    emoji: '🗄️',
    title: { tr: 'SQL', en: 'SQL' },
    desc: { tr: 'Veri doğrulama, JOIN, window functions, DB test', en: 'Data validation, JOINs, window functions, DB testing' },
    route: '/sql',
    color: '#0369a1',
    glow: 'rgba(3,105,161,0.4)',
    isMain: true,
    estimatedHours: 50,
})

// Git & GitHub node
const GIT_GITHUB_NODE = (id) => ({
    id,
    emoji: '🔀',
    title: { tr: 'Git & GitHub', en: 'Git & GitHub' },
    desc: { tr: 'Versiyon kontrolü, branching, pull request, takım çalışması', en: 'Version control, branching, pull requests, collaboration' },
    route: '/git-github',
    color: '#059669',
    glow: 'rgba(5,150,105,0.4)',
    isMain: true,
    estimatedHours: 40,
})

// Linux ana düğüm (tüm haritalarda Docker/Jenkins ana hatta olduğundan Linux artık her yerde ana düğüm)
const LINUX_MAIN_NODE = (id) => ({
    id,
    emoji: '🐧',
    title: { tr: 'Linux', en: 'Linux' },
    desc: { tr: 'Temel komutlar, dosya izinleri, log analizi, bash scripting', en: 'Basic commands, file permissions, log analysis, bash scripting' },
    route: '/linux',
    color: '#ea580c',
    glow: 'rgba(234,88,12,0.4)',
    isMain: true,
    estimatedHours: 20,
})

// Sıfırdan başlayan kullanıcının temel ön eki (MAP_A'nın ilk üç düğümüyle aynı içerik)
const TEST_FUNDAMENTALS_NODE = (id) => ({
    id,
    emoji: '🛡️',
    title: { tr: 'Test Temelleri', en: 'Testing Fundamentals' },
    desc: { tr: 'Yazılım testi nedir, QA vs QC, SDLC, test seviyeleri', en: 'What is software testing, QA vs QC, SDLC, test levels' },
    route: '/what-is-testing',
    color: '#0e7490',
    glow: 'rgba(14,116,144,0.4)',
    isMain: true,
    estimatedHours: 12,
})

const ALGORITHMS_NODE = (id) => ({
    id,
    emoji: '🔢',
    title: { tr: 'Algoritma Temeli', en: 'Algorithm Basics' },
    desc: { tr: 'Mantıksal düşünme, pseudocode, flowchart', en: 'Logical thinking, pseudocode, flowcharts' },
    route: '/algorithms',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
    isMain: true,
    estimatedHours: 18,
})

const MANUAL_TESTING_NODE = (id) => ({
    id,
    emoji: '🧪',
    title: { tr: 'Manuel Test', en: 'Manual Testing' },
    desc: { tr: 'Test case, bug report, exploratory testing', en: 'Test cases, bug reports, exploratory testing' },
    route: '/manual-testing',
    color: '#0891b2',
    glow: 'rgba(8,145,178,0.4)',
    isMain: true,
    estimatedHours: 16,
})

// Java + "ikisi de" seçiminde MAP_C1'e Selenium'dan sonra eklenen overlay düğümü
const PLAYWRIGHT_OVERLAY_NODE = (id) => ({
    id,
    emoji: '🎭',
    title: { tr: 'Playwright', en: 'Playwright' },
    desc: { tr: 'Modern UI otomasyon, auto-wait, Trace Viewer', en: 'Modern UI automation, auto-wait, Trace Viewer' },
    route: '/playwright',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
    isMain: true,
    estimatedHours: 36,
})

// ─── MAP_A: Tamamen sıfırdan başlayanlar ───────────────────────────────────
export const MAP_A = {
    id: 'map_a',
    title: { tr: '🧠 Sıfırdan QA Mühendisi Yol Haritası', en: '🧠 QA Engineer Roadmap from Scratch' },
    subtitle: { tr: 'Yazılım geçmişi olmadan, temelden mülakat seviyesine', en: 'From no coding background to interview level' },
    color: 'from-violet-600 to-fuchsia-600',
    nodes: [
        TEST_FUNDAMENTALS_NODE(1),
        ALGORITHMS_NODE(2),
        MANUAL_TESTING_NODE(3),
        {
            id: 4,
            emoji: '☕',
            title: { tr: 'Java', en: 'Java' },
            desc: { tr: 'OOP, Collections, JUnit — otomasyon dili', en: 'OOP, Collections, JUnit — automation language' },
            route: '/java',
            color: '#d97706',
            glow: 'rgba(217,119,6,0.4)',
            isMain: true,
            estimatedHours: 60,
        },
        GIT_GITHUB_NODE(5),
        {
            id: 6,
            emoji: '🔵',
            title: { tr: 'Selenium', en: 'Selenium' },
            desc: { tr: 'WebDriver, locator, wait stratejileri', en: 'WebDriver, locators, wait strategies' },
            route: '/selenium',
            color: '#2563eb',
            glow: 'rgba(37,99,235,0.4)',
            isMain: true,
            estimatedHours: 40,
        },
        {
            id: 7,
            emoji: '📮',
            title: { tr: 'Postman', en: 'Postman' },
            desc: { tr: 'REST API, request, assertion, Newman', en: 'REST API, requests, assertions, Newman' },
            route: '/postman',
            color: '#ea580c',
            glow: 'rgba(234,88,12,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        SQL_NODE(8),
        {
            id: 9,
            emoji: '🔗',
            title: { tr: 'REST Assured', en: 'REST Assured' },
            desc: { tr: 'Java tabanlı API otomasyon framework\'ü', en: 'Java-based API automation framework' },
            route: '/rest-assured',
            color: '#16a34a',
            glow: 'rgba(22,163,74,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
        LINUX_MAIN_NODE(10),
        {
            id: 11,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Container, image, compose, Selenium Grid', en: 'Containers, images, compose, Selenium Grid' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
        {
            id: 12,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, build, test trigger', en: 'CI/CD pipeline, build, test triggers' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        {
            id: 13,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud test ortamı, EC2, S3, Lambda', en: 'Cloud test environment, EC2, S3, Lambda' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
            estimatedHours: 14,
        },
        {
            id: 14,
            emoji: '⚙️',
            title: { tr: 'Kubernetes', en: 'Kubernetes' },
            desc: { tr: 'Orchestration, pod, deployment, scale', en: 'Orchestration, pods, deployments, scaling' },
            route: '/kubernetes',
            color: '#0f766e',
            glow: 'rgba(15,118,110,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
    ],
    extras: [
        {
            emoji: '📡',
            title: { tr: 'Kafka', en: 'Kafka' },
            desc: { tr: 'Event-driven mimari, consumer, producer test — kariyer +1', en: 'Event-driven architecture, consumer/producer testing — +1 to your career' },
            route: '/kafka',
            color: '#1e1b4b',
        },
        {
            emoji: '📱',
            title: { tr: 'Appium', en: 'Appium' },
            desc: { tr: 'Android/iOS mobil otomasyon — QA kariyerinde +1', en: 'Android/iOS mobile automation — +1 to your QA career' },
            route: '/appium',
            color: '#7c3aed',
        },
        {
            emoji: '🌍',
            title: { tr: 'BrowserStack', en: 'BrowserStack' },
            desc: { tr: 'Cross-browser cloud test — gerçek cihazlar üzerinde', en: 'Cross-browser cloud testing — real devices' },
            route: '/browserstack',
            color: '#6d28d9',
        },
        {
            emoji: '⚡',
            title: { tr: 'JMeter', en: 'JMeter' },
            desc: { tr: 'Yük & performans testi — API + UI stres senaryoları', en: 'Load & performance testing — API + UI stress scenarios' },
            route: '/jmeter',
            color: '#dc2626',
        },
    ],
    mentorNote: {
        tr: `**Doğru yoldasın!** Yazılım geçmişi olmadan QA mühendisliğine başlamak tamamen mümkün — ve bu sıra bunu en hızlı öğrenmenin kanıtlanmış yolu.

Önce **testin ne olduğunu** anla (Test Temelleri), sonra **mantığını** kur (Algoritma), ardından **test refleksini** geliştir (Manuel Test) ve **Java** ile kod yazmayı öğren. Git & GitHub ile versiyon kontrolünü öğrendikten sonra Selenium ile UI otomasyonuna geçtiğinde zaten sağlam bir temel üzerinde olacaksın. **SQL** ise seni çoğu QA mühendisinden ayıran kritik bir beceri — veritabanı doğrulaması yapmadan tam bir test süreci yürütemezsin.

REST Assured ile Java üzerinden API testini kapattıktan sonra sırada **Linux** var — artık bir "bonus" değil, ana hatta: çünkü Docker container'ları, Jenkins agent'ları ve cloud sunucuların hepsi Linux üzerinde çalışır, önce bu işletim sistemini tanımadan container/CI kavramları havada kalır. Bu yüzden **Docker → Jenkins → AWS → Kubernetes** zinciri bu sırada ilerliyor: önce container'ı (Docker) anla, sonra onu CI/CD pipeline'ında (Jenkins) otomatik çalıştırmayı öğren, ardından cloud'a (AWS) taşı, son olarak Kubernetes ile ölçeklendir. Bu zincir seni gerçek bir **SDET (Software Development Engineer in Test)** profili haline getirecek. 💪

💡 **Kafka** artık ana yolda değil — event-driven mimari niş bir konu, temel yığını tamamladıktan sonra bakılacak bir "kariyer +1" ekstrası olarak aşağıda duruyor.`,
        en: `**You're on the right path!** Starting QA engineering without a software background is completely possible — and this sequence is the proven fastest way to get there.

First understand **what testing actually is** (Testing Fundamentals), then build your **logical thinking** (Algorithms), then develop **test instincts** (Manual Testing) and learn to write code with **Java**. After learning version control with Git & GitHub, when you move to Selenium for UI automation, you'll already have a solid foundation. **SQL** is a critical skill that separates you from most QA engineers — you can't run a complete test process without database validation.

After covering API testing with REST Assured, **Linux** comes next — no longer a "bonus," but part of the main track: Docker containers, Jenkins agents, and cloud servers all run on Linux, so without knowing this operating system first, container/CI concepts stay abstract. That's why the **Docker → Jenkins → AWS → Kubernetes** chain follows this order: first understand containers (Docker), then learn to run them automatically in a CI/CD pipeline (Jenkins), then move to the cloud (AWS), and finally scale with Kubernetes. This chain will turn you into a real **SDET (Software Development Engineer in Test)** profile. 💪

💡 **Kafka** is no longer on the main path — event-driven architecture is a niche topic, listed below as a "career +1" extra to explore once you've completed the core stack.`,
    },
}

// ─── MAP_B: Yazılım geçmişi var, Python/TypeScript yolu (Selenium YOK) ────
export const MAP_B = {
    id: 'map_b',
    title: { tr: '🐍 Python / TypeScript QA Yol Haritası', en: '🐍 Python / TypeScript QA Roadmap' },
    subtitle: { tr: 'Modern otomasyon araçlarıyla hızlı ilerleme — Playwright odaklı', en: 'Fast progress with modern tools — Playwright focused' },
    color: 'from-emerald-600 to-teal-600',
    nodes: [
        {
            id: 1,
            emoji: '🐍',
            title: { tr: 'Python', en: 'Python' },
            desc: { tr: 'pytest, Playwright ile otomasyon', en: 'pytest, Playwright automation' },
            route: '/python',
            color: '#15803d',
            glow: 'rgba(21,128,61,0.4)',
            isMain: true,
            estimatedHours: 50,
        },
        {
            id: 2,
            emoji: '🟦',
            title: { tr: 'TypeScript', en: 'TypeScript' },
            desc: { tr: 'Tip güvenli JS, Playwright TS entegrasyonu', en: 'Type-safe JS, Playwright TS integration' },
            route: '/typescript',
            color: '#1d4ed8',
            glow: 'rgba(29,78,216,0.4)',
            isMain: true,
            estimatedHours: 55,
        },
        GIT_GITHUB_NODE(3),
        {
            id: 4,
            emoji: '🎭',
            title: { tr: 'Playwright', en: 'Playwright' },
            desc: { tr: 'Modern UI otomasyon, auto-wait, API test, Trace Viewer', en: 'Modern UI automation, auto-wait, API testing, Trace Viewer' },
            route: '/playwright',
            color: '#7c3aed',
            glow: 'rgba(124,58,237,0.4)',
            isMain: true,
            estimatedHours: 36,
        },
        {
            id: 5,
            emoji: '📮',
            title: { tr: 'Postman', en: 'Postman' },
            desc: { tr: 'REST API, environment, Newman/CI', en: 'REST API, environments, Newman/CI' },
            route: '/postman',
            color: '#ea580c',
            glow: 'rgba(234,88,12,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        SQL_NODE(6),   // ← SQL: Postman'dan sonra
        LINUX_MAIN_NODE(7),
        {
            id: 8,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Test ortamı containerize etme', en: 'Containerizing test environments' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.35)',
            isMain: true,
            estimatedHours: 24,
        },
        {
            id: 9,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, paralel test çalıştırma', en: 'CI/CD pipelines, parallel test execution' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        {
            id: 10,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud test altyapısı, Lambda, S3', en: 'Cloud test infrastructure, Lambda, S3' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
            estimatedHours: 14,
        },
    ],
    extras: [
        {
            emoji: '📱',
            title: { tr: 'Appium', en: 'Appium' },
            desc: { tr: 'Android/iOS mobil otomasyon — Python + Appium güçlü', en: 'Android/iOS mobile automation — Python + Appium is powerful' },
            route: '/appium',
            color: '#7c3aed',
        },
        {
            emoji: '⚡',
            title: { tr: 'JMeter', en: 'JMeter' },
            desc: { tr: 'Yük testi, API performansı, stres senaryoları', en: 'Load testing, API performance, stress scenarios' },
            route: '/jmeter',
            color: '#dc2626',
        },
        {
            emoji: '🌍',
            title: { tr: 'BrowserStack', en: 'BrowserStack' },
            desc: { tr: 'Cross-browser cloud test altyapısı', en: 'Cross-browser cloud testing platform' },
            route: '/browserstack',
            color: '#7c3aed',
        },
        {
            emoji: '🌲',
            title: { tr: 'Cypress', en: 'Cypress' },
            desc: { tr: 'JS/TS alternatif — time-travel debugging', en: 'JS/TS alternative — time-travel debugging' },
            route: '/cypress',
            color: '#16a34a',
        },
        {
            emoji: '🔷',
            title: { tr: 'Azure DevOps', en: 'Azure DevOps' },
            desc: { tr: 'Microsoft ekosistemi CI/CD alternatifi', en: 'Microsoft ecosystem CI/CD alternative' },
            route: '/azure',
            color: '#0369a1',
        },
    ],
    mentorNote: {
        tr: `**Harika bir tercih!** Python + TypeScript + Playwright kombinasyonu seni sektörün en modern QA stack'iyle donatıyor.

**Playwright**'ı tavsiye etmemizin nedeni: Hem Python hem TypeScript'i mükemmel destekler, **auto-wait** ile flaky test sorunu minimuma iner, **Trace Viewer** ile hataları video/screenshot/network üzerinden debug edebilirsin ve büyük kurumsal projelerde giderek artan talep görüyor.

**SQL** bilgisi seni çoğu QA mühendisinden ayıran kritik bir beceri — veri doğrulaması olmadan tam bir test süreci yürütülemez. **Linux** artık ana hatta: Docker container'ları ve Jenkins agent'ları Linux üzerinde çalıştığından, önce bu işletim sistemini kavraman gerekiyor. Docker → Jenkins → AWS zinciri ise seni takım ortamında CI/CD süreçlerini yönetebilir hale getirir. 🚀`,
        en: `**Excellent choice!** The Python + TypeScript + Playwright combination equips you with the most modern QA stack in the industry.

Why we recommend **Playwright**: It perfectly supports both Python and TypeScript, **auto-wait** minimizes flaky test issues, **Trace Viewer** lets you debug failures via video/screenshot/network recordings, and it's seeing increasing demand in large enterprise projects.

**SQL** knowledge separates you from most QA engineers — a complete test process can't run without data validation. **Linux** is now part of the main track: since Docker containers and Jenkins agents run on Linux, understanding this operating system first is essential. The Docker → Jenkins → AWS chain makes you capable of managing CI/CD processes in team environments. 🚀`,
    },
}

// ─── MAP_B_SEL: Python/TypeScript + Selenium dahil ────────────────────────
export const MAP_B_SEL = {
    id: 'map_b_sel',
    title: { tr: '🐍 Python / TypeScript + Selenium QA Yol Haritası', en: '🐍 Python / TypeScript + Selenium QA Roadmap' },
    subtitle: { tr: 'Modern diller + sektörün köklü klasiği', en: 'Modern languages + the industry\'s established classic' },
    color: 'from-emerald-600 to-blue-600',
    nodes: [
        {
            id: 1,
            emoji: '🐍',
            title: { tr: 'Python', en: 'Python' },
            desc: { tr: 'pytest, Selenium/Playwright ile otomasyon', en: 'pytest, Selenium/Playwright automation' },
            route: '/python',
            color: '#15803d',
            glow: 'rgba(21,128,61,0.4)',
            isMain: true,
            estimatedHours: 50,
        },
        {
            id: 2,
            emoji: '🟦',
            title: { tr: 'TypeScript', en: 'TypeScript' },
            desc: { tr: 'Tip güvenli JS, Playwright TS entegrasyonu', en: 'Type-safe JS, Playwright TS integration' },
            route: '/typescript',
            color: '#1d4ed8',
            glow: 'rgba(29,78,216,0.4)',
            isMain: true,
            estimatedHours: 55,
        },
        GIT_GITHUB_NODE(3),
        {
            id: 4,
            emoji: '🔵',
            title: { tr: 'Selenium', en: 'Selenium' },
            desc: { tr: 'WebDriver Python, POM, locator, wait — sektör klasiği', en: 'Selenium Python/TS, POM, locators, waits — industry classic' },
            route: '/selenium',
            color: '#2563eb',
            glow: 'rgba(37,99,235,0.4)',
            isMain: true,
            estimatedHours: 40,
        },
        {
            id: 5,
            emoji: '🎭',
            title: { tr: 'Playwright', en: 'Playwright' },
            desc: { tr: 'Modern UI otomasyon, auto-wait, API test', en: 'Modern UI automation, auto-wait, API testing' },
            route: '/playwright',
            color: '#7c3aed',
            glow: 'rgba(124,58,237,0.4)',
            isMain: true,
            estimatedHours: 36,
        },
        {
            id: 6,
            emoji: '📮',
            title: { tr: 'Postman', en: 'Postman' },
            desc: { tr: 'REST API, environment, Newman/CI', en: 'REST API, environments, Newman/CI' },
            route: '/postman',
            color: '#ea580c',
            glow: 'rgba(234,88,12,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        SQL_NODE(7),   // ← SQL: Postman'dan sonra
        LINUX_MAIN_NODE(8),
        {
            id: 9,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Selenium Grid + Playwright containerize', en: 'Selenium Grid + Playwright containerization' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.35)',
            isMain: true,
            estimatedHours: 24,
        },
        {
            id: 10,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, paralel test çalıştırma', en: 'CI/CD pipelines, parallel test execution' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        {
            id: 11,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud test altyapısı, Lambda, S3', en: 'Cloud test infrastructure, Lambda, S3' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
            estimatedHours: 14,
        },
    ],
    extras: [
        {
            emoji: '📱',
            title: { tr: 'Appium', en: 'Appium' },
            desc: { tr: 'Android/iOS mobil otomasyon — Python + Appium güçlü', en: 'Android/iOS mobile automation — Python + Appium is powerful' },
            route: '/appium',
            color: '#7c3aed',
        },
        {
            emoji: '⚡',
            title: { tr: 'JMeter', en: 'JMeter' },
            desc: { tr: 'Yük testi, API performansı, stres senaryoları', en: 'Load testing, API performance, stress scenarios' },
            route: '/jmeter',
            color: '#dc2626',
        },
        {
            emoji: '🌍',
            title: { tr: 'BrowserStack', en: 'BrowserStack' },
            desc: { tr: 'Cross-browser cloud test — Selenium + Playwright', en: 'Cross-browser cloud — Selenium + Playwright' },
            route: '/browserstack',
            color: '#7c3aed',
        },
        {
            emoji: '🌲',
            title: { tr: 'Cypress', en: 'Cypress' },
            desc: { tr: 'JS/TS alternatif — time-travel debugging', en: 'JS/TS alternative — time-travel debugging' },
            route: '/cypress',
            color: '#16a34a',
        },
        {
            emoji: '🔷',
            title: { tr: 'Azure DevOps', en: 'Azure DevOps' },
            desc: { tr: 'Microsoft ekosistemi CI/CD alternatifi', en: 'Microsoft ecosystem CI/CD alternative' },
            route: '/azure',
            color: '#0369a1',
        },
    ],
    mentorNote: {
        tr: `**Güçlü bir seçim!** Hem **Selenium** hem **Playwright** bilen bir QA mühendisi olarak çok geniş bir iş havuzuna hitap edeceksin.

Selenium ile Python'un birlikteliği kurumsal projelerde hâlâ yaygın — özellikle legacy test altyapılarında vazgeçilmez. **Playwright** ise onu tamamlıyor: auto-wait, trace viewer ve paralel çalıştırma ile modern projelerin gözdesi. İki aracı da bilen biri olarak "Selenium'dan Playwright'a geçiş" projelerinde özellikle aranacaksın.

**SQL** her iki aracın test sürecinde de kritik rol oynar — veritabanı doğrulaması olmadan API veya UI testleri eksik kalır. **Linux** artık ana hatta: Selenium Grid ve Playwright container'ları sunucularda Linux üzerinde çalışır. Docker → Jenkins → AWS zinciri ise her şeyi CI/CD ortamına taşımanı sağlar. 🏆`,
        en: `**A powerful choice!** As a QA engineer who knows both **Selenium** and **Playwright**, you'll appeal to a very wide job pool.

Selenium's combination with Python is still common in enterprise projects — especially indispensable in legacy test infrastructures. **Playwright** complements it: the darling of modern projects with auto-wait, trace viewer, and parallel execution. Knowing both, you'll be specifically sought out for "Selenium to Playwright migration" projects.

**SQL** plays a critical role in the test process for both tools — API or UI tests are incomplete without database validation. **Linux** is now part of the main track: Selenium Grid and Playwright containers run on Linux servers. The Docker → Jenkins → AWS chain lets you move everything into a CI/CD environment. 🏆`,
    },
}

// ─── MAP_C1: Yazılım geçmişi var, Java + Selenium yolu ────────────────────
export const MAP_C1 = {
    id: 'map_c1',
    title: { tr: '☕ Java + Selenium QA Yol Haritası', en: '☕ Java + Selenium QA Roadmap' },
    subtitle: { tr: 'Sektörün kanıtlanmış klasik stack\'i', en: 'The industry\'s proven classic stack' },
    color: 'from-blue-600 to-indigo-600',
    nodes: [
        {
            id: 1,
            emoji: '☕',
            title: { tr: 'Java', en: 'Java' },
            desc: { tr: 'OOP, Collections, JUnit — hızlı başlangıç', en: 'OOP, Collections, JUnit — fast start' },
            route: '/java',
            color: '#d97706',
            glow: 'rgba(217,119,6,0.4)',
            isMain: true,
            estimatedHours: 60,
        },
        GIT_GITHUB_NODE(2),
        {
            id: 3,
            emoji: '🔵',
            title: { tr: 'Selenium', en: 'Selenium' },
            desc: { tr: 'WebDriver, POM, locator, wait stratejileri', en: 'WebDriver, POM, locators, wait strategies' },
            route: '/selenium',
            color: '#2563eb',
            glow: 'rgba(37,99,235,0.4)',
            isMain: true,
            estimatedHours: 40,
        },
        {
            id: 4,
            emoji: '📮',
            title: { tr: 'Postman', en: 'Postman' },
            desc: { tr: 'API test, collection, environment', en: 'API testing, collections, environments' },
            route: '/postman',
            color: '#ea580c',
            glow: 'rgba(234,88,12,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        SQL_NODE(5),   // ← SQL: Postman'dan sonra, REST Assured'dan önce
        {
            id: 6,
            emoji: '🔗',
            title: { tr: 'REST Assured', en: 'REST Assured' },
            desc: { tr: 'Java API otomasyon, schema validation', en: 'Java API automation, schema validation' },
            route: '/rest-assured',
            color: '#16a34a',
            glow: 'rgba(22,163,74,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
        LINUX_MAIN_NODE(7),
        {
            id: 8,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Selenium Grid containerize, test izolasyonu', en: 'Selenium Grid containerization, test isolation' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
        {
            id: 9,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, Maven/Gradle entegrasyonu', en: 'CI/CD pipelines, Maven/Gradle integration' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        {
            id: 10,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud ölçekli test çalıştırma ortamı', en: 'Cloud-scale test execution environment' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
            estimatedHours: 14,
        },
        {
            id: 11,
            emoji: '⚙️',
            title: { tr: 'Kubernetes', en: 'Kubernetes' },
            desc: { tr: 'Distributed test execution, pod yönetimi', en: 'Distributed test execution, pod management' },
            route: '/kubernetes',
            color: '#0f766e',
            glow: 'rgba(15,118,110,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
    ],
    extras: [
        {
            emoji: '📱',
            title: { tr: 'Appium', en: 'Appium' },
            desc: { tr: 'Android/iOS mobil otomasyon', en: 'Android/iOS mobile automation' },
            route: '/appium',
            color: '#7c3aed',
        },
        {
            emoji: '⚡',
            title: { tr: 'JMeter', en: 'JMeter' },
            desc: { tr: 'Yük testi, performans ölçümü', en: 'Load testing, performance measurement' },
            route: '/jmeter',
            color: '#dc2626',
        },
        {
            emoji: '🌍',
            title: { tr: 'BrowserStack', en: 'BrowserStack' },
            desc: { tr: 'Cross-browser cloud test altyapısı', en: 'Cross-browser cloud testing platform' },
            route: '/browserstack',
            color: '#6d28d9',
        },
        {
            emoji: '📡',
            title: { tr: 'Kafka', en: 'Kafka' },
            desc: { tr: 'Event-driven sistem testi, async doğrulama', en: 'Event-driven system testing, async validation' },
            route: '/kafka',
            color: '#1e1b4b',
        },
    ],
    mentorNote: {
        tr: `**Klasik ama güçlü bir seçim!** Java + Selenium stack'i hâlâ sektörde en yaygın kullanılan kombinasyon — büyük kurumsal şirketlerin büyük çoğunluğu bu ekosistemde çalışıyor.

Yazılım geçmişin varsa **Java**'ya adaptasyon çok hızlı olacak. Selenium ile **Page Object Model (POM)** öğrendiğinde test kodunu maintainable tutmanın gerçek anlamını kavrayacaksın. **SQL** ise seni rakiplerinden ayıran kritik beceri — Postman ile API testi yaparken bile veritabanındaki gerçek veriye bakman gerekiyor.

REST Assured ile Java üzerinden API testini kapattığında UI + API testini tek dilde yöneteceksin. Sırada **Linux** var — artık ana hatta, çünkü Selenium Grid'i containerize edeceğin Docker ve onu tetikleyen Jenkins agent'ları Linux sunucularda çalışır. Docker → Jenkins → AWS → Kubernetes zinciri seni tam **DevOps-aware SDET** profiline götürür. 🏆`,
        en: `**A classic but powerful choice!** The Java + Selenium stack is still the most widely used combination in the industry — the vast majority of large enterprise companies work in this ecosystem.

If you have a software background, **Java** adaptation will be very quick. Learning the **Page Object Model (POM)** with Selenium will make you truly understand what maintainable test code means. **SQL** is the critical skill that separates you from competitors — even when API testing with Postman, you often need to check the actual data in the database.

When you complete API testing with REST Assured, you'll manage UI + API testing in a single language. **Linux** comes next — now part of the main track, since the Docker containers hosting your Selenium Grid and the Jenkins agents triggering them both run on Linux servers. The Docker → Jenkins → AWS → Kubernetes chain takes you to a full **DevOps-aware SDET** profile. 🏆`,
    },
}

// ─── MAP_C2: Yazılım geçmişi var, Java + Playwright yolu ──────────────────
export const MAP_C2 = {
    id: 'map_c2',
    title: { tr: '🎭 Java + Playwright QA Yol Haritası', en: '🎭 Java + Playwright QA Roadmap' },
    subtitle: { tr: 'Modern araçlarla kurumsal Java güçlü kombinasyon', en: 'Modern tools combined with enterprise Java power' },
    color: 'from-purple-600 to-violet-600',
    nodes: [
        {
            id: 1,
            emoji: '☕',
            title: { tr: 'Java', en: 'Java' },
            desc: { tr: 'OOP, Collections, JUnit — güçlü temel', en: 'OOP, Collections, JUnit — strong foundation' },
            route: '/java',
            color: '#d97706',
            glow: 'rgba(217,119,6,0.4)',
            isMain: true,
            estimatedHours: 60,
        },
        GIT_GITHUB_NODE(2),
        {
            id: 3,
            emoji: '🎭',
            title: { tr: 'Playwright', en: 'Playwright' },
            desc: { tr: 'Modern UI otomasyon, auto-wait, trace viewer', en: 'Modern UI automation, auto-wait, trace viewer' },
            route: '/playwright',
            color: '#7c3aed',
            glow: 'rgba(124,58,237,0.4)',
            isMain: true,
            estimatedHours: 36,
        },
        {
            id: 4,
            emoji: '🔗',
            title: { tr: 'REST Assured', en: 'REST Assured' },
            desc: { tr: 'Java tabanlı API otomasyon + Playwright API test', en: 'Java-based API automation + Playwright API testing' },
            route: '/rest-assured',
            color: '#16a34a',
            glow: 'rgba(22,163,74,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
        SQL_NODE(5),   // ← SQL: REST Assured'dan sonra
        LINUX_MAIN_NODE(6),
        {
            id: 7,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Playwright containerize, headless test ortamı', en: 'Playwright containerization, headless test env' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
        {
            id: 8,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD, paralel Playwright test koşusu', en: 'CI/CD, parallel Playwright test runs' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
            estimatedHours: 20,
        },
        {
            id: 9,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Serverless test çalıştırma, cloud altyapı', en: 'Serverless test execution, cloud infrastructure' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
            estimatedHours: 14,
        },
        {
            id: 10,
            emoji: '⚙️',
            title: { tr: 'Kubernetes', en: 'Kubernetes' },
            desc: { tr: 'Distributed Playwright koşusu, pod scaling', en: 'Distributed Playwright runs, pod scaling' },
            route: '/kubernetes',
            color: '#0f766e',
            glow: 'rgba(15,118,110,0.4)',
            isMain: true,
            estimatedHours: 24,
        },
    ],
    extras: [
        {
            emoji: '📱',
            title: { tr: 'Appium', en: 'Appium' },
            desc: { tr: 'Mobil otomasyon — Android/iOS, Java + Appium güçlü eşleşme', en: 'Mobile automation — Android/iOS, Java + Appium powerful combo' },
            route: '/appium',
            color: '#7c3aed',
        },
        {
            emoji: '⚡',
            title: { tr: 'JMeter', en: 'JMeter' },
            desc: { tr: 'Yük testi, performans ölçümü, API stres senaryoları', en: 'Load testing, performance measurement, API stress scenarios' },
            route: '/jmeter',
            color: '#dc2626',
        },
        {
            emoji: '🌍',
            title: { tr: 'BrowserStack', en: 'BrowserStack' },
            desc: { tr: 'Cross-browser cloud — Playwright gerçek cihaz testi', en: 'Cross-browser cloud — Playwright real device testing' },
            route: '/browserstack',
            color: '#6d28d9',
        },
        {
            emoji: '🌲',
            title: { tr: 'Cypress', en: 'Cypress' },
            desc: { tr: 'JS/TS alternatif — time-travel debugging', en: 'JS/TS alternative — time-travel debugging' },
            route: '/cypress',
            color: '#16a34a',
        },
        {
            emoji: '🔷',
            title: { tr: 'Azure DevOps', en: 'Azure DevOps' },
            desc: { tr: 'Microsoft ekosistemi CI/CD alternatifi', en: 'Microsoft ecosystem CI/CD alternative' },
            route: '/azure',
            color: '#0369a1',
        },
    ],
    mentorNote: {
        tr: `**Geleceğe yönelik mükemmel bir seçim!** Java + Playwright kombinasyonu kurumsal güçle modern hızı birleştiriyor.

Playwright'ın **auto-wait** mekanizması Selenium'un flaky test sorunlarını büyük ölçüde ortadan kaldırıyor. **Trace Viewer** ile test hatalarını video/screenshot/network kaydı üzerinden debug edebileceksin — hiçbir Selenium suite'inde bu out-of-the-box gelmiyor.

**SQL** hem REST Assured hem Playwright süreçlerinde kritik — veritabanı doğrulaması olmadan UI/API testleri eksik kalır. Sırada **Linux** var — artık ana hatta, çünkü Playwright'ı containerize edeceğin Docker ve onu tetikleyen Jenkins pipeline'ları Linux sunucularda çalışır. Şirketlerin "Playwright geçiş" projelerinde sana özel talep olacak. 🌟`,
        en: `**An excellent future-oriented choice!** The Java + Playwright combination merges enterprise power with modern speed.

Playwright's **auto-wait** mechanism largely eliminates Selenium's flaky test problems. With **Trace Viewer**, you'll debug failures via video/screenshot/network recordings — nothing comes out-of-the-box like this in Selenium suites.

**SQL** is critical in both REST Assured and Playwright processes — UI/API tests are incomplete without database validation. **Linux** comes next — now part of the main track, since the Docker containers hosting your Playwright runs and the Jenkins pipelines triggering them both run on Linux servers. Companies doing "Playwright migration" projects will specifically seek you out. 🌟`,
    },
}

export const ALL_MAPS = {
    map_a: MAP_A,
    map_b: MAP_B,
    map_b_sel: MAP_B_SEL,
    map_c1: MAP_C1,
    map_c2: MAP_C2,
}

// ─── Parametrik Katman (v2) ────────────────────────────────────────────────
// Kişiselleştirme = şablon (5 harita) + parametrik katman. Şablonlar sabit
// kalır; seviye ön eki ve araç overlay'i çalışma zamanında bindirilir
// (bkz. Documents/career-map-feature-plan.md §3 ve §5.2).

// ─── Tek-dil modern yol katmanı (ürün kararı 2026-07-19) ───────────────────
// Kullanıcı Python VEYA TypeScript seçer; MAP_B/MAP_B_SEL şablonundan
// seçilmeyen dil düğümü çıkarılır, "kariyer +1" ekstrasına taşınır, başlık ve
// mentor notu seçilen dile göre parametrik olarak değişir. Eski profillerdeki
// lang:'modern' değeri bu katmana girmez — iki dilli haritası aynen korunur.
const SINGLE_LANG_META = {
    python: { emoji: '🐍', label: 'Python', dropRoute: '/typescript' },
    typescript: { emoji: '🟦', label: 'TypeScript', dropRoute: '/python' },
}

const SINGLE_LANG_EXTRA_DESC = {
    tr: 'İkinci otomasyon dili — ana yol bitince kariyer +1',
    en: 'Second automation language — career +1 after the main path',
}

const SINGLE_LANG_NOTES = {
    python: {
        map_b: {
            tr: `**Harika bir tercih!** Python, QA otomasyonuna en hızlı giriş yapılan dil — okunaklı sözdizimi sayesinde ilk haftadan test yazmaya başlayacaksın.

**Playwright** ile pytest ekosistemi sana auto-wait, Trace Viewer ve paralel koşum gibi modern güçler verir; flaky test derdi en aza iner. **SQL** seni veri doğrulamada rakiplerinden ayırır, **Linux** container dünyasına hazırlar; Docker → Jenkins → AWS zinciriyle CI/CD'yi uçtan uca yönetirsin. 🚀

💡 **TypeScript**'i şimdilik dert etme — ana yolu bitirdikten sonra "Ekstra Gelişim Dalları"nda ikinci dil olarak seni bekliyor.`,
            en: `**An excellent choice!** Python is the fastest on-ramp into QA automation — its readable syntax has you writing tests within the first week.

With **Playwright**, the pytest ecosystem gives you modern powers like auto-wait, Trace Viewer, and parallel runs — flaky-test pain drops to a minimum. **SQL** sets you apart in data validation, **Linux** prepares you for the container world; the Docker → Jenkins → AWS chain lets you manage CI/CD end to end. 🚀

💡 Don't worry about **TypeScript** for now — it's waiting in "Extra Growth Branches" as your second language once the main path is done.`,
        },
        map_b_sel: {
            tr: `**Güçlü bir seçim!** Python + Selenium, kurumsal projelerde hâlâ en yaygın ikililerden — pytest ile birleşince hem legacy hem modern projelerde iş görürsün.

**Selenium** sana sektörün klasiğini, **Playwright** auto-wait ve Trace Viewer'lı modern dünyayı öğretir — iki aracı da bilen mühendis "Selenium'dan Playwright'a geçiş" projelerinde özellikle aranır. **SQL** ve **Linux** hattından sonra Docker → Jenkins → AWS zinciri seni CI/CD'ye taşır. 🏆

💡 **TypeScript** ana yolu bitirince "Ekstra Gelişim Dalları"nda ikinci dil olarak seni bekliyor.`,
            en: `**A powerful choice!** Python + Selenium is still one of the most common pairings in enterprise projects — combined with pytest, you'll be useful on both legacy and modern codebases.

**Selenium** teaches you the industry classic, **Playwright** the modern world of auto-wait and Trace Viewer — engineers who know both are specifically sought for "Selenium to Playwright migration" projects. After the **SQL** and **Linux** track, the Docker → Jenkins → AWS chain carries you into CI/CD. 🏆

💡 **TypeScript** is waiting in "Extra Growth Branches" as your second language once the main path is done.`,
        },
    },
    typescript: {
        map_b: {
            tr: `**Modern bir tercih!** TypeScript, tip güvenliğiyle test kodundaki hataları daha sen yazarken yakalar — büyük test projelerinde bakım maliyetini ciddi düşürür.

**Playwright** TypeScript ile birinci sınıf çalışır: auto-wait, Trace Viewer, paralel koşum ve tam IDE desteği. **SQL** seni veri doğrulamada rakiplerinden ayırır, **Linux** container dünyasına hazırlar; Docker → Jenkins → AWS zinciriyle CI/CD'yi uçtan uca yönetirsin. 🚀

💡 **Python**'u şimdilik dert etme — ana yolu bitirdikten sonra "Ekstra Gelişim Dalları"nda ikinci dil olarak seni bekliyor.`,
            en: `**A modern choice!** TypeScript's type safety catches mistakes in your test code while you're still writing it — dramatically cutting maintenance costs in large test projects.

**Playwright** works first-class with TypeScript: auto-wait, Trace Viewer, parallel runs, and full IDE support. **SQL** sets you apart in data validation, **Linux** prepares you for the container world; the Docker → Jenkins → AWS chain lets you manage CI/CD end to end. 🚀

💡 Don't worry about **Python** for now — it's waiting in "Extra Growth Branches" as your second language once the main path is done.`,
        },
        map_b_sel: {
            tr: `**Cesur ve modern bir seçim!** TypeScript'in tip güvenliği büyük test projelerinde hataları daha yazarken yakalar; Selenium ile sektörün klasiğini de kapsıyorsun.

**Selenium** sana köklü kurumsal dünyayı, **Playwright** TypeScript ile birinci sınıf çalışan modern otomasyonu öğretir — iki aracı da bilen mühendis geniş bir iş havuzuna hitap eder. **SQL** ve **Linux** hattından sonra Docker → Jenkins → AWS zinciri seni CI/CD'ye taşır. 🏆

💡 **Python** ana yolu bitirince "Ekstra Gelişim Dalları"nda ikinci dil olarak seni bekliyor.`,
            en: `**A bold, modern choice!** TypeScript's type safety catches mistakes in large test projects as you write; with Selenium you also cover the industry classic.

**Selenium** teaches you the established enterprise world, **Playwright** the modern automation that works first-class with TypeScript — knowing both tools opens a wide job pool. After the **SQL** and **Linux** track, the Docker → Jenkins → AWS chain carries you into CI/CD. 🏆

💡 **Python** is waiting in "Extra Growth Branches" as your second language once the main path is done.`,
        },
    },
}

// Sıfırdan başlayan kullanıcı için temel ön eki (MAP_A dışındaki haritaların başına eklenir)
export const ZERO_PREFIX_NODES = [
    TEST_FUNDAMENTALS_NODE(0),
    ALGORITHMS_NODE(0),
    MANUAL_TESTING_NODE(0),
]

// Manuel testçi ön eki: yalnız algoritma hızlı tempo tekrarı. Manuel Test dersi
// haritaya bilinçli olarak EKLENMEZ — kullanıcı zaten manuel test bildiğini
// söyledi, dersler kişinin seviyesine göre gösterilir (ürün kararı 2026-07-19;
// plan §3.1'deki eski "gözden geçir rozetiyle göster" yaklaşımı iptal edildi).
export const MANUAL_PREFIX_NODES = [
    {
        ...ALGORITHMS_NODE(0),
        desc: { tr: 'Mantıksal düşünme — hızlı tempo tekrarı', en: 'Logical thinking — fast-paced refresher' },
        estimatedHours: 10,
    },
]

// Sihirbaz cevaplarından temel şablonu seçer
export function pickBaseMapId(answers) {
    const { level, lang, uiTool } = answers || {}
    if (lang === 'java') {
        // MAP_A zaten "sıfır + Java + Selenium" yolunun tam halidir (temel ön eki içinde)
        if (level === 'zero' && uiTool === 'selenium') return 'map_a'
        return uiTool === 'playwright' ? 'map_c2' : 'map_c1'
    }
    // Modern dil yolu: Selenium isteği (tek ya da "ikisi de") MAP_B_SEL'e gider
    return uiTool === 'playwright' ? 'map_b' : 'map_b_sel'
}

// Profildeki cevaplara göre nihai haritayı üretir: şablon + ön ek + overlay.
// answers.lang yoksa (v1 career_goal migrasyonu) şablon olduğu gibi döner.
export function resolveMap(profile) {
    if (!profile) return null
    const answers = profile.answers || {}
    const baseId = answers.lang ? pickBaseMapId(answers) : profile.mapId
    const base = ALL_MAPS[baseId]
    if (!base) return null

    let nodes = [...base.nodes]
    let title = base.title
    let subtitle = base.subtitle
    let mentorNote = base.mentorNote
    let extras = base.extras

    // Tek-dil modern yol (ürün kararı 2026-07-19): seçilmeyen dil ana yoldan
    // çıkarılıp ekstralara taşınır; başlık/mentor notu seçilen dile göre değişir.
    // Eski profillerdeki lang:'modern' bu bloğa girmez, iki dilli harita korunur.
    const singleLang = SINGLE_LANG_META[answers.lang]
    if (singleLang && (baseId === 'map_b' || baseId === 'map_b_sel')) {
        const dropped = nodes.find((n) => n.route === singleLang.dropRoute)
        nodes = nodes.filter((n) => n.route !== singleLang.dropRoute)
        if (dropped) {
            extras = [
                { emoji: dropped.emoji, title: dropped.title, desc: SINGLE_LANG_EXTRA_DESC, route: dropped.route, color: dropped.color },
                ...base.extras,
            ]
        }
        const selPart = baseId === 'map_b_sel' ? ' + Selenium' : ''
        title = {
            tr: `${singleLang.emoji} ${singleLang.label}${selPart} QA Yol Haritası`,
            en: `${singleLang.emoji} ${singleLang.label}${selPart} QA Roadmap`,
        }
        if (baseId === 'map_b_sel') {
            subtitle = { tr: 'Modern dil + sektörün köklü klasiği', en: 'A modern language + the industry\'s established classic' }
        }
        mentorNote = SINGLE_LANG_NOTES[answers.lang][baseId]
    }

    // Java + "ikisi de": Selenium'dan hemen sonra Playwright düğümü bindirilir
    if (answers.lang === 'java' && answers.uiTool === 'both' && !nodes.some((n) => n.route === '/playwright')) {
        const selIdx = nodes.findIndex((n) => n.route === '/selenium')
        if (selIdx !== -1) nodes.splice(selIdx + 1, 0, PLAYWRIGHT_OVERLAY_NODE(0))
    }

    // Seviye ön eki (MAP_A temeli zaten içerdiğinden ona uygulanmaz)
    if (baseId !== 'map_a') {
        if (answers.level === 'zero') nodes = [...ZERO_PREFIX_NODES, ...nodes]
        else if (answers.level === 'manual') nodes = [...MANUAL_PREFIX_NODES, ...nodes]
    }

    // Adım numaraları baştan sona yeniden verilir (ön ek/overlay sonrası teklik)
    nodes = nodes.map((n, i) => ({ ...n, id: i + 1 }))

    return { ...base, title, subtitle, mentorNote, extras, nodes }
}
