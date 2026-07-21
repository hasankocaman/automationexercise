// seleniumData.js — Selenium WebDriver tam öğrenme sayfası
// Java + Python + TypeScript, 10 bölüm
import { fillMissingCodeTrios } from './interactiveTrioFillers.js'
import { LOCATOR_EXPLORER_BLOCK } from './locatorExplorerData.js'

// ─── Dalga 6 film sabitleri (video-scene — EN + TR paylaşımlı) ───────────────
// Spesifikasyon kalıbı: Documents/video-rollout-plan.md §2 · CLAUDE.md §9.5

// 🌐 Giriş — WebDriver komut zinciri filmi
const seleniumDomProofFilm = {
  type: 'video-scene',
  id: 'selenium-dom-proof-film',
  title: {
    tr: '🎬 Bir Tıklamanın Yolculuğu: Test Kodundan DOM\'a',
    en: '🎬 The Journey of a Click: From Test Code to the DOM',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test',   emoji: '📝', label: { tr: 'Test kodu',            en: 'Test code' },            color: '#0ea5e9' },
    { id: 'api',    emoji: '🚗', label: { tr: 'WebDriver API',         en: 'WebDriver API' },         color: '#6366f1' },
    { id: 'driver', emoji: '🔌', label: { tr: 'ChromeDriver',          en: 'ChromeDriver' },          color: '#8b5cf6' },
    { id: 'browser',emoji: '🌍', label: { tr: 'Chrome',                en: 'Chrome' },                color: '#f59e0b' },
    { id: 'dom',    emoji: '📄', label: { tr: 'DOM',                   en: 'DOM' },                   color: '#22c55e' },
    { id: 'unit',   emoji: '🧪', label: { tr: 'Unit test (kör nokta)', en: 'Unit test (blind spot)' }, color: '#94a3b8' },
    { id: 'proof',  emoji: '✅', label: { tr: 'Görsel kanıt',          en: 'Visual proof' },          color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'JUnit + Mockito zaten var — peki neden bir de tarayıcıyı gerçekten açan bir araca ihtiyacımız var? `driver.findElement(By.id("loginBtn")).click()` çalıştığında bunu izleyeceksin.',
        en: 'JUnit + Mockito already exist — so why do we also need a tool that actually opens a browser? Watch what happens when `driver.findElement(By.id("loginBtn")).click()` runs.',
      },
      code: { tr: `driver.findElement(By.id("loginBtn")).click();`, en: `driver.findElement(By.id("loginBtn")).click();` },
      positions: { test: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — komut standart bir arayüze gider: WebDriver API. Java\'da RemoteWebDriver, Python\'da webdriver.Chrome(), TypeScript\'te aynı kavram — sözdizimi değişir, KONTRAT değişmez.',
        en: 'Step 1 — the command goes through a standard interface: the WebDriver API. RemoteWebDriver in Java, webdriver.Chrome() in Python, the same concept in TypeScript — the syntax changes, the CONTRACT does not.',
      },
      positions: {
        test: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        api: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'test', to: 'api', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 2 — API, ChromeDriver\'a bir W3C WebDriver isteği gönderir. ChromeDriver, Java\'daki JDBC sürücüsü gibi bir KÖPRÜDÜR: senin kodunla gerçek Chrome arasında çevirmenlik yapar.',
        en: 'Step 2 — the API sends a W3C WebDriver request to ChromeDriver. ChromeDriver is a BRIDGE, like a Java JDBC driver: it translates between your code and the real Chrome.',
      },
      positions: {
        api: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        driver: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'api', to: 'driver', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — ChromeDriver, gerçek Chrome\'u yönetir. Bu simüle edilmiş bir tarayıcı DEĞİL — kullanıcının göreceği AYNI render motoru, AYNI JavaScript motoru.',
        en: 'Step 3 — ChromeDriver drives the real Chrome. This is NOT a simulated browser — it is the SAME rendering engine, the SAME JavaScript engine a user would see.',
      },
      positions: {
        driver: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        browser: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'driver', to: 'browser', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 4 — click DOM\'a ulaşır: buton gerçekten var mı, gerçekten tıklanabilir mi, tıklandığında modal AÇILIYOR mu? Bu sorulara cevap, sadece bu katmanda ölçülebilir.',
        en: 'Step 4 — the click reaches the DOM: does the button really exist, is it really clickable, does a modal really OPEN when clicked? These questions can only be measured at this layer.',
      },
      positions: {
        browser: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        dom: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'browser', to: 'dom', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Kontrast — unit test bu zincire hiç GİRMEZ: backend mantığını izole test eder ama "buton göründü mü, modal açıldı mı" sorusuna asla ulaşamaz. Bu, Selenium\'un doldurduğu kör noktadır.',
        en: 'Contrast — a unit test never ENTERS this chain: it tests backend logic in isolation but never reaches "did the button appear, did the modal open". This is the blind spot Selenium fills.',
      },
      positions: {
        dom: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        unit: { x: 60, y: 55, scale: 1, opacity: 0.7 },
        proof: { x: 60, y: 35, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'dom', to: 'proof', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — zincir: test kodu → WebDriver API → ChromeDriver → gerçek tarayıcı → DOM. Cevapsız kalan her "göründü mü, tıklandı mı" sorusu, production\'da müşterinin bulduğu bir bug demektir.',
        en: 'Final — the chain: test code → WebDriver API → ChromeDriver → real browser → DOM. Every unanswered "did it appear, was it clicked" question becomes a bug the customer finds in production.',
      },
      positions: {
        test: { x: 10, y: 55, scale: 0.75 },
        api: { x: 28, y: 35, scale: 0.8 },
        driver: { x: 48, y: 55, scale: 0.8 },
        browser: { x: 68, y: 35, scale: 0.85 },
        proof: { x: 90, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'test', to: 'api' }, { from: 'api', to: 'driver' }, { from: 'driver', to: 'browser' }, { from: 'browser', to: 'proof' }],
    },
  ],
}

// ⚙️ Kurulum — ChromeDriver sürüm uyuşmazlığı filmi
const seleniumVersionMismatchFilm = {
  type: 'video-scene',
  id: 'selenium-version-mismatch-film',
  title: {
    tr: '🎬 Cuma Gecesi Chrome Güncellendi: CI Neden Kırmızı?',
    en: '🎬 Chrome Updated Friday Night: Why Is CI Red?',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'chrome',  emoji: '🌍', label: { tr: 'Chrome (auto-update)',   en: 'Chrome (auto-update)' },   color: '#0ea5e9' },
    { id: 'driver',  emoji: '🔌', label: { tr: 'Eski ChromeDriver',      en: 'Old ChromeDriver' },        color: '#94a3b8' },
    { id: 'fail',    emoji: '💥', label: { tr: 'session not created',    en: 'session not created' },     color: '#ef4444' },
    { id: 'ci',      emoji: '☁️', label: { tr: 'CI pipeline (kırmızı)',  en: 'CI pipeline (red)' },       color: '#dc2626' },
    { id: 'manager', emoji: '🤖', label: { tr: 'Selenium Manager',       en: 'Selenium Manager' },        color: '#8b5cf6' },
    { id: 'match',   emoji: '🔗', label: { tr: 'Uyumlu sürücü',          en: 'Matching driver' },         color: '#22c55e' },
    { id: 'green',   emoji: '✅', label: { tr: 'CI yeşil',                en: 'CI green' },                color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Chrome, arka planda kendini otomatik günceller — kullanıcı hiçbir şey fark etmez. Ama CI ajanındaki ChromeDriver, DÜN\'ün Chrome sürümüne göre indirilmişti.',
        en: 'Chrome silently auto-updates itself in the background — the user notices nothing. But the ChromeDriver on the CI agent was downloaded for YESTERDAY\'s Chrome version.',
      },
      positions: { chrome: { x: 30, y: 50, scale: 1.15, pulse: true }, driver: { x: 65, y: 50, scale: 0.95, opacity: 0.7 } },
    },
    {
      caption: {
        tr: 'Pazartesi sabahı `new ChromeDriver()` çağrılır. Eski sürücü, yeni Chrome ile el sıkışamaz — W3C handshake başarısız olur.',
        en: 'Monday morning, `new ChromeDriver()` is called. The old driver cannot shake hands with the new Chrome — the W3C handshake fails.',
      },
      code: { tr: `WebDriver driver = new ChromeDriver();`, en: `WebDriver driver = new ChromeDriver();` },
      positions: {
        chrome: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        driver: { x: 50, y: 50, scale: 1.1 },
        fail: { x: 78, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'chrome', to: 'driver' }, { from: 'driver', to: 'fail', color: '#ef4444' }],
    },
    {
      caption: {
        tr: '`session not created: This version of ChromeDriver only supports Chrome version 128`. Kod değişmedi, test değişmedi — sadece Chrome\'un arka plan güncellemesi tüm pipeline\'ı durdurdu.',
        en: '`session not created: This version of ChromeDriver only supports Chrome version 128`. The code did not change, the test did not change — only Chrome\'s background update stopped the entire pipeline.',
      },
      code: { tr: `session not created: This version of ChromeDriver only supports Chrome version 128`, en: `session not created: This version of ChromeDriver only supports Chrome version 128` },
      positions: {
        fail: { x: 25, y: 45, scale: 1.05, pulse: true },
        ci: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'fail', to: 'ci', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Kontrast — Selenium 3 refleksi: sürücüyü elle indir, PATH\'e ekle, versiyonu elle takip et. Chrome her 4-6 haftada güncellendiğinden bu döngü SONSUZA dek tekrar eder.',
        en: 'Contrast — the Selenium 3 reflex: manually download the driver, add it to PATH, manually track the version. Since Chrome updates every 4-6 weeks, this cycle repeats FOREVER.',
      },
      positions: {
        ci: { x: 30, y: 45, scale: 1.05, pulse: true },
        driver: { x: 65, y: 55, scale: 0.85, opacity: 0.5 },
      },
    },
    {
      caption: {
        tr: 'Selenium 4\'ün çözümü: Selenium Manager. `new ChromeDriver()` çağrıldığında, yüklü Chrome sürümünü OTOMATİK tespit eder ve uyumlu sürücüyü kendisi indirir — Gradle\'ın bağımlılık çözümlemesi gibi.',
        en: 'Selenium 4\'s fix: Selenium Manager. When `new ChromeDriver()` is called, it AUTOMATICALLY detects the installed Chrome version and downloads the matching driver itself — like Gradle\'s dependency resolution.',
      },
      code: { tr: `WebDriver driver = new ChromeDriver();\n// Selenium Manager: Chrome 128 tespit edildi, uyumlu surucu indiriliyor...`, en: `WebDriver driver = new ChromeDriver();\n// Selenium Manager: detected Chrome 128, downloading matching driver...` },
      positions: {
        ci: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        manager: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'ci', to: 'manager', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Uyumlu sürücü saniyeler içinde iner, handshake başarılı olur — `new ChromeDriver()` artık her Chrome güncellemesinde SESSİZCE kendini onarır.',
        en: 'The matching driver downloads in seconds, the handshake succeeds — `new ChromeDriver()` now SILENTLY heals itself on every Chrome update.',
      },
      positions: {
        manager: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        match: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'manager', to: 'match', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — CI yeşile döner, kimsenin müdahalesi olmadan. Tek istisna: CI ajanının internet erişimi yoksa, Selenium Manager indiremez — o zaman sürücüyü proje artifact\'ı olarak SEN yönetmelisin.',
        en: 'Final — CI turns green with no human intervention. The one exception: if the CI agent has no internet access, Selenium Manager cannot download — then YOU must manage the driver as a project artifact.',
      },
      positions: {
        driver: { x: 12, y: 55, scale: 0.75, opacity: 0.5 },
        fail: { x: 30, y: 35, scale: 0.7, opacity: 0.4 },
        manager: { x: 54, y: 55, scale: 0.9 },
        match: { x: 74, y: 35, scale: 0.9 },
        green: { x: 92, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'manager', to: 'match' }, { from: 'match', to: 'green' }],
    },
  ],
}

// 🎯 Locators — sessiz yanlış eşleşme filmi
const seleniumSilentMismatchFilm = {
  type: 'video-scene',
  id: 'selenium-silent-mismatch-film',
  title: {
    tr: '🎬 En Tehlikeli Locator: By.className\'in Sessiz Tuzağı',
    en: '🎬 The Most Dangerous Locator: The Silent Trap of By.className',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'button',  emoji: '🔘', label: { tr: '"Satın Al" (class="btn")', en: '"Buy Now" (class="btn")' }, color: '#0ea5e9' },
    { id: 'locator', emoji: '🔍', label: { tr: 'By.className("btn")',      en: 'By.className("btn")' },      color: '#6366f1' },
    { id: 'green',   emoji: '✅', label: { tr: 'Test GEÇİYOR',             en: 'Test PASSES' },              color: '#22c55e' },
    { id: 'refactor',emoji: '🎨', label: { tr: 'Tasarımcı CSS\'i refactor eder', en: 'Designer refactors the CSS' }, color: '#f59e0b' },
    { id: 'other',   emoji: '🔗', label: { tr: '"İptal Et" (class="btn")', en: '"Cancel" (class="btn")' },  color: '#94a3b8' },
    { id: 'wrong',   emoji: '😱', label: { tr: 'Yanlış butona tıklandı',   en: 'Wrong button clicked' },    color: '#ef4444' },
    { id: 'stillgreen', emoji: '💀', label: { tr: 'Test YİNE geçiyor', en: 'Test STILL passes' },          color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: '`By.className("btn")` — "Satın Al" butonunu bulur, tıklar, test GEÇER. Her şey mükemmel görünüyor.',
        en: '`By.className("btn")` — finds the "Buy Now" button, clicks it, the test PASSES. Everything looks perfect.',
      },
      code: { tr: `driver.findElement(By.className("btn")).click();`, en: `driver.findElement(By.className("btn")).click();` },
      positions: { locator: { x: 30, y: 50, scale: 1.1 }, button: { x: 65, y: 50, scale: 1.15, pulse: true } },
      beams: [{ from: 'locator', to: 'button' }],
    },
    {
      caption: {
        tr: 'Test yeşil kaldı, kimse şüphelenmedi — ama `By.className` HER ZAMAN ilk eşleşen elementi döndürür, sayfada aynı class\'a sahip başka element OLMASA bile.',
        en: 'The test stayed green, nobody suspected anything — but `By.className` ALWAYS returns the first matching element, even if no other element shares that class YET.',
      },
      positions: {
        button: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        green: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'button', to: 'green', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Haftalar sonra: bir tasarımcı stil tutarlılığı için "İptal Et" butonuna da `class="btn"` ekler — sayfanın görünümü değişmez, ama artık İKİ eleman aynı class\'ı paylaşıyor.',
        en: 'Weeks later: a designer adds `class="btn"` to the "Cancel" button too, for style consistency — the page looks unchanged, but now TWO elements share that class.',
      },
      code: { tr: `<button class="btn">İptal Et</button>`, en: `<button class="btn">Cancel</button>` },
      positions: {
        green: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        refactor: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'green', to: 'refactor', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`By.className("btn")` artık DOM sırasına göre "İptal Et" butonunu buluyor olabilir — hangisinin önce geldiği CSS\'ten değil, HTML sırasından belirlenir.',
        en: '`By.className("btn")` may now find the "Cancel" button instead, depending on DOM order — which one comes first is determined by HTML order, not CSS.',
      },
      positions: {
        refactor: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        other: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'refactor', to: 'other', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Test AYNI kodu çalıştırır, AYNI şekilde tıklar — ama artık "Satın Al" yerine "İptal Et"e tıklıyor. Hiçbir exception YOK, çünkü element gerçekten bulundu ve gerçekten tıklanabilirdi.',
        en: 'The test runs the SAME code, clicks the SAME way — but now it clicks "Cancel" instead of "Buy Now". There is NO exception, because the element genuinely existed and was genuinely clickable.',
      },
      positions: {
        other: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        wrong: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'other', to: 'wrong', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Test raporunda: "PASSED". Ama gerçekte ödeme akışı test EDİLMEDİ — sipariş iptal edildi ve kimse fark etmedi. Bu, bulunması en zor flaky test türüdür: hata vermeyen, sessizce YANLIŞ çalışan test.',
        en: 'The test report says: "PASSED". But the checkout flow was never actually tested — an order was cancelled and nobody noticed. This is the hardest kind of flaky test to find: one that errors nowhere, but silently does the WRONG thing.',
      },
      positions: {
        wrong: { x: 25, y: 45, scale: 0.95, opacity: 0.7 },
        stillgreen: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'wrong', to: 'stillgreen', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: `By.className` sınıf tipiyle değil AD\'la eşleştirme yapan `instanceof` kontrolü gibidir; birden fazla sınıf aynı adı paylaşırsa yanlış nesneyi yakalarsın. Güvenli seçim: `By.id` veya `data-testid` — tasarımın ASLA dokunmayacağı bir kimlik.',
        en: 'Final — the Java bridge: `By.className` is like an `instanceof` check that matches by NAME, not by unique identity; if multiple classes share a name, you catch the wrong object. The safe choice: `By.id` or `data-testid` — an identity design will NEVER touch.',
      },
      positions: {
        locator: { x: 10, y: 55, scale: 0.75 },
        button: { x: 28, y: 35, scale: 0.8, opacity: 0.6 },
        refactor: { x: 50, y: 55, scale: 0.85 },
        other: { x: 70, y: 35, scale: 0.85 },
        stillgreen: { x: 92, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'locator', to: 'refactor' }, { from: 'refactor', to: 'other' }, { from: 'other', to: 'stillgreen' }],
    },
  ],
}

// ⚡ Aksiyonlar — drag-and-drop sessiz yanlış PASS filmi
const seleniumActionsChainFilm = {
  type: 'video-scene',
  id: 'selenium-actions-chain-film',
  title: {
    tr: '🎬 element.click() ile Yazılan Drag-and-Drop Testi Neden Yalan Söyler',
    en: '🎬 Why a Drag-and-Drop Test Written with element.click() Lies',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'widget',  emoji: '🧩', label: { tr: 'Drag-and-drop widget',    en: 'Drag-and-drop widget' },    color: '#0ea5e9' },
    { id: 'click',   emoji: '🖱️', label: { tr: 'element.click()',        en: 'element.click()' },         color: '#94a3b8' },
    { id: 'localpass', emoji: '✅', label: { tr: 'Lokal: "çalışıyor"',   en: 'Local: "it works"' },        color: '#22c55e' },
    { id: 'actions', emoji: '🔗', label: { tr: 'Actions.perform()',      en: 'Actions.perform()' },        color: '#8b5cf6' },
    { id: 'events',  emoji: '⚡', label: { tr: 'mousedown→mousemove→mouseup', en: 'mousedown→mousemove→mouseup' }, color: '#f59e0b' },
    { id: 'staging', emoji: '☁️', label: { tr: 'Staging (gerçek listener)', en: 'Staging (real listener)' }, color: '#dc2626' },
    { id: 'truepass',emoji: '🏆', label: { tr: 'Gerçek geçen test',       en: 'Genuinely passing test' },   color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir geliştirici drag-and-drop widget\'ını test etmek için basit `element.click()` yazar — hızlı, tanıdık, önceki testlerde hep işe yaramıştı.',
        en: 'A developer writes a simple `element.click()` to test a drag-and-drop widget — fast, familiar, always worked in previous tests.',
      },
      code: { tr: `sourceElement.click();\ntargetElement.click();`, en: `sourceElement.click();\ntargetElement.click();` },
      positions: { widget: { x: 30, y: 50, scale: 1.1 }, click: { x: 65, y: 50, scale: 1.15, pulse: true } },
      beams: [{ from: 'click', to: 'widget' }],
    },
    {
      caption: {
        tr: 'Lokal makinede test YEŞİL — element bulundu, tıklandı, hiçbir exception yok. "Çalışıyor" diye commit edilir.',
        en: 'On the local machine the test is GREEN — the element was found, clicked, no exception. It gets committed as "it works".',
      },
      positions: {
        click: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        localpass: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'click', to: 'localpass', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Gerçek şu: `element.click()` tarayıcıya sadece "tıklanmış gibi davran" der — drag-and-drop widget\'larının dinlediği `mousedown`, `mousemove`, `mouseup` olaylarının HİÇBİRİNİ tetiklemez.',
        en: 'The reality: `element.click()` only tells the browser "act as if clicked" — it triggers NONE of the `mousedown`, `mousemove`, `mouseup` events a drag-and-drop widget actually listens for.',
      },
      positions: {
        localpass: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        events: { x: 60, y: 50, scale: 1.15, pulse: true, opacity: 0.5 },
      },
    },
    {
      caption: {
        tr: 'Doğru araç: Actions API. Java\'da `new Actions(driver)` ile başlayan zincir, tıpkı StringBuilder gibi hareketleri BİRİKTİRİR, `.perform()` çağrılana kadar hiçbir şey tetiklenmez.',
        en: 'The right tool: the Actions API. The chain starting with `new Actions(driver)` in Java ACCUMULATES movements just like StringBuilder — nothing fires until `.perform()` is called.',
      },
      code: { tr: `new Actions(driver)\n  .clickAndHold(sourceElement)\n  .moveToElement(targetElement)\n  .release()\n  .perform();`, en: `new Actions(driver)\n  .clickAndHold(sourceElement)\n  .moveToElement(targetElement)\n  .release()\n  .perform();` },
      positions: {
        events: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        actions: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'events', to: 'actions', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: '`.perform()` çağrıldığında zincir GERÇEK mouse olaylarının tamamını sırayla tetikler: mousedown → mousemove → mouseup — widget\'ın beklediği TAM olay dizisi.',
        en: 'When `.perform()` is called, the chain fires the FULL sequence of real mouse events in order: mousedown → mousemove → mouseup — the EXACT event sequence the widget expects.',
      },
      positions: {
        actions: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        events: { x: 56, y: 50, scale: 1.2, pulse: true, opacity: 1 },
      },
      beams: [{ from: 'actions', to: 'events', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Kontrast — staging\'de gerçek JavaScript event listener\'ları devreye girince `element.click()` yazılmış test SESSİZCE yanlış PASS verir; widget hiç sürüklenmemiştir ama exception yoktur.',
        en: 'Contrast — in staging, once the real JavaScript event listeners kick in, the test written with `element.click()` SILENTLY passes wrong; the widget was never actually dragged, yet there is no exception.',
      },
      positions: {
        events: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        staging: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'events', to: 'staging', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: Actions API, StringBuilder\'a append edip en sonda `toString()` çağırmaya benzer — hareketleri BİRİKTİR, tek seferde `.perform()` ile çalıştır. Widget gerçekten sürüklenir, test GERÇEKTEN geçer.',
        en: 'Final — the Java bridge: the Actions API is like appending to a StringBuilder and calling `toString()` at the end — ACCUMULATE the movements, execute them all at once with `.perform()`. The widget is genuinely dragged, the test genuinely passes.',
      },
      positions: {
        widget: { x: 12, y: 55, scale: 0.8 },
        click: { x: 30, y: 35, scale: 0.75, opacity: 0.5 },
        actions: { x: 54, y: 55, scale: 0.9 },
        staging: { x: 72, y: 35, scale: 0.8, opacity: 0.6 },
        truepass: { x: 92, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'actions', to: 'truepass' }],
    },
  ],
}

// ⏳ Wait — Thread.sleep refleksi filmi
const seleniumWaitReflexFilm = {
  type: 'video-scene',
  id: 'selenium-wait-reflex-film',
  title: {
    tr: '🎬 50 Test × 2 Saniye: Thread.sleep()\'in Gizli Faturası',
    en: '🎬 50 Tests × 2 Seconds: The Hidden Bill of Thread.sleep()',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'element', emoji: '🔘', label: { tr: 'Async yüklenen buton',   en: 'Async-loaded button' },     color: '#0ea5e9' },
    { id: 'sleep',   emoji: '💤', label: { tr: 'Thread.sleep(3000)',     en: 'Thread.sleep(3000)' },       color: '#94a3b8' },
    { id: 'waste',   emoji: '⏱️', label: { tr: '100 saniye israf (50 test)', en: '100 seconds wasted (50 tests)' }, color: '#dc2626' },
    { id: 'flaky',   emoji: '🎲', label: { tr: 'Yine de flaky',          en: 'Still flaky' },              color: '#ef4444' },
    { id: 'explicit',emoji: '🎯', label: { tr: 'ExplicitWait + koşul',   en: 'ExplicitWait + condition' }, color: '#8b5cf6' },
    { id: 'fast',    emoji: '⚡', label: { tr: '0.5 saniyede geçti',     en: 'Passed in 0.5 seconds' },    color: '#22c55e' },
    { id: 'reliable',emoji: '✅', label: { tr: 'Güvenilir + hızlı',      en: 'Reliable + fast' },          color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir buton, API çağrısı bitince ekranda belirir — ne zaman hazır olacağı belirsizdir. Refleks çözüm: `Thread.sleep(3000)` ekle, "3 saniye yeter" diye düşün.',
        en: 'A button appears once an API call finishes — exactly when it will be ready is unknown. The reflex fix: add `Thread.sleep(3000)`, thinking "3 seconds should be enough".',
      },
      code: { tr: `Thread.sleep(3000);\ndriver.findElement(By.id("submitBtn")).click();`, en: `Thread.sleep(3000);\ndriver.findElement(By.id("submitBtn")).click();` },
      positions: { element: { x: 30, y: 50, scale: 1.1 }, sleep: { x: 65, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Buton 0.5 saniyede hazır olsa BİLE, `Thread.sleep(3000)` yine de tam 3 saniye bekler — geri kalan 2.5 saniye saf, geri kazanılamaz zaman kaybıdır.',
        en: 'Even if the button is ready in 0.5 seconds, `Thread.sleep(3000)` still waits the FULL 3 seconds — the remaining 2.5 seconds are pure, unrecoverable waste.',
      },
      positions: {
        sleep: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        element: { x: 55, y: 50, scale: 1, opacity: 0.6 },
      },
    },
    {
      caption: {
        tr: '50 testin her biri ortalama 2 saniye böyle bekliyorsa: 50 × 2 = 100 saniye — her CI koşumunda, hiçbir katma değer olmadan.',
        en: 'If each of 50 tests waits about 2 seconds like this: 50 × 2 = 100 seconds — on every CI run, with zero added value.',
      },
      code: { tr: `50 test x ortalama 2sn sleep = 100 saniye israf`, en: `50 tests x average 2s sleep = 100 seconds wasted` },
      positions: {
        element: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        waste: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'element', to: 'waste', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Daha kötüsü: ağ gecikmesi arttığında buton 3 saniyeden GEÇ gelirse, sabit sleep yine de yetersiz kalır — test hâlâ flaky\'dir, sadece daha yavaş flaky.',
        en: 'Worse: if network latency spikes and the button takes LONGER than 3 seconds, the fixed sleep is still insufficient — the test is still flaky, just slower and flaky.',
      },
      positions: {
        waste: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        flaky: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'waste', to: 'flaky', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Doğru araç: `WebDriverWait` + `ExpectedConditions.elementToBeClickable`. Bu, sabit süre DEĞİL, bir KOŞUL bekler — koşul sağlanır sağlanmaz devam eder.',
        en: 'The right tool: `WebDriverWait` + `ExpectedConditions.elementToBeClickable`. This waits for a CONDITION, not a fixed duration — it proceeds the instant the condition is met.',
      },
      code: { tr: `new WebDriverWait(driver, Duration.ofSeconds(10))\n  .until(ExpectedConditions.elementToBeClickable(By.id("submitBtn")))\n  .click();`, en: `new WebDriverWait(driver, Duration.ofSeconds(10))\n  .until(ExpectedConditions.elementToBeClickable(By.id("submitBtn")))\n  .click();` },
      positions: {
        flaky: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        explicit: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'flaky', to: 'explicit', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Buton 0.5 saniyede hazır olursa, test 0.5 saniyede devam eder — 10 saniyelik timeout sadece bir GÜVENLİK AĞIDIR, sabit bir bekleme değil.',
        en: 'If the button is ready in 0.5 seconds, the test proceeds in 0.5 seconds — the 10-second timeout is only a SAFETY NET, not a fixed wait.',
      },
      positions: {
        explicit: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        fast: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'explicit', to: 'fast', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: Thread.sleep() süresi sabit bir `Thread.sleep()` çağrısıdır, koşulu hiç sormaz; `WebDriverWait` ise bloklu bir `CompletableFuture.get(timeout, SECONDS)` gibidir — HANGİ koşulu beklediğini sen tanımlarsın, gereksiz bekleme ve erken exception ikisi de önlenir.',
        en: 'Final — the Java bridge: Thread.sleep() is a fixed call that never asks about the condition; `WebDriverWait` is like a blocking `CompletableFuture.get(timeout, SECONDS)` — YOU define which condition it waits for, preventing both wasted time and premature exceptions.',
      },
      positions: {
        sleep: { x: 12, y: 55, scale: 0.75, opacity: 0.5 },
        waste: { x: 30, y: 35, scale: 0.7, opacity: 0.4 },
        explicit: { x: 54, y: 55, scale: 0.9 },
        fast: { x: 74, y: 35, scale: 0.85 },
        reliable: { x: 92, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'explicit', to: 'fast' }, { from: 'fast', to: 'reliable' }],
    },
  ],
}

// 🪟 Frames & Alert — ödeme iframe'i sessiz kilit filmi
const seleniumIframeContextFilm = {
  type: 'video-scene',
  id: 'selenium-iframe-context-film',
  title: {
    tr: '🎬 "Satın Al" Butonu Bulundu Ama Tıklanamıyor — iframe Vakası',
    en: '🎬 The "Buy Now" Button Was Found But Can\'t Be Clicked — The iframe Case',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'page',    emoji: '📄', label: { tr: 'Ana sayfa DOM\'u',       en: 'Main page DOM' },           color: '#0ea5e9' },
    { id: 'iframe',  emoji: '🖼️', label: { tr: 'Ödeme iframe\'i (Stripe)', en: 'Payment iframe (Stripe)' }, color: '#8b5cf6' },
    { id: 'find',    emoji: '🔍', label: { tr: 'findElement (ana bağlam)', en: 'findElement (main context)' }, color: '#94a3b8' },
    { id: 'noexc',   emoji: '❓', label: { tr: 'Exception YOK',           en: 'NO exception' },            color: '#f59e0b' },
    { id: 'switch',  emoji: '🔀', label: { tr: 'switchTo().frame()',      en: 'switchTo().frame()' },      color: '#22c55e' },
    { id: 'clicked', emoji: '✅', label: { tr: 'Gerçekten tıklandı',      en: 'Genuinely clicked' },       color: '#16a34a' },
    { id: 'unpaid',  emoji: '💸', label: { tr: 'Ödeme akışı test edilmedi', en: 'Payment flow never tested' }, color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Ödeme sayfası görsel olarak TEK bir bütün görünür — ama "Satın Al" butonu aslında Stripe\'ın kendi iframe\'inin İÇİNDEDİR, ayrı bir DOM bağlamında.',
        en: 'The payment page LOOKS like a single unit — but the "Buy Now" button actually lives INSIDE Stripe\'s own iframe, in a separate DOM context.',
      },
      positions: { page: { x: 30, y: 50, scale: 1.1, pulse: true }, iframe: { x: 65, y: 50, scale: 1 } },
      beams: [{ from: 'page', to: 'iframe' }],
    },
    {
      caption: {
        tr: 'Test, ana sayfa bağlamından `driver.findElement(By.id("payBtn"))` çağırır — geçiş (switchTo) yapılmamıştır.',
        en: 'The test calls `driver.findElement(By.id("payBtn"))` from the main page context — no switch (switchTo) has happened.',
      },
      code: { tr: `driver.findElement(By.id("payBtn")).click();`, en: `driver.findElement(By.id("payBtn")).click();` },
      positions: {
        page: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        find: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'page', to: 'find' }],
    },
    {
      caption: {
        tr: 'Java\'da bir ClassLoader\'ın başka bir ClassLoader\'ın sınıflarını GÖRMEMESİ gibi: ana bağlam, iframe İÇİNDEKİ elementleri göremez. Ama burada beklenen `NoSuchElementException` gelmez!',
        en: 'Like a Java ClassLoader that cannot SEE classes loaded by another ClassLoader: the main context cannot see elements INSIDE the iframe. But the expected `NoSuchElementException` does not appear here!',
      },
      positions: {
        find: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        noexc: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Neden çünkü buton, ana sayfanın KENDİ HTML\'inde farklı bir amaçla zaten var olabilir (örn. bir wrapper div) — element bulunur, tıklanır, ama Stripe\'ın GERÇEK butonuna hiç dokunulmaz.',
        en: 'Because the button may already exist in the main page\'s OWN HTML for a different purpose (e.g. a wrapper div) — the element is found, clicked, but Stripe\'s REAL button is never touched.',
      },
      positions: {
        noexc: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        iframe: { x: 56, y: 50, scale: 1.15, pulse: true, opacity: 0.5 },
      },
    },
    {
      caption: {
        tr: 'Doğru akış: önce `driver.switchTo().frame("stripe-frame")` ile bağlamı DEĞİŞTİR — artık findElement, iframe\'in İÇİNDEKİ gerçek DOM\'a bakar.',
        en: 'The correct flow: first CHANGE context with `driver.switchTo().frame("stripe-frame")` — now findElement looks at the real DOM INSIDE the iframe.',
      },
      code: { tr: `driver.switchTo().frame("stripe-frame");\ndriver.findElement(By.id("payBtn")).click();\ndriver.switchTo().defaultContent();`, en: `driver.switchTo().frame("stripe-frame");\ndriver.findElement(By.id("payBtn")).click();\ndriver.switchTo().defaultContent();` },
      positions: {
        iframe: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        switch: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'iframe', to: 'switch', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Artık buton GERÇEKTEN tıklanır — Stripe\'ın kendi JavaScript event listener\'ı tetiklenir, ödeme akışı GERÇEKTEN test edilmiş olur.',
        en: 'Now the button is GENUINELY clicked — Stripe\'s own JavaScript event listener fires, the payment flow is GENUINELY tested.',
      },
      positions: {
        switch: { x: 25, y: 45, scale: 0.95, opacity: 0.7 },
        clicked: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'switch', to: 'clicked', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — kontrast bedeli: switchTo() atlanırsa test yine PASS verir ("bir şeye" tıklandı) ama gerçek ödeme akışı hiç dokunulmamıştır — production\'da bulunması aylar süren bir bug.',
        en: 'Final — the cost of skipping switchTo(): the test still PASSES ("something" was clicked) but the real payment flow was never touched — a bug that takes months to find in production.',
      },
      positions: {
        find: { x: 12, y: 55, scale: 0.75 },
        noexc: { x: 30, y: 35, scale: 0.7, opacity: 0.5 },
        switch: { x: 54, y: 55, scale: 0.9 },
        clicked: { x: 72, y: 35, scale: 0.85 },
        unpaid: { x: 90, y: 55, scale: 1.05, opacity: 0.7 },
      },
      beams: [{ from: 'find', to: 'unpaid', color: '#dc2626' }, { from: 'switch', to: 'clicked' }],
    },
  ],
}

// 🛠️ Gerçek Hayat — E2E ödeme fonksiyonu test edilmedi filmi
const seleniumE2eFunnelFilm = {
  type: 'video-scene',
  id: 'selenium-e2e-funnel-film',
  title: {
    tr: '🎬 Sepet Çalışıyor, Ödeme Bozuk — CI Neden Hâlâ Yeşil?',
    en: '🎬 The Cart Works, Checkout Is Broken — Why Is CI Still Green?',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'login',   emoji: '🔑', label: { tr: 'LoginPage',              en: 'LoginPage' },              color: '#0ea5e9' },
    { id: 'search',  emoji: '🔍', label: { tr: 'ProductSearchPage',       en: 'ProductSearchPage' },      color: '#6366f1' },
    { id: 'cart',    emoji: '🛒', label: { tr: 'CartPage',                en: 'CartPage' },                color: '#8b5cf6' },
    { id: 'checkout',emoji: '💳', label: { tr: 'CheckoutPage (test YOK)', en: 'CheckoutPage (NO test)' },  color: '#94a3b8' },
    { id: 'ci',      emoji: '☁️', label: { tr: 'CI (yeşil)',              en: 'CI (green)' },              color: '#22c55e' },
    { id: 'broken',  emoji: '💥', label: { tr: 'Ödeme butonu bozuk',      en: 'Checkout button broken' },  color: '#ef4444' },
    { id: 'revenue', emoji: '📉', label: { tr: 'Gelir kaybı',             en: 'Revenue loss' },            color: '#dc2626' },
  ],
  scenes: [
    {
      caption: {
        tr: 'E-ticaret E2E senaryosu bir FUNNEL\'dır: giriş → ürün arama → sepete ekleme → ödeme. Her adım bir öncekinin ön koşuludur — Page Object Model her sayfayı ayrı bir class yapar.',
        en: 'The e-commerce E2E scenario is a FUNNEL: login → product search → add to cart → checkout. Each step is a precondition for the next — the Page Object Model makes each page its own class.',
      },
      positions: { login: { x: 20, y: 50, scale: 1.1, pulse: true }, search: { x: 45, y: 50, scale: 0.9 }, cart: { x: 70, y: 50, scale: 0.9 } },
      beams: [{ from: 'login', to: 'search' }, { from: 'search', to: 'cart' }],
    },
    {
      caption: {
        tr: '`LoginPage.login()` → `ProductSearchPage.search()` → `CartPage.addToCart()` — her adım test edilir, hepsi yeşil. Sepet simgesi güncellenir, sayım doğru.',
        en: '`LoginPage.login()` → `ProductSearchPage.search()` → `CartPage.addToCart()` — every step is tested, all green. The cart icon updates, the count is correct.',
      },
      code: { tr: `LoginPage login = new LoginPage(driver);\nlogin.login("qa@test.com", "pass123");`, en: `LoginPage login = new LoginPage(driver);\nlogin.login("qa@test.com", "pass123");` },
      positions: {
        login: { x: 22, y: 50, scale: 0.95, opacity: 0.7 },
        cart: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'login', to: 'cart', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Ama funnel\'ın SON adımı — `CheckoutPage` — hiç bir test dosyasında yer almaz. "Sepete ekle çalışıyor, gerisi zaten aynı mantık" varsayımıyla atlanmıştır.',
        en: 'But the LAST step of the funnel — `CheckoutPage` — appears in no test file at all. It was skipped under the assumption "add-to-cart works, the rest is the same logic anyway".',
      },
      positions: {
        cart: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        checkout: { x: 58, y: 50, scale: 1.15, opacity: 0.6 },
      },
    },
    {
      caption: {
        tr: 'CI, sadece YAZILMIŞ testleri çalıştırır — checkout hiç yazılmadığı için CI\'ın "başarısız olacağı" bir test YOK. Pipeline tertemiz yeşil kalır.',
        en: 'CI only runs the tests that were WRITTEN — since checkout was never written, there is NO test for CI to fail. The pipeline stays perfectly green.',
      },
      positions: {
        checkout: { x: 25, y: 45, scale: 0.95, opacity: 0.7 },
        ci: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'checkout', to: 'ci', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Gerçekte: bir deploy, checkout sayfasındaki ödeme butonunu KIRAR — buton hâlâ görünür ama tıklandığında hiçbir şey olmaz (JS hatası, konsol\'da sessizce).',
        en: 'In reality: a deploy BREAKS the checkout page\'s payment button — the button is still visible, but clicking it does nothing (a JS error, silent in the console).',
      },
      positions: {
        ci: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        broken: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'ci', to: 'broken', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'CI hâlâ YEŞİL — çünkü kırılan şey hiçbir zaman test edilmemişti. Bu bug\'ı bulan ilk kişi bir QA mühendisi değil, ödeme yapamayan gerçek bir müşteri olur.',
        en: 'CI is STILL GREEN — because the broken thing was never tested. The first person to find this bug is not a QA engineer, it is a real customer who cannot pay.',
      },
      positions: {
        broken: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        revenue: { x: 56, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'broken', to: 'revenue', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: unit test entegrasyon testinin YERİNİ tutmaz — biri backend mantığını izole doğrular, diğeri kullanıcının GERÇEKTEN gördüğü frontend state\'i. Funnel\'ın HER adımı, en riskli olanı dahil, E2E\'de yer almalıdır.',
        en: 'Final — the Java bridge: a unit test does NOT substitute for an integration test — one verifies backend logic in isolation, the other verifies the frontend state the user ACTUALLY sees. EVERY step of the funnel, including the riskiest one, belongs in E2E.',
      },
      positions: {
        login: { x: 10, y: 55, scale: 0.75 },
        search: { x: 26, y: 35, scale: 0.7, opacity: 0.5 },
        cart: { x: 48, y: 55, scale: 0.85 },
        checkout: { x: 68, y: 35, scale: 0.8, opacity: 0.6 },
        revenue: { x: 90, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'login', to: 'cart' }, { from: 'cart', to: 'checkout' }, { from: 'checkout', to: 'revenue' }],
    },
  ],
}

// 🌐 Giriş — WebDriver API akış step-animation'ı ve sandbox'ı (kod bloğu olmayan sekme için eksik tamamlama)
const seleniumIntroFlowSteps = {
  type: 'step-animation',
  id: 'selenium-intro-flow-step-01',
  title: { tr: 'Adım Adım: Bir Komutun WebDriver Zincirinden Geçişi', en: 'Step by Step: A Command\'s Journey Through the WebDriver Chain' },
  steps: [
    { id: 1, icon: '📝', label: { tr: 'Test kodu komut verir', en: 'Test code issues a command' }, detail: { tr: '`driver.findElement(By.id("x")).click()` çağrılır — bu, standart WebDriver API\'sine giden bir istektir.', en: 'Calling `driver.findElement(By.id("x")).click()` — this is a request sent to the standard WebDriver API.' } },
    { id: 2, icon: '🔌', label: { tr: 'Sürücüye W3C isteği gider', en: 'A W3C request goes to the driver' }, detail: { tr: 'API, isteği W3C WebDriver protokolü olarak ChromeDriver/GeckoDriver\'a HTTP üzerinden gönderir.', en: 'The API sends the request as the W3C WebDriver protocol to ChromeDriver/GeckoDriver over HTTP.' } },
    { id: 3, icon: '🌍', label: { tr: 'Gerçek tarayıcı çalıştırır', en: 'The real browser executes it' }, detail: { tr: 'Sürücü, komutu GERÇEK Chrome/Firefox\'a iletir — simüle edilmiş bir motor değil, kullanıcının kullandığı motorun ta kendisi.', en: 'The driver relays the command to the REAL Chrome/Firefox — not a simulated engine, the exact engine a user would use.' } },
    { id: 4, icon: '📄', label: { tr: 'DOM üzerinde ölçülür', en: 'It is measured on the DOM' }, detail: { tr: 'Element gerçekten var mı, tıklanabilir mi, tıklandığında ne değişti — bu sorular sadece bu katmanda cevaplanabilir.', en: 'Does the element truly exist, is it clickable, what changed when clicked — these questions can only be answered at this layer.' } },
    { id: 5, icon: '✅', label: { tr: 'Sonuç test koduna döner', en: 'The result returns to the test code' }, detail: { tr: 'Başarı/hata bilgisi zincirden geriye akar; bu geri bildirim, bir unit testin ASLA ulaşamayacağı bir kanıttır.', en: 'Success/failure flows back through the chain; this feedback is proof a unit test can NEVER reach.' } },
  ],
}

// 🔗 Ekosistem — 60 dakikadan 3 dakikaya Grid paralelleştirme filmi
const seleniumGridSpeedupFilm = {
  type: 'video-scene',
  id: 'selenium-grid-speedup-film',
  title: {
    tr: '🎬 200 Test, Tek Node: Neden Herkes "Bekleyemem" Diyor',
    en: '🎬 200 Tests, One Node: Why Everyone Says "I Can\'t Wait"',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'suite',   emoji: '🧪', label: { tr: '200 E2E test',           en: '200 E2E tests' },          color: '#0ea5e9' },
    { id: 'single',  emoji: '🖥️', label: { tr: 'Tek Node (sıralı)',       en: 'Single Node (sequential)' }, color: '#94a3b8' },
    { id: 'slow',    emoji: '🐌', label: { tr: '40-60 dakika',            en: '40-60 minutes' },          color: '#dc2626' },
    { id: 'pileup',  emoji: '📚', label: { tr: 'Commit üstüne commit',    en: 'Commit piling on commit' }, color: '#ef4444' },
    { id: 'grid',    emoji: '🌐', label: { tr: 'Selenium Grid (20 Node)', en: 'Selenium Grid (20 Nodes)' }, color: '#8b5cf6' },
    { id: 'parallel',emoji: '⚡', label: { tr: '20 paralel koşum',        en: '20 parallel runs' },       color: '#22c55e' },
    { id: 'fast',    emoji: '✅', label: { tr: '3-4 dakika',              en: '3-4 minutes' },            color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: '200 E2E test yazıldı — hepsi değerli, hepsi gerçek kullanıcı akışlarını doğruluyor. Ama hepsi TEK bir Node\'da SIRAYLA çalıştırılıyor.',
        en: '200 E2E tests were written — all valuable, all verifying real user flows. But all of them run SEQUENTIALLY on a SINGLE Node.',
      },
      positions: { suite: { x: 30, y: 50, scale: 1.1, pulse: true }, single: { x: 65, y: 50, scale: 1.1 } },
      beams: [{ from: 'suite', to: 'single' }],
    },
    {
      caption: {
        tr: 'Her test ortalama 15-20 saniye sürüyor — tek başına makul. Ama 200 test × sıralı çalışma = CI pipeline\'ı 40-60 dakika BLOKE ediyor.',
        en: 'Each test takes 15-20 seconds on average — reasonable alone. But 200 tests × sequential execution = the CI pipeline is BLOCKED for 40-60 minutes.',
      },
      positions: {
        single: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        slow: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'single', to: 'slow', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Geliştiriciler bir sonucun gelmesini 60 dakika bekleyemez — "zaten bekleyemem" der ve önceki commit\'in üzerine yeni commit atmaya başlarlar.',
        en: 'Developers cannot wait 60 minutes for a result — they say "I can\'t wait anyway" and start stacking new commits on top of the previous one.',
      },
      positions: {
        slow: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        pileup: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'slow', to: 'pileup', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Sonuç: hangi commit\'in hangi testi kırdığı belirsizleşir, feedback loop kopar, test raporları kimsenin açmadığı bir e-postaya dönüşür.',
        en: 'The result: which commit broke which test becomes unclear, the feedback loop breaks, test reports become an email nobody opens.',
      },
      positions: {
        pileup: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        single: { x: 60, y: 55, scale: 0.9, opacity: 0.5 },
      },
    },
    {
      caption: {
        tr: 'Selenium Grid devreye girer: aynı 200 test, 20 farklı Node\'a DAĞITILIR — Java\'nın ForkJoinPool\'unun tek JVM yerine tarayıcı Node\'larına genişlemiş hali.',
        en: 'Selenium Grid steps in: the same 200 tests are DISTRIBUTED across 20 different Nodes — Java\'s ForkJoinPool, expanded from a single JVM to browser Nodes.',
      },
      code: { tr: `docker compose up --scale chrome=20`, en: `docker compose up --scale chrome=20` },
      positions: {
        pileup: { x: 22, y: 45, scale: 0.85, opacity: 0.5 },
        grid: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'pileup', to: 'grid', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: '200 test artık 20 Node\'a eşit dağılır — her Node yaklaşık 10 test çalıştırır, HEPSİ AYNI ANDA.',
        en: 'The 200 tests are now evenly split across 20 Nodes — each Node runs about 10 tests, ALL AT THE SAME TIME.',
      },
      positions: {
        grid: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        parallel: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'grid', to: 'parallel', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: bu, JUnit 5\'in `@Execution(CONCURRENT)`\'ının tarayıcı boyutuna genişlemesidir. Toplam süre 40-60 dakikadan 3-4 dakikaya düşer; geliştiriciler artık sonucu BEKLEYEBİLİR, feedback loop yeniden kurulur.',
        en: 'Final — the Java bridge: this is JUnit 5\'s `@Execution(CONCURRENT)` expanded to the scale of browsers. Total time drops from 40-60 minutes to 3-4 minutes; developers can now WAIT for the result, the feedback loop is restored.',
      },
      positions: {
        suite: { x: 12, y: 55, scale: 0.8 },
        single: { x: 30, y: 35, scale: 0.7, opacity: 0.4 },
        grid: { x: 54, y: 55, scale: 0.9 },
        parallel: { x: 74, y: 35, scale: 0.85 },
        fast: { x: 92, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'grid', to: 'parallel' }, { from: 'parallel', to: 'fast' }],
    },
  ],
}

// 🌐 CDP & BiDi — sessiz JS hatasını yakalama filmi
const seleniumBidiListenerFilm = {
  type: 'video-scene',
  id: 'selenium-bidi-listener-film',
  title: {
    tr: '🎬 Konsoldaki Sessiz Hata: Klasik WebDriver Neden Onu Hiç Görmez',
    en: '🎬 The Silent Console Error: Why Classic WebDriver Never Sees It',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test',    emoji: '🧪', label: { tr: 'Test: butona tıkla, assert et', en: 'Test: click button, assert' }, color: '#0ea5e9' },
    { id: 'http',    emoji: '📨', label: { tr: 'Klasik WebDriver (HTTP)',   en: 'Classic WebDriver (HTTP)' },  color: '#94a3b8' },
    { id: 'jserror', emoji: '💥', label: { tr: 'Sessiz JS hatası (konsol)', en: 'Silent JS error (console)' }, color: '#ef4444' },
    { id: 'greenwrong', emoji: '✅', label: { tr: 'Test YİNE geçiyor',    en: 'Test STILL passes' },        color: '#dc2626' },
    { id: 'bidi',    emoji: '🔌', label: { tr: 'WebDriver BiDi (WebSocket)', en: 'WebDriver BiDi (WebSocket)' }, color: '#8b5cf6' },
    { id: 'listener',emoji: '👂', label: { tr: 'Log.entryAdded() dinleyici', en: 'Log.entryAdded() listener' }, color: '#f59e0b' },
    { id: 'caught',  emoji: '🎯', label: { tr: 'Hata yakalandı, test FAIL', en: 'Error caught, test FAILS' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Test butona tıklar ve bir sonraki elementin göründüğünü doğrular — assertion GEÇER. Görünüşe göre her şey yolunda.',
        en: 'The test clicks a button and asserts that the next element appears — the assertion PASSES. Everything looks fine.',
      },
      positions: { test: { x: 30, y: 50, scale: 1.1, pulse: true }, http: { x: 65, y: 50, scale: 1.1 } },
      beams: [{ from: 'test', to: 'http' }],
    },
    {
      caption: {
        tr: 'Klasik WebDriver mimarisi tek yönlüdür: komut gönder → HTTP response al. Java\'da klasik bir blocking REST çağrısı gibi — tarayıcının arka planda BAŞKA ne yaptığını hiç bilmezsin.',
        en: 'Classic WebDriver is one-directional: send a command → get an HTTP response. Like a classic blocking REST call in Java — you never know what ELSE the browser is doing in the background.',
      },
      positions: {
        http: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        test: { x: 56, y: 50, scale: 1, opacity: 0.7 },
      },
    },
    {
      caption: {
        tr: 'Ama o sırada konsolda: `TypeError: Cannot read properties of undefined`. Butonun ARKASINDAKİ bir JS fonksiyonu sessizce patladı — ekranda hiçbir görsel değişiklik olmadı.',
        en: 'But meanwhile, in the console: `TypeError: Cannot read properties of undefined`. A JS function BEHIND the button silently blew up — no visual change appeared on screen.',
      },
      code: { tr: `TypeError: Cannot read properties of undefined (reading 'total')`, en: `TypeError: Cannot read properties of undefined (reading 'total')` },
      positions: {
        http: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        jserror: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'http', to: 'jserror', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Klasik WebDriver bu hatayı GÖREMEZ — konsol logu WebDriver protokolünün parçası değildir. Test PASSED yazar, ama sepet toplamı hesaplanamadı.',
        en: 'Classic WebDriver CANNOT see this error — the console log is not part of the WebDriver protocol. The test says PASSED, but the cart total was never calculated.',
      },
      positions: {
        jserror: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        greenwrong: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'jserror', to: 'greenwrong', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Selenium 4\'ün çözümü: WebDriver BiDi. HTTP yerine kalıcı bir WebSocket tüneli açar — Java\'daki CompletableFuture + event listener mimarisine benzer.',
        en: 'Selenium 4\'s fix: WebDriver BiDi. It opens a persistent WebSocket tunnel instead of HTTP — similar to a Java CompletableFuture + event listener architecture.',
      },
      code: { tr: `DevTools devTools = driver.getDevTools();\ndevTools.createSession();\ndevTools.send(Log.enable());`, en: `DevTools devTools = driver.getDevTools();\ndevTools.createSession();\ndevTools.send(Log.enable());` },
      positions: {
        greenwrong: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        bidi: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'greenwrong', to: 'bidi', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: '`devTools.addListener(Log.entryAdded(), ...)` artık HER konsol olayını gerçek zamanlı dinler — hata oluştuğu ANDA test koduna bildirilir.',
        en: '`devTools.addListener(Log.entryAdded(), ...)` now listens to EVERY console event in real time — the error is reported to the test code the INSTANT it happens.',
      },
      positions: {
        bidi: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        listener: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'bidi', to: 'listener', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Final — dinleyici hatayı yakalar, test artık GERÇEĞE uygun şekilde FAIL verir. QA kazanımı: her E2E testin yanına otomatik JS error monitoring eklenebilir — kod kaynağına hiç dokunmadan.',
        en: 'Final — the listener catches the error, the test now FAILS as it truthfully should. The QA payoff: automatic JS error monitoring can be added alongside every E2E test — without touching the source code at all.',
      },
      positions: {
        test: { x: 12, y: 55, scale: 0.8 },
        http: { x: 30, y: 35, scale: 0.7, opacity: 0.4 },
        bidi: { x: 54, y: 55, scale: 0.9 },
        listener: { x: 74, y: 35, scale: 0.85 },
        caught: { x: 92, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'listener', to: 'caught' }],
    },
  ],
}

// 🔐 Sanal Auth & PDF — Virtual Authenticator filmi
const seleniumVirtualAuthFilm = {
  type: 'video-scene',
  id: 'selenium-virtual-auth-film',
  title: {
    tr: '🎬 Passkey Testi İçin USB Anahtara mı İhtiyacın Var? Hayır.',
    en: '🎬 Do You Need a USB Key to Test Passkeys? No.',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'company', emoji: '🏢', label: { tr: '"Passkey\'e geçiyoruz" kararı', en: '"We\'re switching to Passkeys" decision' }, color: '#0ea5e9' },
    { id: 'usb',     emoji: '🔑', label: { tr: 'Fiziksel USB dongle',       en: 'Physical USB dongle' },    color: '#94a3b8' },
    { id: 'manual',  emoji: '🖐️', label: { tr: 'Sadece elle test edilebilir', en: 'Only testable manually' }, color: '#ef4444' },
    { id: 'mockito', emoji: '🎭', label: { tr: 'Mockito? Çalışmaz.',        en: 'Mockito? Doesn\'t work.' },  color: '#dc2626' },
    { id: 'virtual', emoji: '🤖', label: { tr: 'Virtual Authenticator',     en: 'Virtual Authenticator' },  color: '#8b5cf6' },
    { id: 'ci',      emoji: '☁️', label: { tr: 'CI pipeline',              en: 'CI pipeline' },            color: '#22c55e' },
    { id: 'automated', emoji: '✅', label: { tr: 'Regresyon otomatik',     en: 'Regression automated' },   color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Şirket karar verir: "Şifreleri kaldırıyoruz, WebAuthn Passkey\'e geçiyoruz." Güvenlik ekibi mutlu — ama QA ekibi bir soruyla baş başa kalır: bunu nasıl otomatikleştiririz?',
        en: 'The company decides: "We\'re dropping passwords, switching to WebAuthn Passkeys." Security is happy — but QA is left with a question: how do we automate this?',
      },
      positions: { company: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Passkey doğrulaması normalde fiziksel bir USB güvenlik anahtarı veya cihaz biyometrisi gerektirir — CI sunucusunda böyle bir donanım YOKTUR.',
        en: 'Passkey verification normally requires a physical USB security key or device biometrics — a CI server has NO such hardware.',
      },
      positions: {
        company: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        usb: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'company', to: 'usb', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'İlk refleks: "sadece elle test edelim" — ama bu, her regresyon koşumunda bir insanın fiziksel anahtarla oturması demektir. Otomasyon boşluğu doğar.',
        en: 'The first reflex: "let\'s just test it manually" — but that means a human must sit with a physical key on every regression run. An automation gap is born.',
      },
      positions: {
        usb: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        manual: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'usb', to: 'manual', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Neden Mockito ile servis katmanını mock\'lar gibi bu API\'yi de mock\'lamıyoruz? Çünkü WebAuthn doğrulaması uygulama kodunda DEĞİL, tarayıcının kendi API\'sinde gerçekleşir — Mockito o katmana hiç erişemez.',
        en: 'Why not mock this API the way Mockito mocks the service layer? Because WebAuthn verification happens in the BROWSER\'s own API, not the application code — Mockito can never reach that layer.',
      },
      positions: {
        manual: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        mockito: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'manual', to: 'mockito', color: '#dc2626' }],
    },
    {
      caption: {
        tr: 'Selenium\'un çözümü: `addVirtualAuthenticator(options)` — tıpkı testlerde gerçek veritabanı yerine H2 in-memory DB kullanmak gibi, tarayıcıya YAZILIM TABANLI bir donanım simülatörü enjekte eder.',
        en: 'Selenium\'s fix: `addVirtualAuthenticator(options)` — just like using an H2 in-memory DB instead of a real database in tests, it injects a SOFTWARE-BASED hardware simulator into the browser.',
      },
      code: { tr: `VirtualAuthenticatorOptions options = new VirtualAuthenticatorOptions()\n    .setProtocol(Protocol.CTAP2)\n    .setHasResidentKey(true);\ndriver.addVirtualAuthenticator(options);`, en: `VirtualAuthenticatorOptions options = new VirtualAuthenticatorOptions()\n    .setProtocol(Protocol.CTAP2)\n    .setHasResidentKey(true);\ndriver.addVirtualAuthenticator(options);` },
      positions: {
        mockito: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        virtual: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'mockito', to: 'virtual', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Bu sanal cihaz, gerçek USB anahtarın YERİNE geçer ve FIDO2 akışını uçtan uca tetikler — CI sunucusunda, hiçbir fiziksel donanım olmadan.',
        en: 'This virtual device SUBSTITUTES for the real USB key and triggers the full FIDO2 flow end to end — on the CI server, with no physical hardware at all.',
      },
      positions: {
        virtual: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        ci: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'virtual', to: 'ci', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: Virtual Authenticator, arayüz aynı kalırken alttaki implementasyonun test için değiştirilmesidir — H2 ile production PostgreSQL\'i değiştirmek gibi. Login regresyonu artık her commit\'te otomatik koşar.',
        en: 'Final — the Java bridge: the Virtual Authenticator keeps the interface identical while swapping the underlying implementation for testing — like replacing production PostgreSQL with H2. Login regression now runs automatically on every commit.',
      },
      positions: {
        company: { x: 12, y: 55, scale: 0.8 },
        usb: { x: 30, y: 35, scale: 0.7, opacity: 0.4 },
        virtual: { x: 54, y: 55, scale: 0.9 },
        ci: { x: 74, y: 35, scale: 0.85 },
        automated: { x: 92, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'virtual', to: 'ci' }, { from: 'ci', to: 'automated' }],
    },
  ],
}

// 🖥️ Selenium IDE — kayıttan production koduna filmi
const seleniumIdeExportFilm = {
  type: 'video-scene',
  id: 'selenium-ide-export-film',
  title: {
    tr: '🎬 Manuel Testçinin Kaydı, QA Mühendisinin Koduna Dönüşüyor',
    en: '🎬 The Manual Tester\'s Recording Becomes the QA Engineer\'s Code',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'tester',  emoji: '🖐️', label: { tr: 'Manuel testçi',           en: 'Manual tester' },          color: '#0ea5e9' },
    { id: 'record',  emoji: '🎥', label: { tr: 'Selenium IDE (kayıt)',    en: 'Selenium IDE (recording)' }, color: '#6366f1' },
    { id: 'side',    emoji: '📄', label: { tr: 'flow.side',               en: 'flow.side' },              color: '#f59e0b' },
    { id: 'export',  emoji: '📤', label: { tr: 'Export → Java/JUnit',     en: 'Export → Java/JUnit' },    color: '#8b5cf6' },
    { id: 'raw',     emoji: '🪵', label: { tr: 'Kaba taslak kod',         en: 'Rough draft code' },       color: '#94a3b8' },
    { id: 'refactor',emoji: '🔧', label: { tr: 'QA mühendisi refactor eder', en: 'QA engineer refactors' }, color: '#22c55e' },
    { id: 'suite',   emoji: '✅', label: { tr: 'Gerçek test suite\'ine entegre', en: 'Integrated into real suite' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir manuel testçi yeni bir sayfa akışını KEŞFEDER: hangi locator stabil, navigasyon sırası ne, hangi koşul beklenmeli — bunları elle deneyerek öğrenir.',
        en: 'A manual tester EXPLORES a new page flow: which locator is stable, what the navigation order is, which condition to wait for — learned by trying it by hand.',
      },
      positions: { tester: { x: 30, y: 50, scale: 1.1, pulse: true }, record: { x: 65, y: 50, scale: 1.1 } },
      beams: [{ from: 'tester', to: 'record' }],
    },
    {
      caption: {
        tr: 'Selenium IDE\'yi açar, tarayıcıda akışı normal şekilde kullanır — IDE, tıpkı IntelliJ\'in getter/setter iskelet kodu üretmesi gibi, her adımı otomatik kaydeder.',
        en: 'They open Selenium IDE and use the flow normally in the browser — the IDE auto-records every step, like IntelliJ generating getter/setter boilerplate.',
      },
      positions: {
        record: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        side: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'record', to: 'side', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: '`flow.side` dosyası artık komut-hedef-değer üçlüleriyle dolu: open, click, type, assertText — akışın tam bir kaydı.',
        en: 'The `flow.side` file is now full of command-target-value triples: open, click, type, assertText — a complete record of the flow.',
      },
      positions: {
        side: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        export: { x: 60, y: 50, scale: 1.15, opacity: 0.6 },
      },
    },
    {
      caption: {
        tr: 'Sağ tık → Export → Java (JUnit). Kayıt, çalıştırılabilir bir WebDriver koduna dönüşür — ama bu KABA bir taslaktır, henüz production kalitesinde değil.',
        en: 'Right-click → Export → Java (JUnit). The recording becomes runnable WebDriver code — but it is a ROUGH draft, not yet production quality.',
      },
      code: { tr: `// Selenium IDE'den export edilen kaba taslak\n@Test\npublic void flowTest() {\n    driver.findElement(By.id("loginBtn")).click();\n    // ... elle uretilen adimlar\n}`, en: `// Rough draft exported from Selenium IDE\n@Test\npublic void flowTest() {\n    driver.findElement(By.id("loginBtn")).click();\n    // ... auto-generated steps\n}` },
      positions: {
        export: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        raw: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'export', to: 'raw', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'QA mühendisi devralır: hardcoded locator\'ları Page Object\'lere taşır, `Thread.sleep()` varsa `WebDriverWait`\'e çevirir, tekrar eden adımları metotlara çıkarır.',
        en: 'The QA engineer takes over: moves hardcoded locators into Page Objects, converts any `Thread.sleep()` to `WebDriverWait`, extracts repeated steps into methods.',
      },
      positions: {
        raw: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        refactor: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'raw', to: 'refactor', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: bu, IDE\'nin ürettiği iskelet kodu elle temizlemeye benzer — çıktıyı olduğu gibi production\'a göndermezsin. Manuel testçi ile QA mühendisi arasında bir köprü kurulur: "neden bu senaryo hiç test edilmiyor?" sorusu artık sorulmaz.',
        en: 'Final — the Java bridge: this is like manually cleaning up IDE-generated boilerplate — you never ship the raw output as-is. A bridge is built between the manual tester and the QA engineer: the question "why is this scenario never tested?" no longer needs to be asked.',
      },
      positions: {
        tester: { x: 12, y: 55, scale: 0.8 },
        record: { x: 30, y: 35, scale: 0.75, opacity: 0.5 },
        raw: { x: 54, y: 55, scale: 0.9 },
        refactor: { x: 74, y: 35, scale: 0.85 },
        suite: { x: 92, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'refactor', to: 'suite' }],
    },
  ],
}

// 🖥️ Selenium IDE — kaba taslağı production'a çevirme sandbox'ı (video-sitewide-plan §7, eksik sandbox tamamlama)
const seleniumIdeRefactorPractice = {
  type: 'code-playground',
  relatedTopicId: 'selenium-ide-refactor-practice-01',
  id: 'selenium-ide-refactor-practice-01',
  label: { tr: 'Micro Lab: IDE\'nin kaba taslağını production koduna çevir', en: 'Micro Lab: Turn the IDE\'s rough draft into production code' },
  language: 'java',
  task: {
    tr: 'Selenium IDE\'den export edilen kod `Thread.sleep(2000)` kullanıyor ve flaky. TODO satırını, aynı bekleme mantığını `WebDriverWait` ile ifade edecek şekilde tamamla.',
    en: 'The code exported from Selenium IDE uses `Thread.sleep(2000)` and is flaky. Complete the TODO line so the same wait logic is expressed with `WebDriverWait`.',
  },
  explanation: {
    tr: 'Bu gerçek bir çalıştırılabilir Selenium runtime değil; amaç IDE\'nin ürettiği kaba taslağı elle refactor ederek `Thread.sleep` yerine koşullu bekleme yazmayı pekiştirmek.',
    en: 'This is not a real executable Selenium runtime; the goal is to reinforce replacing `Thread.sleep` with a conditional wait by manually refactoring the IDE\'s rough draft.',
  },
  code: {
    tr: `driver.findElement(By.id("loginBtn")).click();\nThread.sleep(2000);\ndriver.findElement(By.id("dashboard")).isDisplayed();`,
    en: `driver.findElement(By.id("loginBtn")).click();\nThread.sleep(2000);\ndriver.findElement(By.id("dashboard")).isDisplayed();`,
  },
  starterCode: {
    tr: `driver.findElement(By.id("loginBtn")).click();\n// TODO: Thread.sleep(2000) yerine WebDriverWait kullan\nThread.sleep(2000);\ndriver.findElement(By.id("dashboard")).isDisplayed();`,
    en: `driver.findElement(By.id("loginBtn")).click();\n// TODO: replace Thread.sleep(2000) with WebDriverWait\nThread.sleep(2000);\ndriver.findElement(By.id("dashboard")).isDisplayed();`,
  },
  solutionCode: {
    tr: `driver.findElement(By.id("loginBtn")).click();\nnew WebDriverWait(driver, Duration.ofSeconds(10))\n    .until(ExpectedConditions.visibilityOfElementLocated(By.id("dashboard")));`,
    en: `driver.findElement(By.id("loginBtn")).click();\nnew WebDriverWait(driver, Duration.ofSeconds(10))\n    .until(ExpectedConditions.visibilityOfElementLocated(By.id("dashboard")));`,
  },
  expected: {
    tr: '`dashboard` elementi 2 saniyeden önce hazır olsa da sonra hazır olsa da test sabit çalışır — sabit 2 saniyelik bekleme kaldırılmış olur.',
    en: 'The test runs consistently whether the `dashboard` element becomes ready before or after 2 seconds — the fixed 2-second wait is gone.',
  },
  hints: [
    { tr: '`Thread.sleep` her zaman sabit süre bekler; element daha erken hazır olsa bile zaman kaybedilir, daha geç hazır olursa test patlar.', en: '`Thread.sleep` always waits a fixed duration; time is wasted if the element is ready earlier, and the test breaks if it is ready later.' },
    { tr: '`WebDriverWait` + `ExpectedConditions.visibilityOfElementLocated` koşul gerçekleşene kadar bekler, en fazla verilen süre kadar.', en: '`WebDriverWait` + `ExpectedConditions.visibilityOfElementLocated` waits only until the condition is true, up to the given timeout.' },
    { tr: 'IDE\'nin export ettiği kod her zaman bir taslaktır — `isDisplayed()` öncesine bir bekleme koşulu eklemek QA mühendisinin işidir.', en: 'Code exported by the IDE is always a draft — adding a wait condition before `isDisplayed()` is the QA engineer\'s job.' },
  ],
  xpReward: 10,
}

// 🌐 Grid 4 & Dağıtık — mikroservis routing filmi
const seleniumGridRoutingFilm = {
  type: 'video-scene',
  id: 'selenium-grid-routing-film',
  title: {
    tr: '🎬 "Safari\'de Ödeme Bozuk mu?" Sorusunu Grid 4 Nasıl Cevaplar',
    en: '🎬 How Grid 4 Answers "Is Checkout Broken in Safari?"',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'request', emoji: '📨', label: { tr: 'newSession(Safari)',      en: 'newSession(Safari)' },     color: '#0ea5e9' },
    { id: 'router',  emoji: '🧭', label: { tr: 'Router',                  en: 'Router' },                 color: '#6366f1' },
    { id: 'distributor', emoji: '📋', label: { tr: 'Distributor',        en: 'Distributor' },            color: '#8b5cf6' },
    { id: 'sessionmap', emoji: '🗺️', label: { tr: 'Session Map',         en: 'Session Map' },            color: '#f59e0b' },
    { id: 'node',    emoji: '🖥️', label: { tr: 'Safari Node (macOS)',    en: 'Safari Node (macOS)' },    color: '#22c55e' },
    { id: 'eventbus',emoji: '📡', label: { tr: 'Event Bus',               en: 'Event Bus' },              color: '#94a3b8' },
    { id: 'answer',  emoji: '✅', label: { tr: 'Cevap: bozuk/sağlam',     en: 'Answer: broken/healthy' }, color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir e-ticaret ekibi bilmiyor: "Safari\'de ödeme sayfası bozuk mu?" Bu soruyu CI\'da OTOMATİK cevaplamak istiyorlar — Grid 4 mimarisi devreye girer.',
        en: 'An e-commerce team does not know: "Is the checkout page broken in Safari?" They want to answer this AUTOMATICALLY in CI — Grid 4\'s architecture takes over.',
      },
      positions: { request: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'İstek Router\'a gelir: "Safari, macOS istiyorum". Router, Grid 3\'ün monolith Hub\'ının aksine sadece YÖNLENDİRME yapar — kararı kendisi vermez.',
        en: 'The request arrives at the Router: "I want Safari, macOS". Unlike Grid 3\'s monolithic Hub, the Router only ROUTES — it does not make the decision itself.',
      },
      positions: {
        request: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        router: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'request', to: 'router', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Router, isteği Distributor\'a iletir. Distributor, hangi Node\'un Safari/macOS kapasitesine sahip olduğunu ve şu an MÜSAİT olduğunu bilir — bir yük dengeleyici gibi.',
        en: 'The Router forwards the request to the Distributor. The Distributor knows which Node has Safari/macOS capacity and is currently AVAILABLE — like a load balancer.',
      },
      positions: {
        router: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        distributor: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'router', to: 'distributor', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Uygun Node bulunur, session oluşturulur ve Session Map\'e kaydedilir — bu harita, hangi session ID\'nin hangi Node\'da yaşadığını takip eder.',
        en: 'A suitable Node is found, a session is created and recorded in the Session Map — this map tracks which session ID lives on which Node.',
      },
      positions: {
        distributor: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        sessionmap: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'distributor', to: 'sessionmap', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Test artık gerçek Safari Node\'unda çalışır — ödeme sayfasını gerçek WebKit motoruyla açar, Chrome/Firefox\'un asla yakalayamayacağı bir WebKit-özel bug\'ı ortaya çıkarabilir.',
        en: 'The test now runs on the real Safari Node — it opens the checkout page with the real WebKit engine, potentially revealing a WebKit-specific bug Chrome/Firefox could never catch.',
      },
      positions: {
        sessionmap: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        node: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'sessionmap', to: 'node', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Event Bus, tüm bileşenler arasında durum güncellemelerini yayınlar — Node çöktüğünde, session sona erdiğinde herkes ANINDA haberdar olur.',
        en: 'The Event Bus broadcasts state updates across all components — when a Node crashes or a session ends, everyone finds out INSTANTLY.',
      },
      positions: {
        node: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        eventbus: { x: 56, y: 50, scale: 1.1, opacity: 0.7 },
        answer: { x: 56, y: 32, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'node', to: 'answer', color: '#16a34a' }],
    },
    {
      caption: {
        tr: 'Final — Java köprüsü: Router/Distributor/Session Map/Event Bus ayrımı, bir monolith Java uygulamasının mikroservislere bölünmesi gibidir — her bileşen bağımsız scale edilir, tek bir parça çökse bile sistem ayakta kalır.',
        en: 'Final — the Java bridge: the Router/Distributor/Session Map/Event Bus split is like a monolithic Java application broken into microservices — each component scales independently, and the system stays up even if one part crashes.',
      },
      positions: {
        request: { x: 10, y: 55, scale: 0.75 },
        router: { x: 28, y: 35, scale: 0.75 },
        distributor: { x: 46, y: 55, scale: 0.8 },
        node: { x: 66, y: 35, scale: 0.85 },
        answer: { x: 90, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'request', to: 'router' }, { from: 'router', to: 'distributor' }, { from: 'distributor', to: 'node' }, { from: 'node', to: 'answer' }],
    },
  ],
}

// 🚨 Yaygın Hatalar — StaleElementReferenceException teşhis zinciri filmi
const seleniumStaleElementDiagnosisFilm = {
  type: 'video-scene',
  id: 'selenium-stale-element-diagnosis-film',
  title: {
    tr: '🎬 Bir Selenium Hatasının Teşhis Zinciri: StaleElementReferenceException',
    en: '🎬 The Diagnosis Chain of a Selenium Error: StaleElementReferenceException',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'found',   emoji: '🔍', label: { tr: 'Element bulundu ve kaydedildi', en: 'Element found and captured' }, color: '#0ea5e9' },
    { id: 'rerender',emoji: '🔄', label: { tr: 'SPA yeniden render eder',   en: 'SPA re-renders' },         color: '#f59e0b' },
    { id: 'stale',   emoji: '💥', label: { tr: 'StaleElementReferenceException', en: 'StaleElementReferenceException' }, color: '#ef4444' },
    { id: 'wrongfix',emoji: '😰', label: { tr: '"Tekrar findElement" refleksi', en: 'The "just findElement again" reflex' }, color: '#94a3b8' },
    { id: 'refind',  emoji: '🔁', label: { tr: 'Kullanmadan ÖNCE yeniden bul', en: 'Re-find BEFORE each use' }, color: '#8b5cf6' },
    { id: 'wait',    emoji: '⏳', label: { tr: 'WebDriverWait ile stabilite', en: 'Stability via WebDriverWait' }, color: '#22c55e' },
    { id: 'stable',  emoji: '✅', label: { tr: 'Güvenilir test',           en: 'Reliable test' },          color: '#16a34a' },
  ],
  scenes: [
    {
      caption: {
        tr: '`WebElement btn = driver.findElement(By.id("btn"))` — element bulunur ve bir Java referansında SAKLANIR.',
        en: '`WebElement btn = driver.findElement(By.id("btn"))` — the element is found and STORED in a Java reference.',
      },
      code: { tr: `WebElement btn = driver.findElement(By.id("btn"));`, en: `WebElement btn = driver.findElement(By.id("btn"));` },
      positions: { found: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — mesajı PARÇALA: "stale element reference: element is not attached to the page document" — bu bir locator hatası DEĞİL, bir YAŞAM SÜRESİ hatasıdır.',
        en: 'Step 1 — DECOMPOSE the message: "stale element reference: element is not attached to the page document" — this is not a locator error, it is a LIFETIME error.',
      },
      positions: {
        found: { x: 22, y: 45, scale: 0.95, opacity: 0.7 },
        rerender: { x: 58, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'found', to: 'rerender', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'React/Vue gibi bir SPA, arka planda DOM\'u yeniden render eder — belki sadece görsel olarak aynı görünen ama TEKNİK OLARAK yeni bir element ağacı oluşturur.',
        en: 'A SPA like React/Vue re-renders the DOM in the background — perhaps visually identical, but TECHNICALLY a brand new element tree.',
      },
      positions: {
        rerender: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        stale: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'rerender', to: 'stale', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Java köprüsü: bu tam olarak GC sonrası bir `WeakReference`\'a erişmeye benzer — referans hâlâ elinde ama işaret ettiği nesne artık YOK.',
        en: 'Step 2 — the Java bridge: this is exactly like accessing a `WeakReference` after GC — you still hold the reference, but the object it points to is GONE.',
      },
      positions: {
        stale: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        wrongfix: { x: 58, y: 50, scale: 1.15, opacity: 0.7 },
      },
    },
    {
      caption: {
        tr: 'Kontrast — yaygın yanlış refleks: catch bloğunda "bir daha findElement dene" demek sorunu GİZLER ama tekrar aynı yerde stale olma riskini taşır — kök nedeni anlamadan yama yapmaktır.',
        en: 'Contrast — the common wrong reflex: catching and saying "just findElement again" HIDES the problem but still risks going stale at the same spot again — patching without understanding the root cause.',
      },
      positions: {
        wrongfix: { x: 25, y: 45, scale: 1, opacity: 0.7 },
        refind: { x: 60, y: 50, scale: 1.1, opacity: 0.6 },
      },
    },
    {
      caption: {
        tr: 'Adım 3 — en küçük GÜVENLİ düzeltme: element\'i HER kullanmadan HEMEN ÖNCE yeniden bul, asla önceden yakalayıp saklama.',
        en: 'Step 3 — the smallest SAFE fix: re-find the element IMMEDIATELY BEFORE each use, never capture it ahead of time and store it.',
      },
      code: { tr: `driver.navigate().refresh();\ndriver.findElement(By.id("btn")).click(); // yeniden bul, SAKLAMA`, en: `driver.navigate().refresh();\ndriver.findElement(By.id("btn")).click(); // re-find, do NOT store` },
      positions: {
        refind: { x: 22, y: 45, scale: 0.9, opacity: 0.6 },
        wait: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'refind', to: 'wait', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 4 — AYNI komutla kanıtla: `WebDriverWait` + `elementToBeClickable` ile sarılan bu çağrı, hem stale referansı hem de zamanlama sorununu tek seferde çözer.',
        en: 'Step 4 — PROVE it with the SAME command: wrapping this call with `WebDriverWait` + `elementToBeClickable` solves both the stale reference and the timing issue at once.',
      },
      code: { tr: `wait.until(EC.elementToBeClickable(By.id("btn"))).click();`, en: `wait.until(EC.elementToBeClickable(By.id("btn"))).click();` },
      positions: {
        wait: { x: 25, y: 45, scale: 0.9, opacity: 0.6 },
        stable: { x: 60, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'wait', to: 'stable', color: '#16a34a' }],
    },
  ],
}

// 🚨 Yaygın Hatalar — StaleElement teşhis refleksi step-animation'ı
const seleniumStaleElementDiagnosisSteps = {
  type: 'step-animation',
  id: 'selenium-stale-element-diagnosis-step-01',
  title: { tr: 'Adım Adım: Selenium Hata Teşhis Refleksi', en: 'Step by Step: The Selenium Error Diagnosis Reflex' },
  steps: [
    { id: 1, icon: '📖', label: { tr: 'Mesajın türünü ayırt et', en: 'Classify the message' }, detail: { tr: '"NoSuchElement" locator/timing, "StaleElement" yaşam süresi, "ElementNotInteractable" görünürlük/CSS, "Timeout" koşul hiç sağlanmadı — her biri farklı katmana işaret eder.', en: '"NoSuchElement" is locator/timing, "StaleElement" is lifetime, "ElementNotInteractable" is visibility/CSS, "Timeout" means the condition was never met — each points to a different layer.' } },
    { id: 2, icon: '🗺️', label: { tr: 'Katmanı bul', en: 'Locate the layer' }, detail: { tr: 'Hata mesajının işaret ettiği TEK katmanda çalış — StaleElement\'te sorun locator değil, elementin DOM\'daki YAŞAM SÜRESİdir.', en: 'Work in the ONE layer the message points to — for StaleElement, the problem is not the locator, it is the element\'s LIFETIME in the DOM.' } },
    { id: 3, icon: '🔍', label: { tr: 'Değiştirmeyen kanıt topla', en: 'Collect non-destructive evidence' }, detail: { tr: 'DevTools\'da element\'i manuel test et, sayfanın ne zaman yeniden render olduğunu Network/Console sekmesinde izle.', en: 'Test the element manually in DevTools, watch when the page re-renders via the Network/Console tabs.' } },
    { id: 4, icon: '🔧', label: { tr: 'En küçük güvenli düzeltmeyi uygula', en: 'Apply the smallest safe fix' }, detail: { tr: 'Element referansını asla önceden saklama; her kullanımdan hemen önce yeniden bul ve WebDriverWait ile sar.', en: 'Never store an element reference ahead of time; re-find it immediately before each use and wrap it with WebDriverWait.' } },
    { id: 5, icon: '✅', label: { tr: 'Aynı komutla kanıtla', en: 'Prove with the same command' }, detail: { tr: 'Başarısız olan test AYNEN tekrar çalıştırılır, birkaç kez arka arkaya geçtiği doğrulanır — flaky testler tek koşumda "düzeldi" denemez.', en: 'Rerun the EXACT failing test, verify it passes several times in a row — a flaky test cannot be called "fixed" after a single run.' } },
  ],
}

// 🚨 Yaygın Hatalar — StaleElement sandbox'ı
const seleniumStaleElementPractice = {
  type: 'code-playground',
  relatedTopicId: 'selenium-webdriver-errors',
  id: 'selenium-stale-element-practice-01',
  label: { tr: 'Micro Lab: StaleElementReferenceException\'ı doğru düzelt', en: 'Micro Lab: Correctly fix a StaleElementReferenceException' },
  language: 'java',
  task: {
    tr: 'Bir buton element\'i sayfa yenilenmeden önce yakalanmış ve saklanmış; yenileme sonrası tıklama StaleElementReferenceException veriyor. TODO satırını, element\'i YENİDEN bulup WebDriverWait ile sararak tamamla.',
    en: 'A button element was captured and stored before a page refresh; clicking it after the refresh throws StaleElementReferenceException. Complete the TODO line by RE-FINDING the element wrapped with WebDriverWait.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç "önceden yakala ve sakla" refleksinden "her kullanımdan önce yeniden bul" refleksine geçişi elle yazarak pekiştirmek.',
    en: 'This is not a real runtime; the goal is to reinforce the shift from "capture and store ahead of time" to "re-find before each use" by writing it yourself.',
  },
  code: {
    tr: `WebElement btn = driver.findElement(By.id("btn"));\ndriver.navigate().refresh();\nwait.until(EC.elementToBeClickable(By.id("btn"))).click();`,
    en: `WebElement btn = driver.findElement(By.id("btn"));\ndriver.navigate().refresh();\nwait.until(EC.elementToBeClickable(By.id("btn"))).click();`,
  },
  starterCode: {
    tr: `WebElement btn = driver.findElement(By.id("btn"));\ndriver.navigate().refresh();\n// TODO: eski referansi KULLANMA, elementi yeniden bul ve WebDriverWait ile sar`,
    en: `WebElement btn = driver.findElement(By.id("btn"));\ndriver.navigate().refresh();\n// TODO: do NOT use the old reference, re-find the element wrapped with WebDriverWait`,
  },
  solutionCode: {
    tr: `WebElement btn = driver.findElement(By.id("btn"));\ndriver.navigate().refresh();\nwait.until(EC.elementToBeClickable(By.id("btn"))).click();`,
    en: `WebElement btn = driver.findElement(By.id("btn"));\ndriver.navigate().refresh();\nwait.until(EC.elementToBeClickable(By.id("btn"))).click();`,
  },
  expected: {
    tr: 'Tıklama, sayfa yenilendikten sonra bile StaleElementReferenceException fırlatmadan başarıyla çalışır — çünkü referans yenileme SONRASINDA alınmıştır.',
    en: 'The click succeeds even after the page refresh without throwing StaleElementReferenceException — because the reference was taken AFTER the refresh.',
  },
  hints: [
    { tr: 'Eski `btn` değişkenini kullanma — o, yenilemeden ÖNCEki DOM\'a işaret ediyor.', en: 'Do not use the old `btn` variable — it points to the DOM from BEFORE the refresh.' },
    { tr: '`wait.until(EC.elementToBeClickable(By.id("btn")))` hem yeniden bulur hem tıklanabilir olana kadar bekler.', en: '`wait.until(EC.elementToBeClickable(By.id("btn")))` both re-finds the element and waits until it is clickable.' },
  ],
  xpReward: 10,
}

// 💼 Mülakat Q&A — güçlü cevap anatomisi filmi
const seleniumInterviewAnswerFilm = {
  type: 'video-scene',
  id: 'selenium-interview-answer-film',
  title: {
    tr: '🎬 Selenium Senaryo Sorusuna Güçlü Cevap Anatomisi',
    en: '🎬 The Anatomy of a Strong Selenium Scenario Answer',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'question', emoji: '🎤', label: { tr: 'Senaryo sorusu',        en: 'Scenario question' },     color: '#6366f1' },
    { id: 'weak',     emoji: '😰', label: { tr: '"Sleep ekle" refleksi', en: 'The "just add sleep" reflex' }, color: '#94a3b8' },
    { id: 'evidence', emoji: '🧭', label: { tr: 'Kanıt: hangi katman?',   en: 'Evidence: which layer?' },  color: '#f59e0b' },
    { id: 'rationale',emoji: '⚖️', label: { tr: 'Koşul + gerekçe',        en: 'Condition + rationale' },   color: '#10b981' },
    { id: 'root',     emoji: '🛡️', label: { tr: 'Kalıcı kök çözüm',       en: 'Permanent root fix' },      color: '#0ea5e9' },
    { id: 'java',     emoji: '☕', label: { tr: 'Java analojisi',         en: 'Java analogy' },           color: '#8b5cf6' },
    { id: 'win',      emoji: '🏆', label: { tr: 'Güçlü cevap',            en: 'Strong answer' },          color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Mülakatçı soruyor: "CI\'da aralıklı başarısız olan (flaky) testleriniz var — nasıl stabilize edersiniz?" Bu filmde aynı soruya iki cevabın farkını izleyeceksin.',
        en: 'The interviewer asks: "Your CI has intermittently failing (flaky) tests — how do you stabilize them?" In this film you will watch the difference between two answers.',
      },
      positions: { question: { x: 50, y: 50, scale: 1.2, pulse: true } },
    },
    {
      caption: {
        tr: 'Zayıf refleks: "Thread.sleep ekleriz, biraz daha bekletiriz." Bu, mülakatçının en sık duyduğu ve en az etkilenen cevaptır — kök nedeni hiç sormaz.',
        en: 'The weak reflex: "We add Thread.sleep, make it wait a bit longer." This is the answer interviewers hear most and are least impressed by — it never asks about the root cause.',
      },
      positions: {
        question: { x: 20, y: 40, scale: 0.9, opacity: 0.7 },
        weak: { x: 55, y: 52, scale: 1.15, pulse: true, opacity: 0.8 },
      },
      beams: [{ from: 'question', to: 'weak', color: '#94a3b8' }],
    },
    {
      caption: {
        tr: 'Güçlü cevabın 1. katmanı — KANIT: "Önce hangi KATEGORİDE flaky olduğuna bakarım: NoSuchElement mi, StaleElement mi, timing mi, yoksa test veri kirliliği mi?"',
        en: 'Layer 1 of the strong answer — EVIDENCE: "First I check WHICH CATEGORY the flakiness falls into: NoSuchElement, StaleElement, timing, or test data pollution?"',
      },
      positions: {
        weak: { x: 15, y: 68, scale: 0.7, opacity: 0.35 },
        evidence: { x: 52, y: 48, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'question', to: 'evidence' }],
    },
    {
      caption: {
        tr: '2. katman — koşul + GEREKÇE: "Thread.sleep yerine ExpectedConditions ile ilgili koşulu tanımlarım — çünkü sabit bekleme hem yavaş hem güvenilmezdir, koşul ise HER ortamda doğru davranır."',
        en: 'Layer 2 — condition + RATIONALE: "Instead of Thread.sleep, I define the relevant ExpectedCondition — because a fixed wait is both slow and unreliable, while a condition behaves correctly in EVERY environment."',
      },
      positions: {
        evidence: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        rationale: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'evidence', to: 'rationale', color: '#10b981' }],
    },
    {
      caption: {
        tr: '3. katman — KÖK neden: "Tek bir test değil, TÜM suite\'i tararım — aynı anti-pattern (örn. element önceden yakalayıp saklama) başka testlerde de tekrar ediyor mu?"',
        en: 'Layer 3 — the ROOT cause: "I do not scan just one test, I scan the WHOLE suite — is the same anti-pattern (e.g. capturing and storing an element ahead of time) repeating in other tests too?"',
      },
      positions: {
        rationale: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        root: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'rationale', to: 'root', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: '4. katman — Java köprüsü: "Bu, Java\'da CompletableFuture.get(timeout) ile bir Future\'ı erken okumak gibidir — koşulu tanımlamak, veri gelene kadar akıllıca beklemektir."',
        en: 'Layer 4 — the Java bridge: "This is like reading a Future too early with CompletableFuture.get(timeout) in Java — defining the condition is waiting intelligently until the data arrives."',
      },
      positions: {
        root: { x: 20, y: 40, scale: 0.85, opacity: 0.6 },
        java: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'root', to: 'java', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Final — formül: kanıt (kategori) → koşul + gerekçe → kalıcı kök çözüm (suite geneli tarama) → Java analojisi. Sıralı düşünen aday, komut ezberleyeni her zaman geçer.',
        en: 'Final — the formula: evidence (category) → condition + rationale → permanent root fix (suite-wide scan) → Java analogy. The candidate who thinks in order always beats the one who memorized commands.',
      },
      positions: {
        evidence: { x: 14, y: 55, scale: 0.85 },
        rationale: { x: 34, y: 38, scale: 0.85 },
        root: { x: 54, y: 55, scale: 0.85 },
        java: { x: 72, y: 38, scale: 0.85 },
        win: { x: 88, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'evidence', to: 'rationale' }, { from: 'rationale', to: 'root' }, { from: 'root', to: 'java' }, { from: 'java', to: 'win' }],
    },
  ],
}

// 💼 Mülakat Q&A — cevap kurma step-animation'ı
const seleniumInterviewAnswerSteps = {
  type: 'step-animation',
  id: 'selenium-interview-answer-step-01',
  title: { tr: 'Adım Adım: Selenium Senaryo Cevabı Kurma', en: 'Step by Step: Building a Selenium Scenario Answer' },
  steps: [
    { id: 1, icon: '🧭', label: { tr: 'Kategoriyi sor', en: 'Ask about the category' }, detail: { tr: 'Cevaba netleştirerek başla: hangi exception, ne sıklıkla, tek testte mi çoklu testte mi? Kategori sormak ilk puandır.', en: 'Open by clarifying: which exception, how often, one test or many? Asking about the category is the first point.' } },
    { id: 2, icon: '🔍', label: { tr: 'Kanıt komutlarını sırala', en: 'List the evidence commands' }, detail: { tr: '"Önce hata mesajını, sonra hangi katmana işaret ettiğini kontrol ederim" de — bu, ezberden ayrışmanın yoludur.', en: 'Say "first I check the error message, then which layer it points to" — this is how you separate yourself from rote memory.' } },
    { id: 3, icon: '⚖️', label: { tr: 'Koşulu gerekçesiyle ver', en: 'Give the condition with its why' }, detail: { tr: 'Seçtiğin ExpectedCondition\'ı NEDENiyle söyle: "elementToBeClickable, çünkü hem görünürlük hem tıklanabilirlik gerekiyor".', en: 'State your chosen ExpectedCondition WITH its reason: "elementToBeClickable, because both visibility and clickability are needed".' } },
    { id: 4, icon: '🛡️', label: { tr: 'Kalıcı çözümü ekle', en: 'Add the permanent fix' }, detail: { tr: 'Tek testi değil, suite genelini tara — aynı anti-pattern\'in başka testlerde tekrarlanıp tekrarlanmadığını kontrol et.', en: 'Do not scan just one test — scan the whole suite for the same anti-pattern repeating elsewhere.' } },
    { id: 5, icon: '☕', label: { tr: 'Java analojisiyle kapat', en: 'Close with a Java analogy' }, detail: { tr: 'Cevabı bildiğin dünyaya bağla: ExplicitWait, CompletableFuture.get(timeout) gibidir. Analoji, kavramı gerçekten ANLADIĞINI kanıtlar.', en: 'Tie the answer to a world you know: ExplicitWait is like CompletableFuture.get(timeout). The analogy proves you truly UNDERSTAND the concept.' } },
  ],
}

// 💼 Mülakat Q&A — flaky test teşhis akışı sandbox'ı
const seleniumInterviewPractice = {
  type: 'code-playground',
  relatedTopicId: 'selenium-webdriver',
  id: 'selenium-interview-practice-01',
  label: { tr: 'Micro Lab: Mülakat senaryosunu koşul akışına çevir', en: 'Micro Lab: Turn the interview scenario into a condition flow' },
  language: 'java',
  task: {
    tr: 'Klasik mülakat senaryosu: bir test CI\'da aralıklı başarısız oluyor, kanıt Thread.sleep\'in yetersiz kaldığını gösteriyor. TODO satırını, doğru ExpectedCondition ile tamamla.',
    en: 'The classic interview scenario: a test fails intermittently in CI, the evidence shows Thread.sleep is insufficient. Complete the TODO line with the correct ExpectedCondition.',
  },
  explanation: {
    tr: 'Bu gerçek bir runtime değil; amaç mülakatta anlatacağın çözüm akışını (kanıt → koşul seçimi → kalıcı kök çözüm) elle yazarak pekiştirmek.',
    en: 'This is not a real runtime; the goal is to reinforce the solution flow you would narrate in an interview (evidence → condition choice → permanent root fix) by writing it yourself.',
  },
  code: {
    tr: `// kanit: element bazen "not interactable" hatasi veriyor\nWebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nwait.until(ExpectedConditions.elementToBeClickable(By.id("submitBtn"))).click();`,
    en: `// evidence: element sometimes throws "not interactable"\nWebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nwait.until(ExpectedConditions.elementToBeClickable(By.id("submitBtn"))).click();`,
  },
  starterCode: {
    tr: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\n// TODO: hem gorunur hem tiklanabilir olmasini bekleyen koşulu yaz\n.click();`,
    en: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\n// TODO: write the condition that waits for both visibility AND clickability\n.click();`,
  },
  solutionCode: {
    tr: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nwait.until(ExpectedConditions.elementToBeClickable(By.id("submitBtn"))).click();`,
    en: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));\nwait.until(ExpectedConditions.elementToBeClickable(By.id("submitBtn"))).click();`,
  },
  expected: {
    tr: 'Test artık CI\'da tutarlı şekilde geçer — çünkü koşul, elementin GERÇEKTEN etkileşilebilir olduğu anı bekler, sabit bir süreyi değil.',
    en: 'The test now passes consistently in CI — because the condition waits for the moment the element is TRULY interactable, not a fixed duration.',
  },
  hints: [
    { tr: 'Aranan koşul hem görünürlüğü hem tıklanabilirliği kontrol eder: `elementToBeClickable`.', en: 'The condition you need checks both visibility and clickability: `elementToBeClickable`.' },
    { tr: 'Sözdizimi: `wait.until(ExpectedConditions.elementToBeClickable(By.id("x")))`.', en: 'Syntax: `wait.until(ExpectedConditions.elementToBeClickable(By.id("x")))`.' },
  ],
  xpReward: 10,
}

const seleniumIntroPractice = {
  type: 'code-playground',
  relatedTopicId: 'selenium-intro-flow-practice-01',
  id: 'selenium-intro-flow-practice-01',
  label: { tr: 'Micro Lab: İlk Selenium komutunu tamamla', en: 'Micro Lab: Complete the first Selenium command' },
  language: 'java',
  task: {
    tr: 'Amaç: Chrome\'u başlatıp bir sayfaya git, başlığını yazdır, sonra tarayıcıyı kapat. TODO satırını, driver\'ı kapatan doğru metotla tamamla.',
    en: 'Goal: launch Chrome, navigate to a page, print its title, then close the browser. Complete the TODO line with the method that closes the driver.',
  },
  explanation: {
    tr: 'driver.quit(), tarayıcıyı ve arka plandaki sürücü process\'ini tamamen kapatır — driver.close() sadece aktif SEKMEYİ kapatır, farkı bilmek kaynak sızıntısını önler.',
    en: 'driver.quit() fully closes the browser AND the background driver process — driver.close() only closes the active TAB; knowing the difference prevents resource leaks.',
  },
  code: {
    tr: `WebDriver driver = new ChromeDriver();\ndriver.get("https://www.google.com");\nSystem.out.println("Baslik: " + driver.getTitle());\ndriver.quit();`,
    en: `WebDriver driver = new ChromeDriver();\ndriver.get("https://www.google.com");\nSystem.out.println("Title: " + driver.getTitle());\ndriver.quit();`,
  },
  starterCode: {
    tr: `WebDriver driver = new ChromeDriver();\ndriver.get("https://www.google.com");\nSystem.out.println("Baslik: " + driver.getTitle());\n// TODO: tarayiciyi VE surucu process'ini tamamen kapat`,
    en: `WebDriver driver = new ChromeDriver();\ndriver.get("https://www.google.com");\nSystem.out.println("Title: " + driver.getTitle());\n// TODO: fully close the browser AND the driver process`,
  },
  solutionCode: {
    tr: `WebDriver driver = new ChromeDriver();\ndriver.get("https://www.google.com");\nSystem.out.println("Baslik: " + driver.getTitle());\ndriver.quit();`,
    en: `WebDriver driver = new ChromeDriver();\ndriver.get("https://www.google.com");\nSystem.out.println("Title: " + driver.getTitle());\ndriver.quit();`,
  },
  expected: {
    tr: 'Konsolda "Baslik: Google" yazar, ardından tarayıcı penceresi VE arka plan sürücü process\'i tamamen kapanır.',
    en: 'The console prints "Title: Google", then both the browser window AND the background driver process fully close.',
  },
  hints: [
    { tr: 'İki kapatma metodu vardır: biri sadece sekmeyi kapatır, diğeri her şeyi kapatır.', en: 'There are two closing methods: one closes only the tab, the other closes everything.' },
    { tr: 'Aradığın metot `driver.quit()` — parantez içi boştur.', en: 'The method you need is `driver.quit()` — empty parentheses.' },
  ],
  xpReward: 10,
}


const s0 = {
  tr: {
    title: '🟢 Selenium Nedir? Nasıl Çalışır?',
    blocks: [
      {
        type: 'simple-box', emoji: '🤖',
        content: 'Selenium, bir tarayıcı üzerinde insan parmaklarının yerine geçen W3C standardı bir protokoldür — tıpkı Java\'nın JDBC\'si gibi: sen standart bir arayüz yazıyorsun, altta kimin sürücüsü olduğu değişiyor (ChromeDriver, GeckoDriver, EdgeDriver). Peki Java\'da JUnit + Mockito varken neden tarayıcıyı bizzat açan bir araca ihtiyacımız var? Çünkü bir uygulamanın gerçekten "çalıştığını" kanıtlamanın tek yolu onu bir kullanıcı gibi açmak ve neyin göründüğünü, neyin tıklandığında ne olduğunu DOM üzerinde ölçmektir — unit test bu katmana hiç ulaşamaz. Java\'da RemoteWebDriver interface\'ini implement ederek başladığın bu model, Python\'da webdriver.Chrome() ve TypeScript\'te de aynı kavramsal API olarak devam eder; sadece sözdizimi değişir, WebDriver kontratı değişmez. QA açısından en kritik gerçek şu: Selenium olmadan "buton göründü mü, modal açıldı mı, redirect doğru URL\'e gitti mi?" sorularını CI pipeline\'ında otomatik cevaplamak mümkün değildir — cevapsız her soru, production\'da sessizce yanlış giden bir özellik, müşterinin fark ettiği bir bug demektir.',
      },
      {
        type: 'css-animation',
        kind: 'selenium-flow',
        label: { tr: 'WebDriver Komut Akışı', en: 'WebDriver Command Flow' },
      },
      {
        type: 'text',
        content: 'Selenium, web tarayıcılarını programatik olarak kontrol etmek için kullanılan açık kaynaklı bir test otomasyon çerçevesidir. 2004\'te Jason Huggins tarafından geliştirilmiş, bugün dünya genelinde en yaygın kullanılan web otomasyon aracıdır. Java\'da RemoteWebDriver arayüzüyle çalışır; Python ve TypeScript\'te de aynı WebDriver konseptini kullanır.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Java\'da WebDriver driver = new ChromeDriver() yazıp driver.findElement(By.id("user")).sendKeys("admin") yapıyordun. Python\'da driver = webdriver.Chrome() ve driver.find_element(By.ID, "user").send_keys("admin") var. TypeScript\'te de aynı WebDriver API\'si, sadece JS/TS sözdizimi farklı.',
      },
      {
        type: 'heading', text: { tr: 'Selenium Bileşenleri', en: 'Selenium Components' },
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '🚗', label: 'WebDriver', desc: 'Tarayıcıyı doğrudan kontrol eden ana API. ChromeDriver, GeckoDriver, EdgeDriver gibi sürücülerle çalışır.' },
          { icon: '🌐', label: 'Selenium Grid', desc: 'Testleri paralel olarak birden fazla makine/tarayıcıda çalıştırmak için dağıtık altyapı.' },
          { icon: '🖥️', label: 'Selenium IDE', desc: 'Tarayıcı eklentisi; kayıt/oynatma özelliğiyle manuel test adımlarını otomatik kaydeder.' },
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Selenium WebDriver Çalışma Akışı',
        steps: [
          { num: 1, label: 'Test Kodu', desc: 'Java / Python / TS', highlight: true },
          { num: 2, label: 'WebDriver API', desc: 'Selenium Client' },
          { num: 3, label: 'Browser Driver', desc: 'ChromeDriver / GeckoDriver', highlight: true },
          { num: 4, label: 'Browser', desc: 'Chrome / Firefox / Edge' },
          { num: 5, label: 'Web Sayfası', desc: 'DOM & JavaScript', highlight: true },
        ],
      },
      seleniumDomProofFilm,
      seleniumIntroFlowSteps,
      seleniumIntroPractice,
      {
        type: 'table',
        headers: ['Özellik', 'Selenium 3', 'Selenium 4'],
        rows: [
          ['Protocol', 'JSON Wire Protocol', 'W3C WebDriver (standart)'],
          ['Relative Locators', '❌', '✅ above(), below(), near()'],
          ['Chrome DevTools', '❌', '✅ CDP entegrasyonu'],
          ['Grid', 'Standalone/Hub/Node', 'Selenium Grid 4 (dağıtık)'],
          ['Yeni Pencere/Tab', 'Karmaşık', '✅ switchTo().newWindow()'],
          ['Screenshot', 'Yalnızca görünür alan', '✅ Full-page screenshot'],
          ['Firefox Profil', 'FirefoxProfile', '✅ FirefoxOptions'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Selenium 4\'te hangi protokol kullanılır?', en: 'Which protocol does Selenium 4 use?' },
        options: [
          { id: 'a', text: 'JSON Wire Protocol' },
          { id: 'b', text: 'W3C WebDriver Protocol' },
          { id: 'c', text: 'HTTP/2' },
          { id: 'd', text: 'WebSocket' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium 4, W3C WebDriver standart protokolüne geçmiştir. Selenium 3\'teki JSON Wire Protocol artık kullanılmamaktadır. Bu değişiklik, tüm tarayıcı sürücülerinin standart bir API\'yi takip etmesini sağlar.', en: 'Selenium 4 switched to the W3C WebDriver standard protocol. The JSON Wire Protocol used in Selenium 3 is no longer used. This change ensures all browser drivers follow a standard API.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Selenium 4 mimarisinde tarayıcılarla iletişim kurmak için benimsenen resmi standart nedir?",
            "en": "What is the official standard adopted by Selenium 4 architecture for browser communication?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "JSON Wire Protocol",
                        "en": "JSON Wire Protocol"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "W3C WebDriver Protocol",
                        "en": "W3C WebDriver Protocol"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "REST API",
                        "en": "REST API"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "WebSocket API",
                        "en": "WebSocket API"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Selenium 4, tarayıcılarla etkileşim için W3C WebDriver protokolünü zorunlu kılmıştır. Bu, farklı tarayıcılar ve sürücüler arasında tutarlı bir iletişim sağlar.",
            "en": "Selenium 4 has mandated the W3C WebDriver protocol for interacting with browsers. This ensures consistent communication across different browsers and drivers."
      }
}
},
    ],
  },
  en: {
    title: '🟢 What is Selenium? How Does It Work?',
    blocks: [
      {
        type: 'simple-box', emoji: '🤖',
        content: 'Selenium is a W3C-standard protocol that replaces human fingers on a browser — analogous to Java\'s JDBC: you write against a standard interface and the underlying driver implementation (ChromeDriver, GeckoDriver, EdgeDriver) is swappable. But if you already have JUnit + Mockito in Java, why do you need a tool that actually opens a browser? Because the only way to prove an application truly works is to open it like a user and measure what appears in the DOM and what happens when you click — a unit test never reaches that layer. The RemoteWebDriver interface you implement in Java is the same conceptual API in Python (webdriver.Chrome()) and TypeScript; only the syntax changes, the WebDriver contract stays identical. For QA, the critical implication is this: without Selenium you cannot automatically answer "did the button appear, did the modal open, did the redirect go to the right URL?" in a CI pipeline — every unanswered question is a feature silently broken in production, a bug the customer discovers first.',
      },
      {
        type: 'text',
        content: 'Selenium is an open-source test automation framework for controlling web browsers programmatically. Created by Jason Huggins in 2004, it is the most widely used web automation tool worldwide. It works with the RemoteWebDriver interface in Java and uses the same WebDriver concept in Python and TypeScript.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Java you wrote WebDriver driver = new ChromeDriver() and driver.findElement(By.id("user")).sendKeys("admin"). In Python it\'s driver = webdriver.Chrome() and driver.find_element(By.ID, "user").send_keys("admin"). In TypeScript the same WebDriver API applies, just different JS/TS syntax.',
      },
      {
        type: 'heading', text: 'Selenium Components',
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '🚗', label: 'WebDriver', desc: 'The core API that directly controls the browser. Works with ChromeDriver, GeckoDriver, EdgeDriver drivers.' },
          { icon: '🌐', label: 'Selenium Grid', desc: 'Distributed infrastructure for running tests in parallel across multiple machines/browsers.' },
          { icon: '🖥️', label: 'Selenium IDE', desc: 'Browser extension with record/playback feature that automatically records manual test steps.' },
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Selenium WebDriver Flow',
        steps: [
          { num: 1, label: 'Test Code', desc: 'Java / Python / TS', highlight: true },
          { num: 2, label: 'WebDriver API', desc: 'Selenium Client' },
          { num: 3, label: 'Browser Driver', desc: 'ChromeDriver / GeckoDriver', highlight: true },
          { num: 4, label: 'Browser', desc: 'Chrome / Firefox / Edge' },
          { num: 5, label: 'Web Page', desc: 'DOM & JavaScript', highlight: true },
        ],
      },
      seleniumDomProofFilm,
      seleniumIntroFlowSteps,
      seleniumIntroPractice,
      {
        type: 'table',
        headers: ['Feature', 'Selenium 3', 'Selenium 4'],
        rows: [
          ['Protocol', 'JSON Wire Protocol', 'W3C WebDriver (standard)'],
          ['Relative Locators', '❌', '✅ above(), below(), near()'],
          ['Chrome DevTools', '❌', '✅ CDP integration'],
          ['Grid', 'Standalone/Hub/Node', 'Selenium Grid 4 (distributed)'],
          ['New Window/Tab', 'Complex', '✅ switchTo().newWindow()'],
          ['Screenshot', 'Visible area only', '✅ Full-page screenshot'],
          ['Firefox Profile', 'FirefoxProfile', '✅ FirefoxOptions'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Which protocol does Selenium 4 use?', en: 'Which protocol does Selenium 4 use?' },
        options: [
          { id: 'a', text: 'JSON Wire Protocol' },
          { id: 'b', text: 'W3C WebDriver Protocol' },
          { id: 'c', text: 'HTTP/2' },
          { id: 'd', text: 'WebSocket' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium 4 switched to the W3C WebDriver standard protocol. The JSON Wire Protocol from Selenium 3 is no longer used.', en: 'Selenium 4 switched to the W3C WebDriver standard protocol. The JSON Wire Protocol from Selenium 3 is no longer used.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Selenium 4 öncesinde (Selenium 3) kullanılan temel iletişim protokolü hangisidir?",
            "en": "Which communication protocol was the primary standard before Selenium 4 (in Selenium 3)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "JSON Wire Protocol",
                        "en": "JSON Wire Protocol"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "W3C WebDriver Protocol",
                        "en": "W3C WebDriver Protocol"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "SOAP",
                        "en": "SOAP"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "gRPC",
                        "en": "gRPC"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Selenium 3 sürümünde tarayıcı sürücüleri JSON Wire Protocol kullanıyordu. Selenium 4 ile bu protokol terk edilerek W3C standardına geçilmiştir.",
            "en": "In the Selenium 3 version, browser drivers utilized the JSON Wire Protocol. With Selenium 4, this protocol was abandoned in favor of the W3C standard."
      }
}
},
    ],
  },
}

// ⚙️ Kurulum — Maven bağımlılık çözümleme adım adım
const seleniumMavenDependencyStep = {
  type: 'step-animation',
  id: 'selenium-install-maven-dependency-step-01',
  title: { tr: 'Adım Adım: pom.xml Bir Jar Dosyasına Nasıl Dönüşür?', en: 'Step by Step: How pom.xml Becomes a Jar File' },
  steps: [
    { id: 1, icon: '📄', label: { tr: 'Sürüm bir SÖZLEŞMEDİR', en: 'The version is a CONTRACT' }, detail: { tr: 'pom.xml içinde `selenium-java 4.25.0` yazmak bir dilek değil, kesin bir taleptir — Maven başka hiçbir sürümü kabul etmez.', en: 'Writing `selenium-java 4.25.0` in pom.xml is not a wish, it is an exact demand — Maven will accept no other version.' } },
    { id: 2, icon: '☁️', label: { tr: 'Maven Central\'dan indirilir', en: 'Downloaded from Maven Central' }, detail: { tr: 'Maven bu talebi okur ve repo.maven.apache.org\'dan TAM olarak o versiyonun jar dosyasını çeker; yerelde `.m2` önbelleğinde varsa tekrar indirmez.', en: 'Maven reads this request and pulls EXACTLY that version\'s jar from repo.maven.apache.org; if it already exists in the local `.m2` cache, it skips the download.' } },
    { id: 3, icon: '🧩', label: { tr: 'Classpath\'e eklenir', en: 'Added to the classpath' }, detail: { tr: 'İndirilen jar, projenin classpath\'ine eklenir — bundan sonra `org.openqa.selenium` paketi IDE ve derleyici tarafından TANINIR.', en: 'The downloaded jar is added to the project classpath — from this point on, the compiler and IDE RECOGNIZE the `org.openqa.selenium` package.' } },
    { id: 4, icon: '🔁', label: { tr: 'Her makinede AYNI sonuç', en: 'The SAME result on every machine' }, detail: { tr: 'Aynı pom.xml başka bir makinede veya CI ajanında çalıştırıldığında aynı sürüm indirilir — "benim makinemde çalışıyordu" sorununun panzehiridir.', en: 'When the same pom.xml runs on another machine or CI agent, the identical version is fetched — this is the antidote to "it worked on my machine".' } },
  ],
}

// ⚙️ Kurulum — Selenium Manager otomatik sürücü eşleştirme akışı
const seleniumManagerAutoDriverStep = {
  type: 'step-animation',
  id: 'selenium-install-manager-autodriver-step-01',
  title: { tr: 'Adım Adım: new ChromeDriver() Arkasında Ne Olur?', en: 'Step by Step: What Happens Behind new ChromeDriver()' },
  steps: [
    { id: 1, icon: '🔎', label: { tr: 'Yüklü Chrome sürümü tespit edilir', en: 'The installed Chrome version is detected' }, detail: { tr: '`new ChromeDriver()` çağrıldığı an Selenium Manager devreye girer ve makinede kurulu Chrome\'un TAM sürümünü okur.', en: 'The moment `new ChromeDriver()` is called, Selenium Manager kicks in and reads the EXACT version of Chrome installed on the machine.' } },
    { id: 2, icon: '🤖', label: { tr: 'Uyumlu driver bulunur/indirilir', en: 'A matching driver is found/downloaded' }, detail: { tr: 'Tespit edilen sürümle TAM uyumlu ChromeDriver binary\'si yerel önbellekte aranır, yoksa otomatik indirilir.', en: 'A ChromeDriver binary EXACTLY matching the detected version is looked up in the local cache, or downloaded automatically if missing.' } },
    { id: 3, icon: '🚀', label: { tr: 'WebDriver session başlatılır', en: 'A WebDriver session is launched' }, detail: { tr: 'Uyumlu driver, bu binary üzerinden gerçek Chrome process\'ini ayağa kaldırıp bir WebDriver session açar.', en: 'The matching driver spins up the real Chrome process through this binary and opens a WebDriver session.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Sürüm uyuşmazlığı hatası önlenir', en: 'A version-mismatch error is prevented' }, detail: { tr: 'Bu otomasyon olmasaydı burada "session not created: This version of ChromeDriver only supports Chrome version X" hatası fırlardı.', en: 'Without this automation, this is exactly where "session not created: This version of ChromeDriver only supports Chrome version X" would be thrown.' } },
  ],
}

// ⚙️ Kurulum — Python driver yaşam döngüsü
const seleniumPythonDriverLifecycleStep = {
  type: 'step-animation',
  id: 'selenium-install-python-lifecycle-step-01',
  title: { tr: 'Adım Adım: Python\'da Bir Driver\'ın Yaşam Döngüsü', en: 'Step by Step: A Driver\'s Lifecycle in Python' },
  steps: [
    { id: 1, icon: '🌐', label: { tr: 'Tarayıcı process\'i başlar', en: 'The browser process starts' }, detail: { tr: '`webdriver.Chrome()` çağrısı yeni bir tarayıcı process\'i ve ona bağlı bir WebDriver session açar.', en: 'The `webdriver.Chrome()` call starts a new browser process and opens a WebDriver session bound to it.' } },
    { id: 2, icon: '🧭', label: { tr: 'get(url) komutu gönderilir', en: 'The get(url) command is sent' }, detail: { tr: '`driver.get(url)` session\'a bir komut gönderir: tarayıcı o adrese gider ve sayfa yüklenene KADAR bekler.', en: '`driver.get(url)` sends a command to the session: the browser navigates there and WAITS UNTIL the page finishes loading.' } },
    { id: 3, icon: '📖', label: { tr: 'title DOM\'dan okunur', en: 'title is read from the DOM' }, detail: { tr: '`driver.title`, o an tarayıcıda render edilmiş gerçek `<title>` etiketinin değerini okur — statik bir metin değil, canlı DOM sorgusudur.', en: '`driver.title` reads the real `<title>` tag value as currently rendered in the browser — not static text, a live DOM query.' } },
    { id: 4, icon: '🧹', label: { tr: 'quit() process\'i kapatır', en: 'quit() closes the process' }, detail: { tr: '`driver.quit()` hem session\'ı hem de tarayıcı process\'ini kapatır — çağrılmazsa process bellekte açık kalır ve CI\'da "zombie chrome" birikimine yol açar.', en: '`driver.quit()` closes both the session and the browser process — skip it and the process stays open in memory, piling up as "zombie chrome" instances in CI.' } },
  ],
}

// ⚙️ Kurulum — TypeScript proje iskeleti kurulum akışı
const seleniumTsInstallStep = {
  type: 'step-animation',
  id: 'selenium-install-ts-scaffold-step-01',
  title: { tr: 'Adım Adım: npm init\'ten tsconfig.json\'a', en: 'Step by Step: From npm init to tsconfig.json' },
  steps: [
    { id: 1, icon: '📦', label: { tr: 'package.json oluşur', en: 'package.json is created' }, detail: { tr: '`npm init -y`, varsayılan değerlerle bir package.json oluşturur — Java\'daki boş bir pom.xml\'in başlangıç noktası gibi.', en: '`npm init -y` creates a package.json with default values — like the starting point of an empty pom.xml in Java.' } },
    { id: 2, icon: '⬇️', label: { tr: 'selenium-webdriver indirilir', en: 'selenium-webdriver is downloaded' }, detail: { tr: '`npm install selenium-webdriver`, kütüphaneyi `node_modules`\'e indirir ve package.json\'a bağımlılık olarak KAYDEDER.', en: '`npm install selenium-webdriver` downloads the library into `node_modules` and RECORDS it as a dependency in package.json.' } },
    { id: 3, icon: '🏷️', label: { tr: 'Tip tanımları eklenir', en: 'Type definitions are added' }, detail: { tr: '`@types/selenium-webdriver`, derleyiciye kütüphanenin tip bilgisini verir — yanlış metot çağrısı ÇALIŞTIRMADAN, derleme anında yakalanır.', en: '`@types/selenium-webdriver` gives the compiler the library\'s type information — a wrong method call is caught at compile time, WITHOUT running anything.' } },
    { id: 4, icon: '⚙️', label: { tr: 'tsconfig.json devreye girer', en: 'tsconfig.json takes over' }, detail: { tr: '`npx tsc --init`, derleyiciye hedef JS sürümünü ve tip kontrolü kurallarını söyleyen tsconfig.json\'ı üretir.', en: '`npx tsc --init` generates the tsconfig.json that tells the compiler the target JS version and the type-checking rules.' } },
  ],
}

// ⚙️ Kurulum — TypeScript async/await driver akışı
const seleniumTsAsyncStep = {
  type: 'step-animation',
  id: 'selenium-install-ts-async-step-01',
  title: { tr: 'Adım Adım: TypeScript\'te async/await ile Driver Akışı', en: 'Step by Step: Driver Flow with async/await in TypeScript' },
  steps: [
    { id: 1, icon: '⏳', label: { tr: 'build() askıya alır', en: 'build() suspends execution' }, detail: { tr: '`await new Builder().forBrowser(Browser.CHROME).build()` tarayıcıyı asenkron başlatır — Promise çözülene KADAR bir sonraki satır çalışmaz.', en: '`await new Builder().forBrowser(Browser.CHROME).build()` starts the browser asynchronously — the next line does NOT run until the Promise resolves.' } },
    { id: 2, icon: '🔄', label: { tr: 'try içinde sırayla awaitlenir', en: 'Sequentially awaited inside try' }, detail: { tr: '`driver.get()` ve `getTitle()` sırayla awaitlenir — bu sırada Node.js\'in event loop\'u BLOKE OLMAZ, sadece bu fonksiyon askıya alınır.', en: '`driver.get()` and `getTitle()` are awaited in sequence — Node.js\'s event loop does NOT block, only this function is suspended.' } },
    { id: 3, icon: '🛡️', label: { tr: 'finally her koşulda çalışır', en: 'finally always runs' }, detail: { tr: '`finally` bloğu, try içinde hata OLSA da OLMASA da `driver.quit()`\'i çalıştırmayı garanti eder.', en: 'The `finally` block guarantees `driver.quit()` runs WHETHER OR NOT an error occurred inside try.' } },
    { id: 4, icon: '🚪', label: { tr: 'finally olmasaydı ne olurdu?', en: 'What if there were no finally?' }, detail: { tr: 'Bir assertion hatası try içinde fırlasaydı ve finally olmasaydı, tarayıcı process\'i AÇIK kalır, bir sonraki test yanlış pencerede çalışabilirdi.', en: 'If an assertion error were thrown inside try without a finally, the browser process would stay OPEN, and the next test could run in the wrong window.' } },
  ],
}

// ⚙️ Kurulum — pip install doğrulama zinciri
const seleniumPipVerifyStep = {
  type: 'step-animation',
  id: 'selenium-install-pip-verify-step-01',
  title: { tr: 'Adım Adım: pip install\'dan Doğrulamaya', en: 'Step by Step: From pip install to Verification' },
  steps: [
    { id: 1, icon: '📥', label: { tr: 'Paket PyPI\'dan indirilir', en: 'The package is fetched from PyPI' }, detail: { tr: '`pip install selenium`, PyPI (Python Package Index) üzerinden `selenium` paketinin en son kararlı sürümünü indirir.', en: '`pip install selenium` fetches the latest stable version of the `selenium` package from PyPI (Python Package Index).' } },
    { id: 2, icon: '🗂️', label: { tr: 'site-packages\'a kurulur', en: 'Installed into site-packages' }, detail: { tr: 'İndirilen paket, aktif Python ortamının `site-packages` klasörüne yazılır — `import selenium` bu klasörden çözümlenir.', en: 'The downloaded package is written into the active Python environment\'s `site-packages` folder — `import selenium` resolves from there.' } },
    { id: 3, icon: '🔍', label: { tr: 'Kurulum tek satırla kanıtlanır', en: 'Installation is proven with one line' }, detail: { tr: '`python -c "import selenium; print(selenium.__version__)"`, ayrı bir dosya oluşturmadan kurulumun BAŞARILI olduğunu kanıtlar.', en: '`python -c "import selenium; print(selenium.__version__)"` proves the install SUCCEEDED without creating a separate file.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Sürüm uyuşmazlığı burada yakalanır', en: 'Version mismatches are caught right here' }, detail: { tr: 'Bu adım atlanırsa, sürüm uyuşmazlığı ilk gerçek testte, çok daha KARIŞIK bir hata izi içinde ortaya çıkar.', en: 'Skip this step and a version mismatch surfaces later in the first real test, buried in a far MESSIER error trace.' } },
  ],
}

// ─── S1: KURULUM ──────────────────────────────────────────────────────────────
const s1 = {
  tr: {
    title: '⚙️ Kurulum — Java, Python, TypeScript',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Selenium kurulumu, Java\'da Maven\'a bağımlılık eklemek gibi çalışır — ama bir katman daha var: test kodun, tarayıcı sürücüsüne (ChromeDriver), o da asıl Chrome\'a bağlanır. Tıpkı JDBC driver\'ı ile veritabanı arasındaki köprü gibi. Peki Java ile Selenium\'u zaten dene-koştur-düzelt döngüsünde kullanıyorken neden sürücü versiyonunu takip etmek zorundayız? Çünkü Chrome her 4-6 haftada güncellenir ve eşleşmeyen ChromeDriver sürümü "session not created: This version of ChromeDriver only supports Chrome version X" hatasıyla tüm CI pipeline\'ını durdurur. Selenium 4\'teki Selenium Manager bunu otomatik çözer — Java\'daki Gradle\'ın bağımlılık version resolution\'ı gibi, uyumlu sürücüyü kendisi indirir. Buna rağmen kurulum adımlarını elle de bilmek gerekir: production CI ortamında Selenium Manager\'ın internete erişimi olmayabilir, o zaman driver\'ı proje artifact olarak kendin yönetirsin.',
      },
      { type: 'heading', text: '1️⃣ Java ile Selenium Kurulumu' },
      {
        type: 'text',
        content: 'Maven veya Gradle projesi oluşturup pom.xml\'e bağımlılık ekliyoruz. Selenium 4.x\'te ChromeDriver otomatik yönetilir.',
      },
      {
        type: 'code', language: 'xml',
        label: 'pom.xml — Maven Bağımlılığı',
        code: `<!-- pom.xml -->
<dependencies>
  <!-- Selenium WebDriver -->
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.25.0</version>
  </dependency>
  <!-- TestNG (test runner) -->
  <dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      seleniumMavenDependencyStep,
      {
        type: 'code', language: 'java',
        label: 'Java — İlk Selenium Testi',
        code: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstTest {
    public static void main(String[] args) {
        // Selenium 4: ChromeDriver otomatik indirilir
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        System.out.println("Başlık: " + driver.getTitle());
        driver.quit(); // Tarayıcıyı kapat
    }
}`,
        expected: 'Başlık: Google',
      },
      seleniumManagerAutoDriverStep,
      seleniumVersionMismatchFilm,
      { type: 'heading', text: '2️⃣ Python ile Selenium Kurulumu' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Python Kurulum',
        code: `# Python yükle (eğer yoksa)
# Windows: winget install Python.Python.3
# Mac:     brew install python
# Linux:   sudo apt install python3 python3-pip

# Selenium kütüphanesini yükle
pip install selenium

# Doğrulama
python -c "import selenium; print(selenium.__version__)"`,
        expected: '4.25.0',
      },
      seleniumPipVerifyStep,
      {
        type: 'code', language: 'python',
        label: 'Python — İlk Selenium Testi',
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By

# Selenium 4: ChromeDriver otomatik indirilir (Selenium Manager)
driver = webdriver.Chrome()
driver.get("https://www.google.com")
print("Başlık:", driver.title)
driver.quit()  # Her zaman kapat!`,
        expected: 'Başlık: Google',
      },
      seleniumPythonDriverLifecycleStep,
      { type: 'heading', text: '3️⃣ TypeScript ile Selenium Kurulumu' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Node.js / TypeScript Kurulum',
        code: `# Node.js yükle (eğer yoksa)
# Windows: winget install OpenJS.NodeJS.LTS
# Mac:     brew install node
# Linux:   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt install nodejs

# Proje oluştur
mkdir selenium-ts && cd selenium-ts
npm init -y

# Gerekli paketleri yükle
npm install selenium-webdriver
npm install --save-dev typescript @types/node @types/selenium-webdriver ts-node

# tsconfig.json oluştur
npx tsc --init`,
      },
      seleniumTsInstallStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — İlk Selenium Testi (first-test.ts)',
        code: `import { Builder, Browser, By } from 'selenium-webdriver';

async function main() {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .build();

  try {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    console.log('Başlık:', title);
  } finally {
    await driver.quit(); // finally bloğunda her zaman kapat
  }
}

main();`,
        expected: 'Başlık: Google',
      },
      seleniumTsAsyncStep,
      {
        type: 'code', language: 'bash',
        label: 'Terminal — TypeScript testi çalıştır',
        code: `npx ts-node first-test.ts`,
      },
      { type: 'heading', text: '✅ Kurulum Doğrulama' },
      {
        type: 'visual', variant: 'flow', title: 'Kurulum Akışı',
        steps: [
          { num: 1, label: 'Chrome', desc: 'Tarayıcı kurulu', highlight: false },
          { num: 2, label: 'Selenium Pkg', desc: 'pip / maven / npm', highlight: true },
          { num: 3, label: 'Selenium Mgr', desc: 'ChromeDriver otomatik', highlight: false },
          { num: 4, label: 'İlk Test', desc: 'driver.get(url)', highlight: true },
          { num: 5, label: '✅ Hazır', desc: 'Tarayıcı açıldı', highlight: false },
        ],
      },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Selenium Manager (Selenium 4.6+)',
        content: 'Selenium 4.6\'dan itibaren ChromeDriver, GeckoDriver gibi sürücüleri artık manuel indirmek gerekmiyor. Selenium Manager hangi Chrome sürümünüzün yüklü olduğunu tespit edip uyumlu ChromeDriver\'ı otomatik indiriyor.',
      },
      {
        type: 'callout', color: 'orange', emoji: '⚠️',
        title: 'Eski Yöntem — WebDriverManager (Java)',
        content: 'Selenium 4.6 öncesi projelerde io.github.bonigarcia:webdrivermanager kütüphanesi kullanılıyordu: WebDriverManager.chromedriver().setup(). Yeni projelerde buna gerek yok.',
      },
      {
        type: 'quiz',
        question: 'Selenium 4.6 ve sonrası sürümlerde ChromeDriver\'ı kim otomatik yönetir?',
        options: [
          { id: 'a', text: 'Maven' },
          { id: 'b', text: 'Selenium Manager' },
          { id: 'c', text: 'WebDriverManager kütüphanesi' },
          { id: 'd', text: 'npm' },
        ],
        correct: 'b',
        explanation: 'Selenium 4.6\'dan itibaren Selenium Manager, yüklü Chrome sürümünü tespit edip uyumlu ChromeDriver\'ı otomatik indirir — eski projelerde kullanılan WebDriverManager kütüphanesine artık gerek yoktur.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Selenium 4.6 ile tanıtılan ve dış bağımlılıklara (örneğin WebDriverManager) ihtiyacı ortadan kaldıran otomatik sürücü yönetim aracının adı nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "Chrome DevTools"
            },
            {
                  "id": "b",
                  "text": "Selenium Manager"
            },
            {
                  "id": "c",
                  "text": "Selenium Grid"
            },
            {
                  "id": "d",
                  "text": "Docker Integration"
            }
      ],
      "correct": "b",
      "explanation": "Selenium 4.6 sürümünde gelen 'Selenium Manager' özelliği, tarayıcı sürücülerinin (ChromeDriver, GeckoDriver vb.) otomatik olarak indirilmesini ve yapılandırılmasını yöneterek geliştiriciyi manuel sürücü yönetimi yükünden kurtarır."
}
},
    ],
  },
  en: {
    title: '⚙️ Installation — Java, Python, TypeScript',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Setting up Selenium mirrors adding a Maven dependency in Java — but with an extra layer: your test code connects to a browser driver (ChromeDriver), which in turn connects to the actual Chrome binary. Just like a JDBC driver bridges Java code to a database. But if you already have Java + Selenium working in your IDE, why do you still need to track the driver version? Because Chrome auto-updates every 4–6 weeks, and a mismatched ChromeDriver version throws "session not created: This version of ChromeDriver only supports Chrome version X", halting the entire CI pipeline. Selenium 4\'s Selenium Manager solves this automatically — like Gradle\'s dependency resolution, it fetches the compatible driver at runtime. Still, knowing the manual steps matters: in a locked-down production CI environment where Selenium Manager has no internet access, you must ship the driver as a project artifact and manage it yourself.',
      },
      { type: 'heading', text: '1️⃣ Java Selenium Setup' },
      {
        type: 'code', language: 'xml',
        label: 'pom.xml — Maven Dependency',
        code: `<!-- pom.xml -->
<dependencies>
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.25.0</version>
  </dependency>
  <dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.10.2</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
      },
      seleniumMavenDependencyStep,
      {
        type: 'code', language: 'java',
        label: 'Java — First Selenium Test',
        code: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver(); // Selenium 4: auto driver
        driver.get("https://www.google.com");
        System.out.println("Title: " + driver.getTitle());
        driver.quit();
    }
}`,
        expected: 'Title: Google',
      },
      seleniumManagerAutoDriverStep,
      seleniumVersionMismatchFilm,
      { type: 'heading', text: '2️⃣ Python Selenium Setup' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Python Install',
        code: `pip install selenium
python -c "import selenium; print(selenium.__version__)"`,
        expected: '4.25.0',
      },
      seleniumPipVerifyStep,
      {
        type: 'code', language: 'python',
        label: 'Python — First Selenium Test',
        code: `from selenium import webdriver

driver = webdriver.Chrome()  # Selenium Manager handles driver
driver.get("https://www.google.com")
print("Title:", driver.title)
driver.quit()`,
        expected: 'Title: Google',
      },
      seleniumPythonDriverLifecycleStep,
      { type: 'heading', text: '3️⃣ TypeScript Selenium Setup' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Node.js / TypeScript Install',
        code: `npm install selenium-webdriver
npm install --save-dev typescript @types/node @types/selenium-webdriver ts-node`,
      },
      seleniumTsInstallStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — First Selenium Test',
        code: `import { Builder, Browser } from 'selenium-webdriver';

async function main() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get('https://www.google.com');
    console.log('Title:', await driver.getTitle());
  } finally {
    await driver.quit();
  }
}
main();`,
        expected: 'Title: Google',
      },
      seleniumTsAsyncStep,
      {
        type: 'quiz',
        question: 'From Selenium 4.6 onward, what automatically manages ChromeDriver?',
        options: [
          { id: 'a', text: 'Maven' },
          { id: 'b', text: 'Selenium Manager' },
          { id: 'c', text: 'The WebDriverManager library' },
          { id: 'd', text: 'npm' },
        ],
        correct: 'b',
        explanation: 'Since Selenium 4.6, Selenium Manager detects your installed Chrome version and downloads a matching ChromeDriver automatically — the older WebDriverManager library is no longer needed.',
      
        retryQuestion: {
      "type": "quiz",
      "question": "Starting with Selenium 4.6, which built-in feature handles browser driver binaries automatically, eliminating the need for external dependencies?",
      "options": [
            {
                  "id": "a",
                  "text": "Gradle"
            },
            {
                  "id": "b",
                  "text": "The WebDriverManager binary tool"
            },
            {
                  "id": "c",
                  "text": "Selenium Manager"
            },
            {
                  "id": "d",
                  "text": "Auto-driver-configurator"
            }
      ],
      "correct": "c",
      "explanation": "Selenium Manager is the native binary included with Selenium 4.6+ that automatically detects the browser version and provisions the correct driver, replacing external libraries like WebDriverManager."
}
},
    ],
  },
}

// ─── S2: LOCATORS ─────────────────────────────────────────────────────────────
// 🎯 Locators — By.ID O(1) lookup mekanizması
const seleniumByIdLookupStep = {
  type: 'step-animation',
  id: 'selenium-locators-byid-lookup-step-01',
  title: { tr: 'Adım Adım: By.id() Bir HashMap Gibi Neden Bu Kadar Hızlı?', en: 'Step by Step: Why By.id() Is as Fast as a HashMap' },
  steps: [
    { id: 1, icon: '🌐', label: { tr: 'Tarayıcı getElementById\'ye gider', en: 'The browser calls getElementById' }, detail: { tr: '`By.id("username")` çağrıldığında Selenium, tarayıcının native `document.getElementById()` metodunu tetikler.', en: 'Calling `By.id("username")` triggers the browser\'s native `document.getElementById()` method under the hood.' } },
    { id: 2, icon: '🗺️', label: { tr: 'Tarayıcı ID indeksini tutar', en: 'The browser maintains an ID index' }, detail: { tr: 'Modern tarayıcılar tüm ID\'leri dahili bir hash tablosunda önbelleğe alır — Java\'daki HashMap.get(key) gibi ortalama O(1) sürede sonuç döner.', en: 'Modern browsers cache all IDs in an internal hash table — just like Java\'s HashMap.get(key), it returns in average O(1) time.' } },
    { id: 3, icon: '🔍', label: { tr: 'DOM ağacı GEZİLMEZ', en: 'The DOM tree is NOT traversed' }, detail: { tr: 'By.xpath veya By.className\'in aksine, By.id ağacı kök\'ten yaprağa dolaşmaz — doğrudan indeksten TEK adımda bulur.', en: 'Unlike By.xpath or By.className, By.id never walks the tree from root to leaf — it resolves directly from the index in ONE step.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Koşul: ID gerçekten benzersiz olmalı', en: 'Condition: the ID must truly be unique' }, detail: { tr: 'HTML standardı ID\'nin sayfada TEK olmasını şart koşar; aynı ID iki elementte varsa tarayıcı sadece İLKİNİ döner, ikinci element sessizce görünmez olur.', en: 'The HTML standard requires an ID to be UNIQUE per page; if two elements share one, the browser returns only the FIRST, silently hiding the second.' } },
  ],
}

// 🎯 Locators — dinamik DOM'da ID kırılganlığı
const seleniumByIdReactRiskStep = {
  type: 'step-animation',
  id: 'selenium-locators-byid-react-risk-step-01',
  title: { tr: 'Adım Adım: React Yeniden Render Ettiğinde ID\'ye Ne Olur?', en: 'Step by Step: What Happens to an ID When React Re-Renders' },
  steps: [
    { id: 1, icon: '🧩', label: { tr: 'Test önce ID\'yi kaydeder', en: 'The test first records the ID' }, detail: { tr: 'Test, `By.id("loginBtn")` ile elementi ilk denemede bulur ve tıklar — o an sayfa STATİK görünür.', en: 'The test finds and clicks the element via `By.id("loginBtn")` on the first attempt — the page looks STATIC at that moment.' } },
    { id: 2, icon: '🔄', label: { tr: 'Bir state güncellemesi DOM\'u yeniden üretir', en: 'A state update regenerates the DOM' }, detail: { tr: 'React/Angular gibi framework\'ler bir state değiştiğinde ilgili bileşeni YENİDEN render eder — bazı build araçları auto-generated ID\'leri her render\'da DEĞİŞTİRİR.', en: 'Frameworks like React/Angular RE-RENDER the relevant component when state changes — some build tools regenerate auto-generated IDs on EVERY render.' } },
    { id: 3, icon: '❌', label: { tr: 'Eski ID artık DOM\'da yok', en: 'The old ID no longer exists in the DOM' }, detail: { tr: 'Test tekrar `By.id("loginBtn")` ile arasa bile, o ID artık DOM\'da YOK — `NoSuchElementException` fırlar.', en: 'Even if the test searches for `By.id("loginBtn")` again, that ID no longer EXISTS in the DOM — a `NoSuchElementException` is thrown.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Çözüm: yapısal locator\'a geç', en: 'Fix: switch to a structural locator' }, detail: { tr: 'Bu durumda `By.cssSelector` veya `By.xpath` ile metin/yapısal ilişkiye dayalı bir sorgu yazmak, framework\'ün ID üretim detaylarından BAĞIMSIZ kalır.', en: 'Switching to `By.cssSelector` or `By.xpath` based on text/structural relationships stays INDEPENDENT of the framework\'s ID-generation details.' } },
  ],
}

// 🎯 Locators — CSS selector eşleştirme motoru
const seleniumCssMatchingStep = {
  type: 'step-animation',
  id: 'selenium-locators-css-matching-step-01',
  title: { tr: 'Adım Adım: Tarayıcı Bir CSS Selector\'ı Nasıl Eşler?', en: 'Step by Step: How a Browser Matches a CSS Selector' },
  steps: [
    { id: 1, icon: '📐', label: { tr: 'Selector sağdan sola OKUNUR', en: 'The selector is READ right-to-left' }, detail: { tr: '`div.form > input` yazıldığında tarayıcı motoru önce EN SAĞDAKİ (`input`) parçayı arar, sonra ebeveynin `div.form` olup olmadığını kontrol eder.', en: 'For `div.form > input`, the browser engine first searches for the RIGHTMOST piece (`input`), then checks whether its parent matches `div.form`.' } },
    { id: 2, icon: '🎯', label: { tr: 'Aday elementler filtrelenir', en: 'Candidate elements are filtered' }, detail: { tr: 'Tüm `<input>` etiketleri aday olarak toplanır; her biri için üst zincir yukarı doğru KONTROL edilir.', en: 'All `<input>` tags are collected as candidates; for each one, the parent chain is CHECKED going upward.' } },
    { id: 3, icon: '⚡', label: { tr: 'Sağdan-sola strateji neden hızlı?', en: 'Why right-to-left is faster' }, detail: { tr: 'Yaprak elementler kökten daha az sayıdadır — sağdan başlamak taranacak aday havuzunu küçültür, `div.form input span a` gibi derin sorgularda fark yaratır.', en: 'Leaf elements are fewer than root-level ones — starting from the right shrinks the candidate pool, which matters for deep queries like `div.form input span a`.' } },
    { id: 4, icon: '☕', label: { tr: 'Java analojisi', en: 'Java analogy' }, detail: { tr: 'Bu, Java\'da bir Stream\'i `.filter()` ile daraltıp sonra `.anyMatch()` ile üst koşulu kontrol etmeye benzer — önce dar kümeye in, sonra doğrula.', en: 'This resembles narrowing a Java Stream with `.filter()` then checking the parent condition with `.anyMatch()` — narrow first, verify after.' } },
  ],
}

// 🎯 Locators — CSS attribute/nth-child hassasiyeti
const seleniumCssAttributeStep = {
  type: 'step-animation',
  id: 'selenium-locators-css-attribute-step-01',
  title: { tr: 'Adım Adım: input[placeholder*=\'ara\'] Nasıl Çözümlenir?', en: 'Step by Step: How input[placeholder*=\'search\'] Resolves' },
  steps: [
    { id: 1, icon: '🔠', label: { tr: 'Operatör TÜRÜ belirlenir', en: 'The operator TYPE is determined' }, detail: { tr: '`*=` "içerir", `^=` "ile başlar", `$=` "ile biter" anlamına gelir — her biri farklı bir string karşılaştırma stratejisidir.', en: '`*=` means "contains", `^=` means "starts with", `$=` means "ends with" — each is a different string-comparison strategy.' } },
    { id: 2, icon: '🧮', label: { tr: 'nth-child SAYIMLA çalışır', en: 'nth-child works by COUNTING' }, detail: { tr: '`ul li:nth-child(2)` kardeş elementleri 1\'den başlayarak sayar — DOM sırası değişirse aynı SAYIDAKİ ama FARKLI elementi döndürebilir.', en: '`ul li:nth-child(2)` counts sibling elements starting from 1 — if DOM order changes, it may return a DIFFERENT element at the SAME position.' } },
    { id: 3, icon: '🎯', label: { tr: 'Attribute değeri karakter karakter kontrol edilir', en: 'The attribute value is checked character by character' }, detail: { tr: 'Tarayıcı, elementin `placeholder` attribute string\'i içinde aranan alt diziyi (`ara`) TARAR — regex değil, düz substring eşleşmesidir.', en: 'The browser SCANS the element\'s `placeholder` attribute string for the target substring (`search`) — it is plain substring matching, not regex.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Kırılganlık riski', en: 'The fragility risk' }, detail: { tr: 'Placeholder metni i18n ile TR\'de "ara", EN\'de "search" olursa aynı selector her iki dilde ÇALIŞMAZ — dil bağımsız bir attribute (data-testid) tercih edilmelidir.', en: 'If the placeholder text is "ara" in TR and "search" in EN via i18n, the same selector will NOT work in both — a language-independent attribute (data-testid) is preferable.' } },
  ],
}

// 🎯 Locators — XPath absolute vs relative
const seleniumXpathTraversalStep = {
  type: 'step-animation',
  id: 'selenium-locators-xpath-traversal-step-01',
  title: { tr: 'Adım Adım: Absolute XPath Neden Bir Sonraki Deploy\'da Kırılır?', en: 'Step by Step: Why Absolute XPath Breaks on the Next Deploy' },
  steps: [
    { id: 1, icon: '📍', label: { tr: 'Absolute XPath kökten SAYAR', en: 'Absolute XPath COUNTS from the root' }, detail: { tr: '`/html/body/div[1]/form/input[2]` her adımda TAM pozisyonu belirtir — "kökten 4 seviye aşağı, 2. input".', en: '`/html/body/div[1]/form/input[2]` states the EXACT position at every step — "4 levels down from root, 2nd input".' } },
    { id: 2, icon: '🧱', label: { tr: 'Bir <div> eklenince TÜM sayım kayar', en: 'Adding one <div> shifts the ENTIRE count' }, detail: { tr: 'Tasarımcı sayfaya yeni bir banner `<div>` eklediğinde, ondan sonraki HER index bir kayar — locator artık YANLIŞ elementi işaret eder.', en: 'When a designer adds a new banner `<div>` to the page, EVERY index after it shifts by one — the locator now points to the WRONG element.' } },
    { id: 3, icon: '🎯', label: { tr: 'Relative XPath ilişkiye göre arar', en: 'Relative XPath searches by relationship' }, detail: { tr: '`//input[@id=\'username\']`, konumdan bağımsız olarak SADECE `id` özniteliğine bakar — sayfada nerede olursa olsun bulunur.', en: '`//input[@id=\'username\']` looks ONLY at the `id` attribute, independent of position — it is found no matter where it sits on the page.' } },
    { id: 4, icon: '☕', label: { tr: 'Java analojisi', en: 'Java analogy' }, detail: { tr: 'Absolute XPath, bir List\'te sabit `list.get(3)` index\'ine güvenmek gibidir; relative XPath ise `list.stream().filter(x -> x.getId().equals(...))` gibi KOŞULA göre arar.', en: 'Absolute XPath is like trusting a fixed `list.get(3)` index; relative XPath searches by CONDITION, like `list.stream().filter(x -> x.getId().equals(...))`.' } },
  ],
}

// 🎯 Locators — XPath metin eşleştirme
const seleniumXpathTextMatchStep = {
  type: 'step-animation',
  id: 'selenium-locators-xpath-textmatch-step-01',
  title: { tr: 'Adım Adım: text() ile contains(text()) Arasındaki Fark', en: 'Step by Step: The Difference Between text() and contains(text())' },
  steps: [
    { id: 1, icon: '🔤', label: { tr: 'text() TAM eşleşme ister', en: 'text() demands an EXACT match' }, detail: { tr: '`//button[text()=\'Giriş Yap\']`, elementin metni HARFİ HARFİNE "Giriş Yap" ise bulur — sonunda tek bir boşluk bile eşleşmeyi bozar.', en: '`//button[text()=\'Login\']` matches ONLY if the element\'s text is EXACTLY "Login" — even one trailing space breaks the match.' } },
    { id: 2, icon: '🧩', label: { tr: 'contains() KISMİ eşleşme ister', en: 'contains() allows a PARTIAL match' }, detail: { tr: '`//button[contains(text(),\'Giriş\')]`, metnin İÇİNDE "Giriş" geçen HER elementi bulur — "Giriş Yap", "Giriş Yapılıyor..." ikisi de eşleşir.', en: '`//button[contains(text(),\'Log\')]` matches ANY element whose text CONTAINS "Log" — both "Login" and "Logout" would match.' } },
    { id: 3, icon: '⚠️', label: { tr: 'Çok geniş eşleşme riski', en: 'The over-matching risk' }, detail: { tr: 'contains() bazen İSTENMEYEN bir ikinci elementi de eşler — sayfada "Giriş Yapılıyor..." yükleme metni varsa test YANLIŞ elementi tıklayabilir.', en: 'contains() can sometimes match an UNWANTED second element — if a "Logging in..." loading text exists, the test may click the WRONG element.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Güvenli tercih', en: 'The safer choice' }, detail: { tr: 'Metin dinamik değilse `text()` ile tam eşleşme tercih edilir; metin kısmen değişebiliyorsa `contains()` + ek bir attribute koşulu (`and @type=\'submit\'`) birlikte kullanılır.', en: 'Prefer exact `text()` when the text is static; when it can partially vary, combine `contains()` with an extra attribute condition (`and @type=\'submit\'`).' } },
  ],
}

// 🎯 Locators — XPath eksen (axis) navigasyonu
const seleniumXpathAxisStep = {
  type: 'step-animation',
  id: 'selenium-locators-xpath-axis-step-01',
  title: { tr: 'Adım Adım: following-sibling ve ancestor Nasıl Çalışır?', en: 'Step by Step: How following-sibling and ancestor Work' },
  steps: [
    { id: 1, icon: '🏷️', label: { tr: 'Label\'ın kendi ID\'si yoktur', en: 'The label has no ID of its own' }, detail: { tr: '"Email" yazan `<label>` bulunabilir ama input\'un kendisi bir ID taşımıyor olabilir — direkt `By.id` burada işe yaramaz.', en: 'The `<label>` reading "Email" can be found, but the input itself may carry no ID — `By.id` is useless here.' } },
    { id: 2, icon: '➡️', label: { tr: 'following-sibling KARDEŞ arar', en: 'following-sibling searches SIBLINGS' }, detail: { tr: '`//label[text()=\'Email\']/following-sibling::input`, önce label\'ı bulur, sonra AYNI seviyedeki bir sonraki `<input>` kardeşine geçer.', en: '`//label[text()=\'Email\']/following-sibling::input` first finds the label, then moves to the next `<input>` sibling at the SAME level.' } },
    { id: 3, icon: '⬆️', label: { tr: 'ancestor YUKARI çıkar', en: 'ancestor climbs UPWARD' }, detail: { tr: '`//input[@id=\'search\']/ancestor::form`, input\'tan başlayıp DOM ağacında YUKARI doğru en yakın `<form>` ebeveynini bulur.', en: '`//input[@id=\'search\']/ancestor::form` starts at the input and climbs UPWARD through the DOM tree to the nearest `<form>` ancestor.' } },
    { id: 4, icon: '☕', label: { tr: 'Java analojisi', en: 'Java analogy' }, detail: { tr: 'following-sibling, bir LinkedList\'te `.next` ile ilerlemek gibidir; ancestor ise bir ağaç yapısında `node.getParent()`\'ı tekrar tekrar çağırmaya benzer.', en: 'following-sibling resembles walking `.next` in a LinkedList; ancestor resembles repeatedly calling `node.getParent()` in a tree structure.' } },
  ],
}

const s2 = {
  tr: {
    title: '🎯 Locators — Element Bulma Stratejileri',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'Locator seçimi, Java\'da bir koleksiyona erişim yöntemini seçmekle birebir örtüşür: By.id bir Map\'te key ile lookup yapmak kadar hızlı (O(1)), By.xpath ise unsorted List\'te değer aramak gibi — tüm DOM ağacını gezerek çalışır. Peki her sayfada id var gibi görünüyorken neden XPath veya CSS selector kullanmak gerekiyor? Çünkü front-end framework\'leri (React, Angular) DOM\'u yeniden render ettiğinde id\'ler değişebilir ya da hiç olmayabilir; bu durumda XPath\'teki `//button[normalize-space()=\'Satın Al\']` gibi yapısal ilişki sorguları hayat kurtarır. Java\'da By.id("loginBtn") yazıyordun; Python\'da By.ID, TypeScript\'te de aynı — sözdizimi değişir, strateji değişmez. QA açısından en tehlikeli locator tipi ise `By.className("btn")`: CSS class\'lar tasarımcı tarafından refactor edildiğinde sessizce başka elementleri eşler, test yanlış PASS verir ve hiçbir exception fırlatmaz; bu, bulması en zor flaky test türüdür.',
      },
      {
        type: 'css-animation',
        kind: 'selenium-locator',
        label: { tr: 'Locator Stratejileri Karşılaştırması', en: 'Locator Strategy Comparison' },
      },
      LOCATOR_EXPLORER_BLOCK,
      seleniumSilentMismatchFilm,
      { type: 'heading', text: 'Locator Türleri — Hızlı Karşılaştırma' },
      {
        type: 'table',
        headers: ['Locator', 'Kullanım', 'Hız', 'Güvenilirlik', 'Ne Zaman Kullan?'],
        rows: [
          ['By.ID', 'By.id("loginBtn")', '⚡⚡⚡', '⭐⭐⭐⭐⭐', 'ID benzersizse — her zaman ilk tercih'],
          ['By.NAME', 'By.name("username")', '⚡⚡⚡', '⭐⭐⭐⭐', 'Form input\'larında'],
          ['By.CSS_SELECTOR', 'By.cssSelector(".btn")', '⚡⚡⚡', '⭐⭐⭐⭐', 'Modern projelerde, XPath\'ten hızlı'],
          ['By.XPATH', 'By.xpath("//div[@id]")', '⚡⚡', '⭐⭐⭐', 'Diğerleri yetersiz kalınca'],
          ['By.CLASS_NAME', 'By.className("active")', '⚡⚡', '⭐⭐', 'Tek class, birden fazla elemente dikkat'],
          ['By.LINK_TEXT', 'By.linkText("Giriş Yap")', '⚡⚡', '⭐⭐⭐', 'Yalnızca &lt;a&gt; tagları için'],
          ['By.PARTIAL_LINK_TEXT', 'By.partialLinkText("Giriş")', '⚡⚡', '⭐⭐', 'Link metni dinamikse'],
          ['By.TAG_NAME', 'By.tagName("h1")', '⚡', '⭐', 'Çok nadir, genelde birden fazla eleman döner'],
        ],
      },
      { type: 'heading', text: '1. By.ID — En Güvenilir Locator' },
      {
        type: 'code', language: 'java',
        label: 'Java — By.ID',
        code: `// HTML: <input id="username" type="text" />
WebElement input = driver.findElement(By.id("username"));
input.sendKeys("admin");

// Selenium 4: $ kısayolu da kullanılabilir
WebElement btn = driver.findElement(By.id("loginBtn"));
btn.click();`,
      },
      seleniumByIdLookupStep,
      {
        type: 'code', language: 'python',
        label: 'Python — By.ID',
        code: `from selenium.webdriver.common.by import By

# HTML: <input id="username" type="text" />
input_el = driver.find_element(By.ID, "username")
input_el.send_keys("admin")

btn = driver.find_element(By.ID, "loginBtn")
btn.click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — By.ID',
        code: `import { By } from 'selenium-webdriver';

// HTML: <input id="username" type="text" />
const input = await driver.findElement(By.id('username'));
await input.sendKeys('admin');

const btn = await driver.findElement(By.id('loginBtn'));
await btn.click();`,
      },
      seleniumByIdReactRiskStep,
      { type: 'heading', text: '2. By.CSS_SELECTOR — Modern & Hızlı' },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'CSS Selector, JavaScript/CSS\'te de kullandığın sözdizimi: "#id", ".class", "tag[attr=val]". Java\'da By.cssSelector("..."), Python\'da By.CSS_SELECTOR, TypeScript\'te By.css("...") şeklinde kullanılır.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — CSS Selector Örnekleri',
        code: `// ID ile → #loginBtn
driver.findElement(By.cssSelector("#loginBtn")).click();

// Class ile → .submit-btn
driver.findElement(By.cssSelector(".submit-btn")).click();

// Attribute ile → input[type='email']
driver.findElement(By.cssSelector("input[type='email']")).sendKeys("test@test.com");

// Child selector → div.form > input
driver.findElement(By.cssSelector("div.form > input")).sendKeys("test");

// Nth-child → ul li:nth-child(2)
driver.findElement(By.cssSelector("ul li:nth-child(2)")).click();

// Başlangıç ile → a[href^='https']
driver.findElement(By.cssSelector("a[href^='https']")).click();

// İçerik ile → input[placeholder*='ara']
driver.findElement(By.cssSelector("input[placeholder*='ara']")).sendKeys("ürün");`,
      },
      seleniumCssMatchingStep,
      {
        type: 'code', language: 'python',
        label: 'Python — CSS Selector',
        code: `# ID
driver.find_element(By.CSS_SELECTOR, "#loginBtn").click()

# Class
driver.find_element(By.CSS_SELECTOR, ".submit-btn").click()

# Attribute
driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys("test@test.com")

# Nth child
driver.find_element(By.CSS_SELECTOR, "ul li:nth-child(2)").click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — CSS Selector',
        code: `// ID
await (await driver.findElement(By.css('#loginBtn'))).click();

// Attribute
await (await driver.findElement(By.css("input[type='email']"))).sendKeys('test@test.com');

// Nth child
await (await driver.findElement(By.css('ul li:nth-child(2)'))).click();`,
      },
      seleniumCssAttributeStep,
      { type: 'heading', text: '3. By.XPATH — En Güçlü Locator' },
      {
        type: 'callout', color: 'purple', emoji: '🔎',
        title: 'XPath Ne Zaman Kullanılır?',
        content: 'XPath, ID veya CSS ile bulamadığınız durumlarda, üst elementi bilerek alt elementi bulmak istediğinizde veya metin içeriğine göre eleman bulmak istediğinizde kullanılır. Ancak DOM değişikliklerine karşı kırılgan olabilir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — XPath Örnekleri',
        code: `// Absolute XPath (KULLANMA — kırılgan!)
// /html/body/div[1]/form/input[2]

// Relative XPath (KULLAN)
// Attribute ile
driver.findElement(By.xpath("//input[@id='username']")).sendKeys("admin");
driver.findElement(By.xpath("//button[@type='submit']")).click();

// Metin ile (tam eşleşme)
driver.findElement(By.xpath("//button[text()='Giriş Yap']")).click();

// Metin içeriyorsa (contains)
driver.findElement(By.xpath("//button[contains(text(),'Giriş')]")).click();

// Attribute içeriyorsa
driver.findElement(By.xpath("//div[contains(@class,'active')]")).click();

// Üst-alt ilişki (parent → child)
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input")).sendKeys("test@test.com");

// Ancestor (alt → üst)
driver.findElement(By.xpath("//input[@id='search']/ancestor::form")).submit();

// Birden fazla koşul (AND)
driver.findElement(By.xpath("//input[@type='text' and @name='user']")).sendKeys("admin");`,
      },
      seleniumXpathTraversalStep,
      {
        type: 'code', language: 'python',
        label: 'Python — XPath',
        code: `# Attribute ile
driver.find_element(By.XPATH, "//input[@id='username']").send_keys("admin")

# Metin içeren
driver.find_element(By.XPATH, "//button[contains(text(),'Giriş')]").click()

# Following sibling
driver.find_element(By.XPATH, "//label[text()='Email']/following-sibling::input").send_keys("test@test.com")

# AND koşulu
driver.find_element(By.XPATH, "//input[@type='text' and @name='user']").send_keys("admin")`,
      },
      seleniumXpathTextMatchStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — XPath',
        code: `// Attribute ile
await (await driver.findElement(By.xpath("//input[@id='username']"))).sendKeys('admin');

// Metin içeren
await (await driver.findElement(By.xpath("//button[contains(text(),'Login')]"))).click();

// Following sibling
const emailInput = await driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input"));
await emailInput.sendKeys('test@test.com');`,
      },
      seleniumXpathAxisStep,
      { type: 'heading', text: '4. Selenium 4 — Relative Locators' },
      {
        type: 'callout', color: 'green', emoji: '✨',
        title: 'Selenium 4 Yeni Özellik!',
        content: 'Selenium 4 ile gelen relative locator\'lar, bir elementi diğerinin konumuna göre bulmanızı sağlar: above(), below(), toLeftOf(), toRightOf(), near(). Dinamik DOM\'da çok işe yarar.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Selenium 4 Relative Locators',
        code: `import static org.openqa.selenium.support.locators.RelativeLocator.*;

// "Email" label'ının altındaki ilk input
WebElement emailInput = driver.findElement(
    with(By.tagName("input")).below(By.id("emailLabel"))
);

// Submit butonunun solundaki iptal butonu
WebElement cancelBtn = driver.findElement(
    with(By.tagName("button")).toLeftOf(By.id("submitBtn"))
);

// "Ad" input'una 50px yakın herhangi bir element
WebElement nearby = driver.findElement(
    with(By.tagName("input")).near(By.id("nameInput"))
);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Relative Locators',
        code: `from selenium.webdriver.support.relative_locator import locate_with

# "Email" label'ının altındaki input
email_input = driver.find_element(
    locate_with(By.TAG_NAME, "input").below({By.ID: "emailLabel"})
)

# Submit butonunun solundaki buton
cancel_btn = driver.find_element(
    locate_with(By.TAG_NAME, "button").to_left_of({By.ID: "submitBtn"})
)`,
      },
      { type: 'heading', text: '5. findElements — Birden Fazla Element' },
      {
        type: 'code', language: 'java',
        label: 'Java — findElements (liste döndürür)',
        code: `// Tüm <li> elementlerini bul
List<WebElement> listItems = driver.findElements(By.tagName("li"));
System.out.println("Toplam item: " + listItems.size());

// Her birini yazdır
for (WebElement item : listItems) {
    System.out.println(item.getText());
}

// Tüm linkler
List<WebElement> links = driver.findElements(By.tagName("a"));
for (WebElement link : links) {
    System.out.println(link.getAttribute("href"));
}`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — find_elements',
        code: `# Tüm li elementleri
items = driver.find_elements(By.TAG_NAME, "li")
print(f"Toplam: {len(items)}")

for item in items:
    print(item.text)

# Tüm linkler
links = driver.find_elements(By.TAG_NAME, "a")
for link in links:
    print(link.get_attribute("href"))`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — findElements',
        code: `// Tüm li elementleri
const items = await driver.findElements(By.tagName('li'));
console.log('Toplam:', items.length);

for (const item of items) {
  console.log(await item.getText());
}

// Tüm linkler
const links = await driver.findElements(By.tagName('a'));
for (const link of links) {
  console.log(await link.getAttribute('href'));
}`,
      },
      {
        type: 'quiz',
        question: { tr: 'Aşağıdaki locator türlerinden hangisi en hızlı ve güvenilirdir?', en: 'Which locator type is the fastest and most reliable?' },
        options: [
          { id: 'a', text: 'By.XPATH — //div[contains(@class,"btn")]' },
          { id: 'b', text: 'By.ID — id="loginBtn"' },
          { id: 'c', text: 'By.TAG_NAME — tagName("button")' },
          { id: 'd', text: 'By.CLASS_NAME — className("active")' },
        ],
        correct: 'b',
        explanation: { tr: 'By.ID en hızlı ve en güvenilir locator\'dır çünkü ID sayfa içinde benzersiz olmalıdır (HTML standardı) ve tarayıcılar ID aramasını O(1) ile yapar. XPath ise en yavaş ve kırılgandır.', en: 'By.ID is the fastest and most reliable locator because IDs should be unique within a page (HTML standard) and browsers perform ID lookups in O(1). XPath is the slowest and most brittle.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Test otomasyonu performansını optimize etmek için hangi locator tipi her zaman tercih edilmelidir?",
            "en": "Which locator type should always be preferred to optimize test automation performance?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "By.CSS_SELECTOR — cssSelector(\".submit-button\")"
            },
            {
                  "id": "b",
                  "text": "By.ID — id=\"submit-button\""
            },
            {
                  "id": "c",
                  "text": "By.LINK_TEXT — linkText(\"Submit\")"
            },
            {
                  "id": "d",
                  "text": "By.XPATH — //button[@id=\"submit-button\"]"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "By.ID kullanımı, tarayıcının DOM üzerinde doğrudan erişim sağlaması ve benzersiz olması nedeniyle en hızlı ve en kararlı yöntemdir. XPath veya CSS seçiciler daha karmaşık tarama süreçleri gerektirir.",
            "en": "Using By.ID is the fastest and most stable method because it allows the browser to perform a direct lookup on the DOM and guarantees uniqueness. XPath or CSS selectors require more complex parsing processes."
      }
}
},
    ],
  },
  en: {
    title: '🎯 Locators — Element Finding Strategies',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'Choosing a locator directly mirrors choosing a collection access strategy in Java: By.id is a Map key lookup — O(1), the browser calls getElementById internally. By.xpath, by contrast, works like scanning an unsorted List — it may traverse the entire DOM tree. So if pages seem to always have IDs, why do you ever need XPath or CSS selectors? Because front-end frameworks (React, Angular) can regenerate the DOM on each render, making IDs unstable or absent; in those cases structural queries like `//button[normalize-space()=\'Buy\']` become the only reliable anchor. In Java you wrote By.id("loginBtn"); in Python it is By.ID, in TypeScript the same — only syntax differs, the locator strategy stays constant. The most dangerous locator for QA is By.className("btn"): when a designer refactors CSS class names, the locator silently starts matching different elements, the test returns a false PASS, and no exception is thrown — the hardest category of flaky test to diagnose.',
      },
      LOCATOR_EXPLORER_BLOCK,
      seleniumSilentMismatchFilm,
      { type: 'heading', text: 'Locator Types — Quick Comparison' },
      {
        type: 'table',
        headers: ['Locator', 'Usage', 'Speed', 'Reliability', 'When to Use?'],
        rows: [
          ['By.ID', 'By.id("loginBtn")', '⚡⚡⚡', '⭐⭐⭐⭐⭐', 'If ID is unique — always first choice'],
          ['By.NAME', 'By.name("username")', '⚡⚡⚡', '⭐⭐⭐⭐', 'For form inputs'],
          ['By.CSS_SELECTOR', 'By.cssSelector(".btn")', '⚡⚡⚡', '⭐⭐⭐⭐', 'Modern projects, faster than XPath'],
          ['By.XPATH', 'By.xpath("//div[@id]")', '⚡⚡', '⭐⭐⭐', 'When other strategies are insufficient'],
          ['By.CLASS_NAME', 'By.className("active")', '⚡⚡', '⭐⭐', 'Single class; beware of multiple matches'],
          ['By.LINK_TEXT', 'By.linkText("Login")', '⚡⚡', '⭐⭐⭐', 'Only for &lt;a&gt; tags'],
          ['By.PARTIAL_LINK_TEXT', 'By.partialLinkText("Log")', '⚡⚡', '⭐⭐', 'When link text is dynamic'],
          ['By.TAG_NAME', 'By.tagName("h1")', '⚡', '⭐', 'Rarely; usually returns multiple elements'],
        ],
      },
      { type: 'heading', text: '1. By.ID — Most Reliable Locator' },
      {
        type: 'code', language: 'java',
        label: 'Java — By.ID',
        code: `// HTML: <input id="username" type="text" />
WebElement input = driver.findElement(By.id("username"));
input.sendKeys("admin");

WebElement btn = driver.findElement(By.id("loginBtn"));
btn.click();`,
      },
      seleniumByIdLookupStep,
      {
        type: 'code', language: 'python',
        label: 'Python — By.ID',
        code: `from selenium.webdriver.common.by import By

input_el = driver.find_element(By.ID, "username")
input_el.send_keys("admin")

btn = driver.find_element(By.ID, "loginBtn")
btn.click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — By.ID',
        code: `import { By } from 'selenium-webdriver';

const input = await driver.findElement(By.id('username'));
await input.sendKeys('admin');

const btn = await driver.findElement(By.id('loginBtn'));
await btn.click();`,
      },
      seleniumByIdReactRiskStep,
      { type: 'heading', text: '2. By.CSS_SELECTOR — Modern & Fast' },
      {
        type: 'code', language: 'java',
        label: 'Java — CSS Selector Examples',
        code: `driver.findElement(By.cssSelector("#loginBtn")).click();           // ID
driver.findElement(By.cssSelector(".submit-btn")).click();         // Class
driver.findElement(By.cssSelector("input[type='email']")).sendKeys("test@test.com"); // Attr
driver.findElement(By.cssSelector("ul li:nth-child(2)")).click(); // Nth child
driver.findElement(By.cssSelector("a[href^='https']")).click();   // Starts with
driver.findElement(By.cssSelector("input[placeholder*='search']")).sendKeys("query"); // Contains`,
      },
      seleniumCssMatchingStep,
      {
        type: 'code', language: 'python',
        label: 'Python — CSS Selector',
        code: `driver.find_element(By.CSS_SELECTOR, "#loginBtn").click()
driver.find_element(By.CSS_SELECTOR, ".submit-btn").click()
driver.find_element(By.CSS_SELECTOR, "input[type='email']").send_keys("test@test.com")
driver.find_element(By.CSS_SELECTOR, "ul li:nth-child(2)").click()`,
      },
      seleniumCssAttributeStep,
      { type: 'heading', text: '3. By.XPATH — Most Powerful' },
      {
        type: 'code', language: 'java',
        label: 'Java — XPath Examples',
        code: `// Attribute
driver.findElement(By.xpath("//input[@id='username']")).sendKeys("admin");

// Exact text match
driver.findElement(By.xpath("//button[text()='Login']")).click();

// Contains text
driver.findElement(By.xpath("//button[contains(text(),'Log')]")).click();

// Contains attribute
driver.findElement(By.xpath("//div[contains(@class,'active')]")).click();

// Following sibling
driver.findElement(By.xpath("//label[text()='Email']/following-sibling::input")).sendKeys("test@test.com");

// AND condition
driver.findElement(By.xpath("//input[@type='text' and @name='user']")).sendKeys("admin");`,
      },
      seleniumXpathTraversalStep,
      {
        type: 'code', language: 'python',
        label: 'Python — XPath',
        code: `driver.find_element(By.XPATH, "//input[@id='username']").send_keys("admin")
driver.find_element(By.XPATH, "//button[contains(text(),'Login')]").click()
driver.find_element(By.XPATH, "//label[text()='Email']/following-sibling::input").send_keys("test@test.com")`,
      },
      seleniumXpathTextMatchStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — XPath',
        code: `await (await driver.findElement(By.xpath("//input[@id='username']"))).sendKeys('admin');
await (await driver.findElement(By.xpath("//button[contains(text(),'Login')]"))).click();`,
      },
      seleniumXpathAxisStep,
      {
        type: 'quiz',
        question: { en: 'Which locator type is the fastest and most reliable?', tr: 'Which locator type is the fastest and most reliable?' },
        options: [
          { id: 'a', text: 'By.XPATH — //div[contains(@class,"btn")]' },
          { id: 'b', text: 'By.ID — id="loginBtn"' },
          { id: 'c', text: 'By.TAG_NAME — tagName("button")' },
          { id: 'd', text: 'By.CLASS_NAME — className("active")' },
        ],
        correct: 'b',
        explanation: { en: 'By.ID is the fastest and most reliable because IDs should be unique in a page and browsers perform ID lookups in O(1). XPath is the slowest and most brittle.', tr: 'By.ID en hızlı ve güvenilirdir çünkü ID benzersiz olmalı ve tarayıcı O(1) ile arar.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "en": "Why is 'By.ID' considered the superior choice for element location compared to other strategies?",
            "tr": "Neden 'By.ID' diğer stratejilere kıyasla element konumlandırma için daha üstün bir seçenek olarak kabul edilir?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "It supports complex query language features.",
                  "tr": "Karmaşık sorgu dili özelliklerini destekler."
            },
            {
                  "id": "b",
                  "text": "It provides the most readable code for developers.",
                  "tr": "Geliştiriciler için en okunabilir kodu sağlar."
            },
            {
                  "id": "c",
                  "text": "It provides the most efficient lookup performance (O(1)) and enforces uniqueness.",
                  "tr": "En verimli arama performansını (O(1)) sağlar ve benzersizliği zorunlu kılar."
            },
            {
                  "id": "d",
                  "text": "It is the only locator that works in all browsers.",
                  "tr": "Tüm tarayıcılarda çalışan tek locator türüdür."
            }
      ],
      "correct": "c",
      "explanation": {
            "en": "By.ID is preferred because HTML standards mandate unique IDs, allowing browsers to perform high-speed lookups with O(1) time complexity.",
            "tr": "By.ID tercih edilir çünkü HTML standartları benzersiz ID'leri zorunlu kılar, bu da tarayıcıların O(1) zaman karmaşıklığı ile yüksek hızlı arama yapmasına olanak tanır."
      }
}
},
    ],
  },
}

// ─── S3: ACTIONS ─────────────────────────────────────────────────────────────
// ⚡ Actions — element durum okuma zinciri
const seleniumElementStateReadStep = {
  type: 'step-animation',
  id: 'selenium-actions-state-read-step-01',
  title: { tr: 'Adım Adım: isDisplayed/isEnabled/isSelected Neyi Sorar?', en: 'Step by Step: What isDisplayed/isEnabled/isSelected Actually Ask' },
  steps: [
    { id: 1, icon: '👁️', label: { tr: 'isDisplayed() render durumunu sorar', en: 'isDisplayed() asks about render state' }, detail: { tr: 'Element DOM\'da VAR olsa bile `display:none` veya `visibility:hidden` ise `isDisplayed()` FALSE döner — varlık ile görünürlük FARKLI şeylerdir.', en: 'Even if the element EXISTS in the DOM, `isDisplayed()` returns FALSE when `display:none` or `visibility:hidden` applies — existence and visibility are DIFFERENT things.' } },
    { id: 2, icon: '🔒', label: { tr: 'isEnabled() etkileşim durumunu sorar', en: 'isEnabled() asks about interaction state' }, detail: { tr: 'Bir buton görünür OLABİLİR ama `disabled` attribute\'u varsa `isEnabled()` FALSE döner — click() çağrılsa bile hiçbir şey OLMAZ.', en: 'A button CAN be visible but if it carries a `disabled` attribute, `isEnabled()` returns FALSE — calling click() would do NOTHING.' } },
    { id: 3, icon: '☑️', label: { tr: 'isSelected() sadece belirli tiplerde anlamlıdır', en: 'isSelected() is meaningful only for certain types' }, detail: { tr: 'Checkbox, radio ve option elementleri için "işaretli mi?" sorusuna cevap verir — bir `<div>` için her zaman FALSE döner.', en: 'It answers "is it checked?" for checkboxes, radios, and options — for a `<div>` it always returns FALSE.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Neden bu üçü BİRLİKTE kontrol edilir?', en: 'Why check all three TOGETHER?' }, detail: { tr: 'Production\'da bir submit butonuna tıklamadan ÖNCE bu üç kontrolü yapmak, "buton var ama disabled" gibi sessiz hataları test ASSERTION\'ına dönüştürür.', en: 'Checking all three BEFORE clicking a submit button in production turns silent failures like "the button exists but is disabled" into a test ASSERTION.' } },
  ],
}

// ⚡ Actions — clear() + yeniden yazma döngüsü
const seleniumClearResendStep = {
  type: 'step-animation',
  id: 'selenium-actions-clear-resend-step-01',
  title: { tr: 'Adım Adım: clear() Olmadan sendKeys() Neden Riskli?', en: 'Step by Step: Why sendKeys() Without clear() Is Risky' },
  steps: [
    { id: 1, icon: '📝', label: { tr: 'İlk sendKeys metni EKLER', en: 'The first sendKeys APPENDS text' }, detail: { tr: '`username.sendKeys("admin")` input\'a metni yazar — eğer input zaten önceden dolu bırakılmışsa, yeni metin ESKİ metnin SONUNA eklenir.', en: '`username.sendKeys("admin")` types into the input — if it was already pre-filled, the new text is APPENDED to the OLD text, not replacing it.' } },
    { id: 2, icon: '🧹', label: { tr: 'clear() input\'u SIFIRLAR', en: 'clear() RESETS the input' }, detail: { tr: '`username.clear()`, alandaki TÜM mevcut değeri siler — bir sonraki sendKeys BOŞ bir alana yazar.', en: '`username.clear()` erases ALL existing value in the field — the next sendKeys writes into an EMPTY field.' } },
    { id: 3, icon: '🔁', label: { tr: 'Testler arası KİRLENME riski', en: 'The risk of cross-test CONTAMINATION' }, detail: { tr: 'clear() atlanırsa, bir önceki testten kalan "olduser" değeri "newuser" ile birleşip "olduser newuser" gibi YANLIŞ bir veri oluşturabilir.', en: 'Skip clear() and a leftover "olduser" value from a previous test can merge with "newuser" into a WRONG value like "olduserewuser".' } },
    { id: 4, icon: '☕', label: { tr: 'Java analojisi', en: 'Java analogy' }, detail: { tr: 'Bu, bir StringBuilder\'ı `.setLength(0)` ile sıfırlamadan yeniden `.append()` etmeye benzer — eski içerik SESSİZCE kalmaya devam eder.', en: 'This is like calling `.append()` on a StringBuilder again without first resetting it via `.setLength(0)` — the old content SILENTLY remains.' } },
  ],
}

// ⚡ Actions — Keys.CONTROL chord mekanizması
const seleniumKeysChordStep = {
  type: 'step-animation',
  id: 'selenium-actions-keys-chord-step-01',
  title: { tr: 'Adım Adım: Keys.CONTROL + "a" Bir Tuş Kombinasyonunu Nasıl Simüle Eder?', en: 'Step by Step: How Keys.CONTROL + "a" Simulates a Key Combo' },
  steps: [
    { id: 1, icon: '⌨️', label: { tr: 'String birleştirme bir MODIFIER kodudur', en: 'String concatenation IS a modifier code' }, detail: { tr: '`Keys.CONTROL`, görünmez özel bir Unicode karakteridir — `+ "a"` ile birleştirildiğinde tarayıcıya "CTRL BASILIYKEN a" tuş olayı gönderilir.', en: '`Keys.CONTROL` is an invisible special Unicode character — concatenated with `+ "a"`, it sends the browser an "a WHILE CTRL is held" key event.' } },
    { id: 2, icon: '📤', label: { tr: 'Tek bir sendKeys çağrısı yeterlidir', en: 'A single sendKeys call is enough' }, detail: { tr: 'İki ayrı tuşa basıp bırakmayı simüle etmek için iki ayrı `sendKeys` çağırmaya GEREK YOKTUR — birleştirilmiş string tek seferde gönderilir.', en: 'You do NOT need two separate `sendKeys` calls to simulate pressing and releasing two keys — the concatenated string is sent in one call.' } },
    { id: 3, icon: '🗑️', label: { tr: 'DELETE ayrı bir olaydır', en: 'DELETE is a separate event' }, detail: { tr: '`Keys.CONTROL + "a"` metni SEÇER, gerçek silme için ayrı bir `Keys.DELETE` çağrısı GEREKİR — seçim ve silme iki farklı tuş olayıdır.', en: '`Keys.CONTROL + "a"` SELECTS the text; actual deletion REQUIRES a separate `Keys.DELETE` call — selection and deletion are two distinct key events.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Platform farkı riski', en: 'The platform-difference risk' }, detail: { tr: 'macOS\'ta "tümünü seç" genelde CMD+A\'dır; CI ajanı Linux/Windows\'sa `Keys.CONTROL` doğru çalışır ama macOS runner\'da `Keys.COMMAND` gerekebilir.', en: 'On macOS, "select all" is usually CMD+A; `Keys.CONTROL` works fine on a Linux/Windows CI agent, but a macOS runner may need `Keys.COMMAND` instead.' } },
  ],
}

// ⚡ Actions — klavye odak (focus) akışı
const seleniumKeyboardFocusStep = {
  type: 'step-animation',
  id: 'selenium-actions-keyboard-focus-step-01',
  title: { tr: 'Adım Adım: Tab ile Odak Bir Alandan Diğerine Nasıl Geçer?', en: 'Step by Step: How Tab Moves Focus From One Field to Another' },
  steps: [
    { id: 1, icon: '🎯', label: { tr: 'sendKeys önce elemente ODAKLANIR', en: 'sendKeys FOCUSES the element first' }, detail: { tr: '`username.sendKeys("admin", Keys.TAB)` önce input\'a metni yazar, sonra TAB tuşunu gönderir — bu tarayıcının doğal focus zincirini tetikler.', en: '`username.sendKeys("admin", Keys.TAB)` types into the input first, then sends TAB — this triggers the browser\'s natural focus chain.' } },
    { id: 2, icon: '➡️', label: { tr: 'Tarayıcı tabindex sırasını izler', en: 'The browser follows tabindex order' }, detail: { tr: 'TAB tuşu, sayfanın `tabindex` sırasına (veya DOM sırasına) göre BİR SONRAKİ odaklanabilir elemente geçer — Selenium bunu manuel `findElement` ile taklit ETMEZ.', en: 'TAB moves to the NEXT focusable element per the page\'s `tabindex` (or DOM) order — Selenium does not simulate this via manual `findElement` calls.' } },
    { id: 3, icon: '⏎', label: { tr: 'ENTER genelde formu tetikler', en: 'ENTER usually triggers the form' }, detail: { tr: '`searchBox.sendKeys("Selenium", Keys.ENTER)` bir arama kutusunda genelde formun `submit` event\'ini tetikler — ayrı bir `.click()` çağrısına GEREK KALMAZ.', en: '`searchBox.sendKeys("Selenium", Keys.ENTER)` in a search box usually triggers the form\'s `submit` event — no separate `.click()` call is NEEDED.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Gerçek kullanıcı davranışına daha yakın', en: 'Closer to real user behavior' }, detail: { tr: 'Klavye ile gezinme, mouse tıklamalarından daha az test edilir ama erişilebilirlik (a11y) hatalarını yakalamada gerçek kullanıcı davranışına EN YAKIN yöntemdir.', en: 'Keyboard navigation is tested less than mouse clicks, but it is the method CLOSEST to real user behavior for catching accessibility (a11y) issues.' } },
  ],
}

// ⚡ Actions API — builder zinciri ve .perform()
const seleniumActionsBuilderStep = {
  type: 'step-animation',
  id: 'selenium-actions-builder-perform-step-01',
  title: { tr: 'Adım Adım: .perform() Çağrılana Kadar Hiçbir Şey Neden Olmaz?', en: 'Step by Step: Why Nothing Happens Until .perform() Is Called' },
  steps: [
    { id: 1, icon: '🧱', label: { tr: 'Her metot bir adım BİRİKTİRİR', en: 'Every method ACCUMULATES a step' }, detail: { tr: '`actions.moveToElement(menu).click().sendKeys("metin")` çağrılırken tarayıcıda HENÜZ hiçbir şey olmaz — her metot sadece dahili bir eylem listesine bir adım ekler.', en: 'While calling `actions.moveToElement(menu).click().sendKeys("text")`, NOTHING happens in the browser yet — each method just appends a step to an internal action list.' } },
    { id: 2, icon: '🏗️', label: { tr: '.build() listeyi bir komut nesnesine derler', en: '.build() compiles the list into a command object' }, detail: { tr: '`.build()` biriken adımları TEK bir composite eylem nesnesine derler — henüz tarayıcıya GÖNDERİLMEZ.', en: '`.build()` compiles the accumulated steps into ONE composite action object — it is still NOT sent to the browser.' } },
    { id: 3, icon: '🚀', label: { tr: '.perform() TÜM zinciri tek seferde yürütür', en: '.perform() executes the WHOLE chain at once' }, detail: { tr: 'Sadece `.perform()` çağrıldığında tüm zincir tarayıcıya GERÇEK mouse/klavye olayları olarak sırayla gönderilir.', en: 'Only when `.perform()` is called does the entire chain get sent to the browser as REAL mouse/keyboard events, in order.' } },
    { id: 4, icon: '☕', label: { tr: 'Java analojisi', en: 'Java analogy' }, detail: { tr: 'Bu, bir StringBuilder\'a `.append()` zinciri kurup en son `.toString()` çağırmaya benzer — ara adımların hiçbiri kendi başına SONUÇ üretmez.', en: 'This resembles chaining `.append()` calls on a StringBuilder and calling `.toString()` at the end — none of the intermediate steps produce a RESULT on their own.' } },
  ],
}

// ⚡ Actions API — hover / mouseover event tetikleme
const seleniumHoverEventStep = {
  type: 'step-animation',
  id: 'selenium-actions-hover-event-step-01',
  title: { tr: 'Adım Adım: moveToElement() Neden click() ile YAPILAMAZ?', en: 'Step by Step: Why moveToElement() Cannot Be Done With click()' },
  steps: [
    { id: 1, icon: '🖱️', label: { tr: 'click() sadece TIKLAMA event\'i gönderir', en: 'click() sends ONLY a click event' }, detail: { tr: '`element.click()`, tarayıcıya SADECE `click` olayını tetikler — `mouseover`, `mouseenter` gibi imleç HAREKETİ olaylarını asla göndermez.', en: '`element.click()` fires ONLY the `click` event to the browser — it never sends cursor-MOVEMENT events like `mouseover` or `mouseenter`.' } },
    { id: 2, icon: '🎯', label: { tr: 'moveToElement() imleci GERÇEKTEN taşır', en: 'moveToElement() ACTUALLY moves the cursor' }, detail: { tr: '`actions.moveToElement(menu).perform()`, sanal imleci menünün üzerine getirir ve `mouseover`/`mouseenter` olaylarını GERÇEKTEN tetikler.', en: '`actions.moveToElement(menu).perform()` moves the virtual cursor over the menu and ACTUALLY fires `mouseover`/`mouseenter` events.' } },
    { id: 3, icon: '💬', label: { tr: 'CSS :hover ve JS listener\'ları BUNA bağlıdır', en: 'CSS :hover and JS listeners depend on THIS' }, detail: { tr: 'Bir açılır menü genelde CSS `:hover` veya bir `mouseenter` JS listener\'ı ile açılır — bunlar sadece GERÇEK mouseover olayına tepki verir.', en: 'A dropdown menu is usually opened by CSS `:hover` or a `mouseenter` JS listener — these respond ONLY to a REAL mouseover event.' } },
    { id: 4, icon: '⚠️', label: { tr: 'element.click() ile yazılan test neden yanıltıcı PASS verir?', en: 'Why a test written with element.click() gives a misleading PASS' }, detail: { tr: 'Menü öğesi zaten DOM\'da varsa `click()` çalışabilir, ama gerçek kullanıcı önce hover ETMEDEN o öğeyi asla GÖRMEZ — test senaryosu gerçek davranışı YANSITMAZ.', en: 'If the menu item already exists in the DOM, `click()` may work, but a real user never SEES that item without hovering first — the test scenario does NOT reflect real behavior.' } },
  ],
}

// ⚡ JavaScript Executor — güven zincirini atlama riski
const seleniumJsExecutorBypassStep = {
  type: 'step-animation',
  id: 'selenium-actions-js-executor-bypass-step-01',
  title: { tr: 'Adım Adım: executeScript() WebDriver Katmanını Nasıl Atlar?', en: 'Step by Step: How executeScript() Bypasses the WebDriver Layer' },
  steps: [
    { id: 1, icon: '🧭', label: { tr: 'Normal click() WebDriver protokolünden geçer', en: 'A normal click() goes through the WebDriver protocol' }, detail: { tr: 'Standart `element.click()`, W3C WebDriver protokolü üzerinden gider — tarayıcı önce elementin görünür VE tıklanabilir olduğunu doğrular.', en: 'A standard `element.click()` travels through the W3C WebDriver protocol — the browser first verifies the element is visible AND clickable.' } },
    { id: 2, icon: '⚡', label: { tr: 'executeScript() doğrudan DOM\'a yazar', en: 'executeScript() writes directly to the DOM' }, detail: { tr: '`(JavascriptExecutor) driver).executeScript("arguments[0].click();", element)`, bu doğrulamaları ATLAYIP JavaScript\'i doğrudan sayfada çalıştırır.', en: '`((JavascriptExecutor) driver).executeScript("arguments[0].click();", element)` SKIPS those checks and runs JavaScript directly on the page.' } },
    { id: 3, icon: '👻', label: { tr: 'Görünmez elementler bile "tıklanabilir"', en: 'Even invisible elements become "clickable"' }, detail: { tr: 'Bu yüzden `display:none` olan bir elementi bile JS ile tıklamak MÜMKÜNDÜR — gerçek bir kullanıcı bunu asla yapamaz.', en: 'This is why it is POSSIBLE to JS-click even a `display:none` element — a real user could never do that.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Ne zaman son çare olarak kullanılır?', en: 'When is it used as a last resort?' }, detail: { tr: 'Sadece normal `.click()` gerçek bir overlay/animasyon yüzünden SÜREKLİ engelleniyorsa kullanılır — kural, önce nedeni araştırmak, sonra bypass\'a başvurmaktır.', en: 'Only used when a normal `.click()` is CONSISTENTLY blocked by a real overlay/animation — the rule is to investigate the cause first, then resort to the bypass.' } },
  ],
}

// ⚡ Select dropdown — üç seçim stratejisi
const seleniumSelectDropdownStep = {
  type: 'step-animation',
  id: 'selenium-actions-select-dropdown-step-01',
  title: { tr: 'Adım Adım: selectByValue, selectByIndex, selectByVisibleText Farkı', en: 'Step by Step: The Difference Between selectByValue, selectByIndex, selectByVisibleText' },
  steps: [
    { id: 1, icon: '🏷️', label: { tr: 'selectByValue HTML value ATTRIBUTE\'una bakar', en: 'selectByValue looks at the HTML value ATTRIBUTE' }, detail: { tr: '`<option value="TR">Türkiye</option>` için `selectByValue("TR")` kullanılır — kullanıcıya GÖRÜNMEYEN teknik değere dayanır.', en: 'For `<option value="TR">Turkey</option>`, `selectByValue("TR")` is used — it relies on the technical value the user never SEES.' } },
    { id: 2, icon: '🔢', label: { tr: 'selectByIndex SIRAYA bakar', en: 'selectByIndex looks at ORDER' }, detail: { tr: '`selectByIndex(2)`, dropdown\'daki 3\'üncü seçeneği (0\'dan sayarak) seçer — seçenekler yeniden sıralanırsa YANLIŞ öğe seçilir.', en: '`selectByIndex(2)` selects the 3rd option (counting from 0) in the dropdown — if options get reordered, the WRONG one gets picked.' } },
    { id: 3, icon: '👁️', label: { tr: 'selectByVisibleText EKRANDAKİ metne bakar', en: 'selectByVisibleText looks at the ON-SCREEN text' }, detail: { tr: '`selectByVisibleText("Türkiye")`, kullanıcının GÖRDÜĞÜ metne göre seçer — en okunabilir ama i18n çevirisi değişirse KIRILIR.', en: '`selectByVisibleText("Turkey")` selects based on what the user actually SEES — most readable, but BREAKS if the i18n translation changes.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Hangisi en güvenilir?', en: 'Which is the most reliable?' }, detail: { tr: 'value attribute\'u genelde backend tarafından sabit tutulur ve UI metninden BAĞIMSIZDIR — bu yüzden `selectByValue`, üç strateji arasında genelde EN sağlamıdır.', en: 'The value attribute is usually kept stable by the backend and is INDEPENDENT of UI text — this is why `selectByValue` is usually the MOST robust of the three.' } },
  ],
}

const s3 = {
  tr: {
    title: '⚡ Aksiyonlar — Tüm Kullanıcı Eylemleri',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'Selenium\'daki Actions API, Java\'daki Builder pattern\'in tarayıcı eylemleri için uygulamasıdır: tek tek komut göndermek yerine bir dizi hareketi zincire ekleyip tek seferde `.perform()` ile çalıştırırsın — tıpkı StringBuilder\'a append edip sonunda toString() çağırmak gibi. Peki basit element.click() varken neden ayrıca Actions API\'ye ihtiyaç var? Çünkü bazı UI bileşenleri gerçek mouse olaylarına (mouseover, mousedown, mouseup) tepki verir — sadece click event\'ine değil; tooltip\'lerin açılması, drag-and-drop widget\'ları ve context menu\'ler bu kategoridedir. element.click() ise tarayıcıya "tıklamış gibi davran" demek olup eksik mouse event\'lerini tetiklemez. Java\'da Actions actions = new Actions(driver) ile başlattığın zincir Python\'da ActionChains ve TypeScript Playwright\'ta page.mouse olarak karşına çıkar; kavram aynıdır. QA açısından en sık gözden kaçan senaryo şudur: drag-and-drop testi element.click() ile yazıldığında lokal ortamda "çalışıyor" gibi görünür ama staging\'de gerçek JavaScript event listener\'ları devreye girer ve test sessizce yanlış PASS verir.',
      },
      { type: 'heading', text: '1. Temel Aksiyonlar (Click, Type, Clear, Submit)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Temel Aksiyonlar',
        code: `WebDriver driver = new ChromeDriver();
driver.get("https://example.com/login");

WebElement username = driver.findElement(By.id("username"));
WebElement password = driver.findElement(By.id("password"));
WebElement loginBtn  = driver.findElement(By.id("loginBtn"));

// 1. Metin yaz
username.sendKeys("admin");
password.sendKeys("secret123");

// 2. Tıkla
loginBtn.click();

// 3. Metni temizle ve yeniden yaz
username.clear();
username.sendKeys("newuser");

// 4. Form submit (Enter gibi)
username.submit();

// 5. Element metni oku
String text = driver.findElement(By.id("welcome")).getText();
System.out.println(text); // "Hoş geldiniz, admin!"

// 6. Attribute oku
String href = driver.findElement(By.id("homeLink")).getAttribute("href");
System.out.println(href); // "https://example.com/"

// 7. CSS property oku
String color = driver.findElement(By.id("title")).getCssValue("color");

// 8. Element görünür mü?
boolean visible = driver.findElement(By.id("loader")).isDisplayed();
boolean enabled = driver.findElement(By.id("submitBtn")).isEnabled();
boolean selected = driver.findElement(By.id("rememberMe")).isSelected();`,
      },
      seleniumElementStateReadStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Temel Aksiyonlar',
        code: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com/login")

username = driver.find_element(By.ID, "username")
password = driver.find_element(By.ID, "password")
login_btn = driver.find_element(By.ID, "loginBtn")

# Metin yaz
username.send_keys("admin")
password.send_keys("secret123")

# Tıkla
login_btn.click()

# Temizle ve yeniden yaz
username.clear()
username.send_keys("newuser")

# Metin oku
text = driver.find_element(By.ID, "welcome").text
print(text)  # "Hoş geldiniz, admin!"

# Attribute oku
href = driver.find_element(By.ID, "homeLink").get_attribute("href")

# Görünürlük kontrol
visible = driver.find_element(By.ID, "loader").is_displayed()
enabled = driver.find_element(By.ID, "submitBtn").is_enabled()
selected = driver.find_element(By.ID, "rememberMe").is_selected()`,
      },
      seleniumClearResendStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Temel Aksiyonlar',
        code: `import { Builder, Browser, By } from 'selenium-webdriver';

const driver = await new Builder().forBrowser(Browser.CHROME).build();
await driver.get('https://example.com/login');

const username = await driver.findElement(By.id('username'));
const password = await driver.findElement(By.id('password'));
const loginBtn  = await driver.findElement(By.id('loginBtn'));

// Metin yaz & tıkla
await username.sendKeys('admin');
await password.sendKeys('secret123');
await loginBtn.click();

// Temizle & yeniden yaz
await username.clear();
await username.sendKeys('newuser');

// Metin oku
const text = await driver.findElement(By.id('welcome')).then(e => e.getText());
console.log(text);

// Attribute oku
const href = await (await driver.findElement(By.id('homeLink'))).getAttribute('href');

// Görünürlük
const visible = await (await driver.findElement(By.id('loader'))).isDisplayed();
const enabled = await (await driver.findElement(By.id('submitBtn'))).isEnabled();`,
      },
      { type: 'heading', text: '2. Klavye Aksiyonları (Keys)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Klavye Tuşları',
        code: `import org.openqa.selenium.Keys;

WebElement searchBox = driver.findElement(By.id("search"));

// Enter tuşu
searchBox.sendKeys("Selenium", Keys.ENTER);

// Tab tuşu (bir sonraki alana geç)
driver.findElement(By.id("username")).sendKeys("admin", Keys.TAB);

// Ctrl+A (tümünü seç) + Delete
searchBox.sendKeys(Keys.CONTROL + "a");
searchBox.sendKeys(Keys.DELETE);

// Ctrl+C / Ctrl+V
searchBox.sendKeys(Keys.CONTROL + "c"); // Kopyala
driver.findElement(By.id("target")).sendKeys(Keys.CONTROL + "v"); // Yapıştır

// Escape tuşu
driver.findElement(By.id("modal")).sendKeys(Keys.ESCAPE);

// F5 (sayfa yenile)
driver.findElement(By.tagName("body")).sendKeys(Keys.F5);

// Aşağı ok (dropdown için)
driver.findElement(By.id("dropdown")).sendKeys(Keys.ARROW_DOWN);
driver.findElement(By.id("dropdown")).sendKeys(Keys.ARROW_DOWN);
driver.findElement(By.id("dropdown")).sendKeys(Keys.ENTER);`,
      },
      seleniumKeysChordStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Klavye Tuşları',
        code: `from selenium.webdriver.common.keys import Keys

search = driver.find_element(By.ID, "search")

# Enter
search.send_keys("Selenium", Keys.ENTER)

# Tab
driver.find_element(By.ID, "username").send_keys("admin", Keys.TAB)

# Ctrl+A + Delete
search.send_keys(Keys.CONTROL + "a")
search.send_keys(Keys.DELETE)

# Escape
driver.find_element(By.ID, "modal").send_keys(Keys.ESCAPE)`,
      },
      seleniumKeyboardFocusStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Klavye Tuşları',
        code: `import { Key } from 'selenium-webdriver';

const search = await driver.findElement(By.id('search'));

// Enter
await search.sendKeys('Selenium', Key.RETURN);

// Tab
await (await driver.findElement(By.id('username'))).sendKeys('admin', Key.TAB);

// Ctrl+A + Delete
await search.sendKeys(Key.chord(Key.CONTROL, 'a'));
await search.sendKeys(Key.DELETE);`,
      },
      { type: 'heading', text: '3. Actions API — Fare & Gelişmiş Aksiyonlar' },
      {
        type: 'callout', color: 'purple', emoji: '🖱️',
        title: 'Actions API Nedir?',
        content: 'Basit click() ile yapılamayan işlemler için Actions API kullanılır: hover (fare üstüne getirme), sağ tık, çift tık, drag & drop, fare hareketi. Java\'da Actions sınıfı, Python\'da ActionChains, TypeScript\'te actions() kullanılır.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Actions API',
        code: `import org.openqa.selenium.interactions.Actions;

Actions actions = new Actions(driver);

// 1. Hover (Fare üstüne getir)
WebElement menu = driver.findElement(By.id("navMenu"));
actions.moveToElement(menu).perform();

// 2. Çift tıklama
WebElement item = driver.findElement(By.id("editableCell"));
actions.doubleClick(item).perform();

// 3. Sağ tıklama (Context Menu)
WebElement file = driver.findElement(By.id("fileItem"));
actions.contextClick(file).perform();

// 4. Drag & Drop
WebElement source = driver.findElement(By.id("dragSource"));
WebElement target = driver.findElement(By.id("dropTarget"));
actions.dragAndDrop(source, target).perform();

// 5. Koordinat ile sürükle
actions.dragAndDropBy(source, 200, 0).perform(); // 200px sağa

// 6. Zincir (birden fazla aksiyon)
actions.moveToElement(menu)
       .click()
       .sendKeys("metin")
       .build()
       .perform();`,
      },
      seleniumActionsBuilderStep,
      {
        type: 'code', language: 'python',
        label: 'Python — ActionChains',
        code: `from selenium.webdriver.common.action_chains import ActionChains

actions = ActionChains(driver)

# Hover
menu = driver.find_element(By.ID, "navMenu")
actions.move_to_element(menu).perform()

# Çift tıklama
item = driver.find_element(By.ID, "editableCell")
actions.double_click(item).perform()

# Sağ tıklama
file_el = driver.find_element(By.ID, "fileItem")
actions.context_click(file_el).perform()

# Drag & Drop
source = driver.find_element(By.ID, "dragSource")
target = driver.find_element(By.ID, "dropTarget")
actions.drag_and_drop(source, target).perform()

# Zincir
actions.move_to_element(menu) \
       .click() \
       .send_keys("metin") \
       .perform()`,
      },
      seleniumHoverEventStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Actions',
        code: `const actions = driver.actions({ async: true });

const menu = await driver.findElement(By.id('navMenu'));

// Hover
await actions.move({ origin: menu }).perform();

// Çift tıklama
const item = await driver.findElement(By.id('editableCell'));
await actions.doubleClick(item).perform();

// Sağ tıklama
const file = await driver.findElement(By.id('fileItem'));
await actions.contextClick(file).perform();

// Drag & Drop
const source = await driver.findElement(By.id('dragSource'));
const target = await driver.findElement(By.id('dropTarget'));
await actions.dragAndDrop(source, target).perform();`,
      },
      {
        type: 'simulation',
        icon: '🖱️',
        color: '#7c3aed',
        title: { tr: 'Drag & Drop — Canlı Simülasyon', en: 'Drag & Drop — Live Simulation' },
        scenario: 'drag-drop',
        description: {
          tr: '"▶ Sürükle!" butonuna tıkla ve dragstart → drag → dragenter → dragover → drop → dragend event zincirini canlı izle. Sağ panelde DOM olayları ateşleniyor.',
          en: 'Click "▶ Drag!" and watch the dragstart → drag → dragenter → dragover → drop → dragend event chain fire in real time. DOM events light up on the right.',
        },
        code: `// Java — Drag & Drop (Actions API)
import org.openqa.selenium.interactions.Actions;

WebDriver driver  = new ChromeDriver();
Actions   actions = new Actions(driver);

WebElement source = driver.findElement(By.id("dragSource"));
WebElement target = driver.findElement(By.id("dropTarget"));

// Yöntem 1: Direkt dragAndDrop
actions.dragAndDrop(source, target).perform();

// Yöntem 2: Manuel adımlar (bazı siteler için)
actions.clickAndHold(source)     // kaynak üzerinde fareyi bas
       .moveToElement(target)    // hedefe sür
       .release()                // bırak
       .perform();

// Python eşdeğeri:
// ActionChains(driver).drag_and_drop(source, target).perform()`,
        language: 'java',
      },
      seleniumActionsChainFilm,
      { type: 'heading', text: '4. JavaScript Executor' },
      {
        type: 'code', language: 'java',
        label: 'Java — JavascriptExecutor',
        code: `import org.openqa.selenium.JavascriptExecutor;

JavascriptExecutor js = (JavascriptExecutor) driver;

// Sayfayı aşağı kaydır
js.executeScript("window.scrollBy(0, 500);");

// En aşağı git
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

// Element'e kaydır
WebElement el = driver.findElement(By.id("footer"));
js.executeScript("arguments[0].scrollIntoView(true);", el);

// Gizli elemente tıkla (görünür olmayan)
WebElement hidden = driver.findElement(By.id("hiddenBtn"));
js.executeScript("arguments[0].click();", hidden);

// Değer ata (sendKeys çalışmıyorsa)
WebElement input = driver.findElement(By.id("datepicker"));
js.executeScript("arguments[0].value='2024-01-15';", input);

// Sayfa başlığını oku
String title = (String) js.executeScript("return document.title;");`,
      },
      seleniumJsExecutorBypassStep,
      {
        type: 'code', language: 'python',
        label: 'Python — JavaScript Execute',
        code: `# Aşağı kaydır
driver.execute_script("window.scrollBy(0, 500);")

# En aşağı git
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

# Element'e kaydır
el = driver.find_element(By.ID, "footer")
driver.execute_script("arguments[0].scrollIntoView(true);", el)

# Gizli elemente tıkla
hidden = driver.find_element(By.ID, "hiddenBtn")
driver.execute_script("arguments[0].click();", hidden)

# Değer ata
input_el = driver.find_element(By.ID, "datepicker")
driver.execute_script("arguments[0].value='2024-01-15';", input_el)`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — JavaScript Execute',
        code: `// Aşağı kaydır
await driver.executeScript('window.scrollBy(0, 500);');

// En aşağı git
await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');

// Element'e kaydır
const el = await driver.findElement(By.id('footer'));
await driver.executeScript('arguments[0].scrollIntoView(true);', el);

// Gizli eleme tıkla
const hidden = await driver.findElement(By.id('hiddenBtn'));
await driver.executeScript('arguments[0].click();', hidden);`,
      },
      { type: 'heading', text: '5. Select Dropdown (Açılır Liste)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Select Dropdown',
        code: `import org.openqa.selenium.support.ui.Select;

WebElement dropdown = driver.findElement(By.id("country"));
Select select = new Select(dropdown);

// Görünen metin ile seç
select.selectByVisibleText("Türkiye");

// Value attribute ile seç
select.selectByValue("TR");

// Index ile seç (0'dan başlar)
select.selectByIndex(2);

// Seçili option'ı oku
String selected = select.getFirstSelectedOption().getText();
System.out.println("Seçili: " + selected);

// Tüm seçenekleri listele
List<WebElement> options = select.getOptions();
for (WebElement opt : options) {
    System.out.println(opt.getText());
}

// Çoklu seçim (multiple select için)
select.selectByVisibleText("İstanbul");
select.selectByVisibleText("Ankara");`,
      },
      seleniumSelectDropdownStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Select Dropdown',
        code: `from selenium.webdriver.support.ui import Select

dropdown = driver.find_element(By.ID, "country")
select = Select(dropdown)

# Metin ile seç
select.select_by_visible_text("Türkiye")

# Value ile seç
select.select_by_value("TR")

# Index ile seç
select.select_by_index(2)

# Seçili option
selected = select.first_selected_option.text
print(f"Seçili: {selected}")

# Tüm seçenekler
for opt in select.options:
    print(opt.text)`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Select Dropdown',
        code: `// TypeScript'te Select helper yok; JS kullanırız
const dropdown = await driver.findElement(By.id('country'));

// Value ile seç
await dropdown.sendKeys('Türkiye');

// Veya JS ile
await driver.executeScript(
  "arguments[0].value = arguments[1];",
  dropdown, "TR"
);

// Tüm options
const options = await driver.findElements(By.css('#country option'));
for (const opt of options) {
  console.log(await opt.getText());
}`,
      },
      { type: 'heading', text: '6. Tarayıcı Navigasyonu' },
      {
        type: 'code', language: 'java',
        label: 'Java — Navigasyon',
        code: `// URL'ye git
driver.get("https://example.com");
driver.navigate().to("https://example.com/login");

// Geri & İleri
driver.navigate().back();
driver.navigate().forward();

// Sayfayı yenile
driver.navigate().refresh();

// Pencereyi büyüt/küçüt
driver.manage().window().maximize();
driver.manage().window().minimize();
driver.manage().window().fullscreen();

// Özel boyut
driver.manage().window().setSize(new Dimension(1280, 800));

// Başlık & URL
System.out.println(driver.getTitle());
System.out.println(driver.getCurrentUrl());

// Sayfa kaynağı
String source = driver.getPageSource();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Navigasyon',
        code: `# URL'ye git
driver.get("https://example.com")

# Geri & İleri
driver.back()
driver.forward()

# Yenile
driver.refresh()

# Tam ekran
driver.maximize_window()
driver.minimize_window()

# Özel boyut
driver.set_window_size(1280, 800)

# Başlık & URL
print(driver.title)
print(driver.current_url)`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Navigasyon',
        code: `await driver.get('https://example.com');
await driver.navigate().back();
await driver.navigate().forward();
await driver.navigate().refresh();

await driver.manage().window().maximize();
await driver.manage().window().setSize(1280, 800);

console.log(await driver.getTitle());
console.log(await driver.getCurrentUrl());`,
      },
      { type: 'heading', text: '7. Screenshot Alma' },
      {
        type: 'code', language: 'java',
        label: 'Java — Screenshot',
        code: `import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import java.io.File;
import org.apache.commons.io.FileUtils;

// Tam sayfa ekran görüntüsü
File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(screenshot, new File("screenshot.png"));

// Element screenshot
WebElement element = driver.findElement(By.id("chart"));
File elemShot = element.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(elemShot, new File("element.png"));

// Base64 olarak (CI/CD için)
String base64 = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Screenshot',
        code: `# Tam sayfa
driver.save_screenshot("screenshot.png")

# Ya da:
from selenium.webdriver.common.by import By
screenshot = driver.get_screenshot_as_file("screenshot.png")

# Element screenshot
element = driver.find_element(By.ID, "chart")
element.screenshot("element.png")

# Base64
base64_str = driver.get_screenshot_as_base64()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Screenshot',
        code: `import * as fs from 'fs';

// Base64'ten dosyaya kaydet
const img = await driver.takeScreenshot();
fs.writeFileSync('screenshot.png', img, 'base64');

// Element screenshot
const element = await driver.findElement(By.id('chart'));
const elemImg = await element.takeScreenshot();
fs.writeFileSync('element.png', elemImg, 'base64');`,
      },
      {
        type: 'quiz',
        question: { tr: 'Bir sayfa üzerinde hover (fare üstüne getirme) işlemi için hangi sınıf kullanılır (Java)?', en: 'Which class is used for hover (mouse over) operations in Java Selenium?' },
        options: [
          { id: 'a', text: 'WebElement.hover()' },
          { id: 'b', text: 'Actions (org.openqa.selenium.interactions.Actions)' },
          { id: 'c', text: 'JavascriptExecutor' },
          { id: 'd', text: { tr: 'Select sınıfı', en: 'Select class' } },
        ],
        correct: 'b',
        explanation: { tr: 'Hover için Actions sınıfı kullanılır: new Actions(driver).moveToElement(element).perform(). Python\'da ActionChains, TypeScript\'te driver.actions() kullanılır. WebElement\'in doğrudan hover() metodu yoktur.', en: 'The Actions class is used for hover: new Actions(driver).moveToElement(element).perform(). Python uses ActionChains, TypeScript uses driver.actions(). WebElement has no direct hover() method.' },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium Java'da belirli bir elementin üzerine fare imlecini getirmek (mouse hover) için kullanılan etkileşim sınıfı hangisidir?",
            "en": "Which interaction class is used in Selenium Java to move the mouse cursor over a specific element (mouse hover)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "InteractionManager"
            },
            {
                  "id": "b",
                  "text": "Actions"
            },
            {
                  "id": "c",
                  "text": "MouseController"
            },
            {
                  "id": "d",
                  "text": "Robot class"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Fare hareketleri gibi karmaşık etkileşimler için Actions sınıfı kullanılır. 'moveToElement()' metodu, fareyi elementin üzerine getirmek için kullanılır ve 'perform()' ile işlem yürütülür.",
            "en": "The Actions class is used for complex interactions like mouse movements. The 'moveToElement()' method is used to hover over an element, and 'perform()' is called to execute the sequence."
      }
}
},
    ],
  },
  en: {
    title: '⚡ Actions — All User Interactions',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'Selenium\'s Actions API is the Builder pattern applied to browser gestures: instead of sending commands one by one, you chain moves together and dispatch the whole sequence with a single .perform() — just like appending to a Java StringBuilder and calling toString() at the end. But if element.click() already exists, why does a separate Actions API need to exist? Because certain UI components react to the full chain of real mouse events (mouseover, mousedown, mouseup), not just the click event — tooltips, drag-and-drop widgets, and context menus all fall into this category. element.click() tells the browser to simulate a click but skips intermediate events that those components rely on. In Java you start with new Actions(driver); in Python it is ActionChains; in TypeScript/Playwright it is page.mouse — same concept, different syntax. The QA trap to watch for: a drag-and-drop test written with element.click() appears to "work" locally, but in staging the real JavaScript event listeners kick in and the test returns a silent false PASS — no failure, no exception, just wrong results shipped to production.',
      },
      { type: 'heading', text: '1. Basic Actions (Click, Type, Clear, Submit)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Basic Actions',
        code: `WebElement username = driver.findElement(By.id("username"));
username.sendKeys("admin");        // Type
username.clear();                  // Clear
username.submit();                 // Submit form

String text = driver.findElement(By.id("msg")).getText();
String attr = driver.findElement(By.id("link")).getAttribute("href");
boolean visible = username.isDisplayed();
boolean enabled = username.isEnabled();`,
      },
      seleniumElementStateReadStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Basic Actions',
        code: `username = driver.find_element(By.ID, "username")
username.send_keys("admin")    # Type
username.clear()               # Clear
username.submit()              # Submit

text = driver.find_element(By.ID, "msg").text
attr = driver.find_element(By.ID, "link").get_attribute("href")
visible = username.is_displayed()`,
      },
      seleniumClearResendStep,
      { type: 'heading', text: '2. Keyboard Actions (Keys)' },
      {
        type: 'code', language: 'java',
        label: 'Java — Keyboard Keys',
        code: `import org.openqa.selenium.Keys;
searchBox.sendKeys("Selenium", Keys.ENTER);
driver.findElement(By.id("user")).sendKeys("admin", Keys.TAB);
searchBox.sendKeys(Keys.CONTROL + "a");  // Select all
searchBox.sendKeys(Keys.DELETE);          // Delete`,
      },
      seleniumKeysChordStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Keyboard Keys',
        code: `from selenium.webdriver.common.keys import Keys
search.send_keys("Selenium", Keys.ENTER)
driver.find_element(By.ID, "user").send_keys("admin", Keys.TAB)
search.send_keys(Keys.CONTROL + "a")
search.send_keys(Keys.DELETE)`,
      },
      seleniumKeyboardFocusStep,
      { type: 'heading', text: '3. Actions API — Mouse & Advanced' },
      {
        type: 'code', language: 'java',
        label: 'Java — Actions API',
        code: `Actions actions = new Actions(driver);
actions.moveToElement(menu).perform();           // Hover
actions.doubleClick(item).perform();             // Double click
actions.contextClick(file).perform();            // Right click
actions.dragAndDrop(source, target).perform();   // Drag & Drop
actions.dragAndDropBy(source, 200, 0).perform(); // Drag by offset`,
      },
      seleniumActionsBuilderStep,
      {
        type: 'code', language: 'python',
        label: 'Python — ActionChains',
        code: `from selenium.webdriver.common.action_chains import ActionChains
actions = ActionChains(driver)
actions.move_to_element(menu).perform()         # Hover
actions.double_click(item).perform()            # Double click
actions.context_click(file_el).perform()        # Right click
actions.drag_and_drop(source, target).perform() # Drag & Drop`,
      },
      seleniumHoverEventStep,
      seleniumActionsChainFilm,
      { type: 'heading', text: '4. JavaScript Executor' },
      {
        type: 'code', language: 'java',
        label: 'Java — JavascriptExecutor',
        code: `JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("window.scrollBy(0, 500);");
js.executeScript("arguments[0].scrollIntoView(true);", element);
js.executeScript("arguments[0].click();", hiddenElement);
js.executeScript("arguments[0].value='2024-01-15';", dateInput);`,
      },
      seleniumJsExecutorBypassStep,
      {
        type: 'code', language: 'python',
        label: 'Python — execute_script',
        code: `driver.execute_script("window.scrollBy(0, 500);")
driver.execute_script("arguments[0].scrollIntoView(true);", el)
driver.execute_script("arguments[0].click();", hidden)`,
      },
      { type: 'heading', text: '5. Select Dropdown' },
      {
        type: 'code', language: 'java',
        label: 'Java — Select',
        code: `Select select = new Select(driver.findElement(By.id("country")));
select.selectByVisibleText("Turkey");
select.selectByValue("TR");
select.selectByIndex(2);
String selected = select.getFirstSelectedOption().getText();`,
      },
      seleniumSelectDropdownStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Select',
        code: `from selenium.webdriver.support.ui import Select
select = Select(driver.find_element(By.ID, "country"))
select.select_by_visible_text("Turkey")
select.select_by_value("TR")
select.select_by_index(2)`,
      },
      {
        type: 'quiz',
        question: { tr: 'Bir sayfa üzerinde hover (fare üstüne getirme) işlemi için hangi sınıf kullanılır (Java)?', en: 'Which class is used for hover (mouse over) operations in Java Selenium?' },
        options: [
          { id: 'a', text: 'WebElement.hover()' },
          { id: 'b', text: 'Actions (org.openqa.selenium.interactions.Actions)' },
          { id: 'c', text: 'JavascriptExecutor' },
          { id: 'd', text: { tr: 'Select sınıfı', en: 'Select class' } },
        ],
        correct: 'b',
        explanation: { tr: 'Hover için Actions sınıfı kullanılır: new Actions(driver).moveToElement(element).perform(). Python\'da ActionChains, TypeScript\'te driver.actions() kullanılır. WebElement\'in doğrudan hover() metodu yoktur.', en: 'The Actions class is used for hover: new Actions(driver).moveToElement(element).perform(). Python uses ActionChains, TypeScript uses driver.actions(). WebElement has no direct hover() method.' },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium Java'da belirli bir elementin üzerine fare imlecini getirmek (mouse hover) için kullanılan etkileşim sınıfı hangisidir?",
            "en": "Which interaction class is used in Selenium Java to move the mouse cursor over a specific element (mouse hover)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "InteractionManager"
            },
            {
                  "id": "b",
                  "text": "Actions"
            },
            {
                  "id": "c",
                  "text": "MouseController"
            },
            {
                  "id": "d",
                  "text": "Robot class"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Fare hareketleri gibi karmaşık etkileşimler için Actions sınıfı kullanılır. 'moveToElement()' metodu, fareyi elementin üzerine getirmek için kullanılır ve 'perform()' ile işlem yürütülür.",
            "en": "The Actions class is used for complex interactions like mouse movements. The 'moveToElement()' method is used to hover over an element, and 'perform()' is called to execute the sequence."
      }
}
},
    ],
  },
}

// ─── S4: WAIT STRATEJİLERİ ────────────────────────────────────────────────────
// ⏳ Implicit Wait — polling mekanizması
const seleniumImplicitWaitPollingStep = {
  type: 'step-animation',
  id: 'selenium-wait-implicit-polling-step-01',
  title: { tr: 'Adım Adım: implicitlyWait(10) Arka Planda Ne Yapar?', en: 'Step by Step: What implicitlyWait(10) Does Behind the Scenes' },
  steps: [
    { id: 1, icon: '⏱️', label: { tr: 'findElement HEMEN denenir', en: 'findElement is tried IMMEDIATELY' }, detail: { tr: '`driver.findElement(By.id("submitBtn"))` çağrıldığı an, Selenium önce elementi HİÇ beklemeden bulmayı dener.', en: 'The moment `driver.findElement(By.id("submitBtn"))` is called, Selenium first tries to find the element WITHOUT waiting at all.' } },
    { id: 2, icon: '🔁', label: { tr: 'Bulunamazsa POLLING başlar', en: 'If not found, POLLING begins' }, detail: { tr: 'Element yoksa Selenium belirli aralıklarla (varsayılan ~500ms) TEKRAR dener — bu, sabit bir `Thread.sleep(10000)` DEĞİLDİR.', en: 'If missing, Selenium RETRIES at fixed intervals (default ~500ms) — this is NOT the same as a fixed `Thread.sleep(10000)`.' } },
    { id: 3, icon: '✅', label: { tr: 'Element bulununca HEMEN durur', en: 'It stops IMMEDIATELY once found' }, detail: { tr: 'Element 2. saniyede DOM\'a girerse, polling o anda durur ve kod devam eder — kalan 8 saniye BOŞA harcanmaz.', en: 'If the element enters the DOM at second 2, polling stops right there and code continues — the remaining 8 seconds are NOT wasted.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Global etki riski', en: 'The global-effect risk' }, detail: { tr: 'Bu ayar TÜM sonraki `findElement` çağrılarına uygulanır — element GERÇEKTEN yoksa (yazım hatası), test her seferinde 10 saniye BEKLEYİP sonra hata verir.', en: 'This setting applies to EVERY subsequent `findElement` call — if the element truly does not exist (a typo), the test WAITS the full 10 seconds every time before failing.' } },
  ],
}

// ⏳ Explicit Wait — ExpectedConditions poll döngüsü
const seleniumExplicitConditionStep = {
  type: 'step-animation',
  id: 'selenium-wait-explicit-condition-step-01',
  title: { tr: 'Adım Adım: wait.until() Bir Koşulu Nasıl Bekler?', en: 'Step by Step: How wait.until() Waits for a Condition' },
  steps: [
    { id: 1, icon: '🎯', label: { tr: 'Koşul bir FONKSİYONDUR', en: 'The condition IS a function' }, detail: { tr: '`ExpectedConditions.visibilityOfElementLocated(...)`, çağrıldığı an DEĞİL, `wait.until()` içinde TEKRAR TEKRAR çalıştırılacak bir fonksiyon döndürür.', en: '`ExpectedConditions.visibilityOfElementLocated(...)` returns a function to be run REPEATEDLY inside `wait.until()` — it is not evaluated once at the call site.' } },
    { id: 2, icon: '🔁', label: { tr: 'Fonksiyon periyodik OLARAK çağrılır', en: 'The function is called PERIODICALLY' }, detail: { tr: '`wait.until()`, bu fonksiyonu belirli aralıklarla çağırır ve TRUE/element dönene kadar BEKLER — her denemede eski `StaleElementReferenceException` gibi hataları YUTAR.', en: '`wait.until()` calls this function at intervals and WAITS until it returns TRUE/an element — it SWALLOWS transient errors like `StaleElementReferenceException` between tries.' } },
    { id: 3, icon: '⏰', label: { tr: 'Timeout aşılırsa TimeoutException', en: 'Exceeding the timeout throws TimeoutException' }, detail: { tr: 'Koşul belirtilen sürede (örn. 15sn) hiç TRUE dönmezse, `wait.until()` net bir `TimeoutException` fırlatır — bu, Thread.sleep\'in ASLA vermeyeceği bir teşhis bilgisidir.', en: 'If the condition never returns TRUE within the given time (e.g. 15s), `wait.until()` throws a clear `TimeoutException` — diagnostic information a `Thread.sleep` would NEVER give you.' } },
    { id: 4, icon: '🎯', label: { tr: 'Her koşul FARKLI bir şey ölçer', en: 'Each condition measures something DIFFERENT' }, detail: { tr: '`visibilityOfElementLocated` görünürlüğü, `elementToBeClickable` hem görünürlüğü hem etkileşimi, `presenceOfElementLocated` sadece DOM\'da VAR olmayı ölçer — yanlış koşulu seçmek yanlış hatayı gizler.', en: '`visibilityOfElementLocated` measures visibility, `elementToBeClickable` measures both visibility and interactivity, `presenceOfElementLocated` measures only DOM EXISTENCE — picking the wrong condition hides the wrong kind of bug.' } },
  ],
}

// ⏳ Implicit + Explicit karıştırma riski
const seleniumMixedWaitConflictStep = {
  type: 'step-animation',
  id: 'selenium-wait-mixed-conflict-step-01',
  title: { tr: 'Adım Adım: Implicit + Explicit Wait Birlikte Kullanılınca Ne Olur?', en: 'Step by Step: What Happens When Implicit and Explicit Wait Mix' },
  steps: [
    { id: 1, icon: '🧩', label: { tr: 'Aynı driver\'da ikisi de AKTİF olabilir', en: 'Both can be ACTIVE on the same driver' }, detail: { tr: 'Bir projede hem `implicitlyWait(10)` hem de `WebDriverWait(driver, 15)` aynı anda tanımlanmış olabilir — Selenium bunu ENGELLEMEZ.', en: 'A project can define both `implicitlyWait(10)` and `WebDriverWait(driver, 15)` at the same time — Selenium does NOT prevent this.' } },
    { id: 2, icon: '⏳', label: { tr: 'Element BULUNAMAZSA süreler TOPLANIR', en: 'Wait times can COMPOUND when the element is missing' }, detail: { tr: 'ExpectedConditions içindeki bir `findElement` çağrısı implicit wait\'in 10 saniyesini de BEKLER, sonra explicit wait kendi 15 saniyesini SAYMAYA başlar.', en: 'A `findElement` call inside an ExpectedConditions check also waits the implicit wait\'s 10 seconds, THEN the explicit wait starts counting ITS OWN 15 seconds.' } },
    { id: 3, icon: '🐌', label: { tr: 'Sonuç: beklenmedik 25 saniyelik bekleme', en: 'Result: an unexpected 25-second wait' }, detail: { tr: 'Element GERÇEKTEN yoksa, test 15 değil, 10+15=25 saniye sonra hata verir — bu, hata ayıklaması en zor zaman aşımı senaryolarından biridir.', en: 'If the element truly does not exist, the test fails not after 15 but after 10+15=25 seconds — one of the hardest timeout scenarios to debug.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Resmi tavsiye: SADECE birini kullan', en: 'Official guidance: use ONLY one' }, detail: { tr: 'Selenium resmi dokümantasyonu implicit ve explicit wait\'i AYNI test projesinde karıştırmamayı önerir — production kodda ya SADECE explicit wait ya da SADECE implicit wait tercih edilmelidir.', en: 'Selenium\'s official docs recommend NEVER mixing implicit and explicit waits in the same test project — production code should use EITHER explicit wait ONLY or implicit wait ONLY.' } },
  ],
}

const s4 = {
  tr: {
    title: '⏳ Wait Stratejileri — Bekleme Yöntemleri',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'Wait stratejisi, Java\'da CompletableFuture üzerinde bloklu get(timeout, SECONDS) çağrısına benzer — ama hangi koşulu beklediğini sen belirlersin. Thread.sleep(3000) ise tarihlenmiş bir Thread.sleep() kullanmak gibi: asıl sonuç 0.5 saniyede gelse de 3 saniye bekler; ya da 3 saniyede gelmezse yine hata verir. Peki ImplicitWait var zaten, neden ExplicitWait de kullanalım? Çünkü ImplicitWait tüm findElement çağrıları için tek bir timeout uygular — ama sayfadaki farklı elementlerin farklı hazır olma süreleri vardır; bir butonu 2 saniyede, bir API tablosunu 8 saniyede beklemek zorundasın. ExplicitWait + ExpectedConditions, her beklemeyi bir koşula (elementToBeClickable, visibilityOfElementLocated, textToBePresentInElement) bağlar; hem gereksiz bekleme süresini hem de premature exception\'ı önler. QA için en tehlikeli seçenek Thread.sleep()\'in CI pipeline\'ına girmesidir: 50 test × ortalama 2 saniyelik sleep = 100 saniye saf israf, üstelik ağ gecikmesi arttığında hâlâ race condition\'a düşürsün ve flaky test alırsın.',
      },
      { type: 'heading', text: 'Wait Türleri Karşılaştırma' },
      {
        type: 'table',
        headers: ['Tür', 'Nasıl Çalışır?', 'Ne Zaman Kullanılır?', 'Tavsiye'],
        rows: [
          ['Thread.sleep()', 'Sabit süre bekler', 'Hiçbir zaman!', '❌ KULLANMA'],
          ['Implicit Wait', 'Tüm findElement için global timeout', 'Basit projelerde geçici çözüm', '⚠️ Dikkatli kullan'],
          ['Explicit Wait', 'Belirli bir koşul sağlanana kadar bekler', 'Production testlerinde', '✅ EN İYİ YOL'],
          ['Fluent Wait', 'Explicit wait + polling interval + ignore exceptions', 'Karmaşık async senaryolarda', '✅ İleri seviye'],
        ],
      },
      {
        type: 'animated-timeline',
        title: { tr: 'Wait Türleri — Zaman Çizelgesi Animasyonu', en: 'Wait Types — Animated Timeline' },
        description: {
          tr: '▶ Oynat\'a bas: üç farklı wait stratejisinin aynı koşulda (element DOM\'a giriyor) ne kadar farklı süre harcadığını canlı gör. Barlar gerçek zamanlama oranıyla dolar.',
          en: '▶ Press Play: watch how three wait strategies perform under the same condition (element entering DOM). Bars fill proportionally to real durations.',
        },
        tracks: [
          {
            label: 'Thread.sleep(5s)',
            labelEn: 'Thread.sleep(5s)',
            duration: 5000,
            color: '#ef4444',
            badge: { tr: '❌ Her zaman 5s bekler — element 1.8s\'de hazır olsa bile', en: '❌ Always waits 5s — even if element is ready at 1.8s' },
            detail: { tr: 'Sabit, koşulsuz bekleme. Test süresini gereksiz uzatır.', en: 'Fixed, unconditional sleep. Bloats test suite time.' },
          },
          {
            label: 'Implicit Wait (max 10s)',
            labelEn: 'Implicit Wait (max 10s)',
            duration: 2300,
            color: '#f59e0b',
            badge: { tr: '⚠️ ~2.3s — element gelince durur ama tüm findElement\'leri etkiler', en: '⚠️ ~2.3s — stops when element arrives, but affects every findElement' },
            detail: { tr: 'Global timeout. Başka elementler için yavaşlatıcı olabilir.', en: 'Global timeout. Can slow down unrelated lookups.' },
          },
          {
            label: 'Explicit Wait (visibility koşulu)',
            labelEn: 'Explicit Wait (visibility condition)',
            duration: 1800,
            color: '#10b981',
            badge: { tr: '✅ ~1.8s — tam koşul sağlanınca durur, sadece bu element için', en: '✅ ~1.8s — stops exactly when condition met, scoped to this element' },
            detail: { tr: 'En verimli yöntem. Sadece ihtiyaç duyulan noktada bekler.', en: 'Most efficient. Waits only where needed.' },
          },
        ],
      },
      {
        type: 'simulation',
        icon: '⏳',
        color: '#7c3aed',
        title: { tr: 'Implicit Wait — Canlı Demo', en: 'Implicit Wait — Live Demo' },
        scenario: 'implicit-wait',
        description: {
          tr: 'Sol tarafta "Element Bul" butonlarına tıklayarak Implicit Wait\'in etkisini canlı görün. Sağda zaman çizelgesi gerçek zamanlı güncellenir.',
          en: 'Click the "Find Element" buttons on the left to see Implicit Wait in action. The timeline on the right updates in real time.',
        },
        code: `// Java — Implicit Wait kurulumu
WebDriver driver = new ChromeDriver();

// Bir kez ayarla, tüm findElement için geçerli
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

driver.get("https://example.com");

// Bu satır, element yoksa 10sn ye kadar bekler; sonra hata verir
WebElement btn = driver.findElement(By.id("submitBtn")); // 0-10s bekler
btn.click();

// Python eşdeğeri:
// driver.implicitly_wait(10)
// driver.find_element(By.ID, "submitBtn")`,
        language: 'java',
      },
      {
        type: 'simulation',
        icon: '✅',
        color: '#059669',
        title: { tr: 'Explicit Wait — WebDriverWait Simülasyonu', en: 'Explicit Wait — WebDriverWait Simulation' },
        scenario: 'explicit-wait',
        description: {
          tr: '"Veriyi Yükle" butonuna tıkla → Spinner görünür → WebDriverWait element\'i bekler → #result DOM\'a gelir → Test devam eder. Sağda DOM ağacı canlı değişir.',
          en: 'Click "Load Data" → Spinner appears → WebDriverWait polls for element → #result enters DOM → Test continues. Watch the DOM tree update on the right.',
        },
        code: `// Java — Explicit Wait (En İyi Yöntem)
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Butona tıkla → API isteği gönderilir
driver.findElement(By.id("load-btn")).click();

// Sadece #result görünür olana kadar bekle (max 10s)
WebElement result = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("result"))
);

// Python eşdeğeri:
// wait = WebDriverWait(driver, 10)
// result = wait.until(EC.visibility_of_element_located((By.ID, "result")))

System.out.println("Ürün: " + result.getText());`,
        language: 'java',
      },
      { type: 'heading', text: '1. Implicit Wait — Global Bekleme' },
      {
        type: 'code', language: 'java',
        label: 'Java — Implicit Wait',
        code: `import java.time.Duration;

WebDriver driver = new ChromeDriver();

// Tüm findElement çağrıları için max 10 saniye bekle
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

driver.get("https://example.com");

// Bu findElement, element yoksa 10sn bekleyecek
WebElement btn = driver.findElement(By.id("submitBtn"));
btn.click();`,
      },
      seleniumImplicitWaitPollingStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Implicit Wait',
        code: `from selenium import webdriver

driver = webdriver.Chrome()

# Tüm find_element için max 10 saniye bekle
driver.implicitly_wait(10)

driver.get("https://example.com")
btn = driver.find_element(By.ID, "submitBtn")  # max 10sn bekler
btn.click()`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Implicit Wait',
        code: `import { until } from 'selenium-webdriver';

// Implicit wait
await driver.manage().setTimeouts({ implicit: 10000 }); // ms

const btn = await driver.findElement(By.id('submitBtn'));
await btn.click();`,
      },
      { type: 'heading', text: '2. Explicit Wait — En İyi Yöntem' },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Explicit Wait — Best Practice',
        content: 'Explicit Wait, belirli bir koşul gerçekleşene kadar bekler. WebDriverWait + ExpectedConditions kombinasyonu kullanılır. Implicit Wait\'ten üstündür çünkü her element için farklı süre ve koşul tanımlayabilirsiniz.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Explicit Wait (WebDriverWait)',
        code: `import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// 1. Element görünür olana kadar bekle
WebElement btn = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("submitBtn"))
);
btn.click();

// 2. Element tıklanabilir olana kadar bekle (en yaygın!)
WebElement link = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("homeLink"))
);
link.click();

// 3. Element DOM'da var olana kadar bekle
WebElement loader = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("loader"))
);

// 4. Element kaybolana kadar bekle
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("spinner")));

// 5. Metin içerene kadar bekle
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Başarılı"
));

// 6. URL değişene kadar bekle
wait.until(ExpectedConditions.urlContains("/dashboard"));

// 7. Başlık değişene kadar bekle
wait.until(ExpectedConditions.titleContains("Dashboard"));

// 8. Alert çıkana kadar bekle
wait.until(ExpectedConditions.alertIsPresent());`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Explicit Wait',
        code: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

wait = WebDriverWait(driver, 15)  # max 15 saniye

# Element görünür olana kadar bekle
btn = wait.until(EC.visibility_of_element_located((By.ID, "submitBtn")))
btn.click()

# Element tıklanabilir olana kadar bekle
link = wait.until(EC.element_to_be_clickable((By.ID, "homeLink")))
link.click()

# Element kaybolana kadar bekle
wait.until(EC.invisibility_of_element_located((By.ID, "spinner")))

# Metin içerene kadar bekle
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Başarılı"))

# URL değişene kadar bekle
wait.until(EC.url_contains("/dashboard"))

# Alert çıkana kadar bekle
wait.until(EC.alert_is_present())`,
      },
      seleniumExplicitConditionStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Explicit Wait',
        code: `import { until, By } from 'selenium-webdriver';

// Element görünür olana kadar bekle
const btn = await driver.wait(
  until.elementIsVisible(await driver.findElement(By.id('submitBtn'))),
  15000 // 15 saniye
);
await btn.click();

// Element tıklanabilir olana kadar bekle
const link = await driver.wait(
  until.elementIsEnabled(await driver.findElement(By.id('homeLink'))),
  15000
);
await link.click();

// URL değişene kadar bekle
await driver.wait(until.urlContains('/dashboard'), 15000);

// Başlık değişene kadar bekle
await driver.wait(until.titleContains('Dashboard'), 15000);`,
      },
      seleniumMixedWaitConflictStep,
      { type: 'heading', text: '3. Fluent Wait — İleri Seviye' },
      {
        type: 'code', language: 'java',
        label: 'Java — Fluent Wait',
        code: `import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.NoSuchElementException;
import java.util.function.Function;

FluentWait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))     // Maksimum bekleme
    .pollingEvery(Duration.ofMillis(500))     // Her 500ms kontrol et
    .ignoring(NoSuchElementException.class); // Bu hatayı ignore et

WebElement element = fluentWait.until(
    driver -> driver.findElement(By.id("dynamicElement"))
);

// Lambda ile özel koşul
boolean result = fluentWait.until(driver -> {
    String text = driver.findElement(By.id("status")).getText();
    return text.equals("Yüklendi");
});`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — WebDriverWait (Fluent benzeri)',
        code: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException

# Polling interval ve ignore ile
wait = WebDriverWait(
    driver,
    timeout=30,
    poll_frequency=0.5,  # Her 500ms kontrol et
    ignored_exceptions=[NoSuchElementException, StaleElementReferenceException]
)

element = wait.until(
    EC.presence_of_element_located((By.ID, "dynamicElement"))
)

# Lambda ile özel koşul
result = wait.until(
    lambda d: d.find_element(By.ID, "status").text == "Yüklendi"
)`,
      },
      {
        type: 'callout', color: 'red', emoji: '❌',
        title: 'Thread.sleep() Kullanma!',
        content: 'Thread.sleep(3000) veya time.sleep(3) GİBİ sabit beklemeler KULLANMA. Neden? 1) Test yavaşlar — eleman 0.5sn\'de hazır olsa bile 3sn bekleriz. 2) Güvenilmez — eleman 3sn\'de hazır olmazsa yine hata alırız. Bunun yerine her zaman Explicit Wait kullan.',
      },
      seleniumWaitReflexFilm,
      {
        type: 'quiz',
        question: { tr: 'Selenium\'da bir spinner (yükleniyor ikonu) kaybolana kadar beklemek için hangi ExpectedCondition kullanılır?', en: 'Which ExpectedCondition is used to wait for a spinner to disappear in Selenium?' },
        options: [
          { id: 'a', text: 'EC.visibilityOfElementLocated()' },
          { id: 'b', text: 'EC.presenceOfElementLocated()' },
          { id: 'c', text: 'EC.invisibilityOfElementLocated()' },
          { id: 'd', text: 'EC.elementToBeClickable()' },
        ],
        correct: 'c',
        explanation: { tr: 'EC.invisibilityOfElementLocated() veya Python\'da EC.invisibility_of_element_located() — element DOM\'dan kaybolana veya gizlenene kadar bekler. Yükleme animasyonlarının bitmesini beklemek için idealdir.', en: 'EC.invisibilityOfElementLocated() (Java) or EC.invisibility_of_element_located() (Python) waits until the element is no longer visible or no longer present in the DOM. Perfect for waiting for loading spinners to disappear.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir web sayfasında işlemin tamamlandığını gösteren 'loading' katmanının DOM'dan tamamen kalkmasını beklemek için hangi WebDriverWait koşulu kullanılmalıdır?",
            "en": "Which WebDriverWait condition should be used to wait for a 'loading' overlay to be completely removed from the DOM in a web page?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "ExpectedConditions.attributeToBeNotEmpty()"
            },
            {
                  "id": "b",
                  "text": "ExpectedConditions.invisibilityOfElementLocated()"
            },
            {
                  "id": "c",
                  "text": "ExpectedConditions.elementToBeSelected()"
            },
            {
                  "id": "d",
                  "text": "ExpectedConditions.frameToBeAvailableAndSwitchToIt()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "ExpectedConditions.invisibilityOfElementLocated(), belirtilen lokatörün artık görünür olmadığında veya DOM'da bulunmadığında true döner. Bu, yükleme ekranları veya spinnerlar için en uygun yöntemdir.",
            "en": "ExpectedConditions.invisibilityOfElementLocated() returns true when the element located by the locator is no longer visible or present in the DOM. This is the most suitable method for handling loading screens or spinners."
      }
}
},
    ],
  },
  en: {
    title: '⏳ Wait Strategies — Handling Timing Issues',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'A wait strategy in Selenium maps directly to a blocking get(timeout, SECONDS) on a Java CompletableFuture — except you define the condition you are waiting for, not just a duration. Thread.sleep(3000) is the equivalent of an outdated busy-wait loop: if the result arrives in 0.5 s you still block for 3 s; if the result takes 3.5 s you still throw an error. So if ImplicitWait already exists and handles every findElement, why is ExplicitWait also needed? Because different elements on the same page become ready at different times: a button may appear in 2 s while an API-driven table takes 8 s; a single global timeout cannot satisfy both. ExplicitWait + ExpectedConditions ties each wait to a semantic condition (elementToBeClickable, visibilityOfElementLocated, textToBePresentInElement) that eliminates both unnecessary wait time and premature exceptions. The QA danger is letting Thread.sleep() slip into a CI pipeline: 50 tests × an average 2-second sleep = 100 seconds of pure waste, and when network latency spikes in a shared environment you still get a race condition and a flaky test — the worst outcome because it neither reliably passes nor reliably fails.',
      },
      { type: 'heading', text: 'Wait Types Comparison' },
      {
        type: 'table',
        headers: ['Type', 'How It Works', 'When to Use', 'Recommendation'],
        rows: [
          ['Thread.sleep()', 'Fixed time wait', 'Never!', '❌ AVOID'],
          ['Implicit Wait', 'Global timeout for all findElements', 'Simple projects only', '⚠️ Use carefully'],
          ['Explicit Wait', 'Waits for a specific condition', 'In all production tests', '✅ BEST PRACTICE'],
          ['Fluent Wait', 'Explicit + polling interval + ignore exceptions', 'Complex async scenarios', '✅ Advanced'],
        ],
      },
      {
        type: 'animated-timeline',
        title: { tr: 'Wait Türleri — Zaman Çizelgesi Animasyonu', en: 'Wait Types — Animated Timeline' },
        description: {
          tr: '▶ Oynat\'a bas: üç farklı wait stratejisinin aynı koşulda ne kadar farklı süre harcadığını canlı gör.',
          en: '▶ Press Play: watch how three wait strategies perform under the same condition (element entering DOM). Bars fill proportionally to real durations.',
        },
        tracks: [
          {
            label: 'Thread.sleep(5s)',
            labelEn: 'Thread.sleep(5s)',
            duration: 5000,
            color: '#ef4444',
            badge: { tr: '❌ Her zaman 5s bekler', en: '❌ Always waits 5s — even if element is ready at 1.8s' },
            detail: { tr: 'Sabit, koşulsuz bekleme.', en: 'Fixed, unconditional sleep. Bloats test suite time.' },
          },
          {
            label: 'Implicit Wait (max 10s)',
            labelEn: 'Implicit Wait (max 10s)',
            duration: 2300,
            color: '#f59e0b',
            badge: { tr: '⚠️ ~2.3s — element gelince durur', en: '⚠️ ~2.3s — stops when element arrives, but affects every findElement' },
            detail: { tr: 'Global timeout.', en: 'Global timeout. Can slow down unrelated lookups.' },
          },
          {
            label: 'Explicit Wait (visibility condition)',
            labelEn: 'Explicit Wait (visibility condition)',
            duration: 1800,
            color: '#10b981',
            badge: { tr: '✅ ~1.8s — tam koşul sağlanınca durur', en: '✅ ~1.8s — stops exactly when condition met, scoped to this element' },
            detail: { tr: 'En verimli yöntem.', en: 'Most efficient. Waits only where needed.' },
          },
        ],
      },
      { type: 'heading', text: '1. Implicit Wait' },
      {
        type: 'code', language: 'java',
        label: 'Java — Implicit Wait',
        code: `driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebElement btn = driver.findElement(By.id("submitBtn")); // waits up to 10s`,
      },
      seleniumImplicitWaitPollingStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Implicit Wait',
        code: `driver.implicitly_wait(10)
btn = driver.find_element(By.ID, "submitBtn")  # waits up to 10s`,
      },
      { type: 'heading', text: '2. Explicit Wait — Best Practice' },
      {
        type: 'code', language: 'java',
        label: 'Java — Explicit Wait',
        code: `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

// Wait for element to be clickable
WebElement btn = wait.until(EC.elementToBeClickable(By.id("submitBtn")));
btn.click();

// Wait for element to disappear
wait.until(EC.invisibilityOfElementLocated(By.id("spinner")));

// Wait for URL to change
wait.until(EC.urlContains("/dashboard"));`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Explicit Wait',
        code: `wait = WebDriverWait(driver, 15)

btn = wait.until(EC.element_to_be_clickable((By.ID, "submitBtn")))
btn.click()

wait.until(EC.invisibility_of_element_located((By.ID, "spinner")))
wait.until(EC.url_contains("/dashboard"))`,
      },
      seleniumExplicitConditionStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Explicit Wait',
        code: `const btn = await driver.wait(
  until.elementIsEnabled(await driver.findElement(By.id('submitBtn'))),
  15000
);
await btn.click();

await driver.wait(until.urlContains('/dashboard'), 15000);`,
      },
      seleniumMixedWaitConflictStep,
      seleniumWaitReflexFilm,
      {
        type: 'quiz',
        question: { tr: 'Selenium\'da bir spinner (yükleniyor ikonu) kaybolana kadar beklemek için hangi ExpectedCondition kullanılır?', en: 'Which ExpectedCondition is used to wait for a spinner to disappear in Selenium?' },
        options: [
          { id: 'a', text: 'EC.visibilityOfElementLocated()' },
          { id: 'b', text: 'EC.presenceOfElementLocated()' },
          { id: 'c', text: 'EC.invisibilityOfElementLocated()' },
          { id: 'd', text: 'EC.elementToBeClickable()' },
        ],
        correct: 'c',
        explanation: { tr: 'EC.invisibilityOfElementLocated() veya Python\'da EC.invisibility_of_element_located() — element DOM\'dan kaybolana veya gizlenene kadar bekler. Yükleme animasyonlarının bitmesini beklemek için idealdir.', en: 'EC.invisibilityOfElementLocated() (Java) or EC.invisibility_of_element_located() (Python) waits until the element is no longer visible or no longer present in the DOM. Perfect for waiting for loading spinners to disappear.' },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium'da sayfa üzerinde bir bildirim (toast) mesajının ekrandan kalkmasını beklemek için en uygun ExpectedCondition hangisidir?",
            "en": "Which ExpectedCondition is the most appropriate to wait for a notification (toast) message to be removed from the screen in Selenium?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "EC.elementToBeClickable()"
            },
            {
                  "id": "b",
                  "text": "EC.invisibilityOfElementLocated()"
            },
            {
                  "id": "c",
                  "text": "EC.visibilityOfElementLocated()"
            },
            {
                  "id": "d",
                  "text": "EC.frameToBeAvailableAndSwitchToIt()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "EC.invisibilityOfElementLocated(), bir öğenin DOM'dan kaldırılmasını veya görünmez hale gelmesini beklemek için kullanılır. Bildirim mesajlarının (toast) kaybolması için beklemek bu metodun temel kullanım alanlarından biridir.",
            "en": "EC.invisibilityOfElementLocated() is used to wait for an element to be removed from the DOM or become invisible. Waiting for temporary notification messages (toasts) to disappear is a primary use case for this method."
      }
}
},
    ],
  },
}

// ─── S5: FRAMES, ALERTS, WINDOWS ─────────────────────────────────────────────
// 🪟 Alert — accept/dismiss/sendKeys akışı
const seleniumAlertAcceptDismissStep = {
  type: 'step-animation',
  id: 'selenium-frames-alert-accept-dismiss-step-01',
  title: { tr: 'Adım Adım: alert.accept() ile alert.dismiss() Arasındaki Fark', en: 'Step by Step: The Difference Between alert.accept() and alert.dismiss()' },
  steps: [
    { id: 1, icon: '⏳', label: { tr: 'Önce alertIsPresent() ile BEKLENİR', en: 'First, wait with alertIsPresent()' }, detail: { tr: 'Alert her zaman ANINDA açılmayabilir — `wait.until(ExpectedConditions.alertIsPresent())` alert hazır olana kadar bekler, aksi halde `NoAlertPresentException` fırlar.', en: 'An alert does not always appear INSTANTLY — `wait.until(ExpectedConditions.alertIsPresent())` waits until it is ready, otherwise a `NoAlertPresentException` is thrown.' } },
    { id: 2, icon: '✅', label: { tr: 'accept() OK\'e basar', en: 'accept() presses OK' }, detail: { tr: '`alert.accept()`, dialog\'daki OK/Kabul Et butonuna basmayı simüle eder — `confirm()` dialog\'unda bu JavaScript tarafında `true` değeri döndürür.', en: '`alert.accept()` simulates pressing the OK/Confirm button — for a `confirm()` dialog, this makes the JavaScript side receive `true`.' } },
    { id: 3, icon: '❌', label: { tr: 'dismiss() Cancel\'a basar', en: 'dismiss() presses Cancel' }, detail: { tr: '`alert.dismiss()`, Cancel/Reddet butonuna basmayı simüle eder — `confirm()` dialog\'unda JavaScript tarafında `false` döner.', en: '`alert.dismiss()` simulates pressing Cancel — for a `confirm()` dialog, JavaScript receives `false`.' } },
    { id: 4, icon: '⌨️', label: { tr: 'sendKeys() sadece prompt\'ta anlamlıdır', en: 'sendKeys() only makes sense for prompt' }, detail: { tr: '`prompt.sendKeys("metin")`, sadece `window.prompt()` dialog\'undaki input alanına yazı yazar — `alert()` ve `confirm()`\'de input alanı OLMADIĞI için bu çağrı hata verir.', en: '`prompt.sendKeys("text")` only types into the input field of a `window.prompt()` dialog — calling it on `alert()` or `confirm()` fails because they have NO input field.' } },
  ],
}

// 🪟 Alert — native dialog bloklama riski
const seleniumAlertBlockingStep = {
  type: 'step-animation',
  id: 'selenium-frames-alert-blocking-step-01',
  title: { tr: 'Adım Adım: Bir Alert Yakalanmazsa Test Neden TAMAMEN Durur?', en: 'Step by Step: Why an Unhandled Alert Completely FREEZES the Test' },
  steps: [
    { id: 1, icon: '🖥️', label: { tr: 'Alert bir DOM elementi DEĞİLDİR', en: 'An alert is NOT a DOM element' }, detail: { tr: 'window.alert(), tarayıcı motorunun kendisi tarafından çizilen NATIVE bir OS dialog\'udur — `findElement` ile ASLA bulunamaz.', en: 'window.alert() is a NATIVE OS-level dialog drawn by the browser engine itself — it can NEVER be found via `findElement`.' } },
    { id: 2, icon: '🚫', label: { tr: 'Sayfa TÜM etkileşimi durdurur', en: 'The page BLOCKS all interaction' }, detail: { tr: 'Bir alert açıkken JavaScript execution DURUR ve sayfadaki hiçbir elemente `findElement` veya `click()` ÇALIŞMAZ — alert kapatılana kadar her komut BEKLER.', en: 'While an alert is open, JavaScript execution PAUSES and no `findElement` or `click()` works on the page — every command WAITS until the alert is closed.' } },
    { id: 3, icon: '⏰', label: { tr: 'Yakalanmazsa TimeoutException gelir', en: 'Left unhandled, a TimeoutException follows' }, detail: { tr: 'Test kodu bir sonraki `findElement`\'i çağırırsa ve arka planda kapatılmamış bir alert varsa, komut zaman aşımına KADAR asılı kalır.', en: 'If the test code calls the next `findElement` while an unclosed alert lurks in the background, the command hangs UNTIL it times out.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Güvenli refleks', en: 'The safe reflex' }, detail: { tr: 'Bir aksiyonun alert AÇABİLECEĞİNİ biliyorsan, o aksiyondan hemen sonra `alertIsPresent()` ile kontrol etmek, testin sessizce KİLİTLENMESİNİ önler.', en: 'If you know an action MIGHT open an alert, checking with `alertIsPresent()` right after it prevents the test from silently HANGING.' } },
  ],
}

// 🪟 iframe — switchTo().frame() bağlam değişimi
const seleniumIframeSwitchStep = {
  type: 'step-animation',
  id: 'selenium-frames-iframe-switch-step-01',
  title: { tr: 'Adım Adım: switchTo().frame() Selenium\'un "Görüşünü" Nasıl Değiştirir?', en: 'Step by Step: How switchTo().frame() Changes What Selenium "Sees"' },
  steps: [
    { id: 1, icon: '🌍', label: { tr: 'Varsayılan olarak ANA doküman görülür', en: 'By default, the MAIN document is visible' }, detail: { tr: 'Selenium başlangıçta sadece ANA sayfanın DOM\'unu görür — bir `<iframe>` içindeki elementler bu görüş alanında YOKTUR.', en: 'By default, Selenium sees only the MAIN page\'s DOM — elements inside an `<iframe>` are NOT part of this view.' } },
    { id: 2, icon: '🚪', label: { tr: 'frame(0) bağlamı DEĞİŞTİRİR', en: 'frame(0) SWITCHES context' }, detail: { tr: '`driver.switchTo().frame(0)` çağrıldığında Selenium\'un "aktif belge" referansı DEĞİŞİR — artık TÜM `findElement` çağrıları o iframe\'in İÇİNDE arar.', en: 'Calling `driver.switchTo().frame(0)` CHANGES Selenium\'s "active document" reference — from now on, ALL `findElement` calls search INSIDE that iframe.' } },
    { id: 3, icon: '🔒', label: { tr: 'Ana sayfa elementleri artık GÖRÜNMEZ', en: 'Main-page elements become INVISIBLE' }, detail: { tr: 'İframe\'e geçtikten sonra ana sayfadaki bir elementi ararsan `NoSuchElementException` alırsın — bağlam DEĞİŞTİĞİ için o elementler artık görüş alanı DIŞINDADIR.', en: 'After switching into the iframe, searching for a main-page element throws `NoSuchElementException` — the context CHANGED, so those elements are now OUTSIDE the view.' } },
    { id: 4, icon: '☕', label: { tr: 'Java analojisi', en: 'Java analogy' }, detail: { tr: 'Bu, iki farklı ClassLoader arasında geçiş yapmaya benzer — bir ClassLoader\'daki sınıf, diğerinden DOĞRUDAN erişilemez, önce doğru context\'e GEÇMEK gerekir.', en: 'This resembles switching between two different ClassLoaders — a class in one ClassLoader is not DIRECTLY reachable from the other; you must SWITCH to the right context first.' } },
  ],
}

// 🪟 iframe — defaultContent() ile geri dönüş
const seleniumIframeReturnStep = {
  type: 'step-animation',
  id: 'selenium-frames-iframe-return-step-01',
  title: { tr: 'Adım Adım: defaultContent() Unutulursa Ne Olur?', en: 'Step by Step: What Happens If defaultContent() Is Forgotten' },
  steps: [
    { id: 1, icon: '↩️', label: { tr: 'defaultContent() KÖKE döner', en: 'defaultContent() returns to the ROOT' }, detail: { tr: '`driver.switch_to.default_content()`, iframe bağlamından çıkıp Selenium\'un görüşünü EN DIŞTAKİ ana sayfaya geri getirir.', en: '`driver.switch_to.default_content()` exits the iframe context and brings Selenium\'s view back to the OUTERMOST main page.' } },
    { id: 2, icon: '🔍', label: { tr: 'parentFrame() bir ÜST seviyeye çıkar', en: 'parentFrame() goes up ONE level' }, detail: { tr: 'İç içe iframe\'lerde `switchTo().parentFrame()`, en dışa değil sadece BİR ÜST çerçeveye döner — `defaultContent()`\'ten farkı budur.', en: 'In nested iframes, `switchTo().parentFrame()` returns only ONE level up, not to the outermost page — that is its difference from `defaultContent()`.' } },
    { id: 3, icon: '🐛', label: { tr: 'Unutulursa sonraki adım BAŞARISIZ olur', en: 'Forgetting it makes the NEXT step fail' }, detail: { tr: '`defaultContent()` çağrılmazsa, iframe\'den sonraki bir `findElement` ana sayfa yerine HÂLÂ iframe içinde arar — ana sayfadaki bir elementi asla BULAMAZ.', en: 'Without `defaultContent()`, a `findElement` after the iframe STILL searches inside the iframe instead of the main page — it can never FIND a main-page element.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Kalıcı alışkanlık', en: 'The lasting habit' }, detail: { tr: 'İframe içine her `switchTo().frame()` girişinin, işlem bitince bir `switchTo().defaultContent()` ile KAPATILMASI, tıpkı açılan bir kaynağı `finally`\'de kapatmak gibi bir DİSİPLİNDİR.', en: 'Every `switchTo().frame()` entry should be CLOSED with a `switchTo().defaultContent()` once done — a discipline just like closing an opened resource in a `finally` block.' } },
  ],
}

// 🪟 Windows — handle Set üzerinde iterasyon
const seleniumWindowHandleStep = {
  type: 'step-animation',
  id: 'selenium-frames-window-handle-step-01',
  title: { tr: 'Adım Adım: getWindowHandles() Yeni Pencereyi Nasıl Bulur?', en: 'Step by Step: How getWindowHandles() Finds the New Window' },
  steps: [
    { id: 1, icon: '🏷️', label: { tr: 'Ana pencerenin ID\'si ÖNCE kaydedilir', en: 'The main window\'s ID is recorded FIRST' }, detail: { tr: '`String mainWindow = driver.getWindowHandle()`, yeni sekme açılmadan ÖNCE mevcut penceyi benzersiz bir String ID olarak saklar.', en: '`String mainWindow = driver.getWindowHandle()` stores the current window as a unique String ID BEFORE any new tab opens.' } },
    { id: 2, icon: '🗂️', label: { tr: 'getWindowHandles() bir SET döndürür', en: 'getWindowHandles() returns a SET' }, detail: { tr: 'Yeni sekme açıldıktan sonra `driver.getWindowHandles()`, açık TÜM pencerelerin ID\'lerini SIRASIZ bir Set olarak döner — Java\'daki `Set<String>` ile birebir eşleşir.', en: 'After the new tab opens, `driver.getWindowHandles()` returns the IDs of ALL open windows as an UNORDERED Set — it maps directly to Java\'s `Set<String>`.' } },
    { id: 3, icon: '🔁', label: { tr: 'Döngü ana pencereyi EKLER', en: 'The loop EXCLUDES the main window' }, detail: { tr: '`for (handle : allWindows) { if (!handle.equals(mainWindow)) ... }`, kaydedilen ana pencereyi HARİÇ TUTARAK yeni açılan pencereyi bulur.', en: '`for (handle : allWindows) { if (!handle.equals(mainWindow)) ... }` finds the newly opened window by EXCLUDING the previously recorded main window.' } },
    { id: 4, icon: '🎯', label: { tr: 'switchTo().window() odağı DEĞİŞTİRİR', en: 'switchTo().window() SWITCHES focus' }, detail: { tr: '`driver.switchTo().window(handle)`, Selenium\'un komut gönderdiği AKTİF pencereyi değiştirir — bu çağrılmadan yeni sekmedeki elementlere ERİŞİLEMEZ.', en: '`driver.switchTo().window(handle)` changes which window Selenium sends commands to — without this call, elements in the new tab are UNREACHABLE.' } },
  ],
}

const s5 = {
  tr: {
    title: '🪟 Frames, Alert & Çoklu Pencere Yönetimi',
    blocks: [
      {
        type: 'simple-box', emoji: '🖼️',
        content: 'iframe, sayfa içindeki ayrı bir DOM bağlamıdır — tıpkı Java\'da bir ClassLoader içine başka bir ClassLoader yüklemek gibi: dış context\'ten findElement ile içerideki elementlere erişemezsin, önce driver.switchTo().frame() ile o bağlama geçmen gerekir. Peki sayfa görsel olarak tek parçaymış gibi görünüyorken neden ayrı context gerekiyor? Çünkü tarayıcı, iframe\'in güvenlik ve kaynak yalıtımını korumak zorundadır; ödeme formları (Stripe, iyzico) ve CAPTCHA widget\'ları bu yüzden her zaman ayrı iframe\'de yaşar. Alert\'ler ise farklı bir kategori: bunlar DOM elementleri değil, tarayıcı seviyesi native dialog\'lardır — driver.switchTo().alert() ile yakalanmazsa tüm test bloke olur. Çoklu pencere yönetimi, Java\'daki WeakReference\'lı thread ID takibine benzer: her window handle bir String ID\'dir, driver.getWindowHandles() ile alınır ve switchTo().window(handle) ile odak değiştirilir. QA\'da en sık production bug\'a dönüşen senaryo şudur: ödeme sayfasındaki iframe context değiştirme eksik bırakılırsa, "Satın Al" butonu bulunur ama tıklanamaz — exception yoktur, sadece test yanlış PASS verir ve ödeme akışı hiç test edilmemiş olur.',
      },
      { type: 'heading', text: '1. Alert / Confirm / Prompt Yönetimi' },
      {
        type: 'code', language: 'java',
        label: 'Java — Alert Yönetimi',
        code: `import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// 1. Alert bekle ve kabul et (OK tıkla)
driver.findElement(By.id("alertBtn")).click();
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
System.out.println("Alert metni: " + alert.getText());
alert.accept(); // OK / Kabul Et

// 2. Confirm → Reddet (Cancel)
driver.findElement(By.id("confirmBtn")).click();
Alert confirm = wait.until(ExpectedConditions.alertIsPresent());
confirm.dismiss(); // Cancel / Reddet

// 3. Prompt → Metin gir
driver.findElement(By.id("promptBtn")).click();
Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
prompt.sendKeys("test kullanıcısı");
prompt.accept();`,
      },
      seleniumAlertAcceptDismissStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Alert Yönetimi',
        code: `from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

wait = WebDriverWait(driver, 10)

# Alert kabul et
driver.find_element(By.ID, "alertBtn").click()
alert = wait.until(EC.alert_is_present())
print("Alert metni:", alert.text)
alert.accept()  # OK

# Confirm reddet
driver.find_element(By.ID, "confirmBtn").click()
confirm = wait.until(EC.alert_is_present())
confirm.dismiss()  # Cancel

# Prompt metin gir
driver.find_element(By.ID, "promptBtn").click()
prompt = wait.until(EC.alert_is_present())
prompt.send_keys("test kullanıcısı")
prompt.accept()`,
      },
      seleniumAlertBlockingStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Alert',
        code: `import { until } from 'selenium-webdriver';

await (await driver.findElement(By.id('alertBtn'))).click();
const alert = await driver.wait(until.alertIsPresent(), 10000);
console.log('Alert:', await alert.getText());
await alert.accept();

// Confirm → dismiss
await (await driver.findElement(By.id('confirmBtn'))).click();
const confirm = await driver.wait(until.alertIsPresent(), 10000);
await confirm.dismiss();`,
      },
      {
        type: 'simulation',
        icon: '🪟',
        color: '#3b82f6',
        title: { tr: 'Alert / Confirm / Prompt — İnteraktif Simülasyon', en: 'Alert / Confirm / Prompt — Interactive Simulation' },
        scenario: 'alert-sim',
        description: {
          tr: 'Sol panelde 3 butona tıklayarak window.alert(), window.confirm() ve window.prompt() dialog\'larını simüle et. Sağ panelde Selenium\'un her dialog için hangi kodu çalıştırdığını canlı izle.',
          en: 'Click the 3 buttons on the left to simulate window.alert(), window.confirm() and window.prompt() dialogs. Watch the Selenium code light up on the right in real time.',
        },
        code: `// Java — Tüm Alert Türleri
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// 1. window.alert() — sadece OK butonu
driver.findElement(By.id("alertBtn")).click();
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
String msg = alert.getText();         // "Kayıt tamamlandı!"
alert.accept();                       // OK tıklar

// 2. window.confirm() — OK veya Cancel
driver.findElement(By.id("confirmBtn")).click();
Alert confirm = wait.until(ExpectedConditions.alertIsPresent());
confirm.accept();                     // OK → true döner
// confirm.dismiss();                 // Cancel → false döner

// 3. window.prompt() — metin girişi
driver.findElement(By.id("promptBtn")).click();
Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
prompt.sendKeys("testuser");          // input'a yaz
prompt.accept();                      // OK → "testuser" döner

// Python eşdeğerleri:
// alert = wait.until(EC.alert_is_present())
// alert.accept() / alert.dismiss() / alert.send_keys("text")`,
        language: 'java',
      },
      { type: 'heading', text: '2. iframe Yönetimi' },
      {
        type: 'simulation',
        icon: '🖼️',
        color: '#f59e0b',
        title: { tr: 'iframe Nerede? — Sayfa İçinde Tespit Et!', en: 'Where Is the iframe? — Detect on Page!' },
        scenario: 'iframe-detection',
        description: {
          tr: '"iframe\'leri Tara" → sayfadaki tüm iframe\'ler sarı/mavi kenarlıkla vurgulanır, "📌 iframe[0]" etiketi belirir. Ardından "switchTo().frame(0)" ile içine gir ve Selenium\'un artık iframe\'i gördüğünü izle.',
          en: 'Click "Scan for iframes" → all iframes get highlighted with colored borders and "📌 iframe[0]" labels. Then enter with "switchTo().frame(0)" and watch Selenium now seeing inside.',
        },
        code: `// ─── ADIM 1: Sayfadaki iframe sayısını öğren ───────────────────────
List<WebElement> iframes = driver.findElements(By.tagName("iframe"));
System.out.println("Toplam iframe: " + iframes.size()); // → 2

// ─── ADIM 2: Index ile iframe'e geç (0'dan başlar) ───────────────
driver.switchTo().frame(0);               // ← Stripe ödeme formu
// Artık iframe içindeki elementleri bulabilirsin!
driver.findElement(By.id("card-number")).sendKeys("4242 4242 4242 4242");

// ─── ADIM 3: Ana sayfaya geri dön ────────────────────────────────
driver.switchTo().defaultContent();       // ← ZORUNLU! Unutma!

// ─── ALTERNATİF: Name/ID ile geç ────────────────────────────────
driver.switchTo().frame("paymentFrame");  // name="paymentFrame"

// ─── Python eşdeğeri ─────────────────────────────────────────────
// iframes = driver.find_elements(By.TAG_NAME, "iframe")
// driver.switch_to.frame(0)
// driver.switch_to.default_content()`,
        language: 'java',
      },
      {
        type: 'simulation',
        icon: '🕶️',
        color: '#7c3aed',
        title: { tr: 'Shadow DOM — X-Ray Gözlüğüyle Gör!', en: 'Shadow DOM — See With X-Ray Vision!' },
        scenario: 'shadow-dom-xray',
        description: {
          tr: '"Normal findElement()" → NoSuchElementException! Çünkü şifre kutusu gizli bir Shadow DOM içinde. "X-Ray + shadowRoot" ile perdeyi kaldır, gizli DOM\'u aç ve elementi bul.',
          en: 'Click "Normal findElement()" → NoSuchElementException! The password field hides inside Shadow DOM. Use "X-Ray + shadowRoot" to pierce through and find it.',
        },
        code: `// ─── NORMAL YÖNTEM — BAŞARISIZ ──────────────────────────────────
// driver.findElement(By.id("pwd"))  ← NoSuchElementException!
// Shadow DOM içindeki elemente direkt erişilemez!

// ─── DOĞRU YÖNTEM: Selenium 4 + getShadowRoot() ──────────────────
// Adım 1: Shadow Host'u bul (normal DOM'da)
WebElement shadowHost = driver.findElement(By.cssSelector("my-password-input"));

// Adım 2: Shadow Root'u al (perdeyi kaldır)
SearchContext shadowRoot = shadowHost.getShadowRoot();

// Adım 3: Shadow Root içinde elementi bul
WebElement pwdInput = shadowRoot.findElement(By.cssSelector("input#pwd"));
pwdInput.sendKeys("myPassword123");

// ─── Eski Yöntem (Selenium 3 / JS Executor) ──────────────────────
// WebElement shadowRoot = (WebElement) ((JavascriptExecutor) driver)
//     .executeScript("return arguments[0].shadowRoot", shadowHost);

// ─── Python — Selenium 4 ──────────────────────────────────────────
// shadow_host = driver.find_element(By.CSS_SELECTOR, "my-password-input")
// shadow_root = shadow_host.shadow_root   # Selenium 4
// pwd = shadow_root.find_element(By.CSS_SELECTOR, "input#pwd")`,
        language: 'java',
      },
      {
        type: 'callout', color: 'purple', emoji: '🖼️',
        title: 'iframe Nedir?',
        content: 'iframe (Inline Frame), sayfa içinde başka bir HTML belgesi gömülü olması durumudur. Reklam blokları, ödeme formları (Stripe, PayPal), video embed\'leri genellikle iframe içindedir. Selenium\'un iframe içine "geçmesi" gerekir, yoksa element bulunamaz.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — iframe Yönetimi',
        code: `// 1. Index ile geç (0\'dan başlar)
driver.switchTo().frame(0);
driver.findElement(By.id("iframeBtn")).click();
driver.switchTo().defaultContent(); // Ana sayfaya dön

// 2. Name/ID ile geç
driver.switchTo().frame("paymentFrame");
driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
driver.switchTo().defaultContent();

// 3. WebElement ile geç
WebElement frame = driver.findElement(By.cssSelector("iframe.payment"));
driver.switchTo().frame(frame);
driver.findElement(By.id("cvv")).sendKeys("123");
driver.switchTo().parentFrame(); // Bir üst frame'e dön

// 4. İç içe iframe
driver.switchTo().frame("outerFrame");
driver.switchTo().frame("innerFrame");
driver.findElement(By.id("deepElement")).click();
driver.switchTo().defaultContent(); // En dıştaki sayfaya dön`,
      },
      seleniumIframeSwitchStep,
      {
        type: 'code', language: 'python',
        label: 'Python — iframe',
        code: `# Index ile
driver.switch_to.frame(0)
driver.find_element(By.ID, "iframeBtn").click()
driver.switch_to.default_content()  # Ana sayfaya dön

# Name/ID ile
driver.switch_to.frame("paymentFrame")
driver.find_element(By.ID, "cardNumber").send_keys("4111111111111111")
driver.switch_to.default_content()

# WebElement ile
frame = driver.find_element(By.CSS_SELECTOR, "iframe.payment")
driver.switch_to.frame(frame)
driver.find_element(By.ID, "cvv").send_keys("123")
driver.switch_to.parent_frame()`,
      },
      seleniumIframeReturnStep,
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — iframe',
        code: `// Index ile
await driver.switchTo().frame(0);
await (await driver.findElement(By.id('iframeBtn'))).click();
await driver.switchTo().defaultContent();

// WebElement ile
const frame = await driver.findElement(By.css('iframe.payment'));
await driver.switchTo().frame(frame);
await (await driver.findElement(By.id('cardNumber'))).sendKeys('4111111111111111');
await driver.switchTo().parentFrame();`,
      },
      seleniumIframeContextFilm,
      { type: 'heading', text: '3. Çoklu Pencere/Sekme Yönetimi' },
      {
        type: 'code', language: 'java',
        label: 'Java — Pencere/Sekme Yönetimi',
        code: `// Ana pencere handle'ını kaydet
String mainWindow = driver.getWindowHandle();
System.out.println("Ana pencere: " + mainWindow);

// Yeni sekme açan linke tıkla
driver.findElement(By.id("newTabLink")).click();

// Tüm pencere handle'larını al
Set<String> allWindows = driver.getWindowHandles();

// Yeni pencereye geç
for (String handle : allWindows) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        break;
    }
}

System.out.println("Yeni pencere başlığı: " + driver.getTitle());
driver.findElement(By.id("closeBtn")).click();

// Ana pencereye dön
driver.switchTo().window(mainWindow);
System.out.println("Ana pencere başlığı: " + driver.getTitle());

// Selenium 4: Programatik yeni sekme/pencere aç
driver.switchTo().newWindow(WindowType.TAB);   // Yeni sekme
driver.switchTo().newWindow(WindowType.WINDOW); // Yeni pencere
driver.get("https://example.com");`,
      },
      seleniumWindowHandleStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Pencere Yönetimi',
        code: `# Ana pencere handle
main_window = driver.current_window_handle
print(f"Ana pencere: {main_window}")

# Yeni sekme açan link
driver.find_element(By.ID, "newTabLink").click()

# Yeni pencereye geç
all_windows = driver.window_handles
for handle in all_windows:
    if handle != main_window:
        driver.switch_to.window(handle)
        break

print(f"Yeni başlık: {driver.title}")
driver.close()  # Bu pencereyi kapat

# Ana pencereye dön
driver.switch_to.window(main_window)

# Selenium 4: Programatik yeni sekme
driver.switch_to.new_window("tab")
driver.get("https://example.com")`,
      },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — Window Management',
        code: `// Ana pencere handle
const mainWindow = await driver.getWindowHandle();

await (await driver.findElement(By.id('newTabLink'))).click();

// Tüm pencereler
const allWindows = await driver.getAllWindowHandles();

// Yeni pencereye geç
for (const handle of allWindows) {
  if (handle !== mainWindow) {
    await driver.switchTo().window(handle);
    break;
  }
}

console.log('Yeni başlık:', await driver.getTitle());
await driver.close();

// Ana pencereye dön
await driver.switchTo().window(mainWindow);`,
      },
      {
        type: 'simulation',
        icon: '🗂️',
        color: '#3b82f6',
        title: { tr: 'Multiple Windows — Pencere/Sekme Geçişi', en: 'Multiple Windows — Tab/Window Switching' },
        scenario: 'multi-window',
        description: {
          tr: '"Yeni Sekme Aç" butonuna tıkla ve Selenium\'un getWindowHandles() ile tüm sekmeleri nasıl algılayıp switchTo().window() ile geçtiğini adım adım izle.',
          en: 'Click "Open New Tab" and watch how Selenium detects all tabs with getWindowHandles() then switches with switchTo().window() step by step.',
        },
        code: `// Java — Multiple Window/Tab Yönetimi
// Adım 1: Ana pencere handle'ını kaydet (ZORUNLU!)
String mainWindow = driver.getWindowHandle();

// Adım 2: Yeni sekme açan linke tıkla
driver.findElement(By.id("newTabLink")).click();

// Adım 3: Tüm handle'ları al — {CDwindow-001, CDwindow-002}
Set<String> allHandles = driver.getWindowHandles();

// Adım 4: Yeni sekmeye geç
for (String handle : allHandles) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);   // ← yeni sekme
        break;
    }
}

// Adım 5: Yeni sekmede çalış
System.out.println(driver.getTitle()); // yeni sekme başlığı
driver.close();                        // yeni sekmeyi kapat

// Adım 6: Ana sekmeye dön (ZORUNLU — yoksa NoSuchWindowException!)
driver.switchTo().window(mainWindow);`,
        language: 'java',
      },
      { type: 'heading', text: '4. Cookie Yönetimi' },
      {
        type: 'code', language: 'java',
        label: 'Java — Cookies',
        code: `// Cookie ekle
Cookie cookie = new Cookie("sessionToken", "abc123xyz");
driver.manage().addCookie(cookie);

// Tüm cookie'leri oku
Set<Cookie> cookies = driver.manage().getCookies();
for (Cookie c : cookies) {
    System.out.println(c.getName() + " = " + c.getValue());
}

// Belirli cookie'yi oku
Cookie session = driver.manage().getCookieNamed("sessionToken");
System.out.println("Session: " + session.getValue());

// Cookie sil
driver.manage().deleteCookieNamed("sessionToken");
driver.manage().deleteAllCookies();`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — Cookies',
        code: `# Cookie ekle
driver.add_cookie({"name": "sessionToken", "value": "abc123xyz"})

# Tüm cookies
for cookie in driver.get_cookies():
    print(f"{cookie['name']} = {cookie['value']}")

# Belirli cookie
session = driver.get_cookie("sessionToken")
print(f"Session: {session['value']}")

# Sil
driver.delete_cookie("sessionToken")
driver.delete_all_cookies()`,
      },
      {
        type: 'quiz',
        question: { tr: 'Bir iframe içindeki elemana eriştikten sonra ana sayfaya dönmek için hangi metot kullanılır?', en: 'Which method is used to return to the main page after accessing an element inside an iframe?' },
        options: [
          { id: 'a', text: 'driver.switchTo().mainFrame()' },
          { id: 'b', text: 'driver.navigate().back()' },
          { id: 'c', text: 'driver.switchTo().defaultContent()' },
          { id: 'd', text: 'driver.switchTo().parentFrame()' },
        ],
        correct: 'c',
        explanation: { tr: 'driver.switchTo().defaultContent() (Java), driver.switch_to.default_content() (Python) — ana sayfa bağlamına döner. parentFrame() ise bir üst iframe\'e döner (iç içe iframe durumunda). Testi bitirince her zaman defaultContent() çağırın.', en: 'driver.switchTo().defaultContent() returns to the top-level page context. parentFrame() goes one level up (for nested iframes). Always call defaultContent() when finished with an iframe.' },
      
        retryQuestion: {
      "question": {
            "tr": "İç içe geçmiş iframe yapılarında, üzerinde çalıştığınız alt iframe'den bir üstteki kapsayıcı çerçeveye geçiş yapmak için hangi metot tercih edilmelidir?",
            "en": "Which method should be used to switch from a nested iframe to its immediate parent frame?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "driver.switchTo().parentFrame()"
            },
            {
                  "id": "b",
                  "text": "driver.switchTo().defaultContent()"
            },
            {
                  "id": "c",
                  "text": "driver.switchTo().activeElement()"
            },
            {
                  "id": "d",
                  "text": "driver.navigate().refresh()"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "driver.switchTo().parentFrame(), kontrolü mevcut iframe'in bir üstündeki (parent) iframe'e aktarır. Eğer tüm hiyerarşiden çıkıp ana sayfaya dönmek isteseydiniz defaultContent() kullanırdınız.",
            "en": "driver.switchTo().parentFrame() shifts the control to the immediate parent of the current iframe. If you wanted to exit the entire hierarchy and return to the main page, you would use defaultContent()."
      }
}
},
      {
        type: 'simulation',
        icon: '🕶️',
        color: '#7c3aed',
        title: { tr: 'Shadow DOM — İnteraktif Keşif', en: 'Shadow DOM — Interactive Explorer' },
        scenario: 'shadow-dom',
        description: {
          tr: 'Sağdaki adım butonlarına tıklayarak Shadow DOM\'un katmanlarını keşfet: önce Host element\'i bul, sonra Shadow Root\'u aç, son olarak hedef elementi yakala.',
          en: 'Click the step buttons to explore Shadow DOM layers: find the Host element, pierce the Shadow Root, then locate the target element inside.',
        },
        code: `// Selenium 4 — Shadow DOM Erişimi
WebElement shadowHost = driver.findElement(By.cssSelector("my-custom-button"));

// getShadowRoot() → Selenium 4 ile gelen özellik
SearchContext shadowRoot = shadowHost.getShadowRoot();

// Shadow root içindeki elementi bul
WebElement innerBtn = shadowRoot.findElement(By.cssSelector(".inner-btn"));
innerBtn.click();

// Eski yöntem (Selenium 3 / JS):
// WebElement shadowRoot = (WebElement) ((JavascriptExecutor) driver)
//     .executeScript("return arguments[0].shadowRoot", shadowHost);
// WebElement innerBtn = shadowRoot.findElement(By.cssSelector(".inner-btn"));

// Python — Selenium 4:
// shadow_root = shadow_host.shadow_root
// inner_btn = shadow_root.find_element(By.CSS_SELECTOR, ".inner-btn")`,
        language: 'java',
      },
    ],
  },
  en: {
    title: '🪟 Frames, Alerts & Multiple Windows',
    blocks: [
      {
        type: 'simple-box', emoji: '🖼️',
        content: 'An iframe is a separate DOM context embedded inside the main page — analogous to loading a second ClassLoader inside a Java ClassLoader: you cannot reach inner elements with findElement from the outer context; you must call driver.switchTo().frame() first to enter that context. But if the page looks like a single visual surface, why is a separate context even necessary? Because the browser must enforce security and resource isolation for the iframe\'s origin; payment forms (Stripe, iyzico) and CAPTCHA widgets always live in their own iframe for exactly this reason. Alerts are a different category altogether: they are not DOM elements but native browser-level dialogs — if you do not capture them with driver.switchTo().alert() the entire test blocks indefinitely. Multiple-window management resembles tracking thread IDs with Java WeakReferences: each window handle is a String ID returned by driver.getWindowHandles(), and focus changes via switchTo().window(handle). The QA scenario that most reliably escapes detection is this: if the iframe context switch is missing on a payment page, the "Buy" button is found and clicked without error — the test returns a false PASS and the checkout flow is never actually tested.',
      },
      { type: 'heading', text: '1. Alert / Confirm / Prompt' },
      {
        type: 'code', language: 'java',
        label: 'Java — Alert Handling',
        code: `// Accept alert
driver.findElement(By.id("alertBtn")).click();
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
System.out.println(alert.getText());
alert.accept(); // OK

// Dismiss confirm
driver.findElement(By.id("confirmBtn")).click();
wait.until(ExpectedConditions.alertIsPresent()).dismiss();

// Prompt input
driver.findElement(By.id("promptBtn")).click();
Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
prompt.sendKeys("test user");
prompt.accept();`,
      },
      seleniumAlertAcceptDismissStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Alert Handling',
        code: `driver.find_element(By.ID, "alertBtn").click()
alert = wait.until(EC.alert_is_present())
print(alert.text)
alert.accept()

driver.find_element(By.ID, "confirmBtn").click()
wait.until(EC.alert_is_present()).dismiss()`,
      },
      seleniumAlertBlockingStep,
      { type: 'heading', text: '2. iframe Management' },
      {
        type: 'code', language: 'java',
        label: 'Java — iframe',
        code: `driver.switchTo().frame("paymentFrame");
driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
driver.switchTo().defaultContent(); // Back to main page`,
      },
      seleniumIframeSwitchStep,
      {
        type: 'code', language: 'python',
        label: 'Python — iframe',
        code: `driver.switch_to.frame("paymentFrame")
driver.find_element(By.ID, "cardNumber").send_keys("4111111111111111")
driver.switch_to.default_content()`,
      },
      seleniumIframeReturnStep,
      seleniumIframeContextFilm,
      { type: 'heading', text: '3. Multiple Windows/Tabs' },
      {
        type: 'code', language: 'java',
        label: 'Java — Window Management',
        code: `String mainWindow = driver.getWindowHandle();
driver.findElement(By.id("newTabLink")).click();
for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        break;
    }
}
driver.close();
driver.switchTo().window(mainWindow);`,
      },
      seleniumWindowHandleStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Window Management',
        code: `main_window = driver.current_window_handle
driver.find_element(By.ID, "newTabLink").click()
for handle in driver.window_handles:
    if handle != main_window:
        driver.switch_to.window(handle)
        break
driver.close()
driver.switch_to.window(main_window)`,
      },
      {
        type: 'quiz',
        question: { tr: 'Bir iframe içindeki elemana eriştikten sonra ana sayfaya dönmek için hangi metot kullanılır?', en: 'Which method is used to return to the main page after accessing an element inside an iframe?' },
        options: [
          { id: 'a', text: 'driver.switchTo().mainFrame()' },
          { id: 'b', text: 'driver.navigate().back()' },
          { id: 'c', text: 'driver.switchTo().defaultContent()' },
          { id: 'd', text: 'driver.switchTo().parentFrame()' },
        ],
        correct: 'c',
        explanation: { tr: 'driver.switchTo().defaultContent() (Java), driver.switch_to.default_content() (Python) — ana sayfa bağlamına döner. parentFrame() ise bir üst iframe\'e döner (iç içe iframe durumunda). Testi bitirince her zaman defaultContent() çağırın.', en: 'driver.switchTo().defaultContent() returns to the top-level page context. parentFrame() goes one level up (for nested iframes). Always call defaultContent() when finished with an iframe.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir sayfadaki iframe içerisine girip işlem yaptıktan sonra Selenium'un tekrar ana sayfa (top-level page) üzerinde işlem yapabilmesi için hangi komut gereklidir?",
            "en": "Which command is required for Selenium to be able to interact with the top-level page again after entering and performing actions within an iframe?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "driver.switchTo().frame(0)"
            },
            {
                  "id": "b",
                  "text": "driver.switchTo().parentFrame()"
            },
            {
                  "id": "c",
                  "text": "driver.switchTo().defaultContent()"
            },
            {
                  "id": "d",
                  "text": "driver.switchTo().window()"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "iframe içine girildiğinde WebDriver odağı o çerçeveye kilitlenir. Ana sayfaya geri dönüp oradaki elementleri bulabilmek için driver.switchTo().defaultContent() metodunu kullanarak odak sıfırlanmalıdır.",
            "en": "When switching into an iframe, the WebDriver's focus is locked to that frame. To return to the main page and locate elements outside the iframe, you must reset the focus using driver.switchTo().defaultContent()."
      }
}
},
    ],
  },
}

// ─── S6: GERÇEK HAYAT ─────────────────────────────────────────────────────────
const s6 = {
  tr: {
    title: '🛠️ Gerçek Hayat — E-Commerce Test Senaryosu',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'E2E test senaryosu yazmak, Java\'da entegrasyon testi yazmakla aynı mantık üzerine kuruludur: izole unit değil, gerçek bağımlılıklarla birlikte bir kullanıcı akışını uçtan uca doğrularsın. E-ticaret senaryosu bunun en somut örneğidir: giriş → ürün arama → sepete ekleme → ödeme bir funnel\'dır ve bu funnel\'ın her adımı birbirinin ön koşuludur. Peki unit testler var zaten, neden saatler süren tarayıcı testlerine gerek var? Çünkü "ürün sepete eklendi" iddiasını unit test backend mantığını izole ederek doğrular; tarayıcı testi ise "kullanıcı sepet simgesini gördü, sayım güncellenemiştir, ödeme sayfasına geçilebildi" gibi frontend state\'ini doğrular — bunların ikisi bambaşka şeyleri test eder. Java\'da Page Object Model (POM) kullandığında, her sayfa bir class olur ve test kodu presentation layer\'dan ayrılır; aynı pattern Python\'da page class + fixture ile, TypeScript\'te ise Playwright\'ın Page Object fixture sistemiyle hayata geçer. QA açısından gerçek risk: e-ticaret sitesinde ödeme adımı test edilmemişse, "sepete ekle" düğmesi çalışıyor ama ödeme butonu broken olsa bile CI yeşil kalır — bu tür bir bug production\'da revenue kaybına yol açar ve son kullanıcı raporlayana kadar kimse fark etmez.',
      },
      {
        type: 'callout', color: 'blue', emoji: '🎯',
        title: 'Senaryo: automationexercise.com E2E Testi',
        content: 'automationexercise.com, Selenium pratiği için tasarlanmış ücretsiz bir test sitesidir. Aşağıdaki senaryoyu gerçek tarayıcıda çalıştırabilirsiniz.',
      },
      { type: 'heading', text: 'Java — Page Object Model ile E2E Test' },
      {
        type: 'code', language: 'java',
        label: 'Java — LoginPage.java (Page Object)',
        code: `// Page Object Model: her sayfa ayrı class
public class LoginPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By emailField    = By.cssSelector("input[data-qa='login-email']");
    private By passwordField = By.cssSelector("input[data-qa='login-password']");
    private By loginButton   = By.cssSelector("button[data-qa='login-button']");
    private By errorMessage  = By.cssSelector("p.text-danger");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    public void enterEmail(String email) {
        wait.until(EC.visibilityOfElementLocated(emailField)).sendKeys(email);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }

    public void clickLogin() {
        driver.findElement(loginButton).click();
    }

    public String getErrorMessage() {
        return wait.until(EC.visibilityOfElementLocated(errorMessage)).getText();
    }

    // Page method: tam işlem
    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLogin();
    }
}`,
      },
      {
        type: 'code', language: 'java',
        label: 'Java — E2E Test Senaryosu',
        code: `import org.testng.annotations.*;
import org.testng.Assert;

public class ECommerceTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("https://automationexercise.com");
        loginPage = new LoginPage(driver);
    }

    @Test
    public void testSuccessfulLogin() {
        // 1. Login sayfasına git
        driver.findElement(By.cssSelector("a[href='/login']")).click();

        // 2. Giriş yap
        loginPage.login("test@test.com", "password123");

        // 3. Başarılı giriş doğrula
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement loggedIn = wait.until(
            EC.visibilityOfElementLocated(By.cssSelector("li:has(a[href='/logout'])"))
        );
        Assert.assertTrue(loggedIn.isDisplayed(), "Kullanıcı giriş yapamadı!");
    }

    @Test
    public void testAddToCart() {
        // 1. Ürün sayfasına git
        driver.get("https://automationexercise.com/products");

        // 2. İlk ürünü sepete ekle
        driver.findElement(By.cssSelector(".add-to-cart")).click();

        // 3. Modal confirm
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(EC.visibilityOfElementLocated(By.id("cartModal")));

        driver.findElement(By.cssSelector("button.continue-shopping")).click();

        // 4. Sepet ikonunu kontrol et
        String cartCount = driver.findElement(By.cssSelector(".cart-icon span")).getText();
        Assert.assertEquals(cartCount, "1", "Sepet boş!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}`,
      },
      { type: 'heading', text: 'Python — Pytest + Selenium E2E Test' },
      {
        type: 'code', language: 'python',
        label: 'Python — conftest.py (Pytest Fixtures)',
        code: `# conftest.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope="function")
def driver():
    """Her test için yeni Chrome instance"""
    options = Options()
    # options.add_argument("--headless")  # CI için headless
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,800")

    chrome_driver = webdriver.Chrome(options=options)
    chrome_driver.implicitly_wait(10)
    yield chrome_driver
    chrome_driver.quit()  # Her test sonrası kapat`,
      },
      {
        type: 'code', language: 'python',
        label: 'Python — test_ecommerce.py',
        code: `# test_ecommerce.py
import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://automationexercise.com"

class TestECommerce:
    def test_homepage_loads(self, driver):
        """Anasayfa yükleniyor mu?"""
        driver.get(BASE_URL)
        assert "Automation Exercise" in driver.title

    def test_login_success(self, driver):
        """Başarılı giriş testi"""
        driver.get(f"{BASE_URL}/login")

        wait = WebDriverWait(driver, 15)

        # Email ve şifre gir
        wait.until(EC.visibility_of_element_located(
            (By.CSS_SELECTOR, "input[data-qa='login-email']")
        )).send_keys("test@test.com")

        driver.find_element(By.CSS_SELECTOR, "input[data-qa='login-password']").send_keys("password123")
        driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']").click()

        # Giriş başarılı mı?
        logout_link = wait.until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "a[href='/logout']"))
        )
        assert logout_link.is_displayed(), "Login başarısız!"

    def test_search_product(self, driver):
        """Ürün arama testi"""
        driver.get(f"{BASE_URL}/products")

        wait = WebDriverWait(driver, 10)
        search_box = wait.until(
            EC.visibility_of_element_located((By.ID, "search_product"))
        )
        search_box.send_keys("Top")
        driver.find_element(By.ID, "submit_search").click()

        # Arama sonuçları geldi mi?
        results = wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".productinfo"))
        )
        assert len(results) > 0, "Hiç ürün bulunamadı!"
        print(f"Bulunan ürün sayısı: {len(results)}")

    def test_add_to_cart(self, driver):
        """Sepete ekleme testi"""
        driver.get(f"{BASE_URL}/product_details/1")

        wait = WebDriverWait(driver, 10)

        # Adet seç
        qty = driver.find_element(By.ID, "quantity")
        qty.clear()
        qty.send_keys("2")

        # Sepete ekle
        driver.find_element(By.CSS_SELECTOR, "button.cart").click()

        # Modal açıldı mı?
        modal = wait.until(
            EC.visibility_of_element_located((By.ID, "cartModal"))
        )
        assert modal.is_displayed(), "Modal açılmadı!"`,
      },
      { type: 'heading', text: 'TypeScript — Mocha + Selenium E2E Test' },
      {
        type: 'code', language: 'typescript',
        label: 'TypeScript — ecommerce.test.ts',
        code: `import { Builder, Browser, By, until } from 'selenium-webdriver';
import { describe, it, before, after } from 'mocha';
import { strict as assert } from 'assert';

const BASE_URL = 'https://automationexercise.com';

describe('E-Commerce Tests', function () {
  this.timeout(30000); // Test timeout: 30s
  let driver: any;

  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    await driver.quit();
  });

  it('Homepage loads correctly', async () => {
    await driver.get(BASE_URL);
    const title = await driver.getTitle();
    assert.ok(title.includes('Automation Exercise'), 'Title mismatch');
  });

  it('Login successfully', async () => {
    await driver.get(\`\${BASE_URL}/login\`);

    const emailInput = await driver.wait(
      until.elementLocated(By.css("input[data-qa='login-email']")),
      15000
    );
    await emailInput.sendKeys('test@test.com');
    await (await driver.findElement(By.css("input[data-qa='login-password']"))).sendKeys('password123');
    await (await driver.findElement(By.css("button[data-qa='login-button']"))).click();

    const logoutLink = await driver.wait(
      until.elementLocated(By.css("a[href='/logout']")),
      10000
    );
    assert.ok(await logoutLink.isDisplayed(), 'Login failed!');
  });

  it('Search for a product', async () => {
    await driver.get(\`\${BASE_URL}/products\`);

    const searchBox = await driver.wait(
      until.elementLocated(By.id('search_product')),
      10000
    );
    await searchBox.sendKeys('Top');
    await (await driver.findElement(By.id('submit_search'))).click();

    const results = await driver.findElements(By.css('.productinfo'));
    assert.ok(results.length > 0, 'No products found!');
    console.log(\`Found \${results.length} products\`);
  });
});`,
      },
      seleniumE2eFunnelFilm,
      { type: 'heading', text: 'Selenium vs Playwright vs Cypress — Karşılaştırma' },
      {
        type: 'table',
        headers: ['Özellik', 'Selenium', 'Playwright', 'Cypress'],
        rows: [
          ['Dil Desteği', 'Java, Python, C#, JS, Ruby', 'TS/JS, Python, Java, C#', 'JS/TS'],
          ['Tarayıcı', 'Chrome, FF, Safari, Edge, IE', 'Chromium, FF, WebKit', 'Chrome, FF, Edge'],
          ['Auto-Wait', '❌ Manuel', '✅ Built-in', '✅ Built-in'],
          ['Network Mock', '❌ Ek araç', '✅ Built-in', '✅ Built-in'],
          ['Paralel Test', 'Grid gerekir', '✅ Built-in', 'Cypress Cloud (ücretli)'],
          ['iframe Desteği', '✅ İyi', '✅ İyi', '⚠️ Sınırlı'],
          ['Java Entegrasyonu', '✅ Native', '✅ Client library', '❌ Yok'],
          ['Headless', '✅', '✅', '✅'],
          ['Olgunluk', '⭐⭐⭐⭐⭐ (20 yıl)', '⭐⭐⭐⭐ (4 yıl)', '⭐⭐⭐⭐ (7 yıl)'],
          ['Ne Zaman Tercih Et?', 'Java projelerde, cross-browser, legacy', 'Yeni projeler, multi-browser', 'Frontend-only, JS/TS ekipler'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Selenium\'un en büyük avantajı hangisidir?', en: 'What is Selenium\'s biggest advantage?' },
        options: [
          { id: 'a', text: { tr: 'Sadece Chrome\'da çalışır', en: 'Only works in Chrome' } },
          { id: 'b', text: { tr: 'Çok dil desteği (Java, Python, C#, JS, Ruby) ve olgunluk (20 yıl)', en: 'Multi-language support (Java, Python, C#, JS, Ruby) and maturity (20 years)' } },
          { id: 'c', text: { tr: 'Yalnızca JavaScript testleri için uygundur', en: 'Suitable only for JavaScript tests' } },
          { id: 'd', text: 'Auto-wait built-in gelir' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium\'un en büyük avantajı Java dahil 6+ dil desteği, 20 yıllık olgunluk, geniş topluluk ve her tarayıcıda çalışabilmesidir. Özellikle Java ağırlıklı QA ekiplerinin tercihi olmaya devam etmektedir.', en: 'Selenium\'s biggest advantage is support for 6+ languages including Java, 20 years of maturity, a large community, and compatibility with all browsers. It remains the go-to choice for Java-heavy QA teams.' },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium'u modern test otomasyon projelerinde hala popüler kılan temel faktör nedir?",
            "en": "What is the primary factor that keeps Selenium popular in modern test automation projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Tarayıcıya özel yerel sürücülerin olmaması",
                        "en": "Lack of browser-specific native drivers"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Geniş dil desteği, zengin ekosistem ve uzun yıllara dayanan endüstriyel deneyim",
                        "en": "Broad language support, rich ecosystem, and years of industrial experience"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Tüm web elementleri için otomatik bekleme süresi sunması",
                        "en": "Built-in automatic wait for all web elements"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece kurumsal şirketler tarafından geliştiriliyor olması",
                        "en": "Being developed exclusively by corporate companies"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Selenium, 20 yılı aşkın süredir piyasada olması, Java, Python ve C# gibi pek çok dille entegre çalışabilmesi ve devasa bir topluluk desteğine sahip olması sayesinde en çok tercih edilen araçlardan biri olmaya devam etmektedir.",
            "en": "Selenium remains one of the most preferred tools due to its 20+ years of presence in the market, its ability to integrate with many languages like Java, Python, and C#, and its massive community support."
      }
}
},
    ],
  },
  en: {
    title: '🛠️ Real World — E-Commerce Test Scenario',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'Writing an E2E test scenario follows the same logic as an integration test in Java: instead of isolated units, you verify a full user flow against real dependencies. The e-commerce scenario is the most concrete example of this — login → search → add to cart → checkout is a funnel where each step is a prerequisite for the next. But if unit tests already exist, why do we need time-consuming browser tests? Because a unit test validates the backend\'s cart logic in isolation; a browser test validates that "the cart icon updated, the count changed, the checkout page opened" — these two are testing entirely different things. In Java, Page Object Model separates test code from the presentation layer by making each page a class; the same pattern appears in Python as page classes + fixtures, and in TypeScript as Playwright\'s Page Object fixture system. The real QA risk: if only the "add to cart" step is tested but the checkout button is broken, CI stays green while a revenue-killing bug ships to production — and no one finds out until a customer reports it.',
      },
      { type: 'heading', text: 'Java — E2E Test with Page Object Model' },
      {
        type: 'code', language: 'java',
        label: 'Java — E2E Test',
        code: `@Test
public void testSuccessfulLogin() {
    driver.findElement(By.cssSelector("a[href='/login']")).click();
    loginPage.login("test@test.com", "password123");
    WebElement loggedIn = wait.until(EC.visibilityOfElementLocated(
        By.cssSelector("a[href='/logout']")
    ));
    Assert.assertTrue(loggedIn.isDisplayed());
}`,
      },
      { type: 'heading', text: 'Python — Pytest + Selenium E2E' },
      {
        type: 'code', language: 'python',
        label: 'Python — E2E Test',
        code: `def test_login_success(driver):
    driver.get("https://automationexercise.com/login")
    wait = WebDriverWait(driver, 15)
    wait.until(EC.visibility_of_element_located(
        (By.CSS_SELECTOR, "input[data-qa='login-email']")
    )).send_keys("test@test.com")
    driver.find_element(By.CSS_SELECTOR, "input[data-qa='login-password']").send_keys("password123")
    driver.find_element(By.CSS_SELECTOR, "button[data-qa='login-button']").click()
    logout = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "a[href='/logout']")))
    assert logout.is_displayed()`,
      },
      seleniumE2eFunnelFilm,
      { type: 'heading', text: 'Selenium vs Playwright vs Cypress' },
      {
        type: 'table',
        headers: ['Feature', 'Selenium', 'Playwright', 'Cypress'],
        rows: [
          ['Languages', 'Java, Python, C#, JS, Ruby', 'TS/JS, Python, Java, C#', 'JS/TS only'],
          ['Browsers', 'Chrome, FF, Safari, Edge, IE', 'Chromium, FF, WebKit', 'Chrome, FF, Edge'],
          ['Auto-Wait', '❌ Manual', '✅ Built-in', '✅ Built-in'],
          ['Network Mock', '❌ Extra tool', '✅ Built-in', '✅ Built-in'],
          ['Java Integration', '✅ Native', '✅ Client library', '❌ None'],
          ['Best For', 'Java projects, cross-browser, legacy', 'New projects, multi-browser', 'Frontend-only, JS/TS teams'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Selenium\'un en büyük avantajı hangisidir?', en: "What is Selenium's biggest advantage?" },
        options: [
          { id: 'a', text: { tr: 'Sadece Chrome\'da çalışır', en: 'Only works in Chrome' } },
          { id: 'b', text: { tr: 'Çok dil desteği (Java, Python, C#, JS, Ruby) ve olgunluk (20 yıl)', en: 'Multi-language support (Java, Python, C#, JS, Ruby) and maturity (20 years)' } },
          { id: 'c', text: { tr: 'Yalnızca JavaScript testleri için uygundur', en: 'Suitable only for JavaScript tests' } },
          { id: 'd', text: 'Auto-wait built-in gelir' },
        ],
        correct: 'b',
        explanation: { tr: 'Selenium\'un en büyük avantajı Java dahil 6+ dil desteği, 20 yıllık olgunluk, geniş topluluk ve her tarayıcıda çalışabilmesidir. Özellikle Java ağırlıklı QA ekiplerinin tercihi olmaya devam etmektedir.', en: "Selenium's biggest advantage is support for 6+ languages including Java, 20 years of maturity, a large community, and compatibility with all browsers. It remains the go-to choice for Java-heavy QA teams." },
      
        retryQuestion: {
      "question": {
            "tr": "Selenium otomasyon aracının yazılım test dünyasındaki en güçlü yönü nedir?",
            "en": "What is the greatest strength of the Selenium automation tool in the software testing world?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Sadece mobil tarayıcıları desteklemesi",
                        "en": "Support only for mobile browsers"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Çeşitli programlama dillerine uyumluluk, köklü geçmiş ve geniş kütüphane desteği",
                        "en": "Compatibility with various programming languages, established history, and wide library support"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Testleri kendiliğinden paralel çalıştırması",
                        "en": "Running tests in parallel automatically"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Kurulum gerektirmeyen taşınabilir yapı",
                        "en": "Portable structure that does not require installation"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Selenium'un uzun soluklu başarısının sırrı, farklı programlama dillerine sunduğu esnek adaptasyon ve 20 yıllık köklü geçmişi ile oluşan geniş topluluk desteğidir.",
            "en": "The secret to Selenium's long-term success is its flexible adaptation to different programming languages and the massive community support built over its 20-year established history."
      }
}
},
    ],
  },
}

// ─── S7: EKOSİSTEM ───────────────────────────────────────────────────────────
// 🔗 Grid — Hub/Node mimarisi ve RemoteWebDriver yönlendirmesi
const seleniumGridHubNodeStep = {
  type: 'step-animation',
  id: 'selenium-ecosystem-grid-hubnode-step-01',
  title: { tr: 'Adım Adım: RemoteWebDriver İsteği Hub Üzerinden Nasıl Yönlendirilir?', en: 'Step by Step: How RemoteWebDriver Routes a Request Through the Hub' },
  steps: [
    { id: 1, icon: '📮', label: { tr: 'RemoteWebDriver komutu Hub\'a GÖNDERİR', en: 'RemoteWebDriver SENDS the command to the Hub' }, detail: { tr: '`new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options)` çağrıldığında test kodu KENDİ makinesinde çalışan bir tarayıcı BAŞLATMAZ — Hub\'a bir istek gönderir.', en: 'Calling `new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options)` does NOT start a browser on the local machine — it sends a request to the Hub.' } },
    { id: 2, icon: '🧭', label: { tr: 'Hub uygun bir Node ARAR', en: 'The Hub SEARCHES for a matching Node' }, detail: { tr: 'Hub, isteğin `ChromeOptions`\'ını (tarayıcı türü, sürüm) kayıtlı Node\'ların YETENEKLERİYLE karşılaştırır ve uygun BOŞ bir Node bulur.', en: 'The Hub compares the request\'s `ChromeOptions` (browser type, version) against registered Nodes\' CAPABILITIES and finds a matching FREE Node.' } },
    { id: 3, icon: '🔗', label: { tr: 'Session gerçek Node\'da AÇILIR', en: 'The session OPENS on the actual Node' }, detail: { tr: 'Eşleşme bulununca gerçek Chrome process\'i o Node\'da başlar — test kodu ise HİÇBİR ZAMAN o Node\'un IP adresini bilmek ZORUNDA kalmaz.', en: 'Once matched, the real Chrome process starts ON that Node — the test code NEVER needs to know that Node\'s IP address.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Node meşgulse ne olur?', en: 'What if all Nodes are busy?' }, detail: { tr: 'Uygun Node YOKSA istek bir kuyrukta bekler — bu yüzden CI\'da Grid\'e paralel gönderilen test sayısı, mevcut Node kapasitesini AŞARSA testler birbirini bekletmeye başlar.', en: 'If no Node is available, the request WAITS in a queue — this is why sending more parallel tests to the Grid than the available Node capacity makes tests start waiting on EACH OTHER.' } },
  ],
}

// 🔗 Grid — Hub/Node süreçlerinin başlatma sırası
const seleniumGridBootOrderStep = {
  type: 'step-animation',
  id: 'selenium-ecosystem-grid-boot-order-step-01',
  title: { tr: 'Adım Adım: Hub Önce mi, Node Önce mi Başlatılır?', en: 'Step by Step: Which Starts First, the Hub or the Node?' },
  steps: [
    { id: 1, icon: '1️⃣', label: { tr: 'Hub İLK ayağa kaldırılır', en: 'The Hub is started FIRST' }, detail: { tr: '`java -jar selenium-server.jar hub` komutu, `localhost:4444` üzerinde istekleri dinleyen KOORDİNATÖR sürecini başlatır — henüz hiçbir Node bağlı DEĞİLDİR.', en: '`java -jar selenium-server.jar hub` starts the COORDINATOR process listening on `localhost:4444` — no Node is connected YET.' } },
    { id: 2, icon: '2️⃣', label: { tr: 'Node Hub\'a KAYIT olur', en: 'The Node REGISTERS with the Hub' }, detail: { tr: '`--hub http://localhost:4444` parametresiyle başlatılan Node, açılışta Hub\'a kendi tarayıcı YETENEKLERİNİ (Chrome, Firefox sürümleri) bildirir.', en: 'A Node started with `--hub http://localhost:4444` announces its browser CAPABILITIES (Chrome, Firefox versions) to the Hub at startup.' } },
    { id: 3, icon: '📋', label: { tr: 'Hub bir KAYIT DEFTERİ tutar', en: 'The Hub keeps a REGISTRY' }, detail: { tr: 'Hub, bağlı TÜM Node\'ları ve onların o anki DOLULUK durumunu (kaç session açık, kaç boş slot var) bir tabloda TUTAR.', en: 'The Hub TRACKS every connected Node and its current OCCUPANCY (how many sessions are open, how many slots are free) in a table.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Sıra ters olursa ne olur?', en: 'What if the order is reversed?' }, detail: { tr: 'Bir Node, Hub HENÜZ AYAKTA değilken başlatılmaya çalışılırsa bağlantı hatası verir — bu yüzden CI script\'lerinde Hub\'ın ayağa kalkması için kısa bir BEKLEME adımı eklenir.', en: 'If a Node tries to start while the Hub is NOT yet up, it throws a connection error — this is why CI scripts add a short WAIT step for the Hub to come up first.' } },
  ],
}

// 🔗 Grid — paralel koşum hız kazancı mekanizması
const seleniumGridParallelStep = {
  type: 'step-animation',
  id: 'selenium-ecosystem-grid-parallel-step-01',
  title: { tr: 'Adım Adım: 200 Test 60 Dakikadan 4 Dakikaya Nasıl İner?', en: 'Step by Step: How 200 Tests Drop From 60 Minutes to 4' },
  steps: [
    { id: 1, icon: '🐌', label: { tr: 'Tek makinede testler SIRAYLA çalışır', en: 'On one machine, tests run SEQUENTIALLY' }, detail: { tr: 'Grid olmadan 200 test, TEK bir tarayıcı process\'inde birbiri ardına çalışır — her test önceki bitmeden BAŞLAYAMAZ.', en: 'Without a Grid, 200 tests run one after another in a SINGLE browser process — no test can START before the previous one finishes.' } },
    { id: 2, icon: '🔀', label: { tr: 'Grid testleri Node\'lara DAĞITIR', en: 'The Grid DISTRIBUTES tests across Nodes' }, detail: { tr: '20 paralel Node varsa, 200 test yaklaşık 10\'ar test gruplarına BÖLÜNÜR ve her Node kendi grubunu AYNI ANDA çalıştırır.', en: 'With 20 parallel Nodes, the 200 tests get SPLIT into groups of roughly 10, and each Node runs its group AT THE SAME TIME.' } },
    { id: 3, icon: '⏱️', label: { tr: 'Toplam süre EN YAVAŞ Node\'a eşittir', en: 'Total time equals the SLOWEST Node' }, detail: { tr: 'Paralel koşumda toplam süre, tüm testlerin TOPLAMI değil, en çok teste sahip Node\'un kendi sırayla çalışma süresidir — bu yüzden 60 dakika 3-4 dakikaya İNER.', en: 'In parallel execution, total time is not the SUM of all tests but the time of the Node with the most tests running sequentially — this is why 60 minutes DROPS to 3–4.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Bedeli: paylaşılan state riski', en: 'The cost: shared-state risk' }, detail: { tr: 'Testler paralel Node\'larda AYNI test veritabanına yazıyorsa, iki testin birbirinin verisini SİLMESİ/bozması riski doğar — paralel koşum, test izolasyonunu ZORUNLU kılar.', en: 'If tests on parallel Nodes write to the SAME test database, one test risks DELETING/corrupting another\'s data — parallel execution makes test isolation MANDATORY.' } },
  ],
}

const s7 = {
  tr: {
    title: '🔗 Ekosistem — TestNG, Maven, Jenkins, Grid',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'Selenium ekosistemi, Java geliştirme zincirinin test otomasyonuna taşınmış halidir: Maven → bağımlılık yönetimi (pom.xml\'e selenium-java eklersin), TestNG → @BeforeMethod/@AfterMethod ile test lifecycle yönetimi (JUnit\'in @BeforeEach/@AfterEach muadili), Jenkins → her commit\'te testleri tetikleyen CI sunucusu, Selenium Grid ise JUnit\'in paralel runner\'ının tarayıcı boyutuna genişlemesi. Peki tek bir bilgisayarda Selenium testleri çalışıyorken neden Grid eklemek gerekiyor? Çünkü 200 E2E test tek bir Node\'da sırayla çalıştığında CI pipeline\'ı 40-60 dakika bloklayabilir; Grid ile bu testler aynı anda 20 paralel Node\'a dağıtılır, toplam süre 3-4 dakikaya düşer. QA ekibi için bu fark somuttur: bir Jenkins job\'ı 60 dakika sürerse geliştiriciler "zaten bekleyemem" deyip commit\'in üzerine commit atmaya başlar, hatalar yığılır ve test sonuçları kimsenin önemsemediği bir rapora dönüşür — hızlı feedback loop, test kültürünün hayatta kalma koşuludur.',
      },
      { type: 'heading', text: 'Selenium Ekosistem Haritası' },
      {
        type: 'visual', variant: 'boxes',
        title: 'Selenium Ekosistemi',
        items: [
          { icon: '🐍', label: 'pytest/unittest', desc: 'Python test runner' },
          { arrow: true },
          { icon: '🟢', label: 'Selenium', desc: 'Browser control', highlight: true },
          { arrow: true },
          { icon: '🌐', label: 'Chrome/FF', desc: 'Gerçek tarayıcı' },
          { icon: '🔧', label: 'Maven/Gradle', desc: 'Build & deps' },
          { arrow: true },
          { icon: '☕', label: 'TestNG/JUnit', desc: 'Java test runner' },
          { arrow: true },
          { icon: '🤖', label: 'Jenkins/GitHub Actions', desc: 'CI/CD' },
          { icon: '📊', label: 'Allure/ExtentReports', desc: 'Raporlama' },
          { arrow: true },
          { icon: '☁️', label: 'Selenium Grid', desc: 'Paralel & remote' },
          { arrow: true },
          { icon: '🖥️', label: 'Farklı OS/Browser', desc: 'Cross-platform' },
        ],
        note: 'Her araç birbirini tamamlar — Selenium sadece ortadaki parça.',
      },
      { type: 'heading', text: '1. TestNG — Java Test Runner' },
      {
        type: 'table',
        headers: ['TestNG Annotation', 'Ne Yapar?', 'JUnit Karşılığı'],
        rows: [
          ['@BeforeSuite', 'Tüm testlerden önce bir kez', '@BeforeAll (JUnit 5)'],
          ['@BeforeClass', 'Her class öncesi bir kez', '@BeforeAll'],
          ['@BeforeMethod', 'Her test metodu öncesi', '@BeforeEach'],
          ['@Test', 'Test metodu', '@Test'],
          ['@AfterMethod', 'Her test sonrası', '@AfterEach'],
          ['@AfterClass', 'Her class sonrası bir kez', '@AfterAll'],
          ['@AfterSuite', 'Tüm testlerden sonra bir kez', '@AfterAll'],
          ['@DataProvider', 'Parametrik test verisi', '@ParameterizedTest'],
        ],
      },
      {
        type: 'code', language: 'java',
        label: 'Java — TestNG Örneği',
        code: `import org.testng.annotations.*;
import org.testng.Assert;

public class LoginTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeClass
    public void setUpClass() {
        System.out.println("Test sınıfı başlıyor...");
    }

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait   = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test(priority = 1, description = "Başarılı giriş testi")
    public void testValidLogin() {
        driver.get("https://automationexercise.com/login");
        driver.findElement(By.cssSelector("input[data-qa='login-email']")).sendKeys("test@test.com");
        driver.findElement(By.cssSelector("input[data-qa='login-password']")).sendKeys("password123");
        driver.findElement(By.cssSelector("button[data-qa='login-button']")).click();
        Assert.assertTrue(driver.getCurrentUrl().contains("/"), "Giriş başarısız!");
    }

    @Test(priority = 2, dataProvider = "loginData", description = "Parametrik giriş testi")
    public void testLoginWithDataProvider(String email, String password, boolean expected) {
        driver.get("https://automationexercise.com/login");
        driver.findElement(By.cssSelector("input[data-qa='login-email']")).sendKeys(email);
        driver.findElement(By.cssSelector("input[data-qa='login-password']")).sendKeys(password);
        driver.findElement(By.cssSelector("button[data-qa='login-button']")).click();
        // assert expected result
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            { "test@test.com", "password123", true },
            { "wrong@test.com", "wrong", false },
            { "", "", false }
        };
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) driver.quit();
    }
}`,
      },
      { type: 'heading', text: '2. Selenium Grid — Paralel & Uzak Testler' },
      {
        type: 'callout', color: 'blue', emoji: '🌐',
        title: 'Selenium Grid Nedir?',
        content: 'Selenium Grid, testleri aynı anda birden fazla makine ve tarayıcıda çalıştırmanızı sağlar. Hub (koordinatör) ve Node (çalıştırıcı) mimarisi kullanır. Selenium 4 Grid 4 ile dağıtık yapı daha da basitleşti.',
      },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Selenium Grid 4 Kurulum',
        code: `# Selenium Grid JAR indir (tek dosya!)
curl -L -o selenium-server.jar https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.25.0/selenium-server-4.25.0.jar

# Hub başlat
java -jar selenium-server.jar hub

# Node başlat (başka terminalde veya makinede)
java -jar selenium-server.jar node --hub http://localhost:4444`,
      },
      seleniumGridBootOrderStep,
      {
        type: 'code', language: 'java',
        label: 'Java — Grid\'e Bağlan (RemoteWebDriver)',
        code: `import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.net.URL;

ChromeOptions options = new ChromeOptions();
options.addArguments("--headless");

WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"),
    options
);

driver.get("https://example.com");
System.out.println(driver.getTitle());
driver.quit();`,
      },
      seleniumGridHubNodeStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Grid',
        code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless")

driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=options
)

driver.get("https://example.com")
print(driver.title)
driver.quit()`,
      },
      seleniumGridParallelStep,
      seleniumGridSpeedupFilm,
      { type: 'heading', text: '3. GitHub Actions CI/CD Entegrasyonu' },
      {
        type: 'code', language: 'yaml',
        label: '.github/workflows/selenium.yml',
        code: `name: Selenium Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  selenium-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Java
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Set up Chrome
        uses: browser-actions/setup-chrome@latest

      - name: Run Selenium Tests
        run: mvn test -Dheadless=true

      - name: Upload Test Reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: target/surefire-reports/`,
      },
      {
        type: 'quiz',
        question: 'TestNG\'de her test metodundan ÖNCE çalışan annotation hangisidir?',
        options: [
          { id: 'a', text: '@BeforeSuite' },
          { id: 'b', text: '@BeforeClass' },
          { id: 'c', text: '@BeforeMethod' },
          { id: 'd', text: '@AfterMethod' },
        ],
        correct: 'c',
        explanation: '@BeforeMethod her @Test metodundan önce çalışır (JUnit\'teki @BeforeEach karşılığı). @BeforeClass sınıf başına bir kez, @BeforeSuite ise tüm suite için bir kez çalışır.',
      
        retryQuestion: {
      "question": "TestNG framework'ünde, test sınıfı içindeki tüm test metotlarından SONRA bir kez çalışacak olan annotation hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "@AfterSuite"
            },
            {
                  "id": "b",
                  "text": "@AfterClass"
            },
            {
                  "id": "c",
                  "text": "@AfterMethod"
            },
            {
                  "id": "d",
                  "text": "@AfterTest"
            }
      ],
      "correct": "b",
      "explanation": "@AfterClass annotation'ı, o sınıf içerisindeki tüm @Test metotları tamamlandıktan sonra bir kez çalışır. @AfterMethod her metodun sonunda, @AfterSuite ise tüm test paketi bittiğinde çalışır."
}
},
    ],
  },
  en: {
    title: '🔗 Ecosystem — TestNG, Maven, Jenkins, Grid',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'The Selenium ecosystem is the Java development toolchain ported to test automation: Maven handles dependency management (you add selenium-java to pom.xml), TestNG manages the test lifecycle with @BeforeMethod/@AfterMethod — the direct equivalent of JUnit\'s @BeforeEach/@AfterEach — Jenkins triggers tests on every commit as the CI server, and Selenium Grid extends JUnit\'s parallel runner into the browser dimension. So if Selenium already runs on a single machine, why bother adding Grid? Because 200 E2E tests executed serially on one Node can block the CI pipeline for 40–60 minutes; with Grid, those same tests are distributed across 20 parallel Nodes and finish in 3–4 minutes. For a QA team, this gap is culturally decisive: when a Jenkins job takes 60 minutes, developers stop waiting for results and stack commit on commit, bugs accumulate, and the test report becomes noise nobody reads — a fast feedback loop is the survival condition for a healthy test culture.',
      },
      { type: 'heading', text: 'TestNG Annotations' },
      {
        type: 'table',
        headers: ['TestNG', 'What It Does', 'JUnit Equivalent'],
        rows: [
          ['@BeforeMethod', 'Before each test method', '@BeforeEach'],
          ['@Test', 'Test method', '@Test'],
          ['@AfterMethod', 'After each test method', '@AfterEach'],
          ['@DataProvider', 'Parameterized test data', '@ParameterizedTest'],
        ],
      },
      { type: 'heading', text: 'Selenium Grid — Parallel & Remote Tests' },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Selenium Grid 4',
        code: `java -jar selenium-server.jar hub
java -jar selenium-server.jar node --hub http://localhost:4444`,
      },
      seleniumGridBootOrderStep,
      {
        type: 'code', language: 'java',
        label: 'Java — RemoteWebDriver',
        code: `WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"),
    new ChromeOptions()
);`,
      },
      seleniumGridHubNodeStep,
      {
        type: 'code', language: 'python',
        label: 'Python — Remote Grid',
        code: `driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=Options()
)`,
      },
      seleniumGridParallelStep,
      seleniumGridSpeedupFilm,
      {
        type: 'quiz',
        question: 'Which TestNG annotation runs BEFORE every test method?',
        options: [
          { id: 'a', text: '@BeforeSuite' },
          { id: 'b', text: '@BeforeClass' },
          { id: 'c', text: '@BeforeMethod' },
          { id: 'd', text: '@AfterMethod' },
        ],
        correct: 'c',
        explanation: '@BeforeMethod runs before every @Test method (equivalent to JUnit\'s @BeforeEach). @BeforeClass runs once per class, @BeforeSuite once for the whole suite.',
      
        retryQuestion: {
      "question": "Which TestNG annotation is executed only once before all test methods in the current class?",
      "options": [
            {
                  "id": "a",
                  "text": "@BeforeTest"
            },
            {
                  "id": "b",
                  "text": "@BeforeClass"
            },
            {
                  "id": "c",
                  "text": "@BeforeMethod"
            },
            {
                  "id": "d",
                  "text": "@BeforeGroups"
            }
      ],
      "correct": "b",
      "explanation": "@BeforeClass runs once before the first test method in the current class is invoked. In contrast, @BeforeMethod runs before every single @Test method, and @BeforeTest runs before all methods in the <test> tag of the XML suite."
}
},
    ],
  },
}

// ─── S8: CDP & BIDI ──────────────────────────────────────────────────────────
// 🌐 CDP — DevTools session ve event listener akışı
const seleniumCdpSessionStep = {
  type: 'step-animation',
  id: 'selenium-cdp-session-listener-step-01',
  title: { tr: 'Adım Adım: createSession() ile addListener() Arasında Ne Olur?', en: 'Step by Step: What Happens Between createSession() and addListener()' },
  steps: [
    { id: 1, icon: '🔌', label: { tr: 'getDevTools() bir WebSocket TÜNELİ açar', en: 'getDevTools() opens a WebSocket TUNNEL' }, detail: { tr: '`driver.getDevTools()`, standart HTTP WebDriver protokolünden AYRI, tarayıcıyla doğrudan bir WebSocket bağlantısı KURAR.', en: '`driver.getDevTools()` establishes a WebSocket connection DIRECTLY with the browser, SEPARATE from the standard HTTP WebDriver protocol.' } },
    { id: 2, icon: '🎬', label: { tr: 'createSession() CDP\'yi AKTİFLEŞTİRİR', en: 'createSession() ACTIVATES CDP' }, detail: { tr: '`devTools.createSession()` çağrılmadan CDP komutları hiçbir şey YAPMAZ — bu çağrı, tarayıcının Chrome DevTools Protokolü\'nü DİNLEMEYE başlamasını sağlar.', en: 'Without `devTools.createSession()`, CDP commands do NOTHING — this call makes the browser start LISTENING via the Chrome DevTools Protocol.' } },
    { id: 3, icon: '📡', label: { tr: 'Log.enable() belirli bir DOMAIN\'i açar', en: 'Log.enable() turns on a specific DOMAIN' }, detail: { tr: '`devTools.send(Log.enable())`, CDP\'nin onlarca domain\'inden (Network, Page, Log...) sadece "Log" domain\'ini AKTİF eder — gereksiz event trafiğini önler.', en: '`devTools.send(Log.enable())` activates ONLY the "Log" domain among CDP\'s dozens of domains (Network, Page, Log...) — this avoids unnecessary event traffic.' } },
    { id: 4, icon: '🔁', label: { tr: 'Listener ASENKRON tetiklenir', en: 'The listener fires ASYNCHRONOUSLY' }, detail: { tr: '`addListener(Log.entryAdded(), ...)` içindeki kod, test ana akışıyla AYNI ANDA değil, tarayıcıda bir log oluştuğu HER an arka planda tetiklenir.', en: 'The code inside `addListener(Log.entryAdded(), ...)` fires in the background WHENEVER a log occurs in the browser — not in lockstep with the test\'s main flow.' } },
  ],
}

// 🌐 CDP — network interception ve mock yanıt akışı
const seleniumNetworkInterceptStep = {
  type: 'step-animation',
  id: 'selenium-cdp-network-intercept-step-01',
  title: { tr: 'Adım Adım: NetworkInterceptor Gerçek API Çağrısını Nasıl Durdurur?', en: 'Step by Step: How NetworkInterceptor Stops a Real API Call' },
  steps: [
    { id: 1, icon: '🕸️', label: { tr: 'Route.matching() bir FİLTRE tanımlar', en: 'Route.matching() defines a FILTER' }, detail: { tr: '`Route.matching(req -> req.getUri().contains("/api/user"))`, sadece belirtilen URL desenine uyan istekleri YAKALAMAK için bir kural tanımlar — diğer istekler ETKİLENMEZ.', en: '`Route.matching(req -> req.getUri().contains("/api/user"))` defines a rule to CATCH only requests matching the given URL pattern — other requests are UNAFFECTED.' } },
    { id: 2, icon: '🚧', label: { tr: 'İstek tarayıcıdan ÇIKMADAN yakalanır', en: 'The request is caught BEFORE it leaves the browser' }, detail: { tr: 'Gerçek bir ağ isteği backend\'e ULAŞMADAN önce interceptor bu isteği KESER — backend sunucusu bu isteğin varlığından bile HABERDAR OLMAZ.', en: 'The interceptor INTERCEPTS the request before it ever REACHES the backend — the backend server never even KNOWS the request existed.' } },
    { id: 3, icon: '🎭', label: { tr: 'Sahte HttpResponse GERİ döner', en: 'A fake HttpResponse is returned INSTEAD' }, detail: { tr: '`.to(() -> req -> new HttpResponse().setStatus(200)...)`, tarayıcıya sanki gerçek backend cevap vermiş gibi ÖNCEDEN hazırlanmış bir JSON döner.', en: '`.to(() -> req -> new HttpResponse().setStatus(200)...)` returns a PRE-BUILT JSON to the browser, as if the real backend had responded.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Neden gerçek API yerine bu tercih edilir?', en: 'Why prefer this over the real API?' }, detail: { tr: 'Backend henüz hazır olmasa, yavaş olsa veya nadir bir hata durumunu (500, boş liste) simüle etmen gereksin — mock yanıt, testi GERÇEK backend\'den TAMAMEN bağımsız kılar.', en: 'The backend might not be ready yet, might be slow, or you may need to simulate a rare error case (500, empty list) — a mock response makes the test FULLY INDEPENDENT of the real backend.' } },
  ],
}

const s8 = {
  tr: {
    title: '🌐 Chrome DevTools (CDP) & WebDriver BiDi',
    blocks: [
      {
        type: 'simple-box', emoji: '📡',
        content: 'Selenium 4 öncesinde WebDriver ile tarayıcı iletişimi tek yönlüydü: test kodu komut gönderir, tarayıcı uygular, sonucu HTTP response olarak döner — tıpkı Java\'da klasik blocking REST çağrısı gibi. WebDriver BiDi (Bidirectional Protocol) ise bu ilişkiyi kalıcı bir WebSocket tüneline dönüştürür: Java\'daki CompletableFuture + event listener mimarisine benzer şekilde, tarayıcıdan gerçek zamanlı event\'ler dinleyebilirsin (konsol hatası oluştu, ağ isteği kesildi, JavaScript exception fırladı). Peki HTTP tabanlı WebDriver çalışıyorken neden BiDi\'ye ihtiyaç var? Çünkü bazı test senaryoları "bir şey olduğunda tepki ver" gerektirir: authentication dialog\'u açıldığında bunu tespit et, broken image için network failure event\'ini yakala, console.error() çıktısını CI log\'una yaz. Bunlar klasik WebDriver ile yapılamaz. QA için somut kazanım: BiDi sayesinde "JavaScript hatası olan tüm sayfaları tespit et" gibi bir assertion artık mümkün; kaynak kodunu değiştirmeden her E2E testin yanına otomatik JS error monitoring ekleyebilirsin ve production\'a çıkmadan önce sessiz JavaScript exception\'larını yakalayabilirsin.',
      },
      {
        type: 'text',
        content: 'Selenium 4 ile birlikte tarayıcıyla çift yönlü iletişim kurabilen WebSocket tabanlı W3C WebDriver BiDi protokolü ve Chrome DevTools Protokolü (CDP) entegrasyonu gelmiştir. Bu sayede test kodumuz tarayıcıdaki olayları anlık olarak dinleyebilir, ağ isteklerini manipüle edebilir ve tarayıcı davranışlarını değiştirebilir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java ile BiDi & CDP Kullanımı:',
        content: 'Java\'da CDP için `driver.getDevTools()` üzerinden session başlatılır. BiDi için ise `LogInspector` veya `NetworkInterceptor` gibi üst seviye sınıflar kullanılarak WebSocket bağlantısı yönetilir. Bu, Playwright\'ın en güçlü yönü olan event-driven yapıyı Selenium\'a kazandırır.',
      },
      {
        type: 'heading', text: '1. Console Log & JS Exception Dinleme'
      },
      {
        type: 'text',
        content: 'Tarayıcıda oluşan JavaScript hatalarını veya `console.log` çıktılarını gerçek zamanlı yakalamak için Selenium 4 BiDi `LogInspector` kullanılır. Bu, UI testleri çalışırken arka planda sinsi JS hatalarının yakalanmasını sağlar.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Console Log Dinleme',
        code: `import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v125.log.Log;

ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

// CDP ile konsol loglarını dinle
devTools.send(Log.enable());
devTools.addListener(Log.entryAdded(), logEntry -> {
    System.out.println("Console Log: " + logEntry.getText());
    System.out.println("Level: " + logEntry.getLevel());
});

driver.get("https://example.com");`,
      },
      seleniumCdpSessionStep,
      seleniumBidiListenerFilm,
      {
        type: 'heading', text: '2. Network Interception (API Mocking)'
      },
      {
        type: 'text',
        content: 'NetworkInterceptor yardımıyla tarayıcıdan giden HTTP istekleri ve gelen yanıtlar durdurulabilir (intercept). Bu sayede API\'leri taklit edebilir (mock), giden header\'ları değiştirebilir veya Basic Authentication pencerelerini otomatik geçebiliriz.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — API Mocking (NetworkInterceptor)',
        code: `import org.openqa.selenium.devtools.NetworkInterceptor;
import org.openqa.selenium.remote.http.Route;
import org.openqa.selenium.remote.http.HttpResponse;
import static org.openqa.selenium.remote.http.Contents.utf8String;

// API isteğini yakala ve mock yanıt dön
try (NetworkInterceptor interceptor = new NetworkInterceptor(
        driver,
        Route.matching(req -> req.getUri().contains("/api/user"))
             .to(() -> req -> new HttpResponse()
                 .setStatus(200)
                 .addHeader("Content-Type", "application/json")
                 .setContent(utf8String("{\\"name\\": \\"Mocked User\\", \\"role\\": \\"QA\\"}"))))) {

    driver.get("https://example.com/profile");
    // Sayfada mock verilerin göründüğünü doğrula
}`,
      },
      seleniumNetworkInterceptStep,
      {
        type: 'heading', text: '3. Geolocation & Device Emulation'
      },
      {
        type: 'text',
        content: 'CDP komutları doğrudan çalıştırılarak tarayıcının GPS konumu değiştirilebilir (Geolocation Override) veya farklı mobil cihaz ekran boyutları simüle edilebilir (Device Emulation).',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Konum Değiştirme (CDP)',
        code: `import java.util.Map;
import org.openqa.selenium.chrome.ChromeDriver;

ChromeDriver driver = new ChromeDriver();
// Paris koordinatları
Map<String, Object> coordinates = Map.of(
    "latitude", 48.8566,
    "longitude", 2.3522,
    "accuracy", 1
);

driver.executeCdpCommand("Emulation.setGeolocationOverride", coordinates);
driver.get("https://www.google.com/maps");`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-bidi-cdp',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumBidiPractice',
        title: { tr: 'Pratik: CDP ile Console Listener Ekle', en: 'Practice: Add Console Listener with CDP' },
        description: {
            tr: 'Selenium 4 Java projesinde CDP ile console loglarını dinlemek için komutları doğru sıraya koyun.',
            en: 'Order the commands to listen to console logs using CDP in a Selenium 4 Java project.'
        },
        steps: [
            { code: 'ChromeDriver driver = new ChromeDriver();', desc: { tr: 'Tarayıcıyı başlat', en: 'Start the browser' } },
            { code: 'DevTools devTools = driver.getDevTools();', desc: { tr: 'DevTools nesnesini al', en: 'Get DevTools object' } },
            { code: 'devTools.createSession();', desc: { tr: 'CDP oturumu oluştur', en: 'Create CDP session' } },
            { code: 'devTools.send(Log.enable());', desc: { tr: 'Log dinlemeyi aktif et', en: 'Enable log listening' } },
            { code: 'devTools.addListener(Log.entryAdded(), entry -> System.out.println(entry.getText()));', desc: { tr: 'Log eklenme olayını dinle', en: 'Add listener for log entry' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! CDP console listener\'ı başarıyla kurdunuz. Artık tarayıcıdaki tüm JS hataları test raporunuza eklenecektir.',
            en: '✓ Congratulations! You successfully set up the CDP console listener. All JS errors in the browser will now be captured in your test report.'
        }
      },
      {
        type: 'quiz',
        question: 'WebDriver BiDi protokolü tarayıcıyla hangi iletişim türünü kullanır?',
        options: [
          { id: 'a', text: 'Tek yönlü HTTP istekleri' },
          { id: 'b', text: 'WebSocket tabanlı çift yönlü iletişim' },
          { id: 'c', text: 'FTP' },
          { id: 'd', text: 'gRPC' },
        ],
        correct: 'b',
        explanation: 'BiDi, "bidirectional" (çift yönlü) anlamına gelir — WebSocket üzerinden tarayıcıyla anlık, çift yönlü iletişim kurar. Bu sayede console log\'ları veya network isteklerini canlı dinleyebiliriz, klasik HTTP request-response modelinin aksine.',
      
        retryQuestion: {
      "question": {
            "tr": "WebDriver BiDi protokolü, klasik HTTP tabanlı komutların aksine hangi avantajı sağlar?",
            "en": "What advantage does the WebDriver BiDi protocol provide over classic HTTP-based commands?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Daha hızlı dosya transferi",
                        "en": "Faster file transfer"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Tarayıcı olaylarını gerçek zamanlı dinleme",
                        "en": "Real-time listening of browser events"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Daha güvenli şifreleme",
                        "en": "More secure encryption"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Daha düşük bellek kullanımı",
                        "en": "Lower memory usage"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "BiDi (Bidirectional), tarayıcıya sadece komut göndermekle kalmaz, aynı zamanda tarayıcıdan gelen olayları (loglar, network verileri vb.) eş zamanlı (real-time) dinlemenize olanak tanır. HTTP modelinde istemci bir şey sormadan sunucu cevap veremez, WebSocket ise bu engeli kaldırır.",
            "en": "BiDi (Bidirectional) allows not only sending commands but also listening to events (logs, network traffic, etc.) from the browser in real-time. In the HTTP model, the server cannot respond unless the client initiates a request, whereas WebSocket removes this limitation."
      }
}
},
    ],
  },
  en: {
    title: '🌐 Chrome DevTools (CDP) & WebDriver BiDi',
    blocks: [
      {
        type: 'simple-box', emoji: '📡',
        content: 'Before Selenium 4, WebDriver communication with the browser was strictly one-directional: test code sends a command, the browser executes it, the result comes back as an HTTP response — identical to a classical blocking REST call in Java. WebDriver BiDi (Bidirectional Protocol) converts this into a persistent WebSocket tunnel: similar to a Java CompletableFuture + event listener architecture, you can now receive real-time events pushed from the browser (console error fired, network request intercepted, JavaScript exception thrown). If HTTP-based WebDriver already works, why does BiDi matter? Because certain test scenarios require reacting to events as they happen: detect when an authentication dialog appears, capture a network failure event for a broken image, pipe console.error() output into your CI log. None of this is possible with classic WebDriver. The concrete QA gain: with BiDi you can add "assert no JavaScript errors occurred during this page interaction" to every E2E test without touching the source code — effectively catching silent JavaScript exceptions before they reach production.',
      },
      {
        type: 'text',
        content: 'Selenium 4 introduces the W3C WebDriver BiDi protocol and Chrome DevTools Protocol (CDP) integrations, allowing bidirectional WebSocket communication. This enables your test code to listen to browser events, intercept network requests, and modify browser behaviors in real time.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'CDP & BiDi in Java:',
        content: 'In Java, CDP sessions are initialized via `driver.getDevTools()`. For BiDi, high-level helper classes like `LogInspector` or `NetworkInterceptor` manage the WebSocket connection automatically, closing the gap with Playwright\'s event-driven architecture.',
      },
      {
        type: 'heading', text: '1. Console Log & JS Exception Listening'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Console Log Listener',
        code: `import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v125.log.Log;

ChromeDriver driver = new ChromeDriver();
DevTools devTools = driver.getDevTools();
devTools.createSession();

devTools.send(Log.enable());
devTools.addListener(Log.entryAdded(), logEntry -> {
    System.out.println("Console Log: " + logEntry.getText());
    System.out.println("Level: " + logEntry.getLevel());
});

driver.get("https://example.com");`,
      },
      seleniumCdpSessionStep,
      seleniumBidiListenerFilm,
      {
        type: 'heading', text: '2. Network Interception (API Mocking)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — API Mocking with NetworkInterceptor',
        code: `import org.openqa.selenium.devtools.NetworkInterceptor;
import org.openqa.selenium.remote.http.Route;
import org.openqa.selenium.remote.http.HttpResponse;
import static org.openqa.selenium.remote.http.Contents.utf8String;

try (NetworkInterceptor interceptor = new NetworkInterceptor(
        driver,
        Route.matching(req -> req.getUri().contains("/api/user"))
             .to(() -> req -> new HttpResponse()
                 .setStatus(200)
                 .addHeader("Content-Type", "application/json")
                 .setContent(utf8String("{\\"name\\": \\"Mocked User\\", \\"role\\": \\"QA\\"}"))))) {

    driver.get("https://example.com/profile");
}`,
      },
      seleniumNetworkInterceptStep,
      {
        type: 'heading', text: '3. Geolocation & Device Emulation'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Override Geolocation via CDP',
        code: `import java.util.Map;
import org.openqa.selenium.chrome.ChromeDriver;

Map<String, Object> coordinates = Map.of(
    "latitude", 48.8566,
    "longitude", 2.3522,
    "accuracy", 1
);

driver.executeCdpCommand("Emulation.setGeolocationOverride", coordinates);
driver.get("https://www.google.com/maps");`,
      },
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-bidi-cdp',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumBidiPractice',
        title: { tr: 'Pratik: CDP ile Console Listener Ekle', en: 'Practice: Add Console Listener with CDP' },
        description: {
            tr: 'Selenium 4 Java projesinde CDP ile console loglarını dinlemek için komutları doğru sıraya koyun.',
            en: 'Order the commands to listen to console logs using CDP in a Selenium 4 Java project.'
        },
        steps: [
            { code: 'ChromeDriver driver = new ChromeDriver();', desc: { tr: 'Tarayıcıyı başlat', en: 'Start the browser' } },
            { code: 'DevTools devTools = driver.getDevTools();', desc: { tr: 'DevTools nesnesini al', en: 'Get DevTools object' } },
            { code: 'devTools.createSession();', desc: { tr: 'CDP oturumu oluştur', en: 'Create CDP session' } },
            { code: 'devTools.send(Log.enable());', desc: { tr: 'Log dinlemeyi aktif et', en: 'Enable log listening' } },
            { code: 'devTools.addListener(Log.entryAdded(), entry -> System.out.println(entry.getText()));', desc: { tr: 'Log eklenme olayını dinle', en: 'Add listener for log entry' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! CDP console listener\'ı başarıyla kurdunuz. Artık tarayıcıdaki tüm JS hataları test raporunuza eklenecektir.',
            en: '✓ Congratulations! You successfully set up the CDP console listener. All JS errors in the browser will now be captured in your test report.'
        }
      },
      {
        type: 'quiz',
        question: 'What kind of communication does the WebDriver BiDi protocol use with the browser?',
        options: [
          { id: 'a', text: 'One-way HTTP requests' },
          { id: 'b', text: 'Bidirectional WebSocket communication' },
          { id: 'c', text: 'FTP' },
          { id: 'd', text: 'gRPC' },
        ],
        correct: 'b',
        explanation: 'BiDi stands for "bidirectional" — it uses WebSocket for real-time, two-way communication with the browser, letting you listen to console logs or network requests live, unlike the classic HTTP request-response model.',
      
        retryQuestion: {
      "question": "If you want to receive push notifications from the browser about console errors while a script is running, which protocol enables this functionality?",
      "options": [
            {
                  "id": "a",
                  "text": "REST API"
            },
            {
                  "id": "b",
                  "text": "WebDriver BiDi"
            },
            {
                  "id": "c",
                  "text": "Legacy WebDriver JSON Wire Protocol"
            },
            {
                  "id": "d",
                  "text": "gRPC"
            }
      ],
      "correct": "b",
      "explanation": "The WebDriver BiDi protocol is specifically designed for bidirectional communication using WebSockets. This allows the browser to send data back to the automation client (like console logs or network events) without the client explicitly requesting it, which is not possible with older, request-response based protocols."
}
},
    ],
  },
}

// ─── S9: VIRTUAL AUTHENTICATOR & ADVANCED FEATURES ───────────────────────────
// 🔐 Print API — headless PDF üretim akışı
const seleniumPdfPrintStep = {
  type: 'step-animation',
  id: 'selenium-advanced-pdf-print-step-01',
  title: { tr: 'Adım Adım: printer.print() Bir PDF Dosyasını Nasıl Üretir?', en: 'Step by Step: How printer.print() Produces a PDF File' },
  steps: [
    { id: 1, icon: '🖥️', label: { tr: 'Headless mod ZORUNLUDUR', en: 'Headless mode is MANDATORY' }, detail: { tr: 'Print API, tarayıcının ekransız (headless) çalışan render motorunu kullanır — normal (headed) modda `print()` çağrısı ÇALIŞMAZ.', en: 'The Print API uses the browser\'s headless rendering engine — calling `print()` in normal (headed) mode does NOT work.' } },
    { id: 2, icon: '📐', label: { tr: 'PrintOptions SAYFA aralığını belirler', en: 'PrintOptions defines the PAGE range' }, detail: { tr: '`printOptions.setPageRanges("1-2")`, tüm sayfayı değil, SADECE belirtilen sayfa aralığını PDF\'e dahil eder — büyük raporlarda test süresini kısaltır.', en: '`printOptions.setPageRanges("1-2")` includes ONLY the specified page range in the PDF, not the whole document — this shortens test time for large reports.' } },
    { id: 3, icon: '🔢', label: { tr: 'Sonuç Base64 STRING olarak döner', en: 'The result comes back as a Base64 STRING' }, detail: { tr: '`printer.print(printOptions)`, ham bir dosya değil, PDF içeriğinin Base64 KODLANMIŞ bir metin temsilini döndürür.', en: '`printer.print(printOptions)` returns not a raw file, but a Base64-ENCODED text representation of the PDF content.' } },
    { id: 4, icon: '💾', label: { tr: 'Decode edilip DİSKE yazılır', en: 'It is decoded and WRITTEN to disk' }, detail: { tr: '`Base64.getDecoder().decode(pdf.getContent())`, bu metni gerçek binary PDF byte\'larına çevirir; `Files.write()` bunu diske GERÇEK bir .pdf dosyası olarak kaydeder.', en: '`Base64.getDecoder().decode(pdf.getContent())` converts this text back into real binary PDF bytes; `Files.write()` saves it to disk as an ACTUAL .pdf file.' } },
  ],
}

// 🔐 Wheel/Pen Actions — kaydırma origin mekanizması
const seleniumWheelScrollStep = {
  type: 'step-animation',
  id: 'selenium-advanced-wheel-scroll-step-01',
  title: { tr: 'Adım Adım: scrollFromOrigin() Neden Sadece scrollBy()\'den Daha Güçlüdür?', en: 'Step by Step: Why scrollFromOrigin() Is More Powerful Than a Plain scrollBy()' },
  steps: [
    { id: 1, icon: '📍', label: { tr: 'ScrollOrigin bir BAŞLANGIÇ noktası tanımlar', en: 'ScrollOrigin defines a STARTING point' }, detail: { tr: '`WheelInput.ScrollOrigin.fromElement(footerElement)`, kaydırmanın sayfanın en üstünden değil, BELİRLİ bir elementin konumundan başlamasını sağlar.', en: '`WheelInput.ScrollOrigin.fromElement(footerElement)` makes the scroll start from a SPECIFIC element\'s position, not from the top of the page.' } },
    { id: 2, icon: '🖱️', label: { tr: 'Bu GERÇEK bir fare tekerleği olayıdır', en: 'This IS a real mouse wheel event' }, detail: { tr: '`scrollFromOrigin()`, JavaScript `window.scrollTo()` çağırmaz — GERÇEK bir mouse wheel donanım olayını simüle eder, tıpkı kullanıcı fareyi çevirmiş gibi.', en: '`scrollFromOrigin()` does not call JavaScript `window.scrollTo()` — it simulates a REAL mouse wheel hardware event, just as if a user physically turned the wheel.' } },
    { id: 3, icon: '🎯', label: { tr: 'Neden bu fark ÖNEMLİDİR?', en: 'Why does this difference MATTER?' }, detail: { tr: 'Bazı UI bileşenleri (sonsuz kaydırma listeleri, custom scroll container\'lar) SADECE gerçek wheel event\'ine tepki veren bir JS listener\'a sahiptir — `executeScript` ile kaydırma bu bileşenleri TETİKLEMEZ.', en: 'Some UI components (infinite-scroll lists, custom scroll containers) have a JS listener that reacts ONLY to real wheel events — scrolling via `executeScript` does NOT trigger these components.' } },
    { id: 4, icon: '📏', label: { tr: 'Piksel miktarı KESİNDİR', en: 'The pixel amount is EXACT' }, detail: { tr: '`.scrollFromOrigin(scrollOrigin, 0, 200)`, x ekseninde 0, y ekseninde TAM 200 piksel kaydırma yapar — test, "sayfanın sonuna kadar" gibi belirsiz bir hedef yerine KESİN bir mesafeyi doğrulayabilir.', en: '`.scrollFromOrigin(scrollOrigin, 0, 200)` scrolls 0 pixels on the x-axis and EXACTLY 200 on the y-axis — the test can verify an EXACT distance instead of a vague target like "to the bottom of the page".' } },
  ],
}

const s9 = {
  tr: {
    title: '🔐 Sanal Auth & Gelişmiş Özellikler',
    blocks: [
      {
        type: 'simple-box', emoji: '🔑',
        content: 'Virtual Authenticator, WebAuthn (FIDO2/Passkey) akışlarını test etmek için Selenium\'un CI ortamına enjekte ettiği yazılım tabanlı bir donanım simülatörüdür — tıpkı Java testlerinde gerçek veritabanı yerine H2 in-memory DB kullanmak gibi: arayüz aynı, alttaki implementasyon test için değiştirilmiş. Peki Mockito ile servis katmanını mock\'layabiliyorken neden tarayıcı testinde fiziksel donanım simülasyonu gerekiyor? Çünkü Passkey doğrulaması uygulama kodunda değil, tarayıcının WebAuthn API\'sinde gerçekleşir; bu API\'yi Mockito ile mock\'layamazsın, tarayıcıya "sanal bir authenticator var" demen gerekir. Java\'da addVirtualAuthenticator(options) ile eklenen bu sanal cihaz, gerçek USB key yerine geçer ve FIDO2 akışını uçtan uca tetikler. QA açısından kritik senaryo: şirket "password\'ları kaldırıyoruz, Passkey geçiyoruz" kararını uygulamaya koyduğunda, giriş akışının regresyon testi artık fiziksel USB dongle olmadan CI pipeline\'ında otomatik çalışabilir — Virtual Authenticator olmadan bu test sadece manuel yapılabilir, otomasyon boşluğu kalır.',
      },
      {
        type: 'text',
        content: 'Selenium 4, WebAuthn (Passkeys, FIDO2) testlerini desteklemek için Virtual Authenticator API sunar. Ayrıca tarayıcı pencerelerini PDF olarak kaydetmeyi sağlayan Print API\'si ve hassas mouse-wheel/stylus eylemleri için Pen & Wheel Actions API\'si bu sürümle gelen diğer gelişmiş özelliklerdir.',
      },
      {
        type: 'heading', text: '1. Virtual Authenticator (WebAuthn / Passkeys)'
      },
      {
        type: 'text',
        content: 'Sanal bir kimlik doğrulayıcı ekleyerek iki adımlı güvenlik (2FA) veya Passkey giriş akışlarını simüle edebiliriz. Java\'da `HasVirtualAuthenticator` arayüzü ile yönetilir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Virtual Authenticator Kurulumu',
        code: `import org.openqa.selenium.virtualauthenticator.HasVirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticatorOptions;

HasVirtualAuthenticator authDriver = (HasVirtualAuthenticator) driver;
VirtualAuthenticatorOptions options = new VirtualAuthenticatorOptions();
options.setProtocol(VirtualAuthenticatorOptions.Protocol.CTAP2)
       .setTransport(VirtualAuthenticatorOptions.Transport.USB)
       .setHasUserVerification(true)
       .setIsUserVerified(true);

// Sanal kimlik doğrulayıcı oluştur
VirtualAuthenticator authenticator = authDriver.addVirtualAuthenticator(options);

driver.get("https://webauthn.io");
// Passkey kaydı ve giriş işlemlerini yap...
authDriver.removeVirtualAuthenticator(authenticator);`,
      },
      seleniumVirtualAuthFilm,
      {
        type: 'heading', text: '2. Print Page (Headless PDF Kaydetme)'
      },
      {
        type: 'text',
        content: 'Fatura, makbuz veya rapor sayfalarını PDF formatında yazdırmak ve doğrulamak için `PrintsPage` arayüzü kullanılır. Bu özellik tarayıcının headless (ekransız) modda çalışmasını gerektirir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Sayfayı PDF Olarak Kaydetme',
        code: `import org.openqa.selenium.print.PrintOptions;
import org.openqa.selenium.PrintsPage;
import org.openqa.selenium.Pdf;
import java.nio.file.Files;
import java.nio.file.Paths;

// Headless modda ChromeOptions ayarlanmalıdır!
PrintsPage printer = (PrintsPage) driver;
PrintOptions printOptions = new PrintOptions();
printOptions.setPageRanges("1-2"); // Sadece ilk iki sayfayı yazdır

Pdf pdf = printer.print(printOptions);
Files.write(Paths.get("fatura.pdf"), Base64.getDecoder().decode(pdf.getContent()));`,
      },
      seleniumPdfPrintStep,
      {
        type: 'heading', text: '3. Pen & Wheel Actions (Hassas Kaydırma)'
      },
      {
        type: 'text',
        content: 'Actions API ile artık farenin tekerleğini (scroll wheel) veya dijital kalemi (pen/stylus) simüle edebilirsiniz. Belirli bir piksel miktarında veya elemente göre scroll işlemleri yapılabilir.',
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Wheel Scroll & Pen Input',
        code: `import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.interactions.WheelInput;

// Sayfayı bir elementten itibaren 200 piksel aşağı kaydır
WheelInput.ScrollOrigin scrollOrigin = WheelInput.ScrollOrigin.fromElement(footerElement);
new Actions(driver)
    .scrollFromOrigin(scrollOrigin, 0, 200)
    .perform();`,
      },
      seleniumWheelScrollStep,
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-virtual-auth',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumVirtualAuthPractice',
        title: { tr: 'Pratik: Sayfa PDF Çıktısı Alma', en: 'Practice: Get Page PDF Output' },
        description: {
            tr: 'Selenium 4 projesinde bir web sayfasını PDF olarak kaydetmek için adımları doğru sıraya koyun.',
            en: 'Order the steps to print a web page to PDF in a Selenium 4 project.'
        },
        steps: [
            { code: 'PrintsPage printer = (PrintsPage) driver;', desc: { tr: 'Sürücüyü PrintsPage tipine cast et', en: 'Cast driver to PrintsPage' } },
            { code: 'PrintOptions options = new PrintOptions();', desc: { tr: 'Yazdırma seçeneklerini oluştur', en: 'Create PrintOptions' } },
            { code: 'options.setPageRanges("1");', desc: { tr: 'İlk sayfayı basmak için filtre koy', en: 'Set range to print first page' } },
            { code: 'Pdf pdf = printer.print(options);', desc: { tr: 'PDF çıktısı üret', en: 'Generate PDF output' } },
            { code: 'Files.write(Paths.get("test.pdf"), Base64.getDecoder().decode(pdf.getContent()));', desc: { tr: 'PDF dosyasını diske yaz', en: 'Write PDF to disk' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Print API adımlarını başarıyla sıraladınız. Artık fatura sayfalarını otomatik test edebilirsiniz.',
            en: '✓ Congratulations! You correctly ordered the Print API steps. You can now test invoice pages automatically.'
        }
      },
      {
        type: 'quiz',
        question: 'Bir web sayfasını headless modda PDF olarak kaydetmek için hangi arayüz kullanılır?',
        options: [
          { id: 'a', text: 'HasVirtualAuthenticator' },
          { id: 'b', text: 'PrintsPage' },
          { id: 'c', text: 'WheelInput' },
          { id: 'd', text: 'NetworkInterceptor' },
        ],
        correct: 'b',
        explanation: 'PrintsPage arayüzünün print() metodu sayfayı PDF formatında dışa aktarır ve headless (ekransız) tarayıcı modu gerektirir. HasVirtualAuthenticator ise WebAuthn/Passkey testleri için kullanılır.',
      
        retryQuestion: {
      "question": "Headless tarayıcıda bir web sayfasının görüntüsünü veya PDF çıktısını almak için kullanılan spesifik arayüz hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "TakeScreenshot"
            },
            {
                  "id": "b",
                  "text": "PrintsPage"
            },
            {
                  "id": "c",
                  "text": "BrowserContext"
            },
            {
                  "id": "d",
                  "text": "DevToolsSession"
            }
      ],
      "correct": "b",
      "explanation": "PrintsPage arayüzü, web sayfalarını PDF'e yazdırmak için gerekli olan print() metodunu sağlar. Diğer seçenekler ekran görüntüsü alma veya oturum yönetimi ile ilgilidir, PDF dışa aktarma fonksiyonuna sahip değildir."
}
},
    ],
  },
  en: {
    title: '🔐 Virtual Authenticator & Advanced Features',
    blocks: [
      {
        type: 'simple-box', emoji: '🔑',
        content: 'Virtual Authenticator is a software-based hardware simulator that Selenium injects into the browser for testing WebAuthn (FIDO2/Passkey) flows — exactly like using an H2 in-memory database instead of a real database in Java tests: the interface is identical, only the underlying implementation is swapped for the test context. If you can already mock the service layer with Mockito, why do you need a hardware simulator at the browser level? Because Passkey authentication happens inside the browser\'s own WebAuthn API, not in your application code — you cannot Mockito-mock a browser API; instead, you must tell the browser "a virtual authenticator is present." In Java you call addVirtualAuthenticator(options) to inject the virtual device, which replaces the physical USB security key and drives the full FIDO2 flow end-to-end. The critical QA scenario: when your company decides to drop passwords in favor of Passkeys, regression tests for the login flow can now run automatically in a CI pipeline without a physical dongle — without Virtual Authenticator, this test category can only be executed manually, leaving a permanent gap in your automation coverage.',
      },
      {
        type: 'text',
        content: 'Selenium 4 introduces the Virtual Authenticator API to support WebAuthn (Passkeys, FIDO2) testing. It also features a new Print API for saving pages as PDFs, and Pen & Wheel Actions for advanced stylus and scroll-wheel gestures.',
      },
      {
        type: 'heading', text: '1. Virtual Authenticator (WebAuthn / Passkeys)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Setting up a Virtual Authenticator',
        code: `import org.openqa.selenium.virtualauthenticator.HasVirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticator;
import org.openqa.selenium.virtualauthenticator.VirtualAuthenticatorOptions;

HasVirtualAuthenticator authDriver = (HasVirtualAuthenticator) driver;
VirtualAuthenticatorOptions options = new VirtualAuthenticatorOptions();
options.setProtocol(VirtualAuthenticatorOptions.Protocol.CTAP2)
       .setTransport(VirtualAuthenticatorOptions.Transport.USB)
       .setHasUserVerification(true)
       .setIsUserVerified(true);

VirtualAuthenticator authenticator = authDriver.addVirtualAuthenticator(options);
driver.get("https://webauthn.io");
// Perform passkey registration/login tests...
authDriver.removeVirtualAuthenticator(authenticator);`,
      },
      seleniumVirtualAuthFilm,
      {
        type: 'heading', text: '2. Print Page (Headless PDF Export)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Saving Page to PDF',
        code: `import org.openqa.selenium.print.PrintOptions;
import org.openqa.selenium.PrintsPage;
import org.openqa.selenium.Pdf;
import java.nio.file.Files;
import java.nio.file.Paths;

// Note: Requires headless mode configuration in ChromeOptions!
PrintsPage printer = (PrintsPage) driver;
PrintOptions printOptions = new PrintOptions();
printOptions.setPageRanges("1-2");

Pdf pdf = printer.print(printOptions);
Files.write(Paths.get("invoice.pdf"), Base64.getDecoder().decode(pdf.getContent()));`,
      },
      seleniumPdfPrintStep,
      {
        type: 'heading', text: '3. Pen & Wheel Actions (Precise Scrolling)'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — Wheel Scroll Gestures',
        code: `import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.interactions.WheelInput;

WheelInput.ScrollOrigin scrollOrigin = WheelInput.ScrollOrigin.fromElement(footerElement);
new Actions(driver)
    .scrollFromOrigin(scrollOrigin, 0, 200)
    .perform();`,
      },
      seleniumWheelScrollStep,
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-virtual-auth',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumVirtualAuthPractice',
        title: { tr: 'Pratik: Sayfa PDF Çıktısı Alma', en: 'Practice: Get Page PDF Output' },
        description: {
            tr: 'Selenium 4 projesinde bir web sayfasını PDF olarak kaydetmek için adımları doğru sıraya koyun.',
            en: 'Order the steps to print a web page to PDF in a Selenium 4 project.'
        },
        steps: [
            { code: 'PrintsPage printer = (PrintsPage) driver;', desc: { tr: 'Sürücüyü PrintsPage tipine cast et', en: 'Cast driver to PrintsPage' } },
            { code: 'PrintOptions options = new PrintOptions();', desc: { tr: 'Yazdırma seçeneklerini oluştur', en: 'Create PrintOptions' } },
            { code: 'options.setPageRanges("1");', desc: { tr: 'İlk sayfayı basmak için filtre koy', en: 'Set range to print first page' } },
            { code: 'Pdf pdf = printer.print(options);', desc: { tr: 'PDF çıktısı üret', en: 'Generate PDF output' } },
            { code: 'Files.write(Paths.get("test.pdf"), Base64.getDecoder().decode(pdf.getContent()));', desc: { tr: 'PDF dosyasını diske yaz', en: 'Write PDF to disk' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Print API adımlarını başarıyla sıraladınız. Artık fatura sayfalarını otomatik test edebilirsiniz.',
            en: '✓ Congratulations! You correctly ordered the Print API steps. You can now test invoice pages automatically.'
        }
      },
      {
        type: 'quiz',
        question: 'Which interface is used to save a web page as a PDF in headless mode?',
        options: [
          { id: 'a', text: 'HasVirtualAuthenticator' },
          { id: 'b', text: 'PrintsPage' },
          { id: 'c', text: 'WheelInput' },
          { id: 'd', text: 'NetworkInterceptor' },
        ],
        correct: 'b',
        explanation: 'The PrintsPage interface\'s print() method exports the page as a PDF and requires headless browser mode. HasVirtualAuthenticator, by contrast, is used for WebAuthn/Passkey testing.',
      
        retryQuestion: {
      "question": "Which interface allows you to invoke the printing functionality of a browser to generate a PDF document?",
      "options": [
            {
                  "id": "a",
                  "text": "PageRenderer"
            },
            {
                  "id": "b",
                  "text": "PrintsPage"
            },
            {
                  "id": "c",
                  "text": "PdfConverter"
            },
            {
                  "id": "d",
                  "text": "DocumentHandler"
            }
      ],
      "correct": "b",
      "explanation": "The PrintsPage interface is specifically designed to handle print operations, including exporting web content to PDF files. Other options provided are not standard interfaces for this specific browser automation capability."
}
},
    ],
  },
}

// ─── S10: SELENIUM IDE ───────────────────────────────────────────────────────
// 🖥️ Selenium IDE — side-runner paralel çalıştırma akışı
const seleniumSideRunnerStep = {
  type: 'step-animation',
  id: 'selenium-ide-side-runner-step-01',
  title: { tr: 'Adım Adım: selenium-side-runner Bir .side Dosyasını Nasıl Çalıştırır?', en: 'Step by Step: How selenium-side-runner Executes a .side File' },
  steps: [
    { id: 1, icon: '📄', label: { tr: '.side dosyası JSON tabanlıdır', en: 'The .side file is JSON-based' }, detail: { tr: 'IDE\'de kaydedilen `.side` dosyası aslında bir JSON\'dur — her komut, hedef ve değer bu dosyada düz METİN olarak saklanır.', en: 'The `.side` file saved by the IDE is actually JSON — every command, target, and value is stored as plain TEXT in this file.' } },
    { id: 2, icon: '🚀', label: { tr: 'Runner dosyayı OKUR ve YORUMLAR', en: 'The runner READS and INTERPRETS the file' }, detail: { tr: '`selenium-side-runner projem.side` çağrıldığında Node.js tabanlı runner, JSON\'daki her komutu SIRAYLA gerçek WebDriver çağrılarına ÇEVİRİR.', en: 'When `selenium-side-runner projem.side` runs, the Node.js-based runner TRANSLATES each JSON command into a real WebDriver call, IN ORDER.' } },
    { id: 3, icon: '🧵', label: { tr: '-w 4 bağımsız THREAD\'ler açar', en: '-w 4 opens independent THREADS' }, detail: { tr: '`-w 4` bayrağı, test suite\'indeki senaryoları 4 bağımsız tarayıcı örneğine DAĞITIR — her thread kendi ChromeDriver session\'ında çalışır.', en: 'The `-w 4` flag DISTRIBUTES the test suite\'s scenarios across 4 independent browser instances — each thread runs in its own ChromeDriver session.' } },
    { id: 4, icon: '🛡️', label: { tr: 'Neden IDE\'nin kendisinde değil, CI\'da?', en: 'Why run it in CI, not inside the IDE itself?' }, detail: { tr: 'IDE eklentisi tek bir tarayıcıda, elle tetiklenerek çalışır; `selenium-side-runner` ise headless ve paralel çalıştığı için Jenkins gibi bir CI sunucusuna ENTEGRE edilebilir.', en: 'The IDE extension runs in a single browser, triggered manually; `selenium-side-runner` runs headless and in parallel, so it CAN be integrated into a CI server like Jenkins.' } },
  ],
}

const s10 = {
  tr: {
    title: '🖥️ Selenium IDE — Kayıt & Oynatmanın Ötesi',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'Selenium IDE, bir test akışının "kaba taslak" çizmesini sağlayan tarayıcı tabanlı bir prototipleme aracıdır — tıpkı Java\'da IntelliJ\'in "Generate" menüsüyle getter/setter iskelet kodu üretmesi gibi: elle yazılacak boilerplate\'i otomatize eder, ama çıktıyı olduğu gibi production\'a göndermezsin. Peki zaten Java ile Selenium kodu yazabiliyorken neden IDE ile kayıt yapmak gerekiyor? Çünkü yeni bir uygulama veya sayfa keşfederken hangi locator\'ın stabil olduğunu, navigasyon sırasının ne olduğunu ve hangi wait koşulunun gerektiğini önceden bilemezsin; IDE ile tarayıcıyı kullanarak akışı kayıt edip locator önerilerini keşfeder, sonra üretilen kodu Java JUnit formatına export ederek refactor edersin. Java\'da `if/else + for` döngülerinle entegrasyon yaparken, IDE\'nin `.side` formatında da aynı control flow primitifleri (if/else/while) mevcuttur. QA ekiplerinde gerçek değeri şurada: manuel testçi kod yazmadan bir senaryoyu IDE\'de kaydeder, export eder ve QA mühendisi bu export\'u gerçek test suite\'ine entegre eder — iki profile arasında köprü kurar, "neden bu test yok?" sorusunu engeller.',
      },
      {
        type: 'text',
        content: 'Selenium IDE, Chrome ve Firefox eklentisi olarak hızlı prototipleme sağlayan bir araçtır. Komut-Hedef-Değer yapısıyla çalışır. Gelişmiş control flow (koşul ve döngüler) desteğine sahiptir ve testlerin `.side` formatında kaydedilip çalıştırılmasına izin verir.',
      },
      {
        type: 'heading', text: '1. Selenium IDE Komut Yapısı'
      },
      {
        type: 'table',
        headers: ['Komut', 'Hedef (Target)', 'Değer (Value)', 'Açıklama'],
        rows: [
            ['open', '/login', '', 'Belirtilen URL\'i açar.'],
            ['click', 'id=submit-btn', '', 'Elemente tıklar.'],
            ['type', 'name=email', 'qa@example.com', 'Metin alanına veri yazar.'],
            ['assertText', 'css=.title', 'Dashboard', 'Metnin eşleştiğini doğrular (fail durumunda durur).'],
            ['verifyElementPresent', 'id=logo', '', 'Elementin sayfada olduğunu kontrol eder (durmaz).'],
        ],
      },
      {
        type: 'heading', text: '2. Control Flow (Koşul ve Döngüler)'
      },
      {
        type: 'text',
        content: 'IDE içinde `if`, `else if`, `else`, `end` komutlarıyla koşullu dallanmalar yapabilir; `times`, `while`, `forEach` ile tekrarlayan döngü testleri kurgulayabilirsiniz. Bu özellik, karmaşık senaryoları kod yazmadan çözmeyi kolaylaştırır.',
      },
      {
        type: 'heading', text: '3. Command Line Runner (selenium-side-runner)'
      },
      {
        type: 'text',
        content: 'Kaydedilen `.side` test dosyalarını Node.js tabanlı `selenium-side-runner` yardımıyla Jenkins üzerinde veya yerelde headless (ekransız) ve paralel olarak çalıştırabilirsiniz.',
      },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Command Line Runner Kurulum ve Çalıştırma',
        code: `# Eklenti ve runner\'ı npm ile kur
npm install -g selenium-side-runner
npm install -g chromedriver

# Test dosyasını paralel 4 thread ile çalıştır
selenium-side-runner -c "browserName=chrome" -w 4 projem.side`,
      },
      seleniumSideRunnerStep,
      {
        type: 'challenge',
        variant: 'order-sort',
        id: 'selenium-ide-side-runner-order-01',
        question: { tr: 'Bir .side dosyasını terminalden paralel çalıştırma sırasını diz.', en: 'Order the steps for running a .side file from the terminal in parallel.' },
        items: [
          { id: '1', text: { tr: 'npm install -g selenium-side-runner ile CLI aracını kur', en: 'Install the CLI tool with npm install -g selenium-side-runner' }, order: 1 },
          { id: '2', text: { tr: 'npm install -g chromedriver ile tarayıcı driver\'ını kur', en: 'Install the browser driver with npm install -g chromedriver' }, order: 2 },
          { id: '3', text: { tr: 'selenium-side-runner -c "browserName=chrome" -w 4 project.side komutunu çalıştır', en: 'Run selenium-side-runner -c "browserName=chrome" -w 4 project.side' }, order: 3 },
          { id: '4', text: { tr: 'Terminaldeki pass/fail çıktısını ve exit code\'u incele', en: 'Review the terminal\'s pass/fail output and exit code' }, order: 4 },
        ],
        xpReward: 10,
      },
      {
        type: 'heading', text: '4. Kod Olarak Dışa Aktarma (Code Export)'
      },
      {
        type: 'text',
        content: 'IDE\'de kaydettiğiniz adımları sağ tıklayıp "Export" diyerek Java (JUnit/TestNG), Python (pytest) veya JavaScript formatında temiz bir WebDriver koduna dönüştürebilirsiniz. Bu, POM mimarisine başlarken şablon kod oluşturmak için mükemmeldir.',
      },
      seleniumIdeExportFilm,
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-ide-flow',
      },
      seleniumIdeRefactorPractice,
      {
        type: 'git-practice',
        practiceId: 'seleniumIdePractice',
        title: { tr: 'Pratik: Selenium IDE Control Flow', en: 'Practice: Selenium IDE Control Flow' },
        description: {
            tr: 'Selenium IDE içinde bir if-else koşullu doğrulama akışı oluşturmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to create an if-else validation flow in Selenium IDE.'
        },
        steps: [
            { code: 'open | /dashboard', desc: { tr: 'Dashboard sayfasını aç', en: 'Open dashboard page' } },
            { code: 'if | ${isLoggedIn} === true', desc: { tr: 'Eğer giriş başarılı ise koşulunu aç', en: 'Open if condition' } },
            { code: 'assertText | css=.username | QA Admin', desc: { tr: 'Kullanıcı adını doğrula', en: 'Verify username' } },
            { code: 'else', desc: { tr: 'Giriş yapılmadıysa', en: 'Else condition' } },
            { code: 'assertElementPresent | id=login-button', desc: { tr: 'Giriş butonunun orada olduğunu doğrula', en: 'Verify login button present' } },
            { code: 'end', desc: { tr: 'Koşulu kapat', en: 'End condition' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Selenium IDE control flow mantığını doğru şekilde kurdunuz. IDE artık sadece kayıt cihazı değil!',
            en: '✓ Congratulations! You correctly set up the Selenium IDE control flow. The IDE is no longer just a recorder!'
        }
      },
      {
        type: 'quiz',
        question: 'Selenium IDE\'de "assertText" komutu başarısız olursa ne olur?',
        options: [
          { id: 'a', text: 'Test durur (fail olur)' },
          { id: 'b', text: 'Test devam eder ama loglar' },
          { id: 'c', text: 'Hiçbir şey olmaz' },
          { id: 'd', text: 'Tarayıcı kapanır' },
        ],
        correct: 'a',
        explanation: 'assertText başarısız olursa test hemen durur (fail). "verifyElementPresent" gibi verify* komutları ise başarısız olsa bile testi durdurmaz, sadece kaydeder — fark budur.',
      
        retryQuestion: {
      "question": "Selenium IDE'de \"verifyText\" komutu ile \"assertText\" komutu arasındaki temel fark nedir?",
      "options": [
            {
                  "id": "a",
                  "text": "assertText başarısız olursa test yürütmeyi durdurur, verifyText devam eder"
            },
            {
                  "id": "b",
                  "text": "verifyText başarısız olursa tarayıcıyı anında kapatır"
            },
            {
                  "id": "c",
                  "text": "İkisi arasında hiçbir fark yoktur"
            },
            {
                  "id": "d",
                  "text": "assertText sadece loglama yapar, verifyText testi durdurur"
            }
      ],
      "correct": "a",
      "explanation": "assert* komutları kritik kontroller içindir ve bir hata durumunda testi anında durdurur (fail). verify* komutları ise testin hata alsa bile çalışmaya devam etmesini sağlar, sadece hata kaydı oluşturur."
}
},
    ],
  },
  en: {
    title: '🖥️ Selenium IDE — Beyond Record & Playback',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'Selenium IDE is a browser-based prototyping tool for sketching a test flow in rough strokes — analogous to IntelliJ\'s "Generate" menu producing getter/setter boilerplate in Java: it automates what you would otherwise write by hand, but you do not ship the output to production as-is. If you can already write Selenium code in Java, why record with the IDE at all? Because when exploring an unfamiliar application or page, you do not yet know which locator will be stable, what the correct navigation order is, or which wait conditions are needed; recording the flow in the browser reveals the IDE\'s locator suggestions and the action sequence, then you export to Java JUnit format and refactor the result into production-quality code. The same control flow primitives (if/else/while) available in your Java tests also exist inside the IDE\'s .side format. In a QA team, the real value is as a bridge: a manual tester records a scenario without writing code, exports it, and the automation engineer integrates the export into the real test suite — connecting two skill profiles and eliminating the "why is there no test for this?" conversation.',
      },
      {
        type: 'text',
        content: 'Selenium IDE is a Chrome/Firefox extension enabling fast prototyping. Using a Command-Target-Value structure, it features advanced control flows and exports code formats like Java, Python, and JavaScript.',
      },
      {
        type: 'heading', text: '1. Selenium IDE Command Structure'
      },
      {
        type: 'table',
        headers: ['Command', 'Target', 'Value', 'Description'],
        rows: [
            ['open', '/login', '', 'Opens the specified URL.'],
            ['click', 'id=submit-btn', '', 'Clicks on the element.'],
            ['type', 'name=email', 'qa@example.com', 'Types text into input field.'],
            ['assertText', 'css=.title', 'Dashboard', 'Asserts text matches (fails immediately if false).'],
            ['verifyElementPresent', 'id=logo', '', 'Verifies element is present (doesn\'t stop test execution).'],
        ],
      },
      {
        type: 'heading', text: '2. Control Flow (Conditions & Loops)'
      },
      {
        type: 'text',
        content: 'Inside the IDE, you can create conditional branches using `if`, `else if`, `else`, `end` commands, and repeating loops with `times`, `while`, and `forEach` without writing a single line of script.',
      },
      {
        type: 'heading', text: '3. Command Line Runner (selenium-side-runner)'
      },
      {
        type: 'code', language: 'bash',
        label: 'Terminal — Runner Setup & Execution',
        code: `# Install via npm globally
npm install -g selenium-side-runner
npm install -g chromedriver

# Run side file in parallel with 4 workers
selenium-side-runner -c "browserName=chrome" -w 4 project.side`,
      },
      seleniumSideRunnerStep,
      {
        type: 'challenge',
        variant: 'order-sort',
        id: 'selenium-ide-side-runner-order-01',
        question: { tr: 'Bir .side dosyasını terminalden paralel çalıştırma sırasını diz.', en: 'Order the steps for running a .side file from the terminal in parallel.' },
        items: [
          { id: '1', text: { tr: 'npm install -g selenium-side-runner ile CLI aracını kur', en: 'Install the CLI tool with npm install -g selenium-side-runner' }, order: 1 },
          { id: '2', text: { tr: 'npm install -g chromedriver ile tarayıcı driver\'ını kur', en: 'Install the browser driver with npm install -g chromedriver' }, order: 2 },
          { id: '3', text: { tr: 'selenium-side-runner -c "browserName=chrome" -w 4 project.side komutunu çalıştır', en: 'Run selenium-side-runner -c "browserName=chrome" -w 4 project.side' }, order: 3 },
          { id: '4', text: { tr: 'Terminaldeki pass/fail çıktısını ve exit code\'u incele', en: 'Review the terminal\'s pass/fail output and exit code' }, order: 4 },
        ],
        xpReward: 10,
      },
      {
        type: 'heading', text: '4. Code Export capabilities'
      },
      {
        type: 'text',
        content: 'You can right-click any suite in the IDE and choose "Export" to export your test scripts into Java (JUnit/TestNG), Python (pytest), or JavaScript code. This creates excellent boilerplate template code to start with.',
      },
      seleniumIdeExportFilm,
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-ide-flow',
      },
      seleniumIdeRefactorPractice,
      {
        type: 'git-practice',
        practiceId: 'seleniumIdePractice',
        title: { tr: 'Pratik: Selenium IDE Control Flow', en: 'Practice: Selenium IDE Control Flow' },
        description: {
            tr: 'Selenium IDE içinde bir if-else koşullu doğrulama akışı oluşturmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to create an if-else validation flow in Selenium IDE.'
        },
        steps: [
            { code: 'open | /dashboard', desc: { tr: 'Dashboard sayfasını aç', en: 'Open dashboard page' } },
            { code: 'if | ${isLoggedIn} === true', desc: { tr: 'Eğer giriş başarılı ise koşulunu aç', en: 'Open if condition' } },
            { code: 'assertText | css=.username | QA Admin', desc: { tr: 'Kullanıcı adını doğrula', en: 'Verify username' } },
            { code: 'else', desc: { tr: 'Giriş yapılmadıysa', en: 'Else condition' } },
            { code: 'assertElementPresent | id=login-button', desc: { tr: 'Giriş butonunun orada olduğunu doğrula', en: 'Verify login button present' } },
            { code: 'end', desc: { tr: 'Koşulu kapat', en: 'End condition' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Selenium IDE control flow mantığını doğru şekilde kurdunuz. IDE artık sadece kayıt cihazı değil!',
            en: '✓ Congratulations! You correctly set up the Selenium IDE control flow. The IDE is no longer just a recorder!'
        }
      },
      {
        type: 'quiz',
        question: 'What happens if the "assertText" command fails in Selenium IDE?',
        options: [
          { id: 'a', text: 'The test stops immediately (fails)' },
          { id: 'b', text: 'The test continues but logs it' },
          { id: 'c', text: 'Nothing happens' },
          { id: 'd', text: 'The browser closes' },
        ],
        correct: 'a',
        explanation: 'If assertText fails, the test stops immediately. verify* commands like verifyElementPresent, on the other hand, do NOT stop the test even on failure — that\'s the key difference.',
      
        retryQuestion: {
      "question": "What is the primary difference between using 'assertElementPresent' and 'verifyElementPresent' in Selenium IDE?",
      "options": [
            {
                  "id": "a",
                  "text": "Both commands stop the test if they fail."
            },
            {
                  "id": "b",
                  "text": "assertElementPresent stops execution on failure, while verifyElementPresent continues."
            },
            {
                  "id": "c",
                  "text": "verifyElementPresent stops execution on failure, while assertElementPresent continues."
            },
            {
                  "id": "d",
                  "text": "Neither command stops the test regardless of the outcome."
            }
      ],
      "correct": "b",
      "explanation": "In Selenium IDE, 'assert' commands are fatal; if the assertion fails, the test stops immediately. 'verify' commands are non-fatal, meaning the test will log the failure but continue to execute the remaining steps."
}
},
    ],
  },
}

// ─── S11: SELENIUM GRID 4 ────────────────────────────────────────────────────
// 🌐 Grid 4 — Distributor capability eşleştirmesi
const seleniumGridCapabilityMatchStep = {
  type: 'step-animation',
  id: 'selenium-grid4-capability-match-step-01',
  title: { tr: 'Adım Adım: Distributor Doğru Node\'u Nasıl Seçer?', en: 'Step by Step: How the Distributor Picks the Right Node' },
  steps: [
    { id: 1, icon: '📝', label: { tr: 'ChromeOptions bir İSTEK LİSTESİDİR', en: 'ChromeOptions IS a wish list' }, detail: { tr: '`options.setPlatformName("LINUX")` ve `setBrowserVersion("125.0")`, RemoteWebDriver\'ın Grid\'den TALEP ettiği tam kapasiteyi tanımlar.', en: '`options.setPlatformName("LINUX")` and `setBrowserVersion("125.0")` define the exact capability the RemoteWebDriver REQUESTS from the Grid.' } },
    { id: 2, icon: '🔀', label: { tr: 'Router isteği Distributor\'a İLETİR', en: 'The Router FORWARDS the request to the Distributor' }, detail: { tr: 'İstek önce Router\'a düşer, Router bunu doğru bileşene yönlendirmekle görevlidir ve Distributor\'a GEÇİRİR.', en: 'The request first hits the Router, whose job is to route it to the correct component, and it PASSES it to the Distributor.' } },
    { id: 3, icon: '🎯', label: { tr: 'Distributor Session Map\'i TARAR', en: 'The Distributor SCANS the Session Map' }, detail: { tr: 'Distributor, Session Map\'teki kayıtlı Node\'ların yeteneklerini istekle KARŞILAŞTIRIR — Linux + Chrome 125 sunan BOŞ bir Node arar.', en: 'The Distributor COMPARES registered Nodes\' capabilities in the Session Map against the request — it looks for a FREE Node offering Linux + Chrome 125.' } },
    { id: 4, icon: '⚠️', label: { tr: 'Eşleşme yoksa ne olur?', en: 'What if there is no match?' }, detail: { tr: 'Talep edilen platform/sürüm kombinasyonunu sunan hiçbir Node YOKSA, istek Session Queue\'da BEKLER ve belirli bir süre sonra `SessionNotCreatedException` ile SONUÇLANIR.', en: 'If no Node offers the requested platform/version combination, the request WAITS in the Session Queue and eventually RESULTS in a `SessionNotCreatedException`.' } },
  ],
}

const s11 = {
  tr: {
    title: '🌐 Selenium Grid 4 & Dağıtık Otomasyon',
    blocks: [
      {
        type: 'simple-box', emoji: '🚢',
        content: 'Selenium Grid 4, Java\'nın ForkJoinPool paralel executor\'ının tarayıcı testlerine uygulanmasıdır: tek bir JVM thread yerine farklı makinelerdeki (Node) tarayıcı process\'lerini paralel olarak koordine eder. Ama zaten JUnit 5 ile @Execution(CONCURRENT) var, neden ayrı bir Grid altyapısı kurulsun? Çünkü cross-browser gereksinimleri burada devreye girer: aynı testi Chrome/Firefox/Safari\'de ve hem Linux hem Windows üzerinde paralel koşturmak, tek bir makinenin kaldırabileceğinin çok ötesindedir; Grid farklı OS/tarayıcı matrisini gerçek dağıtık Node\'lara yayar. Grid 4, eski Hub/Node mimarisini mikroservis mimarisine (Router, Distributor, Session Map, Event Bus) dönüştürmüş olması ile Grid 3\'ten ayrışır — tıpkı monolith Java uygulamasının microservice\'lere bölünmesi gibi, her bileşen bağımsız scale edilebilir. QA için kritik senaryo: bir e-ticaret platformu "Safari\'de ödeme sayfası bozuk mu değil mi bilmiyoruz" sorusunu CI\'da otomatik cevaplamak istiyorsa, Grid olmadan bu kontrol ya elle ya da pahalı cloud servis aboneliğiyle yapılır; Grid ile kendi altyapında tarayıcı matrisi oluşturup her commit\'te regresyon koşabilirsin.',
      },
      {
        type: 'text',
        content: 'Selenium Grid 4, testleri farklı makinelerde (Nodes) paralel olarak çalıştırmayı sağlayan dağıtık bir altyapıdır. Hub/Node modelinin ötesine geçerek mikroservis mimarisine kavuşmuştur. Docker ve Kubernetes entegrasyonu sayesinde dinamik olarak browser ayağa kaldırıp kapatabilir.',
      },
      {
        type: 'heading', text: '1. Grid 4 Mikroservis Mimarisi'
      },
      {
        type: 'grid', cols: 3,
        items: [
            { icon: '🚦', label: 'Router', desc: 'İsteklerin giriş noktasıdır. Gelen test taleplerini doğru bileşenlere yönlendirir.' },
            { icon: '🗂️', label: 'Distributor', desc: 'Kuyruktaki istekleri alır ve uygun özelliklere sahip boş Node\'lara dağıtır.' },
            { icon: '🗺️', label: 'Session Map', desc: 'Hangi test session\'ının hangi Node üzerinde çalıştığı eşleşmesini tutar.' },
            { icon: '📥', label: 'Session Queue', desc: 'Aynı anda çalışamayacak kadar çok test geldiğinde istekleri kuyrukta bekletir.' },
            { icon: '🚌', label: 'Event Bus', desc: 'Bileşenlerin asenkron olarak haberleştiği WebSocket tabanlı mesaj hattıdır.' },
            { icon: '💻', label: 'Node', desc: 'Testlerin üzerinde koştuğu, tarayıcılara ev sahipliği yapan gerçek veya sanal makinedir.' },
        ],
      },
      seleniumGridRoutingFilm,
      {
        type: 'heading', text: '2. Grid Çalışma Modları'
      },
      {
        type: 'table',
        headers: ['Mod', 'Nasıl Çalışır?', 'Kullanım Amacı'],
        rows: [
            ['Standalone', 'Tüm bileşenler tek bir JAR dosyasında, tek proseste çalışır.', 'Yerel denemeler, küçük ölçekli testler.'],
            ['Hub & Node', 'Bileşenler Hub (Router/Distributor vb.) ve Node olarak ikiye bölünür.', 'Orta ölçekli ekipler, birkaç fiziksel makine.'],
            ['Distributed', '6 bileşenin tamamı ayrı sunucularda veya Docker\'da mikroservis olarak ayağa kalkar.', 'Büyük ölçekli bulut altyapıları, yüksek paralel yükler.'],
        ],
      },
      {
        type: 'heading', text: '3. Docker & Dynamic Grid Kurulumu'
      },
      {
        type: 'text',
        content: 'Dynamic Grid modu, test isteği geldiğinde Docker daemon\'a bağlanıp anında temiz bir Chrome/Firefox konteyneri oluşturur, testi çalıştırır ve test bittiğinde bu konteyneri imha eder. Bu, kaynak israfını ve "flaky" testleri tamamen önler.',
      },
      {
        type: 'code', language: 'yaml',
        label: 'docker-compose.yml — Selenium Grid 4 Hub & Node Altyapısı',
        code: `version: "3"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    container_name: selenium-hub
    ports:
      - "4444:4444"

  chrome-node:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4`,
      },
      {
        type: 'heading', text: '4. RemoteWebDriver ile Grid\'e Bağlanma'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — RemoteWebDriver İle Grid\'de Çalıştırma',
        code: `import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.net.URL;

ChromeOptions options = new ChromeOptions();
// Grid 4 standardı olarak capabilities options ile gönderilir
options.setPlatformName("LINUX");
options.setBrowserVersion("125.0");

WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"), 
    options
);

driver.get("https://learnqa.dev");
driver.quit();`,
      },
      seleniumGridCapabilityMatchStep,
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-grid-architecture',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumGridPractice',
        title: { tr: 'Pratik: RemoteWebDriver Grid Bağlantısı', en: 'Practice: RemoteWebDriver Grid Connection' },
        description: {
            tr: 'Bir Java automation projesinde testleri Selenium Grid üzerinde çalıştırmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to run tests on Selenium Grid using RemoteWebDriver in a Java project.'
        },
        steps: [
            { code: 'ChromeOptions options = new ChromeOptions();', desc: { tr: 'Tarayıcı seçeneklerini tanımla', en: 'Define browser options' } },
            { code: 'options.setPlatformName("Linux");', desc: { tr: 'Çalıştırılacak platform işletim sistemini seç', en: 'Set execution platform OS' } },
            { code: 'URL gridUrl = new URL("http://localhost:4444/wd/hub");', desc: { tr: 'Selenium Grid URL adresini tanımla', en: 'Define Selenium Grid URL' } },
            { code: 'WebDriver driver = new RemoteWebDriver(gridUrl, options);', desc: { tr: 'RemoteWebDriver ile oturumu başlat', en: 'Start session with RemoteWebDriver' } },
            { code: 'driver.get("https://learnqa.dev");', desc: { tr: 'Test adımlarını koştur', en: 'Run test steps' } },
            { code: 'driver.quit();', desc: { tr: 'Oturumu kapat ve kaynakları temizle', en: 'Close session and clean resources' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Grid üzerinde RemoteWebDriver oturumu açma adımlarını başarıyla sıraladınız. Artık paralel testlere hazırsınız.',
            en: '✓ Congratulations! You correctly ordered the RemoteWebDriver session steps on the Grid. You are ready for parallel testing.'
        }
      },
      {
        type: 'quiz',
        question: 'Selenium Grid 4 mimarisinde kuyruktaki istekleri alıp uygun Node\'lara dağıtan bileşen hangisidir?',
        options: [
          { id: 'a', text: 'Router' },
          { id: 'b', text: 'Distributor' },
          { id: 'c', text: 'Session Map' },
          { id: 'd', text: 'Event Bus' },
        ],
        correct: 'b',
        explanation: 'Distributor, kuyruktaki test isteklerini alıp uygun özelliklere (browser, OS) sahip boş Node\'lara dağıtır. Router gelen istekleri doğru bileşene yönlendirir, Session Map ise hangi session\'ın hangi Node\'da çalıştığını takip eder.',
      
        retryQuestion: {
      "question": "Selenium Grid 4 mimarisinde hangi bileşen, aktif olan test oturumlarını ve bunların hangi Node üzerinde çalıştığını takip ederek Session ID ile Node eşleşmesini sağlar?",
      "options": [
            {
                  "id": "a",
                  "text": "Distributor"
            },
            {
                  "id": "b",
                  "text": "Router"
            },
            {
                  "id": "c",
                  "text": "Session Map"
            },
            {
                  "id": "d",
                  "text": "Node"
            }
      ],
      "correct": "c",
      "explanation": "Session Map, Selenium Grid 4'te oturum ID'lerini ve bu oturumların hangi Node üzerinde çalıştığını kayıt altında tutan bileşendir. Distributor sadece dağıtımı yaparken, Session Map yürütülen oturumların durumunu yönetir."
}
},
    ],
  },
  en: {
    title: '🌐 Selenium Grid 4 & Distributed Automation',
    blocks: [
      {
        type: 'simple-box', emoji: '🚢',
        content: 'Selenium Grid 4 is the application of Java\'s ForkJoinPool parallel executor to browser tests: instead of coordinating threads in a single JVM, it coordinates browser processes running on separate machines (Nodes) in parallel. But JUnit 5 already has @Execution(CONCURRENT) — why set up a whole separate Grid infrastructure? Because cross-browser requirements step in: running the same test against Chrome, Firefox, and Safari simultaneously, across both Linux and Windows, is well beyond what a single machine can handle; Grid spreads the OS/browser matrix across genuinely distributed Nodes. Grid 4 distinguishes itself from Grid 3 by replacing the monolithic Hub/Node model with a microservices architecture (Router, Distributor, Session Map, Event Bus) — exactly like splitting a Java monolith into independent microservices, each component scales independently. The critical QA scenario: an e-commerce platform asking "is the checkout page broken in Safari?" must answer that question automatically in CI; without Grid it falls back to manual verification or expensive cloud service subscriptions, while Grid lets you build your own browser matrix on-premise and run regression on every commit.',
      },
      {
        type: 'text',
        content: 'Selenium Grid 4 is a distributed execution infrastructure. Redesigned into a microservices architecture, it supports scalable parallel executions and Docker/Kubernetes dynamic browser containerization.',
      },
      {
        type: 'heading', text: '1. Grid 4 Microservices Architecture'
      },
      {
        type: 'grid', cols: 3,
        items: [
            { icon: '🚦', label: 'Router', desc: 'The single entry point. Routes incoming test requests to correct components.' },
            { icon: '🗂️', label: 'Distributor', desc: 'Receives pending requests from the queue and assigns them to free Nodes.' },
            { icon: '🗺️', label: 'Session Map', desc: 'Tracks which test session is executing on which physical/virtual Node.' },
            { icon: '📥', label: 'Session Queue', desc: 'Queues up incoming requests if execution limits are saturated.' },
            { icon: '🚌', label: 'Event Bus', desc: 'A WebSocket-based communication line where Grid components talk asynchronously.' },
            { icon: '💻', label: 'Node', desc: 'The execution host hosting actual browsers and executing driver instructions.' },
        ],
      },
      seleniumGridRoutingFilm,
      {
        type: 'heading', text: '2. Grid Execution Modes'
      },
      {
        type: 'table',
        headers: ['Mode', 'How It Works?', 'Best Used For'],
        rows: [
            ['Standalone', 'All components run inside a single process from a single JAR file.', 'Local testing and quick experiments.'],
            ['Hub & Node', 'Split into a central Hub process (Router/Distributor) and one or more Nodes.', 'Medium-scale teams using dedicated execution hosts.'],
            ['Distributed', 'All 6 microservice components run as completely isolated processes/containers.', 'Large enterprise setups running massive parallel test loads.'],
        ],
      },
      {
        type: 'heading', text: '3. Docker & Dynamic Grid'
      },
      {
        type: 'text',
        content: 'In Dynamic Grid mode, the Distributor connects directly to a Docker daemon. When a test request arrives, it spins up a fresh, clean browser container, executes the test, and immediately destroys it upon completion, preventing cross-test pollution.',
      },
      {
        type: 'code', language: 'yaml',
        label: 'docker-compose.yml — Selenium Grid 4 Hub & Node Setup',
        code: `version: "3"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    container_name: selenium-hub
    ports:
      - "4444:4444"

  chrome-node:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4`,
      },
      {
        type: 'heading', text: '4. RemoteWebDriver Code Integration'
      },
      {
        type: 'code', language: 'java',
        label: 'Java — RemoteWebDriver Grid Connection',
        code: `import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.net.URL;

ChromeOptions options = new ChromeOptions();
options.setPlatformName("LINUX");
options.setBrowserVersion("125.0");

WebDriver driver = new RemoteWebDriver(
    new URL("http://localhost:4444/wd/hub"), 
    options
);

driver.get("https://learnqa.dev");
driver.quit();`,
      },
      seleniumGridCapabilityMatchStep,
      {
        type: 'visual', variant: 'simulation',
        scenario: 'selenium-grid-architecture',
      },
      {
        type: 'git-practice',
        practiceId: 'seleniumGridPractice',
        title: { tr: 'Pratik: RemoteWebDriver Grid Bağlantısı', en: 'Practice: RemoteWebDriver Grid Connection' },
        description: {
            tr: 'Bir Java automation projesinde testleri Selenium Grid üzerinde çalıştırmak için komutları doğru sıraya koyun.',
            en: 'Order the commands to run tests on Selenium Grid using RemoteWebDriver in a Java project.'
        },
        steps: [
            { code: 'ChromeOptions options = new ChromeOptions();', desc: { tr: 'Tarayıcı seçeneklerini tanımla', en: 'Define browser options' } },
            { code: 'options.setPlatformName("Linux");', desc: { tr: 'Çalıştırılacak platform işletim sistemini seç', en: 'Set execution platform OS' } },
            { code: 'URL gridUrl = new URL("http://localhost:4444/wd/hub");', desc: { tr: 'Selenium Grid URL adresini tanımla', en: 'Define Selenium Grid URL' } },
            { code: 'WebDriver driver = new RemoteWebDriver(gridUrl, options);', desc: { tr: 'RemoteWebDriver ile oturumu başlat', en: 'Start session with RemoteWebDriver' } },
            { code: 'driver.get("https://learnqa.dev");', desc: { tr: 'Test adımlarını koştur', en: 'Run test steps' } },
            { code: 'driver.quit();', desc: { tr: 'Oturumu kapat ve kaynakları temizle', en: 'Close session and clean resources' } },
        ],
        successMessage: {
            tr: '✓ Tebrikler! Grid üzerinde RemoteWebDriver oturumu açma adımlarını başarıyla sıraladınız. Artık paralel testlere hazırsınız.',
            en: '✓ Congratulations! You correctly ordered the RemoteWebDriver session steps on the Grid. You are ready for parallel testing.'
        }
      },
      {
        type: 'quiz',
        question: 'In the Selenium Grid 4 architecture, which component takes queued requests and assigns them to suitable Nodes?',
        options: [
          { id: 'a', text: 'Router' },
          { id: 'b', text: 'Distributor' },
          { id: 'c', text: 'Session Map' },
          { id: 'd', text: 'Event Bus' },
        ],
        correct: 'b',
        explanation: 'The Distributor takes queued test requests and assigns them to free Nodes with matching capabilities (browser, OS). The Router directs incoming requests to the right component, while Session Map tracks which session runs on which Node.',
      
        retryQuestion: {
      "question": "In the Selenium Grid 4 architecture, which component is responsible for receiving the incoming HTTP requests from the client and forwarding them to the appropriate component?",
      "options": [
            {
                  "id": "a",
                  "text": "Router"
            },
            {
                  "id": "b",
                  "text": "Distributor"
            },
            {
                  "id": "c",
                  "text": "Node"
            },
            {
                  "id": "d",
                  "text": "Event Bus"
            }
      ],
      "correct": "a",
      "explanation": "The Router acts as the entry point for all incoming requests in Selenium Grid 4. It inspects the request and directs it to the Distributor (if it's a new session request) or to the Session Map (if it's an existing session request)."
}
},
    ],
  },
}

// ─── S12: YAYGIN HATALAR (Eski S8) ───────────────────────────────────────────
const s12 = {
  tr: {
    title: '🚨 Yaygın Hatalar & Çözümleri',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Selenium\'daki hata mesajları, Java\'nın checked exception\'ları gibi davranır: mesajı yüzeysel okursun, yanlış yere bakarsın, saatlerce debug edersin. Örneğin NoSuchElementException bir "locator yanlış" hatası gibi görünür ama çoğu zaman locator doğrudur — element henüz DOM\'a eklenmemiştir; bu, Java\'da bir Future\'ı .get() olmadan okumaya çalışmaya benzer. Peki bu hatalar belgelenmiş ve bilinen hatalarsa neden herkes aynı tuzağa düşüyor? Çünkü hata mesajı kök nedeni değil belirtiyi gösterir; "Unable to locate element" diyince akıl "locator\'ı düzelt" der ama gerçek sorun genellikle timing, iframe context veya DOM yeniden render olmasıdır. StaleElementReferenceException ise Java\'da WeakReference\'a GC sonrası erişmek gibidir: element yakalanmış, DOM yeniden render edilmiş, referans artık geçersiz — bunu anlamadan "bir daha findElement" demek sorunu gizler. QA\'da bu hataların birikimi flaky test report\'larına dönüşür: CI yeşil görünür ama aynı test bazen geçer bazen geçmez; bu güvensizlik, ekibin tüm test sonuçlarını görmezden gelmesine zemin hazırlar.',
      },
      seleniumStaleElementDiagnosisFilm,
      seleniumStaleElementDiagnosisSteps,
      {
        type: 'error-dictionary',
          relatedTopicId: 'selenium-webdriver-errors',
        framework: 'Selenium WebDriver',
        errors: [
          {
            error: 'NoSuchElementException',
            fullMessage: 'org.openqa.selenium.NoSuchElementException: no such element: Unable to locate element: {"method":"id","selector":"loginBtn"}',
            cause: { tr: 'Element DOM\'da yok veya henüz yüklenmemiş. Yanlış locator veya iframe içinde aramak gibi durumlar.', en: 'Element not in DOM or not yet loaded. Wrong locator or looking inside iframe.' },
            solution: { tr: '1) Locator\'ı DevTools\'da test et: document.querySelector("#loginBtn") \n2) Explicit Wait ekle: wait.until(EC.presenceOfElementLocated(By.id("loginBtn")))\n3) İframe içindeyse önce switchTo().frame() yap', en: '1) Test locator in DevTools\n2) Add explicit wait\n3) If in iframe, switchTo().frame() first' },
            codeWrong: `driver.findElement(By.id("loginBtn")).click(); // Sayfa yüklenmeden`,
            codeFixed: `wait.until(EC.elementToBeClickable(By.id("loginBtn"))).click();`,
          },
          {
            error: 'StaleElementReferenceException',
            fullMessage: 'org.openqa.selenium.StaleElementReferenceException: stale element reference: element is not attached to the page document',
            cause: { tr: 'Element DOM\'a referans alındıktan sonra sayfa yenilendi veya DOM değişti. Özellikle SPA (React/Vue) uygulamalarda sık görülür.', en: 'Page refreshed or DOM changed after element reference was captured. Common in SPA apps (React/Vue).' },
            solution: { tr: '1) Element\'i her kullanmadan önce yeniden bul\n2) Try-catch ile StaleElementReferenceException yakala ve yeniden dene\n3) WebDriverWait ile element stabil olana kadar bekle', en: '1) Re-find element before each use\n2) Catch StaleElementReferenceException and retry\n3) Wait for element stability' },
            codeWrong: `WebElement btn = driver.findElement(By.id("btn"));
driver.navigate().refresh(); // DOM değişti!
btn.click(); // HATA!`,
            codeFixed: `driver.navigate().refresh();
wait.until(EC.elementToBeClickable(By.id("btn"))).click(); // Yeniden bul`,
          },
          {
            error: 'ElementNotInteractableException',
            fullMessage: 'org.openqa.selenium.ElementNotInteractableException: element not interactable',
            cause: { tr: 'Element DOM\'da var ama görünmez veya başka bir element önünde. display:none, opacity:0, z-index gibi CSS sorunları.', en: 'Element exists in DOM but is invisible or blocked. CSS issues: display:none, opacity:0, z-index.' },
            solution: { tr: '1) Element görünür olana kadar bekle: EC.visibilityOfElementLocated\n2) Scroll ile görünür alana getir: js.executeScript("arguments[0].scrollIntoView(true)", el)\n3) Gerçekten etkileşilemiyor ise JS ile tıkla: js.executeScript("arguments[0].click()", el)', en: '1) Wait for visibility\n2) Scroll into view\n3) Click via JavaScript if truly not interactable' },
            codeWrong: `driver.findElement(By.id("hiddenBtn")).click();`,
            codeFixed: `WebElement el = wait.until(EC.visibilityOfElementLocated(By.id("hiddenBtn")));
el.click();
// Ya da JS ile:
js.executeScript("arguments[0].click();", el);`,
          },
          {
            error: 'TimeoutException',
            fullMessage: 'org.openqa.selenium.TimeoutException: Expected condition failed: waiting for visibility of element located by By.id: spinner (tried for 15 second(s))',
            cause: { tr: 'Explicit Wait süresi doldu ama beklenen koşul gerçekleşmedi. Yavaş ağ, hatalı locator veya sayfa yapısı değişti.', en: 'Explicit Wait timed out. Slow network, wrong locator, or page structure changed.' },
            solution: { tr: '1) Bekleme süresini artır: Duration.ofSeconds(30)\n2) Locator\'ı doğru gir, sayfada gerçekten var mı kontrol et\n3) Network sekmesinde sayfanın ne zaman hazır olduğunu izle', en: '1) Increase timeout\n2) Verify locator is correct\n3) Monitor Network tab for when page is ready' },
            codeWrong: `wait.until(EC.visibilityOfElementLocated(By.id("spnner"))); // Yazım hatası!`,
            codeFixed: `wait.until(EC.invisibilityOfElementLocated(By.id("spinner"))); // Kaybolmasını bekle`,
          },
          {
            error: 'WebDriverException: Chrome not reachable',
            fullMessage: 'org.openqa.selenium.WebDriverException: chrome not reachable (Session info: chrome=xx.x)',
            cause: { tr: 'ChromeDriver ve Chrome versiyonları uyumsuz. Selenium Manager\'ın kullanılmadığı eski projelerde yaygındır.', en: 'ChromeDriver and Chrome version mismatch. Common in old projects not using Selenium Manager.' },
            solution: { tr: '1) Selenium 4.6+ kullanıyorsanız Selenium Manager otomatik çözer\n2) webdrivermanager kullanıyorsanız güncelleyin: WebDriverManager.chromedriver().setup()\n3) Chrome ve ChromeDriver sürümlerini manuel eşleştirin', en: '1) Use Selenium 4.6+ — Selenium Manager auto-handles it\n2) Update webdrivermanager\n3) Manually match Chrome and ChromeDriver versions' },
          },
          {
            error: 'SessionNotCreatedException',
            fullMessage: 'org.openqa.selenium.SessionNotCreatedException: Could not start a new session. Response code 500. Message: session not created: This version of ChromeDriver only supports Chrome version XX',
            cause: { tr: 'ChromeDriver sürümü mevcut Chrome tarayıcısıyla uyumsuz.', en: 'ChromeDriver version is incompatible with the installed Chrome browser.' },
            solution: { tr: '1) Selenium 4.6+ ile Selenium Manager\'ı etkinleştirin\n2) https://chromedriver.chromium.org/downloads adresinden uyumlu versiyonu indirin\n3) Java: System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver")', en: '1) Enable Selenium Manager with Selenium 4.6+\n2) Download matching version from chromedriver.chromium.org\n3) Set system property manually' },
          },
          {
            error: 'MoveTargetOutOfBoundsException',
            fullMessage: 'org.openqa.selenium.interactions.MoveTargetOutOfBoundsException: (0, 2000) is out of bounds of viewport width (1280) and height (800)',
            cause: { tr: 'Actions.moveToElement() ile ulaşılmaya çalışılan element görünür viewport dışında.', en: 'Element targeted by Actions.moveToElement() is outside the visible viewport.' },
            solution: { tr: '1) Önce elemana scroll ile git: js.executeScript("arguments[0].scrollIntoView(true)", el)\n2) Tarayıcı penceresini büyüt: driver.manage().window().maximize()', en: '1) Scroll to element first\n2) Maximize browser window' },
            codeWrong: `new Actions(driver).moveToElement(el).click().perform(); // Viewport dışı!`,
            codeFixed: `js.executeScript("arguments[0].scrollIntoView(true);", el);
new Actions(driver).moveToElement(el).click().perform();`,
          },
          {
            error: 'UnexpectedAlertPresentException',
            fullMessage: 'org.openqa.selenium.UnexpectedAlertPresentException: unexpected alert open: {Alert text : Are you sure?}',
            cause: { tr: 'Başka bir aksiyon yaparken sayfa alert açtı ve Selenium\'u durdurdu.', en: 'An unexpected alert appeared while performing another action, blocking Selenium.' },
            solution: { tr: '1) Testi önce alert\'i handle edecek şekilde düzenle\n2) UnexpectedAlertBehaviour capability ile ignore et (önerilmez)', en: '1) Restructure test to handle alert before it appears\n2) Use UnexpectedAlertBehaviour capability to ignore (not recommended)' },
            codeFixed: `// Alert beklenen durumda: önce accept et
try {
    Alert alert = driver.switchTo().alert();
    alert.accept();
} catch (NoAlertPresentException e) {
    // Alert yoksa devam et
}`,
          },
          {
            error: 'NoSuchWindowException',
            fullMessage: 'org.openqa.selenium.NoSuchWindowException: no such window: target window already closed',
            cause: { tr: 'Geçiş yapılan pencere kapanmış veya handle geçersiz hale gelmiş.', en: 'The window switched to has been closed or handle is no longer valid.' },
            solution: { tr: '1) Pencereyi kapatmadan önce ana pencereye geri dön\n2) driver.getWindowHandles() ile aktif pencereleri listele', en: '1) Switch back to main window before closing\n2) List active windows with driver.getWindowHandles()' },
            codeFixed: `// Yeni pencereyi kapat, ana pencereye dön
driver.close(); // Aktif pencereyi kapat
driver.switchTo().window(mainWindowHandle); // Ana pencereye dön`,
          },
          {
            error: 'InvalidSelectorException',
            fullMessage: 'org.openqa.selenium.InvalidSelectorException: invalid selector: An invalid or illegal selector was specified',
            cause: { tr: 'CSS Selector veya XPath sözdizimi hatalı.', en: 'Invalid CSS Selector or XPath syntax.' },
            solution: { tr: '1) CSS: DevTools Console\'da document.querySelector("selector") dene\n2) XPath: DevTools Console\'da $x("//xpath") dene\n3) Özel karakter içeren CSS\'te escape kullan', en: '1) Test CSS in DevTools: document.querySelector("selector")\n2) Test XPath in DevTools: $x("//xpath")\n3) Escape special characters in CSS' },
            codeWrong: `driver.findElement(By.cssSelector("input[type=text]")); // Tırnak eksik
driver.findElement(By.xpath("//button[text()=Login]")); // Tırnak eksik`,
            codeFixed: `driver.findElement(By.cssSelector("input[type='text']")); // Tırnak ekle
driver.findElement(By.xpath("//button[text()='Login']")); // Tırnak ekle`,
          },
        ],
      },
      seleniumStaleElementPractice,
      {
        type: 'quiz',
        question: 'Bir React/Vue (SPA) uygulamasında DOM sürekli güncellendiği için en sık karşılaşılan exception hangisidir?',
        options: [
          { id: 'a', text: 'NoSuchElementException' },
          { id: 'b', text: 'StaleElementReferenceException' },
          { id: 'c', text: 'InvalidSelectorException' },
          { id: 'd', text: 'NoSuchWindowException' },
        ],
        correct: 'b',
        explanation: 'StaleElementReferenceException, bir element referans alındıktan SONRA DOM değiştiğinde (SPA\'larda sık) oluşur. Çözüm: elementi her kullanmadan önce yeniden bulmak.',
      
        retryQuestion: {
      "question": "React veya Vue gibi dinamik web uygulamalarında, bir sayfa yenilemesi veya render işlemi sırasında elementin referansının geçersiz kalması sonucu oluşan hata hangisidir?",
      "options": [
            {
                  "id": "a",
                  "text": "TimeoutException"
            },
            {
                  "id": "b",
                  "text": "StaleElementReferenceException"
            },
            {
                  "id": "c",
                  "text": "ElementNotVisibleException"
            },
            {
                  "id": "d",
                  "text": "SessionNotCreatedException"
            }
      ],
      "correct": "b",
      "explanation": "StaleElementReferenceException, WebDriver'ın yakaladığı bir elementin DOM'dan kaldırılması veya tekrar render edilmesi durumunda ortaya çıkar. SPA projelerinde bileşenler sürekli güncellendiği için bu durumla sıkça karşılaşılır; çözüm elementi kullanmadan önce tekrar locate etmektir."
}
},
    ],
  },
  en: {
    title: '🚨 Common Errors & Solutions',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Selenium error messages behave like Java\'s checked exceptions: you read the message at face value, look in the wrong place, and spend hours debugging. For example, NoSuchElementException looks like "your locator is wrong" — but most of the time the locator is correct and the element simply has not been added to the DOM yet, analogous to reading a Java Future without calling .get() first. If these errors are documented and well-known, why does everyone fall into the same traps? Because the error message reports the symptom, not the root cause: "Unable to locate element" makes the mind jump to "fix the locator," but the actual problem is usually timing, a missing iframe context switch, or a DOM re-render. StaleElementReferenceException is like accessing a Java WeakReference after garbage collection: the element was captured, the DOM re-rendered, and the reference is no longer valid — papering over it with another findElement hides the problem. In QA, accumulating these errors produces flaky test reports: CI appears green but the same test passes intermittently; this unreliability creates a culture where the team ignores all test results, which is far more dangerous than a test suite that simply fails.',
      },
      seleniumStaleElementDiagnosisFilm,
      seleniumStaleElementDiagnosisSteps,
      {
        type: 'error-dictionary',
          relatedTopicId: 'selenium-webdriver-errors',
        framework: 'Selenium WebDriver',
        errors: [
          {
            error: 'NoSuchElementException',
            fullMessage: 'Unable to locate element: {"method":"id","selector":"loginBtn"}',
            cause: { en: 'Element not in DOM or not yet loaded. Wrong locator or inside an iframe.' },
            solution: { en: '1) Test locator in DevTools: document.querySelector("#loginBtn")\n2) Add explicit wait: wait.until(EC.presenceOfElementLocated(By.id("loginBtn")))\n3) If inside iframe, call switchTo().frame() first' },
            codeWrong: `driver.findElement(By.id("loginBtn")).click(); // Before page loads`,
            codeFixed: `wait.until(EC.elementToBeClickable(By.id("loginBtn"))).click();`,
          },
          {
            error: 'StaleElementReferenceException',
            fullMessage: 'stale element reference: element is not attached to the page document',
            cause: { en: 'DOM changed after element reference was captured. Common in React/Vue SPAs.' },
            solution: { en: '1) Re-find element before each use\n2) Catch and retry on StaleElementReferenceException\n3) Wait for element stability' },
            codeFixed: `driver.navigate().refresh();
wait.until(EC.elementToBeClickable(By.id("btn"))).click(); // Re-find`,
          },
          {
            error: 'ElementNotInteractableException',
            fullMessage: 'element not interactable',
            cause: { en: 'Element exists but is invisible or blocked by another element.' },
            solution: { en: '1) Wait for visibility\n2) Scroll into view\n3) Click via JavaScript' },
            codeFixed: `WebElement el = wait.until(EC.visibilityOfElementLocated(By.id("btn")));
el.click();`,
          },
          {
            error: 'TimeoutException',
            fullMessage: 'Expected condition failed after 15 second(s)',
            cause: { en: 'Condition never met within timeout. Wrong locator or slow network.' },
            solution: { en: '1) Increase timeout\n2) Verify locator is correct\n3) Check Network tab' },
          },
          {
            error: 'SessionNotCreatedException',
            fullMessage: 'ChromeDriver only supports Chrome version XX',
            cause: { en: 'ChromeDriver version mismatch with installed Chrome.' },
            solution: { en: '1) Use Selenium 4.6+ (Selenium Manager auto-handles)\n2) Download matching ChromeDriver version' },
          },
          {
            error: 'NoSuchWindowException',
            fullMessage: 'no such window: target window already closed',
            cause: { en: 'Window was closed or handle is no longer valid.' },
            solution: { en: '1) Switch back to main window before closing\n2) List active windows with driver.getWindowHandles()' },
          },
          {
            error: 'InvalidSelectorException',
            fullMessage: 'invalid selector specified',
            cause: { en: 'Invalid CSS Selector or XPath syntax.' },
            solution: { en: '1) Test CSS in DevTools: document.querySelector("selector")\n2) Test XPath: $x("//xpath")\n3) Escape special characters' },
          },
          {
            error: 'UnexpectedAlertPresentException',
            fullMessage: 'unexpected alert open: {Alert text: Are you sure?}',
            cause: { en: 'An unexpected alert appeared and blocked Selenium.' },
            solution: { en: '1) Handle alert in your test flow\n2) Use try-catch to dismiss unexpected alerts' },
          },
        ],
      },
      seleniumStaleElementPractice,
      {
        type: 'quiz',
        question: 'Which exception is most common in a React/Vue (SPA) app because the DOM updates constantly?',
        options: [
          { id: 'a', text: 'NoSuchElementException' },
          { id: 'b', text: 'StaleElementReferenceException' },
          { id: 'c', text: 'InvalidSelectorException' },
          { id: 'd', text: 'NoSuchWindowException' },
        ],
        correct: 'b',
        explanation: 'StaleElementReferenceException occurs when the DOM changes AFTER an element reference was captured (common in SPAs). The fix: re-find the element right before each use.',
      
        retryQuestion: {
      "question": "When testing a dynamic SPA, why would Selenium throw a 'StaleElementReferenceException' even if the element was correctly located a moment ago?",
      "options": [
            {
                  "id": "a",
                  "text": "Because the driver lost connection to the browser."
            },
            {
                  "id": "b",
                  "text": "Because the element was detached or re-rendered in the DOM after the initial lookup."
            },
            {
                  "id": "c",
                  "text": "Because the CSS selector provided is syntactically incorrect."
            },
            {
                  "id": "d",
                  "text": "Because the page is taking too long to load initial assets."
            }
      ],
      "correct": "b",
      "explanation": "A StaleElementReferenceException indicates that the element reference held by the driver is no longer valid because the underlying DOM node was updated or replaced by the framework (React/Vue). You must refresh the reference by re-locating the element."
}
},
    ],
  },
}

// ─── S13: MÜLAKAT SORULARI (50 SORU) (Eski S9) ───────────────────────────────
const s13 = {
  tr: {
    title: '💼 Mülakat Soruları — 50 Soru (Basic/Intermediate/Advanced)',
    blocks: [
      {
        type: 'simple-box', emoji: '🎓',
        content: 'Selenium mülakat soruları, Java Core sorularından farklı bir zihinsel modeli test eder: "API\'yi ezberledin mi?" değil, "gerçek bir otomasyon projesinde sorun çözebiliyor musun?" Tıpkı Java\'da "Collections nedir?" yerine "HashMap ile ConcurrentHashMap arasındaki farkı production threading senaryosunda anlat" diye sorulması gibi — doğru cevap belleği değil, kök-neden analizi yapabilme kapasitesini ölçer. Peki Selenium öğrendikten sonra bu soruları çalışmak neden hâlâ gerekiyor? Çünkü mülakatta karşılaştığın senaryo ("CI\'da aralıklı başarısız olan testler var, nasıl stabilize edersin?") kendi projende hiç görmediğin bir durumu tarif edebilir; bu 50 soru her senaryo kategorisini önceden yaşatır, mülakatta "buna benzeri bir şeyle karşılaştım" hissini verir. Java bilgini avantaja dönüştür: "Java\'daki Future timeout mekanizması gibi ExplicitWait..." şeklinde çapraz bağ kurabilmek, aynı soruyu Selenium-only bilen birine göre çok daha güçlü bir cevap üretir ve mülakatçıda derin teknik anlayış izlenimi bırakır.',
      },
      seleniumInterviewAnswerFilm,
      seleniumInterviewAnswerSteps,
      seleniumInterviewPractice,
      {
        type: 'interview-questions',
          relatedTopicId: 'selenium-webdriver',
        topic: 'Selenium WebDriver',
        questions: [
          // BASIC (15 soru)
          {
            level: 'basic',
            q: { tr: 'Bir web formunu test ediyorsunuz ve testiniz bazen "NoSuchElementException" veriyor ama sayfayı elle açtığınızda her şey normal görünüyor. Nedeni ne olabilir?', en: 'Your web form test sometimes throws NoSuchElementException but the page looks fine when opened manually. What could be the cause?' },
            a: { tr: 'Bu hatanın en yaygın sebebi timing (zamanlama) sorunudur. Sayfa görsel olarak hazır görünse bile DOM elementleri JavaScript tarafından sonradan ekleniyor olabilir. Çözüm: Thread.sleep() yerine WebDriverWait + ExpectedConditions.visibilityOfElementLocated() veya elementToBeClickable() kullanın. Java\'da FluentWait ile polling interval da belirleyebilirsiniz. Ikinci olası sebep iframe: element bir iframe içindeyse önce driver.switchTo().frame() yapılmalıdır. Üçüncü sebep: farklı ağ hızları — CI/CD ortamında lokal makineden daha yavaş olabilir, timeout süresini artırın.', en: 'The most common cause is a timing issue. Even if the page appears visually ready, DOM elements may be added later by JavaScript. Solution: use WebDriverWait + ExpectedConditions instead of Thread.sleep(). Also check for iframes — call switchTo().frame() first. Another cause: CI/CD runs slower than local, so increase the timeout.' },
            analogy: { tr: 'Bu durum Java tarafında asenkron doldurulan bir nesneyi çok erken okumaya benzer. Kod satırı doğru yerde olabilir ama veri henüz gelmemiştir; Selenium\'da da locator doğru olsa bile element o anda henüz erişilebilir olmayabilir.', en: 'This is like reading an asynchronously populated object too early in Java. The line of code may be correct, but the data has not arrived yet; in Selenium, the locator may also be correct while the element is still not accessible at that moment.' },
            keyPoints: [
              { tr: 'İlk ayrım: locator yanlış mı, yoksa element henüz hazır değil mi?', en: 'First distinction: is the locator wrong, or is the element simply not ready yet?' },
              { tr: 'Hazırlık sinyalini isimlendir: visible, clickable ya da iframe context değişimi.', en: 'Name the readiness signal clearly: visible, clickable, or an iframe context switch.' },
              { tr: 'Timeout artırmak tek başına çözüm değildir; doğru wait condition ile birlikte düşünülmelidir.', en: 'Increasing the timeout alone is not a fix; it must be paired with the right wait condition.' },
            ],
            tip: { tr: 'Mülakatta cevabı şu sırayla ver: problemi timing diye sınıflandır, hangi wait condition\'ı seçeceğini söyle, sonra bunu nasıl doğruladığını ekle.', en: 'In the interview, answer in this order: classify it as a timing issue, state which wait condition you would choose, then explain how you verified the fix.' },
          },
          {
            level: 'basic',
            q: { tr: 'Java\'da By.id, By.cssSelector ve By.xpath arasındaki performans farkını açıklayın. Hangisini ne zaman tercih edersiniz?', en: 'Explain the performance difference between By.id, By.cssSelector, and By.xpath in Java. When do you prefer each?' },
            a: { tr: 'By.id en hızlıdır çünkü tarayıcılar document.getElementById() ile O(1) lookup yapar. By.cssSelector ikinci sırada, modern tarayıcıların selector engine\'i CSS query\'leri native olarak optimize eder. By.xpath en yavaşıdır çünkü DOM\'un tamamını traverse edebilir. Tercih sırası: 1) ID varsa By.id, 2) yoksa By.cssSelector, 3) gerektiğinde By.xpath (üst-alt ilişkisi veya metin arama). Java\'da By.xpath("//button[text()=\'Login\']") gibi metin aramaları için XPath kaçınılmazdır.', en: 'By.id is fastest — O(1) via document.getElementById(). By.cssSelector is second — the browser’s selector engine natively optimizes CSS queries. By.xpath is slowest — it can traverse the entire DOM. Preference order: 1) By.id if ID exists, 2) By.cssSelector otherwise, 3) By.xpath only when necessary (parent-child relationship or text search).' },
            analogy: { tr: 'Bu seçim Java koleksiyonlarında `Map` varken gereksiz yere tüm `List`i dolaşmaya benzer. Doğrudan anahtarla bulabiliyorsan `By.id`, biraz daha esnek filtre gerekiyorsa `cssSelector`, gerçekten ağaç ilişkisi ya da metin gerekiyorsa `xpath` seçersin.', en: 'This choice is like iterating over an entire Java `List` when a `Map` lookup is available. If a direct key exists, use `By.id`; if you need a more flexible filter, use `cssSelector`; if you truly need tree relationships or text, use `xpath`.' },
            keyPoints: [
              { tr: 'Tercih sırasını ezber değil gerekçe ile anlat.', en: 'Explain the preference order with reasoning, not memorization.' },
              { tr: 'XPath kötü değildir; sadece daha güçlü ve daha pahalı bir araçtır.', en: 'XPath is not bad; it is simply a more powerful and more expensive tool.' },
              { tr: 'En olgun cevap performans, okunabilirlik ve bakım maliyetini birlikte tartar.', en: 'The most mature answer weighs performance, readability, and maintenance cost together.' },
            ],
            tip: { tr: '“Her zaman XPath kullanmam” demek yerine, hangi durumda mecburen XPath seçtiğini de söylersen cevap güçlenir.', en: 'Instead of just saying “I do not always use XPath,” strengthen the answer by giving a case where XPath is genuinely the right choice.' },
          },
          {
            level: 'basic',
            q: { tr: 'sendKeys() ile type() arasındaki fark nedir? JavaScript inject ile sendKeys() arasında ne tercih edersiniz?', en: 'What is the difference between sendKeys() and JavaScript injection for typing? Which do you prefer?' },
            a: { tr: 'sendKeys() gerçek klavye olayları (keydown, keypress, keyup) tetikler — bu daha gerçekçidir ve event listener\'lar tetiklenir. JavaScript ile değer atama (arguments[0].value=\'text\') ise event tetiklemez, sadece DOM değerini değiştirir. JavaScript tercih edilmesi gereken durumlar: element hidden veya disabled iken, React controlled input\'larda sendKeys() bazen çalışmaz (onChange tetiklenmez), date picker gibi native JS bileşenleri. Best practice: önce sendKeys() dene, çalışmazsa JS fallback kullan.', en: 'sendKeys() triggers real keyboard events (keydown, keypress, keyup) — more realistic and triggers event listeners. JavaScript value injection changes the DOM value without firing events. Use JS when: element is hidden/disabled, React controlled inputs where sendKeys() may not trigger onChange, or native date pickers. Best practice: try sendKeys() first, fall back to JS.' },
            analogy: { tr: 'Bu fark, Java\'da setter metodunu çağırmak ile reflection kullanıp alanı doğrudan değiştirmek arasındaki farka benzer. Setter iş kurallarını ve yan etkileri çalıştırır; doğrudan atama ise değeri değiştirir ama yaşam döngüsünü atlayabilir.', en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' },
            keyPoints: [
              { tr: 'Önce gerçek kullanıcı davranışını taklit eden yolu tercih et.', en: 'Prefer the path that best mimics real user behavior first.' },
              { tr: 'JS inject bir hile değil; zor bileşenlerde kontrollü bir fallback\'tir.', en: 'JS injection is not automatically a hack; it is a controlled fallback for difficult components.' },
              { tr: 'Cevapta event tetiklenmesi farkını özellikle vurgula.', en: 'Make sure to emphasize the event-triggering difference in your answer.' },
            ],
            tip: { tr: '“Önce sendKeys, sonra gerekirse JS fallback” yaklaşımı mülakatta hem gerçekçilik hem pragmatizm gösterir.', en: '“sendKeys first, JS fallback if needed” shows both realism and pragmatism in an interview.' },
          },
          {
            level: 'basic',
            q: { tr: 'driver.close() ile driver.quit() arasındaki fark nedir? Testlerde hangisini ne zaman kullanmalısınız?', en: 'What is the difference between driver.close() and driver.quit()? When should each be used in tests?' },
            a: { tr: 'driver.close() yalnızca aktif (focused) tarayıcı penceresini kapatır ama WebDriver session\'ı ve diğer pencereleri açık bırakır. driver.quit() ise tüm pencereleri kapatır ve WebDriver session\'ını tamamen sonlandırır. Test teardown\'da (AfterMethod/after) her zaman driver.quit() kullanın, aksi takdirde süreç bellekte kalır. @AfterMethod\'da driver != null kontrolü yapın: ChromeDriver process crash\'i yakalamak için if (driver != null) driver.quit() yazın.', en: 'driver.close() closes only the active window but keeps the WebDriver session and other windows open. driver.quit() closes all windows and terminates the entire WebDriver session. Always use driver.quit() in test teardown (@AfterMethod/after), otherwise the process remains in memory. Add null check: if (driver != null) driver.quit().' },
            analogy: { tr: 'Bu, Java\'da tek bir `Closeable.close()` çağrısı ile yalnızca o kaynağı kapatmak ve `try-with-resources` sonunda kapsamdaki tüm kaynakların kapanması arasındaki farka benzer. `close()` aktif pencereyi kapatır; `quit()` ise tüm tarayıcı oturumunu temizler.', en: 'This is like the difference between calling `close()` on a single `Closeable` and letting `try-with-resources` close every resource in scope. `close()` shuts the active window; `quit()` cleans up the entire browser session.' },
            keyPoints: [
              { tr: 'close aktif pencereyi kapatır, quit tüm session\'ı bitirir.', en: 'close ends the active window; quit ends the whole session.' },
              { tr: 'Teardown cevabında kaynak temizliğini merkeze koy.', en: 'Put resource cleanup at the center of your teardown answer.' },
              { tr: 'Orphan browser process ve memory leak riski iyi bir artı detaydır.', en: 'Orphan browser processes and memory leaks are strong extra details to mention.' },
            ],
            tip: { tr: 'Bunu sadece tanım olarak bırakma; `quit()` çağrılmazsa CI ajanında neden problem biriktiğini de söyle.', en: 'Do not leave this as a definition only; explain why skipping `quit()` causes problems to pile up on a CI agent.' },
          },
          {
            level: 'basic',
            q: { tr: 'Implicit Wait ve Explicit Wait\'i aynı anda kullanabilir misiniz? Ne gibi sorunlara yol açar?', en: 'Can you use Implicit Wait and Explicit Wait together? What problems can this cause?' },
            a: { tr: 'Teknik olarak kullanabilirsiniz ama KESİNLİKLE tavsiye edilmez. İkisi birlikte kullanıldığında, Explicit Wait\'in beklediği süre + Implicit Wait\'in beklediği süre toplanabilir ve beklenmedik uzun timeout\'lara yol açar. Örnek: Implicit 10sn + Explicit 15sn beklediğinizde bazı durumlarda 25sn bekliyorsunuz. Selenium resmi dokümantasyonu "mixing waits is not recommended" diyor. Best practice: Yalnızca Explicit Wait kullanın, Implicit Wait\'i sıfıra ayarlayın.', en: 'Technically yes, but it is strongly NOT recommended. When used together, timeouts can compound — Implicit + Explicit wait times can add up leading to unexpected long waits. Example: 10s implicit + 15s explicit can result in 25s wait. Selenium docs explicitly say "mixing waits is not recommended." Best practice: use only Explicit Wait and set Implicit Wait to zero.' },
            analogy: { tr: 'Java\'da aynı işi hem dışarıdan timeout ile sarıp hem de içeride ikinci bir bloklayıcı bekleme koymaya benzer. Toplam bekleme süresi kağıt üzerinde basit görünür ama çalışma anında öngörülemez hale gelir.', en: 'This is like wrapping the same Java operation with an outer timeout while also placing another blocking wait inside. On paper the waits look simple, but at runtime the total behavior becomes unpredictable.' },
            keyPoints: [
              { tr: 'Asıl problem çalışması değil, bekleme süresinin öngörülemez olmasıdır.', en: 'The real problem is not whether it works, but that the wait duration becomes unpredictable.' },
              { tr: 'Selenium dokümantasyonundaki tavsiyeyi anmak cevabı güçlendirir.', en: 'Referencing Selenium’s own recommendation makes the answer stronger.' },
              { tr: 'Temiz yaklaşım: implicit sıfır, explicit bilinçli seçim.', en: 'Clean approach: implicit zero, explicit deliberate choice.' },
            ],
            tip: { tr: 'Rakamlı örnek ver: “10 saniye + 15 saniye bazen 25 saniyelik davranış üretiyor” dediğinde problem çok daha somut anlaşılır.', en: 'Give a numeric example: saying “10 seconds + 15 seconds can behave like a 25-second wait” makes the problem much more concrete.' },
          },
          {
            level: 'basic',
            q: { tr: 'Select dropdown\'da "option" elementinin hem ID\'si hem de value\'su olmadığında nasıl seçim yaparsınız?', en: 'How do you select an option from a dropdown when neither the option ID nor value is available?' },
            a: { tr: 'Select sınıfının 3 yöntemi var: selectByVisibleText() görünen metne göre seçer — en yaygın yöntem. selectByValue() value attribute\'una göre seçer. selectByIndex() sırasına göre seçer (0\'dan başlar). Value ve ID yoksa, selectByVisibleText("Türkiye") kullanılır. Eğer custom dropdown ise (div/ul ile yapılmış), Actions ile click yapıp listeden element seçmek gerekir. Python\'da select_by_visible_text(), TypeScript\'te sendKeys() ile görünen metin yazılır.', en: 'The Select class has 3 methods: selectByVisibleText() selects by visible text — most common. selectByValue() uses the value attribute. selectByIndex() uses position (0-based). When neither value nor ID exists, use selectByVisibleText("Turkey"). For custom dropdowns (div/ul based), use Actions to click and select from the list. Python: select_by_visible_text(), TypeScript: sendKeys() with visible text.' },
            analogy: { tr: 'Bu, Java enum değerini teknik anahtarla değil kullanıcıya görünen label ile eşleştirmeye benzer. Güvenilir bir ID yoksa, sözleşme olarak elde kalan tek şey visible text olur.', en: 'This is like matching a Java enum not by a technical key but by the user-facing label. If there is no reliable ID, the visible text becomes the only contract left.' },
            keyPoints: [
              { tr: 'Önce bunun gerçek `<select>` mi yoksa custom component mi olduğunu ayır.', en: 'First separate whether this is a real `<select>` or a custom component.' },
              { tr: 'Native select için visible text en doğal çözümdür.', en: 'For a native select, visible text is the most natural solution.' },
              { tr: 'Custom dropdown sorusunda `Select` sınıfının çalışmayacağını özellikle söyle.', en: 'In a custom dropdown answer, explicitly say that the `Select` class will not work.' },
            ],
            tip: { tr: '“Önce DOM tipini kontrol ederim” dersen, ezber araç listesi değil teşhis odaklı düşündüğünü göstermiş olursun.', en: 'Saying “I first check the DOM type” shows diagnostic thinking instead of just reciting tools.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir checkbox\'ın işaretli olup olmadığını kontrol edip, eğer işaretli değilse işaretlemek için nasıl kod yazarsınız?', en: 'How do you check if a checkbox is checked and click it only if it\'s not already checked?' },
            a: { tr: 'element.isSelected() metodu checkbox, radio button ve select option\'ları için true/false döndürür. Java\'da: WebElement cb = driver.findElement(By.id("agree")); if (!cb.isSelected()) { cb.click(); } — bu pattern idempotent test yazmanızı sağlar ve test iki kez çalışsa bile aynı sonucu verir. Python\'da is_selected(), TypeScript\'te isSelected() kullanılır. Boolean durumu get_attribute("checked") ile de kontrol edilebilir.', en: 'element.isSelected() returns true/false for checkboxes, radio buttons, and select options. Java: WebElement cb = driver.findElement(By.id("agree")); if (!cb.isSelected()) { cb.click(); } — this pattern makes tests idempotent. Python: is_selected(), TypeScript: isSelected(). Boolean state can also be checked via get_attribute("checked").' },
            analogy: { tr: 'Bu, Java\'da `if (!list.contains(x)) list.add(x)` yazıp aynı elemanı iki kez eklemeyi önlemeye benzer — testin tekrar çalıştırılsa bile checkbox\'ı gereksiz yere tekrar tıklamamasını sağlarsın.', en: 'This is like writing `if (!list.contains(x)) list.add(x)` in Java to avoid adding the same item twice — you make sure the checkbox isn\'t clicked again unnecessarily even if the test reruns.' },
            keyPoints: [
              { tr: 'isSelected() sadece checkbox/radio/option için anlamlıdır, normal butonlar için kullanılmaz.', en: 'isSelected() is only meaningful for checkbox/radio/option elements, not regular buttons.' },
              { tr: 'Önce durumu oku, sonra aksiyon al — körlemesine click() atma.', en: 'Read the state first, then act — don\'t blindly click().' },
              { tr: 'Bu pattern test\'i tekrar çalıştırılabilir (idempotent) yapar, CI\'da yeniden deneme sırasında hata önler.', en: 'This pattern makes the test idempotent and prevents errors when CI retries it.' },
            ],
            tip: { tr: 'Cevaba sadece metod adını söylemekle başlama; neden önce kontrol ettiğini (gereksiz state değişikliğini önlemek için) açıkla.', en: 'Don\'t just name the method — explain why you check first (to avoid an unnecessary state change).' },
          },
          {
            level: 'basic',
            q: { tr: 'Tarayıcıda birden fazla sekme açıldığında Selenium bu sekmeleri nasıl yönetir?', en: 'How does Selenium manage multiple browser tabs when they are open?' },
            a: { tr: 'Her pencere/sekmenin benzersiz bir "window handle" (String UUID) vardır. driver.getWindowHandles() tüm handle\'ları Set<String> olarak döndürür; driver.getWindowHandle() aktif pencereyi döndürür. Yeni sekmeye geçmek için döngüde mevcut handle\'ı atla ve diğerine switchTo().window(handle) yap. Selenium 4\'te driver.switchTo().newWindow(WindowType.TAB) ile programatik sekme açılabilir. Test sonunda her zaman açılan sekmeleri kapatıp ana pencereye dönün.', en: 'Each window/tab has a unique "window handle" (String UUID). driver.getWindowHandles() returns all handles as Set<String>; driver.getWindowHandle() returns the current window. To switch to a new tab, iterate handles, skip the current one, and call switchTo().window(handle). Selenium 4 allows programmatic new tabs via switchTo().newWindow(WindowType.TAB). Always close opened tabs and return to main window at test end.' },
            analogy: { tr: 'Window handle\'lar, Java\'da `Set<String>` içinde tuttuğun ID\'lere benzer — her pencerenin kendine özgü bir kimliği var ve doğru pencereye geçmek için o ID\'yi bulup `switchTo()` ile odağı değiştirirsin.', en: 'Window handles are like IDs stored in a Java `Set<String>` — each window has its own identity, and switching focus means finding the right ID and calling `switchTo()`.' },
            keyPoints: [
              { tr: 'Yeni sekme açıldığında driver\'ın odağı otomatik değişmez, manuel switchTo() gerekir.', en: 'Opening a new tab doesn\'t move the driver\'s focus automatically — you must call switchTo() manually.' },
              { tr: 'Mevcut handle\'ı bilmeden döngüde kaybolmamak için getWindowHandle() ile başlangıç noktasını kaydet.', en: 'Save the starting handle with getWindowHandle() before looping so you don\'t lose track.' },
              { tr: 'İş bitince ana pencereye dönmeyi unutma, yoksa sonraki adımlar yanlış sekmede çalışır.', en: 'Remember to switch back to the main window when done, otherwise later steps run in the wrong tab.' },
            ],
            tip: { tr: 'Senaryoyu somutlaştır: "Login sonrası yeni sekmede açılan fatura PDF\'ini doğrulamam gerekiyordu" gibi gerçek bir örnek ver.', en: 'Make it concrete: give a real example like "I needed to verify an invoice PDF that opened in a new tab after login."' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium ile ekran görüntüsü almak için hangi arayüz kullanılır ve nasıl uygulanır?', en: 'Which interface is used for taking screenshots in Selenium and how is it implemented?' },
            a: { tr: 'TakesScreenshot arayüzü kullanılır. WebDriver\'ı cast etmek gerekir: TakesScreenshot ts = (TakesScreenshot) driver; File screenshot = ts.getScreenshotAs(OutputType.FILE); FileUtils.copyFile(screenshot, new File("test.png")). Python\'da driver.save_screenshot("test.png") veya driver.get_screenshot_as_file("test.png"). TypeScript\'te driver.takeScreenshot() Base64 string döndürür, fs ile dosyaya yazılır. Test hata verdiğinde otomatik ekran görüntüsü için @AfterMethod\'da try-catch kullanılır.', en: 'The TakesScreenshot interface is used. Cast WebDriver: TakesScreenshot ts = (TakesScreenshot) driver; File screenshot = ts.getScreenshotAs(OutputType.FILE); FileUtils.copyFile(screenshot, new File("test.png")). Python: driver.save_screenshot("test.png"). TypeScript: driver.takeScreenshot() returns Base64 string, write with fs. For auto-screenshot on failure, use try-catch in @AfterMethod.' },
            analogy: { tr: 'Bu, Java\'da bir interface\'i implement eden sınıfı cast edip özel bir yeteneğini kullanmaya benzer — WebDriver\'ı `TakesScreenshot`\'a cast edince ekstra bir yetenek (ekran görüntüsü alma) ortaya çıkar.', en: 'This is like casting a Java object to an interface it implements to access an extra capability — casting WebDriver to `TakesScreenshot` unlocks the screenshot ability.' },
            keyPoints: [
              { tr: 'Her WebDriver implementasyonu bu interface\'i destekler, ama yine de cast etmen gerekir.', en: 'Every WebDriver implementation supports this interface, but you still need to cast to it.' },
              { tr: 'En değerli kullanım anı: test FAIL olduğunda otomatik ekran görüntüsü almak.', en: 'The most valuable use is capturing a screenshot automatically when a test fails.' },
              { tr: 'Ekran görüntüsünü raporlama aracına (Allure, ExtentReports) eklemek hata analizini hızlandırır.', en: 'Attaching the screenshot to a reporting tool (Allure, ExtentReports) speeds up failure analysis.' },
            ],
            tip: { tr: 'Sadece sözdizimini ezbere söyleme; bunu neden @AfterMethod\'da try-catch içinde tetiklediğini de anlat.', en: 'Don\'t just recite syntax — explain why you trigger this inside a try-catch in @AfterMethod.' },
          },
          {
            level: 'basic',
            q: { tr: 'JavaScript\'i Selenium testinizde çalıştırmanız gereken 3 farklı durum örneği verin.', en: 'Give 3 different situations where you need to execute JavaScript in your Selenium test.' },
            a: { tr: '1) Scroll: element viewport dışındaysa js.executeScript("arguments[0].scrollIntoView(true)", el) — Actions.moveToElement() MoveTargetOutOfBoundsException verebilir. 2) Gizli element: display:none olan elemente tıklamak: js.executeScript("arguments[0].click()", hiddenEl) — normal click() ElementNotInteractableException verir. 3) Input değeri: Date picker veya readonly input\'a değer atama: js.executeScript("arguments[0].value=\'2024-01-15\'", dateInput) — sendKeys() native takvimi açabilir. 4) Ekstra: Sayfa hazır mı kontrol: (String)js.executeScript("return document.readyState") == "complete".', en: '1) Scroll: js.executeScript("arguments[0].scrollIntoView(true)", el) when element is outside viewport. 2) Hidden element: js.executeScript("arguments[0].click()", hiddenEl) when normal click() throws ElementNotInteractableException. 3) Input value: js.executeScript("arguments[0].value=\'2024-01-15\'", dateInput) for date pickers or readonly inputs. 4) Bonus: Page ready check: (String)js.executeScript("return document.readyState") == "complete".' },
            analogy: { tr: 'Bu, Java\'da normal yoldan ulaşamadığın bir private field\'a reflection ile erişmeye benzer — Selenium\'un standart API\'si yetmediğinde JavaScript executor bir arka kapı görevi görür.', en: 'This is like using reflection in Java to reach a private field you can\'t access normally — when Selenium\'s standard API isn\'t enough, the JavaScript executor acts as a back door.' },
            keyPoints: [
              { tr: 'JS\'e başvurmak son çare olmalı, ilk tercih her zaman native Selenium metodlarıdır.', en: 'JS should be the last resort — native Selenium methods are always the first choice.' },
              { tr: 'Her JS kullanımını yorum satırıyla "neden gerekti" diye not almak takım arkadaşına yardımcı olur.', en: 'Comment every JS usage with "why it was needed" to help teammates.' },
              { tr: 'JS ile yapılan etkileşim gerçek kullanıcı davranışını taklit etmez, bunu raporda/PR\'da belirt.', en: 'JS-driven interaction doesn\'t mimic real user behavior — flag this in your report/PR.' },
            ],
            tip: { tr: 'Üç örneği ezbere sıralama yerine, her birinin "normal yöntem neden çalışmadı" kısmını anlat — bu mülakatta analiz yeteneğini gösterir.', en: 'Instead of reciting three examples, explain for each why the normal method failed first — this shows analytical thinking in the interview.' },
          },
          {
            level: 'basic',
            q: { tr: 'Cookie ile giriş yaparak test süresini nasıl kısaltırsınız? Hangi senaryolarda bunu kullanırsınız?', en: 'How do you shorten test time by using cookies for login? In which scenarios do you use this?' },
            a: { tr: 'Login ekranından geçmeden direkt oturumu cookie olarak enjekte edersiniz. Önce normal giriş yapıp session cookie\'yi alın: driver.manage().getCookieNamed("session"). Sonraki testlerde: driver.get(baseUrl) → driver.manage().addCookie(savedCookie) → driver.navigate().refresh(). Bu yöntem her test için UI login\'i atlar ve test süresini 5-10 saniye kısaltır. Uygun senaryolar: hesap gerektiren sayfalarda negatif test, checkout, profil gibi authenticated sayfalar. Sınırlamalar: cookie expire süresi, HTTPS sitelerde secure flag.', en: 'Instead of going through the login screen, inject a session cookie directly. First do a normal login and capture: driver.manage().getCookieNamed("session"). Then for subsequent tests: driver.get(baseUrl) → driver.manage().addCookie(savedCookie) → driver.navigate().refresh(). This skips UI login for each test and saves 5-10 seconds. Good for: authenticated pages like checkout, profile, account settings. Limitations: cookie expiry, secure flag on HTTPS sites.' },
            analogy: { tr: 'Bu, Java\'da her istekte yeniden kimlik doğrulamak yerine bir kez alınan JWT token\'ı header\'a koyup tekrar kullanmaya benzer — login akışını her seferinde baştan koşturmak yerine oturumu "hazır" olarak enjekte edersin.', en: 'This is like reusing a JWT token in a header instead of re-authenticating on every request in Java — instead of running the full login flow every time, you inject a session that\'s already "ready."' },
            keyPoints: [
              { tr: 'Bu yöntem login akışını test etmez, sadece login SONRASI senaryoları hızlandırır.', en: 'This doesn\'t test the login flow itself — it only speeds up post-login scenarios.' },
              { tr: 'Login\'in kendisini en az bir yerde UI üzerinden gerçek şekilde de test etmeyi unutma.', en: 'Don\'t forget to still test the actual login flow through the UI at least once.' },
              { tr: 'Cookie\'nin expire süresine dikkat et, expired cookie ile testler anlamsız şekilde fail eder.', en: 'Watch the cookie expiry — an expired cookie causes confusing test failures.' },
            ],
            tip: { tr: '"Her testte login akışını koşturmak gereksiz risk ve zaman kaybı" diyerek neden bu optimizasyonu yaptığını gerekçelendir.', en: 'Justify the optimization by saying running the login flow on every test is unnecessary risk and wasted time.' },
          },
          {
            level: 'basic',
            q: { tr: 'getText() boş string döndürürse ne yaparsınız? Bu durumun yaygın sebepleri nelerdir?', en: 'What do you do when getText() returns an empty string? What are common causes?' },
            a: { tr: 'getText() boş döndürmesinin başlıca nedenleri: 1) Element görünmüyor (hidden): getInnerText yalnızca visible elementi döndürür. Çözüm: getAttribute("textContent") veya getAttribute("innerHTML") kullan. 2) Element henüz yüklenmemiş: Explicit Wait ekle. 3) Shadow DOM: shadowRoot içindeki elementler normal getText() ile alınamaz, JS executeScript gerekir. 4) Dinamik içerik: text AJAX sonrası geliyor olabilir. Kontrol yöntemi: getAttribute("innerText") dene, getText() ile karşılaştır.', en: 'Common causes: 1) Element is hidden: getText() returns empty for non-visible elements. Fix: use getAttribute("textContent") or getAttribute("innerHTML"). 2) Element not loaded yet: add Explicit Wait. 3) Shadow DOM: elements inside shadowRoot cannot be accessed by normal getText(), JS is required. 4) Dynamic content: text may arrive after AJAX. Diagnostic: try getAttribute("innerText") and compare with getText().' },
            analogy: { tr: 'Bu, Java\'da bir objenin `toString()`\'inin boş dönmesi gibi — sorun objenin yokluğu değil, henüz beklediğin state\'e ulaşmamış olmasıdır.', en: 'This is like a Java object\'s `toString()` returning empty — the issue isn\'t that the object is missing, it\'s that it hasn\'t reached the expected state yet.' },
            keyPoints: [
              { tr: 'getText() sadece görünür (visible) içeriği döndürür, bu en sık unutulan kuraldır.', en: 'getText() only returns visible content — this is the most commonly forgotten rule.' },
              { tr: 'Sebebi tahmin etmeden önce getAttribute(\'textContent\') ile karşılaştırarak teşhis koy.', en: 'Diagnose before guessing — compare with getAttribute(\'textContent\') first.' },
              { tr: 'Shadow DOM ihtimalini de unutma, normal getText() oraya giremez.', en: 'Don\'t forget Shadow DOM — normal getText() can\'t reach inside it.' },
            ],
            tip: { tr: 'Doğrudan "bug var" deme; önce hangi ihtimali nasıl elediğini anlatarak sistematik debug yaklaşımını göster.', en: 'Don\'t jump to "it\'s a bug" — show your systematic debugging by explaining which possibility you ruled out first.' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium testlerinde Page Object Model (POM) neden kullanılır? Onsuz ne gibi sorunlar çıkar?', en: 'Why is Page Object Model (POM) used in Selenium tests? What problems occur without it?' },
            a: { tr: 'POM olmadan her test dosyasına locator hardcode yazılır. Bir element\'in ID\'si değişirse onlarca test dosyasını düzenlemeniz gerekir (maintenance hell). POM ile her sayfanın bir class\'ı olur, locator\'lar tek yerde tanımlanır. Test metodları UI detaylarına değil, iş mantığına odaklanır: loginPage.login(email, pass) gibi. Java\'da Pages klasörü altında LoginPage, CartPage gibi class\'lar, Python\'da aynı pattern. Avantajlar: test okunabilirliği, DRY prensibi, tek nokta değişiklik, takım çalışması kolaylığı.', en: 'Without POM, locators are hardcoded in every test file. If one element ID changes, dozens of files need updating (maintenance hell). With POM, each page has a class and locators are defined in one place. Test methods focus on business logic, not UI details: loginPage.login(email, pass). Structure: Pages folder with LoginPage, CartPage, etc. Benefits: readability, DRY principle, single point of change, team collaboration.' },
            analogy: { tr: 'Bu, Java\'da her yerde aynı SQL string\'ini hardcode etmek yerine bir Repository/DAO katmanı yazmaya benzer — değişiklik tek bir yerde yapılır, her yeri tek tek düzeltmen gerekmez.', en: 'This is like writing a Repository/DAO layer in Java instead of hardcoding the same SQL string everywhere — a change happens in one place instead of fixing every call site.' },
            keyPoints: [
              { tr: 'POM\'un asıl kazancı "az kod" değil, "değişikliğin tek noktada yönetilmesi"dir.', en: 'POM\'s real value isn\'t "less code" — it\'s that change is managed from a single point.' },
              { tr: 'Test metodu UI detayını değil, iş senaryosunu okunaklı şekilde anlatmalı.', en: 'A test method should read like a business scenario, not expose UI details.' },
              { tr: 'POM olmadan büyüyen bir proje genelde 6 ay sonra "kimse locator\'ları değiştirmeye cesaret edemiyor" noktasına gelir.', en: 'Without POM, a growing project often reaches a point in 6 months where nobody dares to touch the locators.' },
            ],
            tip: { tr: 'Soyut "best practice" demek yerine, POM olmadan yaşadığın somut bir bakım sorununu örnek ver.', en: 'Instead of an abstract "best practice" answer, give a concrete maintenance pain you experienced without POM.' },
          },
          {
            level: 'basic',
            q: { tr: 'Selenium\'da headless modda Chrome çalıştırmak için ne yaparsınız? CI/CD\'de neden önemlidir?', en: 'How do you run Chrome in headless mode with Selenium? Why is it important in CI/CD?' },
            a: { tr: 'Java\'da ChromeOptions options = new ChromeOptions(); options.addArguments("--headless"); driver = new ChromeDriver(options). Python\'da options.add_argument("--headless"). TypeScript\'te builder.withCapabilities({browserName:"chrome", "goog:chromeOptions":{args:["--headless"]}}). CI/CD\'de önemli çünkü: 1) Linux sunucularda display yok, headless olmadan hata alınır 2) Daha hızlı çalışır 3) Kaynak tüketimi az. Not: --headless=new (Headless Shell) Chrome 112+ için önerilen.', en: 'Java: ChromeOptions options = new ChromeOptions(); options.addArguments("--headless"); driver = new ChromeDriver(options). Python: options.add_argument("--headless"). Important for CI/CD because: 1) Linux servers have no display — headless mode is required 2) Faster execution 3) Lower resource consumption. Note: --headless=new (Headless Shell) is recommended for Chrome 112+.' },
            analogy: { tr: 'Bu, Java\'da bir GUI uygulamasını sunucuda `-Djava.awt.headless=true` ile ekran olmadan çalıştırmaya benzer — tarayıcı motoru çalışır ama görsel render katmanı devre dışıdır.', en: 'This is like running a Java GUI app on a server with `-Djava.awt.headless=true` — the engine still runs, but the visual rendering layer is disabled.' },
            keyPoints: [
              { tr: 'Headless sadece hız için değil, display\'i olmayan Linux CI sunucularında zorunluluktur.', en: 'Headless isn\'t just for speed — it\'s mandatory on Linux CI servers with no display.' },
              { tr: 'Headless ve headful modda davranış farkı çıkabilir (örn. boyut/scroll), önemli testleri ikisinde de doğrula.', en: 'Headless and headful modes can behave differently (e.g. size/scroll) — verify important tests in both.' },
              { tr: 'Yeni --headless=new modu eski moddan daha güvenilir, eski projelerde flag\'i kontrol et.', en: 'The newer --headless=new flag is more reliable than the old mode — check this in legacy projects.' },
            ],
            tip: { tr: '"Hızlı çalışır" demekle yetinme; "sunucuda display olmadığı için zorunlu" kısmını mutlaka vurgula.', en: 'Don\'t stop at "it\'s faster" — make sure to emphasize it\'s mandatory because servers have no display.' },
          },
          {
            level: 'basic',
            q: { tr: 'XPath\'de absolute ve relative XPath arasındaki fark nedir? Hangisi neden tercih edilir?', en: 'What is the difference between absolute and relative XPath? Which is preferred and why?' },
            a: { tr: 'Absolute XPath: /html/body/div[1]/form/input[2] — kök\'ten (html) tam yolu verir. Herhangi bir DOM değişikliğinde kırılır. Relative XPath: //input[@id="username"] — herhangi bir yerden başlar, daha esnek. Absolute XPath ASLA kullanılmamalıdır çünkü: DOM\'a yeni bir div eklenirse tüm path kayar, Bootstrap/React gibi framework\'ler sıkça DOM değiştirir. Relative tercih edilmeli: //button[text()="Login"], //div[@class="form"]//input[@type="email"].', en: 'Absolute XPath: /html/body/div[1]/form/input[2] — full path from root. Breaks on any DOM change. Relative XPath: //input[@id="username"] — starts from anywhere, more flexible. Never use absolute XPath because: adding a new div shifts the entire path, frameworks like Bootstrap/React frequently change DOM. Always use relative: //button[text()="Login"], //div[@class="form"]//input[@type="email"].' },
            analogy: { tr: 'Bu, Java\'da bir dosyayı mutlak path (`C:\\Users\\...`) ile değil relative path ile referans vermeye benzer — yapı değiştiğinde mutlak yol her zaman kırılır, relative yol esnekliğini korur.', en: 'This is like referencing a file with a relative path instead of an absolute one (`C:\\Users\\...`) in Java — when the structure changes, the absolute path always breaks while the relative one stays flexible.' },
            keyPoints: [
              { tr: 'Absolute XPath\'i hiçbir zaman production test koduna yazma, sadece DevTools\'ta hızlı kontrol için kullan.', en: 'Never put absolute XPath in production test code — use it only for quick checks in DevTools.' },
              { tr: 'Relative XPath\'i bir attribute veya text ile anchor\'lamak en stabil yöntemdir.', en: 'Anchoring relative XPath to an attribute or text is the most stable approach.' },
              { tr: 'React/Bootstrap gibi framework\'ler DOM\'u sık değiştirir, bu yüzden esneklik kritik hale gelir.', en: 'Frameworks like React/Bootstrap change the DOM frequently, which makes flexibility critical.' },
            ],
            tip: { tr: '"Asla absolute kullanmam" yerine "neden kırıldığını" somut bir örnekle (yeni bir div eklendi, path kaydı) anlat.', en: 'Instead of just saying "I never use absolute," explain concretely why it breaks (a new div was added, the path shifted).' },
          },
          // INTERMEDIATE (20 soru)
          {
            level: 'intermediate',
            q: { tr: 'CI/CD pipeline\'ında Selenium testleriniz sabah başarılı, öğlen başarısız oluyor. Olası nedenleri ve debug stratejinizi anlatın.', en: 'Your Selenium tests pass in the morning CI/CD but fail at noon. What are possible causes and your debug strategy?' },
            a: { tr: 'Bu "flaky test" klasik senaryosudur. Olası nedenler: 1) Test verisi kirliliği — sabah taze veritabanı, öğlen başkası veri değiştirdi. 2) Zamana bağlı testler — sabah 9\'da çalışan "bugünün tarihi" kontrolü öğlen farklı. 3) Paralel çakışma — aynı hesabı kullanan testler birbirini etkiliyor. 4) Timeout yetersizliği — öğlen trafik yoğunluğunda sayfa daha yavaş. Debug stratejisi: screenshot on failure, video kaydı, test log\'larını detaylı incele, local\'de aynı saatte çalıştır.', en: 'This is the classic "flaky test" scenario. Possible causes: 1) Test data pollution — fresh DB in morning, others changed data by noon. 2) Time-dependent tests — "today\'s date" check works at 9am but not noon. 3) Parallel conflicts — tests sharing the same account interfere. 4) Insufficient timeouts — pages are slower under noon traffic. Debug strategy: screenshot on failure, video recording, detailed log analysis, reproduce at same time of day locally.' },
            analogy: { tr: 'Bu, Java\'da production\'da ara sıra patlayan ama local\'de hiç tetiklenmeyen bir race condition bug\'ına benzer — sorunun kodda değil, koşullarda (zamanlama, paylaşılan state) gizli olduğunu kabul edip ona göre avlanman gerekir.', en: 'This is like a race-condition bug in Java that occasionally crashes in production but never reproduces locally — you have to accept the problem hides in conditions (timing, shared state), not in the code itself, and hunt accordingly.' },
            keyPoints: [
              { tr: 'İlk refleks "kod bozuldu" değil, "hangi koşul değişti" olmalı.', en: 'Your first instinct should be "what condition changed", not "the code broke".' },
              { tr: 'Paylaşılan test verisi ve paralel testler arasındaki etkileşim en sık gözden kaçan sebeptir.', en: 'Shared test data and interaction between parallel tests is the most commonly overlooked cause.' },
              { tr: 'Tek seferlik tekrar deneme (retry) sorunu çözmez, sadece saklar — kök nedeni bulmaktan vazgeçirmemeli.', en: 'A one-off retry doesn\'t fix the problem, it just hides it — it shouldn\'t replace finding the root cause.' },
            ],
            tip: { tr: 'Senior bir cevap "flaky" demekle yetinmez; hangi kanıtları (log, zaman damgası, paralel run sayısı) toplayarak teşhis koyduğunu anlatır.', en: 'A senior-level answer doesn\'t stop at "flaky" — it explains which evidence (logs, timestamps, parallel run count) was gathered to diagnose it.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'StaleElementReferenceException\'ı handle etmek için retry mekanizması nasıl yazılır? Java ve Python\'da gösterin.', en: 'How do you write a retry mechanism for StaleElementReferenceException? Show in Java and Python.' },
            a: { tr: 'Bu hata SPA (React/Vue) uygulamalarda çok yaygındır. Çözüm: element\'i her kullanmadan önce yeniden bul ve try-catch ile retry yap.',
            code: `// Java — Retry helper
public static void clickWithRetry(WebDriver driver, By locator, int retries) {
    for (int i = 0; i < retries; i++) {
        try {
            driver.findElement(locator).click();
            return; // Başarılı, çık
        } catch (StaleElementReferenceException e) {
            if (i == retries - 1) throw e; // Son denemede fırlat
            // Kısa bekle ve yeniden dene
        }
    }
}

// Python
def click_with_retry(driver, locator, retries=3):
    for i in range(retries):
        try:
            driver.find_element(*locator).click()
            return
        except StaleElementReferenceException:
            if i == retries - 1:
                raise
            time.sleep(0.5)` },
            analogy: { tr: 'Bu, Java\'da bir Collection\'ı iterate ederken aynı anda başka bir thread\'in onu modifiye etmesine (ConcurrentModificationException) benzer — DOM, React tarafından arka planda yeniden render edildiği için elindeki referans artık geçersiz oluyor.', en: 'This is like another thread modifying a Collection while you iterate it in Java (ConcurrentModificationException) — the DOM gets re-rendered by React in the background, so the reference you\'re holding becomes invalid.' },
            keyPoints: [
              { tr: 'Retry mekanizması semptomu tedavi eder; asıl çözüm her kullanımdan hemen önce elementi tazelemektir.', en: 'The retry mechanism treats the symptom; the real fix is re-fetching the element right before each use.' },
              { tr: 'Sonsuz retry yazma, sınırlı deneme sayısı ve son denemede gerçek hatayı fırlatma şart.', en: 'Never retry infinitely — cap the attempts and rethrow the real exception on the last try.' },
              { tr: 'Bu hata SPA\'larda (React/Angular/Vue) normaldir, statik sayfalarda görürsen başka bir sorun var demektir.', en: 'This exception is expected in SPAs (React/Angular/Vue) — seeing it on a static page signals a different problem.' },
            ],
            tip: { tr: 'Kod yazmadan önce "neden stale oluyor" diye kök nedeni açıkla, mülakatçı sadece retry pattern\'ini değil anlayışını ölçer.', en: 'Before writing code, explain why the element goes stale — the interviewer is assessing understanding, not just the retry pattern.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'React/Vue uygulamasında input\'a sendKeys() ile veri girince onChange event tetiklenmiyor. Nasıl çözersiniz?', en: 'sendKeys() doesn\'t trigger onChange in a React/Vue input. How do you solve this?' },
            a: { tr: 'React controlled component\'lerde sendKeys() bazen React\'ın synthetic event sistemini bypass eder. Çözümler: 1) Önce input\'u tıkla, sonra her karakteri ayrı ayrı gönder: element.click(); for (char c : text.toCharArray()) { element.sendKeys(String.valueOf(c)); } 2) Actions API: new Actions(driver).click(el).sendKeys(el, text).perform() 3) JS ile React event tetikle: executeScript("var el=arguments[0]; el.value=arguments[1]; el.dispatchEvent(new Event(\'input\',{bubbles:true}))", el, text) 4) Python: ActionChains kullan.',
            analogy: { tr: 'Bu fark, Java\'da setter metodunu çağırmak ile reflection kullanıp alanı doğrudan değiştirmek arasındaki farka benzer. Setter iş kurallarını ve yan etkileri çalıştırır; doğrudan atama ise değeri değiştirir ama yaşam döngüsünü atlayabilir.', en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' },
            keyPoints: [
              { tr: 'Önce gerçek sebebi anla: sendKeys() DOM value\'sunu değiştiriyor ama React\'ın kendi event sistemi bunu yakalamıyor.', en: 'Understand the real cause first: sendKeys() changes the DOM value, but React\'s own event system doesn\'t catch it.' },
              { tr: 'Çözüm hiyerarşisi var: önce karakter karakter sendKeys dene, olmazsa Actions API, son çare JS dispatchEvent.', en: 'There\'s a solution hierarchy: try character-by-character sendKeys first, then Actions API, JS dispatchEvent as last resort.' },
              { tr: 'JS ile value atayıp event tetiklemeden bırakmak React state\'ini senkronsuz bırakır, testin kendisini yanıltıcı yapar.', en: 'Setting the value via JS without dispatching the event leaves React\'s state out of sync, making the test misleading.' },
            ],
            tip: { tr: 'Bu soruda framework\'ün neden direnç gösterdiğini (controlled component, synthetic event) anlatmak, sadece çözümü ezberlemekten çok daha değerli.', en: 'Explaining why the framework resists (controlled component, synthetic events) is far more valuable than just reciting the fix.' },
            code: `// Java — React input için
Actions actions = new Actions(driver);
actions.click(inputElement)
       .sendKeys(inputElement, "text")
       .perform();

// Python
from selenium.webdriver.common.action_chains import ActionChains
ActionChains(driver).click(input_el).send_keys("text").perform()` },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium Grid\'i konfigüre edip Docker ile çalıştırdınız. Testler Grid\'de hata veriyor ama localde çalışıyor. Nasıl debug edersiniz?', en: 'You set up Selenium Grid with Docker and tests fail on Grid but work locally. How do you debug?' },
            a: { tr: 'Grid debug için sıralı yaklaşım: 1) Grid console\'a bağlan: http://localhost:4444/ui — session yaratılıyor mu, hangi Node\'a gidiyor? 2) VNC veya noVNC ekranını izle: selenium/node-chrome-debug image ile canlı izleme. 3) RemoteWebDriver capabilities\'i doğrula: platformName, browserVersion eşleşiyor mu? 4) Ağ sorunları: Docker container\'lar arası hostname çözümlemesi. 5) Shared path: screenshot ve dosyaların Grid node\'da oluştuğunu unutmayın, local path geçerli değil. 6) Selenium Grid log\'larını incele: --log-level DEBUG ile başlatın.' },
            analogy: { tr: 'Bu, Java\'da "benim makinemde çalışıyor" klasik sorununa benzer — fark genelde kodda değil, ortam farkında (JVM versiyonu, classpath, network) saklıdır; Grid\'de de ortamı (Docker network, Node capability) sorgulaman gerekir.', en: 'This is the classic Java "it works on my machine" problem — the difference usually hides in the environment (JVM version, classpath, network), not the code; with Grid you need to interrogate the environment (Docker network, Node capabilities) the same way.' },
            keyPoints: [
              { tr: 'Önce session\'ın Grid\'e gerçekten ulaştığını doğrula, sonra hangi Node\'a yönlendiğine bak.', en: 'First confirm the session actually reaches the Grid, then check which Node it\'s routed to.' },
              { tr: 'Local dosya path\'leri (screenshot, download) Grid Node\'unda geçersizdir — bu çok sık atlanan bir detay.', en: 'Local file paths (screenshot, download) are invalid inside the Grid Node — this is a frequently missed detail.' },
              { tr: 'VNC/noVNC ile canlı izlemek, log okumaktan çok daha hızlı teşhis sağlar.', en: 'Watching live via VNC/noVNC diagnoses far faster than reading logs alone.' },
            ],
            tip: { tr: 'Debug sürecini sıralı anlat: önce Grid console, sonra capabilities, sonra network — rastgele deneme değil metodolojik yaklaşım gösterir.', en: 'Walk through the debug process in order: Grid console, then capabilities, then network — this shows a methodical approach, not random guessing.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir ödeme sayfasını test ediyorsunuz ve Stripe iframe içinde kart numarası alanı var. Nasıl yaklaşırsınız?', en: 'You\'re testing a payment page with Stripe card number field inside an iframe. What is your approach?' },
            a: { tr: 'Stripe, kart numarası alanını güvenlik için iframe içine koyar. Yaklaşım: 1) iframe\'i bul: driver.findElement(By.cssSelector("iframe[name*=\'stripe\']")) 2) switchTo().frame(stripeIframe) 3) input alanını bul ve doldur: driver.findElement(By.name("cardnumber")).sendKeys("4111111111111111") 4) driver.switchTo().defaultContent() ile ana sayfaya dön 5) Diğer Stripe fieldları (expiry, CVV) için aynı iframe\'e tekrar gir. Dikkat: Stripe production iframe\'lerde otomasyon kısıtlıyor — test ortamı için Stripe\'ın test modu URL\'lerini kullanın.' },
            analogy: { tr: 'Bu, Java\'da bir mikroservisin kendi güvenlik sınırı (sandbox) içinde çalışıp, ana uygulamanın ona doğrudan erişemediği bir senaryoya benzer — iframe de tarayıcıda aynı izolasyonu sağlar, önce o sınıra `switchTo()` ile "girmen" gerekir.', en: 'This is like a microservice running inside its own security sandbox that the main app can\'t reach directly in Java — an iframe creates the same isolation in the browser, and you must "enter" that boundary with `switchTo()` first.' },
            keyPoints: [
              { tr: 'Her Stripe field\'ı (kart no, expiry, cvv) ayrı bir iframe olabilir — her birine ayrı ayrı switchTo() yapman gerekebilir.', en: 'Each Stripe field (card number, expiry, cvv) can be its own iframe — you may need to switchTo() each one separately.' },
              { tr: 'Ana sayfaya defaultContent() ile dönmeyi unutursan, sonraki adımlar elementi bulamaz.', en: 'Forgetting to return with defaultContent() means the next steps won\'t find their elements.' },
              { tr: 'Gerçek kart bilgisi asla kullanılmaz, Stripe\'ın resmi test kartları (4242...) ile çalışılır.', en: 'Never use real card data — work with Stripe\'s official test cards (4242...).' },
            ],
            tip: { tr: 'Üçüncü parti ödeme widget\'larının güvenlik amaçlı izole edildiğini bilmek, sadece switchTo() syntax\'ını bilmekten daha güçlü bir cevaptır.', en: 'Knowing that third-party payment widgets are isolated for security reasons is a stronger answer than just knowing the switchTo() syntax.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Test izolasyonunu sağlamak için her testten önce veritabanını sıfırlamak yerine hangi Selenium yaklaşımlarını kullanabilirsiniz?', en: 'Instead of resetting the database before each test, what Selenium-level approaches can you use for test isolation?' },
            a: { tr: '1) Her test kendi test kullanıcısını oluşturur (timestamp bazlı unique email) — paralel çakışmayı önler. 2) Cookie injection ile login — her test fresh oturum açar. 3) API önce kurulum, Selenium sadece UI doğrulama: API ile veri oluştur, UI ile kontrol et. 4) Test veri factory: TestNG DataProvider veya pytest fixtures ile unique veri üret. 5) Soft delete: testler veri silerken gerçekten silmez, is_deleted=true flag koyar. Bu yöntemler DB reset olmadan test izolasyonu sağlar.' },
            analogy: { tr: 'Bu, Java\'da her test metodunun kendi unique test verisini (örn. UUID bazlı) üretmesine benzer — izolasyonu ortamdan değil, verinin kendisinden sağlarsın.', en: 'This is like having each Java test method generate its own unique test data (e.g. UUID-based) instead of spinning up a fresh database per test — isolation comes from the data itself, not the environment.' },
            keyPoints: [
              { tr: 'Unique veri (timestamp/UUID) en ucuz ve en yaygın izolasyon yöntemidir.', en: 'Unique data (timestamp/UUID) is the cheapest and most common isolation method.' },
              { tr: 'API ile setup yapıp UI ile sadece doğrulamak, testi hem hızlandırır hem kırılganlığı azaltır.', en: 'Setting up via API and verifying only through the UI both speeds up the test and reduces fragility.' },
              { tr: 'Soft delete gibi yaklaşımlar, paralel testlerin birbirinin verisini fiziksel olarak silmesini engeller.', en: 'Approaches like soft delete prevent parallel tests from physically deleting each other\'s data.' },
            ],
            tip: { tr: 'DB reset\'in neden pahalı/yavaş olduğunu (paralel testlerde kilitlenme, CI süresi) açıklayarak alternatiflerin gerekçesini güçlendir.', en: 'Strengthen your answer by explaining why DB resets are expensive/slow (locking under parallel tests, CI time) — that\'s the reason for the alternatives.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Python\'da Selenium testlerini pytest ile çalıştırıyorsunuz. fixture scope\'larını (function/class/module/session) nasıl kullanırsınız?', en: 'You run Selenium tests with pytest in Python. How do you use fixture scopes (function/class/module/session)?' },
            a: { tr: 'Scope seçimi kritiktir: scope="function" (default) — her test için yeni driver, tam izolasyon, yavaş. scope="class" — aynı class\'taki testler driver\'ı paylaşır, test sırası önemli. scope="module" — aynı dosyadaki tüm testler paylaşır. scope="session" — tüm test oturumu boyunca tek driver, EN HIZLI ama izolasyon yok, test sırasına bağımlı. Best practice: Login gibi pahalı setup\'lar için session scope, kritik izolasyon gerektiren testler için function scope. conftest.py\'da @pytest.fixture(scope="function") def driver(): yield webdriver.Chrome() olarak tanımlanır.' },
            analogy: { tr: 'Bu, Java\'da Spring\'in bean scope\'larına (`prototype` vs `singleton`) benzer — function scope her seferinde yeni bir nesne üretir (izole ama yavaş), session scope tek bir paylaşılan nesne tutar (hızlı ama izolasyon riskli).', en: 'This is like Spring\'s bean scopes in Java (`prototype` vs `singleton`) — function scope creates a fresh instance every time (isolated but slow), session scope keeps one shared instance (fast but risks isolation).' },
            keyPoints: [
              { tr: 'Scope seçimi bir performans/izolasyon dengesidir, "her zaman doğru" bir tercih yoktur.', en: 'Scope choice is a performance/isolation trade-off — there\'s no universally "correct" option.' },
              { tr: 'session scope kullanıyorsan testler arası state sızıntısına karşı ekstra dikkatli olmalısın.', en: 'If you use session scope, you must be extra careful about state leaking between tests.' },
              { tr: 'Pahalı setup\'lar (login, browser açma) için geniş scope, kritik izolasyon gereken testler için dar scope mantıklıdır.', en: 'Wide scope makes sense for expensive setup (login, browser launch); narrow scope makes sense when isolation is critical.' },
            ],
            tip: { tr: 'Hangi scope\'u ne zaman seçtiğini somut bir örnekle anlat: "login fixture\'ı session, sepete ürün ekleme testi function scope kullandım" gibi.', en: 'Give a concrete example of when you chose which scope: "I used session scope for the login fixture, function scope for the add-to-cart test."' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Dinamik olarak değişen bir dropdown\'ın tüm seçeneklerini okuyup bir Excel\'e yazmak istiyorsunuz. Java\'da nasıl yaparsınız?', en: 'You want to read all options from a dynamically changing dropdown and write them to Excel in Java. How?' },
            a: { tr: 'Select wrapper + Apache POI kombinasyonu: Select select = new Select(driver.findElement(By.id("country"))); List<WebElement> options = select.getOptions(); Apache POI ile Excel: Workbook wb = new XSSFWorkbook(); Sheet sheet = wb.createSheet("Options"); options.forEach((opt, i) -> { Row row = sheet.createRow(i); row.createCell(0).setCellValue(opt.getText()); row.createCell(1).setCellValue(opt.getAttribute("value")); }); wb.write(new FileOutputStream("options.xlsx")). Dinamik dropdown\'da (AJAX): önce trigger elementine tıkla, dropdown açılana kadar bekle, sonra oku.',
            code: `Select select = new Select(driver.findElement(By.id("country")));
List<WebElement> options = select.getOptions();
for (WebElement opt : options) {
    System.out.printf("Text: %s, Value: %s%n",
        opt.getText(), opt.getAttribute("value"));
}` },
            analogy: { tr: 'Bu, Java\'da bir koleksiyonu (`List<WebElement>`) dolaşıp her elemanı bir DTO\'ya dönüştürüp dışarıya (Excel/CSV) yazmaya benzer — Selenium burada sadece veri kaynağı, asıl iş bir dönüşüm/export pipeline\'ı.', en: 'This is like iterating a Java collection (`List<WebElement>`), mapping each item to a DTO, and exporting it (Excel/CSV) — Selenium is just the data source here, the real work is a transform/export pipeline.' },
            keyPoints: [
              { tr: 'Dropdown dinamikse (AJAX ile dolan), okumadan önce dolmasını bekleyen bir wait şart.', en: 'If the dropdown is dynamic (AJAX-populated), you must wait for it to fill before reading.' },
              { tr: 'Excel yazma işi Selenium\'un değil, Apache POI gibi bir kütüphanenin sorumluluğudur — sorumlulukları ayır.', en: 'Writing the Excel file isn\'t Selenium\'s job — that\'s a library like Apache POI\'s responsibility. Separate the concerns.' },
              { tr: 'Bu tür script\'ler genelde tek seferlik veri çıkarma ihtiyacından doğar, regression suite\'in parçası olmamalı.', en: 'These scripts usually come from a one-off data-extraction need — they shouldn\'t be part of the regression suite.' },
            ],
            tip: { tr: 'Sadece "Select.getOptions() kullanırım" deme; verinin nereye/niçin export edildiğini de sorgulayarak iş ihtiyacını anladığını göster.', en: 'Don\'t just say "I\'d use Select.getOptions()" — show you understand the business need by asking where/why the data is exported.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'TestNG\'de paralel test çalıştırma nasıl konfigüre edilir? Thread safety nasıl sağlanır?', en: 'How do you configure parallel test execution in TestNG? How do you ensure thread safety?' },
            a: { tr: 'testng.xml\'de: <suite parallel="methods" thread-count="4"> veya parallel="classes". Thread safety için en kritik nokta: WebDriver\'ı ThreadLocal ile yönet. Her thread\'in kendi driver instance\'ı olmalı: private static ThreadLocal<WebDriver> driverHolder = new ThreadLocal<>();. @BeforeMethod\'da driverHolder.set(new ChromeDriver()), @AfterMethod\'da driverHolder.get().quit(). Page Object\'lerde driver parametreli constructor kullan. Test data\'sını da thread-safe yönet: her thread kendi kullanıcı datasını kullansın.',
            code: `// ThreadLocal WebDriver
public class DriverManager {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    public static WebDriver getDriver() { return driver.get(); }
    public static void setDriver(WebDriver d) { driver.set(d); }
    public static void quit() { driver.get().quit(); driver.remove(); }
}` },
            analogy: { tr: 'Bu, Java\'da paylaşılan bir static field yerine `ThreadLocal` kullanarak her thread\'in kendi kopyasına sahip olmasına benzer — WebDriver paylaşılırsa testler birbirinin tarayıcısını manipüle eder, ThreadLocal bunu engeller.', en: 'This is like using `ThreadLocal` in Java instead of a shared static field so each thread gets its own copy — if WebDriver is shared, tests manipulate each other\'s browser; ThreadLocal prevents that.' },
            keyPoints: [
              { tr: 'Paralel testlerde en sık yapılan hata, WebDriver\'ı static (paylaşılan) field olarak tutmaktır.', en: 'The most common mistake in parallel testing is keeping WebDriver as a shared static field.' },
              { tr: 'Thread safety sadece driver\'da değil, test datasında da sağlanmalı — aynı kullanıcıyı iki thread kullanmamalı.', en: 'Thread safety isn\'t just about the driver — test data needs it too; two threads shouldn\'t share the same user.' },
              { tr: 'driver.remove() çağırmadan thread pool\'u kapatmak, eski referansların bellekte kalmasına (leak) yol açar.', en: 'Closing the thread pool without calling driver.remove() leaves stale references in memory (a leak).' },
            ],
            tip: { tr: 'ThreadLocal\'ı sadece syntax olarak değil, "neden static driver paralel testte felaket olur" diye anlatarak gerekçelendir.', en: 'Justify ThreadLocal not just as syntax, but by explaining why a static driver is a disaster in parallel tests.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium testiniz bir shadow DOM elementi bulamıyor. Shadow DOM nedir ve nasıl erişirsiniz?', en: 'Your Selenium test can\'t find a Shadow DOM element. What is Shadow DOM and how do you access it?' },
            a: { tr: 'Shadow DOM, web component\'lerinde gizlenmiş bir DOM alt ağacıdır. Normal driver.findElement() Shadow Root\'un içine giremez. Selenium 4 ile: WebElement shadowHost = driver.findElement(By.cssSelector("my-component")); SearchContext shadowRoot = shadowHost.getShadowRoot(); WebElement innerEl = shadowRoot.findElement(By.cssSelector("input")); Eski yöntem (JS): WebElement shadowRoot = (WebElement) js.executeScript("return arguments[0].shadowRoot", shadowHost); Birden fazla iç içe shadow: her seviye için aynı işlemi tekrarlayın.',
            code: `// Selenium 4 — Shadow DOM
WebElement shadowHost = driver.findElement(By.cssSelector("my-input"));
SearchContext shadowRoot = shadowHost.getShadowRoot();
WebElement input = shadowRoot.findElement(By.cssSelector("input"));
input.sendKeys("test");` },
            analogy: { tr: 'Bu, Java\'da bir sınıfın `private` iç sınıfına dışarıdan doğrudan erişememene benzer — Shadow DOM da bilinçli bir encapsulation\'dır, içine girmek için resmi bir "kapı" (getShadowRoot()) kullanman gerekir.', en: 'This is like not being able to reach a Java class\'s `private` inner class from outside — Shadow DOM is deliberate encapsulation too, and you need an official "door" (getShadowRoot()) to get in.' },
            keyPoints: [
              { tr: 'Shadow DOM bir bug değil, web component\'lerin bilinçli izolasyon tasarımıdır.', en: 'Shadow DOM isn\'t a bug — it\'s a deliberate isolation design in web components.' },
              { tr: 'İç içe (nested) shadow root\'larda her seviye için ayrı ayrı getShadowRoot() çağrılması gerekir.', en: 'For nested shadow roots, getShadowRoot() must be called separately at each level.' },
              { tr: 'Selenium 4 öncesi JS executor\'a muhtaç kalan bu işlem artık native API ile daha güvenilir.', en: 'What used to require a JS executor before Selenium 4 is now more reliable with the native API.' },
            ],
            tip: { tr: '"Element bulunamıyor" hatasını gördüğünde ilk şüphe noktalarından birinin Shadow DOM olduğunu söylemek deneyimini gösterir.', en: 'Mentioning Shadow DOM as one of your first suspects when "element not found" appears shows real experience.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Dosya yükleme işlemini Selenium ile nasıl test edersiniz? Upload butonu JavaScript ile yapılandırılmışsa ne yaparsınız?', en: 'How do you test file upload with Selenium? What if the upload button is built with JavaScript?' },
            a: { tr: 'Native input[type="file"] için: driver.findElement(By.id("fileInput")).sendKeys("/path/to/file.jpg") — tarayıcı dialog açılmaz, direkt dosya yolu girilir. Robot class (popup açılırsa): Robot robot = new Robot(); StringSelection ss = new StringSelection("/path/file"); Clipboard.setContents(ss, null); robot.keyPress(KeyEvent.VK_ENTER). Custom JS upload button: önce input elementini görünür yap: js.executeScript("arguments[0].style.display=\'block\'", hiddenInput); sonra sendKeys. Python\'da aynı, driver.find_element(By.ID, "fileInput").send_keys("/path/file.jpg").' },
            analogy: { tr: 'Bu, Java\'da bir dosya akışını (`FileInputStream`) doğrudan açıp okumak yerine, üzerine gereksiz bir UI katmanı (dialog) eklemeye benzer — Selenium\'da native input\'a sendKeys() ile path vermek, tarayıcı dialog\'unu hiç açmadan aynı işi yapar.', en: 'This is like opening and reading a file stream (`FileInputStream`) directly in Java instead of wrapping it with an unnecessary UI layer (a dialog) — sending the path via sendKeys() to a native input does the same job without ever opening the browser dialog.' },
            keyPoints: [
              { tr: 'input[type=file] her zaman gizli (hidden) olsa bile sendKeys() doğrudan çalışır, görünür olması gerekmez.', en: 'sendKeys() works directly on input[type=file] even when it\'s hidden — visibility isn\'t required.' },
              { tr: 'Eğer custom JS bir buton dosya seçtiriyorsa, asıl native input\'u DOM\'da bulup ona dokunmak gerekir.', en: 'If a custom JS button drives file selection, you need to locate the underlying native input and target that directly.' },
              { tr: 'OS dialog\'u açan senaryolar (nadiren) Robot class gibi tarayıcı dışı bir araç gerektirir, bu son çaredir.', en: 'Scenarios that genuinely open an OS dialog (rare) require a non-browser tool like the Robot class — this is a last resort.' },
            ],
            tip: { tr: '"Selenium tarayıcı dışı pencerelere dokunamaz" prensibini açıklarsan, neden native input\'u hedeflediğini gerekçelendirmiş olursun.', en: 'Explaining the principle "Selenium can\'t touch windows outside the browser" justifies why you target the native input directly.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium 4 ile Chrome DevTools Protocol (CDP) nasıl kullanılır? Hangi senaryolarda işe yarar?', en: 'How do you use Chrome DevTools Protocol (CDP) with Selenium 4? In which scenarios is it useful?' },
            a: { tr: 'Selenium 4, WebSocket üzerinden CDP komutları gönderme imkânı sağlar. Kullanım senaryoları: 1) Network throttling: NetworkConditions ile 3G simülasyonu. 2) Geolocation override: Harita testleri için konumu taklit et. 3) Basic Auth popup: credentials direkt CDP ile gönder. 4) Console log yakalama: LoggingPreferences ile JS hataları topla. 5) Request intercept: API call mock et.',
            code: `// Java — CDP ile Geolocation
((ChromeDriver)driver).executeCdpCommand(
    "Emulation.setGeolocationOverride",
    Map.of("latitude", 41.0082, "longitude", 28.9784, "accuracy", 1)
);` },
            analogy: { tr: 'Bu, Java\'da normal API yetmediğinde JVM\'in kendi debug/profiling arayüzüne (JMX) bağlanmaya benzer — CDP de tarayıcının iç mekanizmalarına (network, geolocation, console) WebDriver\'ın standart API\'sinden daha derin erişim sağlar.', en: 'This is like connecting to the JVM\'s own debug/profiling interface (JMX) in Java when the normal API isn\'t enough — CDP gives deeper access to the browser\'s internals (network, geolocation, console) than WebDriver\'s standard API.' },
            keyPoints: [
              { tr: 'CDP, Selenium\'un resmi API\'sinin yetersiz kaldığı "tarayıcıya özel" senaryolar için bir genişletmedir.', en: 'CDP is an extension for "browser-specific" scenarios where Selenium\'s official API falls short.' },
              { tr: 'Network throttling gibi senaryolar gerçek performans testi değildir, sadece kullanıcı deneyimini simüle eder.', en: 'Scenarios like network throttling aren\'t real performance testing — they only simulate user experience.' },
              { tr: 'CDP yalnızca Chromium tabanlı tarayıcılarda çalışır, Firefox/Safari\'de aynı şekilde davranmaz.', en: 'CDP only works on Chromium-based browsers — it doesn\'t behave the same way in Firefox/Safari.' },
            ],
            tip: { tr: 'Hangi senaryoda standart Selenium API\'sinin neden yetersiz kaldığını anlatmak, listeyi ezbere saymaktan daha güçlü bir cevap oluşturur.', en: 'Explaining why the standard Selenium API falls short in a given scenario makes a far stronger answer than reciting the list from memory.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Uzun çalışan bir Selenium test suite\'inde memory leak önlemek için hangi pratikleri uygularsınız?', en: 'What practices do you apply to prevent memory leaks in long-running Selenium test suites?' },
            a: { tr: '1) Her test sonrası driver.quit() — process hayatta kalmasın. @AfterMethod finally bloğunda. 2) ThreadLocal driver temizleme: driver.remove() çağır. 3) implicitlyWait süresini makul tut — 30+ saniye heap\'i şişirir. 4) Screenshot\'ları sınırlı tut — büyük PNG dosyaları bellek doldurur. 5) Tarayıcı profil cache\'ini temizle: ChromeOptions ile --disable-gpu, --no-sandbox, --disable-extensions. 6) Parallel thread sayısını CPU core sayısından fazla tutma. 7) JVM heap monitoring: Jenkins\'te GC log aktifleştir.' },
            analogy: { tr: 'Bu, Java\'da her `Connection`\'ı `try-with-resources` ile kapatmazsan connection pool\'un zamanla tükenmesine benzer — her driver.quit() atlanan test, arkasında bir orphan tarayıcı process\'i bırakır ve bellek zamanla dolar.', en: 'This is like a connection pool exhausting over time if you don\'t close every `Connection` with `try-with-resources` in Java — every skipped driver.quit() leaves an orphan browser process behind, and memory fills up over time.' },
            keyPoints: [
              { tr: 'Tek bir testin quit() atlaması önemsiz görünür, ama 1000 testlik suite\'te bu birikir ve CI ajanını çökertir.', en: 'One test skipping quit() seems trivial, but across a 1000-test suite it accumulates and can crash the CI agent.' },
              { tr: 'finally bloğunda quit() çağırmak, test ortasında exception fırlasa bile temizliği garanti eder.', en: 'Calling quit() in a finally block guarantees cleanup even if an exception is thrown mid-test.' },
              { tr: 'Screenshot/log gibi yan ürünleri de sınırlamazsan, disk/bellek baskısı sadece browser\'dan değil bu dosyalardan da gelir.', en: 'If you don\'t also limit side artifacts like screenshots/logs, memory/disk pressure comes from those files too, not just the browser.' },
            ],
            tip: { tr: 'Tek bir önlemle yetinme; "driver temizliği + kaynak limiti + paralellik kontrolü" üçlüsünü birlikte anlat, bu senior bakış açısı gösterir.', en: 'Don\'t settle for one fix — cover the trio of driver cleanup, resource limits, and parallelism control together; that shows a senior perspective.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Selenium ile API test yapmak mümkün mü? Evet ise ne zaman mantıklı olur?', en: 'Is it possible to do API testing with Selenium? If yes, when does it make sense?' },
            a: { tr: 'Selenium tarayıcı otomasyonu için tasarlanmıştır, REST API için değil. Ancak bazı durumlar mantıklı: 1) API\'yi tetikleyip UI\'da sonucu doğrulama: REST Assured/requests ile API çağrısı yapıp, Selenium ile UI\'da değişikliği kontrol et. 2) Oturum setup: API login yapıp session token\'ı cookie olarak Selenium\'a enjekte et. 3) Test verisi oluşturma: Selenium testinden önce API ile data oluştur. Saf API test için Selenium kullanılmamalı — REST Assured (Java), requests/pytest (Python) daha uygundur.' },
            analogy: { tr: 'Bu, Java\'da bir işi yapmak için yanlış aracı (örneğin saf SQL yerine ORM\'i raw query motoru gibi kullanmak) zorlamaya benzer — Selenium tarayıcı otomasyonu için tasarlandı, API testi için REST Assured gibi doğru aracı seçmek gerekir.', en: 'This is like forcing the wrong tool for a job in Java (e.g. using an ORM as a raw query engine instead of plain SQL) — Selenium was built for browser automation, and API testing calls for the right tool, like REST Assured.' },
            keyPoints: [
              { tr: 'Selenium\'u API testi için kullanmak değil, API\'yi Selenium testini HIZLANDIRMAK için kullanmak doğru yaklaşımdır.', en: 'The right approach isn\'t using Selenium for API testing — it\'s using the API to SPEED UP the Selenium test.' },
              { tr: 'API ile setup + UI ile doğrulama kombinasyonu, hem hız hem gerçekçilik kazandırır.', en: 'Combining API setup with UI verification gives you both speed and realism.' },
              { tr: 'Bu ayrımı bilmemek, mülakatta "araçların ne için var olduğunu anlamıyor" izlenimi yaratır.', en: 'Not knowing this distinction signals in an interview that you don\'t understand what each tool is for.' },
            ],
            tip: { tr: 'Doğrudan "hayır kullanmam" demek yerine, "evet ama sadece şu sınırlı amaçla" diyerek nüanslı bir cevap ver.', en: 'Instead of a flat "no, I wouldn\'t," give a nuanced answer: "yes, but only for this limited purpose."' },
          },
          {
            level: 'intermediate',
            q: { tr: 'pytest-selenium veya selenium-wire gibi eklentiler ne işe yarar? Projede nasıl kullandınız?', en: 'What are pytest-selenium and selenium-wire plugins useful for? How have you used them in projects?' },
            a: { tr: 'pytest-selenium: driver fixture\'larını otomatik yönetir, browser=chrome parametresiyle CLI\'dan browser seçilir, Sauce Labs/BrowserStack entegrasyonu. selenium-wire: Selenium\'u proxy olarak kullanıp HTTP istek/cevaplarını intercept eder, request header/body inceleme, response mock, network log analizi. Kullanım örneği: selenium-wire ile API token capture: driver.requests ile token yakalanır, başka testte kullanılır. Ayrıca selenium-stealth: bot detection bypass için.' },
            analogy: { tr: 'Bu, Java\'da Spring Boot\'un sana hazır auto-configuration sağlaması gibi — pytest-selenium driver yönetimini senin yerine yapar, selenium-wire ise bir proxy/interceptor (Java\'daki servlet filter\'a benzer) gibi davranıp trafiği araya girip inceler.', en: 'This is like Spring Boot giving you ready-made auto-configuration in Java — pytest-selenium manages the driver for you, while selenium-wire acts like a proxy/interceptor (similar to a Java servlet filter) that inspects traffic in between.' },
            keyPoints: [
              { tr: 'Bu eklentiler "zorunlu" değil, tekrar eden boilerplate\'i azaltan kolaylıklardır.', en: 'These plugins aren\'t mandatory — they\'re conveniences that reduce repetitive boilerplate.' },
              { tr: 'selenium-wire ile network seviyesinde doğrulama yapmak, UI\'dan "görünmeyen" hataları (yanlış API çağrısı) yakalamanı sağlar.', en: 'Verifying at the network level with selenium-wire lets you catch errors invisible from the UI (wrong API calls).' },
              { tr: 'Eklenti seçimi proje ihtiyacına göre değişir; her projede otomatik kullanmak yerine ihtiyacı gerekçelendir.', en: 'Plugin choice depends on project needs — justify the need instead of using them automatically everywhere.' },
            ],
            tip: { tr: 'Somut bir kullanım anlatmak ("token\'ı network trafiğinden yakaladım ve başka testte kullandım") genel tanımdan çok daha ikna edicidir.', en: 'Describing a concrete use ("I captured a token from network traffic and reused it in another test") is far more convincing than a generic definition.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir tablonun tüm satırlarını okuyup belirli bir sütundaki değere göre bir satıra tıklamak için nasıl kod yazarsınız?', en: 'How do you write code to read all table rows and click on a row based on a specific column value?' },
            a: { tr: 'Tablo iterasyonu için findElements + getText kombinasyonu kullanılır.',
            code: `// Java — Tabloda satır bul ve tıkla
List<WebElement> rows = driver.findElements(By.cssSelector("table tbody tr"));
for (WebElement row : rows) {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    // 2. sütun (index 1) "Aktif" ise tıkla
    if (cells.size() > 1 && cells.get(1).getText().equals("Aktif")) {
        cells.get(0).click(); // 1. sütuna tıkla
        break;
    }
}

# Python
rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")
for row in rows:
    cells = row.find_elements(By.TAG_NAME, "td")
    if len(cells) > 1 and cells[1].text == "Aktif":
        cells[0].click()
        break` },
            analogy: { tr: 'Bu, Java\'da bir `List<Row>` üzerinde stream().filter() ile belirli bir koşulu sağlayan satırı bulmaya benzer — burada filtre koşulu Selenium\'da metin karşılaştırmasıyla yapılır, ama mantık birebir aynıdır.', en: 'This is like using stream().filter() over a Java `List<Row>` to find the row matching a condition — here the filter condition is a text comparison in Selenium, but the logic is identical.' },
            keyPoints: [
              { tr: 'findElements ile satırları çekmeden önce tablonun tamamen yüklendiğinden emin olmak gerekir (özellikle sayfalama varsa).', en: 'Make sure the table is fully loaded before pulling rows with findElements, especially if pagination exists.' },
              { tr: 'Sütun index\'ini hardcode etmek kırılgandır; mümkünse header text\'inden index\'i dinamik bul.', en: 'Hardcoding the column index is fragile — find the index dynamically from the header text when possible.' },
              { tr: 'Eşleşen satır bulununca döngüden çıkmak (break) gereksiz iterasyonu önler.', en: 'Breaking out of the loop once a match is found avoids unnecessary iteration.' },
            ],
            tip: { tr: 'Kod yazmadan önce "tablo dinamik mi, sayfalanmış mı" diye soru sormak, gerçek dünya tecrübeni gösterir.', en: 'Asking "is the table dynamic, is it paginated" before writing code shows real-world experience.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'ExtentReports veya Allure ile Selenium test raporu nasıl oluşturulur? Neleri içermeli?', en: 'How do you generate a Selenium test report with ExtentReports or Allure? What should it include?' },
            a: { tr: 'Allure (önerilen): @Attachment ile screenshot, @Step ile adım loglama, @Severity ile önceliklendirme. Maven\'da allure-testng dependency + allure:report komut. Rapor içermeli: test adı, başarı/başarısızlık, süre, hata mesajı + stack trace, başarısız testin ekran görüntüsü, test parametreleri. ExtentReports: ExtentHtmlReporter + ExtentTest.addScreenCaptureFromPath. @AfterMethod\'da başarısız testleri yakala: ITestResult result ile status kontrolü. CI\'da: Jenkins Allure plugin ile otomatik rapor yayınlama.' },
            analogy: { tr: 'Bu, Java\'da loglama için sadece `System.out.println()` yerine yapılandırılmış bir logging framework\'ü (SLF4J/Logback) kullanmaya benzer — ham konsol çıktısı yerine aranabilir, filtrelenebilir, paylaşılabilir bir rapor üretirsin.', en: 'This is like using a structured logging framework (SLF4J/Logback) in Java instead of plain `System.out.println()` — instead of raw console output, you produce a searchable, filterable, shareable report.' },
            keyPoints: [
              { tr: 'Raporun değeri sadece pass/fail göstermek değil, hatayı hızlıca teşhis etmeyi (screenshot+stacktrace) sağlamaktır.', en: 'A report\'s value isn\'t just showing pass/fail — it\'s enabling fast diagnosis with screenshot + stack trace.' },
              { tr: '@Step gibi adım loglama, hangi adımda fail olduğunu test kodunu açmadan anlamanı sağlar.', en: 'Step logging like @Step lets you see exactly where it failed without opening the test code.' },
              { tr: 'CI entegrasyonu (Jenkins Allure plugin) raporu herkesin erişebileceği bir yere taşır, sadece local\'de kalmaz.', en: 'CI integration (Jenkins Allure plugin) makes the report accessible to everyone, not just local.' },
            ],
            tip: { tr: '"Rapor güzel görünür" demek yerine, raporun bir hatayı debug ederken sana ne kadar zaman kazandırdığını anlat.', en: 'Instead of saying "the report looks nice," explain how much debugging time the report actually saved you.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'BrowserStack veya Sauce Labs gibi cloud platformlarda Selenium testleri nasıl çalıştırılır?', en: 'How do you run Selenium tests on cloud platforms like BrowserStack or Sauce Labs?' },
            a: { tr: 'RemoteWebDriver\'ı cloud platform URL\'ine yönlendirirsiniz. BrowserStack: URL = "https://username:key@hub-cloud.browserstack.com/wd/hub". Capabilities\'e platformName, browserName, browserVersion, os, os_version eklenir. BrowserStack Automate dashboard\'da video kayıt, screenshot, log otomatik gelir. Sauce Labs: benzer pattern, "sauce:options" namespace. Avantajlar: gerçek cihaz/browser çeşitliliği, paralel test, lokal test için tunnel (BrowserStack Local). Dikkat: credential\'ları environment variable olarak saklayın, kaynak koda yazmayın.' },
            analogy: { tr: 'Bu, Java\'da local makinede çalıştırmak yerine kodu bir cloud build sunucusuna (Jenkins agent) göndermeye benzer — RemoteWebDriver, capabilities ile "şu tarayıcı/işletim sistemini istiyorum" diyerek isteği uzak bir makineye yönlendirir.', en: 'This is like sending code to a cloud build server (a Jenkins agent) instead of running it locally in Java — RemoteWebDriver uses capabilities to say "I want this browser/OS" and routes the request to a remote machine.' },
            keyPoints: [
              { tr: 'Cloud platformların asıl değeri gerçek cihaz/browser çeşitliliğidir, local\'de bunu kurmak pratik değildir.', en: 'The real value of cloud platforms is real device/browser variety — setting this up locally isn\'t practical.' },
              { tr: 'Credential\'ları kod içine yazmak ciddi bir güvenlik hatasıdır, environment variable kullanılmalı.', en: 'Hardcoding credentials in code is a serious security mistake — use environment variables.' },
              { tr: 'Yerel ortamı test etmek istiyorsan (localhost) bir tunnel (BrowserStack Local) kurman gerekir.', en: 'If you need to test a local environment (localhost), you need a tunnel (BrowserStack Local).' },
            ],
            tip: { tr: '"Neden cloud kullanırım" sorusuna sadece "çeşitlilik" deme; maliyet/bakım trade-off\'unu da değerlendirdiğini göster.', en: 'When asked why you\'d use cloud, don\'t just say "variety" — show you\'ve also weighed the cost/maintenance trade-off.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'TypeScript\'te Selenium WebDriver ile async/await kullanırken hata yönetimini nasıl yaparsınız?', en: 'How do you handle errors when using async/await with Selenium WebDriver in TypeScript?' },
            a: { tr: 'TypeScript\'te tüm Selenium metodları Promise döndürür, await ile kullanılır. Hata yönetimi: try-catch bloğu. finally bloğunda driver.quit() her zaman çağırılır. Belirli hata tiplerini yakalamak için error.name veya error.constructor.name kontrol edilir. Timeout hataları için driver.wait(until.elementLocated(locator), ms) ile sarmalanır. Test framework entegrasyonu için mocha/jest\'te async it() blokları kullanılır.',
            code: `async function safeClick(driver: any, locator: any) {
  try {
    const el = await driver.wait(until.elementLocated(locator), 10000);
    await driver.wait(until.elementIsVisible(el), 5000);
    await el.click();
  } catch (error: any) {
    console.error('Click failed:', error.message);
    const img = await driver.takeScreenshot();
    fs.writeFileSync('error.png', img, 'base64');
    throw error;
  }
}` },
            analogy: { tr: 'Bu, Java\'da checked exception fırlatabilen bir metodu try-catch ile sarmana benzer — TypeScript\'te her Selenium çağrısı bir Promise olduğu için, hatayı yakalamazsan uygulama sessizce "unhandled rejection" ile çöker.', en: 'This is like wrapping a method that throws a checked exception in try-catch in Java — since every Selenium call in TypeScript is a Promise, failing to catch it silently crashes the app with an "unhandled rejection".' },
            keyPoints: [
              { tr: 'finally bloğunda driver.quit() çağırmak, Java\'daki try-finally ile aynı garantiyi sağlar.', en: 'Calling driver.quit() in a finally block gives the same guarantee as try-finally in Java.' },
              { tr: 'Hata fırlatıldığında ek bağlam (screenshot, hangi adımda olduğu) eklemek debug\'ı çok hızlandırır.', en: 'Attaching extra context (screenshot, which step) when rethrowing speeds up debugging enormously.' },
              { tr: 'await unutmak en sık hatadır — Promise resolve olmadan bir sonraki satıra geçilir ve test yanıltıcı şekilde "geçer".', en: 'Forgetting await is the most common mistake — execution moves on before the Promise resolves, and the test misleadingly "passes".' },
            ],
            tip: { tr: 'Sadece try-catch söylemekle yetinme; "await unutulursa ne olur" sorusunu da öngörerek cevabını derinleştir.', en: 'Don\'t stop at try-catch — deepen your answer by anticipating "what happens if await is forgotten".' },
          },
          // ADVANCED (15 soru)
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde test piramidi nasıl uygulanır? 1000 E2E testiniz var ve çok yavaş — nasıl optimize edersiniz?', en: 'How do you apply the test pyramid with Selenium? You have 1000 E2E tests and they\'re very slow — how do you optimize?' },
            a: { tr: 'Test piramidi pratiği: Unit testler (hızlı) → Integration testler → E2E (az, kritik path). Optimizasyon stratejileri: 1) Paralel çalıştırma: TestNG thread-count="8", pytest-xdist -n 8. 2) Cookie ile login: UI login\'i bypass et, her test 5-10sn kazanır. 3) API setup + UI verify: test data\'yı API ile oluştur, sadece UI\'ı doğrula. 4) Headless mode: ~30% hız artışı. 5) Selective run: @Tag ile smoke/regression ayır, PR\'da smoke, gece regression. 6) Test data factory: unique veri ile DB reset ihtiyacını azalt. 7) Grid: 8 thread ile 1000 test 8x hızlı.' },
            analogy: { tr: 'Bu, Java\'da monolitik bir entegrasyon test paketini mikroservis mimarisine göre yeniden katmanlandırmaya benzer — sorun "testleri hızlandırmak" değil, "yanlış katmanda fazla test biriktirmiş olmak"tır.', en: 'This is like re-layering a monolithic integration test suite to match a microservice architecture in Java — the real problem isn\'t "making tests faster", it\'s "having accumulated too many tests at the wrong layer".' },
            keyPoints: [
              { tr: 'İlk soru hız değil, "bu 1000 testin kaçı gerçekten E2E olmak zorunda" olmalıdır.', en: 'The first question shouldn\'t be speed — it should be "how many of these 1000 tests truly need to be E2E".' },
              { tr: 'Paralellik ve cookie-login gibi taktikler önemli ama mimari sorunu çözmez, sadece semptomu hafifletir.', en: 'Tactics like parallelism and cookie-login matter, but they don\'t fix the architectural issue — they only ease the symptom.' },
              { tr: 'Smoke/regression ayrımı, her PR\'da 1000 testi koşturmak zorunda kalmadan hızlı geri bildirim sağlar.', en: 'Splitting smoke/regression gives fast feedback without running all 1000 tests on every PR.' },
            ],
            tip: { tr: 'Senior cevap önce mimari teşhis koyar (piramidi neden bozuk), sonra taktiksel optimizasyonları sıralar — sırayı tersine çevirme.', en: 'A senior answer diagnoses the architecture first (why the pyramid is inverted), then lists tactical optimizations — don\'t reverse that order.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium ile visual regression testing nasıl yapılır? Screenshot karşılaştırma stratejinizi anlatın.', en: 'How do you perform visual regression testing with Selenium? Describe your screenshot comparison strategy.' },
            a: { tr: 'Visual regression: baseline screenshot alınır, her testte yeni screenshot ile karşılaştırılır. Araçlar: Applitools Eyes (AI bazlı, en güçlü), Selenium + AShot + ImageDiff (açık kaynak), percy.io CI entegrasyonu. Strateji: 1) Full page vs element-level screenshot — element daha stabil. 2) Dynamic content masking: tarih, sayaç gibi değişen alanları maskele. 3) Threshold tolerance: %1-2 piksel farkını ignore et. 4) Cross-browser: Chrome ve Firefox\'ta ayrı baseline. Implementasyon: AShot ile sayfayı capture, ImageIO.read ile baseline yükle, pixel diff hesapla, eşiği aşarsa fail.',
            code: `// Java — AShot ile screenshot karşılaştırma
Screenshot screenshot = new AShot()
    .shootingStrategy(ShootingStrategies.viewportPasting(100))
    .takeScreenshot(driver);

BufferedImage baseline = ImageIO.read(new File("baseline.png"));
ImageDiffer differ = new ImageDiffer();
ImageDiff diff = differ.makeDiff(baseline, screenshot.getImage());
Assert.assertFalse(diff.hasDiff(), "Visual regression detected!");` },
            analogy: { tr: 'Bu, Java\'da iki obje arasında `equals()` yerine alan alan (`assertEquals` her field için) karşılaştırma yapmaya benzer — burada karşılaştırılan şey kod değil piksel, ama prensip aynı: küçük, kabul edilebilir farkları tolere eden bir eşitlik tanımı kurman gerekir.', en: 'This is like comparing objects field-by-field with `assertEquals` instead of relying on `equals()` in Java — here you\'re comparing pixels instead of code, but the principle is the same: you need an equality definition that tolerates small, acceptable differences.' },
            keyPoints: [
              { tr: 'En büyük risk false positive\'lerdir — dinamik içerik (tarih, sayaç) maskelenmezse her run fail eder ve ekip raporu görmezden gelmeye başlar.', en: 'The biggest risk is false positives — if dynamic content (date, counters) isn\'t masked, every run fails and the team starts ignoring the report.' },
              { tr: 'Element-level screenshot, full-page\'e göre daha az kırılgandır çünkü sayfanın geri kalanındaki değişikliklerden etkilenmez.', en: 'Element-level screenshots are less fragile than full-page ones because they aren\'t affected by unrelated page changes.' },
              { tr: 'Tolerans eşiği (threshold) çok düşükse her font-rendering farkında fail eder, çok yüksekse gerçek regresyonu kaçırır.', en: 'Too low a threshold fails on every font-rendering difference; too high a threshold misses real regressions.' },
            ],
            tip: { tr: 'Aracı (Applitools/AShot) saymakla yetinme; "false positive\'i nasıl yönettiğini" anlatmak bu konuda gerçek tecrübe olduğunu gösterir.', en: 'Don\'t just name tools (Applitools/AShot) — explaining how you manage false positives proves real hands-on experience.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerini Kubernetes\'te çalıştırmak için nasıl bir mimari kurarsınız?', en: 'What architecture do you set up to run Selenium tests in Kubernetes?' },
            a: { tr: 'Selenium Grid 4 + Kubernetes: 1) Helm chart ile Selenium Grid deploy: helm install selenium-grid docker-selenium/selenium-grid. 2) Hub bir deployment, Chrome/Firefox node\'ları ayrı deployment. 3) HorizontalPodAutoscaler: test sayısına göre node\'ları scale et. 4) Job/CronJob: test suite\'i Kubernetes Job olarak çalıştır. 5) Persistent Volume: screenshot ve report\'ları sakla. 6) Ingress: Grid console\'u expose et. Alternatif: Zalenium (Docker/K8s için Grid + video kaydı). Avantaj: otomatik scale-out, cost efficiency, izolasyon.' },
            analogy: { tr: 'Bu, Java\'da bir uygulamayı sabit sunucu sayısıyla değil, talebe göre otomatik ölçeklenen bir mimariyle (Kubernetes Deployment + HPA) çalıştırmaya benzer — Selenium Grid\'i de aynı elastik mantıkla, sabit değil talebe göre büyüyen bir altyapı olarak tasarlarsın.', en: 'This is like running a Java app with an architecture that auto-scales on demand (Kubernetes Deployment + HPA) instead of a fixed server count — you design Selenium Grid the same elastic way, growing with demand instead of staying fixed.' },
            keyPoints: [
              { tr: 'Hub ve node\'ları ayrı deployment olarak tutmak, node\'ları talebe göre bağımsız ölçeklendirmeyi sağlar.', en: 'Keeping Hub and nodes as separate deployments lets you scale nodes independently based on demand.' },
              { tr: 'Persistent Volume olmadan pod yeniden başladığında tüm screenshot/report kaybolur — bu sık atlanan bir tasarım hatasıdır.', en: 'Without a Persistent Volume, all screenshots/reports vanish when a pod restarts — a commonly missed design flaw.' },
              { tr: 'Maliyet kontrolü için node sayısını sınırsız scale etmek yerine bir üst limit (max replicas) koymak gerekir.', en: 'For cost control, you need an upper limit (max replicas) instead of scaling nodes without bound.' },
            ],
            tip: { tr: 'Sadece Helm komutunu söylemek yetmez; "neden K8s, neden statik Grid değil" sorusuna maliyet/elastiklik açısından cevap ver.', en: 'Reciting the Helm command isn\'t enough — answer "why K8s, why not a static Grid" from a cost/elasticity perspective.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testleri production ortamında çalıştırmak güvenli midir? Hangi önlemleri alırsınız?', en: 'Is it safe to run Selenium tests in production? What precautions do you take?' },
            a: { tr: 'Production\'da Selenium yalnızca read-only smoke test senaryolarında makuldür. Önlemler: 1) Yalnızca GET işlemleri — hiçbir yazma/silme operasyonu. 2) Ayrı test hesabı: production\'da özel test@company.com hesabı. 3) Rate limiting: production\'da arka arkaya request atmayı sınırlandır. 4) Synthetic monitoring: Datadog Synthetics, AWS CloudWatch Synthetics gibi managed çözümler tercih edin. 5) Canary deployment: production\'a tam Selenium suite çalıştırma, yalnızca kritik health check. 6) İzinler: DBA/DevOps onayı olmadan production DB\'e dokunan test yapma.' },
            analogy: { tr: 'Bu, Java\'da production veritabanına sadece read-replica üzerinden, asla write yapmadan sorgu atmaya benzer — production\'da Selenium çalıştırmak da aynı disiplini gerektirir: sadece gözlem, asla mutasyon.', en: 'This is like querying a production database only through a read-replica, never writing, in Java — running Selenium in production demands the same discipline: observation only, never mutation.' },
            keyPoints: [
              { tr: 'Yazma/silme riski olan her adım production\'da otomatik koşturulmamalı, bu kural istisnasızdır.', en: 'Any step with write/delete risk should never run automatically in production — this rule has no exceptions.' },
              { tr: 'Managed synthetic monitoring araçları (Datadog, CloudWatch Synthetics) bu riski sıfıra indiren daha olgun bir tercihtir.', en: 'Managed synthetic monitoring tools (Datadog, CloudWatch Synthetics) are a more mature choice that reduces this risk to zero.' },
              { tr: 'Production testi, regression suite\'in küçültülmüş hali değil, tamamen ayrı ve minimal bir health-check setidir.', en: 'Production testing isn\'t a shrunk-down regression suite — it\'s a completely separate, minimal health-check set.' },
            ],
            tip: { tr: '"Evet ama çok sınırlı koşullarda" diyerek nüanslı cevap ver; "asla yapmam" veya "her zaman yaparım" gibi uç cevaplardan kaçın.', en: 'Give a nuanced answer — "yes, but under very limited conditions" — avoid extreme answers like "never" or "always".' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium ile test etmesi zor olan özellikler nelerdir? Bunlar için hangi alternatif stratejileri kullanırsınız?', en: 'What features are difficult to test with Selenium? What alternative strategies do you use for them?' },
            a: { tr: 'Zor senaryolar ve çözümler: 1) Gerçek zamanlı WebSocket (chat, fiyat güncellemesi): Selenium WebSocket\'i doğrudan izleyemez — Selenium Grid + CDP ya da ayrı WebSocket client. 2) CAPTCHA: test ortamında bypass et veya reCAPTCHA test key kullan. 3) Dosya indirme doğrulaması: ChromeOptions ile download dizini belirle, dosya var mı kontrol et. 4) Email doğrulama: Mailhog, Mailtrap gibi fake SMTP kullan. 5) Push notification: service worker ile mock. 6) 2FA/OTP: test ortamında bypass et veya TOTP secret ile kod üret. 7) Performance: Selenium performans test için değil — JMeter/k6 kullan.' },
            analogy: { tr: 'Bu, Java\'da her problemi tek bir framework\'le (örn. sadece JPA ile) çözmeye çalışmaya benzer — bazı problemler o aracın tasarım sınırlarının dışındadır, doğru yaklaşım "zorlamak" değil "doğru aracı seçmek"tir.', en: 'This is like trying to solve every problem with a single framework (say, JPA alone) in Java — some problems sit outside that tool\'s design boundary; the right move isn\'t forcing it, it\'s picking the right tool.' },
            keyPoints: [
              { tr: 'Her "zor" senaryo için önce "bu gerçekten Selenium\'un işi mi" diye sormak, gereksiz karmaşıklığı önler.', en: 'For every "hard" scenario, asking "is this really Selenium\'s job" first prevents unnecessary complexity.' },
              { tr: 'WebSocket, performans, CAPTCHA gibi konular ayrı uzmanlık alanlarıdır — bunları Selenium\'a zorlamak kırılgan testler üretir.', en: 'WebSocket, performance, CAPTCHA are separate specialties — forcing them into Selenium produces brittle tests.' },
              { tr: 'Test ortamında bypass mekanizmaları (test key, fake SMTP) kurmak, üretim güvenliğini bozmadan test edilebilirliği artırır.', en: 'Setting up bypass mechanisms in test environments (test keys, fake SMTP) increases testability without compromising production security.' },
            ],
            tip: { tr: 'Listeyi ezbere saymak yerine, hangi senaryoda "Selenium\'u zorlamayı bıraktığını ve doğru aracı seçtiğini" anlatan bir örnek ver.', en: 'Instead of reciting the list, give an example of when you stopped forcing Selenium and picked the right tool instead.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium\'da test verisi yönetimini (test data management) nasıl organize edersiniz? Production verisini nasıl kullanmadan testleri gerçekçi yaparsiniz?', en: 'How do you organize test data management in Selenium? How do you make tests realistic without using production data?' },
            a: { tr: 'Stratejiler: 1) Faker kütüphanesi (Java: datafaker, Python: faker): gerçekçi ama sahte isim/email/adres üret. 2) Builder pattern: test objelerini fluent API ile oluştur: new UserBuilder().withEmail(faker.email()).withRole("admin").build(). 3) Database seeding: test suite başlamadan önce seed script çalıştır. 4) Test-specific data: her testin kendi unique verisini oluştur (timestamp bazlı). 5) Data cleanup: @AfterClass veya @AfterSuite\'te oluşturulan test verilerini temizle. 6) Environment-specific data: prod/staging/test için ayrı config dosyaları.',
            code: `// Java — Faker ile test data
import com.github.javafaker.Faker;
Faker faker = new Faker(new Locale("tr"));
String email = faker.internet().emailAddress();
String name = faker.name().fullName();
String phone = faker.phoneNumber().phoneNumber();` },
            analogy: { tr: 'Bu, Java\'da production config\'i değil, environment-specific profile\'ları (`application-test.yml`) kullanmaya benzer — gerçekçi ama izole, üretim verisine asla dokunmayan bir veri katmanı kurarsın.', en: 'This is like using environment-specific profiles (`application-test.yml`) instead of production config in Java — you build a data layer that\'s realistic but isolated, never touching production data.' },
            keyPoints: [
              { tr: 'Faker gibi araçlar "rastgele" değil "gerçekçi ama sahte" veri üretir — locale\'e duyarlı olması (TR isim/adres) önemlidir.', en: 'Tools like Faker generate data that\'s "realistic but fake", not random — locale awareness (TR names/addresses) matters.' },
              { tr: 'Builder pattern, test verisini okunabilir ve değiştirilebilir tutar — her testte aynı uzun setup kodunu tekrar etmezsin.', en: 'The builder pattern keeps test data readable and adjustable — you don\'t repeat the same long setup code in every test.' },
              { tr: 'Veri temizliği (cleanup) atlanırsa, test veritabanı zamanla şişer ve testler birbirini etkilemeye başlar.', en: 'Skipping cleanup lets the test database bloat over time, and tests start interfering with each other.' },
            ],
            tip: { tr: '"Faker kullanırım" demekle yetinme; veri yaşam döngüsünü (üretim → kullanım → temizlik) bir bütün olarak anlat.', en: 'Don\'t stop at "I use Faker" — describe the full data lifecycle (creation → use → cleanup) as one coherent story.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium WebDriver Protocol (W3C) ile JSON Wire Protocol arasındaki teknik farkları açıklayın. Bu fark testlerinizi nasıl etkiler?', en: 'Explain the technical differences between W3C WebDriver Protocol and JSON Wire Protocol. How does this affect your tests?' },
            a: { tr: 'JSON Wire Protocol: Selenium\'un kendi tanımladığı HTTP API, tarayıcı sürücülerinin kendi davranışları vardı, standart değildi. W3C WebDriver (RFC 7234): IETF standardı, tüm tarayıcı sürücülerinin aynı davranışı göstermesini zorunlu kılar. Pratik etkiler: 1) Selenium 4 W3C\'dir — eski Desired Capabilities API kaldırıldı, Options (ChromeOptions/FirefoxOptions) kullanılmalı. 2) Actions API yeniden yazıldı — W3C actions daha tutarlı. 3) Relative locators yalnızca W3C\'de mevcut. 4) BrowserStack/Sauce Labs W3C capabilities namespace gerektirir.' },
            analogy: { tr: 'Bu, Java\'da JDBC sürücülerinin standartlaşmadan önce her veritabanı için farklı davranmasına, sonra ortak bir spesifikasyona (JDBC API) bağlanmasına benzer — W3C standardı da her tarayıcı sürücüsünün aynı sözleşmeye uymasını zorunlu kılar.', en: 'This is like JDBC drivers behaving differently per database before standardization, then converging on a common spec (the JDBC API) in Java — the W3C standard forces every browser driver to honor the same contract the same way.' },
            keyPoints: [
              { tr: 'Bu fark akademik değil pratiktir: eski Desired Capabilities kodu Selenium 4\'te çalışmayabilir.', en: 'This difference isn\'t academic — old Desired Capabilities code may not work in Selenium 4.' },
              { tr: 'Standart sayesinde farklı tarayıcı sürücüleri artık tutarlı davranır, bu da cross-browser testleri daha güvenilir kılar.', en: 'Thanks to the standard, different browser drivers now behave consistently, making cross-browser tests more reliable.' },
              { tr: 'Relative locator gibi yeni özellikler doğrudan bu standardizasyonun bir sonucudur.', en: 'New features like relative locators are a direct result of this standardization.' },
            ],
            tip: { tr: 'Tarih/protokol bilgisini ezbere anlatmak yerine, "bu yüzden eski projeyi Selenium 4\'e yükseltirken şunlar kırıldı" gibi pratik bir etki anlat.', en: 'Instead of reciting protocol history, describe a practical impact: "this is why upgrading the old project to Selenium 4 broke these things."' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde flaky test oranını %5\'in altına düşürmek için hangi sistematik yaklaşımı izlersiniz?', en: 'What systematic approach do you follow to bring flaky test rate below 5% in Selenium tests?' },
            a: { tr: 'Sistematik yaklaşım: 1) Flaky test tracking: her CI çalıştırmasında fail/pass oranını logla, %80 altı pass rate = flaky. 2) Root cause kategorileri: timing, test data, selector, environment, test interaction. 3) Timing: tüm Thread.sleep() kaldır, EC ile değiştir. 4) Selector stability: ID > CSS > XPath; DOM\'a bağımlı absolute XPath kaldır. 5) Test izolasyonu: her test kendi verisini oluşturur, ortak veri kullanmaz. 6) Retry mekanizması: @Retry annotation (TestNG) ile 1 kez otomatik retry. 7) Environment stability: Docker ile deterministik test ortamı. 8) Review: flaky testleri tüm PR pipeline\'ında zorunlu geç.' },
            analogy: { tr: 'Bu, Java\'da production\'daki hataları rastgele fix etmek yerine bir hata izleme/sınıflandırma sistemi (Sentry, kategori bazlı triage) kurmaya benzer — flaky testleri tek tek "tahminle" düzeltmek yerine, sistematik olarak izleyip kök neden kategorisine göre çözersin.', en: 'This is like setting up an error-tracking/triage system (Sentry, category-based) in Java instead of randomly patching production bugs — instead of fixing flaky tests one by one by guessing, you track them systematically and fix by root-cause category.' },
            keyPoints: [
              { tr: 'Ölçmeden iyileştirme olmaz — önce hangi testlerin ne sıklıkla flaky olduğunu veri ile takip etmek şart.', en: 'You can\'t improve what you don\'t measure — tracking which tests flake and how often is the first step.' },
              { tr: 'Retry mekanizması bir güvenlik ağıdır, asla kök neden analizinin yerine geçmemelidir.', en: 'A retry mechanism is a safety net — it should never replace root-cause analysis.' },
              { tr: 'Flaky testleri PR pipeline\'ında zorunlu geçirmek (quarantine), ekibin onlara güvenini kaybetmesini önler.', en: 'Quarantining flaky tests from blocking the PR pipeline prevents the team from losing trust in the suite.' },
            ],
            tip: { tr: '%5 gibi somut bir hedef verildiğinde, bunu nasıl ölçtüğünü (dashboard, pass rate metriği) anlatmak cevabı inandırıcı kılar.', en: 'When given a concrete target like 5%, explaining how you\'d measure it (a dashboard, pass-rate metric) makes the answer credible.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Büyük bir e-ticaret projesinde Selenium test mimarisini sıfırdan tasarlayın. Hangi kararları verirsiniz?', en: 'Design Selenium test architecture from scratch for a large e-commerce project. What decisions do you make?' },
            a: { tr: 'Mimari kararlar: 1) Framework: Java + TestNG + Maven (ekip Java biliyor). 2) Pattern: Page Object Model + Page Factory (@FindBy annotations). 3) Test runner: TestNG XML suite, tag\'lar: @Test(groups={"smoke","regression"}). 4) Raporlama: Allure Reports + Slack entegrasyonu. 5) Driver yönetimi: ThreadLocal WebDriver, DriverFactory class. 6) Config: properties dosyası + environment variable override. 7) CI/CD: Jenkins multibranch pipeline, PR\'da smoke, gece regression. 8) Grid: Selenium Grid 4 + Docker, 10 paralel node. 9) Data: Faker + REST API setup. 10) Monitoring: flaky test dashboard, Grafana.' },
            analogy: { tr: 'Bu, Java\'da yeni bir mikroservis projesine sıfırdan mimari kararlar (framework, katmanlama, CI/CD, monitoring) vermeye birebir benzer — test otomasyonu da kendi başına bir yazılım projesidir, aynı mimari disiplinle ele alınmalıdır.', en: 'This is exactly like making architecture decisions from scratch for a new microservice project in Java (framework, layering, CI/CD, monitoring) — test automation is a software project in its own right and deserves the same architectural discipline.' },
            keyPoints: [
              { tr: 'İlk karar teknoloji değil, ekibin mevcut yetkinliğidir — ekip Java biliyorsa Python\'a zorlamak yanlış bir başlangıçtır.', en: 'The first decision isn\'t technology — it\'s the team\'s existing skill set; forcing Python on a Java-skilled team is the wrong start.' },
              { tr: 'Raporlama ve monitoring\'i sona bırakmak yaygın bir hatadır, flaky test dashboard\'u en başından planlanmalı.', en: 'Leaving reporting and monitoring for last is a common mistake — a flaky test dashboard should be planned from day one.' },
              { tr: 'Paralel altyapı (Grid/Docker) ölçeklenebilirlik kararıdır, sayı sonradan büyük maliyetle değiştirilir.', en: 'Parallel infrastructure (Grid/Docker) is a scalability decision — changing it later is costly.' },
            ],
            tip: { tr: 'Tüm kararları tek tek saymak yerine, hangi sırayla karar verdiğini (önce ekip, sonra pattern, sonra altyapı) anlatmak mimari olgunluk gösterir.', en: 'Instead of just listing decisions, explaining the order you made them in (team first, then pattern, then infrastructure) shows architectural maturity.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium Grid ile Docker Compose kurulumunu yapın ve ölçeklenebilir bir paralel test altyapısı oluşturun.', en: 'Set up Selenium Grid with Docker Compose and create a scalable parallel test infrastructure.' },
            a: { tr: 'docker-compose.yml ile minimum kurulum:',
            code: `# docker-compose.yml
version: "3.8"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    ports:
      - "4442:4442"
      - "4443:4443"
      - "4444:4444"

  chrome:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on: [selenium-hub]
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    deploy:
      replicas: 4  # 4 paralel Chrome

  firefox:
    image: selenium/node-firefox:4.25.0
    shm_size: 2gb
    depends_on: [selenium-hub]
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443

# docker-compose up -d --scale chrome=8` },
            analogy: { tr: 'Bu, Java\'da bir mikroservisi yatay ölçeklendirmek için tek instance yerine birden fazla replica çalıştırmaya (load balancer arkasında) benzer — Hub bir load balancer gibi davranır, Node\'lar ise ölçeklenen worker\'lardır.', en: 'This is like horizontally scaling a Java microservice by running multiple replicas behind a load balancer instead of one instance — the Hub behaves like a load balancer, and Nodes are the scaling workers.' },
            keyPoints: [
              { tr: 'shm_size ayarını unutmak Chrome\'un crash etmesine yol açan sık karşılaşılan bir Docker hatasıdır.', en: 'Forgetting the shm_size setting is a common Docker mistake that causes Chrome to crash.' },
              { tr: 'Node sayısını --scale ile artırmak kolaydır ama gerçek darboğaz genelde host makinenin CPU/RAM\'idir.', en: 'Scaling node count with --scale is easy, but the real bottleneck is usually the host machine\'s CPU/RAM.' },
              { tr: 'Event bus ayarlarının (host/port) Hub ile Node arasında doğru eşleşmemesi, sessizce session oluşturamamaya yol açar.', en: 'Mismatched event bus settings (host/port) between Hub and Node silently prevent sessions from being created.' },
            ],
            tip: { tr: 'docker-compose dosyasını ezbere yazmak yerine, ölçeklendirirken karşılaştığın gerçek bir darboğazı (RAM, network) anlatmak deneyimini kanıtlar.', en: 'Instead of reciting the docker-compose file, describing a real bottleneck you hit while scaling (RAM, network) proves hands-on experience.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium ile performans testi yapılabilir mi? CDN simülasyonu ve network throttling nasıl uygulanır?', en: 'Can Selenium be used for performance testing? How do you apply CDN simulation and network throttling?' },
            a: { tr: 'Selenium performans testi için tasarlanmamıştır (JMeter/k6 tercih edilmeli). Ancak sınırlı performans bilgisi elde edilebilir: 1) Chrome CDP ile network throttling: NetworkConditions preset (3G, 4G, offline). 2) Navigation Timing API: js.executeScript("return JSON.stringify(window.performance.timing)") ile sayfa yükleme metrikleri. 3) Synthetic monitoring: kritik sayfa yüklenme sürelerini ölç, SLA\'yı assertion ile kontrol et. 4) Memory leak: CDP ile JS heap snapshot al.',
            code: `// Java — CDP Network Throttling
ChromeDriver chrome = (ChromeDriver) driver;
chrome.executeCdpCommand("Network.emulateNetworkConditions", Map.of(
    "offline", false,
    "latency", 100,  // 100ms latency
    "downloadThroughput", 750 * 1024 / 8,  // 750 kb/s
    "uploadThroughput", 250 * 1024 / 8
));` },
            analogy: { tr: 'Bu, Java\'da bir profiling aracını (JProfiler) yük testi aracı (JMeter) yerine kullanmaya benzer — profiling sana tek bir akış hakkında bilgi verir ama sistemin yük altındaki davranışını ölçmez; Selenium da aynı sınırlamayı taşır.', en: 'This is like using a profiling tool (JProfiler) instead of a load-testing tool (JMeter) in Java — profiling tells you about a single flow but doesn\'t measure system behavior under load; Selenium carries the same limitation.' },
            keyPoints: [
              { tr: 'Selenium tek bir kullanıcının deneyimini ölçer, JMeter/k6 ise yüzlerce eşzamanlı kullanıcıyı simüle eder — ikisi farklı sorulara cevap verir.', en: 'Selenium measures a single user\'s experience; JMeter/k6 simulates hundreds of concurrent users — they answer different questions.' },
              { tr: 'Network throttling gerçek performans verisi değil, kullanıcı deneyimi simülasyonudur, bunu karıştırmamak gerekir.', en: 'Network throttling isn\'t real performance data — it\'s a UX simulation; don\'t conflate the two.' },
              { tr: 'Navigation Timing API gibi metrikler tek seferlik sayfa yükleme bilgisi verir, sistemik darboğazı göstermez.', en: 'Metrics like the Navigation Timing API give one-off page-load info — they don\'t reveal systemic bottlenecks.' },
            ],
            tip: { tr: '"Selenium performans testi yapamaz" demekle yetinme; hangi sınırlı bilgiyi yine de verebileceğini (Synthetic monitoring) ekleyerek dengeli bir cevap ver.', en: 'Don\'t stop at "Selenium can\'t do performance testing" — balance it by adding what limited insight it can still provide (synthetic monitoring).' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium 4\'ün BiDi (Bidirectional) protokol desteği nedir? Gelecekte Selenium\'u nasıl etkiler?', en: 'What is Selenium 4\'s BiDi (Bidirectional) protocol support? How will it affect Selenium\'s future?' },
            a: { tr: 'WebDriver BiDi, W3C\'nin yeni standartıdır. Mevcut WebDriver HTTP protokolü request-response tabanlıdır (tek yönlü). BiDi, WebSocket üzerinden çift yönlü iletişim sağlar. Anlık event streaming: console log, network event, DOM mutation — Playwright\'ın zaten desteklediği özellikler. Pratik kullanım: console.error dinleme, network request/response intercept, element tıklandığında event. Selenium 4.3+ ile Chrome BiDi desteklenir. Gelecekte Selenium ile Playwright arasındaki fark kapanacak: auto-wait, native event streaming, daha stabil testler.' },
            analogy: { tr: 'Bu, Java\'da senkron HTTP request-response yerine WebSocket ile çift yönlü, anlık event akışına geçmeye benzer — BiDi de WebDriver\'ı "sor-cevap al" modelinden "anlık olay dinle" modeline taşıyor.', en: 'This is like moving from synchronous HTTP request-response to a bidirectional, real-time WebSocket event stream in Java — BiDi moves WebDriver from an "ask-and-wait" model to a "listen for live events" model.' },
            keyPoints: [
              { tr: 'Bu, Playwright\'ın zaten sahip olduğu native event mimarisine Selenium\'un yetişme çabasıdır.', en: 'This is Selenium\'s effort to catch up to the native event architecture Playwright already had.' },
              { tr: 'Anlık console/network event dinleme, polling tabanlı yaklaşımlardan çok daha verimli ve gerçek zamanlıdır.', en: 'Real-time console/network event listening is far more efficient and timely than polling-based approaches.' },
              { tr: 'Bu özellik henüz olgunlaşma aşamasında; tüm tarayıcılarda aynı seviyede desteklenmiyor olabilir.', en: 'This feature is still maturing — it may not be supported at the same level across all browsers.' },
            ],
            tip: { tr: 'Sadece "yenilik" demek yerine, bunun Selenium\'u Playwright\'a neden yakınlaştırdığını teknik olarak (auto-wait, event streaming) açıkla.', en: 'Don\'t just say "it\'s new" — explain technically why it brings Selenium closer to Playwright (auto-wait, event streaming).' },
          },
          {
            level: 'advanced',
            q: { tr: 'Projenizde Selenium\'dan Playwright\'a geçişe karar verdiniz. Migration planını ve dikkat edilecek noktaları anlatın.', en: 'You\'ve decided to migrate from Selenium to Playwright in your project. Describe the migration plan and key considerations.' },
            a: { tr: 'Migration planı: 1) Audit: kaç test var, hangi browser, hangi dil, özel Selenium özelliği (Grid, CDP) var mı? 2) Pilot: 20-30 kritik test Playwright\'a çevir, karşılaştır. 3) Paralel çalıştırma: hem Selenium hem Playwright çalıştır, sonuçları karşılaştır. 4) Kademeli geçiş: modül modül — Login → Checkout → Admin. Teknik dönüşümler: By.id("x") → page.locator("#x"), WebDriverWait → auto-wait (silinir!), switchTo().frame() → frameLocator(), Actions → locator.hover(). Dikkat: Playwright Java\x27da erken stage, Python/TS daha stabil. TestNG → @playwright/test (TS için). Timeline: 100 test için 2-4 hafta.' },
            analogy: { tr: 'Bu, Java\'da eski bir framework\'ten (örn. Struts\'tan Spring\'e) kademeli geçiş yapmaya benzer — big-bang rewrite riskli ve maliyetlidir, modül modül paralel çalıştırarak güveni adım adım kazanırsın.', en: 'This is like a gradual migration from an old framework to a new one (say, Struts to Spring) in Java — a big-bang rewrite is risky and costly; you build confidence module by module while running both in parallel.' },
            keyPoints: [
              { tr: 'İlk adım kod yazmak değil, mevcut suite\'in envanterini çıkarmaktır — kaç test, hangi özel Selenium bağımlılığı var.', en: 'The first step isn\'t writing code — it\'s inventorying the existing suite: how many tests, which special Selenium dependencies exist.' },
              { tr: 'WebDriverWait\'in tamamen kalkması (Playwright\'ın auto-wait\'i) hem bir kazanç hem ekip için bir zihniyet değişikliğidir.', en: 'WebDriverWait disappearing entirely (Playwright\'s auto-wait) is both a gain and a mindset shift for the team.' },
              { tr: 'Pilot aşamada sonuçları karşılaştırmadan tüm suite\'i geçirmek, gizli regresyonları gözden kaçırma riski taşır.', en: 'Migrating the whole suite without comparing results in the pilot phase risks missing hidden regressions.' },
            ],
            tip: { tr: 'Migration\'ı tek seferlik bir "değiştirme" değil, riskleri yöneten bir proje olarak anlat — pilot, paralel çalıştırma, kademeli geçiş sırasını vurgula.', en: 'Frame the migration not as a one-shot "swap" but as a risk-managed project — emphasize the pilot, parallel-run, gradual-rollout sequence.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerinde accessibility (erişilebilirlik) testini nasıl entegre edersiniz?', en: 'How do you integrate accessibility testing into your Selenium tests?' },
            a: { tr: 'Axe-core kütüphanesi en yaygın yöntemdir. Java: axe-selenium-java bağımlılığı, Python: axe-selenium-python. Kullanım: AxeBuilder ile sayfa analiz edilir, ihlaller (violations) raporlanır. WCAG 2.1 AA/AAA seviyesine göre filtre yapılır. CI entegrasyonu: violations.size() > 0 ise test fail — tüm WCAG ihlallerini violation olarak logla. İmpact seviyeleri: critical, serious, moderate, minor — critical/serious\'ı mutlaka fail et.',
            code: `// Java — Axe ile Accessibility Test
import com.deque.html.axecore.selenium.AxeBuilder;
Results results = new AxeBuilder().analyze(driver);
List<Rule> violations = results.getViolations();
violations.forEach(v ->
    System.out.printf("WCAG Violation: %s — %s%n", v.getId(), v.getDescription())
);
Assert.assertEquals(violations.size(), 0, "Erişilebilirlik ihlali var!");` },
            analogy: { tr: 'Bu, Java\'da statik kod analizi araçlarını (SonarQube) build pipeline\'ına entegre edip kalite kapısı (quality gate) koymaya benzer — axe-core de erişilebilirlik ihlallerini otomatik tarayıp CI\'da bir kalite kapısı oluşturur.', en: 'This is like integrating static analysis tools (SonarQube) into a build pipeline with a quality gate in Java — axe-core does the same for accessibility, automatically scanning violations and forming a CI quality gate.' },
            keyPoints: [
              { tr: 'Her ihlali aynı ciddiyette ele almak yanlıştır; critical/serious mutlaka fail etmeli, minor genelde uyarı düzeyinde kalabilir.', en: 'Treating every violation with equal severity is wrong — critical/serious should fail the build, minor can often stay a warning.' },
              { tr: 'Accessibility testi UI testlerinin yanına "ek" bir adım olarak eklenir, ayrı bir test suite olarak yönetilmemelidir.', en: 'Accessibility testing is added as an extra step alongside UI tests — it shouldn\'t be managed as a separate test suite.' },
              { tr: 'WCAG seviyesini (AA genelde yeterli) projeye göre seçmek, gereksiz sıkı kurallarla ekibi boğmamak için önemlidir.', en: 'Choosing the WCAG level (AA is usually enough) based on the project matters so you don\'t overwhelm the team with overly strict rules.' },
            ],
            tip: { tr: '"axe-core kullanırım" demekle yetinme; hangi ihlal seviyesini neden fail ettiğini gerekçelendirerek pragmatik bir denge kurduğunu göster.', en: 'Don\'t stop at "I use axe-core" — justify which violation levels you fail and why, showing a pragmatic balance.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Page Object Model (POM) ile Page Factory arasındaki fark nedir? Yeni bir projede hangisini seçerdiniz, neden?', en: 'What is the difference between Page Object Model (POM) and Page Factory? Which would you choose for a new project, and why?' },
            a: { tr: 'POM bir tasarım desenidir: her sayfa için locator\'ları ve aksiyonları bir class içinde toplarsınız, element bulma kodu @Test metodlarına sızmaz. Page Factory ise Java\'ya özgü bir yardımcı katmandır (@FindBy annotation\'ları + PageFactory.initElements()) — element\'leri lazy olarak başlatır, findElement() çağrısını annotation\'a taşır. Yani Page Factory, POM\'u Java\'da daha az boilerplate ile uygulamanın bir yoludur; Python/TS\'de POM kullanılır ama Page Factory karşılığı yoktur.', en: 'POM is a design pattern: you group locators and actions for each page into a class so element-finding code never leaks into @Test methods. Page Factory is a Java-specific helper layer (@FindBy annotations + PageFactory.initElements()) that lazily initializes elements, moving the findElement() call into the annotation. So Page Factory is one way to implement POM in Java with less boilerplate; Python/TS use POM but have no Page Factory equivalent.' },
            analogy: { tr: 'Bu, Java\'da bir interface\'i (POM deseni) elle implement etmek yerine Spring\'in @Autowired ile dependency injection yapmasına benzer — Page Factory da element bulma işini annotation\'a devredip elle yazılan kodu azaltır.', en: 'This is like Spring\'s @Autowired doing dependency injection instead of manually implementing an interface (the POM pattern) — Page Factory hands element lookup to an annotation and removes hand-written boilerplate.' },
            keyPoints: [
              { tr: 'POM bir desen, Page Factory ise o deseni Java\'da uygulamanın bir aracıdır — birbirinin alternatifi değildir.', en: 'POM is a pattern; Page Factory is a tool for implementing that pattern in Java — they are not alternatives to each other.' },
              { tr: 'Page Factory\'nin lazy initialization\'ı, sayfa henüz yüklenmeden element referansı almayı güvenli hale getirir.', en: 'Page Factory\'s lazy initialization makes it safe to hold element references before the page has fully loaded.' },
              { tr: 'Python/TS ekiplerinde POM hâlâ kullanılır, sadece annotation tabanlı kısayol (Page Factory) yoktur — elementler constructor\'da veya fonksiyonla tanımlanır.', en: 'Python/TS teams still use POM, they just lack the annotation-based shortcut (Page Factory) — elements are defined in the constructor or via a function instead.' },
            ],
            tip: { tr: '"POM kullanıyorum" demekle yetinme; Page Factory\'nin POM\'un bir parçası mı yoksa POM\'a alternatif mi olduğunu net ayırt ettiğini göster.', en: 'Don\'t stop at "I use POM" — clearly distinguish whether Page Factory is part of POM or an alternative to it.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Selenium testlerini Docker container içinde headless modda çalıştırırken karşılaştığınız tipik sorunlar nelerdir, nasıl çözersiniz?', en: 'What typical problems do you face running Selenium tests headless inside a Docker container, and how do you solve them?' },
            a: { tr: 'En sık görülenler: 1) Eksik sistem kütüphaneleri (libnss3, libgconf-2-4) — Chrome container içinde açılmaz, base image olarak selenium/standalone-chrome kullanmak en güvenlisi. 2) /dev/shm boyutu küçük olduğu için Chrome crash eder — docker run --shm-size=2g veya --disable-dev-shm-usage flag\'i. 3) Font eksikliği — ekran görüntülerinde Türkçe karakterler kutu çıkar, fonts-liberation paketini ekleyin. 4) Viewport/headless farklılığı — bazı CSS media query\'leri headless\'ta farklı render olur, --window-size=1920,1080 sabitleyin. 5) Root kullanıcıyla çalıştırma --no-sandbox gerektirir, güvenlik açısından dikkatli kullanılmalı.', en: 'Most common: 1) Missing system libraries (libnss3, libgconf-2-4) — Chrome won\'t launch in the container; using selenium/standalone-chrome as the base image is safest. 2) Small /dev/shm size crashes Chrome — use docker run --shm-size=2g or the --disable-dev-shm-usage flag. 3) Missing fonts — screenshots show boxes instead of non-Latin characters; add the fonts-liberation package. 4) Viewport/headless rendering differences — some CSS media queries render differently headless; pin --window-size=1920,1080. 5) Running as root requires --no-sandbox, which should be used carefully from a security standpoint.' },
            code: `# Dockerfile — headless Chrome için tipik kurulum\nFROM selenium/standalone-chrome:latest\nENV SCREEN_WIDTH=1920 SCREEN_HEIGHT=1080\n# /dev/shm sorunini onlemek icin docker run komutunda:\n# docker run --shm-size=2g -v $(pwd):/tests selenium/standalone-chrome`,
            analogy: { tr: 'Bu, Java uygulamanızı minimal bir Alpine container\'a koyup eksik native kütüphaneler (glibc, fontconfig) yüzünden runtime\'da patlamasına benzer — tarayıcı da bir "uygulama"dır ve container\'ın ona ihtiyacı olan işletim sistemi parçalarını sağlaması gerekir.', en: 'This is like deploying a Java app into a minimal Alpine container and having it crash at runtime due to missing native libraries (glibc, fontconfig) — the browser is also an "application" and the container must supply the OS pieces it needs.' },
            keyPoints: [
              { tr: 'Sıfırdan image kurmak yerine resmi selenium/standalone-* image\'larından başlamak, eksik kütüphane sorunlarının çoğunu ortadan kaldırır.', en: 'Starting from the official selenium/standalone-* images instead of building from scratch eliminates most missing-library problems.' },
              { tr: '/dev/shm sorunu headless container\'larda en sık görülen ama en az bilinen crash sebebidir — log\'da "Chrome crashed" görürseniz önce bunu kontrol edin.', en: 'The /dev/shm issue is the most common yet least-known crash cause in headless containers — if logs show "Chrome crashed," check this first.' },
              { tr: 'Viewport boyutunu sabitlememek, headful makinede geçen testlerin CI\'da farklı render nedeniyle kırılmasına yol açabilir.', en: 'Not pinning the viewport size can make tests that pass on a headful machine break in CI due to different rendering.' },
            ],
            tip: { tr: 'Sadece flag listesi sayma; "/dev/shm" ve font sorununu neden headless\'a özgü olduğunu açıklayarak deneyimli olduğunu göster.', en: 'Don\'t just list flags — explain why the /dev/shm and font issues are specific to headless mode to show real experience.' },
          },
        ],
      },
    ],
  },
  en: {
    title: '💼 Interview Questions — 50 Questions (Basic/Intermediate/Advanced)',
    blocks: [
      {
        type: 'simple-box', emoji: '🎓',
        content: 'Selenium interview questions test a different mental model than Java Core questions: not "did you memorize the API?" but "can you solve real problems in an automation project?" Just as Java interviews ask "explain the difference between HashMap and ConcurrentHashMap in a production threading scenario" instead of "what is a Collection?" — the right answer measures root-cause analytical capacity, not memory. If you already learned Selenium, why study these questions separately? Because the scenario you face in an interview ("tests are intermittently failing in CI — how do you stabilize them?") may describe a situation you have never personally encountered; these 50 questions pre-load each scenario category so that in the interview you can genuinely say "I\'ve dealt with something like this." Use your Java background as a differentiator: framing an answer as "similar to a Java Future timeout mechanism, ExplicitWait..." creates cross-domain connections that someone with Selenium-only knowledge cannot make, and leaves the interviewer with a strong impression of deep technical understanding rather than surface-level tool familiarity.',
      },
      seleniumInterviewAnswerFilm,
      seleniumInterviewAnswerSteps,
      seleniumInterviewPractice,
      {
        type: 'interview-questions',
          relatedTopicId: 'selenium-webdriver',
        topic: 'Selenium WebDriver',
        questions: [
          { level: 'basic', q: { en: 'Your web form test sometimes throws NoSuchElementException but the page looks fine manually. What could be the cause?' }, a: { en: 'The most common cause is a timing issue. Even if the page appears ready, DOM elements may be added later by JavaScript. Solution: use WebDriverWait + ExpectedConditions instead of Thread.sleep(). Also check for iframes — call switchTo().frame() first. Another cause: CI/CD runs slower than local, increase the timeout.' }, analogy: { en: 'This is like reading an asynchronously populated object too early in Java. The line of code may be correct, but the data has not arrived yet; in Selenium, the locator may also be correct while the element is still not accessible at that moment.' }, keyPoints: [{ en: 'First distinction: is the locator wrong, or is the element simply not ready yet?' }, { en: 'Name the readiness signal clearly: visible, clickable, or an iframe context switch.' }, { en: 'Increasing the timeout alone is not a fix; it must be paired with the right wait condition.' }], tip: { en: 'In the interview, answer in this order: classify it as a timing issue, state which wait condition you would choose, then explain how you verified the fix.' } },
          { level: 'basic', q: { en: 'Explain the performance difference between By.id, By.cssSelector, and By.xpath. When do you prefer each?' }, a: { en: 'By.id is fastest (O(1) getElementById). By.cssSelector is second — the browser’s selector engine natively optimizes CSS queries. By.xpath is slowest — it can traverse the entire DOM. Priority: 1) By.id, 2) By.cssSelector, 3) By.xpath only when necessary.' }, analogy: { en: 'This choice is like iterating over an entire Java `List` when a `Map` lookup is available. If a direct key exists, use `By.id`; if you need a more flexible filter, use `cssSelector`; if you truly need tree relationships or text, use `xpath`.' }, keyPoints: [{ en: 'Explain the preference order with reasoning, not memorization.' }, { en: 'XPath is not bad; it is simply a more powerful and more expensive tool.' }, { en: 'The most mature answer weighs performance, readability, and maintenance cost together.' }], tip: { en: 'Instead of just saying “I do not always use XPath,” strengthen the answer by giving a case where XPath is genuinely the right choice.' } },
          { level: 'basic', q: { en: 'What is the difference between sendKeys() and JavaScript value injection?' }, a: { en: 'sendKeys() triggers real keyboard events (keydown, keypress, keyup). JavaScript value injection just changes the DOM value without firing events. Use JS when: element is hidden/disabled, React controlled inputs where onChange isn\'t triggered, or native date pickers.' }, analogy: { en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' }, keyPoints: [{ en: 'Prefer the path that best mimics real user behavior first.' }, { en: 'JS injection is not automatically a hack; it is a controlled fallback for difficult components.' }, { en: 'Make sure to emphasize the event-triggering difference in your answer.' }], tip: { en: '“sendKeys first, JS fallback if needed” shows both realism and pragmatism in an interview.' } },
          { level: 'basic', q: { en: 'What is the difference between driver.close() and driver.quit()?' }, a: { en: 'driver.close() closes only the active window but keeps the WebDriver session open. driver.quit() closes all windows and terminates the entire session. Always use driver.quit() in teardown; add null check: if (driver != null) driver.quit().' }, analogy: { en: 'This is like the difference between calling `close()` on a single `Closeable` and letting `try-with-resources` close every resource in scope. `close()` shuts the active window; `quit()` cleans up the entire browser session.' }, keyPoints: [{ en: 'close ends the active window; quit ends the whole session.' }, { en: 'Put resource cleanup at the center of your teardown answer.' }, { en: 'Orphan browser processes and memory leaks are strong extra details to mention.' }], tip: { en: 'Do not leave this as a definition only; explain why skipping `quit()` causes problems to pile up on a CI agent.' } },
          { level: 'basic', q: { en: 'Can you use Implicit Wait and Explicit Wait together? What problems can this cause?' }, a: { en: 'Technically yes but strongly NOT recommended. Timeouts can compound — Implicit + Explicit can add up, causing unexpected long waits. Selenium docs say "mixing waits is not recommended." Best practice: use only Explicit Wait and set Implicit Wait to zero.' }, analogy: { en: 'This is like wrapping the same Java operation with an outer timeout while also placing another blocking wait inside. On paper the waits look simple, but at runtime the total behavior becomes unpredictable.' }, keyPoints: [{ en: 'The real problem is not whether it works, but that the wait duration becomes unpredictable.' }, { en: 'Referencing Selenium’s own recommendation makes the answer stronger.' }, { en: 'Clean approach: implicit zero, explicit deliberate choice.' }], tip: { en: 'Give a numeric example: saying “10 seconds + 15 seconds can behave like a 25-second wait” makes the problem much more concrete.' } },
          { level: 'basic', q: { en: 'How do you select a dropdown option when neither ID nor value is available?' }, a: { en: 'Select class has 3 methods: selectByVisibleText(), selectByValue(), selectByIndex(). When neither ID nor value exists, use selectByVisibleText("Turkey"). For custom dropdowns (div/ul based), use Actions to click and select from list.' }, analogy: { en: 'This is like matching a Java enum not by a technical key but by the user-facing label. If there is no reliable ID, the visible text becomes the only contract left.' }, keyPoints: [{ en: 'First separate whether this is a real `<select>` or a custom component.' }, { en: 'For a native select, visible text is the most natural solution.' }, { en: 'In a custom dropdown answer, explicitly say that the `Select` class will not work.' }], tip: { en: 'Saying “I first check the DOM type” shows diagnostic thinking instead of just reciting tools.' } },
          { level: 'basic', q: { en: 'How do you check if a checkbox is checked and click it only if it\'s unchecked?' }, a: { en: 'element.isSelected() returns true/false for checkboxes, radio buttons, and select options. Pattern: if (!cb.isSelected()) { cb.click(); } — makes tests idempotent.' }, analogy: { en: 'This is like writing `if (!list.contains(x)) list.add(x)` in Java to avoid adding the same item twice — you make sure the checkbox isn\'t clicked again unnecessarily even if the test reruns.' }, keyPoints: [{ en: 'isSelected() is only meaningful for checkbox/radio/option elements, not regular buttons.' }, { en: 'Read the state first, then act — don\'t blindly click().' }, { en: 'This pattern makes the test idempotent and prevents errors when CI retries it.' }], tip: { en: 'Don\'t just name the method — explain why you check first (to avoid an unnecessary state change).' } },
          { level: 'basic', q: { en: 'How does Selenium manage multiple browser tabs?' }, a: { en: 'Each window/tab has a unique window handle. driver.getWindowHandles() returns all handles; driver.getWindowHandle() returns the current. To switch: iterate handles, skip current, call switchTo().window(handle). Selenium 4: switchTo().newWindow(WindowType.TAB) opens a programmatic new tab.' }, analogy: { en: 'Window handles are like IDs stored in a Java `Set<String>` — each window has its own identity, and switching focus means finding the right ID and calling `switchTo()`.' }, keyPoints: [{ en: 'Opening a new tab doesn\'t move the driver\'s focus automatically — you must call switchTo() manually.' }, { en: 'Save the starting handle with getWindowHandle() before looping so you don\'t lose track.' }, { en: 'Remember to switch back to the main window when done, otherwise later steps run in the wrong tab.' }], tip: { en: 'Make it concrete: give a real example like "I needed to verify an invoice PDF that opened in a new tab after login."' } },
          { level: 'basic', q: { en: 'Which interface is used for screenshots in Selenium?' }, a: { en: 'TakesScreenshot interface. Cast WebDriver: ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE). Python: driver.save_screenshot("test.png"). TypeScript: driver.takeScreenshot() returns Base64.' }, analogy: { en: 'This is like casting a Java object to an interface it implements to access an extra capability — casting WebDriver to `TakesScreenshot` unlocks the screenshot ability.' }, keyPoints: [{ en: 'Every WebDriver implementation supports this interface, but you still need to cast to it.' }, { en: 'The most valuable use is capturing a screenshot automatically when a test fails.' }, { en: 'Attaching the screenshot to a reporting tool (Allure, ExtentReports) speeds up failure analysis.' }], tip: { en: 'Don\'t just recite syntax — explain why you trigger this inside a try-catch in @AfterMethod.' } },
          { level: 'basic', q: { en: 'Give 3 situations where you need to execute JavaScript in Selenium.' }, a: { en: '1) Scroll into view — scrollIntoView(true). 2) Click hidden element — arguments[0].click(). 3) Set input value — arguments[0].value=\'2024-01-15\' for date pickers.' }, analogy: { en: 'This is like using reflection in Java to reach a private field you can\'t access normally — when Selenium\'s standard API isn\'t enough, the JavaScript executor acts as a back door.' }, keyPoints: [{ en: 'JS should be the last resort — native Selenium methods are always the first choice.' }, { en: 'Comment every JS usage with "why it was needed" to help teammates.' }, { en: 'JS-driven interaction doesn\'t mimic real user behavior — flag this in your report/PR.' }], tip: { en: 'Instead of reciting three examples, explain for each why the normal method failed first — this shows analytical thinking in the interview.' } },
          { level: 'basic', q: { en: 'How do you shorten test time by using cookies for login?' }, a: { en: 'Capture the session cookie after a real login, then inject it in subsequent tests: driver.manage().addCookie(savedCookie) + driver.navigate().refresh(). Saves 5-10 seconds per test.' }, analogy: { en: 'This is like reusing a JWT token in a header instead of re-authenticating on every request in Java — instead of running the full login flow every time, you inject a session that\'s already "ready."' }, keyPoints: [{ en: 'This doesn\'t test the login flow itself — it only speeds up post-login scenarios.' }, { en: 'Don\'t forget to still test the actual login flow through the UI at least once.' }, { en: 'Watch the cookie expiry — an expired cookie causes confusing test failures.' }], tip: { en: 'Justify the optimization by saying running the login flow on every test is unnecessary risk and wasted time.' } },
          { level: 'basic', q: { en: 'What do you do when getText() returns an empty string?' }, a: { en: 'Common causes: 1) Element is hidden — use getAttribute("textContent"). 2) Element not loaded — add Explicit Wait. 3) Shadow DOM — use JS. 4) Dynamic content — text arrives after AJAX.' }, analogy: { en: 'This is like a Java object\'s `toString()` returning empty — the issue isn\'t that the object is missing, it\'s that it hasn\'t reached the expected state yet.' }, keyPoints: [{ en: 'getText() only returns visible content — this is the most commonly forgotten rule.' }, { en: 'Diagnose before guessing — compare with getAttribute(\'textContent\') first.' }, { en: 'Don\'t forget Shadow DOM — normal getText() can\'t reach inside it.' }], tip: { en: 'Don\'t jump to "it\'s a bug" — show your systematic debugging by explaining which possibility you ruled out first.' } },
          { level: 'basic', q: { en: 'Why is Page Object Model (POM) used in Selenium?' }, a: { en: 'Without POM, locators are hardcoded everywhere. POM centralizes locators in page classes, making maintenance easy — one change fixes all tests that use that element. Tests focus on business logic, not UI details.' }, analogy: { en: 'This is like writing a Repository/DAO layer in Java instead of hardcoding the same SQL string everywhere — a change happens in one place instead of fixing every call site.' }, keyPoints: [{ en: 'POM\'s real value isn\'t "less code" — it\'s that change is managed from a single point.' }, { en: 'A test method should read like a business scenario, not expose UI details.' }, { en: 'Without POM, a growing project often reaches a point in 6 months where nobody dares to touch the locators.' }], tip: { en: 'Instead of an abstract "best practice" answer, give a concrete maintenance pain you experienced without POM.' } },
          { level: 'basic', q: { en: 'How do you run Chrome in headless mode? Why is it important in CI/CD?' }, a: { en: 'options.addArguments("--headless"). Important for CI/CD: Linux servers have no display, headless is required. Also faster and uses less resources.' }, analogy: { en: 'This is like running a Java GUI app on a server with `-Djava.awt.headless=true` — the engine still runs, but the visual rendering layer is disabled.' }, keyPoints: [{ en: 'Headless isn\'t just for speed — it\'s mandatory on Linux CI servers with no display.' }, { en: 'Headless and headful modes can behave differently (e.g. size/scroll) — verify important tests in both.' }, { en: 'The newer --headless=new flag is more reliable than the old mode — check this in legacy projects.' }], tip: { en: 'Don\'t stop at "it\'s faster" — make sure to emphasize it\'s mandatory because servers have no display.' } },
          { level: 'basic', q: { en: 'What is the difference between absolute and relative XPath?' }, a: { en: 'Absolute XPath: /html/body/div[1]/form — full path from root, breaks on any DOM change. Relative XPath: //input[@id="username"] — starts from anywhere, more flexible. Never use absolute XPath.' }, analogy: { en: 'This is like referencing a file with a relative path instead of an absolute one (`C:\\Users\\...`) in Java — when the structure changes, the absolute path always breaks while the relative one stays flexible.' }, keyPoints: [{ en: 'Never put absolute XPath in production test code — use it only for quick checks in DevTools.' }, { en: 'Anchoring relative XPath to an attribute or text is the most stable approach.' }, { en: 'Frameworks like React/Bootstrap change the DOM frequently, which makes flexibility critical.' }], tip: { en: 'Instead of just saying "I never use absolute," explain concretely why it breaks (a new div was added, the path shifted).' } },
          { level: 'intermediate', q: { en: 'Your CI/CD Selenium tests pass in the morning but fail at noon. What are possible causes?' }, a: { en: '1) Test data pollution — fresh DB morning, changed by noon. 2) Time-dependent tests. 3) Parallel conflicts. 4) Insufficient timeouts (pages slower under load). Debug: screenshot on failure, detailed logs, reproduce at same time locally.' }, analogy: { en: 'This is like a race-condition bug in Java that occasionally crashes in production but never reproduces locally — you have to accept the problem hides in conditions (timing, shared state), not in the code itself, and hunt accordingly.' }, keyPoints: [{ en: 'Your first instinct should be "what condition changed", not "the code broke".' }, { en: 'Shared test data and interaction between parallel tests is the most commonly overlooked cause.' }, { en: 'A one-off retry doesn\'t fix the problem, it just hides it — it shouldn\'t replace finding the root cause.' }], tip: { en: 'A senior-level answer doesn\'t stop at "flaky" — it explains which evidence (logs, timestamps, parallel run count) was gathered to diagnose it.' } },
          { level: 'intermediate', q: { en: 'How do you write a retry mechanism for StaleElementReferenceException?' }, a: { en: 'Re-find the element on each use and retry on exception. Common in SPA apps (React/Vue).', code: `// Java retry
public static void clickWithRetry(WebDriver driver, By locator, int retries) {
    for (int i = 0; i < retries; i++) {
        try { driver.findElement(locator).click(); return; }
        catch (StaleElementReferenceException e) {
            if (i == retries - 1) throw e;
        }
    }
}` }, analogy: { en: 'This is like another thread modifying a Collection while you iterate it in Java (ConcurrentModificationException) — the DOM gets re-rendered by React in the background, so the reference you\'re holding becomes invalid.' }, keyPoints: [{ en: 'The retry mechanism treats the symptom; the real fix is re-fetching the element right before each use.' }, { en: 'Never retry infinitely — cap the attempts and rethrow the real exception on the last try.' }, { en: 'This exception is expected in SPAs (React/Angular/Vue) — seeing it on a static page signals a different problem.' }], tip: { en: 'Before writing code, explain why the element goes stale — the interviewer is assessing understanding, not just the retry pattern.' } },
          { level: 'intermediate', q: { en: 'sendKeys() doesn\'t trigger onChange in a React/Vue input. How do you solve this?' }, a: { en: 'React controlled components may not fire onChange with sendKeys(). Solutions: 1) Use Actions API: actions.click(el).sendKeys(el, text).perform(). 2) JS dispatch input event: el.dispatchEvent(new Event("input",{bubbles:true})). 3) Send characters one by one.' }, analogy: { en: 'This is like the difference between calling a setter in Java and mutating a field directly with reflection. A setter runs business rules and side effects; direct mutation changes the value but can skip the lifecycle.' }, keyPoints: [{ en: 'Understand the real cause first: sendKeys() changes the DOM value, but React\'s own event system doesn\'t catch it.' }, { en: 'There\'s a solution hierarchy: try character-by-character sendKeys first, then Actions API, JS dispatchEvent as last resort.' }, { en: 'Setting the value via JS without dispatching the event leaves React\'s state out of sync, making the test misleading.' }], tip: { en: 'Explaining why the framework resists (controlled component, synthetic events) is far more valuable than just reciting the fix.' } },
          { level: 'intermediate', q: { en: 'How do you debug Selenium Grid tests that work locally but fail on Grid?' }, a: { en: '1) Check Grid console at localhost:4444/ui — is session created? 2) Use VNC/noVNC for live viewing. 3) Verify capabilities match. 4) Check Docker network hostname resolution. 5) Screenshots are created on Node, not local path.' }, analogy: { en: 'This is the classic Java "it works on my machine" problem — the difference usually hides in the environment (JVM version, classpath, network), not the code; with Grid you need to interrogate the environment (Docker network, Node capabilities) the same way.' }, keyPoints: [{ en: 'First confirm the session actually reaches the Grid, then check which Node it\'s routed to.' }, { en: 'Local file paths (screenshot, download) are invalid inside the Grid Node — this is a frequently missed detail.' }, { en: 'Watching live via VNC/noVNC diagnoses far faster than reading logs alone.' }], tip: { en: 'Walk through the debug process in order: Grid console, then capabilities, then network — this shows a methodical approach, not random guessing.' } },
          { level: 'intermediate', q: { en: 'How do you handle Stripe iframe in a payment page test?' }, a: { en: 'Find iframe: driver.findElement(By.cssSelector("iframe[name*=\'stripe\']")). Switch: switchTo().frame(stripeIframe). Fill card field: findElement(By.name("cardnumber")).sendKeys("4111111111111111"). Return: switchTo().defaultContent(). Repeat for expiry/CVV iframes.' }, analogy: { en: 'This is like a microservice running inside its own security sandbox that the main app can\'t reach directly in Java — an iframe creates the same isolation in the browser, and you must "enter" that boundary with `switchTo()` first.' }, keyPoints: [{ en: 'Each Stripe field (card number, expiry, cvv) can be its own iframe — you may need to switchTo() each one separately.' }, { en: 'Forgetting to return with defaultContent() means the next steps won\'t find their elements.' }, { en: 'Never use real card data — work with Stripe\'s official test cards (4242...).' }], tip: { en: 'Knowing that third-party payment widgets are isolated for security reasons is a stronger answer than just knowing the switchTo() syntax.' } },
          { level: 'intermediate', q: { en: 'What Selenium-level approaches ensure test isolation without resetting the database?' }, a: { en: '1) Each test creates its own unique user (timestamp-based email). 2) Cookie injection for login. 3) API setup + UI verification. 4) Test data factory with unique data. 5) Soft delete pattern.' }, analogy: { en: 'This is like having each Java test method generate its own unique test data (e.g. UUID-based) instead of spinning up a fresh database per test — isolation comes from the data itself, not the environment.' }, keyPoints: [{ en: 'Unique data (timestamp/UUID) is the cheapest and most common isolation method.' }, { en: 'Setting up via API and verifying only through the UI both speeds up the test and reduces fragility.' }, { en: 'Approaches like soft delete prevent parallel tests from physically deleting each other\'s data.' }], tip: { en: 'Strengthen your answer by explaining why DB resets are expensive/slow (locking under parallel tests, CI time) — that\'s the reason for the alternatives.' } },
          { level: 'intermediate', q: { en: 'How do you use pytest fixture scopes in Selenium?' }, a: { en: 'scope="function": new driver per test (full isolation, slow). scope="class": shared within class. scope="module": shared within file. scope="session": single driver for entire run (fastest, no isolation). Best: function for critical isolation, session for expensive setup.' }, analogy: { en: 'This is like Spring\'s bean scopes in Java (`prototype` vs `singleton`) — function scope creates a fresh instance every time (isolated but slow), session scope keeps one shared instance (fast but risks isolation).' }, keyPoints: [{ en: 'Scope choice is a performance/isolation trade-off — there\'s no universally "correct" option.' }, { en: 'If you use session scope, you must be extra careful about state leaking between tests.' }, { en: 'Wide scope makes sense for expensive setup (login, browser launch); narrow scope makes sense when isolation is critical.' }], tip: { en: 'Give a concrete example of when you chose which scope: "I used session scope for the login fixture, function scope for the add-to-cart test."' } },
          { level: 'intermediate', q: { en: 'How do you read all dropdown options and write to Excel in Java?' }, a: { en: 'Select select = new Select(el); List<WebElement> options = select.getOptions(); Then use Apache POI: XSSFWorkbook, createSheet, createRow, createCell with getText() and getAttribute("value") for each option.' }, analogy: { en: 'This is like iterating a Java collection (`List<WebElement>`), mapping each item to a DTO, and exporting it (Excel/CSV) — Selenium is just the data source here, the real work is a transform/export pipeline.' }, keyPoints: [{ en: 'If the dropdown is dynamic (AJAX-populated), you must wait for it to fill before reading.' }, { en: 'Writing the Excel file isn\'t Selenium\'s job — that\'s a library like Apache POI\'s responsibility. Separate the concerns.' }, { en: 'These scripts usually come from a one-off data-extraction need — they shouldn\'t be part of the regression suite.' }], tip: { en: 'Don\'t just say "I\'d use Select.getOptions()" — show you understand the business need by asking where/why the data is exported.' } },
          { level: 'intermediate', q: { en: 'How do you configure parallel test execution in TestNG with thread safety?' }, a: { en: 'testng.xml: <suite parallel="methods" thread-count="4">. Thread safety: use ThreadLocal<WebDriver>. Each thread gets its own driver instance. @BeforeMethod sets, @AfterMethod quits and removes.', code: `private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
public static WebDriver getDriver() { return driver.get(); }` }, analogy: { en: 'This is like using `ThreadLocal` in Java instead of a shared static field so each thread gets its own copy — if WebDriver is shared, tests manipulate each other\'s browser; ThreadLocal prevents that.' }, keyPoints: [{ en: 'The most common mistake in parallel testing is keeping WebDriver as a shared static field.' }, { en: 'Thread safety isn\'t just about the driver — test data needs it too; two threads shouldn\'t share the same user.' }, { en: 'Closing the thread pool without calling driver.remove() leaves stale references in memory (a leak).' }], tip: { en: 'Justify ThreadLocal not just as syntax, but by explaining why a static driver is a disaster in parallel tests.' } },
          { level: 'intermediate', q: { en: 'Your Selenium test can\'t find a Shadow DOM element. What is Shadow DOM and how do you access it?' }, a: { en: 'Shadow DOM is a hidden DOM subtree in web components. Normal findElement() can\'t access it. Selenium 4: shadowHost.getShadowRoot().findElement(By.css("input")). Older: JS executeScript("return arguments[0].shadowRoot", shadowHost).' }, analogy: { en: 'This is like not being able to reach a Java class\'s `private` inner class from outside — Shadow DOM is deliberate encapsulation too, and you need an official "door" (getShadowRoot()) to get in.' }, keyPoints: [{ en: 'Shadow DOM isn\'t a bug — it\'s a deliberate isolation design in web components.' }, { en: 'For nested shadow roots, getShadowRoot() must be called separately at each level.' }, { en: 'What used to require a JS executor before Selenium 4 is now more reliable with the native API.' }], tip: { en: 'Mentioning Shadow DOM as one of your first suspects when "element not found" appears shows real experience.' } },
          { level: 'intermediate', q: { en: 'How do you test file upload? What if the button is custom JavaScript?' }, a: { en: 'Native input[type="file"]: sendKeys("/path/to/file.jpg") — no dialog needed. Custom JS button: make input visible via JS, then sendKeys. Robot class for OS file dialog. Python: find_element(By.ID, "fileInput").send_keys("/path/file").' }, analogy: { en: 'This is like opening and reading a file stream (`FileInputStream`) directly in Java instead of wrapping it with an unnecessary UI layer (a dialog) — sending the path via sendKeys() to a native input does the same job without ever opening the browser dialog.' }, keyPoints: [{ en: 'sendKeys() works directly on input[type=file] even when it\'s hidden — visibility isn\'t required.' }, { en: 'If a custom JS button drives file selection, you need to locate the underlying native input and target that directly.' }, { en: 'Scenarios that genuinely open an OS dialog (rare) require a non-browser tool like the Robot class — this is a last resort.' }], tip: { en: 'Explaining the principle "Selenium can\'t touch windows outside the browser" justifies why you target the native input directly.' } },
          { level: 'intermediate', q: { en: 'How do you use Chrome DevTools Protocol (CDP) with Selenium 4?' }, a: { en: 'Use executeCdpCommand(). Scenarios: network throttling, geolocation override, basic auth, console log capture, request intercept.', code: `((ChromeDriver)driver).executeCdpCommand("Emulation.setGeolocationOverride",
    Map.of("latitude", 41.0, "longitude", 28.9, "accuracy", 1));` }, analogy: { en: 'This is like connecting to the JVM\'s own debug/profiling interface (JMX) in Java when the normal API isn\'t enough — CDP gives deeper access to the browser\'s internals (network, geolocation, console) than WebDriver\'s standard API.' }, keyPoints: [{ en: 'CDP is an extension for "browser-specific" scenarios where Selenium\'s official API falls short.' }, { en: 'Scenarios like network throttling aren\'t real performance testing — they only simulate user experience.' }, { en: 'CDP only works on Chromium-based browsers — it doesn\'t behave the same way in Firefox/Safari.' }], tip: { en: 'Explaining why the standard Selenium API falls short in a given scenario makes a far stronger answer than reciting the list from memory.' } },
          { level: 'intermediate', q: { en: 'What practices prevent memory leaks in long-running Selenium test suites?' }, a: { en: '1) driver.quit() in finally block after every test. 2) ThreadLocal.remove() call. 3) Reasonable implicitlyWait. 4) Limit screenshot storage. 5) Chrome flags: --disable-gpu, --no-sandbox, --disable-extensions. 6) Don\'t exceed CPU cores for parallel threads.' }, analogy: { en: 'This is like a connection pool exhausting over time if you don\'t close every `Connection` with `try-with-resources` in Java — every skipped driver.quit() leaves an orphan browser process behind, and memory fills up over time.' }, keyPoints: [{ en: 'One test skipping quit() seems trivial, but across a 1000-test suite it accumulates and can crash the CI agent.' }, { en: 'Calling quit() in a finally block guarantees cleanup even if an exception is thrown mid-test.' }, { en: 'If you don\'t also limit side artifacts like screenshots/logs, memory/disk pressure comes from those files too, not just the browser.' }], tip: { en: 'Don\'t settle for one fix — cover the trio of driver cleanup, resource limits, and parallelism control together; that shows a senior perspective.' } },
          { level: 'intermediate', q: { en: 'Is it possible to do API testing with Selenium? When does it make sense?' }, a: { en: 'Selenium is for browser automation, not API testing. But hybrid approach: use API to set up test data, then Selenium to verify UI. Or inject session token from API login into Selenium via cookies. Pure API testing: use REST Assured (Java) or requests/pytest (Python).' }, analogy: { en: 'This is like forcing the wrong tool for a job in Java (e.g. using an ORM as a raw query engine instead of plain SQL) — Selenium was built for browser automation, and API testing calls for the right tool, like REST Assured.' }, keyPoints: [{ en: 'The right approach isn\'t using Selenium for API testing — it\'s using the API to SPEED UP the Selenium test.' }, { en: 'Combining API setup with UI verification gives you both speed and realism.' }, { en: 'Not knowing this distinction signals in an interview that you don\'t understand what each tool is for.' }], tip: { en: 'Instead of a flat "no, I wouldn\'t," give a nuanced answer: "yes, but only for this limited purpose."' } },
          { level: 'intermediate', q: { en: 'How do you write code to find a table row by column value and click it?' }, a: { en: 'Iterate all rows, for each row get cells by tagName("td"), check cell text, click target cell.', code: `List<WebElement> rows = driver.findElements(By.cssSelector("table tbody tr"));
for (WebElement row : rows) {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    if (cells.size() > 1 && cells.get(1).getText().equals("Active")) {
        cells.get(0).click(); break;
    }
}` }, analogy: { en: 'This is like using stream().filter() over a Java `List<Row>` to find the row matching a condition — here the filter condition is a text comparison in Selenium, but the logic is identical.' }, keyPoints: [{ en: 'Make sure the table is fully loaded before pulling rows with findElements, especially if pagination exists.' }, { en: 'Hardcoding the column index is fragile — find the index dynamically from the header text when possible.' }, { en: 'Breaking out of the loop once a match is found avoids unnecessary iteration.' }], tip: { en: 'Asking "is the table dynamic, is it paginated" before writing code shows real-world experience.' } },
          { level: 'intermediate', q: { en: 'How do you generate test reports with Allure? What should they include?' }, a: { en: '@Attachment for screenshots, @Step for step logging, @Severity for priority. Report must include: test name, pass/fail, duration, error message + stack trace, screenshot on failure, test parameters.' }, analogy: { en: 'This is like using a structured logging framework (SLF4J/Logback) in Java instead of plain `System.out.println()` — instead of raw console output, you produce a searchable, filterable, shareable report.' }, keyPoints: [{ en: 'A report\'s value isn\'t just showing pass/fail — it\'s enabling fast diagnosis with screenshot + stack trace.' }, { en: 'Step logging like @Step lets you see exactly where it failed without opening the test code.' }, { en: 'CI integration (Jenkins Allure plugin) makes the report accessible to everyone, not just local.' }], tip: { en: 'Instead of saying "the report looks nice," explain how much debugging time the report actually saved you.' } },
          { level: 'intermediate', q: { en: 'How do you run Selenium tests on BrowserStack or Sauce Labs?' }, a: { en: 'Use RemoteWebDriver with cloud URL: new RemoteWebDriver(new URL("https://user:key@hub-cloud.browserstack.com/wd/hub"), options). Add capabilities: platformName, browserVersion, os. Cloud dashboards auto-provide video, screenshots, logs.' }, analogy: { en: 'This is like sending code to a cloud build server (a Jenkins agent) instead of running it locally in Java — RemoteWebDriver uses capabilities to say "I want this browser/OS" and routes the request to a remote machine.' }, keyPoints: [{ en: 'The real value of cloud platforms is real device/browser variety — setting this up locally isn\'t practical.' }, { en: 'Hardcoding credentials in code is a serious security mistake — use environment variables.' }, { en: 'If you need to test a local environment (localhost), you need a tunnel (BrowserStack Local).' }], tip: { en: 'When asked why you\'d use cloud, don\'t just say "variety" — show you\'ve also weighed the cost/maintenance trade-off.' } },
          { level: 'intermediate', q: { en: 'How do you handle errors with async/await in TypeScript Selenium?' }, a: { en: 'Wrap in try-catch, always call driver.quit() in finally. Use driver.wait(until.elementLocated(), ms) for timeouts. Capture screenshot on error.', code: `try {
  const el = await driver.wait(until.elementLocated(By.id('btn')), 10000);
  await el.click();
} catch (e: any) {
  const img = await driver.takeScreenshot();
  fs.writeFileSync('error.png', img, 'base64');
  throw e;
} finally {
  await driver.quit();
}` }, analogy: { en: 'This is like wrapping a method that throws a checked exception in try-catch in Java — since every Selenium call in TypeScript is a Promise, failing to catch it silently crashes the app with an "unhandled rejection".' }, keyPoints: [{ en: 'Calling driver.quit() in a finally block gives the same guarantee as try-finally in Java.' }, { en: 'Attaching extra context (screenshot, which step) when rethrowing speeds up debugging enormously.' }, { en: 'Forgetting await is the most common mistake — execution moves on before the Promise resolves, and the test misleadingly "passes".' }], tip: { en: 'Don\'t stop at try-catch — deepen your answer by anticipating "what happens if await is forgotten".' } },
          { level: 'advanced', q: { en: 'You have 1000 E2E tests and they\'re very slow. How do you optimize?' }, a: { en: '1) Parallel execution: TestNG thread-count=8, pytest-xdist -n8. 2) Cookie login bypass. 3) API setup + UI verify only. 4) Headless mode (~30% faster). 5) Tag-based selective run: smoke on PR, regression nightly. 6) Selenium Grid with 8+ nodes.' }, analogy: { en: 'This is like re-layering a monolithic integration test suite to match a microservice architecture in Java — the real problem isn\'t "making tests faster", it\'s "having accumulated too many tests at the wrong layer".' }, keyPoints: [{ en: 'The first question shouldn\'t be speed — it should be "how many of these 1000 tests truly need to be E2E".' }, { en: 'Tactics like parallelism and cookie-login matter, but they don\'t fix the architectural issue — they only ease the symptom.' }, { en: 'Splitting smoke/regression gives fast feedback without running all 1000 tests on every PR.' }], tip: { en: 'A senior answer diagnoses the architecture first (why the pyramid is inverted), then lists tactical optimizations — don\'t reverse that order.' } },
          { level: 'advanced', q: { en: 'How do you perform visual regression testing with Selenium?' }, a: { en: 'Tools: Applitools Eyes (AI-based), AShot + ImageDiff (open source), percy.io. Strategy: baseline screenshot per element, compare on each run, mask dynamic content (dates, counters), 1-2% pixel tolerance threshold.', code: `Screenshot shot = new AShot().takeScreenshot(driver);
BufferedImage baseline = ImageIO.read(new File("baseline.png"));
ImageDiff diff = new ImageDiffer().makeDiff(baseline, shot.getImage());
Assert.assertFalse(diff.hasDiff(), "Visual regression!");` }, analogy: { en: 'This is like comparing objects field-by-field with `assertEquals` instead of relying on `equals()` in Java — here you\'re comparing pixels instead of code, but the principle is the same: you need an equality definition that tolerates small, acceptable differences.' }, keyPoints: [{ en: 'The biggest risk is false positives — if dynamic content (date, counters) isn\'t masked, every run fails and the team starts ignoring the report.' }, { en: 'Element-level screenshots are less fragile than full-page ones because they aren\'t affected by unrelated page changes.' }, { en: 'Too low a threshold fails on every font-rendering difference; too high a threshold misses real regressions.' }], tip: { en: 'Don\'t just name tools (Applitools/AShot) — explaining how you manage false positives proves real hands-on experience.' } },
          { level: 'advanced', q: { en: 'What architecture do you set up for Selenium in Kubernetes?' }, a: { en: 'Selenium Grid 4 + Helm chart. Hub as deployment, Chrome/Firefox nodes as separate deployments. HorizontalPodAutoscaler for auto-scaling. Kubernetes Job for test suite runs. PersistentVolume for reports. Ingress to expose Grid console.' }, analogy: { en: 'This is like running a Java app with an architecture that auto-scales on demand (Kubernetes Deployment + HPA) instead of a fixed server count — you design Selenium Grid the same elastic way, growing with demand instead of staying fixed.' }, keyPoints: [{ en: 'Keeping Hub and nodes as separate deployments lets you scale nodes independently based on demand.' }, { en: 'Without a Persistent Volume, all screenshots/reports vanish when a pod restarts — a commonly missed design flaw.' }, { en: 'For cost control, you need an upper limit (max replicas) instead of scaling nodes without bound.' }], tip: { en: 'Reciting the Helm command isn\'t enough — answer "why K8s, why not a static Grid" from a cost/elasticity perspective.' } },
          { level: 'advanced', q: { en: 'Is it safe to run Selenium tests in production? What precautions?' }, a: { en: 'Only safe for read-only smoke tests. Precautions: 1) No write/delete operations. 2) Dedicated test account. 3) Rate limiting. 4) Prefer managed solutions: Datadog Synthetics, AWS CloudWatch Synthetics. 5) Never touch production DB without DBA approval.' }, analogy: { en: 'This is like querying a production database only through a read-replica, never writing, in Java — running Selenium in production demands the same discipline: observation only, never mutation.' }, keyPoints: [{ en: 'Any step with write/delete risk should never run automatically in production — this rule has no exceptions.' }, { en: 'Managed synthetic monitoring tools (Datadog, CloudWatch Synthetics) are a more mature choice that reduces this risk to zero.' }, { en: 'Production testing isn\'t a shrunk-down regression suite — it\'s a completely separate, minimal health-check set.' }], tip: { en: 'Give a nuanced answer — "yes, but under very limited conditions" — avoid extreme answers like "never" or "always".' } },
          { level: 'advanced', q: { en: 'What features are difficult to test with Selenium and what alternatives do you use?' }, a: { en: '1) WebSocket: use CDP or separate WS client. 2) CAPTCHA: bypass in test env or use reCAPTCHA test key. 3) File download: set download dir via ChromeOptions. 4) Email: use Mailhog/Mailtrap. 5) 2FA: bypass or generate TOTP. 6) Performance: use JMeter/k6 instead.' }, analogy: { en: 'This is like trying to solve every problem with a single framework (say, JPA alone) in Java — some problems sit outside that tool\'s design boundary; the right move isn\'t forcing it, it\'s picking the right tool.' }, keyPoints: [{ en: 'For every "hard" scenario, asking "is this really Selenium\'s job" first prevents unnecessary complexity.' }, { en: 'WebSocket, performance, CAPTCHA are separate specialties — forcing them into Selenium produces brittle tests.' }, { en: 'Setting up bypass mechanisms in test environments (test keys, fake SMTP) increases testability without compromising production security.' }], tip: { en: 'Instead of reciting the list, give an example of when you stopped forcing Selenium and picked the right tool instead.' } },
          { level: 'advanced', q: { en: 'How do you organize test data management without using production data?' }, a: { en: '1) Faker library for realistic fake data. 2) Builder pattern for test objects. 3) DB seeding before suite. 4) Timestamp-based unique data per test. 5) Cleanup after tests. 6) Environment-specific config files.', code: `Faker faker = new Faker(new Locale("en"));
String email = faker.internet().emailAddress();` }, analogy: { en: 'This is like using environment-specific profiles (`application-test.yml`) instead of production config in Java — you build a data layer that\'s realistic but isolated, never touching production data.' }, keyPoints: [{ en: 'Tools like Faker generate data that\'s "realistic but fake", not random — locale awareness (TR names/addresses) matters.' }, { en: 'The builder pattern keeps test data readable and adjustable — you don\'t repeat the same long setup code in every test.' }, { en: 'Skipping cleanup lets the test database bloat over time, and tests start interfering with each other.' }], tip: { en: 'Don\'t stop at "I use Faker" — describe the full data lifecycle (creation → use → cleanup) as one coherent story.' } },
          { level: 'advanced', q: { en: 'Explain the technical differences between W3C WebDriver Protocol and JSON Wire Protocol.' }, a: { en: 'JSON Wire Protocol: Selenium\'s own HTTP API, non-standard, inconsistent browser behavior. W3C WebDriver: IETF standard, all drivers must behave identically. Practical impact: Selenium 4 uses W3C — Desired Capabilities removed, use Options classes. Actions API rewritten. Relative locators only in W3C.' }, analogy: { en: 'This is like JDBC drivers behaving differently per database before standardization, then converging on a common spec (the JDBC API) in Java — the W3C standard forces every browser driver to honor the same contract the same way.' }, keyPoints: [{ en: 'This difference isn\'t academic — old Desired Capabilities code may not work in Selenium 4.' }, { en: 'Thanks to the standard, different browser drivers now behave consistently, making cross-browser tests more reliable.' }, { en: 'New features like relative locators are a direct result of this standardization.' }], tip: { en: 'Instead of reciting protocol history, describe a practical impact: "this is why upgrading the old project to Selenium 4 broke these things."' } },
          { level: 'advanced', q: { en: 'What systematic approach brings flaky test rate below 5%?' }, a: { en: '1) Track flaky tests: log pass rate per CI run, <80% = flaky. 2) Root cause categorization: timing, data, selector, environment. 3) Remove all Thread.sleep(). 4) Fix brittle selectors (ID > CSS > XPath). 5) Test isolation: unique data per test. 6) @Retry annotation for auto-retry. 7) Docker for deterministic environment.' }, analogy: { en: 'This is like setting up an error-tracking/triage system (Sentry, category-based) in Java instead of randomly patching production bugs — instead of fixing flaky tests one by one by guessing, you track them systematically and fix by root-cause category.' }, keyPoints: [{ en: 'You can\'t improve what you don\'t measure — tracking which tests flake and how often is the first step.' }, { en: 'A retry mechanism is a safety net — it should never replace root-cause analysis.' }, { en: 'Quarantining flaky tests from blocking the PR pipeline prevents the team from losing trust in the suite.' }], tip: { en: 'When given a concrete target like 5%, explaining how you\'d measure it (a dashboard, pass-rate metric) makes the answer credible.' } },
          { level: 'advanced', q: { en: 'Design Selenium test architecture from scratch for a large e-commerce project.' }, a: { en: 'Decisions: 1) Java + TestNG + Maven. 2) POM + Page Factory. 3) TestNG XML with smoke/regression groups. 4) Allure Reports + Slack. 5) ThreadLocal WebDriver DriverFactory. 6) Properties + env variable config. 7) Jenkins CI: smoke on PR, regression nightly. 8) Grid 4 + Docker, 10 parallel nodes. 9) Faker + REST API setup. 10) Flaky test dashboard.' }, analogy: { en: 'This is exactly like making architecture decisions from scratch for a new microservice project in Java (framework, layering, CI/CD, monitoring) — test automation is a software project in its own right and deserves the same architectural discipline.' }, keyPoints: [{ en: 'The first decision isn\'t technology — it\'s the team\'s existing skill set; forcing Python on a Java-skilled team is the wrong start.' }, { en: 'Leaving reporting and monitoring for last is a common mistake — a flaky test dashboard should be planned from day one.' }, { en: 'Parallel infrastructure (Grid/Docker) is a scalability decision — changing it later is costly.' }], tip: { en: 'Instead of just listing decisions, explaining the order you made them in (team first, then pattern, then infrastructure) shows architectural maturity.' } },
          { level: 'advanced', q: { en: 'Set up Selenium Grid with Docker Compose for scalable parallel testing.' }, a: { en: 'Hub + Chrome/Firefox nodes. Use deploy.replicas for scaling. shm_size: 2gb for stability.', code: `version: "3.8"
services:
  selenium-hub:
    image: selenium/hub:4.25.0
    ports: ["4444:4444"]
  chrome:
    image: selenium/node-chrome:4.25.0
    shm_size: 2gb
    depends_on: [selenium-hub]
    deploy:
      replicas: 4` }, analogy: { en: 'This is like horizontally scaling a Java microservice by running multiple replicas behind a load balancer instead of one instance — the Hub behaves like a load balancer, and Nodes are the scaling workers.' }, keyPoints: [{ en: 'Forgetting the shm_size setting is a common Docker mistake that causes Chrome to crash.' }, { en: 'Scaling node count with --scale is easy, but the real bottleneck is usually the host machine\'s CPU/RAM.' }, { en: 'Mismatched event bus settings (host/port) between Hub and Node silently prevent sessions from being created.' }], tip: { en: 'Instead of reciting the docker-compose file, describing a real bottleneck you hit while scaling (RAM, network) proves hands-on experience.' } },
          { level: 'advanced', q: { en: 'How do you apply network throttling and performance metrics with Selenium?' }, a: { en: 'Use CDP for network throttling: emulateNetworkConditions. Navigation Timing API via JS for page load metrics. Synthetic monitoring: measure critical page load times, assert against SLAs.', code: `chrome.executeCdpCommand("Network.emulateNetworkConditions", Map.of(
    "offline", false, "latency", 100,
    "downloadThroughput", 750*1024/8,
    "uploadThroughput", 250*1024/8
));` }, analogy: { en: 'This is like using a profiling tool (JProfiler) instead of a load-testing tool (JMeter) in Java — profiling tells you about a single flow but doesn\'t measure system behavior under load; Selenium carries the same limitation.' }, keyPoints: [{ en: 'Selenium measures a single user\'s experience; JMeter/k6 simulates hundreds of concurrent users — they answer different questions.' }, { en: 'Network throttling isn\'t real performance data — it\'s a UX simulation; don\'t conflate the two.' }, { en: 'Metrics like the Navigation Timing API give one-off page-load info — they don\'t reveal systemic bottlenecks.' }], tip: { en: 'Don\'t stop at "Selenium can\'t do performance testing" — balance it by adding what limited insight it can still provide (synthetic monitoring).' } },
          { level: 'advanced', q: { en: 'What is Selenium 4\'s BiDi protocol and how will it affect Selenium\'s future?' }, a: { en: 'WebDriver BiDi is the new W3C standard enabling bidirectional WebSocket communication. Current HTTP protocol is request-response only. BiDi enables real-time event streaming: console logs, network events, DOM mutations — features Playwright already has. Chrome BiDi supported in Selenium 4.3+. Will close the gap with Playwright.' }, analogy: { en: 'This is like moving from synchronous HTTP request-response to a bidirectional, real-time WebSocket event stream in Java — BiDi moves WebDriver from an "ask-and-wait" model to a "listen for live events" model.' }, keyPoints: [{ en: 'This is Selenium\'s effort to catch up to the native event architecture Playwright already had.' }, { en: 'Real-time console/network event listening is far more efficient and timely than polling-based approaches.' }, { en: 'This feature is still maturing — it may not be supported at the same level across all browsers.' }], tip: { en: 'Don\'t just say "it\'s new" — explain technically why it brings Selenium closer to Playwright (auto-wait, event streaming).' } },
          { level: 'advanced', q: { en: 'Describe your migration plan from Selenium to Playwright.' }, a: { en: '1) Audit: count tests, browsers, languages, special Selenium features. 2) Pilot: migrate 20-30 critical tests. 3) Run both in parallel, compare results. 4) Module-by-module migration. Technical conversions: By.id("x") → page.locator("#x"), remove all WebDriverWait (auto-wait), switchTo().frame() → frameLocator().' }, analogy: { en: 'This is like a gradual migration from an old framework to a new one (say, Struts to Spring) in Java — a big-bang rewrite is risky and costly; you build confidence module by module while running both in parallel.' }, keyPoints: [{ en: 'The first step isn\'t writing code — it\'s inventorying the existing suite: how many tests, which special Selenium dependencies exist.' }, { en: 'WebDriverWait disappearing entirely (Playwright\'s auto-wait) is both a gain and a mindset shift for the team.' }, { en: 'Migrating the whole suite without comparing results in the pilot phase risks missing hidden regressions.' }], tip: { en: 'Frame the migration not as a one-shot "swap" but as a risk-managed project — emphasize the pilot, parallel-run, gradual-rollout sequence.' } },
          { level: 'advanced', q: { en: 'How do you integrate accessibility testing into Selenium tests?' }, a: { en: 'Use axe-core: axe-selenium-java (Java), axe-selenium-python (Python). AxeBuilder analyzes page, returns WCAG violations. In CI: fail on critical/serious violations. Filter by WCAG 2.1 AA level.', code: `Results results = new AxeBuilder().analyze(driver);
List<Rule> violations = results.getViolations();
Assert.assertEquals(violations.size(), 0, "Accessibility violations found!");` }, analogy: { en: 'This is like integrating static analysis tools (SonarQube) into a build pipeline with a quality gate in Java — axe-core does the same for accessibility, automatically scanning violations and forming a CI quality gate.' }, keyPoints: [{ en: 'Treating every violation with equal severity is wrong — critical/serious should fail the build, minor can often stay a warning.' }, { en: 'Accessibility testing is added as an extra step alongside UI tests — it shouldn\'t be managed as a separate test suite.' }, { en: 'Choosing the WCAG level (AA is usually enough) based on the project matters so you don\'t overwhelm the team with overly strict rules.' }], tip: { en: 'Don\'t stop at "I use axe-core" — justify which violation levels you fail and why, showing a pragmatic balance.' } },
          { level: 'intermediate', q: { en: 'What is the difference between Page Object Model (POM) and Page Factory? Which would you choose for a new project?' }, a: { en: 'POM is a design pattern: you group locators and actions for each page into a class so element-finding code never leaks into @Test methods. Page Factory is a Java-specific helper layer (@FindBy annotations + PageFactory.initElements()) that lazily initializes elements. So Page Factory is one way to implement POM in Java with less boilerplate; Python/TS use POM but have no Page Factory equivalent — elements are just defined in the constructor.' }, analogy: { en: 'This is like Spring\'s @Autowired doing dependency injection instead of manually implementing an interface (the POM pattern) — Page Factory hands element lookup to an annotation and removes hand-written boilerplate.' }, keyPoints: [{ en: 'POM is a pattern; Page Factory is a tool for implementing it in Java — they are not alternatives to each other.' }, { en: 'Page Factory\'s lazy initialization makes it safe to hold element references before the page has fully loaded.' }, { en: 'Python/TS teams still use POM, they just lack the annotation-based shortcut.' }], tip: { en: 'Don\'t stop at "I use POM" — clearly state whether Page Factory is part of POM or an alternative to it.' } },
          { level: 'intermediate', q: { en: 'How do you set up automatic retry for flaky Selenium tests, and when does this approach mask a real bug?' }, a: { en: 'In TestNG, implement IRetryAnalyzer and attach it via @Test(retryAnalyzer=...) or a listener that applies it to every test. Limit retries to 1-2 — more than that just hides instability. The danger: if a test fails due to a genuine race condition or a real regression, retry can make it pass on attempt 2 and the bug ships unnoticed. Always log retry counts and review tests that retry often — frequent retries are a signal to fix the root cause, not the retry policy.' }, analogy: { en: 'This is like a Java HTTP client silently retrying a failed request — convenient for transient network blips, but if the server is actually returning a 500 due to a bug, blind retrying just delays discovering the real problem.' }, keyPoints: [{ en: 'A retry policy is a safety net for flakiness, not a substitute for fixing unstable locators or timing issues.' }, { en: 'Tracking which tests retry frequently turns the mechanism into a flaky-test detector instead of a way to hide them.' }, { en: 'Retrying more than 1-2 times rarely helps — if it still fails after 2 tries, it is very likely a real bug.' }], tip: { en: 'Don\'t present retry as a fix — present it as a mitigation paired with a process for investigating tests that retry often.' } },
          { level: 'advanced', q: { en: 'What typical problems do you face running Selenium tests headless inside a Docker container, and how do you solve them?' }, a: { en: 'Most common: 1) Missing system libraries (libnss3, libgconf-2-4) — Chrome won\'t launch; using the official selenium/standalone-chrome image as the base is safest. 2) Small /dev/shm size crashes Chrome — use docker run --shm-size=2g or --disable-dev-shm-usage. 3) Missing fonts — screenshots show boxes instead of non-Latin characters; add fonts-liberation. 4) Headless rendering differs from headful for some CSS media queries — pin --window-size=1920,1080. 5) Running as root requires --no-sandbox, which needs careful security review.', code: `# Dockerfile snippet for headless Chrome\nFROM selenium/standalone-chrome:latest\nENV SCREEN_WIDTH=1920 SCREEN_HEIGHT=1080\n# docker run --shm-size=2g -v $(pwd):/tests selenium/standalone-chrome` }, analogy: { en: 'This is like deploying a Java app into a minimal Alpine container and having it crash at runtime due to missing native libraries (glibc, fontconfig) — the browser is also an "application" and the container must supply the OS pieces it needs.' }, keyPoints: [{ en: 'Starting from the official selenium/standalone-* images instead of building from scratch eliminates most missing-library problems.' }, { en: 'The /dev/shm issue is the most common yet least-known crash cause in headless containers.' }, { en: 'Not pinning the viewport size can make tests that pass on a headful machine break in CI due to different rendering.' }], tip: { en: 'Don\'t just list flags — explain why /dev/shm and fonts are headless-specific issues to show real experience.' } },
        ],
      },
    ],
  },
}

// ══════════════════════════════════════════════════════════════════════════
// 🏗️ Framework Mimarisi (SOLID + POM) — CLAUDE.md §9.6 çoklu görünüm standardı
// Referans pilot: gaugeData.js "Framework Mimarisi" bölümü. Selenium'a özgü
// yeniden yazıldı: DriverManager/BasePage/PageFactory + WebDriverWait/FluentWait.
// İpucu teması (§4.1): explicit-wait/FluentWait/OCP/@DataProvider — gauge'un
// ThreadLocal.remove/BasePage-extends/DIP/DataStore temalarından KASITLI farklı.
// Bloklar bilingual {tr,en}; sFwArch.tr ve sFwArch.en AYNI diziyi referanslar
// (fillMissingCodeTrios WeakSet ile tek kez işler). Her java code bloğu kendi
// trio'suyla (step-animation + challenge + code-playground) izlenir → filler
// jenerik blok EKLEMEZ.
// ══════════════════════════════════════════════════════════════════════════
const seleniumArchBlocks = [
  {
    type: 'simple-box',
    emoji: '🏙️',
    content: {
      tr: 'Bu sekmeye kadar yazdığın her parça (findElement çağrıları, WebDriverWait blokları, @Test metotları) tek tek çalışıyor ama birbirine GEVŞEK bağlı — tıpkı imar planı olmadan büyüyen bir sanayi sitesi gibi: her atölye kendi jeneratörünü kurar, kendi su hattını çeker, kimse ortak bir standarda uymaz. İlk 10 testte sorun çıkmaz; 200. testte "acaba bu bekleme kaç saniye?" sorusunun cevabı 200 ayrı yerde saklıdır. Framework mimarisi tam burada devreye girer: TEK bir DriverManager driver yaşam döngüsünü yönetir (ana elektrik şebekesi), TEK bir BasePage tüm bekleme/tıklama mantığını barındırır (ortak bina yönetmeliği), her PageObject SADECE kendi elementlerini bilir (mahalle sınırı). Peki her test zaten WebDriverWait kullanıyorken, neden ayrı bir mimari sekmesi açıyoruz — parçalar zaten var değil mi? Çünkü VAR OLMAK ile DOĞRU İLİŞKİLENMEK aynı şey değildir: her @Test kendi `new WebDriverWait(driver, Duration.ofSeconds(10))` satırını kopyalarsa, "bekleme süremizi 15 saniyeye çıkaralım" kararı 200 dosyayı elle değiştirmek demektir. Java karşılaştırması: kötü tasarlanmış bir projede her sınıfın kendi `SimpleDateFormat`\'ını yaratmasıyla, tek bir merkezi utility sınıfının bunu yönetmesi arasındaki fark tam olarak budur — SOLID prensipleri bu farkı disipline eder. QA bağlamı: flaky test suite\'lerinin çoğu zaman GERÇEK sebebi yanlış locator değil, mimarisizliktir; tutarsız bekleme süreleri, kopyalanmış driver kurulumları ve dağınık locator\'lar bir araya gelince "bende geçiyor, CI\'da patlıyor" kabusu doğar.',
      en: 'Every piece you have written up to this tab (findElement calls, WebDriverWait blocks, @Test methods) works on its own but is LOOSELY connected — like an industrial park that grew without a zoning plan: every workshop installs its own generator, runs its own water line, nobody follows a shared standard. The first 10 tests cause no trouble; by test 200, the answer to "how many seconds is this wait?" is hidden in 200 separate places. Framework architecture is exactly what fixes this: ONE DriverManager owns the driver lifecycle (the main power grid), ONE BasePage holds all wait/click logic (the shared building code), and each PageObject knows ONLY its own elements (a neighborhood boundary). But if every test already uses WebDriverWait, why open a separate architecture tab — don\'t the pieces already exist? Because EXISTING and being CORRECTLY RELATED are not the same thing: if every @Test copies its own `new WebDriverWait(driver, Duration.ofSeconds(10))` line, the decision to "bump our wait to 15 seconds" means editing 200 files by hand. Java comparison: in a poorly designed project, the difference between every class creating its own `SimpleDateFormat` and one central utility class managing it is exactly this — the SOLID principles discipline that difference. QA context: the REAL cause of a flaky suite is often not a wrong locator but the absence of architecture; inconsistent wait durations, copy-pasted driver setup, and scattered locators together produce the "passes on my machine, explodes in CI" nightmare.',
    },
  },
  {
    type: 'framework-puzzle',
    title: { tr: 'Selenium Framework\'ünü Adım Adım İnşa Et', en: 'Build Your Selenium Framework Step by Step' },
    intro: {
      tr: 'Aşağıdaki 4 parça, bu sekmede birazdan tek tek inşa edeceğin mimarinin BÜYÜK RESMİ. Şimdilik hepsi kilitli — her parçanın kendi adımındaki "Kendin Dene" pratiğini ilk kez doğru bitirdiğinde, o parça burada kilitliden İNŞA EDİLDİ\'ye döner. Aşağı indikçe yapbozu parça parça tamamlayacaksın.',
      en: 'The 4 pieces below are the BIG PICTURE of the architecture you are about to build piece by piece in this tab. They all start locked — the first time you correctly finish that step\'s "Try It Yourself" practice, that piece flips from locked to BUILT. As you scroll down, you will complete the puzzle piece by piece.',
    },
    pieces: [
      {
        id: 'core-base',
        emoji: '🧱',
        label: { tr: 'Core / Base Katmanı', en: 'Core / Base Layer' },
        desc: {
          tr: 'DriverManager (ThreadLocal driver) + merkezi WaitFactory (FluentWait: polling + ignoring)',
          en: 'DriverManager (ThreadLocal driver) + a central WaitFactory (FluentWait: polling + ignoring)',
        },
        exerciseId: 'selenium-arch-fluentwait-factory-practice',
      },
      {
        id: 'pom',
        emoji: '📦',
        label: { tr: 'POM Katmanı', en: 'POM Layer' },
        desc: {
          tr: 'PageFactory @FindBy + BasePage\'ten miras alan sayfa sınıfları — bekleme mantığı TEK yerde',
          en: 'PageFactory @FindBy + page classes inheriting BasePage — wait logic lives in ONE place',
        },
        exerciseId: 'selenium-arch-basepage-waitclick-practice',
      },
      {
        id: 'solid',
        emoji: '⚖️',
        label: { tr: 'SOLID Uygulaması', en: 'Applying SOLID' },
        desc: {
          tr: '5 prensip gerçek Selenium kodunda — örn. OCP: yeni bir WaitStrategy eklemek için mevcut kodu DEĞİŞTİRMEDEN genişlet',
          en: 'The 5 principles in real Selenium code — e.g. OCP: extend with a new WaitStrategy WITHOUT modifying existing code',
        },
        exerciseId: 'selenium-arch-ocp-waitstrategy-practice',
      },
      {
        id: 'test-data',
        emoji: '🔗',
        label: { tr: 'Test / Data Katmanı', en: 'Test / Data Layer' },
        desc: {
          tr: 'BaseTest hooks + TestNG @DataProvider — her parça test metodunda birbirine bağlanır',
          en: 'BaseTest hooks + TestNG @DataProvider — every piece connects inside the test method',
        },
        exerciseId: 'selenium-arch-dataprovider-practice',
      },
    ],
  },

  {
    type: 'heading',
    text: { tr: '🧭 Adım 1 — Büyük Resim: Framework Mindmap', en: '🧭 Step 1 — The Big Picture: Framework Mindmap' },
  },
  {
    type: 'text',
    content: {
      tr: 'Aynı mimari burada beş ayrı açıdan gösteriliyor: önce ana akış (bir test çalışırken kim kimi çağırır), sonra kurulum akışı (config nereden gelip driver\'a nasıl ulaşır), sonra paralel çalışma (ThreadLocal neden var), sonra veri paylaşım kapsamı (@DataProvider / ITestContext / config) ve son olarak her sınıfın "yapar / yapmaz" listesi. İlk iki kutuda ▶ Animasyon butonuna basarak akışın adım adım nasıl ilerlediğini izleyebilirsin.',
      en: 'The same architecture is shown here from five angles: first the main flow (who calls whom while a test runs), then the setup flow (how config reaches the driver), then parallel execution (why ThreadLocal exists), then the data-sharing scope (@DataProvider / ITestContext / config), and finally a "does / does not" list for every class. Press ▶ Animate on the first two boxes to watch the flow advance step by step.',
    },
  },
  {
    type: 'python-flow-diagram',
    titleTr: '1️⃣ Ana Akış — Bir @Test Nasıl Çalışır?',
    titleEn: '1️⃣ Main Flow — How Does a @Test Execute?',
    steps: [
      { type: 'action', code: '@Test method', desc: 'business scenario — orchestration ONLY, no locators', descTr: 'iş senaryosu — SADECE orkestrasyon, locator içermez' },
      { type: 'action', code: 'LoginPage (POM)', desc: 'extends BasePage — knows only its own @FindBy elements', descTr: 'BasePage\'i extends eder — sadece kendi @FindBy elementlerini bilir' },
      { type: 'action', code: 'BasePage', desc: 'SHARED logic: waitVisible / click / type via explicit wait', descTr: 'ORTAK mantık: explicit wait ile waitVisible / click / type' },
      { type: 'action', code: 'WaitFactory', desc: 'builds the ONE FluentWait config: polling + ignored exceptions', descTr: 'TEK FluentWait config\'ini kurar: polling + yok sayılan exception\'lar' },
      { type: 'end', code: 'DriverManager.getDriver()', desc: 'SRP: driver lifecycle ONLY — ThreadLocal<WebDriver>', descTr: 'SRP: SADECE driver yaşam döngüsü — ThreadLocal<WebDriver>' },
    ],
  },
  {
    type: 'python-flow-diagram',
    titleTr: '2️⃣ Kurulum Akışı — Config, Driver\'a Nasıl Ulaşır?',
    titleEn: '2️⃣ Setup Flow — How Does Config Reach the Driver?',
    steps: [
      { type: 'action', code: 'config.properties', desc: 'environment config: base.url, browser, timeout', descTr: 'ortam konfigürasyonu: base.url, browser, timeout' },
      { type: 'action', code: 'BaseTest', desc: 'reads config, hooks @BeforeMethod / @AfterMethod (TestNG)', descTr: 'config okur, @BeforeMethod / @AfterMethod hook\'larına bağlanır (TestNG)' },
      { type: 'end', code: 'DriverManager.createDriver()', desc: 'creates the driver BEFORE the main flow above even starts', descTr: 'yukarıdaki ana akış başlamadan ÖNCE driver\'ı yaratır' },
    ],
  },
  {
    type: 'subheading',
    text: { tr: '3️⃣ Paralel Çalışma — Neden ThreadLocal?', en: '3️⃣ Parallel Execution — Why ThreadLocal?' },
  },
  {
    type: 'grid',
    cols: 3,
    items: [
      { icon: '🧵', label: { tr: 'Thread-1', en: 'Thread-1' }, desc: { tr: 'DriverManager → Chrome Driver #1 (bağımsız oturum)', en: 'DriverManager → Chrome Driver #1 (independent session)' } },
      { icon: '🧵', label: { tr: 'Thread-2', en: 'Thread-2' }, desc: { tr: 'DriverManager → Chrome Driver #2 (bağımsız oturum)', en: 'DriverManager → Chrome Driver #2 (independent session)' } },
      { icon: '🧵', label: { tr: 'Thread-3', en: 'Thread-3' }, desc: { tr: 'DriverManager → Chrome Driver #3 (bağımsız oturum)', en: 'DriverManager → Chrome Driver #3 (independent session)' } },
    ],
  },
  {
    type: 'text',
    content: {
      tr: 'TestNG `parallel="methods"` ile testleri aynı anda koşturduğunda, statik tek bir WebDriver alanı OLSAYDI üç thread aynı tarayıcıya yazardı ve testler birbirinin sayfasını bozardı. ThreadLocal sayesinde aynı DriverManager sınıfı her thread\'e HİZMET eder ama her thread kendi WebDriver referansını tutar — bir thread bittiğinde diğerlerinin oturumu ETKİLENMEZ.',
      en: 'When you run tests concurrently with TestNG `parallel="methods"`, a single static WebDriver field WOULD let three threads write to the same browser and tests would corrupt each other\'s page. Thanks to ThreadLocal, the same DriverManager class serves every thread, but each thread holds its own WebDriver reference — when one thread finishes, the others\' sessions are NOT affected.',
    },
  },
  {
    type: 'subheading',
    text: { tr: '4️⃣ Veri Paylaşım Kapsamı — Test Verisi Nereden Gelir?', en: '4️⃣ Data-Sharing Scope — Where Does Test Data Come From?' },
  },
  {
    type: 'grid',
    cols: 3,
    items: [
      { icon: '🎬', label: { tr: '@DataProvider', en: '@DataProvider' }, desc: { tr: 'Kapsam: tek test metodu — her satır AYNI testi farklı veriyle çalıştırır (data-driven)', en: 'Scope: a single test method — each row runs the SAME test with different data (data-driven)' } },
      { icon: '📄', label: { tr: 'ITestContext', en: 'ITestContext' }, desc: { tr: 'Kapsam: aynı <test> etiketi — setAttribute/getAttribute ile testler arası veri taşınır', en: 'Scope: the same <test> tag — data is carried across tests via setAttribute/getAttribute' } },
      { icon: '📦', label: { tr: 'config.properties', en: 'config.properties' }, desc: { tr: 'Kapsam: TÜM suite — base.url, browser gibi ortam sabitleri tek yerden okunur', en: 'Scope: the ENTIRE suite — environment constants like base.url, browser are read from one place' } },
    ],
  },
  {
    type: 'subheading',
    text: { tr: '5️⃣ Kim Ne Yapar? — Sınıf Sorumlulukları', en: '5️⃣ Who Does What? — Class Responsibilities' },
  },
  {
    type: 'grid',
    cols: 3,
    items: [
      { icon: '🧪', label: { tr: '@Test method', en: '@Test method' }, desc: { tr: '✔ Senaryo akışı · ✔ Assertion · ✘ Locator/wait içermez', en: '✔ Scenario flow · ✔ Assertions · ✘ Contains no locators/waits' } },
      { icon: '🖱️', label: { tr: 'LoginPage (POM)', en: 'LoginPage (POM)' }, desc: { tr: '✔ @FindBy locator · ✔ Business action · ✘ Assertion içermez', en: '✔ @FindBy locators · ✔ Business actions · ✘ Contains no assertions' } },
      { icon: '🧱', label: { tr: 'BasePage', en: 'BasePage' }, desc: { tr: '✔ waitVisible · ✔ click · ✔ type · ✔ scroll · ✔ jsClick', en: '✔ waitVisible · ✔ click · ✔ type · ✔ scroll · ✔ jsClick' } },
      { icon: '⏳', label: { tr: 'WaitFactory', en: 'WaitFactory' }, desc: { tr: '✔ FluentWait kurar · ✔ polling ayarlar · ✔ exception ignore eder', en: '✔ Builds FluentWait · ✔ Sets polling · ✔ Ignores exceptions' } },
      { icon: '🚰', label: { tr: 'DriverManager', en: 'DriverManager' }, desc: { tr: '✔ Driver yaratır · ✔ Driver kapatır · ✔ Thread yönetir', en: '✔ Creates driver · ✔ Closes driver · ✔ Manages threads' } },
      { icon: '🪝', label: { tr: 'BaseTest', en: 'BaseTest' }, desc: { tr: '✔ Hook · ✔ config okur · ✔ Setup/Teardown', en: '✔ Hooks · ✔ Reads config · ✔ Setup/Teardown' } },
    ],
  },
  {
    type: 'quiz',
    question: {
      tr: 'Yukarıdaki mimaride bir @Test metodu (örn. loginTest) WebDriver\'ı NEREDEN alır?',
      en: 'In the architecture above, where does a @Test method (e.g. loginTest) get its WebDriver FROM?',
    },
    options: [
      { id: 'a', text: { tr: 'Kendi içinde new ChromeDriver() ile yaratır', en: 'It creates it itself with new ChromeDriver()' } },
      { id: 'b', text: { tr: 'DriverManager.getDriver() ile ThreadLocal\'dan alır', en: 'It gets it from ThreadLocal via DriverManager.getDriver()' } },
      { id: 'c', text: { tr: 'config.properties dosyasından okur', en: 'It reads it from the config.properties file' } },
      { id: 'd', text: { tr: 'Her @Test metodunun başında elle tanımlanır', en: 'It is manually defined at the top of every @Test method' } },
    ],
    correct: 'b',
    explanation: {
      tr: 'Mimarinin can damarı budur: driver yaratma sorumluluğu TEK bir sınıfta (DriverManager) toplanır, geri kalan her katman onu getDriver() ile İSTER — bu ayrım olmasaydı paralel koşumda her test kendi driver\'ını yaratır ve ThreadLocal olmadan çakışırdı.',
      en: 'This is the artery of the architecture: driver-creation responsibility lives in ONE class (DriverManager), and every other layer simply ASKS for it via getDriver() — without this split, under parallel execution each test would create its own driver and, without ThreadLocal, they would collide.',
    },
    retryQuestion: {
      question: {
        tr: 'Mindmap\'te ana bekleme mantığı (waitVisible/click/type) hangi sınıfta toplanır?',
        en: 'In the mindmap, which class centralizes the main wait logic (waitVisible/click/type)?',
      },
      options: [
        { id: 'a', text: { tr: 'BasePage', en: 'BasePage' } },
        { id: 'b', text: { tr: 'Her @Test metodu ayrı ayrı', en: 'Each @Test method separately' } },
        { id: 'c', text: { tr: 'DriverManager', en: 'DriverManager' } },
        { id: 'd', text: { tr: 'config.properties', en: 'config.properties' } },
      ],
      correct: 'a',
      explanation: {
        tr: 'BasePage, tüm PageObject\'lerin miras aldığı ortak bekleme/tıklama katmanıdır — bekleme mantığı burada TEK yerde durur, böylece "wait süremizi değiştirelim" kararı tek satırlık bir değişiklikle tüm sayfalara yayılır.',
        en: 'BasePage is the shared wait/click layer every PageObject inherits — wait logic lives here in ONE place, so a "let\'s change our wait" decision propagates to every page through a single-line edit.',
      },
    },
  },

  // ── Adım 2 — Core / Base Katmanı: DriverManager & WaitFactory ──
  {
    type: 'heading',
    text: { tr: '🧱 Adım 2 — Core / Base Katmanı: DriverManager & WaitFactory', en: '🧱 Step 2 — Core / Base Layer: DriverManager & WaitFactory' },
  },
  {
    type: 'simple-box',
    emoji: '⏳',
    content: {
      tr: 'WaitFactory, bir hastanenin merkezi triyaj masasıdır: her doktor (her test) hastayı (elementi) kendi kafasına göre "biraz bekle" diye geri göndermez — TEK bir kural vardır (kaç saniyede bir kontrol edilir, hangi durumlar "henüz hazır değil, sabret" sayılır), triyaj masası bu kuralı uygular. İkinci benzetme: FluentWait, bir garsonun masayı KONTROL EDİŞ ritmidir — WebDriverWait "10 saniye boyunca sürekli bak" der, FluentWait ise "her 500 ms\'de bir bak, üstelik masa boşsa (NoSuchElement) kızma, tekrar dene" diyerek nabız hızını ve hangi hataların "normal, devam et" sayılacağını AYARLAR. Peki her test zaten `new WebDriverWait(driver, ...)` yazabiliyorken, neden ayrı bir WaitFactory sınıfı gerekiyor — bekleme zaten çalışıyor değil mi? Sorun şu: polling aralığını 500 ms yapmak, `StaleElementReferenceException`\'ı yok saymak ve timeout mesajını anlamlı hale getirmek gibi kararlar HER teste kopyalanırsa, biri bir yerde 250 ms yazar, başkası ignore listesini unutur ve suite tutarsızlaşır. WaitFactory bu kararı TEK yerde dondurur. Java karşılaştırması: bu, her sınıfın kendi `ExecutorService`\'ini yaratması yerine tek bir merkezi thread-pool factory kullanmasıyla aynı motivasyondur — pahalı/hassas yapılandırmayı merkezileştir. QA bağlamı: FluentWait\'in `ignoring(StaleElementReferenceException.class)` satırı atlanırsa, DOM yeniden render olan (React/Angular) sayfalarda test rastgele patlar — "element vardı, sonra yoktu" tipi flaky hatanın en sık kök nedeni budur.',
      en: 'WaitFactory is a hospital\'s central triage desk: no doctor (no test) sends the patient (element) back with an ad-hoc "wait a bit" — there is ONE rule (how often to re-check, which states count as "not ready yet, be patient"), and the triage desk enforces it. Second analogy: FluentWait is a waiter\'s rhythm for CHECKING a table — WebDriverWait says "keep looking for 10 seconds", while FluentWait says "look every 500 ms, and if the table is empty (NoSuchElement) don\'t get upset, try again", TUNING both the pulse rate and which errors count as "normal, keep going". But if every test can already write `new WebDriverWait(driver, ...)`, why do we need a separate WaitFactory class — isn\'t waiting already working? The problem: if decisions like setting the polling interval to 500 ms, ignoring `StaleElementReferenceException`, and making the timeout message meaningful are copied into EVERY test, someone writes 250 ms somewhere, someone else forgets the ignore list, and the suite drifts into inconsistency. WaitFactory freezes that decision in ONE place. Java comparison: this is the same motivation as using one central thread-pool factory instead of every class creating its own `ExecutorService` — centralize the expensive/sensitive configuration. QA context: if FluentWait\'s `ignoring(StaleElementReferenceException.class)` line is skipped, tests randomly explode on pages that re-render the DOM (React/Angular) — that is the single most common root cause of the "the element was there, then it was gone" flaky failure.',
    },
  },
  {
    type: 'text',
    content: {
      tr: 'DriverManager ve WaitFactory\'nin AYRI sınıflar olmasının nedeni Single Responsibility Principle\'dır (SRP): DriverManager sadece "driver nasıl yaratılır/kapatılır ve hangi thread\'e ait" sorusuna cevap verir, WaitFactory ise sadece "bir bekleme koşulu HANGİ ritimle ve hangi hataları yok sayarak beklenir" sorusuna cevap verir. İkisini tek sınıfta birleştirseydin, bir Chrome sürüm güncellemesi driver kurulumunu değiştirdiğinde bekleme mantığına da dokunmak zorunda kalırdın — oysa şimdi ikisi bağımsız değişebilir.',
      en: 'DriverManager and WaitFactory are SEPARATE classes because of the Single Responsibility Principle (SRP): DriverManager answers only "how is a driver created/closed and which thread owns it", while WaitFactory answers only "with WHAT rhythm and ignoring which errors does a wait condition get awaited". Had you merged them into one class, a Chrome version bump that changes driver setup would force you to also touch the wait logic — as it stands now, the two can change independently.',
    },
  },
  {
    type: 'code',
    language: 'java',
    code: {
      tr: `// ─── core/DriverManager.java — SADECE driver yasam dongusu (SRP) ───
package core;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public final class DriverManager {

    // ThreadLocal: paralel kosumda HER thread kendi driver'ina sahip olur
    private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();

    private DriverManager() {} // utility sinif — instance uretilmesin (SRP siniri)

    public static void createDriver() {
        DRIVER.set(new ChromeDriver());
    }

    public static WebDriver getDriver() {
        return DRIVER.get();   // her katman driver'i BURADAN ister
    }

    public static void quitDriver() {
        WebDriver driver = DRIVER.get();
        if (driver != null) {
            driver.quit();
            DRIVER.remove();   // thread pool'da eski referans sizmasin diye
        }
    }
}

// ─── core/WaitFactory.java — SADECE bekleme ritmi + hata politikasi (SRP) ───
package core;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;

public final class WaitFactory {

    private WaitFactory() {}

    // TUM testlerin PAYLASTIGI TEK bekleme ritmi ve hata politikasi
    public static Wait<WebDriver> fluentWait() {
        return new FluentWait<>(DriverManager.getDriver())
            .withTimeout(Duration.ofSeconds(10))     // en fazla 10 sn bekle
            .pollingEvery(Duration.ofMillis(500))    // her 500 ms'de bir kontrol et
            // asagidaki iki hata "henuz hazir degil" sayilir, patlamaz:
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class);
    }
}`,
      en: `// ─── core/DriverManager.java — ONLY the driver lifecycle (SRP) ───
package core;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public final class DriverManager {

    // ThreadLocal: under parallel runs, EVERY thread gets its own driver
    private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();

    private DriverManager() {} // utility class — no instances (SRP boundary)

    public static void createDriver() {
        DRIVER.set(new ChromeDriver());
    }

    public static WebDriver getDriver() {
        return DRIVER.get();   // every layer ASKS for the driver HERE
    }

    public static void quitDriver() {
        WebDriver driver = DRIVER.get();
        if (driver != null) {
            driver.quit();
            DRIVER.remove();   // so no stale reference leaks in the thread pool
        }
    }
}

// ─── core/WaitFactory.java — ONLY the wait rhythm + error policy (SRP) ───
package core;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;

public final class WaitFactory {

    private WaitFactory() {}

    // the ONE wait rhythm and error policy SHARED by every test
    public static Wait<WebDriver> fluentWait() {
        return new FluentWait<>(DriverManager.getDriver())
            .withTimeout(Duration.ofSeconds(10))     // wait at most 10s
            .pollingEvery(Duration.ofMillis(500))    // re-check every 500 ms
            // the two errors below count as "not ready yet", they do not blow up:
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class);
    }
}`,
    },
  },
  {
    type: 'step-animation',
    id: 'selenium-arch-fluentwait-lifecycle-steps',
    title: { tr: 'Adım Adım: FluentWait Bir Elementi Nasıl Bekler?', en: 'Step by Step: How FluentWait Waits for an Element' },
    steps: [
      { id: 1, icon: '🏁', label: { tr: 'fluentWait() çağrılır', en: 'fluentWait() is called' }, detail: { tr: 'WaitFactory.fluentWait(), DriverManager.getDriver() ile o thread\'in driver\'ını alır ve 10 sn timeout + 500 ms polling ayarlı bir Wait nesnesi kurar.', en: 'WaitFactory.fluentWait() takes that thread\'s driver via DriverManager.getDriver() and builds a Wait with a 10s timeout + 500 ms polling.' } },
      { id: 2, icon: '🔁', label: { tr: 'İlk kontrol: element yok', en: 'First poll: element missing' }, detail: { tr: 'Sayfa henüz render olmadıysa NoSuchElementException fırlar — ama ignoring() listesinde olduğu için FluentWait patlamaz, sadece 500 ms bekleyip TEKRAR dener.', en: 'If the page has not rendered yet, NoSuchElementException is thrown — but since it is in the ignoring() list, FluentWait does not blow up, it just waits 500 ms and RETRIES.' } },
      { id: 3, icon: '♻️', label: { tr: 'DOM değişti: stale referans', en: 'DOM changed: stale reference' }, detail: { tr: 'React/Angular elementi yeniden render ederse StaleElementReferenceException oluşur — bu da ignore listesinde olduğu için bir sonraki polling\'de element yeniden bulunur.', en: 'If React/Angular re-renders the element, a StaleElementReferenceException occurs — it is also ignored, so the next poll finds the element afresh.' } },
      { id: 4, icon: '✅', label: { tr: 'Element hazır: koşul döner', en: 'Element ready: condition returns' }, detail: { tr: 'Element görünür/tıklanabilir olduğunda beklenen koşul true döner ve akış devam eder — çoğu zaman 10 saniyenin çok altında, örn. 700 ms\'de.', en: 'When the element becomes visible/clickable, the awaited condition returns true and the flow continues — usually far below 10 seconds, e.g. 700 ms.' } },
      { id: 5, icon: '🚨', label: { tr: 'Süre dolarsa: TimeoutException', en: 'On timeout: TimeoutException' }, detail: { tr: '10 sn içinde koşul hiç sağlanmazsa TimeoutException fırlar — ve ignore edilmediği için burada DURUR; bu, "beklediğim şey gerçekten gelmedi" sinyalidir.', en: 'If the condition is never met within 10s, a TimeoutException is thrown — and since it is not ignored, it STOPS here; this is the "the thing I waited for really never came" signal.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-selenium-arch-fluentwait-order',
    question: {
      tr: 'WaitFactory.fluentWait() bir FluentWait kurarken zincirdeki yapılandırma adımlarını mantıklı sıraya diz.',
      en: 'Arrange the configuration steps in the chain when WaitFactory.fluentWait() builds a FluentWait, in a logical order.',
    },
    items: [
      { id: '1', text: { tr: 'DriverManager.getDriver() ile bu thread\'in driver\'ını al', en: 'Take this thread\'s driver via DriverManager.getDriver()' }, order: 1 },
      { id: '2', text: { tr: 'new FluentWait<>(driver) ile bekleme nesnesini oluştur', en: 'Create the wait object with new FluentWait<>(driver)' }, order: 2 },
      { id: '3', text: { tr: 'withTimeout(10 sn) ile üst sınırı belirle', en: 'Set the upper bound with withTimeout(10s)' }, order: 3 },
      { id: '4', text: { tr: 'pollingEvery(500 ms) ile kontrol ritmini ayarla', en: 'Set the check rhythm with pollingEvery(500 ms)' }, order: 4 },
      { id: '5', text: { tr: 'ignoring(...) ile hangi hataların "henüz hazır değil" sayılacağını belirt', en: 'Declare which errors count as "not ready yet" with ignoring(...)' }, order: 5 },
    ],
    xpReward: 20,
  },
  {
    type: 'code-playground',
    relatedTopicId: 'selenium-framework-waitfactory',
    id: 'selenium-arch-fluentwait-factory-practice',
    label: {
      tr: 'Micro Lab: WaitFactory.fluentWait()\'i stale-güvenli tamamla',
      en: 'Micro Lab: complete WaitFactory.fluentWait() to be stale-safe',
    },
    language: 'java',
    task: {
      tr: 'Aşağıdaki fluentWait() metodu eksik: timeout ve polling ayarlanmış ama ignore listesi boş. React tabanlı bir sayfada elementler sürekli yeniden render olduğu için StaleElementReferenceException alıyorsun. TODO satırlarını, NoSuchElementException VE StaleElementReferenceException\'ı yok sayacak şekilde tamamla — bu iki satır olmadan FluentWait, ilk "element yok" anında patlar.',
      en: 'The fluentWait() method below is incomplete: timeout and polling are set, but the ignore list is empty. On a React-based page where elements constantly re-render, you keep getting StaleElementReferenceException. Complete the TODO lines to ignore BOTH NoSuchElementException AND StaleElementReferenceException — without these two lines, FluentWait blows up the first moment the "element is missing".',
    },
    explanation: {
      tr: 'Bu pratik gerçek bir tarayıcı açmaz; amaç FluentWait\'in ignoring() zincirini elle yazarak, dinamik sayfalardaki flaky\'liğin NEDEN doğru exception politikasıyla çözüldüğünü pekiştirmektir.',
      en: 'This is not a real browser session; the goal is to reinforce, by writing FluentWait\'s ignoring() chain yourself, WHY flakiness on dynamic pages is solved by the correct exception policy.',
    },
    code: {
      tr: `public static Wait<WebDriver> fluentWait() {
    return new FluentWait<>(DriverManager.getDriver())
        .withTimeout(Duration.ofSeconds(10))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class)
        .ignoring(StaleElementReferenceException.class);
}`,
      en: `public static Wait<WebDriver> fluentWait() {
    return new FluentWait<>(DriverManager.getDriver())
        .withTimeout(Duration.ofSeconds(10))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class)
        .ignoring(StaleElementReferenceException.class);
}`,
    },
    starterCode: {
      tr: `public static Wait<WebDriver> fluentWait() {
    return new FluentWait<>(DriverManager.getDriver())
        .withTimeout(Duration.ofSeconds(10))
        .pollingEvery(Duration.ofMillis(500))
        TODO   // element henuz yoksa patlama
        TODO;  // DOM yeniden render olursa patlama
}`,
      en: `public static Wait<WebDriver> fluentWait() {
    return new FluentWait<>(DriverManager.getDriver())
        .withTimeout(Duration.ofSeconds(10))
        .pollingEvery(Duration.ofMillis(500))
        TODO   // do not blow up if the element is missing yet
        TODO;  // do not blow up if the DOM re-renders
}`,
    },
    solutionCode: {
      tr: `public static Wait<WebDriver> fluentWait() {
    return new FluentWait<>(DriverManager.getDriver())
        .withTimeout(Duration.ofSeconds(10))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class)
        .ignoring(StaleElementReferenceException.class);
}`,
      en: `public static Wait<WebDriver> fluentWait() {
    return new FluentWait<>(DriverManager.getDriver())
        .withTimeout(Duration.ofSeconds(10))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class)
        .ignoring(StaleElementReferenceException.class);
}`,
    },
    expected: {
      tr: 'İki TODO satırı .ignoring(NoSuchElementException.class) ve .ignoring(StaleElementReferenceException.class) olmalı — bu iki hata "henüz hazır değil, tekrar dene" sayılır, timeout dolana kadar polling devam eder.',
      en: 'The two TODO lines must be .ignoring(NoSuchElementException.class) and .ignoring(StaleElementReferenceException.class) — these two errors count as "not ready yet, retry", and polling continues until the timeout.',
    },
    hints: [
      { tr: 'ignoring() metodu bir exception sınıfı alır ve o exception olduğunda beklemeyi SONLANDIRMAZ, sadece bir sonraki polling\'e geçer — zincire istediğin kadar ignoring() ekleyebilirsin.', en: 'The ignoring() method takes an exception class and, when that exception occurs, does NOT end the wait, it just moves to the next poll — you can chain as many ignoring() calls as you like.' },
      { tr: 'NoSuchElementException "element henüz DOM\'da yok" demektir; StaleElementReferenceException "element vardı ama DOM yeniden render oldu" demektir — dinamik sayfalarda ikisi de normaldir, ikisini de ignore et.', en: 'NoSuchElementException means "the element is not in the DOM yet"; StaleElementReferenceException means "the element was there but the DOM re-rendered" — on dynamic pages both are normal, ignore both.' },
      { tr: 'TimeoutException\'ı ASLA ignore etme — o, "10 saniye doldu ve beklediğim koşul hiç sağlanmadı" gerçek sinyalidir; ignore edersen test sonsuza kadar sessizce başarısız olur.', en: 'NEVER ignore TimeoutException — it is the real "10 seconds elapsed and my condition was never met" signal; ignoring it makes the test silently fail forever.' },
    ],
    xpReward: 15,
  },
  {
    type: 'quiz',
    question: {
      tr: 'FluentWait\'in ignoring(StaleElementReferenceException.class) satırı ATLANIRSA, sürekli yeniden render olan (React) bir sayfada en olası sonuç nedir?',
      en: 'If FluentWait\'s ignoring(StaleElementReferenceException.class) line is SKIPPED, what is the most likely outcome on a constantly re-rendering (React) page?',
    },
    options: [
      { id: 'a', text: { tr: 'Hiçbir fark olmaz, ignoring() sadece performans içindir', en: 'No difference, ignoring() is only for performance' } },
      { id: 'b', text: { tr: 'Element render sırasında değişirse test rastgele StaleElementReferenceException ile patlar (flaky)', en: 'If the element changes during re-render, the test randomly fails with StaleElementReferenceException (flaky)' } },
      { id: 'c', text: { tr: 'Tüm testler derleme hatası verir', en: 'All tests fail to compile' } },
      { id: 'd', text: { tr: 'Timeout süresi otomatik olarak iki katına çıkar', en: 'The timeout duration automatically doubles' } },
    ],
    correct: 'b',
    explanation: {
      tr: 'StaleElementReferenceException, bulduğun element referansının DOM yeniden render olunca geçersizleşmesiyle oluşur. ignoring() listesinde değilse FluentWait ilk stale anında hatayı yukarı fırlatır ve test, aslında element birkaç ms sonra hazır olacakken başarısız olur — bu, dinamik sayfalardaki flaky\'liğin klasik kaynağıdır.',
      en: 'StaleElementReferenceException occurs when the element reference you found is invalidated by a DOM re-render. If it is not in the ignoring() list, FluentWait rethrows on the first stale moment and the test fails even though the element would have been ready a few ms later — this is the classic source of flakiness on dynamic pages.',
    },
    retryQuestion: {
      question: {
        tr: 'WaitFactory\'yi ayrı bir sınıf yapmak yerine her testte `new WebDriverWait(driver, ...)` yazsaydın en olası uzun vadeli problem ne olurdu?',
        en: 'If instead of a separate WaitFactory class you wrote `new WebDriverWait(driver, ...)` in every test, what would the most likely long-term problem be?',
      },
      options: [
        { id: 'a', text: { tr: 'Bekleme süresi/polling/ignore politikası testler arası tutarsızlaşır, tek bir değişiklik 200 dosyaya yayılmaz', en: 'The timeout/polling/ignore policy drifts across tests, and one change cannot propagate to 200 files' } },
        { id: 'b', text: { tr: 'Driver hiç açılmaz', en: 'The driver would never open' } },
        { id: 'c', text: { tr: 'Testler derlenmez', en: 'The tests would not compile' } },
        { id: 'd', text: { tr: 'Hiçbir fark olmaz', en: 'There would be no difference' } },
      ],
      correct: 'a',
      explanation: {
        tr: 'Merkezi WaitFactory olmadan her test kendi bekleme yapılandırmasını taşır; biri 250 ms, biri 1000 ms yazar, biri ignore listesini unutur. "Bekleme stratejimizi değiştirelim" kararı tek satırlık bir PR yerine 200 dosyalık bir arama-değiştirme işine dönüşür.',
        en: 'Without a central WaitFactory, every test carries its own wait configuration; one writes 250 ms, another 1000 ms, another forgets the ignore list. The "let\'s change our wait strategy" decision turns from a one-line PR into a 200-file find-and-replace chore.',
      },
    },
  },

  // ── Adım 3 — POM Katmanı: PageFactory @FindBy + BasePage Mirası ──
  {
    type: 'heading',
    text: { tr: '📦 Adım 3 — Page Object Model (POM): PageFactory & BasePage Mirası', en: '📦 Step 3 — Page Object Model (POM): PageFactory & BasePage Inheritance' },
  },
  {
    type: 'simple-box',
    emoji: '🧬',
    content: {
      tr: 'BasePage, bir aracın ORTAK şasisidir: her model (LoginPage, ProductPage, CartPage) kendi motorunu ve gövdesini (kendi @FindBy elementlerini) getirir ama fren sistemi, direksiyon ve süspansiyon (waitVisible/click/type) ortak platformdan gelir — Toyota\'nın onlarca modeli aynı TNGA platformunu paylaşması gibi. İkinci benzetme: PageFactory\'nin @FindBy alanları, henüz doldurulmamış zarf etiketleridir; `PageFactory.initElements()` çağrılana kadar element DOM\'da ARANMAZ, sadece "bu alanı sorduğunda şu locator ile ara" talimatı yazılıdır (lazy proxy). Peki LoginPage doğrudan `driver.findElement(...)` ile de çalışabiliyorken, neden @FindBy + BasePage mirası kuruyoruz — fazladan katman değil mi? Değil, çünkü ikinci bir sayfa sınıfı (CartPage) yazdığın AN, aynı `wait → click` mantığını KOPYALARSIN; o kopyada biri bekleme koşulunu `presenceOf` yaparsa (görünür değil, sadece DOM\'da var) tıklama görünmez elemente gider ve sessizce başarısız olur. BasePage bu mantığı TEK yerde tutar. Java karşılaştırması: bu, `AbstractList`\'in `ArrayList`/`LinkedList`\'e ortak iskelet vermesiyle birebir aynıdır — "tekrar eden davranışı YUKARI taşı, farklı olanı AŞAĞIDA bırak". QA bağlamı: BasePage\'deki tek bir "önce görünürlüğü bekle, sonra tıkla" kararı, 50 sayfa sınıfının HEPSİNİ aynı anda "erken tıklama" (element henüz aktif değilken click) hatasına karşı korur.',
      en: 'BasePage is a car\'s SHARED chassis: every model (LoginPage, ProductPage, CartPage) brings its own engine and body (its own @FindBy elements), but the brakes, steering, and suspension (waitVisible/click/type) come from the shared platform — like Toyota\'s dozens of models sharing the same TNGA platform. Second analogy: PageFactory\'s @FindBy fields are envelope labels not yet filled; until `PageFactory.initElements()` is called, the element is NOT searched in the DOM, only the instruction "when you ask for this field, look with this locator" is written (a lazy proxy). But if LoginPage can also work with a direct `driver.findElement(...)`, why set up @FindBy + BasePage inheritance — isn\'t it an extra layer? It is not, because the MOMENT you write a second page class (CartPage), you COPY the same `wait → click` logic; and in that copy, if someone makes the wait `presenceOf` (present in DOM, not visible), the click goes to an invisible element and silently fails. BasePage keeps that logic in ONE place. Java comparison: this is exactly `AbstractList` giving `ArrayList`/`LinkedList` a shared skeleton — "push repeated behavior UP, leave what differs DOWN". QA context: one "wait for visibility first, then click" decision in BasePage protects ALL 50 page classes at once against the "early click" bug (clicking while the element is not yet actionable).',
    },
  },
  {
    type: 'text',
    content: {
      tr: 'Encapsulation burada devrededir: BasePage, WaitFactory\'yi ve bekleme detayını kendi içinde tutar — hiçbir sayfa sınıfı `FluentWait` veya `ExpectedConditions` API\'sini görmek ZORUNDA değildir, sadece click(element) veya type(element, "metin") çağırır. LoginPage\'i yazan kişi "nasıl beklendiğini" bilmeden iş kuralını (loginAs) yazabilir; bekleme stratejisi tamamen alt katmanda gizlidir.',
      en: 'Encapsulation is at work here: BasePage keeps WaitFactory and the wait detail inside itself — no page class MUST see the `FluentWait` or `ExpectedConditions` API, it just calls click(element) or type(element, "text"). Whoever writes LoginPage can write the business rule (loginAs) without knowing "how it waits"; the wait strategy is fully hidden in the lower layer.',
    },
  },
  {
    type: 'code',
    language: 'java',
    code: {
      tr: `// ─── pages/BasePage.java — ortak bekle-ve-tikla katmani ───
package pages;

import core.WaitFactory;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

public abstract class BasePage {

    protected final WebDriver driver;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
    }

    // TUM sayfa siniflarinin PAYLASTIGI ortak bekle-ve-tikla mantigi
    protected WebElement waitVisible(WebElement element) {
        return WaitFactory.fluentWait()
            .until(ExpectedConditions.visibilityOf(element));
    }

    public void click(WebElement element) {
        waitVisible(element).click();   // once gorunur olmasini bekle, SONRA tikla
    }

    public void type(WebElement element, String text) {
        WebElement el = waitVisible(element);
        el.clear();          // onceki metni temizle
        el.sendKeys(text);
    }
}

// ─── pages/LoginPage.java — sadece kendi elementlerini bilir (POM) ───
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends BasePage {

    @FindBy(id = "username") private WebElement usernameInput;
    @FindBy(id = "password") private WebElement passwordInput;
    @FindBy(css = "button[type='submit']") private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        super(driver);                          // BasePage constructor'ini cagirir
        PageFactory.initElements(driver, this);  // @FindBy proxy'lerini enjekte eder
    }

    public void loginAs(String user, String pass) {
        type(usernameInput, user);   // BasePage.type() — bekleme HER YERDE ayni
        type(passwordInput, pass);
        click(loginButton);          // BasePage.click() — bekleme HER YERDE ayni
    }
}`,
      en: `// ─── pages/BasePage.java — the shared wait-and-act layer ───
package pages;

import core.WaitFactory;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

public abstract class BasePage {

    protected final WebDriver driver;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
    }

    // the shared wait-then-act logic SHARED by every page class
    protected WebElement waitVisible(WebElement element) {
        return WaitFactory.fluentWait()
            .until(ExpectedConditions.visibilityOf(element));
    }

    public void click(WebElement element) {
        waitVisible(element).click();   // wait until visible FIRST, THEN click
    }

    public void type(WebElement element, String text) {
        WebElement el = waitVisible(element);
        el.clear();          // clear the previous text
        el.sendKeys(text);
    }
}

// ─── pages/LoginPage.java — knows only its own elements (POM) ───
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends BasePage {

    @FindBy(id = "username") private WebElement usernameInput;
    @FindBy(id = "password") private WebElement passwordInput;
    @FindBy(css = "button[type='submit']") private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        super(driver);                          // calls the BasePage constructor
        PageFactory.initElements(driver, this);  // injects the @FindBy proxies
    }

    public void loginAs(String user, String pass) {
        type(usernameInput, user);   // BasePage.type() — the SAME wait everywhere
        type(passwordInput, pass);
        click(loginButton);          // BasePage.click() — the SAME wait everywhere
    }
}`,
    },
  },
  {
    type: 'step-animation',
    id: 'selenium-arch-pom-findby-steps',
    title: { tr: 'Adım Adım: @FindBy Proxy\'si Gerçek Elemente Ne Zaman Dönüşür?', en: 'Step by Step: When Does the @FindBy Proxy Become a Real Element?' },
    steps: [
      { id: 1, icon: '🏷️', label: { tr: 'initElements() proxy\'leri kurar', en: 'initElements() sets up proxies' }, detail: { tr: 'LoginPage constructor\'ında PageFactory.initElements(driver, this) çağrılır — usernameInput henüz DOM\'da aranmadı, sadece "id=username ile ara" talimatını tutan bir proxy oldu.', en: 'In the LoginPage constructor, PageFactory.initElements(driver, this) is called — usernameInput is not searched in the DOM yet, it just became a proxy holding the instruction "look by id=username".' } },
      { id: 2, icon: '☎️', label: { tr: '@Test loginAs() çağırır', en: 'The @Test calls loginAs()' }, detail: { tr: 'Test, loginPage.loginAs("admin", "Passw0rd!") çağırır — Selenium\'un tek bir detayını BİLMEZ, sadece iş kuralını tetikler.', en: 'The test calls loginPage.loginAs("admin", "Passw0rd!") — it knows NOTHING about Selenium internals, it just triggers the business rule.' } },
      { id: 3, icon: '⏳', label: { tr: 'BasePage.type() beklemeyi başlatır', en: 'BasePage.type() starts the wait' }, detail: { tr: 'type(usernameInput, ...) içinde waitVisible() çağrılır — İŞTE BURADA proxy gerçekten DOM\'da aranır ve görünür olması FluentWait ile beklenir.', en: 'Inside type(usernameInput, ...), waitVisible() is called — RIGHT HERE the proxy is actually searched in the DOM and its visibility is awaited via FluentWait.' } },
      { id: 4, icon: '⌨️', label: { tr: 'Görünür olunca yazılır', en: 'Once visible, the value is typed' }, detail: { tr: 'Element görünür olunca clear() + sendKeys() çalışır — bu satıra kadar LoginPage, FluentWait\'in var olduğunu bile bilmiyordu.', en: 'Once the element is visible, clear() + sendKeys() run — up to this line, LoginPage did not even know FluentWait existed.' } },
      { id: 5, icon: '🚨', label: { tr: 'Görünmezse: hata BasePage\'de fırlar', en: 'If never visible: error throws in BasePage' }, detail: { tr: 'Element hiç görünür olmazsa TimeoutException BasePage katmanında fırlar — LoginSteps ve LoginPage Selenium detaylarından İZOLE kalır, hatayı hangi katmanın fırlattığını net okursun.', en: 'If the element never becomes visible, TimeoutException throws inside the BasePage layer — the test and LoginPage stay ISOLATED from Selenium details, and you clearly read which layer threw it.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-selenium-arch-pom-chain-order',
    question: {
      tr: 'loginPage.loginAs() çağrısının katmanlar arası akışını doğru sıraya diz.',
      en: 'Arrange the cross-layer flow of the loginPage.loginAs() call in the correct order.',
    },
    items: [
      { id: '1', text: { tr: '@Test: loginPage.loginAs(user, pass) çağrılır', en: '@Test: loginPage.loginAs(user, pass) is called' }, order: 1 },
      { id: '2', text: { tr: 'LoginPage: kendi @FindBy alanıyla BasePage.type() çağırır', en: 'LoginPage: calls BasePage.type() with its own @FindBy field' }, order: 2 },
      { id: '3', text: { tr: 'BasePage: waitVisible() ile WaitFactory FluentWait\'ini kullanır', en: 'BasePage: uses WaitFactory\'s FluentWait via waitVisible()' }, order: 3 },
      { id: '4', text: { tr: 'PageFactory proxy: gerçek WebElement\'i DOM\'da arar', en: 'PageFactory proxy: searches the DOM for the real WebElement' }, order: 4 },
      { id: '5', text: { tr: 'WebElement: clear() + sendKeys() ile gerçek aksiyon çalışır', en: 'WebElement: the real action runs via clear() + sendKeys()' }, order: 5 },
    ],
    xpReward: 20,
  },
  {
    type: 'code-playground',
    relatedTopicId: 'selenium-framework-basepage',
    id: 'selenium-arch-basepage-waitclick-practice',
    label: {
      tr: 'Micro Lab: BasePage.click()\'i "önce bekle, sonra tıkla" yap',
      en: 'Micro Lab: make BasePage.click() "wait first, then click"',
    },
    language: 'java',
    task: {
      tr: 'Aşağıdaki BasePage.click() metodu doğrudan element.click() çağırıyor — element henüz görünür/aktif değilken tıklanırsa ElementNotInteractableException alırsın veya tıklama boşa gider. TODO satırını, LoginPage\'deki kalıba uyacak şekilde tamamla: önce waitVisible(element) ile görünürlüğü bekle, DÖNEN elemente .click() uygula. Böylece bu tek metot tüm sayfaların tıklamalarını "erken tıklama" hatasına karşı korur.',
      en: 'The BasePage.click() method below calls element.click() directly — clicking while the element is not yet visible/actionable gives you ElementNotInteractableException or a wasted click. Complete the TODO line to match the pattern: first wait for visibility with waitVisible(element), then apply .click() to the RETURNED element. This one method then protects every page\'s clicks against the "early click" bug.',
    },
    explanation: {
      tr: 'Bu pratik gerçek bir tarayıcı açmaz; amaç "bekle-sonra-tıkla" mantığını BasePage\'de tek yerde toplamanın, neden 50 sayfayı aynı anda koruduğunu elle yazarak pekiştirmektir.',
      en: 'This is not a real browser session; the goal is to reinforce, by writing it yourself, why centralizing "wait-then-click" in BasePage protects 50 pages at once.',
    },
    code: {
      tr: `public void click(WebElement element) {
    waitVisible(element).click();
}`,
      en: `public void click(WebElement element) {
    waitVisible(element).click();
}`,
    },
    starterCode: {
      tr: `public void click(WebElement element) {
    TODO   // once gorunur olmasini bekle, DONEN elemente tikla
}`,
      en: `public void click(WebElement element) {
    TODO   // wait for visibility first, click the RETURNED element
}`,
    },
    solutionCode: {
      tr: `public void click(WebElement element) {
    waitVisible(element).click();
}`,
      en: `public void click(WebElement element) {
    waitVisible(element).click();
}`,
    },
    expected: {
      tr: 'TODO satırı waitVisible(element).click() olmalı — waitVisible görünür WebElement\'i döndürür, ona zincirlenen .click() ise ancak element hazır olduğunda tıklar.',
      en: 'The TODO line must be waitVisible(element).click() — waitVisible returns the visible WebElement, and the chained .click() only clicks once the element is ready.',
    },
    hints: [
      { tr: 'waitVisible(element) bir WebElement döndürür (visibilityOf koşulu görünür elementi geri verir) — bu yüzden dönen değere doğrudan .click() zincirleyebilirsin.', en: 'waitVisible(element) returns a WebElement (the visibilityOf condition returns the visible element) — so you can chain .click() directly onto the returned value.' },
      { tr: 'Doğrudan element.click() (waitVisible olmadan) çağırmak, sayfa animasyonu veya geç yüklenen buton durumunda "erken tıklama" yapar; önce bekleme koşulundan geçirmek bunu engeller.', en: 'Calling element.click() directly (without waitVisible) does an "early click" when there is a page animation or a late-loading button; passing it through the wait condition first prevents this.' },
      { tr: 'Aynı kalıbı type() de kullanır: önce waitVisible, sonra clear()+sendKeys — bekleme mantığı BasePage\'de tek yerde durduğu için tüm PageObject\'ler tutarlı davranır.', en: 'type() uses the same pattern: waitVisible first, then clear()+sendKeys — since wait logic lives in one place in BasePage, all PageObjects behave consistently.' },
    ],
    xpReward: 15,
  },
  {
    type: 'quiz',
    question: {
      tr: 'PageFactory.initElements(driver, this) çağrıldığı ANDA @FindBy elementleri için ne olur?',
      en: 'The MOMENT PageFactory.initElements(driver, this) is called, what happens to the @FindBy elements?',
    },
    options: [
      { id: 'a', text: { tr: 'Hemen DOM\'da aranır ve WebElement referansları doldurulur', en: 'They are immediately searched in the DOM and WebElement references are filled' } },
      { id: 'b', text: { tr: 'Sadece lazy proxy kurulur; element DOM\'da ancak ilk kullanıldığında aranır', en: 'Only lazy proxies are set up; the element is searched in the DOM only on first use' } },
      { id: 'c', text: { tr: 'Tüm elementler kopyalanıp önbelleğe alınır ve bir daha değişmez', en: 'All elements are copied and cached, never changing again' } },
      { id: 'd', text: { tr: 'Driver kapatılır ve yeniden açılır', en: 'The driver is closed and reopened' } },
    ],
    correct: 'b',
    explanation: {
      tr: 'PageFactory.initElements() alanlara "bu locator ile ara" talimatı taşıyan lazy proxy\'ler enjekte eder — gerçek DOM araması ancak elemente ilk erişildiğinde (örn. waitVisible içinde) yapılır. Bu yüzden constructor\'da element henüz görünmese bile hata almazsın; hata ancak kullanım anında bekleme koşulu sağlanmazsa oluşur.',
      en: 'PageFactory.initElements() injects lazy proxies into the fields carrying the instruction "look with this locator" — the real DOM search happens only on first access to the element (e.g. inside waitVisible). That is why you get no error in the constructor even if the element is not visible yet; the error occurs only if the wait condition fails at use time.',
    },
    retryQuestion: {
      question: {
        tr: 'Bekleme mantığını BasePage\'de değil de her PageObject\'in kendi metodunda tekrar yazsaydın en olası problem ne olurdu?',
        en: 'If you rewrote the wait logic in each PageObject\'s own method instead of in BasePage, what would the most likely problem be?',
      },
      options: [
        { id: 'a', text: { tr: 'Bir sayfada bekleme koşulu yanlış seçilirse (örn. presenceOf) o sayfa görünmez elemente tıklar, diğerleri etkilenmez — tutarsız davranış', en: 'If a page picks the wrong wait condition (e.g. presenceOf), that page clicks an invisible element while others are unaffected — inconsistent behavior' } },
        { id: 'b', text: { tr: 'Hiçbir @FindBy çalışmaz', en: 'No @FindBy would work' } },
        { id: 'c', text: { tr: 'PageFactory devre dışı kalır', en: 'PageFactory would be disabled' } },
        { id: 'd', text: { tr: 'Testler paralel koşamaz', en: 'Tests could not run in parallel' } },
      ],
      correct: 'a',
      explanation: {
        tr: 'Bekleme mantığı her sayfada ayrı yazılırsa, biri visibilityOf, biri presenceOf, biri hiç beklemeden click yazar. Ortak BasePage olmadan "erken tıklama" hatası bazı sayfalarda çıkar bazılarında çıkmaz — teşhisi en zor flaky türlerinden biridir.',
        en: 'If wait logic is written separately per page, one uses visibilityOf, one presenceOf, one clicks with no wait at all. Without a shared BasePage, the "early click" bug appears on some pages and not others — one of the hardest flaky types to diagnose.',
      },
    },
  },

  // ── Adım 4 — SOLID Uygulaması (OCP odaklı) ──
  {
    type: 'heading',
    text: { tr: '⚖️ Adım 4 — SOLID Prensipleri Selenium Kodunda', en: '⚖️ Step 4 — SOLID Principles in Selenium Code' },
  },
  {
    type: 'simple-box',
    emoji: '🧩',
    content: {
      tr: 'SOLID beş prensip, bir mağazanın raf düzeni kurallarıdır: her raf tek tür ürün tutar (SRP), yeni ürün geldiğinde rafı SÖKMEZSİN yenisini eklersin (OCP), aynı boydaki her ürün aynı rafa sığar (LSP), kasiyer sadece kasa arayüzünü görür manav terazisini değil (ISP), ve raflar dükkânın betonuna değil taşınabilir ayaklara dayanır (DIP). İkinci benzetme: OCP, bir prizin üzerine yeni bir cihaz takmaya benzer — duvarı kırıp kablo çekmezsin, standart bir arayüze (soket) yeni bir fiş takarsın; kod da yeni davranışı MEVCUT dosyayı değiştirmeden, yeni bir sınıf ekleyerek kazanmalıdır. Peki testler zaten çalışıyorken, neden bu prensiplere uğraşıyoruz — "if/else ekle, geç" demek daha hızlı değil mi? Kısa vadede evet; ama her yeni bekleme türü için var olan bir metoda if/else eklemek, o metodu her değişiklikte yeniden test etmeni ve eski senaryoları kırma riskini getirir (regresyon). Java karşılaştırması: bu tam olarak `Comparator` arayüzüdür — `Collections.sort()`\'un içini değiştirmeden yeni sıralama kuralları eklersin; Selenium\'da da bekleme/tıklama stratejilerini aynı şekilde takılabilir hale getirebilirsin. QA bağlamı: OCP\'ye uyan bir wait katmanında "bu proje için JS-click stratejisi ekleyelim" kararı, mevcut 200 testin hiçbirine dokunmadan tek bir yeni sınıfla çözülür — dokunmadığın kod, kıramadığın koddur.',
      en: 'The five SOLID principles are a store\'s shelving rules: each shelf holds one product type (SRP), when a new product arrives you do not DISMANTLE the shelf, you add to it (OCP), every product of the same size fits the same shelf (LSP), the cashier sees only the register interface, not the produce scale (ISP), and shelves rest on movable feet, not the store\'s concrete (DIP). Second analogy: OCP is like plugging a new device into an outlet — you do not break the wall and run cable, you plug a new plug into a standard interface (the socket); code should likewise gain new behavior by ADDING a new class WITHOUT modifying the existing file. But if the tests already work, why bother with these principles — isn\'t "add an if/else and move on" faster? Short-term yes; but adding if/else to an existing method for every new wait type forces you to retest that method on every change and risks breaking old scenarios (regression). Java comparison: this is exactly the `Comparator` interface — you add new sort rules without changing the inside of `Collections.sort()`; in Selenium you can make wait/click strategies just as pluggable. QA context: in a wait layer that respects OCP, the decision to "add a JS-click strategy for this project" is solved with a single new class, without touching any of the existing 200 tests — the code you do not touch is the code you cannot break.',
    },
  },
  {
    type: 'text',
    content: {
      tr: 'Beş prensibin Selenium karşılığı: SRP — DriverManager sadece driver, WaitFactory sadece bekleme (Adım 2). OCP — yeni bir bekleme/tıklama stratejisi eklemek için mevcut kodu değiştirmeden yeni sınıf ekle (aşağıda). LSP — her BasePage alt sınıfı, BasePage beklenen her yerde sorunsuz kullanılabilir olmalı. ISP — bir sayfaya kullanmayacağı metotları içeren şişkin bir arayüz dayatma; küçük, amaca özel arayüzler tanımla. DIP — @Test yüksek seviyesi somut LoginPage\'e değil, bir soyutlamaya (arayüz) bağlı olmalı. Aşağıda OCP\'yi somut bir "Anti-Pattern vs SOLID" çiftiyle inceliyoruz.',
      en: 'The Selenium mapping of the five principles: SRP — DriverManager only driver, WaitFactory only waiting (Step 2). OCP — add a new wait/click strategy by adding a new class without modifying existing code (below). LSP — every BasePage subclass must be usable wherever a BasePage is expected. ISP — do not impose a bloated interface with methods a page will not use; define small, purpose-specific interfaces. DIP — the high-level @Test should depend on an abstraction (interface), not on the concrete LoginPage. Below we examine OCP through a concrete "Anti-Pattern vs SOLID" pair.',
    },
  },
  {
    type: 'comparison',
    left: {
      label: { tr: '❌ OCP İhlali (if/else şişmesi)', en: '❌ OCP Violation (if/else bloat)' },
      code: `// Her yeni tiklama turu bu metodu DEGISTIRIR
public void clickBy(WebElement el, String type) {
    if (type.equals("normal")) {
        waitVisible(el).click();
    } else if (type.equals("js")) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", el);
    }
    // yeni tur = yeni else-if = eski kodu yeniden test et
}`,
      note: { tr: 'Yeni davranış = mevcut metodu değiştir = regresyon riski.', en: 'New behavior = modify the existing method = regression risk.' },
    },
    right: {
      label: { tr: '✅ OCP Uygun (Strategy)', en: '✅ OCP-Compliant (Strategy)' },
      code: `// Yeni tur = mevcut kodu DEGISTIRMEDEN yeni sinif ekle
public interface ClickStrategy {
    void click(WebDriver driver, WebElement el);
}

public class JsClickStrategy implements ClickStrategy {
    public void click(WebDriver driver, WebElement el) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", el);
    }
}`,
      note: { tr: 'Yeni strateji = yeni dosya; eski kod hiç açılmaz.', en: 'New strategy = new file; existing code is never opened.' },
    },
  },
  {
    type: 'code',
    language: 'java',
    code: {
      tr: `package actions;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

// OCP: davranisi arayuz uzerinden takilabilir yap
public interface ClickStrategy {
    void click(WebDriver driver, WebElement element);
}

// Strateji 1 — normal Selenium tiklama
public class NativeClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        element.click();
    }
}

// Strateji 2 — JS ile tiklama (overlay/animasyon sorunlarinda)
public class JsClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", element);
    }
}`,
      en: `package actions;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

// OCP: make behavior pluggable through an interface
public interface ClickStrategy {
    void click(WebDriver driver, WebElement element);
}

// Strategy 1 — normal Selenium click
public class NativeClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        element.click();
    }
}

// Strategy 2 — JS click (for overlay/animation issues)
public class JsClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", element);
    }
}`,
    },
  },
  {
    type: 'step-animation',
    id: 'selenium-arch-ocp-strategy-steps',
    title: { tr: 'Adım Adım: OCP ile Yeni Strateji Nasıl Eklenir?', en: 'Step by Step: How a New Strategy Is Added with OCP' },
    steps: [
      { id: 1, icon: '📐', label: { tr: 'Arayüz sözleşmeyi sabitler', en: 'The interface fixes the contract' }, detail: { tr: 'ClickStrategy arayüzü tek bir metot tanımlar: click(driver, element). Bu sözleşme bir kez yazılır ve bir daha değişmez.', en: 'The ClickStrategy interface defines one method: click(driver, element). This contract is written once and never changes again.' } },
      { id: 2, icon: '🧱', label: { tr: 'Her davranış ayrı sınıf', en: 'Each behavior is its own class' }, detail: { tr: 'NativeClickStrategy ve JsClickStrategy, arayüzü ayrı ayrı uygular — biri diğerinin kodunu bilmez, birbirini kırmaz.', en: 'NativeClickStrategy and JsClickStrategy each implement the interface separately — neither knows the other\'s code, neither can break the other.' } },
      { id: 3, icon: '➕', label: { tr: 'Yeni ihtiyaç = yeni sınıf', en: 'New need = new class' }, detail: { tr: '"Shadow DOM elementine tıkla" ihtiyacı gelirse ShadowClickStrategy adında YENİ bir dosya açarsın; mevcut iki sınıfa DOKUNMAZSIN.', en: 'If a "click a Shadow DOM element" need arises, you open a NEW file named ShadowClickStrategy; you do NOT touch the existing two classes.' } },
      { id: 4, icon: '🔌', label: { tr: 'BasePage stratejiyi enjekte alır', en: 'BasePage receives the strategy injected' }, detail: { tr: 'BasePage hangi somut stratejiyi kullandığını bilmez, sadece ClickStrategy arayüzüne bağlıdır — istediğin stratejiyi dışarıdan verirsin (DIP ile birlikte çalışır).', en: 'BasePage does not know which concrete strategy it uses, it depends only on the ClickStrategy interface — you supply the desired strategy from outside (works together with DIP).' } },
      { id: 5, icon: '🛡️', label: { tr: 'Eski testler dokunulmadan geçer', en: 'Old tests pass untouched' }, detail: { tr: 'Yeni strateji eklenince mevcut 200 testin hiçbiri değişmediği için hiçbiri kırılamaz — OCP\'nin regresyon güvencesi tam olarak budur.', en: 'When the new strategy is added, none of the existing 200 tests changed, so none can break — this is exactly OCP\'s regression guarantee.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-selenium-arch-ocp-order',
    question: {
      tr: '"Overlay yüzünden normal click çalışmıyor, JS-click stratejisi ekleyelim" ihtiyacını OCP\'ye uygun şekilde çözme adımlarını sıraya diz.',
      en: 'Arrange the OCP-compliant steps for the need "normal click fails due to an overlay, let\'s add a JS-click strategy".',
    },
    items: [
      { id: '1', text: { tr: 'Mevcut ClickStrategy arayüzünü (sözleşmeyi) incele — değiştirme', en: 'Inspect the existing ClickStrategy interface (the contract) — do not change it' }, order: 1 },
      { id: '2', text: { tr: 'Yeni bir JsClickStrategy dosyası oluştur, arayüzü implement et', en: 'Create a new JsClickStrategy file, implement the interface' }, order: 2 },
      { id: '3', text: { tr: 'click() metodunu JavascriptExecutor ile doldur', en: 'Fill the click() method with JavascriptExecutor' }, order: 3 },
      { id: '4', text: { tr: 'İlgili PageObject\'e bu stratejiyi dışarıdan enjekte et', en: 'Inject this strategy into the relevant PageObject from outside' }, order: 4 },
      { id: '5', text: { tr: 'Mevcut testleri çalıştır — hiçbiri değişmediği için hepsi geçer', en: 'Run the existing tests — since none changed, they all pass' }, order: 5 },
    ],
    xpReward: 20,
  },
  {
    type: 'code-playground',
    relatedTopicId: 'selenium-framework-ocp',
    id: 'selenium-arch-ocp-waitstrategy-practice',
    label: {
      tr: 'Micro Lab: OCP\'ye uygun yeni bir ClickStrategy ekle',
      en: 'Micro Lab: add a new OCP-compliant ClickStrategy',
    },
    language: 'java',
    task: {
      tr: 'Overlay/animasyon yüzünden bazı butonlar normal click ile tıklanamıyor; JavaScript ile tıklaman gerekiyor. OCP kuralı gereği MEVCUT ClickStrategy arayüzünü veya NativeClickStrategy sınıfını DEĞİŞTİRMEDEN, yeni bir JsClickStrategy sınıfı yaz. TODO satırlarını tamamla: sınıf ClickStrategy\'yi implement etmeli ve click() içinde JavascriptExecutor ile arguments[0].click() çalıştırmalı.',
      en: 'Because of an overlay/animation, some buttons cannot be clicked normally; you need to click via JavaScript. Per OCP, WITHOUT modifying the existing ClickStrategy interface or NativeClickStrategy class, write a new JsClickStrategy class. Complete the TODO lines: the class must implement ClickStrategy and, inside click(), run arguments[0].click() via JavascriptExecutor.',
    },
    explanation: {
      tr: 'Bu pratik gerçek bir tarayıcı açmaz; amaç OCP\'nin "genişlet ama değiştirme" ilkesini elle uygulayarak, yeni davranışı mevcut sınıflara dokunmadan eklemenin regresyonu nasıl önlediğini pekiştirmektir.',
      en: 'This is not a real browser session; the goal is to apply OCP\'s "extend but do not modify" principle by hand, reinforcing how adding new behavior without touching existing classes prevents regression.',
    },
    code: {
      tr: `public class JsClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", element);
    }
}`,
      en: `public class JsClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", element);
    }
}`,
    },
    starterCode: {
      tr: `public class JsClickStrategy TODO {
    @Override
    public void click(WebDriver driver, WebElement element) {
        TODO   // JavascriptExecutor ile arguments[0].click() calistir
    }
}`,
      en: `public class JsClickStrategy TODO {
    @Override
    public void click(WebDriver driver, WebElement element) {
        TODO   // run arguments[0].click() via JavascriptExecutor
    }
}`,
    },
    solutionCode: {
      tr: `public class JsClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", element);
    }
}`,
      en: `public class JsClickStrategy implements ClickStrategy {
    @Override
    public void click(WebDriver driver, WebElement element) {
        ((JavascriptExecutor) driver)
            .executeScript("arguments[0].click();", element);
    }
}`,
    },
    expected: {
      tr: 'İlk TODO "implements ClickStrategy" olmalı; ikinci TODO ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element) olmalı — mevcut arayüz ve NativeClickStrategy\'ye hiç dokunmadan yeni davranış eklenir.',
      en: 'The first TODO must be "implements ClickStrategy"; the second TODO must be ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element) — new behavior is added without touching the existing interface or NativeClickStrategy.',
    },
    hints: [
      { tr: 'OCP\'nin özü: yeni sınıf, mevcut arayüzü (ClickStrategy) implement eder; böylece BasePage değişmeden yeni davranışı kullanabilir. Arayüzü veya eski sınıfı ASLA açma.', en: 'The essence of OCP: the new class implements the existing interface (ClickStrategy); this lets BasePage use the new behavior unchanged. NEVER open the interface or the old class.' },
      { tr: 'JavaScript ile tıklama için driver\'ı JavascriptExecutor\'a cast eder, executeScript("arguments[0].click();", element) çağırırsın — arguments[0], ikinci parametre olarak verdiğin element\'e karşılık gelir.', en: 'To click via JavaScript, you cast the driver to JavascriptExecutor and call executeScript("arguments[0].click();", element) — arguments[0] corresponds to the element you pass as the second parameter.' },
      { tr: 'JS-click, görünürlük/overlay engelini atlar ama gerçek kullanıcı etkileşimini taklit etmez; bu yüzden sadece normal click gerçekten mümkün olmadığında son çare olarak bir strateji olarak eklenir.', en: 'A JS-click bypasses the visibility/overlay barrier but does not mimic a real user interaction; that is why it is added as a strategy of last resort, only when a normal click is genuinely impossible.' },
    ],
    xpReward: 15,
  },
  {
    type: 'quiz',
    question: {
      tr: 'Bir Selenium framework\'ünde her yeni tıklama türü için var olan clickBy() metoduna if/else eklemek hangi SOLID prensibini ihlal eder?',
      en: 'In a Selenium framework, adding an if/else to an existing clickBy() method for every new click type violates which SOLID principle?',
    },
    options: [
      { id: 'a', text: { tr: 'Open/Closed Principle (OCP) — sınıf genişlemeye açık, değişikliğe kapalı olmalı', en: 'Open/Closed Principle (OCP) — a class should be open to extension, closed to modification' } },
      { id: 'b', text: { tr: 'Sadece Single Responsibility (SRP)', en: 'Only Single Responsibility (SRP)' } },
      { id: 'c', text: { tr: 'Hiçbirini — if/else her zaman iyi pratiktir', en: 'None — if/else is always good practice' } },
      { id: 'd', text: { tr: 'Liskov Substitution (LSP)', en: 'Liskov Substitution (LSP)' } },
    ],
    correct: 'a',
    explanation: {
      tr: 'Her yeni tür için mevcut metodu değiştirmek (yeni else-if) OCP ihlalidir: sınıf "değişikliğe kapalı" olmalıydı. Strategy pattern ile davranışı arayüz arkasına alırsan, yeni tür eklemek mevcut kodu değiştirmeyi değil, yeni bir sınıf eklemeyi gerektirir — eski testler dokunulmadan güvende kalır.',
      en: 'Modifying the existing method (a new else-if) for every new type violates OCP: the class should have been "closed to modification". With the Strategy pattern behind an interface, adding a new type requires adding a new class, not changing existing code — old tests stay safe, untouched.',
    },
    retryQuestion: {
      question: {
        tr: 'Bir @Test metodunun somut LoginPage yerine bir Page arayüzüne bağlı olması hangi prensibi uygular?',
        en: 'A @Test method depending on a Page interface instead of the concrete LoginPage applies which principle?',
      },
      options: [
        { id: 'a', text: { tr: 'Dependency Inversion (DIP) — yüksek seviye modül soyutlamaya bağlı olmalı', en: 'Dependency Inversion (DIP) — high-level modules should depend on abstractions' } },
        { id: 'b', text: { tr: 'Interface Segregation (ISP)', en: 'Interface Segregation (ISP)' } },
        { id: 'c', text: { tr: 'Hiçbiri', en: 'None' } },
        { id: 'd', text: { tr: 'Sadece OCP', en: 'Only OCP' } },
      ],
      correct: 'a',
      explanation: {
        tr: 'DIP, yüksek seviye kodun (test) düşük seviye somut sınıfa değil, bir soyutlamaya (arayüz) bağlı olmasını söyler. Test bir Page arayüzüne bağlıysa, farklı implementasyonlar (gerçek sayfa, mock sayfa) sorunsuz değiştirilebilir — bu, testlerin daha esnek ve izole olmasını sağlar.',
        en: 'DIP says high-level code (the test) should depend on an abstraction (interface), not a low-level concrete class. If the test depends on a Page interface, different implementations (a real page, a mock page) can be swapped freely — making tests more flexible and isolated.',
      },
    },
  },

  // ── Adım 5 — Test / Data Katmanı: BaseTest + @DataProvider ──
  {
    type: 'heading',
    text: { tr: '🔗 Adım 5 — Test / Data Katmanı: BaseTest & @DataProvider', en: '🔗 Step 5 — Test / Data Layer: BaseTest & @DataProvider' },
  },
  {
    type: 'simple-box',
    emoji: '🎛️',
    content: {
      tr: 'Test/Data katmanı, bir orkestranın şefidir: tek tek çalgıları (DriverManager, WaitFactory, PageObject\'ler) çalmaz ama HANGİSİNİN NE ZAMAN gireceğini yönetir — @BeforeMethod\'da driver açılır, @Test\'te sayfa akışı çalınır, @AfterMethod\'da driver kapanır. İkinci benzetme: @DataProvider bir fabrika bandıdır — aynı test metodunu (aynı montaj istasyonunu) farklı parçalarla (farklı kullanıcı adı/şifre satırlarıyla) tekrar tekrar besler; sen tek bir test yazarsın, band onu 5 farklı veriyle 5 kez koşturur. Peki her senaryo için ayrı bir @Test metodu yazabiliyorken, neden @DataProvider gerekiyor — kopyala-yapıştır daha basit değil mi? Değil, çünkü 5 kopyalanmış testte login akışı değişirse 5 yeri elle güncellersin ve biri unutulur; @DataProvider ile mantık TEK, veri ÇOK olur. Java karşılaştırması: bu, JUnit 5\'in @ParameterizedTest + @MethodSource yapısıyla birebir aynıdır — "test mantığını veriden AYIR" ilkesi. QA bağlamı: geçerli/geçersiz/boş/SQL-injection denemesi gibi 20 login senaryosunu tek bir data-driven testle kapsarsın; yeni bir sınır durumu çıkınca kod değil, sadece veri satırı eklersin — test bakımı dakikalar yerine saniyeler alır.',
      en: 'The Test/Data layer is an orchestra\'s conductor: it does not play the individual instruments (DriverManager, WaitFactory, PageObjects) but manages WHICH plays WHEN — @BeforeMethod opens the driver, @Test plays the page flow, @AfterMethod closes the driver. Second analogy: @DataProvider is a factory conveyor — it feeds the same test method (the same assembly station) over and over with different parts (different username/password rows); you write one test, the belt runs it 5 times with 5 different data sets. But if you can write a separate @Test method per scenario, why do you need @DataProvider — isn\'t copy-paste simpler? It is not, because if the login flow changes across 5 copied tests you update 5 places by hand and one gets missed; with @DataProvider the logic is ONE, the data is MANY. Java comparison: this is exactly JUnit 5\'s @ParameterizedTest + @MethodSource — the "separate test logic from data" principle. QA context: you cover 20 login scenarios like valid/invalid/empty/SQL-injection attempts with a single data-driven test; when a new edge case appears, you add a data row, not code — test maintenance takes seconds instead of minutes.',
    },
  },
  {
    type: 'text',
    content: {
      tr: 'Bu son katmanda tüm parçalar birleşir: BaseTest, @BeforeMethod hook\'unda DriverManager.createDriver() ile driver\'ı açar ve config\'ten base.url okuyup sayfaya gider; test metodu @DataProvider\'dan gelen her satır için LoginPage\'i (POM) kullanır; @AfterMethod driver\'ı kapatır. Böylece Adım 2 (Core), Adım 3 (POM), Adım 4 (SOLID) burada tek bir çalışan akışta buluşur.',
      en: 'In this final layer, all pieces come together: BaseTest opens the driver via DriverManager.createDriver() in the @BeforeMethod hook and navigates to base.url read from config; the test method uses LoginPage (POM) for each row from @DataProvider; @AfterMethod closes the driver. Thus Step 2 (Core), Step 3 (POM), and Step 4 (SOLID) meet here in one working flow.',
    },
  },
  {
    type: 'code',
    language: 'java',
    code: {
      tr: `// ─── tests/BaseTest.java — hook'lar: her test icin driver ac/kapat ───
package tests;

import core.DriverManager;
import org.testng.annotations.*;

public class BaseTest {

    @BeforeMethod
    public void setUp() {
        DriverManager.createDriver();   // her test icin taze driver
        DriverManager.getDriver().get(
            System.getProperty("base.url", "https://example.com/login"));
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();     // driver'i kapat + ThreadLocal temizle
    }
}

// ─── tests/LoginTest.java — @DataProvider ile data-driven (mantik TEK) ───
package tests;

import pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    // ayni testi besleyecek veri satirlari — mantik TEK, veri COK
    @DataProvider(name = "loginData")
    public Object[][] loginData() {
        return new Object[][] {
            { "admin",  "Passw0rd!", true  },   // gecerli
            { "admin",  "wrong",     false },   // yanlis sifre
            { "",       "",          false },   // bos alan
        };
    }

    @Test(dataProvider = "loginData")
    public void loginScenarios(String user, String pass, boolean shouldPass) {
        LoginPage login = new LoginPage(DriverManager.getDriver());
        login.loginAs(user, pass);
        // beklenen sonuca gore dogrula (ornek amacli basitlestirildi)
        Assert.assertEquals(login.isLoggedIn(), shouldPass);
    }
}`,
      en: `// ─── tests/BaseTest.java — hooks: open/close a driver per test ───
package tests;

import core.DriverManager;
import org.testng.annotations.*;

public class BaseTest {

    @BeforeMethod
    public void setUp() {
        DriverManager.createDriver();   // a fresh driver per test
        DriverManager.getDriver().get(
            System.getProperty("base.url", "https://example.com/login"));
    }

    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();     // close the driver + clear ThreadLocal
    }
}

// ─── tests/LoginTest.java — data-driven via @DataProvider (logic is ONE) ───
package tests;

import pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    // data rows that feed the same test — logic ONE, data MANY
    @DataProvider(name = "loginData")
    public Object[][] loginData() {
        return new Object[][] {
            { "admin",  "Passw0rd!", true  },   // valid
            { "admin",  "wrong",     false },   // wrong password
            { "",       "",          false },   // empty fields
        };
    }

    @Test(dataProvider = "loginData")
    public void loginScenarios(String user, String pass, boolean shouldPass) {
        LoginPage login = new LoginPage(DriverManager.getDriver());
        login.loginAs(user, pass);
        // verify against the expected result (simplified for the example)
        Assert.assertEquals(login.isLoggedIn(), shouldPass);
    }
}`,
    },
  },
  {
    type: 'step-animation',
    id: 'selenium-arch-dataprovider-steps',
    title: { tr: 'Adım Adım: @DataProvider Aynı Testi Nasıl 3 Kez Koşturur?', en: 'Step by Step: How @DataProvider Runs the Same Test 3 Times' },
    steps: [
      { id: 1, icon: '📋', label: { tr: 'DataProvider veri matrisini üretir', en: 'The DataProvider produces the data matrix' }, detail: { tr: 'loginData() metodu Object[][] döndürür: 3 satır, her satırda kullanıcı+şifre+beklenen sonuç. TestNG bu matrisi test başlamadan önce okur.', en: 'The loginData() method returns Object[][]: 3 rows, each with username+password+expected result. TestNG reads this matrix before the test starts.' } },
      { id: 2, icon: '🔁', label: { tr: 'Her satır için @BeforeMethod', en: '@BeforeMethod for each row' }, detail: { tr: 'TestNG her satır için loginScenarios\'u AYRI bir test örneği sayar — her birinden önce @BeforeMethod çalışır, taze bir driver açılır (izolasyon).', en: 'TestNG treats loginScenarios per row as a SEPARATE test instance — @BeforeMethod runs before each, opening a fresh driver (isolation).' } },
      { id: 3, icon: '🎯', label: { tr: 'Satır değerleri parametreye geçer', en: 'Row values pass into parameters' }, detail: { tr: '1. satır: user="admin", pass="Passw0rd!", shouldPass=true — bu üç değer metot parametrelerine sırayla enjekte edilir.', en: 'Row 1: user="admin", pass="Passw0rd!", shouldPass=true — these three values are injected into the method parameters in order.' } },
      { id: 4, icon: '🧪', label: { tr: 'POM + assertion çalışır', en: 'POM + assertion run' }, detail: { tr: 'LoginPage.loginAs() çağrılır (Adım 3 POM), sonuç Assert.assertEquals ile beklenen değerle karşılaştırılır — mantık her satırda AYNI.', en: 'LoginPage.loginAs() is called (Step 3 POM), and the result is compared to the expected value via Assert.assertEquals — the logic is the SAME every row.' } },
      { id: 5, icon: '📊', label: { tr: 'Rapor: 3 ayrı sonuç', en: 'Report: 3 separate results' }, detail: { tr: 'Test raporunda tek metot 3 satır olarak görünür — biri fail olursa hangi VERİ satırının patladığını net görürsün, kopyalanmış 3 testte bu netlik olmazdı.', en: 'In the report, the single method appears as 3 rows — if one fails, you clearly see which DATA row broke; with 3 copied tests you would not have that clarity.' } },
    ],
  },
  {
    type: 'challenge',
    variant: 'order-sort',
    id: 'ch-selenium-arch-dataprovider-order',
    question: {
      tr: '@DataProvider ile data-driven bir login testi kurmanın adımlarını doğru sıraya diz.',
      en: 'Arrange the steps of building a data-driven login test with @DataProvider in the correct order.',
    },
    items: [
      { id: '1', text: { tr: '@DataProvider(name="loginData") ile Object[][] veri matrisi tanımla', en: 'Define an Object[][] data matrix with @DataProvider(name="loginData")' }, order: 1 },
      { id: '2', text: { tr: '@Test(dataProvider="loginData") ile testi veri kaynağına bağla', en: 'Bind the test to the data source with @Test(dataProvider="loginData")' }, order: 2 },
      { id: '3', text: { tr: '@BeforeMethod: DriverManager.createDriver() ile taze driver aç', en: '@BeforeMethod: open a fresh driver with DriverManager.createDriver()' }, order: 3 },
      { id: '4', text: { tr: 'Test gövdesinde LoginPage (POM) ile loginAs(user, pass) çağır', en: 'In the test body, call loginAs(user, pass) via LoginPage (POM)' }, order: 4 },
      { id: '5', text: { tr: '@AfterMethod: DriverManager.quitDriver() ile driver\'ı kapat', en: '@AfterMethod: close the driver with DriverManager.quitDriver()' }, order: 5 },
    ],
    xpReward: 20,
  },
  {
    type: 'code-playground',
    relatedTopicId: 'selenium-framework-dataprovider',
    id: 'selenium-arch-dataprovider-practice',
    label: {
      tr: 'Micro Lab: @DataProvider ile testi veri kaynağına bağla',
      en: 'Micro Lab: bind the test to a data source with @DataProvider',
    },
    language: 'java',
    task: {
      tr: 'loginData() metodu 3 satırlık veri matrisini hazır döndürüyor ama loginScenarios testi bu veriye BAĞLI DEĞİL — şu an parametreleri nereden alacağını bilmiyor. TODO satırını tamamla: @Test annotation\'ına dataProvider = "loginData" ekleyerek testi veri kaynağına bağla. Bağlandıktan sonra TestNG aynı testi 3 satır için 3 kez koşturur.',
      en: 'The loginData() method already returns a 3-row data matrix, but the loginScenarios test is NOT BOUND to it — right now it does not know where its parameters come from. Complete the TODO line: bind the test to the data source by adding dataProvider = "loginData" to the @Test annotation. Once bound, TestNG runs the same test 3 times for the 3 rows.',
    },
    explanation: {
      tr: 'Bu pratik gerçek bir tarayıcı açmaz; amaç data-driven testin can damarını (dataProvider bağı) elle kurarak, tek metodun nasıl çok senaryoya dönüştüğünü pekiştirmektir.',
      en: 'This is not a real browser session; the goal is to wire the artery of a data-driven test (the dataProvider binding) by hand, reinforcing how one method becomes many scenarios.',
    },
    code: {
      tr: `@Test(dataProvider = "loginData")
public void loginScenarios(String user, String pass, boolean shouldPass) {
    LoginPage login = new LoginPage(DriverManager.getDriver());
    login.loginAs(user, pass);
    Assert.assertEquals(login.isLoggedIn(), shouldPass);
}`,
      en: `@Test(dataProvider = "loginData")
public void loginScenarios(String user, String pass, boolean shouldPass) {
    LoginPage login = new LoginPage(DriverManager.getDriver());
    login.loginAs(user, pass);
    Assert.assertEquals(login.isLoggedIn(), shouldPass);
}`,
    },
    starterCode: {
      tr: `@Test(TODO)   // testi loginData veri kaynagina bagla
public void loginScenarios(String user, String pass, boolean shouldPass) {
    LoginPage login = new LoginPage(DriverManager.getDriver());
    login.loginAs(user, pass);
    Assert.assertEquals(login.isLoggedIn(), shouldPass);
}`,
      en: `@Test(TODO)   // bind the test to the loginData source
public void loginScenarios(String user, String pass, boolean shouldPass) {
    LoginPage login = new LoginPage(DriverManager.getDriver());
    login.loginAs(user, pass);
    Assert.assertEquals(login.isLoggedIn(), shouldPass);
}`,
    },
    solutionCode: {
      tr: `@Test(dataProvider = "loginData")
public void loginScenarios(String user, String pass, boolean shouldPass) {
    LoginPage login = new LoginPage(DriverManager.getDriver());
    login.loginAs(user, pass);
    Assert.assertEquals(login.isLoggedIn(), shouldPass);
}`,
      en: `@Test(dataProvider = "loginData")
public void loginScenarios(String user, String pass, boolean shouldPass) {
    LoginPage login = new LoginPage(DriverManager.getDriver());
    login.loginAs(user, pass);
    Assert.assertEquals(login.isLoggedIn(), shouldPass);
}`,
    },
    expected: {
      tr: 'TODO, dataProvider = "loginData" olmalı — bu isim @DataProvider(name="loginData") ile birebir eşleşmeli; eşleşmezse TestNG veri kaynağını bulamaz ve test hiç koşmaz.',
      en: 'The TODO must be dataProvider = "loginData" — this name must match @DataProvider(name="loginData") exactly; if it does not match, TestNG cannot find the data source and the test never runs.',
    },
    hints: [
      { tr: '@Test annotation\'ının dataProvider attribute\'u, kullanılacak @DataProvider metodunun name değerine (String) işaret eder — iki isim birebir aynı olmalı.', en: 'The @Test annotation\'s dataProvider attribute points to the name (String) of the @DataProvider method to use — the two names must match exactly.' },
      { tr: 'Veri matrisindeki her satırın uzunluğu (3 kolon) test metodunun parametre sayısıyla (user, pass, shouldPass) eşleşmeli; eşleşmezse TestNG parametre enjeksiyon hatası verir.', en: 'Each row length in the data matrix (3 columns) must match the test method\'s parameter count (user, pass, shouldPass); if not, TestNG throws a parameter-injection error.' },
      { tr: 'DataProvider farklı bir sınıfta ise @Test(dataProvider="x", dataProviderClass=OtherClass.class) yazman gerekir; aynı sınıftaysa sadece isim yeter.', en: 'If the DataProvider is in a different class, you must write @Test(dataProvider="x", dataProviderClass=OtherClass.class); if it is in the same class, the name alone is enough.' },
    ],
    xpReward: 15,
  },
  {
    type: 'quiz',
    question: {
      tr: 'Production senaryosu: 20 farklı login sınır durumunu (geçerli, boş, yanlış şifre, SQL-injection denemesi...) test etmen gerekiyor. En sürdürülebilir yaklaşım hangisidir?',
      en: 'Production scenario: you must test 20 different login edge cases (valid, empty, wrong password, SQL-injection attempt...). Which is the most maintainable approach?',
    },
    options: [
      { id: 'a', text: { tr: '20 ayrı @Test metodu kopyala-yapıştır ile yaz', en: 'Copy-paste 20 separate @Test methods' } },
      { id: 'b', text: { tr: 'Tek bir @Test + @DataProvider ile 20 satırlık veri matrisi kullan', en: 'Use a single @Test + @DataProvider with a 20-row data matrix' } },
      { id: 'c', text: { tr: 'Tek metotta 20 senaryoyu tek tek if/else ile kontrol et', en: 'Check all 20 scenarios one by one with if/else in a single method' } },
      { id: 'd', text: { tr: 'Her senaryo için ayrı bir test sınıfı oluştur', en: 'Create a separate test class for each scenario' } },
    ],
    correct: 'b',
    explanation: {
      tr: 'Data-driven yaklaşım (tek @Test + @DataProvider) mantığı bir kez yazar, veriyi 20 satır olarak besler. Login akışı değişirse tek metodu güncellersin; yeni sınır durumu çıkınca kod değil sadece veri satırı eklersin. Kopyala-yapıştır (a) 20 yeri elle günceller, if/else (c) tek metodu şişirir ve OCP\'yi ihlal eder, ayrı sınıflar (d) gereksiz karmaşa yaratır.',
      en: 'The data-driven approach (single @Test + @DataProvider) writes the logic once and feeds the data as 20 rows. If the login flow changes you update one method; when a new edge case appears you add a data row, not code. Copy-paste (a) updates 20 places by hand, if/else (c) bloats one method and violates OCP, and separate classes (d) create needless clutter.',
    },
    retryQuestion: {
      question: {
        tr: 'BaseTest\'te @BeforeMethod yerine @BeforeClass kullanıp driver\'ı tüm sınıf için bir kez açsaydın, data-driven testte en olası problem ne olurdu?',
        en: 'If in BaseTest you used @BeforeClass instead of @BeforeMethod and opened the driver once for the whole class, what would the most likely problem be in a data-driven test?',
      },
      options: [
        { id: 'a', text: { tr: 'Bir satırın bıraktığı oturum/cookie durumu sonraki satıra sızar, testler birbirini etkiler', en: 'The session/cookie state one row leaves behind leaks into the next row, and tests affect each other' } },
        { id: 'b', text: { tr: 'Driver hiç açılmaz', en: 'The driver would never open' } },
        { id: 'c', text: { tr: '@DataProvider çalışmaz', en: '@DataProvider would not work' } },
        { id: 'd', text: { tr: 'Hiçbir fark olmaz', en: 'There would be no difference' } },
      ],
      correct: 'a',
      explanation: {
        tr: '@BeforeClass driver\'ı sınıf başına bir kez açar; tüm veri satırları AYNI tarayıcı oturumunu paylaşır. Bir "başarılı login" satırı oturum bırakırsa, sonraki "boş alan" satırı zaten login olmuş bir sayfada başlar ve yanlış sonuç verir. @BeforeMethod her satıra taze bir driver vererek bu sızıntıyı önler (izolasyon).',
        en: '@BeforeClass opens the driver once per class; all data rows share the SAME browser session. If a "successful login" row leaves a session, the next "empty fields" row starts on an already-logged-in page and yields a wrong result. @BeforeMethod gives each row a fresh driver, preventing this leak (isolation).',
      },
    },
  },
]

// Bilingual bloklar tek dizide; her iki ağaç AYNI referansı paylaşır.
const sFwArch = {
  tr: { title: '🏗️ Framework Mimarisi (SOLID + POM)', blocks: seleniumArchBlocks },
  en: { title: '🏗️ Framework Architecture (SOLID + POM)', blocks: seleniumArchBlocks },
}

// ─── EXPORT — TopicPage formatı: { tr: { hero, tabs, sections }, en: {...} } ──
export const seleniumData = {
  tr: {
    hero: {
      title: '🟢 Selenium WebDriver',
      subtitle: 'Java · Python · TypeScript — Tam Öğrenme Kılavuzu',
      intro: 'Selenium\'u sıfırdan öğren: kurulum, locators, aksiyonlar, wait stratejileri, frameler, CDP & BiDi, sanal doğrulayıcılar, Selenium IDE, Grid 4, yaygın hatalar ve 50 mülakat sorusu.',
    },
    tabs: [
      '🌐 Giriş',
      '⚙️ Kurulum',
      '🎯 Locators',
      '⚡ Aksiyonlar',
      '⏳ Wait',
      '🪟 Frames & Alert',
      '🏗️ Framework Mimarisi',
      '🛠️ Gerçek Hayat',
      '🔗 Ekosistem',
      '🌐 CDP & BiDi',
      '🔐 Sanal Auth & PDF',
      '🖥️ Selenium IDE',
      '🌐 Grid 4 & Dağıtık',
      '🚨 Yaygın Hatalar',
      '💼 Mülakat Soruları',
    ],
    sections: [s0.tr, s1.tr, s2.tr, s3.tr, s4.tr, s5.tr, sFwArch.tr, s6.tr, s7.tr, s8.tr, s9.tr, s10.tr, s11.tr, s12.tr, s13.tr],
  },
  en: {
    hero: {
      title: '🟢 Selenium WebDriver',
      subtitle: 'Java · Python · TypeScript — Complete Learning Guide',
      intro: 'Learn Selenium from scratch: installation, locators, actions, wait strategies, frames, CDP & BiDi, virtual authenticators, Selenium IDE, Grid 4, common errors, and 50 interview questions.',
    },
    tabs: [
      '🌐 Introduction',
      '⚙️ Installation',
      '🎯 Locators',
      '⚡ Actions',
      '⏳ Wait Strategies',
      '🪟 Frames & Alerts',
      '🏗️ Framework Architecture',
      '🛠️ Real World',
      '🔗 Ecosystem',
      '🌐 CDP & BiDi',
      '🔐 Virtual Auth & PDF',
      '🖥️ Selenium IDE',
      '🌐 Grid 4 & Distributed',
      '🚨 Common Errors',
      '💼 Interview Questions',
    ],
    sections: [s0.en, s1.en, s2.en, s3.en, s4.en, s5.en, sFwArch.en, s6.en, s7.en, s8.en, s9.en, s10.en, s11.en, s12.en, s13.en],
  },
}

fillMissingCodeTrios(seleniumData, 'selenium')



