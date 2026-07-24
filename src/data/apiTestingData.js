// ─── API Testing — Geliştiriciden Test Otomasyonuna ──────────────────────────
// TEK AĞAÇLI veri dosyası (gaugeData.js deseni): `sections` iki dile de AYNI
// referansla verilir, tüm metin alanları { tr, en }. video-scene/interaktif
// bloklar section'a inline konur (tek ağaç = tek yer, bkz. CLAUDE.md §9.5).
// Kardeş dosya: src/data/gaugeData.js
//
// Omurga: TEK örnek API — /api/v1/bugs (Bug Tracker). Aynı model/endpoint Java,
// Express, NestJS, Swagger, Postman, REST Assured, Playwright boyunca takip edilir.
// Model: { id, title(3-120), severity(LOW/MEDIUM/HIGH/CRITICAL),
//          status(OPEN/IN_PROGRESS/CLOSED), reporter(email), createdAt(ISO-8601) }
// İmza özelliği: her geliştirme adımından sonra "🐞 Defect Doğum Anı" simple-box.
//
// FAZ DURUMU: Faz 1 iskelet ✅ · Faz 2 GRUP A ✅ (Opus) · Faz 3 GRUP B (Opus) ·
// Faz 4-9 GRUP C-K → Sonnet (bkz. Documents/api-testing-page-plan.md §C/§D).
import { fillMissingCodeTrios, fillMissingFeynman } from './interactiveTrioFillers.js'

