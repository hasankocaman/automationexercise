// ─── QA için Frontend — Developer'la Aynı Dili Konuşmak ───────────────────────
// TEK AĞAÇLI veri dosyası (gaugeData.js / apiTestingData.js deseni): `sections`
// iki dile de AYNI referansla verilir, tüm metin alanları { tr, en }.
// video-scene / interaktif bloklar section'a inline konur (tek ağaç = tek yer,
// bkz. CLAUDE.md §9.5). Kardeş dosya: src/data/apiTestingData.js
//
// Omurga: TEK örnek arayüz — "Bug Tracker Board" (/api-testing Bug API'sinin
// frontend'i). Sidebar (status/severity filtre) · BugCard listesi · "New Bug"
// Modal · Toast · StatusBadge. Aynı görsel çıktı saf HTML/CSS/JS, React ve
// Angular ile gösterilir: "kaynak kod farklı ama DOM ve locator mantığı nasıl
// değişiyor?" sorusu somutlaşır.
//
// İmza özelliği: "Kaynak → DOM → Locator" üçlü panosu (grid cols:3 + 🎯
// "Developer'dan Ne İste" simple-box). ASCII code bloğu OLARAK yazılmaz
// (CLAUDE.md §9.6). Locator anlatımı SYNTAX vermez — /selenium, /playwright,
// /cypress'e link atar; buradaki fark "developer'ın kodu neden bu DOM'u üretti
// ve bu yüzden hangi locator kırılmaz" mantığıdır.
//
// FAZ DURUMU: Faz 1 iskelet ✅ (Opus) · GRUP A1 referans atom ✅ (Opus) ·
// GRUP F pano referansı ✅ (Opus) · GRUP H locator-lab referansı ✅ (Opus) ·
// GRUP A2-A6, B-J → Sonnet (bkz. Documents/qa-frontend-page-plan.md §C/§D).
import { fillMissingCodeTrios, fillMissingFeynman } from './interactiveTrioFillers.js'

// ─── video-scene: "Kaynak Koddan Sayfaya" (GRUP A / tek ağaç, TEK yere konur) ─
const sourceToScreenFilm = {
  type: 'video-scene',
  id: 'qaf-source-to-screen-film',
  title: {
    tr: '🎬 Kaynak Koddan Sayfaya: Bir HTML Dosyası Nasıl Ekrandaki Butona Dönüşür?',
    en: '🎬 From Source to Screen: How an HTML File Becomes the Button on Screen',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'file',    emoji: '📄', label: { tr: 'index.html (kaynak)',   en: 'index.html (source)' },   color: '#0ea5e9' },
    { id: 'parser',  emoji: '🔎', label: { tr: 'HTML Parser',           en: 'HTML Parser' },           color: '#f59e0b' },
    { id: 'dom',     emoji: '🌳', label: { tr: 'DOM Ağacı',             en: 'DOM Tree' },              color: '#8b5cf6' },
    { id: 'render',  emoji: '🎨', label: { tr: 'Render Tree',           en: 'Render Tree' },           color: '#6366f1' },
    { id: 'screen',  emoji: '🖥️', label: { tr: 'Ekrandaki Buton',       en: 'Button on Screen' },      color: '#22c55e' },
    { id: 'devtools',emoji: '🛠️', label: { tr: 'DevTools Elements',      en: 'DevTools Elements' },     color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir gerçek: senin editörde gördüğün `index.html` DOSYASI ile Selenium/Playwright\'ın konuştuğu şey AYNI değil. Tarayıcı önce kaynağı okur, sonra bellekte yaşayan bir ağaç kurar. Bu filmde o dönüşümü adım adım izleyeceksin — ve locator\'ın aslında hangi katmanı hedeflediğini göreceksin.',
        en: 'A truth: the `index.html` FILE you see in your editor is NOT the same thing Selenium/Playwright talk to. The browser first reads the source, then builds a living tree in memory. In this film you will watch that transformation step by step — and see which layer your locator actually targets.',
      },
      code: { tr: `<button class="btn">Yeni Bug</button>`, en: `<button class="btn">New Bug</button>` },
      positions: { file: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Parser kaynağı okur: HTML metni karakter karakter taranır ve her etiket bir "token"a çevrilir. Bu aşamada henüz ekranda hiçbir şey yok, sadece metin ayrıştırılıyor. Java analojisi: kaynak `.java` dosyasının derleyici tarafından token\'lara ayrılması gibi.',
        en: 'Step 1 — The parser reads the source: the HTML text is scanned character by character and each tag becomes a "token". Nothing is on screen yet; only text is being parsed. Java analogy: like a source `.java` file being split into tokens by the compiler.',
      },
      code: { tr: `token: <button> · attr class="btn" · text "Yeni Bug"`, en: `token: <button> · attr class="btn" · text "New Bug"` },
      positions: {
        file: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        parser: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'file', to: 'parser', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — DOM ağacı kurulur: token\'lar bir AĞAÇ haline gelir; `<button>` bir node olur, `class="btn"` onun attribute\'u, "Yeni Bug" ise bir text node. İşte locator\'ın gerçekte hedeflediği yapı BUDUR — kaynak dosya değil, bu bellek ağacı.',
        en: 'Step 2 — The DOM tree is built: tokens become a TREE; `<button>` becomes a node, `class="btn"` its attribute, and "New Bug" a text node. THIS is the structure your locator actually targets — not the source file, but this in-memory tree.',
      },
      code: { tr: `button#node → attribute(class) → #text`, en: `button#node → attribute(class) → #text` },
      positions: {
        parser: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        dom: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'parser', to: 'dom' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Render Tree oluşur: DOM, CSS ile birleşir; `display:none` olan node\'lar render tree\'ye HİÇ girmez. Kritik locator dersi: DOM\'da var olan bir element render tree\'de olmayabilir — bu yüzden "element var ama tıklanamıyor" durumu ortaya çıkar.',
        en: 'Step 3 — The Render Tree forms: the DOM merges with CSS; nodes with `display:none` NEVER enter the render tree. Critical locator lesson: an element that exists in the DOM may be absent from the render tree — this is why "the element exists but is not clickable" happens.',
      },
      code: { tr: `render tree: sadece görünür node'lar`, en: `render tree: only visible nodes` },
      positions: {
        dom: { x: 20, y: 50, opacity: 0.6, scale: 0.9 },
        render: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'dom', to: 'render', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Ekrana boyanır (Paint): render tree layout hesaplanıp piksellere dönüşür ve kullanıcı butonu GÖRÜR. Kullanıcının gördüğü bu piksel; ama testin locate ettiği hâlâ Adım 2\'deki DOM node\'udur. İkisini karıştırmak flaky test\'in en yaygın kaynağıdır.',
        en: 'Step 4 — Painted to screen: the render tree is laid out, turned into pixels, and the user SEES the button. What the user sees is this pixel; but what the test locates is still the DOM node from Step 2. Confusing the two is the most common source of flaky tests.',
      },
      code: { tr: `paint → ekranda "Yeni Bug" butonu`, en: `paint → "New Bug" button on screen` },
      positions: {
        render: { x: 20, y: 50, opacity: 0.6, scale: 0.9 },
        screen: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'render', to: 'screen', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — DevTools Elements sana AĞACI gösterir, dosyayı değil: F12 → Elements panelinde gördüğün canlı DOM, locator yazarken bakman gereken tek doğru kaynaktır. "View Source" ise ilk kaynak metnidir ve JS sonradan DOM\'u değiştirdiyse artık gerçeği yansıtmaz. Kural: locator\'ını daima Elements panelinden türet.',
        en: 'Final — DevTools Elements shows you the TREE, not the file: the live DOM in F12 → Elements is the one correct source to read when writing a locator. "View Source" is the initial source text and, if JS has since changed the DOM, no longer reflects reality. Rule: always derive your locator from the Elements panel.',
      },
      code: { tr: `F12 → Elements = canlı DOM (doğru kaynak)`, en: `F12 → Elements = live DOM (the correct source)` },
      positions: {
        screen: { x: 22, y: 30, scale: 0.95 },
        devtools: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'screen', to: 'devtools', color: '#10b981' }],
    },
  ],
}

