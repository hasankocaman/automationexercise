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
// FAZ DURUMU: Faz 1 iskelet ✅ (Opus) · GRUP A TAM (A1-A6) ✅ (Opus+Sonnet) ·
// GRUP F pano referansı ✅ (Opus) · GRUP H locator-lab referansı ✅ (Opus) ·
// GRUP B-J → Sonnet (bkz. Documents/qa-frontend-page-plan.md §C/§D, sıradaki: D-S2).
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

// ─── step-animation: DOM aile ağacında ilişkisel locate (GRUP A2) ─────────────
const domFamilyTreeSteps = {
  type: 'step-animation',
  id: 'qaf-a2-family-tree-steps',
  title: { tr: 'Adım Adım: Aile Ağacında İlişkisel Locate', en: 'Step by Step: Relational Locating in the Family Tree' },
  steps: [
    { id: 1, icon: '🌳', label: { tr: '`<ul>` ebeveyndir', en: '`<ul>` is the parent' }, detail: { tr: 'BugCard listesini saran `<ul id="bug-list">` düğümü, her `<li>` kartın EBEVEYNİDİR — ağaçta bir üst seviyededir.', en: 'The `<ul id="bug-list">` node wrapping the BugCard list is the PARENT of every `<li>` card — one level up in the tree.' } },
    { id: 2, icon: '👶', label: { tr: 'Her `<li>` bir çocuktur', en: 'Each `<li>` is a child' }, detail: { tr: '`<ul>`\'nin doğrudan çocukları olan `<li>` elementleri KARDEŞTİR (sibling) — aynı ebeveyni paylaşırlar, aralarında sıra vardır.', en: 'The `<li>` elements that are direct children of `<ul>` are SIBLINGS — they share the same parent and have an order among them.' } },
    { id: 3, icon: '🔍', label: { tr: 'İndeks kırılgandır', en: 'Index is fragile' }, detail: { tr: '`li[3]` demek "3. kardeş" demektir; yeni bir bug eklenip sıralama değişince bu artık BAŞKA bir kartı gösterir.', en: '`li[3]` means "the 3rd sibling"; when a new bug is added and the order shifts, it now points to a DIFFERENT card.' } },
    { id: 4, icon: '🔗', label: { tr: 'İlişkisel locate stabildir', en: 'Relational locating is stable' }, detail: { tr: '"İçinde `Login butonu` yazan `<li>`" demek, ağaçtaki akrabalık ilişkisini (child/descendant) kullanır — sıralamadan bağımsızdır.', en: '"The `<li>` that contains the text `Login button`" uses the kinship relationship in the tree (child/descendant) — it is independent of ordering.' } },
    { id: 5, icon: '✅', label: { tr: 'Kural: kimliğe göre bul', en: 'Rule: find by identity' }, detail: { tr: 'En dayanıklısı: `data-testid="bug-card-{id}"` gibi bir kimlik. İlişkisel metin eşleşmesi ikinci en iyi, index ise son çare.', en: 'The most durable: an identity like `data-testid="bug-card-{id}"`. Relational text match is second-best, index is the last resort.' } },
  ],
}

// ─── code-playground: ilişkisel locate pratiği (GRUP A2) ──────────────────────
const relationalLocatorPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-a2-dom-tree-anatomy',
  id: 'qaf-a2-relational-locator',
  title: { tr: 'Kendin Dene: İndeks Yerine İlişkisel Locate Yaz', en: 'Try It Yourself: Write a Relational Locator Instead of an Index' },
  starterCode: {
    tr: `// BugCard listesinde "Login butonu 500 donuyor" yazan satırı bulman gerekiyor.
// Liste sıralaması sık değişiyor (yeni bug'lar en üste ekleniyor).
// TODO: index yerine ilişkisel (metne göre) bir locator yaz.
await page.locator('li').nth(2).click();`,
    en: `// You need to find the row saying "Login button freezes on 500" in the BugCard list.
// The list order changes often (new bugs are added to the top).
// TODO: write a relational (text-based) locator instead of an index.
await page.locator('li').nth(2).click();`,
  },
  solutionCode: {
    tr: `// "içinde bu metin geçen li" — sıralamadan bağımsız, akrabalık ilişkisine dayanır
await page.locator('li', { hasText: 'Login butonu 500 donuyor' }).click();`,
    en: `// "the li that contains this text" -- independent of order, based on kinship
await page.locator('li', { hasText: 'Login button freezes on 500' }).click();`,
  },
  hint: {
    tr: '`.nth(2)` ağaçtaki "3. kardeş" demektir ve liste yeniden sıralanınca başka bir kartı gösterir. Bunun yerine ağaçtaki ilişkiyi (bu metni İÇEREN li) kullan — `hasText`/`:has-text()` gibi.',
    en: '`.nth(2)` means "the 3rd sibling" in the tree, and it points to a different card once the list re-sorts. Instead use the tree relationship (the li that CONTAINS this text) — like `hasText`/`:has-text()`.',
  },
  successMessage: {
    tr: 'Doğru! İlişkisel locate ağaçtaki akrabalık bağını kullanır ve sıralama değişse de aynı elemente gider; index ise DOM\'un o anki şekline kör bir varsayımdır.',
    en: 'Correct! A relational locator uses the kinship link in the tree and still reaches the same element when ordering changes; an index is a blind assumption about the DOM\'s current shape.',
  },
}

// ─── step-animation: DOM + CSSOM → Render Tree (GRUP A3) ──────────────────────
const cssomRenderTreeSteps = {
  type: 'step-animation',
  id: 'qaf-a3-cssom-render-steps',
  title: { tr: 'Adım Adım: DOM + CSSOM Nasıl Render Tree\'ye Dönüşür?', en: 'Step by Step: How DOM + CSSOM Become the Render Tree' },
  steps: [
    { id: 1, icon: '🌳', label: { tr: 'DOM hazır', en: 'DOM is ready' }, detail: { tr: 'Parser HTML\'i okuyup DOM ağacını kurdu: her `<li>`, `<span>`, `<button>` birer node.', en: 'The parser read the HTML and built the DOM tree: every `<li>`, `<span>`, `<button>` is a node.' } },
    { id: 2, icon: '🎨', label: { tr: 'CSSOM hazır', en: 'CSSOM is ready' }, detail: { tr: 'Tarayıcı CSS kurallarını da bir ağaca çevirdi: hangi selector hangi elemente hangi stili verir.', en: 'The browser also turned CSS rules into a tree: which selector gives which element which style.' } },
    { id: 3, icon: '🔗', label: { tr: 'İkisi birleşir', en: 'The two merge' }, detail: { tr: 'DOM ile CSSOM birleşip Render Tree\'yi kurar — artık her node\'un hesaplanmış bir stili var.', en: 'DOM and CSSOM merge to build the Render Tree — now every node has a computed style.' } },
    { id: 4, icon: '🚫', label: { tr: '`display:none` elenir', en: '`display:none` is excluded' }, detail: { tr: 'Bir `<li class="hidden-bug">` node DOM\'da VARDIR ama `display:none` olduğu için Render Tree\'ye HİÇ girmez.', en: 'A `<li class="hidden-bug">` node EXISTS in the DOM, but because it has `display:none` it NEVER enters the Render Tree.' } },
    { id: 5, icon: '⚠️', label: { tr: 'Sonuç: bulundu ama tıklanamaz', en: 'Result: found but not clickable' }, detail: { tr: 'Selenium/Playwright bu node\'u DOM\'da bulur (present) ama tıklama Render Tree\'de olmadığı için başarısız olur — "ElementNotInteractable".', en: 'Selenium/Playwright find this node in the DOM (present), but the click fails because it is not in the Render Tree -- "ElementNotInteractable".' } },
  ],
}

// ─── code-playground: present vs visible bekleme stratejisi (GRUP A3) ─────────
const waitStrategyPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-a3-cssom-render-tree',
  id: 'qaf-a3-wait-strategy',
  title: { tr: 'Kendin Dene: Doğru Bekleme Stratejisini Seç', en: 'Try It Yourself: Pick the Right Wait Strategy' },
  starterCode: {
    tr: `// "New Bug" modal'ı açılıyor ama animasyonla: modal önce DOM'a
// display:none olarak eklenir, 200ms sonra CSS class'ı kaldırılıp görünür olur.
// TODO: modal'a tıklamadan önce doğru bekleme koşulunu yaz.
await page.locator('[data-testid="new-bug-modal"]').waitFor({ state: 'attached' });
await page.locator('[data-testid="modal-submit"]').click();`,
    en: `// The "New Bug" modal opens with an animation: it is first added to the DOM
// with display:none, then 200ms later its CSS class is removed and it becomes visible.
// TODO: write the correct wait condition before clicking the modal.
await page.locator('[data-testid="new-bug-modal"]').waitFor({ state: 'attached' });
await page.locator('[data-testid="modal-submit"]').click();`,
  },
  solutionCode: {
    tr: `// 'attached' sadece DOM'da var olduğunu doğrular (render tree'de olmayabilir).
// Tıklamadan önce 'visible' (render tree'de VE görünür) beklemek gerekir.
await page.locator('[data-testid="new-bug-modal"]').waitFor({ state: 'visible' });
await page.locator('[data-testid="modal-submit"]').click();`,
    en: `// 'attached' only confirms it exists in the DOM (it may not be in the render tree).
// Before clicking you must wait for 'visible' (in the render tree AND visible).
await page.locator('[data-testid="new-bug-modal"]').waitFor({ state: 'visible' });
await page.locator('[data-testid="modal-submit"]').click();`,
  },
  hint: {
    tr: '`attached` sadece DOM\'da varlığı doğrular — `display:none` iken bile true döner. Render Tree\'de olup olmadığını (yani gerçekten tıklanabilir mi) anlamak için `visible` beklemek gerekir.',
    en: '`attached` only confirms DOM presence — it returns true even while `display:none`. To know whether it is in the Render Tree (i.e., truly clickable) you must wait for `visible`.',
  },
  successMessage: {
    tr: 'Doğru! `attached` = DOM\'da var; `visible` = Render Tree\'de VE görünür. Tıklama için her zaman `visible` beklenmeli, yoksa animasyon bitmeden yapılan tıklama ıskalar.',
    en: 'Correct! `attached` = exists in the DOM; `visible` = in the Render Tree AND visible. Always wait for `visible` before clicking, otherwise a click before the animation finishes misses.',
  },
}

