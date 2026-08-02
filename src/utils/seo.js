import { SECTION_SLUGS } from '../data/generated/sectionSlugs.js'

export const SITE_URL = 'https://learnqa.dev'

// ─────────────────────────────────────────────────────────────────────────────
// DİL-AYRIK URL MİMARİSİ (Documents/seo-phase-2-plan.md §2)
//
// Çıplak path  = Türkçe  (varsayılan dil, mevcut URL otoritesi korunur)
// /en/<path>   = İngilizce
//
// URL dil için TEK OTORİTEDİR: /selenium daima TR, /en/selenium daima EN.
// localStorage.language artık dili BELİRLEMEZ, yalnızca yansıtır.
// ─────────────────────────────────────────────────────────────────────────────
export const LOCALES = ['tr', 'en']
export const DEFAULT_LOCALE = 'tr'
export const EN_PREFIX = '/en'

export const DEFAULT_SEO = {
    path: '/',
    title: 'QA Learning Platform for Test Automation Engineers | LearnQA.dev',
    description: 'Learn Selenium, Playwright, Java, Python, SQL, API testing, DevOps and cloud tools with hands-on QA engineering lessons, quizzes and interview practice.',
    tr: {
        title: 'QA ve Test Otomasyonu Öğrenme Platformu | LearnQA.dev',
        description: 'Selenium, Playwright, Java, Python, SQL, API testi ve DevOps araçlarını uygulamalı derslerle, quizlerle ve mülakat sorularıyla öğren.',
    },
}

