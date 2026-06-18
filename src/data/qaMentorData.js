// src/data/qaMentorData.js
// QA Mentor AI — Kişiselleştirilmiş Zihin Haritası Veri Dosyası

export const MENTOR_STEPS = {
    STEP_1: 'step1',
    STEP_2: 'step2',
    STEP_3: 'step3',
    STEP_B_SELENIUM: 'step_b_selenium',  // Python/TS → Selenium istiyor mu?
    MAP_A: 'map_a',
    MAP_B: 'map_b',
    MAP_B_SEL: 'map_b_sel',              // Python/TS + Selenium dahil
    MAP_C1: 'map_c1',
    MAP_C2: 'map_c2',
}

// ─── Mülakat Diyalog Metinleri ─────────────────────────────────────────────
export const DIALOG = {
    tr: {
        welcome: {
            bot: 'Merhaba! 👋 Ben LearnQA.dev\'in QA Akıl Hocasıyım. Sana özel bir **QA Kariyer Zihin Haritası** çıkaracağım.',
            bot2: 'Bunun için sana birkaç kısa soru soracağım. Hazır mısın? 🚀',
        },
        step1: {
            bot: 'Daha önce herhangi bir **yazılım veya kodlama** geçmişin ya da deneyimin var mı?',
            options: [
                { id: 'A', label: '🚫 Hayır, hiç yazılım geçmişim yok — tamamen sıfırım.' },
                { id: 'B', label: '✅ Evet, yazılım geçmişim / deneyimim var.' },
            ],
        },
        step2: {
            bot: 'Harika! Sitemizde ana dillerimizden biri **Java**. Yolculuğa direkt Java ile başlamak ister misin?',
            options: [
                { id: 'B1', label: '☕ Evet, Java ile başlamak istiyorum.' },
                { id: 'B2', label: '🐍 Hayır, Python veya TypeScript ile ilerlemek istiyorum.' },
            ],
        },
        step3: {
            bot: '**UI Otomasyon** tarafında hangi modern aracı deneyimlemek istersin?',
            options: [
                { id: 'C1', label: '🔵 Selenium — sektörün klasiği' },
                { id: 'C2', label: '🎭 Playwright — modern ve hızlı' },
            ],
        },
        stepBSelenium: {
            bot: 'Python/TypeScript yolunda **Selenium** da öğrenmek ister misin? Sektörün en köklü UI otomasyon aracı — CV\'inde güçlü bir yer tutar.',
            options: [
                { id: 'B_SEL_YES', label: '🔵 Evet, Selenium\'u da ana yoluma ekle.' },
                { id: 'B_SEL_NO',  label: '⏭️ Hayır, modern araçlarla ilerlemek istiyorum.' },
            ],
        },
        // Playwright vs Cypress karşılaştırma mesajı (B_SEL_NO seçilince)
        playwrightCypressCompare: {
            bot: `**Playwright vs Cypress — Kısa Tanıtım:**\n\n🎭 **Playwright** → Microsoft tarafından geliştirilen modern otomasyon çerçevesi. Python, TypeScript ve Java'yı destekler. Auto-wait, ağ stubbing, API testi, Trace Viewer ve paralel test koşusu ile öne çıkar. Büyük ve kurumsal projelerde tercih ediliyor.\n\n🌲 **Cypress** → Sadece JavaScript/TypeScript ile çalışır. Time-travel debugging, anlık screenshot ve kullanımı çok kolay arayüzü ile özellikle JS/TS ekipler arasında popüler. Ancak iframe ve multi-domain desteği kısıtlı.\n\n✅ **Tavsiyem: Playwright** — Hem Python hem TypeScript yoluna mükemmel entegre olur, daha geniş ekosistem ve kurumsal destek sunar.`,
        },

        userChoice: {
            A: 'Hayır, yazılım geçmişim yok.',
            B: 'Evet, yazılım geçmişim var.',
            B1: 'Java ile başlamak istiyorum.',
            B2: 'Python / TypeScript ile ilerlemek istiyorum.',
            B_SEL_YES: 'Evet, Selenium da olsun.',
            B_SEL_NO: 'Hayır, modern araçlarla ilerliyorum.',
            C1: 'Selenium ile devam.',
            C2: 'Playwright ile devam.',
        },
        mapReady: '✨ Haritanı hazırladım! Seçimlerine göre kişiselleştirilmiş QA yol haritanı aşağıda görebilirsin.',
        restart: 'Baştan Başla',
        print: 'Haritamı Yazdır / PDF',
        optional: 'OPSİYONEL',
        mainPath: 'ANA YOL',
        extraTitle: '📌 Ekstra Gelişim Dalları (Opsiyonel)',
        viewTopic: 'Konuya Git →',
        mentorNoteTitle: '🎓 Mentor Notun',
        typing: 'yazılıyor...',
    },
    en: {
        welcome: {
            bot: 'Hello! 👋 I\'m the QA Mentor AI of LearnQA.dev. I\'ll create a personalized **QA Career Mind Map** just for you.',
            bot2: 'I\'ll ask you a few short questions to get started. Ready? 🚀',
        },
        step1: {
            bot: 'Do you have any prior **software or coding** background or experience?',
            options: [
                { id: 'A', label: '🚫 No, I have no software background — I\'m starting from scratch.' },
                { id: 'B', label: '✅ Yes, I have software / coding experience.' },
            ],
        },
        step2: {
            bot: 'Great! One of our main languages is **Java**. Would you like to start your journey directly with Java?',
            options: [
                { id: 'B1', label: '☕ Yes, I want to start with Java.' },
                { id: 'B2', label: '🐍 No, I prefer Python or TypeScript.' },
            ],
        },
        step3: {
            bot: 'Which modern **UI Automation** tool would you like to explore?',
            options: [
                { id: 'C1', label: '🔵 Selenium — the industry classic' },
                { id: 'C2', label: '🎭 Playwright — modern and fast' },
            ],
        },
        stepBSelenium: {
            bot: 'On the Python/TypeScript path, would you also like to learn **Selenium**? It\'s the most established UI automation tool in the industry — a great addition to your CV.',
            options: [
                { id: 'B_SEL_YES', label: '🔵 Yes, add Selenium to my main path.' },
                { id: 'B_SEL_NO',  label: '⏭️ No, I want to go with modern tools only.' },
            ],
        },
        // Playwright vs Cypress comparison message (when B_SEL_NO is selected)
        playwrightCypressCompare: {
            bot: `**Playwright vs Cypress — Quick Overview:**

🎭 **Playwright** → Modern automation framework by Microsoft. Supports Python, TypeScript, and Java. Stands out with auto-wait, network stubbing, API testing, Trace Viewer, and parallel test runs. Preferred in large and enterprise projects.

🌲 **Cypress** → Works only with JavaScript/TypeScript. Popular among JS/TS teams for its time-travel debugging, instant screenshots, and very easy-to-use interface. However, iframe and multi-domain support are limited.

✅ **My recommendation: Playwright** — Integrates beautifully with both your Python and TypeScript path, offering a wider ecosystem and enterprise-level support.`,
        },
        userChoice: {
            A: 'No software background.',
            B: 'Yes, I have software experience.',
            B1: 'I want to start with Java.',
            B2: 'I prefer Python / TypeScript.',
            B_SEL_YES: 'Yes, add Selenium too.',
            B_SEL_NO: 'No, going with modern tools.',
            C1: 'Continue with Selenium.',
            C2: 'Continue with Playwright.',
        },
        mapReady: '✨ Your map is ready! See your personalized QA roadmap below based on your choices.',
        restart: 'Start Over',
        print: 'Print / Save as PDF',
        optional: 'OPTIONAL',
        mainPath: 'MAIN PATH',
        extraTitle: '📌 Extra Growth Branches (Optional)',
        viewTopic: 'Go to Topic →',
        mentorNoteTitle: '🎓 Your Mentor Note',
        typing: 'typing...',
    },
}