// ─── step-animation: Kaynak → DOM eşleştirme (GRUP A1) ────────────────────────
const sourceToDomSteps = {
  type: 'step-animation',
  id: 'qaf-source-to-dom-steps',
  title: { tr: 'Adım Adım: Kaynak Kod ile Canlı DOM Neden Farklıdır?', en: 'Step by Step: Why Source Code and the Live DOM Differ' },
  steps: [
    { id: 1, icon: '📄', label: { tr: 'Kaynak yazılır', en: 'Source is written' }, detail: { tr: 'Developer editörde `<ul id="bug-list"></ul>` yazar — LİSTE BOŞTUR, tek satır statik HTML.', en: 'The developer writes `<ul id="bug-list"></ul>` in the editor — the LIST IS EMPTY, a single line of static HTML.' } },
    { id: 2, icon: '🌐', label: { tr: 'Tarayıcı fetch atar', en: 'The browser fetches' }, detail: { tr: 'Sayfa açılınca JS `/api/v1/bugs` çağırır; henüz cevap gelmedi, DOM\'da hâlâ boş `<ul>` var.', en: 'On load, JS calls `/api/v1/bugs`; the response has not arrived yet, so the DOM still has an empty `<ul>`.' } },
    { id: 3, icon: '📥', label: { tr: 'JSON gelir', en: 'JSON arrives' }, detail: { tr: 'Sunucu 3 bug döner; JS her bug için `<li class="bug-card">` üretip `<ul>`\'ye ekler.', en: 'The server returns 3 bugs; for each bug JS creates a `<li class="bug-card">` and appends it to the `<ul>`.' } },
    { id: 4, icon: '🌳', label: { tr: 'Canlı DOM dolar', en: 'The live DOM fills' }, detail: { tr: 'Artık DevTools\'ta 3 `<li>` görünür — ama "View Source" hâlâ boş `<ul>` gösterir. Locator canlı DOM\'u hedeflemeli.', en: 'Now DevTools shows 3 `<li>` items — but "View Source" still shows the empty `<ul>`. The locator must target the live DOM.' } },
    { id: 5, icon: '⏱️', label: { tr: 'Timing sorunu', en: 'The timing problem' }, detail: { tr: 'Test fetch bitmeden locate ederse 0 element bulur → NoSuchElement. Çözüm: `sleep` değil, elementin varlığını BEKLE.', en: 'If the test locates before the fetch completes it finds 0 elements → NoSuchElement. The fix: not `sleep`, but WAIT for the element to be present.' } },
  ],
}

// ─── locator-explorer: Bug Tracker DOM'undan locator türetme (GRUP H lab) ─────
const bugCardLocatorExplorer = {
  type: 'locator-explorer',
  titleTr: 'Locator Laboratuvarı: BugCard DOM\'undan Locator Türet',
  titleEn: 'Locator Lab: Derive a Locator from the BugCard DOM',
  html: {
    tr: `<li [[testid|data-testid="bug-card-42"]] [[class|class="BugCard_card__x7f2a"]]>

  <span [[testid|data-testid="status-badge"]] [[class|class="Badge_open__k3n9"]]>
    [[text|OPEN]]
  </span>

  <h3 [[class|class="BugCard_title__9ab1"]]>
    [[text|Login butonu 500 donuyor]]
  </h3>

  <button
    [[id|id="edit-bug-42"]]
    [[role|aria-label="Bug'ı düzenle"]]
    [[class|class="Btn_ghost__p0q2"]]>
    [[text|Düzenle]]
  </button>

</li>`,
    en: `<li [[testid|data-testid="bug-card-42"]] [[class|class="BugCard_card__x7f2a"]]>

  <span [[testid|data-testid="status-badge"]] [[class|class="Badge_open__k3n9"]]>
    [[text|OPEN]]
  </span>

  <h3 [[class|class="BugCard_title__9ab1"]]>
    [[text|Login button freezes on 500]]
  </h3>

  <button
    [[id|id="edit-bug-42"]]
    [[role|aria-label="Edit bug"]]
    [[class|class="Btn_ghost__p0q2"]]>
    [[text|Edit]]
  </button>

</li>`,
  },
  locatorMap: {
    testid: {
      noteTr: 'data-testid, developer\'ın SADECE test için koyduğu, stil ve davranışla ilgisi olmayan stabil bir kancadır. Build\'de değişmez, refactor\'da silinmez. Java analojisi: bir metoda özel olarak eklenmiş, iş mantığından bağımsız bir @VisibleForTesting işareti gibidir.',
      noteEn: 'data-testid is a stable hook the developer adds SOLELY for tests, unrelated to styling or behavior. It does not change on build and is not removed by refactors. Java analogy: like a @VisibleForTesting marker added specifically for tests, independent of business logic.',
      tipTr: '✅ İLK TERCİH. Yoksa developer\'dan iste: "Bu satıra data-testid=\'bug-card-{id}\' ekler misin?"',
      tipEn: '✅ FIRST CHOICE. If absent, ask the developer: "Could you add data-testid=\'bug-card-{id}\' to this row?"',
      selenium: {
        tr: `// data-testid CSS attribute seçicisiyle hedeflenir
WebElement card = driver.findElement(By.cssSelector("[data-testid='bug-card-42']"));`,
        en: `// data-testid is targeted with a CSS attribute selector
WebElement card = driver.findElement(By.cssSelector("[data-testid='bug-card-42']"));`,
      },
      playwright: {
        tr: `// Playwright'ın yerleşik getByTestId'i tam bunun için var
await page.getByTestId('bug-card-42').click();`,
        en: `// Playwright's built-in getByTestId exists exactly for this
await page.getByTestId('bug-card-42').click();`,
      },
      cypress: {
        tr: `// Cypress'te data-* attribute seçicisi
cy.get('[data-testid="bug-card-42"]').click()`,
        en: `// data-* attribute selector in Cypress
cy.get('[data-testid="bug-card-42"]').click()`,
      },
    },
    id: {
      noteTr: 'id sayfada benzersizdir ve tarayıcı aramasını optimize eder — hızlıdır. Ama dinamik id (`edit-bug-42`) her bug için değişir; sabit değilse başlangıç-eşleşmesi (`^=`) veya data-testid daha sağlamdır.',
      noteEn: 'id is unique on the page and the browser optimizes its lookup — it is fast. But a dynamic id (`edit-bug-42`) changes per bug; if not fixed, a starts-with match (`^=`) or data-testid is more robust.',
      tipTr: '✅ Stabil id iyidir. ⚠️ id\'nin içinde değişken (uuid, satır no) varsa ona TAM eşleşme yazma.',
      tipEn: '✅ A stable id is good. ⚠️ If the id contains a variable (uuid, row number), do not write an exact match on it.',
      selenium: {
        tr: `// Sabitse By.id hızlıdır; değişkense ^= başlangıç eşleşmesi kullan
driver.findElement(By.cssSelector("[id^='edit-bug-']")).click();`,
        en: `// If stable, By.id is fast; if variable, use a ^= starts-with match
driver.findElement(By.cssSelector("[id^='edit-bug-']")).click();`,
      },
      playwright: {
        tr: `await page.locator("[id^='edit-bug-']").click();`,
        en: `await page.locator("[id^='edit-bug-']").click();`,
      },
      cypress: {
        tr: `cy.get("[id^='edit-bug-']").click()`,
        en: `cy.get("[id^='edit-bug-']").click()`,
      },
    },
    class: {
      noteTr: 'class="BugCard_card__x7f2a" bir CSS Module hash\'idir: `__x7f2a` kısmı build aracının ürettiği rastgele bir imzadır ve HER build\'de değişir. Buna göre locate yazarsan test bir sonraki deploy\'da sessizce kırılır. Bu, sayfanın en önemli locator dersidir.',
      noteEn: 'class="BugCard_card__x7f2a" is a CSS Module hash: the `__x7f2a` part is a random signature produced by the build tool and changes on EVERY build. Locate by it and your test silently breaks on the next deploy. This is the single most important locator lesson on this page.',
      tipTr: '❌ Hash class\'a ASLA bağlanma. Gördüğün an developer\'dan data-testid iste.',
      tipEn: '❌ NEVER bind to a hash class. The moment you see one, ask the developer for a data-testid.',
      selenium: {
        tr: `// ❌ Bugün çalışır, yarınki deploy'da kırılır
driver.findElement(By.className("BugCard_card__x7f2a"));
// ✅ Bunun yerine data-testid iste ve onu kullan`,
        en: `// ❌ Works today, breaks on tomorrow's deploy
driver.findElement(By.className("BugCard_card__x7f2a"));
// ✅ Ask for a data-testid instead and use that`,
      },
      playwright: {
        tr: `// ❌ Kırılgan — hash her build'de değişir
await page.locator('.BugCard_card__x7f2a').click();`,
        en: `// ❌ Fragile — the hash changes on every build
await page.locator('.BugCard_card__x7f2a').click();`,
      },
      cypress: {
        tr: `// ❌ Kırılgan
cy.get('.BugCard_card__x7f2a').click()`,
        en: `// ❌ Fragile
cy.get('.BugCard_card__x7f2a').click()`,
      },
    },
    text: {
      noteTr: 'Metne göre locate okunabilir ve iş odaklıdır, ama iki tuzağı var: (1) i18n — sayfa TR/EN arasında değişince "Düzenle"/"Edit" kırılır; (2) metin developer tarafından sık değiştirilir. Erişilebilir rol+isim (getByRole) genelde daha stabildir.',
      noteEn: 'Locating by text is readable and business-focused, but has two traps: (1) i18n — when the page switches TR/EN, "Duzenle"/"Edit" breaks; (2) text is changed often by developers. Accessible role+name (getByRole) is usually more stable.',
      tipTr: '⚠️ Tek dilli, nadir değişen etiketlerde iş görür; çok dilli arayüzde riskli.',
      tipEn: '⚠️ Works for single-language, rarely-changing labels; risky in a multi-language UI.',
      selenium: {
        tr: `// XPath ile metin eşleşmesi (i18n değişince kırılır)
driver.findElement(By.xpath("//button[normalize-space()='Düzenle']"));`,
        en: `// Text match with XPath (breaks when i18n changes)
driver.findElement(By.xpath("//button[normalize-space()='Edit']"));`,
      },
      playwright: {
        tr: `await page.getByText('Düzenle').click();`,
        en: `await page.getByText('Edit').click();`,
      },
      cypress: {
        tr: `cy.contains('Düzenle').click()`,
        en: `cy.contains('Edit').click()`,
      },
    },
    role: {
      noteTr: 'aria-label="Edit bug" erişilebilirlik ağacına bir rol+isim verir: button rolü + "Edit bug" adı. getByRole hem dayanıklı hem erişilebilirliği zorlar — locate edilebilir bir arayüz aynı zamanda ekran okuyucuyla erişilebilir bir arayüzdür.',
      noteEn: 'aria-label="Edit bug" gives the accessibility tree a role+name: button role + "Edit bug" name. getByRole is both robust and enforces accessibility — a locatable UI is also a screen-reader-accessible UI.',
      tipTr: '✅ data-testid yoksa ikinci en iyi seçim. Developer\'dan aria-label istemek erişilebilirliği de iyileştirir.',
      tipEn: '✅ Second-best choice when there is no data-testid. Asking for an aria-label also improves accessibility.',
      selenium: {
        tr: `// Selenium'da rol yerine erişilebilir isim attribute'una git
driver.findElement(By.cssSelector("[aria-label='Edit bug']")).click();`,
        en: `// In Selenium, go to the accessible-name attribute instead of role
driver.findElement(By.cssSelector("[aria-label='Edit bug']")).click();`,
      },
      playwright: {
        tr: `await page.getByRole('button', { name: 'Edit bug' }).click();`,
        en: `await page.getByRole('button', { name: 'Edit bug' }).click();`,
      },
      cypress: {
        tr: `cy.findByRole('button', { name: 'Edit bug' }).click()`,
        en: `cy.findByRole('button', { name: 'Edit bug' }).click()`,
      },
    },
  },
}

