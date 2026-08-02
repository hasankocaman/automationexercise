// ─── Test Otomasyonu — "test otomasyonu" sorgusunun TEK sahibi hub sayfası ───
// Documents/seo-phase-3-plan.md §5 (C1): şu ana kadar bu sorguyu ana sayfa ile
// /test-frameworks paylaşıyordu, ikisi de kazanmıyordu. Bu sayfa hem o sorgunun
// sahibi hem de sitedeki derin sayfalara (Selenium, Playwright, Python, API
// testi, Jenkins) dağıtan merkez. Tek ağaçlı veri dosyası (gaugeData.js deseni):
// `sections` iki dile de AYNI referansla verilir, metin alanları { tr, en }.
import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

// ══════════════════════════════════════════════════════════════════════════
// 0. TEST OTOMASYONU NEDİR? — video + animasyon + sandbox
// ══════════════════════════════════════════════════════════════════════════

const introDecisionFilm = {
  type: 'video-scene',
  id: 'test-automation-intro-decision-film',
  title: {
    tr: '🎬 Bir Hatanın "Otomatikleştirilsin mi?" Yolculuğu',
    en: '🎬 A Bug\'s Journey Through "Should This Be Automated?"',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'bug', emoji: '🐞', label: { tr: 'Bug Raporu', en: 'Bug Report' }, color: '#ef4444' },
    { id: 'manual', emoji: '🧍', label: { tr: 'Manuel Test', en: 'Manual Test' }, color: '#f59e0b' },
    { id: 'triage', emoji: '🔍', label: { tr: 'Tekrar Olasılığı?', en: 'Will It Recur?' }, color: '#8b5cf6' },
    { id: 'backlog', emoji: '📋', label: { tr: 'Otomasyon Backlog', en: 'Automation Backlog' }, color: '#6366f1' },
    { id: 'script', emoji: '🤖', label: { tr: 'Otomasyon Scripti', en: 'Automation Script' }, color: '#22c55e' },
    { id: 'ci', emoji: '🔁', label: { tr: 'Her Commit\'te Koşar', en: 'Runs on Every Commit' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir tester, login formunda bir hata bulur: yanlış şifre girildiğinde hata mesajı görünmüyor. Rapor açılır.',
        en: 'A tester finds a bug in the login form: no error message appears when the wrong password is entered. A report is filed.',
      },
      positions: { bug: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Hata önce manuel olarak doğrulanır — gerçekten tekrarlanabilir mi, yoksa tek seferlik bir tuhaflık mı?',
        en: 'The bug is first verified manually — is it truly reproducible, or a one-off fluke?',
      },
      positions: {
        bug: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        manual: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'bug', to: 'manual' }],
    },
    {
      caption: {
        tr: 'Asıl karar burada verilir: bu kontrol GELECEKTE de her sürümde tekrar sorulacak mı? Cevap evetse otomasyon adayıdır.',
        en: 'The real decision happens here: will this check need to be asked again on EVERY future release? If yes, it is an automation candidate.',
      },
      positions: {
        manual: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        triage: { x: 50, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'manual', to: 'triage', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Tekrarlanacaksa backlog\'a düşer — hemen yazılmaz, önceliklendirilir.',
        en: 'If it will recur, it goes into the backlog — not written immediately, but prioritized.',
      },
      positions: {
        triage: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        backlog: { x: 50, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'triage', to: 'backlog', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Sıra geldiğinde bir otomasyon scripti yazılır — bu artık manuel testin YERİNE geçen, tekrarlanabilir bir kontroldür.',
        en: 'When its turn comes, an automation script is written — a repeatable check that now REPLACES the manual test.',
      },
      positions: {
        backlog: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        script: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'backlog', to: 'script', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ve artık her commit\'te otomatik çalışır — aynı soruyu bir insan bir daha ASLA elle sormak zorunda kalmaz.',
        en: 'And now it runs automatically on every commit — a human never has to ask this exact question by hand again.',
      },
      positions: {
        script: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        ci: { x: 55, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'script', to: 'ci', color: '#10b981' }],
    },
  ],
}

const introDecisionSteps = {
  type: 'step-animation',
  id: 'test-automation-intro-decision-steps',
  title: { tr: 'Adım Adım: Bir Kontrol Otomasyona Nasıl Dönüşür?', en: 'Step by Step: How a Check Becomes Automation' },
  steps: [
    { id: 1, icon: '🐞', label: { tr: 'Hata/kontrol tanımlanır', en: 'A bug/check is identified' }, detail: { tr: 'Bir test senaryosu ya da bulunan bir hata, gelecekte tekrar sorulacak bir soru olarak işaretlenir.', en: 'A test scenario or a found bug is flagged as a question that will need to be asked again in the future.' } },
    { id: 2, icon: '🔍', label: { tr: 'Tekrarlanabilirlik değerlendirilir', en: 'Reproducibility is assessed' }, detail: { tr: 'Bu kontrol her sürümde mi, yoksa tek seferlik mi? Sadece tekrarlanan kontroller otomasyona değer.', en: 'Is this check needed every release, or just once? Only repeated checks are worth automating.' } },
    { id: 3, icon: '✍️', label: { tr: 'Script yazılır', en: 'The script is written' }, detail: { tr: 'Selenium, Playwright veya Cypress ile o KONTROLÜ tekrar tekrar çalıştıracak kod yazılır.', en: 'Code is written with Selenium, Playwright or Cypress to run that CHECK repeatedly.' } },
    { id: 4, icon: '🔁', label: { tr: 'CI\'a bağlanır', en: 'It is wired into CI' }, detail: { tr: 'Script Jenkins/GitHub Actions gibi bir pipeline\'a eklenir — artık insan tetiklemeden her commit\'te çalışır.', en: 'The script is added to a pipeline like Jenkins/GitHub Actions — it now runs on every commit without a human triggering it.' } },
    { id: 5, icon: '📊', label: { tr: 'Sonuç izlenir', en: 'The result is monitored' }, detail: { tr: 'Test kırmızı olursa ekip anında haberdar olur — sessiz bir regresyon artık production\'a sızamaz.', en: 'If the test goes red, the team is notified instantly — a silent regression can no longer slip into production.' } },
  ],
}

const introPractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-intro',
  id: 'test-automation-intro-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Otomasyona Değer mi?', en: 'Try It Yourself: Is It Worth Automating?' },
  starterCode: {
    tr: `// Senaryo: Bir checkout akisinda "kupon kodu gecersizse hata goster" kontrolu var.
// Bu kontrol HER surum oncesi elle test ediliyor ve HIC degismiyor.
// TODO: bu otomasyona deger mi? "evet" ya da "hayir" yaz ve NEDEN oldugunu yorum satirina ekle.
const otomasyonaDeger = "?"; // "evet" | "hayir"`,
    en: `// Scenario: a checkout flow has a "show error if coupon code is invalid" check.
// This check is tested manually before EVERY release and NEVER changes.
// TODO: is this worth automating? write "yes" or "no" and add WHY as a comment.
const worthAutomating = "?"; // "yes" | "no"`,
  },
  solutionCode: {
    tr: `// Senaryo: Bir checkout akisinda "kupon kodu gecersizse hata goster" kontrolu var.
// Bu kontrol HER surum oncesi elle test ediliyor ve HIC degismiyor.
const otomasyonaDeger = "evet"; // her surumde tekrarlanan, davranisi sabit bir kontrol klasik otomasyon adayi`,
    en: `// Scenario: a checkout flow has a "show error if coupon code is invalid" check.
// This check is tested manually before EVERY release and NEVER changes.
const worthAutomating = "yes"; // a check repeated every release with stable behavior is a classic automation candidate`,
  },
  hint: {
    tr: 'Bir kontrolü otomatikleştirmeye değer kılan şey karmaşıklığı değil, TEKRAR SIKLIĞIdır — her sürümde sorulan, davranışı sabit bir soru otomasyona değer.',
    en: 'What makes a check worth automating is not its complexity but how often it REPEATS — a question asked every release with stable expected behavior is worth automating.',
  },
  successMessage: {
    tr: 'Doğru! Her sürümde aynı şekilde sorulan bir kontrol, klasik bir otomasyon adayıdır.',
    en: 'Correct! A check asked the same way on every release is a classic automation candidate.',
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 1. NE ZAMAN OTOMATİKLEŞTİRİLİR, NE ZAMAN EDİLMEZ — video + animasyon + sandbox
// ══════════════════════════════════════════════════════════════════════════

const whenNotFilm = {
  type: 'video-scene',
  id: 'test-automation-when-not-film',
  title: { tr: '🎬 Yeni Bir Özelliğin İlk Günü', en: '🎬 A New Feature\'s First Day' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'feature', emoji: '✨', label: { tr: 'Yeni Özellik', en: 'New Feature' }, color: '#0ea5e9' },
    { id: 'explorer', emoji: '🕵️', label: { tr: 'Keşifsel Test', en: 'Exploratory Testing' }, color: '#f59e0b' },
    { id: 'unstable', emoji: '🌀', label: { tr: 'Davranış Hâlâ Değişiyor', en: 'Behavior Still Changing' }, color: '#ef4444' },
    { id: 'stable', emoji: '🧱', label: { tr: 'Davranış Sabitlendi', en: 'Behavior Stabilized' }, color: '#8b5cf6' },
    { id: 'automate', emoji: '🤖', label: { tr: 'Şimdi Otomatikleştir', en: 'Now Automate' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir özellik ilk kez yayına çıkar — henüz kimse onunla ilgili bütün soruları bilmiyor.',
        en: 'A feature ships for the first time — nobody yet knows all the questions to ask about it.',
      },
      positions: { feature: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Bir insan onu keşfeder: beklenmedik girdiler dener, sınırları zorlar, "ya şunu yaparsam?" diye sorar. Bu, bir script\'in henüz YAPAMAYACAĞI bir iştir.',
        en: 'A human explores it: tries unexpected inputs, pushes boundaries, asks "what if I do this?". This is something a script cannot YET do.',
      },
      positions: {
        feature: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        explorer: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'feature', to: 'explorer' }],
    },
    {
      caption: {
        tr: 'İlk haftalarda özellik hâlâ değişiyor olabilir — UI\'da metin değişir, akış küçük düzeltmeler alır. Bu aşamada yazılan bir otomasyon her değişiklikte KIRILIR.',
        en: 'In the first weeks the feature may still be changing — text shifts in the UI, the flow gets small tweaks. Automation written at this stage BREAKS with every change.',
      },
      positions: {
        explorer: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        unstable: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'explorer', to: 'unstable', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Birkaç sürüm sonra davranış sabitlenir — artık UI ve akış nadiren değişiyor.',
        en: 'A few releases later, behavior stabilizes — the UI and flow rarely change anymore.',
      },
      positions: {
        unstable: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        stable: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'unstable', to: 'stable', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'İşte ŞİMDİ otomatikleştirmenin tam zamanı — kararlı bir davranışı, tekrar tekrar, insan yorulmadan kontrol edecek bir script.',
        en: 'THIS is exactly the right time to automate — a script that checks stable behavior over and over, without a human getting tired.',
      },
      positions: {
        stable: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        automate: { x: 55, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'stable', to: 'automate', color: '#22c55e' }],
    },
  ],
}