// ─── video-scene: "Render'ın 5 Adımı" (GRUP A4, zorunlu film) ─────────────────
const renderFiveStepsFilm = {
  type: 'video-scene',
  id: 'qaf-render-five-steps-film',
  title: {
    tr: '🎬 Render\'ın 5 Adımı: Parse → Style → Layout → Paint → Composite',
    en: '🎬 The 5 Steps of Rendering: Parse -> Style -> Layout -> Paint -> Composite',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'html',    emoji: '📄', label: { tr: 'HTML kaynağı',   en: 'HTML source' },     color: '#0ea5e9' },
    { id: 'parse',   emoji: '🔎', label: { tr: 'Parse → DOM',    en: 'Parse -> DOM' },     color: '#f59e0b' },
    { id: 'style',   emoji: '🎨', label: { tr: 'Style → CSSOM',  en: 'Style -> CSSOM' },   color: '#8b5cf6' },
    { id: 'layout',  emoji: '📐', label: { tr: 'Layout',         en: 'Layout' },           color: '#6366f1' },
    { id: 'paint',   emoji: '🖌️', label: { tr: 'Paint',          en: 'Paint' },            color: '#ec4899' },
    { id: 'composite', emoji: '🧩', label: { tr: 'Composite',    en: 'Composite' },        color: '#22c55e' },
    { id: 'screen',  emoji: '🖥️', label: { tr: 'Ekran',          en: 'Screen' },           color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: '"Sayfa render oldu" tek bir an değildir — bir MONTAJ HATTIdır. Bu filmde bir BugCard\'ın bu 5 istasyondan nasıl geçtiğini izleyeceksin ve testin bir butona tam olarak HANGİ istasyonda tıklayabileceğini göreceksin.',
        en: '"The page rendered" is not a single moment -- it is an ASSEMBLY LINE. In this film you will watch a BugCard pass through these 5 stations, and see at EXACTLY which station a test can click a button.',
      },
      code: { tr: `<li class="bug-card">...</li>`, en: `<li class="bug-card">...</li>` },
      positions: { html: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'İstasyon 1 — Parse: HTML metni token\'lara ayrılıp DOM ağacına dönüşür. Henüz ekranda hiçbir şey yok; sadece yapı kuruldu. Java analojisi: kaynak dosyanın derleyici tarafından AST\'ye ayrıştırılması gibi.',
        en: 'Station 1 -- Parse: the HTML text is split into tokens and turned into the DOM tree. Nothing is on screen yet; only the structure has been built. Java analogy: like a source file being parsed into an AST by the compiler.',
      },
      code: { tr: `DOM: <li> node oluştu`, en: `DOM: the <li> node exists` },
      positions: {
        html: { x: 16, y: 50, opacity: 0.6, scale: 0.9 },
        parse: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'html', to: 'parse', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'İstasyon 2 — Style: CSS kuralları okunup CSSOM kurulur, DOM ile birleşir; her node\'un hesaplanmış (computed) bir stili oluşur. Kritik: `display:none` olan node burada işaretlenir ve Layout\'a hiç girmeyecektir.',
        en: 'Station 2 -- Style: CSS rules are read and the CSSOM is built, merging with the DOM; every node gets a computed style. Critical: a node with `display:none` is flagged here and will never enter Layout.',
      },
      code: { tr: `computed style: color, display, font-size...`, en: `computed style: color, display, font-size...` },
      positions: {
        parse: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        style: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'parse', to: 'style', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'İstasyon 3 — Layout: her görünür node\'un tam konumu ve boyutu (x, y, genişlik, yükseklik) piksel cinsinden hesaplanır. BU ANA KADAR bir butonun tıklanabilir bir "yeri" YOKTUR — Layout bitmeden koordinat hesaplanmamıştır.',
        en: 'Station 3 -- Layout: every visible node\'s exact position and size (x, y, width, height) is computed in pixels. UNTIL THIS POINT a button has NO clickable "location" -- coordinates are not computed before Layout finishes.',
      },
      code: { tr: `li { x:24, y:120, w:340, h:64 }`, en: `li { x:24, y:120, w:340, h:64 }` },
      positions: {
        style: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        layout: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'style', to: 'layout', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'İstasyon 4 — Paint: hesaplanan kutular gerçek piksellere (renk, kenarlık, gölge) boyanır. Görsel olarak "kart" artık VAR ama hâlâ ayrı katmanlar halindedir — bir sonraki adımda birleştirilecek.',
        en: 'Station 4 -- Paint: the computed boxes are painted into actual pixels (color, border, shadow). Visually the "card" now EXISTS, but it is still in separate layers -- to be combined in the next step.',
      },
      code: { tr: `paint: renk + kenarlık + gölge boyandı`, en: `paint: color + border + shadow painted` },
      positions: {
        layout: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        paint: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'layout', to: 'paint', color: '#ec4899' }],
    },
    {
      caption: {
        tr: 'İstasyon 5 — Composite: boyanan katmanlar doğru sırayla üst üste birleştirilir (GPU\'da). Artık kart tek bir bütün piksel çerçevesidir ve ekrana teslim edilmeye hazırdır.',
        en: 'Station 5 -- Composite: the painted layers are combined in the correct order (on the GPU). The card is now a single, complete pixel frame ready to be handed to the screen.',
      },
      code: { tr: `composite: katmanlar birleşti`, en: `composite: layers combined` },
      positions: {
        paint: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        composite: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'paint', to: 'composite', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — Ekranda GÖRÜNÜR ve tıklanabilir: bu hat tamamlandığında kullanıcı kartı görür VE test butona güvenle tıklayabilir. Flaky test\'lerin çoğu, bu hat bitmeden (özellikle Layout tamamlanmadan) yapılan erken bir locate/tıklamadır.',
        en: 'Final -- VISIBLE and clickable on screen: once this line completes, the user sees the card AND the test can safely click the button. Most flaky tests are an early locate/click made before this line finishes -- especially before Layout completes.',
      },
      code: { tr: `ekran: kart görünür, buton tıklanabilir`, en: `screen: card visible, button clickable` },
      positions: {
        composite: { x: 20, y: 30, scale: 0.95 },
        screen: { x: 56, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'composite', to: 'screen', color: '#10b981' }],
    },
  ],
}

// ─── challenge (order-sort): Render'ın 5 adımını sırala (GRUP A4) ─────────────
const renderOrderChallenge = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'qaf-a4-render-order-01',
  question: { tr: 'Bir sayfanın render sürecinin 5 istasyonunu doğru sırayla diz.', en: 'Order the 5 stations of a page\'s rendering process correctly.' },
  items: [
    { id: '1', text: { tr: 'Parse: HTML → DOM ağacı kurulur', en: 'Parse: HTML -> the DOM tree is built' }, order: 1 },
    { id: '2', text: { tr: 'Style: CSS → CSSOM kurulur ve DOM ile birleşir', en: 'Style: CSS -> the CSSOM is built and merges with the DOM' }, order: 2 },
    { id: '3', text: { tr: 'Layout: her node\'un konumu/boyutu hesaplanır', en: 'Layout: every node\'s position/size is computed' }, order: 3 },
    { id: '4', text: { tr: 'Paint: pikseller (renk, kenarlık, gölge) boyanır', en: 'Paint: pixels (color, border, shadow) are painted' }, order: 4 },
    { id: '5', text: { tr: 'Composite: katmanlar birleşip ekrana teslim edilir', en: 'Composite: layers are combined and handed to the screen' }, order: 5 },
  ],
  xpReward: 10,
}

// ─── step-animation: Reflow tetiklenmesi (GRUP A5) ────────────────────────────
const reflowRepaintSteps = {
  type: 'step-animation',
  id: 'qaf-a5-reflow-steps',
  title: { tr: 'Adım Adım: Yeni Bir BugCard Eklenince Reflow Nasıl Tetiklenir?', en: 'Step by Step: How Adding a New BugCard Triggers a Reflow' },
  steps: [
    { id: 1, icon: '📋', label: { tr: 'Sayfa stabil', en: 'The page is stable' }, detail: { tr: 'Test, 2. sıradaki BugCard\'ı locate etti — o an Layout\'ta sabit bir konumu var.', en: 'The test located the BugCard at position 2 -- at that moment it has a fixed position in Layout.' } },
    { id: 2, icon: '➕', label: { tr: 'Yeni bug JS ile eklenir', en: 'A new bug is added via JS' }, detail: { tr: 'Kullanıcı "New Bug" formunu gönderir; JS listenin BAŞINA yeni bir `<li>` ekler.', en: 'The user submits the "New Bug" form; JS inserts a new `<li>` at the TOP of the list.' } },
    { id: 3, icon: '🔁', label: { tr: 'Reflow tetiklenir', en: 'A reflow is triggered' }, detail: { tr: 'Tarayıcı Layout\'u YENİDEN hesaplar: eski 2. sıradaki kart artık 3. sırada, konumu (y koordinatı) değişti.', en: 'The browser RECOMPUTES Layout: the card that was at position 2 is now at position 3, its position (y coordinate) has changed.' } },
    { id: 4, icon: '👻', label: { tr: 'Eski referans geçersiz olur', en: 'The old reference becomes stale' }, detail: { tr: 'Testin tuttuğu element referansı hâlâ DOM\'da var ama artık yanlış yerde/yanlış veriyle eşleşebilir — bazı motorlarda StaleElementReferenceException fırlatır.', en: 'The element reference the test was holding still exists in the DOM, but may now match the wrong place/data -- in some engines this throws a StaleElementReferenceException.' } },
    { id: 5, icon: '✅', label: { tr: 'Doğru refleks: stabil olmayı bekle', en: 'The right reflex: wait for stability' }, detail: { tr: '`sleep(1000)` yerine "liste sayısı N oldu" veya "element artık DEĞİŞMEDİ" gibi koşullu bir bekleme kur.', en: 'Instead of `sleep(1000)`, set a conditional wait like "the list count reached N" or "the element has stopped changing".' } },
  ],
}

// ─── code-playground: stabil hale gelmeyi bekleme (GRUP A5) ───────────────────
const waitForStablePlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-a5-reflow-repaint',
  id: 'qaf-a5-wait-for-stable',
  title: { tr: 'Kendin Dene: `sleep` Yerine Koşullu Bekleme Yaz', en: 'Try It Yourself: Write a Conditional Wait Instead of `sleep`' },
  starterCode: {
    tr: `// "New Bug" formu gönderildikten sonra yeni kart listenin başına ekleniyor
// ve bu bir reflow tetikliyor. TODO: sabit sleep yerine koşullu bekleme yaz.
await page.click('[data-testid="modal-submit"]');
await page.waitForTimeout(1000);
await page.locator('li').first().click();`,
    en: `// After the "New Bug" form is submitted, the new card is added to the top of the
// list and this triggers a reflow. TODO: write a conditional wait instead of a fixed sleep.
await page.click('[data-testid="modal-submit"]');
await page.waitForTimeout(1000);
await page.locator('li').first().click();`,
  },
  solutionCode: {
    tr: `// Liste sayısının artmasını (reflow'un bittiğini) koşullu bekle
await page.click('[data-testid="modal-submit"]');
await expect(page.locator('li')).toHaveCount(4); // reflow bitene kadar otomatik bekler
await page.locator('li').first().click();`,
    en: `// Conditionally wait for the list count to increase (the reflow finished)
await page.click('[data-testid="modal-submit"]');
await expect(page.locator('li')).toHaveCount(4); // auto-waits until the reflow is done
await page.locator('li').first().click();`,
  },
  hint: {
    tr: '`waitForTimeout(1000)` sabit bir tahmindir: yavaş bir makinede yetmez, hızlı bir makinede gereksiz bekletir. `toHaveCount`/`toHaveText` gibi assertion\'lar koşul gerçekleşene kadar otomatik yeniden dener — reflow\'un GERÇEKTEN bittiğini garanti eder.',
    en: '`waitForTimeout(1000)` is a fixed guess: it is not enough on a slow machine and wastes time on a fast one. Assertions like `toHaveCount`/`toHaveText` auto-retry until the condition is true -- guaranteeing the reflow has REALLY finished.',
  },
  successMessage: {
    tr: 'Doğru! Koşullu bekleme (assertion tabanlı) reflow\'un ne zaman bittiğini gerçekten bilir; sabit `sleep` ise bir tahmindir ve flaky testin klasik kaynağıdır.',
    en: 'Correct! A conditional (assertion-based) wait actually knows when the reflow finished; a fixed `sleep` is a guess and the classic source of a flaky test.',
  },
}

// ─── step-animation: DevTools'ta "Copy selector" vs attribute okuma (GRUP A6) ─
const devtoolsElementsSteps = {
  type: 'step-animation',
  id: 'qaf-a6-devtools-steps',
  title: { tr: 'Adım Adım: DevTools\'ta Doğru Locator Nasıl Türetilir?', en: 'Step by Step: Deriving the Right Locator in DevTools' },
  steps: [
    { id: 1, icon: '🛠️', label: { tr: 'F12 → Elements açılır', en: 'F12 -> Elements opens' }, detail: { tr: 'Testerın ilk durağı burasıdır — kaynak dosya değil, o anki CANLI DOM burada görünür.', en: 'This is the tester\'s first stop -- not the source file, but the current LIVE DOM appears here.' } },
    { id: 2, icon: '🖱️', label: { tr: '"Copy selector" cazip görünür', en: '"Copy selector" looks tempting' }, detail: { tr: 'Sağ tık → Copy → Copy selector, genelde `body > div:nth-child(2) > ul > li:nth-child(3) > button` gibi UZUN ve İNDEKS TABANLI bir yol üretir.', en: 'Right-click -> Copy -> Copy selector usually produces a LONG, INDEX-BASED path like `body > div:nth-child(2) > ul > li:nth-child(3) > button`.' } },
    { id: 3, icon: '⚠️', label: { tr: 'Bu yol kırılgandır', en: 'This path is fragile' }, detail: { tr: 'Bu yol DOM\'un O ANKİ tam şekline bağlıdır — bir `<div>` araya girse veya sıra değişse anında kırılır.', en: 'This path depends on the EXACT current shape of the DOM -- one extra `<div>` or a reorder breaks it instantly.' } },
    { id: 4, icon: '🔍', label: { tr: 'Attribute\'lara elle bak', en: 'Manually inspect the attributes' }, detail: { tr: 'Bunun yerine elementin attribute panelinde `data-testid`, `aria-label` veya stabil bir `id` arıyorsun.', en: 'Instead you look in the element\'s attribute panel for a `data-testid`, `aria-label`, or a stable `id`.' } },
    { id: 5, icon: '✅', label: { tr: 'En dayanıklısını seç', en: 'Pick the most durable one' }, detail: { tr: 'Bulursan onu kullan; bulamazsan developer\'dan iste. "Copy selector" son çaredir, ilk tercih DEĞİLDİR.', en: 'If you find one, use it; if not, ask the developer. "Copy selector" is the last resort, NOT the first choice.' } },
  ],
}