// ─── code-playground: "Yeni deploy" kırılganlık dersi (GRUP H lab) ────────────
const deployBreaksLocatorPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-h-locator-lab',
  id: 'qaf-deploy-breaks-locator',
  title: { tr: 'Kendin Dene: Deploy\'da Hayatta Kalan Locator\'ı Seç', en: 'Try It Yourself: Pick the Locator That Survives a Deploy' },
  starterCode: {
    tr: `// BugCard'ın "Düzenle" butonunu locate etmen gerekiyor.
// Bir sonraki deploy'da class hash'i BugCard_card__x7f2a → BugCard_card__z9k1p
// olarak değişecek. TODO: deploy'da KIRILMAYACAK locator'ı yaz.
await page.locator('.Btn_ghost__p0q2').click();`,
    en: `// You must locate the "Edit" button of a BugCard.
// On the next deploy the class hash changes BugCard_card__x7f2a -> BugCard_card__z9k1p
// TODO: write the locator that will NOT break on a deploy.
await page.locator('.Btn_ghost__p0q2').click();`,
  },
  solutionCode: {
    tr: `// data-testid build'den bağımsızdır → deploy'da hayatta kalır
await page.getByTestId('status-badge'); // örnek stabil kanca
await page.getByRole('button', { name: 'Edit bug' }).click();`,
    en: `// data-testid is independent of the build -> survives a deploy
await page.getByTestId('status-badge'); // example stable hook
await page.getByRole('button', { name: 'Edit bug' }).click();`,
  },
  hint: {
    tr: 'Hash class (`__p0q2`) build imzasıdır ve her deploy\'da değişir — ona bağlanan test bir sonraki sürümde 0 element bulur. Deploy\'dan bağımsız olan iki kanca: `data-testid` ve erişilebilir `role`+`name`. Developer\'dan `data-testid` istemek kalıcı çözümdür.',
    en: 'A hash class (`__p0q2`) is a build signature and changes on every deploy — a test bound to it finds 0 elements in the next release. Two hooks independent of the deploy: `data-testid` and accessible `role`+`name`. Asking the developer for a `data-testid` is the permanent fix.',
  },
  successMessage: {
    tr: 'Doğru! Hash class deploy\'da değişir; data-testid / role+name değişmez. Kırılgan locator gördüğünde çözüm testi yamalamak değil, developer\'dan stabil bir kanca istemektir.',
    en: 'Correct! A hash class changes on deploy; data-testid / role+name do not. When you see a fragile locator, the fix is not to patch the test but to ask the developer for a stable hook.',
  },
}

