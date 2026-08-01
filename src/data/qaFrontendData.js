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

// ─── step-animation: Selector'ın menzili — descendant vs child (GRUP C1) ──────
const selectorRangeSteps = {
  type: 'step-animation',
  id: 'qaf-c1-selector-range-steps',
  title: { tr: 'Adım Adım: `ul li` ile `ul > li` Arasındaki Fark', en: 'Step by Step: The Difference Between `ul li` and `ul > li`' },
  steps: [
    { id: 1, icon: '📮', label: { tr: 'Descendant selector: `ul li`', en: 'Descendant selector: `ul li`' }, detail: { tr: 'Boşluklu yazım "içinde HERHANGİ bir seviyede li olan ul" demektir — arada kaç kat sarmalayıcı olursa olsun eşleşir.', en: 'The space-separated form means "any ul that has an li at ANY depth inside it" — it matches no matter how many wrapper levels are in between.' } },
    { id: 2, icon: '⚠️', label: { tr: 'Fazla geniş olabilir', en: 'It can be too wide' }, detail: { tr: 'BugCard\'ın içinde iç içe bir alt liste (yorumlar gibi) varsa, `ul li` o alt listedeki `li`\'leri de YANLIŞLIKLA eşleştirebilir.', en: 'If there is a nested sub-list inside a BugCard (like comments), `ul li` can MISTAKENLY match the `li`s in that sub-list too.' } },
    { id: 3, icon: '🎯', label: { tr: 'Child selector: `ul > li`', en: 'Child selector: `ul > li`' }, detail: { tr: '"`ul`\'nin DOĞRUDAN çocuğu olan li" demektir — sadece bir seviye altındaki eşleşir, iç içe alt listeler dahil olmaz.', en: 'Means "the li that is a DIRECT child of ul" — only one level down matches, nested sub-lists are excluded.' } },
    { id: 4, icon: '✅', label: { tr: 'Daha dar, daha güvenli', en: 'Narrower, safer' }, detail: { tr: 'BugCard listesi gibi tek seviyeli yapılarda `>` kullanmak, yanlışlıkla iç içe elemanları yakalama riskini ortadan kaldırır.', en: 'In single-level structures like a BugCard list, using `>` removes the risk of accidentally catching nested elements.' } },
    { id: 5, icon: '🔗', label: { tr: 'Playwright/Cypress\'e neredeyse birebir geçer', en: 'Carries over almost verbatim to Playwright/Cypress' }, detail: { tr: 'CSS selector mantığını okuyabilen tester, `page.locator(\'ul > li\')` gibi otomasyon syntax\'ını da doğrudan okuyabilir — syntax derinliği için /playwright, /cypress\'e bak.', en: 'A tester who can read CSS selector logic can directly read automation syntax like `page.locator(\'ul > li\')` too — for syntax depth see /playwright, /cypress.' } },
  ],
}

// ─── table: CSS specificity puanları (GRUP C2) ────────────────────────────────
const specificityTable = {
  type: 'table',
  headers: [
    { tr: 'Selector türü', en: 'Selector type' },
    { tr: 'Örnek', en: 'Example' },
    { tr: 'Specificity puanı', en: 'Specificity score' },
    { tr: 'Developer neden değiştirir?', en: 'Why does a developer change it?' },
  ],
  rows: [
    [{ tr: 'Element', en: 'Element' }, 'button', '1', { tr: 'Nadiren — çok geneldir', en: 'Rarely — too generic' }],
    [{ tr: 'Class', en: 'Class' }, '.btn-primary', '10', { tr: 'Sık — yeni tasarım/varyant eklenince', en: 'Often — when a new design/variant is added' }],
    ['ID', '#submit-btn', '100', { tr: 'Nadiren ama refactor\'da olur', en: 'Rarely, but happens during a refactor' }],
    [{ tr: 'Inline style', en: 'Inline style' }, 'style="color:red"', '1000', { tr: 'Çok nadir, genelde geçici debug', en: 'Very rare, usually temporary debugging' }],
  ],
}

// ─── video-scene: "Class Hash'i Neden Değişir" (GRUP C3, zorunlu film) ────────
const classHashChangeFilm = {
  type: 'video-scene',
  id: 'qaf-class-hash-change-film',
  title: {
    tr: '🎬 Class Hash\'i Neden Değişir? `btn` → `Btn_btn__x7f2a` Yolculuğu',
    en: '🎬 Why Does a Class Hash Change? The `btn` -> `Btn_btn__x7f2a` Journey',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'source',  emoji: '📄', label: { tr: 'BugCard.module.css',  en: 'BugCard.module.css' },  color: '#0ea5e9' },
    { id: 'loader',  emoji: '⚙️', label: { tr: 'CSS Modules loader',  en: 'CSS Modules loader' },  color: '#f59e0b' },
    { id: 'hash',    emoji: '🎲', label: { tr: 'Hash üretici',        en: 'Hash generator' },        color: '#8b5cf6' },
    { id: 'bundle',  emoji: '📦', label: { tr: 'Build çıktısı',       en: 'Build output' },          color: '#6366f1' },
    { id: 'dom',     emoji: '🌳', label: { tr: 'Tarayıcıda DOM',      en: 'DOM in the browser' },   color: '#22c55e' },
    { id: 'test',    emoji: '🧪', label: { tr: 'Dünkü test',          en: 'Yesterday\'s test' },     color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Developer kaynak dosyada sadece `.btn { ... }` yazdı — masum, sade bir isim. Ama tarayıcıda `class="Btn_btn__x7f2a"` görüyorsun. Bu filmde o rastgele ekin (suffix) NEREDEN geldiğini ve neden HER BUILD\'DE değiştiğini izleyeceksin.',
        en: 'The developer wrote just `.btn { ... }` in the source — an innocent, plain name. But in the browser you see `class="Btn_btn__x7f2a"`. In this film you will watch WHERE that random suffix comes from and why it changes on EVERY BUILD.',
      },
      code: { tr: `.btn { background: blue; }`, en: `.btn { background: blue; }` },
      positions: { source: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Build başlar: `npm run build` çalıştığında CSS Modules loader (webpack/vite eklentisi) `.module.css` uzantılı her dosyayı ELE ALIR ve class isimlerini "scope"lamaya karar verir.',
        en: 'Step 1 — The build starts: when `npm run build` runs, the CSS Modules loader (a webpack/vite plugin) PROCESSES every `.module.css` file and decides to "scope" the class names.',
      },
      code: { tr: `npm run build çalışıyor...`, en: `npm run build is running...` },
      positions: {
        source: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        loader: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'source', to: 'loader', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Hash üretilir: loader, dosya yolu + class ismini bir algoritmadan geçirip KISA BİR İMZA (`x7f2a`) üretir. Amaç: farklı dosyalardaki AYNI isimli class\'ların (`.btn`) birbirine ÇAKIŞMASINI önlemek.',
        en: 'Step 2 — The hash is generated: the loader runs the file path + class name through an algorithm to produce a SHORT SIGNATURE (`x7f2a`). Purpose: prevent SAME-named classes (`.btn`) in different files from COLLIDING with each other.',
      },
      code: { tr: `hash(BugCard.module.css + ".btn") → "x7f2a"`, en: `hash(BugCard.module.css + ".btn") -> "x7f2a"` },
      positions: {
        loader: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        hash: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'loader', to: 'hash', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Build çıktısına yazılır: nihai CSS ve JS dosyalarında `.btn` artık `.Btn_btn__x7f2a` olarak durur; React kodundaki `styles.btn` bu YENİ ismi otomatik taşır.',
        en: 'Step 3 — Written to the build output: in the final CSS and JS files, `.btn` now reads `.Btn_btn__x7f2a`; the `styles.btn` in the React code automatically carries this NEW name.',
      },
      code: { tr: `.Btn_btn__x7f2a { background: blue; }`, en: `.Btn_btn__x7f2a { background: blue; }` },
      positions: {
        hash: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        bundle: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'hash', to: 'bundle', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Tarayıcıda DOM kurulur: kullanıcı sayfayı açtığında bu hash\'li class DOM\'a yazılır. Görsel sonuç DEĞİŞMEDİ (buton hâlâ mavi) ama HTML\'deki class ismi artık farklı.',
        en: 'Step 4 — The DOM is built in the browser: when the user opens the page, this hashed class is written into the DOM. The visual result has NOT changed (the button is still blue), but the class name in the HTML is now different.',
      },
      code: { tr: `<button class="Btn_btn__x7f2a">`, en: `<button class="Btn_btn__x7f2a">` },
      positions: {
        bundle: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        dom: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'bundle', to: 'dom', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — Bir sonraki deploy\'da hash YENİDEN üretilir (`x7f2a` → `z9k1p` gibi) çünkü hash genelde dosya İÇERİĞİNE veya build sırasına bağlıdır. Dünkü `.Btn_btn__x7f2a`\'ya bağlanan test artık 0 element bulur. Developer\'dan ne iste? "Bu butona sabit bir `data-testid` ekler misin? CSS Module hash\'i her build\'de değişiyor ve testimi kırıyor."',
        en: 'Final — On the next deploy the hash is REGENERATED (e.g. `x7f2a` -> `z9k1p`) because the hash usually depends on file CONTENT or build order. Yesterday\'s test bound to `.Btn_btn__x7f2a` now finds 0 elements. What to ask the developer? "Could you add a fixed `data-testid` to this button? The CSS Module hash changes on every build and it breaks my test."',
      },
      code: { tr: `.Btn_btn__z9k1p ← YENİ hash, eski test 0 element bulur`, en: `.Btn_btn__z9k1p <- NEW hash, the old test finds 0 elements` },
      positions: {
        dom: { x: 20, y: 32, scale: 0.95 },
        test: { x: 58, y: 58, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'dom', to: 'test', color: '#ef4444' }],
    },
  ],
}

// ─── table: Utility CSS (Tailwind) neden locate için işe yaramaz (GRUP C4) ────
const utilityClassTable = {
  type: 'table',
  headers: [
    { tr: 'Gördüğün class', en: 'Class you see' },
    { tr: 'Ne anlama gelir?', en: 'What does it mean?' },
    { tr: 'Locator için sorun', en: 'Problem for a locator' },
  ],
  rows: [
    ['px-3', { tr: 'Yatay padding 0.75rem', en: 'Horizontal padding 0.75rem' }, { tr: 'Onlarca elementte AYNI class — hangi elementi kastettiğin belirsiz', en: 'The SAME class on dozens of elements — which element you mean is ambiguous' }],
    ['bg-blue-500', { tr: 'Arka plan rengi mavi', en: 'Background color blue' }, { tr: 'Tasarım sistemi renk değiştirirse (blue-500 → indigo-500) her yerde kırılır', en: 'If the design system changes color (blue-500 -> indigo-500) it breaks everywhere' }],
    ['flex items-center', { tr: 'Flexbox düzeni', en: 'Flexbox layout' }, { tr: 'Düzen değişse de anlamı değişmez — hiçbir zaman kimlik taşımaz', en: 'Even if layout changes, its meaning does not — it never carries identity' }],
  ],
}

// ─── code-playground: Tailwind class'lı butonda doğru locator (GRUP C4) ───────
const tailwindLocatorPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-c4-utility-css',
  id: 'qaf-c4-tailwind-locator',
  title: { tr: 'Kendin Dene: Tailwind Class\'lı Butonu Doğru Locate Et', en: 'Try It Yourself: Correctly Locate a Tailwind-Classed Button' },
  starterCode: {
    tr: `// DevTools'ta gördüğün buton:
// <button class="px-3 py-2 bg-blue-500 rounded text-white" data-testid="new-bug-btn">
//   Yeni Bug
// </button>
// TODO: Tailwind class'larından BİRİNE değil, doğru attribute'a göre locate et.
await page.locator('.bg-blue-500').click();`,
    en: `// The button you see in DevTools:
// <button class="px-3 py-2 bg-blue-500 rounded text-white" data-testid="new-bug-btn">
//   New Bug
// </button>
// TODO: locate by the correct attribute, not one of the Tailwind classes.
await page.locator('.bg-blue-500').click();`,
  },
  solutionCode: {
    tr: `// Tailwind class'ları tasarım sistemi paylaşımlıdır, kimlik taşımaz
await page.getByTestId('new-bug-btn').click();`,
    en: `// Tailwind classes are shared by the design system, they carry no identity
await page.getByTestId('new-bug-btn').click();`,
  },
  hint: {
    tr: '`bg-blue-500` gibi utility class\'lar sayfadaki BAŞKA birçok elementte de kullanılabilir ve tasarım sistemi rengi değiştirdiğinde tüm sitede aynı anda değişir. Bu, "birden çok eleman eşleşti" ve "renk değişince kırıldı" risklerinin ikisini de taşır.',
    en: 'Utility classes like `bg-blue-500` can be used on many OTHER elements on the page too, and change site-wide the moment the design system changes color. This carries both the "multiple elements matched" and "broke when the color changed" risks.',
  },
  successMessage: {
    tr: 'Doğru! Utility CSS class\'ları tasarımı paylaşımlı olarak tarif eder, kimlik taşımaz — bir elementi tekil olarak işaretlemek için her zaman data-testid gibi özel bir kanca gerekir.',
    en: 'Correct! Utility CSS classes describe design in a shared way and carry no identity — uniquely marking one element always requires a dedicated hook like data-testid.',
  },
}

// ─── step-animation: pseudo-element/state DOM'da locate edilemez (GRUP C6) ───
const pseudoStateSteps = {
  type: 'step-animation',
  id: 'qaf-c6-pseudo-state-steps',
  title: { tr: 'Adım Adım: `:hover` ve `::before` Neden DOM\'da Bir Node Değildir', en: 'Step by Step: Why `:hover` and `::before` Are Not DOM Nodes' },
  steps: [
    { id: 1, icon: '🖱️', label: { tr: '`:hover` bir DURUMDUR, element değil', en: '`:hover` is a STATE, not an element' }, detail: { tr: 'CSS `.btn:hover { background: darkblue; }` yazınca, tarayıcı yeni bir DOM node OLUŞTURMAZ — sadece fare üzerindeyken stili değiştirir.', en: 'When you write CSS `.btn:hover { background: darkblue; }`, the browser does NOT create a new DOM node — it just changes the style while the mouse is over it.' } },
    { id: 2, icon: '🚫', label: { tr: 'Locator ona doğrudan ulaşamaz', en: 'A locator cannot reach it directly' }, detail: { tr: '`page.locator(\':hover\')` diye bir şey yazamazsın çünkü `:hover` locate edilecek bir eleman değil, elementin ANLIK durumudur.', en: 'You cannot write something like `page.locator(\':hover\')` because `:hover` is not an element to locate, it is the element\'s MOMENTARY state.' } },
    { id: 3, icon: '🎭', label: { tr: '`::before`/`::after` de gerçek node değildir', en: '`::before`/`::after` are not real nodes either' }, detail: { tr: 'Bunlar CSS ile "sahte" içerik ekler (ikon, süsleme); DOM ağacında GÖRÜNMEZLER, sadece Render Tree\'de görsel olarak var olurlar.', en: 'These add "fake" content with CSS (an icon, decoration); they are NOT visible in the DOM tree, they only visually exist in the Render Tree.' } },
    { id: 4, icon: '✅', label: { tr: 'Doğru refleks: durumu TETİKLE, sonucu doğrula', en: 'The right reflex: TRIGGER the state, verify the result' }, detail: { tr: 'Hover\'ı test etmek için elementi `hover()` ile TETİKLERSİN, sonra gerçek bir DOM elementinin (örn. bir tooltip `<div>`) görünür olduğunu doğrularsın.', en: 'To test a hover you TRIGGER it with `hover()`, then verify that a real DOM element (e.g. a tooltip `<div>`) has become visible.' } },
    { id: 5, icon: '💡', label: { tr: 'Örnek: BugCard üzerine gelince tooltip', en: 'Example: hovering a BugCard shows a tooltip' }, detail: { tr: 'BugCard\'a hover yapınca CSS `::after` ile bir ok görünür AMA test aslında ayrı bir `<div class="tooltip">` elementinin `visible` olduğunu bekler — oku DEĞİL.', en: 'Hovering a BugCard shows an arrow via CSS `::after`, BUT the test actually waits for a separate `<div class="tooltip">` element to become `visible` — not the arrow itself.' } },
  ],
}

// ─── step-animation: createElement → appendChild (GRUP D1) ────────────────────
const createAppendSteps = {
  type: 'step-animation',
  id: 'qaf-d1-create-append-steps',
  title: { tr: 'Adım Adım: `createElement` ile `appendChild` Arasındaki Boşluk', en: 'Step by Step: The Gap Between `createElement` and `appendChild`' },
  steps: [
    { id: 1, icon: '🧱', label: { tr: '`document.createElement(\'li\')`', en: '`document.createElement(\'li\')`' }, detail: { tr: 'Bellekte YENİ bir node oluşturulur ama bu node HİÇBİR YERE bağlı değildir — DOM ağacının bir parçası değildir.', en: 'A NEW node is created in memory, but this node is NOT attached anywhere — it is not part of the DOM tree.' } },
    { id: 2, icon: '🔍', label: { tr: 'Bu anda locate etmeye çalışsan…', en: 'If you tried to locate it at this moment...' }, detail: { tr: '`document.querySelector(\'li\')` bu yeni node\'u ASLA bulamaz — o sadece bir JS DEĞİŞKENİNDE durur, ağaçta değil.', en: '`document.querySelector(\'li\')` can NEVER find this new node — it only sits in a JS VARIABLE, not in the tree.' } },
    { id: 3, icon: '🔗', label: { tr: '`parent.appendChild(newLi)`', en: '`parent.appendChild(newLi)`' }, detail: { tr: 'Node artık GERÇEKTEN DOM ağacına eklenir — bu satır çalışana kadar node "var ama görünmez" durumdaydı.', en: 'The node is now REALLY added to the DOM tree — until this line ran, the node "existed but was invisible".' } },
    { id: 4, icon: '✅', label: { tr: 'Artık locate edilebilir', en: 'Now it can be located' }, detail: { tr: '`appendChild` çalıştıktan SONRA `querySelector`/Playwright locator bu elementi bulabilir.', en: 'AFTER `appendChild` runs, a `querySelector`/Playwright locator can find this element.' } },
    { id: 5, icon: '⚠️', label: { tr: '`innerHTML` farklı bir risk taşır', en: '`innerHTML` carries a different risk' }, detail: { tr: '`innerHTML = htmlString` mevcut alt ağacı TAMAMEN yok edip yeniden kurar — eski event listener\'lar ve locator referansları SESSİZCE geçersiz olur.', en: '`innerHTML = htmlString` COMPLETELY destroys and rebuilds the existing subtree — old event listeners and locator references become SILENTLY invalid.' } },
  ],
}

// ─── step-animation: event listener kaydı ve "hiçbir şey olmuyor" bug'ı (GRUP D2) ─
const eventListenerSteps = {
  type: 'step-animation',
  id: 'qaf-d2-event-listener-steps',
  title: { tr: 'Adım Adım: "Butona Tıkladım Ama Hiçbir Şey Olmadı" Bug\'ının Kaynağı', en: 'Step by Step: The Root of "I Clicked the Button but Nothing Happened"' },
  steps: [
    { id: 1, icon: '🔘', label: { tr: 'Buton DOM\'a eklenir', en: 'The button is added to the DOM' }, detail: { tr: '`<button id="submit-bug">` sayfaya render edilir — GÖRSEL olarak tıklanabilir görünür.', en: '`<button id="submit-bug">` is rendered onto the page — it VISUALLY looks clickable.' } },
    { id: 2, icon: '⏳', label: { tr: 'Ama listener henüz kayıtlı değil', en: 'But the listener is not registered yet' }, detail: { tr: 'JS bundle\'ı hâlâ indiriliyor/çalışıyor olabilir; `button.addEventListener(\'click\', submitHandler)` satırı henüz ÇALIŞMADI.', en: 'The JS bundle may still be downloading/executing; the `button.addEventListener(\'click\', submitHandler)` line has NOT run yet.' } },
    { id: 3, icon: '🖱️', label: { tr: 'Kullanıcı (veya test) tıklar', en: 'The user (or test) clicks' }, detail: { tr: 'Tıklama olayı tarayıcı tarafından ÜRETİLİR ama onu dinleyen (kayıtlı) hiçbir handler yoktur — olay SESSİZCE kaybolur.', en: 'The click event IS FIRED by the browser, but there is no handler LISTENING for it — the event is SILENTLY lost.' } },
    { id: 4, icon: '🚨', label: { tr: 'Sonuç: görsel var, davranış yok', en: 'Result: visual exists, behavior does not' }, detail: { tr: 'Buton görsel olarak orada, tıklanabilir gibi duruyor ama HİÇBİR ŞEY olmuyor — klasik "tıkladım ama çalışmadı" bug raporu.', en: 'The button visually exists, looks clickable, but NOTHING happens — the classic "I clicked it but it did not work" bug report.' } },
    { id: 5, icon: '✅', label: { tr: 'Tester\'ın teşhis refleksi', en: 'The tester\'s diagnostic reflex' }, detail: { tr: '"Element render oldu mu?" ile "listener kayıtlı mı (hydration bitti mi)?" sorularını AYIRT ETMEK — bu GRUP E4 (hydration) ile doğrudan bağlantılıdır.', en: 'DISTINGUISHING "did the element render?" from "is the listener registered (did hydration finish)?" — this connects directly to GROUP E4 (hydration).' } },
  ],
}

// ─── video-scene: Fetch ile locate arasındaki yarış (GRUP D3) ─────────────────
const fetchRaceFilm = {
  type: 'video-scene',
  id: 'qaf-fetch-race-film',
  title: {
    tr: '🎬 Fetch Bitmeden Locate Etmek: Bir Yarış Hikayesi',
    en: '🎬 Locating Before the Fetch Finishes: A Race Story',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test',    emoji: '🧪', label: { tr: 'Test kodu',           en: 'Test code' },          color: '#0ea5e9' },
    { id: 'fetch',   emoji: '📡', label: { tr: 'fetch(\'/api/v1/bugs\')', en: 'fetch(\'/api/v1/bugs\')' }, color: '#f59e0b' },
    { id: 'network', emoji: '🌐', label: { tr: 'Ağ gecikmesi',        en: 'Network latency' },     color: '#8b5cf6' },
    { id: 'dom',     emoji: '🌳', label: { tr: 'DOM (hâlâ boş liste)', en: 'DOM (still empty list)' }, color: '#6b7280' },
    { id: 'render',  emoji: '📋', label: { tr: 'DOM (3 BugCard doldu)', en: 'DOM (3 BugCards filled)' }, color: '#22c55e' },
    { id: 'crash',   emoji: '💥', label: { tr: 'NoSuchElement',        en: 'NoSuchElement' },       color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Sayfa açılır açılmaz test HEMEN bir BugCard\'ı locate etmeye çalışıyor. Ama JS\'in verisi nereden geliyor ve ne kadar sürüyor? Bu filmde test kodu ile ağ isteği arasındaki YARIŞI izleyeceksin.',
        en: 'The moment the page opens, the test IMMEDIATELY tries to locate a BugCard. But where does the JS data come from and how long does it take? In this film you will watch the RACE between the test code and the network request.',
      },
      code: { tr: `test: sayfa açıldı, hemen locate ediyorum`, en: `test: page opened, locating right away` },
      positions: { test: { x: 50, y: 40, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — İki şey AYNI ANDA başlar: sayfa render olurken JS de `fetch(\'/api/v1/bugs\')` çağrısını tetikler. DOM şu an BOŞ bir `<ul>` içerir çünkü veri henüz gelmedi.',
        en: 'Step 1 — Two things start AT THE SAME TIME: while the page renders, JS also triggers a `fetch(\'/api/v1/bugs\')` call. The DOM currently contains an EMPTY `<ul>` because the data has not arrived yet.',
      },
      code: { tr: `<ul id="bug-list"></ul>  ← şu an boş`, en: `<ul id="bug-list"></ul>  <- empty right now` },
      positions: {
        test: { x: 16, y: 30, scale: 0.95 },
        fetch: { x: 50, y: 55, scale: 1.15, pulse: true },
        dom: { x: 84, y: 55, scale: 1.1 },
      },
      beams: [{ from: 'fetch', to: 'dom', color: '#6b7280' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Ağ gecikmesi devam ederken test ZATEN locate etmeyi deniyor: `page.locator(\'li\').first()` çalıştırılır ama `<ul>` hâlâ boş olduğu için EŞLEŞEN eleman YOKTUR.',
        en: 'Step 2 — While the network latency continues, the test is ALREADY trying to locate: `page.locator(\'li\').first()` runs, but since `<ul>` is still empty there is NO MATCHING element.',
      },
      code: { tr: `page.locator('li').first() → 0 eleman`, en: `page.locator('li').first() -> 0 elements` },
      positions: {
        test: { x: 22, y: 30, scale: 1.05, pulse: true },
        network: { x: 55, y: 55, scale: 1.2 },
        dom: { x: 84, y: 55, opacity: 0.6, scale: 0.95 },
      },
      beams: [{ from: 'test', to: 'network', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Eğer test burada `waitFor` KULLANMADAN doğrudan `.click()` çağırırsa: "0 eleman bulundu, tıklanacak bir şey yok" hatasıyla ÇÖKER — NoSuchElement.',
        en: 'Step 3 — If the test calls `.click()` directly here WITHOUT using `waitFor`: it CRASHES with "0 elements found, nothing to click" — NoSuchElement.',
      },
      code: { tr: `NoSuchElementException: 0 elements matched 'li'`, en: `NoSuchElementException: 0 elements matched 'li'` },
      positions: {
        test: { x: 24, y: 30, opacity: 0.6, scale: 0.9 },
        crash: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'test', to: 'crash', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Ağ isteği tamamlanır: sunucu JSON döner, JS her bug için bir `<li>` oluşturup `<ul>`\'ye ekler. DOM artık 3 BugCard içerir — ama bu, test\'in ilk denemesinden BİR SÜRE SONRA gerçekleşti.',
        en: 'Step 4 — The network request completes: the server returns JSON, JS creates a `<li>` for each bug and appends it to the `<ul>`. The DOM now contains 3 BugCards — but this happened SOME TIME AFTER the test\'s first attempt.',
      },
      code: { tr: `<ul><li>...</li><li>...</li><li>...</li></ul>`, en: `<ul><li>...</li><li>...</li><li>...</li></ul>` },
      positions: {
        network: { x: 20, y: 40, opacity: 0.6, scale: 0.9 },
        render: { x: 56, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'network', to: 'render', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Final — Doğru refleks: test `waitFor`/auto-waiting assertion (`toBeVisible`, `toHaveCount`) ile ağ isteğinin BİTMESİNİ bekler, sabit bir `sleep` ile TAHMİN etmez. Playwright gibi modern araçlar bu bekleyişi birçok komutta OTOMATİK yapar — ama bunun NEDEN gerektiğini bilmek, "neden bazen bekleme eklemem gerekiyor" sorusuna cevap verir.',
        en: 'Final — The right reflex: the test waits for the network request to FINISH using `waitFor`/an auto-waiting assertion (`toBeVisible`, `toHaveCount`), it does not GUESS with a fixed `sleep`. Modern tools like Playwright do this waiting AUTOMATICALLY for many commands — but knowing WHY this is needed answers the question "why do I sometimes need to add a wait".',
      },
      code: { tr: `await expect(page.locator('li')).toHaveCount(3);`, en: `await expect(page.locator('li')).toHaveCount(3);` },
      positions: {
        render: { x: 30, y: 45, scale: 1.15, pulse: true },
        crash: { x: 66, y: 60, scale: 0.85, opacity: 0.4 },
      },
    },
  ],
}

// ─── code-playground: "Load more" ile geç eklenen elementi bekleme (GRUP D4) ──
const lazyAppendWaitPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-d4-mutation-wait',
  id: 'qaf-d4-lazy-append-wait',
  title: { tr: 'Kendin Dene: Geç Eklenen Bir Elementi Doğru Bekle', en: 'Try It Yourself: Correctly Wait for a Late-Appended Element' },
  starterCode: {
    tr: `// "Daha Fazla Yükle" butonuna basınca JS 500ms sonra 5 yeni BugCard ekliyor
// (sunucudan ikinci bir sayfa veri çeker). TODO: sabit sleep yerine doğru bekle.
await page.click('[data-testid="load-more"]');
await page.waitForTimeout(500);
await page.locator('li').nth(10).click();`,
    en: `// Clicking "Load More" makes JS append 5 new BugCards 500ms later
// (it fetches a second page of data from the server). TODO: wait correctly instead of a fixed sleep.
await page.click('[data-testid="load-more"]');
await page.waitForTimeout(500);
await page.locator('li').nth(10).click();`,
  },
  solutionCode: {
    tr: `// MutationObserver tabanlı auto-waiting: sayı 15'e çıkana kadar otomatik yeniden dener
await page.click('[data-testid="load-more"]');
await expect(page.locator('li')).toHaveCount(15);
await page.locator('li').nth(10).click();`,
    en: `// MutationObserver-based auto-waiting: auto-retries until the count reaches 15
await page.click('[data-testid="load-more"]');
await expect(page.locator('li')).toHaveCount(15);
await page.locator('li').nth(10).click();`,
  },
  hint: {
    tr: '500ms bir TAHMİNDİR — sunucu yavaşsa yetmez, hızlıysa gereksiz bekletir. Modern test araçları arka planda bir `MutationObserver` benzeri mekanizmayla DOM\'u dinler; `toHaveCount` gibi assertion\'lar bu mekanizmayı kullanarak KOŞULUN gerçekleştiğini garanti eder.',
    en: '500ms is a GUESS — it is not enough if the server is slow, and wastes time if it is fast. Modern test tools listen to the DOM in the background with a `MutationObserver`-like mechanism; assertions like `toHaveCount` use this mechanism to guarantee the CONDITION has actually occurred.',
  },
  successMessage: {
    tr: 'Doğru! Bir mutation\'ın (yeni element eklenmesi) NE ZAMAN biteceğini tahmin etmek yerine, DOM\'u dinleyen bir koşulu (assertion) beklemek her zaman daha güvenilirdir.',
    en: 'Correct! Instead of guessing WHEN a mutation (a new element appearing) will finish, waiting for a condition (an assertion) that listens to the DOM is always more reliable.',
  },
}

// ─── step-animation: data-* attribute'unu JS'in kendisi de okur (GRUP D5) ─────
const dataAttrEventDelegationSteps = {
  type: 'step-animation',
  id: 'qaf-d5-data-attr-steps',
  title: { tr: 'Adım Adım: JS `data-*`\'ı Sadece Testler İçin mi Okur?', en: 'Step by Step: Does JS Read `data-*` Only for Tests?' },
  steps: [
    { id: 1, icon: '🎯', label: { tr: 'Tek bir listener, çok satır', en: 'One listener, many rows' }, detail: { tr: 'Developer her BugCard\'a AYRI bir click listener eklemek yerine, TEK bir listener\'ı `<ul>`\'ye ekler — buna "event delegation" denir.', en: 'Instead of adding a SEPARATE click listener to every BugCard, the developer adds ONE listener to the `<ul>` — this is called "event delegation".' } },
    { id: 2, icon: '🖱️', label: { tr: 'Bir karta tıklanır', en: 'A card is clicked' }, detail: { tr: 'Tıklama olayı `<ul>`\'ye kadar "yükselir" (bubbling); listener bu olayı yakalar ama HANGİ kartın tıklandığını bilmesi gerekir.', en: 'The click event "bubbles" up to the `<ul>`; the listener catches it but needs to know WHICH card was clicked.' } },
    { id: 3, icon: '🏷️', label: { tr: '`event.target.closest(\'li\').dataset.bugId`', en: '`event.target.closest(\'li\').dataset.bugId`' }, detail: { tr: 'JS, tıklanan elementin en yakın `<li>` atasını bulur ve onun `data-bug-id` attribute\'unu OKUYARAK hangi bug\'a tıklandığını anlar.', en: 'JS finds the nearest `<li>` ancestor of the clicked element and READS its `data-bug-id` attribute to understand which bug was clicked.' } },
    { id: 4, icon: '⚙️', label: { tr: 'Bu, uygulamanın KENDİ mantığıdır', en: 'This is the APP\'s OWN logic' }, detail: { tr: '`data-bug-id` burada sadece test için değil, UYGULAMANIN GERÇEK ÇALIŞMASI için vardır — silinirse uygulama bozulur, sadece testler değil.', en: '`data-bug-id` here exists not just for tests, but for the APP\'S ACTUAL FUNCTIONING — if removed, the app breaks, not just the tests.' } },
    { id: 5, icon: '💎', label: { tr: 'Tester için bonus: EN dayanıklı kanca', en: 'Bonus for the tester: the MOST durable hook' }, detail: { tr: 'Uygulama mantığının bel bağladığı bir `data-*` attribute\'u, sadece `data-testid` gibi test-özel bir attribute\'tan bile daha az silinme riski taşır — developer onu kaldırırsa kendi uygulaması da bozulur.', en: 'A `data-*` attribute the app logic relies on carries even LESS risk of removal than a test-only attribute like `data-testid` — if the developer removes it, their own app breaks too.' } },
  ],
}

// ─── step-animation: İstek yaşam döngüsü ve Network paneli (GRUP E1) ──────────
const networkRequestLifecycleSteps = {
  type: 'step-animation',
  id: 'qaf-e1-network-lifecycle-steps',
  title: { tr: 'Adım Adım: Bir Tıklama Network Panelinde Nasıl Görünür?', en: 'Step by Step: How a Click Appears in the Network Panel' },
  steps: [
    { id: 1, icon: '🖱️', label: { tr: 'Kullanıcı "New Bug" gönderir', en: 'The user submits "New Bug"' }, detail: { tr: 'JS, form verisini toplayıp `fetch(\'/api/v1/bugs\', {method:\'POST\', body:...})` çağrısını tetikler.', en: 'JS gathers the form data and triggers a `fetch(\'/api/v1/bugs\', {method:\'POST\', body:...})` call.' } },
    { id: 2, icon: '📡', label: { tr: 'İstek Network paneline düşer', en: 'The request lands in the Network panel' }, detail: { tr: 'DevTools → Network\'te YENİ bir satır belirir: `POST /api/v1/bugs`, durumu "pending" (bekliyor).', en: 'A NEW row appears in DevTools -> Network: `POST /api/v1/bugs`, its status "pending".' } },
    { id: 3, icon: '⏳', label: { tr: 'Sunucu işler', en: 'The server processes it' }, detail: { tr: 'Bu satır "pending" kaldığı sürece sunucu HENÜZ cevap vermedi — bu, GRUP D3\'teki yarışın Network panelindeki karşılığıdır.', en: 'As long as this row stays "pending", the server has NOT responded yet — this is the Network-panel counterpart of the race from GROUP D3.' } },
    { id: 4, icon: '✅', label: { tr: 'Status kodu ve response gelir', en: 'The status code and response arrive' }, detail: { tr: 'Satır "200" (veya 4xx/5xx) ile GÜNCELLENİR ve response sekmesinde JSON gövde görünür hale gelir.', en: 'The row UPDATES to "200" (or 4xx/5xx) and the JSON body becomes visible in the response tab.' } },
    { id: 5, icon: '🔗', label: { tr: 'Tester için köprü: `/api-testing`', en: 'Bridge for the tester: `/api-testing`' }, detail: { tr: 'Bu satırdaki method/status/gövde, `/api-testing` sayfasında öğrendiğin sözleşmenin frontend tarafından GÖRÜNÜŞÜDÜR — bug\'ın frontend\'de mi backend\'de mi olduğunu Network panelinden ayırt edersin.', en: 'The method/status/body in this row is the frontend-side VIEW of the contract you learned on the `/api-testing` page — you tell whether a bug is in the frontend or the backend by reading the Network panel.' } },
  ],
}

// ─── video-scene: "Veri Gelince DOM Doluyor" (GRUP E2, zorunlu film — orijinal prompt §4) ─
const dataFillsDomFilm = {
  type: 'video-scene',
  id: 'qaf-data-fills-dom-film',
  title: {
    tr: '🎬 Veri Gelince DOM Doluyor: fetch → JSON → State → Re-render',
    en: '🎬 The DOM Fills In When Data Arrives: fetch -> JSON -> State -> Re-render',
  },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'fetch',   emoji: '📡', label: { tr: 'fetch(\'/api/v1/bugs\')', en: 'fetch(\'/api/v1/bugs\')' }, color: '#0ea5e9' },
    { id: 'json',    emoji: '📦', label: { tr: 'JSON response',        en: 'JSON response' },        color: '#f59e0b' },
    { id: 'state',   emoji: '🧠', label: { tr: 'State (bugs = [...])', en: 'State (bugs = [...])' }, color: '#8b5cf6' },
    { id: 'render',  emoji: '🔁', label: { tr: 'Re-render',            en: 'Re-render' },             color: '#6366f1' },
    { id: 'dom',     emoji: '📋', label: { tr: 'DOM (3 BugCard)',      en: 'DOM (3 BugCards)' },      color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir BugCard listesinin ekranda BELİRMESİ, tek bir olay değil dört aşamalı bir ZİNCİRDİR: istek → veri → state → yeniden çizim. Bu zinciri bilmek, "neden bu element ANINDA yok, sonradan geliyor" sorusuna netlik kazandırır.',
        en: 'A BugCard list APPEARING on screen is not a single event but a four-stage CHAIN: request -> data -> state -> redraw. Knowing this chain brings clarity to "why is this element not there instantly, it arrives later".',
      },
      code: { tr: `<ul id="bug-list"></ul>  ← başlangıçta boş`, en: `<ul id="bug-list"></ul>  <- empty at the start` },
      positions: { fetch: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — `fetch` isteği yola çıkar: component mount olduğunda (React) veya sayfa yüklendiğinde (saf JS) `fetch(\'/api/v1/bugs\')` tetiklenir. Bu an DOM\'da HENÜZ hiçbir değişiklik yoktur.',
        en: 'Step 1 — The `fetch` request sets off: when the component mounts (React) or the page loads (plain JS), `fetch(\'/api/v1/bugs\')` fires. At this moment there is NO change in the DOM yet.',
      },
      code: { tr: `fetch('/api/v1/bugs') gönderildi...`, en: `fetch('/api/v1/bugs') sent...` },
      positions: {
        fetch: { x: 24, y: 50, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 2 — JSON response gelir: sunucu 3 bug\'lık bir dizi döner. Bu, HAM veridir — henüz uygulamanın hafızasında (state) veya ekranda değildir.',
        en: 'Step 2 — the JSON response arrives: the server returns an array of 3 bugs. This is RAW data — it is not yet in the app\'s memory (state) or on screen.',
      },
      code: { tr: `[{id:1,title:"Login..."}, {id:2,...}, {id:3,...}]`, en: `[{id:1,title:"Login..."}, {id:2,...}, {id:3,...}]` },
      positions: {
        fetch: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        json: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'fetch', to: 'json', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Veri STATE\'e yazılır: `setBugs(data)` (React) veya bir değişkene atama (saf JS) ile ham JSON, uygulamanın "hafızasına" kaydedilir. DOM hâlâ eski (boş) haldedir — state değişti ama ekran henüz GÜNCELLENMEDİ.',
        en: 'Step 3 — the data is written to STATE: with `setBugs(data)` (React) or an assignment to a variable (plain JS), the raw JSON is stored in the app\'s "memory". The DOM is still in its old (empty) state — state changed but the screen has NOT been UPDATED yet.',
      },
      code: { tr: `state.bugs = [...3 bug...]  (DOM henüz eski)`, en: `state.bugs = [...3 bugs...]  (DOM still old)` },
      positions: {
        json: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        state: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'json', to: 'state', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Re-render tetiklenir: state değiştiği için framework (React) veya elle yazılmış kod (saf JS) DOM\'u YENİDEN ÇİZMEYE karar verir. Bu, GRUP F/G\'de göreceğin "state değişince yeniden render" mekanizmasının TAM burasıdır.',
        en: 'Step 4 — a re-render is triggered: because state changed, the framework (React) or hand-written code (plain JS) decides to REDRAW the DOM. This is EXACTLY the "state changes, re-render happens" mechanism you will see in GROUP F/G.',
      },
      code: { tr: `re-render tetiklendi...`, en: `re-render triggered...` },
      positions: {
        state: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        render: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'state', to: 'render', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Final — DOM 3 BugCard ile dolar: ancak BU adımdan sonra `<li>` elemanları gerçekten DOM\'a girer ve locate edilebilir hale gelir. Zincirin HERHANGİ bir adımı (fetch, JSON, state, render) henüz bitmemişse, DOM hâlâ eski/boş haldedir — testin "ne zaman bekleyeceğini" bilmesi bu zincirin tamamını anlamasına bağlıdır.',
        en: 'Final — the DOM fills with 3 BugCards: only AFTER this step do the `<li>` elements really enter the DOM and become locatable. If ANY step of the chain (fetch, JSON, state, render) has not finished yet, the DOM is still old/empty — the test knowing "when to wait" depends on understanding this entire chain.',
      },
      code: { tr: `<ul><li>Bug 1</li><li>Bug 2</li><li>Bug 3</li></ul>`, en: `<ul><li>Bug 1</li><li>Bug 2</li><li>Bug 3</li></ul>` },
      positions: {
        render: { x: 22, y: 30, scale: 0.95 },
        dom: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'render', to: 'dom', color: '#22c55e' }],
    },
  ],
}

// ─── table: CSR/SSR/SSG → locate zamanlaması (GRUP E3) ────────────────────────
const renderTypeLocateTimingTable = {
  type: 'table',
  headers: [
    { tr: 'Render türü', en: 'Render type' },
    { tr: 'HTML nerede oluşur?', en: 'Where is the HTML built?' },
    { tr: 'İlk yüklemede BugCard\'lar hemen DOM\'da mı?', en: 'Are BugCards in the DOM immediately on first load?' },
    { tr: 'Locate zamanlaması', en: 'Locate timing' },
  ],
  rows: [
    ['CSR', { tr: 'Tarayıcıda (JS çalışınca)', en: 'In the browser (once JS runs)' }, { tr: '❌ Hayır, JS fetch bitene kadar boş', en: '❌ No, empty until the JS fetch finishes' }, { tr: 'fetch + re-render bitene kadar bekle', en: 'Wait until fetch + re-render finish' }],
    ['SSR', { tr: 'Sunucuda (istek anında)', en: 'On the server (at request time)' }, { tr: '✅ Evet, ilk HTML\'de hazır gelir', en: '✅ Yes, ready in the first HTML' }, { tr: 'HTML hazır ama JS bağlanana (hydration) kadar tıklama çalışmaz', en: 'HTML is ready but clicks do not work until JS attaches (hydration)' }],
    ['SSG', { tr: 'Build zamanında (önceden)', en: 'At build time (in advance)' }, { tr: '✅ Evet, statik dosyada hazır', en: '✅ Yes, ready in the static file' }, { tr: 'SSR ile aynı hydration bekleme kuralı geçerlidir', en: 'The same hydration wait rule as SSR applies' }],
  ],
}

// ─── step-animation: Hydration "sinsi bug" simülasyonu (GRUP E4) ──────────────
const hydrationSneakyBugSteps = {
  type: 'step-animation',
  id: 'qaf-e4-hydration-sneaky-bug-steps',
  title: { tr: 'Adım Adım: SSR\'da "Buton Var Ama Çalışmıyor" Sinsi Bug\'ı', en: 'Step by Step: the SSR "Button Exists But Does Not Work" Sneaky Bug' },
  steps: [
    { id: 1, icon: '📄', label: { tr: 'Sunucu HTML\'i hazır gönderir', en: 'The server sends the HTML ready' }, detail: { tr: 'SSR sayesinde tarayıcı ilk yanıtta TAM bir "New Bug" butonu görür — sayfa GÖRSEL olarak tamamlanmış gibi durur.', en: 'Thanks to SSR, the browser sees a COMPLETE "New Bug" button in the first response — the page LOOKS visually finished.' } },
    { id: 2, icon: '⏳', label: { tr: 'Ama JS henüz İNDİRİLİYOR', en: 'But JS is still DOWNLOADING' }, detail: { tr: 'React/Angular JS bundle\'ı ayrı bir dosyadır ve HENÜZ tarayıcıya inmedi/çalışmadı — bu sırada sayfa "donmuş bir fotoğraf" gibidir.', en: 'The React/Angular JS bundle is a separate file and has NOT downloaded/run in the browser yet — during this time the page is like a "frozen photograph".' } },
    { id: 3, icon: '🖱️', label: { tr: 'Kullanıcı (veya test) HEMEN tıklar', en: 'The user (or test) clicks IMMEDIATELY' }, detail: { tr: 'Buton görsel olarak orada ama JS henüz "hydrate" olmadığı (event listener\'lar bağlanmadığı) için TIKLAMA HİÇBİR ŞEY yapmaz.', en: 'The button visually exists, but since JS has not "hydrated" yet (event listeners are not attached), the CLICK DOES NOTHING.' } },
    { id: 4, icon: '💧', label: { tr: 'Hydration tamamlanır', en: 'Hydration completes' }, detail: { tr: 'JS bundle çalışır, React/Angular mevcut HTML\'e "bağlanır" (hydrate), event listener\'lar ARTIK aktiftir.', en: 'The JS bundle runs, React/Angular "attaches" (hydrates) to the existing HTML, and event listeners are NOW active.' } },
    { id: 5, icon: '✅', label: { tr: 'Şimdi tıklama çalışır', en: 'Now the click works' }, detail: { tr: 'Hydration\'dan SONRA yapılan bir tıklama beklenen davranışı tetikler — testerın refleksi: sadece "element visible" değil, "hydration tamamlandı" işaretini beklemek.', en: 'A click made AFTER hydration triggers the expected behavior — the tester\'s reflex: wait not just for "element visible" but for a signal that "hydration has completed".' } },
  ],
}

// ─── code-playground: Hydration bitmeden tıklamayı önleme (GRUP E4) ───────────
const waitForHydrationPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-e4-hydration',
  id: 'qaf-e4-wait-for-hydration',
  title: { tr: 'Kendin Dene: Hydration Bitmeden Tıklamayı Önle', en: 'Try It Yourself: Prevent Clicking Before Hydration Finishes' },
  starterCode: {
    tr: `// SSR sayfası: "New Bug" butonu ilk HTML'de hazır geliyor ama JS
// bundle'ı indirilip hydrate olana kadar tıklama çalışmıyor.
// TODO: sadece görünürlüğü değil, tıklanabilir olmayı da garanti et.
await page.locator('[data-testid="new-bug-btn"]').click();`,
    en: `// SSR page: the "New Bug" button is ready in the first HTML, but clicks
// do not work until the JS bundle downloads and hydrates.
// TODO: guarantee not just visibility, but clickability too.
await page.locator('[data-testid="new-bug-btn"]').click();`,
  },
  solutionCode: {
    tr: `// Modern test araçları tıklamadan önce elementin "actionable" (tıklanabilir)
// olmasını otomatik bekler — bu genelde hydration'ın bitmesini de kapsar.
// Ekstra güvence gerekiyorsa developer'dan bir "hydrated" işareti iste:
await page.waitForSelector('[data-hydrated="true"]');
await page.locator('[data-testid="new-bug-btn"]').click();`,
    en: `// Modern test tools auto-wait for an element to be "actionable" (clickable)
// before clicking -- this usually covers hydration finishing too.
// If extra assurance is needed, ask the developer for a "hydrated" marker:
await page.waitForSelector('[data-hydrated="true"]');
await page.locator('[data-testid="new-bug-btn"]').click();`,
  },
  hint: {
    tr: 'Buton `visible` olsa bile, hydration bitmeden click HİÇBİR ŞEY yapmaz çünkü event listener henüz bağlı değildir. Bazı framework\'ler `visible` + `actionable` kontrolünü otomatik yapar, ama karmaşık SSR sayfalarında developer\'dan açık bir "hydration bitti" işareti (`data-hydrated="true"`) istemek en net çözümdür.',
    en: 'Even if the button is `visible`, a click does NOTHING before hydration finishes because the event listener is not attached yet. Some frameworks auto-check `visible` + `actionable`, but on complex SSR pages asking the developer for an explicit "hydration finished" marker (`data-hydrated="true"`) is the clearest fix.',
  },
  successMessage: {
    tr: 'Doğru! "Görünür" ile "tıklanabilir/işlevsel" farklı şeylerdir — SSR + hydration senaryosunda bu ayrımı bilmemek, sessizce başarısız olan tıklamalara yol açar.',
    en: 'Correct! "Visible" and "clickable/functional" are different things — not knowing this distinction in an SSR + hydration scenario leads to clicks that silently fail.',
  },
}

// ─── table: Loading/Error/Empty — developer'ın 3 durumu vs tester'ın 3 testi (GRUP E5) ─
const loadingErrorEmptyTable = {
  type: 'table',
  headers: [
    { tr: 'Durum', en: 'State' },
    { tr: 'Developer\'ın kodladığı', en: 'What the developer codes' },
    { tr: 'Tester\'ın test etmesi gereken', en: 'What the tester must test' },
  ],
  rows: [
    [{ tr: 'Loading', en: 'Loading' }, { tr: 'fetch beklenirken bir spinner/skeleton gösterilir', en: 'A spinner/skeleton is shown while the fetch is pending' }, { tr: 'Spinner\'ın gerçekten görünüp gerçekten kaybolduğunu doğrula (sonsuz dönmediğini)', en: 'Verify the spinner truly appears and truly disappears (does not spin forever)' }],
    [{ tr: 'Error', en: 'Error' }, { tr: 'İstek 4xx/5xx dönerse bir hata mesajı gösterilir', en: 'An error message is shown if the request returns 4xx/5xx' }, { tr: 'Sunucu hatası simüle edilip doğru hata mesajının (ve tekrar deneme butonunun) çıktığını doğrula', en: 'Simulate a server error and verify the correct error message (and a retry button) appears' }],
    [{ tr: 'Empty', en: 'Empty' }, { tr: 'Liste boşsa "Henüz bug yok" gibi bir mesaj gösterilir', en: 'An "No bugs yet" message is shown if the list is empty' }, { tr: 'Filtreleme sonucu 0 kayıt döndüğünde boş-durum mesajının (boş bir tablo değil) göründüğünü doğrula', en: 'When filtering returns 0 results, verify the empty-state message appears (not just a blank table)' }],
  ],
}

// ─── video-scene: "Component Bir Fonksiyondur" (GRUP F1, zorunlu film) ────────
const componentIsFunctionFilm = {
  type: 'video-scene',
  id: 'qaf-component-is-function-film',
  title: {
    tr: '🎬 Component Bir Fonksiyondur: Prop İçeri Akar, JSX Dışarı Çıkar',
    en: '🎬 A Component Is a Function: a Prop Flows In, JSX Flows Out',
  },
  xpReward: 14,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'react',  emoji: '⚛️', label: { tr: 'React motoru',        en: 'React engine' },       color: '#0ea5e9' },
    { id: 'func',   emoji: '📜', label: { tr: 'function BugCard(props)', en: 'function BugCard(props)' }, color: '#f59e0b' },
    { id: 'props',  emoji: '📦', label: { tr: 'props = { bug }',      en: 'props = { bug }' },     color: '#8b5cf6' },
    { id: 'jsx',    emoji: '📝', label: { tr: 'JSX (bir "tarif")',    en: 'JSX (a "recipe")' },   color: '#6366f1' },
    { id: 'dom',    emoji: '🌳', label: { tr: 'Gerçek DOM',           en: 'Real DOM' },           color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir React component\'i, ilk bakışta gizemli görünse de aslında SADE bir JavaScript fonksiyonudur. Bu filmde `BugCard` component\'inin React tarafından NASIL çağrıldığını, prop\'un içeri NASIL aktığını ve dönen JSX\'in gerçek DOM\'a NASIL dönüştüğünü izleyeceksin.',
        en: 'A React component may look mysterious at first, but it is really a PLAIN JavaScript function. In this film you will watch HOW the `BugCard` component gets called by React, HOW the prop flows in, and HOW the returned JSX turns into real DOM.',
      },
      code: { tr: `function BugCard({ bug }) { return <li>...</li> }`, en: `function BugCard({ bug }) { return <li>...</li> }` },
      positions: { func: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — React motoru `BugCard`\'ı ÇAĞIRIR: tıpkı Java\'da bir metodu çağırmak gibi, `BugCard(props)` çalıştırılır. Prop (`{ bug: {...} }`) fonksiyona bir PARAMETRE gibi akar.',
        en: 'Step 1 — the React engine CALLS `BugCard`: just like calling a method in Java, `BugCard(props)` runs. The prop (`{ bug: {...} }`) flows into the function like a PARAMETER.',
      },
      code: { tr: `BugCard({ bug: {id:42, title:"..."} }) çağrılıyor`, en: `BugCard({ bug: {id:42, title:"..."} }) is being called` },
      positions: {
        react: { x: 18, y: 50, scale: 1.05 },
        func: { x: 52, y: 50, scale: 1.15, pulse: true },
      },
      beams: [{ from: 'react', to: 'func', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Prop içeri akar ve fonksiyon GÖVDESİ çalışır: `bug.status`, `bug.title` gibi alanlar okunur, gerekiyorsa bir koşul (`{isOpen && ...}`) değerlendirilir — bu ana kadar hiçbir DOM değişikliği YOKTUR, sadece JS çalışıyor.',
        en: 'Step 2 — the prop flows in and the function BODY runs: fields like `bug.status`, `bug.title` are read, a condition (`{isOpen && ...}`) is evaluated if needed — up to this point there is NO DOM change yet, only JS is running.',
      },
      code: { tr: `bug.title → "Login butonu 500 donuyor"`, en: `bug.title -> "Login button freezes on 500"` },
      positions: {
        func: { x: 20, y: 50, opacity: 0.7, scale: 0.95 },
        props: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'func', to: 'props', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Fonksiyon bir JSX DÖNER: bu JSX gerçek DOM DEĞİLDİR — sadece "böyle bir yapı istiyorum" diyen bir TARİFTİR (aslında arka planda `React.createElement(...)` çağrılarından oluşan sade bir JS nesnesidir).',
        en: 'Step 3 — the function RETURNS JSX: this JSX is NOT real DOM — it is only a RECIPE saying "I want a structure like this" (in fact, behind the scenes, it is a plain JS object made of `React.createElement(...)` calls).',
      },
      code: { tr: `return <li className={...}>{bug.title}</li>`, en: `return <li className={...}>{bug.title}</li>` },
      positions: {
        props: { x: 20, y: 50, opacity: 0.6, scale: 0.9 },
        jsx: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'props', to: 'jsx', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Final — React bu TARİFİ gerçek DOM\'a dönüştürür: React, döndürülen JSX\'i önceki halle karşılaştırır (reconciliation) ve GERÇEK DOM node\'larını oluşturur/günceller. İşte locator\'ın gerçekte hedeflediği yer BURASIDIR — JSX değil, bu adımın SONUCU.',
        en: 'Final — React turns this RECIPE into real DOM: React compares the returned JSX against the previous state (reconciliation) and creates/updates the REAL DOM nodes. THIS is where a locator actually targets — not the JSX, but the RESULT of this step.',
      },
      code: { tr: `<li class="BugCard_card__x7f2a">Login butonu 500 donuyor</li>`, en: `<li class="BugCard_card__x7f2a">Login button freezes on 500</li>` },
      positions: {
        jsx: { x: 22, y: 32, scale: 0.95 },
        dom: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'jsx', to: 'dom', color: '#22c55e' }],
    },
  ],
}

// ─── step-animation: JSX ifadelerinin DOM'a çevrilmesi (GRUP F2) ──────────────
const jsxToDomSteps = {
  type: 'step-animation',
  id: 'qaf-f2-jsx-to-dom-steps',
  title: { tr: 'Adım Adım: JSX İfadeleri Gerçek DOM\'a Nasıl Çevrilir', en: 'Step by Step: How JSX Expressions Translate to Real DOM' },
  steps: [
    { id: 1, icon: '🏷️', label: { tr: '`className={styles.card}`', en: '`className={styles.card}`' }, detail: { tr: 'React\'te `class` yerine `className` yazılır; DOM\'da HTML\'in gerçek `class` attribute\'una çevrilir — isim değişir ama işlev aynıdır.', en: 'In React you write `className` instead of `class`; it translates to the DOM\'s real `class` attribute — the name changes but the function stays the same.' } },
    { id: 2, icon: '🔤', label: { tr: '`{bug.title}`', en: '`{bug.title}`' }, detail: { tr: 'Süslü parantez içindeki bir JS ifadesi DEĞERLENDİRİLİR ve sonucu DOM\'a bir TEXT NODE olarak yazılır.', en: 'A JS expression inside curly braces is EVALUATED and its result is written to the DOM as a TEXT NODE.' } },
    { id: 3, icon: '🔀', label: { tr: '`{isOpen && <Modal/>}` TRUE ise', en: '`{isOpen && <Modal/>}` when TRUE' }, detail: { tr: 'İfade `<Modal/>` JSX\'ine değerlendirilir ve Modal GERÇEKTEN DOM\'a render edilir.', en: 'The expression evaluates to the `<Modal/>` JSX and the Modal is REALLY rendered into the DOM.' } },
    { id: 4, icon: '🚫', label: { tr: '`{isOpen && <Modal/>}` FALSE ise', en: '`{isOpen && <Modal/>}` when FALSE' }, detail: { tr: 'İfade `false` değerine eşitlenir; React `false`/`null`/`undefined` için HİÇBİR ŞEY render etmez — Modal DOM\'a hiç GİRMEZ.', en: 'The expression evaluates to `false`; React renders NOTHING for `false`/`null`/`undefined` — the Modal NEVER ENTERS the DOM.' } },
    { id: 5, icon: '✅', label: { tr: 'Sonuç: JSX\'i okuyabilen tester DOM\'u tahmin eder', en: 'Result: a tester who can read JSX predicts the DOM' }, detail: { tr: 'Bu 4 kalıbı (className, {ifade}, {koşul&&}, liste) tanıyan tester, kaynağa bakıp DOM\'un NE ZAMAN ne içereceğini zihninde canlandırır.', en: 'A tester who recognizes these 4 patterns (className, {expression}, {condition&&}, a list) can look at the source and picture WHEN the DOM will contain what.' } },
  ],
}

// ─── table: Props vs State (GRUP F3) ───────────────────────────────────────────
const propsVsStateTable = {
  type: 'table',
  headers: [
    { tr: 'Özellik', en: 'Property' },
    { tr: 'Props', en: 'Props' },
    { tr: 'State', en: 'State' },
  ],
  rows: [
    [{ tr: 'Nereden gelir?', en: 'Where does it come from?' }, { tr: 'Üst component\'ten (yukarıdan aşağı akar)', en: 'From the parent component (flows top-down)' }, { tr: 'Component\'in KENDİ hafızası (useState gibi)', en: 'The component\'s OWN memory (like useState)' }],
    [{ tr: 'Kim değiştirebilir?', en: 'Who can change it?' }, { tr: 'SADECE üst component (component kendi prop\'unu değiştiremez)', en: 'ONLY the parent component (a component cannot change its own prop)' }, { tr: 'Component\'in kendisi (`setIsOpen(true)` gibi)', en: 'The component itself (like `setIsOpen(true)`)' }],
    [{ tr: 'Java analojisi', en: 'Java analogy' }, { tr: 'Metot parametresi', en: 'A method parameter' }, { tr: 'Instance field (nesnenin kendi alanı)', en: 'An instance field (the object\'s own field)' }],
    [{ tr: 'Örnek (BugCard)', en: 'Example (BugCard)' }, { tr: '`bug` (hangi bug gösterilecek — dışarıdan verilir)', en: '`bug` (which bug to show — given from outside)' }, { tr: '`isExpanded` (kart açık mı — kartın kendi kararı)', en: '`isExpanded` (is the card expanded — the card\'s own decision)' }],
  ],
}

// ─── code (Kaynak→DOM→Locator, Modal conditional render — GRUP F4) ────────────
const modalConditionalCode = {
  type: 'code',
  language: 'jsx',
  code: {
    tr: `// SÜTUN 1 — Developer'ın yazdığı kaynak (BugBoard.jsx)
function BugBoard() {
  const [isOpen, setIsOpen] = useState(false)   // state = component'in kendi hafızası
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Yeni Bug</button>
      {isOpen && <NewBugModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

// SÜTUN 2 — isOpen=false iken GERÇEK DOM
// <button>Yeni Bug</button>
//   ← <NewBugModal> DOM'da HİÇ YOK, aramak NoSuchElement verir

// isOpen=true iken GERÇEK DOM
// <button>Yeni Bug</button>
// <div data-testid="new-bug-modal">...</div>`,
    en: `// COLUMN 1 — The source the developer wrote (BugBoard.jsx)
function BugBoard() {
  const [isOpen, setIsOpen] = useState(false)   // state = the component's own memory
  return (
    <>
      <button onClick={() => setIsOpen(true)}>New Bug</button>
      {isOpen && <NewBugModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

// COLUMN 2 — The REAL DOM while isOpen=false
// <button>New Bug</button>
//   <- <NewBugModal> DOES NOT EXIST in the DOM at all, searching for it gives NoSuchElement

// The REAL DOM while isOpen=true
// <button>New Bug</button>
// <div data-testid="new-bug-modal">...</div>`,
  },
}

// ─── code (Kaynak→DOM→Locator, StatusBadge list render — GRUP F5) ─────────────
const statusBadgeListCode = {
  type: 'code',
  language: 'jsx',
  code: {
    tr: `// SÜTUN 1 — Developer'ın yazdığı kaynak (BugList.jsx)
{bugs.map(bug => (
  <li key={bug.id}>                          // key = React'in iç takip numarası
    <StatusBadge status={bug.status} />       // her satırda AYRI bir prop
  </li>
))}

// SÜTUN 2 — Tarayıcıda oluşan GERÇEK DOM (3 bug için)
// <li><span class="Badge_open__k3n9">OPEN</span></li>
// <li><span class="Badge_closed__p2m4">CLOSED</span></li>
// <li><span class="Badge_open__k3n9">OPEN</span></li>
//   ← key SADECE React'in iç defterindedir, DOM'da attribute olarak GÖRÜNMEZ`,
    en: `// COLUMN 1 — The source the developer wrote (BugList.jsx)
{bugs.map(bug => (
  <li key={bug.id}>                          // key = React's internal tracking number
    <StatusBadge status={bug.status} />       // a SEPARATE prop on every row
  </li>
))}

// COLUMN 2 — The REAL DOM produced in the browser (for 3 bugs)
// <li><span class="Badge_open__k3n9">OPEN</span></li>
// <li><span class="Badge_closed__p2m4">CLOSED</span></li>
// <li><span class="Badge_open__k3n9">OPEN</span></li>
//   <- key exists ONLY in React's internal ledger, it is NOT VISIBLE as a DOM attribute`,
  },
}

// ─── code (Kaynak→DOM→Locator, Toast + data-testid ekleme örneği — GRUP F6) ───
const toastDataTestIdCode = {
  type: 'code',
  language: 'jsx',
  code: {
    tr: `// SÜTUN 1a — ÖNCESİ: Toast component'inde data-testid YOK
function Toast({ message }) {
  return <div className={styles.toast}>{message}</div>
}
// DOM: <div class="Toast_toast__q7r2">Bug başarıyla oluşturuldu</div>
//   ← locate edilecek stabil bir kanca YOK, sadece hash'li class var

// SÜTUN 1b — SONRASI: developer'dan istenen TEK satır eklendi
function Toast({ message }) {
  return <div className={styles.toast} data-testid="toast">{message}</div>
}
// SÜTUN 2 — SONRASI GERÇEK DOM
// <div class="Toast_toast__q7r2" data-testid="toast">Bug başarıyla oluşturuldu</div>`,
    en: `// COLUMN 1a — BEFORE: the Toast component has NO data-testid
function Toast({ message }) {
  return <div className={styles.toast}>{message}</div>
}
// DOM: <div class="Toast_toast__q7r2">Bug created successfully</div>
//   <- there is NO stable hook to locate, only a hashed class

// COLUMN 1b — AFTER: the ONE line asked of the developer was added
function Toast({ message }) {
  return <div className={styles.toast} data-testid="toast">{message}</div>
}
// COLUMN 2 — REAL DOM AFTER the change
// <div class="Toast_toast__q7r2" data-testid="toast">Bug created successfully</div>`,
  },
}

// ─── code-playground: Toast'a data-testid eklemeyi simüle et (GRUP F6) ────────
const addTestIdToToastPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-f6-data-testid-react',
  id: 'qaf-f6-add-testid-toast',
  title: { tr: 'Kendin Dene: Toast Component\'ine `data-testid` Ekle', en: 'Try It Yourself: Add `data-testid` to the Toast Component' },
  starterCode: {
    tr: `// Toast component'inde henüz data-testid yok, sadece hash'li class var.
// TODO: JSX satırına data-testid="toast" ekle.
function Toast({ message }) {
  return <div className={styles.toast}>{message}</div>
}`,
    en: `// The Toast component has no data-testid yet, only a hashed class.
// TODO: add data-testid="toast" to the JSX line.
function Toast({ message }) {
  return <div className={styles.toast}>{message}</div>
}`,
  },
  solutionCode: {
    tr: `function Toast({ message }) {
  return <div className={styles.toast} data-testid="toast">{message}</div>
}`,
    en: `function Toast({ message }) {
  return <div className={styles.toast} data-testid="toast">{message}</div>
}`,
  },
  hint: {
    tr: 'JSX\'te bir attribute eklemek HTML\'dekiyle aynı sözdizimidir — `className` yanına, ondan bağımsız olarak `data-testid="toast"` yazman yeterli. React `data-*` attribute\'larını olduğu gibi DOM\'a geçirir.',
    en: 'Adding an attribute in JSX has the same syntax as in HTML — just write `data-testid="toast"` alongside `className`, independent of it. React passes `data-*` attributes straight through to the DOM.',
  },
  successMessage: {
    tr: 'Doğru! Tek bir satırlık bu değişiklik, Toast\'ı build\'den bağımsız, kalıcı olarak locate edilebilir hale getirir — developer\'dan istemesi gereken tam olarak budur.',
    en: 'Correct! This one-line change makes the Toast permanently locatable, independent of the build — this is exactly what should be asked of the developer.',
  },
}

// ─── step-animation: .ts + .html birleşip DOM olur (GRUP G1) ──────────────────
const tsHtmlMergeSteps = {
  type: 'step-animation',
  id: 'qaf-g1-ts-html-merge-steps',
  title: { tr: 'Adım Adım: `.ts` ve `.html` Nasıl Tek Bir DOM\'a Birleşir', en: 'Step by Step: How `.ts` and `.html` Merge into a Single DOM' },
  steps: [
    { id: 1, icon: '☕', label: { tr: '`bug-card.component.ts`', en: '`bug-card.component.ts`' }, detail: { tr: '`@Input() bug` (React\'in prop\'una karşılık gelir) ve mantık (metotlar, değişkenler) burada tanımlanır — SAF davranış kodu.', en: '`@Input() bug` (the counterpart of React\'s prop) and logic (methods, variables) are defined here — PURE behavior code.' } },
    { id: 2, icon: '📄', label: { tr: '`bug-card.component.html`', en: '`bug-card.component.html`' }, detail: { tr: 'GÖRSEL yapı ayrı bir dosyadadır: `{{bug.title}}`, `*ngIf` gibi template ifadeleri burada yazılır — React\'teki JSX\'in AYRI dosyaya bölünmüş hali.', en: 'The VISUAL structure is in a separate file: template expressions like `{{bug.title}}`, `*ngIf` are written here — like React\'s JSX split into a SEPARATE file.' } },
    { id: 3, icon: '🔗', label: { tr: 'Angular ikisini BAĞLAR', en: 'Angular BINDS the two' }, detail: { tr: 'Component sınıfı (`.ts`) ile template (`.html`) `@Component({templateUrl:...})` dekoratörüyle birbirine bağlanır — ikisi BİRLİKTE tek bir component tanımlar.', en: 'The component class (`.ts`) and the template (`.html`) are linked via the `@Component({templateUrl:...})` decorator — the two TOGETHER define a single component.' } },
    { id: 4, icon: '🌳', label: { tr: 'Gerçek DOM üretilir', en: 'The real DOM is produced' }, detail: { tr: 'Angular, `.ts`\'teki veriyi `.html`\'teki template ifadeleriyle birleştirip GERÇEK DOM node\'larını oluşturur.', en: 'Angular combines the data from `.ts` with the template expressions from `.html` to produce the REAL DOM nodes.' } },
    { id: 5, icon: '🔍', label: { tr: 'Tester\'ın refleksi: İKİ dosyaya da bak', en: 'The tester\'s reflex: check BOTH files' }, detail: { tr: 'React\'te tek bir JSX dosyası yeterliyken, Angular\'da bir bug\'ın kaynağını ararken hem `.ts`\'i (mantık) hem `.html`\'i (görünüm) İNCELEMEN gerekir.', en: 'While a single JSX file is enough in React, when tracking down a bug\'s source in Angular you must EXAMINE both `.ts` (logic) and `.html` (view).' } },
  ],
}

// ─── step-animation: Angular template syntax → DOM çevirisi (GRUP G2) ─────────
const angularTemplateSyntaxSteps = {
  type: 'step-animation',
  id: 'qaf-g2-template-syntax-steps',
  title: { tr: 'Adım Adım: Angular Template Syntax\'ı DOM\'a Nasıl Çevrilir', en: 'Step by Step: How Angular Template Syntax Translates to the DOM' },
  steps: [
    { id: 1, icon: '🔤', label: { tr: '`{{ bug.title }}`', en: '`{{ bug.title }}`' }, detail: { tr: 'Çift süslü parantez ("interpolation") bir değeri OKUR ve metne çevirip DOM\'a text node olarak yazar — React\'teki `{bug.title}` ile AYNI iştir.', en: 'Double curly braces ("interpolation") READ a value, turn it into text, and write it to the DOM as a text node — the SAME job as React\'s `{bug.title}`.' } },
    { id: 2, icon: '⚙️', label: { tr: '`[class.open]="isOpen"`', en: '`[class.open]="isOpen"`' }, detail: { tr: 'Köşeli parantez ("property binding") bir DOM özelliğini (burada bir class\'ı) bir JS ifadesine BAĞLAR — `isOpen` true olduğunda `open` class\'ı eklenir.', en: 'Square brackets ("property binding") BIND a DOM property (here a class) to a JS expression — when `isOpen` is true the `open` class is added.' } },
    { id: 3, icon: '🖱️', label: { tr: '`(click)="onEdit()"`', en: '`(click)="onEdit()"`' }, detail: { tr: 'Parantez ("event binding") bir DOM olayını bir METODA bağlar — React\'teki `onClick={onEdit}` ile AYNI mantık, farklı sözdizimi.', en: 'Parentheses ("event binding") bind a DOM event to a METHOD — the SAME logic as React\'s `onClick={onEdit}`, different syntax.' } },
    { id: 4, icon: '🔀', label: { tr: '`*ngIf="isOpen"`', en: '`*ngIf="isOpen"`' }, detail: { tr: 'Yıldızlı direktif, elementi koşula göre DOM\'a EKLER veya DOM\'DAN TAMAMEN ÇIKARIR — React\'in `{isOpen && <X/>}` kalıbının Angular karşılığı.', en: 'A starred directive ADDS the element to the DOM or REMOVES it ENTIRELY based on a condition — the Angular counterpart of React\'s `{isOpen && <X/>}` pattern.' } },
    { id: 5, icon: '📋', label: { tr: '`*ngFor="let bug of bugs"`', en: '`*ngFor="let bug of bugs"`' }, detail: { tr: 'Bir listeyi DÖNER ve her eleman için bir kopya üretir — React\'in `.map()`\'inin Angular karşılığı; burada da bir iç takip anahtarı (`trackBy`) DOM\'da görünmez.', en: 'ITERATES a list and produces a copy for each item — the Angular counterpart of React\'s `.map()`; here too an internal tracking key (`trackBy`) is not visible in the DOM.' } },
  ],
}

// ─── video-scene: "*ngIf Kapıyı Açıp Kapıyor" (GRUP G3, zorunlu film) ─────────
const ngIfDoorFilm = {
  type: 'video-scene',
  id: 'qaf-ngif-door-film',
  title: {
    tr: '🎬 `*ngIf` Kapıyı Açıp Kapıyor: Koşullu Elementin DOM\'a Giriş Çıkışı',
    en: '🎬 `*ngIf` Opens and Closes the Door: a Conditional Element Entering and Leaving the DOM',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'ts',      emoji: '☕', label: { tr: 'isOpen = false',      en: 'isOpen = false' },     color: '#0ea5e9' },
    { id: 'template',emoji: '📄', label: { tr: '*ngIf="isOpen"',      en: '*ngIf="isOpen"' },     color: '#f59e0b' },
    { id: 'absent',  emoji: '🚫', label: { tr: 'DOM\'da YOK',          en: 'ABSENT from DOM' },    color: '#6b7280' },
    { id: 'click',   emoji: '🖱️', label: { tr: 'Buton tıklanır',      en: 'Button clicked' },     color: '#8b5cf6' },
    { id: 'present', emoji: '🚪', label: { tr: 'DOM\'a GİRDİ',          en: 'ENTERED the DOM' },    color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: '`*ngIf`, Angular\'ın en sık yanlış anlaşılan direktiflerinden biridir: bir elementi GİZLEMEZ, onu DOM ağacına HİÇ EKLEMEZ veya TAMAMEN ÇIKARIR. Bu filmde bir Modal\'ın `*ngIf` ile açılıp kapanmasını, tam olarak DOM\'a NE ZAMAN girip çıktığını izleyeceksin.',
        en: '`*ngIf` is one of Angular\'s most commonly misunderstood directives: it does NOT hide an element, it either NEVER adds it to the DOM tree or REMOVES it entirely. In this film you will watch a Modal open and close with `*ngIf`, seeing exactly WHEN it enters and leaves the DOM.',
      },
      code: { tr: `<div *ngIf="isOpen" class="modal">...</div>`, en: `<div *ngIf="isOpen" class="modal">...</div>` },
      positions: { template: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — `isOpen` şu an `false`: component sınıfında (`.ts`) bu değişken `false` değerini taşıyor. Template henüz bu koşulu DEĞERLENDİRMEDİ.',
        en: 'Step 1 — `isOpen` is currently `false`: in the component class (`.ts`) this variable holds `false`. The template has not EVALUATED this condition yet.',
      },
      code: { tr: `isOpen: boolean = false`, en: `isOpen: boolean = false` },
      positions: {
        ts: { x: 24, y: 50, scale: 1.1, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Adım 2 — `*ngIf="isOpen"` bu değeri OKUR: `false` olduğu için Angular bu elementi DOM\'a HİÇ EKLEMEZ. Bu, CSS `display:none` DEĞİLDİR — element ağaçta yer bile kaplamaz.',
        en: 'Step 2 — `*ngIf="isOpen"` READS this value: since it is `false`, Angular NEVER ADDS this element to the DOM. This is NOT CSS `display:none` — the element does not even occupy a place in the tree.',
      },
      code: { tr: `DOM: <div class="modal"> hiç yok`, en: `DOM: <div class="modal"> does not exist at all` },
      positions: {
        ts: { x: 18, y: 50, opacity: 0.6, scale: 0.9 },
        template: { x: 50, y: 50, scale: 1.15, pulse: true },
        absent: { x: 82, y: 50, scale: 1.2 },
      },
      beams: [{ from: 'template', to: 'absent', color: '#6b7280' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Kullanıcı "Yeni Bug" butonuna tıklar: `(click)="isOpen = true"` tetiklenir ve component sınıfındaki `isOpen` değeri `true` OLUR.',
        en: 'Step 3 — the user clicks the "New Bug" button: `(click)="isOpen = true"` fires and the `isOpen` value in the component class BECOMES `true`.',
      },
      code: { tr: `isOpen = true  (tıklama sonrası)`, en: `isOpen = true  (after the click)` },
      positions: {
        click: { x: 24, y: 50, scale: 1.2, pulse: true },
        ts: { x: 58, y: 50, scale: 1.1 },
      },
      beams: [{ from: 'click', to: 'ts', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Final — Angular yeniden değerlendirir ve element DOM\'a GERÇEKTEN GİRER: `*ngIf` artık `true` gördüğü için Modal\'ı DOM ağacına EKLER. Ancak BU ANDAN ÖNCE Modal\'ı locate etmeye çalışan bir test her zaman NoSuchElement alır — React\'teki `{isOpen && <Modal/>}` ile TAMAMEN aynı ders.',
        en: 'Final — Angular re-evaluates and the element REALLY ENTERS the DOM: since `*ngIf` now sees `true`, it ADDS the Modal to the DOM tree. But a test trying to locate the Modal BEFORE this moment always gets NoSuchElement — EXACTLY the same lesson as React\'s `{isOpen && <Modal/>}`.',
      },
      code: { tr: `<div class="modal">...</div>  ← ARTIK DOM'da`, en: `<div class="modal">...</div>  <- NOW in the DOM` },
      positions: {
        ts: { x: 22, y: 32, scale: 0.95 },
        present: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'ts', to: 'present', color: '#22c55e' }],
    },
  ],
}

// ─── table: *ngIf/*ngFor ↔ React karşılaştırması (GRUP G3) ────────────────────
const ngReactComparisonTable = {
  type: 'table',
  headers: [
    { tr: 'Davranış', en: 'Behavior' },
    { tr: 'Angular', en: 'Angular' },
    { tr: 'React', en: 'React' },
    { tr: 'Locator dersi', en: 'Locator lesson' },
  ],
  rows: [
    [{ tr: 'Koşullu render', en: 'Conditional render' }, '*ngIf="isOpen"', '{isOpen && <X/>}', { tr: 'İkisinde de element koşul false iken DOM\'da HİÇ YOK', en: 'In both, the element is NOT in the DOM at all while the condition is false' }],
    [{ tr: 'Liste render', en: 'List render' }, '*ngFor="let b of bugs"', 'bugs.map(b => ...)', { tr: 'İkisinde de iç takip anahtarı (trackBy/key) DOM\'da GÖRÜNMEZ, locator olarak kullanılamaz', en: 'In both, the internal tracking key (trackBy/key) is NOT VISIBLE in the DOM, cannot be used as a locator' }],
    [{ tr: 'Metin bağlama', en: 'Text binding' }, '{{ bug.title }}', '{bug.title}', { tr: 'İkisi de bir JS/TS ifadesini DOM text node\'una çevirir', en: 'Both turn a JS/TS expression into a DOM text node' }],
  ],
}

// ─── code (Kaynak→DOM→Locator, _ngcontent hash — GRUP G4) ─────────────────────
const ngContentHashCode = {
  type: 'code',
  language: 'typescript',
  code: {
    tr: `// SÜTUN 1 — Developer'ın yazdığı Angular kaynağı (status-badge.component.html)
<span class="badge">{{ status }}</span>

// SÜTUN 2 — Tarayıcıda oluşan GERÇEK DOM
// <span _ngcontent-abc-5 class="badge">OPEN</span>
//   ← _ngcontent-abc-5, Angular'ın ViewEncapsulation (stil izolasyonu) için
//     OTOMATİK eklediği bir attribute'tur; developer bunu YAZMADI`,
    en: `// COLUMN 1 — The Angular source the developer wrote (status-badge.component.html)
<span class="badge">{{ status }}</span>

// COLUMN 2 — The REAL DOM produced in the browser
// <span _ngcontent-abc-5 class="badge">OPEN</span>
//   <- _ngcontent-abc-5 is an attribute Angular adds AUTOMATICALLY for
//     ViewEncapsulation (style isolation); the developer did NOT write it`,
  },
}

// ─── code-playground: Angular'da dinamik data-testid binding'i (GRUP G5) ──────
const angularDataTestIdBindingPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-g5-angular-data-testid',
  id: 'qaf-g5-attr-data-testid',
  title: { tr: 'Kendin Dene: Angular\'da Dinamik `data-testid` Binding\'i Yaz', en: 'Try It Yourself: Write a Dynamic `data-testid` Binding in Angular' },
  starterCode: {
    tr: `// Her BugCard'a bug.id'ye göre benzersiz bir data-testid vermek istiyorsun.
// Düz interpolation ({{ }}) burada ÇALIŞMAZ çünkü data-testid bir DOM attribute'u,
// interpolation ise sadece TEXT içeriği için kullanılır.
// TODO: doğru Angular binding sözdizimini yaz.
<li class="bug-card" data-testid="{{ 'bug-card-' + bug.id }}">`,
    en: `// You want to give each BugCard a unique data-testid based on bug.id.
// Plain interpolation ({{ }}) does NOT work here because data-testid is a DOM
// attribute, and interpolation is only for TEXT content.
// TODO: write the correct Angular binding syntax.
<li class="bug-card" data-testid="{{ 'bug-card-' + bug.id }}">`,
  },
  solutionCode: {
    tr: `// [attr.*] binding'i: dinamik bir DEĞERİ bir HTML attribute'una bağlamanın yolu
<li class="bug-card" [attr.data-testid]="'bug-card-' + bug.id">`,
    en: `// The [attr.*] binding: the way to bind a DYNAMIC value to an HTML attribute
<li class="bug-card" [attr.data-testid]="'bug-card-' + bug.id">`,
  },
  hint: {
    tr: 'Angular\'da `data-testid` gibi standart olmayan (Angular\'ın "bilmediği") bir attribute\'a dinamik değer bağlamak için `[attr.data-testid]="..."` sözdizimi kullanılır — düz interpolation string birleştirmede beklenmedik sonuçlar verebilir.',
    en: 'In Angular, binding a dynamic value to a non-standard attribute (one Angular does not "know") like `data-testid` uses the `[attr.data-testid]="..."` syntax — plain interpolation can produce unexpected results in string concatenation for attributes.',
  },
  successMessage: {
    tr: 'Doğru! `[attr.*]` binding\'i Angular\'da dinamik data-testid\'ler eklemenin standart yoludur — React\'teki `data-testid={`bug-card-${bug.id}`}` ile AYNI amaca hizmet eder, sadece sözdizimi farklıdır.',
    en: 'Correct! The `[attr.*]` binding is the standard way to add dynamic data-testids in Angular — it serves the SAME purpose as React\'s `data-testid={`bug-card-${bug.id}`}`, just with different syntax.',
  },
}

// ─── table: Kırılgan locator antipattern'leri (GRUP H2) ────────────────────────
const locatorAntipatternTable = {
  type: 'table',
  headers: [
    { tr: 'Antipattern', en: 'Antipattern' },
    { tr: 'Neden kırılır?', en: 'Why does it break?' },
    { tr: 'Yerine ne kullan', en: 'Use instead' },
  ],
  rows: [
    [{ tr: 'Absolute XPath (`/html/body/div[2]/ul/li[3]/button`)', en: 'Absolute XPath (`/html/body/div[2]/ul/li[3]/button`)' }, { tr: 'Ağaca TEK bir wrapper eklenmesi bile tüm yolu geçersiz kılar', en: 'Adding even ONE wrapper to the tree invalidates the entire path' }, { tr: '`data-testid` veya `getByRole`', en: '`data-testid` or `getByRole`' }],
    [{ tr: '`nth-child`/index bağımlılığı', en: '`nth-child`/index dependency' }, { tr: 'Sıralama değişince (yeni eleman eklenince) YANLIŞ elemente işaret eder — bulunamama değil, SESSİZCE yanlış eşleşme riski', en: 'When ordering changes (a new item is added) it points to the WRONG element — not a not-found, but a SILENT wrong-match risk' }, { tr: 'İlişkisel locate (`row containing text X`) veya `data-id`', en: 'Relational locating (`row containing text X`) or `data-id`' }],
    [{ tr: 'Hash class (`.Btn_ghost__p0q2`)', en: 'A hash class (`.Btn_ghost__p0q2`)' }, { tr: 'Her build\'de yeniden üretilir (CSS Modules/styled-components)', en: 'Regenerated on every build (CSS Modules/styled-components)' }, { tr: '`data-testid`/`getByRole`', en: '`data-testid`/`getByRole`' }],
    [{ tr: 'Auto-generated id (`id="r4nd0m-9f3"`)', en: 'An auto-generated id (`id="r4nd0m-9f3"`)' }, { tr: 'Sayfa her yüklemede farklı bir id üretebilir (UUID, sayaç)', en: 'The page can produce a different id on every load (a UUID, a counter)' }, { tr: 'Başlangıç-eşleşmesi (`^=`) veya `data-testid`', en: 'A starts-with match (`^=`) or `data-testid`' }],
  ],
}

// ─── video-scene: "5 Locator Yarışı" (GRUP H3, sayfanın en kritik filmi) ──────
const fiveLocatorRaceFilm = {
  type: 'video-scene',
  id: 'qaf-five-locator-race-film',
  title: {
    tr: '🎬 5 Locator Yarışı: Deploy Sonrası Hangisi Hayatta Kalır?',
    en: '🎬 The 5-Locator Race: Which One Survives the Deploy?',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'button',  emoji: '🔘', label: { tr: '"Düzenle" butonu',    en: '"Edit" button' },        color: '#0ea5e9' },
    { id: 'xpath',   emoji: '1️⃣', label: { tr: 'XPath index',        en: 'XPath index' },           color: '#ef4444' },
    { id: 'hash',    emoji: '2️⃣', label: { tr: 'Hash class',         en: 'Hash class' },            color: '#f97316' },
    { id: 'text',    emoji: '3️⃣', label: { tr: 'getByText',          en: 'getByText' },             color: '#eab308' },
    { id: 'role',    emoji: '4️⃣', label: { tr: 'getByRole',          en: 'getByRole' },             color: '#22c55e' },
    { id: 'testid',  emoji: '5️⃣', label: { tr: 'getByTestId',        en: 'getByTestId' },           color: '#10b981' },
    { id: 'deploy',  emoji: '🚀', label: { tr: 'Deploy',              en: 'Deploy' },                color: '#8b5cf6' },
  ],
  scenes: [
    {
      caption: {
        tr: '5 farklı tester, AYNI "Düzenle" butonuna 5 farklı locator yazdı: XPath index, hash class, metin (getByText), rol+isim (getByRole), ve data-testid. Bugün HEPSİ çalışıyor. Ama YARIN bir deploy sonrası hangisi hayatta kalacak? Bu, sayfanın EN KRİTİK filmidir.',
        en: '5 different testers wrote 5 different locators for the SAME "Edit" button: an XPath index, a hash class, text (getByText), role+name (getByRole), and data-testid. Today ALL of them work. But TOMORROW, after a deploy, which one survives? This is the MOST CRITICAL film on this page.',
      },
      code: { tr: `5 locator, 1 buton, bugün hepsi ✅`, en: `5 locators, 1 button, all ✅ today` },
      positions: { button: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Bugün: her 5 locator da AYNI butona ulaşıyor — testler yeşil. Ama her biri FARKLI bir şeye güveniyor: biri konuma (index), biri stile (hash), biri dile (metin), biri erişilebilirliğe (rol), biri kasıtlı bir kimliğe (data-testid).',
        en: 'Today: all 5 locators reach the SAME button — tests are green. But each relies on something DIFFERENT: one on position (index), one on style (hash), one on language (text), one on accessibility (role), one on a deliberate identity (data-testid).',
      },
      code: { tr: `//li[3]/button · .Btn_ghost__p0q2 · "Düzenle" · role=button · data-testid`, en: `//li[3]/button · .Btn_ghost__p0q2 · "Edit" · role=button · data-testid` },
      positions: {
        button: { x: 50, y: 30, scale: 1.1 },
        xpath: { x: 15, y: 62, scale: 0.9 },
        hash: { x: 32, y: 62, scale: 0.9 },
        text: { x: 50, y: 62, scale: 0.9 },
        role: { x: 68, y: 62, scale: 0.9 },
        testid: { x: 85, y: 62, scale: 0.9 },
      },
      beams: [
        { from: 'button', to: 'xpath' }, { from: 'button', to: 'hash' }, { from: 'button', to: 'text' },
        { from: 'button', to: 'role' }, { from: 'button', to: 'testid' },
      ],
    },
    {
      caption: {
        tr: 'Deploy tetiklenir: İKİ şey AYNI ANDA olur — (1) build aracı CSS Module hash\'ini yeniden üretir, (2) bir kullanıcı yeni bir bug ekler ve bu buton listede BİR SIRA aşağı kayar.',
        en: 'A deploy fires: TWO things happen AT THE SAME TIME — (1) the build tool regenerates the CSS Module hash, (2) a user adds a new bug and this button shifts DOWN one position in the list.',
      },
      code: { tr: `deploy: hash yenilendi + liste 1 sıra kaydı`, en: `deploy: hash regenerated + list shifted by 1` },
      positions: {
        deploy: { x: 50, y: 45, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'deploy', to: 'button', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Sonuç 1 — XPath index EN TEHLİKELİ şekilde kırılır: `//li[3]/button` artık BAŞKA bir bug\'ın butonuna işaret ediyor. Test hata VERMEZ, ama YANLIŞ bug\'ı düzenler — bu, "bulunamadı" hatasından daha TEHLİKELİDİR çünkü SESSİZCE yanlış davranır.',
        en: 'Result 1 — XPath index breaks in the MOST DANGEROUS way: `//li[3]/button` now points to a DIFFERENT bug\'s button. The test does NOT error, but it edits the WRONG bug — this is MORE DANGEROUS than a "not found" error because it fails SILENTLY.',
      },
      code: { tr: `//li[3]/button → YANLIŞ bug'a işaret ediyor!`, en: `//li[3]/button -> now points to the WRONG bug!` },
      positions: {
        xpath: { x: 50, y: 50, scale: 1.25, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Sonuç 2 — Hash class NoSuchElement ile kırılır: `.Btn_ghost__p0q2` build\'de `.Btn_ghost__z8m3q` oldu, dünkü test 0 eleman bulur. En azından bu, XPath\'in aksine AÇIK bir hata verir.',
        en: 'Result 2 — the hash class breaks with NoSuchElement: `.Btn_ghost__p0q2` became `.Btn_ghost__z8m3q` in the build, yesterday\'s test finds 0 elements. At least, unlike XPath, this gives an OBVIOUS error.',
      },
      code: { tr: `.Btn_ghost__p0q2 → 0 elements matched`, en: `.Btn_ghost__p0q2 -> 0 elements matched` },
      positions: {
        hash: { x: 50, y: 50, scale: 1.25, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Sonuç 3 — Metin, rol ve data-testid HAYATTA KALIR: butonun metni, erişilebilir ismi ve data-testid\'si deploy\'dan ETKİLENMEDİ. AMA dikkat: metin (getByText) sadece BU SEFER hayatta kaldı — dil değişse (TR→EN) veya metin güncellense KIRILACAKTI. En sağlam ikisi: role+name ve data-testid.',
        en: 'Result 3 — text, role, and data-testid SURVIVE: the button\'s text, accessible name, and data-testid were NOT affected by the deploy. BUT note: text (getByText) only survived THIS TIME — it would BREAK if the language changed (TR->EN) or the text was updated. The two most robust: role+name and data-testid.',
      },
      code: { tr: `getByText/getByRole/getByTestId → hâlâ çalışıyor`, en: `getByText/getByRole/getByTestId -> still working` },
      positions: {
        text: { x: 25, y: 50, scale: 1.15, pulse: true },
        role: { x: 50, y: 50, scale: 1.15, pulse: true },
        testid: { x: 75, y: 50, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Final — Sıralama netleşti: `data-testid` ve `getByRole` deploy\'a KARŞI BAĞIŞIKTIR (kasıtlı kimlik/erişilebilirlik); metin SADECE ŞANSLA hayatta kaldı (i18n\'de kırılırdı); hash class ve XPath index İKİSİ DE kırıldı — biri açıkça (NoSuchElement), diğeri SESSİZCE (yanlış eleman). Bu yüzden hiyerarşi `data-testid` > `role+name` > stabil `id` > text > CSS > XPath-index şeklindedir.',
        en: 'Final — the ranking is clear: `data-testid` and `getByRole` are IMMUNE to a deploy (a deliberate identity/accessibility); text survived ONLY BY LUCK (it would break under i18n); the hash class and XPath index BOTH broke — one openly (NoSuchElement), the other SILENTLY (the wrong element). This is why the hierarchy is `data-testid` > `role+name` > stable `id` > text > CSS > XPath-index.',
      },
      code: { tr: `data-testid > role+name > id > text > CSS > XPath-index`, en: `data-testid > role+name > id > text > CSS > XPath-index` },
      positions: {
        testid: { x: 20, y: 40, scale: 1.1 },
        role: { x: 40, y: 55, scale: 1.0 },
        text: { x: 58, y: 40, scale: 0.85, opacity: 0.7 },
        hash: { x: 74, y: 55, scale: 0.8, opacity: 0.4 },
        xpath: { x: 90, y: 40, scale: 0.8, opacity: 0.4 },
      },
    },
  ],
}

// ─── step-animation: Conditional/dynamic element için bekleme + varlık kontrolü (GRUP H4) ─
const conditionalDynamicWaitSteps = {
  type: 'step-animation',
  id: 'qaf-h4-conditional-dynamic-steps',
  title: { tr: 'Adım Adım: Koşullu/Dinamik Bir Elementi Doğru Locate Etme', en: 'Step by Step: Correctly Locating a Conditional/Dynamic Element' },
  steps: [
    { id: 1, icon: '❓', label: { tr: 'Önce sor: bu element her zaman mı var?', en: 'First ask: does this element always exist?' }, detail: { tr: 'Bir Toast, Modal veya hata mesajı gibi elementler KOŞULLUDUR — kaynağı okuyup `{isOpen&&}`/`*ngIf` gibi bir kalıp arayarak bunu ÖNCEDEN bil.', en: 'Elements like a Toast, Modal, or error message are CONDITIONAL — know this IN ADVANCE by reading the source and looking for a pattern like `{isOpen&&}`/`*ngIf`.' } },
    { id: 2, icon: '🎬', label: { tr: 'Koşulu TETİKLE', en: 'TRIGGER the condition' }, detail: { tr: 'Locate etmeden ÖNCE, elementi var eden eylemi yap (butona tıkla, formu gönder) — koşul gerçekleşmeden locate etmek her zaman başarısızdır.', en: 'BEFORE locating, perform the action that brings the element into existence (click the button, submit the form) — locating before the condition is met always fails.' } },
    { id: 3, icon: '⏳', label: { tr: 'VARLIĞI bekle (`attached`/`present`)', en: 'Wait for PRESENCE (`attached`/`present`)' }, detail: { tr: 'Element DOM\'a girdi mi? Bu, GRUP A3\'teki "DOM\'da var ama render tree\'de yok" ayrımına dayanır — varlık tek başına yeterli değildir.', en: 'Has the element entered the DOM? This relies on the GROUP A3 distinction "exists in the DOM but not in the render tree" — presence alone is not enough.' } },
    { id: 4, icon: '👁️', label: { tr: 'GÖRÜNÜRLÜĞÜ bekle (`visible`)', en: 'Wait for VISIBILITY (`visible`)' }, detail: { tr: 'Element render tree\'de mi VE ekranda mı? Tıklama gibi etkileşimler için `visible`/`actionable` beklemek gerekir, sadece `attached` değil.', en: 'Is the element in the render tree AND on screen? Interactions like clicking require waiting for `visible`/`actionable`, not just `attached`.' } },
    { id: 5, icon: '✅', label: { tr: 'Ardından locate/etkileşim', en: 'Then locate/interact' }, detail: { tr: 'Bu 4 adımı (koşulu bil → tetikle → varlığı bekle → görünürlüğü bekle) atlamayan tester, koşullu/dinamik elementlerde flaky test YAZMAZ.', en: 'A tester who does not skip these 4 steps (know the condition -> trigger it -> wait for presence -> wait for visibility) does NOT write a flaky test for conditional/dynamic elements.' } },
  ],
}

// ─── code-playground: Tablo/liste içinde tekil satırı ilişkisel bulma (GRUP H5) ─
const relationalRowLocatorPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-h5-list-single-row',
  id: 'qaf-h5-relational-row',
  title: { tr: 'Kendin Dene: Tabloda Tekil Satırı İndeks YASAK Kuralıyla Bul', en: 'Try It Yourself: Find a Single Table Row Under the Index-BANNED Rule' },
  starterCode: {
    tr: `// Bug Tracker tablosunda "Login butonu 500 donuyor" satırındaki
// severity dropdown'ını "CRITICAL" yapman gerekiyor. Tablo sık sık
// filtrelemeyle yeniden sıralanıyor. TODO: index YASAK kuralına uy.
await page.locator('tr').nth(4).locator('select').selectOption('CRITICAL');`,
    en: `// You need to set the severity dropdown to "CRITICAL" on the row
// "Login button freezes on 500" in the Bug Tracker table. The table is
// frequently re-sorted by filtering. TODO: obey the index-BANNED rule.
await page.locator('tr').nth(4).locator('select').selectOption('CRITICAL');`,
  },
  solutionCode: {
    tr: `// Satırı METNE göre ilişkisel bul, SONRA o satırın içindeki dropdown'a git
await page.locator('tr', { hasText: 'Login butonu 500 donuyor' })
  .locator('select')
  .selectOption('CRITICAL');`,
    en: `// Find the row relationally BY TEXT, THEN go to the dropdown inside that row
await page.locator('tr', { hasText: 'Login button freezes on 500' })
  .locator('select')
  .selectOption('CRITICAL');`,
  },
  hint: {
    tr: '`.nth(4)` "5. satır" demektir ve filtreleme sıralamayı değiştirdiğinde YANLIŞ satırı hedefler — bu, H3 filmindeki XPath index\'in aynı sinsi hatasıdır (sessizce yanlış eleman). Doğru yol: önce satırı bir kimlik veya metinle BUL, sonra o satırın İÇİNDE ara.',
    en: '`.nth(4)` means "the 5th row" and targets the WRONG row once filtering changes the order — this is the same sneaky mistake as the XPath index in the H3 film (a silent wrong element). The right way: first FIND the row by an identity or text, then search INSIDE that row.',
  },
  successMessage: {
    tr: 'Doğru! Önce satırı ilişkisel olarak (metin/kimlik) bulup SONRA o satırın içinde aramak, sıralamadan tamamen bağımsız ve dayanıklı bir kalıptır — index KULLANMA kuralının somut uygulaması budur.',
    en: 'Correct! First finding the row relationally (by text/identity) and THEN searching inside it is a pattern completely independent of ordering and durable — this is the concrete application of the do-NOT-use-index rule.',
  },
}

// ─── step-animation: Shadow DOM / iframe context değişimi (GRUP H6) ───────────
const shadowDomIframeSteps = {
  type: 'step-animation',
  id: 'qaf-h6-shadow-iframe-steps',
  title: { tr: 'Adım Adım: Shadow DOM / iframe Neden "Ayrı Bir Ülke" Gibidir', en: 'Step by Step: Why Shadow DOM / an iframe Is Like "a Separate Country"' },
  steps: [
    { id: 1, icon: '🌐', label: { tr: 'Normal DOM: tek bir ülke', en: 'Normal DOM: a single country' }, detail: { tr: 'Sayfanın ana DOM ağacında `page.locator(...)` her yeri arar — hepsi AYNI "ülkenin" (document) içindedir.', en: 'In the page\'s main DOM tree, `page.locator(...)` searches everywhere — it is all within the SAME "country" (document).' } },
    { id: 2, icon: '🏝️', label: { tr: 'Shadow DOM: kendi sınırları olan bir ada', en: 'Shadow DOM: an island with its own borders' }, detail: { tr: 'Bir web component (`<severity-picker>`) kendi İÇ DOM\'unu (shadow root) gizler — normal bir CSS selector bu sınırı GEÇEMEZ.', en: 'A web component (`<severity-picker>`) hides its own INTERNAL DOM (a shadow root) — a normal CSS selector CANNOT cross this boundary.' } },
    { id: 3, icon: '🖼️', label: { tr: 'iframe: tamamen AYRI bir belge', en: 'An iframe: a COMPLETELY separate document' }, detail: { tr: 'Bir `<iframe>` içindeki içerik kendi `document`\'ına sahiptir — ana sayfanın locator\'ı iframe\'in İÇİNE hiç bakamaz, önce "context değiştirmek" (frame\'e geçmek) gerekir.', en: 'The content inside an `<iframe>` has its own `document` — the main page\'s locator can never look INSIDE the iframe; you must first "switch context" (enter the frame).' } },
    { id: 4, icon: '🛂', label: { tr: 'Pasaport kontrolü: context değiştirme', en: 'Passport control: switching context' }, detail: { tr: 'Modern araçlar (`page.frameLocator(...)`, shadow DOM için `>>>` veya otomatik penetre eden selector\'lar) bu sınırı GEÇMEK için özel bir adım sunar.', en: 'Modern tools (`page.frameLocator(...)`, `>>>` for shadow DOM, or selectors that auto-pierce) offer a dedicated step to CROSS this boundary.' } },
    { id: 5, icon: '✅', label: { tr: 'Tester\'ın refleksi: "bu içerik nerede yaşıyor?"', en: 'The tester\'s reflex: "where does this content live?"' }, detail: { tr: 'Bir element locate edilemediğinde, önce "normal DOM\'da mı, shadow DOM\'da mı, yoksa bir iframe\'in içinde mi?" diye SOR — context yanlışsa hiçbir selector çalışmaz.', en: 'When an element cannot be located, first ASK "is it in the normal DOM, a shadow DOM, or inside an iframe?" — no selector works if the context is wrong.' } },
  ],
}

// ─── table: Developer'dan ne istenir — H7 konvansiyon önerileri ──────────────
const developerRequestTable = {
  type: 'table',
  headers: [
    { tr: 'Durum', en: 'Situation' },
    { tr: 'Developer\'dan tam olarak ne istenir', en: 'Exactly what to ask the developer for' },
  ],
  rows: [
    [{ tr: 'Hash class\'a bağlı bir buton', en: 'A button bound to a hash class' }, { tr: '"Bu butona `data-testid=\'save-bug\'` ekler misin? Class hash\'i her build\'de değişiyor."', en: '"Could you add `data-testid=\'save-bug\'` to this button? The class hash changes on every build."' }],
    [{ tr: 'Tekrarlayan bir liste satırı', en: 'A repeating list row' }, { tr: '"Her satıra `data-testid=\'bug-row-{id}\'` ekler misin? Satırı index\'le değil id\'yle bulmam gerekiyor."', en: '"Could you add `data-testid=\'bug-row-{id}\'` per row? I need to find the row by id, not by index."' }],
    [{ tr: 'Erişilebilir isim eksik bir ikon buton', en: 'An icon button with no accessible name' }, { tr: '"Bu butona `aria-label=\'Bug\'ı sil\'` ekler misin? Hem erişilebilirlik hem getByRole için gerekiyor."', en: '"Could you add `aria-label=\'Delete bug\'` to this button? It is needed for both accessibility and getByRole."' }],
    [{ tr: 'Yeni bir feature/PR', en: 'A new feature/PR' }, { tr: '"Test edilebilirlik bir kabul kriteri olsun mu? Her yeni etkileşimli elemente data-testid veya erişilebilir rol/isim eklemeyi PR checklist\'ine ekleyelim."', en: '"Can testability be an acceptance criterion? Let\'s add adding data-testid or an accessible role/name for every new interactive element to the PR checklist."' }],
  ],
}

// ─── table: Locator Code Review checklist (GRUP H8) ───────────────────────────
const locatorCodeReviewTable = {
  type: 'table',
  headers: [
    { tr: 'PR\'da gördüğün şey', en: 'What you see in the PR' },
    { tr: 'Sorman gereken soru', en: 'The question you should ask' },
  ],
  rows: [
    [{ tr: 'Yeni bir interaktif element (buton, input, satır)', en: 'A new interactive element (button, input, row)' }, { tr: '"Bunu test etmek için stabil bir kanca (data-testid/role) var mı?"', en: '"Is there a stable hook (data-testid/role) to test this?"' }],
    [{ tr: 'Bir class isminin değişmesi (refactor/redesign)', en: 'A class name change (refactor/redesign)' }, { tr: '"Bu class\'a bağlı bilinen bir test var mı? (data-testid\'ye taşınmalı mı?)"', en: '"Is there a known test bound to this class? (Should it move to data-testid?)"' }],
    [{ tr: 'Yeni bir conditional render (`{koşul&&}`/`*ngIf`)', en: 'A new conditional render (`{condition&&}`/`*ngIf`)' }, { tr: '"Bu elementin ne zaman DOM\'a girdiğini gösteren bir işaret (ör. data-state) var mı?"', en: '"Is there a marker (e.g. data-state) showing when this element enters the DOM?"' }],
    [{ tr: 'Bir liste/tablo render\'ı (`.map()`/`*ngFor`)', en: 'A list/table render (`.map()`/`*ngFor`)' }, { tr: '"Her satırda benzersiz bir kimlik (data-id) var mı, yoksa sadece index mi ayırt ediyor?"', en: '"Does each row have a unique identity (data-id), or does only the index distinguish them?"' }],
  ],
}

// ─── video-scene: "Stale Element" — referans nasıl ölür (GRUP I, zorunlu film) ─
const staleElementFilm = {
  type: 'video-scene',
  id: 'qaf-stale-element-film',
  title: {
    tr: '🎬 Stale Element: Bir Referans Nasıl Ölür?',
    en: '🎬 Stale Element: How a Reference Dies',
  },
  xpReward: 13,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'test',    emoji: '🧪', label: { tr: 'Test kodu',              en: 'Test code' },              color: '#0ea5e9' },
    { id: 'oldNode', emoji: '📦', label: { tr: 'Eski DOM node\'u',        en: 'Old DOM node' },           color: '#f59e0b' },
    { id: 'ref',     emoji: '🔗', label: { tr: 'Tutulan referans',        en: 'Held reference' },        color: '#8b5cf6' },
    { id: 'rerender',emoji: '🔁', label: { tr: 'Re-render',               en: 'Re-render' },              color: '#6366f1' },
    { id: 'newNode', emoji: '🆕', label: { tr: 'Yeni DOM node\'u',        en: 'New DOM node' },           color: '#22c55e' },
    { id: 'ghost',   emoji: '👻', label: { tr: 'Ölü referans',            en: 'Dead reference' },         color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir test, "Düzenle" butonunu bulup bir DEĞİŞKENDE saklıyor: `const editBtn = await driver.findElement(...)`. Bu filmde bu referansın, listeye yeni bir bug eklenince NASIL sessizce ÖLDÜĞÜNÜ izleyeceksin.',
        en: 'A test finds the "Edit" button and stores it in a VARIABLE: `const editBtn = await driver.findElement(...)`. In this film you will watch HOW this reference SILENTLY dies once a new bug is added to the list.',
      },
      code: { tr: `const editBtn = await driver.findElement(By.testid('edit-bug-42'));`, en: `const editBtn = await driver.findElement(By.testid('edit-bug-42'));` },
      positions: { test: { x: 50, y: 50, scale: 1.1, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Element bulunur ve referans TUTULUR: `editBtn` artık DOM\'daki BELİRLİ bir node\'u (o anki "Düzenle" butonunu) işaret eden bir referanstır.',
        en: 'Step 1 — the element is found and a reference is HELD: `editBtn` now points to a SPECIFIC node in the DOM (the "Edit" button as it currently exists).',
      },
      code: { tr: `editBtn → [eski DOM node'una işaret ediyor]`, en: `editBtn -> [pointing to the old DOM node]` },
      positions: {
        test: { x: 20, y: 40, scale: 1.05 },
        ref: { x: 50, y: 55, scale: 1.15, pulse: true },
        oldNode: { x: 80, y: 55, scale: 1.15 },
      },
      beams: [{ from: 'ref', to: 'oldNode', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Başka bir eylem (ör. "Daha Fazla Yükle" tıklanır) bir RE-RENDER tetikler: React/Angular liste state\'i değiştiği için bu alt ağacı YENİDEN OLUŞTURMAYA karar verir (GRUP F1/G1\'deki reconciliation dersini hatırla).',
        en: 'Step 2 — a different action (e.g. clicking "Load More") triggers a RE-RENDER: because the list state changed, React/Angular decides to RECREATE this subtree (recall the reconciliation lesson from GROUP F1/G1).',
      },
      code: { tr: `setBugs([...bugs, ...moreBugs])  → re-render tetiklendi`, en: `setBugs([...bugs, ...moreBugs])  -> re-render triggered` },
      positions: {
        oldNode: { x: 22, y: 55, opacity: 0.6, scale: 0.9 },
        rerender: { x: 55, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'oldNode', to: 'rerender', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Eski node YOK EDİLİR, YENİ bir node kurulur: framework aynı butonu görsel olarak AYNI yerde çizse bile, altta YEPYENİ bir DOM node\'u oluşturmuş olabilir — eski node artık belgede yer ALMIYOR.',
        en: 'Step 3 — the old node is DESTROYED, a NEW node is built: even though the framework visually draws the same button in the SAME place, underneath it may have created a BRAND NEW DOM node — the old node no longer EXISTS in the document.',
      },
      code: { tr: `eski <button> kaldırıldı, yeni <button> eklendi`, en: `old <button> removed, new <button> added` },
      positions: {
        rerender: { x: 20, y: 40, opacity: 0.6, scale: 0.9 },
        newNode: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'rerender', to: 'newNode', color: '#22c55e' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Tutulan referans artık bir HAYALETE işaret ediyor: `editBtn` hâlâ ESKİ node\'a işaret eder ama o node artık belgeye BAĞLI değildir — "stale" (bayat) bir referanstır.',
        en: 'Step 4 — the held reference now points to a GHOST: `editBtn` still points to the OLD node, but that node is no longer ATTACHED to the document — a "stale" reference.',
      },
      code: { tr: `editBtn → [belgeye bağlı olmayan hayalet node]`, en: `editBtn -> [a ghost node not attached to the document]` },
      positions: {
        newNode: { x: 22, y: 40, opacity: 0.5, scale: 0.9 },
        ghost: { x: 58, y: 55, scale: 1.2, pulse: true },
      },
    },
    {
      caption: {
        tr: 'Final — `editBtn.click()` çağrılınca: `StaleElementReferenceException: element is not attached to the page document` fırlatılır. Doğru refleks: referansı ÖNCEDEN tutup SONRA kullanmak yerine, HER etkileşimden önce locator\'ı YENİDEN sorgulamak (Playwright locator\'ları bunu otomatik yapar, Selenium\'da elle tekrar `findElement` çağrılmalıdır).',
        en: 'Final — calling `editBtn.click()` throws `StaleElementReferenceException: element is not attached to the page document`. The right reflex: instead of holding a reference beforehand and using it LATER, RE-QUERY the locator before EVERY interaction (Playwright locators do this automatically, Selenium requires calling `findElement` again by hand).',
      },
      code: { tr: `StaleElementReferenceException: element is not attached to the page document`, en: `StaleElementReferenceException: element is not attached to the page document` },
      positions: {
        ghost: { x: 30, y: 45, scale: 1.15, pulse: true },
        test: { x: 68, y: 55, scale: 1.1 },
      },
      beams: [{ from: 'ghost', to: 'test', color: '#ef4444' }],
    },
  ],
}

// ─── step-animation: Hata mesajını okuma refleksi (GRUP I) ────────────────────
const errorMessageDiagnosisSteps = {
  type: 'step-animation',
  id: 'qaf-i-error-diagnosis-steps',
  title: { tr: 'Adım Adım: Hata Mesajı Seni Nereye Yönlendiriyor?', en: 'Step by Step: Where Does the Error Message Point You?' },
  steps: [
    { id: 1, icon: '❓', label: { tr: 'Hiç hata yok ama sonuç yanlış', en: 'No error at all, but the result is wrong' }, detail: { tr: 'Test "yeşil" ama yanlış bug\'ı işledi — şüphelen: index\'e bağlı bir locator sıralama değişince sessizce yanlış elemente düştü mü (GRUP H2/H5)?', en: 'The test is "green" but processed the wrong bug — suspect: did an index-bound locator silently fall onto the wrong element once ordering changed (GROUP H2/H5)?' } },
    { id: 2, icon: '🔍', label: { tr: '"0 elements matched" / NoSuchElement', en: '"0 elements matched" / NoSuchElement' }, detail: { tr: 'Element hiç bulunamadı — element henüz DOM\'a girmedi mi (timing, GRUP D3), koşul tetiklenmedi mi (GRUP F4/G3), yoksa selector yanlış mı yazılmış?', en: 'The element was not found at all — has it not entered the DOM yet (timing, GROUP D3), was the condition not triggered (GROUP F4/G3), or is the selector written incorrectly?' } },
    { id: 3, icon: '👻', label: { tr: '"not attached to the page document" / StaleElement', en: '"not attached to the page document" / StaleElement' }, detail: { tr: 'Element ÖNCEDEN bulundu ama artık geçersiz — bir re-render (GRUP A5, F3) tutulan referansı geride bıraktı mı?', en: 'The element WAS found before but is no longer valid — did a re-render (GROUP A5, F3) leave the held reference behind?' } },
    { id: 4, icon: '🚫', label: { tr: '"not visible"/"not interactable"', en: '"not visible"/"not interactable"' }, detail: { tr: 'Element DOM\'da var (`attached`) ama tıklanamıyor — `display:none` mi (GRUP A3), yoksa animasyon/hydration henüz bitmedi mi (GRUP E4)?', en: 'The element exists in the DOM (`attached`) but cannot be clicked — is it `display:none` (GROUP A3), or has an animation/hydration not finished yet (GROUP E4)?' } },
    { id: 5, icon: '✅', label: { tr: 'Mesajı OKU, tahmin etme', en: 'READ the message, do not guess' }, detail: { tr: 'Her hata mesajı FARKLI bir kök nedene işaret eder — mesajı doğru sınıfa (timing/conditional/stale/kırılgan-locator) yerleştiren tester dakikalar içinde çözer.', en: 'Every error message points to a DIFFERENT root cause — a tester who places the message in the right category (timing/conditional/stale/fragile-locator) solves it in minutes.' } },
  ],
}

// ─── code-playground: Stale element'i doğru şekilde önleme (GRUP I) ───────────
const fixStaleElementPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-i-common-errors',
  id: 'qaf-i-fix-stale-element',
  title: { tr: 'Kendin Dene: StaleElementReferenceException\'ı Kalıcı Olarak Düzelt', en: 'Try It Yourself: Permanently Fix a StaleElementReferenceException' },
  starterCode: {
    tr: `// BUG raporu: "Dün geçen test bugün StaleElementReferenceException veriyor."
// Kod: referans "Daha Fazla Yükle" tıklanmadan ÖNCE alınıyor, SONRA kullanılıyor.
const editBtn = await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]'));
await driver.findElement(By.cssSelector('[data-testid="load-more"]')).click();
await editBtn.click(); // re-render sonrası eski referans`,
    en: `// BUG report: "A test that passed yesterday throws StaleElementReferenceException today."
// Code: the reference is taken BEFORE clicking "Load More", then used AFTER.
const editBtn = await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]'));
await driver.findElement(By.cssSelector('[data-testid="load-more"]')).click();
await editBtn.click(); // the old reference after a re-render`,
  },
  solutionCode: {
    tr: `// FIX: her etkileşimden önce locator'ı YENİDEN sorgula, referansı önceden tutma
await driver.findElement(By.cssSelector('[data-testid="load-more"]')).click();
await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]')).click(); // taze referans`,
    en: `// FIX: re-query the locator before every interaction, do not hold a reference beforehand
await driver.findElement(By.cssSelector('[data-testid="load-more"]')).click();
await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]')).click(); // a fresh reference`,
  },
  hint: {
    tr: '`editBtn` re-render\'dan ÖNCEKİ bir DOM node\'una işaret ediyor. Re-render sonrası bu node belgeye bağlı olmayabilir. Çözüm: referansı önceden SAKLAMA, her tıklamadan hemen önce elementi YENİDEN bul.',
    en: '`editBtn` points to a DOM node from BEFORE the re-render. After the re-render this node may no longer be attached to the document. Fix: do not SAVE the reference beforehand, RE-FIND the element right before every click.',
  },
  successMessage: {
    tr: 'Doğru! Bir referansı "önceden tutup sonra kullanmak" yerine her etkileşimden hemen önce locator\'ı yeniden sorgulamak, re-render\'ların StaleElementReferenceException\'a yol açmasını yapısal olarak önler.',
    en: 'Correct! Re-querying the locator right before every interaction, instead of "holding a reference beforehand and using it later", structurally prevents re-renders from causing a StaleElementReferenceException.',
  },
}

// ─── video-scene: Mülakatta senaryo sorusuna cevap verme akışı (GRUP J) ───────
const interviewAnswerFlowFilm = {
  type: 'video-scene',
  id: 'qaf-interview-answer-flow-film',
  title: {
    tr: '🎬 Mülakatta Senaryo Sorusuna Nasıl Cevap Verilir?',
    en: '🎬 How to Answer a Scenario Question in an Interview',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'question',  emoji: '❓', label: { tr: 'Senaryo sorusu', en: 'Scenario question' },   color: '#0ea5e9' },
    { id: 'symptom',   emoji: '👁️', label: { tr: 'Belirti',        en: 'Symptom' },              color: '#f59e0b' },
    { id: 'cause',     emoji: '🔍', label: { tr: 'Kök neden',       en: 'Root cause' },           color: '#8b5cf6' },
    { id: 'analogy',   emoji: '☕', label: { tr: 'Java analojisi',  en: 'Java analogy' },         color: '#6366f1' },
    { id: 'fix',       emoji: '✅', label: { tr: 'Somut çözüm',     en: 'Concrete fix' },         color: '#22c55e' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir mülakatçı "test bir gün geçti bir gün kaldı, element her deploy\'da değişen bir class kullanıyor" diyor. Zayıf bir cevap sadece "hash class kırılgandır" der. Güçlü bir cevap bu filmdeki 4 adımı TAKİP eder.',
        en: 'An interviewer says "the test passed one day and failed the next, the element uses a class that changes on every deploy". A weak answer just says "a hash class is fragile". A strong answer FOLLOWS the 4 steps in this film.',
      },
      code: { tr: `Soru: "Test flaky, class her deploy'da değişiyor"`, en: `Question: "The test is flaky, the class changes on every deploy"` },
      positions: { question: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Belirtiyi NETLEŞTİR: "sunucudan aynı response geliyor ama locator bazen bulamıyor, bu da CSS Modules/styled-components gibi bir build aracının class\'a hash eklediğini gösteriyor" gibi SPESİFİK bir gözlemle başla.',
        en: 'Step 1 — CLARIFY the symptom: start with a SPECIFIC observation like "the same response comes from the server, but the locator sometimes cannot find it, which suggests a build tool like CSS Modules/styled-components is adding a hash to the class".',
      },
      code: { tr: `"Class hash'i her build'de değişiyor gibi görünüyor"`, en: `"The class hash appears to change on every build"` },
      positions: {
        question: { x: 20, y: 40, opacity: 0.6, scale: 0.9 },
        symptom: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'question', to: 'symptom', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Kök NEDENİ bul: "class stil AMACIYLA vardır, kimlik için değil — build aracı benzersizlik için hash ekler ve bu her build\'de yeniden üretilir" diyerek MEKANİZMAYI açıkla, sadece belirtiyi tekrar etme.',
        en: 'Step 2 — find the root CAUSE: EXPLAIN the mechanism, not just repeat the symptom — "the class exists for the PURPOSE of styling, not identity; the build tool adds a hash for uniqueness and this is regenerated on every build".',
      },
      code: { tr: `"Hash, build aracının benzersizlik için ürettiği bir imza"`, en: `"The hash is a signature the build tool produces for uniqueness"` },
      positions: {
        symptom: { x: 22, y: 40, opacity: 0.6, scale: 0.9 },
        cause: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'symptom', to: 'cause', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Adım 3 — Bir Java ANALOJİSİYLE bağlam kur: "bu, bir nesneyi toString() çıktısına göre karşılaştırmak gibi — biçim değişince ilişki bozulur, oysa kimliği sabit bir id\'ye bağlamalıydık" gibi bir cümle, mülakatçıya derinliğini gösterir.',
        en: 'Step 3 — ground it with a Java ANALOGY: a sentence like "this is like comparing an object by its toString() output — the relationship breaks when the format changes, whereas we should have bound identity to a fixed id" shows the interviewer your depth.',
      },
      code: { tr: `"toString()'e göre eşitlik yapmaya benzer"`, en: `"Similar to equating by toString()"` },
      positions: {
        cause: { x: 22, y: 40, opacity: 0.6, scale: 0.9 },
        analogy: { x: 55, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'cause', to: 'analogy', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Final — Somut bir ÇÖZÜM öner: "developer\'dan data-testid=\'save-bug\' gibi build\'den bağımsız bir kanca isterim" diyerek cevabı SOMUT, uygulanabilir bir adımla bitir. Bu 4 adım (belirti→kök neden→analoji→çözüm) bu SAYFANIN kendi error-dictionary formatının AYNISIdır — düşünme sürecini göstermek, tanım ezberlemekten çok daha değerlidir.',
        en: 'Final — propose a concrete FIX: end the answer with a CONCRETE, actionable step like "I would ask the developer for a build-independent hook like data-testid=\'save-bug\'". This 4-step flow (symptom -> root cause -> analogy -> fix) is the EXACT SAME format as this page\'s own error-dictionary — showing your thinking process is far more valuable than reciting a definition.',
      },
      code: { tr: `"data-testid='save-bug' iste — build'den bağımsız kanca"`, en: `"Ask for data-testid='save-bug' — a build-independent hook"` },
      positions: {
        analogy: { x: 22, y: 32, scale: 0.95 },
        fix: { x: 58, y: 55, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'analogy', to: 'fix', color: '#22c55e' }],
    },
  ],
}

// ─── step-animation: İyi cevap vs zayıf cevap (GRUP J) ────────────────────────
const goodVsWeakAnswerSteps = {
  type: 'step-animation',
  id: 'qaf-j-answer-quality-steps',
  title: { tr: 'Adım Adım: Zayıf Bir Cevap Güçlü Bir Cevaba Nasıl Dönüşür', en: 'Step by Step: How a Weak Answer Becomes a Strong One' },
  steps: [
    { id: 1, icon: '❌', label: { tr: 'Zayıf: sadece tanım tekrarı', en: 'Weak: just repeating a definition' }, detail: { tr: '"NoSuchElementException element bulunamadığında olur" — bu doğru ama mülakatçıya SENİN NASIL DÜŞÜNDÜĞÜNÜ göstermez.', en: '"NoSuchElementException happens when an element is not found" — this is true but shows the interviewer NOTHING about HOW YOU THINK.' } },
    { id: 2, icon: '👁️', label: { tr: 'Güçlü: belirtiyi somutlaştır', en: 'Strong: make the symptom concrete' }, detail: { tr: '"Bu spesifik senaryoda element X koşulu Y tetiklenmeden locate edilmeye çalışılıyor" — SOMUT bir gözlem, genel bir tanım değil.', en: '"In this specific scenario element X is being located before condition Y is triggered" — a CONCRETE observation, not a generic definition.' } },
    { id: 3, icon: '🔍', label: { tr: 'Güçlü: mekanizmayı açıkla', en: 'Strong: explain the mechanism' }, detail: { tr: '"Çünkü framework conditional render\'da elementi DOM\'a hiç eklemiyor" — NEDEN olduğunu, sadece NE olduğunu değil.', en: '"Because the framework never adds the element to the DOM in a conditional render" — explaining WHY it happens, not just WHAT happens.' } },
    { id: 4, icon: '☕', label: { tr: 'Güçlü: Java\'ya bağla', en: 'Strong: connect to Java' }, detail: { tr: '"Bu, bir if bloğunun çalışmamış olmasına benzer — nesne yaratılmamıştır" — mülakatçının bildiği bir kavrama köprü kurar.', en: '"This resembles an if block not having run — the object was not created" — bridges to a concept the interviewer already knows.' } },
    { id: 5, icon: '✅', label: { tr: 'Güçlü: somut adımla bitir', en: 'Strong: end with a concrete step' }, detail: { tr: '"Önce koşulu tetikleyen eylemi yapar, sonra locate ederim" — mülakatçı senin bu problemi GERÇEKTEN çözebileceğini görür.', en: '"I would first perform the action that triggers the condition, then locate" — the interviewer sees you can REALLY solve this problem.' } },
  ],
}

// ─── code-playground: senaryo sorusuna güçlü bir cevap yaz (GRUP J) ───────────
const writeStrongAnswerPlayground = {
  type: 'code-playground',
  relatedTopicId: 'qaf-j-interview',
  id: 'qaf-j-write-strong-answer',
  title: { tr: 'Kendin Dene: Zayıf Cevabı Güçlü Cevaba Dönüştür', en: 'Try It Yourself: Turn a Weak Answer into a Strong One' },
  starterCode: {
    tr: `// Mülakat sorusu: "Bir buton görünüyor ama tıklandığında hiçbir şey olmuyor,
// birkaç yüz milisaniye sonra çalışıyor. Ne olabilir?"
// Zayıf cevap:
// "Bu bir JavaScript sorunu olabilir."
// TODO: bu cevabı belirti->kök neden->Java analojisi->çözüm akışıyla güçlendir.`,
    en: `// Interview question: "A button is visible but clicking it does nothing,
// then it works a few hundred milliseconds later. What could this be?"
// Weak answer:
// "This might be a JavaScript issue."
// TODO: strengthen this answer with the symptom->root cause->Java analogy->fix flow.`,
  },
  solutionCode: {
    tr: `// GÜÇLÜ CEVAP:
// Belirti: SSR/SSG sayfasında HTML ilk yanıtta hazır ama tıklama gecikmeli çalışıyor.
// Kök neden: JS bundle henüz hydrate olmadığı için event listener bağlı değil.
// Java analojisi: constructor çalışmış (alanlar set) ama nesne henüz bir
// listener'a kaydedilmemiş gibi - "var" ama sistemin aktif parçası değil.
// Çözüm: developer'dan data-hydrated="true" işareti isterim ve tıklamadan
// önce bunu beklerim - sadece "visible" olmak yeterli değil.`,
    en: `// STRONG ANSWER:
// Symptom: on an SSR/SSG page the HTML is ready in the first response but
// the click works only after a delay.
// Root cause: the JS bundle has not hydrated yet, so the event listener is not attached.
// Java analogy: like a constructor having run (fields set) but the object not
// yet registered with a listener - it "exists" but is not an active part of the system.
// Fix: I would ask the developer for a data-hydrated="true" marker and wait
// for it before clicking - being merely "visible" is not enough.`,
  },
  hint: {
    tr: 'Bu senaryo GRUP E4\'teki hydration dersinin tam karşılığıdır. Cevabı 4 parçaya böl: SOMUT bir belirti tanımla, MEKANİZMAYI (hydration) açıkla, bir Java analojisiyle bağla, ve UYGULANABİLİR bir çözüm (data-hydrated işareti) öner.',
    en: 'This scenario is the exact counterpart of the hydration lesson in GROUP E4. Break the answer into 4 parts: define a CONCRETE symptom, explain the MECHANISM (hydration), connect it with a Java analogy, and propose an ACTIONABLE fix (a data-hydrated marker).',
  },
  successMessage: {
    tr: 'Doğru! Bu 4 parçalı yapı (belirti→kök neden→analoji→çözüm) mülakatçıya sadece "bildiğini" değil, "gerçek bir problemi NASIL çözdüğünü" gösterir — bu sayfadaki her mülakat sorusunun cevabı bu kalıbı izler.',
    en: 'Correct! This 4-part structure (symptom -> root cause -> analogy -> fix) shows the interviewer not just "what you know" but "HOW you solve a real problem" — every interview answer on this page follows this pattern.',
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
          tr: 'DOM bir AİLE AĞACIDIR: her element bir düğüm (node), içindeki elementler onun çocukları, sardığı elementler ebeveynleri. `<li>` bir element node, içindeki "OPEN" yazısı bir text node, `class="..."` ise bir attribute node. Neden bu ayrım locator için önemli? Çünkü `//li/span` gibi bir locator "li\'nin doğrudan çocuğu olan span" der — ağaçtaki akrabalık ilişkisini kullanır; ağaç yapısını bilmeyen tester ilişkisel locator kuramaz. Java analojisi: iç içe nesnelerden oluşan bir nesne grafiği gibidir — parent.getChild() zinciri. QA bağlamında: bir satırı "içinde X yazan satır" diye ilişkisel bulmak, index\'e (`li[3]`) bağlanmaktan çok daha dayanıklıdır çünkü sıralama değişince index kayar.',
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
          tr: 'CSSOM, DOM\'un stil ikizidir: tarayıcı CSS kurallarını da bir ağaca çevirir, sonra DOM ile CSSOM birleşip Render Tree\'yi kurar. Kritik nokta: `display:none` olan bir element DOM\'da VARDIR ama Render Tree\'de YOKTUR — yani locate edilebilir ama tıklanamaz/görünmez. Neden testerı ilgilendirir? "Element bulundu ama ElementNotInteractable" hatasının kökü tam budur: DOM\'da var, render tree\'de yok. Java analojisi: bir nesne bellekte var (DOM) ama UI thread\'inde çizilmemiş (render tree) gibi. QA bağlamında: görünürlük ile varlık iki ayrı kavramdır ve doğru bekleme stratejisi (visible mi, present mi?) bu ayrıma dayanır.',
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
          tr: '"Render" tek bir an değil, 5 adımlı bir MONTAJ HATTIDIR: Parse (HTML→DOM), Style (CSS→CSSOM), Layout (her kutunun yeri/boyutu hesaplanır), Paint (pikseller boyanır), Composite (katmanlar birleştirilir). Neden bir tester bu adımları bilmeli? Çünkü "sayfa yüklendi" dediğin an bu hattın neresinde olduğun, elementin tıklanabilir olup olmadığını belirler — Layout bitmeden bir butonun konumu yoktur, tıklama ıskalar. Java analojisi: bir isteğin request→controller→service→repository→response pipeline\'ı gibi, her adım bir öncekine bağlıdır. QA bağlamında: flaky test\'lerin büyük kısmı "hat henüz bitmemişken locate/tıklama" yüzündendir.',
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
          tr: 'Reflow, sayfadaki bir değişiklik (yeni bir BugCard eklenmesi gibi) yüzünden tarayıcının Layout\'u yeniden hesaplamasıdır; Repaint ise sadece görünümün (renk gibi) yeniden boyanmasıdır. Neden önemli? Reflow sırasında elementlerin konumu bir an oynar — testin tam o anda locate ettiği element "bir an var bir an yok" gibi davranabilir. Java analojisi: bir koleksiyonu iterasyon sırasında değiştirince oluşan ConcurrentModification hissi gibi — yapı altından kayar. QA bağlamında: liste dolarken/animasyon oynarken locate etmek StaleElementReference\'ın klasik kaynağıdır; doğru refleks stabil hale gelmeyi beklemektir.',
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
          tr: 'DevTools → Elements paneli, testerın en güçlü silahıdır: kaynak dosyayı DEĞİL, o anki canlı DOM\'u gösterir. Bir elemente sağ tıklayıp "Copy → Copy selector" diyebilir, ama bu genelde kırılgan bir CSS yolu üretir — panelde asıl yapılması gereken elementin attribute\'larına bakıp EN DAYANIKLI olanı (data-testid, role, stabil id) seçmektir. Neden önemli? Çünkü locator kalitesi, hangi kaynağa baktığınla başlar. Java analojisi: debugger\'da çalışan programın canlı değişken durumuna bakmak gibi — kaynak koda değil, o anki gerçeğe. QA bağlamında: locator\'ını Elements\'ten türetmek, kör "Copy selector"a güvenmekten çok daha sağlam testler üretir.',
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

  // ══ GRUP C — CSS: Neden Locator'ı Kırar ═════════════════════════════════════
  {
    title: { tr: '🎨 CSS: Neden Locator\'ı Kırar', en: '🎨 CSS: Why It Breaks Locators' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎨',
        content: {
          tr: 'CSS, bir binanın BOYA ve DEKORASYON katmanıdır — ve tam da bu yüzden locator için tehlikeli bir zemindir. Class\'lar aslında stil için vardır; developer bir rengi değiştirdiğinde veya modern araçlar (CSS Modules, styled-components) her build\'de class\'a rastgele bir hash (`__x7f2a`) eklediğinde, class\'a bağlı locator sessizce kırılır. Neden bu kadar sık başımıza gelir? Çünkü DevTools\'ta gördüğün ilk şey class\'tır ve "Copy selector" genelde onu üretir — en cazip ama en kırılgan seçim. Java analojisi: bir nesneyi `toString()` çıktısına göre karşılaştırmak gibi — biçim değişince ilişki bozulur, oysa kimliği sabit bir id\'ye bağlamalıydın. QA bağlamında: class\'ın stil için var olduğunu bilen tester ona locator olarak GÜVENMEZ; bunun yerine developer\'dan data-testid ister.',
          en: 'CSS is the PAINT and DECORATION layer of a building — and that is exactly why it is dangerous ground for a locator. Classes exist for styling; when a developer changes a color, or modern tools (CSS Modules, styled-components) add a random hash (`__x7f2a`) to the class on every build, a locator bound to that class breaks silently. Why does this happen to us so often? Because the first thing you see in DevTools is the class, and "Copy selector" usually produces it — the most tempting yet most fragile choice. Java analogy: it is like comparing an object by its `toString()` output — change the format and the relationship breaks, when you should have bound identity to a stable id. In a QA context: a tester who knows the class exists for styling does NOT trust it as a locator; instead they ask the developer for a data-testid.',
        },
      },

      // ── C1: Selector Mantığı ──
      {
        type: 'heading',
        text: { tr: '🧩 C1. Selector Mantığı: element, class, id, descendant, child, attribute', en: '🧩 C1. Selector Logic: element, class, id, descendant, child, attribute' },
      },
      {
        type: 'simple-box',
        emoji: '🧩',
        content: {
          tr: 'CSS selector\'lar bir POSTA ADRESİ hassasiyeti gibidir: element selector (`button`) = "şehirdeki herhangi bir ev", class selector (`.card`) = "bu mahalledeki herkes", id selector (`#checkout`) = "tam bu adres", descendant (`ul li`) = "bu sokaktaki herhangi bir katta", child (`ul > li`) = "bu sokağın doğrudan üzerindeki evler", attribute (`[data-testid]`) = "üzerinde şu tabelayı taşıyan ev". Peki bu ayrımı bilmek neden işine yarar? Çünkü CSS selector mantığı Playwright/Cypress\'in `.locator()` metoduna neredeyse BİREBİR geçer — CSS okuyabilen tester otomasyon syntax\'ını da okur. Java analojisi: SQL\'de `WHERE` cümlesindeki tablo ilişkilerini (JOIN zinciri) zincirlemek gibi — selector\'lar da HTML ağacındaki torun/çocuk ilişkilerini zincirler. QA bağlamında: descendant selector (boşluk) fazla geniştir ve yanlış-pozitif (istenmeyen iç içe elemanı da yakalama) riski taşır; child selector (`>`) daha dar ve genelde daha güvenlidir.',
          en: 'CSS selectors are like the precision of a POSTAL ADDRESS: an element selector (`button`) = "any house in the city", a class selector (`.card`) = "everyone in this neighborhood", an id selector (`#checkout`) = "this exact address", descendant (`ul li`) = "anywhere on this street, at any depth", child (`ul > li`) = "the houses directly on this street", attribute (`[data-testid]`) = "the house carrying this specific sign". So why is knowing this distinction useful? Because CSS selector logic carries over almost VERBATIM to Playwright/Cypress\'s `.locator()` method — a tester who can read CSS can read automation syntax too. Java analogy: like chaining table relationships (a JOIN chain) in a SQL `WHERE` clause — selectors likewise chain descendant/child relationships in the HTML tree. In QA context: a descendant selector (a space) is too wide and carries a false-positive risk (accidentally catching an unwanted nested element); a child selector (`>`) is narrower and usually safer.',
        },
      },
      selectorRangeSteps,
      {
        type: 'quiz',
        question: {
          tr: 'BugCard\'ın içinde bir "yorumlar" alt listesi var ve o da `<li>` elemanları içeriyor. `ul li` ile `ul > li` arasında hangi risk farkı vardır?',
          en: 'Inside a BugCard there is a "comments" sub-list that also contains `<li>` elements. What is the risk difference between `ul li` and `ul > li`?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiç fark yok, ikisi de aynı elementleri bulur', en: 'No difference, both find the same elements' } },
          { id: 'b', text: { tr: '`ul li` iç içe alt listedeki li\'leri de yanlışlıkla eşleştirebilir; `ul > li` sadece doğrudan çocukları eşleştirir', en: '`ul li` can mistakenly match the li\'s in the nested sub-list too; `ul > li` matches only direct children' } },
          { id: 'c', text: { tr: '`ul > li` daha yavaş çalışır', en: '`ul > li` runs slower' } },
          { id: 'd', text: { tr: '`ul li` sadece ilk elemanı bulur', en: '`ul li` finds only the first element' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Descendant selector (`ul li`, boşluklu) ağacın HER seviyesinde arar, bu yüzden iç içe bir alt listeyi de yakalayabilir. Child selector (`ul > li`) sadece BİR seviye altına bakar — tek seviyeli BugCard listeleri için daha güvenlidir.',
          en: 'A descendant selector (`ul li`, space-separated) searches EVERY level of the tree, so it can also catch a nested sub-list. A child selector (`ul > li`) only looks ONE level down — safer for single-level BugCard lists.',
        },
        retryQuestion: {
          question: {
            tr: '`li[data-severity="HIGH"]` gibi bir attribute selector\'ı, `li.severity-high` gibi bir class selector\'ına kıyasla neden genelde daha güvenilir kabul edilir?',
            en: 'Why is an attribute selector like `li[data-severity="HIGH"]` generally considered more reliable than a class selector like `li.severity-high`?',
          },
          options: [
            { id: 'a', text: { tr: 'Attribute selector\'lar her zaman daha hızlıdır', en: 'Attribute selectors are always faster' } },
            { id: 'b', text: { tr: '`data-*` attribute\'ları genelde iş verisini taşımak için konur ve stilden bağımsızdır; class ise stil amaçlıdır ve tasarımla birlikte değişir', en: '`data-*` attributes are usually placed to carry business data and are independent of style; class exists for styling and changes with the design' } },
            { id: 'c', text: { tr: 'İkisi de aynı derecede güvenilirdir', en: 'Both are equally reliable' } },
            { id: 'd', text: { tr: 'class selector\'lar CSS\'te kullanılamaz', en: 'class selectors cannot be used in CSS' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`data-severity` gibi bir attribute genelde bir İŞ DEĞERİNİ (severity=HIGH) yansıtır ve tasarım değişikliklerinden etkilenmez; `severity-high` gibi bir class ise stil amacıyla vardır ve tasarım güncellemesinde adı değişebilir.',
            en: 'An attribute like `data-severity` usually reflects a BUSINESS VALUE (severity=HIGH) and is unaffected by design changes; a class like `severity-high` exists for styling and its name can change in a design update.',
          },
        },
      },

      // ── C2: Specificity ve Cascade ──
      {
        type: 'heading',
        text: { tr: '📶 C2. Specificity ve Cascade: Developer Neden Class\'ı Değiştirir', en: '📶 C2. Specificity and Cascade: Why a Developer Changes the Class' },
      },
      {
        type: 'simple-box',
        emoji: '📶',
        content: {
          tr: 'Specificity, bir MAHKEME KARARI hiyerarşisi gibidir: element selector\'ı bir yerel kural (puan: 1), class bir belediye kararı (puan: 10), id bir mahkeme kararı (puan: 100), inline style ise doğrudan cumhurbaşkanlığı kararnamesi (puan: 1000) — üstteki her zaman alttakini EZER. Peki bu neden bir tester\'ı ilgilendirir? Çünkü bir developer bir stili "ezmek" istediğinde genelde YENİ bir class ekler (daha spesifik bir kombinasyon) veya mevcut class\'ı değiştirir — bu da locator olarak kullandığın class\'ın CASCADE savaşının bir yan etkisi olarak değişmesi demektir. Java analojisi: method overriding\'de en spesifik (alt sınıftaki) metodun çalışması gibi — CSS\'te de en spesifik selector kazanır. QA bağlamında: class\'ların "kimlik" değil "stil savaşı" aracı olduğunu bilen tester, bir class\'ın CSS çakışması çözülürken değişebileceğini öngörür ve ona güvenmez.',
          en: 'Specificity is like a COURT RULING hierarchy: an element selector is a local rule (score: 1), a class is a municipal decision (score: 10), an id is a court ruling (score: 100), and inline style is a direct presidential decree (score: 1000) — each level ALWAYS overrides the one below it. So why does this concern a tester? Because when a developer wants to "override" a style, they usually add a NEW class (a more specific combination) or change the existing one — meaning the class you use as a locator can change as a SIDE EFFECT of a cascade battle. Java analogy: like method overriding, where the most specific (subclass) method runs — in CSS the most specific selector wins too. In QA context: a tester who knows classes are a "styling battle" tool, not an "identity" tool, anticipates that a class can change while a CSS conflict is being resolved, and does not trust it.',
        },
      },
      specificityTable,
      {
        type: 'quiz',
        question: {
          tr: 'Bir developer, `.btn-primary` stilini belirli bir sayfada "ezmek" (override) için `.bug-modal .btn-primary` gibi daha spesifik bir selector ekliyor. Bu, tester için ne anlama gelir?',
          en: 'A developer adds a more specific selector like `.bug-modal .btn-primary` to "override" the `.btn-primary` style on a particular page. What does this mean for a tester?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiçbir şey, class isimleri asla değişmez', en: 'Nothing, class names never change' } },
          { id: 'b', text: { tr: 'CSS çakışmalarını çözmek için class YAPISININ değişebileceği, bu yüzden class\'a bağlı locator\'ların bu tür refactor\'larda risk altında olduğu', en: 'The class STRUCTURE can change to resolve CSS conflicts, so class-bound locators are at risk during this kind of refactor' } },
          { id: 'c', text: { tr: 'Sadece performans etkilenir', en: 'Only performance is affected' } },
          { id: 'd', text: { tr: 'data-testid de bu değişiklikten etkilenir', en: 'data-testid is also affected by this change' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Specificity/cascade savaşlarını çözmek, developer\'ları class YAPISINI (yeni class ekleme, birleştirme, yeniden adlandırma) değiştirmeye iter. `data-testid` bu savaşın tamamen dışındadır çünkü stil amaçlı değildir — bu yüzden bu tür refactor\'lardan etkilenmez.',
          en: 'Resolving specificity/cascade battles pushes developers to change the class STRUCTURE (adding a class, merging, renaming). `data-testid` sits entirely outside this battle because it is not for styling — so it is unaffected by this kind of refactor.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tester "inline style (`style="color:red"`) her zaman kazandığı için bunu locator olarak kullanabilirim" diyor. Bu düşüncedeki hata nedir?',
            en: 'A tester says "since inline style (`style="color:red"`) always wins, I can use it as a locator". What is the flaw in this thinking?',
          },
          options: [
            { id: 'a', text: { tr: 'Doğru bir düşünce, inline style en iyi locator\'dır', en: 'It is a correct idea, inline style is the best locator' } },
            { id: 'b', text: { tr: '"Kazanmak" (specificity) ile "kimlik taşımak" farklı şeylerdir; inline style genelde dinamik/koşullu değer taşır (örn. hesaplanan bir renk) ve stabil değildir', en: '"Winning" (specificity) and "carrying identity" are different things; inline style usually carries a dynamic/conditional value (e.g. a computed color) and is not stable' } },
            { id: 'c', text: { tr: 'Inline style CSS\'te desteklenmez', en: 'Inline style is not supported in CSS' } },
            { id: 'd', text: { tr: 'Sadece id selector\'lar kazanabilir', en: 'Only id selectors can win' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Specificity puanı yüksek olmak, o değerin STABİL olduğu anlamına gelmez — tam tersine inline style\'lar genelde JS ile hesaplanan (severity rengine göre değişen gibi) dinamik değerlerdir ve locator için class kadar (hatta daha) güvenilmezdir.',
            en: 'Having a high specificity score does not mean the value is STABLE — on the contrary, inline styles are usually dynamic values computed by JS (like changing by severity color) and are just as (or more) unreliable as a locator as class.',
          },
        },
      },

      // ── C3: CSS Modules / Scoped CSS ──
      {
        type: 'heading',
        text: { tr: '🎲 C3. CSS Modules / Scoped CSS: `Btn_btn__x7f2a` Hash\'i Nereden Gelir', en: '🎲 C3. CSS Modules / Scoped CSS: Where the `Btn_btn__x7f2a` Hash Comes From' },
      },
      {
        type: 'simple-box',
        emoji: '🎲',
        content: {
          tr: 'CSS Modules, her dosyaya kendi ÖZEL SOYADINI veren bir NÜFUS MÜDÜRLÜĞÜ gibidir: iki farklı component\'te aynı `.btn` ismi kullanılsa bile, her biri kendi dosyasına özgü bir "soyad" (hash) alır ve asla birbirine karışmaz. Peki bu neden testerı ilgilendirir? Çünkü bu soyad OTOMATİK ve RASTGELE üretilir ve genelde her `npm run build` çalıştığında YENİDEN üretilir — dünkü `.Btn_btn__x7f2a` bugün `.Btn_btn__z9k1p` olabilir. Java analojisi: derleyicinin her derlemede farklı bir iç (senkron/gizli) isim ürettiği anonim sınıflar gibi — dışarıdan görünen davranış aynıdır ama iç isim güvenilir bir referans değildir. QA bağlamında: bu hash\'e bağlanan HERHANGİ bir test, bir sonraki deploy\'da SESSİZCE (derleme hatası vermeden, sadece test çalışma zamanında) kırılır — aşağıdaki film bu mekanizmayı adım adım gösterir.',
          en: 'CSS Modules is like a CIVIL REGISTRY OFFICE that gives each file its own PRIVATE SURNAME: even if two different components both use the name `.btn`, each gets a surname (hash) unique to its own file and they never get mixed up. So why does this concern a tester? Because this surname is generated AUTOMATICALLY and RANDOMLY, usually REGENERATED on every `npm run build` — yesterday\'s `.Btn_btn__x7f2a` can become `.Btn_btn__z9k1p` today. Java analogy: like anonymous classes where the compiler generates a different internal (synthetic/hidden) name on every compile — the externally visible behavior is the same, but the internal name is not a reliable reference. In QA context: ANY test bound to this hash breaks SILENTLY on the next deploy (no compile error, only a test-runtime failure) — the film below walks through this mechanism step by step.',
        },
      },
      classHashChangeFilm,
      {
        type: 'code',
        language: 'jsx',
        code: {
          tr: `// SÜTUN 1 — Developer'ın yazdığı kaynak (BugCard.module.css + JSX)
/* BugCard.module.css */
.badge { padding: 4px 8px; border-radius: 4px; }

// BugCard.jsx
import styles from './BugCard.module.css'
<span className={styles.badge}>{bug.status}</span>

// SÜTUN 2 — Tarayıcıda oluşan GERÇEK DOM
// <span class="BugCard_badge__k3n9">OPEN</span>
//   ← __k3n9 HER build'de yeniden üretilir`,
          en: `// COLUMN 1 — The source the developer wrote (BugCard.module.css + JSX)
/* BugCard.module.css */
.badge { padding: 4px 8px; border-radius: 4px; }

// BugCard.jsx
import styles from './BugCard.module.css'
<span className={styles.badge}>{bug.status}</span>

// COLUMN 2 — The REAL DOM produced in the browser
// <span class="BugCard_badge__k3n9">OPEN</span>
//   <- __k3n9 is REGENERATED on every build`,
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
              tr: '`.badge` — developer sade bir CSS Module class ismi yazdı. Dosyada "badge" okunur ve masum görünür.',
              en: '`.badge` — the developer wrote a plain CSS Module class name. In the file it reads "badge" and looks innocent.',
            },
          },
          {
            icon: '2️⃣',
            label: { tr: 'Gerçek DOM (ne oluştu)', en: 'Real DOM (what was produced)' },
            desc: {
              tr: '`class="BugCard_badge__k3n9"` — build aracı benzersizlik için bir hash ekledi; bu hash build sırasına/içeriğe bağlıdır ve yeniden üretilebilir.',
              en: '`class="BugCard_badge__k3n9"` — the build tool added a hash for uniqueness; this hash depends on build order/content and can be regenerated.',
            },
          },
          {
            icon: '3️⃣',
            label: { tr: 'Tester\'ın kararı', en: 'The tester\'s decision' },
            desc: {
              tr: '❌ `.BugCard_badge__k3n9`\'a locate ETME (hash değişir). ✅ `getByTestId`/`getByRole` kullan. 💬 Developer\'dan iste: `data-testid="status-badge"`.',
              en: '❌ Do NOT locate by `.BugCard_badge__k3n9` (the hash changes). ✅ Use `getByTestId`/`getByRole`. 💬 Ask the developer for: `data-testid="status-badge"`.',
            },
          },
        ],
      },
      {
        type: 'simple-box',
        emoji: '🎯',
        content: {
          tr: 'Developer\'dan Ne İste: *"StatusBadge component\'ine `data-testid=\'status-badge\'` ekler misin? CSS Modules class\'ı her build\'de yeniden hash\'liyor, o yüzden ona bağlanamıyorum — build\'den bağımsız bir kanca gerekiyor."* — Bu cümle sorunu (hash\'in build bağımlılığı) doğru teşhis eder ve somut bir çözüm ister. Not: bu, GRUP F\'deki React panosuyla aynı temel dersi PEKİŞTİRİR ama farklı bir açıdan bakar — GRUP F "React kaynağını okuma" becerisine, burası ise "build ARACININ hash\'i NASIL ürettiği" mekanizmasına odaklanır.',
          en: 'What to Ask the Developer: *"Could you add `data-testid=\'status-badge\'` to the StatusBadge component? The CSS Modules class gets rehashed on every build, so I cannot bind to it — I need a hook independent of the build."* — This sentence correctly diagnoses the problem (the hash\'s build dependency) and asks for a concrete fix. Note: this REINFORCES the same core lesson as the React board in GROUP F, but from a different angle — GROUP F focuses on the "reading React source" skill, this one focuses on the mechanism of HOW the build TOOL produces the hash.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'CSS Modules hash\'i (`__x7f2a`) genelde neye göre üretilir ve bu neden onu bir locator kimliği olarak GÜVENİLMEZ kılar?',
          en: 'What is a CSS Modules hash (`__x7f2a`) usually generated from, and why does this make it UNTRUSTWORTHY as a locator identity?',
        },
        options: [
          { id: 'a', text: { tr: 'Kullanıcının tarayıcı diline göre — dil değişince değişir', en: 'By the user\'s browser language — it changes when the language changes' } },
          { id: 'b', text: { tr: 'Dosya yolu/içeriği veya build sırasına göre — build tekrarlandığında YENİDEN üretilebilir', en: 'By the file path/content or build order — it can be REGENERATED whenever the build re-runs' } },
          { id: 'c', text: { tr: 'Sunucunun IP adresine göre', en: 'By the server\'s IP address' } },
          { id: 'd', text: { tr: 'Rastgele değil, her zaman sabittir', en: 'It is not random, it is always fixed' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Hash, genelde dosya yolu + içerik (veya build sırası) üzerinden hesaplanır; bu girdilerden biri değişince (küçük bir kod değişikliği bile) hash YENİDEN üretilir. Bu, hash\'i bir "kimlik" değil, "o anki build\'e özgü bir imza" yapar.',
          en: 'The hash is usually computed from the file path + content (or build order); when any of these inputs change (even a small code change), the hash is REGENERATED. This makes the hash not an "identity" but "a signature specific to that particular build".',
        },
        retryQuestion: {
          question: {
            tr: 'Bir developer "biz hash\'i sabitlemek için `webpack.config.js`\'te `localIdentName` ayarını değiştirdik, artık class isimleri build\'ler arası SABİT" diyor. Bu durumda tester\'ın yaklaşımı ne olmalı?',
            en: 'A developer says "we set `localIdentName` in `webpack.config.js` to make the hash fixed, so class names are now STABLE across builds". What should the tester\'s approach be in this case?',
          },
          options: [
            { id: 'a', text: { tr: 'Yine de data-testid\'yi tercih et; class stil AMACIYLA vardır ve gelecekte tasarım/config değişebilir', en: 'Still prefer data-testid; the class exists for a styling PURPOSE and the design/config may change in the future' } },
            { id: 'b', text: { tr: 'Artık class\'a güvenle bağlanabilirsin, sorun tamamen çözüldü', en: 'You can now safely bind to the class, the problem is fully solved' } },
            { id: 'c', text: { tr: 'localIdentName bir CSS özelliği değildir, bu mümkün değildir', en: 'localIdentName is not a CSS property, this is not possible' } },
            { id: 'd', text: { tr: 'Bu ayar sadece production\'da çalışır', en: 'This setting only works in production' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Config ile hash\'i sabitlemek TEKNİK olarak mümkündür ama class hâlâ AMACI itibariyle stildir — bir tasarım güncellemesinde isim değişebilir veya config bir gün geri alınabilir. Kimlik taşıma amacıyla var OLMAYAN bir alana bel bağlamak yerine data-testid tercih edilmeli.',
            en: 'Fixing the hash via config is TECHNICALLY possible, but the class is still styling BY PURPOSE — the name can change in a design update, or the config could be reverted one day. Rather than relying on a field that does NOT exist to carry identity, data-testid should be preferred.',
          },
        },
      },

      // ── C4: Utility CSS (Tailwind) ──
      {
        type: 'heading',
        text: { tr: '🧵 C4. Utility CSS (Tailwind): `class="px-3 py-2 bg-blue-500"` Neden İşe Yaramaz', en: '🧵 C4. Utility CSS (Tailwind): Why `class="px-3 py-2 bg-blue-500"` Does Not Work' },
      },
      {
        type: 'simple-box',
        emoji: '🧵',
        content: {
          tr: 'Utility CSS (Tailwind), bir OFİS ÜNİFORMASI gibidir: `px-3`, `bg-blue-500` gibi class\'lar tek bir kişiye özgü değildir, aynı ÜNİFORMAYI (aynı padding/rengi) giyen HERKESTE aynı görünür. Peki neden bu, locator için özellikle kötü bir seçenek? Çünkü Tailwind class\'ları PAYLAŞIMLI tasarım kararlarıdır — sayfada onlarca elementte aynı `bg-blue-500` olabilir (kaçını eşleştirdiğin belirsizleşir) VE tasarım sistemi rengi değiştirirse (blue-500 → indigo-500) TÜM sitede aynı anda kırılır. Java analojisi: bir dizi nesnenin hepsinde aynı sabit `enum` değerini kullanıp bu değere göre TEK bir nesneyi ayırt etmeye çalışmak gibi — enum bir kimlik değil, bir kategoridir. QA bağlamında: utility class\'lar tasarımı tarif eder, kimlik taşımaz; tekil bir elementi işaretlemek için HER ZAMAN data-testid gibi özel bir kanca gerekir.',
          en: 'Utility CSS (Tailwind) is like an OFFICE UNIFORM: classes like `px-3`, `bg-blue-500` are not unique to one person, they look the same on EVERYONE wearing the same UNIFORM (the same padding/color). So why is this an especially poor choice for a locator? Because Tailwind classes are SHARED design decisions — the page can have dozens of elements with the same `bg-blue-500` (which one you matched becomes ambiguous), AND if the design system changes the color (blue-500 -> indigo-500) it breaks site-WIDE all at once. Java analogy: like trying to distinguish a SINGLE object in an array by the same constant `enum` value shared by all of them — an enum is not an identity, it is a category. In QA context: utility classes describe design, they carry no identity; uniquely marking one element ALWAYS requires a dedicated hook like data-testid.',
        },
      },
      utilityClassTable,
      tailwindLocatorPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Bir sayfada 12 farklı buton `class="px-3 py-2 bg-blue-500 rounded"` kullanıyor. `page.locator(\'.bg-blue-500\')` yazan bir test ne ile karşılaşır?',
          en: 'A page has 12 different buttons using `class="px-3 py-2 bg-blue-500 rounded"`. What does a test written as `page.locator(\'.bg-blue-500\')` encounter?',
        },
        options: [
          { id: 'a', text: { tr: 'Sadece doğru butonu bulur', en: 'It finds only the correct button' } },
          { id: 'b', text: { tr: '12 element eşleşir — Playwright "strict mode violation" gibi bir hata verir çünkü hangisini kastettiğin belirsizdir', en: '12 elements match — Playwright throws something like a "strict mode violation" because which one you meant is ambiguous' } },
          { id: 'c', text: { tr: 'Hiçbir element bulunamaz', en: 'No element is found' } },
          { id: 'd', text: { tr: 'Test otomatik olarak ilk butonu seçer, sorun çıkmaz', en: 'The test automatically picks the first button, no problem arises' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Utility class paylaşımlı bir tasarım kararı olduğundan sayfadaki BİRÇOK elementte aynı anda bulunabilir. Modern araçlar (Playwright strict mode) birden fazla eşleşmeyi SESSİZCE ilk elemente düşürmez, açık bir hata fırlatır — bu iyi bir şeydir çünkü belirsizliği gizlemez.',
          en: 'Because a utility class is a shared design decision, it can exist on MANY elements on the page simultaneously. Modern tools (Playwright strict mode) do not SILENTLY fall back to the first match, they throw an explicit error — which is a good thing because it does not hide the ambiguity.',
        },
        retryQuestion: {
          question: {
            tr: 'Tasarım sistemi ekibi "artık mavi yerine indigo kullanıyoruz" diyerek `bg-blue-500`\'u sitede TÜM butonlarda `bg-indigo-500` ile değiştirdi. Class\'a bağlı locator\'lar için sonuç ne olur?',
            en: 'The design system team says "we now use indigo instead of blue" and replaces `bg-blue-500` with `bg-indigo-500` on ALL buttons site-wide. What is the consequence for class-bound locators?',
          },
          options: [
            { id: 'a', text: { tr: 'Hiçbir şey olmaz, class isimleri her zaman sabittir', en: 'Nothing happens, class names are always fixed' } },
            { id: 'b', text: { tr: '`.bg-blue-500`\'a bağlı TÜM testler aynı anda ve sessizce kırılır — tek bir tasarım kararı yüzlerce testi etkileyebilir', en: 'ALL tests bound to `.bg-blue-500` break simultaneously and silently — a single design decision can affect hundreds of tests' } },
            { id: 'c', text: { tr: 'Sadece o butonun testi etkilenir, diğerleri etkilenmez', en: 'Only that button\'s test is affected, others are not' } },
            { id: 'd', text: { tr: 'data-testid\'ler de bu değişiklikten etkilenir', en: 'data-testid values are also affected by this change' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Utility class\'lar PAYLAŞIMLI olduğu için tek bir tasarım kararı (renk değişimi) siteyi geneline yayılır ve o class\'a bağlı HER test aynı anda kırılır — bu, utility CSS\'in "toplu kırılganlık" riskidir. data-testid tasarım kararlarından tamamen izole olduğu için etkilenmez.',
            en: 'Because utility classes are SHARED, a single design decision (a color change) spreads site-wide and EVERY test bound to that class breaks at once — this is utility CSS\'s "mass fragility" risk. data-testid, being fully isolated from design decisions, is unaffected.',
          },
        },
      },

      // ── C5: Runtime Styling (styled-components/emotion) ──
      {
        type: 'heading',
        text: { tr: '⚡ C5. Runtime Styling (styled-components/emotion): Her Render\'da Değişen Class', en: '⚡ C5. Runtime Styling (styled-components/emotion): a Class That Changes Every Render' },
      },
      {
        type: 'simple-box',
        emoji: '⚡',
        content: {
          tr: 'CSS Modules hash\'i BUILD ZAMANINDA (bir kez, `npm run build` sırasında) üretilirken, styled-components/emotion gibi "runtime CSS-in-JS" araçları class\'ı TARAYICIDA, JS ÇALIŞIRKEN üretir — bu, bir RESTORANDA her siparişte YENİDEN yazılan bir fiş numarası gibidir: sipariş (prop) değişirse fiş numarası da değişir. Peki bu neden CSS Modules\'tan bile daha riskli? Çünkü bazı yapılandırmalarda class, component\'in ALDIĞI PROP\'A göre de değişebilir (`severity="HIGH"` için farklı, `severity="LOW"` için farklı bir class üretilebilir) — yani aynı component\'in İKİ farklı örneği bile farklı class taşıyabilir. Java analojisi: her çağrıda farklı bir hash üreten, override edilmemiş `Object.hashCode()`\'a güvenmek gibi — referans her seferinde değişir. QA bağlamında: bu araçlarla üretilen class\'lara (`sc-bdfBwQ kxYz` gibi) ASLA locate etme; bu grubun panosu bu kararı somutlaştırır.',
          en: 'While a CSS Modules hash is generated at BUILD TIME (once, during `npm run build`), "runtime CSS-in-JS" tools like styled-components/emotion generate the class IN THE BROWSER, WHILE JS RUNS — like a RESTAURANT reissuing a ticket number on every order: if the order (the prop) changes, the ticket number changes too. So why is this even riskier than CSS Modules? Because in some setups the class can also change based on the PROP the component RECEIVES (`severity="HIGH"` can produce a different class than `severity="LOW"`) — meaning even TWO instances of the same component can carry different classes. Java analogy: like relying on an unoverridden `Object.hashCode()` that produces a different hash on every call — the reference changes every time. In QA context: NEVER locate by classes produced by these tools (like `sc-bdfBwQ kxYz`); this group\'s board makes that decision concrete.',
        },
      },
      {
        type: 'code',
        language: 'jsx',
        code: {
          tr: `// SÜTUN 1 — Developer'ın yazdığı kaynak (styled-components)
const Badge = styled.span\`
  background: \${props => props.severity === 'HIGH' ? 'red' : 'gray'};
\`
<Badge severity="HIGH">HIGH</Badge>

// SÜTUN 2 — Tarayıcıda RUNTIME'da üretilen DOM
// <span class="sc-bdfBwQ kxYz">HIGH</span>
//   ← "kxYz" kısmı severity prop'una göre DEĞİŞEBİLİR`,
          en: `// COLUMN 1 — The source the developer wrote (styled-components)
const Badge = styled.span\`
  background: \${props => props.severity === 'HIGH' ? 'red' : 'gray'};
\`
<Badge severity="HIGH">HIGH</Badge>

// COLUMN 2 — The DOM produced at RUNTIME in the browser
// <span class="sc-bdfBwQ kxYz">HIGH</span>
//   <- the "kxYz" part CAN CHANGE based on the severity prop`,
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
              tr: '`styled.span\\`...\\`` — stil bir JS template literal\'ı içinde tanımlandı; prop\'a göre koşullu bir arka plan rengi var.',
              en: '`styled.span\\`...\\`` — the style is defined inside a JS template literal; it has a conditional background color based on a prop.',
            },
          },
          {
            icon: '2️⃣',
            label: { tr: 'Gerçek DOM (ne oluştu)', en: 'Real DOM (what was produced)' },
            desc: {
              tr: '`class="sc-bdfBwQ kxYz"` — birinci parça component kimliği (nispeten sabit), ikinci parça (`kxYz`) RUNTIME\'da, prop kombinasyonuna göre üretildi.',
              en: '`class="sc-bdfBwQ kxYz"` — the first token is the component identity (relatively stable), the second (`kxYz`) was generated at RUNTIME based on the prop combination.',
            },
          },
          {
            icon: '3️⃣',
            label: { tr: 'Tester\'ın kararı', en: 'The tester\'s decision' },
            desc: {
              tr: '❌ `.sc-bdfBwQ` veya `.kxYz`\'e locate ETME (ikinci parça prop\'a göre değişir). ✅ `data-testid`/`getByRole` kullan. 💬 Developer\'dan iste: `data-testid="severity-badge"`.',
              en: '❌ Do NOT locate by `.sc-bdfBwQ` or `.kxYz` (the second part changes with the prop). ✅ Use `data-testid`/`getByRole`. 💬 Ask the developer for: `data-testid="severity-badge"`.',
            },
          },
        ],
      },
      {
        type: 'simple-box',
        emoji: '🎯',
        content: {
          tr: 'Developer\'dan Ne İste: *"Bu Badge component\'ine `data-testid=\'severity-badge\'` ekler misin? styled-components class\'ı prop\'a göre runtime\'da değişebiliyor, o yüzden ona güvenle bağlanamıyorum."* — CSS Modules ile farkı vurgula: burada sorun sadece "build değişince kırılır" değil, "AYNI build içinde bile prop\'a göre değişebilir" olduğu için daha temkinli olunmalı.',
          en: 'What to Ask the Developer: *"Could you add `data-testid=\'severity-badge\'` to this Badge component? The styled-components class can change at runtime based on the prop, so I cannot reliably bind to it."* — Highlight the difference from CSS Modules: here the problem is not just "it breaks when the build changes", it can also change based on the prop EVEN WITHIN THE SAME build, so extra caution is warranted.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'CSS Modules hash\'i ile styled-components/emotion class\'ı arasındaki EN KRİTİK fark nedir?',
          en: 'What is the MOST CRITICAL difference between a CSS Modules hash and a styled-components/emotion class?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiçbiri, ikisi de tamamen aynı davranır', en: 'None, both behave exactly the same' } },
          { id: 'b', text: { tr: 'CSS Modules hash\'i BUILD zamanında bir kez üretilir; styled-components/emotion class\'ı RUNTIME\'da, hatta prop\'a göre AYNI build içinde bile değişebilir', en: 'A CSS Modules hash is generated once at BUILD time; a styled-components/emotion class is generated at RUNTIME, and can even change based on a prop WITHIN THE SAME build' } },
          { id: 'c', text: { tr: 'styled-components hiç class üretmez', en: 'styled-components never produces a class' } },
          { id: 'd', text: { tr: 'CSS Modules sadece Angular\'da kullanılır', en: 'CSS Modules is only used in Angular' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'CSS Modules\'ın hash\'i build zamanı sabittir (bir sonraki build\'e kadar değişmez); runtime CSS-in-JS araçları ise class\'ı JS çalışırken üretir ve bu, aynı build içinde bile prop kombinasyonuna göre farklılaşabilir — daha da öngörülemez bir zemindir.',
          en: 'A CSS Modules hash is fixed at build time (does not change until the next build); runtime CSS-in-JS tools generate the class while JS runs, and this can differ by prop combination even within the same build — an even less predictable ground.',
        },
        retryQuestion: {
          question: {
            tr: 'İki farklı BugCard, biri `severity="HIGH"` biri `severity="LOW"` ile render ediliyor ve styled-components ikisine de FARKLI ikinci class parçası (`kxYz` vs `mnOp`) üretiyor. Bu senaryoda class\'a bağlı bir locator ne ile karşılaşır?',
            en: 'Two different BugCards render, one with `severity="HIGH"` and one with `severity="LOW"`, and styled-components produces a DIFFERENT second class token (`kxYz` vs `mnOp`) for each. In this scenario, what does a class-bound locator encounter?',
          },
          options: [
            { id: 'a', text: { tr: 'Her iki karta da aynı locator\'la ulaşabilir', en: 'It can reach both cards with the same locator' } },
            { id: 'b', text: { tr: 'Her severity değeri için AYRI bir locator yazmak zorunda kalır, bu da kırılgan ve bakımı zor bir test tabanı yaratır', en: 'It is forced to write a SEPARATE locator for each severity value, creating a fragile and hard-to-maintain test base' } },
            { id: 'c', text: { tr: 'Test otomatik olarak ikisini de bulur çünkü prop\'lar önemsizdir', en: 'The test automatically finds both because props do not matter' } },
            { id: 'd', text: { tr: 'severity prop\'u DOM\'a hiç yansımaz', en: 'The severity prop never reflects into the DOM' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Runtime\'da prop\'a göre değişen class\'lar, her varyasyon için ayrı ve kırılgan locator yazmayı zorunlu kılar. `data-testid="severity-badge"` gibi PROP\'TAN bağımsız sabit bir kanca, tüm varyasyonlar için TEK bir locator\'ı mümkün kılar.',
            en: 'Classes that change with a prop at runtime force writing a separate, fragile locator for every variation. A fixed hook independent of the PROP, like `data-testid="severity-badge"`, makes a SINGLE locator possible across all variations.',
          },
        },
      },

      // ── C6: Pseudo-element/state ──
      {
        type: 'heading',
        text: { tr: '👻 C6. Pseudo-element/State (`:hover`, `::before`): Neden DOM\'da Locate Edilemez', en: '👻 C6. Pseudo-elements/States (`:hover`, `::before`): Why They Cannot Be Located in the DOM' },
      },
      {
        type: 'simple-box',
        emoji: '👻',
        content: {
          tr: '`:hover` ve `::before`, bir tiyatro sahnesindeki IŞIK EFEKTİ gibidir: sahne üzerinde GERÇEK bir obje (aktör, dekor) DEĞİLDİR, sadece belirli bir ANDA (fare üzerindeyken) veya belirli bir KOŞULDA görünen bir projeksiyondur. Peki bu neden bir locator sorunu yaratır? Çünkü `page.locator(\':hover\')` gibi bir şey YAZAMAZSIN — locate edilecek bir DOM node\'u yoktur, sadece bir STİL DURUMU vardır. Java analojisi: bir nesnenin `isActive()` metodunun anlık `true` dönmesi gibi — bu bir NESNE değil, bir nesnenin GEÇİCİ durumudur; "isActive() metodunu locate et" demek anlamsızdır, ama "nesneyi bul, sonra `isActive()` çağır" anlamlıdır. QA bağlamında: `:hover`/`::before` test etmek için doğru refleks, o DURUMU TETİKLEMEK (`hover()` çağırmak) ve sonucunda ORTAYA ÇIKAN gerçek bir DOM elementinin (bir tooltip `<div>` gibi) görünür olduğunu doğrulamaktır — pseudo-element\'in kendisini değil.',
          en: '`:hover` and `::before` are like a LIGHTING EFFECT on a theater stage: they are NOT a real object on the stage (an actor, a prop), just a projection that appears at a specific MOMENT (while the mouse is over it) or under a specific CONDITION. So why does this create a locator problem? Because you CANNOT write something like `page.locator(\':hover\')` — there is no DOM node to locate, only a STYLE STATE. Java analogy: like a nesne\'s `isActive()` method momentarily returning `true` — this is not an OBJECT, it is a TRANSIENT state of an object; saying "locate the isActive() method" is meaningless, but "find the object, then call isActive()" makes sense. In QA context: the right reflex for testing `:hover`/`::before` is to TRIGGER that state (call `hover()`) and then verify that a real DOM element that APPEARS as a result (like a tooltip `<div>`) becomes visible — not the pseudo-element itself.',
        },
      },
      pseudoStateSteps,
      {
        type: 'quiz',
        question: {
          tr: 'BugCard\'a fare ile üzerine gelince CSS `::after` ile küçük bir ok görünüyor VE ayrı bir `<div class="tooltip">` elementi `visible` hale geliyor. Bir test bu davranışı nasıl doğrulamalıdır?',
          en: 'Hovering over a BugCard shows a small arrow via CSS `::after` AND a separate `<div class="tooltip">` element becomes `visible`. How should a test verify this behavior?',
        },
        options: [
          { id: 'a', text: { tr: '`page.locator(\'::after\')` ile oku doğrudan locate ederek', en: 'By directly locating the arrow with `page.locator(\'::after\')`' } },
          { id: 'b', text: { tr: 'Karta `hover()` çağırıp, ardından gerçek `<div class="tooltip">` elementinin `visible` olduğunu doğrulayarak', en: 'By calling `hover()` on the card, then verifying the real `<div class="tooltip">` element is `visible`' } },
          { id: 'c', text: { tr: 'Sayfayı yenileyip tekrar bakarak', en: 'By reloading the page and looking again' } },
          { id: 'd', text: { tr: '`:hover` bir CSS class\'ı olduğu için `.hover` diye locate ederek', en: 'By locating `.hover` since `:hover` is a CSS class' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`::after` gerçek bir DOM node değildir, locate edilemez. Doğru test stratejisi durumu TETİKLEMEK (`hover()`) ve bunun sonucunda DOM\'a giren/görünür olan GERÇEK bir elementi (tooltip `<div>`) doğrulamaktır.',
          en: '`::after` is not a real DOM node and cannot be located. The correct test strategy is to TRIGGER the state (`hover()`) and then verify the REAL element (the tooltip `<div>`) that enters the DOM/becomes visible as a result.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir developer "`:focus-visible` durumunu test etmek için `page.locator(\':focus-visible\')` yazdım ama hiçbir şey bulamıyor" diyor. Bu neden beklenen bir davranıştır?',
            en: 'A developer says "I wrote `page.locator(\':focus-visible\')` to test the `:focus-visible` state but it finds nothing". Why is this expected behavior?',
          },
          options: [
            { id: 'a', text: { tr: 'Bu bir araç hatasıdır, düzeltilmesi gerekir', en: 'This is a tool bug, it needs to be fixed' } },
            { id: 'b', text: { tr: '`:focus-visible` bir DOM elementi değil bir durumdur; doğru yaklaşım elementi bulup klavyeyle odaklamak (Tab) ve durumun sonucunu (görsel/stil değişikliği yerine erişilebilir davranışı) doğrulamaktır', en: '`:focus-visible` is not a DOM element but a state; the right approach is to find the element, focus it via keyboard (Tab), and verify the resulting behavior' } },
            { id: 'c', text: { tr: '`:focus-visible` sadece Firefox\'ta çalışır', en: '`:focus-visible` only works in Firefox' } },
            { id: 'd', text: { tr: 'Pseudo-class\'lar Playwright\'ta hiç desteklenmez', en: 'Pseudo-classes are not supported at all in Playwright' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Tüm pseudo-class/pseudo-element\'lerin ortak kuralı: bunlar bir ELEMENT DURUMUNU tarif eder, kendileri bir element DEĞİLDİR. Test her zaman durumu TETİKLER (hover/focus/click) ve bunun somut, DOM\'da var olan bir SONUCUNU doğrular.',
            en: 'The common rule for all pseudo-classes/pseudo-elements: they describe an ELEMENT STATE, they are NOT an element themselves. A test always TRIGGERS the state (hover/focus/click) and verifies a concrete RESULT that exists in the DOM.',
          },
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-c',
        promptTr: 'CSS Modules hash\'inin (`__x7f2a`) ve styled-components runtime class\'ının neden locator olarak güvenilmez olduğunu, ve `:hover` gibi bir pseudo-state\'i test etmenin doğru yolunu, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, why a CSS Modules hash (`__x7f2a`) and a styled-components runtime class are unreliable as locators, and the correct way to test a pseudo-state like `:hover`, to a newcomer.',
        keywords: ['hash', 'build', 'runtime', 'styled-components', 'hover', 'pseudo', 'dom', 'testid'],
        modelAnswerTr: 'CSS Modules hash\'i her build\'de yeniden üretildiği için, ona bağlanan bir locator bir sonraki deploy\'da sessizce kırılır. styled-components/emotion gibi runtime araçlarda ise class hem build\'de hem de bazen prop\'a göre AYNI build içinde bile değişebilir, bu yüzden daha da güvenilmezdir. `:hover`/`::before` gibi pseudo-state\'ler ise hiç DOM node değildir; doğru test yaklaşımı durumu (hover) tetikleyip, sonucunda görünür hale gelen gerçek bir DOM elementini (örneğin bir tooltip) doğrulamaktır.',
        modelAnswerEn: 'Because a CSS Modules hash is regenerated on every build, a locator bound to it silently breaks on the next deploy. In runtime tools like styled-components/emotion the class can change both on build and sometimes based on a prop even within the same build, making it even less reliable. Pseudo-states like `:hover`/`::before` are not DOM nodes at all; the correct testing approach is to trigger the state (hover) and then verify a real DOM element that becomes visible as a result (like a tooltip).',
      },
    ],
  },

  // ══ GRUP D — JavaScript: DOM'u Kim Değiştiriyor ═════════════════════════════
  {
    title: { tr: '⚡ JavaScript: DOM\'u Kim Değiştiriyor', en: '⚡ JavaScript: Who Changes the DOM' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚡',
        content: {
          tr: 'JavaScript, binadaki elektrik ve otomasyon sistemidir: sayfayı sonradan CANLI hale getiren, butona basınca bir şeyler olmasını sağlayan, sunucudan veri gelince yeni BugCard\'lar üreten güç budur. Neden testerı en çok ilgilendiren katman JS\'tir? Çünkü DOM\'u değiştiren odur — element bir an yoktur, fetch bitince belirir; bu yüzden "elementi bekleme" (wait) gerekir ve `sleep` yanlış cevaptır. Java analojisi: DOM ana thread\'de senkron kurulur ama fetch asenkron döner — bir CompletableFuture\'ın sonucunu beklemeden okumaya çalışmak gibi. QA bağlamında: locate timing sorunlarının kökü JS\'in asenkronluğudur; doğru refleks sabit süre uyumak değil, elementin varlığını/görünürlüğünü koşullu beklemektir.',
          en: 'JavaScript is the electrical and automation system of the building: it is the power that makes the page LIVE afterward, makes something happen when a button is pressed, and produces new BugCards when data arrives from the server. Why is JS the layer that concerns a tester most? Because it is what changes the DOM — an element is absent for a moment, then appears when a fetch completes; this is why you need to "wait for the element" and why `sleep` is the wrong answer. Java analogy: the DOM is built synchronously on the main thread, but a fetch returns asynchronously — like trying to read a CompletableFuture\'s result without waiting for it. In QA context: the root of locate-timing problems is JS asynchrony; the right reflex is not to sleep a fixed time but to conditionally wait for the element\'s presence/visibility.',
        },
      },

      // ── D1: DOM Manipülasyonu ──
      {
        type: 'heading',
        text: { tr: '🧱 D1. DOM Manipülasyonu: createElement, appendChild, innerHTML', en: '🧱 D1. DOM Manipulation: createElement, appendChild, innerHTML' },
      },
      {
        type: 'simple-box',
        emoji: '🧱',
        content: {
          tr: 'JS\'in DOM\'u değiştirmesi, bir İNŞAAT USTASININ binaya SONRADAN oda eklemesi gibidir: `document.createElement(\'li\')` yeni bir "tuğla" hazırlar ama henüz hiçbir yere bağlı DEĞİLDİR — sadece bir JS değişkeninde durur; `appendChild` bu tuğlayı GERÇEKTEN duvara (DOM ağacına) ekler. Peki neden bazen `element.innerHTML = htmlString` yerine `createElement`+`appendChild` tercih edilir? Çünkü `innerHTML` mevcut alt ağacı TAMAMEN yok edip sıfırdan kurar — buna bağlı event listener\'lar ve DOM referansları SESSİZCE geçersiz hale gelir (sinsi bir bug kaynağı). Java analojisi: `new Foo()` ile bir nesne yaratmak (createElement) ile onu bir koleksiyona `list.add(foo)` ile eklemek (appendChild) arasındaki fark gibi — var OLMAK ile sistemin bir PARÇASI olmak farklı adımlardır. QA bağlamında: `createElement` çağrıldı ama `appendChild` henüz çalışmadıysa, o elementi locate etmeye çalışmak HER ZAMAN başarısız olur — bu, D3\'teki timing dersinin temelidir.',
          en: 'JS changing the DOM is like a CONSTRUCTION WORKER adding a room to a building AFTERWARD: `document.createElement(\'li\')` prepares a new "brick" but it is NOT attached anywhere yet — it only sits in a JS variable; `appendChild` REALLY adds this brick to the wall (the DOM tree). So why is `createElement`+`appendChild` sometimes preferred over `element.innerHTML = htmlString`? Because `innerHTML` COMPLETELY destroys and rebuilds the existing subtree from scratch — event listeners and DOM references bound to it become SILENTLY invalid (a sneaky bug source). Java analogy: like the difference between creating a nesne with `new Foo()` (createElement) and adding it to a collection with `list.add(foo)` (appendChild) — existing and being a PART of the system are different steps. In QA context: if `createElement` was called but `appendChild` has not run yet, trying to locate that element ALWAYS fails — this is the foundation of the timing lesson in D3.',
        },
      },
      createAppendSteps,
      {
        type: 'quiz',
        question: {
          tr: 'Bir developer `newCard = document.createElement(\'li\')` satırını çalıştırdı ama henüz `parent.appendChild(newCard)` satırına gelmedi. Bu anda `page.locator(\'li\').last()` ne bulur?',
          en: 'A developer ran the line `newCard = document.createElement(\'li\')` but has not reached `parent.appendChild(newCard)` yet. What does `page.locator(\'li\').last()` find at this moment?',
        },
        options: [
          { id: 'a', text: { tr: 'Yeni oluşturulan li\'yi bulur çünkü createElement çalıştı', en: 'It finds the newly created li because createElement ran' } },
          { id: 'b', text: { tr: 'Yeni li\'yi BULAMAZ çünkü henüz DOM ağacına eklenmedi, sadece bir JS değişkeninde duruyor', en: 'It CANNOT find the new li because it has not been added to the DOM tree yet, it only sits in a JS variable' } },
          { id: 'c', text: { tr: 'Hata fırlatır çünkü createElement geçersiz bir işlemdir', en: 'It throws an error because createElement is an invalid operation' } },
          { id: 'd', text: { tr: 'Eski son elementi ikinci kez bulur', en: 'It finds the old last element a second time' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`createElement` sadece bellekte bir node oluşturur; DOM ağacına eklenmesi `appendChild` (veya benzeri) ile AYRI bir adımdır. Bu iki adım arasında element "var ama görünmez/bulunamaz" durumdadır.',
          en: '`createElement` only creates a node in memory; adding it to the DOM tree is a SEPARATE step done via `appendChild` (or similar). Between these two steps the element "exists but is invisible/unfindable".',
        },
        retryQuestion: {
          question: {
            tr: 'Bir developer BugCard listesini güncellemek için `ul.innerHTML = newListHtml` kullanıyor. Bu yaklaşımın locator/test açısından riski nedir?',
            en: 'A developer uses `ul.innerHTML = newListHtml` to update the BugCard list. What is the locator/test risk of this approach?',
          },
          options: [
            { id: 'a', text: { tr: 'Risk yok, innerHTML her zaman güvenlidir', en: 'No risk, innerHTML is always safe' } },
            { id: 'b', text: { tr: 'Mevcut alt ağaç tamamen yok edilip yeniden kurulur; eski DOM referansları/listener\'lar sessizce geçersizleşir', en: 'The existing subtree is completely destroyed and rebuilt; old DOM references/listeners silently become invalid' } },
            { id: 'c', text: { tr: 'Sadece görsel bir değişikliktir, hiçbir etkisi yoktur', en: 'It is purely a visual change with no side effects' } },
            { id: 'd', text: { tr: 'innerHTML testler tarafından hiç görülmez', en: 'innerHTML is never seen by tests' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`innerHTML` ataması eski alt ağacı SİLER ve yeni HTML\'den SIFIRDAN kurar. Bir test önceden bu ağaçtaki bir elemente referans TUTMUŞSA (ör. Selenium WebElement), bu referans artık DOM\'daki hiçbir şeye karşılık gelmez ve StaleElementReferenceException fırlatabilir.',
            en: 'An `innerHTML` assignment DELETES the old subtree and builds it FROM SCRATCH from the new HTML. If a test was previously HOLDING a reference to an element in that tree (e.g. a Selenium WebElement), that reference no longer corresponds to anything in the DOM and can throw a StaleElementReferenceException.',
          },
        },
      },

      // ── D2: Event Listener ──
      {
        type: 'heading',
        text: { tr: '🖱️ D2. Event Listener: Butona Basınca Kod Nasıl Tetiklenir', en: '🖱️ D2. Event Listeners: How Code Is Triggered by a Button Press' },
      },
      {
        type: 'simple-box',
        emoji: '🖱️',
        content: {
          tr: 'Event listener, bir GÜVENLİK KAMERASI + ALARM sistemi gibidir: `button.addEventListener(\'click\', handler)` demek "bu butona her basıldığında alarmı çal (handler\'ı çağır)" demektir — ama kamera KURULMADAN (listener eklenmeden) önce biri basarsa, alarm çalmaz, olay SESSİZCE kaybolur. Peki neden bazen bir butona tıklıyorsun ama HİÇBİR ŞEY olmuyor? Çünkü buton DOM\'a eklendi ama JS henüz o butona listener EKLEMEDİ — script hâlâ yükleniyor olabilir, ya da event yanlış elemente bağlanmış olabilir. Java analojisi: bir Observer pattern\'de bir nesnenin observer listesine KAYDOLMADAN önce fırlatılan bir event\'i asla ALAMAMASI gibi — kayıt olmadan bildirim gelmez. QA bağlamında: bu, "butona tıkladım ama hiçbir şey olmadı" bug raporlarının EN YAYGIN teknik köklerinden biridir — tester "element render oldu mu?" ile "listener kayıtlı mı?" sorularını AYIRT ederek teşhis koyar (GRUP E4 hydration konusuna doğrudan köprü).',
          en: 'An event listener is like a SECURITY CAMERA + ALARM system: `button.addEventListener(\'click\', handler)` means "sound the alarm (call the handler) every time this button is pressed" — but if someone presses it before the camera is INSTALLED (the listener is added), the alarm does not sound, the event is SILENTLY lost. So why do you sometimes click a button and NOTHING happens? Because the button was added to the DOM but JS has not yet ATTACHED a listener to it — the script may still be loading, or the event may be bound to the wrong element. Java analogy: like an Observer pattern object NEVER RECEIVING an event fired before it REGISTERED in the observer list — no registration, no notification. In QA context: this is one of the MOST COMMON technical roots of "I clicked the button but nothing happened" bug reports — a tester diagnoses it by DISTINGUISHING "did the element render?" from "is the listener registered?" (a direct bridge to the hydration topic in GROUP E4).',
        },
      },
      eventListenerSteps,
      {
        type: 'quiz',
        question: {
          tr: 'Bir bug raporu: "New Bug modalındaki Submit butonuna tıklıyorum, buton görünüyor ama HİÇBİR ŞEY olmuyor." Bu belirtiye bakarak ilk şüphelendiğin nedir?',
          en: 'A bug report says: "I click the Submit button in the New Bug modal, the button is visible but NOTHING happens." Looking at this symptom, what do you suspect first?',
        },
        options: [
          { id: 'a', text: { tr: 'Buton yanlış renkte tasarlanmış', en: 'The button was designed with the wrong color' } },
          { id: 'b', text: { tr: 'Buton DOM\'da/görsel olarak var ama JS henüz ona bir click listener eklemedi', en: 'The button exists in the DOM/visually, but JS has not yet attached a click listener to it' } },
          { id: 'c', text: { tr: 'Sunucu çökmüştür', en: 'The server has crashed' } },
          { id: 'd', text: { tr: 'Tarayıcı desteklemiyor', en: 'The browser does not support it' } },
        ],
        correct: 'b',
        explanation: {
          tr: '"Görünür ama tepkisiz" belirtisi klasik olarak render/listener AYRIMINA işaret eder: element render oldu (görünüyor) ama davranışı bağlayan JS kodu (listener) henüz ÇALIŞMADI veya YANLIŞ elemente eklendi.',
          en: 'The "visible but unresponsive" symptom classically points to the render/listener DISTINCTION: the element rendered (it is visible), but the JS code binding the behavior (the listener) has NOT run yet or was attached to the WRONG element.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tester, sorunun "listener eksik" mi yoksa "listener var ama içindeki kod hata veriyor" mu olduğunu nasıl ayırt edebilir?',
            en: 'How can a tester distinguish whether the problem is "the listener is missing" versus "the listener exists but the code inside it throws an error"?',
          },
          options: [
            { id: 'a', text: { tr: 'İkisi de aynı şeydir, ayrım yapmaya gerek yok', en: 'Both are the same thing, no need to distinguish' } },
            { id: 'b', text: { tr: 'DevTools Console\'da bir hata mesajı var mı bakarak — hata varsa listener çalışıyor ama içeride patlıyor demektir', en: 'By checking the DevTools Console for an error message — if there is one, the listener runs but throws inside' } },
            { id: 'c', text: { tr: 'Sayfayı yeniden başlatarak', en: 'By restarting the page' } },
            { id: 'd', text: { tr: 'Tarayıcı önbelleğini temizleyerek', en: 'By clearing the browser cache' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Listener hiç kayıtlı değilse Console\'da genelde SESSİZLİK olur (hiçbir şey loglanmaz). Listener kayıtlıysa ama içindeki kod bir hata fırlatıyorsa (ör. undefined bir alana erişim), Console\'da kırmızı bir hata mesajı ve stack trace GÖRÜNÜR — bu, "listener eksik" ile "listener\'da bug var"ı ayırt etmenin en hızlı yoludur.',
            en: 'If the listener is not registered at all, the Console is usually SILENT (nothing gets logged). If the listener is registered but the code inside throws (e.g. accessing an undefined field), a red error message and stack trace APPEAR in the Console — this is the fastest way to distinguish "listener missing" from "listener has a bug".',
          },
        },
      },

      // ── D3: Async ve Fetch ──
      {
        type: 'heading',
        text: { tr: '📡 D3. Async ve Fetch: Veri Gelince DOM Sonradan Dolar', en: '📡 D3. Async and Fetch: the DOM Fills In After Data Arrives' },
      },
      {
        type: 'simple-box',
        emoji: '📡',
        content: {
          tr: '`fetch`, bir RESTORANA telefonla sipariş vermek gibidir: siparişi verirsin (fetch çağrısı) ama yemek ANINDA gelmez — bir SÜRE (ağ gecikmesi) geçer, sonra kurye (response) kapıya gelir ve ancak O ZAMAN masaya (DOM\'a) konur. Peki neden bu, testerlar için bir YARIŞ durumu yaratır? Çünkü test kodu genelde sayfa açılır açılmaz ÇALIŞMAYA başlar — ama JS\'in verisi henüz gelmemiş olabilir, DOM hâlâ boş bir `<ul>` içerir. Java analojisi: bir `CompletableFuture.get()` çağırmadan, henüz TAMAMLANMAMIŞ bir future\'ın sonucunu okumaya çalışmak gibi — `null`/boş bir değer alırsın çünkü iş henüz BİTMEDİ. QA bağlamında: bu YARIŞ (test hızı vs ağ hızı) flaky testlerin EN YAYGIN kaynağıdır; aşağıdaki film bu yarışı adım adım gösterir.',
          en: '`fetch` is like phoning in an order to a RESTAURANT: you place the order (the fetch call) but the food does NOT arrive INSTANTLY — some TIME passes (network latency), then the courier (the response) reaches the door, and only THEN is it placed on the table (the DOM). So why does this create a RACE condition for testers? Because test code usually starts RUNNING the moment the page opens — but the JS data may not have arrived yet, and the DOM may still contain an empty `<ul>`. Java analogy: like trying to read the result of a `CompletableFuture` that has NOT completed yet, without calling `.get()` and waiting — you get `null`/an empty value because the work is NOT DONE yet. In QA context: this RACE (test speed vs network speed) is the MOST COMMON source of flaky tests; the film below walks through this race step by step.',
        },
      },
      fetchRaceFilm,
      {
        type: 'quiz',
        question: {
          tr: 'Sayfa açılır açılmaz test `page.locator(\'li\').first().click()` çalıştırıyor ve %30 ihtimalle "0 elements matched" hatası alıyor, %70 ihtimalle çalışıyor. Bu tutarsızlığın kök nedeni nedir?',
          en: 'The moment the page opens, the test runs `page.locator(\'li\').first().click()` and gets "0 elements matched" 30% of the time, working the other 70%. What is the root cause of this inconsistency?',
        },
        options: [
          { id: 'a', text: { tr: 'Playwright bozuk çalışıyor', en: 'Playwright is malfunctioning' } },
          { id: 'b', text: { tr: 'Test kodu ile fetch\'in bitme süresi arasında bir YARIŞ var; bazen fetch test çalışmadan önce, bazen sonra biter', en: 'There is a RACE between the test code and the fetch completion time; sometimes the fetch finishes before the test runs, sometimes after' } },
          { id: 'c', text: { tr: 'Sunucu her seferinde farklı veri döndürüyor', en: 'The server returns different data every time' } },
          { id: 'd', text: { tr: 'Test kodunda yazım hatası var', en: 'There is a typo in the test code' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Bu klasik bir YARIŞ KOŞULUDUR (race condition): ağ gecikmesi her çalıştırmada biraz farklıdır (CI makinesi yüküne, ağ trafiğine göre), bu yüzden bazen fetch test\'in locate denemesinden ÖNCE, bazen SONRA tamamlanır. Sabit bir bekleme koşullu bir bekleme ile DEĞİŞTİRİLMELİDİR.',
          en: 'This is a classic RACE CONDITION: network latency varies slightly on every run (depending on CI machine load, network traffic), so sometimes the fetch completes BEFORE the test\'s locate attempt, sometimes AFTER. A fixed wait should be REPLACED with a conditional wait.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tester "ben bu sorunu `page.waitForTimeout(3000)` ekleyerek çözdüm, artık hiç kırılmıyor" diyor. Bu neden yanıltıcı bir "çözüm"dür?',
            en: 'A tester says "I fixed this by adding `page.waitForTimeout(3000)`, it never breaks anymore". Why is this a misleading "fix"?',
          },
          options: [
            { id: 'a', text: { tr: 'Gerçek bir çözümdür, endişelenmeye gerek yok', en: 'It is a real fix, nothing to worry about' } },
            { id: 'b', text: { tr: 'Sadece o ANDA test edilen ağ koşullarında yeterli bir tahmindir; daha yavaş bir gün/ortamda yine kırılabilir ve her koşumda gereksiz 3 saniye kaybettirir', en: 'It is only a guess that happens to be enough under the network conditions tested AT THAT MOMENT; on a slower day/environment it can still break, and it wastes 3 unnecessary seconds on every run' } },
            { id: 'c', text: { tr: '3000ms evrensel olarak yeterli bir süredir', en: '3000ms is universally a sufficient duration' } },
            { id: 'd', text: { tr: 'waitForTimeout hiçbir zaman kullanılmamalıdır', en: 'waitForTimeout should never be used at all' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Sabit bir süre, o anki test ortamının hızına göre "yeterince büyük" GÖRÜNEBİLİR ama garanti değildir — CI\'da yoğunluk artınca veya ağ yavaşlayınca yine yetersiz kalabilir. Koşullu bekleme (assertion tabanlı) hem daha hızlı (koşul erken gerçekleşirse hemen devam eder) hem daha güvenilirdir.',
            en: 'A fixed duration may LOOK "big enough" for the current test environment\'s speed, but it is not a guarantee — it can become insufficient again once CI load increases or the network slows down. A conditional wait (assertion-based) is both faster (it proceeds immediately if the condition is met early) and more reliable.',
          },
        },
      },

      // ── D4: Mutation ──
      {
        type: 'heading',
        text: { tr: '🔄 D4. Mutation: Element Geç Eklenir — Neden `wait` Gerekir, Neden `sleep` Yanlış', en: '🔄 D4. Mutation: an Element Is Added Late — Why `wait` Is Needed, Why `sleep` Is Wrong' },
      },
      {
        type: 'simple-box',
        emoji: '🔄',
        content: {
          tr: 'Bir DOM mutasyonu (yeni element ekleme, silme, değiştirme), bir POSTANEDEKİ paket takip sistemine benzer: paketin (elementin) NE ZAMAN teslim edileceğini TAHMİN ETMEK yerine, kargo şirketinin "teslim edildi" BİLDİRİMİNİ (bir olay/koşul) beklemek çok daha güvenilirdir. Tarayıcılar bu bildirimi `MutationObserver` adlı bir API ile sağlar — modern test araçları (Playwright) arka planda BUNA BENZER bir mekanizmayla DOM\'u dinler ve `toHaveCount`/`toBeVisible` gibi assertion\'lar bu dinlemeyi kullanır. Peki neden `sleep(500)` yanlış bir refleks? Çünkü 500ms bir TAHMİNDİR: yavaş bir günde yetmez (test kırılır), hızlı bir günde gereksiz zaman kaybettirir (suite yavaşlar). Java analojisi: `Thread.sleep()` yerine bir `CountDownLatch`/`CompletableFuture.get()` ile GERÇEK bir olayı beklemek gibi — biri tahmindir, diğeri garanti. QA bağlamında: "Daha Fazla Yükle" gibi butonlarla GEÇ eklenen elementler, bu dersin en somut örneğidir.',
          en: 'A DOM mutation (adding, removing, or changing an element) is like a package-tracking system at a post office: instead of GUESSING WHEN the package (the element) will be delivered, it is far more reliable to wait for the courier company\'s "delivered" NOTIFICATION (an event/condition). Browsers provide this notification via an API called `MutationObserver` — modern test tools (Playwright) listen to the DOM in the background with a SIMILAR mechanism, and assertions like `toHaveCount`/`toBeVisible` use this listening. So why is `sleep(500)` the wrong reflex? Because 500ms is a GUESS: it is not enough on a slow day (the test breaks), and wastes time on a fast day (the suite slows down). Java analogy: like waiting for a REAL event with a `CountDownLatch`/`CompletableFuture.get()` instead of `Thread.sleep()` — one is a guess, the other a guarantee. In QA context: elements added LATE by buttons like "Load More" are the most concrete example of this lesson.',
        },
      },
      lazyAppendWaitPlayground,
      {
        type: 'quiz',
        question: {
          tr: '"Daha Fazla Yükle" butonuna basılınca JS 5 yeni BugCard\'ı DOM\'a ekliyor (500ms-2s arası değişen bir sürede, ağa bağlı). Bu yeni kartlardan birine tıklamadan önce en güvenilir yaklaşım hangisidir?',
          en: 'Clicking "Load More" makes JS add 5 new BugCards to the DOM (in a variable time of 500ms-2s, depending on the network). Before clicking one of these new cards, which approach is the most reliable?',
        },
        options: [
          { id: 'a', text: { tr: '`page.waitForTimeout(2000)` — en kötü ihtimale göre sabit bekle', en: '`page.waitForTimeout(2000)` — wait a fixed time for the worst case' } },
          { id: 'b', text: { tr: '`await expect(page.locator(\'li\')).toHaveCount(N)` — liste sayısının arttığını koşullu bekle', en: '`await expect(page.locator(\'li\')).toHaveCount(N)` — conditionally wait for the list count to increase' } },
          { id: 'c', text: { tr: 'Hiç bekleme, hemen tıkla', en: 'Do not wait at all, click immediately' } },
          { id: 'd', text: { tr: 'Sayfayı yeniden yükle', en: 'Reload the page' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Koşullu bekleme (assertion tabanlı) mutasyonun GERÇEKTEN bittiğini garanti eder ve ağ hızından bağımsız çalışır — en kötü ihtimale göre sabit süre beklemek hem gereksiz yavaşlık hem de "en kötü ihtimal beklenenden de kötüyse" kırılma riski taşır.',
          en: 'A conditional wait (assertion-based) guarantees the mutation has REALLY finished and works independent of network speed — waiting a fixed time for the worst case carries both needless slowness and the risk of breaking if the worst case turns out even worse than expected.',
        },
        retryQuestion: {
          question: {
            tr: 'Tarayıcının `MutationObserver` API\'si ne işe yarar ve test araçları bunu neden kullanır?',
            en: 'What does the browser\'s `MutationObserver` API do, and why do test tools use it?',
          },
          options: [
            { id: 'a', text: { tr: 'Sayfanın rengini değiştirir', en: 'It changes the page\'s color' } },
            { id: 'b', text: { tr: 'DOM\'daki değişiklikleri (ekleme/silme/attribute değişimi) dinleyip bir CALLBACK tetikler — test araçları bunu "koşul gerçekleşti mi" diye anlamak için kullanır', en: 'It listens for changes in the DOM (add/remove/attribute change) and triggers a CALLBACK — test tools use this to understand "has the condition occurred"' } },
            { id: 'c', text: { tr: 'Ağ isteklerini hızlandırır', en: 'It speeds up network requests' } },
            { id: 'd', text: { tr: 'Sadece Chrome\'da vardır', en: 'It only exists in Chrome' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`MutationObserver`, bir DOM alt ağacındaki değişiklikleri (node ekleme/silme, attribute/text değişimi) ASENKRON olarak dinleyip bir callback tetikleyen bir tarayıcı API\'sidir. Test araçları, "koşul (ör. element sayısı) GERÇEKLEŞTİ Mİ" sorusunu sabit bekleme yerine bu tür bir dinleme mekanizmasıyla cevaplar.',
            en: '`MutationObserver` is a browser API that ASYNCHRONOUSLY listens for changes in a DOM subtree (node add/remove, attribute/text change) and triggers a callback. Test tools answer "HAS the condition (e.g. the element count) occurred" using this kind of listening mechanism instead of a fixed wait.',
          },
        },
      },

      // ── D5: data-* Attribute'ları JS'ten okuma ──
      {
        type: 'heading',
        text: { tr: '🏷️ D5. `data-*` Attribute\'larını JS\'ten Okuma: Developer Neden Bunları Kullanır', en: '🏷️ D5. Reading `data-*` Attributes from JS: Why Developers Use Them' },
      },
      {
        type: 'simple-box',
        emoji: '🏷️',
        content: {
          tr: '`data-*` attribute\'ları sadece testerlar için "rozet" olmayabilir — bazen UYGULAMANIN KENDİSİ de onları okur, tıpkı bir depo çalışanının her kutudaki BARKODU (data-bug-id) hem envanter takibi HEM DE müşteri hizmetleri için kullanması gibi. Peki bu neden önemli? Çünkü developer, tek tek her BugCard\'a ayrı bir click listener eklemek yerine, TEK bir listener\'ı `<ul>`\'ye ekleyip (event delegation) tıklanan elementin `data-bug-id`\'sini OKUYARAK hangi karta tıklandığını anlayabilir — bu durumda `data-*` uygulamanın GERÇEK ÇALIŞMASININ bir parçasıdır, sadece test kolaylığı değil. Java analojisi: bir HashMap\'in anahtarı gibi — uygulama bu anahtara göre doğru kaydı bulur, anahtar sadece "debug için" değil, iş mantığının kendisi için vardır. QA bağlamında: uygulama mantığının bel bağladığı bir `data-*` attribute\'u, sadece test için eklenmiş bir `data-testid`\'den bile DAHA az silinme riski taşır — developer onu kaldırırsa kendi uygulaması da bozulur, bu da onu EN dayanıklı kancalardan biri yapar.',
          en: '`data-*` attributes may not only be "badges" for testers — sometimes the APP ITSELF also reads them, much like a warehouse worker using the BARCODE on each box (data-bug-id) for BOTH inventory tracking AND customer service. Why does this matter? Because instead of attaching a separate click listener to every single BugCard, a developer can attach ONE listener to the `<ul>` (event delegation) and READ the clicked element\'s `data-bug-id` to know which card was clicked — in this case `data-*` is part of the app\'s ACTUAL FUNCTIONING, not just a testing convenience. Java analogy: like a HashMap\'s key — the app finds the right record using this key, and the key exists not just "for debugging" but for the business logic itself. In QA context: a `data-*` attribute the app logic relies on carries EVEN LESS risk of removal than a `data-testid` added solely for tests — if the developer removes it, their own app breaks too, making it one of the MOST durable hooks available.',
        },
      },
      dataAttrEventDelegationSteps,
      {
        type: 'quiz',
        question: {
          tr: 'Bir BugCard\'da `data-bug-id="42"` attribute\'u var ve developer bunu `<ul>`\'ye eklenen TEK bir click listener içinde `event.target.closest(\'li\').dataset.bugId` ile okuyor. Bu attribute neden özellikle dayanıklı bir locator adayıdır?',
          en: 'A BugCard has a `data-bug-id="42"` attribute, and the developer reads it inside a SINGLE click listener attached to `<ul>` via `event.target.closest(\'li\').dataset.bugId`. Why is this attribute an especially durable locator candidate?',
        },
        options: [
          { id: 'a', text: { tr: 'Çünkü sadece testler için eklenmiştir', en: 'Because it was added solely for tests' } },
          { id: 'b', text: { tr: 'Çünkü uygulamanın KENDİ tıklama mantığı bu attribute\'a bel bağlıyor — silinirse test değil, uygulamanın kendisi bozulur', en: 'Because the APP\'S OWN click logic relies on this attribute — if removed, the app itself breaks, not just the test' } },
          { id: 'c', text: { tr: 'Çünkü CSS bu attribute\'u stil için kullanıyor', en: 'Because CSS uses this attribute for styling' } },
          { id: 'd', text: { tr: 'Çünkü her zaman büyük harfle yazılır', en: 'Because it is always written in uppercase' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Bir `data-testid` sadece testler için var olduğundan, "gereksiz" görülüp bir refactor\'da silinme riski taşır. Ama uygulamanın kendi iş mantığı (event delegation gibi) bir `data-*` attribute\'una bel bağlıyorsa, o attribute\'u silmek uygulamayı da bozar — bu da onu doğal olarak daha kalıcı ve dayanıklı kılar.',
          en: 'Because a `data-testid` exists solely for tests, it carries the risk of being seen as "unnecessary" and removed in a refactor. But if the app\'s own business logic (like event delegation) relies on a `data-*` attribute, removing it breaks the app too — making it naturally more permanent and durable.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tester "Uygulama mantığının kullandığı data-* attribute\'ları varsa, artık hiç data-testid eklemeye gerek yok" diyor. Bu görüşteki eksik nedir?',
            en: 'A tester says "if there are data-* attributes used by the app logic, we never need to add data-testid anymore". What is missing from this view?',
          },
          options: [
            { id: 'a', text: { tr: 'Tamamen doğru bir görüş, başka bir şeye gerek yok', en: 'Completely correct, nothing else is needed' } },
            { id: 'b', text: { tr: 'Uygulama mantığı HER elemente bir data-* attribute\'u eklemeyi gerektirmez (ör. statik bir başlık); testin ihtiyacı olan HER elemente özel data-testid eklemek yine gerekebilir', en: 'App logic does not require a data-* attribute on EVERY element (e.g. a static heading); adding a dedicated data-testid may still be needed for EVERY element the test cares about' } },
            { id: 'c', text: { tr: 'data-testid attribute\'ları tarayıcılarda desteklenmiyor', en: 'data-testid attributes are not supported in browsers' } },
            { id: 'd', text: { tr: 'data-* attribute\'ları sadece butonlarda olabilir', en: 'data-* attributes can only exist on buttons' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Uygulama mantığının kullandığı `data-*` attribute\'ları (event delegation gibi) sadece BELİRLİ elementlerde (genelde tekrarlayan listelerde) bulunur. Statik, tekil elementlerde (bir başlık, bir açıklama metni) uygulama mantığı hiçbir `data-*`\'a ihtiyaç duymaz — bu elementleri test etmek istiyorsan yine ÖZEL olarak `data-testid` eklemen gerekir.',
            en: '`data-*` attributes used by app logic (like event delegation) exist only on CERTAIN elements (usually repeating lists). Static, singular elements (a heading, a description text) need no `data-*` for the app logic to function — if you want to test those elements, you still need to add a DEDICATED `data-testid`.',
          },
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-d',
        promptTr: 'Bir elementin `createElement` ile oluşturulup `appendChild` ile eklenmesi arasındaki boşluğu ve fetch\'in bitmesini beklemenin neden `sleep` yerine koşullu bir bekleme gerektirdiğini, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, the gap between an element being created with `createElement` and added with `appendChild`, and why waiting for a fetch to finish requires a conditional wait instead of `sleep`, to a newcomer.',
        keywords: ['createelement', 'appendchild', 'dom', 'fetch', 'async', 'sleep', 'wait', 'mutation'],
        modelAnswerTr: '`createElement` bir node\'u sadece bellekte oluşturur; DOM ağacına gerçekten eklenmesi `appendChild` ile ayrı bir adımdır ve bu iki adım arasında element locate edilemez. Fetch de asenkron olduğu için, veri gelene kadar DOM boş kalır; test kodu sayfa açılır açılmaz çalıştığından bu bir yarış yaratır. Sabit bir `sleep` süresi sadece bir tahmindir ve ağ hızına göre yetersiz veya gereksiz kalabilir; bunun yerine bir koşulun (ör. element sayısının artması) gerçekleştiğini doğrulayan bir assertion kullanmak, mutasyonun gerçekten bittiğini garanti eder.',
        modelAnswerEn: '`createElement` only creates a node in memory; actually adding it to the DOM tree is a separate step done via `appendChild`, and between these two steps the element cannot be located. Because fetch is also asynchronous, the DOM stays empty until the data arrives; since test code runs the moment the page opens, this creates a race. A fixed `sleep` duration is just a guess and can be insufficient or wasteful depending on network speed; instead, using an assertion that verifies a condition (e.g. the element count increasing) has occurred guarantees the mutation has really finished.',
      },
    ],
  },

  // ══ GRUP E — Frontend & Backend Nasıl Konuşur ═══════════════════════════════
  {
    title: { tr: '🔌 Frontend & Backend Nasıl Konuşur', en: '🔌 How Frontend and Backend Talk' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔌',
        content: {
          tr: 'Frontend ile backend arasındaki konuşma, bir RESTORANDAKİ garson-mutfak ilişkisi gibidir: tarayıcı (garson) `/api/v1/bugs`\'a bir istek götürür, sunucu (mutfak) JSON döner, JS bu JSON\'u DOM\'a (tabağa) dizer. Neden bir tester bu köprüyü bilmeli? Çünkü elementin ne zaman DOM\'a geleceği tamamen bu konuşmanın hızına bağlıdır — ayrıca sayfanın NEREDE oluştuğu (tarayıcıda mı = CSR, sunucuda mı = SSR) locate zamanlamasını kökten değiştirir. Java analojisi: bu köprü `/api-testing` sayfasında öğrendiğin request/response sözleşmesinin frontend tarafından görünüşüdür — aynı Bug modeli, şimdi ekranda. QA bağlamında: "UI\'da görünmüyor" dediğin bir bug\'ın kökü frontend mi (render) yoksa backend mi (response) — bunu ayırt etmek Network panelini okumaktan geçer. Bu grup boyunca `/api-testing` sayfasına köprü kuracağız — syntax orada, "neden/ne zaman" burada.',
          en: 'The conversation between frontend and backend is like the waiter-kitchen relationship in a RESTAURANT: the browser (waiter) carries a request to `/api/v1/bugs`, the server (kitchen) returns JSON, and JS arranges that JSON onto the DOM (the plate). Why should a tester know this bridge? Because when an element will appear in the DOM depends entirely on the speed of this conversation — and WHERE the page is built (in the browser = CSR, on the server = SSR) fundamentally changes locate timing. Java analogy: this bridge is the frontend-side view of the request/response contract you learned on the `/api-testing` page — the same Bug model, now on screen. In QA context: for a bug you call "not visible in the UI", is the root the frontend (render) or the backend (response) — telling them apart comes from reading the Network panel. Throughout this group we bridge to the `/api-testing` page — syntax lives there, "why/when" lives here.',
        },
      },

      // ── E1: Tarayıcı → Sunucu ──
      {
        type: 'heading',
        text: { tr: '🌐 E1. Tarayıcı → Sunucu: fetch/XHR, `/api/v1/bugs` İsteği', en: '🌐 E1. Browser -> Server: fetch/XHR, the `/api/v1/bugs` Request' },
      },
      {
        type: 'simple-box',
        emoji: '🌐',
        content: {
          tr: 'Bir `fetch`/XHR isteği göndermek, bir KARGO GÖNDERMEK gibidir: paketi (isteği) yola çıkarırsın, bir TAKİP NUMARASI (Network paneli satırı) alırsın ve paketin durumunu ("pending" → "delivered") bu numaradan izlersin. Peki neden tester bu paneli okumayı bilmeli? Çünkü "UI\'da bir şey görünmüyor" dediğin bir bug\'ın DevTools → Network\'te tam olarak NEREDE tıkandığını (istek hiç gitmedi mi? sunucu 404/500 mü döndü? response boş mu geldi?) görmek, hatayı frontend\'e mi backend\'e mi atayacağını AYIRT eder. Java analojisi: eski `HttpURLConnection` (callback/blocking hissi veren XHR\'ın atası) ile modern `HttpClient`/`CompletableFuture` (fetch\'in Promise tabanlı yapısı) arasındaki fark gibi — API\'ler değişse de temel HTTP mekaniği aynıdır. QA bağlamında: bu sayfa `fetch`/XHR SYNTAX\'ını öğretmez (bkz. `/api-testing`, `/javascript`); burada öğrenilen, Network panelini bir TEŞHİS ARACI olarak okumaktır.',
          en: 'Sending a `fetch`/XHR request is like SHIPPING A PACKAGE: you send the package (the request) off, you get a TRACKING NUMBER (a Network panel row), and you follow the package\'s status ("pending" -> "delivered") through that number. So why should a tester know how to read this panel? Because seeing EXACTLY WHERE a "nothing shows up in the UI" bug got stuck in DevTools -> Network (did the request never go out? did the server return 404/500? did the response come back empty?) lets you DISTINGUISH whether to assign the bug to the frontend or the backend. Java analogy: like the difference between the old `HttpURLConnection` (the callback/blocking-feeling ancestor of XHR) and the modern `HttpClient`/`CompletableFuture` (fetch\'s Promise-based structure) — the APIs change, but the underlying HTTP mechanics stay the same. In QA context: this page does not teach `fetch`/XHR SYNTAX (see `/api-testing`, `/javascript`); what is learned here is reading the Network panel as a DIAGNOSTIC TOOL.',
        },
      },
      networkRequestLifecycleSteps,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester "New Bug" formunu gönderiyor, Toast bildirimi hiç görünmüyor. DevTools → Network\'te `POST /api/v1/bugs` satırını inceliyor ve status "(failed) net::ERR_CONNECTION_REFUSED" görüyor. Bu neyi işaret eder?',
          en: 'A tester submits the "New Bug" form and the Toast notification never appears. They inspect the `POST /api/v1/bugs` row in DevTools -> Network and see status "(failed) net::ERR_CONNECTION_REFUSED". What does this indicate?',
        },
        options: [
          { id: 'a', text: { tr: 'Frontend kodunda bir render hatası var', en: 'There is a render error in the frontend code' } },
          { id: 'b', text: { tr: 'İstek sunucuya HİÇ ULAŞAMADI — sorun muhtemelen sunucunun ayakta olmaması veya yanlış bir URL/port', en: 'The request NEVER REACHED the server — the problem is likely the server being down or a wrong URL/port' } },
          { id: 'c', text: { tr: 'JSON gövdesi yanlış formatlanmış', en: 'The JSON body is malformed' } },
          { id: 'd', text: { tr: 'CSS class\'ı hash\'i değişmiş', en: 'The CSS class hash has changed' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`ERR_CONNECTION_REFUSED`, isteğin sunucuya hiç ULAŞAMADIĞINI gösterir (bir status kodu bile yok) — bu render/JS hatası değil, bağlantı/altyapı seviyesinde bir sorundur. Network paneli bunu net şekilde ayırt etmeni sağlar.',
          en: '`ERR_CONNECTION_REFUSED` shows the request NEVER REACHED the server (there is not even a status code) — this is not a render/JS error, it is a connection/infrastructure-level problem. The Network panel clearly lets you tell these apart.',
        },
        retryQuestion: {
          question: {
            tr: 'Aynı senaryoda Network paneli bu sefer `POST /api/v1/bugs` için status "500" ve response gövdesinde `{"error":"Internal Server Error"}` gösteriyor. Bu, önceki senaryodan (`ERR_CONNECTION_REFUSED`) nasıl farklıdır?',
            en: 'In the same scenario, the Network panel this time shows status "500" for `POST /api/v1/bugs` with a response body `{"error":"Internal Server Error"}`. How does this differ from the previous scenario (`ERR_CONNECTION_REFUSED`)?',
          },
          options: [
            { id: 'a', text: { tr: 'Aynı şeydir, ikisi de "sunucu çalışmıyor" demektir', en: 'It is the same thing, both mean "the server is down"' } },
            { id: 'b', text: { tr: 'İstek sunucuya ULAŞTI ve sunucu bir hata ile cevap verdi — sorun backend kodunda, bağlantıda değil', en: 'The request REACHED the server and the server responded with an error — the problem is in the backend code, not the connection' } },
            { id: 'c', text: { tr: 'Bu bir frontend hatasıdır', en: 'This is a frontend error' } },
            { id: 'd', text: { tr: '500 status kodu her zaman istemci hatasıdır', en: 'A 500 status code always means a client error' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bir status kodunun (500) ve response gövdesinin var olması, isteğin sunucuya ULAŞTIĞINI ve sunucu tarafında bir HATA oluştuğunu gösterir — bağlantı sorunu değil, backend kodundaki bir hata (exception, null pointer vb.) araştırılmalıdır.',
            en: 'The existence of a status code (500) and a response body shows the request REACHED the server and an ERROR occurred server-side — not a connection issue, but an error in the backend code (an exception, a null pointer, etc.) that needs investigating.',
          },
        },
      },

      // ── E2: Response → State → Render ──
      {
        type: 'heading',
        text: { tr: '🔁 E2. Response → State → Render: Gelen JSON DOM\'a Nasıl Döner', en: '🔁 E2. Response -> State -> Render: How Incoming JSON Turns Into the DOM' },
      },
      {
        type: 'simple-box',
        emoji: '🔁',
        content: {
          tr: 'JSON\'un DOM\'a dönüşmesi, bir FABRİKA MONTAJ HATTI gibidir: ham malzeme (JSON) önce DEPOYA (state\'e) alınır, sonra montaj hattı (render mekanizması) bu depodaki malzemeyi işleyip nihai ürünü (DOM) üretir — hiçbir adım atlanmaz. Peki neden bu zinciri bilmek işine yarar? Çünkü "veri geldi" ile "ekranda göründü" arasında İKİ AYRI adım (state güncelleme + re-render) daha vardır ve her biri bir miktar zaman alabilir. Java analojisi: bir DB sorgusunun sonucunu (ResultSet) önce bir DTO/nesne listesine (state) çevirip, sonra bu listeyi bir view\'a (render) bağlamak gibi — veri gelmesi ile ekranda görünmesi arasında dönüşüm adımları vardır. QA bağlamında: aşağıdaki film bu 4 aşamalı zinciri (fetch → JSON → state → re-render → DOM) somutlaştırır — flaky testlerin çoğu bu zincirin TAMAMLANMADIĞI bir anda locate denemesinden kaynaklanır.',
          en: 'JSON turning into the DOM is like a FACTORY ASSEMBLY LINE: raw material (JSON) first goes into STORAGE (state), then the assembly line (the render mechanism) processes that stored material and produces the final product (the DOM) — no step is skipped. Why is knowing this chain useful? Because there are TWO SEPARATE steps (state update + re-render) between "data arrived" and "it appeared on screen", and each can take some time. Java analogy: like converting a DB query result (a ResultSet) into a DTO/object list (state) first, then binding that list to a view (render) — there are conversion steps between data arriving and it appearing on screen. In QA context: the film below makes this 4-stage chain (fetch -> JSON -> state -> re-render -> DOM) concrete — most flaky tests come from a locate attempt at a moment when this chain has NOT finished.',
        },
      },
      dataFillsDomFilm,
      {
        type: 'quiz',
        question: {
          tr: 'JSON response geldi (Network paneli "200" gösteriyor) ama BugCard listesi ekranda HÂLÂ görünmüyor. Zincirin (fetch → JSON → state → re-render → DOM) hangi adımlarında bir sorun olabilir?',
          en: 'The JSON response arrived (the Network panel shows "200") but the BugCard list STILL does not appear on screen. In which steps of the chain (fetch -> JSON -> state -> re-render -> DOM) could the problem be?',
        },
        options: [
          { id: 'a', text: { tr: 'Sadece fetch adımında — response geldiyse başka bir yer olamaz', en: 'Only in the fetch step — if the response arrived, it cannot be anywhere else' } },
          { id: 'b', text: { tr: 'State güncelleme veya re-render adımında — response gelmesi state\'in doğru güncellendiğini VEYA render\'ın tetiklendiğini garanti etmez', en: 'In the state update or re-render step — the response arriving does not guarantee state was updated correctly OR that a render was triggered' } },
          { id: 'c', text: { tr: 'Sadece CSS\'te — response ile CSS ilgisizdir', en: 'Only in CSS — the response is unrelated to CSS' } },
          { id: 'd', text: { tr: 'Hiçbir yerde, bu asla olmaz', en: 'Nowhere, this never happens' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Response gelmesi zincirin sadece İLK yarısının bittiğini gösterir. State güncellemesinde bir kod hatası (yanlış alan okuma, bir koşulun yanlış değerlendirilmesi) veya re-render\'ın tetiklenmemesi (ör. state referansı doğru değiştirilmediyse framework değişikliği fark etmeyebilir) da "veri var ama ekranda yok" durumuna yol açabilir.',
          en: 'The response arriving only shows the FIRST half of the chain finished. A code bug in the state update (reading the wrong field, a condition evaluated incorrectly) or the re-render not triggering (e.g. if the state reference was not changed correctly, the framework may not notice the change) can also cause "the data exists but is not on screen".',
        },
        retryQuestion: {
          question: {
            tr: 'Bir React developer\'ı `bugs.push(newBug)` yaparak state\'i "güncelliyor" ama ekran yenilenmiyor. Bu zincirin hangi adımında bir sorun var?',
            en: 'A React developer "updates" state by doing `bugs.push(newBug)`, but the screen does not refresh. Which step of the chain has a problem?',
          },
          options: [
            { id: 'a', text: { tr: 'fetch adımında — istek hiç gitmemiştir', en: 'In the fetch step — the request never went out' } },
            { id: 'b', text: { tr: 'Re-render tetikleme adımında — `.push()` diziyi YERİNDE değiştirir, React bu değişikliği fark etmez çünkü referans aynı kalır', en: 'In the re-render triggering step — `.push()` mutates the array IN PLACE, React does not notice this change because the reference stays the same' } },
            { id: 'c', text: { tr: 'JSON adımında — veri bozuktur', en: 'In the JSON step — the data is corrupt' } },
            { id: 'd', text: { tr: 'DOM adımında — tarayıcı bozuktur', en: 'In the DOM step — the browser is broken' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'React (ve benzer framework\'ler) state değişikliğini genelde REFERANS karşılaştırmasıyla tespit eder. `.push()` diziyi YERİNDE değiştirir, referans aynı kalır, bu yüzden framework "hiçbir şey değişmedi" sanıp re-render TETİKLEMEZ. Doğru yol: `setBugs([...bugs, newBug])` gibi YENİ bir referans oluşturmaktır.',
            en: 'React (and similar frameworks) usually detects a state change via REFERENCE comparison. `.push()` mutates the array IN PLACE, the reference stays the same, so the framework thinks "nothing changed" and does NOT trigger a re-render. The correct way: create a NEW reference, like `setBugs([...bugs, newBug])`.',
          },
        },
      },

      // ── E3: CSR vs SSR vs SSG ──
      {
        type: 'heading',
        text: { tr: '🏗️ E3. CSR vs SSR vs SSG: Sayfa Nerede Oluşuyor', en: '🏗️ E3. CSR vs SSR vs SSG: Where the Page Gets Built' },
      },
      {
        type: 'simple-box',
        emoji: '🏗️',
        content: {
          tr: 'CSR/SSR/SSG farkı, bir YEMEĞİN NEREDE PİŞTİĞİ farkı gibidir: CSR "eve gelen çiğ malzemeyi mutfağında (tarayıcıda) pişirmek" (HTML JS çalışınca oluşur), SSR "restoranda anlık pişirilip SICAK gelen yemek" (HTML sunucuda, her istekte, hazır gelir), SSG ise "önceden pişirilip dondurulmuş, sadece ısıtılan yemek" (HTML build zamanında ÖNCEDEN üretilir). Peki bu neden locate zamanlamasını DEĞİŞTİRİR? Çünkü CSR\'da ilk HTML BOŞTUR (JS çalışana kadar beklemen gerekir), SSR/SSG\'de ise HTML İLK yanıtta HAZIRDIR (ama JS\'in "hydrate" olmasını beklemen gerekebilir — bkz. E4). Java analojisi: bir view\'ın her istekte sunucuda render edildiği (JSP/Thymeleaf, SSR\'a benzer) ile bir SPA\'nın tamamen istemci tarafında JS ile kurulması (CSR) arasındaki fark gibi. QA bağlamında: bir sayfanın hangi türde olduğunu bilmek, "elementi ne zaman bekleyeceğim" sorusuna FARKLI bir cevap verir.',
          en: 'The CSR/SSR/SSG difference is like the difference in WHERE A MEAL IS COOKED: CSR is "cooking raw ingredients delivered home, in your own kitchen (the browser)" (the HTML is built once JS runs), SSR is "a meal cooked on the spot at a restaurant and delivered HOT" (the HTML is ready on the server, on every request), SSG is "a meal cooked and frozen in advance, just reheated" (the HTML is produced IN ADVANCE at build time). So why does this CHANGE locate timing? Because in CSR the initial HTML is EMPTY (you must wait for JS to run), while in SSR/SSG the HTML is READY in the FIRST response (but you may still need to wait for JS to "hydrate" — see E4). Java analogy: like the difference between a view rendered on the server on every request (JSP/Thymeleaf, similar to SSR) and a SPA built entirely client-side with JS (CSR). In QA context: knowing which type a page is gives a DIFFERENT answer to "when should I wait for the element".',
        },
      },
      renderTypeLocateTimingTable,
      {
        type: 'quiz',
        question: {
          tr: 'Bug Tracker sayfası CSR ile çalışıyor (React SPA, veri client-side fetch ile geliyor). Sayfa açılır açılmaz BugCard\'ları locate etmeye çalışan bir test için en doğru yaklaşım nedir?',
          en: 'The Bug Tracker page runs with CSR (a React SPA, data arrives via a client-side fetch). What is the correct approach for a test trying to locate BugCards the moment the page opens?',
        },
        options: [
          { id: 'a', text: { tr: 'İlk HTML\'de BugCard\'lar zaten hazırdır, hemen locate edilebilir', en: 'BugCards are already ready in the initial HTML, they can be located immediately' } },
          { id: 'b', text: { tr: 'İlk HTML boştur; fetch + state + re-render zincirinin bitmesini (ör. `toHaveCount`) bekle', en: 'The initial HTML is empty; wait for the fetch + state + re-render chain to finish (e.g. `toHaveCount`)' } },
          { id: 'c', text: { tr: 'Hydration beklemek gerekir, fetch beklemeye gerek yoktur', en: 'You need to wait for hydration, no need to wait for a fetch' } },
          { id: 'd', text: { tr: 'CSR\'da bekleme hiç gerekmez', en: 'No waiting is ever needed in CSR' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'CSR\'da ilk HTML BOŞTUR — DOM, JS çalışıp fetch tamamlanana kadar dolmaz. SSR/SSG\'nin aksine burada "ilk HTML zaten hazır" varsayımı YANLIŞTIR; doğru refleks E2\'deki zincirin (fetch→state→render) bitmesini koşullu olarak beklemektir.',
          en: 'In CSR the initial HTML is EMPTY — the DOM does not fill until JS runs and the fetch completes. Unlike SSR/SSG, the assumption "the initial HTML is already ready" is WRONG here; the right reflex is to conditionally wait for the E2 chain (fetch->state->render) to finish.',
        },
        retryQuestion: {
          question: {
            tr: 'Bug Tracker sayfası SSG ile üretiliyor (statik dosya, build zamanında hazır) ama "New Bug" butonuna tıklamak hâlâ ilk anda çalışmıyor. Bu neden CSR\'daki "veri bekleme" sorunundan FARKLI bir sorundur?',
            en: 'The Bug Tracker page is produced with SSG (a static file, ready at build time), but clicking "New Bug" still does not work in the first instant. Why is this a DIFFERENT problem from CSR\'s "waiting for data" issue?',
          },
          options: [
            { id: 'a', text: { tr: 'Aynı sorundur, SSG de CSR gibi veri bekler', en: 'It is the same problem, SSG also waits for data like CSR' } },
            { id: 'b', text: { tr: 'SSG\'de HTML zaten hazırdır (veri bekleme sorunu yok); sorun JS\'in henüz hydrate olmaması, yani event listener\'ların bağlanmamış olmasıdır', en: 'In SSG the HTML is already ready (no data-waiting problem); the issue is JS not having hydrated yet, meaning the event listeners are not attached' } },
            { id: 'c', text: { tr: 'SSG sayfaları hiçbir zaman JS içermez', en: 'SSG pages never contain JS' } },
            { id: 'd', text: { tr: 'Bu bir tarayıcı hatasıdır', en: 'This is a browser bug' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'SSG\'de HTML build zamanında ÜRETİLMİŞ ve hazırdır — CSR\'daki gibi bir "veri gelene kadar bekleme" sorunu YOKTUR. Ama HTML statik olduğundan JS\'in ayrıca indirilip hydrate olması (E4) gerekir; bu bekleme CSR\'daki fetch beklemesinden TAMAMEN farklı bir mekanizmadır.',
            en: 'In SSG the HTML was PRODUCED at build time and is ready — there is NO "wait until data arrives" problem like in CSR. But because the HTML is static, JS still needs to download separately and hydrate (E4); this wait is a COMPLETELY different mechanism from CSR\'s fetch wait.',
          },
        },
      },

      // ── E4: Hydration ──
      {
        type: 'heading',
        text: { tr: '💧 E4. Hydration: HTML Var Ama JS Bağlanmadan Buton Çalışmaz (Sinsi Bug)', en: '💧 E4. Hydration: the HTML Exists But the Button Does Not Work Until JS Attaches (a Sneaky Bug)' },
      },
      {
        type: 'simple-box',
        emoji: '💧',
        content: {
          tr: 'Hydration, bir MANKENİ CANLANDIRMAK gibidir: SSR sunucu HTML\'i gönderdiğinde tarayıcıda GÖRSEL olarak tam bir sayfa (bir vitrin mankeni gibi) durur — ama bu manken henüz HAREKET EDEMEZ. JS bundle indirilip çalıştığında React/Angular bu HTML\'e "can verir" (hydrate eder): artık event listener\'lar bağlanmıştır ve manken GERÇEKTEN hareket edebilir. Peki neden bu bir "SİNSİ" bug\'dır? Çünkü hiçbir hata mesajı YOKTUR — sayfa görsel olarak MÜKEMMEL görünür, sadece hydration bitene kadar geçen kısa sürede yapılan bir tıklama SESSİZCE kaybolur. Java analojisi: bir nesnenin constructor\'ı çalışıp alanları set edilmiş (HTML hazır) ama henüz bir Spring context\'e/listener\'a KAYDEDİLMEMİŞ olması gibi — nesne "var" ama sistemin aktif bir parçası DEĞİLDİR. QA bağlamında: bu sinsi bug\'ı yakalamanın yolu "element visible" ile "element hydrate/actionable" arasındaki farkı test etmektir — aşağıdaki adımlar ve pratik bunu somutlaştırır.',
          en: 'Hydration is like BRINGING A MANNEQUIN TO LIFE: when the SSR server sends the HTML, a visually complete page (like a shop-window mannequin) stands in the browser — but this mannequin cannot MOVE yet. Once the JS bundle downloads and runs, React/Angular "brings this HTML to life" (hydrates it): event listeners are now attached and the mannequin can REALLY move. So why is this a "SNEAKY" bug? Because there is NO error message — the page LOOKS visually perfect, it is just that a click made during the short window before hydration finishes SILENTLY vanishes. Java analogy: like a nesne\'s constructor having run and its fields being set (the HTML is ready), but it has not yet been REGISTERED with a Spring context/listener — the object "exists" but is NOT an active part of the system. In QA context: the way to catch this sneaky bug is to test the difference between "element visible" and "element hydrated/actionable" — the steps and practice below make this concrete.',
        },
      },
      hydrationSneakyBugSteps,
      waitForHydrationPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Bir SSR sayfasında test, sayfa yüklenir yüklenmez (ilk HTML geldiği an) "New Bug" butonuna tıklıyor ve HİÇBİR ŞEY olmuyor — ama aynı test 300ms bekleyip tıklayınca ÇALIŞIYOR. Bu davranış neyi gösterir?',
          en: 'On an SSR page, a test clicks "New Bug" the moment the page loads (as soon as the initial HTML arrives) and NOTHING happens — but the same test works when it waits 300ms before clicking. What does this behavior indicate?',
        },
        options: [
          { id: 'a', text: { tr: 'Buton kodunda bir yazım hatası var', en: 'There is a typo in the button code' } },
          { id: 'b', text: { tr: 'HTML hazır ama JS henüz hydrate olmamıştı; 300ms sonra hydration tamamlanmış ve event listener bağlanmıştı', en: 'The HTML was ready but JS had not hydrated yet; after 300ms hydration had completed and the event listener was attached' } },
          { id: 'c', text: { tr: 'Test aracı bozuk çalışıyor', en: 'The test tool is malfunctioning' } },
          { id: 'd', text: { tr: 'Sunucu 300ms sonra farklı bir HTML gönderiyor', en: 'The server sends different HTML after 300ms' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Bu, klasik hydration penceresidir: HTML görsel olarak hazır ama JS henüz "bağlanmadığı" için tıklama işlevsizdir. Kısa bir süre sonra hydration bittiğinde AYNI buton çalışmaya başlar — bu belirti (bekleyince çalışıyor) hydration timing\'ini net şekilde işaret eder.',
          en: 'This is the classic hydration window: the HTML is visually ready but JS has not "attached" yet, so the click is inert. A short time later, once hydration finishes, the SAME button starts working — this symptom (works after waiting) clearly points to hydration timing.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir developer "biz bu sinsi bug\'ı önlemek için butona `data-hydrated=\'true\'` işareti ekledik, JS bağlanınca bu attribute\'u true yapıyoruz" diyor. Bir tester bunu nasıl kullanır?',
            en: 'A developer says "we added a `data-hydrated=\'true\'` marker on the button to prevent this sneaky bug, and set it to true once JS attaches". How does a tester use this?',
          },
          options: [
            { id: 'a', text: { tr: 'Bu işareti görmezden gelip yine de hemen tıklar', en: 'They ignore this marker and still click immediately' } },
            { id: 'b', text: { tr: 'Tıklamadan önce bu attribute\'un "true" olmasını BEKLER — bu, hydration\'ın bittiğini garanti eden açık bir sinyaldir', en: 'They WAIT for this attribute to become "true" before clicking — it is an explicit signal that guarantees hydration has finished' } },
            { id: 'c', text: { tr: 'Bu işaret sadece görsel bir dekorasyondur', en: 'This marker is purely visual decoration' } },
            { id: 'd', text: { tr: 'data-hydrated attribute\'u CSS için kullanılır', en: 'The data-hydrated attribute is used for CSS' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Hydration\'ın "ne zaman bittiğini" garanti eden yerleşik bir sinyal olmadığından (görünürlük tek başına yetmez), developer\'ın eklediği açık bir `data-hydrated="true"` işareti tam olarak bu boşluğu doldurur — tester bu işareti BEKLEYEREK sinsi bug\'ı yapısal olarak önler.',
            en: 'Since there is no built-in signal guaranteeing "when" hydration finished (visibility alone is not enough), an explicit `data-hydrated="true"` marker added by the developer fills exactly this gap — the tester structurally prevents the sneaky bug by WAITING for this marker.',
          },
        },
      },

      // ── E5: Loading/Error/Empty State ──
      {
        type: 'heading',
        text: { tr: '🚦 E5. Loading/Error/Empty State: Developer\'ın 3 Durumu, Tester\'ın 3 Testi', en: '🚦 E5. Loading/Error/Empty State: the Developer\'s 3 States, the Tester\'s 3 Tests' },
      },
      {
        type: 'simple-box',
        emoji: '🚦',
        content: {
          tr: 'Bir veri isteğinin her zaman "başarıyla dolu geldi" varsayımı, bir SİGORTA POLİÇESİ yazarken sadece "hiçbir şey olmayacak" senaryosunu düşünmeye benzer — gerçek dünyada bekleme (Loading), aksilik (Error) ve boş sonuç (Empty) da OLASI durumlardır ve developer bunların HER BİRİ için ayrı bir arayüz kodlamalıdır. Peki neden tester\'ı ilgilendirir? Çünkü çoğu manuel/otomatik test SADECE "başarılı ve dolu" senaryosunu dener — ama production\'daki gerçek bug\'lar genelde bu üç durumun BİRİNDE saklanır (sonsuz dönen bir spinner, görünmeyen bir hata mesajı, "boş tablo" yerine yanlış bir "yükleniyor" yazısı). Java analojisi: bir metodun sadece "happy path"ini test edip exception/boş liste durumlarını atlamak gibi — kapsam eksik kalır. QA bağlamında: her BugCard listesi özelliği için bu 3 durumun ayrı ayrı simüle edilip doğrulanması gerekir; aşağıdaki tablo developer\'ın kodladığı ile tester\'ın test etmesi gerekeni yan yana koyar.',
          en: 'Always assuming a data request "arrives successfully full" is like writing an insurance policy only considering the "nothing happens" scenario — in the real world, waiting (Loading), a mishap (Error), and an empty result (Empty) are also POSSIBLE states, and the developer must code a separate interface for EACH of them. Why does this concern a tester? Because most manual/automated tests ONLY try the "successful and full" scenario — but real production bugs usually hide in ONE of these three states (a spinner that spins forever, an invisible error message, a wrong "loading" text instead of an "empty table"). Java analogy: like testing only a method\'s "happy path" and skipping the exception/empty-list cases — coverage stays incomplete. In QA context: for every BugCard list feature, these 3 states must be separately simulated and verified; the table below places what the developer codes side by side with what the tester must test.',
        },
      },
      loadingErrorEmptyTable,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester sadece "BugCard listesi başarıyla yükleniyor mu?" senaryosunu test ediyor. Hangi gerçek production bug\'ını KAÇIRMA riski en yüksektir?',
          en: 'A tester only tests the "does the BugCard list load successfully?" scenario. Which real production bug are they at highest risk of MISSING?',
        },
        options: [
          { id: 'a', text: { tr: 'Sunucu 500 döndüğünde hata mesajının hiç görünmemesi (sadece sonsuz spinner)', en: 'The error message never appearing when the server returns 500 (only an infinite spinner)' } },
          { id: 'b', text: { tr: 'Butonun rengi', en: 'The button\'s color' } },
          { id: 'c', text: { tr: 'Sayfanın başlığı', en: 'The page\'s title' } },
          { id: 'd', text: { tr: 'Font büyüklüğü', en: 'The font size' } },
        ],
        correct: 'a',
        explanation: {
          tr: 'Sadece "başarı" yolunu test etmek, Error/Empty state\'lerin hiç doğrulanmadığı anlamına gelir. Gerçek bir production bug\'ı genelde şudur: sunucu hata döndüğünde spinner SONSUZA kadar döner çünkü error state hiç kodlanmamış veya tetiklenmemiştir — kullanıcı sayfanın "donduğunu" düşünür.',
          en: 'Testing only the "success" path means Error/Empty states are never verified. A real production bug often looks like this: when the server returns an error, the spinner spins FOREVER because the error state was never coded or triggered — the user thinks the page has "frozen".',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tester, severity="CRITICAL" filtresini uyguluyor ve hiç kayıt yok. Ekranda BOŞ bir tablo (başlıksız, satırsız) görünüyor, "Henüz bug yok" gibi bir mesaj YOK. Bu neden bir bug\'dır?',
            en: 'A tester applies the severity="CRITICAL" filter and there are no records. The screen shows an EMPTY table (no headers, no rows), with NO message like "No bugs yet". Why is this a bug?',
          },
          options: [
            { id: 'a', text: { tr: 'Bug değildir, boş tablo normal bir davranıştır', en: 'It is not a bug, an empty table is normal behavior' } },
            { id: 'b', text: { tr: 'Kullanıcı bunun "0 sonuç" mu yoksa "sayfa bozuk mu/hâlâ yükleniyor mu" olduğunu AYIRT EDEMEZ; Empty state eksik kodlanmıştır', en: 'The user CANNOT TELL whether this is "0 results" or "the page is broken/still loading"; the Empty state was not coded' } },
            { id: 'c', text: { tr: 'Sadece bir stil (CSS) sorunudur', en: 'It is purely a styling (CSS) issue' } },
            { id: 'd', text: { tr: 'Filtreleme özelliği tamamen bozuktur', en: 'The filtering feature is completely broken' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Boş bir tablo ile "sonuç yok ama sistem çalışıyor" mesajı arasında BÜYÜK bir kullanıcı deneyimi farkı vardır — birincisi kullanıcıyı "acaba bir şey mi bozuldu?" diye düşündürür. Empty state\'in ayrı ve AÇIK bir mesajla kodlanması gerekir; bunun eksik olması E5\'in tam olarak işaret ettiği bug türüdür.',
            en: 'There is a BIG UX difference between a blank table and a "no results, but the system works" message — the former makes the user think "did something break?". The Empty state must be coded with a separate, EXPLICIT message; its absence is exactly the kind of bug E5 points to.',
          },
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-e',
        promptTr: 'Hydration\'ın neden "sinsi" bir bug kaynağı olduğunu ve CSR/SSR/SSG arasındaki locate zamanlaması farkını, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, why hydration is a "sneaky" source of bugs, and the locate-timing difference between CSR/SSR/SSG, to a newcomer.',
        keywords: ['hydration', 'ssr', 'csr', 'ssg', 'visible', 'listener', 'sinsi', 'locate'],
        modelAnswerTr: 'CSR\'da ilk HTML boştur ve DOM, JS fetch bitene kadar dolmaz; SSR/SSG\'de ise HTML ilk yanıtta hazırdır ama JS bundle\'ı henüz "hydrate" olmadığı için event listener\'lar bağlı değildir. Hydration bittiğinde JS bu hazır HTML\'e "can verir". Sinsi olmasının sebebi: sayfa görsel olarak mükemmel görünür, hiçbir hata çıkmaz, sadece hydration bitmeden yapılan bir tıklama sessizce hiçbir şey yapmaz — tester bunu "element visible" ile "element gerçekten işlevsel" arasındaki farkı bilerek yakalar.',
        modelAnswerEn: 'In CSR the initial HTML is empty and the DOM does not fill until the JS fetch finishes; in SSR/SSG the HTML is ready in the first response, but the event listeners are not attached because the JS bundle has not "hydrated" yet. Once hydration finishes, JS "brings this ready HTML to life". The reason it is sneaky: the page looks visually perfect, no error appears, it is just that a click made before hydration finishes silently does nothing — a tester catches this by knowing the difference between "element visible" and "element actually functional".',
      },
    ],
  },

  // ══ GRUP F — React: Kaynağı Okumak ══════════════════════════════════════════
  {
    title: { tr: '⚛️ React: Kaynağı Okumak', en: '⚛️ React: Reading the Source' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚛️',
        content: {
          tr: 'React component\'i, bir LEGO PARÇASI FABRİKASINDAKİ KALIP gibidir: bir kez `BugCard` kalıbını yazarsın, sonra her bug için o kalıptan bir kart basılır. Kalıba dökülen "malzeme" prop\'tur (bug\'ın verisi), kalıbın çıktısı ise JSX\'in ürettiği gerçek DOM. Neden bir tester React kaynağını okuyabilmeli? Çünkü `className={styles.card}` yazan bir satırın tarayıcıda `class="BugCard_card__x7f2a"` gibi hash\'li bir class ürettiğini GÖREBİLİRSE, ona göre locate etmenin kırılacağını önceden anlar. Java analojisi: component ≈ bir metot/sınıf, prop ≈ parametre, state ≈ instance field, re-render ≈ metodu yeni argümanla yeniden çağırmak. QA bağlamında: JSX\'i okuyup üretilecek DOM\'u zihinde canlandıran tester, developer\'la aynı dili konuşur ve doğru locator\'ı baştan seçer. Bu grup boyunca BugCard, Modal, StatusBadge ve Toast component\'lerinin her biri için birer Kaynak→DOM→Locator panosu göreceksin.',
          en: 'A React component is like a MOLD in a LEGO-BRICK FACTORY: you write the `BugCard` mold once, then a card is stamped from that mold for each bug. The "material" poured into the mold is the prop (the bug\'s data), and the mold\'s output is the real DOM produced by JSX. Why should a tester be able to read React source? Because if they can SEE that a line writing `className={styles.card}` produces a hashed class like `class="BugCard_card__x7f2a"` in the browser, they understand in advance that locating by it will break. Java analogy: component is like a metot/class, a prop like a parameter, state like an instance field, and a re-render like calling the method again with new arguments. In QA context: a tester who reads JSX and pictures the DOM it will produce speaks the same language as the developer and picks the right locator from the start. Throughout this group you will see a Source -> DOM -> Locator board for each of the BugCard, Modal, StatusBadge, and Toast components.',
        },
      },

      // ── F1: Component Nedir? ──
      {
        type: 'heading',
        text: { tr: '📜 F1. Component Nedir? Fonksiyon → JSX → DOM', en: '📜 F1. What Is a Component? Function -> JSX -> DOM' },
      },
      {
        type: 'simple-box',
        emoji: '📜',
        content: {
          tr: 'Bir React component\'i, gizemli bir "arayüz parçası" değil, SADE bir JavaScript fonksiyonudur — Java\'da bir METODUN parametre alıp bir sonuç döndürmesi gibi. `function BugCard({ bug })` bir metottur, `bug` onun parametresidir, `return <li>...</li>` ise metodun döndürdüğü DEĞERDİR — ama bu değer gerçek DOM değil, bir JSX "TARİF"idir. Peki neden bu ayrımı bilmek işine yarar? Çünkü React bu tarifi ALIR ve gerçek DOM\'a KENDİSİ dönüştürür (reconciliation) — component\'in döndürdüğü şey ile tarayıcıdaki gerçek node ARASINDA bir dönüşüm adımı vardır. Java analojisi: bir metodun `return new Button()` demesi ile o Button nesnesinin GERÇEKTEN ekranda çizilmesi arasındaki fark gibi — nesneyi DÖNDÜRMEK ile onu EKRANA ÇİZMEK ayrı adımlardır. QA bağlamında: component\'i bir fonksiyon olarak gören tester, "bu component yeniden çağrılırsa (re-render) DOM nasıl değişir?" sorusunu Java\'daki "bu metot farklı argümanla çağrılırsa ne döner?" sorusuyla AYNI şekilde düşünür.',
          en: 'A React component is not a mysterious "UI piece", it is a PLAIN JavaScript function — like a METHOD in Java taking a parameter and returning a result. `function BugCard({ bug })` is a method, `bug` is its parameter, and `return <li>...</li>` is the VALUE the method returns — but this value is not real DOM, it is a JSX "RECIPE". So why is knowing this distinction useful? Because React TAKES this recipe and turns it INTO real DOM ITSELF (reconciliation) — there is a conversion step BETWEEN what the component returns and the real node in the browser. Java analogy: like the difference between a method saying `return new Button()` and that Button object actually being DRAWN on screen — RETURNING an object and DRAWING it on screen are separate steps. In QA context: a tester who sees a component as a function thinks about "how does the DOM change if this component is called again (re-render)?" the SAME way they would think about "what does this method return if called with different arguments?" in Java.',
        },
      },
      componentIsFunctionFilm,
      {
        type: 'quiz',
        question: {
          tr: 'Bir developer "component\'im `return <li>...</li>` dedi, yani DOM\'a bir `<li>` eklendi" diyor. Bu ifadedeki teknik eksik nedir?',
          en: 'A developer says "my component said `return <li>...</li>`, so a `<li>` was added to the DOM". What is the technical gap in this statement?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiçbir eksik yok, return demek DOM\'a eklemek demektir', en: 'No gap, returning means it was added to the DOM' } },
          { id: 'b', text: { tr: 'return edilen şey gerçek DOM değil bir JSX tarifidir; React bunu ALIP reconciliation ile gerçek DOM\'a dönüştürür — ayrı bir adımdır', en: 'What is returned is not real DOM but a JSX recipe; React TAKES it and turns it into real DOM via reconciliation — a separate step' } },
          { id: 'c', text: { tr: 'Sadece class component\'lerde bu doğrudur', en: 'This is only true for class components' } },
          { id: 'd', text: { tr: 'JSX zaten HTML dosyasıdır', en: 'JSX is already an HTML file' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'JSX, `React.createElement(...)` çağrılarından oluşan bir JS nesnesidir — bir "tarif". React bu tarifi önceki durumla karşılaştırıp (reconciliation) gerçek DOM node\'larını oluşturur/günceller. "return etmek" ile "DOM\'a girmek" arasında bu dönüşüm adımı vardır.',
          en: 'JSX is a JS object made of `React.createElement(...)` calls — a "recipe". React compares this recipe against the previous state (reconciliation) and creates/updates the real DOM nodes. There is this conversion step between "returning" and "entering the DOM".',
        },
        retryQuestion: {
          question: {
            tr: 'Java\'daki bir metot analojisiyle: `function BugCard({ bug })` içindeki `bug` parametresi, React\'in terminolojisinde neye karşılık gelir?',
            en: 'Using a Java method analogy: what does the `bug` parameter inside `function BugCard({ bug })` correspond to in React terminology?',
          },
          options: [
            { id: 'a', text: { tr: 'State', en: 'State' } },
            { id: 'b', text: { tr: 'Prop', en: 'Prop' } },
            { id: 'c', text: { tr: 'Context', en: 'Context' } },
            { id: 'd', text: { tr: 'Ref', en: 'Ref' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`bug`, üst component\'ten AŞAĞI akan bir prop\'tur — tıpkı bir Java metoduna dışarıdan geçirilen bir parametre gibi. Component kendi state\'ini kendi yönetir (instance field gibi), ama prop\'u DEĞİŞTİREMEZ, sadece OKUYABİLİR.',
            en: '`bug` is a prop flowing DOWN from the parent component — just like a parameter passed into a Java method from outside. A component manages its own state (like an instance field), but it CANNOT CHANGE a prop, only READ it.',
          },
        },
      },

      // ── F2: JSX'i Okumak ──
      {
        type: 'heading',
        text: { tr: '🔤 F2. JSX\'i Okumak: `className`, `{değişken}`, `{koşul && <X/>}`', en: '🔤 F2. Reading JSX: `className`, `{variable}`, `{condition && <X/>}`' },
      },
      {
        type: 'simple-box',
        emoji: '🔤',
        content: {
          tr: 'JSX\'i okumak, HTML\'i bilen biri için bir DİLİ ÇEVİRMEK gibidir: `className` = `class`\'ın React lehçesi, `{değişken}` = "burada bu JS ifadesinin SONUCUNU yaz", `{koşul && <X/>}` = "eğer koşul true ise X\'i, DEĞİLSE hiçbir şeyi (false/null/undefined render edilmez) göster". Peki neden bu 3 kalıbı tanımak locator için hayati? Çünkü kaynağı okuyup DOM\'u TAHMİN edebilen tester, hangi elementin HER ZAMAN orada olacağını (className gibi statik alanlar) ve hangisinin KOŞULLU var olacağını ({koşul&&}) baştan bilir. Java analojisi: bir ternary ifadenin (`koşul ? A : B`) veya bir `if` bloğunun çalışma zamanında hangi DEĞERİ üreteceğini kod okuyarak tahmin etmek gibi — JSX de aynı mantıkla "hangi durumda ne render olur" sorusuna kod okuyarak cevap verir. QA bağlamında: `{koşul && <X/>}` kalıbını GÖREN bir tester, X\'i test etmeden önce "bu koşul şu anda true mu?" diye sormayı bilir — GRUP F4\'te bunun somut bir örneğini göreceksin.',
          en: 'Reading JSX is like TRANSLATING A LANGUAGE for someone who knows HTML: `className` = the React dialect of `class`, `{variable}` = "write the RESULT of this JS expression here", `{condition && <X/>}` = "if the condition is true show X, if NOT show nothing (false/null/undefined render nothing)". Why is recognizing these 3 patterns vital for locating? Because a tester who can read the source and PREDICT the DOM knows in advance which element will ALWAYS be there (static fields like className) and which will exist CONDITIONALLY ({condition&&}). Java analogy: like predicting, by reading code, which VALUE a ternary expression (`condition ? A : B`) or an `if` block will produce at runtime — JSX answers "what renders in which case" by the same logic, just by reading code. In QA context: a tester who SEES the `{condition && <X/>}` pattern knows to ask "is this condition true right now?" before testing X — you will see a concrete example of this in GROUP F4.',
        },
      },
      jsxToDomSteps,
      {
        type: 'quiz',
        question: {
          tr: '`{bugCount > 0 && <span>{bugCount} bug bulundu</span>}` satırını okuyorsun ve `bugCount` şu an `0`. Bu span DOM\'da var mı?',
          en: 'You read the line `{bugCount > 0 && <span>{bugCount} bugs found</span>}` and `bugCount` is currently `0`. Does this span exist in the DOM?',
        },
        options: [
          { id: 'a', text: { tr: 'Evet, "0 bug bulundu" olarak yazar', en: 'Yes, it renders "0 bugs found"' } },
          { id: 'b', text: { tr: 'Hayır, çünkü `0 > 0` false\'tur ve `false && ...` render EDİLMEZ — span DOM\'da HİÇ yok', en: 'No, because `0 > 0` is false and `false && ...` renders NOTHING — the span DOES NOT EXIST in the DOM at all' } },
          { id: 'c', text: { tr: 'Evet ama gizli (display:none) olarak', en: 'Yes, but hidden (display:none)' } },
          { id: 'd', text: { tr: 'Hata fırlatır', en: 'It throws an error' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`bugCount > 0` ifadesi `0` iken `false`\'a eşitlenir; React `{false && <X/>}` için HİÇBİR ŞEY render etmez (X, DOM\'a hiç girmez — `display:none` bile değildir, tamamen YOKTUR). Bu span\'ı locate etmeye çalışmak NoSuchElement verir.',
          en: 'The expression `bugCount > 0` evaluates to `false` when it is `0`; React renders NOTHING for `{false && <X/>}` (X never enters the DOM — it is not even `display:none`, it is COMPLETELY ABSENT). Trying to locate this span gives NoSuchElement.',
        },
        retryQuestion: {
          question: {
            tr: '`{bugCount && <span>{bugCount} bug bulundu</span>}` (yukarıdakinden farklı olarak `> 0` karşılaştırması OLMADAN) yazılmışsa ve `bugCount` `0` ise, ekranda ne görürsün?',
            en: 'If it is written as `{bugCount && <span>{bugCount} bugs found</span>}` (without the `> 0` comparison, unlike above) and `bugCount` is `0`, what do you see on screen?',
          },
          options: [
            { id: 'a', text: { tr: 'Hiçbir şey, önceki örnekle aynı davranış', en: 'Nothing, same behavior as the previous example' } },
            { id: 'b', text: { tr: 'Ekranda YALNIZ BAŞINA bir "0" yazısı belirir — çünkü `0 && ...` sayısal `0`\'a eşitlenir ve React sayıları render EDER (boolean false\'un aksine)', en: 'A standalone "0" text appears on screen — because `0 && ...` evaluates to the number `0`, and React DOES render numbers (unlike boolean false)' } },
            { id: 'c', text: { tr: 'Hata fırlatır', en: 'It throws an error' } },
            { id: 'd', text: { tr: 'Span her zaman görünür', en: 'The span is always visible' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bu, React\'in ünlü bir tuzağıdır: `false`/`null`/`undefined` render EDİLMEZ ama sayısal `0` bir DEĞERDİR ve React onu render EDER — ekranda tek başına şaşırtıcı bir "0" belirir. Bu yüzden koşullu render\'da `bugCount > 0 &&` gibi açık bir boolean karşılaştırma kullanmak daha güvenlidir.',
            en: 'This is a famous React trap: `false`/`null`/`undefined` are NOT rendered, but the number `0` IS a value and React DOES render it — a surprising standalone "0" appears on screen. This is why using an explicit boolean comparison like `bugCount > 0 &&` in conditional rendering is safer.',
          },
        },
      },

      // ── F3: Props ve State ──
      {
        type: 'heading',
        text: { tr: '📦 F3. Props ve State: Veri Yukarıdan Aşağı, Değişince Re-render', en: '📦 F3. Props and State: Data Flows Top-Down, a Change Triggers Re-render' },
      },
      {
        type: 'simple-box',
        emoji: '📦',
        content: {
          tr: 'Props ve state, bir ÇALIŞANIN aldığı İKİ FARKLI TALİMAT türü gibidir: props, YÖNETİCİDEN gelen bir görev talimatıdır (çalışan onu değiştiremez, sadece uygular); state ise çalışanın KENDİ not defterindeki bir hatırlatmadır (çalışan istediği an kendi defterini günceller). Peki neden bu ayrım locator için önemli? Çünkü bir component\'in DOM çıktısı ya ÜST component değiştiğinde (yeni prop) ya da KENDİSİ karar verdiğinde (state güncellemesi, ör. `setIsOpen(true)`) DEĞİŞİR — hangi tetikleyicinin hangi elementi DOM\'a soktuğunu/çıkardığını bilmek, "bu elementi ne zaman bekleyeceğim" sorusuna netlik katar. Java analojisi: props bir metot PARAMETRESİ (çağıran taraf verir, metot değiştiremez), state ise nesnenin instance FIELD\'ı (nesnenin kendisi `this.field = ...` ile değiştirir) gibidir. QA bağlamında: bir elementin DOM\'a girmesi bir prop değişikliğine mi (üst component\'ten, ör. filtre) yoksa bir state değişikliğine mi (component\'in kendi kararı, ör. modal açma) bağlı olduğunu ayırt etmek, doğru tetikleyiciyi (test adımını) bulmayı sağlar.',
          en: 'Props and state are like TWO DIFFERENT KINDS OF INSTRUCTION an employee receives: props are a task instruction from the MANAGER (the employee cannot change it, only carry it out); state is a reminder in the employee\'s OWN notebook (the employee updates their own notebook whenever they decide to). Why does this distinction matter for a locator? Because a component\'s DOM output changes either when the PARENT component changes (a new prop) or when it DECIDES ITSELF (a state update, e.g. `setIsOpen(true)`) — knowing which trigger puts/removes which element from the DOM brings clarity to "when should I wait for this element". Java analogy: props are like a method PARAMETER (the caller provides it, the method cannot change it), state is like an object\'s instance FIELD (the object itself changes it with `this.field = ...`). In QA context: telling apart whether an element entering the DOM depends on a prop change (from the parent, e.g. a filter) or a state change (the component\'s own decision, e.g. opening a modal) lets you find the correct trigger (test step).',
        },
      },
      propsVsStateTable,
      {
        type: 'quiz',
        question: {
          tr: 'Bir BugCard\'ın `bug.status` prop\'u "OPEN" iken StatusBadge yeşil renkte görünüyor. Sidebar\'daki bir filtre değişince status API\'den "CLOSED" olarak güncelleniyor. Bu değişiklik hangi mekanizma ile tetiklenmiştir?',
          en: 'A BugCard\'s `bug.status` prop is "OPEN" and the StatusBadge shows green. When a Sidebar filter changes, the status is updated to "CLOSED" from the API. Which mechanism triggers this change?',
        },
        options: [
          { id: 'a', text: { tr: 'BugCard kendi state\'ini değiştirdi', en: 'BugCard changed its own state' } },
          { id: 'b', text: { tr: 'Üst component yeni veriyle yeniden render oldu ve BugCard\'a YENİ bir prop aktı — BugCard bunu değiştirmedi, sadece aldı', en: 'The parent component re-rendered with new data and passed a NEW prop into BugCard — BugCard did not change it, it only received it' } },
          { id: 'c', text: { tr: 'CSS bu değişikliği tetikledi', en: 'CSS triggered this change' } },
          { id: 'd', text: { tr: 'Tarayıcı önbelleği güncellendi', en: 'The browser cache was updated' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'BugCard\'ın kendisi `bug.status`\'u DEĞİŞTİREMEZ (bu bir prop\'tur) — değişiklik üst component\'ten (yeni API verisiyle) YUKARIDAN AŞAĞI akar. BugCard sadece yeni prop\'u alır ve buna göre yeniden render olur.',
          en: 'BugCard itself CANNOT change `bug.status` (it is a prop) — the change flows TOP-DOWN from the parent component (with new API data). BugCard only receives the new prop and re-renders accordingly.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir BugCard\'a tıklayınca kart "genişliyor" (daha fazla detay gösteriyor) ve bu davranış SADECE o karta özel, diğer kartları etkilemiyor. Bu muhtemelen hangi mekanizmadır?',
            en: 'Clicking a BugCard makes it "expand" (show more detail), and this behavior is SPECIFIC only to that card, not affecting other cards. Which mechanism is this likely to be?',
          },
          options: [
            { id: 'a', text: { tr: 'Prop değişikliği — üst component tüm kartları etkiler', en: 'A prop change — the parent component affects all cards' } },
            { id: 'b', text: { tr: 'State değişikliği — her BugCard kendi `isExpanded` state\'ini yönetir, bu yüzden sadece tıklanan kart etkilenir', en: 'A state change — each BugCard manages its own `isExpanded` state, so only the clicked card is affected' } },
            { id: 'c', text: { tr: 'CSS animasyonu — JS ile hiçbir ilgisi yok', en: 'A CSS animation — unrelated to JS' } },
            { id: 'd', text: { tr: 'Bu davranış React\'te mümkün değildir', en: 'This behavior is not possible in React' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Sadece TIKLANAN karta özel bir davranış, o kartın KENDİ state\'i (her BugCard örneğinin kendi `isExpanded`\'ı) ile yönetiliyor demektir — bir prop değişikliği TÜM kardeş component\'leri aynı anda etkilerdi, ama state her component ÖRNEĞİNE özeldir.',
            en: 'A behavior specific ONLY to the CLICKED card means it is managed by that card\'s OWN state (each BugCard instance\'s own `isExpanded`) — a prop change would affect ALL sibling components at once, but state is specific to each component INSTANCE.',
          },
        },
      },

      // ── F4: Conditional Render (Modal pano) ──
      {
        type: 'heading',
        text: { tr: '🚪 F4. Conditional Render: `{isOpen && <Modal/>}` — Element DOM\'da Ne Zaman VAR', en: '🚪 F4. Conditional Render: `{isOpen && <Modal/>}` — When the Element EXISTS in the DOM' },
      },
      {
        type: 'simple-box',
        emoji: '🚪',
        content: {
          tr: '`{isOpen && <Modal/>}` kalıbı, bir GİZLİ KAPI gibidir: kapı ya TAMAMEN vardır (isOpen=true, Modal DOM\'a girer) ya da TAMAMEN yoktur (isOpen=false, Modal DOM\'da HİÇ bulunmaz) — CSS ile "gizlemek" (display:none) ile KARIŞTIRILMAMALIDIR, burada element DOM AĞACINDA bile YOKTUR. Peki neden bu, testerların en sık düştüğü tuzaklardan biri? Çünkü bir tester "Modal\'ı locate edemedim, herhalde bir hata var" diye düşünebilir ama gerçek sebep basitçe `isOpen` henüz `true` OLMAMASI olabilir — element aslında hiç sorunlu değildir, sadece koşul henüz gerçekleşmemiştir. Java analojisi: bir `if (isOpen) { createModal(); }` bloğunun çalışmaması gibi — nesne YARATILMAMIŞTIR, "bozuk" değildir, sadece koşul karşılanmamıştır. QA bağlamında: Modal\'ı test etmeden ÖNCE onu açan eylemi (butona tıklama) yapmak ve `isOpen`\'ı `true` yapan state\'in GERÇEKTEN güncellendiğini doğrulamak gerekir — aşağıdaki pano bu senaryoyu somutlaştırır.',
          en: 'The `{isOpen && <Modal/>}` pattern is like a HIDDEN DOOR: the door either FULLY exists (isOpen=true, the Modal enters the DOM) or FULLY does not exist (isOpen=false, the Modal is NEVER present in the DOM) — this should NOT be confused with CSS "hiding" (display:none); here the element is not even in the DOM TREE. Why is this one of the most common traps testers fall into? Because a tester might think "I could not locate the Modal, there must be a bug" when the real reason is simply that `isOpen` is NOT `true` yet — the element is not actually broken, the condition just has not happened yet. Java analogy: like an `if (isOpen) { createModal(); }` block not running — the object was NOT CREATED, it is not "broken", the condition simply was not met. In QA context: before testing the Modal, you must perform the action that opens it (clicking the button) and verify the state that sets `isOpen` to `true` REALLY updated — the board below makes this scenario concrete.',
        },
      },
      modalConditionalCode,
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '1️⃣',
            label: { tr: 'Kaynak (ne yazıldı)', en: 'Source (what was written)' },
            desc: {
              tr: '`{isOpen && <NewBugModal .../>}` — Modal\'ın render edilip edilmeyeceği tamamen `isOpen` state\'ine bağlı bir KOŞULDUR.',
              en: '`{isOpen && <NewBugModal .../>}` — whether the Modal renders at all is a CONDITION entirely dependent on the `isOpen` state.',
            },
          },
          {
            icon: '2️⃣',
            label: { tr: 'Gerçek DOM (ne oluştu)', en: 'Real DOM (what was produced)' },
            desc: {
              tr: '`isOpen=false` iken Modal DOM\'da HİÇ YOK (locate NoSuchElement verir). `isOpen=true` OLDUKTAN SONRA Modal gerçekten DOM\'a girer.',
              en: 'While `isOpen=false` the Modal is NOT in the DOM AT ALL (locating gives NoSuchElement). ONLY AFTER `isOpen=true` does the Modal really enter the DOM.',
            },
          },
          {
            icon: '3️⃣',
            label: { tr: 'Tester\'ın kararı', en: 'The tester\'s decision' },
            desc: {
              tr: '❌ Modal\'ı locate etmeden ÖNCE onu açan butona tıklamayı UNUTMA. ✅ Önce butona tıkla, SONRA `data-testid="new-bug-modal"`\'ı bekle/locate et.',
              en: '❌ Do NOT forget to click the button that opens it BEFORE locating the Modal. ✅ First click the button, THEN wait for/locate `data-testid="new-bug-modal"`.',
            },
          },
        ],
      },
      {
        type: 'simple-box',
        emoji: '🎯',
        content: {
          tr: 'Developer\'dan Ne İste: *"Modal açıldığında/kapandığında bunu doğrulayabileceğim bir işaret var mı? Örneğin modal tamamen render olduğunda `data-testid=\'new-bug-modal\'`\'ın DOM\'da olduğunu, kapandığında ise DOM\'dan tamamen kalktığını garanti eder misin?"* — Bu, conditional render\'ın "yarım açık" bir ara duruma düşmediğini (ör. animasyonla açılırken) garanti altına alır.',
          en: 'What to Ask the Developer: *"Is there a marker I can use to verify when the modal opens/closes? For example, could you guarantee that `data-testid=\'new-bug-modal\'` is in the DOM once the modal has fully rendered, and completely removed from the DOM once it closes?"* — This guarantees the conditional render does not get stuck in a "half-open" intermediate state (e.g. while animating open).',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'Bir test "New Bug" modalını locate etmeye çalışıyor ama `NoSuchElementException` alıyor. Test kodunu incelediğinde, "Yeni Bug" BUTONUNA hiç tıklanmadığını görüyorsun. Bu durumda kök neden nedir?',
          en: 'A test tries to locate the "New Bug" modal but gets `NoSuchElementException`. Reviewing the test code, you see the "New Bug" BUTTON was never clicked. What is the root cause here?',
        },
        options: [
          { id: 'a', text: { tr: 'Modal component\'i bozuktur', en: 'The Modal component is broken' } },
          { id: 'b', text: { tr: '`isOpen` state\'i hiç `true` olmadı, bu yüzden Modal DOM\'a hiç girmedi — bu bir bug değil, beklenen davranıştır', en: '`isOpen` state never became `true`, so the Modal never entered the DOM — this is not a bug, it is expected behavior' } },
          { id: 'c', text: { tr: 'Test aracı çöktü', en: 'The test tool crashed' } },
          { id: 'd', text: { tr: 'CSS Modal\'ı gizliyor', en: 'CSS is hiding the Modal' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Conditional render\'da element, koşul (isOpen) sağlanana KADAR DOM\'a hiç girmez. Butona tıklamadan Modal\'ı locate etmeye çalışmak, koşulun hiç TETİKLENMEMESİ nedeniyle beklenen bir NoSuchElement\'tir — bu bir uygulama bug\'ı değil, bir TEST HATASIDIR (eksik adım).',
          en: 'In a conditional render, the element never enters the DOM UNTIL the condition (isOpen) is met. Trying to locate the Modal without clicking the button is an expected NoSuchElement because the condition was never TRIGGERED — this is not an application bug, it is a TEST ERROR (a missing step).',
        },
        retryQuestion: {
          question: {
            tr: 'Modal bir CSS geçiş animasyonuyla (300ms fade-in) açılıyor. Butona tıkladıktan HEMEN sonra `data-testid="new-bug-modal"`\'ı locate eden bir test ne ile karşılaşabilir?',
            en: 'The Modal opens with a CSS transition animation (a 300ms fade-in). What might a test locating `data-testid="new-bug-modal"` IMMEDIATELY after clicking the button encounter?',
          },
          options: [
            { id: 'a', text: { tr: 'Hiçbir sorun, element her zaman anında bulunur', en: 'No problem, the element is always found instantly' } },
            { id: 'b', text: { tr: 'Element DOM\'a girmiş olabilir ama animasyon bitmeden `visible` sayılmayabilir — tıklama/etkileşim komutları başarısız olabilir', en: 'The element may have entered the DOM but may not count as `visible` until the animation finishes — click/interaction commands could fail' } },
            { id: 'c', text: { tr: 'Animasyonlar testleri hiç etkilemez', en: 'Animations never affect tests' } },
            { id: 'd', text: { tr: 'Element DOM\'dan tamamen silinir', en: 'The element is completely removed from the DOM' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Element `isOpen=true` olur olmaz DOM\'a girer (conditional render tetiklenir) ama CSS animasyonu (fade-in) sürerken tam olarak `visible`/etkileşilebilir sayılmayabilir — bu, GRUP A3\'teki Render Tree/CSSOM dersiyle doğrudan bağlantılıdır.',
            en: 'The element enters the DOM the moment `isOpen=true` (the conditional render fires), but while the CSS animation (fade-in) is running it may not yet count as fully `visible`/interactable — this connects directly to the Render Tree/CSSOM lesson in GROUP A3.',
          },
        },
      },

      // ── F5: List Render (StatusBadge pano) ──
      {
        type: 'heading',
        text: { tr: '📋 F5. List Render: `.map()` ve `key` — Tekil Satırı Locate Etme', en: '📋 F5. List Render: `.map()` and `key` — Locating a Single Row' },
      },
      {
        type: 'simple-box',
        emoji: '📋',
        content: {
          tr: '`.map()` ile liste render etmek, bir FOTOKOPİ MAKİNESİ gibidir: TEK bir "şablon" (`<li key={bug.id}>...`) alınır ve HER bug için bir kopyası basılır — `key`, React\'in bu kopyaları TAKİP etmek için kullandığı bir iç NUMARADIR, DOM\'da bir attribute olarak GÖRÜNMEZ. Peki neden bu, testerlar için özellikle kritik bir konu? Çünkü `.map()` çıktısı GÖRSEL olarak birbirinin aynı elementlerden oluşur — bir tester "3. satırı" (index ile) bulmaya çalışırsa, sıralama değişince YANLIŞ satırı bulur; ama `StatusBadge`\'in kendi prop\'una (bug.status) göre AYIRT edici bir attribute (data-bug-id gibi) varsa, doğru satır her zaman bulunur. Java analojisi: bir `List<Bug>` üzerinde `.forEach()` ile dönüp her Bug için bir nesne üretmek gibi — `key`, Java\'daki bir koleksiyonun iç index\'i gibidir, iş mantığının bir parçası DEĞİLDİR. QA bağlamında: aşağıdaki pano, StatusBadge\'in `.map()` içinde nasıl üretildiğini ve `key`\'in neden bir locator OLMADIĞINI gösterir.',
          en: 'Rendering a list with `.map()` is like a PHOTOCOPIER: ONE "template" (`<li key={bug.id}>...`) is taken and a copy is printed for EVERY bug — `key` is an internal NUMBER React uses to TRACK these copies, it is NOT VISIBLE as a DOM attribute. Why is this especially critical for testers? Because `.map()` output consists of elements that LOOK visually identical — a tester trying to find "row 3" (by index) finds the WRONG row once the ordering changes; but if `StatusBadge` has a distinguishing attribute based on its own prop (bug.status), like `data-bug-id`, the correct row is always found. Java analogy: like iterating over a `List<Bug>` with `.forEach()` to produce an object for each Bug — `key` is like a collection\'s internal index in Java, it is NOT part of the business logic. In QA context: the board below shows how StatusBadge is produced inside `.map()` and why `key` is NOT a locator.',
        },
      },
      statusBadgeListCode,
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '1️⃣',
            label: { tr: 'Kaynak (ne yazıldı)', en: 'Source (what was written)' },
            desc: {
              tr: '`bugs.map(bug => <li key={bug.id}><StatusBadge status={bug.status}/></li>)` — her satır AYNI şablondan, FARKLI prop\'la üretilir.',
              en: '`bugs.map(bug => <li key={bug.id}><StatusBadge status={bug.status}/></li>)` — every row is produced from the SAME template with a DIFFERENT prop.',
            },
          },
          {
            icon: '2️⃣',
            label: { tr: 'Gerçek DOM (ne oluştu)', en: 'Real DOM (what was produced)' },
            desc: {
              tr: 'N tane görsel olarak BENZER `<li>` — `key` DOM\'da bir attribute olarak GÖRÜNMEZ, sadece React\'in içinde vardır.',
              en: 'N visually SIMILAR `<li>` elements — `key` does NOT appear as a DOM attribute, it only exists inside React.',
            },
          },
          {
            icon: '3️⃣',
            label: { tr: 'Tester\'ın kararı', en: 'The tester\'s decision' },
            desc: {
              tr: '❌ `key`\'e göre locate ETMEYE ÇALIŞMA (DOM\'da yok). ❌ index\'e (`li[3]`) bağlanma. ✅ `data-bug-id`/metne göre ilişkisel bul.',
              en: '❌ Do NOT try to locate by `key` (it is not in the DOM). ❌ Do not bind to an index (`li[3]`). ✅ Find relationally by `data-bug-id`/text.',
            },
          },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester DevTools\'ta bir BugCard\'ı inceliyor ve React DevTools eklentisinde `key: "42"` gördüğünü fark ediyor. Bu `key` değerini `page.locator(\'[key="42"]\')` ile locate etmeye çalışırsa ne olur?',
          en: 'A tester inspects a BugCard in DevTools and notices `key: "42"` in the React DevTools extension. If they try to locate using this `key` value with `page.locator(\'[key="42"]\')`, what happens?',
        },
        options: [
          { id: 'a', text: { tr: 'Doğru elemente ulaşır çünkü key benzersizdir', en: 'It reaches the correct element because key is unique' } },
          { id: 'b', text: { tr: 'Hiçbir eleman bulamaz — `key` bir DOM attribute\'u DEĞİLDİR, sadece React\'in iç takip mekanizmasında bulunur', en: 'It finds no element — `key` is NOT a DOM attribute, it exists only in React\'s internal tracking mechanism' } },
          { id: 'c', text: { tr: 'Tüm BugCard\'ları bulur', en: 'It finds all BugCards' } },
          { id: 'd', text: { tr: 'Hata fırlatır çünkü key geçersiz bir syntax\'tır', en: 'It throws an error because key is invalid syntax' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`key`, React DevTools gibi ARAÇLARDA görünse de, tarayıcının gerçek DOM\'unda bir attribute olarak YAZILMAZ — sadece React\'in iç reconciliation mekanizmasında kullanılır. `[key="42"]` gibi bir CSS selector hiçbir zaman eşleşmez.',
          en: 'Even though `key` is visible in TOOLS like React DevTools, it is NEVER written as an attribute in the browser\'s real DOM — it is used only internally by React\'s reconciliation mechanism. A CSS selector like `[key="42"]` never matches anything.',
        },
        retryQuestion: {
          question: {
            tr: 'BugCard listesi filtrelendiğinde sıralama değişiyor (en yeni bug en üste geliyor). `page.locator(\'li\').nth(0)` yerine hangi yaklaşım tekil bir satırı GÜVENİLİR şekilde bulur?',
            en: 'When the BugCard list is filtered, the order changes (the newest bug moves to the top). Instead of `page.locator(\'li\').nth(0)`, which approach RELIABLY finds a single row?',
          },
          options: [
            { id: 'a', text: { tr: '`li[data-bug-id="42"]` gibi ilişkisel/kimlik tabanlı bir locator', en: 'A relational/identity-based locator like `li[data-bug-id="42"]`' } },
            { id: 'b', text: { tr: '`li:last-child` — her zaman son elemanı varsayarak', en: '`li:last-child` — assuming it is always the last element' } },
            { id: 'c', text: { tr: 'React\'in `key` değerini CSS selector olarak kullanarak', en: 'Using React\'s `key` value as a CSS selector' } },
            { id: 'd', text: { tr: 'Sayfayı yenileyip sıralamanın sabitlenmesini umarak', en: 'Reloading the page and hoping the order stabilizes' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Bir kimliğe (`data-bug-id`) göre ilişkisel locate, sıralamadan TAMAMEN bağımsızdır — liste ne kadar yeniden sıralanırsa sıralansın aynı bug\'a ulaşır. Index (`nth`/`last-child`) ve React `key`\'i (DOM\'da yok) bu iş için uygun değildir.',
            en: 'Relational locating by an identity (`data-bug-id`) is COMPLETELY independent of ordering — no matter how the list re-sorts, it reaches the same bug. Index (`nth`/`last-child`) and React\'s `key` (not in the DOM) are not suitable for this job.',
          },
        },
      },

      // ── F6: data-testid React'te Nasıl Eklenir (Toast pano) ──
      {
        type: 'heading',
        text: { tr: '🏷️ F6. `data-testid` React\'te Nasıl Eklenir', en: '🏷️ F6. How to Add `data-testid` in React' },
      },
      {
        type: 'simple-box',
        emoji: '🏷️',
        content: {
          tr: 'React\'te bir `data-testid` eklemek, bir HTML attribute\'u eklemekten farklı DEĞİLDİR — bu, testerların çoğu zaman bilmediği ama ÇOK BASİT bir gerçektir: `className` gibi başka bir JSX attribute\'unun yanına, aynı sözdiziminde `data-testid="..."` yazmak yeterlidir; React bunu OLDUĞU GİBİ DOM\'a geçirir. Peki neden bu bilgi bir tester için GÜÇ verir? Çünkü "developer\'dan data-testid iste" demek soyut kalabilir — ama tam olarak HANGİ SATIRA, HANGİ SÖZDİZİMİYLE ekleneceğini gösterebilen bir tester, developer\'ın işini saniyeler içinde yapılabilir hale getirir (PR\'da tek satırlık bir diff). Java analojisi: bir sınıfa `@VisibleForTesting` gibi bir annotation eklemek kadar basit ve düşük riskli bir değişikliktir — iş mantığını etkilemez. QA bağlamında: Toast bildirimi GEÇİCİ olduğu (birkaç saniyede kaybolduğu) için özellikle stabil bir kancaya ihtiyaç duyar; aşağıdaki pano ÖNCESİ/SONRASI karşılaştırmasını gösterir.',
          en: 'Adding a `data-testid` in React is NO DIFFERENT from adding an HTML attribute — a very SIMPLE fact many testers do not know: just write `data-testid="..."` alongside another JSX attribute like `className`, in the same syntax; React passes it STRAIGHT THROUGH to the DOM. Why does this knowledge empower a tester? Because saying "ask the developer for a data-testid" can stay abstract — but a tester who can show EXACTLY WHICH LINE and WHAT SYNTAX to add it with turns the developer\'s work into something doable in seconds (a one-line diff in a PR). Java analogy: as simple and low-risk a change as adding an annotation like `@VisibleForTesting` to a class — it does not affect business logic. In QA context: because a Toast notification is TRANSIENT (disappearing within a few seconds), it especially needs a stable hook; the board below shows a BEFORE/AFTER comparison.',
        },
      },
      toastDataTestIdCode,
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '1️⃣',
            label: { tr: 'Kaynak (öncesi/sonrası)', en: 'Source (before/after)' },
            desc: {
              tr: 'Öncesi: `<div className={styles.toast}>`. Sonrası: AYNI satıra `data-testid="toast"` eklendi — tek satırlık, düşük riskli bir değişiklik.',
              en: 'Before: `<div className={styles.toast}>`. After: `data-testid="toast"` added to the SAME line — a one-line, low-risk change.',
            },
          },
          {
            icon: '2️⃣',
            label: { tr: 'Gerçek DOM (öncesi/sonrası)', en: 'Real DOM (before/after)' },
            desc: {
              tr: 'Öncesi: sadece hash\'li class var, stabil kanca YOK. Sonrası: `data-testid="toast"` DOM\'da AYNEN görünür.',
              en: 'Before: only a hashed class exists, NO stable hook. After: `data-testid="toast"` appears VERBATIM in the DOM.',
            },
          },
          {
            icon: '3️⃣',
            label: { tr: 'Tester\'ın kararı', en: 'The tester\'s decision' },
            desc: {
              tr: '✅ Toast GEÇİCİ olduğundan (birkaç saniyede kaybolur), görünür olur olmaz HEMEN `getByTestId(\'toast\')` ile doğrula — beklemeyi uzatma.',
              en: '✅ Since the Toast is TRANSIENT (disappears in a few seconds), verify it with `getByTestId(\'toast\')` the MOMENT it becomes visible — do not delay the wait.',
            },
          },
        ],
      },
      addTestIdToToastPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Bir developer "data-testid eklemek büyük bir refactor gerektirir, zaman alır" diyor. Bir tester bu düşünceye JSX kaynağını göstererek nasıl karşılık verir?',
          en: 'A developer says "adding data-testid requires a big refactor, it will take time". How does a tester respond to this by showing the JSX source?',
        },
        options: [
          { id: 'a', text: { tr: 'Haklısın, bu isteği geri çeker', en: 'They agree and withdraw the request' } },
          { id: 'b', text: { tr: 'İlgili JSX satırını gösterip, `data-testid="..."` eklemenin `className` yanına TEK bir attribute eklemek kadar basit olduğunu somut kodla kanıtlar', en: 'They show the relevant JSX line and prove with concrete code that adding `data-testid="..."` is as simple as adding ONE attribute alongside `className`' } },
          { id: 'c', text: { tr: 'Konudan tamamen vazgeçer', en: 'They drop the topic entirely' } },
          { id: 'd', text: { tr: 'Bunun yerine class\'a bağlanmayı önerir', en: 'They suggest binding to the class instead' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Somut kod göstermek soyut bir isteği ("test edilebilirlik istiyorum") saniyeler içinde uygulanabilir bir DEĞİŞİKLİĞE ("şu satıra şunu ekle") dönüştürür. Bu, sayfanın "ortak dil konuşma" hedefinin tam bir örneğidir.',
          en: 'Showing concrete code turns an abstract request ("I want testability") into a change implementable in seconds ("add this to this line"). This is a perfect example of the page\'s "speak a common language" goal.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir developer "data-testid eklersem bundle boyutu büyür, performans etkilenir" diye endişeleniyor. Bu endişeye teknik olarak doğru cevap nedir?',
            en: 'A developer worries "if I add data-testid, the bundle size grows and performance is affected". What is the technically correct response to this concern?',
          },
          options: [
            { id: 'a', text: { tr: 'Haklı bir endişe, data-testid eklenmemeli', en: 'A valid concern, data-testid should not be added' } },
            { id: 'b', text: { tr: 'Bir string literal eklemek (bir HTML attribute\'u) ölçülemeyecek kadar küçük bir etkidir; bu endişe production\'daki gerçek performans darboğazlarıyla (büyük JS bundle\'ları, gereksiz re-render) KARIŞTIRILMAMALIDIR', en: 'Adding a string literal (an HTML attribute) has an immeasurably small impact; this concern should NOT be confused with real production performance bottlenecks (large JS bundles, unnecessary re-renders)' } },
            { id: 'c', text: { tr: 'Her data-testid 1MB\'a kadar büyüklük ekler', en: 'Every data-testid adds up to 1MB in size' } },
            { id: 'd', text: { tr: 'data-testid sadece development modunda çalışır', en: 'data-testid only works in development mode' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bir attribute string\'i eklemek, bytes cinsinden ÖLÇÜLEMEYECEK kadar küçük bir maliyettir — gerçek performans sorunları (büyük dependency\'ler, optimize edilmemiş re-render\'lar) tamamen farklı bir konudur. Bu endişe genelde bir gerekçe değil, bir savunma refleksidir.',
            en: 'Adding an attribute string is a cost so small in bytes it is IMMEASURABLE — real performance issues (large dependencies, unoptimized re-renders) are a completely different topic. This concern is usually a defensive reflex, not a real justification.',
          },
        },
      },

      // ── F7: React'te Sağlam Locator Stratejisi (BugCard pano — Opus referansı) ──
      {
        type: 'heading',
        text: { tr: '🎯 F7. React\'te Sağlam Locator Stratejisi', en: '🎯 F7. A Robust Locator Strategy in React' },
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
          tr: 'Developer\'dan Ne İste: *"BugCard component\'ine satır başına `data-testid=\'bug-card-{id}\'` ekler misin? CSS Module class\'ları her build\'de hash değiştirdiği için otomasyonda onlara bağlanamıyorum; kartı id\'yle bulmam gerekiyor, yoksa her deploy\'da testim kırılıyor."* — Bu cümle iki şeyi doğru yapar: (1) SORUNU teknik olarak doğru anlatır (hash değişimi), (2) somut, uygulanabilir bir ÇÖZÜM ister (belirli bir attribute). "Şu buton çalışmıyor" demek yerine böyle konuşmak, developer\'la aynı dili konuşmaktır — döngüyü kısaltır. Not: locator SYNTAX derinliği (getByRole/getByTestId nasıl yazılır) için /playwright ve /cypress sayfalarına bak; bu sayfa "neden bu locator" sorusuna cevap verir. Bu grupta 4 component (BugCard, Modal, StatusBadge, Toast) için Kaynak→DOM→Locator panosu gördün — hepsinin ortak dersi: kaynağı okuyup DOM\'u tahmin et, hash\'e/index\'e/key\'e güvenme, stabil bir kanca iste.',
          en: 'What to Ask the Developer: *"Could you add `data-testid=\'bug-card-{id}\'` per row to the BugCard component? CSS Module classes change their hash on every build, so I cannot bind to them in automation; I need to find the card by id, otherwise my test breaks on every deploy."* — This sentence does two things right: (1) it describes the PROBLEM technically correctly (the hash change), (2) it asks for a concrete, actionable SOLUTION (a specific attribute). Speaking this way instead of "that button does not work" is speaking the same language as the developer — it shortens the loop. Note: for locator SYNTAX depth (how to write getByRole/getByTestId) see the /playwright and /cypress pages; this page answers "why this locator". In this group you saw a Source -> DOM -> Locator board for 4 components (BugCard, Modal, StatusBadge, Toast) — their common lesson: read the source and predict the DOM, do not trust a hash/index/key, ask for a stable hook.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'BugCard, Modal, StatusBadge ve Toast panolarının HEPSİNDE ortak olan tek bir ders şudur: ...',
          en: 'The one lesson common to ALL of the BugCard, Modal, StatusBadge, and Toast boards is: ...',
        },
        options: [
          { id: 'a', text: { tr: 'Her component farklı bir framework kullanmalı', en: 'Every component should use a different framework' } },
          { id: 'b', text: { tr: 'Kaynağı okuyup üretilecek DOM\'u tahmin etmek ve hash/index/key gibi kırılgan alanlar yerine stabil bir kanca (data-testid/role) istemek', en: 'Reading the source to predict the produced DOM, and asking for a stable hook (data-testid/role) instead of fragile fields like hash/index/key' } },
          { id: 'c', text: { tr: 'Tüm component\'ler class component olarak yazılmalı', en: 'All components should be written as class components' } },
          { id: 'd', text: { tr: 'CSS Modules asla kullanılmamalı', en: 'CSS Modules should never be used' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Dört panonun (hash class, conditional render, list render, data-testid ekleme) ortak dersi budur: kaynağı okuyup DOM\'u ZİHNİNDE canlandırmak ve build/sıralama/React-içi mekanizmalardan (hash, index, key) BAĞIMSIZ, kasıtlı bir kimlik (data-testid, role) istemek.',
          en: 'This is the common lesson of all four boards (hash class, conditional render, list render, adding data-testid): reading the source to picture the DOM IN YOUR MIND, and asking for a deliberate identity (data-testid, role) INDEPENDENT of build/ordering/React-internal mechanisms (hash, index, key).',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tester React kaynağını okuyabiliyor ama developer\'la konuşurken hâlâ "şu component çalışmıyor" diyor. Bu sayfanın hedefine göre eksik olan nedir?',
            en: 'A tester can read React source, but when talking to the developer still says "that component does not work". According to this page\'s goal, what is missing?',
          },
          options: [
            { id: 'a', text: { tr: 'Hiçbir şey eksik değil, bu yeterlidir', en: 'Nothing is missing, this is enough' } },
            { id: 'b', text: { tr: 'Ortak dil konuşmak: "hangi component", "hangi prop/state", "hangi DOM sonucu" gibi SPESİFİK terimlerle konuşmak — genel "çalışmıyor" ifadesi döngüyü uzatır', en: 'Speaking a common language: using SPECIFIC terms like "which component", "which prop/state", "which DOM outcome" — a vague "does not work" lengthens the loop' } },
            { id: 'c', text: { tr: 'Sadece Selenium syntax\'ı bilmesi yeterlidir', en: 'Only knowing Selenium syntax is enough' } },
            { id: 'd', text: { tr: 'CSS öğrenmesi gerekmez', en: 'They do not need to learn CSS' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bu sayfanın giriş bölümündeki temel hedeflerden biri "ortak dil"dir: "BugCard içindeki StatusBadge, isOpen state\'i true olmadığı için Modal DOM\'da yok" demek, "çalışmıyor" demekten çok daha hızlı bir çözüme götürür — bu, kaynağı OKUYABİLMEKLE birlikte bunu ANLATABİLMEYİ de gerektirir.',
            en: 'One of this page\'s core goals, stated in its introduction, is a "common language": saying "the StatusBadge inside BugCard — the Modal is not in the DOM because isOpen is not true" leads to a solution much faster than saying "it does not work" — this requires being able to EXPLAIN the source, not just read it.',
          },
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-f',
        promptTr: 'React\'te bir component\'in neden bir fonksiyon olduğunu, props ile state arasındaki farkı ve `{isOpen && <Modal/>}` gibi bir conditional render\'ın locator\'ı nasıl etkilediğini, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, why a React component is a function, the difference between props and state, and how a conditional render like `{isOpen && <Modal/>}` affects a locator, to a newcomer.',
        keywords: ['component', 'function', 'props', 'state', 'conditional', 'modal', 'dom', 'jsx'],
        modelAnswerTr: 'Bir React component\'i sade bir fonksiyondur: prop\'ları parametre gibi alır ve JSX döner — bu JSX gerçek DOM değil, React\'in gerçek DOM\'a dönüştüreceği bir tariftir. Props üst component\'ten aşağı akar ve component onu değiştiremez; state ise component\'in kendi hafızasıdır ve kendisi günceller. `{isOpen && <Modal/>}` gibi bir conditional render\'da, koşul false iken element DOM\'da TAMAMEN yoktur (gizli değil, yok); bu yüzden Modal\'ı locate etmeden önce onu açan eylemi yapmak ve state\'in gerçekten güncellendiğini bilmek gerekir.',
        modelAnswerEn: 'A React component is a plain function: it takes props like parameters and returns JSX — this JSX is not real DOM, it is a recipe React will turn into real DOM. Props flow down from the parent and the component cannot change them; state is the component\'s own memory and it updates it itself. In a conditional render like `{isOpen && <Modal/>}`, while the condition is false the element is COMPLETELY absent from the DOM (not hidden, absent); so before locating the Modal you must perform the action that opens it and know that the state has really updated.',
      },
    ],
  },

  // ══ GRUP G — Angular: Kaynağı Okumak ════════════════════════════════════════
  {
    title: { tr: '🅰️ Angular: Kaynağı Okumak', en: '🅰️ Angular: Reading the Source' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🅰️',
        content: {
          tr: 'Angular, React\'ten farklı olarak component\'i İKİYE böler: mantık `.ts` dosyasında, arayüz `.html` template\'inde. Bu, bir tiyatro oyunundaki SENARYO (`.ts` — kim ne yapar) ile SAHNE DÜZENİ (`.html` — ne nerede durur) ayrımı gibidir. Neden testerı ilgilendirir? Çünkü Angular DOM\'a `_ngcontent-xxx` gibi otomatik, anlamsız attribute\'lar ekler — bunlar stil izolasyonu içindir ve locate için ASLA kullanılmaz, tıpkı React\'in hash class\'ı gibi kırılgandır. `*ngIf` bir elementi tamamen DOM\'dan çıkarır (React\'in conditional render\'ının karşılığı), `*ngFor` ise liste üretir. Java analojisi: `.ts` sınıf gövdesi, `.html` ise o sınıfın dışa açtığı görünüm sözleşmesi gibidir. QA bağlamında: `_ngcontent`/hash gibi otomatik üretilen attribute\'ları tanıyan tester, developer\'dan `[attr.data-testid]` binding\'i ister. Bu grup boyunca GRUP F\'teki React kalıplarıyla SÜREKLİ karşılaştırma yapacağız.',
          en: 'Angular, unlike React, splits the component in TWO: the logic in a `.ts` file, the UI in an `.html` template. This is like the split between the SCRIPT (`.ts` — who does what) and the STAGE LAYOUT (`.html` — what stands where) in a theater play. Why does it concern a tester? Because Angular adds automatic, meaningless attributes like `_ngcontent-xxx` to the DOM — these are for style isolation and are NEVER used for locating, being just as fragile as React\'s hash class. `*ngIf` removes an element entirely from the DOM (the counterpart of React\'s conditional render), while `*ngFor` produces a list. Java analogy: the `.ts` is like the class body and the `.html` like the view contract that class exposes. In QA context: a tester who recognizes auto-generated attributes like `_ngcontent`/hash asks the developer for an `[attr.data-testid]` binding. Throughout this group we will CONTINUOUSLY compare against the React patterns from GROUP F.',
        },
      },

      // ── G1: Component + Template Ayrımı ──
      {
        type: 'heading',
        text: { tr: '📂 G1. Component + Template Ayrımı: `.ts` + `.html`', en: '📂 G1. Component + Template Separation: `.ts` + `.html`' },
      },
      {
        type: 'simple-box',
        emoji: '📂',
        content: {
          tr: 'Angular\'ın `.ts`/`.html` ayrımı, bir binanın MÜHENDİSLİK PLANI (yük hesapları, davranış — `.ts`) ile İÇ DEKORASYON PLANI (görsel yerleşim — `.html`) arasındaki ayrım gibidir: aynı binayı tarif eden İKİ AYRI belge, HER ZAMAN birlikte kullanılır. Peki neden bu ayrımı bilmek işine yarar? Çünkü bir bug\'ın kaynağını ararken (React\'te tek bir JSX dosyasına bakman yeterliyken) Angular\'da HEM `.ts`\'e (mantık doğru mu?) HEM `.html`\'e (template doğru mu bağlanmış?) bakman gerekir — sadece birini okumak eksik bir tanı koyar. Java analojisi: eski Java web geliştirmede Servlet (mantık, `.ts`\'e benzer) ile JSP (görünüm, `.html`\'e benzer) ayrımı gibi, ya da MVC\'deki Controller/View ayrımı gibi. QA bağlamında: "bu bug frontend\'de" dediğinde, Angular\'da bunu "component sınıfında mı (`.ts`) yoksa template\'te mi (`.html`)" diye İKİYE ayırarak daha spesifik konuşabilirsin.',
          en: 'Angular\'s `.ts`/`.html` separation is like the split between a building\'s ENGINEERING PLAN (load calculations, behavior — `.ts`) and its INTERIOR DECORATION PLAN (visual layout — `.html`): TWO SEPARATE documents describing the same building, ALWAYS used together. Why is knowing this distinction useful? Because when tracking down a bug\'s source (whereas in React a single JSX file is enough), in Angular you must check BOTH `.ts` (is the logic correct?) AND `.html` (is the template bound correctly?) — reading only one gives an incomplete diagnosis. Java analogy: like the Servlet (logic, similar to `.ts`) vs JSP (view, similar to `.html`) separation in old Java web development, or the Controller/View split in MVC. In QA context: when you say "this bug is in the frontend", in Angular you can speak more specifically by splitting it into "is it in the component class (`.ts`) or the template (`.html`)".',
        },
      },
      tsHtmlMergeSteps,
      {
        type: 'quiz',
        question: {
          tr: 'Bir "New Bug" formunda submit butonu tıklandığında hiçbir şey olmuyor. `bug-form.component.ts`\'i inceliyorsun ve `onSubmit()` metodunun doğru yazıldığını görüyorsun. Sıradaki adımın ne olmalı?',
          en: 'Clicking the submit button on a "New Bug" form does nothing. You inspect `bug-form.component.ts` and see `onSubmit()` is written correctly. What should your next step be?',
        },
        options: [
          { id: 'a', text: { tr: 'Sorun yok demektir, .ts dosyası doğruysa her şey doğrudur', en: 'It means there is no problem, if the .ts file is correct everything is correct' } },
          { id: 'b', text: { tr: '`.html` template\'ini kontrol et — buton `(click)="onSubmit()"` ile GERÇEKTEN bu metoda bağlanmış mı?', en: 'Check the `.html` template — is the button REALLY bound to this method with `(click)="onSubmit()"`?' } },
          { id: 'c', text: { tr: 'Sunucu loglarına bakmaya gerek yok', en: 'There is no need to check server logs' } },
          { id: 'd', text: { tr: 'CSS dosyasını sil', en: 'Delete the CSS file' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Angular\'da mantığın (`.ts`) DOĞRU olması, template\'in (`.html`) o mantığa GERÇEKTEN bağlı olduğunu garanti etmez — buton yanlış metoda bağlanmış, event binding\'i eksik veya yanlış yazılmış olabilir. İki dosya AYRI olduğundan, her ikisi de kontrol edilmelidir.',
          en: 'In Angular, the logic (`.ts`) being CORRECT does not guarantee the template (`.html`) is REALLY bound to that logic — the button might be bound to the wrong method, or the event binding might be missing or written incorrectly. Since the two files are SEPARATE, both must be checked.',
        },
        retryQuestion: {
          question: {
            tr: 'React\'te aynı "buton tıklanıyor ama çalışmıyor" bug\'ını araştırırken kaç dosyaya bakman gerekir, Angular\'a kıyasla?',
            en: 'Investigating the same "button is clicked but does not work" bug in React, how many files do you need to check, compared to Angular?',
          },
          options: [
            { id: 'a', text: { tr: 'React\'te de iki ayrı dosya (mantık ve görünüm) kontrol edilmelidir', en: 'In React too, two separate files (logic and view) must be checked' } },
            { id: 'b', text: { tr: 'Genelde TEK bir dosya (component .jsx) yeterlidir çünkü JSX hem mantığı hem görünümü aynı dosyada tutar', en: 'Usually a SINGLE file (the component .jsx) is enough because JSX keeps both logic and view in the same file' } },
            { id: 'c', text: { tr: 'React\'te dosya kontrolüne hiç gerek yoktur', en: 'In React there is no need to check files at all' } },
            { id: 'd', text: { tr: 'React\'te 3 ayrı dosyaya bakmak gerekir', en: 'In React you need to check 3 separate files' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'React\'te component genelde TEK bir `.jsx`/`.tsx` dosyasındadır — hem `onClick={onSubmit}` bağlantısı hem `onSubmit` metodunun kendisi AYNI dosyada görünür. Angular\'ın `.ts`/`.html` ayrımı ekstra bir "iki dosyaya bakma" adımı GEREKTİRİR — bu, iki framework arasındaki somut bir iş akışı farkıdır.',
            en: 'In React, a component is usually in a SINGLE `.jsx`/`.tsx` file — both the `onClick={onSubmit}` binding and the `onSubmit` method itself are visible in the SAME file. Angular\'s `.ts`/`.html` separation REQUIRES an extra "check two files" step — a concrete workflow difference between the two frameworks.',
          },
        },
      },

      // ── G2: Template Syntax ──
      {
        type: 'heading',
        text: { tr: '🔤 G2. Template Syntax: `{{ }}`, `[property]`, `(event)`, `*ngIf`, `*ngFor`', en: '🔤 G2. Template Syntax: `{{ }}`, `[property]`, `(event)`, `*ngIf`, `*ngFor`' },
      },
      {
        type: 'simple-box',
        emoji: '🔤',
        content: {
          tr: 'Angular template syntax\'ı, React\'in JSX kalıplarının FARKLI bir DİLDEKİ karşılıklarıdır: `{{ }}` = React\'in `{değişken}`\'i (metin yazma), `[property]` = React\'in `prop={değer}`\'i (bir özelliğe değer bağlama), `(event)` = React\'in `onClick={...}`\'i (olay bağlama), `*ngIf`/`*ngFor` = React\'in `{koşul&&}`/`.map()`\'i. Peki neden bu paralelliği bilmek işine yarar? Çünkü React\'i zaten okuyabilen bir tester, Angular\'ın syntax\'ını "aynı KAVRAMIN farklı bir yazımı" olarak görüp hızlıca öğrenir — sıfırdan başlamaz. Java analojisi: aynı tasarım desenini (Observer, Strategy) farklı bir dilde (Kotlin, Python) görmek gibi — sözdizimi değişir, kavram AYNI kalır. QA bağlamında: hangi framework\'te olursan ol, "bu ifade DOM\'a ne zaman, ne yazacak?" sorusunu aynı 5 kalıba (metin, özellik, olay, koşul, liste) indirgeyerek cevaplayabilirsin.',
          en: 'Angular template syntax is the DIFFERENT-LANGUAGE counterpart of React\'s JSX patterns: `{{ }}` = React\'s `{variable}` (writing text), `[property]` = React\'s `prop={value}` (binding a value to a property), `(event)` = React\'s `onClick={...}` (binding an event), `*ngIf`/`*ngFor` = React\'s `{condition&&}`/`.map()`. Why is knowing this parallel useful? Because a tester who can already read React sees Angular\'s syntax as "a different spelling of the SAME CONCEPT" and learns it quickly — they do not start from scratch. Java analogy: like seeing the same design pattern (Observer, Strategy) in a different language (Kotlin, Python) — the syntax changes, the CONCEPT stays the SAME. In QA context: whatever framework you are in, you can answer "when will this expression write what to the DOM?" by reducing it to the same 5 patterns (text, property, event, condition, list).',
        },
      },
      angularTemplateSyntaxSteps,
      {
        type: 'quiz',
        question: {
          tr: 'React\'te `<button onClick={() => setIsOpen(true)}>` yazan bir tester, Angular kaynağında `(click)="isOpen = true"` görüyor. Bu iki syntax hangi ORTAK kavramı temsil eder?',
          en: 'A tester who wrote `<button onClick={() => setIsOpen(true)}>` in React sees `(click)="isOpen = true"` in Angular source. What COMMON concept do these two syntaxes represent?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiçbir ortak yanları yok, tamamen farklı kavramlar', en: 'They have nothing in common, completely different concepts' } },
          { id: 'b', text: { tr: 'İkisi de bir DOM olayını (click) bir davranışa/durum değişikliğine BAĞLAR — event binding', en: 'Both BIND a DOM event (click) to a behavior/state change — event binding' } },
          { id: 'c', text: { tr: 'İkisi de bir CSS stilini değiştirir', en: 'Both change a CSS style' } },
          { id: 'd', text: { tr: 'İkisi de bir HTTP isteği gönderir', en: 'Both send an HTTP request' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'İkisi de AYNI kavramı (bir tıklama olayını bir davranışa bağlamak) farklı sözdizimiyle ifade eder. Bu paralelliği görebilen tester, yeni bir framework\'ün syntax\'ını "yeni bir kavram" değil "bildiği kavramın yeni yazımı" olarak öğrenir.',
          en: 'Both express the SAME concept (binding a click event to a behavior) with different syntax. A tester who can see this parallel learns a new framework\'s syntax not as "a new concept" but as "a new spelling of a concept they already know".',
        },
        retryQuestion: {
          question: {
            tr: 'Angular\'da `*ngFor="let bug of bugs"` görüyorsun. React\'teki HANGİ kalıp bununla aynı işi yapar?',
            en: 'You see `*ngFor="let bug of bugs"` in Angular. Which pattern in React does the same job?',
          },
          options: [
            { id: 'a', text: { tr: '`{isOpen && <X/>}`', en: '`{isOpen && <X/>}`' } },
            { id: 'b', text: { tr: '`bugs.map(bug => ...)`', en: '`bugs.map(bug => ...)`' } },
            { id: 'c', text: { tr: '`useState(bugs)`', en: '`useState(bugs)`' } },
            { id: 'd', text: { tr: '`useEffect(() => ...)`', en: '`useEffect(() => ...)`' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`*ngFor`, bir listeyi dönüp her eleman için bir kopya üreten bir direktiftir — React\'te bunun karşılığı `.map()`\'tir. Her ikisinde de bir iç takip anahtarı (trackBy/key) vardır ve bu anahtar DOM\'da GÖRÜNMEZ.',
            en: '`*ngFor` is a directive that iterates a list and produces a copy for each item — in React the counterpart is `.map()`. Both have an internal tracking key (trackBy/key), and this key is NOT VISIBLE in the DOM.',
          },
        },
      },

      // ── G3: *ngIf/*ngFor ↔ React karşılaştırması ──
      {
        type: 'heading',
        text: { tr: '🔀 G3. `*ngIf` → Conditional Render, `*ngFor` → List (React Karşılaştırması)', en: '🔀 G3. `*ngIf` -> Conditional Render, `*ngFor` -> List (React Comparison)' },
      },
      {
        type: 'simple-box',
        emoji: '🔀',
        content: {
          tr: '`*ngIf`, React\'in `{koşul && <X/>}`\'inin BİREBİR Angular karşılığıdır: element koşul false iken DOM\'da GİZLİ değil, TAMAMEN YOKTUR — CSS `display:none` ile KARIŞTIRILMAMALIDIR. Peki neden bu paralelliği somut görmek gerekir? Çünkü React\'te öğrendiğin "conditional render\'da element bazen hiç yok" dersi, Angular\'da AYNEN geçerlidir — framework değişse de KAVRAM aynı kalır. Java analojisi: bir `if` bloğunun içindeki `new Modal()` çağrısının çalışmaması gibi — nesne YARATILMAMIŞTIR, "bozuk" değildir. QA bağlamında: aşağıdaki film bu davranışı Angular\'da somutlaştırır — bir Modal\'ın `*ngIf` ile DOM\'a girip çıkışını izleyeceksin, ardından React ile yan yana karşılaştıracaksın.',
          en: '`*ngIf` is the VERBATIM Angular counterpart of React\'s `{condition && <X/>}`: while the condition is false, the element is not HIDDEN in the DOM, it is COMPLETELY ABSENT — this should NOT be confused with CSS `display:none`. Why is it necessary to see this parallel concretely? Because the lesson you learned in React — "in a conditional render the element is sometimes not there at all" — applies IDENTICALLY in Angular; the framework changes but the CONCEPT stays the same. Java analogy: like an `if` block\'s `new Modal()` call not running — the object was NOT CREATED, it is not "broken". In QA context: the film below makes this behavior concrete in Angular — you will watch a Modal enter and leave the DOM via `*ngIf`, then compare it side-by-side with React.',
        },
      },
      ngIfDoorFilm,
      ngReactComparisonTable,
      {
        type: 'quiz',
        question: {
          tr: 'Bir Angular testinde `*ngIf="isOpen"` ile kontrol edilen bir Modal\'ı, buton tıklanmadan locate etmeye çalışıyorsun. Bu, React\'teki hangi senaryonun BİREBİR karşılığıdır?',
          en: 'In an Angular test you try to locate a Modal controlled by `*ngIf="isOpen"` without clicking the button. This is the VERBATIM counterpart of which React scenario?',
        },
        options: [
          { id: 'a', text: { tr: 'React\'te bunun bir karşılığı yoktur', en: 'There is no counterpart to this in React' } },
          { id: 'b', text: { tr: '`{isOpen && <Modal/>}` false iken Modal\'ı locate etmeye çalışmak — ikisi de aynı NoSuchElement sonucunu verir', en: 'Trying to locate the Modal while `{isOpen && <Modal/>}` is false — both give the same NoSuchElement result' } },
          { id: 'c', text: { tr: 'React\'te bu bir hata fırlatır, Angular\'da fırlatmaz', en: 'In React this throws an error, in Angular it does not' } },
          { id: 'd', text: { tr: 'Angular\'da bu her zaman başarılıdır', en: 'In Angular this always succeeds' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`*ngIf` ve `{koşul&&}` AYNI davranışı (koşul false iken elementin DOM\'da hiç olmaması) farklı sözdizimiyle üretir. Bir tester bu paralelliği bildiğinde, framework değişse bile aynı teşhis refleksini (önce koşulu tetikleyen eylemi yap) uygular.',
          en: '`*ngIf` and `{condition&&}` produce the SAME behavior (the element being entirely absent from the DOM while the condition is false) with different syntax. A tester who knows this parallel applies the same diagnostic reflex (first perform the action that triggers the condition) regardless of the framework.',
        },
        retryQuestion: {
          question: {
            tr: '`*ngFor`\'da kullanılan `trackBy` fonksiyonu, React\'teki `key` prop\'una kıyasla ne işe yarar?',
            en: 'What does the `trackBy` function used in `*ngFor` do, compared to React\'s `key` prop?',
          },
          options: [
            { id: 'a', text: { tr: 'Bir DOM attribute\'u olarak görünür ve locate edilebilir', en: 'It appears as a DOM attribute and can be located' } },
            { id: 'b', text: { tr: 'React\'in `key`\'i gibi Angular\'ın liste elemanlarını İÇ OLARAK takip etmesini sağlar; DOM\'da GÖRÜNMEZ ve locator olarak kullanılamaz', en: 'Like React\'s `key`, it lets Angular INTERNALLY track list items; it is NOT VISIBLE in the DOM and cannot be used as a locator' } },
            { id: 'c', text: { tr: 'Sadece performans için vardır, hiçbir işlevi yoktur', en: 'It exists only for performance, it has no function' } },
            { id: 'd', text: { tr: 'CSS class\'ı olarak DOM\'a eklenir', en: 'It is added to the DOM as a CSS class' } },
          ],
          correct: 'b',
          explanation: {
            tr: '`trackBy` ve React\'in `key`\'i AYNI amaca hizmet eder: framework\'ün hangi liste öğesinin hangi DOM node\'una karşılık geldiğini İÇ OLARAK takip etmesi. İkisi de DOM\'da bir attribute olarak yazılmaz, bu yüzden ikisi de bir locator DEĞİLDİR.',
            en: '`trackBy` and React\'s `key` serve the SAME purpose: letting the framework INTERNALLY track which list item corresponds to which DOM node. Neither is written as a DOM attribute, so neither is a locator.',
          },
        },
      },

      // ── G4: _ngcontent-xxx / _nghost-xxx ──
      {
        type: 'heading',
        text: { tr: '🎭 G4. `_ngcontent-xxx` / `_nghost-xxx`: Nereden Gelir, Neden Locate Edilmez', en: '🎭 G4. `_ngcontent-xxx` / `_nghost-xxx`: Where They Come From, Why They Are Not Located' },
      },
      {
        type: 'simple-box',
        emoji: '🎭',
        content: {
          tr: '`_ngcontent-xxx`, Angular\'ın CSS Modules hash\'inin (GRUP C3) KENDİ mekanizmasıdır: Angular varsayılan olarak "ViewEncapsulation" ile stillerin component\'ler arasında SIZMASINI önler — bunu yapmak için her component\'in ürettiği HER elemente OTOMATİK bir `_ngcontent-abc-5` gibi attribute ekler. Peki neden bu, C3\'teki hash dersiyle NEREDEYSE aynı? Çünkü bu attribute de derleme/component INSTANCE\'ına göre değişir ve developer bunu KAYNAK KODDA YAZMAZ — hiç görmediği bir kod tarafından OTOMATİK eklenir. Java analojisi: derleyicinin ürettiği anonim iç sınıf isimleri (`Outer$1`) gibi — kaynakta yazılmaz, derleyici otomatik üretir ve güvenilir bir referans DEĞİLDİR. QA bağlamında: `_ngcontent`/`_nghost` gören bir tester bunu ASLA locate etmez; bunun yerine developer\'dan `[attr.data-testid]` binding\'i ister (G5\'te bunu yazacaksın).',
          en: '`_ngcontent-xxx` is Angular\'s OWN mechanism paralleling the CSS Modules hash (GROUP C3): by default Angular prevents styles from LEAKING between components with "ViewEncapsulation" — to do this it AUTOMATICALLY adds an attribute like `_ngcontent-abc-5` to EVERY element a component produces. Why is this ALMOST the same lesson as C3\'s hash? Because this attribute also changes based on the compile/component INSTANCE, and the developer does NOT WRITE it in the source — it is added AUTOMATICALLY by code they never see. Java analogy: like the anonymous inner class names the compiler generates (`Outer$1`) — not written in the source, generated automatically by the compiler, and NOT a reliable reference. In QA context: a tester who sees `_ngcontent`/`_nghost` NEVER locates by it; instead they ask the developer for an `[attr.data-testid]` binding (you will write this in G5).',
        },
      },
      ngContentHashCode,
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '1️⃣',
            label: { tr: 'Kaynak (ne yazıldı)', en: 'Source (what was written)' },
            desc: {
              tr: '`<span class="badge">{{ status }}</span>` — developer sadece bir class ve interpolation yazdı, `_ngcontent` HİÇ görünmüyor.',
              en: '`<span class="badge">{{ status }}</span>` — the developer wrote only a class and an interpolation, `_ngcontent` is NOT visible at all.',
            },
          },
          {
            icon: '2️⃣',
            label: { tr: 'Gerçek DOM (ne oluştu)', en: 'Real DOM (what was produced)' },
            desc: {
              tr: '`<span _ngcontent-abc-5 class="badge">OPEN</span>` — Angular ViewEncapsulation için OTOMATİK bir attribute ekledi; bu değer component derlemesine göre değişir.',
              en: '`<span _ngcontent-abc-5 class="badge">OPEN</span>` — Angular added an AUTOMATIC attribute for ViewEncapsulation; this value changes based on the component compile.',
            },
          },
          {
            icon: '3️⃣',
            label: { tr: 'Tester\'ın kararı', en: 'The tester\'s decision' },
            desc: {
              tr: '❌ `[_ngcontent-abc-5]`\'e locate ETME (compile\'a göre değişir). ✅ `[attr.data-testid]` binding\'i iste. 💬 Developer\'dan: `[attr.data-testid]="\'status-badge\'"`.',
              en: '❌ Do NOT locate by `[_ngcontent-abc-5]` (it changes per compile). ✅ Ask for an `[attr.data-testid]` binding. 💬 Ask the developer for: `[attr.data-testid]="\'status-badge\'"`.',
            },
          },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester DevTools\'ta bir Angular elementinde `_ngcontent-xz9-12` attribute\'unu görüyor ve `page.locator(\'[_ngcontent-xz9-12]\')` yazmayı düşünüyor. Bu neden kötü bir fikir?',
          en: 'A tester sees a `_ngcontent-xz9-12` attribute on an Angular element in DevTools and considers writing `page.locator(\'[_ngcontent-xz9-12]\')`. Why is this a bad idea?',
        },
        options: [
          { id: 'a', text: { tr: 'İyi bir fikir, bu attribute her zaman sabittir', en: 'It is a good idea, this attribute is always fixed' } },
          { id: 'b', text: { tr: 'Bu attribute Angular tarafından OTOMATİK üretilir ve component compile/instance\'ına göre değişebilir — CSS Modules hash\'iyle aynı kırılganlığı taşır', en: 'This attribute is generated AUTOMATICALLY by Angular and can change based on the component compile/instance — it carries the same fragility as a CSS Modules hash' } },
          { id: 'c', text: { tr: 'Angular attribute\'ları CSS selector\'larla eşleşmez', en: 'Angular attributes do not match with CSS selectors' } },
          { id: 'd', text: { tr: 'Bu attribute sadece Chrome\'da vardır', en: 'This attribute only exists in Chrome' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`_ngcontent-xxx`, developer\'ın yazmadığı, Angular\'ın ViewEncapsulation için otomatik ürettiği bir attribute\'tur — tıpkı bir CSS Modules hash\'i gibi build/derleme detaylarına bağlıdır ve kalıcı bir kimlik DEĞİLDİR.',
          en: '`_ngcontent-xxx` is an attribute the developer did not write, automatically generated by Angular for ViewEncapsulation — just like a CSS Modules hash, it depends on build/compile details and is NOT a permanent identity.',
        },
        retryQuestion: {
          question: {
            tr: '`_ngcontent-xxx` ile CSS Modules hash\'i (`__x7f2a`, GRUP C3) arasındaki EN BÜYÜK benzerlik nedir?',
            en: 'What is the BIGGEST similarity between `_ngcontent-xxx` and a CSS Modules hash (`__x7f2a`, GROUP C3)?',
          },
          options: [
            { id: 'a', text: { tr: 'İkisi de developer tarafından elle yazılır', en: 'Both are written by hand by the developer' } },
            { id: 'b', text: { tr: 'İkisi de build/derleme aracı tarafından OTOMATİK üretilir ve stil izolasyonu için var olur, kimlik taşımaz', en: 'Both are generated AUTOMATICALLY by a build/compile tool and exist for style isolation, they do not carry identity' } },
            { id: 'c', text: { tr: 'İkisi de sadece production\'da görünür', en: 'Both are only visible in production' } },
            { id: 'd', text: { tr: 'Hiçbir benzerlikleri yok', en: 'They have no similarities at all' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'İkisi de aynı KÖK amaca hizmet eder: stillerin component\'ler/dosyalar arasında sızmasını önlemek. Bu yüzden ikisi de otomatik üretilir, developer\'ın kontrolü DIŞINDADIR ve kimlik olarak GÜVENİLMEZ.',
            en: 'Both serve the same ROOT purpose: preventing styles from leaking between components/files. This is why both are auto-generated, OUTSIDE the developer\'s control, and UNRELIABLE as identity.',
          },
        },
      },

      // ── G5: Angular'da data-testid ve [attr.data-testid] Binding ──
      {
        type: 'heading',
        text: { tr: '🏷️ G5. Angular\'da `data-testid` ve `[attr.data-testid]` Binding', en: '🏷️ G5. `data-testid` and `[attr.data-testid]` Binding in Angular' },
      },
      {
        type: 'simple-box',
        emoji: '🏷️',
        content: {
          tr: 'Angular\'da SABİT bir `data-testid` eklemek basittir (`data-testid="submit-bug"` HTML\'deki gibi yazılır), ama DİNAMİK bir değer (`bug.id`\'ye göre değişen) gerektiğinde düz interpolation (`{{ }}`) BEKLENMEDİK sonuçlar verebilir çünkü interpolation asıl olarak TEXT içeriği içindir, attribute değeri için değil. Peki bu neden bir tester\'ı ilgilendirir? Çünkü "developer\'dan data-testid iste" demek yeterli değildir — Angular\'da doğru sözdizimini (`[attr.data-testid]="ifade"`) BİLMEK, isteğini somut bir kod satırıyla desteklemeni sağlar. Java analojisi: bir attribute\'a string birleştirme ile değer atamak yerine, tip-güvenli bir binding API\'si kullanmak gibi — Angular `[attr.*]` bunun için VAR. QA bağlamında: aşağıdaki pratikte tam olarak bu binding\'i kendin yazacaksın.',
          en: 'Adding a FIXED `data-testid` in Angular is simple (`data-testid="submit-bug"` is written just like in HTML), but when a DYNAMIC value is needed (one that varies by `bug.id`), plain interpolation (`{{ }}`) can produce UNEXPECTED results because interpolation is primarily for TEXT content, not for attribute values. Why does this concern a tester? Because saying "ask the developer for a data-testid" is not enough — KNOWING the correct Angular syntax (`[attr.data-testid]="expression"`) lets you back up your request with a concrete line of code. Java analogy: like using a type-safe binding API instead of assigning a value to an attribute via string concatenation — Angular\'s `[attr.*]` EXISTS for this. In QA context: in the practice below you will write exactly this binding yourself.',
        },
      },
      angularDataTestIdBindingPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Bir developer "her BugCard\'a `data-testid` eklemek için `{{ }}` interpolation kullanacağım, `data-testid="{{ \'bug-card-\' + bug.id }}"` yazdım" diyor. Bu yaklaşımdaki potansiyel sorun nedir?',
          en: 'A developer says "I will use `{{ }}` interpolation to add data-testid to each BugCard, I wrote `data-testid="{{ \'bug-card-\' + bug.id }}"`". What is the potential problem with this approach?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiçbir sorun yok, bu her zaman doğru çalışır', en: 'No problem, this always works correctly' } },
          { id: 'b', text: { tr: 'Interpolation attribute değerleri için tasarlanmamıştır; dinamik attribute binding\'i için `[attr.data-testid]="...”` kullanmak daha doğru ve önerilen yoldur', en: 'Interpolation is not designed for attribute values; using `[attr.data-testid]="..."` for dynamic attribute binding is the more correct and recommended way' } },
          { id: 'c', text: { tr: 'data-testid Angular\'da hiç kullanılamaz', en: 'data-testid cannot be used at all in Angular' } },
          { id: 'd', text: { tr: 'Sadece `*ngFor` içinde bu sorun oluşur', en: 'This problem only occurs inside `*ngFor`' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Interpolation (`{{ }}`) temel olarak metin İÇERİĞİ içindir; attribute\'lara dinamik değer bağlamanın Angular\'ın önerdiği, daha güvenilir yolu `[attr.*]` binding\'idir. Bu, "işe yarayabilir ama doğru araç bu değil" türünden bir uyarıdır.',
          en: 'Interpolation (`{{ }}`) is fundamentally for text CONTENT; the way Angular recommends binding a dynamic value to attributes reliably is `[attr.*]` binding. This is a "it might work, but this is not the right tool" kind of warning.',
        },
        retryQuestion: {
          question: {
            tr: 'React\'te `data-testid={`bug-card-${bug.id}`}` yazmak ile Angular\'da `[attr.data-testid]="\'bug-card-\' + bug.id"` yazmak arasındaki İLİŞKİ nedir?',
            en: 'What is the RELATIONSHIP between writing `data-testid={`bug-card-${bug.id}`}` in React and `[attr.data-testid]="\'bug-card-\' + bug.id"` in Angular?',
          },
          options: [
            { id: 'a', text: { tr: 'Hiçbir ilişkileri yok', en: 'They have no relationship' } },
            { id: 'b', text: { tr: 'İkisi de AYNI amacı (dinamik bir değere göre benzersiz bir data-testid üretmek) farklı sözdizimiyle karşılar', en: 'Both fulfill the SAME purpose (producing a unique data-testid based on a dynamic value) with different syntax' } },
            { id: 'c', text: { tr: 'React\'teki syntax Angular\'da da BİREBİR aynı şekilde çalışır', en: 'The React syntax works IDENTICALLY in Angular too' } },
            { id: 'd', text: { tr: 'Angular\'da bu işlem imkansızdır', en: 'This operation is impossible in Angular' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bu, sayfa boyunca gördüğün bir kalıptır: farklı framework\'ler AYNI kavramı (dinamik attribute binding) FARKLI sözdizimiyle ifade eder. Kavramı bir kez anlayan tester, hangi framework\'te olursa olsun aynı isteği (dinamik, stabil bir kimlik) doğru sözdizimiyle formüle edebilir.',
            en: 'This is a pattern you have seen throughout the page: different frameworks express the SAME concept (dynamic attribute binding) with DIFFERENT syntax. A tester who understands the concept once can formulate the same request (a dynamic, stable identity) with the correct syntax in whatever framework they are in.',
          },
        },
      },

      // ── G6: Angular'da Sağlam Locator Stratejisi ──
      {
        type: 'heading',
        text: { tr: '🎯 G6. Angular\'da Sağlam Locator Stratejisi', en: '🎯 G6. A Robust Locator Strategy in Angular' },
      },
      {
        type: 'simple-box',
        emoji: '🎯',
        content: {
          tr: 'Bu grubun tüm derslerini birleştirdiğinde ortaya çıkan strateji, React\'teki F7 ile AYNIDIR ama Angular sözdizimiyle: `_ngcontent`/hash\'e ASLA güvenme, `*ngIf` ile koşullu render edilen elementleri locate etmeden önce koşulu TETİKLE, `*ngFor`\'daki `trackBy`\'a değil ilişkisel bir attribute\'a (data-bug-id gibi) güven, dinamik `data-testid` için `[attr.*]` binding\'i iste. Peki neden framework FARK ETMEKSİZİN aynı strateji işe yarar? Çünkü locator dayanıklılığı, HTML\'in kendisine (Bölüm B, H) dair bir gerçektir — hangi framework\'ün bu HTML\'i ÜRETTİĞİ ikincil bir detaydır. Java analojisi: bir tasarım ilkesinin (SOLID gibi) diller arasında (Java, Kotlin, C#) DEĞİŞMEMESİ gibi — uygulama detayı değişir, ilke SABİT kalır. QA bağlamında: React\'i (GRUP F) ve Angular\'ı (GRUP G) öğrendikten sonra, hangi framework\'le karşılaşırsan karşılaş, aynı 3 soruyu sorabilirsin: "bu element her zaman mı var, yoksa koşullu mu?", "bu attribute kalıcı mı yoksa build\'e bağlı mı?", "developer\'dan hangi somut satırı istemeliyim?"',
          en: 'The strategy that emerges when you combine all this group\'s lessons is the SAME as React\'s F7, just with Angular syntax: NEVER trust `_ngcontent`/a hash, TRIGGER the condition before locating an element conditionally rendered with `*ngIf`, trust a relational attribute (like data-bug-id) rather than `*ngFor`\'s `trackBy`, and ask for `[attr.*]` binding for a dynamic `data-testid`. Why does the same strategy work REGARDLESS of the framework? Because locator durability is a truth about HTML itself (Sections B, H) — WHICH framework PRODUCED this HTML is a secondary detail. Java analogy: like a design principle (like SOLID) NOT CHANGING across languages (Java, Kotlin, C#) — the implementation detail changes, the principle stays FIXED. In QA context: after learning React (GROUP F) and Angular (GROUP G), whatever framework you encounter, you can ask the same 3 questions: "does this element always exist, or is it conditional?", "is this attribute permanent or build-dependent?", "which concrete line should I ask the developer for?"',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'Bir yeni framework (ör. Vue veya Svelte) ile ilk kez karşılaşan bir tester, locator stratejisini nasıl kurmalıdır?',
          en: 'A tester encountering a new framework (e.g. Vue or Svelte) for the first time — how should they build their locator strategy?',
        },
        options: [
          { id: 'a', text: { tr: 'O framework\'ün syntax\'ını sıfırdan, önceki bilgiden bağımsız öğrenmeli', en: 'They should learn that framework\'s syntax from scratch, independent of prior knowledge' } },
          { id: 'b', text: { tr: 'Aynı 3 soruyu sormalı: "bu element koşullu mu?", "bu attribute build\'e mi bağlı?", "developer\'dan ne isteyeceğim?" — framework değişse de KAVRAMLAR aynıdır', en: 'They should ask the same 3 questions: "is this element conditional?", "is this attribute build-dependent?", "what will I ask the developer for?" — the CONCEPTS stay the same regardless of framework' } },
          { id: 'c', text: { tr: 'Locator stratejisi her framework için TAMAMEN farklıdır, ortak bir yaklaşım yoktur', en: 'The locator strategy is COMPLETELY different for every framework, there is no common approach' } },
          { id: 'd', text: { tr: 'Sadece XPath kullanmalı, framework önemsizdir', en: 'They should just use XPath, the framework does not matter' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'React ve Angular\'da gördüğün gibi, framework\'ler FARKLI sözdizimi kullanır ama AYNI temel kavramları (conditional render, list render, build-bağımlı hash/attribute) taşır. Bu 3 soruyu sormayı öğrenen bir tester, hiç görmediği bir framework\'te bile hızla doğru locator stratejisini kurar.',
          en: 'As you saw in React and Angular, frameworks use DIFFERENT syntax but carry the SAME underlying concepts (conditional render, list render, build-dependent hash/attribute). A tester who learns to ask these 3 questions quickly builds the right locator strategy even in a framework they have never seen.',
        },
        retryQuestion: {
          question: {
            tr: 'GRUP F (React) ve GRUP G (Angular) boyunca öğrendiğin en önemli TEK ders neydi?',
            en: 'What was the single most important lesson you learned across GROUP F (React) and GROUP G (Angular)?',
          },
          options: [
            { id: 'a', text: { tr: 'React Angular\'dan her zaman daha iyidir', en: 'React is always better than Angular' } },
            { id: 'b', text: { tr: 'Kaynağı okuyup üretilecek DOM\'u tahmin etmek ve framework\'ün otomatik/geçici ürettiği alanlara (hash, key/trackBy, _ngcontent) değil, kasıtlı ve stabil bir kimliğe (data-testid, role) güvenmek', en: 'Reading the source to predict the produced DOM, and trusting a deliberate, stable identity (data-testid, role) rather than fields the framework produces automatically/temporarily (hash, key/trackBy, _ngcontent)' } },
            { id: 'c', text: { tr: 'Angular her zaman daha test edilebilirdir', en: 'Angular is always more testable' } },
            { id: 'd', text: { tr: 'Framework\'ler arasında hiçbir ortak nokta yoktur', en: 'There is no common ground between frameworks' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bu, sayfanın imza dersidir: hangi framework olursa olsun, "kaynağı oku → DOM\'u tahmin et → kasıtlı/stabil bir kimliğe güven, otomatik üretilene güvenme" stratejisi DEĞİŞMEZ. React\'in hash\'i, Angular\'ın `_ngcontent`\'i — ikisi de aynı dersin farklı görünümleridir.',
            en: 'This is the page\'s signature lesson: regardless of the framework, the strategy "read the source -> predict the DOM -> trust a deliberate/stable identity, do not trust the auto-generated one" does NOT change. React\'s hash, Angular\'s `_ngcontent` — both are different faces of the same lesson.',
          },
        },
      },
      {
        type: 'feynman-checkpoint',
        id: 'qaf-feynman-g',
        promptTr: '`*ngIf`\'in React\'in `{koşul && <X/>}`\'i ile neden aynı davranışı gösterdiğini ve `_ngcontent-xxx` attribute\'unun CSS Modules hash\'iyle olan paralelliğini, sektöre yeni giren birine kendi cümlelerinle anlat.',
        promptEn: 'Explain, in your own words, why `*ngIf` shows the same behavior as React\'s `{condition && <X/>}`, and the parallel between the `_ngcontent-xxx` attribute and a CSS Modules hash, to a newcomer.',
        keywords: ['ngif', 'react', 'conditional', 'ngcontent', 'hash', 'viewencapsulation', 'dom', 'locator'],
        modelAnswerTr: '`*ngIf`, koşul false iken elementi DOM ağacına hiç eklemez veya tamamen çıkarır — tıpkı React\'in `{koşul && <X/>}`\'i gibi, ikisi de CSS gizlemesi değil GERÇEK bir yokluk üretir. `_ngcontent-xxx` ise Angular\'ın ViewEncapsulation (stil izolasyonu) için otomatik ürettiği bir attribute\'tur; CSS Modules hash\'i gibi developer tarafından yazılmaz, build/component instance\'ına göre değişir ve bu yüzden locator olarak güvenilmez. İkisi de "framework değişse bile locator kavramları aynı kalır" dersinin somut örnekleridir.',
        modelAnswerEn: '`*ngIf` never adds the element to the DOM tree (or removes it entirely) while the condition is false — just like React\'s `{condition && <X/>}`, both produce a REAL absence, not CSS hiding. `_ngcontent-xxx` is an attribute Angular auto-generates for ViewEncapsulation (style isolation); like a CSS Modules hash, it is not written by the developer, changes based on the build/component instance, and is therefore unreliable as a locator. Both are concrete examples of the lesson "locator concepts stay the same even when the framework changes".',
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
          tr: 'Bu grup sayfanın KALBİDİR: A-G gruplarında öğrendiğin her şey (DOM, HTML, CSS, JS, frontend↔backend, React, Angular) burada TEK bir beceride birleşir — herhangi bir elemente bakıp en dayanıklı locator\'ı seçebilmek. Bu grubun 8 başlığı boyunca dayanıklılık hiyerarşisini, antipattern\'leri, aynı elemente 5 locator düşünmeyi, koşullu/dinamik elementleri, liste satırlarını, shadow DOM/iframe\'i, developer\'dan ne isteneceğini ve locator code review\'unu öğreneceksin.',
          en: 'This group is the HEART of the page: everything you learned in groups A-G (DOM, HTML, CSS, JS, frontend<->backend, React, Angular) converges here into ONE skill — being able to look at any element and pick the most durable locator. Across this group\'s 8 topics you will learn the durability hierarchy, antipatterns, thinking of 5 locators for the same element, conditional/dynamic elements, list rows, shadow DOM/iframes, what to ask the developer for, and locator code review.',
        },
      },

      // ── H1: Locator Dayanıklılık Hiyerarşisi ──
      {
        type: 'heading',
        text: { tr: '🏆 H1. Locator Dayanıklılık Hiyerarşisi', en: '🏆 H1. The Locator Durability Hierarchy' },
      },
      {
        type: 'simple-box',
        emoji: '🏆',
        content: {
          tr: 'Locator seçmek, bir kişiyi tarif etmek gibidir: onu "soldan üçüncü sıradaki, kırmızı tişörtlü kişi" diye tarif edersen (index + görünüm), sıra değişince veya kişi üstünü değiştirince tarifin çöker; ama "T.C. kimlik numarası şu olan kişi" dersen (data-testid), o kişi nereye otursa ne giyse bulunur. Locator dayanıklılık hiyerarşisi tam da budur: `data-testid` > `role`+`name` > stabil `id` > text > CSS > XPath-index (son çare). Neden hiyerarşi? Çünkü her katman bir sonrakinden daha az "tesadüfe" bağlıdır — data-testid kasıtlı bir kimliktir, XPath-index ise DOM\'un o anki şekline dair kırılgan bir varsayım. Java analojisi: nesneyi kimliğe (id) göre mi yoksa geçici bir alana (renk/sıra) göre mi eşitliyorsun sorusudur. QA bağlamında: bu hiyerarşiyi içselleştiren tester her elemente 5 farklı locator düşünüp en dayanıklısını gerekçelendirebilir. Aşağıda **Locator Laboratuvarı** var: bir DOM parçasında attribute\'lara tıkla, hangi locator neden daha sağlam gör.',
          en: 'Choosing a locator is like describing a person: if you describe them as "the person third from the left, in a red shirt" (index + appearance), your description collapses when the order changes or the person changes clothes; but if you say "the person whose national ID number is X" (data-testid), that person is found wherever they sit and whatever they wear. The locator durability hierarchy is exactly this: `data-testid` > `role`+`name` > stable `id` > text > CSS > XPath-index (last resort). Why a hierarchy? Because each layer depends less on "coincidence" than the next — data-testid is a deliberate identity, while XPath-index is a fragile assumption about the DOM\'s current shape. Java analogy: it is the question of whether you equate an object by its identity (id) or by a transient field (color/order). In QA context: a tester who internalizes this hierarchy can think of 5 different locators for any element and justify the most durable one. Below is the **Locator Lab**: click the attributes on a DOM fragment and see which locator is more robust and why.',
        },
      },
      bugCardLocatorExplorer,
      {
        type: 'quiz',
        question: {
          tr: 'Locator Laboratuvarı\'ndaki BugCard DOM\'una göre, en dayanıklıdan en kırılgana doğru hangi sıralama doğrudur?',
          en: 'According to the Locator Lab\'s BugCard DOM, which ordering from most durable to most fragile is correct?',
        },
        options: [
          { id: 'a', text: { tr: 'class > id > data-testid > text', en: 'class > id > data-testid > text' } },
          { id: 'b', text: { tr: 'data-testid > role/id > text > class', en: 'data-testid > role/id > text > class' } },
          { id: 'c', text: { tr: 'text > class > data-testid > id', en: 'text > class > data-testid > id' } },
          { id: 'd', text: { tr: 'Hepsi eşit derecede güvenilir', en: 'All are equally reliable' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'data-testid en üsttedir (sadece test için, hiçbir şeyden etkilenmez), role/id ikinci sıradadır, text i18n\'de kırılabilir, class (özellikle hash\'li) en kırılgandır çünkü stil amaçlı var olur.',
          en: 'data-testid is at the top (exists solely for tests, unaffected by anything), role/id is second, text can break under i18n, class (especially hashed) is most fragile because it exists for styling.',
        },
        retryQuestion: {
          question: {
            tr: 'Neden "en dayanıklı" ile "en kısa yazılan" locator genelde AYNI şey değildir?',
            en: 'Why is "most durable" and "shortest to write" generally NOT the same locator?',
          },
          options: [
            { id: 'a', text: { tr: 'Her zaman aynıdırlar', en: 'They are always the same' } },
            { id: 'b', text: { tr: 'Kısa yazım (ör. `.btn`) genelde stil amaçlı, paylaşımlı bir alana bağlanır; dayanıklılık ise KASITLI bir kimliğe bağlanmaktan gelir', en: 'A short spelling (e.g. `.btn`) usually binds to a shared, styling-purpose field; durability comes from binding to a DELIBERATE identity' } },
            { id: 'c', text: { tr: 'Kısa locator\'lar her zaman daha yavaştır', en: 'Short locators are always slower' } },
            { id: 'd', text: { tr: 'Uzun locator\'lar her zaman daha güvenlidir', en: 'Long locators are always safer' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Yazım kısalığı ile dayanıklılık BAĞIMSIZ kavramlardır. `.btn` kısadır ama paylaşımlı bir stil sınıfıdır; `[data-testid="save-bug"]` biraz daha uzundur ama KASITLI bir kimliktir — dayanıklılık kararı yazım uzunluğuna değil, alanın AMACINA bakarak verilir.',
            en: 'Brevity and durability are INDEPENDENT concepts. `.btn` is short but a shared styling class; `[data-testid="save-bug"]` is a bit longer but a DELIBERATE identity — the durability decision is made by looking at the field\'s PURPOSE, not its spelling length.',
          },
        },
      },

      // ── H2: Kırılgan Locator Antipattern'leri ──
      {
        type: 'heading',
        text: { tr: '🚫 H2. Kırılgan Locator Antipattern\'leri', en: '🚫 H2. Fragile Locator Antipatterns' },
      },
      {
        type: 'simple-box',
        emoji: '🚫',
        content: {
          tr: 'Bir antipattern, "işe yarıyor görünen ama ALTINDA yatan varsayım yanlış olan" bir kalıptır — sanki bir binayı SAĞLAM temele değil, KUMA kurmak gibi: bina bugün ayakta durur, ilk depremde (deploy\'da) çöker. Absolute XPath (`/html/body/div[2]/...`) DOM\'un TAM o anki şekline, `nth-child`/index sıralamaya, hash class build\'e, auto-generated id sayfa yüklemesine bel bağlar — HİÇBİRİ kasıtlı bir kimlik DEĞİLDİR. Peki bu antipattern\'ler neden bu kadar YAYGIN? Çünkü hepsi DevTools\'ta "Copy selector" gibi kısayollarla KOLAYCA üretilir — kolay olan ile dayanıklı olan SIK sık farklı şeylerdir. Java analojisi: bir nesneyi bellek adresine (referansa) göre eşitlemek gibi — çalışır ama GC\'den sonra o adres BAŞKA bir nesneye ait olabilir. QA bağlamında: aşağıdaki tablo her antipattern\'i NEDEN kırıldığı ve YERİNE ne kullanılacağıyla eşleştirir.',
          en: 'An antipattern is a pattern that "looks like it works but has a WRONG assumption underneath" — like building a structure on SAND instead of SOLID ground: the building stands today, but collapses on the first earthquake (a deploy). Absolute XPath (`/html/body/div[2]/...`) depends on the DOM\'s EXACT current shape, `nth-child`/index on ordering, a hash class on the build, an auto-generated id on the page load — NONE of these is a deliberate identity. Why are these antipatterns so COMMON? Because they are all EASILY produced by shortcuts like "Copy selector" in DevTools — easy and durable are OFTEN different things. Java analogy: like equating a nesne by its memory address (reference) — it works, but after GC that address might belong to a DIFFERENT object. In QA context: the table below pairs each antipattern with WHY it breaks and WHAT to use INSTEAD.',
        },
      },
      locatorAntipatternTable,
      {
        type: 'quiz',
        question: {
          tr: '`nth-child`/index tabanlı bir locator kırıldığında hangi davranış daha SIK görülür ve neden bu daha TEHLİKELİDİR?',
          en: 'When an `nth-child`/index-based locator breaks, which behavior is more COMMON, and why is this MORE DANGEROUS?',
        },
        options: [
          { id: 'a', text: { tr: 'Her zaman açık bir hata (NoSuchElement) verir', en: 'It always gives an obvious error (NoSuchElement)' } },
          { id: 'b', text: { tr: 'SESSİZCE yanlış elemente işaret eder — test hata vermez ama YANLIŞ satırı etkiler', en: 'It SILENTLY points to the wrong element — the test does not error but affects the WRONG row' } },
          { id: 'c', text: { tr: 'Tarayıcı otomatik olarak doğru elemente düzeltir', en: 'The browser automatically corrects to the right element' } },
          { id: 'd', text: { tr: 'Her zaman test suite\'ini çökertir', en: 'It always crashes the entire test suite' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Hash class gibi diğer antipattern\'ler genelde AÇIK bir hata (0 eleman) verir. Ama index kırıldığında eleman YİNE bulunur — sadece YANLIŞ olanı. Bu, "test yeşil ama yanlış şeyi test etti" durumunun en sinsi kaynağıdır.',
          en: 'Other antipatterns like a hash class usually give an OBVIOUS error (0 elements). But when the index breaks, an element IS STILL found — just the WRONG one. This is the sneakiest source of "the test is green but tested the wrong thing".',
        },
        retryQuestion: {
          question: {
            tr: 'Bir developer "auto-generated id\'ler (`id=\'r4nd0m-9f3\'`) her zaman benzersizdir, bu yüzden güvenle locate edilebilir" diyor. Bu görüşteki eksik nedir?',
            en: 'A developer says "auto-generated ids (`id=\'r4nd0m-9f3\'`) are always unique, so they can be safely located". What is missing from this view?',
          },
          options: [
            { id: 'a', text: { tr: 'Doğru, benzersizlik yeterlidir', en: 'Correct, uniqueness is enough' } },
            { id: 'b', text: { tr: 'Benzersizlik ile KALICILIK farklı şeylerdir — bir id benzersiz olsa da sayfa her yüklendiğinde FARKLI bir değer üretiyorsa, dünkü test bugün o id\'yi bulamaz', en: 'Uniqueness and PERMANENCE are different things — even if an id is unique, if the page produces a DIFFERENT value on every load, yesterday\'s test cannot find that id today' } },
            { id: 'c', text: { tr: 'Auto-generated id\'ler CSS\'te kullanılamaz', en: 'Auto-generated ids cannot be used in CSS' } },
            { id: 'd', text: { tr: 'Bu id\'ler sadece test ortamında üretilir', en: 'These ids are only generated in the test environment' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Benzersizlik SADECE "o anda aynı sayfada iki eleman aynı id\'yi taşımaz" garantisi verir — "bu id yarın da aynı olacak" garantisi VERMEZ. Bir test, önceden kaydedilmiş bir id\'ye bağlanırsa, id her yüklemede değişiyorsa test kırılır.',
            en: 'Uniqueness ONLY guarantees "no two elements on the same page share this id right now" — it does NOT guarantee "this id will be the same tomorrow". If a test binds to a previously recorded id and the id changes on every load, the test breaks.',
          },
        },
      },

      // ── H3: Aynı Elemente 5 Farklı Locator ──
      {
        type: 'heading',
        text: { tr: '🏁 H3. Aynı Elemente 5 Farklı Locator: Hangisi Neden Daha Sağlam', en: '🏁 H3. 5 Different Locators for the Same Element: Which Is More Robust, and Why' },
      },
      {
        type: 'simple-box',
        emoji: '🏁',
        content: {
          tr: 'Herhangi bir elemente 5 FARKLI locator düşünebilmek — ve HANGİSİNİN neden daha dayanıklı olduğunu gerekçelendirebilmek — bu sayfanın en önemli TEK becerisidir. Bu, bir dedektifin aynı kişiyi TANIMLAMANIN 5 farklı yolunu (kimlik no, parmak izi, yüz, kıyafet, konum) düşünüp hangisinin MAHKEMEDE (deploy sonrası) geçerli kalacağını bilmesi gibidir. Peki neden "tek bir locator yaz" yerine "5 tanesini DÜŞÜN"? Çünkü ilk aklına gelen locator genelde EN KOLAY olandır (DevTools\'ta ilk görünen), en DAYANIKLI olan değil — 5 seçeneği yan yana koymak seni en iyisini SEÇMEYE zorlar. Java analojisi: bir tasarım kararı verirken (ör. hangi veri yapısını kullanacağını) birden fazla seçeneği karşılaştırıp trade-off\'ları TARTMAK gibi. QA bağlamında: aşağıdaki film, tam olarak bu 5 locator\'ı AYNI butona uygulayıp bir deploy sonrası HANGİSİNİN hayatta kaldığını gösterir — sayfanın en kritik filmidir.',
          en: 'Being able to think of 5 DIFFERENT locators for any element — and being able to justify WHICH one is more durable and why — is this page\'s single most important skill. It is like a detective thinking of 5 different ways to IDENTIFY the same person (ID number, fingerprint, face, clothing, location) and knowing which one will HOLD UP IN COURT (after a deploy). Why "THINK of 5" instead of "just write one locator"? Because the first locator that comes to mind is usually the EASIEST one (the first thing visible in DevTools), not the most DURABLE one — laying 5 options side by side forces you to CHOOSE the best one. Java analogy: like weighing multiple options and their trade-offs when making a design decision (e.g. which data structure to use). In QA context: the film below applies exactly these 5 locators to the SAME button and shows WHICH ONE survives after a deploy — the most critical film on this page.',
        },
      },
      fiveLocatorRaceFilm,
      deployBreaksLocatorPlayground,
      {
        type: 'quiz',
        question: {
          tr: '5 Locator Yarışı filminde deploy sonrası XPath index neden hash class\'tan bile DAHA TEHLİKELİ bir şekilde kırıldı?',
          en: 'In the 5-Locator Race film, why did the XPath index break in an EVEN MORE DANGEROUS way than the hash class after the deploy?',
        },
        options: [
          { id: 'a', text: { tr: 'İkisi de aynı şekilde kırıldı, fark yok', en: 'Both broke the same way, no difference' } },
          { id: 'b', text: { tr: 'Hash class AÇIK bir hata (0 eleman) verdi; XPath index ise SESSİZCE yanlış bir bug\'ın butonuna işaret etti', en: 'The hash class gave an OBVIOUS error (0 elements); the XPath index SILENTLY pointed to the wrong bug\'s button' } },
          { id: 'c', text: { tr: 'XPath her zaman hash\'ten daha hızlıdır', en: 'XPath is always faster than a hash' } },
          { id: 'd', text: { tr: 'İkisi de hiç kırılmadı', en: 'Neither broke at all' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Açık bir hata (NoSuchElement) fark edilmesi ve düzeltilmesi kolaydır. Ama XPath index YANLIŞ bir elemente sessizce ulaştığı için, test "yeşil" görünür ama YANLIŞ bug\'ı işler — bu çok daha tehlikeli bir SESSİZ hatadır.',
          en: 'An obvious error (NoSuchElement) is easy to notice and fix. But because the XPath index silently reaches the WRONG element, the test looks "green" but processes the WRONG bug — a much more dangerous SILENT failure.',
        },
        retryQuestion: {
          question: {
            tr: 'Filmde getByText("Düzenle") deploy\'dan sonra hayatta kaldı ama anlatıcı bunun "SADECE ŞANSLA" olduğunu vurguladı. Bu ne anlama gelir?',
            en: 'In the film, getByText("Edit") survived the deploy, but the narrator emphasized this was "ONLY BY LUCK". What does this mean?',
          },
          options: [
            { id: 'a', text: { tr: 'getByText her zaman en dayanıklı locator\'dır', en: 'getByText is always the most durable locator' } },
            { id: 'b', text: { tr: 'Bu deploy\'da metin değişmedi ama farklı bir deploy\'da (i18n değişimi, metin güncellemesi) getByText de kırılabilirdi', en: 'The text did not change in this deploy, but in a different deploy (an i18n change, a text update) getByText could break too' } },
            { id: 'c', text: { tr: 'getByText hiçbir zaman kırılmaz', en: 'getByText never breaks' } },
            { id: 'd', text: { tr: 'Metin locator\'ları XPath\'ten daha yavaştır', en: 'Text locators are slower than XPath' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'getByText, bu SPESİFİK deploy\'da (sadece hash ve sıralama değişti, metin değişmedi) hayatta kaldı. Ama metin locator\'ları developer\'ın metni güncellemesi veya sayfanın dilinin değişmesi gibi FARKLI bir tetikleyiciyle kırılabilir — bu yüzden data-testid/role kadar GÜVENİLİR değildir.',
            en: 'getByText survived in this SPECIFIC deploy (only the hash and ordering changed, the text did not). But text locators can break with a DIFFERENT trigger, like the developer updating the text or the page\'s language changing — which is why it is not as RELIABLE as data-testid/role.',
          },
        },
      },

      // ── H4: Conditional/Dynamic Element'i Locate Etmek ──
      {
        type: 'heading',
        text: { tr: '⏳ H4. Conditional/Dynamic Element\'i Locate Etmek', en: '⏳ H4. Locating a Conditional/Dynamic Element' },
      },
      {
        type: 'simple-box',
        emoji: '⏳',
        content: {
          tr: 'Koşullu/dinamik bir elementi locate etmek, GRUP A-G\'de öğrendiğin her şeyin (conditional render, fetch timing, hydration) TEK bir pratik iş akışında birleştiği yerdir. Peki bu 4 adımlı akış (koşulu bil → tetikle → varlığı bekle → görünürlüğü bekle) neden bu kadar önemli? Çünkü flaky testlerin BÜYÜK çoğunluğu bu 4 adımdan BİRİNİN atlanmasından kaynaklanır — genelde ya koşulun hiç tetiklenmemesi (F4\'teki Modal örneği) ya da varlık ile görünürlüğün karıştırılması (A3\'teki Render Tree dersi). Java analojisi: bir kaynağın (ör. bir dosya) AÇILDIĞINI varsaymadan önce `isOpen()` gibi bir kontrol yapmak gibi — varsayım yerine DOĞRULAMA. QA bağlamında: aşağıdaki adımlar bu iş akışını GRUP A-G\'deki derslerin bir ÖZETİ olarak sunar.',
          en: 'Locating a conditional/dynamic element is where everything you learned in GROUPS A-G (conditional render, fetch timing, hydration) converges into ONE practical workflow. Why does this 4-step flow (know the condition -> trigger it -> wait for presence -> wait for visibility) matter so much? Because the VAST majority of flaky tests come from skipping ONE of these 4 steps — usually either the condition never being triggered (the Modal example in F4) or presence and visibility being confused (the Render Tree lesson in A3). Java analogy: like checking `isOpen()` before assuming a resource (like a file) is OPEN — VERIFICATION instead of assumption. In QA context: the steps below present this workflow as a SUMMARY of the lessons from GROUPS A-G.',
        },
      },
      conditionalDynamicWaitSteps,
      {
        type: 'quiz',
        question: {
          tr: 'Bir test, "Bug başarıyla oluşturuldu" Toast\'ını `waitForSelector(\'[data-testid="toast"]\', {state:\'attached\'})` ile bekliyor ve ardından Toast\'ın metnini okumaya çalışıyor ama bazen boş bir metin okuyor. Sorun ne olabilir?',
          en: 'A test waits for the "Bug created successfully" Toast with `waitForSelector(\'[data-testid="toast"]\', {state:\'attached\'})` and then tries to read the Toast\'s text, but sometimes reads empty text. What could be the problem?',
        },
        options: [
          { id: 'a', text: { tr: '`attached` elementin DOM\'da olduğunu doğrular ama metnin animasyon/render tamamlanmadan henüz YAZILMAMIŞ olabileceğini garanti etmez — `visible` veya metin içeriğini bekleyen bir assertion gerekir', en: '`attached` confirms the element is in the DOM but does not guarantee the text has been WRITTEN yet before the animation/render completes — a `visible` or text-content assertion is needed' } },
          { id: 'b', text: { tr: 'Toast component\'i bozuktur', en: 'The Toast component is broken' } },
          { id: 'c', text: { tr: 'Bu asla olmaz', en: 'This never happens' } },
          { id: 'd', text: { tr: 'data-testid yanlış yazılmıştır', en: 'The data-testid is written incorrectly' } },
        ],
        correct: 'a',
        explanation: {
          tr: '`attached`, DOM varlığını doğrular ama içeriğin TAM olarak yazıldığını garanti etmez — element bir an boş metinle DOM\'a girip SONRA dolduruluyor olabilir. Metnin kendisini bekleyen bir assertion (`toHaveText`) bu zaman aralığını GÜVENLE kapatır.',
          en: '`attached` confirms DOM presence but does not guarantee the content is FULLY written — the element might enter the DOM with empty text for a moment and THEN get filled. An assertion waiting for the text itself (`toHaveText`) SAFELY closes this time gap.',
        },
        retryQuestion: {
          question: {
            tr: 'H4\'teki 4 adımlı akışın (koşulu bil → tetikle → varlığı bekle → görünürlüğü bekle) hangi adımı GRUP F4\'teki Modal dersine, hangisi GRUP A3\'teki Render Tree dersine karşılık gelir?',
            en: 'Which step of the H4 4-step flow (know the condition -> trigger it -> wait for presence -> wait for visibility) corresponds to the Modal lesson in GROUP F4, and which to the Render Tree lesson in GROUP A3?',
          },
          options: [
            { id: 'a', text: { tr: '"Koşulu tetikle" → F4 (Modal); "görünürlüğü bekle" → A3 (Render Tree)', en: '"Trigger the condition" -> F4 (Modal); "wait for visibility" -> A3 (Render Tree)' } },
            { id: 'b', text: { tr: 'İkisi de aynı adıma karşılık gelir', en: 'Both correspond to the same step' } },
            { id: 'c', text: { tr: 'Hiçbiri önceki gruplarla ilgili değildir', en: 'Neither relates to the previous groups' } },
            { id: 'd', text: { tr: '"Koşulu bil" → A3; "varlığı bekle" → F4', en: '"Know the condition" -> A3; "wait for presence" -> F4' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'F4\'te öğrendiğin ders ("koşul false iken element DOM\'da hiç yok") tam olarak "koşulu tetikle" adımına karşılık gelir. A3\'te öğrendiğin ders ("DOM\'da var ama render tree\'de yok olabilir") ise "görünürlüğü bekle" adımına karşılık gelir — H4 bu iki dersi TEK bir iş akışında birleştirir.',
            en: 'The lesson you learned in F4 ("while the condition is false, the element is not in the DOM at all") corresponds exactly to the "trigger the condition" step. The lesson from A3 ("exists in the DOM but may not be in the render tree") corresponds to the "wait for visibility" step — H4 combines these two lessons into ONE workflow.',
          },
        },
      },

      // ── H5: List/Tablo İçinde Tekil Satır ──
      {
        type: 'heading',
        text: { tr: '📊 H5. List/Tablo İçinde Tekil Satır: İndeks YASAK', en: '📊 H5. A Single Row in a List/Table: Index BANNED' },
      },
      {
        type: 'simple-box',
        emoji: '📊',
        content: {
          tr: 'Bu sayfanın en KATI kuralı budur: bir liste/tablo satırını locate ederken indeks (`nth(3)`, `li[3]`) KULLANMA. Bunun yerine satırı bir KİMLİĞE (data-id) veya bir İÇERİĞE (hasText) göre İLİŞKİSEL olarak bul, SONRA o satırın İÇİNDE ara. Peki neden bu kural bu kadar KATI? Çünkü H3\'teki filmde gördüğün gibi, index kırıldığında test hata VERMEZ — SESSİZCE yanlış satırı işler. Bu, üretimde para kaybı, yanlış bug\'ın kapatılması gibi CİDDİ sonuçlar doğurabilir. Java analojisi: bir listede bir öğeyi konumuna göre değil, `equals()`/kimliğine göre ARAMAK gibi — konum değişebilir, kimlik DEĞİŞMEZ. QA bağlamında: aşağıdaki pratikte GRUP A2\'de öğrendiğin ilişkisel locate\'i bir TABLO senaryosunda tekrar uygulayacaksın.',
          en: 'This is the STRICTEST rule on this page: when locating a list/table row, do NOT use an index (`nth(3)`, `li[3]`). Instead find the row RELATIONALLY by an IDENTITY (data-id) or CONTENT (hasText), THEN search INSIDE that row. Why is this rule so STRICT? Because as you saw in the H3 film, when an index breaks the test does NOT error — it SILENTLY processes the wrong row. This can have SERIOUS consequences in production, like financial loss or closing the wrong bug. Java analogy: like SEARCHING for an item in a list by its `equals()`/identity rather than its position — position can change, identity does NOT. In QA context: in the practice below you will re-apply the relational locating you learned in GROUP A2 to a TABLE scenario.',
        },
      },
      relationalRowLocatorPlayground,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tabloda satırı bulmak için `page.locator(\'tr\', {hasText: \'X\'}).locator(\'select\')` yazıyorsun. Bu kalıp neden index\'ten (`nth`) daha güvenilirdir?',
          en: 'You write `page.locator(\'tr\', {hasText: \'X\'}).locator(\'select\')` to find a row in a table. Why is this pattern more reliable than an index (`nth`)?',
        },
        options: [
          { id: 'a', text: { tr: 'Çünkü daha kısa yazılır', en: 'Because it is shorter to write' } },
          { id: 'b', text: { tr: 'Satırı sıralamadan BAĞIMSIZ, kalıcı bir içeriğe göre bulur; tablo yeniden sıralansa bile AYNI satıra ulaşır', en: 'It finds the row INDEPENDENT of ordering, by a permanent content; even if the table re-sorts, it reaches the SAME row' } },
          { id: 'c', text: { tr: 'Çünkü her zaman daha hızlı çalışır', en: 'Because it always runs faster' } },
          { id: 'd', text: { tr: 'İkisi arasında hiçbir fark yoktur', en: 'There is no difference between the two' } },
        ],
        correct: 'b',
        explanation: {
          tr: '`hasText` ile ilişkisel bulma, tablonun O ANKİ sıralamasına değil, satırın İÇERİĞİNE dayanır — filtreleme/sıralama değişse bile AYNI satıra ulaşır. Index ise tablonun o anki şekline kör bir varsayımdır.',
          en: 'Relational finding with `hasText` relies on the row\'s CONTENT, not the table\'s CURRENT ordering — it reaches the SAME row even if filtering/sorting changes. An index is a blind assumption about the table\'s current shape.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir tabloda binlerce satır varsa ve her birinde bir `data-bug-id` attribute\'u varsa, `hasText` ile metin araması yerine hangi yaklaşım daha PERFORMANSLI ve daha az belirsiz olabilir?',
            en: 'If a table has thousands of rows, each with a `data-bug-id` attribute, which approach might be more PERFORMANT and less ambiguous than a `hasText` search?',
          },
          options: [
            { id: 'a', text: { tr: '`[data-bug-id="42"]` gibi doğrudan kimlik tabanlı bir selector — metin eşleşmesi yerine tam bir attribute değeri arar', en: 'A direct identity-based selector like `[data-bug-id="42"]` — it searches for an exact attribute value instead of a text match' } },
            { id: 'b', text: { tr: 'Yine `nth()` kullanmak', en: 'Using `nth()` again' } },
            { id: 'c', text: { tr: 'Tüm satırları tek tek elle kontrol etmek', en: 'Manually checking every row one by one' } },
            { id: 'd', text: { tr: 'Sayfayı yeniden yükleyip ilk satırı almak', en: 'Reloading the page and taking the first row' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Metin araması (`hasText`) bazen birden fazla satırda kısmi eşleşme verebilir (belirsizlik) ve büyük tablolarda göreceli olarak yavaş olabilir. Doğrudan bir kimlik attribute\'una (`data-bug-id`) eşitlik araması hem daha KESİN hem genelde daha HIZLIDIR — ama HER İKİSİ de index\'ten kesinlikle daha güvenilirdir.',
            en: 'A text search (`hasText`) can sometimes give a partial match on multiple rows (ambiguity) and can be relatively slow on large tables. An exact-match search on a direct identity attribute (`data-bug-id`) is both more PRECISE and usually FASTER — but BOTH are definitely more reliable than an index.',
          },
        },
      },

      // ── H6: Shadow DOM / iframe / web component ──
      {
        type: 'heading',
        text: { tr: '🛂 H6. Shadow DOM / iframe / Web Component: Context Değişimi', en: '🛂 H6. Shadow DOM / iframe / Web Component: a Context Switch' },
      },
      {
        type: 'simple-box',
        emoji: '🛂',
        content: {
          tr: 'Shadow DOM ve iframe, bir ÜLKE İÇİNDEKİ ÖZERK BÖLGE gibidir: normal DOM\'daki bir locator, bu sınırların İÇİNE otomatik olarak GİREMEZ — tıpkı bir vatandaşın başka bir ülkeye pasaportsuz giremeyeceği gibi. Peki bunlar neden var? Bir web component (`<severity-picker>`) kendi iç yapısını (shadow DOM) DIŞARIDAN gelecek stil/script çakışmalarından korumak için gizler; bir `<iframe>` ise güvenlik nedeniyle (ör. üçüncü parti bir ödeme formu) tamamen ayrı bir `document` çalıştırır. Java analojisi: bir class\'ın `private` alanlarına DIŞARIDAN doğrudan erişememek gibi — bir "getter" (context değiştirme API\'si) gerekir. QA bağlamında: bir element locate edilemediğinde ve DOM\'da "orada duruyor gibi görünüyor" ama bulunamıyor gibi hissediyorsan, İLK sorman gereken soru "bu bir shadow DOM veya iframe içinde mi?" olmalıdır.',
          en: 'Shadow DOM and an iframe are like an AUTONOMOUS REGION within a country: a locator in the normal DOM CANNOT automatically enter INSIDE these boundaries — just like a citizen cannot enter another country without a passport. Why do these exist? A web component (`<severity-picker>`) hides its internal structure (a shadow DOM) to protect it from style/script conflicts coming from OUTSIDE; an `<iframe>` runs an entirely separate `document` for security reasons (e.g. a third-party payment form). Java analogy: like not being able to directly access a class\'s `private` fields from OUTSIDE — you need a "getter" (a context-switching API). In QA context: when an element cannot be located and you feel it "looks like it is there" in the DOM but cannot be found, the FIRST question to ask should be "is this inside a shadow DOM or an iframe?"',
        },
      },
      shadowDomIframeSteps,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester `<severity-picker>` adında bir web component\'in İÇİNDEKİ bir `<option>`\'ı `page.locator(\'option\')` ile bulmaya çalışıyor ama bulamıyor. DOM\'da element gözle GÖRÜNÜYOR. En olası açıklama nedir?',
          en: 'A tester tries to find an `<option>` INSIDE a web component named `<severity-picker>` with `page.locator(\'option\')` but cannot find it. The element is visually PRESENT in the DOM. What is the most likely explanation?',
        },
        options: [
          { id: 'a', text: { tr: 'Element gizlenmiştir (display:none)', en: 'The element is hidden (display:none)' } },
          { id: 'b', text: { tr: 'Element bir shadow DOM\'un içindedir ve normal bir selector bu sınırı GEÇEMEZ; özel bir "piercing" selector veya shadow-aware API gerekir', en: 'The element is inside a shadow DOM and a normal selector CANNOT cross this boundary; a special "piercing" selector or shadow-aware API is needed' } },
          { id: 'c', text: { tr: 'Tarayıcı bozuktur', en: 'The browser is broken' } },
          { id: 'd', text: { tr: 'Selector syntax\'ı yanlış yazılmıştır', en: 'The selector syntax is written incorrectly' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Web component\'ler genelde kendi iç yapılarını bir shadow root\'ta kapsüller. Normal bir CSS selector bu sınırı OTOMATİK OLARAK geçemez — bu, bir güvenlik/izolasyon özelliğidir, bir HATA değildir. Test aracının shadow-aware bir API\'si (`>>>`, piercing selector) kullanılmalıdır.',
          en: 'Web components usually encapsulate their internal structure in a shadow root. A normal CSS selector CANNOT automatically cross this boundary — this is a security/isolation feature, not a BUG. A shadow-aware API of the test tool (`>>>`, a piercing selector) should be used.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir "New Bug" formunun içinde üçüncü parti bir ödeme widget\'ı bir `<iframe>` içinde çalışıyor. Bu iframe\'in İÇİNDEKİ bir input\'a yazı yazmak isteyen bir test ne yapmalı?',
            en: 'A third-party payment widget inside a "New Bug" form runs inside an `<iframe>`. What should a test that wants to type into an input INSIDE this iframe do?',
          },
          options: [
            { id: 'a', text: { tr: 'Ana sayfa context\'inde normal bir locator yazmaya devam etmeli, otomatik çalışır', en: 'Keep writing a normal locator in the main page context, it works automatically' } },
            { id: 'b', text: { tr: 'Önce context\'i iframe\'e SWITCH etmeli (ör. `page.frameLocator(...)`), SONRA o context içinde input\'u locate etmeli', en: 'First SWITCH context into the iframe (e.g. `page.frameLocator(...)`), THEN locate the input within that context' } },
            { id: 'c', text: { tr: 'iframe\'i tamamen silmeli', en: 'Completely delete the iframe' } },
            { id: 'd', text: { tr: 'Sayfayı yeniden yüklemeli', en: 'Reload the page' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bir iframe kendi AYRI `document`\'ına sahip olduğundan, ana sayfanın locator\'ı onun İÇİNE hiç bakamaz. Doğru refleks önce context\'i o frame\'e SWITCH etmek (bir "pasaport kontrolünden geçmek"), sonra o yeni context içinde normal şekilde locate etmektir.',
            en: 'Since an iframe has its own SEPARATE `document`, the main page\'s locator can never look INSIDE it. The right reflex is to first SWITCH context into that frame (going through a "passport control"), then locate normally within that new context.',
          },
        },
      },

      // ── H7: Developer'dan Ne İstenir ──
      {
        type: 'heading',
        text: { tr: '💬 H7. Developer\'dan Ne İstenir', en: '💬 H7. What to Ask the Developer For' },
      },
      {
        type: 'simple-box',
        emoji: '💬',
        content: {
          tr: 'Bu sayfa boyunca gördüğün her "Developer\'dan Ne İste" kutusu tek bir BECERİYİ inşa ediyordu: soyut bir şikayeti ("test edilebilir değil") somut, uygulanabilir bir İSTEĞE ("şu satıra şunu ekle") çevirmek. Peki bu neden ÖNEMLİ bir ayrım? Çünkü "test edilebilirlik istiyorum" demek bir developer\'ı savunmaya iter (ne demek istediğini bilmez), ama "`data-testid=\'bug-card-{id}\'` ekler misin, çünkü X nedeniyle Y kırılıyor" demek SANİYELER içinde uygulanabilir bir PR\'a dönüşür. Java analojisi: bir code review\'da "bu kod kötü" demek yerine "bu metot `null` kontrolü yapmıyor, satır 42\'de NPE riski var" demek gibi — SPESİFİK geri bildirim hızlı çözülür. QA bağlamında: en ileri seviye, test edilebilirliği bir kabul kriteri (acceptance criterion) olarak PROAKTIF şekilde talep etmektir — bug bulunduktan SONRA değil, feature YAZILIRKEN.',
          en: 'Every "What to Ask the Developer" box you saw throughout this page was building ONE skill: turning an abstract complaint ("it is not testable") into a concrete, actionable REQUEST ("add this to this line"). Why is this distinction IMPORTANT? Because saying "I want testability" pushes a developer onto the defensive (they do not know what you mean), but saying "could you add `data-testid=\'bug-card-{id}\'`, because X breaks due to Y" turns into an actionable PR in SECONDS. Java analogy: like saying, in a code review, "this method does not null-check, there is an NPE risk on line 42" instead of "this code is bad" — SPECIFIC feedback gets resolved fast. In QA context: the most advanced level is PROACTIVELY requesting testability as an acceptance criterion — not AFTER a bug is found, but WHILE the feature is being WRITTEN.',
        },
      },
      developerRequestTable,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester bir sprint planlama toplantısında "yeni BugCard filtreleme özelliği için test edilebilirliği bir kabul kriteri olarak ekleyelim" diyor. Bu, hangi yaklaşımdan DAHA İLERİ bir seviyedir?',
          en: 'A tester says in a sprint planning meeting "let\'s add testability as an acceptance criterion for the new BugCard filtering feature". This is a MORE ADVANCED level than which approach?',
        },
        options: [
          { id: 'a', text: { tr: 'Feature yazıldıktan ve bug bulunduktan SONRA developer\'dan data-testid istemek', en: 'Asking the developer for a data-testid AFTER the feature is written and a bug is found' } },
          { id: 'b', text: { tr: 'Hiçbir fark yoktur, ikisi de aynı sonucu verir', en: 'There is no difference, both give the same result' } },
          { id: 'c', text: { tr: 'Test yazmamak', en: 'Not writing tests at all' } },
          { id: 'd', text: { tr: 'Sadece manuel test yapmak', en: 'Only doing manual testing' } },
        ],
        correct: 'a',
        explanation: {
          tr: 'Testability\'yi baştan bir kabul kriteri olarak talep etmek, sorunu KÖKTEN önler — developer feature\'ı YAZARKEN data-testid\'leri ekler, geriye dönük bir PR/refactor gerekmez. Bu, "reaktif" (bug bulunca düzelt) yaklaşımdan çok daha OLGUN bir "proaktif" yaklaşımdır.',
          en: 'Requesting testability as an acceptance criterion upfront prevents the problem AT THE ROOT — the developer adds data-testids WHILE WRITING the feature, no retroactive PR/refactor is needed. This is a much more MATURE "proactive" approach than the "reactive" (fix it once a bug is found) one.',
        },
        retryQuestion: {
          question: {
            tr: '"Bu buton çalışmıyor" demek yerine "BugCard içindeki Düzenle butonu, class hash\'i her build\'de değiştiği için otomasyonda bulunamıyor, data-testid gerekiyor" demek NEDEN daha etkilidir?',
            en: 'Why is saying "the Edit button inside BugCard cannot be found in automation because its class hash changes on every build, a data-testid is needed" more effective than saying "that button does not work"?',
          },
          options: [
            { id: 'a', text: { tr: 'Daha uzun olduğu için', en: 'Because it is longer' } },
            { id: 'b', text: { tr: 'HANGİ component, NEDEN kırıldığı ve NE gerektiği spesifik olarak belirtildiği için developer araştırma yapmadan doğrudan çözüme geçebilir', en: 'Because it specifically states WHICH component, WHY it breaks, and WHAT is needed, so the developer can go straight to a fix without investigating' } },
            { id: 'c', text: { tr: 'Daha kibar bir ifade olduğu için', en: 'Because it is a more polite phrasing' } },
            { id: 'd', text: { tr: 'İkisi arasında pratik bir fark yoktur', en: 'There is no practical difference between the two' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bu sayfanın giriş bölümündeki temel hedeflerden biri budur: "hangi component", "hangi teknik neden", "hangi somut çözüm" ile konuşmak, developer\'ın kendi başına teşhis koymak için harcayacağı zamanı SIFIRLAR — bu, ortak dil konuşmanın pratik faydasıdır.',
            en: 'This is one of this page\'s core goals, stated in its introduction: speaking with "which component", "which technical reason", "which concrete solution" ZEROES OUT the time the developer would spend diagnosing it themselves — this is the practical benefit of speaking a common language.',
          },
        },
      },

      // ── H8: Locator Code Review ──
      {
        type: 'heading',
        text: { tr: '🔎 H8. Locator Code Review: Developer\'ın PR\'ında Testability\'yi Gözden Geçirmek', en: '🔎 H8. Locator Code Review: Reviewing Testability in a Developer\'s PR' },
      },
      {
        type: 'simple-box',
        emoji: '🔎',
        content: {
          tr: 'Bir PR\'ı "testability gözüyle" incelemek, bir denetçinin bir binayı SADECE görünüşe göre değil, YANGIN ÇIKIŞLARININ yerini de kontrol ederek denetlemesi gibidir: bina güzel görünebilir (kod çalışabilir) ama acil bir durumda (bir test yazman gerektiğinde) çıkış yoksa (stabil bir kanca yoksa) sorun ortaya çıkar. Peki bu inceleme NE ZAMAN yapılmalı? Kod merge olduktan SONRA değil, PR AŞAMASINDA — çünkü o an değişiklik hâlâ küçük ve ucuzken düzeltmek kolaydır. Java analojisi: bir code review\'da sadece "çalışıyor mu" değil "test edilebilir mi, mock\'lanabilir mi" diye de sormak gibi — testability bir KOD KALİTESİ boyutudur, ayrı bir konu değildir. QA bağlamında: aşağıdaki tablo, bir PR\'da GÖRDÜĞÜN her değişiklik türü için sorman gereken SPESİFİK soruyu verir — bu sayfanın tüm derslerinin bir SENTEZİDİR.',
          en: 'Reviewing a PR "with a testability eye" is like an inspector auditing a building not JUST by its appearance, but also by checking WHERE THE FIRE EXITS are: the building can look beautiful (the code can work) but if there is no exit (no stable hook) in an emergency (when you need to write a test), a problem surfaces. When should this review happen? Not AFTER the code merges, but AT THE PR STAGE — because at that point the change is still small and cheap to fix. Java analogy: like asking not just "does it work" in a code review, but also "is it testable, mockable" — testability is a dimension of CODE QUALITY, not a separate topic. In QA context: the table below gives the SPECIFIC question to ask for every type of change you SEE in a PR — this is a SYNTHESIS of every lesson on this page.',
        },
      },
      locatorCodeReviewTable,
      {
        type: 'quiz',
        question: {
          tr: 'Bir tester bir PR\'da yeni bir `.map()` ile render edilen liste görüyor ve her satırın sadece React `key`\'ine sahip olduğunu, benzersiz bir `data-id` OLMADIĞINI fark ediyor. Bu PR\'da hangi yorumu YAPMALIDIR?',
          en: 'A tester sees a new list rendered with `.map()` in a PR and notices each row only has a React `key`, with NO unique `data-id`. What comment SHOULD they make on this PR?',
        },
        options: [
          { id: 'a', text: { tr: 'Hiçbir yorum yapmamalı, key yeterlidir', en: 'No comment needed, key is enough' } },
          { id: 'b', text: { tr: '"Her satıra benzersiz bir `data-id`/`data-testid` eklenebilir mi? key DOM\'da görünmüyor ve locator olarak kullanılamıyor, index\'e bel bağlamak zorunda kalırım."', en: '"Could a unique `data-id`/`data-testid` be added to each row? key does not appear in the DOM and cannot be used as a locator, I would have to rely on an index."' } },
          { id: 'c', text: { tr: 'PR\'ı hiç incelememeli', en: 'They should not review the PR at all' } },
          { id: 'd', text: { tr: 'Sadece CSS hakkında yorum yapmalı', en: 'They should only comment on CSS' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Bu, H8\'in tam olarak öğrettiği reflekstir: bir liste render\'ı gördüğünde "her satırda benzersiz bir kimlik var mı, yoksa sadece index mi ayırt ediyor?" sorusunu SOR ve MERGE OLMADAN ÖNCE somut bir istek yap — bu, sonradan bir refactor\'dan çok daha UCUZDUR.',
          en: 'This is exactly the reflex H8 teaches: when you see a list render, ASK "does each row have a unique identity, or does only the index distinguish them?" and make a concrete request BEFORE the merge — this is much CHEAPER than a refactor afterward.',
        },
        retryQuestion: {
          question: {
            tr: 'Locator code review\'unu PR aşamasında yapmak yerine, kod merge olduktan aylar sonra "testler kırılıyor" diye fark etmek neden daha PAHALIDIR?',
            en: 'Why is noticing "tests are breaking" months after the code merged more EXPENSIVE than doing a locator code review at the PR stage?',
          },
          options: [
            { id: 'a', text: { tr: 'Hiçbir fark yoktur, ikisi de aynı maliyeti taşır', en: 'There is no difference, both carry the same cost' } },
            { id: 'b', text: { tr: 'PR aşamasında bir satırlık bir değişiklik yeterliyken, aylar sonra HEM kodu HEM testleri (bazen çok sayıda) geriye dönük değiştirmek gerekir', en: 'While a one-line change is enough at the PR stage, months later BOTH the code AND the tests (sometimes many of them) need to be changed retroactively' } },
            { id: 'c', text: { tr: 'Aylar sonra düzeltmek her zaman daha ucuzdur', en: 'Fixing it months later is always cheaper' } },
            { id: 'd', text: { tr: 'PR aşamasında düzeltme imkansızdır', en: 'Fixing it at the PR stage is impossible' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Bu, yazılım mühendisliğinin genel bir ilkesidir: bir sorunu ERKEN yakalamak (PR\'da bir satırlık istek) her zaman GEÇ yakalamaktan (aylar sonra hem kodu hem çok sayıda testi değiştirmek) ucuzdur. Locator code review bu ilkeyi test edilebilirliğe uygular.',
            en: 'This is a general software engineering principle: catching a problem EARLY (a one-line request in a PR) is always cheaper than catching it LATE (changing both the code and many tests months later). Locator code review applies this principle to testability.',
          },
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

  // ══ GRUP I — Yaygın Hatalar (error-dictionary) ══════════════════════════════
  {
    title: { tr: '🚨 Yaygın Hatalar', en: '🚨 Common Errors' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🚨',
        content: {
          tr: 'Locator hatalarının çoğu, kaynak-DOM-render ayrımını bilmemekten doğar ve hep aynı birkaç kalıba oturur: element henüz render olmadan locate etmek (NoSuchElement), re-render sonrası ölmüş referansı kullanmak (StaleElement), hash class\'a bağlanmak, `*ngIf`/conditional ile DOM\'da OLMAYAN elementi bekleme yapmadan aramak, iframe/shadow DOM context\'ini unutmak. Neden bir "hata sözlüğü"? Çünkü hatanın mesajını görünce kök nedenini anında tanıyabilen tester dakikalar içinde çözer; tanıyamayan saatlerce kör dener. Java analojisi: NullPointerException gördüğünde "hangi referans null?" diye düşünmek gibi — mesaj sana kök nedene giden yolu söyler. QA bağlamında: bu grup her hatayı Belirti → Kök Neden → Çözüm → Önleme formatında verir; her hata bu sayfada önceden gördüğün bir GRUP\'a köprü kurar.',
          en: 'Most locator errors arise from not knowing the source-DOM-render distinction and always settle into the same few patterns: locating before the element renders (NoSuchElement), using a reference that died after a re-render (StaleElement), binding to a hash class, searching without a wait for an element NOT in the DOM due to `*ngIf`/conditional, forgetting the iframe/shadow DOM context. Why an "error dictionary"? Because a tester who recognizes the root cause the moment they see the error message solves it in minutes; one who cannot tries blindly for hours. Java analogy: like thinking "which reference is null?" when you see a NullPointerException — the message tells you the path to the root cause. In QA context: this group presents each error in a Symptom -> Root Cause -> Fix -> Prevention format; every error bridges back to a GROUP you already saw on this page.',
        },
      },
      staleElementFilm,
      errorMessageDiagnosisSteps,
      fixStaleElementPlayground,
      {
        type: 'error-dictionary',
        relatedTopicId: 'qaf-i-common-errors',
        framework: 'QA Frontend',
        errors: [
          {
            error: 'NoSuchElementException',
            fullMessage: { tr: 'NoSuchElementException: Unable to locate element: [data-testid="bug-card-42"]', en: 'NoSuchElementException: Unable to locate element: [data-testid="bug-card-42"]' },
            cause: {
              tr: 'Test, element DOM\'a eklenmeden ÖNCE locate etmeye çalıştı — genelde fetch henüz bitmediği (GRUP D3) veya conditional render koşulu henüz tetiklenmediği (GRUP F4) için element gerçekten DOM\'da YOK.',
              en: 'The test tried to locate the element BEFORE it was added to the DOM — usually because a fetch has not finished yet (GROUP D3) or a conditional render\'s condition has not been triggered yet (GROUP F4), so the element genuinely does NOT exist in the DOM.',
            },
            solution: {
              tr: 'Sabit `sleep` yerine koşullu bir bekleme (`toHaveCount`, `toBeVisible`) kullan; conditional render\'sa önce koşulu tetikleyen eylemi (butona tıklama) yap.',
              en: 'Use a conditional wait (`toHaveCount`, `toBeVisible`) instead of a fixed `sleep`; if it is a conditional render, first perform the action that triggers the condition (clicking the button).',
            },
            codeWrong: {
              tr: `// BUG: fetch bitmeden veya modal açılmadan locate ediliyor
await page.goto('/bugs');
await page.locator('[data-testid="bug-card-42"]').click();`,
              en: `// BUG: locating before the fetch finishes or the modal opens
await page.goto('/bugs');
await page.locator('[data-testid="bug-card-42"]').click();`,
            },
            codeFixed: {
              tr: `// FIX: koşullu bekleme + gerekiyorsa önce tetikleyici eylem
await page.goto('/bugs');
await expect(page.locator('li')).toHaveCount(3); // fetch bitene kadar bekler
await page.locator('[data-testid="bug-card-42"]').click();`,
              en: `// FIX: a conditional wait + the triggering action first if needed
await page.goto('/bugs');
await expect(page.locator('li')).toHaveCount(3); // waits until the fetch finishes
await page.locator('[data-testid="bug-card-42"]').click();`,
            },
          },
          {
            error: 'StaleElementReferenceException',
            fullMessage: { tr: 'StaleElementReferenceException: element is not attached to the page document', en: 'StaleElementReferenceException: element is not attached to the page document' },
            cause: {
              tr: 'Test bir elemente referans TUTTU, ama sonra bir re-render (GRUP A5 reflow, GRUP F3 state değişikliği) bu elementi DOM\'dan kaldırıp YENİDEN oluşturdu — eski referans artık hiçbir şeye karşılık gelmiyor.',
              en: 'The test HELD a reference to an element, but then a re-render (GROUP A5 reflow, GROUP F3 a state change) removed the element from the DOM and RECREATED it — the old reference no longer corresponds to anything.',
            },
            solution: {
              tr: 'Referansı ÖNCEDEN tutup sonra kullanmak yerine, her etkileşimde locator\'ı YENİDEN sorgula (Playwright locator\'ları bunu otomatik yapar); listeler dolarken/animasyon oynarken stabilleşmeyi bekle.',
              en: 'Instead of holding a reference beforehand and using it later, RE-QUERY the locator on every interaction (Playwright locators do this automatically); wait for things to stabilize while a list fills/an animation plays.',
            },
            codeWrong: {
              tr: `// BUG: elementi bir kere buluyor, listeye yeni bug eklenince referans olur
const editBtn = await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]'));
await driver.findElement(By.testid('load-more')).click(); // liste yeniden render olur
await editBtn.click(); // StaleElementReferenceException!`,
              en: `// BUG: finds the element once, becomes stale once a new bug is added to the list
const editBtn = await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]'));
await driver.findElement(By.testid('load-more')).click(); // the list re-renders
await editBtn.click(); // StaleElementReferenceException!`,
            },
            codeFixed: {
              tr: `// FIX: her etkileşimden önce locator'ı yeniden sorgula
await driver.findElement(By.testid('load-more')).click();
await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]')).click(); // taze referans`,
              en: `// FIX: re-query the locator before every interaction
await driver.findElement(By.testid('load-more')).click();
await driver.findElement(By.cssSelector('[data-testid="edit-bug-42"]')).click(); // fresh reference`,
            },
          },
          {
            error: { tr: 'Hash class\'a bağlanıp build\'de kırılma', en: 'Binding to a hash class and breaking on build' },
            fullMessage: { tr: '0 elements matched: .BugCard_card__x7f2a', en: '0 elements matched: .BugCard_card__x7f2a' },
            cause: {
              tr: 'Test, bir CSS Modules/styled-components class\'ına (GRUP C3, C5) bağlandı; bir sonraki build/deploy bu hash\'i YENİDEN üretti ve dünkü class ismi artık DOM\'da hiç YOK.',
              en: 'The test bound to a CSS Modules/styled-components class (GROUP C3, C5); the next build/deploy REGENERATED this hash, and yesterday\'s class name no longer exists in the DOM at all.',
            },
            solution: {
              tr: 'Class\'a ASLA locate etme; developer\'dan `data-testid` iste (GRUP F7/H1\'deki "Developer\'dan Ne İste" kalıbını kullan).',
              en: 'NEVER locate by class; ask the developer for a `data-testid` (use the "What to Ask the Developer" pattern from GROUP F7/H1).',
            },
            codeWrong: {
              tr: `// BUG: hash class'a bağlı, deploy'da kırılır
await page.locator('.BugCard_card__x7f2a').click();`,
              en: `// BUG: bound to a hash class, breaks on deploy
await page.locator('.BugCard_card__x7f2a').click();`,
            },
            codeFixed: {
              tr: `// FIX: build'den bağımsız kasıtlı kimlik
await page.getByTestId('bug-card-42').click();`,
              en: `// FIX: a deliberate identity independent of the build
await page.getByTestId('bug-card-42').click();`,
            },
          },
          {
            error: { tr: 'Conditional element\'i wait\'siz locate', en: 'Locating a conditional element without a wait' },
            fullMessage: { tr: 'ElementNotInteractableException: element is not visible', en: 'ElementNotInteractableException: element is not visible' },
            cause: {
              tr: '`{isOpen && <Modal/>}`/`*ngIf` (GRUP F4, G3) ile render edilen bir element, koşul tetiklenip DOM\'a girse bile CSS animasyonu (fade-in) bitmeden `visible`/`actionable` sayılmayabilir.',
              en: 'An element rendered with `{isOpen && <Modal/>}`/`*ngIf` (GROUP F4, G3) may not count as `visible`/`actionable` until a CSS animation (a fade-in) finishes, even after the condition is triggered and it enters the DOM.',
            },
            solution: {
              tr: 'Önce koşulu tetikleyen eylemi yap, sonra `attached` DEĞİL `visible` durumunu bekle — GRUP H4\'teki 4 adımlı akışı (bil→tetikle→varlık→görünürlük) uygula.',
              en: 'First perform the action that triggers the condition, then wait for `visible`, NOT `attached` — apply the 4-step flow from GROUP H4 (know -> trigger -> presence -> visibility).',
            },
            codeWrong: {
              tr: `// BUG: butona tıkladıktan hemen sonra, animasyon bitmeden tıklıyor
await page.click('[data-testid="new-bug-btn"]');
await page.locator('[data-testid="modal-submit"]').click();`,
              en: `// BUG: clicks right after the button, before the animation finishes
await page.click('[data-testid="new-bug-btn"]');
await page.locator('[data-testid="modal-submit"]').click();`,
            },
            codeFixed: {
              tr: `// FIX: visible olmayı (animasyon dahil tamamlanmayı) bekle
await page.click('[data-testid="new-bug-btn"]');
await page.locator('[data-testid="modal-submit"]').waitFor({ state: 'visible' });
await page.locator('[data-testid="modal-submit"]').click();`,
              en: `// FIX: wait to be visible (including the animation finishing)
await page.click('[data-testid="new-bug-btn"]');
await page.locator('[data-testid="modal-submit"]').waitFor({ state: 'visible' });
await page.locator('[data-testid="modal-submit"]').click();`,
            },
          },
          {
            error: { tr: 'iframe\'i unutmak', en: 'Forgetting the iframe' },
            fullMessage: { tr: 'NoSuchElementException: Unable to locate element: [data-testid="card-number-input"]', en: 'NoSuchElementException: Unable to locate element: [data-testid="card-number-input"]' },
            cause: {
              tr: 'Element gözle DOM\'da GÖRÜNÜYOR (bir ödeme widget\'ı içinde) ama gerçekte bir `<iframe>` içinde, AYRI bir `document`\'ta yaşıyor (GRUP H6) — ana sayfa context\'inde yazılan locator oraya hiç bakamaz.',
              en: 'The element visually APPEARS in the DOM (inside a payment widget) but really lives inside an `<iframe>`, in a SEPARATE `document` (GROUP H6) — a locator written in the main page context can never look inside it.',
            },
            solution: {
              tr: 'Önce context\'i o frame\'e SWITCH et (`page.frameLocator(...)`), sonra o context içinde normal şekilde locate et.',
              en: 'First SWITCH context into that frame (`page.frameLocator(...)`), then locate normally within that context.',
            },
            codeWrong: {
              tr: `// BUG: iframe context'ine geçmeden ana context'ten locate ediyor
await page.locator('[data-testid="card-number-input"]').fill('4242...');`,
              en: `// BUG: locating from the main context without switching into the iframe
await page.locator('[data-testid="card-number-input"]').fill('4242...');`,
            },
            codeFixed: {
              tr: `// FIX: önce iframe context'ine gir
await page.frameLocator('#payment-iframe')
  .locator('[data-testid="card-number-input"]')
  .fill('4242...');`,
              en: `// FIX: enter the iframe context first
await page.frameLocator('#payment-iframe')
  .locator('[data-testid="card-number-input"]')
  .fill('4242...');`,
            },
          },
          {
            error: { tr: 'Shadow DOM\'a normal selector', en: 'A normal selector against Shadow DOM' },
            fullMessage: { tr: 'NoSuchElementException: Unable to locate element: severity-picker option', en: 'NoSuchElementException: Unable to locate element: severity-picker option' },
            cause: {
              tr: 'Bir web component (`<severity-picker>`) kendi iç yapısını bir shadow root\'ta KAPSÜLLER (GRUP H6) — normal bir CSS selector bu sınırı OTOMATİK OLARAK geçemez.',
              en: 'A web component (`<severity-picker>`) ENCAPSULATES its internal structure in a shadow root (GROUP H6) — a normal CSS selector CANNOT automatically cross this boundary.',
            },
            solution: {
              tr: 'Test aracının shadow-aware bir API\'sini (piercing selector, `>>>`) veya component\'in kendi genel (public) attribute\'larını kullan.',
              en: 'Use the test tool\'s shadow-aware API (a piercing selector, `>>>`) or the component\'s own public attributes.',
            },
            codeWrong: {
              tr: `// BUG: shadow root sınırını geçemeyen normal selector
await page.locator('severity-picker option[value="CRITICAL"]').click();`,
              en: `// BUG: a normal selector that cannot cross the shadow root boundary
await page.locator('severity-picker option[value="CRITICAL"]').click();`,
            },
            codeFixed: {
              tr: `// FIX: shadow-piercing selector (Playwright otomatik piercing yapar,
// ama web component API'sine göre değişebilir)
await page.locator('severity-picker').locator('option[value="CRITICAL"]').click();`,
              en: `// FIX: a shadow-piercing selector (Playwright auto-pierces by default,
// but this can vary depending on the web component's API)
await page.locator('severity-picker').locator('option[value="CRITICAL"]').click();`,
            },
          },
          {
            error: { tr: 'İndeks\'e bağlı satır locate\'in sıralama değişince kayması', en: 'An index-based row locator shifting when ordering changes' },
            fullMessage: { tr: 'Test "CRITICAL" bug\'ı düzenledi ama yanlışlıkla "LOW" severity bug\'ı güncellendi', en: 'The test edited the "CRITICAL" bug but the "LOW" severity bug got updated by mistake' },
            cause: {
              tr: '`page.locator(\'tr\').nth(2)` gibi bir locator (GRUP A2, H2, H5) tablonun O ANKİ sırasına bel bağladı; bir filtreleme/sıralama değişikliği bu index\'in ARTIK BAŞKA bir satıra işaret etmesine yol açtı — test SESSİZCE yanlış satırı işledi.',
              en: 'A locator like `page.locator(\'tr\').nth(2)` (GROUP A2, H2, H5) relied on the table\'s CURRENT order; a filtering/sorting change caused this index to NOW point to a DIFFERENT row — the test SILENTLY processed the wrong row.',
            },
            solution: {
              tr: 'Satırı ASLA index\'e göre bulma; bir kimliğe (`data-bug-id`) veya kalıcı bir içeriğe (`hasText`) göre İLİŞKİSEL bul, sonra o satırın içinde ara.',
              en: 'NEVER find a row by index; find it RELATIONALLY by an identity (`data-bug-id`) or permanent content (`hasText`), then search inside that row.',
            },
            codeWrong: {
              tr: `// BUG: index sıralama değişince yanlış satıra işaret eder
await page.locator('tr').nth(2).locator('select').selectOption('CRITICAL');`,
              en: `// BUG: the index points to the wrong row once ordering changes
await page.locator('tr').nth(2).locator('select').selectOption('CRITICAL');`,
            },
            codeFixed: {
              tr: `// FIX: satırı kimlikle/metinle ilişkisel bul
await page.locator('tr', { hasText: 'Login butonu 500 donuyor' })
  .locator('select').selectOption('CRITICAL');`,
              en: `// FIX: find the row relationally by identity/text
await page.locator('tr', { hasText: 'Login button freezes on 500' })
  .locator('select').selectOption('CRITICAL');`,
            },
          },
          {
            error: { tr: '`display:none` elementi tıklamaya çalışmak', en: 'Trying to click a `display:none` element' },
            fullMessage: { tr: 'ElementNotInteractableException: element is not visible and may not be manipulated', en: 'ElementNotInteractableException: element is not visible and may not be manipulated' },
            cause: {
              tr: 'Element DOM\'da VARDIR (locate edilir, `attached`) ama `display:none` olduğu için Render Tree\'de YOKTUR (GRUP A3) — DOM varlığı ile tıklanabilirlik FARKLI şeylerdir.',
              en: 'The element EXISTS in the DOM (it is located, `attached`), but because it has `display:none` it is ABSENT from the Render Tree (GROUP A3) — DOM presence and clickability are DIFFERENT things.',
            },
            solution: {
              tr: '`attached` yerine `visible` durumunu bekle; element gerçekten `display:none` iken tıklanması BEKLENMİYORSA, bu bir uygulama hatası olabilir — önce ürünsel olarak doğru olup olmadığını sorgula.',
              en: 'Wait for the `visible` state instead of `attached`; if the element is NOT SUPPOSED to be clicked while genuinely `display:none`, this might be an application bug — first question whether it is correct from a product standpoint.',
            },
            codeWrong: {
              tr: `// BUG: sadece DOM varlığını kontrol ediyor, görünürlüğü değil
await page.waitForSelector('[data-testid="save-bug"]', { state: 'attached' });
await page.locator('[data-testid="save-bug"]').click();`,
              en: `// BUG: only checks DOM presence, not visibility
await page.waitForSelector('[data-testid="save-bug"]', { state: 'attached' });
await page.locator('[data-testid="save-bug"]').click();`,
            },
            codeFixed: {
              tr: `// FIX: görünürlüğü (render tree'de olmayı) bekle
await page.waitForSelector('[data-testid="save-bug"]', { state: 'visible' });
await page.locator('[data-testid="save-bug"]').click();`,
              en: `// FIX: wait for visibility (being in the render tree)
await page.waitForSelector('[data-testid="save-bug"]', { state: 'visible' });
await page.locator('[data-testid="save-bug"]').click();`,
            },
          },
          {
            error: { tr: 'Hydration bitmeden tıklama', en: 'Clicking before hydration finishes' },
            fullMessage: { tr: 'Test butona tıkladı, hata almadı, ama hiçbir şey olmadı', en: 'The test clicked the button, got no error, but nothing happened' },
            cause: {
              tr: 'SSR/SSG sayfasında (GRUP E3, E4) HTML ilk yanıtta HAZIRDIR ama JS bundle\'ı henüz hydrate OLMADIĞI için event listener bağlı değildir — tıklama sessizce KAYBOLUR.',
              en: 'On an SSR/SSG page (GROUP E3, E4) the HTML is READY in the first response, but because the JS bundle has not hydrated YET, the event listener is not attached — the click SILENTLY vanishes.',
            },
            solution: {
              tr: 'Developer\'dan açık bir "hydration bitti" işareti (`data-hydrated="true"`) iste ve tıklamadan önce bunu bekle — sadece `visible` olmak yeterli değildir.',
              en: 'Ask the developer for an explicit "hydration finished" marker (`data-hydrated="true"`) and wait for it before clicking — being merely `visible` is not enough.',
            },
            codeWrong: {
              tr: `// BUG: sayfa açılır açılmaz tıklıyor, hydration bitmemiş olabilir
await page.goto('/bugs');
await page.locator('[data-testid="new-bug-btn"]').click();`,
              en: `// BUG: clicks the moment the page opens, hydration may not have finished
await page.goto('/bugs');
await page.locator('[data-testid="new-bug-btn"]').click();`,
            },
            codeFixed: {
              tr: `// FIX: hydration bitti işaretini bekle
await page.goto('/bugs');
await page.waitForSelector('[data-hydrated="true"]');
await page.locator('[data-testid="new-bug-btn"]').click();`,
              en: `// FIX: wait for the hydration-finished marker
await page.goto('/bugs');
await page.waitForSelector('[data-hydrated="true"]');
await page.locator('[data-testid="new-bug-btn"]').click();`,
            },
          },
          {
            error: { tr: 'Angular `*ngIf`\'li elementi DOM\'da sanmak', en: 'Assuming an Angular `*ngIf`\'d element is in the DOM' },
            fullMessage: { tr: 'NoSuchElementException: Unable to locate element: .modal', en: 'NoSuchElementException: Unable to locate element: .modal' },
            cause: {
              tr: 'Bir tester, Angular\'da `*ngIf`\'in de React\'in `{isOpen&&}`\'i gibi elementi DOM\'dan TAMAMEN çıkardığını bilmeyip (GRUP G3), sanki bir `display:none` gibi "orada ama gizli" olduğunu VARSAYDI ve butonu tıklamadan locate etmeye çalıştı.',
              en: 'A tester, not knowing that `*ngIf` in Angular REMOVES the element from the DOM entirely just like React\'s `{isOpen&&}` (GROUP G3), ASSUMED it was "there but hidden" like a `display:none` and tried to locate it without clicking the button.',
            },
            solution: {
              tr: '`*ngIf` ile koşullu render edilen bir elementi locate etmeden önce, koşulu true yapan eylemi (butona tıklama) MUTLAKA yap — GRUP G3\'teki "*ngIf Kapıyı Açıp Kapıyor" filmini hatırla.',
              en: 'Before locating an element conditionally rendered with `*ngIf`, ALWAYS perform the action that makes the condition true (clicking the button) — remember the "*ngIf Opens and Closes the Door" film from GROUP G3.',
            },
            codeWrong: {
              tr: `// BUG: butona tıklamadan modalı locate etmeye çalışıyor
await page.goto('/bugs');
await page.locator('.modal').click(); // *ngIf="isOpen" henüz false`,
              en: `// BUG: tries to locate the modal without clicking the button
await page.goto('/bugs');
await page.locator('.modal').click(); // *ngIf="isOpen" is still false`,
            },
            codeFixed: {
              tr: `// FIX: önce koşulu tetikleyen eylemi yap
await page.goto('/bugs');
await page.locator('[data-testid="new-bug-btn"]').click(); // isOpen = true olur
await page.locator('[data-testid="new-bug-modal"]').waitFor({ state: 'visible' });`,
              en: `// FIX: first perform the action that triggers the condition
await page.goto('/bugs');
await page.locator('[data-testid="new-bug-btn"]').click(); // isOpen becomes true
await page.locator('[data-testid="new-bug-modal"]').waitFor({ state: 'visible' });`,
            },
          },
          {
            error: { tr: 'Text locate\'in i18n\'de (TR/EN) kırılması', en: 'A text locator breaking under i18n (TR/EN)' },
            fullMessage: { tr: 'NoSuchElementException: Unable to locate element: text="Düzenle"', en: 'NoSuchElementException: Unable to locate element: text="Duzenle"' },
            cause: {
              tr: 'Test `getByText(\'Düzenle\')` (GRUP H1, H3) ile yazıldı; sayfa dili EN\'e geçince (veya bir A/B testinde metin güncellenince) buton artık "Edit" yazıyor ve TR metnine bağlı locator hiçbir şey bulamıyor.',
              en: 'The test was written with `getByText(\'Edit\')` (GROUP H1, H3); once the page language switches (or the text is updated in an A/B test), the button now says something else and the locator bound to the old text finds nothing.',
            },
            solution: {
              tr: 'Çok dilli veya sık değişen metinler için `data-testid`/`getByRole` ile dilden BAĞIMSIZ bir kimliğe geç; metin locate\'i sadece tek dilli, nadiren değişen etiketlerde kullan.',
              en: 'For multilingual or frequently changing text, switch to a language-INDEPENDENT identity with `data-testid`/`getByRole`; use a text locator only for single-language, rarely-changing labels.',
            },
            codeWrong: {
              tr: `// BUG: dile bağlı metin locator'ı, EN moduna geçince kırılır
await page.getByText('Düzenle').click();`,
              en: `// BUG: a language-bound text locator, breaks when switching to EN mode
await page.getByText('Edit').click();`,
            },
            codeFixed: {
              tr: `// FIX: dilden bağımsız kimlik
await page.getByTestId('edit-bug-42').click();`,
              en: `// FIX: an identity independent of language
await page.getByTestId('edit-bug-42').click();`,
            },
          },
          {
            error: { tr: 'Absolute XPath\'in ufak DOM değişikliğinde patlaması', en: 'An absolute XPath exploding on a tiny DOM change' },
            fullMessage: { tr: 'NoSuchElementException: Unable to locate element: /html/body/div[2]/main/ul/li[3]/button', en: 'NoSuchElementException: Unable to locate element: /html/body/div[2]/main/ul/li[3]/button' },
            cause: {
              tr: 'Absolute XPath (GRUP H2), DOM\'un TAM o anki ata zincirine bel bağlar; bir designer\'ın Sidebar\'a yeni bir uyarı banner\'ı (`<div>`) eklemesi bile, aradaki tüm index\'leri KAYDIRIR ve tüm yolu geçersiz kılar.',
              en: 'An absolute XPath (GROUP H2) relies on the DOM\'s EXACT current ancestor chain; even a designer adding a new warning banner (`<div>`) to the Sidebar SHIFTS all the indexes in between and invalidates the entire path.',
            },
            solution: {
              tr: 'Absolute XPath\'i ASLA kullanma; `data-testid`/`getByRole` gibi ata zincirinden bağımsız bir locator\'a geç.',
              en: 'NEVER use an absolute XPath; switch to a locator independent of the ancestor chain, like `data-testid`/`getByRole`.',
            },
            codeWrong: {
              tr: `// BUG: tam ata zincirine bağlı, bir div eklenince kırılır
driver.findElement(By.xpath("/html/body/div[2]/main/ul/li[3]/button"));`,
              en: `// BUG: bound to the exact ancestor chain, breaks when a div is added
driver.findElement(By.xpath("/html/body/div[2]/main/ul/li[3]/button"));`,
            },
            codeFixed: {
              tr: `// FIX: ata zincirinden bağımsız kimlik
driver.findElement(By.cssSelector("[data-testid='edit-bug-42']"));`,
              en: `// FIX: an identity independent of the ancestor chain
driver.findElement(By.cssSelector("[data-testid='edit-bug-42']"));`,
            },
          },
        ],
      },
    ],
  },

  // ══ GRUP J — Mülakat Soruları ════════════════════════════════════════════
  {
    title: { tr: '💼 Mülakat Soruları', en: '💼 Interview Q&A' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '💼',
        content: {
          tr: 'Bir frontend-farkında tester\'ın mülakatı, "X nedir?" tanımlarıyla değil, gerçek production senaryolarıyla ölçülür: "Test bir gün geçti bir gün kaldı, element her deploy\'da değişen bir class kullanıyor, developer \'kodum aynı\' diyor — kime ne söylersin, kalıcı çözüm ne?" gibi. Neden senaryo tabanlı? Çünkü işin kendisi senaryodur — tanım ezberi flaky testi çözmez. Java analojisi: bir mülakatta "polymorphism nedir?" yerine "şu tasarım neden kırıldı, nasıl düzeltirsin?" sorulması gibi. QA bağlamında: bu grup 50 soruyu 15 Basic / 20 Intermediate / 15 Advanced olarak, her cevabı 3-6 cümle + Java analojisi ile verir.',
          en: 'A frontend-aware tester\'s interview is measured not by "what is X?" definitions but by real production scenarios: like "your test passed one day and failed the next, the element uses a class that changes on every deploy, the developer says \'my code is the same\' — who do you tell what, and what is the permanent fix?" Why scenario-based? Because the job itself is a scenario — memorizing definitions does not fix a flaky test. Java analogy: like being asked "why did this design break and how would you fix it?" instead of "what is polymorphism?" in an interview. In QA context: this group provides 50 questions as 15 Basic / 20 Intermediate / 15 Advanced, each answer in 3-6 sentences plus a Java analogy.',
        },
      },
      interviewAnswerFlowFilm,
      goodVsWeakAnswerSteps,
      writeStrongAnswerPlayground,
      {
        type: 'interview-questions',
        relatedTopicId: 'qaf-j-interview',
        topic: 'QA Frontend',
        questions: [
          // ══════════════════ BASIC (15) ══════════════════
          {
            level: 'basic',
            q: { tr: 'Bir bug raporunda "sayfa yüklendiğinde bug listesi boş görünüyor ama sayfayı yenileyince doluyor" yazıyor. "Sayfa yüklendi" derken hangi iki farklı şeyi kastediyor olabilir, ilk sorun nedir?', en: 'A bug report says "the bug list appears empty when the page loads, but fills after a refresh". What two different things could "page loaded" mean here, and what is your first question?' },
            a: { tr: '"Sayfa yüklendi" hem "HTML geldi" hem "veri fetch edilip render oldu" anlamına gelebilir — ikisi FARKLI anlardır. İlk sorum: "boş görünen an, ilk fetch\'in bitmesinden ÖNCE mi sonra mı?" çünkü CSR\'da ilk HTML boş `<ul>` içerir, veri asenkron gelir. Java analojisi: bir constructor\'ın çalışması (nesne var) ile bir asenkron initialize metodunun bitmesi (veri hazır) arasındaki fark gibi — ikisini karıştırmak "neden boş görünüyor" bug\'ının kök nedenidir.', en: '"Page loaded" can mean both "the HTML arrived" and "the data was fetched and rendered" — these are DIFFERENT moments. My first question: "is the empty moment BEFORE or after the first fetch completes?" because in CSR the initial HTML contains an empty `<ul>`, data arrives asynchronously. Java analogy: like the difference between a constructor running (the object exists) and an async initialize method finishing (the data is ready) — confusing the two is the root cause of the "why does it look empty" bug.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir developer "DevTools\'ta View Source\'a bakınca BugCard\'ları göremiyorum, bu bir bug" diyor. Ona ne açıklarsın?', en: 'A developer says "I cannot see the BugCards when I look at View Source in DevTools, this is a bug". What do you explain to them?' },
            a: { tr: '"View Source" ilk statik HTML metnidir; JS DOM\'u sonradan (fetch ile) değiştirdiği için bu görünüm artık gerçeği YANSITMAZ. Doğru yer DevTools → Elements panelidir — canlı DOM\'u gösterir. Java analojisi: `.java` kaynak dosyasını okumakla, JVM\'de o an çalışan programın bellek durumuna bakmak (debugger) FARKLI şeylerdir — kaynak, çalışma zamanındaki gerçeği göstermez.', en: '"View Source" is the initial static HTML text; because JS changes the DOM afterward (via a fetch), this view no longer REFLECTS reality. The right place is DevTools -> Elements — it shows the live DOM. Java analogy: reading a `.java` source file is DIFFERENT from looking at a running program\'s memory state in the JVM (a debugger) — the source does not show runtime truth.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir tester "Düzenle" butonuna `driver.findElement(By.className("Btn_ghost__p0q2"))` ile ulaşıyor ve bu bir sonraki deploy\'da kırılıyor. Kök neden ve kalıcı çözüm nedir?', en: 'A tester reaches the "Edit" button with `driver.findElement(By.className("Btn_ghost__p0q2"))`, and this breaks on the next deploy. What is the root cause and the permanent fix?' },
            a: { tr: 'Kök neden: bu class bir CSS Module hash\'i olup her build\'de yeniden üretilir — stil için var olan bir alana kimlik gibi güvenmek. Kalıcı çözüm: developer\'dan `data-testid="edit-bug-{id}"` gibi build\'den bağımsız bir kanca istemek. Java analojisi: bir nesnenin `toString()` çıktısına göre eşitlik kontrolü yapmak gibi — biçim değişince ilişki bozulur, oysa sabit bir kimlik (id) alanına bağlanmalıydın.', en: 'Root cause: this class is a CSS Modules hash regenerated on every build — trusting a field that exists for styling as if it were an identity. Permanent fix: ask the developer for a build-independent hook like `data-testid="edit-bug-{id}"`. Java analogy: like checking equality based on a nesne\'s `toString()` output — the relationship breaks when the format changes, whereas you should have bound to a fixed identity (id) field.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir "New Bug" modalı `{isOpen && <Modal/>}` ile render ediliyor. Bir tester butona tıklamadan önce Modal\'ı locate etmeye çalışıp NoSuchElement alıyor. Bu bir uygulama hatası mı?', en: 'A "New Bug" modal is rendered with `{isOpen && <Modal/>}`. A tester tries to locate the Modal before clicking the button and gets NoSuchElement. Is this an application bug?' },
            a: { tr: 'Hayır, bu bir TEST hatasıdır (eksik adım) — `isOpen` false iken Modal DOM\'a hiç GİRMEZ, gizli değil, YOKTUR. Locate etmeden önce onu açan eylemi (butona tıklama) yapmak gerekir. Java analojisi: bir `if (isOpen) { new Modal(); }` bloğunun çalışmamış olması gibi — nesne YARATILMAMIŞTIR, "bozuk" değildir; koşul henüz sağlanmamıştır.', en: 'No, this is a TEST error (a missing step) — while `isOpen` is false the Modal never ENTERS the DOM, it is not hidden, it is ABSENT. You must perform the action that opens it (clicking the button) before locating. Java analogy: like an `if (isOpen) { new Modal(); }` block not having run — the object was NOT CREATED, it is not "broken"; the condition simply has not been met yet.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir developer bir `<div onclick="submit()">Kaydet</div>` yazmış ve "tıklanıyor, sorun ne?" diyor. Locator ve erişilebilirlik açısından ne eksik?', en: 'A developer wrote a `<div onclick="submit()">Save</div>` and says "it is clickable, what is the problem?" What is missing in terms of locator and accessibility?' },
            a: { tr: '`<div>` accessibility tree\'de "generic" bir role\'e sahiptir — `getByRole(\'button\')` onu bulamaz ve klavye kullanıcısı Tab ile oraya gelip Enter\'la tetikleyemez. Gerçek bir `<button>` bu ikisini de OTOMATİK olarak bedava sağlar. Java analojisi: `<button>` tarayıcının "Clickable" arayüzünü implement eder, `<div>` etmez — her metodu (tabindex, role, keydown) elle yeniden yazman gerekir.', en: 'A `<div>` has a "generic" role in the accessibility tree — `getByRole(\'button\')` cannot find it, and a keyboard user cannot Tab to it and trigger it with Enter. A real `<button>` provides both AUTOMATICALLY for free. Java analogy: `<button>` implements the browser\'s "Clickable" interface, `<div>` does not — you must rewrite every method (tabindex, role, keydown) by hand.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir tester "id her zaman benzersizdir, o zaman her zaman güvenle locate edilir" diyor. Bu iddiadaki eksik nedir?', en: 'A tester says "an id is always unique, so it can always be safely located". What is missing from this claim?' },
            a: { tr: 'Benzersizlik ile KALICILIK farklı şeylerdir — bir id sayfa her yüklendiğinde farklı bir değer (UUID, sayaç) üretiyorsa, dünkü test bugün o id\'yi bulamaz. Sabit/stabil bir id GÜVENLİDİR, dinamik üretilen bir id ise değildir. Java analojisi: bir HashMap anahtarının benzersiz olması, o anahtarın YARIN da aynı kalacağını garanti etmez — anahtar üretim mantığına bakman gerekir.', en: 'Uniqueness and PERMANENCE are different things — if an id produces a different value (a UUID, a counter) on every page load, yesterday\'s test cannot find that id today. A fixed/stable id is SAFE, a dynamically generated one is not. Java analogy: a HashMap key being unique does not guarantee that key will be the SAME tomorrow — you need to look at the key generation logic.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir formda `<label for="reporter">Bildiren</label>` ve `<input id="reporterEmail">` var (id\'ler uyuşmuyor). Bu neden hem bir erişilebilirlik hem bir locator sorunudur?', en: 'A form has `<label for="reporter">Reporter</label>` and `<input id="reporterEmail">` (the ids do not match). Why is this both an accessibility and a locator problem?' },
            a: { tr: '`for`/`id` eşleşmediği için label\'a tıklamak input\'u odaklamaz (erişilebilirlik kaybı) VE `getByLabel(\'Bildiren\')` bu input\'u bulamaz (locator kaybı) — sayfa görsel olarak AYNI görünür, sorun sessizdir. Java analojisi: bir foreign key\'in referans verdiği primary key\'in adı değişince veritabanı ilişkisinin sessizce kopması gibi — hiçbir compile-time hata yok, sadece runtime\'da bağlantı bulunamıyor.', en: 'Because `for`/`id` do not match, clicking the label does not focus the input (an accessibility loss) AND `getByLabel(\'Reporter\')` cannot find this input (a locator loss) — the page looks visually IDENTICAL, the problem is silent. Java analogy: like a database relationship silently breaking when the primary key a foreign key references gets renamed — no compile-time error, the connection is just not found at runtime.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir buton `class="px-3 py-2 bg-blue-500 rounded"` (Tailwind) taşıyor ve sayfada 12 benzer buton var. `page.locator(\'.bg-blue-500\')` yazan bir test ne ile karşılaşır?', en: 'A button has `class="px-3 py-2 bg-blue-500 rounded"` (Tailwind) and there are 12 similar buttons on the page. What does a test written as `page.locator(\'.bg-blue-500\')` encounter?' },
            a: { tr: '12 eleman eşleşir ve modern araçlar (Playwright strict mode) bunu bir hata olarak fırlatır çünkü hangisinin kastedildiği belirsizdir — utility class\'lar PAYLAŞIMLI tasarım kararlarıdır, kimlik değil. Java analojisi: bir dizide aynı `enum` değerini taşıyan birden çok nesneden TEK birini bu değere göre ayırt etmeye çalışmak gibi — enum bir kategori, bir kimlik DEĞİLDİR.', en: '12 elements match, and modern tools (Playwright strict mode) throw this as an error because which one you meant is ambiguous — utility classes are SHARED design decisions, not identity. Java analogy: like trying to distinguish ONE object from several sharing the same `enum` value in an array by that value — an enum is a category, NOT an identity.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir BugCard listesi `.map()` ile render ediliyor ve her `<li>` bir `key={bug.id}` taşıyor. Bir tester `page.locator(\'[key="42"]\')` yazıyor ve hiçbir şey bulamıyor. Neden?', en: 'A BugCard list is rendered with `.map()` and every `<li>` has a `key={bug.id}`. A tester writes `page.locator(\'[key="42"]\')` and finds nothing. Why?' },
            a: { tr: '`key`, React DevTools gibi ARAÇLARDA görünse de, tarayıcının gerçek DOM\'unda bir attribute olarak YAZILMAZ — sadece React\'in iç reconciliation mekanizmasında kullanılır. Java analojisi: bir koleksiyonun iç index\'i (ArrayList\'in dahili dizisi) gibi — programın davranışını etkiler ama dışarıdan/API üzerinden ERİŞİLEBİLİR değildir.', en: 'Even though `key` is visible in TOOLS like React DevTools, it is NEVER written as an attribute in the browser\'s real DOM — it is used only internally by React\'s reconciliation mechanism. Java analogy: like a collection\'s internal index (an ArrayList\'s internal array) — it affects the program\'s behavior but is not ACCESSIBLE from outside/via an API.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir Angular component\'inde bir bug var. `bug-form.component.ts`\'de `onSubmit()` metodu doğru yazılmış. Sıradaki adımın ne olmalı, React\'e kıyasla neden bu ekstra bir adım?', en: 'There is a bug in an Angular component. The `onSubmit()` method is written correctly in `bug-form.component.ts`. What should your next step be, and why is this an extra step compared to React?' },
            a: { tr: '`.html` template\'ini kontrol etmeliyim — buton `(click)="onSubmit()"` ile GERÇEKTEN bu metoda bağlı mı? Angular mantığı (`.ts`) ve görünümü (`.html`) AYRI dosyalara böler, React ise genelde TEK bir JSX dosyasında tutar — bu yüzden Angular\'da iki dosyaya bakmak GEREKİR, React\'te genelde tek dosya yeterlidir. Java analojisi: eski Servlet (mantık) + JSP (görünüm) ayrımı gibi.', en: 'I should check the `.html` template — is the button REALLY bound to this method with `(click)="onSubmit()"`? Angular splits logic (`.ts`) and view (`.html`) into SEPARATE files, while React usually keeps both in a SINGLE JSX file — this is why checking two files is REQUIRED in Angular, while one file is usually enough in React. Java analogy: like the old Servlet (logic) + JSP (view) separation.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir tester DevTools\'ta bir Angular elementinde `_ngcontent-abc-5` attribute\'unu görüyor. Bu attribute\'u locate etmek neden kötü bir fikir?', en: 'A tester sees a `_ngcontent-abc-5` attribute on an Angular element in DevTools. Why is locating by this attribute a bad idea?' },
            a: { tr: 'Bu attribute Angular\'ın ViewEncapsulation (stil izolasyonu) için OTOMATİK ürettiği bir değerdir, developer YAZMAZ — component compile/instance\'ına göre değişebilir, tıpkı bir CSS Modules hash\'i gibi. Java analojisi: derleyicinin ürettiği anonim iç sınıf isimleri (`Outer$1`) gibi — kaynakta yazılmaz, güvenilir bir referans değildir.', en: 'This attribute is a value Angular AUTOMATICALLY generates for ViewEncapsulation (style isolation), the developer does NOT write it — it can change based on the component compile/instance, just like a CSS Modules hash. Java analogy: like the anonymous inner class names the compiler generates (`Outer$1`) — not written in the source, not a reliable reference.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir SSR sayfasında "New Bug" butonu HTML\'de görünüyor ama sayfa açılır açılmaz tıklandığında hiçbir şey olmuyor, 300ms sonra çalışıyor. Bu ne ile açıklanır?', en: 'On an SSR page, the "New Bug" button is visible in the HTML but nothing happens when clicked right as the page opens, and it works 300ms later. What explains this?' },
            a: { tr: 'Bu klasik bir hydration penceresidir — HTML SSR ile hazır gelir ama JS bundle henüz hydrate OLMADIĞI için event listener bağlı değildir; hydration bitince (JS "can verince") aynı buton çalışmaya başlar. Java analojisi: bir nesnenin constructor\'ı çalışıp alanları set edilmiş ama henüz bir listener\'a KAYDEDİLMEMİŞ olması gibi — nesne "var" ama sistemin aktif bir parçası değildir.', en: 'This is the classic hydration window — the HTML arrives ready via SSR, but because the JS bundle has not hydrated YET the event listener is not attached; once hydration finishes (JS "brings it to life") the same button starts working. Java analogy: like an object whose constructor has run and fields are set, but it has not yet been REGISTERED with a listener — the object "exists" but is not an active part of the system.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir tester "New Bug" formunu gönderiyor ve Toast bildirimi görünmüyor. Network panelinde `POST /api/v1/bugs` satırı "(failed) net::ERR_CONNECTION_REFUSED" gösteriyor. Bu neyi işaret eder?', en: 'A tester submits the "New Bug" form and the Toast notification does not appear. The Network panel shows `POST /api/v1/bugs` as "(failed) net::ERR_CONNECTION_REFUSED". What does this indicate?' },
            a: { tr: 'İstek sunucuya hiç ULAŞAMADI (bir status kodu bile yok) — bu bir render/JS hatası değil, bağlantı/altyapı seviyesinde bir sorundur (sunucu kapalı, yanlış port). Java analojisi: `HttpURLConnection` ile bir soket bağlantısı kurulamaması (ConnectException) gibi — istek hiç gönderilememiştir, sunucunun mantığıyla ilgisi yoktur.', en: 'The request NEVER REACHED the server (there is not even a status code) — this is not a render/JS error, it is a connection/infrastructure-level problem (the server is down, the wrong port). Java analogy: like failing to establish a socket connection with `HttpURLConnection` (a ConnectException) — the request was never even sent, unrelated to the server\'s logic.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir tester bir BugCard\'a `:hover` ile görünen bir tooltip\'i test etmesi gerekiyor ve `page.locator(\':hover\')` yazmayı deniyor. Bu neden çalışmaz, doğru yaklaşım ne?', en: 'A tester needs to test a tooltip that appears via `:hover` on a BugCard and tries writing `page.locator(\':hover\')`. Why does this not work, and what is the right approach?' },
            a: { tr: '`:hover` bir DOM elementi değil, bir elementin ANLIK DURUMUDUR — locate edilecek bir node yoktur. Doğru yaklaşım: karta `hover()` çağırarak durumu TETİKLEMEK, sonra gerçek bir DOM elementinin (tooltip `<div>`) görünür olduğunu doğrulamak. Java analojisi: bir nesnenin `isActive()` metodunun anlık `true` dönmesi gibi — "isActive()\'ı locate et" demek anlamsızdır, "nesneyi bul, sonra kontrol et" anlamlıdır.', en: '`:hover` is not a DOM element, it is an element\'s MOMENTARY STATE — there is no node to locate. The right approach: TRIGGER the state by calling `hover()` on the card, then verify a real DOM element (a tooltip `<div>`) has become visible. Java analogy: like a nesne\'s `isActive()` method momentarily returning `true` — saying "locate isActive()" is meaningless, "find the object, then check" makes sense.' },
          },
          {
            level: 'basic',
            q: { tr: 'Bir developer "data-testid eklersek bundle boyutu büyür, performans etkilenir" diyor. Bu endişeye teknik olarak doğru cevap nedir?', en: 'A developer says "if we add data-testid, the bundle size grows, performance is affected". What is the technically correct response to this concern?' },
            a: { tr: 'Bir string attribute eklemek ölçülemeyecek kadar küçük bir maliyettir — gerçek performans sorunları (büyük dependency\'ler, optimize edilmemiş re-render) tamamen farklı bir konudur, bu endişe genelde bir savunma refleksidir. Java analojisi: bir sınıfa `@VisibleForTesting` gibi bir annotation eklemek kadar düşük riskli bir değişikliktir — iş mantığını veya performansı etkilemez.', en: 'Adding a string attribute is an immeasurably small cost — real performance issues (large dependencies, unoptimized re-renders) are a completely different topic, this concern is usually a defensive reflex. Java analogy: as low-risk a change as adding an annotation like `@VisibleForTesting` to a class — it does not affect business logic or performance.' },
          },

          // ══════════════════ INTERMEDIATE (20) ══════════════════
          {
            level: 'intermediate',
            q: { tr: 'BugCard listesine yeni bir bug ekleniyor ve kartlar bir sıra kayıyor. `page.locator(\'li\').nth(2)` yazan bir test bazen yanlış kartı işliyor ama hata VERMİYOR. Bu neden hash class hatasından daha tehlikeli?', en: 'A new bug is added to the BugCard list and cards shift by one. A test written as `page.locator(\'li\').nth(2)` sometimes processes the wrong card but does NOT error. Why is this more dangerous than a hash class error?' },
            a: { tr: 'Hash class kırıldığında test AÇIK bir hata (0 eleman) verir ve fark edilir; index kırıldığında ise eleman YİNE bulunur — sadece YANLIŞ olanı, test "yeşil" görünür ama üretimde yanlış bug işlenir. Java analojisi: bir listede `.get(2)` ile bir öğeye erişip listenin sırası değiştiğini fark etmemek gibi — exception fırlatmaz, sessizce yanlış veriyle devam eder.', en: 'When a hash class breaks, the test gives an OBVIOUS error (0 elements) and is noticed; when an index breaks, an element is STILL found — just the WRONG one, the test looks "green" but the wrong bug is processed in production. Java analogy: like accessing an item with `.get(2)` in a list without noticing the list\'s order changed — no exception is thrown, it silently continues with the wrong data.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir test "modal Kaydet" butonuna `waitForSelector(..., {state:\'attached\'})` ile bekleyip tıklıyor ama bazen "ElementNotInteractable" hatası alıyor. Kök neden nedir?', en: 'A test waits for the modal\'s "Save" button with `waitForSelector(..., {state:\'attached\'})` before clicking, but sometimes gets an "ElementNotInteractable" error. What is the root cause?' },
            a: { tr: '`attached` sadece DOM varlığını doğrular; element `display:none` iken bile bu true döner çünkü DOM varlığı ile Render Tree varlığı FARKLI şeylerdir. Tıklanabilirlik için `visible` durumu beklenmeliydi. Java analojisi: bir nesnenin bellekte var olması (DOM) ile UI thread\'inde çizilmiş olması (render tree) arasındaki fark gibi.', en: '`attached` only confirms DOM presence; this returns true even while the element is `display:none`, because DOM presence and Render Tree presence are DIFFERENT things. The `visible` state should have been awaited for clickability. Java analogy: like the difference between an object existing in memory (the DOM) and having been drawn on the UI thread (the render tree).' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir developer "biz hash\'i sabitlemek için webpack\'te localIdentName\'i değiştirdik, class isimleri artık sabit" diyor. Tester\'ın yaklaşımı değişmeli mi?', en: 'A developer says "we changed localIdentName in webpack to fix the hash, class names are now stable". Should the tester\'s approach change?' },
            a: { tr: 'Hayır — config ile hash\'i sabitlemek TEKNİK olarak mümkündür ama class hâlâ AMACI itibariyle stildir; bir tasarım güncellemesinde isim değişebilir veya config geri alınabilir. `data-testid` yine de tercih edilmelidir çünkü kimlik taşıma AMACIYLA var olan tek alandır. Java analojisi: bir alanı `final` yapmak onu bir "iş anahtarı" (business key) yapmaz — amacına bakman gerekir.', en: 'No — fixing the hash via config is TECHNICALLY possible, but the class is still styling BY PURPOSE; the name can change in a design update or the config could be reverted. `data-testid` should still be preferred because it is the only field that exists FOR THE PURPOSE of carrying identity. Java analogy: making a field `final` does not make it a "business key" — you need to look at its purpose.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir Badge component\'i styled-components ile yazılmış ve `severity` prop\'una göre `class="sc-bdfBwQ kxYz"` gibi farklı ikinci bir class parçası üretiyor. Bu neden CSS Modules hash\'inden bile daha riskli?', en: 'A Badge component is written with styled-components and produces a different second class token like `class="sc-bdfBwQ kxYz"` based on the `severity` prop. Why is this even riskier than a CSS Modules hash?' },
            a: { tr: 'CSS Modules hash\'i BUILD zamanında bir kez üretilir; styled-components class\'ı ise RUNTIME\'da, prop kombinasyonuna göre AYNI build içinde bile farklılaşabilir — aynı component\'in iki örneği farklı class taşıyabilir. Java analojisi: her çağrıda farklı değer üreten, override edilmemiş bir `Object.hashCode()`\'a güvenmek gibi.', en: 'A CSS Modules hash is generated once at BUILD time; a styled-components class is generated at RUNTIME and can differ based on the prop combination even WITHIN the same build — two instances of the same component can carry different classes. Java analogy: like relying on an unoverridden `Object.hashCode()` that produces a different value on every call.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir developer `newCard = document.createElement(\'li\')` satırını çalıştırdı ama `appendChild` satırına henüz gelmedi. Bu anda locate denemesi ne ile sonuçlanır ve neden?', en: 'A developer ran `newCard = document.createElement(\'li\')` but has not reached the `appendChild` line yet. What does a locate attempt at this moment result in, and why?' },
            a: { tr: 'Locate BAŞARISIZ olur çünkü `createElement` sadece bellekte bir node oluşturur — DOM ağacına eklenmesi `appendChild` ile AYRI bir adımdır. Bu iki adım arasında element "var ama görünmez/bulunamaz" durumdadır. Java analojisi: `new Foo()` ile bir nesne yaratmak (createElement) ile onu bir koleksiyona `list.add(foo)` ile eklemek (appendChild) arasındaki fark gibi.', en: 'Locating FAILS because `createElement` only creates a node in memory — adding it to the DOM tree is a SEPARATE step via `appendChild`. Between these two steps the element "exists but is invisible/unfindable". Java analogy: like the difference between creating a nesne with `new Foo()` (createElement) and adding it to a collection with `list.add(foo)` (appendChild).' },
          },
          {
            level: 'intermediate',
            q: { tr: '"Daha Fazla Yükle" butonuna basınca 5 yeni kart 500ms-2s arası değişen bir sürede ekleniyor. `page.waitForTimeout(2000)` yerine ne önerirsin, neden?', en: 'Clicking "Load More" adds 5 new cards in a variable time of 500ms-2s. What do you recommend instead of `page.waitForTimeout(2000)`, and why?' },
            a: { tr: '`await expect(page.locator(\'li\')).toHaveCount(N)` gibi koşullu bir assertion — bu, mutasyonun GERÇEKTEN bittiğini garanti eder ve ağ hızından bağımsız çalışır; sabit süre yavaş günde yetmez, hızlı günde gereksiz bekletir. Java analojisi: `Thread.sleep()` yerine bir `CountDownLatch`/`CompletableFuture.get()` ile GERÇEK bir olayı beklemek gibi.', en: 'A conditional assertion like `await expect(page.locator(\'li\')).toHaveCount(N)` — this guarantees the mutation has REALLY finished and works independent of network speed; a fixed duration is not enough on a slow day and wastes time on a fast one. Java analogy: like waiting for a REAL event with a `CountDownLatch`/`CompletableFuture.get()` instead of `Thread.sleep()`.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir developer, tek bir click listener\'ı `<ul>`\'ye ekleyip tıklanan elementin `data-bug-id`\'sini `event.target.closest(\'li\')` ile okuyor (event delegation). Bu `data-*` attribute\'u neden test-only bir data-testid\'den bile daha dayanıklı?', en: 'A developer attaches a single click listener to `<ul>` and reads the clicked element\'s `data-bug-id` via `event.target.closest(\'li\')` (event delegation). Why is this `data-*` attribute even more durable than a test-only data-testid?' },
            a: { tr: 'Bu attribute uygulamanın KENDİ tıklama mantığının bel bağladığı bir alandır — silinirse test değil, uygulamanın kendisi bozulur, bu da onu silinmeye karşı daha dayanıklı kılar. Java analojisi: bir HashMap\'in anahtarı gibi — iş mantığının kendisi için var, "debug için" değil.', en: 'This attribute is a field the app\'s OWN click logic relies on — if removed, the app itself breaks, not just the test, which makes it more resistant to removal. Java analogy: like a HashMap\'s key — it exists for the business logic itself, not "for debugging".' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bug Tracker sayfası CSR ile çalışıyor. Sayfa açılır açılmaz BugCard\'ları locate etmeye çalışan bir test için doğru yaklaşım nedir, SSR\'dan farkı ne?', en: 'The Bug Tracker page runs with CSR. What is the correct approach for a test locating BugCards right as the page opens, and how does it differ from SSR?' },
            a: { tr: 'CSR\'da ilk HTML boştur, fetch+state+re-render zincirinin bitmesini koşullu beklemek gerekir; SSR\'da ise HTML ilk yanıtta hazırdır ama JS\'in hydrate olmasını beklemek gerekebilir — iki BEKLEME MEKANİZMASI birbirinden farklıdır. Java analojisi: bir view\'ın her istekte sunucuda render edildiği (SSR\'a benzer) ile bir SPA\'nın tamamen client-side JS ile kurulması (CSR) arasındaki fark gibi.', en: 'In CSR the initial HTML is empty, you must conditionally wait for the fetch+state+re-render chain to finish; in SSR the HTML is ready in the first response, but you may need to wait for JS to hydrate — the two WAIT MECHANISMS are different from each other. Java analogy: like the difference between a view rendered on the server on every request (similar to SSR) and a SPA built entirely with client-side JS (CSR).' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir developer "biz bu sinsi hydration bug\'ını önlemek için butona data-hydrated=\'true\' işareti ekledik" diyor. Bir tester bunu nasıl kullanır?', en: 'A developer says "we added a data-hydrated=\'true\' marker on the button to prevent this sneaky hydration bug". How does a tester use this?' },
            a: { tr: 'Tıklamadan önce bu attribute\'un "true" olmasını BEKLEMELİDİR — bu, görünürlüğün tek başına garanti etmediği "hydration bitti" bilgisini SAĞLAYAN açık bir sinyaldir. Java analojisi: bir kaynağın (dosya, bağlantı) `isReady()` gibi bir kontrolünü, varsayım yapmadan ÖNCE çağırmak gibi.', en: 'They should WAIT for this attribute to become "true" before clicking — this is an explicit signal PROVIDING the "hydration finished" information that visibility alone does not guarantee. Java analogy: like calling a resource\'s (a file, a connection) `isReady()` check BEFORE assuming, instead of guessing.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir tester sadece "BugCard listesi başarıyla yükleniyor mu?" senaryosunu test ediyor. Hangi gerçek production bug\'ını kaçırma riski en yüksek, neden?', en: 'A tester only tests the "does the BugCard list load successfully?" scenario. Which real production bug are they at highest risk of missing, and why?' },
            a: { tr: 'Sunucu 500 döndüğünde hata mesajının hiç görünmeyip spinner\'ın SONSUZA kadar dönmesi — çünkü Error state hiç kodlanmamış veya tetiklenmemiş olabilir; sadece "happy path" testi bu 3 durumdan (loading/error/empty) 2\'sini hiç doğrulamaz. Java analojisi: bir metodun sadece başarı yolunu test edip exception/boş durumları atlamak gibi — kapsam eksik kalır.', en: 'The error message never appearing and the spinner spinning FOREVER when the server returns 500 — because the Error state may never have been coded or triggered; testing only the "happy path" never verifies 2 of these 3 states (loading/error/empty) at all. Java analogy: like testing only a method\'s success path and skipping the exception/empty cases — coverage stays incomplete.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir BugCard\'a tıklayınca sadece o kart genişliyor, diğerleri etkilenmiyor. Bu prop değişikliği mi state değişikliği midir, nasıl ayırt edersin?', en: 'Clicking a BugCard expands only that card, others are unaffected. Is this a prop change or a state change, and how do you tell?' },
            a: { tr: 'State değişikliğidir — her BugCard kendi `isExpanded` state\'ini yönetir, bu yüzden sadece TIKLANAN kart etkilenir; bir prop değişikliği tüm kardeş component\'leri AYNI ANDA etkilerdi. Java analojisi: bir metot parametresinin (prop, çağıran taraf verir) değil, nesnenin kendi instance field\'ının (state, nesne kendi değiştirir) değişmesi gibi.', en: 'It is a state change — each BugCard manages its own `isExpanded` state, so only the CLICKED card is affected; a prop change would affect ALL sibling components at ONCE. Java analogy: like an object\'s own instance field (state, the object changes it itself) changing, not a method parameter (a prop, the caller provides it).' },
          },
          {
            level: 'intermediate',
            q: { tr: '`{bugCount && <span>{bugCount} bug bulundu</span>}` (`> 0` karşılaştırması OLMADAN) yazılmış ve `bugCount` `0`. Ekranda ne görürsün, neden?', en: '`{bugCount && <span>{bugCount} bugs found</span>}` is written (WITHOUT a `> 0` comparison) and `bugCount` is `0`. What do you see on screen, and why?' },
            a: { tr: 'Ekranda YALNIZ BAŞINA bir "0" belirir — çünkü `0 && ...` sayısal `0`\'a eşitlenir ve React `false`/`null`\'ın aksine sayıları RENDER EDER. Bu, koşullu render\'da açık bir boolean karşılaştırma (`bugCount > 0 &&`) kullanmanın önemini gösterir. Java analojisi: bir `if(count)` yerine `if(count != 0)` yazmanın açıklığı gibi.', en: 'A standalone "0" appears on screen — because `0 && ...` evaluates to the number `0`, and React DOES render numbers, unlike `false`/`null`. This shows the importance of using an explicit boolean comparison (`bugCount > 0 &&`) in conditional rendering. Java analogy: like the clarity of writing `if(count != 0)` instead of `if(count)`.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'React\'te `*ngFor`\'daki `trackBy` ile `.map()`\'teki `key` arasındaki ortak nokta nedir ve neden ikisi de locator olamaz?', en: 'What is common between Angular\'s `*ngFor` `trackBy` and React\'s `.map()` `key`, and why can neither be used as a locator?' },
            a: { tr: 'İkisi de framework\'ün hangi liste öğesinin hangi DOM node\'una karşılık geldiğini İÇ OLARAK takip etmesini sağlar; DOM\'da bir attribute olarak YAZILMAZLAR, bu yüzden ikisi de bir locator DEĞİLDİR. Java analojisi: bir koleksiyonun iç index\'i gibi — davranışı etkiler ama dışarıdan erişilebilir değildir.', en: 'Both let the framework INTERNALLY track which list item corresponds to which DOM node; neither is WRITTEN as a DOM attribute, so neither is a locator. Java analogy: like a collection\'s internal index — it affects behavior but is not externally accessible.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir developer "data-testid eklemek için `{{ }}` interpolation kullanacağım: `data-testid="{{ \'bug-card-\' + bug.id }}"`" diyor Angular\'da. Bu neden ideal değil, ne önerirsin?', en: 'A developer says in Angular "I will use `{{ }}` interpolation to add data-testid: `data-testid="{{ \'bug-card-\' + bug.id }}"`". Why is this not ideal, what do you recommend?' },
            a: { tr: 'Interpolation temel olarak metin İÇERİĞİ içindir, attribute değeri için değil; dinamik attribute binding\'i için Angular\'ın önerdiği güvenilir yol `[attr.data-testid]="\'bug-card-\' + bug.id"` binding\'idir. Java analojisi: string birleştirmeyle bir değer atamak yerine, tip-güvenli bir binding API\'si kullanmak gibi.', en: 'Interpolation is fundamentally for text CONTENT, not attribute values; the reliable way Angular recommends for dynamic attribute binding is the `[attr.data-testid]="\'bug-card-\' + bug.id"` binding. Java analogy: like using a type-safe binding API instead of assigning a value via string concatenation.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir PR\'da yeni bir `.map()`/`.*ngFor` liste render\'ı görüyorsun ve her satırın sadece bir key/trackBy\'a sahip olduğunu, benzersiz bir data-id OLMADIĞINI fark ediyorsun. Ne yorumu yaparsın?', en: 'You see a new `.map()`/`*ngFor` list render in a PR and notice each row only has a key/trackBy, with NO unique data-id. What comment do you make?' },
            a: { tr: '"Her satıra benzersiz bir data-id/data-testid eklenebilir mi? key/trackBy DOM\'da görünmüyor ve locator olarak kullanılamıyor, index\'e bel bağlamak zorunda kalırım" — bu, merge OLMADAN ÖNCE ucuz bir düzeltmedir, aylar sonra fark etmekten çok daha ucuz. Java analojisi: bir code review\'da "bu metot null kontrolü yapmıyor, satır 42\'de NPE riski var" gibi SPESİFİK geri bildirim vermek gibi.', en: '"Could a unique data-id/data-testid be added to each row? key/trackBy does not appear in the DOM and cannot be used as a locator, I would have to rely on an index" — this is a cheap fix BEFORE the merge, much cheaper than noticing it months later. Java analogy: like giving SPECIFIC feedback in a code review, such as "this method does not null-check, there is an NPE risk on line 42".' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir tester DevTools\'ta "Copy selector" ile `body > div:nth-child(2) > ul > li:nth-child(3) > button` çıktısını alıyor. Bu neden bir başlangıç noktası ama son cevap değildir?', en: 'A tester copies `body > div:nth-child(2) > ul > li:nth-child(3) > button` using "Copy selector" in DevTools. Why is this a starting point but not the final answer?' },
            a: { tr: 'Bu yol DOM\'un TAM o anki şekline (ata zinciri + nth-child) bağlıdır — bir tek `<div>` araya girse veya sıra değişse ANINDA kırılır; attribute panelinde bir `data-testid`/`aria-label` görüyorsa onu tercih etmelidir. Java analojisi: bir bellek adresine (referansa) göre eşitlik yapmak gibi — çalışır ama GC\'den sonra o adres BAŞKA bir nesneye ait olabilir.', en: 'This path depends on the DOM\'s EXACT current shape (ancestor chain + nth-child) — one extra `<div>` or a reorder breaks it INSTANTLY; if a `data-testid`/`aria-label` is visible in the attribute panel, it should be preferred. Java analogy: like equating by a memory address (a reference) — it works, but after GC that address might belong to a DIFFERENT object.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir tabloda `data-severity="HIGH"` gibi bir attribute selector\'ı ile `severity-high` gibi bir class selector\'ı arasında hangisi genelde daha güvenilirdir, neden?', en: 'In a table, between an attribute selector like `data-severity="HIGH"` and a class selector like `severity-high`, which is generally more reliable, and why?' },
            a: { tr: 'Attribute selector daha güvenilirdir — `data-*` genelde bir İŞ DEĞERİNİ yansıtır ve tasarım değişikliklerinden etkilenmez, `class` ise stil amaçlıdır ve tasarım güncellemesinde adı değişebilir. Java analojisi: bir nesnenin `equals()`/`hashCode()` için kullandığı alanı seçmek gibi — kararlı olmayan bir alan seçersen ilişki bozulur.', en: 'The attribute selector is more reliable — `data-*` usually reflects a BUSINESS VALUE and is unaffected by design changes, while `class` exists for styling and its name can change in a design update. Java analogy: like choosing which field to use for a nesne\'s `equals()`/`hashCode()` — pick an unstable field and the relationship breaks.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir tester "getByText her zaman en dayanıklı locator\'dır çünkü en okunabilir" diyor. Bu neden yanlış bir genelleme?', en: 'A tester says "getByText is always the most durable locator because it is the most readable". Why is this a wrong generalization?' },
            a: { tr: 'Okunabilirlik ile dayanıklılık FARKLI kavramlardır — text locator\'ı i18n\'de (dil TR\'den EN\'e geçince) veya developer metni güncellediğinde kırılır; `data-testid`/`role` bu ikisinden de bağımsızdır. Java analojisi: kısa/okunabilir bir kod satırının her zaman en verimli/güvenli OLMADIĞI gibi — okunabilirlik ayrı bir eksen, dayanıklılık ayrı bir eksendir.', en: 'Readability and durability are DIFFERENT concepts — a text locator breaks under i18n (when the language switches from TR to EN) or when the developer updates the text; `data-testid`/`role` are independent of both. Java analogy: like a short/readable line of code not always being the most efficient/safe — readability is one axis, durability is another.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir bug raporunda "UI\'da her şey başarılı görünüyor ama backend\'de kayıt oluşmamış" yazıyor. Bu senaryoyu Network paneli nasıl çürütür?', en: 'A bug report says "everything looks successful in the UI but no record was created in the backend". How does the Network panel disprove this scenario?' },
            a: { tr: 'UI mesajları developer\'ın YAZDIĞI metindir, sunucunun GERÇEK cevabı değildir — hata durumu (catch bloğu) yanlış yazılmışsa UI "başarılı" der ama Network paneli sunucunun aslında 500 döndüğünü gösterir. Java analojisi: bir `try/catch` bloğunda hatayı sessizce yutup kullanıcıya sahte bir başarı mesajı göstermek gibi — hata gerçekten olur ama hiçbir yere loglanmaz.', en: 'UI messages are text the developer WROTE, not the server\'s REAL answer — if the error case (the catch block) is written incorrectly, the UI says "success" while the Network panel shows the server actually returned 500. Java analogy: like silently swallowing an error in a `try/catch` block and showing the user a fake success message — the error really happens but is never logged anywhere.' },
          },
          {
            level: 'intermediate',
            q: { tr: 'Bir web component `<severity-picker>` içindeki bir `<option>`\'ı `page.locator(\'option\')` ile bulamıyorsun ama element gözle görünüyor. Muhtemel açıklama nedir?', en: 'You cannot find an `<option>` inside a web component `<severity-picker>` with `page.locator(\'option\')`, but the element is visually present. What is the likely explanation?' },
            a: { tr: 'Element bir shadow DOM\'un içindedir ve normal bir selector bu sınırı OTOMATİK OLARAK geçemez — bu bir güvenlik/izolasyon özelliğidir, bir hata değildir; shadow-aware bir API (piercing selector) gerekir. Java analojisi: bir sınıfın `private` alanlarına dışarıdan doğrudan erişememek gibi — bir "getter" (context değiştirme API\'si) gerekir.', en: 'The element is inside a shadow DOM, and a normal selector cannot AUTOMATICALLY cross this boundary — this is a security/isolation feature, not a bug; a shadow-aware API (a piercing selector) is needed. Java analogy: like not being able to directly access a class\'s `private` fields from outside — you need a "getter" (a context-switching API).' },
          },

          // ══════════════════ ADVANCED (15) ══════════════════
          {
            level: 'advanced',
            q: { tr: 'Bir "Düzenle" butonuna 5 tester 5 farklı locator yazmış: XPath index, hash class, getByText, getByRole, getByTestId. Bir deploy (hash yenilenir + liste 1 sıra kayar) sonrası her biri ne olur, hangisi EN TEHLİKELİ şekilde kırılır?', en: '5 testers wrote 5 different locators for the same "Edit" button: an XPath index, a hash class, getByText, getByRole, getByTestId. After a deploy (the hash regenerates + the list shifts by 1), what happens to each, and which breaks in the MOST DANGEROUS way?' },
            a: { tr: 'XPath index EN TEHLİKELİ şekilde kırılır — SESSİZCE yanlış bir bug\'ın butonuna işaret eder (test hata vermez ama yanlış bug\'ı düzenler). Hash class AÇIK bir hata (0 eleman) verir. getByText, getByRole ve getByTestId hayatta kalır ama getByText SADECE ŞANSLA (metin değişmedi) — dil değişse kırılırdı. Java analojisi: bir nesneyi bellek adresine göre eşitlemek (XPath) EN kırılgan, kimliğe (id) göre eşitlemek EN sağlam yaklaşımdır — arada geçici alanlara (class, metin) güvenmek riskli bir orta zemindir.', en: 'The XPath index breaks in the MOST DANGEROUS way — it SILENTLY points to the wrong bug\'s button (the test does not error but edits the wrong bug). The hash class gives an OBVIOUS error (0 elements). getByText, getByRole, and getByTestId survive, but getByText only survives BY LUCK (the text did not change) — it would break if the language changed. Java analogy: equating a nesne by its memory address (XPath) is the MOST fragile approach, equating by identity (id) is the MOST robust — trusting transient fields (class, text) in between is a risky middle ground.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir tester "auto-generated id\'ler her zaman benzersizdir, güvenle locate edilir" diyor ama bir hafta sonra test kırılıyor çünkü id her sayfa yüklemesinde farklı üretiliyormuş. Bu vaka nasıl önlenirdi?', en: 'A tester says "auto-generated ids are always unique, safely locatable", but a week later the test breaks because the id is generated differently on every page load. How could this case have been prevented?' },
            a: { tr: 'Benzersizlik ile KALICILIK ayrımını baştan yaparak: bir id\'nin sabit mi yoksa her yüklemede yeniden üretilen bir UUID/sayaç mı olduğunu DevTools\'ta sayfayı 2 kez yenileyip aynı id\'nin kalıp kalmadığını kontrol ederek doğrulamak gerekirdi. Java analojisi: bir HashMap anahtarının "bu istekte" benzersiz olması, "her istekte" aynı kalacağını garanti etmez — üretim mantığına bakılmalıydı.', en: 'By making the uniqueness vs. PERMANENCE distinction upfront: verifying in DevTools whether an id is fixed or a UUID/counter regenerated on every load, by refreshing the page twice and checking if the same id persists. Java analogy: a HashMap key being unique "in this request" does not guarantee it stays the same "in every request" — the generation logic should have been checked.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir "New Bug" formu bir üçüncü parti ödeme widget\'ı bir `<iframe>` içinde çalışıyor. Test bu iframe\'in içindeki bir input\'a yazamıyor. Adım adım nasıl çözersin?', en: 'A third-party payment widget in a "New Bug" form runs inside an `<iframe>`. The test cannot type into an input inside this iframe. How do you solve it step by step?' },
            a: { tr: 'Önce "bu içerik nerede yaşıyor?" diye sorarım (ana DOM\'da değil, iframe\'in AYRI `document`\'ında); sonra context\'i o frame\'e SWITCH ederim (`page.frameLocator(...)`), ANCAK bu yeni context içinde normal şekilde locate ederim. Java analojisi: bir class\'ın `private` alanlarına doğrudan erişemeyip, önce bir "getter" (context değiştirme API\'si) üzerinden geçmek gibi.', en: 'I first ask "where does this content live?" (not in the main DOM, but in the iframe\'s SEPARATE `document`); then I SWITCH context into that frame (`page.frameLocator(...)`), and ONLY THEN locate normally within that new context. Java analogy: like not being able to directly access a class\'s `private` fields, and instead first going through a "getter" (a context-switching API).' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir sprint planlamada "yeni filtreleme özelliği için test edilebilirliği bir kabul kriteri olarak ekleyelim" diyorsun. Bu, "bug bulunca data-testid iste" yaklaşımından neden DAHA OLGUN?', en: 'In sprint planning you say "let\'s add testability as an acceptance criterion for the new filtering feature". Why is this MORE MATURE than the "ask for a data-testid once a bug is found" approach?' },
            a: { tr: 'Reaktif yaklaşım feature YAZILDIKTAN ve bug bulunduktan sonra geriye dönük bir PR/refactor gerektirir; proaktif yaklaşım ise developer feature\'ı yazarken data-testid\'leri BAŞTAN ekler, ekstra maliyet SIFIRLANIR. Java analojisi: bir tasarımı yazıldıktan sonra refactor etmek yerine, tasarım aşamasında (design review) testability\'yi gözetmek gibi — erken müdahale her zaman ucuzdur.', en: 'The reactive approach requires a retroactive PR/refactor AFTER the feature is written and a bug is found; the proactive approach has the developer add data-testids UPFRONT while writing the feature, ZEROING OUT the extra cost. Java analogy: like considering testability during the design phase (a design review) instead of refactoring a design after it is written — early intervention is always cheaper.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir PR\'da bir class isminin (redesign nedeniyle) değiştiğini görüyorsun. Locator code review\'unda hangi soruyu sorarsın, neden bu soru kritik?', en: 'You see a class name change in a PR (due to a redesign). What question do you ask in the locator code review, and why is this question critical?' },
            a: { tr: '"Bu class\'a bağlı bilinen bir test var mı, data-testid\'ye taşınmalı mı?" — çünkü class değişikliği stil amaçlı yapılır ve developer bunun test tarafında bir bağımlılık olduğunu genelde BİLMEZ; bu soruyu PR aşamasında sormamak, merge sonrası SESSİZCE kırılan testler demektir. Java analojisi: bir public API imzasını değiştirmeden önce "bunu kimler kullanıyor?" diye sormak gibi.', en: '"Is there a known test bound to this class, should it move to data-testid?" — because a class change is made for styling and the developer usually does NOT KNOW there is a test-side dependency; not asking this at the PR stage means SILENTLY breaking tests after the merge. Java analogy: like asking "who uses this?" before changing a public API signature.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir tester\'a "flaky testin kökeni locator mı, timing mi (render/hydration) yoksa gerçek bir bug mı?" diye soruluyor. Bu üçünü nasıl AYIRT eder?', en: 'A tester is asked "is the root of a flaky test a locator, timing (render/hydration), or a real bug?" How do they DISTINGUISH between these three?' },
            a: { tr: 'Locator sorunu: aynı element farklı bir kanca ile HER ZAMAN bulunuyorsa (ör. data-testid ile). Timing sorunu: yeterli bir bekleme eklendiğinde test STABIL hale geliyorsa (render/hydration/fetch bitmemiş). Gerçek bug: bekleme ve locator düzeltilse bile davranış YANLIŞ kalıyorsa (ör. sunucu gerçekten 500 dönüyor). Java analojisi: bir NullPointerException\'ın "hangi referans null?" sorusuna cevap vermesi gibi — belirtiyi doğru kategoriye ayırmak çözümün YARISIDIR.', en: 'A locator problem: if the same element is ALWAYS found with a different hook (e.g. by data-testid). A timing problem: if the test becomes STABLE once a sufficient wait is added (render/hydration/fetch had not finished). A real bug: if the behavior stays WRONG even after fixing the wait and locator (e.g. the server really returns 500). Java analogy: like a NullPointerException answering "which reference is null?" — correctly categorizing the symptom is HALF the fix.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir binlerce satırlık tabloda her satırda `data-bug-id` var. `hasText` ile metin araması yerine hangi yaklaşım daha PERFORMANSLI ve daha az belirsiz olabilir, neden?', en: 'In a table with thousands of rows, each with a `data-bug-id`. Which approach might be more PERFORMANT and less ambiguous than a `hasText` text search, and why?' },
            a: { tr: '`[data-bug-id="42"]` gibi doğrudan bir kimlik attribute\'una eşitlik araması — metin araması bazen kısmi eşleşme verip belirsizlik yaratabilir ve büyük tablolarda göreceli yavaştır; kimlik eşleşmesi hem KESİN hem genelde HIZLIDIR. Java analojisi: bir listede `contains()` (string arama, O(n) ve belirsiz) yerine bir HashMap\'te `.get(key)` (kesin, O(1)) kullanmak gibi.', en: 'An exact-match search on a direct identity attribute like `[data-bug-id="42"]` — a text search can sometimes give a partial match creating ambiguity and is relatively slow on large tables; an identity match is both PRECISE and usually FAST. Java analogy: like using a HashMap\'s `.get(key)` (precise, O(1)) instead of `contains()` (a string search, O(n) and ambiguous) in a list.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir buton hem `aria-label="Bug\'ı sil"` HEM görünür metin "Sil" taşıyor. `getByRole(\'button\', {name:\'Sil\'})` çalışır mı? Bu senaryo neden bir "gizli tuzak"tır?', en: 'A button has BOTH `aria-label="Delete bug"` AND visible text "Delete". Does `getByRole(\'button\', {name:\'Delete\'})` work? Why is this scenario a "hidden trap"?' },
            a: { tr: 'Çalışmaz — `aria-label` accessible name hiyerarşisinde EN ÜSTTEDİR ve görünür metni EZER, bu yüzden accessible name "Bug\'ı sil" olur, "Sil" değil. Bu bir tuzaktır çünkü kod okuyan bir tester görünür metne bakıp yanlış bir isim varsayabilir — accessible name HESAPLAMA SIRASINI (aria-label > aria-labelledby > metin > alt/placeholder) bilmek gerekir.', en: 'It does not work — `aria-label` sits at the TOP of the accessible name hierarchy and OVERRIDES the visible text, so the accessible name becomes "Delete bug", not "Delete". This is a trap because a tester reading the code might look at the visible text and assume the wrong name — you need to know the accessible name COMPUTATION ORDER (aria-label > aria-labelledby > text > alt/placeholder).' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir React sayfasında bir Modal `{isOpen&&}` ile, bir Angular sayfasında AYNI davranış `*ngIf` ile yönetiliyor. Bir tester her ikisinde de AYNI teşhis refleksini nasıl uygular?', en: 'A Modal is managed with `{isOpen&&}` on a React page, and the SAME behavior with `*ngIf` on an Angular page. How does a tester apply the SAME diagnostic reflex to both?' },
            a: { tr: 'İkisinde de "koşul false iken element DOM\'da hiç yok mu, yoksa gizli mi?" sorusunu sorar ve ikisinde de CEVAP AYNIDIR: tamamen yok — bu yüzden önce koşulu tetikleyen eylemi yapar, sonra locate eder. Java analojisi: bir tasarım ilkesinin (SOLID gibi) diller arasında DEĞİŞMEMESİ gibi — sözdizimi değişir, kavram sabit kalır; framework FARK ETMEKSİZİN aynı strateji işe yarar.', en: 'In both, they ask "while the condition is false, is the element entirely absent from the DOM, or just hidden?" and the ANSWER is the SAME in both: entirely absent — so they first perform the action that triggers the condition, then locate. Java analogy: like a design principle (like SOLID) NOT CHANGING across languages — the syntax changes, the concept stays fixed; the same strategy works REGARDLESS of the framework.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir tester, bir React sayfasındaki `getByText(\'Düzenle\')` locator\'ının EN modunda kırılacağını ÖNCEDEN tahmin ediyor, henüz test çalışmadan. Bu tahmini nasıl yapar?', en: 'A tester PREDICTS that a `getByText(\'Edit\')` locator on a React page will break in EN mode, before the test even runs. How do they make this prediction?' },
            a: { tr: 'Metin locate\'inin dile bağlı olduğunu ve sayfa çok dilliyse (TR/EN toggle) bu metnin İngilizce modda "Edit" olacağını, dolayısıyla TR metnine bağlı bir locator\'ın orada eşleşmeyeceğini BİLEREK — bu, kaynağı okuyup DOM\'u zihinde canlandırma becerisidir. Java analojisi: bir metodun farklı bir Locale ile çağrıldığında farklı bir string döneceğini KOD OKUYARAK öngörmek gibi.', en: 'By KNOWING text locating is language-dependent and that if the page is multilingual (a TR/EN toggle) this text will be "Edit" in English mode, so a locator bound to the TR text will not match there — this is the skill of reading source and picturing the DOM in your mind. Java analogy: like PREDICTING, by reading code, that a method will return a different string when called with a different Locale.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir yeni tester "Copy selector kullanmayı öğrendim, artık locator yazmayı biliyorum" diyor. Bu düşüncedeki eksiği nasıl tamamlarsın?', en: 'A new tester says "I learned to use Copy selector, now I know how to write locators". How do you complete the gap in this thinking?' },
            a: { tr: 'Copy selector bir ARAÇTIR, bir BECERİ değildir — asıl beceri attribute panelini okuyup HANGİ alanın (data-testid, role, id, class) build/deploy/dilden bağımsız kalacağını DEĞERLENDİREBİLMEKTİR; bu ayrım tüm sayfa boyunca (GRUP C, F, G, H) tekrarlanan bir derstir. Java analojisi: bir IDE\'nin otomatik tamamlamasını kullanmayı bilmek ile hangi tasarım deseninin ne zaman doğru olduğunu ANLAMAK arasındaki fark gibi.', en: 'Copy selector is a TOOL, not a SKILL — the real skill is being able to read the attribute panel and EVALUATE which field (data-testid, role, id, class) will stay independent of build/deploy/language; this distinction is a lesson repeated throughout the page (GROUPS C, F, G, H). Java analogy: like the difference between knowing how to use an IDE\'s autocomplete and UNDERSTANDING which design pattern is correct when.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir Angular geliştirici "component\'imde `data-testid` binding\'i doğru yazılmış ama hiç DOM\'a girmiyor" diyor. `[attr.*]` binding\'i "yazılmış olmak" ile "gerçekten devrede olmak" arasında ne gibi bir boşluk yaratabilir?', en: 'An Angular developer says "the data-testid binding in my component is written correctly, but it never enters the DOM". What kind of gap can there be between an `[attr.*]` binding being "written" and "actually active"?' },
            a: { tr: 'Binding sözdizimi doğru olsa bile, bağlı olduğu değişken (ör. `bug.id`) component\'in o anki state\'inde `undefined`/`null` ise Angular attribute\'u HİÇ EKLEMEZ — "kod var" ile "kod gerçekten devrede" arasında bir boşluk oluşur. Java analojisi: bir decorator/annotation\'ın doğru yazılmış olması, çalışma zamanında GERÇEKTEN tetiklenmesini garanti etmez — bir framework\'ün onu doğru şekilde kaydettiğini de doğrulaman gerekir.', en: 'Even if the binding syntax is correct, if the variable it is bound to (e.g. `bug.id`) is `undefined`/`null` in the component\'s current state, Angular does NOT add the attribute AT ALL — a gap forms between "the code exists" and "the code is really active". Java analogy: a decorator/annotation being written correctly does not guarantee it is REALLY triggered at runtime — you also need to verify a framework registered it correctly.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir şirket yeni bir frontend takımı kuruyor ve senden "data-testid konvansiyonu" önermeni istiyor. Nasıl bir kural önerirsin ve bunu bir kabul kriteri haline nasıl getirirsin?', en: 'A company is starting a new frontend team and asks you to propose a "data-testid convention". What rule do you propose, and how do you turn it into an acceptance criterion?' },
            a: { tr: 'Kuralı somutlaştırırım: "her interaktif element (buton, input, satır) `data-testid="{component}-{action veya id}"` formatında bir kanca taşımalı" ve bunu PR şablonuna bir checklist maddesi olarak eklerim ("yeni interaktif eleman eklendi mi? data-testid var mı?"). Java analojisi: bir takımın kod stil rehberine (checkstyle/linter kuralı) bir "her public metot Javadoc taşımalı" kuralı eklemek gibi — kural somut, otomatik denetlenebilir ve ERKEN uygulanır.', en: 'I would concretize the rule: "every interactive element (button, input, row) must carry a hook in the format `data-testid="{component}-{action or id}"`" and add it to the PR template as a checklist item ("was a new interactive element added? does it have a data-testid?"). Java analogy: like adding a rule to a team\'s style guide (a checkstyle/linter rule) requiring "every public method must have a Javadoc" — the rule is concrete, automatically auditable, and applied EARLY.' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir developer "erişilebilirlik için aria-label ekledim ama görünür metinle FARKLI bir şey yazdım (kısaltma yaptım)" diyor. Bu, hem erişilebilirlik hem locator açısından hangi riski taşır?', en: 'A developer says "I added an aria-label for accessibility but wrote something DIFFERENT from the visible text (I abbreviated it)". What risk does this carry for both accessibility and locators?' },
            a: { tr: 'Screen reader kullanıcısı FARKLI bir isim duyar (ör. "Sil" yerine "D") ve bu kafa karıştırıcı olabilir; ayrıca `getByRole({name:...})` yazan bir tester, görünür metne göre bir isim varsayarsa YANLIŞ locator yazar çünkü accessible name aria-label\'dan gelir. Java analojisi: bir metodun Javadoc\'unun ADI ile GERÇEK davranışının uyuşmaması gibi — dokümantasyon (aria-label) ile gerçeklik (görünür metin) arasında bir tutarsızlık iki farklı tüketiciyi (screen reader, tester) YANILTIR.', en: 'A screen-reader user hears a DIFFERENT name (e.g. "D" instead of "Delete") which can be confusing; also, a tester writing `getByRole({name:...})` based on the visible text writes the WRONG locator because the accessible name comes from the aria-label. Java analogy: like a method\'s Javadoc NAME not matching its ACTUAL behavior — an inconsistency between documentation (aria-label) and reality (visible text) MISLEADS two different consumers (a screen reader, a tester).' },
          },
          {
            level: 'advanced',
            q: { tr: 'Bir CSR React sayfasında BugCard listesi hem CSS Module hash taşıyor hem `{isOpen && <Modal/>}` ile bir modal içeriyor. Bir test hem listeyi hem modalı locate ederken flaky oluyor. Bu iki sorunu NASIL ayrı ayrı teşhis edip tek bir stratejide birleştirirsin?', en: 'A CSR React page\'s BugCard list both carries a CSS Module hash and contains a modal via `{isOpen && <Modal/>}`. A test locating both the list and the modal is flaky. How do you diagnose these two problems SEPARATELY and combine them into one strategy?' },
            a: { tr: 'Önce ikisini AYIRIRIM: liste sorunu muhtemelen timing\'dir (CSR\'da ilk HTML boş, fetch bitmeden locate ediliyor olabilir) — `toHaveCount` ile koşullu bekleme eklerim; modal sorunu ise muhtemelen conditional render\'dır (koşul tetiklenmeden locate ediliyor) — önce açan butona tıklarım. İkisi için de ORTAK çözüm: hiçbirini class hash\'ine bağlamam, `data-testid` kullanırım. Java analojisi: bir sistemdeki iki farklı hatayı (bir race condition VE bir null-check eksikliği) AYRI AYRI teşhis edip her ikisi için de "savunmacı programlama" (defensive check) ilkesini ORTAK çözüm olarak uygulamak gibi.', en: 'I first SEPARATE the two: the list problem is likely timing (in CSR the initial HTML is empty, it may be located before the fetch finishes) — I add a conditional wait with `toHaveCount`; the modal problem is likely a conditional render (located before the condition is triggered) — I click the opening button first. The COMMON fix for both: I do not bind either to a class hash, I use `data-testid`. Java analogy: like diagnosing two different bugs in a system (a race condition AND a missing null-check) SEPARATELY, then applying the "defensive programming" (a defensive check) principle as the COMMON fix for both.' },
          },
        ],
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