const whenNotSteps = {
  type: 'step-animation',
  id: 'test-automation-when-not-steps',
  title: { tr: 'Karar Sırası: Otomatikleştir mi, Manuel mi Kalsın?', en: 'Decision Order: Automate or Stay Manual?' },
  steps: [
    { id: 1, icon: '🔁', label: { tr: 'Tekrarlanıyor mu?', en: 'Does it repeat?' }, detail: { tr: 'Bu kontrol her sürümde mi soruluyor, yoksa tek seferlik mi? Tek seferlikse otomasyon israftır.', en: 'Is this check asked every release, or just once? If once, automation is wasted effort.' } },
    { id: 2, icon: '🧱', label: { tr: 'Davranış sabit mi?', en: 'Is the behavior stable?' }, detail: { tr: 'UI/akış hâlâ hızla değişiyorsa, yazdığın script bir sonraki sürümde kırılır — önce sabitlenmesini bekle.', en: 'If the UI/flow is still changing fast, the script you write breaks next release — wait for it to stabilize first.' } },
    { id: 3, icon: '👁️', label: { tr: 'Görsel/öznel bir yargı mı?', en: 'Is it a visual/subjective judgment?' }, detail: { tr: '"Bu tasarım güzel görünüyor mu?" gibi öznel sorular otomasyona uygun değildir — insan gözü gerekir.', en: 'Subjective questions like "does this design look good?" are not suited to automation — they need a human eye.' } },
    { id: 4, icon: '⚖️', label: { tr: 'Yazım maliyeti > tekrar sayısı mı?', en: 'Is writing cost > repeat count?' }, detail: { tr: 'Bir kontrolü 3 saatte otomatikleştirip yılda 2 kez koşacaksan, elle yapmak muhtemelen daha ucuzdur.', en: 'If automating a check takes 3 hours but it only runs twice a year, doing it manually is probably cheaper.' } },
  ],
}

const whenNotPractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-when-not',
  id: 'test-automation-when-not-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Otomatikleştir mi, Etme mi?', en: 'Try It Yourself: Automate or Not?' },
  starterCode: {
    tr: `// Senaryo: Yeni yayinlanan bir "karanlik mod" ozelliginin renk paletinin
// GORSEL OLARAK goze hos gorunup gorunmedigini kontrol etmen isteniyor.
// TODO: "evet" ya da "hayir" yaz.
const otomatiklestir = "?";`,
    en: `// Scenario: you're asked to check whether a newly released "dark mode"
// feature's color palette looks VISUALLY pleasant.
// TODO: write "yes" or "no".
const shouldAutomate = "?";`,
  },
  solutionCode: {
    tr: `// Senaryo: Yeni yayinlanan bir "karanlik mod" ozelliginin renk paletinin
// GORSEL OLARAK goze hos gorunup gorunmedigini kontrol etmen isteniyor.
const otomatiklestir = "hayir"; // oznel bir estetik yargidir, script bunu degerlendiremez`,
    en: `// Scenario: you're asked to check whether a newly released "dark mode"
// feature's color palette looks VISUALLY pleasant.
const shouldAutomate = "no"; // this is a subjective aesthetic judgment a script cannot evaluate`,
  },
  hint: {
    tr: '"Güzel görünüyor mu?" öznel bir yargıdır — bir script renk kodunu karşılaştırabilir ama "hoş" olup olmadığına karar veremez.',
    en: '"Does it look nice?" is a subjective judgment — a script can compare color codes but cannot decide if something looks pleasant.',
  },
  successMessage: {
    tr: 'Doğru! Öznel/görsel yargılar manuel/keşifsel testte kalmalı.',
    en: 'Correct! Subjective/visual judgments should stay in manual/exploratory testing.',
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 2. ARAÇ SEÇİMİ — video + animasyon + sandbox
// ══════════════════════════════════════════════════════════════════════════

const toolChoiceFilm = {
  type: 'video-scene',
  id: 'test-automation-tool-choice-film',
  title: { tr: '🎬 Bir Ekibin Araç Seçimi Toplantısı', en: '🎬 A Team\'s Tool Selection Meeting' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'question', emoji: '❓', label: { tr: 'Hangi Aracı Seçelim?', en: 'Which Tool Should We Pick?' }, color: '#0ea5e9' },
    { id: 'lang', emoji: '💬', label: { tr: 'Ekip Hangi Dili Biliyor?', en: 'What Language Does the Team Know?' }, color: '#f59e0b' },
    { id: 'platform', emoji: '📱', label: { tr: 'Web mi, Mobil mi?', en: 'Web or Mobile?' }, color: '#8b5cf6' },
    { id: 'selenium', emoji: '🔵', label: { tr: 'Selenium', en: 'Selenium' }, color: '#2563eb' },
    { id: 'playwright', emoji: '🎭', label: { tr: 'Playwright', en: 'Playwright' }, color: '#22c55e' },
    { id: 'appium', emoji: '📲', label: { tr: 'Appium', en: 'Appium' }, color: '#ec4899' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Yeni bir projede ilk soru her zaman aynıdır: hangi otomasyon aracını seçelim?',
        en: 'On a new project the first question is always the same: which automation tool should we pick?',
      },
      positions: { question: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'İlk kriter ekibin dil bilgisidir — ekip zaten Java biliyorsa Selenium/REST Assured doğal bir seçimdir.',
        en: 'The first criterion is the team\'s language knowledge — if the team already knows Java, Selenium/REST Assured is a natural fit.',
      },
      positions: {
        question: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        lang: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'question', to: 'lang' }],
    },
    {
      caption: {
        tr: 'İkinci kriter platformdur — test edilen şey web mi, mobil bir uygulama mı?',
        en: 'The second criterion is the platform — is what you\'re testing a web app or a mobile app?',
      },
      positions: {
        lang: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        platform: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'lang', to: 'platform', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Web + geniş ekosistem + uzun sektör geçmişi isteniyorsa: Selenium.',
        en: 'If you need web + a wide ecosystem + a long industry track record: Selenium.',
      },
      positions: {
        platform: { x: 20, y: 35, opacity: 0.5, scale: 0.8 },
        selenium: { x: 50, y: 30, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'platform', to: 'selenium', color: '#2563eb' }],
    },
    {
      caption: {
        tr: 'Web + modern auto-wait + daha az flaky test isteniyorsa: Playwright.',
        en: 'If you need web + modern auto-waiting + fewer flaky tests: Playwright.',
      },
      positions: {
        platform: { x: 20, y: 50, opacity: 0.5, scale: 0.8 },
        playwright: { x: 50, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'platform', to: 'playwright', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Mobil (iOS/Android native veya hybrid) test ediliyorsa: Appium.',
        en: 'If you are testing mobile (iOS/Android native or hybrid): Appium.',
      },
      positions: {
        platform: { x: 20, y: 65, opacity: 0.5, scale: 0.8 },
        appium: { x: 50, y: 70, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'platform', to: 'appium', color: '#ec4899' }],
    },
  ],
}

const toolChoiceSteps = {
  type: 'step-animation',
  id: 'test-automation-tool-choice-steps',
  title: { tr: 'Adım Adım: Doğru Aracı Seçme Sırası', en: 'Step by Step: The Order for Choosing the Right Tool' },
  steps: [
    { id: 1, icon: '💬', label: { tr: 'Ekibin dil bilgisi', en: 'The team\'s language knowledge' }, detail: { tr: 'Java bilen bir ekip için Selenium/REST Assured, TypeScript bilen bir ekip için Playwright öğrenme eğrisi çok daha kısadır.', en: 'For a Java team, Selenium/REST Assured has a much shorter learning curve; for a TypeScript team, Playwright does.' } },
    { id: 2, icon: '📱', label: { tr: 'Platform', en: 'Platform' }, detail: { tr: 'Web için Selenium/Playwright/Cypress, mobil için Appium — platform yanlış seçilirse araç hiç işe yaramaz.', en: 'Selenium/Playwright/Cypress for web, Appium for mobile — pick the wrong platform fit and the tool is useless.' } },
    { id: 3, icon: '⚡', label: { tr: 'Kararlılık ihtiyacı', en: 'Stability needs' }, detail: { tr: 'Flaky testlerden bıkmış bir ekip için Playwright\'ın auto-wait mekanizması büyük bir rahatlama sağlar.', en: 'For a team tired of flaky tests, Playwright\'s auto-wait mechanism is a major relief.' } },
    { id: 4, icon: '🏢', label: { tr: 'Kurumsal ekosistem', en: 'Enterprise ecosystem' }, detail: { tr: 'Selenium Grid, uzun yıllara dayanan entegrasyonlar ve büyük topluluk desteği isteyen kurumsal projeler için hâlâ güçlü bir seçimdir.', en: 'For enterprise projects that need Selenium Grid, years of integrations and a large community, it remains a strong choice.' } },
  ],
}

const toolChoicePractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-tool-choice',
  id: 'test-automation-tool-choice-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Doğru Aracı Seç', en: 'Try It Yourself: Pick the Right Tool' },
  starterCode: `// Senaryo: Ekip TypeScript biliyor, sadece web uygulamasi test edilecek,
// ekip flaky testlerden bikmis ve auto-wait istiyor.
// TODO: "selenium" | "playwright" | "appium" yaz.
const arac = "?";`,
  solutionCode: `// Senaryo: Ekip TypeScript biliyor, sadece web uygulamasi test edilecek,
// ekip flaky testlerden bikmis ve auto-wait istiyor.
const arac = "playwright"; // TypeScript + auto-wait + web = Playwright'in tam hedef kullanim alani`,
  hint: {
    tr: 'TypeScript bilgisi + auto-wait isteği + sadece web = Playwright\'ın tam olarak çözmek için tasarlandığı senaryo.',
    en: 'TypeScript knowledge + a request for auto-waiting + web-only = exactly the scenario Playwright was designed to solve.',
  },
  successMessage: {
    tr: 'Doğru! Dil bilgisi ve kararlılık ihtiyacı Playwright\'ı işaret ediyor.',
    en: 'Correct! Language knowledge and the need for stability point to Playwright.',
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 3. İLK OTOMASYON TESTİN — video + animasyon + sandbox
// ══════════════════════════════════════════════════════════════════════════

const firstTestFilm = {
  type: 'video-scene',
  id: 'test-automation-first-test-film',
  title: { tr: '🎬 İlk Testin CI\'a Kadar Yolculuğu', en: '🎬 Your First Test\'s Journey to CI' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'write', emoji: '✍️', label: { tr: 'Testi Yaz', en: 'Write the Test' }, color: '#0ea5e9' },
    { id: 'local', emoji: '💻', label: { tr: 'Yerelde Çalıştır', en: 'Run Locally' }, color: '#f59e0b' },
    { id: 'commit', emoji: '📦', label: { tr: 'Commit & Push', en: 'Commit & Push' }, color: '#8b5cf6' },
    { id: 'ci', emoji: '🔁', label: { tr: 'CI Pipeline', en: 'CI Pipeline' }, color: '#6366f1' },
    { id: 'result', emoji: '✅', label: { tr: 'Yeşil / Kırmızı Sonuç', en: 'Green / Red Result' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'İlk otomasyon testin: bir login sayfasında doğru kullanıcı adı/şifreyle giriş yapılabildiğini kontrol eden basit bir Playwright testi.',
        en: 'Your first automation test: a simple Playwright test checking that a login page accepts the correct username/password.',
      },
      positions: { write: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Önce kendi makinende çalıştırırsın — tarayıcı gerçekten açılır, gerçekten tıklar, gerçekten doğrular.',
        en: 'First you run it on your own machine — the browser really opens, really clicks, really verifies.',
      },
      positions: {
        write: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        local: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'write', to: 'local' }],
    },
    {
      caption: {
        tr: 'Test yerelde geçince kodu commit\'leyip push\'larsın — artık test SENİN makinenle sınırlı değil, repoda herkesle paylaşılan bir varlıktır.',
        en: 'Once the test passes locally, you commit and push — now the test is no longer limited to your machine, it is a shared asset in the repo.',
      },
      positions: {
        local: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        commit: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'local', to: 'commit', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Push, bir CI pipeline\'ını tetikler — Jenkins veya GitHub Actions testini SIFIRDAN, temiz bir ortamda yeniden çalıştırır.',
        en: 'The push triggers a CI pipeline — Jenkins or GitHub Actions re-runs your test from SCRATCH, in a clean environment.',
      },
      positions: {
        commit: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        ci: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'commit', to: 'ci', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Sonuç herkese görünür: yeşilse kod güvenle merge edilir, kırmızıysa ekip anında haberdar olur.',
        en: 'The result is visible to everyone: if green, the code merges with confidence; if red, the team is notified instantly.',
      },
      positions: {
        ci: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        result: { x: 55, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'ci', to: 'result', color: '#22c55e' }],
    },
  ],
}