// ─── sections (tek ağaç — iki dile de aynı referans) ──────────────────────────
const sections = [

  // ══ GRUP A — Tarayıcı Nasıl Çalışır (Locator'ın Temeli) ════════════════════
  {
    title: { tr: '🌐 Tarayıcı Nasıl Çalışır', en: '🌐 How the Browser Works' },
    blocks: [
      // ── A1: Kaynak Kod ≠ Gördüğün Sayfa (TAM REFERANS ATOM) ──
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: {
          tr: 'Kaynak kod ile ekranda gördüğün sayfa arasındaki fark, bir BİNANIN MİMARİ PLANI ile İNŞA EDİLMİŞ BİNA arasındaki fark gibidir: plan kağıttaki statik çizimdir (`index.html`), bina ise o plandan kurulmuş, içinde insanların gezdiği canlı yapıdır (DOM). Elektrikçi (JavaScript) inşaattan sonra plana yazılmamış bir priz eklerse, artık plana bakan biri o prizi göremez — ama binada priz vardır. Peki neden bu ayrım bir testerı ilgilendirir? Çünkü Selenium/Playwright plana (kaynağa) DEĞİL, binaya (canlı DOM\'a) bakar; sen "View Source"da bir elementi görmesen de test onu bulabilir, ya da tam tersi. Java analojisi: kaynak `.java` dosyası ile JVM\'de çalışan canlı nesne grafiği gibidir — `.java` dosyasını okumak, çalışan programın o anki bellek durumunu göstermez. QA bağlamında gerçek risk şudur: kaynağa bakıp "bu element yok" veya "id şu" diye locator yazan tester, JS\'in DOM\'u sonradan değiştirdiği her sayfada kör deneme-yanılmaya düşer ve testi flaky olur — doğru refleks: locator\'ı daima DevTools → Elements\'teki CANLI DOM\'dan türetmek.',
          en: 'The gap between source code and the page you see is like the gap between a BUILDING\'S BLUEPRINT and the CONSTRUCTED BUILDING: the blueprint is a static drawing on paper (`index.html`), while the building is the living structure erected from it, with people walking around inside (the DOM). If the electrician (JavaScript) adds an outlet not drawn on the blueprint after construction, someone reading the blueprint can no longer see that outlet — yet the building has it. Why should this distinction concern a tester? Because Selenium/Playwright look at the building (the live DOM), NOT the blueprint (the source); an element you cannot see in "View Source" may still be found by the test, or vice versa. Java analogy: it is like a source `.java` file versus the live object graph running in the JVM — reading the `.java` file does not show the running program\'s current memory state. The real QA risk: a tester who reads the source and writes a locator thinking "this element is missing" or "the id is X" falls into blind trial-and-error on every page where JS mutates the DOM later, and the test becomes flaky — the right reflex is to always derive the locator from the LIVE DOM in DevTools -> Elements.',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Bu sayfa boyunca tek bir örnek arayüzü takip edeceğiz: **Bug Tracker Board** — `/api-testing` sayfasındaki Bug API\'sinin frontend\'i. Bir Sidebar (status/severity filtreleri), BugCard listesi, "New Bug" Modal\'ı, bir Toast bildirimi ve StatusBadge\'den oluşur. Aynı görsel çıktıyı önce saf HTML/CSS/JS, sonra React, sonra Angular ile göreceğiz — **kaynak kod farklı, DOM ve locator mantığı nasıl değişiyor?** Aşağıdaki film, tek bir butonun kaynaktan ekrana yolculuğunu adım adım gösterir.',
          en: 'Throughout this page we follow one example UI: the **Bug Tracker Board** — the frontend of the Bug API from the `/api-testing` page. It has a Sidebar (status/severity filters), a BugCard list, a "New Bug" Modal, a Toast notification, and a StatusBadge. We will see the same visual output first in plain HTML/CSS/JS, then React, then Angular — **the source differs, so how do the DOM and the locator logic change?** The film below shows a single button\'s journey from source to screen, step by step.',
        },
      },
      sourceToScreenFilm,
      sourceToDomSteps,
      bugCardLocatorExplorer,
      {
        type: 'quiz',
        question: {
          tr: 'Bir sayfada JS, fetch ile gelen veriyle 5 `<li>` BugCard üretip listeye ekliyor. "View Source" (Ctrl+U) ile baktığında liste BOŞ görünüyor, ama sayfada 5 kart var. Locator yazarken hangi kaynağa güvenmelisin?',
          en: 'On a page, JS creates 5 `<li>` BugCards from fetched data and appends them to the list. "View Source" (Ctrl+U) shows the list EMPTY, but the page shows 5 cards. Which source should you trust when writing a locator?',
        },
        options: [
          { id: 'a', text: { tr: '"View Source" — çünkü gerçek kaynak kod odur', en: '"View Source" — because that is the real source code' } },
          { id: 'b', text: { tr: 'DevTools → Elements paneli — çünkü JS\'ten sonraki CANLI DOM\'u gösterir', en: 'DevTools -> Elements panel — because it shows the LIVE DOM after JS' } },
          { id: 'c', text: { tr: 'Sunucudaki `.jsx` dosyası', en: 'The `.jsx` file on the server' } },
          { id: 'd', text: { tr: 'İkisi de aynı olduğu için fark etmez', en: 'It does not matter, they are the same' } },
        ],
        correct: 'b',
        explanation: {
          tr: '"View Source" ilk gelen statik HTML metnidir; JS DOM\'u sonradan değiştirdiği için artık gerçeği yansıtmaz. DevTools → Elements canlı DOM\'u gösterir — locator\'ın gerçekte hedeflediği yapı budur. Kural: locator\'ını daima Elements panelinden türet.',
          en: '"View Source" is the initial static HTML text; because JS changed the DOM afterward, it no longer reflects reality. DevTools -> Elements shows the live DOM — the structure your locator actually targets. Rule: always derive your locator from the Elements panel.',
        },
      },
      // ── A2-A6: Sonnet dolduracak (bkz. plan §D-S1). Şimdilik açılış simple-box'lar ──
      {
        type: 'heading',
        text: { tr: '🌳 A2. DOM Ağacı Anatomisi', en: '🌳 A2. Anatomy of the DOM Tree' },
      },
      {
        type: 'simple-box',
        emoji: '🌳',
        content: {
          tr: 'DOM bir AİLE AĞACIDIR: her element bir düğüm (node), içindeki elementler onun çocukları, sardığı elementler ebeveynleri. `<li>` bir element node, içindeki "OPEN" yazısı bir text node, `class="..."` ise bir attribute node. Neden bu ayrım locator için önemli? Çünkü `//li/span` gibi bir locator "li\'nin doğrudan çocuğu olan span" der — ağaçtaki akrabalık ilişkisini kullanır; ağaç yapısını bilmeyen tester ilişkisel locator kuramaz. Java analojisi: iç içe nesnelerden oluşan bir nesne grafiği gibidir — parent.getChild() zinciri. QA bağlamında: bir satırı "içinde X yazan satır" diye ilişkisel bulmak, index\'e (`li[3]`) bağlanmaktan çok daha dayanıklıdır çünkü sıralama değişince index kayar. (Bu başlığın tam interaktif içeriği Sonnet fazında tamamlanacak — bkz. plan §D-S1.)',
          en: 'The DOM is a FAMILY TREE: each element is a node, the elements inside it are its children, the elements wrapping it are its parents. A `<li>` is an element node, the "OPEN" text inside it is a text node, and `class="..."` is an attribute node. Why does this distinction matter for a locator? Because a locator like `//li/span` says "the span that is a direct child of li" — it uses the kinship in the tree; a tester who does not know the tree structure cannot build relational locators. Java analogy: like an object graph of nested objects — a parent.getChild() chain. In QA context: finding a row as "the row that contains X" is far more durable than binding to an index (`li[3]`), because the index shifts when ordering changes. (Full interactive content for this topic is completed in the Sonnet phase — see plan section D-S1.)',
        },
      },
      {
        type: 'heading',
        text: { tr: '🎨 A3. CSSOM ve Render Tree', en: '🎨 A3. CSSOM and the Render Tree' },
      },
      {
        type: 'simple-box',
        emoji: '🎨',
        content: {
          tr: 'CSSOM, DOM\'un stil ikizidir: tarayıcı CSS kurallarını da bir ağaca çevirir, sonra DOM ile CSSOM birleşip Render Tree\'yi kurar. Kritik nokta: `display:none` olan bir element DOM\'da VARDIR ama Render Tree\'de YOKTUR — yani locate edilebilir ama tıklanamaz/görünmez. Neden testerı ilgilendirir? "Element bulundu ama ElementNotInteractable" hatasının kökü tam budur: DOM\'da var, render tree\'de yok. Java analojisi: bir nesne bellekte var (DOM) ama UI thread\'inde çizilmemiş (render tree) gibi. QA bağlamında: görünürlük ile varlık iki ayrı kavramdır ve doğru bekleme stratejisi (visible mi, present mi?) bu ayrıma dayanır. (Tam interaktif içerik Sonnet fazında — plan §D-S1.)',
          en: 'The CSSOM is the DOM\'s style twin: the browser also turns CSS rules into a tree, then the DOM and CSSOM merge to build the Render Tree. Key point: an element with `display:none` EXISTS in the DOM but is ABSENT from the Render Tree — so it can be located but not clicked/seen. Why does it concern a tester? This is the exact root of the "element found but ElementNotInteractable" error: present in the DOM, absent from the render tree. Java analogy: like an object that exists in memory (DOM) but has not been drawn on the UI thread (render tree). In QA context: visibility and presence are two separate concepts, and the correct wait strategy (visible vs present?) rests on this distinction. (Full interactive content in the Sonnet phase — plan section D-S1.)',
        },
      },
      {
        type: 'heading',
        text: { tr: '⚙️ A4. Render Ne Demek? (Parse → Style → Layout → Paint → Composite)', en: '⚙️ A4. What Is Rendering? (Parse -> Style -> Layout -> Paint -> Composite)' },
      },
      {
        type: 'simple-box',
        emoji: '⚙️',
        content: {
          tr: '"Render" tek bir an değil, 5 adımlı bir MONTAJ HATTIDIR: Parse (HTML→DOM), Style (CSS→CSSOM), Layout (her kutunun yeri/boyutu hesaplanır), Paint (pikseller boyanır), Composite (katmanlar birleştirilir). Neden bir tester bu adımları bilmeli? Çünkü "sayfa yüklendi" dediğin an bu hattın neresinde olduğun, elementin tıklanabilir olup olmadığını belirler — Layout bitmeden bir butonun konumu yoktur, tıklama ıskalar. Java analojisi: bir isteğin request→controller→service→repository→response pipeline\'ı gibi, her adım bir öncekine bağlıdır. QA bağlamında: flaky test\'lerin büyük kısmı "hat henüz bitmemişken locate/tıklama" yüzündendir. (Bu başlığa "Render\'ın 5 Adımı" video-scene filmi Sonnet fazında eklenecek — plan §D-S1.)',
          en: '"Rendering" is not a single moment but a 5-step ASSEMBLY LINE: Parse (HTML->DOM), Style (CSS->CSSOM), Layout (each box\'s position/size is computed), Paint (pixels are painted), Composite (layers are combined). Why should a tester know these steps? Because where you are on this line the moment you say "the page loaded" determines whether the element is clickable — before Layout finishes a button has no position, and a click misses. Java analogy: like a request\'s request->controller->service->repository->response pipeline, each step depends on the previous. In QA context: a large share of flaky tests come from "locating/clicking while the line has not finished". (A "5 Steps of Rendering" video-scene film is added to this topic in the Sonnet phase — plan section D-S1.)',
        },
      },
      {
        type: 'heading',
        text: { tr: '🔁 A5. Reflow / Repaint (Flaky Test Kaynağı)', en: '🔁 A5. Reflow / Repaint (A Source of Flaky Tests)' },
      },
      {
        type: 'simple-box',
        emoji: '🔁',
        content: {
          tr: 'Reflow, sayfadaki bir değişiklik (yeni bir BugCard eklenmesi gibi) yüzünden tarayıcının Layout\'u yeniden hesaplamasıdır; Repaint ise sadece görünümün (renk gibi) yeniden boyanmasıdır. Neden önemli? Reflow sırasında elementlerin konumu bir an oynar — testin tam o anda locate ettiği element "bir an var bir an yok" gibi davranabilir. Java analojisi: bir koleksiyonu iterasyon sırasında değiştirince oluşan ConcurrentModification hissi gibi — yapı altından kayar. QA bağlamında: liste dolarken/animasyon oynarken locate etmek StaleElementReference\'ın klasik kaynağıdır; doğru refleks stabil hale gelmeyi beklemektir. (Tam içerik Sonnet fazında — plan §D-S1.)',
          en: 'Reflow is the browser recomputing Layout because of a change on the page (like a new BugCard being added); Repaint is only the appearance (like color) being repainted. Why does it matter? During a reflow the positions of elements shift for a moment — the element the test locates right then can behave "now here, now gone". Java analogy: like the ConcurrentModification feeling when you mutate a collection during iteration — the structure slides out from under you. In QA context: locating while a list fills or an animation plays is the classic source of StaleElementReference; the right reflex is to wait for things to stabilize. (Full content in the Sonnet phase — plan section D-S1.)',
        },
      },
      {
        type: 'heading',
        text: { tr: '🛠️ A6. DevTools Elements Paneli (Canlı DOM\'u Okumak)', en: '🛠️ A6. The DevTools Elements Panel (Reading the Live DOM)' },
      },
      {
        type: 'simple-box',
        emoji: '🛠️',
        content: {
          tr: 'DevTools → Elements paneli, testerın en güçlü silahıdır: kaynak dosyayı DEĞİL, o anki canlı DOM\'u gösterir. Bir elemente sağ tıklayıp "Copy → Copy selector" diyebilir, ama bu genelde kırılgan bir CSS yolu üretir — panelde asıl yapılması gereken elementin attribute\'larına bakıp EN DAYANIKLI olanı (data-testid, role, stabil id) seçmektir. Neden önemli? Çünkü locator kalitesi, hangi kaynağa baktığınla başlar. Java analojisi: debugger\'da çalışan programın canlı değişken durumuna bakmak gibi — kaynak koda değil, o anki gerçeğe. QA bağlamında: locator\'ını Elements\'ten türetmek, kör "Copy selector"a güvenmekten çok daha sağlam testler üretir. (Tam interaktif içerik Sonnet fazında — plan §D-S1.)',
          en: 'The DevTools -> Elements panel is the tester\'s most powerful weapon: it shows NOT the source file but the current live DOM. You can right-click an element and choose "Copy -> Copy selector", but that usually produces a fragile CSS path — what you should really do in the panel is inspect the element\'s attributes and pick the MOST DURABLE one (data-testid, role, stable id). Why does it matter? Because locator quality begins with which source you look at. Java analogy: like looking at a running program\'s live variable state in a debugger — at the current truth, not the source code. In QA context: deriving your locator from Elements produces far more robust tests than trusting blind "Copy selector". (Full interactive content in the Sonnet phase — plan section D-S1.)',
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-a',
        promptTr: 'Kaynak kod ile canlı DOM arasındaki farkı ve bir testerın locator\'ını neden "View Source"tan değil DevTools → Elements\'ten türetmesi gerektiğini, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, the difference between source code and the live DOM, and why a tester should derive their locator from DevTools -> Elements rather than "View Source", to a newcomer.',
        keywords: ['kaynak', 'source', 'dom', 'canli', 'live', 'js', 'elements', 'locator'],
        modelAnswerTr: 'Kaynak kod diskteki statik HTML metnidir; tarayıcı onu okuyup bellekte canlı bir ağaç (DOM) kurar ve JavaScript bu ağacı sonradan değiştirebilir — yeni kartlar ekler, elementleri gizler. "View Source" ilk metni gösterir, JS sonrası gerçeği yansıtmaz; DevTools → Elements ise o anki canlı DOM\'u gösterir. Selenium/Playwright canlı DOM\'a baktığı için locator\'ı da oradan türetmek gerekir, yoksa test var olmayan (veya değişmiş) bir şeyi arar ve flaky olur.',
        modelAnswerEn: 'Source code is the static HTML text on disk; the browser reads it and builds a live tree (the DOM) in memory, and JavaScript can change that tree afterward — adding new cards, hiding elements. "View Source" shows the initial text and does not reflect reality after JS; DevTools -> Elements shows the current live DOM. Since Selenium/Playwright look at the live DOM, you must derive the locator from there too, otherwise the test searches for something nonexistent (or changed) and becomes flaky.',
      },
    ],
  },

  // ══ GRUP B — HTML: Locator'ın Ham Maddesi (Sonnet) ═════════════════════════
  {
    title: { tr: '🧱 HTML: Locator\'ın Ham Maddesi', en: '🧱 HTML: The Raw Material of Locators' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧱',
        content: {
          tr: 'HTML, bir binanın İSKELET ve ETİKETLEME sistemidir: `<button>` bir kapı, `<nav>` bir koridor, `id`/`class`/`data-*` ise kapılara asılmış isim etiketleridir. Locator dediğin şey aslında "hangi etikete bakarak doğru kapıyı bulacağım?" sorusudur. Peki neden bir etiket diğerinden daha iyi? Çünkü bazı etiketler (data-testid) sadece testçiler için asılır ve hiç değişmez; bazıları (class) dekorasyon için asılır ve boya değişince (yeni deploy) düşer. Java analojisi: bir nesnenin `equals/hashCode` için kullandığın alanı seçmek gibi — kararlı olmayan alanı seçersen ilişkin bozulur. QA bağlamında: HTML\'i "locator gözüyle" okuyabilen tester, developer\'dan doğru etiketi (kalıcı bir kanca) isteyebilir; okuyamayan kör XPath\'e mahkumdur. (Bu grubun atomik başlıkları B1-B5 Sonnet fazında doldurulacak — bkz. plan §D-S2.)',
          en: 'HTML is the SKELETON and LABELING system of a building: a `<button>` is a door, a `<nav>` a corridor, and `id`/`class`/`data-*` are the name tags hung on the doors. What you call a locator is really the question "which tag do I read to find the right door?" Why is one tag better than another? Because some tags (data-testid) are hung only for testers and never change; others (class) are hung for decoration and fall off when the paint changes (a new deploy). Java analogy: like choosing which field to use for an object\'s `equals/hashCode` — pick an unstable field and the relationship breaks. In QA context: a tester who can read HTML "with a locator\'s eye" can ask the developer for the right tag (a durable hook); one who cannot is condemned to blind XPath. (The atomic topics B1-B5 of this group are filled in during the Sonnet phase — see plan section D-S2.)',
        },
      },
    ],
  },

  // ══ GRUP C — CSS: Neden Locator'ı Kırar (Sonnet) ═══════════════════════════
  {
    title: { tr: '🎨 CSS: Neden Locator\'ı Kırar', en: '🎨 CSS: Why It Breaks Locators' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎨',
        content: {
          tr: 'CSS, bir binanın BOYA ve DEKORASYON katmanıdır — ve tam da bu yüzden locator için tehlikeli bir zemindir. Class\'lar aslında stil için vardır; developer bir rengi değiştirdiğinde veya modern araçlar (CSS Modules, styled-components) her build\'de class\'a rastgele bir hash (`__x7f2a`) eklediğinde, class\'a bağlı locator sessizce kırılır. Neden bu kadar sık başımıza gelir? Çünkü DevTools\'ta gördüğün ilk şey class\'tır ve "Copy selector" genelde onu üretir — en cazip ama en kırılgan seçim. Java analojisi: bir nesneyi `toString()` çıktısına göre karşılaştırmak gibi — biçim değişince ilişki bozulur, oysa kimliği sabit bir id\'ye bağlamalıydın. QA bağlamında: class\'ın stil için var olduğunu bilen tester ona locator olarak GÜVENMEZ; bunun yerine developer\'dan data-testid ister. (Atomik başlıklar C1-C6 Sonnet fazında — bkz. plan §D-S3.)',
          en: 'CSS is the PAINT and DECORATION layer of a building — and for exactly that reason it is dangerous ground for a locator. Classes really exist for styling; when a developer changes a color, or modern tools (CSS Modules, styled-components) add a random hash (`__x7f2a`) to the class on every build, a locator bound to the class silently breaks. Why does this happen so often? Because the first thing you see in DevTools is the class, and "Copy selector" usually produces it — the most tempting yet most fragile choice. Java analogy: like comparing an object by its `toString()` output — the relationship breaks when the format changes, whereas you should have bound identity to a fixed id. In QA context: a tester who knows classes exist for styling does NOT trust them as locators; instead they ask the developer for a data-testid. (The atomic topics C1-C6 are in the Sonnet phase — see plan section D-S3.)',
        },
      },
    ],
  },

  // ══ GRUP D — JavaScript: DOM'u Kim Değiştiriyor (Sonnet) ═══════════════════
  {
    title: { tr: '⚡ JavaScript: DOM\'u Kim Değiştiriyor', en: '⚡ JavaScript: Who Changes the DOM' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚡',
        content: {
          tr: 'JavaScript, binadaki elektrik ve otomasyon sistemidir: sayfayı sonradan CANLI hale getiren, butona basınca bir şeyler olmasını sağlayan, sunucudan veri gelince yeni BugCard\'lar üreten güç budur. Neden testerı en çok ilgilendiren katman JS\'tir? Çünkü DOM\'u değiştiren odur — element bir an yoktur, fetch bitince belirir; bu yüzden "elementi bekleme" (wait) gerekir ve `sleep` yanlış cevaptır. Java analojisi: DOM ana thread\'de senkron kurulur ama fetch asenkron döner — bir CompletableFuture\'ın sonucunu beklemeden okumaya çalışmak gibi. QA bağlamında: locate timing sorunlarının kökü JS\'in asenkronluğudur; doğru refleks sabit süre uyumak değil, elementin varlığını/görünürlüğünü koşullu beklemektir. (Atomik başlıklar D1-D5 Sonnet fazında — bkz. plan §D-S4.)',
          en: 'JavaScript is the electrical and automation system of the building: it is the power that makes the page LIVE afterward, makes something happen when a button is pressed, and produces new BugCards when data arrives from the server. Why is JS the layer that concerns a tester most? Because it is what changes the DOM — an element is absent for a moment, then appears when a fetch completes; this is why you need to "wait for the element" and why `sleep` is the wrong answer. Java analogy: the DOM is built synchronously on the main thread, but a fetch returns asynchronously — like trying to read a CompletableFuture\'s result without waiting for it. In QA context: the root of locate-timing problems is JS asynchrony; the right reflex is not to sleep a fixed time but to conditionally wait for the element\'s presence/visibility. (The atomic topics D1-D5 are in the Sonnet phase — see plan section D-S4.)',
        },
      },
    ],
  },

  // ══ GRUP E — Frontend & Backend Nasıl Konuşur (Sonnet) ═════════════════════
  {
    title: { tr: '🔌 Frontend & Backend Nasıl Konuşur', en: '🔌 How Frontend and Backend Talk' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔌',
        content: {
          tr: 'Frontend ile backend arasındaki konuşma, bir RESTORANDAKİ garson-mutfak ilişkisi gibidir: tarayıcı (garson) `/api/v1/bugs`\'a bir istek götürür, sunucu (mutfak) JSON döner, JS bu JSON\'u DOM\'a (tabağa) dizer. Neden bir tester bu köprüyü bilmeli? Çünkü elementin ne zaman DOM\'a geleceği tamamen bu konuşmanın hızına bağlıdır — ayrıca sayfanın NEREDE oluştuğu (tarayıcıda mı = CSR, sunucuda mı = SSR) locate zamanlamasını kökten değiştirir. Java analojisi: bu köprü `/api-testing` sayfasında öğrendiğin request/response sözleşmesinin frontend tarafından görünüşüdür — aynı Bug modeli, şimdi ekranda. QA bağlamında: "UI\'da görünmüyor" dediğin bir bug\'ın kökü frontend mi (render) yoksa backend mi (response) — bunu ayırt etmek Network panelini okumaktan geçer. (Atomik başlıklar E1-E5 Sonnet fazında — bkz. plan §D-S5. Köprü: /api-testing.)',
          en: 'The conversation between frontend and backend is like the waiter-kitchen relationship in a RESTAURANT: the browser (waiter) carries a request to `/api/v1/bugs`, the server (kitchen) returns JSON, and JS arranges that JSON onto the DOM (the plate). Why should a tester know this bridge? Because when an element will appear in the DOM depends entirely on the speed of this conversation — and WHERE the page is built (in the browser = CSR, on the server = SSR) fundamentally changes locate timing. Java analogy: this bridge is the frontend-side view of the request/response contract you learned on the `/api-testing` page — the same Bug model, now on screen. In QA context: for a bug you call "not visible in the UI", is the root the frontend (render) or the backend (response) — telling them apart comes from reading the Network panel. (The atomic topics E1-E5 are in the Sonnet phase — see plan section D-S5. Bridge: /api-testing.)',
        },
      },
    ],
  },

  // ══ GRUP F — React: Kaynağı Okumak (Opus pano referansı + Sonnet) ══════════
  {
    title: { tr: '⚛️ React: Kaynağı Okumak', en: '⚛️ React: Reading the Source' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚛️',
        content: {
          tr: 'React component\'i, bir LEGO PARÇASI FABRİKASINDAKİ KALIP gibidir: bir kez `BugCard` kalıbını yazarsın, sonra her bug için o kalıptan bir kart basılır. Kalıba dökülen "malzeme" prop\'tur (bug\'ın verisi), kalıbın çıktısı ise JSX\'in ürettiği gerçek DOM. Neden bir tester React kaynağını okuyabilmeli? Çünkü `className={styles.card}` yazan bir satırın tarayıcıda `class="BugCard_card__x7f2a"` gibi hash\'li bir class ürettiğini GÖREBİLİRSE, ona göre locate etmenin kırılacağını önceden anlar. Java analojisi: component ≈ bir metot/sınıf, prop ≈ parametre, state ≈ instance field, re-render ≈ metodu yeni argümanla yeniden çağırmak. QA bağlamında: JSX\'i okuyup üretilecek DOM\'u zihinde canlandıran tester, developer\'la aynı dili konuşur ve doğru locator\'ı baştan seçer. Aşağıda bu sayfanın imza aracı var: **Kaynak → DOM → Locator panosu**.',
          en: 'A React component is like a MOLD in a LEGO-BRICK FACTORY: you write the `BugCard` mold once, then a card is stamped from that mold for each bug. The "material" poured into the mold is the prop (the bug\'s data), and the mold\'s output is the real DOM produced by JSX. Why should a tester be able to read React source? Because if they can SEE that a line writing `className={styles.card}` produces a hashed class like `class="BugCard_card__x7f2a"` in the browser, they understand in advance that locating by it will break. Java analogy: component is like a metot/class, a prop like a parameter, state like an instance field, and a re-render like calling the method again with new arguments. In QA context: a tester who reads JSX and pictures the DOM it will produce speaks the same language as the developer and picks the right locator from the start. Below is this page\'s signature tool: the **Source -> DOM -> Locator board**.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🖼️ Kaynak → DOM → Locator Panosu: React CSS Module Hash', en: '🖼️ Source -> DOM -> Locator Board: React CSS Module Hash' },
      },
      {
        type: 'code',
        language: 'jsx',
        code: {
          tr: `// SÜTUN 1 — Developer'ın yazdığı React kaynağı (BugCard.jsx)
import styles from './BugCard.module.css'

function BugCard({ bug }) {                 // prop = bug verisi (≈ metot parametresi)
  return (
    <li className={styles.card}>            // styles.card → build'de hash'lenir
      <span className={styles.badge}>{bug.status}</span>
      <h3>{bug.title}</h3>
    </li>
  )
}

// SÜTUN 2 — Tarayıcıda oluşan GERÇEK DOM (DevTools → Elements)
// <li class="BugCard_card__x7f2a">        ← __x7f2a HER build'de değişir
//   <span class="BugCard_badge__k3n9">OPEN</span>
//   <h3>Login butonu 500 donuyor</h3>
// </li>`,
          en: `// COLUMN 1 — The React source the developer wrote (BugCard.jsx)
import styles from './BugCard.module.css'

function BugCard({ bug }) {                 // prop = bug data (~ method parameter)
  return (
    <li className={styles.card}>            // styles.card -> hashed at build time
      <span className={styles.badge}>{bug.status}</span>
      <h3>{bug.title}</h3>
    </li>
  )
}

// COLUMN 2 — The REAL DOM produced in the browser (DevTools -> Elements)
// <li class="BugCard_card__x7f2a">        <- __x7f2a changes on EVERY build
//   <span class="BugCard_badge__k3n9">OPEN</span>
//   <h3>Login button freezes on 500</h3>
// </li>`,
        },
      },
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '1️⃣',
            label: { tr: 'Kaynak (ne yazıldı)', en: 'Source (what was written)' },
            desc: {
              tr: '`className={styles.card}` — developer bir CSS Module referansı yazdı. Kaynakta "card" okunur ve masum görünür; ama bu isim son DOM\'a AYNEN geçmez.',
              en: '`className={styles.card}` — the developer wrote a CSS Module reference. In the source it reads "card" and looks innocent; but this name does NOT pass to the final DOM verbatim.',
            },
          },
          {
            icon: '2️⃣',
            label: { tr: 'Gerçek DOM (ne oluştu)', en: 'Real DOM (what was produced)' },
            desc: {
              tr: '`class="BugCard_card__x7f2a"` — build aracı benzersizlik için `__x7f2a` hash\'i ekledi. Bu hash her deploy\'da yeniden üretilir; dünkü test bugün 0 element bulur.',
              en: '`class="BugCard_card__x7f2a"` — the build tool added a `__x7f2a` hash for uniqueness. This hash is regenerated on every deploy; yesterday\'s test finds 0 elements today.',
            },
          },
          {
            icon: '3️⃣',
            label: { tr: 'Tester\'ın kararı', en: 'The tester\'s decision' },
            desc: {
              tr: '❌ `.BugCard_card__x7f2a`\'ya locate ETME (hash değişir). ✅ `getByRole` veya `data-testid` kullan. 💬 Developer\'dan iste: `data-testid="bug-card-{id}"`.',
              en: '❌ Do NOT locate by `.BugCard_card__x7f2a` (the hash changes). ✅ Use `getByRole` or `data-testid`. 💬 Ask the developer for: `data-testid="bug-card-{id}"`.',
            },
          },
        ],
      },
      {
        type: 'simple-box',
        emoji: '🎯',
        content: {
          tr: 'Developer\'dan Ne İste: *"BugCard component\'ine satır başına `data-testid=\'bug-card-{id}\'` ekler misin? CSS Module class\'ları her build\'de hash değiştirdiği için otomasyonda onlara bağlanamıyorum; kartı id\'yle bulmam gerekiyor, yoksa her deploy\'da testim kırılıyor."* — Bu cümle iki şeyi doğru yapar: (1) SORUNU teknik olarak doğru anlatır (hash değişimi), (2) somut, uygulanabilir bir ÇÖZÜM ister (belirli bir attribute). "Şu buton çalışmıyor" demek yerine böyle konuşmak, developer\'la aynı dili konuşmaktır — döngüyü kısaltır. Not: locator SYNTAX derinliği (getByRole/getByTestId nasıl yazılır) için /playwright ve /cypress sayfalarına bak; bu sayfa "neden bu locator" sorusuna cevap verir.',
          en: 'What to Ask the Developer: *"Could you add `data-testid=\'bug-card-{id}\'` per row to the BugCard component? CSS Module classes change their hash on every build, so I cannot bind to them in automation; I need to find the card by id, otherwise my test breaks on every deploy."* — This sentence does two things right: (1) it describes the PROBLEM technically correctly (the hash change), (2) it asks for a concrete, actionable SOLUTION (a specific attribute). Speaking this way instead of "that button does not work" is speaking the same language as the developer — it shortens the loop. Note: for locator SYNTAX depth (how to write getByRole/getByTestId) see the /playwright and /cypress pages; this page answers "why this locator". (More per-component boards — Modal, StatusBadge, Toast — are added in the Sonnet phase, plan section D-S6.)',
        },
      },
    ],
  },

  // ══ GRUP G — Angular: Kaynağı Okumak (Sonnet) ══════════════════════════════
  {
    title: { tr: '🅰️ Angular: Kaynağı Okumak', en: '🅰️ Angular: Reading the Source' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🅰️',
        content: {
          tr: 'Angular, React\'ten farklı olarak component\'i İKİYE böler: mantık `.ts` dosyasında, arayüz `.html` template\'inde. Bu, bir tiyatro oyunundaki SENARYO (`.ts` — kim ne yapar) ile SAHNE DÜZENİ (`.html` — ne nerede durur) ayrımı gibidir. Neden testerı ilgilendirir? Çünkü Angular DOM\'a `_ngcontent-xxx` gibi otomatik, anlamsız attribute\'lar ekler — bunlar stil izolasyonu içindir ve locate için ASLA kullanılmaz, tıpkı React\'in hash class\'ı gibi kırılgandır. `*ngIf` bir elementi tamamen DOM\'dan çıkarır (React\'in conditional render\'ının karşılığı), `*ngFor` ise liste üretir. Java analojisi: `.ts` sınıf gövdesi, `.html` ise o sınıfın dışa açtığı görünüm sözleşmesi gibidir. QA bağlamında: `_ngcontent`/hash gibi otomatik üretilen attribute\'ları tanıyan tester, developer\'dan `[attr.data-testid]` binding\'i ister. (Atomik başlıklar G1-G6 Sonnet fazında — bkz. plan §D-S7.)',
          en: 'Angular, unlike React, splits the component in TWO: the logic in a `.ts` file, the UI in an `.html` template. This is like the split between the SCRIPT (`.ts` — who does what) and the STAGE LAYOUT (`.html` — what stands where) in a theater play. Why does it concern a tester? Because Angular adds automatic, meaningless attributes like `_ngcontent-xxx` to the DOM — these are for style isolation and are NEVER used for locating, being just as fragile as React\'s hash class. `*ngIf` removes an element entirely from the DOM (the counterpart of React\'s conditional render), while `*ngFor` produces a list. Java analogy: the `.ts` is like the class body and the `.html` like the view contract that class exposes. In QA context: a tester who recognizes auto-generated attributes like `_ngcontent`/hash asks the developer for an `[attr.data-testid]` binding. (The atomic topics G1-G6 are in the Sonnet phase — see plan section D-S7.)',
        },
      },
    ],
  },

  // ══ GRUP H — Framework-Bağımsız Locator Ustalığı (SAYFANIN KALBİ) ══════════
  {
    title: { tr: '🎯 Locator Ustalığı (Sayfanın Kalbi)', en: '🎯 Locator Mastery (Heart of the Page)' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎯',
        content: {
          tr: 'Locator seçmek, bir kişiyi tarif etmek gibidir: onu "soldan üçüncü sıradaki, kırmızı tişörtlü kişi" diye tarif edersen (index + görünüm), sıra değişince veya kişi üstünü değiştirince tarifin çöker; ama "T.C. kimlik numarası şu olan kişi" dersen (data-testid), o kişi nereye otursa ne giyse bulunur. Locator dayanıklılık hiyerarşisi tam da budur: `data-testid` > `role`+`name` > stabil `id` > text > CSS > XPath-index (son çare). Neden hiyerarşi? Çünkü her katman bir sonrakinden daha az "tesadüfe" bağlıdır — data-testid kasıtlı bir kimliktir, XPath-index ise DOM\'un o anki şekline dair kırılgan bir varsayım. Java analojisi: nesneyi kimliğe (id) göre mi yoksa geçici bir alana (renk/sıra) göre mi eşitliyorsun sorusudur. QA bağlamında: bu hiyerarşiyi içselleştiren tester her elemente 5 farklı locator düşünüp en dayanıklısını gerekçelendirebilir. Aşağıda **Locator Laboratuvarı** var: bir DOM parçasında attribute\'lara tıkla, hangi locator neden daha sağlam gör.',
          en: 'Choosing a locator is like describing a person: if you describe them as "the person third from the left, in a red shirt" (index + appearance), your description collapses when the order changes or the person changes clothes; but if you say "the person whose national ID number is X" (data-testid), that person is found wherever they sit and whatever they wear. The locator durability hierarchy is exactly this: `data-testid` > `role`+`name` > stable `id` > text > CSS > XPath-index (last resort). Why a hierarchy? Because each layer depends less on "coincidence" than the next — data-testid is a deliberate identity, while XPath-index is a fragile assumption about the DOM\'s current shape. Java analogy: it is the question of whether you equate an object by its identity (id) or by a transient field (color/order). In QA context: a tester who internalizes this hierarchy can think of 5 different locators for any element and justify the most durable one. Below is the **Locator Lab**: click the attributes on a DOM fragment and see which locator is more robust and why.',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Aşağıdaki laboratuvarda gerçek bir BugCard DOM\'u var (React CSS Module hash\'li). Renkli attribute\'lara tıkla: her birinin dayanıklılık önceliğini (id/data-testid = 1, XPath = 4) ve Selenium/Playwright/Cypress karşılıklarını gör. Ardından "Kendin Dene" bloğunda bir deploy simülasyonuyla hangi locator\'ın hayatta kaldığını test et.',
          en: 'The lab below has a real BugCard DOM (with React CSS Module hashes). Click the colored attributes: see each one\'s durability priority (id/data-testid = 1, XPath = 4) and its Selenium/Playwright/Cypress equivalents. Then, in the "Try It Yourself" block, test which locator survives with a deploy simulation.',
        },
      },
      bugCardLocatorExplorer,
      deployBreaksLocatorPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Aynı "Düzenle" butonuna 5 locator düşünüyorsun: (a) `//li[3]/button`, (b) `.Btn_ghost__p0q2`, (c) `getByText("Düzenle")`, (d) `getByRole("button",{name:"Edit bug"})`, (e) `getByTestId("edit-bug-42")`. Sayfa hem TR/EN çok dilli hem de her deploy\'da class hash\'i değişiyor. Hangisi en dayanıklı?',
          en: 'You think of 5 locators for the same "Edit" button: (a) `//li[3]/button`, (b) `.Btn_ghost__p0q2`, (c) `getByText("Edit")`, (d) `getByRole("button",{name:"Edit bug"})`, (e) `getByTestId("edit-bug-42")`. The page is both TR/EN multilingual and its class hash changes on every deploy. Which is the most durable?',
        },
        options: [
          { id: 'a', text: { tr: '(a) XPath index — çünkü en kısa yazım', en: '(a) XPath index — because it is the shortest to write' } },
          { id: 'b', text: { tr: '(b) Hash class — çünkü DevTools\'ta ilk o görünür', en: '(b) Hash class — because it appears first in DevTools' } },
          { id: 'e', text: { tr: '(e) getByTestId — deploy\'dan ve dilden bağımsız stabil kanca', en: '(e) getByTestId — a stable hook independent of deploy and language' } },
          { id: 'c', text: { tr: '(c) getByText — çünkü en okunabilir olan', en: '(c) getByText — because it is the most readable' } },
        ],
        correct: 'e',
        explanation: {
          tr: '(e) getByTestId kazanır: data-testid build\'den (hash sorunu yok) ve dilden (i18n sorunu yok) bağımsızdır. (a) sıralama değişince, (b) her deploy\'da, (c) TR/EN geçişinde kırılır. (d) getByRole ikinci en iyidir — data-testid yoksa tercih edilir. Hiyerarşi: data-testid > role+name > stabil id > text > CSS > XPath-index.',
          en: '(e) getByTestId wins: data-testid is independent of the build (no hash problem) and of language (no i18n problem). (a) breaks when ordering changes, (b) on every deploy, (c) on a TR/EN switch. (d) getByRole is second-best — preferred when there is no data-testid. Hierarchy: data-testid > role+name > stable id > text > CSS > XPath-index.',
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-h',
        promptTr: 'Locator dayanıklılık hiyerarşisini (data-testid > role+name > stabil id > text > CSS > XPath-index) ve neden hash class ile XPath-index\'in en altta olduğunu, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, the locator durability hierarchy (data-testid > role+name > stable id > text > CSS > XPath-index) and why a hash class and XPath-index are at the bottom, to a newcomer.',
        keywords: ['data-testid', 'role', 'id', 'hash', 'xpath', 'index', 'deploy', 'dayanikli'],
        modelAnswerTr: 'En dayanıklı locator, elemente kasıtlı olarak konmuş ve değişmeyen bir kimliğe bağlanandır: data-testid tam olarak test için vardır, build\'de veya dilde değişmez. role+name erişilebilirliğe bağlıdır ve genelde stabildir. Stabil id iyidir ama dinamikse riskli. text i18n\'de (TR/EN) kırılır. CSS class stil için var olduğundan ve modern araçlar hash eklediğinden her deploy\'da değişebilir. XPath-index ise DOM\'un o anki sırasına bağlıdır; bir eleman eklenince kayar. Bu yüzden hash class ve XPath-index en altta: ikisi de "tesadüfe" (o anki biçim/sıra) bağlıdır, kimliğe değil.',
        modelAnswerEn: 'The most durable locator binds to an identity deliberately placed on the element that does not change: data-testid exists exactly for testing and does not change on build or language. role+name depends on accessibility and is usually stable. A stable id is good but risky if dynamic. text breaks under i18n (TR/EN). A CSS class exists for styling and, because modern tools add a hash, can change on every deploy. XPath-index depends on the DOM\'s current order; it shifts when an element is added. That is why a hash class and XPath-index are at the bottom: both depend on "coincidence" (the current form/order), not on identity.',
      },
    ],
  },

  // ══ GRUP I — Yaygın Hatalar (error-dictionary, Sonnet min 12) ══════════════
  {
    title: { tr: '🚨 Yaygın Hatalar', en: '🚨 Common Errors' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🚨',
        content: {
          tr: 'Locator hatalarının çoğu, kaynak-DOM-render ayrımını bilmemekten doğar ve hep aynı birkaç kalıba oturur: element henüz render olmadan locate etmek (NoSuchElement), re-render sonrası ölmüş referansı kullanmak (StaleElement), hash class\'a bağlanmak, `*ngIf`/conditional ile DOM\'da OLMAYAN elementi bekleme yapmadan aramak, iframe/shadow DOM context\'ini unutmak. Neden bir "hata sözlüğü"? Çünkü hatanın mesajını görünce kök nedenini anında tanıyabilen tester dakikalar içinde çözer; tanıyamayan saatlerce kör dener. Java analojisi: NullPointerException gördüğünde "hangi referans null?" diye düşünmek gibi — mesaj sana kök nedene giden yolu söyler. QA bağlamında: bu grup her hatayı Belirti → Kök Neden → Çözüm → Önleme formatında verir. (Bu grup Sonnet fazında min 12 gerçek hatayla error-dictionary olarak doldurulacak — bkz. plan §D-S9.)',
          en: 'Most locator errors arise from not knowing the source-DOM-render distinction and always settle into the same few patterns: locating before the element renders (NoSuchElement), using a reference that died after a re-render (StaleElement), binding to a hash class, searching without a wait for an element NOT in the DOM due to `*ngIf`/conditional, forgetting the iframe/shadow DOM context. Why an "error dictionary"? Because a tester who recognizes the root cause the moment they see the error message solves it in minutes; one who cannot tries blindly for hours. Java analogy: like thinking "which reference is null?" when you see a NullPointerException — the message tells you the path to the root cause. In QA context: this group presents each error in a Symptom -> Root Cause -> Fix -> Prevention format. (This group is filled as an error-dictionary with at least 12 real errors in the Sonnet phase — see plan section D-S9.)',
        },
      },
    ],
  },

  // ══ GRUP J — Mülakat Soruları (Sonnet min 50) ═════════════════════════════
  {
    title: { tr: '💼 Mülakat Soruları', en: '💼 Interview Q&A' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '💼',
        content: {
          tr: 'Bir frontend-farkında tester\'ın mülakatı, "X nedir?" tanımlarıyla değil, gerçek production senaryolarıyla ölçülür: "Test bir gün geçti bir gün kaldı, element her deploy\'da değişen bir class kullanıyor, developer \'kodum aynı\' diyor — kime ne söylersin, kalıcı çözüm ne?" gibi. Neden senaryo tabanlı? Çünkü işin kendisi senaryodur — tanım ezberi flaky testi çözmez. Java analojisi: bir mülakatta "polymorphism nedir?" yerine "şu tasarım neden kırıldı, nasıl düzeltirsin?" sorulması gibi. QA bağlamında: bu grup 50+ soruyu 15 Basic / 20 Intermediate / 15 Advanced olarak, her cevabı 3-6 cümle + Java analojisi ile verir. (Bu grup Sonnet fazında min 50 senaryo tabanlı soruyla doldurulacak — bkz. plan §D-S10. Mülakat sekmesi %60 quiz-gating arkasındadır.)',
          en: 'A frontend-aware tester\'s interview is measured not by "what is X?" definitions but by real production scenarios: like "your test passed one day and failed the next, the element uses a class that changes on every deploy, the developer says \'my code is the same\' — who do you tell what, and what is the permanent fix?" Why scenario-based? Because the job itself is a scenario — memorizing definitions does not fix a flaky test. Java analogy: like being asked "why did this design break and how would you fix it?" instead of "what is polymorphism?" in an interview. In QA context: this group provides 50+ questions as 15 Basic / 20 Intermediate / 15 Advanced, each answer in 3-6 sentences plus a Java analogy. (This group is filled with at least 50 scenario-based questions in the Sonnet phase — see plan section D-S10. The interview tab is behind 60% quiz-gating.)',
        },
      },
    ],
  },

]