// ─── İskelet yardımcı: henüz yazılmamış atomik konu → placeholder section ─────
// def: [id, emoji, trTitle, enTitle]. İlgili fazda tam içerikle değiştirilir.
function mk([id, emoji, trTitle, enTitle]) {
  return {
    title: { tr: `${emoji} ${id} · ${trTitle}`, en: `${emoji} ${id} · ${enTitle}` },
    blocks: [
      {
        type: 'simple-box',
        emoji,
        content: {
          tr: `**${trTitle}** — bu konu \`/api/v1/bugs\` örneği üzerinden anlatılacak. (İçerik ilgili fazda eklenecek: 4 katmanlı analoji + film + animasyon + sandbox.)`,
          en: `**${enTitle}** — this topic will be taught through the \`/api/v1/bugs\` example. (Content added in its phase: 4-layer analogy + film + animation + sandbox.)`,
        },
      },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP A — TEMELLER (API'yi hiç görmemiş tester için) — KODSUZ konu şablonu
// Sandbox'lar "seç / tamamla / eşleştir" modunda (code-playground metin karşıl.)
// ═══════════════════════════════════════════════════════════════════════════

const A1 = {
  title: { tr: '🌐 A1 · API Nedir? — İstemci, Sunucu, Sözleşme', en: '🌐 A1 · What Is an API? — Client, Server, Contract' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🌐',
      content: {
        tr: 'Bir API, restoranın **mutfak penceresi** gibidir: sen (istemci) salonda oturursun, mutfağa (sunucu) doğrudan giremezsin — arada bir pencere (API) ve bir **menü** (sözleşme/contract) vardır. Menüde ne isteyebileceğin (`GET /bugs`), ne göndermen gerektiği (bir `title` zorunlu) ve karşılığında ne alacağın (bir JSON kaydı) yazar. Peki madem veriyi doğrudan veritabanından okuyabiliriz, neden araya bir API koyma zahmetine giriyoruz? Çünkü mutfağın iç düzeni (tablo isimleri, indeksler, iş kuralları) müşteriyi ilgilendirmez ve her değiştiğinde salonun çökmemesi gerekir — API bu **kararlı sözleşmeyi** garanti eder. Java\'da bunun karşılığı bir `interface`\'tir: çağıran taraf yalnızca metot imzasını bilir, `implementation`\'ın içini bilmez; sınıfın içi değişse de `interface` aynı kaldıkça çağıran kod kırılmaz. QA açısından kritik nokta şudur: tester olarak sen bu **sözleşmeyi** test edersin, mutfağın içini değil — ve sözleşme sessizce değiştiğinde (bir alan adı `title`\'dan `name`\'e döndüğünde) mobil uygulama production\'da çöker ama UI hâlâ çalışıyor görünür; işte o sessiz kırılmayı yakalamak senin işin.',
        en: 'An API is like a restaurant\'s **kitchen window**: you (the client) sit in the dining room and cannot walk into the kitchen (the server) directly — between them sits a window (the API) and a **menu** (the contract). The menu states what you can order (`GET /bugs`), what you must send (a `title` is required), and what you get back (a JSON record). But if we can read the data straight from the database, why bother putting an API in between? Because the kitchen\'s internals (table names, indexes, business rules) are none of the customer\'s concern and must be free to change without the dining room collapsing — the API guarantees that **stable contract**. In Java the equivalent is an `interface`: the caller knows only the method signature, not the `implementation`; the class internals can change and, as long as the `interface` stays the same, calling code does not break. The critical QA point: as a tester you test this **contract**, not the kitchen internals — and when the contract silently changes (a field renamed from `title` to `name`), the mobile app breaks in production while the UI still looks fine; catching that silent break is your job.',
      },
    },
    { type: 'heading', text: { tr: 'İstemci, Sunucu ve Sözleşme', en: 'Client, Server, and Contract' } },
    {
      type: 'text',
      content: {
        tr: 'Bu sayfa boyunca tek bir örnek API kullanacağız: **`/api/v1/bugs` — Bug Tracker**. Tester\'ın kendi dünyası olduğu için öğrenme yükü sıfır. İstemci (Postman, tarayıcı, mobil uygulama, test kodu) bir **istek** gönderir; sunucu (Java/Spring, Express veya NestJS ile yazacağımız uygulama) **sözleşmeye** göre bir **yanıt** döner. Sözleşme = hangi yolun (`/api/v1/bugs`) hangi metodu (GET/POST/...) kabul ettiği, hangi alanların zorunlu olduğu ve yanıtın şekli. Sözleşmeyi ileride Swagger/OpenAPI ile makine-okunur hale getireceğiz (GRUP F).',
        en: 'Throughout this page we use a single example API: **`/api/v1/bugs` — Bug Tracker**. Being the tester\'s own world, its learning cost is zero. A client (Postman, a browser, a mobile app, test code) sends a **request**; the server (the app we\'ll write in Java/Spring, Express, or NestJS) returns a **response** according to the **contract**. The contract = which path (`/api/v1/bugs`) accepts which method (GET/POST/...), which fields are required, and the shape of the response. Later we\'ll make the contract machine-readable with Swagger/OpenAPI (GROUP F).',
      },
    },
    {
      type: 'grid', cols: 3,
      items: [
        { icon: '🧑‍💻', label: { tr: 'İstemci (Client)', en: 'Client' }, desc: { tr: 'İsteği başlatan taraf: Postman, tarayıcı, mobil uygulama veya test kodu.', en: 'The side initiating the request: Postman, browser, mobile app, or test code.' } },
        { icon: '🖥️', label: { tr: 'Sunucu (Server)', en: 'Server' }, desc: { tr: 'İsteği işleyip yanıt üreten uygulama: bizim /api/v1/bugs servisimiz.', en: 'The app that processes the request and produces a response: our /api/v1/bugs service.' } },
        { icon: '📜', label: { tr: 'Sözleşme (Contract)', en: 'Contract' }, desc: { tr: 'Kuralların tanımı: yol, metod, zorunlu alanlar, yanıt şekli. Test ettiğin şey budur.', en: 'The rules: path, method, required fields, response shape. This is what you test.' } },
      ],
    },
    {
      type: 'video-scene',
      id: 'api-a1-request-journey-film',
      title: { tr: '🎬 Bir İsteğin Yolculuğu: İstemciden Sunucuya ve Geri', en: '🎬 The Journey of a Request: From Client to Server and Back' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'client', emoji: '🧑‍💻', label: { tr: 'İstemci (Tester)', en: 'Client (Tester)' }, color: '#0ea5e9' },
        { id: 'request', emoji: '📤', label: { tr: 'HTTP İsteği', en: 'HTTP Request' }, color: '#f59e0b' },
        { id: 'contract', emoji: '📜', label: { tr: 'Sözleşme', en: 'Contract' }, color: '#a78bfa' },
        { id: 'server', emoji: '🖥️', label: { tr: 'API Sunucusu', en: 'API Server' }, color: '#8b5cf6' },
        { id: 'response', emoji: '📥', label: { tr: 'JSON Yanıt', en: 'JSON Response' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir tester olarak `GET /api/v1/bugs` istemek istiyorsun — ama bu istek sunucuya varana kadar hangi duraklardan geçer?', en: 'As a tester you want to request `GET /api/v1/bugs` — but which stops does this request pass through before it reaches the server?' },
          positions: { client: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Adım 1 — İstemci, method + yol + header\'ları gerçek bir HTTP isteğine paketler. Sunucunun iç yapısını (Java mı Express mi) BİLMEZ; sadece sözleşmeyi bilir.', en: 'Step 1 — The client packs method + path + headers into a real HTTP request. It does NOT know the server internals (Java or Express); it only knows the contract.' },
          code: { tr: 'GET /api/v1/bugs\nAccept: application/json', en: 'GET /api/v1/bugs\nAccept: application/json' },
          positions: { client: { x: 20, y: 40 }, request: { x: 55, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'client', to: 'request', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Adım 2 — İstek önce SÖZLEŞMEYE çarpar: yol tanımlı mı, metod destekleniyor mu? Sözleşme bir kapı bekçisi gibidir — uymayan istek daha sunucuya varmadan reddedilebilir.', en: 'Step 2 — The request first hits the CONTRACT: is the path defined, is the method supported? The contract is a gatekeeper — a non-conforming request can be rejected before it even reaches the server.' },
          positions: { request: { x: 22, y: 40 }, contract: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'request', to: 'contract', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Adım 3 — Sözleşmeye uyan istek sunucuya ulaşır, sunucu bug listesini hazırlar ve JSON\'a çevirir.', en: 'Step 3 — A conforming request reaches the server, which prepares the bug list and serializes it to JSON.' },
          positions: { contract: { x: 22, y: 40, opacity: 0.6 }, server: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'contract', to: 'server', color: '#8b5cf6' }],
        },
        {
          caption: { tr: 'Ders — İstemci ve sunucu birbirinin içini bilmez, aralarındaki tek bağ sözleşmedir. Tester olarak sen bu sözleşmeyi test edersin: yanıt söz verilen şekle uyuyor mu?', en: 'The lesson — Client and server do not know each other\'s internals; their only bond is the contract. As a tester you test that contract: does the response match the promised shape?' },
          positions: { server: { x: 35, y: 50 }, response: { x: 65, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'server', to: 'response', color: '#22c55e' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'İstemci–Sunucu–Sözleşme: Zincir Nasıl İşler?', en: 'Client–Server–Contract: How the Chain Works' },
      steps: [
        { id: 1, icon: '🧑‍💻', label: { tr: 'İstemci isteği başlatır…', en: 'Client starts the request…' }, detail: { tr: 'İstemci (Postman/test kodu) method + yol + gövdeyi hazırlar. Sunucunun dilini/mimarisini bilmesi GEREKMEZ.', en: 'The client (Postman/test code) prepares method + path + body. It does NOT need to know the server\'s language/architecture.' } },
        { id: 2, icon: '📜', label: { tr: 'Sözleşme kapıyı tutar…', en: 'Contract holds the gate…' }, detail: { tr: 'Yol/metod/zorunlu alanlar sözleşmeye uyuyor mu? Uymuyorsa istek 4xx ile reddedilir — bu bir hata değil, sözleşmenin çalışmasıdır.', en: 'Do path/method/required fields match the contract? If not, the request is rejected with 4xx — that is not a failure, it is the contract working.' } },
        { id: 3, icon: '📥', label: { tr: 'Sunucu sözleşmeye göre yanıtlar…', en: 'Server responds per contract…' }, detail: { tr: 'Sunucu işi yapar ve söz verilen şekilde (status + JSON) döner. Tester bu şekli doğrular — mutfağın içini değil.', en: 'The server does the work and returns in the promised shape (status + JSON). The tester verifies that shape — not the kitchen internals.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a1-order-01',
      question: { tr: 'Bir API isteğinin istemciden yanıta kadar geçtiği sırayı diz.', en: 'Order the stages an API request passes through from client to response.' },
      items: [
        { id: '1', text: { tr: 'İstemci method + yol + header/gövdeyi HTTP isteğine paketler', en: 'Client packs method + path + headers/body into an HTTP request' }, order: 1 },
        { id: '2', text: { tr: 'İstek sözleşmeye çarpar: yol/metod tanımlı mı?', en: 'Request hits the contract: is the path/method defined?' }, order: 2 },
        { id: '3', text: { tr: 'Sunucu isteği işler ve veriyi hazırlar', en: 'Server processes the request and prepares the data' }, order: 3 },
        { id: '4', text: { tr: 'Sunucu status kodu + JSON gövdeyle yanıt döner', en: 'Server returns a status code + JSON body response' }, order: 4 },
        { id: '5', text: { tr: 'İstemci yanıtı okur; tester şekli/sözleşmeyi doğrular', en: 'Client reads the response; tester verifies the shape/contract' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a1-what-is-api',
      id: 'api-a1-what-is-api',
      title: { tr: 'Kendin Dene: Sözleşmenin Zorunlu Alanını Tamamla', en: 'Try It Yourself: Complete the Contract\'s Required Field' },
      starterCode: `// Bug Tracker sözleşmesi: yeni bug oluşturma isteği
// TODO: sözleşmeye göre ZORUNLU olan alanı ekle (ipucuna bak)
POST /api/v1/bugs
{
  "severity": "HIGH"
}`,
      solutionCode: `// title 3-120 karakter ZORUNLUDUR — sözleşmenin çekirdeği
POST /api/v1/bugs
{
  "title": "Login butonu 500 donuyor",
  "severity": "HIGH"
}`,
      hint: { tr: 'Bug Tracker modelinde `title` (3-120 karakter) zorunludur; onsuz sunucu 400 dönmelidir. `severity` tek başına yeterli değildir — sözleşme neyi zorunlu kılıyorsa onu göndermelisin.', en: 'In the Bug Tracker model `title` (3-120 chars) is required; without it the server should return 400. `severity` alone is not enough — you must send whatever the contract makes mandatory.' },
      successMessage: { tr: 'Doğru! Sözleşmenin zorunlu alanını göndermezsen sunucu isteği reddeder — tester olarak bu kuralı ISTEDEN test edersin.', en: 'Correct! Omit a required field and the server rejects the request — as a tester you deliberately test this rule.' },
    },
    {
      type: 'quiz',
      question: { tr: 'API\'yi "istemci ile sunucu arasındaki sözleşme" olarak tanımlarsak, tester olarak asıl test ettiğin şey nedir?', en: 'If we define an API as "the contract between client and server", what do you as a tester actually test?' },
      options: [
        { id: 'a', text: { tr: 'Sunucunun veritabanı tablo isimleri ve indeksleri', en: 'The server\'s database table names and indexes' } },
        { id: 'b', text: { tr: 'Sözleşme: yolun, metodun, zorunlu alanların ve yanıt şeklinin söz verildiği gibi davranması', en: 'The contract: that the path, method, required fields, and response shape behave as promised' } },
        { id: 'c', text: { tr: 'Sunucunun hangi programlama diliyle yazıldığı', en: 'Which programming language the server is written in' } },
        { id: 'd', text: { tr: 'Sadece UI\'daki butonların rengi', en: 'Only the color of the buttons in the UI' } },
      ],
      correct: 'b',
      explanation: { tr: 'Tester sözleşmeyi test eder: aynı sözleşme Java, Express veya NestJS ile karşılanabilir — mutfağın içi değişse de test aynı kalır. İç detaylar (tablo, dil) sözleşmenin parçası değildir.', en: 'The tester tests the contract: the same contract can be fulfilled by Java, Express, or NestJS — the test stays the same even if the kitchen changes. Internals (tables, language) are not part of the contract.' },
      retryQuestion: {
        question: { tr: 'Bir geliştirici yanıttaki `title` alanını sessizce `name` olarak değiştirdi. UI hâlâ çalışıyor ama mobil uygulama çöktü. Bu neyin kırılmasıdır?', en: 'A developer silently renamed the response field `title` to `name`. The UI still works but the mobile app crashed. What broke?' },
        options: [
          { id: 'a', text: { tr: 'Veritabanı bağlantısı', en: 'The database connection' } },
          { id: 'b', text: { tr: 'Sözleşme (contract) — istemcilerin güvendiği alan adı değişti', en: 'The contract — the field name clients relied on changed' } },
          { id: 'c', text: { tr: 'Sunucunun işletim sistemi', en: 'The server\'s operating system' } },
          { id: 'd', text: { tr: 'Hiçbir şey, 200 döndüğü için sorun yok', en: 'Nothing, since it returns 200 there is no problem' } },
        ],
        correct: 'b',
        explanation: { tr: 'Alan adı sözleşmenin parçasıdır. `title`→`name` sessiz bir contract kırılmasıdır: 200 döner ama istemciler beklediği alanı bulamaz. Bunu UI yakalamaz (kendi kodu güncellenmiştir), ama farklı bir istemci (mobil) çöker — tester\'ın API seviyesinde yakalaması gereken tam da budur.', en: 'The field name is part of the contract. `title`→`name` is a silent contract break: it returns 200 but clients cannot find the expected field. The UI won\'t catch it (its own code was updated), but a different client (mobile) crashes — exactly what the tester must catch at the API level.' },
      },
    },
  ],
}

const A2 = {
  title: { tr: '📤 A2 · HTTP Request Anatomisi', en: '📤 A2 · HTTP Request Anatomy' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📤',
      content: {
        tr: 'Bir HTTP isteği, **kargo gönderisine** benzer: bir **eylem etiketi** (method — al/gönder/sil), bir **adres** (URL — kime), **gönderi notları** (header\'lar — nasıl paketlensin, kim gönderiyor) ve varsa **kutunun içindeki paket** (body — taşınan veri). Peki adresi zaten yazdıysak, neden ayrıca method\'a ihtiyaç var? Çünkü aynı adrese (`/api/v1/bugs`) hem "listeyi getir" (GET) hem "yeni ekle" (POST) diyebilirsin — adres NEREYE, method ise NE YAPILACAĞINI söyler. Java\'da bunun karşılığı bir metot çağrısıdır: URL nesnenin adı, method çağırdığın fonksiyon, header\'lar `@RequestHeader`, body ise `@RequestBody` parametresidir. QA açısından önemi: bir bug\'ın kaynağı çoğu zaman body\'de değil, gözden kaçan bir header\'dadır — `Content-Type: application/json` göndermezsen sunucu JSON\'ı ayrıştıramaz ve body\'yi boş sanır; istek "gönderildi" ama sunucu "boş kutu aldım" der. Bu, testerların en sık düştüğü sessiz tuzaklardan biridir.',
        en: 'An HTTP request is like a **shipping parcel**: an **action label** (method — fetch/send/delete), an **address** (URL — to whom), **shipping notes** (headers — how to pack it, who is sending), and, when present, the **package inside the box** (body — the data being carried). But if we already wrote the address, why also need a method? Because to the same address (`/api/v1/bugs`) you can say both "fetch the list" (GET) and "add a new one" (POST) — the address says WHERE, the method says WHAT TO DO. In Java the equivalent is a method call: the URL is the object\'s name, the method is the function you call, headers are `@RequestHeader`, and the body is the `@RequestBody` parameter. Its QA importance: a bug\'s source is often not in the body but in an overlooked header — omit `Content-Type: application/json` and the server cannot parse the JSON and treats the body as empty; the request was "sent" but the server says "I received an empty box." This is one of the silent traps testers fall into most.',
      },
    },
    { type: 'heading', text: { tr: 'Bir İsteğin Dört Parçası', en: 'The Four Parts of a Request' } },
    {
      type: 'table',
      headers: ['Parça / Part', 'Ne işe yarar / Purpose', 'Örnek / Example'],
      rows: [
        ['Method', 'Ne yapılacak (fiil) / What to do (verb)', 'POST'],
        ['URL', 'Nereye / Where', '/api/v1/bugs'],
        ['Header', 'İsteğin meta bilgisi / Request metadata', 'Content-Type: application/json'],
        ['Body', 'Taşınan veri (yalnız POST/PUT/PATCH) / Carried data (POST/PUT/PATCH only)', '{ "title": "..." }'],
      ],
    },
    {
      type: 'code',
      language: 'http',
      code: {
        tr: `POST /api/v1/bugs           # method + yol (URL): NE + NEREYE
Host: api.learnqa.dev       # hangi sunucu
Content-Type: application/json   # govde JSON — sunucu boyle ayristirir
Accept: application/json    # yanit JSON istiyorum
Authorization: Bearer <token>    # kimligim (varsa)

{
  "title": "Odeme ekrani 500 donuyor",
  "severity": "CRITICAL"
}`,
        en: `POST /api/v1/bugs           # method + path (URL): WHAT + WHERE
Host: api.learnqa.dev       # which server
Content-Type: application/json   # body is JSON — server parses it this way
Accept: application/json    # I want JSON back
Authorization: Bearer <token>    # my identity (if any)

{
  "title": "Payment screen returns 500",
  "severity": "CRITICAL"
}`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-a2-request-anatomy-film',
      title: { tr: '🎬 Bir İsteğin Dört Parçası: Kargo Kutusu Açılıyor', en: '🎬 The Four Parts of a Request: Opening the Parcel' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'method', emoji: '🔧', label: { tr: 'Method (fiil)', en: 'Method (verb)' }, color: '#f59e0b' },
        { id: 'url', emoji: '📍', label: { tr: 'URL (adres)', en: 'URL (address)' }, color: '#0ea5e9' },
        { id: 'headers', emoji: '📋', label: { tr: 'Header\'lar', en: 'Headers' }, color: '#a78bfa' },
        { id: 'body', emoji: '📦', label: { tr: 'Body (veri)', en: 'Body (data)' }, color: '#22c55e' },
        { id: 'server', emoji: '🖥️', label: { tr: 'Sunucu', en: 'Server' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir POST isteği gönderiyorsun. Sunucuya varan bu tek kutunun içinde aslında dört ayrı parça var — hangisi ne işe yarar?', en: 'You send a POST request. Inside this single parcel that reaches the server there are actually four parts — which does what?' },
          positions: { method: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Method + URL birlikte "NE + NEREYE" der: POST + /api/v1/bugs = "buraya YENİ bir bug oluştur". Aynı URL\'e GET deseydin "listeyi getir" olurdu.', en: 'Method + URL together say "WHAT + WHERE": POST + /api/v1/bugs = "create a NEW bug here". Had you said GET to the same URL it would mean "fetch the list".' },
          positions: { method: { x: 25, y: 40 }, url: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'method', to: 'url', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Header\'lar paketleme notlarıdır: `Content-Type: application/json` olmazsa sunucu gövdeyi JSON sanmaz — kutuyu açamaz ve "boş geldi" der.', en: 'Headers are the packing notes: without `Content-Type: application/json` the server won\'t treat the body as JSON — it can\'t open the box and says "arrived empty".' },
          code: { tr: 'Content-Type: application/json', en: 'Content-Type: application/json' },
          positions: { url: { x: 25, y: 40 }, headers: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'url', to: 'headers', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Body taşınan asıl veridir — yalnızca POST/PUT/PATCH\'te bulunur. GET\'te body göndermek çoğu sunucuda görmezden gelinir.', en: 'The body is the actual carried data — present only in POST/PUT/PATCH. Sending a body with GET is ignored by most servers.' },
          code: { tr: '{ "title": "Odeme 500", "severity": "CRITICAL" }', en: '{ "title": "Payment 500", "severity": "CRITICAL" }' },
          positions: { headers: { x: 25, y: 40 }, body: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'headers', to: 'body', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — Dört parça da doğru olmalı: method yanlışsa yanlış iş, URL yanlışsa 404, header eksikse boş body, body bozuksa 400. Tester her parçayı ayrı test eder.', en: 'The lesson — All four parts must be right: wrong method = wrong action, wrong URL = 404, missing header = empty body, malformed body = 400. The tester tests each part separately.' },
          positions: { body: { x: 30, y: 50 }, server: { x: 65, y: 50, scale: 1.1, pulse: true } },
          beams: [{ from: 'body', to: 'server', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Header Neden Sessiz Bir Bug Kaynağıdır?', en: 'Why Is a Header a Silent Bug Source?' },
      steps: [
        { id: 1, icon: '📋', label: { tr: 'Content-Type eksik…', en: 'Content-Type missing…' }, detail: { tr: '`Content-Type: application/json` göndermezsen sunucu gövdeyi düz metin sanır ve JSON olarak ayrıştırmaz.', en: 'Omit `Content-Type: application/json` and the server treats the body as plain text and does not parse it as JSON.' } },
        { id: 2, icon: '📦', label: { tr: 'Sunucu boş body görür…', en: 'Server sees an empty body…' }, detail: { tr: 'Ayrıştırılamayan gövde çoğu framework\'te `null`/boş olarak gelir — sanki hiç veri göndermemişsin gibi.', en: 'An unparseable body arrives as `null`/empty in most frameworks — as if you sent no data at all.' } },
        { id: 3, icon: '🐞', label: { tr: 'Yanıltıcı sonuç…', en: 'Misleading result…' }, detail: { tr: 'Sonuç 400 (zorunlu alan boş) veya sessiz 201 (boş kayıt) olabilir. Belirtiye bakan tester body\'yi suçlar, oysa suçlu header\'dır.', en: 'The result can be 400 (required field empty) or a silent 201 (empty record). A tester looking at the symptom blames the body, but the culprit is the header.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a2-order-01',
      question: { tr: 'Geçerli bir POST isteğini oluşturma sırasını diz.', en: 'Order the steps to build a valid POST request.' },
      items: [
        { id: '1', text: { tr: 'Method\'u POST, URL\'i /api/v1/bugs seç', en: 'Choose method POST, URL /api/v1/bugs' }, order: 1 },
        { id: '2', text: { tr: 'Content-Type: application/json header\'ını ekle', en: 'Add the Content-Type: application/json header' }, order: 2 },
        { id: '3', text: { tr: 'Gerekiyorsa Authorization header\'ını ekle', en: 'Add the Authorization header if required' }, order: 3 },
        { id: '4', text: { tr: 'Body\'ye zorunlu alanları içeren JSON yaz', en: 'Write JSON with required fields into the body' }, order: 4 },
        { id: '5', text: { tr: 'İsteği gönder ve status + yanıtı incele', en: 'Send the request and inspect status + response' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a2-request-anatomy',
      id: 'api-a2-request-anatomy',
      title: { tr: 'Kendin Dene: Eksik Header\'ı Ekle', en: 'Try It Yourself: Add the Missing Header' },
      starterCode: `// BUG: gövde JSON ama sunucu bunu bilmiyor -> boş body sanıyor
POST /api/v1/bugs

{ "title": "Sepet toplami yanlis", "severity": "MEDIUM" }`,
      solutionCode: `// FIX: Content-Type header'i gövdenin JSON oldugunu sunucuya soyler
POST /api/v1/bugs
Content-Type: application/json

{ "title": "Sepet toplami yanlis", "severity": "MEDIUM" }`,
      hint: { tr: 'Gövde JSON olsa bile sunucu bunu `Content-Type: application/json` header\'ı olmadan bilemez; header eksikse gövdeyi ayrıştıramaz ve boş sanır.', en: 'Even if the body is JSON, the server cannot know that without the `Content-Type: application/json` header; missing it, the server cannot parse the body and treats it as empty.' },
      successMessage: { tr: 'Doğru! Bug\'ların çoğu body\'de değil, gözden kaçan bir header\'dadır — bunu test etmek tester\'ın işidir.', en: 'Correct! Most bugs live not in the body but in an overlooked header — testing that is the tester\'s job.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir POST /api/v1/bugs isteği gövdesinde geçerli JSON var ama sunucu "title zorunlu" diyerek 400 dönüyor. En olası sessiz neden?', en: 'A POST /api/v1/bugs request has valid JSON in the body, but the server returns 400 saying "title required". Most likely silent cause?' },
      options: [
        { id: 'a', text: { tr: 'Sunucu çökmüş', en: 'The server crashed' } },
        { id: 'b', text: { tr: 'Content-Type header\'ı eksik/yanlış — sunucu gövdeyi ayrıştıramadı, boş sandı', en: 'The Content-Type header is missing/wrong — the server couldn\'t parse the body and treated it as empty' } },
        { id: 'c', text: { tr: 'URL yanlış', en: 'The URL is wrong' } },
        { id: 'd', text: { tr: 'severity değeri geçersiz', en: 'The severity value is invalid' } },
      ],
      correct: 'b',
      explanation: { tr: 'JSON geçerli olsa bile `Content-Type: application/json` yoksa sunucu gövdeyi JSON olarak ayrıştırmaz; `title` dahil tüm alanları boş görür ve "zorunlu alan yok" der. Belirti body gibi görünür ama kök neden header\'dır.', en: 'Even with valid JSON, without `Content-Type: application/json` the server does not parse the body as JSON; it sees all fields including `title` as empty and says "required field missing". The symptom looks like the body but the root cause is the header.' },
      retryQuestion: {
        question: { tr: 'Aynı URL\'e (`/api/v1/bugs`) hem "listeyi getir" hem "yeni ekle" diyebiliyorsak, iki isteği birbirinden ne ayırır?', en: 'If to the same URL (`/api/v1/bugs`) we can say both "fetch the list" and "add a new one", what distinguishes the two requests?' },
        options: [
          { id: 'a', text: { tr: 'HTTP method (GET vs POST)', en: 'The HTTP method (GET vs POST)' } },
          { id: 'b', text: { tr: 'Sunucunun IP adresi', en: 'The server\'s IP address' } },
          { id: 'c', text: { tr: 'İsteğin gönderildiği saat', en: 'The time the request was sent' } },
          { id: 'd', text: { tr: 'Tarayıcının sürümü', en: 'The browser version' } },
        ],
        correct: 'a',
        explanation: { tr: 'URL NEREYE, method NE YAPILACAĞINI söyler. Aynı URL\'e GET "oku", POST "oluştur" der — method isteğin niyetini belirleyen parçadır.', en: 'The URL says WHERE, the method says WHAT TO DO. To the same URL, GET means "read", POST means "create" — the method is the part that defines the request\'s intent.' },
      },
    },
  ],
}

const A3 = {
  title: { tr: '📥 A3 · HTTP Response Anatomisi', en: '📥 A3 · HTTP Response Anatomy' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📥',
      content: {
        tr: 'Bir HTTP yanıtı, bir **teslimat makbuzu + paket** gibidir: en üstte büyük bir **damga** (status code — işlem başarılı mı, 200/201/404/500) vardır, altında **teslimat notları** (header\'lar — içerik tipi, önbellek, boyut) ve en sonda **paketin kendisi** (body — asıl veri) bulunur. Peki status kodu zaten "başarılı" diyorsa, neden body\'yi de kontrol edelim? Çünkü status yalnızca isteğin sunucuya ULAŞIP İŞLENDİĞİNİ söyler, içindeki verinin DOĞRU olduğunu değil: sunucu 200 döner ama `severity` alanı beklenenden farklı olabilir — yeşil ışık yanar ama araç yanlış yola gitmektedir. Java\'da bunun karşılığı bir metodun `return` değeridir: metot exception atmadan döndü diye (200) dönen nesnenin alanları doğru demek değildir; `assertEquals` ile içeriği de doğrularsın. QA açısından bu, "yanlış PASS"in doğduğu yerdir: sadece status koduna bakan bir test yeşil görünür ama gerçekte hatalı veriyi geçirir — production\'da sessiz bir bug olarak patlar.',
        en: 'An HTTP response is like a **delivery receipt + package**: at the top a big **stamp** (status code — did it succeed, 200/201/404/500), below it **delivery notes** (headers — content type, cache, size), and at the very end **the package itself** (body — the actual data). But if the status code already says "success", why also check the body? Because the status only tells you the request REACHED and was PROCESSED by the server, not that the data inside is CORRECT: the server returns 200 but the `severity` field may differ from what was expected — the light is green but the vehicle took the wrong road. In Java the equivalent is a method\'s `return` value: a method returning without throwing (200) does not mean the returned object\'s fields are right; you also verify the content with `assertEquals`. In QA this is where the "false PASS" is born: a test that only checks the status code looks green but actually lets wrong data through — it detonates as a silent bug in production.',
      },
    },
    { type: 'heading', text: { tr: 'Bir Yanıtın Üç Parçası', en: 'The Three Parts of a Response' } },
    {
      type: 'code',
      language: 'http',
      code: {
        tr: `HTTP/1.1 201 Created        # STATUS: 201 = yeni kayit olusturuldu
Content-Type: application/json   # HEADER: govde JSON
Location: /api/v1/bugs/42    # HEADER: yeni kaydin adresi

{                           # BODY: olusturulan kaydin kendisi
  "id": 42,
  "title": "Odeme ekrani 500 donuyor",
  "severity": "CRITICAL",
  "status": "OPEN",
  "createdAt": "2026-07-24T10:15:00Z"
}`,
        en: `HTTP/1.1 201 Created        # STATUS: 201 = new record created
Content-Type: application/json   # HEADER: body is JSON
Location: /api/v1/bugs/42    # HEADER: address of the new record

{                           # BODY: the created record itself
  "id": 42,
  "title": "Payment screen returns 500",
  "severity": "CRITICAL",
  "status": "OPEN",
  "createdAt": "2026-07-24T10:15:00Z"
}`,
      },
    },
    {
      type: 'grid', cols: 3,
      items: [
        { icon: '🔢', label: { tr: 'Status Code', en: 'Status Code' }, desc: { tr: 'İşlem sonucu (2xx/4xx/5xx). "Ulaştı mı, işlendi mi?" — ama "doğru mu?" değil.', en: 'Outcome (2xx/4xx/5xx). "Did it arrive and process?" — but not "is it correct?"' } },
        { icon: '📋', label: { tr: 'Headers', en: 'Headers' }, desc: { tr: 'Meta bilgi: Content-Type, Location, Cache-Control. Sızıntı/önbellek buradan yakalanır.', en: 'Metadata: Content-Type, Location, Cache-Control. Leaks/caching are caught here.' } },
        { icon: '📦', label: { tr: 'Body', en: 'Body' }, desc: { tr: 'Asıl veri. Yanlış PASS\'ları önlemek için alanları TEK TEK doğrula.', en: 'The actual data. Verify fields ONE BY ONE to prevent false PASSes.' } },
      ],
    },
    {
      type: 'video-scene',
      id: 'api-a3-response-anatomy-film',
      title: { tr: '🎬 200 Ama Yanlış: Status Yeşil, Veri Kırmızı', en: '🎬 200 but Wrong: Status Green, Data Red' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'server', emoji: '🖥️', label: { tr: 'Sunucu', en: 'Server' }, color: '#8b5cf6' },
        { id: 'status', emoji: '🟢', label: { tr: 'Status 200', en: 'Status 200' }, color: '#22c55e' },
        { id: 'body', emoji: '📦', label: { tr: 'Body (veri)', en: 'Body (data)' }, color: '#0ea5e9' },
        { id: 'ghost', emoji: '👻', label: { tr: 'Yanlış veri', en: 'Wrong data' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Tester', en: 'Tester' }, color: '#f59e0b' },
      ],
      scenes: [
        {
          caption: { tr: 'Sunucu `GET /api/v1/bugs/42`\'ye 200 OK döndü. Test yeşil görünüyor — ama gerçekten her şey yolunda mı?', en: 'The server returned 200 OK to `GET /api/v1/bugs/42`. The test looks green — but is everything really fine?' },
          positions: { server: { x: 30, y: 50 }, status: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'server', to: 'status', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Status kodu yalnızca "istek işlendi" der. Asıl veri body\'dedir — ve orada `severity` beklenen `CRITICAL` yerine `LOW` dönmüş.', en: 'The status code only says "request processed". The actual data is in the body — and there `severity` came back `LOW` instead of the expected `CRITICAL`.' },
          code: { tr: '{ "id": 42, "severity": "LOW" } // beklenen: CRITICAL', en: '{ "id": 42, "severity": "LOW" } // expected: CRITICAL' },
          positions: { status: { x: 25, y: 40, opacity: 0.6 }, body: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'status', to: 'body', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Sadece status\'a bakan test bu farkı GÖRMEZ — yeşil verir. Yanlış veri bir hayalet gibi testin içinden geçer.', en: 'A test that only checks the status DOES NOT see this difference — it passes green. The wrong data slips through the test like a ghost.' },
          positions: { body: { x: 25, y: 40 }, ghost: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'body', to: 'ghost', color: '#ef4444' }],
        },
        {
          caption: { tr: 'İyi tester body\'nin İÇİNDEKİ alanları tek tek doğrular: `severity === "CRITICAL"` mi? Ancak o zaman hayalet yakalanır.', en: 'A good tester verifies the fields INSIDE the body one by one: is `severity === "CRITICAL"`? Only then is the ghost caught.' },
          positions: { ghost: { x: 25, y: 40 }, tester: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'ghost', to: 'tester', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Ders — Status kodu gerekli ama YETERLİ değildir. "200 = başarı" varsayımı yanlış PASS\'ların anasıdır; body her zaman ayrıca doğrulanır.', en: 'The lesson — The status code is necessary but NOT sufficient. The "200 = success" assumption is the mother of false PASSes; the body is always verified separately.' },
          positions: { tester: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Yanlış PASS Nasıl Doğar?', en: 'How Is a False PASS Born?' },
      steps: [
        { id: 1, icon: '🟢', label: { tr: 'Test sadece status\'a bakar…', en: 'Test only checks the status…' }, detail: { tr: 'Test yalnızca `status === 200` doğrular ve geçer. Body hiç okunmaz.', en: 'The test only verifies `status === 200` and passes. The body is never read.' } },
        { id: 2, icon: '👻', label: { tr: 'Body\'de yanlış veri geçer…', en: 'Wrong data slips through the body…' }, detail: { tr: '`severity` yanlış olsa da status 200 olduğu için test yeşil verir — hata görünmez kalır.', en: 'Even if `severity` is wrong, since the status is 200 the test passes green — the defect stays invisible.' } },
        { id: 3, icon: '💥', label: { tr: 'Production\'da patlar…', en: 'It detonates in production…' }, detail: { tr: 'Yanlış öncelikli bug yanlış ekibe düşer, kritik hata gözden kaçar. Kök neden: eksik body assertion\'ı.', en: 'A wrongly-prioritized bug lands on the wrong team, a critical defect is missed. Root cause: a missing body assertion.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a3-order-01',
      question: { tr: 'Bir yanıtı DOĞRU şekilde doğrulama sırasını diz (yalnız status yeterli değil).', en: 'Order the correct way to verify a response (status alone is not enough).' },
      items: [
        { id: '1', text: { tr: 'Status kodunu kontrol et (ör. 201 bekleniyor)', en: 'Check the status code (e.g. expect 201)' }, order: 1 },
        { id: '2', text: { tr: 'Content-Type header\'ının application/json olduğunu doğrula', en: 'Verify the Content-Type header is application/json' }, order: 2 },
        { id: '3', text: { tr: 'Body\'yi JSON olarak ayrıştır', en: 'Parse the body as JSON' }, order: 3 },
        { id: '4', text: { tr: 'Kritik alanları tek tek doğrula (title, severity, status)', en: 'Verify critical fields one by one (title, severity, status)' }, order: 4 },
        { id: '5', text: { tr: 'Beklenen ile gerçekleşeni karşılaştır, farkı raporla', en: 'Compare expected vs actual, report the difference' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a3-response-anatomy',
      id: 'api-a3-response-anatomy',
      title: { tr: 'Kendin Dene: Body Doğrulamasını Ekle', en: 'Try It Yourself: Add the Body Assertion' },
      starterCode: `// BUG: sadece status'a bakiyor -> yanlis veri gecer (yanlis PASS)
function verify(response) {
  return response.status === 200;
}`,
      solutionCode: `// FIX: status + body birlikte dogrulanir
function verify(response) {
  if (response.status !== 200) return false;
  // govdedeki kritik alan da beklenen deger mi?
  return response.body.severity === "CRITICAL";
}`,
      hint: { tr: 'Status kodu "işlendi" der, "doğru" demez. `severity === "CRITICAL"` gibi bir body kontrolü eklemezsen, 200 dönen yanlış veri testten sessizce geçer.', en: 'The status says "processed", not "correct". Without a body check like `severity === "CRITICAL"`, wrong data returning 200 slips silently through the test.' },
      successMessage: { tr: 'Doğru! Status + body birlikte doğrulanınca yanlış PASS ortadan kalkar.', en: 'Correct! Verifying status + body together eliminates the false PASS.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir test yalnızca `status === 200` kontrol ediyor ve geçiyor. Sunucu 200 döndü ama `severity` alanı yanlış. Bu duruma ne denir?', en: 'A test only checks `status === 200` and passes. The server returned 200 but the `severity` field is wrong. What is this called?' },
      options: [
        { id: 'a', text: { tr: 'Doğru bir başarı — 200 döndüğü için sorun yok', en: 'A correct success — since it returns 200 there is no problem' } },
        { id: 'b', text: { tr: 'Yanlış PASS — test yeşil ama hatalı veriyi geçiriyor', en: 'A false PASS — the test is green but lets wrong data through' } },
        { id: 'c', text: { tr: 'Sunucu hatası (5xx)', en: 'A server error (5xx)' } },
        { id: 'd', text: { tr: 'Ağ zaman aşımı', en: 'A network timeout' } },
      ],
      correct: 'b',
      explanation: { tr: 'Status kodu gerekli ama yeterli değil. Sadece status\'a bakan test, body\'deki yanlış veriyi göremez ve yeşil verir — bu "yanlış PASS"tir. Çözüm: kritik body alanlarını da doğrulamak.', en: 'The status is necessary but not sufficient. A status-only test cannot see the wrong data in the body and passes green — this is a "false PASS". The fix: also verify critical body fields.' },
      retryQuestion: {
        question: { tr: 'Bir POST /api/v1/bugs yeni kayıt oluşturdu. Hangi status kodu ve hangi header yeni kaydın adresini verir?', en: 'A POST /api/v1/bugs created a new record. Which status code and which header give the new record\'s address?' },
        options: [
          { id: 'a', text: { tr: '200 OK + Content-Length', en: '200 OK + Content-Length' } },
          { id: 'b', text: { tr: '201 Created + Location', en: '201 Created + Location' } },
          { id: 'c', text: { tr: '204 No Content + Accept', en: '204 No Content + Accept' } },
          { id: 'd', text: { tr: '404 Not Found + Host', en: '404 Not Found + Host' } },
        ],
        correct: 'b',
        explanation: { tr: 'Kaynak oluşturmada doğru status 201 Created\'dır ve `Location` header\'ı yeni kaydın adresini (`/api/v1/bugs/42`) verir. 200 "genel başarı", 204 "gövdesiz başarı" anlamına gelir.', en: 'For resource creation the correct status is 201 Created, and the `Location` header gives the new record\'s address (`/api/v1/bugs/42`). 200 means "generic success", 204 means "success with no body".' },
      },
    },
  ],
}

const A4 = {
  title: { tr: '🔧 A4 · HTTP Metotları: GET / POST / PUT / PATCH / DELETE', en: '🔧 A4 · HTTP Methods: GET / POST / PUT / PATCH / DELETE' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔧',
      content: {
        tr: 'HTTP metotları, bir bug kaydı üzerindeki **eylem fiilleridir**; tıpkı bir dosya dolabındaki hareketler gibi: **GET** = klasörü aç ve OKU (hiçbir şeyi değiştirmeden), **POST** = yeni bir kağıt EKLE, **PUT** = kağıdı komple YENİSİYLE DEĞİŞTİR, **PATCH** = kağıdın tek satırını DÜZELT, **DELETE** = kağıdı ÇÖPE AT. Peki hepsi "veriye dokunuyorsa" neden ayrı fiillere ihtiyaç var? Çünkü her fiilin **güvenlik ve tekrarlanabilirlik** sözü farklıdır: GET güvenlidir (100 kez çağır, hiçbir şey değişmez), POST idempotent DEĞİLDİR (iki kez çağırırsan iki kayıt), PUT/DELETE ise idempotenttir (beş kez çağır, sonuç bir kezki ile aynı). Java\'da bunun karşılığı bir metodun yan etkisidir: `getBug()` saf bir okuyucudur, `createBug()` her çağrıda listeyi büyütür, `deleteBug(id)` ilk çağrıda siler, sonrakiler zaten silinmişi bulur. QA açısından kritik: bir "ödeme" endpoint\'i POST ile yazıldıysa ve kullanıcı butona iki kez basarsa, idempotency yoksa **çift tahsilat** olur — testerın "aynı isteği iki kez göndererek" bu sınıf hataları avlaması gerekir.',
        en: 'HTTP methods are the **action verbs** on a bug record; like moves on a filing cabinet: **GET** = open the folder and READ (changing nothing), **POST** = ADD a new sheet, **PUT** = REPLACE the sheet entirely with a new one, **PATCH** = FIX a single line of the sheet, **DELETE** = THROW the sheet away. But if they all "touch data", why need separate verbs? Because each verb\'s **safety and repeatability** promise differs: GET is safe (call it 100 times, nothing changes), POST is NOT idempotent (call it twice, two records), while PUT/DELETE are idempotent (call five times, same result as once). In Java the equivalent is a method\'s side effect: `getBug()` is a pure reader, `createBug()` grows the list on every call, `deleteBug(id)` deletes on the first call and finds it already gone afterwards. The QA crux: if a "payment" endpoint is written with POST and the user double-clicks, without idempotency you get a **double charge** — the tester must hunt this class of bugs by "sending the same request twice".',
      },
    },
    { type: 'heading', text: { tr: 'Beş Metod, Beş Söz', en: 'Five Methods, Five Promises' } },
    {
      type: 'table',
      headers: ['Method', 'Bug Tracker eylemi / action', 'Body?', 'Güvenli / Safe', 'Idempotent'],
      rows: [
        ['GET', 'GET /api/v1/bugs — listeyi oku / read list', '❌', '✅', '✅'],
        ['POST', 'POST /api/v1/bugs — yeni bug oluştur / create', '✅', '❌', '❌'],
        ['PUT', 'PUT /api/v1/bugs/42 — komple değiştir / full replace', '✅', '❌', '✅'],
        ['PATCH', 'PATCH /api/v1/bugs/42/status — kısmi güncelle / partial', '✅', '❌', '⚠️ genelde / usually'],
        ['DELETE', 'DELETE /api/v1/bugs/42 — sil / remove', '❌', '❌', '✅'],
      ],
    },
    {
      type: 'video-scene',
      id: 'api-a4-methods-film',
      title: { tr: '🎬 Çift Tıklama Tehlikesi: POST Neden Idempotent Değildir?', en: '🎬 The Double-Click Danger: Why POST Is Not Idempotent' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'user', emoji: '🖱️', label: { tr: 'Kullanıcı (çift tık)', en: 'User (double click)' }, color: '#f59e0b' },
        { id: 'post1', emoji: '📤', label: { tr: '1. POST', en: '1st POST' }, color: '#0ea5e9' },
        { id: 'post2', emoji: '📤', label: { tr: '2. POST', en: '2nd POST' }, color: '#a78bfa' },
        { id: 'db', emoji: '🗄️', label: { tr: 'Veritabanı', en: 'Database' }, color: '#8b5cf6' },
        { id: 'dup', emoji: '👯', label: { tr: 'İki kayıt!', en: 'Two records!' }, color: '#ef4444' },
      ],
      scenes: [
        {
          caption: { tr: 'Kullanıcı "Bug Oluştur" butonuna sabırsızlıkla İKİ kez basıyor. GET olsaydı sorun olmazdı — ama bu bir POST.', en: 'The user impatiently clicks "Create Bug" TWICE. If it were GET there\'d be no problem — but this is a POST.' },
          positions: { user: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'İlk POST sunucuya gider ve yeni bir bug oluşturur (id: 42). Buraya kadar her şey normal.', en: 'The first POST reaches the server and creates a new bug (id: 42). So far so normal.' },
          code: { tr: 'POST /api/v1/bugs -> 201 Created (id: 42)', en: 'POST /api/v1/bugs -> 201 Created (id: 42)' },
          positions: { user: { x: 20, y: 40 }, post1: { x: 45, y: 55 }, db: { x: 72, y: 55, scale: 1.1, pulse: true } },
          beams: [{ from: 'post1', to: 'db', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'İkinci POST de gider — sunucu bunun aynı istek olduğunu BİLMEZ, çünkü POST idempotent değildir. İkinci bir kayıt daha oluşturur (id: 43).', en: 'The second POST goes too — the server does NOT know it is the same request, because POST is not idempotent. It creates a second record (id: 43).' },
          code: { tr: 'POST /api/v1/bugs -> 201 Created (id: 43)', en: 'POST /api/v1/bugs -> 201 Created (id: 43)' },
          positions: { post2: { x: 45, y: 45 }, db: { x: 72, y: 55, scale: 1.1, pulse: true } },
          beams: [{ from: 'post2', to: 'db', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Sonuç: aynı bug iki kez kaydedildi. Bir ödeme endpoint\'inde bu, çift tahsilat demektir — sessiz ama pahalı bir bug.', en: 'The result: the same bug was saved twice. On a payment endpoint this means a double charge — a silent but expensive bug.' },
          positions: { db: { x: 30, y: 50 }, dup: { x: 62, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'db', to: 'dup', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Tester bu sınıf bugları "aynı POST\'u iki kez göndererek" avlar. Idempotency gerekiyorsa geliştirici PUT ya da idempotency-key kullanmalıdır.', en: 'The lesson — The tester hunts this bug class by "sending the same POST twice". If idempotency is needed, the developer should use PUT or an idempotency key.' },
          positions: { dup: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'PUT ile PATCH Farkı: Komple mi, Tek Satır mı?', en: 'PUT vs PATCH: Full Replace or One Line?' },
      steps: [
        { id: 1, icon: '🔁', label: { tr: 'PUT komple değiştirir…', en: 'PUT replaces entirely…' }, detail: { tr: 'PUT /api/v1/bugs/42 gönderdiğin gövdenin TAMAMINI yazar; göndermediğin alan (örn. severity) SİLİNİR/sıfırlanır.', en: 'PUT /api/v1/bugs/42 writes the ENTIRE body you send; a field you omit (e.g. severity) is DROPPED/reset.' } },
        { id: 2, icon: '✏️', label: { tr: 'PATCH tek alanı düzeltir…', en: 'PATCH fixes one field…' }, detail: { tr: 'PATCH /api/v1/bugs/42/status yalnızca status alanını değiştirir; diğer alanlara DOKUNMAZ.', en: 'PATCH /api/v1/bugs/42/status changes only the status field; it does NOT touch the others.' } },
        { id: 3, icon: '🐞', label: { tr: 'Karışırsa veri kaybı…', en: 'Confuse them = data loss…' }, detail: { tr: 'PATCH sanıp PUT göndermek, eksik alanları sessizce silebilir — "sadece status\'u güncelledim" derken title\'ı uçurabilirsin.', en: 'Sending PUT while thinking PATCH can silently drop missing fields — "I only updated status" may wipe the title.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a4-order-01',
      question: { tr: 'Idempotency\'yi test etmek için "aynı isteği iki kez gönderme" senaryosunu diz.', en: 'Order the "send the same request twice" scenario to test idempotency.' },
      items: [
        { id: '1', text: { tr: 'Başlangıç durumunu kaydet (kaç bug var?)', en: 'Record the initial state (how many bugs?)' }, order: 1 },
        { id: '2', text: { tr: 'İsteği bir kez gönder ve sonucu gözle', en: 'Send the request once and observe the result' }, order: 2 },
        { id: '3', text: { tr: 'AYNI isteği ikinci kez gönder', en: 'Send the SAME request a second time' }, order: 3 },
        { id: '4', text: { tr: 'Son durumu tekrar oku (kaç bug var?)', en: 'Read the final state again (how many bugs?)' }, order: 4 },
        { id: '5', text: { tr: 'Fark 1 mi 2 mi? POST=2 (idempotent değil), PUT=1', en: 'Is the diff 1 or 2? POST=2 (not idempotent), PUT=1' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a4-http-methods',
      id: 'api-a4-http-methods',
      title: { tr: 'Kendin Dene: Doğru Metodu Seç', en: 'Try It Yourself: Pick the Right Method' },
      starterCode: `// Gereksinim: mevcut bir bug'in SADECE status alanini "CLOSED" yap
// TODO: dogru metodu ve yolu sec (butun kaydi degistirme!)
??? /api/v1/bugs/42/???
{ "status": "CLOSED" }`,
      solutionCode: `// PATCH sadece tek alani gunceller, diger alanlara dokunmaz
PATCH /api/v1/bugs/42/status
{ "status": "CLOSED" }`,
      hint: { tr: 'Yalnızca tek bir alanı (status) değiştirmek istiyorsun. PUT tüm kaydı değiştirir ve göndermediğin alanları silebilir; kısmi güncelleme için PATCH kullan.', en: 'You want to change only a single field (status). PUT replaces the whole record and can drop fields you omit; use PATCH for partial updates.' },
      successMessage: { tr: 'Doğru! PATCH kısmi günceller — title ve severity gibi diğer alanlar korunur.', en: 'Correct! PATCH updates partially — other fields like title and severity are preserved.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir ödeme "Öde" butonu POST ile çalışıyor ve idempotency yok. Kullanıcı butona iki kez basarsa ne olur, tester bunu nasıl yakalar?', en: 'A payment "Pay" button uses POST with no idempotency. What happens on a double-click, and how does the tester catch it?' },
      options: [
        { id: 'a', text: { tr: 'Hiçbir şey; POST idempotenttir, ikinci istek yok sayılır', en: 'Nothing; POST is idempotent, the second request is ignored' } },
        { id: 'b', text: { tr: 'Çift tahsilat olur; tester aynı POST\'u iki kez gönderip kayıt sayısını karşılaştırarak yakalar', en: 'A double charge occurs; the tester catches it by sending the same POST twice and comparing record counts' } },
        { id: 'c', text: { tr: 'Sunucu çöker (500)', en: 'The server crashes (500)' } },
        { id: 'd', text: { tr: 'URL 404 döner', en: 'The URL returns 404' } },
      ],
      correct: 'b',
      explanation: { tr: 'POST idempotent değildir: aynı isteği iki kez göndermek iki ayrı kayıt/işlem yaratır — ödemede çift tahsilat. Tester bunu "aynı isteği iki kez gönder, durumu karşılaştır" ile avlar; çözüm PUT veya idempotency-key\'dir.', en: 'POST is not idempotent: sending the same request twice creates two separate records/operations — a double charge in payments. The tester hunts it with "send twice, compare state"; the fix is PUT or an idempotency key.' },
      retryQuestion: {
        question: { tr: 'Bir GET /api/v1/bugs isteğini 100 kez gönderdin. Sunucudaki bug sayısı nasıl değişir?', en: 'You sent a GET /api/v1/bugs request 100 times. How does the bug count on the server change?' },
        options: [
          { id: 'a', text: { tr: 'Hiç değişmez — GET güvenlidir, sadece okur', en: 'It does not change — GET is safe, it only reads' } },
          { id: 'b', text: { tr: '100 yeni kayıt oluşur', en: '100 new records are created' } },
          { id: 'c', text: { tr: 'Tüm kayıtlar silinir', en: 'All records are deleted' } },
          { id: 'd', text: { tr: 'Sunucu çöker', en: 'The server crashes' } },
        ],
        correct: 'a',
        explanation: { tr: 'GET "güvenli" (safe) bir metottur: sunucu durumunu değiştirmez, yalnızca okur. Kaç kez çağırırsan çağır bug sayısı sabit kalır — bu yüzden GET testleri veriyi kirletmeden defalarca koşturulabilir.', en: 'GET is a "safe" method: it does not change server state, only reads. However many times you call it, the bug count stays constant — which is why GET tests can run repeatedly without polluting data.' },
      },
    },
  ],
}

const A5 = {
  title: { tr: '🚦 A5 · Status Kodları: 2xx / 3xx / 4xx / 5xx', en: '🚦 A5 · Status Codes: 2xx / 3xx / 4xx / 5xx' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🚦',
      content: {
        tr: 'Status kodları, sunucunun **trafik lambası**dır ama üç renkli değil, dört mahalleli: **2xx** = yeşil (başardım), **3xx** = tabela (başka yola git — yönlendirme), **4xx** = "senin hatan" (istek yanlış: eksik alan, yanlış yol, yetkisiz), **5xx** = "benim hatam" (sunucu çöktü). Peki neden yüzlerce kod var, "başardı/başaramadı" iki değer yetmez mi? Çünkü bir testerın bir sonraki adımı **koda bağlıdır**: 4xx görürsen test verini/isteğini düzeltirsin (bu senin işin), 5xx görürsen geliştiriciye escalate edersin (bu onların bug\'ı) — kodu yanlış okursan yanlış kişiyi suçlarsın. Java\'da bunun karşılığı exception türüdür: `IllegalArgumentException` (4xx, çağıran yanlış girdi verdi) ile `NullPointerException`/`SQLException` (5xx, kodun içi patladı) farkı; birini çağıran düzeltir, diğerini kodu yazan. QA açısından en pahalı karışıklık 401 (kimliğin yok) ile 403 (kimliğin var ama yetkin yok) arasındadır: birini diğeri sanmak, bir güvenlik açığını "login bug\'ı" diye kapatmana yol açar.',
        en: 'Status codes are the server\'s **traffic light**, but not three colors — four districts: **2xx** = green (I did it), **3xx** = a sign (go another way — redirect), **4xx** = "your fault" (bad request: missing field, wrong path, unauthorized), **5xx** = "my fault" (the server crashed). But why hundreds of codes — aren\'t two values, "succeeded/failed", enough? Because a tester\'s next move **depends on the code**: see 4xx and you fix your test data/request (your job), see 5xx and you escalate to the developer (their bug) — misread the code and you blame the wrong person. In Java the equivalent is the exception type: `IllegalArgumentException` (4xx, the caller passed bad input) vs `NullPointerException`/`SQLException` (5xx, the code blew up inside); the caller fixes one, the author fixes the other. In QA the costliest confusion is 401 (you have no identity) vs 403 (you have identity but no permission): mistaking one for the other makes you close a security hole as a "login bug".',
      },
    },
    { type: 'heading', text: { tr: 'Dört Mahalle ve Testerın Tepkisi', en: 'Four Districts and the Tester\'s Reaction' } },
    {
      type: 'visual', variant: 'pyramid',
      title: { tr: 'HTTP Status Grupları', en: 'HTTP Status Groups' },
      levels: [
        { label: { tr: '5xx — Sunucu Hatası (escalate)', en: '5xx — Server Error (escalate)' }, color: 'red', desc: { tr: '500 Internal · 502 Bad Gateway · 503 Unavailable', en: '500 Internal · 502 Bad Gateway · 503 Unavailable' } },
        { label: { tr: '4xx — İstemci Hatası (isteği düzelt)', en: '4xx — Client Error (fix the request)' }, color: 'orange', desc: { tr: '400 · 401 kimlik yok · 403 yetki yok · 404 · 422', en: '400 · 401 no identity · 403 no permission · 404 · 422' } },
        { label: { tr: '3xx — Yönlendirme', en: '3xx — Redirection' }, color: 'yellow', desc: { tr: '301 kalıcı · 302 geçici · 304 değişmedi', en: '301 permanent · 302 temporary · 304 not modified' } },
        { label: { tr: '2xx — Başarı', en: '2xx — Success' }, color: 'green', desc: { tr: '200 OK · 201 Created · 204 No Content', en: '200 OK · 201 Created · 204 No Content' } },
      ],
      note: { tr: '2xx = geç. 4xx = istek/veri/yetki senin tarafında yanlış. 5xx = sunucu bug\'ı, geliştiriciye escalate et.', en: '2xx = pass. 4xx = request/data/auth wrong on your side. 5xx = server bug, escalate to the developer.' },
    },
    {
      type: 'video-scene',
      id: 'api-a5-status-film',
      title: { tr: '🎬 401 mi 403 mü? Güvenlik Açığını "Login Bug" Sanmak', en: '🎬 401 or 403? Mistaking a Security Hole for a "Login Bug"' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'tester', emoji: '🕵️', label: { tr: 'Tester', en: 'Tester' }, color: '#f59e0b' },
        { id: 'req', emoji: '📤', label: { tr: 'DELETE /bugs/42', en: 'DELETE /bugs/42' }, color: '#0ea5e9' },
        { id: 'gate401', emoji: '🚫', label: { tr: '401 kimlik yok', en: '401 no identity' }, color: '#a78bfa' },
        { id: 'gate403', emoji: '⛔', label: { tr: '403 yetki yok', en: '403 no permission' }, color: '#ef4444' },
        { id: 'insight', emoji: '💡', label: { tr: 'Doğru teşhis', en: 'Right diagnosis' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Tester, geçerli token\'ıyla başka bir kullanıcının bug\'ını silmeyi deniyor: DELETE /api/v1/bugs/42.', en: 'The tester, with a valid token, tries to delete another user\'s bug: DELETE /api/v1/bugs/42.' },
          positions: { tester: { x: 25, y: 50 }, req: { x: 60, y: 50, scale: 1.1, pulse: true } },
          beams: [{ from: 'tester', to: 'req', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Senaryo A — Token HİÇ yoksa sunucu 401 döner: "seni tanımıyorum". Bu bir kimlik (authentication) sorunudur.', en: 'Scenario A — With NO token the server returns 401: "I don\'t know you". This is an authentication problem.' },
          code: { tr: '401 Unauthorized -> kimlik eksik', en: '401 Unauthorized -> identity missing' },
          positions: { req: { x: 25, y: 40 }, gate401: { x: 60, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'req', to: 'gate401', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Senaryo B — Token VAR ama bu kaydı silme yetkin yok: sunucu 403 döner. Kimliğin tanınıyor, ama izin reddediliyor (authorization).', en: 'Scenario B — Token EXISTS but you lack permission to delete this record: the server returns 403. Your identity is recognized, but permission is denied (authorization).' },
          code: { tr: '403 Forbidden -> yetki yok', en: '403 Forbidden -> no permission' },
          positions: { req: { x: 25, y: 40 }, gate403: { x: 60, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'req', to: 'gate403', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Tehlike — 403\'ü 401 sanan tester "login çalışmıyor" der ve kapatır. Oysa 403, başkasının verisine erişebildiğin anlamına gelebilir: bir IDOR güvenlik açığı!', en: 'The danger — a tester mistaking 403 for 401 says "login is broken" and closes it. But 403 may mean you can reach someone else\'s data: an IDOR security hole!' },
          positions: { gate403: { x: 25, y: 40 }, insight: { x: 60, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'gate403', to: 'insight', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — 401 = "kimliğin yok", 403 = "kimliğin var, yetkin yok". İkisini ayırmak, bir güvenlik açığını doğru sınıflandırmanın anahtarıdır.', en: 'The lesson — 401 = "you have no identity", 403 = "you have identity, no permission". Distinguishing them is the key to correctly classifying a security hole.' },
          positions: { insight: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: '4xx mı 5xx mi? Bug Kime Düşer?', en: '4xx or 5xx? Whose Bug Is It?' },
      steps: [
        { id: 1, icon: '🟠', label: { tr: '4xx görürsen…', en: 'If you see 4xx…' }, detail: { tr: '4xx = istek senin tarafında yanlış: eksik alan (400), kimlik yok (401), yetki yok (403), yol yok (404). Önce isteğini/verini düzelt.', en: '4xx = the request is wrong on your side: missing field (400), no identity (401), no permission (403), no path (404). Fix your request/data first.' } },
        { id: 2, icon: '🔴', label: { tr: '5xx görürsen…', en: 'If you see 5xx…' }, detail: { tr: '5xx = sunucu içi patladı (500) veya erişilemez (503). İsteğin doğruydu; bu geliştiricinin bug\'ıdır, escalate et.', en: '5xx = the server blew up inside (500) or is unreachable (503). Your request was fine; this is the developer\'s bug, escalate.' } },
        { id: 3, icon: '📝', label: { tr: 'Raporu buna göre yaz…', en: 'Write the report accordingly…' }, detail: { tr: 'Kodu yanlış okursan yanlış ekibi suçlarsın: 500\'ü "test verim yanlış" sanmak gerçek bug\'ı gizler.', en: 'Misread the code and you blame the wrong team: treating a 500 as "my test data is wrong" hides a real bug.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a5-order-01',
      question: { tr: 'Bir status kodunu gördüğünde teşhis sırasını diz.', en: 'Order the diagnosis steps when you see a status code.' },
      items: [
        { id: '1', text: { tr: 'Kodun grubunu belirle (2xx/3xx/4xx/5xx)', en: 'Identify the code group (2xx/3xx/4xx/5xx)' }, order: 1 },
        { id: '2', text: { tr: '2xx ise body\'yi de doğrula (yanlış PASS riski)', en: 'If 2xx, also verify the body (false-PASS risk)' }, order: 2 },
        { id: '3', text: { tr: '4xx ise isteği/veriyi/yetkiyi kontrol et', en: 'If 4xx, check the request/data/permission' }, order: 3 },
        { id: '4', text: { tr: '5xx ise isteğinin doğruluğunu teyit et, sonra escalate', en: 'If 5xx, confirm your request is valid, then escalate' }, order: 4 },
        { id: '5', text: { tr: 'Bulguyu doğru ekibe yönlendirerek raporla', en: 'Report by routing the finding to the right team' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a5-status-codes',
      id: 'api-a5-status-codes',
      title: { tr: 'Kendin Dene: Doğru Status Kodunu Eşle', en: 'Try It Yourself: Match the Right Status Code' },
      starterCode: `// Durum: gecerli token var ama kullanici baskasinin bug'ini silmeye calisiyor
// TODO: sunucu hangi status kodunu donmeli? (401 mi 403 mu?)
DELETE /api/v1/bugs/42  ->  ??? `,
      solutionCode: `// Kimlik var (token gecerli) ama YETKI yok -> 403 Forbidden
DELETE /api/v1/bugs/42  ->  403 Forbidden`,
      hint: { tr: 'Token geçerli olduğu için kimlik (authentication) sorunu YOK — o 401 olurdu. Sorun izin (authorization): kullanıcı tanınıyor ama bu işlemi yapamaz. Bu 403\'tür.', en: 'Since the token is valid there is NO authentication problem — that would be 401. The problem is authorization: the user is recognized but cannot do this. That is 403.' },
      successMessage: { tr: 'Doğru! 403, başkasının verisine erişebildiğini gösterebilir — bir IDOR açığının ilk işareti olabilir.', en: 'Correct! A 403 can reveal you can reach another\'s data — possibly the first sign of an IDOR hole.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir POST /api/v1/bugs isteği 500 Internal Server Error döndü. Tester\'ın doğru ilk hamlesi nedir?', en: 'A POST /api/v1/bugs request returned 500 Internal Server Error. What is the tester\'s correct first move?' },
      options: [
        { id: 'a', text: { tr: 'Test verisini değiştirip tekrar dener, çünkü hata onun tarafındadır', en: 'Change the test data and retry, since the error is on their side' } },
        { id: 'b', text: { tr: 'İsteğinin geçerliliğini teyit eder, sonra geliştiriciye escalate eder — 5xx sunucu bug\'ıdır', en: 'Confirms the request is valid, then escalates to the developer — 5xx is a server bug' } },
        { id: 'c', text: { tr: 'Hatayı görmezden gelir', en: 'Ignores the error' } },
        { id: 'd', text: { tr: 'Bug\'ı "kullanıcı hatası" olarak kapatır', en: 'Closes the bug as "user error"' } },
      ],
      correct: 'b',
      explanation: { tr: '5xx = sunucu içi patladı; isteğin geçerliyse bu geliştiricinin bug\'ıdır. 4xx olsaydı isteği/veriyi düzeltmek testerın işi olurdu. Kodu yanlış okuyup 500\'ü "kendi hatam" sanmak gerçek bug\'ı gizler.', en: '5xx = the server blew up inside; if your request is valid this is the developer\'s bug. A 4xx would make fixing the request/data the tester\'s job. Misreading it and treating a 500 as "my fault" hides a real bug.' },
      retryQuestion: {
        question: { tr: '401 ile 403 arasındaki temel fark nedir?', en: 'What is the fundamental difference between 401 and 403?' },
        options: [
          { id: 'a', text: { tr: '401 = kimlik yok/geçersiz; 403 = kimlik var ama yetki yok', en: '401 = no/invalid identity; 403 = identity present but no permission' } },
          { id: 'b', text: { tr: 'İkisi de aynıdır', en: 'They are identical' } },
          { id: 'c', text: { tr: '401 sunucu hatası, 403 ağ hatası', en: '401 is a server error, 403 is a network error' } },
          { id: 'd', text: { tr: '403 başarı, 401 başarısızlık', en: '403 is success, 401 is failure' } },
        ],
        correct: 'a',
        explanation: { tr: '401 authentication (kimliğin yok/geçersiz), 403 authorization (kimliğin var ama bu işleme iznin yok) sorunudur. Bu ayrım güvenlik testinde kritiktir: 403\'ü 401 sanmak bir yetki açığını gizleyebilir.', en: '401 is authentication (no/invalid identity), 403 is authorization (you have identity but no permission for this action). This distinction is critical in security testing: mistaking 403 for 401 can hide a permission hole.' },
      },
    },
  ],
}

const A6 = {
  title: { tr: "📋 A6 · Header'lar: Content-Type, Accept, Authorization", en: '📋 A6 · Headers: Content-Type, Accept, Authorization' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📋',
      content: {
        tr: 'Header\'lar, bir kargonun üstündeki **etiketler ve gümrük evraklarıdır**: paketin içine (body) dokunmadan "bu ne, nasıl açılmalı, kim gönderiyor, saklanabilir mi" sorularını cevaplarlar. **Content-Type** = "içerideki paket JSON\'dır" (sunucu böyle ayrıştırır), **Accept** = "bana JSON dilinde cevap ver" (istemcinin tercihi), **Authorization** = "kimliğim bu" (Bearer token), **Cache-Control** = "bu paketi saklama / şu kadar sakla". Peki veri zaten body\'de gidiyorsa, bu görünmez etiketler neden bu kadar önemli? Çünkü header yanlış/eksikse body doğru olsa bile işlem çöker: `Content-Type` eksikse sunucu JSON\'ı düz metin sanır, `Authorization` eksikse 401 alırsın, `Cache-Control` yanlışsa eski veri önbellekten döner ve testin "phantom" bir bug görür. Java\'da bunun karşılığı `@RequestHeader` ve `HttpHeaders`\'tır; header\'lar metot parametresi gibi davranışı yönlendirir. QA açısından header\'lar en sinsi bug kaynağıdır çünkü GÖRÜNMEZLER: Postman\'de çalışan bir istek, otomasyonda header unutulduğu için düşer ve saatlerce "kod aynı ama sonuç farklı" diye debug edilir.',
        en: 'Headers are the **labels and customs paperwork** on a parcel: without touching the contents (body), they answer "what is this, how should it be opened, who sends it, can it be cached". **Content-Type** = "the package inside is JSON" (so the server parses it that way), **Accept** = "reply to me in JSON" (the client\'s preference), **Authorization** = "this is my identity" (Bearer token), **Cache-Control** = "don\'t cache this / cache for this long". But if the data already travels in the body, why do these invisible labels matter so much? Because if a header is wrong/missing, the operation fails even with a correct body: missing `Content-Type` and the server treats JSON as plain text, missing `Authorization` and you get 401, wrong `Cache-Control` and stale data returns from cache so the test sees a "phantom" bug. In Java the equivalent is `@RequestHeader` and `HttpHeaders`; headers steer behavior like method parameters. In QA headers are the most insidious bug source because they are INVISIBLE: a request that works in Postman fails in automation because a header was forgotten, and gets debugged for hours as "same code, different result".',
      },
    },
    { type: 'heading', text: { tr: 'Bir Testerın Bilmesi Gereken Dört Header', en: 'Four Headers a Tester Must Know' } },
    {
      type: 'table',
      headers: ['Header', 'Anlam / Meaning', 'Eksikse / If missing'],
      rows: [
        ['Content-Type', 'Gövdenin tipi (istek) / body type (request)', 'JSON ayrıştırılamaz, boş body / JSON unparsed, empty body'],
        ['Accept', 'İstenen yanıt tipi / desired response type', '406 veya beklenmeyen format / 406 or unexpected format'],
        ['Authorization', 'Kimlik (Bearer token) / identity', '401 Unauthorized'],
        ['Cache-Control', 'Önbellek politikası / cache policy', 'Eski veri döner (phantom bug) / stale data (phantom bug)'],
      ],
    },
    {
      type: 'video-scene',
      id: 'api-a6-headers-film',
      title: { tr: '🎬 Görünmez Suçlu: Postman\'de Çalışıp Otomasyonda Düşen İstek', en: '🎬 The Invisible Culprit: Works in Postman, Fails in Automation' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'postman', emoji: '📮', label: { tr: 'Postman (çalışır)', en: 'Postman (works)' }, color: '#22c55e' },
        { id: 'auto', emoji: '🤖', label: { tr: 'Otomasyon (düşer)', en: 'Automation (fails)' }, color: '#ef4444' },
        { id: 'header', emoji: '📋', label: { tr: 'Content-Type header', en: 'Content-Type header' }, color: '#a78bfa' },
        { id: 'server', emoji: '🖥️', label: { tr: 'Sunucu', en: 'Server' }, color: '#8b5cf6' },
        { id: 'insight', emoji: '💡', label: { tr: 'Kök neden', en: 'Root cause' }, color: '#f59e0b' },
      ],
      scenes: [
        {
          caption: { tr: 'Aynı POST /api/v1/bugs isteği Postman\'de 201 döner ama otomasyon testinde 400 verir. Kod aynı — fark ne?', en: 'The same POST /api/v1/bugs returns 201 in Postman but 400 in the automation test. The code is identical — what differs?' },
          positions: { postman: { x: 30, y: 40, scale: 1.05 }, auto: { x: 30, y: 62, scale: 1.05, pulse: true } },
        },
        {
          caption: { tr: 'Postman, gövdeyi "raw JSON" seçtiğinde `Content-Type: application/json` header\'ını SESSİZCE ekler — sen görmezsin ama gönderilir.', en: 'When you pick "raw JSON", Postman SILENTLY adds the `Content-Type: application/json` header — you don\'t see it, but it is sent.' },
          code: { tr: '(Postman otomatik) Content-Type: application/json', en: '(Postman auto) Content-Type: application/json' },
          positions: { postman: { x: 25, y: 45 }, header: { x: 60, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'postman', to: 'header', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Otomasyon kodu bu header\'ı ELLE eklemeyi unutur. Sunucu gövdeyi JSON sanmaz, boş görür ve "title zorunlu" diyerek 400 döner.', en: 'The automation code forgets to add this header BY HAND. The server does not treat the body as JSON, sees it empty, and returns 400 saying "title required".' },
          code: { tr: '400 Bad Request -> title zorunlu (ama gonderdin!)', en: '400 Bad Request -> title required (but you sent it!)' },
          positions: { auto: { x: 25, y: 45 }, server: { x: 60, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'auto', to: 'server', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Saatlerce "kod doğru ama düşüyor" diye debug edilir. Suçlu görünmez bir header eksikliğidir — body\'de değil.', en: 'It gets debugged for hours as "correct code but failing". The culprit is a missing invisible header — not the body.' },
          positions: { server: { x: 25, y: 45 }, insight: { x: 60, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'server', to: 'insight', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Ders — GUI araçları header\'ları senin için ekleyebilir; otomasyonda hiçbir şey "otomatik" değildir. İki ortamı karşılaştırırken önce header\'lara bak.', en: 'The lesson — GUI tools may add headers for you; in automation nothing is "automatic". When comparing two environments, check headers first.' },
          positions: { insight: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Authorization Header\'ı Neden 401\'in Anahtarıdır?', en: 'Why the Authorization Header Is the Key to 401' },
      steps: [
        { id: 1, icon: '🔑', label: { tr: 'Bearer token gönderilir…', en: 'Bearer token is sent…' }, detail: { tr: '`Authorization: Bearer <token>` header\'ı isteğin kimliğini taşır — sunucu bununla "sen kimsin"i bilir.', en: 'The `Authorization: Bearer <token>` header carries the request\'s identity — with it the server knows "who you are".' } },
        { id: 2, icon: '🚫', label: { tr: 'Header eksikse 401…', en: 'Missing header = 401…' }, detail: { tr: 'Header yoksa sunucu kimliği çözemez ve 401 döner — body ne kadar doğru olursa olsun.', en: 'Without the header the server cannot resolve identity and returns 401 — no matter how correct the body is.' } },
        { id: 3, icon: '⏰', label: { tr: 'Token süresi dolmuşsa da 401…', en: 'Expired token = 401 too…' }, detail: { tr: 'Token varsa ama süresi dolmuşsa yine 401 gelir — tester "eksik mi, süresi mi doldu?" ayrımını yapmalıdır.', en: 'If the token is present but expired you still get 401 — the tester must distinguish "missing vs expired".' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a6-order-01',
      question: { tr: '"Postman\'de çalışıyor, otomasyonda düşüyor" farkını teşhis etme sırasını diz.', en: 'Order the steps to diagnose "works in Postman, fails in automation".' },
      items: [
        { id: '1', text: { tr: 'İki ortamın status kodunu karşılaştır (201 vs 400)', en: 'Compare the status codes of the two environments (201 vs 400)' }, order: 1 },
        { id: '2', text: { tr: 'Postman\'in gönderdiği TÜM header\'ları (Console) incele', en: 'Inspect ALL headers Postman sends (Console)' }, order: 2 },
        { id: '3', text: { tr: 'Otomasyon isteğinin header\'larını yan yana koy', en: 'Put the automation request\'s headers side by side' }, order: 3 },
        { id: '4', text: { tr: 'Eksik header\'ı bul (ör. Content-Type)', en: 'Find the missing header (e.g. Content-Type)' }, order: 4 },
        { id: '5', text: { tr: 'Eksik header\'ı koda ELLE ekle ve tekrar koş', en: 'Add the missing header BY HAND in code and re-run' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a6-headers',
      id: 'api-a6-headers',
      title: { tr: 'Kendin Dene: Eksik Authorization Header\'ını Ekle', en: 'Try It Yourself: Add the Missing Authorization Header' },
      starterCode: `// BUG: korumali endpoint'e header'siz istek -> 401 doner
DELETE /api/v1/bugs/42
Content-Type: application/json`,
      solutionCode: `// FIX: Authorization header'i kimligi tasir -> yetki kontrolu yapilabilir
DELETE /api/v1/bugs/42
Content-Type: application/json
Authorization: Bearer <token>`,
      hint: { tr: 'Korumalı bir endpoint kimlik ister. `Authorization: Bearer <token>` header\'ı olmadan sunucu seni tanımaz ve 401 döner — body ya da diğer header\'lar bunu çözmez.', en: 'A protected endpoint requires identity. Without the `Authorization: Bearer <token>` header the server does not recognize you and returns 401 — the body or other headers won\'t fix it.' },
      successMessage: { tr: 'Doğru! Kimlik header\'da taşınır; eksikse 401, geçersiz/süresi dolmuşsa yine 401 — bu ayrımı test et.', en: 'Correct! Identity travels in the header; missing = 401, invalid/expired = 401 too — test that distinction.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir istek Postman\'de 201, otomasyonda 400 ("title zorunlu") dönüyor ama iki tarafta da title gönderiliyor. En olası kök neden?', en: 'A request returns 201 in Postman but 400 ("title required") in automation, yet title is sent in both. Most likely root cause?' },
      options: [
        { id: 'a', text: { tr: 'Sunucu sadece Postman\'i tanıyor', en: 'The server only recognizes Postman' } },
        { id: 'b', text: { tr: 'Otomasyonda Content-Type header\'ı eksik; sunucu gövdeyi JSON olarak ayrıştıramıyor', en: 'The Content-Type header is missing in automation; the server can\'t parse the body as JSON' } },
        { id: 'c', text: { tr: 'title değeri çok uzun', en: 'The title value is too long' } },
        { id: 'd', text: { tr: 'URL farklı', en: 'The URL is different' } },
      ],
      correct: 'b',
      explanation: { tr: 'Postman raw JSON seçilince Content-Type header\'ını otomatik ekler; otomasyon eklemeyi unutursa sunucu gövdeyi JSON sanmaz, tüm alanları (title dahil) boş görür ve 400 döner. Görünmez header farkı klasik bir tuzaktır.', en: 'Postman auto-adds Content-Type when raw JSON is picked; if automation forgets it, the server doesn\'t treat the body as JSON, sees all fields (including title) empty, and returns 400. The invisible-header gap is a classic trap.' },
      retryQuestion: {
        question: { tr: 'Accept header\'ı ne işe yarar?', en: 'What does the Accept header do?' },
        options: [
          { id: 'a', text: { tr: 'İstemcinin hangi formatta yanıt istediğini söyler (ör. application/json)', en: 'Tells which format the client wants back (e.g. application/json)' } },
          { id: 'b', text: { tr: 'İsteğin gövdesini şifreler', en: 'Encrypts the request body' } },
          { id: 'c', text: { tr: 'Sunucuyu yeniden başlatır', en: 'Restarts the server' } },
          { id: 'd', text: { tr: 'Token üretir', en: 'Generates a token' } },
        ],
        correct: 'a',
        explanation: { tr: 'Accept, istemcinin tercih ettiği yanıt formatını belirtir. Content-Type isteğin gövde tipini, Accept ise beklenen yanıt tipini söyler — ikisi farklı yönlerdir.', en: 'Accept states the client\'s preferred response format. Content-Type describes the request body type, while Accept states the expected response type — two different directions.' },
      },
    },
  ],
}

const A7 = {
  title: { tr: '🧩 A7 · JSON Yapısı: object, array, nested, null', en: '🧩 A7 · JSON Structure: object, array, nested, null' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧩',
      content: {
        tr: 'JSON, verinin **iç içe geçen kutular sistemidir**: bir **object** `{}` etiketli bir kutudur (anahtar→değer), bir **array** `[]` sıralı bir raftır (aynı tip kutular yan yana), **nested** yapı kutunun içindeki kutudur, ve iki sinsi durum vardır — `null` (kutu var ama içi boş) ile **alan yokluğu** (kutu hiç yok). Peki `null` ile "alan hiç yok" aynı şey değil mi, ikisi de "değer yok" demiyor mu? Hayır, ve bu fark bir testerın en çok yanıldığı yerdir: `"reporter": null` sunucunun "bilerek boş bıraktım" demesidir; alanın hiç olmaması ise "bu alanı unuttum/kaldırdım" olabilir — biri veri, diğeri contract kırılması. Java\'da bunun karşılığı `Optional<String> reporter = Optional.empty()` (null, bilinçli boş) ile alanın DTO\'da hiç olmaması (deserialization\'da sessizce atlanır) farkıdır. QA açısından kritik: `if (bug.reporter)` gibi bir kontrol hem `null` hem "yok" durumunda false verir ama bir contract testi ikisini AYIRMALIDIR — çünkü "alan null döndü" bir veri durumu, "alan tamamen kayboldu" ise bir API regresyonudur.',
        en: 'JSON is data as a **system of nested boxes**: an **object** `{}` is a labeled box (key→value), an **array** `[]` is an ordered shelf (same-type boxes side by side), a **nested** structure is a box inside a box, and there are two sneaky states — `null` (the box exists but is empty) vs a **missing field** (the box isn\'t there at all). But aren\'t `null` and "field missing" the same, don\'t both mean "no value"? No, and this difference is where a tester errs most: `"reporter": null` is the server saying "I intentionally left it empty"; the field being entirely absent may mean "I forgot/removed this field" — one is data, the other is a contract break. In Java the equivalent is `Optional<String> reporter = Optional.empty()` (null, deliberately empty) vs the field not existing in the DTO at all (silently skipped in deserialization). The QA crux: a check like `if (bug.reporter)` returns false for both `null` and "missing", but a contract test must DISTINGUISH them — because "field returned null" is a data state, while "field vanished entirely" is an API regression.',
      },
    },
    { type: 'heading', text: { tr: 'Bir Bug Kaydının JSON Anatomisi', en: 'The JSON Anatomy of a Bug Record' } },
    {
      type: 'code',
      language: 'json',
      code: {
        tr: `{
  "id": 42,
  "title": "Odeme ekrani 500 donuyor",
  "severity": "CRITICAL",
  "reporter": null,
  "tags": ["odeme", "regresyon"],
  "assignee": {
    "id": 7,
    "name": "Ayse"
  }
}`,
        en: `{
  "id": 42,
  "title": "Payment screen returns 500",
  "severity": "CRITICAL",
  "reporter": null,
  "tags": ["payment", "regression"],
  "assignee": {
    "id": 7,
    "name": "Ayse"
  }
}`,
      },
    },
    {
      type: 'grid', cols: 2,
      items: [
        { icon: '🔑', label: { tr: 'object {}', en: 'object {}' }, desc: { tr: 'Anahtar→değer çiftleri. Bir bug kaydının kendisi bir object\'tir.', en: 'Key→value pairs. A bug record itself is an object.' } },
        { icon: '📚', label: { tr: 'array []', en: 'array []' }, desc: { tr: 'Sıralı liste. tags gibi çoklu değerler burada durur.', en: 'Ordered list. Multiple values like tags live here.' } },
        { icon: '📦', label: { tr: 'nested', en: 'nested' }, desc: { tr: 'Kutu içinde kutu. assignee bir object içindeki object\'tir.', en: 'Box in a box. assignee is an object inside an object.' } },
        { icon: '👻', label: { tr: 'null vs yok', en: 'null vs missing' }, desc: { tr: 'null = var ama boş; alan yok = contract kırılmış olabilir.', en: 'null = present but empty; missing field = possible contract break.' } },
      ],
    },
    {
      type: 'video-scene',
      id: 'api-a7-json-film',
      title: { tr: '🎬 null mı, Yok mu? Bir Alanın Sessiz Kayboluşu', en: '🎬 null or Missing? The Silent Disappearance of a Field' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'v1', emoji: '📦', label: { tr: 'reporter: null', en: 'reporter: null' }, color: '#0ea5e9' },
        { id: 'v2', emoji: '🕳️', label: { tr: 'reporter yok', en: 'reporter missing' }, color: '#ef4444' },
        { id: 'check', emoji: '🔎', label: { tr: 'if (bug.reporter)', en: 'if (bug.reporter)' }, color: '#a78bfa' },
        { id: 'test', emoji: '🧪', label: { tr: 'Zayıf test', en: 'Weak test' }, color: '#f59e0b' },
        { id: 'contract', emoji: '📜', label: { tr: 'Contract testi', en: 'Contract test' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'İki farklı yanıt: birinde `reporter: null`, diğerinde reporter alanı HİÇ yok. Gözle bakınca ikisi de "boş" görünür.', en: 'Two different responses: one has `reporter: null`, the other has NO reporter field at all. To the eye both look "empty".' },
          positions: { v1: { x: 30, y: 40, scale: 1.05 }, v2: { x: 30, y: 62, scale: 1.05, pulse: true } },
        },
        {
          caption: { tr: 'Zayıf bir test `if (bug.reporter)` yazar. Bu kontrol HER İKİ durumda da false verir — yani ikisini AYIRAMAZ.', en: 'A weak test writes `if (bug.reporter)`. This check returns false in BOTH cases — so it CANNOT tell them apart.' },
          code: { tr: 'if (bug.reporter) // null da yok da false!', en: 'if (bug.reporter) // both null and missing are false!' },
          positions: { v1: { x: 22, y: 40 }, v2: { x: 22, y: 62 }, check: { x: 60, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'v1', to: 'check', color: '#0ea5e9' }, { from: 'v2', to: 'check', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Sonuç — Alan bir gün sessizce kaybolursa (API regresyonu) bu zayıf test hâlâ yeşil verir. Bug fark edilmez.', en: 'The result — if the field silently vanishes one day (an API regression), this weak test still passes green. The bug goes unnoticed.' },
          positions: { check: { x: 25, y: 40 }, test: { x: 60, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'check', to: 'test', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Güçlü bir contract testi ise "reporter anahtarı VAR MI?" diye ayrı sorar — null bir veri durumu, "anahtar yok" bir regresyondur.', en: 'A strong contract test instead asks separately "does the reporter KEY exist?" — null is a data state, "key missing" is a regression.' },
          code: { tr: '"reporter" in bug  &&  bug.reporter === null', en: '"reporter" in bug  &&  bug.reporter === null' },
          positions: { test: { x: 25, y: 40 }, contract: { x: 60, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'test', to: 'contract', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — null ("var ama boş") ile alan yokluğu ("hiç yok") farklıdır. Contract testleri anahtarın VARLIĞINI ayrıca doğrular.', en: 'The lesson — null ("present but empty") differs from a missing field ("not there at all"). Contract tests separately verify the key\'s EXISTENCE.' },
          positions: { contract: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Nested Veriye Güvenle Erişmek', en: 'Safely Accessing Nested Data' },
      steps: [
        { id: 1, icon: '📦', label: { tr: 'assignee bir object…', en: 'assignee is an object…' }, detail: { tr: 'bug.assignee.name\'e erişmek için önce assignee\'nin var olduğundan emin ol; assignee null ise bu erişim patlar.', en: 'To reach bug.assignee.name, first ensure assignee exists; if assignee is null this access blows up.' } },
        { id: 2, icon: '💥', label: { tr: 'null nested = çökme…', en: 'null nested = crash…' }, detail: { tr: 'assignee null iken .name okumak "cannot read property of null" hatası verir — Java\'daki NullPointerException\'ın JS karşılığı.', en: 'Reading .name while assignee is null throws "cannot read property of null" — the JS counterpart of Java\'s NullPointerException.' } },
        { id: 3, icon: '🛡️', label: { tr: 'Önce varlık kontrolü…', en: 'Existence check first…' }, detail: { tr: 'assignee?.name gibi güvenli erişim veya önce null kontrolü, testin gerçek veriyi doğrulamasını sağlar — çökmesini değil.', en: 'Safe access like assignee?.name or a prior null check lets the test verify real data — instead of crashing.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a7-order-01',
      question: { tr: 'Bir JSON yanıtında bir alanın "null mı, yok mu" olduğunu doğru test etme sırasını diz.', en: 'Order the correct way to test whether a field is "null or missing" in a JSON response.' },
      items: [
        { id: '1', text: { tr: 'Yanıtı JSON olarak ayrıştır', en: 'Parse the response as JSON' }, order: 1 },
        { id: '2', text: { tr: 'Anahtarın VAR OLUP OLMADIĞINI kontrol et ("reporter" in bug)', en: 'Check whether the KEY EXISTS ("reporter" in bug)' }, order: 2 },
        { id: '3', text: { tr: 'Anahtar varsa değerinin null olup olmadığına bak', en: 'If the key exists, check whether its value is null' }, order: 3 },
        { id: '4', text: { tr: '"anahtar yok" ile "null" durumlarını farklı raporla', en: 'Report "key missing" and "null" as different states' }, order: 4 },
        { id: '5', text: { tr: '"anahtar yok" ise contract regresyonu olarak escalate et', en: 'If "key missing", escalate as a contract regression' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a7-json-structure',
      id: 'api-a7-json-structure',
      title: { tr: 'Kendin Dene: null ile "Yok"u Ayır', en: 'Try It Yourself: Distinguish null from "Missing"' },
      starterCode: `// BUG: bu kontrol null ile "alan yok"u AYIRAMAZ (ikisi de false)
function hasReporterField(bug) {
  return Boolean(bug.reporter);
}`,
      solutionCode: `// FIX: anahtarin VARLIGINI ayrica kontrol et
function hasReporterField(bug) {
  // "reporter" anahtari var mi? null bile olsa true doner
  return "reporter" in bug;
}`,
      hint: { tr: '`Boolean(bug.reporter)` hem `null` hem "alan yok" durumunda false verir. Anahtarın varlığını test etmek için `"reporter" in bug` kullan; bu, değer null olsa bile anahtar varsa true döner.', en: '`Boolean(bug.reporter)` returns false for both `null` and "field missing". To test key existence use `"reporter" in bug`; it returns true when the key exists even if the value is null.' },
      successMessage: { tr: 'Doğru! Artık "alan null döndü" (veri) ile "alan kayboldu" (contract regresyonu) durumlarını ayırabilirsin.', en: 'Correct! Now you can separate "field returned null" (data) from "field vanished" (contract regression).' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir API yanıtında `reporter` alanı bir gün tamamen kayboldu (önceden null dönüyordu). `if (bug.reporter)` yazan test hâlâ yeşil. Bu neden tehlikeli?', en: 'In an API response the `reporter` field vanished one day (it used to return null). A test writing `if (bug.reporter)` still passes green. Why is this dangerous?' },
      options: [
        { id: 'a', text: { tr: 'Tehlikeli değil, çünkü test geçiyor', en: 'It is not dangerous, because the test passes' } },
        { id: 'b', text: { tr: 'Zayıf kontrol null ile "yok"u ayıramaz; bir contract regresyonu (alanın kaybı) sessizce gizlenir', en: 'The weak check can\'t separate null from "missing"; a contract regression (the field\'s loss) is silently hidden' } },
        { id: 'c', text: { tr: 'Sunucu çökmüştür', en: 'The server has crashed' } },
        { id: 'd', text: { tr: 'JSON geçersizdir', en: 'The JSON is invalid' } },
      ],
      correct: 'b',
      explanation: { tr: '`if (bug.reporter)` hem null hem "alan yok" için false verir; bu yüzden alan tamamen kaybolsa da test davranışı değişmez ve yeşil kalır. Alanın kaybı bir contract regresyonudur — güçlü test anahtarın varlığını (`"reporter" in bug`) ayrıca doğrulamalıdır.', en: '`if (bug.reporter)` returns false for both null and "field missing"; so even if the field vanishes entirely the test behavior is unchanged and stays green. The field\'s loss is a contract regression — a strong test must separately verify key existence (`"reporter" in bug`).' },
      retryQuestion: {
        question: { tr: 'JSON\'da `"assignee": { "id": 7, "name": "Ayse" }` yapısına ne denir?', en: 'What is the `"assignee": { "id": 7, "name": "Ayse" }` structure in JSON called?' },
        options: [
          { id: 'a', text: { tr: 'nested object (iç içe object)', en: 'a nested object' } },
          { id: 'b', text: { tr: 'array', en: 'an array' } },
          { id: 'c', text: { tr: 'null değer', en: 'a null value' } },
          { id: 'd', text: { tr: 'string', en: 'a string' } },
        ],
        correct: 'a',
        explanation: { tr: 'assignee, bir object içindeki başka bir object\'tir — buna nested (iç içe) yapı denir. bug.assignee.name\'e erişmeden önce assignee\'nin null olmadığından emin olmalısın, yoksa erişim çöker.', en: 'assignee is another object inside an object — this is called a nested structure. Before reaching bug.assignee.name you must ensure assignee is not null, otherwise the access crashes.' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP B — API'yi Java + Spring Boot ile Sıfırdan Yazmak (KODLU + Defect şablonu)
// Her konu: simple-box (4 katman) + kod (TR yorum) + 🐞 Defect Doğum Anı + trio + quiz
// ═══════════════════════════════════════════════════════════════════════════

const B1 = {
  title: { tr: '☕ B1 · Proje İskeleti: Maven, spring-boot-starter-web', en: '☕ B1 · Project Skeleton: Maven, spring-boot-starter-web' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '☕',
      content: {
        tr: 'Bir Spring Boot projesi kurmak, bir **restoran açmadan önce mutfağı döşemek** gibidir: henüz tek bir yemek (endpoint) yapmadan önce ocağı, tezgahı ve elektriği (web sunucusu, dependency\'ler, çalıştırma mekanizması) hazırlarsın. `spring-boot-starter-web` bir "başlangıç paketi"dir — tek satır bağımlılık eklersin, arkasında gömülü bir Tomcat sunucusu, JSON dönüştürücü (Jackson) ve tüm web altyapısı gelir. Peki neden her parçayı tek tek eklemek yerine bir "starter" kullanıyoruz? Çünkü uyumlu sürümleri elle eşleştirmek (Tomcat X, Jackson Y, Spring Z) saatler alır ve bir sürüm çakışması tüm uygulamayı çökertir; starter bu uyumlu seti tek kararla getirir. Bunun tester için anlamı: API henüz "iş" yapmasa da `mvn spring-boot:run` ile ayağa kalkmalı ve boş bir `/api/v1/bugs` bile bir yanıt dönebilmelidir — kurulum kırıksa hiçbir test koşamaz. QA açısından ilk "smoke test", uygulamanın hiç hata vermeden başlayıp bir port dinlemesidir; bu geçmeden fonksiyonel testlere geçmek zaman kaybıdır.',
        en: 'Setting up a Spring Boot project is like **fitting out a kitchen before opening a restaurant**: before cooking a single dish (endpoint) you prepare the stove, counter, and electricity (web server, dependencies, run mechanism). `spring-boot-starter-web` is a "starter pack" — you add one dependency line and behind it come an embedded Tomcat server, a JSON converter (Jackson), and the whole web stack. But why use a "starter" instead of adding each piece by hand? Because manually matching compatible versions (Tomcat X, Jackson Y, Spring Z) takes hours and one version clash crashes the whole app; the starter brings that compatible set in a single decision. Its meaning for a tester: even before the API does any "work", `mvn spring-boot:run` must bring it up and even an empty `/api/v1/bugs` should return a response — if setup is broken, no test can run. In QA the first "smoke test" is that the app starts without error and listens on a port; moving to functional tests before that passes is a waste of time.',
      },
    },
    { type: 'heading', text: { tr: 'Minimum İskelet: pom.xml + Uygulama Sınıfı', en: 'Minimum Skeleton: pom.xml + Application Class' } },
    {
      type: 'code',
      language: 'xml',
      code: {
        tr: `<!-- pom.xml: tek starter, tum web altyapisini getirir -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <!-- @Valid ve Bean Validation icin (B6'da kullanilacak) -->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`,
        en: `<!-- pom.xml: one starter brings the whole web stack -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <!-- for @Valid and Bean Validation (used in B6) -->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`,
      },
    },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugTrackerApplication.java — uygulamanin giris noktasi
@SpringBootApplication          // otomatik konfigurasyon + component tarama
public class BugTrackerApplication {
    public static void main(String[] args) {
        // gomulu Tomcat'i baslatir ve 8080 portunu dinler
        SpringApplication.run(BugTrackerApplication.class, args);
    }
}`,
        en: `// BugTrackerApplication.java — the application entry point
@SpringBootApplication          // auto-configuration + component scan
public class BugTrackerApplication {
    public static void main(String[] args) {
        // starts embedded Tomcat and listens on port 8080
        SpringApplication.run(BugTrackerApplication.class, args);
    }
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `spring-boot-starter-validation` unutulursa**\n\n**Kod:** `pom.xml`\'e sadece `starter-web` eklendi, `starter-validation` YOK.\n\n**Ne olur:** B6\'da `@Valid` ile `@NotBlank` yazarsın ama sınıf yolunda validation kütüphanesi olmadığı için Spring bu annotation\'ları SESSİZCE görmezden gelir. `POST /api/v1/bugs { "title": "" }` isteği 400 yerine 201 döner ve boş başlıklı bug kaydedilir.\n\n**Neden sinsi:** Kod derlenir, uygulama başlar, `@Valid` orada durur — hiçbir hata yok. Sadece çalışma zamanında "doğrulama hiç tetiklenmiyor" fark edilir, o da ancak biri boş title göndermeyi denerse.\n\n**Tester nerede yakalar:** Kurulum sonrası ilk negatif testte — boş `title` gönderip 400 beklerken 201 alınca. Bu, "dependency eksikliğinin sessiz davranış değişikliğine" yol açtığının kanıtıdır.',
        en: '**🐞 Defect Birth — if `spring-boot-starter-validation` is forgotten**\n\n**Code:** only `starter-web` was added to `pom.xml`, `starter-validation` is MISSING.\n\n**What happens:** in B6 you write `@Valid` with `@NotBlank`, but with no validation library on the classpath Spring SILENTLY ignores those annotations. A `POST /api/v1/bugs { "title": "" }` returns 201 instead of 400 and an empty-title bug is saved.\n\n**Why sneaky:** the code compiles, the app starts, `@Valid` sits there — no error. Only at runtime is "validation never fires" noticeable, and only if someone tries sending an empty title.\n\n**Where the tester catches it:** on the first negative test after setup — sending an empty `title` and getting 201 while expecting 400. It proves a "missing dependency causing a silent behavior change".',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b1-skeleton-film',
      title: { tr: '🎬 Tek Starter, Koca Bir Web Sunucusu: Boot Nasıl Ayağa Kalkar?', en: '🎬 One Starter, a Whole Web Server: How Boot Starts Up' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'pom', emoji: '📦', label: { tr: 'starter-web', en: 'starter-web' }, color: '#f59e0b' },
        { id: 'tomcat', emoji: '🐱', label: { tr: 'Gömülü Tomcat', en: 'Embedded Tomcat' }, color: '#0ea5e9' },
        { id: 'jackson', emoji: '🔄', label: { tr: 'Jackson (JSON)', en: 'Jackson (JSON)' }, color: '#a78bfa' },
        { id: 'port', emoji: '🚪', label: { tr: 'Port 8080', en: 'Port 8080' }, color: '#22c55e' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Smoke test', en: 'Smoke test' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: '`pom.xml`\'e tek bir satır ekliyorsun: spring-boot-starter-web. Bu tek karar arkasında neleri getiriyor?', en: 'You add a single line to `pom.xml`: spring-boot-starter-web. What does this one decision bring behind it?' },
          positions: { pom: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Starter, gömülü bir Tomcat web sunucusu getirir — ayrı sunucu kurup deploy etmene gerek yok, uygulamanın içindedir.', en: 'The starter brings an embedded Tomcat web server — no separate server to install and deploy, it lives inside the app.' },
          positions: { pom: { x: 22, y: 40 }, tomcat: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'pom', to: 'tomcat', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Aynı starter Jackson\'ı da getirir: Java nesnelerini otomatik JSON\'a çevirir. Bir Bug nesnesi döndürdüğünde JSON\'a dönüşmesi bu yüzdendir.', en: 'The same starter also brings Jackson: it auto-converts Java objects to JSON. That is why returning a Bug object turns into JSON.' },
          positions: { tomcat: { x: 22, y: 40 }, jackson: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'tomcat', to: 'jackson', color: '#a78bfa' }],
        },
        {
          caption: { tr: '`mvn spring-boot:run` — uygulama 8080 portunu dinlemeye başlar. Artık istemciler istek gönderebilir.', en: '`mvn spring-boot:run` — the app starts listening on port 8080. Clients can now send requests.' },
          positions: { jackson: { x: 22, y: 40 }, port: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'jackson', to: 'port', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — İlk smoke test: uygulama hatasız başlıyor ve port dinliyor mu? Bu geçmeden fonksiyonel test koşmak, temeli çürük binaya kat çıkmaktır.', en: 'The lesson — First smoke test: does the app start without error and listen on the port? Running functional tests before this passes is building floors on a rotten foundation.' },
          positions: { port: { x: 25, y: 45 }, tester: { x: 60, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'port', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Kurulumdan İlk Yanıta', en: 'From Setup to First Response' },
      steps: [
        { id: 1, icon: '📦', label: { tr: 'Bağımlılıkları ekle…', en: 'Add dependencies…' }, detail: { tr: 'pom.xml\'e starter-web (+ ileride starter-validation) ekle. Maven bunları indirir.', en: 'Add starter-web (+ later starter-validation) to pom.xml. Maven downloads them.' } },
        { id: 2, icon: '▶️', label: { tr: 'Uygulamayı çalıştır…', en: 'Run the app…' }, detail: { tr: 'mvn spring-boot:run gömülü Tomcat\'i başlatır; log\'da "Started ... on port 8080" görürsün.', en: 'mvn spring-boot:run starts embedded Tomcat; the log shows "Started ... on port 8080".' } },
        { id: 3, icon: '🕵️', label: { tr: 'Smoke test at…', en: 'Run a smoke test…' }, detail: { tr: 'curl http://localhost:8080/api/v1/bugs ile bağlantı kur — 200/empty bile olsa "ayakta" demektir.', en: 'curl http://localhost:8080/api/v1/bugs — even a 200/empty means it is "up".' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b1-order-01',
      question: { tr: 'Spring Boot API\'sini sıfırdan ayağa kaldırma sırasını diz.', en: 'Order the steps to bring up a Spring Boot API from scratch.' },
      items: [
        { id: '1', text: { tr: 'pom.xml\'e spring-boot-starter-web bağımlılığını ekle', en: 'Add the spring-boot-starter-web dependency to pom.xml' }, order: 1 },
        { id: '2', text: { tr: '@SpringBootApplication ile main sınıfını yaz', en: 'Write the main class with @SpringBootApplication' }, order: 2 },
        { id: '3', text: { tr: 'mvn spring-boot:run ile uygulamayı başlat', en: 'Start the app with mvn spring-boot:run' }, order: 3 },
        { id: '4', text: { tr: 'Log\'da "Started on port 8080" satırını gör', en: 'See "Started on port 8080" in the log' }, order: 4 },
        { id: '5', text: { tr: 'curl ile smoke test at, uygulamanın yanıt verdiğini doğrula', en: 'Run a smoke test with curl, verify the app responds' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b1-skeleton',
      id: 'api-b1-skeleton',
      title: { tr: 'Kendin Dene: Eksik Bağımlılığı Ekle', en: 'Try It Yourself: Add the Missing Dependency' },
      starterCode: `<!-- BUG: @Valid kullanacagiz ama validation starter'i eksik -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>`,
      solutionCode: `<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <!-- @Valid annotation'larinin CALISMASI icin sart -->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`,
      hint: { tr: '`@Valid`/`@NotBlank` gibi Bean Validation annotation\'ları yalnızca sınıf yolunda validation kütüphanesi varsa çalışır. `spring-boot-starter-validation` eklenmezse annotation\'lar sessizce yok sayılır.', en: 'Bean Validation annotations like `@Valid`/`@NotBlank` only work if a validation library is on the classpath. Without `spring-boot-starter-validation` the annotations are silently ignored.' },
      successMessage: { tr: 'Doğru! Artık B6\'da yazacağın @Valid gerçekten tetiklenecek ve boş title 400 dönecek.', en: 'Correct! Now the @Valid you\'ll write in B6 actually fires and an empty title returns 400.' },
    },
    {
      type: 'quiz',
      question: { tr: '`spring-boot-starter-validation` eklenmeden `@Valid` + `@NotBlank` yazılırsa ne olur?', en: 'What happens if `@Valid` + `@NotBlank` are written without adding `spring-boot-starter-validation`?' },
      options: [
        { id: 'a', text: { tr: 'Derleme hatası verir, uygulama başlamaz', en: 'A compile error, the app won\'t start' } },
        { id: 'b', text: { tr: 'Annotation\'lar sessizce yok sayılır; boş title 400 yerine 201 döner', en: 'The annotations are silently ignored; empty title returns 201 instead of 400' } },
        { id: 'c', text: { tr: 'Sunucu her istekte çöker', en: 'The server crashes on every request' } },
        { id: 'd', text: { tr: 'Tüm istekler 401 döner', en: 'All requests return 401' } },
      ],
      correct: 'b',
      explanation: { tr: 'Validation kütüphanesi sınıf yolunda yoksa Spring `@Valid`\'i işleyemez ve annotation\'ları sessizce atlar. Kod derlenir, uygulama başlar, ama doğrulama hiç tetiklenmez — boş title kaydedilir. Bu, kurulum eksikliğinin çalışma zamanı davranışını sessizce değiştirmesidir.', en: 'Without the validation library on the classpath, Spring cannot process `@Valid` and silently skips the annotations. The code compiles, the app starts, but validation never fires — an empty title is saved. This is a setup gap silently changing runtime behavior.' },
      retryQuestion: {
        question: { tr: 'spring-boot-starter-web bağımlılığı tek başına neyi getirir?', en: 'What does the spring-boot-starter-web dependency bring on its own?' },
        options: [
          { id: 'a', text: { tr: 'Gömülü web sunucusu (Tomcat) + JSON dönüştürücü (Jackson) + web altyapısı', en: 'An embedded web server (Tomcat) + JSON converter (Jackson) + web stack' } },
          { id: 'b', text: { tr: 'Sadece bir veritabanı', en: 'Only a database' } },
          { id: 'c', text: { tr: 'Bir tarayıcı', en: 'A browser' } },
          { id: 'd', text: { tr: 'Hiçbir şey', en: 'Nothing' } },
        ],
        correct: 'a',
        explanation: { tr: 'starter-web uyumlu bir set getirir: gömülü Tomcat (ayrı sunucu gerekmez), Jackson (Java nesnesi↔JSON) ve Spring MVC web altyapısı. Bu yüzden tek satırla web API\'si yazmaya başlayabilirsin.', en: 'starter-web brings a compatible set: embedded Tomcat (no separate server), Jackson (Java object↔JSON), and Spring MVC web stack. That is why one line lets you start writing a web API.' },
      },
    },
  ],
}

const B2 = {
  title: { tr: '🏷️ B2 · Model/Entity: Bug sınıfı, enum, alan tipleri', en: '🏷️ B2 · Model/Entity: Bug class, enums, field types' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🏷️',
      content: {
        tr: 'Model sınıfı, API\'nin **sözlüğüdür**: bir "bug"ın ne demek olduğunu — hangi alanları var, her alan ne tipte, hangi değerler geçerli — tek yerde tanımlar. `severity` için serbest metin yerine bir **enum** (LOW/MEDIUM/HIGH/CRITICAL) kullanmak, "sadece bu dört kelime kabul edilir" demektir. Peki neden `String severity` bırakmıyoruz, esnek olmaz mı? Çünkü esneklik burada bir tuzaktır: `String` olsa biri `"critical"`, biri `"Critical"`, biri `"acil"` yazar ve raporların, filtrelerin, önceliklendirmenin hepsi bozulur — enum, geçersiz değeri daha kapıda (deserialization\'da) reddeder. Java\'da bunun karşılığı zaten `enum` tipidir; tip sistemi geçersiz durumu derleme/parse zamanında imkânsız kılar (Core Java\'daki "make illegal states unrepresentable" ilkesi). QA açısından model, test verisi üretmenin haritasıdır: hangi alan zorunlu, hangi enum değerleri geçerli, hangi format (email, ISO tarih) bekleniyor — negatif testlerini (geçersiz enum, hatalı tarih) buradan türetirsin.',
        en: 'The model class is the API\'s **dictionary**: it defines in one place what a "bug" means — which fields it has, each field\'s type, which values are valid. Using an **enum** (LOW/MEDIUM/HIGH/CRITICAL) for `severity` instead of free text means "only these four words are accepted". But why not leave it `String severity` — isn\'t that more flexible? Because flexibility here is a trap: as a `String`, one writes `"critical"`, another `"Critical"`, another `"urgent"`, and reports, filters, and prioritization all break — an enum rejects an invalid value right at the gate (during deserialization). In Java the equivalent is the `enum` type itself; the type system makes an invalid state impossible at compile/parse time (Core Java\'s "make illegal states unrepresentable"). In QA the model is the map for producing test data: which field is required, which enum values are valid, which format (email, ISO date) is expected — you derive your negative tests (invalid enum, malformed date) from it.',
      },
    },
    { type: 'heading', text: { tr: 'Bug Modeli ve Enum\'lar', en: 'The Bug Model and Enums' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// Bug.java — API'nin cekirdek modeli (sozlesmenin veri tarafi)
public class Bug {
    private Long id;                 // sunucu uretir
    private String title;            // 3-120 karakter, zorunlu (B6'da dogrulanir)
    private Severity severity;       // enum: sadece 4 gecerli deger
    private Status status;           // enum: OPEN / IN_PROGRESS / CLOSED
    private String reporter;         // email formati
    private Instant createdAt;       // ISO-8601 zaman damgasi
    // getter/setter'lar...
}

// Severity.java — gecersiz oncelik daha kapida reddedilir
public enum Severity { LOW, MEDIUM, HIGH, CRITICAL }

// Status.java — bir bug'in yasam dongusu
public enum Status { OPEN, IN_PROGRESS, CLOSED }`,
        en: `// Bug.java — the API's core model (the data side of the contract)
public class Bug {
    private Long id;                 // generated by the server
    private String title;            // 3-120 chars, required (validated in B6)
    private Severity severity;       // enum: only 4 valid values
    private Status status;           // enum: OPEN / IN_PROGRESS / CLOSED
    private String reporter;         // email format
    private Instant createdAt;       // ISO-8601 timestamp
    // getters/setters...
}

// Severity.java — an invalid priority is rejected at the gate
public enum Severity { LOW, MEDIUM, HIGH, CRITICAL }

// Status.java — a bug's lifecycle
public enum Status { OPEN, IN_PROGRESS, CLOSED }`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `severity` enum yerine `String` bırakılırsa**\n\n**Kod:** `private String severity;` (enum DEĞİL).\n\n**Ne olur:** `POST /api/v1/bugs { "severity": "acil" }` isteği 400 yerine 201 döner; veritabanına geçersiz bir öncelik yazılır. Bir gün sonra "kritik bugları getir" filtresi (`severity == "CRITICAL"`) bu kaydı ISKALAR — kritik bir bug rapor ekranında hiç görünmez.\n\n**Neden sinsi:** Kayıt başarıyla oluşur (201), UI onu listeler, hiçbir hata yoktur. Sorun ancak bir filtre/rapor çalışınca, hem de sessizce ortaya çıkar: yanlış yazılmış öncelik bir "hayalet kayıt" olur.\n\n**Tester nerede yakalar:** Negatif testte — geçersiz bir `severity` değeri (`"acil"`, `"critical"`, `"5"`) gönderip 400 beklerken 201 alınca. Enum olsaydı sunucu bu değeri deserialization\'da reddederdi.',
        en: '**🐞 Defect Birth — if `severity` is left a `String` instead of an enum**\n\n**Code:** `private String severity;` (NOT an enum).\n\n**What happens:** `POST /api/v1/bugs { "severity": "urgent" }` returns 201 instead of 400; an invalid priority is written to the database. A day later the "fetch critical bugs" filter (`severity == "CRITICAL"`) MISSES this record — a critical bug never appears on the report screen.\n\n**Why sneaky:** the record is created successfully (201), the UI lists it, there is no error. The problem surfaces only when a filter/report runs, and silently: a mistyped priority becomes a "ghost record".\n\n**Where the tester catches it:** in a negative test — sending an invalid `severity` (`"urgent"`, `"critical"`, `"5"`) and getting 201 while expecting 400. As an enum, the server would reject the value during deserialization.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b2-model-film',
      title: { tr: '🎬 Enum mu String mi? Geçersiz Önceliğin Hayalet Kaydı', en: '🎬 Enum or String? The Ghost Record of an Invalid Priority' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'req', emoji: '📤', label: { tr: 'severity: "acil"', en: 'severity: "urgent"' }, color: '#f59e0b' },
        { id: 'enumGate', emoji: '🛂', label: { tr: 'enum kapısı', en: 'enum gate' }, color: '#22c55e' },
        { id: 'strGate', emoji: '🕳️', label: { tr: 'String (kapı yok)', en: 'String (no gate)' }, color: '#ef4444' },
        { id: 'db', emoji: '🗄️', label: { tr: 'Veritabanı', en: 'Database' }, color: '#8b5cf6' },
        { id: 'filter', emoji: '🔎', label: { tr: 'Kritik filtresi', en: 'Critical filter' }, color: '#a78bfa' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir istek geçersiz bir öncelikle geliyor: `severity: "acil"` — bu dört geçerli değerden biri değil. Ne olacak, modele bağlı.', en: 'A request arrives with an invalid priority: `severity: "urgent"` — not one of the four valid values. What happens depends on the model.' },
          positions: { req: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Model enum ise: deserialization bir kapı gibi çalışır, "acil" tanınmaz ve istek 400 ile REDDEDİLİR. Geçersiz veri hiç içeri girmez.', en: 'If the model is an enum: deserialization acts like a gate, "urgent" is unrecognized, and the request is REJECTED with 400. Invalid data never gets in.' },
          code: { tr: '400 Bad Request -> gecersiz severity', en: '400 Bad Request -> invalid severity' },
          positions: { req: { x: 22, y: 40 }, enumGate: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'req', to: 'enumGate', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ama model String ise kapı YOKTUR: "acil" olduğu gibi kabul edilir ve veritabanına yazılır. İstek 201 döner — sorun görünmez.', en: 'But if the model is a String there is NO gate: "urgent" is accepted as-is and written to the database. The request returns 201 — the problem is invisible.' },
          positions: { req: { x: 22, y: 40 }, strGate: { x: 45, y: 50 }, db: { x: 72, y: 55, scale: 1.1, pulse: true } },
          beams: [{ from: 'req', to: 'strGate', color: '#ef4444' }, { from: 'strGate', to: 'db', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ertesi gün — "kritik bugları getir" filtresi `severity == "CRITICAL"` arar; "acil" kaydını ISKALAR. Kritik bir bug rapor ekranında yoktur.', en: 'The next day — the "fetch critical bugs" filter looks for `severity == "CRITICAL"`; it MISSES the "urgent" record. A critical bug is absent from the report.' },
          positions: { db: { x: 25, y: 40 }, filter: { x: 60, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'db', to: 'filter', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — Enum, geçersiz durumu kapıda imkânsız kılar. Tester bunu negatif testle avlar: geçersiz enum gönder, 400 bekle. String modeli bu kapıyı kaldırır.', en: 'The lesson — An enum makes an invalid state impossible at the gate. The tester hunts it with a negative test: send an invalid enum, expect 400. A String model removes that gate.' },
          positions: { filter: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Model, Test Verisinin Haritasıdır', en: 'The Model Is the Map for Test Data' },
      steps: [
        { id: 1, icon: '🗺️', label: { tr: 'Zorunlu alanları bul…', en: 'Find required fields…' }, detail: { tr: 'Modelden title\'ın zorunlu olduğunu görürsün → "title\'sız POST" bir negatif test doğar.', en: 'From the model you see title is required → a "POST without title" negative test is born.' } },
        { id: 2, icon: '🎯', label: { tr: 'Enum sınırlarını bul…', en: 'Find enum bounds…' }, detail: { tr: 'severity\'nin 4 geçerli değeri var → "geçersiz enum" (acil, 5, boş) testleri buradan türer.', en: 'severity has 4 valid values → "invalid enum" tests (urgent, 5, empty) derive from here.' } },
        { id: 3, icon: '📅', label: { tr: 'Format kurallarını bul…', en: 'Find format rules…' }, detail: { tr: 'reporter email, createdAt ISO-8601 → hatalı format negatif testleri modelden okunur.', en: 'reporter is email, createdAt is ISO-8601 → malformed-format negative tests are read from the model.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b2-order-01',
      question: { tr: 'Modelden negatif test üretme sırasını diz.', en: 'Order the steps to derive negative tests from the model.' },
      items: [
        { id: '1', text: { tr: 'Modeldeki her alanın tipini ve kuralını oku', en: 'Read each field\'s type and rule in the model' }, order: 1 },
        { id: '2', text: { tr: 'Zorunlu alanları belirle (title)', en: 'Identify required fields (title)' }, order: 2 },
        { id: '3', text: { tr: 'Kısıtlı alanları belirle (severity/status enum)', en: 'Identify constrained fields (severity/status enums)' }, order: 3 },
        { id: '4', text: { tr: 'Her kısıt için sınır-dışı bir değer üret (geçersiz enum, boş title)', en: 'Produce an out-of-bound value per constraint (invalid enum, empty title)' }, order: 4 },
        { id: '5', text: { tr: 'Her negatif testte 400 beklendiğini doğrula', en: 'Verify each negative test expects 400' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b2-model',
      id: 'api-b2-model',
      title: { tr: 'Kendin Dene: severity\'yi Enum Yap', en: 'Try It Yourself: Make severity an Enum' },
      starterCode: `// BUG: severity String -> "acil" gibi gecersiz deger kabul edilir
public class Bug {
    private String title;
    private String severity;   // <- sorun burada
}`,
      solutionCode: `// FIX: enum sadece 4 gecerli degeri kabul eder, gerisini kapida reddeder
public class Bug {
    private String title;
    private Severity severity;
}
public enum Severity { LOW, MEDIUM, HIGH, CRITICAL }`,
      hint: { tr: '`String severity` her metni kabul eder (`"acil"`, `"Critical"`, `"5"`). Bir `enum Severity { LOW, MEDIUM, HIGH, CRITICAL }` tanımlarsan geçersiz değerler deserialization\'da 400 ile reddedilir.', en: 'A `String severity` accepts any text (`"urgent"`, `"Critical"`, `"5"`). Define an `enum Severity { LOW, MEDIUM, HIGH, CRITICAL }` and invalid values are rejected with 400 during deserialization.' },
      successMessage: { tr: 'Doğru! Artık geçersiz öncelikler daha kapıda reddedilir — hayalet kayıt oluşmaz.', en: 'Correct! Now invalid priorities are rejected at the gate — no ghost records.' },
    },
    {
      type: 'quiz',
      question: { tr: '`severity` alanı `String` olarak bırakılırsa, `POST { "severity": "acil" }` isteği ne döner ve asıl risk nedir?', en: 'If `severity` is left as a `String`, what does `POST { "severity": "urgent" }` return, and what is the real risk?' },
      options: [
        { id: 'a', text: { tr: '400 döner, risk yok', en: '400, no risk' } },
        { id: 'b', text: { tr: '201 döner; geçersiz değer kaydedilir ve "kritik" filtreleri onu ıskalar (hayalet kayıt)', en: '201; the invalid value is saved and "critical" filters miss it (a ghost record)' } },
        { id: 'c', text: { tr: '500 döner', en: '500' } },
        { id: 'd', text: { tr: 'Kayıt hiç oluşmaz', en: 'No record is created' } },
      ],
      correct: 'b',
      explanation: { tr: 'String her metni kabul eder, bu yüzden istek 201 döner ve geçersiz "acil" değeri kaydedilir. Sonrasında `severity == "CRITICAL"` filtresi bu kaydı ıskalar; kritik bir bug raporlarda görünmez. Enum kullanmak geçersiz değeri deserialization\'da 400 ile reddederdi.', en: 'A String accepts any text, so the request returns 201 and the invalid "urgent" value is saved. Later a `severity == "CRITICAL"` filter misses this record; a critical bug is invisible in reports. Using an enum would reject the invalid value with 400 during deserialization.' },
      retryQuestion: {
        question: { tr: 'Model sınıfı bir tester için öncelikle neye yarar?', en: 'What is the model class primarily useful for to a tester?' },
        options: [
          { id: 'a', text: { tr: 'Test verisinin haritası: hangi alan zorunlu, hangi enum/format geçerli — negatif testler buradan türer', en: 'A map for test data: which field is required, which enum/format is valid — negative tests derive from it' } },
          { id: 'b', text: { tr: 'UI\'nin rengini belirler', en: 'It sets the UI color' } },
          { id: 'c', text: { tr: 'Sunucunun IP\'sini tutar', en: 'It holds the server IP' } },
          { id: 'd', text: { tr: 'Hiçbir işe yaramaz', en: 'It is useless' } },
        ],
        correct: 'a',
        explanation: { tr: 'Model, alanların tiplerini ve kurallarını (zorunlu, enum değerleri, email/ISO format) tek yerde tanımlar. Tester bunları okuyarak negatif testlerini (boş title, geçersiz enum, hatalı tarih) sistematik olarak türetir.', en: 'The model defines field types and rules (required, enum values, email/ISO format) in one place. By reading them the tester systematically derives negative tests (empty title, invalid enum, malformed date).' },
      },
    },
  ],
}

const B3 = {
  title: { tr: '🗄️ B3 · Repository Katmanı: in-memory Map', en: '🗄️ B3 · Repository Layer: in-memory Map' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🗄️',
      content: {
        tr: 'Repository katmanı, verinin **arşiv memuru**dur: "bu bug\'ı sakla", "42 numaralıyı getir", "sil" gibi ham depolama işlerini yapar — ama HİÇBİR iş kuralı bilmez ("bu kullanıcı silebilir mi?" onun sorusu değildir). Bu sayfada gerçek veritabanı yerine bellek-içi bir `Map<Long, Bug>` kullanacağız; amaç depolama teknolojisini öğrenmek değil, **katmanların sorumluluk ayrımını** görmektir. Peki neden depolamayı ayrı bir katmana koyuyoruz, controller doğrudan Map\'e yazsa olmaz mı? Çünkü depolama bir gün Map\'ten gerçek bir veritabanına dönerse, sadece bu katman değişmeli, üstteki iş mantığı ve controller aynı kalmalı — tek sorumluluk ilkesi. Java\'da bunun karşılığı bir `interface BugRepository` ve onun implementasyonudur; çağıran sadece `save`/`findById` imzasını bilir, arkasının Map mi JPA mı olduğunu bilmez. QA açısından repository, **test izolasyonunun** anahtarıdır: bellek-içi bir repository her test öncesi sıfırlanabilir, böylece testler birbirinin verisini kirletmez — "önceki testten kalan kayıt yüzünden düşen test" kâbusu buradan çözülür.',
        en: 'The repository layer is the data\'s **archive clerk**: it does raw storage jobs — "store this bug", "fetch number 42", "delete" — but knows NO business rules ("can this user delete?" is not its question). On this page, instead of a real database we use an in-memory `Map<Long, Bug>`; the goal is not to learn storage tech but to see the **separation of responsibilities across layers**. But why put storage in a separate layer — couldn\'t the controller write straight to the Map? Because if storage moves from a Map to a real database one day, only this layer should change while the business logic and controller above stay the same — the single-responsibility principle. In Java the equivalent is an `interface BugRepository` and its implementation; the caller knows only the `save`/`findById` signatures, not whether a Map or JPA sits behind it. In QA the repository is the key to **test isolation**: an in-memory repository can be reset before each test, so tests do not pollute each other\'s data — the "test fails because of a record left by the previous test" nightmare is solved here.',
      },
    },
    { type: 'heading', text: { tr: 'Bellek-İçi Repository', en: 'In-Memory Repository' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugRepository.java — sadece HAM depolama, is kurali YOK
@Repository
public class BugRepository {
    private final Map<Long, Bug> store = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    public Bug save(Bug bug) {
        if (bug.getId() == null) {
            bug.setId(sequence.incrementAndGet());  // yeni id uret
        }
        store.put(bug.getId(), bug);                 // sakla/uzerine yaz
        return bug;
    }

    public Optional<Bug> findById(Long id) {
        return Optional.ofNullable(store.get(id));   // yoksa bos Optional
    }

    public List<Bug> findAll() { return new ArrayList<>(store.values()); }

    public boolean deleteById(Long id) {
        return store.remove(id) != null;             // silindi mi?
    }
}`,
        en: `// BugRepository.java — RAW storage only, NO business rules
@Repository
public class BugRepository {
    private final Map<Long, Bug> store = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    public Bug save(Bug bug) {
        if (bug.getId() == null) {
            bug.setId(sequence.incrementAndGet());  // generate new id
        }
        store.put(bug.getId(), bug);                 // store / overwrite
        return bug;
    }

    public Optional<Bug> findById(Long id) {
        return Optional.ofNullable(store.get(id));   // empty Optional if absent
    }

    public List<Bug> findAll() { return new ArrayList<>(store.values()); }

    public boolean deleteById(Long id) {
        return store.remove(id) != null;             // was it deleted?
    }
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `findById` `null` yerine boş `Optional` dönmezse**\n\n**Kod:** `public Bug findById(Long id) { return store.get(id); }` — kayıt yoksa doğrudan `null` döner (Optional yok).\n\n**Ne olur:** Servis katmanı `repository.findById(999).getSeverity()` çağırdığında, olmayan kayıt `null` döner ve `.getSeverity()` bir **NullPointerException** fırlatır. Sonuç: `GET /api/v1/bugs/999` isteği 404 yerine **500 Internal Server Error** döner.\n\n**Neden sinsi:** "Kayıt bulunamadı" aslında normal, beklenen bir durumdur (404) — ama `null` döndürmek onu bir sunucu çökmesine (500) çevirir. Belirtiye bakan tester "sunucu bug\'ı" der, oysa kök neden eksik bir null-güvenliğidir.\n\n**Tester nerede yakalar:** Olmayan bir id ile `GET /api/v1/bugs/999` gönderip 404 beklerken 500 alınca. `Optional` döndürmek, üst katmanı "yoksa 404 dön" demeye zorlar ve çökmeyi engeller.',
        en: '**🐞 Defect Birth — if `findById` returns `null` instead of an empty `Optional`**\n\n**Code:** `public Bug findById(Long id) { return store.get(id); }` — returns `null` directly when the record is absent (no Optional).\n\n**What happens:** when the service calls `repository.findById(999).getSeverity()`, the missing record returns `null` and `.getSeverity()` throws a **NullPointerException**. Result: `GET /api/v1/bugs/999` returns **500 Internal Server Error** instead of 404.\n\n**Why sneaky:** "record not found" is actually a normal, expected case (404) — but returning `null` turns it into a server crash (500). A tester looking at the symptom says "server bug", while the root cause is a missing null-safety.\n\n**Where the tester catches it:** sending `GET /api/v1/bugs/999` with a nonexistent id and getting 500 while expecting 404. Returning `Optional` forces the upper layer to say "return 404 if absent" and prevents the crash.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b3-repository-film',
      title: { tr: '🎬 404 mü 500 mü? Boş Optional ile null Farkı', en: '🎬 404 or 500? Empty Optional vs null' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'req', emoji: '📤', label: { tr: 'GET /bugs/999', en: 'GET /bugs/999' }, color: '#f59e0b' },
        { id: 'repo', emoji: '🗄️', label: { tr: 'Repository', en: 'Repository' }, color: '#0ea5e9' },
        { id: 'nul', emoji: '💥', label: { tr: 'null → NPE', en: 'null → NPE' }, color: '#ef4444' },
        { id: 'opt', emoji: '📭', label: { tr: 'boş Optional', en: 'empty Optional' }, color: '#22c55e' },
        { id: 'resp', emoji: '📥', label: { tr: '404 Not Found', en: '404 Not Found' }, color: '#a78bfa' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir istek olmayan bir kaydı istiyor: GET /api/v1/bugs/999. Repository ne dönerse sonuç ona bağlı.', en: 'A request wants a nonexistent record: GET /api/v1/bugs/999. The outcome depends on what the repository returns.' },
          positions: { req: { x: 25, y: 50 }, repo: { x: 60, y: 50, scale: 1.1, pulse: true } },
          beams: [{ from: 'req', to: 'repo', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Yol A — Repository null döner. Üst katman `.getSeverity()` çağırınca NullPointerException patlar → 500 Internal Server Error.', en: 'Path A — the repository returns null. When the upper layer calls `.getSeverity()`, a NullPointerException blows up → 500 Internal Server Error.' },
          code: { tr: 'store.get(999) -> null -> NPE -> 500', en: 'store.get(999) -> null -> NPE -> 500' },
          positions: { repo: { x: 22, y: 40 }, nul: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'repo', to: 'nul', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Yol B — Repository boş Optional döner. "Kayıt yok" artık bir çökme değil, ele alınabilir bir durumdur.', en: 'Path B — the repository returns an empty Optional. "No record" is no longer a crash but a handleable state.' },
          code: { tr: 'Optional.ofNullable(store.get(999)) -> empty', en: 'Optional.ofNullable(store.get(999)) -> empty' },
          positions: { repo: { x: 22, y: 40 }, opt: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'repo', to: 'opt', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Boş Optional üst katmanı "yoksa 404 dön" demeye zorlar. İstemci doğru, beklenen yanıtı alır: 404 Not Found.', en: 'An empty Optional forces the upper layer to say "return 404 if absent". The client gets the correct, expected response: 404 Not Found.' },
          positions: { opt: { x: 25, y: 40 }, resp: { x: 60, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'opt', to: 'resp', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — "Bulunamadı" normal bir durumdur (404), çökme değil (500). Optional bu farkı yapıya gömer. Tester olmayan id ile 404 bekleyerek doğrular.', en: 'The lesson — "Not found" is a normal state (404), not a crash (500). Optional bakes this difference into the structure. The tester verifies by expecting 404 for a nonexistent id.' },
          positions: { resp: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Katman Ayrımı Neden Test İzolasyonu Getirir?', en: 'Why Layer Separation Brings Test Isolation' },
      steps: [
        { id: 1, icon: '🗄️', label: { tr: 'Repository sadece depolar…', en: 'Repository only stores…' }, detail: { tr: 'Bellek-içi Map, iş kuralı içermez; save/find/delete\'ten ibarettir. Bu yalınlık onu test için ideal yapar.', en: 'The in-memory Map has no business rules; it is just save/find/delete. This simplicity makes it ideal for tests.' } },
        { id: 2, icon: '🔄', label: { tr: 'Her test öncesi sıfırla…', en: 'Reset before each test…' }, detail: { tr: 'Map\'i temizlemek (store.clear()) tüm veriyi siler; her test taze bir durumla başlar.', en: 'Clearing the Map (store.clear()) wipes all data; each test starts from a fresh state.' } },
        { id: 3, icon: '🛡️', label: { tr: 'Testler birbirini kirletmez…', en: 'Tests don\'t pollute each other…' }, detail: { tr: '"Önceki testten kalan kayıt" kaynaklı flaky testler ortadan kalkar — izolasyon repository katmanında sağlanır.', en: 'Flaky tests from "a record left by the previous test" disappear — isolation is achieved at the repository layer.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b3-order-01',
      question: { tr: 'Repository\'yi test için izole etme sırasını diz.', en: 'Order the steps to isolate the repository for testing.' },
      items: [
        { id: '1', text: { tr: 'Bellek-içi Map tabanlı repository kullan', en: 'Use an in-memory Map-based repository' }, order: 1 },
        { id: '2', text: { tr: 'Her testten önce store\'u temizle (clear)', en: 'Clear the store before each test' }, order: 2 },
        { id: '3', text: { tr: 'Testin ihtiyaç duyduğu veriyi kendisi oluştursun', en: 'Let each test create the data it needs' }, order: 3 },
        { id: '4', text: { tr: 'Testi çalıştır ve sonucu doğrula', en: 'Run the test and verify the result' }, order: 4 },
        { id: '5', text: { tr: 'Testten sonra bırakılan durumun sonrakini etkilemediğini garanti et', en: 'Ensure the left-over state does not affect the next test' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b3-repository',
      id: 'api-b3-repository',
      title: { tr: 'Kendin Dene: findById\'yi Null-Güvenli Yap', en: 'Try It Yourself: Make findById Null-Safe' },
      starterCode: `// BUG: kayit yoksa null doner -> ust katmanda NPE -> 500
public Bug findById(Long id) {
    return store.get(id);
}`,
      solutionCode: `// FIX: Optional "yok" durumunu acikca temsil eder -> ust katman 404 doner
public Optional<Bug> findById(Long id) {
    return Optional.ofNullable(store.get(id));
}`,
      hint: { tr: '`store.get(id)` kayıt yoksa `null` döner; üst katmanda `.getSeverity()` çağrılınca NPE ve 500 olur. `Optional.ofNullable(...)` döndürürsen "yok" durumu açıkça temsil edilir ve üst katman 404 üretebilir.', en: '`store.get(id)` returns `null` when absent; calling `.getSeverity()` upstream causes an NPE and 500. Return `Optional.ofNullable(...)` and the "absent" state is explicit, so the upper layer can produce 404.' },
      successMessage: { tr: 'Doğru! Artık "bulunamadı" bir çökme değil, 404 ile ele alınabilen normal bir durum.', en: 'Correct! Now "not found" is not a crash but a normal state handled with 404.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Repository `findById` metodu kayıt yoksa `null` dönüyor. `GET /api/v1/bugs/999` neden 404 yerine 500 döner?', en: 'The repository `findById` returns `null` when absent. Why does `GET /api/v1/bugs/999` return 500 instead of 404?' },
      options: [
        { id: 'a', text: { tr: 'Sunucu gerçekten çökmüştür, kod hatası yoktur', en: 'The server truly crashed, no code issue' } },
        { id: 'b', text: { tr: '`null` üzerinde metot çağrısı NPE fırlatır; "yok" durumu çökmeye dönüşür — Optional bunu 404\'e çevirirdi', en: 'A method call on `null` throws an NPE; "absent" becomes a crash — Optional would turn it into 404' } },
        { id: 'c', text: { tr: 'URL yanlıştır', en: 'The URL is wrong' } },
        { id: 'd', text: { tr: 'Token eksiktir', en: 'The token is missing' } },
      ],
      correct: 'b',
      explanation: { tr: '`null` dönen bir kayıt üzerinde `.getSeverity()` gibi bir çağrı NullPointerException fırlatır ve bu 500\'e dönüşür. Oysa "kayıt yok" beklenen bir durumdur (404). `Optional` döndürmek üst katmanı "yoksa 404 dön" demeye zorlar ve çökmeyi engeller.', en: 'Calling `.getSeverity()` on a `null` record throws a NullPointerException, which becomes a 500. But "record absent" is an expected case (404). Returning `Optional` forces the upper layer to say "return 404 if absent" and prevents the crash.' },
      retryQuestion: {
        question: { tr: 'Bellek-içi Map tabanlı repository\'nin test için en büyük avantajı nedir?', en: 'What is the biggest testing advantage of an in-memory Map-based repository?' },
        options: [
          { id: 'a', text: { tr: 'Her test öncesi sıfırlanabilir; testler birbirinin verisini kirletmez (izolasyon)', en: 'It can be reset before each test; tests do not pollute each other\'s data (isolation)' } },
          { id: 'b', text: { tr: 'Veriyi kalıcı olarak saklar', en: 'It stores data permanently' } },
          { id: 'c', text: { tr: 'İnternet gerektirir', en: 'It requires the internet' } },
          { id: 'd', text: { tr: 'İş kurallarını içerir', en: 'It contains business rules' } },
        ],
        correct: 'a',
        explanation: { tr: 'Bellek-içi repository hızlı ve sıfırlanabilirdir: her testten önce store.clear() ile taze başlar. Böylece "önceki testten kalan kayıt" kaynaklı flaky testler ortadan kalkar — test izolasyonu sağlanır.', en: 'An in-memory repository is fast and resettable: store.clear() before each test starts fresh. This eliminates flaky tests caused by "a record left by the previous test" — test isolation is achieved.' },
      },
    },
  ],
}

const B4 = {
  title: { tr: '⚙️ B4 · Service Katmanı: iş kuralları nerede yaşar', en: '⚙️ B4 · Service Layer: where business rules live' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '⚙️',
      content: {
        tr: 'Service katmanı, API\'nin **karar veren yöneticisidir**: repository ham depolamayı yapar, controller isteği karşılar — ama "bir CLOSED bug tekrar açılabilir mi?", "aynı başlıkla iki bug oluşturulabilir mi?" gibi **iş kuralları** burada yaşar. Peki bu kuralları neden controller\'a ya da repository\'ye koymuyoruz, orada da çalışmaz mı? Çünkü iş kuralı controller\'a girerse her yeni giriş noktası (REST, mesaj kuyruğu, zamanlanmış görev) aynı kuralı tekrar yazmak zorunda kalır ve biri sessizce farklılaşır; repository\'ye girerse depolama teknolojisiyle iş mantığı birbirine yapışır. Service, kuralların **tek doğru kaynağıdır**. Java\'da bunun karşılığı, bir `@Service` sınıfında toplanan ve `@Transactional` ile korunan iş mantığıdır; controller sadece "bunu yap" der, nasıl yapıldığını bilmez. QA açısından service katmanı, en değerli hataların yaşadığı yerdir: bir alan validasyonu değil, bir **iş kuralı ihlali** (kapalı bug\'ın yeniden açılması, çift kayıt) çoğu zaman UI\'dan görünmez ama veriyi sessizce bozar — testerın bu kuralları senaryo bazlı (state geçişleri) test etmesi gerekir.',
        en: 'The service layer is the API\'s **decision-making manager**: the repository does raw storage, the controller receives the request — but **business rules** like "can a CLOSED bug be reopened?", "can two bugs be created with the same title?" live here. But why not put these rules in the controller or the repository — wouldn\'t they work there too? Because if a rule enters the controller, every new entry point (REST, message queue, scheduled job) must re-implement it and one silently diverges; if it enters the repository, storage tech and business logic get glued together. The service is the **single source of truth** for rules. In Java the equivalent is business logic gathered in a `@Service` class and guarded with `@Transactional`; the controller just says "do this" without knowing how. In QA the service layer is where the most valuable defects live: not a field validation but a **business-rule violation** (reopening a closed bug, duplicate records) is often invisible from the UI yet silently corrupts data — the tester must test these rules scenario-based (state transitions).',
      },
    },
    { type: 'heading', text: { tr: 'İş Kuralları Service\'te', en: 'Business Rules in the Service' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugService.java — is kurallari BURADA yasar
@Service
public class BugService {
    private final BugRepository repository;
    public BugService(BugRepository repository) { this.repository = repository; }

    public Bug create(Bug bug) {
        bug.setStatus(Status.OPEN);          // yeni bug her zaman OPEN baslar
        bug.setCreatedAt(Instant.now());
        return repository.save(bug);
    }

    public Bug closeBug(Long id) {
        Bug bug = repository.findById(id)
            .orElseThrow(() -> new BugNotFoundException(id));  // yoksa 404
        // IS KURALI: sadece OPEN/IN_PROGRESS kapatilabilir
        if (bug.getStatus() == Status.CLOSED) {
            throw new IllegalStateException("Bug zaten CLOSED");
        }
        bug.setStatus(Status.CLOSED);
        return repository.save(bug);
    }
}`,
        en: `// BugService.java — business rules live HERE
@Service
public class BugService {
    private final BugRepository repository;
    public BugService(BugRepository repository) { this.repository = repository; }

    public Bug create(Bug bug) {
        bug.setStatus(Status.OPEN);          // a new bug always starts OPEN
        bug.setCreatedAt(Instant.now());
        return repository.save(bug);
    }

    public Bug closeBug(Long id) {
        Bug bug = repository.findById(id)
            .orElseThrow(() -> new BugNotFoundException(id));  // 404 if absent
        // BUSINESS RULE: only OPEN/IN_PROGRESS can be closed
        if (bug.getStatus() == Status.CLOSED) {
            throw new IllegalStateException("Bug already CLOSED");
        }
        bug.setStatus(Status.CLOSED);
        return repository.save(bug);
    }
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — "zaten CLOSED" kuralı unutulursa**\n\n**Kod:** `closeBug` içindeki `if (bug.getStatus() == Status.CLOSED) throw ...` kontrolü YOK; metot doğrudan status\'u CLOSED yapıp kaydediyor.\n\n**Ne olur:** Zaten kapalı bir bug\'a tekrar `PATCH /api/v1/bugs/42/status {"status":"CLOSED"}` gönderilince istek 409/400 yerine 200 döner. Görünürde sorun yok ama eğer kapatma işlemi bir sayaç artırıyor, bildirim gönderiyor veya bir SLA kronometresi durduruyorsa, bu işlemler İKİNCİ kez tetiklenir — çift bildirim, yanlış metrik.\n\n**Neden sinsi:** Tek bir istekte hiçbir şey görünmez; kayıt zaten CLOSED\'du, yine CLOSED. Yan etkiler (bildirim, metrik) sessizce tekrarlanır ve ancak raporlar tutarsızlaşınca fark edilir.\n\n**Tester nerede yakalar:** State-geçiş testinde — bir bug\'ı kapat, sonra AYNI kapatmayı tekrar gönder; ikinci istekte hata (409 Conflict) bekle. İş kuralı yoksa ikinci kapatma sessizce geçer.',
        en: '**🐞 Defect Birth — if the "already CLOSED" rule is forgotten**\n\n**Code:** the `if (bug.getStatus() == Status.CLOSED) throw ...` check inside `closeBug` is MISSING; the method directly sets status to CLOSED and saves.\n\n**What happens:** sending `PATCH /api/v1/bugs/42/status {"status":"CLOSED"}` again to an already-closed bug returns 200 instead of 409/400. It looks fine, but if closing increments a counter, sends a notification, or stops an SLA timer, those side effects fire a SECOND time — duplicate notifications, wrong metrics.\n\n**Why sneaky:** in a single request nothing shows; the record was already CLOSED and is CLOSED again. The side effects (notification, metric) repeat silently and are noticed only when reports become inconsistent.\n\n**Where the tester catches it:** in a state-transition test — close a bug, then send the SAME close again; expect an error (409 Conflict) on the second request. Without the business rule the second close passes silently.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b4-service-film',
      title: { tr: '🎬 İki Kez Kapatmak: Görünmez Yan Etki Nasıl İki Kez Tetiklenir?', en: '🎬 Closing Twice: How an Invisible Side Effect Fires Twice' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'close1', emoji: '📤', label: { tr: '1. Kapat', en: '1st Close' }, color: '#0ea5e9' },
        { id: 'close2', emoji: '📤', label: { tr: '2. Kapat', en: '2nd Close' }, color: '#f59e0b' },
        { id: 'rule', emoji: '🛂', label: { tr: 'İş kuralı', en: 'Business rule' }, color: '#22c55e' },
        { id: 'sideFx', emoji: '🔔', label: { tr: 'Bildirim/metrik', en: 'Notification/metric' }, color: '#a78bfa' },
        { id: 'dup', emoji: '👯', label: { tr: 'Çift tetik!', en: 'Double fire!' }, color: '#ef4444' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir bug kapatılıyor: PATCH .../status {CLOSED}. Kapatma sadece status değiştirmez — bir bildirim gönderir, SLA kronometresini durdurur.', en: 'A bug is closed: PATCH .../status {CLOSED}. Closing does not just change status — it sends a notification and stops the SLA timer.' },
          positions: { close1: { x: 30, y: 50 }, sideFx: { x: 62, y: 50, scale: 1.1, pulse: true } },
          beams: [{ from: 'close1', to: 'sideFx', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Aynı kapatma isteği tekrar geliyor (çift tık, retry, race). Kayıt zaten CLOSED. Şimdi iş kuralı devreye girmeli.', en: 'The same close request arrives again (double click, retry, race). The record is already CLOSED. Now the business rule must step in.' },
          positions: { close2: { x: 30, y: 50, pulse: true }, rule: { x: 62, y: 50, scale: 1.1 } },
          beams: [{ from: 'close2', to: 'rule', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Kural VARSA: "zaten CLOSED" kontrolü ikinci isteği 409 Conflict ile reddeder. Yan etki bir kez çalışır. Sistem tutarlı kalır.', en: 'If the rule EXISTS: the "already CLOSED" check rejects the second request with 409 Conflict. The side effect runs once. The system stays consistent.' },
          code: { tr: 'if (status == CLOSED) throw -> 409', en: 'if (status == CLOSED) throw -> 409' },
          positions: { rule: { x: 25, y: 40, scale: 1.15, pulse: true } },
          beams: [],
        },
        {
          caption: { tr: 'Kural YOKSA: ikinci kapatma sessizce geçer (200), bildirim İKİNCİ kez gider, metrik iki kez artar — sessiz ama yayılan bir bozulma.', en: 'If the rule is MISSING: the second close passes silently (200), the notification goes a SECOND time, the metric increments twice — a silent but spreading corruption.' },
          positions: { close2: { x: 22, y: 40 }, dup: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'close2', to: 'dup', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — İş kuralları service katmanında yaşar ve state geçişlerini korur. Tester bunları senaryo bazlı test eder: "kapat, tekrar kapat, 409 bekle".', en: 'The lesson — Business rules live in the service layer and guard state transitions. The tester tests them scenario-based: "close, close again, expect 409".' },
          positions: { dup: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'İş Kuralı Neden Controller\'da Değil Service\'te?', en: 'Why the Rule Belongs in the Service, Not the Controller' },
      steps: [
        { id: 1, icon: '🎛️', label: { tr: 'Controller sadece kapı…', en: 'Controller is just a door…' }, detail: { tr: 'Controller isteği alır ve service\'e devreder; iş kuralı bilmez. Farklı giriş noktaları aynı service\'i kullanır.', en: 'The controller receives the request and delegates to the service; it knows no rule. Different entry points use the same service.' } },
        { id: 2, icon: '⚙️', label: { tr: 'Service tek doğru kaynak…', en: 'Service is the single source…' }, detail: { tr: 'Kural service\'te tek yerde durursa REST, kuyruk, zamanlanmış görev — hepsi aynı kuralı uygular.', en: 'With the rule in one place in the service, REST, queue, scheduled job — all apply the same rule.' } },
        { id: 3, icon: '🐞', label: { tr: 'Dağıtılırsa sessiz sapma…', en: 'Scatter it = silent drift…' }, detail: { tr: 'Kural birden çok yere kopyalanırsa biri güncellenmez ve sessizce farklılaşır — en zor bulunan bug sınıfı.', en: 'Copy the rule to many places and one is not updated and silently diverges — the hardest bug class to find.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b4-order-01',
      question: { tr: '"Zaten kapalı bir bug tekrar kapatılamaz" kuralını test etme sırasını diz.', en: 'Order the steps to test "an already-closed bug cannot be closed again".' },
      items: [
        { id: '1', text: { tr: 'OPEN bir bug oluştur', en: 'Create an OPEN bug' }, order: 1 },
        { id: '2', text: { tr: 'Bug\'ı kapat, 200 ve status CLOSED doğrula', en: 'Close the bug, verify 200 and status CLOSED' }, order: 2 },
        { id: '3', text: { tr: 'AYNI kapatma isteğini tekrar gönder', en: 'Send the SAME close request again' }, order: 3 },
        { id: '4', text: { tr: 'İkinci istekte 409 Conflict bekle', en: 'Expect 409 Conflict on the second request' }, order: 4 },
        { id: '5', text: { tr: 'Yan etkinin (bildirim/metrik) tek kez çalıştığını doğrula', en: 'Verify the side effect (notification/metric) ran only once' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b4-service',
      id: 'api-b4-service',
      title: { tr: 'Kendin Dene: İş Kuralını Ekle', en: 'Try It Yourself: Add the Business Rule' },
      starterCode: `// BUG: zaten CLOSED bir bug tekrar kapatilabiliyor -> yan etki iki kez calisir
public Bug closeBug(Long id) {
    Bug bug = repository.findById(id).orElseThrow(() -> new BugNotFoundException(id));
    bug.setStatus(Status.CLOSED);
    return repository.save(bug);
}`,
      solutionCode: `public Bug closeBug(Long id) {
    Bug bug = repository.findById(id).orElseThrow(() -> new BugNotFoundException(id));
    // IS KURALI: zaten CLOSED ise reddet (yan etkinin tekrarini onler)
    if (bug.getStatus() == Status.CLOSED) {
        throw new IllegalStateException("Bug zaten CLOSED");
    }
    bug.setStatus(Status.CLOSED);
    return repository.save(bug);
}`,
      hint: { tr: 'State geçişini korumak için, kapatmadan önce bug\'ın zaten CLOSED olup olmadığını kontrol et. Kontrol yoksa ikinci kapatma sessizce geçer ve bildirim/metrik gibi yan etkiler tekrar tetiklenir.', en: 'To guard the state transition, check whether the bug is already CLOSED before closing. Without the check the second close passes silently and side effects like notification/metric fire again.' },
      successMessage: { tr: 'Doğru! Artık ikinci kapatma 409/hatayla reddedilir ve yan etki tek kez çalışır.', en: 'Correct! Now the second close is rejected with an error/409 and the side effect runs once.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Service\'te "zaten CLOSED reddedilir" kuralı yoksa, kapalı bir bug\'a ikinci kez kapatma isteği gelince asıl risk nedir?', en: 'Without the "reject if already CLOSED" rule in the service, what is the real risk when a second close request hits a closed bug?' },
      options: [
        { id: 'a', text: { tr: 'Hiç risk yok, status zaten CLOSED', en: 'No risk, the status is already CLOSED' } },
        { id: 'b', text: { tr: 'Kapatmanın yan etkileri (bildirim, SLA, metrik) ikinci kez tetiklenir — sessiz veri/metrik bozulması', en: 'The close\'s side effects (notification, SLA, metric) fire a second time — silent data/metric corruption' } },
        { id: 'c', text: { tr: 'Sunucu çöker', en: 'The server crashes' } },
        { id: 'd', text: { tr: 'URL 404 döner', en: 'The URL returns 404' } },
      ],
      correct: 'b',
      explanation: { tr: 'Status görünürde değişmese de, kapatma işlemine bağlı yan etkiler (bildirim gönderme, metrik artırma, SLA durdurma) ikinci istekte tekrar çalışır. İş kuralı (zaten CLOSED ise 409) bu tekrarı engeller. Tester bunu state-geçiş senaryosuyla yakalar.', en: 'Even if the status seems unchanged, side effects tied to closing (sending notifications, incrementing metrics, stopping SLA) run again on the second request. The business rule (409 if already CLOSED) prevents the repeat. The tester catches it with a state-transition scenario.' },
      retryQuestion: {
        question: { tr: 'Bir iş kuralı neden repository veya controller yerine service katmanında yaşamalıdır?', en: 'Why should a business rule live in the service layer rather than the repository or controller?' },
        options: [
          { id: 'a', text: { tr: 'Service tek doğru kaynaktır; tüm giriş noktaları aynı kuralı uygular, kural dağıtılmaz', en: 'The service is the single source of truth; all entry points apply the same rule, the rule is not scattered' } },
          { id: 'b', text: { tr: 'Service en hızlı katmandır', en: 'The service is the fastest layer' } },
          { id: 'c', text: { tr: 'Repository iş kurallarını daha iyi saklar', en: 'The repository stores business rules better' } },
          { id: 'd', text: { tr: 'Controller veritabanına daha yakındır', en: 'The controller is closer to the database' } },
        ],
        correct: 'a',
        explanation: { tr: 'İş kuralı service\'te tek yerde dururse REST, mesaj kuyruğu, zamanlanmış görev gibi tüm giriş noktaları aynı kuralı uygular. Controller\'a/repository\'ye dağıtılırsa biri sessizce farklılaşır (drift) ve bulunması en zor bug sınıfı doğar.', en: 'With the rule in one place in the service, all entry points (REST, message queue, scheduled job) apply the same rule. Scattered into the controller/repository, one silently diverges (drift), producing the hardest bug class to find.' },
      },
    },
  ],
}
const B5 = {
  title: { tr: '🎛️ B5 · Controller: @RestController, path/query param', en: '🎛️ B5 · Controller: @RestController, path/query param' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🎛️',
      content: {
        tr: 'Controller katmanı, API\'nin **resepsiyon görevlisidir**: gelen HTTP isteğini karşılar, "hangi yol, hangi metod, hangi parametreler" diye ayrıştırır ve doğru service metoduna yönlendirir — kendisi iş yapmaz, yönlendirir. İki tür parametreyi ayırt eder: **path variable** (yolun İÇİNDE, bir kaynağı KİMLİKLER — `/api/v1/bugs/42`\'deki `42`) ve **query param** (yolun SONUNDA `?` ile, listeyi SÜZER/sayfalar — `?status=OPEN&page=2`). Peki ikisi de "parametre" ise neden ayrı kavramlar? Çünkü niyetleri farklıdır: path variable "hangi kaydı" (tekil, zorunlu), query param "nasıl filtreleyeyim" (opsiyonel, çoğul) der — birini diğerinin yerine koymak URL tasarımını ve testleri bozar. Java\'da bunun karşılığı `@PathVariable Long id` ile `@RequestParam(required=false) String status` ayrımıdır; Spring bu annotation\'larla URL parçalarını metot parametrelerine bağlar. QA açısından controller, **sınır testlerinin** kapısıdır: eksik/yanlış tipte path variable (`/bugs/abc`), tanımsız query param, sayfalama sınırları (`page=-1`, `size=99999`) — bu girdiler çoğu bug\'ın doğduğu yerdir ve controller seviyesinde test edilir.',
        en: 'The controller layer is the API\'s **receptionist**: it receives the incoming HTTP request, parses "which path, which method, which parameters", and routes to the right service method — it does no work itself, it routes. It distinguishes two parameter kinds: a **path variable** (INSIDE the path, IDENTIFIES a resource — the `42` in `/api/v1/bugs/42`) and a **query param** (at the END with `?`, FILTERS/paginates the list — `?status=OPEN&page=2`). But if both are "parameters", why separate concepts? Because their intents differ: a path variable says "which record" (singular, required), a query param says "how do I filter" (optional, plural) — swapping one for the other breaks URL design and tests. In Java the equivalent is the `@PathVariable Long id` vs `@RequestParam(required=false) String status` distinction; Spring binds URL parts to method parameters via these annotations. In QA the controller is the gate of **boundary tests**: missing/wrong-typed path variable (`/bugs/abc`), undefined query param, pagination bounds (`page=-1`, `size=99999`) — these inputs are where most bugs are born and are tested at the controller level.',
      },
    },
    { type: 'heading', text: { tr: 'Controller: Yol, Path Variable, Query Param', en: 'Controller: Path, Path Variable, Query Param' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugController.java — istekleri karsilar ve service'e yonlendirir
@RestController
@RequestMapping("/api/v1/bugs")     // tum yollar bu prefix ile baslar
public class BugController {
    private final BugService service;
    public BugController(BugService service) { this.service = service; }

    // GET /api/v1/bugs?status=OPEN&page=0&size=20  -> query param ile filtre
    @GetMapping
    public List<Bug> list(
        @RequestParam(required = false) Status status,   // opsiyonel filtre
        @RequestParam(defaultValue = "0") int page,       // sayfalama
        @RequestParam(defaultValue = "20") int size) {
        return service.list(status, page, size);
    }

    // GET /api/v1/bugs/42  -> path variable ile tekil kayit
    @GetMapping("/{id}")
    public Bug getOne(@PathVariable Long id) {
        return service.getById(id);                        // yoksa 404 (B7)
    }
}`,
        en: `// BugController.java — receives requests and routes to the service
@RestController
@RequestMapping("/api/v1/bugs")     // all paths start with this prefix
public class BugController {
    private final BugService service;
    public BugController(BugService service) { this.service = service; }

    // GET /api/v1/bugs?status=OPEN&page=0&size=20  -> filter via query params
    @GetMapping
    public List<Bug> list(
        @RequestParam(required = false) Status status,   // optional filter
        @RequestParam(defaultValue = "0") int page,       // pagination
        @RequestParam(defaultValue = "20") int size) {
        return service.list(status, page, size);
    }

    // GET /api/v1/bugs/42  -> single record via path variable
    @GetMapping("/{id}")
    public Bug getOne(@PathVariable Long id) {
        return service.getById(id);                        // 404 if absent (B7)
    }
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — sayfalama `size` sınırlanmazsa**\n\n**Kod:** `@RequestParam(defaultValue = "20") int size` — üst sınır yok; `size` doğrudan service\'e/DB\'ye geçiyor.\n\n**Ne olur:** `GET /api/v1/bugs?size=1000000` isteği milyonlarca kaydı tek yanıtta çekmeye çalışır. Sunucu belleği şişer, yanıt saniyelerce sürer veya OutOfMemory ile 500 döner. Kötü niyetli tek bir istek servisi yavaşlatabilir (DoS).\n\n**Neden sinsi:** Normal kullanımda (`size=20`) her şey mükemmel çalışır, testler geçer. Sorun yalnızca sınır-dışı bir değerle ortaya çıkar — kimse "ya biri size=1000000 gönderirse?" diye düşünmediği için production\'a kadar gizli kalır.\n\n**Tester nerede yakalar:** Sınır testinde — `size=0`, `size=-1`, `size=999999` gönderip makul bir davranış (400 veya sabit üst sınıra kırpma) beklerken sunucunun zorlandığını/500 döndüğünü görünce. Controller, bu tür girdi sınırlarının test edildiği katmandır.',
        en: '**🐞 Defect Birth — if pagination `size` is not capped**\n\n**Code:** `@RequestParam(defaultValue = "20") int size` — no upper bound; `size` flows straight to the service/DB.\n\n**What happens:** `GET /api/v1/bugs?size=1000000` tries to pull millions of records in one response. Server memory balloons, the response takes seconds or returns 500 with OutOfMemory. A single malicious request can slow the service (DoS).\n\n**Why sneaky:** in normal use (`size=20`) everything works perfectly and tests pass. The problem only appears with an out-of-bound value — since nobody thinks "what if someone sends size=1000000?", it stays hidden until production.\n\n**Where the tester catches it:** in a boundary test — sending `size=0`, `size=-1`, `size=999999` and expecting sane behavior (400 or clamping to a fixed max) while seeing the server struggle/return 500. The controller is the layer where such input bounds are tested.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b5-controller-film',
      title: { tr: '🎬 Path mi Query mi? Bir URL Nasıl Doğru Yönlendirilir', en: '🎬 Path or Query? How a URL Is Routed Correctly' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'url', emoji: '🔗', label: { tr: '/bugs/42?status=OPEN', en: '/bugs/42?status=OPEN' }, color: '#f59e0b' },
        { id: 'path', emoji: '🆔', label: { tr: 'PathVariable id=42', en: 'PathVariable id=42' }, color: '#0ea5e9' },
        { id: 'query', emoji: '🔎', label: { tr: 'RequestParam status', en: 'RequestParam status' }, color: '#a78bfa' },
        { id: 'ctrl', emoji: '🎛️', label: { tr: 'Controller', en: 'Controller' }, color: '#8b5cf6' },
        { id: 'svc', emoji: '⚙️', label: { tr: 'Service', en: 'Service' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir URL geliyor: `/api/v1/bugs/42?status=OPEN`. İçinde iki tür parametre var — controller bunları nasıl ayırır?', en: 'A URL arrives: `/api/v1/bugs/42?status=OPEN`. It has two kinds of parameters — how does the controller separate them?' },
          positions: { url: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Yolun İÇİNDEKİ `42` bir path variable\'dır: "hangi kaydı" der. Controller onu @PathVariable Long id\'ye bağlar — tekil, zorunlu.', en: 'The `42` INSIDE the path is a path variable: it says "which record". The controller binds it to @PathVariable Long id — singular, required.' },
          code: { tr: '@PathVariable Long id  <-  42', en: '@PathVariable Long id  <-  42' },
          positions: { url: { x: 22, y: 40 }, path: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'url', to: 'path', color: '#0ea5e9' }],
        },
        {
          caption: { tr: '`?` sonrasındaki `status=OPEN` bir query param\'dır: "nasıl süzeyim" der. Controller onu @RequestParam\'a bağlar — opsiyonel, filtreleme.', en: 'The `status=OPEN` after `?` is a query param: it says "how do I filter". The controller binds it to @RequestParam — optional, for filtering.' },
          code: { tr: '@RequestParam Status status  <-  OPEN', en: '@RequestParam Status status  <-  OPEN' },
          positions: { url: { x: 22, y: 40 }, query: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'url', to: 'query', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Controller iki parçayı doğru bağlayıp service\'e devreder: "42 numaralı bug\'ı, OPEN filtresiyle getir". Kendisi iş yapmaz, yönlendirir.', en: 'The controller binds both parts correctly and delegates to the service: "fetch bug 42 with the OPEN filter". It does no work, it routes.' },
          positions: { ctrl: { x: 30, y: 50 }, svc: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'ctrl', to: 'svc', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — path variable "hangi kaydı" (kimlik), query param "nasıl filtreleyeyim" (opsiyon) der. Tester sınırları burada zorlar: /bugs/abc, size=-1, tanımsız param.', en: 'The lesson — a path variable says "which record" (identity), a query param says "how do I filter" (option). The tester pushes bounds here: /bugs/abc, size=-1, undefined params.' },
          positions: { svc: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Controller Seviyesinde Sınır Testleri', en: 'Boundary Tests at the Controller Level' },
      steps: [
        { id: 1, icon: '🔤', label: { tr: 'Yanlış tip path variable…', en: 'Wrong-typed path variable…' }, detail: { tr: '/api/v1/bugs/abc — id Long beklenirken metin gelir. Spring bunu 400 ile reddetmeli; etmiyorsa bug.', en: '/api/v1/bugs/abc — id expects Long but text arrives. Spring should reject with 400; if not, a bug.' } },
        { id: 2, icon: '📏', label: { tr: 'Sayfalama sınırları…', en: 'Pagination bounds…' }, detail: { tr: 'size=-1, size=0, size=999999 — makul davranış mı (400/kırpma) yoksa çökme mi? Sınır her zaman test edilir.', en: 'size=-1, size=0, size=999999 — sane behavior (400/clamp) or a crash? Bounds are always tested.' } },
        { id: 3, icon: '❓', label: { tr: 'Tanımsız query param…', en: 'Undefined query param…' }, detail: { tr: 'Geçersiz bir status değeri (?status=UNKNOWN) enum\'a çevrilemez — 400 beklenir, sessiz görmezden gelme değil.', en: 'An invalid status value (?status=UNKNOWN) can\'t map to the enum — expect 400, not silent ignoring.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b5-order-01',
      question: { tr: 'Bir controller endpoint\'inin sınır testlerini planlama sırasını diz.', en: 'Order the steps to plan boundary tests for a controller endpoint.' },
      items: [
        { id: '1', text: { tr: 'Path variable\'ın tipini/kuralını belirle (id: Long)', en: 'Identify the path variable\'s type/rule (id: Long)' }, order: 1 },
        { id: '2', text: { tr: 'Yanlış tip gönder (/bugs/abc), 400 bekle', en: 'Send a wrong type (/bugs/abc), expect 400' }, order: 2 },
        { id: '3', text: { tr: 'Query paramların sınırlarını belirle (page, size)', en: 'Identify query param bounds (page, size)' }, order: 3 },
        { id: '4', text: { tr: 'Sınır-dışı değerler gönder (size=-1, size=999999)', en: 'Send out-of-bound values (size=-1, size=999999)' }, order: 4 },
        { id: '5', text: { tr: 'Her durumda makul bir yanıt (400/kırpma) doğrula', en: 'Verify a sane response (400/clamp) in each case' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b5-controller',
      id: 'api-b5-controller',
      title: { tr: 'Kendin Dene: Sayfalama size\'ını Sınırla', en: 'Try It Yourself: Cap the Pagination size' },
      starterCode: `// BUG: size ust sinirsiz -> size=1000000 sunucuyu bogar (DoS riski)
@GetMapping
public List<Bug> list(@RequestParam(defaultValue = "20") int size) {
    return service.list(size);
}`,
      solutionCode: `// FIX: size'i makul bir ust sinira kirp (or. 100)
@GetMapping
public List<Bug> list(@RequestParam(defaultValue = "20") int size) {
    int safeSize = Math.min(Math.max(size, 1), 100);  // 1..100 araligina kirp
    return service.list(safeSize);
}`,
      hint: { tr: '`size` doğrudan service\'e geçerse `size=1000000` sunucuyu boğabilir. `Math.min(size, 100)` gibi bir üst sınırla (ve alt sınırla) kırparak sınır-dışı değerleri güvenli hale getir.', en: 'If `size` flows straight to the service, `size=1000000` can overwhelm the server. Clamp with an upper (and lower) bound like `Math.min(size, 100)` to make out-of-bound values safe.' },
      successMessage: { tr: 'Doğru! Artık aşırı büyük size değerleri güvenli sınıra kırpılır — tek bir istekle DoS riski kalkar.', en: 'Correct! Now oversized size values are clamped to a safe bound — the single-request DoS risk is gone.' },
    },
    {
      type: 'quiz',
      question: { tr: '`GET /api/v1/bugs?size=1000000` isteği neden bir bug kaynağıdır ve tester bunu nasıl yakalar?', en: 'Why is `GET /api/v1/bugs?size=1000000` a bug source, and how does the tester catch it?' },
      options: [
        { id: 'a', text: { tr: 'Değildir; büyük size iyidir', en: 'It is not; a large size is good' } },
        { id: 'b', text: { tr: 'Sınırsız size sunucuyu boğabilir (bellek/yavaşlık/DoS); tester sınır testiyle (size=-1, 999999) yakalar', en: 'An uncapped size can overwhelm the server (memory/slowness/DoS); the tester catches it with boundary tests (size=-1, 999999)' } },
        { id: 'c', text: { tr: 'Sadece 404 döner', en: 'It just returns 404' } },
        { id: 'd', text: { tr: 'Token gerektirir', en: 'It requires a token' } },
      ],
      correct: 'b',
      explanation: { tr: 'Üst sınırı olmayan `size` milyonlarca kaydı tek yanıtta çekmeye çalışır; bellek şişer, yanıt yavaşlar veya 500 gelir — tek istekle DoS. Normal değerlerde (20) her şey iyi görünür, bu yüzden yalnızca sınır testleri (size=-1, 0, 999999) bunu ortaya çıkarır. Çözüm: size\'ı makul bir üst sınıra kırpmak.', en: 'An uncapped `size` tries to pull millions of records in one response; memory balloons, responses slow, or 500 appears — a single-request DoS. With normal values (20) all looks fine, so only boundary tests (size=-1, 0, 999999) reveal it. The fix: clamp size to a sane maximum.' },
      retryQuestion: {
        question: { tr: '`/api/v1/bugs/42` içindeki `42` ile `?status=OPEN` arasındaki fark nedir?', en: 'What is the difference between the `42` in `/api/v1/bugs/42` and `?status=OPEN`?' },
        options: [
          { id: 'a', text: { tr: '42 bir path variable\'dır (hangi kaydı, tekil/zorunlu); status bir query param\'dır (nasıl filtre, opsiyonel)', en: '42 is a path variable (which record, singular/required); status is a query param (how to filter, optional)' } },
          { id: 'b', text: { tr: 'İkisi de aynıdır', en: 'They are identical' } },
          { id: 'c', text: { tr: '42 filtre, status kimliktir', en: '42 is a filter, status is an identity' } },
          { id: 'd', text: { tr: 'İkisi de header\'dır', en: 'Both are headers' } },
        ],
        correct: 'a',
        explanation: { tr: 'Path variable yolun içindedir ve bir kaynağı kimlikler (`/bugs/42` → 42 numaralı bug). Query param `?` sonrasındadır ve listeyi süzer/sayfalar (`?status=OPEN`). Niyetleri farklıdır: biri "hangi kayıt", diğeri "nasıl filtreleyeyim".', en: 'A path variable is inside the path and identifies a resource (`/bugs/42` → bug 42). A query param follows `?` and filters/paginates the list (`?status=OPEN`). Their intents differ: one is "which record", the other is "how do I filter".' },
      },
    },
  ],
}

const B6 = {
  title: { tr: '✅ B6 · POST + @Valid: Bean Validation', en: '✅ B6 · POST + @Valid: Bean Validation' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '✅',
      content: {
        tr: '`@Valid`, API\'nin **kapı bekçisidir**: bir POST isteği içeri girmeden önce gövdedeki her alanı kurallara göre yoklar — `title` boş mu, 3-120 karakter mi, `reporter` gerçek bir email mi? Kurala uymayan istek daha service\'e VARMADAN 400 ile geri çevrilir. Peki UI zaten boş başlığı JavaScript ile engelliyorsa, sunucuda ayrıca doğrulamaya neden gerek var? Çünkü UI sadece BİR istemcidir: mobil uygulama, Postman, başka bir servis veya kötü niyetli bir script doğrudan API\'ye vurabilir ve UI\'nın JS kontrolünü tamamen atlar — sunucu doğrulaması, güvenilebilecek TEK savunma hattıdır. Java\'da bunun karşılığı Bean Validation\'dır: DTO alanlarına `@NotBlank`, `@Size(min=3,max=120)`, `@Email` annotation\'ları koyarsın ve `@Valid` bunları tetikler; controller metodu hiç çalışmadan hatalı istek reddedilir. QA açısından bu, en klasik "yanlış güven" tuzağının panzehiridir: "UI valide ediyor, o yüzden API güvenli" varsayımı yanlıştır — tester UI\'yı bypass edip doğrudan API\'ye geçersiz veri göndererek sunucu doğrulamasını KANITLAMALIDIR.',
        en: '`@Valid` is the API\'s **gatekeeper**: before a POST request gets in, it checks every field in the body against rules — is `title` blank, is it 3-120 chars, is `reporter` a real email? A non-conforming request is turned back with 400 BEFORE it even reaches the service. But if the UI already blocks an empty title with JavaScript, why validate again on the server? Because the UI is just ONE client: a mobile app, Postman, another service, or a malicious script can hit the API directly and bypass the UI\'s JS check entirely — server validation is the ONLY defense line you can trust. In Java the equivalent is Bean Validation: you put `@NotBlank`, `@Size(min=3,max=120)`, `@Email` annotations on DTO fields and `@Valid` fires them; the bad request is rejected before the controller method even runs. In QA this is the antidote to the classic "false trust" trap: the assumption "the UI validates, so the API is safe" is wrong — the tester must PROVE server validation by bypassing the UI and sending invalid data straight to the API.',
      },
    },
    { type: 'heading', text: { tr: 'DTO + Bean Validation + @Valid', en: 'DTO + Bean Validation + @Valid' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugRequest.java — gelen govde icin dogrulama kurallari
public class BugRequest {
    @NotBlank(message = "title zorunludur")
    @Size(min = 3, max = 120, message = "title 3-120 karakter olmali")
    private String title;

    @NotNull(message = "severity zorunludur")
    private Severity severity;        // enum: gecersiz deger deserialization'da 400

    @Email(message = "reporter gecerli bir email olmali")
    private String reporter;
    // getter/setter...
}

// BugController.java — @Valid kapida kurallari tetikler
@PostMapping
public ResponseEntity<Bug> create(@Valid @RequestBody BugRequest req) {
    // buraya SADECE tum kurallar gecerse gelinir; degilse otomatik 400
    Bug created = service.create(req);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}`,
        en: `// BugRequest.java — validation rules for the incoming body
public class BugRequest {
    @NotBlank(message = "title is required")
    @Size(min = 3, max = 120, message = "title must be 3-120 chars")
    private String title;

    @NotNull(message = "severity is required")
    private Severity severity;        // enum: invalid value -> 400 at deserialization

    @Email(message = "reporter must be a valid email")
    private String reporter;
    // getters/setters...
}

// BugController.java — @Valid fires the rules at the gate
@PostMapping
public ResponseEntity<Bug> create(@Valid @RequestBody BugRequest req) {
    // reached ONLY if all rules pass; otherwise an automatic 400
    Bug created = service.create(req);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `@Valid` annotation\'ı unutulursa**\n\n**Kod:** `public ResponseEntity<Bug> create(@RequestBody BugRequest req)` — `@Valid` YOK (yalnızca `@RequestBody`).\n\n**Ne olur:** DTO\'daki `@NotBlank`/`@Size` kuralları TANIMLI ama tetiklenmez. `POST /api/v1/bugs { "title": "" }` isteği 400 yerine **201 Created** döner ve veritabanına boş başlıklı bir bug yazılır.\n\n**Neden sinsi:** UI\'daki JavaScript zaten boş başlığı engelliyor, bu yüzden manuel/UI testi PASS verir — hata hiç görünmez. Ama mobil uygulama veya Postman doğrudan API\'ye vurunca boş kayıt açılır: production\'da "boş bug" kirliliği. Kurallar kodda DURUYOR ama bekçi olmadan hiçbir işe yaramıyor.\n\n**Tester nerede yakalar:** Postman\'de UI\'yı bypass edip boş `title` göndererek — 400 beklerken 201 alınca. Bu, "UI valide ediyor" güveninin neden yanlış olduğunun doğrudan kanıtıdır.',
        en: '**🐞 Defect Birth — if the `@Valid` annotation is forgotten**\n\n**Code:** `public ResponseEntity<Bug> create(@RequestBody BugRequest req)` — `@Valid` is MISSING (only `@RequestBody`).\n\n**What happens:** the `@NotBlank`/`@Size` rules on the DTO are DEFINED but never fire. `POST /api/v1/bugs { "title": "" }` returns **201 Created** instead of 400 and an empty-title bug is written to the database.\n\n**Why sneaky:** the UI\'s JavaScript already blocks an empty title, so manual/UI testing PASSES — the defect never shows. But when a mobile app or Postman hits the API directly, an empty record is created: "empty bug" pollution in production. The rules SIT in the code but without the gatekeeper they do nothing.\n\n**Where the tester catches it:** in Postman, bypassing the UI and sending an empty `title` — getting 201 while expecting 400. This is the direct proof of why "the UI validates" trust is wrong.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b6-valid-gate-film',
      title: { tr: '🎬 @Valid Kapıda Duruyor: UI Bypass Edilince Ne Olur?', en: '🎬 @Valid Stands at the Gate: What Happens When the UI Is Bypassed' },
      xpReward: 14,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'ui', emoji: '🖥️', label: { tr: 'UI (JS kontrolü)', en: 'UI (JS check)' }, color: '#22c55e' },
        { id: 'postman', emoji: '📮', label: { tr: 'Postman (bypass)', en: 'Postman (bypass)' }, color: '#f59e0b' },
        { id: 'gate', emoji: '🛂', label: { tr: '@Valid kapısı', en: '@Valid gate' }, color: '#0ea5e9' },
        { id: 'nogate', emoji: '🕳️', label: { tr: '@Valid yok', en: 'no @Valid' }, color: '#ef4444' },
        { id: 'db', emoji: '🗄️', label: { tr: 'Boş bug DB\'de', en: 'Empty bug in DB' }, color: '#a78bfa' },
      ],
      scenes: [
        {
          caption: { tr: 'Kullanıcı UI\'da boş başlıkla "Kaydet"e basıyor. UI\'daki JavaScript hemen engelliyor: "title boş olamaz". UI testi PASS.', en: 'A user clicks "Save" in the UI with an empty title. The UI\'s JavaScript blocks it instantly: "title cannot be empty". UI test PASSES.' },
          positions: { ui: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Ama Postman (ya da mobil uygulama) UI\'yı TAMAMEN atlar ve doğrudan API\'ye boş title gönderir. UI\'nın JS kontrolü burada YOKTUR.', en: 'But Postman (or a mobile app) bypasses the UI ENTIRELY and sends an empty title straight to the API. The UI\'s JS check does NOT exist here.' },
          code: { tr: 'POST /api/v1/bugs { "title": "" }', en: 'POST /api/v1/bugs { "title": "" }' },
          positions: { postman: { x: 25, y: 50, pulse: true }, gate: { x: 62, y: 50, scale: 1.1 } },
          beams: [{ from: 'postman', to: 'gate', color: '#f59e0b' }],
        },
        {
          caption: { tr: '@Valid VARSA: kapı bekçisi boş title\'ı yakalar ve isteği 400 ile geri çevirir. Sunucu, güvenilebilecek son savunma hattı olarak çalışır.', en: 'If @Valid EXISTS: the gatekeeper catches the empty title and turns the request back with 400. The server acts as the trustworthy last line of defense.' },
          code: { tr: '400 Bad Request -> title zorunludur', en: '400 Bad Request -> title required' },
          positions: { gate: { x: 40, y: 50, scale: 1.2, pulse: true } },
          beams: [],
        },
        {
          caption: { tr: '@Valid YOKSA: kurallar kodda dursa da tetiklenmez. Boş title 201 döner, veritabanına boş bir bug yazılır — production kirliliği.', en: 'If @Valid is MISSING: the rules sit in code but never fire. The empty title returns 201, an empty bug is written to the database — production pollution.' },
          positions: { postman: { x: 20, y: 40 }, nogate: { x: 45, y: 50 }, db: { x: 72, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'nogate', to: 'db', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — UI doğrulaması bir kolaylıktır, güvence değil. Tek güvenilir kapı sunucudaki @Valid\'dir. Tester UI\'yı bypass edip bunu KANITLAR.', en: 'The lesson — UI validation is a convenience, not a guarantee. The only trustworthy gate is @Valid on the server. The tester PROVES it by bypassing the UI.' },
          positions: { gate: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Neden Sunucu Doğrulaması Şart?', en: 'Why Server Validation Is Mandatory' },
      steps: [
        { id: 1, icon: '🖥️', label: { tr: 'UI yalnızca bir istemci…', en: 'The UI is just one client…' }, detail: { tr: 'UI\'daki JS kontrolü sadece o tarayıcıda çalışır; mobil, Postman, başka servis bunu görmez.', en: 'The UI\'s JS check runs only in that browser; mobile, Postman, another service don\'t see it.' } },
        { id: 2, icon: '🛂', label: { tr: '@Valid merkezî kapı…', en: '@Valid is the central gate…' }, detail: { tr: 'Sunucu doğrulaması hangi istemciden gelirse gelsin çalışır — güvenilebilecek tek katman.', en: 'Server validation runs whatever the client — the only layer you can trust.' } },
        { id: 3, icon: '🕵️', label: { tr: 'Tester bypass ederek kanıtlar…', en: 'The tester proves it by bypassing…' }, detail: { tr: 'UI\'yı atlayıp doğrudan API\'ye geçersiz veri gönder; 400 gelmiyorsa güven yanlıştı.', en: 'Bypass the UI, send invalid data straight to the API; if no 400 arrives, the trust was misplaced.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b6-order-01',
      question: { tr: 'Sunucu doğrulamasını (@Valid) kanıtlama sırasını diz.', en: 'Order the steps to prove server validation (@Valid).' },
      items: [
        { id: '1', text: { tr: 'DTO\'daki kuralları oku (@NotBlank, @Size, @Email)', en: 'Read the DTO rules (@NotBlank, @Size, @Email)' }, order: 1 },
        { id: '2', text: { tr: 'UI\'yı bypass ederek doğrudan API\'ye istek hazırla (Postman)', en: 'Prepare a direct API request bypassing the UI (Postman)' }, order: 2 },
        { id: '3', text: { tr: 'Her kural için geçersiz veri gönder (boş title, kısa title, hatalı email)', en: 'Send invalid data per rule (empty title, short title, bad email)' }, order: 3 },
        { id: '4', text: { tr: 'Her durumda 400 ve anlamlı hata mesajı bekle', en: 'Expect 400 and a meaningful error message in each case' }, order: 4 },
        { id: '5', text: { tr: '400 gelmiyorsa @Valid eksikliğini bug olarak raporla', en: 'If no 400 arrives, report the missing @Valid as a bug' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b6-valid',
      id: 'api-b6-valid',
      title: { tr: 'Kendin Dene: Eksik @Valid\'i Ekle', en: 'Try It Yourself: Add the Missing @Valid' },
      starterCode: `// BUG: @Valid yok -> DTO kurallari tetiklenmez -> bos title 201 doner
@PostMapping
public ResponseEntity<Bug> create(@RequestBody BugRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
}`,
      solutionCode: `// FIX: @Valid kurallari kapida tetikler -> gecersiz istek otomatik 400
@PostMapping
public ResponseEntity<Bug> create(@Valid @RequestBody BugRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
}`,
      hint: { tr: 'DTO\'da `@NotBlank`/`@Size` tanımlı olsa bile, controller parametresine `@Valid` konmazsa bu kurallar tetiklenmez. `@RequestBody`\'nin yanına `@Valid` ekleyerek doğrulamayı kapıda çalıştır.', en: 'Even with `@NotBlank`/`@Size` defined on the DTO, without `@Valid` on the controller parameter those rules never fire. Add `@Valid` next to `@RequestBody` to run validation at the gate.' },
      successMessage: { tr: 'Doğru! Artık boş/geçersiz veri kapıda 400 ile reddedilir — UI bypass edilse bile sunucu korur.', en: 'Correct! Now empty/invalid data is rejected at the gate with 400 — even if the UI is bypassed, the server protects.' },
    },
    {
      type: 'quiz',
      question: { tr: 'DTO\'da @NotBlank tanımlı ama controller\'da @Valid yok. UI boş başlığı JS ile engelliyor. Tester boş title\'ı nasıl yakalar ve neden bu önemli?', en: 'The DTO has @NotBlank but the controller lacks @Valid. The UI blocks empty title with JS. How does the tester catch the empty title, and why does it matter?' },
      options: [
        { id: 'a', text: { tr: 'Yakalayamaz; UI engellediği için sorun yoktur', en: 'They can\'t; since the UI blocks it there is no problem' } },
        { id: 'b', text: { tr: 'UI\'yı bypass edip Postman ile boş title gönderir; 201 gelince @Valid eksikliğini kanıtlar — çünkü mobil/diğer istemciler UI\'yı atlar', en: 'Bypasses the UI, sends empty title via Postman; a 201 proves the missing @Valid — because mobile/other clients skip the UI' } },
        { id: 'c', text: { tr: 'Sunucuyu yeniden başlatır', en: 'Restarts the server' } },
        { id: 'd', text: { tr: 'Sadece UI\'da test eder', en: 'Only tests in the UI' } },
      ],
      correct: 'b',
      explanation: { tr: 'UI\'daki JS sadece bir istemcide çalışır; mobil uygulama veya Postman API\'ye doğrudan vurup bunu atlar. @Valid yoksa DTO kuralları tetiklenmez ve boş title 201 döner. Tester UI\'yı bypass edip boş title göndererek (Postman) 400 beklerken 201 alınca bunu kanıtlar — "UI valide ediyor" güveninin neden yanlış olduğunun kanıtı budur.', en: 'The UI\'s JS runs in one client only; a mobile app or Postman hits the API directly and skips it. Without @Valid the DTO rules never fire and an empty title returns 201. The tester proves it by bypassing the UI and sending an empty title (Postman), getting 201 while expecting 400 — the proof of why "the UI validates" trust is wrong.' },
      retryQuestion: {
        question: { tr: '`@Valid`\'in görevi tam olarak nedir?', en: 'What exactly is the job of `@Valid`?' },
        options: [
          { id: 'a', text: { tr: 'DTO\'daki Bean Validation kurallarını (@NotBlank, @Size, @Email) tetikler; geçersiz istek controller\'a girmeden 400 döner', en: 'It fires the Bean Validation rules on the DTO (@NotBlank, @Size, @Email); an invalid request returns 400 before entering the controller' } },
          { id: 'b', text: { tr: 'Veritabanını temizler', en: 'It cleans the database' } },
          { id: 'c', text: { tr: 'Token üretir', en: 'It generates a token' } },
          { id: 'd', text: { tr: 'Yanıtı JSON\'a çevirir', en: 'It converts the response to JSON' } },
        ],
        correct: 'a',
        explanation: { tr: '`@Valid`, `@RequestBody` ile bağlanan DTO üzerindeki doğrulama annotation\'larını tetikler. Kural ihlali varsa Spring controller metodunu hiç çalıştırmadan otomatik 400 döner. Kurallar DTO\'da dursa da `@Valid` olmadan tetiklenmezler.', en: '`@Valid` triggers the validation annotations on the DTO bound via `@RequestBody`. On a rule violation Spring automatically returns 400 without ever running the controller method. The rules sit on the DTO but do not fire without `@Valid`.' },
      },
    },
  ],
}
const B7 = {
  title: { tr: '🧯 B7 · Exception Handling: @RestControllerAdvice', en: '🧯 B7 · Exception Handling: @RestControllerAdvice' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧯',
      content: {
        tr: 'Exception handling, API\'nin **itfaiye ve tercüman ekibidir**: kodun içinde bir şey ters gittiğinde (kayıt yok, iş kuralı ihlali, beklenmeyen çökme) ham Java exception\'ını istemcinin anlayacağı temiz bir HTTP yanıtına ÇEVİRİR. `@RestControllerAdvice`, tüm controller\'lar için tek merkezî hata çevirmenidir: `BugNotFoundException` → 404, `IllegalStateException` → 409, geri kalan her şey → 500. Peki her metotta try-catch yazsak olmaz mı, neden merkezî bir yapı? Çünkü hata çevirisi controller\'lara dağılırsa biri 404 döner, biri 500, biri hiç yakalamaz ve istemci tutarsız yanıtlarla karşılaşır; merkezî advice, hata→status eşlemesinin TEK doğru kaynağıdır. Java\'da bunun karşılığı global bir `try-catch` değil, `@ExceptionHandler` metotlarıdır; her exception türü kendi status kodu ve gövdesiyle eşlenir. QA açısından bu katman, **hata yanıtlarının sözleşmesidir**: bir tester yalnızca "mutlu yol"u değil, hata durumlarının da doğru status + anlamlı mesaj döndüğünü test etmelidir — çünkü kötü bir hata yanıtı (500 yerine 200, ya da stack trace sızması) hem istemciyi yanıltır hem güvenlik açığı olur.',
        en: 'Exception handling is the API\'s **fire brigade and translator crew**: when something goes wrong inside the code (record missing, rule violation, unexpected crash), it TRANSLATES the raw Java exception into a clean HTTP response the client understands. `@RestControllerAdvice` is the single central error translator for all controllers: `BugNotFoundException` → 404, `IllegalStateException` → 409, everything else → 500. But couldn\'t we write try-catch in each method — why a central structure? Because if error translation is scattered across controllers, one returns 404, another 500, another catches nothing, and the client meets inconsistent responses; the central advice is the single source of truth for the error→status mapping. In Java the equivalent is not a global `try-catch` but `@ExceptionHandler` methods; each exception type maps to its own status code and body. In QA this layer is the **contract of error responses**: a tester must test not just the "happy path" but that error cases return the right status + a meaningful message — because a bad error response (200 instead of 500, or a leaked stack trace) both misleads the client and becomes a security hole.',
      },
    },
    { type: 'heading', text: { tr: 'Merkezî Hata Çevirmeni', en: 'The Central Error Translator' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// GlobalExceptionHandler.java — TUM controller'lar icin tek hata cevirmeni
@RestControllerAdvice
public class GlobalExceptionHandler {

    // kayit yok -> 404 (cokme degil, beklenen durum)
    @ExceptionHandler(BugNotFoundException.class)
    public ResponseEntity<ApiError> notFound(BugNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiError("BUG_NOT_FOUND", ex.getMessage()));
    }

    // is kurali ihlali (zaten CLOSED) -> 409 Conflict
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiError> conflict(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(new ApiError("CONFLICT", ex.getMessage()));
    }

    // @Valid ihlali -> 400 (alan bazli hata mesajlariyla)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(new ApiError("VALIDATION", msg));
    }
}`,
        en: `// GlobalExceptionHandler.java — single error translator for ALL controllers
@RestControllerAdvice
public class GlobalExceptionHandler {

    // record not found -> 404 (not a crash, an expected case)
    @ExceptionHandler(BugNotFoundException.class)
    public ResponseEntity<ApiError> notFound(BugNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiError("BUG_NOT_FOUND", ex.getMessage()));
    }

    // business-rule violation (already CLOSED) -> 409 Conflict
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiError> conflict(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(new ApiError("CONFLICT", ex.getMessage()));
    }

    // @Valid violation -> 400 (with field-level error messages)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(new ApiError("VALIDATION", msg));
    }
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — ham exception istemciye sızarsa**\n\n**Kod:** `@RestControllerAdvice` YOK ya da genel bir handler tüm exception\'ları yakalayıp `ex.getMessage()`\'ı olduğu gibi 500 gövdesine koyuyor.\n\n**Ne olur:** Bir `SQLException` veya `NullPointerException` istemciye ham haliyle döner: yanıt gövdesinde tam **stack trace**, veritabanı tablo/sütun adları, hatta dosya yolları görünür. Kötü niyetli biri için bu bir hazine haritasıdır (sistem içini ifşa eder); ayrıca istemci "ne oldu" diye net bir mesaj alamaz.\n\n**Neden sinsi:** Mutlu yol testlerinde hiç görünmez — her şey 200/201 döner. Sızıntı yalnızca bir hata tetiklendiğinde ortaya çıkar ve çoğu ekip hata yanıtlarını hiç test etmez.\n\n**Tester nerede yakalar:** Kasıtlı olarak hata tetikleyerek (olmayan id, geçersiz veri, bozuk JSON) yanıt gövdesini inceleyince — stack trace, SQL, iç yol görürse bu hem bir bilgi sızıntısı (güvenlik) hem de kötü bir hata sözleşmesidir.',
        en: '**🐞 Defect Birth — if a raw exception leaks to the client**\n\n**Code:** `@RestControllerAdvice` is MISSING, or a generic handler catches all exceptions and dumps `ex.getMessage()` as-is into a 500 body.\n\n**What happens:** a `SQLException` or `NullPointerException` returns to the client raw: the response body shows the full **stack trace**, database table/column names, even file paths. For a malicious actor this is a treasure map (it exposes internals); the client also gets no clear "what happened" message.\n\n**Why sneaky:** it never shows in happy-path tests — everything returns 200/201. The leak appears only when an error is triggered, and most teams never test error responses.\n\n**Where the tester catches it:** by deliberately triggering errors (nonexistent id, invalid data, malformed JSON) and inspecting the response body — seeing a stack trace, SQL, or internal path is both an information leak (security) and a bad error contract.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b7-exception-film',
      title: { tr: '🎬 404 mü 500 mü, Yoksa Sızıntı mı? Bir Hatanın Çevirisi', en: '🎬 404, 500, or a Leak? The Translation of an Error' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'ex', emoji: '💥', label: { tr: 'Ham exception', en: 'Raw exception' }, color: '#ef4444' },
        { id: 'advice', emoji: '🧯', label: { tr: '@RestControllerAdvice', en: '@RestControllerAdvice' }, color: '#22c55e' },
        { id: 'clean', emoji: '📋', label: { tr: 'Temiz 404/409', en: 'Clean 404/409' }, color: '#0ea5e9' },
        { id: 'leak', emoji: '🗺️', label: { tr: 'Stack trace sızıntısı', en: 'Stack trace leak' }, color: '#f59e0b' },
        { id: 'attacker', emoji: '🕵️‍♂️', label: { tr: 'Kötü niyetli', en: 'Attacker' }, color: '#a78bfa' },
      ],
      scenes: [
        {
          caption: { tr: 'Kod içinde bir exception fırladı: olmayan bir bug istendi (BugNotFoundException). Şimdi bu ham hata istemciye nasıl dönecek?', en: 'An exception was thrown inside the code: a nonexistent bug was requested (BugNotFoundException). How will this raw error be returned to the client?' },
          positions: { ex: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Merkezî advice VARSA: exception yakalanır ve temiz bir 404 + anlamlı mesaja çevrilir. İstemci "kayıt yok" diye net bir yanıt alır.', en: 'If the central advice EXISTS: the exception is caught and translated into a clean 404 + meaningful message. The client gets a clear "record not found" response.' },
          code: { tr: '404 { "code": "BUG_NOT_FOUND" }', en: '404 { "code": "BUG_NOT_FOUND" }' },
          positions: { ex: { x: 22, y: 40 }, advice: { x: 45, y: 50 }, clean: { x: 72, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'ex', to: 'advice', color: '#22c55e' }, { from: 'advice', to: 'clean', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Advice YOKSA: ham exception istemciye sızar — yanıt gövdesinde tam stack trace, SQL, tablo adları, dosya yolları görünür.', en: 'If the advice is MISSING: the raw exception leaks to the client — the response body shows the full stack trace, SQL, table names, file paths.' },
          code: { tr: '500 ...SQLException: SELECT * FROM bugs...', en: '500 ...SQLException: SELECT * FROM bugs...' },
          positions: { ex: { x: 25, y: 40 }, leak: { x: 60, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'ex', to: 'leak', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Bu sızıntı kötü niyetli biri için bir harita: sistem içini (DB şeması, teknoloji, yollar) ifşa eder ve bir sonraki saldırıyı kolaylaştırır.', en: 'This leak is a map for a malicious actor: it exposes internals (DB schema, tech, paths) and eases the next attack.' },
          positions: { leak: { x: 25, y: 40 }, attacker: { x: 60, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'leak', to: 'attacker', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — Hata yanıtları da bir sözleşmedir: doğru status + anlamlı mesaj, ham iç detay SIZDIRMADAN. Tester hataları kasıtlı tetikleyip gövdeyi denetler.', en: 'The lesson — Error responses are a contract too: the right status + a meaningful message, WITHOUT leaking raw internals. The tester triggers errors deliberately and audits the body.' },
          positions: { advice: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Hata → Status Eşlemesi', en: 'Error → Status Mapping' },
      steps: [
        { id: 1, icon: '🔍', label: { tr: 'Kayıt yok → 404…', en: 'Not found → 404…' }, detail: { tr: 'BugNotFoundException beklenen bir durumdur; advice bunu 404\'e çevirir, 500\'e değil.', en: 'BugNotFoundException is an expected case; the advice maps it to 404, not 500.' } },
        { id: 2, icon: '⚔️', label: { tr: 'Kural ihlali → 409…', en: 'Rule violation → 409…' }, detail: { tr: 'Zaten CLOSED gibi bir çatışma 409 Conflict\'e eşlenir — istemci "durum uyuşmazlığı"nı anlar.', en: 'A conflict like already CLOSED maps to 409 Conflict — the client understands a "state mismatch".' } },
        { id: 3, icon: '🛡️', label: { tr: 'Beklenmeyen → 500 (temiz)…', en: 'Unexpected → 500 (clean)…' }, detail: { tr: 'Gerçek çökmeler 500 döner ama gövdede stack trace DEĞİL, jenerik bir mesaj olmalı — sızıntı yok.', en: 'True crashes return 500 but the body must hold a generic message, NOT a stack trace — no leak.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b7-order-01',
      question: { tr: 'Hata yanıtlarını test etme sırasını diz.', en: 'Order the steps to test error responses.' },
      items: [
        { id: '1', text: { tr: 'Her hata türü için tetikleyici bir istek hazırla (yok id, geçersiz veri)', en: 'Prepare a trigger request per error type (missing id, invalid data)' }, order: 1 },
        { id: '2', text: { tr: 'Beklenen status kodunu belirle (404/409/400/500)', en: 'Determine the expected status code (404/409/400/500)' }, order: 2 },
        { id: '3', text: { tr: 'İsteği gönder ve gerçek status\'u karşılaştır', en: 'Send the request and compare the actual status' }, order: 3 },
        { id: '4', text: { tr: 'Yanıt gövdesinde anlamlı mesaj VAR, stack trace YOK doğrula', en: 'Verify the body HAS a meaningful message and NO stack trace' }, order: 4 },
        { id: '5', text: { tr: 'İç detay (SQL, yol, tablo) sızıntısı varsa güvenlik bug\'ı olarak raporla', en: 'If internals (SQL, path, table) leak, report a security bug' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b7-exception',
      id: 'api-b7-exception',
      title: { tr: 'Kendin Dene: Not Found\'u 404\'e Eşle', en: 'Try It Yourself: Map Not Found to 404' },
      starterCode: `// BUG: BugNotFoundException icin handler yok -> 500 + stack trace sizinti
@RestControllerAdvice
public class GlobalExceptionHandler {
    // TODO: BugNotFoundException'i temiz bir 404'e cevir
}`,
      solutionCode: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BugNotFoundException.class)
    public ResponseEntity<ApiError> notFound(BugNotFoundException ex) {
        // beklenen durum -> temiz 404, stack trace SIZDIRMADAN
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiError("BUG_NOT_FOUND", ex.getMessage()));
    }
}`,
      hint: { tr: 'Handler yoksa BugNotFoundException genel 500\'e düşer ve stack trace sızabilir. `@ExceptionHandler(BugNotFoundException.class)` ile bunu temiz bir 404 + anlamlı mesaja çevir.', en: 'Without a handler, BugNotFoundException falls to a generic 500 and a stack trace can leak. Use `@ExceptionHandler(BugNotFoundException.class)` to map it to a clean 404 + meaningful message.' },
      successMessage: { tr: 'Doğru! Artık "bulunamadı" temiz bir 404 döner, iç detay sızmaz.', en: 'Correct! Now "not found" returns a clean 404 with no internal leak.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir API, hata durumunda yanıt gövdesinde tam stack trace ve SQL sorgusunu döndürüyor. Bu neden iki katmanlı bir problemdir?', en: 'On errors, an API returns the full stack trace and SQL query in the response body. Why is this a two-layer problem?' },
      options: [
        { id: 'a', text: { tr: 'Problem değil, ayrıntı iyidir', en: 'Not a problem, detail is good' } },
        { id: 'b', text: { tr: 'Hem kötü hata sözleşmesi (istemci net mesaj alamaz) hem güvenlik sızıntısı (iç yapı/DB ifşa olur)', en: 'Both a bad error contract (client gets no clear message) and a security leak (internals/DB exposed)' } },
        { id: 'c', text: { tr: 'Sadece yavaşlık sorunu', en: 'Only a slowness issue' } },
        { id: 'd', text: { tr: 'Sadece UI sorunu', en: 'Only a UI issue' } },
      ],
      correct: 'b',
      explanation: { tr: 'Ham stack trace/SQL sızıntısı iki problemdir: (1) istemci "ne oldu"yu anlayamaz — kötü bir hata sözleşmesi; (2) DB şeması, teknoloji ve yollar ifşa olur — bir bilgi sızıntısı/güvenlik açığı. Merkezî `@RestControllerAdvice` her exception\'ı doğru status + jenerik/anlamlı mesaja çevirmelidir. Tester hataları kasıtlı tetikleyip gövdeyi denetleyerek yakalar.', en: 'A raw stack trace/SQL leak is two problems: (1) the client can\'t understand "what happened" — a bad error contract; (2) DB schema, tech, and paths are exposed — an information leak/security hole. A central `@RestControllerAdvice` must map each exception to the right status + a generic/meaningful message. The tester catches it by triggering errors deliberately and auditing the body.' },
      retryQuestion: {
        question: { tr: 'Olmayan bir kayıt istendiğinde (BugNotFoundException) doğru status kodu nedir ve neden 500 değil?', en: 'When a nonexistent record is requested (BugNotFoundException), what is the correct status and why not 500?' },
        options: [
          { id: 'a', text: { tr: '404 — "bulunamadı" beklenen bir durumdur, sunucu çökmesi (500) değil', en: '404 — "not found" is an expected case, not a server crash (500)' } },
          { id: 'b', text: { tr: '500 — her hata sunucu hatasıdır', en: '500 — every error is a server error' } },
          { id: 'c', text: { tr: '201 — kayıt oluşturuldu', en: '201 — record created' } },
          { id: 'd', text: { tr: '200 — her şey yolunda', en: '200 — all fine' } },
        ],
        correct: 'a',
        explanation: { tr: '"Kayıt bulunamadı" istemcinin düzeltebileceği, beklenen bir 4xx durumudur (404). 500 ise sunucu içi beklenmeyen çökmeye ayrılmıştır. Not-found\'u 500 olarak döndürmek hem yanıltıcıdır hem gerçek sunucu hatalarını maskeler.', en: '"Record not found" is an expected 4xx case the client can fix (404). 500 is reserved for unexpected server-side crashes. Returning not-found as 500 is both misleading and masks real server errors.' },
      },
    },
  ],
}

const B8 = {
  title: { tr: '🔢 B8 · Status Kodu ve ResponseEntity: 200/201/204', en: '🔢 B8 · Status & ResponseEntity: 200/201/204' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔢',
      content: {
        tr: '`ResponseEntity`, geliştiricinin **yanıtın tam kontrolünü** eline aldığı araçtır: sadece gövdeyi değil, status kodunu ve header\'ları da bilinçli seçer. Başarı bile tek bir kod değildir: **200 OK** = "işte sonuç" (GET), **201 Created** = "yeni kaynak oluşturdum, adresi de Location header\'ında" (POST), **204 No Content** = "yaptım ama dönecek gövde yok" (DELETE/bazı PUT). Peki hepsi "başarı" ise 200 dönsek olmaz mı, istemci nasılsa çalışır? Çoğu zaman "çalışır" ama sözleşme bozulur: bir POST 201 yerine 200 dönerse, istemci `Location` header\'ından yeni kaydın adresini alan otomasyon zinciri kırılır; bir DELETE 204 yerine 200 + boş gövde dönerse, gövdeyi ayrıştırmaya çalışan istemci hata verebilir. Java\'da bunun karşılığı `return bug;` (Spring 200 varsayar) ile `ResponseEntity.status(201).header("Location", ...).body(bug)` arasındaki bilinçli farktır. QA açısından status kodu **anlamsal bir sözleşmedir**: tester yalnızca "başarılı mı" değil, "DOĞRU başarı kodu mu" diye test eder — çünkü yanlış ama 2xx bir kod, istemci otomasyonlarını sessizce bozan bir contract hatasıdır.',
        en: '`ResponseEntity` is the tool with which the developer takes **full control of the response**: it consciously chooses not just the body but the status code and headers. Even success is not a single code: **200 OK** = "here is the result" (GET), **201 Created** = "I created a new resource, its address is in the Location header" (POST), **204 No Content** = "I did it but there\'s no body to return" (DELETE/some PUT). But if all are "success", couldn\'t we just return 200 — the client works anyway? Often it "works" but the contract breaks: if a POST returns 200 instead of 201, an automation chain that reads the new record\'s address from the `Location` header breaks; if a DELETE returns 200 + empty body instead of 204, a client trying to parse the body may error. In Java the equivalent is the conscious difference between `return bug;` (Spring assumes 200) and `ResponseEntity.status(201).header("Location", ...).body(bug)`. In QA the status code is a **semantic contract**: the tester tests not just "did it succeed" but "is it the CORRECT success code" — because a wrong-but-2xx code is a contract defect that silently breaks client automations.',
      },
    },
    { type: 'heading', text: { tr: 'Doğru Başarı Kodunu Seçmek', en: 'Choosing the Right Success Code' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugController.java — her operasyon icin DOGRU status + header
@PostMapping
public ResponseEntity<Bug> create(@Valid @RequestBody BugRequest req) {
    Bug created = service.create(req);
    URI location = URI.create("/api/v1/bugs/" + created.getId());
    // 201 Created + Location: yeni kaydin adresi (otomasyon bunu kullanir)
    return ResponseEntity.created(location).body(created);
}

@GetMapping("/{id}")
public ResponseEntity<Bug> getOne(@PathVariable Long id) {
    return ResponseEntity.ok(service.getById(id));       // 200 OK + govde
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();           // 204 No Content
}`,
        en: `// BugController.java — the CORRECT status + header per operation
@PostMapping
public ResponseEntity<Bug> create(@Valid @RequestBody BugRequest req) {
    Bug created = service.create(req);
    URI location = URI.create("/api/v1/bugs/" + created.getId());
    // 201 Created + Location: address of the new record (automation uses it)
    return ResponseEntity.created(location).body(created);
}

@GetMapping("/{id}")
public ResponseEntity<Bug> getOne(@PathVariable Long id) {
    return ResponseEntity.ok(service.getById(id));       // 200 OK + body
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();           // 204 No Content
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — POST 201 yerine 200 dönerse (Location yok)**\n\n**Kod:** `@PostMapping public Bug create(...) { return service.create(req); }` — Spring bunu 200 döner, `Location` header\'ı YOKtur.\n\n**Ne olur:** Yeni bir bug oluşturan otomasyon testi, sonraki adımda kaydı okumak için `Location` header\'ındaki adresi bekler (`/api/v1/bugs/42`). Header gelmediği için zincir kırılır; ya da yeni id\'yi gövdeden okumaya çalışan farklı bir istemci, 200 gördüğü için "oluşturma değil güncelleme oldu" sanır.\n\n**Neden sinsi:** Kayıt gerçekten oluşur, gövde döner, status 2xx\'tir — hızlı bir bakışta "başarılı". Sorun yalnızca 201/Location\'a GÜVENEN bir istemci zinciri koştuğunda ortaya çıkar; basit testler bunu ıskalar.\n\n**Tester nerede yakalar:** POST sonrası status\'un tam 201 olduğunu VE `Location` header\'ının yeni kaydın adresini verdiğini doğrulayan bir contract testiyle. "2xx = geçti" varsayımı bu hatayı gizler.',
        en: '**🐞 Defect Birth — if POST returns 200 instead of 201 (no Location)**\n\n**Code:** `@PostMapping public Bug create(...) { return service.create(req); }` — Spring returns 200 for this, with NO `Location` header.\n\n**What happens:** an automation test creating a new bug expects the address in the `Location` header (`/api/v1/bugs/42`) to read the record in the next step. With no header the chain breaks; or a different client trying to read the new id from the body sees 200 and thinks "this was an update, not a creation".\n\n**Why sneaky:** the record is truly created, the body returns, the status is 2xx — at a glance "success". The problem only appears when a client chain that RELIES on 201/Location runs; simple tests miss it.\n\n**Where the tester catches it:** with a contract test verifying the status is exactly 201 AND the `Location` header gives the new record\'s address. The "2xx = passed" assumption hides this defect.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-b8-status-film',
      title: { tr: '🎬 200 mü 201 mi? Location Header\'ı ve Kırılan Zincir', en: '🎬 200 or 201? The Location Header and the Broken Chain' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'post', emoji: '📤', label: { tr: 'POST /bugs', en: 'POST /bugs' }, color: '#f59e0b' },
        { id: 'code201', emoji: '🏷️', label: { tr: '201 + Location', en: '201 + Location' }, color: '#22c55e' },
        { id: 'code200', emoji: '⚠️', label: { tr: '200 (Location yok)', en: '200 (no Location)' }, color: '#ef4444' },
        { id: 'next', emoji: '🔗', label: { tr: 'Sonraki istek', en: 'Next request' }, color: '#0ea5e9' },
        { id: 'broken', emoji: '⛓️‍💥', label: { tr: 'Kırık zincir', en: 'Broken chain' }, color: '#a78bfa' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir otomasyon zinciri: önce POST ile bug oluştur, sonra dönen adresten onu GET ile oku. Her şey doğru status koduna bağlı.', en: 'An automation chain: first create a bug with POST, then read it with GET from the returned address. Everything hinges on the right status code.' },
          positions: { post: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Doğru yol — POST 201 Created döner ve Location header\'ı yeni kaydın adresini verir: /api/v1/bugs/42. Zincir bu adresi kullanır.', en: 'The right path — POST returns 201 Created and the Location header gives the new record\'s address: /api/v1/bugs/42. The chain uses this address.' },
          code: { tr: '201 Created\\nLocation: /api/v1/bugs/42', en: '201 Created\\nLocation: /api/v1/bugs/42' },
          positions: { post: { x: 22, y: 40 }, code201: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'post', to: 'code201', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Yanlış yol — geliştirici `return bug` yazdı, Spring 200 döner ve Location header\'ı YOKtur. Kayıt oluşur ama adres kaybolur.', en: 'The wrong path — the developer wrote `return bug`, Spring returns 200 and there is NO Location header. The record is created but the address is lost.' },
          code: { tr: '200 OK (Location header yok)', en: '200 OK (no Location header)' },
          positions: { post: { x: 22, y: 40 }, code200: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'post', to: 'code200', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Sonraki istek Location\'dan adresi almaya çalışır ama header yok — zincir kırılır. Test "oluşturma başarısız" gibi görünmez, "sonraki adım null" der.', en: 'The next request tries to read the address from Location but there is none — the chain breaks. The test does not look like "create failed", it says "next step is null".' },
          positions: { code200: { x: 22, y: 40 }, next: { x: 45, y: 50 }, broken: { x: 72, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'next', to: 'broken', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — 2xx yeterli değil; DOĞRU 2xx gerekir. POST=201+Location, GET=200, DELETE=204. Tester status kodunu ve Location\'ı ayrıca doğrular.', en: 'The lesson — 2xx is not enough; the CORRECT 2xx is required. POST=201+Location, GET=200, DELETE=204. The tester verifies the status code and Location separately.' },
          positions: { code201: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Hangi Operasyon Hangi Kodu Döner?', en: 'Which Operation Returns Which Code?' },
      steps: [
        { id: 1, icon: '📥', label: { tr: 'GET → 200 OK…', en: 'GET → 200 OK…' }, detail: { tr: 'Okuma başarılıysa 200 + gövde. Kayıt yoksa 404 (200 + boş gövde DEĞİL).', en: 'Successful read is 200 + body. Absent record is 404 (NOT 200 + empty body).' } },
        { id: 2, icon: '🆕', label: { tr: 'POST → 201 Created…', en: 'POST → 201 Created…' }, detail: { tr: 'Oluşturma 201 + Location header\'ı döner; istemci yeni kaydın adresini buradan alır.', en: 'Creation returns 201 + Location header; the client reads the new record\'s address here.' } },
        { id: 3, icon: '🗑️', label: { tr: 'DELETE → 204 No Content…', en: 'DELETE → 204 No Content…' }, detail: { tr: 'Silme başarılıysa 204 (gövdesiz). İstemci gövde ayrıştırmaya çalışmamalıdır.', en: 'Successful delete is 204 (no body). The client must not try to parse a body.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-b8-order-01',
      question: { tr: 'POST\'un doğru başarı sözleşmesini test etme sırasını diz.', en: 'Order the steps to test POST\'s correct success contract.' },
      items: [
        { id: '1', text: { tr: 'Geçerli bir gövdeyle POST /api/v1/bugs gönder', en: 'Send POST /api/v1/bugs with a valid body' }, order: 1 },
        { id: '2', text: { tr: 'Status\'un tam 201 Created olduğunu doğrula (200 değil)', en: 'Verify the status is exactly 201 Created (not 200)' }, order: 2 },
        { id: '3', text: { tr: 'Location header\'ının var olduğunu ve adres verdiğini doğrula', en: 'Verify the Location header exists and gives an address' }, order: 3 },
        { id: '4', text: { tr: 'Location\'daki adrese GET atıp aynı kaydı oku', en: 'GET the address in Location and read the same record' }, order: 4 },
        { id: '5', text: { tr: 'Kod 200 veya Location eksikse contract bug\'ı olarak raporla', en: 'If the code is 200 or Location is missing, report a contract bug' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b8-status',
      id: 'api-b8-status',
      title: { tr: 'Kendin Dene: POST\'u 201 + Location Yap', en: 'Try It Yourself: Make POST Return 201 + Location' },
      starterCode: `// BUG: return bug -> Spring 200 doner, Location header yok -> zincir kirilir
@PostMapping
public Bug create(@Valid @RequestBody BugRequest req) {
    return service.create(req);
}`,
      solutionCode: `// FIX: 201 Created + Location header (yeni kaydin adresi)
@PostMapping
public ResponseEntity<Bug> create(@Valid @RequestBody BugRequest req) {
    Bug created = service.create(req);
    URI location = URI.create("/api/v1/bugs/" + created.getId());
    return ResponseEntity.created(location).body(created);
}`,
      hint: { tr: 'Düz `return bug` Spring\'te 200 üretir ve `Location` header\'ı eklemez. Kaynak oluşturmada `ResponseEntity.created(location).body(...)` ile 201 + Location dön; istemci zinciri yeni adresi buradan alır.', en: 'A plain `return bug` yields 200 in Spring and adds no `Location` header. For resource creation return 201 + Location with `ResponseEntity.created(location).body(...)`; the client chain reads the new address here.' },
      successMessage: { tr: 'Doğru! Artık POST 201 + Location döner; oluştur→oku zinciri kırılmaz.', en: 'Correct! Now POST returns 201 + Location; the create→read chain does not break.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir POST /api/v1/bugs kaydı oluşturuyor ama 201 yerine 200 dönüyor ve Location header\'ı yok. "2xx döndü, test geçsin" demek neden yanlış?', en: 'A POST /api/v1/bugs creates a record but returns 200 instead of 201 with no Location header. Why is "it\'s 2xx, let the test pass" wrong?' },
      options: [
        { id: 'a', text: { tr: 'Yanlış değil; 2xx her zaman yeterlidir', en: 'It is not wrong; 2xx is always enough' } },
        { id: 'b', text: { tr: 'Yanlış ama 2xx bir kod bir contract hatasıdır: Location\'a güvenen oluştur→oku otomasyon zincirleri sessizce kırılır', en: 'A wrong-but-2xx code is a contract defect: create→read automation chains relying on Location silently break' } },
        { id: 'c', text: { tr: 'Çünkü kayıt oluşmamıştır', en: 'Because the record was not created' } },
        { id: 'd', text: { tr: 'Çünkü 200 bir hata kodudur', en: 'Because 200 is an error code' } },
      ],
      correct: 'b',
      explanation: { tr: 'Kayıt oluşsa da yanlış status kodu (201 yerine 200) ve eksik Location, anlamsal sözleşmeyi bozar. Location header\'ından yeni kaydın adresini alan istemci/otomasyon zincirleri kırılır; ayrıca 200, "oluşturma" yerine "güncelleme/genel başarı" izlenimi verir. Tester status\'u ve Location\'ı ayrıca doğrulamalıdır — "2xx = geçti" varsayımı bu hatayı gizler.', en: 'Even though the record is created, the wrong status (200 instead of 201) and missing Location break the semantic contract. Client/automation chains reading the new address from Location break; also 200 implies "update/generic success" rather than "creation". The tester must verify the status and Location separately — the "2xx = passed" assumption hides this defect.' },
      retryQuestion: {
        question: { tr: 'Başarılı bir DELETE /api/v1/bugs/42 için en uygun status kodu nedir?', en: 'What is the most appropriate status code for a successful DELETE /api/v1/bugs/42?' },
        options: [
          { id: 'a', text: { tr: '204 No Content — silme başarılı, dönecek gövde yok', en: '204 No Content — delete succeeded, no body to return' } },
          { id: 'b', text: { tr: '201 Created', en: '201 Created' } },
          { id: 'c', text: { tr: '400 Bad Request', en: '400 Bad Request' } },
          { id: 'd', text: { tr: '500 Internal Server Error', en: '500 Internal Server Error' } },
        ],
        correct: 'a',
        explanation: { tr: 'Başarılı bir silmede dönecek anlamlı bir gövde yoktur; 204 No Content bunu ifade eder. 200 + boş gövde de görülür ama gövde ayrıştırmaya çalışan istemcileri yanıltabilir; 201 oluşturmaya, 4xx/5xx hataya aittir.', en: 'A successful delete has no meaningful body to return; 204 No Content expresses this. 200 + empty body is also seen but can mislead clients trying to parse a body; 201 is for creation, 4xx/5xx for errors.' },
      },
    },
  ],
}

const groupC = [
  ['C1', '🟢', 'Kurulum: npm init, express, nodemon', 'Setup: npm init, express, nodemon'],
  ['C2', '🛣️', 'Route Tanımı: app.get/post, req.params/query', 'Route Definition: app.get/post, req.params/query'],
  ['C3', '⛓️', 'Middleware Zinciri: express.json(), sıra', 'Middleware Chain: express.json(), order'],
  ['C4', '🛡️', 'Validation: express-validator / zod', 'Validation: express-validator / zod'],
  ['C5', '🚨', 'Error Handling Middleware: (err, req, res, next)', 'Error Handling Middleware: (err, req, res, next)'],
  ['C6', '⚖️', 'Java ↔ Express Karşılaştırma', 'Java ↔ Express Comparison'],
]

const groupD = [
  ['D1', '🐈', 'Nest CLI ve Modül Mimarisi', 'Nest CLI and Module Architecture'],
  ['D2', '🎀', "Controller Decorator'ları: @Get, @Post, @Body", 'Controller Decorators: @Get, @Post, @Body'],
  ['D3', '📦', 'DTO + class-validator + ValidationPipe', 'DTO + class-validator + ValidationPipe'],
  ['D4', '🧱', 'Exception Filter ve HttpException', 'Exception Filter and HttpException'],
  ['D5', '🔀', 'NestJS ↔ Spring Boot Karşılaştırması', 'NestJS ↔ Spring Boot Comparison'],
]

const groupE = [
  ['E1', '🔍', 'Network Paneli Anatomisi', 'Network Panel Anatomy'],
  ['E2', '🎚️', 'Fetch/XHR Filtresi: gürültüyü ayıklamak', 'Fetch/XHR Filter: cutting the noise'],
  ['E3', '📖', 'Bir İsteği Okumak: Headers / Payload / Response', 'Reading a Request: Headers / Payload / Response'],
  ['E4', '⏱️', 'Timing Sekmesi: TTFB, Waiting, Download', 'Timing Tab: TTFB, Waiting, Download'],
  ['E5', '🐞', "Network'ten Defect Yakalama", 'Catching Defects from Network'],
  ['E6', '🔗', 'Copy as cURL → Postman Import', 'Copy as cURL → Postman Import'],
]

const groupF = [
  ['F1', '📜', 'OpenAPI Spec Nedir? Sözleşme kavramı', 'What Is an OpenAPI Spec? The contract concept'],
  ['F2', '🏭', 'Swagger Üretimi: springdoc / @nestjs/swagger', 'Swagger Generation: springdoc / @nestjs/swagger'],
  ['F3', '👆', 'Swagger UI "Try it out": ilk elle test', 'Swagger UI "Try it out": first manual test'],
  ['F4', '🔎', 'Schema Okuma: required, type, enum, example', 'Reading Schema: required, type, enum, example'],
  ['F5', '⚠️', "Contract Defect'leri", 'Contract Defects'],
  ['F6', '🧾', "Swagger'dan Test Senaryosu Türetmek", 'Deriving Test Scenarios from Swagger'],
]

const groupG = [
  ['G1', '📁', 'Collection ve Klasör Yapısı', 'Collection and Folder Structure'],
  ['G2', '🌍', 'Environment + Variable: {{baseUrl}}, {{bugId}}', 'Environment + Variable: {{baseUrl}}, {{bugId}}'],
  ['G3', '🧪', 'pm.test ile Assertion', 'Assertions with pm.test'],
  ['G4', '🔗', 'Pre-request Script ve Test Zinciri', 'Pre-request Script and Test Chaining'],
  ['G5', '🚫', 'Negatif Test Setleri', 'Negative Test Sets'],
  ['G6', '⚡', 'Collection Runner + Newman ile CI', 'Collection Runner + Newman in CI'],
]

const groupH = [
  ['H1', '🎬', 'Bağımlılıklar ve İlk Test: given/when/then', 'Dependencies and First Test: given/when/then'],
  ['H2', '✔️', 'Response Doğrulama: statusCode, jsonPath', 'Response Validation: statusCode, jsonPath'],
  ['H3', '🔄', 'POJO Serialization/Deserialization', 'POJO Serialization/Deserialization'],
  ['H4', '📐', 'JSON Schema Validation ile contract testi', 'Contract Testing with JSON Schema Validation'],
  ['H5', '♻️', 'RequestSpecification ile tekrarı yok etmek', 'Removing Duplication with RequestSpecification'],
  ['H6', '🔁', 'JUnit 5/TestNG entegrasyonu + CI', 'JUnit 5/TestNG Integration + CI'],
]

const groupI = [
  ['I1', '🎭', 'request fixture ve APIRequestContext', 'request fixture and APIRequestContext'],
  ['I2', '🟩', 'expect(response).toBeOK() ve JSON assertion', 'expect(response).toBeOK() and JSON assertion'],
  ['I3', '🔀', "Hibrit Güç: API ile kur, UI'da doğrula", 'Hybrid Power: set up with API, verify in UI'],
  ['I4', '🔑', 'storageState ile API üzerinden login', 'Login via API with storageState'],
  ['I5', '⚔️', 'REST Assured ↔ Playwright Karşılaştırması', 'REST Assured ↔ Playwright Comparison'],
]

const groupJ = [['J', '🚨', 'Yaygın Hatalar ve Çözümleri', 'Common Errors and Fixes']]
const groupK = [['K', '💼', 'Mülakat Soruları', 'Interview Questions']]

// ─── sections: düz liste (sidebar bunu birebir sekme olarak render eder) ─────
const sections = [
  A1, A2, A3, A4, A5, A6, A7,
  B1, B2, B3, B4, B5, B6, B7, B8,
  ...groupC.map(mk), ...groupD.map(mk), ...groupE.map(mk),
  ...groupF.map(mk), ...groupG.map(mk), ...groupH.map(mk), ...groupI.map(mk),
  ...groupJ.map(mk), ...groupK.map(mk),
]

// ─── Hero + tabs ─────────────────────────────────────────────────────────────
const trHero = {
  title: '🔌 API Testing',
  subtitle: 'Geliştiriciden Test Otomasyonuna',
  intro: 'API\'yi hiç görmemiş bir tester için: önce API\'yi kendi ellerinle Java/Spring, Express ve NestJS ile yaz, sonra DevTools Network, Swagger, Postman, REST Assured ve Playwright ile test et. Her adımda "geliştirici bu satırı unutsaydı hangi bug doğardı?" sorusunu cevaplayan Defect Doğum Anı kutularıyla, tek örnek API (/api/v1/bugs) üzerinden.',
}

const enHero = {
  title: '🔌 API Testing',
  subtitle: 'From Developer to Test Automation',
  intro: 'For a tester who has never seen an API: first write the API yourself in Java/Spring, Express and NestJS, then test it with DevTools Network, Swagger, Postman, REST Assured and Playwright. With "Defect Birth" boxes answering "what bug would appear if the developer forgot this line?" at every step — all through a single example API (/api/v1/bugs).',
}

const trTabs = sections.map(s => s.title.tr)
const enTabs = sections.map(s => s.title.en)

// ─── Export (tek ağaç: sections İKİ dile de aynı referans) ───────────────────
export const apiTestingData = {
  tr: { hero: trHero, tabs: trTabs, sections },
  en: { hero: enHero, tabs: enTabs, sections },
}

// Kodsuz placeholder'larda no-op; içerik fazlarında code bloğu eklendikçe devreye girer.
fillMissingCodeTrios(apiTestingData, 'api-testing')

// ─── Feynman checkpoint'leri (GRUP A) — her grubun sonundaki konuya ────────────
const apiFeynmanDefs = [
  {
    sectionIndex: 0,
    promptTr: 'Bir API\'yi "istemci ile sunucu arasındaki sözleşme" olarak, sektöre yeni giren birine kendi cümlelerinle anlat. "İç detay" ve "sözleşme" kavramlarını kullan.',
    promptEn: 'Explain an API as "the contract between client and server" to a newcomer, in your own words. Use the ideas of "internals" and "contract".',
    keywords: ['sözleşme', 'contract', 'istemci', 'sunucu', 'iç', 'değiş'],
    modelAnswerTr: 'API, istemci ile sunucu arasındaki sözleşmedir: istemci sadece ne isteyebileceğini ve ne alacağını bilir, sunucunun içini bilmez. Sunucunun iç detayı (tablo, dil) değişse de sözleşme aynı kaldıkça istemci kırılmaz; tester bu sözleşmeyi test eder.',
    modelAnswerEn: 'An API is the contract between client and server: the client only knows what it can ask and what it gets back, not the server internals. Even if the server internals (tables, language) change, as long as the contract stays the same the client does not break; the tester tests this contract.',
  },
  {
    sectionIndex: 6,
    promptTr: 'Bir JSON yanıtında `"reporter": null` ile reporter alanının HİÇ olmaması arasındaki farkı ve bunun neden bir tester için önemli olduğunu kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, the difference between `"reporter": null` and the reporter field being entirely absent in a JSON response, and why it matters to a tester.',
    keywords: ['null', 'yok', 'anahtar', 'contract', 'regres', 'boş'],
    modelAnswerTr: 'null, anahtarın var ama değerinin bilinçli olarak boş olması demektir (bir veri durumu). Alanın hiç olmaması ise anahtarın kaybolması, yani bir contract regresyonu olabilir. Tester ikisini ayırmalıdır çünkü zayıf bir kontrol (if bug.reporter) ikisine de false verir ve alanın sessiz kaybını gizler.',
    modelAnswerEn: 'null means the key exists but its value is intentionally empty (a data state). A missing field means the key vanished, which can be a contract regression. A tester must distinguish them because a weak check (if bug.reporter) returns false for both and hides the field\'s silent loss.',
  },
  {
    sectionIndex: 13,
    promptTr: 'UI zaten boş başlığı engelliyorken sunucuda @Valid ile ayrıca doğrulama neden şart? Bir testerın bunu nasıl kanıtladığını kendi cümlelerinle anlat.',
    promptEn: 'If the UI already blocks an empty title, why is server-side validation with @Valid still mandatory? Explain in your own words how a tester proves it.',
    keywords: ['ui', 'istemci', 'client', 'bypass', 'sunucu', 'server', '@valid', '400'],
    modelAnswerTr: 'UI sadece bir istemcidir; mobil uygulama, Postman veya başka bir servis API\'ye doğrudan vurup UI\'nın JS kontrolünü atlar. Bu yüzden güvenilebilecek tek doğrulama sunucudaki @Valid\'dir. Tester bunu UI\'yı bypass edip doğrudan API\'ye geçersiz veri (boş title) göndererek kanıtlar: 400 bekler, 201 gelirse @Valid eksiktir.',
    modelAnswerEn: 'The UI is just one client; a mobile app, Postman, or another service can hit the API directly and bypass the UI\'s JS check. So the only trustworthy validation is @Valid on the server. The tester proves it by bypassing the UI and sending invalid data (empty title) straight to the API: expecting 400, and if 201 arrives, @Valid is missing.',
  },
]

fillMissingFeynman(apiTestingData, apiFeynmanDefs)