const firstTestSteps = {
  type: 'step-animation',
  id: 'test-automation-first-test-steps',
  title: { tr: 'Adım Adım: İlk Testini Yazma Sırası', en: 'Step by Step: Writing Your First Test' },
  steps: [
    { id: 1, icon: '🎯', label: { tr: 'Tek bir senaryo seç', en: 'Pick ONE scenario' }, detail: { tr: 'İlk testin küçük olsun: "doğru şifreyle giriş yapılabilir" gibi TEK bir kontrol. Her şeyi tek testte kapsamaya çalışma.', en: 'Keep your first test small: ONE check like "login succeeds with the correct password". Don\'t try to cover everything in one test.' } },
    { id: 2, icon: '🎯', label: { tr: 'Locator\'ları bul', en: 'Find your locators' }, detail: { tr: 'Sayfadaki elementleri (kullanıcı adı alanı, şifre alanı, giriş butonu) bulacak selector\'ları yaz.', en: 'Write the selectors that will find the elements on the page (username field, password field, login button).' } },
    { id: 3, icon: '✅', label: { tr: 'Assertion ekle', en: 'Add an assertion' }, detail: { tr: 'Bir eylemi tekrarlamak yeterli değildir — "giriş sonrası dashboard görünüyor mu?" gibi bir DOĞRULAMA eklemelisin.', en: 'Repeating an action isn\'t enough — you need to add a VERIFICATION, like "does the dashboard appear after login?".' } },
    { id: 4, icon: '🖥️', label: { tr: 'Yerelde çalıştır', en: 'Run it locally' }, detail: { tr: 'CI\'a göndermeden önce testin kendi makinende geçtiğinden emin ol.', en: 'Before pushing to CI, make sure the test passes on your own machine first.' } },
  ],
}

const firstTestPractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-first-test',
  id: 'test-automation-first-test-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Eksik Assertion\'ı Tamamla', en: 'Try It Yourself: Complete the Missing Assertion' },
  starterCode: {
    tr: `// Playwright ile basit bir login testi
// TODO: giristen sonra dashboard basligini dogrulayan assertion'i tamamla
await page.fill('#username', 'qa@example.com');
await page.fill('#password', 'secret123');
await page.click('#login-button');
// await expect(???).toBeVisible();`,
    en: `// A simple Playwright login test
// TODO: complete the assertion that verifies the dashboard heading after login
await page.fill('#username', 'qa@example.com');
await page.fill('#password', 'secret123');
await page.click('#login-button');
// await expect(???).toBeVisible();`,
  },
  solutionCode: {
    tr: `// Playwright ile basit bir login testi
await page.fill('#username', 'qa@example.com');
await page.fill('#password', 'secret123');
await page.click('#login-button');
await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();`,
    en: `// A simple Playwright login test
await page.fill('#username', 'qa@example.com');
await page.fill('#password', 'secret123');
await page.click('#login-button');
await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();`,
  },
  hint: {
    tr: 'Bir aksiyonu tekrarlamak test değildir — testin asıl işi, aksiyon sonrası BEKLENEN sonucun gerçekten oluştuğunu doğrulamaktır.',
    en: 'Repeating an action is not a test — a test\'s real job is verifying that the EXPECTED result actually happened after the action.',
  },
  successMessage: {
    tr: 'Doğru! Assertion olmadan bir test, sadece bir kayıttır — hiçbir şeyi doğrulamaz.',
    en: 'Correct! A test without an assertion is just a recording — it verifies nothing.',
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 4. MALİYET VE ROI — video + animasyon + sandbox
// ══════════════════════════════════════════════════════════════════════════

const costFilm = {
  type: 'video-scene',
  id: 'test-automation-cost-film',
  title: { tr: '🎬 "Kırılgan" Bir Testin Güven Kaybı Hikayesi', en: '🎬 The Trust-Erosion Story of a "Flaky" Test' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'red1', emoji: '🔴', label: { tr: 'Kırmızı (Gerçek Bug)', en: 'Red (Real Bug)' }, color: '#ef4444' },
    { id: 'green', emoji: '🟢', label: { tr: 'Yeşil (Tekrar Koş)', en: 'Green (Re-run)' }, color: '#22c55e' },
    { id: 'redagain', emoji: '🔴', label: { tr: 'Kırmızı (Yine!)', en: 'Red (Again!)' }, color: '#ef4444' },
    { id: 'ignore', emoji: '🙈', label: { tr: '"Muhtemelen Flaky"', en: '"Probably Flaky"' }, color: '#f59e0b' },
    { id: 'realbug', emoji: '🚨', label: { tr: 'GERÇEK Bug Kaçtı', en: 'A REAL Bug Slipped Through' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir test kırmızı olur. Ekip bakar, kodda bir sorun bulamaz, "tekrar koş" der.',
        en: 'A test goes red. The team looks, finds nothing wrong in the code, says "run it again".',
      },
      positions: { red1: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Tekrar koşulduğunda yeşil olur — sanki hiçbir şey olmamış gibi.',
        en: 'On re-run it goes green — as if nothing happened.',
      },
      positions: {
        red1: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        green: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'red1', to: 'green', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Bu döngü birkaç kez daha tekrarlanır: kırmızı, tekrar koş, yeşil. Test artık "kararsız" (flaky) olarak damgalanır.',
        en: 'This cycle repeats a few more times: red, re-run, green. The test gets labeled "flaky".',
      },
      positions: {
        green: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        redagain: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'green', to: 'redagain', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Ekip artık bu testin kırmızı sonucuna güvenmiyor — "muhtemelen yine flaky" diyerek görmezden gelmeyi ÖĞRENİYOR.',
        en: 'The team no longer trusts this test\'s red result — they LEARN to shrug it off as "probably flaky again".',
      },
      positions: {
        redagain: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        ignore: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'redagain', to: 'ignore', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Ve bir gün, o kırmızı GERÇEK bir hatadır — ama ekip artık bakmayı bıraktığı için hata production\'a sızar. Kırılganlığın gerçek maliyeti budur: kaybolan güven.',
        en: 'And one day, that red IS a real bug — but the team has stopped looking, so it slips into production. This is the real cost of flakiness: lost trust.',
      },
      positions: {
        ignore: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        realbug: { x: 55, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'ignore', to: 'realbug', color: '#dc2626' }],
    },
  ],
}

const costSteps = {
  type: 'step-animation',
  id: 'test-automation-cost-steps',
  title: { tr: 'Adım Adım: Bir Otomasyonun Gerçek Maliyet Kalemleri', en: 'Step by Step: The Real Cost Items of Automation' },
  steps: [
    { id: 1, icon: '✍️', label: { tr: 'Yazım maliyeti', en: 'Writing cost' }, detail: { tr: 'İlk seferlik: testi yazmak, locator bulmak, assertion eklemek için geçen süre.', en: 'One-time: the time spent writing the test, finding locators, adding assertions.' } },
    { id: 2, icon: '🔧', label: { tr: 'Bakım maliyeti', en: 'Maintenance cost' }, detail: { tr: 'Sürekli: UI değiştikçe locator\'ları güncellemek, kırılan testleri onarmak — genelde yazım maliyetinden DAHA BÜYÜKTÜR.', en: 'Ongoing: updating locators as the UI changes, fixing broken tests — usually LARGER than the writing cost.' } },
    { id: 3, icon: '⏱️', label: { tr: 'Koşum maliyeti', en: 'Execution cost' }, detail: { tr: 'CI dakikaları, paralel worker sayısı — büyük bir suite\'in her koşumu gerçek zaman ve gerçek para maliyetlidir.', en: 'CI minutes, number of parallel workers — every run of a large suite costs real time and real money.' } },
    { id: 4, icon: '🤝', label: { tr: 'Güven maliyeti', en: 'Trust cost' }, detail: { tr: 'En görünmez ama en pahalısı: kırılgan bir test ekibin KIRMIZI sonuca güvenini kaybettirir — bu, gerçek bug\'ların kaçmasına yol açar.', en: 'The least visible but most expensive: a flaky test erodes the team\'s trust in a RED result — this is how real bugs slip through.' } },
  ],
}

const costPractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-cost',
  id: 'test-automation-cost-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Flaky mi, Gerçek Bug mı?', en: 'Try It Yourself: Flaky or Real Bug?' },
  starterCode: `// Senaryo: Bir test 10 kosumdan 3'unde kirmizi oluyor,
// her seferinde FARKLI bir asama basarisiz oluyor (bazen locator, bazen timeout),
// kod tarafinda hicbir degisiklik yapilmadi.
// TODO: "flaky" | "gercek_bug" yaz.
const teshis = "?";`,
  solutionCode: `// Senaryo: Bir test 10 kosumdan 3'unde kirmizi oluyor,
// her seferinde FARKLI bir asama basarisiz oluyor (bazen locator, bazen timeout),
// kod tarafinda hicbir degisiklik yapilmadi.
const teshis = "flaky"; // tutarsiz basarisizlik deseni + kod degismemesi klasik flaky isaretidir`,
  hint: {
    tr: 'Gerçek bir bug TUTARLI şekilde başarısız olur (aynı adımda, her seferinde); flaky bir test RASTGELE başarısız olur — bu tutarsızlık en güçlü ayrım sinyalidir.',
    en: 'A real bug fails CONSISTENTLY (same step, every time); a flaky test fails RANDOMLY — this inconsistency is the strongest distinguishing signal.',
  },
  successMessage: {
    tr: 'Doğru! Ama dikkat: "flaky" demek "görmezden gel" demek değildir — kök nedeni (genelde bir wait stratejisi eksikliği) bulup düzeltmek gerekir.',
    en: 'Correct! But be careful: "flaky" does not mean "ignore it" — you still need to find and fix the root cause (usually a missing wait strategy).',
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 5. OTOMASYON NEDEN BAŞARISIZ OLUR — video + animasyon + sandbox
// ══════════════════════════════════════════════════════════════════════════

const failureFilm = {
  type: 'video-scene',
  id: 'test-automation-failure-film',
  title: { tr: '🎬 Terk Edilmiş Bir Otomasyon Projesinin Hikayesi', en: '🎬 The Story of an Abandoned Automation Project' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'launch', emoji: '🚀', label: { tr: 'Coşkulu Başlangıç', en: 'Enthusiastic Launch' }, color: '#22c55e' },
    { id: 'debt', emoji: '📈', label: { tr: 'Bakım Borcu Birikir', en: 'Maintenance Debt Piles Up' }, color: '#f59e0b' },
    { id: 'break', emoji: '💔', label: { tr: 'Testler Kırılmaya Başlar', en: 'Tests Start Breaking' }, color: '#ef4444' },
    { id: 'skip', emoji: '⏭️', label: { tr: '"Şimdilik Skip Edelim"', en: '"Let\'s Skip It For Now"' }, color: '#dc2626' },
    { id: 'dead', emoji: '💀', label: { tr: 'Suite Terk Edilir', en: 'Suite Is Abandoned' }, color: '#6b7280' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir ekip heyecanla 50 otomasyon testi yazar. İlk hafta her şey mükemmel çalışır.',
        en: 'A team enthusiastically writes 50 automation tests. The first week everything works perfectly.',
      },
      positions: { launch: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Ama kimse testleri UI değiştikçe güncellemeyi sorumluluk olarak almaz — her sprint küçük bir bakım borcu birikir.',
        en: 'But nobody takes updating tests as the UI changes as their responsibility — a small maintenance debt piles up every sprint.',
      },
      positions: {
        launch: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        debt: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'launch', to: 'debt', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Birkaç ay sonra testlerin üçte biri kırık — locator\'lar eski, akışlar değişmiş.',
        en: 'A few months later a third of the tests are broken — locators are outdated, flows have changed.',
      },
      positions: {
        debt: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        break: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'debt', to: 'break', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Kimsenin bunları düzeltmeye vakti yok — "şimdilik skip edelim, sonra bakarız" denir.',
        en: 'Nobody has time to fix them — "let\'s skip these for now, we\'ll deal with it later" is said.',
      },
      positions: {
        break: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        skip: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'break', to: 'skip', color: '#dc2626' }],
    },
    {
      caption: {
        tr: '"Sonra" hiç gelmez — bir yıl içinde suite\'in yarısı skip edilmiş durumda ve kimse ona güvenmiyor. Otomasyon, bakım YATIRIMI olmadan sessizce ölür.',
        en: '"Later" never comes — within a year, half the suite is skipped and nobody trusts it. Automation dies silently without ongoing maintenance INVESTMENT.',
      },
      positions: {
        skip: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        dead: { x: 55, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'skip', to: 'dead', color: '#6b7280' }],
    },
  ],
}

