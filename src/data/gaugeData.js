// ─── Gauge + Java: Markdown Spec Tabanlı Test Otomasyonu ─────────────────────
// Tüm metin alanları { tr, en } — tx() helper doğru dili seçer.
// Kod blokları bilingual: TR varyantında yorumlar Türkçe, EN varyantında İngilizce.
import { fillMissingCodeTrios, fillMissingFeynman } from './interactiveTrioFillers.js'

// ─── gauge run film bloğu (video-scene — gaugeData tek ağaç, TEK yere eklenir) ─
// Veri şeması: Documents/video-rollout-plan.md §2.6 / src/components/VideoSceneBlock.jsx
const gaugeRunChainFilm = {
  type: 'video-scene',
  id: 'gauge-run-chain-film',
  title: {
    tr: '🎬 gauge run: Bir Spec\'in Koşum Zinciri',
    en: '🎬 gauge run: The Journey of a Spec',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'spec',     emoji: '📄', label: { tr: 'giris-akisi.spec',    en: 'login-flow.spec' },      color: '#0ea5e9' },
    { id: 'parser',   emoji: '🔎', label: { tr: 'Parser',              en: 'Parser' },                color: '#f59e0b' },
    { id: 'registry', emoji: '🗂️', label: { tr: 'Step Registry',       en: 'Step Registry' },         color: '#8b5cf6' },
    { id: 'method',   emoji: '☕', label: { tr: '@Step Java Metodu',    en: '@Step Java Method' },     color: '#6366f1' },
    { id: 'browser',  emoji: '🌐', label: { tr: 'WebDriver / Browser', en: 'WebDriver / Browser' },   color: '#22c55e' },
    { id: 'report',   emoji: '📊', label: { tr: 'HTML Rapor',          en: 'HTML Report' },           color: '#10b981' },
    { id: 'ghost',    emoji: '👻', label: { tr: 'Unimplemented Step',  en: 'Unimplemented Step' },    color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: '`gauge run specs` tek komut ama arkasında bir Markdown cümlesinin gerçek bir tarayıcı tıklamasına dönüştüğü tam bir zincir var. Bu filmde o zinciri adım adım izleyeceksin — ve sonunda eşleşmeyen bir cümleye ne olduğunu göreceksin.',
        en: '`gauge run specs` is one command, but behind it lies a full chain that turns a Markdown sentence into a real browser click. In this film you will watch that chain step by step — and at the end, see what happens to a sentence with no match.',
      },
      code: { tr: `gauge run specs`, en: `gauge run specs` },
      positions: {
        spec: { x: 50, y: 50, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 1 — Parser spec\'i okur: `.spec` dosyasındaki `*` ile başlayan her satır bir STEP CÜMLESİ olarak çıkarılır. Bu aşamada henüz hiçbir Java kodu çalışmadı — sadece metin ayrıştırıldı.',
        en: 'Step 1 — Parser reads the spec: every line starting with `*` in the `.spec` file is extracted as a STEP SENTENCE. At this point no Java code has run yet — only text has been parsed.',
      },
      code: { tr: `* Kullanici login sayfasini acar`, en: `* User opens the login page` },
      positions: {
        spec: { x: 16, y: 50, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 2 — Step Registry\'de arama: her step cümlesi, projede taranmış TÜM @Step annotation metinleriyle KARAKTER KARAKTER karşılaştırılır. Bu, Cucumber\'ın regex tabanlı eşleştirmesinden farklıdır — burada birebir metin eşleşmesi aranır.',
        en: 'Step 2 — Step Registry lookup: each step sentence is compared CHARACTER BY CHARACTER against every scanned @Step annotation text in the project. This differs from Cucumber\'s regex-based matching — here an exact text match is required.',
      },
      code: { tr: `registry.find("Kullanici login sayfasini acar")`, en: `registry.find("User opens the login page")` },
      positions: {
        spec: { x: 14, y: 50, opacity: 0.5, scale: 0.85 },
        parser: { x: 36, y: 50, scale: 1.1 },
        registry: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'spec', to: 'parser' }, { from: 'parser', to: 'registry', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Eşleşme bulundu: registry, bu metne karşılık gelen TEK bir @Step("...") metodunu bulur — `openLoginPage()`. Metod adı önemsizdir, sadece annotation metni bağlayıcıdır.',
        en: 'Step 3 — Match found: the registry finds the ONE @Step("...") method that corresponds to this text — `openLoginPage()`. The method name is irrelevant; only the annotation text is the binding.',
      },
      code: { tr: `@Step("Kullanici login sayfasini acar")\npublic void openLoginPage() { ... }`, en: `@Step("User opens the login page")\npublic void openLoginPage() { ... }` },
      positions: {
        registry: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        method: { x: 48, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'registry', to: 'method' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Java metodu çalışır: `driver.get(...)` çağrısı gerçek bir WebDriver komutuna dönüşür ve tarayıcıda GERÇEK bir sayfa açılır. Markdown cümlesi artık somut bir tarayıcı aksiyonu oldu.',
        en: 'Step 4 — The Java method runs: the `driver.get(...)` call becomes a real WebDriver command and a REAL page opens in the browser. The Markdown sentence has become a concrete browser action.',
      },
      code: { tr: `driver.get("https://demo.learnqa.dev/login")`, en: `driver.get("https://demo.learnqa.dev/login")` },
      positions: {
        method: { x: 20, y: 50, opacity: 0.5, scale: 0.85 },
        browser: { x: 50, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'method', to: 'browser', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 5 — Sonuç HTML rapora yazılır: step yeşil veya kırmızı olarak işaretlenir; assertion fail olursa (`verifyDashboard()` gibi) step kırmızı olur ve rapor bunu net şekilde gösterir.',
        en: 'Step 5 — The result is written to the HTML report: the step is marked green or red; if an assertion fails (like `verifyDashboard()`), the step turns red and the report shows it clearly.',
      },
      code: { tr: `reports/html-report/index.html`, en: `reports/html-report/index.html` },
      positions: {
        browser: { x: 22, y: 50, opacity: 0.5, scale: 0.85 },
        report: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'browser', to: 'report', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Final (kontrast) — spec\'te bir kelime değişirse: "Kullanici login sayfasini acar" → "Kullanıcı login sayfasını acar" yazılsaydı, registry\'de KARAKTER KARAKTER eşleşen annotation bulunamaz ve step hayalete gider — "Step implementation not found" hatasıyla kırılır. Bu katılık, spec yazarı ile step yazarı arasındaki SÖZLEŞMEDİR: yanlış PASS yerine net bir hata.',
        en: 'Final (the contrast) — if a word in the spec changes: had it read "User opens the login page." with a period, the registry would find no CHARACTER-BY-CHARACTER match and the step goes to the ghost — it breaks with "Step implementation not found". This rigidity is the CONTRACT between the spec writer and the step writer: a clear error instead of a false PASS.',
      },
      positions: {
        spec: { x: 14, y: 30, scale: 0.9 },
        registry: { x: 44, y: 50, scale: 1.05 },
        ghost: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'spec', to: 'registry' }, { from: 'registry', to: 'ghost', color: '#ef4444' }],
    },
  ],
}

const sections = [

  // ── 0: Neden Gauge? ─────────────────────────────────────────────────────────
  {
    title: { tr: '🏠 Neden Gauge?', en: '🏠 Why Gauge?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '📏',
        content: {
          tr: 'Gauge, bir restoranın "sipariş fişi" sistemi gibi çalışır: garson (test yazan kişi) siparişi müşterinin diliyle yazar — "1 ızgara köfte, az pişmiş" — ve mutfak (Java step implementation) bu fişi okuyup teknik işi yapar. Fişte tavanın markası, ocağın derecesi yazmaz; mutfağın iç detayı fişe sızmaz. Gauge\'de de senaryo Markdown ile insan dilinde yazılır (`* Kullanıcı "admin" ile giriş yapar`), Selenium/WebDriver detayı Java tarafında kalır. Peki zaten Cucumber varken ve TestNG ile doğrudan Java testi yazabiliyorken neden ayrıca Gauge\'e ihtiyaç var? Cucumber\'da Gherkin\'in katı Given/When/Then kalıbına mecbursun ve spec dosyaları özel bir sözdizimidir; Gauge\'de spec dosyası DÜZ MARKDOWN\'dır — GitHub\'da render olur, ürün yöneticisi PR\'da diff\'ini okuyabilir, hatta düzenleyebilir. Java tarafında karşılık şudur: TestNG testi @Test metodudur ve sadece geliştirici okur; Gauge spec\'i ise yaşayan dokümandır (living documentation) — test VE dokümantasyon aynı dosyadır. QA bağlamında gerçek risk şu: manuel test senaryoları Excel\'de, otomasyon kodu Git\'te ayrı yaşarsa iki kaynak sessizce birbirinden kopar — Excel "3 adım" der, kod 5 adım koşar ve kimse hangisinin doğru olduğunu bilmez. Gauge tek kaynağı zorunlu kılar: senaryo değişirse spec değişir, spec değişirse implementasyon derlenmez/step bulunamaz ve koşum kırılır — kopukluk sessiz kalamaz.',
          en: 'Gauge works like a restaurant\'s "order ticket" system: the waiter (test author) writes the order in the customer\'s language — "1 grilled meatball, medium rare" — and the kitchen (Java step implementation) reads that ticket and does the technical work. The ticket never mentions the pan brand or stove temperature; kitchen internals don\'t leak into the ticket. In Gauge, scenarios are written in plain human language using Markdown (`* User signs in as "admin"`), while Selenium/WebDriver details stay on the Java side. But why do we need Gauge when Cucumber exists and we can write plain Java tests with TestNG? In Cucumber you are locked into Gherkin\'s rigid Given/When/Then grammar and the feature file is a special syntax; in Gauge the spec file is PLAIN MARKDOWN — it renders on GitHub, a product manager can read its diff in a PR, even edit it. The Java analogy: a TestNG test is a @Test method only developers read; a Gauge spec is living documentation — the test AND the documentation are the same file. The real QA risk: when manual scenarios live in Excel and automation code lives in Git, the two silently drift apart — Excel says "3 steps", the code runs 5, and nobody knows which is right. Gauge forces a single source: if the scenario changes, the spec changes; if the spec changes, the implementation no longer matches and the run breaks — the drift can never stay silent.',
        },
      },
      {
        type: 'heading',
        text: {
          tr: '🎬 Gerçek Senaryo: Excel Senaryoları ile Otomasyon Kodunun Kopması',
          en: '🎬 Real Scenario: Excel Scenarios Drifting Away from Automation Code',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Bir bankacılık projesinde çalışıyorsun. Manuel test ekibi 400 senaryoyu Excel\'de tutuyor, otomasyon ekibi aynı senaryoları TestNG ile Java\'da yazmış. Sprint 14\'te ürün yöneticisi login akışına OTP adımı ekletti: Excel güncellendi, ama otomasyon kodundaki 12 login testinin sadece 7\'si güncellendi. Regression yeşil göründü çünkü eski 5 test hâlâ eski akışı test ediyordu — production\'da OTP ekranı bir müşteri segmentinde hiç açılmadı. Gauge bu senaryoyu yapısal olarak engeller: senaryo METNİ testin kendisidir. OTP adımı spec\'e eklendiğinde, karşılığı olmayan step koşumda "Step implementation not found" ile kırılır — güncellenmemiş test "yeşil görünme" şansı bulamaz.',
          en: 'You are on a banking project. The manual QA team keeps 400 scenarios in Excel while the automation team wrote the same scenarios in Java with TestNG. In sprint 14 the product manager added an OTP step to the login flow: Excel was updated, but only 7 of the 12 login tests in the automation code were. Regression looked green because the remaining 5 tests still tested the old flow — in production the OTP screen never appeared for one customer segment. Gauge structurally prevents this: the scenario TEXT is the test itself. When the OTP step is added to the spec, any step without an implementation fails the run with "Step implementation not found" — an outdated test never gets the chance to "look green".',
        },
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '📄',
            label: { tr: 'Düz Markdown Spec', en: 'Plain Markdown Specs' },
            desc: {
              tr: 'Senaryolar .spec uzantılı düz Markdown dosyalarıdır. GitHub\'da render olur, PR diff\'inde okunur, teknik olmayan ekip üyesi bile katkı verebilir.',
              en: 'Scenarios are plain Markdown files with a .spec extension. They render on GitHub, read cleanly in PR diffs, and even non-technical teammates can contribute.',
            },
          },
          {
            icon: '☕',
            label: { tr: 'Java Step Implementation', en: 'Java Step Implementations' },
            desc: {
              tr: '@Step annotation\'ı ile spec satırı Java metoduna bağlanır. Selenium, REST Assured, JDBC — Java ekosisteminin tamamı elinin altında.',
              en: 'The @Step annotation binds a spec line to a Java method. Selenium, REST Assured, JDBC — the entire Java ecosystem is at your fingertips.',
            },
          },
          {
            icon: '🧩',
            label: { tr: 'Concept ile Yeniden Kullanım', en: 'Reuse with Concepts' },
            desc: {
              tr: 'Tekrarlanan adım grupları .cpt dosyasında tek bir "concept" olur. Java\'daki metot çıkarma (extract method) refactoring\'inin spec karşılığıdır.',
              en: 'Repeated step groups become a single "concept" in a .cpt file. It is the spec-level equivalent of Java\'s extract-method refactoring.',
            },
          },
          {
            icon: '⚡',
            label: { tr: 'Yerleşik Paralel Koşum', en: 'Built-in Parallel Execution' },
            desc: {
              tr: 'gauge run --parallel ile spec\'ler süreç bazında paralel koşar. TestNG\'de XML\'le uğraştığın işi tek flag yapar.',
              en: 'With gauge run --parallel, specs run in parallel processes. One flag does what TestNG makes you configure in XML.',
            },
          },
          {
            icon: '📊',
            label: { tr: 'Zengin HTML Rapor', en: 'Rich HTML Reports' },
            desc: {
              tr: 'html-report plugin\'i her koşumda adım adım, ekran görüntülü rapor üretir. Fail eden adımın spec cümlesi raporda aynen görünür.',
              en: 'The html-report plugin produces a step-by-step report with screenshots on every run. The failing step\'s spec sentence appears verbatim in the report.',
            },
          },
          {
            icon: '🔌',
            label: { tr: 'Plugin Mimarisi', en: 'Plugin Architecture' },
            desc: {
              tr: 'Dil (java, js, python), rapor (html, xml, spectacle) ve IDE (IntelliJ, VS Code) desteği plugin olarak kurulur: gauge install java.',
              en: 'Language (java, js, python), report (html, xml, spectacle), and IDE (IntelliJ, VS Code) support install as plugins: gauge install java.',
            },
          },
        ],
      },
      {
        type: 'heading',
        text: {
          tr: '🆚 Gauge vs Cucumber vs TestNG: Doğru Aracı Seçmek',
          en: '🆚 Gauge vs Cucumber vs TestNG: Choosing the Right Tool',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Üçü de "test koşturur" ama farklı katmanlarda yaşarlar. TestNG bir test RUNNER\'ıdır — Java metodu yazarsın, o koşturur. Cucumber ve Gauge ise SPEC katmanı ekler: senaryo insan dilinde yazılır, kod ona bağlanır. Gauge ile Cucumber arasındaki kritik fark sözdizimi felsefesidir: Cucumber Gherkin\'in Given/When/Then gramerini zorunlu kılar; Gauge herhangi bir Markdown cümlesini step yapar. Akıl yürütme sorusu: senin projende spec\'leri KİM okuyacak? Sadece otomasyon ekibi okuyacaksa spec katmanı ek maliyettir, TestNG yeter; ürün/analiz ekibi de okuyacaksa Gauge\'ün düz Markdown\'ı Gherkin öğrenme maliyetini sıfırlar.',
          en: 'All three "run tests" but live at different layers. TestNG is a test RUNNER — you write a Java method, it executes it. Cucumber and Gauge add a SPEC layer: the scenario is written in human language and code binds to it. The critical difference between Gauge and Cucumber is syntax philosophy: Cucumber mandates Gherkin\'s Given/When/Then grammar; Gauge turns any Markdown sentence into a step. Reasoning question: WHO will read the specs on your project? If only the automation team reads them, the spec layer is overhead — TestNG is enough; if product/analysis people read them too, Gauge\'s plain Markdown eliminates the Gherkin learning cost.',
        },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Kriter', en: 'Criterion' },
          'Gauge',
          'Cucumber',
          'TestNG',
        ],
        rows: [
          [
            { tr: 'Senaryo formatı', en: 'Scenario format' },
            { tr: 'Düz Markdown (.spec)', en: 'Plain Markdown (.spec)' },
            { tr: 'Gherkin (.feature) — özel sözdizimi', en: 'Gherkin (.feature) — special syntax' },
            { tr: 'Yok — doğrudan Java kodu', en: 'None — direct Java code' },
          ],
          [
            { tr: 'Adım kalıbı', en: 'Step grammar' },
            { tr: 'Serbest cümle: * ile başlayan her satır', en: 'Free sentence: any line starting with *' },
            'Given / When / Then / And',
            '@Test + method',
          ],
          [
            { tr: 'Teknik olmayan okuyucu', en: 'Non-technical readers' },
            { tr: 'GitHub\'da render olur, diff okunur', en: 'Renders on GitHub, readable diffs' },
            { tr: 'Okunur ama Gherkin öğrenmek gerekir', en: 'Readable but requires learning Gherkin' },
            { tr: 'Sadece geliştirici okur', en: 'Developers only' },
          ],
          [
            { tr: 'Paralel koşum', en: 'Parallel execution' },
            { tr: 'Yerleşik: --parallel flag', en: 'Built-in: --parallel flag' },
            { tr: 'Runner\'a bağlı (JUnit/TestNG config)', en: 'Depends on runner (JUnit/TestNG config)' },
            { tr: 'XML suite konfigürasyonu ile', en: 'Via XML suite configuration' },
          ],
          [
            { tr: 'Veri tablosu', en: 'Data tables' },
            { tr: 'Markdown tablosu — spec içinde', en: 'Markdown tables — inside the spec' },
            { tr: 'Examples / DataTable', en: 'Examples / DataTable' },
            '@DataProvider',
          ],
          [
            { tr: 'En güçlü olduğu yer', en: 'Strongest fit' },
            { tr: 'Yaşayan doküman + E2E kabul testleri', en: 'Living documentation + E2E acceptance tests' },
            { tr: 'BDD kültürü oturmuş ekipler', en: 'Teams with established BDD culture' },
            { tr: 'Birim/entegrasyon + hızlı teknik testler', en: 'Unit/integration + fast technical tests' },
          ],
        ],
      },
      {
        type: 'callout',
        color: 'purple',
        emoji: '🧱',
        title: { tr: 'LEGO ile Düşün: Spec + Implementation = İki Katmanlı Yapı', en: 'Think in LEGO: Spec + Implementation = Two-Layer Build' },
        content: {
          tr: 'Elinde iki LEGO plakası var. Üst plaka (spec) büyük, renkli DUPLO parçaları: "Giriş yap", "Sepete ekle", "Ödemeyi tamamla" — çocuk bile dizebilir. Alt plaka (Java) küçük teknik parçalar: WebDriver, By.id, click(). İki plaka @Step çıkıntılarıyla birbirine kilitlenir: üstteki her DUPLO parçasının altında ona karşılık gelen teknik parça grubu olmak ZORUNDADIR — karşılığı olmayan DUPLO parçası koyarsan yapı "tık" diye oturmaz (Step implementation not found). İkinci LEGO oyunu concept\'tir: sık kullandığın 4 parçalık "giriş yap" kombinasyonunu tek büyük parça olarak yapıştırırsın (.cpt), artık her senaryoya tek hamlede takarsın.',
          en: 'You have two LEGO baseplates. The top plate (spec) holds big, colorful DUPLO bricks: "Sign in", "Add to cart", "Complete payment" — even a child can arrange them. The bottom plate (Java) holds small technical bricks: WebDriver, By.id, click(). The two plates lock together through @Step studs: every DUPLO brick on top MUST have a matching group of technical bricks underneath — place a DUPLO brick with no counterpart and the build refuses to click into place (Step implementation not found). The second LEGO game is the concept: you glue your frequently used 4-brick "sign in" combo into one big brick (.cpt) and snap it onto any scenario in a single move.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'Gauge\'ü Cucumber\'dan ayıran en temel fark nedir?',
          en: 'What is the most fundamental difference between Gauge and Cucumber?',
        },
        options: [
          { id: 'a', text: { tr: 'Gauge sadece API testi yapar, Cucumber sadece UI testi yapar', en: 'Gauge only does API testing, Cucumber only does UI testing' } },
          { id: 'b', text: { tr: 'Gauge spec\'leri düz Markdown\'dır ve Given/When/Then kalıbı zorunlu değildir', en: 'Gauge specs are plain Markdown and the Given/When/Then grammar is not mandatory' } },
          { id: 'c', text: { tr: 'Gauge Java desteklemez, Cucumber destekler', en: 'Gauge does not support Java, Cucumber does' } },
          { id: 'd', text: { tr: 'Gauge\'de rapor üretilemez', en: 'Gauge cannot produce reports' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Gauge spec dosyaları düz Markdown\'dır: * ile başlayan her cümle bir step olabilir. Cucumber ise Gherkin\'in Given/When/Then gramerini zorunlu kılar. İkisi de Java dahil birden çok dili destekler ve rapor üretir.',
          en: 'Gauge spec files are plain Markdown: any sentence starting with * can be a step. Cucumber mandates Gherkin\'s Given/When/Then grammar. Both support multiple languages including Java and both produce reports.',
        },
        retryQuestion: {
          question: {
            tr: 'Ürün yöneticisinin GitHub PR\'ında senaryo diff\'ini ekstra sözdizimi öğrenmeden okuyabilmesini hangi Gauge özelliği sağlar?',
            en: 'Which Gauge property lets a product manager read a scenario diff in a GitHub PR without learning extra syntax?',
          },
          options: [
            { id: 'a', text: { tr: 'Spec dosyalarının düz Markdown olması', en: 'Spec files being plain Markdown' } },
            { id: 'b', text: { tr: 'HTML rapor plugin\'i', en: 'The HTML report plugin' } },
            { id: 'c', text: { tr: 'Paralel koşum desteği', en: 'Parallel execution support' } },
            { id: 'd', text: { tr: '@Step annotation\'ı', en: 'The @Step annotation' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Markdown, GitHub\'ın doğal render ettiği bir formattır — .spec dosyası PR\'da başlıklar ve maddeler halinde görünür. Gherkin de okunabilir ama kendi kalıbını öğrenmeyi gerektirir.',
            en: 'Markdown is a format GitHub renders natively — a .spec file appears in a PR as headings and bullet points. Gherkin is readable too but requires learning its own grammar.',
          },
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'Excel\'deki manuel senaryolar ile otomasyon kodunun birbirinden kopması (drift) problemini Gauge nasıl engeller?',
          en: 'How does Gauge prevent the drift problem between manual scenarios in Excel and automation code?',
        },
        options: [
          { id: 'a', text: { tr: 'Excel dosyalarını otomatik senkronize eden bir plugin\'i vardır', en: 'It has a plugin that auto-syncs Excel files' } },
          { id: 'b', text: { tr: 'Senaryo metni testin kendisidir; karşılığı olmayan step koşumu kırar', en: 'The scenario text IS the test; a step without an implementation breaks the run' } },
          { id: 'c', text: { tr: 'Senaryoları haftalık e-posta ile ekibe gönderir', en: 'It emails scenarios to the team weekly' } },
          { id: 'd', text: { tr: 'Manuel testi tamamen yasaklar', en: 'It completely bans manual testing' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Gauge\'de spec dosyası hem doküman hem testtir (living documentation). Spec\'e eklenen yeni adımın Java karşılığı yoksa koşum "Step implementation not found" ile fail olur — iki kaynağın sessizce ayrışması yapısal olarak imkânsızlaşır.',
          en: 'In Gauge the spec file is both the documentation and the test (living documentation). If a newly added step has no Java implementation, the run fails with "Step implementation not found" — silent divergence of two sources becomes structurally impossible.',
        },
        retryQuestion: {
          question: {
            tr: '"Yaşayan doküman (living documentation)" kavramı Gauge bağlamında ne anlama gelir?',
            en: 'What does "living documentation" mean in the context of Gauge?',
          },
          options: [
            { id: 'a', text: { tr: 'Dokümanın her gün otomatik yeniden yazılması', en: 'The document being auto-rewritten daily' } },
            { id: 'b', text: { tr: 'Testin ve dokümantasyonun aynı dosya olması: spec eskirse test kırılır', en: 'The test and the documentation being the same file: if the spec goes stale, the test breaks' } },
            { id: 'c', text: { tr: 'Dokümanın bulutta saklanması', en: 'The document being stored in the cloud' } },
            { id: 'd', text: { tr: 'Dokümana video eklenebilmesi', en: 'Being able to embed videos in the document' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Yaşayan doküman = koşan doküman. Spec dosyası koşumda birebir çalıştırıldığı için gerçeklikten koptuğu anda fail verir; klasik Word/Excel dokümanı ise sessizce eskir.',
            en: 'Living documentation = executable documentation. Because the spec file is executed verbatim, it fails the moment it diverges from reality; a classic Word/Excel document just goes stale silently.',
          },
        },
      },
    ],
  },

  // ── 1: Kurulum ──────────────────────────────────────────────────────────────
  {
    title: { tr: '⚙️ Kurulum', en: '⚙️ Setup' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧰',
        content: {
          tr: 'Gauge kurulumu, bir matkap + uç seti almaya benzer: önce gövdeyi (gauge CLI) alırsın, ama gövde tek başına delik açmaz — hangi malzemeyi deleceksen ona uygun ucu (java plugin, html-report plugin) takman gerekir. Bu yüzden kurulum İKİ aşamalıdır: `gauge` komutu + `gauge install java`. Peki neden Gauge her şeyi tek kurulumda getirmiyor — kullanıcıyı neden plugin kurmaya "uğraştırıyor"? Çünkü Gauge dil-bağımsız bir çekirdektir: Java, JavaScript, Python, C# ekipleri aynı çekirdeği kullanır; her dilin runtime\'ını pakete gömmek kurulumu yüzlerce MB yapardı. Java tarafındaki karşılığı düşün: JDK kurarsın ama Maven bağımlılıkları projeye göre ayrı iner — çekirdek ile ihtiyaç ayrıştırılmıştır. QA bağlamında bu iki aşamalılık ilk gün seni bekleyen 1 numaralı tuzaktır: CI agent\'ına sadece gauge CLI kurulur, java plugin\'i unutulur ve pipeline "Failed to start gauge API" ile kırılır — hata mesajı plugin\'den bahsetmediği için ekipler saatlerce yanlış yerde arar. Bu sekmedeki verification adımlarını atlarsan bu tuzağa CI\'da yakalanırsın.',
          en: 'Installing Gauge is like buying a drill plus a bit set: you first get the body (the gauge CLI), but the body alone drills nothing — you must attach the right bit for the material (the java plugin, the html-report plugin). That is why installation has TWO stages: the `gauge` command + `gauge install java`. Why doesn\'t Gauge ship everything in a single installer — why "bother" users with plugins? Because Gauge is a language-agnostic core: Java, JavaScript, Python, and C# teams share the same core; bundling every language runtime would make the installer hundreds of MB. Think of the Java parallel: you install the JDK, but Maven dependencies download per project — core and needs are separated. In a QA context this two-stage nature is trap #1 waiting on day one: the CI agent gets only the gauge CLI, the java plugin is forgotten, and the pipeline breaks with "Failed to start gauge API" — since the message never mentions plugins, teams search in the wrong place for hours. Skip the verification steps in this tab and this trap catches you in CI.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🪟 Windows Kurulumu', en: '🪟 Windows Installation' },
      },
      {
        type: 'code',
        language: 'powershell',
        code: {
          tr: `# Secenek 1: Chocolatey ile (onerilen)
choco install gauge

# Secenek 2: npm ile (Node.js kuruluysa)
npm install -g @getgauge/cli

# Kurulumu dogrula
gauge version`,
          en: `# Option 1: with Chocolatey (recommended)
choco install gauge

# Option 2: with npm (if Node.js is installed)
npm install -g @getgauge/cli

# Verify the installation
gauge version`,
        },
        expected: `Gauge version: 1.6.1
Commit Hash: 5e5a5d4

Plugins
-------
(none)`,
      },
      {
        type: 'heading',
        text: { tr: '🍎 macOS Kurulumu', en: '🍎 macOS Installation' },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# Homebrew ile kur
brew install gauge

# Kurulumu dogrula
gauge version`,
          en: `# Install with Homebrew
brew install gauge

# Verify the installation
gauge version`,
        },
        expected: `Gauge version: 1.6.1

Plugins
-------
(none)`,
      },
      {
        type: 'heading',
        text: { tr: '🐧 Linux Kurulumu', en: '🐧 Linux Installation' },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# apt deposunu ekle ve kur (Debian/Ubuntu)
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 \\
  --recv-keys 023EDB0B
echo "deb https://dl.bintray.com/gauge/gauge-deb stable main" | \\
  sudo tee -a /etc/apt/sources.list
sudo apt-get update && sudo apt-get install gauge

# Alternatif: curl ile tek satir kurulum
curl -SsL https://downloads.gauge.org/stable | sh

# Kurulumu dogrula
gauge version`,
          en: `# Add the apt repository and install (Debian/Ubuntu)
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 \\
  --recv-keys 023EDB0B
echo "deb https://dl.bintray.com/gauge/gauge-deb stable main" | \\
  sudo tee -a /etc/apt/sources.list
sudo apt-get update && sudo apt-get install gauge

# Alternative: one-line install with curl
curl -SsL https://downloads.gauge.org/stable | sh

# Verify the installation
gauge version`,
        },
        expected: `Gauge version: 1.6.1

Plugins
-------
(none)`,
      },
      {
        type: 'heading',
        text: { tr: '🔌 Plugin Kurulumu: Matkaba Ucu Takmak', en: '🔌 Installing Plugins: Attaching the Bit to the Drill' },
      },
      {
        type: 'text',
        content: {
          tr: 'gauge version çıktısındaki "Plugins: (none)" satırına dikkat: gövde hazır ama uç yok. Java projesi koşabilmek için java plugin\'i, okunabilir rapor için html-report plugin\'i şarttır. Plugin\'ler ~/.gauge (Windows\'ta %APPDATA%\\gauge) altına iner ve tüm projeler tarafından paylaşılır — Java\'daki global Maven repository (~/.m2) mantığıyla aynıdır.',
          en: 'Note the "Plugins: (none)" line in the gauge version output: the body is ready but there is no bit. The java plugin is required to run a Java project, and the html-report plugin for readable reports. Plugins download under ~/.gauge (%APPDATA%\\gauge on Windows) and are shared by all projects — the same idea as Java\'s global Maven repository (~/.m2).',
        },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# Java dil plugin'ini kur
gauge install java

# HTML rapor plugin'ini kur
gauge install html-report

# Kurulan plugin'leri dogrula
gauge version`,
          en: `# Install the Java language plugin
gauge install java

# Install the HTML report plugin
gauge install html-report

# Verify installed plugins
gauge version`,
        },
        expected: `Gauge version: 1.6.1

Plugins
-------
html-report (4.3.1)
java (0.11.2)`,
      },
      {
        type: 'heading',
        text: { tr: '🏗️ İlk Projeyi Oluştur: gauge init java', en: '🏗️ Create Your First Project: gauge init java' },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# Proje klasorunu olustur ve icine gir
mkdir gauge-selenium-demo && cd gauge-selenium-demo

# Java sablonuyla Gauge projesi baslat
gauge init java

# Olusan yapiyi incele
tree -L 2`,
          en: `# Create the project folder and enter it
mkdir gauge-selenium-demo && cd gauge-selenium-demo

# Initialize a Gauge project with the Java template
gauge init java

# Inspect the generated structure
tree -L 2`,
        },
        expected: `.
├── env
│   └── default
├── libs
├── manifest.json
├── specs
│   └── example.spec
└── src
    └── test`,
      },
      {
        type: 'text',
        content: {
          tr: 'Oluşan yapının haritası: specs/ klasörü Markdown senaryolarını tutar (restoran benzetmesindeki sipariş fişleri), src/test/java/ altında step implementation\'ları yaşar (mutfak), env/default/ ortam konfigürasyonlarını içerir (default.properties), manifest.json projenin hangi dil plugin\'ini kullandığını söyler. Maven ile çalışacaksan pom.xml\'e gauge-java bağımlılığını ve gauge-maven-plugin\'i eklersin — böylece testler hem gauge run hem mvn ile koşar.',
          en: 'The map of the generated structure: the specs/ folder holds Markdown scenarios (the order tickets in our restaurant analogy), step implementations live under src/test/java/ (the kitchen), env/default/ contains environment configuration (default.properties), and manifest.json tells which language plugin the project uses. If you work with Maven, add the gauge-java dependency and the gauge-maven-plugin to pom.xml — then tests run both via gauge run and via mvn.',
        },
      },
      {
        type: 'code',
        language: 'xml',
        code: {
          tr: `<!-- pom.xml: Gauge + Selenium bagimliliklari -->
<dependencies>
    <!-- Gauge Java runner -->
    <dependency>
        <groupId>com.thoughtworks.gauge</groupId>
        <artifactId>gauge-java</artifactId>
        <version>0.11.2</version>
        <scope>test</scope>
    </dependency>
    <!-- Selenium WebDriver (Selenium Manager dahili) -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.21.0</version>
        <scope>test</scope>
    </dependency>
    <!-- Assertion kutuphanesi -->
    <dependency>
        <groupId>org.assertj</groupId>
        <artifactId>assertj-core</artifactId>
        <version>3.25.3</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <!-- mvn gauge:execute ile kosum icin -->
        <plugin>
            <groupId>com.thoughtworks.gauge.maven</groupId>
            <artifactId>gauge-maven-plugin</artifactId>
            <version>1.6.1</version>
        </plugin>
    </plugins>
</build>`,
          en: `<!-- pom.xml: Gauge + Selenium dependencies -->
<dependencies>
    <!-- Gauge Java runner -->
    <dependency>
        <groupId>com.thoughtworks.gauge</groupId>
        <artifactId>gauge-java</artifactId>
        <version>0.11.2</version>
        <scope>test</scope>
    </dependency>
    <!-- Selenium WebDriver (Selenium Manager built in) -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.21.0</version>
        <scope>test</scope>
    </dependency>
    <!-- Assertion library -->
    <dependency>
        <groupId>org.assertj</groupId>
        <artifactId>assertj-core</artifactId>
        <version>3.25.3</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <!-- for running via mvn gauge:execute -->
        <plugin>
            <groupId>com.thoughtworks.gauge.maven</groupId>
            <artifactId>gauge-maven-plugin</artifactId>
            <version>1.6.1</version>
        </plugin>
    </plugins>
</build>`,
        },
      },
      {
        type: 'heading',
        text: { tr: '▶️ İlk Koşum ve Doğrulama', en: '▶️ First Run and Verification' },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# Ornek spec'i kostur
gauge run specs

# Rapora bak (tarayicida acilir)
# Windows: start reports\\html-report\\index.html
# macOS:   open reports/html-report/index.html`,
          en: `# Run the example spec
gauge run specs

# Open the report (opens in a browser)
# Windows: start reports\\html-report\\index.html
# macOS:   open reports/html-report/index.html`,
        },
        expected: `# Specification Heading
  ## Vowel counts in single word     ✔ ✔
  ## Vowel counts in multiple words  ✔ ✔

Successfully generated html-report to => reports/html-report/index.html

Specifications: 1 executed  1 passed  0 failed  0 skipped
Scenarios:      2 executed  2 passed  0 failed  0 skipped`,
      },
      {
        type: 'callout',
        color: 'yellow',
        emoji: '💡',
        title: { tr: 'IDE Desteği', en: 'IDE Support' },
        content: {
          tr: 'IntelliJ IDEA\'ya "Gauge" plugin\'ini kur (Settings → Plugins → Marketplace → Gauge): spec dosyasında step üzerinde Ctrl+B ile Java implementasyonuna atlarsın, implementasyonu olmayan step\'ler sarı uyarıyla işaretlenir. VS Code için resmi "Gauge" extension\'ı aynı işi yapar. Bu navigasyon, spec ↔ kod bağını görünür kıldığı için özellikle öğrenme aşamasında çok değerlidir.',
          en: 'Install the "Gauge" plugin in IntelliJ IDEA (Settings → Plugins → Marketplace → Gauge): Ctrl+B on a step in a spec file jumps to its Java implementation, and steps without implementations get a yellow warning. The official "Gauge" extension for VS Code does the same. This navigation makes the spec ↔ code binding visible, which is especially valuable while learning.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'gauge CLI kurulu ama "gauge run specs" → "Failed to start gauge API" hatası alıyorsun. En olası sebep nedir?',
          en: 'The gauge CLI is installed but "gauge run specs" fails with "Failed to start gauge API". What is the most likely cause?',
        },
        options: [
          { id: 'a', text: { tr: 'İnternet bağlantısı yok', en: 'There is no internet connection' } },
          { id: 'b', text: { tr: 'Dil plugin\'i (java) kurulmamış — çekirdek CLI tek başına projeyi koşturamaz', en: 'The language plugin (java) is not installed — the core CLI cannot run the project alone' } },
          { id: 'c', text: { tr: 'Spec dosyası çok uzun', en: 'The spec file is too long' } },
          { id: 'd', text: { tr: 'Chrome tarayıcısı güncel değil', en: 'The Chrome browser is outdated' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Gauge iki parçalıdır: çekirdek CLI + dil plugin\'i. manifest.json "java" dediği halde java plugin\'i yoksa Gauge runner\'ı başlatamaz ve "Failed to start gauge API" verir. Çözüm: gauge install java. CI agent kurulumlarında en sık unutulan adımdır.',
          en: 'Gauge has two parts: the core CLI + a language plugin. If manifest.json says "java" but the java plugin is missing, Gauge cannot start the runner and reports "Failed to start gauge API". Fix: gauge install java. It is the most commonly forgotten step on CI agents.',
        },
        retryQuestion: {
          question: {
            tr: 'Yeni bir CI agent\'ında Gauge Java projesini koşturmadan önce hangi İKİ kurulum adımı tamamlanmış olmalıdır?',
            en: 'Which TWO installation steps must be complete before running a Gauge Java project on a fresh CI agent?',
          },
          options: [
            { id: 'a', text: { tr: 'gauge CLI + java dil plugin\'i', en: 'The gauge CLI + the java language plugin' } },
            { id: 'b', text: { tr: 'Sadece gauge CLI', en: 'Only the gauge CLI' } },
            { id: 'c', text: { tr: 'Sadece JDK', en: 'Only the JDK' } },
            { id: 'd', text: { tr: 'Postman + Newman', en: 'Postman + Newman' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Çekirdek CLI projeyi tanır ama koşturamaz; dil plugin\'i (gauge install java) step implementation\'larını derleyip çalıştıran runner\'ı sağlar. (JDK de gerekir ama tek başına yetmez — soru Gauge\'e özgü iki adımı soruyor.)',
            en: 'The core CLI recognizes the project but cannot execute it; the language plugin (gauge install java) provides the runner that compiles and executes step implementations. (A JDK is also needed but insufficient alone — the question asks for the two Gauge-specific steps.)',
          },
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'gauge install java komutuyla kurulan plugin nereye iner ve kapsamı nedir?',
          en: 'Where does the plugin installed by gauge install java go, and what is its scope?',
        },
        options: [
          { id: 'a', text: { tr: 'Proje klasörüne iner, sadece o projede geçerlidir', en: 'Into the project folder, valid only for that project' } },
          { id: 'b', text: { tr: '~/.gauge (kullanıcı dizini) altına iner, makinedeki tüm projeler paylaşır', en: 'Under ~/.gauge (user home), shared by all projects on the machine' } },
          { id: 'c', text: { tr: 'Sistem PATH\'ine yazılır, işletim sistemi yeniden başlatılmalıdır', en: 'Written to the system PATH, requiring an OS restart' } },
          { id: 'd', text: { tr: 'Maven\'ın .m2 klasörüne iner', en: 'Into Maven\'s .m2 folder' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Plugin\'ler kullanıcı bazında ~/.gauge (Windows\'ta %APPDATA%\\gauge) altına kurulur ve tüm projeler tarafından paylaşılır — Maven\'ın ~/.m2 global repository mantığına benzer, ama .m2\'nin kendisi değildir.',
          en: 'Plugins install per user under ~/.gauge (%APPDATA%\\gauge on Windows) and are shared by all projects — similar in spirit to Maven\'s ~/.m2 global repository, but it is not .m2 itself.',
        },
        retryQuestion: {
          question: {
            tr: 'Aynı makinede 3 farklı Gauge Java projesi var. java plugin\'i kaç kez kurulmalıdır?',
            en: 'There are 3 different Gauge Java projects on the same machine. How many times must the java plugin be installed?',
          },
          options: [
            { id: 'a', text: { tr: '1 kez — plugin kullanıcı bazında paylaşılır', en: 'Once — the plugin is shared per user' } },
            { id: 'b', text: { tr: '3 kez — her proje için ayrı', en: '3 times — once per project' } },
            { id: 'c', text: { tr: 'Her koşumdan önce yeniden', en: 'Again before every run' } },
            { id: 'd', text: { tr: 'Hiç — Java projeleri plugin gerektirmez', en: 'Never — Java projects need no plugin' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Plugin ~/.gauge altına bir kez iner; manifest.json\'ında "java" yazan her proje aynı kurulumu kullanır. Sürüm sabitlemek istersen manifest.json\'da plugin sürümü belirtebilirsin.',
            en: 'The plugin downloads once under ~/.gauge; every project whose manifest.json says "java" uses that same installation. To pin a version, specify it in manifest.json.',
          },
        },
      },
    ],
  },

  // ── 2: Spec & Step Temelleri ────────────────────────────────────────────────
  {
    title: { tr: '📝 Spec & Step Temelleri', en: '📝 Spec & Step Basics' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎼',
        content: {
          tr: 'Spec dosyası ile step implementation arasındaki ilişki, nota kağıdı ile piyanist arasındaki ilişkidir: nota kağıdı (.spec) NE çalınacağını satır satır söyler, piyanist (@Step metodu) her notayı NASIL basacağını bilir. Kritik mekanizma eşleşmedir: notadaki her sembolün piyanistin repertuarında birebir karşılığı olmalıdır — Gauge, spec\'teki step cümlesini @Step("...") annotation metniyle KARAKTER KARAKTER eşleştirir; "Kullanıcı giriş yapar" ile "Kullanici giriş yapar" farklı iki step\'tir. Peki neden Gauge bulanık (fuzzy) eşleştirme yapmıyor — "yaklaşık aynı" cümleyi kabul etse daha pratik olmaz mıydı? Olmazdı: test otomasyonunda belirsizlik en pahalı şeydir; "hangi metodun koşacağı" tahmine dayansaydı, yanlış implementasyonun sessizce koşması mümkün olurdu. Java\'daki karşılığı method overload resolution\'dır: derleyici çağrının hangi metoda gideceğini kesin kurallarla belirler, "en yakın isimli metodu çağırayım" demez. QA bağlamında bu katılık senin lehinedir: spec\'te bir kelime değiştiğinde test sessizce yanlış metodu koşturmak yerine "Step implementation not found" ile kırılır — yanlış PASS\'ten (en tehlikeli test sonucu) seni korur.',
          en: 'The relationship between a spec file and a step implementation is that of sheet music to a pianist: the sheet (.spec) says WHAT to play line by line, the pianist (the @Step method) knows HOW to strike each note. The critical mechanism is matching: every symbol on the sheet must have an exact counterpart in the pianist\'s repertoire — Gauge matches the spec\'s step sentence to the @Step("...") annotation text CHARACTER BY CHARACTER; "User signs in" and "User sign in" are two different steps. Why doesn\'t Gauge do fuzzy matching — wouldn\'t accepting "roughly the same" sentence be more practical? No: in test automation, ambiguity is the most expensive thing; if "which method runs" were based on a guess, the wrong implementation could run silently. The Java parallel is method overload resolution: the compiler decides which method a call binds to with exact rules — it never says "I\'ll call the closest-named method". In QA this rigidity works for you: when a word changes in the spec, the test breaks with "Step implementation not found" instead of silently running the wrong method — protecting you from a false PASS, the most dangerous test outcome.',
        },
      },
      {
        type: 'heading',
        text: { tr: '📄 Spec Dosyası Anatomisi', en: '📄 Anatomy of a Spec File' },
      },
      {
        type: 'text',
        content: {
          tr: 'Bir .spec dosyası üç seviyeden oluşur: # ile başlayan tek bir Specification başlığı (dosya başına bir tane), ## ile başlayan Scenario başlıkları (her biri bağımsız bir test) ve * ile başlayan step satırları. Specification başlığının hemen altındaki * step\'ler "context step" olur: o dosyadaki HER senaryodan önce koşarlar — Java\'daki @BeforeMethod\'un spec-içi karşılığıdır. Çift tırnak içindeki değerler ("admin" gibi) otomatik parametre olur.',
          en: 'A .spec file has three levels: a single Specification heading starting with # (one per file), Scenario headings starting with ## (each an independent test), and step lines starting with *. Steps placed right under the Specification heading become "context steps": they run before EVERY scenario in that file — the in-spec equivalent of Java\'s @BeforeMethod. Values in double quotes (like "admin") automatically become parameters.',
        },
      },
      {
        type: 'code',
        language: 'markdown',
        code: {
          tr: `# Giris Akisi
tags: smoke, login

Su anda uygulamanin login sayfasi test ediliyor.

* Kullanici login sayfasini acar

## Gecerli kullanici giris yapabilir
tags: happy-path

* Kullanici "admin" kullanici adini girer
* Kullanici "Passw0rd!" sifresini girer
* Kullanici giris butonuna tiklar
* Dashboard sayfasi goruntulenir

## Hatali sifre uyari gosterir

* Kullanici "admin" kullanici adini girer
* Kullanici "yanlis-sifre" sifresini girer
* Kullanici giris butonuna tiklar
* "Kullanici adi veya sifre hatali" uyarisi goruntulenir`,
          en: `# Login Flow
tags: smoke, login

The application's login page is under test.

* User opens the login page

## Valid user can sign in
tags: happy-path

* User enters username "admin"
* User enters password "Passw0rd!"
* User clicks the sign-in button
* The dashboard page is displayed

## Wrong password shows a warning

* User enters username "admin"
* User enters password "wrong-password"
* User clicks the sign-in button
* The warning "Invalid username or password" is displayed`,
        },
      },
      {
        type: 'heading',
        text: { tr: '☕ Step Implementation: @Step Annotation\'ı', en: '☕ Step Implementation: the @Step Annotation' },
      },
      {
        type: 'text',
        content: {
          tr: 'Spec\'teki her * satırı, Java tarafında @Step annotation\'lı bir metoda bağlanır. Spec\'te çift tırnakla yazılan değer, annotation metninde <parametreAdi> yer tutucusuna denk gelir ve metoda argüman olarak akar. Java karşılaştırması: TestNG\'de @Test metodunun adı serbesttir ve veriyi @DataProvider\'dan alırsın; Gauge\'de metot adı yine serbesttir ama BAĞ, annotation metni üzerinden kurulur — metodu yeniden adlandırabilirsin, spec kırılmaz; annotation metnini değiştirirsen spec kırılır.',
          en: 'Every * line in the spec binds to a Java method annotated with @Step. A double-quoted value in the spec maps to a <parameterName> placeholder in the annotation text and flows into the method as an argument. Java comparison: in TestNG the @Test method name is free-form and data comes from a @DataProvider; in Gauge the method name is still free-form but the BINDING is through the annotation text — you can rename the method without breaking the spec; change the annotation text and the spec breaks.',
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package steps;

import com.thoughtworks.gauge.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginSteps {

    // Driver'in nereden geldigini "Kurulum" sekmesindeki
    // DriverFactory bolumunde gorecegiz — simdilik hazir kabul et.
    private final WebDriver driver = DriverFactory.getDriver();

    @Step("Kullanici login sayfasini acar")
    public void openLoginPage() {
        driver.get("https://demo.learnqa.dev/login");
    }

    // Spec'teki "admin" degeri <kullaniciAdi> yer tutucusuna akar
    @Step("Kullanici <kullaniciAdi> kullanici adini girer")
    public void enterUsername(String kullaniciAdi) {
        driver.findElement(By.id("username")).sendKeys(kullaniciAdi);
    }

    @Step("Kullanici <sifre> sifresini girer")
    public void enterPassword(String sifre) {
        driver.findElement(By.id("password")).sendKeys(sifre);
    }

    @Step("Kullanici giris butonuna tiklar")
    public void clickLogin() {
        driver.findElement(By.cssSelector("button[type='submit']")).click();
    }

    @Step("Dashboard sayfasi goruntulenir")
    public void verifyDashboard() {
        // Baslik dogrulamasi: assertion fail olursa step kirmizi olur
        assertThat(driver.getTitle()).contains("Dashboard");
    }
}`,
          en: `package steps;

import com.thoughtworks.gauge.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginSteps {

    // Where the driver comes from is covered in the DriverFactory
    // part of the Setup tab — take it as given for now.
    private final WebDriver driver = DriverFactory.getDriver();

    @Step("User opens the login page")
    public void openLoginPage() {
        driver.get("https://demo.learnqa.dev/login");
    }

    // The "admin" value from the spec flows into the <username> placeholder
    @Step("User enters username <username>")
    public void enterUsername(String username) {
        driver.findElement(By.id("username")).sendKeys(username);
    }

    @Step("User enters password <password>")
    public void enterPassword(String password) {
        driver.findElement(By.id("password")).sendKeys(password);
    }

    @Step("User clicks the sign-in button")
    public void clickLogin() {
        driver.findElement(By.cssSelector("button[type='submit']")).click();
    }

    @Step("The dashboard page is displayed")
    public void verifyDashboard() {
        // Title assertion: if it fails, the step turns red
        assertThat(driver.getTitle()).contains("Dashboard");
    }
}`,
        },
      },
      {
        type: 'heading',
        text: { tr: '📊 Veri Tablolu Step\'ler ve Concept\'ler', en: '📊 Data-Table Steps and Concepts' },
      },
      {
        type: 'text',
        content: {
          tr: 'Aynı senaryoyu farklı verilerle koşturmak için step\'in altına Markdown tablosu koyarsın — Java\'daki @DataProvider\'ın spec karşılığıdır, ama veri kodda değil dokümanın içinde durur. Tekrarlanan adım grupları içinse concept (.cpt) dosyası kullanılır: 4 adımlık giriş akışını tek bir üst-seviye cümleye sıkıştırırsın. Akıl yürütme: neden concept\'i Java tarafında (metodu metottan çağırarak) değil de spec tarafında yapıyoruz? Çünkü hedef okuyucu spec okuyucusudur — ürün yöneticisi "Admin olarak giris yapilir" tek satırını görür, 4 teknik adımı görmek zorunda kalmaz. Soyutlama, okuyucunun katmanında yapılır.',
          en: 'To run the same scenario with different data you put a Markdown table under a step — the spec equivalent of Java\'s @DataProvider, except the data lives in the document, not the code. For repeated step groups you use a concept (.cpt) file: compressing the 4-step login flow into one higher-level sentence. Reasoning: why build the concept on the spec side rather than in Java (a method calling methods)? Because the target reader is the spec reader — the product manager sees the single line "Sign in as admin" without being forced through 4 technical steps. Abstraction belongs at the reader\'s layer.',
        },
      },
      {
        type: 'code',
        language: 'markdown',
        code: {
          tr: `## Farkli roller dogru sayfaya yonlenir

* Kullanici <rol> rolu ile giris yapar ve <beklenenSayfa> gorur
   |rol      |beklenenSayfa |
   |---------|--------------|
   |admin    |Dashboard     |
   |editor   |Icerik Paneli |
   |viewer   |Rapor Ekrani  |

<!-- concepts/giris.cpt dosyasi: -->
<!-- # Admin olarak giris yapilir                    -->
<!-- * Kullanici login sayfasini acar                -->
<!-- * Kullanici "admin" kullanici adini girer       -->
<!-- * Kullanici "Passw0rd!" sifresini girer         -->
<!-- * Kullanici giris butonuna tiklar               -->`,
          en: `## Different roles land on the right page

* User signs in with role <role> and sees <expectedPage>
   |role     |expectedPage  |
   |---------|--------------|
   |admin    |Dashboard     |
   |editor   |Content Panel |
   |viewer   |Report Screen |

<!-- concepts/login.cpt file: -->
<!-- # Sign in as admin                          -->
<!-- * User opens the login page                 -->
<!-- * User enters username "admin"              -->
<!-- * User enters password "Passw0rd!"          -->
<!-- * User clicks the sign-in button            -->`,
        },
      },
      {
        type: 'heading',
        text: { tr: '🪝 Hook\'lar: Koşum Yaşam Döngüsü', en: '🪝 Hooks: the Execution Lifecycle' },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package steps;

import com.thoughtworks.gauge.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ExecutionHooks {

    // Tum kosumdan once BIR kez: driver'i baslat
    @BeforeSuite
    public void setUpSuite() {
        DriverFactory.createDriver();
    }

    // Her senaryodan once: temiz oturumla basla
    @BeforeScenario
    public void resetSession() {
        DriverFactory.getDriver().manage().deleteAllCookies();
    }

    // Sadece "smoke" etiketli senaryolardan sonra kos
    @AfterScenario(tags = {"smoke"})
    public void captureEvidence(ExecutionContext context) {
        // Senaryo fail olduysa kanit icin ekran goruntusu al
        if (context.getCurrentScenario().getIsFailing()) {
            Gauge.captureScreenshot();
        }
    }

    // Tum kosumdan sonra BIR kez: driver'i kapat
    @AfterSuite
    public void tearDownSuite() {
        DriverFactory.quitDriver();
    }
}`,
          en: `package steps;

import com.thoughtworks.gauge.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ExecutionHooks {

    // Once before the whole run: start the driver
    @BeforeSuite
    public void setUpSuite() {
        DriverFactory.createDriver();
    }

    // Before every scenario: start with a clean session
    @BeforeScenario
    public void resetSession() {
        DriverFactory.getDriver().manage().deleteAllCookies();
    }

    // Run only after scenarios tagged "smoke"
    @AfterScenario(tags = {"smoke"})
    public void captureEvidence(ExecutionContext context) {
        // If the scenario failed, capture a screenshot as evidence
        if (context.getCurrentScenario().getIsFailing()) {
            Gauge.captureScreenshot();
        }
    }

    // Once after the whole run: quit the driver
    @AfterSuite
    public void tearDownSuite() {
        DriverFactory.quitDriver();
    }
}`,
        },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Gauge Hook', en: 'Gauge Hook' },
          { tr: 'Ne zaman koşar', en: 'When it runs' },
          { tr: 'TestNG karşılığı', en: 'TestNG equivalent' },
        ],
        rows: [
          ['@BeforeSuite / @AfterSuite', { tr: 'Tüm koşumdan önce/sonra bir kez', en: 'Once before/after the entire run' }, '@BeforeSuite / @AfterSuite'],
          ['@BeforeSpec / @AfterSpec', { tr: 'Her .spec dosyasından önce/sonra', en: 'Before/after each .spec file' }, '@BeforeClass / @AfterClass'],
          ['@BeforeScenario / @AfterScenario', { tr: 'Her senaryodan önce/sonra', en: 'Before/after each scenario' }, '@BeforeMethod / @AfterMethod'],
          ['@BeforeStep / @AfterStep', { tr: 'Her step\'ten önce/sonra', en: 'Before/after each step' }, { tr: 'Karşılığı yok (listener gerekir)', en: 'No direct equivalent (needs a listener)' }],
        ],
      },
      {
        type: 'heading',
        text: { tr: '🚀 Koşum Komutları', en: '🚀 Run Commands' },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# Tum spec'leri kostur
gauge run specs

# Sadece "smoke" etiketli senaryolari kostur
gauge run --tags "smoke" specs

# 4 paralel surecle kostur
gauge run --parallel -n 4 specs

# Tek bir spec dosyasini kostur
gauge run specs/giris-akisi.spec

# Belirli ortam konfigurasyonuyla kostur (env/test/*.properties)
gauge run --env test specs`,
          en: `# Run all specs
gauge run specs

# Run only scenarios tagged "smoke"
gauge run --tags "smoke" specs

# Run with 4 parallel processes
gauge run --parallel -n 4 specs

# Run a single spec file
gauge run specs/login-flow.spec

# Run with a specific environment config (env/test/*.properties)
gauge run --env test specs`,
        },
      },
      gaugeRunChainFilm,
      {
        type: 'quiz',
        question: {
          tr: 'Spec\'te "* Kullanici cikis yapar" yazdın ama Java\'da @Step("Kullanici cikis  yapar") (çift boşluklu) tanımladın. Ne olur?',
          en: 'The spec says "* User signs out" but your Java annotation is @Step("User signs  out") (double space). What happens?',
        },
        options: [
          { id: 'a', text: { tr: 'Gauge boşluk farkını tolere eder, test koşar', en: 'Gauge tolerates the whitespace difference and the test runs' } },
          { id: 'b', text: { tr: 'Koşum "Step implementation not found" ile kırılır — eşleşme birebirdir', en: 'The run breaks with "Step implementation not found" — matching is exact' } },
          { id: 'c', text: { tr: 'Gauge en yakın isimli metodu çağırır', en: 'Gauge calls the closest-named method' } },
          { id: 'd', text: { tr: 'Step sessizce atlanır ve senaryo PASS olur', en: 'The step is silently skipped and the scenario passes' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Gauge, spec cümlesi ile @Step metnini birebir eşleştirir (parametre yer tutucuları hariç). Bulanık eşleştirme bilinçli olarak yoktur: "hangi metodun koşacağı" asla tahmine dayanmaz. Bu katılık, yanlış implementasyonun sessizce koşup sahte PASS üretmesini engeller.',
          en: 'Gauge matches the spec sentence to the @Step text exactly (except parameter placeholders). Fuzzy matching is deliberately absent: "which method runs" is never a guess. This rigidity prevents the wrong implementation from silently running and producing a false PASS.',
        },
        retryQuestion: {
          question: {
            tr: 'Gauge\'de step metnini değiştirmek istiyorsun. Spec\'i kırmadan güvenle değiştirebileceğin şey hangisidir?',
            en: 'You want to make a change around a Gauge step. Which change is safe without breaking the spec?',
          },
          options: [
            { id: 'a', text: { tr: 'Java metodunun ADI — bağ annotation metni üzerinden kurulur', en: 'The Java method NAME — the binding is through the annotation text' } },
            { id: 'b', text: { tr: '@Step annotation\'ındaki cümle', en: 'The sentence inside the @Step annotation' } },
            { id: 'c', text: { tr: 'Spec\'teki step cümlesi', en: 'The step sentence in the spec' } },
            { id: 'd', text: { tr: 'Parametre yer tutucusunun tırnak stili', en: 'The quote style of the parameter placeholder' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Bağ, @Step("...") metni ile spec cümlesi arasındadır. Metot adı (enterUsername → typeUsername) serbestçe değişebilir. Annotation metni veya spec cümlesi tek taraflı değişirse eşleşme kopar.',
            en: 'The binding is between the @Step("...") text and the spec sentence. The method name (enterUsername → typeUsername) can change freely. Changing the annotation text or the spec sentence one-sidedly breaks the match.',
          },
        },
      },
      {
        type: 'quiz',
        question: {
          tr: '4 adımlık giriş akışı 23 senaryoda tekrar ediyor. Gauge\'de doğru çözüm nedir?',
          en: 'A 4-step login flow repeats across 23 scenarios. What is the right Gauge solution?',
        },
        options: [
          { id: 'a', text: { tr: '4 adımı her senaryoya kopyala-yapıştır yapmak', en: 'Copy-pasting the 4 steps into every scenario' } },
          { id: 'b', text: { tr: 'Concept (.cpt) dosyası: 4 adımı tek üst-seviye cümleye sarmak', en: 'A concept (.cpt) file: wrapping the 4 steps in one higher-level sentence' } },
          { id: 'c', text: { tr: 'Adımları Excel\'e taşımak', en: 'Moving the steps to Excel' } },
          { id: 'd', text: { tr: 'Her senaryo için ayrı .spec dosyası açmak', en: 'Opening a separate .spec file per scenario' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Concept, tekrarlanan adım grubunu tek cümleye sıkıştırır — Java\'daki extract-method refactoring\'inin spec karşılığıdır. Giriş akışı değişirse tek .cpt dosyası güncellenir, 23 senaryo otomatik yeni akışı kullanır.',
          en: 'A concept compresses a repeated step group into one sentence — the spec-level equivalent of Java\'s extract-method refactoring. If the login flow changes, you update one .cpt file and all 23 scenarios automatically use the new flow.',
        },
        retryQuestion: {
          question: {
            tr: 'Aynı senaryoyu 5 farklı kullanıcı rolüyle koşturmak istiyorsun. Gauge\'ün hangi mekanizması Java\'daki @DataProvider\'a karşılık gelir?',
            en: 'You want to run the same scenario with 5 different user roles. Which Gauge mechanism corresponds to Java\'s @DataProvider?',
          },
          options: [
            { id: 'a', text: { tr: 'Step altına yazılan Markdown veri tablosu', en: 'A Markdown data table written under the step' } },
            { id: 'b', text: { tr: '5 ayrı spec dosyası', en: '5 separate spec files' } },
            { id: 'c', text: { tr: '@BeforeScenario hook\'u', en: 'The @BeforeScenario hook' } },
            { id: 'd', text: { tr: 'tags etiketleri', en: 'tags labels' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Step\'in altındaki Markdown tablosu her satır için senaryoyu bir kez koşturur ve hücre değerlerini parametre olarak geçer — @DataProvider\'ın yaptığını dokümanın içinde, herkesin görebildiği yerde yapar.',
            en: 'The Markdown table under a step runs the scenario once per row, passing cell values as parameters — doing what @DataProvider does, but inside the document where everyone can see it.',
          },
        },
      },
    ],
  },

  // ── 3: By ile Locator Yazma ─────────────────────────────────────────────────
  {
    title: { tr: '🎯 By ile Locator Yazma', en: '🎯 Locators with By' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '📮',
        content: {
          tr: 'By locator\'ı, bir kuryeye verdiğin adres tarifidir ve tarif türü teslimatın kaderini belirler: By.id "TC kimlik numarası" gibidir — sayfada tekil ve doğrudandır, kapıyı ilk denemede bulur; By.cssSelector "mahalle + sokak + bina tarifi"dir — esnek ama sokak adı değişirse şaşırır; By.xpath ise "üçüncü binadan sola dön, kırmızı kapılı evin yanı" tarifidir — HER yeri tarif edebilir ama en kırılgandır, mahalleye yeni bir bina dikildiğinde (DOM\'a yeni bir div eklendiğinde) yanlış kapıya gider. Peki madem By.xpath her elementi bulabiliyor, neden herkes sadece onu kullanmıyor — tek araç yetmez miydi? Yetmez, çünkü güç ile kırılganlık aynı eksendedir: pozisyona dayalı XPath (div[3]/span[2]) DOM\'daki en küçük yapısal değişiklikte kırılır ve locator bakımı, UI otomasyon maliyetinin en büyük kalemidir. Java karşılaştırması: By sınıfı soyut bir factory\'dir — By.id("x") çağrısı ById nesnesi döndürür; tıpkı List arayüzünün arkasında ArrayList/LinkedList seçmek gibi, hepsi aynı sözleşmeyi (findElement\'e "beni nasıl arayacağını" söylemek) uygular ama performans/kırılganlık profilleri farklıdır. QA bağlamındaki gerçek maliyet: flaky locator\'lar yüzünden ekip "testler yine kırmızı, boş ver" kültürüne kayar — test suite\'ine güven kaybolduğunda otomasyonun tüm yatırımı çöpe döner. Locator önceliği (id > name > css > xpath) bu yüzden bir stil tercihi değil, bakım maliyeti stratejisidir.',
          en: 'A By locator is the address description you hand a courier, and the TYPE of description decides the delivery\'s fate: By.id is like a national ID number — unique and direct on the page, it finds the door on the first try; By.cssSelector is "neighborhood + street + building" — flexible, but confused if the street is renamed; By.xpath is "turn left at the third building, next to the red door" — it can describe ANY place but is the most fragile: when a new building rises in the neighborhood (a new div lands in the DOM), it knocks on the wrong door. If By.xpath can find any element, why doesn\'t everyone just use it — wouldn\'t one tool be enough? No, because power and fragility sit on the same axis: position-based XPath (div[3]/span[2]) breaks at the smallest structural DOM change, and locator maintenance is the biggest line item in UI automation cost. Java comparison: By is an abstract factory — By.id("x") returns a ById object; just like choosing ArrayList/LinkedList behind the List interface, all implement the same contract (telling findElement "how to search for me") but with different performance/fragility profiles. The real QA cost: flaky locators push the team into a "tests are red again, ignore them" culture — once trust in the suite is gone, the entire automation investment is wasted. The locator priority (id > name > css > xpath) is therefore not a style preference but a maintenance-cost strategy.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 8 By Stratejisi: Tek Tek', en: '🧭 The 8 By Strategies: One by One' },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import java.util.List;

// 1) By.id — EN GUVENILIR: sayfada tekil olmasi beklenir
WebElement username = driver.findElement(By.id("username"));

// 2) By.name — form elemanlarinda yaygin (name attribute'u)
WebElement email = driver.findElement(By.name("email"));

// 3) By.className — TEK class adi alir, bosluklu deger KABUL ETMEZ
WebElement alert = driver.findElement(By.className("alert-danger"));

// 4) By.tagName — genelde findElements ile liste almak icin
List<WebElement> rows = driver.findElements(By.tagName("tr"));

// 5) By.linkText — <a> etiketinin TAM metniyle eslesir
WebElement logout = driver.findElement(By.linkText("Cikis Yap"));

// 6) By.partialLinkText — link metninin bir parcasiyla eslesir
WebElement help = driver.findElement(By.partialLinkText("Yardim"));

// 7) By.cssSelector — hizli ve esnek: attribute, hiyerarsi, durum
WebElement submit = driver.findElement(
    By.cssSelector("form#login button[type='submit']"));

// 8) By.xpath — en guclu: metne gore arama, eksene gore gezinme
WebElement priceCell = driver.findElement(
    By.xpath("//td[text()='Toplam']/following-sibling::td"));`,
          en: `import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import java.util.List;

// 1) By.id — MOST RELIABLE: expected to be unique on the page
WebElement username = driver.findElement(By.id("username"));

// 2) By.name — common on form elements (the name attribute)
WebElement email = driver.findElement(By.name("email"));

// 3) By.className — takes a SINGLE class name, rejects spaces
WebElement alert = driver.findElement(By.className("alert-danger"));

// 4) By.tagName — usually with findElements to get a list
List<WebElement> rows = driver.findElements(By.tagName("tr"));

// 5) By.linkText — matches the EXACT text of an <a> tag
WebElement logout = driver.findElement(By.linkText("Sign Out"));

// 6) By.partialLinkText — matches part of the link text
WebElement help = driver.findElement(By.partialLinkText("Help"));

// 7) By.cssSelector — fast and flexible: attributes, hierarchy, state
WebElement submit = driver.findElement(
    By.cssSelector("form#login button[type='submit']"));

// 8) By.xpath — most powerful: search by text, navigate by axes
WebElement priceCell = driver.findElement(
    By.xpath("//td[text()='Toplam']/following-sibling::td"));`,
        },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Strateji', en: 'Strategy' },
          { tr: 'Ne zaman kullan', en: 'When to use' },
          { tr: 'Kırılganlık', en: 'Fragility' },
          { tr: 'Tuzak', en: 'Pitfall' },
        ],
        rows: [
          ['By.id', { tr: 'id varsa HER ZAMAN ilk tercih', en: 'ALWAYS first choice when an id exists' }, { tr: '🟢 Çok düşük', en: '🟢 Very low' }, { tr: 'Dinamik üretilen id\'ler (id="input-8734") sahte güvenliktir', en: 'Dynamically generated ids (id="input-8734") are false safety' }],
          ['By.name', { tr: 'Form alanları (input, select)', en: 'Form fields (input, select)' }, { tr: '🟢 Düşük', en: '🟢 Low' }, { tr: 'Aynı name birden çok elemanda olabilir — ilkini döndürür', en: 'The same name can appear on several elements — returns the first' }],
          ['By.className', { tr: 'Tekil, anlamlı class adları', en: 'Single, meaningful class names' }, { tr: '🟡 Orta', en: '🟡 Medium' }, { tr: '"btn btn-primary" gibi boşluklu değer InvalidSelectorException fırlatır', en: 'A spaced value like "btn btn-primary" throws InvalidSelectorException' }],
          ['By.tagName', { tr: 'Element listeleri (tablo satırları)', en: 'Element lists (table rows)' }, { tr: '🟡 Orta', en: '🟡 Medium' }, { tr: 'Tek element için fazla genel — yanlış elementi bulur', en: 'Too generic for a single element — finds the wrong one' }],
          ['By.linkText', { tr: 'Metni sabit linkler', en: 'Links with stable text' }, { tr: '🟠 Yüksek', en: '🟠 High' }, { tr: 'Çeviri/i18n değişince kırılır; sadece <a> etiketinde çalışır', en: 'Breaks on translation/i18n changes; works only on <a> tags' }],
          ['By.partialLinkText', { tr: 'Uzun/dinamik link metinleri', en: 'Long/dynamic link texts' }, { tr: '🟠 Yüksek', en: '🟠 High' }, { tr: 'Kısa parça birden çok linkle eşleşebilir', en: 'A short fragment can match multiple links' }],
          ['By.cssSelector', { tr: 'id yoksa varsayılan tercih', en: 'Default choice when no id exists' }, { tr: '🟡 Orta', en: '🟡 Medium' }, { tr: 'Metne göre arama yapamaz (:contains diye bir CSS yoktur)', en: 'Cannot search by text (there is no :contains in CSS)' }],
          ['By.xpath', { tr: 'Metin araması, eksen gezinmesi gerekince', en: 'When text search or axis navigation is needed' }, { tr: '🔴 En yüksek', en: '🔴 Highest' }, { tr: 'Pozisyon bazlı mutlak yollar (/html/body/div[3]) ilk DOM değişikliğinde kırılır', en: 'Position-based absolute paths (/html/body/div[3]) break at the first DOM change' }],
        ],
      },
      {
        type: 'callout',
        color: 'green',
        emoji: '🧱',
        title: { tr: 'LEGO ile Düşün: Locator Önceliği Merdiveni', en: 'Think in LEGO: the Locator Priority Ladder' },
        content: {
          tr: 'LEGO kutunda 4 tür parça var. En üst rafta tek başına duran altın parça (By.id) — kutuda her renkten sadece BİR tane olduğu için gözü kapalı bulursun. Bir alt rafta isim etiketli parçalar (By.name). Sonra şekil+renk kombinasyonuyla tarif ettiğin parçalar (By.cssSelector: "kırmızı VE köşeli VE 4 çıkıntılı"). En alt rafta ise "mavi kutunun içindeki üçüncü bölmenin sağındaki parça" tarifi (By.xpath) — bugün doğru, ama kardeşin kutuyu salladığında (DOM değiştiğinde) tarif çöp olur. Merdivende her basamak aşağı indikçe tarif uzar ve kırılganlık artar: her zaman ulaşabildiğin EN ÜST basamağı kullan.',
          en: 'Your LEGO box has 4 kinds of bricks. On the top shelf sits the lone golden brick (By.id) — since the box has only ONE of each color, you find it blindfolded. One shelf down are name-tagged bricks (By.name). Then bricks you describe by shape+color combos (By.cssSelector: "red AND square AND 4 studs"). On the bottom shelf lives the "brick to the right of the third compartment inside the blue box" description (By.xpath) — correct today, garbage the moment your sibling shakes the box (the DOM changes). Each rung down the ladder makes the description longer and more fragile: always use the HIGHEST rung you can reach.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🔬 CSS Selector Derinliği: QA\'in Günlük Ekmeği', en: '🔬 CSS Selector Depth: a QA\'s Daily Bread' },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `// Attribute esitligi
By.cssSelector("input[data-testid='email-input']");

// Attribute 'ile baslar' (^=): dinamik id'lerin sabit on eki
By.cssSelector("div[id^='order-row-']");

// Attribute 'ile biter' ($=) ve 'icerir' (*=)
By.cssSelector("img[src$='.png']");
By.cssSelector("a[href*='checkout']");

// Hiyerarsi: dogrudan cocuk (>) vs herhangi bir torun (bosluk)
By.cssSelector("form#login > button");     // form'un dogrudan cocugu
By.cssSelector("form#login button");       // form icindeki herhangi bir buton

// Coklu class: HER iki class'a da sahip element (bosluksuz zincir)
By.cssSelector("button.btn.btn-primary");

// n. cocuk: tablonun 3. satiri
By.cssSelector("table#orders tbody tr:nth-child(3)");

// XPath'in CSS'te YAPILAMAYAN isi: metne gore arama
// CSS'te :contains yoktur — bu is icin XPath sart:
By.xpath("//button[normalize-space()='Siparisi Onayla']");

// XPath ekseni: etiketinden input'a gitmek
By.xpath("//label[text()='E-posta']/following-sibling::input");`,
          en: `// Attribute equality
By.cssSelector("input[data-testid='email-input']");

// Attribute 'starts with' (^=): the stable prefix of dynamic ids
By.cssSelector("div[id^='order-row-']");

// Attribute 'ends with' ($=) and 'contains' (*=)
By.cssSelector("img[src$='.png']");
By.cssSelector("a[href*='checkout']");

// Hierarchy: direct child (>) vs any descendant (space)
By.cssSelector("form#login > button");     // direct child of the form
By.cssSelector("form#login button");       // any button inside the form

// Multiple classes: element having BOTH classes (chained, no spaces)
By.cssSelector("button.btn.btn-primary");

// nth child: the 3rd row of the table
By.cssSelector("table#orders tbody tr:nth-child(3)");

// The one job CSS CANNOT do that XPath can: search by text
// There is no :contains in CSS — XPath is required here:
By.xpath("//button[normalize-space()='Confirm Order']");

// XPath axis: from a label to its input
By.xpath("//label[text()='Email']/following-sibling::input");`,
        },
      },
      {
        type: 'heading',
        text: { tr: '🏷️ @FindBy Annotation\'ı: Page Object + PageFactory', en: '🏷️ The @FindBy Annotation: Page Object + PageFactory' },
      },
      {
        type: 'text',
        content: {
          tr: 'findElement(By...) çağrılarını step metotlarının içine serpiştirmek küçük projede işler, ama 40 sayfalık bir uygulamada aynı locator 15 farklı dosyada tekrarlanır — locator değişince 15 yeri bulman gerekir. Page Object Model (POM) bu yüzden vardır: her sayfanın elementleri TEK sınıfta toplanır. @FindBy annotation\'ı bu deseni bildirimsel (declarative) hale getirir: alanın ÜZERİNE nasıl bulunacağını yazarsın, PageFactory.initElements() ise bu alanları doldurur. Kritik mekanizma şudur ve mülakatta sorulur: initElements alanlara GERÇEK WebElement koymaz — dinamik PROXY koyar. Element, alana ilk kez dokunduğun anda (loginButton.click() dediğinde) aranır. Bu yüzden sayfa henüz yüklenmeden PageFactory çalışsa bile hata almazsın; hata, elemente gerçekten dokunduğunda gelir. Java karşılaştırması: bu, java.lang.reflect.Proxy ile yapılan klasik lazy-initialization desenidir — Hibernate\'in lazy loading\'i ile aynı fikir.',
          en: 'Scattering findElement(By...) calls inside step methods works in a small project, but in a 40-page application the same locator repeats across 15 files — when it changes you must hunt down all 15. That is why the Page Object Model (POM) exists: each page\'s elements live in ONE class. The @FindBy annotation makes this pattern declarative: you write HOW to find the element ON the field, and PageFactory.initElements() populates those fields. The critical mechanism — an interview favorite — is this: initElements does NOT put real WebElements into the fields; it injects dynamic PROXIES. The element is looked up the first time you touch the field (when you call loginButton.click()). That is why PageFactory can run before the page even loads without erroring; the error comes when you actually touch the element. Java comparison: this is the classic lazy-initialization pattern built on java.lang.reflect.Proxy — the same idea as Hibernate\'s lazy loading.',
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.*;
import java.util.List;

public class LoginPage {

    // En yaygin kullanim: dogrudan strateji attribute'lari
    @FindBy(id = "username")
    private WebElement usernameInput;

    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;

    // Uzun form: How enum + using — strateji parametrik olsun istenirse
    @FindBy(how = How.XPATH, using = "//div[@role='alert']")
    private WebElement errorBanner;

    // Birden cok element: List<WebElement> otomatik doldurulur
    @FindBy(css = "ul.menu > li")
    private List<WebElement> menuItems;

    // @FindBys = VE zinciri: once .form-group bul, ICINDE input ara
    @FindBys({
        @FindBy(className = "form-group"),
        @FindBy(tagName = "input")
    })
    private List<WebElement> formInputs;

    // @FindAll = VEYA: eski VEYA yeni id'den hangisi varsa onu bul
    // (A/B test edilen arayuzlerde hayat kurtarir)
    @FindAll({
        @FindBy(id = "login-btn"),
        @FindBy(id = "signin-btn")
    })
    private WebElement submitAnyVersion;

    public LoginPage(WebDriver driver) {
        // Proxy'leri enjekte et — elementler HENUZ aranmaz
        PageFactory.initElements(driver, this);
    }

    public void loginAs(String user, String pass) {
        usernameInput.sendKeys(user);   // element ILK BURADA aranir
        loginButton.click();
    }
}`,
          en: `package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.*;
import java.util.List;

public class LoginPage {

    // Most common form: direct strategy attributes
    @FindBy(id = "username")
    private WebElement usernameInput;

    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;

    // Long form: How enum + using — when the strategy should be parametric
    @FindBy(how = How.XPATH, using = "//div[@role='alert']")
    private WebElement errorBanner;

    // Multiple elements: List<WebElement> is populated automatically
    @FindBy(css = "ul.menu > li")
    private List<WebElement> menuItems;

    // @FindBys = AND chain: find .form-group first, search input INSIDE it
    @FindBys({
        @FindBy(className = "form-group"),
        @FindBy(tagName = "input")
    })
    private List<WebElement> formInputs;

    // @FindAll = OR: match whichever of the old OR new id exists
    // (a lifesaver on A/B-tested UIs)
    @FindAll({
        @FindBy(id = "login-btn"),
        @FindBy(id = "signin-btn")
    })
    private WebElement submitAnyVersion;

    public LoginPage(WebDriver driver) {
        // Inject the proxies — elements are NOT looked up yet
        PageFactory.initElements(driver, this);
    }

    public void loginAs(String user, String pass) {
        usernameInput.sendKeys(user);   // the element is looked up HERE first
        loginButton.click();
    }
}`,
        },
      },
      {
        type: 'callout',
        color: 'red',
        emoji: '⚠️',
        title: { tr: '@CacheLookup: İki Ucu Keskin Bıçak', en: '@CacheLookup: a Double-Edged Sword' },
        content: {
          tr: '@FindBy\'ın proxy\'si normalde HER erişimde elementi yeniden arar — yavaş ama güvenli. @CacheLookup eklersen element ilk bulunuşta önbelleğe alınır: statik sayfalarda belirgin hız kazandırır, ama sayfa yeniden render olduğunda (SPA\'lerde, AJAX güncellemelerinde) önbellekteki referans ölür ve StaleElementReferenceException fırlar. Kural: React/Vue/Angular gibi dinamik arayüzlerde @CacheLookup KULLANMA; sadece gerçekten statik (bir kez yüklenip hiç değişmeyen) sayfalarda düşün.',
          en: 'The @FindBy proxy normally re-finds the element on EVERY access — slow but safe. Add @CacheLookup and the element is cached at first lookup: a real speed win on static pages, but when the page re-renders (SPAs, AJAX updates) the cached reference dies and StaleElementReferenceException is thrown. Rule: do NOT use @CacheLookup on dynamic UIs like React/Vue/Angular; consider it only for truly static pages that load once and never change.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧩 @FindBy\'ı Gauge Step\'ine Bağlamak', en: '🧩 Wiring @FindBy into a Gauge Step' },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package steps;

import com.thoughtworks.gauge.Step;
import pages.LoginPage;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginStepsWithPom {

    // Page Object, driver'i DriverFactory'den alarak kurulur
    private final LoginPage loginPage =
        new LoginPage(DriverFactory.getDriver());

    // Spec: * Kullanici "admin" ve "Passw0rd!" ile giris yapar
    @Step("Kullanici <kullanici> ve <sifre> ile giris yapar")
    public void login(String kullanici, String sifre) {
        // Locator detayi burada YOK — hepsi LoginPage'de
        loginPage.loginAs(kullanici, sifre);
    }

    // Spec: * Giris hatasi "Kullanici adi veya sifre hatali" gorunur
    @Step("Giris hatasi <mesaj> gorunur")
    public void verifyError(String mesaj) {
        assertThat(loginPage.getErrorText()).isEqualTo(mesaj);
    }
}`,
          en: `package steps;

import com.thoughtworks.gauge.Step;
import pages.LoginPage;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginStepsWithPom {

    // The Page Object is built with the driver from DriverFactory
    private final LoginPage loginPage =
        new LoginPage(DriverFactory.getDriver());

    // Spec: * User signs in with "admin" and "Passw0rd!"
    @Step("User signs in with <user> and <pass>")
    public void login(String user, String pass) {
        // No locator details here — they all live in LoginPage
        loginPage.loginAs(user, pass);
    }

    // Spec: * The sign-in error "Invalid username or password" is shown
    @Step("The sign-in error <message> is shown")
    public void verifyError(String message) {
        assertThat(loginPage.getErrorText()).isEqualTo(message);
    }
}`,
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'PageFactory.initElements(driver, this) çağrıldığı anda @FindBy alanları için ne olur?',
          en: 'What happens to the @FindBy fields at the moment PageFactory.initElements(driver, this) is called?',
        },
        options: [
          { id: 'a', text: { tr: 'Tüm elementler hemen DOM\'da aranır ve bulunamayanlar exception fırlatır', en: 'All elements are immediately looked up in the DOM and missing ones throw exceptions' } },
          { id: 'b', text: { tr: 'Alanlara dinamik proxy enjekte edilir; gerçek arama alana ilk erişimde yapılır', en: 'Dynamic proxies are injected into the fields; the real lookup happens on first access' } },
          { id: 'c', text: { tr: 'Elementler JSON dosyasına yazılır', en: 'The elements are written to a JSON file' } },
          { id: 'd', text: { tr: 'Sayfanın ekran görüntüsü alınır', en: 'A screenshot of the page is taken' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'initElements gerçek WebElement değil, java.lang.reflect.Proxy tabanlı vekiller yerleştirir. Element, alana ilk dokunduğunda (click/sendKeys) aranır — Hibernate lazy loading ile aynı fikir. Bu yüzden constructor\'da initElements çağırmak, sayfa yüklenmemiş olsa bile güvenlidir.',
          en: 'initElements installs java.lang.reflect.Proxy-based stand-ins, not real WebElements. The element is looked up when the field is first touched (click/sendKeys) — the same idea as Hibernate lazy loading. That is why calling initElements in the constructor is safe even before the page loads.',
        },
        retryQuestion: {
          question: {
            tr: '@FindBy(id="x") alanına sahip Page Object, element sayfada YOKKEN oluşturuluyor ve hata vermiyor. Bunu mümkün kılan mekanizma nedir?',
            en: 'A Page Object with a @FindBy(id="x") field is constructed while the element is NOT on the page, yet no error occurs. What mechanism makes this possible?',
          },
          options: [
            { id: 'a', text: { tr: 'Lazy proxy: arama, alana ilk erişime ertelenir', en: 'The lazy proxy: lookup is deferred to first field access' } },
            { id: 'b', text: { tr: 'Selenium\'un hataları otomatik yutması', en: 'Selenium silently swallowing errors' } },
            { id: 'c', text: { tr: '@CacheLookup annotation\'ı', en: 'The @CacheLookup annotation' } },
            { id: 'd', text: { tr: 'try-catch bloğu', en: 'A try-catch block' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Proxy deseni aramayı erteler: constructor anında DOM\'a hiç gidilmez. NoSuchElementException ancak alana gerçekten dokunulduğunda (ve element o anda da yoksa) fırlar.',
            en: 'The proxy pattern defers the lookup: at construction time the DOM is never touched. NoSuchElementException fires only when the field is actually used (and the element is still missing).',
          },
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'Buton metni "Siparişi Onayla" olan bir elementi bulman gerekiyor; elementin id\'si ve stabil class\'ı yok. Hangi locator şart?',
          en: 'You must find a button whose text is "Confirm Order"; it has no id and no stable class. Which locator is required?',
        },
        options: [
          { id: 'a', text: { tr: 'By.cssSelector("button:contains(\'Siparişi Onayla\')")', en: 'By.cssSelector("button:contains(\'Confirm Order\')")' } },
          { id: 'b', text: { tr: 'By.xpath("//button[normalize-space()=\'Siparişi Onayla\']")', en: 'By.xpath("//button[normalize-space()=\'Confirm Order\']")' } },
          { id: 'c', text: { tr: 'By.className("Siparişi Onayla")', en: 'By.className("Confirm Order")' } },
          { id: 'd', text: { tr: 'By.linkText("Siparişi Onayla")', en: 'By.linkText("Confirm Order")' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'CSS\'te metne göre arama yoktur — :contains standart CSS değildir ve Selenium bunu InvalidSelectorException ile reddeder. By.linkText sadece <a> etiketinde çalışır, buton için geçersiz. Metne göre arama XPath\'in tekelindedir; normalize-space() baştaki/sondaki boşlukları da temizler.',
          en: 'CSS cannot search by text — :contains is not standard CSS and Selenium rejects it with InvalidSelectorException. By.linkText works only on <a> tags, not buttons. Text search is XPath\'s monopoly; normalize-space() also trims leading/trailing whitespace.',
        },
        retryQuestion: {
          question: {
            tr: 'By.className("btn btn-primary") çağrısı ne yapar?',
            en: 'What does the call By.className("btn btn-primary") do?',
          },
          options: [
            { id: 'a', text: { tr: 'Her iki class\'a sahip elementi bulur', en: 'Finds the element having both classes' } },
            { id: 'b', text: { tr: 'InvalidSelectorException fırlatır — className tek class adı kabul eder', en: 'Throws InvalidSelectorException — className accepts a single class name' } },
            { id: 'c', text: { tr: 'İlk class\'ı kullanıp ikincisini yok sayar', en: 'Uses the first class and ignores the second' } },
            { id: 'd', text: { tr: 'İki ayrı element döndürür', en: 'Returns two separate elements' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'By.className boşluk içeren "compound class" kabul etmez. Çoklu class için CSS zinciri kullan: By.cssSelector("button.btn.btn-primary") — boşluksuz nokta zinciri "her ikisine de sahip" demektir.',
            en: 'By.className rejects a "compound class" containing spaces. For multiple classes use a CSS chain: By.cssSelector("button.btn.btn-primary") — the dot chain without spaces means "has both".',
          },
        },
      },
    ],
  },

  // ── 4: JSON Locator Deposu ──────────────────────────────────────────────────
  {
    title: { tr: '🗂️ JSON Locator Deposu', en: '🗂️ JSON Locator Repository' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '📇',
        content: {
          tr: 'JSON locator deposu, bir kütüphanenin kart kataloğudur: kitaplar (elementler) raflardadır, ama HANGİ kitabın HANGİ rafta olduğu bilgisi tek merkezi katalogta (locators.json) tutulur. Kitapların yeri değişince rafları tek tek gezmezsin — sadece katalog kartını güncellersin ve kataloğu kullanan HERKES otomatik doğru rafa gider. @FindBy\'da bu bilgi kodun içine gömülüdür: locator değişince .java dosyasını değiştirir, yeniden derler ve deploy edersin. Peki @FindBy zaten Page Object\'te merkezileştirme yapıyorken neden bir de JSON katmanına ihtiyaç olsun — fazladan dosya, fazladan okuma kodu, ne için? Şunun için: locator\'ı KODDAN VERİYE dönüştürmek üç kapı açar — (1) derleme gerektirmeden düzeltme: UI\'da bir id değişti, JSON\'daki tek satırı düzeltirsin, jar\'ı yeniden build etmezsin; (2) kod yazmayan ekip üyesi de locator güncelleyebilir; (3) aynı locator seti birden çok framework/araç tarafından okunabilir (Java + JS test projesi aynı JSON\'u paylaşabilir). Java karşılaştırması: bu, hard-coded String yerine .properties/config dosyası kullanma kararının birebir aynısıdır — "hangi değerler koddan çıkarılıp konfigürasyona taşınmalı?" sorusunun locator versiyonu. QA bağlamındaki bedeli de dürüstçe bil: JSON\'daki yazım hatasını derleyici YAKALAYAMAZ — @FindBy\'da yanlış alan adı derleme hatasıdır, JSON\'da yanlış anahtar runtime\'da patlar. Bu yüzden depo sınıfın eksik anahtarda sessiz null değil, ANLAŞILIR mesajlı exception fırlatmalıdır — bu sekmedeki LocatorRepository tam bunu yapar.',
          en: 'A JSON locator repository is a library\'s card catalog: the books (elements) sit on shelves, but WHICH book is on WHICH shelf is recorded in one central catalog (locators.json). When books move, you don\'t walk every shelf — you update the catalog card, and EVERYONE using the catalog automatically goes to the right shelf. With @FindBy that knowledge is baked into code: when a locator changes you edit the .java file, recompile, and redeploy. But if @FindBy already centralizes locators in Page Objects, why add a JSON layer — an extra file plus reader code, for what? For this: turning locators from CODE into DATA opens three doors — (1) fixes without compilation: an id changed in the UI, you fix one JSON line, no jar rebuild; (2) non-coding team members can update locators; (3) the same locator set can be read by multiple frameworks/tools (a Java and a JS test project can share one JSON). Java comparison: it is exactly the decision to use a .properties/config file instead of hard-coded Strings — the locator version of "which values should move from code to configuration?". Also know the honest QA cost: the compiler CANNOT catch a typo in JSON — a wrong field name in @FindBy is a compile error, a wrong key in JSON explodes at runtime. That is why the repository class must throw an exception with a CLEAR message on a missing key instead of returning silent null — the LocatorRepository in this tab does exactly that.',
        },
      },
      {
        type: 'heading',
        text: { tr: '📄 Adım 1: locators.json Yapısını Tasarla', en: '📄 Step 1: Design the locators.json Structure' },
      },
      {
        type: 'text',
        content: {
          tr: 'İki seviyeli bir sözlük kullanıyoruz: sayfa adı → element adı → {type, value}. type alanı By stratejisinin adıdır (id, css, xpath, name...), value ise seçicinin kendisidir. Bu yapı bilinçli olarak DÜZ tutulur: iç içe 5 seviye klasörleşen "akıllı" şemalar okunabilirliği öldürür. Dosya src/test/resources altına konur — Maven bunu test classpath\'ine otomatik dahil eder, böylece dosya yolu yerine classpath\'ten okuruz ve testler CI dahil her makinede aynı şekilde çalışır.',
          en: 'We use a two-level dictionary: page name → element name → {type, value}. The type field is the By strategy name (id, css, xpath, name...), and value is the selector itself. The structure is deliberately kept FLAT: "clever" schemas nesting 5 levels deep kill readability. The file goes under src/test/resources — Maven automatically puts it on the test classpath, so we read it from the classpath rather than a file path and tests behave identically on every machine, CI included.',
        },
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "loginPage": {
    "usernameInput": { "type": "id",   "value": "username" },
    "passwordInput": { "type": "id",   "value": "password" },
    "loginButton":   { "type": "css",  "value": "button[type='submit']" },
    "errorBanner":   { "type": "xpath","value": "//div[@role='alert']" }
  },
  "dashboardPage": {
    "welcomeTitle":  { "type": "css",  "value": "h1[data-testid='welcome']" },
    "logoutLink":    { "type": "linkText", "value": "Cikis Yap" },
    "menuItems":     { "type": "css",  "value": "nav ul.menu > li" }
  },
  "checkoutPage": {
    "confirmButton": { "type": "xpath","value": "//button[normalize-space()='Siparisi Onayla']" },
    "totalCell":     { "type": "xpath","value": "//td[text()='Toplam']/following-sibling::td" }
  }
}`,
      },
      {
        type: 'heading',
        text: { tr: '📦 Adım 2: LocatorDef POJO + Jackson ile Okuma', en: '📦 Step 2: The LocatorDef POJO + Reading with Jackson' },
      },
      {
        type: 'text',
        content: {
          tr: 'JSON\'u Java\'ya çevirmek için Jackson kullanıyoruz (pom.xml\'e com.fasterxml.jackson.core:jackson-databind ekle). Hedef tip Map<String, Map<String, LocatorDef>> — dıştaki Map sayfaları, içteki Map elementleri tutar. Jackson\'ın generic Map\'e deserialize edebilmesi için TypeReference gerekir: Java\'nın tip silmesi (type erasure) yüzünden Map.class tek başına iç tipleri taşıyamaz — TypeReference anonim alt sınıfı, generic bilgiyi çalışma zamanına taşıyan standart Jackson çözümüdür.',
          en: 'We use Jackson to turn JSON into Java (add com.fasterxml.jackson.core:jackson-databind to pom.xml). The target type is Map<String, Map<String, LocatorDef>> — the outer Map holds pages, the inner one holds elements. Jackson needs a TypeReference to deserialize into a generic Map: because of Java\'s type erasure, Map.class alone cannot carry the inner types — the TypeReference anonymous subclass is the standard Jackson trick that carries generic info to runtime.',
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package locators;

// LocatorDef: JSON'daki { "type": "...", "value": "..." } karsiligi
public class LocatorDef {
    private String type;
    private String value;

    // Jackson icin bos constructor sart
    public LocatorDef() {}

    public String getType()  { return type; }
    public String getValue() { return value; }
    public void setType(String type)   { this.type = type; }
    public void setValue(String value) { this.value = value; }
}`,
          en: `package locators;

// LocatorDef: maps to { "type": "...", "value": "..." } in the JSON
public class LocatorDef {
    private String type;
    private String value;

    // Jackson requires a no-args constructor
    public LocatorDef() {}

    public String getType()  { return type; }
    public String getValue() { return value; }
    public void setType(String type)   { this.type = type; }
    public void setValue(String value) { this.value = value; }
}`,
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package locators;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.openqa.selenium.By;
import java.io.InputStream;
import java.util.Map;

public class LocatorRepository {

    // Depo bir kez yuklenir, tum testler paylasir (immutable oldugu
    // icin paralel kosumda da guvenlidir)
    private static final Map<String, Map<String, LocatorDef>> LOCATORS = load();

    private static Map<String, Map<String, LocatorDef>> load() {
        // Dosya yolundan DEGIL classpath'ten oku: CI dahil her yerde calisir
        try (InputStream in = LocatorRepository.class
                .getResourceAsStream("/locators.json")) {
            if (in == null) {
                throw new IllegalStateException(
                    "locators.json bulunamadi — src/test/resources altinda mi?");
            }
            return new ObjectMapper().readValue(
                in, new TypeReference<>() {});
        } catch (Exception e) {
            throw new IllegalStateException("locators.json okunamadi", e);
        }
    }

    // Kullanim: LocatorRepository.get("loginPage", "usernameInput")
    public static By get(String page, String element) {
        Map<String, LocatorDef> pageMap = LOCATORS.get(page);
        if (pageMap == null) {
            // Sessiz null YOK: anlasilir mesajla hemen patla
            throw new IllegalArgumentException(
                "Sayfa bulunamadi: '" + page +
                "'. Mevcut sayfalar: " + LOCATORS.keySet());
        }
        LocatorDef def = pageMap.get(element);
        if (def == null) {
            throw new IllegalArgumentException(
                "Element bulunamadi: '" + page + "." + element +
                "'. Mevcut elementler: " + pageMap.keySet());
        }
        return toBy(def);
    }

    // type string'ini By nesnesine cevir — By soyut factory'sinin
    // veri-tabanli (data-driven) hali
    private static By toBy(LocatorDef def) {
        return switch (def.getType()) {
            case "id"              -> By.id(def.getValue());
            case "name"            -> By.name(def.getValue());
            case "css"             -> By.cssSelector(def.getValue());
            case "xpath"           -> By.xpath(def.getValue());
            case "className"       -> By.className(def.getValue());
            case "tagName"         -> By.tagName(def.getValue());
            case "linkText"        -> By.linkText(def.getValue());
            case "partialLinkText" -> By.partialLinkText(def.getValue());
            default -> throw new IllegalArgumentException(
                "Bilinmeyen locator tipi: " + def.getType());
        };
    }
}`,
          en: `package locators;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.openqa.selenium.By;
import java.io.InputStream;
import java.util.Map;

public class LocatorRepository {

    // The repository loads once and is shared by all tests (being
    // immutable, it is also safe under parallel execution)
    private static final Map<String, Map<String, LocatorDef>> LOCATORS = load();

    private static Map<String, Map<String, LocatorDef>> load() {
        // Read from the classpath, NOT a file path: works everywhere, CI included
        try (InputStream in = LocatorRepository.class
                .getResourceAsStream("/locators.json")) {
            if (in == null) {
                throw new IllegalStateException(
                    "locators.json not found — is it under src/test/resources?");
            }
            return new ObjectMapper().readValue(
                in, new TypeReference<>() {});
        } catch (Exception e) {
            throw new IllegalStateException("Could not read locators.json", e);
        }
    }

    // Usage: LocatorRepository.get("loginPage", "usernameInput")
    public static By get(String page, String element) {
        Map<String, LocatorDef> pageMap = LOCATORS.get(page);
        if (pageMap == null) {
            // NO silent null: fail fast with a clear message
            throw new IllegalArgumentException(
                "Page not found: '" + page +
                "'. Available pages: " + LOCATORS.keySet());
        }
        LocatorDef def = pageMap.get(element);
        if (def == null) {
            throw new IllegalArgumentException(
                "Element not found: '" + page + "." + element +
                "'. Available elements: " + pageMap.keySet());
        }
        return toBy(def);
    }

    // Convert the type string into a By object — the data-driven
    // version of the By abstract factory
    private static By toBy(LocatorDef def) {
        return switch (def.getType()) {
            case "id"              -> By.id(def.getValue());
            case "name"            -> By.name(def.getValue());
            case "css"             -> By.cssSelector(def.getValue());
            case "xpath"           -> By.xpath(def.getValue());
            case "className"       -> By.className(def.getValue());
            case "tagName"         -> By.tagName(def.getValue());
            case "linkText"        -> By.linkText(def.getValue());
            case "partialLinkText" -> By.partialLinkText(def.getValue());
            default -> throw new IllegalArgumentException(
                "Unknown locator type: " + def.getType());
        };
    }
}`,
        },
      },
      {
        type: 'heading',
        text: { tr: '🔌 Adım 3: Depoyu Gauge Step\'inde Kullan', en: '🔌 Step 3: Use the Repository in a Gauge Step' },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package steps;

import com.thoughtworks.gauge.Step;
import locators.LocatorRepository;
import org.openqa.selenium.WebDriver;
import static org.assertj.core.api.Assertions.assertThat;

public class JsonLocatorSteps {

    private final WebDriver driver = DriverFactory.getDriver();

    // Spec: * Kullanici "admin" kullanici adini girer
    @Step("Kullanici <kullaniciAdi> kullanici adini girer")
    public void enterUsername(String kullaniciAdi) {
        // Locator kodda degil, locators.json'da yasiyor
        driver.findElement(
            LocatorRepository.get("loginPage", "usernameInput"))
            .sendKeys(kullaniciAdi);
    }

    // Spec: * "dashboardPage" sayfasinda "welcomeTitle" elementi gorunur
    // DIKKAT: sayfa ve element adlari da parametre olabilir —
    // JSON deposu sayesinde TEK generic step yuzlerce dogrulamayi karsilar
    @Step("<sayfa> sayfasinda <element> elementi gorunur")
    public void verifyVisible(String sayfa, String element) {
        assertThat(driver.findElement(
            LocatorRepository.get(sayfa, element)).isDisplayed())
            .isTrue();
    }
}`,
          en: `package steps;

import com.thoughtworks.gauge.Step;
import locators.LocatorRepository;
import org.openqa.selenium.WebDriver;
import static org.assertj.core.api.Assertions.assertThat;

public class JsonLocatorSteps {

    private final WebDriver driver = DriverFactory.getDriver();

    // Spec: * User enters username "admin"
    @Step("User enters username <username>")
    public void enterUsername(String username) {
        // The locator lives in locators.json, not in code
        driver.findElement(
            LocatorRepository.get("loginPage", "usernameInput"))
            .sendKeys(username);
    }

    // Spec: * The "welcomeTitle" element is visible on the "dashboardPage" page
    // NOTE: page and element names can be parameters too — thanks to
    // the JSON repository, ONE generic step covers hundreds of checks
    @Step("The <element> element is visible on the <page> page")
    public void verifyVisible(String element, String page) {
        assertThat(driver.findElement(
            LocatorRepository.get(page, element)).isDisplayed())
            .isTrue();
    }
}`,
        },
      },
      {
        type: 'heading',
        text: { tr: '⚖️ @FindBy vs JSON Deposu: Dürüst Karşılaştırma', en: '⚖️ @FindBy vs JSON Repository: an Honest Comparison' },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Kriter', en: 'Criterion' },
          { tr: '@FindBy (kodda)', en: '@FindBy (in code)' },
          { tr: 'JSON deposu (veride)', en: 'JSON repository (in data)' },
        ],
        rows: [
          [
            { tr: 'Hata yakalama zamanı', en: 'When errors are caught' },
            { tr: '🟢 Derleme zamanı: yanlış alan adı compile error', en: '🟢 Compile time: a wrong field name is a compile error' },
            { tr: '🔴 Çalışma zamanı: yanlış anahtar testte patlar', en: '🔴 Runtime: a wrong key explodes during the test' },
          ],
          [
            { tr: 'Locator değişince', en: 'When a locator changes' },
            { tr: 'Kod değişikliği + derleme + deploy', en: 'Code change + compile + deploy' },
            { tr: '🟢 Tek JSON satırı — build gerekmez', en: '🟢 One JSON line — no build needed' },
          ],
          [
            { tr: 'IDE desteği', en: 'IDE support' },
            { tr: '🟢 Autocomplete, refactoring, kullanım bulma', en: '🟢 Autocomplete, refactoring, find-usages' },
            { tr: '🔴 String anahtar — IDE yardım edemez', en: '🔴 String keys — the IDE cannot help' },
          ],
          [
            { tr: 'Kod yazmayan ekip üyesi', en: 'Non-coding team members' },
            { tr: 'Java bilmek zorunda', en: 'Must know Java' },
            { tr: '🟢 JSON düzenleyebilen herkes katkı verir', en: '🟢 Anyone who can edit JSON contributes' },
          ],
          [
            { tr: 'Diller arası paylaşım', en: 'Cross-language sharing' },
            { tr: 'Sadece Java projeleri', en: 'Java projects only' },
            { tr: '🟢 Java + JS + Python aynı dosyayı okuyabilir', en: '🟢 Java + JS + Python can read the same file' },
          ],
          [
            { tr: 'Lazy loading / proxy', en: 'Lazy loading / proxy' },
            { tr: '🟢 PageFactory proxy\'si yerleşik', en: '🟢 The PageFactory proxy is built in' },
            { tr: 'Yok — findElement çağrı anında arar (zaten istenen bu)', en: 'None — findElement looks up at call time (which is what you want)' },
          ],
          [
            { tr: 'Doğru kullanım alanı', en: 'Right fit' },
            { tr: 'Locator\'ları stabil, Java-ağırlıklı ekip', en: 'Stable locators, Java-heavy team' },
            { tr: 'Sık değişen UI, karma ekip, çok-araçlı stack', en: 'Fast-changing UI, mixed team, multi-tool stack' },
          ],
        ],
      },
      {
        type: 'callout',
        color: 'blue',
        emoji: '🧠',
        title: { tr: 'Akıl Yürütme: İkisini Birlikte Kullanabilir misin?', en: 'Reasoning: Can You Use Both Together?' },
        content: {
          tr: 'Evet — ve olgun framework\'ler genelde bunu yapar: sık değişen, ürün ekibinin dokunduğu locator\'lar JSON\'da; framework\'ün iç sayfaları (login gibi stabil altyapı sayfaları) @FindBy ile kodda tutulur. Karar sorusu şu: "Bu locator\'ı en son KİM, NE SIKLIKLA değiştirecek?" Cevap "geliştirici, nadiren" ise kod; "QA/analist, her sprint" ise JSON. Mimari kararların çoğu gibi bu da teknoloji sorusu değil, ekip ve değişim-hızı sorusudur.',
          en: 'Yes — and mature frameworks usually do: fast-changing locators that product people touch live in JSON, while the framework\'s internal pages (stable infrastructure pages like login) stay in code with @FindBy. The deciding question: "WHO will change this locator last, and HOW often?" If the answer is "a developer, rarely" — code; if "QA/analyst, every sprint" — JSON. Like most architecture decisions, it is not a technology question but a team-and-rate-of-change question.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'JSON locator deposunun @FindBy\'a göre EN önemli dezavantajı nedir?',
          en: 'What is the MOST important disadvantage of a JSON locator repository compared to @FindBy?',
        },
        options: [
          { id: 'a', text: { tr: 'JSON dosyaları Git\'e eklenemez', en: 'JSON files cannot be committed to Git' } },
          { id: 'b', text: { tr: 'Yanlış anahtar derleme zamanında değil, çalışma zamanında yakalanır', en: 'A wrong key is caught at runtime, not compile time' } },
          { id: 'c', text: { tr: 'JSON, XPath değerlerini saklayamaz', en: 'JSON cannot store XPath values' } },
          { id: 'd', text: { tr: 'Paralel koşumda çalışmaz', en: 'It does not work under parallel execution' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Locator\'ı veriye taşımak tip güvenliğinden vazgeçmektir: @FindBy alanındaki hata derlemede yakalanır, JSON anahtarındaki yazım hatası ancak test koşarken patlar. Bu yüzden depo sınıfı eksik anahtarda "Mevcut elementler: [...]" gibi anlaşılır mesajla fail-fast yapmalıdır — sessiz null en kötü senaryodur.',
          en: 'Moving locators into data trades away type safety: an error in a @FindBy field is caught at compile time, while a typo in a JSON key only explodes when the test runs. That is why the repository class must fail fast on missing keys with a clear message like "Available elements: [...]" — silent null is the worst case.',
        },
        retryQuestion: {
          question: {
            tr: 'LocatorRepository.get() eksik anahtarda neden null dönmek yerine exception fırlatıyor?',
            en: 'Why does LocatorRepository.get() throw an exception on a missing key instead of returning null?',
          },
          options: [
            { id: 'a', text: { tr: 'null dönseydi hata, findElement\'te anlamsız bir NullPointerException olarak çok sonra görünürdü', en: 'Returning null would surface much later as a meaningless NullPointerException in findElement' } },
            { id: 'b', text: { tr: 'Java\'da Map null dönemez', en: 'A Java Map cannot return null' } },
            { id: 'c', text: { tr: 'Exception\'lar testi hızlandırır', en: 'Exceptions make tests faster' } },
            { id: 'd', text: { tr: 'Jackson bunu zorunlu kılar', en: 'Jackson mandates it' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Fail-fast ilkesi: hata, kaynağına en yakın yerde ve en açıklayıcı mesajla patlamalıdır. "Element bulunamadi: loginPage.usernameInputt. Mevcut elementler: [...]" mesajı yazım hatasını saniyede gösterir; sessiz null ise üç katman ötede anlamsız NPE üretir.',
            en: 'The fail-fast principle: an error should explode closest to its source with the most descriptive message. "Element not found: loginPage.usernameInputt. Available elements: [...]" reveals the typo in seconds; silent null produces a meaningless NPE three layers away.',
          },
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'LocatorRepository neden locators.json\'u dosya yolundan (new File("C:/proje/locators.json")) değil classpath\'ten okuyor?',
          en: 'Why does LocatorRepository read locators.json from the classpath rather than a file path (new File("C:/project/locators.json"))?',
        },
        options: [
          { id: 'a', text: { tr: 'Classpath okuması daha hızlıdır', en: 'Classpath reads are faster' } },
          { id: 'b', text: { tr: 'Mutlak dosya yolu makineye bağımlıdır; classpath kaynağı CI dahil her ortamda aynı çalışır', en: 'An absolute file path is machine-dependent; a classpath resource works identically in every environment, CI included' } },
          { id: 'c', text: { tr: 'Jackson dosya yolundan okuyamaz', en: 'Jackson cannot read from a file path' } },
          { id: 'd', text: { tr: 'JSON dosyaları sadece classpath\'te olabilir', en: 'JSON files can only exist on the classpath' } },
        ],
        correct: 'b',
        explanation: {
          tr: '"C:/proje/..." yolu senin makinende çalışır, Linux CI agent\'ında çalışmaz. src/test/resources altındaki dosya Maven tarafından test classpath\'ine kopyalanır; getResourceAsStream("/locators.json") böylece Windows\'ta, Mac\'te, Docker\'daki CI\'da aynı şekilde bulur. "Bende çalışıyor" probleminin panzehiridir.',
            en: 'A "C:/project/..." path works on your machine but not on a Linux CI agent. A file under src/test/resources is copied to the test classpath by Maven; getResourceAsStream("/locators.json") therefore finds it identically on Windows, Mac, and a Dockerized CI. It is the antidote to "works on my machine".',
        },
        retryQuestion: {
          question: {
            tr: 'locators.json hangi klasöre konmalı ki Maven onu test classpath\'ine otomatik dahil etsin?',
            en: 'In which folder should locators.json live so Maven automatically puts it on the test classpath?',
          },
          options: [
            { id: 'a', text: { tr: 'src/test/resources', en: 'src/test/resources' } },
            { id: 'b', text: { tr: 'projenin kök dizini', en: 'the project root' } },
            { id: 'c', text: { tr: 'target/classes', en: 'target/classes' } },
            { id: 'd', text: { tr: 'C:/temp', en: 'C:/temp' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Maven konvansiyonu: src/test/resources altındaki her şey test derlemesinde classpath\'e kopyalanır. target/ build çıktısıdır (elle dosya konmaz), kök dizin ve C:/temp classpath\'te değildir.',
            en: 'Maven convention: everything under src/test/resources is copied to the classpath during the test build. target/ is build output (never hand-place files there); the project root and C:/temp are not on the classpath.',
          },
        },
      },
    ],
  },

  // ── 5: Ekosistem & CI/CD ─────────────────────────────────────────────────────
  {
    title: { tr: '🌍 Ekosistem & CI/CD', en: '🌍 Ecosystem & CI/CD' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎭',
        content: {
          tr: 'env/ klasörü, bir tiyatro topluluğunun turne düzenine benzer: aynı oyun metni (Java step kodu) İstanbul\'da, İzmir\'de ve Ankara\'da oynanır — oyuncular repliklerini şehre göre değiştirmez, ama her şehrin sahne ekibi ışık/ses ayarlarını (base URL, timeout, kimlik bilgileri) o salona göre yeniden kurar. gauge run --env test dediğinde topluluk "bu gece hangi salondayız" sorusunu cevaplar, oyunun metnine hiç dokunmadan. Peki Java kodunun içinde zaten System.getenv() ile ortam değişkeni okuyabiliyorken neden ayrı bir env/ klasör yapısına ihtiyaç var? Çünkü System.getenv() konfigürasyonu koda GÖMER — her yeni ortam için ya kod değişir ya da bir sürü if/else üretilir; env/ klasörü ise konfigürasyonu koddan tamamen AYIRIR, yeni bir ortam eklemek yeni bir Java satırı değil yeni bir properties dosyası demektir. Bu, Java\'da Spring\'in @ActiveProfiles veya Maven\'ın -P (profiles) mekanizmasıyla birebir aynı felsefedir: "hangi ortamdayım" sorusunun cevabı komut satırından gelir, kod bundan habersizdir. QA bağlamındaki gerçek risk şudur: base URL koda hardcode edilmişse, bir geliştirici "hızlıca test edeyim" derken staging\'e işaret eden bir testi yanlışlıkla prod\'a karşı koşturabilir — üretim verisini kirletebilir. env/ klasörü ve CI\'da hangi --env flag\'inin geçildiğinin pipeline tanımında AÇIKÇA görünmesi, bu hatayı kod incelemesinde yakalanabilir hale getirir.',
          en: 'The env/ folder resembles a theater troupe\'s touring schedule: the same script (Java step code) is performed in Istanbul, Izmir, and Ankara — the actors do not change their lines by city, but each city\'s stage crew reconfigures the lighting/sound (base URL, timeout, credentials) for that specific venue. When you run gauge run --env test, the troupe answers "which venue are we in tonight" without ever touching the script. But if Java code can already read an environment variable with System.getenv(), why do you need a separate env/ folder structure? Because System.getenv() BAKES the configuration into the code — every new environment means either changed code or a pile of if/else branches; the env/ folder SEPARATES configuration from code entirely, so adding a new environment means a new properties file, not a new Java line. This is exactly the same philosophy as Spring\'s @ActiveProfiles or Maven\'s -P (profiles) mechanism in Java: the answer to "which environment am I in" comes from the command line, and the code stays oblivious to it. The real QA risk: if the base URL is hardcoded, a developer saying "let me quickly test this" could accidentally point a test meant for staging at prod — polluting production data. Having the env/ folder and the --env flag passed in CI visible EXPLICITLY in the pipeline definition makes this mistake catchable in code review.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🗂️ env/ Klasörü ve Ortam Yönetimi', en: '🗂️ The env/ Folder and Environment Management' },
      },
      {
        type: 'text',
        content: {
          tr: 'gauge init java her zaman env/default/ klasörünü oluşturur; içindeki default.properties dosyası her koşumda otomatik yüklenir. Başka bir ortam eklemek için env/ altında yeni bir klasör açman yeterlidir — örneğin env/test/. Gauge, --env test bayrağı verildiğinde önce env/default/ altındakileri, sonra env/test/ altındakileri (varsa aynı anahtarı ezerek) yükler. Böylece test ortamı sadece FARKLI olan anahtarları (base.url gibi) tanımlar, ortak ayarları tekrar yazmaz.',
          en: 'gauge init java always creates the env/default/ folder; the default.properties file inside it loads automatically on every run. To add another environment, you just create a new folder under env/ — for example env/test/. When the --env test flag is given, Gauge loads env/default/ first, then env/test/ (overriding the same keys if present, when they exist). This way the test environment only defines the keys that DIFFER (like base.url), without repeating the shared settings.',
        },
      },
      {
        type: 'code',
        language: 'properties',
        code: {
          tr: `# env/default/default.properties
# Tum ortamlarda ortak olan, nadiren degisen ayarlar burada durur
gauge_reports_dir = reports
screenshot_on_failure = true
overwrite_reports = true

# env/test/default.properties
# Sadece test ortamina ozgu, default'u EZEN anahtarlar
base.url = https://test.learnqa-demo.dev
implicit.wait.seconds = 15

# env/staging/default.properties
# Ayni anahtar, farkli deger — Java kodu hic degismez
base.url = https://staging.learnqa-demo.dev
implicit.wait.seconds = 10`,
          en: `# env/default/default.properties
# Settings shared across all environments, rarely change
gauge_reports_dir = reports
screenshot_on_failure = true
overwrite_reports = true

# env/test/default.properties
# Keys specific to the test environment, OVERRIDING default's
base.url = https://test.learnqa-demo.dev
implicit.wait.seconds = 15

# env/staging/default.properties
# Same key, different value — the Java code never changes
base.url = https://staging.learnqa-demo.dev
implicit.wait.seconds = 10`,
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `package config;

public class EnvConfig {

    // System.getProperty degil — Gauge, env/ dosyasindaki anahtarlari
    // otomatik olarak Java System Properties'e yukler, bu yuzden
    // System.getProperty ile okunabilirler
    public static String baseUrl() {
        return System.getProperty("base.url");
    }

    public static int implicitWaitSeconds() {
        return Integer.parseInt(
            System.getProperty("implicit.wait.seconds", "10"));
    }
}`,
          en: `package config;

public class EnvConfig {

    // Not a custom loader — Gauge automatically loads keys from the
    // env/ file into Java System Properties, so they can be read
    // with System.getProperty
    public static String baseUrl() {
        return System.getProperty("base.url");
    }

    public static int implicitWaitSeconds() {
        return Integer.parseInt(
            System.getProperty("implicit.wait.seconds", "10"));
    }
}`,
        },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# Varsayilan (env/default) ile kos
gauge run specs

# Test ortami ayarlariyla kos — env/default + env/test birlesir
gauge run --env test specs

# Staging ortami ayarlariyla kos
gauge run --env staging specs`,
          en: `# Run with the default environment (env/default)
gauge run specs

# Run with test environment settings — env/default + env/test merge
gauge run --env test specs

# Run with staging environment settings
gauge run --env staging specs`,
        },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Kavram', en: 'Concept' },
          { tr: 'Maven', en: 'Maven' },
          'Gauge',
        ],
        rows: [
          [
            { tr: 'Ortam seçimi', en: 'Environment selection' },
            'mvn test -P staging',
            'gauge run --env staging specs',
          ],
          [
            { tr: 'Konfigürasyon dosyası', en: 'Configuration file' },
            { tr: 'pom.xml içindeki <profile> bloğu', en: 'A <profile> block inside pom.xml' },
            { tr: 'env/staging/ altındaki .properties dosyaları', en: '.properties files under env/staging/' },
          ],
          [
            { tr: 'Ortak ayarların yönetimi', en: 'Managing shared settings' },
            { tr: 'Üst profil veya <properties> bloğunda tanımlanır', en: 'Defined in a parent profile or a <properties> block' },
            { tr: 'env/default/ — her ortamda otomatik yüklenir', en: 'env/default/ — auto-loaded in every environment' },
          ],
          [
            { tr: 'Java kodu bundan haberdar mı?', en: 'Is the Java code aware of this?' },
            { tr: 'Hayır — properties injection ile enjekte edilir', en: 'No — injected via properties injection' },
            { tr: 'Hayır — System.getProperty ile şeffafça okunur', en: 'No — read transparently via System.getProperty' },
          ],
        ],
      },
      {
        type: 'heading',
        text: { tr: '⚙️ GitHub Actions ile CI Pipeline', en: '⚙️ CI Pipeline with GitHub Actions' },
      },
      {
        type: 'text',
        content: {
          tr: 'Aşağıdaki pipeline dört adımı takip eder: kaynak kodu al, JDK ve Gauge\'ü kur, testleri koştur, raporu paylaşılabilir bir artifact olarak yükle. Kritik nokta: java plugin kurulumundan hemen sonra gauge version çalıştırarak plugin\'in gerçekten listelendiğini doğrulamak — aksi halde eksik plugin hatası gauge run adımına kadar gizli kalır ve hangi adımın gerçek sebep olduğunu anlamak zorlaşır.',
          en: 'The pipeline below follows four steps: fetch the source, install JDK and Gauge, run the tests, upload the report as a shareable artifact. The critical point: run gauge version right after installing the java plugin to verify it is actually listed — otherwise a missing-plugin error stays hidden until the gauge run step, making it harder to tell which step is the real cause.',
        },
      },
      {
        type: 'code',
        language: 'yaml',
        code: {
          tr: `name: Gauge E2E Testleri

on:
  pull_request:
    branches: [main]

jobs:
  gauge-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Kaynak kodu al
        uses: actions/checkout@v4

      - name: JDK 17 kur
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Gauge CLI kur
        run: |
          curl -SsL https://downloads.gauge.org/stable | sh
          gauge version

      - name: Java ve HTML rapor plugin'lerini kur
        run: |
          gauge install java
          gauge install html-report
          # Plugin listesini burada dogrula — eksikse build burada
          # ACIKCA kirilir, gauge run adimina kadar sessiz kalmaz
          gauge version

      - name: Smoke testlerini kostur
        run: gauge run --env ci --tags "smoke" specs

      - name: HTML raporunu artifact olarak yukle
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: gauge-html-report
          path: reports/html-report/`,
          en: `name: Gauge E2E Tests

on:
  pull_request:
    branches: [main]

jobs:
  gauge-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Install JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Install the Gauge CLI
        run: |
          curl -SsL https://downloads.gauge.org/stable | sh
          gauge version

      - name: Install java and html-report plugins
        run: |
          gauge install java
          gauge install html-report
          # Verify the plugin list here — if missing, the build
          # fails EXPLICITLY here, not silently until gauge run
          gauge version

      - name: Run smoke tests
        run: gauge run --env ci --tags "smoke" specs

      - name: Upload the HTML report as an artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: gauge-html-report
          path: reports/html-report/`,
        },
      },
      {
        type: 'heading',
        text: { tr: '🏗️ Jenkins Pipeline Karşılığı', en: '🏗️ The Jenkins Pipeline Equivalent' },
      },
      {
        type: 'code',
        language: 'groovy',
        code: {
          tr: `pipeline {
    agent any

    tools {
        jdk 'temurin-17'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Gauge Kurulumu') {
            steps {
                sh 'curl -SsL https://downloads.gauge.org/stable | sh'
                sh 'gauge install java'
                sh 'gauge install html-report'
                sh 'gauge install xml-report'
                // Plugin dogrulamasi — eksikse pipeline burada durur
                sh 'gauge version'
            }
        }
        stage('Smoke Testleri') {
            steps {
                sh 'gauge run --env ci --tags "smoke" specs'
            }
        }
    }

    post {
        always {
            // Test fail etse bile JUnit-uyumlu XML raporu yayinla
            junit 'reports/xml-report/*.xml'
            archiveArtifacts artifacts: 'reports/html-report/**',
                allowEmptyArchive: true
        }
    }
}`,
          en: `pipeline {
    agent any

    tools {
        jdk 'temurin-17'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Gauge Setup') {
            steps {
                sh 'curl -SsL https://downloads.gauge.org/stable | sh'
                sh 'gauge install java'
                sh 'gauge install html-report'
                sh 'gauge install xml-report'
                // Plugin verification — pipeline stops here if missing
                sh 'gauge version'
            }
        }
        stage('Smoke Tests') {
            steps {
                sh 'gauge run --env ci --tags "smoke" specs'
            }
        }
    }

    post {
        always {
            // Publish JUnit-compatible XML even if tests failed
            junit 'reports/xml-report/*.xml'
            archiveArtifacts artifacts: 'reports/html-report/**',
                allowEmptyArchive: true
        }
    }
}`,
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'GitHub Actions pipeline\'ında "java plugin\'lerini kur" adımından hemen sonra gauge version çalıştırmanın amacı nedir?',
          en: 'What is the purpose of running gauge version right after the "install java plugins" step in the GitHub Actions pipeline?',
        },
        options: [
          { id: 'a', text: { tr: 'Sadece kozmetik bir log satırı eklemek', en: 'Just adding a cosmetic log line' } },
          { id: 'b', text: { tr: 'Plugin kurulumunun gerçekten başarılı olduğunu o adımda doğrulayıp, eksikse hatayı gauge run adımına kadar saklamamak', en: 'Verifying the plugin install actually succeeded right there, so a missing plugin does not stay hidden until the gauge run step' } },
          { id: 'c', text: { tr: 'JDK sürümünü değiştirmek', en: 'Changing the JDK version' } },
          { id: 'd', text: { tr: 'Testleri paralel koşturmak', en: 'Running the tests in parallel' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Plugin kurulumu sessizce başarısız olabilir (network hatası, yanlış sürüm). Kurulumdan hemen sonra gauge version ile plugin listesini kontrol etmek, hatayı en yakın adımda yakalar — aksi halde hata sadece gauge run çalıştığında "Failed to start gauge API" olarak ortaya çıkar ve kök sebep pipeline loglarında gömülü kalır.',
          en: 'Plugin installation can fail silently (network error, wrong version). Checking the plugin list with gauge version right after installation catches the error at the closest possible step — otherwise it only surfaces as "Failed to start gauge API" when gauge run executes, with the root cause buried in the pipeline logs.',
        },
        retryQuestion: {
          question: {
            tr: 'Jenkinsfile\'daki post { always { ... } } bloğunun içine junit ve archiveArtifacts adımlarının konmasının sebebi nedir?',
            en: 'Why are the junit and archiveArtifacts steps placed inside the post { always { ... } } block in the Jenkinsfile?',
          },
          options: [
            { id: 'a', text: { tr: 'always bloğu, testler fail etse bile çalışır — rapor her koşulda yayınlanır', en: 'The always block runs even if tests fail — the report is published in every case' } },
            { id: 'b', text: { tr: 'always bloğu sadece testler geçince çalışır', en: 'The always block only runs when tests pass' } },
            { id: 'c', text: { tr: 'Bu bloğun raporlamayla hiçbir ilgisi yok', en: 'This block has nothing to do with reporting' } },
            { id: 'd', text: { tr: 'archiveArtifacts sadece Docker\'da çalışır', en: 'archiveArtifacts only works in Docker' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'always, pipeline\'ın sonucundan (SUCCESS/FAILURE) bağımsız her zaman çalışır. Eğer rapor yayınlama normal stage\'lerin içine konsaydı ve bir test fail etseydi, pipeline daha o an durur ve rapor hiç üretilmezdi — oysa raporun asıl değeri tam da FAIL durumunda ortaya çıkar.',
            en: 'always runs regardless of the pipeline outcome (SUCCESS/FAILURE). If report publishing were placed inside a normal stage and a test failed, the pipeline would stop right there and no report would ever be produced — yet the report\'s real value shows up precisely in the FAIL case.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '⚡ Paralel Koşum Derinliği: DataStore Katmanları', en: '⚡ Parallel Execution Depth: DataStore Layers' },
      },
      {
        type: 'text',
        content: {
          tr: 'gauge run --parallel -n 4 koşumu 4 ayrı süreç (process) arasında böler — her süreç kendi JVM\'ini çalıştırır, bu yüzden bir sürecin çökmesi diğerlerini etkilemez. Ama paralel koşumda en büyük tuzak, senaryolar arasında veri paylaşmak için static bir alan kullanmaktır: iki senaryo aynı anda aynı static Map\'e yazarsa veri bozulur. Gauge bu problemi ScenarioDataStore, SpecDataStore ve SuiteDataStore ile çözer — kapsamları farklıdır ve her biri kendi ömrü bitince veriyi otomatik temizler.',
          en: 'A gauge run --parallel -n 4 execution splits across 4 separate processes — each process runs its own JVM, so one process crashing does not affect the others. But the biggest trap in parallel execution is using a static field to share data between scenarios: if two scenarios write to the same static Map at once, the data gets corrupted. Gauge solves this with ScenarioDataStore, SpecDataStore, and SuiteDataStore — each has a different scope and automatically clears its data when its lifetime ends.',
        },
      },
      {
        type: 'code',
        language: 'java',
        code: {
          tr: `import com.thoughtworks.gauge.Step;
import com.thoughtworks.gauge.datastore.ScenarioDataStore;
import com.thoughtworks.gauge.datastore.SpecDataStore;
import com.thoughtworks.gauge.datastore.SuiteDataStore;

public class OrderSteps {

    // SuiteDataStore: TUM kosum boyunca yasar — orn. @BeforeSuite'te
    // alinan bir auth token'i tum spec dosyalari arasinda paylas
    @Step("Sistem yoneticisi olarak oturum ac")
    public void authenticateAsAdmin() {
        String token = AuthClient.login("admin", "Passw0rd!");
        SuiteDataStore.put("adminToken", token);
    }

    // SpecDataStore: bir .spec dosyasindaki TUM senaryolar boyunca yasar
    @Step("Test kullanicisi olustur")
    public void createTestUser() {
        String userId = UserFactory.createRandomUser();
        SpecDataStore.put("testUserId", userId);
    }

    // ScenarioDataStore: SADECE bu senaryo boyunca yasar — paralel
    // sureclerde bile baska bir senaryoyla asla karismaz
    @Step("Yeni bir siparis olustur")
    public void createOrder() {
        String orderId = OrderClient.create(
            (String) SpecDataStore.get("testUserId"));
        ScenarioDataStore.put("orderId", orderId);
    }

    @Step("Siparis basariyla olusturuldugunu dogrula")
    public void verifyOrderCreated() {
        String orderId = (String) ScenarioDataStore.get("orderId");
        // orderId sadece bu senaryoya ait — baska bir paralel
        // senaryonun orderId'siyle CAKISMAZ
        assert OrderClient.exists(orderId);
    }
}`,
          en: `import com.thoughtworks.gauge.Step;
import com.thoughtworks.gauge.datastore.ScenarioDataStore;
import com.thoughtworks.gauge.datastore.SpecDataStore;
import com.thoughtworks.gauge.datastore.SuiteDataStore;

public class OrderSteps {

    // SuiteDataStore: lives for the ENTIRE run — e.g. share an auth
    // token obtained in @BeforeSuite across all spec files
    @Step("Sign in as an administrator")
    public void authenticateAsAdmin() {
        String token = AuthClient.login("admin", "Passw0rd!");
        SuiteDataStore.put("adminToken", token);
    }

    // SpecDataStore: lives across ALL scenarios in one .spec file
    @Step("Create a test user")
    public void createTestUser() {
        String userId = UserFactory.createRandomUser();
        SpecDataStore.put("testUserId", userId);
    }

    // ScenarioDataStore: lives ONLY for this scenario — never
    // collides with another scenario even under parallel execution
    @Step("Create a new order")
    public void createOrder() {
        String orderId = OrderClient.create(
            (String) SpecDataStore.get("testUserId"));
        ScenarioDataStore.put("orderId", orderId);
    }

    @Step("Verify the order was created successfully")
    public void verifyOrderCreated() {
        String orderId = (String) ScenarioDataStore.get("orderId");
        // orderId belongs only to this scenario — it never COLLIDES
        // with another parallel scenario's orderId
        assert OrderClient.exists(orderId);
    }
}`,
        },
      },
      {
        type: 'table',
        headers: [
          'DataStore',
          { tr: 'Ömür (Scope)', en: 'Lifetime (Scope)' },
          { tr: 'TestNG karşılığı', en: 'TestNG equivalent' },
        ],
        rows: [
          [
            'ScenarioDataStore',
            { tr: 'Tek senaryo boyunca', en: 'For a single scenario' },
            { tr: 'Bir test metodu içindeki yerel değişken', en: 'A local variable inside one test method' },
          ],
          [
            'SpecDataStore',
            { tr: 'Bir .spec dosyasındaki tüm senaryolar boyunca', en: 'Across all scenarios in one .spec file' },
            { tr: '@BeforeClass ile kurulan bir instance alanı', en: 'An instance field set up in @BeforeClass' },
          ],
          [
            'SuiteDataStore',
            { tr: 'Tüm koşum boyunca (tüm spec dosyaları)', en: 'For the entire run (all spec files)' },
            { tr: 'ThreadLocal veya @BeforeSuite ile kurulan static alan', en: 'A ThreadLocal or a static field set up in @BeforeSuite' },
          ],
        ],
      },
      {
        type: 'heading',
        text: { tr: '📊 Rapor Ekosistemi', en: '📊 The Reporting Ecosystem' },
      },
      {
        type: 'text',
        content: {
          tr: 'Üç farklı rapor plugin\'i üç farklı okuyucuya hizmet eder: html-report insan gözü için tasarlanmıştır (adım adım, PASS/FAIL renkli, ekran görüntülü); xml-report makine tüketimi içindir — CI araçlarının JUnit formatında okuyup test sonuçlarını görselleştirmesini sağlar (Jenkinsin junit adımı tam olarak bunu bekler); spectacle ise spec dosyalarını statik bir HTML dokümantasyon sitesine dönüştürür — paydaşların koşum olmadan bile senaryoları gezinerek okumasını sağlar. Flaky bir koşumdan sonra sadece başarısız olan senaryoları tekrar koşturmak için gauge run --failed kullanılır — tüm suite\'i baştan koşturmadan hızlı bir doğrulama sağlar.',
          en: 'Three different report plugins serve three different readers: html-report is built for the human eye (step-by-step, PASS/FAIL colored, with screenshots); xml-report is for machine consumption — it lets CI tools read JUnit-format results and visualize them (Jenkins\'s junit step expects exactly this); spectacle turns spec files into a static HTML documentation site — letting stakeholders browse and read scenarios even without a run. After a flaky run, gauge run --failed re-runs only the scenarios that failed — giving a quick verification without re-running the whole suite from scratch.',
        },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# xml-report plugin'ini kur (CI/JUnit entegrasyonu icin)
gauge install xml-report

# spectacle plugin'ini kur (statik dokumantasyon sitesi icin)
gauge install spectacle

# Son kosumda BASARISIZ olan senaryolari tekrar kostur
gauge run --failed

# spectacle ile HTML dokumantasyon uret (koşum gerekmez)
gauge docs spectacle specs`,
          en: `# Install the xml-report plugin (for CI/JUnit integration)
gauge install xml-report

# Install the spectacle plugin (for a static documentation site)
gauge install spectacle

# Re-run only the scenarios that FAILED in the last run
gauge run --failed

# Generate HTML documentation with spectacle (no run needed)
gauge docs spectacle specs`,
        },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Rapor Plugin\'i', en: 'Report Plugin' },
          { tr: 'Hedef Okuyucu', en: 'Target Reader' },
          { tr: 'Tipik Kullanım', en: 'Typical Use' },
        ],
        rows: [
          [
            'html-report',
            { tr: 'İnsan (QA, geliştirici)', en: 'Human (QA, developer)' },
            { tr: 'PR\'da paylaşılan artifact, debug için ekran görüntüleri', en: 'Artifact shared on a PR, screenshots for debugging' },
          ],
          [
            'xml-report',
            { tr: 'Makine (CI aracı)', en: 'Machine (CI tool)' },
            { tr: 'Jenkins junit adımı, test sonucu görselleştirme dashboard\'ları', en: 'Jenkins\'s junit step, test-result visualization dashboards' },
          ],
          [
            'spectacle',
            { tr: 'Paydaş (ürün yöneticisi, iş analisti)', en: 'Stakeholder (product manager, business analyst)' },
            { tr: 'Koşum olmadan gezinerek okunan statik dokümantasyon sitesi', en: 'A static documentation site browsed without needing a run' },
          ],
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Paralel koşumda (--parallel -n 4) iki senaryonun ortak bir static Map yerine ScenarioDataStore kullanması neden daha güvenlidir?',
          en: 'Why is it safer for two scenarios in a parallel run (--parallel -n 4) to use ScenarioDataStore instead of a shared static Map?',
        },
        options: [
          { id: 'a', text: { tr: 'ScenarioDataStore daha hızlı çalışır', en: 'ScenarioDataStore runs faster' } },
          { id: 'b', text: { tr: 'ScenarioDataStore her senaryoya izole bir veri alanı sağlar; static Map ise paylaşılır ve paralel yazımlarda veri bozulur', en: 'ScenarioDataStore gives each scenario an isolated data space; a static Map is shared and gets corrupted under parallel writes' } },
          { id: 'c', text: { tr: 'static alanlar Java\'da yasaktır', en: 'static fields are forbidden in Java' } },
          { id: 'd', text: { tr: 'ScenarioDataStore sadece tek süreçte çalışır', en: 'ScenarioDataStore only works in a single process' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Bir static Map tüm senaryolar tarafından paylaşılan tek bir bellek alanıdır — iki senaryo aynı anda aynı anahtara yazarsa biri diğerinin verisini ezer. ScenarioDataStore her senaryo için ayrı bir veri alanı sağlar ve senaryo bitince otomatik temizlenir; bu, Java\'da ThreadLocal kullanmanın motive ettiği aynı izolasyon problemidir.',
          en: 'A static Map is a single memory space shared by all scenarios — if two scenarios write to the same key at once, one overwrites the other\'s data. ScenarioDataStore provides a separate data space per scenario and clears it automatically when the scenario ends; it is the same isolation problem that motivates using ThreadLocal in Java.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir spec dosyasındaki 5 senaryonun hepsinin aynı test kullanıcısını (dosya başında bir kez oluşturulan) paylaşması gerekiyor. Hangi DataStore kullanılır?',
            en: 'All 5 scenarios in a spec file need to share the same test user (created once at the top of the file). Which DataStore is used?',
          },
          options: [
            { id: 'a', text: { tr: 'SpecDataStore — bir .spec dosyasındaki tüm senaryolar boyunca yaşar', en: 'SpecDataStore — lives across all scenarios in one .spec file' } },
            { id: 'b', text: { tr: 'ScenarioDataStore — sadece tek senaryo boyunca yaşar', en: 'ScenarioDataStore — lives for only one scenario' } },
            { id: 'c', text: { tr: 'SuiteDataStore — tüm koşum boyunca yaşar', en: 'SuiteDataStore — lives for the entire run' } },
            { id: 'd', text: { tr: 'Hiçbiri, her senaryo kendi kullanıcısını oluşturmalı', en: 'None — each scenario should create its own user' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'SpecDataStore tam olarak "bir dosya, birden fazla senaryo" kapsamı için tasarlanmıştır. ScenarioDataStore çok dar kalır (her senaryo kendi kullanıcısını oluşturmak zorunda kalır), SuiteDataStore ise çok geniştir (diğer spec dosyalarıyla da paylaşılır, gereksiz kapsam genişlemesi olur).',
            en: 'SpecDataStore is designed exactly for the "one file, multiple scenarios" scope. ScenarioDataStore would be too narrow (forcing each scenario to create its own user), while SuiteDataStore would be too broad (shared with other spec files too, an unnecessary scope expansion).',
          },
        },
      },
    ],
  },

  // ── 6: Gerçek Hayat Sorunları ───────────────────────────────────────────────
  {
    title: { tr: '🚨 Gerçek Hayat Sorunları', en: '🚨 Real-Life Issues' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🩺',
        content: {
          tr: 'Hata mesajı okumak, doktorun semptomdan teşhise gitmesi gibidir: ateş (kırmızı test) tek başına hastalığı söylemez — doktor ateşin YANINDAKİ bulgulara bakar (boğaz mı ağrıyor, öksürük mü var?). Gauge + Selenium yığınında da aynı hata rengi (FAIL) en az dört farklı katmandan gelebilir: Gauge çekirdeği (plugin eksik), spec-kod eşleşmesi (step bulunamadı), Selenium (element bulunamadı) veya senin locator deposun (anahtar yanlış). Peki neden hataları ezberlemek yerine KATMANINI teşhis etmeyi öğreniyoruz? Çünkü mesajlar sürümden sürüme değişir ama katman mimarisi değişmez: "hangi katman konuşuyor?" sorusuna cevap verebilen QA, hiç görmediği hatayı da çözer. Java karşılaştırması: stack trace okumayı bilen geliştirici Caused by zincirinin EN ALTINA iner — yüzeydeki exception çoğu zaman asıl sebebin ambalajıdır; Gauge\'de de "Step failed" yüzeydir, altındaki gerçek exception\'a inmen gerekir. QA bağlamındaki gerçek maliyet şudur: teşhis edilemeyen flaky hata "testi 3 kez koştur, geçerse merge et" kültürünü doğurur — bu noktada test suite artık kalite kapısı değil, ritüeldir. Aşağıdaki 8 hata, sahada en sık karşılaşacağın senaryolardır; her birinde önce mesajı, sonra katmanını, sonra kalıcı çözümü öğren.',
          en: 'Reading an error message is like a doctor going from symptom to diagnosis: fever (a red test) alone names no disease — the doctor examines what accompanies it (sore throat? cough?). In the Gauge + Selenium stack the same failure color (FAIL) can come from at least four layers: the Gauge core (missing plugin), the spec-code binding (step not found), Selenium (element not found), or your own locator repository (wrong key). Why learn to diagnose the LAYER instead of memorizing errors? Because messages change between versions but the layer architecture does not: a QA who can answer "which layer is speaking?" also solves errors they have never seen. Java comparison: a developer who reads stack traces descends to the BOTTOM of the Caused-by chain — the surface exception is usually just packaging around the real cause; likewise in Gauge, "Step failed" is the surface and you must descend to the actual exception beneath. The real QA cost: an undiagnosed flaky failure breeds the "run it 3 times, merge if it passes" culture — at that point the suite is no longer a quality gate, it is a ritual. The 8 errors below are the scenarios you will meet most in the field; for each, learn the message first, then its layer, then the permanent fix.',
        },
      },
      {
        type: 'error-dictionary',
        relatedTopicId: 'gauge-real-life-issues',
        framework: 'Gauge + Selenium',
        errors: [
          {
            error: 'Failed to start gauge API: Plugin java not installed',
            fullMessage: 'Error ----\n[Gauge] Failed to start gauge API: Plugin \'java\' not installed on following locations : [~/.gauge/plugins]',
            cause: {
              tr: 'Gauge çekirdeği kurulu ama java dil plugin\'i yok. En sık: yeni CI agent\'ı veya yeni geliştirici makinesi kurulumunda plugin adımı atlanmış.',
              en: 'The Gauge core is installed but the java language plugin is missing. Most common on fresh CI agents or new developer machines where the plugin step was skipped.',
            },
            solution: {
              tr: 'gauge install java çalıştır. CI imajına/Dockerfile\'a bu komutu sabitle. gauge version çıktısında java plugin\'ini görmeden koşum deneme.',
              en: 'Run gauge install java. Bake the command into the CI image/Dockerfile. Do not attempt a run before gauge version lists the java plugin.',
            },
            codeWrong: `# CI kurulum adimi (eksik)
choco install gauge
gauge run specs   # Plugin 'java' not installed!`,
            codeFixed: `# CI kurulum adimi (tam)
choco install gauge
gauge install java
gauge install html-report
gauge run specs`,
          },
          {
            error: 'Step implementation not found',
            fullMessage: 'Error Message: Step implementation not found => \'Kullanici cikis yapar\'',
            cause: {
              tr: 'Spec\'teki cümle ile @Step annotation metni birebir eşleşmiyor: tek karakter, boşluk veya parametre yer tutucusu farkı yeterli. Ya da step sınıfı derlenmemiş/yanlış pakette.',
              en: 'The spec sentence and the @Step annotation text do not match exactly: a single character, whitespace, or parameter placeholder difference is enough. Or the step class did not compile / is in the wrong package.',
            },
            solution: {
              tr: 'IDE\'nin Gauge plugin\'iyle spec\'ten implementasyona Ctrl+B ile gitmeyi dene — gidilemiyorsa eşleşme kopuk. Spec cümlesini kopyalayıp @Step("...") içine aynen yapıştır.',
              en: 'Try jumping from the spec to the implementation with Ctrl+B via the IDE\'s Gauge plugin — if the jump fails, the binding is broken. Copy the spec sentence and paste it verbatim into @Step("...").',
            },
            codeWrong: `// Spec:  * Kullanici cikis yapar
@Step("Kullanici cikis  yapar")  // cift bosluk!
public void logout() { ... }`,
            codeFixed: `// Spec:  * Kullanici cikis yapar
@Step("Kullanici cikis yapar")   // birebir ayni metin
public void logout() { ... }`,
          },
          {
            error: 'NoSuchElementException',
            fullMessage: 'org.openqa.selenium.NoSuchElementException: no such element: Unable to locate element: {"method":"css selector","selector":"#usernme"}',
            cause: {
              tr: 'Üç aday: (1) locator yanlış/eskimiş, (2) element henüz render olmadı (zamanlama), (3) element bir iframe içinde. Mesajdaki selector\'ı DevTools\'ta test ederek hangisi olduğunu ayır.',
              en: 'Three suspects: (1) wrong/stale locator, (2) the element has not rendered yet (timing), (3) the element is inside an iframe. Test the selector from the message in DevTools to tell which.',
            },
            solution: {
              tr: 'DevTools Console\'da document.querySelector("#usernme") dene — null ise locator yanlış. Locator doğruysa WebDriverWait + ExpectedConditions.visibilityOfElementLocated kullan; iframe ise önce switchTo().frame().',
              en: 'Try document.querySelector("#usernme") in the DevTools Console — null means wrong locator. If the locator is right, use WebDriverWait + ExpectedConditions.visibilityOfElementLocated; if it is an iframe, switchTo().frame() first.',
            },
            codeWrong: `// Sayfa yuklenir yuklenmez ara — dinamik icerikte patlar
driver.findElement(By.id("welcome-banner")).getText();`,
            codeFixed: `// Gorunur olana kadar bekle, sonra oku
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions
    .visibilityOfElementLocated(By.id("welcome-banner")))
    .getText();`,
          },
          {
            error: 'StaleElementReferenceException',
            fullMessage: 'org.openqa.selenium.StaleElementReferenceException: stale element reference: element is not attached to the page document',
            cause: {
              tr: 'Element referansı alındıktan SONRA DOM yeniden render oldu (AJAX, SPA güncellemesi) — elindeki referans artık ölü. @CacheLookup kullanılan dinamik sayfalarda kroniktir.',
              en: 'The DOM re-rendered AFTER the element reference was obtained (AJAX, SPA update) — your reference is now dead. Chronic on dynamic pages using @CacheLookup.',
            },
            solution: {
              tr: 'Elementi sakla-ve-tekrar-kullan yapma; her aksiyondan önce yeniden bul. Dinamik sayfalarda @CacheLookup\'ı kaldır. Gerekirse ExpectedConditions.refreshed(...) ile bekle.',
              en: 'Do not store-and-reuse elements; re-find before each action. Remove @CacheLookup on dynamic pages. If needed, wait with ExpectedConditions.refreshed(...).',
            },
            codeWrong: `WebElement row = driver.findElement(By.cssSelector("tr.order"));
refreshOrders();          // DOM yeniden cizilir
row.click();              // olu referans — stale!`,
            codeFixed: `refreshOrders();
// Yeniden bul: guncel DOM'daki taze referans
driver.findElement(By.cssSelector("tr.order")).click();`,
          },
          {
            error: 'InvalidSelectorException',
            fullMessage: 'org.openqa.selenium.InvalidSelectorException: invalid selector: Compound class names not permitted',
            cause: {
              tr: 'By.className\'e boşluklu değer ("btn btn-primary") verildi — className TEK class adı kabul eder. Ya da CSS\'e :contains gibi standart dışı pseudo-class yazıldı.',
              en: 'By.className received a spaced value ("btn btn-primary") — className accepts a SINGLE class name. Or a non-standard pseudo-class like :contains was written in CSS.',
            },
            solution: {
              tr: 'Çoklu class için CSS zinciri kullan: By.cssSelector("button.btn.btn-primary"). Metne göre arama gerekiyorsa CSS değil XPath: //button[normalize-space()=\'...\'].',
              en: 'For multiple classes use a CSS chain: By.cssSelector("button.btn.btn-primary"). For text search use XPath, not CSS: //button[normalize-space()=\'...\'].',
            },
            codeWrong: `driver.findElement(By.className("btn btn-primary"));`,
            codeFixed: `driver.findElement(By.cssSelector("button.btn.btn-primary"));`,
          },
          {
            error: 'SessionNotCreatedException',
            fullMessage: 'org.openqa.selenium.SessionNotCreatedException: Could not start a new session. This version of ChromeDriver only supports Chrome version 125',
            cause: {
              tr: 'Tarayıcı otomatik güncellendi ama elle yönetilen chromedriver eski sürümde kaldı. Selenium 4.6 öncesi projelerde ve driver yolu elle sabitlenen CI\'larda klasiktir.',
              en: 'The browser auto-updated but the manually managed chromedriver stayed on the old version. Classic in pre-Selenium-4.6 projects and CIs with hand-pinned driver paths.',
            },
            solution: {
              tr: 'Selenium 4.6+ kullan ve driver yolunu elle YÖNETME: Selenium Manager doğru driver\'ı otomatik indirir. webdriver.chrome.driver system property\'lerini ve eski WebDriverManager kodunu kaldır.',
              en: 'Use Selenium 4.6+ and stop managing the driver path by hand: Selenium Manager downloads the right driver automatically. Remove webdriver.chrome.driver system properties and legacy WebDriverManager code.',
            },
            codeWrong: `// Elle sabitlenmis driver yolu — tarayici guncellenince kirilir
System.setProperty("webdriver.chrome.driver",
    "C:/drivers/chromedriver.exe");
WebDriver driver = new ChromeDriver();`,
            codeFixed: `// Selenium 4.6+: Selenium Manager dogru driver'i kendisi bulur
WebDriver driver = new ChromeDriver();`,
          },
          {
            error: 'Duplicate step implementation',
            fullMessage: '[ParseError] Duplicate step implementation => \'Kullanici <kullaniciAdi> kullanici adini girer\'',
            cause: {
              tr: 'Aynı @Step metni iki farklı metotta tanımlı — genelde step sınıfı kopyalanıp yeniden düzenlenirken eski kopya silinmemiş. Gauge hangisini koşacağını bilemez ve koşumu reddeder.',
              en: 'The same @Step text is defined on two different methods — usually an old copy left behind while duplicating and refactoring a step class. Gauge cannot know which to run and refuses the run.',
            },
            solution: {
              tr: 'Hata mesajındaki step metnini projede ara (IDE: Find in Files), kopyalardan birini sil ya da metnini farklılaştır. Concept kullanıyorsan .cpt içindeki cümlelerin de step\'lerle çakışmadığını kontrol et.',
              en: 'Search the project for the step text from the error (IDE: Find in Files), delete one copy or differentiate its text. If you use concepts, also check that .cpt sentences do not collide with steps.',
            },
            codeWrong: `// LoginSteps.java
@Step("Kullanici <ad> kullanici adini girer")
public void enterUser(String ad) { ... }

// LoginStepsOld.java — silinmesi unutulan kopya
@Step("Kullanici <ad> kullanici adini girer")
public void enterUserOld(String ad) { ... }`,
            codeFixed: `// LoginSteps.java — tek implementasyon kaldi
@Step("Kullanici <ad> kullanici adini girer")
public void enterUser(String ad) { ... }`,
          },
          {
            error: 'IllegalArgumentException: Element bulunamadi (JSON deposu)',
            fullMessage: 'java.lang.IllegalArgumentException: Element bulunamadi: \'loginPage.usernameInputt\'. Mevcut elementler: [usernameInput, passwordInput, loginButton, errorBanner]',
            cause: {
              tr: 'JSON locator deposunda olmayan bir anahtar istendi — çoğunlukla yazım hatası (usernameInputt) veya locators.json\'a eklenmesi unutulan yeni element. Derleyici JSON anahtarlarını göremediği için hata ancak runtime\'da çıkar.',
              en: 'A key that does not exist in the JSON locator repository was requested — usually a typo (usernameInputt) or a new element someone forgot to add to locators.json. Since the compiler cannot see JSON keys, the error only appears at runtime.',
            },
            solution: {
              tr: 'Mesajdaki "Mevcut elementler" listesine bak — doğru yazımı orada görürsün. Bu net mesaj, LocatorRepository\'nin fail-fast tasarımının ödülüdür: sessiz null olsaydı üç katman ötede anlamsız NPE görürdün. Sık anahtarlar için sabit (constant) sınıfı da tanımlayabilirsin.',
              en: 'Check the "Available elements" list in the message — the correct spelling is right there. This clear message is the payoff of LocatorRepository\'s fail-fast design: with silent null you would see a meaningless NPE three layers away. For frequent keys you can also define a constants class.',
            },
            codeWrong: `// Yazim hatasi: fazladan 't'
driver.findElement(
    LocatorRepository.get("loginPage", "usernameInputt"));`,
            codeFixed: `// JSON'daki anahtarla birebir ayni
driver.findElement(
    LocatorRepository.get("loginPage", "usernameInput"));`,
          },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Test dün geçiyordu, bugün NoSuchElementException veriyor; locator\'ı DevTools\'ta denedin, element bulunuyor. En olası sebep nedir?',
          en: 'The test passed yesterday but throws NoSuchElementException today; you tried the locator in DevTools and the element IS found. What is the most likely cause?',
        },
        options: [
          { id: 'a', text: { tr: 'Zamanlama: element, findElement çağrısı anında henüz render olmamış — explicit wait gerekli', en: 'Timing: the element has not rendered yet at the moment findElement runs — an explicit wait is needed' } },
          { id: 'b', text: { tr: 'Selenium sürümü bozulmuş', en: 'The Selenium version is corrupted' } },
          { id: 'c', text: { tr: 'JSON dosyası silinmiş', en: 'The JSON file was deleted' } },
          { id: 'd', text: { tr: 'Java plugin\'i eksik', en: 'The java plugin is missing' } },
        ],
        correct: 'a',
        explanation: {
          tr: 'DevTools\'ta bulunan ama testte bulunamayan element, neredeyse her zaman zamanlama problemidir: sen DevTools\'a yazana kadar sayfa çoktan yüklendi, ama test milisaniyeler içinde arıyor. Çözüm Thread.sleep değil, WebDriverWait + ExpectedConditions — koşul sağlanınca beklemeden devam eder.',
          en: 'An element found in DevTools but not in the test is almost always a timing problem: by the time you typed into DevTools the page had long loaded, but the test searches within milliseconds. The fix is not Thread.sleep but WebDriverWait + ExpectedConditions — it proceeds as soon as the condition holds.',
        },
        retryQuestion: {
          question: {
            tr: 'AJAX ile yenilenen bir tabloda, elementi değişkende saklayıp yenileme sonrası kullanınca hangi hata gelir?',
            en: 'On a table refreshed via AJAX, what error do you get when you store an element in a variable and use it after the refresh?',
          },
          options: [
            { id: 'a', text: { tr: 'StaleElementReferenceException — referans ölü, elementi yeniden bulmalısın', en: 'StaleElementReferenceException — the reference is dead, you must re-find the element' } },
            { id: 'b', text: { tr: 'InvalidSelectorException', en: 'InvalidSelectorException' } },
            { id: 'c', text: { tr: 'SessionNotCreatedException', en: 'SessionNotCreatedException' } },
            { id: 'd', text: { tr: 'Hata gelmez, Selenium referansı otomatik tazeler', en: 'No error — Selenium refreshes the reference automatically' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'DOM yeniden çizildiğinde eski WebElement referansı belgeye bağlı olmaktan çıkar (stale). Selenium referansları otomatik tazelemez — aksiyondan hemen önce yeniden findElement yapmak kalıcı çözümdür.',
            en: 'When the DOM re-renders, the old WebElement reference is no longer attached to the document (stale). Selenium does not auto-refresh references — re-running findElement right before the action is the permanent fix.',
          },
        },
      },
      {
        type: 'quiz',
        question: {
          tr: '"Bu version of ChromeDriver only supports Chrome version 125" hatasının KALICI çözümü hangisidir?',
          en: 'What is the PERMANENT fix for "This version of ChromeDriver only supports Chrome version 125"?',
        },
        options: [
          { id: 'a', text: { tr: 'Chrome\'un otomatik güncellemesini kapatmak', en: 'Disabling Chrome auto-updates' } },
          { id: 'b', text: { tr: 'Selenium 4.6+ kullanıp driver yönetimini Selenium Manager\'a bırakmak', en: 'Using Selenium 4.6+ and leaving driver management to Selenium Manager' } },
          { id: 'c', text: { tr: 'chromedriver.exe\'yi her hafta elle indirmek', en: 'Manually downloading chromedriver.exe every week' } },
          { id: 'd', text: { tr: 'Testleri Firefox\'a taşımak', en: 'Moving the tests to Firefox' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Selenium 4.6 ile gelen Selenium Manager, kurulu tarayıcının sürümünü algılayıp uyumlu driver\'ı otomatik indirir — System.setProperty("webdriver.chrome.driver", ...) satırları tamamen kalkar. Elle sürüm eşitleme ve güncelleme kapatma sadece sorunu ertelemektir.',
          en: 'Selenium Manager, shipped with Selenium 4.6, detects the installed browser version and downloads a compatible driver automatically — the System.setProperty("webdriver.chrome.driver", ...) lines disappear entirely. Manual version-pinning and disabling updates merely postpone the problem.',
        },
        retryQuestion: {
          question: {
            tr: 'Gauge koşumu "[ParseError] Duplicate step implementation" ile reddedildi. İlk yapman gereken nedir?',
            en: 'A Gauge run is rejected with "[ParseError] Duplicate step implementation". What should you do first?',
          },
          options: [
            { id: 'a', text: { tr: 'Hatadaki step metnini projede aratıp (Find in Files) iki tanımdan birini kaldırmak', en: 'Search the project for the step text from the error (Find in Files) and remove one of the two definitions' } },
            { id: 'b', text: { tr: 'Gauge\'ü yeniden kurmak', en: 'Reinstalling Gauge' } },
            { id: 'c', text: { tr: 'Spec dosyasını silmek', en: 'Deleting the spec file' } },
            { id: 'd', text: { tr: 'Testi 3 kez tekrar koşturmak', en: 'Re-running the test 3 times' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Aynı @Step metni iki metotta tanımlıysa Gauge hangisini koşacağına karar veremez ve koşumu tümden reddeder. Metni aratıp fazla kopyayı silmek dakikalık iştir; "3 kez koştur" kültürü ise hiçbir parse hatasını çözmez.',
            en: 'If the same @Step text is defined on two methods, Gauge cannot decide which to run and rejects the whole run. Searching for the text and deleting the extra copy takes a minute; the "run it 3 times" culture fixes no parse error.',
          },
        },
      },
    ],
  },

  // ── 7: Mülakat Soruları ─────────────────────────────────────────────────────
  {
    title: { tr: '💼 Mülakat Soruları', en: '💼 Interview Q&A' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🛩️',
        content: {
          tr: 'Mülakatta sorulan senaryo sorusu, uçuş simülatöründeki "motor arızası" testine benzer: pilot gerçek uçuşta hiç motor arızası yaşamamış olabilir, ama simülatör onu "Motor 2 şu an durdu, ne yapıyorsun?" diye köşeye sıkıştırır — çünkü mürettebatı işe alan kurum, pilotun checklist\'i EZBERE bilip bilmediğini değil, gerçek arıza anında DOĞRU SIRAYLA karar verip veremeyeceğini ölçmek ister. CLAUDE.md\'nin bu sayfada "X nedir?" tarzı tanım sorusunu yasaklaması da aynı mantıktan gelir. Peki mülakatçı neden "@Step annotation\'ı nedir?" diye sormaz da "Step implementation not found hatası aldın, ekranda ne görürsün, ilk 30 saniyede ne yaparsın?" diye sorar? Çünkü tanım sorusuna doğru cevap vermek GOOGLE\'da arama yapabilmekle eşdeğerdir — gerçek işte hiçbir değer üretmez; arızayı teşhis edip düzeltebilmek ise üretir. Java mülakatlarında da aynı evrim yaşanmıştır: "ArrayList nedir?" sorusu artık amatörce sayılır, onun yerine "ConcurrentModificationException aldın, sebebini ve düzeltmesini anlat" sorulur — ikisi de aynı bilgiyi test eder ama biri ezberi, diğeri anlayışı ölçer. QA bağlamındaki gerçek bedel şudur: bir mühendis @Step sözdizimini kusursuz ezbere bilip mülakatı geçebilir, ama gerçek bir "Step implementation not found" hatası karşısında panikleyip saatini boşa harcayabilir — işe alan yönetici tam da bu resume-gerçeklik farkını yakalamak için senaryo sorar, çünkü production bir incident sırasında dokümantasyona bakmayı beklemez.',
          en: 'A scenario-based interview question resembles the "engine failure" drill in a flight simulator: the pilot may have never faced a real engine failure, yet the simulator corners them with "Engine 2 just died, what do you do?" — because the airline is not measuring whether the pilot memorized the checklist, but whether they can make the RIGHT DECISION IN THE RIGHT ORDER during an actual failure. CLAUDE.md\'s ban on plain "What is X?" questions on this page comes from the same logic. Why doesn\'t an interviewer ask "What is the @Step annotation?" but instead "You get Step implementation not found, what do you see on screen, what do you do in the first 30 seconds?" Because answering a definition question correctly is equivalent to being able to search Google — it produces zero value on the actual job; diagnosing and fixing the failure does. The same evolution happened in Java interviews: "What is an ArrayList?" is now considered amateur, replaced by "You got a ConcurrentModificationException, explain the cause and the fix" — both test the same knowledge, but one measures memorization, the other understanding. The real QA cost: an engineer can recite the @Step syntax flawlessly and pass a definition-based interview, yet freeze and burn an hour when a real "Step implementation not found" error appears in front of them — hiring managers ask scenario questions precisely to catch this resume-versus-reality gap, because a production incident never waits for you to check the docs.',
        },
      },
      {
        type: 'interview-questions',
        relatedTopicId: 'gauge-interview',
        topic: 'Gauge',
        questions: [
          // ── BASIC (15) ───────────────────────────────────────────────────────
          {
            level: 'basic',
            q: { tr: 'Yeni bir takım arkadaşı Windows makinesinde ilk kez bir Gauge + Java projesi kuracak. Hangi sırayla ilerlemesini söylersin ve neden bu sıra önemli?', en: 'A new teammate is setting up a Gauge + Java project on Windows for the first time. What order do you tell them to follow, and why does the order matter?' },
            a: {
              tr: 'Önce gauge CLI\'ı kurar (choco install gauge veya npm install -g @getgauge/cli), sonra gauge install java ve gauge install html-report ile dil ve rapor plugin\'lerini ekler, en son gauge version çıktısında ikisinin de listelendiğini doğrular. Sıra önemlidir çünkü çekirdek CLI dil-bağımsızdır ve plugin olmadan projeyi koşturamaz — plugin adımı atlanırsa "Failed to start gauge API" hatası alınır. Java\'da JDK kurup sonra proje bağımlılıklarını Maven ile indirmeye benzer bir iki-aşamalı akıştır.',
              en: 'First install the gauge CLI (choco install gauge or npm install -g @getgauge/cli), then add the language and report plugins with gauge install java and gauge install html-report, and finally verify both are listed in the gauge version output. The order matters because the core CLI is language-agnostic and cannot run the project without a plugin — skipping that step produces "Failed to start gauge API". It mirrors installing the JDK first and then pulling project dependencies via Maven — a two-stage flow.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'gauge init java komutunu çalıştırdıktan sonra oluşan specs/, src/test/java/ ve env/default/ klasörlerini yeni katılan bir geliştiriciye nasıl açıklarsın?', en: 'After running gauge init java, how do you explain the generated specs/, src/test/java/, and env/default/ folders to a new developer?' },
            a: {
              tr: 'specs/ klasörü Markdown senaryolarını tutar — restoran benzetmesiyle "sipariş fişi"dir, NE test edileceğini söyler. src/test/java/ altında @Step metotları yaşar — "mutfak"tır, NASIL yapılacağını bilir. env/default/ ise base URL gibi ortam bazlı ayarları tutar (default.properties). manifest.json da projenin hangi dil plugin\'ini kullandığını belirtir. Java\'daki src/main (implementasyon) ile src/test (test) ayrımına benzer, ama burada senaryo katmanı da ayrıca var.',
              en: 'The specs/ folder holds Markdown scenarios — the "order ticket" in the restaurant analogy, saying WHAT gets tested. src/test/java/ is where @Step methods live — the "kitchen", knowing HOW it gets done. env/default/ holds environment-specific settings like the base URL (default.properties). manifest.json declares which language plugin the project uses. It resembles Java\'s src/main (implementation) versus src/test (tests) split, except here there is also a separate scenario layer.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Bir arkadaşın gauge version çalıştırdı ve çıktıda "Plugins: (none)" gördü, sonra gauge run specs dediğinde ne olacağını sordu. Ne cevap verirsin?', en: 'A colleague ran gauge version and saw "Plugins: (none)" in the output, then asked what happens when they run gauge run specs. What do you tell them?' },
            a: {
              tr: 'Koşum "Failed to start gauge API: Plugin java not installed on following locations" hatasıyla başlamadan patlar, çünkü çekirdek CLI projeyi tanısa da hangi dilde derleyip çalıştıracağını bilmiyordur. Çözüm gauge install java çalıştırmaktır; bu, yeni CI agent\'larında en sık unutulan adımdır. Java\'da derleyicisiz bir IDE\'ye kaynak kod verip "çalıştır" demeye benzer — dosya orada ama onu yürütecek runtime eksik.',
              en: 'The run fails immediately with "Failed to start gauge API: Plugin java not installed on following locations", because the core CLI recognizes the project but does not know which language runtime should compile and execute it. The fix is running gauge install java; it is the most commonly forgotten step on fresh CI agents. It is like handing source code to an IDE with no compiler installed and saying "run it" — the file is there, but the runtime to execute it is missing.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Bir .spec dosyasında # başlığının hemen altına konan * satırları ile ## altındaki * satırları arasında ne fark var? Bunu takıma nasıl anlatırsın?', en: 'What is the difference between * lines placed directly under a # heading and those under a ## heading in a .spec file? How would you explain this to the team?' },
            a: {
              tr: '# (Specification) başlığının hemen altındaki * satırlar "context step" olur ve o dosyadaki HER senaryodan önce otomatik koşar — Java\'daki @BeforeMethod\'un spec-içi karşılığıdır. ## (Scenario) başlığı altındaki * satırlar ise sadece o senaryoya özeldir ve bağımsız çalışır. Bu ayrımı bilmeyen bir takım, ortak bir "sayfayı aç" adımını her senaryoya tekrar tekrar kopyalar — context step tam da bunu önlemek için var.',
              en: 'The * lines directly under the # (Specification) heading become "context steps" and run automatically before EVERY scenario in that file — the in-spec equivalent of Java\'s @BeforeMethod. The * lines under a ## (Scenario) heading are scoped to that single scenario and run independently. A team unaware of this distinction ends up copy-pasting a common "open the page" step into every scenario — context steps exist precisely to prevent that.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Spec\'te "* Kullanici \'admin\' kullanici adini girer" satırını yazdın, şimdi Java tarafında karşılığını yazman gerekiyor. Metodu nasıl yazarsın ve tırnak içindeki değere ne olur?', en: 'You wrote "* User enters username \'admin\'" in the spec and now need to write its Java counterpart. How do you write the method, and what happens to the quoted value?' },
            a: {
              tr: '@Step("Kullanici <kullaniciAdi> kullanici adini girer") annotation\'lı bir Java metodu yazarım; metot bir String parametresi alır ve spec\'teki çift tırnaklı "admin" değeri bu parametreye otomatik akar. Metot adı (örn. enterUsername) tamamen serbesttir — bağ annotation metni üzerinden kurulur, metot adının kendisiyle değil. Bu, Java\'da bir arayüz metodunu implemente ederken imzayı (sözleşmeyi) koruyup metot gövdesini serbestçe değiştirebilmene benziyor.',
              en: 'I write a Java method annotated @Step("User enters username <username>"); the method takes a String parameter, and the quoted "admin" value from the spec flows into it automatically. The method name (e.g. enterUsername) is completely free — the binding is through the annotation text, not the method name itself. It resembles implementing a Java interface method: you must keep the signature (the contract) intact, but the method body itself is yours to write.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Kod incelemesinde bir arkadaşın step metodunun adını enterUsername\'den typeUsername\'e değiştirdi. Bu değişiklik spec\'i kırar mı? Neden?', en: 'In a code review, a colleague renamed a step method from enterUsername to typeUsername. Does this change break the spec? Why or why not?' },
            a: {
              tr: 'Hayır, kırmaz — çünkü Gauge eşleşmeyi metot adına değil @Step("...") içindeki annotation metnine göre kurar. Metot adı sadece Java tarafının okunabilirliği içindir, spec\'in hiçbir satırı bunu referans almaz. Kırılma ancak annotation metni ya da spec\'teki step cümlesi TEK TARAFLI değişirse olur. Bu, Java\'da bir metodu yeniden adlandırıp @Override ile aynı imzayı koruman gibidir — dış sözleşme (burada annotation metni) sabit kaldığı sürece iç isimlendirme serbesttir.',
              en: 'No, it does not — because Gauge binds by the annotation text inside @Step("..."), not by the method name. The method name exists purely for Java-side readability; no spec line references it. Breakage only occurs if the annotation text or the spec\'s step sentence changes ONE-SIDEDLY. It is like renaming a Java method while keeping the same @Override signature — as long as the outer contract (here, the annotation text) stays fixed, the internal naming is free.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Release öncesi sadece "smoke" etiketli senaryoları koşup hızlı bir onay almak istiyorsun. Hangi komutu kullanırsın?', en: 'Before a release you want to run only "smoke"-tagged scenarios for a quick sign-off. Which command do you use?' },
            a: {
              tr: 'gauge run --tags "smoke" specs komutunu kullanırım — sadece tags: smoke içeren senaryoları çalıştırır, diğerlerini atlar. Bu, JUnit/TestNG\'de @Tag("smoke") ile filtreli koşum yapmanın Gauge karşılığıdır. Release öncesi tüm suite\'i (belki yüzlerce senaryo) koşmak yerine dakikalar içinde kritik yolu doğrulamış olurum.',
              en: 'I use gauge run --tags "smoke" specs — it runs only scenarios tagged smoke, skipping the rest. This is Gauge\'s equivalent of a filtered run with @Tag("smoke") in JUnit/TestNG. Instead of running the whole suite (potentially hundreds of scenarios) before a release, I verify the critical path within minutes.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'CI\'da koşum süresini kısaltmak için 4 paralel süreçle testleri koşturman isteniyor. Hangi komutu yazarsın?', en: 'You are asked to cut CI runtime by running tests with 4 parallel processes. What command do you write?' },
            a: {
              tr: 'gauge run --parallel -n 4 specs komutunu yazarım — koşumu 4 ayrı süreç arasında böler. Bu, Gauge\'ün yerleşik özelliğidir; TestNG\'de aynı sonucu almak için suite XML\'inde thread-count ve parallel="methods" gibi ayarlar yapmak gerekirdi. Tek flag ile ciddi bir CI süresi kazancı sağlanır, ama testlerin paylaşılan static state kullanmadığından da emin olmam gerekir.',
              en: 'I write gauge run --parallel -n 4 specs — it splits the run across 4 processes. This is a built-in Gauge feature; achieving the same in TestNG would require configuring thread-count and parallel="methods" in the suite XML. One flag buys a real CI time saving, but I also need to make sure the tests do not rely on shared static state.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Sadece bir spec dosyasını debug etmek istiyorsun, tüm specs/ klasörünü koşturmak istemiyorsun. Ne yaparsın?', en: 'You want to debug just one spec file without running the entire specs/ folder. What do you do?' },
            a: {
              tr: 'gauge run specs/giris-akisi.spec şeklinde dosya yolunu doğrudan veririm — sadece o dosya koşar, geri kalan onlarca spec dosyası atlanır. Bu, mvn test -Dtest=LoginTest ile tek bir test sınıfını çalıştırmanın Gauge karşılığıdır; debug döngüsünü ciddi şekilde hızlandırır.',
              en: 'I pass the file path directly: gauge run specs/login-flow.spec — only that file runs, skipping the dozens of other spec files. This is Gauge\'s equivalent of mvn test -Dtest=LoginTest to run a single test class; it substantially speeds up the debug loop.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Aynı 4 adımlık giriş akışı 20 farklı senaryoda tekrar ediyor ve her birinde kopyala-yapıştır yapılmış. Bunu nasıl düzeltirsin?', en: 'The same 4-step login flow repeats across 20 different scenarios, all copy-pasted. How do you fix this?' },
            a: {
              tr: 'Bir concept (.cpt) dosyası oluşturup 4 adımı tek bir üst-seviye cümleye ("# Admin olarak giris yapilir") sararım; 20 senaryo artık tek bir satır kullanır. Giriş akışı değişirse tek dosyayı güncellerim, hepsi otomatik yeni akışı alır. Bu, Java\'daki extract-method refactoring\'inin spec seviyesindeki karşılığıdır — kod tekrarını DRY prensibiyle ortadan kaldırır.',
              en: 'I create a concept (.cpt) file wrapping the 4 steps into one higher-level sentence ("# Sign in as admin"); 20 scenarios now use a single line. If the login flow changes, I update one file and all of them automatically pick up the new flow. This is the spec-level equivalent of Java\'s extract-method refactoring — it removes duplication following the DRY principle.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Aynı senaryoyu 5 farklı kullanıcı rolüyle (ve her rol için farklı bir beklenen sayfayla) koşturmak istiyorsun ama 5 ayrı senaryo yazmak istemiyorsun. Ne yaparsın?', en: 'You want to run the same scenario with 5 different user roles (each expecting a different result page) without writing 5 separate scenarios. What do you do?' },
            a: {
              tr: 'Step\'in altına bir Markdown veri tablosu koyarım: |rol|beklenenSayfa| satırlarıyla. Gauge, tabloyu her satır için senaryoyu bir kez koşturarak hücre değerlerini parametre olarak geçirir. Bu, TestNG\'deki @DataProvider\'ın dokümanın içinde, herkesin görebildiği yerde durması gibidir — QA olmayan biri bile tabloya yeni bir rol satırı ekleyebilir.',
              en: 'I place a Markdown data table under the step: rows of |role|expectedPage|. Gauge runs the scenario once per row, passing the cell values as parameters. This is like TestNG\'s @DataProvider, except it lives inside the document where everyone can see it — even a non-QA person could add a new role row to the table.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Yeni bir CI agent\'ında gauge CLI kurulu ama koşum "Failed to start gauge API: Plugin java not installed" diyor. Ekip arkadaşın "internet mi yok?" diye soruyor. Ona ne söylersin?', en: 'On a fresh CI agent the gauge CLI is installed, but the run says "Failed to start gauge API: Plugin java not installed". A teammate asks "is there no internet?" What do you tell them?' },
            a: {
              tr: 'Sebep internet değil, dil plugin\'inin eksik olmasıdır — çekirdek CLI kurulu ama Java runner\'ı yok. Çözüm gauge install java çalıştırmaktır; internet varsa bu birkaç saniyede iner. Dockerfile veya CI imajına bu komutu sabitlemek, bu hatanın her yeni agent\'ta tekrar yaşanmasını önler.',
              en: 'The cause is not the internet — it is the missing language plugin: the core CLI is installed but there is no Java runner. The fix is running gauge install java; with internet access it downloads in seconds. Baking this command into the Dockerfile or CI image prevents this error from recurring on every fresh agent.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Koşumdan sonra "reports/html-report/index.html üretildi" mesajını gördün ama ekip arkadaşın html-report plugin\'inin ne işe yaradığını bilmiyor. Nasıl açıklarsın?', en: 'After a run you see "reports/html-report/index.html generated", but a teammate does not know what the html-report plugin does. How do you explain it?' },
            a: {
              tr: 'html-report, gauge install html-report ile kurulan ayrı bir plugin\'dir ve koşum sonunda adım adım, PASS/FAIL renkleriyle okunabilir bir HTML raporu üretir. Kurulu değilse rapor hiç üretilmez, sadece terminal çıktısı kalır. Bu, Maven\'daki Surefire raporlama plugin\'ine benzer — çekirdek koşum motorundan ayrı, ama CI\'da paylaşılabilir kanıt için vazgeçilmezdir.',
              en: 'html-report is a separate plugin installed via gauge install html-report, and it produces a readable, step-by-step, PASS/FAIL-colored HTML report at the end of a run. Without it, no report is generated at all — only terminal output remains. This is similar to Maven\'s Surefire reporting plugin — separate from the core execution engine but essential for shareable evidence in CI.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Projede hem gauge run hem de mvn test ile testlerin çalışabilmesi isteniyor. pom.xml\'e minimum ne eklemen gerekir?', en: 'The project needs tests runnable via both gauge run and mvn test. What minimum do you add to pom.xml?' },
            a: {
              tr: 'com.thoughtworks.gauge:gauge-java bağımlılığını (test scope) ve com.thoughtworks.gauge.maven:gauge-maven-plugin\'i build/plugins altına eklerim. Bu ikisi olmadan mvn test Gauge step\'lerini tanımaz ve derleme sırasında çağıramaz. Selenium/AssertJ gibi diğer bağımlılıklar da aynı test scope\'unda eklenir — Maven\'ın herhangi bir test kütüphanesini entegre etme kalıbıyla birebir aynıdır.',
              en: 'I add the com.thoughtworks.gauge:gauge-java dependency (test scope) and the com.thoughtworks.gauge.maven:gauge-maven-plugin under build/plugins. Without both, mvn test cannot recognize or invoke Gauge steps during the build. Other dependencies like Selenium/AssertJ are added under the same test scope — exactly the same pattern as integrating any other test library into Maven.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'Bir arkadaşın .spec dosyasına yanlışlıkla ikinci bir # başlığı eklemiş (aynı dosyada iki Specification başlığı var). Bu neye yol açar ve doğru yapı ne olmalıydı?', en: 'A colleague accidentally added a second # heading to a .spec file (two Specification headings in the same file). What does this cause, and what should the correct structure have been?' },
            a: {
              tr: 'Bir .spec dosyasında sadece TEK bir # (Specification) başlığı olmalıdır; ek senaryo eklemek için ikinci bir # değil, ## (Scenario) başlığı kullanılır. İkinci bir # eklemek Gauge\'ün parse aşamasında dosya yapısını bozar ve genellikle bir hata mesajıyla sonuçlanır. Doğru yapı: dosyanın en üstünde tek bir # başlık, altında istenildiği kadar ## senaryo. Bu, Java\'da tek bir dosyada birden fazla public class tanımlamaya çalışmanın derleme hatası vermesine benzer bir yapısal kısıtlamadır.',
              en: 'A .spec file must have only ONE # (Specification) heading; to add another scenario you use a ## (Scenario) heading, not a second #. Adding a second # heading breaks the file structure during Gauge\'s parsing phase and typically results in an error message. The correct structure: a single # heading at the top of the file, with as many ## scenarios underneath as needed. This is a structural constraint similar to Java giving a compile error when you try to declare more than one public class in a single file.',
            },
          },

          // ── INTERMEDIATE (20) ────────────────────────────────────────────────
          {
            level: 'intermediate',
            q: { tr: 'Driver\'ın tüm koşum boyunca bir kez başlatılmasını ama her senaryo öncesi çerezlerin temizlenmesini istiyorsun. Hangi hook\'ları kullanırsın ve neden ikisi de gerekli?', en: 'You want the driver started once for the whole run, but cookies cleared before every scenario. Which hooks do you use, and why are both needed?' },
            a: {
              tr: '@BeforeSuite\'te driver\'ı bir kez başlatırım (pahalı bir işlem, tekrarlanmamalı), @BeforeScenario\'da ise cookie temizliği yaparak her senaryonun temiz bir oturumla başlamasını sağlarım. Sadece @BeforeSuite kullanılsaydı senaryolar birbirinin oturum durumunu miras alırdı — flaky testlerin klasik sebeplerinden biri. Bu ayrım TestNG\'deki @BeforeClass (bir kez) ile @BeforeMethod (her testte) ayrımının birebir karşılığıdır.',
              en: 'I start the driver once in @BeforeSuite (an expensive operation that should not repeat), and clear cookies in @BeforeScenario so every scenario starts with a clean session. With only @BeforeSuite, scenarios would inherit each other\'s session state — a classic cause of flaky tests. This split is exactly TestNG\'s @BeforeClass (once) versus @BeforeMethod (every test) distinction.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Sadece "smoke" etiketli bir senaryo fail olduğunda ekran görüntüsü almak istiyorsun, diğer senaryolarda almak istemiyorsun. Nasıl kurarsın?', en: 'You want a screenshot captured only when a "smoke"-tagged scenario fails, not for other scenarios. How do you set this up?' },
            a: {
              tr: '@AfterScenario(tags = {"smoke"}) ile etiket filtresi uygularım, metot içinde ExecutionContext.getCurrentScenario().getIsFailing() kontrolüyle sadece fail durumunda Gauge.captureScreenshot() çağırırım. Bu iki filtre birlikte çalışır: hook seviyesinde tag filtresi, metot içinde durum kontrolü. TestNG\'de bunu bir ITestListener içinde onTestFailure() + gruba özel mantıkla yazman gerekirdi — Gauge burada bunu annotation parametresiyle tek satıra indirger.',
              en: 'I apply a tag filter with @AfterScenario(tags = {"smoke"}), and inside the method I check ExecutionContext.getCurrentScenario().getIsFailing() to call Gauge.captureScreenshot() only on failure. Both filters work together: tag filtering at the hook level, state checking inside the method. In TestNG you would need an ITestListener with onTestFailure() plus group-specific logic — Gauge reduces this to a single annotation parameter.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: '--parallel -n 4 ile koşarken testler aralıklı olarak fail ediyor; sebep iki senaryonun aynı static WebDriver alanını paylaşması. Kök sebep ne ve nasıl düzeltirsin?', en: 'Running with --parallel -n 4, tests fail intermittently; the cause is two scenarios sharing the same static WebDriver field. What is the root cause and how do you fix it?' },
            a: {
              tr: 'Kök sebep, static alanın süreçler arası paylaşılan mutable state olması — paralel süreçlerde iki senaryo aynı driver\'ı aynı anda kullanmaya çalışıp birbirinin işlemini bozuyor. Çözüm driver\'ı ThreadLocal<WebDriver> içinde tutmak veya her süreç kendi driver\'ını @BeforeSuite\'te oluşturacak şekilde kurmaktır — Gauge zaten her paralel node\'u ayrı bir JVM süreci olarak çalıştırır, asıl risk süreç İÇİNDEKİ paylaşılan static alanlardır. Java\'da ThreadLocal kullanmanın klasik sebebiyle birebir aynı problem.',
              en: 'The root cause is that the static field is mutable state shared under parallel execution — two scenarios end up using the same driver at once and corrupt each other\'s actions. The fix is to hold the driver in a ThreadLocal<WebDriver>, or ensure each process builds its own driver in @BeforeSuite — Gauge already runs each parallel node as a separate JVM process, so the real risk is shared static fields WITHIN a process. It is exactly the same problem that motivates using ThreadLocal in Java.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Login sayfanda id, name, css ve xpath ile aynı elementi bulabiliyorsun. Hangisini seçersin ve seçimini nasıl gerekçelendirirsin?', en: 'On your login page, id, name, css, and xpath can all find the same element. Which do you choose, and how do you justify it?' },
            a: {
              tr: 'By.id seçerim çünkü öncelik merdiveni id > name > css > xpath\'tir — güç ile kırılganlık aynı eksende ilerler: id tekil ve stabildir, XPath her şeyi bulur ama DOM yapısına en bağımlı olandır. Locator bakımı UI otomasyonunun en büyük maliyet kalemidir, bu yüzden her zaman ulaşabildiğim en üst basamağı kullanırım. Java\'da bir HashMap\'e key olarak rastgele bir nesne yerine stabil bir String kullanmayı tercih etmene benzer bir "en öngörülebilir olanı seç" mantığı.',
              en: 'I choose By.id because the priority ladder is id > name > css > xpath — power and fragility move on the same axis: id is unique and stable, while XPath can find anything but is the most dependent on DOM structure. Locator maintenance is the single biggest cost line in UI automation, so I always use the highest rung I can reach. It is the same "pick the most predictable option" logic as preferring a stable String key over an arbitrary object as a HashMap key in Java.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir PR\'da //div[3]/span[2] gibi bir XPath görüyorsun ve reddediyorsun. Neyi eleştiriyorsun ve nasıl yeniden yazılmasını istersin?', en: 'You see an XPath like //div[3]/span[2] in a PR and reject it. What are you criticizing, and how do you want it rewritten?' },
            a: {
              tr: 'Pozisyon bazlı mutlak yol eleştiriliyor: div[3] "üçüncü div" demektir ve DOM\'a bir tane daha div eklendiği anda kırılır — sayfayı geliştiren kişinin XPath\'in varlığından haberi bile olmaz. Anlamlı bir attribute varsa By.cssSelector veya By.id ile, yoksa metne göre arama gerekiyorsa //button[normalize-space()=\'Gonder\'] gibi anlam-bazlı bir XPath ile yeniden yazılmasını isterim. Bu, Java\'da "magic number" kullanmak yerine adlandırılmış bir sabit kullanmayı tercih etmenin locator karşılığıdır.',
              en: 'The criticism targets the position-based absolute path: div[3] means "the third div", and it breaks the moment one more div lands in the DOM — the person changing the page has no idea the XPath even exists. I ask for a rewrite using By.cssSelector or By.id if a meaningful attribute exists, or a meaning-based XPath like //button[normalize-space()=\'Submit\'] if text search is required. It is the locator equivalent of preferring a named constant over a "magic number" in Java.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'new LoginPage(driver) çağrısını sayfa henüz yüklenmeden yapıyorsun; @FindBy alanları hemen hata verir mi? PageFactory mekanizmasını kullanarak açıkla.', en: 'You call new LoginPage(driver) before the page has even loaded; do the @FindBy fields error immediately? Explain using the PageFactory mechanism.' },
            a: {
              tr: 'Hayır, hata vermez — PageFactory.initElements(driver, this) alanlara gerçek WebElement değil dinamik bir PROXY (java.lang.reflect.Proxy tabanlı) yerleştirir. Element, alana ilk erişimde (örneğin loginButton.click() çağrıldığında) gerçekten aranır. Bu yüzden constructor sayfa yüklenmeden çağrılsa bile güvenlidir; hata ancak elemente gerçekten dokunulduğunda ve o anda hâlâ yoksa gelir. Hibernate\'in lazy loading\'iyle aynı fikirdir — nesne oluşturulur ama ilişkili veri gerçek erişime kadar getirilmez.',
              en: 'No, it does not — PageFactory.initElements(driver, this) injects dynamic PROXIES (based on java.lang.reflect.Proxy) into the fields instead of real WebElements. The element is only actually looked up on first field access (e.g., when loginButton.click() is called). That is why the constructor is safe even before the page loads; the error only comes when the element is genuinely touched and still missing at that moment. It is the same idea as Hibernate\'s lazy loading — the object is created, but related data is fetched only on real access.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'A/B testi yüzünden bir buton bazen id="login-btn", bazen id="signin-btn" olarak render oluyor. @FindBys mi @FindAll mi kullanırsın ve aradaki fark nedir?', en: 'Due to an A/B test, a button renders sometimes as id="login-btn" and sometimes as id="signin-btn". Do you use @FindBys or @FindAll, and what is the difference?' },
            a: {
              tr: '@FindAll kullanırım — o, "VEYA" (OR) mantığıyla çalışır: listelenen stratejilerden HANGİSİ varsa onu bulur, tam da eski/yeni id senaryosu için tasarlanmıştır. @FindBys ise "VE" (AND) zinciridir — önce bir üst container\'ı bulur, SONRA içinde başka bir kriterle arama yapar (örn. önce .form-group, sonra içindeki input). İkisini karıştırmak, A/B test senaryosunda elementin hiç bulunamamasına yol açar çünkü @FindBys iç içe daraltma yapar, alternatif sunmaz.',
              en: 'I use @FindAll — it works with OR logic: it finds whichever of the listed strategies exists, exactly designed for an old-id/new-id scenario. @FindBys is an AND chain instead — it finds a parent container FIRST, THEN searches inside it with another criterion (e.g., .form-group first, then an input inside it). Confusing the two in an A/B test scenario means the element is never found at all, because @FindBys narrows down rather than offering an alternative.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Dinamik bir React tablosu AJAX yenilemesi sonrası StaleElementReferenceException veriyor, ama bir arkadaşın "hızlandırmak için" @CacheLookup eklemiş. Neden bu yanlış ve ne önerirsin?', en: 'A dynamic React table throws StaleElementReferenceException after an AJAX refresh, but a colleague added @CacheLookup "to speed things up". Why is this wrong, and what do you propose?' },
            a: {
              tr: '@CacheLookup elementi İLK bulunuşta önbelleğe alır; DOM yeniden render olduğunda (React\'te sık olur) önbellekteki referans ölür ve StaleElementReferenceException zaten bu yüzden fırlıyor — @CacheLookup sorunu ÇÖZMÜYOR, KÖTÜLEŞTİRİYOR. Önerim @CacheLookup\'ı kaldırmak (proxy zaten her erişimde yeniden arar, doğru davranış budur) ve gerekiyorsa ExpectedConditions.refreshed(...) ile bekleme eklemektir. Statik, hiç değişmeyen sayfalarda @CacheLookup düşünülebilir ama React/Vue/Angular gibi dinamik arayüzlerde asla kullanılmamalıdır.',
              en: '@CacheLookup caches the element on its FIRST lookup; when the DOM re-renders (common in React), the cached reference dies, and that is exactly why StaleElementReferenceException fires — @CacheLookup does NOT solve the problem, it MAKES IT WORSE. My proposal is to remove @CacheLookup (the proxy already re-finds on every access by default, which is the correct behavior), and add a wait with ExpectedConditions.refreshed(...) if needed. @CacheLookup may be considered on truly static, never-changing pages, but should never be used on dynamic UIs like React/Vue/Angular.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Ürün ekibi, kod yazmadan locator güncelleyebilmek istiyor. Ne önerirsin ve baştan hangi trade-off\'u açık açık söylersin?', en: 'The product team wants to update locators without touching code. What do you propose, and what trade-off do you disclose upfront?' },
            a: {
              tr: 'Locator\'ları koddan çıkarıp sayfa→element→{type,value} yapısında bir locators.json dosyasına taşımayı öneririm; Jackson ile okunur, By nesnesine çevrilir. Baştan söylediğim trade-off: tip güvenliği kaybı — @FindBy\'da yanlış alan adı DERLEME hatasıdır, JSON\'daki yanlış anahtar ancak ÇALIŞMA ZAMANINDA patlar. Bu, Java\'da hard-coded String yerine .properties dosyası kullanma kararıyla aynı takas: esneklik kazanılır, derleyici koruması kaybedilir.',
              en: 'I propose moving locators out of code into a locators.json structured as page→element→{type,value}; read via Jackson and converted into a By object. The trade-off I disclose upfront: lost type safety — a wrong field name in @FindBy is a COMPILE error, a wrong key in JSON only explodes at RUNTIME. It is the same trade Java makes when choosing a .properties file over a hard-coded String: flexibility is gained, compiler protection is lost.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'locators.json\'da bir yazım hatası var ve bu, üç katman ötede anlamsız bir NullPointerException olarak ortaya çıkıyor. LocatorRepository.get()\'i nasıl yeniden tasarlarsın?', en: 'There is a typo in locators.json, and it surfaces three layers away as a meaningless NullPointerException. How do you redesign LocatorRepository.get()?' },
            a: {
              tr: 'get() metodunu fail-fast yaparım: sayfa veya element anahtarı Map\'te yoksa sessizce null dönmek yerine "Element bulunamadi: \'loginPage.usernameInputt\'. Mevcut elementler: [...]" gibi mevcut anahtarları da içeren bir IllegalArgumentException fırlatırım. Böylece hata kaynağına en yakın yerde ve en açıklayıcı haliyle görünür; üç katman ötede anlamsız bir NPE ile saatler kaybetmek yerine yazım hatası saniyede fark edilir.',
              en: 'I make get() fail-fast: if the page or element key is missing from the Map, instead of silently returning null I throw an IllegalArgumentException that lists available keys too, like "Element not found: \'loginPage.usernameInputt\'. Available elements: [...]". This way the error surfaces closest to its source and in its most descriptive form; instead of losing hours to a meaningless NPE three layers away, the typo is spotted in seconds.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'locators.json\'u neden mutlak dosya yolu (new File("C:/proje/...")) yerine classpath\'ten (getResourceAsStream) okuyorsun, özellikle CI için?', en: 'Why do you read locators.json from the classpath (getResourceAsStream) instead of an absolute file path (new File("C:/project/...")), especially for CI?' },
            a: {
              tr: 'Mutlak yol makineye bağımlıdır — "C:/proje/..." benim Windows makinemde çalışır ama Linux tabanlı bir CI agent\'ında hiçbir anlam ifade etmez. src/test/resources altındaki dosya Maven tarafından test classpath\'ine otomatik kopyalanır; getResourceAsStream("/locators.json") bu sayede Windows\'ta, Mac\'te ve Docker\'daki CI\'da AYNI şekilde bulur. Bu, "bende çalışıyor" probleminin doğrudan panzehiridir.',
              en: 'An absolute path is machine-dependent — "C:/project/..." works on my Windows machine but means nothing on a Linux-based CI agent. A file under src/test/resources is automatically copied to the test classpath by Maven; getResourceAsStream("/locators.json") therefore finds it IDENTICALLY on Windows, on Mac, and in a Dockerized CI. It is the direct antidote to the "works on my machine" problem.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Jackson ile iç içe bir JSON\'u Map<String, Map<String, LocatorDef>> olarak okumak istiyorsun ama Map.class tek başına yetmiyor. Hangi Jackson API bunu çözer ve neden gerekli?', en: 'You want Jackson to read nested JSON into Map<String, Map<String, LocatorDef>>, but Map.class alone is not enough. Which Jackson API solves this, and why is it needed?' },
            a: {
              tr: 'new TypeReference<>() {} anonim alt sınıfını kullanırım — Java\'nın tip silmesi (type erasure) yüzünden Map.class, iç içe generic tipleri (Map<String, LocatorDef>) çalışma zamanına taşıyamaz. TypeReference\'ın anonim sınıf tekniği generic bilgiyi runtime\'a kadar canlı tutar, Jackson da bu bilgiyi kullanarak doğru iç içe yapıyı deserialize eder. Bu, Java generics\'in en sık karşılaşılan sınırlamalarından birinin standart çözümüdür.',
              en: 'I use the anonymous subclass new TypeReference<>() {} — because of Java\'s type erasure, Map.class alone cannot carry nested generic types (Map<String, LocatorDef>) to runtime. TypeReference\'s anonymous-subclass trick keeps the generic information alive until runtime, and Jackson uses it to deserialize the correct nested structure. It is the standard fix for one of the most common limitations of Java generics.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Gece boyu (nightly) tam regresyon, ama her PR\'da sadece smoke koşulmasını istiyorsun. Bunu nasıl kurarsın?', en: 'You want a full regression run nightly, but only smoke scenarios on every PR. How do you set this up?' },
            a: {
              tr: 'Senaryolara tags: smoke veya tags: regression etiketleri koyarım; PR pipeline\'ında gauge run --tags "smoke" specs, nightly job\'ta ise tag filtresi olmadan (veya --tags "regression") tüm koşumu çalıştırırım. Bu, TestNG\'de testgroup\'lara göre farklı suite XML\'leri koşturmanın Gauge karşılığıdır — tek bir kod tabanından iki farklı hız/kapsam profili elde edilir.',
              en: 'I tag scenarios with tags: smoke or tags: regression; the PR pipeline runs gauge run --tags "smoke" specs, while the nightly job runs without a tag filter (or with --tags "regression") for the full suite. This is Gauge\'s equivalent of running different suite XMLs by test group in TestNG — one codebase yields two distinct speed/coverage profiles.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'test ve staging ortamlarının farklı base URL\'leri var ama Java kodunu değiştirmek istemiyorsun. Gauge\'ün env/ klasörü bunu nasıl çözer ve Maven\'daki karşılığı nedir?', en: 'Test and staging environments have different base URLs, but you do not want to touch Java code. How does Gauge\'s env/ folder solve this, and what is its Maven parallel?' },
            a: {
              tr: 'env/test/default.properties ve env/staging/default.properties gibi ayrı dosyalarda base.url gibi anahtarları tanımlarım; gauge run --env test specs veya --env staging specs ile hangi ortamın kullanılacağını komut satırından seçerim, Java kodu hiç değişmez. Bu, Maven\'daki profiles (-P test / -P staging) mekanizmasının Gauge\'deki birebir karşılığıdır — konfigürasyon koddan ayrılır, ortam değişimi tek bir flag\'e indirgenir.',
              en: 'I define keys like base.url in separate files such as env/test/default.properties and env/staging/default.properties; I select which environment to use from the command line with gauge run --env test specs or --env staging specs, and the Java code never changes. This is the direct Gauge parallel of Maven\'s profiles mechanism (-P test / -P staging) — configuration is separated from code, and switching environments is reduced to a single flag.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'GitHub Actions pipeline\'ında checkout → JDK kur → gauge CLI kur → java plugin kur → gauge run → rapor yükle adımların var. Plugin kurulum adımı atlansa pipeline nerede ve nasıl kırılır?', en: 'Your GitHub Actions pipeline has checkout → install JDK → install gauge CLI → install java plugin → gauge run → upload report. If the plugin install step were skipped, where and how would the pipeline break?' },
            a: {
              tr: "gauge run adımında kırılır: çekirdek CLI kurulu olduğundan checkout ve JDK kurulumu sorunsuz geçer, ama gauge run specs çalıştığı anda \"Failed to start gauge API: Plugin java not installed\" hatasıyla adım FAIL olur ve pipeline durur — rapor yükleme adımına hiç ulaşılmaz. Bu yüzden plugin kurulumunu Dockerfile/CI imajına gömmek, her PR'da aynı hatayı tekrar tekrar görmemeyi sağlar.",
              en: 'It breaks at the gauge run step: since the core CLI is installed, checkout and JDK setup pass fine, but the moment gauge run specs executes, the step FAILs with "Failed to start gauge API: Plugin java not installed" and the pipeline stops — the report upload step is never reached. That is why baking the plugin install into the Dockerfile/CI image prevents seeing the same error on every single PR.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Biri @Step("Kullanici cikis  yapar") yazmış (çift boşluklu), spec\'te ise tek boşluklu "Kullanici cikis yapar" var. Ne hatası alınır ve Gauge neden bu farkı tolere etmez?', en: 'Someone wrote @Step("User signs  out") (double space), while the spec has a single space: "User signs out". What error occurs, and why doesn\'t Gauge tolerate the difference?' },
            a: {
              tr: '"Step implementation not found" hatası alınır, çünkü Gauge eşleştirmeyi karakter karakter yapar ve bulanık (fuzzy) eşleştirme bilinçli olarak yoktur. Eğer Gauge "yaklaşık aynı" cümleyi kabul etseydi, hangi metodun koşacağı tahmine dayanırdı ve yanlış implementasyon sessizce koşup sahte bir PASS üretebilirdi. Bu katılık, testin en tehlikeli sonucu olan "yanlış PASS"tan korunmak içindir.',
              en: '"Step implementation not found" occurs, because Gauge matches character by character and deliberately avoids fuzzy matching. If Gauge accepted an "approximately the same" sentence, which method runs would become a guess, and the wrong implementation could run silently, producing a false PASS. This rigidity exists to guard against the most dangerous test outcome — a false PASS.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Pazarlama ekibinden biri bir step cümlesinin ifadesini daha anlaşılır yapmak istiyor. Gauge bağının hangi tarafı güvenle değiştirilebilir, hangisi değiştirilemez?', en: 'Someone from marketing wants to reword a step sentence for clarity. Which side of the Gauge binding can safely change, and which cannot?' },
            a: {
              tr: 'Java tarafındaki metot ADI güvenle değiştirilebilir çünkü bağ metot adı üzerinden değil annotation metni üzerinden kurulur. Ama spec\'teki step cümlesi veya @Step("...") içindeki metin TEK TARAFLI değiştirilemez — ikisi birlikte, aynı anda güncellenmelidir, yoksa "Step implementation not found" ile koşum kırılır. Pazarlamacı ifadeyi değiştirmek istiyorsa, bu değişikliğin Java tarafındaki annotation\'a da yansıtılması gerektiğini geliştiriciyle koordine etmelidir.',
              en: 'The Java-side method NAME can safely change, because the binding is through the annotation text, not the method name. But the spec\'s step sentence or the text inside @Step("...") cannot change ONE-SIDEDLY — both must be updated together, or the run breaks with "Step implementation not found". If marketing wants to reword the sentence, they need to coordinate with a developer to reflect the same change in the Java-side annotation.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'JSON locator deposun aynı takımdaki bir JS test projesiyle paylaşılıyor. Bu, locator\'ları sadece Java @FindBy alanlarında tutmaya kıyasla ne kazandırır?', en: 'Your JSON locator repository is shared with a JS test project on the same team. What does this gain compared to keeping locators only in Java @FindBy fields?' },
            a: {
              tr: 'locators.json diller arasında ortak bir gerçek kaynak (source of truth) olur — Java ve JS projesi AYNI dosyayı okur, bir locator değişince iki takımın da otomasyonu senkron kalır. @FindBy\'da bu imkânsızdır çünkü annotation Java\'ya özgü bir mekanizmadır, JS tarafı ondan hiç haberdar olamaz. Bedeli yine aynıdır: tip güvenliği JSON\'da kaybolur, ama bu senaryoda diller arası tutarlılık kazancı bu bedeli meşrulaştırır.',
              en: 'locators.json becomes a shared source of truth across languages — the Java and JS projects read the SAME file, so when a locator changes, both teams\' automation stays in sync. This is impossible with @FindBy since the annotation is a Java-specific mechanism the JS side can never see. The cost is the same as always: type safety is lost in JSON, but in this scenario the cross-language consistency gain justifies that cost.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Devraldığın bir Page Object\'te, aslında sık yeniden render olan bir SPA sayfasında @CacheLookup kullanılmış. Ne olacağını ve düzeltmeyi anlat.', en: 'You inherit a Page Object using @CacheLookup on a page that is actually an SPA re-rendering frequently. Explain what will happen and the fix.' },
            a: {
              tr: 'İlk birkaç koşumda sorun görünmeyebilir ama sayfa yeniden render olduğu anda önbellekteki proxy referansı ölür ve StaleElementReferenceException fırlar — hata rastgele zamanlarda (flaky gibi görünerek) ortaya çıkar. Düzeltme @CacheLookup annotation\'ını tamamen kaldırmaktır; normal @FindBy proxy\'si zaten her erişimde yeniden arar, bu SPA\'lar için doğru ve güvenli davranıştır. @CacheLookup sadece gerçekten statik, hiç değişmeyen sayfalarda düşünülmelidir.',
              en: 'The first few runs might look fine, but the moment the page re-renders, the cached proxy reference dies and StaleElementReferenceException fires — appearing at seemingly random times (looking flaky). The fix is to remove the @CacheLookup annotation entirely; the normal @FindBy proxy already re-finds on every access, which is the correct and safe behavior for SPAs. @CacheLookup should only be considered on truly static, never-changing pages.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir step\'in sadece TEK bir spec dosyasındaki her senaryodan önce koşmasını istiyorsun, tüm proje genelinde değil. Bunu nereye koyarsın ve @BeforeScenario\'dan farkı ne?', en: 'You want a step to run before every scenario in only ONE spec file, not across the whole project. Where do you put it, and what is the difference from @BeforeScenario?' },
            a: {
              tr: 'Bunu Java kodunda bir hook olarak değil, o .spec dosyasının # başlığının hemen altına bir context step (* satırı) olarak koyarım — sadece O DOSYADAKİ her senaryodan önce koşar. @BeforeScenario ise Java tarafında tanımlanır ve varsayılan olarak PROJE GENELİNDEKİ tüm senaryolardan önce çalışır (tags parametresiyle daraltılmadıkça). Yani kapsam farkı: context step dosya-bazlı, @BeforeScenario proje-bazlıdır.',
              en: 'I place it not as a Java hook, but as a context step (a * line) directly under that .spec file\'s # heading — it runs before every scenario in ONLY THAT FILE. @BeforeScenario, on the other hand, is defined in Java and by default runs before every scenario PROJECT-WIDE (unless narrowed with the tags parameter). So the scope difference is: context step is file-scoped, @BeforeScenario is project-scoped.',
            },
          },

          // ── ADVANCED (15) ────────────────────────────────────────────────────
          {
            level: 'advanced',
            q: { tr: 'Ürün yöneticilerinin spec\'leri okuyabilmesi gerektiği ama takımın tamamen Java-ağırlıklı olduğu bir projede Gauge mi Cucumber mı seçersin? Karar sorusu ne olur?', en: 'On a project where product managers must be able to read specs, but the team is entirely Java-heavy, do you choose Gauge or Cucumber? What is the deciding question?' },
            a: {
              tr: 'Gauge\'ü seçerim çünkü karar sorusu "spec\'leri KİM okuyacak, NE SIKLIKLA?" sorusudur — ürün yöneticisi Gherkin\'in Given/When/Then gramerini öğrenmek zorunda kalmadan düz Markdown\'ı GitHub\'da render edilmiş haliyle rahatça okur. Cucumber da okunabilir ama kendi sözdizimini dayatır; Gauge bu ek öğrenme maliyetini sıfırlar. Java-ağırlıklı takım için @Step\'in Java entegrasyonu zaten güçlü olduğundan bu seçimde kayıp yoktur.',
              en: 'I choose Gauge, because the deciding question is "WHO will read the specs, and HOW OFTEN?" — a product manager can comfortably read plain Markdown rendered on GitHub without learning Gherkin\'s Given/When/Then grammar. Cucumber is readable too, but it imposes its own syntax; Gauge eliminates that extra learning cost. For a Java-heavy team, @Step\'s Java integration is already strong, so there is no loss in this choice.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Otomasyonun tamamen teknik olduğu (dokümanı okuyan hiç yok) bir projede bir arkadaşın birim testlerini Gauge\'e taşımayı öneriyor. Katılır mısın? Neden ve doğru araç ne olurdu?', en: 'On a project where automation is purely technical (nobody reads the documentation), a colleague proposes migrating unit tests to Gauge. Do you agree? Why, and what would the right tool be?' },
            a: {
              tr: 'Katılmam — Gauge\'ün asıl değeri spec katmanının insan-okunabilir olması ve yaşayan doküman sağlamasıdır; okuyucusu olmayan bir bağlamda bu katman sadece ek maliyettir (spec dosyası yazmak, @Step eşleştirmesi kurmak) ve hiçbir kazanç getirmez. Birim testleri için doğru araç doğrudan JUnit/TestNG\'dir — hızlı, düşük seviye, dokümantasyon katmanına ihtiyaç duymaz. Gauge, E2E/kabul testleri gibi senaryonun insan diliyle ifade edilmesinin değer kattığı katmanlarda anlamlıdır.',
              en: 'I would not agree — Gauge\'s real value is the spec layer being human-readable and providing living documentation; in a context with no readers, that layer is pure overhead (writing spec files, wiring @Step bindings) with zero payoff. The right tool for unit tests is JUnit/TestNG directly — fast, low-level, no documentation layer needed. Gauge makes sense at layers like E2E/acceptance tests, where expressing the scenario in human language actually adds value.',
            },
          },
          {
            level: 'advanced',
            q: { tr: '-n 4 ile paralel koşumda, iki senaryonun paylaşılan bir static Map\'e id yazması yüzünden veri bozuluyor. Static alanların yerine hangi Gauge mekanizması geçer?', en: 'In a parallel run with -n 4, data gets corrupted because two scenarios write IDs to a shared static Map. What Gauge mechanism replaces static fields?' },
            a: {
              tr: 'ScenarioDataStore kullanırım — her senaryo kendi izole veri alanına sahip olur, paralel süreçler arasında hiç sızıntı olmaz. ScenarioDataStore.put("orderId", id) ile yazarım, aynı senaryo içindeki başka bir step ScenarioDataStore.get("orderId") ile okur; senaryo bitince veri otomatik temizlenir. Bu, Java\'da paylaşılan bir static Map yerine ThreadLocal veya bir dependency-injection scope\'u kullanmanın Gauge\'deki doğrudan karşılığıdır.',
              en: 'I use ScenarioDataStore — each scenario gets its own isolated data space, with zero leakage across parallel processes. I write with ScenarioDataStore.put("orderId", id), and another step in the same scenario reads with ScenarioDataStore.get("orderId"); the data is cleared automatically when the scenario ends. This is Gauge\'s direct equivalent of using ThreadLocal or a dependency-injection scope in Java instead of a shared static Map.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'ScenarioDataStore, SpecDataStore ve SuiteDataStore arasındaki farkı, çok-spec\'li bir E2E koşumunda somut bir örnekle anlat.', en: 'Explain the difference between ScenarioDataStore, SpecDataStore, and SuiteDataStore with a concrete example in a multi-spec E2E run.' },
            a: {
              tr: 'ScenarioDataStore bir senaryo boyunca yaşar — örneğin bir siparişin ID\'sini oluşturma adımından doğrulama adımına taşımak için. SpecDataStore bir .spec dosyasındaki TÜM senaryolar boyunca yaşar — örneğin dosya başında oluşturulan bir test kullanıcısının kimlik bilgilerini o dosyadaki her senaryoda paylaşmak için. SuiteDataStore ise TÜM koşum boyunca yaşar — örneğin @BeforeSuite\'te alınan bir auth token\'ı tüm spec dosyaları arasında paylaşmak için. Kapsam sırası Suite > Spec > Scenario şeklindedir ve her biri bir öncekinden daha kısa ömürlüdür.',
              en: 'ScenarioDataStore lives for the duration of one scenario — e.g., carrying an order ID from the creation step to the verification step. SpecDataStore lives across ALL scenarios in one .spec file — e.g., sharing a test user\'s credentials created at the top of the file across every scenario in it. SuiteDataStore lives for the ENTIRE run — e.g., sharing an auth token obtained in @BeforeSuite across all spec files. The scope order is Suite > Spec > Scenario, each shorter-lived than the one before it.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Belirli bir senaryo, dinamik yüklenen bir sayfada 10 koşumdan 1\'inde NoSuchElementException ile flaky davranıyor. "Sadece sleep ekle" demeden sistematik teşhis ve çözüm sürecini anlat.', en: 'A specific scenario is flaky about 1 in 10 runs with NoSuchElementException on a dynamic-loading page. Walk through your systematic diagnosis and fix — without saying "just add a sleep".' },
            a: {
              tr: 'Önce locator\'ı DevTools\'ta test ederim: element bulunuyorsa sorun zamanlamadır, bulunamıyorsa locator kırıktır. Zamanlama ise WebDriverWait + ExpectedConditions.visibilityOfElementLocated ile çözülür — koşul sağlanınca beklemeden devam eder, sabit bir Thread.sleep gibi hem gereksiz yavaşlatmaz hem de yetersiz kalıp yine flaky bırakmaz. Ardından raporun geçmiş koşumlarındaki fail zamanlarına bakarım: belirli bir yük/network koşulunda mı tekrarlanıyor, yoksa gerçekten rastgele mi? Kök sebep netleşmeden "geçici" bir sleep eklemek riski sadece ERTELER, ÇÖZMEZ.',
              en: 'First I test the locator in DevTools: if the element is found, the problem is timing; if not, the locator is broken. Timing is fixed with WebDriverWait + ExpectedConditions.visibilityOfElementLocated — it proceeds as soon as the condition holds, unlike a fixed Thread.sleep which either wastes time unnecessarily or still falls short and stays flaky. Then I check past run failure timestamps in the report: does it correlate with a specific load/network condition, or is it truly random? Adding a "temporary" sleep before the root cause is clear only POSTPONES the risk, it does not FIX it.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'locators.json 40 sayfa ve 600 elemente büyüdü, tek dosya artık yönetilemez hale geldi. Hangi yapısal sorunlar ortaya çıkar ve ölçeklendirmeyi nasıl yeniden tasarlarsın?', en: 'locators.json has grown to 40 pages and 600 elements, and the single file has become unmanageable. What structural problems emerge, and how do you redesign for scale?' },
            a: {
              tr: 'Tek dosyada Git conflict oranı artar (iki geliştirici aynı anda farklı sayfaları düzenlerse merge çakışması olur), dosya IDE\'de aranabilirliğini kaybeder ve anahtar yazım hataları (typo) artık gözle taranamaz. Ölçeklendirme için locators.json\'u sayfa bazlı ayrı dosyalara bölerim (loginPage.locators.json, checkoutPage.locators.json), her sayfayı ayrı Git dosyası olarak conflict riskini azaltırım ve isimlendirme konvansiyonu (camelCase element adları) zorunlu kılarım. Büyük ölçekte hibrit bir yaklaşım da düşünürüm: sık değişen sayfalar JSON\'da, stabil çekirdek sayfalar @FindBy\'da kalabilir.',
              en: 'A single file increases Git conflict rate (two developers editing different pages at once causes merge conflicts), the file loses IDE searchability, and key typos can no longer be visually scanned. To scale, I split locators.json into per-page files (loginPage.locators.json, checkoutPage.locators.json), reducing conflict risk by making each page a separate Git file, and mandate a naming convention (camelCase element names). At large scale I would also consider a hybrid approach: fast-changing pages in JSON, stable core pages staying in @FindBy.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Sadece etiketli senaryolarda değil, herhangi bir fail eden step\'te otomatik ekran görüntüsü alıp html-report\'a gömmek istiyorsun. Gauge hook\'ları ve rapor API\'siyle nasıl tasarlarsın?', en: 'You want an automatic screenshot on ANY failing step (not just tagged scenarios), embedded inline in the html-report. How do you design this with Gauge hooks and the report API?' },
            a: {
              tr: '@AfterStep hook\'unu (tag filtresi olmadan, tüm step\'lere uygulanacak şekilde) kullanırım; metot içinde ExecutionContext.getCurrentScenario().getIsFailing() kontrolüyle sadece o step fail olduysa Gauge.captureScreenshot() çağırırım — bu, html-report plugin\'i tarafından otomatik olarak ilgili adımın altına gömülür, ek entegrasyon kodu gerekmez. Custom bir grabber gerekiyorsa (örn. tarayıcı dışı bir ekran görüntüsü), Gauge.writeMessage() ile ek bağlam ekleyip özel bir dosyayı ekstra bir attach mekanizmasıyla rapora dahil edebilirim.',
              en: 'I use the @AfterStep hook (with no tag filter, so it applies to every step); inside the method I check ExecutionContext.getCurrentScenario().getIsFailing() and call Gauge.captureScreenshot() only when that step failed — this gets automatically embedded under the relevant step by the html-report plugin, no extra integration code needed. If a custom grabber is needed (e.g., a non-browser screenshot), I can add extra context with Gauge.writeMessage() and include a custom file in the report via an additional attach mechanism.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'gauge-maven-plugin kullanarak her PR\'da smoke testlerini koşturan, JUnit-uyumlu XML üreten ve java plugin\'i eksikse build\'i AÇIKÇA kıran bir CI pipeline\'ı tasarla. Hangi parçalar birlikte gerekir?', en: 'Design a CI pipeline using gauge-maven-plugin that runs smoke tests on every PR, produces JUnit-compatible XML, and CLEARLY fails the build if the java plugin is missing. Which pieces need to come together?' },
            a: {
              tr: 'Pipeline\'da sırayla: (1) JDK ve gauge CLI kurulumu adımı — sonunda gauge version çıktısında java plugin\'inin listelendiğini doğrulayan AYRI bir kontrol adımı (yoksa build burada AÇIKÇA fail eder, "sessiz geçme" olmaz), (2) mvn gauge:execute -Dtags="smoke" ile filtreli koşum, (3) xml-report plugin\'i ile JUnit-uyumlu XML üretimi (CI\'ın test sonuç görselleştirmesi bunu okur), (4) html-report artifact\'ının PR\'a yorum olarak veya artifact linkiyle eklenmesi. Plugin doğrulama adımının ayrı olması kritik — yoksa hata mvn gauge:execute\'ta oluşur ve kök sebep pipeline loglarında gömülü kalır.',
              en: 'In order: (1) a JDK and gauge CLI install step — followed by a SEPARATE verification step confirming the java plugin is listed in gauge version output (if not, the build FAILS CLEARLY here, no silent pass-through), (2) a filtered run via mvn gauge:execute -Dtags="smoke", (3) JUnit-compatible XML production via the xml-report plugin (read by the CI\'s test result visualization), (4) attaching the html-report artifact to the PR as a comment or artifact link. The separate plugin verification step is critical — otherwise the error occurs inside mvn gauge:execute and the root cause stays buried in the pipeline logs.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Ürün kararı: her PR\'da Gauge spec\'leri teknik olmayan paydaşlarca incelenecek. Bu, hangi rapor formatını/CI artifact stratejisini zorunlu kılar ve step isimlendirmesine hangi disiplini getirir?', en: 'Product decision: Gauge specs will be reviewed by non-technical stakeholders on every PR. What report format/CI artifact strategy does this require, and what discipline does it impose on step naming?' },
            a: {
              tr: 'html-report\'u her PR\'da bir artifact veya statik site olarak yayınlamak gerekir — XML rapor sadece makine tüketimi içindir, insan okuyucu HTML\'e ihtiyaç duyar. Bu karar aynı zamanda spec dosyalarının kendisinin de PR diff\'inde okunabilir kalmasını zorunlu kılar: step cümleleri teknik jargon yerine iş diliyle yazılmalı (örn. "driver.findElement çağır" değil, "Kullanıcı sepete ürün ekler"). Ayrıca @Step annotation metninin spec cümlesiyle birebir eşleşmesi zorunluluğu, paydaşın okuduğu cümlenin GERÇEKTEN koşan senaryo olduğunu garanti eder — ayrı bir "belgeleme" dosyası tutmaya göre büyük bir güvenilirlik avantajıdır.',
              en: 'The html-report needs to be published as an artifact or static site on every PR — the XML report is for machine consumption only; human readers need HTML. This decision also mandates that the spec files themselves stay readable in the PR diff: step sentences must be written in business language rather than technical jargon (e.g., "User adds item to cart" instead of "call driver.findElement"). Additionally, the requirement that the @Step annotation text exactly matches the spec sentence guarantees the sentence a stakeholder reads is the ACTUAL scenario that runs — a major reliability advantage over maintaining a separate "documentation" file.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'REST Assured (önceki bölümden) ile Gauge\'ü API testi için karşılaştır — Gauge step\'leri REST Assured çağrılarını sarabilir mi? Doğrudan JUnit\'te REST Assured yazmaya kıyasla ne kazanılır, ne kaybedilir?', en: 'Compare REST Assured (from an earlier section) with Gauge for API testing — can Gauge steps wrap REST Assured calls? What is gained/lost versus writing REST Assured directly in JUnit?' },
            a: {
              tr: 'Evet, sarabilir: bir @Step metodu içinde given().when().then() zincirini çağırmak teknik olarak sorunsuzdur. Kazanılan: API senaryosu insan dilinde okunabilir hale gelir ve iş akışı (örn. "Kullanici giris yapar, sonra siparis olusturur, sonra odeme yapar") tek bir Markdown akışında görünür olur. Kaybedilen: REST Assured\'ın kendi fluent zincirinin (given/when/then) IDE\'de doğrudan görünürlüğü ve akıcılığı bir @Step katmanının arkasına gizlenir — basit, tek endpoint testlerinde bu ekstra katman gereksiz karmaşıklık ekler. Karar yine "kim okuyacak" sorusuna döner: sadece geliştirici okuyorsa doğrudan JUnit + REST Assured yeterlidir.',
              en: 'Yes, it can: calling a given().when().then() chain inside a @Step method is technically fine. Gained: the API scenario becomes readable in human language, and the workflow (e.g., "User signs in, then creates an order, then pays") becomes visible as a single Markdown flow. Lost: REST Assured\'s own fluent chain (given/when/then) visibility and directness in the IDE gets hidden behind a @Step layer — for simple, single-endpoint tests this extra layer adds unnecessary complexity. The decision again comes down to "who will read it": if only developers read it, plain JUnit + REST Assured is enough.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Java, JS ve Python test projelerinin aynı web uygulaması için UI locator\'larına ihtiyaç duyduğu bir monorepo\'da paylaşılan bir JSON locator kaynağını nasıl mimarlarsın? Bu, derleme-zamanı güvenliği için hangi riski doğurur?', en: 'In a monorepo where Java, JS, and Python test projects all need UI locators for the same web app, how do you architect a shared JSON locator source of truth? What risk does this introduce for compile-time safety?' },
            a: {
              tr: 'Tek bir locators/ dizini (veya paylaşılan bir paket/submodule) altında sayfa-bazlı JSON dosyaları tutarım; her dilin test projesi kendi runtime\'ında (Java: Jackson, JS: JSON.parse, Python: json modülü) aynı dosyayı okuyup kendi By/locator API\'sine çevirir. Doğan risk: HİÇBİR dil derleme zamanında JSON anahtarlarının doğruluğunu garanti edemez — üç dilin üçü de aynı runtime fail-fast tasarımına (anlamlı hata mesajıyla) ihtiyaç duyar, yoksa aynı yazım hatası üç ayrı projede üç ayrı belirsiz hata olarak ortaya çıkar. Bu riski azaltmak için ortak bir JSON şema doğrulaması (CI\'da çalışan bir linter) eklerim.',
              en: 'I keep page-based JSON files under a single locators/ directory (or a shared package/submodule); each language\'s test project reads the same file in its own runtime (Java: Jackson, JS: JSON.parse, Python: the json module) and converts it into its own By/locator API. The resulting risk: NO language can guarantee JSON key correctness at compile time — all three languages need the same runtime fail-fast design (with a descriptive error message), otherwise the same typo surfaces as three separate, confusing errors in three separate projects. To mitigate this, I add a shared JSON schema validation (a linter running in CI).',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Aynı spec\'i dev/staging/prod-readonly ortamlarına karşı, farklı base URL\'lerle ve prod\'da bazı adımların atlanması gerekerek koşturman gerekiyor. env/ ve tags\'i bunun için nasıl tasarlarsın?', en: 'You need to run the same spec against dev/staging/prod-readonly environments, with different base URLs, and some steps must be skipped on prod. How do you design env/ and tags for this?' },
            a: {
              tr: 'Her ortam için ayrı bir env/ klasörü (env/dev, env/staging, env/prod-readonly) oluşturup base.url\'i her birine özel tanımlarım; koşum --env prod-readonly ile seçilir. Prod\'da atlanması gereken adımlar (örn. veri oluşturan bir POST isteği) için senaryoları tags: destructive ile etiketlerim ve prod koşumunu gauge run --env prod-readonly --tags "not destructive" specs şeklinde çalıştırırım — Gauge\'ün tag ifadeleri and/or/not destekler. Bu, tek bir spec kaynağından üç farklı güvenli koşum profili üretir.',
              en: 'I create a separate env/ folder per environment (env/dev, env/staging, env/prod-readonly), defining base.url specifically for each; the run is selected with --env prod-readonly. For steps that must be skipped on prod (e.g., a data-creating POST request), I tag scenarios with tags: destructive and run prod as gauge run --env prod-readonly --tags "not destructive" specs — Gauge\'s tag expressions support and/or/not. This produces three distinct, safe run profiles from a single spec source.',
            },
          },
          {
            level: 'advanced',
            q: { tr: '@CacheLookup\'ın YANLIŞLIKLA değil, BİLİNÇLİ olarak doğru seçim olduğu bir senaryo anlat. Bunun güvenli olması için hangi değişmezin (invariant) doğru olması gerekir?', en: 'Describe a scenario where using @CacheLookup DELIBERATELY (not by mistake) is the CORRECT choice. What invariant must hold for it to be safe?' },
            a: {
              tr: 'Statik bir header/navbar elementi — sayfa boyunca hiç yeniden render olmayan, kullanıcı oturumu süresince sabit kalan bir logo veya menü linki — için @CacheLookup doğru seçimdir; her erişimde yeniden aramak gereksiz DOM sorgusu maliyeti getirir. Güvenli olmasının şartı şudur: elementin DOM\'da BİR KEZ oluşup asla yeniden mount edilmemesi (React\'te key değişmemesi, sayfa yönlendirmesi/reload olmaması). Bu invariant bozulursa (örn. SPA route değişimi elementi yeniden mount ederse) @CacheLookup StaleElementReferenceException\'a dönüşür.',
              en: 'For a static header/navbar element — a logo or menu link that never re-renders and stays fixed for the duration of the user session — @CacheLookup is the correct choice; re-finding it on every access adds needless DOM query cost. The safety requirement is: the element must mount ONCE in the DOM and never remount (no key change in React, no page navigation/reload). If this invariant is violated (e.g., an SPA route change remounts the element), @CacheLookup turns into a StaleElementReferenceException.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Takım, Gauge test hatalarının otomatik olarak fail eden step metnini ve html-report linkini içeren bir ticket açmasını istiyor. Hook + raporlama entegrasyonunu kavramsal olarak nasıl tasarlarsın?', en: 'The team wants Gauge test failures to auto-file a ticket containing the failing step text and the html-report link. How do you conceptually design the hook + reporting integration?' },
            a: {
              tr: '@AfterScenario hook\'unda ExecutionContext.getCurrentScenario().getIsFailing() true dönerse, fail eden step\'in metnini context\'ten alır ve bir issue-tracker API\'sine (örn. Jira REST API) POST isteği atarım — başlıkta step metni, açıklamada koşumun html-report artifact linki (CI\'ın yükleyip paylaştığı URL) yer alır. Duplicate ticket açılmasını önlemek için önce aynı step metniyle açık bir ticket olup olmadığını API üzerinden sorgularım; varsa yeni ticket açmak yerine mevcut olana yorum eklerim.',
              en: 'In the @AfterScenario hook, if ExecutionContext.getCurrentScenario().getIsFailing() returns true, I take the failing step\'s text from the context and POST it to an issue-tracker API (e.g., the Jira REST API) — the title carries the step text, the description carries the run\'s html-report artifact link (the URL the CI uploaded and shared). To avoid duplicate tickets, I first query the API for an existing open ticket with the same step text; if one exists, I add a comment to it instead of opening a new one.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir mühendis By önceliği disiplinini (id > name > css > xpath) bırakıp "sadece AI-üretimli selector kullanalım" öneriyor. Bakım maliyeti açısından cevabın ne olur ve bu öneriyi nasıl değerlendirirsin?', en: 'An engineer proposes dropping the By-priority discipline (id > name > css > xpath) in favor of "just use AI-generated selectors". What is your response regarding maintenance cost, and how would you evaluate the proposal?' },
            a: {
              tr: 'AI-üretimli selector\'lar genelde DOM\'un o anki yapısına göre en spesifik (ve genellikle en kırılgan) yolu üretme eğilimindedir — tam olarak öncelik merdiveninin kaçınmaya çalıştığı XPath-benzeri kırılganlığı geri getirebilir, çünkü model "hangi locator en STABİL" sorusunu değil "hangi locator BU ANDA elementi bulur" sorusunu optimize eder. Öneriyi tamamen reddetmek yerine, AI\'ı öneri/ilk-taslak aracı olarak kullanıp çıktıyı öncelik merdiveni disipliniyle (id/name varsa onu tercih et, yoksa anlamlı CSS) manuel gözden geçirme adımına tabi tutarım — otomatik üretim + insan denetimi, tek başına otomasyona güvenmekten daha güvenilirdir.',
              en: 'AI-generated selectors tend to produce the most specific (and often most fragile) path based on the DOM\'s current structure — they can reintroduce exactly the XPath-like fragility the priority ladder tries to avoid, because the model optimizes for "which locator finds the element RIGHT NOW", not "which locator is most STABLE". Rather than rejecting the proposal outright, I would use AI as a suggestion/first-draft tool and subject the output to a manual review step following the priority-ladder discipline (prefer id/name if present, otherwise a meaningful CSS selector) — generation plus human review is more reliable than trusting automation alone.',
            },
          },
        ],
      },
    ],
  },
]

// ─── Hero & Tabs ──────────────────────────────────────────────────────────────

const trHero = {
  title: '📏 Gauge',
  subtitle: 'Java ile Markdown Spec Tabanlı Test Otomasyonu',
  intro: 'Gauge, ThoughtWorks\'ün açık kaynak test otomasyon framework\'üdür: senaryolar düz Markdown ile yazılır, Java step implementation\'larına @Step annotation\'ı ile bağlanır. Selenium By locator\'ları, @FindBy/PageFactory ve JSON locator deposu ile gerçek bir E2E framework\'ü kurmayı bu sayfada öğreneceksin.',
}

const enHero = {
  title: '📏 Gauge',
  subtitle: 'Markdown-Spec Test Automation with Java',
  intro: 'Gauge is ThoughtWorks\' open-source test automation framework: scenarios are written in plain Markdown and bound to Java step implementations via the @Step annotation. On this page you will learn to build a real E2E framework with Selenium By locators, @FindBy/PageFactory, and a JSON locator repository.',
}

const trTabs = [
  '🏠 Neden Gauge?', '⚙️ Kurulum', '📝 Spec & Step Temelleri',
  '🎯 By ile Locator Yazma', '🗂️ JSON Locator Deposu', '🌍 Ekosistem & CI/CD',
  '🚨 Gerçek Hayat Sorunları', '💼 Mülakat Soruları',
]

const enTabs = [
  '🏠 Why Gauge?', '⚙️ Setup', '📝 Spec & Step Basics',
  '🎯 Locators with By', '🗂️ JSON Locator Repository', '🌍 Ecosystem & CI/CD',
  '🚨 Real-Life Issues', '💼 Interview Q&A',
]

// ─── Export ───────────────────────────────────────────────────────────────────

export const gaugeData = {
  tr: { hero: trHero, tabs: trTabs, sections },
  en: { hero: enHero, tabs: enTabs, sections },
}

fillMissingCodeTrios(gaugeData, 'gauge')

// ─── Feynman checkpoints ──────────────────────────────────────────────────────
const gaugeFeynmanDefs = [
  {
    sectionIndex: 0,
    promptTr: 'Gauge nedir ve Cucumber/TestNG dururken neden tercih edilir? "Yaşayan doküman" kavramını da kullanarak anlat.',
    promptEn: 'What is Gauge and why choose it over Cucumber/TestNG? Explain using the concept of "living documentation".',
    keywords: [['markdown', 'spec'], ['cucumber', 'gherkin', 'testng'], ['dokuman', 'doküman', 'documentation', 'living'], ['step', 'implementation', 'java'], ['drift', 'kopma', 'senkron']],
    minScore: 3,
    modelAnswerTr: 'Gauge, senaryoların düz Markdown (.spec) ile yazıldığı, ThoughtWorks çıkışlı açık kaynak bir test otomasyon framework\'üdür. Cucumber\'dan farkı Gherkin\'in Given/When/Then kalıbını zorunlu kılmaması, TestNG\'den farkı ise senaryonun insan dilinde ve teknik olmayan ekip üyelerinin okuyabileceği bir dokümanda yaşamasıdır. Spec dosyası hem doküman hem testtir (yaşayan doküman): senaryo değişip implementasyon güncellenmezse koşum "Step implementation not found" ile kırılır, yani doküman ile kodun sessizce kopması yapısal olarak engellenir.',
    modelAnswerEn: 'Gauge is an open-source test automation framework from ThoughtWorks where scenarios are written in plain Markdown (.spec). Unlike Cucumber it does not mandate Gherkin\'s Given/When/Then grammar, and unlike TestNG the scenario lives in a human-readable document non-technical teammates can read. The spec file is both documentation and test (living documentation): if the scenario changes and the implementation is not updated, the run breaks with "Step implementation not found" — silent drift between document and code is structurally impossible.',
  },
  {
    sectionIndex: 1,
    promptTr: 'Gauge kurulumunun neden iki aşamalı (CLI + plugin) olduğunu ve yeni bir CI agent\'ında hangi adımların şart olduğunu anlat.',
    promptEn: 'Explain why Gauge installation has two stages (CLI + plugin) and which steps are mandatory on a fresh CI agent.',
    keywords: [['cli', 'çekirdek', 'core', 'gauge'], ['plugin', 'java'], ['install'], ['ci', 'agent'], ['version', 'dogrula', 'doğrula', 'verify']],
    minScore: 3,
    modelAnswerTr: 'Gauge dil-bağımsız bir çekirdek CLI + dil plugin\'lerinden oluşur: Java, JS, Python ekipleri aynı çekirdeği paylaşır, her runtime\'ı pakete gömmek kurulumu şişirirdi. Yeni CI agent\'ında sıra: gauge CLI kur (choco/brew/apt), gauge install java, gauge install html-report, sonra gauge version çıktısında plugin\'leri doğrula. Plugin adımı atlanırsa koşum "Failed to start gauge API: Plugin java not installed" ile kırılır. Plugin\'ler ~/.gauge altına iner ve makinedeki tüm projeler paylaşır.',
    modelAnswerEn: 'Gauge consists of a language-agnostic core CLI + language plugins: Java, JS, and Python teams share the same core, and bundling every runtime would bloat the installer. On a fresh CI agent: install the gauge CLI (choco/brew/apt), gauge install java, gauge install html-report, then verify plugins in the gauge version output. Skipping the plugin step breaks the run with "Failed to start gauge API: Plugin java not installed". Plugins download under ~/.gauge and are shared by all projects on the machine.',
  },
  {
    sectionIndex: 2,
    promptTr: 'Spec dosyası ile @Step implementasyonu arasındaki eşleşme nasıl çalışır? Gauge\'ün bulanık (fuzzy) eşleştirme yapmamasının nedenini de anlat.',
    promptEn: 'How does matching between a spec file and a @Step implementation work? Also explain why Gauge deliberately avoids fuzzy matching.',
    keywords: [['birebir', 'exact', 'karakter'], ['@step', 'annotation'], ['parametre', 'parameter', 'placeholder'], ['not found', 'kirilir', 'kırılır', 'fail'], ['yanlis pass', 'yanlış pass', 'false pass', 'sahte']],
    minScore: 3,
    modelAnswerTr: 'Spec\'teki her * satırı, @Step("...") annotation metniyle karakter karakter eşleştirilir; çift tırnaklı değerler <parametre> yer tutucularına akar. Metot adı serbesttir — bağ annotation metni üzerindendir. Bulanık eşleştirme bilinçli olarak yoktur: hangi metodun koşacağı tahmine dayansaydı yanlış implementasyon sessizce koşabilir ve sahte PASS üretebilirdi. Eşleşme kopunca koşum "Step implementation not found" ile kırılır — bu katılık, testin en tehlikeli sonucu olan yanlış PASS\'ten korur.',
    modelAnswerEn: 'Every * line in the spec is matched character-by-character against the @Step("...") annotation text; double-quoted values flow into <parameter> placeholders. The method name is free — the binding is through the annotation text. Fuzzy matching is deliberately absent: if which method runs were a guess, the wrong implementation could run silently and produce a false PASS. When the match breaks, the run fails with "Step implementation not found" — this rigidity protects against the most dangerous test outcome, a false PASS.',
  },
  {
    sectionIndex: 3,
    promptTr: 'By.id/css/xpath öncelik sırasının mantığını ve @FindBy + PageFactory\'nin lazy proxy mekanizmasını anlat.',
    promptEn: 'Explain the logic of the By.id/css/xpath priority order and the lazy proxy mechanism of @FindBy + PageFactory.',
    keywords: [['id', 'oncelik', 'öncelik', 'priority'], ['css', 'xpath'], ['kirilgan', 'kırılgan', 'fragile', 'bakim', 'bakım'], ['proxy', 'lazy', 'initelements'], ['erisim', 'erişim', 'access', 'click']],
    minScore: 3,
    modelAnswerTr: 'Öncelik id > name > css > xpath\'tir çünkü güç ile kırılganlık aynı eksendedir: id tekil ve stabildir, XPath her şeyi bulur ama DOM\'un yapısına bağımlı olduğu için en küçük değişimde kırılır — locator bakımı UI otomasyonunun en büyük maliyetidir. @FindBy + PageFactory.initElements alanlara gerçek WebElement değil dinamik proxy koyar; element, alana ilk erişimde (click/sendKeys) aranır. Bu yüzden Page Object, sayfa yüklenmeden oluşturulabilir; hata ancak elemente gerçekten dokununca gelir — Hibernate lazy loading ile aynı fikirdir.',
    modelAnswerEn: 'The priority is id > name > css > xpath because power and fragility share an axis: id is unique and stable, XPath finds anything but depends on DOM structure so it breaks at the smallest change — locator maintenance is UI automation\'s biggest cost. @FindBy + PageFactory.initElements injects dynamic proxies into fields, not real WebElements; the element is looked up at first field access (click/sendKeys). That is why a Page Object can be constructed before the page loads; the error only comes when the element is actually touched — the same idea as Hibernate lazy loading.',
  },
  {
    sectionIndex: 4,
    promptTr: 'JSON locator deposunun ne olduğunu, @FindBy\'a göre artı/eksilerini ve depo sınıfının neden fail-fast tasarlandığını anlat.',
    promptEn: 'Explain what a JSON locator repository is, its pros/cons versus @FindBy, and why the repository class is designed fail-fast.',
    keywords: [['json', 'locators'], ['jackson', 'objectmapper', 'typereference'], ['derleme', 'compile', 'runtime'], ['classpath', 'resources'], ['fail', 'exception', 'null']],
    minScore: 3,
    modelAnswerTr: 'JSON deposu, locator\'ları koddan çıkarıp sayfa→element→{type,value} yapısında bir locators.json dosyasına taşır; Jackson ObjectMapper + TypeReference ile Map<String, Map<String, LocatorDef>> olarak okunur ve toBy() ile By nesnesine çevrilir. Artıları: derleme gerektirmeyen locator düzeltmesi, kod yazmayanların katkısı, diller arası paylaşım. Eksisi: tip güvenliği kaybı — yanlış anahtar derlemede değil runtime\'da patlar. Bu yüzden get() eksik anahtarda sessiz null yerine "Mevcut elementler: [...]" mesajlı exception fırlatır: hata kaynağına en yakın yerde, en açıklayıcı haliyle görünür.',
    modelAnswerEn: 'A JSON repository moves locators out of code into a locators.json structured page→element→{type,value}; it is read with Jackson ObjectMapper + TypeReference into Map<String, Map<String, LocatorDef>> and converted to By objects via toBy(). Pros: locator fixes without compilation, contributions from non-coders, cross-language sharing. Con: lost type safety — a wrong key explodes at runtime, not compile time. That is why get() throws an exception with an "Available elements: [...]" message on a missing key instead of silent null: the error surfaces closest to its source, in its most descriptive form.',
  },
  {
    sectionIndex: 5,
    promptTr: 'env/ klasörünün konfigürasyonu koddan nasıl ayırdığını ve ScenarioDataStore/SpecDataStore/SuiteDataStore\'un paralel koşumda neden static alanlardan daha güvenli olduğunu anlat.',
    promptEn: 'Explain how the env/ folder separates configuration from code, and why ScenarioDataStore/SpecDataStore/SuiteDataStore are safer than static fields under parallel execution.',
    keywords: [['env', 'ortam', 'environment'], ['properties', 'base.url', 'default'], ['datastore', 'scenariodatastore', 'specdatastore', 'suitedatastore'], ['static', 'paralel', 'parallel'], ['izolasyon', 'isolation', 'threadlocal']],
    minScore: 3,
    modelAnswerTr: 'env/ klasörü, base URL gibi ortam bazlı ayarları Java koduna gömmek yerine env/default/ ve env/test/ gibi ayrı .properties dosyalarında tutar; gauge run --env test dendiğinde Gauge önce default\'u sonra test\'i (üzerine yazarak) yükler ve Java kodu System.getProperty ile şeffafça okur — Maven\'ın -P profiles mekanizmasıyla aynı felsefe. Paralel koşumda (--parallel -n 4) iki senaryo aynı static Map\'e yazarsa veri bozulur; ScenarioDataStore/SpecDataStore/SuiteDataStore bunun yerine sırasıyla senaryo/dosya/koşum kapsamında izole veri alanları sağlar ve kapsam bitince otomatik temizlenir — Java\'da ThreadLocal kullanmanın motive ettiği aynı izolasyon ihtiyacıdır.',
    modelAnswerEn: 'The env/ folder keeps environment-based settings like base URL in separate .properties files such as env/default/ and env/test/, instead of baking them into Java code; when gauge run --env test is used, Gauge loads default first, then test (overriding it), and Java code reads it transparently via System.getProperty — the same philosophy as Maven\'s -P profiles mechanism. Under parallel execution (--parallel -n 4), if two scenarios write to the same static Map, the data gets corrupted; ScenarioDataStore/SpecDataStore/SuiteDataStore instead provide isolated data spaces scoped to scenario/file/run respectively, and clear automatically when their scope ends — the same isolation need that motivates using ThreadLocal in Java.',
  },
  {
    sectionIndex: 6,
    promptTr: 'Gauge + Selenium yığınında kırmızı bir testi katman katman nasıl teşhis edersin? İki örnek hata üzerinden anlat.',
    promptEn: 'How do you diagnose a red test layer by layer in the Gauge + Selenium stack? Explain with two example errors.',
    keywords: [['katman', 'layer', 'teshis', 'teşhis'], ['step', 'not found', 'plugin'], ['nosuchelement', 'stale', 'selector'], ['wait', 'bekle', 'timing', 'zamanlama'], ['flaky', 'devtools']],
    minScore: 3,
    modelAnswerTr: 'Önce hangi katmanın konuştuğunu ayırırım: "Plugin java not installed" Gauge çekirdeği katmanıdır (gauge install java), "Step implementation not found" spec-kod eşleşme katmanıdır (annotation metnini spec\'le birebir eşitle), NoSuchElementException Selenium katmanıdır, "Element bulunamadi: ..." kendi JSON depomuzun katmanıdır. Örnek 1: NoSuchElementException\'da locator\'ı DevTools\'ta test ederim — bulunuyorsa sorun zamanlamadır, WebDriverWait + ExpectedConditions eklerim. Örnek 2: StaleElementReferenceException\'da saklanmış referansı bırakıp elementi aksiyondan hemen önce yeniden bulurum, dinamik sayfada @CacheLookup\'ı kaldırırım.',
    modelAnswerEn: 'First I identify which layer is speaking: "Plugin java not installed" is the Gauge core layer (gauge install java), "Step implementation not found" is the spec-code binding layer (make the annotation text match the spec exactly), NoSuchElementException is the Selenium layer, "Element not found: ..." is our own JSON repository layer. Example 1: for NoSuchElementException I test the locator in DevTools — if it is found, the problem is timing, so I add WebDriverWait + ExpectedConditions. Example 2: for StaleElementReferenceException I drop the stored reference and re-find the element right before the action, removing @CacheLookup on dynamic pages.',
  },
  {
    sectionIndex: 7,
    promptTr: 'Gauge mülakat sorularının neden "X nedir?" yerine senaryo tabanlı olduğunu, uçuş simülatörü benzetmesini kullanarak anlat.',
    promptEn: 'Explain why Gauge interview questions are scenario-based instead of "What is X?", using the flight-simulator analogy.',
    keywords: [['senaryo', 'scenario', 'production'], ['simulator', 'simülatör', 'ariza', 'arıza', 'failure'], ['ezber', 'memoriz', 'recall'], ['teshis', 'teşhis', 'diagnos'], ['java', 'karsilastirma', 'karşılaştırma']],
    minScore: 3,
    modelAnswerTr: 'Senaryo sorusu, uçuş simülatöründeki motor arızası testi gibidir: pilotun checklist\'i ezbere bilip bilmediğini değil, gerçek arıza anında doğru sırayla karar verip veremeyeceğini ölçer. "Step implementation not found hatası aldın, ne yaparsın?" sorusu tam olarak bunu yapar — @Step\'in tanımını ezbere bilmek Google\'da arama yapabilmekle eşdeğerdir, hatayı teşhis edip düzeltmek ise gerçek işte değer üretir. Java mülakatlarında da aynı evrim yaşanmıştır: "ArrayList nedir?" yerine "ConcurrentModificationException aldın, sebebini anlat" sorulur. Bir mühendis sözdizimini ezbere bilip mülakatı geçebilir ama gerçek bir production hatası karşısında panikleyebilir — senaryo sorusu tam da bu resume-gerçeklik farkını yakalamak içindir.',
    modelAnswerEn: 'A scenario question is like the engine-failure drill in a flight simulator: it measures not whether the pilot memorized the checklist, but whether they can make the right decision in the right order during a real failure. "You get Step implementation not found, what do you do?" does exactly this — reciting the @Step definition is equivalent to being able to search Google, while diagnosing and fixing the error produces real value on the job. Java interviews went through the same evolution: instead of "What is an ArrayList?", they ask "You got a ConcurrentModificationException, explain the cause." An engineer can memorize the syntax and pass a definition-based interview yet freeze in front of a real production error — the scenario question exists precisely to catch that resume-versus-reality gap.',
  },
]

fillMissingFeynman(gaugeData, gaugeFeynmanDefs)
