// ─── Jira: QA Mühendisi için İş Takibi, Bug Yönetimi ve İzlenebilirlik ────────
//
// TEK AĞAÇLI veri dosyası: `sections` dizisi TR ve EN ağaçlarına AYNI referansla
// verilir, her metin alanı `{ tr, en }` objesidir — tx() helper doğru dili seçer.
// Kod blokları da bilingual: TR varyantında yorumlar Türkçe, EN varyantında
// İngilizce.
//
// Yazım kuralı: içinde apostrof geçen metinler ÇİFT tırnakla yazılır
// ("Jira'nın"), geçmeyenler tek tırnakla. Böyle yazmak, tek tırnaklı string'in
// Türkçe ekli terimlerde ("bug'ı", "API'ye") erken kapanmasıyla oluşan
// sözdizimi kırılmalarını baştan engeller.
//
// Bu sayfa fillMissingCodeTrios KULLANMAZ: filler yalnızca kod bloklarından
// sonra üretim yapar ve profil tablosu sayfa anahtarına göre çalışır; Jira
// sekmelerinin çoğu kod değil süreç anlatımı olduğu için animasyon ve sandbox
// blokları ELLE yazılır.
import { fillMissingFeynman } from './interactiveTrioFillers.js'

// ─── Film: bir bug'ın Jira'daki yolculuğu (GRUP A referans filmi) ─────────────
const bugJourneyFilm = {
  type: 'video-scene',
  id: 'jira-a1-bug-journey-film',
  title: {
    tr: "🎬 Bir Bug'ın Jira'daki Yolculuğu",
    en: '🎬 The Journey of a Bug Through Jira',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'tester', emoji: '🧪', label: { tr: 'QA (Ayşe)', en: 'QA (Ayse)' }, color: '#0ea5e9' },
    { id: 'issue', emoji: '🐞', label: { tr: 'SHOP-142', en: 'SHOP-142' }, color: '#ef4444' },
    { id: 'board', emoji: '📋', label: { tr: 'Sprint Panosu', en: 'Sprint Board' }, color: '#8b5cf6' },
    { id: 'dev', emoji: '🧑‍💻', label: { tr: 'Developer (Mert)', en: 'Developer (Mert)' }, color: '#6366f1' },
    { id: 'ci', emoji: '⚙️', label: { tr: 'CI Koşumu', en: 'CI Run' }, color: '#f59e0b' },
    { id: 'metric', emoji: '📊', label: { tr: 'Kalite Raporu', en: 'Quality Report' }, color: '#10b981' },
    { id: 'ghost', emoji: '👻', label: { tr: 'Kayıp Bilgi', en: 'Lost Knowledge' }, color: '#64748b' },
  ],
  scenes: [
    {
      caption: {
        tr: "Ödeme adımında kupon tutarı iki kez düşülüyor. Ayşe bunu 11:40'ta fark ediyor. Şimdi iki yol var: Mert'e dönüp söylemek ya da Jira'ya yazmak. Bu filmde ikinci yolun her adımını izleyeceksin — ve sonunda birinci yolun neye mal olduğunu göreceksin.",
        en: 'On the checkout step the coupon amount is deducted twice. Ayse notices it at 11:40. There are two paths now: turn around and tell Mert, or write it into Jira. In this film you will follow every step of the second path -- and at the end see what the first path costs.',
      },
      positions: {
        tester: { x: 50, y: 50, scale: 1.15, pulse: true },
      },
    },
    {
      caption: {
        tr: "Adım 1 — Kayıt: Ayşe bir Bug issue'su açar. Sistem ona kalıcı bir kimlik verir: SHOP-142. Bu kimlik artık commit mesajında, test raporunda ve sprint panosunda aynı şeyi işaret eder. Konuşmanın adı oldu.",
        en: 'Step 1 -- Record: Ayse creates a Bug issue. The system gives it a permanent identity: SHOP-142. From now on that identity points to the same thing in a commit message, a test report and the sprint board. The conversation now has a name.',
      },
      code: { tr: 'SHOP-142 · Bug · Kupon tutarı iki kez düşülüyor', en: 'SHOP-142 - Bug - Coupon amount deducted twice' },
      positions: {
        tester: { x: 22, y: 50, scale: 1.05 },
        issue: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'tester', to: 'issue' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Bağlam: Rapora ortam (staging, Chrome 141), tekrar üretim adımları, beklenen ve gerçekleşen sonuç, konsol çıktısı eklenir. Bu alanlar süs değil: raporun tek işi, onu okuyan kişinin hatayı KENDİ makinesinde yeniden görebilmesini sağlamaktır.',
        en: 'Step 2 -- Context: the report gets the environment (staging, Chrome 141), reproduction steps, expected and actual result, console output. These fields are not decoration: the single job of a report is to let whoever reads it see the failure again on their OWN machine.',
      },
      code: {
        tr: 'Ortam: staging · Chrome 141 · Windows 11\nBeklenen: 100 TL kupon bir kez düşer\nGerçekleşen: 200 TL düşüyor',
        en: 'Environment: staging - Chrome 141 - Windows 11\nExpected: the 100 TL coupon is deducted once\nActual: 200 TL is deducted',
      },
      positions: {
        issue: { x: 50, y: 50, scale: 1.25, pulse: true },
      },
    },
    {
      caption: {
        tr: "Adım 3 — Görünürlük: Issue sprint panosuna düşer. Artık PO önceliği görebilir, developer sırasını bilir, kimse 'benim haberim yoktu' diyemez. Bir bug panoya girene kadar takım için var değildir.",
        en: 'Step 3 -- Visibility: the issue lands on the sprint board. The PO can see the priority, the developer knows the queue, and nobody can say "I was not aware". Until a bug reaches the board it does not exist for the team.',
      },
      positions: {
        issue: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        board: { x: 52, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'issue', to: 'board', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Adım 4 — Bağlanma: Mert düzeltmeyi yazarken commit mesajına SHOP-142 anahtarını koyar. Kod değişikliği ile bug kaydı böylece birbirine bağlanır — altı ay sonra 'bu satır neden böyle' sorusunun cevabı tek tıkla bulunur.",
        en: 'Step 4 -- Linking: while writing the fix, Mert puts the SHOP-142 key into the commit message. The code change and the bug record are now tied together -- six months later the answer to "why is this line like this" is one click away.',
      },
      code: { tr: 'git commit -m "SHOP-142 kupon indirimi iki kez uygulanmıyor"', en: 'git commit -m "SHOP-142 coupon discount is no longer applied twice"' },
      positions: {
        board: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        dev: { x: 52, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'board', to: 'dev', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 5 — Doğrulama: CI koşumu düzeltmeyi staging\'e taşır, Ayşe senaryoyu tekrar koşar ve issue\'yu Done\'a taşır. Doğrulayan kişi ile düzelten kişi farklıdır — bu ayrım, "bende çalışıyor" cümlesinin panzehiridir.',
        en: 'Step 5 -- Verification: the CI run carries the fix to staging, Ayse runs the scenario again and moves the issue to Done. The person who verifies is not the person who fixed it -- that separation is the antidote to "it works on my machine".',
      },
      positions: {
        dev: { x: 18, y: 50, scale: 0.9, opacity: 0.6 },
        ci: { x: 44, y: 50, scale: 1.1 },
        tester: { x: 74, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'dev', to: 'ci', color: '#f59e0b' }, { from: 'ci', to: 'tester' }],
    },
    {
      caption: {
        tr: "Adım 6 — Ölçüm: Kapanan her issue bir veri noktasıdır. Kaç bug ödeme akışından çıktı, kaçı üretime sızdı, kaçı yeniden açıldı — bunlar tahmin değil, kayıttan gelen sayılardır. Bir sonraki sprintte nereye test yazacağın bu sayılarla belirlenir.",
        en: 'Step 6 -- Measurement: every closed issue is a data point. How many bugs came out of the checkout flow, how many leaked to production, how many were reopened -- these are not guesses, they are numbers that come from the record. Where you write tests next sprint is decided by these numbers.',
      },
      positions: {
        tester: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        metric: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'tester', to: 'metric', color: '#10b981' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — Birinci yol: Ayşe koridorda Mert'e söyler. Mert o gün düzeltir. Üç ay sonra aynı hata geri gelir; kimse ilk seferinde neyin bozulduğunu, hangi ortamda görüldüğünü, nasıl düzeltildiğini hatırlamaz. Kayıt yoksa kurum hafızası da yoktur — Jira'nın asıl işi bilet açmak değil, o hafızayı tutmaktır.",
        en: 'Finale (the contrast) -- Path one: Ayse tells Mert in the hallway. Mert fixes it that day. Three months later the same failure returns; nobody remembers what broke the first time, in which environment it appeared, or how it was fixed. Without a record there is no organizational memory -- the real job of Jira is not opening tickets, it is holding that memory.',
      },
      positions: {
        tester: { x: 18, y: 32, scale: 0.9 },
        dev: { x: 44, y: 32, scale: 0.9 },
        ghost: { x: 72, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'tester', to: 'dev' }, { from: 'dev', to: 'ghost', color: '#64748b' }],
    },
  ],
}

// ─── step-animation: bir issue'nun yaşam döngüsü (GRUP A) ─────────────────────
const issueLifecycleSteps = {
  type: 'step-animation',
  id: 'jira-a1-issue-lifecycle-steps',
  title: { tr: "Adım Adım: Bir Bug Kaydı Hangi Bilgiyi Ne Zaman Kazanır?", en: 'Step by Step: When Does a Bug Record Gain Which Information?' },
  steps: [
    { id: 1, icon: '🆕', label: { tr: 'Kimlik verilir', en: 'An identity is given' }, detail: { tr: "Issue açıldığı anda kalıcı bir anahtar alır (SHOP-142). Bu anahtar silinmez, yeniden kullanılmaz; bug kapansa bile adres olarak yaşamaya devam eder.", en: 'The moment the issue is created it receives a permanent key (SHOP-142). The key is never deleted or reused; even after the bug closes it lives on as an address.' } },
    { id: 2, icon: '🧾', label: { tr: 'Bağlam eklenir', en: 'Context is added' }, detail: { tr: 'Ortam, tekrar üretim adımları, beklenen/gerçekleşen sonuç ve kanıt (log, ekran kaydı) eklenir. Bu adım atlanırsa bug "cannot reproduce" ile geri döner.', en: 'Environment, reproduction steps, expected/actual result and evidence (logs, screen recording) are added. Skip this step and the bug comes back as "cannot reproduce".' } },
    { id: 3, icon: '⚖️', label: { tr: 'Önceliklendirilir', en: 'It gets prioritized' }, detail: { tr: 'Severity teknik etkiyi (veri kaybı mı, kozmetik mi) anlatır; priority ise ne zaman çalışılacağını söyler. İkisi farklı eksenlerdir ve farklı kişiler karar verir.', en: 'Severity describes technical impact (data loss or cosmetic); priority says when it will be worked on. They are different axes and different people decide them.' } },
    { id: 4, icon: '🔗', label: { tr: 'İlişkilendirilir', en: 'It gets linked' }, detail: { tr: "Bug hangi story'den doğdu, hangi test bunu yakaladı, hangi commit düzeltti — bu bağlar kurulmazsa kayıt tek başına bir not olarak kalır.", en: 'Which story did the bug come from, which test caught it, which commit fixed it -- without these links the record stays a lonely note.' } },
    { id: 5, icon: '✅', label: { tr: 'Doğrulanır ve kapanır', en: 'It is verified and closed' }, detail: { tr: 'Kapatan kişi düzelten kişi değildir. Resolution alanı doğru set edilmelidir (Done / Duplicate / Cannot Reproduce) — çünkü raporlar bu alandan beslenir.', en: 'The person who closes it is not the person who fixed it. The resolution field must be set correctly (Done / Duplicate / Cannot Reproduce) -- because reports feed on that field.' } },
    { id: 6, icon: '📊', label: { tr: 'Veriye dönüşür', en: 'It becomes data' }, detail: { tr: 'Kapanan kayıt artık ölçülebilir: hangi modülde yoğunlaşıyor, ortalama kaç günde kapanıyor, kaçı yeniden açılıyor. Test stratejisi bu sayılarla güncellenir.', en: 'A closed record is now measurable: which module it clusters in, how many days it takes to close on average, how many get reopened. Test strategy is updated with these numbers.' } },
  ],
}

// ─── code-playground: ilk JQL sorgusu (GRUP A) ────────────────────────────────
const firstJqlPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-a1-what-is-jira',
  id: 'jira-a1-first-jql',
  title: { tr: 'Kendin Dene: "Bana Atanan Açık Bug\'lar" Sorgusunu Yaz', en: 'Try It Yourself: Write the "Open Bugs Assigned to Me" Query' },
  starterCode: {
    tr: `-- SHOP projesindeki, sana atanmış, henüz kapanmamış BUG'ları listele.
-- Yukarıdaki örnekle aynı kalıbı kullan: ALAN = DEĞER, AND ile zincirle.
-- İpucu: kendi kullanıcını sabit yazma; her ekip üyesinde çalışsın.
project = SHOP`,
    en: `-- List the BUGs in the SHOP project that are assigned to you and not yet closed.
-- Use the same pattern as the example above: FIELD = VALUE, chained with AND.
-- Hint: do not hardcode your own user; it should work for every teammate.
project = SHOP`,
  },
  solutionCode: {
    tr: `-- Aynı kalıp, üç koşul: hangi issue tipi, kime atanmış, hangi durumda OLMAYAN
project = SHOP AND issuetype = Bug AND assignee = currentUser() AND status != Done`,
    en: `-- Same pattern, three conditions: which issue type, who it is assigned to, which status it is NOT in
project = SHOP AND issuetype = Bug AND assignee = currentUser() AND status != Done`,
  },
  hint: {
    tr: "Yukarıdaki örnekte gördüğün üç parçayı aynen kullan: `issuetype = Bug` (yeni — aynı ALAN = DEĞER kalıbı), `assignee = currentUser()` (örnekte `reporter` vardı, burada \"atanan kişi\" isteniyor — alan adı değişir, fonksiyon aynı kalır), `status != Done`. Kullanıcı adını elle yazarsan sorgu yalnızca sende çalışır.",
    en: 'Use the exact same three pieces you saw in the example above: `issuetype = Bug` (new -- same FIELD = VALUE pattern), `assignee = currentUser()` (the example used `reporter`, here we want "who it is assigned to" -- the field name changes, the function stays the same), `status != Done`. If you type a username by hand the query only works for you.',
  },
  successMessage: {
    tr: "Doğru! currentUser() sorguyu kişiselleştirir: aynı kaydedilmiş filtre bütün ekipte çalışır. Bu, otomasyonda sabit test verisi yazmak yerine parametre kullanmakla aynı fikirdir — sorgu bir kez yazılır, herkes kendi sonucunu görür.",
    en: 'Correct! currentUser() personalizes the query: the same saved filter works for the whole team. This is the same idea as using a parameter instead of hardcoded test data in automation -- the query is written once and everyone sees their own result.',
  },
}

// ─── challenge (order-sort): bug kaydının doğru sırası (GRUP A) ───────────────
const bugFlowChallenge = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'jira-a1-bug-flow-order',
  question: { tr: "Bir bug'ın kayıttan ölçüme uzanan altı adımını doğru sırayla diz.", en: 'Order the six steps of a bug from record to measurement.' },
  items: [
    { id: '1', text: { tr: 'Issue açılır ve kalıcı bir anahtar alır', en: 'The issue is created and receives a permanent key' }, order: 1 },
    { id: '2', text: { tr: 'Ortam, adımlar ve kanıt eklenir', en: 'Environment, steps and evidence are added' }, order: 2 },
    { id: '3', text: { tr: 'Severity ve priority belirlenir, panoya düşer', en: 'Severity and priority are set, it lands on the board' }, order: 3 },
    { id: '4', text: { tr: 'Düzeltme commit\'i issue anahtarıyla bağlanır', en: 'The fix commit is linked via the issue key' }, order: 4 },
    { id: '5', text: { tr: 'QA doğrular ve resolution ile kapatır', en: 'QA verifies and closes it with a resolution' }, order: 5 },
    { id: '6', text: { tr: 'Kapanan kayıt kalite metriğine dönüşür', en: 'The closed record turns into a quality metric' }, order: 6 },
  ],
  xpReward: 10,
}

// ─── step-animation: kötü rapordan iyi rapora (GRUP D) ────────────────────────
const bugReportRepairSteps = {
  type: 'step-animation',
  id: 'jira-d1-report-repair-steps',
  title: { tr: 'Adım Adım: "Ödeme Çalışmıyor" Raporu Nasıl Kullanılabilir Hâle Gelir?', en: 'Step by Step: How Does a "Checkout Is Broken" Report Become Usable?' },
  steps: [
    { id: 1, icon: '🫥', label: { tr: 'Başlangıç: hiçbir şey söylemeyen başlık', en: 'Start: a title that says nothing' }, detail: { tr: '"Ödeme çalışmıyor" başlığı panoda otuz kartın arasında hiçbir karar aldırmaz. Başlık, okuyanın kartı açmadan önceliklendirebilmesini sağlamalıdır.', en: '"Checkout is broken" leads to no decision among thirty cards on a board. A title must let the reader prioritize without opening the card.' } },
    { id: 2, icon: '🎯', label: { tr: 'Nerede + ne + ne zaman', en: 'Where + what + when' }, detail: { tr: 'Başlık formülü: [ekran/akış] + [gözlenen yanlış davranış] + [tetikleyen koşul]. "Ödeme adımında kupon tutarı iki kez düşülüyor (yüzde bazlı kuponlarda)".', en: 'Title formula: [screen/flow] + [observed wrong behavior] + [triggering condition]. "Coupon amount deducted twice on the checkout step (percentage coupons only)".' } },
    { id: 3, icon: '🧭', label: { tr: 'Ön koşul yazılır', en: 'Preconditions are written' }, detail: { tr: 'Hangi kullanıcı, hangi sepet, hangi ortam. Ön koşul eksikse okuyan kişi kendi verisiyle dener, göremez ve raporu kapatır.', en: 'Which user, which cart, which environment. Without preconditions the reader tries with their own data, sees nothing, and closes the report.' } },
    { id: 4, icon: '🔢', label: { tr: 'Adımlar deterministik olur', en: 'Steps become deterministic' }, detail: { tr: 'Her adım tek bir eylem içerir ve tahmine yer bırakmaz: "sepete X ürününü ekle" evet, "sepeti hazırla" hayır.', en: 'Each step contains a single action and leaves no room for guessing: "add product X to the cart" yes, "prepare a cart" no.' } },
    { id: 5, icon: '⚖️', label: { tr: 'Beklenen ve gerçekleşen ayrılır', en: 'Expected and actual are separated' }, detail: { tr: 'İkisi ayrı yazılmazsa tartışma "bu bir bug mı yoksa istenen davranış mı" noktasında tıkanır. Beklenen davranışın kaynağı (kabul kriteri) da belirtilir.', en: 'If the two are not written separately the discussion stalls on "is this a bug or intended behavior". The source of the expected behavior (the acceptance criterion) is stated too.' } },
    { id: 6, icon: '📎', label: { tr: 'Kanıt iliştirilir', en: 'Evidence is attached' }, detail: { tr: 'Konsol çıktısı, ağ isteği, ekran kaydı veya otomasyon koşumunun rapor linki. Kanıt, raporu bir iddiadan bir gözleme dönüştürür.', en: 'Console output, the network request, a screen recording, or the report link from an automation run. Evidence turns a report from a claim into an observation.' } },
  ],
}

// ─── grid: rollere göre Jira kullanımı (GRUP A2) ──────────────────────────────
const jiraRoleGrid = {
  type: 'grid',
  cols: 3,
  items: [
    {
      icon: '🧑‍💻',
      label: { tr: 'Developer', en: 'Developer' },
      desc: {
        tr: "Issue'yu okur, commit'e anahtarı bağlar, geçişleri (Ready for QA gibi) tetikler. Jira'daki alanı esas olarak kod ile kayıt arasındaki köprüdür.",
        en: 'Reads the issue, ties the key into a commit, triggers transitions (like Ready for QA). Their footprint in Jira is mainly the bridge between code and record.',
      },
    },
    {
      icon: '🧑‍💼',
      label: { tr: 'Product Owner', en: 'Product Owner' },
      desc: {
        tr: 'Priority\'yi belirler, backlog\'u sıralar, "Done" tanımının iş tarafını onaylar. Severity\'ye karışmaz — o teknik bir değerlendirmedir.',
        en: 'Sets priority, orders the backlog, signs off the business side of "done". Does not weigh in on severity -- that is a technical assessment.',
      },
    },
    {
      icon: '🧪',
      label: { tr: 'QA', en: 'QA' },
      desc: {
        tr: 'Bug\'ı kaydeder, severity\'yi önerir, ön koşul/adım/kanıtı yazar, doğrular ve resolution\'ı belirler. Panoda en çok geçiş yapan roldür.',
        en: 'Records the bug, proposes severity, writes preconditions/steps/evidence, verifies and sets the resolution. The role that makes the most transitions on the board.',
      },
    },
  ],
}

// ─── table: Jira Cloud vs Data Center (GRUP A3) ───────────────────────────────
const cloudVsDcTable = {
  type: 'table',
  headers: [
    { tr: 'Boyut', en: 'Dimension' },
    { tr: 'Jira Cloud', en: 'Jira Cloud' },
    { tr: 'Jira Data Center', en: 'Jira Data Center' },
  ],
  rows: [
    [
      { tr: 'Barındırma', en: 'Hosting' },
      { tr: "Atlassian'ın sunucusunda, SaaS", en: "On Atlassian's servers, SaaS" },
      { tr: 'Şirketin kendi altyapısında', en: "On the company's own infrastructure" },
    ],
    [
      { tr: 'Proje tipi', en: 'Project type' },
      { tr: 'Team-managed ve company-managed ikisi de var', en: 'Both team-managed and company-managed exist' },
      { tr: 'Yalnızca company-managed (klasik) proje', en: 'Only company-managed (classic) projects' },
    ],
    [
      { tr: 'Güncelleme', en: 'Updates' },
      { tr: 'Otomatik, sürekli çıkar', en: 'Automatic, continuous rollout' },
      { tr: 'Şirket kendi takvimiyle yükseltir', en: 'The company upgrades on its own schedule' },
    ],
    [
      { tr: 'REST API', en: 'REST API' },
      { tr: '/rest/api/3/...', en: '/rest/api/3/...' },
      { tr: '/rest/api/2/... (bazı uç noktalar farklı)', en: '/rest/api/2/... (some endpoints differ)' },
    ],
  ],
}

// ─── callout: bu sayfa hangi sürümü anlatıyor (GRUP A3) ───────────────────────
const cloudScopeCallout = {
  type: 'callout',
  color: 'blue',
  emoji: '📌',
  title: { tr: 'Bu Sayfanın Kapsamı', en: 'The Scope of This Page' },
  content: {
    tr: "Bu sayfadaki anlatım, ekranlar ve REST API örnekleri Jira Cloud temellidir — bugün yeni açılan hesapların büyük çoğunluğu Cloud'dur. Data Center'da çalışıyorsan üç şeyi bekle: proje tipin daima company-managed olacak, REST API adresin /rest/api/2/ olabilir, ve güncellemeler senin takvimine bağlıdır. Fark önemli olduğunda metinde ayrıca belirtilir; sessizce geçilmez.",
    en: 'The narration, screens and REST API examples on this page are Jira Cloud based -- the vast majority of accounts opened today are Cloud. If you work on Data Center, expect three things: your project type will always be company-managed, your REST API address may be /rest/api/2/, and updates depend on your own schedule. Where the difference matters it is called out explicitly in the text; it is never glossed over.',
  },
}

// ─── python-flow-diagram: izlenebilirlik zinciri (GRUP A4) ────────────────────
const traceabilityFlow = {
  type: 'python-flow-diagram',
  titleTr: 'İzlenebilirlik Zinciri: Gereksinimden Bug\'a',
  titleEn: 'The Traceability Chain: From Requirement to Bug',
  steps: [
    { type: 'action', code: 'SHOP-118 (Story)', desc: 'Requirement: a coupon is applied once per order', descTr: 'Gereksinim: kupon sipariş başına bir kez uygulanır' },
    { type: 'action', code: 'Test: coupon_applied_once', desc: 'A test case is linked to the requirement', descTr: 'Gereksinime bağlı bir test senaryosu yazılır' },
    { type: 'condition', code: 'Test Execution (build 2026.8.3)', desc: 'The test is run against a specific build', descTr: 'Test belirli bir build\'e karşı koşulur', branch: { true: 'PASS', false: 'FAIL' } },
    { type: 'error', code: 'SHOP-142 (Bug)', desc: 'On FAIL, a bug is filed and linked back to the test and the story', descTr: 'FAIL durumunda bug açılır, teste ve story\'ye bağlanır' },
    { type: 'end', code: 'Traceability Report', desc: 'One screen now answers: what was tested, what passed, what leaked', descTr: 'Artık tek bir ekran şunu cevaplar: ne test edildi, ne geçti, ne sızdı' },
  ],
}

// ─── step-animation: Jira olmadan bug takibi (GRUP A5) ────────────────────────
const noJiraCollapseSteps = {
  type: 'step-animation',
  id: 'jira-a5-no-jira-collapse-steps',
  title: { tr: "Adım Adım: E-posta ve Excel ile Bug Takibi Neden Çöker?", en: 'Step by Step: Why Does Email and Excel Bug Tracking Collapse?' },
  steps: [
    { id: 1, icon: '📧', label: { tr: 'Bug e-postayla bildirilir', en: 'The bug is reported by email' }, detail: { tr: 'Konu satırı "acil bakılsın" — severity, priority, ortam bilgisi yok. Herkes kendi formatını kullanır.', en: 'Subject line: "urgent please check" -- no severity, no priority, no environment info. Everyone uses their own format.' } },
    { id: 2, icon: '📊', label: { tr: 'Bir Excel dosyası tutulur', en: 'An Excel file is kept' }, detail: { tr: 'Biri bug\'ları bir tabloya taşımaya karar verir. Dosya paylaşılan bir sürücüde durur, tek seferde tek kişi düzenleyebilir.', en: 'Someone decides to move bugs into a spreadsheet. The file sits on a shared drive; only one person can edit it at a time.' } },
    { id: 3, icon: '🔀', label: { tr: 'İki kişi aynı satırı değiştirir', en: 'Two people edit the same row' }, detail: { tr: 'Kaydetme çakışması olur, biri diğerinin değişikliğini fark etmeden ezer. Hangi bilginin doğru olduğu artık belirsizdir.', en: 'A save conflict happens; one person overwrites the other without noticing. Which piece of information is correct is now unclear.' } },
    { id: 4, icon: '🔍', label: { tr: 'Arama imkânsızlaşır', en: 'Searching becomes impossible' }, detail: { tr: '"Ödeme akışındaki tüm açık bug\'lar" sorusunun cevabı artık dosyayı elle Ctrl+F ile taramaktan geçer — ve satır sayısı arttıkça bu yaklaşım yavaşlar, hata yapar.', en: 'The answer to "all open bugs in the checkout flow" now means manually Ctrl+F-ing the file -- and as row count grows this approach gets slow and error-prone.' } },
    { id: 5, icon: '🔗', label: { tr: 'Kod ile bağ kopar', en: 'The link to code breaks' }, detail: { tr: 'Bir Excel satırı commit mesajına yazılamaz, commit\'ten satıra tıklanamaz. Kod değişikliği ile bug kaydı arasındaki bağ elle, hafızayla kurulmaya çalışılır.', en: 'An Excel row cannot be written into a commit message, nor clicked from a commit. The link between a code change and a bug record is attempted by hand, from memory.' } },
    { id: 6, icon: '👻', label: { tr: 'Kayıt sessizce kaybolur', en: 'The record silently disappears' }, detail: { tr: 'Dosya yeniden adlandırılır, eski sürüm silinir, biri işten ayrılır ve dosyanın nerede olduğunu bilen kalmaz. Kurum hafızası, dosya sisteminin kaderine bağlı kalır.', en: 'The file gets renamed, the old version deleted, someone leaves the company and nobody knows where the file is anymore. Organizational memory is now at the mercy of the file system.' } },
  ],
}

// ─── Film: kötü bir bug raporunun 5 günü (GRUP D referans filmi) ──────────────
const badReportFiveDaysFilm = {
  type: 'video-scene',
  id: 'jira-d1-bad-report-5-days-film',
  title: {
    tr: "🎬 Kötü Bir Bug Raporunun 5 Günü",
    en: '🎬 Five Days of a Bad Bug Report',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'report', emoji: '📝', label: { tr: 'Zayıf Rapor', en: 'Weak Report' }, color: '#f59e0b' },
    { id: 'dev', emoji: '🧑‍💻', label: { tr: 'Mert (Dev)', en: 'Mert (Dev)' }, color: '#6366f1' },
    { id: 'silence', emoji: '🤐', label: { tr: '"Cannot Reproduce"', en: '"Cannot Reproduce"' }, color: '#64748b' },
    { id: 'retest', emoji: '🔁', label: { tr: 'Ayşe Yeniden Test Ediyor', en: 'Ayse Retests' }, color: '#0ea5e9' },
    { id: 'rewrite', emoji: '✍️', label: { tr: 'Rapor Yeniden Yazılır', en: 'Report Rewritten' }, color: '#8b5cf6' },
    { id: 'fixed', emoji: '✅', label: { tr: 'Gerçek Düzeltme', en: 'Real Fix' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: "Gün 1, 09:00 — Ayşe bir bug buluyor ve raporu üç saniyede yazıyor: başlık \"Ödeme çalışmıyor\", açıklama yok. Panoda görünür hâle geldi diye kendini rahat hissediyor. Aslında iş daha yeni başlıyor.",
        en: 'Day 1, 09:00 -- Ayse finds a bug and writes the report in three seconds: title "Checkout is broken", no description. She feels at ease because it is now visible on the board. The work has actually just begun.',
      },
      positions: { report: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Gün 2 — Mert raporu açar, kendi test verisiyle dener, hiçbir sorun bulamaz. Elinde ortam, adım veya kanıt olmadığı için tek yapabileceği "cannot reproduce" yazıp raporu geri göndermektir.',
        en: 'Day 2 -- Mert opens the report, tries it with his own test data, finds nothing wrong. With no environment, steps or evidence in hand, all he can do is write "cannot reproduce" and bounce it back.',
      },
      positions: {
        report: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        dev: { x: 44, y: 50, scale: 1.1 },
        silence: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'report', to: 'dev' }, { from: 'dev', to: 'silence', color: '#64748b' }],
    },
    {
      caption: {
        tr: 'Gün 3 — Ayşe kaydı geri alır ama İKİ GÜN önce hangi kuponu, hangi ürünü kullandığını tam hatırlamıyor. Baştan test etmesi gerekiyor — kendi hatasını kendi zamanından çalarak ödüyor.',
        en: 'Day 3 -- Ayse gets the record back, but does not fully remember which coupon, which product she used TWO DAYS ago. She has to test from scratch -- paying for her own mistake out of her own time.',
      },
      positions: {
        silence: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        retest: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'silence', to: 'retest', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: "Gün 4 — Bu sefer rapor tam yazılır: ortam, ön koşul, deterministik adımlar, beklenen/gerçekleşen, kanıt. Mert raporu açar ve BEŞ DAKİKADA aynı hatayı üretir — üç gün önce imkânsız görünen şey, tam bir rapor ile beş dakikaya iner.",
        en: 'Day 4 -- This time the report is written completely: environment, precondition, deterministic steps, expected/actual, evidence. Mert opens it and reproduces the exact failure in FIVE MINUTES -- what looked impossible three days ago takes five minutes with a complete report.',
      },
      positions: {
        retest: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        rewrite: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'retest', to: 'rewrite', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — Gün 5'te bug düzeltilir ve doğrulanır. Toplam maliyet: 5 gün, iki kişinin kaybettiği zaman, bir \"cannot reproduce\" damgası. Rapor Gün 1'de tam yazılsaydı bu süreç birkaç SAATE sığardı — arada değişen tek şey raporun tamlığıdır, hatanın kendisi değil.",
        en: 'Finale (the contrast) -- On Day 5 the bug is fixed and verified. Total cost: 5 days, two people\'s lost time, one "cannot reproduce" stamp. Had the report been written completely on Day 1, this would have fit into a few HOURS -- the only thing that changed in between is the completeness of the report, not the bug itself.',
      },
      positions: {
        rewrite: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        fixed: { x: 54, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'rewrite', to: 'fixed', color: '#10b981' }],
    },
  ],
}

// ─── code-playground: kötü bug raporunu düzelt (GRUP D) ───────────────────────
const bugReportPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-d1-bug-report-anatomy',
  id: 'jira-d1-report-rewrite',
  title: { tr: 'Kendin Dene: Bu Bug Raporunu Kullanılabilir Hâle Getir', en: 'Try It Yourself: Make This Bug Report Usable' },
  starterCode: {
    tr: `Başlık: Ödeme çalışmıyor
Açıklama: Kupon uygulayınca tutar yanlış geliyor, bakabilir misiniz?`,
    en: `Title: Checkout is broken
Description: The amount comes out wrong when a coupon is applied, can you look at it?`,
  },
  solutionCode: {
    tr: `Başlık: Ödeme adımında yüzde bazlı kupon tutarı iki kez düşülüyor

Ortam: staging · Chrome 141 · Windows 11 · build 2026.8.3
Ön koşul: standart müşteri hesabı, sepette 1 adet "Kablosuz Kulaklık" (500 TL)

Adımlar:
1. Sepete "Kablosuz Kulaklık" ürününü ekle
2. Ödeme adımına geç
3. Kupon alanına INDIRIM20 kodunu gir ve Uygula'ya bas

Beklenen: Toplam 400 TL olur (yüzde 20 indirim bir kez uygulanır)
Gerçekleşen: Toplam 300 TL oluyor (indirim iki kez uygulanıyor)
Kabul kriteri: SHOP-118 · "Bir kupon sipariş başına bir kez uygulanır"

Kanıt: konsol çıktısı ve ağ isteği ekte (checkout-response.json)`,
    en: `Title: Percentage coupon amount is deducted twice on the checkout step

Environment: staging - Chrome 141 - Windows 11 - build 2026.8.3
Precondition: standard customer account, cart holds 1 "Wireless Headphones" (500 TL)

Steps:
1. Add "Wireless Headphones" to the cart
2. Go to the checkout step
3. Enter the code INDIRIM20 in the coupon field and press Apply

Expected: The total becomes 400 TL (the 20 percent discount is applied once)
Actual: The total becomes 300 TL (the discount is applied twice)
Acceptance criterion: SHOP-118 - "A coupon is applied once per order"

Evidence: console output and network request attached (checkout-response.json)`,
  },
  hint: {
    tr: 'Raporun okuyucusu senin ekranını görmüyor. Altı şeyi arıyor: hangi ekranda ne oldu (başlık), hangi ortamda, hangi veriyle (ön koşul), hangi tıklama sırasıyla (adımlar), ne olmalıydı ve ne oldu (ayrı ayrı), bunu ne kanıtlıyor. Eksik olan her madde, raporun sana geri dönme olasılığını artırır.',
    en: 'The reader of your report cannot see your screen. They look for six things: what happened on which screen (title), in which environment, with which data (precondition), through which click sequence (steps), what should have happened versus what did (separately), and what proves it. Every missing item raises the chance the report bounces back to you.',
  },
  successMessage: {
    tr: 'Doğru! Bu rapor artık bir iddia değil, tekrar üretilebilir bir gözlem. Beklenen davranışı kabul kriterine bağlaman ayrıca "bu bug mı, istenen davranış mı" tartışmasını baştan kapatır — otomasyonda assertion\'ı belirsiz bir "sayfa açıldı" yerine somut bir beklenen değere bağlamakla aynı disiplin.',
    en: 'Correct! This report is no longer a claim but a reproducible observation. Tying the expected behavior to an acceptance criterion also closes the "is this a bug or intended" debate up front -- the same discipline as binding an assertion to a concrete expected value instead of a vague "the page opened".',
  },
}

// ─── table: belirsiz adım vs deterministik adım (GRUP D2) ──────────────────────
const deterministicStepsTable = {
  type: 'table',
  headers: [
    { tr: 'Belirsiz adım (yorumlanmaya açık)', en: 'Vague step (open to interpretation)' },
    { tr: 'Deterministik adım (tek okunuşu var)', en: 'Deterministic step (only one reading)' },
  ],
  rows: [
    [
      { tr: '"Sepete bir ürün ekle"', en: '"Add a product to the cart"' },
      { tr: '"Sepete \'Kablosuz Kulaklık\' (500 TL) ürününü 1 adet ekle"', en: '"Add 1 unit of \'Wireless Headphones\' (500 TL) to the cart"' },
    ],
    [
      { tr: '"Bir kupon dene"', en: '"Try a coupon"' },
      { tr: '"Kupon alanına INDIRIM20 kodunu gir ve Uygula\'ya bas"', en: '"Enter the code INDIRIM20 in the coupon field and press Apply"' },
    ],
    [
      { tr: '"Hata çıkıyor"', en: '"An error shows up"' },
      { tr: '"Toplam 300 TL gösteriyor (400 TL olması bekleniyordu)"', en: '"The total shows 300 TL (400 TL was expected)"' },
    ],
    [
      { tr: '"Test kullanıcısıyla dene"', en: '"Try it with a test user"' },
      { tr: '"standart müşteri hesabı (misafir değil, üye) ile dene"', en: '"try it with a standard customer account (member, not guest)"' },
    ],
  ],
}

// ─── grid: kanıt türleri (GRUP D4) ─────────────────────────────────────────────
const evidenceTypesGrid = {
  type: 'grid',
  cols: 2,
  items: [
    {
      icon: '🖥️',
      label: { tr: 'Konsol çıktısı', en: 'Console output' },
      desc: {
        tr: 'Tarayıcı DevTools → Console\'daki hata/uyarı satırları. JS hatalarında ilk bakılacak yerdir; hangi dosyanın hangi satırında patladığını gösterir.',
        en: 'Error/warning lines from the browser DevTools -> Console. The first place to look for JS errors; shows which file, which line broke.',
      },
    },
    {
      icon: '🌐',
      label: { tr: 'Ağ isteği (Network/HAR)', en: 'Network request (Network/HAR)' },
      desc: {
        tr: "İsteğin gövdesi, dönen yanıt ve durum kodu. \"200 döndü ama yanlış veri\" ile \"500 döndü\" birbirinden çok farklı kök nedenlere işaret eder.",
        en: 'The request body, the returned response and the status code. "Returned 200 but with wrong data" and "returned 500" point to very different root causes.',
      },
    },
    {
      icon: '🎥',
      label: { tr: 'Ekran kaydı', en: 'Screen recording' },
      desc: {
        tr: 'Sözle anlatılması zor, sıralamaya bağlı hatalarda (bir animasyonun bitmeden tıklanması gibi) en güçlü kanıttır — okuyan kişi olayı KENDİ gözüyle görür.',
        en: 'For failures that are hard to describe in words and depend on timing (like clicking before an animation finishes), this is the strongest evidence -- the reader sees the event with their OWN eyes.',
      },
    },
    {
      icon: '📄',
      label: { tr: 'Otomasyon koşum raporu', en: 'Automation run report' },
      desc: {
        tr: "Bir otomasyon senaryosu başarısız olduğunda üretilen HTML rapor linki. Elle tekrarlamaya gerek kalmaz — raporun kendisi zaten tekrar üretilebilir bir kanıttır.",
        en: 'The HTML report link generated when an automation scenario fails. No need to reproduce by hand -- the report itself is already reproducible evidence.',
      },
    },
  ],
}

// ─── code-playground: bug raporu code review (GRUP D5) ────────────────────────
const reportCodeReviewPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-d1-bug-report-anatomy',
  id: 'jira-d5-report-code-review',
  title: { tr: 'Kendin Dene: Üç Raporu Code Review Et', en: 'Try It Yourself: Code-Review Three Reports' },
  starterCode: {
    tr: `Rapor A: "Sepet sayfasında bir şeyler bozuk, bakar mısın?"

Rapor B: "Başlık: Kupon uygulanınca toplam yanlış hesaplanıyor.
Adımlar: sepete ürün ekle, kupon uygula, toplamı kontrol et.
Beklenen: doğru toplam. Gerçekleşen: yanlış toplam."

Rapor C: "Başlık: Ödeme adımında yüzde bazlı kupon iki kez düşülüyor.
Ortam: staging, Chrome 141. Ön koşul: 1 adet Kablosuz Kulaklık (500 TL).
Adımlar: 1) sepete ekle 2) ödeme adımına geç 3) INDIRIM20 gir, Uygula'ya bas.
Beklenen: 400 TL. Gerçekleşen: 300 TL. Kanıt: ağ isteği ekte."

Hangisi gönderilmeye hazır, hangileri neden geri döner?`,
    en: `Report A: "Something's broken on the cart page, can you check?"

Report B: "Title: Total is calculated wrong when a coupon is applied.
Steps: add a product, apply a coupon, check the total.
Expected: correct total. Actual: wrong total."

Report C: "Title: Percentage coupon is deducted twice on the checkout step.
Environment: staging, Chrome 141. Precondition: 1 Wireless Headphones (500 TL).
Steps: 1) add to cart 2) go to checkout 3) enter INDIRIM20, press Apply.
Expected: 400 TL. Actual: 300 TL. Evidence: network request attached."

Which one is ready to send, and why would the others bounce back?`,
  },
  solutionCode: {
    tr: `Rapor A: RED — hiçbir alan yok, hangi sayfa/ne bozuk bile belirsiz. Doğrudan "cannot reproduce" ile döner.

Rapor B: KISMEN — beklenen/gerçekleşen ayrılmış ama SAYI yok ("yanlış toplam" ne kadar yanlış?),
ortam ve ön koşul eksik, kanıt yok. Okuyan kişi denese bile kendi verisiyle farklı bir sonuç alabilir.

Rapor C: HAZIR — başlık formülü (ekran+davranış+koşul), ortam, ön koşul, deterministik adımlar,
sayısal beklenen/gerçekleşen ve kanıt hepsi var. Okuyan kişi hiçbir varsayımda bulunmak zorunda kalmaz.`,
    en: `Report A: REJECT -- no fields at all, not even clear which page/what is broken. Bounces back as "cannot reproduce" immediately.

Report B: PARTIAL -- expected/actual are separated but there is no NUMBER ("wrong total" -- how wrong?),
environment and precondition are missing, no evidence. Even if the reader tries it, their own data may give a different result.

Report C: READY -- title formula (screen+behavior+condition), environment, precondition, deterministic steps,
numeric expected/actual and evidence are all present. The reader never has to guess anything.`,
  },
  hint: {
    tr: "Altı kontrol maddesini sırayla uygula: başlık formülü var mı (nerede+ne+ne zaman), ortam belirtilmiş mi, ön koşul yazılmış mı, adımlar tek bir eylem içeriyor mu, beklenen/gerçekleşen SAYISAL ve ayrı mı, kanıt var mı. Bir raporun kaç maddeyi karşıladığı onun ne kadar hazır olduğunu gösterir.",
    en: 'Apply six checks in order: is there a title formula (where+what+when), is the environment stated, is the precondition written, do the steps contain one action each, are expected/actual NUMERIC and separate, is there evidence. How many items a report satisfies shows how ready it is.',
  },
  successMessage: {
    tr: "Doğru! Bu altı maddelik kontrol listesi bir code review checklist'i gibi çalışır — subjektif bir \"iyi görünüyor\" yerine sayılabilir kriterler sunar. Rapor C'nin GRUP D boyunca öğrendiğin her ilkeyi (D1 anatomi, D2 deterministik adım, D3 severity/priority, D4 kanıt) tek bir yerde topladığını fark et.",
    en: 'Correct! This six-item checklist works like a code review checklist -- it offers countable criteria instead of a subjective "looks fine". Notice that Report C brings together every principle you learned across GROUP D (D1 anatomy, D2 deterministic steps, D3 severity/priority, D4 evidence) in one place.',
  },
}

// ─── Film: bir bug'ın Reopened'a düşüşü (GRUP E referans filmi) ───────────────
const reopenedFallFilm = {
  type: 'video-scene',
  id: 'jira-e1-reopened-fall-film',
  title: {
    tr: "🎬 Bir Bug'ın Reopened'a Düşüşü",
    en: "🎬 A Bug's Fall Into Reopened",
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'progress', emoji: '🧑‍💻', label: { tr: 'In Progress', en: 'In Progress' }, color: '#6366f1' },
    { id: 'ready', emoji: '🎯', label: { tr: 'Ready for QA', en: 'Ready for QA' }, color: '#f59e0b' },
    { id: 'inqa', emoji: '🔍', label: { tr: 'In QA', en: 'In QA' }, color: '#0ea5e9' },
    { id: 'reopened', emoji: '🔁', label: { tr: 'Reopened', en: 'Reopened' }, color: '#ef4444' },
    { id: 'resolution', emoji: '🏷️', label: { tr: 'Resolution Alanı', en: 'Resolution Field' }, color: '#8b5cf6' },
    { id: 'done', emoji: '✅', label: { tr: 'Gerçek Done', en: 'Real Done' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: "SHOP-142 \"In Progress\" durumunda — Mert kupon hesaplama fonksiyonunu düzeltiyor. Bu filmde kaydın kapıdan kapıya nasıl ilerlediğini ve bir kapının nasıl geri döndürdüğünü izleyeceksin.",
        en: 'SHOP-142 sits in "In Progress" -- Mert is fixing the coupon calculation function. In this film you will watch the record move gate to gate, and see how one gate sends it back.',
      },
      positions: { progress: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Mert kodu bitirir ve "Ready for QA" geçişini tetikler. Bu geçişte bir koşul (condition) vardır: kod review onayı olmadan bu buton hiç görünmez. Onay var, geçiş açılır.',
        en: 'Step 1 -- Mert finishes the code and triggers the "Ready for QA" transition. This transition has a condition: without code review approval, the button does not even appear. The approval exists, the transition opens.',
      },
      positions: {
        progress: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        ready: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'progress', to: 'ready', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: 'Adım 2 — Ayşe kaydı "In QA"ya alır ve staging\'de kupon senaryosunu koşar. Yüzde bazlı tekli kupon doğru çalışıyor — ama Ayşe ikinci bir senaryo daha dener: kupon + üye indirimi aynı anda.',
        en: 'Step 2 -- Ayse moves the record to "In QA" and runs the coupon scenario on staging. The single percentage coupon works correctly -- but Ayse tries one more scenario: coupon plus membership discount at the same time.',
      },
      positions: {
        ready: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        inqa: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'ready', to: 'inqa', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 3 — İkinci senaryoda hata hâlâ var: iki indirim üst üste bindiğinde tutar yine yanlış hesaplanıyor. Ayşe kaydı "Reopened"a taşır ve YENİ bir tekrar üretim adımı ekler — orijinal rapor eksik değildi, kapsam genişledi.',
        en: 'Step 3 -- In the second scenario the bug is still there: when the two discounts stack, the amount is calculated wrong again. Ayse moves the record to "Reopened" and adds a NEW reproduction step -- the original report was not incomplete, the scope simply widened.',
      },
      positions: {
        inqa: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        reopened: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'inqa', to: 'reopened', color: '#ef4444' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — Mert ikinci düzeltmeyi yazar, bu sefer resolution alanını yalnızca Ayşe DOĞRULADIKTAN sonra \"Fixed\" olarak set eder — kendi geçişinde BOŞ bırakır. Eğer Mert resolution'ı erkenden \"Fixed\" yazsaydı, kayıt Reopened'a düşse bile bazı raporlar onu hâlâ \"çözülmüş\" sayardı — resolution'ın NE ZAMAN set edildiği, DONE kadar önemlidir.",
        en: 'Finale (the contrast) -- Mert writes the second fix, this time setting the resolution field to "Fixed" only AFTER Ayse VERIFIES it -- he leaves it EMPTY at his own transition. Had Mert set resolution to "Fixed" early, some reports would still count the record as "resolved" even after it fell into Reopened -- WHEN resolution gets set matters as much as reaching Done.',
      },
      positions: {
        reopened: { x: 18, y: 32, scale: 0.9 },
        resolution: { x: 46, y: 55, scale: 1.1 },
        done: { x: 74, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'reopened', to: 'resolution', color: '#8b5cf6' }, { from: 'resolution', to: 'done', color: '#10b981' }],
    },
  ],
}

// ─── python-flow-diagram: tipik bug workflow'u (GRUP E2) ──────────────────────
const bugWorkflowFlow = {
  type: 'python-flow-diagram',
  titleTr: 'Tipik Bug Workflow\'u: QA Nerede Duruyor?',
  titleEn: 'A Typical Bug Workflow: Where Does QA Stand?',
  steps: [
    { type: 'action', code: 'Open', desc: 'Bug is filed, no work has started', descTr: 'Bug kaydedildi, henüz iş başlamadı' },
    { type: 'action', code: 'In Progress', desc: 'Developer is writing the fix', descTr: 'Developer düzeltmeyi yazıyor' },
    { type: 'condition', code: 'Ready for QA', desc: 'Gate: requires code review approval', descTr: 'Kapı: kod review onayı gerektirir', branch: { true: 'In QA', false: 'In Progress' } },
    { type: 'condition', code: 'In QA', desc: 'QA verifies against the acceptance criterion', descTr: "QA kabul kriterine göre doğrular", branch: { true: 'Done', false: 'Reopened' } },
    { type: 'end', code: 'Done (resolution = Fixed)', desc: 'Only set by QA after verification', descTr: 'Yalnızca QA doğruladıktan sonra set edilir' },
  ],
}

// ─── step-animation: resolution alanının zamanlaması (GRUP E3) ────────────────
const resolutionTimingSteps = {
  type: 'step-animation',
  id: 'jira-e3-resolution-timing-steps',
  title: { tr: 'Adım Adım: Resolution Alanı Ne Zaman Doğru Set Edilir?', en: 'Step by Step: When Is the Resolution Field Set Correctly?' },
  steps: [
    { id: 1, icon: '🧑‍💻', label: { tr: 'Developer düzeltmeyi bitirir', en: 'Developer finishes the fix' }, detail: { tr: 'Kod yazıldı, review onaylandı. Resolution alanı henüz BOŞ bırakılır — çünkü henüz hiçbir doğrulama yapılmadı.', en: 'Code is written, review is approved. The resolution field is left EMPTY still -- because no verification has happened yet.' } },
    { id: 2, icon: '❌', label: { tr: 'Yaygın hata: erken "Fixed"', en: 'Common mistake: early "Fixed"' }, detail: { tr: 'Bazı developer\'lar alışkanlıkla resolution\'ı "Ready for QA"ya geçerken "Fixed" yapar — bu, HENÜZ doğrulanmamış bir iddiayı kesin bir gerçek gibi kaydeder.', en: 'Some developers habitually set resolution to "Fixed" while moving to "Ready for QA" -- this records an UNVERIFIED claim as a settled fact.' } },
    { id: 3, icon: '🔍', label: { tr: 'QA doğrular', en: 'QA verifies' }, detail: { tr: 'Ayşe kabul kriterine göre test eder. Bu adımda resolution HÂLÂ Mert\'in erken yazdığı "Fixed" değerini taşıyor olabilir — yanıltıcı bir durum.', en: 'Ayse tests against the acceptance criterion. At this point resolution may STILL carry the "Fixed" value Mert set early -- a misleading state.' } },
    { id: 4, icon: '🔁', label: { tr: 'Doğrulama başarısız olursa', en: 'If verification fails' }, detail: { tr: 'Kayıt Reopened\'a döner ama resolution alanı hâlâ "Fixed" yazıyorsa, "resolution dolu = çözüldü" varsayımıyla çalışan bir rapor bu bug\'ı YANLIŞLIKLA çözülmüş sayar.', en: 'The record falls back to Reopened, but if resolution still reads "Fixed", a report that assumes "resolution filled = resolved" WRONGLY counts this bug as solved.' } },
    { id: 5, icon: '✅', label: { tr: 'Doğru sıra: resolution en son set edilir', en: 'The correct order: resolution is set last' }, detail: { tr: "Resolution yalnızca QA doğrulayıp Done'a taşırken set edilmelidir. Bu, resolution'ın \"bu iş bitti mi\" değil \"bu iş DOĞRULANARAK bitti mi\" sorusuna cevap vermesini sağlar.", en: 'Resolution should only be set when QA verifies and moves the record to Done. This makes resolution answer not "is this finished" but "was this finished AND VERIFIED".' } },
  ],
}

// ─── code-playground: verilen senaryoda doğru geçişi seç (GRUP E4) ────────────
const transitionDecisionPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-e2-typical-workflow',
  id: 'jira-e4-transition-decision',
  title: { tr: 'Kendin Dene: Doğru Geçişi Seç', en: 'Try It Yourself: Pick the Correct Transition' },
  starterCode: {
    tr: `Durum: Mert SHOP-142'nin kodunu bitirdi ama kod review'i henüz onaylanmadı.
Mert hangi geçişi yapmalı?

Mert -> "Ready for QA" geçişine tıklar.`,
    en: `Case: Mert finished the code for SHOP-142 but code review has not been approved yet.
Which transition should Mert perform?

Mert -> clicks the "Ready for QA" transition.`,
  },
  solutionCode: {
    tr: `Mert hiçbir geçiş YAPAMAZ — "Ready for QA" butonu review onayı olmadan
görünmez bile olur (Kurulum & İlk Proje sekmesindeki izin/koşul mantığıyla
aynı mekanizma). Doğru adım: review'in onaylanmasını beklemek, review
istemek için yorum bırakmak.`,
    en: `Mert CANNOT perform any transition -- the "Ready for QA" button does not
even render without review approval (the same permission/condition logic
from the Setup & First Project tab). The correct step: wait for the review
to be approved, leave a comment requesting it.`,
  },
  hint: {
    tr: "Az önceki akış diyagramını hatırla: \"Ready for QA\" bir KOŞULLU kapıdır (condition node). Koşul sağlanmadan geçiş görünmez bile — Kurulum & İlk Proje sekmesinde gördüğün izin şemasıyla aynı mekanizma.",
    en: 'Remember the flow diagram above: "Ready for QA" is a CONDITIONAL gate. Without the condition met, the transition does not even render -- the same mechanism you saw in the permission scheme on the Setup & First Project tab.',
  },
  successMessage: {
    tr: "Doğru! Bir workflow koşulu, izin şemasıyla aynı mantıkla çalışır — buton görünmez, hata mesajı yok. Bu, Kurulum & İlk Proje sekmesindeki \"görünmeyen buton çoğu zaman kasıtlıdır\" ilkesinin workflow katmanındaki karşılığıdır.",
    en: 'Correct! A workflow condition works with the same logic as the permission scheme -- the button is absent, no error message. This is the workflow-layer counterpart of the "a missing button is usually deliberate" principle from the Setup & First Project tab.',
  },
}

// ─── challenge (order-sort): workflow sırası (GRUP E) ──────────────────────────
const workflowOrderChallenge = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'jira-e-workflow-order',
  question: { tr: "Bir bug'ın normal akıştaki (Reopened olmadan) beş durumunu doğru sırayla diz.", en: "Order a bug's five statuses in the normal flow (without Reopened)." },
  items: [
    { id: '1', text: { tr: 'Open', en: 'Open' }, order: 1 },
    { id: '2', text: { tr: 'In Progress', en: 'In Progress' }, order: 2 },
    { id: '3', text: { tr: 'Ready for QA', en: 'Ready for QA' }, order: 3 },
    { id: '4', text: { tr: 'In QA', en: 'In QA' }, order: 4 },
    { id: '5', text: { tr: 'Done', en: 'Done' }, order: 5 },
  ],
  xpReward: 10,
}

// ─── code-playground: JQL ile reopen edilen bug'lar (GRUP F) ──────────────────
const reopenedJqlPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-f1-jql-basics',
  id: 'jira-f1-reopened-jql',
  title: { tr: 'Kendin Dene: Bu Sprintte Yeniden Açılan Bug\'ları Bul', en: 'Try It Yourself: Find the Bugs Reopened in This Sprint' },
  starterCode: {
    tr: `-- SHOP projesinde, açık sprintte, bir noktada Reopened durumuna DÜŞMÜŞ bug'lar.
-- Dikkat: şu anki durum değil, GEÇMİŞTE bu duruma girmiş olması aranıyor.
project = SHOP AND status = Reopened`,
    en: `-- Bugs in the SHOP project, in the open sprint, that WERE moved to Reopened at some point.
-- Careful: this is not the current status; you are looking for having ENTERED that status.
project = SHOP AND status = Reopened`,
  },
  solutionCode: {
    tr: `-- WAS geçmişe bakar: kayıt şu an Done olsa bile bir kez Reopened olduysa yakalanır
project = SHOP AND issuetype = Bug AND sprint in openSprints() AND status WAS Reopened ORDER BY created DESC`,
    en: `-- WAS looks at history: even if the record is Done now, it is caught if it was ever Reopened
project = SHOP AND issuetype = Bug AND sprint in openSprints() AND status WAS Reopened ORDER BY created DESC`,
  },
  hint: {
    tr: '"status = Reopened" yalnızca şu anda o durumda duran kayıtları getirir; sprint içinde reopen olup sonra kapananları kaçırır. Jira bir alanın GEÇMİŞTEKİ değerini sorgulamak için ayrı bir operatör sunar. Sprint filtresi için de bir fonksiyon var.',
    en: '"status = Reopened" only returns records sitting in that status right now; it misses the ones reopened and then closed within the sprint. Jira offers a separate operator to query a field\'s PAST value. There is a function for the sprint filter too.',
  },
  successMessage: {
    tr: 'Doğru! WAS operatörü kaydın geçmişini tarar. Bu ayrım bir metriğin doğruluğunu belirler: reopen oranını "status = Reopened" ile ölçen bir pano, sprint içinde reopen olup kapanan bug\'ları hiç saymaz ve kaliteyi olduğundan iyi gösterir.',
    en: 'Correct! The WAS operator scans the record\'s history. This distinction decides whether a metric is honest: a dashboard measuring reopen rate with "status = Reopened" never counts bugs reopened and closed within the sprint, and makes quality look better than it is.',
  },
}

// ─── Film: boş bir projeden ilk bug'a (GRUP B referans filmi) ─────────────────
const setupJourneyFilm = {
  type: 'video-scene',
  id: 'jira-b1-setup-journey-film',
  title: {
    tr: "🎬 Boş Bir Jira Projesinden İlk Bug'a",
    en: '🎬 From an Empty Jira Project to the First Bug',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'account', emoji: '👤', label: { tr: 'Yeni Hesap', en: 'New Account' }, color: '#0ea5e9' },
    { id: 'type', emoji: '🔀', label: { tr: 'Proje Tipi Kararı', en: 'Project Type Decision' }, color: '#f59e0b' },
    { id: 'project', emoji: '📁', label: { tr: 'SHOP Projesi', en: 'SHOP Project' }, color: '#8b5cf6' },
    { id: 'team', emoji: '👥', label: { tr: 'Ekip Davetleri', en: 'Team Invites' }, color: '#6366f1' },
    { id: 'perm', emoji: '🔐', label: { tr: 'İzin Şeması', en: 'Permission Scheme' }, color: '#ef4444' },
    { id: 'issue', emoji: '🐞', label: { tr: 'SHOP-1 (İlk Issue)', en: 'SHOP-1 (First Issue)' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Hesap az önce oluşturuldu, tek bir e-posta ve şifre. Ekranda boş bir alan var: henüz ne bir proje, ne bir issue. Bu filmde bu boşluktan ilk gerçek bug kaydına kadar giden yolu izleyeceksin.',
        en: 'The account was just created with one email and password. The screen is empty: no project yet, no issue. In this film you will follow the path from that empty state to the first real bug record.',
      },
      positions: { account: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: "Adım 1 — Proje tipi kararı: sistem \"team-managed mi, company-managed mi\" diye soruyor. Bu, geri alınması pahalı olan tek karar — tüm alanlar, workflow'lar ve raporlar bunun üzerine kurulacak.",
        en: 'Step 1 -- The project-type decision: the system asks "team-managed or company-managed?" This is the one decision that is expensive to undo -- every field, workflow and report will be built on top of it.',
      },
      code: { tr: 'team-managed  vs  company-managed', en: 'team-managed  vs  company-managed' },
      positions: {
        account: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        type: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'account', to: 'type' }],
    },
    {
      caption: {
        tr: "Adım 2 — Proje doğar: \"SHOP\" projesi ve anahtar öneki (SHOP) belirlenir. Bu önek artık her issue'nun kimliğinin ilk parçası olacak — bir daha kolayca değiştirilemez.",
        en: 'Step 2 -- The project is born: the "SHOP" project and its key prefix (SHOP) are set. That prefix will now be the first part of every issue\'s identity -- it cannot easily be changed afterward.',
      },
      code: { tr: 'Proje Anahtarı: SHOP', en: 'Project Key: SHOP' },
      positions: {
        type: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        project: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'type', to: 'project', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Adım 3 — Ekip davet edilir: Ayşe (QA), Mert (developer), Deniz (PO) projeye eklenir ve her birine bir rol atanır. Rol, kimin hangi geçişi yapabileceğinin ilk katmanıdır.",
        en: 'Step 3 -- The team is invited: Ayse (QA), Mert (developer) and Deniz (PO) are added to the project and each gets a role. Role is the first layer of who can perform which transition.',
      },
      positions: {
        project: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        team: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'project', to: 'team', color: '#6366f1' }],
    },
    {
      caption: {
        tr: 'Adım 4 — İzin şeması devreye girer: "Done" geçişini yalnızca QA rolü yapabilsin diye bir kural eklenir. Bu kural görünmez çalışır — Mert "Done" butonunu ekranında hiç görmeyecek.',
        en: 'Step 4 -- The permission scheme kicks in: a rule is added so only the QA role can perform the "Done" transition. This rule works invisibly -- Mert will never see the "Done" button on his screen at all.',
      },
      positions: {
        team: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        perm: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'team', to: 'perm', color: '#ef4444' }],
    },
    {
      caption: {
        tr: 'Final — Ayşe ilk bug\'ı kaydeder. Sistem otomatik olarak SHOP-1 anahtarını verir. Kurulumun her adımı (proje tipi, ekip, izin şeması) bu tek kaydın arkasında sessizce çalışıyor — kullanıcı hiçbirini görmez, ama hepsi oradadır.',
        en: 'Finale -- Ayse logs the first bug. The system automatically assigns the key SHOP-1. Every setup step (project type, team, permission scheme) works silently behind this single record -- the user sees none of them, yet all are there.',
      },
      code: { tr: 'SHOP-1 · Bug', en: 'SHOP-1 - Bug' },
      positions: {
        perm: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        issue: { x: 54, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'perm', to: 'issue', color: '#10b981' }],
    },
  ],
}

// ─── step-animation: hesap açma + doğrulama (GRUP B1) ─────────────────────────
const accountSetupSteps = {
  type: 'step-animation',
  id: 'jira-b1-account-setup-steps',
  title: { tr: 'Adım Adım: Ücretsiz Jira Cloud Hesabı Açma', en: 'Step by Step: Opening a Free Jira Cloud Account' },
  steps: [
    { id: 1, icon: '📧', label: { tr: 'E-posta ile kayıt', en: 'Sign up with email' }, detail: { tr: 'Atlassian hesabı e-posta + şifre ile açılır. Beklenen çıktı: gelen kutusuna bir doğrulama e-postası düşer.', en: 'The Atlassian account is created with email + password. Expected output: a verification email lands in the inbox.' } },
    { id: 2, icon: '✅', label: { tr: 'E-posta doğrulanır', en: 'Email is verified' }, detail: { tr: 'Doğrulama linkine tıklanır. Beklenen çıktı: tarayıcı Atlassian site adı seçim ekranına yönlenir (örn. shopqa.atlassian.net).', en: 'The verification link is clicked. Expected output: the browser redirects to the Atlassian site name selection screen (e.g. shopqa.atlassian.net).' } },
    { id: 3, icon: '🏢', label: { tr: 'Site adı belirlenir', en: 'Site name is chosen' }, detail: { tr: "Bu ad artık kalıcı bir URL parçasıdır. Doğrulama: adres çubuğunda `https://<ad>.atlassian.net` görünmeli.", en: 'This name is now a permanent part of the URL. Verification: the address bar should show `https://<name>.atlassian.net`.' } },
    { id: 4, icon: '📁', label: { tr: 'İlk proje oluşturulur', en: 'The first project is created' }, detail: { tr: 'Proje şablonu (Bug tracking / Scrum / Kanban) seçilir, proje anahtarı (SHOP) belirlenir. Doğrulama: sol menüde proje adı görünür.', en: 'A project template (Bug tracking / Scrum / Kanban) is picked, the project key (SHOP) is set. Verification: the project name appears in the left menu.' } },
    { id: 5, icon: '🚪', label: { tr: 'Boş panoya varılır', en: 'The empty board is reached' }, detail: { tr: 'Proje açılınca hiç kartı olmayan bir pano görünür. Beklenen çıktı: sütunlar var ama içleri boş — bu, kurulumun başarıyla bittiğinin kanıtıdır.', en: 'When the project opens, an empty board with no cards appears. Expected output: the columns exist but are empty -- this is the proof that setup finished successfully.' } },
  ],
}

// ─── table + callout: team-managed vs company-managed (GRUP B2) ───────────────
const projectTypeTable = {
  type: 'table',
  headers: [
    { tr: 'Boyut', en: 'Dimension' },
    { tr: 'Team-managed', en: 'Team-managed' },
    { tr: 'Company-managed', en: 'Company-managed' },
  ],
  rows: [
    [
      { tr: 'Kim yönetir', en: 'Who governs it' },
      { tr: 'Takımın kendisi (kısıtlı ayar)', en: 'The team itself (limited settings)' },
      { tr: 'Jira yöneticisi (merkezi şema)', en: 'The Jira administrator (central schemes)' },
    ],
    [
      { tr: 'Alanlar/workflow paylaşımı', en: 'Field/workflow sharing' },
      { tr: 'Projeye özel, başka projeyle paylaşılmaz', en: 'Project-specific, not shared with other projects' },
      { tr: 'Şema birden fazla projede paylaşılabilir', en: 'A scheme can be shared across multiple projects' },
    ],
    [
      { tr: 'Kurulum hızı', en: 'Setup speed' },
      { tr: 'Dakikalar içinde, onay gerekmez', en: 'Minutes, no approval needed' },
      { tr: 'Yönetici onayı ve şema tasarımı gerekir', en: 'Requires admin approval and scheme design' },
    ],
    [
      { tr: 'Uygun senaryo', en: 'Fits best when' },
      { tr: 'Tek takım, hızlı başlangıç, deneme', en: 'One team, fast start, experimentation' },
      { tr: 'Çoklu takım, uzun vadeli standart raporlama', en: 'Multiple teams, long-term standardized reporting' },
    ],
  ],
}

const projectTypeCallout = {
  type: 'callout',
  color: 'orange',
  emoji: '⚠️',
  title: { tr: 'Yanlış Seçersen Ne Olur?', en: 'What Happens If You Choose Wrong?' },
  content: {
    tr: "Team-managed ile başlayıp altı ay sonra üç takım daha eklenince \"company-managed'a geçelim\" demek basit bir ayar değişikliği DEĞİLDİR — alanlar, workflow'lar ve mevcut issue'lar elle taşınmalıdır, otomatik bir dönüştürme yoktur. Kararı ilk günden \"bu proje tek takımda mı kalacak, yoksa büyüyüp standart bir rapora mı girecek\" sorusuna göre ver.",
    en: 'Starting with team-managed and then, six months later when three more teams join, saying "let\'s switch to company-managed" is NOT a simple setting change -- fields, workflows and existing issues must be moved by hand, there is no automatic conversion. Make the call on day one based on the question "will this project stay with one team, or grow into a standardized report?"',
  },
}

// ─── code-playground: proje anahtarı/issue key üret (GRUP B4) ─────────────────
const issueKeyPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-b4-first-issue',
  id: 'jira-b4-issue-key',
  title: { tr: 'Kendin Dene: Doğru Proje Anahtarını Seç', en: 'Try It Yourself: Pick the Right Project Key' },
  starterCode: {
    tr: `Yeni proje: "ShopQA E-Ticaret Ödeme Sistemi"
Önerilen anahtar: SHOPQAECOMMERCEPAYMENTSYSTEM
İlk issue: SHOPQAECOMMERCEPAYMENTSYSTEM-1`,
    en: `New project: "ShopQA E-Commerce Payment System"
Proposed key: SHOPQAECOMMERCEPAYMENTSYSTEM
First issue: SHOPQAECOMMERCEPAYMENTSYSTEM-1`,
  },
  solutionCode: {
    tr: `Yeni proje: "ShopQA E-Ticaret Ödeme Sistemi"
Doğru anahtar: SHOP
İlk issue: SHOP-1`,
    en: `New project: "ShopQA E-Commerce Payment System"
Correct key: SHOP
First issue: SHOP-1`,
  },
  hint: {
    tr: "Proje anahtarı her commit mesajında, her issue başlığında ve her JQL sorgusunda elle yazılacak. Ne kadar uzunsa o kadar sık yazım hatası olur. İyi bir anahtar kısa (2-10 karakter), akılda kalıcı ve mevcut anahtarlarla çakışmayan bir kısaltmadır — tam isim değil.",
    en: 'The project key gets typed by hand in every commit message, every issue title, every JQL query. The longer it is, the more typos happen. A good key is a short (2-10 character), memorable abbreviation that does not collide with existing keys -- not the full name.',
  },
  successMessage: {
    tr: "Doğru! SHOP, projeyi tanımlayan en kısa akılda kalıcı kısaltmadır. Bu, otomasyonda değişken adı seçmekle aynı disiplin: `shopQaEcommercePaymentSystemCheckoutValidator` yerine `checkoutValidator` yazarsın — okunabilirlik uzunlukla değil netlikle artar.",
    en: 'Correct! SHOP is the shortest memorable abbreviation that identifies the project. This is the same discipline as naming a variable in automation: you write `checkoutValidator`, not `shopQaEcommercePaymentSystemCheckoutValidator` -- readability comes from clarity, not length.',
  },
}

// ─── challenge (order-sort): kurulum sırası (GRUP B) ───────────────────────────
const setupOrderChallenge = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'jira-b-setup-order',
  question: { tr: 'Boş bir hesaptan ilk bug kaydına giden beş adımı doğru sırayla diz.', en: 'Order the five steps from an empty account to the first bug record.' },
  items: [
    { id: '1', text: { tr: 'E-posta ile Atlassian hesabı açılır ve doğrulanır', en: 'An Atlassian account is created with email and verified' }, order: 1 },
    { id: '2', text: { tr: 'Proje tipi seçilir (team-managed / company-managed)', en: 'The project type is chosen (team-managed / company-managed)' }, order: 2 },
    { id: '3', text: { tr: 'Proje ve proje anahtarı oluşturulur (SHOP)', en: 'The project and its key are created (SHOP)' }, order: 3 },
    { id: '4', text: { tr: 'Ekip davet edilir ve rol atanır', en: 'The team is invited and roles are assigned' }, order: 4 },
    { id: '5', text: { tr: 'İlk issue kaydedilir ve anahtarını alır (SHOP-1)', en: 'The first issue is logged and receives its key (SHOP-1)' }, order: 5 },
  ],
  xpReward: 10,
}

// ─── Film: bir Epic'in altında bug nasıl doğar (GRUP C referans filmi) ────────
const epicToBugFilm = {
  type: 'video-scene',
  id: 'jira-c1-epic-to-bug-film',
  title: {
    tr: "🎬 Bir Epic'in Altında Bug Nasıl Doğar",
    en: '🎬 How a Bug Is Born Under an Epic',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'epic', emoji: '📐', label: { tr: 'Epic: SHOP-100', en: 'Epic: SHOP-100' }, color: '#8b5cf6' },
    { id: 'story', emoji: '📖', label: { tr: 'Story: SHOP-118', en: 'Story: SHOP-118' }, color: '#0ea5e9' },
    { id: 'subtask', emoji: '🔧', label: { tr: 'Sub-task', en: 'Sub-task' }, color: '#6366f1' },
    { id: 'shipped', emoji: '🚀', label: { tr: 'Canlıya Çıktı', en: 'Shipped' }, color: '#10b981' },
    { id: 'bug', emoji: '🐞', label: { tr: 'Bug: SHOP-142', en: 'Bug: SHOP-142' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: "Epic SHOP-100 — \"Ödeme Akışı Yenileme\" — büyük bir hedefi tarif ediyor, tek başına teslim edilemez. Bu filmde bu hedefin nasıl küçük parçalara bölündüğünü ve sonunda bir bug'ın nereden doğduğunu izleyeceksin.",
        en: 'Epic SHOP-100 -- "Checkout Flow Overhaul" -- describes a large goal that cannot be delivered on its own. In this film you will watch how that goal breaks into small pieces, and where a bug is eventually born from.',
      },
      positions: { epic: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: "Adım 1 — Epic bir Story'ye bölünür: SHOP-118 \"Kupon Kodu Uygulama\" teslim edilebilir tek bir parçadır. Bir Epic altında onlarca Story olabilir; her biri bağımsız teslim edilir.",
        en: 'Step 1 -- The Epic breaks into a Story: SHOP-118 "Apply Coupon Code" is one deliverable piece. An Epic can hold dozens of Stories; each is delivered independently.',
      },
      positions: {
        epic: { x: 22, y: 50, scale: 1.0 },
        story: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'epic', to: 'story', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Adım 2 — Story, Sub-task'lara bölünür: \"kupon alanı UI'ı\", \"backend indirim hesaplama\", \"e2e test\". Her Sub-task tek bir kişinin bir günde bitirebileceği somut bir iştir.",
        en: 'Step 2 -- The Story breaks into Sub-tasks: "coupon field UI", "backend discount calculation", "e2e test". Each Sub-task is a concrete piece of work one person can finish in a day.',
      },
      positions: {
        story: { x: 22, y: 50, scale: 1.0 },
        subtask: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'story', to: 'subtask', color: '#6366f1' }],
    },
    {
      caption: {
        tr: "Adım 3 — Tüm Sub-task'lar biter, Story Done olur, özellik canlıya çıkar. Hiyerarşi burada tamamlanmıştır — Epic → Story → Sub-task zinciri kapanmıştır.",
        en: 'Step 3 -- All Sub-tasks finish, the Story goes Done, the feature ships. The hierarchy is complete here -- the Epic to Story to Sub-task chain has closed.',
      },
      positions: {
        subtask: { x: 22, y: 50, scale: 1.0 },
        shipped: { x: 56, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'subtask', to: 'shipped', color: '#10b981' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — İki hafta sonra Ayşe canlı ortamda kupon indiriminin iki kez düştüğünü fark eder. SHOP-142 açılır — ama bu bug, hiyerarşinin İÇİNDE bir çocuk DEĞİLDİR; hiyerarşinin DIŞINDAN gelip Story'ye bir LINK ile bağlanır (\"caused by SHOP-118\"). Epic → Story → Sub-task planlanan işi anlatır; Bug ise planlanmamış, keşfedilen bir gerçeği anlatır — ikisi aynı ağaçta yaşamaz.",
        en: 'Finale (the contrast) -- Two weeks later Ayse notices in the live environment that the coupon discount is deducted twice. SHOP-142 is filed -- but this bug is NOT a child INSIDE the hierarchy; it arrives from OUTSIDE the hierarchy and attaches to the Story via a LINK ("caused by SHOP-118"). Epic to Story to Sub-task describes planned work; a Bug describes an unplanned, discovered reality -- the two do not live in the same tree.',
      },
      positions: {
        shipped: { x: 20, y: 32, scale: 0.9 },
        story: { x: 46, y: 55, scale: 1.0 },
        bug: { x: 74, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'shipped', to: 'bug', color: '#ef4444' }, { from: 'bug', to: 'story', color: '#ef4444' }],
    },
  ],
}

// ─── step-animation: hiyerarşinin kurulması (GRUP C1) ─────────────────────────
const hierarchyBuildSteps = {
  type: 'step-animation',
  id: 'jira-c1-hierarchy-build-steps',
  title: { tr: 'Adım Adım: Bir Hedef Nasıl Teslim Edilebilir Parçalara Bölünür?', en: 'Step by Step: How a Goal Breaks Into Deliverable Pieces' },
  steps: [
    { id: 1, icon: '📐', label: { tr: 'Epic: büyük hedef', en: 'Epic: the big goal' }, detail: { tr: "\"Ödeme Akışı Yenileme\" — tek başına test edilemeyecek, haftalarca sürecek bir hedef. Bir sprint'e sığmaz.", en: '"Checkout Flow Overhaul" -- a goal that cannot be tested on its own and takes weeks. It does not fit in one sprint.' } },
    { id: 2, icon: '📖', label: { tr: 'Story: teslim edilebilir dilim', en: 'Story: a deliverable slice' }, detail: { tr: '"Kupon Kodu Uygulama" — kullanıcıya değer katan, bir veya birkaç sprint\'te bitecek somut bir dilim.', en: '"Apply Coupon Code" -- a concrete slice that delivers user value and finishes within one or a few sprints.' } },
    { id: 3, icon: '🔧', label: { tr: 'Sub-task: bir günlük iş', en: 'Sub-task: a day of work' }, detail: { tr: '"Backend indirim hesaplama" — tek bir kişinin bir iş gününde bitirebileceği kadar küçük ve somut.', en: '"Backend discount calculation" -- small and concrete enough for one person to finish in a workday.' } },
    { id: 4, icon: '✅', label: { tr: "Sub-task'lar biter", en: 'Sub-tasks finish' }, detail: { tr: "Tüm alt işler Done olunca Story otomatik bitmez — QA'in doğrulaması gerekir; bu yüzden Story'nin kendi workflow'u vardır.", en: 'When all sub-work is Done the Story does not auto-finish -- QA verification is required; this is why the Story has its own workflow.' } },
    { id: 5, icon: '🚀', label: { tr: 'Story Done, Epic ilerler', en: 'Story is Done, Epic progresses' }, detail: { tr: "Bir Story bitince Epic'in ilerleme yüzdesi artar ama Epic henüz bitmemiştir — altında başka Story'ler duruyor olabilir.", en: "When a Story finishes, the Epic's progress percentage rises, but the Epic is not done yet -- other Stories may still sit under it." } },
  ],
}

// ─── table: issue tipi ↔ tipik alanlar (GRUP C2) ───────────────────────────────
const issueTypeFieldsTable = {
  type: 'table',
  headers: [
    { tr: 'Issue Tipi', en: 'Issue Type' },
    { tr: 'Kendine özgü alanlar', en: 'Fields specific to it' },
    { tr: 'Tipik ekran', en: 'Typical screen' },
  ],
  rows: [
    [
      { tr: 'Epic', en: 'Epic' },
      { tr: 'Epic Name, hedef tarih aralığı', en: 'Epic Name, target date range' },
      { tr: 'Roadmap görünümü', en: 'Roadmap view' },
    ],
    [
      { tr: 'Story', en: 'Story' },
      { tr: 'Story Points, Acceptance Criteria', en: 'Story Points, Acceptance Criteria' },
      { tr: 'Backlog / sprint planlama ekranı', en: 'Backlog / sprint planning screen' },
    ],
    [
      { tr: 'Bug', en: 'Bug' },
      { tr: 'Severity, Ortam, Tekrar Üretim Adımları', en: 'Severity, Environment, Reproduction Steps' },
      { tr: 'Bug raporu ekranı', en: 'Bug report screen' },
    ],
    [
      { tr: 'Sub-task', en: 'Sub-task' },
      { tr: 'Kalan süre tahmini (Original/Remaining Estimate)', en: 'Time estimate (Original/Remaining Estimate)' },
      { tr: "Ebeveyn issue'nun içinde küçük panel", en: 'A small panel inside the parent issue' },
    ],
  ],
}

// ─── code-playground: 5 iş kalemini doğru issue tipine eşleştir (GRUP C2) ─────
const issueTypeMatchPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-c2-bug-is-issue-type',
  id: 'jira-c2-issue-type-match',
  title: { tr: 'Kendin Dene: 5 İş Kalemini Doğru Issue Tipine Eşleştir', en: 'Try It Yourself: Match 5 Work Items to the Right Issue Type' },
  starterCode: {
    tr: `1. "Ödeme akışını tamamen yeniden tasarla" (3 ay sürecek)   -> ?
2. "Kullanıcı kupon kodu girebilsin"                        -> ?
3. "Kupon tutarı iki kez düşülüyor" (canlıda bulundu)        -> ?
4. "Kupon input alanının backend validasyonunu yaz"          -> ?
5. "Checkout API'sinde kupon parametresini test et"          -> ?`,
    en: `1. "Completely redesign the checkout flow" (will take 3 months) -> ?
2. "Let the user enter a coupon code"                            -> ?
3. "Coupon amount is deducted twice" (found live)                -> ?
4. "Write backend validation for the coupon input field"         -> ?
5. "Test the coupon parameter on the checkout API"                -> ?`,
  },
  solutionCode: {
    tr: `1. Epic     -- 3 ay, tek başına teslim edilemez, birden çok Story içerir
2. Story    -- kullanıcıya değer katan teslim edilebilir bir dilim
3. Bug      -- planlanmamış, canlıda keşfedilen bir sapma
4. Sub-task -- tek kişinin bir günde bitirebileceği somut iş, bir Story'ye bağlı
5. Sub-task -- test yazmak da Story'nin altındaki somut bir iştir`,
    en: `1. Epic     -- 3 months, cannot be delivered alone, contains multiple Stories
2. Story    -- a deliverable slice that gives the user value
3. Bug      -- an unplanned deviation discovered in production
4. Sub-task -- concrete, one-day work tied to a Story
5. Sub-task -- writing a test is also concrete work under a Story`,
  },
  hint: {
    tr: "Süreye bak: aylar sürüyorsa Epic'tir. Kullanıcıya doğrudan değer katıyorsa ve tek başına teslim edilebiliyorsa Story'dir. Planlanmamış, sistemin YANLIŞ davrandığı bir gözlemse Bug'dır. Bir günde bitecek somut, tek kişilik işse ve bir Story'nin altına bağlıysa Sub-task'tır.",
    en: 'Look at duration: months long means Epic. Directly delivers user value and can ship alone means Story. An unplanned observation that the system behaves WRONG means Bug. Concrete, one-person, one-day work tied under a Story means Sub-task.',
  },
  successMessage: {
    tr: 'Doğru! Süre ve "planlanmış mı, keşfedilmiş mi" sorusu dört tipi birbirinden ayırır. Bu ayrımı yanlış yapmak salt bir etiketleme hatası değildir — bu sekmenin başındaki filmde gördüğün gibi, "bu sprintte kaç bug çıktı" gibi bir metrik yanlış issue tipiyle sessizce bozulur.',
    en: 'Correct! Duration and the question "was this planned, or discovered" separate the four types. Getting this wrong is not just a labeling mistake -- as the film at the top of this tab showed, a metric like "how many bugs came out of this sprint" is silently corrupted by the wrong issue type.',
  },
}

// ─── table: link tipleri ve sprint planlamasına etkisi (GRUP C4) ──────────────
const linkTypesTable = {
  type: 'table',
  headers: [
    { tr: 'Link Tipi', en: 'Link Type' },
    { tr: 'Anlamı', en: 'Meaning' },
    { tr: 'Yanlış kullanılırsa sprint planlamasında ne bozulur', en: 'What breaks in sprint planning if misused' },
  ],
  rows: [
    [
      { tr: 'blocks / is blocked by', en: 'blocks / is blocked by' },
      { tr: "Bu issue diğeri bitmeden başlayamaz", en: 'This issue cannot start before the other finishes' },
      { tr: "Yanlış yöne link atılırsa (blocks yerine is blocked by) planlama sırası TERSİNE döner", en: 'If linked in the wrong direction (blocks instead of is blocked by) the planning order INVERTS' },
    ],
    [
      { tr: 'duplicates', en: 'duplicates' },
      { tr: 'Aynı sorunun ikinci bir kaydı', en: 'A second record of the same problem' },
      { tr: "Link atılmazsa aynı bug iki kez sayılır, kalite metrikleri şişer", en: 'Without the link the same bug is counted twice, inflating quality metrics' },
    ],
    [
      { tr: 'relates to', en: 'relates to' },
      { tr: 'Gevşek bir ilişki, bağımlılık DEĞİL', en: 'A loose relationship, NOT a dependency' },
      { tr: '"blocks" yerine kullanılırsa gerçek bir bağımlılık planlamada hiç görünmez', en: 'Used instead of "blocks", a real dependency never surfaces in planning' },
    ],
    [
      { tr: 'caused by / causes', en: 'caused by / causes' },
      { tr: "Bug'ı doğuran Story'ye işaret eder", en: 'Points to the Story that caused the bug' },
      { tr: "Link eksikse izlenebilirlik zinciri kopar", en: 'A missing link breaks the traceability chain' },
    ],
  ],
}

// ─── challenge (order-sort): hiyerarşiyi diz (GRUP C) ──────────────────────────
const hierarchyOrderChallenge = {
  type: 'challenge',
  variant: 'order-sort',
  id: 'jira-c-hierarchy-order',
  question: { tr: "Hiyerarşiyi en genişten en dara doğru sırala.", en: 'Order the hierarchy from broadest to narrowest.' },
  items: [
    { id: '1', text: { tr: 'Epic (aylar süren büyük hedef)', en: 'Epic (a months-long big goal)' }, order: 1 },
    { id: '2', text: { tr: 'Story (teslim edilebilir dilim)', en: 'Story (a deliverable slice)' }, order: 2 },
    { id: '3', text: { tr: 'Sub-task (bir günlük somut iş)', en: 'Sub-task (a day of concrete work)' }, order: 3 },
  ],
  xpReward: 10,
}

// ─── Film: bir JQL sorgusunun Jira'yı nasıl süzdüğü (GRUP F referans filmi) ───
const jqlFilterFilm = {
  type: 'video-scene',
  id: 'jira-f1-jql-filter-film',
  title: {
    tr: "🎬 Bir JQL Sorgusunun Jira'yı Nasıl Süzdüğü",
    en: '🎬 How a JQL Query Filters Jira',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'query', emoji: '⌨️', label: { tr: 'JQL Sorgusu', en: 'JQL Query' }, color: '#0ea5e9' },
    { id: 'pool', emoji: '🗂️', label: { tr: 'Tüm Issue\'lar (2.400)', en: 'All Issues (2,400)' }, color: '#64748b' },
    { id: 'field', emoji: '🔎', label: { tr: 'Alan Eşleşmesi', en: 'Field Match' }, color: '#f59e0b' },
    { id: 'filtered', emoji: '🧮', label: { tr: 'Süzülmüş Küme (18)', en: 'Filtered Set (18)' }, color: '#8b5cf6' },
    { id: 'ordered', emoji: '📋', label: { tr: 'Sıralı Sonuç', en: 'Ordered Result' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: "SHOP projesinde 2.400 issue var. Ayşe her sabah panoya tek tek bakmak yerine bir cümle yazıyor: \"bana atanmış, açık, yüksek öncelikli bug'lar\". Bu filmde bu cümlenin arkasında ne olduğunu izleyeceksin.",
        en: 'The SHOP project holds 2,400 issues. Instead of scanning the board card by card every morning, Ayse writes one sentence: "open, high-priority bugs assigned to me". In this film you will watch what happens behind that sentence.',
      },
      positions: { pool: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Sorgu yazılır: `project = SHOP AND issuetype = Bug AND status != Done AND assignee = currentUser() AND priority = High`. Her `AND` bir SÜZGEÇ katmanı ekler, kümeyi daraltır.',
        en: 'Step 1 -- The query is written: `project = SHOP AND issuetype = Bug AND status != Done AND assignee = currentUser() AND priority = High`. Each `AND` adds a FILTER layer, narrowing the set.',
      },
      code: { tr: 'project = SHOP AND issuetype = Bug AND status != Done\nAND assignee = currentUser() AND priority = High', en: 'project = SHOP AND issuetype = Bug AND status != Done\nAND assignee = currentUser() AND priority = High' },
      positions: {
        pool: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        query: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'pool', to: 'query' }],
    },
    {
      caption: {
        tr: "Adım 2 — Jira her koşulu sırayla 2.400 issue'nun alanlarına uygular: önce `project`, sonra `issuetype`, sonra `status`, sonra `assignee`, en son `priority`. Her koşulda küme küçülür, hiçbir issue'nun İÇERİĞİ değişmez — yalnızca GÖRÜNÜRLÜK filtrelenir.",
        en: "Step 2 -- Jira applies each condition against the fields of all 2,400 issues, in order: first `project`, then `issuetype`, then `status`, then `assignee`, finally `priority`. The set shrinks at each condition; no issue's CONTENT changes -- only VISIBILITY is filtered.",
      },
      positions: {
        query: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        field: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'query', to: 'field', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: "Adım 3 — Beş koşuldan sağ çıkan 18 issue kalır. Bu, JQL'in bir veritabanı JOIN'i YAPMADIĞINI hatırlatan bir andır: hepsi TEK bir varlık (issue) üzerindeki alanlar, başka bir issue'nun alanına bakılmaz.",
        en: "Step 3 -- 18 issues survive all five conditions. This is a moment that reminds you JQL does NOT perform a database JOIN: everything is a field on a SINGLE entity (the issue), no field of another issue is ever consulted.",
      },
      positions: {
        field: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        filtered: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'field', to: 'filtered', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Final — `ORDER BY priority DESC, created ASC` eklenince 18 issue Ayşe'nin göreceği SIRAYA girer: en yüksek öncelikli en üstte, aynı öncelikte olanlar en eski oluşturulandan başlar. Panoda hiç görünmeyen bu liste artık Ayşe'nin sabah rutini oldu.",
        en: 'Finale -- Adding `ORDER BY priority DESC, created ASC` puts the 18 issues into the ORDER Ayse will see them in: highest priority first, and among equal priorities the oldest created comes first. This list, never visible on any board, is now Ayse\'s morning routine.',
      },
      code: { tr: 'ORDER BY priority DESC, created ASC', en: 'ORDER BY priority DESC, created ASC' },
      positions: {
        filtered: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        ordered: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'filtered', to: 'ordered', color: '#10b981' }],
    },
  ],
}

// ─── table: JQL vs SQL (GRUP F1) ───────────────────────────────────────────────
const jqlVsSqlTable = {
  type: 'table',
  headers: [
    { tr: 'Kavram', en: 'Concept' },
    { tr: 'SQL', en: 'SQL' },
    { tr: 'JQL', en: 'JQL' },
  ],
  rows: [
    [
      { tr: 'Alan seçme', en: 'Selecting fields' },
      { tr: '`SELECT kolon FROM tablo`', en: '`SELECT column FROM table`' },
      { tr: 'Yok — JQL her zaman TÜM alanları döner, sadece HANGİ issue\'ları döneceğini filtreler', en: 'None -- JQL always returns ALL fields, it only filters WHICH issues come back' },
    ],
    [
      { tr: 'Koşul', en: 'Condition' },
      { tr: '`WHERE kolon = deger`', en: '`WHERE column = value`' },
      { tr: '`alan = deger` (WHERE kelimesi yok, doğrudan yazılır)', en: '`field = value` (no WHERE keyword, written directly)' },
    ],
    [
      { tr: 'Sıralama', en: 'Ordering' },
      { tr: '`ORDER BY`', en: '`ORDER BY`' },
      { tr: '`ORDER BY` (aynı sözdizimi)', en: '`ORDER BY` (identical syntax)' },
    ],
    [
      { tr: 'Birden çok tabloyu birleştirme', en: 'Combining multiple tables' },
      { tr: '`JOIN` ile başka tablonun alanına bakılır', en: '`JOIN` reads a field on another table' },
      { tr: "YOK — bir issue'nun linkli olduğu başka issue'nun alanına DOĞRUDAN bakılamaz", en: 'NONE -- a field on another linked issue cannot be read DIRECTLY' },
    ],
  ],
}

// ─── table: operatörler ve zaman fonksiyonları (GRUP F2) ──────────────────────
const jqlOperatorsTable = {
  type: 'table',
  headers: [
    { tr: 'Operatör/Fonksiyon', en: 'Operator/Function' },
    { tr: 'Anlamı', en: 'Meaning' },
    { tr: 'Örnek', en: 'Example' },
  ],
  rows: [
    [
      { tr: '`=` / `!=`', en: '`=` / `!=`' },
      { tr: 'Tam eşitlik / eşit değil', en: 'Exact equality / not equal' },
      { tr: '`status != Done`', en: '`status != Done`' },
    ],
    [
      { tr: '`IN`', en: '`IN`' },
      { tr: 'Birden çok değerden biri', en: 'One of multiple values' },
      { tr: '`priority IN (High, Highest)`', en: '`priority IN (High, Highest)`' },
    ],
    [
      { tr: '`~`', en: '`~`' },
      { tr: 'Metin içinde arama (contains)', en: 'Text search (contains)' },
      { tr: '`summary ~ "kupon"`', en: '`summary ~ "coupon"`' },
    ],
    [
      { tr: '`WAS`', en: '`WAS`' },
      { tr: "Bir alanın GEÇMİŞTE bu değeri taşıdığı", en: 'The field HELD this value in the past' },
      { tr: '`status WAS Reopened`', en: '`status WAS Reopened`' },
    ],
    [
      { tr: '`CHANGED`', en: '`CHANGED`' },
      { tr: 'Bir alan ne zaman değişti', en: 'When a field changed' },
      { tr: '`status CHANGED AFTER -7d`', en: '`status CHANGED AFTER -7d`' },
    ],
    [
      { tr: '`-7d` / `-30m`', en: '`-7d` / `-30m`' },
      { tr: 'Göreli zaman (7 gün önce / 30 dakika önce)', en: 'Relative time (7 days ago / 30 minutes ago)' },
      { tr: '`updated <= -7d`', en: '`updated <= -7d`' },
    ],
    [
      { tr: '`startOfDay()` / `startOfSprint()`', en: '`startOfDay()` / `startOfSprint()`' },
      { tr: 'Günün/sprintin başlangıcı — koşuma göre kayan zaman', en: "The start of the day/sprint -- time that shifts with the run" },
      { tr: '`created >= startOfDay()`', en: '`created >= startOfDay()`' },
    ],
  ],
}

// ─── step-animation: bir koşulun sırayla değerlendirilmesi (GRUP F2) ──────────
const jqlEvaluationSteps = {
  type: 'step-animation',
  id: 'jira-f2-jql-evaluation-steps',
  title: { tr: 'Adım Adım: JQL Koşulları Hangi Sırayla Değerlendirilir?', en: 'Step by Step: In Which Order Are JQL Conditions Evaluated?' },
  steps: [
    { id: 1, icon: '📦', label: { tr: 'Tüm issue havuzu', en: 'The full issue pool' }, detail: { tr: "Jira, koşulu erişimin olduğu TÜM projelerdeki TÜM issue'lara karşı değerlendirmeye başlar.", en: "Jira starts evaluating the condition against ALL issues in ALL projects you have access to." } },
    { id: 2, icon: '1️⃣', label: { tr: 'İlk AND koşulu', en: 'The first AND condition' }, detail: { tr: '`project = SHOP` — yalnızca bu koşulu sağlayan issue\'lar bir sonraki koşula geçer, geri kalanı elenir.', en: '`project = SHOP` -- only issues satisfying this condition move to the next; the rest are eliminated.' } },
    { id: 3, icon: '2️⃣', label: { tr: 'İkinci AND koşulu', en: 'The second AND condition' }, detail: { tr: "`status != Done` — bir önceki adımdan kalan küme üzerinde çalışır, tüm havuz üzerinde DEĞİL.", en: '`status != Done` -- operates on the set surviving the previous step, NOT on the whole pool again.' } },
    { id: 4, icon: '⏱️', label: { tr: 'Zaman fonksiyonu çözülür', en: 'The time function resolves' }, detail: { tr: "`updated <= -7d` gibi bir koşulda `-7d`, sorgunun ÇALIŞTIRILDIĞI ana göre hesaplanır — kaydedilmiş bir filtrede bu her koşumda YENİDEN hesaplanır.", en: 'In a condition like `updated <= -7d`, `-7d` is computed relative to the moment the query RUNS -- in a saved filter this is RECOMPUTED on every run.' } },
    { id: 5, icon: '📋', label: { tr: 'ORDER BY son adımdır', en: 'ORDER BY is the last step' }, detail: { tr: 'Tüm filtreleme bittikten SONRA sıralama uygulanır — sıralama küme büyüklüğünü değiştirmez, yalnızca DİZİLİŞİ belirler.', en: 'Ordering is applied AFTER all filtering finishes -- it does not change the set size, only the ARRANGEMENT.' } },
  ],
}

// ─── code-playground: zaman fonksiyonuyla sorgu yaz (GRUP F2/F3) ──────────────
const staleIssuesJqlPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-f1-jql-basics',
  id: 'jira-f2-time-function-jql',
  title: { tr: "Kendin Dene: 30 Gündür Dokunulmamış Bug'ları Bul", en: "Try It Yourself: Find Bugs Untouched for 30 Days" },
  starterCode: {
    tr: `-- SHOP projesindeki açık bug'lardan, son 30 gündür HİÇ güncellenmemiş olanları bul.
project = SHOP AND issuetype = Bug AND status != Done`,
    en: `-- Find open bugs in the SHOP project that have NOT been updated in the last 30 days.
project = SHOP AND issuetype = Bug AND status != Done`,
  },
  solutionCode: {
    tr: `-- updated alanı son değişiklik zamanını taşır; <= -30d "30 günden eski" demektir
project = SHOP AND issuetype = Bug AND status != Done AND updated <= -30d ORDER BY updated ASC`,
    en: `-- the updated field carries the last change time; <= -30d means "older than 30 days"
project = SHOP AND issuetype = Bug AND status != Done AND updated <= -30d ORDER BY updated ASC`,
  },
  hint: {
    tr: "\"Dokunulmamış\" kelimesi bir alanın SON DEĞİŞİM zamanına işaret eder — bu, `created` değil `updated` alanıdır. Göreli zaman için `-30d` sözdizimini kullan; `<=` \"bu tarihten daha eski\" demektir.",
    en: 'The word "untouched" points to a field\'s LAST CHANGE time -- that is `updated`, not `created`. Use the `-30d` syntax for relative time; `<=` means "older than this date".',
  },
  successMessage: {
    tr: "Doğru! `updated <= -30d` unutulmuş kayıtları yakalar. `ORDER BY updated ASC` ile en uzun süredir dokunulmayanlar en üstte çıkar — bu tam olarak filmde gördüğün \"süzme + sıralama\" ikilisidir.",
    en: 'Correct! `updated <= -30d` catches forgotten records. `ORDER BY updated ASC` puts the longest-untouched ones on top -- exactly the "filter plus order" pair you saw in the film.',
  },
}

// ─── code-playground: kaydedilmiş filtre/abonelik sorgusu (GRUP F4) ───────────
const savedFilterJqlPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-f1-jql-basics',
  id: 'jira-f4-saved-filter-jql',
  title: { tr: 'Kendin Dene: Haftalık "Üretime Sızan Bug\'lar" Aboneliği', en: 'Try It Yourself: A Weekly "Bugs Leaked to Production" Subscription' },
  starterCode: {
    tr: `-- Her Pazartesi e-postayla gelecek bir abonelik için sorgu yaz:
-- SHOP projesinde, "production" etiketli, son 7 günde açılan bug'lar.
project = SHOP AND labels = production`,
    en: `-- Write the query for a subscription that emails every Monday:
-- Bugs in SHOP labeled "production", created in the last 7 days.
project = SHOP AND labels = production`,
  },
  solutionCode: {
    tr: `project = SHOP AND issuetype = Bug AND labels = production AND created >= -7d ORDER BY created DESC`,
    en: `project = SHOP AND issuetype = Bug AND labels = production AND created >= -7d ORDER BY created DESC`,
  },
  hint: {
    tr: "Abonelik her Pazartesi ÇALIŞTIRILACAĞI için sabit bir tarih yazamazsın — göreli zaman (`-7d`) kullan ki sorgu her koşumda kendini güncellesin. `issuetype = Bug` eklemeyi unutma, yoksa Story/Task'lar da listeye karışır.",
    en: 'Since the subscription RUNS every Monday, you cannot write a fixed date -- use relative time (`-7d`) so the query updates itself on every run. Do not forget `issuetype = Bug`, otherwise Stories/Tasks mix into the list too.',
  },
  successMessage: {
    tr: "Doğru! Bir kaydedilmiş filtre + abonelik, bu sorguyu HAFTADA BİR otomatik koşturur ve sonucu e-postayla gönderir — panoya bakmayı beklemek yerine veri sana gelir. Bu filtre bir board'a da dönüştürülebilir: aynı JQL, farklı bir görünüm.",
    en: 'Correct! A saved filter plus subscription runs this query automatically ONCE A WEEK and emails the result -- instead of waiting to check a board, the data comes to you. This filter can also become a board: same JQL, a different view.',
  },
}

// ─── Film: bir iş kaleminin backlog'dan panoya yolculuğu (GRUP G referans filmi) ─
const backlogToBoardFilm = {
  type: 'video-scene',
  id: 'jira-g1-backlog-to-board-film',
  title: {
    tr: "🎬 Bir İş Kaleminin Backlog'dan Panoya Yolculuğu",
    en: '🎬 The Journey of a Work Item From Backlog to Board',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'backlog', emoji: '📚', label: { tr: 'Backlog (200+ öğe)', en: 'Backlog (200+ items)' }, color: '#64748b' },
    { id: 'groomed', emoji: '🔍', label: { tr: 'Groomed: SHOP-118', en: 'Groomed: SHOP-118' }, color: '#f59e0b' },
    { id: 'planning', emoji: '🗓️', label: { tr: 'Sprint Planning', en: 'Sprint Planning' }, color: '#8b5cf6' },
    { id: 'board', emoji: '📋', label: { tr: 'Sprint Panosu', en: 'Sprint Board' }, color: '#0ea5e9' },
    { id: 'review', emoji: '📊', label: { tr: 'Sprint Review: Velocity', en: 'Sprint Review: Velocity' }, color: '#10b981' },
    { id: 'stuck', emoji: '🧊', label: { tr: 'Donmuş Kart', en: 'Stuck Card' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: "SHOP-118 \"Kupon Kodu Uygulama\", 200'den fazla öğenin bulunduğu backlog'da ham bir fikir olarak duruyor — henüz tahmin edilmemiş, kabul kriteri yazılmamış. Bu filmde bu ham fikrin panoya kadar giden yolunu izleyeceksin.",
        en: 'SHOP-118 "Apply Coupon Code" sits as a raw idea in a backlog of over 200 items -- not yet estimated, no acceptance criteria written. In this film you will follow this raw idea\'s path all the way to the board.',
      },
      positions: { backlog: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Grooming (refinement): takım ve PO birlikte oturur, story point tahmini yapar (5 puan) ve kabul kriterini yazar: "Bir kupon sipariş başına bir kez uygulanır". Bu adım atlanırsa kartın panoda NE ZAMAN biteceği tahmin edilemez.',
        en: 'Step 1 -- Grooming (refinement): the team and PO sit together, estimate story points (5 points) and write the acceptance criterion: "A coupon is applied once per order". Skip this step and you cannot predict WHEN the card will finish on the board.',
      },
      positions: {
        backlog: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        groomed: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'backlog', to: 'groomed', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: "Adım 2 — Sprint Planning: takım kapasitesine (bu sprint için 30 puan) göre backlog'dan öğe seçer. SHOP-118'in 5 puanı kapasiteye sığar, sprint'e alınır. Tahmin edilmemiş bir öğe bu adımda seçilemez — kimse ne kadar süreceğini bilmez.",
        en: 'Step 2 -- Sprint Planning: the team pulls items from the backlog according to capacity (30 points for this sprint). SHOP-118\'s 5 points fit the capacity, it is pulled into the sprint. An unestimated item cannot be selected here -- nobody knows how long it will take.',
      },
      positions: {
        groomed: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        planning: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'groomed', to: 'planning', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Adım 3 — Sprint başlar, SHOP-118 panoda bir kart olarak belirir. Kart sütunlar arasında ilerler: To Do → In Progress → Ready for QA → In QA → Done. Kabul kriteri sayesinde QA'in \"bu bitti mi\" sorusunun cevabı NETTİR.",
        en: 'Step 3 -- The sprint starts, SHOP-118 appears as a card on the board. The card moves through columns: To Do to In Progress to Ready for QA to In QA to Done. Thanks to the acceptance criterion, QA\'s answer to "is this finished" is CLEAR.',
      },
      positions: {
        planning: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        board: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'planning', to: 'board', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 4 — Sprint Review: kart Done sütununa ulaştı, 5 puan takımın velocity\'sine eklendi. Bu sayı bir sonraki sprintin kapasitesini tahmin etmek için kullanılacak — tek bir kartın yolculuğu artık bir veri noktası.',
        en: 'Step 4 -- Sprint Review: the card reached the Done column, 5 points are added to the team\'s velocity. This number will be used to estimate next sprint\'s capacity -- one card\'s journey is now a data point.',
      },
      positions: {
        board: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        review: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'board', to: 'review', color: '#10b981' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — Grooming'i atlayıp doğrudan sprint'e alınan bir başka kart hayal et: kabul kriteri yok, kimse ne kadar süreceğini bilmiyor. Kart \"In Progress\" sütununda GÜNLERCE donar — developer neyin \"bitti\" sayılacağını bilmediği için ilerleyemez. Grooming atlanan bir adım değil, panonun akıcılığının ÖN KOŞULUDUR.",
        en: 'Finale (the contrast) -- Picture another card pulled straight into the sprint, skipping grooming: no acceptance criterion, nobody knows how long it takes. The card FREEZES in the "In Progress" column for DAYS -- the developer cannot move forward not knowing what counts as "done". Grooming is not a skippable step, it is the PRECONDITION for a flowing board.',
      },
      positions: {
        review: { x: 20, y: 32, scale: 0.9 },
        stuck: { x: 60, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'review', to: 'stuck', color: '#ef4444' }],
    },
  ],
}

// ─── table: Scrum board vs Kanban board (GRUP G2) ──────────────────────────────
const scrumVsKanbanTable = {
  type: 'table',
  headers: [
    { tr: 'Boyut', en: 'Dimension' },
    { tr: 'Scrum Board', en: 'Scrum Board' },
    { tr: 'Kanban Board', en: 'Kanban Board' },
  ],
  rows: [
    [
      { tr: 'Zaman kutusu', en: 'Time box' },
      { tr: "Sabit süreli sprint'ler (örn. 2 hafta)", en: 'Fixed-length sprints (e.g. 2 weeks)' },
      { tr: 'Sürekli akış, sprint yok', en: 'Continuous flow, no sprints' },
    ],
    [
      { tr: 'Pano her koşumda', en: 'The board on each cycle' },
      { tr: 'Sıfırlanır — yeni sprint yeni kartlarla başlar', en: 'Resets -- a new sprint starts with fresh cards' },
      { tr: 'Sıfırlanmaz — kartlar sürekli akar', en: 'Never resets -- cards flow continuously' },
    ],
    [
      { tr: 'Öngörülebilirlik metriği', en: 'Predictability metric' },
      { tr: 'Velocity (sprint başına tamamlanan puan)', en: 'Velocity (points completed per sprint)' },
      { tr: 'Cycle time (bir kartın ortalama bitirme süresi)', en: 'Cycle time (average time a card takes to finish)' },
    ],
    [
      { tr: 'Uygun senaryo', en: 'Fits best when' },
      { tr: 'Planlanabilir, tahmin edilebilir bir iş akışı (özellik geliştirme)', en: 'Plannable, estimable work (feature development)' },
      { tr: 'Öngörülemeyen, kesintisiz gelen iş (destek, üretim bug\'ları)', en: 'Unpredictable, continuously arriving work (support, production bugs)' },
    ],
  ],
}

// ─── code-playground: board hızlı filtresi yaz (GRUP G3) ──────────────────────
const quickFilterPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-g3-board-configuration',
  id: 'jira-g3-quick-filter',
  title: { tr: "Kendin Dene: \"Sadece Benim Bug'larım\" Hızlı Filtresini Yaz", en: 'Try It Yourself: Write the "Only My Bugs" Quick Filter' },
  starterCode: {
    tr: `-- Panoda bir hızlı filtre butonu istiyorsun: yalnızca SANA atanmış Bug'ları göstersin.
-- Diğer issue tipleri ve başkalarına atanmış kartlar gizlenmeli.
issuetype = Bug`,
    en: `-- You want a quick filter button on the board: show only Bugs assigned to YOU.
-- Other issue types and cards assigned to others should hide.
issuetype = Bug`,
  },
  solutionCode: {
    tr: `-- Hızlı filtreler tam bir JQL parçasıdır, panonun kendi sorgusuyla AND'lenir
issuetype = Bug AND assignee = currentUser()`,
    en: `-- Quick filters are full JQL fragments, ANDed with the board's own query
issuetype = Bug AND assignee = currentUser()`,
  },
  hint: {
    tr: "Hızlı filtreler F sekmesinde öğrendiğin JQL'in ta kendisidir — panonun ARKA PLANDAKİ sorgusuna ek bir AND koşulu olarak eklenir. \"Sana atanmış\" ifadesi bir kullanıcı adı sabit yazmakla değil, kişiye göre kendini çözen bir fonksiyonla ifade edilir.",
    en: 'Quick filters ARE the JQL you learned on the JQL tab -- they get added as an extra AND condition to the board\'s underlying query. "Assigned to you" is expressed not by hardcoding a username but by a function that resolves itself per person.',
  },
  successMessage: {
    tr: "Doğru! Bir hızlı filtre, panonun sorgusuna EKLENEN bir JQL parçasıdır — bu yüzden JQL'i öğrenmek yalnızca arama kutusunda değil, panonun kendisinde de işine yarar.",
    en: 'Correct! A quick filter is a JQL fragment ADDED to the board\'s query -- this is why learning JQL pays off not just in the search box, but on the board itself.',
  },
}

// ─── step-animation: WIP limitinin darboğazı ortaya çıkarması (GRUP G4) ───────
const wipBottleneckSteps = {
  type: 'step-animation',
  id: 'jira-g4-wip-bottleneck-steps',
  title: { tr: 'Adım Adım: WIP Limiti Bir Darboğazı Nasıl Görünür Kılar?', en: 'Step by Step: How Does a WIP Limit Make a Bottleneck Visible?' },
  steps: [
    { id: 1, icon: '🚦', label: { tr: '"In QA" sütununa 3 kart limiti konur', en: 'A limit of 3 cards is set on "In QA"' }, detail: { tr: "Takım, QA'in aynı anda en fazla 3 kartı doğrulayabildiğini biliyor ve bu gerçeği panoya sayısal bir kural olarak yazıyor.", en: "The team knows QA can verify at most 3 cards at once, and writes that reality into the board as a numeric rule." } },
    { id: 2, icon: '➕', label: { tr: '4. kart "In QA"ya girmeye çalışır', en: 'A 4th card tries to enter "In QA"' }, detail: { tr: "Developer'lar hızlı çalışıp art arda üç kartı daha \"Ready for QA\"dan \"In QA\"ya taşımak istiyor — ama sütun DOLU.", en: 'Developers work fast and want to move three more cards from "Ready for QA" into "In QA" -- but the column is FULL.' } },
    { id: 3, icon: '🛑', label: { tr: 'Jira geçişi engeller', en: 'Jira blocks the move' }, detail: { tr: "WIP limiti aşıldığında pano bunu GÖRSEL olarak işaretler (sütun kırmızıya döner) — kural bir öneri değil, uygulanan bir kısıttır.", en: 'When the WIP limit is exceeded the board flags it VISUALLY (the column turns red) -- the rule is not a suggestion, it is an enforced constraint.' } },
    { id: 4, icon: '👀', label: { tr: 'Takım nedeni sorar', en: 'The team asks why' }, detail: { tr: "Sütun sürekli dolu kalıyorsa bu bir tesadüf değildir: QA kapasitesi geliştirme hızının GERİSİNDE kalmış demektir — retrospektifte tartışılacak somut bir sinyal.", en: 'If the column stays full constantly, this is not a coincidence: it means QA capacity is trailing development speed -- a concrete signal to discuss in the retrospective.' } },
    { id: 5, icon: '⚖️', label: { tr: 'Takım kapasiteyi dengeler', en: 'The team rebalances capacity' }, detail: { tr: "Çözüm daha hızlı test etmek DEĞİL, akışı dengelemektir: bir developer geçici olarak test yazımına yardım edebilir ya da geliştirme hızı bilinçli yavaşlatılabilir.", en: 'The fix is not testing faster, it is balancing the flow: a developer might temporarily help write tests, or development speed is deliberately slowed.' } },
  ],
}

// ─── table: sprint ritüelleri ve QA'in getirdiği veri (GRUP G5) ───────────────
const sprintRitualsTable = {
  type: 'table',
  headers: [
    { tr: 'Ritüel', en: 'Ritual' },
    { tr: "QA'in getirdiği veri", en: 'The data QA brings' },
  ],
  rows: [
    [
      { tr: 'Sprint Planning', en: 'Sprint Planning' },
      { tr: 'Test edilebilirlik tahmini: bu iş kaç puan test sürer, hangi ortam gerekir', en: 'Testability estimate: how many points of testing this takes, which environment it needs' },
    ],
    [
      { tr: 'Daily Standup', en: 'Daily Standup' },
      { tr: 'Blocker: "SHOP-142 test ortamında kırık, kimse ilerleyemiyor"', en: 'Blocker: "SHOP-142 is broken in the test environment, nobody can proceed"' },
    ],
    [
      { tr: 'Sprint Review', en: 'Sprint Review' },
      { tr: "Kalite verisi: bu sprintte kaç bug bulundu, kaçı üretime sızdı", en: 'Quality data: how many bugs were found this sprint, how many leaked to production' },
    ],
    [
      { tr: 'Retrospektif', en: 'Retrospective' },
      { tr: 'Darboğaz verisi: "In QA" sütununda ortalama bekleme süresi ne kadar arttı', en: 'Bottleneck data: how much the average wait time in "In QA" increased' },
    ],
  ],
}

// ─── Film: bir test senaryosunun tanım ile sonuç arasındaki farkı (GRUP H referans filmi) ─
const testDefVsExecutionFilm = {
  type: 'video-scene',
  id: 'jira-h1-test-def-vs-execution-film',
  title: {
    tr: "🎬 Bir Test Senaryosunun 50 Koşumu: Tanım ile Sonuç Arasındaki Fark",
    en: "🎬 A Test Case's 50 Runs: The Difference Between Definition and Result",
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'testdef', emoji: '📋', label: { tr: 'Test Tanımı: TC-42', en: 'Test Definition: TC-42' }, color: '#0ea5e9' },
    { id: 'run1', emoji: '▶️', label: { tr: 'Koşum #1 (build .1)', en: 'Run #1 (build .1)' }, color: '#10b981' },
    { id: 'run2', emoji: '▶️', label: { tr: 'Koşum #2 (build .2)', en: 'Run #2 (build .2)' }, color: '#ef4444' },
    { id: 'bug', emoji: '🐞', label: { tr: 'SHOP-142 açılır', en: 'SHOP-142 filed' }, color: '#ef4444' },
    { id: 'run3', emoji: '▶️', label: { tr: 'Koşum #3 (build .3)', en: 'Run #3 (build .3)' }, color: '#10b981' },
    { id: 'flat', emoji: '📄', label: { tr: 'Düz Issue Listesi', en: 'Flat Issue List' }, color: '#64748b' },
  ],
  scenes: [
    {
      caption: {
        tr: '"Bir kupon sipariş başına bir kez uygulanır" senaryosu bir KEZ tanımlanır: TC-42. Ama bu tanım gelecekte ONLARCA kez koşulacak — her sürüm çıkışında, her regresyon paketinde. Bu filmde tanımın koşumlardan nasıl AYRIŞTIĞINI izleyeceksin.',
        en: 'The scenario "a coupon is applied once per order" is defined ONCE: TC-42. But this definition will be run DOZENS of times in the future -- with every release, every regression pack. In this film you will watch how the definition SEPARATES from its runs.',
      },
      positions: { testdef: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: "Adım 1 — Build 2026.8.1'de koşulur: PASS. Bu sonuç TC-42'nin KENDİSİNE değil, TC-42'nin build .1'deki bu ÖZEL koşumuna aittir — tanım değişmeden kalır.",
        en: 'Step 1 -- Run against build 2026.8.1: PASS. This result does not belong to TC-42 ITSELF, it belongs to this SPECIFIC run of TC-42 against build .1 -- the definition stays unchanged.',
      },
      positions: {
        testdef: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        run1: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'testdef', to: 'run1', color: '#10b981' }],
    },
    {
      caption: {
        tr: "Adım 2 — Build 2026.8.2'de AYNI test tanımı tekrar koşulur: FAIL. Tanım hiç değişmedi, sadece koşulduğu ÜRÜN değişti — ve bu koşum SHOP-142 bug'ını doğurur.",
        en: 'Step 2 -- The SAME test definition runs again against build 2026.8.2: FAIL. The definition never changed, only the PRODUCT it ran against did -- and this run gives birth to bug SHOP-142.',
      },
      positions: {
        run1: { x: 16, y: 50, scale: 0.9, opacity: 0.5 },
        run2: { x: 44, y: 50, scale: 1.15 },
        bug: { x: 74, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'testdef', to: 'run2', color: '#ef4444' }, { from: 'run2', to: 'bug', color: '#ef4444' }],
    },
    {
      caption: {
        tr: "Adım 3 — Düzeltme sonrası, AYNI tanım build 2026.8.3'e karşı üçüncü kez koşulur: PASS. Şimdi TC-42'nin geçmişinde ÜÇ ayrı koşum kaydı var: PASS, FAIL, PASS — hepsi aynı tanımın farklı zamanlardaki sonuçları.",
        en: 'Step 3 -- After the fix, the SAME definition runs a third time against build 2026.8.3: PASS. TC-42 now has THREE separate run records in its history: PASS, FAIL, PASS -- all results of the same definition at different times.',
      },
      positions: {
        bug: { x: 16, y: 50, scale: 0.9, opacity: 0.5 },
        run3: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'bug', to: 'run3', color: '#10b981' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — Eğer bu bilgi düz bir issue listesinde tutulsaydı, TC-42 için TEK bir kayıt olurdu — son durumu \"PASS\" gösterirdi ve build .2'deki FAIL tamamen kaybolurdu. Test Execution kayıtları sayesinde \"bu senaryo hangi build'lerde kaç kez başarısız oldu\" sorusu asla kaybolmaz — bu, izlenebilirlik matrisinin ham malzemesidir.",
        en: 'Finale (the contrast) -- If this information were kept in a flat issue list, there would be ONE record for TC-42 -- its latest state would show "PASS" and the FAIL against build .2 would be completely lost. Thanks to Test Execution records, the question "how many times, in which builds, did this scenario fail" is never lost -- this is the raw material of the traceability matrix.',
      },
      positions: {
        run3: { x: 20, y: 32, scale: 0.9 },
        flat: { x: 60, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'run3', to: 'flat', color: '#64748b' }],
    },
  ],
}

// ─── table: Xray/Zephyr issue tipleri ve ilişkileri (GRUP H2) ─────────────────
const testIssueTypesTable = {
  type: 'table',
  headers: [
    { tr: 'Issue Tipi', en: 'Issue Type' },
    { tr: 'Ne temsil eder', en: 'What it represents' },
    { tr: 'Bağlı olduğu üst kayıt', en: 'Its parent record' },
  ],
  rows: [
    [
      { tr: 'Test', en: 'Test' },
      { tr: 'Bir senaryonun TANIMI (adımlar, beklenen sonuç) — bir kez yazılır', en: "A scenario's DEFINITION (steps, expected result) -- written once" },
      { tr: 'Bir Story/gereksinime bağlanır', en: 'Linked to a Story/requirement' },
    ],
    [
      { tr: 'Precondition', en: 'Precondition' },
      { tr: 'Birden çok Test\'in paylaştığı ortak ön koşul (örn. "standart müşteri hesabı")', en: 'A shared precondition used by multiple Tests (e.g. "standard customer account")' },
      { tr: 'Bir veya birden çok Test\'e bağlanır', en: 'Linked to one or more Tests' },
    ],
    [
      { tr: 'Test Set', en: 'Test Set' },
      { tr: 'İlgili Test\'lerin gruplandığı koleksiyon (örn. "Ödeme Akışı Testleri")', en: 'A collection of related Tests (e.g. "Checkout Flow Tests")' },
      { tr: 'Birden çok Test\'i toplar', en: 'Groups multiple Tests' },
    ],
    [
      { tr: 'Test Plan', en: 'Test Plan' },
      { tr: 'Bir SÜRÜM için hangi Test\'lerin koşulacağının planı', en: 'The plan of which Tests will run for a RELEASE' },
      { tr: 'Birden çok Test\'i bir sürüme bağlar', en: 'Ties multiple Tests to a release' },
    ],
    [
      { tr: 'Test Execution', en: 'Test Execution' },
      { tr: 'Bir Test\'in BELİRLİ BİR ANDA, belirli bir build\'e karşı koşum SONUCU', en: "A Test's RUN RESULT at a SPECIFIC MOMENT, against a specific build" },
      { tr: 'Bir Test Plan\'ın altında oluşur', en: 'Created under a Test Plan' },
    ],
  ],
}

// ─── step-animation: Test tiplerinin birbirine bağlanışı (GRUP H2) ────────────
const testHierarchySteps = {
  type: 'step-animation',
  id: 'jira-h2-test-hierarchy-steps',
  title: { tr: 'Adım Adım: Beş Test Issue Tipi Birbirine Nasıl Bağlanır?', en: 'Step by Step: How Do the Five Test Issue Types Connect?' },
  steps: [
    { id: 1, icon: '📋', label: { tr: 'Test yazılır', en: 'A Test is written' }, detail: { tr: 'TC-42 "Kupon bir kez uygulanır" — SHOP-118 story\'sine bağlanır. Bir kez yazılır, sonsuza kadar yaşar.', en: 'TC-42 "Coupon is applied once" -- linked to the SHOP-118 story. Written once, lives forever.' } },
    { id: 2, icon: '🧩', label: { tr: 'Precondition eklenir', en: 'A Precondition is added' }, detail: { tr: '"Standart müşteri hesabı" ön koşulu TC-42\'ye VE beş başka teste bağlanır — tekrar yazmak yerine paylaşılır.', en: 'The "standard customer account" precondition is linked to TC-42 AND five other tests -- shared instead of rewritten.' } },
    { id: 3, icon: '📦', label: { tr: 'Test Set\'e gruplanır', en: 'It is grouped into a Test Set' }, detail: { tr: 'TC-42, "Ödeme Akışı Testleri" Test Set\'ine dahil edilir — ilgili testler bir arada bulunabilir olur.', en: 'TC-42 is included in the "Checkout Flow Tests" Test Set -- related tests become discoverable together.' } },
    { id: 4, icon: '🗓️', label: { tr: 'Test Plan\'a bağlanır', en: 'It is tied to a Test Plan' }, detail: { tr: '"Sürüm 2026.8.3 Test Planı" bu Test Set\'i içerir — bu sürümde HANGİ testlerin koşulacağı böyle belirlenir.', en: '"Release 2026.8.3 Test Plan" includes this Test Set -- this decides WHICH tests run for this release.' } },
    { id: 5, icon: '▶️', label: { tr: 'Test Execution oluşur', en: 'A Test Execution is created' }, detail: { tr: 'Plan koşulduğunda her Test için bir Test Execution kaydı doğar — PASS/FAIL sonucu buraya yazılır, TANIMA değil.', en: 'When the plan runs, a Test Execution record is born for each Test -- the PASS/FAIL result is written here, not on the definition.' } },
  ],
}

// ─── python-flow-diagram: izlenebilirlik matrisi (GRUP H3) ────────────────────
const testTraceabilityMatrixFlow = {
  type: 'python-flow-diagram',
  titleTr: 'İzlenebilirlik Matrisi: Gereksinimden Test Sonucuna',
  titleEn: 'The Traceability Matrix: From Requirement to Test Result',
  steps: [
    { type: 'action', code: 'SHOP-118 (Requirement)', desc: 'A coupon is applied once per order', descTr: 'Kupon sipariş başına bir kez uygulanır' },
    { type: 'action', code: 'TC-42 (Test)', desc: 'Test case linked to the requirement', descTr: 'Gereksinime bağlı test senaryosu' },
    { type: 'condition', code: 'Test Execution (build 2026.8.3)', desc: 'Latest run of TC-42 against this build', descTr: "TC-42'nin bu build'e karşı son koşumu", branch: { true: 'PASS -- requirement verified', false: 'FAIL -- SHOP-142 filed' } },
    { type: 'end', code: 'Traceability Report', desc: 'One screen answers: verified, failed, or never tested', descTr: 'Tek bir ekran şunu cevaplar: doğrulandı, başarısız oldu ya da hiç test edilmedi' },
  ],
}

// ─── code-playground: JQL ile test execution'ları bul (GRUP H4) ───────────────
const testExecutionJqlPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-h2-test-hierarchy-steps',
  id: 'jira-h4-test-execution-jql',
  title: { tr: 'Kendin Dene: Belirli Bir Build\'in Başarısız Koşumlarını Bul', en: 'Try It Yourself: Find a Specific Build\'s Failed Runs' },
  starterCode: {
    tr: `-- Otomasyon paketi Jira'ya sonuçları REST API ile yazıyor.
-- 2026.8.3 build'inde FAIL sonucu alan Test Execution kayıtlarını bulman gerekiyor.
project = SHOP AND issuetype = "Test Execution"`,
    en: `-- The automation suite writes results into Jira via the REST API.
-- Find the Test Execution records that got a FAIL result for build 2026.8.3.
project = SHOP AND issuetype = "Test Execution"`,
  },
  solutionCode: {
    tr: `project = SHOP AND issuetype = "Test Execution"
AND fixVersion = "2026.8.3" AND "Test Execution Status" = FAIL`,
    en: `project = SHOP AND issuetype = "Test Execution"
AND fixVersion = "2026.8.3" AND "Test Execution Status" = FAIL`,
  },
  hint: {
    tr: "İki koşul daha lazım: hangi build/sürüm (JQL sekmesinde gördüğün alan bazlı filtreleme mantığı) ve hangi sonuç. Test Execution'ın sonucu ayrı bir alandır — Test'in kendisinde değil, koşum kaydında durur.",
    en: 'Two more conditions are needed: which build/release (the field-based filtering logic you saw on the JQL tab) and which result. A Test Execution\'s result is a separate field -- it lives on the run record, not on the Test itself.',
  },
  successMessage: {
    tr: "Doğru! Bir otomasyon koşumundan gelen sonuç, JUnit XML raporundan okunup REST API ile bir Test Execution kaydına yazılır. Bu sayede JQL ile \"hangi build'de neler kırıldı\" sorusu, elle rapor taramaya gerek kalmadan cevaplanır.",
    en: 'Correct! A result coming from an automation run is read from a JUnit XML report and written into a Test Execution record via the REST API. This means "what broke in which build" can be answered with JQL, without manually scanning reports.',
  },
}

// ─── table: Xray vs Zephyr karşılaştırması (GRUP H5) ───────────────────────────
const xrayVsZephyrTable = {
  type: 'table',
  headers: [
    { tr: 'Kriter', en: 'Criterion' },
    { tr: 'Xray', en: 'Xray' },
    { tr: 'Zephyr', en: 'Zephyr' },
  ],
  rows: [
    [
      { tr: 'BDD/Cucumber desteği', en: 'BDD/Cucumber support' },
      { tr: "Gherkin senaryolarını doğrudan içe/dışa aktarır", en: 'Directly imports/exports Gherkin scenarios' },
      { tr: 'Sınırlı, eklenti gerekebilir', en: 'Limited, may need an add-on' },
    ],
    [
      { tr: 'REST API olgunluğu', en: 'REST API maturity' },
      { tr: 'Geniş, otomasyon entegrasyonu için yaygın kullanılır', en: 'Extensive, widely used for automation integration' },
      { tr: 'Mevcut ama daha az yaygın örnek', en: 'Available but fewer common examples' },
    ],
    [
      { tr: 'Zephyr Scale (eski TM4J) farkı', en: 'Zephyr Scale (formerly TM4J) difference' },
      { tr: '—', en: '--' },
      { tr: 'Zephyr\'in birden fazla ürün varyantı vardır (Squad/Scale) — karar öncesi hangisi netleştirilmeli', en: 'Zephyr has multiple product variants (Squad/Scale) -- clarify which one before deciding' },
    ],
    [
      { tr: 'Karar kriteri', en: 'Decision criterion' },
      { tr: "Takım zaten BDD/Cucumber kullanıyorsa ve ağır REST API entegrasyonu planlanıyorsa", en: 'If the team already uses BDD/Cucumber and heavy REST API integration is planned' },
      { tr: "Takım basit, manuel ağırlıklı test yönetimi istiyorsa ve mevcut Zephyr deneyimi varsa", en: 'If the team wants simple, manual-heavy test management and already has Zephyr experience' },
    ],
  ],
}

// ─── Film: CI koşumu kırıldığında otomatik bug mı gürültü mü (GRUP I referans filmi) ─
const ciFailureFilm = {
  type: 'video-scene',
  id: 'jira-i2-ci-failure-film',
  title: {
    tr: '🎬 Bir CI Koşumu Kırıldığında: Otomatik Bug mı, Gürültü mü?',
    en: '🎬 When a CI Run Breaks: Automatic Bug or Noise?',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'ci', emoji: '⚙️', label: { tr: 'CI Koşumu (03:00)', en: 'CI Run (03:00)' }, color: '#f59e0b' },
    { id: 'fail', emoji: '❌', label: { tr: 'Test Kırıldı', en: 'Test Broke' }, color: '#ef4444' },
    { id: 'search', emoji: '🔍', label: { tr: 'Arama: Aynı İmza Var mı?', en: 'Search: Same Signature Exists?' }, color: '#0ea5e9' },
    { id: 'comment', emoji: '💬', label: { tr: 'Mevcut Bug\'a Yorum', en: 'Comment on Existing Bug' }, color: '#8b5cf6' },
    { id: 'newbug', emoji: '🆕', label: { tr: 'Yeni Bug Açılır', en: 'New Bug Filed' }, color: '#10b981' },
    { id: 'flood', emoji: '🌊', label: { tr: 'Bildirim Fırtınası', en: 'Notification Flood' }, color: '#64748b' },
  ],
  scenes: [
    {
      caption: {
        tr: "Gece 03:00 — CI koşumu ödeme akışı testini kırıyor. Kimse uyanık değil, ama sistemin bir kararı vermesi gerekiyor: yeni bir bug mı açsın, yoksa başka bir şey mi yapsın?",
        en: 'Night, 03:00 -- the CI run breaks the checkout flow test. Nobody is awake, but the system has to make a decision: file a new bug, or do something else?',
      },
      positions: { ci: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: 'Adım 1 — Koşum kırılır. Naif bir tasarım burada doğrudan "bug aç" der — ama bu test her gece rastgele bir ağ gecikmesi yüzünden kırılıyorsa, bu YEDİNCİ aynı bug olur.',
        en: 'Step 1 -- The run breaks. A naive design says "file a bug" right here -- but if this test breaks every night from a random network delay, this becomes the SEVENTH identical bug.',
      },
      positions: {
        ci: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        fail: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'ci', to: 'fail', color: '#ef4444' }],
    },
    {
      caption: {
        tr: "Adım 2 — Doğru tasarım önce ARAR: \"aynı test adı + aynı hata imzasıyla açık bir bug var mı?\" JQL sekmesinde öğrendiğin `summary ~ \"...\"` operatörü tam olarak burada işe yarar.",
        en: 'Step 2 -- The correct design SEARCHES first: "is there an open bug with the same test name plus the same failure signature?" The `summary ~ "..."` operator you learned on the JQL tab is exactly what does this job.',
      },
      positions: {
        fail: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        search: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'fail', to: 'search', color: '#0ea5e9' }],
    },
    {
      caption: {
        tr: 'Adım 3a — Aynı imzalı açık bir bug BULUNURSA: yeni ticket açılmaz, mevcut kayda "koşum #4821, build 2026.8.3" bilgisiyle bir yorum eklenir. Bug hâlâ TEK kayıt, ama tekrar sayısı ölçülebilir.',
        en: 'Step 3a -- If an open bug with the same signature IS FOUND: no new ticket opens, a comment with "run #4821, build 2026.8.3" is added to the existing record. The bug is still ONE record, but its recurrence count is measurable.',
      },
      positions: {
        search: { x: 20, y: 32, scale: 0.9 },
        comment: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'search', to: 'comment', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Adım 3b — Aynı imzalı bug BULUNAMAZSA: yeni bir bug açılır, ortam bilgisi ve koşum raporunun linki otomatik eklenir. Bu, gerçekten YENİ bir hata olduğu için haklı bir kayıttır.",
        en: 'Step 3b -- If no bug with the same signature IS FOUND: a new bug is filed, with environment info and the run report link attached automatically. This is a justified record because it is genuinely a NEW failure.',
      },
      positions: {
        search: { x: 20, y: 68, scale: 0.9 },
        newbug: { x: 60, y: 45, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'search', to: 'newbug', color: '#10b981' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — Arama adımı ATLANSAYDI: her gece aynı flaky test için yeni bir ticket açılır, bir ay sonra otuz \"tekil\" bug birikir. Takım bu gürültüde gerçek bir hatayı kaçırır — üretim kalite sensörünün her parçaya fiş kesip operatörleri fişlere bakmaktan vazgeçirmesiyle AYNI mekanizma.",
        en: 'Finale (the contrast) -- Had the search step been SKIPPED: a new ticket opens every night for the same flaky test, and a month later thirty "unique" bugs pile up. The team misses a real defect in that noise -- the EXACT same mechanism as a production quality sensor issuing a slip for every part until operators stop reading slips at all.',
      },
      positions: {
        newbug: { x: 20, y: 32, scale: 0.9 },
        flood: { x: 60, y: 55, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'newbug', to: 'flood', color: '#64748b' }],
    },
  ],
}

// ─── table: smart commit sözdizimi (GRUP I1) ───────────────────────────────────
const smartCommitTable = {
  type: 'table',
  headers: [
    { tr: 'Sözdizimi', en: 'Syntax' },
    { tr: 'Ne yapar', en: 'What it does' },
    { tr: 'Örnek', en: 'Example' },
  ],
  rows: [
    [
      { tr: '`ISSUE-KEY #comment metin`', en: '`ISSUE-KEY #comment text`' },
      { tr: "Issue'ya otomatik yorum ekler", en: 'Adds an automatic comment to the issue' },
      { tr: '`SHOP-142 #comment kupon hesaplaması düzeltildi`', en: '`SHOP-142 #comment fixed coupon calculation`' },
    ],
    [
      { tr: '`ISSUE-KEY #resolve`', en: '`ISSUE-KEY #resolve`' },
      { tr: "Issue'yu Done'a taşır (workflow'da izin varsa)", en: 'Moves the issue to Done (if the workflow allows)' },
      { tr: '`SHOP-142 #resolve`', en: '`SHOP-142 #resolve`' },
    ],
    [
      { tr: '`ISSUE-KEY #time 2h`', en: '`ISSUE-KEY #time 2h`' },
      { tr: 'Harcanan zamanı kaydeder', en: 'Logs time spent' },
      { tr: '`SHOP-142 #time 2h Kupon hesaplaması debug edildi`', en: '`SHOP-142 #time 2h Debugged coupon calculation`' },
    ],
  ],
}

// ─── step-animation: arama-önce stratejisi (GRUP I2) ───────────────────────────
const searchFirstSteps = {
  type: 'step-animation',
  id: 'jira-i2-search-first-steps',
  title: { tr: 'Adım Adım: Arama-Önce Stratejisi Nasıl Çalışır?', en: 'Step by Step: How Does the Search-First Strategy Work?' },
  steps: [
    { id: 1, icon: '❌', label: { tr: 'Koşum kırılır', en: 'The run breaks' }, detail: { tr: 'CI, hangi test sınıfının hangi hata mesajıyla kırıldığını kaydeder — bu ikisi birlikte bir "imza" oluşturur.', en: 'CI records which test class broke with which error message -- together these two form a "signature".' } },
    { id: 2, icon: '🔍', label: { tr: 'İmzayla arama yapılır', en: 'A search runs on the signature' }, detail: { tr: 'JQL ile `summary ~ "test-adi" AND status != Done` çalıştırılır — bu imzayı taşıyan AÇIK bir kayıt var mı diye bakılır.', en: 'A JQL query like `summary ~ "test-name" AND status != Done` runs -- checking whether an OPEN record with this signature exists.' } },
    { id: 3, icon: '🔀', label: { tr: 'İki yol ayrılır', en: 'The path splits in two' }, detail: { tr: 'Sonuç bulunursa YORUM eklenir; bulunmazsa YENİ kayıt açılır — hiçbir zaman ikisi birden olmaz.', en: 'If found, a COMMENT is added; if not found, a NEW record is filed -- never both at once.' } },
    { id: 4, icon: '📎', label: { tr: 'Kanıt her iki yolda da eklenir', en: 'Evidence is attached either way' }, detail: { tr: 'Yorum ya da yeni kayıt, koşum numarasını ve raporun linkini taşır — GRUP D\'de öğrendiğin kanıt disiplini burada da geçerlidir.', en: 'Whether it is a comment or a new record, it carries the run number and the report link -- the evidence discipline you learned earlier applies here too.' } },
    { id: 5, icon: '📊', label: { tr: 'Tekrar sayısı ölçülebilir hâle gelir', en: 'Recurrence count becomes measurable' }, detail: { tr: 'Bir kaydın yorum sayısı, o hatanın kaç kez tekrarlandığının doğrudan göstergesi olur — gürültü üretmeden veri toplanır.', en: "A record's comment count becomes a direct indicator of how many times that failure recurred -- data is gathered without producing noise." } },
  ],
}

// ─── code-playground: arama sorgusu yaz (GRUP I2) ──────────────────────────────
const duplicateSearchJqlPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-i2-ci-failure-film',
  id: 'jira-i2-duplicate-search-jql',
  title: { tr: "Kendin Dene: \"Aynı Hata Zaten Açık mı?\" Sorgusunu Yaz", en: 'Try It Yourself: Write the "Is This Failure Already Open?" Query' },
  starterCode: {
    tr: `-- test_checkout_coupon testi "TimeoutError: waiting for selector" mesajıyla kırıldı.
-- Bu imzayla açık bir bug zaten var mı, kontrol eden sorguyu yaz.
project = SHOP`,
    en: `-- The test_checkout_coupon test broke with "TimeoutError: waiting for selector".
-- Write the query that checks whether a bug with this signature is already open.
project = SHOP`,
  },
  solutionCode: {
    tr: `project = SHOP AND issuetype = Bug AND status != Done
AND summary ~ "test_checkout_coupon" AND summary ~ "TimeoutError"`,
    en: `project = SHOP AND issuetype = Bug AND status != Done
AND summary ~ "test_checkout_coupon" AND summary ~ "TimeoutError"`,
  },
  hint: {
    tr: 'İki bilgiye ihtiyacın var: hangi test (metin arama) ve hangi hata (metin arama). `~` operatörünü JQL sekmesinde görmüştün — metin içinde arama yapar. `status != Done` eklemeyi unutma, kapanmış eski bir kayıt seni yanıltmasın.',
    en: 'You need two pieces of information: which test (text search) and which error (text search). You saw the `~` operator on the JQL tab -- it searches within text. Do not forget `status != Done`, so an old closed record does not mislead you.',
  },
  successMessage: {
    tr: "Doğru! Bu sorgu, CI'ın her koşum sonunda otomatik çalıştırdığı \"aç mı, yorum mu ekle\" kararının TAM olarak arkasındaki mantıktır. JQL öğrenmenin otomasyon entegrasyonundaki karşılığı budur.",
    en: 'Correct! This query is EXACTLY the logic behind the "file or comment" decision CI runs automatically at the end of every run. This is what learning JQL pays off as in automation integration.',
  },
}

// ─── Film: bir REST API çağrısının Jira'ya bug açması (GRUP J referans filmi) ─
const restApiCallFilm = {
  type: 'video-scene',
  id: 'jira-j1-rest-api-call-film',
  title: {
    tr: "🎬 Bir REST API Çağrısının Jira'ya Bug Açması",
    en: '🎬 A REST API Call Filing a Bug in Jira',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'token', emoji: '🔑', label: { tr: 'API Token', en: 'API Token' }, color: '#f59e0b' },
    { id: 'request', emoji: '📤', label: { tr: 'POST /rest/api/3/issue', en: 'POST /rest/api/3/issue' }, color: '#0ea5e9' },
    { id: 'auth', emoji: '🚪', label: { tr: 'Kimlik + İzin Kontrolü', en: 'Identity + Permission Check' }, color: '#8b5cf6' },
    { id: 'created', emoji: '🆕', label: { tr: 'SHOP-143 Oluşturuldu', en: 'SHOP-143 Created' }, color: '#10b981' },
    { id: 'blocked401', emoji: '🚫', label: { tr: '401: Kimlik Reddedildi', en: '401: Identity Rejected' }, color: '#ef4444' },
  ],
  scenes: [
    {
      caption: {
        tr: 'Bir otomasyon scripti üç yüz test verisi kaydı oluşturması gerekiyor — elle yapmak saatler sürer. Bu filmde tek bir API çağrısının Jira sunucusunda ne yaşadığını izleyeceksin.',
        en: 'An automation script needs to create three hundred test data records -- doing it by hand would take hours. In this film you will watch what a single API call experiences on the Jira server.',
      },
      positions: { token: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: "Adım 1 — Script, hesap ayarlarında üretilmiş bir API token'ı e-posta ile birlikte Authorization başlığına koyar. Şifre KULLANILMAZ — token, çalınırsa iptal edilebilen, şifreden ayrı bir kimlik parçasıdır.",
        en: 'Step 1 -- The script puts an API token generated in account settings, together with the email, into the Authorization header. A password is NOT used -- a token is a credential separate from the password that can be revoked if leaked.',
      },
      code: { tr: 'Authorization: Basic base64(email:api_token)', en: 'Authorization: Basic base64(email:api_token)' },
      positions: {
        token: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        request: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'token', to: 'request' }],
    },
    {
      caption: {
        tr: "Adım 2 — İstek Jira sunucusuna ulaşır. Sunucu önce KİMLİĞİ doğrular (bu token geçerli mi), sonra İZNİ kontrol eder (bu kullanıcının SHOP projesinde issue açma yetkisi var mı). İki ayrı kontrol, iki ayrı hata kodu üretebilir.",
        en: 'Step 2 -- The request reaches the Jira server. The server first verifies IDENTITY (is this token valid), then checks PERMISSION (does this user have rights to create issues in the SHOP project). Two separate checks, two separate error codes possible.',
      },
      positions: {
        request: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        auth: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'request', to: 'auth', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Adım 3a — Token geçersizse (yanlış yazılmış, süresi dolmuş) sunucu `401 Unauthorized` döner — \"sen kimsin bilmiyorum\" demektir. İstek Jira'ya hiç GİRMEMİŞ sayılır.",
        en: 'Step 3a -- If the token is invalid (mistyped, expired) the server returns `401 Unauthorized` -- meaning "I do not know who you are". The request is treated as never having ENTERED Jira at all.',
      },
      code: { tr: 'HTTP/1.1 401 Unauthorized', en: 'HTTP/1.1 401 Unauthorized' },
      positions: {
        auth: { x: 20, y: 32, scale: 0.9 },
        blocked401: { x: 60, y: 55, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'auth', to: 'blocked401', color: '#ef4444' }],
    },
    {
      caption: {
        tr: "Final — Kimlik VE izin geçerliyse Jira yeni bir issue oluşturur ve gövdesinde SHOP-143 anahtarını döner. Bu tek çağrı, elle otuz saniye süren bir işlemi saniyenin çok altına indirir — ve üç yüz kez tekrarlandığında elle asla yapılamayacak bir işi mümkün kılar.",
        en: 'Finale -- If both identity AND permission are valid, Jira creates a new issue and returns the key SHOP-143 in the response body. This single call takes an operation that manually takes thirty seconds down to a fraction of a second -- and repeated three hundred times, makes possible a job that could never be done by hand.',
      },
      code: { tr: '{ "key": "SHOP-143" }', en: '{ "key": "SHOP-143" }' },
      positions: {
        blocked401: { x: 18, y: 32, scale: 0.85, opacity: 0.4 },
        auth: { x: 40, y: 55, scale: 0.9, opacity: 0.6 },
        created: { x: 70, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'auth', to: 'created', color: '#10b981' }],
    },
  ],
}

// ─── code-playground: Java/Python issue oluşturma çağrısı (GRUP J3) ───────────
const restApiCreateIssuePlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-j1-rest-api-call-film',
  id: 'jira-j3-create-issue-call',
  title: { tr: "Kendin Dene: Java (REST Assured) ile Bug Oluşturma Çağrısını Tamamla", en: 'Try It Yourself: Complete the Bug-Creation Call in Java (REST Assured)' },
  starterCode: {
    tr: `given()
    .auth().preemptive().basic(EMAIL, API_TOKEN)
    .contentType("application/json")
    // TODO: gövdeye "fields" objesi ekle: project.key=SHOP, summary, issuetype.name=Bug
.when()
    .post("https://shopqa.atlassian.net/rest/api/3/issue")
.then()
    .statusCode(201);`,
    en: `given()
    .auth().preemptive().basic(EMAIL, API_TOKEN)
    .contentType("application/json")
    // TODO: add a "fields" body: project.key=SHOP, summary, issuetype.name=Bug
.when()
    .post("https://shopqa.atlassian.net/rest/api/3/issue")
.then()
    .statusCode(201);`,
  },
  solutionCode: {
    tr: `given()
    .auth().preemptive().basic(EMAIL, API_TOKEN)
    .contentType("application/json")
    .body("""
        {
          "fields": {
            "project": { "key": "SHOP" },
            "summary": "Otomasyon: kupon hesaplama regresyonu",
            "issuetype": { "name": "Bug" }
          }
        }
        """)
.when()
    .post("https://shopqa.atlassian.net/rest/api/3/issue")
.then()
    .statusCode(201);`,
    en: `given()
    .auth().preemptive().basic(EMAIL, API_TOKEN)
    .contentType("application/json")
    .body("""
        {
          "fields": {
            "project": { "key": "SHOP" },
            "summary": "Automation: coupon calculation regression",
            "issuetype": { "name": "Bug" }
          }
        }
        """)
.when()
    .post("https://shopqa.atlassian.net/rest/api/3/issue")
.then()
    .statusCode(201);`,
  },
  hint: {
    tr: "Jira'nın beklediği gövde tek bir \"fields\" objesidir ve üç alan ZORUNLUDUR: hangi projeye (`project.key`), ne hakkında (`summary`), hangi tipte (`issuetype.name`). Bu, Issue Türleri ve Hiyerarşi sekmesinde öğrendiğin \"her issue tipinin kendi zorunlu alanları vardır\" ilkesinin API karşılığıdır.",
    en: 'The body Jira expects is a single "fields" object with three MANDATORY fields: which project (`project.key`), about what (`summary`), which type (`issuetype.name`). This is the API counterpart of the "every issue type has its own mandatory fields" principle you learned earlier.',
  },
  successMessage: {
    tr: "Doğru! `201 Created` durum kodu, arayüzden tıklayarak yaptığın \"issue oluştur\" işleminin API karşılığıdır. Aynı üç zorunlu alan (project, summary, issuetype) hem arayüzde hem API'de aynıdır — sadece giriş şekli değişir.",
    en: 'Correct! The `201 Created` status code is the API counterpart of the "create issue" action you perform by clicking in the interface. The same three mandatory fields (project, summary, issuetype) are identical whether through the interface or the API -- only the input method changes.',
  },
}

// ─── table: hata kodları (GRUP J5) ─────────────────────────────────────────────
const apiErrorCodesTable = {
  type: 'table',
  headers: [
    { tr: 'Kod', en: 'Code' },
    { tr: 'Anlamı', en: 'Meaning' },
    { tr: 'İlk kontrol edilecek şey', en: 'The first thing to check' },
  ],
  rows: [
    [
      { tr: '401 Unauthorized', en: '401 Unauthorized' },
      { tr: "Kimlik doğrulanamadı — sunucu SENİ tanımıyor", en: 'Identity could not be verified -- the server does not know WHO you are' },
      { tr: "API token'ın doğru/süresi dolmamış olup olmadığı", en: "Whether the API token is correct/not expired" },
    ],
    [
      { tr: '403 Forbidden', en: '403 Forbidden' },
      { tr: "Kimlik doğru ama İZİN yok — sunucu seni tanıyor, yetkilendirmiyor", en: 'Identity is fine but PERMISSION is missing -- the server knows you, but does not authorize you' },
      { tr: "Kullanıcının bu projede issue oluşturma izninin olup olmadığı", en: "Whether the user has issue-creation permission in this project" },
    ],
    [
      { tr: '429 Too Many Requests', en: '429 Too Many Requests' },
      { tr: 'Oran sınırı (rate limit) aşıldı', en: 'The rate limit was exceeded' },
      { tr: "İsteklerin arasına bekleme koyup koymadığın (retry-after başlığına saygı)", en: 'Whether you are pacing requests (respecting the retry-after header)' },
    ],
  ],
}

// ─── step-animation: hata kodunu teşhis etme (GRUP J5) ─────────────────────────
const apiErrorDiagnosisSteps = {
  type: 'step-animation',
  id: 'jira-j5-api-error-diagnosis-steps',
  title: { tr: 'Adım Adım: Bir API Hata Kodunu Nasıl Teşhis Edersin?', en: 'Step by Step: How Do You Diagnose an API Error Code?' },
  steps: [
    { id: 1, icon: '📡', label: { tr: 'İstek başarısız oldu', en: 'The request failed' }, detail: { tr: 'Beklenen `201 Created` yerine bir hata kodu geldi. Önce KODUN KENDİSİNE bak, gövdedeki mesaja değil — kod, hangi katmanda durduğunu söyler.', en: 'Instead of the expected `201 Created`, an error code arrived. Look at the CODE ITSELF first, not the body message -- the code tells you which layer stopped it.' } },
    { id: 2, icon: '🔑', label: { tr: '401 mi?', en: 'Is it 401?' }, detail: { tr: "Kimlik katmanında duruyor. Token'ı, e-posta adresini ve base64 kodlamasını kontrol et — istek Jira'nın İÇİNE bile girmedi.", en: 'It stopped at the identity layer. Check the token, the email address and the base64 encoding -- the request never even entered Jira.' } },
    { id: 3, icon: '🚪', label: { tr: '403 mü?', en: 'Is it 403?' }, detail: { tr: 'Kimlik geçti ama izin katmanında durdu. Kullanıcının bu PROJEDE issue oluşturma iznine sahip olup olmadığını kontrol et — token değil, proje izin şeması sorunu.', en: 'Identity passed but it stopped at the permission layer. Check whether the user has issue-creation permission in this PROJECT -- not a token issue, a project permission scheme issue.' } },
    { id: 4, icon: '⏳', label: { tr: '429 mu?', en: 'Is it 429?' }, detail: { tr: 'İstek reddedilmedi, ERTELENDİ. Çok hızlı çok fazla istek gönderiliyor. Cevaptaki `retry-after` başlığına bak ve isteklerin arasına o kadar bekleme koy.', en: 'The request was not rejected, it was DEFERRED. Too many requests are being sent too fast. Check the `retry-after` header in the response and pace your requests accordingly.' } },
    { id: 5, icon: '✅', label: { tr: '2xx mi?', en: 'Is it 2xx?' }, detail: { tr: 'İstek başarılı — ama gövdeyi mutlaka kontrol et, çünkü 200 dönüp içinde boş bir sonuç listesi taşıyan bir yanıt da "teknik olarak başarılı ama işlevsel olarak yanlış" olabilir.', en: 'The request succeeded -- but always check the body too, because a 200 carrying an empty result list inside can be "technically successful but functionally wrong".' } },
  ],
}

// ─── Film: burndown düz çizgi çizdiğinde (GRUP K referans filmi) ──────────────
const flatBurndownFilm = {
  type: 'video-scene',
  id: 'jira-k2-flat-burndown-film',
  title: {
    tr: '🎬 Burndown Grafiği Düz Bir Çizgi Çizdiğinde: Ekip Tembel mi?',
    en: '🎬 When the Burndown Chart Draws a Flat Line: Is the Team Lazy?',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'burndown', emoji: '📉', label: { tr: 'Burndown (İdeal Çizgi)', en: 'Burndown (Ideal Line)' }, color: '#0ea5e9' },
    { id: 'flat', emoji: '➖', label: { tr: 'Gün 5: Düz Çizgi', en: 'Day 5: Flat Line' }, color: '#ef4444' },
    { id: 'scope', emoji: '➕', label: { tr: 'Olasılık 1: Kapsam Eklendi', en: 'Possibility 1: Scope Added' }, color: '#f59e0b' },
    { id: 'queue', emoji: '⏳', label: { tr: 'Olasılık 2: Doğrulama Kuyruğu', en: 'Possibility 2: Verification Queue' }, color: '#8b5cf6' },
    { id: 'reveal', emoji: '🔍', label: { tr: 'Panoya Bakılır: Gerçek Neden', en: 'Board Checked: The Real Cause' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: "Sprint başlar, burndown grafiği ideal bir eğimle inmesi gerektiğini gösteren referans çizgiyi çizer. Takım kapasitesine göre her gün biraz iş bitmiş olmalı.",
        en: 'The sprint starts, the burndown chart draws the reference line showing it should descend at an ideal slope. Based on team capacity, a bit of work should finish every day.',
      },
      positions: { burndown: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: "Gün 5 — gerçek çizgi DÜZ kalıyor, hiç iş bitmemiş görünüyor. İlk tepki genelde \"ekip yavaş çalışıyor\" olur — ama bu grafik SEBEBİ göstermez, yalnızca OLAYI gösterir.",
        en: 'Day 5 -- the actual line stays FLAT, no work appears finished. The first reaction is usually "the team is working slowly" -- but this chart does not show the CAUSE, only the EVENT.',
      },
      positions: {
        burndown: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        flat: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'burndown', to: 'flat', color: '#ef4444' }],
    },
    {
      caption: {
        tr: "İki olasılık var. Olasılık 1: sprint ortasında PO yeni bir öğe ekletti, kalan iş büyüdü — grafik bunu \"hiç ilerleme yok\" gibi gösterir çünkü PAYDA da değişti. Olasılık 2: işler bitiyor ama Done'a değil doğrulama kuyruğuna yığılıyor.",
        en: 'There are two possibilities. Possibility 1: mid-sprint the PO had a new item added, remaining work grew -- the chart shows this as "no progress at all" because the DENOMINATOR changed too. Possibility 2: work is finishing, but piling into the verification queue instead of Done.',
      },
      positions: {
        flat: { x: 18, y: 32, scale: 0.9 },
        scope: { x: 44, y: 55, scale: 1.05 },
        queue: { x: 70, y: 50, scale: 1.1, pulse: true },
      },
      beams: [{ from: 'flat', to: 'scope', color: '#f59e0b' }, { from: 'flat', to: 'queue', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: 'Takım burndown grafiğine değil PANOYA bakar: kapsam değişmemiş (Olasılık 1 elenir), ama "In QA" sütununda dört kart birikmiş — WIP limiti aşılmış durumda.',
        en: 'The team looks not at the burndown chart but at the BOARD: scope has not changed (Possibility 1 is ruled out), but four cards have piled up in "In QA" -- the WIP limit is exceeded.',
      },
      positions: {
        scope: { x: 20, y: 68, scale: 0.85, opacity: 0.4 },
        queue: { x: 40, y: 45, scale: 0.9 },
        reveal: { x: 70, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'queue', to: 'reveal', color: '#10b981' }],
    },
    {
      caption: {
        tr: "Final (kontrast) — Gerçek neden: geliştirme doğrulanabilecek hızdan daha hızlı üretiyor. Burndown tek başına bunu ASLA söylemez — bir olayı gösterir, sebebini söylemek için başka bir veri kaynağına (panoya, WIP limitine) bakmak gerekir. Tek bir metriğe güvenmek, yanlış teşhise ve yanlış çözüme (\"ekibi hızlandıralım\") götürür.",
        en: 'Finale (the contrast) -- The real cause: development is producing faster than it can be verified. Burndown alone NEVER tells you this -- it shows an event, and finding the cause requires another data source (the board, the WIP limit). Trusting a single metric leads to a wrong diagnosis and a wrong fix ("let\'s speed the team up").',
      },
      positions: {
        reveal: { x: 40, y: 50, scale: 1.1 },
        burndown: { x: 72, y: 50, scale: 0.9, opacity: 0.5 },
      },
      beams: [{ from: 'reveal', to: 'burndown', color: '#64748b' }],
    },
  ],
}

// ─── step-animation: kontrol grafiğinin darboğazı ortaya çıkarması (GRUP K3) ──
const controlChartBottleneckSteps = {
  type: 'step-animation',
  id: 'jira-k3-control-chart-steps',
  title: { tr: 'Adım Adım: Kontrol Grafiği Bir Darboğazı Nasıl Gösterir?', en: 'Step by Step: How Does a Control Chart Reveal a Bottleneck?' },
  steps: [
    { id: 1, icon: '📊', label: { tr: 'Her kart bir nokta olur', en: 'Every card becomes a dot' }, detail: { tr: 'Kontrol grafiğinde her tamamlanan kart, panoya girişinden Done\'a kadar geçen süreyi (cycle time) gösteren bir nokta olarak çizilir.', en: 'On a control chart, every completed card is plotted as a dot showing the time (cycle time) from entering the board to reaching Done.' } },
    { id: 2, icon: '📈', label: { tr: 'Ortalama çizgi çekilir', en: 'An average line is drawn' }, detail: { tr: 'Noktaların ortalaması bir yatay çizgi olarak gösterilir — "tipik bir kart bu kadar sürer" bilgisini verir.', en: 'The average of the dots is shown as a horizontal line -- telling you "a typical card takes this long".' } },
    { id: 3, icon: '🔴', label: { tr: 'Aykırı noktalar dikkat çeker', en: 'Outlier dots stand out' }, detail: { tr: 'Ortalamanın çok üzerindeki noktalar (örn. 12 gün süren bir kart) darboğazın SOMUT kanıtıdır — hangi kartın nerede takıldığını gösterir.', en: 'Dots far above the average (a card that took 12 days, say) are CONCRETE evidence of a bottleneck -- showing exactly which card got stuck where.' } },
    { id: 4, icon: '🌊', label: { tr: 'Kümülatif akış diyagramı katmanları gösterir', en: 'The cumulative flow diagram shows layers' }, detail: { tr: 'Her sütun bir renkli katmandır; bir katmanın GENİŞLEMESİ (diğerleri sabitken) o sütunda kart biriktiğini gösterir — tam olarak "In QA" darboğazının görsel imzası.', en: 'Each column is a colored band; a band WIDENING (while others stay flat) shows cards piling up in that column -- exactly the visual signature of an "In QA" bottleneck.' } },
    { id: 5, icon: '🎯', label: { tr: 'Darboğaz somutlaşır', en: 'The bottleneck becomes concrete' }, detail: { tr: 'İki grafik birlikte "hangi kart yavaşladı" (kontrol grafiği) ve "hangi sütunda birikme var" (kümülatif akış) sorularını cevaplar — burndown\'ın veremediği cevap budur.', en: 'Together the two charts answer "which card slowed down" (control chart) and "which column is piling up" (cumulative flow) -- the answer burndown alone could not give.' } },
  ],
}

// ─── table: QA metrikleri formülleri (GRUP K4) ─────────────────────────────────
const qaMetricsTable = {
  type: 'table',
  headers: [
    { tr: 'Metrik', en: 'Metric' },
    { tr: 'Formül', en: 'Formula' },
    { tr: 'Ölçen JQL fikri', en: 'The JQL idea behind it' },
  ],
  rows: [
    [
      { tr: 'Defect Density', en: 'Defect Density' },
      { tr: 'Bug sayısı ÷ modül büyüklüğü (örn. bin satır kod)', en: 'Bug count ÷ module size (e.g. per thousand lines of code)' },
      { tr: '`project = SHOP AND component = Checkout AND issuetype = Bug`', en: '`project = SHOP AND component = Checkout AND issuetype = Bug`' },
    ],
    [
      { tr: 'Defect Leakage', en: 'Defect Leakage' },
      { tr: "Üretimde bulunan bug ÷ (test'te + üretimde bulunan toplam bug)", en: 'Bugs found in production ÷ (bugs found in test + production)' },
      { tr: '`labels = production AND issuetype = Bug AND created >= startOfMonth()`', en: '`labels = production AND issuetype = Bug AND created >= startOfMonth()`' },
    ],
    [
      { tr: 'Reopen Rate', en: 'Reopen Rate' },
      { tr: 'En az bir kez Reopened olan bug ÷ toplam kapanan bug', en: 'Bugs reopened at least once ÷ total closed bugs' },
      { tr: '`issuetype = Bug AND status WAS Reopened`', en: '`issuetype = Bug AND status WAS Reopened`' },
    ],
    [
      { tr: 'Bug Age (yaş)', en: 'Bug Age' },
      { tr: 'Bugünün tarihi − oluşturulma tarihi (açık bug\'lar için)', en: "Today's date minus creation date (for open bugs)" },
      { tr: '`issuetype = Bug AND status != Done ORDER BY created ASC`', en: '`issuetype = Bug AND status != Done ORDER BY created ASC`' },
    ],
  ],
}

// ─── code-playground: bir metriği ölçen JQL'i yaz (GRUP K4) ───────────────────
const metricJqlPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-k4-qa-metrics',
  id: 'jira-k4-metric-jql',
  title: { tr: "Kendin Dene: Reopen Rate İçin Ham Veriyi Çeken Sorguyu Yaz", en: 'Try It Yourself: Write the Query That Pulls Raw Data for Reopen Rate' },
  starterCode: {
    tr: `-- Reopen rate hesaplamak için PAYDAKİ veriyi (bu ay kapanan tüm bug'lar) çekmen gerekiyor.
-- Payı (en az bir kez Reopened olanlar) ayrı bir sorguyla çekeceksin, bu ondan farklı bir küme.
project = SHOP AND issuetype = Bug`,
    en: `-- To calculate reopen rate you need the DENOMINATOR data (all bugs closed this month).
-- The numerator (reopened at least once) is a separate query, a different set from this one.
project = SHOP AND issuetype = Bug`,
  },
  solutionCode: {
    tr: `-- Payda: bu ay kapanan TÜM bug'lar
project = SHOP AND issuetype = Bug AND status = Done AND resolved >= startOfMonth()

-- Pay: bunların arasından en az bir kez Reopened olanlar (WAS operatörü)
project = SHOP AND issuetype = Bug AND status = Done AND resolved >= startOfMonth() AND status WAS Reopened`,
    en: `-- Denominator: ALL bugs closed this month
project = SHOP AND issuetype = Bug AND status = Done AND resolved >= startOfMonth()

-- Numerator: among those, the ones reopened at least once (the WAS operator)
project = SHOP AND issuetype = Bug AND status = Done AND resolved >= startOfMonth() AND status WAS Reopened`,
  },
  hint: {
    tr: "Bir oran metriği iki AYRI sayı gerektirir: payda (toplam kapanan) ve pay (bunların reopen olanı). `resolved >= startOfMonth()` gibi kayan bir zaman fonksiyonu kullan ki sorgu her ay kendini güncellesin — sabit tarih yazma.",
    en: 'A ratio metric needs two SEPARATE numbers: the denominator (total closed) and the numerator (the reopened subset of those). Use a shifting time function like `resolved >= startOfMonth()` so the query updates itself every month -- do not write a fixed date.',
  },
  successMessage: {
    tr: "Doğru! İki sorgunun sonuç SAYISINI (issue listesi değil, kaç adet döndüğünü) birbirine bölmek reopen rate'i verir. Bu, Dashboard sekmesindeki bir gadget'ın perde arkasında yaptığı TAM olarak budur — gadget'lar birer JQL sonucunu görselleştirir.",
    en: 'Correct! Dividing the result COUNT of the two queries (not the issue list, the number returned) gives the reopen rate. This is EXACTLY what a dashboard gadget does behind the scenes -- gadgets visualize a JQL result.',
  },
}

// ─── Film: bir hata mesajının katman katman çözülmesi (GRUP L referans filmi) ─
const errorLayersFilm = {
  type: 'video-scene',
  id: 'jira-l1-error-layers-film',
  title: {
    tr: '🎬 Bir Hata Mesajının Katman Katman Çözülmesi',
    en: '🎬 Decoding an Error Message Layer by Layer',
  },
  xpReward: 12,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'error', emoji: '⚠️', label: { tr: 'Belirsiz Hata Mesajı', en: 'Ambiguous Error Message' }, color: '#ef4444' },
    { id: 'perm', emoji: '🔐', label: { tr: '1. İzin Katmanı', en: '1. Permission Layer' }, color: '#f59e0b' },
    { id: 'config', emoji: '⚙️', label: { tr: '2. Konfigürasyon Katmanı', en: '2. Configuration Layer' }, color: '#8b5cf6' },
    { id: 'syntax', emoji: '📝', label: { tr: '3. Sözdizimi Katmanı', en: '3. Syntax Layer' }, color: '#0ea5e9' },
    { id: 'diagnosis', emoji: '🎯', label: { tr: 'Teşhis: 90 Saniye', en: 'Diagnosis: 90 Seconds' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: "Ayşe bir JQL sorgusu koşturuyor, Jira \"Field 'sprint' does not exist or you do not have permission to view it\" diyor. Bu cümle üç farklı kök nedene aynı anda işaret ediyor — teşhis nereden başlar?",
        en: 'Ayse runs a JQL query, Jira says "Field \'sprint\' does not exist or you do not have permission to view it". This sentence points at three different root causes at once -- where does diagnosis start?',
      },
      positions: { error: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: "Katman 1 — İzin: aynı sorguyu bu alan olmadan koşar, proje erişimi olduğunu doğrular. Bu katman TEMİZ — sorun izin değil.",
        en: 'Layer 1 -- Permission: she runs the same query without this field, confirms she has project access. This layer is CLEAN -- the problem is not permission.',
      },
      positions: {
        error: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        perm: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'error', to: 'perm', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: "Katman 2 — Konfigürasyon: proje bir Kanban panosu kullanıyor. Sprint alanı YALNIZCA Scrum panolu projelerde bulunur — bu proje türünde alan hiç YOK. Kök neden burada bulundu.",
        en: 'Layer 2 -- Configuration: the project uses a Kanban board. The sprint field ONLY exists in projects with a Scrum board -- it simply does NOT EXIST in this project type. The root cause is found here.',
      },
      positions: {
        perm: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        config: { x: 54, y: 50, scale: 1.25, pulse: true },
      },
      beams: [{ from: 'perm', to: 'config', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Katman 3 — Sözdizimi hiç kontrol edilmedi çünkü sorun ondan ÖNCE bulundu. Sırayı bilmeden çalışsaydı, Ayşe muhtemelen alan adını harf harf kontrol ederek zaman kaybederdi.",
        en: 'Layer 3 -- Syntax was never checked because the problem was found BEFORE it. Working without knowing the order, Ayse would likely have wasted time checking the field name letter by letter.',
      },
      positions: {
        config: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        syntax: { x: 54, y: 50, scale: 1.0, opacity: 0.5 },
      },
      beams: [{ from: 'config', to: 'syntax', color: '#64748b' }],
    },
    {
      caption: {
        tr: "Final — İzin → Konfigürasyon → Sözdizimi sırasını bilmek, teşhisi 90 SANİYEYE indirdi. Sırayı bilmeden rastgele denemek genelde saatler sürer — araç kılavuzundaki gösterge ışığı sözlüğünü ezbere bilmekle motoru açıp bakmak arasındaki fark budur.",
        en: 'Finale -- Knowing the Permission to Configuration to Syntax order brought diagnosis down to 90 SECONDS. Guessing randomly without knowing the order usually takes hours -- this is the difference between knowing the car manual\'s warning-light glossary by heart and opening the hood to look.',
      },
      positions: {
        syntax: { x: 20, y: 50, scale: 0.9, opacity: 0.5 },
        diagnosis: { x: 54, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'syntax', to: 'diagnosis', color: '#10b981' }],
    },
  ],
}

// ─── step-animation: board'da kart neden görünmüyor (GRUP L) ──────────────────
const missingCardDiagnosisSteps = {
  type: 'step-animation',
  id: 'jira-l-missing-card-diagnosis-steps',
  title: { tr: "Adım Adım: Bir Kart Panoda Neden Görünmüyor?", en: 'Step by Step: Why Is a Card Missing From the Board?' },
  steps: [
    { id: 1, icon: '🔍', label: { tr: "Issue arama kutusunda BULUNUYOR mu?", en: 'Is the issue FOUND in the search box?' }, detail: { tr: 'Issue anahtarıyla ararsın. Bulunuyorsa kayıt var demektir, sorun panonun KENDİ filtresindedir — bir sonraki adıma geç.', en: 'You search by the issue key. If found, the record exists, the problem is in the board\'s OWN filter -- move to the next step.' } },
    { id: 2, icon: '⚙️', label: { tr: "Panonun arka plan JQL'i kontrol edilir", en: "The board's underlying JQL is checked" }, detail: { tr: "Her pano bir JQL sorgusuna dayanır (bkz. JQL sekmesi). Issue bu sorgunun KOŞULLARINI karşılamıyor olabilir — örneğin farklı bir proje veya issue tipinde.", en: 'Every board is based on a JQL query (see the JQL tab). The issue may not satisfy that query\'s CONDITIONS -- for instance, a different project or issue type.' } },
    { id: 3, icon: '🚦', label: { tr: 'Hızlı filtre aktif mi?', en: 'Is a quick filter active?' }, detail: { tr: 'Panonun üstünde unutulmuş bir hızlı filtre (örn. "sadece bana atanmışlar") kartı GİZLİYOR olabilir — filtreyi kapatıp tekrar bakılır.', en: 'A forgotten quick filter at the top of the board (e.g. "only assigned to me") may be HIDING the card -- clear it and look again.' } },
    { id: 4, icon: '🏊', label: { tr: 'Swimlane ayarı kontrol edilir', en: 'The swimlane setting is checked' }, detail: { tr: 'Bazı swimlane yapılandırmaları (örn. "yalnızca epic bazlı") belirli kartları hiçbir şeride YERLEŞTİREMEZ — kart teknik olarak panoda ama görünürde yok.', en: 'Some swimlane configurations (e.g. "epic-based only") may fail to PLACE certain cards in any lane -- the card is technically on the board but not visible.' } },
    { id: 5, icon: '✅', label: { tr: 'Kaynak bulunur', en: 'The source is found' }, detail: { tr: "Bu dört adım, \"kart kayıp\" şikâyetinin ARKA PLANDAKİ dört olası katmanını sırayla eler — rastgele panoyu yenilemekten çok daha hızlıdır.", en: 'These four steps eliminate, in order, the four possible layers BEHIND a "missing card" complaint -- far faster than randomly refreshing the board.' } },
  ],
}

// ─── code-playground: hangi katman sorumlu (GRUP L) ────────────────────────────
const errorLayerMatchPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-l1-common-failures',
  id: 'jira-l-error-layer-match',
  title: { tr: 'Kendin Dene: Üç Belirtiyi Doğru Katmana Eşleştir', en: 'Try It Yourself: Match Three Symptoms to the Right Layer' },
  starterCode: {
    tr: `1. "Field does not exist or you do not have permission" -> ?
2. "assignee = currentUsr()" yazılmış (yazım hatası)          -> ?
3. Bir issue'da beklenen buton hiç görünmüyor                 -> ?`,
    en: `1. "Field does not exist or you do not have permission" -> ?
2. "assignee = currentUsr()" was typed (a typo)               -> ?
3. An expected button never appears on an issue                -> ?`,
  },
  solutionCode: {
    tr: `1. İzin/Konfigürasyon katmanı -- mesaj ikisini ayırt etmez, sırayla elenir
2. Sözdizimi katmanı -- fonksiyon adı yanlış yazılmış, JQL bunu ayrıştıramaz
3. İzin/Konfigürasyon katmanı -- workflow koşulu veya izin şeması butonu gizliyor olabilir`,
    en: `1. Permission/Configuration layer -- the message does not distinguish them, eliminate in order
2. Syntax layer -- the function name is misspelled, JQL cannot parse it
3. Permission/Configuration layer -- a workflow condition or permission scheme may be hiding the button`,
  },
  hint: {
    tr: "Filmde gördüğün sırayı uygula: önce izin/konfigürasyon (sistemin SANA ya da BU PROJEYE ne izin verdiği), sonra sözdizimi (senin YAZDIĞIN şeyin doğruluğu). Bir yazım hatası her zaman sözdizimi katmanındadır — sistem konfigürasyonuyla ilgisi yoktur.",
    en: 'Apply the order you saw in the film: first permission/configuration (what the system allows for YOU or for THIS PROJECT), then syntax (the correctness of what YOU wrote). A typo is always in the syntax layer -- it has nothing to do with system configuration.',
  },
  successMessage: {
    tr: "Doğru! Katmanları ayırt edebilmek, bir hatayı okurken ilk saniyede nereye bakacağını bilmek demektir — bu filmde gördüğün 90 saniyelik teşhisin sırrı budur.",
    en: 'Correct! Being able to tell the layers apart means knowing where to look in the first second of reading an error -- this is the secret behind the 90-second diagnosis you saw in the film.',
  },
}

// ─── Film: bir mülakat cevabının zayıftan güçlüye yolculuğu (GRUP M referans filmi) ─
const interviewAnswerFlowFilm = {
  type: 'video-scene',
  id: 'jira-m1-interview-answer-flow-film',
  title: {
    tr: '🎬 Bir Mülakat Cevabının Anatomisi: Zayıftan Güçlüye',
    en: '🎬 The Anatomy of an Interview Answer: From Weak to Strong',
  },
  xpReward: 15,
  sceneDurationMs: 3400,
  stageHeight: 260,
  actors: [
    { id: 'question', emoji: '❓', label: { tr: 'Senaryo Sorusu', en: 'Scenario Question' }, color: '#0ea5e9' },
    { id: 'weak', emoji: '🫥', label: { tr: 'Zayıf Cevap: "Bakarım"', en: 'Weak Answer: "I\'ll take a look"' }, color: '#ef4444' },
    { id: 'data', emoji: '🔍', label: { tr: 'Hangi Veri Çekilir?', en: 'Which Data Is Pulled?' }, color: '#f59e0b' },
    { id: 'reasoning', emoji: '🧭', label: { tr: 'Neden Bu Sırayla?', en: 'Why This Order?' }, color: '#8b5cf6' },
    { id: 'strong', emoji: '🎯', label: { tr: 'Güçlü Cevap', en: 'Strong Answer' }, color: '#10b981' },
  ],
  scenes: [
    {
      caption: {
        tr: "Mülakatçı soruyor: \"Sprint'in son günü, bir bug dört kez Reopened oldu, developer 'bende çalışıyor' diyor. Ne yaparsın?\" Bu filmde aynı soruya verilen iki cevabı — biri zayıf, biri güçlü — yan yana izleyeceksin.",
        en: 'The interviewer asks: "It\'s the last day of the sprint, a bug has been reopened four times, the developer says \'it works on my machine\'. What do you do?" In this film you will watch two answers to the same question -- one weak, one strong -- side by side.',
      },
      positions: { question: { x: 50, y: 50, scale: 1.15, pulse: true } },
    },
    {
      caption: {
        tr: '"Bakarım, düzeltiriz" — bu cevap teknik olarak YANLIŞ değildir ama HİÇBİR ŞEY göstermez: hangi veriye bakılacağı, kiminle konuşulacağı, kararın neye dayanacağı belirsizdir. Mülakatçı bu cevaptan hiçbir şey öğrenemez.',
        en: '"I\'ll take a look, we\'ll fix it" -- this answer is not technically WRONG, but it shows NOTHING: which data to check, who to talk to, what the decision rests on all stay unclear. The interviewer learns nothing from this answer.',
      },
      positions: {
        question: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        weak: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'question', to: 'weak', color: '#ef4444' }],
    },
    {
      caption: {
        tr: "Güçlü cevap somut bir veriyle başlar: \"kaydın geçmişini çıkarırım — her Reopened geçişinde hangi ortamda, hangi build ile doğrulandığını.\" Bu, sayfa boyunca öğrendiğin \"önce kanıt\" disiplininin mülakattaki karşılığıdır.",
        en: 'A strong answer starts with concrete data: "I pull the record\'s history -- in which environment, with which build each Reopened transition was verified." This is the interview-side counterpart of the "evidence first" discipline you learned throughout the page.',
      },
      positions: {
        weak: { x: 20, y: 50, scale: 0.9, opacity: 0.4 },
        data: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'weak', to: 'data', color: '#f59e0b' }],
    },
    {
      caption: {
        tr: "Güçlü cevap durmaz, GEREKÇE ekler: \"aynı build numarasıyla mı denedik sorusu tartışmayı kişiden veriye taşır.\" Mülakatta ayırt edici olan tam olarak budur — \"ne yaparım\" değil, \"neden bu sırayla\" bilgisi.",
        en: 'A strong answer does not stop, it adds REASONING: "asking whether we tested with the same build number moves the discussion from the person to the data." This is precisely what sets candidates apart in an interview -- not "what I would do", but "why in this order".',
      },
      positions: {
        data: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        reasoning: { x: 54, y: 50, scale: 1.2, pulse: true },
      },
      beams: [{ from: 'data', to: 'reasoning', color: '#8b5cf6' }],
    },
    {
      caption: {
        tr: "Final — Güçlü cevap PO'ya kararın maliyetini rakamla sunarak biter: \"bu bug dört kez açılıp kapandığı için şu kadar gün tüketti.\" Aynı soru, aynı süre — ama biri hiçbir şey kanıtlamaz, diğeri sayfa boyunca öğrendiğin HER ilkeyi (kanıt, veri, gerekçe) tek bir cevapta birleştirir.",
        en: 'Finale -- the strong answer closes by presenting the decision\'s cost to the PO in numbers: "this bug consumed this many days across four cycles." Same question, same time -- but one proves nothing, the other brings together EVERY principle you learned across the page (evidence, data, reasoning) into one answer.',
      },
      positions: {
        reasoning: { x: 20, y: 50, scale: 0.9, opacity: 0.6 },
        strong: { x: 54, y: 50, scale: 1.3, pulse: true },
      },
      beams: [{ from: 'reasoning', to: 'strong', color: '#10b981' }],
    },
  ],
}

// ─── step-animation: güçlü bir mülakat cevabı nasıl kurulur (GRUP M) ──────────
const strongAnswerBuildSteps = {
  type: 'step-animation',
  id: 'jira-m1-strong-answer-build-steps',
  title: { tr: 'Adım Adım: Güçlü Bir Mülakat Cevabı Nasıl Kurulur?', en: 'Step by Step: How Do You Build a Strong Interview Answer?' },
  steps: [
    { id: 1, icon: '🎧', label: { tr: 'Senaryoyu tam dinle', en: 'Listen to the full scenario' }, detail: { tr: 'Soruda geçen her somut ayrıntıyı (kaç kez, kim ne dedi, hangi zaman baskısı) not al — bunlar cevabının hangi veriye dayanacağını belirler.', en: 'Note every concrete detail in the question (how many times, who said what, what time pressure) -- these decide what data your answer will rest on.' } },
    { id: 2, icon: '🔍', label: { tr: 'Hangi veriyi çekeceğini söyle', en: 'State which data you would pull' }, detail: { tr: '"Bakarım" yerine "kaydın geçmişini/JQL sorgusunu/ilgili grafiği çekerim" de — somut bir veri kaynağı adı, cevabı bir iddiadan bir eyleme dönüştürür.', en: 'Instead of "I\'ll take a look", say "I pull the record\'s history / a JQL query / the relevant chart" -- naming a concrete data source turns the answer from a claim into an action.' } },
    { id: 3, icon: '🧭', label: { tr: '"Neden bu sırayla" ekle', en: 'Add "why in this order"' }, detail: { tr: 'Hangi adımı NEDEN önce yaptığını açıkla — bu, sayfa boyunca gördüğün katmanlı teşhis mantığının (önce izin, sonra konfigürasyon) mülakattaki karşılığıdır.', en: 'Explain WHY you do a given step first -- this is the interview counterpart of the layered diagnosis logic you saw throughout the page (permission first, then configuration).' } },
    { id: 4, icon: '⚖️', label: { tr: 'Kime ne söyleyeceğini ayır', en: 'Separate who you say what to' }, detail: { tr: "Developer'a, PO'ya ve takıma söyleyeceğin şey AYNI DEĞİLDİR — birine veri, birine karar önerisi, birine maliyet sunarsın. Tek bir genel cümle bu ayrımı kaybettirir.", en: 'What you say to the developer, the PO and the team is NOT THE SAME -- to one you present data, to another a decision proposal, to another a cost. A single generic sentence loses this distinction.' } },
    { id: 5, icon: '☕', label: { tr: 'Bir karşılaştırma ekle', en: 'Add a comparison' }, detail: { tr: "Java, otomasyon ya da günlük bir mühendislik pratiğiyle kısa bir benzetme, cevabının ezber değil ANLAYIŞ olduğunu gösterir — sayfa boyunca gördüğün her senaryo sorusunun cevabı bunu yapar.", en: 'A short comparison to Java, automation or an everyday engineering practice shows your answer is UNDERSTANDING, not memorization -- every scenario question\'s answer throughout the page does this.' } },
  ],
}

// ─── code-playground: zayıf cevabı güçlü cevaba dönüştür (GRUP M) ─────────────
const weakToStrongAnswerPlayground = {
  type: 'code-playground',
  relatedTopicId: 'jira-m1-interview',
  id: 'jira-m1-weak-to-strong-answer',
  title: { tr: 'Kendin Dene: Zayıf Cevabı Güçlü Cevaba Dönüştür', en: 'Try It Yourself: Turn a Weak Answer Into a Strong One' },
  starterCode: {
    tr: `Soru: "Bir developer'ın smart commit #resolve komutu çalışmıyor. Ne yaparsın?"

Zayıf cevap: "Muhtemelen bir hata vardır, kontrol ederim ve düzeltirim."`,
    en: `Question: "A developer's smart commit #resolve command is not working. What do you do?"

Weak answer: "There's probably some error, I'll check it and fix it."`,
  },
  solutionCode: {
    tr: `Güçlü cevap: "Önce issue anahtarının commit mesajında doğru yazıldığını kontrol ederim
— tek bir yazım hatası tüm komutu geçersiz kılar. Sonra mevcut workflow durumundan
Done'a doğrudan bir geçişin TANIMLI olup olmadığına bakarım; smart commit workflow
koşullarını bypass etmez, geçiş yoksa komut sessizce başarısız olur. Bu, bir API
çağrısının izin şemasını bypass edememesiyle aynı prensip — sözdizimi doğru olsa
bile iş kuralı izin vermezse işlem geçmez."`,
    en: `Strong answer: "First I check whether the issue key is written correctly in the
commit message -- a single typo invalidates the whole command. Then I check whether
a direct transition to Done is DEFINED from the current workflow status; smart
commit does not bypass workflow rules, and if no transition exists the command
silently fails. This is the same principle as an API call being unable to bypass
the permission scheme -- even with correct syntax, if the business rule does not
allow it, the action does not go through."`,
  },
  hint: {
    tr: "Zayıf cevabı güçlendirmek için üç şeyi ekle: (1) hangi somut veriye/duruma bakacağını, (2) bunu NEDEN önce kontrol ettiğini, (3) sayfada öğrendiğin bir mekanizmayla (workflow koşulu, izin şeması) kısa bir karşılaştırma. \"Kontrol ederim\" bir eylem değil bir niyettir — mülakatçı NASIL kontrol edeceğini duymak ister.",
    en: 'To strengthen the weak answer, add three things: (1) which concrete data/state you would check, (2) WHY you check that first, (3) a short comparison to a mechanism you learned on the page (a workflow condition, a permission scheme). "I\'ll check it" is an intention, not an action -- the interviewer wants to hear HOW you would check.',
  },
  successMessage: {
    tr: "Doğru! Fark uzunlukta değil, İÇERİKTE: güçlü cevap somut bir veri kaynağı adlandırır, bir sıralama gerekçesi verir ve öğrenilen bir mekanizmayla karşılaştırır. Bu üçü, bu sayfadaki HER senaryo sorusunun cevabında aynı kalıptır.",
    en: 'Correct! The difference is not length, it is CONTENT: a strong answer names a concrete data source, gives an ordering rationale, and compares to a learned mechanism. These three stay the same pattern in the answer to EVERY scenario question on this page.',
  },
}

// ─── Sekmeler (GRUP A-M) ──────────────────────────────────────────────────────
// ⚠ Sekme başlıkları DONDURULMUŞTUR: bölüm URL'lerinin slug'ları bu başlıklardan
// türetilir ve manifest'e yazılmıştır (src/data/generated/sectionSlugs.js).
// Başlığı değiştirmek yayınlanmış bir adresi sessizce başka içeriğe düşürür.
const sections = [

  // ── 0 · GRUP A: Jira Nedir? ────────────────────────────────────────────────
  {
    title: { tr: '🏠 Jira Nedir?', en: '🏠 What is Jira?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏥',
        content: {
          tr: "Jira'yı bir hastanenin hasta dosyası sistemi gibi düşün. Hastaneye gelen her şikâyet bir dosya açar: kim getirdi, hangi şikâyetle, hangi tetkikler yapıldı, hangi doktor ne zaman ne yaptı, taburcu edildi mi, kontrolde tekrar geldi mi. Doktorlar birbirine koridorda da bir şeyler anlatır — ama tedavi kararı dosyaya bakılarak verilir.\n\nŞimdi düşündürücü soru: ekip zaten aynı odada oturuyor, Slack açık ve bug'ı developer'a on saniyede anlatabiliyorsan, neden ayrıca bir sisteme yazasın? Cevap, bilginin ŞU AN değil ÜÇ AY SONRA ne kadar değerli olduğunda gizli.\n\nKarşılaştır: Java'da bir hata aldığında elinde stack trace vardır — hangi sınıf, hangi satır, hangi çağrı zinciri. Koridorda söylenen \"ödeme çalışmıyor\" cümlesi, stack trace'i olmayan bir exception'dır: bilgi vardır ama izlenebilir değildir.\n\nQA açısından bedeli şudur: kayıtsız düzeltilen bir bug, üç ay sonra aynı modülde geri döndüğünde takım hiçbir şey hatırlamaz — hangi koşulda çıktığını, kimin neyi değiştirdiğini, o zaman nasıl doğrulandığını. Regresyon testini neye göre yazacağını bilemezsin. Jira'nın asıl işi bilet açmak değil, o kurum hafızasını tutmaktır.",
          en: 'Think of Jira as a hospital patient-record system. Every complaint that walks in opens a file: who brought it, with which symptom, which tests were run, which doctor did what and when, was it discharged, did it come back for a check-up. Doctors also tell each other things in the hallway -- but treatment decisions are made by reading the file.\n\nNow the question worth pausing on: if the team already sits in one room, Slack is open and you can describe the bug to the developer in ten seconds, why write it into a system at all? The answer hides in how valuable the information is not NOW, but THREE MONTHS from now.\n\nCompare: in Java, when something fails you hold a stack trace -- which class, which line, which call chain. The sentence "checkout is broken" said in a hallway is an exception without a stack trace: there is information, but it is not traceable.\n\nThe cost for QA is this: a bug fixed without a record returns three months later in the same module and the team remembers nothing -- under which condition it appeared, who changed what, how it was verified back then. You cannot decide what regression test to write. The real job of Jira is not opening tickets, it is holding that organizational memory.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🎬 Gerçek Senaryo: Koridorda Söylenen Bug', en: '🎬 Real Scenario: The Bug Told in the Hallway' },
      },
      {
        type: 'text',
        content: {
          tr: "ShopQA adında bir e-ticaret uygulaması üzerinde çalışıyorsun; sayfa boyunca aynı örneği kullanacağız. Ödeme adımında yüzde bazlı bir kupon uygulandığında indirim iki kez düşülüyor. Bu bir para hatası: müşteri az ödüyor, şirket zarar ediyor, muhasebe farkı ay sonunda görüyor.\n\nAşağıdaki film, bu bug'ın Jira'daki tam yolculuğunu gösteriyor — kayıttan ölçüme altı adım. Son sahne, aynı bug'ın kayıt tutulmadan düzeltildiğinde üç ay sonra ne olduğunu anlatıyor. İki yolu yan yana gör.",
          en: 'You are working on an e-commerce application called ShopQA; we will use the same example throughout the page. On the checkout step, when a percentage-based coupon is applied, the discount is deducted twice. This is a money bug: the customer pays less, the company loses, and accounting notices the gap at month end.\n\nThe film below shows the full journey of this bug through Jira -- six steps from record to measurement. The final scene shows what happens three months later when the same bug is fixed without a record. See the two paths side by side.',
        },
      },
      bugJourneyFilm,
      issueLifecycleSteps,
      {
        type: 'grid',
        cols: 3,
        items: [
          {
            icon: '🧾',
            label: { tr: 'Kayıt: tek bir gerçek', en: 'Record: a single truth' },
            desc: {
              tr: 'Bir issue anahtarı (SHOP-142) commit mesajında, test raporunda, sprint panosunda ve mülakattaki cümlende aynı şeyi işaret eder. Adı olmayan bir sorun üzerinde iki kişi anlaşamaz.',
              en: 'One issue key (SHOP-142) points to the same thing in a commit message, a test report, a sprint board and a sentence in an interview. Two people cannot agree on a problem that has no name.',
            },
          },
          {
            icon: '🔗',
            label: { tr: 'İzlenebilirlik: zincir', en: 'Traceability: the chain' },
            desc: {
              tr: 'Gereksinim → test → koşum → bug → düzeltme zinciri kurulduğunda "bu sürümde ne test edildi ve neyi kaçırdık" sorusu tahminle değil veriyle cevaplanır.',
              en: 'When the requirement to test to run to bug to fix chain is built, the question "what was tested in this release and what did we miss" is answered with data instead of guesswork.',
            },
          },
          {
            icon: '📊',
            label: { tr: 'Ölçüm: nereye test yazacağın', en: 'Measurement: where to test next' },
            desc: {
              tr: 'Kayıtlar birikince hangi modülün bug ürettiği, hangi bug\'ların yeniden açıldığı ve hangi testlerin işe yaradığı görünür. Test stratejisi sezgiyle değil bu sayılarla güncellenir.',
              en: 'Once records accumulate you can see which module produces bugs, which bugs get reopened and which tests actually pay off. Test strategy is updated with these numbers, not with intuition.',
            },
          },
        ],
      },
      {
        type: 'heading',
        text: { tr: '🔍 Kayıt Ne İşe Yarar: İlk Sorgun', en: '🔍 What a Record Buys You: Your First Query' },
      },
      {
        type: 'text',
        content: {
          tr: "Kayıt tutmanın ilk somut karşılığı arama yapabilmektir. Jira'nın kendi sorgu dili JQL, panoya bakarak asla göremeyeceğin soruları cevaplar. Sözdizimi basit bir kalıp izler: ALAN = DEĞER, birden fazla koşul AND ile zincirlenir. Aşağıdaki örnek, \"benim açtığım, henüz kapanmamış issue'lar\" sorusunu bu kalıpla cevaplıyor — JQL'in tamamını (operatörler, zaman fonksiyonları) JQL sekmesinde derinlemesine işleyeceğiz, ama bu üç parçayı şimdiden tanıman aşağıdaki alıştırmayı çözmen için yeterli.",
          en: 'The first concrete payoff of keeping records is being able to search. Jira\'s own query language, JQL, answers questions a board can never show you. The syntax follows a simple pattern: FIELD = VALUE, with multiple conditions chained by AND. The example below answers "issues I opened that are not yet closed" with this pattern -- we will cover all of JQL (operators, time functions) in depth on the JQL tab, but knowing these three pieces already is enough to solve the exercise below.',
        },
      },
      {
        type: 'code',
        language: 'sql',
        code: {
          tr: `-- "Benim açtığım, henüz kapanmamış issue'lar"
-- ALAN = DEĞER, koşullar AND ile zincirlenir
project = SHOP AND reporter = currentUser() AND status != Done`,
          en: `-- "Issues I opened that are not yet closed"
-- FIELD = VALUE, conditions chained with AND
project = SHOP AND reporter = currentUser() AND status != Done`,
        },
      },
      {
        type: 'text',
        content: {
          tr: "Üç parçaya dikkat et: `reporter = currentUser()` — kullanıcı adını elle yazmak yerine Jira'nın sunduğu bu fonksiyon sorguyu kişiselleştirir, aynı sorgu kimde çalışırsa çalışsın kendi sonucunu verir. `status != Done` — `!=` \"eşit değil\" demektir. `AND` — her koşulu bir öncekine ekler, kümeyi daraltır. Şimdi aynı kalıpla, ama \"açan kişi\" yerine \"atanan kişi\" ve ek olarak bir issue tipi koşulu kullanan benzer bir sorguyu kendin yaz.",
          en: 'Notice three pieces: `reporter = currentUser()` -- instead of typing a username by hand, this function Jira provides personalizes the query, giving its own result no matter who runs it. `status != Done` -- `!=` means "not equal to". `AND` -- adds each condition to the previous one, narrowing the set. Now write a similar query yourself using the same pattern, but with "assignee" instead of "opened by" and an added issue-type condition.',
        },
      },
      firstJqlPlayground,
      {
        type: 'quiz',
        question: {
          tr: "Bir bug'ı koridorda developer'a söyleyip düzelttirdin, kayıt açmadın. Bu yaklaşımın YARATTIĞI asıl risk aşağıdakilerden hangisidir?",
          en: 'You told a developer about a bug in the hallway, they fixed it, and no record was created. Which of the following is the REAL risk this approach creates?',
        },
        options: [
          { id: 'a', text: { tr: "Bug'ın düzeltilmesi daha uzun sürer", en: 'Fixing the bug takes longer' } },
          { id: 'b', text: { tr: 'Aynı hata tekrarladığında ekipte hiçbir bağlam kalmaz: koşul, ortam ve çözüm hatırlanmaz', en: 'When the same failure recurs the team has no context left: the condition, the environment and the fix are not remembered' } },
          { id: 'c', text: { tr: "Developer'ın motivasyonu düşer", en: 'The developer loses motivation' } },
          { id: 'd', text: { tr: 'Jira lisans ücreti boşa gider', en: 'The Jira license fee is wasted' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Koridor konuşması bugünü çözer, yarını çözmez. Kayıt olmadığında regresyon testini neye göre yazacağın, hatanın hangi ortamda çıktığı ve o zaman nasıl doğrulandığı kaybolur. Süre veya motivasyon ikincil sonuçlardır; asıl kayıp kurum hafızasıdır.",
          en: 'A hallway conversation solves today, not tomorrow. Without a record you lose what to base the regression test on, in which environment the failure appeared and how it was verified back then. Duration or motivation are secondary effects; the real loss is organizational memory.',
        },
        retryQuestion: {
          question: {
            tr: "SHOP-142 gibi bir issue anahtarının commit mesajına yazılmasının en somut faydası nedir?",
            en: 'What is the most concrete benefit of writing an issue key like SHOP-142 into a commit message?',
          },
          options: [
            { id: 'a', text: { tr: 'Commit mesajı daha uzun olur', en: 'The commit message gets longer' } },
            { id: 'b', text: { tr: 'Kod değişikliği ile bug kaydı birbirine bağlanır; ileride "bu satır neden böyle" sorusu cevaplanabilir', en: 'The code change and the bug record become linked; later the question "why is this line like this" can be answered' } },
            { id: 'c', text: { tr: 'Build daha hızlı çalışır', en: 'The build runs faster' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Anahtar, kod ile kaydı birbirine bağlayan tek iptir. Bu bağ kurulduğunda bir satırın gerekçesi, o satırı doğuran hata ve o hatanın doğrulama adımları tek tıkla bulunur.',
            en: 'The key is the single thread tying code to record. Once tied, the rationale of a line, the failure that produced it and that failure\'s verification steps are one click away.',
          },
        },
      },
      bugFlowChallenge,
      {
        type: 'heading',
        text: { tr: "🧑‍🤝‍🧑 A2. Jira'yı Kimler Kullanır, QA Nerede Durur?", en: '🧑‍🤝‍🧑 A2. Who Uses Jira, and Where Does QA Stand?' },
      },
      {
        type: 'simple-box',
        emoji: '🎭',
        content: {
          tr: "Bir tiyatro oyununu düşün: yönetmen (PO) hangi sahnenin ne zaman oynanacağına karar verir, oyuncu (developer) repliği söyler, ışıkçı (QA) ise her sahnenin doğru ışıkla, doğru anda, hatasız aktığını kontrol eder. Üçü de aynı oyunun içindedir ama sahnedeki rolleri farklıdır.\n\nDüşündürücü soru: QA'in Jira'daki en sık yaptığı işlem neden \"issue açmak\" değil \"issue'yu bir durumdan diğerine taşımak\"tır? Çünkü QA'in asıl işi üretmek değil doğrulamaktır — panoda en çok geçiş yapan rol budur, çünkü her doğrulama bir geçiş kaydı bırakır.\n\nKarşılaştır: Java'da bir arayüz (`interface`) farklı sınıflara farklı sorumluluk yükler ama hepsi aynı sözleşmeye uyar. Developer, PO ve QA de aynı issue şemasına (aynı `Bug` \"arayüzüne\") farklı yöntemlerle katkı verir — biri kod yazar, biri karar verir, biri doğrular.\n\nQA açısından bedeli: rolü net tanımlanmamış bir takımda QA hem raporu yazar hem test eder hem de kapatır — doğrulayan kişi düzelten kişiyle aynı olur ve \"bende çalışıyor\" sorununun panzehiri kaybolur.",
          en: 'Picture a stage play: the director (PO) decides which scene plays when, the actor (developer) delivers the lines, and the lighting operator (QA) checks that every scene flows with the right light, at the right moment, without a glitch. All three are in the same play, but their roles on stage differ.\n\nThe question worth pausing on: why is QA\'s most frequent action in Jira not "create an issue" but "move an issue from one status to another"? Because QA\'s real job is not producing but verifying -- it is the role that makes the most transitions on the board, because every verification leaves a transition record.\n\nCompare: in Java an interface loads different responsibilities onto different classes, yet all honor the same contract. Developer, PO and QA all contribute to the same issue schema (the same "Bug" interface) through different methods -- one writes code, one decides, one verifies.\n\nThe cost for QA: on a team where roles are not clearly defined, QA ends up writing the report, testing it and closing it -- the verifier becomes the same person as the fixer, and the antidote to "it works on my machine" disappears.',
        },
      },
      jiraRoleGrid,
      {
        type: 'quiz',
        question: {
          tr: 'Bir bug 4 kez Reopened olmuş ve her seferinde kapatan kişi düzelten developer\'ın kendisi. Bu düzen niçin risklidir?',
          en: 'A bug has been reopened 4 times, and each time it was closed by the very developer who fixed it. Why is this arrangement risky?',
        },
        options: [
          { id: 'a', text: { tr: "Developer'ın iş yükü artar", en: "The developer's workload increases" } },
          { id: 'b', text: { tr: 'Doğrulayan kişi düzelten kişiyle aynıdır — "bende çalışıyor" sorununu yakalayacak bağımsız bir göz kalmaz', en: 'The verifier is the same person as the fixer -- no independent eye remains to catch the "it works on my machine" problem' } },
          { id: 'c', text: { tr: 'Jira lisansı bunu izin vermez', en: 'The Jira license does not allow this' } },
          { id: 'd', text: { tr: 'Bug otomatik olarak duplicate sayılır', en: 'The bug is automatically counted as a duplicate' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Doğrulama işinin değeri, doğrulayanın düzeltenden farklı bir kişi olmasından gelir — kendi kodunu kendi test eden biri, kendi kör noktasını göremez. Reopened sayısının yüksek olması bunun somut kanıtıdır.",
          en: 'The value of verification comes from the verifier being a different person than the fixer -- someone testing their own code cannot see their own blind spot. A high reopen count is concrete evidence of exactly this.',
        },
        retryQuestion: {
          question: {
            tr: 'Product Owner\'ın Jira\'daki asıl kararı hangisidir?',
            en: "What is the Product Owner's core decision in Jira?",
          },
          options: [
            { id: 'a', text: { tr: "Bug'ın severity'sini belirlemek", en: "Setting the bug's severity" } },
            { id: 'b', text: { tr: "Priority'yi belirlemek ve backlog'u sıralamak", en: 'Setting priority and ordering the backlog' } },
            { id: 'c', text: { tr: "Kodu review etmek", en: 'Reviewing the code' } },
          ],
          correct: 'b',
          explanation: {
            tr: "Severity teknik bir değerlendirmedir ve genelde QA önerir; PO'nun kararı iş takvimidir — priority ve backlog sıralaması.",
            en: "Severity is a technical assessment usually proposed by QA; the PO's decision is the business calendar -- priority and backlog ordering.",
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '☁️ A3. Jira Cloud vs Data Center', en: '☁️ A3. Jira Cloud vs Data Center' },
      },
      {
        type: 'simple-box',
        emoji: '🏨',
        content: {
          tr: "Jira Cloud ile Data Center arasındaki fark, otelde kalmakla kendi evinde oturmak arasındaki farka benzer. Otelde (Cloud) her şeyi Atlassian yönetir — oda kendiliğinden temizlenir, güncellenir, sen sadece kullanırsın. Kendi evinde (Data Center) bakımı, tadilat takvimini ve kilit sistemini sen belirlersin — daha fazla kontrol, daha fazla sorumluluk.\n\nDüşündürücü soru: aynı ürünün iki sürümü niçin farklı REST API adresi kullanır (`/rest/api/3/` vs `/rest/api/2/`)? Çünkü sürümler bağımsız hızlarda gelişir; Cloud sürekli güncellenirken Data Center'ın API'si bir şirketin yükseltme takvimine bağlıdır ve daha yavaş değişir.\n\nKarşılaştır: Java'da bir kütüphanenin `v2` ve `v3` sürümünü aynı anda desteklemek zorunda kalman gibi — API sözleşmesi aynı işi yapar ama küçük ayrıntılar (endpoint yolu, alan adları) sürüme göre değişir. Kodun hangi sürüme konuştuğunu bilmemesi, sessiz 404'lere yol açar.\n\nQA açısından bedeli: bir otomasyon scripti Cloud için yazılıp Data Center'a karşı koşulduğunda API adresi tutmayabilir — hata mesajı \"kimlik doğrulama başarısız\" gibi yanıltıcı görünebilir, oysa kök neden yanlış API sürümüdür.",
          en: 'The difference between Jira Cloud and Data Center is like staying in a hotel versus living in your own house. In the hotel (Cloud), Atlassian manages everything -- the room cleans and updates itself, you just use it. In your own house (Data Center) you decide the maintenance, the renovation schedule and the lock system -- more control, more responsibility.\n\nThe question worth pausing on: why does the same product use a different REST API address in its two editions (`/rest/api/3/` vs `/rest/api/2/`)? Because the editions evolve at independent speeds; Cloud updates continuously while Data Center\'s API is tied to a company\'s upgrade calendar and changes more slowly.\n\nCompare: it is like having to support the `v2` and `v3` of a Java library at once -- the API contract does the same job, but small details (the endpoint path, field names) differ by version. Code that does not know which version it is talking to produces silent 404s.\n\nThe cost for QA: an automation script written for Cloud and run against Data Center may not hit the right API address -- the error can look misleadingly like "authentication failed" when the root cause is the wrong API edition.',
        },
      },
      cloudVsDcTable,
      cloudScopeCallout,
      {
        type: 'quiz',
        question: {
          tr: "Cloud için yazılan bir otomasyon scripti Data Center'a karşı koşuluyor ve `404 Not Found` alıyor, kimlik bilgileri doğru. En olası kök neden nedir?",
          en: 'An automation script written for Cloud is run against Data Center and gets `404 Not Found`, credentials are correct. What is the most likely root cause?',
        },
        options: [
          { id: 'a', text: { tr: 'API token süresi dolmuş', en: 'The API token has expired' } },
          { id: 'b', text: { tr: "Script `/rest/api/3/` adresine istek atıyor ama Data Center farklı bir uç nokta sürümü bekliyor olabilir", en: 'The script sends requests to `/rest/api/3/` but Data Center may expect a different endpoint version' } },
          { id: 'c', text: { tr: 'Ağ bağlantısı kopuk', en: 'The network connection is down' } },
          { id: 'd', text: { tr: "Proje company-managed değil", en: 'The project is not company-managed' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Kimlik bilgileri doğruysa ve 404 alınıyorsa sorun genelde adres/yol uyuşmazlığıdır. Cloud ve Data Center bazı uç noktalarda farklı API sürümü kullanır; bu, kimlik doğrulamayla değil sürümle ilgili bir kök nedendir.",
          en: 'If credentials are correct and you get a 404, the problem is usually an address/path mismatch. Cloud and Data Center use a different API version on some endpoints; this is a version-related root cause, not an authentication one.',
        },
        retryQuestion: {
          question: {
            tr: 'Bu sayfadaki örnekler ve REST API çağrıları hangi sürüm temellidir?',
            en: 'Which edition are the examples and REST API calls on this page based on?',
          },
          options: [
            { id: 'a', text: { tr: 'Jira Data Center', en: 'Jira Data Center' } },
            { id: 'b', text: { tr: 'Jira Cloud', en: 'Jira Cloud' } },
            { id: 'c', text: { tr: 'İkisi de eşit ağırlıkta', en: 'Both, equally weighted' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Sayfa Jira Cloud temellidir; Data Center farkı önemli olduğunda ayrıca belirtilir.',
            en: 'The page is Jira Cloud based; Data Center differences are called out separately where they matter.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '🔗 A4. İzlenebilirlik (Traceability) Nedir?', en: '🔗 A4. What Is Traceability?' },
      },
      {
        type: 'simple-box',
        emoji: '🧬',
        content: {
          tr: "İzlenebilirlik, bir DNA testi zincirine benzer: bir bulgudan geriye doğru gidip hangi örnekten, hangi kaynaktan geldiğini kanıtlayabilirsin. Jira'da da bir bug'dan geriye gidip onu yakalayan testi, o testin bağlı olduğu gereksinimi ve son koşumun hangi build'de çalıştığını kanıtlayabilmen gerekir.\n\nDüşündürücü soru: \"bu sürümde ne test edildi\" sorusu neden bir bug listesine bakarak cevaplanamaz? Çünkü bug listesi yalnızca BULUNAN şeyleri gösterir; asıl soru neyin TEST EDİLİP hiç bulunamadığını da kapsar — izlenebilirlik zinciri olmadan \"hiç test edilmemiş\" ile \"test edildi ve geçti\" birbirinden ayırt edilemez.\n\nKarşılaştır: Java'da bir stack trace, hatanın en üst çağrıdan en alt satıra kadar tam zincirini verir — hangi metot hangi metodu çağırdı. İzlenebilirlik matrisi de aynı fikri iş süreci düzeyinde uygular: gereksinim → test → koşum → bug zinciri.\n\nQA açısından ölçülebilir kazanç: bir üretim sızıntısı olduğunda \"bu senaryo hiç test edilmemiş miydi, yoksa test edilip mi kaçırıldı\" sorusunun cevabı zincir varsa saniyeler içinde, yoksa günler süren bir arkeolojik kazı ile bulunur.",
          en: 'Traceability is like a DNA test chain: from a finding you can trace backward and prove which sample, which source it came from. In Jira you likewise need to be able to trace backward from a bug to the test that caught it, the requirement that test is tied to, and which build the latest run executed against.\n\nThe question worth pausing on: why can the question "what was tested in this release" not be answered by looking at a bug list? Because a bug list only shows what was FOUND; the real question also covers what was TESTED and never found -- without a traceability chain, "never tested" and "tested and passed" are indistinguishable.\n\nCompare: in Java a stack trace gives you the full chain of a failure from the outermost call down to the exact line -- which method called which. A traceability matrix applies the same idea at the process level: requirement to test to run to bug.\n\nThe measurable payoff for QA: when a leak reaches production, the question "was this scenario never tested, or tested and missed" is answered in seconds if the chain exists, and by a days-long archaeological dig if it does not.',
        },
      },
      traceabilityFlow,
      {
        type: 'quiz',
        question: {
          tr: "Üretime bir bug sızdı. İzlenebilirlik zinciri (requirement → test → koşum → bug) kurulu değil. Bu eksikliğin doğrudan sonucu nedir?",
          en: 'A bug leaked to production. The traceability chain (requirement to test to run to bug) is not in place. What is the direct consequence of this gap?',
        },
        options: [
          { id: 'a', text: { tr: "Bug daha yavaş düzeltilir", en: 'The bug gets fixed more slowly' } },
          { id: 'b', text: { tr: "Senaryonun hiç test edilmediği mi yoksa test edilip kaçırıldığı mı belirsiz kalır", en: 'Whether the scenario was never tested or was tested and missed remains unclear' } },
          { id: 'c', text: { tr: "Bug'ın severity'si otomatik yükselir", en: "The bug's severity automatically rises" } },
          { id: 'd', text: { tr: 'Proje tipi değiştirilmek zorunda kalır', en: 'The project type has to be changed' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Zincir olmadan bir sızıntının kök nedeni (kapsam boşluğu mu, test etkisizliği mi) ayırt edilemez — ikisi de aynı sonucu (üretimde bug) verir ama düzeltme stratejisi tamamen farklıdır.",
          en: 'Without the chain, the root cause of a leak (a coverage gap versus a test that was ineffective) cannot be told apart -- both produce the same outcome (a bug in production) but the fix strategy is entirely different.',
        },
        retryQuestion: {
          question: {
            tr: 'İzlenebilirlik zincirinde bir test senaryosu doğrudan hangi kayda bağlanır?',
            en: 'In the traceability chain, a test case is directly linked to which record?',
          },
          options: [
            { id: 'a', text: { tr: 'Doğrudan bir Epic\'e', en: 'Directly to an Epic' } },
            { id: 'b', text: { tr: 'Ait olduğu gereksinime (Story)', en: 'The requirement it belongs to (Story)' } },
            { id: 'c', text: { tr: 'Rastgele bir sprint\'e', en: 'A random sprint' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Zincir gereksinimden başlar: her test bir gereksinime bağlanır, her koşum bir teste, her bug da başarısız bir koşuma.',
            en: 'The chain starts at the requirement: every test links to a requirement, every run to a test, and every bug to a failed run.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: "🕳️ A5. Jira Olmadan Ne Olur?", en: '🕳️ A5. What Happens Without Jira?' },
      },
      {
        type: 'simple-box',
        emoji: '📉',
        content: {
          tr: "Kayıt tutmadan bug takibi yapmak, muhasebeyi hafızayla tutmaya benzer: küçük ekipte bir süre işe yarar görünür, ekip ya da veri büyüdüğünde çöker. E-posta ve Excel, ikisi de \"kayıt\" hissi verir ama aranamaz, çakışır ve kod ile bağlanamaz.\n\nDüşündürücü soru: bir Excel dosyası da satır satır bug tutabiliyorken, neden özel bir sisteme ihtiyaç var? Çünkü sorun VERİYİ tutmak değil, veriyi ARANABİLİR, ÇAKIŞMASIZ ve KOD İLE BAĞLANABİLİR hâlde tutmaktır — üçü de bir tablonun doğal olarak yapamadığı şeylerdir.\n\nKarşılaştır: bir `HashMap`'in anahtar-değer erişimini elle bir listede arayarak simüle etmeye çalışmak gibi — teknik olarak mümkündür ama veri büyüdükçe O(n) arama O(1)'in yerini tutamaz. Excel'de bug aramak da aynı ölçeklenme sorununu yaşar.\n\nQA açısından bedeli aşağıdaki adımlarda somutlaşıyor: her adım bir öncekinin küçük bir sürtünmesinden doğar ve birikince sistem çöker.",
          en: 'Tracking bugs without a record is like keeping accounting by memory: it looks like it works for a while on a small team, and collapses once the team or the data grows. Email and Excel both give the feeling of "a record" but are not searchable, they conflict, and they cannot be linked to code.\n\nThe question worth pausing on: if an Excel file can hold bugs row by row too, why do you need a dedicated system at all? Because the problem is not holding the DATA, it is keeping that data SEARCHABLE, CONFLICT-FREE and LINKABLE TO CODE -- three things a spreadsheet does not naturally provide.\n\nCompare: it is like trying to simulate a `HashMap`\'s key-value lookup by manually scanning a list -- technically possible, but as data grows an O(n) search cannot substitute for O(1). Searching for bugs in Excel suffers the exact same scaling problem.\n\nThe cost for QA becomes concrete in the steps below: each step is born from a small friction of the one before it, and once they pile up, the system collapses.',
        },
      },
      noJiraCollapseSteps,
      {
        type: 'quiz',
        question: {
          tr: "İki kişi aynı Excel satırını aynı anda düzenliyor ve biri diğerinin değişikliğini fark etmeden üzerine yazıyor. Bu, hangi eksikliğin doğrudan sonucudur?",
          en: 'Two people edit the same Excel row at the same time, and one overwrites the other without noticing. This is the direct consequence of which missing capability?',
        },
        options: [
          { id: 'a', text: { tr: 'Excel dosyasının çok büyük olması', en: 'The Excel file being too large' } },
          { id: 'b', text: { tr: "Kalıcı bir anahtarın ve eşzamanlı düzenlemeyi yöneten bir durum makinesinin (workflow) olmaması", en: 'The absence of a permanent key and a state machine (workflow) that manages concurrent edits' } },
          { id: 'c', text: { tr: 'Yanlış dosya formatı seçilmiş olması', en: 'The wrong file format having been chosen' } },
          { id: 'd', text: { tr: 'İnternet bağlantısının yavaş olması', en: 'A slow internet connection' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Jira'da her issue kalıcı bir anahtara ve tanımlı geçişlere (workflow) sahiptir; eşzamanlı düzenleme kaydın kimliğini bozmaz. Excel'de satırın kimliği yalnızca konumdur — konum çakışınca veri de çakışır.",
          en: "In Jira, every issue has a permanent key and defined transitions (a workflow); concurrent editing does not corrupt the record's identity. In Excel a row's identity is only its position -- when the position collides, the data collides too.",
        },
        retryQuestion: {
          question: {
            tr: 'E-posta ile bildirilen bir bug\'ın en somut eksikliği nedir?',
            en: 'What is the most concrete gap of a bug reported by email?',
          },
          options: [
            { id: 'a', text: { tr: 'Standart bir alan/format taşımaması, aranamaması ve kod ile bağlanamaması', en: 'It carries no standard field/format, is not searchable, and cannot be linked to code' } },
            { id: 'b', text: { tr: 'E-postanın çok uzun sürede gitmesi', en: 'The email taking too long to arrive' } },
            { id: 'c', text: { tr: "E-posta sunucusunun ücretli olması", en: 'The email server being paid' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'E-posta bir kayıt sistemi değildir: her gönderen kendi formatını kullanır, arama zayıftır ve commit mesajına bir e-posta ID\'si yazmak anlamsızdır.',
            en: 'Email is not a record system: every sender uses their own format, search is weak, and writing an email ID into a commit message makes no sense.',
          },
        },
      },
      {
        type: 'faq',
        items: [
          {
            q: { tr: 'Jira nedir, tek cümleyle?', en: 'What is Jira, in one sentence?' },
            a: {
              tr: "Jira, bir ekibin bug, gereksinim ve iş kalemlerini kalıcı bir kimlikle kaydettiği, önceliklendirdiği ve doğruladığı bir iş takip ve proje yönetim sistemidir.",
              en: 'Jira is a work-tracking and project-management system where a team records, prioritizes and verifies bugs, requirements and work items under a permanent identity.',
            },
          },
          {
            q: { tr: 'Jira ücretsiz mi?', en: 'Is Jira free?' },
            a: {
              tr: "Jira Cloud, 10 kullanıcıya kadar ücretsiz bir plan sunar; küçük takımlar ve öğrenme amaçlı kullanım için yeterlidir. Daha büyük takımlar ve ek özellikler (gelişmiş raporlama, izin şemaları) için ücretli katmanlar vardır.",
              en: 'Jira Cloud offers a free plan for up to 10 users, enough for small teams and learning purposes. Larger teams and extra features (advanced reporting, permission schemes) require paid tiers.',
            },
          },
          {
            q: { tr: 'Jira ile Trello arasındaki fark nedir?', en: 'What is the difference between Jira and Trello?' },
            a: {
              tr: "Trello genel amaçlı, basit bir Kanban panosudur — hızlı kurulur ama issue tipi, workflow koşulu, izlenebilirlik matrisi gibi yazılım geliştirmeye özel yapılar taşımaz. Jira, yazılım ekipleri için tasarlanmıştır: bug/story/epic hiyerarşisi, JQL sorgu dili ve test yönetimi eklentileriyle (Xray/Zephyr) çok daha derin bir mühendislik süreci destekler.",
              en: 'Trello is a general-purpose, simple Kanban board -- quick to set up but lacking software-development-specific structures like issue types, workflow conditions, or a traceability matrix. Jira is built for software teams: a bug/story/epic hierarchy, the JQL query language, and test management add-ons (Xray/Zephyr) support a much deeper engineering process.',
            },
          },
          {
            q: { tr: "QA mühendisi olarak Jira'yı öğrenmek zorunda mıyım?", en: 'Do I have to learn Jira as a QA engineer?' },
            a: {
              tr: "Zorunlu değildir ama sektörde en yaygın kullanılan iş takip aracıdır — birçok iş ilanında Jira deneyimi aranır. Daha önemlisi, Jira'yı öğrenmek yalnızca bir aracı öğrenmek değildir: bug raporlama, izlenebilirlik ve kalite metrikleri gibi araç-bağımsız QA becerilerini de bu sayfa üzerinden öğrenirsin.",
              en: 'It is not mandatory, but it is the most widely used work-tracking tool in the industry -- many job listings ask for Jira experience. More importantly, learning Jira is not just learning a tool: this page also teaches tool-independent QA skills like bug reporting, traceability and quality metrics.',
            },
          },
          {
            q: { tr: 'JQL öğrenmek zor mu?', en: 'Is JQL hard to learn?' },
            a: {
              tr: "SQL biliyorsan JQL sana tanıdık gelir — alan, operatör, değer ve sıralama aynı mantıkla dizilir. Öğrenme eğrisinin en dik kısmı JQL'in bir veritabanı dili OLMADIĞINI (JOIN yapamaz) kavramaktır; bu sınırı bildikten sonra günlük kullanım hızla oturur.",
              en: 'If you know SQL, JQL will feel familiar -- field, operator, value and ordering line up with the same logic. The steepest part of the learning curve is grasping that JQL is NOT a database language (it cannot JOIN); once you know that boundary, daily use settles in quickly.',
            },
          },
          {
            q: { tr: 'Jira Cloud ile Jira Data Center arasında hangisini öğrenmeliyim?', en: 'Which should I learn, Jira Cloud or Jira Data Center?' },
            a: {
              tr: "Jira Cloud ile başla — bugün yeni açılan hesapların büyük çoğunluğu Cloud'dur ve ücretsiz bir hesapla hemen deneyebilirsin. Temel kavramlar (issue, workflow, JQL) ikisinde de aynıdır; Data Center'a geçtiğinde farklılık gösteren yalnızca REST API adresi ve proje tipi seçenekleri gibi birkaç noktadır.",
              en: 'Start with Jira Cloud -- the vast majority of accounts opened today are Cloud, and you can try it immediately with a free account. The core concepts (issue, workflow, JQL) are identical in both; only a few points differ when you move to Data Center, like the REST API address and the project type options.',
            },
          },
        ],
      },
    ],
  },

  // ── 1 · GRUP B: Kurulum & İlk Proje ────────────────────────────────────────
  {
    title: { tr: '⚙️ Kurulum & İlk Proje', en: '⚙️ Setup & First Project' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔑',
        content: {
          tr: "Yeni bir Jira projesi açmak, bir laboratuvarın kapı kilidi düzenini seçmeye benzer. İki seçenek var: anahtarı odanın içinde tutmak (team-managed — takım kendi alanlarını, durumlarını, iznini kendi ayarlar) ya da merkezi bir anahtar dolabı kullanmak (company-managed — şemalar merkezden yönetilir, tüm projeler aynı kurallarla çalışır).\n\nDüşündürücü soru: sadece bir bug kaydetmek isteyen bir tester için, daha ilk gün \"proje tipi\" gibi bir mimari karar niçin dayatılıyor? Çünkü bu karar geri alınması pahalı olan tek karardır — alanlar, durumlar ve raporlar hep onun üzerine kurulur.\n\nKarşılaştır: Java'da bir listeyi `new ArrayList<>()` ile serbestçe kurabilirsin ya da paylaşılan, değiştirilemez bir koleksiyona bağlanabilirsin. İlki hızlı ve esnektir, ikincisi tutarlıdır ve büyük bir kod tabanında sürprizi azaltır. Team-managed ile company-managed farkı tam olarak budur.\n\nQA açısından bedeli: iki takım farklı tipte proje kurduysa \"iki takımın bug yoğunluğunu karşılaştıralım\" isteği altı ay sonra imkânsız hâle gelir — alanlar aynı adı taşısa bile aynı şey değildir. Kurulumda verilen karar, ileride yazacağın her raporun sınırını çizer.",
          en: 'Opening a new Jira project is like choosing the lock system of a laboratory. There are two options: keep the key inside the room (team-managed -- the team configures its own fields, statuses and permissions) or use a central key cabinet (company-managed -- schemes are governed centrally and all projects run on the same rules).\n\nThe question worth pausing on: why is an architectural decision like "project type" pushed onto a tester who only wants to log a bug, on day one? Because it is the one decision that is expensive to undo -- fields, statuses and reports are all built on top of it.\n\nCompare: in Java you can freely build a list with `new ArrayList<>()`, or bind to a shared, unmodifiable collection. The first is fast and flexible, the second is consistent and reduces surprises across a large codebase. That is exactly the team-managed versus company-managed difference.\n\nThe cost for QA: if two teams created projects of different types, the request "let us compare the bug density of the two teams" becomes impossible six months later -- fields carrying the same name are not the same thing. The decision made during setup draws the boundary of every report you will ever write.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Kuracaksın', en: '🧭 What You Will Set Up in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "Ücretsiz bir Jira Cloud hesabından başlayıp ilk bug kaydını açacak kadar yol alacaksın: hesap açma, doğru proje tipini seçme, ekip ve rolleri tanımlama, izin şemasının neden bazı geçişleri sana kapattığını anlama, ve ilk issue'yu doğru anahtar düzeniyle oluşturma. Her adımın beklenen çıktısı ve bir doğrulama kontrolü olacak — bir adımın gerçekten başarılı olduğunu görmeden sonrakine geçmek, kurulum sırasında en sık yapılan hatadır.",
          en: 'You will go from a free Jira Cloud account all the way to logging your first bug: creating the account, picking the right project type, defining the team and roles, understanding why the permission scheme blocks some transitions for you, and creating the first issue with a sound key convention. Every step will have an expected output and a verification check -- moving on before seeing that a step truly succeeded is the most common setup mistake.',
        },
      },
      setupJourneyFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ B1. Ücretsiz Jira Cloud Hesabı Açma', en: '1️⃣ B1. Opening a Free Jira Cloud Account' },
      },
      accountSetupSteps,
      {
        type: 'quiz',
        question: {
          tr: "Hesap kurulumunun son adımında boş bir pano görüyorsun — hiç kart yok. Bu ne anlama gelir?", en: "At the final step of account setup you see an empty board -- no cards at all. What does this mean?" },
        options: [
          { id: 'a', text: { tr: 'Kurulum başarısız oldu, bir şey eksik', en: 'Setup failed, something is missing' } },
          { id: 'b', text: { tr: 'Kurulum başarıyla bitti — sütunlar hazır, henüz hiçbir issue kaydedilmedi', en: 'Setup finished successfully -- the columns are ready, no issue has been logged yet' } },
          { id: 'c', text: { tr: "İnternet bağlantısı kesildi", en: 'The internet connection was lost' } },
          { id: 'd', text: { tr: "Proje tipi yanlış seçildi", en: 'The wrong project type was chosen' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Boş bir pano, kurulumun tamamlandığının GÖRSEL kanıtıdır — sütunlar (workflow durumları) hazır, sadece içerik henüz yok. Bir sonraki adım ilk issue'yu kaydetmektir, kurulumu tekrarlamak değil.",
          en: 'An empty board is the VISUAL proof that setup is complete -- the columns (workflow statuses) are ready, only the content is missing yet. The next step is to log the first issue, not to repeat the setup.',
        },
        retryQuestion: {
          question: { tr: 'Site adı (örn. shopqa.atlassian.net) neden dikkatli seçilmelidir?', en: 'Why should the site name (e.g. shopqa.atlassian.net) be chosen carefully?' },
          options: [
            { id: 'a', text: { tr: 'Çünkü kalıcı bir URL parçası olur, kolayca değiştirilmez', en: 'Because it becomes a permanent part of the URL and is not easily changed' } },
            { id: 'b', text: { tr: 'Çünkü ücretlendirmeyi belirler', en: 'Because it determines billing' } },
            { id: 'c', text: { tr: 'Çünkü proje tipini otomatik seçer', en: 'Because it auto-selects the project type' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Site adı seçildikten sonra URL\'nin bir parçası olur ve tüm ekip bu adresi kullanmaya başlar — sonradan değiştirmek link kırıklıklarına yol açar.',
            en: 'Once chosen, the site name becomes part of the URL and the whole team starts using that address -- changing it later breaks links.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ B2. Proje Tipi Seçimi: Team-managed vs Company-managed', en: '2️⃣ B2. Choosing a Project Type: Team-managed vs Company-managed' },
      },
      {
        type: 'text',
        content: {
          tr: "Bu karar, Jira Nedir? sekmesinde gördüğün Cloud/Data Center farkından bağımsız bir eksendir — her iki sürümde de proje tipi seçimi yapılır (Data Center yalnızca company-managed sunar). Aşağıdaki tablo iki tipi dört boyutta karşılaştırıyor.",
          en: "This decision is an axis independent of the Cloud/Data Center difference from the What is Jira? tab -- both editions require a project-type choice (Data Center only offers company-managed). The table below compares the two types across four dimensions.",
        },
      },
      projectTypeTable,
      projectTypeCallout,
      {
        type: 'quiz',
        question: {
          tr: "Beş farklı takımın aynı bug şablonunu, aynı severity alanını ve aynı raporlama standardını kullanması gerekiyor. Hangi proje tipi bu ihtiyaca uyar?",
          en: 'Five different teams need to use the same bug template, the same severity field and the same reporting standard. Which project type fits this need?',
        },
        options: [
          { id: 'a', text: { tr: 'Team-managed — her takım kendi ayarını yapsın', en: 'Team-managed -- let each team configure its own' } },
          { id: 'b', text: { tr: 'Company-managed — şema merkezde tanımlanır, tüm projeler paylaşır', en: 'Company-managed -- the scheme is defined centrally and all projects share it' } },
          { id: 'c', text: { tr: 'İkisi de aynı sonucu verir', en: 'Both give the same result' } },
          { id: 'd', text: { tr: 'Proje tipi raporlamayı etkilemez', en: 'Project type does not affect reporting' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Company-managed tam olarak bu senaryo için tasarlanmıştır: şema paylaşımı sayesinde beş takım aynı alanları ve workflow\'u kullanır, karşılaştırılabilir raporlama mümkün olur.',
          en: 'Company-managed is designed exactly for this scenario: scheme sharing means five teams use the same fields and workflow, making comparable reporting possible.',
        },
        retryQuestion: {
          question: { tr: 'Team-managed bir projeden company-managed\'a altı ay sonra geçmek neden basit bir ayar değişikliği DEĞİLDİR?', en: 'Why is switching from a team-managed project to company-managed six months later NOT a simple setting change?' },
          options: [
            { id: 'a', text: { tr: 'Çünkü alanlar, workflow\'lar ve mevcut issue\'lar elle taşınmalıdır', en: 'Because fields, workflows and existing issues must be moved by hand' } },
            { id: 'b', text: { tr: 'Çünkü Jira böyle bir geçişe izin vermez', en: 'Because Jira does not allow such a switch at all' } },
            { id: 'c', text: { tr: 'Çünkü yalnızca yöneticiler login olabilir', en: 'Because only admins can log in afterward' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Otomatik bir dönüştürme yoktur — bu yüzden karar ilk günden, projenin büyüme beklentisine göre verilmelidir.',
            en: 'There is no automatic conversion -- which is why the decision should be made on day one, based on the project\'s expected growth.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '3️⃣ B3. Ekip, Rol ve İzinler', en: '3️⃣ B3. Team, Roles and Permissions' },
      },
      {
        type: 'simple-box',
        emoji: '🎫',
        content: {
          tr: "Bir izin şeması, bir konser bileti gibi çalışır: bilet türü (VIP, standart, personel) hangi kapıdan gireceğini belirler, kapıdaki görevli bileti KONTROL EDER, tartışmaz. Jira'da izin şeması aynı işi yapar — rolüne göre hangi geçişi yapabileceğin, arayüz seni hiç bilgilendirmeden belirlenir.\n\nDüşündürücü soru: QA'in \"Done\" butonunu göremediği bir projede, bu bir hata mı yoksa tasarım mı? Neredeyse her zaman tasarımdır — takım muhtemelen \"Done\" geçişini yalnızca developer'a açık bırakmış, QA'in \"Ready for QA\"dan sonrasını göremeyeceği bir akış kurmuştur. Görünmeyen buton, çoğu zaman bilinçli bir kural ihlalidir değil, bilinçli bir kısıtlamadır.\n\nKarşılaştır: Java'da `private` bir metot dışarıdan çağrılamaz — derleyici seni engeller ve NEDEN engellendiğini söyler. Jira'nın izin şeması aynı erişim kontrolünü uygular ama derleme hatası yerine SESSİZLİK verir: buton görünmez, hata mesajı çıkmaz. Bu fark, izin sorunlarının Jira'da neden daha çok kafa karıştırdığını açıklar.\n\nQA açısından pratik sonuç: bir geçiş butonu beklenmedik şekilde kayıpsa önce \"bu benim rolüme mi kapalı\" diye sor, önce bug raporu açma.",
          en: 'A permission scheme works like a concert ticket: the ticket type (VIP, standard, staff) decides which gate you enter through, and the gate staff CHECK the ticket, they do not argue with it. In Jira the permission scheme does the same job -- which transition you can perform based on your role is decided without the interface ever telling you.\n\nThe question worth pausing on: on a project where QA cannot see the "Done" button, is that a bug or a design choice? Almost always a design choice -- the team likely left the "Done" transition open only to developers, building a flow where QA never sees past "Ready for QA". A missing button is usually a deliberate restriction, not an accidental rule violation.\n\nCompare: in Java a `private` method cannot be called from outside -- the compiler blocks you and tells you WHY. Jira\'s permission scheme applies the same access control, but instead of a compile error it gives you SILENCE: the button is simply absent, no error message appears. That difference explains why permission issues confuse people in Jira more than elsewhere.\n\nThe practical takeaway for QA: when a transition button is unexpectedly missing, ask "is this closed to my role" first, before filing a bug report.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: "QA rolündeki Ayşe, bir issue'da \"Deploy to Prod\" geçiş butonunu göremiyor; developer Mert görüyor. Ayşe'nin ilk yapması gereken nedir?",
          en: 'Ayse, who has the QA role, cannot see the "Deploy to Prod" transition button on an issue; Mert, the developer, can. What should Ayse do first?',
        },
        options: [
          { id: 'a', text: { tr: 'Hemen bir bug raporu açmak', en: 'File a bug report immediately' } },
          { id: 'b', text: { tr: "Bu geçişin QA rolüne bilinçli olarak kapatılmış olabileceğini düşünüp izin şemasını sormak", en: 'Consider that this transition may be deliberately closed to the QA role, and ask about the permission scheme' } },
          { id: 'c', text: { tr: "Sayfayı yenilemek", en: 'Refresh the page' } },
          { id: 'd', text: { tr: "Kendi rolünü developer olarak değiştirmek", en: 'Change her own role to developer' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Görünmeyen bir buton çoğu zaman kasıtlıdır: prod\'a deploy etmek genelde geliştirici sorumluluğundadır. Bug raporu açmadan önce bunun bir tasarım kararı olup olmadığını sormak zaman kazandırır.',
          en: 'A missing button is usually intentional: deploying to prod is typically a developer responsibility. Asking whether this is a design decision before filing a bug report saves time.',
        },
        retryQuestion: {
          question: { tr: 'İzin şemasının Java\'daki `private` erişim belirleyiciyle ortak yanı nedir?', en: 'What does a permission scheme have in common with Java\'s `private` access modifier?' },
          options: [
            { id: 'a', text: { tr: 'İkisi de yetkisiz erişimi engeller, ama Jira sessizce engeller, Java hata mesajıyla', en: 'Both block unauthorized access, but Jira blocks silently while Java gives an error message' } },
            { id: 'b', text: { tr: 'İkisi de aynı hata mesajını verir', en: 'Both give the exact same error message' } },
            { id: 'c', text: { tr: 'Ortak yanları yoktur', en: 'They have nothing in common' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Erişim kontrolü fikri aynıdır; farkı ortaya çıkış biçimidir — biri derleme hatası, diğeri arayüzde görünmeyen bir buton.',
            en: 'The access-control idea is the same; the difference is how it surfaces -- one as a compile error, the other as a button that simply does not render.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ B4. İlk Issue ve Anahtar Anatomisi', en: '4️⃣ B4. The First Issue and Key Anatomy' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir issue anahtarı iki parçadan oluşur: proje anahtarı (SHOP) ve o projedeki sıra numarası (142). SHOP-142, projedeki 142. issue'nun kalıcı kimliğidir — silinen veya taşınan issue'lar bile bu numarayı BOŞA ÇIKARMAZ, bir sonraki issue 143 numarasını alır. Bu, veritabanındaki auto-increment birincil anahtarla aynı fikirdir: sıra numarası asla yeniden kullanılmaz.",
          en: 'An issue key has two parts: the project key (SHOP) and a sequence number within that project (142). SHOP-142 is the permanent identity of the 142nd issue in the project -- even a deleted or moved issue does NOT free up that number, the next issue takes 143. This is the same idea as an auto-increment primary key in a database: the sequence number is never reused.',
        },
      },
      issueKeyPlayground,
      setupOrderChallenge,
    ],
  },

  // ── 2 · GRUP C: Issue Türleri ve Hiyerarşi ─────────────────────────────────
  {
    title: { tr: '🧩 Issue Türleri ve Hiyerarşi', en: '🧩 Issue Types & Hierarchy' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏗️',
        content: {
          tr: "Bir inşaat projesini düşün: kat planı (Epic) bütün bir hedefi tarif eder, her daire (Story) teslim edilebilir bir parçadır, dairenin içindeki tek tek işler (Sub-task) o parçayı bitiren adımlardır. Bug ise bu hiyerarşinin dışından gelir: teslim edilmiş bir dairede bulunan hasar tespitidir — kendi başına bir iş kalemidir ama daima bir daireye işaret eder.\n\nDüşündürücü soru: sonuçta hepsi panoda birer karta dönüşüyorsa, bir işi Story mi Task mı Bug mı açtığın gerçekten önemli mi? Önemi kartta değil, o karttan üretilen sayıda: \"bu sprintte 20 bug çıktı\" cümlesi, o 20 kartın 12'si aslında unutulmuş bir iş kalemiyse yalan söylüyordur.\n\nKarşılaştır: Java'da yanlış tip kullanırsan derleyici seni durdurur. Jira'da yanlış issue tipi seçersen hiçbir uyarı almazsın — bedel derleme anında değil, üç ay sonra kalite raporunda ortaya çıkar. Tip güvenliği burada makinede değil, disiplindedir.\n\nQA açısından bunun anlamı şudur: bug ile task arasındaki sınırı takımca yazılı olarak tanımlamak, ölçtüğün her kalite metriğinin ön koşuludur. Tanım yoksa metrik yoktur; metrik yoksa \"kalite iyileşiyor mu\" sorusunun cevabı da sezgiden ibarettir.",
          en: 'Picture a construction project: the floor plan (Epic) describes a whole goal, each apartment (Story) is a deliverable piece, and the individual jobs inside it (Sub-task) are the steps that finish that piece. A Bug arrives from outside this hierarchy: it is damage found in an already delivered apartment -- a work item in its own right, yet always pointing back to an apartment.\n\nThe question worth pausing on: if they all end up as cards on a board anyway, does it really matter whether you file something as a Story, a Task or a Bug? The importance is not in the card but in the number produced from it: the sentence "20 bugs came out of this sprint" is a lie if 12 of those cards were really forgotten work items.\n\nCompare: in Java the compiler stops you when you use the wrong type. In Jira picking the wrong issue type raises no warning -- the cost appears not at compile time but three months later in a quality report. Type safety here lives in discipline, not in a machine.\n\nFor QA this means: writing down, as a team, the boundary between a bug and a task is the precondition of every quality metric you measure. No definition, no metric; no metric, and the answer to "is quality improving" is pure intuition.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Öğreneceksin', en: '🧭 What You Will Learn in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "Epic → Story → Task → Sub-task hiyerarşisini ve Bug'ın bu ağaçtaki yerini, bir issue'nun hangi alanlardan (field) oluştuğunu ve bu alanların hangi ekranda (screen) göründüğünü, \"bu alan neden bu projede yok\" sorusunun cevabını, ve issue link tiplerinin (blocks / is blocked by / duplicates / relates to) sprint planlamasını nasıl etkilediğini işleyeceğiz.",
          en: 'We will cover the Epic to Story to Task to Sub-task hierarchy and where a Bug sits in that tree, which fields make up an issue and on which screen those fields appear, the answer to "why is this field missing in this project", and how issue link types (blocks / is blocked by / duplicates / relates to) affect sprint planning.',
        },
      },
      epicToBugFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ C1. Hiyerarşi: Epic → Story → Sub-task', en: '1️⃣ C1. The Hierarchy: Epic to Story to Sub-task' },
      },
      {
        type: 'simple-box',
        emoji: '☕',
        content: {
          tr: "Bu hiyerarşiyi Java paket yapısına benzet: Epic bir PAKET gibidir (`com.shopqa.checkout`) — geniş bir hedefi bir arada tutar. Story bir SINIF gibidir (`CouponService`) — tek bir sorumluluğu, tek bir amacı vardır. Sub-task bir METOT gibidir (`applyDiscount()`) — tek bir somut işi yapar.\n\nDüşündürücü soru: bu analoji nerede kırılır? Bir Java paketi, birbiriyle hiç ilgisi olmayan sınıfları da barındırabilir (zorunlu bir ilişki yoktur) — ama bir Epic'in altındaki tüm Story'ler AYNI hedefe hizmet etmek ZORUNDADIR. Yani Jira hiyerarşisi paketten daha SIKI bir kısıtlama taşır: gruplama değil, ortak bir amaca bölünmedir.\n\nKarşılaştır: bir metodun içinde başka bir metot (iç içe fonksiyon) olabilir ama Java'da sınıfın içinde sınıf sık kullanılmaz; Jira'da da Sub-task'ın altında başka bir Sub-task AÇILAMAZ — hiyerarşi üç seviyeyle sınırlıdır, sonsuz derinlik yoktur.\n\nQA açısından bunun anlamı: bir işi yanlış seviyeye koymak (örneğin bir Sub-task'ı Story gibi açmak) yalnızca görsel bir düzensizlik değildir — raporlama araçları seviyeye göre toplam alır, yanlış seviye o toplamı bozar.",
          en: 'Compare this hierarchy to a Java package structure: an Epic is like a PACKAGE (`com.shopqa.checkout`) -- it holds a broad goal together. A Story is like a CLASS (`CouponService`) -- it has one responsibility, one purpose. A Sub-task is like a METHOD (`applyDiscount()`) -- it does one concrete thing.\n\nThe question worth pausing on: where does this analogy break? A Java package can hold classes with no relation to each other at all (no required link) -- but every Story under an Epic MUST serve the SAME goal. So the Jira hierarchy carries a STRICTER constraint than a package: not grouping, but division toward a shared purpose.\n\nCompare further: a method can contain another method (a nested function), but a class inside a class is uncommon in Java; in Jira a Sub-task under a Sub-task CANNOT be opened either -- the hierarchy is capped at three levels, there is no infinite depth.\n\nWhat this means for QA: filing work at the wrong level (say, opening a Sub-task as if it were a Story) is not just visual clutter -- reporting tools sum things up by level, and the wrong level corrupts that sum.',
        },
      },
      hierarchyBuildSteps,
      {
        type: 'quiz',
        question: {
          tr: "Epic-Story-Sub-task hiyerarşisinin Java paket yapısından NEREDE ayrıştığını en doğru anlatan cümle hangisidir?",
          en: 'Which sentence most accurately describes WHERE the Epic-Story-Sub-task hierarchy diverges from a Java package structure?',
        },
        options: [
          { id: 'a', text: { tr: "İkisi tamamen aynıdır, fark yoktur", en: 'They are entirely identical, there is no difference' } },
          { id: 'b', text: { tr: "Paket ilgisiz sınıfları barındırabilir; Epic'teki her Story AYNI hedefe hizmet etmek zorundadır", en: 'A package can hold unrelated classes; every Story under an Epic MUST serve the SAME goal' } },
          { id: 'c', text: { tr: "Java'da paket kavramı yoktur", en: 'Java has no concept of a package' } },
          { id: 'd', text: { tr: "Jira'da sınırsız derinlikte hiyerarşi kurulabilir", en: 'Jira allows unlimited hierarchy depth' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Analojinin kırıldığı yer tam olarak budur: Jira hiyerarşisi paketten daha sıkıdır çünkü gruplama değil, ortak bir amaca bölünmedir. Hiyerarşi ayrıca üç seviyeyle sınırlıdır, sonsuz derinlik yoktur.",
          en: 'This is exactly where the analogy breaks: the Jira hierarchy is stricter than a package because it is not grouping, it is division toward a shared purpose. The hierarchy is also capped at three levels, with no infinite depth.',
        },
        retryQuestion: {
          question: { tr: 'Bir Story\'nin tüm Sub-task\'ları Done olunca ne olur?', en: "When all of a Story's Sub-tasks go Done, what happens?" },
          options: [
            { id: 'a', text: { tr: "Story otomatik olarak Done olur", en: 'The Story automatically goes Done' } },
            { id: 'b', text: { tr: "Story otomatik bitmez, QA doğrulaması gerekir çünkü kendi workflow'u vardır", en: 'The Story does not auto-finish, QA verification is required because it has its own workflow' } },
            { id: 'c', text: { tr: "Epic silinir", en: 'The Epic gets deleted' } },
          ],
          correct: 'b',
          explanation: {
            tr: "Her issue tipinin kendi workflow'u vardır; alt işlerin bitmesi üst issue'yu otomatik kapatmaz.",
            en: "Every issue type has its own workflow; the parent issue does not auto-close just because the child work is done.",
          },
        },
      },
      {
        type: 'heading',
        text: { tr: "2️⃣ C2. Bug: Kendi Alanları Olan Bir Issue Tipi", en: '2️⃣ C2. Bug: An Issue Type With Its Own Fields' },
      },
      {
        type: 'text',
        content: {
          tr: "Bug, hiyerarşinin bir parçası olmasa da tam teşekküllü bir issue tipidir — kendi alanları ve kendi ekranı vardır. Bug Raporlama Sanatı sekmesinde detaylandıracağımız Severity, Ortam ve Tekrar Üretim Adımları gibi alanlar bir Story'de ANLAMSIZDIR, bir Bug'da ZORUNLUDUR. Aşağıdaki tablo dört issue tipinin kendine özgü alanlarını karşılaştırıyor.",
          en: "Even though it is not part of the hierarchy, Bug is a fully-fledged issue type -- it has its own fields and its own screen. Fields we detail in the Art of Bug Reporting tab like Severity, Environment and Reproduction Steps are MEANINGLESS on a Story, and MANDATORY on a Bug. The table below compares the fields specific to four issue types.",
        },
      },
      issueTypeFieldsTable,
      issueTypeMatchPlayground,
      {
        type: 'heading',
        text: { tr: '3️⃣ C3. Alan, Ekran ve Şema Üçlüsü', en: '3️⃣ C3. The Field, Screen and Scheme Triplet' },
      },
      {
        type: 'simple-box',
        emoji: '🧰',
        content: {
          tr: "Bir alan (field), ekran (screen) ve şema (scheme) üçlüsü bir elektrik tesisatına benzer: alan bir prizdir (veriyi tutar), ekran bir odadaki priz düzenidir (hangi prizler bu odada var), şema ise binanın hangi katının hangi oda düzenini kullandığını belirleyen plandır. Bir odada priz yoksa sorun prizde değil, o katın plan seçiminde olabilir.\n\nDüşündürücü soru: neden bir alan projede \"var\" ama ekranda \"görünmez\" olabilir? Çünkü alan sistemde TANIMLI olmak ile bir issue tipinin EKRANINA eklenmiş olmak farklı şeylerdir — bir alan var olabilir ama hiçbir ekrana bağlanmamışsa hiçbir yerde görünmez.\n\nKarşılaştır: Java'da bir sınıfın `private` bir alanı vardır ama getter yazılmamışsa dışarıdan hiç erişilemez — alan VARDIR ama arayüz (public API) onu göstermez. Jira'da field/screen ayrımı aynı fikri taşır: alan var olmak yetmez, ekrana bağlı (bir \"getter\"ı) olmalı.\n\nQA açısından pratik sonuç: \"bu alanı göremiyorum\" şikâyeti aldığında önce alanın var olup olmadığını değil, o issue tipinin ekranına EKLENİP EKLENMEDİĞİNİ sor.",
          en: 'A field, screen and scheme triplet is like an electrical installation: a field is an outlet (holds data), a screen is the outlet layout of a room (which outlets exist in this room), and a scheme is the building plan that decides which floor uses which room layout. If a room has no outlet, the problem may not be the outlet itself but that floor\'s plan choice.\n\nThe question worth pausing on: why can a field be "present" in the project yet "invisible" on the screen? Because being DEFINED in the system and being ADDED to an issue type\'s SCREEN are different things -- a field can exist yet, if it is bound to no screen, show up nowhere.\n\nCompare: in Java a class can have a `private` field, but without a getter it is never reachable from outside -- the field EXISTS but the interface (the public API) does not expose it. Jira\'s field/screen split carries the same idea: existing is not enough, the field must be bound to a screen (its "getter").\n\nThe practical takeaway for QA: when you hear "I cannot see this field", ask first not whether the field exists, but whether it has been ADDED to that issue type\'s screen.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: "\"Kabul Kriteri\" alanı Story'de görünüyor ama Bug'da görünmüyor. En olası açıklama nedir?",
          en: 'The "Acceptance Criteria" field appears on Story but not on Bug. What is the most likely explanation?',
        },
        options: [
          { id: 'a', text: { tr: 'Alan Bug\'a hiç EKLENMEMİŞ, yani o issue tipinin ekranına bağlı değil', en: 'The field was never ADDED to Bug -- it is not bound to that issue type\'s screen' } },
          { id: 'b', text: { tr: 'Jira Bug\'larda bu alanı teknik olarak desteklemez', en: 'Jira technically does not support this field on Bugs' } },
          { id: 'c', text: { tr: 'Ayşe\'nin izni yetersiz', en: "Ayse's permission is insufficient" } },
          { id: 'd', text: { tr: 'Proje tipi yanlış seçilmiş', en: 'The wrong project type was chosen' } },
        ],
        correct: 'a',
        explanation: {
          tr: "Bu, alan/ekran ayrımının klasik örneğidir: alan sistemde tanımlı olabilir ama Bug ekranına eklenmemişse hiçbir Bug'da görünmez — teknik bir kısıt değil, bir konfigürasyon eksikliğidir.",
          en: 'This is the classic field/screen example: the field may be defined in the system, but if it was never added to the Bug screen it appears on no Bug -- not a technical limitation, a configuration gap.',
        },
        retryQuestion: {
          question: { tr: 'Java\'daki `private` alan + eksik getter benzetmesi field/screen ayrımının hangi yönünü anlatır?', en: "What aspect of the field/screen split does the Java `private` field plus missing getter analogy describe?" },
          options: [
            { id: 'a', text: { tr: 'Bir alan var olmak ile dışarıya (ekrana) açık olmak farklı şeylerdir', en: 'A field existing and being exposed (to a screen) are different things' } },
            { id: 'b', text: { tr: 'Java ile Jira aynı dildir', en: 'Java and Jira are the same language' } },
            { id: 'c', text: { tr: 'private alanlar Jira\'da yasaktır', en: 'private fields are forbidden in Jira' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Tam olarak bu: varlık ile görünürlük ayrı katmanlardır, ikisinin de doğru olması gerekir.',
            en: 'Exactly that: existence and visibility are separate layers, and both need to be correct.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ C4. Link Tipleri ve Sprint Planlamasına Etkisi', en: '4️⃣ C4. Link Types and Their Effect on Sprint Planning' },
      },
      {
        type: 'text',
        content: {
          tr: "Link tipleri issue'lar arasında yön taşıyan ilişkilerdir — yanlış yön veya yanlış tip seçilirse planlama araçları yanlış sırada iş önerir. Aşağıdaki tablo dört yaygın link tipini ve yanlış kullanıldığında sprint planlamasında NE bozulduğunu gösteriyor.",
          en: "Link types are directional relationships between issues -- pick the wrong direction or the wrong type, and planning tools suggest work in the wrong order. The table below shows four common link types and WHAT breaks in sprint planning when they are used incorrectly.",
        },
      },
      linkTypesTable,
      {
        type: 'quiz',
        question: {
          tr: "SHOP-142 bug'ı SHOP-118 story'sine \"relates to\" ile bağlanmış, ama gerçekte SHOP-118 tamamlanmadan SHOP-142'nin test edilmesi mümkün değil. Bu yanlış link neye yol açar?",
          en: 'SHOP-142 the bug is linked to SHOP-118 the story with "relates to", but in reality SHOP-142 cannot be tested before SHOP-118 finishes. What does this wrong link lead to?',
        },
        options: [
          { id: 'a', text: { tr: "Gerçek bağımlılık planlama aracında hiç görünmez, bug erken sıraya alınabilir", en: 'The real dependency never surfaces in the planning tool, the bug can be scheduled too early' } },
          { id: 'b', text: { tr: "Jira otomatik olarak doğru linki önerir", en: 'Jira automatically suggests the correct link' } },
          { id: 'c', text: { tr: "Hiçbir sonucu olmaz, link tipi kozmetiktir", en: 'It has no consequence, link type is cosmetic' } },
          { id: 'd', text: { tr: "Bug otomatik olarak duplicate sayılır", en: 'The bug is automatically counted as a duplicate' } },
        ],
        correct: 'a',
        explanation: {
          tr: "\"relates to\" gevşek bir ilişkidir, bağımlılık taşımaz. Gerçek bir sıra zorunluluğu için \"is blocked by\" gerekir — yoksa planlama aracı bağımlılığı hiç bilmez ve bug'ı olması gerekenden erken sıraya koyabilir.",
          en: '"relates to" is a loose relationship and carries no dependency. A real ordering requirement needs "is blocked by" -- otherwise the planning tool never knows about the dependency and may schedule the bug earlier than it should.',
        },
        retryQuestion: {
          question: { tr: '"duplicates" linkini eksik bırakmanın en somut sonucu nedir?', en: 'What is the most concrete consequence of leaving out the "duplicates" link?' },
          options: [
            { id: 'a', text: { tr: "Aynı sorun iki ayrı kayıt olarak sayılır, kalite metrikleri şişer", en: 'The same problem is counted as two separate records, inflating quality metrics' } },
            { id: 'b', text: { tr: "İki kayıt otomatik birleşir", en: 'The two records automatically merge' } },
            { id: 'c', text: { tr: "Hiçbir etkisi yoktur", en: 'It has no effect' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Link eksikse iki kayıt bağımsız gibi görünür ve raporlarda ayrı ayrı sayılır — Dashboard ve QA Metrikleri sekmesindeki metrikler için bu doğrudan bir bozulma kaynağıdır.',
            en: 'Without the link the two records look independent and are counted separately in reports -- for the metrics on the Dashboards & QA Metrics tab this is a direct source of distortion.',
          },
        },
      },
      hierarchyOrderChallenge,
    ],
  },

  // ── 3 · GRUP D: Bug Raporlama Sanatı ───────────────────────────────────────
  {
    title: { tr: '🐞 Bug Raporlama Sanatı', en: '🐞 The Art of Bug Reporting' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🚨',
        content: {
          tr: "İyi bir bug raporu, bir kaza tutanağına benzer. Tutanağı yazan kişi olay yerinde tek başınadır; onu okuyacak eksper ise oraya asla gitmeyecektir. Bu yüzden tutanakta \"araba çarptı\" yazmaz — hangi kavşak, hangi şerit, hangi hava koşulu, hangi hız, hangi iz. Amaç, okuyanın olayı zihninde yeniden kurabilmesidir.\n\nDüşündürücü soru: developer iki metre ötende otururken ve konuyu on saniyede anlatabilecekken, on dakikanı bir rapor yazmaya harcamak neden mantıklı olsun? Çünkü raporu okuyacak kişi çoğu zaman o developer değildir: gece nöbetindeki başka bir mühendis, altı ay sonraki yeni ekip üyesi, ya da aynı hatayı ikinci kez gören sensin.\n\nKarşılaştır: bir test kırıldığında elinde \"assertion failed\" değil, beklenen ve gerçekleşen değeri yan yana veren bir çıktı olsun istersin. Bug raporu da tam olarak budur — insan diliyle yazılmış bir assertion mesajı. \"Ödeme çalışmıyor\", assertion mesajı olmayan bir fail'dir.\n\nQA açısından ölçülebilir bedeli şudur: eksik rapor \"cannot reproduce\" ile geri döner. Her geri dönüş iki kişinin gününü böler, bug'ın yaşını uzatır ve en kötüsü, gerçek bir hatanın \"tekrar üretilemiyor\" etiketiyle kapanmasına yol açar. Rapor yazma disiplini bir nezaket değil, hata bulma işinin son adımıdır.",
          en: 'A good bug report is like an accident report. The person writing it stands alone at the scene; the adjuster who reads it will never go there. That is why the report does not say "a car crashed" -- it says which junction, which lane, which weather, which speed, which skid marks. The goal is to let the reader rebuild the event in their mind.\n\nThe question worth pausing on: with the developer sitting two metres away and the issue explainable in ten seconds, why spend ten minutes writing a report? Because the reader is usually not that developer: it is another engineer on night duty, a new teammate six months from now, or you, seeing the same failure a second time.\n\nCompare: when a test breaks you want more than "assertion failed" -- you want the expected and the actual value side by side. A bug report is exactly that: an assertion message written in human language. "Checkout is broken" is a failure with no assertion message.\n\nThe measurable cost for QA: an incomplete report bounces back as "cannot reproduce". Every bounce splits two people\'s day, extends the age of the bug and, worst of all, lets a real defect close under a "not reproducible" label. Report-writing discipline is not politeness; it is the final step of finding a defect.',
        },
      },
      badReportFiveDaysFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ D1. İyi Bir Bug Raporunun Anatomisi', en: '1️⃣ D1. The Anatomy of a Good Bug Report' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir bug raporunun altı zorunlu parçası vardır ve her biri farklı bir soruya cevap verir: Başlık (hangi ekranda ne oldu?), Ortam (hangi tarayıcı/sürüm/işletim sistemi?), Ön koşul (hangi kullanıcı, hangi veri?), Adımlar (hangi sırayla tıklandı?), Beklenen/Gerçekleşen (ne olmalıydı, ne oldu?), Kanıt (bunu ne kanıtlıyor?). Altısından biri eksikse okuyan kişi o boşluğu KENDİ varsayımıyla doldurur — ve genelde yanlış varsayar.",
          en: 'A bug report has six mandatory parts, and each answers a different question: Title (what happened on which screen?), Environment (which browser/version/OS?), Precondition (which user, which data?), Steps (in which order was it clicked?), Expected/Actual (what should have happened, what did?), Evidence (what proves it?). Miss any one of the six and the reader fills that gap with their OWN assumption -- and usually assumes wrong.',
        },
      },
      bugReportRepairSteps,
      bugReportPlayground,
      {
        type: 'quiz',
        question: {
          tr: "Bir bug raporunda \"Ortam\" alanı boş bırakılmış. Bu eksikliğin en olası sonucu nedir?",
          en: 'The "Environment" field is left empty in a bug report. What is the most likely consequence of this gap?',
        },
        options: [
          { id: 'a', text: { tr: 'Rapor otomatik olarak yüksek severity alır', en: 'The report automatically gets high severity' } },
          { id: 'b', text: { tr: "Okuyan kişi farklı bir tarayıcı/sürümde dener, hatayı GÖREMEZ ve raporu \"cannot reproduce\" ile geri gönderir", en: 'The reader tries it in a different browser/version, CANNOT see the failure, and bounces the report back as "cannot reproduce"' } },
          { id: 'c', text: { tr: 'Hiçbir etkisi olmaz, tarayıcı farkı önemsizdir', en: 'It has no effect, browser differences do not matter' } },
          { id: 'd', text: { tr: "Bug otomatik olarak duplicate sayılır", en: 'The bug is automatically counted as a duplicate' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Ortam bilgisi eksikse okuyan kişi kendi varsayılan ortamında dener — sorun tarayıcıya/sürüme özgüyse orada hiç görünmez. Bu, az önceki filmde ve adım adım anlatımda gördüğün beş günlük gecikmenin tam olarak kök nedenidir.",
          en: 'Without environment info the reader tries it in their own default environment -- if the problem is browser/version-specific it never shows up there. This is exactly the root cause of the five-day delay you saw in the film and step-animation.',
        },
        retryQuestion: {
          question: { tr: 'Altı zorunlu parçadan hangisi "ne olmalıydı" sorusuna cevap verir?', en: 'Which of the six mandatory parts answers "what should have happened"?' },
          options: [
            { id: 'a', text: { tr: 'Beklenen sonuç', en: 'Expected result' } },
            { id: 'b', text: { tr: 'Ortam', en: 'Environment' } },
            { id: 'c', text: { tr: 'Kanıt', en: 'Evidence' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Beklenen sonuç, sistemin OLMASI gerekeni tarif eder; gerçekleşen sonuç ise SİSTEMİN ne yaptığını. İkisi ayrı yazılır çünkü bir tanesi tahmin, diğeri gözlemdir.',
            en: 'Expected result describes what the system SHOULD do; actual result describes what the SYSTEM did. They are written separately because one is a prediction, the other an observation.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ D2. Tekrar Üretim Adımları: "Cannot Reproduce" Nasıl Önlenir?', en: '2️⃣ D2. Reproduction Steps: How Do You Prevent "Cannot Reproduce"?' },
      },
      {
        type: 'simple-box',
        emoji: '🧪',
        content: {
          tr: "Deterministik bir adım, bir laboratuvar deney protokolü gibidir: \"biraz asit ekle\" değil, \"5 ml %10'luk HCl ekle\" yazılır — çünkü deneyi TEKRARLAYAN kişi aynı sonucu almalıdır. Bug raporundaki adımlar da aynı disiplini ister: yorumlanmaya açık HİÇBİR kelime bırakılmaz.\n\nDüşündürücü soru: \"sepete bir ürün ekle\" adımı neden yetersizdir — sonuçta bir ürün eklenmiş oluyor? Çünkü hangi ürün eklendiğine göre SONUÇ değişebilir: stokta olan/olmayan, indirimli/indirimsiz, dijital/fiziksel ürün farklı kod yollarını tetikleyebilir. \"Bir ürün\" belirsizliği, okuyan kişinin SENİN test ettiğin yoldan FARKLI bir yola girmesine izin verir.\n\nKarşılaştır: bir otomasyon testinde `page.locator('li').first()` yazmak gibi — \"ilk olan\" ifadesi veri sırası değişince başka bir elemente işaret eder. Belirsiz bir bug adımı da aynı kırılganlığı taşır: yazıldığı anda çalışır ama veri değişince farklı bir yola sapar.\n\nQA açısından pratik kural: her adımda TEK bir eylem ve o eylemin TAM parametresi olsun — \"neyi\", \"nereye\", \"hangi değerle\" soruları adımın içinde cevaplanmış olmalı.",
          en: 'A deterministic step is like a lab experiment protocol: not "add some acid" but "add 5 ml of 10% HCl" -- because whoever REPEATS the experiment must get the same result. Steps in a bug report demand the same discipline: no word is left open to interpretation.\n\nThe question worth pausing on: why is "add a product to the cart" insufficient -- a product does get added, after all? Because the RESULT can change depending on which product: in-stock/out-of-stock, discounted/full-price, digital/physical can trigger different code paths. The ambiguity of "a product" lets the reader take a DIFFERENT path than the one YOU tested.\n\nCompare: it is like writing `page.locator(\'li\').first()` in an automation test -- "the first one" points to a different element once the data order changes. A vague bug step carries the exact same fragility: it works the moment it is written, but drifts onto a different path once the data changes.\n\nThe practical rule for QA: every step should contain ONE action and that action\'s FULL parameter -- the questions "what", "where", "with which value" should all be answered inside the step itself.',
        },
      },
      deterministicStepsTable,
      {
        type: 'quiz',
        question: {
          tr: '"Bir kupon dene" adımı ile "INDIRIM20 kodunu gir ve Uygula\'ya bas" adımı arasındaki fark neyi değiştirir?',
          en: 'What does the difference between "try a coupon" and "enter the code INDIRIM20 and press Apply" actually change?',
        },
        options: [
          { id: 'a', text: { tr: "Sadece yazım uzunluğunu değiştirir, sonuç aynıdır", en: 'It only changes the wording length, the result is the same' } },
          { id: 'b', text: { tr: "Okuyan kişinin FARKLI bir kupon (sabit tutar vs yüzde) denemesini ve hatayı hiç görmemesini engeller", en: 'It prevents the reader from trying a DIFFERENT coupon (fixed amount vs percentage) and never seeing the failure' } },
          { id: 'c', text: { tr: "Hiçbir farkı yoktur, ikisi de aynı sonucu üretir", en: 'There is no difference, both produce the same outcome' } },
          { id: 'd', text: { tr: "İkinci adım daha yavaş çalışır", en: 'The second step runs slower' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bug yalnızca YÜZDE bazlı kuponlarda çıkıyor (bu sayfa boyunca izlediğimiz SHOP-142 senaryosu). \"Bir kupon dene\" adımıyla okuyan kişi sabit tutarlı bir kupon seçerse hatayı hiç göremez ve raporu haksız yere \"cannot reproduce\" ile kapatır.",
          en: 'The bug only shows up with PERCENTAGE coupons (the SHOP-142 scenario we have followed throughout this page). With the step "try a coupon", if the reader picks a fixed-amount coupon they never see the failure and unfairly close the report as "cannot reproduce".',
        },
        retryQuestion: {
          question: { tr: 'Bir otomasyon testindeki `.first()` locator\'ı ile belirsiz bir bug adımının ortak riski nedir?', en: 'What risk does a `.first()` locator in an automation test share with a vague bug step?' },
          options: [
            { id: 'a', text: { tr: 'İkisi de veri/koşul değişince farklı bir sonuca/yola kayabilir', en: 'Both can drift to a different outcome/path once the data/condition changes' } },
            { id: 'b', text: { tr: "İkisi de her zaman aynı elementi/sonucu verir", en: 'Both always give the exact same element/outcome' } },
            { id: 'c', text: { tr: "Ortak bir riskleri yoktur", en: 'They share no common risk' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'İkisi de "şu anki durumda" doğru çalışıyor görünür ama veri sırası veya seçim değişince sessizce yanlış yola sapar.',
            en: 'Both look correct "in the current state" but silently drift onto the wrong path once data order or selection changes.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '3️⃣ D3. Severity vs Priority: Aynı Şey Değil', en: '3️⃣ D3. Severity vs Priority: Not the Same Thing' },
      },
      {
        type: 'text',
        content: {
          tr: "En sık karıştırılan iki alan bunlardır. Severity teknik etkiyi anlatır: sistem ne kadar bozuldu, veri kayboluyor mu, kullanıcı işini yapabiliyor mu. Priority ise iş kararıdır: bu iş ne zaman yapılacak. İkisi farklı eksenlerdir ve farklı kişiler karar verir — severity'yi genellikle bulan kişi (QA) önerir, priority'yi ürün sahibi belirler. Aşağıdaki tablo dört köşeyi de gerçek örneklerle gösteriyor; özellikle \"düşük severity + yüksek priority\" kutusu, ikisinin niçin ayrı alanlar olduğunu tek başına açıklar.",
          en: 'These are the two most confused fields. Severity describes technical impact: how badly the system is broken, is data being lost, can the user do their job. Priority is a business decision: when will this be worked on. They are different axes and different people decide them -- severity is usually proposed by whoever found the issue (QA), priority is set by the product owner. The table below shows all four corners with real examples; the "low severity plus high priority" cell alone explains why they must be separate fields.',
        },
      },
      {
        type: 'table',
        headers: [
          { tr: 'Durum', en: 'Case' },
          { tr: 'Severity', en: 'Severity' },
          { tr: 'Priority', en: 'Priority' },
          { tr: 'ShopQA örneği', en: 'ShopQA example' },
        ],
        rows: [
          [
            { tr: 'Para kaybı, herkesi etkiliyor', en: 'Money loss, affects everyone' },
            { tr: 'Yüksek', en: 'High' },
            { tr: 'Yüksek', en: 'High' },
            { tr: 'Kupon tutarı iki kez düşülüyor (SHOP-142)', en: 'Coupon amount deducted twice (SHOP-142)' },
          ],
          [
            { tr: 'Sistem çöküyor ama yalnızca kullanılmayan bir ekranda', en: 'System crashes, but only on an unused screen' },
            { tr: 'Yüksek', en: 'High' },
            { tr: 'Düşük', en: 'Low' },
            { tr: 'Kaldırılmak üzere olan eski fatura ekranı 500 dönüyor', en: 'The legacy invoice screen, about to be removed, returns 500' },
          ],
          [
            { tr: 'Kozmetik ama şirket adı yanlış yazılmış', en: 'Cosmetic, yet the company name is misspelled' },
            { tr: 'Düşük', en: 'Low' },
            { tr: 'Yüksek', en: 'High' },
            { tr: 'Ana sayfa başlığında marka adı hatalı', en: 'The brand name is misspelled in the homepage title' },
          ],
          [
            { tr: 'Kozmetik ve nadir', en: 'Cosmetic and rare' },
            { tr: 'Düşük', en: 'Low' },
            { tr: 'Düşük', en: 'Low' },
            { tr: 'Yardım sayfasında iki paragraf arası boşluk fazla', en: 'Extra spacing between two paragraphs on the help page' },
          ],
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: "Ana sayfanın başlığında şirketin marka adı yanlış yazılmış. Sistem çalışıyor, hiçbir işlev bozulmuyor. Bu bug'ı nasıl etiketlersin?",
          en: 'The company brand name is misspelled in the homepage title. The system works and no function is broken. How do you label this bug?',
        },
        options: [
          { id: 'a', text: { tr: 'Severity düşük, priority düşük — kozmetik bir sorun', en: 'Low severity, low priority -- a cosmetic issue' } },
          { id: 'b', text: { tr: 'Severity düşük, priority yüksek — teknik etkisi yok ama marka itibarı acil', en: 'Low severity, high priority -- no technical impact, but brand reputation is urgent' } },
          { id: 'c', text: { tr: 'Severity yüksek, priority yüksek — ana sayfada olan her şey kritiktir', en: 'High severity, high priority -- anything on the homepage is critical' } },
          { id: 'd', text: { tr: 'Bug değil, iyileştirme talebi olarak açılmalı', en: 'Not a bug; it should be filed as an improvement request' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Teknik etki gerçekten düşüktür: hiçbir işlev bozulmuyor, veri kaybı yok. Ama iş etkisi yüksektir — markanın adının yanlış yazıldığı bir ana sayfa saatlerce yayında kalamaz. Bu, iki alanın niçin ayrı olduğunu gösteren klasik örnektir: severity sistemi, priority takvimi anlatır.",
          en: 'The technical impact really is low: no function breaks and no data is lost. But the business impact is high -- a homepage misspelling the brand name cannot stay live for hours. This is the classic example of why the two fields are separate: severity describes the system, priority describes the calendar.',
        },
        retryQuestion: {
          question: {
            tr: 'Bir bug raporunda "beklenen sonuç" ile "gerçekleşen sonuç" ayrı ayrı yazılmazsa en sık hangi tartışma çıkar?',
            en: 'If "expected result" and "actual result" are not written separately in a bug report, which argument comes up most often?',
          },
          options: [
            { id: 'a', text: { tr: 'Bug\'ın severity\'si tartışılır', en: 'The severity of the bug is debated' } },
            { id: 'b', text: { tr: '"Bu bir bug mı yoksa istenen davranış mı" tartışması çıkar ve kayıt beklemeye alınır', en: 'The "is this a bug or intended behavior" debate starts and the record stalls' } },
            { id: 'c', text: { tr: 'Rapor otomatik olarak kapanır', en: 'The report closes automatically' } },
          ],
          correct: 'b',
          explanation: {
            tr: 'Beklenen davranış yazılmazsa okuyan kişi neyin yanlış olduğunu senin gözünle göremez. Beklenen sonucu bir kabul kriterine bağlamak bu tartışmayı baştan kapatır.',
            en: 'Without the expected behavior the reader cannot see what is wrong through your eyes. Tying the expected result to an acceptance criterion closes this debate before it starts.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ D4. Ekler ve Kanıt', en: '4️⃣ D4. Attachments and Evidence' },
      },
      {
        type: 'text',
        content: {
          tr: "Kanıt, raporu bir iddiadan bir gözleme dönüştürür. Otomasyon koşumundan gelen kanıt özellikle değerlidir çünkü ZATEN tekrar üretilebilirdir — koşumu tekrar çalıştırmak, hatayı yeniden görmek için yeterlidir. Aşağıdaki dört kanıt türü, hangi durumda hangisinin en güçlü olduğunu gösteriyor.",
          en: 'Evidence turns a report from a claim into an observation. Evidence coming from an automation run is especially valuable because it is ALREADY reproducible -- re-running the run is enough to see the failure again. The four evidence types below show which is strongest in which situation.',
        },
      },
      evidenceTypesGrid,
      {
        type: 'quiz',
        question: {
          tr: "Bir hata yalnızca belirli bir animasyon bitmeden bir butona tıklanınca oluşuyor — sözle anlatması zor, zamanlamaya bağlı bir hata. Hangi kanıt türü bu durumda en güçlüdür?",
          en: 'A failure only happens when a button is clicked before a specific animation finishes -- a timing-dependent bug that is hard to describe in words. Which evidence type is strongest here?',
        },
        options: [
          { id: 'a', text: { tr: 'Konsol çıktısı', en: 'Console output' } },
          { id: 'b', text: { tr: 'Ekran kaydı — okuyan kişi zamanlamayı KENDİ gözüyle görür', en: 'Screen recording -- the reader sees the timing with their OWN eyes' } },
          { id: 'c', text: { tr: 'Ağ isteği (HAR)', en: 'Network request (HAR)' } },
          { id: 'd', text: { tr: 'Hiçbiri gerekmez, adımlar yeterlidir', en: 'None is needed, the steps are enough' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Zamanlamaya bağlı hatalar sözle anlatıldığında belirsiz kalır (\"animasyon bitmeden tıkla\" ne kadar erken?). Ekran kaydı, okuyan kişinin tam anı KENDİ gözüyle görmesini sağlar — diğer kanıt türleri bu tür bir hatada yetersiz kalır.",
          en: 'Timing-dependent failures stay vague in words ("click before the animation finishes" -- how early?). A screen recording lets the reader see the exact moment with their OWN eyes -- other evidence types fall short for this kind of failure.',
        },
        retryQuestion: {
          question: { tr: 'Bir otomasyon koşum raporunun kanıt olarak en büyük avantajı nedir?', en: "What is an automation run report's biggest advantage as evidence?" },
          options: [
            { id: 'a', text: { tr: 'Zaten tekrar üretilebilir — koşumu yeniden çalıştırmak yeterlidir', en: 'It is already reproducible -- re-running it is enough' } },
            { id: 'b', text: { tr: 'Her zaman ekran kaydından daha kısadır', en: 'It is always shorter than a screen recording' } },
            { id: 'c', text: { tr: 'Manuel test etmeye hiç gerek bırakmaz', en: 'It removes all need for manual testing' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Koşum raporu deterministik adımların otomatik kaydıdır — elle tekrar üretmeye gerek kalmadan aynı hatayı yeniden görmeyi sağlar.',
            en: 'A run report is the automatic record of deterministic steps -- it lets you see the same failure again without manually reproducing it.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '5️⃣ D5. Bug Raporu Code Review', en: '5️⃣ D5. Bug Report Code Review' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir bug raporunu göndermeden önce gözden geçirmek, bir pull request'i merge etmeden önce review etmekle aynı disiplindir — kontrol listesi öznel bir \"iyi görünüyor\" hissine değil, sayılabilir maddelere dayanır. Aşağıda üç rapor var; her birini D1-D4'te öğrendiğin kriterlerle değerlendir.",
          en: "Reviewing a bug report before sending it is the same discipline as reviewing a pull request before merging it -- the checklist relies on countable items, not a subjective 'looks fine' feeling. Below are three reports; evaluate each against the criteria you learned in D1-D4.",
        },
      },
      reportCodeReviewPlayground,
    ],
  },

  // ── 4 · GRUP E: Workflow ve Durumlar ───────────────────────────────────────
  {
    title: { tr: '🔄 Workflow ve Durumlar', en: '🔄 Workflows & Statuses' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🛂',
        content: {
          tr: "Bir workflow, havalimanındaki kapılar dizisine benzer: check-in, güvenlik, pasaport, kapı. Her kapıdan geçmek bir izin gerektirir ve sıra atlanamaz — pasaport kontrolünden geçmeden uçağa binemezsin. Jira'da her durum (status) bir bekleme salonu, her geçiş (transition) bir kapıdır; kapının kimin için açıldığı ise izinlerle belirlenir.\n\nDüşündürücü soru: bir bug'ı \"Done\" yapmak neden tek bir tuş değil? Çünkü \"bitti\" cümlesi tek başına anlamsızdır: kod yazıldı mı, gözden geçirildi mi, staging'e çıktı mı, DOĞRULANDI mı? Workflow bu soruların cevabını kayıt altına alan bir sözleşmedir.\n\nKarşılaştır: bir enum ile durum makinesi yazdığında geçersiz geçişleri kodla engellersin. Jira'da bu engel derleme zamanında değil, workflow tanımında yaşar — geçiş koşulu (condition) koymadıysan yanlış geçiş serbesttir ve kimse uyarmaz.\n\nQA açısından kritik nokta resolution alanıdır: bir kayıt \"Done\" durumuna geçtiğinde resolution yanlış (ya da boş) bırakılırsa, o bug raporlarda ya hiç görünmez ya da hâlâ açık sayılır. Yani yanlış tek bir alan, bütün kalite panonu sessizce yanıltır.",
          en: 'A workflow is like the sequence of gates at an airport: check-in, security, passport, boarding. Passing each gate requires permission and the order cannot be skipped -- you do not board before passport control. In Jira every status is a waiting lounge and every transition is a gate; who the gate opens for is decided by permissions.\n\nThe question worth pausing on: why is moving a bug to "Done" not a single button? Because the word "done" alone means nothing: was the code written, reviewed, shipped to staging, and VERIFIED? A workflow is the contract that records the answers.\n\nCompare: when you write a state machine with an enum you block invalid transitions in code. In Jira that block does not live at compile time but in the workflow definition -- if you did not add a transition condition, the wrong move is allowed and nobody warns you.\n\nThe critical point for QA is the resolution field: when a record moves to "Done" with a wrong (or empty) resolution, that bug either disappears from reports or still counts as open. One wrong field silently misleads your entire quality dashboard.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Öğreneceksin', en: '🧭 What You Will Learn in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "Status, transition ve resolution üçlüsünün farkını; tipik bir bug workflow'unu ve QA'in bu akıştaki yerini (Ready for QA → In QA → Done ya da Reopened); \"Done\" tanımının takımca yazılı olması gerektiğini; geçişlere konan koşulların (condition) neden bazen senin butonunu görünmez yaptığını; ve belirli geçişlerde çalışan otomasyon kurallarının hangi işleri devraldığını işleyeceğiz.",
          en: 'We will cover the difference between status, transition and resolution; a typical bug workflow and where QA sits in it (Ready for QA to In QA to Done or Reopened); why the definition of "done" must be written down as a team; why conditions placed on transitions sometimes make your button invisible; and which chores automation rules can take over on specific transitions.',
        },
      },
      reopenedFallFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ E1. Status, Transition ve Resolution Üçlüsü', en: '1️⃣ E1. The Status, Transition and Resolution Triplet' },
      },
      {
        type: 'simple-box',
        emoji: '🚦',
        content: {
          tr: "Bu üçlüyü bir trafik ışığı sistemine benzet: status IŞIĞIN RENGİDİR (şu anki durum — kırmızı/sarı/yeşil), transition IŞIĞIN DEĞİŞMESİDİR (kırmızıdan yeşile geçiş, bir olay), resolution ise KAVŞAĞIN KAMERA KAYDIDIR (bu geçiş neden oldu, hangi sebeple — arıza mı, planlı bakım mı). Üçü de farklı bir soruya cevap verir.\n\nDüşündürücü soru: neden \"Done\" tek başına yeterli değil de ayrıca bir resolution alanına ihtiyaç var? Çünkü aynı \"Done\" durumuna FARKLI SEBEPLERLE ulaşılabilir — gerçekten düzeltildi mi (Fixed), aslında bir kopya mıydı (Duplicate), yoksa hiç tekrar üretilemedi mi (Cannot Reproduce)? Status \"nerede olduğunu\", resolution \"NEDEN orada olduğunu\" anlatır.\n\nKarşılaştır: Java'da bir metodun dönüş DEĞERİ (status'e benzer — hangi sonuca ulaşıldı) ile fırlattığı EXCEPTION TİPİ (resolution'a benzer — bu sonuca hangi sebeple ulaşıldı) farklı bilgiler taşır; ikisini tek bir alana sıkıştırmak bilgi kaybettirir.\n\nQA açısından pratik sonuç: bir raporlama sorgusu yalnızca status'e (\"= Done\") bakarsa, gerçekten düzeltilmiş bug'larla \"cannot reproduce\" ile kapatılmış bug'ları AYIRT EDEMEZ — resolution'a bakması gerekir.",
          en: 'Compare this triplet to a traffic light system: status is the LIGHT\'S COLOR (the current state -- red/yellow/green), transition is the LIGHT CHANGING (red to green, an event), and resolution is the INTERSECTION\'S CAMERA RECORD (why this change happened -- a fault, planned maintenance). All three answer a different question.\n\nThe question worth pausing on: why is "Done" alone not enough, why do you also need a resolution field? Because the same "Done" state can be reached for DIFFERENT REASONS -- was it genuinely fixed (Fixed), was it actually a duplicate (Duplicate), or was it never reproducible at all (Cannot Reproduce)? Status tells you "where it is", resolution tells you "WHY it is there".\n\nCompare: in Java, a method\'s return VALUE (like status -- which outcome was reached) and the EXCEPTION TYPE it throws (like resolution -- why that outcome was reached) carry different information; squeezing both into one field loses information.\n\nThe practical takeaway for QA: a reporting query that only looks at status ("= Done") CANNOT tell apart bugs that were genuinely fixed from bugs closed as "cannot reproduce" -- it needs to look at resolution too.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: "Bir kalite raporu \"bu ay kaç bug DÜZELTİLDİ\" sorusunu `status = Done` sorgusuyla cevaplıyor. Bu sorgunun hatası nedir?",
          en: 'A quality report answers "how many bugs were FIXED this month" with the query `status = Done`. What is wrong with this query?',
        },
        options: [
          { id: 'a', text: { tr: "Hiçbir hatası yok, status = Done yeterlidir", en: 'Nothing is wrong, status = Done is enough' } },
          { id: 'b', text: { tr: "Done durumuna Duplicate veya Cannot Reproduce sebebiyle de ulaşılabilir; resolution'a bakılmadan gerçekten düzeltilenler AYIRT EDİLEMEZ", en: 'Done can also be reached via Duplicate or Cannot Reproduce; without checking resolution, genuinely fixed bugs CANNOT be told apart' } },
          { id: 'c', text: { tr: "status alanı yalnızca Bug'larda çalışır", en: 'The status field only works on Bugs' } },
          { id: 'd', text: { tr: "Sorgu sözdizimi hatalıdır", en: 'The query syntax is invalid' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Status \"nerede\" sorusuna cevap verir, \"neden\" sorusuna değil. Doğru sorgu `status = Done AND resolution = Fixed` olmalıdır — aksi hâlde duplicate ve cannot-reproduce kapanışlar da \"düzeltildi\" sayılır.",
          en: 'Status answers "where", not "why". The correct query should be `status = Done AND resolution = Fixed` -- otherwise duplicate and cannot-reproduce closures also get counted as "fixed".',
        },
        retryQuestion: {
          question: { tr: 'Transition (geçiş) neyi temsil eder?', en: 'What does a transition represent?' },
          options: [
            { id: 'a', text: { tr: 'Bir durumdan diğerine geçen OLAYIN kendisi', en: 'The EVENT of moving from one status to another' } },
            { id: 'b', text: { tr: 'Kaydın o anki sabit hâli', en: "The record's current fixed state" } },
            { id: 'c', text: { tr: 'Yalnızca bir görsel animasyon', en: 'Just a visual animation' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Transition, status\'ler arasındaki geçişi tetikleyen olaydır — bir kapıdan geçmek gibi; status ise o kapının ardındaki mevcut oda.',
            en: 'A transition is the event that triggers movement between statuses -- like walking through a gate; status is the current room behind that gate.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ E2. Tipik Bir Bug Workflow\'u', en: '2️⃣ E2. A Typical Bug Workflow' },
      },
      {
        type: 'text',
        content: {
          tr: "Aşağıdaki akış, Jira Nedir? sekmesinden beri izlediğimiz SHOP-142'nin geçtiği tipik yoldur. QA'in akıştaki konumuna dikkat et: \"Ready for QA\" ve \"In QA\" arasındaki geçiş, doğrulamanın DÜZELTMEDEN AYRI bir adım olduğunu somutlaştırır — Jira Nedir? sekmesinde gördüğün rol ayrımının workflow'a yansımasıdır.",
          en: "The flow below is the typical path SHOP-142 has taken since the What is Jira? tab. Notice QA's position in the flow: the transition between \"Ready for QA\" and \"In QA\" makes concrete that verification is a step SEPARATE FROM the fix -- the workflow reflection of the role separation you saw on the What is Jira? tab.",
        },
      },
      bugWorkflowFlow,
      {
        type: 'quiz',
        question: {
          tr: "Workflow diyagramında \"Ready for QA\" bir koşullu (condition) kapı olarak gösteriliyor. Bu koşul sağlanmazsa ne olur?",
          en: 'In the workflow diagram, "Ready for QA" is shown as a conditional gate. What happens if the condition is not met?',
        },
        options: [
          { id: 'a', text: { tr: "Geçiş yapılır ama bir uyarı mesajı çıkar", en: 'The transition happens but a warning message appears' } },
          { id: 'b', text: { tr: "Geçiş yapılamaz; Kurulum & İlk Proje sekmesinde gördüğün gibi buton hiç görünmeyebilir", en: 'The transition cannot be performed; as seen on the Setup & First Project tab, the button may not even render' } },
          { id: 'c', text: { tr: "Kayıt otomatik olarak silinir", en: 'The record is automatically deleted' } },
          { id: 'd', text: { tr: "Koşullar yalnızca kozmetiktir, geçişi engellemez", en: 'Conditions are purely cosmetic and never block a transition' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bir workflow koşulu tam olarak izin şemasıyla aynı mekanizmayı kullanır: koşul sağlanmadan geçiş SESSİZCE engellenir, buton görünmez.",
          en: 'A workflow condition uses exactly the same mechanism as the permission scheme: without the condition met, the transition is SILENTLY blocked, the button does not appear.',
        },
        retryQuestion: {
          question: { tr: 'Diyagramdaki "In QA" düğümünden çıkan iki dal (True/False) neyi temsil eder?', en: 'What do the two branches (True/False) coming out of the "In QA" node represent?' },
          options: [
            { id: 'a', text: { tr: 'Doğrulamanın geçmesi (Done) veya kalması (Reopened)', en: 'Verification passing (Done) or failing (Reopened)' } },
            { id: 'b', text: { tr: 'Kaydın yüksek veya düşük öncelikli olması', en: 'The record being high or low priority' } },
            { id: 'c', text: { tr: 'Ayşe\'nin izinli olup olmadığı', en: 'Whether Ayse is on leave' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'QA doğrulaması İKİ sonuca varabilir: kabul kriteri karşılandıysa Done, karşılanmadıysa Reopened — bu ayrım tam olarak bu filmde izlediğin şeydir.',
            en: 'QA verification can reach TWO outcomes: Done if the acceptance criterion is met, Reopened if not -- exactly the branching you watched in the film.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '3️⃣ E3. "Done" Ne Demek? Resolution\'ın Zamanlaması', en: '3️⃣ E3. What Does "Done" Mean? The Timing of Resolution' },
      },
      {
        type: 'simple-box',
        emoji: '📜',
        content: {
          tr: "\"Definition of Done\" bir yemek tarifinin \"pişti\" tanımına benzer: sadece \"fırından çıktı\" değil, \"iç sıcaklığı 75°C'ye ulaştı VE kontrol edildi\" demektir. Bir takımın \"Done\" tanımı yazılı değilse, herkes kendi tarifini kullanır — biri kod push edilince Done der, biri staging'e çıkınca, biri QA doğrulayınca.\n\nDüşündürücü soru: resolution alanını NE ZAMAN set ettiğin neden \"Done\" kadar önemli? Çünkü resolution bir kez set edildiğinde bazı raporlar onu \"çözüldü\" sayar — kayıt daha sonra Reopened'a düşse bile, ESKİ resolution değeri değiştirilmezse rapor yanlış kalmaya devam eder. Zamanlama, DOĞRULUĞUN kendisidir.\n\nKarşılaştır: bir otomasyon testinde `assert` çağrısını fonksiyonun EN SONUNA koymak gibi — sonucu ortada bir yerde \"muhtemelen doğru\" diye işaretlemek, testin asıl amacını (gerçek doğrulamayı) atlamaktır. Resolution'ı erken set etmek de aynı hatayı iş süreci düzeyinde tekrarlar.\n\nQA açısından kural nettir: resolution SADECE doğrulama BAŞARILI olduğunda ve doğrulayan kişi tarafından set edilir — düzeltmeyi yazan kişi tarafından değil.",
          en: 'A "Definition of Done" is like a recipe\'s definition of "cooked": not just "came out of the oven", but "internal temperature reached 75°C AND was checked". If a team\'s "Done" is not written down, everyone uses their own recipe -- one calls it done when code is pushed, another when it ships to staging, another when QA verifies.\n\nThe question worth pausing on: why does WHEN you set the resolution field matter as much as reaching "Done"? Because once resolution is set, some reports count it as "resolved" -- even if the record later falls into Reopened, if the OLD resolution value is not changed, the report stays wrong. Timing IS correctness here.\n\nCompare: it is like placing an `assert` call at the very END of a function -- marking the result "probably correct" somewhere in the middle skips the test\'s actual purpose (real verification). Setting resolution early repeats the exact same mistake at the process level.\n\nThe rule for QA is clear: resolution is set ONLY when verification SUCCEEDS, and it is set by the verifier -- not by whoever wrote the fix.',
        },
      },
      resolutionTimingSteps,
      {
        type: 'quiz',
        question: {
          tr: "Mert kod review onaylanır onaylanmaz resolution alanını \"Fixed\" yapıyor, henüz Ayşe hiçbir şey doğrulamadı. Bu alışkanlığın riski nedir?",
          en: 'Mert sets resolution to "Fixed" the moment code review is approved, before Ayse verifies anything. What is the risk of this habit?',
        },
        options: [
          { id: 'a', text: { tr: "Hiçbir risk yok, resolution erken set edilebilir", en: 'No risk, resolution can be set early' } },
          { id: 'b', text: { tr: "Kayıt Reopened'a düşse bile resolution hâlâ \"Fixed\" görünebilir ve \"resolution=Fixed → çözüldü\" varsayan raporları yanıltır", en: 'Even if the record falls into Reopened, resolution may still read "Fixed" and mislead reports that assume "resolution=Fixed means resolved"' } },
          { id: 'c', text: { tr: "Mert'in izni geri alınır", en: "Mert's permission gets revoked" } },
          { id: 'd', text: { tr: "Kayıt otomatik olarak duplicate sayılır", en: 'The record is automatically counted as a duplicate' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Resolution\'ın erken set edilmesi, doğrulanmamış bir iddiayı kesin gerçek gibi kaydeder. Kayıt sonradan Reopened\'a düşse bile eski değer temizlenmezse rapor yanlış kalmaya devam eder.',
          en: 'Setting resolution early records an unverified claim as a settled fact. Even if the record later falls into Reopened, the report stays wrong unless the old value is cleared.',
        },
        retryQuestion: {
          question: { tr: 'Resolution alanını kim, ne zaman set etmelidir?', en: 'Who should set the resolution field, and when?' },
          options: [
            { id: 'a', text: { tr: "Yalnızca doğrulayan kişi (QA), doğrulama BAŞARILI olduğunda", en: 'Only the verifier (QA), when verification SUCCEEDS' } },
            { id: 'b', text: { tr: "Düzeltmeyi yazan kişi, kod push edilir edilmez", en: 'Whoever wrote the fix, as soon as the code is pushed' } },
            { id: 'c', text: { tr: "Herhangi biri, herhangi bir zamanda", en: 'Anyone, at any time' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Bu, "bende çalışıyor" sorununun resolution alanındaki karşılığıdır — doğrulayan kişi düzelten kişiden farklı olmalıdır.',
            en: 'This is the resolution-field counterpart of the "it works on my machine" problem -- the verifier must be different from the fixer.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ E4. Otomasyon Kuralları', en: '4️⃣ E4. Automation Rules' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir workflow geçişine bağlanan otomasyon kuralı, belirli tekrarlayan işleri devralır — örneğin bir kayıt \"Ready for QA\"ya taşındığında otomatik olarak QA rolündeki birine atanması, ya da \"Reopened\"a düşünce otomatik olarak \"regression\" etiketinin eklenmesi. Bu kurallar EKRAN GÖRÜNTÜSÜNE bağlı değildir — Cloud'da da Data Center'da da aynı KAVRAMSAL fikir çalışır: \"şu geçiş olunca şu işi otomatik yap\".",
          en: 'An automation rule bound to a workflow transition takes over specific repeated chores -- for example, automatically assigning a record to someone with the QA role when it moves to "Ready for QA", or automatically adding a "regression" label when it falls into "Reopened". These rules are not tied to any SCREENSHOT -- the same CONCEPTUAL idea works on Cloud and Data Center alike: "when this transition happens, automatically do this chore".',
        },
      },
      transitionDecisionPlayground,
      workflowOrderChallenge,
    ],
  },

  // ── 5 · GRUP F: JQL ────────────────────────────────────────────────────────
  {
    title: { tr: '🔍 JQL: Jira Sorgu Dili', en: '🔍 JQL: Jira Query Language' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔦',
        content: {
          tr: "JQL, kütüphanedeki kart kataloğu gibidir: rafları tek tek gezmek yerine \"2019 sonrası basılmış, şu yazarın, şu konudaki kitaplar\" diye sorarsın ve kütüphane sana yalnızca onları getirir. Board sana rafları gösterir; JQL sana soruna göre süzülmüş bir liste verir.\n\nDüşündürücü soru: pano zaten kartları gösteriyorken, neden ayrıca bir sorgu dili öğrenesin? Çünkü pano bir GÖRÜNÜMDÜR ve yalnızca birinin önceden kurduğu soruya cevap verir. \"Son 30 gündür hiç dokunulmamış, bana atanmış, yüksek öncelikli bug'lar\" sorusunun cevabı hiçbir panoda hazır durmaz.\n\nKarşılaştır: SQL biliyorsan JQL sana tanıdık gelecek — alan, operatör, değer ve sıralama aynı mantıkla dizilir. Ama kritik bir fark var: JQL bir veritabanı dili değildir, JOIN yapamaz. Tek bir varlık üzerinde (issue) alan filtreler; bir issue'nun ilişkili olduğu başka bir issue'nun alanına doğrudan bakamaz. Bu sınırı bilmemek, JQL öğrenirken yaşanan hayal kırıklığının bir numaralı sebebidir.\n\nQA açısından farkı şurada görürsün: her sabah panoya bakıp \"bugün ne yapsam\" diyen tester ile, kaydedilmiş altı filtresini açıp bekleyen doğrulamaları, reopen olanları ve unutulmuş kayıtları saniyede gören tester aynı işi yapmaz.",
          en: 'JQL is like a library card catalogue: instead of walking the shelves you ask for "books published after 2019, by this author, on this subject" and the library brings back only those. A board shows you the shelves; JQL gives you a list filtered by your question.\n\nThe question worth pausing on: with the board already showing cards, why learn a query language at all? Because a board is a VIEW and only answers a question someone configured in advance. "High-priority bugs assigned to me and untouched for 30 days" is not sitting ready on any board.\n\nCompare: if you know SQL, JQL will feel familiar -- field, operator, value and ordering line up with the same logic. But there is a critical difference: JQL is not a database language and cannot JOIN. It filters fields on a single entity (the issue); it cannot directly read a field of another issue that this one links to. Not knowing that boundary is the number one source of frustration when learning JQL.\n\nFor QA the difference shows up here: a tester who looks at the board each morning wondering what to do is not doing the same job as a tester who opens six saved filters and sees pending verifications, reopened records and forgotten items in a second.',
        },
      },
      jqlFilterFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ F1. JQL Anatomisi', en: '1️⃣ F1. The Anatomy of JQL' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir JQL sorgusu dört parçadan oluşur: ALAN (project, status, assignee), OPERATÖR (=, !=, IN, ~, WAS, CHANGED), DEĞER ve isteğe bağlı SIRALAMA (ORDER BY). Koşullar AND / OR ile zincirlenir. Aşağıdaki örnek bir QA'in günlük olarak kullandığı üç sorguyu gösteriyor — anahtar kelimeler dilin kendi sözdizimidir ve Türkçe sayfada da İngilizce kalır; değişen yalnızca açıklamalardır. Ardından gelen tablo, SQL bilenler için JQL'i tanıdık ama önemli bir farkla gösteriyor.",
          en: 'A JQL query has four parts: FIELD (project, status, assignee), OPERATOR (=, !=, IN, ~, WAS, CHANGED), VALUE and an optional ORDERING (ORDER BY). Conditions are chained with AND / OR. The example below shows three queries a QA engineer uses daily -- the keywords are the language\'s own syntax and stay English even on a Turkish page; only the explanations change. The table that follows shows JQL as familiar yet critically different for those who know SQL.',
        },
      },
      {
        type: 'code',
        language: 'sql',
        code: {
          tr: `-- 1) Doğrulamamı bekleyen kayıtlar: iş listemin ilk maddesi
project = SHOP AND status = "Ready for QA" ORDER BY priority DESC, created ASC

-- 2) Unutulmuş bug'lar: 30 gündür hiçbir hareket görmeyen açık kayıtlar
project = SHOP AND issuetype = Bug AND status != Done AND updated <= -30d

-- 3) Üretime sızanlar: canlı ortam etiketiyle açılmış son bir aylık bug'lar
project = SHOP AND issuetype = Bug AND labels = production AND created >= -30d ORDER BY created DESC`,
          en: `-- 1) Records waiting for my verification: the first item on my work list
project = SHOP AND status = "Ready for QA" ORDER BY priority DESC, created ASC

-- 2) Forgotten bugs: open records with no movement for 30 days
project = SHOP AND issuetype = Bug AND status != Done AND updated <= -30d

-- 3) Leaked to production: bugs created in the last month with the live-environment label
project = SHOP AND issuetype = Bug AND labels = production AND created >= -30d ORDER BY created DESC`,
        },
      },
      jqlVsSqlTable,
      {
        type: 'quiz',
        question: {
          tr: "Bir bug'ın hangi Story'den doğduğunu görmek için, JQL'de doğrudan `story.title ~ \"kupon\"` gibi bir sorgu yazabilir misin?",
          en: 'To see which Story a bug was born from, can you write a JQL query like `story.title ~ "coupon"` directly?',
        },
        options: [
          { id: 'a', text: { tr: 'Evet, JQL de SQL gibi JOIN yapar', en: 'Yes, JQL does JOINs just like SQL' } },
          { id: 'b', text: { tr: 'Hayır — JQL JOIN yapmaz, yalnızca TEK bir issue\'nun kendi alanlarını filtreler', en: 'No -- JQL does not JOIN, it only filters a SINGLE issue\'s own fields' } },
          { id: 'c', text: { tr: 'Evet, ama yalnızca Data Center\'da', en: 'Yes, but only on Data Center' } },
          { id: 'd', text: { tr: 'Hayır, JQL hiç alan filtrelemez', en: 'No, JQL cannot filter fields at all' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bu, JQL öğrenirken en sık yaşanan hayal kırıklığıdır: JQL bir veritabanı dili değildir, JOIN desteklemez. Bağlı bir Story'nin alanına bakmak için o Story'nin KENDİ issue anahtarını (\"caused by\" linki üzerinden) bilmen gerekir.",
          en: 'This is the most common frustration when learning JQL: it is not a database language and does not support JOIN. To read a linked Story\'s field you need that Story\'s OWN issue key (via the "caused by" link).',
        },
        retryQuestion: {
          question: { tr: 'JQL\'de bir koşulun ne getirdiği ile bir SQL `SELECT`in ne getirdiği arasındaki fark nedir?', en: 'What is the difference between what a JQL condition returns and what a SQL `SELECT` returns?' },
          options: [
            { id: 'a', text: { tr: 'JQL her zaman TÜM alanları döner, sadece hangi issue\'ların döneceğini filtreler', en: 'JQL always returns ALL fields, it only filters which issues come back' } },
            { id: 'b', text: { tr: 'İkisi birebir aynıdır', en: 'They are exactly identical' } },
            { id: 'c', text: { tr: 'JQL hiçbir alan döndürmez', en: 'JQL returns no fields at all' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'SQL\'de hangi KOLONLARIN döneceğini `SELECT` ile seçersin; JQL\'de böyle bir seçim yoktur — arayüz her zaman tüm alanları gösterir, JQL yalnızca HANGİ issue\'ların listede olacağını belirler.',
            en: 'In SQL you choose which COLUMNS come back with `SELECT`; JQL has no such choice -- the interface always shows all fields, JQL only decides WHICH issues make the list.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ F2. Operatörler ve Zaman Fonksiyonları', en: '2️⃣ F2. Operators and Time Functions' },
      },
      {
        type: 'text',
        content: {
          tr: "JQL'in gücü küçük bir operatör setinden gelir. Sabit bir tarih yazmak yerine göreli zaman (`-7d`) veya kayan bir fonksiyon (`startOfSprint()`) kullanmak, sorgunun HER koşumda kendini güncellemesini sağlar — kaydedilmiş bir filtreyi bir kez yazıp sonsuza kadar doğru tutmanın anahtarı budur.",
          en: 'The power of JQL comes from a small operator set. Using relative time (`-7d`) or a shifting function (`startOfSprint()`) instead of a fixed date lets the query update itself on EVERY run -- this is the key to writing a saved filter once and keeping it correct forever.',
        },
      },
      jqlOperatorsTable,
      jqlEvaluationSteps,
      staleIssuesJqlPlayground,
      {
        type: 'quiz',
        question: {
          tr: "Bir kaydedilmiş filtrede `updated <= -30d` yazıyor. Bu filtre her Pazartesi koştuğunda \"-30 gün\" hangi tarihe göre hesaplanır?",
          en: 'A saved filter contains `updated <= -30d`. Every Monday it runs -- relative to which date is "-30 days" computed?',
        },
        options: [
          { id: 'a', text: { tr: "Filtrenin İLK yazıldığı tarihe göre, sabit kalır", en: 'Relative to the date the filter was FIRST written, fixed forever' } },
          { id: 'b', text: { tr: "Sorgunun O AN çalıştırıldığı tarihe göre, her koşumda YENİDEN hesaplanır", en: 'Relative to the date the query is RUNNING right now, RECOMPUTED on every run' } },
          { id: 'c', text: { tr: "SHOP projesinin oluşturulma tarihine göre", en: "Relative to the SHOP project's creation date" } },
          { id: 'd', text: { tr: "Her zaman bugünün gece yarısına göre, dakika önemsizdir", en: 'Always relative to midnight today, minutes do not matter' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Göreli zaman ifadeleri (`-30d`, `startOfDay()`) her koşumda YENİDEN çözülür — bu, bir sorguyu bir kez yazıp sürekli doğru tutmanın tam olarak nedenidir. Sabit bir tarih yazsaydın filtre zamanla anlamsızlaşırdı.",
          en: 'Relative time expressions (`-30d`, `startOfDay()`) are RECOMPUTED on every run -- this is exactly why you can write a query once and keep it correct forever. A fixed date would make the filter meaningless over time.',
        },
        retryQuestion: {
          question: { tr: 'ORDER BY, filtreleme koşullarına göre HANGİ sırada uygulanır?', en: 'In relation to the filter conditions, in WHICH order is ORDER BY applied?' },
          options: [
            { id: 'a', text: { tr: 'Tüm koşullar değerlendirilip küme belirlendikten SONRA', en: 'AFTER all conditions are evaluated and the set is decided' } },
            { id: 'b', text: { tr: 'İlk koşuldan ÖNCE', en: 'BEFORE the first condition' } },
            { id: 'c', text: { tr: 'Her koşuldan sonra ayrı ayrı', en: 'Separately after each condition' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Sıralama küme büyüklüğünü değiştirmez, yalnızca dizilişi belirler — bu yüzden mantıksal olarak filtrelemeden sonra gelir.',
            en: 'Ordering does not change the set size, it only decides the arrangement -- which is why it logically comes after filtering.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: "3️⃣ F3. QA'in Günlük Sorguları", en: "3️⃣ F3. A QA Engineer's Daily Queries" },
      },
      {
        type: 'text',
        content: {
          tr: "Yukarıdaki üç sorguya (doğrulama bekleyenler, unutulmuşlar, üretime sızanlar) bir dördüncüsünü ekleyelim: sprint içinde bir kez bile Reopened olmuş kayıtlar. Bu sorgu, bu sekmenin başındaki filmde gördüğün alan-eşleştirme mantığını GEÇMİŞ bir değere uygular — WAS operatörüyle.",
          en: "Let's add a fourth query to the three above (waiting for verification, forgotten, leaked to production): records that were reopened even once within the sprint. This query applies the field-matching logic you saw in the film at the top of this tab to a PAST value -- via the WAS operator.",
        },
      },
      reopenedJqlPlayground,
      {
        type: 'quiz',
        question: {
          tr: "Bir bug sprint içinde Reopened durumuna düştü, sonra düzeltilip Done'a taşındı. Sprint sonunda `status = Reopened` sorgusunu koştuğunda bu kayıt sonuçlarda görünür mü?",
          en: 'A bug was moved to Reopened during the sprint, then fixed and moved to Done. At the end of the sprint you run `status = Reopened` -- does this record appear in the results?',
        },
        options: [
          { id: 'a', text: { tr: 'Evet, çünkü Jira tüm geçmişi arar', en: 'Yes, because Jira searches the entire history' } },
          { id: 'b', text: { tr: 'Hayır — bu sorgu yalnızca ŞU AN o durumda olanları getirir; geçmişi sorgulamak için WAS operatörü gerekir', en: 'No -- that query returns only records currently in that status; querying history requires the WAS operator' } },
          { id: 'c', text: { tr: 'Yalnızca sprint hâlâ açıksa görünür', en: 'Only if the sprint is still open' } },
          { id: 'd', text: { tr: 'Yalnızca kaydı sen kapattıysan görünür', en: 'Only if you were the one who closed it' } },
        ],
        correct: 'b',
        explanation: {
          tr: "`status = Reopened` anlık durumu sorar. Kayıt artık Done olduğu için sonuçlarda çıkmaz — ve reopen oranını böyle ölçen bir pano kaliteyi olduğundan iyi gösterir. Geçmişteki değeri sorgulamak için `status WAS Reopened` kullanılır; bir alanın ne zaman değiştiğini sormak içinse CHANGED operatörü vardır.",
          en: '`status = Reopened` asks about the current state. Since the record is now Done it does not show up -- and a dashboard measuring reopen rate this way makes quality look better than it is. To query a past value use `status WAS Reopened`; to ask when a field changed there is the CHANGED operator.',
        },
        retryQuestion: {
          question: { tr: '`status WAS Reopened` ile `status CHANGED TO Reopened` arasındaki fark nedir?', en: 'What is the difference between `status WAS Reopened` and `status CHANGED TO Reopened`?' },
          options: [
            { id: 'a', text: { tr: 'WAS bir değeri TAŞIMIŞ OLMAYI sorar; CHANGED TO belirli bir GEÇİŞİN olup olmadığını sorar', en: 'WAS asks whether a value was EVER HELD; CHANGED TO asks whether a specific TRANSITION happened' } },
            { id: 'b', text: { tr: 'İkisi birebir aynı sonucu verir', en: 'They give the exact same result' } },
            { id: 'c', text: { tr: 'CHANGED TO yalnızca sayısal alanlarda çalışır', en: 'CHANGED TO only works on numeric fields' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'İkisi de geçmişe bakar ama farklı sorular sorar — WAS bir "durum", CHANGED TO bir "olay"dır.',
            en: 'Both look at history but ask different questions -- WAS is about a "state", CHANGED TO is about an "event".',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ F4. Kaydedilmiş Filtre, Abonelik ve Filtreden Board Üretme', en: '4️⃣ F4. Saved Filters, Subscriptions and Turning a Filter Into a Board' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir JQL sorgusu kaydedilince üç şeye dönüşebilir: bir kaydedilmiş filtre (herkes tekrar çalıştırabilir), bir abonelik (belirli aralıklarla e-posta olarak gelir) veya bir Kanban board'un kaynağı (kartlar bu sorgunun sonucundan oluşur). Bu üçü aynı JQL üzerine kurulur — sorguyu bir kez doğru yazmak, üç farklı görünüm kazandırır.",
          en: 'Once a JQL query is saved it can turn into three things: a saved filter (anyone can rerun it), a subscription (arrives by email on a schedule) or the source of a Kanban board (its cards are built from this query\'s result). All three are built on the same JQL -- writing the query correctly once buys you three different views.',
        },
      },
      savedFilterJqlPlayground,
    ],
  },

  // ── 6 · GRUP G: Scrum ve Kanban Panoları ───────────────────────────────────
  {
    title: { tr: '📋 Scrum ve Kanban Panoları', en: '📋 Scrum & Kanban Boards' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🍽️',
        content: {
          tr: "Bir restoran mutfağının sipariş panosunu düşün: siparişler soldan girer, hazırlık istasyonlarından geçer, sağdan servise çıkar. Ocak sayısı sınırlıdır — aynı anda yalnızca dört tencere kaynatabilirsin. Bu sınır bir eksiklik değil, mutfağın gerçeğidir; sınırı görmezden gelip on siparişi birden başlatan mutfakta hiçbir tabak zamanında çıkmaz. Kanban'daki WIP limiti tam olarak bu ocak sayısıdır.\n\nDüşündürücü soru: panoya bir \"QA\" sütunu koymak testi görünür mü kılar, yoksa QA'i akışın en sonundaki bir şelale adımına mı hapseder? İki tarafın da güçlü argümanı vardır ve bu sayfa sana birini dayatmaz — ama kararın sonucunu ölçmenin yolunu gösterir.\n\nKarşılaştır: otomasyon koşumunda paralel worker sayısını sınırlarsın; çünkü sekiz çekirdekte on altı tarayıcı açmak toplam süreyi kısaltmaz, uzatır. WIP limiti insan ekibinde aynı fiziği uygular: eş zamanlı iş sayısı arttıkça her işin bitme süresi uzar.\n\nQA açısından pano bir teşhis aracıdır: \"QA\" sütununda biriken kartlar, ekibin test kapasitesinin geliştirme hızının gerisinde kaldığını gösterir. Bu birikme bir suçlama değil, ölçülebilir bir sinyaldir — ve sprint retrospektifinde tartışılacak en somut veridir.",
          en: 'Picture the order board of a restaurant kitchen: orders come in from the left, pass through prep stations and leave to service on the right. The number of burners is limited -- you can only boil four pots at once. That limit is not a flaw, it is the reality of the kitchen; a kitchen that ignores it and starts ten orders at once serves no plate on time. The WIP limit in Kanban is exactly that burner count.\n\nThe question worth pausing on: does adding a "QA" column make testing visible, or does it lock QA into a waterfall step at the very end of the flow? Both sides have strong arguments and this page does not force one on you -- but it shows you how to measure the outcome of your choice.\n\nCompare: you cap the number of parallel workers in an automation run, because opening sixteen browsers on eight cores does not shorten total time, it lengthens it. A WIP limit applies the same physics to a human team: as concurrent work grows, the completion time of each item grows with it.\n\nFor QA the board is a diagnostic instrument: cards piling up in the "QA" column show that the team\'s testing capacity trails its development speed. That pile-up is not an accusation but a measurable signal -- and the most concrete data point you can bring to a retrospective.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Öğreneceksin', en: '🧭 What You Will Learn in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "Backlog → sprint → pano zincirini; Scrum ve Kanban panolarının farkını ve hangi ekibe hangisinin uyduğunu; sütun, swimlane ve hızlı filtre konfigürasyonunu; WIP limitinin darboğazı nasıl görünür kıldığını; ve sprint ritüellerinde (planlama, günlük toplantı, review, retrospektif) QA'in hangi veriyle masaya oturduğunu işleyeceğiz. Kavramları okuduktan sonra bunları yaşayarak denemek istersen, sitedeki sprint simülatörü aynı akışı bir Kanban panosu üzerinde canlandırıyor.",
          en: 'We will cover the backlog to sprint to board chain; the difference between Scrum and Kanban boards and which team each suits; column, swimlane and quick-filter configuration; how a WIP limit makes a bottleneck visible; and which data QA brings to each sprint ritual (planning, daily, review, retrospective). Once you have read the concepts, the sprint simulator on this site lets you live the same flow on a Kanban board.',
        },
      },
      backlogToBoardFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ G1. Backlog → Sprint → Pano Zinciri', en: '1️⃣ G1. The Backlog to Sprint to Board Chain' },
      },
      {
        type: 'quiz',
        question: {
          tr: "Grooming (refinement) adımı atlanıp bir öğe doğrudan sprint'e alınırsa en olası sonuç nedir?",
          en: 'If the grooming (refinement) step is skipped and an item is pulled directly into the sprint, what is the most likely outcome?',
        },
        options: [
          { id: 'a', text: { tr: "Kart panoda daha hızlı ilerler", en: 'The card moves faster on the board' } },
          { id: 'b', text: { tr: "Kabul kriteri ve tahmin olmadığı için kart bir sütunda uzun süre donar", en: 'Without an acceptance criterion or estimate, the card freezes in a column for a long time' } },
          { id: 'c', text: { tr: "Hiçbir fark olmaz, grooming isteğe bağlıdır", en: 'No difference at all, grooming is optional' } },
          { id: 'd', text: { tr: "Kart otomatik olarak Epic'e dönüşür", en: 'The card automatically turns into an Epic' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Grooming'de yazılan kabul kriteri, \"bu iş bitti mi\" sorusunun cevabını NETLEŞTİRİR. Bu netlik olmadan kart genelde \"In Progress\"te takılı kalır — filmin son sahnesinde gördüğün donmuş kart tam olarak budur.",
          en: 'The acceptance criterion written during grooming makes the answer to "is this finished" CLEAR. Without that clarity a card typically stalls in "In Progress" -- exactly the frozen card you saw in the film\'s final scene.',
        },
        retryQuestion: {
          question: { tr: 'Bir kartın story point tahmini NEREDE yapılır?', en: "WHERE is a card's story point estimate made?" },
          options: [
            { id: 'a', text: { tr: 'Grooming (refinement) sırasında, sprint\'e alınmadan ÖNCE', en: 'During grooming (refinement), BEFORE it is pulled into a sprint' } },
            { id: 'b', text: { tr: 'Sprint bittikten sonra', en: 'After the sprint ends' } },
            { id: 'c', text: { tr: 'Kart Done olduğunda otomatik hesaplanır', en: 'Automatically calculated when the card goes Done' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Tahmin, sprint planlamasının kapasite hesaplayabilmesi için grooming sırasında, işe başlamadan önce yapılır.',
            en: 'The estimate is made during grooming, before work starts, so sprint planning can calculate capacity.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ G2. Scrum Board vs Kanban Board', en: '2️⃣ G2. Scrum Board vs Kanban Board' },
      },
      {
        type: 'text',
        content: {
          tr: "İki pano tipi aynı arayüz bileşenini (sütunlu kartlar) kullanır ama farklı bir zaman felsefesi taşır. Aşağıdaki tablo dört boyutta karşılaştırıyor — özellikle \"pano her koşumda\" satırı, ikisinin neden farklı öngörülebilirlik metriği kullandığını açıklıyor.",
          en: "The two board types use the same interface component (columned cards) but carry a different philosophy of time. The table below compares them across four dimensions -- the \"the board on each cycle\" row especially explains why each uses a different predictability metric.",
        },
      },
      scrumVsKanbanTable,
      {
        type: 'quiz',
        question: {
          tr: "Bir destek ekibi, üretimden gelen bug'ları öngörülemeyen bir sıklıkta alıyor — bazı günler 2, bazı günler 15 bug geliyor. Bu ekip için hangi pano tipi daha uygundur?",
          en: 'A support team receives production bugs at an unpredictable rate -- some days 2, some days 15. Which board type suits this team better?',
        },
        options: [
          { id: 'a', text: { tr: "Scrum board — sabit sprint kapasitesi planlamayı kolaylaştırır", en: 'Scrum board -- fixed sprint capacity makes planning easier' } },
          { id: 'b', text: { tr: "Kanban board — sürekli akan, öngörülemeyen işe sprint sınırı olmadan uyum sağlar", en: 'Kanban board -- adapts to continuously flowing, unpredictable work without a sprint boundary' } },
          { id: 'c', text: { tr: "İkisi de aynı sonucu verir", en: 'Both give the same result' } },
          { id: 'd', text: { tr: "Hiçbiri, destek ekipleri pano kullanmaz", en: 'Neither, support teams do not use boards' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Sprint'e dayalı bir plan, öngörülemeyen bir gelişte anlamını kaybeder — bir gün 15 bug gelirse sprint kapasitesi anında aşılır. Kanban'ın sürekli akışı ve WIP limiti bu tür işe daha uygundur.",
          en: "A sprint-based plan loses meaning against unpredictable arrival -- if 15 bugs show up in one day, sprint capacity is instantly blown. Kanban's continuous flow and WIP limit suit this kind of work better.",
        },
        retryQuestion: {
          question: { tr: 'Scrum ile Kanban\'ın öngörülebilirlik metrikleri arasındaki fark nedir?', en: 'What is the difference between Scrum and Kanban predictability metrics?' },
          options: [
            { id: 'a', text: { tr: 'Scrum velocity (sprint başına puan) kullanır, Kanban cycle time (kart başına ortalama süre) kullanır', en: 'Scrum uses velocity (points per sprint), Kanban uses cycle time (average time per card)' } },
            { id: 'b', text: { tr: 'İkisi de aynı metriği kullanır', en: 'Both use the exact same metric' } },
            { id: 'c', text: { tr: 'Hiçbiri metrik kullanmaz', en: 'Neither uses a metric' } },
          ],
          correct: 'a',
          explanation: {
            tr: "Velocity sprint'in zaman kutusuna bağlıdır; cycle time ise sürekli akışta her kartın kendi bitirme süresini ölçer.",
            en: "Velocity is tied to the sprint's time box; cycle time measures each card's own completion time in a continuous flow.",
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '3️⃣ G3. Board Konfigürasyonu ve "QA Sütunu" Tartışması', en: '3️⃣ G3. Board Configuration and the "QA Column" Debate' },
      },
      {
        type: 'simple-box',
        emoji: '🎭',
        content: {
          tr: "Panoya ayrı bir \"QA\" sütunu koymak, bir tiyatro sahnesine ayrı bir \"prova\" bölümü eklemeye benzer: bir yandan provanın GÖRÜNÜR olması iyi bir şeydir (kimse atlamaz), diğer yandan \"önce oyna, sonra prova et\" sırası oyunu şelaleye çevirebilir.\n\nİki tarafın da argümanı var. \"QA sütunu olsun\" diyenler: doğrulama görünür olur, kimse atlamaz, darboğaz (WIP limiti aşımı) somut olarak ölçülür. \"QA sütunu olmasın\" diyenler: ayrı bir sütun, testin geliştirmeden AYRI ve SONRAKİ bir adım olduğu izlenimini güçlendirir — oysa modern pratikte test, kod yazılırken paralel ilerlemelidir (shift-left).\n\nBu sayfa sana hangisinin \"doğru\" olduğunu söylemez — ama kararının sonucunu ölçmenin yolunu gösterir: \"QA\" sütununda ortalama bekleme süresi zamanla ARTIYORSA, sütun testi görünür kılmak yerine bir şelale darboğazı yaratmış olabilir.",
          en: 'Adding a separate "QA" column to the board is like adding a separate "rehearsal" section to a theater stage: on one hand, making the rehearsal VISIBLE is good (nobody skips it), on the other, a "perform first, rehearse after" order can turn the show into a waterfall.\n\nBoth sides have an argument. Those for a QA column: verification becomes visible, nobody skips it, the bottleneck (WIP limit overflow) is measured concretely. Those against: a separate column reinforces the impression that testing is a SEPARATE, LATER step from development -- whereas modern practice has testing move in parallel with writing code (shift-left).\n\nThis page does not tell you which is "right" -- but it shows you how to measure the outcome of your choice: if the average wait time in the "QA" column keeps RISING over time, the column may have created a waterfall bottleneck instead of making testing visible.',
        },
      },
      quickFilterPlayground,
      {
        type: 'link-grid',
        cols: 1,
        items: [
          {
            icon: '🏃',
            label: { tr: 'Şimdi Uygula: QA Sprint Simülatörü', en: 'Apply It Now: QA Sprint Simulator' },
            desc: {
              tr: "Backlog, sprint, WIP limiti ve pano akışını okumakla değil YAŞAYARAK öğrenmek istersen: sitedeki Kanban panosu + bug görevleri simülatörünü dene.",
              en: 'If you want to learn backlog, sprint, WIP limit and board flow by DOING rather than reading: try the site\'s Kanban board + bug task simulator.',
            },
            route: '/sprint',
          },
        ],
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ G4. WIP Limiti ve Darboğaz', en: '4️⃣ G4. WIP Limit and Bottleneck' },
      },
      wipBottleneckSteps,
      {
        type: 'quiz',
        question: {
          tr: "\"In QA\" sütununun WIP limiti 3 ve sütun HER GÜN dolu kalıyor. Bu gözlem en çok neyi işaret eder?",
          en: 'The "In QA" column\'s WIP limit is 3, and the column stays full EVERY DAY. What does this observation point to most?',
        },
        options: [
          { id: 'a', text: { tr: "QA'in tembel çalıştığını", en: 'That QA is working lazily' } },
          { id: 'b', text: { tr: "QA test kapasitesinin geliştirme hızının GERİSİNDE kaldığını — retrospektifte tartışılacak somut bir sinyal", en: "That QA's testing capacity is TRAILING development speed -- a concrete signal for the retrospective" } },
          { id: 'c', text: { tr: "WIP limitinin çok yüksek olduğunu", en: 'That the WIP limit is set too high' } },
          { id: 'd', text: { tr: "Hiçbir şey, bu normal bir durumdur", en: 'Nothing, this is a normal state' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Sürekli dolu bir sütun bir suçlama değil, ölçülebilir bir sinyaldir: geliştirme, doğrulanabilecek hızdan daha hızlı üretiyor demektir. Çözüm daha hızlı test etmek değil, akışı dengelemektir.",
          en: 'A constantly full column is not an accusation but a measurable signal: development is producing faster than it can be verified. The fix is not testing faster, it is balancing the flow.',
        },
        retryQuestion: {
          question: { tr: 'Bir WIP limiti aşıldığında Jira ne yapar?', en: 'What does Jira do when a WIP limit is exceeded?' },
          options: [
            { id: 'a', text: { tr: 'Sütunu görsel olarak işaretler (örn. kırmızıya döner) — kural uygulanan bir kısıttır', en: 'It visually flags the column (e.g. turns it red) -- the rule is an enforced constraint' } },
            { id: 'b', text: { tr: 'Hiçbir şey yapmaz, tamamen kozmetiktir', en: 'Nothing, it is purely cosmetic' } },
            { id: 'c', text: { tr: 'Fazla kartı otomatik siler', en: 'It automatically deletes the extra card' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Görsel işaret, takıma "burada bir fiziksel sınır aşıldı" diye somut bir uyarı verir — otomasyon koşumunda paralel worker sınırını aşmanın toplam süreyi uzatmasıyla aynı fikir.',
            en: 'The visual flag gives the team a concrete warning that "a physical limit was exceeded here" -- the same idea as exceeding the parallel worker limit lengthening total time in an automation run.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: "5️⃣ G5. Sprint Ritüellerinde QA", en: '5️⃣ G5. QA in Sprint Rituals' },
      },
      {
        type: 'text',
        content: {
          tr: "QA her sprint ritüeline BOŞ elle gelmez — her ritüelde masaya somut bir veri getirir. Aşağıdaki tablo dört ritüeli ve her birinde QA'in getirdiği veriyi gösteriyor.",
          en: "QA does not arrive at any sprint ritual empty-handed -- it brings concrete data to the table at each one. The table below shows the four rituals and the data QA brings to each.",
        },
      },
      sprintRitualsTable,
    ],
  },

  // ── 7 · GRUP H: Test Yönetimi ──────────────────────────────────────────────
  {
    title: { tr: '🧪 Test Yönetimi: Xray & Zephyr', en: '🧪 Test Management: Xray & Zephyr' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '✈️',
        content: {
          tr: "Bir uçağın iki ayrı defteri vardır: arıza kayıtları (ne bozuldu, ne zaman, nasıl giderildi) ve bakım kontrol listeleri (hangi kontrol, hangi uçuştan önce, kim tarafından yapıldı). İkisi de zorunludur ve birbirinin yerine geçmez. Jira tek başına birinci defteri tutar; Xray veya Zephyr gibi eklentiler ikincisini ekler.\n\nDüşündürücü soru: bug'ları zaten Jira'da tutuyorsun; test senaryolarını da aynı yere issue olarak yazsan ne kaybedersin? Kaybettiğin şey ilişkidir: bir test senaryosunun defalarca KOŞULDUĞUNU, her koşumun ayrı bir sonucu olduğunu ve bu sonucun bir sürüme ait olduğunu düz bir issue listesi ifade edemez. Test tanımı ile test koşumu farklı şeylerdir.\n\nKarşılaştır: bir test sınıfı yazarsın ve o sınıf her gece çalışır. Sınıfın kendisi bir kez vardır, koşum kayıtları yüzlercedir. JUnit raporu ile test kaynak kodu arasındaki ayrım neyse, Test issue'su ile Test Execution issue'su arasındaki ayrım da odur.\n\nQA açısından asıl kazanç izlenebilirlik matrisidir: bir gereksinimden ona bağlı testlere, testlerden son koşum sonuçlarına, başarısız koşumlardan açılan bug'lara uzanan zincir kurulunca \"bu sürümde ne test edildi ve hangi gereksinim hiç doğrulanmadı\" sorusu tahminle değil tek bir ekranla cevaplanır.",
          en: 'An aircraft keeps two separate logbooks: fault records (what broke, when, how it was cleared) and maintenance checklists (which check, before which flight, performed by whom). Both are mandatory and neither substitutes the other. Jira alone keeps the first book; add-ons like Xray or Zephyr add the second.\n\nThe question worth pausing on: you already keep bugs in Jira, so what would you lose by writing test cases there as plain issues too? What you lose is relationship: a flat issue list cannot express that one test case is RUN many times, that each run has its own result, and that the result belongs to a release. A test definition and a test run are different things.\n\nCompare: you write a test class and it runs every night. The class exists once; the run records number in the hundreds. Whatever the distinction is between a JUnit report and test source code, that is the distinction between a Test issue and a Test Execution issue.\n\nThe real gain for QA is the traceability matrix: once the chain from a requirement to its tests, from tests to their latest run results, and from failed runs to the bugs they produced is in place, the question "what was tested in this release and which requirement was never verified" is answered by one screen instead of guesswork.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Öğreneceksin', en: '🧭 What You Will Learn in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "Jira'nın tek başına niçin test yönetimi yapmadığını; Xray/Zephyr'ın getirdiği yeni issue tiplerini (Test, Test Set, Test Plan, Test Execution, Precondition) ve aralarındaki ilişkiyi; izlenebilirlik matrisini; otomasyon koşum sonuçlarının Jira'ya nasıl aktığını; ve iki aracın karşılaştırmasıyla \"hangisi\" kararının kriterlerini işleyeceğiz.",
          en: 'We will cover why Jira alone does not do test management; the new issue types Xray/Zephyr introduce (Test, Test Set, Test Plan, Test Execution, Precondition) and how they relate; the traceability matrix; how automation run results flow into Jira; and a comparison of the two tools with the criteria behind the "which one" decision.',
        },
      },
      testDefVsExecutionFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ H1. Bug Takibi ≠ Test Yönetimi', en: '1️⃣ H1. Bug Tracking Is Not Test Management' },
      },
      {
        type: 'quiz',
        question: {
          tr: "TC-42 üç farklı build'e karşı üç kez koşuldu (PASS, FAIL, PASS) ama bu bilgi düz bir issue listesinde tek bir kayıt olarak tutuluyor. Kaybolan bilgi nedir?",
          en: 'TC-42 was run three times against three different builds (PASS, FAIL, PASS), but this information is kept as a single record in a flat issue list. What information is lost?',
        },
        options: [
          { id: 'a', text: { tr: "Hiçbir şey kaybolmaz, son durum yeterlidir", en: 'Nothing is lost, the latest state is enough' } },
          { id: 'b', text: { tr: "Hangi build'de başarısız olduğu ve o başarısızlığın hangi bug'ı doğurduğu bilgisi kaybolur", en: 'Which build it failed against, and which bug that failure produced, is lost' } },
          { id: 'c', text: { tr: "Test tanımının kendisi kaybolur", en: 'The test definition itself is lost' } },
          { id: 'd', text: { tr: "Yalnızca test adı kaybolur", en: 'Only the test name is lost' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Düz bir issue listesi yalnızca EN SON durumu tutar — build .2'deki FAIL, build .3'teki PASS'in altında kaybolur. Test Execution kayıtları her koşumu AYRI tutarak bu tarihi korur.",
          en: 'A flat issue list only holds the LATEST state -- the FAIL against build .2 is lost under the PASS against build .3. Test Execution records preserve this history by keeping each run SEPARATE.',
        },
        retryQuestion: {
          question: { tr: 'Bir JUnit raporu ile test kaynak kodu arasındaki ayrım, Jira\'daki hangi iki kavrama karşılık gelir?', en: 'The distinction between a JUnit report and test source code corresponds to which two concepts in Jira?' },
          options: [
            { id: 'a', text: { tr: 'Test issue\'su (tanım) ve Test Execution issue\'su (sonuç)', en: 'The Test issue (definition) and the Test Execution issue (result)' } },
            { id: 'b', text: { tr: 'Epic ve Story', en: 'Epic and Story' } },
            { id: 'c', text: { tr: 'Severity ve Priority', en: 'Severity and Priority' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Kaynak kod bir kez yazılır ve tanımı temsil eder; JUnit raporu her koşumda üretilir ve sonucu temsil eder — tam olarak Test/Test Execution ayrımı.',
            en: 'Source code is written once and represents the definition; a JUnit report is produced on every run and represents the result -- exactly the Test/Test Execution split.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ H2. Beş Yeni Issue Tipi ve İlişkileri', en: '2️⃣ H2. Five New Issue Types and Their Relationships' },
      },
      {
        type: 'text',
        content: {
          tr: "Xray/Zephyr, Jira'nın standart issue tiplerine beş yenisini ekler. Aşağıdaki tablo her birinin ne temsil ettiğini ve hangi üst kayda bağlandığını gösteriyor; ardından gelen adım adım anlatım, bu beşinin bir arada nasıl ÇALIŞTIĞINI somutlaştırıyor.",
          en: "Xray/Zephyr add five new types to Jira's standard issue types. The table below shows what each represents and which parent record it links to; the step-by-step walkthrough that follows makes concrete how these five WORK together.",
        },
      },
      testIssueTypesTable,
      testHierarchySteps,
      {
        type: 'quiz',
        question: {
          tr: "\"Standart müşteri hesabı\" ön koşulunu altı farklı Test kullanıyor. Bu ön koşulu her Test'in içine ayrı ayrı yazmak yerine bir Precondition olarak tutmanın kazancı nedir?",
          en: 'Six different Tests use the "standard customer account" precondition. What is the gain of keeping it as a Precondition instead of writing it separately inside each Test?',
        },
        options: [
          { id: 'a', text: { tr: "Hiçbir kazancı yoktur, kozmetiktir", en: 'No gain at all, it is cosmetic' } },
          { id: 'b', text: { tr: "Ön koşul değiştiğinde TEK bir yerden güncellenir, altı Test'te ayrı ayrı düzeltme yapılmaz", en: 'When the precondition changes it is updated in ONE place, not fixed separately in six Tests' } },
          { id: 'c', text: { tr: "Test Execution kayıtlarını otomatik siler", en: 'It automatically deletes Test Execution records' } },
          { id: 'd', text: { tr: "Yalnızca raporlarda görünür, testlerde etkisi yoktur", en: 'It only appears in reports, no effect on tests' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bu, tekrar eden bir kod parçasını bir fonksiyona çıkarmakla aynı fikirdir — paylaşılan bir ön koşulu tek bir yerde tutmak, değişikliğin altı kopyaya değil TEK kaynağa yapılmasını sağlar.",
          en: 'This is the same idea as extracting a repeated piece of code into a function -- keeping a shared precondition in one place means a change is made to a SINGLE source, not six copies.',
        },
        retryQuestion: {
          question: { tr: 'Bir Test Plan\'ın asıl işi nedir?', en: "What is a Test Plan's real job?" },
          options: [
            { id: 'a', text: { tr: "Bir sürüm için HANGİ testlerin koşulacağını belirlemek", en: 'Deciding WHICH tests will run for a release' } },
            { id: 'b', text: { tr: "Bug'ları önceliklendirmek", en: 'Prioritizing bugs' } },
            { id: 'c', text: { tr: "Sprint kapasitesini hesaplamak", en: 'Calculating sprint capacity' } },
          ],
          correct: 'a',
          explanation: {
            tr: "Test Plan, Test Set'leri bir sürüme bağlayarak o sürüm için koşulacak testlerin kapsamını tanımlar.",
            en: 'A Test Plan ties Test Sets to a release, defining the scope of tests that will run for that release.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '3️⃣ H3. İzlenebilirlik Matrisi', en: '3️⃣ H3. The Traceability Matrix' },
      },
      {
        type: 'text',
        content: {
          tr: "Jira Nedir? sekmesinde gördüğün izlenebilirlik zincirinin (gereksinim → test → koşum → bug) test yönetimi eklentisiyle TAM olarak nasıl kurulduğunu görüyorsun burada: her ok gerçek bir issue linkidir, tahmini bir ilişki değil.",
          en: "Here you see exactly HOW the traceability chain you saw on the What is Jira? tab (requirement to test to run to bug) is built with a test management add-on: every arrow is a real issue link, not an assumed relationship.",
        },
      },
      testTraceabilityMatrixFlow,
      {
        type: 'quiz',
        question: {
          tr: "İzlenebilirlik matrisinde bir gereksinimin (Story) HİÇBİR Test'e bağlı olmadığı görülüyor. Bu ne anlama gelir?",
          en: 'The traceability matrix shows a requirement (Story) with NO Test linked to it. What does this mean?',
        },
        options: [
          { id: 'a', text: { tr: "Gereksinim otomatik olarak test edilmiş sayılır", en: 'The requirement is automatically counted as tested' } },
          { id: 'b', text: { tr: "Bu gereksinim hiç test kapsamına alınmamış — bir kapsam boşluğu", en: 'This requirement was never brought into test scope -- a coverage gap' } },
          { id: 'c', text: { tr: "Gereksinim silinmelidir", en: 'The requirement should be deleted' } },
          { id: 'd', text: { tr: "Bu normal bir durumdur, endişelenmeye gerek yok", en: 'This is a normal state, nothing to worry about' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Matrisin asıl değeri budur: bir bug listesi yalnızca BULUNAN sorunları gösterirken, matris hiç TEST EDİLMEMİŞ gereksinimleri de görünür kılar — bu, üretime sızmadan önce yakalanabilecek bir kapsam boşluğudur.",
          en: 'This is the matrix\'s real value: while a bug list only shows FOUND problems, the matrix also makes NEVER-TESTED requirements visible -- a coverage gap that can be caught before it leaks to production.',
        },
        retryQuestion: {
          question: { tr: 'Bir Test Execution\'ın FAIL sonucu otomatik olarak neyi tetikleyebilir?', en: 'What can a Test Execution\'s FAIL result automatically trigger?' },
          options: [
            { id: 'a', text: { tr: 'Bir bug kaydının açılıp o koşuma link\'lenmesi', en: 'A bug record being filed and linked to that run' } },
            { id: 'b', text: { tr: 'Test tanımının otomatik silinmesi', en: 'The test definition being automatically deleted' } },
            { id: 'c', text: { tr: 'Sprint\'in otomatik kapanması', en: 'The sprint automatically closing' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Bu, zincirin son halkasıdır: başarısız bir koşum bir bug doğurur ve bu bug koşuma link\'lenerek izlenebilirlik korunur.',
            en: 'This is the last link in the chain: a failed run produces a bug, and that bug is linked back to the run, preserving traceability.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ H4. Otomasyon Sonuçlarının Jira\'ya Akması', en: '4️⃣ H4. Automation Results Flowing Into Jira' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir otomasyon paketi koştuğunda ürettiği JUnit XML raporu, CI adımının sonunda bir REST API çağrısıyla Jira'ya aktarılır — her test sonucu bir Test Execution kaydına dönüşür. Bu, elle \"hangi test geçti, hangi test kaldı\" işaretlemenin YERİNİ alır.",
          en: 'When an automation suite runs, the JUnit XML report it produces is imported into Jira via a REST API call at the end of the CI step -- each test result becomes a Test Execution record. This REPLACES manually marking "which test passed, which failed".',
        },
      },
      testExecutionJqlPlayground,
      {
        type: 'heading',
        text: { tr: '5️⃣ H5. Xray vs Zephyr: Hangisi?', en: '5️⃣ H5. Xray vs Zephyr: Which One?' },
      },
      {
        type: 'text',
        content: {
          tr: "İkisi de aynı beş issue tipi fikrini uygular ama farklı güçlü yanları vardır. Kararı ürün özellik listesine göre değil, takımın ZATEN kullandığı araçlara ve entegrasyon ihtiyacına göre ver.",
          en: 'Both implement the same five-issue-type idea but have different strengths. Base the decision not on a feature list, but on the tools the team ALREADY uses and its integration needs.',
        },
      },
      xrayVsZephyrTable,
    ],
  },

  // ── 8 · GRUP I: CI/CD ve Otomasyon Entegrasyonu ────────────────────────────
  {
    title: { tr: '🔗 CI/CD ve Otomasyon Entegrasyonu', en: '🔗 CI/CD & Automation Integration' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏭',
        content: {
          tr: "Üretim bandındaki bir kalite sensörünü düşün: hatalı parçayı gördüğü anda otomatik olarak bir arıza fişi kesiyor ve bandı durduruyor. Kulağa mükemmel geliyor — ta ki sensör kalibrasyonu bozulup her parçaya fiş kesmeye başlayana kadar. O noktada operatörler fişlere bakmayı bırakır ve sistem hiç olmadığından daha kötü hâle gelir.\n\nDüşündürücü soru: koşum kırıldığında otomatik bug açmak niçin her zaman iyi bir fikir değildir? Çünkü otomatik açılan kayıtların çoğu yeni bilgi taşımaz: aynı flaky test her gece aynı ticket'ı doğurur ve gerçek bir hata bu gürültünün içinde kaybolur.\n\nKarşılaştır: koşum kırıldığında her seferinde e-posta gönderen bir CI kurulumu, birkaç hafta içinde kimsenin okumadığı bir klasöre dönüşür. Bildirim ne kadar ucuzsa o kadar değersizleşir; otomatik ticket için de aynı yasa geçerlidir.\n\nQA açısından doğru tasarım şudur: otomatik kayıt açmadan önce aynı imzayı taşıyan açık bir kayıt var mı diye ara; varsa yeni ticket açma, mevcut kaydın altına koşum numarasını ve rapor linkini yorum olarak ekle. Böylece bir hata bir kayıt olarak kalır ama kaç kez tekrarlandığı da ölçülebilir hâle gelir.",
          en: 'Picture a quality sensor on a production line: the moment it sees a bad part it automatically issues a fault slip and stops the line. It sounds perfect -- until the sensor drifts out of calibration and starts issuing a slip for every part. At that point operators stop reading slips and the system becomes worse than having none.\n\nThe question worth pausing on: why is auto-creating a bug on every broken run not always a good idea? Because most auto-created records carry no new information: the same flaky test spawns the same ticket every night, and a real defect gets lost inside that noise.\n\nCompare: a CI setup that emails on every failure turns, within weeks, into a folder nobody reads. The cheaper a notification is, the less it is worth; the same law governs automatic tickets.\n\nThe right design for QA is this: before creating a record, search for an open record carrying the same signature; if one exists, do not open a new ticket -- add the run number and report link as a comment under the existing one. That way one defect stays one record, while how many times it recurred stays measurable.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Öğreneceksin', en: '🧭 What You Will Learn in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "Commit mesajından issue'ya bağ kurmayı (smart commit); CI koşumu kırıldığında otomatik bug açma akışını ve tuzaklarını; tekrar eden ticket'ları önleyen arama-önce stratejisini; ortam bilgisinin ve koşum artefaktının (rapor linki, ekran görüntüsü, log) kayda nasıl iliştirileceğini işleyeceğiz.",
          en: 'We will cover linking a commit message to an issue (smart commits); the flow and the pitfalls of auto-creating a bug when a CI run breaks; the search-first strategy that prevents duplicate tickets; and how to attach environment information and run artifacts (report link, screenshot, logs) to the record.',
        },
      },
      ciFailureFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ I1. Smart Commit: Commit Mesajından Issue\'ya Bağ', en: '1️⃣ I1. Smart Commit: Linking a Commit Message to an Issue' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir smart commit, git commit mesajının içine gömülen özel bir sözdizimidir — Jira bu mesajı ayrıştırıp issue üzerinde otomatik bir işlem yapar. Bu, Jira Nedir? sekmesinde gördüğün \"commit mesajına anahtar koymak\" fikrinin ötesine geçer: mesaj yalnızca bağlanmakla kalmaz, bir KOMUT da taşır.",
          en: 'A smart commit is special syntax embedded inside a git commit message -- Jira parses this message and performs an automatic action on the issue. This goes beyond the "put the key in the commit message" idea you saw on the What is Jira? tab: the message does not just link, it also carries a COMMAND.',
        },
      },
      smartCommitTable,
      {
        type: 'quiz',
        question: {
          tr: "`SHOP-142 #comment kupon hesaplaması düzeltildi #time 1h 30m` şeklinde bir commit mesajı yazıldı. Bu mesaj Jira'da NE yapar?",
          en: 'A commit message is written as `SHOP-142 #comment fixed coupon calculation #time 1h 30m`. What does this message do IN Jira?',
        },
        options: [
          { id: 'a', text: { tr: "Hiçbir şey, smart commit yalnızca tek bir komut destekler", en: 'Nothing, smart commit only supports a single command' } },
          { id: 'b', text: { tr: "SHOP-142'ye bir yorum ekler VE 1 saat 30 dakika zaman kaydı girer — birden çok komut ZİNCİRLENEBİLİR", en: "Adds a comment to SHOP-142 AND logs 1 hour 30 minutes of time -- multiple commands CAN be chained" } },
          { id: 'c', text: { tr: "Yalnızca issue'yu kapatır", en: 'It only closes the issue' } },
          { id: 'd', text: { tr: "Commit'i reddeder çünkü sözdizimi hatalıdır", en: 'It rejects the commit because the syntax is invalid' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Smart commit komutları `#` ile ayrılarak zincirlenebilir — tek bir commit mesajı birden fazla işlemi tetikleyebilir. Bu, otomasyon scriptlerinin de kullanabileceği bir sözdizimidir.",
          en: 'Smart commit commands can be chained, separated by `#` -- a single commit message can trigger multiple actions. This is syntax automation scripts can use too.',
        },
        retryQuestion: {
          question: { tr: '`#resolve` komutu her zaman çalışır mı?', en: 'Does the `#resolve` command always work?' },
          options: [
            { id: 'a', text: { tr: "Hayır — yalnızca mevcut workflow durumundan Done'a geçiş İZİN VERİYORSA çalışır", en: 'No -- it only works if the current workflow status ALLOWS a transition to Done' } },
            { id: 'b', text: { tr: "Evet, her zaman koşulsuz çalışır", en: 'Yes, it always works unconditionally' } },
            { id: 'c', text: { tr: "Yalnızca proje yöneticisi commit atarsa çalışır", en: 'It only works if a project admin makes the commit' } },
          ],
          correct: 'a',
          explanation: {
            tr: "Smart commit workflow kurallarını BYPASS etmez — Workflow ve Durumlar sekmesinde gördüğün koşullu geçiş mantığı burada da geçerlidir.",
            en: 'Smart commit does not BYPASS workflow rules -- the conditional transition logic you saw on the Workflows & Statuses tab applies here too.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ I2. Otomatik Bug Açma: Arama-Önce Stratejisi', en: '2️⃣ I2. Auto-Filing Bugs: The Search-First Strategy' },
      },
      searchFirstSteps,
      duplicateSearchJqlPlayground,
      {
        type: 'heading',
        text: { tr: '3️⃣ I3. Otomatik Açılan Bug\'ın Tuzağı: Gürültü', en: '3️⃣ I3. The Trap of Auto-Filed Bugs: Noise' },
      },
      {
        type: 'quiz',
        question: {
          tr: "Bir takım, arama-önce stratejisini uygulamadan CI'a \"her kırılan koşumda otomatik bug aç\" kuralını bağladı. Bir ay sonra en olası sonuç nedir?",
          en: 'A team wired "auto-file a bug on every broken run" into CI without the search-first strategy. What is the most likely outcome a month later?',
        },
        options: [
          { id: 'a', text: { tr: "Kalite raporu daha doğru hâle gelir", en: 'The quality report becomes more accurate' } },
          { id: 'b', text: { tr: "Aynı flaky test için onlarca \"tekil\" bug birikir ve gerçek bir hata bu gürültüde kaybolur", en: 'Dozens of "unique" bugs pile up for the same flaky test, and a real defect gets lost in the noise' } },
          { id: 'c', text: { tr: "CI otomatik olarak yavaşlar", en: 'CI automatically slows down' } },
          { id: 'd', text: { tr: "Hiçbir sonucu olmaz", en: 'There is no consequence at all' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bu, bu sekmenin başındaki üretim bandı analojisinin bire bir gerçekleşmesidir: bildirim ne kadar ucuzsa o kadar değersizleşir, ve gürültü içinde gerçek sinyal kaybolur.",
          en: "This is the production-line analogy from the top of this tab playing out literally: the cheaper a notification is, the less it is worth, and the real signal gets lost in the noise.",
        },
        retryQuestion: {
          question: { tr: 'Arama-önce stratejisi bu tuzağı nasıl önler?', en: 'How does the search-first strategy prevent this trap?' },
          options: [
            { id: 'a', text: { tr: 'Aynı imzalı açık bir kayıt varsa yeni ticket açmak yerine yorum ekler', en: 'If an open record with the same signature exists, it adds a comment instead of opening a new ticket' } },
            { id: 'b', text: { tr: 'CI koşumlarını tamamen durdurur', en: 'It stops CI runs entirely' } },
            { id: 'c', text: { tr: 'Testleri otomatik olarak siler', en: 'It automatically deletes the tests' } },
          ],
          correct: 'a',
          explanation: {
            tr: "Bu, bir hatayı TEK bir kayıt olarak tutarken tekrar sayısını da ölçülebilir bırakır — hem gürültüyü önler hem veriyi korur.",
            en: 'This keeps a failure as ONE record while leaving its recurrence count measurable -- it prevents noise while preserving the data.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: "4️⃣ I4. Ortam Bilgisi ve Koşum Artefaktı", en: '4️⃣ I4. Environment Info and Run Artifacts' },
      },
      {
        type: 'text',
        content: {
          tr: "Bug Raporlama Sanatı sekmesinde öğrendiğin \"kanıt\" kavramı otomasyon dünyasında somut bir karşılık bulur: CI koşumu bittiğinde ortam bilgisi (hangi build, hangi tarayıcı, hangi işletim sistemi) ve koşum artefaktının linki (HTML rapor, ekran görüntüsü, log dosyası) otomatik olarak issue'ya eklenir — hiçbiri elle yazılmaz. Bu, bir insanın rapor yazarken elle dolduracağı alanların otomasyon tarafından DOLDURULMASI demektir.",
          en: 'The "evidence" concept you learned on the Art of Bug Reporting tab finds a concrete counterpart in the automation world: when a CI run finishes, environment info (which build, which browser, which OS) and the run artifact link (HTML report, screenshot, log file) are attached to the issue automatically -- none of it typed by hand. This means fields a human would fill in by hand while writing a report get FILLED IN by automation instead.',
        },
      },
    ],
  },

  // ── 9 · GRUP J: Jira REST API ──────────────────────────────────────────────
  {
    title: { tr: '🤖 Jira REST API ile Otomasyon', en: '🤖 Automating with the Jira REST API' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🚪',
        content: {
          tr: "Jira'nın web arayüzü bir mağazanın vitrinidir: düzenli, güvenli ve tek tek alışveriş için ideal. REST API ise deponun arka kapısıdır — oradan tek bir kutu değil, bir palet mal geçirirsin.\n\nDüşündürücü soru: elle otuz saniyede açabildiğin bir bug için niçin API öğrenesin? Cevap tek kayıtta değil, üç yüz kayıtta: bir regresyon paketinin sonuçlarını Jira'ya aktarmak, geceleyin kırılan koşumlar için kayıt açmak veya bir raporu her sabah dışa çekmek elle yapılabilir işler değildir.\n\nKarşılaştır: test verisi hazırlarken arayüzden yirmi tıklama yapmak yerine bir API çağrısıyla kullanıcıyı ve sepeti kurarsın. Nedeni aynıdır: arayüz insan hızında, API makine hızında çalışır — ve arayüz değiştiğinde otomasyonun kırılırken API sözleşmesi çok daha yavaş değişir.\n\nQA açısından bir uyarı da gerekir: API elle yapılamayacak hataları da elle yapılamayacak hızda üretir. Yanlış bir döngü üç yüz duplicate kayıt açabilir. Bu yüzden API tarafındaki her yazma işlemi önce bir test projesinde denenir, oran sınırına (rate limit) saygı gösterilir ve dönen hata kodları (401 kimlik, 403 izin, 429 çok fazla istek) birbirinden ayırt edilir.",
          en: 'Jira\'s web interface is a shop window: tidy, safe and ideal for buying one item at a time. The REST API is the back door of the warehouse -- through it you move a pallet, not a single box.\n\nThe question worth pausing on: why learn an API for a bug you can file by hand in thirty seconds? The answer is not in one record but in three hundred: pushing a regression suite\'s results into Jira, filing records for runs that broke overnight, or pulling a report every morning are not jobs done by hand.\n\nCompare: instead of twenty clicks through the interface, you set up the user and the cart with a single API call when preparing test data. The reason is the same: the interface runs at human speed, the API at machine speed -- and while your automation breaks when the interface changes, the API contract changes far more slowly.\n\nOne warning is due for QA as well: the API also produces mistakes you could never make by hand, at a speed you could never reach by hand. One wrong loop can create three hundred duplicate records. So every write operation is first tried in a test project, the rate limit is respected, and the returned error codes are told apart (401 identity, 403 permission, 429 too many requests).',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Öğreneceksin', en: '🧭 What You Will Learn in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "API token ile kimlik doğrulamayı; issue oluşturma ve JQL ile arama uç noktalarını; aynı çağrıların Java ve Python karşılıklarını; webhook ile Jira'dan dışarı olay göndermeyi; oran sınırını ve hata kodlarının (401 / 403 / 429) neyi anlattığını işleyeceğiz.",
          en: 'We will cover authenticating with an API token; the issue-creation and JQL-search endpoints; the Java and Python equivalents of the same calls; sending events out of Jira with webhooks; and rate limits plus what the error codes (401 / 403 / 429) actually tell you.',
        },
      },
      restApiCallFilm,
      {
        type: 'heading',
        text: { tr: '1️⃣ J1. Kimlik Doğrulama ve Issue Oluşturma', en: '1️⃣ J1. Authentication and Creating an Issue' },
      },
      {
        type: 'text',
        content: {
          tr: "Jira REST API'sine her istek bir Authorization başlığı taşır — e-posta ve API token'ın base64 kodlanmış hâli. Şifre KULLANILMAZ: token ayrı bir kimlik parçasıdır ve çalınırsa şifreyi değiştirmeden iptal edilebilir. Aşağıdaki `curl` örneği en temel çağrıyı gösteriyor.",
          en: 'Every request to the Jira REST API carries an Authorization header -- the base64-encoded email and API token. A password is NOT used: the token is a separate credential and, if leaked, can be revoked without changing the password. The `curl` example below shows the most basic call.',
        },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# SHOP projesinde yeni bir Bug oluşturur
curl -X POST https://shopqa.atlassian.net/rest/api/3/issue \\
  -H "Authorization: Basic $(echo -n "eposta:api_token" | base64)" \\
  -H "Content-Type: application/json" \\
  -d '{"fields": {"project": {"key": "SHOP"}, "summary": "Otomasyon: kupon regresyonu", "issuetype": {"name": "Bug"}}}'`,
          en: `# Creates a new Bug in the SHOP project
curl -X POST https://shopqa.atlassian.net/rest/api/3/issue \\
  -H "Authorization: Basic $(echo -n "email:api_token" | base64)" \\
  -H "Content-Type: application/json" \\
  -d '{"fields": {"project": {"key": "SHOP"}, "summary": "Automation: coupon regression", "issuetype": {"name": "Bug"}}}'`,
        },
      },
      {
        type: 'quiz',
        question: {
          tr: "Bir REST API çağrısında şifre yerine API token kullanmanın en somut avantajı nedir?",
          en: "What is the most concrete advantage of using an API token instead of a password in a REST API call?",
        },
        options: [
          { id: 'a', text: { tr: "Token'lar şifrelerden daha kısadır", en: 'Tokens are shorter than passwords' } },
          { id: 'b', text: { tr: "Token çalınırsa, hesabın asıl şifresi değişmeden yalnızca token iptal edilebilir", en: 'If a token leaks, only the token can be revoked without changing the account\'s actual password' } },
          { id: 'c', text: { tr: "Token'lar hiç süresi dolmaz", en: 'Tokens never expire' } },
          { id: 'd', text: { tr: "API yalnızca token kabul eder, teknik bir zorunluluktur, avantaj değildir", en: 'The API only accepts tokens, it is a technical requirement, not an advantage' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Token, şifreden AYRI bir kimlik parçasıdır — bu ayrım, bir sızıntı durumunda hasarı sınırlar (yalnızca o token iptal edilir, kullanıcının asıl hesap şifresi etkilenmez).",
          en: 'A token is a credential SEPARATE from the password -- this separation limits the damage of a leak (only that token gets revoked, the user\'s actual account password is unaffected).',
        },
        retryQuestion: {
          question: { tr: 'Bir issue oluşturma isteğinde `fields` gövdesinde hangi üç alan ZORUNLUDUR?', en: 'In an issue-creation request, which three fields in the `fields` body are MANDATORY?' },
          options: [
            { id: 'a', text: { tr: 'project.key, summary, issuetype.name', en: 'project.key, summary, issuetype.name' } },
            { id: 'b', text: { tr: 'Yalnızca summary', en: 'Only summary' } },
            { id: 'c', text: { tr: 'Hiçbiri zorunlu değildir', en: 'None are mandatory' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Bu üç alan olmadan Jira issue oluşturamaz — arayüzden manuel oluşturmada da aynı üç bilgi istenir.',
            en: 'Without these three fields Jira cannot create an issue -- the same three pieces of information are required when creating manually through the interface.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ J2. Arama: JQL ile POST /search', en: '2️⃣ J2. Searching: POST /search with JQL' },
      },
      {
        type: 'text',
        content: {
          tr: "Arayüzdeki arama kutusuna yazdığın her JQL sorgusu, API tarafında `POST /rest/api/3/search` uç noktasına bir gövde olarak gönderilir. Bu, JQL sekmesinde öğrendiğin her şeyin API'de de ÇALIŞTIĞI anlamına gelir — sözdizimi birebir aynıdır.",
          en: 'Every JQL query you type into the search box on the interface is sent, on the API side, as a body to the `POST /rest/api/3/search` endpoint. This means everything you learned on the JQL tab WORKS on the API too -- the syntax is identical.',
        },
      },
      {
        type: 'code',
        language: 'bash',
        code: {
          tr: `# Az önce yazdığın "aynı hata açık mı" sorgusunun API çağrısı
curl -X POST https://shopqa.atlassian.net/rest/api/3/search \\
  -H "Authorization: Basic $(echo -n "eposta:api_token" | base64)" \\
  -H "Content-Type: application/json" \\
  -d '{"jql": "project = SHOP AND status != Done AND summary ~ \\"TimeoutError\\""}'`,
          en: `# The API call for the "is this failure already open" query
curl -X POST https://shopqa.atlassian.net/rest/api/3/search \\
  -H "Authorization: Basic $(echo -n "email:api_token" | base64)" \\
  -H "Content-Type: application/json" \\
  -d '{"jql": "project = SHOP AND status != Done AND summary ~ \\"TimeoutError\\""}'`,
        },
      },
      {
        type: 'heading',
        text: { tr: '3️⃣ J3. Java ve Python Örnekleri', en: '3️⃣ J3. Java and Python Examples' },
      },
      {
        type: 'text',
        content: {
          tr: "Aşağıdaki playground'da Java (REST Assured) ile bir issue oluşturma çağrısını tamamlayacaksın. Aynı çağrının Python karşılığı `requests` kütüphanesiyle yapısal olarak birebir aynıdır — değişen yalnızca sözdizimidir, gövde ve başlıklar aynı kalır.",
          en: "In the playground below you will complete an issue-creation call in Java (REST Assured). The same call's Python equivalent with the `requests` library is structurally identical -- only the syntax changes, the body and headers stay the same.",
        },
      },
      restApiCreateIssuePlayground,
      {
        type: 'code',
        language: 'python',
        code: {
          tr: `import requests
from requests.auth import HTTPBasicAuth

# Java REST Assured örneğiyle YAPISAL olarak birebir aynı: aynı gövde, aynı başlık
response = requests.post(
    "https://shopqa.atlassian.net/rest/api/3/issue",
    auth=HTTPBasicAuth(EPOSTA, API_TOKEN),
    json={
        "fields": {
            "project": {"key": "SHOP"},
            "summary": "Otomasyon: kupon hesaplama regresyonu",
            "issuetype": {"name": "Bug"},
        }
    },
)
assert response.status_code == 201, f"Beklenmeyen durum kodu: {response.status_code}"
print(response.json()["key"])  # ör. SHOP-143`,
          en: `import requests
from requests.auth import HTTPBasicAuth

# Structurally IDENTICAL to the Java REST Assured example: same body, same headers
response = requests.post(
    "https://shopqa.atlassian.net/rest/api/3/issue",
    auth=HTTPBasicAuth(EMAIL, API_TOKEN),
    json={
        "fields": {
            "project": {"key": "SHOP"},
            "summary": "Automation: coupon calculation regression",
            "issuetype": {"name": "Bug"},
        }
    },
)
assert response.status_code == 201, f"Unexpected status code: {response.status_code}"
print(response.json()["key"])  # e.g. SHOP-143`,
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ J4. Webhook: Jira\'dan Dışarı Olay Göndermek', en: '4️⃣ J4. Webhooks: Sending Events Out of Jira' },
      },
      {
        type: 'text',
        content: {
          tr: "Yukarıda gördüğün çağrılar Jira'ya İÇERİ doğru gider (script Jira'yı çağırır). Webhook bunun TERSİDİR: bir issue güncellendiğinde Jira, önceden kayıtlı bir URL'ye kendisi bir HTTP isteği gönderir — örneğin bir bug \"Reopened\"a düştüğünde Slack kanalına otomatik bir mesaj düşürmek için. Script Jira'yı beklemez, Jira scripti UYANDIRIR.",
          en: 'The calls you saw above go INTO Jira (a script calls Jira). A webhook is the REVERSE: when an issue updates, Jira itself sends an HTTP request to a pre-registered URL -- for example, to drop an automatic message into a Slack channel when a bug falls into "Reopened". The script does not wait on Jira, Jira WAKES the script up.',
        },
      },
      {
        type: 'heading',
        text: { tr: '5️⃣ J5. Oran Sınırı ve Hata Kodları', en: '5️⃣ J5. Rate Limits and Error Codes' },
      },
      apiErrorCodesTable,
      apiErrorDiagnosisSteps,
      {
        type: 'quiz',
        question: {
          tr: "Bir script SHOP projesinde issue oluşturmaya çalışıyor, kimlik bilgileri doğru ama sunucu `403 Forbidden` döndürüyor. En olası kök neden nedir?",
          en: "A script tries to create an issue in the SHOP project, credentials are correct, but the server returns `403 Forbidden`. What is the most likely root cause?",
        },
        options: [
          { id: 'a', text: { tr: "API token süresi dolmuş", en: 'The API token has expired' } },
          { id: 'b', text: { tr: "Kullanıcının SHOP projesinde issue oluşturma iznine sahip olmaması", en: 'The user does not have issue-creation permission in the SHOP project' } },
          { id: 'c', text: { tr: "Çok fazla istek gönderilmiş", en: 'Too many requests have been sent' } },
          { id: 'd', text: { tr: "JSON gövdesi bozuk", en: 'The JSON body is malformed' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Kimlik bilgileri doğruysa (401 değil) ama işlem reddediliyorsa (403), sorun KİM olduğun değil NE YAPABİLDİĞİNDİR — izin şemasına bak, token'a değil.",
          en: 'If credentials are correct (not a 401) but the action is refused (403), the problem is not WHO you are but WHAT you can DO -- check the permission scheme, not the token.',
        },
        retryQuestion: {
          question: { tr: '`429 Too Many Requests` aldığında doğru tepki nedir?', en: 'What is the correct response when you get `429 Too Many Requests`?' },
          options: [
            { id: 'a', text: { tr: '`retry-after` başlığına göre bekleyip isteği tekrar denemek', en: 'Wait according to the `retry-after` header and retry the request' } },
            { id: 'b', text: { tr: 'İsteği hemen tekrar göndermek, daha hızlı denemek', en: 'Immediately resend the request, try faster' } },
            { id: 'c', text: { tr: 'API token\'ı değiştirmek', en: 'Change the API token' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'İstek reddedilmedi, ertelendi — hızlanmak sorunu büyütür, sunucunun verdiği bekleme süresine uymak çözer.',
            en: 'The request was not rejected, it was deferred -- speeding up makes it worse, respecting the wait time the server gave is the fix.',
          },
        },
      },
    ],
  },

  // ── 10 · GRUP K: Dashboard ve QA Metrikleri ────────────────────────────────
  {
    title: { tr: '📊 Dashboard ve QA Metrikleri', en: '📊 Dashboards & QA Metrics' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎛️',
        content: {
          tr: "Bir araç gösterge paneli düşün: hız, devir, yakıt, motor sıcaklığı. Hiçbiri tek başına \"araba iyi mi\" sorusunu cevaplamaz — hız yüksekse iyi sürüyor olabilirsin ya da virajı kaçırmak üzere olabilirsin. Gösterge değerini bağlamdan alır.\n\nDüşündürücü soru: burndown grafiği düz bir çizgi olarak ilerliyorsa ekip tembel midir? Cevap hayır olabilir: sprint ortasında kapsam eklenmiş, bir bağımlılık beklenmiş ya da işler Done'a değil doğrulama kuyruğuna yığılmış olabilir. Grafik olayı gösterir, sebebini değil.\n\nKarşılaştır: yüzde doksan kod kapsamı olan bir test paketi kaliteli görünür, ama tek bir assertion içermeyen testlerle de bu sayıya ulaşılabilir. Ölçtüğün şey ile önemsediğin şey aynı olmadığında, sayı yükselirken kalite düşebilir.\n\nQA açısından en tehlikeli nokta budur: \"kapatılan bug sayısı\" bir performans hedefine dönüştüğünde davranış bozulur — kayıtlar bölünür, küçük sorunlar ayrı ayrı açılır, tartışmalı bug'lar \"cannot reproduce\" ile kapatılır. Bir ölçüt hedefe dönüştüğü anda iyi bir ölçüt olmaktan çıkar. Bu sekmede metrikleri okumayı olduğu kadar, onların nasıl istismar edildiğini görmeyi de öğreneceksin.",
          en: 'Picture a car dashboard: speed, revs, fuel, engine temperature. None of them alone answers "is the car fine" -- high speed may mean you are driving well or that you are about to miss the corner. A gauge takes its meaning from context.\n\nThe question worth pausing on: if the burndown chart runs as a flat line, is the team lazy? The answer may well be no: scope may have been added mid-sprint, a dependency may have been blocking, or work may be piling in the verification queue rather than in Done. A chart shows the event, not its cause.\n\nCompare: a suite with ninety percent code coverage looks healthy, yet that number is reachable with tests that contain no assertion at all. When the thing you measure and the thing you care about drift apart, the number can rise while quality falls.\n\nThis is the most dangerous point for QA: the moment "number of bugs closed" becomes a performance target, behavior distorts -- records get split, small issues are filed separately, and debatable bugs are closed as "cannot reproduce". A measure stops being a good measure the moment it becomes a target. In this tab you will learn to read the metrics and to see how they get gamed.',
        },
      },
      {
        type: 'heading',
        text: { tr: '🧭 Bu Sekmede Ne Öğreneceksin', en: '🧭 What You Will Learn in This Tab' },
      },
      {
        type: 'text',
        content: {
          tr: "Filtre → gadget → pano zincirini; burndown ve velocity grafiklerinin ne söyleyip ne söylemediğini; kontrol grafiği ve kümülatif akış diyagramında QA darboğazının nasıl göründüğünü; defect density, defect leakage, reopen rate ve bug yaşı metriklerinin formüllerini ve hangi sorguyla ölçüldüğünü; ve bir metriğin hedefe dönüştüğünde nasıl bozulduğunu işleyeceğiz.",
          en: 'We will cover the filter to gadget to dashboard chain; what burndown and velocity charts do and do not tell you; how a QA bottleneck appears in a control chart and a cumulative flow diagram; the formulas for defect density, defect leakage, reopen rate and bug age and the query behind each; and how a metric distorts once it becomes a target.',
        },
      },
      {
        type: 'heading',
        text: { tr: '1️⃣ K1. Filtre → Gadget → Pano Zinciri', en: '1️⃣ K1. The Filter to Gadget to Dashboard Chain' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir dashboard gadget'ı, JQL sekmesinde öğrendiğin bir sorgunun GÖRSELLEŞTİRİLMİŞ hâlidir — kaydedilmiş bir filtre seçilir, gadget o filtrenin sonucunu bir sayı, çubuk grafik veya pasta grafiğe dönüştürür. Zincir hep aynıdır: önce JQL yazılır, sonra kaydedilir, sonra bir gadget o kayda BAĞLANIR.",
          en: "A dashboard gadget is the VISUALIZED form of a query you learned on the JQL tab -- a saved filter is chosen, and the gadget turns that filter's result into a number, bar chart or pie chart. The chain is always the same: JQL is written first, then saved, then a gadget CONNECTS to that saved filter.",
        },
      },
      {
        type: 'quiz',
        question: {
          tr: "Bir gadget'ın gösterdiği sayı yanlış görünüyor. En doğru ilk teşhis adımı nedir?",
          en: 'A gadget shows a number that looks wrong. What is the most correct first diagnostic step?',
        },
        options: [
          { id: 'a', text: { tr: "Gadget'ı panodan silip yeniden eklemek", en: 'Delete the gadget from the dashboard and re-add it' } },
          { id: 'b', text: { tr: "Gadget'ın bağlı olduğu kaydedilmiş filtreyi açıp JQL'i arama kutusunda çalıştırmak", en: "Open the saved filter the gadget is connected to and run its JQL in the search box" } },
          { id: 'c', text: { tr: "Jira'yı yeniden başlatmak", en: 'Restart Jira' } },
          { id: 'd', text: { tr: "Panoyu tamamen silmek", en: 'Delete the entire dashboard' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Gadget yalnızca ALTINDAKİ JQL'in sonucunu gösterir — sayı yanlışsa sorun neredeyse her zaman sorgunun kendisindedir (yanlış koşul, yanlış proje). Zinciri kaynağından (JQL) doğrulamak, gadget'ı silip eklemekten çok daha hızlı teşhis eder.",
          en: 'A gadget only shows the result of the JQL UNDER it -- if the number is wrong, the problem is almost always in the query itself (a wrong condition, a wrong project). Verifying the chain at its source (the JQL) diagnoses far faster than deleting and re-adding the gadget.',
        },
        retryQuestion: {
          question: { tr: 'Zincirdeki üç halka hangi sırayla kurulur?', en: 'In which order are the three links of the chain built?' },
          options: [
            { id: 'a', text: { tr: 'Önce JQL yazılır, sonra kaydedilir, sonra gadget bağlanır', en: 'JQL is written first, then saved, then a gadget is connected' } },
            { id: 'b', text: { tr: 'Önce gadget eklenir, sonra JQL otomatik üretilir', en: 'A gadget is added first, then JQL is auto-generated' } },
            { id: 'c', text: { tr: 'Sıra önemli değildir', en: 'The order does not matter' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Gadget bir görselleştirme katmanıdır, veri kaynağı DEĞİLDİR — önce sorgu doğru olmalı, sonra üzerine görsel eklenir.',
            en: 'A gadget is a visualization layer, NOT a data source -- the query must be correct first, then a visual is added on top.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '2️⃣ K2. Burndown ve Velocity: Ne Söyler, Ne Söylemez?', en: '2️⃣ K2. Burndown and Velocity: What They Say, What They Do Not' },
      },
      flatBurndownFilm,
      {
        type: 'quiz',
        question: {
          tr: "Burndown grafiği tek başına, düz bir çizginin \"kapsam eklenmesi\" mi yoksa \"doğrulama kuyruğunda birikme\" mi olduğunu ayırt edebilir mi?",
          en: 'Can the burndown chart alone tell apart whether a flat line means "scope was added" versus "a pile-up in the verification queue"?',
        },
        options: [
          { id: 'a', text: { tr: "Evet, grafik sebebi de gösterir", en: 'Yes, the chart shows the cause too' } },
          { id: 'b', text: { tr: "Hayır — burndown yalnızca OLAYI gösterir, sebebi anlamak için panoya (WIP limiti, sütun dağılımı) bakmak gerekir", en: 'No -- burndown only shows the EVENT; understanding the cause requires looking at the board (WIP limit, column distribution)' } },
          { id: 'c', text: { tr: "Yalnızca Kanban'da ayırt edebilir", en: 'It can only tell them apart on Kanban' } },
          { id: 'd', text: { tr: "Sprint bitince otomatik ayırt eder", en: 'It automatically tells them apart once the sprint ends' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bu, filmin ana fikridir: bir gösterge tek başına 'iyi mi kötü mü' sorusunu cevaplamaz, bağlama ihtiyaç duyar. Panodaki WIP limiti aşımı gibi başka bir veri kaynağı olmadan burndown yalnızca bir semptomu gösterir.",
          en: "This is the film's core idea: a single gauge cannot answer 'good or bad' alone, it needs context. Without another data source like a WIP limit overflow on the board, burndown only shows a symptom.",
        },
        retryQuestion: {
          question: { tr: 'Velocity metriği neyi ölçer?', en: 'What does the velocity metric measure?' },
          options: [
            { id: 'a', text: { tr: "Bir sprint'te tamamlanan story point toplamı", en: 'The total story points completed in a sprint' } },
            { id: 'b', text: { tr: "Bir kartın ortalama bitirme süresi", en: "A card's average completion time" } },
            { id: 'c', text: { tr: "Açık bug sayısı", en: 'The number of open bugs' } },
          ],
          correct: 'a',
          explanation: {
            tr: "Velocity, Scrum'ın zaman kutusuna (sprint) bağlı bir metriktir; kartın ortalama süresi (cycle time) Kanban'ın metriğidir — Scrum ve Kanban Panoları sekmesinde gördüğün ayrım.",
            en: "Velocity is a metric tied to Scrum's time box (the sprint); a card's average duration (cycle time) is Kanban's metric -- the distinction you saw on the Scrum & Kanban Boards tab.",
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '3️⃣ K3. Kontrol Grafiği ve Kümülatif Akış Diyagramı', en: '3️⃣ K3. Control Chart and Cumulative Flow Diagram' },
      },
      controlChartBottleneckSteps,
      {
        type: 'quiz',
        question: {
          tr: "Kümülatif akış diyagramında \"In QA\" katmanı zamanla GİDEREK GENİŞLİYOR, diğer katmanlar sabit kalıyor. Bu ne anlama gelir?",
          en: 'On the cumulative flow diagram, the "In QA" band keeps WIDENING over time while other bands stay flat. What does this mean?',
        },
        options: [
          { id: 'a', text: { tr: "Hiçbir şey, bu normal bir dalgalanmadır", en: 'Nothing, this is normal fluctuation' } },
          { id: 'b', text: { tr: "\"In QA\" sütununda kart birikiyor — bir darboğaz somut olarak GÖRÜNÜR hâle geliyor", en: '"In QA" is accumulating cards -- a bottleneck is becoming VISIBLE in concrete terms' } },
          { id: 'c', text: { tr: "Sprint hızlanıyor demektir", en: 'It means the sprint is speeding up' } },
          { id: 'd', text: { tr: "Diyagram hatalıdır, yeniden çizilmelidir", en: 'The diagram is broken, it must be redrawn' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bir katmanın diğerlerine göre genişlemesi tam olarak birikimin görsel imzasıdır — bu, Scrum ve Kanban Panoları sekmesindeki WIP limiti aşımıyla aynı olguyu farklı bir grafikte gösterir.",
          en: 'A band widening relative to the others is exactly the visual signature of a pile-up -- this shows the same phenomenon as the WIP limit overflow from the Scrum & Kanban Boards tab, on a different chart.',
        },
        retryQuestion: {
          question: { tr: 'Kontrol grafiğindeki bir aykırı nokta (ortalamanın çok üzerinde) neyi gösterir?', en: 'What does an outlier dot (far above average) on a control chart show?' },
          options: [
            { id: 'a', text: { tr: 'Beklenenden çok daha uzun süren belirli bir kartı — somut bir darboğaz kanıtı', en: 'A specific card that took much longer than expected -- concrete bottleneck evidence' } },
            { id: 'b', text: { tr: 'Bir veri hatasını, her zaman göz ardı edilmeli', en: 'A data error, should always be ignored' } },
            { id: 'c', text: { tr: 'Takımın tatile çıktığını', en: 'That the team went on vacation' } },
          ],
          correct: 'a',
          explanation: {
            tr: 'Aykırı noktalar rastgele değildir — genelde belirli bir kartın hangi sütunda, ne kadar takıldığını gösteren somut bir işarettir.',
            en: 'Outliers are not random -- they are usually a concrete signal of which specific card got stuck, and for how long, in which column.',
          },
        },
      },
      {
        type: 'heading',
        text: { tr: '4️⃣ K4. Dört QA Metriği: Formül ve JQL', en: '4️⃣ K4. Four QA Metrics: Formula and JQL' },
      },
      qaMetricsTable,
      metricJqlPlayground,
      {
        type: 'heading',
        text: { tr: "5️⃣ K5. Metriklerin İstismarı", en: '5️⃣ K5. How Metrics Get Gamed' },
      },
      {
        type: 'quiz',
        question: {
          tr: "Yönetim \"kapatılan bug sayısı\"nı bir performans hedefine dönüştürdü. En olası davranış bozulması hangisidir?",
          en: 'Management turned "number of bugs closed" into a performance target. What is the most likely behavioral distortion?',
        },
        options: [
          { id: 'a', text: { tr: "Kalite gerçekten artar, çünkü herkes daha çok bug kapatmaya çalışır", en: 'Quality genuinely improves, because everyone tries to close more bugs' } },
          { id: 'b', text: { tr: "Kayıtlar bölünür, tartışmalı bug'lar \"cannot reproduce\" ile kapatılır, kolay işler riskli alanların önüne geçer", en: 'Records get split, debatable bugs get closed as "cannot reproduce", easy work is chosen over genuinely risky areas' } },
          { id: 'c', text: { tr: "Hiçbir davranış değişmez", en: 'No behavior changes at all' } },
          { id: 'd', text: { tr: "Reopen oranı otomatik düşer", en: 'The reopen rate automatically drops' } },
        ],
        correct: 'b',
        explanation: {
          tr: "Bir ölçüt hedefe dönüştüğü anda iyi bir ölçüt olmaktan çıkar (Goodhart yasası) — bu sekmenin başındaki analojide gördüğün, yüzde doksan kod kapsamının assertion'sız testlerle sağlanabilmesiyle aynı mekanizma.",
          en: 'A measure stops being a good measure the moment it becomes a target (Goodhart\'s law) -- the same mechanism you saw in the analogy at the top of this tab, where ninety percent code coverage can be reached with tests that hold no assertion.',
        },
        retryQuestion: {
          question: { tr: 'Tek bir sayı yerine üç metrikten oluşan bir set (üretime sızma oranı, reopen oranı, doğrulama bekleme süresi) kullanmanın avantajı nedir?', en: 'What is the advantage of using a set of three metrics (production leakage rate, reopen rate, verification wait time) instead of a single number?' },
          options: [
            { id: 'a', text: { tr: "Üçünü birlikte oyunlamak tek bir sayıyı oyunlamaktan çok daha zordur", en: 'Gaming all three together is far harder than gaming a single number' } },
            { id: 'b', text: { tr: 'Hesaplaması daha basittir', en: 'It is simpler to calculate' } },
            { id: 'c', text: { tr: 'Tek bir kişiye fatura edilebilir', en: 'It can be billed to a single person' } },
          ],
          correct: 'a',
          explanation: {
            tr: "Bir metrik setini oyunlamak, tek bir sayıyı oyunlamaktan daha zordur çünkü metrikler birbirini dengeler — birini iyileştirmek için diğerini kötüleştirmek genelde net bir kayıp yaratır.",
            en: 'Gaming a set of metrics is harder than gaming a single number because the metrics balance each other -- improving one at the expense of another usually creates a net loss.',
          },
        },
      },
    ],
  },

  // ── 11 · GRUP L: Gerçek Hayat Sorunları ────────────────────────────────────
  {
    title: { tr: '🚨 Gerçek Hayat Sorunları', en: '🚨 Real-Life Issues' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧯',
        content: {
          tr: "Araç kullanma kılavuzunun en çok okunan bölümü gösterge ışıkları sözlüğüdür: yanan turuncu ışığın ne anlama geldiğini bilmek, motoru açıp bakmaktan çok daha hızlı bir teşhistir. Jira'da da öyle: aldığın hata mesajı, sorunun hangi katmandan geldiğini çoğu zaman doğrudan söyler.\n\nDüşündürücü soru: \"Field 'sprint' does not exist or you do not have permission to view it\" mesajı bir yazım hatası mı, bir izin sorunu mu, yoksa o alanın bu projede hiç tanımlı olmaması mı? Tek bir cümle üç farklı kök nedeni işaret ediyorsa, teşhis mesajı okumakla değil katmanı ayırmakla başlar.\n\nKarşılaştır: bir otomasyon koşumunda element bulunamadığında önce locator'ı mı, zamanlamayı mı, yoksa sayfanın hiç yüklenmediğini mi sorgularsın — sırayı bilmek, denemeyi tahminden teşhise dönüştürür. Jira sorunlarında da aynı sıra vardır: önce izin, sonra konfigürasyon, sonra sözdizimi.\n\nQA açısından bu bölümün değeri şudur: aşağıdaki hataların hiçbiri sistemin bozuk olduğunu göstermez. Hepsi, sistemin sana bir şey anlatmaya çalıştığı anlardır — ve o anları okuyabilmek, bir günü kurtarmakla bir gün kaybetmek arasındaki farktır.",
          en: 'The most-read section of a car manual is the warning-light glossary: knowing what the orange light means is a far faster diagnosis than opening the hood. Jira works the same way: the error message you get usually tells you outright which layer the problem comes from.\n\nThe question worth pausing on: is "Field \'sprint\' does not exist or you do not have permission to view it" a typo, a permission problem, or a field that was never defined in this project? When one sentence points at three different root causes, diagnosis starts not by reading the message but by separating the layers.\n\nCompare: when an element is not found in an automation run, do you question the locator, the timing, or whether the page loaded at all -- knowing the order turns trial and error into diagnosis. Jira problems follow the same order: permission first, then configuration, then syntax.\n\nThe value of this section for QA: none of the errors below mean the system is broken. They are all moments when the system is trying to tell you something -- and being able to read those moments is the difference between saving a day and losing one.',
        },
      },
      errorLayersFilm,
      {
        type: 'error-dictionary',
        relatedTopicId: 'jira-l1-common-failures',
        framework: 'Jira Cloud',
        errors: [
          {
            error: "Field 'sprint' does not exist or you do not have permission to view it",
            fullMessage: {
              tr: "Error in the JQL Query: The field 'sprint' does not exist or you do not have permission to view it.",
              en: "Error in the JQL Query: The field 'sprint' does not exist or you do not have permission to view it.",
            },
            cause: {
              tr: 'Tek mesaj, üç ayrı kök nedeni birden anlatır: (1) alan adı yanlış yazılmış, (2) alan bu projede tanımlı değil (örneğin sprint alanı yalnızca Scrum panosu olan projelerde bulunur), (3) alan var ama senin izin şeman onu görmene kapalı. Jira güvenlik gereği üçünü ayırt etmez — bir alanın varlığını sızdırmamak için hepsine aynı cevabı verir.',
              en: 'One message covers three distinct root causes at once: (1) the field name is misspelled, (2) the field is not defined in this project (the sprint field, for instance, only exists in projects with a Scrum board), (3) the field exists but your permission scheme hides it. For security reasons Jira does not distinguish the three -- it gives the same answer to all so as not to leak the existence of a field.',
            },
            solution: {
              tr: 'Sırayla ayır: önce aynı sorguyu alan olmadan koş (proje erişimin var mı), sonra arama kutusunun otomatik tamamlama listesinde alanın görünüp görünmediğine bak (görünüyorsa izin sorunu değildir), en son yazımı kontrol et. Alan gerçekten yoksa proje yöneticisinden alanın ekrana ve şemaya eklenmesini iste — kendi sorgunu düzeltmek çözüm değildir.',
              en: 'Separate them in order: first run the same query without the field (do you have project access), then check whether the field appears in the search box autocomplete (if it does, it is not a permission problem), and check the spelling last. If the field truly does not exist, ask the project admin to add it to the screen and the scheme -- fixing your own query is not the solution.',
            },
            codeWrong: {
              tr: `-- Kanban panosu olan bir projede sprint alanı yoktur
project = SHOP AND sprint in openSprints()`,
              en: `-- A project with a Kanban board has no sprint field
project = SHOP AND sprint in openSprints()`,
            },
            codeFixed: {
              tr: `-- Kanban'da sprint yerine zaman aralığı ya da etiket kullanılır
project = SHOP AND status != Done AND updated >= -14d ORDER BY priority DESC`,
              en: `-- In Kanban, use a time range or a label instead of a sprint
project = SHOP AND status != Done AND updated >= -14d ORDER BY priority DESC`,
            },
          },
          {
            error: 'Transition button is not visible on the issue',
            fullMessage: {
              tr: 'Beklenen geçiş butonu (örn. "Ready for QA") issue ekranında hiç görünmüyor; hata mesajı da yok.',
              en: 'The expected transition button (e.g. "Ready for QA") is simply absent on the issue screen, with no error message at all.',
            },
            cause: {
              tr: 'Bu bir hata değil, tasarımdır ve tam olarak bu yüzden kafa karıştırır: workflow\'a konan bir koşul (condition) sağlanmadığında Jira butonu devre dışı bırakmaz, HİÇ göstermez. En sık üç sebep: geçiş yalnızca belirli bir role açıktır, issue sana atanmamıştır, ya da zorunlu bir alan (örneğin "Test edilen ortam") boştur.',
              en: 'This is not a failure but a design choice, which is exactly why it confuses: when a workflow condition is unmet, Jira does not disable the button -- it does not render it at all. The three most common reasons: the transition is open only to a specific role, the issue is not assigned to you, or a mandatory field (say "tested environment") is empty.',
            },
            solution: {
              tr: 'Önce issue\'nun sana atanıp atanmadığına ve zorunlu alanların dolu olup olmadığına bak; ikisi de tamamsa proje yöneticisinden workflow\'daki koşulu sorgula. Kalıcı çözüm, takımın hangi geçişi kimin yapabileceğini yazılı olarak tanımlamasıdır — aksi hâlde her yeni ekip üyesi aynı görünmez duvara çarpar.',
              en: 'First check whether the issue is assigned to you and whether mandatory fields are filled; if both are fine, ask the project admin about the workflow condition. The lasting fix is for the team to write down who may perform which transition -- otherwise every new teammate walks into the same invisible wall.',
            },
          },
          {
            error: 'Bug closed with the wrong resolution and disappears from reports',
            fullMessage: {
              tr: "Kayıt Done durumunda ve kapalı görünüyor, ama \"bu ay düzeltilen bug'lar\" raporunda hiç görünmüyor — hata mesajı yok, kayıt sessizce eksik.",
              en: 'The record sits in Done and looks closed, but never appears in the "bugs fixed this month" report -- no error message, the record is silently missing.',
            },
            cause: {
              tr: 'Kayıt kapatılırken resolution alanı "Fixed" yerine yanlışlıkla "Won\'t Fix" ya da "Duplicate" seçilmiş — genelde açılır listedeki ilk seçenek dikkatsizce tıklanır. Rapor `resolution = Fixed` filtresiyle çalıştığı için bu kayıt sessizce dışarıda kalır; Workflow ve Durumlar sekmesinde gördüğün "resolution ne zaman ve kim tarafından set edilmeli" ilkesinin ihlalidir.',
              en: 'The record was closed with resolution accidentally set to "Won\'t Fix" or "Duplicate" instead of "Fixed" -- usually because the first option in the dropdown gets clicked carelessly. Since the report filters on `resolution = Fixed`, this record silently falls outside it; a violation of the "who sets resolution and when" principle from the Workflows & Statuses tab.',
            },
            solution: {
              tr: 'Kaydın resolution alanını tek tek kontrol et; yanlışsa düzelt (bu genelde ayrı bir izin gerektirir, workflow\'a bir "resolution düzeltme" geçişi eklemek gerekebilir). Kalıcı önlem: kapatma ekranında resolution\'ı BOŞ varsayılan yap, hiçbiri önceden seçili olmasın — dikkatsiz tıklama seçenek listesinde bir varsayılana rastlayamaz.',
              en: 'Check the record\'s resolution field one by one; fix it if wrong (this usually needs separate permission, possibly a dedicated "fix resolution" transition in the workflow). The lasting prevention: make resolution default to EMPTY on the close screen, with nothing pre-selected -- a careless click cannot land on a default that does not exist.',
            },
          },
          {
            error: '401 Unauthorized vs 403 Forbidden confusion in a script',
            fullMessage: {
              tr: 'Bir otomasyon scripti Jira REST API\'sine istek atıyor, cevap `403` dönüyor ama script "token yanlış" varsayımıyla token\'ı yeniden üretip tekrar deniyor — sonuç değişmiyor.',
              en: 'An automation script calls the Jira REST API, gets `403` back, but assumes "the token is wrong" and regenerates it and retries -- the result never changes.',
            },
            cause: {
              tr: "İki hata kodu FARKLI katmanları işaret eder: 401 kimliğin geçersiz olduğunu, 403 kimliğin GEÇERLİ ama işlemin YETKİSİZ olduğunu söyler. Token'ı yenilemek 403'ü asla çözmez çünkü sorun kimlikte değil izindedir — script'in kullanıcısının SHOP projesinde issue oluşturma izni yoktur.",
              en: 'The two codes point to DIFFERENT layers: 401 says the identity is invalid, 403 says the identity is VALID but the action is UNAUTHORIZED. Regenerating the token never fixes a 403 because the problem is not identity, it is permission -- the script\'s user lacks issue-creation permission in the SHOP project.',
            },
            solution: {
              tr: "Kod farkını öğren: 401'de token'ı kontrol et, 403'te KULLANICININ proje izin şemasını kontrol et. Otomasyon kullanıcıları için ayrı, minimal yetkili bir hesap oluşturmak (yalnızca gereken projelerde issue oluşturma/güncelleme izni) hem 403 riskini azaltır hem de sızıntı durumunda hasarı sınırlar.",
              en: 'Learn the difference: on 401 check the token, on 403 check the USER\'s project permission scheme. Creating a separate, minimally privileged account for automation (issue create/update permission only on the needed projects) both reduces 403 risk and limits damage if it leaks.',
            },
            codeWrong: {
              tr: `# 403 aldığında token'ı yenilemek yanlış katmana müdahale eder
if response.status_code == 403:
    api_token = regenerate_token()  # sorunu çözmez, izin sorunu farklı katmanda`,
              en: `# Regenerating the token on 403 fixes the wrong layer
if response.status_code == 403:
    api_token = regenerate_token()  # does not fix it, the permission issue is a different layer`,
            },
            codeFixed: {
              tr: `# 403'te izin şemasını sorgula/logla, token'a dokunma
if response.status_code == 403:
    log.error("SHOP projesinde issue olusturma izni eksik -- kullaniciyi kontrol et")`,
              en: `# On 403, log/investigate the permission scheme, do not touch the token
if response.status_code == 403:
    log.error("Missing issue-creation permission on SHOP project -- check the user")`,
            },
          },
          {
            error: 'POST /rest/api/3/issue returns 400 Bad Request',
            fullMessage: {
              tr: '`{"errorMessages":[],"errors":{"customfield_10038":"Bu alan zorunludur."}}` — istek 201 yerine 400 ile geri dönüyor.',
              en: '`{"errorMessages":[],"errors":{"customfield_10038":"This field is required."}}` -- the request comes back with 400 instead of 201.',
            },
            cause: {
              tr: 'İstek gövdesi `project`, `summary`, `issuetype` gibi standart alanları doğru taşısa bile, o projede EKLENMIŞ bir özel zorunlu alan (customfield) eksik bırakılmıştır — arayüzden manuel oluşturmada bu alan bir ekranda görünür ve doldurulması zorunlu kılınır, API çağrısı bu ekranı GÖRMEZ, yalnızca gövdedeki JSON\'a bakar.',
              en: 'Even if the request body correctly carries standard fields like `project`, `summary`, `issuetype`, a custom mandatory field (customfield) ADDED to that project\'s screen was left out -- when creating manually through the interface this field appears on a screen and is enforced, but an API call does not SEE that screen, it only looks at the JSON body.',
            },
            solution: {
              tr: "Hata gövdesindeki `errors` objesi HANGİ alanın eksik olduğunu tam olarak söyler — customfield ID'sini not al, `GET /rest/api/3/issue/createmeta` uç noktasıyla o projenin TÜM zorunlu alanlarını listele ve script'in gövdesini buna göre tamamla. Tahmin etmeye gerek yok, hata mesajı zaten cevabı veriyor.",
              en: 'The `errors` object in the error body tells you EXACTLY which field is missing -- note the customfield ID, list ALL of that project\'s mandatory fields with the `GET /rest/api/3/issue/createmeta` endpoint, and complete the script\'s body accordingly. No guessing needed, the error message already gives the answer.',
            },
          },
          {
            error: 'The same bug filed three times as separate issues',
            fullMessage: {
              tr: "SHOP-142, SHOP-151 ve SHOP-163 üç farklı kişi tarafından açılmış, üçü de aynı kupon hesaplama hatasını anlatıyor — hiçbiri diğerine link'li değil.",
              en: 'SHOP-142, SHOP-151 and SHOP-163 were filed by three different people, all three describing the same coupon calculation failure -- none linked to the others.',
            },
            cause: {
              tr: "Her kişi issue açmadan ÖNCE arama yapmadı — CI/CD ve Otomasyon Entegrasyonu sekmesinde gördüğün \"arama-önce\" disiplini yalnızca otomasyon için değil, manuel raporlama için de geçerlidir. Sonuç: aynı hata üç kez sayılır, defect density gibi metrikler şişer, üç ayrı developer aynı düzeltmeyi bulmaya çalışıp zaman kaybedebilir.",
              en: 'Nobody searched BEFORE filing -- the "search-first" discipline you saw on the CI/CD & Automation Integration tab applies not just to automation but to manual reporting too. The result: the same failure is counted three times, metrics like defect density inflate, and three separate developers may waste time trying to find the same fix.',
            },
            solution: {
              tr: "Üç kayıttan en eskisini (SHOP-142) ana kayıt olarak seç, diğer ikisini \"duplicates\" link'iyle ona bağlayıp \"Duplicate\" resolution\'ıyla kapat. Kaybolmasın diye her iki kopyadaki EK bilgiyi (varsa farklı bir ortam, farklı bir kanıt) ana kayda yorum olarak taşı. Kalıcı önlem: issue oluşturma ekranına \"benzer issue\'lar\" öneri paneli eklemek (Jira Cloud\'da yerleşik).",
              en: 'Pick the oldest of the three (SHOP-142) as the master record, link the other two to it with "duplicates" and close them with the "Duplicate" resolution. To avoid losing anything, move any EXTRA information in the two duplicates (a different environment, different evidence) into a comment on the master record. Lasting prevention: enable the "similar issues" suggestion panel on the issue-creation screen (built into Jira Cloud).',
            },
          },
          {
            error: 'Unfinished issues silently vanish when a sprint closes',
            fullMessage: {
              tr: "Sprint kapatıldı, üç issue hâlâ \"In Progress\"teydi. Kimse onları elle taşımadı ama bir sonraki sprint panosunda GÖRÜNMÜYORLAR — nereye gittikleri belirsiz.",
              en: 'The sprint was closed, three issues were still "In Progress". Nobody moved them by hand, yet they are MISSING from the next sprint board -- where they went is unclear.',
            },
            cause: {
              tr: "Bir sprint kapatıldığında Jira bitmemiş işleri OTOMATİK olarak backlog'a (veya seçilirse doğrudan bir sonraki sprint'e) geri taşır — bu bir hata değil, tasarım gereği bir davranıştır. Kafa karışıklığı, bu davranışın FARKINDA OLMAMAKTAN gelir: takım her sprint sonunda bunu beklemiyorsa \"issue kayboldu\" paniğine kapılır.",
              en: 'When a sprint is closed, Jira AUTOMATICALLY moves unfinished work back to the backlog (or directly into the next sprint, if chosen) -- this is not a bug, it is designed behavior. The confusion comes from NOT BEING AWARE of this behavior: if the team does not expect it at the end of every sprint, "the issue vanished" panic follows.',
            },
            solution: {
              tr: "Sprint'i kapatan kişi, kapatma ekranındaki \"bitmemiş işler nereye gitsin\" seçeneğini BİLİNÇLİ seçmelidir (backlog'a mı, doğrudan yeni sprint'e mi). Kaybolmuş görünen bir issue'yu bulmak için backlog'da issue anahtarıyla ara — panoda değil ama sistemde HÂLÂ var.",
              en: 'Whoever closes the sprint should CONSCIOUSLY pick the "where should unfinished work go" option on the close screen (back to backlog, or straight into the new sprint). To find an issue that seems to have vanished, search the backlog by its key -- it is not on the board, but it is STILL in the system.',
            },
          },
          {
            error: 'A card is missing from the board even though the issue exists',
            fullMessage: {
              tr: "Ayşe SHOP-142'yi arama kutusunda buluyor, issue gerçekten var — ama sprint panosunda hiçbir yerde görünmüyor.",
              en: 'Ayse finds SHOP-142 in the search box, the issue genuinely exists -- but it is nowhere on the sprint board.',
            },
            cause: {
              tr: "Bu, Gerçek Hayat Sorunları sekmesindeki filmde gördüğün katmanlı teşhisin BİRE BİR uygulama alanıdır: kayıt var (izin/varlık sorunu değil), ama panonun arka plan JQL'i bu issue'yu KAPSAMIYOR olabilir — farklı proje, farklı issue tipi ya da unutulmuş bir hızlı filtre aktif kalmış olabilir.",
              en: 'This is a DIRECT application of the layered diagnosis you saw in the film at the top of this tab: the record exists (not a permission/existence issue), but the board\'s underlying JQL may not COVER this issue -- a different project, a different issue type, or a forgotten quick filter left active.',
            },
            solution: {
              tr: "Aşağıdaki step-animation'daki dört adımı sırayla uygula: arama kutusunda bulunuyor mu, panonun JQL'i koşulları karşılıyor mu, bir hızlı filtre aktif mi, swimlane ayarı kartı yerleştirebiliyor mu.",
              en: 'Apply the four steps in the step-animation below, in order: is it found in the search box, does the board\'s JQL satisfy the conditions, is a quick filter active, can the swimlane setting place the card.',
            },
          },
          {
            error: 'Notification storm after enabling "watch all issues"',
            fullMessage: {
              tr: "Bir takım üyesi \"tüm projeyi izle\" seçeneğini açtı; bir haftada 400'den fazla e-posta bildirimi aldı ve gerçekten önemli bir bildirimi (kendisine atanan kritik bug) fark etmeden kaçırdı.",
              en: 'A teammate enabled "watch entire project"; within a week they received over 400 email notifications and missed a genuinely important one (a critical bug assigned to them) without noticing.',
            },
            cause: {
              tr: "Bu, CI/CD ve Otomasyon Entegrasyonu sekmesindeki \"bildirim ne kadar ucuzsa o kadar değersizleşir\" ilkesinin insan tarafındaki karşılığıdır: proje çapında geniş bir izleme, her küçük yorumu ve her küçük geçişi de bildirime dönüştürür. Sinyal (sana atanan kritik bir bug) gürültünün (herkesin her yorumu) içinde kaybolur.",
              en: 'This is the human-side counterpart of the "the cheaper a notification is, the less it is worth" principle from the CI/CD & Automation Integration tab: watching an entire project broadly turns every small comment and every small transition into a notification too. The signal (a critical bug assigned to you) gets lost in the noise (everyone\'s every comment).',
            },
            solution: {
              tr: "Proje çapında izleme yerine bildirim şeması (notification scheme) üzerinden yalnızca İLGİLİ olayları (kendine atanan issue'lar, izlediğin belirli issue'lar) bildirim gönderecek şekilde daraltılmalıdır. JQL sekmesinde öğrendiğin abonelik mekanizması burada daha isabetlidir: geniş bir izleme yerine, gerçekten önem taşıyan bir sorguya (\"bana atanmış açık kritik bug'lar\") abone olmak.",
              en: 'Instead of project-wide watching, the notification scheme should be narrowed to send notifications only for RELEVANT events (issues assigned to you, specific issues you watch). The JQL subscription mechanism you learned earlier is more precise here: instead of broad watching, subscribe to a query that genuinely matters ("open critical bugs assigned to me").',
            },
          },
        ],
      },
      missingCardDiagnosisSteps,
      errorLayerMatchPlayground,
    ],
  },

  // ── 12 · GRUP M: Mülakat Soruları ──────────────────────────────────────────
  {
    title: { tr: '💼 Mülakat Soruları', en: '💼 Interview Q&A' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🎤',
        content: {
          tr: "Bir mülakat, aracın kullanma kılavuzunu ezberlemiş sürücü ile trafikte karar veren sürücüyü ayırmaya çalışır. İkisi de aynı kelimeleri kullanır; farkı ancak beklenmedik bir durum ortaya çıkarır.\n\nDüşündürücü soru: Jira'yı üç yıldır her gün kullanıyorsan, \"Jira biliyorum\" cevabı niçin yetmez? Çünkü aracı kullanmak ile aracın kurduğu düzeni anlamak farklı şeylerdir: her gün kart taşıyan biri, o kartların hangi veriyi ürettiğini ve o verinin hangi kararı beslediğini hiç düşünmemiş olabilir.\n\nKarşılaştır: Java mülakatlarında da aynı evrim yaşandı — \"ArrayList nedir\" sorusunun yerini \"ConcurrentModificationException aldın, sebebini ve çözümünü anlat\" aldı. Tanım bilgisi bir arama motoru kadar değerlidir; teşhis yeteneği ise işin kendisidir.\n\nQA açısından bu sekmedeki soruların tamamı senaryo tabanlıdır: sana bir durum verilir, hangi veriyi çıkaracağını, kime ne söyleyeceğini ve kararını neye dayandıracağını anlatman istenir. Cevaplarken sadece \"ne yaparım\"ı değil, \"neden bu sırayla\"yı da söyle — mülakatta ayırt edici olan tam olarak budur.",
          en: 'An interview tries to tell apart the driver who memorized the manual from the driver who makes decisions in traffic. Both use the same words; only an unexpected situation reveals the difference.\n\nThe question worth pausing on: if you have used Jira every day for three years, why is "I know Jira" not an answer? Because using a tool and understanding the order it imposes are different things: someone who moves cards daily may never have thought about which data those cards produce and which decision that data feeds.\n\nCompare: Java interviews went through the same evolution -- "what is an ArrayList" was replaced by "you got a ConcurrentModificationException, explain the cause and the fix". Definitional knowledge is worth about as much as a search engine; diagnostic ability is the job itself.\n\nFor QA, every question in this tab is scenario-based: you are given a situation and asked which data you would pull, what you would say to whom, and what you would base your decision on. When you answer, state not only "what I would do" but "why in this order" -- that is precisely what sets candidates apart.',
        },
      },
      interviewAnswerFlowFilm,
      strongAnswerBuildSteps,
      weakToStrongAnswerPlayground,
      {
        type: 'interview-questions',
        relatedTopicId: 'jira-m1-interview',
        questions: [
          {
            level: 'basic',
            q: {
              tr: "Yeni katıldığın takımda bug'lar bazen Jira'ya, bazen Slack'e yazılıyor. Takım lideri sana \"sen ne önerirsin\" diyor. Ne cevap verirsin ve önerini neye dayandırırsın?",
              en: 'On the team you just joined, bugs are sometimes written into Jira and sometimes into Slack. The team lead asks what you would recommend. What do you answer and what do you base it on?',
            },
            a: {
              tr: "Tek kayıt yerinin Jira olması gerektiğini, Slack'in ise yalnızca haber verme kanalı olarak kalmasını öneririm. Gerekçem üç somut kayıptır: Slack'te yazılan bug aranamaz (üç ay sonra aynı hata döndüğünde hiçbir bağlam bulunmaz), ölçülemez (kaç bug hangi modülden çıktı sorusu cevapsız kalır) ve bağlanamaz (commit ile kayıt arasında iz kalmaz). Öneriyi dayatma olarak değil, bir ay sonra ölçülebilir bir sonuçla getiririm: Slack'te kalan bug'ların ne kadarının kaybolduğunu göstermek, kuralın kendisinden daha ikna edicidir. Geçiş için de düşük sürtünmeli bir yol öneririm — Slack'ten tek tıkla issue oluşturan bir entegrasyon, insanları alışkanlıklarını değiştirmeye zorlamadan kaydı yerine taşır.",
              en: 'I would recommend Jira as the single place of record, with Slack kept only as a notification channel. My reasoning rests on three concrete losses: a bug written in Slack is not searchable (when the same failure returns three months later there is no context), not measurable (the question of how many bugs came from which module stays unanswered), and not linkable (no trace remains between a commit and a record). I would present this not as a mandate but with a measurable outcome a month later: showing how many Slack-only bugs were lost is more persuasive than the rule itself. For the transition I would propose a low-friction path -- an integration that creates an issue from Slack in one click moves the record to the right place without forcing people to change habits.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Sprint'in son günü. Bir bug dört kez Reopened oldu; developer \"bende çalışıyor\" diyor, ürün sahibi sprint'i kapatmak istiyor. Jira'da hangi veriyi çıkarır, kime ne söylersin?",
              en: 'It is the last day of the sprint. One bug has been reopened four times; the developer says "it works on my machine" and the product owner wants to close the sprint. Which data do you pull from Jira, and what do you say to whom?',
            },
            a: {
              tr: "Önce kaydın geçmişini çıkarırım: her Reopened geçişinde hangi ortamda, hangi build ile, hangi adımla doğrulandığı. Dört döngünün ortak noktası genellikle tek bir eksik bilgidir — çoğunlukla ortam farkı (developer local'de, ben staging'de) ya da eksik bir ön koşul. Developer'a suçlama değil bu farkı söylerim: \"aynı build numarasıyla mı denedik\" sorusu tartışmayı kişiden veriye taşır. Ürün sahibine ise kararı benim değil onun vereceğini, ama kararın maliyetini rakamla sunarım: bu bug dört kez açılıp kapandığı için toplam şu kadar gün tüketti ve şu akışı etkiliyor. Sprint kapansın isteniyorsa kaydı sprint dışına taşıyıp bir sonrakine almayı öneririm — sessizce Done'a taşımak metriği de kararı da bozar.",
              en: 'First I pull the record\'s history: for each Reopened transition, in which environment, with which build and through which steps it was verified. The common thread across four cycles is usually one missing piece of information -- most often an environment difference (the developer on local, me on staging) or a missing precondition. I tell the developer that difference rather than an accusation: asking "did we test with the same build number" moves the discussion from the person to the data. To the product owner I make clear the decision is theirs, not mine, but I present the cost of it in numbers: this bug consumed so many days across four cycles and affects this flow. If they want the sprint closed, I propose moving the record out of the sprint into the next one -- quietly dragging it to Done corrupts both the metric and the decision.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Yönetim, QA ekibinin performansını \"kapatılan bug sayısı\" ile ölçmek istiyor. Bu metriğe nasıl yaklaşırsın ve alternatif olarak ne önerirsin?",
              en: 'Management wants to measure QA team performance by "number of bugs closed". How do you approach this metric and what do you propose instead?',
            },
            a: {
              tr: "Metriği reddetmek yerine, hedefe dönüştüğünde yaratacağı davranışı somut olarak anlatırım: kayıtlar bölünmeye başlar (tek bir sorun beş ayrı ticket olur), tartışmalı bug'lar \"cannot reproduce\" ile kapanır ve gerçek riskli alanlar yerine kolay kapanan işler seçilir. Bu, ölçütün hedefe dönüştüğü anda ölçüt olmaktan çıkması olgusudur — otomasyonda yüzde doksan kod kapsamının assertion içermeyen testlerle sağlanabilmesiyle aynı mekanizma. Alternatif olarak tek bir sayı yerine üç metrikten oluşan bir set öneririm: üretime sızan bug oranı (kaçırdıklarımız), reopen oranı (düzeltmenin kalitesi) ve doğrulama bekleme süresi (akışın darboğazı). Üçünün birlikte iyileşmesi oyunlanması zor bir tablodur; ayrıca bunların hiçbiri bireysel değil takım metriğidir — kaliteyi tek bir kişiye fatura etmek, bu işin doğasına aykırıdır.",
              en: 'Rather than rejecting the metric, I describe concretely the behavior it creates once it becomes a target: records start being split (one problem becomes five tickets), debatable bugs get closed as "cannot reproduce", and easy-to-close work is chosen over genuinely risky areas. This is the phenomenon of a measure ceasing to be a good measure the moment it becomes a target -- the same mechanism by which ninety percent code coverage can be reached with tests that hold no assertion. Instead of a single number I propose a set of three: the share of bugs leaking to production (what we miss), the reopen rate (the quality of the fix), and verification waiting time (the bottleneck in the flow). Improving all three together is hard to game; and none of them is individual -- they are team metrics, because billing quality to one person contradicts the nature of the work.',
            },
          },
          // ─── BASIC (14 ek soru) ──────────────────────────────────────────
          {
            level: 'basic',
            q: {
              tr: "Yeni katılan bir developer \"Story ile Task farkı ne, ikisi de sonuçta bir iş değil mi\" diyor. Somut bir örnekle nasıl açıklarsın?",
              en: 'A new developer asks "what is the difference between a Story and a Task, are they not both just work items?" How do you explain it with a concrete example?',
            },
            a: {
              tr: "Story kullanıcıya doğrudan değer katan, tek başına teslim edilebilir bir dilimdir — \"kullanıcı kupon kodu girebilsin\" gibi. Task ise genellikle destekleyici, kullanıcıya doğrudan görünmeyen bir iştir — \"CI pipeline'ına yeni bir adım ekle\" gibi. İkisi de panoda kart olarak görünse de fark, kullanıcıya değer katıp katmadığında yatar; Java'da bir public API metodu (Story) ile onu destekleyen private bir yardımcı metot (Task) arasındaki fark gibi düşünebilirsin.",
              en: 'A Story is a slice that delivers direct user value and can ship on its own -- like "let the user enter a coupon code". A Task is usually supporting work with no direct user visibility -- like "add a new step to the CI pipeline". Both appear as cards on the board, but the difference lies in whether it delivers user value; think of it like the difference between a public API method (Story) and a private helper method (Task) that supports it in Java.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir bug'ı severity düşük, priority yüksek olarak etiketledin. PO \"severity düşükse neden acil\" diye itiraz ediyor. Ne cevap verirsin?",
              en: 'You labeled a bug low severity, high priority. The PO objects: "if severity is low, why is it urgent?" What do you answer?',
            },
            a: {
              tr: "Severity teknik etkiyi ölçer (sistem ne kadar bozuldu), priority ise iş takvimini (ne zaman yapılacak) — ikisi farklı eksenlerdir. Örneğin ana sayfada marka adının yanlış yazılması hiçbir işlevi bozmaz (severity düşük) ama saatlerce yayında kalamaz (priority yüksek). Java'da bir metodun dönüş değeri ile fırlattığı exception tipinin farklı bilgi taşıması gibi, bu iki alan da birbirinin yerine geçmez.",
              en: 'Severity measures technical impact (how badly the system is broken), priority measures the business calendar (when it gets worked on) -- they are different axes. For example, a misspelled brand name on the homepage breaks no function (low severity) but cannot stay live for hours (high priority). Like a Java method\'s return value and the exception type it throws carrying different information, these two fields are not interchangeable.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Takım lideri \"her pull request'te commit mesajına Jira anahtarı konsun\" diyor. Bunu nasıl uygularsın ve ekstra ne kazandırır?",
              en: 'The team lead says "every pull request\'s commit message should carry a Jira key". How do you implement this, and what extra benefit does it bring?',
            },
            a: {
              tr: "Commit mesajının başına `SHOP-142` gibi issue anahtarını yazmayı standart hâline getiririm; bu, kod değişikliği ile kayıt arasında kalıcı bir bağ kurar. Ekstra kazanç smart commit sözdizimidir: `#comment` veya `#time` gibi komutlarla aynı mesaj bir yorum bırakabilir ya da zaman kaydedebilir — tek bir mesaj hem bağlantı hem eylem taşır. Bu, bir log satırına hem mesaj hem context ekleyen yapılandırılmış loglamayla aynı fikri commit mesajına taşır.",
              en: 'I make it standard to prefix the commit message with the issue key, like `SHOP-142`; this creates a permanent link between the code change and the record. The extra benefit is smart commit syntax: commands like `#comment` or `#time` let the same message leave a comment or log time -- one message carries both the link and an action. This brings the same idea as structured logging, which adds both a message and context to one log line, into the commit message.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Yeni bir proje kurulacak, PO \"hızlı başlayalım, basit tutalım\" diyor. Hangi proje tipini önerirsin ve neden?",
              en: 'A new project is being set up, the PO says "let\'s start fast and keep it simple". Which project type do you recommend, and why?',
            },
            a: {
              tr: "Team-managed öneririm — takım kendi alanlarını ve workflow'unu dakikalar içinde, onay beklemeden kurabilir. Ama bunu bir uyarıyla sunarım: takım büyüyüp başka takımlarla standart raporlama gerektirdiğinde company-managed'a geçiş otomatik değildir, elle taşıma gerektirir. Bu, hızlı prototipleme için `ArrayList` seçip sonra thread-safe bir koleksiyona geçmek gibi — başlangıç kararı geleceği bağlar.",
              en: 'I recommend team-managed -- the team can configure its own fields and workflow in minutes without waiting for approval. But I present it with a caveat: when the team grows and needs standardized reporting with other teams, switching to company-managed is not automatic, it requires manual migration. It is like picking `ArrayList` for fast prototyping and later needing to move to a thread-safe collection -- the starting decision binds the future.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir arkadaşın \"panoda hiç bug göremiyorum, hepsi kayboldu mu\" diye endişeleniyor. İlk sorgulayacağın şey ne olur?",
              en: 'A colleague worries "I cannot see any bugs on the board, did they all disappear?" What is the first thing you check?',
            },
            a: {
              tr: "Önce sprint'in kapanıp kapanmadığını sorarım — bir sprint kapandığında bitmemiş işler otomatik olarak backlog'a ya da yeni sprint'e taşınır, bu bir hata değil tasarım gereği davranıştır. Arama kutusunda bir issue anahtarıyla arayıp kaydın gerçekten var olduğunu doğrularım; varsa sorun panonun görünürlüğündedir, veri kaybı değildir. Bu, bir dosyanın silinmediğini ama farklı bir dizine taşındığını `find` ile doğrulamakla aynı refleks.",
              en: 'First I ask whether the sprint was closed -- when a sprint closes, unfinished work automatically moves to the backlog or the new sprint, which is designed behavior, not a bug. I search the search box by an issue key to confirm the record genuinely exists; if it does, the problem is board visibility, not data loss. This is the same reflex as verifying with `find` that a file was not deleted but merely moved to a different directory.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Junior bir tester \"WAS operatörü ile = arasındaki fark ne\" diye soruyor. Basit bir örnekle nasıl anlatırsın?",
              en: 'A junior tester asks "what is the difference between the WAS operator and =?" How do you explain it with a simple example?',
            },
            a: {
              tr: "`status = Reopened` yalnızca ŞU AN o durumda olan kayıtları getirir; kayıt sonradan Done'a taşınırsa listeden düşer. `status WAS Reopened` ise GEÇMİŞTE bu durumu taşımış tüm kayıtları getirir, kayıt şimdi Done olsa bile. Bu, bir değişkenin şu anki değerine bakmakla (=) o değişkenin geçmişteki tüm atamalarını bir log'da aramak (WAS) arasındaki fark gibidir.",
              en: '`status = Reopened` only returns records currently in that status; if a record later moves to Done, it drops off the list. `status WAS Reopened` returns all records that EVER held that status in the past, even if they are Done now. This is like the difference between looking at a variable\'s current value (=) and searching a log for every past assignment that variable ever had (WAS).',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir developer \"ben zaten commit mesajında bahsettim, niye ayrıca bug açayım\" diyor. Ne cevap verirsin?",
              en: 'A developer says "I already mentioned it in the commit message, why do I need to open a bug too?" What do you answer?',
            },
            a: {
              tr: "Commit mesajı git geçmişinde durur ve aranması, önceliklendirilmesi, birine atanması, kalite metriklerine katılması mümkün değildir. Bug kaydı ise izlenebilir bir kimlik taşır — panoda görünür, JQL ile aranır, bir sürüme bağlanır. İkisi birbirinin yerine geçmez: commit mesajı NEDEN değişti sorusuna cevap verir, issue ise NE, NE ZAMAN ve KİM TARAFINDAN sorularına.",
              en: 'A commit message sits in git history and cannot be searched, prioritized, assigned, or rolled into quality metrics. A bug record carries a traceable identity -- visible on the board, searchable via JQL, tied to a release. Neither substitutes the other: the commit message answers WHY something changed, the issue answers WHAT, WHEN and BY WHOM.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir kartın \"In QA\" sütununda WIP limiti aşılmış görünüyor. Ekip arkadaşın \"limiti kaldıralım, sorun çözülsün\" diyor. Ne dersin?",
              en: 'The "In QA" column\'s WIP limit is exceeded. A teammate says "let\'s just remove the limit, problem solved". What do you say?',
            },
            a: {
              tr: "Limiti kaldırmak sorunu ÇÖZMEZ, GİZLER — darboğaz hâlâ oradadır, sadece görünmez hâle gelir. Sekiz çekirdekte on altı paralel worker açmanın toplam süreyi kısaltmadığı gibi, limit kaldırmak da QA'in aynı anda daha fazla kartı doğrulayabileceği anlamına gelmez. Doğru yaklaşım limiti korumak ve neden dolduğunu (kapasite dengesizliği) araştırmaktır.",
              en: 'Removing the limit does not SOLVE the problem, it HIDES it -- the bottleneck is still there, just invisible now. Just as opening sixteen parallel workers on eight cores does not shorten total time, removing the limit does not mean QA can suddenly verify more cards at once. The right approach is to keep the limit and investigate why it keeps filling up (a capacity imbalance).',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir Test Execution ile bir Test arasındaki farkı yeni bir QA'e somut bir örnekle nasıl anlatırsın?",
              en: 'How do you explain the difference between a Test Execution and a Test to a new QA engineer, with a concrete example?',
            },
            a: {
              tr: "Test, \"kupon bir kez uygulanır\" senaryosunun TANIMIDIR — bir kez yazılır, TC-42 gibi bir kimlik taşır. Test Execution ise bu tanımın BELİRLİ bir build'e karşı BELİRLİ bir andaki koşum SONUCUDUR — PASS ya da FAIL. Bu, Java'da bir test sınıfının (bir kez yazılır) her gece çalışan yüzlerce koşum kaydı (JUnit raporları) üretmesiyle aynı ayrımdır.",
              en: 'A Test is the DEFINITION of the "coupon applied once" scenario -- written once, carrying an identity like TC-42. A Test Execution is the RESULT of running that definition against a SPECIFIC build at a SPECIFIC moment -- PASS or FAIL. This is the same distinction as a Java test class (written once) producing hundreds of run records (JUnit reports) every night it runs.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Panoya \"sadece bana atanmış kartlar\" gösteren bir hızlı filtre eklemen isteniyor. Nasıl bir JQL yazarsın?",
              en: 'You are asked to add a quick filter to the board that shows "only cards assigned to me". What JQL do you write?',
            },
            a: {
              tr: "`assignee = currentUser()` yazarım — kullanıcı adını sabit yazmak yerine bu fonksiyonu kullanmak, aynı filtrenin panoyu açan HERKES için kendi sonucunu göstermesini sağlar. Bu, otomasyonda sabit test verisi yerine parametre kullanmakla aynı disiplindir: sorgu bir kez yazılır, kişiye göre kendini çözer.",
              en: 'I write `assignee = currentUser()` -- using this function instead of hardcoding a username means the same filter shows each person who opens the board their OWN result. This is the same discipline as using a parameter instead of hardcoded test data in automation: the query is written once and resolves itself per person.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir dashboard gadget'ı beklenmedik bir sayı gösteriyor. İlk ne kontrol edersin?",
              en: 'A dashboard gadget shows an unexpected number. What is the first thing you check?',
            },
            a: {
              tr: "Gadget'ın bağlı olduğu kaydedilmiş filtreyi açıp altındaki JQL'i doğrudan arama kutusunda çalıştırırım — gadget yalnızca bir görselleştirme katmanıdır, veri kaynağı değildir. Sayı yanlışsa sorun neredeyse her zaman sorgunun kendisindedir (yanlış koşul, yanlış proje), gadget'ın kendisinde değil.",
              en: 'I open the saved filter the gadget is connected to and run its underlying JQL directly in the search box -- a gadget is only a visualization layer, not a data source. If the number is wrong, the problem is almost always in the query itself (a wrong condition, a wrong project), not the gadget.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "\"Cannot reproduce\" etiketiyle geri dönen bir bug raporunu iyileştirmen isteniyor. Öncelikle neyi eklersin?",
              en: 'You are asked to improve a bug report that bounced back as "cannot reproduce". What do you add first?',
            },
            a: {
              tr: "Önce ortam bilgisini (tarayıcı, sürüm, işletim sistemi) ve ön koşulu (hangi kullanıcı, hangi veri) eklerim — bunlar en sık atlanan iki alandır ve okuyan kişinin senin gördüğün hatayı KENDİ makinesinde göremiyor olmasının en olası sebebidir. Sonra adımları deterministik hâle getiririm: \"bir ürün ekle\" değil \"Kablosuz Kulaklık ürününü ekle\" gibi tek okunuşlu ifadeler.",
              en: 'First I add the environment info (browser, version, OS) and the precondition (which user, which data) -- these are the two most commonly skipped fields and the most likely reason the reader cannot see the failure I saw on their OWN machine. Then I make the steps deterministic: not "add a product" but a single-reading phrase like "add the Wireless Headphones product".',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir arkadaşın yeni proje için `SHOPQAECOMMERCEPAYMENTSYSTEM` gibi uzun bir proje anahtarı seçmiş. Ona ne önerirsin, neden?",
              en: 'A colleague picked a long project key like `SHOPQAECOMMERCEPAYMENTSYSTEM` for a new project. What do you suggest, and why?',
            },
            a: {
              tr: "Kısa, akılda kalıcı bir kısaltma öneririm — örneğin `SHOP`. Anahtar her commit mesajında, her issue başlığında ve her JQL sorgusunda elle yazılacak; ne kadar uzunsa o kadar sık yazım hatası olur. Bu, otomasyonda `shopQaEcommercePaymentSystemCheckoutValidator` yerine `checkoutValidator` yazmakla aynı okunabilirlik ilkesidir.",
              en: 'I suggest a short, memorable abbreviation -- like `SHOP`. The key gets typed by hand in every commit message, every issue title, every JQL query; the longer it is, the more typos happen. This is the same readability principle as writing `checkoutValidator` instead of `shopQaEcommercePaymentSystemCheckoutValidator` in automation.',
            },
          },
          {
            level: 'basic',
            q: {
              tr: "Bir mülakatta sana \"Jira nedir\" diye soruluyor. Salt bir tanımın ötesinde nasıl bir cevap verirsin?",
              en: 'In an interview you are asked "what is Jira?" How do you answer beyond a bare definition?',
            },
            a: {
              tr: "Jira'yı yalnızca bir bug takip aracı olarak değil, bir kurum hafızası sistemi olarak tanımlarım: her bug'a kalıcı bir kimlik verir, bu kimlik kod, test ve raporlarla bağlanır, ve zamanla biriken kayıtlar hangi modülün risk taşıdığını, hangi testin işe yaradığını gösteren veriye dönüşür. Bu, bir hatayı sadece düzeltmekle o hatanın stack trace'ini, kök nedenini ve tekrar test adımlarını kalıcı olarak kaydetmek arasındaki farkla aynı fikir.",
              en: 'I define Jira not just as a bug tracker but as an organizational memory system: it gives every bug a permanent identity, ties that identity to code, tests and reports, and the records accumulated over time turn into data showing which module carries risk and which tests pay off. This is the same idea as the difference between just fixing an error versus permanently recording its stack trace, root cause and regression test steps.',
            },
          },
          // ─── INTERMEDIATE (19 ek soru) ───────────────────────────────────
          {
            level: 'intermediate',
            q: {
              tr: "Bir kart üç haftadır \"In Progress\"te duruyor, developer \"neredeyse bitti\" diyor ama somut bir ilerleme göremiyorsun. Neyi sorgularsın?",
              en: 'A card has sat in "In Progress" for three weeks, the developer says "almost done" but you see no concrete progress. What do you investigate?',
            },
            a: {
              tr: "Önce kartın grooming'de tahmin edilip edilmediğini ve kabul kriterinin yazılıp yazılmadığını kontrol ederim — tahminsiz ve kritersiz bir kart için \"bitti\" sorusunun objektif bir cevabı yoktur. Sonra alt işlere (Sub-task) bölünüp bölünmediğine bakarım; büyük, bölünmemiş bir kart genelde ilerlemenin görünmesini engeller. Bu, büyük bir fonksiyonu küçük, test edilebilir metotlara bölmemenin ilerlemeyi görünmez kılmasıyla aynı problem.",
              en: 'First I check whether the card was estimated during grooming and whether an acceptance criterion was written -- without an estimate and a criterion, "done" has no objective answer for that card. Then I check whether it was broken into Sub-tasks; a large, unbroken card usually hides progress from view. This is the same problem as not splitting a large function into small, testable methods, which makes progress invisible.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Sprint sonunda velocity beklenenden çok düşük çıktı. İki olası neden say ve bunları nasıl ayırt edersin.",
              en: 'At sprint end, velocity came out much lower than expected. Name two possible causes and how you would tell them apart.',
            },
            a: {
              tr: "Birinci olasılık: kartlar gerçekten yavaş ilerledi (kapasite sorunu) — bunu kontrol grafiğinde aykırı noktalar (beklenenden çok uzun süren kartlar) var mı diye bakarak doğrularım. İkinci olasılık: kartlar bitti ama Done'a değil doğrulama kuyruğuna yığıldı — bunu \"In QA\" sütununun WIP limiti aşımı geçmişine bakarak doğrularım. İki olasılık da aynı düşük sayıyı üretir ama düzeltme stratejileri tamamen farklıdır; burndown grafiği tek başına ikisini ayırt edemez.",
              en: 'First possibility: cards genuinely moved slowly (a capacity issue) -- I verify this by checking the control chart for outliers (cards that took far longer than expected). Second possibility: cards finished but piled into the verification queue instead of Done -- I verify this by checking the "In QA" column\'s WIP limit overflow history. Both possibilities produce the same low number, but their fixes are entirely different; the burndown chart alone cannot tell them apart.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir developer, kodu bitirir bitirmez resolution alanını \"Fixed\" yapmış, henüz kimse doğrulamadı. Bunu nasıl fark eder, nasıl düzeltirsin?",
              en: 'A developer sets resolution to "Fixed" the moment the code is done, before anyone verifies it. How do you notice this, and how do you fix it?',
            },
            a: {
              tr: "`resolution = Fixed AND status != Done` gibi bir JQL sorgusu, resolution'ı erken set edilmiş ama hâlâ Done olmayan kayıtları ortaya çıkarır — bu tutarsızlık erken set etmenin somut kanıtıdır. Düzeltme olarak resolution'ı doğrulama BAŞARILI olana kadar boş bırakmayı takım kuralı hâline getiririm; kayıt Reopened'a düşerse resolution'ın hâlâ \"Fixed\" göstermesi, raporları yanıltan sessiz bir hatadır.",
              en: 'A JQL query like `resolution = Fixed AND status != Done` surfaces records where resolution was set early but the status is not yet Done -- this inconsistency is concrete evidence of setting it early. As a fix, I make it a team rule to leave resolution empty until verification SUCCEEDS; if the record falls into Reopened, resolution still reading "Fixed" is a silent error that misleads reports.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir bug arama kutusunda BULUNUYOR ama aynı bug'ı JQL ile ararken çıkmıyor. Kök neden ne olabilir?",
              en: 'A bug IS found in the search box, but the same bug does not appear when searching via JQL. What could the root cause be?',
            },
            a: {
              tr: "İki arama farklı kapsamlar kullanıyor olabilir — arama kutusu metin bazlı geniş bir arama yaparken, JQL sorgun `project`, `issuetype` veya `status` gibi bir koşulla kaydı YANLIŞLIKLA dışarıda bırakıyor olabilir (örn. yanlış proje anahtarı ya da fazla kısıtlayıcı bir `status !=` koşulu). Sorguyu koşul koşul basitleştirip hangi AND'in kaydı elediğini bulurum — tıpkı bir otomasyon assertion'ının hangi koşulda başarısız olduğunu izole etmek gibi.",
              en: 'The two searches may use different scopes -- the search box does a broad text-based search, while your JQL query might WRONGLY exclude the record with a condition like `project`, `issuetype` or `status` (e.g. the wrong project key, or an overly restrictive `status !=` condition). I simplify the query condition by condition to find which AND is eliminating the record -- just like isolating which condition an automation assertion fails on.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Takım \"panoya QA sütunu ekleyelim mi eklemeyelim mi\" diye ikiye bölünmüş. Nasıl bir orta yol önerirsin?",
              en: 'The team is split on "should we add a QA column to the board or not". What middle ground do you propose?',
            },
            a: {
              tr: "Sütunu ekleriz ama bir ölçüm koşuluyla: \"QA\" sütununda ortalama bekleme süresini takip ederiz ve süre zamanla ARTIYORSA, sütunun testi görünür kılmak yerine bir şelale darboğazı yarattığı sonucuna varıp kaldırmayı yeniden tartışırız. Bu, bir mimari kararı tek seferlik bir tartışmayla değil, ölçülebilir bir geri bildirim döngüsüyle vermekle aynı disiplindir.",
              en: 'We add the column but with a measurement condition: we track the average wait time in the "QA" column, and if that time keeps RISING over time, we conclude the column created a waterfall bottleneck instead of making testing visible, and revisit removing it. This is the same discipline as making an architectural decision with a measurable feedback loop instead of a one-time debate.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Gece çalışan bir otomasyon scripti 300 duplicate bug açmış. Kök nedeni ve kalıcı düzeltmeyi anlat.",
              en: 'An overnight automation script filed 300 duplicate bugs. Explain the root cause and the lasting fix.',
            },
            a: {
              tr: "Kök neden, script'in her başarısız koşumda arama yapmadan doğrudan yeni bir issue açmasıdır — aynı flaky test her gece aynı ticket'ı doğurur. Kalıcı düzeltme, koşum kırıldığında önce aynı imzayı (test adı + hata mesajı) taşıyan açık bir kayıt olup olmadığını JQL ile aramak; varsa yorum eklemek, yoksa yeni kayıt açmaktır. Bu, üretim bandındaki bir sensörün her parçaya değil yalnızca GERÇEKTEN yeni bir hataya fiş kesmesiyle aynı tasarım.",
              en: 'The root cause is the script filing a new issue directly on every failed run without searching first -- the same flaky test spawns the same ticket every night. The lasting fix is: on a broken run, first search via JQL for an open record with the same signature (test name plus error message); if found, add a comment, if not, file a new record. This is the same design as a production-line sensor issuing a slip only for a GENUINELY new defect, not for every part.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Xray kullanan bir takım \"her build için ayrı bir Test tanımı mı açalım\" diye soruyor. Cevabın ve gerekçen?",
              en: 'A team using Xray asks "should we open a separate Test definition for every build?" What is your answer and reasoning?',
            },
            a: {
              tr: "Hayır — Test tanımı bir SENARYOYU temsil eder ve bir kez yazılır; her build için ayrı bir Test Execution kaydı oluşur. Her build'e ayrı Test açmak, tanım ile sonucu karıştırır ve aynı senaryonun geçmişini (hangi build'de PASS, hangi build'de FAIL) tek bir tanım altında toplamayı imkânsız kılar. Bu, her test koşumu için ayrı bir test SINIFI yazmak yerine aynı sınıfın koşum kayıtlarını (JUnit raporları) biriktirmekle aynı fikirdir.",
              en: 'No -- a Test definition represents a SCENARIO and is written once; a separate Test Execution record is created for each build. Opening a separate Test per build confuses definition with result, and makes it impossible to gather the same scenario\'s history (which build PASSed, which FAILed) under one definition. This is the same idea as accumulating run records (JUnit reports) for the same test class instead of writing a separate test CLASS for every run.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Reopen rate metriği aylardır yükseliyor ama kimse fark etmemiş çünkü kimse dashboard'a bakmıyor. Bunu nasıl görünür kılarsın?",
              en: 'Reopen rate has been climbing for months, but nobody noticed because nobody checks the dashboard. How do you make it visible?',
            },
            a: {
              tr: "Reopen rate'i hesaplayan JQL'i bir kaydedilmiş filtreye dönüştürüp haftalık bir ABONELİK kurarım — sayı artık panoya bakmayı beklemek yerine e-posta olarak takıma gelir. Ek olarak dashboard'a bu filtreyi bağlayan bir gadget eklerim ki sprint review'de görsel olarak da tartışılabilsin. Veriyi pasif bir panoda bırakmak yerine aktif olarak ekibin önüne getirmek, bir CI koşumunun sonucunu log dosyasında bırakmak yerine Slack'e bildirmekle aynı fikirdir.",
              en: 'I turn the JQL that calculates reopen rate into a saved filter and set up a weekly SUBSCRIPTION -- the number now reaches the team by email instead of waiting for someone to check the board. I also add a gadget on the dashboard connected to this filter so it can be discussed visually at sprint review. Actively pushing data in front of the team instead of leaving it passive on a dashboard is the same idea as notifying Slack of a CI run\'s result instead of leaving it in a log file.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir developer \"403 alıyorum, token'ım yanlış olmalı\" diyerek token'ı sürekli yeniliyor ama hata devam ediyor. Teşhisi nasıl düzeltirsin?",
              en: 'A developer keeps regenerating their token saying "I get 403, my token must be wrong", but the error persists. How do you correct the diagnosis?',
            },
            a: {
              tr: "401 kimlik katmanında durur (\"sen kimsin bilmiyorum\"), 403 ise kimlik GEÇERLİ ama izin YETERSİZ olduğunda döner — token'ı yenilemek 403'ü asla çözmez çünkü sorun kimlik değil izindir. Developer'a kullanıcısının SHOP projesinde issue oluşturma iznine sahip olup olmadığını kontrol etmesini söylerim, token'a değil. Bu, bir derleme hatasıyla bir çalışma zamanı izin hatasını karıştırmamakla aynı ayrımdır — ikisi de \"başarısız\" görünür ama farklı katmanlardan gelir.",
              en: '401 stops at the identity layer ("I do not know who you are"), while 403 returns when identity is VALID but permission is INSUFFICIENT -- regenerating the token never fixes a 403 because the problem is not identity, it is permission. I tell the developer to check whether their user has issue-creation permission in the SHOP project, not the token. This is the same distinction as not confusing a compile error with a runtime permission error -- both look "failed" but come from different layers.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Kanban panosunda cycle time sürekli artıyor ama kimse nedenini bilmiyor. Nasıl araştırırsın?",
              en: 'On a Kanban board, cycle time keeps rising but nobody knows why. How do you investigate?',
            },
            a: {
              tr: "Önce kontrol grafiğindeki aykırı noktalara bakarım — hangi kartların ortalamanın çok üzerinde sürdüğünü ve hangi sütunda takıldıklarını görürüm. Sonra kümülatif akış diyagramında hangi katmanın GENİŞLEDİĞİNE bakarım; genişleyen katman kart biriktiren sütundur. İki grafik birlikte \"hangi kart\" ve \"hangi sütun\" sorularını cevaplar — tek bir ortalama sayı bu ayrıntıyı hiçbir zaman vermez.",
              en: 'First I look at outliers on the control chart -- I see which cards took far longer than average and which column they got stuck in. Then I check which band is WIDENING on the cumulative flow diagram; the widening band is the column accumulating cards. Together the two charts answer "which card" and "which column" -- a single average number never gives that detail.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Aynı bug iki kez farklı severity ile duplicate açılmış. Nasıl birleştirir, hangi severity'yi tutarsın?",
              en: 'The same bug was filed twice as a duplicate with different severity values. How do you merge them, and which severity do you keep?',
            },
            a: {
              tr: "En eski kaydı ana kayıt seçip diğerini \"duplicates\" link'iyle ona bağlar, \"Duplicate\" resolution'ıyla kapatırım. Severity için ikisinden YÜKSEK olanı tutarım — severity teknik etkiyi ölçer ve iki farklı gözlemci aynı hatayı farklı koşullarda görmüş olabilir; düşük olanı seçmek gerçek etkiyi eksik göstermek riski taşır. Kopyadaki ek bilgiyi (varsa farklı bir tekrar üretim yolu) ana kayda yorum olarak taşırım, kaybolmasın diye.",
              en: 'I pick the oldest record as the master, link the other to it with "duplicates", and close it with the "Duplicate" resolution. For severity I keep the HIGHER of the two -- severity measures technical impact, and two different observers may have seen the same failure under different conditions; picking the lower one risks understating the real impact. I move any extra information in the duplicate (a different reproduction path, say) into a comment on the master record so it is not lost.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Takım defect leakage'ı ölçmek istiyor ama \"production\" etiketi tutarsız kullanılıyor — bazıları unutuyor. Ne önerirsin?",
              en: 'The team wants to measure defect leakage, but the "production" label is used inconsistently -- some people forget it. What do you propose?',
            },
            a: {
              tr: "Etiketi elle hatırlamaya güvenmek yerine, bug raporu ekranında \"Ortam\" alanını ZORUNLU yapıp \"production\" seçilirse etiketin otomatik eklenmesini sağlayan bir workflow/otomasyon kuralı öneririm — insanın unutmasına bağlı bir süreç güvenilir bir metrik üretemez. Bu, bir test raporunda ortam bilgisini elle yazmak yerine CI'ın otomatik doldurmasıyla aynı fikirdir: veri kalitesi disiplinle değil sistemle garanti edilmelidir.",
              en: 'Instead of relying on people remembering to tag manually, I propose making the "Environment" field MANDATORY on the bug report screen and adding a workflow/automation rule that auto-applies the label when "production" is selected -- a process that depends on humans not forgetting cannot produce a reliable metric. This is the same idea as CI auto-filling environment info in a test report instead of someone typing it by hand: data quality should be guaranteed by the system, not by discipline.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir link \"blocks\" yerine yanlışlıkla \"is blocked by\" olarak ters yönde kurulmuş. Bu sprint planlamasını nasıl etkiler, nasıl düzeltirsin?",
              en: 'A link was mistakenly set up in reverse -- "is blocked by" instead of "blocks". How does this affect sprint planning, and how do you fix it?',
            },
            a: {
              tr: "Yön ters olduğu için planlama aracı bağımlılığı TERS okur — gerçekte önce bitmesi gereken iş sanki SONRA yapılabilirmiş gibi görünür ve sprint sırası bozulabilir. Düzeltme basittir: linki silip doğru yönde (gerçekten engelleyen issue'dan engellenen issue'ya) yeniden kurmak. Bu tür bir hatayı önlemek için link eklerken \"bu hangi işi bekliyor\" sorusunu sesli sormayı takım alışkanlığı hâline getiririm.",
              en: 'Because the direction is reversed, the planning tool reads the dependency BACKWARDS -- work that genuinely needs to finish first looks like it can happen LATER, potentially breaking sprint order. The fix is simple: delete the link and recreate it in the correct direction (from the issue that actually blocks to the one being blocked). To prevent this kind of mistake, I make it a team habit to ask out loud "which work is this waiting on" when adding a link.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir webhook kurulumu Slack'e mesaj atmıyor. Hangi katmanları sırayla kontrol edersin?",
              en: 'A webhook setup is not sending messages to Slack. Which layers do you check, in order?',
            },
            a: {
              tr: "Önce webhook'un doğru OLAYA (örn. \"issue updated\") bağlı olup olmadığını kontrol ederim — yanlış olay seçilmişse tetiklenme hiç olmaz. Sonra hedef URL'nin doğru ve erişilebilir olduğunu doğrularım (Slack tarafındaki entegrasyon anahtarı geçerli mi). En son webhook'un JQL filtresi varsa (yalnızca belirli issue'lar için tetiklensin diye), bu filtrenin test edilen issue'yu KAPSAYIP kapsamadığına bakarım — sıralama, izin katmanlarını teşhis ederkenkiyle aynı mantık: önce erişim, sonra konfigürasyon, sonra ayrıntı.",
              en: 'First I check whether the webhook is bound to the right EVENT (e.g. "issue updated") -- if the wrong event is selected, it never fires at all. Then I verify the target URL is correct and reachable (is the integration key on the Slack side still valid). Last, if the webhook has a JQL filter (to fire only for certain issues), I check whether that filter COVERS the issue being tested -- the same order of reasoning as diagnosing permission layers: access first, then configuration, then detail.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir Precondition güncellendi ama bağlı altı testten biri hâlâ eski davranışı bekliyor gibi başarısız oluyor. Ne olabilir?",
              en: 'A Precondition was updated, but one of the six linked tests still fails as if expecting the old behavior. What could be going on?',
            },
            a: {
              tr: "O test muhtemelen Precondition'a bağlı DEĞİL, ön koşulu KENDİ İÇİNDE ayrı bir metin olarak tekrar yazmış — bu, Precondition'ın paylaşım avantajını ortadan kaldırır ve tam olarak paylaşılan bir ön koşulu tek bir yerden yönetmenin ÖNLEMEYE çalıştığı hatadır. Testin tanımını açıp Precondition'a doğru LİNKLENDİĞİNİ doğrularım, gerekirse tekrar bağlarım — bu, paylaşılan bir sabiti kopyalamak yerine import etmemenin doğurduğu tutarsızlıkla aynı sınıf hata.",
              en: 'That test likely is NOT linked to the Precondition, and instead re-wrote the precondition as separate text INSIDE itself -- this defeats the sharing advantage of a Precondition and is exactly the mistake that keeping a shared precondition in one place is meant to PREVENT. I open the test\'s definition and verify it is correctly LINKED to the Precondition, relinking if needed -- the same class of bug as inconsistency caused by copying a shared constant instead of importing it.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir takım günlük 15 JQL sorgusunu elle çalıştırıyor. Nasıl bir iyileştirme önerirsin?",
              en: 'A team runs 15 JQL queries by hand every day. What improvement do you propose?',
            },
            a: {
              tr: "En sık koşulan sorguları kaydedilmiş filtrelere dönüştürür, kritik olanlar için haftalık/günlük abonelik kurarım ve tekrar eden birkaçını bir dashboard'da gadget olarak toplarım. Bu, elle tekrarlanan bir iş akışını otomatikleştirmekle aynı fikirdir — bir testi her seferinde elle koşmak yerine CI'a bağlamak gibi; sorgu bir kez doğru yazılır, sonra kendi kendine çalışır.",
              en: 'I turn the most frequently run queries into saved filters, set up daily/weekly subscriptions for the critical ones, and gather a few repeated ones as gadgets on a dashboard. This is the same idea as automating a manually repeated workflow -- like wiring a test into CI instead of running it by hand every time; the query is written correctly once, then runs itself.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir bug \"Done\" görünüyor ama üç ay sonra defect leakage raporunda hiç yer almıyor. Neden olabilir?",
              en: 'A bug shows as "Done", but three months later it never appears in the defect leakage report. Why might that be?',
            },
            a: {
              tr: "En olası neden, resolution alanının \"Fixed\" yerine yanlışlıkla \"Won't Fix\" ya da \"Duplicate\" seçilmiş olmasıdır — rapor genelde `resolution = Fixed` filtresiyle çalışır ve bu kayıt sessizce dışarıda kalır. Kaydın resolution'ını kontrol ederim; yanlışsa düzeltirim ve kapatma ekranında hiçbir seçeneğin önceden seçili gelmemesini takım kuralı hâline getiririm ki dikkatsiz tıklama bir varsayılana rastlamasın.",
              en: 'The most likely reason is that resolution was accidentally set to "Won\'t Fix" or "Duplicate" instead of "Fixed" -- the report usually filters on `resolution = Fixed` and this record silently falls outside it. I check the record\'s resolution; if wrong, I fix it, and I make it a team rule that no option comes pre-selected on the close screen so a careless click cannot land on a default.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Sprint review'de PO \"bu sprintte kaç bug bulduk\" diye soruyor. Ham sayı yerine ne sunarsın?",
              en: 'At sprint review the PO asks "how many bugs did we find this sprint?" What do you present instead of a raw count?',
            },
            a: {
              tr: "Tek bir sayı yerine bağlamı da veririm: kaç bug bulundu, kaçı yüksek severity, kaçı üretime sızdı (defect leakage) ve kaçı reopen oldu. Ham sayı tek başına yanıltıcıdır — on kolay kozmetik bug ile iki kritik ödeme hatası aynı \"10 bug\" cümlesine sığar ama ANLAMLARI çok farklıdır; bu, bir test paketinin \"50 test yazıldı\" demesiyle \"50 test ANLAMLI assertion içeriyor\" demesi arasındaki farkla aynı.",
              en: 'Instead of a single number, I provide context too: how many bugs, how many high severity, how many leaked to production (defect leakage), how many were reopened. A raw count alone is misleading -- ten easy cosmetic bugs and two critical payment failures both fit into the same "10 bugs" sentence, but their MEANING is very different; the same gap as between a test suite saying "50 tests written" and "50 tests carry meaningful assertions".',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "Bir developer \"smart commit #resolve çalışmıyor\" diye şikâyet ediyor. Hangi ihtimalleri sırayla kontrol edersin?",
              en: 'A developer complains "smart commit #resolve is not working". What possibilities do you check, in order?',
            },
            a: {
              tr: "Önce issue anahtarının commit mesajında doğru yazılıp yazılmadığını kontrol ederim (bir yazım hatası tüm komutu geçersiz kılar). Sonra mevcut workflow durumundan Done'a doğrudan bir geçiş TANIMLI mı diye bakarım — smart commit workflow koşullarını BYPASS etmez, geçiş yoksa komut sessizce başarısız olur. Bu, bir API çağrısının izin şemasını bypass edememesiyle aynı prensip: sözdizimi doğru olsa bile iş kuralı izin vermezse işlem geçmez.",
              en: 'First I check whether the issue key is written correctly in the commit message (a typo invalidates the whole command). Then I check whether a direct transition to Done is DEFINED from the current workflow status -- smart commit does not BYPASS workflow rules, and if no transition exists the command silently fails. This is the same principle as an API call being unable to bypass the permission scheme: even with correct syntax, if the business rule does not allow it, the action does not go through.',
            },
          },
          {
            level: 'intermediate',
            q: {
              tr: "İzlenebilirlik matrisinde bir bug'ın hiçbir Test Execution'a bağlı olmadığını görüyorsun. Bu ne anlama gelir, ne yaparsın?",
              en: 'In the traceability matrix you see a bug with no Test Execution linked to it at all. What does this mean, what do you do?',
            },
            a: {
              tr: "Bu bug muhtemelen otomasyon koşumundan değil manuel bir gözlemden ya da üretimden gelmiştir — izlenebilirlik zinciri yalnızca test kaynaklı bulgular için otomatik kurulur. Bunu elle kontrol eder, gerekiyorsa bug'ı hangi Test'in gelecekte bu senaryoyu KAPSAMASI gerektiğine bağlarım ki aynı sınıf hata bir dahaki sefere otomatik yakalansın — kapsam boşluğunu KAPATMAK, yalnızca bulguyu düzeltmekten daha kalıcı bir çözümdür.",
              en: 'This bug likely came from a manual observation or production, not an automation run -- the traceability chain is only built automatically for test-originated findings. I check it by hand and, if needed, link the bug to which Test should COVER this scenario going forward, so the same class of failure gets caught automatically next time -- CLOSING the coverage gap is a more lasting fix than just resolving the finding.',
            },
          },
          // ─── ADVANCED (14 ek soru) ────────────────────────────────────────
          {
            level: 'advanced',
            q: {
              tr: "Takım Data Center'dan Cloud'a geçiyor, mevcut otomasyon script'leri `/rest/api/2/` adresini kullanıyor. Geçiş planını nasıl kurarsın?",
              en: 'The team is migrating from Data Center to Cloud, and existing automation scripts use `/rest/api/2/`. How do you structure the migration plan?',
            },
            a: {
              tr: "Önce her script'in kullandığı uç noktaları envanterleyip Cloud'daki `/rest/api/3/` karşılıklarıyla eşleştiririm — bazı alan adları ve kimlik doğrulama yöntemi (API token) de değişir. Kritik olmayan bir script'i önce Cloud'a karşı test ortamında koşturup davranışı doğrularım, tüm script'leri aynı anda geçirmem. Bu, bir API'nin `v2`'den `v3`'e geçişini üretimde tek seferde değil, kanarya (canary) bir alt kümeyle doğrulayarak yapmakla aynı risk yönetimi.",
              en: "First I inventory every endpoint each script uses and map it to its Cloud `/rest/api/3/` counterpart -- some field names and the authentication method (API token) change too. I run a non-critical script against Cloud in a test environment first to verify behavior, rather than migrating all scripts at once. This is the same risk management as validating an API's v2-to-v3 migration with a canary subset in production instead of a single big-bang cutover.",
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "5 takımlı bir organizasyon var, her takım kendi issue tiplerini istiyor ama üst yönetim tek bir standart rapor istiyor. Nasıl bir mimari kurarsın?",
              en: 'A 5-team organization wants each team to have its own issue types, but upper management wants a single standardized report. How do you architect this?',
            },
            a: {
              tr: "Company-managed proje tipini kullanır, ORTAK bir issue tip şeması (Bug, Story, Task standart alanlarla) tanımlarım — bu tüm raporlamayı besler. Takımların özelleşme ihtiyacı için ek, takıma özel alanları (customfield) o takımın ekranına eklerim ama standart alanları ASLA silmem ya da yeniden adlandırmam. Bu, ortak bir arayüzü (standart alanlar) uygulayıp her sınıfın kendi ek metotlarını (özel alanlar) eklemesine izin vermekle aynı mimari fikir — Java'daki interface + implementasyon esnekliği.",
              en: 'I use the company-managed project type and define a SHARED issue type scheme (Bug, Story, Task with standard fields) -- this feeds all reporting. For teams\' customization needs, I add extra team-specific fields (customfields) to that team\'s screen, but I NEVER delete or rename the standard fields. This is the same architectural idea as implementing a shared interface while letting each class add its own extra methods -- the interface-plus-implementation flexibility from Java.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Bir CI pipeline'ı hem smart commit hem REST API kullanarak bug açıyor. İkisi arasında çakışma/duplicate riski nasıl doğar, nasıl önlersin?",
              en: 'A CI pipeline files bugs using both smart commit AND the REST API. How does the risk of conflict/duplication arise between the two, and how do you prevent it?',
            },
            a: {
              tr: "Risk, aynı hatanın hem developer'ın commit mesajındaki `#comment`'i hem CI'ın REST API çağrısındaki arama-önce mantığının FARKLI imza kriterleri kullanmasından doğar — biri commit mesajını, diğeri test adı+hata mesajını imza sayarsa aynı olay iki farklı \"yeni\" kayıt üretebilir. Çözüm, TEK bir imza standardını (örn. her zaman test sınıfı + hata tipi) her iki mekanizmaya da uygulamak ve ikisinin de yazdığı kayıtları AYNI özel alanla (örn. \"failure-signature\") etiketlemektir — tek bir kaynaktan gelen tutarlı bir anahtar, dağıtık iki yazıcının çakışmamasını sağlar.",
              en: 'The risk arises because the developer\'s commit-message `#comment` and CI\'s REST-API search-first logic might use DIFFERENT signature criteria -- if one treats the commit message as the signature and the other treats test-name-plus-error as the signature, the same event can produce two different "new" records. The fix is to apply ONE signature standard (e.g. always test class plus error type) to both mechanisms, and tag records written by either with the SAME custom field (e.g. "failure-signature") -- a consistent key from a single source keeps two distributed writers from colliding.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Eski bir projede iki yıllık test-requirement bağı hiç kurulmamış. Şimdi izlenebilirlik matrisi kurmak istiyorsun. Nasıl başlarsın?",
              en: 'An old project has two years of history with no test-requirement links ever built. You want to establish a traceability matrix now. How do you start?',
            },
            a: {
              tr: "Geriye dönük TAM bir bağ kurmaya çalışmam — iki yıllık geçmişi elle bağlamak orantısız bir efor olur ve çoğu değer kaybolmuştur. Bunun yerine BUGÜNDEN İTİBAREN disiplini başlatırım: yeni açılan her Story bir Test'e, her Test bir Test Execution'a bağlanır; eski, hâlâ aktif olan yüksek riskli modüller için SEÇİCİ olarak geriye dönük bağ kurarım. Bu, eski bir kod tabanına %100 test kapsamı hedeflemek yerine yeni kod için zorunlu kapsam kuralı koyup riskli eski modülleri kademeli kapsamakla aynı pragmatik yaklaşım.",
              en: "I do not try to build FULL retroactive links -- manually connecting two years of history is disproportionate effort and most of the value is already lost. Instead I start the discipline FROM TODAY ONWARD: every newly filed Story links to a Test, every Test to a Test Execution; for old, still-active high-risk modules I build retroactive links SELECTIVELY. This is the same pragmatic approach as not aiming for 100% test coverage on a legacy codebase, but mandating coverage for new code while covering risky legacy modules incrementally.",
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Bir takım metrik hedefi olarak \"sıfır reopen\" koydu. Bu neden tehlikelidir, alternatif olarak ne önerirsin?",
              en: 'A team set "zero reopens" as a metric target. Why is this dangerous, and what do you propose instead?',
            },
            a: {
              tr: "\"Sıfır reopen\" bir hedefe dönüştüğünde, doğrulayan kişi tartışmalı bir kaydı Reopened yapmak yerine sessizce Done bırakmaya YÖNLENDİRİLİR — hedef, ölçtüğü davranışı bozar (Goodhart yasası). Alternatif olarak reopen oranını izlemeye devam ederim ama HEDEF olarak değil, bir sinyal olarak; asıl performans hedefini takımın kontrol EDEBİLECEĞİ süreç iyileştirmelerine (kabul kriterinin netliği, ortam paritesi) bağlarım — sonuca değil, sonucu ÜRETEN sürece hedef koymak oyunlanmayı zorlaştırır.",
              en: 'Once "zero reopens" becomes a target, the verifier gets INCENTIVIZED to quietly leave a debatable record as Done instead of marking it Reopened -- the target distorts the very behavior it measures (Goodhart\'s law). Instead, I keep tracking the reopen rate but as a SIGNAL, not a target; I tie the actual performance target to process improvements the team CAN control (acceptance criterion clarity, environment parity) -- targeting the process that PRODUCES the outcome, not the outcome itself, makes gaming harder.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Bir regresyon entegrasyonu sürekli API rate limitine (dakikada 300 istek) takılıyor. Mimari çözümün ne olur?",
              en: 'A regression integration keeps hitting the API rate limit (300 requests per minute). What is your architectural solution?',
            },
            a: {
              tr: "Tek tek senkron çağrı yerine bir KUYRUK + toplu (batch) yazma mimarisi kurarım: koşum sonuçları önce yerel bir kuyrukta birikir, sonra `retry-after` başlığına saygı gösteren bir worker bunları kontrollü bir hızda Jira'ya gönderir. Bu, bir veritabanına satır satır INSERT atmak yerine toplu (bulk) insert kullanmakla aynı performans mantığıdır — istek sayısını azaltmak, hızı artırmaktan daha güvenilir bir çözümdür.",
              en: 'Instead of one-by-one synchronous calls, I build a QUEUE plus batched-write architecture: run results first accumulate in a local queue, then a worker that respects the `retry-after` header sends them to Jira at a controlled pace. This is the same performance logic as using bulk inserts into a database instead of inserting row by row -- reducing request count is a more reliable fix than trying to go faster.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Bir workflow'da \"Done\"a iki farklı yoldan ulaşılabiliyor — biri normal QA doğrulaması, diğeri bir developer kısayolu. Bunun raporlara etkisini ve düzeltmeyi anlat.",
              en: 'A workflow allows reaching "Done" via two different paths -- one the normal QA verification, the other a developer shortcut. Explain the impact on reports and the fix.',
            },
            a: {
              tr: "Kısayol geçişi resolution'ı QA doğrulaması olmadan set edebiliyorsa, \"Done + resolution=Fixed\" filtresine dayanan HER metrik (defect leakage, reopen rate) sessizce kirlenir — bazı kayıtlar hiç doğrulanmadan \"doğrulanmış\" gibi sayılır. Düzeltme, kısayol geçişini TAMAMEN kaldırmak ya da en azından resolution'ı OTOMATİK set etmesini engelleyip QA rolüne özel bir geçiş koşulu eklemektir. Bu, bir güvenlik açığını (yetkisiz bir arka kapı) kapatmakla aynı önceliktedir — veri kalitesi güvenlik kadar ciddiye alınmalıdır.",
              en: 'If the shortcut transition can set resolution without QA verification, EVERY metric relying on the "Done plus resolution=Fixed" filter (defect leakage, reopen rate) silently gets corrupted -- some records count as "verified" without ever being verified. The fix is to REMOVE the shortcut transition entirely, or at minimum prevent it from auto-setting resolution and add a QA-role-specific condition to the transition. This deserves the same priority as closing a security vulnerability (an unauthorized backdoor) -- data quality should be taken as seriously as security.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Zephyr'den Xray'e geçiş yapılacak, 500 mevcut test tanımı var. Geçiş stratejin ne olur?",
              en: 'A migration from Zephyr to Xray is planned, with 500 existing test definitions. What is your migration strategy?',
            },
            a: {
              tr: "Önce küçük, düşük riskli bir Test Set'i (örn. 20 test) pilot olarak taşır, alan eşlemesini (Precondition, adımlar, beklenen sonuç) doğrularım — büyük bir toplu taşıma tek seferde hata ayıklaması imkânsız bir kaos yaratır. Pilot başarılıysa geri kalanı gruplar hâlinde, her grup sonrası izlenebilirlik zincirinin (requirement bağları) BOZULMADIĞINI doğrulayarak taşırım. Bu, büyük bir veritabanı şema göçünü tek bir dev migration yerine geriye dönük uyumlu küçük adımlarla yapmakla aynı disiplin.",
              en: "First I migrate a small, low-risk Test Set (say 20 tests) as a pilot, verifying the field mapping (Precondition, steps, expected result) -- a single big-bang migration creates chaos that is impossible to debug. If the pilot succeeds, I migrate the rest in batches, verifying after each batch that the traceability chain (requirement links) is NOT broken. This is the same discipline as doing a large database schema migration in small, backward-compatible steps instead of one giant migration.",
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Organizasyon \"her metrik Jira'dan gelsin\" diyor ama kullanıcı memnuniyeti gibi bazı veriler Jira'da yok. Bu sınırı nasıl çizersin?",
              en: 'The organization says "every metric should come from Jira", but some data like customer satisfaction is not in Jira. How do you draw this boundary?',
            },
            a: {
              tr: "Jira'yı SÜREÇ verisinin (bug sayısı, cycle time, reopen oranı) tek kaynağı olarak tutarım ama SONUÇ verisini (kullanıcı memnuniyeti, gelir etkisi) başka sistemlerden (destek bileti aracı, analytics) çekip ayrı bir katmanda BİRLEŞTİRİRİM — Jira'ya zorla sığdırmak, bir aracın yapmadığı işi yapmasını istemek gibi kırılgan bir bağımlılık yaratır. Bu, tek bir veritabanının HER türlü veriyi tutmasını beklemek yerine, her sistemin kendi güçlü olduğu veriyi tutup bir raporlama katmanında birleştirilmesiyle aynı mimari ilke.",
              en: "I keep Jira as the single source for PROCESS data (bug count, cycle time, reopen rate) but pull OUTCOME data (customer satisfaction, revenue impact) from other systems (a support ticket tool, analytics) and MERGE it in a separate layer -- forcing it into Jira creates a fragile dependency, asking a tool to do a job it was not built for. This is the same architectural principle as not expecting a single database to hold every kind of data, but letting each system hold what it is strong at and merging them in a reporting layer.",
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "İzin şeması yıllar içinde karmaşıklaştı, kimin ne yapabildiği artık belirsiz. Nasıl bir denetim/temizlik süreci kurarsın?",
              en: 'The permission scheme has grown complex over the years, and who can do what is now unclear. What audit/cleanup process do you set up?',
            },
            a: {
              tr: "Önce mevcut şemayı rol × işlem matrisine dökerim (hangi rol hangi geçişi/alanı görebiliyor) — görselleştirmeden önce kimse tam resmi göremez. Sonra her kuralı \"bu kısıtlama HÂLÂ gerekli mi\" sorusuyla tek tek gözden geçiririm; kullanılmayan/artık anlamsız kuralları KALDIRIRIM, eklemem, çünkü karmaşıklık genelde birikmiş istisnalardan gelir. Bu, ölü kodu (kullanılmayan koşulları) düzenli olarak temizlemeyen bir kod tabanının zamanla okunamaz hâle gelmesiyle aynı bakım disiplini.",
              en: 'First I dump the current scheme into a role-by-action matrix (which role can see which transition/field) -- nobody can see the full picture before visualizing it. Then I review each rule one by one with the question "is this restriction STILL needed"; I REMOVE unused/now-meaningless rules rather than adding more, because complexity usually comes from accumulated exceptions. This is the same maintenance discipline as a codebase that never cleans up dead code (unused conditions) becoming unreadable over time.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Bir takım CI'da JQL sorgularını hardcoded tutuyor; proje anahtarı değişince her yerde kırılıyor. Nasıl bir mimari öneri sunarsın?",
              en: 'A team keeps JQL queries hardcoded in CI; when the project key changes, everything breaks. What architectural proposal do you make?',
            },
            a: {
              tr: "Proje anahtarı, ortam adı gibi değişebilir değerleri sorgudan AYIRIP merkezi bir konfigürasyon dosyasında/ortam değişkeninde tutar, sorguları bu değerleri parametre olarak ALACAK şekilde şablonlaştırırım. Bu, bir otomasyon test paketinde URL'yi her test dosyasına sabit yazmak yerine tek bir config'ten okumakla aynı DRY (Don't Repeat Yourself) ilkesidir — bir değer bir kez değişir, HER yerde otomatik güncellenir.",
              en: 'I SEPARATE values that can change, like the project key or environment name, from the query and keep them in a central config file/environment variable, templating the queries to TAKE these values as parameters. This is the same DRY (Don\'t Repeat Yourself) principle as reading the URL from a single config instead of hardcoding it into every test file in an automation suite -- a value changes once, and updates EVERYWHERE automatically.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Board'un WIP limiti sürekli aşılıyor ama takım \"biz zaten hızlı çalışıyoruz\" diyor. Veriyle nasıl ikna edersin?",
              en: 'The board\'s WIP limit is constantly exceeded, but the team says "we are already fast". How do you convince them with data?',
            },
            a: {
              tr: "Kontrol grafiğindeki cycle time TRENDİNİ gösteririm — \"hızlıyız\" algısı genelde bireysel kartlara bakmaktan gelir, ama trend genelde son haftalarda YAVAŞLADIĞINI gösterir. Ardından \"In QA\" sütununun WIP limiti aşım geçmişini bu trendle yan yana koyarım — korelasyon, algı yerine veri sunar. Bu, bir performans sorununu \"bence yavaş\" demek yerine profiling verisiyle (hangi metot ne kadar sürüyor) kanıtlamakla aynı disiplin.",
              en: 'I show the TREND of cycle time on the control chart -- the "we are fast" perception usually comes from looking at individual cards, but the trend usually shows SLOWING over recent weeks. Then I put the "In QA" column\'s WIP limit overflow history side by side with that trend -- correlation offers data instead of perception. This is the same discipline as proving a performance problem with profiling data (which method takes how long) instead of saying "I think it\'s slow".',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Bir güvenlik denetimi, birkaç API token'ının bir log dosyasında düz metin olarak sızdığını buldu. Acil ve kalıcı önlemlerin neler olur?",
              en: 'A security audit finds several API tokens leaked in plain text in a log file. What are your immediate and lasting measures?',
            },
            a: {
              tr: "Acil önlem: sızan token'ların TÜMÜNÜ derhal iptal edip yenilerini üretmek — şifreyi değiştirmeye gerek yok çünkü token ayrı bir kimlik parçasıdır, bu ayrımın tam olarak işe yaradığı andır. Kalıcı önlem: loglama katmanına Authorization başlığını veya token içeren alanları OTOMATİK maskeleyen bir filtre eklemek ve otomasyon kullanıcıları için minimal yetkili, ayrı hesaplar kullanmak ki bir sızıntının hasarı sınırlı kalsın. Bu, bir stack trace'in şifreleri asla loglamaması gerektiğiyle aynı güvenlik disiplini — hassas veri, hata ayıklama kolaylığından daha önceliklidir.",
              en: 'Immediate measure: revoke ALL leaked tokens immediately and generate new ones -- no need to change the password, because the token is a separate credential, this is exactly the moment that separation pays off. Lasting measure: add a filter to the logging layer that AUTOMATICALLY masks the Authorization header or token-bearing fields, and use minimally privileged, separate accounts for automation users so a leak\'s damage stays limited. This is the same security discipline as a stack trace never logging passwords -- sensitive data takes priority over debugging convenience.',
            },
          },
          {
            level: 'advanced',
            q: {
              tr: "Şirket genelinde \"kaç bug bulundu\" yerine daha sağlıklı bir kalite skoru tasarlaman isteniyor. Nasıl bir composite metrik kurarsın?",
              en: 'You are asked to design a healthier quality score for the whole company, instead of "how many bugs were found". How do you build a composite metric?',
            },
            a: {
              tr: "Tek bir sayı yerine üç bileşenli bir skor kurarım: defect leakage (üretime sızma oranı — kaçırdıklarımız), reopen rate (düzeltme kalitesi) ve doğrulama bekleme süresi (akış sağlığı). Her bileşeni AYRI AYRI gösterir, tek bir birleştirilmiş sayıya indirmem — birleştirme, hangi bileşenin kötü gittiğini gizler ve oyunlanmayı kolaylaştırır. Bu, bir test paketinin sağlığını tek bir \"başarı yüzdesi\" yerine kapsam, flaky oranı ve çalışma süresi gibi ayrı göstergelerle izlemekle aynı ilke — şeffaflık, tek bir sayının rahatlığından daha değerlidir.",
              en: 'Instead of a single number, I build a three-component score: defect leakage (production leak rate -- what we miss), reopen rate (fix quality) and verification wait time (flow health). I show each component SEPARATELY, never collapsing them into one combined number -- combining hides which component is going badly and makes gaming easier. This is the same principle as monitoring a test suite\'s health through separate indicators like coverage, flaky rate and run time instead of a single "success percentage" -- transparency is worth more than the comfort of one number.',
            },
          },
        ],
      },
    ],
  },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
// hero.title TR ve EN'de AYNI olmalı: ustalık/ilerleme anahtarları bu başlıktan
// türetilir, dile göre değişirse ilerleme iki ayrı anahtara bölünür.
const trHero = {
  title: '📋 Jira',
  subtitle: 'QA için İş Takibi, Bug Yönetimi ve İzlenebilirlik',
  intro: "Jira, bir QA mühendisinin gününü geçirdiği yerdir: bug burada kaydedilir, önceliklendirilir, doğrulanır ve ölçülür. Bu sayfada bir bug'ın kayıttan kalite metriğine uzanan tüm yolculuğunu; iyi bir rapor yazmayı, workflow ve izinleri, JQL ile sorgulamayı, Scrum/Kanban panolarını, test yönetimi eklentilerini, CI/CD entegrasyonunu ve REST API ile otomasyonu tek bir örnek uygulama (ShopQA) üzerinden öğreneceksin.",
}

const enHero = {
  title: '📋 Jira',
  subtitle: 'Issue Tracking, Bug Management and Traceability for QA',
  intro: 'Jira is where a QA engineer spends the day: bugs are recorded, prioritized, verified and measured here. On this page you will follow a bug\'s whole journey from record to quality metric -- writing a strong report, workflows and permissions, querying with JQL, Scrum and Kanban boards, test management add-ons, CI/CD integration and automation through the REST API -- all on one running example, ShopQA.',
}

const trTabs = sections.map((section) => section.title.tr)
const enTabs = sections.map((section) => section.title.en)

// ─── Export ───────────────────────────────────────────────────────────────────
export const jiraData = {
  tr: { hero: trHero, tabs: trTabs, sections },
  en: { hero: enHero, tabs: enTabs, sections },
}

// ─── Feynman checkpoint'leri ──────────────────────────────────────────────────
const jiraFeynmanDefs = [
  {
    sectionIndex: 0,
    promptTr: "Bir bug'ı Jira'ya kaydetmenin, developer'a sözlü söylemekten farkını, sektöre yeni giren birine kendi cümlelerinle anlat. Kaydın üç ay sonra ne işe yaradığını mutlaka söyle.",
    promptEn: 'Explain in your own words, to a newcomer, how recording a bug in Jira differs from telling the developer verbally. Be sure to say what the record is good for three months later.',
    keywords: [['kayit', 'kayıt', 'record', 'issue'], ['anahtar', 'key', 'shop-142'], ['hafiza', 'hafıza', 'memory', 'hatirla', 'hatırla'], ['izlenebilir', 'traceab', 'commit', 'bag', 'bağ'], ['olcum', 'ölçüm', 'metrik', 'metric', 'rapor']],
    minScore: 3,
    modelAnswerTr: "Sözlü anlatım bugünü çözer: developer hatayı duyar ve düzeltir. Kayıt ise yarını çözer. Issue açıldığında bug kalıcı bir anahtar alır (SHOP-142) ve bu anahtar commit mesajında, test raporunda ve panoda aynı şeyi işaret eder. Üç ay sonra aynı hata geri geldiğinde kayıt sana hangi ortamda çıktığını, hangi adımlarla üretildiğini ve o zaman nasıl düzeltildiğini verir — yani regresyon testini neye göre yazacağını. Ayrıca kapanan her kayıt bir veri noktasıdır: hangi modülün bug ürettiği ve hangi bug'ların yeniden açıldığı ancak kayıt varsa ölçülebilir.",
    modelAnswerEn: 'Telling someone solves today: the developer hears the failure and fixes it. A record solves tomorrow. When an issue is created the bug receives a permanent key (SHOP-142) and that key points to the same thing in a commit message, a test report and the board. Three months later, when the same failure returns, the record tells you in which environment it appeared, through which steps it was produced and how it was fixed back then -- that is, what to base your regression test on. Every closed record is also a data point: which module produces bugs and which bugs get reopened can only be measured if the record exists.',
  },
  {
    sectionIndex: 3,
    promptTr: 'Severity ile priority arasındaki farkı ve "beklenen sonuç" alanının niçin ayrı yazıldığını, teknik jargona boğulmadan kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words and without drowning in jargon, the difference between severity and priority and why the "expected result" field is written separately.',
    keywords: [['severity', 'teknik', 'etki', 'impact'], ['priority', 'oncelik', 'öncelik', 'ne zaman', 'when'], ['farkli', 'farklı', 'ayri', 'ayrı', 'different'], ['beklenen', 'expected'], ['tartisma', 'tartışma', 'debate', 'kabul kriteri', 'acceptance']],
    minScore: 3,
    modelAnswerTr: "Severity sistemin ne kadar bozulduğunu anlatır: veri kaybı var mı, kullanıcı işini yapabiliyor mu. Priority ise takvim kararıdır: bu iş ne zaman yapılacak. İkisi farklı eksen olduğu için farklı kişiler karar verir ve bir bug düşük severity ile yüksek priority taşıyabilir — ana sayfada yanlış yazılmış bir marka adı hiçbir işlevi bozmaz ama saatlerce yayında kalamaz. Beklenen sonucun ayrı yazılmasının sebebi ise tartışmayı baştan kapatmaktır: beklenen davranış yazılmazsa konu \"bu bir bug mı yoksa istenen davranış mı\" noktasında tıkanır. Beklenen sonucu bir kabul kriterine bağlamak bu belirsizliği tamamen kaldırır.",
    modelAnswerEn: 'Severity describes how badly the system is broken: is data lost, can the user do their job. Priority is a calendar decision: when will this be worked on. Because they are different axes, different people decide them, and a bug can carry low severity with high priority -- a misspelled brand name on the homepage breaks no function yet cannot stay live for hours. The expected result is written separately in order to close a debate before it starts: without it, the discussion stalls on "is this a bug or intended behavior". Tying the expected result to an acceptance criterion removes that ambiguity entirely.',
  },
]

fillMissingFeynman(jiraData, jiraFeynmanDefs)