const failureSteps = {
  type: 'step-animation',
  id: 'test-automation-failure-steps',
  title: { tr: '6 Gerçek Başarısızlık Kalıbı', en: '6 Real Failure Patterns' },
  steps: [
    { id: 1, icon: '🎯', label: { tr: 'Kırılgan locator\'lar', en: 'Fragile locators' }, detail: { tr: 'CSS/XPath selector\'ları UI\'nın küçük değişikliklerinde bile kırılır — kararlı `data-testid` yerine görsel yapıya bağımlı seçiciler kullanılmıştır.', en: 'CSS/XPath selectors break with even small UI changes — visual-structure-dependent selectors were used instead of stable `data-testid` attributes.' } },
    { id: 2, icon: '📈', label: { tr: 'Bakım borcu birikimi', en: 'Accumulated maintenance debt' }, detail: { tr: 'Kimse testleri güncellemeyi sahiplenmez, kırık testler biriktikçe suite\'e güven azalır.', en: 'Nobody owns updating tests; as broken tests pile up, trust in the suite erodes.' } },
    { id: 3, icon: '🎯', label: { tr: 'Yanlış kapsam', en: 'Wrong scope' }, detail: { tr: 'Her şeyi UI seviyesinde otomatikleştirmeye çalışmak — API seviyesinde çok daha hızlı ve kararlı doğrulanabilecek şeyler yavaş, kırılgan UI testlerine gömülür.', en: 'Trying to automate everything at the UI level — things that could be verified much faster and more stably at the API level get buried in slow, fragile UI tests.' } },
    { id: 4, icon: '🔁', label: { tr: 'CI entegrasyonu eksik', en: 'Missing CI integration' }, detail: { tr: 'Testler yazılır ama pipeline\'a bağlanmaz — kimse onları düzenli çalıştırmadığı için değerleri hiç gerçekleşmez.', en: 'Tests are written but never wired into the pipeline — since nobody runs them regularly, their value never materializes.' } },
    { id: 5, icon: '🙈', label: { tr: 'Flaky testlere güvensizlik', en: 'Distrust in flaky tests' }, detail: { tr: 'Kök nedeni düzeltilmeyen kararsız testler, ekibin TÜM kırmızı sonuçları görmezden gelmeyi öğrenmesine yol açar.', en: 'Unstable tests whose root cause is never fixed teach the team to ignore ALL red results.' } },
    { id: 6, icon: '💰', label: { tr: 'Yanlış hesaplanan ROI', en: 'Miscalculated ROI' }, detail: { tr: 'Yazım maliyeti hesaplanır ama bakım maliyeti hiç hesaba katılmaz — bütçe planlaması gerçekçi olmaz.', en: 'Writing cost is calculated but maintenance cost is never accounted for — budget planning becomes unrealistic.' } },
  ],
}

const failurePractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-failure',
  id: 'test-automation-failure-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Başarısızlık Kalıbını Teşhis Et', en: 'Try It Yourself: Diagnose the Failure Pattern' },
  starterCode: `// Senaryo: Testler yaziliyor, yerelde calisiyor, ama HICBIR ZAMAN
// Jenkins pipeline'ina eklenmiyor. Aylardir kimse onlari calistirmiyor.
// TODO: "kirilgan_locator" | "ci_entegrasyonu_eksik" | "yanlis_kapsam" yaz.
const kalip = "?";`,
  solutionCode: `// Senaryo: Testler yaziliyor, yerelde calisiyor, ama HICBIR ZAMAN
// Jenkins pipeline'ina eklenmiyor. Aylardir kimse onlari calistirmiyor.
const kalip = "ci_entegrasyonu_eksik"; // testler var ama otomatik tetiklenmiyor, degerleri hic gerceklesmiyor`,
  hint: {
    tr: 'Testlerin kendisi sorunlu değil — sorun onları KİMSENİN düzenli çalıştırmıyor olması. Bu, CI entegrasyonu eksikliğinin klasik belirtisidir.',
    en: 'The tests themselves aren\'t the problem — the problem is that NOBODY runs them regularly. This is the classic sign of missing CI integration.',
  },
  successMessage: {
    tr: 'Doğru! En iyi otomasyon bile pipeline\'a bağlanmadan hiçbir değer üretmez.',
    en: 'Correct! Even the best automation produces zero value if it is never wired into the pipeline.',
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 6. KARİYER — video + animasyon + sandbox
// ══════════════════════════════════════════════════════════════════════════

const careerFilm = {
  type: 'video-scene',
  id: 'test-automation-career-film',
  title: { tr: '🎬 Bir Adayın Mülakat Sorusunu Çözme Yolculuğu', en: '🎬 A Candidate\'s Journey Through an Interview Question' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'question', emoji: '❓', label: { tr: 'Mülakat Sorusu', en: 'Interview Question' }, color: '#0ea5e9' },
    { id: 'think', emoji: '🤔', label: { tr: 'Senaryoyu Düşün', en: 'Think Through the Scenario' }, color: '#f59e0b' },
    { id: 'tradeoff', emoji: '⚖️', label: { tr: 'Ödünleşimi Açıkla', en: 'Explain the Trade-off' }, color: '#8b5cf6' },
    { id: 'answer', emoji: '💬', label: { tr: 'Gerekçeli Cevap', en: 'Reasoned Answer' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Mülakatta soru gelir: "Bir testin flaky olduğunu nasıl anlarsın ve ne yaparsın?"',
        en: 'The interview question comes: "How do you tell a test is flaky, and what do you do about it?"',
      },
      positions: { question: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'İyi bir aday hemen tek kelimelik cevap vermez — gerçek bir senaryo düşünür: "10 koşumdan 3\'ü rastgele kırmızı, kod değişmedi..."',
        en: 'A strong candidate doesn\'t answer in one word — they think through a real scenario: "3 of 10 runs are randomly red, the code hasn\'t changed..."',
      },
      positions: {
        question: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        think: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'question', to: 'think' }],
    },
    {
      caption: {
        tr: 'Sonra ödünleşimi açıklar: "flaky" demek "görmezden gel" demek değildir — kök nedeni (genelde wait stratejisi) bulmak gerekir.',
        en: 'Then they explain the trade-off: "flaky" doesn\'t mean "ignore it" — you need to find the root cause (usually a wait strategy).',
      },
      positions: {
        think: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        tradeoff: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'think', to: 'tradeoff', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Ve gerekçeli, somut bir cevap verir — sadece "explicit wait kullanırım" değil, NEDEN ve NASIL teşhis edeceğini de anlatır.',
        en: 'And gives a reasoned, concrete answer — not just "I\'d use an explicit wait", but explaining WHY and HOW they\'d diagnose it.',
      },
      positions: {
        tradeoff: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        answer: { x: 55, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'tradeoff', to: 'answer', color: '#22c55e' }],
    },
  ],
}

const careerSteps = {
  type: 'step-animation',
  id: 'test-automation-career-steps',
  title: { tr: 'Adım Adım: Test Otomasyon Mühendisi Olma Yolu', en: 'Step by Step: The Path to Test Automation Engineer' },
  steps: [
    { id: 1, icon: '🛡️', label: { tr: 'Test temelleri', en: 'Testing fundamentals' }, detail: { tr: 'Manuel test, test senaryosu yazımı ve ISTQB temellerini öğrenmeden otomasyona atlamak, NEYİ test ettiğini anlamadan NASIL yazacağını öğrenmek demektir.', en: 'Jumping into automation without learning manual testing, test case writing and ISTQB fundamentals means learning HOW to write tests before understanding WHAT you\'re testing.' } },
    { id: 2, icon: '💻', label: { tr: 'Bir programlama dili', en: 'A programming language' }, detail: { tr: 'Java, Python veya TypeScript ile kod yazabilme becerisi — otomasyon araçlarının hepsi bu dillerden birinin üzerine kuruludur.', en: 'The ability to write code in Java, Python or TypeScript — every automation tool is built on top of one of these languages.' } },
    { id: 3, icon: '🔵', label: { tr: 'Bir otomasyon aracı', en: 'One automation tool' }, detail: { tr: 'Selenium veya Playwright ile derinlemesine pratik — locator stratejileri, wait yapıları, Page Object Model.', en: 'Deep practice with Selenium or Playwright — locator strategies, wait mechanisms, the Page Object Model.' } },
    { id: 4, icon: '🔌', label: { tr: 'API testi', en: 'API testing' }, detail: { tr: 'Postman ve REST Assured ile arayüz olmadan sistemi doğrulama becerisi — çoğu ekip UI + API otomasyonu birlikte ister.', en: 'The ability to verify a system without the UI using Postman and REST Assured — most teams want UI + API automation together.' } },
    { id: 5, icon: '🚀', label: { tr: 'CI/CD', en: 'CI/CD' }, detail: { tr: 'Jenkins veya GitHub Actions ile testlerini her commit\'te otomatik çalıştırma becerisi — bu, "script yazan" ile "otomasyon mühendisi" arasındaki asıl farktır.', en: 'The ability to run your tests automatically on every commit with Jenkins or GitHub Actions — this is the real difference between "someone who writes scripts" and an "automation engineer".' } },
  ],
}

const careerPractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-career',
  id: 'test-automation-career-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Mülakat Sorusuna Yaklaşım', en: 'Try It Yourself: Approaching an Interview Question' },
  starterCode: `// Mulakat sorusu: "Bir testin flaky oldugunu nasil anlarsin?"
// TODO: asagidaki cevabi TUTARSIZ mi (rastgele basarisizlik) yoksa
// TUTARLI mi (her seferinde ayni noktada) bir belirtiye dayandirdigini yaz.
const dogruYaklasim = "?"; // "tutarsiz_basarisizlik" | "tutarli_basarisizlik"`,
  solutionCode: `// Mulakat sorusu: "Bir testin flaky oldugunu nasil anlarsin?"
const dogruYaklasim = "tutarsiz_basarisizlik"; // flaky testin ayirt edici belirtisi RASTGELE/TUTARSIZ basarisizliktir`,
  hint: {
    tr: 'Mülakatta güçlü bir cevap her zaman somut bir gözleme dayanır: flaky testin belirtisi, aynı kodda TUTARSIZ (bazen geçen bazen kalan) sonuçtur.',
    en: 'A strong interview answer always rests on a concrete observation: the sign of a flaky test is an INCONSISTENT result (sometimes passing, sometimes failing) on the same code.',
  },
  successMessage: {
    tr: 'Doğru! Mülakatta soyut tanım yerine somut, gözlemlenebilir bir belirti vermek her zaman daha güçlüdür.',
    en: 'Correct! In an interview, giving a concrete, observable sign is always stronger than an abstract definition.',
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 7. SIK SORULAN SORULAR — video + animasyon + sandbox + kilitsiz faq
// ══════════════════════════════════════════════════════════════════════════

const faqFilm = {
  type: 'video-scene',
  id: 'test-automation-faq-film',
  title: { tr: '🎬 Bu Sayfadan Sitedeki Derin Konulara Yolculuk', en: '🎬 The Journey From This Page to the Site\'s Deep Topics' },
  xpReward: 10,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'hub', emoji: '🧭', label: { tr: 'Bu Sayfa (Genel Bakış)', en: 'This Page (Overview)' }, color: '#0ea5e9' },
    { id: 'selenium', emoji: '🔵', label: { tr: 'Selenium', en: 'Selenium' }, color: '#2563eb' },
    { id: 'playwright', emoji: '🎭', label: { tr: 'Playwright', en: 'Playwright' }, color: '#22c55e' },
    { id: 'api', emoji: '🔌', label: { tr: 'API Testi', en: 'API Testing' }, color: '#f59e0b' },
    { id: 'jenkins', emoji: '🔧', label: { tr: 'Jenkins', en: 'Jenkins' }, color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bu sayfa test otomasyonunun BÜYÜK RESMİNİ anlatır — hangi aracı, ne zaman, nasıl seçeceğini.',
        en: 'This page explains the BIG PICTURE of test automation — which tool, when, and how to choose it.',
      },
      positions: { hub: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Selenium\'u seçtiysen, kurulumdan Grid 4\'e kadar derinlemesine bir ders seni bekliyor.',
        en: 'If you chose Selenium, an in-depth lesson from setup all the way to Grid 4 is waiting for you.',
      },
      positions: {
        hub: { x: 20, y: 30, opacity: 0.6, scale: 0.9 },
        selenium: { x: 55, y: 25, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'hub', to: 'selenium', color: '#2563eb' }],
    },
    {
      caption: {
        tr: 'Playwright\'ı seçtiysen, auto-wait\'ten Trace Viewer\'a kadar tüm modern otomasyon araçlarını orada bulacaksın.',
        en: 'If you chose Playwright, you\'ll find everything from auto-waiting to the Trace Viewer in that lesson.',
      },
      positions: {
        hub: { x: 20, y: 50, opacity: 0.6, scale: 0.9 },
        playwright: { x: 55, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'hub', to: 'playwright', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'API testine derinlemesine girmek istersen, tek bir örnek API üzerinden Postman\'den REST Assured\'a kadar ilerleyen bir ders var.',
        en: 'If you want to go deep on API testing, there is a lesson that progresses from Postman to REST Assured through a single example API.',
      },
      positions: {
        hub: { x: 20, y: 70, opacity: 0.6, scale: 0.9 },
        api: { x: 55, y: 75, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'hub', to: 'api', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Ve testlerini her commit\'te otomatik çalıştırmak istediğinde, Jenkins dersi seni CI/CD\'nin içine alır.',
        en: 'And when you want to run your tests automatically on every commit, the Jenkins lesson takes you inside CI/CD.',
      },
      positions: {
        hub: { x: 18, y: 50, opacity: 0.5, scale: 0.85 },
        jenkins: { x: 55, y: 60, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'hub', to: 'jenkins', color: '#8b5cf6' }],
    },
  ],
}

const faqSteps = {
  type: 'step-animation',
  id: 'test-automation-faq-steps',
  title: { tr: 'Adım Adım: Bu Sayfadan Sonra Nereye Gitmelisin?', en: 'Step by Step: Where Should You Go After This Page?' },
  steps: [
    { id: 1, icon: '🧭', label: { tr: 'Karar ağacını gözden geçir', en: 'Review the decision tree' }, detail: { tr: 'Hangi durumda otomatikleştirilir, hangi durumda edilmez — bunu net cevaplayabildiğinden emin ol.', en: 'Make sure you can clearly answer when to automate and when not to.' } },
    { id: 2, icon: '🔵', label: { tr: 'Aracını seç', en: 'Pick your tool' }, detail: { tr: 'Ekibinin dil bilgisine ve platformuna göre Selenium, Playwright veya Appium\'dan birini seç.', en: 'Based on your team\'s language and platform, pick Selenium, Playwright or Appium.' } },
    { id: 3, icon: '📚', label: { tr: 'Derin derse geç', en: 'Move to the deep lesson' }, detail: { tr: 'Seçtiğin aracın kendi sayfasına git — orada kurulumdan framework mimarisine kadar tam bir yol haritası var.', en: 'Go to that tool\'s own page — there you\'ll find a full path from setup to framework architecture.' } },
    { id: 4, icon: '🗺️', label: { tr: 'Kariyer yol haritanı çıkar', en: 'Build your career roadmap' }, detail: { tr: '/qa-mentor sayfasında deneyim seviyene göre kişiselleştirilmiş bir öğrenme sırası oluştur.', en: 'On the /qa-mentor page, generate a personalized learning order based on your experience level.' } },
  ],
}

