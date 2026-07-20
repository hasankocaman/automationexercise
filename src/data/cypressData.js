// cypressData.js — Cypress tam öğrenme sayfası
// 11 bölüm: Nedir, Kurulum, Komutlar&Selector, Aksiyonlar&Drag-Drop, Zaman Yolculuğu,
// Network&Intercept, Gerçek Hayat, Ekosistem, Karşılaştırma, Yaygın Hatalar, 50 Mülakat
import { fillMissingCodeTrios } from './interactiveTrioFillers.js'

const cypressStubVsFakeStep = {
  type: 'step-animation',
  title: { tr: 'cy.stub(), Gerçek Servisi Neden Tamamen Durduruyor?', en: 'Why Does cy.stub() Completely Stop the Real Service?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'cy.stub(paymentApi, "charge"), o…', en: 'cy.stub(paymentApi, "charge") wraps…' }, detail: { tr: '`cy.stub(paymentApi, "charge")`, ödeme API\'sinin charge fonksiyonunu YAKALAR — artık bu fonksiyon çağrılırsa gerçek kod çalışmaz, sen hangi yanıt döndürülmesi gerektiğini belirtirsin.', en: '`cy.stub(paymentApi, "charge")` intercepts the payment API\'s charge function — from now on, if that function is called, the real code DOES NOT run; instead, you specify what response is returned.' } },
    { id: 2, icon: '2️⃣', label: { tr: '`.returns({ success: true })` istekli…', en: '`.returns({ success: true })` configures…' }, detail: { tr: '`.returns({ success: true })`, çağrı gerçekleşirse geri döndürülecek SAHTE cevabı tanımlar — canlı bir ödeme işlemi asla yapılmaz, test bunu test ortamıyla sınırlandırmış olur.', en: '`.returns({ success: true })` defines the FAKE response that will be returned if the call happens — no real payment transaction ever occurs; the test constrains itself to the test environment.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Alternatif: `.rejects(new Error(…))` hata…', en: 'Alternative: `.rejects(new Error(…))` simulates…' }, detail: { tr: '`.rejects(new Error("Gateway timeout"))`, başarısız bir senaryo (network hatası, zaman aşımı) simüle etmek için kullanılır — gerçek servise hiç ulaşılmaksızın hata durumunu test etmeyi mümkün kılar.', en: '`.rejects(new Error("Gateway timeout"))` simulates a failure scenario (network error, timeout) — allowing you to test error handling without ever reaching the real service.' } },
  ],
}

const cypressSpyVsTrackStep = {
  type: 'step-animation',
  title: { tr: 'cy.spy(), Gerçek Fonksiyonu Çalıştırıp Çağrısını Neden Kaydediyor?', en: 'Why Does cy.spy() Run the Real Function AND Record Its Call?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'cy.spy(user, "updateEmail"), user…', en: 'cy.spy(user, "updateEmail") wraps…' }, detail: { tr: '`cy.spy(user, "updateEmail")`, user nesnesinin updateEmail fonksiyonunu SARAR — orijinal kodu etkilemeksizin o fonksiyonun çağrılarını kayıt altına almaya başlar.', en: '`cy.spy(user, "updateEmail")` wraps the user object\'s updateEmail function — without affecting the original code, it starts recording calls to that function.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Fonksiyon çağrılırsa, orijinal kod…', en: 'When the function is called, the original…' }, detail: { tr: 'Fonksiyon çağrılırsa, orijinal kod TAMAMEN çalışır (örn. e-posta gerçekten update edilir); aynı anda spy, "kim, ne zaman, hangi argümanlarla çağırdı" bilgisini KAYDEDER.', en: 'When called, the original code runs COMPLETELY (e.g., the email is actually updated); at the same time, the spy RECORDS "who called it, when, and with what arguments".' } },
    { id: 3, icon: '3️⃣', label: { tr: '`should("have.been.calledWith")`, kaydedilen…', en: '`should("have.been.calledWith")` verifies…' }, detail: { tr: '`cy.wrap(user.updateEmail).should("have.been.calledWith", "new@test.com")`, spy\'ın kaydettiği çağrıları kontrol eder — fonksiyonun doğru parametrelerle doğru sayıda çağrılıp çağrılmadığını doğrular.', en: '`cy.wrap(user.updateEmail).should("have.been.calledWith", "new@test.com")` verifies the recorded calls — confirming the function was called with the right parameters, the right number of times.' } },
  ],
}


import { LOCATOR_EXPLORER_BLOCK } from './locatorExplorerData.js'

// ─── video-scene filmleri (Bölüm 9.5) — her sabit HEM tr HEM en blocks'a aynı
// referansla eklenir (cypressData EN+TR ayrı ağaçlı, bkz. CLAUDE.md §9.5) ─────
const cypressInProcessArchitectureFilm = {
  type: 'video-scene',
  id: 'cypress-in-process-architecture-film',
  title: { tr: '🎬 Aynı Süreç mi, Uzaktan Kumanda mı? Cypress vs Selenium Mimarisi', en: '🎬 Same Process or Remote Control? Cypress vs Selenium Architecture' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'testCode', emoji: '📜', label: { tr: 'Test Kodu', en: 'Test Code' }, color: '#0ea5e9' },
    { id: 'seleniumDriver', emoji: '☕', label: { tr: 'Selenium Driver (Java)', en: 'Selenium Driver (Java)' }, color: '#f59e0b' },
    { id: 'webdriverProto', emoji: '📡', label: { tr: 'WebDriver Protokolü', en: 'WebDriver Protocol' }, color: '#8b5cf6' },
    { id: 'remoteBrowser', emoji: '🖥️', label: { tr: 'Uzak Tarayıcı Süreci', en: 'Remote Browser Process' }, color: '#64748b' },
    { id: 'raceGhost', emoji: '👻', label: { tr: 'Race Condition', en: 'Race Condition' }, color: '#ef4444' },
    { id: 'cypRunner', emoji: '🌲', label: { tr: 'Cypress Runner', en: 'Cypress Runner' }, color: '#10b981' },
    { id: 'domActor', emoji: '🌐', label: { tr: 'Browser DOM', en: 'Browser DOM' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Aynı satırı iki araç nasıl çalıştırır? Bu filmde bir tıklama komutunun Selenium\'da ve Cypress\'te izlediği FARKLI yolu adım adım izleyeceksin — mimari farkın nereden geldiğini gözünle göreceksin.',
        en: 'How do two tools run the same line? In this film you will watch, step by step, the DIFFERENT path a click command takes in Selenium versus Cypress — and see exactly where the architectural difference comes from.',
      },
      code: { tr: `driver.findElement(By.id("submit")).click()   // Selenium
cy.get('#submit').click()                       // Cypress`, en: `driver.findElement(By.id("submit")).click()   // Selenium
cy.get('#submit').click()                       // Cypress` },
      positions: { testCode: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Selenium yolu: Java test kodu, WebDriver nesnesine bir komut verir. Bu nesne, tarayıcıyla AYNI süreçte değildir — ayrı bir process\'te yaşar.',
        en: "Step 1 — The Selenium path: the Java test code hands a command to the WebDriver object. This object does NOT live in the same process as the browser — it runs in a separate process.",
      },
      code: { tr: `WebDriver driver = new ChromeDriver();
driver.findElement(By.id("submit")).click();`, en: `WebDriver driver = new ChromeDriver();
driver.findElement(By.id("submit")).click();` },
      positions: {
        testCode: { x: 14, y: 40, scale: 0.95 },
        seleniumDriver: { x: 40, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'testCode', to: 'seleniumDriver' }],
    },
    {
      caption: {
        tr: 'Adım 2 — WebDriver protokolü devreye girer: komut bir HTTP isteğine paketlenip ağ üzerinden uzaktaki tarayıcı sürecine gönderilir. Bu bir "round-trip"tir — git ve dön, her komutta.',
        en: 'Step 2 — the WebDriver protocol kicks in: the command is packaged into an HTTP request and sent over the network to the remote browser process. This is a "round-trip" — there and back, on every single command.',
      },
      code: { tr: `POST /session/{id}/element/{id}/click
// HTTP round-trip — ağ gecikmesi her komuta eklenir`, en: `POST /session/{id}/element/{id}/click
// HTTP round-trip — network latency added to every command` },
      positions: {
        seleniumDriver: { x: 22, y: 40, opacity: 0.55, scale: 0.85 },
        webdriverProto: { x: 46, y: 40, scale: 1.1, pulse: true },
        remoteBrowser: { x: 72, y: 40, scale: 1.1 },
      },
      beams: [{ from: 'seleniumDriver', to: 'webdriverProto', color: '#f59e0b' }, { from: 'webdriverProto', to: 'remoteBrowser', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Kontrast sahnesi — ağ gecikmesi sırasında sayfa değişirse: buton tam o anda kaybolur ya da yerini değiştirirse, HTTP isteği geç kalmış bir hedefe tıklamaya çalışır — bu "race condition"dır ve CI\'da rastgele (flaky) test hatalarının klasik kaynağıdır.',
        en: "Contrast scene — if the page changes during that network delay: the button vanishes or moves at that exact moment, and the HTTP request ends up clicking a stale target — this is a \"race condition\" and the classic source of flaky test failures in CI.",
      },
      positions: {
        remoteBrowser: { x: 50, y: 40, scale: 1 },
        raceGhost: { x: 78, y: 40, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'remoteBrowser', to: 'raceGhost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Cypress yolu: aynı test kodu, Cypress Runner ile birlikte tarayıcının İÇİNDE, uygulamayla AYNI JavaScript run-loop\'unda çalışır. Ayrı bir süreç, ayrı bir protokol yoktur.',
        en: 'Step 3 — the Cypress path: the same test code runs together with the Cypress Runner INSIDE the browser, in the SAME JavaScript run-loop as the application. No separate process, no separate protocol.',
      },
      code: { tr: `// cy.get() doğrudan tarayıcının kendi JS motorunda çalışır
cy.get('#submit').click()`, en: `// cy.get() runs directly inside the browser's own JS engine
cy.get('#submit').click()` },
      positions: {
        testCode: { x: 16, y: 60, scale: 1 },
        cypRunner: { x: 42, y: 60, scale: 1.2, pulse: true },
        domActor: { x: 70, y: 60, scale: 1.15 },
      },
      beams: [{ from: 'testCode', to: 'cypRunner', color: '#10b981' }, { from: 'cypRunner', to: 'domActor', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Sonuç: Cypress\'te komut ile DOM arasında ağ yoktur — bu yüzden retry-ability neredeyse ücretsizdir ve her komuttan sonra bir DOM snapshot\'ı almak (time travel) pahalı değildir. Bedeli: test kodu sadece JavaScript/TypeScript olabilir, WebDriver\'ın çoklu-dil ve çoklu-sekme özgürlüğü yoktur.',
        en: "The takeaway: in Cypress there is no network between the command and the DOM — that's why retry-ability is almost free, and taking a DOM snapshot after every command (time travel) is cheap. The cost: test code can only be JavaScript/TypeScript, without WebDriver's multi-language and multi-tab freedom.",
      },
      positions: {
        seleniumDriver: { x: 16, y: 30, scale: 0.85, opacity: 0.5 },
        remoteBrowser: { x: 34, y: 30, scale: 0.85, opacity: 0.5 },
        cypRunner: { x: 58, y: 60, scale: 1.1 },
        domActor: { x: 82, y: 60, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'cypRunner', to: 'domActor', color: '#22c55e' }],
    },
  ],
}

// Elle yazılan sandbox (s0'da otomatik trio üretilmez çünkü sekmede 'code' bloğu yok) —
// CLAUDE.md §9.4: relatedTopicId zorunlu.
const cypressArchitecturePractice = {
  type: 'code-playground',
  id: 'cypress-architecture-practice-1',
  relatedTopicId: 'cypress-architecture',
  label: { tr: 'Kendin Yaz ve Dene: İlk cy.get() Zincirin', en: 'Write It Yourself: Your First cy.get() Chain' },
  language: 'javascript',
  task: {
    tr: 'Aşağıdaki senaryoyu tamamla: sayfayı ziyaret et, email input\'una yaz, submit butonuna tıkla. Cypress\'in tarayıcı içinde çalıştığını unutma — her satır DOM\'a doğrudan erişir, ağ round-trip\'i yoktur.',
    en: "Complete the scenario below: visit the page, type into the email input, click submit. Remember Cypress runs inside the browser — every line accesses the DOM directly, there is no network round-trip.",
  },
  explanation: {
    tr: 'TODO satırlarını, film sahnesinde gördüğün cy.get() zincirinin devamı olacak şekilde tamamla.',
    en: 'Complete the TODO lines so they continue the cy.get() chain you saw in the film.',
  },
  code: {
    tr: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()`,
    en: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()`,
  },
  starterCode: {
    tr: `cy.visit('/login')
// TODO: [data-cy=email] alanına 'user@test.com' yaz
// TODO: [data-cy=submit] butonuna tıkla`,
    en: `cy.visit('/login')
// TODO: type 'user@test.com' into [data-cy=email]
// TODO: click [data-cy=submit]`,
  },
  solutionCode: {
    tr: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()`,
    en: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()`,
  },
  expected: {
    tr: 'Çözüm, beklenen cy.get() zinciriyle eşleşti. Artık Selenium\'un findElement + click iki adımını Cypress\'in tek satırlık zincirleme sözdizimiyle nasıl yazacağını biliyorsun.',
    en: "Your solution matches the expected cy.get() chain. You now know how to write Selenium's two-step findElement + click as Cypress's single-line chaining syntax.",
  },
  hints: [
    { tr: 'cy.get() bir CSS selector alır — köşeli parantez içindeki attribute selector\'ları ([data-cy=x]) tırnak içine almana gerek yoktur.', en: 'cy.get() takes a CSS selector — attribute selectors like [data-cy=x] do not need to be quoted inside the brackets.' },
    { tr: '.type() bir metin yazar, .click() ise elementin tıklanabilir olmasını otomatik bekleyip tıklar — retry-ability sayesinde ekstra wait yazmana gerek yok.', en: '.type() types text, .click() automatically waits for the element to be clickable before clicking — thanks to retry-ability you do not need to write an extra wait.' },
  ],
  xpReward: 10,
}

const s0 = {
  tr: {
    title: '🌲 Cypress Nedir? Mimari ve Felsefe',
    blocks: [
      {
        type: 'simple-box', emoji: '🎬',
        content: 'Cypress, tarayıcıyla aynı süreçte çalışır — tıpkı bir cerrahın ameliyat sahasına dışarıdan talimat vermek yerine elleriyle doğrudan müdahale etmesi gibi: her kesim anlık, her tepki gerçek zamanlı, araya hiçbir gecikme girmiyor. Peki Selenium zaten onlarca yıldır iş görüyorken neden farklı bir mimari gerekti? Çünkü Selenium\'un WebDriver protokolü her komut için tarayıcıyla bir HTTP round-trip yapar — bu "uzaktan kumanda" modeli ağ gecikmesini teste dahil eder ve yarış koşullarına (race condition) kapı aralar. Java\'da JUnit testleri JVM içinde, uygulama kodunuzla aynı hafızada çalışır; Cypress\'in tarayıcıyla kurduğu ilişki tam olarak budur — yalnızca ortam JVM değil Chromium\'dur. QA perspektifinden kritik sonuç: her komuttan sonra otomatik DOM snapshot\'ı alındığı için flaky test analiz ederken saatlerce log karıştırmak yerine time-travel ile tam olarak hangi elementin hangi anda ne gösterdiğini bir tıkla görebilirsin — bu, CI\'da sessizce geçen ama aslında yanlış olan PASS\'leri yakalamayı dramatik biçimde kolaylaştırır.',
      },
      {
        type: 'css-animation',
        kind: 'cypress-retry',
        label: { tr: 'Cypress Otomatik Yeniden Deneme', en: 'Cypress Retry Mechanism' },
      },
      {
        type: 'text',
        content: 'Cypress, 2015\'te yayınlanan, JavaScript/TypeScript ile yazılan açık kaynaklı bir uçtan uca (end-to-end) test framework\'üdür. Selenium ve Playwright\'tan en temel mimari farkı: Cypress, test kodunu tarayıcının İÇİNDE, uygulamayla AYNI run-loop\'ta çalıştırır. Bu sayede DOM\'a doğrudan erişir, ağ isteklerini gerçek zamanlı yakalar ve her komuttan sonra otomatik bir "anlık görüntü" (snapshot) alır — buna "time travel debugging" denir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Selenium\'da driver.findElement(By.id("x")).click() yazdığında, Java kodu WebDriver protokolü üzerinden tarayıcıya bir HTTP isteği gönderir, tarayıcı cevap verene kadar bekler — bu "uzaktan kumanda" modelidir (remote control). Cypress\'te ise cy.get(\'#x\').click() yazdığında, kod doğrudan tarayıcının kendi JavaScript motorunda çalışır; ağ gecikmesi yoktur, ama bu yüzden Cypress\'in test kodu sadece JavaScript/TypeScript olabilir — Java, Python ya da C# ile Cypress testi yazamazsınız.',
      },
      { type: 'heading', text: 'Cypress vs Selenium vs Playwright — İlk Bakış' },
      {
        type: 'table',
        headers: ['Özellik', 'Selenium', 'Cypress', 'Playwright'],
        rows: [
          ['Çıkış yılı', '2004', '2015', '2020'],
          ['Mimari', 'WebDriver protokolü (uzaktan)', 'Tarayıcı içinde (in-process)', 'CDP / WebSocket (uzaktan)'],
          ['Dil desteği', 'Java, Python, C#, JS, Ruby', 'Sadece JavaScript / TypeScript', 'TS, JS, Python, Java, C#'],
          ['Tarayıcı desteği', 'Chrome, Firefox, Safari, Edge', 'Chromium, Firefox, Electron (Safari yok)', 'Chromium, Firefox, WebKit'],
          ['Çoklu sekme/tab', '✅ Native destek', '❌ Tek sekme sınırı', '✅ Native destek'],
          ['Otomatik bekleme', '❌ Manuel wait yazılır', '✅ "Retry-ability" — built-in', '✅ "Auto-wait" — built-in'],
          ['Time-travel debug', '❌ Yok', '✅ Her komutun snapshot\'ı', '✅ Trace Viewer ile benzer'],
          ['Network mock', '❌ Ek araç gerekir', '✅ cy.intercept() built-in', '✅ page.route() built-in'],
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Cypress Çalışma Mimarisi (Aynı Process İçinde)',
        steps: [
          { num: 1, label: 'Test Kodu', desc: 'JS / TS (.cy.js)', highlight: true },
          { num: 2, label: 'Cypress Runner', desc: 'Tarayıcı İÇİNDE çalışır', highlight: true },
          { num: 3, label: 'Browser DOM', desc: 'Aynı run-loop', highlight: false },
          { num: 4, label: 'Node.js Process', desc: 'Arka planda — dosya, network', highlight: false },
          { num: 5, label: 'Sonuç', desc: 'Command Log + Video', highlight: false },
        ],
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '⏪', label: 'Time Travel', desc: 'Her komuttan sonra otomatik snapshot alınır, command log\'da geçmişe tıklayıp DOM\'u görebilirsin.' },
          { icon: '🔁', label: 'Retry-ability', desc: 'cy.get() ve should() elementi/koşulu bulana kadar otomatik tekrar dener — Thread.sleep() yok.' },
          { icon: '🌐', label: 'Network Stub', desc: 'cy.intercept() ile gerçek API çağrılarını yakalayıp sahte veriyle değiştirebilirsin.' },
          { icon: '📸', label: 'Otomatik Kayıt', desc: 'Her test için screenshot ve video otomatik üretilir, ekstra kütüphane gerekmez.' },
          { icon: '🧩', label: 'Component Testing', desc: 'Tüm uygulamayı açmadan tek bir React/Vue/Angular komponentini izole test edebilirsin.' },
          { icon: '⚠️', label: 'Tek Sekme Sınırı', desc: 'Cypress aynı anda sadece bir sekmeyi kontrol eder — çoklu pencere/sekme testi Selenium kadar kolay değildir.' },
        ],
      },
      cypressInProcessArchitectureFilm,
      cypressArchitecturePractice,
      {
        type: 'quiz',
        question: { tr: 'Cypress\'in Selenium\'a göre en temel mimari farkı nedir?', en: "What is Cypress's most fundamental architectural difference from Selenium?" },
        options: [
          { id: 'a', text: 'Cypress sadece mobil testleri destekler' },
          { id: 'b', text: 'Cypress test kodunu tarayıcının içinde, uygulamayla aynı run-loop\'ta çalıştırır' },
          { id: 'c', text: 'Cypress sadece API testleri için kullanılır' },
          { id: 'd', text: 'Cypress\'in WebDriver protokolüne ihtiyacı vardır' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Selenium, WebDriver protokolü üzerinden tarayıcıya "uzaktan" komut gönderir (network round-trip vardır). Cypress ise test kodunu doğrudan tarayıcının içinde çalıştırır — bu da onu hızlı yapar ama aynı zamanda sadece JavaScript/TypeScript ile sınırlar ve tek sekme/aynı origin kısıtlamaları getirir.',
          en: 'Selenium sends commands to the browser "remotely" via the WebDriver protocol (a network round-trip). Cypress runs the test code directly inside the browser — this makes it fast, but also limits it to JavaScript/TypeScript and introduces single-tab/same-origin constraints.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium'un Cypress'ten ayrılan en büyük çalışma prensibi nedir?",
            "en": "What is the primary operational principle that distinguishes Selenium from Cypress?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Selenium tarayıcı dışında, Cypress ise tarayıcı içinde çalışır",
                        "en": "Selenium runs outside the browser, while Cypress runs inside the browser"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Selenium doğrudan tarayıcı ile konuşur, Cypress ise sunucu tarafında çalışır",
                        "en": "Selenium talks directly to the browser, while Cypress runs server-side"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Selenium sadece API testlerini destekler",
                        "en": "Selenium only supports API testing"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Selenium tarayıcıyı kontrol etmek için WebDriver API'sine ihtiyaç duymaz",
                        "en": "Selenium does not require the WebDriver API to control the browser"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Selenium, WebDriver protokolünü kullanarak dışarıdan komut gönderirken, Cypress doğrudan tarayıcının main thread'i içerisinde uygulamayla aynı döngüde (run-loop) çalışır, bu da onu daha senkronize ve hızlı kılar.",
            "en": "Selenium sends commands from the outside using the WebDriver protocol, whereas Cypress runs directly inside the browser's main thread in the same run-loop as the application, making it more synchronized and faster."
      }
}
},
      {
        type: 'glossary-section',
        terms: [
          { term: 'Command Log', definition: { tr: 'Cypress Test Runner\'ın sol panelinde her komutun ve assertion\'ın sırayla listelendiği, tıklanabilir geçmiş.', en: "The left panel of the Cypress Test Runner that lists every command and assertion in order, as a clickable history." } },
          { term: 'Time Travel', definition: { tr: 'Command Log\'daki geçmiş bir komuta tıklayınca, uygulamanın o anki DOM anlık görüntüsünü (snapshot) görme özelliği.', en: "The ability to click a past command in the Command Log and see the app's DOM snapshot at that exact moment." } },
          { term: 'Retry-ability', definition: { tr: 'cy.get(), should() gibi komutların, koşul sağlanana ya da timeout dolana kadar otomatik olarak tekrar tekrar denenmesi.', en: 'Commands like cy.get() and should() automatically re-running until the condition passes or the timeout expires.' } },
          { term: 'App Actions', definition: { tr: 'UI üzerinden tıklayarak değil, uygulamanın kendi fonksiyonlarını/Redux action\'larını doğrudan çağırarak test ortamını hazırlama pratiği.', en: "A practice of setting up test state by calling the app's own functions/Redux actions directly instead of clicking through the UI." } },
        ],
      },
    ],
  },
  en: {
    title: '🌲 What is Cypress? Architecture and Philosophy',
    blocks: [
      {
        type: 'simple-box', emoji: '🎬',
        content: "Cypress runs inside the same process as the browser — like a surgeon operating with their own hands rather than giving instructions to a remote team over a phone: every cut is immediate, every reaction in real time, with zero round-trip delay. But if Selenium has worked for decades, why did we need a different architecture? Because Selenium's WebDriver protocol makes an HTTP round-trip to the browser for every command — that \"remote control\" model introduces network latency into your tests and opens the door to race conditions. In Java, JUnit tests run inside the JVM alongside your application code; that's exactly the relationship Cypress has with the browser — except the runtime is Chromium instead of the JVM. The practical QA consequence: since Cypress automatically snapshots the DOM after every command, when a test fails in CI you don't comb through logs for hours — you time-travel to the exact moment and see precisely what the DOM showed, making it far easier to catch tests that silently PASS while the UI is actually broken.",
      },
      {
        type: 'css-animation',
        kind: 'cypress-retry',
        label: { tr: 'Cypress Otomatik Yeniden Deneme', en: 'Cypress Retry Mechanism' },
      },
      {
        type: 'text',
        content: 'Cypress is an open-source end-to-end testing framework written in JavaScript/TypeScript, released in 2015. Its most fundamental architectural difference from Selenium and Playwright: Cypress runs the test code INSIDE the browser, in the SAME run-loop as the application. This gives it direct DOM access, real-time network request capturing, and an automatic "snapshot" after every command — this is called "time travel debugging".',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Selenium, writing driver.findElement(By.id("x")).click() sends an HTTP request from your Java code to the browser over the WebDriver protocol, then waits for a response — this is the "remote control" model. In Cypress, writing cy.get(\'#x\').click() runs the code directly inside the browser\'s own JavaScript engine — there is no network latency, but as a result Cypress test code can only be JavaScript/TypeScript — you cannot write Cypress tests in Java, Python, or C#.',
      },
      { type: 'heading', text: 'Cypress vs Selenium vs Playwright — First Look' },
      {
        type: 'table',
        headers: ['Feature', 'Selenium', 'Cypress', 'Playwright'],
        rows: [
          ['Released', '2004', '2015', '2020'],
          ['Architecture', 'WebDriver protocol (remote)', 'Inside the browser (in-process)', 'CDP / WebSocket (remote)'],
          ['Language support', 'Java, Python, C#, JS, Ruby', 'JavaScript / TypeScript only', 'TS, JS, Python, Java, C#'],
          ['Browser support', 'Chrome, Firefox, Safari, Edge', 'Chromium, Firefox, Electron (no Safari)', 'Chromium, Firefox, WebKit'],
          ['Multiple tabs', '✅ Native support', '❌ Single-tab limitation', '✅ Native support'],
          ['Auto-waiting', '❌ Manual waits required', '✅ "Retry-ability" — built-in', '✅ "Auto-wait" — built-in'],
          ['Time-travel debugging', '❌ None', '✅ Snapshot of every command', '✅ Similar via Trace Viewer'],
          ['Network mocking', '❌ Needs extra tooling', '✅ cy.intercept() built-in', '✅ page.route() built-in'],
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Cypress Architecture (Same-Process Execution)',
        steps: [
          { num: 1, label: 'Test Code', desc: 'JS / TS (.cy.js)', highlight: true },
          { num: 2, label: 'Cypress Runner', desc: 'Runs INSIDE the browser', highlight: true },
          { num: 3, label: 'Browser DOM', desc: 'Same run-loop', highlight: false },
          { num: 4, label: 'Node.js Process', desc: 'Backend — files, network', highlight: false },
          { num: 5, label: 'Result', desc: 'Command Log + Video', highlight: false },
        ],
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '⏪', label: 'Time Travel', desc: 'An automatic snapshot is taken after every command — click any past entry in the log to see the DOM at that moment.' },
          { icon: '🔁', label: 'Retry-ability', desc: 'cy.get() and should() automatically retry until the element/condition is found — no Thread.sleep().' },
          { icon: '🌐', label: 'Network Stubbing', desc: 'cy.intercept() lets you capture real API calls and replace them with fake data.' },
          { icon: '📸', label: 'Auto Recording', desc: 'Screenshots and videos are generated automatically for every test, no extra library needed.' },
          { icon: '🧩', label: 'Component Testing', desc: 'Test a single React/Vue/Angular component in isolation without launching the whole app.' },
          { icon: '⚠️', label: 'Single-Tab Limit', desc: 'Cypress controls only one tab at a time — multi-window/tab testing is not as easy as in Selenium.' },
        ],
      },
      cypressInProcessArchitectureFilm,
      cypressArchitecturePractice,
      {
        type: 'quiz',
        question: { tr: 'Cypress\'in Selenium\'a göre en temel mimari farkı nedir?', en: "What is Cypress's most fundamental architectural difference from Selenium?" },
        options: [
          { id: 'a', text: 'Cypress only supports mobile testing' },
          { id: 'b', text: 'Cypress runs the test code inside the browser, in the same run-loop as the app' },
          { id: 'c', text: 'Cypress is only used for API testing' },
          { id: 'd', text: 'Cypress requires the WebDriver protocol' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Selenium, WebDriver protokolü üzerinden tarayıcıya "uzaktan" komut gönderir (network round-trip vardır). Cypress ise test kodunu doğrudan tarayıcının içinde çalıştırır — bu da onu hızlı yapar ama aynı zamanda sadece JavaScript/TypeScript ile sınırlar ve tek sekme/aynı origin kısıtlamaları getirir.',
          en: 'Selenium sends commands to the browser "remotely" via the WebDriver protocol (a network round-trip). Cypress runs the test code directly inside the browser — this makes it fast, but also limits it to JavaScript/TypeScript and introduces single-tab/same-origin constraints.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium ile karşılaştırıldığında Cypress'in sunduğu en büyük avantaj hangisidir?",
            "en": "Which of the following is the biggest advantage of Cypress compared to Selenium?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Birden fazla tarayıcıyı aynı anda kontrol edebilmesi",
                        "en": "Being able to control multiple browsers simultaneously"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Test kodunun tarayıcıyla aynı bellek alanında ve 'run-loop'ta çalışması",
                        "en": "Test code running in the same run-loop and memory space as the browser"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Cypress'in tüm dilleri (Java, Python, C#) desteklemesi",
                        "en": "Cypress supporting all languages (Java, Python, C#)"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "WebDriver protokolü ile daha yavaş ve stabil çalışması",
                        "en": "Working slower and more stable with the WebDriver protocol"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Cypress'in en büyük avantajı, testin tarayıcı ile aynı süreçte çalışmasıdır. Bu durum, DOM ile doğrudan etkileşime geçmesini sağlar ve ağ gecikmelerinden kaynaklanan 'flakiness'ı önemli ölçüde azaltır.",
            "en": "Cypress's greatest advantage is that the test runs in the same process as the browser. This allows it to interact directly with the DOM and significantly reduces 'flakiness' caused by network latency."
      }
}
},
      {
        type: 'glossary-section',
        terms: [
          { term: 'Command Log', definition: { tr: 'Cypress Test Runner\'ın sol panelinde her komutun ve assertion\'ın sırayla listelendiği, tıklanabilir geçmiş.', en: "The left panel of the Cypress Test Runner that lists every command and assertion in order, as a clickable history." } },
          { term: 'Time Travel', definition: { tr: 'Command Log\'daki geçmiş bir komuta tıklayınca, uygulamanın o anki DOM anlık görüntüsünü (snapshot) görme özelliği.', en: "The ability to click a past command in the Command Log and see the app's DOM snapshot at that exact moment." } },
          { term: 'Retry-ability', definition: { tr: 'cy.get(), should() gibi komutların, koşul sağlanana ya da timeout dolana kadar otomatik olarak tekrar tekrar denenmesi.', en: 'Commands like cy.get() and should() automatically re-running until the condition passes or the timeout expires.' } },
          { term: 'App Actions', definition: { tr: 'UI üzerinden tıklayarak değil, uygulamanın kendi fonksiyonlarını/Redux action\'larını doğrudan çağırarak test ortamını hazırlama pratiği.', en: "A practice of setting up test state by calling the app's own functions/Redux actions directly instead of clicking through the UI." } },
        ],
      },
    ],
  },
}

const cypressInstallOpenFilm = {
  type: 'video-scene',
  id: 'cypress-install-open-film',
  title: { tr: '🎬 npm install cypress → npx cypress open: Kurulum Zinciri', en: '🎬 npm install cypress → npx cypress open: The Installation Chain' },
  xpReward: 11,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'terminal', emoji: '💻', label: { tr: 'Terminal', en: 'Terminal' }, color: '#0ea5e9' },
    { id: 'npmReg', emoji: '📦', label: { tr: 'npm Registry', en: 'npm Registry' }, color: '#f59e0b' },
    { id: 'cyBinary', emoji: '🌲', label: { tr: 'Cypress Binary (kendi tarayıcısı)', en: 'Cypress Binary (own browser)' }, color: '#10b981' },
    { id: 'scaffold', emoji: '🗂️', label: { tr: 'cypress/ Klasör Yapısı', en: 'cypress/ Folder Structure' }, color: '#8b5cf6' },
    { id: 'runner', emoji: '🖥️', label: { tr: 'Test Runner GUI', en: 'Test Runner GUI' }, color: '#22c55e' },
    { id: 'serverGhost', emoji: '👻', label: { tr: 'Sunucu Ayakta Değil', en: 'Server Not Running' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Tek bir kurulum komutu iki farklı şeyi indirir: npm paketini VE kendi tarayıcı ikili dosyasını (binary). Selenium\'da ChromeDriver\'ı ayrı indirip PATH\'e eklemen gerekirdi — burada tek komut yeterli.',
        en: "A single install command downloads two different things: the npm package AND its own browser binary. In Selenium you'd separately download ChromeDriver and add it to PATH — here one command is enough.",
      },
      code: { tr: `npm install cypress --save-dev`, en: `npm install cypress --save-dev` },
      positions: { terminal: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — npm, package.json\'a devDependency olarak Cypress\'i ekler ve npm registry\'den paketi indirir. Bu kısım tıpkı herhangi bir npm paketi kurulumu gibidir.',
        en: "Step 1 — npm adds Cypress as a devDependency in package.json and downloads the package from the npm registry. This part is like installing any other npm package.",
      },
      code: { tr: `// package.json
"devDependencies": { "cypress": "^13.6.0" }`, en: `// package.json
"devDependencies": { "cypress": "^13.6.0" }` },
      positions: {
        terminal: { x: 16, y: 40, scale: 0.95 },
        npmReg: { x: 44, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'terminal', to: 'npmReg' }],
    },
    {
      caption: {
        tr: 'Adım 2 — kurulumun ASIL farklı kısmı: npm install sırasında Cypress ayrıca kendi Chromium tabanlı test çalıştırıcı ikili dosyasını (binary) indirir ve önbelleğe koyar. Bu, "her tarayıcı için ayrı driver indirme" derdini ortadan kaldırır.',
        en: "Step 2 — the ACTUALLY different part of this install: during npm install, Cypress also downloads its own Chromium-based test runner binary and caches it. This eliminates the \"download a separate driver for every browser\" hassle.",
      },
      code: { tr: `Installing Cypress (version 13.6.0)
[Cypress binary indiriliyor...] ~150MB`, en: `Installing Cypress (version 13.6.0)
[Downloading Cypress binary...] ~150MB` },
      positions: {
        npmReg: { x: 24, y: 40, opacity: 0.55, scale: 0.85 },
        cyBinary: { x: 52, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'npmReg', to: 'cyBinary', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — npx cypress open ilk çalıştırıldığında, Cypress projede cypress/e2e, cypress/fixtures, cypress/support gibi klasörleri ve cypress.config.js dosyasını otomatik oluşturur (scaffold).',
        en: 'Step 3 — the first time you run npx cypress open, Cypress automatically scaffolds folders like cypress/e2e, cypress/fixtures, cypress/support and a cypress.config.js file in your project.',
      },
      code: { tr: `npx cypress open`, en: `npx cypress open` },
      positions: {
        cyBinary: { x: 26, y: 55, opacity: 0.55, scale: 0.85 },
        scaffold: { x: 54, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'cyBinary', to: 'scaffold', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 4 — scaffold tamamlanınca Test Runner GUI açılır: burada testleri seçip çalıştırabilir, Command Log\'u ve time-travel\'i canlı izleyebilirsin.',
        en: 'Step 4 — once scaffolding finishes, the Test Runner GUI opens: here you can pick and run tests, and watch the Command Log and time-travel live.',
      },
      positions: {
        scaffold: { x: 28, y: 55, opacity: 0.55, scale: 0.85 },
        runner: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'scaffold', to: 'runner', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast sahnesi — eğer cypress.config.js\'teki baseUrl yanlışsa YA DA local dev server henüz ayakta değilken cypress run çalıştırılırsa: "Cypress could not verify that this server is running" hatası alırsın. Çözüm ezber değil, sıralamadır — CI\'da start-server-and-test gibi bir araçla önce sunucunun GERÇEKTEN hazır olduğunu kanıtla, sonra testi başlat.',
        en: 'Contrast scene — if baseUrl in cypress.config.js is wrong, OR cypress run executes while the local dev server has not started yet: you get "Cypress could not verify that this server is running". The fix is not memorization, it is ordering — in CI, prove with a tool like start-server-and-test that the server is GENUINELY ready before starting the test.',
      },
      positions: {
        runner: { x: 30, y: 55, opacity: 0.55, scale: 0.85 },
        serverGhost: { x: 62, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'runner', to: 'serverGhost', color: '#ef4444' }],
    },
  ],
}

const s1 = {
  tr: {
    title: '⚙️ Kurulum (Installation)',
    blocks: [
      {
        type: 'text',
        content: 'Cypress, npm üzerinden kurulan ve hem GUI (Test Runner) hem de CLI (headless) modunda çalışabilen bir araçtır. Kurulum tek bir paket yüklemekten ibarettir — Java\'daki gibi ayrı bir driver indirme (ChromeDriver, geckodriver) derdi yoktur, Cypress kendi tarayıcı binary\'lerini paketle birlikte indirir.',
      },
      {
        type: 'installation',
        title: { tr: 'Adım Adım Kurulum (Windows / macOS / Linux)', en: 'Step-by-Step Installation (Windows / macOS / Linux)' },
        steps: [
          {
            cmd: 'npm init -y',
            explanation: { tr: 'Projede henüz package.json yoksa oluşturur. Zaten varsa bu adımı atlayabilirsin. Beklenen çıktı: "Wrote to .../package.json".', en: 'Creates package.json if your project does not have one yet. Skip this step if it already exists. Expected output: "Wrote to .../package.json".' },
          },
          {
            cmd: 'npm install cypress --save-dev',
            explanation: { tr: 'Cypress\'i devDependency olarak kurar ve kendi tarayıcı binary\'sini (~300MB) indirir. Linux\'ta bazı sistem kütüphaneleri (libgtk2.0-0, libnotify-dev, xvfb) eksikse "apt-get install" ile eklenmesi gerekebilir; Windows ve macOS\'ta ekstra bağımlılık gerekmez.', en: 'Installs Cypress as a devDependency and downloads its own browser binary (~300MB). On Linux you may need to add a few system libraries (libgtk2.0-0, libnotify-dev, xvfb) via apt-get; Windows and macOS need no extra dependencies.' },
          },
          {
            cmd: 'npx cypress open',
            explanation: { tr: 'İlk çalıştırmada cypress/ klasör yapısını otomatik oluşturur ve interaktif Test Runner GUI\'sini açar — burada E2E ya da Component Testing modunu seçip bir tarayıcı belirlersin. Beklenen çıktı: Cypress penceresi açılır, "Choose a browser" ekranı görünür.', en: 'On first run, it auto-scaffolds the cypress/ folder structure and opens the interactive Test Runner GUI — here you pick E2E or Component Testing mode and choose a browser. Expected output: the Cypress window opens showing a "Choose a browser" screen.' },
          },
          {
            cmd: 'npx cypress run',
            explanation: { tr: 'Tüm testleri headless modda (görünür pencere olmadan) terminalde çalıştırır — CI/CD pipeline\'larında kullanılan komuttur. Beklenen çıktı: terminalde geçen/kalan test sayısı ve bir video/screenshot yolu.', en: 'Runs all tests headlessly (no visible window) right in the terminal — this is the command used in CI/CD pipelines. Expected output: passed/failed test counts and a video/screenshot path printed in the terminal.' },
          },
          {
            cmd: 'npx cypress verify',
            explanation: { tr: 'Cypress binary\'sinin doğru kurulduğunu doğrular. Beklenen çıktı: "✔ Verified Cypress! ... It passed all the verification checks."', en: 'Verifies that the Cypress binary installed correctly. Expected output: "✔ Verified Cypress! ... It passed all the verification checks."' },
          },
        ],
      },
      {
        type: 'file-tree',
        title: { tr: 'Otomatik Oluşturulan Klasör Yapısı', en: 'Auto-Generated Folder Structure' },
        tree: `my-app/
├── cypress/
│   ├── e2e/
│   │   └── login.cy.js
│   ├── fixtures/
│   │   └── example.json
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── downloads/
│   └── screenshots/ · videos/
├── cypress.config.js
└── package.json`,
        note: { tr: 'cypress.config.js (v10+) tüm konfigürasyonun tek kaynağıdır — eski cypress.json artık kullanılmaz. Java\'da bunu Maven\'in pom.xml\'i ya da pytest.ini gibi düşünebilirsin: framework\'ün nasıl davranacağını tanımlayan tek merkezi dosya.', en: "cypress.config.js (v10+) is the single source of truth for all configuration — the old cypress.json is no longer used. In Java terms, think of it like Maven's pom.xml or pytest.ini: one central file that defines how the framework behaves." },
      },
      {
        type: 'code', label: 'cypress/e2e/login.cy.js — İlk Test Dosyan',
        language: 'javascript',
        code: `describe('Login Page', () => {
  it('logs in with valid credentials', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('user@test.com')
    cy.get('[data-cy=password]').type('Secret123!')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})`,
      },
      {
        type: 'callout', color: 'orange', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'npm install cypress --save-dev, Maven\'da pom.xml\'e bir test bağımlılığı (örneğin selenium-java) eklemeye benzer — fark şu ki Cypress bir derleme (mvn compile) adımına ihtiyaç duymaz, doğrudan .js dosyasını çalıştırır. describe()/it() yapısı da JUnit 5\'teki @Nested test sınıfları ve @Test metodlarının JavaScript karşılığıdır (aslında alttan Mocha test çatısını kullanır).',
      },
      cypressInstallOpenFilm,
      {
        type: 'quiz',
        question: { tr: 'cypress.config.js dosyasının amacı nedir?', en: 'What is the purpose of cypress.config.js?' },
        options: [
          { id: 'a', text: 'Sadece tarayıcı ikonunu değiştirmek için kullanılır' },
          { id: 'b', text: 'Tüm Cypress konfigürasyonunun (baseUrl, timeout, plugin ayarları) tutulduğu merkezi dosyadır' },
          { id: 'c', text: 'Sadece CI/CD ortamlarında gereklidir, local\'de gerekmez' },
          { id: 'd', text: 'package.json\'ın yerini alır' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cypress.config.js, v10 ile birlikte eski cypress.json\'ın yerini aldı; baseUrl, viewport, timeout, env değişkenleri ve setupNodeEvents (plugin) gibi tüm ayarları tek bir yerde toplar.',
          en: "cypress.config.js replaced the old cypress.json starting with v10; it centralizes all settings like baseUrl, viewport, timeout, env variables, and setupNodeEvents (plugins) in one place.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress projelerinde ayarları ve konfigürasyonları yönetmek için kullanılan dosya hangisidir?",
            "en": "Which file is used to manage settings and configurations in Cypress projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "cypress-settings.json",
                        "en": "cypress-settings.json"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "cypress.config.js",
                        "en": "cypress.config.js"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "test-config.yaml",
                        "en": "test-config.yaml"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "config.js",
                        "en": "config.js"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Cypress v10 sonrası tüm yapılandırma ayarları cypress.config.js dosyasında toplanmıştır. Bu dosya; temel URL, zaman aşımları ve plugin tanımlamaları gibi kritik ayarları içerir.",
            "en": "Since Cypress v10, all configuration settings are centralized in the cypress.config.js file. This file contains critical settings such as base URL, timeouts, and plugin definitions."
      }
}
},
    ],
  },
  en: {
    title: '⚙️ Installation',
    blocks: [
      {
        type: 'text',
        content: "Cypress is installed via npm and can run in both GUI mode (Test Runner) and CLI mode (headless). Installation is a single package install — unlike Java, there's no separate driver download hassle (ChromeDriver, geckodriver); Cypress downloads its own browser binaries bundled with the package.",
      },
      {
        type: 'installation',
        title: { tr: 'Adım Adım Kurulum (Windows / macOS / Linux)', en: 'Step-by-Step Installation (Windows / macOS / Linux)' },
        steps: [
          {
            cmd: 'npm init -y',
            explanation: { tr: 'Projede henüz package.json yoksa oluşturur. Zaten varsa bu adımı atlayabilirsin. Beklenen çıktı: "Wrote to .../package.json".', en: 'Creates package.json if your project does not have one yet. Skip this step if it already exists. Expected output: "Wrote to .../package.json".' },
          },
          {
            cmd: 'npm install cypress --save-dev',
            explanation: { tr: 'Cypress\'i devDependency olarak kurar ve kendi tarayıcı binary\'sini (~300MB) indirir. Linux\'ta bazı sistem kütüphaneleri (libgtk2.0-0, libnotify-dev, xvfb) eksikse "apt-get install" ile eklenmesi gerekebilir; Windows ve macOS\'ta ekstra bağımlılık gerekmez.', en: 'Installs Cypress as a devDependency and downloads its own browser binary (~300MB). On Linux you may need to add a few system libraries (libgtk2.0-0, libnotify-dev, xvfb) via apt-get; Windows and macOS need no extra dependencies.' },
          },
          {
            cmd: 'npx cypress open',
            explanation: { tr: 'İlk çalıştırmada cypress/ klasör yapısını otomatik oluşturur ve interaktif Test Runner GUI\'sini açar — burada E2E ya da Component Testing modunu seçip bir tarayıcı belirlersin. Beklenen çıktı: Cypress penceresi açılır, "Choose a browser" ekranı görünür.', en: 'On first run, it auto-scaffolds the cypress/ folder structure and opens the interactive Test Runner GUI — here you pick E2E or Component Testing mode and choose a browser. Expected output: the Cypress window opens showing a "Choose a browser" screen.' },
          },
          {
            cmd: 'npx cypress run',
            explanation: { tr: 'Tüm testleri headless modda (görünür pencere olmadan) terminalde çalıştırır — CI/CD pipeline\'larında kullanılan komuttur. Beklenen çıktı: terminalde geçen/kalan test sayısı ve bir video/screenshot yolu.', en: 'Runs all tests headlessly (no visible window) right in the terminal — this is the command used in CI/CD pipelines. Expected output: passed/failed test counts and a video/screenshot path printed in the terminal.' },
          },
          {
            cmd: 'npx cypress verify',
            explanation: { tr: 'Cypress binary\'sinin doğru kurulduğunu doğrular. Beklenen çıktı: "✔ Verified Cypress! ... It passed all the verification checks."', en: 'Verifies that the Cypress binary installed correctly. Expected output: "✔ Verified Cypress! ... It passed all the verification checks."' },
          },
        ],
      },
      {
        type: 'file-tree',
        title: { tr: 'Otomatik Oluşturulan Klasör Yapısı', en: 'Auto-Generated Folder Structure' },
        tree: `my-app/
├── cypress/
│   ├── e2e/
│   │   └── login.cy.js
│   ├── fixtures/
│   │   └── example.json
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── downloads/
│   └── screenshots/ · videos/
├── cypress.config.js
└── package.json`,
        note: { tr: 'cypress.config.js (v10+) tüm konfigürasyonun tek kaynağıdır — eski cypress.json artık kullanılmaz. Java\'da bunu Maven\'in pom.xml\'i ya da pytest.ini gibi düşünebilirsin: framework\'ün nasıl davranacağını tanımlayan tek merkezi dosya.', en: "cypress.config.js (v10+) is the single source of truth for all configuration — the old cypress.json is no longer used. In Java terms, think of it like Maven's pom.xml or pytest.ini: one central file that defines how the framework behaves." },
      },
      {
        type: 'code', label: 'cypress/e2e/login.cy.js — Your First Test File',
        language: 'javascript',
        code: `describe('Login Page', () => {
  it('logs in with valid credentials', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('user@test.com')
    cy.get('[data-cy=password]').type('Secret123!')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})`,
      },
      {
        type: 'callout', color: 'orange', emoji: '☕',
        title: 'If You Know Java:',
        content: "npm install cypress --save-dev is similar to adding a test dependency (like selenium-java) to pom.xml in Maven — except Cypress needs no compile step (no mvn compile), it runs the .js file directly. The describe()/it() structure is the JavaScript counterpart of JUnit 5's @Nested test classes and @Test methods (under the hood it actually uses the Mocha test framework).",
      },
      cypressInstallOpenFilm,
      {
        type: 'quiz',
        question: { tr: 'cypress.config.js dosyasının amacı nedir?', en: 'What is the purpose of cypress.config.js?' },
        options: [
          { id: 'a', text: 'It is only used to change the browser icon' },
          { id: 'b', text: 'It is the central file holding all Cypress configuration (baseUrl, timeout, plugin settings)' },
          { id: 'c', text: 'It is only needed in CI/CD environments, not locally' },
          { id: 'd', text: 'It replaces package.json' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cypress.config.js, v10 ile birlikte eski cypress.json\'ın yerini aldı; baseUrl, viewport, timeout, env değişkenleri ve setupNodeEvents (plugin) gibi tüm ayarları tek bir yerde toplar.',
          en: "cypress.config.js replaced the old cypress.json starting with v10; it centralizes all settings like baseUrl, viewport, timeout, env variables, and setupNodeEvents (plugins) in one place.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress projelerinde e2e test ayarlarını (viewport, env, baseUrl) tanımlamak için kullanılan temel konfigürasyon dosyası hangisidir?",
            "en": "Which file is the primary configuration file used to define e2e test settings (such as viewport, env, and baseUrl) in Cypress projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "test.config.js"
            },
            {
                  "id": "b",
                  "text": "cypress.config.js"
            },
            {
                  "id": "c",
                  "text": "package.json"
            },
            {
                  "id": "d",
                  "text": "cypress.json"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cypress.config.js, Cypress v10 ve sonrası için standart konfigürasyon dosyasıdır. Proje genelindeki ayarları (baseUrl, timeout, ortam değişkenleri) burada merkezi bir şekilde yönetiriz.",
            "en": "cypress.config.js is the standard configuration file for Cypress v10 and later. We manage global project settings (like baseUrl, timeouts, and environment variables) centrally in this file."
      }
}
},
    ],
  },
}

const cypressCommandQueueRetryFilm = {
  type: 'video-scene',
  id: 'cypress-command-queue-retry-film',
  title: { tr: '🎬 cy.get() Aslında Ne Zaman Çalışır? Komut Kuyruğu ve Retry Döngüsü', en: '🎬 When Does cy.get() Actually Run? The Command Queue and Retry Loop' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'testFile', emoji: '📜', label: { tr: 'Test Dosyası', en: 'Test File' }, color: '#0ea5e9' },
    { id: 'queue', emoji: '📋', label: { tr: 'Komut Kuyruğu', en: 'Command Queue' }, color: '#8b5cf6' },
    { id: 'domCheck', emoji: '🌐', label: { tr: 'DOM Kontrolü', en: 'DOM Check' }, color: '#f59e0b' },
    { id: 'found', emoji: '✅', label: { tr: 'Element Bulundu', en: 'Element Found' }, color: '#22c55e' },
    { id: 'timeoutGhost', emoji: '⏰', label: { tr: 'defaultCommandTimeout Doldu', en: 'defaultCommandTimeout Expired' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'cy.get(\'[data-cy=search-input]\') senkron bir fonksiyon çağrısı gibi GÖRÜNÜR — ama arka planda hiç de öyle çalışmaz. Bu filmde bu tek satırın gerçekte nasıl bir kuyruğa girip beklediğini izleyeceksin.',
        en: "cy.get('[data-cy=search-input]') LOOKS like a synchronous function call — but under the hood it works nothing like that. In this film you will watch how this one line actually enters a queue and waits.",
      },
      code: { tr: `cy.get('[data-cy=search-input]').type('laptop')`, en: `cy.get('[data-cy=search-input]').type('laptop')` },
      positions: { testFile: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — cy.get() çağrıldığı anda ÇALIŞMAZ, sadece Cypress\'in dahili komut kuyruğuna bir "görev" olarak eklenir. Test fonksiyonu senkron gibi okunsa da gerçek çalışma sıraya bağlıdır.',
        en: 'Step 1 — calling cy.get() does NOT execute it immediately; it only enqueues a "task" in Cypress\'s internal command queue. The test function reads synchronously, but actual execution depends on the queue.',
      },
      positions: {
        testFile: { x: 16, y: 40, scale: 0.95 },
        queue: { x: 44, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'testFile', to: 'queue' }],
    },
    {
      caption: {
        tr: 'Adım 2 — sıra cy.get()\'e geldiğinde, Cypress DOM\'u kontrol eder: element var mı? Yoksa hemen hata FIRLATMAZ — "retry-ability" devreye girer ve birkaç milisaniye sonra tekrar dener.',
        en: "Step 2 — when it's cy.get()'s turn, Cypress checks the DOM: does the element exist? If not, it does NOT throw immediately — \"retry-ability\" kicks in and it tries again a few milliseconds later.",
      },
      code: { tr: `// 1. deneme: element yok → bekle → 2. deneme: element yok → bekle → ...`, en: `// attempt 1: not found → wait → attempt 2: not found → wait → ...` },
      positions: {
        queue: { x: 22, y: 40, opacity: 0.6, scale: 0.9 },
        domCheck: { x: 50, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'queue', to: 'domCheck', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — element DOM\'a girdiği anda (örn. bir API isteği yeni tamamlandı ve React yeniden render etti) bir sonraki denemede kontrol BAŞARILI olur ve komut zinciri devam eder: .type(\'laptop\') artık gerçek elemente yazabilir.',
        en: "Step 3 — the moment the element enters the DOM (e.g. an API request just finished and React re-rendered), the next attempt SUCCEEDS and the command chain continues: .type('laptop') can now type into the real element.",
      },
      positions: {
        domCheck: { x: 26, y: 40, opacity: 0.6, scale: 0.9 },
        found: { x: 56, y: 40, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'domCheck', to: 'found', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast (hayalet) sahnesi — eğer element HİÇBİR ZAMAN DOM\'a gelmezse (selector yanlış yazılmış ya da API hiç dönmemiş), retry döngüsü sonsuza kadar sürmez: varsayılan defaultCommandTimeout olan 4000ms dolunca Cypress "Timed out retrying..." hatasıyla testi durdurur.',
        en: 'Contrast (ghost) scene — if the element NEVER arrives in the DOM (wrong selector, or the API never responded), the retry loop does not run forever: once the default defaultCommandTimeout of 4000ms expires, Cypress stops the test with a "Timed out retrying..." error.',
      },
      code: { tr: `Timed out retrying after 4000ms: Expected to find element: '[data-cy=search-input]', but never found it.`, en: `Timed out retrying after 4000ms: Expected to find element: '[data-cy=search-input]', but never found it.` },
      positions: {
        found: { x: 30, y: 40, opacity: 0.55, scale: 0.85 },
        timeoutGhost: { x: 62, y: 40, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'found', to: 'timeoutGhost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Sonuç: bu döngü sayesinde Thread.sleep() gibi sabit beklemeler yazmana gerek kalmaz — Cypress elementi bulana ya da timeout dolana kadar arka planda kendisi tekrar dener. Bu, Selenium\'da WebDriverWait ile ELLE kurman gereken mantığın komutların kendisine gömülü halidir.',
        en: 'The takeaway: thanks to this loop you never need to write fixed waits like Thread.sleep() — Cypress retries in the background by itself until it finds the element or the timeout expires. This is the same logic you would manually set up with WebDriverWait in Selenium, but baked directly into the commands.',
      },
      positions: {
        queue: { x: 20, y: 55, scale: 0.9 },
        domCheck: { x: 42, y: 55, scale: 1 },
        found: { x: 68, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'queue', to: 'domCheck' }, { from: 'domCheck', to: 'found', color: '#22c55e' }],
    },
  ],
}

const s2 = {
  tr: {
    title: '🖱️ Temel Komutlar & Selector Stratejisi',
    blocks: [
      {
        type: 'text',
        content: 'Cypress\'te her komut cy ile başlar ve bir Promise benzeri ama "chainable" (zincirlenebilir) nesne döndürür. cy.visit() sayfaya gider, cy.get() CSS selector ile element bulur, cy.contains() ise görünür metne göre arar. Bu komutlar senkron gibi YAZILIR ama arka planda asenkron ve retry-ability\'lidir — yani await/async yazmana gerek yoktur, Cypress kuyruğu kendi yönetir.',
      },
      LOCATOR_EXPLORER_BLOCK,
      {
        type: 'code', label: 'Temel Komutlar',
        language: 'javascript',
        code: `cy.visit('/products')                     // sayfaya git
cy.get('[data-cy=search-input]')            // selector ile element bul
  .type('laptop')                           // yaz
cy.contains('Add to Cart').click()          // görünür metne göre bul + tıkla
cy.get('.product-card').should('have.length', 5)  // retry-able assertion`,
      },
      {
        type: 'table',
        headers: ['Selector Stratejisi', 'Güvenilirlik', 'Neden?'],
        rows: [
          ['data-cy / data-test / data-testid', '✅ En iyi pratik', 'CSS veya metin değişse bile kırılmaz; sadece test için var olduğu açıktır.'],
          ['id', '🟡 Kabul edilebilir', 'Genelde sabittir ama bazen dinamik (React\'te otomatik üretilen id) olabilir.'],
          ['class (CSS)', '🔴 Kırılgan', 'Stil değişikliğinde (Tailwind/CSS refactor) test bozulur — Selenium\'daki aynı sorun.'],
          ['Metin (cy.contains)', '🟡 Bağlama göre değişir', 'i18n (çoklu dil) projelerde metin değişirse test kırılır; sabit UI\'larda güvenlidir.'],
          ['XPath', '🔴 Önerilmez', 'Cypress varsayılan olarak XPath desteklemez (eklenti gerekir), DOM yapısı değişince kırılır.'],
        ],
      },
      {
        type: 'comparison',
        left: { label: 'Selenium (Java)', code: `WebElement email = driver.findElement(By.cssSelector("[data-cy=email]"));
email.sendKeys("user@test.com");
wait.until(ExpectedConditions.elementToBeClickable(submitBtn));
submitBtn.click();`, note: 'Explicit wait yazman gerekir, yoksa StaleElementReferenceException riski var.' },
        right: { label: 'Cypress (JavaScript)', code: `cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()
// retry-ability built-in — explicit wait yazmana gerek yok`, note: 'Element DOM\'a gelene ve tıklanabilir olana kadar cy.get()+click() otomatik bekler.' },
      },
      {
        type: 'java-compare',
        topic: 'findElement() vs cy.get()',
        java: `WebElement el = driver.findElement(By.cssSelector("[data-cy=email]"));
// Bulunamazsa hemen NoSuchElementException fırlatır`,
        typescript: `cy.get('[data-cy=email]')
// Bulunamazsa varsayılan 4 saniye boyunca tekrar tekrar dener, sonra hata verir`,
        why: { tr: 'Selenium\'da findElement() "anlık" bir sorgudur — element o anda DOM\'da yoksa hemen patlar. Cypress\'in cy.get() komutu ise "sabırlıdır": elementi bulana kadar (varsayılan defaultCommandTimeout: 4000ms) arka planda tekrar tekrar dener.', en: "In Selenium, findElement() is an \"instant\" query — if the element isn't in the DOM right now, it throws immediately. Cypress's cy.get() is \"patient\": it keeps retrying in the background until it finds the element (default defaultCommandTimeout: 4000ms)." },
        note: { tr: 'Bu yüzden Cypress\'te "elementi bulamadı" hatası genelde 4 saniye SONRA gelir — Selenium\'da ise ANINDA gelir. İlk başta kafa karıştırıcı olabilir ama flaky testleri büyük ölçüde azaltır.', en: 'This is why a "could not find element" error in Cypress usually appears 4 seconds LATER — in Selenium it appears INSTANTLY. This can be confusing at first, but it significantly reduces flaky tests.' },
      },
      {
        type: 'tip',
        content: 'cy.get(...).then(($el) => { ... }) sadece BİR KEZ çalışan bir callback\'tir (jQuery elemanına erişmek için), retry-ability YOKTUR. Assertion yazarken her zaman .should() kullan — o, koşul sağlanana kadar otomatik tekrar dener; .then() içine assertion koyma.',
      },
      cypressCommandQueueRetryFilm,
      {
        type: 'quiz',
        question: { tr: 'Cypress\'te selector olarak neden data-cy attribute\'u önerilir?', en: 'Why is the data-cy attribute recommended as a selector strategy in Cypress?' },
        options: [
          { id: 'a', text: 'Çünkü daha kısa yazılır' },
          { id: 'b', text: 'Çünkü CSS class veya metin değişikliklerinden etkilenmez, sadece test amaçlı var olduğu nettir' },
          { id: 'c', text: 'Çünkü Cypress sadece data-cy ile çalışır, başka selector kabul etmez' },
          { id: 'd', text: 'Çünkü SEO için gereklidir' },
        ],
        correct: 'b',
        explanation: {
          tr: 'data-cy (veya data-test, data-testid) attribute\'ları sadece test amacıyla eklenir; geliştiriciler stil veya metin değiştirdiğinde bu attribute\'a dokunmaz, bu yüzden testler kırılmaz. Bu, Selenium dünyasında da geçerli olan evrensel bir "resilient selector" pratiğidir.',
          en: 'data-cy (or data-test, data-testid) attributes exist purely for testing; developers will not touch them when changing styles or text, so tests stay stable. This is a universal "resilient selector" practice that applies in the Selenium world too.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Test otomasyonunda 'data-cy' veya 'data-testid' kullanmanın CSS sınıfları (classes) veya HTML etiketlerine göre en büyük avantajı nedir?",
            "en": "What is the primary advantage of using 'data-cy' or 'data-testid' over CSS classes or HTML tags in test automation?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Daha hızlı tarayıcı render süresi sağlar"
            },
            {
                  "id": "b",
                  "text": "Testlerin, arayüzdeki stil (CSS) veya yapısal (HTML tag) değişikliklerinden etkilenmemesini (daha az kırılgan olmasını) sağlar"
            },
            {
                  "id": "c",
                  "text": "Tarayıcının sayfayı daha hızlı yüklemesine yardımcı olur"
            },
            {
                  "id": "d",
                  "text": "Otomatik olarak tüm tarayıcılarda cross-browser uyumluluğu sağlar"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "CSS sınıfları genellikle stil değişiklikleri nedeniyle güncellenir. 'data-cy' ise sadece test için ayrılmıştır; bu sayede arayüz tasarımı değişse bile testleriniz stabil kalmaya devam eder.",
            "en": "CSS classes are often updated for styling purposes. 'data-cy' is reserved strictly for testing, ensuring your tests remain stable even when the UI design changes."
      }
}
},
    ],
  },
  en: {
    title: '🖱️ Basic Commands & Selector Strategy',
    blocks: [
      {
        type: 'text',
        content: "Every command in Cypress starts with cy and returns a Promise-like but \"chainable\" object. cy.visit() navigates to a page, cy.get() finds an element by CSS selector, and cy.contains() searches by visible text. These commands are WRITTEN as if synchronous but are asynchronous and retry-able under the hood — you never write await/async, Cypress manages its own queue.",
      },
      LOCATOR_EXPLORER_BLOCK,
      {
        type: 'code', label: 'Basic Commands',
        language: 'javascript',
        code: `cy.visit('/products')                     // navigate to the page
cy.get('[data-cy=search-input]')            // find element by selector
  .type('laptop')                           // type
cy.contains('Add to Cart').click()          // find by visible text + click
cy.get('.product-card').should('have.length', 5)  // retry-able assertion`,
      },
      {
        type: 'table',
        headers: ['Selector Strategy', 'Reliability', 'Why?'],
        rows: [
          ['data-cy / data-test / data-testid', '✅ Best practice', "Won't break even if CSS or text changes; clearly exists only for testing."],
          ['id', '🟡 Acceptable', 'Usually stable but can sometimes be dynamic (auto-generated ids in React).'],
          ['class (CSS)', '🔴 Brittle', "Breaks on style refactors (Tailwind/CSS changes) — the same problem as in Selenium."],
          ['Text (cy.contains)', '🟡 Context-dependent', 'Breaks in i18n (multi-language) projects when text changes; safe for static UIs.'],
          ['XPath', '🔴 Not recommended', "Cypress doesn't support XPath by default (needs a plugin), breaks when DOM structure changes."],
        ],
      },
      {
        type: 'comparison',
        left: { label: 'Selenium (Java)', code: `WebElement email = driver.findElement(By.cssSelector("[data-cy=email]"));
email.sendKeys("user@test.com");
wait.until(ExpectedConditions.elementToBeClickable(submitBtn));
submitBtn.click();`, note: 'You must write explicit waits, otherwise risk a StaleElementReferenceException.' },
        right: { label: 'Cypress (JavaScript)', code: `cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()
// retry-ability is built-in — no explicit wait needed`, note: "cy.get()+click() automatically wait until the element is in the DOM and clickable." },
      },
      {
        type: 'java-compare',
        topic: 'findElement() vs cy.get()',
        java: `WebElement el = driver.findElement(By.cssSelector("[data-cy=email]"));
// Throws NoSuchElementException immediately if not found`,
        typescript: `cy.get('[data-cy=email]')
// Retries for the default 4 seconds if not found, then errors`,
        why: { tr: 'Selenium\'da findElement() "anlık" bir sorgudur — element o anda DOM\'da yoksa hemen patlar. Cypress\'in cy.get() komutu ise "sabırlıdır": elementi bulana kadar (varsayılan defaultCommandTimeout: 4000ms) arka planda tekrar tekrar dener.', en: "In Selenium, findElement() is an \"instant\" query — if the element isn't in the DOM right now, it throws immediately. Cypress's cy.get() is \"patient\": it keeps retrying in the background until it finds the element (default defaultCommandTimeout: 4000ms)." },
        note: { tr: 'Bu yüzden Cypress\'te "elementi bulamadı" hatası genelde 4 saniye SONRA gelir — Selenium\'da ise ANINDA gelir. İlk başta kafa karıştırıcı olabilir ama flaky testleri büyük ölçüde azaltır.', en: 'This is why a "could not find element" error in Cypress usually appears 4 seconds LATER — in Selenium it appears INSTANTLY. This can be confusing at first, but it significantly reduces flaky tests.' },
      },
      {
        type: 'tip',
        content: "cy.get(...).then(($el) => { ... }) is a callback that runs only ONCE (to access the jQuery element) — it has NO retry-ability. Always use .should() for assertions — it automatically retries until the condition passes; never put assertions inside .then().",
      },
      cypressCommandQueueRetryFilm,
      {
        type: 'quiz',
        question: { tr: 'Cypress\'te selector olarak neden data-cy attribute\'u önerilir?', en: 'Why is the data-cy attribute recommended as a selector strategy in Cypress?' },
        options: [
          { id: 'a', text: "Because it's shorter to write" },
          { id: 'b', text: "Because it's unaffected by CSS class or text changes, and it's clear it exists purely for testing" },
          { id: 'c', text: 'Because Cypress only works with data-cy and rejects other selectors' },
          { id: 'd', text: 'Because it is required for SEO' },
        ],
        correct: 'b',
        explanation: {
          tr: 'data-cy (veya data-test, data-testid) attribute\'ları sadece test amacıyla eklenir; geliştiriciler stil veya metin değiştirdiğinde bu attribute\'a dokunmaz, bu yüzden testler kırılmaz. Bu, Selenium dünyasında da geçerli olan evrensel bir "resilient selector" pratiğidir.',
          en: 'data-cy (or data-test, data-testid) attributes exist purely for testing; developers will not touch them when changing styles or text, so tests stay stable. This is a universal "resilient selector" practice that applies in the Selenium world too.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Test otomasyonunda 'data-cy' veya 'data-testid' kullanmanın CSS sınıfları (classes) veya HTML etiketlerine göre en büyük avantajı nedir?",
            "en": "What is the primary advantage of using 'data-cy' or 'data-testid' over CSS classes or HTML tags in test automation?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It improves browser rendering performance"
            },
            {
                  "id": "b",
                  "text": "It decouples tests from UI/styling changes, making tests more resilient"
            },
            {
                  "id": "c",
                  "text": "It helps the browser load pages faster"
            },
            {
                  "id": "d",
                  "text": "It provides automatic cross-browser compatibility"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "CSS sınıfları genellikle stil değişiklikleri nedeniyle güncellenir. 'data-cy' ise sadece test için ayrılmıştır; bu sayede arayüz tasarımı değişse bile testleriniz stabil kalmaya devam eder.",
            "en": "CSS classes are often updated for styling purposes. 'data-cy' is reserved strictly for testing, ensuring your tests remain stable even when the UI design changes."
      }
}
},
    ],
  },
}

const cypressActionChainFilm = {
  type: 'video-scene',
  id: 'cypress-action-chain-film',
  title: { tr: '🎬 .type() ve .click()\'ten Önce: Actionability Kontrol Zinciri', en: '🎬 Before .type() and .click(): The Actionability Check Chain' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'testFile', emoji: '📜', label: { tr: 'Test Kodu', en: 'Test Code' }, color: '#0ea5e9' },
    { id: 'found', emoji: '🔍', label: { tr: 'Element Bulundu', en: 'Element Found' }, color: '#f59e0b' },
    { id: 'checks', emoji: '👁️', label: { tr: 'Actionability Kontrolleri', en: 'Actionability Checks' }, color: '#8b5cf6' },
    { id: 'action', emoji: '🖱️', label: { tr: 'type() / click() Uygulanır', en: 'type() / click() Applied' }, color: '#22c55e' },
    { id: 'domUpdate', emoji: '🔄', label: { tr: 'DOM Güncellenir', en: 'DOM Updates' }, color: '#10b981' },
    { id: 'forceGhost', emoji: '🕳️', label: { tr: '{ force: true } — Gizli Elemente Tıklama', en: '{ force: true } — Clicking a Hidden Element' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'cy.get(...).click() yazdığında Cypress hemen tıklamaz — önce kullanıcının gerçekte tıklayabileceğinden EMİN olmak için birkaç görünmez kontrolden geçer. Bu filmde o kontrol zincirini izleyeceksin.',
        en: "When you write cy.get(...).click(), Cypress doesn't click right away — it first runs a few invisible checks to make SURE a real user could actually click it. In this film you will watch that check chain.",
      },
      code: { tr: `cy.get('[data-cy=name]').type('Ada Lovelace')
cy.get('[data-cy=submit]').click()`, en: `cy.get('[data-cy=name]').type('Ada Lovelace')
cy.get('[data-cy=submit]').click()` },
      positions: { testFile: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — cy.get() önce elementi retry-ability ile DOM\'da bulur. Ama bulmuş olmak henüz "tıklanabilir" demek değildir.',
        en: 'Step 1 — cy.get() first finds the element in the DOM using retry-ability. But finding it does not yet mean it is "clickable".',
      },
      positions: {
        testFile: { x: 16, y: 40, scale: 0.95 },
        found: { x: 44, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'testFile', to: 'found' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Cypress dört soruyu otomatik sorar: element görünür mü (display:none değil)? Etkin mi (disabled değil)? Animasyon bitmiş mi? Başka bir element (modal, overlay) onu ÖRTMÜYOR mu? Hepsi EVET olana kadar bekler.',
        en: 'Step 2 — Cypress automatically asks four questions: is the element visible (not display:none)? Is it enabled (not disabled)? Has any animation finished? Is another element (a modal, overlay) NOT covering it? It waits until all are YES.',
      },
      code: { tr: `// visible? enabled? not animating? not covered?`, en: `// visible? enabled? not animating? not covered?` },
      positions: {
        found: { x: 22, y: 40, opacity: 0.6, scale: 0.9 },
        checks: { x: 50, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'found', to: 'checks', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — dört kontrol de geçince Cypress GERÇEK bir tarayıcı olayı gönderir: type() karakterleri tek tek simüle eder, click() gerçek bir mouse event dizisi (mousedown, mouseup, click) tetikler.',
        en: 'Step 3 — once all four checks pass, Cypress fires a REAL browser event: type() simulates characters one by one, click() triggers a real mouse event sequence (mousedown, mouseup, click).',
      },
      positions: {
        checks: { x: 26, y: 40, opacity: 0.6, scale: 0.9 },
        action: { x: 54, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'checks', to: 'action', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — aksiyon uygulanınca DOM güncellenir: input\'un değeri değişir, form submit olur, sayfa yeni bir state\'e geçer. Bu, "gerçek bir kullanıcı gibi davranma" prensibinin bir sonucudur.',
        en: 'Step 4 — once the action applies, the DOM updates: the input value changes, the form submits, the page moves to a new state. This is a direct result of the "behave like a real user" principle.',
      },
      positions: {
        action: { x: 30, y: 40, opacity: 0.6, scale: 0.9 },
        domUpdate: { x: 58, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'action', to: 'domUpdate', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Kontrast sahnesi — { force: true } bu dört kontrolü BİLEREK atlar. Bir buton gerçekten bir modal arkasında gizliyse ve testi { force: true } ile geçirirsen, test YEŞİL olur ama gerçek bir kullanıcı o butona ASLA tıklayamaz — bu, CI\'da yanlış bir PASS\'in klasik kaynağıdır. force sadece bilinçli, gerekçeli durumlarda kullanılmalıdır.',
        en: 'Contrast scene — { force: true } deliberately skips these four checks. If a button is genuinely hidden behind a modal and you make the test pass with { force: true }, the test turns GREEN but a real user could NEVER click that button — this is a classic source of a false PASS in CI. force should only be used deliberately, with a documented reason.',
      },
      positions: {
        domUpdate: { x: 30, y: 40, opacity: 0.5, scale: 0.85 },
        forceGhost: { x: 64, y: 40, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'domUpdate', to: 'forceGhost', color: '#ef4444' }],
    },
  ],
}

const s3 = {
  tr: {
    title: '🧩 Aksiyonlar, Form ve Drag & Drop',
    blocks: [
      {
        type: 'text',
        content: 'cy.type(), cy.click(), cy.check(), cy.uncheck() ve cy.select() temel form aksiyonlarıdır. Hepsi retry-ability\'lidir: element görünür, etkin (disabled değil) ve "actionable" (başka bir element tarafından örtülmemiş) olana kadar otomatik bekler. Eğer bir element gerçekten tıklanamaz durumdaysa ama yine de test etmek istiyorsan { force: true } seçeneğiyle bu kontrolleri bilerek atlayabilirsin.',
      },
      {
        type: 'code', label: 'Form Aksiyonları',
        language: 'javascript',
        code: `cy.get('[data-cy=name]').type('Ada Lovelace')
cy.get('[data-cy=name]').clear().type('Yeni İsim')
cy.get('[data-cy=newsletter]').check()
cy.get('[data-cy=country]').select('Turkey')
cy.get('[data-cy=hidden-btn]').click({ force: true })  // actionability kontrolünü bilerek atla`,
      },
      {
        type: 'drag-order',
        title: { tr: 'Mini Alıştırma: Login Testini Kur', en: 'Mini Exercise: Build the Login Test' },
        instruction: { tr: 'Kartları sürükleyip doğru sıraya getirerek çalışan bir Cypress login testi kur.', en: 'Drag the cards into the correct order to build a working Cypress login test.' },
        items: [
          { id: 'visit', code: "cy.visit('/login')", label: { tr: 'Sayfayı aç', en: 'Open the page' } },
          { id: 'get-email', code: "cy.get('[data-cy=email]')", label: { tr: 'Email alanını bul', en: 'Find the email field' } },
          { id: 'type-email', code: ".type('user@test.com')", label: { tr: 'Email yaz', en: 'Type the email' } },
          { id: 'get-password', code: "cy.get('[data-cy=password]')", label: { tr: 'Şifre alanını bul', en: 'Find the password field' } },
          { id: 'type-password', code: ".type('Secret123!')", label: { tr: 'Şifre yaz', en: 'Type the password' } },
          { id: 'click-submit', code: "cy.get('[data-cy=submit]').click()", label: { tr: 'Gönder butonuna tıkla', en: 'Click submit' } },
          { id: 'assert-url', code: "cy.url().should('include', '/dashboard')", label: { tr: "URL'yi doğrula", en: 'Assert the URL' } },
        ],
        successCode: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=password]').type('Secret123!')
cy.get('[data-cy=submit]').click()
cy.url().should('include', '/dashboard')`,
      },
      {
        type: 'simulation',
        scenario: 'drag-drop',
        icon: '🖱️',
        color: '#059669',
        title: { tr: 'Native HTML5 Drag & Drop Neden Cypress\'i Zorlar?', en: 'Why Native HTML5 Drag & Drop Is Tricky for Cypress' },
        description: { tr: 'Aynı DOM event zincirini (dragstart → drag → dragenter → drop) Selenium sayfasında görmüştün — şimdi Cypress\'in bunu nasıl ele aldığını öğren. Sürükle\'ye bas ve event akışını izle.', en: "You saw the same DOM event chain (dragstart → drag → dragenter → drop) on the Selenium page — now learn how Cypress handles it. Click Drag and watch the event flow." },
        code: `// .trigger() ile manuel event simülasyonu — kırılgan, sıralama önemli
cy.get('[data-cy=drag-source]').trigger('dragstart')
cy.get('[data-cy=drop-target]').trigger('drop')
cy.get('[data-cy=drag-source]').trigger('dragend')

// Daha güvenilir: cypress-real-events / @4tw/cypress-drag-drop eklentisi
import '@4tw/cypress-drag-drop'
cy.get('[data-cy=drag-source]').drag('[data-cy=drop-target]')`,
        language: 'javascript',
      },
      {
        type: 'callout', color: 'yellow', emoji: '⚠️',
        title: { tr: 'Dikkat:', en: 'Watch Out:' },
        content: { tr: 'Native HTML5 drag-and-drop, gerçek işletim sistemi mouse olaylarına dayanır; Cypress (ve aslında tarayıcının kendi otomasyon API\'leri) bunu tam olarak taklit edemez. Bu yüzden .trigger() ile event\'leri elle tetiklemek ya da bir eklenti kullanmak gerekir — bu, Cypress\'in "tek sınırlı alanlardan" biridir.', en: "Native HTML5 drag-and-drop relies on real OS-level mouse events; Cypress (and in fact a browser's own automation APIs) cannot fully replicate this. That's why you either trigger the events manually with .trigger() or use a plugin — this is one of Cypress's known limitations." },
      },
      cypressActionChainFilm,
      {
        type: 'quiz',
        question: { tr: 'Cypress\'te native HTML5 drag-and-drop testlerinin Selenium\'a göre neden daha zor olduğu söylenir?', en: 'Why are native HTML5 drag-and-drop tests said to be harder in Cypress compared to Selenium?' },
        options: [
          { id: 'a', text: 'Cypress drag-and-drop\'u hiç desteklemez' },
          { id: 'b', text: 'Drag-and-drop gerçek OS mouse event\'lerine dayanır ve sentetik event tetikleme ile tam simüle edilemez' },
          { id: 'c', text: 'Cypress sadece klavye olaylarını destekler' },
          { id: 'd', text: 'Drag-and-drop sadece mobilde test edilebilir' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Hem Cypress hem Selenium\'un Actions API\'si, native drag-and-drop\'u gerçek OS seviyesinde mouse hareketleri olmadan simüle etmekte zorlanır. Cypress\'te .trigger() ile sentetik event göndermek ya da topluluk eklentisi (cypress-drag-drop) kullanmak en yaygın çözümdür.',
          en: "Both Cypress and Selenium's Actions API struggle to simulate native drag-and-drop without real OS-level mouse movement. In Cypress, dispatching synthetic events with .trigger() or using a community plugin (cypress-drag-drop) is the most common workaround.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress'te mouse hareketlerine dayalı etkileşimleri (örneğin elementleri sürükleyip bırakma) test ederken karşılaşılan temel teknik kısıt nedir?",
            "en": "What is the primary technical limitation when testing mouse-based interactions, such as drag-and-drop, in Cypress?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Cypress'in mouse koordinat sistemini tamamen devre dışı bırakması"
            },
            {
                  "id": "b",
                  "text": "İşletim sistemi seviyesindeki gerçek mouse sürücü hareketlerini taklit etmenin zorluğu"
            },
            {
                  "id": "c",
                  "text": "Cypress'in sadece dokunmatik ekranlı cihazlarda çalışması"
            },
            {
                  "id": "d",
                  "text": "DOM elementlerinin sürüklenemez olarak işaretlenmiş olması"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Cypress, tarayıcı içinde çalışan bir araç olduğu için işletim sistemi düzeyindeki gerçek mouse donanım hareketlerini tetikleyemez. Bu yüzden drag-and-drop işlemleri sentetik event'ler aracılığıyla simüle edilir, bu da native behavior'ı her zaman %100 yansıtmayabilir.",
            "en": "Because Cypress runs inside the browser, it cannot trigger actual hardware mouse movements at the OS level. Therefore, drag-and-drop actions are simulated via synthetic events, which may not always perfectly replicate native browser behavior."
      }
}
},
    ],
  },
  en: {
    title: '🧩 Actions, Forms & Drag & Drop',
    blocks: [
      {
        type: 'text',
        content: "cy.type(), cy.click(), cy.check(), cy.uncheck(), and cy.select() are the core form actions. All of them are retry-able: they automatically wait until the element is visible, enabled (not disabled), and \"actionable\" (not covered by another element). If an element genuinely cannot be clicked but you want to test it anyway, you can deliberately bypass these checks with { force: true }.",
      },
      {
        type: 'code', label: 'Form Actions',
        language: 'javascript',
        code: `cy.get('[data-cy=name]').type('Ada Lovelace')
cy.get('[data-cy=name]').clear().type('New Name')
cy.get('[data-cy=newsletter]').check()
cy.get('[data-cy=country]').select('Turkey')
cy.get('[data-cy=hidden-btn]').click({ force: true })  // deliberately skip actionability checks`,
      },
      {
        type: 'drag-order',
        title: { tr: 'Mini Alıştırma: Login Testini Kur', en: 'Mini Exercise: Build the Login Test' },
        instruction: { tr: 'Kartları sürükleyip doğru sıraya getirerek çalışan bir Cypress login testi kur.', en: 'Drag the cards into the correct order to build a working Cypress login test.' },
        items: [
          { id: 'visit', code: "cy.visit('/login')", label: { tr: 'Sayfayı aç', en: 'Open the page' } },
          { id: 'get-email', code: "cy.get('[data-cy=email]')", label: { tr: 'Email alanını bul', en: 'Find the email field' } },
          { id: 'type-email', code: ".type('user@test.com')", label: { tr: 'Email yaz', en: 'Type the email' } },
          { id: 'get-password', code: "cy.get('[data-cy=password]')", label: { tr: 'Şifre alanını bul', en: 'Find the password field' } },
          { id: 'type-password', code: ".type('Secret123!')", label: { tr: 'Şifre yaz', en: 'Type the password' } },
          { id: 'click-submit', code: "cy.get('[data-cy=submit]').click()", label: { tr: 'Gönder butonuna tıkla', en: 'Click submit' } },
          { id: 'assert-url', code: "cy.url().should('include', '/dashboard')", label: { tr: "URL'yi doğrula", en: 'Assert the URL' } },
        ],
        successCode: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=password]').type('Secret123!')
cy.get('[data-cy=submit]').click()
cy.url().should('include', '/dashboard')`,
      },
      {
        type: 'simulation',
        scenario: 'drag-drop',
        icon: '🖱️',
        color: '#059669',
        title: { tr: 'Native HTML5 Drag & Drop Neden Cypress\'i Zorlar?', en: 'Why Native HTML5 Drag & Drop Is Tricky for Cypress' },
        description: { tr: 'Aynı DOM event zincirini (dragstart → drag → dragenter → drop) Selenium sayfasında görmüştün — şimdi Cypress\'in bunu nasıl ele aldığını öğren. Sürükle\'ye bas ve event akışını izle.', en: "You saw the same DOM event chain (dragstart → drag → dragenter → drop) on the Selenium page — now learn how Cypress handles it. Click Drag and watch the event flow." },
        code: `// Manual event simulation with .trigger() — brittle, order matters
cy.get('[data-cy=drag-source]').trigger('dragstart')
cy.get('[data-cy=drop-target]').trigger('drop')
cy.get('[data-cy=drag-source]').trigger('dragend')

// More reliable: cypress-real-events / @4tw/cypress-drag-drop plugin
import '@4tw/cypress-drag-drop'
cy.get('[data-cy=drag-source]').drag('[data-cy=drop-target]')`,
        language: 'javascript',
      },
      {
        type: 'callout', color: 'yellow', emoji: '⚠️',
        title: { tr: 'Dikkat:', en: 'Watch Out:' },
        content: { tr: 'Native HTML5 drag-and-drop, gerçek işletim sistemi mouse olaylarına dayanır; Cypress (ve aslında tarayıcının kendi otomasyon API\'leri) bunu tam olarak taklit edemez. Bu yüzden .trigger() ile event\'leri elle tetiklemek ya da bir eklenti kullanmak gerekir — bu, Cypress\'in "tek sınırlı alanlardan" biridir.', en: "Native HTML5 drag-and-drop relies on real OS-level mouse events; Cypress (and in fact a browser's own automation APIs) cannot fully replicate this. That's why you either trigger the events manually with .trigger() or use a plugin — this is one of Cypress's known limitations." },
      },
      cypressActionChainFilm,
      {
        type: 'quiz',
        question: { tr: 'Cypress\'te native HTML5 drag-and-drop testlerinin Selenium\'a göre neden daha zor olduğu söylenir?', en: 'Why are native HTML5 drag-and-drop tests said to be harder in Cypress compared to Selenium?' },
        options: [
          { id: 'a', text: 'Cypress does not support drag-and-drop at all' },
          { id: 'b', text: 'Drag-and-drop relies on real OS mouse events and cannot be fully simulated by synthetic event triggers' },
          { id: 'c', text: 'Cypress only supports keyboard events' },
          { id: 'd', text: 'Drag-and-drop can only be tested on mobile' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Hem Cypress hem Selenium\'un Actions API\'si, native drag-and-drop\'u gerçek OS seviyesinde mouse hareketleri olmadan simüle etmekte zorlanır. Cypress\'te .trigger() ile sentetik event göndermek ya da topluluk eklentisi (cypress-drag-drop) kullanmak en yaygın çözümdür.',
          en: "Both Cypress and Selenium's Actions API struggle to simulate native drag-and-drop without real OS-level mouse movement. In Cypress, dispatching synthetic events with .trigger() or using a community plugin (cypress-drag-drop) is the most common workaround.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress'te mouse hareketlerine dayalı etkileşimleri (örneğin elementleri sürükleyip bırakma) test ederken karşılaşılan temel teknik kısıt nedir?",
            "en": "What is the primary technical limitation when testing mouse-based interactions, such as drag-and-drop, in Cypress?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Cypress completely disables the mouse coordinate system"
            },
            {
                  "id": "b",
                  "text": "The difficulty of simulating actual OS-level mouse driver movements"
            },
            {
                  "id": "c",
                  "text": "Cypress only functions on touchscreen devices"
            },
            {
                  "id": "d",
                  "text": "DOM elements are marked as non-draggable by default"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Cypress, tarayıcı içinde çalışan bir araç olduğu için işletim sistemi düzeyindeki gerçek mouse donanım hareketlerini tetikleyemez. Bu yüzden drag-and-drop işlemleri sentetik event'ler aracılığıyla simüle edilir, bu da native behavior'ı her zaman %100 yansıtmayabilir.",
            "en": "Because Cypress runs inside the browser, it cannot trigger actual hardware mouse movements at the OS level. Therefore, drag-and-drop actions are simulated via synthetic events, which may not always perfectly replicate native browser behavior."
      }
}
},
    ],
  },
}

const cypressTimeTravelRetryFilm = {
  type: 'video-scene',
  id: 'cypress-time-travel-retry-film',
  title: { tr: '🎬 Her Komuttan Sonra Bir Fotoğraf: Time Travel Debugging', en: '🎬 A Snapshot After Every Command: Time Travel Debugging' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'cmd1', emoji: '1️⃣', label: { tr: 'cy.visit()', en: 'cy.visit()' }, color: '#0ea5e9' },
    { id: 'cmd2', emoji: '2️⃣', label: { tr: "cy.get().type()", en: 'cy.get().type()' }, color: '#f59e0b' },
    { id: 'cmd3', emoji: '3️⃣', label: { tr: 'cy.get().click()', en: 'cy.get().click()' }, color: '#8b5cf6' },
    { id: 'snapshots', emoji: '📸', label: { tr: 'Snapshot Deposu', en: 'Snapshot Store' }, color: '#22c55e' },
    { id: 'cursor', emoji: '🖱️', label: { tr: 'Command Log Tıklaması', en: 'Command Log Click' }, color: '#10b981' },
    { id: 'lostDebug', emoji: '👻', label: { tr: 'Selenium: Yakalanmamış An', en: 'Selenium: The Moment You Never Captured' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir test 3 komuttan oluşuyor. Selenium\'da bu komutlar çalışıp geçer, geriye sadece son durum kalır. Cypress\'te ise HER komut arkasında görünmez bir "fotoğraf makinesi" çalıştırır. Bu filmde o makineyi izleyeceksin.',
        en: 'A test consists of 3 commands. In Selenium these commands run and are gone, only the final state remains. In Cypress, EVERY command runs an invisible "camera" behind it. In this film you will watch that camera at work.',
      },
      code: { tr: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()`, en: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=submit]').click()` },
      positions: { cmd1: { x: 50, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — cy.visit() çalışır çalışmaz, Cypress o anki DOM\'un TAM bir anlık görüntüsünü (snapshot) alıp Command Log\'daki bu satıra bağlar. Bu, sen hiçbir şey istemeden otomatik olur.',
        en: 'Step 1 — the moment cy.visit() runs, Cypress takes a COMPLETE snapshot of the DOM at that instant and attaches it to this line in the Command Log. This happens automatically, without you asking for it.',
      },
      positions: {
        cmd1: { x: 16, y: 40, scale: 1 },
        snapshots: { x: 44, y: 40, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'cmd1', to: 'snapshots' }],
    },
    {
      caption: {
        tr: 'Adım 2 — cy.get().type() ve cy.get().click() da aynısını yapar: her biri kendi anlık görüntüsünü depoya ekler. Artık 3 komut için 3 ayrı "zaman kapsülü" var.',
        en: 'Step 2 — cy.get().type() and cy.get().click() do the same: each adds its own snapshot to the store. Now there are 3 separate "time capsules" for 3 commands.',
      },
      positions: {
        cmd2: { x: 20, y: 55, scale: 1 },
        cmd3: { x: 40, y: 55, scale: 1 },
        snapshots: { x: 66, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'cmd2', to: 'snapshots', color: '#f59e0b' }, { from: 'cmd3', to: 'snapshots', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — test bittikten SONRA (ya da hata verdikten sonra), Command Log\'da 2. komuta (type) tıklarsın. Cypress yeniden test ÇALIŞTIRMAZ — depodaki o anki snapshot\'ı doğrudan ekrana geri yükler.',
        en: 'Step 3 — AFTER the test finishes (or fails), you click the 2nd command (type) in the Command Log. Cypress does NOT re-run the test — it directly restores that exact snapshot from the store to the screen.',
      },
      positions: {
        snapshots: { x: 30, y: 45, opacity: 0.6, scale: 0.9 },
        cursor: { x: 58, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'snapshots', to: 'cursor', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Kontrast sahnesi — Selenium\'da bu "geçmişe dönme" özelliği yoktur: eğer o anki DOM durumunu görmek istiyorsan, testi YAZARKEN önceden driver.getScreenshotAs(...) çağrısı eklemiş olman gerekirdi. Beklemediğin bir yerde test kırılırsa, o anın kanıtı SONSUZA kadar kaybolur.',
        en: "Contrast scene — Selenium has no such \"go back in time\" feature: to see the DOM state at that moment, you would have had to add a driver.getScreenshotAs(...) call in advance, while WRITING the test. If the test breaks somewhere you didn't anticipate, the evidence of that moment is lost FOREVER.",
      },
      positions: {
        cursor: { x: 32, y: 45, opacity: 0.55, scale: 0.85 },
        lostDebug: { x: 64, y: 45, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'cursor', to: 'lostDebug', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Sonuç: bu yüzden CI\'da fail eden bir Cypress testinde saatlerce log okumak yerine, tam olarak hangi komutta hangi elementin ne gösterdiğini bir tıkla görebilirsin — flaky test analizini dakikalara indiren asıl özellik budur.',
        en: 'The takeaway: this is why, instead of combing through logs for hours when a Cypress test fails in CI, you can see exactly what an element showed at exactly which command with a single click — this is the feature that turns flaky-test analysis into a matter of minutes.',
      },
      positions: {
        snapshots: { x: 30, y: 55, scale: 0.95 },
        cursor: { x: 62, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'snapshots', to: 'cursor', color: '#10b981' }],
    },
  ],
}

// Elle yazılan sandbox (s4'te 'code' tipi blok yok, otomatik trio üretilmez) —
// CLAUDE.md §9.4: relatedTopicId zorunlu.
const cypressTimeTravelPractice = {
  type: 'code-playground',
  id: 'cypress-time-travel-practice-1',
  relatedTopicId: 'cypress-time-travel',
  label: { tr: 'Kendin Yaz ve Dene: cy.wait(sayı) Yerine Retry-able Assertion', en: 'Write It Yourself: A Retry-able Assertion Instead of cy.wait(number)' },
  language: 'javascript',
  task: {
    tr: 'Sepete ürün eklendikten sonra sepet sayacının "3" olmasını bekleyen bir satır yaz — sabit bir cy.wait(3000) İLE DEĞİL, retry-ability\'li bir should() ile.',
    en: 'Write a line that waits for the cart counter to become "3" after adding a product — NOT with a fixed cy.wait(3000), but with a retry-able should().',
  },
  explanation: {
    tr: 'TODO satırını, sayacın metninin "3" olmasını bekleyen bir cy.get(...).should(...) zinciriyle tamamla.',
    en: 'Complete the TODO line with a cy.get(...).should(...) chain that waits for the counter text to be "3".',
  },
  code: {
    tr: `cy.get('[data-cy=add-to-cart]').click()
cy.get('[data-cy=cart-count]').should('have.text', '3')`,
    en: `cy.get('[data-cy=add-to-cart]').click()
cy.get('[data-cy=cart-count]').should('have.text', '3')`,
  },
  starterCode: {
    tr: `cy.get('[data-cy=add-to-cart]').click()
// TODO: [data-cy=cart-count] elementinin metninin '3' olmasını retry-able şekilde bekle`,
    en: `cy.get('[data-cy=add-to-cart]').click()
// TODO: wait for [data-cy=cart-count] text to be '3', retry-ably`,
  },
  solutionCode: {
    tr: `cy.get('[data-cy=add-to-cart]').click()
cy.get('[data-cy=cart-count]').should('have.text', '3')`,
    en: `cy.get('[data-cy=add-to-cart]').click()
cy.get('[data-cy=cart-count]').should('have.text', '3')`,
  },
  expected: {
    tr: 'Çözüm eşleşti — should(\'have.text\', \'3\') koşul sağlanana kadar otomatik tekrar dener; cy.wait(3000) gibi sabit bir süre beklemez, hem daha hızlı hem daha güvenilirdir.',
    en: "Your solution matches — should('have.text', '3') automatically retries until the condition passes; it does not wait a fixed duration like cy.wait(3000), making it both faster and more reliable.",
  },
  hints: [
    { tr: 'should() bir assertion\'dır ve retry-ability\'lidir — koşul doğru olana kadar (varsayılan 4000ms) arka planda tekrar dener.', en: 'should() is an assertion and is retry-able — it retries in the background (default 4000ms) until the condition is true.' },
    { tr: '.should(\'have.text\', \'3\') tam metin eşleşmesi arar; kısmi eşleşme için .should(\'contain.text\', \'3\') kullanılır.', en: ".should('have.text', '3') looks for an exact text match; for partial matches use .should('contain.text', '3')." },
  ],
  xpReward: 10,
}

const s4 = {
  tr: {
    title: '🕐 Zaman Yolculuğu & Retry-ability',
    blocks: [
      {
        type: 'text',
        content: 'Cypress\'in en sevilen özelliği "time travel debugging"dir: her komuttan sonra arka planda bir DOM anlık görüntüsü saklanır. Test bittikten (ya da hata verdikten) sonra Command Log\'daki herhangi bir geçmiş satıra tıklayarak, uygulamanın O ANKI haliyle nasıl göründüğünü tekrar görebilirsin — sayfayı yeniden çalıştırmana ya da debug modunu açmana gerek kalmaz.',
      },
      {
        type: 'simulation',
        scenario: 'cypress-time-travel',
        icon: '⏪',
        color: '#10b981',
        title: { tr: 'Cypress Time Travel — Canlı Demo', en: 'Cypress Time Travel — Live Demo' },
        description: { tr: '▶ Run\'a bas, testin adım adım çalıştığını izle. Bittikten sonra soldaki komut listesinden GEÇMİŞE tıkla — sağdaki ekran o anki DOM\'u gösterecek. Bu, Selenium\'da hiç olmayan bir debugging süper gücüdür.', en: '▶ Click Run and watch the test execute step by step. Once it finishes, click any PAST command on the left — the screen on the right will show the DOM exactly as it was then. This is a debugging superpower that simply does not exist in Selenium.' },
        code: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=password]').type('Secret123!')
cy.get('[data-cy=submit]').click()
cy.url().should('include', '/dashboard')
// Soldaki Command Log'da herhangi bir satıra tıkla:
// Cypress o anın DOM anlık görüntüsünü gösterir.`,
        language: 'javascript',
      },
      cypressTimeTravelRetryFilm,
      cypressTimeTravelPractice,
      {
        type: 'comparison',
        left: { label: 'Selenium — Explicit Wait', code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.textToBePresentInElement(
    driver.findElement(By.id("cart-count")), "3"));`, note: 'Koşulu manuel tanımlaman ve her assertion için tekrar yazman gerekir.' },
        right: { label: 'Cypress — Retry-ability', code: `cy.get('[data-cy=cart-count]').should('have.text', '3')
// should() koşul sağlanana kadar otomatik tekrar dener`, note: 'Aynı satır hem assertion hem bekleme mantığıdır — ekstra kod yok.' },
      },
      {
        type: 'java-compare',
        topic: 'Retry-ability vs WebDriverWait',
        java: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("toast")));`,
        typescript: `cy.get('[data-cy=toast]').should('be.visible')
// retry-ability built-in, ekstra wait nesnesi oluşturmaya gerek yok`,
        why: { tr: 'Selenium\'da "bekleme" ayrı bir kavramdır — WebDriverWait nesnesi oluşturup ExpectedConditions ile neyi bekleyeceğini elle tanımlarsın. Cypress\'te bekleme, assertion\'ın kendisine gömülüdür: should() zaten "doğru olana kadar dene" anlamına gelir.', en: 'In Selenium, "waiting" is a separate concept — you create a WebDriverWait object and manually define what to wait for with ExpectedConditions. In Cypress, waiting is baked into the assertion itself: should() already means "keep trying until this is true".' },
        note: { tr: 'Varsayılan timeout\'lar cypress.config.js içinde defaultCommandTimeout (4000ms) ve responseTimeout gibi ayarlarla değiştirilebilir — Selenium\'daki wait süresi tanımlamaya benzer ama global ve merkezi bir ayardır.', en: 'Default timeouts can be changed in cypress.config.js via settings like defaultCommandTimeout (4000ms) and responseTimeout — similar to defining a wait duration in Selenium, but as one global, central setting.' },
      },
      {
        type: 'warning',
        content: { tr: 'cy.wait(3000) gibi sabit milisaniye bekleme bir anti-pattern\'dir — Selenium\'daki Thread.sleep() kadar kötüdür ve testi hem yavaşlatır hem de güvenilmez yapar. Bunun yerine her zaman should()/and() ile koşul bazlı bekle, ya da bir network isteğini beklemek istiyorsan cy.wait(\'@alias\') kullan (network sekmesinde detaylandırılacak).', en: "A fixed-millisecond wait like cy.wait(3000) is an anti-pattern — just as bad as Thread.sleep() in Selenium, it both slows tests down and makes them unreliable. Always wait on a condition with should()/and() instead, or if you need to wait for a network request use cy.wait('@alias') (covered in the Network tab)." },
      },
      {
        type: 'quiz',
        question: { tr: 'Cypress Test Runner\'da Command Log\'daki geçmiş bir komuta tıklarsan ne olur?', en: 'What happens if you click a past command in the Cypress Test Runner Command Log?' },
        options: [
          { id: 'a', text: 'Test baştan tekrar çalışır' },
          { id: 'b', text: 'Uygulamanın o komut anındaki DOM anlık görüntüsü (snapshot) gösterilir — "time travel"' },
          { id: 'c', text: 'Test durur ve hata verir' },
          { id: 'd', text: 'Hiçbir şey olmaz, sadece görsel bir log\'dur' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Cypress her komuttan sonra otomatik olarak bir DOM snapshot\'ı saklar. Command Log\'da geçmişe tıklamak, testi yeniden çalıştırmadan o anki uygulama durumunu (DOM, stil, hatta hover durumları) tekrar görmeni sağlar — buna "time travel debugging" denir.',
          en: 'Cypress automatically stores a DOM snapshot after every command. Clicking a past entry in the Command Log lets you see the app state at that exact moment (DOM, styles, even hover states) without re-running the test — this is called "time travel debugging".',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress Test Runner'da Command Log üzerinde bir komutun üzerine gelindiğinde (hover) uygulanan 'Time Travel' özelliğinin sağladığı temel avantaj nedir?",
            "en": "What is the main benefit provided by the 'Time Travel' feature when hovering over a command in the Cypress Test Runner Command Log?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Testin o noktadan itibaren kodunu otomatik düzeltmesi"
            },
            {
                  "id": "b",
                  "text": "Testin çalışması sırasında o ana ait DOM yapısını ve CSS durumunu inceleme imkanı"
            },
            {
                  "id": "c",
                  "text": "Tüm network isteklerini o an için iptal etmesi"
            },
            {
                  "id": "d",
                  "text": "Testin çalışma hızını artırmak için render'ı durdurması"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Time Travel, Cypress'in her komut sonrası aldığı snapshot'ları kullanarak, testin yürütülmesi bittikten sonra uygulamanın geçmişteki herhangi bir durumunu görselleştirmenize ve DOM üzerinde debug yapmanıza olanak tanır.",
            "en": "Time Travel utilizes the snapshots Cypress takes after every command, allowing you to visualize and debug any past state of the application in the DOM after the test execution has finished."
      }
}
},
    ],
  },
  en: {
    title: '🕐 Time Travel & Retry-ability',
    blocks: [
      {
        type: 'text',
        content: 'Cypress\'s most beloved feature is "time travel debugging": a DOM snapshot is stored in the background after every command. Once a test finishes (or fails), you can click any past entry in the Command Log to see exactly how the app looked AT THAT MOMENT — no need to re-run the test or open a debugger.',
      },
      {
        type: 'simulation',
        scenario: 'cypress-time-travel',
        icon: '⏪',
        color: '#10b981',
        title: { tr: 'Cypress Time Travel — Canlı Demo', en: 'Cypress Time Travel — Live Demo' },
        description: { tr: '▶ Run\'a bas, testin adım adım çalıştığını izle. Bittikten sonra soldaki komut listesinden GEÇMİŞE tıkla — sağdaki ekran o anki DOM\'u gösterecek. Bu, Selenium\'da hiç olmayan bir debugging süper gücüdür.', en: '▶ Click Run and watch the test execute step by step. Once it finishes, click any PAST command on the left — the screen on the right will show the DOM exactly as it was then. This is a debugging superpower that simply does not exist in Selenium.' },
        code: `cy.visit('/login')
cy.get('[data-cy=email]').type('user@test.com')
cy.get('[data-cy=password]').type('Secret123!')
cy.get('[data-cy=submit]').click()
cy.url().should('include', '/dashboard')
// Click any line in the Command Log on the left:
// Cypress shows the DOM snapshot from that exact moment.`,
        language: 'javascript',
      },
      cypressTimeTravelRetryFilm,
      cypressTimeTravelPractice,
      {
        type: 'comparison',
        left: { label: 'Selenium — Explicit Wait', code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.textToBePresentInElement(
    driver.findElement(By.id("cart-count")), "3"));`, note: 'You must manually define the condition and repeat it for every assertion.' },
        right: { label: 'Cypress — Retry-ability', code: `cy.get('[data-cy=cart-count]').should('have.text', '3')
// should() automatically retries until the condition passes`, note: 'The same line is both the assertion and the waiting logic — no extra code.' },
      },
      {
        type: 'java-compare',
        topic: 'Retry-ability vs WebDriverWait',
        java: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("toast")));`,
        typescript: `cy.get('[data-cy=toast]').should('be.visible')
// retry-ability is built-in, no separate wait object needed`,
        why: { tr: 'Selenium\'da "bekleme" ayrı bir kavramdır — WebDriverWait nesnesi oluşturup ExpectedConditions ile neyi bekleyeceğini elle tanımlarsın. Cypress\'te bekleme, assertion\'ın kendisine gömülüdür: should() zaten "doğru olana kadar dene" anlamına gelir.', en: 'In Selenium, "waiting" is a separate concept — you create a WebDriverWait object and manually define what to wait for with ExpectedConditions. In Cypress, waiting is baked into the assertion itself: should() already means "keep trying until this is true".' },
        note: { tr: 'Varsayılan timeout\'lar cypress.config.js içinde defaultCommandTimeout (4000ms) ve responseTimeout gibi ayarlarla değiştirilebilir — Selenium\'daki wait süresi tanımlamaya benzer ama global ve merkezi bir ayardır.', en: 'Default timeouts can be changed in cypress.config.js via settings like defaultCommandTimeout (4000ms) and responseTimeout — similar to defining a wait duration in Selenium, but as one global, central setting.' },
      },
      {
        type: 'warning',
        content: { tr: 'cy.wait(3000) gibi sabit milisaniye bekleme bir anti-pattern\'dir — Selenium\'daki Thread.sleep() kadar kötüdür ve testi hem yavaşlatır hem de güvenilmez yapar. Bunun yerine her zaman should()/and() ile koşul bazlı bekle, ya da bir network isteğini beklemek istiyorsan cy.wait(\'@alias\') kullan (network sekmesinde detaylandırılacak).', en: "A fixed-millisecond wait like cy.wait(3000) is an anti-pattern — just as bad as Thread.sleep() in Selenium, it both slows tests down and makes them unreliable. Always wait on a condition with should()/and() instead, or if you need to wait for a network request use cy.wait('@alias') (covered in the Network tab)." },
      },
      {
        type: 'quiz',
        question: { tr: 'Cypress Test Runner\'da Command Log\'daki geçmiş bir komuta tıklarsan ne olur?', en: 'What happens if you click a past command in the Cypress Test Runner Command Log?' },
        options: [
          { id: 'a', text: 'The test reruns from the beginning' },
          { id: 'b', text: "The app's DOM snapshot from that exact command is shown — \"time travel\"" },
          { id: 'c', text: 'The test stops and throws an error' },
          { id: 'd', text: "Nothing happens, it's just a visual log" },
        ],
        correct: 'b',
        explanation: {
          tr: 'Cypress her komuttan sonra otomatik olarak bir DOM snapshot\'ı saklar. Command Log\'da geçmişe tıklamak, testi yeniden çalıştırmadan o anki uygulama durumunu (DOM, stil, hatta hover durumları) tekrar görmeni sağlar — buna "time travel debugging" denir.',
          en: 'Cypress automatically stores a DOM snapshot after every command. Clicking a past entry in the Command Log lets you see the app state at that exact moment (DOM, styles, even hover states) without re-running the test — this is called "time travel debugging".',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress Test Runner'da bir test adımı tamamlandıktan sonra Command Log'da bir komutun üzerine gelindiğinde oluşan 'Snapshot' özelliğinin ana amacı nedir?",
            "en": "What is the primary purpose of the 'Snapshot' feature that appears when hovering over a command in the Cypress Test Runner Command Log?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Testi o noktadan itibaren hızlandırmak",
                        "en": "To speed up the test execution from that point"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Uygulamanın o adımdaki görsel ve yapısal durumunu inceleyebilmek",
                        "en": "To inspect the visual and structural state of the application at that step"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Testi otomatik olarak hata ayıklama modunda yeniden başlatmak",
                        "en": "To automatically restart the test in debug mode"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Eski komutları testten kalıcı olarak silmek",
                        "en": "To permanently delete old commands from the test"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Cypress, her komut sonrasında DOM'un bir anlık görüntüsünü (snapshot) alır. Command Log üzerinden bu anlık görüntülere erişmek, uygulamanın o komut çalıştırıldığı andaki DOM yapısını, CSS stillerini ve etkileşim durumlarını inceleyerek hatayı hızlıca anlamanızı sağlar.",
            "en": "Cypress captures a snapshot of the DOM after every command. Accessing these snapshots via the Command Log allows you to inspect the DOM structure, CSS styles, and interaction states as they existed at the moment that command was executed, helping you debug issues efficiently."
      }
}
},
    ],
  },
}

const cypressInterceptStubFilm = {
  type: 'video-scene',
  id: 'cypress-intercept-stub-film',
  title: { tr: '🎬 İstek Daha Yola Çıkmadan: cy.intercept() Nasıl Araya Girer?', en: '🎬 Before the Request Even Leaves: How cy.intercept() Steps In' },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'app', emoji: '📱', label: { tr: 'Uygulama (fetch/XHR)', en: 'Application (fetch/XHR)' }, color: '#0ea5e9' },
    { id: 'intercept', emoji: '🕸️', label: { tr: 'cy.intercept() Katmanı', en: 'cy.intercept() Layer' }, color: '#8b5cf6' },
    { id: 'fixture', emoji: '📄', label: { tr: 'fixture: products.json', en: 'fixture: products.json' }, color: '#f59e0b' },
    { id: 'realServer', emoji: '🖧', label: { tr: 'Gerçek Sunucu', en: 'Real Server' }, color: '#64748b' },
    { id: 'domAssert', emoji: '✅', label: { tr: 'UI Güncellendi + Assertion', en: 'UI Updated + Assertion' }, color: '#22c55e' },
    { id: 'missedGhost', emoji: '👻', label: { tr: 'cy.wait() Hiç Tetiklenmedi', en: 'cy.wait() Never Fired' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Uygulama /api/products\'a bir GET isteği atacak. Ama cy.intercept() bu isteğin tarayıcıyı GERÇEKTEN terk etmesinden önce araya girer. Bu filmde tam olarak NEREDE araya girdiğini göreceksin.',
        en: "The app is about to make a GET request to /api/products. But cy.intercept() steps in before the request actually leaves the browser. In this film you will see EXACTLY where it intercepts.",
      },
      code: { tr: `cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts')
cy.visit('/shop')`, en: `cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts')
cy.visit('/shop')` },
      positions: { app: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — cy.intercept() cy.visit()\'ten ÖNCE tanımlandığı için, sayfa yüklenmeye başladığında Cypress zaten "/api/products" isteklerini dinliyor olur — bu sıralama kritiktir.',
        en: 'Step 1 — because cy.intercept() is defined BEFORE cy.visit(), by the time the page starts loading Cypress is already listening for "/api/products" requests — this ordering is critical.',
      },
      positions: {
        app: { x: 16, y: 40, scale: 0.95 },
        intercept: { x: 44, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'app', to: 'intercept' }],
    },
    {
      caption: {
        tr: 'Adım 2 — uygulama isteği attığında, istek GERÇEK sunucuya ULAŞMADAN cy.intercept() katmanında yakalanır. STUB modunda ({ fixture: ... }) Cypress isteği hiç sunucuya göndermez — doğrudan fixture dosyasından sahte veri döner.',
        en: "Step 2 — when the app fires the request, it is caught at the cy.intercept() layer BEFORE it ever reaches the REAL server. In STUB mode ({ fixture: ... }), Cypress never sends the request to the server at all — it returns fake data directly from the fixture file.",
      },
      positions: {
        intercept: { x: 24, y: 40, opacity: 0.6, scale: 0.9 },
        fixture: { x: 52, y: 40, scale: 1.2, pulse: true },
        realServer: { x: 78, y: 40, scale: 0.85, opacity: 0.4 },
      },
      beams: [{ from: 'intercept', to: 'fixture', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — fixture verisi uygulamaya gerçek bir HTTP cevabıymış GİBİ döner; React/Vue bileşeni bunun sahte olduğunu bilmez, normal şekilde 8 ürünü render eder.',
        en: "Step 3 — the fixture data is returned to the app AS IF it were a real HTTP response; the React/Vue component has no idea it's fake, and renders the 8 products normally.",
      },
      positions: {
        fixture: { x: 30, y: 40, opacity: 0.6, scale: 0.9 },
        domAssert: { x: 58, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'fixture', to: 'domAssert', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — cy.wait(\'@getProducts\') testin, isteğin gerçekten TAMAMLANMASINI (stub cevabı dönene kadar) beklemesini sağlar; sonra cy.get(\'.product-card\').should(\'have.length\', 8) doğrulamayı yapar.',
        en: "Step 4 — cy.wait('@getProducts') makes the test wait for the request to actually COMPLETE (until the stub response returns); then cy.get('.product-card').should('have.length', 8) performs the check.",
      },
      code: { tr: `cy.wait('@getProducts')
cy.get('.product-card').should('have.length', 8)`, en: `cy.wait('@getProducts')
cy.get('.product-card').should('have.length', 8)` },
      positions: {
        domAssert: { x: 34, y: 40, scale: 1 },
        intercept: { x: 60, y: 55, scale: 1 },
      },
      beams: [{ from: 'domAssert', to: 'intercept', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Kontrast (hayalet) sahnesi — sıralama TERSİNE çevrilirse (cy.intercept() cy.visit()\'ten SONRA yazılırsa), sayfa isteği intercept kaydolmadan ÖNCE atmış olur; cy.wait(\'@getProducts\') hiçbir zaman eşleşen bir istek görmez ve "No request ever occurred" hatasıyla timeout olur. Sıra, cy.intercept() için her şeydir.',
        en: 'Contrast (ghost) scene — if the order is REVERSED (cy.intercept() written AFTER cy.visit()), the page fires its request BEFORE the intercept is even registered; cy.wait(\'@getProducts\') never sees a matching request and times out with "No request ever occurred". Order is everything for cy.intercept().',
      },
      positions: {
        intercept: { x: 34, y: 55, opacity: 0.55, scale: 0.85 },
        missedGhost: { x: 66, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'intercept', to: 'missedGhost', color: '#ef4444' }],
    },
  ],
}

const s5 = {
  tr: {
    title: '🌐 Network & cy.intercept()',
    blocks: [
      {
        type: 'text',
        content: 'cy.intercept() (eski adıyla cy.route(), v6\'dan beri kullanılmıyor), Cypress\'in network katmanını yakalama API\'sidir. Üç moda göre kullanılabilir: gerçek isteği "stub" ederek sahte veriyle değiştirmek, isteği değiştirmeden sadece "spy" olarak izlemek, ya da gecikme/hata simüle etmek. Bu, Selenium dünyasında ayrı bir proxy sunucusu (BrowserMob Proxy gibi) kurmadan asla yapamayacağın bir şeydir.',
      },
      {
        type: 'code', label: 'Stub ve Spy Kullanımı',
        language: 'javascript',
        code: `// STUB: gerçek sunucuya gitmeden fixture'dan sahte veri dön
cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts')
cy.visit('/shop')
cy.wait('@getProducts')
cy.get('.product-card').should('have.length', 8)

// SPY: gerçek isteği değiştirmeden gözlemle ve assertion yap
cy.intercept('POST', '/api/checkout').as('checkout')
cy.get('[data-cy=pay]').click()
cy.wait('@checkout').its('response.statusCode').should('eq', 200)`,
      },
      {
        type: 'visual', variant: 'flow', title: 'cy.intercept() İstek Yaşam Döngüsü',
        steps: [
          { num: 1, label: 'Uygulama', desc: 'fetch/XHR isteği atar', highlight: false },
          { num: 2, label: 'cy.intercept()', desc: 'Tarayıcı katmanında yakalar', highlight: true },
          { num: 3, label: 'Stub mu, Spy mı?', desc: 'fixture dön ya da gerçek isteğe izin ver', highlight: true },
          { num: 4, label: 'UI Güncellenir', desc: 'Cevaba göre DOM değişir', highlight: false },
          { num: 5, label: 'cy.wait(\'@alias\')', desc: 'Test isteğin bitmesini bekler', highlight: false },
        ],
      },
      {
        type: 'table',
        headers: ['Seçenek', 'Ne Yapar', 'Örnek'],
        rows: [
          ['fixture / body (stub)', 'Gerçek sunucuya gitmeden sahte cevap döner', "{ fixture: 'users.json' }"],
          ['(override yok, sadece .as())', 'Gerçek isteği gönderir, sadece gözlemlemene izin verir', "cy.intercept('POST', '/api/orders').as('createOrder')"],
          ['delay', 'Yanıtı belirli ms geciktirir — loading state test etmek için', "{ fixture: 'p.json', delay: 2000 }"],
          ['forceNetworkError: true', 'Bağlantı hatasını simüle eder', '{ forceNetworkError: true }'],
          ['times: 1', 'Sadece ilk N isteği yakalar, gerisini sunucuya bırakır', "{ url: '/api/x', times: 1 }"],
        ],
      },
      {
        type: 'java-compare',
        topic: 'cy.intercept() vs WireMock',
        java: `WireMockServer wireMockServer = new WireMockServer(8089);
wireMockServer.stubFor(get(urlEqualTo("/api/products"))
    .willReturn(aResponse().withBodyFile("products.json")));`,
        typescript: `cy.intercept('GET', '/api/products', { fixture: 'products.json' })
// ayrı bir sunucu kurmana, port yönetmene gerek yok`,
        why: { tr: 'Java\'da network stub\'lamak için WireMock/MockServer gibi ayrı bir HTTP sunucusu ayağa kaldırman, port çakışmalarını yönetmen ve testten önce/sonra başlatıp durdurman gerekir. Cypress\'te cy.intercept() tarayıcının network katmanını doğrudan yakalar — ekstra sunucu yoktur.', en: "In Java, stubbing the network requires spinning up a separate HTTP server like WireMock/MockServer, managing port conflicts, and starting/stopping it around your tests. In Cypress, cy.intercept() captures the browser's network layer directly — there is no extra server." },
        note: { tr: 'Bu fark, Cypress\'in "tek process içinde çalışma" mimarisinin doğrudan bir sonucudur — network katmanı zaten aynı tarayıcı içinde olduğu için yakalamak trivial hale gelir.', en: "This difference is a direct consequence of Cypress's \"same-process\" architecture — since the network layer is already inside the same browser, intercepting it becomes trivial." },
      },
      cypressInterceptStubFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.intercept() ile "stub" ve "spy" arasındaki temel fark nedir?', en: 'What is the core difference between "stub" and "spy" with cy.intercept()?' },
        options: [
          { id: 'a', text: 'Stub isteği sahte veriyle değiştirir, spy ise gerçek isteği değiştirmeden sadece izler' },
          { id: 'b', text: 'İkisi de aynı şeyi yapar, sadece isimleri farklıdır' },
          { id: 'c', text: 'Spy sadece POST isteklerinde, stub sadece GET isteklerinde çalışır' },
          { id: 'd', text: 'Stub sadece CI ortamında çalışır' },
        ],
        correct: 'a',
        explanation: {
          tr: 'cy.intercept() içine fixture/body/statusCode verirsen "stub" olur — gerçek sunucuya hiç gidilmez. Sadece .as() ile alias verip override yapmazsan "spy" olur — gerçek istek sunucuya gider ama sen response\'u test edebilirsin (cy.wait(\'@alias\').its(...)).',
          en: "If you pass a fixture/body/statusCode to cy.intercept(), it becomes a \"stub\" — the real server is never hit. If you only give it an alias with .as() without overriding the response, it becomes a \"spy\" — the real request goes to the server but you can still assert on the response (cy.wait('@alias').its(...)).",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Bir API isteğini cy.intercept() ile 'spy' (gözlemci) modunda kullanmanın en belirgin özelliği nedir?",
            "en": "What is the most distinct characteristic of using an API request in 'spy' mode with cy.intercept()?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "İstek gerçek sunucuya ulaşır ve yanıt döner",
                        "en": "The request reaches the actual server and receives a response"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "İstek engellenir ve sunucuya hiç gitmez",
                        "en": "The request is blocked and never reaches the server"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Sadece hata durumunda tetiklenir",
                        "en": "It is only triggered in case of an error"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Yanıt verisini rastgele üretir",
                        "en": "It generates random response data"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Spy modunda, cy.intercept() isteği izler ancak araya girip manipüle etmez. İstek gerçek sunucuya iletilir, sunucu yanıtı döner ve siz bu süreci cy.wait('@alias') ile yakalayarak yanıtı onaylayabilirsiniz. 'Stub' ise sunucuya gidişi engeller.",
            "en": "In spy mode, cy.intercept() monitors the request without manipulating it. The request is passed through to the real server, the server returns the response, and you can capture this process using cy.wait('@alias') to assert the response. 'Stub', on the other hand, prevents the request from reaching the server."
      }
}
},
    ],
  },
  en: {
    title: '🌐 Network & cy.intercept()',
    blocks: [
      {
        type: 'text',
        content: "cy.intercept() (formerly cy.route(), deprecated since v6) is Cypress's API for capturing the network layer. It can be used in three ways: \"stub\" the real request by replacing it with fake data, \"spy\" on the request without modifying it, or simulate delay/errors. This is something you could never do in the Selenium world without standing up a separate proxy server (like BrowserMob Proxy).",
      },
      {
        type: 'code', label: 'Stub and Spy Usage',
        language: 'javascript',
        code: `// STUB: return fake data from a fixture without hitting the real server
cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts')
cy.visit('/shop')
cy.wait('@getProducts')
cy.get('.product-card').should('have.length', 8)

// SPY: observe the real request without modifying it, then assert
cy.intercept('POST', '/api/checkout').as('checkout')
cy.get('[data-cy=pay]').click()
cy.wait('@checkout').its('response.statusCode').should('eq', 200)`,
      },
      {
        type: 'visual', variant: 'flow', title: 'cy.intercept() Request Lifecycle',
        steps: [
          { num: 1, label: 'App', desc: 'fires a fetch/XHR request', highlight: false },
          { num: 2, label: 'cy.intercept()', desc: 'captures it at the browser layer', highlight: true },
          { num: 3, label: 'Stub or Spy?', desc: 'return a fixture or let the real request through', highlight: true },
          { num: 4, label: 'UI Updates', desc: 'DOM changes based on the response', highlight: false },
          { num: 5, label: "cy.wait('@alias')", desc: 'test waits for the request to finish', highlight: false },
        ],
      },
      {
        type: 'table',
        headers: ['Option', 'What It Does', 'Example'],
        rows: [
          ['fixture / body (stub)', 'Returns a fake response without hitting the real server', "{ fixture: 'users.json' }"],
          ['(no override, just .as())', 'Sends the real request, lets you only observe it', "cy.intercept('POST', '/api/orders').as('createOrder')"],
          ['delay', 'Delays the response by N ms — for testing loading states', "{ fixture: 'p.json', delay: 2000 }"],
          ['forceNetworkError: true', 'Simulates a connection error', '{ forceNetworkError: true }'],
          ['times: 1', 'Only intercepts the first N requests, lets the rest hit the server', "{ url: '/api/x', times: 1 }"],
        ],
      },
      {
        type: 'java-compare',
        topic: 'cy.intercept() vs WireMock',
        java: `WireMockServer wireMockServer = new WireMockServer(8089);
wireMockServer.stubFor(get(urlEqualTo("/api/products"))
    .willReturn(aResponse().withBodyFile("products.json")));`,
        typescript: `cy.intercept('GET', '/api/products', { fixture: 'products.json' })
// no separate server to stand up, no ports to manage`,
        why: { tr: 'Java\'da network stub\'lamak için WireMock/MockServer gibi ayrı bir HTTP sunucusu ayağa kaldırman, port çakışmalarını yönetmen ve testten önce/sonra başlatıp durdurman gerekir. Cypress\'te cy.intercept() tarayıcının network katmanını doğrudan yakalar — ekstra sunucu yoktur.', en: "In Java, stubbing the network requires spinning up a separate HTTP server like WireMock/MockServer, managing port conflicts, and starting/stopping it around your tests. In Cypress, cy.intercept() captures the browser's network layer directly — there is no extra server." },
        note: { tr: 'Bu fark, Cypress\'in "tek process içinde çalışma" mimarisinin doğrudan bir sonucudur — network katmanı zaten aynı tarayıcı içinde olduğu için yakalamak trivial hale gelir.', en: "This difference is a direct consequence of Cypress's \"same-process\" architecture — since the network layer is already inside the same browser, intercepting it becomes trivial." },
      },
      cypressInterceptStubFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.intercept() ile "stub" ve "spy" arasındaki temel fark nedir?', en: 'What is the core difference between "stub" and "spy" with cy.intercept()?' },
        options: [
          { id: 'a', text: 'Stub replaces the request with fake data, spy only observes the real request' },
          { id: 'b', text: 'They do the exact same thing, just with different names' },
          { id: 'c', text: 'Spy only works for POST requests, stub only for GET requests' },
          { id: 'd', text: 'Stub only works in CI environments' },
        ],
        correct: 'a',
        explanation: {
          tr: 'cy.intercept() içine fixture/body/statusCode verirsen "stub" olur — gerçek sunucuya hiç gidilmez. Sadece .as() ile alias verip override yapmazsan "spy" olur — gerçek istek sunucuya gider ama sen response\'u test edebilirsin (cy.wait(\'@alias\').its(...)).',
          en: "If you pass a fixture/body/statusCode to cy.intercept(), it becomes a \"stub\" — the real server is never hit. If you only give it an alias with .as() without overriding the response, it becomes a \"spy\" — the real request goes to the server but you can still assert on the response (cy.wait('@alias').its(...)).",
        },
      
        retryQuestion: {
      "question": {
            "tr": "cy.intercept() ile bir API yanıtını 'stub' etmek (sahtesini oluşturmak) ile 'spy' etmek arasındaki temel fark hangi durumda ortaya çıkar?",
            "en": "In what scenario does the fundamental difference between 'stubbing' and 'spying' an API response with cy.intercept() emerge?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Stub işleminde yanıt manuel olarak belirlenir, spy işleminde ise gerçek sunucu yanıtı kullanılır",
                        "en": "In stubbing, the response is manually defined, whereas in spying, the real server response is used"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Spy işlemi sadece yerel geliştirme ortamında çalışır",
                        "en": "Spying only works in the local development environment"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Stub sadece JSON verileri için geçerlidir",
                        "en": "Stubbing is only applicable for JSON data"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Her ikisi de gerçek sunucuyla iletişim kurar",
                        "en": "Both communicate with the real server"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Stub kullandığınızda, Cypress'e 'bu isteğe gerçek sunucuya gitme, şu veriyi dön' demiş olursunuz. Spy kullandığınızda ise 'isteği izle ama sunucunun gerçek yanıt dönmesine izin ver' demiş olursunuz.",
            "en": "When using stubbing, you are telling Cypress 'do not go to the real server, return this specific data instead.' When using spying, you are telling Cypress 'monitor the request, but let the real server provide the response.'"
      }
}
},
    ],
  },
}

const cypressCiRealWorldFilm = {
  type: 'video-scene',
  id: 'cypress-ci-real-world-film',
  title: { tr: '🎬 Push\'tan Sipariş Onayına: Gerçek Bir CI Checkout Testi', en: '🎬 From Push to Order Confirmed: A Real CI Checkout Test' },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'push', emoji: '🔔', label: { tr: 'git push', en: 'git push' }, color: '#0ea5e9' },
    { id: 'ciRunner', emoji: '🤖', label: { tr: 'CI Runner (cypress run)', en: 'CI Runner (cypress run)' }, color: '#f59e0b' },
    { id: 'loginApi', emoji: '🔑', label: { tr: 'cy.loginByApi()', en: 'cy.loginByApi()' }, color: '#8b5cf6' },
    { id: 'session', emoji: '🍪', label: { tr: 'Oturum Kuruldu (localStorage)', en: 'Session Established (localStorage)' }, color: '#22c55e' },
    { id: 'checkout', emoji: '🛒', label: { tr: 'Checkout UI Testi', en: 'Checkout UI Test' }, color: '#10b981' },
    { id: 'uiLoginTrap', emoji: '👻', label: { tr: 'Her Testte UI Login — Kırılgan', en: 'UI Login Every Test — Fragile' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir geliştirici kodu push\'lar, CI cypress run\'ı tetikler. Ama gerçek testler başlamadan önce, sahnede fark etmeyeceğin bir kısayol devreye girer — bu filmde onu izleyeceksin.',
        en: 'A developer pushes code, CI triggers cypress run. But before the real tests start, a shortcut you would not notice on stage kicks in — in this film you will watch it.',
      },
      code: { tr: `git push origin feature/checkout-coupon`, en: `git push origin feature/checkout-coupon` },
      positions: { push: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — CI runner uygulamayı ayağa kaldırır ve cypress run --record komutunu çalıştırır. beforeEach hook\'u ilk olarak cy.loginByApi(...) custom komutunu çağırır.',
        en: 'Step 1 — the CI runner boots the app and runs cypress run --record. The beforeEach hook first calls the cy.loginByApi(...) custom command.',
      },
      code: { tr: `beforeEach(() => {
  cy.loginByApi('user@test.com', 'Secret123!')
  cy.visit('/cart')
})`, en: `beforeEach(() => {
  cy.loginByApi('user@test.com', 'Secret123!')
  cy.visit('/cart')
})` },
      positions: {
        push: { x: 16, y: 40, scale: 0.95 },
        ciRunner: { x: 44, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'push', to: 'ciRunner' }],
    },
    {
      caption: {
        tr: 'Adım 2 — loginByApi() UI\'da hiçbir buton tıklamaz: cy.request(\'POST\', \'/api/login\', ...) ile doğrudan bir HTTP isteği atar ve dönen token\'ı localStorage\'a yazar. Bu, "App Actions" pattern\'idir.',
        en: "Step 2 — loginByApi() clicks no button in the UI: it fires a direct HTTP request with cy.request('POST', '/api/login', ...) and writes the returned token into localStorage. This is the \"App Actions\" pattern.",
      },
      positions: {
        ciRunner: { x: 24, y: 40, opacity: 0.6, scale: 0.9 },
        loginApi: { x: 52, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'ciRunner', to: 'loginApi', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — oturum artık kurulu. cy.visit(\'/cart\') sayfayı açtığında uygulama zaten login olmuş bir kullanıcı görür — 5 UI adımını (email yaz, şifre yaz, tıkla, bekle, yönlendirmeyi doğrula) atlamış olursun.',
        en: "Step 3 — the session is now established. When cy.visit('/cart') opens the page, the app already sees a logged-in user — you have skipped 5 UI steps (type email, type password, click, wait, verify redirect).",
      },
      positions: {
        loginApi: { x: 30, y: 40, opacity: 0.6, scale: 0.9 },
        session: { x: 58, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'loginApi', to: 'session', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — asıl checkout testi ŞİMDİ başlar: kupon yaz, uygula, ödeme yap, "Siparişiniz Alındı" mesajını doğrula. Bu test artık sadece checkout mantığına odaklanır — login mekaniğiyle uğraşmaz.',
        en: 'Step 4 — the ACTUAL checkout test starts NOW: type the coupon, apply it, pay, verify the "Order Confirmed" message. This test now focuses purely on checkout logic — it never deals with login mechanics.',
      },
      positions: {
        session: { x: 34, y: 40, scale: 1 },
        checkout: { x: 62, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'session', to: 'checkout', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Kontrast (hayalet) sahnesi — bu pattern KULLANILMASAYDI: 50 testin HER BİRİ UI\'dan login olurdu. Login sayfasında bir CSS class değişse, TÜM 50 test aynı anda kırılır — tek bir gerçek bug yokken CI kırmızıya boyanır. App Actions bu kırılganlığı köküyle keser.',
        en: 'Contrast (ghost) scene — if this pattern were NOT used: EVERY ONE of the 50 tests would log in through the UI. If a single CSS class on the login page changes, ALL 50 tests break at once — CI turns red with zero real bugs. App Actions cuts this fragility off at the root.',
      },
      positions: {
        checkout: { x: 30, y: 55, opacity: 0.55, scale: 0.85 },
        uiLoginTrap: { x: 64, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'checkout', to: 'uiLoginTrap', color: '#ef4444' }],
    },
  ],
}

const s6 = {
  tr: {
    title: '🌍 Gerçek Hayat / Real World',
    blocks: [
      {
        type: 'text',
        content: 'Diyelim bir e-ticaret sitesinin checkout akışını test ediyorsun: sepete ürün ekle, kupon uygula, ödeme yap, sipariş onayını gör. Gerçek bir Cypress test suite\'i bu akışı genellikle custom command\'lar ve "App Actions" pattern\'iyle parçalara ayırır — her testte UI üzerinden baştan login olmak yerine, oturumu API üzerinden önceden kurarak hem zaman kazanılır hem de testler birbirinden bağımsız hale gelir.',
      },
      {
        type: 'code', label: 'Custom Command + Checkout Testi',
        language: 'javascript',
        code: `// cypress/support/commands.js
Cypress.Commands.add('loginByApi', (email, password) => {
  cy.request('POST', '/api/login', { email, password }).then((res) => {
    window.localStorage.setItem('authToken', res.body.token)
  })
})

// cypress/e2e/checkout.cy.js
describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.loginByApi('user@test.com', 'Secret123!')
    cy.visit('/cart')
  })

  it('completes checkout with a valid coupon', () => {
    cy.get('[data-cy=coupon-input]').type('SAVE10')
    cy.get('[data-cy=apply-coupon]').click()
    cy.get('[data-cy=total]').should('contain', '%10 indirim')
    cy.get('[data-cy=pay-now]').click()
    cy.contains('Siparişiniz Alındı').should('be.visible')
  })
})`,
      },
      {
        type: 'callout', color: 'green', emoji: '🎯',
        title: { tr: 'App Actions Pattern:', en: 'App Actions Pattern:' },
        content: { tr: 'Page Object Model yerine, Cypress topluluğu giderek "App Actions" pattern\'ini önerir: UI\'da tıklayarak state hazırlamak yerine, uygulamanın kendi store\'una (Redux/Zustand) doğrudan dispatch yaparsın. Örnek: cy.window().its(\'store\').invoke(\'dispatch\', { type: \'cart/addItem\', payload: { id: 42 } }) — bu, sepete ürün eklemek için 5 UI adımını atlayıp testi saniyeler içinde hazırlar.', en: "Instead of the Page Object Model, the Cypress community increasingly recommends the \"App Actions\" pattern: instead of clicking through the UI to set up state, you dispatch directly into the app's own store (Redux/Zustand). Example: cy.window().its('store').invoke('dispatch', { type: 'cart/addItem', payload: { id: 42 } }) — this skips 5 UI steps to add an item to the cart and sets up the test in seconds." },
      },
      {
        type: 'animated-timeline',
        title: { tr: '50 Testlik Suite — Cypress vs Selenium Çalışma Süresi', en: '50-Test Suite — Cypress vs Selenium Run Time' },
        description: { tr: 'Aynı 50 E2E testi iki araçla çalıştırınca, Cypress\'in tarayıcı-içi mimarisi network round-trip olmadığı için genelde daha hızlı tamamlanır. Gerçek sayılar projeye göre değişir — burada tipik bir CI ölçümü görüyorsun.', en: "Running the same 50 E2E tests with both tools, Cypress's in-browser architecture usually finishes faster since there are no network round-trips. Real numbers vary by project — here is a typical CI measurement." },
        tracks: [
          { label: 'Cypress (in-process)', labelEn: 'Cypress (in-process)', duration: 38000, color: '#10b981', badge: { tr: '⚡ Network round-trip yok', en: '⚡ No network round-trips' } },
          { label: 'Selenium (WebDriver)', labelEn: 'Selenium (WebDriver)', duration: 71000, color: '#ef4444', badge: { tr: '🌐 Her komut bir HTTP isteği', en: '🌐 Every command is an HTTP request' } },
        ],
      },
      {
        type: 'table',
        headers: ['Kriter', 'Cypress', 'Selenium', 'Playwright'],
        rows: [
          ['Tipik CI süresi (50 test)', '🟢 Hızlı (in-process)', '🔴 Yavaş (WebDriver overhead)', '🟢 Hızlı (CDP)'],
          ['Paralelleştirme', 'Cypress Cloud (kurulumu kolay, ücretli kotalar)', 'Selenium Grid (ücretsiz, kurulumu zahmetli)', 'Built-in workers (ücretsiz, kolay)'],
          ['Flaky test oranı', '🟢 Düşük (retry-ability)', '🟡 Orta (manuel wait disiplinine bağlı)', '🟢 Düşük (auto-wait)'],
          ['Safari/WebKit desteği', '❌ Desteklenmez', '✅ Desteklenir', '✅ WebKit ile desteklenir'],
        ],
      },
      {
        type: 'tip',
        content: { tr: 'Hands-on mini proje: jsonplaceholder.typicode.com gibi public bir API\'ye karşı cy.intercept() ile sahte ürün listesi dönen, kupon uygulayan ve "sipariş onaylandı" mesajını doğrulayan uçtan uca bir checkout testi yaz — gerçek bir backend\'e ihtiyacın olmadan tüm akışı pratik edebilirsin.', en: 'Hands-on mini project: write an end-to-end checkout test against a public API like jsonplaceholder.typicode.com, using cy.intercept() to return a fake product list, applying a coupon, and asserting the "order confirmed" message — you can practice the whole flow without needing a real backend.' },
      },
      cypressCiRealWorldFilm,
      {
        type: 'quiz',
        question: { tr: 'Gerçek bir e-ticaret checkout test paketinde, her testte UI üzerinden tekrar giriş yapmak yerine "App Actions" pattern\'i ne yapar?', en: 'In a real e-commerce checkout test suite, instead of logging in through the UI in every test, what does the "App Actions" pattern do?' },
        options: [
          { id: 'a', text: { tr: 'Testleri paralel çalıştırır', en: 'Runs tests in parallel' } },
          { id: 'b', text: { tr: 'Session\'ı API üzerinden önceden kurar, testleri birbirinden bağımsız ve hızlı yapar', en: 'Sets up the session via the API ahead of time, making tests independent and fast' } },
          { id: 'c', text: { tr: 'Tarayıcı önbelleğini temizler', en: 'Clears the browser cache' } },
          { id: 'd', text: { tr: 'Sadece mobil görünümde test çalıştırır', en: 'Only runs tests in mobile viewport' } },
        ],
        correct: 'b',
        explanation: { tr: 'UI üzerinden her testte giriş yapmak yavaştır ve testleri birbirine bağımlı kılar (login akışındaki bir bug tüm suite\'i çökertir). App Actions pattern\'i, session\'ı doğrudan API/uygulama state\'i üzerinden kurar — Selenium\'da bir test setup metodunda REST API ile token alıp cookie\'yi doğrudan enjekte etmenin eşdeğeridir.', en: 'Logging in through the UI in every test is slow and makes tests dependent on each other (a bug in the login flow breaks the whole suite). The App Actions pattern sets up the session directly via the API/app state — the equivalent of a Selenium test setup method that fetches a token via a REST API and injects the cookie directly.' },
        retryQuestion: {
          question: { tr: '"App Actions" pattern\'i, uygulamanın kendi Redux/Zustand store\'una doğrudan dispatch yaparak state hazırlamayı önerir. Bu yaklaşımın Selenium dünyasında neden nadir olduğu söylenir?', en: 'The "App Actions" pattern sets up state by dispatching directly into the app\'s own Redux/Zustand store. Why is this kind of approach considered rare in the Selenium world?' },
          options: [
            { id: 'a', text: { tr: 'Selenium Redux\'ı desteklemez', en: 'Selenium does not support Redux' } },
            { id: 'b', text: { tr: 'WebDriver, tarayıcının JavaScript context\'ine Cypress kadar doğrudan erişemez', en: "WebDriver cannot reach into the browser's JavaScript context as directly as Cypress can" } },
            { id: 'c', text: { tr: 'Redux store\'lar sadece mobil uygulamalarda bulunur', en: 'Redux stores only exist in mobile apps' } },
            { id: 'd', text: { tr: 'Java dispatch syntax\'ını desteklemez', en: 'Java does not support dispatch syntax' } },
          ],
          correct: 'b',
          explanation: { tr: 'Cypress, testleri tarayıcının kendi process\'i içinde çalıştırdığı için `cy.window()` ile uygulamanın JS state\'ine (Redux/Zustand store\'u dahil) doğrudan erişebilir. Selenium ise WebDriver protokolü üzerinden "uzaktan" komut gönderir — tarayıcı sürecinin dışındadır, bu yüzden uygulamanın iç JS state\'ine bu derece doğrudan erişimi yoktur.', en: "Cypress runs tests inside the browser's own process, so `cy.window()` can reach directly into the app's JS state (including the Redux/Zustand store). Selenium sends commands \"remotely\" via the WebDriver protocol — it lives outside the browser process, so it has no such direct access to the app's internal JS state." },
        },
      },
    ],
  },
  en: {
    title: '🌍 Real World',
    blocks: [
      {
        type: 'text',
        content: "Imagine testing the checkout flow of an e-commerce site: add a product to the cart, apply a coupon, pay, and see the order confirmation. A real Cypress test suite usually breaks this flow apart with custom commands and the \"App Actions\" pattern — instead of logging in through the UI in every test, you set up the session via the API ahead of time, which both saves time and makes tests independent of each other.",
      },
      {
        type: 'code', label: 'Custom Command + Checkout Test',
        language: 'javascript',
        code: `// cypress/support/commands.js
Cypress.Commands.add('loginByApi', (email, password) => {
  cy.request('POST', '/api/login', { email, password }).then((res) => {
    window.localStorage.setItem('authToken', res.body.token)
  })
})

// cypress/e2e/checkout.cy.js
describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.loginByApi('user@test.com', 'Secret123!')
    cy.visit('/cart')
  })

  it('completes checkout with a valid coupon', () => {
    cy.get('[data-cy=coupon-input]').type('SAVE10')
    cy.get('[data-cy=apply-coupon]').click()
    cy.get('[data-cy=total]').should('contain', '10% off')
    cy.get('[data-cy=pay-now]').click()
    cy.contains('Order Confirmed').should('be.visible')
  })
})`,
      },
      {
        type: 'callout', color: 'green', emoji: '🎯',
        title: { tr: 'App Actions Pattern:', en: 'App Actions Pattern:' },
        content: { tr: 'Page Object Model yerine, Cypress topluluğu giderek "App Actions" pattern\'ini önerir: UI\'da tıklayarak state hazırlamak yerine, uygulamanın kendi store\'una (Redux/Zustand) doğrudan dispatch yaparsın. Örnek: cy.window().its(\'store\').invoke(\'dispatch\', { type: \'cart/addItem\', payload: { id: 42 } }) — bu, sepete ürün eklemek için 5 UI adımını atlayıp testi saniyeler içinde hazırlar.', en: "Instead of the Page Object Model, the Cypress community increasingly recommends the \"App Actions\" pattern: instead of clicking through the UI to set up state, you dispatch directly into the app's own store (Redux/Zustand). Example: cy.window().its('store').invoke('dispatch', { type: 'cart/addItem', payload: { id: 42 } }) — this skips 5 UI steps to add an item to the cart and sets up the test in seconds." },
      },
      {
        type: 'animated-timeline',
        title: { tr: '50 Testlik Suite — Cypress vs Selenium Çalışma Süresi', en: '50-Test Suite — Cypress vs Selenium Run Time' },
        description: { tr: 'Aynı 50 E2E testi iki araçla çalıştırınca, Cypress\'in tarayıcı-içi mimarisi network round-trip olmadığı için genelde daha hızlı tamamlanır. Gerçek sayılar projeye göre değişir — burada tipik bir CI ölçümü görüyorsun.', en: "Running the same 50 E2E tests with both tools, Cypress's in-browser architecture usually finishes faster since there are no network round-trips. Real numbers vary by project — here is a typical CI measurement." },
        tracks: [
          { label: 'Cypress (in-process)', labelEn: 'Cypress (in-process)', duration: 38000, color: '#10b981', badge: { tr: '⚡ Network round-trip yok', en: '⚡ No network round-trips' } },
          { label: 'Selenium (WebDriver)', labelEn: 'Selenium (WebDriver)', duration: 71000, color: '#ef4444', badge: { tr: '🌐 Her komut bir HTTP isteği', en: '🌐 Every command is an HTTP request' } },
        ],
      },
      {
        type: 'table',
        headers: ['Criterion', 'Cypress', 'Selenium', 'Playwright'],
        rows: [
          ['Typical CI time (50 tests)', '🟢 Fast (in-process)', '🔴 Slow (WebDriver overhead)', '🟢 Fast (CDP)'],
          ['Parallelization', 'Cypress Cloud (easy setup, paid quotas)', 'Selenium Grid (free, tedious setup)', 'Built-in workers (free, easy)'],
          ['Flaky test rate', '🟢 Low (retry-ability)', '🟡 Medium (depends on manual wait discipline)', '🟢 Low (auto-wait)'],
          ['Safari/WebKit support', '❌ Not supported', '✅ Supported', '✅ Supported via WebKit'],
        ],
      },
      {
        type: 'tip',
        content: { tr: 'Hands-on mini proje: jsonplaceholder.typicode.com gibi public bir API\'ye karşı cy.intercept() ile sahte ürün listesi dönen, kupon uygulayan ve "sipariş onaylandı" mesajını doğrulayan uçtan uca bir checkout testi yaz — gerçek bir backend\'e ihtiyacın olmadan tüm akışı pratik edebilirsin.', en: 'Hands-on mini project: write an end-to-end checkout test against a public API like jsonplaceholder.typicode.com, using cy.intercept() to return a fake product list, applying a coupon, and asserting the "order confirmed" message — you can practice the whole flow without needing a real backend.' },
      },
      cypressCiRealWorldFilm,
      {
        type: 'quiz',
        question: { tr: 'Gerçek bir e-ticaret checkout test paketinde, her testte UI üzerinden tekrar giriş yapmak yerine "App Actions" pattern\'i ne yapar?', en: 'In a real e-commerce checkout test suite, instead of logging in through the UI in every test, what does the "App Actions" pattern do?' },
        options: [
          { id: 'a', text: { tr: 'Testleri paralel çalıştırır', en: 'Runs tests in parallel' } },
          { id: 'b', text: { tr: 'Session\'ı API üzerinden önceden kurar, testleri birbirinden bağımsız ve hızlı yapar', en: 'Sets up the session via the API ahead of time, making tests independent and fast' } },
          { id: 'c', text: { tr: 'Tarayıcı önbelleğini temizler', en: 'Clears the browser cache' } },
          { id: 'd', text: { tr: 'Sadece mobil görünümde test çalıştırır', en: 'Only runs tests in mobile viewport' } },
        ],
        correct: 'b',
        explanation: { tr: 'UI üzerinden her testte giriş yapmak yavaştır ve testleri birbirine bağımlı kılar (login akışındaki bir bug tüm suite\'i çökertir). App Actions pattern\'i, session\'ı doğrudan API/uygulama state\'i üzerinden kurar — Selenium\'da bir test setup metodunda REST API ile token alıp cookie\'yi doğrudan enjekte etmenin eşdeğeridir.', en: 'Logging in through the UI in every test is slow and makes tests dependent on each other (a bug in the login flow breaks the whole suite). The App Actions pattern sets up the session directly via the API/app state — the equivalent of a Selenium test setup method that fetches a token via a REST API and injects the cookie directly.' },
        retryQuestion: {
          question: { tr: '"App Actions" pattern\'i, uygulamanın kendi Redux/Zustand store\'una doğrudan dispatch yaparak state hazırlamayı önerir. Bu yaklaşımın Selenium dünyasında neden nadir olduğu söylenir?', en: 'The "App Actions" pattern sets up state by dispatching directly into the app\'s own Redux/Zustand store. Why is this kind of approach considered rare in the Selenium world?' },
          options: [
            { id: 'a', text: { tr: 'Selenium Redux\'ı desteklemez', en: 'Selenium does not support Redux' } },
            { id: 'b', text: { tr: 'WebDriver, tarayıcının JavaScript context\'ine Cypress kadar doğrudan erişemez', en: "WebDriver cannot reach into the browser's JavaScript context as directly as Cypress can" } },
            { id: 'c', text: { tr: 'Redux store\'lar sadece mobil uygulamalarda bulunur', en: 'Redux stores only exist in mobile apps' } },
            { id: 'd', text: { tr: 'Java dispatch syntax\'ını desteklemez', en: 'Java does not support dispatch syntax' } },
          ],
          correct: 'b',
          explanation: { tr: 'Cypress, testleri tarayıcının kendi process\'i içinde çalıştırdığı için `cy.window()` ile uygulamanın JS state\'ine (Redux/Zustand store\'u dahil) doğrudan erişebilir. Selenium ise WebDriver protokolü üzerinden "uzaktan" komut gönderir — tarayıcı sürecinin dışındadır, bu yüzden uygulamanın iç JS state\'ine bu derece doğrudan erişimi yoktur.', en: "Cypress runs tests inside the browser's own process, so `cy.window()` can reach directly into the app's JS state (including the Redux/Zustand store). Selenium sends commands \"remotely\" via the WebDriver protocol — it lives outside the browser process, so it has no such direct access to the app's internal JS state." },
        },
      },
    ],
  },
}

const cypressEcosystemFilm = {
  type: 'video-scene',
  id: 'cypress-ecosystem-film',
  title: { tr: '🎬 Ekosistem Canlı: cypress-axe Bir Sayfayı Nasıl Tarar?', en: '🎬 The Ecosystem in Action: How cypress-axe Scans a Page' },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'page', emoji: '🧾', label: { tr: '/checkout Sayfası', en: '/checkout Page' }, color: '#0ea5e9' },
    { id: 'axeCore', emoji: '♿', label: { tr: 'axe-core Enjekte Edildi', en: 'axe-core Injected' }, color: '#8b5cf6' },
    { id: 'scanEngine', emoji: '🔬', label: { tr: 'WCAG Tarama Motoru', en: 'WCAG Scan Engine' }, color: '#f59e0b' },
    { id: 'cleanReport', emoji: '✅', label: { tr: 'İhlal Yok — Test Geçti', en: 'No Violations — Test Passes' }, color: '#22c55e' },
    { id: 'violationGhost', emoji: '👻', label: { tr: 'Kontrast İhlali Bulundu', en: 'Contrast Violation Found' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Ekosistemin gerçek gücü, tek satırlık bir eklentinin bütün bir kalite kategorisini (erişilebilirlik) otomatikleştirmesindedir. Bu filmde cypress-axe\'in bir sayfayı NASIL taradığını izleyeceksin.',
        en: "The real power of the ecosystem is a single-line plugin automating an entire quality category (accessibility). In this film you will watch HOW cypress-axe scans a page.",
      },
      code: { tr: `cy.visit('/checkout')
cy.injectAxe()
cy.checkA11y()`, en: `cy.visit('/checkout')
cy.injectAxe()
cy.checkA11y()` },
      positions: { page: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — cy.injectAxe(), Deque\'in axe-core kütüphanesini çalışan sayfaya bir <script> gibi enjekte eder. Bu, sayfanın kendi koduna hiçbir değişiklik yapmadan gerçekleşir.',
        en: "Step 1 — cy.injectAxe() injects Deque's axe-core library into the running page like a <script>. This happens without any change to the page's own code.",
      },
      positions: {
        page: { x: 16, y: 40, scale: 0.95 },
        axeCore: { x: 44, y: 40, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'page', to: 'axeCore' }],
    },
    {
      caption: {
        tr: 'Adım 2 — cy.checkA11y() çağrıldığında axe-core, sayfanın TÜM DOM ağacını tarar: renk kontrastı, eksik alt-text, yanlış ARIA rolü, klavye ile erişilemeyen elementler gibi onlarca WCAG kuralını kontrol eder.',
        en: 'Step 2 — when cy.checkA11y() is called, axe-core scans the ENTIRE DOM tree of the page: it checks dozens of WCAG rules like color contrast, missing alt-text, incorrect ARIA roles, and keyboard-unreachable elements.',
      },
      positions: {
        axeCore: { x: 24, y: 40, opacity: 0.6, scale: 0.9 },
        scanEngine: { x: 52, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'axeCore', to: 'scanEngine', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — hiçbir ihlal bulunmazsa test yeşil geçer; bu, "checkout sayfası ekran okuyucuyla ve klavyeyle kullanılabilir" iddiasının otomatik bir kanıtıdır — insan tarafından manuel kontrol edilmesi gerekmez.',
        en: 'Step 3 — if no violations are found, the test passes green; this is automatic proof of the claim "the checkout page is usable with a screen reader and keyboard" — no manual human check required.',
      },
      positions: {
        scanEngine: { x: 30, y: 40, opacity: 0.6, scale: 0.9 },
        cleanReport: { x: 58, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'scanEngine', to: 'cleanReport', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast (hayalet) sahnesi — bir tasarımcı "Ödeme Yap" butonunun rengini açık griye çevirdiğinde: axe-core bunu bir renk kontrastı İHLALİ olarak yakalar ve test kırmızı olur — hangi elementin, hangi kuralı, ne kadar ihlal ettiğini gösteren detaylı bir rapor üretir. Bu, insan gözünün PR review\'de kolayca kaçırdığı bir regresyonu CI\'da otomatik yakalamaktır.',
        en: 'Contrast (ghost) scene — when a designer changes the "Pay Now" button to a light gray: axe-core catches this as a color contrast VIOLATION and the test turns red — producing a detailed report of which element violated which rule and by how much. This is CI automatically catching a regression the human eye would easily miss in a PR review.',
      },
      positions: {
        cleanReport: { x: 30, y: 40, opacity: 0.55, scale: 0.85 },
        violationGhost: { x: 64, y: 40, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'cleanReport', to: 'violationGhost', color: '#ef4444' }],
    },
  ],
}

const s7 = {
  tr: {
    title: '🔗 Ekosistem / Ecosystem',
    blocks: [
      {
        type: 'text',
        content: 'Cypress\'in çekirdeği küçük tutulur, ama etrafında zengin bir resmi ve topluluk eklenti ekosistemi vardır: bulutta kayıt/paralelleştirme için Cypress Cloud, erişilebilirlik için cypress-axe, daha anlamlı selector\'lar için Testing Library, görsel regresyon için Percy/Applitools ve CI raporlama için mochawesome.',
      },
      {
        type: 'visual', variant: 'boxes', title: 'Cypress Ekosistem Haritası',
        items: [
          { icon: '☁️', label: 'Cypress Cloud', desc: 'Kayıt, paralel çalıştırma, flaky analytics', highlight: true },
          { icon: '🐙', label: 'GitHub Actions', desc: 'cypress-io/github-action ile resmi CI' },
          { icon: '♿', label: 'cypress-axe', desc: 'Otomatik erişilebilirlik denetimi' },
          { icon: '🔍', label: 'Testing Library', desc: '@testing-library/cypress — erişilebilir query\'ler' },
          { icon: '📸', label: 'Percy / Applitools', desc: 'Görsel regresyon testi entegrasyonu' },
          { icon: '🖱️', label: 'cypress-real-events', desc: 'Gerçek OS seviyesi mouse/touch event\'leri' },
          { icon: '🐳', label: 'cypress/included (Docker)', desc: 'Hazır image ile CI\'da sıfır kurulum' },
          { icon: '📊', label: 'mochawesome', desc: 'HTML/JSON test raporu üretimi' },
        ],
      },
      {
        type: 'table',
        headers: ['Araç', 'İlişki', 'Ne Zaman Kullanılır'],
        rows: [
          ['Cypress Cloud', "Cypress'in resmi SaaS platformu", 'Paralel çalıştırma + geçmiş test analytics istediğinde'],
          ['cypress-axe', "axe-core'un Cypress sarmalayıcısı", "WCAG uyumluluğu CI'da otomatik kontrol edilsin istediğinde"],
          ['@testing-library/cypress', "Testing Library query'lerini cy'ye ekler", 'data-cy yerine erişilebilir role/label sorguları tercih edildiğinde'],
          ['Percy / Applitools', 'Ekran görüntüsü tabanlı görsel diff', 'CSS/layout regresyonlarını yakalamak istediğinde'],
          ['mochawesome', 'Mocha reporter eklentisi', "Jenkins/GitLab'da okunabilir HTML rapor gerektiğinde"],
        ],
      },
      {
        type: 'code', label: 'cypress-axe ile Erişilebilirlik Testi',
        language: 'javascript',
        code: `import 'cypress-axe'

it('has no detectable accessibility violations', () => {
  cy.visit('/checkout')
  cy.injectAxe()
  cy.checkA11y()
})`,
      },
      cypressEcosystemFilm,
      {
        type: 'quiz',
        question: { tr: 'cypress-axe eklentisi ne için kullanılır?', en: 'What is the cypress-axe plugin used for?' },
        options: [
          { id: 'a', text: 'Performans metriklerini ölçmek için' },
          { id: 'b', text: 'Otomatik erişilebilirlik (a11y/WCAG) ihlallerini tarayıp raporlamak için' },
          { id: 'c', text: 'Network isteklerini yakalamak için' },
          { id: 'd', text: 'Visual regression testleri için' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cypress-axe, Deque\'in axe-core motorunu Cypress\'e entegre eder; cy.injectAxe() + cy.checkA11y() ile sayfadaki renk kontrastı, eksik alt-text, yanlış ARIA rolü gibi erişilebilirlik ihlallerini otomatik tarar ve test sonucunda raporlar.',
          en: "cypress-axe integrates Deque's axe-core engine into Cypress; cy.injectAxe() + cy.checkA11y() automatically scan the page for accessibility violations like color contrast, missing alt-text, or incorrect ARIA roles and report them as part of the test result.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress içerisinde cy.checkA11y() komutu temel olarak neyi amaçlar?",
            "en": "What is the primary purpose of the cy.checkA11y() command in Cypress?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sayfa yüklenme hızını analiz etmek",
                        "en": "Analyzing page load speed"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Sayfanın WCAG standartlarına uygunluğunu kontrol etmek",
                        "en": "Checking page compliance with WCAG standards"
                  }
            },
            {
                  "id": "c",
                  "text": "API uç noktalarından dönen verileri doğrulamak",
                  "en": "Verifying data from API endpoints"
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sayfa içeriğinin görsel değişikliklerini tespit etmek",
                        "en": "Detecting visual changes in page content"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cy.checkA11y(), sayfadaki DOM yapısını tarayarak WCAG (Web Content Accessibility Guidelines) yönergelerine aykırı durumları (örneğin eksik aria-label veya kontrast sorunları) bulmak için kullanılır.",
            "en": "cy.checkA11y() is used to scan the DOM structure of a page to identify violations of WCAG (Web Content Accessibility Guidelines) such as missing aria-labels or contrast issues."
      }
}
},
    ],
  },
  en: {
    title: '🔗 Ecosystem',
    blocks: [
      {
        type: 'text',
        content: "Cypress keeps its core small, but it has a rich official and community plugin ecosystem around it: Cypress Cloud for cloud recording/parallelization, cypress-axe for accessibility, Testing Library for more meaningful selectors, Percy/Applitools for visual regression, and mochawesome for CI reporting.",
      },
      {
        type: 'visual', variant: 'boxes', title: 'Cypress Ecosystem Map',
        items: [
          { icon: '☁️', label: 'Cypress Cloud', desc: 'Recording, parallelization, flaky analytics', highlight: true },
          { icon: '🐙', label: 'GitHub Actions', desc: 'Official CI via cypress-io/github-action' },
          { icon: '♿', label: 'cypress-axe', desc: 'Automated accessibility audits' },
          { icon: '🔍', label: 'Testing Library', desc: '@testing-library/cypress — accessible queries' },
          { icon: '📸', label: 'Percy / Applitools', desc: 'Visual regression testing integration' },
          { icon: '🖱️', label: 'cypress-real-events', desc: 'Real OS-level mouse/touch events' },
          { icon: '🐳', label: 'cypress/included (Docker)', desc: 'Zero-setup CI with the official image' },
          { icon: '📊', label: 'mochawesome', desc: 'HTML/JSON test report generation' },
        ],
      },
      {
        type: 'table',
        headers: ['Tool', 'Relationship', 'When to Use It'],
        rows: [
          ['Cypress Cloud', "Cypress's official SaaS platform", 'When you want parallel runs + historical test analytics'],
          ['cypress-axe', "Cypress wrapper around axe-core", 'When you want WCAG compliance checked automatically in CI'],
          ['@testing-library/cypress', "Adds Testing Library queries to cy", 'When you prefer accessible role/label queries over data-cy'],
          ['Percy / Applitools', 'Screenshot-based visual diffing', 'When you want to catch CSS/layout regressions'],
          ['mochawesome', 'Mocha reporter plugin', 'When you need a readable HTML report in Jenkins/GitLab'],
        ],
      },
      {
        type: 'code', label: 'Accessibility Testing with cypress-axe',
        language: 'javascript',
        code: `import 'cypress-axe'

it('has no detectable accessibility violations', () => {
  cy.visit('/checkout')
  cy.injectAxe()
  cy.checkA11y()
})`,
      },
      cypressEcosystemFilm,
      {
        type: 'quiz',
        question: { tr: 'cypress-axe eklentisi ne için kullanılır?', en: 'What is the cypress-axe plugin used for?' },
        options: [
          { id: 'a', text: 'To measure performance metrics' },
          { id: 'b', text: 'To automatically scan and report accessibility (a11y/WCAG) violations' },
          { id: 'c', text: 'To capture network requests' },
          { id: 'd', text: 'For visual regression tests' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cypress-axe, Deque\'in axe-core motorunu Cypress\'e entegre eder; cy.injectAxe() + cy.checkA11y() ile sayfadaki renk kontrastı, eksik alt-text, yanlış ARIA rolü gibi erişilebilirlik ihlallerini otomatik tarar ve test sonucunda raporlar.',
          en: "cypress-axe integrates Deque's axe-core engine into Cypress; cy.injectAxe() + cy.checkA11y() automatically scan the page for accessibility violations like color contrast, missing alt-text, or incorrect ARIA roles and report them as part of the test result.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress içerisinde cy.checkA11y() komutu temel olarak neyi amaçlar?",
            "en": "What is the primary purpose of the cy.checkA11y() command in Cypress?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Analyzing page load speed"
            },
            {
                  "id": "b",
                  "text": "Checking page compliance with WCAG standards"
            },
            {
                  "id": "c",
                  "text": "Verifying data from API endpoints"
            },
            {
                  "id": "d",
                  "text": "Detecting visual changes in page content"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cy.checkA11y(), sayfadaki DOM yapısını tarayarak WCAG (Web Content Accessibility Guidelines) yönergelerine aykırı durumları (örneğin eksik aria-label veya kontrast sorunları) bulmak için kullanılır.",
            "en": "cy.checkA11y() is used to scan the DOM structure of a page to identify violations of WCAG (Web Content Accessibility Guidelines) such as missing aria-labels or contrast issues."
      }
}
},
    ],
  },
}

const cypressArchitectureShowdownFilm = {
  type: 'video-scene',
  id: 'cypress-architecture-showdown-film',
  title: { tr: '🎬 Aynı Assertion, Üç Farklı Yol: Selenium vs Cypress vs Playwright', en: '🎬 Same Assertion, Three Different Paths: Selenium vs Cypress vs Playwright' },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'task', emoji: '🎯', label: { tr: '"Sepet sayacı 3 olmalı"', en: '"Cart counter must be 3"' }, color: '#0ea5e9' },
    { id: 'selenium', emoji: '☕', label: { tr: 'Selenium (WebDriver HTTP)', en: 'Selenium (WebDriver HTTP)' }, color: '#f59e0b' },
    { id: 'cypress', emoji: '🌲', label: { tr: 'Cypress (in-process)', en: 'Cypress (in-process)' }, color: '#22c55e' },
    { id: 'playwright', emoji: '🎭', label: { tr: 'Playwright (CDP/WebSocket)', en: 'Playwright (CDP/WebSocket)' }, color: '#8b5cf6' },
    { id: 'board', emoji: '📊', label: { tr: 'Üçü de PASS — ama aynı değil', en: 'All three PASS — but not the same' }, color: '#10b981' },
    { id: 'safariGhost', emoji: '👻', label: { tr: 'Safari Gereksinimi — Cypress Elenir', en: 'Safari Requirement — Cypress Is Out' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Tek bir görev: "sepet sayacı 3 olana kadar bekle ve doğrula". Üç araç da bu görevi yapabilir — ama HANGİ yoldan geçtikleri tamamen farklıdır. Bu filmde aynı anda üç yolu izleyeceksin.',
        en: 'One task: "wait until the cart counter is 3 and verify it". All three tools can do this — but WHICH path they take is completely different. In this film you will watch all three paths at once.',
      },
      code: { tr: `// Aynı hedef, üç sözdizimi
driver / cy / page — hepsi "3" olana kadar bekleyip doğrular`, en: `// Same goal, three syntaxes
driver / cy / page — all wait for "3" and verify` },
      positions: { task: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Yol 1 — Selenium: WebDriverWait, HER kontrol denemesinde ChromeDriver\'a bir HTTP isteği gönderir. Ayrı bir process, ayrı bir protokol — güvenilir ama her "3 mü oldu?" sorusu bir ağ round-trip\'i demektir.',
        en: "Path 1 — Selenium: WebDriverWait sends an HTTP request to ChromeDriver on EVERY check attempt. A separate process, a separate protocol — reliable, but every \"is it 3 yet?\" question means a network round-trip.",
      },
      code: { tr: `wait.until(ExpectedConditions.textToBePresentInElement(
  driver.findElement(By.id("cart-count")), "3"));`, en: `wait.until(ExpectedConditions.textToBePresentInElement(
  driver.findElement(By.id("cart-count")), "3"));` },
      positions: {
        task: { x: 14, y: 30, scale: 0.9 },
        selenium: { x: 40, y: 30, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'task', to: 'selenium', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Yol 2 — Cypress: cy.get().should() tarayıcının İÇİNDE çalışır, hiçbir ağ isteği yoktur. Aynı "3 mü oldu?" kontrolü, JavaScript motorunun kendi belleğinde milisaniyeler içinde tekrar tekrar çalışır.',
        en: 'Path 2 — Cypress: cy.get().should() runs INSIDE the browser, there is no network request at all. The same "is it 3 yet?" check reruns within the JavaScript engine\'s own memory, in milliseconds.',
      },
      code: { tr: `cy.get('[data-cy=cart-count]').should('have.text', '3')`, en: `cy.get('[data-cy=cart-count]').should('have.text', '3')` },
      positions: {
        task: { x: 14, y: 50, scale: 0.9 },
        cypress: { x: 40, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'task', to: 'cypress', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Yol 3 — Playwright: expect(locator).toHaveText() Chrome DevTools Protokolü (CDP) üzerinden KALICI bir WebSocket bağlantısı kullanır. HTTP round-trip\'i yoktur ama Selenium gibi ayrı bir process\'ten yönetilir — bu yüzden çoklu sekme/dil desteği Cypress\'te olmayan bir esneklik sağlar.',
        en: "Path 3 — Playwright: expect(locator).toHaveText() uses a PERSISTENT WebSocket connection over the Chrome DevTools Protocol (CDP). No HTTP round-trip, but it is still managed from a separate process like Selenium — which is why it offers multi-tab/multi-language flexibility that Cypress does not have.",
      },
      code: { tr: `await expect(page.locator('[data-cy=cart-count]')).toHaveText('3')`, en: `await expect(page.locator('[data-cy=cart-count]')).toHaveText('3')` },
      positions: {
        task: { x: 14, y: 70, scale: 0.9 },
        playwright: { x: 40, y: 70, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'task', to: 'playwright', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Sonuç tahtası: her üçü de doğru koşullarda PASS eder. Ama maliyet modeli farklıdır — Selenium: her komut bir ağ isteği. Cypress: sıfır ağ isteği ama JS/TS ile sınırlı, tek sekme. Playwright: kalıcı bağlantı + çoklu dil + çoklu sekme.',
        en: 'The results board: all three PASS under the right conditions. But the cost model differs — Selenium: every command is a network request. Cypress: zero network requests but limited to JS/TS, single tab. Playwright: persistent connection + multi-language + multi-tab.',
      },
      positions: {
        selenium: { x: 20, y: 30, scale: 0.85, opacity: 0.6 },
        cypress: { x: 20, y: 50, scale: 0.85, opacity: 0.6 },
        playwright: { x: 20, y: 70, scale: 0.85, opacity: 0.6 },
        board: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'selenium', to: 'board' }, { from: 'cypress', to: 'board', color: '#22c55e' }, { from: 'playwright', to: 'board', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Kontrast (hayalet) sahnesi — proje Safari/WebKit\'te ZORUNLU test istiyorsa: Cypress yolu bu görevi asla tamamlayamaz, Chromium/Firefox/Electron ile sınırlıdır. Bu durumda karar mimari zarafetten değil, tek bir zorunlu kısıttan (tarayıcı desteği) geçer — Selenium ya da Playwright seçilmelidir.',
        en: "Contrast (ghost) scene — if the project REQUIRES testing on Safari/WebKit: the Cypress path can never complete this task, it is limited to Chromium/Firefox/Electron. In this case the decision is not about architectural elegance but a single hard constraint (browser support) — Selenium or Playwright must be chosen.",
      },
      positions: {
        cypress: { x: 24, y: 50, opacity: 0.55, scale: 0.85 },
        safariGhost: { x: 58, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'cypress', to: 'safariGhost', color: '#ef4444' }],
    },
  ],
}

const cypressArchitectureDecisionStep = {
  type: 'step-animation',
  id: 'cypress-architecture-decision-step-01',
  title: { tr: 'Adım Adım: Doğru Aracı Seçme Refleksi', en: 'Step by Step: The Right-Tool-Selection Reflex' },
  steps: [
    { id: 1, icon: '👥', label: { tr: 'Ekip hangi dili yazıyor?', en: 'What language does the team write?' }, detail: { tr: 'Ekip sadece JS/TS biliyorsa Cypress bir seçenektir; Java/Python/C# yazıyorsa Selenium veya Playwright (çoklu dil desteği) gerekir.', en: 'If the team only knows JS/TS, Cypress is an option; if they write Java/Python/C#, Selenium or Playwright (multi-language support) is required.' } },
    { id: 2, icon: '🧭', label: { tr: 'Hangi tarayıcılar zorunlu?', en: 'Which browsers are mandatory?' }, detail: { tr: 'Safari/WebKit zorunluysa Cypress otomatik elenir — bu tek başına kararı belirleyebilecek sert bir kısıttır.', en: 'If Safari/WebKit is mandatory, Cypress is automatically eliminated — this alone can be a hard constraint that decides the outcome.' } },
    { id: 3, icon: '🪟', label: { tr: 'Çoklu sekme/pencere gerekiyor mu?', en: 'Do you need multiple tabs/windows?' }, detail: { tr: 'OAuth popup\'ları, yeni sekmede açılan linkler gibi senaryolar kritikse, tek sekmeli Cypress yerine Selenium/Playwright tercih edilir.', en: 'If scenarios like OAuth popups or links opening in new tabs are critical, Selenium/Playwright are preferred over single-tab Cypress.' } },
    { id: 4, icon: '🧩', label: { tr: 'Component testing isteniyor mu?', en: 'Is component testing desired?' }, detail: { tr: 'Cypress\'in built-in Component Testing modu, test piramidinin orta katmanına da hizmet eden nadir bir özelliktir.', en: "Cypress's built-in Component Testing mode is a rare feature that also serves the middle layer of the test pyramid." } },
    { id: 5, icon: '⚖️', label: { tr: 'Kararı ver — gerekirse hibrit', en: 'Make the call — hybrid if needed' }, detail: { tr: 'Gerçekçi bir strateji genelde "ikisi bir arada"dır: yeni SPA özellikleri Cypress\'le, Safari zorunlu kritik regresyon Selenium/Playwright\'te kalır.', en: 'A realistic strategy is often "both at once": new SPA features in Cypress, Safari-critical regression staying in Selenium/Playwright.' } },
  ],
}

// Elle yazılan sandbox (s8'de 'code' tipi blok yok, otomatik trio üretilmez) —
// CLAUDE.md §9.4: relatedTopicId zorunlu.
const cypressArchitectureShowdownPractice = {
  type: 'code-playground',
  id: 'cypress-architecture-showdown-practice-1',
  relatedTopicId: 'cypress-vs-selenium-playwright',
  label: { tr: 'Kendin Yaz ve Dene: Aynı Assertion\'ı Üç Sözdizimiyle Tanı', en: 'Write It Yourself: Recognize the Same Assertion in Three Syntaxes' },
  language: 'javascript',
  task: {
    tr: 'Cypress sözdizimiyle, sepet sayacının "3" metnine sahip olmasını retry-able şekilde bekleyen satırı tamamla — filmde gördüğün "Yol 2"nin aynısı.',
    en: 'In Cypress syntax, complete the line that retry-ably waits for the cart counter to have the text "3" — the exact same "Path 2" you saw in the film.',
  },
  explanation: {
    tr: 'TODO satırını, [data-cy=cart-count] elementinin metninin "3" olmasını bekleyen bir should() zinciriyle tamamla.',
    en: 'Complete the TODO line with a should() chain that waits for the [data-cy=cart-count] element\'s text to be "3".',
  },
  code: {
    tr: `cy.get('[data-cy=cart-count]').should('have.text', '3')`,
    en: `cy.get('[data-cy=cart-count]').should('have.text', '3')`,
  },
  starterCode: {
    tr: `// TODO: [data-cy=cart-count] elementinin metninin '3' olmasını retry-able şekilde bekle`,
    en: `// TODO: retry-ably wait for [data-cy=cart-count] text to be '3'`,
  },
  solutionCode: {
    tr: `cy.get('[data-cy=cart-count]').should('have.text', '3')`,
    en: `cy.get('[data-cy=cart-count]').should('have.text', '3')`,
  },
  expected: {
    tr: 'Çözüm eşleşti. Bu tek satır, Selenium\'daki WebDriverWait + ExpectedConditions\'ın ve Playwright\'taki await expect(...).toHaveText()\'in yaptığı işi, Cypress\'in "in-process" mimarisi sayesinde tek zincire sığdırır.',
    en: "Your solution matches. This single line fits into one chain what Selenium's WebDriverWait + ExpectedConditions and Playwright's await expect(...).toHaveText() do, thanks to Cypress's \"in-process\" architecture.",
  },
  hints: [
    { tr: 'should() retry-able bir assertion\'dır — .then() içine assertion koyma, o sadece bir kerelik çalışır.', en: 'should() is a retry-able assertion — do not put assertions inside .then(), it only runs once.' },
    { tr: '\'have.text\' TAM metin eşleşmesi ister; sadece içerdiğini kontrol etmek istersen \'contain.text\' kullan.', en: "'have.text' requires an EXACT text match; use 'contain.text' if you only want to check it contains the value." },
  ],
  xpReward: 10,
}

const s8 = {
  tr: {
    title: '🆚 Cypress vs Selenium vs Playwright',
    blocks: [
      {
        type: 'text',
        content: 'Üç aracı seçerken karar tek bir özelliğe değil, projenin gerçek ihtiyaçlarına dayanmalı: dil ekibi ne yazıyor, hangi tarayıcılar zorunlu, çoklu sekme senaryoları var mı, component testing isteniyor mu? Aşağıdaki tablo, bu kararı somut kriterlerle karşılaştırır.',
      },
      {
        type: 'table',
        headers: ['Kriter', 'Cypress', 'Selenium', 'Playwright'],
        rows: [
          ['Mimari', 'Tarayıcı içinde (in-process)', 'WebDriver protokolü (uzaktan)', 'CDP / WebSocket (uzaktan)'],
          ['Dil desteği', 'Sadece JavaScript / TypeScript', 'Java, Python, C#, JS, Ruby, Kotlin', 'TS, JS, Python, Java, C#'],
          ['Tarayıcı desteği', 'Chromium, Firefox, Electron', 'Chrome, Firefox, Safari, Edge', 'Chromium, Firefox, WebKit'],
          ['Çoklu sekme/pencere', '❌ Tek sekme sınırı', '✅ Native destek', '✅ Native destek'],
          ['Otomatik bekleme', '✅ Retry-ability (built-in)', '❌ Manuel wait yazılır', '✅ Auto-wait (built-in)'],
          ['Network mock', '✅ cy.intercept() built-in', '❌ Ek araç (proxy) gerekir', '✅ page.route() built-in'],
          ['Component testing', '✅ Built-in', '❌ Yok', '🟡 Deneysel destek'],
          ['Time-travel debug', '✅ Her komutta snapshot', '❌ Yok', '🟡 Trace Viewer ile benzer'],
          ['Native mobil test', '❌ (Appium gerekir)', '✅ Appium ile birlikte', '❌ (Appium gerekir)'],
          ['Paralel çalıştırma', 'Cypress Cloud (ücretli kota)', 'Selenium Grid (ücretsiz, kurulum zor)', 'Built-in workers (ücretsiz)'],
        ],
      },
      {
        type: 'visual', variant: 'pyramid', title: 'Test Piramidi İçinde Cypress\'in Yeri',
        levels: [
          { label: { tr: 'E2E Testler (az, yavaş, pahalı)', en: 'E2E Tests (few, slow, expensive)' }, desc: { tr: 'Cypress E2E, Selenium, Playwright', en: 'Cypress E2E, Selenium, Playwright' }, color: 'red' },
          { label: { tr: 'Component / Integration Testler', en: 'Component / Integration Tests' }, desc: { tr: 'Cypress Component Testing, React Testing Library', en: 'Cypress Component Testing, React Testing Library' }, color: 'yellow' },
          { label: { tr: 'Unit Testler (çok, hızlı, ucuz)', en: 'Unit Tests (many, fast, cheap)' }, desc: { tr: 'Jest, Vitest, JUnit', en: 'Jest, Vitest, JUnit' }, color: 'green' },
        ],
        note: { tr: 'Cypress\'in tek yapabildiği "uçtan uca" değil — Component Testing modu sayesinde piramidin orta katmanına da hizmet edebilen nadir araçlardan biridir.', en: "Cypress isn't limited to just \"end-to-end\" — thanks to Component Testing mode, it's one of the rare tools that can also serve the pyramid's middle layer." },
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '✅', label: 'Cypress Seç', desc: 'Modern bir SPA (React/Vue/Angular) test ediyorsun, ekip JS/TS biliyor, hızlı geri bildirim ve görsel debugging önemli, component testing de istiyorsun.' },
          { icon: '❌', label: 'Cypress Seçme', desc: 'Safari/WebKit desteği şart, çoklu sekme/pencere senaryoları kritik, ekip Java/Python/C# yazıyor, native mobil test gerekiyor (bunun için Appium gerekir).' },
        ],
      },
      cypressArchitectureShowdownFilm,
      cypressArchitectureDecisionStep,
      cypressArchitectureShowdownPractice,
      {
        type: 'quiz',
        question: { tr: 'Projende mutlaka Safari/WebKit\'te test çalıştırman gerekiyorsa hangi araç uygun DEĞİLDİR?', en: 'If your project absolutely must run tests on Safari/WebKit, which tool is NOT suitable?' },
        options: [
          { id: 'a', text: 'Selenium' },
          { id: 'b', text: 'Cypress' },
          { id: 'c', text: 'Playwright' },
          { id: 'd', text: 'Hepsi de Safari\'yi destekler' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Cypress, WebKit (Safari\'nin motoru) desteklemez — sadece Chromium ailesi, Firefox ve Electron\'da çalışır. Safari testi gerekiyorsa Selenium (SafariDriver ile) veya Playwright (WebKit desteğiyle) tercih edilmelidir.',
          en: "Cypress does not support WebKit (Safari's engine) — it only runs on the Chromium family, Firefox, and Electron. If Safari testing is required, you should choose Selenium (with SafariDriver) or Playwright (with WebKit support).",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki test otomasyon araçlarından hangisi Apple'ın WebKit motorunu doğrudan desteklememektedir?",
            "en": "Which of the following test automation tools does NOT provide direct support for Apple's WebKit engine?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Playwright",
                        "en": "Playwright"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Selenium WebDriver",
                        "en": "Selenium WebDriver"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Cypress",
                        "en": "Cypress"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Hiçbiri, hepsi WebKit desteği sunar",
                        "en": "None, all of them provide WebKit support"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Cypress sadece Chromium, Firefox ve Electron üzerinde test çalıştırmayı destekler. WebKit üzerinde test yapmak için genellikle Playwright veya Selenium (SafariDriver aracılığıyla) tercih edilmelidir.",
            "en": "Cypress only supports running tests on Chromium, Firefox, and Electron. For testing on WebKit, Playwright or Selenium (via SafariDriver) should generally be preferred."
      }
}
},
    ],
  },
  en: {
    title: '🆚 Cypress vs Selenium vs Playwright',
    blocks: [
      {
        type: 'text',
        content: "Choosing between the three tools should not hinge on a single feature, but on the project's real needs: what language does the team write, which browsers are mandatory, are there multi-tab scenarios, is component testing desired? The table below compares this decision with concrete criteria.",
      },
      {
        type: 'table',
        headers: ['Criterion', 'Cypress', 'Selenium', 'Playwright'],
        rows: [
          ['Architecture', 'Inside the browser (in-process)', 'WebDriver protocol (remote)', 'CDP / WebSocket (remote)'],
          ['Language support', 'JavaScript / TypeScript only', 'Java, Python, C#, JS, Ruby, Kotlin', 'TS, JS, Python, Java, C#'],
          ['Browser support', 'Chromium, Firefox, Electron', 'Chrome, Firefox, Safari, Edge', 'Chromium, Firefox, WebKit'],
          ['Multiple tabs/windows', '❌ Single-tab limitation', '✅ Native support', '✅ Native support'],
          ['Auto-waiting', '✅ Retry-ability (built-in)', '❌ Manual waits required', '✅ Auto-wait (built-in)'],
          ['Network mocking', '✅ cy.intercept() built-in', '❌ Needs extra tooling (proxy)', '✅ page.route() built-in'],
          ['Component testing', '✅ Built-in', '❌ None', '🟡 Experimental support'],
          ['Time-travel debugging', '✅ Snapshot per command', '❌ None', '🟡 Similar via Trace Viewer'],
          ['Native mobile testing', '❌ (needs Appium)', '✅ Works with Appium', '❌ (needs Appium)'],
          ['Parallelization', 'Cypress Cloud (paid quota)', 'Selenium Grid (free, tedious setup)', 'Built-in workers (free)'],
        ],
      },
      {
        type: 'visual', variant: 'pyramid', title: "Where Cypress Fits in the Test Pyramid",
        levels: [
          { label: { tr: 'E2E Testler (az, yavaş, pahalı)', en: 'E2E Tests (few, slow, expensive)' }, desc: { tr: 'Cypress E2E, Selenium, Playwright', en: 'Cypress E2E, Selenium, Playwright' }, color: 'red' },
          { label: { tr: 'Component / Integration Testler', en: 'Component / Integration Tests' }, desc: { tr: 'Cypress Component Testing, React Testing Library', en: 'Cypress Component Testing, React Testing Library' }, color: 'yellow' },
          { label: { tr: 'Unit Testler (çok, hızlı, ucuz)', en: 'Unit Tests (many, fast, cheap)' }, desc: { tr: 'Jest, Vitest, JUnit', en: 'Jest, Vitest, JUnit' }, color: 'green' },
        ],
        note: { tr: 'Cypress\'in tek yapabildiği "uçtan uca" değil — Component Testing modu sayesinde piramidin orta katmanına da hizmet edebilen nadir araçlardan biridir.', en: "Cypress isn't limited to just \"end-to-end\" — thanks to Component Testing mode, it's one of the rare tools that can also serve the pyramid's middle layer." },
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '✅', label: 'Choose Cypress', desc: "You're testing a modern SPA (React/Vue/Angular), the team knows JS/TS, fast feedback and visual debugging matter, and you also want component testing." },
          { icon: '❌', label: "Don't Choose Cypress", desc: 'Safari/WebKit support is required, multi-tab/window scenarios are critical, the team writes Java/Python/C#, or native mobile testing is needed (which requires Appium).' },
        ],
      },
      cypressArchitectureShowdownFilm,
      cypressArchitectureDecisionStep,
      cypressArchitectureShowdownPractice,
      {
        type: 'quiz',
        question: { tr: 'Projende mutlaka Safari/WebKit\'te test çalıştırman gerekiyorsa hangi araç uygun DEĞİLDİR?', en: 'If your project absolutely must run tests on Safari/WebKit, which tool is NOT suitable?' },
        options: [
          { id: 'a', text: 'Selenium' },
          { id: 'b', text: 'Cypress' },
          { id: 'c', text: 'Playwright' },
          { id: 'd', text: 'All of them support Safari' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Cypress, WebKit (Safari\'nin motoru) desteklemez — sadece Chromium ailesi, Firefox ve Electron\'da çalışır. Safari testi gerekiyorsa Selenium (SafariDriver ile) veya Playwright (WebKit desteğiyle) tercih edilmelidir.',
          en: "Cypress does not support WebKit (Safari's engine) — it only runs on the Chromium family, Firefox, and Electron. If Safari testing is required, you should choose Selenium (with SafariDriver) or Playwright (with WebKit support).",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Test otomasyonu süreçlerinde Apple'ın Safari tarayıcısını (WebKit motoru) yerel olarak desteklemeyen test aracı hangisidir?",
            "en": "Which test automation tool does NOT natively support Apple's Safari browser (WebKit engine)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Playwright"
            },
            {
                  "id": "b",
                  "text": "Cypress"
            },
            {
                  "id": "c",
                  "text": "Selenium"
            },
            {
                  "id": "d",
                  "text": "Puppeteer"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Cypress, WebKit motorunu doğrudan desteklemez. Playwright WebKit desteği sunar, Selenium ise SafariDriver ile bu tarayıcıyı kontrol edebilir. Puppeteer da Chromium odaklıdır ancak Cypress kadar yaygın bir Safari kısıtlaması ile bilinir; ancak soru bağlamında Cypress, bu özellik eksikliğiyle öne çıkan bir araçtır.",
            "en": "Cypress does not support the WebKit engine. Playwright provides built-in WebKit support, and Selenium can control Safari via SafariDriver. Puppeteer is primarily focused on Chromium, and Cypress is well-known for its lack of WebKit support compared to modern alternatives."
      }
}
},
    ],
  },
}

// 🚨 Yaygın Hatalar — fixture mutation kirliliği film + step-animation + code-playground
const cypressFixtureMutationFilm = {
  type: 'video-scene',
  id: 'cypress-fixture-mutation-film',
  title: {
    tr: '🎬 "PASS" Diyen Ama Aslında Kirli Veriyle Çalışan Test',
    en: '🎬 The Test That "PASSes" But Is Secretly Running on Dirty Data',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'fixture', emoji: '📄', label: { tr: 'user.json (fixture)', en: 'user.json (fixture)' }, color: '#0ea5e9' },
    { id: 'test1', emoji: '1️⃣', label: { tr: 'Test 1: profil günceller', en: 'Test 1: updates profile' }, color: '#8b5cf6' },
    { id: 'test2', emoji: '2️⃣', label: { tr: 'Test 2: yeni kullanıcı bekler', en: 'Test 2: expects a fresh user' }, color: '#8b5cf6' },
    { id: 'ghost', emoji: '👻', label: { tr: 'used: true (sızmış!)', en: 'used: true (leaked!)' }, color: '#ef4444' },
    { id: 'fixed', emoji: '✅', label: { tr: '{ ...data } (klon)', en: '{ ...data } (clone)' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'İki bağımsız test AYNI cy.fixture(\'user.json\') dosyasını okuyor. "Bağımsız" derken emin misin? Bu filmde ikisinin gerçekten izole olup olmadığını izleyeceğiz.',
        en: 'Two independent tests both read the same cy.fixture(\'user.json\') file. Sure they\'re "independent"? This film watches whether they really are isolated.',
      },
      positions: { fixture: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Test 1 çalışır: cy.fixture(\'user.json\') JSON\'ı parse eder ve JavaScript\'te REFERANS tipi bir obje döner — bu, dosyanın kopyası değil, aynı objeye işaret eden bir handle\'dır.',
        en: 'Step 1 — Test 1 runs: cy.fixture(\'user.json\') parses the JSON and returns a REFERENCE-type object in JavaScript — not a copy of the file, but a handle pointing at the same object.',
      },
      code: { tr: `cy.fixture('user.json').then((data) => {\n  data.used = true   // objeyi DOĞRUDAN mutate ediyor\n})`, en: `cy.fixture('user.json').then((data) => {\n  data.used = true   // mutates the object DIRECTLY\n})` },
      positions: {
        fixture: { x: 20, y: 50, scale: 1.1 },
        test1: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'fixture', to: 'test1', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Test 1, data.used = true yazarak objeyi mutate eder ve testi PASS eder. Ama Cypress bu fixture\'ı testler arasında CACHE\'ler — aynı obje referansı hafızada kalmaya devam eder.',
        en: 'Step 2 — Test 1 mutates the object with data.used = true and PASSes. But Cypress CACHES this fixture across tests — the same object reference stays alive in memory.',
      },
      positions: {
        test1: { x: 22, y: 40, scale: 0.95 },
        ghost: { x: 55, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'test1', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 3 (tuzak) — Test 2 başlar ve "temiz bir kullanıcı" bekleyerek AYNI cy.fixture(\'user.json\')\'ı çağırır. Ama cache\'den dönen obje, Test 1\'in mutate ettiği AYNI referans — used: true hâlâ orada!',
        en: 'Step 3 (the trap) — Test 2 starts, expecting a "fresh user", and calls the SAME cy.fixture(\'user.json\'). But the object returned from cache is the EXACT SAME reference Test 1 mutated — used: true is still there!',
      },
      code: { tr: `// Test 2\ncy.fixture('user.json').then((data) => {\n  expect(data.used).to.be.undefined  // BEKLENEN\n  // GERÇEK: data.used === true — Test 1'den sızdı!\n})`, en: `// Test 2\ncy.fixture('user.json').then((data) => {\n  expect(data.used).to.be.undefined  // EXPECTED\n  // ACTUAL: data.used === true — leaked from Test 1!\n})` },
      positions: {
        ghost: { x: 30, y: 50, scale: 1.2 },
        test2: { x: 65, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'ghost', to: 'test2', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 4 (düzeltme) — çözüm, objeyi kullanmadan ÖNCE klonlamaktır: { ...data }. Artık her test kendi bağımsız kopyasını mutate eder, orijinal fixture objesi hiç değişmez.',
        en: 'Step 4 (the fix) — the solution is cloning the object BEFORE use: { ...data }. Now every test mutates its own independent copy, and the original fixture object never changes.',
      },
      code: { tr: `cy.fixture('user.json').then((data) => {\n  const myUser = { ...data }   // taze kopya\n  myUser.used = true            // sadece BU testin kopyası kirlenir\n})`, en: `cy.fixture('user.json').then((data) => {\n  const myUser = { ...data }   // fresh copy\n  myUser.used = true            // only THIS test's copy gets dirty\n})` },
      positions: {
        test2: { x: 22, y: 40, opacity: 0.5, scale: 0.85 },
        fixed: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'test2', to: 'fixed', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da bir @BeforeEach içinde her testten önce TAZE bir test fixture nesnesi oluşturmak aynı prensiptir: paylaşılan mutable bir static nesne, testler arasında sessizce sızan bir hataya dönüşür. Cypress\'te test isolation cookie/localStorage\'ı temizler ama fixture referansını KLONLAMAZ — bu senin sorumluluğundadır.',
        en: 'The lesson — in Java, creating a FRESH test fixture object before every test inside @BeforeEach follows the same principle: a shared mutable static object turns into a bug that silently leaks between tests. Cypress\'s test isolation clears cookies/localStorage, but it does NOT clone the fixture reference for you — that\'s your responsibility.',
      },
      positions: {
        fixed: { x: 35, y: 50, scale: 1.1 },
        fixture: { x: 62, y: 50, scale: 1.0, opacity: 0.6 },
      },
    },
  ],
}

const cypressWaitAntiPatternStep = {
  type: 'step-animation',
  title: { tr: 'cy.wait(sayı) mı, cy.wait(\'@alias\') mı?', en: 'cy.wait(number) or cy.wait(\'@alias\')?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'cy.wait(3000) yazılır…', en: 'cy.wait(3000) is written…' }, detail: { tr: 'cy.wait(3000) yazılır — "3 saniye yeter" varsayımıyla sabit bir süre beklenir.', en: 'cy.wait(3000) is written — a fixed duration, assuming "3 seconds will be enough".' } },
    { id: 2, icon: '2️⃣', label: { tr: 'CI makinesi o gün yavaşsa 3 saniye YETMEZ…', en: 'If the CI machine is slow that day…' }, detail: { tr: 'CI makinesi o gün yavaşsa 3 saniye YETMEZ — istek hâlâ dönmemiştir, test flaky FAIL olur.', en: 'If the CI machine is slow that day, 3 seconds is NOT enough — the request hasn\'t returned yet, the test flaky-FAILs.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'Yerel makinede ise 3 saniye ÇOK FAZLADIR…', en: 'On a local machine…' }, detail: { tr: 'Yerel makinede ise 3 saniye ÇOK FAZLADIR — istek 200ms\'de bitmiştir ama test yine de bekler, süre boşa gider.', en: 'On a local machine, 3 seconds is TOO MUCH — the request finishes in 200ms, but the test waits anyway, wasting time.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'Çözüm: cy.intercept(...).as(\'getData\')…', en: 'The fix…' }, detail: { tr: 'Çözüm: cy.intercept(...).as(\'getData\') ile isteği adlandır, sonra cy.wait(\'@getData\') yaz.', en: 'The fix: name the request with cy.intercept(...).as(\'getData\'), then write cy.wait(\'@getData\').' } },
    { id: 5, icon: '5️⃣', label: { tr: 'cy.wait(\'@getData\') artık SÜRE değil KOŞUL…', en: 'cy.wait(\'@getData\') now waits for a CONDITION…' }, detail: { tr: 'cy.wait(\'@getData\') artık SÜRE değil KOŞUL bekler — istek gerçekten tamamlanana kadar, ne 200ms ne 3000ms sabit bir sayı değil.', en: 'cy.wait(\'@getData\') now waits for a CONDITION, not a DURATION — until the request truly completes, never a fixed number like 200ms or 3000ms.' } },
  ],
}

const cypressFixtureCloneP = {
  type: 'code-playground',
  relatedTopicId: 'cypress-errors',
  id: 'cypress-errors',
  title: { tr: 'Kendin Dene: Fixture Mutation Hatasını Düzelt', en: 'Try It Yourself: Fix the Fixture Mutation Bug' },
  starterCode: `cy.fixture('user.json').then((data) => {
  // BUG: data objesi doğrudan mutate ediliyor, sıradaki testi kirletiyor
  data.lastLogin = new Date().toISOString()
  cy.wrap(data).as('currentUser')
})`,
  solutionCode: `cy.fixture('user.json').then((data) => {
  // FIX: kullanmadan önce klonla, orijinal fixture objesi hiç değişmez
  const currentUser = { ...data }
  currentUser.lastLogin = new Date().toISOString()
  cy.wrap(currentUser).as('currentUser')
})`,
  hint: { tr: 'Object spread (`{ ...data }`) ile data\'nın bir kopyasını oluştur, mutasyonu KOPYA üzerinde yap — orijinal fixture referansına dokunma.', en: 'Create a copy of data with object spread (`{ ...data }`), mutate the COPY — never touch the original fixture reference.' },
  successMessage: { tr: 'Doğru! Artık her test kendi bağımsız kopyasıyla çalışıyor, fixture kirliliği imkansız.', en: 'Correct! Every test now works with its own independent copy — fixture pollution is impossible.' },
}

const s9 = {
  tr: {
    title: '🚨 Yaygın Hatalar / Common Errors',
    blocks: [
      {
        type: 'error-dictionary',
          relatedTopicId: 'cypress-errors',
        framework: 'Cypress',
        errors: [
          {
            error: 'cy.get() timed out',
            fullMessage: "Timed out retrying after 4000ms: Expected to find element: '[data-cy=submit]', but never found it.",
            cause: 'Selector yanlış yazılmış ya da element o anda DOM\'da henüz render edilmemiş — genelde uygulama hâlâ veri yüklerken test elementin oluşmasını "bekliyor" gibi görünür ama 4 saniyelik varsayılan timeout dolar.',
            solution: 'Selector\'ü tarayıcı DevTools\'unda doğrula. Eğer element gerçekten geç geliyorsa (yavaş API), cy.intercept() + cy.wait(\'@alias\') ile veri yüklenene kadar bekle, sonra elementi ara.',
            codeWrong: "cy.visit('/products')\ncy.get('[data-cy=submit]').click() // veri henüz gelmemiş olabilir",
            codeFixed: "cy.intercept('GET', '/api/products').as('getProducts')\ncy.visit('/products')\ncy.wait('@getProducts')\ncy.get('[data-cy=submit]').click()",
          },
          {
            error: 'Cypress detected a cross origin error',
            fullMessage: 'Cypress detected a cross origin error happened on page load. A cross origin error happens when your application navigates to a different superdomain.',
            cause: 'Uygulama, OAuth/SSO sağlayıcısı gibi farklı bir üst alan adına (superdomain) yönlendiriyor; Cypress varsayılan olarak tek bir origin\'i kontrol eder.',
            solution: 'Farklı origin\'deki komutları cy.origin(\'https://auth-provider.com\', () => { ... }) içine sar — bu, v9.6+ ile gelen resmi çözümdür.',
            codeWrong: "cy.get('#sso-button').click() // auth0.com'a yönlendirir\ncy.get('#username').type('user') // çöker: farklı origin",
            codeFixed: "cy.get('#sso-button').click()\ncy.origin('https://auth0.com', () => {\n  cy.get('#username').type('user')\n})",
          },
          {
            error: 'Cypress could not verify that this server is running',
            cause: 'cypress.config.js\'teki baseUrl yanlış ya da test başladığında local dev server henüz ayağa kalkmamış.',
            solution: 'baseUrl\'i doğrula; CI\'da start-server-and-test paketi ile sunucunun gerçekten hazır olduğundan emin olduktan sonra cypress run komutunu çalıştır.',
          },
          {
            error: "cy.fixture() failed: fixture file not found",
            fullMessage: "CypressError: cy.fixture() failed looking for a fixture file. We could not find a fixture file with the path: products.json",
            cause: 'Dosya cypress/fixtures/ klasöründe yok ya da uzantı/yol yanlış yazılmış.',
            solution: 'Dosya yolunu ve uzantısını kontrol et; gerekirse cypress.config.js\'teki fixturesFolder ayarını doğrula.',
          },
          {
            error: "cy.wait() timed out waiting for a request",
            fullMessage: "Timed out retrying after 5000ms: cy.wait() timed out waiting for the 1st request to the route: 'getProducts'. No request ever occurred.",
            cause: 'cy.wait(\'@alias\') çağrıldı ama o alias\'a karşılık gelen network isteği hiç atılmadı — genelde intercept\'in URL pattern\'i gerçek isteğe uymuyor ya da intercept, cy.visit()\'ten SONRA tanımlandığı için isteği kaçırdı.',
            solution: 'cy.intercept() her zaman cy.visit()\'ten ÖNCE tanımlanmalı. URL pattern\'i tarayıcı Network sekmesindeki gerçek istekle karşılaştır.',
          },
          {
            error: 'Uncaught error from application code fails the test',
            fullMessage: "The following error originated from your application code, not from Cypress. Uncaught TypeError: Cannot read properties of undefined (reading 'track')",
            cause: 'Uygulamadaki (ya da üçüncü parti bir analytics/widget script\'indeki) yakalanmamış bir JavaScript hatası, Cypress tarafından otomatik olarak test başarısızlığına çevrilir.',
            solution: 'Eğer hata gerçekten zararsız ve bilinen bir 3. parti script sorunuysa, Cypress.on(\'uncaught:exception\', ...) ile bilinçli olarak filtrele — ama her hatayı körü körüne yutma, gerçek bug\'ları kaçırabilirsin.',
            codeFixed: "Cypress.on('uncaught:exception', (err) => {\n  if (err.message.includes('analytics-widget')) return false\n  return true // diğer her şeyi normal şekilde fail ettir\n})",
          },
          {
            error: 'cy.click() failed because the page updated while this command was executing',
            cause: 'React/Vue gibi framework\'ler re-render sırasında elementi DOM\'dan kaldırıp yenisini ekler (Selenium\'daki StaleElementReferenceException\'ın Cypress karşılığı).',
            solution: 'Genelde retry-ability bunu otomatik çözer; eğer çözmüyorsa, elementi bir değişkende saklayıp tekrar kullanmak yerine her zaman taze bir cy.get() çağrısı yap.',
          },
          {
            error: 'ResizeObserver loop limit exceeded',
            cause: 'Bazı UI kütüphaneleri (chart, data-grid) ResizeObserver kullanır; bu zararsız tarayıcı uyarısı bazen Cypress tarafından uncaught exception olarak yakalanıp testi fail ettirir.',
            solution: 'Cypress.on(\'uncaught:exception\') içinde "ResizeObserver loop limit exceeded" mesajını filtrele — bu hata gerçek bir bug değildir.',
          },
          {
            error: 'Tests pass individually but fail when run together',
            cause: 'Cypress v12+\'ta "test isolation" varsayılan olarak açıktır: her testten önce cookie/localStorage/sessionStorage otomatik temizlenir. Eğer bir test, önceki testin bıraktığı login/state\'e güveniyorsa bu testler birlikte çalıştırıldığında kırılır.',
            solution: 'Her testin kendi setup\'ını (beforeEach içinde login/veri hazırlığı) yapması gerekir — testler arasında gizli bağımlılık kurma. testIsolation: false sadece bilinçli legacy senaryolarda kullanılmalıdır.',
          },
          {
            error: 'Fixture data mutation causes flaky tests',
            cause: 'cy.fixture() ile alınan obje JavaScript\'te referans olarak paylaşılır; bir testte bu objeyi mutate edersen (örn. data.used = true), sıradaki testi etkileyen "kirli" veri kalır.',
            solution: 'Fixture verisini değiştirmeden önce her zaman klonla: cy.fixture(\'user.json\').then((data) => cy.wrap({ ...data } )).',
          },
        ],
      },
      cypressFixtureMutationFilm,
      cypressWaitAntiPatternStep,
      cypressFixtureCloneP,
      {
        type: 'quiz',
        question: { tr: 'Bir testte cy.fixture() ile alınan obje mutate edilip sonraki testte "kirli" veri kalmasına ne sebep olur?', en: 'What causes a "dirty" data leak into the next test when an object returned by cy.fixture() is mutated?' },
        options: [
          { id: 'a', text: { tr: 'cy.fixture() her testte aynı dosyayı yeniden okur', en: 'cy.fixture() re-reads the same file every test' } },
          { id: 'b', text: { tr: 'Fixture objesi JavaScript\'te referans olarak paylaşılır, mutate edilince tüm referanslar değişir', en: 'The fixture object is shared by reference in JavaScript, so mutating it changes all references' } },
          { id: 'c', text: { tr: 'testIsolation: false ayarı varsayılan olarak açıktır', en: 'testIsolation: false is on by default' } },
          { id: 'd', text: { tr: 'Cypress fixture\'ları cache\'lemez', en: 'Cypress does not cache fixtures' } },
        ],
        correct: 'b',
        explanation: { tr: 'cy.fixture() bir JSON\'ı parse edip referans tipi bir obje döndürür. Bir testte bu objeyi mutate edersen (örn. data.used = true), JavaScript\'in referans semantiği nedeniyle aynı objeye bakan sıradaki test de değişikliği görür — Java\'da bir static/shared mutable nesneyi testler arası paylaşmanın yarattığı klasik flaky test sorunuyla aynı kök neden.', en: 'cy.fixture() parses a JSON file and returns a reference-type object. If you mutate it in one test (e.g. data.used = true), JavaScript\'s reference semantics mean the next test looking at the same object sees the change too — the same root cause as the classic flaky-test problem in Java when a static/shared mutable object is reused across tests.' },
        retryQuestion: {
          question: { tr: 'Bu fixture mutation sorununu kalıcı olarak önlemek için en güvenli pratik nedir?', en: 'What is the safest practice to permanently prevent this fixture mutation problem?' },
          options: [
            { id: 'a', text: { tr: 'cy.fixture()\'ı sadece ilk testte çağırmak', en: 'Calling cy.fixture() only in the first test' } },
            { id: 'b', text: { tr: 'Her testte fixture verisinin bir kopyasını oluşturmak (örn. { ...data })', en: 'Creating a copy of the fixture data in every test (e.g. { ...data })' } },
            { id: 'c', text: { tr: 'testIsolation: false ayarını açmak', en: 'Turning on testIsolation: false' } },
            { id: 'd', text: { tr: 'Fixture dosyasını her testten önce silmek', en: 'Deleting the fixture file before each test' } },
          ],
          correct: 'b',
          explanation: { tr: 'Fixture verisini kullanmadan önce klonlamak (`{ ...data }` veya `structuredClone(data)`) her testin kendi bağımsız kopyasıyla çalışmasını garanti eder — orijinal fixture objesi hiç mutate edilmez, bu yüzden sıradaki test her zaman temiz veriyle başlar. Java\'da bir test fixture\'ını her testte yeniden oluşturmak (`@BeforeEach`) ile aynı prensiptir.', en: 'Cloning the fixture data before use (`{ ...data }` or `structuredClone(data)`) guarantees each test works with its own independent copy — the original fixture object is never mutated, so the next test always starts with clean data. Same principle as recreating a test fixture fresh in every test (`@BeforeEach`) in Java.' },
        },
      },
    ],
  },
  en: {
    title: '🚨 Common Errors',
    blocks: [
      {
        type: 'error-dictionary',
          relatedTopicId: 'cypress-errors',
        framework: 'Cypress',
        errors: [
          {
            error: 'cy.get() timed out',
            fullMessage: "Timed out retrying after 4000ms: Expected to find element: '[data-cy=submit]', but never found it.",
            cause: "The selector is wrong, or the element hasn't been rendered into the DOM yet — usually the app is still loading data, the element appears to be \"waited for\" but the default 4-second timeout expires first.",
            solution: 'Verify the selector in browser DevTools. If the element genuinely arrives late (slow API), use cy.intercept() + cy.wait(\'@alias\') to wait for the data first, then search for the element.',
            codeWrong: "cy.visit('/products')\ncy.get('[data-cy=submit]').click() // data may not have arrived yet",
            codeFixed: "cy.intercept('GET', '/api/products').as('getProducts')\ncy.visit('/products')\ncy.wait('@getProducts')\ncy.get('[data-cy=submit]').click()",
          },
          {
            error: 'Cypress detected a cross origin error',
            fullMessage: 'Cypress detected a cross origin error happened on page load. A cross origin error happens when your application navigates to a different superdomain.',
            cause: 'The app redirects to a different superdomain, such as an OAuth/SSO provider; Cypress controls only one origin at a time by default.',
            solution: "Wrap commands on the other origin in cy.origin('https://auth-provider.com', () => { ... }) — this is the official solution introduced in v9.6+.",
            codeWrong: "cy.get('#sso-button').click() // redirects to auth0.com\ncy.get('#username').type('user') // crashes: different origin",
            codeFixed: "cy.get('#sso-button').click()\ncy.origin('https://auth0.com', () => {\n  cy.get('#username').type('user')\n})",
          },
          {
            error: 'Cypress could not verify that this server is running',
            cause: "The baseUrl in cypress.config.js is wrong, or the local dev server hadn't started yet when the test began.",
            solution: 'Verify baseUrl; in CI, use the start-server-and-test package to make sure the server is genuinely ready before running cypress run.',
          },
          {
            error: 'cy.fixture() failed: fixture file not found',
            fullMessage: "CypressError: cy.fixture() failed looking for a fixture file. We could not find a fixture file with the path: products.json",
            cause: "The file doesn't exist in cypress/fixtures/, or the extension/path is wrong.",
            solution: "Check the file path and extension; verify the fixturesFolder setting in cypress.config.js if needed.",
          },
          {
            error: 'cy.wait() timed out waiting for a request',
            fullMessage: "Timed out retrying after 5000ms: cy.wait() timed out waiting for the 1st request to the route: 'getProducts'. No request ever occurred.",
            cause: "cy.wait('@alias') was called but the matching network request never fired — usually the intercept's URL pattern doesn't match the real request, or the intercept was defined AFTER cy.visit() and missed the request.",
            solution: 'Always define cy.intercept() BEFORE cy.visit(). Compare the URL pattern against the real request in the browser Network tab.',
          },
          {
            error: 'Uncaught error from application code fails the test',
            fullMessage: "The following error originated from your application code, not from Cypress. Uncaught TypeError: Cannot read properties of undefined (reading 'track')",
            cause: 'An uncaught JavaScript error in the application (or a third-party analytics/widget script) is automatically turned into a test failure by Cypress.',
            solution: "If the error is genuinely harmless and a known third-party script issue, deliberately filter it with Cypress.on('uncaught:exception', ...) — but don't blindly swallow every error, you might hide real bugs.",
            codeFixed: "Cypress.on('uncaught:exception', (err) => {\n  if (err.message.includes('analytics-widget')) return false\n  return true // let everything else fail normally\n})",
          },
          {
            error: 'cy.click() failed because the page updated while this command was executing',
            cause: "Frameworks like React/Vue remove and re-insert an element during a re-render (the Cypress equivalent of Selenium's StaleElementReferenceException).",
            solution: 'Retry-ability usually resolves this automatically; if not, always issue a fresh cy.get() call instead of storing and reusing an element reference.',
          },
          {
            error: 'ResizeObserver loop limit exceeded',
            cause: 'Some UI libraries (charts, data grids) use ResizeObserver; this harmless browser warning is sometimes caught by Cypress as an uncaught exception and fails the test.',
            solution: 'Filter the "ResizeObserver loop limit exceeded" message inside Cypress.on(\'uncaught:exception\') — this is not a real bug.',
          },
          {
            error: 'Tests pass individually but fail when run together',
            cause: '"Test isolation" is on by default since Cypress v12+: cookies/localStorage/sessionStorage are automatically cleared before every test. If a test relies on login/state left behind by a previous test, it breaks when run together.',
            solution: 'Every test should do its own setup (login/data prep inside beforeEach) — avoid hidden dependencies between tests. testIsolation: false should only be used in deliberate legacy scenarios.',
          },
          {
            error: 'Fixture data mutation causes flaky tests',
            cause: 'An object returned by cy.fixture() is shared by reference in JavaScript; if you mutate it in one test (e.g. data.used = true), the "dirty" data leaks into the next test.',
            solution: "Always clone fixture data before mutating it: cy.fixture('user.json').then((data) => cy.wrap({ ...data })).",
          },
        ],
      },
      cypressFixtureMutationFilm,
      cypressWaitAntiPatternStep,
      cypressFixtureCloneP,
      {
        type: 'quiz',
        question: { tr: 'Bir testte cy.fixture() ile alınan obje mutate edilip sonraki testte "kirli" veri kalmasına ne sebep olur?', en: 'What causes a "dirty" data leak into the next test when an object returned by cy.fixture() is mutated?' },
        options: [
          { id: 'a', text: { tr: 'cy.fixture() her testte aynı dosyayı yeniden okur', en: 'cy.fixture() re-reads the same file every test' } },
          { id: 'b', text: { tr: 'Fixture objesi JavaScript\'te referans olarak paylaşılır, mutate edilince tüm referanslar değişir', en: 'The fixture object is shared by reference in JavaScript, so mutating it changes all references' } },
          { id: 'c', text: { tr: 'testIsolation: false ayarı varsayılan olarak açıktır', en: 'testIsolation: false is on by default' } },
          { id: 'd', text: { tr: 'Cypress fixture\'ları cache\'lemez', en: 'Cypress does not cache fixtures' } },
        ],
        correct: 'b',
        explanation: { tr: 'cy.fixture() bir JSON\'ı parse edip referans tipi bir obje döndürür. Bir testte bu objeyi mutate edersen (örn. data.used = true), JavaScript\'in referans semantiği nedeniyle aynı objeye bakan sıradaki test de değişikliği görür — Java\'da bir static/shared mutable nesneyi testler arası paylaşmanın yarattığı klasik flaky test sorunuyla aynı kök neden.', en: 'cy.fixture() parses a JSON file and returns a reference-type object. If you mutate it in one test (e.g. data.used = true), JavaScript\'s reference semantics mean the next test looking at the same object sees the change too — the same root cause as the classic flaky-test problem in Java when a static/shared mutable object is reused across tests.' },
        retryQuestion: {
          question: { tr: 'Bu fixture mutation sorununu kalıcı olarak önlemek için en güvenli pratik nedir?', en: 'What is the safest practice to permanently prevent this fixture mutation problem?' },
          options: [
            { id: 'a', text: { tr: 'cy.fixture()\'ı sadece ilk testte çağırmak', en: 'Calling cy.fixture() only in the first test' } },
            { id: 'b', text: { tr: 'Her testte fixture verisinin bir kopyasını oluşturmak (örn. { ...data })', en: 'Creating a copy of the fixture data in every test (e.g. { ...data })' } },
            { id: 'c', text: { tr: 'testIsolation: false ayarını açmak', en: 'Turning on testIsolation: false' } },
            { id: 'd', text: { tr: 'Fixture dosyasını her testten önce silmek', en: 'Deleting the fixture file before each test' } },
          ],
          correct: 'b',
          explanation: { tr: 'Fixture verisini kullanmadan önce klonlamak (`{ ...data }` veya `structuredClone(data)`) her testin kendi bağımsız kopyasıyla çalışmasını garanti eder — orijinal fixture objesi hiç mutate edilmez, bu yüzden sıradaki test her zaman temiz veriyle başlar. Java\'da bir test fixture\'ını her testte yeniden oluşturmak (`@BeforeEach`) ile aynı prensiptir.', en: 'Cloning the fixture data before use (`{ ...data }` or `structuredClone(data)`) guarantees each test works with its own independent copy — the original fixture object is never mutated, so the next test always starts with clean data. Same principle as recreating a test fixture fresh in every test (`@BeforeEach`) in Java.' },
        },
      },
    ],
  },
}

// 💼 Mülakat — cy.request() ile UI'yı atlayan API-first login film + step-animation + code-playground
const cypressApiFirstLoginFilm = {
  type: 'video-scene',
  id: 'cypress-api-first-login-film',
  title: {
    tr: '🎬 cy.request(): 5 Adımlık UI Login\'i 1 HTTP Çağrısına İndirmek',
    en: '🎬 cy.request(): Collapsing a 5-Step UI Login into 1 HTTP Call',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test', emoji: '🧪', label: { tr: 'Test (dashboard\'ı doğrulayacak)', en: 'Test (needs to verify the dashboard)' }, color: '#8b5cf6' },
    { id: 'uiform', emoji: '🖱️', label: { tr: 'UI Login Formu (5 adım)', en: 'UI Login Form (5 steps)' }, color: '#94a3b8' },
    { id: 'api', emoji: '🔗', label: { tr: 'POST /api/login', en: 'POST /api/login' }, color: '#0ea5e9' },
    { id: 'token', emoji: '🔑', label: { tr: 'JWT Token', en: 'JWT Token' }, color: '#f59e0b' },
    { id: 'storage', emoji: '💾', label: { tr: 'localStorage', en: 'localStorage' }, color: '#22c55e' },
    { id: 'dashboard', emoji: '📊', label: { tr: 'Dashboard (asıl test hedefi)', en: 'Dashboard (the real test target)' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Asıl test hedefi "dashboard\'da doğru istatistikler görünüyor mu?" sorusu — login\'in KENDİSİ değil. Peki her testte 5 UI adımıyla login olmak gerçekten şart mı?',
        en: 'The real test goal is "do the correct stats show on the dashboard?" — not the login itself. So is logging in through 5 UI steps really necessary in every single test?',
      },
      positions: { test: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Yol 1 (yavaş) — Geleneksel yol: cy.visit(\'/login\') → username yaz → password yaz → submit\'e tıkla → yönlendirmeyi bekle. 5 adım, her biri gerçek bir tarayıcı render\'ı gerektirir.',
        en: 'Path 1 (slow) — The traditional way: cy.visit(\'/login\') → type username → type password → click submit → wait for redirect. 5 steps, each requiring a real browser render.',
      },
      code: { tr: `cy.visit('/login')\ncy.get('[data-cy=username]').type('qa_user')\ncy.get('[data-cy=password]').type('Secret123')\ncy.get('[data-cy=submit]').click()\ncy.url().should('include', '/dashboard')`, en: `cy.visit('/login')\ncy.get('[data-cy=username]').type('qa_user')\ncy.get('[data-cy=password]').type('Secret123')\ncy.get('[data-cy=submit]').click()\ncy.url().should('include', '/dashboard')` },
      positions: {
        test: { x: 20, y: 40, scale: 1.0 },
        uiform: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test', to: 'uiform', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Yol 2 (hızlı) — cy.request() tarayıcı UI\'sını HİÇ açmadan doğrudan bir HTTP isteği atar: POST /api/login. Sunucu aynı doğrulamayı yapar, ama hiçbir buton render edilmez, hiçbir input\'a tıklanmaz.',
        en: 'Path 2 (fast) — cy.request() fires an HTTP request directly, WITHOUT ever opening the browser UI: POST /api/login. The server does the exact same validation, but no button renders and no input gets clicked.',
      },
      code: { tr: `cy.request('POST', '/api/login', {\n  username: 'qa_user',\n  password: 'Secret123',\n})`, en: `cy.request('POST', '/api/login', {\n  username: 'qa_user',\n  password: 'Secret123',\n})` },
      positions: {
        uiform: { x: 18, y: 30, opacity: 0.35, scale: 0.8 },
        api: { x: 50, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test', to: 'api', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Sunucu yanıtı bir JWT token içerir — bu token, UI\'dan login olsan da API\'den login olsan da SUNUCU AÇISINDAN AYNI kimlik doğrulama sonucudur.',
        en: 'The server response includes a JWT token — from the SERVER\'S point of view, this is the exact same authentication result whether you logged in via the UI or via the API.',
      },
      code: { tr: `.its('body.token')  // → "eyJhbGciOiJIUzI1NiIs..."`, en: `.its('body.token')  // → "eyJhbGciOiJIUzI1NiIs..."` },
      positions: {
        api: { x: 22, y: 40, scale: 1.0 },
        token: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'api', to: 'token', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Token, window.localStorage.setItem(...) ile doğrudan tarayıcıya yazılır — dashboard sayfası bu token\'ı görünce kullanıcının login olduğunu SANIR (çünkü gerçekten öyledir).',
        en: 'The token is written directly into the browser with window.localStorage.setItem(...) — when the dashboard page sees this token, it BELIEVES the user is logged in (because they genuinely are).',
      },
      code: { tr: `window.localStorage.setItem('token', response.body.token)\ncy.visit('/dashboard')  // login formu HİÇ görünmedi`, en: `window.localStorage.setItem('token', response.body.token)\ncy.visit('/dashboard')  // the login form was NEVER seen` },
      positions: {
        token: { x: 20, y: 40, scale: 1.0 },
        storage: { x: 48, y: 55, scale: 1.15 },
        dashboard: { x: 76, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'token', to: 'storage', color: '#22c55e' }, { from: 'storage', to: 'dashboard', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Ders (kontrast) — bu kısayolu ne zaman KULLANMAMALISIN? Login akışının KENDİSİNİ test ediyorsan (yanlış şifre mesajı, "beni hatırla" checkbox\'ı) — o zaman UI adımlarını ATLAMAK asıl test edilmesi gerekeni gizler. cy.request() sadece login\'in bir ÖN KOŞUL olduğu testlerde (dashboard, sepet, profil) doğru kısayoldur.',
        en: 'The lesson (the contrast) — when should you NOT use this shortcut? If you\'re testing the login flow ITSELF (wrong-password message, "remember me" checkbox) — then skipping the UI steps hides the very thing you\'re supposed to test. cy.request() is the right shortcut only when login is a PRECONDITION (dashboard, cart, profile), not the test subject.',
      },
      positions: {
        dashboard: { x: 40, y: 50, scale: 1.1 },
        uiform: { x: 68, y: 50, scale: 1.0, opacity: 0.6 },
      },
    },
  ],
}

const cypressApiVsUiLoginStep = {
  type: 'step-animation',
  title: { tr: 'API-First Login: Ne Zaman Kullan, Ne Zaman Kullanma?', en: 'API-First Login: When to Use It, When Not To' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Test hedefi "dashboard\'daki veri doğru…', en: 'If the test target is "is the dashboard…' }, detail: { tr: 'Test hedefi "dashboard\'daki veri doğru mu?" ise — login sadece bir ÖN KOŞULDUR, cy.request() ile hızlandır.', en: 'If the test target is "is the dashboard data correct?" — login is just a PRECONDITION, speed it up with cy.request().' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Test hedefi "yanlış şifre girilince…', en: 'If the test target is "does the correct…' }, detail: { tr: 'Test hedefi "yanlış şifre girilince doğru hata mesajı çıkıyor mu?" ise — login akışının KENDİSİ test ediliyor, UI adımlarını ATLAMA.', en: 'If the test target is "does the correct error message appear on a wrong password?" — the login flow ITSELF is under test, do NOT skip the UI steps.' } },
    { id: 3, icon: '3️⃣', label: { tr: 'cy.request() kullanırken sunucunun…', en: 'When using cy.request()…' }, detail: { tr: 'cy.request() kullanırken sunucunun döndürdüğü token\'ı window.localStorage\'a yazman gerekir — tarayıcı bunu kendisi yapmaz.', en: 'When using cy.request(), you must write the token the server returns into window.localStorage yourself — the browser does not do this automatically.' } },
    { id: 4, icon: '4️⃣', label: { tr: 'cy.session() ile birleştirilirse…', en: 'Combined with cy.session()…' }, detail: { tr: 'cy.session() ile birleştirilirse, bu API login\'i testler arasında CACHE\'lenir — ikinci testte sıfırdan tekrarlanmaz.', en: 'Combined with cy.session(), this API login gets CACHED across tests — it is not repeated from scratch on the second test.' } },
  ],
}

const cypressApiLoginP = {
  type: 'code-playground',
  relatedTopicId: 'cypress',
  id: 'cypress-api-login-practice',
  title: { tr: 'Kendin Dene: UI Login\'i cy.request()\'e Çevir', en: 'Try It Yourself: Convert a UI Login to cy.request()' },
  starterCode: `// Bu test SADECE dashboard'daki veriyi kontrol ediyor, login akışını DEĞİL
cy.visit('/login')
cy.get('[data-cy=username]').type('qa_user')
cy.get('[data-cy=password]').type('Secret123')
cy.get('[data-cy=submit]').click()
cy.get('[data-cy=stats-total]').should('have.text', '42')`,
  solutionCode: `// login bir ön koşul olduğu için cy.request() ile hızlandırılır
cy.request('POST', '/api/login', { username: 'qa_user', password: 'Secret123' })
  .then((response) => {
    window.localStorage.setItem('token', response.body.token)
    cy.visit('/dashboard')
    cy.get('[data-cy=stats-total]').should('have.text', '42')
  })`,
  hint: { tr: 'cy.request() gerçek bir HTTP isteği atar ve response.body içinde token döner — bu token\'ı localStorage\'a yazıp doğrudan hedef sayfayı ziyaret edebilirsin.', en: 'cy.request() fires a real HTTP request and returns a token in response.body — write that token to localStorage and visit the target page directly.' },
  successMessage: { tr: 'Doğru! 5 UI adımı yerine 1 API çağrısı + localStorage yazımı — test artık çok daha hızlı ve login akışına bağımlı değil.', en: 'Correct! One API call + a localStorage write instead of 5 UI steps — the test is now much faster and no longer coupled to the login flow.' },
}

const s10 = {
  tr: {
    title: '💼 50 Mülakat Sorusu',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'Bir mülakatta Cypress bilgisi iki kademede ölçülür: önce "ne olduğunu" bilip bilmediğin, sonra "neden öyle tasarlandığını" açıklayıp açıklayamadığın. cy.intercept() nedir Basic\'tir; ama "production\'da bir servis %5 oranında 500 döndürüyor, bunu CI\'da stabil tutmak için nasıl bir strateji kurarsın?" Advanced\'tir — tıpkı Java\'da Mockito\'yu öğrenmek ile onu gerçek bir regression suite\'ine entegre etmenin farklı şeyler olması gibi. Peki bu iki seviye arasındaki mesafeyi geçmek için ne gerekiyor? Temeli eksik geçmek Advanced\'de birinci detaylı soruyla tökezlemeye neden olur; bu 50 soru o köprüyü adım adım kurar: Basic sorular temeli sağlamlaştırmak, Intermediate sorular gerçek iş senaryolarını (flaky test, race condition, test isolation çöküşü) çözmek, Advanced sorular ise CI pipeline tasarımı ve mimari tercihleri tartışmak için hazırlar.',
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'cypress',
        topic: 'Cypress',
        questions: [
          { level: 'basic', q: 'Cypress nedir ve Selenium\'dan en temel farkı nedir?', a: 'Cypress, JavaScript/TypeScript ile yazılan, test kodunu tarayıcının İÇİNDE çalıştıran açık kaynaklı bir uçtan uca test framework\'üdür. Selenium ise WebDriver protokolü üzerinden tarayıcıya "uzaktan" komut gönderir — bu yüzden Cypress daha hızlıdır ama sadece JavaScript/TypeScript ile yazılabilir, Java/Python/C# desteklemez. Java\'da Selenium kullanan bir ekip Cypress\'e geçtiğinde dil değişikliği en büyük adaptasyon noktasıdır.' },
          { level: 'basic', q: 'Cypress kurulumu nasıl yapılır?', a: 'npm install cypress --save-dev komutu Cypress\'i devDependency olarak kurar ve kendi tarayıcı binary\'sini indirir — Selenium\'daki gibi ayrı bir ChromeDriver/geckodriver indirme adımı yoktur. npx cypress open ilk çalıştırmada cypress/ klasör yapısını otomatik oluşturur ve Test Runner\'ı açar. Java\'da Maven\'a bağımlılık eklemeye benzer ama derleme adımı gerekmez.' },
          { level: 'basic', q: 'cypress.config.js dosyası neyi içerir?', a: 'cypress.config.js, v10 ile gelen ve eski cypress.json\'ın yerini alan merkezi konfigürasyon dosyasıdır — baseUrl, viewport, timeout değerleri, env değişkenleri ve setupNodeEvents (plugin sistemi) burada tanımlanır. Java\'da bunu Maven\'in pom.xml\'i gibi düşünebilirsin: framework\'ün nasıl davranacağını tanımlayan tek kaynak.' },
          { level: 'basic', q: 'cy.visit() ne işe yarar?', a: 'cy.visit(\'/login\') belirtilen URL\'ye tarayıcıyı yönlendirir ve sayfa yüklenene kadar otomatik bekler. baseUrl tanımlıysa sadece path yazman yeterlidir. Selenium\'daki driver.get("https://...") komutunun karşılığıdır, ama Cypress otomatik olarak sayfanın tam yüklenmesini bekler.' },
          { level: 'basic', q: 'Cypress\'te element bulmak için en iyi pratik selector stratejisi nedir?', a: 'En iyi pratik, sadece test amacıyla eklenen data-cy (ya da data-test, data-testid) attribute\'larını kullanmaktır — CSS class veya görünür metin değişse bile test kırılmaz. CSS class/id\'ye güvenmek, Selenium\'da olduğu gibi stil değişikliklerinde testi kırılgan yapar. cy.get(\'[data-cy=submit]\'), Selenium\'daki By.cssSelector ile aynı mantığı taşır.' },
          { level: 'basic', q: 'cy.contains() ne zaman kullanılır?', a: 'cy.contains(\'Add to Cart\') görünür metne göre element arar — selector bilinmediğinde ya da metin testin asıl odağıyken kullanışlıdır. İkinci parametreyle (cy.contains(\'.product-card\', \'Laptop\')) belirli bir konteyner içinde arama yapabilirsin. Selenium\'daki XPath text() yazmaktan çok daha kısadır, ama i18n projelerinde metin değişirse kırılır.' },
          { level: 'basic', q: 'Cypress\'te command chaining ve .then() nasıl çalışır?', a: 'Cypress komutları zincirlenebilir nesneler döndürür: cy.get(\'.item\').first().click() gibi art arda bağlanabilirler. .then(($el) => {...}) jQuery elemanına BİR KEZ erişmek için kullanılan bir callback\'tir — retry-ability YOKTUR, assertion için .should() kullanmalısın. Java\'daki Stream API\'nin zincirlenebilir metodlarına benzer ama arka planda asenkron çalışır.' },
          { level: 'basic', q: 'cy.type(), cy.click() ve cy.check() temel form aksiyonları nasıl çalışır?', a: 'cy.type() bir input\'a karakterleri tek tek simüle ederek yazar, cy.click() elementin tıklanabilir olmasını bekleyip tıklar, cy.check()/cy.uncheck() checkbox/radio durumunu değiştirir. Hepsi retry-ability\'lidir: element actionable olana kadar otomatik beklerler. Gerçekten tıklanamaz bir elementi test etmen gerekiyorsa { force: true } ile bu kontrolleri bilerek atlayabilirsin.' },
          { level: 'basic', q: 'cypress open ile cypress run arasındaki fark nedir?', a: 'npx cypress open interaktif Test Runner GUI\'sini açar — testleri izleyebilir, time-travel yapabilirsin; geliştirme sırasında kullanılır. npx cypress run tüm testleri headless modda terminalde çalıştırır ve CI/CD\'de kullanılır. Selenium\'daki headless/headed mod ayrımına benzer ama iki ayrı komutla netleştirilmiştir.' },
          { level: 'basic', q: 'Cypress hangi tarayıcıları destekler, hangisini desteklemez?', a: 'Cypress; Chrome, Edge, Chromium ve Firefox\'u, ayrıca kendi Electron tarayıcısını destekler. Desteklemediği önemli bir tarayıcı Safari/WebKit\'tir — Apple ekosistemine özel test gereksinimi olan projeler için bu, Cypress\'i eleyen en büyük kısıtlamadır. Bu durumda Selenium (SafariDriver) ya da Playwright (WebKit) tercih edilmelidir.' },
          { level: 'basic', q: 'Fixture nedir, cy.fixture() nasıl kullanılır?', a: 'Fixture, cypress/fixtures/ klasöründeki statik test verisi dosyalarıdır (genelde JSON) — sahte API yanıtı ya da form verisi olarak kullanılır. cy.fixture(\'products.json\') genelde cy.intercept() ile birlikte stub veri olarak kullanılır. Java\'daki test resources klasöründeki JSON dosyalarını okumaya benzer, ama Cypress bunu network stub\'lamayla doğrudan entegre eder.' },
          { level: 'basic', q: 'Cypress Test Runner\'da Command Log ve time-travel nedir?', a: 'Command Log, Test Runner\'ın sol panelinde her komutun sırayla listelendiği geçmiştir. Time-travel, bu geçmişteki herhangi bir satıra tıklayınca uygulamanın o anki DOM snapshot\'ını görme özelliğidir — testi yeniden çalıştırmana gerek kalmaz. Selenium\'da bu tür bir debugging hiç yoktur; en yakın benzeri manuel screenshot almaktır.' },
          { level: 'basic', q: 'Cypress\'te should() ve expect() ile assertion nasıl yazılır?', a: 'cy.get(\'.cart-count\').should(\'have.text\', \'3\') retry-able bir assertion\'dır — koşul sağlanana kadar otomatik tekrar dener. expect(value).to.equal(3) Chai\'den gelen, tek seferlik bir assertion\'dır, genelde .then() içinde kullanılır. Java\'daki JUnit assertEquals()\'a benzer ama should() retry mantığı ekler.' },
          { level: 'basic', q: 'Cypress\'te screenshot ve video kaydı nasıl alınır?', a: 'cy.screenshot() ile manuel olarak ya da cypress.config.js\'te video: true ayarıyla otomatik video kaydı alınabilir — cypress run modunda video varsayılan açıktır. Başarısız testler için ekstra screenshot da otomatik üretilir. Selenium\'da bunun için TakesScreenshot arayüzünü manuel implemente etmen gerekirdi; Cypress\'te built-in gelir.' },
          { level: 'basic', q: 'beforeEach ve afterEach hook\'ları ne zaman kullanılır?', a: 'beforeEach her testten ÖNCE çalışır — login, sayfaya gitme ya da veri hazırlama için kullanılır. afterEach her testten SONRA çalışır — temizlik için kullanılır, ama v12+\'ta test isolation açık olduğu için cookie/localStorage zaten otomatik temizlenir. Java\'daki JUnit\'in @BeforeEach/@AfterEach annotation\'larının karşılığıdır (Cypress alttan Mocha kullanır).' },

          { level: 'intermediate', q: 'Cypress\'in "retry-ability" mekanizması nasıl çalışır, Selenium\'daki WebDriverWait\'ten farkı nedir?', a: 'Retry-ability, cy.get() ve should()/and() gibi komutların koşul sağlanana ya da timeout (varsayılan 4000ms) dolana kadar arka planda otomatik tekrar denenmesidir. Selenium\'da WebDriverWait + ExpectedConditions ile bunu HER seferinde manuel kurman gerekir; Cypress\'te bu davranış komutların kendisine gömülüdür. Bu fark, Cypress testlerinin Selenium\'a göre genelde daha az flaky olmasının ana nedenidir.' },
          { level: 'intermediate', q: 'cy.intercept() ile network stubbing nasıl yapılır?', a: 'cy.intercept(\'GET\', \'/api/products\', { fixture: \'products.json\' }).as(\'getProducts\') gerçek sunucuya gitmeden sahte veri döner (stub); sadece .as() ile alias verip override yapmazsan gerçek isteği sadece gözlemlersin (spy). cy.wait(\'@getProducts\') testin isteğin tamamlanmasını beklemesini sağlar. Java\'da bunun için WireMock/MockServer gibi ayrı bir sunucu kurman gerekirdi.' },
          { level: 'intermediate', q: 'Custom command (Cypress.Commands.add) ne zaman yazılır, login örneği nasıldır?', a: 'Tekrar eden bir işlem (login gibi) birden fazla testte kullanılıyorsa, cypress/support/commands.js\'te Cypress.Commands.add(\'loginByApi\', (email, pass) => {...}) ile custom command tanımlanır. Bu, UI\'dan login yapmak yerine cy.request() ile doğrudan API\'ye istek atıp token\'ı localStorage\'a yazarak çok daha hızlı çalışır. Java\'daki yardımcı (utility) metotlara benzer, ama global olarak cy nesnesine eklenir.' },
          { level: 'intermediate', q: 'Page Object Model yerine "App Actions" pattern nedir, neden tercih edilir?', a: 'App Actions, UI üzerinden tıklayarak state hazırlamak yerine, uygulamanın kendi store\'una (Redux/Zustand) doğrudan dispatch yaparak (cy.window().its(\'store\').invoke(\'dispatch\', ...)) test ortamını hazırlama pratiğidir. Bu, sepete ürün eklemek için 5 UI adımını atlayıp testi saniyeler içinde kurmanı sağlar. Selenium dünyasında bu kadar doğrudan bir "uygulama içine erişim" pattern\'i nadirdir çünkü WebDriver, JS context\'ine bu kadar kolay erişemez.' },
          { level: 'intermediate', q: 'Alias (.as()) nedir, cy.get(\'@alias\') nasıl kullanılır?', a: 'Alias, bir komutun sonucuna daha sonra referans vermek için verilen bir isimdir: cy.get(\'.product\').as(\'productList\') sonra cy.get(\'@productList\') ile tekrar erişebilirsin. Network isteklerinde cy.intercept(...).as(\'getProducts\') + cy.wait(\'@getProducts\') en sık kullanılan halidir. Java\'da bir değişkene sonuç atamaya benzer, ama alias\'lar Cypress\'in komut kuyruğunda yaşar ve retry-ability korunur.' },
          { level: 'intermediate', q: 'Cypress\'te cross-origin testing (cy.origin()) neden gereklidir?', a: 'Cypress varsayılan olarak tek bir origin\'i kontrol eder; uygulaman bir OAuth/SSO sağlayıcısı gibi farklı bir domain\'e yönlendirdiğinde "cross origin error" alırsın. cy.origin(\'https://auth0.com\', () => { cy.get(\'#username\').type(\'user\') }) bu sınırı resmi olarak aşmanı sağlar (v9.6+). Selenium\'da bu sorun yoktur çünkü WebDriver tarayıcıyı dışarıdan kontrol eder.' },
          { level: 'intermediate', q: 'Test isolation (v12+) nedir, testler arası state nasıl temizlenir?', a: 'Cypress v12 ile "test isolation" varsayılan açıktır: her testten önce cookie, localStorage ve sessionStorage otomatik temizlenir, böylece bir testin state\'i bir sonrakini gizlice etkilemez. Bu, "bir testte login ol, sonraki testler o oturumu kullansın" anti-pattern\'ini kırar. Java\'daki JUnit\'in test izolasyonu felsefesine benzer: testler birbirinden bağımsız olmalıdır.' },
          { level: 'intermediate', q: 'Cypress\'te data-cy attribute neden best practice olarak önerilir?', a: 'data-cy, sadece test amacıyla eklenen ve geliştiricilerin stil/metin değişikliklerinde dokunmadığı bir attribute\'tur — CSS refactor\'leri ya da i18n metin değişiklikleri testi kırmaz. Bu, Selenium dünyasında da geçerli evrensel bir "resilient selector" pratiğidir, sadece Cypress dokümantasyonu bunu açıkça önerir. Her yeni component\'e data-cy eklemek code review checklist\'ine eklenebilir.' },
          { level: 'intermediate', q: 'Cypress\'te native HTML5 drag-and-drop neden sorun çıkarır, nasıl çözülür?', a: 'Native HTML5 drag-and-drop gerçek OS seviyesinde mouse event\'lerine dayanır; Cypress\'in sentetik event tetikleme yöntemi bunu tam olarak taklit edemez. Çözüm: .trigger(\'dragstart\')/.trigger(\'drop\') ile event\'leri manuel tetiklemek (kırılgan) ya da @4tw/cypress-drag-drop eklentisini kullanmak. Selenium\'un Actions API\'si de aynı temel sorunu yaşar.' },
          { level: 'intermediate', q: 'Cypress\'te uncaught exception nasıl handle edilir?', a: 'Uygulamadaki yakalanmamış bir JavaScript hatası, Cypress tarafından varsayılan olarak otomatik test başarısızlığına çevrilir. Eğer hata gerçekten zararsızsa, Cypress.on(\'uncaught:exception\', (err) => { if (err.message.includes(\'...\')) return false }) ile seçici olarak filtrelenir. Bunu körü körüne tüm hataları yutacak şekilde kullanmak gerçek bug\'ları gizleyebilir.' },
          { level: 'intermediate', q: 'cy.wait() ne zaman kötü pratiktir, ne zaman gereklidir?', a: 'cy.wait(3000) gibi sabit milisaniye bekleme bir anti-pattern\'dir — Selenium\'daki Thread.sleep() kadar kötüdür. cy.wait(\'@alias\') ise tamamen farklıdır: belirli bir network isteğinin TAMAMLANMASINI bekler, süre değil koşul bazlıdır. Kural basit: cy.wait(sayı) görürsen şüphelen, cy.wait(\'@alias\') görürsen genelde doğru kullanımdır.' },
          { level: 'intermediate', q: 'Cypress\'te environment variable (Cypress.env()) nasıl yönetilir?', a: 'Environment değişkenleri cypress.config.js\'teki env objesinde, cypress.env.json\'da, CYPRESS_ prefix\'li OS değişkenlerinde ya da --env flag\'iyle tanımlanabilir; hepsine Cypress.env(\'apiUrl\') ile erişilir. Bu, farklı ortamlar için farklı baseUrl/API key kullanmanı sağlar. Java\'da Maven profilleri ya da Spring\'in application-{profile}.properties\'ine benzer bir amaç taşır.' },
          { level: 'intermediate', q: 'cy.fixture() ile gelen veri mutasyonu neden tehlikelidir?', a: 'cy.fixture(\'user.json\') ile alınan obje JavaScript\'te referans olarak paylaşılır; bir testte bu objeyi değiştirirsen, aynı fixture\'ı kullanan SONRAKİ test "kirli" veriyle başlar. Çözüm: kullanmadan önce klonlamak — cy.fixture(\'user.json\').then((data) => cy.wrap({ ...data })). Bu, Java\'da paylaşılan mutable static obje üzerindeki "veri kirliliği" sorununun JavaScript karşılığıdır.' },
          { level: 'intermediate', q: 'Cypress\'te component testing nedir, e2e testing\'den farkı nedir?', a: 'Component testing, tüm uygulamayı tarayıcıda açmadan, tek bir React/Vue/Angular komponentini izole mount edip test etmeni sağlar. E2E testing tüm uygulamayı baştan sona test ederken, component testing çok daha hızlıdır çünkü sadece bir komponent render edilir. Java\'daki Spring\'in @WebMvcTest felsefesine (tüm uygulamayı değil bir katmanı test etme) benzer bir izolasyon fikridir.' },
          { level: 'intermediate', q: 'Cypress\'te TypeScript desteği nasıl kurulur?', a: 'cypress/tsconfig.json oluşturulur ve test dosyaları .cy.ts uzantısıyla yazılır; Cypress, TypeScript\'i ek derleyici kurmana gerek kalmadan otomatik destekler. Custom command\'ların tip tanımları cypress/support/index.d.ts içinde declare global { namespace Cypress { interface Chainable {...} } } ile yazılır. Java geliştiricileri için statik tip kontrolü, IDE\'de otomatik tamamlama açısından tanıdık bir güven hissi verir.' },
          { level: 'intermediate', q: 'cypress-axe ile accessibility testi nasıl yapılır?', a: 'cypress-axe, Deque\'in axe-core motorunu Cypress\'e entegre eder: cy.injectAxe() axe\'i sayfaya enjekte eder, cy.checkA11y() renk kontrastı, eksik alt-text, yanlış ARIA rolü gibi WCAG ihlallerini tarayıp raporlar. CI pipeline\'ına eklenerek her PR\'da erişilebilirlik regresyonlarını otomatik yakalayabilirsin. Selenium dünyasında benzer araç axe-selenium-java\'dır.' },
          { level: 'intermediate', q: 'Cypress\'te multiple tabs/windows testi neden zordur, Selenium\'dan farkı nedir?', a: 'Cypress aynı anda sadece TEK bir sekmeyi kontrol eder — bu, tarayıcı içinde çalışan mimarisinin doğrudan bir sonucudur. Selenium ise WebDriver protokolü sayesinde driver.getWindowHandles() + switchTo().window() ile birden fazla pencereyi native yönetebilir. Cypress\'te bu sınırlamayı aşmak için genelde target="_blank" linklerini test öncesi kaldırmak gibi dolaylı çözümler kullanılır.' },
          { level: 'intermediate', q: 'cy.session() nedir, login süresi nasıl optimize edilir?', a: 'cy.session() (v9.6+), bir login işleminin sonucunu (cookie, localStorage) cache\'ler ve aynı session ID ile tekrar çağrıldığında login adımlarını TEKRAR çalıştırmadan o durumu geri yükler. Testler arası login\'i dramatik şekilde hızlandırır. Java\'da bir test suite\'inde @BeforeAll içinde bir kez login olup session\'ı paylaşmaya benzer bir performans optimizasyonudur.' },
          { level: 'intermediate', q: 'Cypress\'te flaky testleri azaltmak için hangi pratikler uygulanır?', a: 'En önemli kurallar: cy.wait(sayı) yerine koşul bazlı should()/cy.wait(\'@alias\') kullanmak, data-cy gibi kararlı selector\'lar tercih etmek, testler arası paylaşılan mutable state\'ten kaçınmak ve fixture verisini klonlamak. CI\'da kaynak yetersizliği de flaky testlerin gizli bir nedeni olabilir. Selenium\'daki flaky test nedenleri (timing, shared state) büyük ölçüde aynıdır.' },
          { level: 'intermediate', q: 'Cypress\'te dosya yükleme (file upload) nasıl test edilir?', a: 'cy.get(\'input[type=file]\').selectFile(\'cypress/fixtures/avatar.png\') (v9.3+ built-in) bir input elementine dosya seçtirir. Drag-and-drop ile yükleme simüle etmek için selectFile({ action: \'drag-drop\' }) kullanılır. Java/Selenium\'da WebElement.sendKeys(dosyaYolu) ile benzer bir mantık taşır ama Cypress\'in API\'si daha esnektir.' },

          { level: 'advanced', q: 'Cypress\'in mimarisi (aynı browser process içinde çalışması) Selenium/Playwright\'tan nasıl farklı, avantaj/dezavantajları nedir?', a: 'Cypress, test kodunu doğrudan tarayıcının JavaScript run-loop\'unda çalıştırır; Selenium ve Playwright ise ayrı bir process\'ten tarayıcıyı "uzaktan" yönetir. Avantaj: network gecikmesi yok, DOM\'a doğrudan erişim, time-travel debugging. Dezavantaj: sadece JavaScript/TypeScript, tek sekme sınırı, aynı origin kısıtlaması. Java/Selenium dünyasında alışık olduğun "tam izolasyon" Cypress\'te yoktur.' },
          { level: 'advanced', q: 'Cypress Cloud (Dashboard) ile paralel test çalıştırma nasıl kurulur?', a: 'cypress run --record --key <record-key> --parallel komutu testleri Cypress Cloud\'a kaydeder ve birden fazla CI makinesine otomatik dağıtır — Cloud, geçmiş süre verilerine göre yük dengelemesi yapar. Bu, Selenium Grid\'i manuel kurmaktan çok daha az operasyonel yüktür ama Cypress Cloud büyük kullanım için ücretlidir. Java\'da Maven Surefire\'ın fork count\'una benzer ama bulutta yönetilen haliyle.' },
          { level: 'advanced', q: 'Cypress\'i GitHub Actions CI/CD pipeline\'ına nasıl entegre edersiniz?', a: 'Resmi cypress-io/github-action eklentisi kullanılır: uses: cypress-io/github-action@v6 ile npm install + cypress run otomatik yapılır, build/start parametreleriyle önce uygulama ayağa kaldırılıp sonra testler çalıştırılır. Test sonuçları actions/upload-artifact ile saklanır. Jenkins\'te benzer akış sh("npx cypress run") + mochawesome reporter ile kurulur.' },
          { level: 'advanced', q: 'Cypress\'te custom plugin / setupNodeEvents nedir, ne için kullanılır?', a: 'setupNodeEvents, cypress.config.js içinde tanımlanan ve Node.js tarafında çalışan bir fonksiyondur — dosya sistemi erişimi, veritabanı sorgusu gibi tarayıcının yapamadığı işler için kullanılır. on(\'task\', { resetDb() {...} }) ile tanımlanan bir "task", testten cy.task(\'resetDb\') ile çağrılır. Bu, Cypress\'in tarayıcı-sandbox\'ından çıkıp gerçek sisteme erişmesi gereken senaryolar için kritik bir köprüdür.' },
          { level: 'advanced', q: 'Cypress\'te Docker ile test çalıştırma nasıl yapılır?', a: 'cypress/included resmi Docker image\'ı, Cypress\'in tüm bağımlılıklarını (tarayıcılar dahil) önceden kurulu içerir — docker run -v $PWD:/e2e -w /e2e cypress/included:13.6.0 ile ekstra kurulum yapmadan testleri çalıştırabilirsin. CI\'da bu, "her seferinde tarayıcı indir" sorununu ortadan kaldırır. Java\'da Selenium için benzer yaklaşım selenium/standalone-chrome image\'ıdır.' },
          { level: 'advanced', q: 'Cypress retries (test-level) ile command retry-ability arasındaki fark nedir?', a: 'Command retry-ability, TEK bir komutun içinde koşul sağlanana kadar otomatik tekrar denenmesidir — her zaman aktiftir. Test-level retries ise retries: { runMode: 2 } ayarıyla, TÜM bir testin başarısız olması durumunda tekrar çalıştırılmasıdır. İkisi farklı katmanlarda çalışır; test-level retry\'a aşırı güvenmek kök neden analizini gizler.' },
          { level: 'advanced', q: 'Cypress\'te performans metrikleri (Lighthouse, Web Vitals) nasıl ölçülür?', a: 'cypress-audit eklentisi cy.lighthouse() komutuyla bir sayfanın performans/erişilebilirlik/SEO skorlarını ölçüp eşik altına düşerse testi fail ettirebilir. Web Vitals (LCP, FID, CLS) için cy.window().its(\'performance\') ile tarayıcının Performance API\'sine erişip manuel ölçüm de yapılabilir. Bu, her PR\'da "performans regresyonu var mı?" sorusunu fonksiyonel suite içinde otomatik sormanı sağlar.' },
          { level: 'advanced', q: 'Büyük bir Cypress test suite\'inde test sharding/parallelization stratejisi nasıl kurulur?', a: 'Cypress Cloud ile --parallel flag\'i kullanıldığında, Cloud testleri geçmiş çalışma sürelerine göre otomatik olarak makineler arasında dengeli dağıtır (manuel shard numarası vermezsin). CI\'da birden fazla "job" aynı --record --key ile farklı makinelerde başlatılır. Java\'da Maven Failsafe\'in fork count\'unu manuel ayarlamaktan farklı olarak, "akıllı yük dengeleme" servis tarafından yapılır.' },
          { level: 'advanced', q: 'Cypress\'te API testing (cy.request()) e2e testten ayrı nasıl kullanılır?', a: 'cy.request(\'POST\', \'/api/users\', { name: \'Ada\' }) tarayıcı UI\'sını hiç açmadan doğrudan bir HTTP isteği atar ve response\'u test edebilirsin — REST Assured\'ın Cypress\'teki karşılığı gibi düşünülebilir. Pratikte API testleri genelde test setup\'ını hızlandırmak için (örn. kullanıcı oluşturup sonra UI\'da login olmak) ya da bağımsız bir regresyon suite\'i olarak kullanılır. Java\'da REST Assured\'ın given().when().then() zincirine kavramsal olarak çok yakındır.' },
          { level: 'advanced', q: 'Cypress\'te visual regression testing nasıl yapılır?', a: 'cypress-image-snapshot ya da Percy/Applitools entegrasyonları, bir sayfanın ekran görüntüsünü alıp önceki bir "baseline" ile piksel piksel karşılaştırır; fark eşiği aşarsa test fail olur. cy.matchImageSnapshot() ilk çalıştırmada baseline oluşturur. Bu, CSS refactor\'lerinin görsel bozulmalara yol açıp açmadığını fonksiyonel testlerin yakalayamadığı bir katmanda yakalar.' },
          { level: 'advanced', q: 'Cypress\'te custom reporter nasıl yazılır (mochawesome)?', a: 'Cypress alttan Mocha kullandığı için, herhangi bir Mocha reporter\'ı cypress.config.js\'teki reporter/reporterOptions ayarlarıyla kullanılabilir: reporter: \'mochawesome\', reporterOptions: { reportDir: \'cypress/reports\', html: true, json: true }. Bu, CI\'da insan tarafından okunabilir bir HTML raporu üretir. Java\'da TestNG\'nin HTML raporuna ya da Allure entegrasyonuna benzer bir amaç taşır.' },
          { level: 'advanced', q: 'Cypress migration: Selenium\'dan Cypress\'e geçiş kararını nasıl verirsiniz, ne zaman geçmezsiniz?', a: 'Geçişi destekleyen faktörler: ekip JS/TS biliyor, proje modern bir SPA, Safari desteği gerekmiyor, hızlı geri bildirim öncelikli. Geçmemeyi gerektiren faktörler: büyük olgun bir Java/Selenium codebase\'i var, Safari/WebKit zorunlu, çoklu sekme senaryoları merkezi, ya da native mobil test (Appium) aynı codebase\'i paylaşıyor. Gerçekçi strateji genelde "ikisi bir arada": yeni özellikler Cypress\'le, kritik eski regresyon Selenium\'da kalır.' },
          { level: 'advanced', q: 'Cypress\'te memory leak / büyük test suite\'lerde browser crash sorunları nasıl debug edilir?', a: 'Büyük suite\'lerde tarayıcı bellek kullanımı zamanla artabilir; numTestsKeptInMemory (varsayılan 50) ayarıyla bellekte tutulan eski test snapshot sayısı sınırlanır — CI\'da bu değeri düşürmek bellek sorunlarını azaltabilir. experimentalMemoryManagement ayarı testler arası garbage collection\'ı zorlar. Java\'daki JVM heap dump analiziyle bellek sızıntısı bulmaya benzer bir disiplin gerekir.' },
          { level: 'advanced', q: 'Cypress\'te güvenlik testi (XSS, CSRF token) nasıl entegre edilir?', a: 'Cypress, fonksiyonel güvenlik testleri için kullanılabilir: bir input\'a <script>alert(1)</script> yazıp cy.on(\'window:alert\') ile alert tetiklenip tetiklenmediğini kontrol ederek temel XSS regresyonu test edilebilir. CSRF token\'ları test etmek için cy.request() ile token\'sız istek atıp 403 dönüp dönmediği doğrulanabilir. Ancak Cypress bir güvenlik tarayıcısı DEĞİLDİR — derin testler için özel araçlarla tamamlanmalıdır.' },
          { level: 'advanced', q: 'Gerçek senaryo: Cypress\'i tercih ettiğiniz veya etmediğiniz bir proje deneyimi anlatın.', a: 'Tercih ederim: React tabanlı bir SaaS dashboard\'unda ekip tamamen JS/TS yazıyordu, time-travel debugging sayesinde CI\'da fail eden testleri yeniden çalıştırmadan saniyeler içinde kök nedeni bulabiliyorduk. Tercih etmem: bankacılık projesinde Safari zorunlu uyumluluk gereksinimi vardı ve ekip büyük bir Java/Selenium Grid altyapısına sahipti — bu durumda geçişin maliyeti (Safari desteği yokluğu + migration efor) faydasından fazlaydı.' },
        ],
      },
      cypressApiFirstLoginFilm,
      cypressApiVsUiLoginStep,
      cypressApiLoginP,
    ],
  },
  en: {
    title: '💼 50 Interview Questions',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'Cypress interview questions test two distinct layers: whether you know what something is, and whether you can explain why it was designed that way. "What is cy.intercept()?" is Basic; "A service returns 500 errors 5% of the time in production — how do you build a strategy to keep your CI suite stable?" is Advanced. The gap between those two levels is the same gap as knowing Mockito\'s API versus knowing when and how to reach for it in a real regression suite. What\'s the fastest way to close that gap? Skipping Basic means hitting a wall at the first follow-up question in an interview; these 50 questions build the bridge step by step — Basic to solidify the fundamentals, Intermediate to solve real-world scenarios (flaky tests, race conditions, test isolation failures), Advanced to discuss CI pipeline design and architectural trade-offs.',
      },
      {
        type: 'interview-questions',
          relatedTopicId: 'cypress',
        topic: 'Cypress',
        questions: [
          { level: 'basic', q: 'What is Cypress and what is its most fundamental difference from Selenium?', a: "Cypress is an open-source end-to-end testing framework written in JavaScript/TypeScript that runs test code INSIDE the browser. Selenium sends commands to the browser \"remotely\" over the WebDriver protocol — this makes Cypress faster, but it can only be written in JavaScript/TypeScript, not Java/Python/C#. For a team coming from Java/Selenium, the language switch is the biggest adaptation point." },
          { level: 'basic', q: 'How do you install Cypress?', a: "npm install cypress --save-dev installs Cypress as a devDependency and downloads its own browser binary — unlike Selenium, there's no separate ChromeDriver/geckodriver download step. npx cypress open auto-scaffolds the cypress/ folder structure on first run and opens the Test Runner. It's similar to adding a Maven dependency in Java, but with no compile step." },
          { level: 'basic', q: 'What does cypress.config.js contain?', a: "cypress.config.js is the central configuration file introduced in v10, replacing the old cypress.json — it defines baseUrl, viewport, timeout values, env variables, and setupNodeEvents (the plugin system). Think of it like Maven's pom.xml in Java: a single source defining how the framework behaves." },
          { level: 'basic', q: 'What does cy.visit() do?', a: "cy.visit('/login') navigates the browser to the given URL and automatically waits until the page loads. If baseUrl is set, you only need to write the path. It's the equivalent of Selenium's driver.get(\"https://...\"), but Cypress automatically waits for the page to fully load." },
          { level: 'basic', q: 'What is the best-practice selector strategy for finding elements in Cypress?', a: "The best practice is using data-cy (or data-test, data-testid) attributes added purely for testing — tests won't break even if CSS classes or visible text change. Relying on CSS class/id makes tests brittle under style changes, just like in Selenium. cy.get('[data-cy=submit]') follows the same logic as Selenium's By.cssSelector." },
          { level: 'basic', q: 'When do you use cy.contains()?', a: "cy.contains('Add to Cart') finds an element by its visible text — useful when the selector is unknown or the text itself is the focus of the test. A second parameter (cy.contains('.product-card', 'Laptop')) scopes the search to a container. It's far shorter than writing an XPath text() in Selenium, but breaks in i18n projects when text changes." },
          { level: 'basic', q: 'How does command chaining and .then() work in Cypress?', a: "Cypress commands return chainable objects: cy.get('.item').first().click() can be linked one after another. .then(($el) => {...}) is a callback for accessing the jQuery element ONCE — it has NO retry-ability, so use .should() for assertions instead. It resembles Java's Stream API chainable methods, but runs asynchronously under the hood." },
          { level: 'basic', q: 'How do the basic form actions cy.type(), cy.click(), and cy.check() work?', a: "cy.type() simulates typing characters one by one into an input, cy.click() waits for the element to be clickable before clicking, and cy.check()/cy.uncheck() toggle checkbox/radio state. All are retry-able: they automatically wait until the element is actionable. If you need to test a genuinely unclickable element, you can deliberately bypass these checks with { force: true }." },
          { level: 'basic', q: 'What is the difference between cypress open and cypress run?', a: 'npx cypress open opens the interactive Test Runner GUI — you can watch tests and use time-travel; used during development. npx cypress run executes all tests headlessly in the terminal, used in CI/CD. It resembles the headless/headed mode distinction in Selenium, but is clarified by two separate commands.' },
          { level: 'basic', q: 'Which browsers does Cypress support, and which does it not?', a: "Cypress supports Chrome, Edge, Chromium and Firefox, plus its own Electron browser. A notable browser it does NOT support is Safari/WebKit — for projects with Apple-ecosystem testing requirements, this is the biggest limitation that rules out Cypress. In that case, Selenium (SafariDriver) or Playwright (WebKit) should be chosen." },
          { level: 'basic', q: 'What is a fixture, and how do you use cy.fixture()?', a: "A fixture is a static test data file (usually JSON) stored in cypress/fixtures/ — used as fake API responses or form data. cy.fixture('products.json') is typically used together with cy.intercept() as stub data. It resembles reading JSON files from a test resources folder in Java, but Cypress integrates it directly with network stubbing." },
          { level: 'basic', q: 'What are the Command Log and time-travel in the Cypress Test Runner?', a: "The Command Log is the history in the Test Runner's left panel listing every command in order. Time-travel is the ability to click any past entry and see the app's DOM snapshot at that exact moment — no need to re-run the test. This kind of debugging simply doesn't exist in Selenium; the closest equivalent is manually taking screenshots." },
          { level: 'basic', q: 'How do you write assertions with should() and expect() in Cypress?', a: "cy.get('.cart-count').should('have.text', '3') is a retry-able assertion — it automatically retries until the condition passes. expect(value).to.equal(3), from the Chai library, is a one-time (non-retry-able) assertion, usually used inside .then(). It resembles Java's JUnit assertEquals(), but should() adds retry logic." },
          { level: 'basic', q: 'How do you take screenshots and record video in Cypress?', a: "cy.screenshot() captures manually, or video: true in cypress.config.js records automatically for every test — video recording is on by default in cypress run mode. An extra screenshot is also auto-generated for failed tests. In Selenium you'd manually implement the TakesScreenshot interface; in Cypress it's built-in." },
          { level: 'basic', q: 'When do you use the beforeEach and afterEach hooks?', a: "beforeEach runs BEFORE every test — used for login, navigation, or data setup. afterEach runs AFTER every test — used for cleanup, though since v12+ test isolation is on by default, cookies/localStorage are already cleared automatically. It's the direct equivalent of JUnit's @BeforeEach/@AfterEach annotations in Java (Cypress uses Mocha under the hood)." },

          { level: 'intermediate', q: "How does Cypress's \"retry-ability\" mechanism work, and how does it differ from Selenium's WebDriverWait?", a: "Retry-ability means commands like cy.get() and assertions like should()/and() automatically retry in the background until the condition passes or the timeout (default 4000ms) expires. In Selenium you must manually set this up EVERY time with WebDriverWait + ExpectedConditions; in Cypress this behavior is baked into the commands themselves. This difference is the main reason Cypress tests tend to be less flaky than Selenium ones." },
          { level: 'intermediate', q: 'How do you do network stubbing with cy.intercept()?', a: "cy.intercept('GET', '/api/products', { fixture: 'products.json' }).as('getProducts') returns fake data without hitting the real server (stub); if you only give it an alias with .as() without overriding, you merely observe the real request (spy). cy.wait('@getProducts') makes the test wait for the request to complete. In Java you'd need to stand up a separate server like WireMock/MockServer for this." },
          { level: 'intermediate', q: 'When do you write a custom command (Cypress.Commands.add), and what does a login example look like?', a: "If a repeated action (like login) is used across multiple tests, you define a custom command in cypress/support/commands.js: Cypress.Commands.add('loginByApi', (email, pass) => {...}). This logs in much faster by hitting the API directly with cy.request() and storing the token in localStorage instead of logging in through the UI. It resembles a Java utility/helper method, but is attached globally to the cy object." },
          { level: 'intermediate', q: 'What is the "App Actions" pattern as an alternative to Page Object Model, and why is it preferred?', a: "App Actions is the practice of setting up test state by dispatching directly into the app's own store (Redux/Zustand) via cy.window().its('store').invoke('dispatch', ...) instead of clicking through the UI. This skips 5 UI steps to add an item to the cart and sets up the test in seconds. Such direct \"reach into the app\" access is rare in the Selenium world because WebDriver can't easily reach the JS context." },
          { level: 'intermediate', q: "What is an alias (.as()), and how do you use cy.get('@alias')?", a: "An alias is a name given to a command's result for later reference: cy.get('.product').as('productList') then cy.get('@productList') accesses the same elements again. For network requests, cy.intercept(...).as('getProducts') + cy.wait('@getProducts') is the most common usage. It resembles assigning a result to a variable in Java, but aliases live in Cypress's command queue and retain retry-ability." },
          { level: 'intermediate', q: 'Why is cross-origin testing (cy.origin()) needed in Cypress?', a: "Cypress controls only one origin at a time by default; when your app redirects to a different domain, like an OAuth/SSO provider, you get a \"cross origin error\". cy.origin('https://auth0.com', () => { cy.get('#username').type('user') }) officially lets you cross that boundary (v9.6+). Selenium doesn't have this problem because WebDriver controls the browser from outside." },
          { level: 'intermediate', q: 'What is test isolation (v12+), and how is state cleared between tests?', a: '"Test isolation" is on by default since Cypress v12: cookies, localStorage, and sessionStorage are automatically cleared before every test, so one test\'s state cannot secretly affect the next. This breaks the old anti-pattern of "log in once, let subsequent tests reuse that session". It resembles JUnit\'s test-isolation philosophy in Java: tests should be independent of each other.' },
          { level: 'intermediate', q: 'Why is the data-cy attribute recommended as a best practice in Cypress?', a: "data-cy is an attribute added purely for testing that developers won't touch when changing styles or text — so CSS refactors or i18n text changes don't break tests. This is a universal \"resilient selector\" practice that applies in the Selenium world too; Cypress's documentation just states it explicitly. Adding data-cy to every new component can become part of the code review checklist." },
          { level: 'intermediate', q: 'Why does native HTML5 drag-and-drop cause problems in Cypress, and how is it solved?', a: "Native HTML5 drag-and-drop relies on real OS-level mouse events, which Cypress's synthetic event triggering cannot fully replicate. The fix: manually trigger events with .trigger('dragstart')/.trigger('drop') (brittle) or use the @4tw/cypress-drag-drop plugin. Selenium's Actions API suffers from the same underlying problem." },
          { level: 'intermediate', q: 'How do you handle uncaught exceptions in Cypress?', a: "An uncaught JavaScript error in the app is automatically turned into a test failure by Cypress by default. If the error is genuinely harmless, you can selectively filter it with Cypress.on('uncaught:exception', (err) => { if (err.message.includes('...')) return false }). Using this to blindly swallow every error can hide real bugs." },
          { level: 'intermediate', q: 'When is cy.wait() a bad practice, and when is it necessary?', a: "A fixed-millisecond wait like cy.wait(3000) is an anti-pattern — just as bad as Thread.sleep() in Selenium. cy.wait('@alias') is entirely different: it waits for a specific network request to COMPLETE, condition-based rather than time-based. Simple rule: be suspicious of cy.wait(number), but cy.wait('@alias') is usually correct usage." },
          { level: 'intermediate', q: 'How are environment variables (Cypress.env()) managed in Cypress?', a: "Environment variables can be defined in the env object in cypress.config.js, in cypress.env.json, as CYPRESS_-prefixed OS environment variables, or via the --env CLI flag; all are accessed with Cypress.env('apiUrl'). This lets you use different baseUrl/API keys per environment. It serves a purpose similar to Maven profiles or Spring's application-{profile}.properties in Java." },
          { level: 'intermediate', q: 'Why is mutating data returned by cy.fixture() dangerous?', a: "An object returned by cy.fixture('user.json') is shared by reference in JavaScript; if you mutate it in one test, the NEXT test using the same fixture starts with \"dirty\" data. The fix is cloning before use: cy.fixture('user.json').then((data) => cy.wrap({ ...data })). This is the JavaScript equivalent of the \"data pollution\" problem with a shared mutable static object in Java." },
          { level: 'intermediate', q: 'What is component testing in Cypress, and how does it differ from e2e testing?', a: 'Component testing lets you mount and test a single React/Vue/Angular component in isolation, without opening the whole app in a browser. E2E testing exercises the entire app end-to-end in a real browser, while component testing is much faster since only one component renders. It resembles the isolation philosophy of @WebMvcTest in Java Spring (testing one layer, not the whole app).' },
          { level: 'intermediate', q: 'How do you set up TypeScript support in Cypress?', a: "You create cypress/tsconfig.json and write test files with the .cy.ts extension; Cypress supports TypeScript automatically with no extra compiler setup. Type definitions for custom commands go in cypress/support/index.d.ts using declare global { namespace Cypress { interface Chainable {...} } }. For Java developers, TypeScript's static type checking and IDE autocomplete give a familiar sense of safety." },
          { level: 'intermediate', q: 'How do you run accessibility tests with cypress-axe?', a: "cypress-axe integrates Deque's axe-core engine into Cypress: cy.injectAxe() injects axe into the page, cy.checkA11y() scans for WCAG violations like color contrast, missing alt-text, or wrong ARIA roles and reports them. Adding this to the CI pipeline catches accessibility regressions automatically on every PR. The Selenium-world equivalent is axe-selenium-java." },
          { level: 'intermediate', q: 'Why is testing multiple tabs/windows harder in Cypress, and how does it differ from Selenium?', a: "Cypress controls only ONE tab at a time — a direct consequence of its in-browser architecture. Selenium, via the WebDriver protocol, can natively manage multiple windows with driver.getWindowHandles() + switchTo().window(). To work around this limitation in Cypress, common indirect solutions include removing target=\"_blank\" from links before the test." },
          { level: 'intermediate', q: 'What is cy.session(), and how does it optimize login time?', a: "cy.session() (v9.6+) caches the result of a login flow (cookies, localStorage) and restores that state when called again with the same session ID, without re-running the login steps. It dramatically speeds up login across tests. It's a performance optimization similar to logging in once in @BeforeAll and sharing the session across all tests in a Java test suite." },
          { level: 'intermediate', q: 'What practices reduce flaky tests in Cypress?', a: "The key rules: use condition-based should()/cy.wait('@alias') instead of cy.wait(number), prefer stable selectors like data-cy, avoid shared mutable state between tests, and clone fixture data before use. Resource constraints in CI can also be a hidden cause of flakiness. The root causes of flaky tests in Selenium (timing, shared state) are largely the same." },
          { level: 'intermediate', q: 'How do you test file uploads in Cypress?', a: "cy.get('input[type=file]').selectFile('cypress/fixtures/avatar.png') (built-in since v9.3) selects a file for an input element. To simulate drag-and-drop uploads, use selectFile({ action: 'drag-drop' }). In Java/Selenium, WebElement.sendKeys(filePath) follows similar logic, but Cypress's API offers more flexible options." },

          { level: 'advanced', q: "How does Cypress's architecture (running in the same browser process) differ from Selenium/Playwright, and what are the trade-offs?", a: "Cypress runs test code directly in the browser's JavaScript run-loop; Selenium and Playwright manage the browser \"remotely\" from a separate process. Advantage: no network latency, direct DOM access, time-travel debugging. Disadvantage: JavaScript/TypeScript only, single-tab limit, same-origin restriction. The \"full isolation\" you're used to in the Java/Selenium world doesn't exist in Cypress." },
          { level: 'advanced', q: 'How do you set up parallel test execution with Cypress Cloud (Dashboard)?', a: "cypress run --record --key <record-key> --parallel records tests to Cypress Cloud and automatically distributes them across multiple CI machines — Cloud load-balances based on historical run times. This is far less operational overhead than manually setting up Selenium Grid, but Cypress Cloud is a paid SaaS at scale. It resembles Maven Surefire's fork count in Java, but managed in the cloud." },
          { level: 'advanced', q: 'How do you integrate Cypress into a GitHub Actions CI/CD pipeline?', a: "The official cypress-io/github-action plugin is used: uses: cypress-io/github-action@v6 automatically does npm install + cypress run, and build/start parameters can boot the app before running tests. Results are stored via actions/upload-artifact. A similar flow in Jenkins is set up with sh(\"npx cypress run\") + the mochawesome reporter." },
          { level: 'advanced', q: 'What is a custom plugin / setupNodeEvents in Cypress, and what is it used for?', a: "setupNodeEvents is a function defined in cypress.config.js that runs on the Node.js side (outside the browser) — used for things the browser can't do, like filesystem access or database queries. A \"task\" defined with on('task', { resetDb() {...} }) is called from a test with cy.task('resetDb'). This is a critical bridge for scenarios where Cypress needs to escape the browser sandbox and reach the real system." },
          { level: 'advanced', q: 'How do you run Cypress tests in Docker?', a: "The official cypress/included image bundles all of Cypress's dependencies (including browsers) pre-installed — docker run -v $PWD:/e2e -w /e2e cypress/included:13.6.0 runs tests with no extra setup. This eliminates the \"download the browser every time\" problem in CI. A similar approach in Java/Selenium is the selenium/standalone-chrome image." },
          { level: 'advanced', q: 'What is the difference between Cypress test-level retries and command retry-ability?', a: 'Command retry-ability is a SINGLE command automatically retrying until its condition passes — always active by default. Test-level retries, configured with retries: { runMode: 2 }, rerun an ENTIRE test (the it block) if it fails completely. They operate at different layers; over-relying on test-level retries can mask root-cause analysis.' },
          { level: 'advanced', q: 'How do you measure performance metrics (Lighthouse, Web Vitals) in Cypress?', a: "The cypress-audit plugin's cy.lighthouse() command measures a page's performance/accessibility/SEO scores and can fail the test if they drop below a threshold. For Web Vitals (LCP, FID, CLS), you can access the browser's own Performance API via cy.window().its('performance') for manual measurement. This lets you automatically ask \"is there a performance regression?\" inside your functional suite on every PR." },
          { level: 'advanced', q: 'How do you set up a test sharding/parallelization strategy for a large Cypress suite?', a: "With Cypress Cloud's --parallel flag, Cloud automatically balances tests across machines based on historical run times (you don't manually assign shard numbers). In CI, multiple jobs are started on different machines with the same --record --key. Unlike manually setting Maven Failsafe's fork count in Java, \"smart load balancing\" is handled by the service." },
          { level: 'advanced', q: 'How do you use cy.request() for API testing separately from e2e tests?', a: "cy.request('POST', '/api/users', { name: 'Ada' }) fires an HTTP request directly without ever opening the browser UI, letting you assert on the response — think of it as REST Assured's Cypress counterpart. In practice, API tests are usually used to speed up test setup (e.g. creating a user via cy.request, then logging in through the UI) or kept as an independent API regression suite. It's conceptually very close to REST Assured's given().when().then() chain in Java." },
          { level: 'advanced', q: 'How do you do visual regression testing in Cypress?', a: "cypress-image-snapshot or commercial Percy/Applitools integrations capture a screenshot of a page/component and compare it pixel-by-pixel against a previous \"baseline\"; the test fails if the difference exceeds a threshold. cy.matchImageSnapshot() creates the baseline on first run. This catches a layer of visual breakage from CSS refactors that functional tests can't detect." },
          { level: 'advanced', q: 'How do you write a custom reporter in Cypress (mochawesome)?', a: "Since Cypress uses Mocha under the hood, any Mocha reporter (like mochawesome) can be used via the reporter/reporterOptions settings in cypress.config.js: reporter: 'mochawesome', reporterOptions: { reportDir: 'cypress/reports', html: true, json: true }. This produces a human-readable HTML report in CI. It serves a purpose similar to TestNG's HTML report or an Allure integration in Java." },
          { level: 'advanced', q: 'How do you decide whether to migrate from Selenium to Cypress, and when would you not migrate?', a: "Factors favoring migration: the team already knows JS/TS, the project is a modern SPA, Safari support isn't needed, fast feedback is a priority. Factors against migration: a large mature Java/Selenium codebase exists, Safari/WebKit is mandatory, multi-tab scenarios are central to the suite, or native mobile testing (Appium) already shares the same codebase. A realistic strategy is usually \"both at once\": new features in Cypress, critical legacy regression staying in Selenium." },
          { level: 'advanced', q: 'How do you debug memory leaks / browser crashes in large Cypress test suites?', a: "In large suites (hundreds of tests), browser memory usage can grow over time; numTestsKeptInMemory (default 50) limits how many old test snapshots are kept in memory — lowering this in CI can reduce memory issues. The experimentalMemoryManagement setting forces garbage collection between tests. It requires a discipline similar to finding a memory leak via JVM heap dump analysis in Java." },
          { level: 'advanced', q: 'How do you integrate security testing (XSS, CSRF tokens) in Cypress?', a: "Cypress can be used for functional security tests: typing <script>alert(1)</script> into an input and checking with cy.on('window:alert') whether an alert fires can test basic XSS regression. For CSRF tokens, you can send a request without one via cy.request() and assert it returns 403. However, Cypress is NOT a security scanner like OWASP ZAP — deep security testing needs to be complemented with dedicated tools." },
          { level: 'advanced', q: 'Real scenario: describe a project experience where you chose Cypress, or chose not to.', a: "Chose it: on a React-based SaaS dashboard where the team wrote entirely JS/TS, time-travel debugging let us find the root cause of CI failures in seconds without re-running tests — far faster than debugging via screenshots and logs in Selenium. Didn't choose it: on a banking project with a mandatory Safari compatibility requirement and an existing large Java/Selenium Grid investment — there, the cost of migrating (no Safari support + migration effort) outweighed the benefit." },
        ],
      },
      cypressApiFirstLoginFilm,
      cypressApiVsUiLoginStep,
      cypressApiLoginP,
    ],
  },
}

// 🗂️ Test Yazma & Organizasyon — .only tehlikesi filmi
const cypressOnlyDangerFilm = {
  type: 'video-scene',
  id: 'cypress-only-danger-film',
  title: {
    tr: '🎬 it.only() Commit\'te Kalırsa: CI\'da Sessizce Kaybolan Testler',
    en: '🎬 When it.only() Ships in a Commit: Tests That Vanish Silently in CI',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'dev', emoji: '🧑‍💻', label: { tr: 'Geliştirici (yerelde debug ediyor)', en: 'Developer (debugging locally)' }, color: '#8b5cf6' },
    { id: 'test1', emoji: '1️⃣', label: { tr: 'it.only(...) — odaklı test', en: 'it.only(...) — focused test' }, color: '#f59e0b' },
    { id: 'others', emoji: '📦', label: { tr: '47 diğer test', en: '47 other tests' }, color: '#94a3b8' },
    { id: 'commit', emoji: '📝', label: { tr: 'git commit', en: 'git commit' }, color: '#0ea5e9' },
    { id: 'ci', emoji: '🚨', label: { tr: 'CI: "48/48 PASS"', en: 'CI: "48/48 PASS"' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir describe bloğunda 48 test var, ama biri kırılıyor. Geliştirici sadece o teste odaklanmak için it.only() yazıyor — bu satır CI\'a giderse ne olur?',
        en: 'A describe block has 48 tests, but one is failing. The developer writes it.only() to focus on just that one — what happens if this line ships to CI?',
      },
      positions: { dev: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Geliştirici yerelde çalışırken 48 testin hepsini beklemek istemiyor: it.only(\'sepete ürün eklenir\', ...) yazıp SADECE bu testi çalıştırıyor.',
        en: 'Step 1 — Working locally, the developer doesn\'t want to wait for all 48 tests: they write it.only(\'adds item to cart\', ...) to run ONLY this one.',
      },
      code: { tr: `it.only('sepete ürün eklenir', () => {\n  cy.get('[data-cy=add]').click()\n})`, en: `it.only('adds item to cart', () => {\n  cy.get('[data-cy=add]').click()\n})` },
      positions: {
        dev: { x: 20, y: 40, scale: 1.0 },
        test1: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'dev', to: 'test1', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — .only() aktifken Mocha (Cypress\'in alt motoru) o describe/dosyadaki DİĞER 47 testi tamamen ATLAR — bu bir hata değil, tam olarak .only()\'in tasarım amacıdır.',
        en: 'Step 2 — While .only() is active, Mocha (Cypress\'s underlying engine) completely SKIPS the other 47 tests in that describe/file — this isn\'t a bug, it\'s exactly what .only() is designed to do.',
      },
      positions: {
        test1: { x: 22, y: 40, scale: 1.0 },
        others: { x: 58, y: 55, scale: 1.15, opacity: 0.4 },
      },
      beams: [{ from: 'test1', to: 'others', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Adım 3 (tuzak) — geliştirici hatayı düzeltir, ama .only() satırını SİLMEYİ unutur ve git commit + push yapar. Kod review\'da da fark edilmez.',
        en: 'Step 3 (the trap) — the developer fixes the bug but FORGETS to remove the .only() line, then git commits and pushes. Code review doesn\'t catch it either.',
      },
      code: { tr: `// unutulan satır hâlâ burada:\nit.only('sepete ürün eklenir', () => { ... })`, en: `// the forgotten line is still here:\nit.only('adds item to cart', () => { ... })` },
      positions: {
        others: { x: 20, y: 55, opacity: 0.3 },
        commit: { x: 55, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test1', to: 'commit', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 4 (hayalet/kontrast) — CI çalışır ve "1/1 PASS" ya da yanıltıcı bir yeşil tik gösterir — ama aslında diğer 47 test HİÇ ÇALIŞMADI. Regresyon kontrolü olmayan bir PR merge edilir.',
        en: 'Step 4 (the ghost/contrast) — CI runs and shows "1/1 PASS" or a misleading green checkmark — but the other 47 tests NEVER RAN AT ALL. A PR with zero regression coverage gets merged.',
      },
      positions: {
        commit: { x: 22, y: 40, scale: 0.9 },
        ci: { x: 60, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'commit', to: 'ci', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Ders — bu yüzden çoğu takım eslint-plugin-cypress veya benzeri bir lint kuralıyla .only()/.skip()\'i CI\'a girmeden ÖNCE, pre-commit hook\'ta yakalar. Java\'da @Disabled ile işaretlenip unutulan bir test de aynı riski taşır: derleyici bunu görmez, sadece test raporunu dikkatlice okuyan biri fark eder.',
        en: 'The lesson — this is why most teams catch .only()/.skip() BEFORE it reaches CI, using eslint-plugin-cypress or a similar lint rule in a pre-commit hook. A Java test marked @Disabled and forgotten carries the exact same risk: the compiler won\'t catch it, only someone who carefully reads the test report will.',
      },
      positions: {
        ci: { x: 40, y: 50, scale: 1.1 },
        others: { x: 68, y: 50, scale: 1.0, opacity: 0.6 },
      },
    },
  ],
}

const s11 = {
  tr: {
    title: '🗂️ Test Yazma & Organizasyon',
    blocks: [
      {
        type: 'simple-box', emoji: '📚',
        content: 'describe() ve it() bloklarının yapısını bir hukuki belge hiyerarşisi gibi düşün: describe() dava dosyasının başlığıdır (davranış kapsamını tanımlar), it() ise tek bir iddia — mahkemede "sanık X tarihinde Y yaptı" gibi, kesin ve bağımsız, diğer iddiaların doğruluğuna bakılmaksızın değerlendirilebilir. Ama şunu sor kendine: before() ve beforeEach() ikisi de kurulum yapıyor — aralarında ne fark var ki? before() dava başlamadan tüm dosyayı bir kez hazırlar (veritabanı seed\'i gibi); beforeEach() ise her iddia okunmadan önce masayı siler ve tazeleyerek başlar — yani testlerin birbiri üzerinde yan etki bırakıp bırakmadığını bu ayrım kontrol eder. Java\'da JUnit\'in @BeforeAll / @BeforeEach ayrımının birebir karşılığıdır, yalnızca adlar farklıdır. QA\'nın gerçek iş riski şudur: beforeEach() olmadan çalışan bir test suite\'i, testlerin çalışma sırasına bağımlı hale gelir — sıra değiştiğinde PASS olan testler FAIL olmaya başlar, flaky kabul edilen ama aslında düzensiz test izolasyonundan kaynaklanan bir "hantu" (phantom failure) ortaya çıkar.',
      },
      {
        type: 'text',
        content: 'Cypress, test yapısı için Mocha\'nın describe/context/it arayüzünü kullanır. describe() ve context() birebir aynıdır, sadece okunabilirlik için ikisi de vardır. Her it() (veya specify()) bağımsız bir test senaryosudur — CLAUDE.md\'deki "her test bağımsız çalışabilmeli" kuralı Cypress\'in resmi dokümantasyonunda da birebir aynı cümleyle geçer.',
      },
      {
        type: 'code', label: 'describe / it / 4 Hook',
        language: 'javascript',
        code: `describe('Sepet Sayfası', () => {
  before(() => cy.task('db:seed'))        // TÜM testlerden önce 1 KEZ
  beforeEach(() => cy.visit('/cart'))      // HER testten önce
  afterEach(() => cy.clearCookies())       // HER testten sonra
  after(() => cy.task('db:teardown'))      // TÜM testlerden sonra 1 KEZ

  it('ürün sepete eklenir', () => { /* ... */ })
  it('ürün sepetten çıkarılır', () => { /* ... */ })
})`,
      },
      {
        type: 'table',
        headers: ['Hook', 'Ne zaman çalışır', 'describe başına kaç kez (2 it() ile)'],
        rows: [
          ['before()', 'İlk testten önce', '1 kez'],
          ['beforeEach()', 'Her testten önce', '2 kez'],
          ['it()', 'Asıl test gövdesi', '2 kez'],
          ['afterEach()', 'Her testten sonra', '2 kez'],
          ['after()', 'Son testten sonra', '1 kez'],
        ],
      },
      {
        type: 'code', label: '.only ve .skip — geliştirme sırasında odaklanma',
        language: 'javascript',
        code: `it.only('sadece bu test çalışsın', () => { /* ... */ })  // diğer testler atlanır
it.skip('bu test şimdilik atlansın', () => { /* ... */ })  // bilinen bug, TODO vb.
// UYARI: .only commit'te kalırsa CI'da diğer TÜM testler sessizce atlanır!`,
      },
      {
        type: 'code', label: 'Custom Command — Cypress.Commands.add()',
        language: 'javascript',
        code: `// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=submit]').click()
})

// herhangi bir .cy.js dosyasında
beforeEach(() => cy.login('qa_user', 'Secret123'))`,
      },
      {
        type: 'java-compare',
        topic: 'JUnit 5 Hook Anotasyonları vs Cypress Hook Fonksiyonları',
        java: `@BeforeAll static void seedDb() { /* 1 kez */ }
@BeforeEach void visitCart() { /* her @Test'ten önce */ }
@Test void addsItem() { /* ... */ }
@AfterEach void clearCookies() { /* her @Test'ten sonra */ }
@AfterAll static void teardown() { /* 1 kez */ }`,
        typescript: `before(() => cy.task('db:seed'))       // 1 kez
beforeEach(() => cy.visit('/cart'))     // her it()'ten önce
it('adds item', () => { /* ... */ })
afterEach(() => cy.clearCookies())      // her it()'ten sonra
after(() => cy.task('db:teardown'))     // 1 kez`,
        why: { tr: 'JUnit 5\'te @BeforeAll/@AfterAll static olmak ZORUNDADIR çünkü sınıf instance\'ından önce çalışır. Cypress\'te before()/after() için böyle bir kısıtlama yoktur ama mantık birebir aynıdır: ikisi de "bütün test grubu için bir kez" çalışır.', en: 'In JUnit 5, @BeforeAll/@AfterAll MUST be static because they run before any class instance exists. Cypress\'s before()/after() have no such restriction, but the logic is identical: both run "once for the whole test group".' },
        note: { tr: 'Custom command (Cypress.Commands.add) Java dünyasındaki bir "test yardımcı sınıfı" (TestUtils.login()) gibidir — tekrar eden adımları tek bir çağrıya sıkıştırır.', en: 'A custom command (Cypress.Commands.add) is like a Java "test helper class" (TestUtils.login()) — it compresses repeated steps into a single call.' },
      },
      {
        type: 'simulation',
        scenario: 'cypress-test-structure',
        color: '#10b981',
        title: { tr: 'Hook Çalışma Sırası — Canlı İzle', en: 'Hook Execution Order — Watch Live' },
        description: { tr: 'İki it() olan bir describe bloğunu çalıştır, hangi hook\'un kaç kez ve hangi sırada tetiklendiğini command log\'da gör.', en: 'Run a describe block with two it()s and watch in the command log which hook fires how many times and in what order.' },
      },
      {
        type: 'git-practice',
        icon: '🗂️',
        title: { tr: 'Try It Yourself: Hook sırasını doğru diz', en: 'Try It Yourself: Arrange the hooks in the right order' },
        intro: {
          tr: 'Aşağıdaki satırlar karışık sırada. Bunları gerçek bir Cypress dosyasında çalışacakları doğru sıraya (before → beforeEach → it → afterEach → after) diz.',
          en: 'The lines below are in a shuffled order. Arrange them into the order they would actually run in a real Cypress file (before → beforeEach → it → afterEach → after).',
        },
        starterCommands: {
          tr: `after(() => cy.task('db:teardown'))
it('sepet sayfası açılır', () => { cy.contains('Sepet') })
beforeEach(() => cy.visit('/cart'))
afterEach(() => cy.clearCookies())
before(() => cy.task('db:seed'))`,
          en: `after(() => cy.task('db:teardown'))
it('loads the cart page', () => { cy.contains('Cart') })
beforeEach(() => cy.visit('/cart'))
afterEach(() => cy.clearCookies())
before(() => cy.task('db:seed'))`,
        },
        expectedSteps: [
          { label: { tr: 'Tüm testlerden önce 1 kez çalışacak hazırlığı yaz', en: 'Write the one-time setup before all tests' }, pattern: '^before\\(', example: "before(() => cy.task('db:seed'))" },
          { label: { tr: 'Her testten önce çalışacak hazırlığı yaz', en: 'Write the setup that runs before every test' }, pattern: '^beforeEach\\(', example: "beforeEach(() => cy.visit('/cart'))" },
          { label: { tr: 'Asıl testi yaz', en: 'Write the actual test' }, pattern: '^it\\(', example: "it('...', () => {...})" },
          { label: { tr: 'Her testten sonra çalışacak temizliği yaz', en: 'Write the cleanup that runs after every test' }, pattern: '^afterEach\\(', example: "afterEach(() => cy.clearCookies())" },
          { label: { tr: 'Tüm testlerden sonra 1 kez çalışacak temizliği yaz', en: 'Write the one-time cleanup after all tests' }, pattern: '^after\\(', example: "after(() => cy.task('db:teardown'))" },
        ],
        successOutput: {
          tr: 'Doğru sıra: before() → beforeEach() → it() → afterEach() → after(). Bu sıra her describe bloğu için sabittir, kaç it() olursa olsun beforeEach/afterEach her birinin etrafını sarar.',
          en: 'Correct order: before() → beforeEach() → it() → afterEach() → after(). This order is fixed for every describe block — no matter how many it()s exist, beforeEach/afterEach wrap each one.',
        },
        retryOutput: {
          tr: 'Sıra eksik veya yanlış. before/after sadece 1 kez, beforeEach/afterEach her testin etrafında çalışır — bunları birbirine karıştırma.',
          en: 'The order is missing or wrong. before/after run only once, beforeEach/afterEach wrap every test — don\'t mix them up.',
        },
      },
      cypressOnlyDangerFilm,
      {
        type: 'quiz',
        question: { tr: '3 it() içeren bir describe bloğunda beforeEach() kaç kez çalışır?', en: 'In a describe block with 3 it()s, how many times does beforeEach() run?' },
        options: [
          { id: 'a', text: '1 kez' },
          { id: 'b', text: '3 kez' },
          { id: 'c', text: '0 kez, beforeEach otomatik çalışmaz' },
          { id: 'd', text: '6 kez' },
        ],
        correct: 'b',
        explanation: {
          tr: 'beforeEach() ismiyle de belirtildiği gibi HER it()\'ten önce çalışır — 3 test varsa 3 kez tetiklenir. before() ise sadece 1 kez, ilk testten önce çalışır.',
          en: 'As its name says, beforeEach() runs before EVERY it() — with 3 tests it fires 3 times. before(), in contrast, runs only once, before the first test.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Dört adet test senaryosu (it) barındıran bir test grubunda (describe), beforeAll() kancası toplamda kaç kez çalıştırılır?",
            "en": "In a test suite (describe) containing four test cases (it), how many times does the beforeAll() hook execute?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "1 kez"
            },
            {
                  "id": "b",
                  "text": "4 kez"
            },
            {
                  "id": "c",
                  "text": "Hiç çalışmaz"
            },
            {
                  "id": "d",
                  "text": "5 kez"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "beforeAll() (veya jest gibi kütüphanelerde beforeAll), tanımlandığı describe bloğundaki tüm testlerden önce yalnızca bir kez çalışır. Her bir testten önce çalışmasını istediğiniz kancalar için beforeEach() kullanılmalıdır.",
            "en": "beforeAll() (or before() in some frameworks) is executed exactly once before all tests in the describe block begin. For logic that needs to run before each individual test case, you must use beforeEach()."
      }
}
},
    ],
  },
  en: {
    title: '🗂️ Writing & Organizing Tests',
    blocks: [
      {
        type: 'simple-box', emoji: '📚',
        content: "Think of the describe() / it() structure like a legal document hierarchy: describe() is the case heading (defines the scope of the behavior under scrutiny), and it() is a single individual claim — precise and independent, evaluable on its own regardless of whether other claims are true. But here's the question worth pausing on: both before() and beforeEach() set things up — so what exactly distinguishes them? before() prepares the entire case file once before any claim is heard (like seeding a database); beforeEach() wipes the table clean and resets before each individual claim is read — meaning it's this distinction that controls whether tests can leave side effects on each other. It's the direct equivalent of JUnit's @BeforeAll / @BeforeEach split in Java — only the names differ. The real QA risk: a test suite without beforeEach() becomes order-dependent; change the execution order and PASSing tests start FAILing, producing phantom failures that get labeled 'flaky' but are actually caused by broken test isolation.",
      },
      {
        type: 'text',
        content: "Cypress uses Mocha's describe/context/it interface for test structure. describe() and context() are identical — both exist purely for readability. Every it() (or specify()) is an independent test scenario — the rule \"every test must be able to run independently\" appears word-for-word in Cypress's official documentation too.",
      },
      {
        type: 'code', label: 'describe / it / 4 Hooks',
        language: 'javascript',
        code: `describe('Cart Page', () => {
  before(() => cy.task('db:seed'))        // ONCE before ALL tests
  beforeEach(() => cy.visit('/cart'))      // before EVERY test
  afterEach(() => cy.clearCookies())       // after EVERY test
  after(() => cy.task('db:teardown'))      // ONCE after ALL tests

  it('adds item to cart', () => { /* ... */ })
  it('removes item from cart', () => { /* ... */ })
})`,
      },
      {
        type: 'table',
        headers: ['Hook', 'When it runs', 'Times per describe (with 2 it()s)'],
        rows: [
          ['before()', 'Before the first test', 'Once'],
          ['beforeEach()', 'Before every test', 'Twice'],
          ['it()', 'The actual test body', 'Twice'],
          ['afterEach()', 'After every test', 'Twice'],
          ['after()', 'After the last test', 'Once'],
        ],
      },
      {
        type: 'code', label: '.only and .skip — focusing during development',
        language: 'javascript',
        code: `it.only('only this test runs', () => { /* ... */ })  // other tests are skipped
it.skip('skip this for now', () => { /* ... */ })  // known bug, TODO, etc.
// WARNING: if .only is left in a commit, ALL other tests silently skip in CI!`,
      },
      {
        type: 'code', label: 'Custom Command — Cypress.Commands.add()',
        language: 'javascript',
        code: `// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=submit]').click()
})

// in any .cy.js file
beforeEach(() => cy.login('qa_user', 'Secret123'))`,
      },
      {
        type: 'java-compare',
        topic: 'JUnit 5 Hook Annotations vs Cypress Hook Functions',
        java: `@BeforeAll static void seedDb() { /* once */ }
@BeforeEach void visitCart() { /* before every @Test */ }
@Test void addsItem() { /* ... */ }
@AfterEach void clearCookies() { /* after every @Test */ }
@AfterAll static void teardown() { /* once */ }`,
        typescript: `before(() => cy.task('db:seed'))       // once
beforeEach(() => cy.visit('/cart'))     // before every it()
it('adds item', () => { /* ... */ })
afterEach(() => cy.clearCookies())      // after every it()
after(() => cy.task('db:teardown'))     // once`,
        why: { tr: 'JUnit 5\'te @BeforeAll/@AfterAll static olmak ZORUNDADIR çünkü sınıf instance\'ından önce çalışır. Cypress\'te before()/after() için böyle bir kısıtlama yoktur ama mantık birebir aynıdır: ikisi de "bütün test grubu için bir kez" çalışır.', en: "In JUnit 5, @BeforeAll/@AfterAll MUST be static because they run before any class instance exists. Cypress's before()/after() have no such restriction, but the logic is identical: both run \"once for the whole test group\"." },
        note: { tr: 'Custom command (Cypress.Commands.add) Java dünyasındaki bir "test yardımcı sınıfı" (TestUtils.login()) gibidir.', en: 'A custom command (Cypress.Commands.add) is like a Java "test helper class" (TestUtils.login()) — it compresses repeated steps into a single call.' },
      },
      {
        type: 'simulation',
        scenario: 'cypress-test-structure',
        color: '#10b981',
        title: { tr: 'Hook Çalışma Sırası — Canlı İzle', en: 'Hook Execution Order — Watch Live' },
        description: { tr: 'İki it() olan bir describe bloğunu çalıştır, hangi hook\'un kaç kez ve hangi sırada tetiklendiğini command log\'da gör.', en: 'Run a describe block with two it()s and watch in the command log which hook fires how many times and in what order.' },
      },
      {
        type: 'git-practice',
        icon: '🗂️',
        title: { tr: 'Try It Yourself: Hook sırasını doğru diz', en: 'Try It Yourself: Arrange the hooks in the right order' },
        intro: {
          tr: 'Aşağıdaki satırlar karışık sırada. Bunları gerçek bir Cypress dosyasında çalışacakları doğru sıraya (before → beforeEach → it → afterEach → after) diz.',
          en: 'The lines below are in a shuffled order. Arrange them into the order they would actually run in a real Cypress file (before → beforeEach → it → afterEach → after).',
        },
        starterCommands: {
          tr: `after(() => cy.task('db:teardown'))
it('sepet sayfası açılır', () => { cy.contains('Sepet') })
beforeEach(() => cy.visit('/cart'))
afterEach(() => cy.clearCookies())
before(() => cy.task('db:seed'))`,
          en: `after(() => cy.task('db:teardown'))
it('loads the cart page', () => { cy.contains('Cart') })
beforeEach(() => cy.visit('/cart'))
afterEach(() => cy.clearCookies())
before(() => cy.task('db:seed'))`,
        },
        expectedSteps: [
          { label: { tr: 'Tüm testlerden önce 1 kez çalışacak hazırlığı yaz', en: 'Write the one-time setup before all tests' }, pattern: '^before\\(', example: "before(() => cy.task('db:seed'))" },
          { label: { tr: 'Her testten önce çalışacak hazırlığı yaz', en: 'Write the setup that runs before every test' }, pattern: '^beforeEach\\(', example: "beforeEach(() => cy.visit('/cart'))" },
          { label: { tr: 'Asıl testi yaz', en: 'Write the actual test' }, pattern: '^it\\(', example: "it('...', () => {...})" },
          { label: { tr: 'Her testten sonra çalışacak temizliği yaz', en: 'Write the cleanup that runs after every test' }, pattern: '^afterEach\\(', example: "afterEach(() => cy.clearCookies())" },
          { label: { tr: 'Tüm testlerden sonra 1 kez çalışacak temizliği yaz', en: 'Write the one-time cleanup after all tests' }, pattern: '^after\\(', example: "after(() => cy.task('db:teardown'))" },
        ],
        successOutput: {
          tr: 'Doğru sıra: before() → beforeEach() → it() → afterEach() → after().',
          en: 'Correct order: before() → beforeEach() → it() → afterEach() → after(). This order is fixed for every describe block — no matter how many it()s exist, beforeEach/afterEach wrap each one.',
        },
        retryOutput: {
          tr: 'Sıra eksik veya yanlış. before/after sadece 1 kez, beforeEach/afterEach her testin etrafında çalışır.',
          en: "The order is missing or wrong. before/after run only once, beforeEach/afterEach wrap every test — don't mix them up.",
        },
      },
      cypressOnlyDangerFilm,
      {
        type: 'quiz',
        question: { tr: '3 it() içeren bir describe bloğunda beforeEach() kaç kez çalışır?', en: 'In a describe block with 3 it()s, how many times does beforeEach() run?' },
        options: [
          { id: 'a', text: 'Once' },
          { id: 'b', text: '3 times' },
          { id: 'c', text: "0 times, beforeEach doesn't run automatically" },
          { id: 'd', text: '6 times' },
        ],
        correct: 'b',
        explanation: {
          tr: 'beforeEach() ismiyle de belirtildiği gibi HER it()\'ten önce çalışır — 3 test varsa 3 kez tetiklenir.',
          en: "As its name says, beforeEach() runs before EVERY it() — with 3 tests it fires 3 times. before(), in contrast, runs only once, before the first test.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Beş adet it() içeren bir test dosyasında, afterEach() kancası hangi durumlarda tetiklenir?",
            "en": "In a test file with five it()s, under what circumstances does the afterEach() hook trigger?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Sadece tüm testler bittikten sonra 1 kez"
            },
            {
                  "id": "b",
                  "text": "Dosya çalışmaya başladığında 1 kez"
            },
            {
                  "id": "c",
                  "text": "Her bir it() bloğunun çalışması tamamlandıktan sonra"
            },
            {
                  "id": "d",
                  "text": "Sadece test başarısız olduğunda"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "afterEach() kancası, isminden de anlaşılacağı üzere, 'her' (each) test adımından (it) sonra çalışır. 5 test varsa, 5 kez tetiklenir; testin başarılı veya başarısız olması bu kancanın çalışmasını engellemez.",
            "en": "As the name suggests, the afterEach() hook executes after 'each' individual test block (it). With 5 tests, it will fire 5 times; whether the test passes or fails does not prevent this hook from executing."
      }
}
},
    ],
  },
}

// 🔗 Variables, Aliases & Test Isolation — cy.session() cache mekanizması filmi
const cypressSessionCacheFilm = {
  type: 'video-scene',
  id: 'cypress-session-cache-film',
  title: {
    tr: '🎬 cy.session(): Login\'i Bir Kez Yap, Sonsuza Kadar Cache\'le',
    en: '🎬 cy.session(): Log In Once, Cache It Forever',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test1', emoji: '1️⃣', label: { tr: 'Test 1: cy.login(...)', en: 'Test 1: cy.login(...)' }, color: '#8b5cf6' },
    { id: 'realLogin', emoji: '🖱️', label: { tr: 'Gerçek Login Formu', en: 'Real Login Form' }, color: '#f59e0b' },
    { id: 'cache', emoji: '💾', label: { tr: 'Session Cache (id: [user,pass])', en: 'Session Cache (id: [user,pass])' }, color: '#0ea5e9' },
    { id: 'test2', emoji: '2️⃣', label: { tr: 'Test 2: cy.login(...) (aynı parametre)', en: 'Test 2: cy.login(...) (same params)' }, color: '#8b5cf6' },
    { id: 'restored', emoji: '⚡', label: { tr: 'Anında Geri Yüklendi', en: 'Instantly Restored' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: '10 testin HEPSİ dashboard\'ı test ediyor ve HEPSİ önce login olmak zorunda. 10 kez gerçek login formu doldurmak mı, yoksa 1 kez login olup 9 kez "hatırlamak" mı?',
        en: 'All 10 tests exercise the dashboard, and ALL of them need to log in first. Fill out the real login form 10 times — or log in once and "remember" it 9 times?',
      },
      positions: { test1: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Test 1, cy.session([username, password], () => {...}) çağırır. Bu id (kullanıcı+şifre) için henüz CACHE\'de bir kayıt YOK, bu yüzden içteki callback GERÇEKTEN çalışır.',
        en: 'Step 1 — Test 1 calls cy.session([username, password], () => {...}). No entry exists in the CACHE yet for this id (username+password), so the inner callback actually RUNS.',
      },
      code: { tr: `cy.session(['qa_user', 'Secret123'], () => {\n  cy.visit('/login')\n  cy.get('[data-cy=username]').type('qa_user')\n  cy.get('[data-cy=password]').type('Secret123')\n  cy.get('form').contains('Log In').click()\n})`, en: `cy.session(['qa_user', 'Secret123'], () => {\n  cy.visit('/login')\n  cy.get('[data-cy=username]').type('qa_user')\n  cy.get('[data-cy=password]').type('Secret123')\n  cy.get('form').contains('Log In').click()\n})` },
      positions: {
        test1: { x: 20, y: 40, scale: 1.0 },
        realLogin: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test1', to: 'realLogin', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Login gerçekten tamamlanınca Cypress, o anki cookie/localStorage/sessionStorage durumunu bu id\'ye bağlı bir kutuya kaydeder — bu kutu, testler arası HAFIZADA kalır.',
        en: 'Step 2 — Once login genuinely completes, Cypress saves the current cookie/localStorage/sessionStorage state into a box tied to this id — that box stays in MEMORY across tests.',
      },
      positions: {
        realLogin: { x: 22, y: 40, scale: 0.95 },
        cache: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'realLogin', to: 'cache', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Test isolation gereği Test 2 başlamadan önce cookie/localStorage TEMİZLENİR (about:blank\'e gidilir) — Test 2 sıfırdan başlıyor GİBİ görünür.',
        en: 'Step 3 — Because of test isolation, cookies/localStorage are CLEARED before Test 2 starts (the browser visits about:blank) — Test 2 LOOKS like it\'s starting from scratch.',
      },
      positions: {
        cache: { x: 30, y: 40, scale: 1.05 },
        test2: { x: 62, y: 55, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 4 (kontrast) — ama Test 2 AYNI [username, password] id\'siyle cy.session() çağırınca, Cypress cache\'de bu id\'yi BULUR ve içteki login callback\'ini HİÇ ÇALIŞTIRMADAN, kaydedilmiş context\'i anında geri yükler.',
        en: 'Step 4 (the contrast) — but when Test 2 calls cy.session() with the SAME [username, password] id, Cypress FINDS it in the cache and instantly restores the saved context WITHOUT ever running the inner login callback.',
      },
      code: { tr: `// Test 2 — AYNI id, callback bu sefer ÇALIŞMAZ\ncy.session(['qa_user', 'Secret123'], () => { /* ... */ })\ncy.visit('/dashboard')  // login formu hiç görünmedi`, en: `// Test 2 — SAME id, callback does NOT run this time\ncy.session(['qa_user', 'Secret123'], () => { /* ... */ })\ncy.visit('/dashboard')  // the login form was never seen` },
      positions: {
        test2: { x: 18, y: 40, scale: 1.0 },
        cache: { x: 42, y: 55, opacity: 0.6, scale: 0.95 },
        restored: { x: 72, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'test2', to: 'cache', color: '#94a3b8' }, { from: 'cache', to: 'restored', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da bir test suite\'inde @BeforeAll ile bir kez login olup token\'ı statik bir alanda paylaşmaya benzer bir performans fikri, ama cy.session() bunu her SPEC dosyası için ayrı ayrı, id bazlı ve otomatik yapar — sen sadece "aynı id\'yle tekrar çağır" dersin, cache\'i sen yönetmezsin.',
        en: 'The lesson — this resembles the performance idea of logging in once with @BeforeAll and sharing a token in a static field in Java, but cy.session() does it per spec file, per id, and automatically — you just "call it again with the same id", you never manage the cache yourself.',
      },
      positions: {
        restored: { x: 35, y: 50, scale: 1.1 },
        cache: { x: 62, y: 50, scale: 1.0, opacity: 0.6 },
      },
    },
  ],
}

const s12 = {
  tr: {
    title: '🔗 Variables, Aliases & Test Isolation',
    blocks: [
      {
        type: 'simple-box', emoji: '📝',
        content: 'Cypress komutları asenkron çalıştığı için bir komutun sonucunu doğrudan bir değişkene atayamazsın — tıpkı bir fabrika bandının ortasından ürünü kapıp yan masaya koymaya çalışmak gibi: bant dönerken üretim devam eder, elini uzattığında ürün zaten orada değildir. Peki o zaman bir komutun sonucuna nasıl güvenli erişirsin? .as(\'siparisId\') komutu, o sonucu adlandırılmış bir rafın üzerine koyar; cy.get(\'@siparisId\') ise doğru anda o raftan alır — zincirin sonuna kadar bant durmak zorunda kalmaz. Java\'da CompletableFuture\'dan bir değer almak için thenApply() kullanırsın, doğrudan .get() çağırmak bloklama riski taşır; .as()/.get(\'@\') çifti de tam bu mantıkla çalışır: Cypress ne zaman hazır olduğunu bilir, sen sadece adı söylersin. Test Isolation ise bu resmin arka planıdır: cookie, localStorage ve oturum bilgileri testler arasında sızmaya başlarsa bir testin yarattığı alias bir sonrakini kirletir, PASS gözüken test aslında önceki testin bıraktığı state\'e yaslanıyor olabilir — CI\'da sırasız çalışmaya geçtiğinde tüm suite çöker.',
      },
      {
        type: 'text',
        content: 'Cypress komutları asenkrondur, bu yüzden bir komutun sonucunu doğrudan bir değişkene atayamazsın (const email = cy.get(...) ÇALIŞMAZ, çünkü cy.get() henüz bir değer değil bir komut nesnesi döndürür). Sonuca ulaşmak için ya .then() içindeki closure\'ı ya da .as() ile oluşturulan alias\'ı kullanırsın.',
      },
      {
        type: 'code', label: '.then() ile closure — bir kerelik erişim',
        language: 'javascript',
        code: `cy.get('button').then(($btn) => {
  const text = $btn.text()           // o anki DOM değerine erişim
  cy.get('form').submit()
  cy.get('button').should(($btn2) => {
    expect($btn2.text()).not.to.eq(text)   // önceki değerle karşılaştır
  })
})`,
      },
      {
        type: 'code', label: '.as() ile alias — tekrar kullanılabilir referans',
        language: 'javascript',
        code: `beforeEach(() => {
  cy.fixture('users.json').as('users')   // alias HER testten önce sıfırlanır
})

it('ilk kullanıcının adını gösterir', function () {
  cy.get('header').should('contain', this.users[0].name)
})`,
      },
      {
        type: 'table',
        headers: ['Yöntem', 'Davranış', 'Ne zaman kullan'],
        rows: [
          ['this.alias', 'Statik anlık görüntü — bir kez okunur', 'fixture verisi gibi sabit veriler için'],
          ["cy.get('@alias')", 'Sorguyu YENİDEN çalıştırır, taze sonuç döner', 'DOM elementi gibi değişebilen şeyler için'],
          ['.then(($el) => {...})', 'Closure içinde bir kerelik erişim, retry-ability YOK', 'Anlık bir okuma/hesaplama yapmak için'],
        ],
      },
      {
        type: 'text',
        content: 'Test Isolation, Cypress\'in varsayılan davranışıdır: her testten önce tarayıcı about:blank\'e gider, tüm cookie/localStorage/sessionStorage temizlenir, alias\'lar/stub\'lar/spy\'lar/clock mock\'ları sıfırlanır. Bu, bir testin diğerini gizlice etkilemesini (flaky test\'lerin en sık nedeni) engeller.',
      },
      {
        type: 'code', label: 'cy.session() — login\'i testler arasında cache\'le',
        language: 'javascript',
        code: `// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-cy=username]').type(username)
    cy.get('[data-cy=password]').type(password)
    cy.get('form').contains('Log In').click()
  })
})

// her spec'te
beforeEach(() => {
  cy.login('qa_user', 'Secret123')   // 1. test: gerçekten login olur
  cy.visit('/dashboard')              // 2. test: cache'den anında geri yüklenir
})`,
      },
      {
        type: 'java-compare',
        topic: 'Paylaşılan State Riski (TestNG/JUnit) vs Cypress Test Isolation',
        java: `// JUnit'te dikkatli olmazsan:
static List<String> sharedCart = new ArrayList<>();  // testler arasında SIZAR
@Test void test1() { sharedCart.add("item1"); }
@Test void test2() { /* sharedCart hâlâ item1 içerir! */ }`,
        typescript: `// Cypress'te varsayılan olarak:
it('test 1', () => { cy.window().then(w => w.cart = ['item1']) })
it('test 2', () => {
  // cookie/localStorage/sessionStorage otomatik temizlendi
  // window.cart artık YOK — sızıntı imkansız
})`,
        why: { tr: 'JUnit/TestNG\'de static/shared değişkenler dikkatsizce kullanılırsa testler arasında state sızar ve testler birbirine bağımlı hale gelir. Cypress bu riski mimari seviyede ortadan kaldırır: her testten önce ZORUNLU olarak about:blank\'e gidip tarayıcı context\'ini sıfırlar.', en: 'In JUnit/TestNG, careless use of static/shared variables leaks state between tests and makes them interdependent. Cypress removes this risk at the architecture level: before every test it FORCIBLY visits about:blank and resets the browser context.' },
        note: { tr: 'Test isolation performans için kapatılabilir (testIsolation: false) ama bu, JUnit\'teki paylaşılan state riskini geri getirir — sadece bilinçli ve kontrollü senaryolarda kullan.', en: 'Test isolation can be disabled for performance (testIsolation: false), but this brings back the same shared-state risk as JUnit — only use it in deliberate, controlled scenarios.' },
      },
      {
        type: 'simulation',
        scenario: 'cypress-session-cache',
        color: '#a78bfa',
        title: { tr: 'cy.session() — Login Cache Canlı İzle', en: 'cy.session() — Watch Login Caching Live' },
        description: { tr: 'İlk test gerçekten login olur ve session\'ı kaydeder; ikinci test login formunu hiç doldurmadan doğrudan dashboard\'a "zıplar".', en: 'The first test really logs in and saves the session; the second test "jumps" straight to the dashboard without ever filling the login form.' },
      },
      {
        type: 'git-practice',
        icon: '🔗',
        title: { tr: 'Try It Yourself: Alias + session akışını doğru diz', en: 'Try It Yourself: Arrange the alias + session flow' },
        intro: {
          tr: 'Bir kullanıcı verisini fixture\'dan alias\'la, sonra login\'i session ile cache\'leyen doğru akışı sırala.',
          en: 'Sequence the correct flow that aliases a user fixture and then caches the login with a session.',
        },
        starterCommands: {
          tr: `cy.visit('/dashboard')
cy.login('qa_user', 'Secret123')
cy.fixture('users.json').as('users')
cy.get('header').should('contain', this.users[0].name)`,
          en: `cy.visit('/dashboard')
cy.login('qa_user', 'Secret123')
cy.fixture('users.json').as('users')
cy.get('header').should('contain', this.users[0].name)`,
        },
        expectedSteps: [
          { label: { tr: 'Önce fixture verisini alias\'la', en: 'First alias the fixture data' }, pattern: "^cy\\.fixture\\(", example: "cy.fixture('users.json').as('users')" },
          { label: { tr: 'Login\'i session ile çağır (cache\'lenir veya geri yüklenir)', en: 'Call login with session (gets cached or restored)' }, pattern: '^cy\\.login\\(', example: "cy.login('qa_user', 'Secret123')" },
          { label: { tr: 'Sonra hedef sayfayı ziyaret et', en: 'Then visit the target page' }, pattern: '^cy\\.visit\\(', example: "cy.visit('/dashboard')" },
          { label: { tr: 'Son olarak alias\'lanan veriyle assertion yap', en: 'Finally assert using the aliased data' }, pattern: '^cy\\.get\\(', example: "cy.get('header').should(...)" },
        ],
        successOutput: {
          tr: 'Doğru akış: fixture alias\'landı, login session ile cache\'lendi/geri yüklendi, sayfa ziyaret edildi, alias\'lanan veriyle doğrulama yapıldı.',
          en: 'Correct flow: fixture aliased, login cached/restored via session, page visited, assertion made using the aliased data.',
        },
        retryOutput: {
          tr: 'Sıra yanlış — alias ve login, sayfayı ziyaret etmeden ve assertion yapmadan ÖNCE hazır olmalı.',
          en: 'Order is wrong — the alias and login must be ready BEFORE visiting the page and asserting.',
        },
      },
      cypressSessionCacheFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.session() ikinci testte ne yapar?', en: 'What does cy.session() do on the second test?' },
        options: [
          { id: 'a', text: 'Login formunu yine doldurur ama daha hızlı yapar' },
          { id: 'b', text: 'Cache\'lenen tarayıcı context\'ini (cookie/localStorage) geri yükler, login adımlarını tekrar çalıştırmaz' },
          { id: 'c', text: 'Testi otomatik olarak atlar (skip)' },
          { id: 'd', text: 'Sadece localStorage\'ı temizler' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cy.session() aynı parametrelerle (örn. aynı username/password) tekrar çağrıldığında, login fonksiyonunu YENİDEN çalıştırmaz — daha önce kaydedilen tarayıcı context\'ini (cookie, localStorage, sessionStorage) anında geri yükler.',
          en: 'When cy.session() is called again with the same parameters (e.g. the same username/password), it does NOT re-run the login function — it instantly restores the previously saved browser context (cookies, localStorage, sessionStorage).',
        },
      
        retryQuestion: {
      "question": {
            "tr": "cy.session() kullanıldığında, aynı oturum verilerinin ikinci kez kullanılmasının performansa etkisi nedir?",
            "en": "What is the performance impact of using the same session data for the second time when using cy.session()?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Login isteğini tekrar göndererek sunucu yükünü artırır",
                        "en": "Increases server load by resending the login request"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Login süreçlerini atlayarak testin çok daha hızlı başlamasını sağlar",
                        "en": "It skips the login steps, allowing the test to start much faster"
                  }
            },
            {
                  "id": "c",
                  "text": "Testin süresini uzatır",
                  "en": "It increases the test duration"
            },
            {
                  "id": "d",
                  "text": "Browser belleğini tamamen temizleyerek testi yavaşlatır",
                  "en": "It slows down the test by clearing the browser memory completely"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cy.session(), daha önce önbelleğe alınmış oturum bilgilerini geri yüklediği için login adımlarını (UI ile giriş yapma veya API isteği) atlar, bu da test süresini önemli ölçüde kısaltır.",
            "en": "Since cy.session() restores previously cached session information, it skips the login steps (UI interaction or API requests), which significantly reduces the test execution time."
      }
}
},
    ],
  },
  en: {
    title: '🔗 Variables, Aliases & Test Isolation',
    blocks: [
      {
        type: 'simple-box', emoji: '📝',
        content: "Because Cypress commands are asynchronous, you can't grab a command's result mid-chain and assign it to a plain variable — like trying to pluck a product off a moving conveyor belt and set it on a side table: the belt keeps moving and by the time you reach, the product is already gone. So how do you safely access a command's result later in the chain? .as('orderId') places that result on a named shelf; cy.get('@orderId') retrieves it at exactly the right moment — the belt never has to stop. In Java, you use thenApply() to work with a CompletableFuture's result rather than calling .get() directly, which risks blocking; the .as()/.get('@') pair operates on the same principle: Cypress knows when it's ready, you just provide the name. Test Isolation is the backdrop to all of this: if cookies, localStorage, and session data leak between tests, one test's alias can corrupt the next, and a test that appears to PASS is actually leaning on state left behind by a previous one — when CI switches to parallel or randomized execution order, the entire suite collapses.",
      },
      {
        type: 'text',
        content: "Cypress commands are asynchronous, so you can't assign a command's result directly to a variable (const email = cy.get(...) does NOT work, because cy.get() returns a command object, not a value, at that point). To access the result you use either a closure inside .then(), or an alias created with .as().",
      },
      {
        type: 'code', label: '.then() closure — one-time access',
        language: 'javascript',
        code: `cy.get('button').then(($btn) => {
  const text = $btn.text()           // access the current DOM value
  cy.get('form').submit()
  cy.get('button').should(($btn2) => {
    expect($btn2.text()).not.to.eq(text)   // compare against the previous value
  })
})`,
      },
      {
        type: 'code', label: '.as() alias — reusable reference',
        language: 'javascript',
        code: `beforeEach(() => {
  cy.fixture('users.json').as('users')   // aliases reset before EVERY test
})

it('shows the first user\\'s name', function () {
  cy.get('header').should('contain', this.users[0].name)
})`,
      },
      {
        type: 'table',
        headers: ['Method', 'Behavior', 'When to use'],
        rows: [
          ['this.alias', 'A static snapshot — read once', 'Fixed data, like fixture content'],
          ["cy.get('@alias')", 'RE-RUNS the query, returns a fresh result', 'Things that can change, like DOM elements'],
          ['.then(($el) => {...})', 'One-time access inside a closure, NO retry-ability', 'A one-off read/calculation'],
        ],
      },
      {
        type: 'text',
        content: "Test Isolation is Cypress's default behavior: before every test the browser visits about:blank, all cookies/localStorage/sessionStorage are cleared, and aliases/stubs/spies/clock mocks are reset. This prevents one test from secretly affecting another — the most common cause of flaky tests.",
      },
      {
        type: 'code', label: 'cy.session() — cache login across tests',
        language: 'javascript',
        code: `// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-cy=username]').type(username)
    cy.get('[data-cy=password]').type(password)
    cy.get('form').contains('Log In').click()
  })
})

// in every spec
beforeEach(() => {
  cy.login('qa_user', 'Secret123')   // test 1: really logs in
  cy.visit('/dashboard')              // test 2: instantly restored from cache
})`,
      },
      {
        type: 'java-compare',
        topic: 'Shared State Risk (TestNG/JUnit) vs Cypress Test Isolation',
        java: `// In JUnit, if you're not careful:
static List<String> sharedCart = new ArrayList<>();  // LEAKS between tests
@Test void test1() { sharedCart.add("item1"); }
@Test void test2() { /* sharedCart still contains item1! */ }`,
        typescript: `// In Cypress, by default:
it('test 1', () => { cy.window().then(w => w.cart = ['item1']) })
it('test 2', () => {
  // cookies/localStorage/sessionStorage were auto-cleared
  // window.cart is GONE — leaking is impossible
})`,
        why: { tr: "JUnit/TestNG'de static/shared değişkenler dikkatsizce kullanılırsa testler arasında state sızar ve testler birbirine bağımlı hale gelir. Cypress bu riski mimari seviyede ortadan kaldırır.", en: "In JUnit/TestNG, careless use of static/shared variables leaks state between tests and makes them interdependent. Cypress removes this risk at the architecture level: before every test it FORCIBLY visits about:blank and resets the browser context." },
        note: { tr: "Test isolation performans için kapatılabilir (testIsolation: false) ama bu, JUnit'teki paylaşılan state riskini geri getirir.", en: 'Test isolation can be disabled for performance (testIsolation: false), but this brings back the same shared-state risk as JUnit — only use it in deliberate, controlled scenarios.' },
      },
      {
        type: 'simulation',
        scenario: 'cypress-session-cache',
        color: '#a78bfa',
        title: { tr: 'cy.session() — Login Cache Canlı İzle', en: 'cy.session() — Watch Login Caching Live' },
        description: { tr: 'İlk test gerçekten login olur ve session\'ı kaydeder; ikinci test login formunu hiç doldurmadan doğrudan dashboard\'a "zıplar".', en: 'The first test really logs in and saves the session; the second test "jumps" straight to the dashboard without ever filling the login form.' },
      },
      {
        type: 'git-practice',
        icon: '🔗',
        title: { tr: 'Try It Yourself: Alias + session akışını doğru diz', en: 'Try It Yourself: Arrange the alias + session flow' },
        intro: {
          tr: "Bir kullanıcı verisini fixture'dan alias'la, sonra login'i session ile cache'leyen doğru akışı sırala.",
          en: 'Sequence the correct flow that aliases a user fixture and then caches the login with a session.',
        },
        starterCommands: {
          tr: `cy.visit('/dashboard')
cy.login('qa_user', 'Secret123')
cy.fixture('users.json').as('users')
cy.get('header').should('contain', this.users[0].name)`,
          en: `cy.visit('/dashboard')
cy.login('qa_user', 'Secret123')
cy.fixture('users.json').as('users')
cy.get('header').should('contain', this.users[0].name)`,
        },
        expectedSteps: [
          { label: { tr: "Önce fixture verisini alias'la", en: 'First alias the fixture data' }, pattern: '^cy\\.fixture\\(', example: "cy.fixture('users.json').as('users')" },
          { label: { tr: "Login'i session ile çağır (cache'lenir veya geri yüklenir)", en: 'Call login with session (gets cached or restored)' }, pattern: '^cy\\.login\\(', example: "cy.login('qa_user', 'Secret123')" },
          { label: { tr: 'Sonra hedef sayfayı ziyaret et', en: 'Then visit the target page' }, pattern: '^cy\\.visit\\(', example: "cy.visit('/dashboard')" },
          { label: { tr: "Son olarak alias'lanan veriyle assertion yap", en: 'Finally assert using the aliased data' }, pattern: '^cy\\.get\\(', example: "cy.get('header').should(...)" },
        ],
        successOutput: {
          tr: "Doğru akış: fixture alias'landı, login session ile cache'lendi/geri yüklendi, sayfa ziyaret edildi, alias'lanan veriyle doğrulama yapıldı.",
          en: 'Correct flow: fixture aliased, login cached/restored via session, page visited, assertion made using the aliased data.',
        },
        retryOutput: {
          tr: "Sıra yanlış — alias ve login, sayfayı ziyaret etmeden ve assertion yapmadan ÖNCE hazır olmalı.",
          en: 'Order is wrong — the alias and login must be ready BEFORE visiting the page and asserting.',
        },
      },
      cypressSessionCacheFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.session() ikinci testte ne yapar?', en: 'What does cy.session() do on the second test?' },
        options: [
          { id: 'a', text: 'It fills the login form again, just faster' },
          { id: 'b', text: 'It restores the cached browser context (cookies/localStorage) without re-running the login steps' },
          { id: 'c', text: 'It automatically skips the test' },
          { id: 'd', text: 'It only clears localStorage' },
        ],
        correct: 'b',
        explanation: {
          tr: "cy.session() aynı parametrelerle tekrar çağrıldığında, login fonksiyonunu YENİDEN çalıştırmaz — daha önce kaydedilen tarayıcı context'ini anında geri yükler.",
          en: "When cy.session() is called again with the same parameters, it does NOT re-run the login function — it instantly restores the previously saved browser context.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "cy.session() ile kaydedilen bir oturum, bir sonraki test dosyasında nasıl davranış gösterir?",
            "en": "How does a session saved with cy.session() behave in the next test file?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Her dosya kendi oturumunu yeniden oluşturmak zorundadır",
                        "en": "Each file must recreate its own session"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Aynı parametrelerle çağrıldığında, oturumu sıfırdan kurmak yerine mevcut oturumu yeniden kullanır",
                        "en": "When called with the same parameters, it reuses the existing session instead of setting it up from scratch"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Tarayıcıyı tamamen kapatır ve logout yapar",
                        "en": "It completely closes the browser and logs out"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece localStorage'ı siler ancak cookie'leri tutar",
                        "en": "It only clears localStorage but keeps cookies"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cy.session(), oturum durumunu yönetir ve aynı kimlik bilgileriyle (id/key) çağrıldığında, oturum açma maliyetinden kaçınarak testler arasında oturumun devamlılığını sağlar.",
            "en": "cy.session() manages the session state and, when called with the same identifiers/keys, enables session persistence across tests by avoiding redundant login costs."
      }
}
},
    ],
  },
}

// 🧩 Component Testing — cy.mount() izolasyon filmi
const cypressMountIsolationFilm = {
  type: 'video-scene',
  id: 'cypress-mount-isolation-film',
  title: {
    tr: '🎬 cy.mount(): Sunucu, Router ve Uygulama Olmadan Tek Bir Component Render',
    en: '🎬 cy.mount(): Rendering One Component With No Server, Router, or App',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'file', emoji: '📄', label: { tr: 'Counter.jsx', en: 'Counter.jsx' }, color: '#0ea5e9' },
    { id: 'bundler', emoji: '📦', label: { tr: 'Vite Bundler', en: 'Vite Bundler' }, color: '#f59e0b' },
    { id: 'sandbox', emoji: '🧪', label: { tr: 'İzole Test Sandbox\'ı', en: 'Isolated Test Sandbox' }, color: '#8b5cf6' },
    { id: 'fullapp', emoji: '👻', label: { tr: 'Server/Router/Redux (YOK)', en: 'Server/Router/Redux (ABSENT)' }, color: '#94a3b8' },
    { id: 'result', emoji: '✅', label: { tr: 'Gerçek Tarayıcıda Render', en: 'Rendered in a Real Browser' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Counter.jsx component\'i normalde sunucu + router + Redux store\'un HEPSİ ayağa kalkınca çalışıyor. cy.mount() bu bağımlılıkların HİÇBİRİ olmadan onu nasıl çalıştırıyor?',
        en: 'Counter.jsx normally only runs once the server + router + Redux store ALL boot up. How does cy.mount() run it with NONE of those dependencies?',
      },
      positions: { file: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — cy.mount(<Counter />) çağrıldığında, Vite (ya da Webpack) SADECE Counter.jsx dosyasını ve onun doğrudan import ettiklerini derler — tüm uygulamayı DEĞİL.',
        en: 'Step 1 — When cy.mount(<Counter />) is called, Vite (or Webpack) compiles ONLY Counter.jsx and its direct imports — NOT the entire application.',
      },
      code: { tr: `import Counter from './Counter'\ncy.mount(<Counter />)`, en: `import Counter from './Counter'\ncy.mount(<Counter />)` },
      positions: {
        file: { x: 20, y: 40, scale: 1.0 },
        bundler: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'file', to: 'bundler', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Bundler\'ın ürettiği küçük bundle, gerçek bir tarayıcıda (jsdom değil, Chromium) minimal bir izole sandbox\'a enjekte edilir — server/router/Redux store hiç var OLMAZ.',
        en: 'Step 2 — The small bundle the bundler produces is injected into a minimal isolated sandbox in a real browser (Chromium, not jsdom) — no server/router/Redux store ever exists.',
      },
      positions: {
        bundler: { x: 22, y: 40, scale: 0.95 },
        sandbox: { x: 55, y: 55, scale: 1.2, pulse: true },
        fullapp: { x: 80, y: 30, opacity: 0.3, scale: 0.8 },
      },
      beams: [{ from: 'bundler', to: 'sandbox', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 (kontrast) — cy.visit() kullansaydın: tarayıcı gerçek bir URL\'e gider, sunucu ayağa kalkmalı, router tüm sayfayı render etmeli, Redux store gerçek verilerle dolmalı — Counter\'ı görmek için TÜM bunlar gerekirdi.',
        en: 'Step 3 (the contrast) — if you used cy.visit() instead: the browser navigates to a real URL, the server must boot, the router must render the whole page, the Redux store must fill with real data — you\'d need ALL of that just to see the Counter.',
      },
      code: { tr: `// cy.visit() ile: TÜM zincir gerekli\ncy.visit('/dashboard')  // server + router + store + ...\ncy.get('[data-cy=counter]')  // sayfanın DERİNLİKLERİNDE`, en: `// with cy.visit(): the FULL chain is needed\ncy.visit('/dashboard')  // server + router + store + ...\ncy.get('[data-cy=counter]')  // buried DEEP in the page` },
      positions: {
        sandbox: { x: 22, y: 40, scale: 0.9 },
        fullapp: { x: 58, y: 55, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'sandbox', to: 'fullapp', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Adım 4 — cy.mount() ile: Counter, gerçek DOM\'da render olur, cy.get(\'[data-cy=increment]\').click() gerçek bir tıklamadır, retry-ability/auto-wait built-in\'dir — ama BUNLARIN HİÇBİRİ için server/router/store gerekmez.',
        en: 'Step 4 — with cy.mount(): Counter renders into a real DOM, cy.get(\'[data-cy=increment]\').click() is a real click, retry-ability/auto-wait are built-in — but NONE of it needs a server/router/store.',
      },
      code: { tr: `cy.get('[data-cy=increment]').click()\ncy.get('[data-cy=count]').should('have.text', '1')`, en: `cy.get('[data-cy=increment]').click()\ncy.get('[data-cy=count]').should('have.text', '1')` },
      positions: {
        fullapp: { x: 20, y: 30, opacity: 0.25, scale: 0.75 },
        result: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'sandbox', to: 'result', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da Spring\'in @WebMvcTest\'i tüm Spring context\'ini AYAĞA KALDIRMADAN sadece MVC katmanını test eder, servis/repository bean\'lerini mock\'lar. cy.mount() de aynı izolasyon felsefesiyle çalışır: tüm React ağacını değil, SADECE ilgilendiğin component\'i başlatırsın — bu yüzden component testleri E2E\'den kat kat hızlıdır.',
        en: 'The lesson — in Java, Spring\'s @WebMvcTest tests only the MVC layer WITHOUT booting the entire Spring context, mocking the service/repository beans. cy.mount() follows the same isolation philosophy: you boot only the component you care about, not the whole React tree — which is why component tests run many times faster than E2E.',
      },
      positions: {
        result: { x: 35, y: 50, scale: 1.1 },
        fullapp: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

const s13 = {
  tr: {
    title: '🧩 Component Testing',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Component Testing, bir React bileşenini gerçek bir tarayıcıda — ama tüm uygulamayı başlatmadan — izole olarak çalıştırmaktır: tıpkı bir uçak motorunu test pistine çekmeden önce fabrika tezgahına bağlayıp tek başına çalıştırman gibi — pist, gövde, yakıt sistemi, pilot kabini hiçbiri gerekmez, yalnızca motorun kendi parametreleri içinde doğru çalışıp çalışmadığına bakarsın. Peki E2E testleri zaten tarayıcıda çalışıyorken neden ayrı bir Component Testing altyapısına ihtiyaç var? Çünkü bir bileşenin edge case\'lerini (hata durumu, boş state, erişilebilirlik) E2E akışı üzerinden tetiklemek çok pahalıdır — 3 sayfalık bir login akışı geçmeden "ödeme butonu disabled iken tooltip gösteriyor mu?" sorusunu soramazsın. Java\'da Spring\'te @WebMvcTest yalnızca MVC katmanını başlatır, servis ve repository bean\'lerini mocklar — Component Testing de bileşenin Spring\'i gibidir: sadece o katmanı başlatıp yüksek hızda test edersin. QA için kritik risk: jsdom tabanlı unit testler (Jest + RTL) gerçek tarayıcı DOM\'unu çalıştırmaz, CSS/layout/scroll sorunlarını göremez; Component Testing ise Chromium içinde koştuğu için o sınıf görsel hataları da yakalar — E2E\'ye geç kalınmadan önce bir filtre görevi görür.',
      },
      {
        type: 'text',
        content: 'cy.mount() komutu, component\'i gerçek bir tarayıcıda (jsdom gibi sahte bir DOM\'da değil) render eder. Bu yüzden Cypress dokümantasyonunun da belirttiği gibi, "component\'leri kullanıcıların göreceği şekilde test edersin" — render gerçek, retry-ability ve auto-wait built-in, waitFor() veya act() yazmana gerek yoktur.',
      },
      {
        type: 'code', label: 'cy.mount() — React Counter Örneği',
        language: 'javascript',
        code: `import Counter from './Counter'

describe('<Counter />', () => {
  it('artı butonuna tıklayınca sayaç artar', () => {
    cy.mount(<Counter />)
    cy.get('[data-cy=increment]').click()
    cy.get('[data-cy=count]').should('have.text', '1')
  })

  it('onChange event\\'ini doğru değerle tetikler', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(<Counter onChange={onChangeSpy} />)
    cy.get('[data-cy=increment]').click()
    cy.get('@onChangeSpy').should('have.been.calledWith', 1)
  })
})`,
      },
      {
        type: 'table',
        headers: ['', 'E2E Testing (cy.visit)', 'Component Testing (cy.mount)'],
        rows: [
          ['Kapsam', 'Tüm uygulama + server + router', 'Sadece tek bir component'],
          ['Sunucu gerekir mi?', '✅ Evet, backend çalışmalı', '❌ Hayır, sadece bundler (Vite/Webpack)'],
          ['Hız', 'Daha yavaş — gerçek navigasyon', 'Çok hızlı — anında render'],
          ['En iyi kullanım', 'Kullanıcı akışları, entegrasyon', 'Tek bir bileşenin tüm prop/state varyasyonları'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'JUnit + Mockito İzole Servis Testi vs cy.mount() İzole Component Testi',
        java: `@ExtendWith(MockitoExtension.class)
class CartServiceTest {
  @Mock PaymentGateway gateway;   // tüm Spring context'i AYAĞA KALKMAZ
  @InjectMocks CartService cartService;

  @Test void appliesDiscount() {
    when(gateway.isValid(any())).thenReturn(true);
    assertEquals(90, cartService.applyDiscount(100));
  }
}`,
        typescript: `describe('<DiscountBadge />', () => {
  it('applies discount visually', () => {
    cy.mount(<DiscountBadge price={100} discount={10} />)
    // tüm React app/router AYAĞA KALKMAZ, sadece bu component
    cy.get('[data-cy=final-price]').should('have.text', '90')
  })
})`,
        why: { tr: 'Mockito\'da @Mock ile dış bağımlılıkları (PaymentGateway) sahteleştirip sadece CartService\'i izole edersin — tüm Spring context\'ini ayağa kaldırmadan. cy.mount() de aynı felsefeyle, tüm React/Vue uygulamasını açmadan tek bir component\'i izole eder.', en: 'In Mockito, @Mock fakes out external dependencies (PaymentGateway) so you isolate just CartService — without booting the whole Spring context. cy.mount() follows the same philosophy, isolating a single component without launching the entire React/Vue app.' },
        note: { tr: 'Component Testing, E2E testlerin YERİNE geçmez — ikisi birbirini tamamlar: component testleri hızlı/izole birim doğrulaması, E2E testleri gerçek kullanıcı akışı doğrulaması yapar.', en: "Component Testing doesn't REPLACE E2E tests — they complement each other: component tests give fast/isolated unit-level verification, E2E tests verify real user flows." },
      },
      {
        type: 'simulation',
        scenario: 'cypress-component-mount',
        color: '#10b981',
        title: { tr: 'cy.mount() — İzole Component Render', en: 'cy.mount() — Isolated Component Render' },
        description: { tr: 'Run\'a bas: SADECE Counter component\'i (tüm sayfa değil) gerçek tarayıcıda render olur, tıklanınca sayaç artar ve spy çağrısı doğrulanır.', en: 'Click Run: ONLY the Counter component (not the whole page) renders in a real browser, the counter increments on click, and the spy call is verified.' },
      },
      {
        type: 'git-practice',
        icon: '🧩',
        title: { tr: 'Try It Yourself: Component testing kurulum sırası', en: 'Try It Yourself: Component testing setup order' },
        intro: {
          tr: 'cypress open komutundan component testi çalıştırmaya kadar olan adımları doğru sıraya diz.',
          en: 'Arrange the steps from running cypress open to actually running a component test, in the right order.',
        },
        starterCommands: {
          tr: `cy.mount(<Counter />) ile ilk component testini yaz
Cypress otomatik olarak React/Vue/Angular'ı algılar
npx cypress open komutunu çalıştır
"Component Testing" seçeneğini seç
Önerilen bağımlılıkları (adapter) kur`,
          en: `Write the first component test with cy.mount(<Counter />)
Cypress auto-detects React/Vue/Angular
Run npx cypress open
Choose the "Component Testing" option
Install the suggested dependencies (adapter)`,
        },
        expectedSteps: [
          { label: { tr: 'Cypress\'i aç', en: 'Open Cypress' }, pattern: 'cypress open', example: 'npx cypress open' },
          { label: { tr: 'Component Testing\'i seç', en: 'Choose Component Testing' }, pattern: 'component testing', example: 'Select "Component Testing"' },
          { label: { tr: 'Framework otomatik algılansın', en: 'Let the framework auto-detect' }, pattern: 'algılar|detect', example: 'React/Vue/Angular auto-detected' },
          { label: { tr: 'Bağımlılıkları kur', en: 'Install dependencies' }, pattern: 'bağımlılık|dependenc', example: 'Install adapter dependencies' },
          { label: { tr: 'İlk component testini yaz', en: 'Write the first component test' }, pattern: 'cy\\.mount', example: 'cy.mount(<Counter />)' },
        ],
        successOutput: {
          tr: 'Doğru sıra: Cypress aç → Component Testing seç → framework algılansın → bağımlılıkları kur → cy.mount() ile test yaz.',
          en: 'Correct order: open Cypress → choose Component Testing → let it auto-detect the framework → install dependencies → write a test with cy.mount().',
        },
        retryOutput: {
          tr: 'Sıra yanlış — kurulum sihirbazı bitmeden cy.mount() yazmaya çalışmak hataya yol açar.',
          en: 'Order is wrong — trying to write cy.mount() before the setup wizard finishes leads to errors.',
        },
      },
      cypressMountIsolationFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.mount() ile cy.visit() arasındaki temel fark nedir?', en: 'What is the fundamental difference between cy.mount() and cy.visit()?' },
        options: [
          { id: 'a', text: 'cy.mount() sadece mobilde çalışır' },
          { id: 'b', text: 'cy.mount() tek bir component\'i izole render eder, cy.visit() tüm uygulamayı (server dahil) açar' },
          { id: 'c', text: 'İkisi de aynı şeyi yapar, isim farkı vardır' },
          { id: 'd', text: 'cy.mount() sadece API testleri için kullanılır' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cy.mount(), Component Testing\'in temel komutudur: bir tek component\'i bağımsız olarak render eder, backend gerektirmez. cy.visit() ise E2E testte tüm uygulamayı (sunucu, router, tüm sayfa) gerçek bir URL üzerinden açar.',
          en: 'cy.mount() is the core Component Testing command: it renders a single component independently, with no backend required. cy.visit() in E2E testing loads the entire app (server, router, full page) via a real URL.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki senaryolardan hangisinde cy.mount() yerine cy.visit() tercih edilmelidir?",
            "en": "In which of the following scenarios should cy.visit() be preferred over cy.mount()?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Küçük bir buton component'ini test ederken",
                        "en": "Testing a small button component"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Bir formun sadece input validasyonlarını denerken",
                        "en": "Trying only input validations of a form"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Uygulamanın ana sayfasındaki kullanıcı akışını (login-to-checkout) test ederken",
                        "en": "Testing the user flow (login-to-checkout) on the application homepage"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Bir navbar component'inin rengini kontrol ederken",
                        "en": "Checking the color of a navbar component"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "cy.mount() tek bir component'in izole testleri için uygundur. Tüm uygulamanın sayfalar arası geçişlerini ve entegre akışlarını test etmek için cy.visit() kullanılarak gerçek bir URL üzerinden tarayıcı yüklenmelidir.",
            "en": "cy.mount() is suitable for isolated tests of a single component. To test cross-page transitions and integrated flows of the entire application, you must use cy.visit() to load the browser via a real URL."
      }
}
},
    ],
  },
  en: {
    title: '🧩 Component Testing',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: "Component Testing means running a single React/Vue/Angular component in a real browser in isolation — like mounting an aircraft engine on a factory test stand before rolling the plane out to the runway: the fuselage, cockpit, and fuel system are completely absent; you verify only whether the engine itself performs within its own parameters. But if E2E tests already run in the browser, why invest in a separate Component Testing infrastructure? Because triggering a component's edge cases (error state, empty state, accessibility behavior) through a full E2E flow is expensive — you can't ask \"does the payment button show a tooltip when disabled?\" without first navigating through a three-page login flow. In Java, Spring's @WebMvcTest boots only the MVC layer and mocks the service and repository beans; Component Testing is the browser equivalent: only that layer spins up, so the feedback loop is fast. The critical QA risk: jsdom-based unit tests (Jest + RTL) don't run a real browser DOM and miss CSS, layout, and scroll bugs; Component Testing runs in Chromium and catches that entire class of visual defects before they ever reach an E2E suite.",
      },
      {
        type: 'text',
        content: "The cy.mount() command renders the component in a real browser (not a fake DOM like jsdom). As Cypress's own docs put it, \"you test components exactly as they will behave for your users\" — rendering is real, retry-ability and auto-waiting are built-in, and you never need to write waitFor() or act().",
      },
      {
        type: 'code', label: 'cy.mount() — React Counter Example',
        language: 'javascript',
        code: `import Counter from './Counter'

describe('<Counter />', () => {
  it('increments counter on button click', () => {
    cy.mount(<Counter />)
    cy.get('[data-cy=increment]').click()
    cy.get('[data-cy=count]').should('have.text', '1')
  })

  it('fires onChange event with the new value', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(<Counter onChange={onChangeSpy} />)
    cy.get('[data-cy=increment]').click()
    cy.get('@onChangeSpy').should('have.been.calledWith', 1)
  })
})`,
      },
      {
        type: 'table',
        headers: ['', 'E2E Testing (cy.visit)', 'Component Testing (cy.mount)'],
        rows: [
          ['Scope', 'Whole app + server + router', 'A single component only'],
          ['Server required?', '✅ Yes, backend must be running', '❌ No, just a bundler (Vite/Webpack)'],
          ['Speed', 'Slower — real navigation', 'Very fast — instant render'],
          ['Best for', 'User flows, integration', 'All prop/state variations of one component'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'JUnit + Mockito Isolated Service Test vs cy.mount() Isolated Component Test',
        java: `@ExtendWith(MockitoExtension.class)
class CartServiceTest {
  @Mock PaymentGateway gateway;   // the WHOLE Spring context does NOT boot
  @InjectMocks CartService cartService;

  @Test void appliesDiscount() {
    when(gateway.isValid(any())).thenReturn(true);
    assertEquals(90, cartService.applyDiscount(100));
  }
}`,
        typescript: `describe('<DiscountBadge />', () => {
  it('applies discount visually', () => {
    cy.mount(<DiscountBadge price={100} discount={10} />)
    // the whole React app/router does NOT boot, only this component
    cy.get('[data-cy=final-price]').should('have.text', '90')
  })
})`,
        why: { tr: "Mockito'da @Mock ile dış bağımlılıkları sahteleştirip sadece CartService'i izole edersin. cy.mount() de aynı felsefeyle, tüm React/Vue uygulamasını açmadan tek bir component'i izole eder.", en: 'In Mockito, @Mock fakes out external dependencies (PaymentGateway) so you isolate just CartService — without booting the whole Spring context. cy.mount() follows the same philosophy, isolating a single component without launching the entire React/Vue app.' },
        note: { tr: "Component Testing, E2E testlerin YERİNE geçmez — ikisi birbirini tamamlar.", en: "Component Testing doesn't REPLACE E2E tests — they complement each other: component tests give fast/isolated unit-level verification, E2E tests verify real user flows." },
      },
      {
        type: 'simulation',
        scenario: 'cypress-component-mount',
        color: '#10b981',
        title: { tr: 'cy.mount() — İzole Component Render', en: 'cy.mount() — Isolated Component Render' },
        description: { tr: 'Run\'a bas: SADECE Counter component\'i (tüm sayfa değil) gerçek tarayıcıda render olur, tıklanınca sayaç artar ve spy çağrısı doğrulanır.', en: 'Click Run: ONLY the Counter component (not the whole page) renders in a real browser, the counter increments on click, and the spy call is verified.' },
      },
      {
        type: 'git-practice',
        icon: '🧩',
        title: { tr: 'Try It Yourself: Component testing kurulum sırası', en: 'Try It Yourself: Component testing setup order' },
        intro: {
          tr: 'cypress open komutundan component testi çalıştırmaya kadar olan adımları doğru sıraya diz.',
          en: 'Arrange the steps from running cypress open to actually running a component test, in the right order.',
        },
        starterCommands: {
          tr: `cy.mount(<Counter />) ile ilk component testini yaz
Cypress otomatik olarak React/Vue/Angular'ı algılar
npx cypress open komutunu çalıştır
"Component Testing" seçeneğini seç
Önerilen bağımlılıkları (adapter) kur`,
          en: `Write the first component test with cy.mount(<Counter />)
Cypress auto-detects React/Vue/Angular
Run npx cypress open
Choose the "Component Testing" option
Install the suggested dependencies (adapter)`,
        },
        expectedSteps: [
          { label: { tr: "Cypress'i aç", en: 'Open Cypress' }, pattern: 'cypress open', example: 'npx cypress open' },
          { label: { tr: "Component Testing'i seç", en: 'Choose Component Testing' }, pattern: 'component testing', example: 'Select "Component Testing"' },
          { label: { tr: 'Framework otomatik algılansın', en: 'Let the framework auto-detect' }, pattern: 'algılar|detect', example: 'React/Vue/Angular auto-detected' },
          { label: { tr: 'Bağımlılıkları kur', en: 'Install dependencies' }, pattern: 'bağımlılık|dependenc', example: 'Install adapter dependencies' },
          { label: { tr: 'İlk component testini yaz', en: 'Write the first component test' }, pattern: 'cy\\.mount', example: 'cy.mount(<Counter />)' },
        ],
        successOutput: {
          tr: 'Doğru sıra: Cypress aç → Component Testing seç → framework algılansın → bağımlılıkları kur → cy.mount() ile test yaz.',
          en: 'Correct order: open Cypress → choose Component Testing → let it auto-detect the framework → install dependencies → write a test with cy.mount().',
        },
        retryOutput: {
          tr: 'Sıra yanlış — kurulum sihirbazı bitmeden cy.mount() yazmaya çalışmak hataya yol açar.',
          en: 'Order is wrong — trying to write cy.mount() before the setup wizard finishes leads to errors.',
        },
      },
      cypressMountIsolationFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.mount() ile cy.visit() arasındaki temel fark nedir?', en: 'What is the fundamental difference between cy.mount() and cy.visit()?' },
        options: [
          { id: 'a', text: 'cy.mount() only works on mobile' },
          { id: 'b', text: 'cy.mount() renders a single component in isolation, cy.visit() loads the whole app including the server' },
          { id: 'c', text: 'They do the same thing, just with a different name' },
          { id: 'd', text: 'cy.mount() is only used for API testing' },
        ],
        correct: 'b',
        explanation: {
          tr: "cy.mount(), Component Testing'in temel komutudur: bir tek component'i bağımsız olarak render eder. cy.visit() ise E2E testte tüm uygulamayı gerçek bir URL üzerinden açar.",
          en: "cy.mount() is the core Component Testing command: it renders a single component independently, with no backend required. cy.visit() in E2E testing loads the entire app (server, router, full page) via a real URL.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress Component Testing bağlamında, cy.mount() komutunu kullanmanın temel amacı nedir?",
            "en": "In the context of Cypress Component Testing, what is the primary purpose of using the cy.mount() command?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "To navigate between different pages in an E2E test"
            },
            {
                  "id": "b",
                  "text": "To render a specific UI component in a isolated test environment without loading the entire application"
            },
            {
                  "id": "c",
                  "text": "To automate browser window resizing"
            },
            {
                  "id": "d",
                  "text": "To verify that a specific API endpoint returns a 200 OK status"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cy.mount(), izole edilmiş bir ortamda belirli bir bileşeni render etmek için kullanılır. cy.visit() ise uygulamayı bir URL üzerinden tam kapsamlı olarak yükler.",
            "en": "cy.mount() is specifically designed to mount a single component into a test sandbox. cy.visit() is meant for E2E testing to load the full application via a URL."
      }
}
},
    ],
  },
}

// 🎭 Stubs, Spies, Clock & Fixtures — cy.stub() ile ödeme servisini sarmalama filmi
const cypressStubPaymentFilm = {
  type: 'video-scene',
  id: 'cypress-stub-payment-film',
  title: {
    tr: '🎬 cy.stub() Olmadan CI\'da Gerçek Para Kaybetmek',
    en: '🎬 Losing Real Money in CI Without cy.stub()',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test', emoji: '🧪', label: { tr: 'Checkout Testi', en: 'Checkout Test' }, color: '#8b5cf6' },
    { id: 'realgw', emoji: '💳', label: { tr: 'GERÇEK Ödeme Gateway\'i', en: 'REAL Payment Gateway' }, color: '#ef4444' },
    { id: 'money', emoji: '💸', label: { tr: 'Gerçek İşlem (her CI koşumunda!)', en: 'Real Transaction (every CI run!)' }, color: '#ef4444' },
    { id: 'stub', emoji: '🎭', label: { tr: 'cy.stub(paymentApi, \'charge\')', en: 'cy.stub(paymentApi, \'charge\')' }, color: '#22c55e' },
    { id: 'fake', emoji: '✅', label: { tr: 'Sahte { success: true }', en: 'Fake { success: true }' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Checkout testi her CI koşumunda "Ödemeyi Tamamla" butonuna tıklıyor — bu buton GERÇEKTEN paymentApi.charge()\'ı çağırıyorsa, her push\'ta ne olur?',
        en: 'The checkout test clicks "Complete Payment" on every CI run — if that button REALLY calls paymentApi.charge(), what happens on every push?',
      },
      positions: { test: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 (tehlike) — stub YOKSA: test butona tıklar, gerçek kod çalışır, paymentApi.charge() GERÇEK bir ödeme sağlayıcısına (Stripe/iyzico) gerçek bir istek atar.',
        en: 'Step 1 (the danger) — WITHOUT a stub: the test clicks the button, the real code runs, paymentApi.charge() fires a genuine request to a real payment provider (Stripe/iyzico).',
      },
      code: { tr: `cy.get('[data-cy=pay]').click()\n// paymentApi.charge() GERÇEKTEN çalışır!`, en: `cy.get('[data-cy=pay]').click()\n// paymentApi.charge() REALLY runs!` },
      positions: {
        test: { x: 20, y: 40, scale: 1.0 },
        realgw: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test', to: 'realgw', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 2 (hayalet) — bu test günde 20 kez CI\'da koşarsa, ödeme sağlayıcısına 20 GERÇEK işlem gönderilir — test kartı kullanılmıyorsa gerçek para hareket edebilir, sağlayıcı hesabı fraud olarak işaretleyebilir.',
        en: 'Step 2 (the ghost) — if this test runs 20 times a day in CI, 20 REAL transactions get sent to the payment provider — if a test card isn\'t used, real money can move, and the provider may flag the account as fraud.',
      },
      positions: {
        realgw: { x: 22, y: 40, scale: 0.95 },
        money: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'realgw', to: 'money', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 3 (düzeltme) — cy.stub(paymentApi, \'charge\').returns({ success: true }) yazılır. Bu, fonksiyonun GERÇEK kodunu tamamen devre dışı bırakır — hiçbir ağ isteği atılmaz.',
        en: 'Step 3 (the fix) — cy.stub(paymentApi, \'charge\').returns({ success: true }) is written. This completely DISABLES the function\'s real code — no network request is ever sent.',
      },
      code: { tr: `cy.stub(paymentApi, 'charge').returns({ success: true })\ncy.get('[data-cy=pay]').click()\n// GERÇEK gateway'e HİÇ dokunulmadı`, en: `cy.stub(paymentApi, 'charge').returns({ success: true })\ncy.get('[data-cy=pay]').click()\n// the REAL gateway was NEVER touched` },
      positions: {
        money: { x: 20, y: 55, opacity: 0.3 },
        stub: { x: 55, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test', to: 'stub', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — checkout akışı normal şekilde devam eder ("Ödeme başarılı" mesajı görünür) ama arka planda sadece SENİN verdiğin sahte cevap döndü — test istediğin senaryoyu (başarı, timeout, red) tam kontrollü şekilde üretebilir.',
        en: 'Step 4 — the checkout flow continues normally ("Payment successful" appears), but under the hood only the FAKE response you provided was returned — the test can produce exactly the scenario you want (success, timeout, decline) under full control.',
      },
      positions: {
        stub: { x: 22, y: 40, scale: 0.95 },
        fake: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'stub', to: 'fake', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Java\'da Mockito.mock(PaymentGateway.class) ile birebir aynı riski önlersin: entegrasyon testinde gerçek bir dış servisi çağırmak yerine, when(gateway.charge(any())).thenReturn(...) ile davranışı KONTROLLÜ hale getirirsin. cy.stub() ve Mockito.mock() aynı mimari kararın iki farklı dildeki karşılığıdır.',
        en: 'The lesson — in Java, Mockito.mock(PaymentGateway.class) prevents the exact same risk: instead of calling a real external service in an integration test, when(gateway.charge(any())).thenReturn(...) makes the behavior CONTROLLED. cy.stub() and Mockito.mock() are the same architectural decision in two different languages.',
      },
      positions: {
        fake: { x: 35, y: 50, scale: 1.1 },
        realgw: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

const s14 = {
  tr: {
    title: '🎭 Stubs, Spies, Clock & Fixtures',
    blocks: [
      {
        type: 'simple-box', emoji: '🎭',
        content: 'cy.stub() bir fonksiyonun orijinal davranışını tamamen devre dışı bırakır ve senin söylediğin yanıtı döndürür — tıpkı uçuş simülatöründeki "motor arızası" düğmesi gibi: gerçek motor çalışmaz, çalışmamalıdır da, ama pilotun tepkisini test etmek için tam olarak o senaryoya ihtiyacın var. cy.spy() ise davranışı değiştirmeden gözlemler — gerçek motor açık kalır ama kaç devir yaptığını, hangi parametreyle çalıştığını kayıt altına alırsın. Ama şunu sor kendine: cy.intercept() de ağ çağrılarını taklit ediyor — o varken neden cy.stub() da gerekli? Çünkü cy.intercept() yalnızca HTTP katmanını yakalar; uygulama içindeki bir analitik fonksiyonu, bir tarih API\'sini veya dosya sistemi çağrısını taklit etmek için cy.stub() şarttır. Java\'da bu Mockito\'nun mock() ve spy() ayrımının birebir karşılığıdır: mock() tüm davranışı kontrol eder, spy() gerçek nesneyi sarar ve yalnızca seçili çağrıları izler. QA\'nın gerçek iş riski şudur: ödeme servisini gerçekten çağıran bir test, her çalıştırmada canlı bir işlem yapar, para hareketi oluşabilir — cy.stub() ile ödeme gateway\'ini saralmazsan CI pipeline\'ında gerçek para kaybedebilirsin.',
      },
      {
        type: 'text',
        content: 'cy.stub(), bir fonksiyonun davranışını DEĞİŞTİRİR — gerçek kodu çalıştırmadan sahte bir cevap döndürür ya da hata fırlatır. cy.spy() ise fonksiyonun orijinal davranışını KORUR, sadece çağrıldığını ve hangi argümanlarla çağrıldığını izler. Bu ayrım Mockito\'daki mock() vs spy() ayrımının birebir aynısıdır.',
      },
      {
        type: 'code', label: 'cy.stub() — sahte cevap / hata',
        language: 'javascript',
        code: `cy.stub(paymentApi, 'charge').returns({ success: true })
cy.stub(paymentApi, 'charge').rejects(new Error('Gateway timeout'))
// gerçek ödeme servisi HİÇ çağrılmaz, test kontrollü senaryoyu test eder`,
      },
      cypressStubVsFakeStep,
      {
        type: 'code', label: 'cy.spy() — orijinal davranışı koru, çağrıyı izle',
        language: 'javascript',
        code: `cy.spy(user, 'updateEmail')
cy.get('[data-cy=save]').click()
cy.wrap(user.updateEmail).should('have.been.calledWith', 'new@test.com')
// updateEmail gerçekten çalıştı, AMA çağrı bilgisi de kaydedildi`,
      },
      cypressSpyVsTrackStep,
      {
        type: 'code', label: 'cy.clock() / cy.tick() — sahte zaman',
        language: 'javascript',
        code: `cy.clock()                     // gerçek zamanı dondur
cy.visit('/dashboard')         // setTimeout(loadStats, 5000) tetiklenir ama BEKLEMEZ
cy.tick(5000)                  // sahte saati 5000ms ileri al
cy.contains('İstatistikler yüklendi').should('be.visible')
cy.clock().invoke('restore')   // gerçek zamana geri dön`,
      },
      {
        type: 'code', label: 'cy.fixture() — statik test verisi',
        language: 'javascript',
        code: `cy.fixture('users.json').then((users) => {
  cy.intercept('GET', '/api/users', { body: users })
})
// cypress/fixtures/users.json içindeki sahte veri API yanıtı gibi kullanılır`,
      },
      {
        type: 'table',
        headers: ['Araç', 'Ne yapar', 'Ne zaman kullan'],
        rows: [
          ['cy.stub()', 'Davranışı değiştirir, sahte cevap/hata döner', 'Dış servisi (ödeme, 3. parti API) kontrollü test etmek için'],
          ['cy.spy()', 'Orijinal davranışı korur, çağrıları izler', "Bir fonksiyonun doğru parametrelerle çağrıldığını doğrulamak için"],
          ['cy.clock()/.tick()', 'Zamanı dondurur/ileri alır', 'setTimeout/setInterval/debounce/throttle test etmek için'],
          ['cy.fixture()', 'JSON/dosya sabit veri okur', 'cy.intercept() ile birlikte sahte API yanıtı vermek için'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'Mockito mock()/spy() vs Cypress stub()/spy()',
        java: `PaymentGateway gateway = Mockito.mock(PaymentGateway.class);
when(gateway.charge(any())).thenReturn(new Result(true));  // stub gibi

UserService realService = new UserService();
UserService spyService = Mockito.spy(realService);          // spy
verify(spyService).updateEmail("new@test.com");`,
        typescript: `cy.stub(paymentApi, 'charge').returns({ success: true })   // mock() gibi

cy.spy(user, 'updateEmail')                                  // spy()
cy.wrap(user.updateEmail).should('have.been.calledWith', 'new@test.com')`,
        why: { tr: 'Mockito.mock() orijinal davranışı tamamen siler, sahte bir nesne oluşturur — cy.stub() aynı işi yapar. Mockito.spy() ise gerçek nesneyi sarmalar ve çağrıları izlerken orijinal davranışı korur — cy.spy() de birebir aynı mantıkla çalışır.', en: 'Mockito.mock() completely replaces the original behavior with a fake object — cy.stub() does the same job. Mockito.spy() wraps the real object and tracks calls while preserving the original behavior — cy.spy() works with the exact same logic.' },
        note: { tr: 'Thread.sleep() ile gerçek zaman beklemek yerine cy.clock()/cy.tick() sahte bir zaman makinesi kurar — bu, Java\'da bir zaman kütüphanesini (örn. Clock.fixed()) enjekte etmenin testteki karşılığıdır.', en: "Instead of really waiting with Thread.sleep(), cy.clock()/cy.tick() build a fake time machine — this is the test-world equivalent of injecting a fixed time library (e.g. Clock.fixed()) in Java." },
      },
      {
        type: 'simulation',
        scenario: 'cypress-stub-clock',
        color: '#f59e0b',
        title: { tr: 'cy.clock() + cy.tick() — Zamanı Anında Atla', en: 'cy.clock() + cy.tick() — Skip Time Instantly' },
        description: { tr: '5 saniyelik bir setTimeout\'u gerçekten beklemeden, sahte saati ileri alarak anında tetikle.', en: 'Trigger a 5-second setTimeout instantly by fast-forwarding the fake clock, without really waiting.' },
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Try It Yourself: stub/spy/clock akışını doğru diz', en: 'Try It Yourself: Arrange the stub/spy/clock flow' },
        intro: {
          tr: 'Ödeme servisini stub\'la, kullanıcı güncellemesini spy\'la ve zamanı sahte saatle ileri al — doğru sırayı bul.',
          en: 'Stub the payment service, spy on the user update, and fast-forward time with the fake clock — find the right order.',
        },
        starterCommands: {
          tr: `cy.tick(5000)
cy.clock()
cy.spy(user, 'updateEmail')
cy.stub(paymentApi, 'charge').returns({ success: true })`,
          en: `cy.tick(5000)
cy.clock()
cy.spy(user, 'updateEmail')
cy.stub(paymentApi, 'charge').returns({ success: true })`,
        },
        expectedSteps: [
          { label: { tr: 'Önce dış servisi stub\'la', en: 'First stub the external service' }, pattern: '^cy\\.stub\\(', example: "cy.stub(paymentApi, 'charge')..." },
          { label: { tr: 'İzlenecek fonksiyona spy koy', en: 'Spy on the function to track' }, pattern: '^cy\\.spy\\(', example: "cy.spy(user, 'updateEmail')" },
          { label: { tr: 'Sahte saati başlat', en: 'Start the fake clock' }, pattern: '^cy\\.clock\\(', example: 'cy.clock()' },
          { label: { tr: 'Saati ileri al', en: 'Fast-forward the clock' }, pattern: '^cy\\.tick\\(', example: 'cy.tick(5000)' },
        ],
        successOutput: {
          tr: 'Doğru sıra: stub → spy → clock başlat → tick ile ileri al. cy.clock() her zaman cy.tick()\'ten ÖNCE çağrılmalı.',
          en: 'Correct order: stub → spy → start clock → tick forward. cy.clock() must always be called BEFORE cy.tick().',
        },
        retryOutput: {
          tr: 'Sıra yanlış — cy.tick() çağırmadan önce cy.clock() ile saati başlatmadıysan hata alırsın.',
          en: "Order is wrong — calling cy.tick() before starting the clock with cy.clock() throws an error.",
        },
      },
      cypressStubPaymentFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.stub() ile cy.spy() arasındaki temel fark nedir?', en: 'What is the fundamental difference between cy.stub() and cy.spy()?' },
        options: [
          { id: 'a', text: 'İkisi de aynı şeyi yapar' },
          { id: 'b', text: 'stub() davranışı DEĞİŞTİRİR (sahte cevap döner), spy() orijinal davranışı KORUYUP sadece çağrıları izler' },
          { id: 'c', text: 'stub() sadece API çağrıları için, spy() sadece DOM olayları için kullanılır' },
          { id: 'd', text: 'spy() asenkron, stub() senkrondur' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cy.stub() bir fonksiyonun gerçek çalışmasını tamamen ENGELLER ve senin verdiğin sahte cevabı/hatayı döner. cy.spy() ise fonksiyonun gerçek çalışmasına izin verir, sadece hangi parametrelerle ve kaç kez çağrıldığını kaydeder.',
          en: 'cy.stub() completely PREVENTS a function from really running and returns the fake response/error you provide. cy.spy() lets the function run normally, just recording which arguments it was called with and how many times.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Bir birim testinde, bir fonksiyonun iç mantığını çalıştırmadan sadece çağrılıp çağrılmadığını kontrol etmek istiyorsak hangisini kullanmalıyız?",
            "en": "If we want to verify if a function was called without executing its internal logic during a unit test, which one should we use?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "cy.stub()"
            },
            {
                  "id": "b",
                  "text": "cy.spy()"
            },
            {
                  "id": "c",
                  "text": "cy.visit()"
            },
            {
                  "id": "d",
                  "text": "cy.get()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cy.spy(), fonksiyonun orijinal çalışmasını bozmadan sadece çağrı kayıtlarını (argümanlar, çağrılma sayısı) takip etmenize olanak tanır. stub() ise fonksiyonu tamamen devre dışı bırakır.",
            "en": "cy.spy() allows you to track function calls (arguments, call counts) without modifying the original implementation. stub() would completely override or disable the function execution."
      }
}
},
    ],
  },
  en: {
    title: '🎭 Stubs, Spies, Clock & Fixtures',
    blocks: [
      {
        type: 'simple-box', emoji: '🎭',
        content: "cy.stub() completely replaces a function's original behavior and returns whatever you tell it to — like a flight simulator's \"engine failure\" button: the real engine doesn't run (and shouldn't), but you need exactly that scenario to test the pilot's response. cy.spy() observes without intervening — the real engine stays on, but you record every RPM, every parameter. Here's the question worth asking: cy.intercept() already mocks network calls — so when do you actually need cy.stub()? Because cy.intercept() only intercepts the HTTP layer; to fake an in-app analytics function, a date API, or a third-party SDK method, cy.stub() is essential. In Java, this is the direct equivalent of Mockito's mock() vs spy() split: mock() controls all behavior, spy() wraps the real object and only intercepts selected calls. The real QA business risk: a test that calls the real payment service executes a live transaction on every run — if you don't wrap the payment gateway with cy.stub(), your CI pipeline can lose real money.",
      },
      {
        type: 'text',
        content: "cy.stub() CHANGES a function's behavior — it returns a fake response or throws an error without running the real code. cy.spy() PRESERVES the function's original behavior, only tracking that it was called and with which arguments. This distinction is exactly the same as Mockito's mock() vs spy().",
      },
      {
        type: 'code', label: 'cy.stub() — fake response / error',
        language: 'javascript',
        code: `cy.stub(paymentApi, 'charge').returns({ success: true })
cy.stub(paymentApi, 'charge').rejects(new Error('Gateway timeout'))
// the real payment service is NEVER called, you test a controlled scenario`,
      },
      cypressStubVsFakeStep,
      {
        type: 'code', label: 'cy.spy() — keep original behavior, track the call',
        language: 'javascript',
        code: `cy.spy(user, 'updateEmail')
cy.get('[data-cy=save]').click()
cy.wrap(user.updateEmail).should('have.been.calledWith', 'new@test.com')
// updateEmail really ran, BUT the call info was also recorded`,
      },
      cypressSpyVsTrackStep,
      {
        type: 'code', label: 'cy.clock() / cy.tick() — fake time',
        language: 'javascript',
        code: `cy.clock()                     // freeze real time
cy.visit('/dashboard')         // setTimeout(loadStats, 5000) is scheduled but does NOT wait
cy.tick(5000)                  // fast-forward the fake clock by 5000ms
cy.contains('Stats loaded').should('be.visible')
cy.clock().invoke('restore')   // go back to real time`,
      },
      {
        type: 'code', label: 'cy.fixture() — static test data',
        language: 'javascript',
        code: `cy.fixture('users.json').then((users) => {
  cy.intercept('GET', '/api/users', { body: users })
})
// the fake data in cypress/fixtures/users.json is used as the API response`,
      },
      {
        type: 'table',
        headers: ['Tool', 'What it does', 'When to use'],
        rows: [
          ['cy.stub()', 'Changes behavior, returns a fake response/error', 'Controlled testing of an external service (payment, 3rd-party API)'],
          ['cy.spy()', 'Preserves original behavior, tracks calls', 'Verifying a function was called with the right arguments'],
          ['cy.clock()/.tick()', 'Freezes/fast-forwards time', 'Testing setTimeout/setInterval/debounce/throttle'],
          ['cy.fixture()', 'Reads static JSON/file data', 'Providing a fake API response together with cy.intercept()'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'Mockito mock()/spy() vs Cypress stub()/spy()',
        java: `PaymentGateway gateway = Mockito.mock(PaymentGateway.class);
when(gateway.charge(any())).thenReturn(new Result(true));  // like a stub

UserService realService = new UserService();
UserService spyService = Mockito.spy(realService);          // spy
verify(spyService).updateEmail("new@test.com");`,
        typescript: `cy.stub(paymentApi, 'charge').returns({ success: true })   // like mock()

cy.spy(user, 'updateEmail')                                  // spy()
cy.wrap(user.updateEmail).should('have.been.calledWith', 'new@test.com')`,
        why: { tr: "Mockito.mock() orijinal davranışı tamamen siler, sahte bir nesne oluşturur — cy.stub() aynı işi yapar. Mockito.spy() ise gerçek nesneyi sarmalar.", en: 'Mockito.mock() completely replaces the original behavior with a fake object — cy.stub() does the same job. Mockito.spy() wraps the real object and tracks calls while preserving the original behavior — cy.spy() works with the exact same logic.' },
        note: { tr: "Thread.sleep() ile gerçek zaman beklemek yerine cy.clock()/cy.tick() sahte bir zaman makinesi kurar.", en: "Instead of really waiting with Thread.sleep(), cy.clock()/cy.tick() build a fake time machine — this is the test-world equivalent of injecting a fixed time library (e.g. Clock.fixed()) in Java." },
      },
      {
        type: 'simulation',
        scenario: 'cypress-stub-clock',
        color: '#f59e0b',
        title: { tr: 'cy.clock() + cy.tick() — Zamanı Anında Atla', en: 'cy.clock() + cy.tick() — Skip Time Instantly' },
        description: { tr: '5 saniyelik bir setTimeout\'u gerçekten beklemeden, sahte saati ileri alarak anında tetikle.', en: 'Trigger a 5-second setTimeout instantly by fast-forwarding the fake clock, without really waiting.' },
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Try It Yourself: stub/spy/clock akışını doğru diz', en: 'Try It Yourself: Arrange the stub/spy/clock flow' },
        intro: {
          tr: "Ödeme servisini stub'la, kullanıcı güncellemesini spy'la ve zamanı sahte saatle ileri al — doğru sırayı bul.",
          en: 'Stub the payment service, spy on the user update, and fast-forward time with the fake clock — find the right order.',
        },
        starterCommands: {
          tr: `cy.tick(5000)
cy.clock()
cy.spy(user, 'updateEmail')
cy.stub(paymentApi, 'charge').returns({ success: true })`,
          en: `cy.tick(5000)
cy.clock()
cy.spy(user, 'updateEmail')
cy.stub(paymentApi, 'charge').returns({ success: true })`,
        },
        expectedSteps: [
          { label: { tr: "Önce dış servisi stub'la", en: 'First stub the external service' }, pattern: '^cy\\.stub\\(', example: "cy.stub(paymentApi, 'charge')..." },
          { label: { tr: 'İzlenecek fonksiyona spy koy', en: 'Spy on the function to track' }, pattern: '^cy\\.spy\\(', example: "cy.spy(user, 'updateEmail')" },
          { label: { tr: 'Sahte saati başlat', en: 'Start the fake clock' }, pattern: '^cy\\.clock\\(', example: 'cy.clock()' },
          { label: { tr: 'Saati ileri al', en: 'Fast-forward the clock' }, pattern: '^cy\\.tick\\(', example: 'cy.tick(5000)' },
        ],
        successOutput: {
          tr: "Doğru sıra: stub → spy → clock başlat → tick ile ileri al.",
          en: 'Correct order: stub → spy → start clock → tick forward. cy.clock() must always be called BEFORE cy.tick().',
        },
        retryOutput: {
          tr: 'Sıra yanlış — cy.tick() çağırmadan önce cy.clock() ile saati başlatmadıysan hata alırsın.',
          en: "Order is wrong — calling cy.tick() before starting the clock with cy.clock() throws an error.",
        },
      },
      cypressStubPaymentFilm,
      {
        type: 'quiz',
        question: { tr: 'cy.stub() ile cy.spy() arasındaki temel fark nedir?', en: 'What is the fundamental difference between cy.stub() and cy.spy()?' },
        options: [
          { id: 'a', text: 'They do the same thing' },
          { id: 'b', text: 'stub() CHANGES behavior (returns a fake response), spy() PRESERVES original behavior and only tracks calls' },
          { id: 'c', text: 'stub() is only for API calls, spy() is only for DOM events' },
          { id: 'd', text: 'spy() is asynchronous, stub() is synchronous' },
        ],
        correct: 'b',
        explanation: {
          tr: 'cy.stub() bir fonksiyonun gerçek çalışmasını tamamen ENGELLER. cy.spy() ise fonksiyonun gerçek çalışmasına izin verir, sadece çağrıyı kaydeder.',
          en: 'cy.stub() completely PREVENTS a function from really running and returns the fake response/error you provide. cy.spy() lets the function run normally, just recording which arguments it was called with and how many times.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki ifadelerden hangisi cy.stub() kullanımını en doğru şekilde tanımlar?",
            "en": "Which of the following statements most accurately defines the use of cy.stub()?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It keeps the original function alive but monitors the execution"
            },
            {
                  "id": "b",
                  "text": "It overrides the function and returns a specific value or result instead of running the original code"
            },
            {
                  "id": "c",
                  "text": "It is used to delay test execution by a set amount of milliseconds"
            },
            {
                  "id": "d",
                  "text": "It allows interaction with DOM elements like buttons and inputs"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cy.stub(), fonksiyonun orijinal içeriğini geçersiz kılar ve döndüreceği değeri kontrol etmenizi sağlar; bu, bağımlılıkları taklit etmek için idealdir.",
            "en": "cy.stub() replaces the original function logic with your own specified behavior, allowing you to force a specific return value, which is ideal for mocking dependencies."
      }
}
},
    ],
  },
}

// 🐞 Debugging & Selector Playground — time-travel debugging filmi
const cypressTimeTravelDebugFilm = {
  type: 'video-scene',
  id: 'cypress-time-travel-debug-film',
  title: {
    tr: '🎬 Time-Travel Debugging: Hiç Kod Yazmadan Geçmişe Git',
    en: '🎬 Time-Travel Debugging: Go Back in Time Without Writing Code',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'cmd1', emoji: '1️⃣', label: { tr: 'cy.visit(\'/cart\')', en: 'cy.visit(\'/cart\')' }, color: '#0ea5e9' },
    { id: 'cmd2', emoji: '2️⃣', label: { tr: 'cy.get(\'[data-cy=add]\').click()', en: 'cy.get(\'[data-cy=add]\').click()' }, color: '#8b5cf6' },
    { id: 'cmd3', emoji: '3️⃣', label: { tr: 'cy.get(\'[data-cy=total]\').should(...)', en: 'cy.get(\'[data-cy=total]\').should(...)' }, color: '#ef4444' },
    { id: 'log', emoji: '📜', label: { tr: 'Command Log', en: 'Command Log' }, color: '#94a3b8' },
    { id: 'snapshot', emoji: '📸', label: { tr: 'DOM Snapshot #2', en: 'DOM Snapshot #2' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir test 3. komutta fail oluyor: total\'in "20" olmasını bekliyordu ama "10" bulundu. Java/Selenium\'da bunu anlamak için println eklemen gerekirdi — Cypress\'te nasıl?',
        en: 'A test fails on the 3rd command: it expected total to be "20" but found "10". In Java/Selenium you\'d need to add println statements to understand this — how does Cypress do it?',
      },
      positions: { cmd1: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Cypress her komuttan (cy.visit, cy.get, .click, .should...) SONRA otomatik olarak o anki DOM\'un bir "fotoğrafını" (snapshot) çeker ve Command Log\'a bir satır ekler — hiçbir ekstra kod yazmadan.',
        en: 'Step 1 — after EVERY command (cy.visit, cy.get, .click, .should...), Cypress automatically takes a "photo" (snapshot) of the DOM at that moment and adds a line to the Command Log — with zero extra code.',
      },
      positions: {
        cmd1: { x: 20, y: 40, scale: 1.0 },
        log: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'cmd1', to: 'log', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 2 — cy.get(\'[data-cy=add]\').click() çalışır, Command Log\'a 2. satır eklenir — o anki DOM\'un snapshot\'ı da bu satıra bağlıdır.',
        en: 'Step 2 — cy.get(\'[data-cy=add]\').click() runs, a 2nd line is added to the Command Log — the DOM snapshot at that exact moment is attached to this line too.',
      },
      positions: {
        log: { x: 22, y: 40, scale: 1.0 },
        cmd2: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'log', to: 'cmd2', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 (hata) — 3. komut cy.get(\'[data-cy=total]\').should(\'have.text\', \'20\') FAIL olur: gerçek metin "10"dur. Test burada durur, kırmızı bir satır Command Log\'da işaretlenir.',
        en: 'Step 3 (the failure) — the 3rd command cy.get(\'[data-cy=total]\').should(\'have.text\', \'20\') FAILS: the actual text is "10". The test stops here, a red line marks it in the Command Log.',
      },
      code: { tr: `cy.get('[data-cy=total]').should('have.text', '20')\n// AssertionError: expected '10' to equal '20'`, en: `cy.get('[data-cy=total]').should('have.text', '20')\n// AssertionError: expected '10' to equal '20'` },
      positions: {
        cmd2: { x: 20, y: 40, scale: 0.95 },
        cmd3: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'cmd2', to: 'cmd3', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 4 (kontrast — asıl güç) — hiçbir ekstra kod yazmadan, Command Log\'da 2. satıra (add\'e tıklama) TIKLARSIN — uygulama o anki DOM haline geri "ışınlanır": ürün gerçekten sepete eklenmiş mi, miktar doğru mu görürsün.',
        en: 'Step 4 (the contrast — the real power) — WITHOUT writing any extra code, you CLICK on line 2 (the add click) in the Command Log — the app "teleports" back to the DOM state at that moment: you see whether the item was really added, whether the quantity is right.',
      },
      positions: {
        cmd3: { x: 22, y: 40, scale: 0.9 },
        snapshot: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'cmd3', to: 'snapshot', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Selenium/Java\'da bu tür bir "geçmişi tekrar oynatma" YOKTUR: testi tekrar çalıştırıp bir breakpoint koymak ya da ekstra ekran görüntüsü almak gerekir. Cypress\'te snapshot\'lar ZATEN oradadır — sen sadece geriye tıklarsın, bu yüzden "time-travel debugging" denir.',
        en: 'The lesson — this kind of "replaying the past" does NOT exist in Selenium/Java: you\'d need to re-run the test with a breakpoint or take extra screenshots. In Cypress the snapshots are ALREADY there — you just click backward, which is why it\'s called "time-travel debugging".',
      },
      positions: {
        snapshot: { x: 35, y: 50, scale: 1.1 },
        cmd1: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

const s15 = {
  tr: {
    title: '🐞 Debugging & Selector Playground',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'Cypress\'in debugging üstünlüğü şuradan gelir: her komuttan sonra otomatik DOM snapshot alındığı için test başarısız olduğunda zaten elinizde tam bir kara kutu kaydı vardır — tıpkı bir uçak kazasında kara kutu açıldığında son 30 dakikanın sesinin ve telemetrisinin orada olması gibi, hiçbir şey ekstra kayıt etmek zorunda kalmadan. Peki o zaman cy.pause() ve cy.debug() neden gerekli, kara kutu yetmiyor mu? Çünkü kara kutu kazadan sonra okunur; canlı geliştirme sırasında, test daha başarısız olmadan önce nereye gitmekte olduğunu görmek istiyorsun — cy.pause() testi tam o anda dondurur ve DOM\'u serbestçe inceleme fırsatı verir. cy.debug() ise o anki DOM elementini doğrudan DevTools konsoluna aktarır ve jQuery metodlarıyla sorgulayabilirsin. Java\'da bunu Eclipse veya IntelliJ debugger\'ında breakpoint koyarak Watches panelinden değişkeni incelemekle kıyaslayabilirsin. Selector Playground ise QA\'nın gerçek iş sorununu çözer: bir elementi bulmak için XPath mı, CSS mi, data-cy mi kullanmalısın — Playground önce kırılganlık sırasına göre önerir, tek bir eşleşme verip vermediğini anında test edersin, CI\'da "element bulunamadı" hatasını yazarken değil, yazarken önlersin.',
      },
      {
        type: 'text',
        content: 'Cypress\'in en büyük debugging avantajı, her komuttan sonra otomatik DOM snapshot\'ı almasıdır — bu yüzden çoğu zaman ekstra log/debug kodu YAZMADAN, sadece Command Log\'da geçmiş bir adıma tıklayarak (time-travel) neyin yanlış gittiğini görürsün. Ekstra araçlar gerektiğinde ise cy.debug(), cy.pause() ve Selector Playground devreye girer.',
      },
      {
        type: 'code', label: 'cy.debug() ve cy.pause()',
        language: 'javascript',
        code: `cy.get('[data-cy=total]').debug()
// → DevTools console'a "Current subject" olarak $total jQuery elementini yazar

cy.get('[data-cy=checkout]').click()
cy.pause()
// → test burada DURUR, "Resume" tuşuna basana kadar DOM'u serbestçe incele
cy.get('[data-cy=confirmation]').should('be.visible')`,
      },
      {
        type: 'code', label: 'debugger ile .then() içinde breakpoint',
        language: 'javascript',
        code: `cy.get('[data-cy=price]').then(($el) => {
  debugger   // DevTools açıksa burada gerçek bir breakpoint olur
  const price = parseFloat($el.text())
  expect(price).to.be.greaterThan(0)
})`,
      },
      {
        type: 'table',
        headers: ['Araç', 'Ne işe yarar', 'Ne zaman kullan'],
        rows: [
          ['Time-Travel (Command Log)', 'Her komutun otomatik DOM snapshot\'ı', 'İlk başvurulacak yer — ekstra kod yazmadan geçmişi gör'],
          ['cy.debug()', 'O anki subject\'i DevTools console\'a yazar', 'Bir elementin/değerin o anki halini hızlıca incelemek için'],
          ['cy.pause()', 'Testi tamamen durdurur, adım adım ilerletirsin', 'Karmaşık bir akışı yavaşça izlemek için'],
          ['Selector Playground (🎯)', 'Tıkladığın elemanın en iyi selector\'ını ve eşleşme sayısını gösterir', 'Doğru/kırılmaz selector bulmak için'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'System.out.println / Breakpoint Debugging vs Cypress Time-Travel',
        java: `// IntelliJ'de breakpoint koyup Debug modunda çalıştırırsın
System.out.println("price = " + price);  // veya
// Debugger: Step Over / Step Into ile değişkenleri incelersin`,
        typescript: `// Cypress'te genelde EKSTRA kod yazmadan:
// Command Log'da geçmiş bir adıma tıkla → o anki DOM otomatik geri gelir
cy.get('[data-cy=price]').debug()   // gerektiğinde DevTools'a yaz`,
        why: { tr: 'Java\'da debug yapmak için kodu DURDURMAN (breakpoint) veya ekstra println satırları eklemen gerekir. Cypress\'te test zaten her adımda bir "snapshot" bıraktığı için, çoğu debugging ekstra kod yazmadan Command Log\'da geriye tıklayarak yapılır — bu "time-travel debugging" Selenium/Java dünyasında YOKTUR.', en: "In Java, debugging requires STOPPING the code (a breakpoint) or adding extra println lines. In Cypress, since the test already leaves a \"snapshot\" at every step, most debugging happens by clicking backward in the Command Log without writing extra code — this \"time-travel debugging\" doesn't exist in the Selenium/Java world." },
        note: { tr: 'CI\'da flaky bir test mi var? Cypress Cloud\'un "Test Replay" özelliği, testi CI\'da TAM OLARAK çalıştığı haliyle tekrar oynatır — local\'de tekrar üretmeye çalışmak yerine doğrudan CI çalışmasını izlersin.', en: 'Got a flaky test in CI? Cypress Cloud\'s "Test Replay" feature replays the test EXACTLY as it ran in CI — instead of trying to reproduce it locally, you watch the actual CI run directly.' },
      },
      {
        type: 'simulation',
        scenario: 'cypress-selector-playground',
        color: '#f59e0b',
        title: { tr: 'Selector Playground — Gerçek Cypress Aracı', en: 'Selector Playground — The Real Cypress Tool' },
        description: { tr: 'Mini bir uygulama önizlemesinde bir elemana tıkla, Cypress\'in önerdiği en iyi selector\'ı ve kaç eşleşme bulduğunu canlı gör.', en: 'Click an element in the mini app preview and see live which selector Cypress recommends and how many matches it found.' },
      },
      {
        type: 'git-practice',
        icon: '🐞',
        title: { tr: 'Try It Yourself: Doğru debugging sırası', en: 'Try It Yourself: The right debugging order' },
        intro: {
          tr: 'Flaky/başarısız bir testte uygulanacak doğru debugging adımlarını sırala — rastgele kod eklemek yerine sistematik ilerle.',
          en: 'Sequence the correct debugging steps for a flaky/failing test — proceed systematically instead of adding random code.',
        },
        starterCommands: {
          tr: `cy.debug() veya cy.pause() ekle, DOM'u canlı incele
Hata mesajını ve hangi komutta patladığını oku
Command Log'da hatadan önceki adımlara tıkla (time-travel)
Sorunu düzelt, debug/pause satırlarını KALDIR
Testi tekrar çalıştırıp doğrula`,
          en: `Add cy.debug() or cy.pause(), inspect the DOM live
Read the error message and which command it failed on
Click the steps before the failure in the Command Log (time-travel)
Fix the issue, REMOVE the debug/pause lines
Re-run the test to confirm`,
        },
        expectedSteps: [
          { label: { tr: 'Önce hata mesajını oku', en: 'First read the error message' }, pattern: 'hata mesaj|error message', example: 'Read the error message' },
          { label: { tr: 'Command Log\'da time-travel yap', en: 'Time-travel in the Command Log' }, pattern: 'time-travel|command log', example: 'Click previous steps in the log' },
          { label: { tr: 'Gerekirse debug/pause ekle', en: 'Add debug/pause if needed' }, pattern: 'debug\\(\\)|pause\\(\\)', example: 'cy.debug() / cy.pause()' },
          { label: { tr: 'Sorunu düzelt ve debug satırlarını kaldır', en: 'Fix the issue and remove debug lines' }, pattern: 'kaldır|remove', example: 'Remove debug/pause lines' },
          { label: { tr: 'Testi tekrar çalıştır', en: 'Re-run the test' }, pattern: 'tekrar çalış|re-run', example: 'Run the test again' },
        ],
        successOutput: {
          tr: 'Doğru sıra: önce hatayı oku → time-travel ile geçmişi incele → gerekirse debug/pause ekle → düzelt ve debug kodunu kaldır → tekrar çalıştır.',
          en: 'Correct order: read the error first → inspect history via time-travel → add debug/pause if needed → fix and remove the debug code → re-run.',
        },
        retryOutput: {
          tr: 'Sıra yanlış — debug/pause satırlarını commit\'te bırakmak veya hatayı okumadan rastgele kod eklemek zaman kaybettirir.',
          en: 'Order is wrong — leaving debug/pause lines in a commit, or adding random code without reading the error, wastes time.',
        },
      },
      cypressTimeTravelDebugFilm,
      {
        type: 'quiz',
        question: { tr: 'Selector Playground bir elemana tıklandığında ne gösterir?', en: 'What does the Selector Playground show when you click an element?' },
        options: [
          { id: 'a', text: 'Elementin sadece rengini' },
          { id: 'b', text: 'Cypress\'in önerdiği en iyi selector\'ı ve sayfada kaç eşleşme bulduğunu' },
          { id: 'c', text: 'Elementin network isteğini' },
          { id: 'd', text: 'Sadece elementin XPath\'ini' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Selector Playground, tıkladığın elemanı analiz eder ve en güvenilir selector önerisini (varsa data-cy, yoksa diğer öznitelikler) kaç eşleşme bulduğu bilgisiyle birlikte gösterir — 1 eşleşme idealdir, daha fazlası kırılgan bir selector\'a işaret eder.',
          en: 'The Selector Playground analyzes the element you clicked and shows the most reliable selector suggestion (data-cy if available, otherwise other attributes) along with how many matches it found — 1 match is ideal, more than that signals a fragile selector.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Selector Playground'da bir HTML elemanını seçtiğinizde, aracın sağladığı en önemli geri bildirim nedir?",
            "en": "When you select an HTML element in the Selector Playground, what is the most important feedback the tool provides?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Elementin CSS sınıf listesi",
                        "en": "The list of the element's CSS classes"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Benzersiz tanımlayıcı önerisi ve benzersizlik durumu (eşleşme sayısı)",
                        "en": "The unique identifier suggestion and its uniqueness status (match count)"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Elementin DOM içindeki derinliği",
                        "en": "The depth of the element in the DOM"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Elementin tarayıcıdaki render süresi",
                        "en": "The render time of the element in the browser"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Selector Playground'un temel amacı, testlerinizin kararlılığını artırmak için benzersiz ve güvenilir bir selector oluşturmaktır. Eşleşme sayısı (match count), seçicinizin sayfada birden fazla elemanı etkileyip etkilemediğini anlamanızı sağlar.",
            "en": "The primary purpose of the Selector Playground is to generate a unique and reliable selector to increase the stability of your tests. The match count allows you to determine if your selector targets more than one element on the page."
      }
}
},
    ],
  },
  en: {
    title: '🐞 Debugging & Selector Playground',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: "Cypress's debugging advantage comes from this: since it automatically snapshots the DOM after every command, when a test fails you already have a full black-box recording — like the flight data recorder on an aircraft: after an incident, the last 30 minutes of audio and telemetry are right there without any extra recording step. But if the black box is already there, why do you need cy.pause() and cy.debug()? Because a black box is read after the crash; during live development you want to see where the test is heading before it fails — cy.pause() freezes the test at exactly that moment and lets you explore the DOM freely. cy.debug() pushes the current DOM element directly into the DevTools console where you can query it with jQuery methods. In Java, this is like setting a breakpoint in the Eclipse or IntelliJ debugger and inspecting variables in the Watches panel. The Selector Playground solves the real QA business problem: should you use XPath, CSS, or data-cy to find an element? The Playground recommends options in order of fragility, immediately verifies whether it produces a single unique match, and prevents \"element not found\" failures before they ever reach CI.",
      },
      {
        type: 'text',
        content: "Cypress's biggest debugging advantage is that it automatically snapshots the DOM after every command — so most of the time, WITHOUT writing extra log/debug code, you can just click a past step in the Command Log (time-travel) to see what went wrong. When extra tools are needed, cy.debug(), cy.pause(), and the Selector Playground come into play.",
      },
      {
        type: 'code', label: 'cy.debug() and cy.pause()',
        language: 'javascript',
        code: `cy.get('[data-cy=total]').debug()
// → prints the $total jQuery element to DevTools console as "Current subject"

cy.get('[data-cy=checkout]').click()
cy.pause()
// → the test STOPS here, freely inspect the DOM until you click "Resume"
cy.get('[data-cy=confirmation]').should('be.visible')`,
      },
      {
        type: 'code', label: 'A breakpoint inside .then() with debugger',
        language: 'javascript',
        code: `cy.get('[data-cy=price]').then(($el) => {
  debugger   // becomes a real breakpoint if DevTools is open
  const price = parseFloat($el.text())
  expect(price).to.be.greaterThan(0)
})`,
      },
      {
        type: 'table',
        headers: ['Tool', 'What it does', 'When to use'],
        rows: [
          ['Time-Travel (Command Log)', 'Automatic DOM snapshot for every command', 'The first place to look — see the past without writing extra code'],
          ['cy.debug()', 'Prints the current subject to the DevTools console', 'Quickly inspecting the current state of an element/value'],
          ['cy.pause()', 'Fully stops the test, step through it manually', 'Slowly watching a complex flow'],
          ['Selector Playground (🎯)', 'Shows the best selector and match count for the clicked element', 'Finding a correct, non-brittle selector'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'System.out.println / Breakpoint Debugging vs Cypress Time-Travel',
        java: `// In IntelliJ you set a breakpoint and run in Debug mode
System.out.println("price = " + price);  // or
// Debugger: inspect variables with Step Over / Step Into`,
        typescript: `// In Cypress, usually WITHOUT extra code:
// click a past step in the Command Log → the DOM at that moment comes back automatically
cy.get('[data-cy=price]').debug()   // log to DevTools when needed`,
        why: { tr: "Java'da debug yapmak için kodu DURDURMAN veya ekstra println satırları eklemen gerekir. Cypress'te test zaten her adımda bir snapshot bıraktığı için, çoğu debugging Command Log'da geriye tıklayarak yapılır.", en: "In Java, debugging requires STOPPING the code (a breakpoint) or adding extra println lines. In Cypress, since the test already leaves a \"snapshot\" at every step, most debugging happens by clicking backward in the Command Log without writing extra code — this \"time-travel debugging\" doesn't exist in the Selenium/Java world." },
        note: { tr: 'CI\'da flaky bir test mi var? Cypress Cloud\'un "Test Replay" özelliği testi CI\'da tam olarak çalıştığı haliyle tekrar oynatır.', en: 'Got a flaky test in CI? Cypress Cloud\'s "Test Replay" feature replays the test EXACTLY as it ran in CI — instead of trying to reproduce it locally, you watch the actual CI run directly.' },
      },
      {
        type: 'simulation',
        scenario: 'cypress-selector-playground',
        color: '#f59e0b',
        title: { tr: 'Selector Playground — Gerçek Cypress Aracı', en: 'Selector Playground — The Real Cypress Tool' },
        description: { tr: 'Mini bir uygulama önizlemesinde bir elemana tıkla, Cypress\'in önerdiği en iyi selector\'ı ve kaç eşleşme bulduğunu canlı gör.', en: 'Click an element in the mini app preview and see live which selector Cypress recommends and how many matches it found.' },
      },
      {
        type: 'git-practice',
        icon: '🐞',
        title: { tr: 'Try It Yourself: Doğru debugging sırası', en: 'Try It Yourself: The right debugging order' },
        intro: {
          tr: 'Flaky/başarısız bir testte uygulanacak doğru debugging adımlarını sırala.',
          en: 'Sequence the correct debugging steps for a flaky/failing test — proceed systematically instead of adding random code.',
        },
        starterCommands: {
          tr: `cy.debug() veya cy.pause() ekle, DOM'u canlı incele
Hata mesajını ve hangi komutta patladığını oku
Command Log'da hatadan önceki adımlara tıkla (time-travel)
Sorunu düzelt, debug/pause satırlarını KALDIR
Testi tekrar çalıştırıp doğrula`,
          en: `Add cy.debug() or cy.pause(), inspect the DOM live
Read the error message and which command it failed on
Click the steps before the failure in the Command Log (time-travel)
Fix the issue, REMOVE the debug/pause lines
Re-run the test to confirm`,
        },
        expectedSteps: [
          { label: { tr: 'Önce hata mesajını oku', en: 'First read the error message' }, pattern: 'hata mesaj|error message', example: 'Read the error message' },
          { label: { tr: "Command Log'da time-travel yap", en: 'Time-travel in the Command Log' }, pattern: 'time-travel|command log', example: 'Click previous steps in the log' },
          { label: { tr: 'Gerekirse debug/pause ekle', en: 'Add debug/pause if needed' }, pattern: 'debug\\(\\)|pause\\(\\)', example: 'cy.debug() / cy.pause()' },
          { label: { tr: 'Sorunu düzelt ve debug satırlarını kaldır', en: 'Fix the issue and remove debug lines' }, pattern: 'kaldır|remove', example: 'Remove debug/pause lines' },
          { label: { tr: 'Testi tekrar çalıştır', en: 'Re-run the test' }, pattern: 'tekrar çalış|re-run', example: 'Run the test again' },
        ],
        successOutput: {
          tr: 'Doğru sıra: önce hatayı oku → time-travel ile geçmişi incele → gerekirse debug/pause ekle → düzelt ve debug kodunu kaldır → tekrar çalıştır.',
          en: 'Correct order: read the error first → inspect history via time-travel → add debug/pause if needed → fix and remove the debug code → re-run.',
        },
        retryOutput: {
          tr: "Sıra yanlış — debug/pause satırlarını commit'te bırakmak zaman kaybettirir.",
          en: 'Order is wrong — leaving debug/pause lines in a commit, or adding random code without reading the error, wastes time.',
        },
      },
      cypressTimeTravelDebugFilm,
      {
        type: 'quiz',
        question: { tr: 'Selector Playground bir elemana tıklandığında ne gösterir?', en: 'What does the Selector Playground show when you click an element?' },
        options: [
          { id: 'a', text: "Only the element's color" },
          { id: 'b', text: "Cypress's recommended best selector and how many matches it found on the page" },
          { id: 'c', text: "The element's network request" },
          { id: 'd', text: "Only the element's XPath" },
        ],
        correct: 'b',
        explanation: {
          tr: 'Selector Playground, tıkladığın elemanı analiz eder ve en güvenilir selector önerisini kaç eşleşme bulduğu bilgisiyle birlikte gösterir.',
          en: 'The Selector Playground analyzes the element you clicked and shows the most reliable selector suggestion along with how many matches it found — 1 match is ideal, more than that signals a fragile selector.',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Selector Playground'un sunduğu en iyi selector önerisi ile ilgili hangisi doğrudur?",
            "en": "Which of the following is true regarding the best selector suggestion provided by the Selector Playground?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Her zaman sadece CSS sınıfını kullanır",
                        "en": "It always uses only the CSS class"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "1 eşleşme (match) ile benzersiz olan, kararlı bir selector hedefler",
                        "en": "It targets a stable selector that is unique with 1 match"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Her zaman sayfa başlığını değiştirir",
                        "en": "It always modifies the page title"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece id özniteliğini destekler",
                        "en": "It only supports the id attribute"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Playground, en spesifik ve kırılmaya dayanıklı (örneğin data-cy, data-test gibi) öznitelikleri önceliklendirerek tek bir benzersiz eşleşme bulmayı amaçlar.",
            "en": "The Playground prioritizes the most specific and breakage-resistant attributes (e.g., data-cy, data-test) to aim for a single unique match."
      }
}
},
    ],
  },
}

// ⚙️ CI/CD & Cross Browser Testing — cross-browser matrix'in yakaladığı sessiz bug filmi
const cypressCrossBrowserBugFilm = {
  type: 'video-scene',
  id: 'cypress-cross-browser-bug-film',
  title: {
    tr: '🎬 Chrome\'da PASS, Firefox\'ta FAIL: Matriks Neyi Yakalar?',
    en: '🎬 PASS on Chrome, FAIL on Firefox: What Does the Matrix Catch?',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'pr', emoji: '🔀', label: { tr: 'Pull Request', en: 'Pull Request' }, color: '#0ea5e9' },
    { id: 'chrome', emoji: '🟢', label: { tr: 'Chrome: PASS', en: 'Chrome: PASS' }, color: '#22c55e' },
    { id: 'firefox', emoji: '🦊', label: { tr: 'Firefox: ?', en: 'Firefox: ?' }, color: '#f59e0b' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Firefox: FAIL (sessiz bug)', en: 'Firefox: FAIL (silent bug)' }, color: '#ef4444' },
    { id: 'gate', emoji: '🚦', label: { tr: 'Merge Engellendi', en: 'Merge Blocked' }, color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir geliştirici yerelde SADECE Chrome\'da test çalıştırıp PR açıyor. Matrix\'te sadece Chrome olsaydı, bu PR merge olur muydu?',
        en: 'A developer runs tests locally in Chrome ONLY and opens a PR. If the matrix only had Chrome, would this PR get merged?',
      },
      positions: { pr: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — CI matrix\'i tek bir "cypress run" komutunu 3 farklı job\'a (Chrome, Firefox, Edge) böler ve AYNI ANDA paralel çalıştırır — matrix: { browser: [chrome, firefox, edge] }.',
        en: 'Step 1 — the CI matrix splits a single "cypress run" command into 3 separate jobs (Chrome, Firefox, Edge) and runs them ALL AT ONCE in parallel — matrix: { browser: [chrome, firefox, edge] }.',
      },
      code: { tr: `strategy:\n  matrix:\n    browser: [chrome, firefox, edge]`, en: `strategy:\n  matrix:\n    browser: [chrome, firefox, edge]` },
      positions: {
        pr: { x: 20, y: 40, scale: 1.0 },
        chrome: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'pr', to: 'chrome', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Chrome job\'ı biter: TÜM testler PASS. Geliştiricinin yerel makinesinde gördüğü sonuçla birebir aynı — çünkü zaten Chrome\'da test etmişti.',
        en: 'Step 2 — the Chrome job finishes: ALL tests PASS. Exactly what the developer saw on their local machine — because they tested in Chrome all along.',
      },
      positions: {
        chrome: { x: 22, y: 40, scale: 1.0 },
        firefox: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'chrome', to: 'firefox', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Adım 3 (kontrast) — Firefox job\'ı PARALEL çalışıyordu ve şimdi biter: bir CSS flex-gap özelliği Firefox\'un o an desteklediği versiyondan farklı render oluyor, bir buton görünmez kalıyor, test FAIL olur.',
        en: 'Step 3 (the contrast) — the Firefox job was running in PARALLEL and now finishes: a CSS flex-gap feature renders differently on that version of Firefox, a button stays hidden, and the test FAILS.',
      },
      code: { tr: `cy.get('[data-cy=checkout]').click()\n// Firefox: element not visible — flex-gap render farkı`, en: `cy.get('[data-cy=checkout]').click()\n// Firefox: element not visible — flex-gap render difference` },
      positions: {
        firefox: { x: 20, y: 40, scale: 0.9 },
        ghost: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'firefox', to: 'ghost', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Cypress Cloud, 3 job\'ın sonucunu group parametresiyle TEK bir raporda birleştirir: "2/3 browser PASS, Firefox FAIL" — kalite kapısı bu PR\'ı merge\'e KAPATIR.',
        en: 'Step 4 — Cypress Cloud merges the 3 jobs\' results into a SINGLE report via the group parameter: "2/3 browsers PASS, Firefox FAIL" — the quality gate BLOCKS this PR from merging.',
      },
      positions: {
        ghost: { x: 22, y: 40, scale: 0.95 },
        gate: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'ghost', to: 'gate', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Ders — matrix Chrome\'a sınırlı kalsaydı, bu PR sorunsuz PASS görünüp merge OLURDU ve sadece Firefox kullanan gerçek kullanıcılar production\'da checkout\'ı tamamlayamazdı — bug, müşteri şikayetiyle bulunurdu. Java\'da Maven Surefire\'ın forkCount\'u tek makinede paralellik sağlar; Cypress\'in CI matrix\'i FARKLI ortamlar arasında paralellik sağlayarak bambaşka bir sınıf hatayı yakalar.',
        en: 'The lesson — if the matrix had been limited to Chrome, this PR would have PASSed cleanly and gotten merged, and only real Firefox users would have been unable to complete checkout in production — the bug would have been found via customer complaints. In Java, Maven Surefire\'s forkCount gives parallelism on one machine; Cypress\'s CI matrix gives parallelism ACROSS DIFFERENT environments, catching a completely different class of bug.',
      },
      positions: {
        gate: { x: 35, y: 50, scale: 1.1 },
        chrome: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

const s16 = {
  tr: {
    title: '⚙️ CI/CD & Cross Browser Testing',
    blocks: [
      {
        type: 'simple-box', emoji: '🎻',
        content: 'CI/CD pipeline\'ına entegre edilmiş cypress run, kalite kapısı (quality gate) görevi görür: her pull request birleştirilmeden önce tüm testler otomatik olarak çalışır — tıpkı bir fabrikada montaj hattının sonundaki kalite kontrol istasyonu gibi: ürün kutusuna girmeden önce her bant katında otomatik ölçüm yapılır, standart dışı olan bant dışına düşer ve insanların gözden kaçırdığı %2\'lik sapma gün sonunu beklemeden durdurulur. Peki "testleri lokal çalıştırıyorum, neden CI\'a da ihtiyaç var?" diye sorabilirsin — çünkü geliştiricinin makinesi tek bir işletim sistemi, tek bir tarayıcı, tek bir ekran çözünürlüğüdür; CI matrisi ise aynı kodu Chrome\'da, Firefox\'ta ve Edge\'de Ubuntu üzerinde aynı anda koşturur. Java\'da Maven\'in mvn verify hedefi tüm testleri derleme ardından çalıştırır ve hata varsa build\'i durdurur — cypress run CI içindeki rolü tam olarak budur. QA için gerçek iş riski şudur: lokal PASS olan bir PR, CI matrisinde Safari/Firefox\'ta kırıksa ve o matris eksikse üretimde sadece belirli tarayıcı kullanıcıları etkilenen sessiz bir bug oluşur — tespit edilene kadar müşteri şikayetleriyle bulunur.',
      },
      {
        type: 'text',
        content: 'cypress open interaktif Test Runner\'ı açar — geliştirme sırasında kullanılır. cypress run ise headless (görünmez tarayıcı) modda çalışır ve CI ortamları için tasarlanmıştır. --browser bayrağıyla hangi tarayıcıda çalışacağı seçilir: chrome, firefox, edge veya electron (varsayılan).',
      },
      {
        type: 'code', label: 'GitHub Actions — temel Cypress workflow',
        language: 'yaml',
        code: `# .github/workflows/cypress.yml
name: Cypress Tests
on: push
jobs:
  cypress-run:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v6
      - uses: cypress-io/github-action@v7
        with:
          build: npm run build
          start: npm start`,
      },
      {
        type: 'code', label: 'Cross Browser Matrix — 3 tarayıcıda paralel',
        language: 'yaml',
        code: `strategy:
  matrix:
    browser: [chrome, firefox, edge]
steps:
  - uses: cypress-io/github-action@v7
    with:
      browser: \${{ matrix.browser }}
      record: true        # Cypress Cloud'a kaydet
      parallel: true       # birden çok job arasında testleri böl
      group: 'UI-\${{ matrix.browser }}'`,
      },
      {
        type: 'table',
        headers: ['Komut/Kavram', 'Açıklama', 'Ne zaman kullanılır'],
        rows: [
          ['cypress open', 'İnteraktif Test Runner', 'Yerel geliştirme sırasında'],
          ['cypress run', 'Headless, script edilebilir çalıştırma', 'CI/CD pipeline\'ında'],
          ['--browser chrome/firefox/edge', 'Hedef tarayıcıyı seçer', 'Cross-browser doğrulama gerektiğinde'],
          ['parallel: true + matrix', 'Testleri birden fazla job\'a böler', 'Test süresini kısaltmak için (büyük test suite)'],
          ['record: true', 'Sonuçları Cypress Cloud\'a gönderir', 'Flaky test analizi, PR check, geçmiş raporlar için'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'Maven Surefire Paralel Çalıştırma vs Cypress Parallel/Matrix',
        java: `<!-- pom.xml -->
<plugin>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <parallel>methods</parallel>
    <forkCount>4</forkCount>     <!-- 4 JVM process paralel -->
  </configuration>
</plugin>`,
        typescript: `# .github/workflows/cypress.yml
strategy:
  matrix:
    containers: [1, 2, 3, 4]   # 4 ayrı CI job paralel
steps:
  - uses: cypress-io/github-action@v7
    with: { record: true, parallel: true }`,
        why: { tr: 'Maven Surefire\'da forkCount ile aynı makinede birden fazla JVM process\'i paralel çalıştırırsın. Cypress\'te paralelleştirme CI seviyesinde olur — her "container" ayrı bir CI job\'ıdır ve Cypress Cloud, hangi test dosyasının hangi job\'a gideceğini akıllıca dengeler (load balancing).', en: 'In Maven Surefire, forkCount runs multiple JVM processes in parallel on the same machine. In Cypress, parallelization happens at the CI level — each "container" is a separate CI job, and Cypress Cloud intelligently load-balances which spec file goes to which job.' },
        note: { tr: 'group parametresi, farklı tarayıcı/job\'ların sonuçlarını Cypress Cloud\'da TEK bir raporda birleştirir — Maven\'daki test raporu agregasyonunun (Surefire reports merge) karşılığıdır.', en: "The group parameter merges results from different browsers/jobs into a SINGLE report in Cypress Cloud — the equivalent of merging Surefire test reports in Maven." },
      },
      {
        type: 'simulation',
        scenario: 'cypress-ci-pipeline',
        color: '#10b981',
        title: { tr: 'GitHub Actions — 3 Tarayıcıda Paralel Run', en: 'GitHub Actions — Parallel Run Across 3 Browsers' },
        description: { tr: 'Bir push\'un checkout → install → Chrome/Firefox/Edge\'de paralel cypress run → Cypress Cloud kaydı akışını canlı izle.', en: 'Watch a push trigger checkout → install → parallel cypress run on Chrome/Firefox/Edge → Cypress Cloud recording, live.' },
      },
      {
        type: 'git-practice',
        icon: '⚙️',
        title: { tr: 'Try It Yourself: CI pipeline adımlarını doğru diz', en: 'Try It Yourself: Arrange the CI pipeline steps' },
        intro: {
          tr: 'Bir push olayından Cypress Cloud raporuna kadar olan CI adımlarını doğru sıraya diz.',
          en: 'Arrange the CI steps from a push event to the Cypress Cloud report, in the right order.',
        },
        starterCommands: {
          tr: `cypress-io/github-action ile cypress run --browser chrome/firefox/edge çalıştır
git push ile workflow tetiklenir
actions/checkout ile kodu indir
record: true ile Cypress Cloud'a sonuçları gönder
npm ci ile bağımlılıkları kur`,
          en: `Run cypress run --browser chrome/firefox/edge via cypress-io/github-action
git push triggers the workflow
Download the code with actions/checkout
Send results to Cypress Cloud with record: true
Install dependencies with npm ci`,
        },
        expectedSteps: [
          { label: { tr: 'Workflow\'u tetikle', en: 'Trigger the workflow' }, pattern: 'push|trigger', example: 'git push' },
          { label: { tr: 'Kodu checkout et', en: 'Checkout the code' }, pattern: 'checkout', example: 'actions/checkout@v6' },
          { label: { tr: 'Bağımlılıkları kur', en: 'Install dependencies' }, pattern: 'npm ci|bağımlılık', example: 'npm ci' },
          { label: { tr: 'Cypress\'i tarayıcı bayrağıyla çalıştır', en: 'Run Cypress with the browser flag' }, pattern: 'cypress run|--browser', example: 'cypress run --browser chrome' },
          { label: { tr: 'Sonuçları Cypress Cloud\'a kaydet', en: 'Record results to Cypress Cloud' }, pattern: 'record|cloud', example: 'record: true' },
        ],
        successOutput: {
          tr: 'Doğru sıra: push tetikler → checkout → bağımlılıkları kur → cypress run --browser ile çalıştır → Cypress Cloud\'a kaydet.',
          en: 'Correct order: push triggers → checkout → install dependencies → run cypress run --browser → record to Cypress Cloud.',
        },
        retryOutput: {
          tr: 'Sıra yanlış — checkout/bağımlılık kurulumu olmadan cypress run çalıştırmaya çalışmak CI\'da hata verir.',
          en: 'Order is wrong — trying to run cypress run without checkout/dependency install fails in CI.',
        },
      },
      cypressCrossBrowserBugFilm,
      {
        type: 'quiz',
        question: { tr: 'cypress run --browser firefox komutu CI\'da ne yapar?', en: 'What does cypress run --browser firefox do in CI?' },
        options: [
          { id: 'a', text: 'İnteraktif Test Runner\'ı Firefox\'ta açar' },
          { id: 'b', text: 'Testleri Firefox\'ta headless modda, script edilebilir şekilde çalıştırır' },
          { id: 'c', text: 'Sadece Firefox eklentilerini test eder' },
          { id: 'd', text: 'Testleri yavaşlatır' },
        ],
        correct: 'b',
        explanation: {
          tr: '--browser bayrağı, cypress run\'ın hangi tarayıcı motorunu headless modda kullanacağını belirler. cypress open\'ın aksine, cypress run CI/CD ortamları için tasarlanmıştır ve interaktif arayüz açmaz.',
          en: "The --browser flag tells cypress run which browser engine to use in headless mode. Unlike cypress open, cypress run is designed for CI/CD environments and doesn't open an interactive UI.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "CI ortamında 'cypress run --browser chrome' komutunun davranışı nasıldır?",
            "en": "What is the behavior of the 'cypress run --browser chrome' command in a CI environment?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Testleri tarayıcı penceresi görünür (headed) şekilde çalıştırır",
                        "en": "Runs tests in a visible (headed) browser window"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Testleri Chrome motorunu kullanarak arka planda (headless) yürütür",
                        "en": "Executes tests in the background (headless) using the Chrome engine"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Sadece Chrome'a özgü CSS'leri denetler",
                        "en": "Checks only Chrome-specific CSS"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Test yürütme hızını 2 katına çıkarır",
                        "en": "Doubles the test execution speed"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "cypress run komutu, CI süreçlerinde otomasyon sağlamak için tarayıcıyı 'headless' modda çalıştırır. --browser parametresi ile istenen tarayıcı motoru seçilebilir ancak bu görsel bir arayüz açmaz.",
            "en": "The cypress run command executes the browser in 'headless' mode to enable automation in CI processes. The --browser parameter allows selecting the target browser engine without launching a graphical user interface."
      }
}
},
    ],
  },
  en: {
    title: '⚙️ CI/CD & Cross Browser Testing',
    blocks: [
      {
        type: 'simple-box', emoji: '🎻',
        content: "A cypress run integrated into a CI/CD pipeline acts as a quality gate: every pull request gets tested automatically before it's merged — like a quality control station at the end of a factory assembly line: every measurement is taken automatically before the product goes into the box, and any unit that falls outside spec is pulled from the line before humans miss that 2% drift. But you might ask: \"I run tests locally, why do I need CI as well?\" Because a developer's machine is a single OS, a single browser, a single screen resolution; a CI matrix runs the same code in Chrome, Firefox, and Edge on Ubuntu simultaneously. In Java, Maven's mvn verify goal runs all tests after compilation and stops the build on failure — that's exactly cypress run's role in CI. The real QA business risk: a PR that PASSes locally but breaks on Firefox in the CI matrix, with that matrix missing or skipped, produces a silent browser-specific bug in production — discovered via customer complaints by the time anyone notices.",
      },
      {
        type: 'text',
        content: "cypress open launches the interactive Test Runner — used during development. cypress run runs in headless mode (no visible browser) and is designed for CI environments. The --browser flag picks which browser to run: chrome, firefox, edge, or electron (the default).",
      },
      {
        type: 'code', label: 'GitHub Actions — basic Cypress workflow',
        language: 'yaml',
        code: `# .github/workflows/cypress.yml
name: Cypress Tests
on: push
jobs:
  cypress-run:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v6
      - uses: cypress-io/github-action@v7
        with:
          build: npm run build
          start: npm start`,
      },
      {
        type: 'code', label: 'Cross Browser Matrix — parallel across 3 browsers',
        language: 'yaml',
        code: `strategy:
  matrix:
    browser: [chrome, firefox, edge]
steps:
  - uses: cypress-io/github-action@v7
    with:
      browser: \${{ matrix.browser }}
      record: true        # record to Cypress Cloud
      parallel: true       # split tests across multiple jobs
      group: 'UI-\${{ matrix.browser }}'`,
      },
      {
        type: 'table',
        headers: ['Command/Concept', 'Description', 'When to use'],
        rows: [
          ['cypress open', 'Interactive Test Runner', 'During local development'],
          ['cypress run', 'Headless, scriptable execution', 'In a CI/CD pipeline'],
          ['--browser chrome/firefox/edge', 'Picks the target browser', 'When cross-browser verification is needed'],
          ['parallel: true + matrix', 'Splits tests across multiple jobs', 'Shortening test time (large suite)'],
          ['record: true', 'Sends results to Cypress Cloud', 'Flaky test analysis, PR checks, historical reports'],
        ],
      },
      {
        type: 'java-compare',
        topic: 'Maven Surefire Parallel Execution vs Cypress Parallel/Matrix',
        java: `<!-- pom.xml -->
<plugin>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <parallel>methods</parallel>
    <forkCount>4</forkCount>     <!-- 4 parallel JVM processes -->
  </configuration>
</plugin>`,
        typescript: `# .github/workflows/cypress.yml
strategy:
  matrix:
    containers: [1, 2, 3, 4]   # 4 separate parallel CI jobs
steps:
  - uses: cypress-io/github-action@v7
    with: { record: true, parallel: true }`,
        why: { tr: "Maven Surefire'da forkCount ile aynı makinede birden fazla JVM process'i paralel çalıştırırsın. Cypress'te paralelleştirme CI seviyesinde olur.", en: 'In Maven Surefire, forkCount runs multiple JVM processes in parallel on the same machine. In Cypress, parallelization happens at the CI level — each "container" is a separate CI job, and Cypress Cloud intelligently load-balances which spec file goes to which job.' },
        note: { tr: "group parametresi, farklı tarayıcı/job'ların sonuçlarını Cypress Cloud'da TEK bir raporda birleştirir.", en: 'The group parameter merges results from different browsers/jobs into a SINGLE report in Cypress Cloud — the equivalent of merging Surefire test reports in Maven.' },
      },
      {
        type: 'simulation',
        scenario: 'cypress-ci-pipeline',
        color: '#10b981',
        title: { tr: 'GitHub Actions — 3 Tarayıcıda Paralel Run', en: 'GitHub Actions — Parallel Run Across 3 Browsers' },
        description: { tr: 'Bir push\'un checkout → install → Chrome/Firefox/Edge\'de paralel cypress run → Cypress Cloud kaydı akışını canlı izle.', en: 'Watch a push trigger checkout → install → parallel cypress run on Chrome/Firefox/Edge → Cypress Cloud recording, live.' },
      },
      {
        type: 'git-practice',
        icon: '⚙️',
        title: { tr: 'Try It Yourself: CI pipeline adımlarını doğru diz', en: 'Try It Yourself: Arrange the CI pipeline steps' },
        intro: {
          tr: 'Bir push olayından Cypress Cloud raporuna kadar olan CI adımlarını doğru sıraya diz.',
          en: 'Arrange the CI steps from a push event to the Cypress Cloud report, in the right order.',
        },
        starterCommands: {
          tr: `cypress-io/github-action ile cypress run --browser chrome/firefox/edge çalıştır
git push ile workflow tetiklenir
actions/checkout ile kodu indir
record: true ile Cypress Cloud'a sonuçları gönder
npm ci ile bağımlılıkları kur`,
          en: `Run cypress run --browser chrome/firefox/edge via cypress-io/github-action
git push triggers the workflow
Download the code with actions/checkout
Send results to Cypress Cloud with record: true
Install dependencies with npm ci`,
        },
        expectedSteps: [
          { label: { tr: "Workflow'u tetikle", en: 'Trigger the workflow' }, pattern: 'push|trigger', example: 'git push' },
          { label: { tr: 'Kodu checkout et', en: 'Checkout the code' }, pattern: 'checkout', example: 'actions/checkout@v6' },
          { label: { tr: 'Bağımlılıkları kur', en: 'Install dependencies' }, pattern: 'npm ci|bağımlılık', example: 'npm ci' },
          { label: { tr: "Cypress'i tarayıcı bayrağıyla çalıştır", en: 'Run Cypress with the browser flag' }, pattern: 'cypress run|--browser', example: 'cypress run --browser chrome' },
          { label: { tr: "Sonuçları Cypress Cloud'a kaydet", en: 'Record results to Cypress Cloud' }, pattern: 'record|cloud', example: 'record: true' },
        ],
        successOutput: {
          tr: "Doğru sıra: push tetikler → checkout → bağımlılıkları kur → cypress run --browser ile çalıştır → Cypress Cloud'a kaydet.",
          en: 'Correct order: push triggers → checkout → install dependencies → run cypress run --browser → record to Cypress Cloud.',
        },
        retryOutput: {
          tr: "Sıra yanlış — checkout/bağımlılık kurulumu olmadan cypress run çalıştırmaya çalışmak CI'da hata verir.",
          en: 'Order is wrong — trying to run cypress run without checkout/dependency install fails in CI.',
        },
      },
      cypressCrossBrowserBugFilm,
      {
        type: 'quiz',
        question: { tr: 'cypress run --browser firefox komutu CI\'da ne yapar?', en: 'What does cypress run --browser firefox do in CI?' },
        options: [
          { id: 'a', text: 'Opens the interactive Test Runner in Firefox' },
          { id: 'b', text: 'Runs tests headlessly in Firefox, in a scriptable way' },
          { id: 'c', text: 'Only tests Firefox extensions' },
          { id: 'd', text: 'Slows down the tests' },
        ],
        correct: 'b',
        explanation: {
          tr: "--browser bayrağı, cypress run'ın hangi tarayıcı motorunu headless modda kullanacağını belirler.",
          en: "The --browser flag tells cypress run which browser engine to use in headless mode. Unlike cypress open, cypress run is designed for CI/CD environments and doesn't open an interactive UI.",
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress CLI komutunda '--headed' bayrağını kullanmanın temel amacı nedir?",
            "en": "What is the primary purpose of using the '--headed' flag in the Cypress CLI command?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Testleri sadece Chrome tarayıcısında çalıştırmak",
                        "en": "To run tests only in the Chrome browser"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Testleri arka planda sessizce çalıştırmak",
                        "en": "To run tests in the background silently"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Testleri görünür bir tarayıcı penceresinde, görsel olarak çalıştırmak",
                        "en": "To run tests in a visible browser window, visually"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Testleri daha hızlı tamamlamak için paralelleştirmek",
                        "en": "To parallelize tests for faster completion"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Varsayılan olarak cypress run testleri 'headless' modda (görünmez) çalıştırır. --headed bayrağı eklendiğinde tarayıcı penceresi açılır ve testin aşamalarını canlı olarak görmenizi sağlar.",
            "en": "By default, cypress run executes tests in 'headless' mode (invisible). When the --headed flag is added, the browser window opens, allowing you to see the test steps live."
      }
}
},
    ],
  },
}

// 🦄 Sadece Cypress'te Olan Özellikler — jQuery Sizzle motoru filmi
const cypressSizzleEngineFilm = {
  type: 'video-scene',
  id: 'cypress-sizzle-engine-film',
  title: {
    tr: '🎬 :contains() Neden Selenium\'da Yok Ama Cypress\'te Tek Satır?',
    en: '🎬 Why :contains() Doesn\'t Exist in Selenium But Is One Line in Cypress',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'goal', emoji: '🎯', label: { tr: '"Cherry" Yazan Elemanı Bul', en: 'Find the Element Saying "Cherry"' }, color: '#8b5cf6' },
    { id: 'css3', emoji: '📐', label: { tr: 'CSS3 Standardı (W3C)', en: 'CSS3 Standard (W3C)' }, color: '#94a3b8' },
    { id: 'xpath', emoji: '🔀', label: { tr: 'Selenium: XPath\'e Geç', en: 'Selenium: Switch to XPath' }, color: '#f59e0b' },
    { id: 'jquery', emoji: '🧬', label: { tr: 'jQuery Sizzle Motoru (tarayıcıda hazır)', en: 'jQuery Sizzle Engine (already in the browser)' }, color: '#0ea5e9' },
    { id: 'oneline', emoji: '✅', label: { tr: 'cy.get(\'li:contains("Cherry")\')', en: 'cy.get(\'li:contains("Cherry")\')' }, color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: '"Cherry" metnini içeren bir li elemanını bulmak istiyorsun. Selenium\'da ve Cypress\'te bu aynı basit hedef için neden farklı bir yol izlenir?',
        en: 'You want to find an li element containing the text "Cherry". Why do Selenium and Cypress take different paths for this exact same simple goal?',
      },
      positions: { goal: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — CSS3 standardı (W3C tarafından tanımlanan) :contains() diye bir pseudo-class TANIMLAMAZ — bu, tüm CSS motorları için geçerli sabit bir kural, tarayıcı/araç seçimiyle ilgisi yok.',
        en: 'Step 1 — the CSS3 standard (defined by the W3C) does NOT define a :contains() pseudo-class — this is a fixed rule for all CSS engines, unrelated to which browser/tool you pick.',
      },
      positions: {
        goal: { x: 20, y: 40, scale: 1.0 },
        css3: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'goal', to: 'css3', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Adım 2 (kontrast) — Selenium\'un CSS selector motoru W3C standardını HARFİYEN takip eder — bu yüzden By.cssSelector("li:contains(...)") kullanamazsın, By.xpath("//li[contains(text(),...)]")\'e GEÇMEK ZORUNDASIN — ayrı bir sorgu dili öğrenmen gerekir.',
        en: 'Step 2 (the contrast) — Selenium\'s CSS selector engine follows the W3C standard TO THE LETTER — so you can\'t use By.cssSelector("li:contains(...)"), you MUST SWITCH to By.xpath("//li[contains(text(),...)]") — a whole separate query language to learn.',
      },
      code: { tr: `// Selenium'da ZORUNLU:\nBy.xpath("//li[contains(text(),'Cherry')]")`, en: `// Mandatory in Selenium:\nBy.xpath("//li[contains(text(),'Cherry')]")` },
      positions: {
        css3: { x: 20, y: 40, scale: 1.0 },
        xpath: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'css3', to: 'xpath', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Cypress ise farklı bir mimari karara sahip: test kodu tarayıcının İÇİNDE çalışır ve jQuery (Sizzle motoruyla) zaten orada yüklüdür — Cypress kendi selector motorunu YAZMADI, jQuery\'ninkini KULLANDI.',
        en: 'Step 3 — Cypress made a different architectural choice: test code runs INSIDE the browser, and jQuery (with its Sizzle engine) is already loaded there — Cypress didn\'t WRITE its own selector engine, it USED jQuery\'s.',
      },
      positions: {
        xpath: { x: 20, y: 40, opacity: 0.4, scale: 0.85 },
        jquery: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'goal', to: 'jquery', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 4 — jQuery 2006\'dan beri :contains() destekler; Cypress bunu bedavaya devralır: cy.get(\'li:contains("Cherry")\') CSS3\'ün dışına hiç çıkmadan, TEK SATIRDA çalışır.',
        en: 'Step 4 — jQuery has supported :contains() since 2006; Cypress inherits it for free: cy.get(\'li:contains("Cherry")\') works in ONE LINE, never stepping outside plain CSS syntax.',
      },
      code: { tr: `cy.get('li:contains("Cherry")').click()\n// ekstra dil/sözdizimi YOK`, en: `cy.get('li:contains("Cherry")').click()\n// NO extra language/syntax` },
      positions: {
        jquery: { x: 22, y: 40, scale: 0.95 },
        oneline: { x: 60, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'jquery', to: 'oneline', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Ders — Playwright de metne göre arama sunar (getByText, :has-text()) ama bu Playwright\'a ÖZEL, jQuery\'den FARKLI bir sözdizimidir — yani "aynı jQuery pseudo-class\'ları" değil, paralel ama ayrı bir çözümdür. Java\'da Apache Commons Collections\'ın JDK\'nın temel koleksiyon API\'sinin üzerine kattığı yardımcı metotlara benzer: standart değil ama gerçek işte hız kazandırır.',
        en: 'The lesson — Playwright also offers text-based search (getByText, :has-text()) but this is a Playwright-SPECIFIC syntax, DIFFERENT from jQuery\'s — not "the same jQuery pseudo-classes", but a parallel, separate solution. In Java, this resembles Apache Commons Collections layering utility methods on top of the JDK\'s core collection API: not standard, but it speeds up real-world work.',
      },
      positions: {
        oneline: { x: 35, y: 50, scale: 1.1 },
        xpath: { x: 65, y: 50, scale: 0.9, opacity: 0.4 },
      },
    },
  ],
}

const s17 = {
  tr: {
    title: '🦄 Sadece Cypress\'te Olan Özellikler',
    blocks: [
      {
        type: 'simple-box', emoji: '🦄',
        content: 'Cypress\'in selector motoru CSS3 standardını değil jQuery\'nin Sizzle motorunu çalıştırır — bu, :visible, :contains(), :eq(), :first gibi jQuery pseudo-class\'larının doğrudan cy.get() içinde çalışması anlamına gelir, tıpkı düz SQL yerine SQL\'in üzerine kurulmuş ve onun sözdizimini genişleten bir ORM sorgu dilini kullanmak gibi: taban katmanın tüm gücüne sahipsin ama üstüne daha ifadeli bir sözdizimi eklendi. Peki Selenium ve Playwright CSS3 standardını tam desteklerken neden Cypress bu jQuery motorunu tercih ediyor? Çünkü Cypress\'in Node.js sunucu katmanı değil, tarayıcı içi katmanı vardır ve jQuery zaten tarayıcıda yüklüdür — bu mimari tercih sayesinde .invoke(\'val\'), .its(\'length\'), .trigger() gibi jQuery zincirleme metodları da ücretsiz gelir. Java\'da bunu Apache Commons koleksiyonlarının JDK\'nın temel koleksiyon API\'si üzerine eklediği yardımcı metodlara benzetebilirsin: standart olmamasına rağmen gerçek işlerde çok daha hızlı yazmana izin verir. QA\'nın pratik faydası şudur: :visible pseudo-class\'ı olmadan CSS3\'te "görünür olan tüm liste elemanlarını" seçmek için ya JavaScript ile DOM\'u elle dolaşırsın ya da testi daha kırılgan hale getiren ek mantık eklersin — Cypress\'te tek satır yeterlidir ve bu, yanlış elementin tıklandığı flaky testlerin önüne geçer.',
      },
      {
        type: 'text',
        content: 'Cypress\'in test kodunu tarayıcının içinde, gerçek jQuery kütüphanesi üzerinde çalıştırması, ona Selenium ve Playwright\'ta birebir KARŞILIĞI OLMAYAN bazı özellikler kazandırır. Bunların en somut örneği: cy.get() içine yazdığın selector string\'i, CSS3 standardının değil, jQuery\'nin Sizzle selector motorunun kurallarına göre çalışır.',
      },
      {
        type: 'code', label: 'jQuery Pseudo-Class\'ları — CSS3\'te YOK, sadece Cypress\'te var',
        language: 'javascript',
        code: `cy.get('li:first')                    // listenin ilk elemanı
cy.get('li:last')                      // listenin son elemanı
cy.get('li:visible')                   // SADECE görünen elemanlar
cy.get('li:contains("Cherry")')        // metne göre ara — CSS3'te YOK
cy.get('li:eq(2)')                     // index 2 (zero-based) — CSS3'te YOK
cy.get('input:checked')                // işaretli checkbox/radio`,
      },
      {
        type: 'table',
        headers: ['Selector Özelliği', 'Selenium', 'Playwright', 'Cypress'],
        rows: [
          [':contains("text")', '❌ Yok, XPath\'e geçmen gerekir', '❌ Yok, kendi text= sözdizimi var', '✅ jQuery\'den doğrudan, tek satır CSS'],
          [':eq(n) / :first / :last', '❌ CSS3\'te yok', '🟡 .first()/.last()/.nth() metodu (farklı API)', '✅ Doğrudan selector string içinde'],
          [':visible / :hidden', '❌ isDisplayed() ile manuel filtre', '🟡 Kendi :visible\'ı var (farklı motor)', '✅ jQuery\'nin normalize ettiği davranış'],
          ['.invoke() / .its()', '❌ Yok', '❌ Yok', '✅ jQuery metodunu/property\'sini zincirde çağırma'],
        ],
      },
      {
        type: 'code', label: '.invoke() ve .its() — jQuery metodunu/property\'sini zincirde çağır',
        language: 'javascript',
        code: `cy.get('a').invoke('attr', 'href').should('include', '/dashboard')
cy.get('input').invoke('val').should('eq', 'merhaba')
cy.get('ul li').its('length').should('be.gte', 3)
cy.window().its('localStorage').invoke('getItem', 'token').should('exist')`,
      },
      {
        type: 'java-compare',
        topic: 'Selenium\'da Metne Göre Arama (XPath) vs Cypress jQuery Selector',
        java: `// Selenium'da CSS'te :contains() YOK, XPath'e geçmek ZORUNDASIN:
WebElement el = driver.findElement(
  By.xpath("//li[contains(text(),'Cherry')]")
);
// Tek bir özellik için ayrı bir sorgu dili öğrenmen gerekti`,
        typescript: `// Cypress'te aynı CSS sözdizimi içinde, tek satır:
cy.get('li:contains("Cherry")').should('be.visible')
// Ekstra dil/sözdizimi YOK — jQuery zaten cy.get()'in içinde`,
        why: { tr: 'Selenium\'un CSS3 selector motoru W3C standardını takip eder ve :contains() pseudo-class\'ı CSS3 standardında YOKTUR — bu yüzden Selenium\'da metne göre arama için XPath\'e geçmen gerekir. Cypress\'in motoru gerçek jQuery olduğu için, jQuery\'nin 2006\'dan beri sahip olduğu bu özelliği bedavaya kazanırsın.', en: "Selenium's CSS3 selector engine follows the W3C standard, and the :contains() pseudo-class does NOT exist in the CSS3 spec — so in Selenium you must switch to XPath to search by text. Because Cypress's engine is literally jQuery, you get this feature (which jQuery has had since 2006) for free." },
        note: { tr: 'Playwright da text içeriğine göre arama sunar (getByText, :text(), :has-text()) ama bunlar jQuery\'nin Sizzle motorundan FARKLI, Playwright\'a özel bir sözdizimidir — yani "aynı jQuery pseudo-class\'ları" değildir, paralel ama ayrı bir çözümdür.', en: "Playwright also offers text-based searching (getByText, :text(), :has-text()) but these use a DIFFERENT syntax from jQuery's Sizzle engine — they're a parallel but separate solution, not \"the same jQuery pseudo-classes\"." },
      },
      {
        type: 'text',
        content: 'İkinci Cypress-özel özellik: **Cypress Studio**. Bu, Test Runner\'ın İÇİNDEN, çalışan bir teste tıklayarak yeni adım/assertion EKLEYEBİLDİĞİN bir görsel kayıt aracıdır. "New Test" veya Command Log\'da bir teste sağ tıklayıp "Edit in Studio" seçince, uygulamada yaptığın her tıklama/yazma otomatik olarak Cypress komutuna çevrilir ve mevcut test dosyasına eklenir; AI katmanı da DOM\'daki değişikliklere göre anlamlı assertion önerir.',
      },
      {
        type: 'table',
        headers: ['Araç', 'Ne yapar', 'Sınırı'],
        rows: [
          ['Cypress Studio', 'Test Runner içinden, ÇALIŞAN/MEVCUT bir teste tıklayarak adım ekler', 'Sadece Cypress\'te var; ayrı bir uygulama açmana gerek yok'],
          ['Playwright Codegen', 'npx playwright codegen ile YENİ ve AYRI bir script üretir', 'Mevcut bir test dosyasına canlı ekleme yapamaz, ayrı bir terminal komutu gerekir'],
          ['Selenium IDE', 'Tarayıcı eklentisi olarak ayrı bir kayıt aracı', 'Gerçek bir Selenium/Java projesiyle entegre değildir, ayrı bir üründür'],
        ],
      },
      {
        type: 'simulation',
        scenario: 'cypress-jquery-selectors',
        color: '#10b981',
        title: { tr: 'jQuery Pseudo-Class\'ları — Canlı Dene', en: 'jQuery Pseudo-Classes — Try Live' },
        description: { tr: 'Bir pseudo-class butonuna tıkla, hangi elemanların eşleştiğini ve bunun Selenium/Playwright\'ta neye karşılık geldiğini canlı gör.', en: 'Click a pseudo-class button and see live which elements match, plus what the Selenium/Playwright equivalent would be.' },
      },
      {
        type: 'git-practice',
        icon: '🦄',
        title: { tr: 'Try It Yourself: Selector öncelik sırasını doğru diz', en: 'Try It Yourself: Arrange the selector priority order' },
        intro: {
          tr: 'Aşağıdaki 4 selector stratejisini EN GÜVENİLİR\'den EN KIRILGAN\'a doğru sırala — jQuery pseudo-class\'ları güçlüdür ama her biri aynı risk seviyesinde değildir.',
          en: 'Sort the 4 selector strategies below from MOST RELIABLE to MOST FRAGILE — jQuery pseudo-classes are powerful, but not all of them carry the same risk.',
        },
        starterCommands: {
          tr: `cy.get('li:eq(2)').click()
cy.get('input:checked').should('have.length', 1)
cy.get('li:contains("Cherry")').click()
cy.get('[data-cy=cherry-item]').click()`,
          en: `cy.get('li:eq(2)').click()
cy.get('input:checked').should('have.length', 1)
cy.get('li:contains("Cherry")').click()
cy.get('[data-cy=cherry-item]').click()`,
        },
        expectedSteps: [
          { label: { tr: 'En güvenli: özel test attribute\'u', en: 'Most reliable: a dedicated test attribute' }, pattern: '\\[data-cy=', example: "cy.get('[data-cy=cherry-item]')" },
          { label: { tr: 'İkinci: görünür metne göre arama (i18n\'de dikkat)', en: 'Second: search by visible text (careful with i18n)' }, pattern: ':contains\\(', example: "cy.get('li:contains(\"Cherry\")')" },
          { label: { tr: 'Üçüncü: state\'e dayalı pseudo-class', en: 'Third: a state-based pseudo-class' }, pattern: ':checked', example: "cy.get('input:checked')" },
          { label: { tr: 'En kırılgan: index\'e dayalı seçim — SON ÇARE', en: 'Most fragile: index-based selection — LAST RESORT' }, pattern: ':eq\\(', example: "cy.get('li:eq(2)')" },
        ],
        successOutput: {
          tr: 'Doğru öncelik: data-cy (en güvenli) → :contains() (metne dayalı) → :checked gibi state pseudo-class\'ları → :eq()/:first/:last (indekse dayalı, EN KIRILGAN — liste sırası değişirse test bozulur).',
          en: 'Correct priority: data-cy (most reliable) → :contains() (text-based) → state pseudo-classes like :checked → :eq()/:first/:last (index-based, MOST FRAGILE — breaks if the list order changes).',
        },
        retryOutput: {
          tr: 'Sıra yanlış — jQuery pseudo-class\'ları güçlü bir özellik olsa da, :eq()/:first/:last her zaman SON ÇARE olmalı; ilk tercih hep data-cy gibi özel bir test attribute\'u olmalı.',
          en: "Order is wrong — even though jQuery pseudo-classes are powerful, :eq()/:first/:last should always be the LAST RESORT; the first choice should always be a dedicated test attribute like data-cy.",
        },
      },
      cypressSizzleEngineFilm,
      {
        type: 'quiz',
        question: { tr: 'Aşağıdakilerden hangisi CSS3 standardında YOKTUR ama Cypress\'te (jQuery sayesinde) doğrudan çalışır?', en: 'Which of the following does NOT exist in the CSS3 standard but works directly in Cypress (thanks to jQuery)?' },
        options: [
          { id: 'a', text: ':hover' },
          { id: 'b', text: ':contains()' },
          { id: 'c', text: ':focus' },
          { id: 'd', text: ':nth-child()' },
        ],
        correct: 'b',
        explanation: {
          tr: ':hover, :focus ve :nth-child() CSS3 standardının BİR PARÇASIDIR — Selenium\'da da CSS selector olarak kullanılabilirler. :contains() ise SADECE jQuery/Sizzle motoruna özeldir, CSS3 spesifikasyonunda yoktur — bu yüzden Selenium\'da bunun yerine XPath\'e geçmen gerekir, Cypress\'te ise cy.get() içinde doğrudan çalışır.',
          en: ':hover, :focus, and :nth-child() ARE PART of the CSS3 standard — they can be used as CSS selectors in Selenium too. :contains(), however, is jQuery/Sizzle-engine-only and does not exist in the CSS3 spec — so in Selenium you must switch to XPath instead, while in Cypress it works directly inside cy.get().',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki jQuery seçicilerinden hangisi standart bir CSS3 seçicisi olmayıp Cypress (jQuery) ile kullanılabilir?",
            "en": "Which of the following jQuery selectors is NOT a standard CSS3 selector but can be used with Cypress (jQuery)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "div:visible",
                        "en": "div:visible"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "div:first-child",
                        "en": "div:first-child"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "input:disabled",
                        "en": "input:disabled"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "a:link",
                        "en": "a:link"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": ":visible seçicisi jQuery tarafından sağlanan bir eklentidir ve CSS3 spesifikasyonunda yer almaz. :first-child, :disabled ve :link gibi ifadeler standart CSS3 seçicileridir.",
            "en": "The :visible selector is a plugin provided by jQuery and is not part of the CSS3 specification. Expressions like :first-child, :disabled, and :link are standard CSS3 selectors."
      }
}
},
    ],
  },
  en: {
    title: '🦄 Cypress-Only Superpowers',
    blocks: [
      {
        type: 'simple-box', emoji: '🦄',
        content: "Cypress's selector engine runs jQuery's Sizzle motor rather than the CSS3 standard — meaning jQuery pseudo-classes like :visible, :contains(), :eq(), and :first work directly inside cy.get(), like using an ORM query language built on top of plain SQL: you have all the power of the base layer, but with a more expressive syntax layered on top. But if Selenium and Playwright fully support the CSS3 standard, why did Cypress choose the jQuery engine? Because Cypress runs inside the browser rather than in a separate Node.js server process, and jQuery is already loaded there — that architectural choice also delivers jQuery chaining methods like .invoke('val'), .its('length'), and .trigger() at no extra cost. In Java, think of it like Apache Commons Collections layering utility methods on top of the JDK's core collection API: non-standard, but it lets you write real-world code far faster. The practical QA payoff: without the :visible pseudo-class, selecting \"all currently visible list items\" in CSS3 requires either manually traversing the DOM with JavaScript or adding extra logic that makes the test more fragile — in Cypress a single line does it, which directly prevents the category of flaky tests caused by clicking a hidden element that matched the selector.",
      },
      {
        type: 'text',
        content: "Because Cypress runs test code inside the browser, on top of the real jQuery library, it gains some features that have NO direct equivalent in Selenium or Playwright. The clearest example: the selector string you write inside cy.get() follows jQuery's Sizzle selector engine rules, not the CSS3 standard.",
      },
      {
        type: 'code', label: "jQuery Pseudo-Classes — don't exist in CSS3, only in Cypress",
        language: 'javascript',
        code: `cy.get('li:first')                    // the first item in the list
cy.get('li:last')                      // the last item in the list
cy.get('li:visible')                   // ONLY the visible items
cy.get('li:contains("Cherry")')        // search by text — does NOT exist in CSS3
cy.get('li:eq(2)')                     // index 2 (zero-based) — does NOT exist in CSS3
cy.get('input:checked')                // a checked checkbox/radio`,
      },
      {
        type: 'table',
        headers: ['Selector Feature', 'Selenium', 'Playwright', 'Cypress'],
        rows: [
          [':contains("text")', "❌ None, you must switch to XPath", "❌ None, has its own text= syntax", "✅ Directly from jQuery, one line of CSS"],
          [':eq(n) / :first / :last', '❌ Not in CSS3', '🟡 .first()/.last()/.nth() method (different API)', '✅ Directly inside the selector string'],
          [':visible / :hidden', '❌ Manual filtering with isDisplayed()', "🟡 Has its own :visible (different engine)", "✅ jQuery's normalized behavior"],
          ['.invoke() / .its()', '❌ None', '❌ None', "✅ Chain-call a jQuery method/property"],
        ],
      },
      {
        type: 'code', label: '.invoke() and .its() — chain-call a jQuery method/property',
        language: 'javascript',
        code: `cy.get('a').invoke('attr', 'href').should('include', '/dashboard')
cy.get('input').invoke('val').should('eq', 'hello')
cy.get('ul li').its('length').should('be.gte', 3)
cy.window().its('localStorage').invoke('getItem', 'token').should('exist')`,
      },
      {
        type: 'java-compare',
        topic: 'Searching by Text in Selenium (XPath) vs Cypress jQuery Selector',
        java: `// In Selenium, CSS has NO :contains(), you MUST switch to XPath:
WebElement el = driver.findElement(
  By.xpath("//li[contains(text(),'Cherry')]")
);
// You had to learn a separate query language for one feature`,
        typescript: `// In Cypress, the same CSS syntax, one line:
cy.get('li:contains("Cherry")').should('be.visible')
// NO extra language/syntax needed — jQuery is already inside cy.get()`,
        why: { tr: "Selenium'un CSS3 selector motoru W3C standardını takip eder ve :contains() pseudo-class'ı CSS3 standardında YOKTUR. Cypress'in motoru gerçek jQuery olduğu için, jQuery'nin 2006'dan beri sahip olduğu bu özelliği bedavaya kazanırsın.", en: "Selenium's CSS3 selector engine follows the W3C standard, and the :contains() pseudo-class does NOT exist in the CSS3 spec — so in Selenium you must switch to XPath to search by text. Because Cypress's engine is literally jQuery, you get this feature (which jQuery has had since 2006) for free." },
        note: { tr: "Playwright da text içeriğine göre arama sunar (getByText, :text(), :has-text()) ama bunlar jQuery'nin Sizzle motorundan FARKLI, Playwright'a özel bir sözdizimidir.", en: "Playwright also offers text-based searching (getByText, :text(), :has-text()) but these use a DIFFERENT syntax from jQuery's Sizzle engine — they're a parallel but separate solution, not \"the same jQuery pseudo-classes\"." },
      },
      {
        type: 'text',
        content: 'The second Cypress-only feature: **Cypress Studio**. This is a visual recording tool that lets you ADD new steps/assertions to a RUNNING test FROM WITHIN the Test Runner itself. Click "New Test", or right-click a test in the Command Log and choose "Edit in Studio" — every click/type you make in the app is automatically translated into a Cypress command and appended to the existing test file; an AI layer also suggests meaningful assertions based on what changed in the DOM.',
      },
      {
        type: 'table',
        headers: ['Tool', 'What it does', 'Limitation'],
        rows: [
          ['Cypress Studio', 'Adds steps to a RUNNING/EXISTING test, from inside the Test Runner', 'Only exists in Cypress; no separate app to launch'],
          ['Playwright Codegen', 'Generates a NEW, SEPARATE script via npx playwright codegen', "Can't live-append to an existing test file, needs a separate terminal command"],
          ['Selenium IDE', 'A separate recorder, distributed as a browser extension', 'Not integrated with a real Selenium/Java project — a separate product'],
        ],
      },
      {
        type: 'simulation',
        scenario: 'cypress-jquery-selectors',
        color: '#10b981',
        title: { tr: 'jQuery Pseudo-Class\'ları — Canlı Dene', en: 'jQuery Pseudo-Classes — Try Live' },
        description: { tr: 'Bir pseudo-class butonuna tıkla, hangi elemanların eşleştiğini ve bunun Selenium/Playwright\'ta neye karşılık geldiğini canlı gör.', en: 'Click a pseudo-class button and see live which elements match, plus what the Selenium/Playwright equivalent would be.' },
      },
      {
        type: 'git-practice',
        icon: '🦄',
        title: { tr: 'Try It Yourself: Selector öncelik sırasını doğru diz', en: 'Try It Yourself: Arrange the selector priority order' },
        intro: {
          tr: 'Aşağıdaki 4 selector stratejisini EN GÜVENİLİR\'den EN KIRILGAN\'a doğru sırala.',
          en: 'Sort the 4 selector strategies below from MOST RELIABLE to MOST FRAGILE — jQuery pseudo-classes are powerful, but not all of them carry the same risk.',
        },
        starterCommands: {
          tr: `cy.get('li:eq(2)').click()
cy.get('input:checked').should('have.length', 1)
cy.get('li:contains("Cherry")').click()
cy.get('[data-cy=cherry-item]').click()`,
          en: `cy.get('li:eq(2)').click()
cy.get('input:checked').should('have.length', 1)
cy.get('li:contains("Cherry")').click()
cy.get('[data-cy=cherry-item]').click()`,
        },
        expectedSteps: [
          { label: { tr: 'En güvenli: özel test attribute\'u', en: 'Most reliable: a dedicated test attribute' }, pattern: '\\[data-cy=', example: "cy.get('[data-cy=cherry-item]')" },
          { label: { tr: "İkinci: görünür metne göre arama (i18n'de dikkat)", en: 'Second: search by visible text (careful with i18n)' }, pattern: ':contains\\(', example: "cy.get('li:contains(\"Cherry\")')" },
          { label: { tr: "Üçüncü: state'e dayalı pseudo-class", en: 'Third: a state-based pseudo-class' }, pattern: ':checked', example: "cy.get('input:checked')" },
          { label: { tr: "En kırılgan: index'e dayalı seçim — SON ÇARE", en: 'Most fragile: index-based selection — LAST RESORT' }, pattern: ':eq\\(', example: "cy.get('li:eq(2)')" },
        ],
        successOutput: {
          tr: "Doğru öncelik: data-cy (en güvenli) → :contains() → :checked gibi state pseudo-class'ları → :eq()/:first/:last (EN KIRILGAN).",
          en: 'Correct priority: data-cy (most reliable) → :contains() (text-based) → state pseudo-classes like :checked → :eq()/:first/:last (index-based, MOST FRAGILE — breaks if the list order changes).',
        },
        retryOutput: {
          tr: "Sıra yanlış — :eq()/:first/:last her zaman SON ÇARE olmalı; ilk tercih hep data-cy gibi özel bir test attribute'u olmalı.",
          en: "Order is wrong — even though jQuery pseudo-classes are powerful, :eq()/:first/:last should always be the LAST RESORT; the first choice should always be a dedicated test attribute like data-cy.",
        },
      },
      cypressSizzleEngineFilm,
      {
        type: 'quiz',
        question: { tr: 'Aşağıdakilerden hangisi CSS3 standardında YOKTUR ama Cypress\'te (jQuery sayesinde) doğrudan çalışır?', en: 'Which of the following does NOT exist in the CSS3 standard but works directly in Cypress (thanks to jQuery)?' },
        options: [
          { id: 'a', text: ':hover' },
          { id: 'b', text: ':contains()' },
          { id: 'c', text: ':focus' },
          { id: 'd', text: ':nth-child()' },
        ],
        correct: 'b',
        explanation: {
          tr: ':hover, :focus ve :nth-child() CSS3 standardının BİR PARÇASIDIR. :contains() ise SADECE jQuery/Sizzle motoruna özeldir, CSS3 spesifikasyonunda yoktur.',
          en: ':hover, :focus, and :nth-child() ARE PART of the CSS3 standard — they can be used as CSS selectors in Selenium too. :contains(), however, is jQuery/Sizzle-engine-only and does not exist in the CSS3 spec — so in Selenium you must switch to XPath instead, while in Cypress it works directly inside cy.get().',
        },
      
        retryQuestion: {
      "question": {
            "tr": "Cypress testlerinde cy.get('div:eq(1)') kullanımı neden mümkündür?",
            "en": "Why is the use of cy.get('div:eq(1)') possible in Cypress tests?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Çünkü CSS3 :eq() fonksiyonunu destekler",
                        "en": "Because CSS3 supports the :eq() function"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Çünkü Cypress, alt yapı olarak jQuery seçici motorunu kullanır",
                        "en": "Because Cypress uses the jQuery selector engine under the hood"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Çünkü tarayıcılar varsayılan olarak :eq seçicisini tanımlar",
                        "en": "Because browsers define the :eq selector by default"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Çünkü bu sadece XPath için geçerli bir sözdizimidir",
                        "en": "Because this is valid syntax only for XPath"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": ":eq() bir CSS standardı değildir, ancak jQuery motoru tarafından desteklenen bir seçicidir. Cypress, cy.get() içerisinde bu gelişmiş seçicileri kullanmanıza olanak tanıyan bir jQuery katmanı içerir.",
            "en": ":eq() is not a CSS standard, but it is a selector supported by the jQuery engine. Cypress includes a jQuery layer that allows you to use these extended selectors within cy.get()."
      }
}
},
    ],
  },
}

export const cypressData = {
  tr: {
    hero: {
      title: '🌲 Cypress — Modern Uçtan Uca Test Otomasyonu',
      subtitle: 'JavaScript/TypeScript ile öğren, Selenium ve Playwright ile karşılaştır',
      intro: 'Cypress, test kodunu tarayıcının içinde çalıştıran, time-travel debugging ve otomatik retry-ability sunan modern bir E2E test framework\'üdür. Network stubbing, component testing ve gerçek zamanlı görsel geri bildirimle QA mühendislerinin en sevdiği araçlardan biridir.',
    },
    tabs: ['🌲 Cypress Nedir?', '⚙️ Kurulum', '🖱️ Temel Komutlar', '🧩 Aksiyonlar & Drag-Drop', '🕐 Zaman Yolculuğu', '🌐 Network & Intercept', '🗂️ Test Organizasyonu', '🔗 Aliases & Isolation', '🧩 Component Testing', '🎭 Stub/Spy/Clock', '🐞 Debugging', '⚙️ CI/CD & Cross Browser', '🦄 Sadece Cypress\'te', '🌍 Gerçek Hayat', '🔗 Ekosistem', '🆚 Karşılaştırma', '🚨 Yaygın Hatalar', '💼 50 Mülakat Sorusu'],
    sections: [s0.tr, s1.tr, s2.tr, s3.tr, s4.tr, s5.tr, s11.tr, s12.tr, s13.tr, s14.tr, s15.tr, s16.tr, s17.tr, s6.tr, s7.tr, s8.tr, s9.tr, s10.tr],
  },
  en: {
    hero: {
      title: '🌲 Cypress — Modern End-to-End Test Automation',
      subtitle: 'Learn with JavaScript/TypeScript, compare with Selenium and Playwright',
      intro: 'Cypress is a modern E2E testing framework that runs test code inside the browser, offering time-travel debugging and automatic retry-ability. With network stubbing, component testing and real-time visual feedback, it is one of QA engineers\' favorite tools.',
    },
    tabs: ['🌲 What is Cypress?', '⚙️ Installation', '🖱️ Basic Commands', '🧩 Actions & Drag-Drop', '🕐 Time Travel', '🌐 Network & Intercept', '🗂️ Test Organization', '🔗 Aliases & Isolation', '🧩 Component Testing', '🎭 Stub/Spy/Clock', '🐞 Debugging', '⚙️ CI/CD & Cross Browser', '🦄 Cypress-Only', '🌍 Real World', '🔗 Ecosystem', '🆚 Comparison', '🚨 Common Errors', '💼 50 Interview Questions'],
    sections: [s0.en, s1.en, s2.en, s3.en, s4.en, s5.en, s11.en, s12.en, s13.en, s14.en, s15.en, s16.en, s17.en, s6.en, s7.en, s8.en, s9.en, s10.en],
  },
}

fillMissingCodeTrios(cypressData, 'cypress')
