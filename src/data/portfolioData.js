// src/data/portfolioData.js
// QA Portfolyo — kullanıcıya görünen TÜM metinler ve görev/bug kataloğu.
//
// Metinler neden bileşenin içinde değil burada: `check-i18n-leaks.mjs` yalnızca
// `src/data/` altındaki `*Data.js` dosyalarını tarar. Bileşen içinde kalan bir
// metin hiçbir otomatik denetimden geçmez (CLAUDE.md §23.1'deki kör nokta).
// Bu dosya STRICT_ZERO listesindedir: EN tarafında TEK bir Türkçe karakter
// (ığşçöüİĞŞÇÖÜ) build'i kırar.
//
// KATALOG NEDEN ELLE YAZILIYOR: görev başlıkları 12 ayrı `*Data.js` dosyasının
// içine gömülü. Onları import etmek portfolyo bundle'ına yüz binlerce baytlık
// ders verisi bağlardı; portfolyo hafif bir sayfa olmalı. Katalogda olmayan bir
// görev SESSİZCE DÜŞMEZ — jenerik kartla görünür (bkz. portfolioSnapshot.js).

export const portfolioData = {
    hero: {
        title: { tr: 'QA Portfolyom', en: 'My QA Portfolio' },
        intro: {
            tr: 'Burada yeni bir şey üretmiyorsun — şimdiye kadar GERÇEKTEN yaptıklarını tek sayfada görüyorsun. Çözdüğün görevler, kapattığın bug\'lar, ustalaştığın konular.',
            en: 'You are not producing anything new here — you are seeing what you have ACTUALLY done, on one page. The missions you solved, the bugs you closed, the topics you mastered.',
        },
    },

    // ─── Arayüz etiketleri ──────────────────────────────────────────────────
    ui: {
        defaultName: { tr: 'QA Öğrencisi', en: 'QA Learner' },
        defaultTitle: { tr: 'QA Automation öğreniyor', en: 'Learning QA Automation' },
        identityEdit: { tr: '✏️ Adını ve unvanını düzenle', en: '✏️ Edit your name and title' },
        identityNamePlaceholder: { tr: 'Adın (opsiyonel)', en: 'Your name (optional)' },
        identityTitlePlaceholder: { tr: 'Unvanın (opsiyonel)', en: 'Your title (optional)' },
        identitySave: { tr: 'Kaydet', en: 'Save' },
        identityCancel: { tr: 'Vazgeç', en: 'Cancel' },

        statsHeading: { tr: 'Rakamlarla', en: 'By the numbers' },
        statXp: { tr: 'Toplam XP', en: 'Total XP' },
        statXpMeaning: { tr: 'çözdüğün her egzersizden biriktirdiğin puan', en: 'points collected from every exercise you solved' },
        statMissions: { tr: 'Çözülen görev', en: 'Missions solved' },
        statMissionsMeaning: { tr: 'uçtan uca bitirdiğin 5 adımlık görev zinciri', en: 'five-step mission chains you finished end to end' },
        statBugs: { tr: 'Kapatılan bug', en: 'Bugs closed' },
        statBugsMeaning: { tr: 'sprint panosunda merge\'e hazır hâle getirdiğin hata', en: 'sprint board defects you took all the way to merge-ready' },
        statLessons: { tr: 'Tamamlanan ders', en: 'Lessons completed' },
        statLessonsMeaning: { tr: 'tüm sekmelerini bitirdiğin konu sayfası', en: 'topic pages where you finished every tab' },
        statAccuracy: { tr: 'Quiz doğruluğu', en: 'Quiz accuracy' },
        statAccuracyMeaning: { tr: 'denediğin sorularda şu anki doğru oranın', en: 'your current correct rate on the questions you attempted' },
        statStreak: { tr: 'Güncel seri', en: 'Current streak' },
        statStreakMeaning: { tr: 'günlük hedefi üst üste tutturduğun gün', en: 'consecutive days you hit the daily goal' },
        statActiveDays: { tr: 'Aktif gün', en: 'Active days' },
        statActiveDaysMeaning: { tr: 'üzerinde çalıştığın toplam gün sayısı', en: 'total number of days you put work in' },
        dayUnit: { tr: 'gün', en: 'days' },

        missionsHeading: { tr: 'İnşa Ettiklerin', en: 'What You Built' },
        missionsIntro: {
            tr: 'Her kart, bir görev zincirini uçtan uca bitirdiğinde ortaya çıkan somut çıktıdır. En yeni üstte.',
            en: 'Each card is the concrete output of a mission chain you finished end to end. Newest first.',
        },
        skillLabel: { tr: 'Beceri', en: 'Skill' },
        genericMission: { tr: 'sayfasında bir görev', en: 'page mission' },
        genericMissionNote: {
            tr: 'Bu görev tamamlandı; ayrıntılı özeti henüz yazılmadı.',
            en: 'This mission is complete; its detailed summary has not been written yet.',
        },
        openLesson: { tr: 'Derse git →', en: 'Go to the lesson →' },
        unknownDate: { tr: 'tarih kaydedilmemiş', en: 'date not recorded' },

        sprintHeading: { tr: 'Sprint Deneyimi', en: 'Sprint Experience' },
        sprintIntro: {
            tr: 'Bir QA ekibinde bug kapatmak ders bitirmekten farklıdır: raporu analiz et, test case yaz, otomatikleştir, CI\'da koştur, merge\'e hazırla.',
            en: 'Closing a bug on a QA team is different from finishing a lesson: analyze the report, write the test case, automate it, run it in CI, get it merge-ready.',
        },
        sprintFlow: {
            tr: 'Analiz → Test Case → Otomasyon → CI → Merge',
            en: 'Analyze → Test Case → Automate → CI → Merge',
        },
        sprintClosedLabel: { tr: 'Sprint tamamlandı', en: 'Sprint completed' },
        openSprint: { tr: 'Sprint panosuna git →', en: 'Go to the sprint board →' },
        severityLabels: {
            critical: { tr: 'kritik', en: 'critical' },
            major: { tr: 'yüksek', en: 'major' },
            minor: { tr: 'düşük', en: 'minor' },
        },

        skillsHeading: { tr: 'Beceri Haritası', en: 'Skill Map' },
        skillsIntro: {
            tr: 'Konu ustalık skorlarının beceri alanlarına göre ortalaması. Veri toplanmamış alanlar sıfır değil, "henüz veri yok" olarak gösterilir.',
            en: 'The average of your topic mastery scores per skill area. Areas with no data are shown as "no data yet", not as zero.',
        },
        skillNoData: { tr: 'henüz veri yok', en: 'no data yet' },

        masteryHeading: { tr: 'Ustalık Tablosu', en: 'Mastery Table' },
        masteryIntro: {
            tr: 'Sadece başladığın konular listelenir — hiç açmadığın sayfalar burada bir eksik olarak görünmez.',
            en: 'Only the topics you started are listed — pages you never opened do not appear here as gaps.',
        },
        masteryColTopic: { tr: 'Konu', en: 'Topic' },
        masteryColScore: { tr: 'Ustalık', en: 'Mastery' },
        masteryColInterview: { tr: 'Mülakat', en: 'Interview' },
        interviewLabel: { tr: 'Mülakat puanı', en: 'Interview score' },
        completedBadge: { tr: 'tamamlandı', en: 'completed' },

        milestonesHeading: { tr: 'Kariyer Rozetleri', en: 'Career Badges' },
        milestonesIntro: {
            tr: 'Kariyer haritandaki yol seviyesi bayrakları.',
            en: 'The path-level flags from your career map.',
        },

        exportButton: { tr: '📋 Markdown olarak kopyala', en: '📋 Copy as Markdown' },
        exportCopied: { tr: '✓ Panoya kopyalandı', en: '✓ Copied to clipboard' },
        exportHint: {
            tr: 'GitHub README veya LinkedIn profiline yapıştırabilirsin.',
            en: 'You can paste it into a GitHub README or your LinkedIn profile.',
        },
    },

    // ─── Markdown çıktısının başlıkları ─────────────────────────────────────
    export: {
        heading: { tr: 'QA Portfolyo', en: 'QA Portfolio' },
        statsHeading: { tr: 'Rakamlarla', en: 'By the numbers' },
        missionsHeading: { tr: 'İnşa Ettiklerim', en: 'What I Built' },
        sprintHeading: { tr: 'Sprint Deneyimi', en: 'Sprint Experience' },
        masteryHeading: { tr: 'Ustalık', en: 'Mastery' },
    },

    // ─── Boş durum (üç kademe) ──────────────────────────────────────────────
    // Ton bilinçli olarak davetkâr: "henüz bir şey yapmadın" değil, "portfolyon
    // ilk görevinle başlıyor". Boş bir portfolyo caydırmamalı.
    emptyState: {
        title: { tr: 'Portfolyon ilk görevinle başlıyor', en: 'Your portfolio starts with your first mission' },
        body: {
            tr: 'Bu sayfa senin adına hiçbir şey uydurmaz — sadece gerçekten yaptıklarını toplar. Bir görev zincirini bitirdiğinde ya da bir sprint bug\'ını kapattığında burada somut bir kart olarak belirir: ne yaptığın, hangi beceriyi kullandığın ve ne zaman yaptığın. Yüzdelik bir çubuk değil, gösterebileceğin bir çalışma günlüğü.',
            en: 'This page invents nothing on your behalf — it only gathers what you have really done. Finish a mission chain or close a sprint bug and it shows up here as a concrete card: what you did, which skill you used, and when. Not a percentage bar, but a work log you can actually show.',
        },
        missionCta: { tr: '🎯 İlk görevini çöz', en: '🎯 Solve your first mission' },
        missionCtaNote: {
            tr: 'Selenium sayfasında 5 adımlık bir login smoke testi kur.',
            en: 'Build a five-step login smoke test on the Selenium page.',
        },
        sprintCta: { tr: '🐞 Bir sprint\'e katıl', en: '🐞 Join a sprint' },
        sprintCtaNote: {
            tr: 'Gerçek bir bug raporu al ve merge\'e hazır hâle getir.',
            en: 'Take a real bug report and get it merge-ready.',
        },
        // Kısmi kademe — verisi olmayan bölüm gizlenir, yerine tek satırlık davet.
        hints: {
            missions: {
                tr: 'Bir ders sayfasındaki görev zincirini bitirdiğinde burada "İnşa Ettiklerin" bölümü açılır.',
                en: 'Finish a mission chain on a lesson page and the "What You Built" section opens up here.',
            },
            sprint: {
                tr: 'Sprint panosunda bir bug kapattığında sprint deneyimin burada listelenir.',
                en: 'Close a bug on the sprint board and your sprint experience gets listed here.',
            },
            interview: {
                tr: 'Mülakat sorularını cevaplayıp değerlendirme aldığında ustalık tablonda mülakat puanın da görünür.',
                en: 'Answer interview questions and get them graded, and your interview score appears in the mastery table too.',
            },
            careerMap: {
                tr: 'Kariyer haritanı oluşturduğunda kazandığın yol rozetleri burada görünür.',
                en: 'Build your career map and the path badges you earn will show up here.',
            },
        },
    },

    honestyNote: {
        tr: 'Bu portfolyo bir sertifika değil, bir çalışma günlüğüdür. İçindeki veriler yalnızca bu tarayıcıda saklanan yerel ilerlemenden üretilir; kimse tarafından doğrulanmamıştır ve tarayıcı verisi silinirse kaybolur.',
        en: 'This portfolio is a work log, not a certificate. Its data is generated only from the local progress stored in this browser; it is verified by no one and it disappears if the browser data is cleared.',
    },

    // ─── Route → okunabilir konu adı ───────────────────────────────────────
    // Teknoloji adları çeviriye tabi değildir (CLAUDE.md §8), bu yüzden düz
    // string. Listede olmayan bir route ham path olarak gösterilir.
    routeLabels: {
        '/selenium': 'Selenium',
        '/playwright': 'Playwright',
        '/cypress': 'Cypress',
        '/python': 'Python',
        '/typescript': 'TypeScript',
        '/javascript': 'JavaScript',
        '/java': 'Java',
        '/sql': 'SQL',
        '/git-github': 'Git & GitHub',
        '/linux': 'Linux',
        '/docker': 'Docker',
        '/jenkins': 'Jenkins',
        '/kubernetes': 'Kubernetes',
        '/kafka': 'Kafka',
        '/postman': 'Postman',
        '/bruno': 'Bruno',
        '/rest-assured': 'REST Assured',
        '/jmeter': 'JMeter',
        '/appium': 'Appium',
        '/browserstack': 'BrowserStack',
        '/aws': 'AWS',
        '/azure': 'Azure',
        '/gauge': 'Gauge',
        '/security': 'Security',
        '/claude-ai': 'Claude AI',
        '/llm-agents': 'LLM Agents',
        '/backend': 'Backend',
        '/basit-backend': 'SQL & API Lab',
        '/what-is-testing': { tr: 'Yazılım Testine Giriş', en: 'Intro to Software Testing' },
    },

    // ─── Sprint kataloğu ────────────────────────────────────────────────────
    sprintCatalog: {
        'sprint-1': { code: 'SPRINT-24', title: { tr: 'Checkout Akışı Kararlılığı', en: 'Checkout Flow Stability' } },
        'sprint-2': { code: 'SPRINT-25', title: { tr: 'API Performans ve Güvenilirlik', en: 'API Performance and Reliability' } },
    },

    // ─── Bug kataloğu (anahtar = görevin id'si) ─────────────────────────────
    bugCatalog: {
        'sprint1-lqa-101-mission': {
            key: 'LQA-101',
            severity: 'critical',
            sprintId: 'sprint-1',
            title: {
                tr: 'Yanlış şifre girilince hiçbir hata mesajı çıkmıyor',
                en: 'No error message appears when a wrong password is entered',
            },
            whatYouFixed: {
                tr: 'Frontend, sunucudan gelen 401 yanıtını sessizce yutuyor ve kullanıcıya hiçbir uyarı göstermiyordu. Hatayı önce yeniden ürettin, sonra "hata mesajı görünür" gibi gözlemlenebilir bir sonucu doğrulayan bir test case yazdın, onu assertion\'lı bir otomasyona çevirdin ve regression suite\'ine bağlayarak kalıcı bir bekçi bıraktın.',
                en: 'The frontend was silently swallowing the 401 the server returned, showing the user no warning at all. You reproduced the fault first, then wrote a test case asserting an observable outcome — "the error message is visible" — turned it into automation with a real assertion, and wired it into the regression suite as a permanent guard.',
            },
        },
        'sprint1-lqa-102-mission': {
            key: 'LQA-102',
            severity: 'major',
            sprintId: 'sprint-1',
            title: {
                tr: 'Sepette adet artırılınca toplam fiyat eski değerde kalıyor',
                en: 'Cart total stays at the old value when the quantity is increased',
            },
            whatYouFixed: {
                tr: '"Sayfa yenilenince düzeliyor" tek cümlesinden bug\'ın backend\'de değil arayüzde olduğunu teşhis ettin — bayat bir kopya gösteriliyordu. Test case\'e yenileme adımı KOYMADAN, yani bug\'ı maskelemeden yazdın; böylece test hata varken güvenilir biçimde kırmızı oluyor.',
                en: 'From the single sentence "a refresh fixes it" you diagnosed that the fault lived in the interface, not the backend — a stale copy was being rendered. You wrote the test case WITHOUT a refresh step, so it does not mask the bug and goes red reliably while the fault exists.',
            },
        },
        'sprint1-lqa-103-mission': {
            key: 'LQA-103',
            severity: 'critical',
            sprintId: 'sprint-1',
            title: {
                tr: 'Ödeme butonuna hızlı çift tıklanınca sipariş iki kez oluşuyor',
                en: 'Rapidly double-clicking the payment button creates the order twice',
            },
            whatYouFixed: {
                tr: 'Bir check-then-act yarış durumunu kapattın: butonu frontend\'de disable etmenin ilk katman olduğunu ama tek başına yetmediğini gösterdin, asıl garantiyi sunucudaki idempotency key kontrolü ve veritabanı UNIQUE kısıtı ile kurdun. CI\'daki aralıklı kırmızıyı hata değil, yarış durumunun kanıtı olarak okudun.',
                en: 'You closed a check-then-act race condition: you showed that disabling the button on the frontend is a good first layer but not sufficient on its own, and placed the real guarantee in the server-side idempotency key check plus a database UNIQUE constraint. You read the intermittent CI red as proof of the race, not as a test defect.',
            },
        },
        'sprint1-lqa-104-mission': {
            key: 'LQA-104',
            severity: 'minor',
            sprintId: 'sprint-1',
            title: {
                tr: 'Süresi geçmiş kupon kodu hâlâ indirim uyguluyor',
                en: 'An expired coupon code still applies the discount',
            },
            whatYouFixed: {
                tr: 'Sunucunun kupon geçerliliğini istemciden gelen tarihe bakarak kararlaştırdığını buldun ve kararı sunucunun kendi saatine taşıdın. Testi de aynı disiplinle yazdın: göreli ("dün") hesaplama yerine sabit, deterministik bir tarih kullandın — böylece test çalışma anına bağımlı olmaktan çıktı.',
                en: 'You found that the server decided coupon validity from a date sent by the client, and moved that decision to the server clock. You wrote the test with the same discipline: a fixed, deterministic date instead of a relative one such as "yesterday", so the test no longer depends on when it runs.',
            },
        },
        'sprint2-lqa-201-mission': {
            key: 'LQA-201',
            severity: 'major',
            sprintId: 'sprint-2',
            title: {
                tr: 'Ürün listesi endpoint\'i 200 üründen sonra çok yavaşlıyor',
                en: 'The product list endpoint becomes very slow past 200 products',
            },
            whatYouFixed: {
                tr: 'Bir N+1 sorgu problemini yakaladın ve performans testinde metrik seçiminin kendisini öğrendin: mutlak yanıt süresi kullanıcı deneyimine en yakın ölçüdür ama donanıma bağlıdır; sorgu SAYISI ise N+1\'i doğrudan yakalayan, donanımdan bağımsız bir metriktir. İkisini birlikte assert ettin.',
                en: 'You caught an N+1 query problem and learned metric selection itself: absolute response time is closest to user experience but depends on hardware, while the query COUNT catches N+1 directly and is hardware-independent. You asserted both together.',
            },
        },
        'sprint2-lqa-202-mission': {
            key: 'LQA-202',
            severity: 'critical',
            sprintId: 'sprint-2',
            title: {
                tr: 'Aynı anda gelen sipariş istekleri bazen 500 hatası döndürüyor',
                en: 'Concurrent order requests sometimes return a 500 error',
            },
            whatYouFixed: {
                tr: 'Stok güncellemesindeki "önce oku, sonra yaz" mantığını atomik bir UPDATE ile tek işleme indirdin ve bunu CountDownLatch ile gerçek eşzamanlılık üreten bir testle kanıtladın. Aralıklı kırılmanın bir test hatası değil, bug\'ın rastgele doğasının imzası olduğunu gördün.',
                en: 'You collapsed the read-then-write logic in the stock update into a single atomic UPDATE and proved it with a test that produces real concurrency using a CountDownLatch. You saw that an intermittent failure is the signature of the bug\'s random nature, not a defect in the test.',
            },
        },
    },

    // ─── Görev kataloğu (18 ders görevi) ────────────────────────────────────
    // whatYouBuilt bilinçli olarak PORTFOLYO DİLİYLE yazılır: "şunu öğrendin"
    // değil, "şunu inşa ettin" — geçmiş zaman, somut çıktı. Bir işveren okusa
    // ne yaptığını anlamalı. Görevin adımlarında olmayan hiçbir şey yazılmaz.
    missionCatalog: {
        'selenium-login-mission': {
            route: '/selenium',
            title: { tr: 'Login smoke testi kurdun', en: 'Built a login smoke test' },
            skill: { tr: 'Locator stratejisi, assertion ve explicit wait', en: 'Locator strategy, assertions and explicit waits' },
            whatYouBuilt: {
                tr: 'Bir e-ticaret login sayfası için sıfırdan smoke test kurdun: butonu en dayanıklı locator ile buldun, tıklama aksiyonunu yazdın, giriş sonrası dashboard\'ı doğrulayan assertion\'ı ekledin. Yükleme süresi 1-4 saniye arasında değiştiği için testi sabit bekleme yerine explicit wait ile stabilize ettin.',
                en: 'You built a smoke test from scratch for an e-commerce login page: located the button with the most resilient locator, wrote the click action, and added the assertion that verifies the dashboard after sign-in. Because load time varied between one and four seconds, you stabilised the test with an explicit wait instead of a fixed sleep.',
            },
        },
        'selenium-pom-refactor-mission': {
            route: '/selenium',
            title: { tr: 'Selenium testini Page Object Model\'e refactor ettin', en: 'Refactored a Selenium test into the Page Object Model' },
            skill: { tr: 'Page Object Model ve test bakım maliyeti', en: 'Page Object Model and test maintenance cost' },
            whatYouBuilt: {
                tr: 'Locator\'ları test metodunun içinde tutan ham bir Selenium testini Page Object Model\'e taşıdın: LoginPage sınıfının locator alanlarını ve constructor\'ını yazdın, login işlemini yapan eylem metodunu ekledin ve testi sayfa API\'si üstünden yeniden yazdın. UI değişince 10 dosyada yapılacak bakımı tek dosyaya indirdin.',
                en: 'You moved a raw Selenium test that kept locators inside the test method into the Page Object Model: wrote the locator fields and constructor of a LoginPage class, added the action method that performs the login, and rewrote the test through the page API. A UI change that used to mean edits in ten files now means one.',
            },
        },
        'playwright-cart-mission': {
            route: '/playwright',
            title: { tr: '"Sepete ekle" akışını Playwright ile test ettin', en: 'Tested an add-to-cart flow with Playwright' },
            skill: { tr: 'Dayanıklı locator seçimi ve web-first assertion', en: 'Resilient locator selection and web-first assertions' },
            whatYouBuilt: {
                tr: 'Bir e-ticaret sitesinde "ürünü sepete ekle" akışını uçtan uca test ettin: dayanıklı locator stratejisini seçtin, tıklama satırını yazdın ve sepet modalının göründüğünü web-first assertion ile doğruladın. Modal 200ms ile 1.5sn arasında beliriyordu; auto-wait sayesinde ekstra bekleme yazmadan testi tek parça hâline getirdin.',
                en: 'You tested an add-to-cart flow end to end on an e-commerce site: chose the resilient locator strategy, wrote the click, and verified the cart modal with a web-first assertion. The modal appeared anywhere between 200ms and 1.5s; thanks to auto-waiting you assembled it into a single test without writing any extra wait.',
            },
        },
        'playwright-pom-refactor-mission': {
            route: '/playwright',
            title: { tr: 'Playwright testini Page Object ile yeniden yapılandırdın', en: 'Restructured a Playwright test with a Page Object' },
            skill: { tr: 'Page Object ve async eylem metotları', en: 'Page Objects and async action methods' },
            whatYouBuilt: {
                tr: 'Locator\'ları test dosyasında tutan bir Playwright testini Page Object\'e taşıdın: LoginPage sınıfının locator alanını ve constructor\'ını yazdın, login\'i yapan async metodu ekledin ve test dosyasını sayfa nesnesi üzerinden yeniden yazdın. Buton metni değiştiğinde 15 dosyada yapılacak değişikliği tek noktaya indirdin.',
                en: 'You moved a Playwright test that kept locators in the spec file into a Page Object: wrote the locator field and constructor of a LoginPage class, added the async method that performs the login, and rewrote the spec through the page object. A button-label change that used to touch fifteen files now touches one.',
            },
        },
        'cypress-search-mission': {
            route: '/cypress',
            title: { tr: 'Ürün arama akışı için Cypress testi yazdın', en: 'Wrote a Cypress test for a product search flow' },
            skill: { tr: 'Selector seçimi ve retry-able assertion', en: 'Selector selection and retry-able assertions' },
            whatYouBuilt: {
                tr: 'Bir e-ticaret sitesinde "ürün ara" akışını test ettin: arama kutusunu güvenilir bir selector ile buldun, aramayı yazdın ve en az bir sonuç kartının göründüğünü retry-able assertion ile doğruladın. Sonuçlar 100-800ms arasında geldiğinden sabit cy.wait() yerine koşul bekleyen .should() kullandın.',
                en: 'You tested a product search flow on an e-commerce site: found the search box with a reliable selector, typed the query, and verified that at least one result card appeared using a retry-able assertion. Since results arrived between 100ms and 800ms, you used a condition-based .should() instead of a fixed cy.wait().',
            },
        },
        'cypress-network-stub-mission': {
            route: '/cypress',
            title: { tr: 'Network stubbing ile loading ve hata durumlarını test ettin', en: 'Tested loading and error states with network stubbing' },
            skill: { tr: 'cy.intercept ile istek stub\'lama ve hata senaryosu simülasyonu', en: 'Request stubbing with cy.intercept and error-state simulation' },
            whatYouBuilt: {
                tr: 'Gerçek API\'nin 2 saniye sürmesini beklemek yerine isteği gecikmeyle stub eden bir intercept yazdın; loading spinner\'ın istek sırasında göründüğünü ve bitince kaybolduğunu doğruladın. Ardından aynı iskeleti 500 hatasına uyarlayıp arayüzün hata mesajı gösterdiğini kanıtladın — sunucuyu hiç bozmadan.',
                en: 'Instead of waiting the real two seconds for the API, you wrote an intercept that stubs the request with a delay, and verified that the loading spinner appears during the request and disappears when it completes. You then adapted the same skeleton to a 500 response and proved the interface shows an error message — without ever breaking the server.',
            },
        },
        'python-api-test-mission': {
            route: '/python',
            title: { tr: 'pytest ile API smoke testi kurdun', en: 'Built an API smoke test with pytest' },
            skill: { tr: 'fixture, assert ve parametrize', en: 'Fixtures, asserts and parametrize' },
            whatYouBuilt: {
                tr: 'Bir kullanıcı API\'si için pytest testi kurdun: base URL tekrarını fixture ile ortadan kaldırdın, 200 durum kodunu doğrulayan assert satırını yazdın ve aynı testi üç farklı kullanıcı ID\'siyle koşturmak için parametrize kullandın. Dördünü tek bir çalışan test hâlinde birleştirdin.',
                en: 'You built a pytest test for a user API: removed the repeated base URL with a fixture, wrote the assert that verifies the 200 status code, and used parametrize to run the same test against three different user IDs. You assembled all of it into one working test.',
            },
        },
        'python-traceback-debug-mission': {
            route: '/python',
            title: { tr: 'CI\'da kırmızı olan bir testin kök nedenini buldun ve düzelttin', en: 'Found and fixed the root cause of a red CI test' },
            skill: { tr: 'Traceback okuma, kök neden analizi ve regresyon testi', en: 'Reading tracebacks, root-cause analysis and regression tests' },
            whatYouBuilt: {
                tr: 'CI\'da başarısız olan bir testin traceback\'ini en alttan okuyup hatalı satırı buldun, None dönmenin de yeterli olmadığını görüp düzeltmeyi anlamlı bir varsayılan değerle tamamladın. Sonra aynı hatanın bir daha sessizce geri gelmesini engelleyen bir regresyon testi yazdın.',
                en: 'You read the traceback of a failing CI test from the bottom up, found the offending line, recognised that returning None was not good enough either, and completed the fix with a meaningful default. Then you wrote a regression test that stops the same fault from quietly returning.',
            },
        },
        'sql-price-validation-mission': {
            route: '/sql',
            title: { tr: 'Production fiyat verisini doğrulayan SQL sorgusu yazdın', en: 'Wrote a SQL query that validates production price data' },
            skill: { tr: 'WHERE koşulları, ORDER BY ve NULL semantiği', en: 'WHERE conditions, ORDER BY and NULL semantics' },
            whatYouBuilt: {
                tr: 'Bir products tablosunda veri doğrulama sorgusu kurdun: negatif fiyatları getiren WHERE koşulunu seçtin, sonuçları en kötü örnek en üstte olacak şekilde sıraladın ve `price < 0` koşulunun NULL fiyatları SESSİZCE elediğini fark edip sorguyu eksik fiyatları da yakalayacak şekilde tamamladın.',
                en: 'You built a data validation query on a products table: chose the WHERE condition that returns negative prices, ordered the results so the worst offender is on top, then noticed that `price < 0` SILENTLY drops NULL prices and completed the query so it catches missing prices too.',
            },
        },
        'sql-orphan-orders-mission': {
            route: '/sql',
            title: { tr: 'Yetim siparişleri bulan referans bütünlüğü sorgusu yazdın', en: 'Wrote a referential integrity query that finds orphaned orders' },
            skill: { tr: 'LEFT JOIN, NULL filtreleme ve referans bütünlüğü', en: 'LEFT JOIN, NULL filtering and referential integrity' },
            whatYouBuilt: {
                tr: 'Müşterisi silinmiş siparişleri bulmak için orders ve customers tablolarını LEFT JOIN ile birleştirdin, sonucu sadece eşleşmeyen kayıtları gösterecek şekilde filtreledin ve aynı sorgunun INNER JOIN ile yazılsaydı her zaman sıfır satır döndüreceğini — yani bug\'ı sessizce gizleyeceğini — gösterdin.',
                en: 'To find orders whose customer was deleted, you joined the orders and customers tables with a LEFT JOIN, filtered the result down to the non-matching rows, and showed that the same query written with an INNER JOIN would always return zero rows — silently hiding the fault.',
            },
        },
        'restassured-user-api-mission': {
            route: '/rest-assured',
            title: { tr: 'REST Assured ile pozitif ve negatif API senaryosu yazdın', en: 'Wrote positive and negative API scenarios with REST Assured' },
            skill: { tr: 'given/when/then zinciri, status ve body doğrulama', en: 'The given/when/then chain, status and body verification' },
            whatYouBuilt: {
                tr: 'Bir kullanıcı API\'si için REST Assured testi kurdun: tam given/when/then zincirini yazıp 200 durum kodunu doğruladın, dönen JSON\'daki id alanını da assert ettin ve var olmayan bir kullanıcı için 404 bekleyen negatif senaryoyu ekledin. Happy path iskeletini hata senaryosuna uyarladın.',
                en: 'You built a REST Assured test for a user API: wrote the full given/when/then chain verifying the 200 status code, also asserted the id field in the returned JSON, and added the negative scenario expecting a 404 for a user that does not exist. You adapted the happy-path skeleton into the failure case.',
            },
        },
        'restassured-chain-mission': {
            route: '/rest-assured',
            title: { tr: 'POST → extract → guard → GET test zinciri kurdun', en: 'Built a POST to extract to guard to GET test chain' },
            skill: { tr: 'Yanıttan değer çıkarma ve zincir koruması', en: 'Extracting values from responses and guarding the chain' },
            whatYouBuilt: {
                tr: 'Kullanıcı oluşturma ve doğrulama zinciri kurdun: POST isteğini yazıp sunucunun döndürdüğü id\'yi çıkardın, o id ile GET yaparak kaydın gerçekten oluştuğunu doğruladın ve POST başarısız olduğunda GET adımının kafa karıştırıcı hatalar üretmesini engelleyen koruma satırını ekledin. id\'yi hardcode etmedin.',
                en: 'You built a create-and-verify chain: wrote the POST request and extracted the id the server returned, used that id in a GET to confirm the record was really created, and added the guard that stops the GET step from producing confusing failures when the POST fails. You never hardcoded the id.',
            },
        },
        'docker-selenium-grid-mission': {
            route: '/docker',
            title: { tr: 'Testleri container tabanlı Selenium Grid\'e taşıdın', en: 'Moved tests onto a container-based Selenium Grid' },
            skill: { tr: 'docker-compose, RemoteWebDriver ve container kaynak ayarları', en: 'docker-compose, RemoteWebDriver and container resource settings' },
            whatYouBuilt: {
                tr: 'Herkesin kendi laptop\'unda farklı Chrome sürümüyle koştuğu "bende geçiyor" kaosunu tekilleştirdin: docker-compose.yml içinde hub ve node servislerini tanımladın, Java testini yerel ChromeDriver yerine hub\'a bağlayan RemoteWebDriver kodunu yazdın ve Chrome node\'una paylaşımlı bellek ayarını ekledin. `depends_on`\'un başlatma sırası verdiğini ama hazır olmayı garanti etmediğini de gösterdin.',
                en: 'You put an end to the "works on my machine" chaos of everyone running a different Chrome build locally: defined the hub and node services in docker-compose.yml, wrote the RemoteWebDriver code that points the Java test at the hub instead of a local ChromeDriver, and added the shared-memory setting for the Chrome node. You also showed that `depends_on` orders startup but does not guarantee readiness.',
            },
        },
        'jenkins-pipeline-mission': {
            route: '/jenkins',
            title: { tr: 'İlk Jenkins pipeline\'ını yazdın', en: 'Wrote your first Jenkins pipeline' },
            skill: { tr: 'Declarative pipeline, stage/steps ve post/failure bildirimi', en: 'Declarative pipelines, stage/steps and post/failure notification' },
            whatYouBuilt: {
                tr: 'Elle `mvn test` çalıştırmaktan çıkıp her commit\'te testleri koşan bir Jenkins pipeline\'ı yazdın: Test stage\'i olan declarative iskeleti kurdun, kırmızı bir build\'in kimseye haber vermeden geçip gitmesini engelleyen `post { failure { ... } }` bloğunu ekledin ve `agent any`\'nin ortam tutarlılığı açısından taşıdığı gizli riski gösterdin.',
                en: 'You moved from running `mvn test` by hand to a Jenkins pipeline that runs the tests on every commit: built the declarative skeleton with a Test stage, added the `post { failure { ... } }` block that stops a red build from passing unnoticed, and showed the hidden environment-consistency risk in `agent any`.',
            },
        },
        'git-merge-conflict-mission': {
            route: '/git-github',
            title: { tr: 'Bir merge conflict\'i uçtan uca çözdün', en: 'Resolved a merge conflict end to end' },
            skill: { tr: 'Çakışma işaretlerini okuma, çözme ve doğrulama', en: 'Reading, resolving and verifying conflict markers' },
            whatYouBuilt: {
                tr: 'İki branch\'in aynı satırı değiştirdiği gerçek bir merge conflict\'ini sistemli biçimde kapattın: çakışma işaretlerini okuyup doğru satırı bırakarak dosyayı düzelttin, temizlenmemiş işaretlerin derleme ve CI hatasına dönüştüğünü gösterdin, add/commit sırasıyla çözümü tamamladın ve `git status` ile başka dosya kalmadığını doğruladın.',
                en: 'You closed a real merge conflict where two branches changed the same line, methodically: read the conflict markers and fixed the file by keeping the right line, showed how uncleaned markers turn into compile and CI failures, completed the resolution with the correct add and commit order, and verified with `git status` that no file was left behind.',
            },
        },
        'java-parameterized-test-mission': {
            route: '/java',
            title: { tr: 'Kopyala-yapıştır testleri tek parametreli teste dönüştürdün', en: 'Turned copy-paste tests into one parameterized test' },
            skill: { tr: 'JUnit 5 @ParameterizedTest ve veri odaklı test', en: 'JUnit 5 @ParameterizedTest and data-driven testing' },
            whatYouBuilt: {
                tr: 'Login formunu üç geçersiz girdiyle test eden neredeyse birebir aynı üç metodu tek bir `@ParameterizedTest` + `@ValueSource` testine indirdin ve assertion\'ı ekleyerek tamamladın. Böylece kopyala-yapıştır testlerin en büyük riskini — birinde yapılan düzeltmenin diğerlerine yansımaması, yani sessiz tutarsızlık — yapısal olarak ortadan kaldırdın.',
                en: 'You collapsed three nearly identical methods that tested a login form with three invalid inputs into a single `@ParameterizedTest` with `@ValueSource`, and completed it with the assertion. That structurally removes the biggest risk of copy-paste tests: a fix applied to one copy and not the others, that is, silent inconsistency.',
            },
        },
        'postman-chained-request-mission': {
            route: '/postman',
            title: { tr: 'Token taşıyan zincirlenmiş Postman testi yazdın', en: 'Wrote a chained Postman test that carries a token' },
            skill: { tr: 'pm.test assertion\'ları ve environment değişkeniyle zincirleme', en: 'pm.test assertions and chaining through environment variables' },
            whatYouBuilt: {
                tr: 'Login isteğine 200 bekleyen bir `pm.test()` yazdın, cevaptan token\'ı çıkarıp bir environment değişkenine kaydettin ve sonraki isteğin bu değişkeni Authorization header\'ında nasıl kullandığını kurdun. Token\'ı elle yapıştırmanın neden bayatlayan, kırılgan bir çözüm olduğunu da gösterdin.',
                en: 'You wrote a `pm.test()` expecting 200 on the login request, extracted the token from the response into an environment variable, and wired the next request to use it in the Authorization header. You also showed why pasting the token by hand is a stale, brittle solution.',
            },
        },
        'linux-ci-debug-mission': {
            route: '/linux',
            title: { tr: 'GUI\'siz bir CI agent\'ında takılan testi komut satırıyla teşhis ettin', en: 'Diagnosed a hung test on a headless CI agent from the command line' },
            skill: { tr: 'ps, grep, lsof ve tail -f ile canlı hata ayıklama', en: 'Live debugging with ps, grep, lsof and tail -f' },
            whatYouBuilt: {
                tr: '10 dakikadır ne geçen ne kırılan bir CI koşumunu sadece komut satırıyla çözdün: `ps aux | grep` ile chromedriver\'ın gerçekten çalışıp çalışmadığını buldun, "Address already in use" hatasının anlamını çözüp 4444 portunu tutan process\'i `lsof` ile tespit ettin ve log dosyasını `tail -f` ile canlı izleyerek testin nerede takıldığını gördün.',
                en: 'You solved a CI run that had been neither passing nor failing for ten minutes using nothing but the command line: found out with `ps aux | grep` whether chromedriver was actually running, decoded the "Address already in use" error and identified the process holding port 4444 with `lsof`, and watched the log live with `tail -f` to see exactly where the test was stuck.',
            },
        },
    },
}

export default portfolioData