const faqPractice = {
  type: 'code-playground',
  relatedTopicId: 'test-automation-faq',
  id: 'test-automation-faq-practice-01',
  language: 'javascript',
  title: { tr: 'Kendin Dene: Sıradaki Adımını Seç', en: 'Try It Yourself: Choose Your Next Step' },
  starterCode: `// Senaryo: Ekibin TypeScript biliyor, web uygulamasi test edilecek,
// ve simdi ilk otomasyon dersine baslamak istiyorsun.
// TODO: gidecegin sayfayi yaz: "/selenium" | "/playwright" | "/appium"
const sonrakiSayfa = "?";`,
  solutionCode: `// Senaryo: Ekibin TypeScript biliyor, web uygulamasi test edilecek,
// ve simdi ilk otomasyon dersine baslamak istiyorsun.
const sonrakiSayfa = "/playwright"; // TypeScript + web = Playwright dersine gitmenin tam zamani`,
  hint: {
    tr: 'Bu sayfanın "Araç Seçimi" bölümündeki kriterleri hatırla: TypeScript + web + auto-wait isteği = Playwright.',
    en: 'Recall the criteria from this page\'s "Tool Choice" section: TypeScript + web + a desire for auto-waiting = Playwright.',
  },
  successMessage: {
    tr: 'Doğru! Artık /playwright sayfasına geçip derinlemesine öğrenmeye başlayabilirsin.',
    en: 'Correct! You can now move to the /playwright page and start learning in depth.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────

const sections = [
  {
    title: { tr: '🎯 Test Otomasyonu Nedir?', en: '🎯 What Is Test Automation?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏭',
        content: {
          tr: 'Test otomasyonu, bir restoranın kapanışında her gece tekrarlanan sabit kontrol listesini (ocaklar kapalı mı, kasa tuttu mu) bir insan yerine bir cihaza devretmek gibidir — cihaz asla yorulmaz, asla bir maddeyi "sanırım kontrol ettim" diye atlamaz. Peki neden hâlâ manuel test diye bir şey var, her şeyi otomatikleştirmiyoruz? Çünkü yeni açılan bir menü kaleminin İLK KEZ nasıl karşılandığını keşfetmek hâlâ bir insan işidir — cihaz yalnızca daha önce tarif edilmiş, TEKRARLANAN kontrolleri yapabilir. Java\'da JUnit ile her build\'de aynı assertion\'ları tekrar tekrar çalıştırmaya benzer, ama burada kontrol edilen şey bir tarayıcı ya da bir API\'dir. Bir QA mühendisi için bunun gerçek karşılığı şudur: regresyon testini elle her sürümde tekrarlamak yerine, bunu bir script\'e devredip o zamanı YENİ özellikleri keşfetmeye ayırabilmek — sessiz bir regresyonun production\'a sızmasını önleyen de tam olarak budur.',
          en: 'Test automation is like handing a restaurant\'s nightly closing checklist (are the stoves off, does the register balance) to a device instead of a person — the device never gets tired, never skips an item thinking "I probably checked that already". So why does manual testing still exist — why not automate everything? Because discovering how a brand-new menu item behaves for the FIRST time is still a human job — a device can only perform checks that have already been described and REPEAT. In Java this resembles running the same assertions over and over with JUnit on every build, except here what\'s being checked is a browser or an API. For a QA engineer, the real payoff is this: instead of repeating a regression check by hand every release, you hand it to a script and spend that time exploring NEW features — which is exactly what prevents a silent regression from slipping into production.',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Test otomasyonu, bir uygulamanın belirli bir davranışını doğrulayan kodu YAZIP, bu kodu tekrar tekrar (elle çalıştırmadan) koşturmaktır. Manuel test bir insanın gözlemine dayanır; otomasyon aynı gözlemi kod aracılığıyla, hızlı ve tutarlı şekilde tekrarlar.',
          en: 'Test automation means WRITING code that verifies a specific behavior of an application, and running that code repeatedly (without manual triggering). Manual testing relies on human observation; automation repeats that same observation through code, quickly and consistently.',
        },
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🧍', label: { tr: 'Manuel Test', en: 'Manual Testing' }, desc: { tr: 'Yeni özellikleri keşfetmek, öznel/görsel yargı gerektiren durumlar, tek seferlik kontroller için idealdir.', en: 'Ideal for exploring new features, subjective/visual judgment calls, and one-off checks.' } },
          { icon: '🤖', label: { tr: 'Otomasyon Testi', en: 'Automation Testing' }, desc: { tr: 'Her sürümde tekrarlanan, davranışı sabit, objektif olarak doğrulanabilen kontroller için idealdir.', en: 'Ideal for checks that repeat every release, have stable behavior, and can be verified objectively.' } },
        ],
      },
      introDecisionFilm,
      introDecisionSteps,
      introPractice,
      {
        type: 'faq',
        items: [
          {
            q: { tr: 'Test otomasyonu nedir?', en: 'What is test automation?' },
            a: {
              tr: 'Test otomasyonu, bir uygulamanın davranışını doğrulayan kodu yazıp bu kontrolü elle tekrarlamak yerine bir script\'e devretmektir. Selenium, Playwright ve Cypress gibi araçlarla tarayıcı otomasyonu, REST Assured/Postman ile API otomasyonu yapılır.',
              en: 'Test automation means writing code that verifies an application\'s behavior and handing that check to a script instead of repeating it manually. Tools like Selenium, Playwright and Cypress handle browser automation; REST Assured/Postman handle API automation.',
            },
          },
          {
            q: { tr: 'Test otomasyonu öğrenmek ne kadar sürer?', en: 'How long does it take to learn test automation?' },
            a: {
              tr: 'Bir aracın (örn. Selenium veya Playwright) temel locator ve aksiyonlarını 1-2 haftada öğrenebilirsin. Framework mimarisi, CI entegrasyonu ve API testi dahil mülakat seviyesine gelmek genelde 2-3 ay düzenli pratik gerektirir.',
              en: 'You can learn a tool\'s (e.g. Selenium or Playwright) basic locators and actions in 1-2 weeks. Reaching interview-ready level — including framework architecture, CI integration and API testing — usually takes 2-3 months of regular practice.',
            },
          },
          {
            q: { tr: 'Test otomasyonu ücretsiz mi?', en: 'Is test automation free?' },
            a: {
              tr: 'Evet — Selenium, Playwright, Cypress, Postman\'in temel özellikleri ve REST Assured tamamen ücretsiz ve açık kaynaklıdır. Bazı bulut test platformları (paralel koşum, raporlama) ücretli olabilir ama araçların kendisi ücretsizdir.',
              en: 'Yes — Selenium, Playwright, Cypress, Postman\'s core features and REST Assured are all completely free and open-source. Some cloud testing platforms (parallel execution, reporting) can be paid, but the tools themselves are free.',
            },
          },
          {
            q: { tr: 'Manuel test yerine tamamen otomasyona geçilebilir mi?', en: 'Can manual testing be fully replaced by automation?' },
            a: {
              tr: 'Hayır. Yeni bir özelliğin ilk keşfi, öznel/görsel yargılar ve nadiren tekrarlanan senaryolar hâlâ insan gerektirir. Otomasyon, TEKRARLANAN ve davranışı sabit kontroller için manuel testin YERİNE değil, onun YANINA eklenir.',
              en: 'No. Discovering a new feature for the first time, subjective/visual judgments, and rarely repeated scenarios still require a human. Automation is added ALONGSIDE manual testing for repeated, stable-behavior checks — not as a full replacement.',
            },
          },
          {
            q: { tr: 'Test otomasyonu için hangi programlama dilini bilmem gerekir?', en: 'Which programming language do I need to know for test automation?' },
            a: {
              tr: 'Java, Python ve TypeScript en yaygın üçlüdür. Kurumsal Selenium projelerinde Java, hızlı script yazımında Python, modern Playwright projelerinde TypeScript öne çıkar — hangisini seçeceğin ekibinin mevcut dil birikimine bağlıdır.',
              en: 'Java, Python and TypeScript are the most common trio. Java stands out in enterprise Selenium projects, Python for fast scripting, and TypeScript in modern Playwright projects — which one you pick depends on your team\'s existing language expertise.',
            },
          },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Bir kontrolü otomatikleştirmeye değer kılan en önemli özellik nedir?',
          en: 'What is the most important property that makes a check worth automating?',
        },
        options: [
          { id: 'a', text: { tr: 'Kontrolün çok karmaşık olması', en: 'The check being very complex' } },
          { id: 'b', text: { tr: 'Kontrolün her sürümde tekrarlanan, davranışı sabit bir soru olması', en: 'The check being a repeated question with stable behavior across releases' } },
          { id: 'c', text: { tr: 'Kontrolün görsel bir yargı gerektirmesi', en: 'The check requiring a visual judgment' } },
          { id: 'd', text: { tr: 'Kontrolün sadece bir kez yapılacak olması', en: 'The check being needed only once' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Otomasyonun değeri, aynı kontrolün tekrar tekrar (ve davranışı sabit kalarak) sorulmasından gelir — tek seferlik veya öznel kontroller otomasyona uygun değildir.',
          en: 'Automation\'s value comes from the same check being asked over and over (with stable behavior) — one-off or subjective checks are not suited to automation.',
        },
      },
    ],
  },
  {
    title: { tr: '🧭 Ne Zaman Otomatikleştirilir, Ne Zaman Edilmez?', en: '🧭 When to Automate, When Not To' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: {
          tr: 'Her gün aynı yoldan işe giderken GPS kullanmak mantıklıdır — rota sabit, GPS zamanla en verimli sırayı sana tekrar tekrar söyler. Ama daha önce hiç gitmediğin, dar bir ara sokakta GPS\'e körü körüne güvenip gitmek risklidir — orada senin gözlemine (bir tabelanın kapalı olması, yolun tek yönlü olduğunu fark etmek) ihtiyaç vardır. Peki neden her ikisi de "doğru" bir yaklaşım? Çünkü GPS (otomasyon) TEKRARLANAN, öngörülebilir rotalar için var; senin gözlemin (manuel/keşifsel test) YENİ ve belirsiz durumlar için var. Java\'da bu, önceden yazılmış bir unit test paketiyle (otomasyon) yeni bir özelliği elle debug etmek (keşif) arasındaki farka benzer — ikisi de gerekli, ama farklı anlarda. QA mühendisliğinde bu ayrımı yanlış yapmanın gerçek maliyeti şudur: henüz oturmamış bir özelliği erken otomatikleştirirsen, her küçük UI değişikliğinde testin kırılır ve zamanını testi DÜZELTMEKLE geçirirsin, gerçek hata bulmakla değil.',
          en: 'It makes sense to use GPS every day on your commute to work — the route is fixed, and GPS repeatedly tells you the most efficient order over time. But blindly trusting GPS down a narrow alley you\'ve never been to before is risky — that requires your own observation (a closed sign, noticing the street is one-way). So why are both "correct" approaches? Because GPS (automation) exists for REPEATED, predictable routes; your observation (manual/exploratory testing) exists for NEW and uncertain situations. In Java this resembles the difference between a pre-written unit test suite (automation) and manually debugging a new feature (exploration) — both are necessary, just at different times. In QA engineering, the real cost of getting this distinction wrong is this: if you automate a feature too early, before it has settled, your test breaks with every small UI change, and you spend your time FIXING the test instead of finding real bugs.',
        },
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '✅', label: { tr: 'Otomatikleştir', en: 'Automate' }, desc: { tr: 'Tekrarlanan · davranışı sabit · objektif olarak doğrulanabilir · yüksek risk/sık koşulan', en: 'Repeated · stable behavior · objectively verifiable · high-risk/frequently run' } },
          { icon: '🧍', label: { tr: 'Manuel Kalsın', en: 'Keep It Manual' }, desc: { tr: 'Yeni/keşifsel · öznel/görsel yargı · tek seferlik · davranışı hâlâ değişiyor', en: 'New/exploratory · subjective/visual judgment · one-off · behavior still changing' } },
        ],
      },
      whenNotFilm,
      whenNotSteps,
      whenNotPractice,
      {
        type: 'quiz',
        question: {
          tr: 'Yeni yayınlanan, henüz sık sık değişen bir özelliği hemen otomatikleştirmek neden risklidir?',
          en: 'Why is it risky to automate a newly released, still-frequently-changing feature right away?',
        },
        options: [
          { id: 'a', text: { tr: 'Çünkü yeni özellikler test edilemez', en: 'Because new features cannot be tested' } },
          { id: 'b', text: { tr: 'Çünkü her küçük UI değişikliğinde yazdığın test kırılır ve zamanını test düzeltmekle geçirirsin', en: 'Because the test you wrote breaks with every small UI change and you spend time fixing it instead' } },
          { id: 'c', text: { tr: 'Çünkü otomasyon araçları yeni özelliklerle uyumlu değildir', en: 'Because automation tools are not compatible with new features' } },
          { id: 'd', text: { tr: 'Çünkü yeni özellikler her zaman hatasızdır', en: 'Because new features are always bug-free' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Davranışı hâlâ değişen bir özellik için yazılan otomasyon, her değişiklikte bakım gerektirir — bu yüzden davranış sabitlenene kadar beklemek daha verimlidir.',
          en: 'Automation written for a feature whose behavior is still changing requires maintenance with every change — which is why it\'s more efficient to wait until behavior stabilizes.',
        },
      },
    ],
  },
  {
    title: { tr: '🛠️ Araç Seçimi', en: '🛠️ Tool Choice' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔑',
        content: {
          tr: 'Doğru otomasyon aracını seçmek, doğru anahtarı seçmeye benzer: hepsi teknik olarak "anahtar"dır ama her biri farklı bir kilit tipi için tasarlanmıştır — bir Yale kilidine bir emniyet kilidi anahtarını zorla sokmaya çalışmazsın. Peki neden tek bir "en iyi" araç yok, herkes aynısını kullanmıyor? Çünkü "en iyi" sorusu eksiktir — asıl soru "hangi ekip, hangi platform, hangi ihtiyaç için en iyisi" olmalıdır. Java\'da bu, bir problemi çözmek için ArrayList mi yoksa LinkedList mi kullanacağına karar vermeye benzer — ikisi de "liste"dir ama erişim örüntüne göre biri diğerinden daha doğrudur. QA mühendisliğinde yanlış aracı seçmenin gerçek maliyeti şudur: ekip Java biliyorken TypeScript gerektiren bir araç seçilirse, otomasyonun kendisinden ÖNCE dili öğrenmeye haftalar harcanır — bu, projenin ilk sonucunu aylarca geciktirebilir.',
          en: 'Choosing the right automation tool is like choosing the right key: all of them are technically "keys", but each is designed for a different lock type — you don\'t force a safe-deposit key into a Yale lock. So why isn\'t there one single "best" tool that everyone uses? Because "best" is an incomplete question — the real question is "best for which team, which platform, which need". In Java this resembles deciding between an ArrayList and a LinkedList to solve a problem — both are "lists", but one is more correct than the other depending on your access pattern. In QA engineering, the real cost of picking the wrong tool is this: if a team that knows Java picks a tool that requires TypeScript, weeks get spent learning the language BEFORE any automation work even begins — this can delay the project\'s first result by months.',
        },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Kriter', en: 'Criterion' },
          { tr: 'Selenium', en: 'Selenium' },
          { tr: 'Playwright', en: 'Playwright' },
          { tr: 'Cypress', en: 'Cypress' },
          { tr: 'Appium', en: 'Appium' },
        ],
        rows: [
          [
            { tr: 'Platform', en: 'Platform' },
            { tr: 'Web', en: 'Web' },
            { tr: 'Web', en: 'Web' },
            { tr: 'Web', en: 'Web' },
            { tr: 'Mobil (iOS/Android)', en: 'Mobile (iOS/Android)' },
          ],
          [
            { tr: 'Diller', en: 'Languages' },
            { tr: 'Java/Python/JS/C#/Ruby', en: 'Java/Python/JS/C#/Ruby' },
            { tr: 'TS/Python/Java/C#', en: 'TS/Python/Java/C#' },
            { tr: 'Sadece JS/TS', en: 'JS/TS only' },
            { tr: 'Java/Python/JS', en: 'Java/Python/JS' },
          ],
          [
            { tr: 'Auto-Wait', en: 'Auto-Wait' },
            { tr: 'Yok (manuel kurulur)', en: 'No (set up manually)' },
            { tr: 'Var (built-in)', en: 'Yes (built-in)' },
            { tr: 'Var (retry-ability)', en: 'Yes (retry-ability)' },
            { tr: 'Kısmi', en: 'Partial' },
          ],
          [
            { tr: 'Sektör Geçmişi', en: 'Industry History' },
            { tr: 'En uzun (2004\'ten beri)', en: 'Longest (since 2004)' },
            { tr: 'Modern (2020+)', en: 'Modern (2020+)' },
            { tr: 'Modern (2015+)', en: 'Modern (2015+)' },
            { tr: 'Uzun (2011\'den beri)', en: 'Long (since 2011)' },
          ],
        ],
      },
      toolChoiceFilm,
      toolChoiceSteps,
      toolChoicePractice,
      {
        type: 'link-grid', cols: 2,
        items: [
          { icon: '🔵', label: { tr: 'Selenium dersine git', en: 'Go to the Selenium lesson' }, desc: { tr: 'Kurulumdan Grid 4\'e kadar tam yol haritası.', en: 'Full roadmap from setup to Grid 4.' }, route: '/selenium' },
          { icon: '🎭', label: { tr: 'Playwright dersine git', en: 'Go to the Playwright lesson' }, desc: { tr: 'Auto-wait\'ten Trace Viewer\'a kadar modern otomasyon.', en: 'Modern automation from auto-waiting to the Trace Viewer.' }, route: '/playwright' },
          { icon: '🌲', label: { tr: 'Cypress dersine git', en: 'Go to the Cypress lesson' }, desc: { tr: 'Time-travel debugging ve component testing.', en: 'Time-travel debugging and component testing.' }, route: '/cypress' },
          { icon: '📲', label: { tr: 'Appium dersine git', en: 'Go to the Appium lesson' }, desc: { tr: 'Mobil (iOS/Android) test otomasyonu.', en: 'Mobile (iOS/Android) test automation.' }, route: '/appium' },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Ekip Java biliyor ve kurumsal ölçekte, uzun sektör geçmişi olan bir araç istiyor. Hangisi doğru seçimdir?',
          en: 'The team knows Java and wants an enterprise-scale tool with a long industry track record. Which is the right choice?',
        },
        options: [
          { id: 'a', text: { tr: 'Cypress', en: 'Cypress' } },
          { id: 'b', text: { tr: 'Selenium', en: 'Selenium' } },
          { id: 'c', text: { tr: 'Appium (web testi için)', en: 'Appium (for web testing)' } },
          { id: 'd', text: { tr: 'Hiçbiri, önce yeni bir dil öğrenilmeli', en: 'None, a new language must be learned first' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Selenium, Java desteği ve 2004\'ten beri süren sektör geçmişiyle bu ihtiyaca tam uyar; Cypress Java desteklemez, Appium ise mobil odaklıdır.',
          en: 'Selenium fits this need perfectly with Java support and an industry history dating back to 2004; Cypress does not support Java, and Appium is mobile-focused.',
        },
      },
    ],
  },
  {
    title: { tr: '🚀 İlk Otomasyon Testin', en: '🚀 Your First Automation Test' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎬',
        content: {
          tr: 'İlk otomasyon testini yazmak, ilk kez bisiklete binmeyi öğrenmeye benzer: önce yardımcı tekerleklerle (tek, basit bir senaryo) başlarsın, tüm şehri gezmeye kalkışmazsın. Peki neden ilk testte "her şeyi" test etmeye çalışmak kötü bir fikir? Çünkü karmaşık bir test, karmaşık bir şekilde kırılır — hangi adımın başarısız olduğunu anlamak bir saatini alır. Java\'da bu, ilk unit testini yazarken tek bir metodu test etmek yerine tüm sınıfı tek testte kapsamaya çalışmaya benzer — hata ayıklaması kabusa döner. QA mühendisliğinde bunun gerçek karşılığı şudur: küçük, TEK senaryolu bir test yazıp onu CI\'a bağlamak, büyük ve kırılgan bir test yazıp hiç bitirememekten çok daha değerlidir — çünkü küçük test GERÇEKTEN çalışır ve gerçek bir güven inşa eder.',
          en: 'Writing your first automation test is like learning to ride a bike for the first time: you start with training wheels (one simple scenario), you don\'t attempt to tour the whole city. So why is trying to test "everything" in your first test a bad idea? Because a complex test breaks in complex ways — figuring out which step failed can take an hour. In Java this resembles trying to cover an entire class in one test instead of testing a single method when writing your first unit test — debugging becomes a nightmare. In QA engineering, the real payoff is this: writing a small, SINGLE-scenario test and wiring it into CI is far more valuable than writing a big, fragile test you never finish — because the small test ACTUALLY works and builds real trust.',
        },
      },
      firstTestFilm,
      firstTestSteps,
      firstTestPractice,
      {
        type: 'quiz',
        question: {
          tr: 'İlk otomasyon testin için en iyi yaklaşım hangisidir?',
          en: 'What is the best approach for your first automation test?',
        },
        options: [
          { id: 'a', text: { tr: 'Uygulamanın tüm akışlarını tek bir devasa testte kapsamak', en: 'Cover every flow of the application in one giant test' } },
          { id: 'b', text: { tr: 'Tek, basit bir senaryo seçip assertion ile doğrulamak', en: 'Pick one simple scenario and verify it with an assertion' } },
          { id: 'c', text: { tr: 'Assertion eklemeden sadece aksiyonları tekrarlamak', en: 'Just repeat the actions without adding an assertion' } },
          { id: 'd', text: { tr: 'Doğrudan CI\'a yazıp yerelde hiç çalıştırmamak', en: 'Write it directly for CI without ever running it locally' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Küçük, tek senaryolu ve assertion içeren bir test, hem yazması hem hatasını bulması kolay olduğu için ilk test için en doğru yaklaşımdır.',
          en: 'A small, single-scenario test with an assertion is easiest to write and debug, making it the right approach for a first test.',
        },
      },
    ],
  },
  {
    title: { tr: '💰 Maliyet ve ROI', en: '💰 Cost and ROI' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚖️',
        content: {
          tr: 'Bir otomasyon suite\'inin maliyetini sadece yazım süresiyle ölçmek, bir arabanın maliyetini sadece satın alma fiyatıyla ölçmeye benzer — yakıt, bakım ve sigorta gibi SÜREKLİ maliyetleri unutursun. Peki neden ekipler genelde bu hatayı yapar? Çünkü yazım maliyeti GÖRÜNÜR ve tek seferliktir (bir sprint\'te bitiverir), bakım maliyeti ise DAĞINIK ve süreklidir (her sprint küçük bir parça). Java\'da bu, bir kütüphaneyi entegre etmenin kolay olduğunu ama onu güncel tutmanın, bağımlılık çakışmalarını çözmenin sürekli bir iş olduğunu fark etmeye benzer. QA mühendisliğinde bunun en pahalı biçimi "flaky test"tir: bir test rastgele kırmızı olmaya başladığında, ekip onu düzeltmek yerine görmezden gelmeyi ÖĞRENİR — ve bu öğrenilmiş güvensizlik, günün birinde gerçek bir hatanın da görmezden gelinmesine yol açar.',
          en: 'Measuring an automation suite\'s cost only by its writing time is like measuring a car\'s cost only by its purchase price — you forget ONGOING costs like fuel, maintenance and insurance. So why do teams usually make this mistake? Because writing cost is VISIBLE and one-time (it wraps up in a sprint), while maintenance cost is SCATTERED and ongoing (a small piece every sprint). In Java this resembles realizing that integrating a library is easy, but keeping it up to date and resolving dependency conflicts is a continuous job. In QA engineering, the most expensive form of this is the "flaky test": once a test starts randomly going red, the team LEARNS to ignore it instead of fixing it — and that learned distrust eventually leads to a real bug being ignored too.',
        },
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '✍️', label: { tr: 'Yazım (tek seferlik)', en: 'Writing (one-time)' }, desc: { tr: 'Test yazmak, locator bulmak, assertion eklemek için geçen ilk süre.', en: 'The initial time spent writing the test, finding locators, adding assertions.' } },
          { icon: '🔧', label: { tr: 'Bakım (sürekli)', en: 'Maintenance (ongoing)' }, desc: { tr: 'UI değiştikçe locator güncellemek, kırılan testleri onarmak — genelde yazımdan daha büyük bir kalemdir.', en: 'Updating locators as the UI changes, fixing broken tests — usually a bigger line item than writing.' } },
        ],
      },
      costFilm,
      costSteps,
      costPractice,
      {
        type: 'quiz',
        question: {
          tr: 'Bir otomasyon suite\'inin gerçek maliyetini hesaplarken en sık unutulan kalem hangisidir?',
          en: 'When calculating the real cost of an automation suite, which line item is most often forgotten?',
        },
        options: [
          { id: 'a', text: { tr: 'Testi ilk yazma süresi', en: 'The time to first write the test' } },
          { id: 'b', text: { tr: 'Sürekli bakım maliyeti', en: 'The ongoing maintenance cost' } },
          { id: 'c', text: { tr: 'Aracın lisans ücreti', en: 'The tool\'s license fee' } },
          { id: 'd', text: { tr: 'İlk kurulum süresi', en: 'The initial setup time' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Yazım maliyeti görünür ve tek seferliktir; bakım maliyeti ise dağınık ve sürekli olduğu için genellikle bütçe planlamasında unutulur.',
          en: 'Writing cost is visible and one-time; maintenance cost is scattered and ongoing, which is why it usually gets forgotten in budget planning.',
        },
      },
    ],
  },
  {
    title: { tr: '🚨 Otomasyon Neden Başarısız Olur?', en: '🚨 Why Does Automation Fail?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🌱',
        content: {
          tr: 'Bir otomasyon suite\'i, bakımsız bırakılmış bir bahçeye benzer: ilk ekildiğinde her şey düzenli ve canlıdır, ama kimse düzenli olarak sulamaz/budarsa birkaç ay içinde yabani otlarla (kırık testler) dolar ve sonunda kimse ona bakmak istemez. Peki neden düzenli bakım yerine "sonra hallederiz" denir? Çünkü bakım, YENİ bir özellik geliştirmek kadar heyecan verici görünmez — kimse bir sprint planlamasında "bugün 3 eski testi düzelteceğim" demeyi öncelik olarak görmez. Java\'da bu, teknik borcu (technical debt) ertelemeye benzer — her ertelemede küçük görünür ama birikince devasa bir yeniden yazım gerektirir. QA mühendisliğinde bunun sonucu nettir: bakımsız bir otomasyon suite\'i, hiç otomasyon olmamasından DAHA KÖTÜdür — çünkü ekibe yanlış bir güvenlik hissi verir ("testlerimiz var, güvenliyiz") ama testler artık gerçek hataları yakalamıyordur.',
          en: 'An automation suite is like a garden left unattended: when first planted, everything is orderly and alive, but if nobody waters/prunes it regularly, within a few months it fills with weeds (broken tests) and eventually nobody wants to touch it. So why does "we\'ll deal with it later" happen instead of regular maintenance? Because maintenance doesn\'t feel as exciting as building a NEW feature — nobody prioritizes "I\'ll fix 3 old tests today" in a sprint planning meeting. In Java this resembles postponing technical debt — each postponement looks small, but it accumulates into a massive rewrite. In QA engineering, the outcome is clear: an unmaintained automation suite is WORSE than no automation at all — because it gives the team a false sense of security ("we have tests, we\'re safe") while the tests no longer catch real bugs.',
        },
      },
      {
        type: 'list',
        icon: '🔻',
        items: [
          { tr: 'Kırılgan locator\'lar — görsel yapıya bağımlı seçiciler kullanmak', en: 'Fragile locators — using selectors that depend on visual structure' },
          { tr: 'Bakım borcu birikimi — kimsenin testleri güncellemeyi sahiplenmemesi', en: 'Accumulated maintenance debt — nobody owning test updates' },
          { tr: 'Yanlış kapsam — API seviyesinde doğrulanabilecek şeyleri UI\'da test etmek', en: 'Wrong scope — testing things at the UI level that could be verified at the API level' },
          { tr: 'CI entegrasyonu eksik — testler yazılır ama pipeline\'a hiç bağlanmaz', en: 'Missing CI integration — tests are written but never wired into the pipeline' },
          { tr: 'Flaky testlere güvensizlik — kök neden düzeltilmeden görmezden gelinmesi', en: 'Distrust in flaky tests — ignored instead of having their root cause fixed' },
          { tr: 'Yanlış hesaplanan ROI — bakım maliyetinin bütçeye hiç dahil edilmemesi', en: 'Miscalculated ROI — maintenance cost never included in the budget' },
        ],
      },
      failureFilm,
      failureSteps,
      failurePractice,
      {
        type: 'quiz',
        question: {
          tr: 'Neden bakımsız bir otomasyon suite\'i, hiç otomasyon olmamasından daha kötü olabilir?',
          en: 'Why can an unmaintained automation suite be worse than having no automation at all?',
        },
        options: [
          { id: 'a', text: { tr: 'Çünkü daha fazla disk alanı kaplar', en: 'Because it takes up more disk space' } },
          { id: 'b', text: { tr: 'Çünkü ekibe yanlış bir güven hissi verir ama artık gerçek hataları yakalamıyordur', en: 'Because it gives the team a false sense of security while no longer catching real bugs' } },
          { id: 'c', text: { tr: 'Çünkü otomasyon araçları ücretlidir', en: 'Because automation tools are paid' } },
          { id: 'd', text: { tr: 'Çünkü CI süresini uzatır', en: 'Because it lengthens CI time' } },
        ],
        correct: 'b',
        explanation: {
          tr: '"Testlerimiz var, güvenliyiz" hissi, testler artık gerçek hataları yakalamadığında tehlikeli bir yanılsamaya dönüşür.',
          en: 'The feeling of "we have tests, we\'re safe" becomes a dangerous illusion once the tests no longer catch real bugs.',
        },
      },
    ],
  },
  {
    title: { tr: '🎓 Kariyer: Test Otomasyon Mühendisi', en: '🎓 Career: Test Automation Engineer' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧗',
        content: {
          tr: 'Test otomasyon mühendisi olmak, bir dağa tırmanmaya benzer: doğrudan zirveye atlayamazsın, önce temel kamp kurmayı (test temelleri), sonra tırmanma tekniğini (bir dil), sonra doğru ekipmanı (bir araç) öğrenmen gerekir. Peki neden bazı adaylar doğrudan "Selenium öğreneyim" diyerek başlar ve takılır kalır? Çünkü NEYİ test ettiğini anlamadan NASIL otomatikleştireceğini öğrenmek, temel olmadan duvara tırmanmaya benzer — locator yazabilirsin ama hangi senaryonun test edilmeye değer olduğuna karar veremezsin. Java\'da bu, tasarım kalıplarını (design patterns) öğrenmeden bir framework kurmaya çalışmaya benzer — kod çalışır ama sürdürülemez. QA mühendisliğinde bunun gerçek karşılığı şudur: mülakatlarda en çok fark yaratan şey belirli bir aracı ezbere bilmek değil, "bunu neden otomatikleştiririm, neden şu şekilde tasarlarım" sorularına gerekçeli cevap verebilmektir.',
          en: 'Becoming a test automation engineer is like climbing a mountain: you can\'t jump straight to the summit — you first need to set up base camp (testing fundamentals), then learn climbing technique (a language), then get the right gear (a tool). So why do some candidates start by saying "I\'ll just learn Selenium" and get stuck? Because learning HOW to automate before understanding WHAT you\'re testing is like climbing a wall without a foundation — you can write locators but can\'t decide which scenario is worth testing. In Java this resembles trying to set up a framework without learning design patterns first — the code runs, but it isn\'t sustainable. In QA engineering, the real payoff is this: what makes the biggest difference in interviews isn\'t memorizing a specific tool, but being able to give a reasoned answer to "why would I automate this, and why would I design it this way".',
        },
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🛡️', label: { tr: 'Test Temelleri', en: 'Testing Fundamentals' }, desc: { tr: 'Manuel test, test senaryosu yazımı, ISTQB temelleri — otomasyon öncesi ilk kamp.', en: 'Manual testing, test case writing, ISTQB fundamentals — the first camp before automation.' } },
          { icon: '💻', label: { tr: 'Bir Dil + Bir Araç', en: 'A Language + A Tool' }, desc: { tr: 'Java/Python/TypeScript + Selenium/Playwright — derinlemesine, tek bir kombinasyonda uzmanlaş.', en: 'Java/Python/TypeScript + Selenium/Playwright — go deep on a single combination.' } },
        ],
      },
      careerFilm,
      careerSteps,
      careerPractice,
      {
        type: 'quiz',
        question: {
          tr: 'Mülakatlarda test otomasyon mühendisliği için en çok fark yaratan şey nedir?',
          en: 'What makes the biggest difference in interviews for a test automation engineering role?',
        },
        options: [
          { id: 'a', text: { tr: 'Tek bir aracın komutlarını ezbere bilmek', en: 'Memorizing a single tool\'s commands' } },
          { id: 'b', text: { tr: '"Neden otomatikleştirdim, neden böyle tasarladım" sorularına gerekçeli cevap verebilmek', en: 'Being able to give a reasoned answer to "why did I automate this, why did I design it this way"' } },
          { id: 'c', text: { tr: 'En fazla sayıda araç kullanmış olmak', en: 'Having used the most tools' } },
          { id: 'd', text: { tr: 'En hızlı yazım hızına sahip olmak', en: 'Having the fastest typing speed' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Gerekçeli, senaryo tabanlı düşünme, ezberlenmiş komut bilgisinden çok daha değerlidir çünkü gerçek iş her zaman yeni, tarif edilmemiş durumlar sunar.',
          en: 'Reasoned, scenario-based thinking is far more valuable than memorized command knowledge because real work always presents new, undocumented situations.',
        },
      },
    ],
  },
  {
    title: { tr: '❓ Sık Sorulan Sorular', en: '❓ Frequently Asked Questions' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧭',
        content: {
          tr: 'Bu sayfa, bir havaalanının ana gösterge panosuna benzer: hiçbir uçağı senin yerine uçurmaz ama seni doğru kapıya yönlendirir. Peki neden ayrı bir "genel bakış" sayfasına ihtiyaç var, doğrudan Selenium veya Playwright sayfasına gidilemez mi? Çünkü hangi kapıya gideceğini bilmeden bir kapıya koşmak, yanlış uçağa binme riskini taşır — önce hangi aracın SENİN ekibin için doğru olduğuna karar vermelisin. Java\'da bu, bir projeye hangi kütüphaneyi ekleyeceğine karar vermeden import satırı yazmaya benzer. QA mühendisliğinde bunun gerçek faydası şudur: burada 10 dakika geçirip doğru kararı vermek, yanlış araçla haftalarca ilerleyip sonradan baştan başlamaktan çok daha ucuzdur.',
          en: 'This page is like an airport\'s main departure board: it doesn\'t fly any plane for you, but it points you to the right gate. So why do we need a separate "overview" page instead of going straight to the Selenium or Playwright page? Because running to a gate without knowing which one carries the risk of boarding the wrong flight — you first need to decide which tool is right for YOUR team. In Java this resembles writing an import statement before deciding which library to add to a project. In QA engineering, the real benefit is this: spending 10 minutes here to make the right call is far cheaper than progressing for weeks with the wrong tool and having to start over.',
        },
      },
      faqFilm,
      faqSteps,
      faqPractice,
      {
        type: 'link-grid', cols: 2,
        items: [
          { icon: '🔌', label: { tr: 'API testine geç', en: 'Move to API testing' }, desc: { tr: 'Tek bir örnek API üzerinden Postman\'den REST Assured\'a.', en: 'From Postman to REST Assured through one example API.' }, route: '/api-testing' },
          { icon: '🐍', label: { tr: 'Python ile otomasyon', en: 'Automation with Python' }, desc: { tr: 'pytest, Selenium ve Playwright ile Python\'da test yazımı.', en: 'Writing tests in Python with pytest, Selenium and Playwright.' }, route: '/python' },
          { icon: '🔧', label: { tr: 'Jenkins ile CI/CD', en: 'CI/CD with Jenkins' }, desc: { tr: 'Testlerini her commit\'te otomatik çalıştır.', en: 'Run your tests automatically on every commit.' }, route: '/jenkins' },
          { icon: '🗺️', label: { tr: 'Kariyer yol haritanı çıkar', en: 'Build your career roadmap' }, desc: { tr: 'Deneyim seviyene göre kişiselleştirilmiş yol haritası.', en: 'A personalized roadmap based on your experience level.' }, route: '/qa-mentor' },
        ],
      },
      {
        type: 'faq',
        items: [
          {
            q: { tr: 'Test otomasyonuna nereden başlamalıyım?', en: 'Where should I start with test automation?' },
            a: {
              tr: 'Önce test temellerini (manuel test, ISTQB) öğren, sonra bir dil seç (Java/Python/TypeScript), sonra o dile uygun bir araçla (Selenium/Playwright) derinleş. Kişiselleştirilmiş bir yol haritası için /qa-mentor sayfasını kullanabilirsin.',
              en: 'First learn testing fundamentals (manual testing, ISTQB), then pick a language (Java/Python/TypeScript), then go deep with a matching tool (Selenium/Playwright). For a personalized roadmap, use the /qa-mentor page.',
            },
          },
          {
            q: { tr: 'Test otomasyonu ile QA mühendisliği aynı şey mi?', en: 'Are test automation and QA engineering the same thing?' },
            a: {
              tr: 'Hayır. QA mühendisliği, test stratejisi, manuel test, süreç iyileştirme gibi daha geniş bir alanı kapsar; test otomasyonu bunun bir ALT DALIDIR — tekrarlanan kontrolleri kodla otomatikleştirme becerisine odaklanır.',
              en: 'No. QA engineering covers a broader field — test strategy, manual testing, process improvement; test automation is a SUBSET of it — focused on the skill of automating repeated checks with code.',
            },
          },
          {
            q: { tr: 'Hangi test otomasyon aracını öğrenmeliyim?', en: 'Which test automation tool should I learn?' },
            a: {
              tr: 'Ekibinin/hedef şirketlerin diline göre karar ver: Java biliyorsan veya kurumsal bir ortam hedefliyorsan Selenium, modern ve TypeScript ağırlıklı bir ortam hedefliyorsan Playwright. Bu sayfanın "Araç Seçimi" bölümündeki karşılaştırma tablosuna bak.',
              en: 'Decide based on your team\'s/target companies\' language: Selenium if you know Java or are targeting an enterprise environment, Playwright if you\'re targeting a modern, TypeScript-heavy environment. See the comparison table in this page\'s "Tool Choice" section.',
            },
          },
          {
            q: { tr: 'Test otomasyonu iş bulmak için yeterli mi?', en: 'Is test automation enough to get a job?' },
            a: {
              tr: 'Tek başına bir araç bilmek yeterli değildir — işverenler framework mimarisi kurabilme, CI/CD entegrasyonu ve API testi bilgisini de arar. Bu sayfadaki "Kariyer" bölümü bu yol haritasını adım adım gösteriyor.',
              en: 'Knowing a single tool alone is not enough — employers also look for the ability to build framework architecture, CI/CD integration and API testing knowledge. The "Career" section on this page shows that roadmap step by step.',
            },
          },
        ],
      },
    ],
  },
]