// NOT: Girdilerdeki `title`/`description` alanları İNGİLİZCE değerlerdir
// (geriye dönük uyumluluk için yerinde bırakıldı); Türkçe karşılıkları `tr`
// alt objesindedir. Yeni route eklerken İKİSİ de zorunludur — check-seo.mjs
// eksik `tr` bloğunu hard-fail eder.
export const ROUTE_SEO = [
    DEFAULT_SEO,
    {
        path: '/selenium',
        title: 'Selenium WebDriver Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Selenium WebDriver with Java, Python and TypeScript examples, locator strategies, waits, frames, real-world automation scenarios and interview questions.',
        tr: {
            title: 'Selenium Nedir? WebDriver Eğitimi (Java, Python) | LearnQA.dev',
            description: 'Selenium WebDriver nedir, nasıl kurulur ve Java, Python, TypeScript ile nasıl kullanılır? Locator stratejileri, wait yapıları, gerçek senaryolar ve mülakat soruları.',
        },
    },
    {
        path: '/playwright',
        title: 'Playwright Tutorial for QA Automation | LearnQA.dev',
        description: 'Master Playwright for modern QA automation with TypeScript, Java and Python examples, auto-waiting, locators, API testing and real interview scenarios.',
        tr: {
            title: 'Playwright Türkçe Eğitim: Modern QA Otomasyonu | LearnQA.dev',
            description: 'Playwright\'ı Türkçe anlatımla, TypeScript, Java ve Python örnekleriyle öğren: auto-waiting mantığı, locator API\'si, API testi ve mülakat senaryoları.',
        },
    },
    {
        path: '/cypress',
        title: 'Cypress Tutorial for QA Automation Engineers | LearnQA.dev',
        description: 'Learn Cypress end-to-end testing with JavaScript/TypeScript examples, time-travel debugging, network stubbing, custom commands and interview questions.',
        tr: {
            title: 'Cypress Eğitimi: Uçtan Uca Test Otomasyonu | LearnQA.dev',
            description: 'Cypress ile end-to-end test yazmayı öğren: JavaScript örnekleri, time-travel debugging, network stubbing, custom command ve mülakat soruları.',
        },
    },
    {
        path: '/python',
        title: 'Python for QA Engineers: Pytest, Selenium and Playwright | LearnQA.dev',
        description: 'Learn Python from the ground up for QA automation, including pytest, Selenium, Playwright, test data handling and Java-friendly explanations.',
        tr: {
            title: 'Python Öğren: QA İçin pytest, Selenium, Playwright | LearnQA.dev',
            description: 'Test otomasyonu için Python\'u sıfırdan öğren: pytest fixture yapısı, Selenium, Playwright, test verisi yönetimi ve Java karşılaştırmaları.',
        },
    },
    {
        path: '/typescript',
        title: 'TypeScript for Playwright and Test Automation | LearnQA.dev',
        description: 'Learn TypeScript for QA engineers with type basics, advanced patterns, Playwright examples, quizzes and Java comparisons.',
        tr: {
            title: 'Playwright ve Test Otomasyonu İçin TypeScript | LearnQA.dev',
            description: 'QA mühendisleri için TypeScript öğren: tip temelleri, ileri seviye tip desenleri, Playwright örnekleri, quizler ve Java karşılaştırmaları.',
        },
    },
    {
        path: '/javascript',
        title: 'JavaScript for QA Automation Engineers | LearnQA.dev',
        description: 'Learn JavaScript for modern QA automation. Interactive Lego playgrounds for variables and event loop, plus 50 Java-compared interview questions.',
        tr: {
            title: 'QA Otomasyonu İçin JavaScript Eğitimi | LearnQA.dev',
            description: 'Modern test otomasyonu için JavaScript öğren: değişkenler ve event loop için Lego oyun alanları, DOM, async yapılar ve 50 mülakat sorusu.',
        },
    },
    {
        path: '/sql',
        title: 'SQL for QA Engineers with Interactive Practice | LearnQA.dev',
        description: 'Practice SQL for software testing with SELECT, JOIN, GROUP BY, window functions, data validation scenarios and interactive exercises.',
        tr: {
            title: 'SQL Sorguları Eğitimi: QA İçin İnteraktif Pratik | LearnQA.dev',
            description: 'SQL sorgularını yazılım testi için öğren: SELECT, JOIN, GROUP BY, window function, veri doğrulama senaryoları ve tarayıcıda çalışan alıştırmalar.',
        },
    },
    {
        path: '/java',
        title: 'Java for QA Automation Engineers | LearnQA.dev',
        description: 'Learn Java concepts for Selenium, Playwright, API testing and QA automation interviews with practical examples and hands-on exercises.',
        tr: {
            title: 'Java Öğren: QA Otomasyonu İçin Sıfırdan Eğitim | LearnQA.dev',
            description: 'Selenium, Playwright, API testi ve QA mülakatları için Java\'yı sıfırdan öğren: uygulamalı örnekler ve tarayıcıda çalışan alıştırmalarla.',
        },
    },
    {
        path: '/jmeter',
        title: 'JMeter Tutorial for Performance Testing | LearnQA.dev',
        description: 'Learn Apache JMeter for load testing with installation steps, test plans, assertions, reports, common errors and interview questions.',
        tr: {
            title: 'JMeter Eğitimi: Performans ve Yük Testi | LearnQA.dev',
            description: 'Apache JMeter ile yük testi öğren: kurulum adımları, test planı, assertion yapıları, raporlama, sık karşılaşılan hatalar ve mülakat soruları.',
        },
    },
    {
        path: '/postman',
        title: 'Postman API Testing Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Postman API testing with collections, environments, scripts, Newman, CI integration, troubleshooting and interview practice.',
        tr: {
            title: 'Postman API Test Eğitimi: QA Mühendisleri İçin | LearnQA.dev',
            description: 'Postman ile API testini öğren: collection yapısı, environment yönetimi, script yazımı, Newman, CI entegrasyonu ve mülakat pratiği.',
        },
    },
    {
        path: '/bruno',
        title: 'Bruno API Client Tutorial: Git-Native Postman Alternative | LearnQA.dev',
        description: 'Learn Bruno, the open-source Git-native API client: installation, .bru files, scripting, CLI automation, CI/CD and a full Postman comparison.',
        tr: {
            title: 'Bruno Eğitimi: Git Tabanlı Postman Alternatifi | LearnQA.dev',
            description: 'Açık kaynak, Git tabanlı API client Bruno\'yu öğren: kurulum, .bru dosyaları, script yazımı, CLI otomasyonu, CI/CD ve Postman karşılaştırması.',
        },
    },
    {
        path: '/api-testing',
        title: 'API Testing Tutorial for QA Engineers: Build Then Test | LearnQA.dev',
        description: 'Learn API testing by first building the API in Java, Express and NestJS, then testing it with DevTools, Swagger, Postman, REST Assured and Playwright.',
        tr: {
            title: 'API Testi Eğitimi: Önce Yaz, Sonra Test Et | LearnQA.dev',
            description: 'API testini önce API\'yi Java, Express ve NestJS ile yazarak öğren; sonra DevTools, Swagger, Postman, REST Assured ve Playwright ile test et.',
        },
    },
    {
        path: '/qa-frontend',
        title: 'Frontend for QA: Read Source, Find Unbreakable Locators | LearnQA.dev',
        description: 'Learn frontend for testers: read React and Angular source, picture the DOM it produces, and choose durable locators (data-testid, role) instead of fragile XPath and hash classes.',
        tr: {
            title: 'QA İçin Frontend: Kaynak Kodu Oku, Sağlam Locator Bul | LearnQA.dev',
            description: 'Testçiler için frontend: React ve Angular kaynak kodunu oku, ürettiği DOM\'u canlandır, kırılgan XPath yerine kalıcı locator seçmeyi öğren.',
        },
    },
    {
        path: '/gauge',
        title: 'Gauge Tutorial with Java and Selenium | LearnQA.dev',
        description: 'Learn Gauge test automation with Java: Markdown specs, @Step bindings, Selenium By locators, @FindBy PageFactory and a JSON locator repository.',
        tr: {
            title: 'Gauge Eğitimi: Java ve Selenium ile Test Otomasyonu | LearnQA.dev',
            description: 'Gauge ile test otomasyonunu Java üzerinde öğren: Markdown spec dosyaları, @Step bağlama, Selenium By locator, @FindBy PageFactory ve JSON locator deposu.',
        },
    },
    {
        path: '/rest-assured',
        title: 'REST Assured Tutorial for Java API Testing | LearnQA.dev',
        description: 'Learn REST Assured for Java API automation with request chaining, assertions, serialization, authentication and CI-ready test design.',
        tr: {
            title: 'REST Assured Eğitimi: Java ile API Testi | LearnQA.dev',
            description: 'Java API otomasyonu için REST Assured öğren: istek zincirleme, assertion yazımı, serialization, authentication ve CI\'a hazır test tasarımı.',
        },
    },
    {
        path: '/docker',
        title: 'Docker for QA Engineers and Test Automation | LearnQA.dev',
        description: 'Learn Docker for QA automation, test environments, Selenium Grid, containers, images, volumes, networks and CI workflows.',
        tr: {
            title: 'Docker Nedir? QA Mühendisleri İçin Eğitim | LearnQA.dev',
            description: 'Docker nedir, test otomasyonunda nasıl kullanılır? Test ortamları, Selenium Grid, container, image, volume, network kavramları ve CI iş akışları.',
        },
    },
    {
        path: '/jenkins',
        title: 'Jenkins CI/CD for QA Automation | LearnQA.dev',
        description: 'Learn Jenkins pipelines for QA automation with build stages, test reports, Docker agents, parallel execution and troubleshooting.',
        tr: {
            title: 'Jenkins Nedir? CI/CD ve Pipeline Eğitimi | LearnQA.dev',
            description: 'Jenkins nedir, QA otomasyonunda pipeline nasıl yazılır? Build aşamaları, test raporları, Docker agent kullanımı, paralel koşum ve hata giderme.',
        },
    },
    {
        path: '/kubernetes',
        title: 'Kubernetes for QA Engineers | LearnQA.dev',
        description: 'Learn Kubernetes basics for QA, including pods, deployments, services, kubectl, YAML manifests, test environments and common errors.',
        tr: {
            title: 'QA Mühendisleri İçin Kubernetes Eğitimi | LearnQA.dev',
            description: 'QA için Kubernetes temellerini öğren: pod, deployment ve service kavramları, kubectl komutları, YAML manifest, test ortamları ve sık hatalar.',
        },
    },
    {
        path: '/kafka',
        title: 'Kafka for QA Engineers and Test Automation | LearnQA.dev',
        description: 'Learn Apache Kafka for QA with producers, consumers, topics, partitions, Spring Boot testing scenarios and troubleshooting.',
        tr: {
            title: 'QA İçin Kafka Eğitimi ve Test Senaryoları | LearnQA.dev',
            description: 'QA için Apache Kafka öğren: producer, consumer, topic ve partition kavramları, Spring Boot test senaryoları ve hata giderme yöntemleri.',
        },
    },
    {
        path: '/appium',
        title: 'Appium Mobile Testing Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Appium mobile automation for Android and iOS with capabilities, locators, gestures, real devices, cloud testing and interviews.',
        tr: {
            title: 'Appium Mobil Test Eğitimi: Android ve iOS | LearnQA.dev',
            description: 'Appium ile mobil otomasyonu öğren: capability yapısı, locator stratejileri, gesture komutları, gerçek cihaz testi ve bulut koşumu.',
        },
    },
    {
        path: '/browserstack',
        title: 'BrowserStack Tutorial for Cross-Browser Testing | LearnQA.dev',
        description: 'Learn BrowserStack for Selenium, Playwright and Appium cloud testing with capabilities, local testing, CI integration and debugging.',
        tr: {
            title: 'BrowserStack Eğitimi: Bulutta Çapraz Tarayıcı Testi | LearnQA.dev',
            description: 'Selenium, Playwright ve Appium testlerini BrowserStack bulutunda koş: capability ayarları, local testing, CI entegrasyonu ve hata ayıklama.',
        },
    },
    {
        path: '/git-github',
        title: 'Git and GitHub Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Git and GitHub with visual workflows, branch strategy, pull requests, GitHub Actions, Pages deployment, safety rules and hands-on command practice.',
        tr: {
            title: 'Git ve GitHub Öğren: QA Mühendisleri İçin Eğitim | LearnQA.dev',
            description: 'Git ve GitHub\'ı görsel akışlarla, sıfırdan öğren: branch stratejisi, pull request, GitHub Actions, Pages yayını, güvenlik kuralları ve komut pratiği.',
        },
    },
    {
        path: '/security',
        title: 'Web Penetration Testing and OWASP Top 10 for QA | LearnQA.dev',
        description: 'Learn web application penetration testing, OWASP Top 10 vulnerabilities (SQLi, XSS, JWT, IDOR, SSRF) with interactive Pixar-style Lego animations and quiz practice.',
        tr: {
            title: 'Siber Güvenlik ve Sızma Testi Eğitimi (OWASP) | LearnQA.dev',
            description: 'Web uygulaması sızma testi nasıl yapılır? OWASP Top 10 açıklarını (SQLi, XSS, JWT, IDOR, SSRF) interaktif Lego animasyonları ve quizlerle öğren.',
        },
        // Sitemap'e GİRMEZ + shell'de robots=noindex: RequireAdmin ile korunuyor — ziyaretçi içerik göremez.
        noindex: true,
    },
    {
        path: '/linux',
        title: 'Linux Command Line Tutorial for QA Engineers | LearnQA.dev',
        description: 'Learn Linux for QA automation: filesystem navigation, permissions, pipes, processes, bash scripting, CI agent debugging and common errors.',
        tr: {
            title: 'QA Mühendisleri İçin Linux Komut Satırı Eğitimi | LearnQA.dev',
            description: 'QA otomasyonu için Linux öğren: dosya sistemi gezinme, izinler, pipe kullanımı, process yönetimi, bash script ve CI agent hata ayıklama.',
        },
    },
    {
        path: '/aws',
        title: 'AWS for QA Engineers and Test Automation | LearnQA.dev',
        description: 'Learn AWS services useful for QA automation, cloud test environments, CI pipelines, storage, monitoring and scalable test execution.',
        tr: {
            title: 'QA ve Test Otomasyonu İçin AWS Eğitimi | LearnQA.dev',
            description: 'QA otomasyonunda işine yarayacak AWS servislerini öğren: bulut test ortamları, CI pipeline, depolama, izleme ve ölçeklenebilir test koşumu.',
        },
    },
    {
        path: '/azure',
        title: 'Azure for QA Engineers and DevOps Testing | LearnQA.dev',
        description: 'Learn Azure DevOps and cloud services for QA automation, pipelines, test environments, storage, monitoring and CI/CD workflows.',
        tr: {
            title: 'QA İçin Azure ve Azure DevOps Eğitimi | LearnQA.dev',
            description: 'QA otomasyonu için Azure DevOps ve bulut servislerini öğren: pipeline kurulumu, test ortamları, depolama, izleme ve CI/CD iş akışları.',
        },
    },
    {
        path: '/test-frameworks',
        title: 'Playwright vs Selenium vs Pytest Comparison | LearnQA.dev',
        description: 'Playwright vs Selenium head-to-head for QA automation, plus pytest: practical examples, strengths, trade-offs and migration guidance.',
        tr: {
            title: 'Playwright vs Selenium Karşılaştırması (pytest dahil) | LearnQA.dev',
            description: 'Playwright ile Selenium\'u QA otomasyonu açısından karşılaştır: güçlü yönler, ödünleşimler, uygulamalı örnekler, pytest ve geçiş rehberi.',
        },
    },
    {
        path: '/java-document',
        title: 'Java Reference Guide for QA Automation | LearnQA.dev',
        description: 'Explore a practical Java reference for QA automation engineers, including collections, OOP, exceptions, concurrency and testing patterns.',
        tr: {
            title: 'QA Otomasyonu İçin Java Referans Rehberi | LearnQA.dev',
            description: 'QA otomasyon mühendisleri için pratik bir Java referansı: collection yapıları, OOP, exception yönetimi, concurrency ve test desenleri.',
        },
    },
    {
        path: '/git-document',
        title: 'Git & GitHub Reference Guide for QA Automation | LearnQA.dev',
        description: 'Explore a practical Git & GitHub reference for QA automation engineers, including installation, accounts, branching, conflict resolution, stashing, and rebasing.',
        tr: {
            title: 'Git ve GitHub Referans Rehberi: QA İçin | LearnQA.dev',
            description: 'QA mühendisleri için pratik Git ve GitHub referansı: kurulum, hesap ayarları, branch açma, conflict çözme, stash kullanımı ve rebase.',
        },
    },
    {
        path: '/what-is-testing',
        title: 'What is Software Testing? Types of Testing & QA Basics | LearnQA.dev',
        description: 'What is software testing and what are the types of testing? Learn ISTQB principles, QA vs QC, the SDET role, and why testing matters with real examples.',
        tr: {
            title: 'Yazılım Testi Nedir? Test Türleri ve QA Temelleri | LearnQA.dev',
            description: 'Yazılım testi nedir, test türleri nelerdir? ISTQB test prensipleri, QA ile QC farkı, SDET rolü ve testin neden kritik olduğunu gösteren örnekler.',
        },
    },
    {
        path: '/manual-testing',
        title: 'Manual Testing Tutorial with Real Test Case Examples | LearnQA.dev',
        description: 'Learn manual testing with real test case examples: writing test cases, exploratory testing, bug reports, severity levels and interactive exercises.',
        tr: {
            title: 'Manuel Test Nedir? Test Senaryosu Örnekleriyle Eğitim | LearnQA.dev',
            description: 'Manuel test nedir, test senaryosu (test case) nasıl yazılır? Keşifsel test, bug raporu, severity belirleme ve interaktif alıştırmalarla öğren.',
        },
    },
    {
        path: '/algorithms',
        title: 'Algorithms for Beginners Before Programming | LearnQA.dev',
        description: 'Learn algorithmic thinking before coding with simple recipes, input-output, decisions, loops, memory, debugging, flowcharts and visual games.',
        tr: {
            title: 'Programlamaya Başlamadan Önce Algoritma Eğitimi | LearnQA.dev',
            description: 'Kod yazmadan önce algoritmik düşünmeyi öğren: basit tarifler, girdi-çıktı, karar yapıları, döngüler, bellek, hata ayıklama ve görsel oyunlar.',
        },
    },
    {
        path: '/advanced-algorithms',
        title: 'Advanced Algorithms for QA Engineers | LearnQA.dev',
        description: 'Practice advanced QA algorithms with visual sorting, binary search, graph traversal, state machines and complexity labs for test automation.',
        tr: {
            title: 'QA Mühendisleri İçin İleri Seviye Algoritmalar | LearnQA.dev',
            description: 'Test otomasyonu için ileri algoritmaları görsel laboratuvarlarda çalış: sıralama, binary search, graf gezinme ve durum makineleri.',
        },
    },
    {
        path: '/qa-mentor',
        title: 'How to Become a QA Engineer: Career Roadmap | LearnQA.dev',
        description: 'Wondering how to become a QA engineer? Get a personalized, step-by-step career roadmap based on your experience level, goals and tool preferences.',
        tr: {
            title: 'Yazılım Test Uzmanı Nasıl Olunur? Kariyer Yol Haritası | LearnQA.dev',
            description: 'Yazılım test uzmanı nasıl olunur, testerlık nasıl öğrenilir? Deneyim seviyene göre kişiselleştirilmiş, adım adım QA kariyer yol haritası oluştur.',
        },
    },
    {
        path: '/backend',
        title: 'Simple Backend Tutorial for QA Learning Apps | LearnQA.dev',
        description: 'Learn how to add Google login, user progress, badges, feedback and realtime chat to a React learning platform with Supabase.',
        tr: {
            title: 'QA Öğrenme Uygulaması İçin Basit Backend | LearnQA.dev',
            description: 'React tabanlı bir öğrenme platformuna Supabase ile Google girişi, ilerleme kaydı, rozetler, geri bildirim ve gerçek zamanlı sohbet eklemeyi öğren.',
        },
        // Sitemap'e GİRMEZ + shell'de robots=noindex: RequireAdmin ile korunuyor — ziyaretçi içerik göremez.
        noindex: true,
    },
    {
        path: '/basit-backend',
        title: 'Basit Backend SQL and API Tutorial | LearnQA.dev',
        description: 'Practice e-commerce backend testing with DBeaver PostgreSQL schema, mock data, Next.js TypeScript API routes, endpoints and headers.',
        tr: {
            title: 'Basit Backend: E-Ticaret SQL ve API Laboratuvarı | LearnQA.dev',
            description: 'E-ticaret backend testini uygula: DBeaver ile PostgreSQL şeması, mock veri, Next.js TypeScript API route\'ları, endpoint ve header denemeleri.',
        },
    },
    {
        path: '/claude-ai',
        title: 'Claude AI for QA Testers: Prompts, Automation and MCP | LearnQA.dev',
        description: 'Learn how QA engineers use Claude AI from junior to senior: prompt engineering, test case generation, Selenium and Playwright automation, Claude Code and MCP.',
        tr: {
            title: 'QA Testçileri İçin Claude AI: Prompt ve Otomasyon | LearnQA.dev',
            description: 'QA mühendislerinin Claude AI\'ı nasıl kullandığını öğren: prompt engineering, test case üretimi, Selenium ve Playwright otomasyonu, Claude Code ve MCP.',
        },
    },
    {
        path: '/llm-agents',
        title: 'LLM and AI Agents Explained for QA Testers | LearnQA.dev',
        description: 'Understand what LLMs and AI agents are, how they are trained, and how a QA tester builds a simple test agent with the OpenAI API, with hands-on labs.',
        tr: {
            title: 'QA Testçileri İçin LLM ve AI Agent Rehberi | LearnQA.dev',
            description: 'LLM ve AI agent kavramlarını anla: nasıl eğitilirler ve bir testçi OpenAI API ile nasıl basit bir test agent\'ı yazar — uygulamalı laboratuvarlarla.',
        },
    },
    {
        path: '/test-automation',
        title: 'Test Automation: What It Is, Tools & When to Use It | LearnQA.dev',
        description: 'What is test automation, when should you automate, which tool to pick (Selenium, Playwright, Cypress, Appium), cost/ROI and how to start your career.',
        tr: {
            title: 'Test Otomasyonu Nedir? Araçlar ve Ne Zaman Kullanılır | LearnQA.dev',
            description: 'Test otomasyonu nedir, ne zaman otomatikleştirilir, hangi araç (Selenium, Playwright, Cypress, Appium) seçilir, maliyet/ROI ve kariyer yol haritası.',
        },
    },
    {
        path: '/auth/callback',
        title: 'Signing you in | LearnQA.dev',
        description: 'Completing your LearnQA.dev sign-in. You will be redirected automatically once authentication finishes.',
        tr: {
            title: 'Giriş Yapılıyor | LearnQA.dev',
            description: 'LearnQA.dev girişin tamamlanıyor. Kimlik doğrulama bittiğinde otomatik olarak yönlendirileceksin, bu sayfada bir işlem yapmana gerek yok.',
        },
        // Sitemap'e GİRMEZ + shell'de robots=noindex: OAuth dönüş adresi — indekslenirse kullanıcı arama sonucundan bozuk bir akışa düşer.
        noindex: true,
    },
    {
        path: '/login',
        title: 'Sign In or Sign Up | LearnQA.dev',
        description: 'Sign in to LearnQA.dev with Google, GitHub, Microsoft, or a passwordless email Magic Link to save your learning progress.',
        tr: {
            title: 'Giriş Yap veya Kayıt Ol | LearnQA.dev',
            description: 'Öğrenme ilerlemeni kaydetmek için LearnQA.dev\'e Google, GitHub, Microsoft veya şifresiz e-posta Magic Link ile giriş yap.',
        },
        // Sitemap'e GİRMEZ + shell'de robots=noindex: işlevsel sayfa, arama sonucunda değeri yok.
        noindex: true,
    },
    {
        path: '/sprint',
        title: 'QA Sprint Simulator: Practice a Real Bug Workflow | LearnQA.dev',
        description: 'Work a real QA sprint: analyze a bug report, write the test case, automate it, read the CI failure and gate it before merge, step by step in your browser.',
        tr: {
            title: 'QA Sprint Simülatörü: Gerçek Bug Akışı Pratiği | LearnQA.dev',
            description: 'Gerçek bir QA sprintini adım adım çalış: bug raporunu analiz et, test case yaz, otomatikleştir, CI hatasını oku ve merge öncesi doğrula.',
        },
    },
    {
        path: '/portfolio',
        title: 'QA Portfolio Builder: Turn Your Practice Into Proof | LearnQA.dev',
        description: 'Collect every mission you solved, bug you closed and topic you mastered into one QA portfolio page you can export as Markdown for GitHub or LinkedIn.',
        tr: {
            title: 'QA Portfolyo: Pratiğini Somut Kanıta Dönüştür | LearnQA.dev',
            description: 'Çözdüğün görevleri, kapattığın bug\'ları ve ustalaştığın konuları tek bir QA portfolyo sayfasında topla, Markdown olarak dışa aktarıp paylaş.',
        },
    },
    {
        path: '/leaderboard',
        title: 'XP Leaderboard for QA Learners | LearnQA.dev',
        description: 'See the top 10 LearnQA.dev members by XP, earned by completing lessons and quizzes across Selenium, Playwright, Java, Python and more.',
        tr: {
            title: 'QA Öğrenenler İçin XP Liderlik Tablosu | LearnQA.dev',
            description: 'Selenium, Playwright, Java, Python ve daha fazlasında ders ve quiz tamamlayarak XP kazanan ilk 10 LearnQA.dev üyesini gör.',
        },
    },
    {
        path: '/qa-assistant',
        title: 'AI QA Assistant for Test Automation | LearnQA.dev',
        description: 'Chat with the LearnQA AI assistant about Selenium, Playwright, Java, Python and API testing, and get feedback on your test automation code.',
        tr: {
            title: 'Test Otomasyonu İçin AI QA Asistanı | LearnQA.dev',
            description: 'LearnQA AI asistanıyla Selenium, Playwright, Java, Python ve API testi hakkında sohbet et, yazdığın test otomasyon koduna geri bildirim al.',
        },
        // Sitemap'e GİRMEZ + shell'de robots=noindex: ProtectedRoute — yalnızca üye erişebilir.
        noindex: true,
    },
    {
        // Gerçek bir sayfa değil, App.jsx route tanımıyla 1:1 eşleşmesi için var (check-seo.mjs
        // bunu zorunlu kılar). `dynamic: true` sitemap.xml, static-shell ve dist-SEO
        // kontrollerinden bilerek hariç tutar — her sertifika ID'si için ayrı sayfa
        // önceden üretilemez ve Windows'ta ":" dosya adında geçersizdir.
        path: '/verify-certificate/:id',
        title: 'Certificate Verification | LearnQA.dev',
        description: 'Verify the authenticity of a LearnQA.dev QA learning roadmap certificate using its unique certificate ID.',
        tr: {
            title: 'Sertifika Doğrulama | LearnQA.dev',
            description: 'Bir LearnQA.dev QA öğrenme yol haritası sertifikasının gerçekliğini benzersiz sertifika kimliğiyle doğrula ve geçerliliğini kontrol et.',
        },
        dynamic: true,
    },
]