// ─── code-playground: kırılgan "Copy selector" çıktısını düzelt (GRUP A6) ─────
const fixFragileSelectorPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-a6-devtools-elements',
  id: 'qaf-a6-fix-fragile-selector',
  title: { tr: 'Kendin Dene: "Copy Selector" Çıktısını Dayanıklı Hale Getir', en: 'Try It Yourself: Make a "Copy Selector" Output Durable' },
  starterCode: {
    tr: `// DevTools'tan "Copy selector" ile kopyaladığın çıktı bu:
// body > div.app-shell > main > ul > li:nth-child(3) > button.Btn_ghost__p0q2
// TODO: DevTools'ta aynı butonun attribute panelinde data-testid="edit-bug-42"
// gördüğünü varsayarak dayanıklı bir locator yaz.
await page.locator('body > div.app-shell > main > ul > li:nth-child(3) > button.Btn_ghost__p0q2').click();`,
    en: `// This is the output you copied from DevTools with "Copy selector":
// body > div.app-shell > main > ul > li:nth-child(3) > button.Btn_ghost__p0q2
// TODO: assuming you saw data-testid="edit-bug-42" in the same button's attribute
// panel in DevTools, write a durable locator.
await page.locator('body > div.app-shell > main > ul > li:nth-child(3) > button.Btn_ghost__p0q2').click();`,
  },
  solutionCode: {
    tr: `// data-testid, DOM'un tam şekline değil kimliğe bağlıdır
await page.getByTestId('edit-bug-42').click();`,
    en: `// data-testid binds to identity, not the DOM's exact shape
await page.getByTestId('edit-bug-42').click();`,
  },
  hint: {
    tr: '"Copy selector" çıktısı `nth-child` ve tüm ata zincirini içerir — DOM\'un O ANKİ şekline bağlıdır. Attribute panelinde bir `data-testid` görüyorsan, uzun yol yerine doğrudan onu kullan.',
    en: 'The "Copy selector" output includes `nth-child` and the full ancestor chain -- it depends on the EXACT current DOM shape. If you see a `data-testid` in the attribute panel, use it directly instead of the long path.',
  },
  successMessage: {
    tr: 'Doğru! "Copy selector" bir başlangıç noktasıdır, son cevap değil. Attribute panelinde stabil bir kanca (data-testid, aria-label) görünce onu tercih et.',
    en: 'Correct! "Copy selector" is a starting point, not the final answer. When you see a stable hook (data-testid, aria-label) in the attribute panel, prefer it.',
  },
}

// ─── video-scene: Semantik element mi, div mi? Accessibility Tree'nin kararı (GRUP B) ─
const semanticVsDivFilm = {
  type: 'video-scene',
  id: 'qaf-semantic-vs-div-film',
  title: {
    tr: '🎬 Semantik Element mi, Div mi? Accessibility Tree\'nin Kararı',
    en: '🎬 Semantic Element or Div? The Accessibility Tree\'s Verdict',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'button',  emoji: '🔘', label: { tr: '<button>Kaydet</button>', en: '<button>Save</button>' },       color: '#22c55e' },
    { id: 'div',     emoji: '📦', label: { tr: '<div onclick=...>Kaydet</div>', en: '<div onclick=...>Save</div>' }, color: '#f59e0b' },
    { id: 'dom',     emoji: '🌳', label: { tr: 'DOM',                 en: 'DOM' },                 color: '#8b5cf6' },
    { id: 'a11y',    emoji: '🦯', label: { tr: 'Accessibility Tree',  en: 'Accessibility Tree' },  color: '#6366f1' },
    { id: 'role',    emoji: '✅', label: { tr: 'role="button" (otomatik)', en: 'role="button" (automatic)' }, color: '#10b981' },
    { id: 'generic', emoji: '❓', label: { tr: 'role yok (generic)',  en: 'no role (generic)' },   color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'İki "Kaydet" butonu var, PİKSEL PİKSEL aynı görünüyorlar: biri gerçek `<button>`, diğeri sadece CSS ile butona benzetilmiş bir `<div onclick="...">`. Gözle aralarında hiçbir fark yok — ama bu filmde tarayıcının onları NASIL FARKLI muamele ettiğini göreceksin.',
        en: 'There are two "Save" buttons that look PIXEL-IDENTICAL: one is a real `<button>`, the other is just a `<div onclick="...">` styled to look like a button. To the eye there is no difference — but in this film you will see how the browser treats them DIFFERENTLY.',
      },
      code: { tr: `<button>Kaydet</button>  vs  <div onclick="submit()">Kaydet</div>`, en: `<button>Save</button>  vs  <div onclick="submit()">Save</div>` },
      positions: {
        button: { x: 30, y: 40, scale: 1.1 },
        div: { x: 70, y: 40, scale: 1.1 },
      },
    },
    {
      caption: {
        tr: 'Adım 1 — İkisi de DOM\'a girer: parser her ikisini de birer node olarak ağaca ekler. Bu aşamada hâlâ hiçbir fark yok; DOM ikisini de eşit muamele eder.',
        en: 'Step 1 — Both enter the DOM: the parser adds both as nodes in the tree. At this point there is still no difference; the DOM treats both equally.',
      },
      code: { tr: `DOM: iki node da eklendi`, en: `DOM: both nodes added` },
      positions: {
        button: { x: 24, y: 50, scale: 1.05 },
        div: { x: 60, y: 50, scale: 1.05 },
        dom: { x: 84, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'button', to: 'dom' }, { from: 'div', to: 'dom' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Accessibility Tree kurulur: tarayıcı her elementin "anlamını" (role, isim, durum) çıkaran ikinci bir ağaç kurar — bu ağaç screen reader\'ın VE `getByRole`\'ün gördüğü şeydir.',
        en: 'Step 2 — The Accessibility Tree is built: the browser builds a second tree that extracts each element\'s "meaning" (role, name, state) — this is what the screen reader AND `getByRole` see.',
      },
      code: { tr: `accessibility tree kuruluyor...`, en: `building the accessibility tree...` },
      positions: {
        dom: { x: 24, y: 50, opacity: 0.6, scale: 0.9 },
        a11y: { x: 60, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'dom', to: 'a11y', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 3 — `<button>` OTOMATİK bir kimlik kazanır: role="button", isim="Kaydet" (metninden türetilir), Tab ile odaklanabilir, Enter/Space ile tetiklenebilir. Hiçbir ekstra kod yazılmadı — bu, elementin doğasında var.',
        en: 'Step 3 — `<button>` AUTOMATICALLY gets an identity: role="button", name="Save" (derived from its text), focusable with Tab, triggerable with Enter/Space. No extra code was written — this is built into the element\'s nature.',
      },
      code: { tr: `role: button · name: "Kaydet" · focusable: true`, en: `role: button · name: "Save" · focusable: true` },
      positions: {
        a11y: { x: 24, y: 40, opacity: 0.6, scale: 0.9 },
        role: { x: 60, y: 40, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'a11y', to: 'role', color: '#10b981' }],
    },
    {
      caption: {
        tr: 'Adım 4 — `<div onclick>` HİÇBİR kimlik kazanmaz: accessibility tree\'de rolü "generic"tir (anlamsız), Tab ile odaklanamaz, Enter/Space ile tetiklenmez — sadece fare tıklamasıyla çalışır. Screen reader kullanıcısı bunun tıklanabilir olduğunu ASLA anlamaz.',
        en: 'Step 4 — `<div onclick>` gets NO identity at all: its role in the accessibility tree is "generic" (meaningless), it cannot be focused with Tab, it is not triggered by Enter/Space — it only works with a mouse click. A screen-reader user NEVER learns it is clickable.',
      },
      code: { tr: `role: generic · name: (yok) · focusable: false`, en: `role: generic · name: (none) · focusable: false` },
      positions: {
        a11y: { x: 24, y: 60, opacity: 0.6, scale: 0.9 },
        generic: { x: 60, y: 60, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'a11y', to: 'generic', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Final — Locator sonucu: `getByRole(\'button\', { name: \'Kaydet\' })` SADECE gerçek `<button>`\'ı bulur; `<div onclick>`\'i asla bulamaz çünkü rolü yok. Developer\'dan ne iste? "Gerçek `<button>` kullan; illa div gerekiyorsa `role="button" tabindex="0"` ve klavye desteği ekle." Semantik element hem erişilebilirliği hem locator\'ı aynı anda kazandırır.',
        en: 'Final — The locator outcome: `getByRole(\'button\', { name: \'Save\' })` finds ONLY the real `<button>`; it never finds `<div onclick>` because it has no role. What to ask the developer? "Use a real `<button>`; if a div is truly needed, add `role="button" tabindex="0"` and keyboard support." A semantic element wins accessibility AND the locator at the same time.',
      },
      code: { tr: `getByRole('button', { name: 'Kaydet' }) → sadece <button>`, en: `getByRole('button', { name: 'Save' }) -> only <button>` },
      positions: {
        role: { x: 30, y: 45, scale: 1.15, pulse: true },
        generic: { x: 68, y: 55, scale: 0.9, opacity: 0.5 },
      },
    },
  ],
}

// ─── step-animation: id/class/data-*/role hangi amaca hizmet eder (GRUP B2) ───
const attributePurposeSteps = {
  type: 'step-animation',
  id: 'qaf-b2-attribute-purpose-steps',
  title: { tr: 'Adım Adım: Her Attribute Farklı Bir Amaca Hizmet Eder', en: 'Step by Step: Each Attribute Serves a Different Purpose' },
  steps: [
    { id: 1, icon: '🪪', label: { tr: '`id` — resmi kimlik', en: '`id` — official identity' }, detail: { tr: 'Sayfada BENZERSİZ olmalıdır; tıpkı T.C. kimlik numarası gibi bir tane olur. Amacı: tekil tanımlama.', en: 'Must be UNIQUE on the page; like a national ID number, there is only one. Purpose: unique identification.' } },
    { id: 2, icon: '👕', label: { tr: '`class` — kıyafet/stil', en: '`class` — clothing/style' }, detail: { tr: 'Birden çok elementte aynı olabilir ve sık değişir (yeni sezon = yeni tasarım). Amacı: görünüm, KİMLİK DEĞİL.', en: 'Can be the same on many elements and changes often (new season = new design). Purpose: appearance, NOT identity.' } },
    { id: 3, icon: '🏷️', label: { tr: '`data-testid` — özel test rozeti', en: '`data-testid` — a dedicated test badge' }, detail: { tr: 'Sadece otomasyon için asılan bir rozettir; stil veya davranışla hiç ilgisi yoktur, bu yüzden en dayanıklısıdır.', en: 'A badge hung solely for automation; it has nothing to do with style or behavior, which is why it is the most durable.' } },
    { id: 4, icon: '🦯', label: { tr: '`role`/`aria-*` — işlev kartı', en: '`role`/`aria-*` — a function card' }, detail: { tr: 'Elementin TOPLUMDAKİ işlevini (buton mu, sekme mi, uyarı mı) tarif eder; hem erişilebilirlik hem `getByRole` bunu okur.', en: 'Describes the element\'s FUNCTION in the world (is it a button, a tab, an alert); both accessibility and `getByRole` read it.' } },
    { id: 5, icon: '⚠️', label: { tr: 'Karışıklık: birini diğeri yerine kullanmak', en: 'The mix-up: using one in place of another' }, detail: { tr: '`class`\'ı kimlik (id) gibi kullanmak, kıyafete göre insan tanımaya benzer — sezon (deploy) değişince tanıma bozulur.', en: 'Using `class` as an identity (like id) is like recognizing a person by their clothes — recognition breaks once the season (deploy) changes.' } },
  ],
}

// ─── code-playground: doğru attribute'u seç (GRUP B2) ─────────────────────────
const pickDurableAttributePlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-b2-attributes',
  id: 'qaf-b2-pick-attribute',
  title: { tr: 'Kendin Dene: Bu Butonda Hangi Attribute\'a Güvenirsin?', en: 'Try It Yourself: Which Attribute Would You Trust on This Button?' },
  starterCode: {
    tr: `// DevTools'ta gördüğün buton:
// <button id="btn-7f" class="Btn_primary__k92a" data-testid="submit-bug"
//         role="button" aria-label="Bug'ı gönder">Gönder</button>
// id her sayfa yüklemesinde YENİDEN ÜRETİLİYOR (rastgele sayı), class build'de
// hash değiştiriyor. TODO: locator'ı en dayanıklı attribute'a göre yaz.
await page.locator('#btn-7f').click();`,
    en: `// The button you see in DevTools:
// <button id="btn-7f" class="Btn_primary__k92a" data-testid="submit-bug"
//         role="button" aria-label="Submit bug">Submit</button>
// id is REGENERATED on every page load (a random number), class changes its
// hash on build. TODO: write the locator based on the most durable attribute.
await page.locator('#btn-7f').click();`,
  },
  solutionCode: {
    tr: `// data-testid: build'den, sayfa yüklemesinden ve dilden bağımsız
await page.getByTestId('submit-bug').click();`,
    en: `// data-testid: independent of build, page load, and language
await page.getByTestId('submit-bug').click();`,
  },
  hint: {
    tr: 'Bu senaryoda `id` bile dinamik (her yüklemede değişiyor) ve `class` build\'de hash değiştiriyor — ikisi de kimlik olarak GÜVENİLMEZ. `data-testid` sadece test için var ve hiçbir şeyden etkilenmez.',
    en: 'In this scenario even `id` is dynamic (changes on every load) and `class` changes its hash on build — neither is TRUSTWORTHY as an identity. `data-testid` exists solely for tests and is affected by nothing.',
  },
  successMessage: {
    tr: 'Doğru! Bir attribute\'un "kimlik" gibi görünmesi onu güvenilir yapmaz — asıl soru o attribute\'un hangi amaçla var olduğu ve neyin etkisiyle değiştiğidir.',
    en: 'Correct! An attribute looking like an "identity" does not make it trustworthy — the real question is what purpose it exists for and what causes it to change.',
  },
}

