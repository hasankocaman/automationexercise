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
    tr: `-- SHOP projesindeki, sana atanmış, henüz kapanmamış bug'ları listele.
-- İpucu: kendi kullanıcını sabit yazma; her ekip üyesinde çalışsın.
project = SHOP`,
    en: `-- List the bugs in the SHOP project that are assigned to you and not yet closed.
-- Hint: do not hardcode your own user; it should work for every teammate.
project = SHOP`,
  },
  solutionCode: {
    tr: `-- Dört koşul zincirlenir; currentUser() sorguyu kişiye göre kendi çözer
project = SHOP AND issuetype = Bug AND status != Done AND assignee = currentUser() ORDER BY priority DESC`,
    en: `-- Four conditions are chained; currentUser() resolves the query per person
project = SHOP AND issuetype = Bug AND status != Done AND assignee = currentUser() ORDER BY priority DESC`,
  },
  hint: {
    tr: 'Dört parça gerekiyor: hangi proje, hangi issue tipi, hangi durumda OLMAYAN ve kime atanmış. Kullanıcı adını elle yazarsan sorgu yalnızca sende çalışır — Jira bunun için bir fonksiyon sunar. Sonuçların anlamlı sıralanması için ORDER BY ekle.',
    en: 'Four parts are needed: which project, which issue type, which status it is NOT in, and who it is assigned to. If you type a username by hand the query only works for you -- Jira offers a function for this. Add ORDER BY so the results come out in a meaningful order.',
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
    tr: 'Doğru! Süre ve "planlanmış mı, keşfedilmiş mi" sorusu dört tipi birbirinden ayırır. Bu ayrımı yanlış yapmak salt bir etiketleme hatası değildir — §C1\'deki filmde gördüğün gibi, "bu sprintte kaç bug çıktı" gibi bir metrik yanlış issue tipiyle sessizce bozulur.',
    en: 'Correct! Duration and the question "was this planned, or discovered" separate the four types. Getting this wrong is not just a labeling mistake -- as the film in C1 showed, a metric like "how many bugs came out of this sprint" is silently corrupted by the wrong issue type.',
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
      { tr: "Link eksikse §A4'teki izlenebilirlik zinciri kopar", en: 'A missing link breaks the traceability chain from A4' },
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
          tr: "Kayıt tutmanın ilk somut karşılığı arama yapabilmektir. Jira'nın kendi sorgu dili JQL, panoya bakarak asla göremeyeceğin soruları cevaplar: \"bana atanmış, henüz kapanmamış bug'lar hangileri?\" gibi. Aşağıdaki alanda bu sorguyu kendin yaz — JQL'in tamamını ilerideki sekmede detaylı işleyeceğiz, burada yalnızca bir kaydın neye dönüştüğünü görmen yeterli.",
          en: 'The first concrete payoff of keeping records is being able to search. Jira\'s own query language, JQL, answers questions a board can never show you: things like "which open bugs are assigned to me?". Write that query yourself below -- we cover JQL in depth in a later tab; here it is enough to see what a record turns into.',
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
          tr: "Bu karar, §A3'teki Cloud/Data Center farkından bağımsız bir eksendir — her iki sürümde de proje tipi seçimi yapılır (Data Center yalnızca company-managed sunar). Aşağıdaki tablo iki tipi dört boyutta karşılaştırıyor.",
          en: "This decision is an axis independent of the Cloud/Data Center difference from A3 -- both editions require a project-type choice (Data Center only offers company-managed). The table below compares the two types across four dimensions.",
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
          tr: "Bug, hiyerarşinin bir parçası olmasa da tam teşekküllü bir issue tipidir — kendi alanları ve kendi ekranı vardır. §D'de detaylandıracağımız Severity, Ortam ve Tekrar Üretim Adımları gibi alanlar bir Story'de ANLAMSIZDIR, bir Bug'da ZORUNLUDUR. Aşağıdaki tablo dört issue tipinin kendine özgü alanlarını karşılaştırıyor.",
          en: "Even though it is not part of the hierarchy, Bug is a fully-fledged issue type -- it has its own fields and its own screen. Fields we detail in D like Severity, Environment and Reproduction Steps are MEANINGLESS on a Story, and MANDATORY on a Bug. The table below compares the fields specific to four issue types.",
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
            tr: 'Link eksikse iki kayıt bağımsız gibi görünür ve raporlarda ayrı ayrı sayılır — §K\'daki metrikler için bu doğrudan bir bozulma kaynağıdır.',
            en: 'Without the link the two records look independent and are counted separately in reports -- for the metrics in K this is a direct source of distortion.',
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
      {
        type: 'heading',
        text: { tr: '⚖️ Severity ve Priority: Aynı Şey Değil', en: '⚖️ Severity and Priority Are Not the Same Thing' },
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
        type: 'heading',
        text: { tr: '🛠️ Kötü Rapordan İyi Rapora', en: '🛠️ From a Bad Report to a Good One' },
      },
      bugReportRepairSteps,
      bugReportPlayground,
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
      {
        type: 'heading',
        text: { tr: '🧱 JQL Anatomisi', en: '🧱 The Anatomy of JQL' },
      },
      {
        type: 'text',
        content: {
          tr: "Bir JQL sorgusu dört parçadan oluşur: ALAN (project, status, assignee), OPERATÖR (=, !=, IN, ~, WAS, CHANGED), DEĞER ve isteğe bağlı SIRALAMA (ORDER BY). Koşullar AND / OR ile zincirlenir. Aşağıdaki örnek bir QA'in günlük olarak kullandığı üç sorguyu gösteriyor — anahtar kelimeler dilin kendi sözdizimidir ve Türkçe sayfada da İngilizce kalır; değişen yalnızca açıklamalardır.",
          en: 'A JQL query has four parts: FIELD (project, status, assignee), OPERATOR (=, !=, IN, ~, WAS, CHANGED), VALUE and an optional ORDERING (ORDER BY). Conditions are chained with AND / OR. The example below shows three queries a QA engineer uses daily -- the keywords are the language\'s own syntax and stay English even on a Turkish page; only the explanations change.',
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
      },
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
        ],
      },
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