// ─── Hero ─────────────────────────────────────────────────────────────────────
const trHero = {
  title: '🖥️ QA için Frontend',
  subtitle: 'Developer\'la Aynı Dili Konuşmak: Component, DOM ve Kırılmaz Locator',
  intro: 'Bir tester\'ın frontend developer\'ın omzundan bakmasını sağlayan sayfa: component/DOM/render/hydration terimlerini developer\'la aynı anlamda kullan, bir React/Angular kaynak kodunu görüp hangi DOM\'un oluşacağını zihinde canlandır ve her elemente en dayanıklı locator\'ı seçip developer\'dan doğru şeyi (data-testid, role) iste. Tek örnek: Bug Tracker Board.',
}

const enHero = {
  title: '🖥️ Frontend for QA',
  subtitle: 'Speak the Developer\'s Language: Components, the DOM and Unbreakable Locators',
  intro: 'A page that lets a tester look over the frontend developer\'s shoulder: use component/DOM/render/hydration terms with the same meaning the developer does, read a React/Angular source file and picture the DOM it produces, and pick the most durable locator for any element while asking the developer for the right thing (data-testid, role). One example throughout: the Bug Tracker Board.',
}

const trTabs = sections.map(s => s.title.tr)
const enTabs = sections.map(s => s.title.en)