// ─── Locale yardımcıları ─────────────────────────────────────────────────────

/** Pathname'den dili tespit eder. `/en` veya `/en/...` → 'en', diğer her şey → 'tr'. */
export function localeFromPathname(pathname) {
    if (pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)) return 'en'
    return DEFAULT_LOCALE
}

/** `/en/selenium` → `/selenium`. Prefix yoksa pathname'i olduğu gibi döndürür. */
export function stripLocalePrefix(pathname) {
    if (pathname === EN_PREFIX) return '/'
    if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length)
    return pathname
}

/** Route path'ini (prefix'siz) istenen dilin URL'ine çevirir. */
export function localizedPath(routePath, locale) {
    if (locale !== 'en') return routePath
    return routePath === '/' ? EN_PREFIX : `${EN_PREFIX}${routePath}`
}

/** Bir ROUTE_SEO girdisinin istenen dildeki title/description'ını verir. */
export function seoFor(entry, locale) {
    if (locale === 'tr' && entry.tr) {
        return { title: entry.tr.title, description: entry.tr.description }
    }
    return { title: entry.title, description: entry.description }
}

/**
 * TAM pathname alır (`/en/...` dahil) ve o sayfanın dile uygun SEO verisini döner.
 * Dönen `path` daima prefix'siz route path'idir; `urlPath` ise gerçek URL yoludur.
 */