// ─── table: id vs class vs data-testid dayanıklılık (GRUP B3) ─────────────────
const attributeDurabilityTable = {
  type: 'table',
  headers: [
    { tr: 'Attribute', en: 'Attribute' },
    { tr: 'Deploy\'da değişir mi?', en: 'Changes on deploy?' },
    { tr: 'Sayfa yüklemesinde değişir mi?', en: 'Changes on page load?' },
    { tr: 'Locator önerisi', en: 'Locator recommendation' },
  ],
  rows: [
    ['data-testid', { tr: '❌ Hayır', en: '❌ No' }, { tr: '❌ Hayır', en: '❌ No' }, { tr: '✅ İlk tercih', en: '✅ First choice' }],
    ['role + aria-label', { tr: '❌ Hayır', en: '❌ No' }, { tr: '❌ Hayır', en: '❌ No' }, { tr: '✅ İkinci tercih', en: '✅ Second choice' }],
    ['stabil id', { tr: '❌ Hayır', en: '❌ No' }, { tr: '⚠️ Bazen (dinamikse evet)', en: '⚠️ Sometimes (yes if dynamic)' }, { tr: '⚠️ Sabitse kullan', en: '⚠️ Use if stable' }],
    ['class (CSS Module)', { tr: '✅ Evet (hash)', en: '✅ Yes (hash)' }, { tr: '❌ Hayır', en: '❌ No' }, { tr: '❌ Kullanma', en: '❌ Do not use' }],
  ],
}

// ─── challenge (order-sort): attribute dayanıklılık sırası (GRUP B3) ──────────
const attributeOrderChallenge = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'qaf-b3-attribute-order-01',
  question: { tr: 'Bu attribute\'ları EN DAYANIKLIDAN EN KIRILGANA doğru sırala.', en: 'Order these attributes from MOST DURABLE to MOST FRAGILE.' },
  items: [
    { id: '1', text: { tr: 'data-testid', en: 'data-testid' }, order: 1 },
    { id: '2', text: { tr: 'role + aria-label', en: 'role + aria-label' }, order: 2 },
    { id: '3', text: { tr: 'stabil (sabit) id', en: 'stable (fixed) id' }, order: 3 },
    { id: '4', text: { tr: 'CSS Module class (hash\'li)', en: 'CSS Module class (hashed)' }, order: 4 },
  ],
  xpReward: 10,
}

// ─── step-animation: label/for ↔ input/id ilişkisi (GRUP B4) ──────────────────
const labelForIdSteps = {
  type: 'step-animation',
  id: 'qaf-b4-label-for-id-steps',
  title: { tr: 'Adım Adım: `label`\'ın `for\'u `input`\'un `id`\'sine Neden Eşit Olmalı?', en: 'Step by Step: Why a `label`\'s `for` Must Match an `input`\'s `id`' },
  steps: [
    { id: 1, icon: '🏷️', label: { tr: '`<label for="reporter">` yazılır', en: '`<label for="reporter">` is written' }, detail: { tr: 'Developer "Bildiren" etiketini yazar ve `for="reporter"` ile bir input\'a İŞARET ETTİĞİNİ belirtir.', en: 'The developer writes the "Reporter" label and points to an input with `for="reporter"`.' } },
    { id: 2, icon: '🔗', label: { tr: '`<input id="reporter">` eşleşirse…', en: 'If `<input id="reporter">` matches...' }, detail: { tr: 'Tarayıcı bu ikisini BAĞLAR: label\'a tıklamak input\'u odaklar, screen reader "Bildiren" ismini input\'a atar.', en: 'The browser LINKS the two: clicking the label focuses the input, and the screen reader assigns the name "Reporter" to the input.' } },
    { id: 3, icon: '💥', label: { tr: 'Ama `id="reporterEmail"` olursa…', en: 'But if it is `id="reporterEmail"` instead...' }, detail: { tr: 'Bir refactor sırasında input\'un id\'si değişir ama label\'ın `for`\'u güncellenmezse, bağlantı SESSİZCE kopar — hiçbir hata mesajı çıkmaz.', en: 'During a refactor the input\'s id changes but the label\'s `for` is not updated, the link breaks SILENTLY — no error message appears.' } },
    { id: 4, icon: '🖱️', label: { tr: 'Görsel olarak fark edilmez', en: 'Visually unnoticeable' }, detail: { tr: 'Sayfa görsel olarak AYNI görünür; sadece label\'a tıklayınca artık input odaklanmaz ve `getByLabel(\'Bildiren\')` elementi bulamaz.', en: 'The page LOOKS the same visually; only clicking the label no longer focuses the input, and `getByLabel(\'Reporter\')` cannot find the element.' } },
    { id: 5, icon: '✅', label: { tr: 'Tester bunu nasıl yakalar', en: 'How a tester catches this' }, detail: { tr: '`getByLabel(\'Bildiren\')` ile bir locator yazmak, bu ilişkiyi doğrulayan canlı bir testtir — bağlantı kopuksa test de bulamaz ve durumu ortaya çıkarır.', en: 'Writing a locator with `getByLabel(\'Reporter\')` is a live test that verifies this relationship — if the link is broken, the test cannot find it either, exposing the issue.' } },
  ],
}

// ─── code-playground: kopuk label/for ilişkisini locator ile yakala (GRUP B4) ─
const labelForMismatchPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-b4-form-elements',
  id: 'qaf-b4-label-mismatch',
  title: { tr: 'Kendin Dene: "New Bug" Formunda Doğru Locator\'ı Yaz', en: 'Try It Yourself: Write the Right Locator on the "New Bug" Form' },
  starterCode: {
    tr: `// "New Bug" modal'ında: <label for="reporter">Bildiren</label>
// <input id="reporter" name="reporterEmail" type="email" />
// TODO: bu input'a en dayanıklı şekilde nasıl ulaşırsın?
await page.locator('input[name="reporterEmail"]').fill('test@ornek.com');`,
    en: `// In the "New Bug" modal: <label for="reporter">Reporter</label>
// <input id="reporter" name="reporterEmail" type="email" />
// TODO: what is the most durable way to reach this input?
await page.locator('input[name="reporterEmail"]').fill('test@example.com');`,
  },
  solutionCode: {
    tr: `// label/for ilişkisi doğruysa getByLabel en okunabilir VE en dayanıklısıdır
await page.getByLabel('Bildiren').fill('test@ornek.com');`,
    en: `// If the label/for relationship is correct, getByLabel is the most readable AND durable
await page.getByLabel('Reporter').fill('test@example.com');`,
  },
  hint: {
    tr: '`name` attribute\'u backend\'e giden alan adıdır ve iş mantığı değişince değişebilir (`reporterEmail` → `reporter`). `label`/`for` ilişkisi doğruysa `getByLabel`, kullanıcının GÖRDÜĞÜ metne bağlıdır ve hem erişilebilirliği hem locate\'i doğrular.',
    en: 'The `name` attribute is the field name sent to the backend and can change with business logic (`reporterEmail` -> `reporter`). If the label/for relationship is correct, `getByLabel` binds to what the user SEES and verifies both accessibility and locating.',
  },
  successMessage: {
    tr: 'Doğru! `getByLabel` hem kullanıcının gördüğü metne dayandığı için okunabilir hem de label/for ilişkisini canlı doğrulayan bir test görevi görür.',
    en: 'Correct! `getByLabel` is readable because it relies on what the user sees, and it also acts as a live test verifying the label/for relationship.',
  },
}