// ─── Export ───────────────────────────────────────────────────────────────────
export const qaFrontendData = {
  tr: { hero: trHero, tabs: trTabs, sections },
  en: { hero: enHero, tabs: enTabs, sections },
}

fillMissingCodeTrios(qaFrontendData, 'qa-frontend')

// ─── Feynman checkpoints (fillMissingFeynman ek gruplara otomatik ekler) ──────
const qaFrontendFeynmanDefs = [
  {
    sectionIndex: 5, // GRUP F — React
    promptTr: 'Bir React component\'ini "LEGO kalıbı" benzetmesiyle, ve `className={styles.card}` yazan bir satırın tarayıcıda neden hash\'li bir class ürettiğini, sektöre yeni giren birine kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, a React component with the "LEGO mold" analogy, and why a line writing `className={styles.card}` produces a hashed class in the browser, to a newcomer.',
    keywords: ['component', 'prop', 'jsx', 'class', 'hash', 'module', 'dom', 'locator'],
    modelAnswerTr: 'Bir React component\'i bir LEGO kalıbı gibidir: bir kez yazılır, sonra her veri (prop) için o kalıptan bir DOM parçası basılır. `className={styles.card}` bir CSS Module referansıdır; build sırasında araç, çakışmayı önlemek için "card" ismine rastgele bir hash ekler ve DOM\'da `BugCard_card__x7f2a` gibi görünür. Bu hash her build\'de değiştiği için tester ona göre locate etmez; bunun yerine developer\'dan data-testid ister.',
    modelAnswerEn: 'A React component is like a LEGO mold: it is written once, then a piece of DOM is stamped from that mold for each data (prop). `className={styles.card}` is a CSS Module reference; at build time the tool adds a random hash to the "card" name to avoid collisions, and it appears in the DOM as something like `BugCard_card__x7f2a`. Because this hash changes on every build, the tester does not locate by it; instead they ask the developer for a data-testid.',
  },
]

fillMissingFeynman(qaFrontendData, qaFrontendFeynmanDefs)