export function getSeoForPath(pathname) {
    const locale = localeFromPathname(pathname)
    const routePath = stripLocalePrefix(pathname)

    const exact = ROUTE_SEO.find((item) => item.path === routePath)
    if (exact) {
        return { ...seoFor(exact, locale), path: routePath, urlPath: pathname, locale, dynamic: !!exact.dynamic }
    }

    // Sekme URL'i (/selenium/wait-strategies): hub'ın metadata'sı temel alınır,
    // canonical/hreflang ise SEKMENİN kendi adresini gösterir. Başlık ve
    // description'ın sekmeye özgü hâlini TopicPage çalışma zamanında üretir
    // (bkz. src/lib/seoOverride.js) — bölüm metni yalnızca orada yüklüdür.
    // Bu dal olmadan tüm sekme URL'leri ana sayfanın canonical'ını taşırdı.
    const segments = routePath.split('/').filter(Boolean)
    if (segments.length === 2) {
        const hubPath = `/${segments[0]}`
        const sections = SECTION_SLUGS[hubPath]
        if (sections?.some((item) => item.slug === segments[1])) {
            const hub = ROUTE_SEO.find((item) => item.path === hubPath)
            if (hub) {
                return {
                    ...seoFor(hub, locale),
                    path: routePath,
                    urlPath: pathname,
                    locale,
                    dynamic: false,
                    isSection: true,
                    hubPath,
                }
            }
        }
    }

    // '/verify-certificate/:id' sadece check-seo.mjs eşleşmesi içindir — gerçek
    // pathname'ler (örn. '/verify-certificate/3fa8...') asla o literal string'e
    // eşit olmaz, o yüzden prefix bazlı bir runtime fallback gerekiyor.
    if (routePath.startsWith('/verify-certificate/')) {
        const entry = ROUTE_SEO.find((item) => item.path === '/verify-certificate/:id')
        return { ...seoFor(entry, locale), path: routePath, urlPath: pathname, locale, dynamic: true }
    }

    return { ...seoFor(DEFAULT_SEO, locale), path: '/', urlPath: localizedPath('/', locale), locale, dynamic: false }
}

/** Mutlak canonical URL. Verilen pathname locale prefix'i içeriyorsa korunur. */
export function canonicalUrl(pathname) {
    const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
    return `${SITE_URL}${normalized}`
}

/**
 * Bir route için hreflang alternatif listesi.
 * `x-default` İngilizce sürümü işaret eder (daha geniş kitle).
 */
export function alternatesFor(routePath) {
    const bare = stripLocalePrefix(routePath)
    return [
        { hreflang: 'tr', href: canonicalUrl(localizedPath(bare, 'tr')) },
        { hreflang: 'en', href: canonicalUrl(localizedPath(bare, 'en')) },
        { hreflang: 'x-default', href: canonicalUrl(localizedPath(bare, 'en')) },
    ]
}