export const testAutomationData = {
  tr: { hero: {
    title: '🤖 Test Otomasyonu',
    subtitle: 'Ne Zaman, Hangi Araçla, Nasıl Başlarsın?',
    intro: 'Test otomasyonunun ne olduğundan, doğru aracı seçmeye, ilk testini yazmaktan kariyer yol haritana kadar — sitedeki tüm derin derslere buradan yönlen.',
  }, tabs: sections.map((s) => s.title.tr), sections, seoAnswer: 'Test otomasyonu, bir uygulamanın davranışını doğrulayan kodu yazıp bu kontrolü elle tekrarlamak yerine bir script\'e devretmektir. En yaygın araçlar tarayıcı otomasyonu için Selenium/Playwright/Cypress, API otomasyonu için Postman/REST Assured\'dır. En yaygın kullanım alanı, her sürümde tekrarlanan regresyon testlerini otomatikleştirmektir.' },
  en: { hero: {
    title: '🤖 Test Automation',
    subtitle: 'When, With Which Tool, and How to Start',
    intro: 'From what test automation is, to picking the right tool, writing your first test and building your career roadmap — get routed to every deep lesson on this site from here.',
  }, tabs: sections.map((s) => s.title.en), sections, seoAnswer: 'Test automation means writing code that verifies an application\'s behavior and handing that check to a script instead of repeating it manually. The most common tools are Selenium/Playwright/Cypress for browser automation and Postman/REST Assured for API automation. Its most common use is automating regression checks that repeat on every release.' },
}

fillMissingCodeTrios(testAutomationData, 'test-automation')