// ─── Harita Düğümleri ──────────────────────────────────────────────────────

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
})

// ─── MAP_A: Tamamen sıfırdan başlayanlar ───────────────────────────────────
export const MAP_A = {
    id: 'map_a',
    title: { tr: '🧠 Sıfırdan QA Mühendisi Yol Haritası', en: '🧠 QA Engineer Roadmap from Scratch' },
    subtitle: { tr: 'Yazılım geçmişi olmadan, temelden mülakat seviyesine', en: 'From no coding background to interview level' },
    color: 'from-violet-600 to-fuchsia-600',
    nodes: [
        {
            id: 1,
            emoji: '🔢',
            title: { tr: 'Algoritma Temeli', en: 'Algorithm Basics' },
            desc: { tr: 'Mantıksal düşünme, pseudocode, flowchart', en: 'Logical thinking, pseudocode, flowcharts' },
            route: '/algorithms',
            color: '#7c3aed',
            glow: 'rgba(124,58,237,0.4)',
            isMain: true,
        },
        {
            id: 2,
            emoji: '🧪',
            title: { tr: 'Manuel Test', en: 'Manual Testing' },
            desc: { tr: 'Test case, bug report, exploratory testing', en: 'Test cases, bug reports, exploratory testing' },
            route: '/manual-testing',
            color: '#0891b2',
            glow: 'rgba(8,145,178,0.4)',
            isMain: true,
        },
        {
            id: 3,
            emoji: '☕',
            title: { tr: 'Java', en: 'Java' },
            desc: { tr: 'OOP, Collections, JUnit — otomasyon dili', en: 'OOP, Collections, JUnit — automation language' },
            route: '/java',
            color: '#d97706',
            glow: 'rgba(217,119,6,0.4)',
            isMain: true,
        },
        {
            id: 4,
            emoji: '🔵',
            title: { tr: 'Selenium', en: 'Selenium' },
            desc: { tr: 'WebDriver, locator, wait stratejileri', en: 'WebDriver, locators, wait strategies' },
            route: '/selenium',
            color: '#2563eb',
            glow: 'rgba(37,99,235,0.4)',
            isMain: true,
        },
        {
            id: 5,
            emoji: '📮',
            title: { tr: 'Postman', en: 'Postman' },
            desc: { tr: 'REST API, request, assertion, Newman', en: 'REST API, requests, assertions, Newman' },
            route: '/postman',
            color: '#ea580c',
            glow: 'rgba(234,88,12,0.4)',
            isMain: true,
        },
        SQL_NODE(6),   // ← SQL: Postman'dan sonra, REST Assured'dan önce
        {
            id: 7,
            emoji: '🔗',
            title: { tr: 'REST Assured', en: 'REST Assured' },
            desc: { tr: 'Java tabanlı API otomasyon framework\'ü', en: 'Java-based API automation framework' },
            route: '/rest-assured',
            color: '#16a34a',
            glow: 'rgba(22,163,74,0.4)',
            isMain: true,
        },
        {
            id: 8,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, build, test trigger', en: 'CI/CD pipeline, build, test triggers' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
        },
        {
            id: 9,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud test ortamı, EC2, S3, Lambda', en: 'Cloud test environment, EC2, S3, Lambda' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
        },
        {
            id: 10,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Container, image, compose, Selenium Grid', en: 'Containers, images, compose, Selenium Grid' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.4)',
            isMain: true,
        },
        {
            id: 11,
            emoji: '⚙️',
            title: { tr: 'Kubernetes', en: 'Kubernetes' },
            desc: { tr: 'Orchestration, pod, deployment, scale', en: 'Orchestration, pods, deployments, scaling' },
            route: '/kubernetes',
            color: '#0f766e',
            glow: 'rgba(15,118,110,0.4)',
            isMain: true,
        },
        {
            id: 12,
            emoji: '📡',
            title: { tr: 'Kafka', en: 'Kafka' },
            desc: { tr: 'Event-driven mimari, consumer, producer test', en: 'Event-driven architecture, consumer/producer testing' },
            route: '/kafka',
            color: '#1e1b4b',
            glow: 'rgba(30,27,75,0.5)',
            isMain: true,
        },
    ],
    extras: [
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

Önce **mantığını** kur (Algoritma), sonra **test refleksini** geliştir (Manuel Test), ardından **Java** ile kod yazmayı öğren. Selenium ile UI otomasyona geçtiğinde zaten sağlam bir temel üzerinde olacaksın. **SQL** ise seni çoğu QA mühendisinden ayıran kritik bir beceri — veritabanı doğrulaması yapmadan tam bir test süreci yürütemezsin.

REST Assured ile Java üzerinden API testini kapattıktan sonra Jenkins → AWS → Docker → Kubernetes → Kafka zinciri seni gerçek bir **SDET (Software Development Engineer in Test)** profili haline getirecek. 💪`,
        en: `**You're on the right path!** Starting QA engineering without a software background is completely possible — and this sequence is the proven fastest way to get there.

First build your **logical thinking** (Algorithms), then develop **test instincts** (Manual Testing), then learn to write code with **Java**. When you move to Selenium for UI automation, you'll already have a solid foundation. **SQL** is a critical skill that separates you from most QA engineers — you can't run a complete test process without database validation.

After covering API testing with REST Assured, the Jenkins → AWS → Docker → Kubernetes → Kafka chain will turn you into a real **SDET (Software Development Engineer in Test)** profile. 💪`,
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
        },
        {
            id: 3,
            emoji: '🎭',
            title: { tr: 'Playwright', en: 'Playwright' },
            desc: { tr: 'Modern UI otomasyon, auto-wait, API test, Trace Viewer', en: 'Modern UI automation, auto-wait, API testing, Trace Viewer' },
            route: '/playwright',
            color: '#7c3aed',
            glow: 'rgba(124,58,237,0.4)',
            isMain: true,
        },
        {
            id: 4,
            emoji: '📮',
            title: { tr: 'Postman', en: 'Postman' },
            desc: { tr: 'REST API, environment, Newman/CI', en: 'REST API, environments, Newman/CI' },
            route: '/postman',
            color: '#ea580c',
            glow: 'rgba(234,88,12,0.4)',
            isMain: true,
        },
        SQL_NODE(5),   // ← SQL: Postman'dan sonra
        {
            id: 6,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, paralel test çalıştırma', en: 'CI/CD pipelines, parallel test execution' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
        },
        {
            id: 7,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Test ortamı containerize etme', en: 'Containerizing test environments' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.35)',
            isMain: true,
        },
        {
            id: 8,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud test altyapısı, Lambda, S3', en: 'Cloud test infrastructure, Lambda, S3' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
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

**SQL** bilgisi seni çoğu QA mühendisinden ayırır — veri doğrulaması olmadan tam bir test süreci yürütülemez. Jenkins → Docker → AWS zinciri ise seni takım ortamında CI/CD süreçlerini yönetebilir hale getirir. 🚀`,
        en: `**Excellent choice!** The Python + TypeScript + Playwright combination equips you with the most modern QA stack in the industry.

Why we recommend **Playwright**: It perfectly supports both Python and TypeScript, **auto-wait** minimizes flaky test issues, **Trace Viewer** lets you debug failures via video/screenshot/network recordings, and it's seeing increasing demand in large enterprise projects.

**SQL** knowledge separates you from most QA engineers — a complete test process can't run without data validation. The Jenkins → Docker → AWS chain makes you capable of managing CI/CD processes in team environments. 🚀`,
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
        },
        {
            id: 3,
            emoji: '🔵',
            title: { tr: 'Selenium', en: 'Selenium' },
            desc: { tr: 'WebDriver Python, POM, locator, wait — sektör klasiği', en: 'Selenium Python/TS, POM, locators, waits — industry classic' },
            route: '/selenium',
            color: '#2563eb',
            glow: 'rgba(37,99,235,0.4)',
            isMain: true,
        },
        {
            id: 4,
            emoji: '🎭',
            title: { tr: 'Playwright', en: 'Playwright' },
            desc: { tr: 'Modern UI otomasyon, auto-wait, API test', en: 'Modern UI automation, auto-wait, API testing' },
            route: '/playwright',
            color: '#7c3aed',
            glow: 'rgba(124,58,237,0.4)',
            isMain: true,
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
        },
        SQL_NODE(6),   // ← SQL: Postman'dan sonra
        {
            id: 7,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, paralel test çalıştırma', en: 'CI/CD pipelines, parallel test execution' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
        },
        {
            id: 8,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Selenium Grid + Playwright containerize', en: 'Selenium Grid + Playwright containerization' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.35)',
            isMain: true,
        },
        {
            id: 9,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud test altyapısı, Lambda, S3', en: 'Cloud test infrastructure, Lambda, S3' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
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

**SQL** her iki aracın test sürecinde de kritik rol oynar — veritabanı doğrulaması olmadan API veya UI testleri eksik kalır. Jenkins → Docker → AWS zinciri ise her şeyi CI/CD ortamına taşımanı sağlar. 🏆`,
        en: `**A powerful choice!** As a QA engineer who knows both **Selenium** and **Playwright**, you'll appeal to a very wide job pool.

Selenium's combination with Python is still common in enterprise projects — especially indispensable in legacy test infrastructures. **Playwright** complements it: the darling of modern projects with auto-wait, trace viewer, and parallel execution. Knowing both, you'll be specifically sought out for "Selenium to Playwright migration" projects.

**SQL** plays a critical role in the test process for both tools — API or UI tests are incomplete without database validation. The Jenkins → Docker → AWS chain lets you move everything into a CI/CD environment. 🏆`,
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
        },
        {
            id: 2,
            emoji: '🔵',
            title: { tr: 'Selenium', en: 'Selenium' },
            desc: { tr: 'WebDriver, POM, locator, wait stratejileri', en: 'WebDriver, POM, locators, wait strategies' },
            route: '/selenium',
            color: '#2563eb',
            glow: 'rgba(37,99,235,0.4)',
            isMain: true,
        },
        {
            id: 3,
            emoji: '📮',
            title: { tr: 'Postman', en: 'Postman' },
            desc: { tr: 'API test, collection, environment', en: 'API testing, collections, environments' },
            route: '/postman',
            color: '#ea580c',
            glow: 'rgba(234,88,12,0.4)',
            isMain: true,
        },
        SQL_NODE(4),   // ← SQL: Postman'dan sonra, REST Assured'dan önce
        {
            id: 5,
            emoji: '🔗',
            title: { tr: 'REST Assured', en: 'REST Assured' },
            desc: { tr: 'Java API otomasyon, schema validation', en: 'Java API automation, schema validation' },
            route: '/rest-assured',
            color: '#16a34a',
            glow: 'rgba(22,163,74,0.4)',
            isMain: true,
        },
        {
            id: 6,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD pipeline, Maven/Gradle entegrasyonu', en: 'CI/CD pipelines, Maven/Gradle integration' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
        },
        {
            id: 7,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Selenium Grid containerize, test izolasyonu', en: 'Selenium Grid containerization, test isolation' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.4)',
            isMain: true,
        },
        {
            id: 8,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Cloud ölçekli test çalıştırma ortamı', en: 'Cloud-scale test execution environment' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
        },
        {
            id: 9,
            emoji: '⚙️',
            title: { tr: 'Kubernetes', en: 'Kubernetes' },
            desc: { tr: 'Distributed test execution, pod yönetimi', en: 'Distributed test execution, pod management' },
            route: '/kubernetes',
            color: '#0f766e',
            glow: 'rgba(15,118,110,0.4)',
            isMain: true,
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

REST Assured ile Java üzerinden API testini kapattığında UI + API testini tek dilde yöneteceksin. Jenkins → Docker → AWS → Kubernetes zinciri seni tam **DevOps-aware SDET** profiline götürür. 🏆`,
        en: `**A classic but powerful choice!** The Java + Selenium stack is still the most widely used combination in the industry — the vast majority of large enterprise companies work in this ecosystem.

If you have a software background, **Java** adaptation will be very quick. Learning the **Page Object Model (POM)** with Selenium will make you truly understand what maintainable test code means. **SQL** is the critical skill that separates you from competitors — even when API testing with Postman, you often need to check the actual data in the database.

When you complete API testing with REST Assured, you'll manage UI + API testing in a single language. The Jenkins → Docker → AWS → Kubernetes chain takes you to a full **DevOps-aware SDET** profile. 🏆`,
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
        },
        {
            id: 2,
            emoji: '🎭',
            title: { tr: 'Playwright', en: 'Playwright' },
            desc: { tr: 'Modern UI otomasyon, auto-wait, trace viewer', en: 'Modern UI automation, auto-wait, trace viewer' },
            route: '/playwright',
            color: '#7c3aed',
            glow: 'rgba(124,58,237,0.4)',
            isMain: true,
        },
        {
            id: 3,
            emoji: '🔗',
            title: { tr: 'REST Assured', en: 'REST Assured' },
            desc: { tr: 'Java tabanlı API otomasyon + Playwright API test', en: 'Java-based API automation + Playwright API testing' },
            route: '/rest-assured',
            color: '#16a34a',
            glow: 'rgba(22,163,74,0.4)',
            isMain: true,
        },
        SQL_NODE(4),   // ← SQL: REST Assured'dan sonra
        {
            id: 5,
            emoji: '🔧',
            title: { tr: 'Jenkins', en: 'Jenkins' },
            desc: { tr: 'CI/CD, paralel Playwright test koşusu', en: 'CI/CD, parallel Playwright test runs' },
            route: '/jenkins',
            color: '#6d28d9',
            glow: 'rgba(109,40,217,0.4)',
            isMain: true,
        },
        {
            id: 6,
            emoji: '🐳',
            title: { tr: 'Docker', en: 'Docker' },
            desc: { tr: 'Playwright containerize, headless test ortamı', en: 'Playwright containerization, headless test env' },
            route: '/docker',
            color: '#0369a1',
            glow: 'rgba(3,105,161,0.4)',
            isMain: true,
        },
        {
            id: 7,
            emoji: '☁️',
            title: { tr: 'AWS', en: 'AWS' },
            desc: { tr: 'Serverless test çalıştırma, cloud altyapı', en: 'Serverless test execution, cloud infrastructure' },
            route: '/aws',
            color: '#b45309',
            glow: 'rgba(180,83,9,0.4)',
            isMain: true,
        },
        {
            id: 8,
            emoji: '⚙️',
            title: { tr: 'Kubernetes', en: 'Kubernetes' },
            desc: { tr: 'Distributed Playwright koşusu, pod scaling', en: 'Distributed Playwright runs, pod scaling' },
            route: '/kubernetes',
            color: '#0f766e',
            glow: 'rgba(15,118,110,0.4)',
            isMain: true,
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

**SQL** hem REST Assured hem Playwright süreçlerinde kritik — veritabanı doğrulaması olmadan UI/API testleri eksik kalır. **Appium** ile Java bilgini mobil otomasyona taşıyabilir, **JMeter** ile performans testini de kapabilirsin. Şirketlerin "Playwright geçiş" projelerinde sana özel talep olacak. 🌟`,
        en: `**An excellent future-oriented choice!** The Java + Playwright combination merges enterprise power with modern speed.

Playwright's **auto-wait** mechanism largely eliminates Selenium's flaky test problems. With **Trace Viewer**, you'll debug failures via video/screenshot/network recordings — nothing comes out-of-the-box like this in Selenium suites.

**SQL** is critical in both REST Assured and Playwright processes — UI/API tests are incomplete without database validation. With **Appium** you can apply your Java knowledge to mobile automation, and with **JMeter** you can cover performance testing too. Companies doing "Playwright migration" projects will specifically seek you out. 🌟`,
    },
}

export const ALL_MAPS = {
    map_a: MAP_A,
    map_b: MAP_B,
    map_b_sel: MAP_B_SEL,
    map_c1: MAP_C1,
    map_c2: MAP_C2,
}