// ─── step-animation: Accessibility Tree'nin gerçek yapısı (GRUP B5) ───────────
const accessibilityTreeSteps = {
  type: 'step-animation',
  id: 'qaf-b5-accessibility-tree-steps',
  title: { tr: 'Adım Adım: `getByRole` Aslında Neyi Okuyor?', en: 'Step by Step: What Does `getByRole` Actually Read?' },
  steps: [
    { id: 1, icon: '🌳', label: { tr: 'DOM ağacı var', en: 'The DOM tree exists' }, detail: { tr: 'BugCard\'daki her element (li, span, h3, button) bir DOM node\'udur — görsel yapı budur.', en: 'Every element in the BugCard (li, span, h3, button) is a DOM node — this is the visual structure.' } },
    { id: 2, icon: '🦯', label: { tr: 'İkinci bir ağaç: Accessibility Tree', en: 'A second tree: the Accessibility Tree' }, detail: { tr: 'Tarayıcı DOM\'dan SÜZEREK ikinci bir ağaç çıkarır: sadece "anlamı" olan node\'lar (role + isim + durum) kalır.', en: 'The browser filters the DOM into a second tree: only nodes with "meaning" (role + name + state) remain.' } },
    { id: 3, icon: '🔍', label: { tr: '`getByRole` bu ikinci ağaca bakar', en: '`getByRole` looks at this second tree' }, detail: { tr: '`getByRole(\'button\', {name:\'Düzenle\'})` DOM\'u DEĞİL, accessibility tree\'yi arar — role="button" VE isim="Düzenle" olan node\'u bulur.', en: '`getByRole(\'button\', {name:\'Edit\'})` searches the accessibility tree, NOT the DOM — it finds the node with role="button" AND name="Edit".' } },
    { id: 4, icon: '📛', label: { tr: '"İsim" nereden gelir?', en: 'Where does the "name" come from?' }, detail: { tr: 'İsim (accessible name) sırayla şuralardan türetilir: `aria-label` > `aria-labelledby` > element metni > `alt`/`placeholder`.', en: 'The name (accessible name) is derived, in order, from: `aria-label` > `aria-labelledby` > element text > `alt`/`placeholder`.' } },
    { id: 5, icon: '✅', label: { tr: 'Sonuç: getByRole hem dayanıklı hem erişilebilirliği zorlar', en: 'Result: getByRole is both durable and enforces accessibility' }, detail: { tr: 'Bu ağaç class hash\'inden ve DOM yapısından bağımsızdır; developer\'ın accessibility\'ye önem vermesi otomatikman locator kalitesini de yükseltir.', en: 'This tree is independent of class hashes and DOM structure; a developer caring about accessibility automatically raises locator quality too.' } },
  ],
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
          en: 'The DOM is a FAMILY TREE: each element is a node, the elements inside it are its children, the elements wrapping it are its parents. A `<li>` is an element node, the "OPEN" text inside it is a text node, and `class="..."` is an attribute node. Why does this distinction matter for a locator? Because a locator like `//li/span` says "the span that is a direct child of li" — it uses the kinship in the tree; a tester who does not know the tree structure cannot build relational locators. Java analogy: like an object graph of nested objects — a parent.getChild() chain. In QA context: finding a row as "the row that contains X" is far more durable than binding to an index (`li[3]`), because the index shifts when ordering changes.',
        },
      },
      domFamilyTreeSteps,
      relationalLocatorPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'BugCard listesine yeni bir bug eklenince kartlar bir sıra kayıyor. `page.locator(\'li\').nth(2)` yerine hangi locator sıralama değişse de aynı karta gider?',
          en: 'When a new bug is added to the BugCard list, the cards shift by one position. Instead of `page.locator(\'li\').nth(2)`, which locator still reaches the same card even after the order changes?',
        },
        options: [
          { id: 'a', text: { tr: '`page.locator(\'li\').nth(3)` — bir fazla index dene', en: '`page.locator(\'li\').nth(3)` — try one more index' } },
          { id: 'b', text: { tr: '`page.locator(\'li\', { hasText: "Login butonu 500 donuyor" })` — ilişkisel, metne göre', en: '`page.locator(\'li\', { hasText: "Login button freezes on 500" })` — relational, by text' } },
          { id: 'c', text: { tr: '`page.locator(\'li:last-child\')` — her zaman son eleman', en: '`page.locator(\'li:last-child\')` — always the last element' } },
          { id: 'd', text: { tr: 'Sayfayı yenileyip tekrar dene', en: 'Reload the page and try again' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`hasText` ile yazılan locator, "içinde bu metin geçen li" der — ağaçtaki akrabalık ilişkisini kullanır ve kartın sırası değişse de aynı elemente ulaşır. `.nth()` ve `:last-child` ise ağacın O ANKİ şekline (sıraya) bağımlıdır.',
          en: 'A locator written with `hasText` says "the li that contains this text" — it uses the kinship relationship in the tree and reaches the same element even if the card\'s position changes. `.nth()` and `:last-child` depend on the tree\'s CURRENT shape (order).',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tabloda 20 satır var ve her satır bir `<tr>`. "3. satırı sil" butonuna tıklamak istiyorsun ama satırlar filtrelemeyle sık yeniden sıralanıyor. En dayanıklı yaklaşım hangisidir?',
            en: 'A table has 20 rows, each a `<tr>`. You want to click the "delete" button on "row 3", but rows are frequently re-sorted by filtering. Which approach is the most durable?',
          },
          options: [
            { id: 'a', text: { tr: '`tr:nth-child(3)` ile satır numarasına göre bul', en: 'Find by row number with `tr:nth-child(3)`' } },
            { id: 'b', text: { tr: 'Satırı benzersiz bir kimlikle (data-id, data-testid) ilişkisel bul, sonra o satırın içindeki butona tıkla', en: 'Find the row relationally by a unique identity (data-id, data-testid), then click the button inside that row' } },
            { id: 'c', text: { tr: 'Her zaman ilk satırı sil', en: 'Always delete the first row' } },
            { id: 'd', text: { tr: 'Filtrelemeyi kapatıp sıralamanın değişmemesini bekle', en: 'Turn off filtering and hope the order does not change' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Satır numarası (nth-child) filtrelemeyle değişen bir "o anki konum"dur. Satırı kimliğe göre bulup (örn. `[data-id="bug-42"]`) İÇİNDEKİ butona ilişkisel olarak gitmek, sıralamadan tamamen bağımsız ve dayanıklıdır.',
            en: 'The row number (nth-child) is a "current position" that changes with filtering. Finding the row by identity (e.g. `[data-id="bug-42"]`) and going to the button INSIDE it relationally is completely independent of ordering and durable.',
          },
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
          en: 'The CSSOM is the DOM\'s style twin: the browser also turns CSS rules into a tree, then the DOM and CSSOM merge to build the Render Tree. Key point: an element with `display:none` EXISTS in the DOM but is ABSENT from the Render Tree — so it can be located but not clicked/seen. Why does it concern a tester? This is the exact root of the "element found but ElementNotInteractable" error: present in the DOM, absent from the render tree. Java analogy: like an object that exists in memory (DOM) but has not been drawn on the UI thread (render tree). In QA context: visibility and presence are two separate concepts, and the correct wait strategy (visible vs present?) rests on this distinction.',
        },
      },
      cssomRenderTreeSteps,
      waitStrategyPlayground,
      {
        type: 'quiz',
        question: {
          tr: '"New Bug" modalı DOM\'a `display:none` ile eklenir, 200ms sonra görünür olur. Test modal açılır açılmaz `waitFor({ state: \'attached\' })` ile bekleyip submit butonuna tıklıyor ve "ElementNotInteractable" hatası alıyor. Kök neden nedir?',
          en: 'The "New Bug" modal is added to the DOM with `display:none`, becoming visible 200ms later. The test waits with `waitFor({ state: \'attached\' })` right after opening the modal and clicks the submit button, getting an "ElementNotInteractable" error. What is the root cause?',
        },
        options: [
          { id: 'a', text: { tr: '`attached` sadece DOM varlığını doğrular; element henüz Render Tree\'ye girmemiş olabilir', en: '`attached` only confirms DOM presence; the element may not have entered the Render Tree yet' } },
          { id: 'b', text: { tr: 'Selenium/Playwright bozuk', en: 'Selenium/Playwright is broken' } },
          { id: 'c', text: { tr: 'Modal hiç DOM\'a eklenmemiş', en: 'The modal was never added to the DOM' } },
          { id: 'd', text: { tr: 'Buton yanlış yazılmış', en: 'The button was written incorrectly' } },
        ],
        correct: 'a',
        explanation: {
          tr: '`attached`, elementin DOM\'da var olduğunu doğrular — ama `display:none` iken bile bu true döner çünkü DOM varlığı ile Render Tree varlığı FARKLI şeylerdir. Tıklanabilirlik Render Tree\'ye (yani `visible` durumuna) bağlıdır; bu yüzden `visible` beklenmeliydi.',
          en: '`attached` confirms the element exists in the DOM — but this returns true even while `display:none`, because DOM presence and Render Tree presence are DIFFERENT things. Clickability depends on the Render Tree (i.e. the `visible` state); `visible` should have been awaited instead.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir StatusBadge component\'i `visibility: hidden` ile gizleniyor (display:none değil). Bu elementin Render Tree\'deki durumu ne olur?',
            en: 'A StatusBadge component is hidden with `visibility: hidden` (not display:none). What is this element\'s status in the Render Tree?',
          },
          options: [
            { id: 'a', text: { tr: 'Render Tree\'ye HİÇ girmez, display:none ile aynıdır', en: 'It NEVER enters the Render Tree, same as display:none' } },
            { id: 'b', text: { tr: 'Render Tree\'ye GİRER (yer kaplar) ama görünmez — display:none\'dan farklıdır', en: 'It ENTERS the Render Tree (takes up space) but is invisible — different from display:none' } },
            { id: 'c', text: { tr: 'DOM\'dan tamamen silinir', en: 'It is completely removed from the DOM' } },
            { id: 'd', text: { tr: 'Hiçbir fark yoktur, ikisi de aynı davranır', en: 'There is no difference, both behave the same' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`visibility:hidden`, `display:none`\'dan farklı olarak elementi Render Tree\'de TUTAR (layout yeri hâlâ ayrılır) ama pikselleri boyamaz. Bu ayrım da locator/wait stratejisi için önemlidir: bazı framework\'lerde bu element "visible" sayılmaz ama "present"tir.',
            en: 'Unlike `display:none`, `visibility:hidden` KEEPS the element in the Render Tree (its layout space is still reserved) but does not paint its pixels. This distinction matters for locator/wait strategy too: in some frameworks this element does not count as "visible" but is "present".',
          },
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
          en: '"Rendering" is not a single moment but a 5-step ASSEMBLY LINE: Parse (HTML->DOM), Style (CSS->CSSOM), Layout (each box\'s position/size is computed), Paint (pixels are painted), Composite (layers are combined). Why should a tester know these steps? Because where you are on this line the moment you say "the page loaded" determines whether the element is clickable — before Layout finishes a button has no position, and a click misses. Java analogy: like a request\'s request->controller->service->repository->response pipeline, each step depends on the previous. In QA context: a large share of flaky tests come from "locating/clicking while the line has not finished".',
        },
      },
      renderFiveStepsFilm,
      renderOrderChallenge,
      {
        type: 'quiz',
        question: {
          tr: 'Render\'ın 5 adımından hangisi bittiğinde bir butonun ekrandaki tam konumu (x, y, genişlik, yükseklik) ilk kez hesaplanmış olur?',
          en: 'When which of the 5 rendering steps finishes is a button\'s exact on-screen position (x, y, width, height) computed for the first time?',
        },
        options: [
          { id: 'a', text: { tr: 'Parse', en: 'Parse' } },
          { id: 'b', text: { tr: 'Style', en: 'Style' } },
          { id: 'c', text: { tr: 'Layout', en: 'Layout' } },
          { id: 'd', text: { tr: 'Paint', en: 'Paint' } },
        ],
        correct: 'c',
        explanation: {
          tr: 'Layout adımında her node\'un tam konumu ve boyutu piksel cinsinden hesaplanır. Parse sadece yapıyı (DOM) kurar, Style sadece görünüş kurallarını (CSSOM) hesaplar, Paint ise Layout\'un ürettiği kutuları pikselle boyar — konum bilgisi Layout\'tan önce yoktur.',
          en: 'In the Layout step, every node\'s exact position and size is computed in pixels. Parse only builds the structure (DOM), Style only computes the appearance rules (CSSOM), and Paint paints the boxes Layout produced into pixels — position information does not exist before Layout.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir test, sayfa "DOMContentLoaded" event\'i tetiklenir tetiklenmez bir butona tıklıyor ve tıklama yanlış koordinata düşüyor (buton henüz o konumda değil). Hangi render adımının bitmediğinden şüphelenirsin?',
            en: 'A test clicks a button the moment the "DOMContentLoaded" event fires, and the click lands on the wrong coordinate (the button is not there yet). Which rendering step do you suspect has not finished?',
          },
          options: [
            { id: 'a', text: { tr: 'Parse — DOM ağacı henüz kurulmamış olabilir', en: 'Parse — the DOM tree may not be built yet' } },
            { id: 'b', text: { tr: 'Layout/Paint/Composite — DOM kurulmuş olabilir ama konum/piksel/ekran hattı henüz tamamlanmamıştır', en: 'Layout/Paint/Composite — the DOM may be built, but the position/pixel/screen line has not completed yet' } },
            { id: 'c', text: { tr: 'Hiçbiri, DOMContentLoaded her zaman güvenlidir', en: 'None, DOMContentLoaded is always safe' } },
            { id: 'd', text: { tr: 'Sorun testin kendisinde, render ile ilgisi yok', en: 'The problem is in the test itself, unrelated to rendering' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`DOMContentLoaded`, DOM ağacının kurulduğunu (Parse bittiğini) garanti eder ama Style/Layout/Paint/Composite\'in bittiğini GARANTİ ETMEZ — özellikle CSS/resim yüklemesi veya JS ile geç eklenen içerik varsa. Bu yüzden testler genelde elementin `visible` olmasını beklemelidir, sadece DOM event\'ini değil.',
            en: '`DOMContentLoaded` guarantees the DOM tree was built (Parse finished) but does NOT guarantee Style/Layout/Paint/Composite finished — especially with CSS/image loading or content added late by JS. This is why tests should generally wait for the element to be `visible`, not just for the DOM event.',
          },
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
          en: 'Reflow is the browser recomputing Layout because of a change on the page (like a new BugCard being added); Repaint is only the appearance (like color) being repainted. Why does it matter? During a reflow the positions of elements shift for a moment — the element the test locates right then can behave "now here, now gone". Java analogy: like the ConcurrentModification feeling when you mutate a collection during iteration — the structure slides out from under you. In QA context: locating while a list fills or an animation plays is the classic source of StaleElementReference; the right reflex is to wait for things to stabilize.',
        },
      },
      reflowRepaintSteps,
      waitForStablePlayground,
      {
        type: 'quiz',
        question: {
          tr: '"New Bug" formu gönderildikten hemen sonra test `page.waitForTimeout(1000)` ile bekleyip ilk karta tıklıyor. CI sunucusu yavaş olduğu gün test flaky oluyor. En sağlam çözüm nedir?',
          en: 'Right after submitting the "New Bug" form, the test waits with `page.waitForTimeout(1000)` and clicks the first card. On days the CI server is slow, the test is flaky. What is the most robust fix?',
        },
        options: [
          { id: 'a', text: { tr: 'Süreyi 1000\'den 5000\'e çıkar', en: 'Increase the duration from 1000 to 5000' } },
          { id: 'b', text: { tr: 'Sabit sleep yerine liste sayısının arttığını doğrulayan bir assertion (`toHaveCount`) kullan', en: 'Use an assertion (`toHaveCount`) that verifies the list count increased, instead of a fixed sleep' } },
          { id: 'c', text: { tr: 'Testi CI\'da çalıştırmayı bırak', en: 'Stop running the test in CI' } },
          { id: 'd', text: { tr: 'Reflow\'u JS ile devre dışı bırak', en: 'Disable the reflow via JS' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Sabit bir süre her zaman bir tahmindir — yavaş makinede yetmez, hızlı makinede gereksiz bekletir. Koşullu bir assertion (liste sayısının arttığını bekleyen) reflow\'un GERÇEKTEN bittiğini garanti eder ve makine hızından bağımsız çalışır.',
          en: 'A fixed duration is always a guess — it is not enough on a slow machine and wastes time on a fast one. A conditional assertion (waiting for the list count to increase) guarantees the reflow has REALLY finished and works independent of machine speed.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir developer "flaky testi düzeltmek için her yere `sleep(2000)` ekledik" diyor. Bunun neden kalıcı bir çözüm olmadığını nasıl açıklarsın?',
            en: 'A developer says "we fixed the flaky test by adding `sleep(2000)` everywhere". How do you explain why this is not a permanent fix?',
          },
          options: [
            { id: 'a', text: { tr: 'Kalıcı bir çözümdür, endişelenecek bir şey yok', en: 'It is a permanent fix, nothing to worry about' } },
            { id: 'b', text: { tr: 'Sabit sleep bir varsayımdır; yeterince yavaş bir gün testi yine kırar ve tüm suite gereksiz yavaşlar', en: 'A fixed sleep is an assumption; a slow enough day will break the test again, and the whole suite gets needlessly slower' } },
            { id: 'c', text: { tr: 'sleep hiçbir zaman işe yaramaz', en: 'sleep never works at all' } },
            { id: 'd', text: { tr: 'Sorun testte değil sunucuda', en: 'The problem is not in the test but on the server' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Sabit `sleep`, "işlem bu sürede biter" varsayımına dayanır — ama garanti etmez. Yeterince yavaş bir ağ/CI günü aynı flaky\'liği geri getirir, üstelik HER testte gereksiz beklemeyle suite süresini şişirir. Kalıcı çözüm koşullu (assertion tabanlı) beklemedir.',
            en: 'A fixed `sleep` relies on the assumption "the operation finishes within this time" — but it does not guarantee it. A slow enough network/CI day brings back the same flakiness, and it inflates suite duration with needless waiting on EVERY test. The permanent fix is a conditional (assertion-based) wait.',
          },
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
          en: 'The DevTools -> Elements panel is the tester\'s most powerful weapon: it shows NOT the source file but the current live DOM. You can right-click an element and choose "Copy -> Copy selector", but that usually produces a fragile CSS path — what you should really do in the panel is inspect the element\'s attributes and pick the MOST DURABLE one (data-testid, role, stable id). Why does it matter? Because locator quality begins with which source you look at. Java analogy: like looking at a running program\'s live variable state in a debugger — at the current truth, not the source code. In QA context: deriving your locator from Elements produces far more robust tests than trusting blind "Copy selector".',
        },
      },
      devtoolsElementsSteps,
      fixFragileSelectorPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'DevTools\'ta bir butona sağ tıklayıp "Copy selector" dedin ve `body > div:nth-child(2) > ul > li:nth-child(3) > button` çıktısını aldın. Bu yaklaşımla ilgili en doğru değerlendirme hangisidir?',
          en: 'You right-clicked a button in DevTools and chose "Copy selector", getting `body > div:nth-child(2) > ul > li:nth-child(3) > button`. What is the most accurate assessment of this approach?',
        },
        options: [
          { id: 'a', text: { tr: 'Mükemmel, doğrudan kullanılabilir', en: 'Perfect, ready to use directly' } },
          { id: 'b', text: { tr: 'Başlangıç noktasıdır ama nth-child\'a bağlı olduğu için kırılgandır; attribute panelinde data-testid/aria-label aranmalı', en: 'A starting point, but fragile because it depends on nth-child; a data-testid/aria-label should be sought in the attribute panel' } },
          { id: 'c', text: { tr: 'Hiçbir zaman işe yaramaz, kullanma', en: 'It never works, do not use it' } },
          { id: 'd', text: { tr: 'Sadece Chrome\'da çalışır', en: 'It only works in Chrome' } },
        ],
        correct: 'b',
        explanation: {
          tr: '"Copy selector" DOM\'un o anki tam şekline (ata zinciri + nth-child) bağlı bir yol üretir — bir tek `<div>` araya girse kırılır. Doğru refleks: bu çıktıyı bir BAŞLANGIÇ olarak görüp attribute panelinde daha dayanıklı bir kanca (data-testid, aria-label, stabil id) aramaktır.',
          en: '"Copy selector" produces a path tied to the DOM\'s exact current shape (ancestor chain + nth-child) — one extra `<div>` breaks it. The right reflex: treat this output as a STARTING point and look in the attribute panel for a more durable hook (data-testid, aria-label, stable id).',
        },
        retryQuestion: {
          question: {
            tr: 'Yeni bir tester "DevTools\'ta Copy selector kullanmayı öğrendim, artık locator yazmayı biliyorum" diyor. Bu düşüncedeki eksiği nasıl tamamlarsın?',
            en: 'A new tester says "I learned to use Copy selector in DevTools, now I know how to write locators". How do you complete the gap in this thinking?',
          },
          options: [
            { id: 'a', text: { tr: 'Doğru, başka bir şey öğrenmesine gerek yok', en: 'Correct, they do not need to learn anything else' } },
            { id: 'b', text: { tr: 'Copy selector bir kısayoldur; asıl beceri attribute panelini okuyup dayanıklılık hiyerarşisine göre EN İYİ locator\'ı elle seçebilmektir', en: 'Copy selector is a shortcut; the real skill is being able to read the attribute panel and manually pick the BEST locator per the durability hierarchy' } },
            { id: 'c', text: { tr: 'Copy selector\'ı hiç kullanmamalı', en: 'They should never use Copy selector at all' } },
            { id: 'd', text: { tr: 'Sadece XPath öğrenmesi yeterli', en: 'Learning only XPath is enough' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Copy selector bir araçtır, bir beceri değildir. Gerçek beceri, panelde gördüğün attribute\'ları (data-testid, role, id, class) tanıyıp hangisinin build/deploy/i18n\'den bağımsız kalacağını değerlendirmektir — bu, sayfanın Locator Ustalığı (GRUP H) bölümünde derinleşir.',
            en: 'Copy selector is a tool, not a skill. The real skill is recognizing the attributes you see in the panel (data-testid, role, id, class) and judging which will stay independent of build/deploy/i18n — this deepens in the Locator Mastery section (GROUP H) of the page.',
          },
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

  // ══ GRUP B — HTML: Locator'ın Ham Maddesi ═══════════════════════════════════
  {
    title: { tr: '🧱 HTML: Locator\'ın Ham Maddesi', en: '🧱 HTML: The Raw Material of Locators' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧱',
        content: {
          tr: 'HTML, bir binanın İSKELET ve ETİKETLEME sistemidir: `<button>` bir kapı, `<nav>` bir koridor, `id`/`class`/`data-*` ise kapılara asılmış isim etiketleridir. Locator dediğin şey aslında "hangi etikete bakarak doğru kapıyı bulacağım?" sorusudur. Peki neden bir etiket diğerinden daha iyi? Çünkü bazı etiketler (data-testid) sadece testçiler için asılır ve hiç değişmez; bazıları (class) dekorasyon için asılır ve boya değişince (yeni deploy) düşer. Java analojisi: bir nesnenin `equals/hashCode` için kullandığın alanı seçmek gibi — kararlı olmayan alanı seçersen ilişkin bozulur. QA bağlamında: HTML\'i "locator gözüyle" okuyabilen tester, developer\'dan doğru etiketi (kalıcı bir kanca) isteyebilir; okuyamayan kör XPath\'e mahkumdur.',
          en: 'HTML is the SKELETON and LABELING system of a building: a `<button>` is a door, a `<nav>` a corridor, and `id`/`class`/`data-*` are the name tags hung on the doors. What you call a locator is really the question "which tag do I read to find the right door?" Why is one tag better than another? Because some tags (data-testid) are hung only for testers and never change; others (class) are hung for decoration and fall off when the paint changes (a new deploy). Java analogy: like choosing which field to use for an object\'s `equals/hashCode` — pick an unstable field and the relationship breaks. In QA context: a tester who can read HTML "with a locator\'s eye" can ask the developer for the right tag (a durable hook); one who cannot is condemned to blind XPath.',
        },
      },

      // ── B1: Semantik Elementler ──
      {
        type: 'heading',
        text: { tr: '🚪 B1. Semantik Elementler: header, nav, main, button, a', en: '🚪 B1. Semantic Elements: header, nav, main, button, a' },
      },
      {
        type: 'simple-box',
        emoji: '🚪',
        content: {
          tr: 'Semantik HTML elementleri, üzerinde "BU BİR DÜĞMEDİR, BASILABİLİR" yazan resmi bir KAPI TABELASI gibidir: `<button>` bu tabelayı otomatik taşır, `<div onclick="...">` ise sadece boyanmış bir kapıdır — insan gözü ikisini de aynı sanır ama itfaiyeci (screen reader/accessibility API) sadece tabelalı olanı "kapı" diye kaydeder. Peki neden `<div onclick>` yerine `<button>` kullanmalıyım, ikisi de tıklanıyor ve aynı görünüyor? Java analojisi: `<button>` tarayıcının "Clickable" arayüzünü (interface) implement eder — otomatik focus, klavye desteği, rol bedava gelir; `<div>` bu arayüzü implement etmez, sen her metodu (tabindex, role, keydown listener) ELLE yeniden yazmak zorunda kalırsın. QA bağlamında: `<div onclick>` kullanan bir sayfa hem screen-reader kullanıcısını dışlar hem de `getByRole(\'button\')` gibi dayanıklı bir locator stratejisini İMKANSIZ kılar — tester bunu gördüğünde developer\'dan semantik elemente geçmesini ister.',
          en: 'A semantic HTML element is like an official DOOR SIGN reading "THIS IS A BUTTON, PRESSABLE": `<button>` carries this sign automatically, while a `<div onclick="...">` is just a painted door — the human eye thinks they are the same, but the firefighter (screen reader/accessibility API) only registers the one with the sign as a "door". So why should I use `<button>` instead of `<div onclick>` when both are clickable and look the same? Java analogy: `<button>` implements the browser\'s "Clickable" interface for free — automatic focus, keyboard support, and a role come built in; `<div>` does not implement that interface, so you must rewrite every method (tabindex, role, keydown listener) BY HAND. In QA context: a page using `<div onclick>` both excludes screen-reader users and makes a durable locator strategy like `getByRole(\'button\')` IMPOSSIBLE — when a tester sees this they ask the developer to switch to the semantic element.',
        },
      },
      semanticVsDivFilm,
      {
        type: 'quiz',
        question: {
          tr: 'Bir developer "`<div onclick=\'submit()\'>` ile `<button>` aynı iş: ikisi de tıklanıyor" diyor. Bu iddiadaki eksik nedir?',
          en: 'A developer says "`<div onclick=\'submit()\'>` and `<button>` do the same job: both are clickable". What is missing from this claim?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiçbir eksik yok, ikisi de aynıdır', en: 'Nothing is missing, they are identical' } },
          { id: 'b', text: { tr: '`<div>` accessibility tree\'de rol/isim/klavye desteği kazanmaz; `getByRole` onu bulamaz ve screen reader tıklanabilir olduğunu anlamaz', en: 'A `<div>` gets no role/name/keyboard support in the accessibility tree; `getByRole` cannot find it and a screen reader does not know it is clickable' } },
          { id: 'c', text: { tr: '`<div>` daha hızlı çalışır', en: 'A `<div>` runs faster' } },
          { id: 'd', text: { tr: '`<button>` sadece formlarda kullanılabilir', en: '`<button>` can only be used inside forms' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`<button>` otomatik olarak role="button", erişilebilir isim, Tab ile odaklanma ve Enter/Space ile tetiklenme kazanır. `<div onclick>` bunların HİÇBİRİNİ bedava almaz — hem erişilebilirlik hem locator stratejisi (getByRole) bu yüzden kırılır.',
          en: '`<button>` automatically gets role="button", an accessible name, Tab focusability, and Enter/Space triggering. `<div onclick>` gets NONE of these for free — both accessibility and the locator strategy (getByRole) break because of this.',
        },
        retryQuestion: {
          question: {
            tr: 'BugCard listesinde sıralama okları `<span onclick="sort()">▲</span>` olarak yazılmış. Bir tester bunu incelerken hangi iki sorunu tespit eder?',
            en: 'The sort arrows in the BugCard list are written as `<span onclick="sort()">▲</span>`. When a tester inspects this, which two problems do they identify?',
          },
          options: [
            { id: 'a', text: { tr: 'Renk yanlış ve font küçük', en: 'The color is wrong and the font is too small' } },
            { id: 'b', text: { tr: 'Klavye ile erişilemez (Tab/Enter çalışmaz) VE getByRole(\'button\') ile locate edilemez', en: 'Not reachable by keyboard (Tab/Enter do not work) AND cannot be located with getByRole(\'button\')' } },
            { id: 'c', text: { tr: 'Ok sembolü yanlış Unicode karakter', en: 'The arrow symbol is the wrong Unicode character' } },
            { id: 'd', text: { tr: 'Hiçbir sorun yok, span da tıklanabilir', en: 'No problem, a span can be clickable too' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`<span onclick>` semantik olarak "generic" kalır: klavye kullanıcısı Tab ile oraya gelemez, Enter\'la tetikleyemez; otomasyon tarafında da `getByRole(\'button\')` bu elementi bulmaz çünkü rolü yoktur. Doğru çözüm: gerçek `<button>` kullanmak veya `role="button" tabindex="0"` + keydown handler eklemek.',
            en: 'A `<span onclick>` stays semantically "generic": a keyboard user cannot Tab to it or trigger it with Enter; on the automation side `getByRole(\'button\')` cannot find this element because it has no role. The right fix: use a real `<button>`, or add `role="button" tabindex="0"` plus a keydown handler.',
          },
        },
      },

      // ── B2: Attribute'lar ──
      {
        type: 'heading',
        text: { tr: '🪪 B2. Attribute\'lar: id, class, name, data-*, role, aria-*', en: '🪪 B2. Attributes: id, class, name, data-*, role, aria-*' },
      },
      {
        type: 'simple-box',
        emoji: '🪪',
        content: {
          tr: 'id/class/name/data-*/role/aria-*, bir insanın üzerindeki farklı KİMLİK BELGELERİ gibidir: `id` = T.C. kimlik numarası (benzersiz, resmi), `class` = kıyafet markası (birçok kişide aynı olabilir, sezonluk değişir), `data-*` = özel olarak test ekibine verilmiş bir rozet, `role`/`aria-*` = bu kişinin toplumdaki İŞLEVİNİ tarif eden bir kart. Peki neden bu kadar karışıklık olur? Çünkü hepsi HTML\'de aynı yerde ("attribute" olarak) durur ama AMAÇLARI tamamen farklıdır — birini diğeri yerine kullanmak (class\'ı kimlik gibi kullanmak) yanlış varsayımlara yol açar. Java analojisi: bir nesnenin `hashCode()` (benzersiz anahtar) alanı ile `toString()` (görünüş) alanı arasındaki fark gibi — birini diğeri yerine eşitlik kontrolü için kullanırsan bug çıkar. QA bağlamında: attribute\'un AMACINI bilmeyen tester `class`\'ı `id` gibi kullanır ve stil değişince (deploy) testi sessizce kırılır.',
          en: 'id/class/name/data-*/role/aria-* are like different IDENTITY DOCUMENTS on a person: `id` = a national ID number (unique, official), `class` = a clothing brand (can be the same on many people, changes seasonally), `data-*` = a badge issued specifically to the test team, `role`/`aria-*` = a card describing this person\'s FUNCTION in society. So why does so much confusion happen? Because they all sit in the same place in HTML (as "attributes") but their PURPOSES are completely different — using one in place of another (treating class as an identity) leads to wrong assumptions. Java analogy: like the difference between a nesne\'s `hashCode()` (a unique key) field and its `toString()` (appearance) field — use one instead of the other for an equality check and a bug appears. In QA context: a tester who does not know an attribute\'s PURPOSE uses `class` like an `id`, and the test silently breaks when the style changes (a deploy).',
        },
      },
      attributePurposeSteps,
      pickDurableAttributePlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester `driver.findElement(By.className("Btn_primary__k92a"))` yazıyor çünkü DevTools\'ta ilk gördüğü şey bu class. Bu yaklaşımın kök sorunu nedir?',
          en: 'A tester writes `driver.findElement(By.className("Btn_primary__k92a"))` because that is the first thing they saw in DevTools. What is the root problem with this approach?',
        },
        options: [
          { id: 'a', text: { tr: 'class attribute\'ı stil için vardır, kimlik için değil; CSS Module hash\'i her build\'de değişir', en: 'The class attribute exists for styling, not identity; the CSS Module hash changes on every build' } },
          { id: 'b', text: { tr: 'className() metodu Selenium\'da yoktur', en: 'The className() method does not exist in Selenium' } },
          { id: 'c', text: { tr: 'Hiçbir sorun yok, class her zaman güvenilirdir', en: 'No problem, class is always reliable' } },
          { id: 'd', text: { tr: 'Sorun sadece performans (yavaşlık)', en: 'The only problem is performance (slowness)' } },
        ],
        correct: 'a',
        explanation: {
          tr: 'class attribute\'ının AMACI stildir; CSS Module gibi araçlar her build\'de hash ekler. Bir attribute\'u onun AMACI dışında (kimlik olarak) kullanmak, testin bir sonraki deploy\'da sessizce kırılmasına yol açar.',
          en: 'The PURPOSE of the class attribute is styling; tools like CSS Modules add a hash on every build. Using an attribute outside its PURPOSE (as an identity) causes the test to silently break on the next deploy.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tester `data-testid="submit-bug"` yerine `name="submitBug"` attribute\'unu kullanıyor çünkü ikisi de "sabit" görünüyor. Bu tercih neden riskli olabilir?',
            en: 'A tester uses the `name="submitBug"` attribute instead of `data-testid="submit-bug"` because both look "fixed". Why might this choice be risky?',
          },
          options: [
            { id: 'a', text: { tr: 'Risksizdir, ikisi de aynı derecede güvenlidir', en: 'It is risk-free, both are equally safe' } },
            { id: 'b', text: { tr: '`name` backend\'e giden iş alanı adıdır ve iş mantığı değişince (örn. API alan adı değişince) değişebilir; `data-testid` SADECE test içindir', en: '`name` is the business field name sent to the backend and can change with business logic (e.g. an API field rename); `data-testid` exists SOLELY for tests' } },
            { id: 'c', text: { tr: '`name` attribute\'u tarayıcılarda desteklenmiyor', en: 'The `name` attribute is not supported in browsers' } },
            { id: 'd', text: { tr: 'İkisi de aynı HTML elementinde olamaz', en: 'Both cannot exist on the same HTML element' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`name` iş mantığının bir parçasıdır (form gönderiminde backend\'e gider) ve iş gereksinimleri değişince değişebilir. `data-testid` ise SADECE otomasyon için vardır ve iş mantığından tamamen izoledir — bu yüzden en dayanıklısıdır.',
            en: '`name` is part of business logic (sent to the backend on form submit) and can change with business requirements. `data-testid` exists SOLELY for automation and is fully isolated from business logic — which is why it is the most durable.',
          },
        },
      },

      // ── B3: id vs class vs data-testid ──
      {
        type: 'heading',
        text: { tr: '⚖️ B3. `id` vs `class` vs `data-testid`: Hangisi Ne Kadar Dayanıklı?', en: '⚖️ B3. `id` vs `class` vs `data-testid`: How Durable Is Each?' },
      },
      {
        type: 'simple-box',
        emoji: '⚖️',
        content: {
          tr: 'Bu üç attribute\'u karşılaştırmak, üç farklı NİŞAN/PEKİ türünü karşılaştırmaya benzer: `data-testid` özel olarak dövülmüş bir NİŞAN YÜZÜĞÜdür (sadece bu amaç için var, asla değişmez); stabil `id` bir SÜRÜCÜ BELGESİ numarası gibidir (genelde sabit ama bazen yeniden basılabilir); `class` ise günün MODASI gibidir (yarın tamamen değişebilir). Peki neden hepsini "eşit güvenilir" görme hatasına düşeriz? Çünkü üçü de DevTools\'ta aynı satırda, aynı görünümde durur — hiçbiri "ben kırılganım" yazmaz. Java analojisi: bir nesnenin `equals()` metodunu yazarken hangi alanları kullanacağını seçmek gibi — id/data-testid "business key" (asla değişmeyen), class ise geçici bir "display field"dır. QA bağlamında: bir tester bu hiyerarşiyi bilmezse, "ilk gördüğüm attribute"u seçer ve test bir sonraki tasarım güncellemesinde (redesign) toplu halde kırılır.',
          en: 'Comparing these three attributes is like comparing three different types of RING/BADGE: `data-testid` is a specially forged SIGNET RING (exists solely for this purpose, never changes); a stable `id` is like a DRIVER\'S LICENSE number (usually fixed, but occasionally reissued); `class` is like today\'s FASHION (can change completely tomorrow). Why do we fall into the trap of seeing all three as "equally reliable"? Because all three sit on the same line in DevTools, looking the same — none of them announces "I am fragile". Java analogy: like choosing which fields to use when writing a nesne\'s `equals()` method — id/data-testid are the "business key" (never changing), while class is a temporary "display field". In QA context: a tester who does not know this hierarchy picks "the first attribute I saw" and the test breaks en masse on the next design update (a redesign).',
        },
      },
      attributeDurabilityTable,
      attributeOrderChallenge,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tasarım güncellemesinde (redesign) sadece renkler ve class isimleri değişti; `data-testid` ve `id`\'ler dokunulmadı. Class\'a göre yazılmış 40 test ile data-testid\'ye göre yazılmış 40 test arasında ne olur?',
          en: 'In a redesign, only colors and class names changed; `data-testid`s and `id`s were untouched. What happens between 40 tests written by class vs 40 tests written by data-testid?',
        },
        options: [
          { id: 'a', text: { tr: 'İkisi de aynı şekilde etkilenir', en: 'Both are affected the same way' } },
          { id: 'b', text: { tr: 'Class\'a bağlı 40 test toplu kırılır; data-testid\'ye bağlı 40 test etkilenmez', en: 'The 40 class-based tests break en masse; the 40 data-testid-based tests are unaffected' } },
          { id: 'c', text: { tr: 'İkisi de kırılmaz çünkü redesign sadece görseldir', en: 'Neither breaks because a redesign is only visual' } },
          { id: 'd', text: { tr: 'data-testid\'ye bağlı testler kırılır çünkü data-testid da bir attribute\'tur', en: 'The data-testid-based tests break because data-testid is also an attribute' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Redesign class isimlerini (ve genelde CSS Module hash\'lerini) değiştirir ama `data-testid`\'ye dokunmaz çünkü o iş/tasarım kararlarından İZOLEDİR. Bu yüzden dayanıklılık hiyerarşisinde data-testid en üsttedir.',
          en: 'A redesign changes class names (and usually CSS Module hashes) but does not touch `data-testid` because it is ISOLATED from business/design decisions. This is why data-testid sits at the top of the durability hierarchy.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir sayfada `data-testid` hiç yok ama `id="checkout-submit"` var ve bu id hiçbir zaman dinamik üretilmiyor (sabit). Bu durumda en iyi seçim nedir?',
            en: 'A page has no `data-testid` at all, but there is `id="checkout-submit"` which is never dynamically generated (fixed). What is the best choice here?',
          },
          options: [
            { id: 'a', text: { tr: 'Stabil id\'yi kullan; data-testid yoksa hiyerarşideki bir sonraki en dayanıklı seçenektir', en: 'Use the stable id; when there is no data-testid it is the next most durable option in the hierarchy' } },
            { id: 'b', text: { tr: 'id\'yi asla kullanma, sadece class kullan', en: 'Never use id, only use class' } },
            { id: 'c', text: { tr: 'Test yazma, id yeterli değildir', en: 'Do not write the test, id is not enough' } },
            { id: 'd', text: { tr: 'XPath index kullan, daha güvenlidir', en: 'Use an XPath index, it is safer' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Dayanıklılık hiyerarşisi mutlak değil, GÖRECELİDİR: data-testid yoksa ve id gerçekten sabitse (dinamik üretilmiyorsa), stabil id class\'tan çok daha güvenilirdir. Kural "en iyisini kullan", "sadece tek bir attribute\'a izin ver" değildir.',
            en: 'The durability hierarchy is not absolute, it is RELATIVE: if there is no data-testid and the id is genuinely stable (not dynamically generated), a stable id is far more reliable than class. The rule is "use the best available", not "only ever allow one specific attribute".',
          },
        },
      },

      // ── B4: Form Elementleri ──
      {
        type: 'heading',
        text: { tr: '📝 B4. Form Elementleri: input, select, label İlişkisi (for/id)', en: '📝 B4. Form Elements: the input, select, label Relationship (for/id)' },
      },
      {
        type: 'simple-box',
        emoji: '📝',
        content: {
          tr: 'Bir `<label for="reporter">` ile `<input id="reporter">` arasındaki bağ, bir hastane formundaki YÖNLENDİRME ÇIKARTMASI gibidir: etiket "Bildiren" yazısı, TAM OLARAK hangi kutuya işaret ettiğini `for`/`id` eşleşmesiyle söyler; eşleşme doğruysa hemşire (tarayıcı) etikete dokununca doğru kutuyu (input) odaklar. Peki neden bu eşleşme her zaman doğru gibi görünür ama bazen sessizce bozulur? Çünkü bir refactor sırasında input\'un `id`\'si değişebilir (`reporter` → `reporterEmail`) ve kimse label\'ın `for`\'unu güncellemeyi hatırlamaz — sayfa GÖRSEL olarak birebir aynı kalır. Java analojisi: bir foreign key\'in referans verdiği primary key\'in adı değişirse veritabanı ilişkisi sessizce kopar — hiçbir compile-time hata vermez, sadece runtime\'da JOIN boş döner. QA bağlamında: `getByLabel(\'Bildiren\')` ile bir locator yazmak, bu ilişkiyi CANLI doğrulayan bir test görevi görür — bağlantı kopuksa test de elementi bulamaz ve sorunu hemen ortaya çıkarır.',
          en: 'The bond between a `<label for="reporter">` and an `<input id="reporter">` is like a REFERRAL STICKER on a hospital form: the label\'s "Reporter" text tells you, via the `for`/`id` match, EXACTLY which box it points to; if the match is correct, the nurse (browser) focuses the right box (input) when you touch the label. So why does this match always look right yet sometimes silently break? Because during a refactor the input\'s `id` can change (`reporter` -> `reporterEmail`) and nobody remembers to update the label\'s `for` — the page stays VISUALLY identical. Java analogy: if the primary key a foreign key references gets renamed, the database relationship breaks silently — no compile-time error, the JOIN just returns empty at runtime. In QA context: writing a locator with `getByLabel(\'Reporter\')` acts as a LIVE test verifying this relationship — if the link is broken, the test cannot find the element either, exposing the issue immediately.',
        },
      },
      labelForIdSteps,
      labelForMismatchPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Bir refactor sonrası `<input id="reporter">` → `<input id="reporterEmail">` olarak değişti ama `<label for="reporter">` güncellenmedi. Sayfa görsel olarak aynı görünüyor. Bu durumu EN HIZLI hangi yöntem ortaya çıkarır?',
          en: 'After a refactor, `<input id="reporter">` became `<input id="reporterEmail">` but `<label for="reporter">` was not updated. The page still looks visually identical. Which method exposes this FASTEST?',
        },
        options: [
          { id: 'a', text: { tr: 'Sayfaya gözle bakmak', en: 'Looking at the page visually' } },
          { id: 'b', text: { tr: '`getByLabel(\'Bildiren\')` ile bir locator yazıp çalıştırmak — bağlantı kopuksa element bulunamaz', en: 'Writing and running a locator with `getByLabel(\'Reporter\')` — if the link is broken, the element cannot be found' } },
          { id: 'c', text: { tr: 'Kod review\'da HTML\'i satır satır okumak', en: 'Reading the HTML line by line in a code review' } },
          { id: 'd', text: { tr: 'Hiçbiri, bu tür hatalar tespit edilemez', en: 'None, this type of error cannot be detected' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`getByLabel` label/for ilişkisine dayandığı için, bu ilişki koptuğunda locator elementi BULAMAZ — bu, testin kendisinin canlı bir doğrulama görevi görmesi demektir. Gözle bakmak işe yaramaz çünkü sayfa görsel olarak aynı kalır.',
          en: '`getByLabel` relies on the label/for relationship, so when that relationship breaks, the locator CANNOT find the element — meaning the test itself acts as a live verification. Looking visually does not help because the page stays visually identical.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir formda `<select id="severity">` var ama karşılık gelen `<label>` hiç yazılmamış — sadece placeholder text var. Bu neden hem erişilebilirlik hem locator sorunudur?',
            en: 'A form has a `<select id="severity">` but the corresponding `<label>` was never written — only placeholder text exists. Why is this both an accessibility AND a locator problem?',
          },
          options: [
            { id: 'a', text: { tr: 'Sorun değildir, placeholder yeterlidir', en: 'It is not a problem, placeholder is enough' } },
            { id: 'b', text: { tr: 'placeholder screen reader\'a güvenilir bir isim vermez ve `getByLabel` bu elementi bulamaz; hem erişilebilirlik hem test edilebilirlik kaybolur', en: 'placeholder does not give the screen reader a reliable name, and `getByLabel` cannot find this element; both accessibility and testability are lost' } },
            { id: 'c', text: { tr: 'select elementleri zaten label gerektirmez', en: 'select elements never require a label' } },
            { id: 'd', text: { tr: 'Sadece görsel bir tercih meselesidir', en: 'It is purely a visual preference' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'placeholder bir accessible name KAYNAĞI olarak zayıftır (bazı tarayıcı/screen reader kombinasyonlarında hiç okunmaz) ve select temizlenince (kullanıcı bir seçim yapınca) tamamen kaybolur. Gerçek bir `<label>` hem erişilebilirliği hem `getByLabel` ile locate edilebilirliği garanti eder.',
            en: 'placeholder is a weak source for an accessible name (not read at all in some browser/screen-reader combinations) and disappears entirely once the select has a value. A real `<label>` guarantees both accessibility and locatability via `getByLabel`.',
          },
        },
      },

      // ── B5: Accessibility Tree ──
      {
        type: 'heading',
        text: { tr: '🦯 B5. Accessibility Tree: `getByRole`/`getByLabel`\'ın Altındaki Gerçek Yapı', en: '🦯 B5. The Accessibility Tree: the Real Structure Under `getByRole`/`getByLabel`' },
      },
      {
        type: 'simple-box',
        emoji: '🦯',
        content: {
          tr: 'Accessibility Tree, bir binanın görsel mimarisinin (DOM) yanında duran RÖNTGEN GÖRÜNTÜSÜ gibidir: dışarıdan bakan biri (kullanıcı) binanın rengini/dekorunu görür, röntgeni okuyan biri (screen reader) ise sadece İŞLEVSEL iskeleti (role + isim + durum) görür. Peki `getByRole` neden DOM\'a değil bu röntgene bakar? Çünkü DOM\'da GÖRSEL olarak aynı görünen iki element (gerçek `<button>` ve süslenmiş bir `<div>`), röntgende TAMAMEN farklı görünebilir — biri "buton" der, diğeri "anlamsız kutu" der. Java analojisi: bir arayüzü (interface) implement eden sınıflar farklı görünebilir ama hepsi aynı sözleşmeyi (contract) sağlar — accessibility tree de HTML\'in "hangi sözleşmeyi (rol) sağladığını" gösteren bir sözleşme haritasıdır. QA bağlamında: `getByRole`/`getByLabel` bu röntgene baktığı için class hash\'inden VE DOM yapısından bağımsızdır — developer\'ın erişilebilirliğe önem vermesi otomatik olarak locator kalitesini de yükseltir.',
          en: 'The Accessibility Tree is like an X-RAY sitting alongside a building\'s visual architecture (the DOM): someone looking from outside (the user) sees the color/decor, while someone reading the X-ray (a screen reader) sees only the FUNCTIONAL skeleton (role + name + state). So why does `getByRole` look at this X-ray instead of the DOM? Because two elements that look VISUALLY identical in the DOM (a real `<button>` and a decorated `<div>`) can look COMPLETELY different in the X-ray — one says "button", the other says "meaningless box". Java analogy: classes implementing an interface can look different, but all fulfill the same contract — the accessibility tree is likewise a contract map showing which contract (role) a piece of HTML fulfills. In QA context: because `getByRole`/`getByLabel` look at this X-ray, they are independent of the class hash AND the DOM structure — a developer caring about accessibility automatically raises locator quality too.',
        },
      },
      accessibilityTreeSteps,
      bugCardLocatorExplorer,
      {
        type: 'quiz',
        question: {
          tr: '`getByRole(\'button\', { name: \'Düzenle\' })` yazdın ve bu, Accessibility Tree\'de "isim" alanını arıyor. Bir elementin accessible name\'i sırayla NEREDEN türetilir?',
          en: 'You wrote `getByRole(\'button\', { name: \'Edit\' })`, and this searches for the "name" field in the Accessibility Tree. In what order is an element\'s accessible name derived?',
        },
        options: [
          { id: 'a', text: { tr: 'Sadece class isminden', en: 'Only from the class name' } },
          { id: 'b', text: { tr: '`aria-label` > `aria-labelledby` > element metni > `alt`/`placeholder` sırasıyla', en: 'In order: `aria-label` > `aria-labelledby` > element text > `alt`/`placeholder`' } },
          { id: 'c', text: { tr: 'Rastgele, tarayıcıya göre değişir', en: 'Randomly, it varies by browser' } },
          { id: 'd', text: { tr: 'Sadece `id` attribute\'undan', en: 'Only from the `id` attribute' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Accessible name hesaplama sırası standarttır: önce `aria-label` var mı bakılır, yoksa `aria-labelledby`\'nin işaret ettiği element, o da yoksa elementin kendi metni, son çare `alt`/`placeholder` gibi alanlar kullanılır. Bu sıralamayı bilmek, `getByRole({name:...})` yazarken doğru metni tahmin etmeyi sağlar.',
          en: 'The accessible name computation order is standardized: first check for `aria-label`, then the element `aria-labelledby` points to, then the element\'s own text, and as a last resort fields like `alt`/`placeholder`. Knowing this order lets you correctly predict the text when writing `getByRole({name:...})`.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir butonda hem `aria-label="Bug\'ı sil"` HEM görünür metin "Sil" var. `getByRole(\'button\', {name:\'Sil\'})` çalışır mı?',
            en: 'A button has BOTH `aria-label="Delete bug"` AND visible text "Delete". Does `getByRole(\'button\', {name:\'Delete\'})` work?',
          },
          options: [
            { id: 'a', text: { tr: 'Hayır, accessible name aria-label\'dan ("Bug\'ı sil") gelir, görünür metinden değil — bu yüzden "Sil" ile eşleşmez', en: 'No, the accessible name comes from aria-label ("Delete bug"), not the visible text — so it does not match "Delete"' } },
            { id: 'b', text: { tr: 'Evet, her zaman görünür metin kullanılır', en: 'Yes, the visible text is always used' } },
            { id: 'c', text: { tr: 'İkisi birden birleştirilir: "Sil Bug\'ı sil"', en: 'Both are concatenated: "Delete Delete bug"' } },
            { id: 'd', text: { tr: 'getByRole aria-label\'ı hiç okumaz', en: 'getByRole never reads aria-label' } },
          ],
          correct: 'a',
          explanation: {
            tr: '`aria-label` varsa hiyerarşide en üsttedir ve elementin görünür metnini EZER — accessible name "Bug\'ı sil" olur, "Sil" değil. Bu, `aria-label` eklerken görünür metinle TUTARLI tutmanın (veya ikisinden birini kullanmanın) neden önemli olduğunu gösterir.',
            en: 'If `aria-label` exists it sits at the top of the hierarchy and OVERRIDES the element\'s visible text — the accessible name becomes "Delete bug", not "Delete". This shows why it matters to keep `aria-label` CONSISTENT with the visible text (or just use one of the two).',
          },
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-b',
        promptTr: 'Bir `<div onclick>`\'in neden `getByRole(\'button\')` ile bulunamadığını ve `data-testid`/stabil `id`/`class` arasındaki dayanıklılık farkını, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, why a `<div onclick>` cannot be found with `getByRole(\'button\')`, and the durability difference between `data-testid`/a stable `id`/`class`, to a newcomer.',
        keywords: ['div', 'button', 'role', 'accessibility', 'data-testid', 'class', 'hash', 'dayanikli'],
        modelAnswerTr: 'Bir `<div onclick>` görsel olarak butona benzese de accessibility tree\'de "generic" bir role\'e sahiptir, çünkü sadece gerçek `<button>` elementi otomatik olarak role="button" kazanır. `getByRole(\'button\')` DOM\'a değil bu accessibility tree\'ye bakar, bu yüzden div\'i bulamaz. Dayanıklılık açısından `data-testid` en üsttedir çünkü sadece test için var ve hiçbir şeyden etkilenmez; stabil `id` ikinci sıradadır (dinamik değilse); `class` ise stil için var olduğundan ve build\'de hash değiştirdiğinden en kırılganıdır.',
        modelAnswerEn: 'Even though a `<div onclick>` visually resembles a button, it has a "generic" role in the accessibility tree, because only a real `<button>` element automatically gets role="button". `getByRole(\'button\')` looks at this accessibility tree, not the DOM, so it cannot find the div. In terms of durability, `data-testid` is at the top because it exists solely for testing and is unaffected by anything; a stable `id` is second (if it is not dynamic); `class` is the most fragile because it exists for styling and changes its hash on build.',
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
