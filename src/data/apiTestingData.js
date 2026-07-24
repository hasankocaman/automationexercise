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

// ═══════════════════════════════════════════════════════════════════════════
// GRUP C — Aynı API'yi Express.js ile Yazmak (KODLU + Defect şablonu, kısa/öz)
// ═══════════════════════════════════════════════════════════════════════════

const C1 = {
  title: { tr: '🟢 C1 · Kurulum: npm init, express, nodemon', en: '🟢 C1 · Setup: npm init, express, nodemon' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🟢',
      content: {
        tr: 'Bir Express projesi kurmak, **boş bir dükkan kiralamak** gibidir: Spring Boot\'un "starter"ı sana döşenmiş bir mutfak verirken (Bölüm B1), Express sana sadece anahtarı verir — tezgahı, ocağı, tabelayı sen kurarsın. `npm init` boş bir sözleşme (package.json) açar, `npm install express` tek bir minik kütüphane ekler (yönlendirme + HTTP yardımcıları), gerisi (validation, ORM, loglama) senin seçimindir. Peki Spring\'de tek satır her şeyi getirirken Express\'te neden bu kadar "çıplak" başlıyoruz? Çünkü Node ekosisteminin felsefesi **un-opinionated**\'dır — sana dayatma yapmaz, sen neye ihtiyacın olduğuna karar verirsin; küçük bir servis için bu hız kazandırır, büyük bir takımda ise disiplin gerektirir (herkes farklı bir validation kütüphanesi seçebilir). Java\'da bunun en yakın karşılığı çıplak bir Servlet projesi kurmaktır — Spring Boot bunu senin için otomatikleştirir, Express otomatikleştirmez. Tester için sonuç aynı: kurulum kırıksa test edilecek bir sunucu yoktur; ilk smoke test yine "uygulama hatasız başlıyor ve bir portu dinliyor mu?" sorusudur.',
        en: 'Setting up an Express project is like **renting an empty shop**: while Spring Boot\'s "starter" (Chapter B1) hands you a fully furnished kitchen, Express only hands you the key — you build the counter, the stove, the sign yourself. `npm init` opens an empty contract (package.json), `npm install express` adds one small library (routing + HTTP helpers), the rest (validation, ORM, logging) is your choice. So why does Spring bring everything in one line while Express starts this "bare"? Because the Node ecosystem\'s philosophy is **un-opinionated** — it does not impose, you decide what you need; for a small service this is fast, for a large team it demands discipline (everyone might pick a different validation library). In Java the closest equivalent is setting up a bare Servlet project — Spring Boot automates that for you, Express does not. For a tester the outcome is the same: if setup is broken there is no server to test; the first smoke test is still "does the app start without error and listen on a port?"',
      },
    },
    { type: 'heading', text: { tr: 'İlk Sunucu: 5 Satırda Ayakta', en: 'The First Server: Up in 5 Lines' } },
    {
      type: 'code',
      language: 'bash',
      code: {
        tr: `# Yeni proje: bos bir package.json olusturur
npm init -y

# Express kutuphanesini ekler
npm install express

# Kod her degistiginde sunucuyu otomatik yeniden baslatir (gelistirme icin)
npm install --save-dev nodemon`,
        en: `# New project: creates an empty package.json
npm init -y

# Adds the Express library
npm install express

# Restarts the server automatically on every code change (for development)
npm install --save-dev nodemon`,
      },
    },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `// index.js — Bug Tracker API'sinin ilk hali
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/api/v1/bugs', (req, res) => {
  res.json([])   // simdilik bos liste — B'deki Java servisiyle ayni sozlesme
})

// TODO: sunucuyu bir porta baglamadan calisan bir Express uygulamasi YOKTUR
app.listen(PORT, () => {
  console.log(\`Bug Tracker API port \${PORT} dinliyor\`)
})`,
        en: `// index.js — the Bug Tracker API's first version
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/api/v1/bugs', (req, res) => {
  res.json([])   // empty list for now — same contract as the Java service in Group B
})

// TODO: there is NO running Express app without binding to a port
app.listen(PORT, () => {
  console.log(\`Bug Tracker API listening on port \${PORT}\`)
})`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `app.listen(...)` unutulursa**\n\n**Kod:** `app.get(...)` yazıldı, route tanımlandı, ama dosyanın sonunda `app.listen(PORT, ...)` satırı YOK.\n\n**Ne olur:** `node index.js` çalıştırılır, script hatasız biter, terminal sessizce komut istemine döner — hiçbir hata mesajı YOKTUR. Hiçbir port dinlenmediği için `curl http://localhost:3000/api/v1/bugs` `ECONNREFUSED` verir.\n\n**Neden sinsi:** Kodda syntax hatası yok, route doğru yazılmış, derleme/parse aşaması sorunsuz geçer. Bir stack trace bile yoktur — sadece "hiçbir şey olmaz". Yeni başlayan bir geliştirici bunu "sunucu çöktü" sanıp saatlerce route kodunda hata arayabilir.\n\n**Tester nerede yakalar:** Otomasyonun ilk isteğinde bağlantı reddi (`ECONNREFUSED`) alınca — bu GRUP J\'deki "sunucuya hiç ulaşılamıyor" hata kategorisinin köküdür.',
        en: '**🐞 Defect Birth — if `app.listen(...)` is forgotten**\n\n**Code:** `app.get(...)` was written, the route is defined, but the file has no `app.listen(PORT, ...)` line at the end.\n\n**What happens:** `node index.js` runs, the script ends without error, the terminal silently returns to the prompt — there is NO error message. Because no port is listening, `curl http://localhost:3000/api/v1/bugs` returns `ECONNREFUSED`.\n\n**Why sneaky:** there is no syntax error, the route is written correctly, parsing passes cleanly. There is not even a stack trace — just "nothing happens". A beginner developer may assume "the server crashed" and hunt for bugs in the route code for hours.\n\n**Where the tester catches it:** on automation\'s very first request, getting a connection refusal (`ECONNREFUSED`) — this is the root of the "cannot reach the server at all" error category in GROUP J.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-c1-setup-film',
      title: { tr: '🎬 Boş Dükkandan Dinleyen Sunucuya', en: '🎬 From an Empty Shop to a Listening Server' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'empty', emoji: '📭', label: { tr: 'Boş Proje', en: 'Empty Project' }, color: '#94a3b8' },
        { id: 'express', emoji: '🟢', label: { tr: 'express', en: 'express' }, color: '#22c55e' },
        { id: 'route', emoji: '🛣️', label: { tr: 'app.get(...)', en: 'app.get(...)' }, color: '#f59e0b' },
        { id: 'listen', emoji: '👂', label: { tr: 'app.listen()', en: 'app.listen()' }, color: '#0ea5e9' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'curl ile smoke test', en: 'curl smoke test' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: '`npm init -y` ile boş bir package.json açtın — henüz tek satır sunucu kodu yok.', en: '`npm init -y` opened an empty package.json — there is not a single line of server code yet.' },
          positions: { empty: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: '`npm install express` — küçük ama yönlendirme + HTTP yardımcılarını getiren tek kütüphane eklendi.', en: '`npm install express` — one small library was added, bringing routing + HTTP helpers.' },
          positions: { empty: { x: 20, y: 40 }, express: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'empty', to: 'express', color: '#22c55e' }],
        },
        {
          caption: { tr: '`app.get(\'/api/v1/bugs\', ...)` — bir yol tanımlandı, ama bu SADECE tanımdır, sunucu henüz hiçbir portu dinlemiyor.', en: '`app.get(\'/api/v1/bugs\', ...)` — a path was defined, but this is ONLY a definition, the server is not listening on any port yet.' },
          positions: { express: { x: 22, y: 40 }, route: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'express', to: 'route', color: '#f59e0b' }],
        },
        {
          caption: { tr: '`app.listen(PORT, ...)` çağrılmadan Express uygulaması "canlı" sayılmaz — bu satır olmadan tanımlı route\'lar da erişilemez kalır.', en: 'Without calling `app.listen(PORT, ...)` an Express app is not considered "alive" — without this line, even defined routes stay unreachable.' },
          positions: { route: { x: 22, y: 40 }, listen: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'route', to: 'listen', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Ders — `node index.js` hatasız bitmesi "çalışıyor" anlamına gelmez; tester ilk kanıtı gerçek bir istekle (`curl`/Postman) ister.', en: 'The lesson — `node index.js` ending without error does not mean "it works"; the tester wants the first proof from a real request (`curl`/Postman).' },
          positions: { listen: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'listen', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Boş Klasörden İlk Yanıta', en: 'From an Empty Folder to the First Response' },
      steps: [
        { id: 1, icon: '📭', label: { tr: 'Proje aç…', en: 'Open project…' }, detail: { tr: 'npm init -y ile boş package.json oluştur, npm install express ile kütüphaneyi ekle.', en: 'Create an empty package.json with npm init -y, add the library with npm install express.' } },
        { id: 2, icon: '🛣️', label: { tr: 'Route yaz…', en: 'Write route…' }, detail: { tr: 'app.get(\'/api/v1/bugs\', ...) ile ilk yolu tanımla — bu henüz sunucuyu ayağa kaldırmaz.', en: 'Define the first path with app.get(\'/api/v1/bugs\', ...) — this does not start the server yet.' } },
        { id: 3, icon: '👂', label: { tr: 'Dinlemeye başla…', en: 'Start listening…' }, detail: { tr: 'app.listen(PORT, ...) çağrısı olmadan hiçbir istek sunucuya ulaşamaz.', en: 'Without calling app.listen(PORT, ...) no request can ever reach the server.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-c1-order-01',
      question: { tr: 'Express API\'sini sıfırdan ayağa kaldırma sırasını diz.', en: 'Order the steps to bring up an Express API from scratch.' },
      items: [
        { id: '1', text: { tr: 'npm init -y ile package.json oluştur', en: 'Create package.json with npm init -y' }, order: 1 },
        { id: '2', text: { tr: 'npm install express ile kütüphaneyi ekle', en: 'Add the library with npm install express' }, order: 2 },
        { id: '3', text: { tr: 'app.get(...) ile ilk route\'u tanımla', en: 'Define the first route with app.get(...)' }, order: 3 },
        { id: '4', text: { tr: 'app.listen(PORT, ...) ile sunucuyu başlat', en: 'Start the server with app.listen(PORT, ...)' }, order: 4 },
        { id: '5', text: { tr: 'curl ile smoke test at, yanıt geldiğini doğrula', en: 'Run a smoke test with curl, verify a response arrives' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-c1-setup',
      id: 'api-c1-setup',
      title: { tr: 'Kendin Dene: Sunucuyu Dinlemeye Al', en: 'Try It Yourself: Make the Server Listen' },
      starterCode: `const express = require('express')
const app = express()

app.get('/api/v1/bugs', (req, res) => {
  res.json([])
})

// BUG: sunucu hicbir portu dinlemiyor
console.log('Bugs API hazir')`,
      solutionCode: `const express = require('express')
const app = express()

app.get('/api/v1/bugs', (req, res) => {
  res.json([])
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(\`Bugs API port \${PORT} dinliyor\`)
})`,
      hint: { tr: 'Route tanımlamak sunucuyu başlatmaz. Bir Express uygulamasının istek kabul edebilmesi için mutlaka `app.listen(port, callback)` çağrısı gerekir; bu satır yoksa süreç sessizce sonlanır.', en: 'Defining a route does not start the server. An Express app must call `app.listen(port, callback)` before it can accept requests; without this line the process ends silently.' },
      successMessage: { tr: 'Doğru! Artık process sonlanmaz, port dinlenir ve curl/Postman gerçek bir yanıt alır.', en: 'Correct! Now the process does not exit, the port is listened on, and curl/Postman get a real response.' },
    },
    {
      type: 'quiz',
      question: { tr: '`app.listen(PORT, ...)` çağrısı olmadan `node index.js` çalıştırılırsa ne olur?', en: 'What happens if `node index.js` is run without calling `app.listen(PORT, ...)`?' },
      options: [
        { id: 'a', text: { tr: 'Node bir syntax hatası fırlatır', en: 'Node throws a syntax error' } },
        { id: 'b', text: { tr: 'Script sessizce biter; hiçbir port dinlenmez, istekler ECONNREFUSED alır', en: 'The script ends silently; no port is listened on, requests get ECONNREFUSED' } },
        { id: 'c', text: { tr: 'Route\'lar varsayılan olarak 80 portunda çalışır', en: 'Routes automatically run on port 80' } },
        { id: 'd', text: { tr: 'Express otomatik olarak boş bir port bulur', en: 'Express automatically finds an empty port' } },
      ],
      correct: 'b',
      explanation: { tr: '`app.get(...)` sadece bir yol TANIMLAR; sunucunun bir portu dinlemeye başlaması için ayrıca `app.listen(...)` çağrılması gerekir. Bu satır eksikse hata fırlatılmaz, script normal biter ve hiçbir istemci sunucuya ulaşamaz.', en: '`app.get(...)` only DEFINES a path; the server must separately call `app.listen(...)` to start listening on a port. Without this line no error is thrown, the script ends normally, and no client can reach the server.' },
      retryQuestion: {
        question: { tr: 'Express\'te `npm init -y` komutunun tek başına yaptığı şey nedir?', en: 'What does the `npm init -y` command do on its own in Express?' },
        options: [
          { id: 'a', text: { tr: 'Boş bir package.json oluşturur — henüz hiçbir kütüphane eklenmez', en: 'Creates an empty package.json — no library is added yet' } },
          { id: 'b', text: { tr: 'Express kütüphanesini indirir ve kurar', en: 'Downloads and installs the Express library' } },
          { id: 'c', text: { tr: 'Bir sunucu başlatır', en: 'Starts a server' } },
          { id: 'd', text: { tr: 'nodemon\'u otomatik ekler', en: 'Automatically adds nodemon' } },
        ],
        correct: 'a',
        explanation: { tr: '`npm init -y` sadece proje sözleşmesini (package.json) varsayılan değerlerle oluşturur; Express veya başka bir kütüphane bu adımda EKLENMEZ, o `npm install express` ile ayrı bir adımdır.', en: '`npm init -y` only creates the project contract (package.json) with default values; Express or any other library is NOT added in this step — that is the separate `npm install express` step.' },
      },
    },
  ],
}

const C2 = {
  title: { tr: '🛣️ C2 · Route Tanımı: app.get/post, req.params/query', en: '🛣️ C2 · Route Definition: app.get/post, req.params/query' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🛣️',
      content: {
        tr: 'Bir Express route\'u, otelde **oda numarası ve resepsiyon talimatı** gibidir: `app.get(\'/api/v1/bugs/:id\', ...)` yazdığında `:id` kısmı değişken bir "oda numarası" (path parameter), `?status=OPEN` gibi bir sorgu ise resepsiyona bırakılan bir "not" (query parameter) — biri **yolun kendisinin bir parçası**, diğeri **isteğe bağlı bir ek bilgi**dir. Spring\'de bu ikisi `@PathVariable` ve `@RequestParam` annotation\'larıyla imzada açıkça görünür; Express\'te ise `req.params.id` ve `req.query.status` ile fonksiyon gövdesinde elle okunur — annotation yerine sözleşme, fonksiyonun İÇİNDE yaşar. Peki neden bazı bilgi yola (`/bugs/42`), bazısı sorguya (`?status=OPEN`) konur? Çünkü yol bir **kaynağın kimliğini** taşır (42 numaralı bug olmadan bu istek anlamsızdır), sorgu ise bir **filtreleme/isteğe bağlı davranışı** taşır (status olmadan da liste isteği geçerlidir). Tester için bunun anlamı: `req.params` HER ZAMAN string gelir — JavaScript\'in tip sistemi zayıf olduğundan `"1" === 1` FALSE\'tur; bu, ID karşılaştırmalarında sinsi bir hata kaynağıdır ve az sonra göreceğin gibi gerçek bir defect doğurur.',
        en: 'An Express route is like a **room number and a note left at reception**: writing `app.get(\'/api/v1/bugs/:id\', ...)` makes `:id` a variable "room number" (path parameter), while something like `?status=OPEN` is a "note" left at reception (query parameter) — one is **part of the path itself**, the other is **optional extra information**. In Spring these two are visible right in the signature via `@PathVariable` and `@RequestParam`; in Express they are read by hand in the function body with `req.params.id` and `req.query.status` — the contract lives INSIDE the function instead of the annotation. So why does some information go in the path (`/bugs/42`) and some in the query (`?status=OPEN`)? Because the path carries a resource\'s **identity** (this request is meaningless without bug number 42), while the query carries **optional filtering/behavior** (a list request is still valid without status). For a tester this means: `req.params` ALWAYS arrives as a string — since JavaScript has weak typing, `"1" === 1` is FALSE; this is a sneaky source of bugs in ID comparisons, and, as you will see next, a real defect.',
      },
    },
    { type: 'heading', text: { tr: 'Liste, Filtre ve Tek Kayıt', en: 'List, Filter, and a Single Record' } },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `const bugs = [
  { id: 1, title: 'Login butonu donuyor', severity: 'HIGH', status: 'OPEN' },
  { id: 2, title: 'Logo hizasi bozuk', severity: 'LOW', status: 'CLOSED' },
]

// GET /api/v1/bugs?status=OPEN&page=1&size=20
app.get('/api/v1/bugs', (req, res) => {
  const { status, severity, page = 1, size = 20 } = req.query
  let result = bugs
  if (status) result = result.filter(b => b.status === status)
  if (severity) result = result.filter(b => b.severity === severity)
  res.json({ page: Number(page), size: Number(size), items: result })
})

// GET /api/v1/bugs/42
app.get('/api/v1/bugs/:id', (req, res) => {
  const bug = bugs.find(b => b.id === req.params.id)   // BUG: asagida acikliyoruz
  if (!bug) return res.status(404).json({ error: 'Bug bulunamadi' })
  res.json(bug)
})`,
        en: `const bugs = [
  { id: 1, title: 'Login button freezes', severity: 'HIGH', status: 'OPEN' },
  { id: 2, title: 'Logo alignment broken', severity: 'LOW', status: 'CLOSED' },
]

// GET /api/v1/bugs?status=OPEN&page=1&size=20
app.get('/api/v1/bugs', (req, res) => {
  const { status, severity, page = 1, size = 20 } = req.query
  let result = bugs
  if (status) result = result.filter(b => b.status === status)
  if (severity) result = result.filter(b => b.severity === severity)
  res.json({ page: Number(page), size: Number(size), items: result })
})

// GET /api/v1/bugs/42
app.get('/api/v1/bugs/:id', (req, res) => {
  const bug = bugs.find(b => b.id === req.params.id)   // BUG: explained below
  if (!bug) return res.status(404).json({ error: 'Bug not found' })
  res.json(bug)
})`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `req.params.id` tip dönüşümü unutulursa**\n\n**Kod:** `bugs.find(b => b.id === req.params.id)` — `b.id` bir **number** (1, 2, ...), `req.params.id` her zaman bir **string** (`"1"`, `"2"`, ...).\n\n**Ne olur:** `GET /api/v1/bugs/1` isteği gönderilir, kayıt VERİTABANINDA vardır, ama `1 === "1"` JavaScript\'te `false` olduğu için `find` hiçbir zaman eşleşme bulamaz — sonuç her zaman 404\'tür, kayıt var olsa bile.\n\n**Neden sinsi:** Kod okunduğunda mantık tamamen doğru görünür ("id\'leri karşılaştırıyoruz"). Hata bir syntax veya runtime exception değil, sessiz bir mantık hatasıdır — sadece testerin "bu ID kesinlikle var, neden 404 alıyorum?" diye şaşırmasıyla ortaya çıkar.\n\n**Tester nerede yakalar:** Var olduğu bilinen bir ID ile GET isteği atıp 200 yerine 404 alınca — bu, JS\'in zayıf tipleme tuzağının klasik bir örneğidir; düzeltme `Number(req.params.id)` ile tip dönüşümü yapmaktır.',
        en: '**🐞 Defect Birth — if the `req.params.id` type conversion is forgotten**\n\n**Code:** `bugs.find(b => b.id === req.params.id)` — `b.id` is a **number** (1, 2, ...), `req.params.id` always arrives as a **string** (`"1"`, `"2"`, ...).\n\n**What happens:** a `GET /api/v1/bugs/1` request is sent, the record EXISTS in the data, but since `1 === "1"` is `false` in JavaScript, `find` never matches — the result is always 404, even though the record exists.\n\n**Why sneaky:** reading the code, the logic looks entirely correct ("we are comparing IDs"). The failure is not a syntax or runtime exception, it is a silent logic bug — it only surfaces when a tester is confused: "this ID definitely exists, why am I getting 404?"\n\n**Where the tester catches it:** sending a GET request with a known-existing ID and getting 404 instead of 200 — a classic example of JavaScript\'s weak-typing trap; the fix is converting the type with `Number(req.params.id)`.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-c2-params-film',
      title: { tr: '🎬 "1" ≠ 1: Path Parameter Neden Her Zaman String Gelir?', en: '🎬 "1" ≠ 1: Why a Path Parameter Always Arrives as a String' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'url', emoji: '🔗', label: { tr: '/bugs/1', en: '/bugs/1' }, color: '#f59e0b' },
        { id: 'params', emoji: '📦', label: { tr: 'req.params.id = "1"', en: 'req.params.id = "1"' }, color: '#0ea5e9' },
        { id: 'data', emoji: '🗄️', label: { tr: 'bug.id = 1 (number)', en: 'bug.id = 1 (number)' }, color: '#a78bfa' },
        { id: 'compare', emoji: '⚖️', label: { tr: '"1" === 1 → false', en: '"1" === 1 → false' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Beklenmeyen 404', en: 'Unexpected 404' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'İstemci `/api/v1/bugs/1` isteği gönderiyor — URL her zaman metin karakterlerinden oluşur.', en: 'The client sends a request to `/api/v1/bugs/1` — a URL is always made of text characters.' },
          positions: { url: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Express, `:id` kısmını `req.params.id` içine STRING olarak koyar: `"1"`, sayı değil.', en: 'Express places the `:id` part into `req.params.id` as a STRING: `"1"`, not a number.' },
          positions: { url: { x: 22, y: 40 }, params: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'url', to: 'params', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Ama bellekteki bug kaydının `id` alanı bir NUMBER\'dır: `1`.', en: 'But the bug record in memory has an `id` field that is a NUMBER: `1`.' },
          positions: { params: { x: 22, y: 40 }, data: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'params', to: 'data', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'JavaScript\'te `===` tip dönüşümü YAPMAZ: `"1" === 1` her zaman `false`\'tur.', en: 'In JavaScript, `===` does NOT coerce types: `"1" === 1` is always `false`.' },
          positions: { data: { x: 22, y: 40 }, compare: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'data', to: 'compare', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — `find` hiç eşleşme bulamaz, kayıt var olsa bile 404 döner. Tester `Number(req.params.id)` dönüşümünün yapıldığını doğrulamalıdır.', en: 'The lesson — `find` never matches, 404 is returned even though the record exists. The tester must verify that `Number(req.params.id)` conversion is done.' },
          positions: { compare: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'compare', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'req.params vs req.query: Kim Nereden Gelir?', en: 'req.params vs req.query: Where Does Each Come From?' },
      steps: [
        { id: 1, icon: '🔗', label: { tr: 'Yolu ayrıştır…', en: 'Parse the path…' }, detail: { tr: '/bugs/:id kalıbındaki :id, req.params.id olarak STRING gelir.', en: 'The :id in /bugs/:id arrives as req.params.id, a STRING.' } },
        { id: 2, icon: '❓', label: { tr: 'Sorguyu ayrıştır…', en: 'Parse the query…' }, detail: { tr: '?status=OPEN&page=1 gibi ekler req.query nesnesine STRING olarak konur.', en: 'Suffixes like ?status=OPEN&page=1 are placed on the req.query object, also as STRINGs.' } },
        { id: 3, icon: '🔢', label: { tr: 'Tipini dönüştür…', en: 'Convert the type…' }, detail: { tr: 'Sayısal karşılaştırma öncesi Number(...) ile dönüştür, aksi halde === her zaman false döner.', en: 'Convert with Number(...) before numeric comparison, otherwise === always returns false.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-c2-order-01',
      question: { tr: 'Tek bir bug kaydını ID ile getirme akışını sırala.', en: 'Order the flow for fetching a single bug record by ID.' },
      items: [
        { id: '1', text: { tr: 'İstemci GET /api/v1/bugs/1 gönderir', en: 'Client sends GET /api/v1/bugs/1' }, order: 1 },
        { id: '2', text: { tr: 'Express :id kısmını req.params.id\'ye STRING olarak koyar', en: 'Express places the :id part into req.params.id as a STRING' }, order: 2 },
        { id: '3', text: { tr: 'Handler req.params.id\'yi Number() ile sayıya çevirir', en: 'The handler converts req.params.id to a number with Number()' }, order: 3 },
        { id: '4', text: { tr: 'bugs.find ile sayısal id eşleşmesi aranır', en: 'bugs.find searches for a matching numeric id' }, order: 4 },
        { id: '5', text: { tr: 'Eşleşme varsa 200 + kayıt, yoksa 404 döner', en: 'If matched, 200 + record; otherwise 404 is returned' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-c2-routes',
      id: 'api-c2-routes',
      title: { tr: 'Kendin Dene: ID Karşılaştırmasını Düzelt', en: 'Try It Yourself: Fix the ID Comparison' },
      starterCode: `app.get('/api/v1/bugs/:id', (req, res) => {
  // BUG: req.params.id daima string, b.id ise number
  const bug = bugs.find(b => b.id === req.params.id)
  if (!bug) return res.status(404).json({ error: 'Bug bulunamadi' })
  res.json(bug)
})`,
      solutionCode: `app.get('/api/v1/bugs/:id', (req, res) => {
  const numericId = Number(req.params.id)
  const bug = bugs.find(b => b.id === numericId)
  if (!bug) return res.status(404).json({ error: 'Bug bulunamadi' })
  res.json(bug)
})`,
      hint: { tr: '`req.params.id` her zaman string olarak gelir; kayıtlardaki `id` alanı ise number\'dır. Karşılaştırmadan önce `Number(req.params.id)` ile dönüştür, aksi halde `===` asla eşleşmez.', en: '`req.params.id` always arrives as a string; the `id` field in records is a number. Convert with `Number(req.params.id)` before comparing, otherwise `===` never matches.' },
      successMessage: { tr: 'Doğru! Artık var olan bir ID her zaman 200 + kayıt döner, sessiz 404 kaybolur.', en: 'Correct! Now an existing ID always returns 200 + the record, the silent 404 disappears.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Kayıt gerçekten var olduğu halde `GET /api/v1/bugs/1` neden 404 dönebilir?', en: 'Why might `GET /api/v1/bugs/1` return 404 even though the record really exists?' },
      options: [
        { id: 'a', text: { tr: 'req.params.id string gelir, kayıttaki id number\'dır; === tip dönüşümü yapmadığı için eşleşmez', en: 'req.params.id arrives as a string, the record\'s id is a number; === does not coerce types so they never match' } },
        { id: 'b', text: { tr: 'Express 404\'ü rastgele üretir', en: 'Express generates 404 randomly' } },
        { id: 'c', text: { tr: 'GET istekleri asla path parametresi kabul etmez', en: 'GET requests never accept path parameters' } },
        { id: 'd', text: { tr: 'bugs dizisi her istekte sıfırlanır', en: 'The bugs array resets on every request' } },
      ],
      correct: 'a',
      explanation: { tr: 'JavaScript\'in `===` operatörü tip dönüşümü yapmaz; `"1" === 1` daima `false`\'tur. `req.params` her zaman string olduğundan, sayısal `id` alanıyla dönüşümsüz karşılaştırma sessizce başarısız olur ve `find` hiçbir zaman eşleşme bulamaz.', en: 'JavaScript\'s `===` operator does not coerce types; `"1" === 1` is always `false`. Since `req.params` is always a string, comparing it against a numeric `id` field without conversion silently fails, and `find` never matches.' },
      retryQuestion: {
        question: { tr: '`req.query` ile `req.params` arasındaki temel fark nedir?', en: 'What is the fundamental difference between `req.query` and `req.params`?' },
        options: [
          { id: 'a', text: { tr: 'params yolun bir parçasıdır (kaynak kimliği), query isteğe bağlı filtre/ek bilgidir', en: 'params is part of the path (resource identity), query is optional filter/extra info' } },
          { id: 'b', text: { tr: 'İkisi de aynı şeydir, birbirinin yerine kullanılabilir', en: 'They are the same thing and interchangeable' } },
          { id: 'c', text: { tr: 'params sadece POST isteklerinde, query sadece GET isteklerinde çalışır', en: 'params only works on POST requests, query only on GET requests' } },
          { id: 'd', text: { tr: 'query her zaman sayı, params her zaman metin döner', en: 'query always returns a number, params always returns text' } },
        ],
        correct: 'a',
        explanation: { tr: '`/bugs/:id` gibi bir path parametresi kaynağın kimliğini taşır — onsuz istek anlamsızdır. `?status=OPEN` gibi bir query parametresi ise isteğe bağlı bir filtre/davranıştır — olmadan da istek geçerlidir.', en: 'A path parameter like `/bugs/:id` carries a resource\'s identity — the request is meaningless without it. A query parameter like `?status=OPEN` is an optional filter/behavior — the request is still valid without it.' },
      },
    },
  ],
}

const C3 = {
  title: { tr: '⛓️ C3 · Middleware Zinciri: express.json(), sıra', en: '⛓️ C3 · Middleware Chain: express.json(), order' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '⛓️',
      content: {
        tr: 'Middleware zinciri, bir **havalimanı güvenlik koridoru** gibidir: yolcu (istek) sırayla check-in, bagaj taraması, pasaport kontrolü kontrol noktalarından geçer; her kontrol noktası (`function(req, res, next)`) yolcuyu inceleyebilir, üzerine bir şey ekleyebilir (bagaj etiketi) veya durdurabilir — ve bir sonraki noktaya SADECE `next()` çağrılırsa geçilir. `express.json()` de tam olarak böyle bir kontrol noktasıdır: gelen JSON gövdesini okuyup `req.body`\'ye "etiketler", route handler\'a devretmeden önce. Peki Spring\'de bu iş neden tek bir `@RequestBody` annotation\'ıyla otomatik olurken Express\'te ayrı bir adım gerekiyor? Çünkü Spring MVC\'nin arkasında hazır bir istek işleme hattı (dispatcher servlet) vardır ve gövde ayrıştırma bu hattın standart bir parçasıdır; Express\'te böyle bir hat YOKTUR — sen zinciri elle, sırayla kurarsın; en yakın Java karşılığı Servlet **Filter** zinciridir (her filter `chain.doFilter()` çağırana kadar bir sonrakine geçilmez). Tester için kritik nokta: middleware\'lerin SIRASI davranışı belirler — `express.json()` route\'lardan sonra tanımlanırsa, route\'lar asla ayrıştırılmış bir gövde göremez; bu, "kod doğru ama sıra yanlış" kategorisindeki en sinsi hata türüdür.',
        en: 'A middleware chain is like an **airport security corridor**: a passenger (request) passes through check-in, baggage scan, and passport control in order; each checkpoint (`function(req, res, next)`) can inspect the passenger, attach something (a baggage tag), or stop them — and moving to the next checkpoint happens ONLY if `next()` is called. `express.json()` is exactly such a checkpoint: it reads the incoming JSON body and "tags" it onto `req.body` before handing off to the route handler. So why does Spring do this automatically with a single `@RequestBody` annotation while Express needs a separate step? Because behind Spring MVC there is a ready-made request-processing pipeline (the dispatcher servlet) and body parsing is a standard part of that pipeline; Express has NO such pipeline — you build the chain by hand, in order; the closest Java equivalent is the Servlet **Filter** chain (each filter blocks the next until `chain.doFilter()` is called). The critical point for a tester: the ORDER of middleware determines behavior — if `express.json()` is defined after the routes, the routes never see a parsed body; this is the sneakiest kind of bug, the "code is correct but the order is wrong" category.',
      },
    },
    { type: 'heading', text: { tr: 'Zincir Kurmak: Sıra Neden Kritik?', en: 'Building the Chain: Why Order Is Critical' } },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `const express = require('express')
const app = express()

// Middleware 1: JSON govdesini ayristirir, req.body'yi doldurur.
// TODO: bu satir mutlaka route tanimlarindan ONCE gelmeli.
app.use(express.json())

// Middleware 2: her istegi loglar, sonra next() ile devreder
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`)
  next()   // cagrilmazsa istek burada TAKILIR KALIR
})

// Route: zincirin en sonunda, artik req.body dolu gelir
app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body
  res.status(201).json({ id: 1, title, severity })
})`,
        en: `const express = require('express')
const app = express()

// Middleware 1: parses the JSON body, fills req.body.
// TODO: this line must always come BEFORE the route definitions.
app.use(express.json())

// Middleware 2: logs every request, then hands off with next()
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`)
  next()   // if not called, the request gets STUCK here
})

// Route: at the end of the chain, req.body arrives already filled
app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body
  res.status(201).json({ id: 1, title, severity })
})`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `express.json()` route\'lardan SONRA tanımlanırsa**\n\n**Kod:** `app.post(\'/api/v1/bugs\', ...)` önce, `app.use(express.json())` en altta.\n\n**Ne olur:** `POST /api/v1/bugs { "title": "...", "severity": "HIGH" }` isteği gönderilir; handler çalıştığında `req.body` HÂLÂ `undefined`\'dır çünkü ayrıştırıcı middleware zincirde daha SONRAKI bir noktada. `const { title, severity } = req.body` çökmez (destructuring `undefined`\'dan `undefined` üretir), sunucu `201 Created` döner ama `title: undefined, severity: undefined` ile bir kayıt oluşturulur.\n\n**Neden sinsi:** İstek 201 ile "başarılı" görünür, sunucu çökmez, hata log\'u yoktur — ama veritabanında (bellekte) tamamen boş bir bug kaydı oluşur. Kodun KENDİSİ (`express.json()` çağrısı) doğrudur, tek sorun SIRASIDIR.\n\n**Tester nerede yakalar:** POST sonrası dönen kaydı GET ile tekrar okuyup `title` alanının `null`/`undefined` geldiğini görünce — bu, "201 aldım ama içerik boş" sınıfındaki en klasik middleware sıralama hatasıdır.',
        en: '**🐞 Defect Birth — if `express.json()` is defined AFTER the routes**\n\n**Code:** `app.post(\'/api/v1/bugs\', ...)` comes first, `app.use(express.json())` sits at the bottom.\n\n**What happens:** a `POST /api/v1/bugs { "title": "...", "severity": "HIGH" }` request is sent; when the handler runs, `req.body` is STILL `undefined` because the parser middleware sits LATER in the chain. `const { title, severity } = req.body` does not crash (destructuring `undefined` yields `undefined`), the server returns `201 Created` but creates a record with `title: undefined, severity: undefined`.\n\n**Why sneaky:** the request looks "successful" with 201, the server does not crash, there is no error log — yet an entirely empty bug record is created in the data store. The code ITSELF (the `express.json()` call) is correct, the only problem is its ORDER.\n\n**Where the tester catches it:** reading the record back with a GET after the POST and seeing `title` come back as `null`/`undefined` — this is the classic "got 201 but the content is empty" middleware-ordering bug.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-c3-middleware-chain-film',
      title: { tr: '🎬 Middleware Zinciri: Sıra Bozulunca Ne Olur?', en: '🎬 The Middleware Chain: What Happens When the Order Breaks?' },
      xpReward: 14,
      sceneDurationMs: 3400,
      stageHeight: 280,
      actors: [
        { id: 'request', emoji: '📤', label: { tr: 'POST isteği', en: 'POST request' }, color: '#f59e0b' },
        { id: 'json', emoji: '📦', label: { tr: 'express.json()', en: 'express.json()' }, color: '#0ea5e9' },
        { id: 'logger', emoji: '📝', label: { tr: 'Logger middleware', en: 'Logger middleware' }, color: '#a78bfa' },
        { id: 'route', emoji: '🛣️', label: { tr: 'Route handler', en: 'Route handler' }, color: '#22c55e' },
        { id: 'broken', emoji: '💥', label: { tr: 'Sıra bozuk: req.body = undefined', en: 'Order broken: req.body = undefined' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'GET ile kanıt: title boş geldi', en: 'GET evidence: title arrived empty' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'İstemci `POST /api/v1/bugs` isteğini `{ "title": "Login donuyor", "severity": "HIGH" }` gövdesiyle gönderiyor.', en: 'The client sends a `POST /api/v1/bugs` request with the body `{ "title": "Login freezes", "severity": "HIGH" }`.' },
          positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'DOĞRU SIRADA: istek önce `express.json()`\'a uğrar — ham JSON metni ayrıştırılıp `req.body` nesnesine dönüştürülür.', en: 'IN THE CORRECT ORDER: the request first hits `express.json()` — the raw JSON text is parsed into the `req.body` object.' },
          positions: { request: { x: 18, y: 35 }, json: { x: 55, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'request', to: 'json', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Sonra logger middleware isteği loglar ve `next()` ile bir sonraki halkaya devreder — zincir kırılmadan devam eder.', en: 'Then the logger middleware logs the request and hands off with `next()` to the next link — the chain continues unbroken.' },
          positions: { json: { x: 18, y: 35 }, logger: { x: 55, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'json', to: 'logger', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Route handler çalışır — `req.body.title` doludur, kayıt doğru oluşur, 201 ve gerçek veri döner.', en: 'The route handler runs — `req.body.title` is filled, the record is created correctly, 201 with real data is returned.' },
          positions: { logger: { x: 18, y: 35 }, route: { x: 55, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'logger', to: 'route', color: '#22c55e' }],
        },
        {
          caption: { tr: 'YANLIŞ SIRADA: `express.json()` route\'lardan SONRA tanımlanırsa handler çalıştığında `req.body` HÂLÂ `undefined`\'dır.', en: 'IN THE WRONG ORDER: if `express.json()` is defined AFTER the routes, `req.body` is STILL `undefined` when the handler runs.' },
          positions: { route: { x: 20, y: 42 }, broken: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'route', to: 'broken', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Sunucu yine de `201 Created` döner — kod çökmez, ama `title: undefined` ile boş bir kayıt oluşur.', en: 'The server still returns `201 Created` — the code does not crash, but an empty record is created with `title: undefined`.' },
          positions: { broken: { x: 20, y: 42 }, tester: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'broken', to: 'tester', color: '#8b5cf6' }],
        },
        {
          caption: { tr: 'Ders — Middleware zincirinde SIRA, koddan bağımsız bir davranış belirleyicidir. Tester "201 aldım" ile yetinmez, dönen/kaydedilen veriyi de doğrular.', en: 'The lesson — ORDER in a middleware chain determines behavior independently of the code itself. A tester does not settle for "I got 201"; they also verify the returned/stored data.' },
          positions: { tester: { x: 40, y: 48, scale: 1.15, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir POST İsteğinin Zincirdeki Yolculuğu', en: 'A POST Request\'s Journey Through the Chain' },
      steps: [
        { id: 1, icon: '📤', label: { tr: 'İstek gelir…', en: 'Request arrives…' }, detail: { tr: 'Ham HTTP isteği (JSON metin gövdeli) Express\'e ulaşır.', en: 'The raw HTTP request (with a JSON text body) reaches Express.' } },
        { id: 2, icon: '📦', label: { tr: 'express.json() çalışır…', en: 'express.json() runs…' }, detail: { tr: 'Ham metni ayrıştırıp req.body\'ye JavaScript nesnesi olarak koyar; next() ile devreder.', en: 'It parses the raw text and places it on req.body as a JavaScript object; hands off with next().' } },
        { id: 3, icon: '📝', label: { tr: 'Logger çalışır…', en: 'Logger runs…' }, detail: { tr: 'İsteği kaydeder, next() ile bir sonraki halkaya geçer.', en: 'It logs the request, moves to the next link with next().' } },
        { id: 4, icon: '🛣️', label: { tr: 'Route handler çalışır…', en: 'Route handler runs…' }, detail: { tr: 'req.body artık doludur — zincirin SIRASI doğruysa handler doğru veriyi görür.', en: 'req.body is now filled — if the chain\'s ORDER is correct, the handler sees the right data.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-c3-order-01',
      question: { tr: 'Bir Express middleware zincirini DOĞRU sırada diz.', en: 'Order an Express middleware chain CORRECTLY.' },
      items: [
        { id: '1', text: { tr: 'app.use(express.json()) — govde ayristirici en once', en: 'app.use(express.json()) — body parser goes first' }, order: 1 },
        { id: '2', text: { tr: 'app.use(logger) — loglama middleware\'i ikinci', en: 'app.use(logger) — logging middleware second' }, order: 2 },
        { id: '3', text: { tr: 'app.post(\'/api/v1/bugs\', handler) — route en sonda', en: 'app.post(\'/api/v1/bugs\', handler) — route last' }, order: 3 },
        { id: '4', text: { tr: 'handler icinde req.body okunur — artik doludur', en: 'req.body is read inside the handler — it is now filled' }, order: 4 },
        { id: '5', text: { tr: '201 Created + gercek veriyle yanit doner', en: '201 Created + response with real data' }, order: 5 },
      ],
      xpReward: 12,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-c3-middleware',
      id: 'api-c3-middleware',
      title: { tr: 'Kendin Dene: Middleware Sırasını Düzelt', en: 'Try It Yourself: Fix the Middleware Order' },
      starterCode: `const express = require('express')
const app = express()

// BUG: govde ayristirici route'lardan SONRA tanimlanmis
app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body   // undefined gelir
  res.status(201).json({ id: 1, title, severity })
})

app.use(express.json())`,
      solutionCode: `const express = require('express')
const app = express()

// FIX: govde ayristirici HER ZAMAN route'lardan ONCE tanimlanir
app.use(express.json())

app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body   // artik dolu gelir
  res.status(201).json({ id: 1, title, severity })
})`,
      hint: { tr: 'Express middleware\'leri kayıt sırasına göre çalışır. `express.json()` route tanımlarından SONRA gelirse, o route\'lar `req.body`\'yi hiçbir zaman ayrıştırılmış görmez.', en: 'Express middlewares run in registration order. If `express.json()` comes AFTER route definitions, those routes never see a parsed `req.body`.' },
      successMessage: { tr: 'Doğru! Artık req.body her zaman dolu gelir, kayıtlar boş title ile oluşmaz.', en: 'Correct! Now req.body always arrives filled, records are not created with an empty title.' },
    },
    {
      type: 'quiz',
      question: { tr: '`express.json()` route tanımlarından SONRA çağrılırsa, POST handler\'da `req.body` ne olur?', en: 'If `express.json()` is called AFTER the route definitions, what happens to `req.body` in a POST handler?' },
      options: [
        { id: 'a', text: { tr: 'Sunucu 500 hatasıyla çöker', en: 'The server crashes with a 500 error' } },
        { id: 'b', text: { tr: 'req.body undefined kalır; destructuring da undefined üretir, sunucu 201 ile boş kayıt oluşturur', en: 'req.body stays undefined; destructuring also yields undefined, the server creates an empty record with 201' } },
        { id: 'c', text: { tr: 'Express otomatik olarak sırayı düzeltir', en: 'Express automatically fixes the order' } },
        { id: 'd', text: { tr: 'İstek 400 Bad Request ile reddedilir', en: 'The request is rejected with 400 Bad Request' } },
      ],
      correct: 'b',
      explanation: { tr: 'Middleware\'ler kayıt sırasına göre çalışır. Ayrıştırıcı henüz çalışmamışsa `req.body` `undefined` kalır; `const { title } = undefined` çökmeden `undefined` üretir, bu yüzden sunucu 201 ile ama tamamen boş alanlarla bir kayıt oluşturur — sessiz bir veri bütünlüğü hatası.', en: 'Middlewares run in registration order. If the parser has not run yet, `req.body` stays `undefined`; `const { title } = undefined` yields `undefined` without crashing, so the server creates a record with 201 but entirely empty fields — a silent data-integrity bug.' },
      retryQuestion: {
        question: { tr: 'Bir middleware fonksiyonu `next()` çağırmazsa ne olur?', en: 'What happens if a middleware function never calls `next()`?' },
        options: [
          { id: 'a', text: { tr: 'İstek o middleware\'de takılı kalır, zincirdeki sonraki adım hiç çalışmaz', en: 'The request gets stuck at that middleware, the next step in the chain never runs' } },
          { id: 'b', text: { tr: 'Express otomatik olarak bir sonraki middleware\'e geçer', en: 'Express automatically moves to the next middleware' } },
          { id: 'c', text: { tr: 'İstek 200 ile hemen tamamlanır', en: 'The request completes immediately with 200' } },
          { id: 'd', text: { tr: 'Sunucu yeniden başlatılır', en: 'The server restarts' } },
        ],
        correct: 'a',
        explanation: { tr: '`next()` çağrılmazsa Express bir sonraki middleware/route\'a geçmez — istek o noktada asılı kalır ve sonunda zaman aşımına uğrayabilir. Bu, unutulan bir `next()` çağrısının neden ciddi bir kesinti sebebi olduğunu açıklar.', en: 'Without calling `next()`, Express never proceeds to the next middleware/route — the request hangs at that point and may eventually time out. This explains why a forgotten `next()` call is a serious source of outages.' },
      },
    },
  ],
}

const C4 = {
  title: { tr: '🛡️ C4 · Validation: express-validator / zod', en: '🛡️ C4 · Validation: express-validator / zod' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🛡️',
      content: {
        tr: 'Express\'te validation, **kapıdaki güvenlik görevlisini işe alıp eğitmek** gibidir: Spring\'de `@Valid` + `@NotBlank` yazdığında güvenlik zaten binanın bir parçasıdır (framework hallediyor); Express\'te önce bir güvenlik firması seçersin (`express-validator` veya `zod`), sonra ona hangi kuralları uygulayacağını TEK TEK öğretirsin (`body(\'title\').isLength({min:3, max:120})`). Peki JavaScript\'in kendi tip sistemi zaten yokken (hatta TypeScript bile derleme zamanı korur, çalışma zamanında değil), neden ayrı bir kütüphane şart? Çünkü `req.body` HTTP üzerinden gelen ham JSON\'dur — tarayıcı konsolunda `typeof` yazsan bile "object" görürsün, ama içindeki `title` alanının GERÇEKTEN 3-120 karakter bir string olduğunu hiçbir derleyici garanti etmez; bunu ancak çalışma zamanında AÇIKÇA kontrol eden bir kütüphane garanti edebilir. Java\'da Bean Validation (`@NotBlank`, `@Size`) sınıf alanına "yapışık" dururken, Express\'te validation bir "muhafız" olarak route\'un ÖNÜNE (middleware olarak) konur — mantık aynı (sözleşmeyi ÇALIŞMA ZAMANINDA doğrula), sözdizimi farklı. Tester için sonuç yine aynı: doğrulama kuralları tanımlanmış GÖRÜNSE bile, sonucu OKUYAN bir kod satırı yoksa kurallar hiçbir işe yaramaz — az sonra bunu göreceksin.',
        en: 'Validation in Express is like **hiring and training the security guard at the door**: in Spring, writing `@Valid` + `@NotBlank` means security is already part of the building (the framework handles it); in Express you first pick a security firm (`express-validator` or `zod`), then teach it exactly which rules to enforce ONE BY ONE (`body(\'title\').isLength({min:3, max:120})`). So why is a separate library required when JavaScript has no type system of its own (and even TypeScript only guards at compile time, not runtime)? Because `req.body` is raw JSON arriving over HTTP — even if you print `typeof` in a browser console you just see "object", but no compiler guarantees that the `title` field inside it is REALLY a 3-120 character string; only a library that EXPLICITLY checks at runtime can guarantee that. In Java, Bean Validation (`@NotBlank`, `@Size`) is "glued" to the class field; in Express, validation sits as a "guard" IN FRONT OF the route (as middleware) — same logic (validate the contract AT RUNTIME), different syntax. The outcome for a tester is the same: even if validation rules LOOK defined, if no code line actually READS the result, the rules do nothing at all — as you will see next.',
      },
    },
    { type: 'heading', text: { tr: 'Kuralları Tanımlamak ve SONUCU Okumak', en: 'Defining Rules and READING the Result' } },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `const { body, validationResult } = require('express-validator')

app.post(
  '/api/v1/bugs',
  // Kural listesi: her biri bir "muhafiz talimati"dir
  body('title').isLength({ min: 3, max: 120 }).withMessage('title 3-120 karakter olmali'),
  body('severity').isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  body('reporter').isEmail(),
  (req, res) => {
    // TODO: kurallar tanimlanmis olmasi yetmez, SONUC okunmali
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { title, severity, reporter } = req.body
    res.status(201).json({ id: 1, title, severity, reporter })
  }
)`,
        en: `const { body, validationResult } = require('express-validator')

app.post(
  '/api/v1/bugs',
  // rule list: each one is a "guard instruction"
  body('title').isLength({ min: 3, max: 120 }).withMessage('title must be 3-120 chars'),
  body('severity').isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  body('reporter').isEmail(),
  (req, res) => {
    // TODO: defining rules is not enough, the RESULT must be read
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { title, severity, reporter } = req.body
    res.status(201).json({ id: 1, title, severity, reporter })
  }
)`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `validationResult(req)` kontrolü unutulursa**\n\n**Kod:** `body(\'title\').isLength(...)` kuralları TANIMLANDI, ama handler içinde `validationResult(req)` çağrısı ve `if (!errors.isEmpty())` kontrolü YOK.\n\n**Ne olur:** `express-validator` kuralları arka planda ÇALIŞIR ve hataları biriktirir, ama hiç kimse bu sonucu OKUMADIĞI için hatalar sessizce göz ardı edilir. `POST /api/v1/bugs { "title": "" }` isteği 400 yerine 201 döner ve boş başlıklı bug kaydedilir.\n\n**Neden sinsi:** Kod incelendiğinde validation kuralları GERÇEKTEN oradadır — bir code review\'da "validation var" denip geçilebilir. Ama kural TANIMLAMAK ile kuralın SONUCUNU okumak iki ayrı adımdır; ilkini yapıp ikincisini unutmak, Spring\'deki `starter-validation` eksikliğinden (B1) FARKLI bir kök nedenle AYNI sonucu (sessiz 201) doğurur.\n\n**Tester nerede yakalar:** Geçersiz veriyle (boş title, geçersiz e-posta) negatif test atıp 201 alınca — "kural var ama okunmuyor" defect ailesinin Express\'teki karşılığı budur.',
        en: '**🐞 Defect Birth — if the `validationResult(req)` check is forgotten**\n\n**Code:** `body(\'title\').isLength(...)` rules WERE defined, but the handler has no `validationResult(req)` call and no `if (!errors.isEmpty())` check.\n\n**What happens:** `express-validator` rules RUN in the background and collect errors, but since nobody READS the result, the errors are silently ignored. A `POST /api/v1/bugs { "title": "" }` request returns 201 instead of 400 and an empty-title bug gets saved.\n\n**Why sneaky:** on inspection the validation rules are REALLY there — a code review might say "validation exists" and move on. But DEFINING a rule and READING its result are two separate steps; doing the first and forgetting the second produces the SAME outcome (silent 201) from a DIFFERENT root cause than the missing `starter-validation` in Spring (B1).\n\n**Where the tester catches it:** sending invalid data (empty title, invalid email) as a negative test and getting 201 — this is the Express counterpart of the "rule exists but is never read" defect family.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-c4-validation-film',
      title: { tr: '🎬 Kural Var, Ama Kimse Okumuyor', en: '🎬 The Rule Exists, But Nobody Reads It' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'rules', emoji: '📋', label: { tr: 'body(...).isLength(...)', en: 'body(...).isLength(...)' }, color: '#f59e0b' },
        { id: 'run', emoji: '⚙️', label: { tr: 'Kurallar arka planda çalışır', en: 'Rules run in the background' }, color: '#0ea5e9' },
        { id: 'errors', emoji: '📦', label: { tr: 'errors nesnesi doldu', en: 'errors object filled' }, color: '#a78bfa' },
        { id: 'unread', emoji: '🙈', label: { tr: 'Hiç okunmadı!', en: 'Never read!' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Boş title ile 201 aldı', en: 'Got 201 with empty title' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Geliştirici `body(\'title\').isLength({min:3,max:120})` kuralını yazıyor — kural TANIMLANDI.', en: 'The developer writes the rule `body(\'title\').isLength({min:3,max:120})` — the rule is DEFINED.' },
          positions: { rules: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'İstek geldiğinde bu kural gerçekten ÇALIŞIR ve `title` alanını kontrol eder.', en: 'When a request arrives, this rule REALLY RUNS and checks the `title` field.' },
          positions: { rules: { x: 20, y: 40 }, run: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'rules', to: 'run', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Boş `title` kuralı ihlal eder, `errors` nesnesi hata bilgisiyle dolar.', en: 'An empty `title` violates the rule, the `errors` object fills with error info.' },
          positions: { run: { x: 20, y: 40 }, errors: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'run', to: 'errors', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ama handler `validationResult(req)` çağırmıyor — dolu `errors` nesnesi HİÇ okunmuyor, sessizce yok sayılıyor.', en: 'But the handler never calls `validationResult(req)` — the filled `errors` object is NEVER read, silently ignored.' },
          positions: { errors: { x: 20, y: 40 }, unread: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'errors', to: 'unread', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Kural tanımlamak yetmez, SONUCU okuyup handler\'ı erken sonlandırmak (return) şarttır. Tester her zaman "kural var mı" değil, "kural gerçekten UYGULANIYOR mu" diye sorar.', en: 'The lesson — Defining a rule is not enough, reading the RESULT and short-circuiting the handler (return) is mandatory. A tester always asks not "does a rule exist" but "is the rule really ENFORCED?"' },
          positions: { unread: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'unread', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Kural Tanımlamaktan Reddetmeye', en: 'From Defining a Rule to Rejecting a Request' },
      steps: [
        { id: 1, icon: '📋', label: { tr: 'Kuralı tanımla…', en: 'Define the rule…' }, detail: { tr: 'body(\'title\').isLength({min:3,max:120}) gibi kurallar route zincirine eklenir.', en: 'Rules like body(\'title\').isLength({min:3,max:120}) are added to the route chain.' } },
        { id: 2, icon: '⚙️', label: { tr: 'Kural çalışsın…', en: 'Let the rule run…' }, detail: { tr: 'İstek geldiğinde her kural otomatik çalışır ve hataları errors nesnesinde biriktirir.', en: 'When a request arrives, every rule runs automatically and collects errors into the errors object.' } },
        { id: 3, icon: '📖', label: { tr: 'Sonucu OKU…', en: 'READ the result…' }, detail: { tr: 'validationResult(req) ile errors okunur; boş değilse handler 400 ile erken döner.', en: 'validationResult(req) reads the errors; if not empty, the handler returns 400 early.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-c4-order-01',
      question: { tr: 'express-validator ile bir POST isteğini doğrulama akışını sırala.', en: 'Order the flow for validating a POST request with express-validator.' },
      items: [
        { id: '1', text: { tr: 'body(\'title\').isLength(...) gibi kuralları route zincirine ekle', en: 'Add rules like body(\'title\').isLength(...) to the route chain' }, order: 1 },
        { id: '2', text: { tr: 'İstek gelince kurallar otomatik çalışır', en: 'Rules run automatically when the request arrives' }, order: 2 },
        { id: '3', text: { tr: 'Handler icinde validationResult(req) cagir', en: 'Call validationResult(req) inside the handler' }, order: 3 },
        { id: '4', text: { tr: 'errors.isEmpty() false ise 400 ile erken don', en: 'If errors.isEmpty() is false, return early with 400' }, order: 4 },
        { id: '5', text: { tr: 'Hata yoksa req.body ile kaydı oluştur, 201 dön', en: 'If no errors, create the record with req.body, return 201' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-c4-validation',
      id: 'api-c4-validation',
      title: { tr: 'Kendin Dene: Doğrulama Sonucunu Oku', en: 'Try It Yourself: Read the Validation Result' },
      starterCode: `app.post('/api/v1/bugs',
  body('title').isLength({ min: 3, max: 120 }),
  body('severity').isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  (req, res) => {
    // BUG: kurallar tanimlandi ama sonuc hic okunmuyor
    const { title, severity } = req.body
    res.status(201).json({ id: 1, title, severity })
  }
)`,
      solutionCode: `app.post('/api/v1/bugs',
  body('title').isLength({ min: 3, max: 120 }),
  body('severity').isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { title, severity } = req.body
    res.status(201).json({ id: 1, title, severity })
  }
)`,
      hint: { tr: 'Kuralları tanımlamak onları OTOMATİK olarak uygulamaz. Handler içinde `validationResult(req)` çağırıp boş değilse `return res.status(400)...` ile erken çıkmak zorunludur.', en: 'Defining rules does not AUTOMATICALLY enforce them. Inside the handler you must call `validationResult(req)` and, if not empty, exit early with `return res.status(400)...`.' },
      successMessage: { tr: 'Doğru! Artık geçersiz veri gerçekten 400 ile reddediliyor, boş kayıt oluşmuyor.', en: 'Correct! Now invalid data is really rejected with 400, no empty record is created.' },
    },
    {
      type: 'quiz',
      question: { tr: '`body(\'title\').isLength(...)` kuralı tanımlanmış ama `validationResult(req)` hiç çağrılmamışsa ne olur?', en: 'What happens if the `body(\'title\').isLength(...)` rule is defined but `validationResult(req)` is never called?' },
      options: [
        { id: 'a', text: { tr: 'express-validator kuralı otomatik uygular, ekstra kod gerekmez', en: 'express-validator enforces the rule automatically, no extra code needed' } },
        { id: 'b', text: { tr: 'Kural arka planda çalışır ama sonucu okunmadığı için etkisizdir; geçersiz veri de 201 alır', en: 'The rule runs in the background but has no effect since its result is never read; invalid data also gets 201' } },
        { id: 'c', text: { tr: 'Sunucu başlatılamaz', en: 'The server fails to start' } },
        { id: 'd', text: { tr: 'İstek otomatik olarak reddedilir', en: 'The request is automatically rejected' } },
      ],
      correct: 'b',
      explanation: { tr: 'express-validator kuralları middleware zincirinde çalışıp hataları biriktirir, ama bu hataları OKUYUP karar veren kod SENDEN beklenir. `validationResult(req)` çağrılmazsa, biriken hatalar hiçbir zaman handler\'ın davranışını etkilemez.', en: 'express-validator rules run in the middleware chain and collect errors, but the code that READS those errors and decides is expected FROM YOU. Without calling `validationResult(req)`, the collected errors never affect the handler\'s behavior.' },
      retryQuestion: {
        question: { tr: 'Spring\'deki `@Valid` ile Express\'teki `express-validator` arasındaki temel fark nedir?', en: 'What is the fundamental difference between Spring\'s `@Valid` and Express\'s `express-validator`?' },
        options: [
          { id: 'a', text: { tr: '@Valid framework tarafından otomatik tetiklenir; express-validator\'da sonucu OKUMAK geliştiricinin sorumluluğudur', en: '@Valid is triggered automatically by the framework; in express-validator, READING the result is the developer\'s responsibility' } },
          { id: 'b', text: { tr: 'İkisi de tamamen otomatiktir, fark yoktur', en: 'Both are fully automatic, there is no difference' } },
          { id: 'c', text: { tr: '@Valid sadece GET isteklerinde çalışır', en: '@Valid only works on GET requests' } },
          { id: 'd', text: { tr: 'express-validator veritabanı doğrulaması yapar, @Valid yapmaz', en: 'express-validator does database validation, @Valid does not' } },
        ],
        correct: 'a',
        explanation: { tr: 'Spring MVC, `@Valid` gördüğünde doğrulamayı ve hata fırlatmayı OTOMATİK yapar (dispatcher\'ın bir parçası). Express\'te ise doğrulama kütüphanesi sadece hataları TOPLAR; bu hataları okuyup 400 döndürmek geliştiricinin elle yazması gereken bir adımdır.', en: 'Spring MVC AUTOMATICALLY validates and throws when it sees `@Valid` (part of the dispatcher). In Express the validation library only COLLECTS errors; reading them and returning 400 is a step the developer must write by hand.' },
      },
    },
  ],
}

const C5 = {
  title: { tr: '🚨 C5 · Error Handling Middleware: (err, req, res, next)', en: '🚨 C5 · Error Handling Middleware: (err, req, res, next)' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🚨',
      content: {
        tr: 'Express\'in hata yakalayan middleware\'i, **binadaki tek bir yangın çıkışı** gibidir: normal middleware\'ler 3 parametre alır (`req, res, next`), ama Express\'e "ben bir hata yakalayıcıyım" demenin TEK yolu tam olarak **4 parametre** almaktır (`err, req, res, next`) — bu bir kural değil, Express\'in kodunu okuyup parametre SAYISINA bakarak ayrım yapmasıdır (`fn.length === 4`). Route içinde `next(err)` çağırdığında, Express normal zinciri bırakır ve bir sonraki 4-parametreli middleware\'i arar. Spring\'de bunun karşılığı `@RestControllerAdvice` + `@ExceptionHandler`\'dır — orada exception TİPİNE göre eşleştirme annotation ile yapılır, Express\'te ise TEK bir catch-all middleware\'e her hata `next(err)` ile elle yönlendirilir. Peki neden Express bunu bu kadar "gizli" bir kuralla (parametre sayısı) yapıyor? Çünkü framework\'ün kendisi minimal — ayrı bir "hata sınıfı" kavramı dayatmaz, senin JavaScript\'in kendi mekanizmalarını (fonksiyon imzası) kullanmanı bekler. Tester için kritik nokta: bu middleware\'in KAYIT SIRASI da C3\'teki gibi kritiktir — route\'lardan ÖNCE tanımlanırsa Express ona hiçbir zaman ulaşamaz, çünkü henüz hiçbir hata `next(err)` ile fırlatılmamışken sırada değildir.',
        en: 'Express\'s error-catching middleware is like the **single fire exit in a building**: normal middlewares take 3 parameters (`req, res, next`), but the ONLY way to tell Express "I am an error handler" is by taking exactly **4 parameters** (`err, req, res, next`) — this is not a keyword, Express distinguishes it purely by reading the parameter COUNT of your function (`fn.length === 4`). When you call `next(err)` inside a route, Express abandons the normal chain and looks for the next 4-parameter middleware. In Spring the equivalent is `@RestControllerAdvice` + `@ExceptionHandler` — there, matching is done by exception TYPE via annotation; in Express, every error is manually routed to ONE catch-all middleware via `next(err)`. So why does Express hide this behind such a "quiet" rule (parameter count)? Because the framework itself is minimal — it does not impose a separate "error class" concept, it expects you to use JavaScript\'s own mechanisms (function signature). The critical point for a tester: this middleware\'s REGISTRATION ORDER is just as critical as in C3 — if it is defined BEFORE the routes, Express can never reach it, because at that point in the chain no error has been thrown with `next(err)` yet.',
      },
    },
    { type: 'heading', text: { tr: '4 Parametreli "Gizli" İmza', en: 'The 4-Parameter "Secret" Signature' } },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = bugs.find(b => b.id === Number(req.params.id))
  if (!bug) {
    // hatayi FIRLATMAK yerine next(err) ile devret
    return next({ status: 404, message: 'Bug bulunamadi' })
  }
  res.json(bug)
})

// TUM route'lardan SONRA tanimlanmali — 4 parametre Express'e "ben hata yakalayiciyim" der
app.use((err, req, res, next) => {
  const status = err.status || 500
  console.error(\`[HATA] \${status}: \${err.message}\`)
  res.status(status).json({ error: err.message || 'Sunucu hatasi' })
})`,
        en: `app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = bugs.find(b => b.id === Number(req.params.id))
  if (!bug) {
    // hand off with next(err) instead of THROWING the error
    return next({ status: 404, message: 'Bug not found' })
  }
  res.json(bug)
})

// must be defined AFTER all routes — 4 parameters tell Express "I am the error handler"
app.use((err, req, res, next) => {
  const status = err.status || 500
  console.error(\`[ERROR] \${status}: \${err.message}\`)
  res.status(status).json({ error: err.message || 'Internal server error' })
})`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — hata yakalayıcı middleware route\'lardan ÖNCE tanımlanırsa**\n\n**Kod:** 4 parametreli `(err, req, res, next)` middleware\'i dosyanın EN ÜSTÜNE, route tanımlarından önce konmuş.\n\n**Ne olur:** `GET /api/v1/bugs/999` (var olmayan id) isteği atılır; route içinde `next({status:404, ...})` çağrılır ama Express, kayıt SIRASINDA bu noktadan SONRA gelen bir hata middleware\'i arar — geriye doğru bakmaz. Hiçbiri bulunamadığı için Express kendi VARSAYILAN hata sayfasını (HTML, stack trace içeren) döner.\n\n**Neden sinsi:** Geliştirici "hata yakalayıcımı yazdım" der ve code review\'dan geçer — kod GERÇEKTEN doğru yazılmıştır, sadece dosyadaki KONUMU yanlıştır. Sonuç, beklenen `{"error": "Bug bulunamadi"}` JSON\'u yerine HTML bir hata sayfasıdır.\n\n**Tester nerede yakalar:** Otomasyon `response.json()` ile gövdeyi ayrıştırmaya çalıştığında `SyntaxError: Unexpected token \'<\'` alınca — HTML\'i JSON sanıp parse etmeye çalışmak, bu hata sınıfının imzasıdır (bkz. GRUP J).',
        en: '**🐞 Defect Birth — if the error-catching middleware is defined BEFORE the routes**\n\n**Code:** the 4-parameter `(err, req, res, next)` middleware was placed at the VERY TOP of the file, before the route definitions.\n\n**What happens:** a `GET /api/v1/bugs/999` request (a non-existent id) is sent; the route calls `next({status:404, ...})`, but Express looks for an error middleware that comes AFTER this point in registration order — it never looks backward. Since none is found, Express returns its own DEFAULT error page (HTML, containing a stack trace).\n\n**Why sneaky:** the developer says "I wrote my error handler" and it passes code review — the code IS genuinely correct, only its POSITION in the file is wrong. The result is an HTML error page instead of the expected `{"error": "Bug not found"}` JSON.\n\n**Where the tester catches it:** when automation tries to parse the body with `response.json()` and gets `SyntaxError: Unexpected token \'<\'` — mistaking HTML for JSON and trying to parse it is the signature of this error class (see GROUP J).',
      },
    },
    {
      type: 'video-scene',
      id: 'api-c5-error-handler-film',
      title: { tr: '🎬 4 Parametrenin Sihri: Express Bir Hata Yakalayıcıyı Nasıl Tanır?', en: '🎬 The Magic of 4 Parameters: How Express Recognizes an Error Handler' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'route', emoji: '🛣️', label: { tr: 'Route: next(err)', en: 'Route: next(err)' }, color: '#f59e0b' },
        { id: 'search', emoji: '🔎', label: { tr: 'Express: 4-param arıyor', en: 'Express: searching for 4-param' }, color: '#0ea5e9' },
        { id: 'found', emoji: '✅', label: { tr: 'Bulundu: JSON hata', en: 'Found: JSON error' }, color: '#22c55e' },
        { id: 'notfound', emoji: '❌', label: { tr: 'Bulunamadı: HTML sayfa', en: 'Not found: HTML page' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'JSON.parse çöktü', en: 'JSON.parse crashed' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Route handler var olmayan bir bug için `next({status:404, ...})` çağırıyor — hatayı zincire devrediyor.', en: 'The route handler calls `next({status:404, ...})` for a non-existent bug — handing the error into the chain.' },
          positions: { route: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Express, kayıt sırasında BU NOKTADAN SONRA gelen, tam olarak 4 parametre alan bir middleware arar.', en: 'Express looks for a middleware that comes AFTER THIS POINT in registration order, taking exactly 4 parameters.' },
          positions: { route: { x: 20, y: 40 }, search: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'route', to: 'search', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'DOĞRU SIRADA: hata yakalayıcı route\'lardan SONRA tanımlıysa bulunur — düzgün JSON hata gövdesi döner.', en: 'IN THE CORRECT ORDER: if the error handler is defined AFTER the routes, it is found — a proper JSON error body is returned.' },
          positions: { search: { x: 20, y: 40 }, found: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'search', to: 'found', color: '#22c55e' }],
        },
        {
          caption: { tr: 'YANLIŞ SIRADA: hata yakalayıcı route\'lardan ÖNCE tanımlıysa Express onu asla ARAMAZ — kendi varsayılan HTML sayfasına düşer.', en: 'IN THE WRONG ORDER: if the error handler is defined BEFORE the routes, Express never SEARCHES it — it falls back to its own default HTML page.' },
          positions: { found: { x: 20, y: 40, opacity: 0.4 }, notfound: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'search', to: 'notfound', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Otomasyon `response.json()` çağırdığında HTML\'i ayrıştırmaya çalışır ve çöker. Tester için bu, "kayıt sırası hatası"nın en somut kanıtıdır.', en: 'The lesson — when automation calls `response.json()` it tries to parse HTML and crashes. For a tester this is the most concrete evidence of a "registration order" bug.' },
          positions: { notfound: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'notfound', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'next(err)\'ten JSON Hata Gövdesine', en: 'From next(err) to a JSON Error Body' },
      steps: [
        { id: 1, icon: '🛣️', label: { tr: 'Route hatayı devret…', en: 'Route hands off the error…' }, detail: { tr: 'Bulunamama/yetkisiz gibi bir durumda next(err) ile normal zincirden çıkılır.', en: 'On a not-found/unauthorized case, next(err) exits the normal chain.' } },
        { id: 2, icon: '🔎', label: { tr: 'Express 4-param arasın…', en: 'Express searches 4-param…' }, detail: { tr: 'Kayıt sırasında SONRAKİ 4 parametreli middleware bulunmaya çalışılır.', en: 'It tries to find the NEXT 4-parameter middleware in registration order.' } },
        { id: 3, icon: '📤', label: { tr: 'JSON hata dönsün…', en: 'Return a JSON error…' }, detail: { tr: 'Bulunursa status + { error } JSON döner; bulunamazsa Express\'in varsayılan HTML sayfası döner.', en: 'If found, status + { error } JSON is returned; if not, Express\'s default HTML page is returned.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-c5-order-01',
      question: { tr: 'Express\'te DOĞRU hata yönetimi kurulum sırasını diz.', en: 'Order the CORRECT error-handling setup sequence in Express.' },
      items: [
        { id: '1', text: { tr: 'Normal route\'ları tanımla (GET, POST, ...)', en: 'Define the normal routes (GET, POST, ...)' }, order: 1 },
        { id: '2', text: { tr: 'Bir route içinde next(err) ile hata devret', en: 'Hand off an error with next(err) inside a route' }, order: 2 },
        { id: '3', text: { tr: 'TÜM route\'lardan sonra 4 parametreli middleware\'i tanımla', en: 'Define the 4-parameter middleware AFTER all routes' }, order: 3 },
        { id: '4', text: { tr: 'Express bu middleware\'i parametre sayısından tanır', en: 'Express recognizes this middleware by its parameter count' }, order: 4 },
        { id: '5', text: { tr: 'status + { error } ile JSON hata gövdesi döner', en: 'A JSON error body is returned with status + { error }' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-c5-errors',
      id: 'api-c5-errors',
      title: { tr: 'Kendin Dene: Hata Yakalayıcının Yerini Düzelt', en: 'Try It Yourself: Fix the Error Handler\'s Position' },
      starterCode: `const express = require('express')
const app = express()

// BUG: hata yakalayici route'lardan ONCE tanimlanmis
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = findBug(req.params.id)
  if (!bug) return next({ status: 404, message: 'Bug bulunamadi' })
  res.json(bug)
})`,
      solutionCode: `const express = require('express')
const app = express()

app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = findBug(req.params.id)
  if (!bug) return next({ status: 404, message: 'Bug bulunamadi' })
  res.json(bug)
})

// FIX: hata yakalayici HER ZAMAN TUM route'lardan SONRA tanimlanir
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})`,
      hint: { tr: 'Express, hata yakalayıcı middleware\'i sadece kayıt sırasında SONRAKİ konumlarda arar. Route\'lardan önce tanımlanan bir hata yakalayıcıya asla ulaşılmaz.', en: 'Express only looks for the error-catching middleware in positions that come AFTER the current one in registration order. An error handler defined before the routes is never reached.' },
      successMessage: { tr: 'Doğru! Artık next(err) çağrıları düzgün JSON hata gövdesine ulaşır, HTML sayfasına düşmez.', en: 'Correct! Now next(err) calls reach a proper JSON error body instead of falling back to the HTML page.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Express bir middleware\'in "hata yakalayıcı" olduğunu nasıl anlar?', en: 'How does Express know a middleware is an "error handler"?' },
      options: [
        { id: 'a', text: { tr: 'Fonksiyon adının "error" içermesinden', en: 'From the function name containing "error"' } },
        { id: 'b', text: { tr: 'Fonksiyonun tam olarak 4 parametre almasından: (err, req, res, next)', en: 'From the function taking exactly 4 parameters: (err, req, res, next)' } },
        { id: 'c', text: { tr: 'Ayrı bir app.error() metodu çağrılmasından', en: 'From calling a separate app.error() method' } },
        { id: 'd', text: { tr: 'try/catch bloğu içinde tanımlanmasından', en: 'From being defined inside a try/catch block' } },
      ],
      correct: 'b',
      explanation: { tr: 'Express, bir middleware fonksiyonunun parametre SAYISINA bakar; tam olarak 4 parametre alan fonksiyonlar hata yakalayıcı olarak işaretlenir. Bu, isim veya özel bir metoda değil, tamamen fonksiyon imzasına dayanan bir kuraldır.', en: 'Express inspects a middleware function\'s parameter COUNT; functions taking exactly 4 parameters are marked as error handlers. This rule relies entirely on the function signature, not on a name or a special method.' },
      retryQuestion: {
        question: { tr: 'Hata yakalayıcı middleware route tanımlarından ÖNCE konursa ne olur?', en: 'What happens if the error-catching middleware is placed BEFORE the route definitions?' },
        options: [
          { id: 'a', text: { tr: 'Express ona asla ulaşamaz; hatalar kendi varsayılan HTML sayfasına düşer', en: 'Express never reaches it; errors fall back to its own default HTML page' } },
          { id: 'b', text: { tr: 'Express konumdan bağımsız her zaman bulur', en: 'Express always finds it regardless of position' } },
          { id: 'c', text: { tr: 'Uygulama başlarken hata verir', en: 'The application throws an error on startup' } },
          { id: 'd', text: { tr: 'Sadece POST isteklerinde çalışmaz', en: 'It only fails to work for POST requests' } },
        ],
        correct: 'a',
        explanation: { tr: 'Express middleware arama işlemini kayıt SIRASINA göre, sadece İLERİYE doğru yapar. Hata yakalayıcı route\'lardan önce tanımlıysa, `next(err)` çağrıldığı noktadan sonra bu middleware yoktur — Express kendi varsayılan HTML hata sayfasına döner.', en: 'Express performs its middleware search by registration ORDER, only moving FORWARD. If the error handler is defined before the routes, it does not exist after the point where `next(err)` is called — Express falls back to its own default HTML error page.' },
      },
    },
  ],
}

const C6 = {
  title: { tr: '⚖️ C6 · Java ↔ Express Karşılaştırma', en: '⚖️ C6 · Java ↔ Express Comparison' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '⚖️',
      content: {
        tr: 'Aynı `/api/v1/bugs` restoranını iki farklı ekiple kurmak gibiydi: Spring Boot ekibi **hazır bir brigade sistemiyle** geldi (her aşçının rolü annotation ile önceden atanmış — starter, `@Valid`, `@RestControllerAdvice`); Express ekibi ise **serbest çalışan bir şef** gibiydi — hiçbir kural dayatılmadı, her adımı (middleware sırası, validation kütüphanesi, hata yakalayıcı) sen elle kurdun. Peki bu "özgürlük" gerçekten bir avantaj mı? Küçük, hızlı prototipler için EVET — az kod, az karar; ama C3-C5\'te gördüğün gibi (middleware sırası, validation sonucu okuma, hata yakalayıcı konumu) her "elle kurulan" adım aynı zamanda bir "elle unutulabilecek" adımdır — Spring\'de framework SENİN yerine hatırlar, Express\'te SEN hatırlarsın. Bu, "hangisi daha iyi" sorusu değil, **"hangi hatanın senin sorumluluğunda olduğu"** sorusudur — ve bir tester için bu, "bu framework\'te hangi sessiz hata SIK görülür" sorusuna dönüşür: Spring\'de eksik annotation/dependency, Express\'te yanlış SIRA.',
        en: 'It was like building the same `/api/v1/bugs` restaurant with two different teams: the Spring Boot team arrived with a **ready-made brigade system** (every chef\'s role pre-assigned via annotations — the starter, `@Valid`, `@RestControllerAdvice`); the Express team was like a **freelance chef** — nothing was imposed, you built every step by hand (middleware order, validation library, error handler). Is this "freedom" really an advantage? For small, fast prototypes, YES — less code, fewer decisions; but as you saw in C3-C5 (middleware order, reading a validation result, error handler position), every "hand-built" step is also a step that can be "hand-forgotten" — in Spring the framework remembers FOR you, in Express YOU remember. This is not a "which is better" question, it is a **"whose responsibility is this bug"** question — and for a tester it becomes "which silent bug is COMMON in this framework": in Spring it is a missing annotation/dependency, in Express it is the wrong ORDER.',
      },
    },
    { type: 'heading', text: { tr: 'Üç Framework, Aynı Sözleşme', en: 'Three Frameworks, One Contract' } },
    {
      type: 'table',
      headers: ['Konu / Topic', 'Spring Boot (Java)', 'Express.js', 'NestJS'],
      rows: [
        ['Route tanımı / Route definition', '@GetMapping("/bugs")', "app.get('/bugs', handler)", '@Get()'],
        ['Body okuma / Reading body', '@RequestBody BugRequest req', 'req.body (express.json() şart)', '@Body() dto: CreateBugDto'],
        ['Validation', '@Valid + Bean Validation', 'express-validator / zod (elle okunur)', 'ValidationPipe + class-validator'],
        ['Hata yönetimi / Error handling', '@RestControllerAdvice', '4 parametreli (err,req,res,next)', '@Catch() Exception Filter'],
        ['DI (bağımlılık enjeksiyonu)', 'Spring IoC container', 'manuel / factory fonksiyon', 'Nest IoC container'],
        ['Sıra hassasiyeti / Order sensitivity', 'Düşük — annotation tabanlı', 'YÜKSEK — middleware SIRASI kritik', 'Orta — modül/pipe kaydı önemli'],
        ['En sık sessiz hata / Most common silent bug', 'Eksik starter/annotation', 'Yanlış middleware sırası', 'Unutulan global pipe/filter kaydı'],
      ],
    },
    {
      type: 'video-scene',
      id: 'api-c6-compare-film',
      title: { tr: '🎬 Üç Mutfak, Aynı Menü', en: '🎬 Three Kitchens, One Menu' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'request', emoji: '📤', label: { tr: 'Aynı POST isteği', en: 'The same POST request' }, color: '#f59e0b' },
        { id: 'spring', emoji: '☕', label: { tr: 'Spring: @Valid otomatik', en: 'Spring: @Valid automatic' }, color: '#22c55e' },
        { id: 'express', emoji: '🟢', label: { tr: 'Express: elle sıralı zincir', en: 'Express: hand-ordered chain' }, color: '#0ea5e9' },
        { id: 'nest', emoji: '🐈', label: { tr: 'Nest: decorator + pipe', en: 'Nest: decorator + pipe' }, color: '#a78bfa' },
        { id: 'response', emoji: '📥', label: { tr: 'Aynı JSON sözleşmesi', en: 'The same JSON contract' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Aynı `POST /api/v1/bugs { "title": "" }` isteği üç farklı sunucuya gönderiliyor.', en: 'The same `POST /api/v1/bugs { "title": "" }` request is sent to three different servers.' },
          positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Spring: `@Valid` framework tarafından otomatik tetiklenir, 400 döner — geliştirici ekstra kod yazmaz.', en: 'Spring: `@Valid` is triggered automatically by the framework, 400 is returned — the developer writes no extra code.' },
          positions: { request: { x: 20, y: 30 }, spring: { x: 62, y: 30, scale: 1.15, pulse: true } },
          beams: [{ from: 'request', to: 'spring', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Express: doğrulama sadece `validationResult(req)` OKUNURSA 400 döner — okunmazsa 201 sızar.', en: 'Express: validation returns 400 only if `validationResult(req)` is READ — if not, 201 leaks through.' },
          positions: { spring: { x: 20, y: 45 }, express: { x: 62, y: 45, scale: 1.15, pulse: true } },
          beams: [{ from: 'request', to: 'express', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Nest: `ValidationPipe` global olarak KAYITLIYSA DTO decorator\'ları otomatik çalışır — kayıtlı değilse decorator\'lar süstür.', en: 'Nest: if `ValidationPipe` is registered GLOBALLY, DTO decorators run automatically — if not, decorators are just decoration.' },
          positions: { express: { x: 20, y: 60 }, nest: { x: 62, y: 60, scale: 1.15, pulse: true } },
          beams: [{ from: 'request', to: 'nest', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — Üçü de AYNI sözleşmeyi (400 + hata mesajı) hedefler, ama "otomatik mi, elle mi" ekseni farklıdır. Tester her framework\'te "bu güvenlik gerçekten TETİKLENİYOR mu?" diye sorar.', en: 'The lesson — all three target the SAME contract (400 + error message), but the "automatic vs. manual" axis differs. In every framework, a tester asks "is this safeguard REALLY triggered?"' },
          positions: { spring: { x: 30, y: 40 }, express: { x: 50, y: 55 }, nest: { x: 70, y: 40 }, response: { x: 50, y: 30, scale: 1.15, pulse: true } },
          beams: [{ from: 'spring', to: 'response', color: '#8b5cf6' }, { from: 'express', to: 'response', color: '#8b5cf6' }, { from: 'nest', to: 'response', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Tabloyu Okuma Stratejisi', en: 'A Strategy for Reading the Table' },
      steps: [
        { id: 1, icon: '🎯', label: { tr: 'Sözleşmeyi sabit tut…', en: 'Keep the contract fixed…' }, detail: { tr: '/api/v1/bugs modeli, alanları ve status kodları HER ÜÇ satırda da aynı kalır.', en: 'The /api/v1/bugs model, fields, and status codes stay the same across all three rows.' } },
        { id: 2, icon: '🔀', label: { tr: 'Sözdizimini karşılaştır…', en: 'Compare the syntax…' }, detail: { tr: 'Aynı işi hangi anahtar kelime/decorator/fonksiyon yapıyor — annotation mı, middleware mi, decorator mı?', en: 'Which keyword/decorator/function does the same job — an annotation, a middleware, or a decorator?' } },
        { id: 3, icon: '🐞', label: { tr: 'Sessiz hata riskini sor…', en: 'Ask about the silent-bug risk…' }, detail: { tr: 'Bu framework\'te bu adım UNUTULURSA ne olur — otomatik mi engellenir, yoksa sessizce mi geçer?', en: 'If this step is FORGOTTEN in this framework, what happens — is it blocked automatically, or does it silently pass?' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-c6-order-01',
      question: { tr: 'Bir POST /api/v1/bugs isteğinin üç frameworkte de takip ettiği ORTAK adımları sırala.', en: 'Order the COMMON steps a POST /api/v1/bugs request follows in all three frameworks.' },
      items: [
        { id: '1', text: { tr: 'İstek route/controller katmanına ulaşır', en: 'The request reaches the route/controller layer' }, order: 1 },
        { id: '2', text: { tr: 'Gövde (body) ayrıştırılıp bir nesneye dönüştürülür', en: 'The body is parsed and converted into an object' }, order: 2 },
        { id: '3', text: { tr: 'Doğrulama kuralları çalıştırılır', en: 'Validation rules are run' }, order: 3 },
        { id: '4', text: { tr: 'Hata varsa merkezi bir hata yönetimine devredilir', en: 'If there is an error, it is handed to a central error handler' }, order: 4 },
        { id: '5', text: { tr: 'Başarılıysa 201 + JSON kayıt döner', en: 'If successful, 201 + a JSON record is returned' }, order: 5 },
      ],
      xpReward: 12,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-c6-compare',
      id: 'api-c6-compare',
      title: { tr: 'Kendin Dene: Spring Kod Satırını Express\'e Çevir', en: 'Try It Yourself: Translate the Spring Line to Express' },
      starterCode: `// Spring Boot (Java):
// @GetMapping("/api/v1/bugs/{id}")
// public Bug getBug(@PathVariable Long id) { ... }

// TODO: ayni isi yapan Express satirini yaz
`,
      solutionCode: `// Express (JavaScript):
app.get('/api/v1/bugs/:id', (req, res) => {
  const id = Number(req.params.id)
  // ...
})`,
      hint: { tr: 'Spring\'de `@PathVariable` bir metod parametresidir; Express\'te aynı bilgi `req.params` nesnesinden elle okunur ve path\'te `:id` ile işaretlenir.', en: 'In Spring, `@PathVariable` is a method parameter; in Express the same information is read by hand from the `req.params` object and marked in the path with `:id`.' },
      successMessage: { tr: 'Doğru! İki framework de aynı bilgiyi taşıyor, sadece biri annotation ile biri fonksiyon parametresiyle okuyor.', en: 'Correct! Both frameworks carry the same information, one reads it via annotation, the other via a function parameter.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Spring ve Express arasındaki en temel mimari fark nedir?', en: 'What is the most fundamental architectural difference between Spring and Express?' },
      options: [
        { id: 'a', text: { tr: 'Spring opinionated\'dır (framework çoğu kararı verir), Express un-opinionated\'dır (geliştirici çoğu kararı verir)', en: 'Spring is opinionated (the framework makes most decisions), Express is un-opinionated (the developer makes most decisions)' } },
        { id: 'b', text: { tr: 'Express sadece test amaçlı kullanılır, production\'da kullanılmaz', en: 'Express is only for testing, never used in production' } },
        { id: 'c', text: { tr: 'Spring JSON desteklemez', en: 'Spring does not support JSON' } },
        { id: 'd', text: { tr: 'İkisi arasında hiçbir fark yoktur', en: 'There is no difference between the two' } },
      ],
      correct: 'a',
      explanation: { tr: 'Spring Boot "opinionated" bir framework\'tür — starter\'lar, annotation\'lar ve otomatik konfigürasyonla birçok kararı senin yerine verir. Express "un-opinionated"dır — minimal bir çekirdek sunar, validation/hata yönetimi gibi her kararı geliştiriciye bırakır. Bu fark, hangi hataların "framework tarafından engellendiği" hangilerinin "geliştiricinin sorumluluğunda kaldığı"nı belirler.', en: 'Spring Boot is an "opinionated" framework — starters, annotations, and auto-configuration make many decisions for you. Express is "un-opinionated" — it offers a minimal core and leaves every decision, like validation or error handling, to the developer. This difference determines which bugs are "blocked by the framework" and which remain "the developer\'s responsibility".' },
      retryQuestion: {
        question: { tr: 'Express\'te en sık görülen "sessiz hata" kategorisi neye dayanır?', en: 'What does the most common "silent bug" category in Express stem from?' },
        options: [
          { id: 'a', text: { tr: 'Middleware/route KAYIT SIRASININ yanlış olmasına', en: 'The middleware/route REGISTRATION ORDER being wrong' } },
          { id: 'b', text: { tr: 'Node.js\'in JSON desteklememesine', en: 'Node.js not supporting JSON' } },
          { id: 'c', text: { tr: 'Express\'in HTTP\'yi desteklememesine', en: 'Express not supporting HTTP' } },
          { id: 'd', text: { tr: 'npm\'in çalışmamasına', en: 'npm not working' } },
        ],
        correct: 'a',
        explanation: { tr: 'C3-C5\'te gördüğün gibi (express.json() sırası, hata yakalayıcının konumu) Express\'in minimal doğası, doğru kodun bile YANLIŞ SIRADA yazılmasından doğan sessiz hatalara açıktır — bu, Spring\'in annotation-tabanlı, sıraya daha az duyarlı yapısından temel farkıdır.', en: 'As seen in C3-C5 (express.json() order, error handler position), Express\'s minimal nature is open to silent bugs born from even correct code being written in the WRONG ORDER — this is its key difference from Spring\'s annotation-based, less order-sensitive structure.' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP D — Aynı API'yi NestJS ile Yazmak (KODLU + Defect şablonu, kısa/öz)
// ═══════════════════════════════════════════════════════════════════════════

const D1 = {
  title: { tr: '🐈 D1 · Nest CLI ve Modül Mimarisi', en: '🐈 D1 · Nest CLI and Module Architecture' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🐈',
      content: {
        tr: 'NestJS, **TypeScript dünyasındaki Spring Boot\'un ikizi** gibidir: Express\'in "her şeyi elle kur" felsefesinin tam tersine, Nest yeniden "opinionated" bir yapıya döner — `@Module`, `@Controller`, `@Injectable` decorator\'ları, Java\'daki `@Configuration`, `@RestController`, `@Service`\'in neredeyse birebir çevirisidir. Bir modül (`AppModule`), hangi controller\'ların ve provider\'ların (servislerin) birbirine bağlı olduğunu bir Spring `@Configuration` sınıfı gibi bildirir; Nest\'in kendi DI (dependency injection) container\'ı bunları senin yerine "bağlar". Peki Express\'ten sonra neden tekrar bir "iskelet/disiplin" katmanına dönülüyor? Çünkü küçük bir prototipte özgürlük hız kazandırır, ama büyük bir takımda (5, 10, 50 geliştirici) HERKESİN aynı klasör yapısını, aynı hata yönetimini, aynı DI mantığını kullanması gerekir — Nest bunu bir framework kararı olarak dayatır, tıpkı Spring\'in yaptığı gibi. Bir Java geliştiricisi Nest\'i ilk gördüğünde kendini EVİNDE hisseder: sınıflar, decorator\'lar, constructor injection — hepsi tanıdıktır. Tester için önemli olan: modül kaydı (bir controller\'ın `@Module`\'e EKLENMESİ) Express\'teki route tanımından FARKLI bir hata sınıfı doğurur — kodun kendisi doğru olsa bile, modüle kayıtlı değilse o route hiç VAR OLMAZ.',
        en: 'NestJS is like **Spring Boot\'s twin in the TypeScript world**: opposite to Express\'s "build everything by hand" philosophy, Nest returns to an "opinionated" structure — the `@Module`, `@Controller`, `@Injectable` decorators are nearly a direct translation of Java\'s `@Configuration`, `@RestController`, `@Service`. A module (`AppModule`) declares which controllers and providers (services) are wired together, much like a Spring `@Configuration` class; Nest\'s own DI (dependency injection) container "wires" them for you. So why return to a "skeleton/discipline" layer after Express? Because freedom speeds up a small prototype, but in a large team (5, 10, 50 developers) EVERYONE needs the same folder structure, the same error handling, the same DI logic — Nest imposes this as a framework decision, just like Spring does. A Java developer seeing Nest for the first time feels right AT HOME: classes, decorators, constructor injection — all familiar. What matters for a tester: module registration (a controller being ADDED to `@Module`) produces a DIFFERENT bug class than an Express route definition — even if the code itself is correct, if it is not registered in the module, that route simply does not EXIST.',
      },
    },
    { type: 'heading', text: { tr: 'İskelet: Modül + Bootstrap', en: 'Skeleton: Module + Bootstrap' } },
    {
      type: 'code',
      language: 'bash',
      code: {
        tr: `# Nest CLI kurulumu ve yeni proje
npm i -g @nestjs/cli
nest new bug-tracker`,
        en: `# Install the Nest CLI and create a new project
npm i -g @nestjs/cli
nest new bug-tracker`,
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// app.module.ts — hangi controller/provider'larin birbirine bagli oldugunu bildirir
import { Module } from '@nestjs/common'
import { BugsController } from './bugs.controller'
import { BugsService } from './bugs.service'

@Module({
  controllers: [BugsController],   // TODO: buraya eklenmeyen controller HIC calismaz
  providers: [BugsService],
})
export class AppModule {}

// main.ts — uygulamanin giris noktasi
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()`,
        en: `// app.module.ts — declares which controllers/providers are wired together
import { Module } from '@nestjs/common'
import { BugsController } from './bugs.controller'
import { BugsService } from './bugs.service'

@Module({
  controllers: [BugsController],   // TODO: a controller not added here NEVER works
  providers: [BugsService],
})
export class AppModule {}

// main.ts — the application entry point
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `BugsController` `@Module`\'e eklenmezse**\n\n**Kod:** `bugs.controller.ts` dosyası tamamen doğru yazıldı (`@Controller`, `@Get()` decorator\'ları hepsi doğru), ama `app.module.ts`\'teki `controllers: [...]` dizisine EKLENMEDİ.\n\n**Ne olur:** Uygulama HATASIZ başlar (TypeScript derleyicisi bunu bir hata olarak görmez — sınıf hâlâ geçerli bir sınıftır), ama Nest\'in DI container\'ı bu controller\'dan HİÇ haberdar olmaz. `GET /api/v1/bugs` isteği atıldığında Nest\'in kendi varsayılan 404\'ü döner — sanki route hiç yazılmamış gibi.\n\n**Neden sinsi:** Bir code review\'da dosyayı açan biri "controller doğru yazılmış" der ve geçer — çünkü dosyanın İÇİ gerçekten doğrudur. Eksik olan tek satır, başka bir dosyadaki (`app.module.ts`) bir DİZİ elemanıdır; bu, "doğru kod, yanlış yerde kayıtlı değil" kategorisinin NestJS\'teki karşılığıdır.\n\n**Tester nerede yakalar:** Code review "her şey doğru görünüyor" dese bile, gerçek bir istek atıp 404 alınca — bu, "kod incelemesi yeterli değildir, çalışan sistemde doğrulama şarttır" prensibinin somut kanıtıdır.',
        en: '**🐞 Defect Birth — if `BugsController` is not added to `@Module`**\n\n**Code:** `bugs.controller.ts` was written entirely correctly (all the `@Controller`, `@Get()` decorators are right), but it was NOT added to the `controllers: [...]` array in `app.module.ts`.\n\n**What happens:** the app starts WITHOUT error (the TypeScript compiler does not see this as an error — the class is still a valid class), but Nest\'s DI container never learns about this controller at all. A `GET /api/v1/bugs` request gets Nest\'s own default 404 — as if the route was never written.\n\n**Why sneaky:** someone opening the file in a code review says "the controller is written correctly" and moves on — because the file\'s CONTENTS really are correct. The missing piece is a single ARRAY entry in a different file (`app.module.ts`); this is the NestJS counterpart of the "correct code, just not registered in the right place" category.\n\n**Where the tester catches it:** even if code review says "everything looks correct", sending a real request and getting 404 — concrete proof of the principle that "code review is not enough, verification on a running system is mandatory".',
      },
    },
    {
      type: 'video-scene',
      id: 'api-d1-module-film',
      title: { tr: '🎬 Doğru Kod, Kayıtsız Controller', en: '🎬 Correct Code, Unregistered Controller' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'controller', emoji: '📄', label: { tr: 'BugsController (doğru kod)', en: 'BugsController (correct code)' }, color: '#f59e0b' },
        { id: 'module', emoji: '🧩', label: { tr: '@Module({ controllers })', en: '@Module({ controllers })' }, color: '#a78bfa' },
        { id: 'di', emoji: '🔌', label: { tr: 'Nest DI Container', en: 'Nest DI Container' }, color: '#0ea5e9' },
        { id: 'missing', emoji: '❓', label: { tr: 'Route hiç yok!', en: 'Route does not exist!' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: '404 aldı, koda baktı: doğruydu', en: 'Got 404, checked the code: it was correct' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Geliştirici `bugs.controller.ts`\'i baştan sona doğru yazıyor — decorator\'lar, metotlar, hepsi tamam.', en: 'The developer writes `bugs.controller.ts` correctly from start to end — decorators, methods, all fine.' },
          positions: { controller: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Normalde bu controller `@Module({ controllers: [BugsController] })` dizisine EKLENMELİ.', en: 'Normally this controller MUST be ADDED to the `@Module({ controllers: [BugsController] })` array.' },
          positions: { controller: { x: 20, y: 40 }, module: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'controller', to: 'module', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Bu adım ATLANIRSA, Nest\'in DI container\'ı bu controller\'dan HİÇ haberdar olmaz — TypeScript derleyicisi de bunu bir hata saymaz.', en: 'If this step is SKIPPED, Nest\'s DI container never learns about this controller — TypeScript\'s compiler does not consider this an error either.' },
          positions: { module: { x: 22, y: 40, opacity: 0.4 }, di: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'controller', to: 'di', color: '#0ea5e9' }],
        },
        {
          caption: { tr: '`GET /api/v1/bugs` isteği atılır — route TANIMLI olsa da DI container\'a KAYITLI olmadığı için Nest 404 döner.', en: 'A `GET /api/v1/bugs` request is sent — even though the route is DEFINED, since it is not REGISTERED with the DI container, Nest returns 404.' },
          positions: { di: { x: 22, y: 40 }, missing: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'di', to: 'missing', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Kod incelemesi "dosya doğru yazılmış" der ama çalışan sistemde route yoktur. Tester her zaman gerçek bir istekle doğrular.', en: 'The lesson — code review says "the file is written correctly" but the route does not exist in the running system. A tester always verifies with a real request.' },
          positions: { missing: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'missing', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir Controller\'ın "Var Olma" Yolculuğu', en: 'A Controller\'s Journey to "Existing"' },
      steps: [
        { id: 1, icon: '📄', label: { tr: 'Sınıfı yaz…', en: 'Write the class…' }, detail: { tr: '@Controller() ve @Get() decorator\'larıyla BugsController\'ı yaz — bu TEK BAŞINA yeterli değildir.', en: 'Write BugsController with @Controller() and @Get() decorators — this ALONE is not enough.' } },
        { id: 2, icon: '🧩', label: { tr: 'Modüle kaydet…', en: 'Register with the module…' }, detail: { tr: '@Module({ controllers: [BugsController] }) dizisine EKLE — bu adım olmadan Nest sınıftan haberdar olmaz.', en: 'ADD it to the @Module({ controllers: [BugsController] }) array — without this step Nest never learns about the class.' } },
        { id: 3, icon: '🔌', label: { tr: 'DI container bağlasın…', en: 'Let the DI container wire it…' }, detail: { tr: 'Kayıtlı olan controller artık gerçek isteklere yanıt verebilir.', en: 'Once registered, the controller can now respond to real requests.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-d1-order-01',
      question: { tr: 'Bir Nest controller\'ının çalışır hale gelme sırasını diz.', en: 'Order the steps for a Nest controller to become functional.' },
      items: [
        { id: '1', text: { tr: 'nest new ile proje iskeletini oluştur', en: 'Create the project skeleton with nest new' }, order: 1 },
        { id: '2', text: { tr: '@Controller() decorator\'ı ile BugsController sınıfını yaz', en: 'Write the BugsController class with the @Controller() decorator' }, order: 2 },
        { id: '3', text: { tr: 'Controller\'ı @Module({ controllers: [...] }) dizisine ekle', en: 'Add the controller to the @Module({ controllers: [...] }) array' }, order: 3 },
        { id: '4', text: { tr: 'main.ts NestFactory.create(AppModule) ile uygulamayı başlatır', en: 'main.ts starts the app with NestFactory.create(AppModule)' }, order: 4 },
        { id: '5', text: { tr: 'GET isteği artık DI container üzerinden controller\'a ulaşır', en: 'A GET request now reaches the controller through the DI container' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d1-module',
      id: 'api-d1-module',
      title: { tr: 'Kendin Dene: Controller\'ı Modüle Kaydet', en: 'Try It Yourself: Register the Controller with the Module' },
      starterCode: `import { Module } from '@nestjs/common'
import { BugsController } from './bugs.controller'
import { BugsService } from './bugs.service'

// BUG: BugsController dizide yok, kod dogru ama route hic calismayacak
@Module({
  controllers: [],
  providers: [BugsService],
})
export class AppModule {}`,
      solutionCode: `import { Module } from '@nestjs/common'
import { BugsController } from './bugs.controller'
import { BugsService } from './bugs.service'

@Module({
  controllers: [BugsController],
  providers: [BugsService],
})
export class AppModule {}`,
      hint: { tr: 'Bir sınıfın `@Controller()` decorator\'ıyla doğru yazılmış olması yetmez; Nest\'in DI container\'ının onu tanıması için `@Module({ controllers: [...] })` dizisine EKLENMESİ gerekir.', en: 'A class being correctly written with `@Controller()` is not enough; for Nest\'s DI container to recognize it, it must be ADDED to the `@Module({ controllers: [...] })` array.' },
      successMessage: { tr: 'Doğru! Artık DI container BugsController\'ı tanır, GET /api/v1/bugs gerçekten yanıt döner.', en: 'Correct! Now the DI container recognizes BugsController, GET /api/v1/bugs actually responds.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir controller sınıfı doğru yazılmış ama `@Module`\'ün `controllers` dizisine eklenmemişse ne olur?', en: 'What happens if a controller class is written correctly but is not added to `@Module`\'s `controllers` array?' },
      options: [
        { id: 'a', text: { tr: 'TypeScript derleme hatası verir', en: 'TypeScript throws a compile error' } },
        { id: 'b', text: { tr: 'Uygulama hatasız başlar ama o controller\'ın route\'ları hiç var olmaz; istekler 404 alır', en: 'The app starts without error but that controller\'s routes never exist; requests get 404' } },
        { id: 'c', text: { tr: 'Nest otomatik olarak dosyayı tarayıp ekler', en: 'Nest automatically scans and adds the file' } },
        { id: 'd', text: { tr: 'Sadece POST route\'ları etkilenir', en: 'Only POST routes are affected' } },
      ],
      correct: 'b',
      explanation: { tr: 'TypeScript sınıfın kendisini geçerli bulur, derleme hatası vermez. Ama Nest\'in DI container\'ı SADECE `@Module`\'e kayıtlı sınıfları bilir; kayıtsız bir controller\'ın route\'ları hiçbir zaman gerçek bir isteğe yanıt vermez — sanki hiç yazılmamış gibi 404 döner.', en: 'TypeScript finds the class itself valid and throws no compile error. But Nest\'s DI container ONLY knows classes registered with `@Module`; an unregistered controller\'s routes never respond to a real request — they return 404 as if never written.' },
      retryQuestion: {
        question: { tr: 'NestJS\'te `@Module` decorator\'ının Spring Boot\'taki en yakın karşılığı nedir?', en: 'What is the closest Spring Boot equivalent of the `@Module` decorator in NestJS?' },
        options: [
          { id: 'a', text: { tr: '@Configuration sınıfı — hangi bean/controller\'ların birbirine bağlı olduğunu bildirir', en: 'A @Configuration class — declares which beans/controllers are wired together' } },
          { id: 'b', text: { tr: '@Entity sınıfı', en: 'An @Entity class' } },
          { id: 'c', text: { tr: 'pom.xml dosyası', en: 'The pom.xml file' } },
          { id: 'd', text: { tr: 'application.properties dosyası', en: 'The application.properties file' } },
        ],
        correct: 'a',
        explanation: { tr: 'Spring\'de `@Configuration` (ve component tarama) hangi sınıfların container\'a dahil olacağını bildirir; Nest\'te bu iş `@Module`\'ün `controllers`/`providers` dizileriyle yapılır — ikisi de "bu sınıflar birbirine bağlı" bildirimidir.', en: 'In Spring, `@Configuration` (and component scanning) declares which classes join the container; in Nest this is done through `@Module`\'s `controllers`/`providers` arrays — both are declarations of "these classes are wired together".' },
      },
    },
  ],
}

const D2 = {
  title: { tr: '🎀 D2 · Controller Decorator\'ları: @Get, @Post, @Body', en: '🎀 D2 · Controller Decorators: @Get, @Post, @Body' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🎀',
      content: {
        tr: 'Nest\'in controller decorator\'ları, Spring annotation\'larının **neredeyse birebir TypeScript çevirisi** gibidir: Spring\'de `@RestController` + `@RequestMapping("/bugs")` + `@GetMapping` bir sınıf ve metot etiketlerken, Nest\'te `@Controller(\'bugs\')` + `@Get()` AYNI işi yapar; `@RequestBody` yerine `@Body()`, `@PathVariable` yerine `@Param()` gelir. Peki bu kadar benzerken Express\'ten sonra Nest\'i neden ayrı öğreniyoruz? Çünkü Express\'te (C2) `req.params`/`req.query` fonksiyon GÖVDESİNDE elle okunurken, Nest\'te bu bilgi decorator\'lar sayesinde doğrudan METOT PARAMETRESİ olarak gelir — sözleşme, imzanın kendisinde görünür kılınır, tıpkı Spring\'de olduğu gibi. Bu, "okunabilirlik" tercihinden fazlasıdır: parametre bir decorator ile İŞARETLENMEZSE (örn. `@Body()` unutulursa), Nest o parametreyi `undefined` bırakır — Express\'teki `express.json()` sırası hatasına BENZER ama kök nedeni farklı bir sessiz hata sınıfı doğurur.',
        en: 'Nest\'s controller decorators are like an **almost direct TypeScript translation** of Spring annotations: in Spring, `@RestController` + `@RequestMapping("/bugs")` + `@GetMapping` label a class and method; in Nest, `@Controller(\'bugs\')` + `@Get()` do the SAME job; `@RequestBody` becomes `@Body()`, `@PathVariable` becomes `@Param()`. So with such similarity, why learn Nest separately after Express? Because in Express (C2), `req.params`/`req.query` are read by hand INSIDE the function body, while in Nest this information arrives directly as a METHOD PARAMETER thanks to decorators — the contract is made visible right in the signature, just like in Spring. This is more than a "readability" preference: if a parameter is NOT MARKED with a decorator (e.g., `@Body()` is forgotten), Nest leaves that parameter `undefined` — SIMILAR to Express\'s `express.json()` order bug, but born from a different root cause.',
      },
    },
    { type: 'heading', text: { tr: 'Aynı Endpoint\'ler, Decorator ile', en: 'The Same Endpoints, via Decorators' } },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// bugs.controller.ts
import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common'
import { BugsService } from './bugs.service'

@Controller('api/v1/bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.bugsService.findAll(status)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bugsService.findOne(Number(id))
  }

  @Post()
  create(@Body() body: any) {
    // TODO: @Body() unutulursa body her zaman undefined gelir
    return this.bugsService.create(body)
  }
}`,
        en: `// bugs.controller.ts
import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common'
import { BugsService } from './bugs.service'

@Controller('api/v1/bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.bugsService.findAll(status)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bugsService.findOne(Number(id))
  }

  @Post()
  create(@Body() body: any) {
    // TODO: forgetting @Body() means body always arrives as undefined
    return this.bugsService.create(body)
  }
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `@Body()` decorator\'ı unutulursa**\n\n**Kod:** `create(body: any)` — parametre var, tipi de yazılmış, ama başına `@Body()` decorator\'ı KONMAMIŞ.\n\n**Ne olur:** Nest\'in HTTP adaptörü (Express) gövdeyi zaten ayrıştırmıştır, ama decorator olmadan Nest bu veriyi metoda HANGİ parametreye bağlayacağını bilemez — `body` parametresi `undefined` kalır. `POST /api/v1/bugs { "title": "..." }` isteği 201 döner ama kayıt tamamen boştur.\n\n**Neden sinsi:** TypeScript hiçbir hata vermez (`body: any` geçerli bir parametredir), Nest de çalışma zamanında sessizce `undefined` geçer — tıpkı C3\'teki `express.json()` sıra hatasının SONUCU gibi görünür ama kök nedeni tamamen farklıdır (orada middleware sırası, burada eksik decorator).\n\n**Tester nerede yakalar:** POST sonrası GET ile kaydı tekrar okuyup tüm alanların boş geldiğini görünce — "201 aldım ama içerik boş" ailesinin NestJS\'teki üçüncü örneği (bkz. B1, C3).',
        en: '**🐞 Defect Birth — if the `@Body()` decorator is forgotten**\n\n**Code:** `create(body: any)` — the parameter exists, its type is written, but the `@Body()` decorator was NOT placed in front of it.\n\n**What happens:** Nest\'s HTTP adapter (Express) has already parsed the body, but without the decorator Nest cannot know WHICH parameter to bind that data to — the `body` parameter stays `undefined`. A `POST /api/v1/bugs { "title": "..." }` request returns 201 but the record is entirely empty.\n\n**Why sneaky:** TypeScript throws no error (`body: any` is a valid parameter), and Nest silently passes `undefined` at runtime — it LOOKS like the same result as C3\'s `express.json()` order bug, but its root cause is entirely different (there it was middleware order, here it is a missing decorator).\n\n**Where the tester catches it:** reading the record back with a GET after the POST and seeing all fields come back empty — the third example, in NestJS, of the "got 201 but the content is empty" family (see B1, C3).',
      },
    },
    {
      type: 'video-scene',
      id: 'api-d2-decorators-film',
      title: { tr: '🎬 Decorator Yoksa, Parametre Yok', en: '🎬 No Decorator, No Parameter' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'http', emoji: '📤', label: { tr: 'POST + JSON gövde', en: 'POST + JSON body' }, color: '#f59e0b' },
        { id: 'adapter', emoji: '⚙️', label: { tr: 'HTTP adaptörü ayrıştırır', en: 'HTTP adapter parses it' }, color: '#0ea5e9' },
        { id: 'decorator', emoji: '🏷️', label: { tr: '@Body() bağlar', en: '@Body() binds it' }, color: '#a78bfa' },
        { id: 'missing', emoji: '❓', label: { tr: 'Decorator yok → undefined', en: 'No decorator → undefined' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Boş kayıt kanıtı', en: 'Evidence of an empty record' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'İstemci `POST /api/v1/bugs` isteğini JSON gövdeyle gönderiyor.', en: 'The client sends a `POST /api/v1/bugs` request with a JSON body.' },
          positions: { http: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Nest\'in altındaki HTTP adaptörü (Express) gövdeyi zaten bir JavaScript nesnesine ayrıştırdı.', en: 'The HTTP adapter under Nest (Express) has already parsed the body into a JavaScript object.' },
          positions: { http: { x: 20, y: 40 }, adapter: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'http', to: 'adapter', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'DOĞRU YOLDA: `@Body()` decorator\'ı bu ayrıştırılmış veriyi metot parametresine BAĞLAR.', en: 'ON THE CORRECT PATH: the `@Body()` decorator BINDS this parsed data to the method parameter.' },
          positions: { adapter: { x: 20, y: 40 }, decorator: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'adapter', to: 'decorator', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'DECORATOR EKSİKSE: Nest veriyi hangi parametreye bağlayacağını bilemez, parametre `undefined` kalır.', en: 'IF THE DECORATOR IS MISSING: Nest cannot know which parameter to bind the data to, the parameter stays `undefined`.' },
          positions: { decorator: { x: 22, y: 40, opacity: 0.4 }, missing: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'adapter', to: 'missing', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Ayrıştırma ile bağlama iki AYRI adımdır. Tester yine "201 aldım" ile yetinmez, dönen veriyi doğrular.', en: 'The lesson — parsing and binding are two SEPARATE steps. Again, a tester does not settle for "I got 201"; they verify the returned data.' },
          positions: { missing: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'missing', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'İstekten Metot Parametresine', en: 'From Request to Method Parameter' },
      steps: [
        { id: 1, icon: '📤', label: { tr: 'İstek gelir…', en: 'Request arrives…' }, detail: { tr: 'HTTP adaptörü gövdeyi/parametreleri ayrıştırır — bu Express katmanının işidir.', en: 'The HTTP adapter parses the body/params — this is the Express layer\'s job.' } },
        { id: 2, icon: '🏷️', label: { tr: 'Decorator bağlar…', en: 'Decorator binds it…' }, detail: { tr: '@Body()/@Param()/@Query() ayrıştırılmış veriyi doğru metot parametresine yerleştirir.', en: '@Body()/@Param()/@Query() place the parsed data into the correct method parameter.' } },
        { id: 3, icon: '⚙️', label: { tr: 'Metot çalışır…', en: 'Method runs…' }, detail: { tr: 'Parametre doluysa handler doğru veriyle çalışır; decorator eksikse undefined ile çalışır.', en: 'If the parameter is filled, the handler runs with correct data; if the decorator is missing, it runs with undefined.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-d2-order-01',
      question: { tr: 'Bir Nest POST isteğinde veri akışını sırala.', en: 'Order the data flow for a Nest POST request.' },
      items: [
        { id: '1', text: { tr: 'İstemci JSON gövdeyle POST isteği gönderir', en: 'Client sends a POST request with a JSON body' }, order: 1 },
        { id: '2', text: { tr: 'HTTP adaptörü gövdeyi JavaScript nesnesine ayrıştırır', en: 'The HTTP adapter parses the body into a JavaScript object' }, order: 2 },
        { id: '3', text: { tr: '@Body() decorator\'ı veriyi metot parametresine bağlar', en: 'The @Body() decorator binds the data to the method parameter' }, order: 3 },
        { id: '4', text: { tr: 'Controller metodu servis katmanını çağırır', en: 'The controller method calls the service layer' }, order: 4 },
        { id: '5', text: { tr: 'Servis kaydı oluşturur, controller 201 döner', en: 'The service creates the record, the controller returns 201' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d2-decorators',
      id: 'api-d2-decorators',
      title: { tr: 'Kendin Dene: Eksik @Body() Decorator\'ını Ekle', en: 'Try It Yourself: Add the Missing @Body() Decorator' },
      starterCode: `@Post()
// BUG: parametrenin basinda decorator yok, body her zaman undefined gelir
create(body: any) {
  return this.bugsService.create(body)
}`,
      solutionCode: `@Post()
create(@Body() body: any) {
  return this.bugsService.create(body)
}`,
      hint: { tr: 'Nest, metot parametrelerine hangi verinin bağlanacağını yalnızca decorator\'lardan (`@Body()`, `@Param()`, `@Query()`) anlar. Decorator yoksa parametre HTTP adaptörü veriyi ayrıştırmış olsa bile `undefined` kalır.', en: 'Nest only understands which data binds to a method parameter through decorators (`@Body()`, `@Param()`, `@Query()`). Without a decorator the parameter stays `undefined` even if the HTTP adapter already parsed the data.' },
      successMessage: { tr: 'Doğru! Artık body doğru şekilde bağlanır, kayıt boş alanlarla oluşmaz.', en: 'Correct! Now the body binds correctly, records are not created with empty fields.' },
    },
    {
      type: 'quiz',
      question: { tr: '`@Body()` decorator\'ı unutulup parametre sadece `body: any` yazılırsa ne olur?', en: 'What happens if the `@Body()` decorator is forgotten and the parameter is just written as `body: any`?' },
      options: [
        { id: 'a', text: { tr: 'TypeScript derleme hatası verir', en: 'TypeScript throws a compile error' } },
        { id: 'b', text: { tr: 'Derleme geçer ama Nest veriyi bağlayamaz; body çalışma zamanında undefined kalır', en: 'Compilation passes but Nest cannot bind the data; body stays undefined at runtime' } },
        { id: 'c', text: { tr: 'İstek otomatik olarak 400 ile reddedilir', en: 'The request is automatically rejected with 400' } },
        { id: 'd', text: { tr: 'Nest decorator\'ı otomatik olarak varsayar', en: 'Nest automatically assumes the decorator' } },
      ],
      correct: 'b',
      explanation: { tr: '`body: any` TypeScript için geçerli bir parametre bildirimidir, derleme hatası vermez. Ama Nest çalışma zamanında veriyi parametreye bağlamak için decorator\'a ihtiyaç duyar; decorator yoksa parametre HTTP adaptörü tarafından ayrıştırılmış olsa bile `undefined` kalır.', en: '`body: any` is a valid parameter declaration for TypeScript, it throws no compile error. But at runtime Nest needs the decorator to bind data to the parameter; without it the parameter stays `undefined` even though the HTTP adapter already parsed it.' },
      retryQuestion: {
        question: { tr: 'Nest\'te `@Param(\'id\')` decorator\'ının Express\'teki en yakın karşılığı nedir?', en: 'What is the closest Express equivalent of the `@Param(\'id\')` decorator in Nest?' },
        options: [
          { id: 'a', text: { tr: 'req.params.id — ikisi de path parametresini okur', en: 'req.params.id — both read the path parameter' } },
          { id: 'b', text: { tr: 'req.query.id', en: 'req.query.id' } },
          { id: 'c', text: { tr: 'req.headers.id', en: 'req.headers.id' } },
          { id: 'd', text: { tr: 'req.body.id', en: 'req.body.id' } },
        ],
        correct: 'a',
        explanation: { tr: 'Her ikisi de yolun `:id` kısmını okur; Express\'te bu elle `req.params.id` ile, Nest\'te ise `@Param(\'id\')` decorator\'ıyla metot parametresi olarak okunur.', en: 'Both read the `:id` part of the path; in Express this is done by hand with `req.params.id`, in Nest it is read as a method parameter via the `@Param(\'id\')` decorator.' },
      },
    },
  ],
}

const D3 = {
  title: { tr: '📦 D3 · DTO + class-validator + ValidationPipe', en: '📦 D3 · DTO + class-validator + ValidationPipe' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📦',
      content: {
        tr: 'DTO (Data Transfer Object) + `class-validator` + `ValidationPipe` üçlüsü, Spring\'in Bean Validation\'ının **TAM YAPISAL karşılığıdır**: Java\'da `@NotBlank`/`@Size` bir sınıf alanına yapıştırılır ve `@Valid` bunu tetikler; Nest\'te `@IsNotEmpty()`/`@Length()` bir DTO sınıfının alanına yapıştırılır ve `ValidationPipe` bunu tetikler. Bu, Express\'teki (C4) "kuralları tanımla, SONUCU elle oku" modelinden TAMAMEN farklıdır — burada framework, Spring\'deki gibi, doğrulamayı SENİN İÇİN otomatik yapar. Peki neden Nest, Express\'in aksine bu otomasyona geri dönüyor? Çünkü Nest zaten "opinionated" bir seçim yaptı (D1) — decorator tabanlı bir yapıyı benimseyince, validation da doğal olarak aynı decorator mantığına oturur. Ama burada YENİ bir tuzak var: `ValidationPipe`, Spring\'deki gibi "her zaman açık" değildir — `main.ts`\'te `app.useGlobalPipes(new ValidationPipe())` ile AÇIKÇA etkinleştirilmesi gerekir. DTO\'daki decorator\'lar süs kalabilir, tıpkı B1\'deki eksik `starter-validation` gibi — ama bu sefer kök neden "eksik kütüphane" değil, "kütüphane kurulu ama devreye ALINMAMIŞ".',
        en: 'The DTO (Data Transfer Object) + `class-validator` + `ValidationPipe` trio is the **STRUCTURALLY EXACT** counterpart of Spring\'s Bean Validation: in Java, `@NotBlank`/`@Size` are glued to a class field and `@Valid` triggers them; in Nest, `@IsNotEmpty()`/`@Length()` are glued to a DTO class field and `ValidationPipe` triggers them. This is COMPLETELY different from Express\'s (C4) "define rules, READ the result by hand" model — here the framework, like Spring, does validation automatically FOR you. So why does Nest return to this automation unlike Express? Because Nest already made an "opinionated" choice (D1) — once it adopted a decorator-based structure, validation naturally settles into the same decorator logic. But there is a NEW trap here: `ValidationPipe` is NOT "always on" like in Spring — it must be EXPLICITLY enabled in `main.ts` with `app.useGlobalPipes(new ValidationPipe())`. The DTO\'s decorators can remain decoration only, much like the missing `starter-validation` in B1 — except this time the root cause is not "missing library" but "library installed, just never ACTIVATED".',
      },
    },
    { type: 'heading', text: { tr: 'DTO Yazmak ve Pipe\'ı Etkinleştirmek', en: 'Writing the DTO and Activating the Pipe' } },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// create-bug.dto.ts — Spring'deki BugRequest.java'nin Nest karsiligi
import { IsString, Length, IsIn, IsEmail } from 'class-validator'

export class CreateBugDto {
  @IsString()
  @Length(3, 120)
  title: string

  @IsIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  severity: string

  @IsEmail()
  reporter: string
}`,
        en: `// create-bug.dto.ts — the Nest counterpart of Spring's BugRequest.java
import { IsString, Length, IsIn, IsEmail } from 'class-validator'

export class CreateBugDto {
  @IsString()
  @Length(3, 120)
  title: string

  @IsIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  severity: string

  @IsEmail()
  reporter: string
}`,
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// bugs.controller.ts — artik DTO tipiyle @Body()
@Post()
create(@Body() dto: CreateBugDto) {
  return this.bugsService.create(dto)
}

// main.ts — TODO: bu satir olmadan yukaridaki decorator'lar SUSTUR
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())   // DTO dogrulamasini GERCEKTEN tetikler
  await app.listen(3000)
}`,
        en: `// bugs.controller.ts — now with the DTO type via @Body()
@Post()
create(@Body() dto: CreateBugDto) {
  return this.bugsService.create(dto)
}

// main.ts — TODO: without this line the decorators above are just DECORATION
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())   // REALLY triggers DTO validation
  await app.listen(3000)
}`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `app.useGlobalPipes(new ValidationPipe())` unutulursa**\n\n**Kod:** `CreateBugDto` tüm `class-validator` decorator\'larıyla KUSURSUZ yazıldı, controller `@Body() dto: CreateBugDto` ile DOĞRU tip kullanıyor — ama `main.ts`\'te `app.useGlobalPipes(new ValidationPipe())` satırı YOK.\n\n**Ne olur:** Nest, DTO\'yu sadece bir TypeScript TİPİ olarak kullanır (derleme zamanı bilgisi, JavaScript\'e derlenince kaybolur); `class-validator` decorator\'larını kimse ÇALIŞTIRMAZ. `POST /api/v1/bugs { "title": "" }` isteği 400 yerine 201 döner.\n\n**Neden sinsi:** DTO dosyası açıldığında decorator\'lar tamamen doğru görünür — bir code review "validation var" der ve geçer. Ama decorator\'ların ÇALIŞMASI için global bir pipe\'ın etkinleştirilmesi gerekir; bu, B1\'deki eksik dependency\'den ve C4\'teki okunmayan sonuçtan FARKLI bir üçüncü kök nedendir: "kurallar var, ama hiç TETİKLENMİYOR".\n\n**Tester nerede yakalar:** Boş title ile POST atıp 201 alınca — DTO dosyasını incelemek yeterli değildir, `main.ts`\'te `useGlobalPipes` çağrısının GERÇEKTEN var olduğu ayrıca doğrulanmalıdır.',
        en: '**🐞 Defect Birth — if `app.useGlobalPipes(new ValidationPipe())` is forgotten**\n\n**Code:** `CreateBugDto` was written FLAWLESSLY with all `class-validator` decorators, the controller uses the CORRECT type with `@Body() dto: CreateBugDto` — but `main.ts` has no `app.useGlobalPipes(new ValidationPipe())` line.\n\n**What happens:** Nest treats the DTO as just a TypeScript TYPE (compile-time information, gone once compiled to JavaScript); nobody RUNS the `class-validator` decorators. A `POST /api/v1/bugs { "title": "" }` request returns 201 instead of 400.\n\n**Why sneaky:** opening the DTO file, the decorators look entirely correct — a code review says "validation exists" and moves on. But for the decorators to ACTUALLY run, a global pipe must be activated; this is a third root cause, DIFFERENT from B1\'s missing dependency and C4\'s unread result: "the rules exist, but are never TRIGGERED".\n\n**Where the tester catches it:** sending a POST with an empty title and getting 201 — reviewing the DTO file is not enough, the presence of the `useGlobalPipes` call in `main.ts` must be separately verified.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-d3-pipe-film',
      title: { tr: '🎬 Nest\'in Pipe Hattı', en: '🎬 The Pipe Hall of Nest' },
      xpReward: 15,
      sceneDurationMs: 3400,
      stageHeight: 280,
      actors: [
        { id: 'request', emoji: '📤', label: { tr: 'POST { title: "" }', en: 'POST { title: "" }' }, color: '#f59e0b' },
        { id: 'dto', emoji: '📋', label: { tr: 'CreateBugDto decorator\'ları', en: 'CreateBugDto decorators' }, color: '#0ea5e9' },
        { id: 'pipe', emoji: '🚰', label: { tr: 'ValidationPipe', en: 'ValidationPipe' }, color: '#a78bfa' },
        { id: 'controller', emoji: '🎀', label: { tr: 'Controller', en: 'Controller' }, color: '#22c55e' },
        { id: 'filter', emoji: '🧱', label: { tr: 'Exception Filter', en: 'Exception Filter' }, color: '#8b5cf6' },
        { id: 'silent', emoji: '🙈', label: { tr: 'Pipe kayıtsız → sessizce geçer', en: 'Pipe unregistered → passes silently' }, color: '#ef4444' },
      ],
      scenes: [
        {
          caption: { tr: 'İstemci geçersiz bir gövdeyle (`title: ""`) `POST /api/v1/bugs` isteği gönderiyor.', en: 'The client sends a `POST /api/v1/bugs` request with an invalid body (`title: ""`).' },
          positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'İstek `CreateBugDto`\'nun sınırından geçer — bu sınıfta `@Length(3,120)` gibi kurallar TANIMLIDIR.', en: 'The request passes through the `CreateBugDto` boundary — this class has rules like `@Length(3,120)` DEFINED on it.' },
          positions: { request: { x: 18, y: 35 }, dto: { x: 55, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'request', to: 'dto', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'DOĞRU KURULUMDA: `ValidationPipe` global olarak etkinse, controller\'a ulaşmadan ÖNCE isteği durdurup 400 döner.', en: 'IN THE CORRECT SETUP: if `ValidationPipe` is globally active, it stops the request and returns 400 BEFORE it reaches the controller.' },
          positions: { dto: { x: 18, y: 35 }, pipe: { x: 55, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'dto', to: 'pipe', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Pipe geçerse controller çalışır, servis kaydı oluşturur, `Exception Filter` sadece GERÇEK hatalarda devreye girer.', en: 'If the pipe passes, the controller runs, the service creates the record, the `Exception Filter` only engages on REAL errors.' },
          positions: { pipe: { x: 18, y: 35 }, controller: { x: 45, y: 50, scale: 1.1 }, filter: { x: 68, y: 60, scale: 1.1, pulse: true } },
          beams: [{ from: 'pipe', to: 'controller', color: '#22c55e' }, { from: 'controller', to: 'filter', color: '#8b5cf6' }],
        },
        {
          caption: { tr: 'YANLIŞ KURULUMDA: `main.ts`\'te `useGlobalPipes` YOKSA, DTO decorator\'ları hiçbir zaman ÇALIŞMAZ — geçersiz veri sessizce controller\'a ULAŞIR.', en: 'IN THE WRONG SETUP: if `useGlobalPipes` is MISSING in `main.ts`, the DTO decorators NEVER run — invalid data silently REACHES the controller.' },
          positions: { pipe: { x: 25, y: 45, opacity: 0.35 }, silent: { x: 60, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'dto', to: 'silent', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — DTO\'da decorator YAZMAK, pipe\'ı ETKİNLEŞTİRMEKTEN farklı bir adımdır. Tester ikisini AYRI AYRI doğrular: DTO var mı, pipe global olarak kayıtlı mı?', en: 'The lesson — WRITING decorators on the DTO is a different step from ACTIVATING the pipe. A tester verifies both SEPARATELY: does the DTO exist, and is the pipe globally registered?' },
          positions: { silent: { x: 40, y: 48, scale: 1.15, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'DTO\'dan Reddedilen İsteğe', en: 'From a DTO to a Rejected Request' },
      steps: [
        { id: 1, icon: '📋', label: { tr: 'DTO yaz…', en: 'Write the DTO…' }, detail: { tr: 'class-validator decorator\'larıyla (@IsString, @Length, @IsIn) kuralları sınıf alanlarına yapıştır.', en: 'Glue rules to class fields with class-validator decorators (@IsString, @Length, @IsIn).' } },
        { id: 2, icon: '🚰', label: { tr: 'Pipe\'ı etkinleştir…', en: 'Activate the pipe…' }, detail: { tr: 'main.ts\'te app.useGlobalPipes(new ValidationPipe()) YAZILMADAN decorator\'lar asla çalışmaz.', en: 'WITHOUT app.useGlobalPipes(new ValidationPipe()) in main.ts, the decorators never run.' } },
        { id: 3, icon: '🛑', label: { tr: 'Geçersiz veri durur…', en: 'Invalid data is stopped…' }, detail: { tr: 'Pipe etkinse, geçersiz gövde controller\'a ULAŞMADAN 400 ile reddedilir.', en: 'If the pipe is active, an invalid body is rejected with 400 BEFORE reaching the controller.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-d3-order-01',
      question: { tr: 'Nest\'te DTO doğrulamasının gerçekten çalışması için sırayı diz.', en: 'Order the steps for DTO validation to actually work in Nest.' },
      items: [
        { id: '1', text: { tr: 'CreateBugDto sınıfını class-validator decorator\'larıyla yaz', en: 'Write the CreateBugDto class with class-validator decorators' }, order: 1 },
        { id: '2', text: { tr: 'Controller\'da @Body() dto: CreateBugDto kullan', en: 'Use @Body() dto: CreateBugDto in the controller' }, order: 2 },
        { id: '3', text: { tr: 'main.ts\'te app.useGlobalPipes(new ValidationPipe()) ekle', en: 'Add app.useGlobalPipes(new ValidationPipe()) in main.ts' }, order: 3 },
        { id: '4', text: { tr: 'Geçersiz istek gönder, pipe onu controller\'a ULAŞMADAN durdurur', en: 'Send an invalid request, the pipe stops it BEFORE reaching the controller' }, order: 4 },
        { id: '5', text: { tr: 'Geçerli istek 201 ile kaydı oluşturur', en: 'A valid request creates the record with 201' }, order: 5 },
      ],
      xpReward: 13,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d3-pipe',
      id: 'api-d3-pipe',
      title: { tr: 'Kendin Dene: ValidationPipe\'ı Etkinleştir', en: 'Try It Yourself: Activate the ValidationPipe' },
      starterCode: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// BUG: DTO decorator'lari yazildi ama hicbir zaman calismayacak
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()`,
      solutionCode: `import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()`,
      hint: { tr: 'DTO sınıfındaki `class-validator` decorator\'ları TEK BAŞINA hiçbir şey doğrulamaz. Bunların çalışması için `main.ts`\'te `app.useGlobalPipes(new ValidationPipe())` çağrısı ZORUNLUDUR.', en: 'The `class-validator` decorators on a DTO class validate NOTHING on their own. For them to run, calling `app.useGlobalPipes(new ValidationPipe())` in `main.ts` is MANDATORY.' },
      successMessage: { tr: 'Doğru! Artık DTO decorator\'ları gerçekten tetiklenir, geçersiz veri 400 ile durdurulur.', en: 'Correct! Now the DTO decorators are really triggered, invalid data is stopped with 400.' },
    },
    {
      type: 'quiz',
      question: { tr: 'DTO sınıfı `class-validator` decorator\'larıyla doğru yazılmış ama `app.useGlobalPipes(new ValidationPipe())` çağrılmamışsa ne olur?', en: 'What happens if the DTO class is correctly written with `class-validator` decorators but `app.useGlobalPipes(new ValidationPipe())` is never called?' },
      options: [
        { id: 'a', text: { tr: 'Decorator\'lar otomatik olarak devreye girer', en: 'The decorators kick in automatically' } },
        { id: 'b', text: { tr: 'DTO sadece bir TypeScript tipi olarak kalır; decorator\'lar hiç çalıştırılmaz, geçersiz veri 201 ile kabul edilir', en: 'The DTO remains just a TypeScript type; the decorators never run, invalid data is accepted with 201' } },
        { id: 'c', text: { tr: 'Uygulama başlamayı reddeder', en: 'The application refuses to start' } },
        { id: 'd', text: { tr: 'Sadece GET isteklerinde doğrulama devre dışı kalır', en: 'Validation is only disabled for GET requests' } },
      ],
      correct: 'b',
      explanation: { tr: '`ValidationPipe` global olarak etkinleştirilmeden, `class-validator` decorator\'ları Nest\'in istek işleme hattına HİÇ dahil edilmez — DTO sadece derleme zamanı bir TypeScript tipi olarak kalır. Bu yüzden geçersiz veri de tıpkı geçerli veri gibi controller\'a ulaşır.', en: 'Without `ValidationPipe` being globally activated, `class-validator` decorators are NEVER wired into Nest\'s request pipeline — the DTO remains merely a compile-time TypeScript type. So invalid data reaches the controller just like valid data would.' },
      retryQuestion: {
        question: { tr: 'Nest\'teki DTO + ValidationPipe ikilisi, Spring\'deki hangi ikiliye karşılık gelir?', en: 'Which Spring pair does Nest\'s DTO + ValidationPipe pair correspond to?' },
        options: [
          { id: 'a', text: { tr: 'Bean Validation annotation\'ları (@NotBlank vb.) + @Valid', en: 'Bean Validation annotations (@NotBlank etc.) + @Valid' } },
          { id: 'b', text: { tr: '@Entity + @Repository', en: '@Entity + @Repository' } },
          { id: 'c', text: { tr: '@Configuration + @Bean', en: '@Configuration + @Bean' } },
          { id: 'd', text: { tr: 'application.yml + pom.xml', en: 'application.yml + pom.xml' } },
        ],
        correct: 'a',
        explanation: { tr: 'DTO alanlarındaki `class-validator` decorator\'ları, Spring\'deki `@NotBlank`/`@Size` gibi Bean Validation annotation\'larının; `ValidationPipe` ise bunları tetikleyen `@Valid`\'in Nest\'teki karşılığıdır.', en: 'The `class-validator` decorators on DTO fields correspond to Spring\'s Bean Validation annotations like `@NotBlank`/`@Size`; `ValidationPipe` is Nest\'s counterpart of `@Valid`, which triggers them.' },
      },
    },
  ],
}

const D4 = {
  title: { tr: '🧱 D4 · Exception Filter ve HttpException', en: '🧱 D4 · Exception Filter and HttpException' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧱',
      content: {
        tr: 'Nest\'in Exception Filter\'ı, Spring\'in `@RestControllerAdvice`\'inin **decorator ile işaretlenmiş TAM karşılığıdır**: Spring\'de `@ExceptionHandler(NotFoundException.class)` bir metoda "bu exception tipini SEN yakala" der; Nest\'te `@Catch(HttpException)` bir sınıfa AYNI şeyi söyler — hangi hata TİPİNİN bu filtreye düşeceği decorator\'da AÇIKÇA yazılıdır (Express\'teki C5\'in aksine, burada parametre SAYISI değil, decorator TİPİ belirleyicidir). `HttpException` (ve `NotFoundException`, `BadRequestException` gibi alt sınıfları) Nest\'in kendi hazır hata sınıflarıdır — `throw new NotFoundException(\'Bug bulunamadi\')` yazman, Spring\'de özel bir exception sınıfı fırlatmana denktir. Peki Nest\'in kendi VARSAYILAN exception davranışı zaten JSON döndürüyorken (Express\'in HTML\'ine kıyasla bir adım öndedir), neden hâlâ özel bir filter yazıyoruz? Çünkü tester\'ın beklediği hata gövdesinin ŞEKLİ (`{ error: "..." }` mi, `{ message: "...", statusCode: ... }` mi) projenin SÖZLEŞMESİNE göre değişir — varsayılan davranış "bir şey" döner ama SÖZLEŞMEYE UYAN şeyi döndürmesi GARANTİ değildir; bu garantiyi filter\'ı hem yazıp hem KAYDETMEK verir.',
        en: 'Nest\'s Exception Filter is the **decorator-marked EXACT counterpart** of Spring\'s `@RestControllerAdvice`: in Spring, `@ExceptionHandler(NotFoundException.class)` tells a method "YOU catch this exception type"; in Nest, `@Catch(HttpException)` tells a class the SAME thing — which error TYPE falls into this filter is EXPLICITLY written in the decorator (unlike Express\'s C5, where it is the parameter COUNT, not a decorator TYPE, that decides). `HttpException` (and its subclasses like `NotFoundException`, `BadRequestException`) are Nest\'s own ready-made error classes — writing `throw new NotFoundException(\'Bug not found\')` is equivalent to throwing a custom exception class in Spring. So if Nest\'s own DEFAULT exception behavior already returns JSON (a step ahead of Express\'s HTML), why still write a custom filter? Because the SHAPE of the error body a tester expects (`{ error: "..." }` or `{ message: "...", statusCode: ... }`) depends on the project\'s CONTRACT — the default behavior returns "something" but returning something that MATCHES THE CONTRACT is not GUARANTEED; writing AND registering the filter is what provides that guarantee.',
      },
    },
    { type: 'heading', text: { tr: 'Özel Filter Yazmak ve Global Kaydetmek', en: 'Writing a Custom Filter and Registering It Globally' } },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// bugs.service.ts — is kurali burada, HttpException firlatir
import { NotFoundException } from '@nestjs/common'

findOne(id: number) {
  const bug = this.bugs.find(b => b.id === id)
  if (!bug) {
    throw new NotFoundException('Bug bulunamadi')   // Spring'deki custom exception'a esdeger
  }
  return bug
}`,
        en: `// bugs.service.ts — the business rule lives here, throws HttpException
import { NotFoundException } from '@nestjs/common'

findOne(id: number) {
  const bug = this.bugs.find(b => b.id === id)
  if (!bug) {
    throw new NotFoundException('Bug not found')   // equivalent of a custom exception in Spring
  }
  return bug
}`,
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// http-exception.filter.ts — sozlesmeye uygun sabit hata govdesi
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'

@Catch(HttpException)   // sadece HttpException ve alt siniflarini yakalar
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    response.status(status).json({ error: exception.message })   // proje sozlesmesi: { error }
  }
}

// main.ts — TODO: bu satir olmadan filter HICBIR ZAMAN calismaz
app.useGlobalFilters(new HttpExceptionFilter())`,
        en: `// http-exception.filter.ts — a fixed, contract-compliant error body
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'

@Catch(HttpException)   // catches only HttpException and its subclasses
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    response.status(status).json({ error: exception.message })   // project contract: { error }
  }
}

// main.ts — TODO: without this line the filter NEVER runs
app.useGlobalFilters(new HttpExceptionFilter())`,
      },
    },
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: '**🐞 Defect Doğum Anı — `app.useGlobalFilters(...)` unutulursa**\n\n**Kod:** `HttpExceptionFilter` sınıfı `@Catch(HttpException)` ile KUSURSUZ yazıldı, `{ error: exception.message }` sözleşmeye tam uyuyor — ama `main.ts`\'te `app.useGlobalFilters(new HttpExceptionFilter())` çağrısı YOK.\n\n**Ne olur:** `GET /api/v1/bugs/999` isteği için `throw new NotFoundException(...)` çalışır, ama özel filter kayıtlı olmadığı için Nest kendi VARSAYILAN hata işleyicisine düşer — bu da JSON döner ama proje sözleşmesindeki `{ error: "..." }` yerine Nest\'in kendi şekli olan `{ statusCode: 404, message: "...", error: "Not Found" }`\'u döndürür.\n\n**Neden sinsi:** İstek yine JSON döner (Express\'teki HTML sürprizinden farklı olarak SUNUCU tarafında "çökmüş" görünmez), hatta 404 status kodu da doğrudur — ama gövdenin ŞEKLİ projenin beklediğinden farklıdır. Bir tester sadece status kodunu kontrol ediyorsa bu farkı HİÇ fark etmez.\n\n**Tester nerede yakalar:** Hata gövdesinin TAM ŞEKLİNİ (`error` alanının varlığını, `statusCode`/`message` gibi fazladan alanların olup olmadığını) doğrulayan bir assertion yazınca — sadece "404 mü?" diye sormak yetersizdir, "gövde SÖZLEŞMEYE uyuyor mu?" sorusu şarttır.',
        en: '**🐞 Defect Birth — if `app.useGlobalFilters(...)` is forgotten**\n\n**Code:** the `HttpExceptionFilter` class was written FLAWLESSLY with `@Catch(HttpException)`, `{ error: exception.message }` matches the contract exactly — but `main.ts` has no `app.useGlobalFilters(new HttpExceptionFilter())` call.\n\n**What happens:** for a `GET /api/v1/bugs/999` request, `throw new NotFoundException(...)` runs, but since the custom filter is not registered, Nest falls back to its own DEFAULT exception handler — this also returns JSON, but instead of the project contract\'s `{ error: "..." }`, it returns Nest\'s own shape: `{ statusCode: 404, message: "...", error: "Not Found" }`.\n\n**Why sneaky:** the request still returns JSON (unlike Express\'s HTML surprise, the server does not look "crashed"), even the 404 status code is correct — but the body\'s SHAPE differs from what the project expects. A tester checking only the status code never notices this at all.\n\n**Where the tester catches it:** writing an assertion that verifies the EXACT SHAPE of the error body (the presence of the `error` field, whether extra fields like `statusCode`/`message` exist) — asking only "is it 404?" is insufficient, the question "does the body MATCH THE CONTRACT?" is mandatory.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-d4-exception-filter-film',
      title: { tr: '🎬 Doğru Filter, Kayıtsız — Yanlış Şekilli JSON', en: '🎬 Correct Filter, Unregistered — the Wrong JSON Shape' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'throw', emoji: '🚨', label: { tr: 'throw new NotFoundException()', en: 'throw new NotFoundException()' }, color: '#f59e0b' },
        { id: 'custom', emoji: '🧱', label: { tr: 'Özel filter: { error }', en: 'Custom filter: { error }' }, color: '#22c55e' },
        { id: 'default', emoji: '📐', label: { tr: 'Nest varsayılanı: farklı şekil', en: 'Nest default: different shape' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Gövde şekli sözleşmeye uymuyor', en: 'Body shape does not match the contract' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Servis katmanında `throw new NotFoundException(\'Bug bulunamadi\')` çalışıyor — bir hata fırlatıldı.', en: 'In the service layer, `throw new NotFoundException(\'Bug not found\')` runs — an error is thrown.' },
          positions: { throw: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'DOĞRU KURULUMDA: `@Catch(HttpException)` filtresi KAYITLIYSA hatayı yakalar, proje sözleşmesine uygun `{ error }` gövdesi döner.', en: 'IN THE CORRECT SETUP: if the `@Catch(HttpException)` filter is REGISTERED, it catches the error and returns a `{ error }` body matching the project contract.' },
          positions: { throw: { x: 20, y: 35 }, custom: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'throw', to: 'custom', color: '#22c55e' }],
        },
        {
          caption: { tr: 'YANLIŞ KURULUMDA: `useGlobalFilters` çağrılmadıysa Nest kendi VARSAYILAN işleyicisine düşer.', en: 'IN THE WRONG SETUP: if `useGlobalFilters` was never called, Nest falls back to its own DEFAULT handler.' },
          positions: { throw: { x: 20, y: 60 }, default: { x: 58, y: 65, scale: 1.15, pulse: true } },
          beams: [{ from: 'throw', to: 'default', color: '#ef4444' }],
        },
        {
          caption: { tr: 'İkisi de JSON döner, ikisi de 404 status kodu taşır — ama GÖVDENİN ŞEKLİ farklıdır: `{ error }` mi, `{ statusCode, message, error }` mı?', en: 'Both return JSON, both carry a 404 status code — but the BODY SHAPE differs: `{ error }` or `{ statusCode, message, error }`?' },
          positions: { custom: { x: 30, y: 40 }, default: { x: 30, y: 65 }, tester: { x: 65, y: 52, scale: 1.15, pulse: true } },
          beams: [{ from: 'custom', to: 'tester', color: '#8b5cf6' }, { from: 'default', to: 'tester', color: '#8b5cf6' }],
        },
        {
          caption: { tr: 'Ders — "404 döndü" doğrulaması yeterli değildir. Tester gövdenin TAM ŞEKLİNİ, sözleşmedeki alan adlarını doğrulamalıdır.', en: 'The lesson — verifying "it returned 404" is not enough. A tester must verify the body\'s EXACT SHAPE, the field names in the contract.' },
          positions: { tester: { x: 45, y: 48, scale: 1.15, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Fırlatılan Hatadan Sözleşmeye Uygun Gövdeye', en: 'From a Thrown Error to a Contract-Compliant Body' },
      steps: [
        { id: 1, icon: '🚨', label: { tr: 'Hata fırlat…', en: 'Throw the error…' }, detail: { tr: 'Servis katmanı throw new NotFoundException(...) ile iş kuralını ihlal eden durumu bildirir.', en: 'The service layer reports the rule-violating case with throw new NotFoundException(...).' } },
        { id: 2, icon: '🧱', label: { tr: 'Filter yakalasın…', en: 'Let the filter catch it…' }, detail: { tr: '@Catch(HttpException) ile işaretli sınıf bu tip hataları yakalamaya adaydır.', en: 'The class marked with @Catch(HttpException) is a candidate to catch this error type.' } },
        { id: 3, icon: '🌐', label: { tr: 'Global kaydet…', en: 'Register it globally…' }, detail: { tr: 'app.useGlobalFilters(...) olmadan filter asla devreye girmez, Nest\'in varsayılan şekli döner.', en: 'Without app.useGlobalFilters(...) the filter never engages, Nest\'s default shape is returned instead.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-d4-order-01',
      question: { tr: 'Nest\'te özel bir hata gövdesinin gerçekten dönmesi için sırayı diz.', en: 'Order the steps for a custom error body to actually be returned in Nest.' },
      items: [
        { id: '1', text: { tr: 'Servis katmanında throw new NotFoundException(...) çağır', en: 'Call throw new NotFoundException(...) in the service layer' }, order: 1 },
        { id: '2', text: { tr: '@Catch(HttpException) ile filter sınıfını yaz', en: 'Write the filter class with @Catch(HttpException)' }, order: 2 },
        { id: '3', text: { tr: 'main.ts\'te app.useGlobalFilters(new HttpExceptionFilter()) ekle', en: 'Add app.useGlobalFilters(new HttpExceptionFilter()) in main.ts' }, order: 3 },
        { id: '4', text: { tr: 'Nest artık hatayı ÖZEL filtreye yönlendirir', en: 'Nest now routes the error to the CUSTOM filter' }, order: 4 },
        { id: '5', text: { tr: 'Sözleşmeye uygun { error } gövdesiyle yanıt döner', en: 'A contract-compliant { error } body is returned' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d4-filter',
      id: 'api-d4-filter',
      title: { tr: 'Kendin Dene: Filtreyi Global Olarak Kaydet', en: 'Try It Yourself: Register the Filter Globally' },
      starterCode: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'

// BUG: filter yazildi ama hicbir yerde kayitli degil
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()`,
      solutionCode: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
bootstrap()`,
      hint: { tr: '`@Catch(HttpException)` ile işaretli bir sınıf yazmak onu OTOMATİK devreye sokmaz. Nest\'in bu filtreyi her hata için kullanması için `app.useGlobalFilters(...)` ile AÇIKÇA kaydedilmesi gerekir.', en: 'Writing a class marked with `@Catch(HttpException)` does not AUTOMATICALLY activate it. For Nest to use this filter on every error, it must be EXPLICITLY registered with `app.useGlobalFilters(...)`.' },
      successMessage: { tr: 'Doğru! Artık tüm HttpException hataları sözleşmeye uygun { error } gövdesiyle döner.', en: 'Correct! Now every HttpException error returns with the contract-compliant { error } body.' },
    },
    {
      type: 'quiz',
      question: { tr: '`@Catch(HttpException)` ile yazılmış bir filter, `app.useGlobalFilters(...)` ile kaydedilmezse ne olur?', en: 'What happens to a filter written with `@Catch(HttpException)` if it is never registered with `app.useGlobalFilters(...)`?' },
      options: [
        { id: 'a', text: { tr: 'Nest bunu otomatik olarak tarayıp bulur', en: 'Nest automatically scans and finds it' } },
        { id: 'b', text: { tr: 'Filter hiç devreye girmez; hatalar Nest\'in varsayılan (farklı şekilli) hata gövdesiyle döner', en: 'The filter never engages; errors return with Nest\'s default (differently shaped) error body' } },
        { id: 'c', text: { tr: 'Uygulama başlamayı reddeder', en: 'The application refuses to start' } },
        { id: 'd', text: { tr: 'Filter sadece POST isteklerinde çalışır', en: 'The filter only works on POST requests' } },
      ],
      correct: 'b',
      explanation: { tr: 'Bir Exception Filter sınıfının VAR OLMASI onu otomatik devreye sokmaz — `app.useGlobalFilters(...)` (veya controller/method seviyesinde `@UseFilters(...)`) ile AÇIKÇA bağlanması gerekir. Kayıtsız bir filter hiçbir zaman çalışmaz, Nest kendi varsayılan hata gövdesini döner — bu, projenin beklediği sözleşmeden farklı olabilir.', en: 'A filter class EXISTING does not automatically activate it — it must be EXPLICITLY wired with `app.useGlobalFilters(...)` (or `@UseFilters(...)` at the controller/method level). An unregistered filter never runs, Nest returns its own default error body — which may differ from what the project\'s contract expects.' },
      retryQuestion: {
        question: { tr: 'Nest\'teki `@Catch(HttpException)` decorator\'ının Spring\'deki en yakın karşılığı nedir?', en: 'What is the closest Spring equivalent of the `@Catch(HttpException)` decorator in Nest?' },
        options: [
          { id: 'a', text: { tr: '@ExceptionHandler(SomeException.class) — hangi exception tipinin yakalanacağını bildirir', en: '@ExceptionHandler(SomeException.class) — declares which exception type is caught' } },
          { id: 'b', text: { tr: '@Entity', en: '@Entity' } },
          { id: 'c', text: { tr: '@Autowired', en: '@Autowired' } },
          { id: 'd', text: { tr: '@Component', en: '@Component' } },
        ],
        correct: 'a',
        explanation: { tr: 'Her ikisi de "bu sınıf/metot, şu exception TİPİNİ yakalasın" bildirimidir — Spring\'de `@RestControllerAdvice` içindeki `@ExceptionHandler`, Nest\'te `@Catch()` ile işaretli bir `ExceptionFilter` sınıfı olarak karşılık bulur.', en: 'Both are declarations of "this class/method catches this exception TYPE" — Spring\'s `@ExceptionHandler` inside `@RestControllerAdvice` finds its counterpart in an `ExceptionFilter` class marked with `@Catch()` in Nest.' },
      },
    },
  ],
}

const D5 = {
  title: { tr: '🔀 D5 · NestJS ↔ Spring Boot Karşılaştırması', en: '🔀 D5 · NestJS ↔ Spring Boot Comparison' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔀',
      content: {
        tr: 'D1-D4\'ü bitirdikten sonra bir Java geliştiricisi şunu fark eder: Nest, Express\'in aksine, Spring\'in **neredeyse doğrudan TypeScript çevirisidir** — `@Module` ≈ `@Configuration`, `@Controller`/`@Get` ≈ `@RestController`/`@GetMapping`, DTO+`class-validator`+`ValidationPipe` ≈ Bean Validation+`@Valid`, Exception Filter ≈ `@RestControllerAdvice`, constructor injection ≈ Spring\'in DI\'ı. Peki üç framework\'ü de gördükten sonra hangi soruyu sormalısın? "Hangisi daha iyi" değil — **"bu projenin ekibi ve ölçeği için hangi disiplin seviyesi doğru"** sorusunu. Küçük bir mikroservis/prototip için Express\'in özgürlüğü hıza dönüşür; büyük, çok kişili bir takımda Nest\'in (ve Spring\'in) dayattığı yapı, "herkes aynı yerde arasın" tutarlılığı sağlar — bu, C6\'daki "hangi hatanın kimin sorumluluğunda olduğu" sorusunun doğal devamıdır. Bir Java geliştiricisi için pratik sonuç: Nest\'e geçiş, Express\'e geçişten çok daha az "zihniyet değişikliği" gerektirir çünkü sınıflar, decorator\'lar ve DI zaten TANIDIK kavramlardır — ama her ikisinde de gördüğün gibi, "decorator/annotation YAZMAK" ile "o decorator/annotation\'ın GERÇEKTEN devrede olması" (global pipe/filter kaydı, modül kaydı) arasındaki fark, testerin asıl doğrulaması gereken şeydir.',
        en: 'After finishing D1-D4 a Java developer notices: unlike Express, Nest is an **almost direct TypeScript translation** of Spring — `@Module` ≈ `@Configuration`, `@Controller`/`@Get` ≈ `@RestController`/`@GetMapping`, DTO+`class-validator`+`ValidationPipe` ≈ Bean Validation+`@Valid`, Exception Filter ≈ `@RestControllerAdvice`, constructor injection ≈ Spring\'s DI. After seeing all three frameworks, which question should you ask? Not "which is better" — but **"which discipline level is right for this project\'s team and scale"**. For a small microservice/prototype, Express\'s freedom turns into speed; in a large, multi-person team, the structure Nest (and Spring) impose provides "everyone looks in the same place" consistency — this is the natural continuation of C6\'s "whose responsibility is this bug" question. The practical takeaway for a Java developer: moving to Nest requires far less "mindset shift" than moving to Express because classes, decorators, and DI are already FAMILIAR concepts — but as you saw in both, the gap between "WRITING a decorator/annotation" and that decorator/annotation being "REALLY active" (global pipe/filter registration, module registration) is exactly what a tester must verify.',
      },
    },
    { type: 'heading', text: { tr: 'Üç Framework, Aynı Sözleşme (Tekrar)', en: 'Three Frameworks, One Contract (Again)' } },
    {
      type: 'table',
      headers: ['Konu / Topic', 'Spring Boot (Java)', 'Express.js', 'NestJS'],
      rows: [
        ['Route tanımı / Route definition', '@GetMapping("/bugs")', "app.get('/bugs', handler)", '@Get()'],
        ['Body okuma / Reading body', '@RequestBody BugRequest req', 'req.body (express.json() şart)', '@Body() dto: CreateBugDto'],
        ['Validation', '@Valid + Bean Validation', 'express-validator / zod (elle okunur)', 'ValidationPipe + class-validator'],
        ['Hata yönetimi / Error handling', '@RestControllerAdvice', '4 parametreli (err,req,res,next)', '@Catch() Exception Filter'],
        ['DI (bağımlılık enjeksiyonu)', 'Spring IoC container', 'manuel / factory fonksiyon', 'Nest IoC container'],
        ['Modül/kayıt kaygısı / Registration', 'Component scan otomatik', 'Yok — dosya import edilince aktif', '@Module dizisine EKLENMEZSE controller yok sayılır'],
        ['En sık sessiz hata / Most common silent bug', 'Eksik starter/annotation', 'Yanlış middleware sırası', 'Unutulan global pipe/filter/modül kaydı'],
      ],
    },
    {
      type: 'video-scene',
      id: 'api-d5-compare-film',
      title: { tr: '🎬 Java Geliştiricisi Nest\'te Evinde Hissediyor', en: '🎬 A Java Developer Feels at Home in Nest' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'java', emoji: '☕', label: { tr: 'Spring: @Controller/@Service', en: 'Spring: @Controller/@Service' }, color: '#22c55e' },
        { id: 'nest', emoji: '🐈', label: { tr: 'Nest: @Controller/@Injectable', en: 'Nest: @Controller/@Injectable' }, color: '#a78bfa' },
        { id: 'express', emoji: '🟢', label: { tr: 'Express: fonksiyon zinciri', en: 'Express: function chain' }, color: '#0ea5e9' },
        { id: 'gap', emoji: '📏', label: { tr: 'Zihniyet mesafesi', en: 'Mindset distance' }, color: '#f59e0b' },
        { id: 'tester', emoji: '🕵️', label: { tr: '"Kayıtlı mı?" her zaman sorulur', en: '"Is it registered?" is always asked' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir Java geliştiricisi Spring\'deki `@Controller`, `@Service`, `@Valid` kavramlarına zaten alışkındır.', en: 'A Java developer is already used to Spring\'s `@Controller`, `@Service`, `@Valid` concepts.' },
          positions: { java: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Nest\'e geçince AYNI kavramları decorator adlarıyla görür — `@Controller`, `@Injectable`, `@Body()` — zihniyet mesafesi ÇOK KISADIR.', en: 'Moving to Nest, they see the SAME concepts under decorator names — `@Controller`, `@Injectable`, `@Body()` — the mindset distance is VERY SHORT.' },
          positions: { java: { x: 20, y: 35 }, nest: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'java', to: 'nest', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Express\'e geçince ise "her şeyi elle kur" felsefesiyle karşılaşır — zihniyet mesafesi DAHA UZUNDUR (middleware sırası, elle okunan validation).', en: 'Moving to Express, they meet the "build everything by hand" philosophy — the mindset distance is LONGER (middleware order, manually read validation).' },
          positions: { java: { x: 20, y: 65 }, express: { x: 58, y: 65, scale: 1.15, pulse: true } },
          beams: [{ from: 'java', to: 'express', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Ama HER üç framework\'te de tekrar eden bir örüntü var: "yazmak" ile "gerçekten devrede olmak" arasında bir boşluk.', en: 'But there is a repeating pattern across ALL three frameworks: a gap between "writing" and "really being active".' },
          positions: { nest: { x: 30, y: 40 }, express: { x: 30, y: 60 }, gap: { x: 62, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'nest', to: 'gap', color: '#f59e0b' }, { from: 'express', to: 'gap', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Ders — Framework ne olursa olsun tester her zaman "bu güvenlik/kural GERÇEKTEN kayıtlı/tetikleniyor mu?" diye sorar; sözdizimine değil, DAVRANIŞA güvenir.', en: 'The lesson — regardless of framework, a tester always asks "is this safeguard/rule REALLY registered/triggered?"; they trust BEHAVIOR, not syntax.' },
          positions: { gap: { x: 40, y: 45 }, tester: { x: 68, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'gap', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Üç Frameworkte "Kayıt" Kavramını Karşılaştır', en: 'Comparing the "Registration" Concept Across Three Frameworks' },
      steps: [
        { id: 1, icon: '☕', label: { tr: 'Spring: otomatik…', en: 'Spring: automatic…' }, detail: { tr: 'Component scan sınıfları otomatik bulur — genelde elle bir diziye eklemen gerekmez.', en: 'Component scan finds classes automatically — you usually do not need to add them to an array by hand.' } },
        { id: 2, icon: '🐈', label: { tr: 'Nest: elle ama açık…', en: 'Nest: manual but explicit…' }, detail: { tr: '@Module({ controllers, providers }) dizisine EKLEMEK zorunludur — unutulursa sınıf yok sayılır.', en: '@Module({ controllers, providers }) requires EXPLICIT addition to the array — if forgotten, the class is ignored.' } },
        { id: 3, icon: '🟢', label: { tr: 'Express: kayıt yok, sıra var…', en: 'Express: no registration, but order…' }, detail: { tr: 'Ayrı bir "kayıt" kavramı yoktur, ama middleware/route SIRASI davranışı belirler.', en: 'There is no separate "registration" concept, but middleware/route ORDER determines behavior.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-d5-order-01',
      question: { tr: 'Üç frameworkü "opinionated" seviyesine göre en AZDAN en ÇOKA sırala.', en: 'Order the three frameworks from LEAST to MOST "opinionated".' },
      items: [
        { id: '1', text: { tr: 'Express — un-opinionated, her karar elle verilir', en: 'Express — un-opinionated, every decision is made by hand' }, order: 1 },
        { id: '2', text: { tr: 'NestJS — decorator/modül disiplini dayatır ama açık kayıt gerektirir', en: 'NestJS — imposes decorator/module discipline but requires explicit registration' }, order: 2 },
        { id: '3', text: { tr: 'Spring Boot — component scan + starter ile en otomatik seviye', en: 'Spring Boot — the most automatic level with component scan + starters' }, order: 3 },
      ],
      xpReward: 12,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d5-compare',
      id: 'api-d5-compare',
      title: { tr: 'Kendin Dene: Spring Annotation\'ını Nest Decorator\'ına Çevir', en: 'Try It Yourself: Translate the Spring Annotation to a Nest Decorator' },
      starterCode: `// Spring Boot (Java):
// @RestControllerAdvice
// public class GlobalExceptionHandler {
//   @ExceptionHandler(NotFoundException.class)
//   public ResponseEntity<?> handle(NotFoundException ex) { ... }
// }

// TODO: ayni isi yapan Nest yapisinin decorator'larini yaz
`,
      solutionCode: `// NestJS (TypeScript):
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // ...
  }
}
// main.ts: app.useGlobalFilters(new HttpExceptionFilter())`,
      hint: { tr: 'Spring\'de `@RestControllerAdvice` + `@ExceptionHandler` bir sınıfın hangi exception TİPİNİ yakalayacağını bildirir; Nest\'te aynı bildirim `@Catch(HttpException)` ile yapılır — ama unutma, Nest\'te ayrıca `app.useGlobalFilters(...)` ile KAYIT şarttır.', en: 'In Spring, `@RestControllerAdvice` + `@ExceptionHandler` declares which exception TYPE a class catches; in Nest the same declaration is made with `@Catch(HttpException)` — but remember, in Nest REGISTRATION with `app.useGlobalFilters(...)` is also mandatory.' },
      successMessage: { tr: 'Doğru! İki framework de aynı "merkezi hata yönetimi" fikrini taşıyor, sadece kayıt adımı farklı.', en: 'Correct! Both frameworks carry the same "centralized error handling" idea, only the registration step differs.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Nest\'in Spring\'e en çok benzediği alan hangisidir?', en: 'In which area does Nest resemble Spring the most?' },
      options: [
        { id: 'a', text: { tr: 'Decorator tabanlı yapı ve DI container — sınıflar, annotation/decorator\'lar ve constructor injection ile bağlanır', en: 'The decorator-based structure and DI container — classes are wired together via annotations/decorators and constructor injection' } },
        { id: 'b', text: { tr: 'İkisi de aynı programlama dilini kullanır', en: 'Both use the same programming language' } },
        { id: 'c', text: { tr: 'İkisi de veritabanı sürücüsü içerir', en: 'Both bundle a database driver' } },
        { id: 'd', text: { tr: 'Hiçbir ortak yönleri yoktur', en: 'They have nothing in common' } },
      ],
      correct: 'a',
      explanation: { tr: 'Nest, Spring\'in decorator/annotation tabanlı mimarisini (Controller/Service/Module ayrımı, DI container, constructor injection) TypeScript\'e neredeyse birebir taşır. Bu yüzden bir Java/Spring geliştiricisi Nest\'e geçişte Express\'e göre çok daha az kavramsal fark yaşar.', en: 'Nest carries Spring\'s decorator/annotation-based architecture (Controller/Service/Module separation, DI container, constructor injection) into TypeScript almost one-to-one. This is why a Java/Spring developer experiences far less conceptual difference moving to Nest than moving to Express.' },
      retryQuestion: {
        question: { tr: 'Üç frameworkte de ortak olan, testerin HER ZAMAN sorması gereken soru nedir?', en: 'What is the common question, present in all three frameworks, that a tester must ALWAYS ask?' },
        options: [
          { id: 'a', text: { tr: 'Bu güvenlik/kural (validation, hata yönetimi) koddan GÖRÜNSE bile GERÇEKTEN devrede mi?', en: 'Even if this safeguard/rule (validation, error handling) is VISIBLE in the code, is it REALLY active?' } },
          { id: 'b', text: { tr: 'Hangi framework daha hızlı derleniyor?', en: 'Which framework compiles faster?' } },
          { id: 'c', text: { tr: 'Hangi framework daha az dosya kullanıyor?', en: 'Which framework uses fewer files?' } },
          { id: 'd', text: { tr: 'Hangi framework daha eski?', en: 'Which framework is older?' } },
        ],
        correct: 'a',
        explanation: { tr: 'B1 (eksik starter), C3-C5 (yanlış middleware sırası), D1-D4 (kayıtsız controller/pipe/filter) — hepsi AYNI köke iner: doğru görünen kod, framework tarafından GERÇEKTEN devreye alınmadıkça hiçbir şey garanti etmez. Bu yüzden tester her zaman gerçek bir istekle davranışı doğrular, kod incelemesiyle yetinmez.', en: 'B1 (missing starter), C3-C5 (wrong middleware order), D1-D4 (unregistered controller/pipe/filter) — all trace back to the SAME root: code that looks correct guarantees nothing until it is REALLY activated by the framework. This is why a tester always verifies behavior with a real request, never settling for a code review alone.' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP E — DevTools Network: Tarayıcıda API'yi Görmek (KODSUZ konu şablonu)
// Inline SVG diyagramlar sadece teknik terim/sayı kullanır (dış görsel yok, §8)
// ═══════════════════════════════════════════════════════════════════════════

const networkPanelSvg = `<svg viewBox='0 0 680 190' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <text x='20' y='30' fill='#94a3b8' font-size='12' font-weight='bold'>Name</text>
  <text x='260' y='30' fill='#94a3b8' font-size='12' font-weight='bold'>Status</text>
  <text x='360' y='30' fill='#94a3b8' font-size='12' font-weight='bold'>Type</text>
  <text x='450' y='30' fill='#94a3b8' font-size='12' font-weight='bold'>Size</text>
  <text x='560' y='30' fill='#94a3b8' font-size='12' font-weight='bold'>Time</text>
  <line x1='20' y1='42' x2='660' y2='42' stroke='#374151' stroke-width='1'/>
  <rect x='16' y='52' width='648' height='34' rx='6' fill='#1a2e22'/>
  <text x='24' y='74' fill='#e5e7eb' font-size='12' font-family='monospace'>bugs?status=OPEN</text>
  <text x='260' y='74' fill='#4ade80' font-size='12' font-weight='bold'>200</text>
  <text x='360' y='74' fill='#e5e7eb' font-size='12'>fetch</text>
  <text x='450' y='74' fill='#e5e7eb' font-size='12'>1.2 kB</text>
  <text x='560' y='74' fill='#e5e7eb' font-size='12'>84 ms</text>
  <rect x='16' y='94' width='648' height='34' rx='6' fill='#3a1a1a'/>
  <text x='24' y='116' fill='#e5e7eb' font-size='12' font-family='monospace'>bugs (POST)</text>
  <text x='260' y='116' fill='#f87171' font-size='12' font-weight='bold'>500</text>
  <text x='360' y='116' fill='#e5e7eb' font-size='12'>fetch</text>
  <text x='450' y='116' fill='#e5e7eb' font-size='12'>0.3 kB</text>
  <text x='560' y='116' fill='#e5e7eb' font-size='12'>612 ms</text>
  <rect x='16' y='136' width='648' height='34' rx='6' fill='#242640'/>
  <text x='24' y='158' fill='#94a3b8' font-size='12' font-family='monospace'>logo.svg</text>
  <text x='260' y='158' fill='#4ade80' font-size='12' font-weight='bold'>200</text>
  <text x='360' y='158' fill='#94a3b8' font-size='12'>img</text>
  <text x='450' y='158' fill='#94a3b8' font-size='12'>4.1 kB</text>
  <text x='560' y='158' fill='#94a3b8' font-size='12'>9 ms</text>
</svg>`

const fetchXhrFilterSvg = `<svg viewBox='0 0 680 190' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <text x='20' y='26' fill='#94a3b8' font-size='12' font-weight='bold'>Filtresiz (All)</text>
  <rect x='16' y='34' width='140' height='24' rx='5' fill='#2a2c45'/><text x='24' y='50' fill='#94a3b8' font-size='11'>logo.svg (img)</text>
  <rect x='16' y='62' width='140' height='24' rx='5' fill='#2a2c45'/><text x='24' y='78' fill='#94a3b8' font-size='11'>style.css</text>
  <rect x='16' y='90' width='140' height='24' rx='5' fill='#1a2e22'/><text x='24' y='106' fill='#e5e7eb' font-size='11'>bugs (fetch)</text>
  <rect x='16' y='118' width='140' height='24' rx='5' fill='#2a2c45'/><text x='24' y='134' fill='#94a3b8' font-size='11'>font.woff2</text>
  <path d='M 180 90 L 260 90' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrow)'/>
  <defs><marker id='arrow' markerWidth='8' markerHeight='8' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 z' fill='#f59e0b'/></marker></defs>
  <text x='210' y='60' fill='#f59e0b' font-size='11' font-weight='bold'>Fetch/XHR</text>
  <text x='300' y='26' fill='#94a3b8' font-size='12' font-weight='bold'>Filtreli</text>
  <rect x='300' y='80' width='340' height='30' rx='6' fill='#1a2e22'/>
  <text x='312' y='100' fill='#4ade80' font-size='12' font-family='monospace'>GET /api/v1/bugs?status=OPEN</text>
</svg>`

const requestTabsSvg = `<svg viewBox='0 0 680 170' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <rect x='16' y='16' width='120' height='30' rx='6' fill='#2a2c45'/><text x='30' y='36' fill='#94a3b8' font-size='12'>Headers</text>
  <rect x='144' y='16' width='120' height='30' rx='6' fill='#2a2c45'/><text x='158' y='36' fill='#94a3b8' font-size='12'>Payload</text>
  <rect x='272' y='16' width='120' height='30' rx='6' fill='#3b3220'/><text x='286' y='36' fill='#f59e0b' font-size='12' font-weight='bold'>Preview</text>
  <rect x='400' y='16' width='120' height='30' rx='6' fill='#2a2c45'/><text x='414' y='36' fill='#94a3b8' font-size='12'>Response</text>
  <rect x='528' y='16' width='136' height='30' rx='6' fill='#2a2c45'/><text x='542' y='36' fill='#94a3b8' font-size='12'>Timing</text>
  <rect x='16' y='58' width='648' height='96' rx='8' fill='#141522'/>
  <text x='32' y='82' fill='#e5e7eb' font-size='12' font-family='monospace'>{</text>
  <text x='48' y='102' fill='#a78bfa' font-size='12' font-family='monospace'>title: "Login butonu donuyor",</text>
  <text x='48' y='122' fill='#a78bfa' font-size='12' font-family='monospace'>severity: "HIGH"</text>
  <text x='32' y='142' fill='#e5e7eb' font-size='12' font-family='monospace'>}</text>
</svg>`

const timingBarSvg = `<svg viewBox='0 0 680 150' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <text x='20' y='28' fill='#94a3b8' font-size='12' font-weight='bold'>Timing — GET /api/v1/bugs/42</text>
  <rect x='20' y='44' width='60' height='28' rx='4' fill='#a78bfa'/><text x='26' y='63' fill='#1e2030' font-size='11' font-weight='bold'>TTFB</text>
  <rect x='80' y='44' width='420' height='28' fill='#f59e0b'/><text x='240' y='63' fill='#1e2030' font-size='11' font-weight='bold'>Waiting (server)</text>
  <rect x='500' y='44' width='40' height='28' rx='4' fill='#22c55e'/><text x='503' y='63' fill='#1e2030' font-size='10' font-weight='bold'>DL</text>
  <text x='20' y='100' fill='#e5e7eb' font-size='12'>TTFB: 0.1s</text>
  <text x='220' y='100' fill='#e5e7eb' font-size='12'>Waiting: 2.7s</text>
  <text x='500' y='100' fill='#e5e7eb' font-size='12'>Content Download: 0.1s</text>
  <text x='20' y='128' fill='#f59e0b' font-size='12' font-weight='bold'>Toplam 2.9s icinde en buyuk pay Waiting -> suclu SUNUCU, ag degil</text>
</svg>`

const silentBugSvg = `<svg viewBox='0 0 680 170' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <text x='20' y='28' fill='#94a3b8' font-size='12' font-weight='bold'>UI</text>
  <rect x='16' y='36' width='300' height='60' rx='8' fill='#142314'/>
  <text x='36' y='72' fill='#4ade80' font-size='14' font-weight='bold'>✔ "Bug basariyla olusturuldu"</text>
  <text x='360' y='28' fill='#94a3b8' font-size='12' font-weight='bold'>Network</text>
  <rect x='356' y='36' width='308' height='60' rx='8' fill='#3a1a1a'/>
  <text x='372' y='60' fill='#f87171' font-size='13' font-family='monospace'>POST /api/v1/bugs</text>
  <text x='372' y='82' fill='#f87171' font-size='16' font-weight='bold'>500 Internal Server Error</text>
  <path d='M 320 66 L 352 66' stroke='#ef4444' stroke-width='2' stroke-dasharray='4 3'/>
  <text x='120' y='130' fill='#f59e0b' font-size='12' font-weight='bold'>UI hata GOSTERMIYOR — sadece Network satiri gercegi soyluyor</text>
</svg>`

const curlImportFlowSvg = `<svg viewBox='0 0 680 150' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <rect x='16' y='50' width='150' height='50' rx='8' fill='#242640'/><text x='34' y='80' fill='#e5e7eb' font-size='12'>Network satırı</text>
  <path d='M 172 75 L 220 75' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrow2)'/>
  <defs><marker id='arrow2' markerWidth='8' markerHeight='8' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 z' fill='#f59e0b'/></marker></defs>
  <rect x='224' y='50' width='190' height='50' rx='8' fill='#1a2e22'/><text x='240' y='72' fill='#4ade80' font-size='11' font-family='monospace'>curl -X POST \\</text><text x='240' y='88' fill='#4ade80' font-size='11' font-family='monospace'>  '/api/v1/bugs' ...</text>
  <path d='M 418 75 L 466 75' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrow2)'/>
  <rect x='470' y='50' width='194' height='50' rx='8' fill='#242640'/><text x='488' y='80' fill='#e5e7eb' font-size='12'>Postman → Import</text>
</svg>`

const E1 = {
  title: { tr: '🔍 E1 · Network Paneli Anatomisi', en: '🔍 E1 · Network Panel Anatomy' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔍',
      content: {
        tr: 'DevTools Network paneli, bir **hava trafik kontrol kulesinin radar ekranı** gibidir: her uçuş (istek) ekranda bir satır olarak belirir — nereye gittiği (Name), inişinin başarılı olup olmadığı (Status), ne taşıdığı (Type), ne kadar yer kapladığı (Size) ve ne kadar sürdüğü (Time) tek bakışta görünür. Peki Postman zaten varken, tarayıcının kendi radarına neden bakıyoruz? Çünkü Postman SEN isteği gönderdiğinde çalışır — ama gerçek kullanıcı deneyiminde istekler UI\'nın kendisi (JavaScript) tarafından, senin haberin olmadan tetiklenir; Network paneli UI\'nın ARKASINDA gerçekten ne olduğunu gösteren TEK yerdir. Java\'da bunun en yakın karşılığı bir `HttpClient` loglama interceptor\'ıdır — `OkHttp`\'nin `HttpLoggingInterceptor`\'ı gibi, her giden isteği ve gelen yanıtı konsola yazar; DevTools Network de tarayıcının GUI\'li, otomatik interceptor\'ıdır. QA açısından bu panel, kariyerinin en sık kullanacağın araçlarından biri olur çünkü şu senaryoyu SIK yaşarsın: ekranda her şey normal görünür, buton "Başarılı!" der — ama Network panelini açtığında kırmızı bir 500 satırı seni bekliyordur. UI seni yanıltabilir, Network paneli yanıltmaz.',
        en: 'The DevTools Network panel is like an **air traffic control tower\'s radar screen**: every flight (request) appears as a row on screen — where it is going (Name), whether it landed successfully (Status), what it is carrying (Type), how much space it takes (Size), and how long it took (Time) are all visible at a glance. So if Postman already exists, why look at the browser\'s own radar? Because Postman runs when YOU send the request — but in a real user experience, requests are triggered by the UI itself (JavaScript), without you knowing; the Network panel is the ONLY place that shows what REALLY happens BEHIND the UI. The closest Java equivalent is an `HttpClient` logging interceptor — like OkHttp\'s `HttpLoggingInterceptor`, which writes every outgoing request and incoming response to the console; DevTools Network is the browser\'s GUI-based, automatic interceptor. For QA this panel becomes one of the most-used tools in your career because you WILL repeatedly face this scenario: everything looks normal on screen, the button says "Success!" — but opening the Network panel, a red 500 row is waiting for you. The UI can mislead you, the Network panel does not.',
      },
    },
    { type: 'heading', text: { tr: 'Beş Sütun: Tek Bakışta Bir İsteğin Özeti', en: 'Five Columns: A Request\'s Summary at a Glance' } },
    {
      type: 'text',
      content: {
        tr: 'Her satır bir HTTP isteğidir. **Name** yolu/dosya adını, **Status** sunucunun cevabını (200/404/500...), **Type** isteğin türünü (`fetch`/`xhr`/`img`/`css`), **Size** yanıtın boyutunu, **Time** ne kadar sürdüğünü gösterir. `/api/v1/bugs` gibi bir API isteği genelde `fetch` veya `xhr` tipindedir — bu, E2\'de kullanacağın filtrenin temelidir.',
        en: 'Each row is one HTTP request. **Name** shows the path/filename, **Status** the server\'s answer (200/404/500...), **Type** the request kind (`fetch`/`xhr`/`img`/`css`), **Size** the response size, **Time** how long it took. An API request like `/api/v1/bugs` is usually of type `fetch` or `xhr` — this is the basis of the filter you will use in E2.',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Network Paneli — Sütunlar ve Örnek Satırlar', en: 'Network Panel — Columns and Sample Rows' },
      svg: networkPanelSvg,
    },
    {
      type: 'video-scene',
      id: 'api-e1-panel-film',
      title: { tr: '🎬 Bir İstek Network Panelinde Nasıl Belirir?', en: '🎬 How a Request Appears in the Network Panel' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'click', emoji: '🖱️', label: { tr: 'Kullanıcı tıklar', en: 'User clicks' }, color: '#f59e0b' },
        { id: 'js', emoji: '⚙️', label: { tr: 'JS fetch() çağırır', en: 'JS calls fetch()' }, color: '#0ea5e9' },
        { id: 'panel', emoji: '📡', label: { tr: 'Network paneli satır ekler', en: 'Network panel adds a row' }, color: '#a78bfa' },
        { id: 'status', emoji: '🟢', label: { tr: 'Status/Time dolar', en: 'Status/Time fill in' }, color: '#22c55e' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Tester satırı inceler', en: 'Tester inspects the row' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Kullanıcı (veya tester) "Bugları Yenile" butonuna tıklar.', en: 'The user (or tester) clicks "Refresh Bugs".' },
          positions: { click: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Buton arkasındaki JavaScript kodu `fetch(\'/api/v1/bugs\')` çağırır — bu, DevTools\'un YAKALAYACAĞI andır.', en: 'The JavaScript behind the button calls `fetch(\'/api/v1/bugs\')` — this is the moment DevTools CAPTURES.' },
          positions: { click: { x: 20, y: 40 }, js: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'click', to: 'js', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Network paneli anında yeni bir satır ekler — Name doludur ama Status/Size/Time henüz "bekliyor" görünür.', en: 'The Network panel instantly adds a new row — Name is filled but Status/Size/Time still look "pending".' },
          positions: { js: { x: 20, y: 40 }, panel: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'js', to: 'panel', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Sunucudan yanıt gelince Status (200/500), Size ve Time sütunları anında güncellenir.', en: 'When the server responds, the Status (200/500), Size, and Time columns update instantly.' },
          positions: { panel: { x: 20, y: 40 }, status: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'panel', to: 'status', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — Tester bu satırı UI\'nın söylediğine GÜVENMEDEN kendi gözüyle okur; UI "başarılı" dese bile Status sütunu farklı bir hikaye anlatabilir.', en: 'The lesson — a tester reads this row with their own eyes, WITHOUT trusting what the UI says; even if the UI says "success", the Status column may tell a different story.' },
          positions: { status: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'status', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'DevTools\'u Açıp İlk İsteği Görmek', en: 'Opening DevTools and Seeing the First Request' },
      steps: [
        { id: 1, icon: '⌨️', label: { tr: 'DevTools\'u aç…', en: 'Open DevTools…' }, detail: { tr: 'F12 veya sağ tık → İncele, sonra Network sekmesine geç.', en: 'F12 or right-click → Inspect, then switch to the Network tab.' } },
        { id: 2, icon: '🔄', label: { tr: 'Bir eylem tetikle…', en: 'Trigger an action…' }, detail: { tr: 'Sayfayı yenile veya bir API çağrısı yapan bir butona tıkla.', en: 'Refresh the page or click a button that triggers an API call.' } },
        { id: 3, icon: '👀', label: { tr: 'Satırı oku…', en: 'Read the row…' }, detail: { tr: 'Name/Status/Type/Size/Time sütunlarına bakarak isteğin özetini çıkar.', en: 'Read Name/Status/Type/Size/Time to get the request\'s summary.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e1-order-01',
      question: { tr: 'Network panelinde bir isteği ilk kez incelerken izlenecek sırayı diz.', en: 'Order the steps for inspecting a request in the Network panel for the first time.' },
      items: [
        { id: '1', text: { tr: 'DevTools\'u aç, Network sekmesine geç', en: 'Open DevTools, switch to the Network tab' }, order: 1 },
        { id: '2', text: { tr: 'Eylemi tetikle (yenile/butona tıkla)', en: 'Trigger the action (refresh/click button)' }, order: 2 },
        { id: '3', text: { tr: 'Yeni satırın Name sütununu oku', en: 'Read the new row\'s Name column' }, order: 3 },
        { id: '4', text: { tr: 'Status sütununa bak — 2xx mi 4xx/5xx mi?', en: 'Check the Status column — 2xx or 4xx/5xx?' }, order: 4 },
        { id: '5', text: { tr: 'Size ve Time ile isteğin ağırlığını/hızını değerlendir', en: 'Assess the request\'s weight/speed via Size and Time' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e1-panel-anatomy',
      id: 'api-e1-panel-anatomy',
      title: { tr: 'Kendin Dene: Doğru Sütunu Eşle', en: 'Try It Yourself: Match the Right Column' },
      starterCode: `// Network panelinde bir satir: /api/v1/bugs -> 500 -> fetch -> 0.3 kB -> 612 ms
// TODO: "sunucunun cevabini" hangi sutun gosterir?
Sutun adi: ???`,
      solutionCode: `// Sunucunun cevabini (basarili/basarisiz) gosteren sutun STATUS'tur
Sutun adi: Status`,
      hint: { tr: 'Name yolu, Type isteğin türünü, Size yanıt boyutunu, Time süreyi gösterir. Sunucunun "başardım/başaramadım" cevabını taşıyan tek sütun Status\'tur.', en: 'Name shows the path, Type the request kind, Size the response size, Time the duration. The only column carrying the server\'s "I succeeded/failed" answer is Status.' },
      successMessage: { tr: 'Doğru! Status sütunu, bir isteğin gerçekten başarılı olup olmadığının tek güvenilir kanıtıdır.', en: 'Correct! The Status column is the only reliable evidence of whether a request truly succeeded.' },
    },
    {
      type: 'quiz',
      question: { tr: 'UI ekranda "Bug başarıyla oluşturuldu" mesajı gösteriyor. Bunun gerçekten doğru olduğunu nasıl doğrularsın?', en: 'The UI shows "Bug created successfully" on screen. How do you verify this is really true?' },
      options: [
        { id: 'a', text: { tr: 'Mesaja güvenip geçerim, UI zaten doğru söylüyordur', en: 'Trust the message and move on, the UI is surely telling the truth' } },
        { id: 'b', text: { tr: 'Network panelini açıp isteğin GERÇEK Status kodunu kontrol ederim', en: 'Open the Network panel and check the request\'s REAL Status code' } },
        { id: 'c', text: { tr: 'Sayfayı yeniden başlatırım', en: 'Restart the page' } },
        { id: 'd', text: { tr: 'Sadece ekran görüntüsü alırım', en: 'Just take a screenshot' } },
      ],
      correct: 'b',
      explanation: { tr: 'UI mesajları geliştiricinin YAZDIĞI metindir, sunucunun GERÇEK cevabı değildir — bir hata durumunda bile yanlışlıkla "başarılı" mesajı gösterilebilir. Network panelindeki Status sütunu, sunucunun ne döndürdüğünün tek doğrudan kanıtıdır.', en: 'UI messages are text the developer WROTE, not the server\'s REAL answer — even on failure, a "success" message can mistakenly show. The Status column in the Network panel is the only direct evidence of what the server actually returned.' },
      retryQuestion: {
        question: { tr: 'Network panelindeki "Type" sütunu ne gösterir?', en: 'What does the "Type" column in the Network panel show?' },
        options: [
          { id: 'a', text: { tr: 'İsteğin türünü (fetch, xhr, img, css gibi)', en: 'The kind of request (fetch, xhr, img, css, etc.)' } },
          { id: 'b', text: { tr: 'Sunucunun IP adresini', en: 'The server\'s IP address' } },
          { id: 'c', text: { tr: 'Kullanıcının tarayıcı sürümünü', en: 'The user\'s browser version' } },
          { id: 'd', text: { tr: 'İsteğin ne zaman gönderildiğini', en: 'When the request was sent' } },
        ],
        correct: 'a',
        explanation: { tr: 'Type sütunu isteğin kaynağını/türünü gösterir — bir API çağrısı genelde `fetch`/`xhr`, bir resim `img`, bir stil dosyası `css`\'tir. Bu ayrım, E2\'de göreceğin filtrelemenin temelidir.', en: 'The Type column shows the request\'s source/kind — an API call is usually `fetch`/`xhr`, an image is `img`, a stylesheet is `css`. This distinction is the basis of the filtering you will see in E2.' },
      },
    },
  ],
}

const E2 = {
  title: { tr: '🎚️ E2 · Fetch/XHR Filtresi: gürültüyü ayıklamak', en: '🎚️ E2 · Fetch/XHR Filter: cutting the noise' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🎚️',
      content: {
        tr: 'Fetch/XHR filtresi, bir **radyo istasyonu ayar düğmesi** gibidir: eter (tüm ağ trafiği) yüzlerce frekansla (resim, CSS, font, reklam scripti, API isteği) doludur; filtre olmadan bir sayfa yüklemesi onlarca satır üretir ve aradığın TEK API isteğini bulmak saman yığınında iğne aramaya döner. Filtreyi "Fetch/XHR"a çevirdiğinde, sadece JavaScript\'in kod içinden başlattığı istekler (tam da API çağrıların) kalır — statik dosyalar (resim, font, stil) sessizleşir. Peki neden tarayıcı varsayılan olarak HER ŞEYİ göstersin ki, API testerının işini zorlaştırsın? Çünkü Network paneli SADECE testerlar için değildir — bir frontend geliştirici performans optimizasyonu yaparken TÜM kaynakları (resimler dahil) görmek ister; filtre, senin ROLÜNE göre gürültüyü SEN ayıklarsın. Java\'da bunun karşılığı log seviyesi filtrelemedir: `DEBUG` seviyesinde HER ŞEY loglanır, ama sen sadece `ERROR` seviyesini görmek istersin — log4j/logback\'te seviyeyi süzersin, DevTools\'ta da istek TÜRÜNÜ süzersin. QA açısından bu filtre olmadan çalışmak ciddi bir risktir: 50 satırlık bir sayfa yüklemesinde gerçek API isteğini KAÇIRMAK, bir defect\'i hiç görmeden geçmek anlamına gelir.',
        en: 'The Fetch/XHR filter is like a **radio tuning dial**: the ether (all network traffic) is full of hundreds of frequencies (images, CSS, fonts, ad scripts, API calls); without a filter, loading one page produces dozens of rows and finding the ONE API request you want becomes finding a needle in a haystack. Turning the filter to "Fetch/XHR" leaves only the requests JavaScript itself started from code (exactly your API calls) — static files (images, fonts, styles) go quiet. So why does the browser show EVERYTHING by default, making an API tester\'s job harder? Because the Network panel is NOT only for testers — a frontend developer doing performance work wants to see ALL resources (images included); the filter lets YOU cut the noise according to YOUR role. The Java equivalent is log-level filtering: at `DEBUG` level EVERYTHING is logged, but you only want to see `ERROR` — you filter by level in log4j/logback, and in DevTools you filter by request TYPE. For QA, working without this filter is a real risk: MISSING the real API request in a 50-row page load means walking right past a defect without ever seeing it.',
      },
    },
    { type: 'heading', text: { tr: 'Gürültüden Sinyale', en: 'From Noise to Signal' } },
    {
      type: 'text',
      content: {
        tr: 'Network panelinin üstündeki filtre çubuğunda `Fetch/XHR` seçeneğine tıklamak, listeyi sadece JavaScript kodunun (`fetch()`/`XMLHttpRequest`) başlattığı isteklere indirger. Bir metin araması (`bugs`) ile de daraltabilirsin. Bu ikisi birlikte, düzinelerce statik dosya arasından tam olarak aradığın API isteğine saniyeler içinde ulaştırır.',
        en: 'Clicking the `Fetch/XHR` option in the filter bar above the Network panel reduces the list to only the requests started by JavaScript code (`fetch()`/`XMLHttpRequest`). You can narrow it further with a text search (`bugs`). Together these get you to exactly the API request you want, in seconds, out of dozens of static files.',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Filtresiz Liste → Fetch/XHR ile Daraltılmış Liste', en: 'Unfiltered List → Narrowed with Fetch/XHR' },
      svg: fetchXhrFilterSvg,
    },
    {
      type: 'video-scene',
      id: 'api-e2-filter-film',
      title: { tr: '🎬 50 Satır Arasında Kaybolan Tek API İsteği', en: '🎬 The One API Request Lost Among 50 Rows' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'load', emoji: '📄', label: { tr: 'Sayfa yüklenir: 50 satır', en: 'Page loads: 50 rows' }, color: '#94a3b8' },
        { id: 'search', emoji: '🔎', label: { tr: 'Testerin gözü ile arama', en: 'Tester searches by eye' }, color: '#f59e0b' },
        { id: 'filter', emoji: '🎚️', label: { tr: 'Fetch/XHR filtresi', en: 'Fetch/XHR filter' }, color: '#0ea5e9' },
        { id: 'found', emoji: '🎯', label: { tr: 'Tek satır: /api/v1/bugs', en: 'One row: /api/v1/bugs' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Sayfa yüklenir: resimler, fontlar, stiller, reklam scriptleri ve BİR API isteği — toplam 50 satır.', en: 'The page loads: images, fonts, styles, ad scripts, and ONE API request — 50 rows total.' },
          positions: { load: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Filtre kullanmadan tester gözle satır satır arar — yavaş ve hataya açık.', en: 'Without a filter the tester searches row by row with their eyes — slow and error-prone.' },
          positions: { load: { x: 20, y: 40 }, search: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'load', to: 'search', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Filtre çubuğunda "Fetch/XHR" seçilir — sadece JavaScript\'in başlattığı istekler kalır.', en: 'The "Fetch/XHR" option is selected in the filter bar — only JavaScript-started requests remain.' },
          positions: { search: { x: 20, y: 40 }, filter: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'search', to: 'filter', color: '#0ea5e9' }],
        },
        {
          caption: { tr: '50 satır, tek bir satıra iner: `GET /api/v1/bugs`. Aranan defect artık gözden kaçamaz.', en: '50 rows shrink to a single row: `GET /api/v1/bugs`. The defect you are looking for can no longer slip past.' },
          positions: { filter: { x: 20, y: 40 }, found: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'filter', to: 'found', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — Filtre bir "süs" değildir; onsuz çalışmak, gerçek bir defect\'i onlarca alakasız satır arasında kaçırma riskidir.', en: 'The lesson — the filter is not a "nicety"; working without it risks missing a real defect among dozens of unrelated rows.' },
          positions: { found: { x: 40, y: 48, scale: 1.15, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Gürültüyü Ayıklama Sırası', en: 'The Order for Cutting the Noise' },
      steps: [
        { id: 1, icon: '📄', label: { tr: 'Filtresiz listeye bak…', en: 'Look at the unfiltered list…' }, detail: { tr: 'Sayfa yüklendiğinde resim/font/CSS/API karışık onlarca satır görünür.', en: 'When the page loads, dozens of mixed image/font/CSS/API rows appear.' } },
        { id: 2, icon: '🎚️', label: { tr: 'Fetch/XHR\'ı seç…', en: 'Select Fetch/XHR…' }, detail: { tr: 'Filtre çubuğunda Fetch/XHR\'a tıkla — sadece JS kaynaklı istekler kalır.', en: 'Click Fetch/XHR in the filter bar — only JS-originated requests remain.' } },
        { id: 3, icon: '🔎', label: { tr: 'Metinle daralt…', en: 'Narrow with text…' }, detail: { tr: 'Gerekirse "bugs" gibi bir arama terimiyle listeyi tek satıra indir.', en: 'If needed, narrow to a single row with a search term like "bugs".' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e2-order-01',
      question: { tr: 'Kalabalık bir sayfa yüklemesinde tek bir API isteğini bulma sırasını diz.', en: 'Order the steps to find one API request in a crowded page load.' },
      items: [
        { id: '1', text: { tr: 'Sayfayı yükle, Network panelini gözlemle', en: 'Load the page, observe the Network panel' }, order: 1 },
        { id: '2', text: { tr: 'Filtre çubuğunda Fetch/XHR\'ı seç', en: 'Select Fetch/XHR in the filter bar' }, order: 2 },
        { id: '3', text: { tr: 'Kalan listeyi metin aramasıyla daralt', en: 'Narrow the remaining list with a text search' }, order: 3 },
        { id: '4', text: { tr: 'Hedef API isteğini tek satırda bul', en: 'Find the target API request in a single row' }, order: 4 },
        { id: '5', text: { tr: 'Status/Time üzerinden isteği değerlendir', en: 'Evaluate the request via Status/Time' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e2-fetch-xhr-filter',
      id: 'api-e2-fetch-xhr-filter',
      title: { tr: 'Kendin Dene: Fetch/XHR Filtresinde Kalanı Seç', en: 'Try It Yourself: Pick What Survives the Fetch/XHR Filter' },
      starterCode: `// Filtrelenmemis liste: logo.svg (img), style.css, /api/v1/bugs (fetch), font.woff2
// TODO: Fetch/XHR filtresi acildiginda listede SADECE hangisi kalir?
Kalan: ???`,
      solutionCode: `// Sadece JavaScript'in baslattigi istek (fetch/xhr turu) kalir
Kalan: /api/v1/bugs (fetch)`,
      hint: { tr: '`img`, `css` ve `font` türündeki dosyalar tarayıcının kendisi tarafından sayfa render edilirken istenir — bunlar JavaScript kodundan değildir, bu yüzden Fetch/XHR filtresinde ELENİR.', en: '`img`, `css`, and `font` type files are requested by the browser itself while rendering the page — these do not come from JavaScript code, so they are FILTERED OUT by the Fetch/XHR filter.' },
      successMessage: { tr: 'Doğru! Fetch/XHR filtresi tam olarak API isteklerinin yaşadığı yerdir.', en: 'Correct! Fetch/XHR is exactly where API requests live in the filter.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Fetch/XHR filtresi neden tercih edilir?', en: 'Why is the Fetch/XHR filter preferred?' },
      options: [
        { id: 'a', text: { tr: 'Sadece JavaScript kodunun başlattığı istekleri (API çağrıları) gösterip statik dosya gürültüsünü eler', en: 'It shows only requests started by JavaScript code (API calls) and cuts static-file noise' } },
        { id: 'b', text: { tr: 'Tüm isteklerin hızını otomatik artırır', en: 'It automatically speeds up all requests' } },
        { id: 'c', text: { tr: 'Sadece HTTPS isteklerini gösterir', en: 'It shows only HTTPS requests' } },
        { id: 'd', text: { tr: 'Sunucudaki hataları otomatik düzeltir', en: 'It automatically fixes server-side errors' } },
      ],
      correct: 'a',
      explanation: { tr: 'Fetch/XHR filtresi, isteğin TÜRÜNE göre süzer: resim/font/CSS gibi statik kaynak istekleri (tarayıcı tarafından otomatik başlatılır) elenir, sadece JavaScript\'in `fetch()`/`XMLHttpRequest` ile başlattığı — yani genelde API — istekler kalır.', en: 'The Fetch/XHR filter sieves by request TYPE: static resource requests like images/fonts/CSS (auto-started by the browser) are filtered out, leaving only requests JavaScript started with `fetch()`/`XMLHttpRequest` — typically API calls.' },
      retryQuestion: {
        question: { tr: 'Filtre kullanmadan Network panelinde API isteği aramanın en büyük riski nedir?', en: 'What is the biggest risk of searching for an API request in the Network panel without a filter?' },
        options: [
          { id: 'a', text: { tr: 'Onlarca alakasız satır arasında gerçek isteği/defect\'i kaçırmak', en: 'Missing the real request/defect among dozens of unrelated rows' } },
          { id: 'b', text: { tr: 'Tarayıcının çökmesi', en: 'Crashing the browser' } },
          { id: 'c', text: { tr: 'Sunucunun isteği reddetmesi', en: 'The server rejecting the request' } },
          { id: 'd', text: { tr: 'İnternet bağlantısının kesilmesi', en: 'Losing the internet connection' } },
        ],
        correct: 'a',
        explanation: { tr: 'Filtre olmadan bir sayfa yüklemesi onlarca satır üretebilir; bu kalabalıkta gerçek API isteğini (ve içindeki olası bir 500/boş body defect\'ini) atlamak kolaydır — filtre bu riski ortadan kaldırır.', en: 'Without a filter, one page load can produce dozens of rows; in that crowd it is easy to skip the real API request (and a possible 500/empty-body defect inside it) — the filter removes that risk.' },
      },
    },
  ],
}

const E3 = {
  title: { tr: '📖 E3 · Bir İsteği Okumak: Headers / Payload / Preview / Response / Timing', en: '📖 E3 · Reading a Request: Headers / Payload / Preview / Response / Timing' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📖',
      content: {
        tr: 'Bir Network satırına tıklayıp açılan 5 sekme (`Headers`, `Payload`, `Preview`, `Response`, `Timing`), bir **zarfı katman katman açmak** gibidir: `Headers` zarfın dışındaki adres/pul bilgisidir (meta veri — Content-Type, Authorization); `Payload` içindeki mektubun SEN gönderdiğin hâlidir (istek gövdesi); `Response` sunucudan gelen mektubun HAM hâlidir (ayrıştırılmamış metin); `Preview` ise aynı mektubun OKUNAKLI, biçimlendirilmiş hâlidir (JSON güzelce girintili); `Timing` ise mektubun postalanmasından teslimine kadar geçen süredir. Peki `Response` varken `Preview`\'e neden ihtiyaç var — ikisi aynı veriyi göstermiyor mu? Evet aynı veriyi gösterirler ama `Response` ham metindir (büyük bir JSON\'da okumak gözünü yorar), `Preview` ise tarayıcının senin için AYRIŞTIRIP güzelce sunduğu hâlidir — küçük farkları (bir alanın eksikliği, yanlış tipte bir değer) `Preview`\'de çok daha hızlı yakalarsın. Java\'da bunun karşılığı bir `HttpResponse` nesnesinin `headers()`, `body()` alanlarıdır — `Payload` bir `HttpRequest.BodyPublisher`\'a, `Response` bir `HttpResponse<String>`\'e karşılık gelir; `Timing` ise bir profiler\'ın ölçtüğü süreye. QA açısından bu 5 sekmeyi ayrı ayrı bilmek kritiktir çünkü bir hata farklı sekmelerde farklı görünür: yanlış `Content-Type` `Headers`\'da, eksik bir alan `Payload`\'da, beklenmeyen bir `passwordHash` alanı `Response`\'ta saklıdır.',
        en: 'The 5 tabs (`Headers`, `Payload`, `Preview`, `Response`, `Timing`) that open when you click a Network row are like **opening an envelope layer by layer**: `Headers` is the address/stamp info on the outside of the envelope (metadata — Content-Type, Authorization); `Payload` is the letter inside as YOU sent it (the request body); `Response` is the RAW form of the letter that came back from the server (unparsed text); `Preview` is the same letter\'s READABLE, formatted form (JSON nicely indented); `Timing` is how long it took from posting to delivery. So why do we need `Preview` when `Response` exists — don\'t they show the same data? Yes, they show the same data, but `Response` is raw text (tiring on the eyes in a large JSON), while `Preview` is the browser PARSING and presenting it nicely for you — small differences (a missing field, a wrongly typed value) are caught much faster in `Preview`. The Java equivalent is an `HttpResponse` object\'s `headers()`, `body()` fields — `Payload` maps to an `HttpRequest.BodyPublisher`, `Response` to an `HttpResponse<String>`, `Timing` to what a profiler measures. For QA, knowing these 5 tabs separately is critical because a bug shows up differently in different tabs: a wrong `Content-Type` hides in `Headers`, a missing field in `Payload`, an unexpected `passwordHash` field in `Response`.',
      },
    },
    { type: 'heading', text: { tr: 'Zarfı Katman Katman Açmak', en: 'Opening the Envelope Layer by Layer' } },
    {
      type: 'text',
      content: {
        tr: 'Bir satıra tıkladığında yan panelde bu 5 sekme açılır. `Preview` sekmesi, sunucunun döndürdüğü JSON\'u okunaklı ağaç yapısında gösterir — özellikle büyük yanıtlarda ilk bakılacak sekme budur.',
        en: 'Clicking a row opens these 5 tabs in the side panel. The `Preview` tab shows the JSON the server returned in a readable tree structure — this is the first tab to check, especially for large responses.',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Bir İsteğin 5 Sekmesi (Preview seçili)', en: 'A Request\'s 5 Tabs (Preview selected)' },
      svg: requestTabsSvg,
    },
    {
      type: 'video-scene',
      id: 'api-e3-tabs-film',
      title: { tr: '🎬 Hangi Hata Hangi Sekmede Saklanır?', en: '🎬 Which Bug Hides in Which Tab?' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'row', emoji: '📡', label: { tr: 'Network satırına tıkla', en: 'Click the Network row' }, color: '#f59e0b' },
        { id: 'headers', emoji: '📇', label: { tr: 'Headers: Content-Type yanlış', en: 'Headers: wrong Content-Type' }, color: '#0ea5e9' },
        { id: 'payload', emoji: '📝', label: { tr: 'Payload: gönderdiğin veri', en: 'Payload: what you sent' }, color: '#a78bfa' },
        { id: 'response', emoji: '📥', label: { tr: 'Response: sızan passwordHash', en: 'Response: leaked passwordHash' }, color: '#ef4444' },
        { id: 'timing', emoji: '⏱️', label: { tr: 'Timing: 2.9 saniye', en: 'Timing: 2.9 seconds' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Tester Network panelinde bir satıra tıklar — 5 sekmeli bir panel açılır.', en: 'The tester clicks a row in the Network panel — a 5-tab panel opens.' },
          positions: { row: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: '`Headers` sekmesinde `Content-Type: text/plain` görülür — oysa JSON gönderilmesi gerekiyordu, ilk şüpheli iz.', en: 'The `Headers` tab shows `Content-Type: text/plain` — but JSON was supposed to be sent, the first suspicious clue.' },
          positions: { row: { x: 20, y: 30 }, headers: { x: 58, y: 30, scale: 1.15, pulse: true } },
          beams: [{ from: 'row', to: 'headers', color: '#0ea5e9' }],
        },
        {
          caption: { tr: '`Payload` sekmesi testerın gönderdiği isteği aynen gösterir — "ben ne yolladım?" sorusunun cevabı.', en: 'The `Payload` tab shows exactly what the tester sent — the answer to "what did I send?"' },
          positions: { headers: { x: 20, y: 50 }, payload: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'headers', to: 'payload', color: '#a78bfa' }],
        },
        {
          caption: { tr: '`Response` sekmesinde beklenmedik bir alan görülür: `passwordHash` — sözleşmede OLMAMASI gereken bir sızıntı.', en: 'The `Response` tab reveals an unexpected field: `passwordHash` — a leak that should NOT be in the contract.' },
          positions: { payload: { x: 20, y: 70 }, response: { x: 58, y: 70, scale: 1.2, pulse: true } },
          beams: [{ from: 'payload', to: 'response', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Her sekme farklı bir soruya cevap verir: Headers "meta veri doğru mu", Payload "ben ne gönderdim", Response "sunucu GERÇEKTEN ne döndürdü", Timing "ne kadar sürdü". Hepsini AYRI AYRI kontrol etmek gerekir.', en: 'The lesson — each tab answers a different question: Headers "is the metadata correct", Payload "what did I send", Response "what did the server REALLY return", Timing "how long did it take". All must be checked SEPARATELY.' },
          positions: { response: { x: 30, y: 45 }, timing: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'response', to: 'timing', color: '#22c55e' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir İsteği Baştan Sona Okuma Sırası', en: 'The Order for Reading a Request End to End' },
      steps: [
        { id: 1, icon: '📇', label: { tr: 'Headers\'a bak…', en: 'Check Headers…' }, detail: { tr: 'Content-Type, Authorization gibi meta bilgilerin doğru olduğunu doğrula.', en: 'Verify metadata like Content-Type, Authorization is correct.' } },
        { id: 2, icon: '📝', label: { tr: 'Payload\'ı doğrula…', en: 'Verify Payload…' }, detail: { tr: 'POST/PUT isteklerinde gerçekten göndermeyi düşündüğün veriyi gönderdiğini kontrol et.', en: 'On POST/PUT requests, check you really sent the data you intended.' } },
        { id: 3, icon: '📥', label: { tr: 'Preview/Response\'u incele…', en: 'Inspect Preview/Response…' }, detail: { tr: 'Sunucunun döndürdüğü gerçek veriyi (ve olmaması gereken alanları) kontrol et, sonra Timing\'e bak.', en: 'Check the real data the server returned (and any field that should not be there), then check Timing.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e3-order-01',
      question: { tr: 'Bir isteği baştan sona incelerken sekmeleri sırala.', en: 'Order the tabs when inspecting a request end to end.' },
      items: [
        { id: '1', text: { tr: 'Headers — meta veri doğru mu', en: 'Headers — is the metadata correct' }, order: 1 },
        { id: '2', text: { tr: 'Payload — ben ne gönderdim', en: 'Payload — what did I send' }, order: 2 },
        { id: '3', text: { tr: 'Preview — sunucunun cevabını okunaklı gör', en: 'Preview — see the server\'s answer readably' }, order: 3 },
        { id: '4', text: { tr: 'Response — ham veriyi karşılaştır', en: 'Response — compare the raw data' }, order: 4 },
        { id: '5', text: { tr: 'Timing — ne kadar sürdü', en: 'Timing — how long it took' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e3-request-tabs',
      id: 'api-e3-request-tabs',
      title: { tr: 'Kendin Dene: Doğru Sekmeyi Bul', en: 'Try It Yourself: Find the Right Tab' },
      starterCode: `// Sorun: response govdesinde olmamasi gereken bir "passwordHash" alani var
// TODO: bu sizintiyi hangi sekmede yakalarsin?
Sekme: ???`,
      solutionCode: `// Sunucunun GERCEKTEN dondurdugu veri Response/Preview sekmesinde gorulur
Sekme: Response (veya Preview)`,
      hint: { tr: 'Headers meta veriyi, Payload SENİN gönderdiğini gösterir. Sunucunun GERÇEKTEN neyi döndürdüğü — ve olmaması gereken bir alanın sızması — sadece Response/Preview sekmesinde görülür.', en: 'Headers shows metadata, Payload shows what YOU sent. What the server REALLY returned — including a field that should not have leaked — is only visible in the Response/Preview tab.' },
      successMessage: { tr: 'Doğru! Response/Preview, sunucunun gerçek davranışının tek doğrudan kanıtıdır.', en: 'Correct! Response/Preview is the only direct evidence of the server\'s real behavior.' },
    },
    {
      type: 'quiz',
      question: { tr: '`Response` ile `Preview` sekmeleri arasındaki fark nedir?', en: 'What is the difference between the `Response` and `Preview` tabs?' },
      options: [
        { id: 'a', text: { tr: 'Response ham/ayrıştırılmamış metni, Preview aynı veriyi okunaklı/biçimlendirilmiş gösterir', en: 'Response shows the raw/unparsed text, Preview shows the same data readably/formatted' } },
        { id: 'b', text: { tr: 'İkisi tamamen farklı isteklere aittir', en: 'They belong to completely different requests' } },
        { id: 'c', text: { tr: 'Preview sadece hata durumunda görünür', en: 'Preview only appears on errors' } },
        { id: 'd', text: { tr: 'Response sadece GET isteklerinde vardır', en: 'Response only exists for GET requests' } },
      ],
      correct: 'a',
      explanation: { tr: 'Her iki sekme de AYNI yanıt verisini gösterir; `Response` sunucudan geldiği ham hâliyle, `Preview` ise tarayıcının ayrıştırıp okunaklı bir ağaç yapısında sunduğu hâliyle. Küçük farkları (eksik alan, sızan alan) yakalamak için `Preview` genelde daha hızlıdır.', en: 'Both tabs show the SAME response data; `Response` in its raw form as it came from the server, `Preview` as the browser parses and presents it in a readable tree. `Preview` is usually faster for catching small differences (a missing field, a leaked field).' },
      retryQuestion: {
        question: { tr: '`Payload` sekmesi neyi gösterir?', en: 'What does the `Payload` tab show?' },
        options: [
          { id: 'a', text: { tr: 'İstemcinin (senin) sunucuya gönderdiği istek gövdesini', en: 'The request body the client (you) sent to the server' } },
          { id: 'b', text: { tr: 'Sunucunun döndürdüğü veriyi', en: 'The data the server returned' } },
          { id: 'c', text: { tr: 'İsteğin ne kadar sürdüğünü', en: 'How long the request took' } },
          { id: 'd', text: { tr: 'Tarayıcının önbelleğini', en: 'The browser\'s cache' } },
        ],
        correct: 'a',
        explanation: { tr: '`Payload`, POST/PUT/PATCH gibi bir gövde taşıyan isteklerde SENİN gönderdiğin veriyi gösterir — sunucunun cevabı değil. "Ben gerçekten doğru veriyi mi gönderdim?" sorusunu bu sekmede cevaplarsın.', en: '`Payload` shows the data YOU sent on requests carrying a body, like POST/PUT/PATCH — not the server\'s answer. You answer "did I really send the right data?" in this tab.' },
      },
    },
  ],
}

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
  C1, C2, C3, C4, C5, C6,
  D1, D2, D3, D4, D5,
  ...groupE.map(mk),
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
  {
    sectionIndex: 20,
    promptTr: 'Express\'te "kural tanımlamak" ile "kuralın gerçekten uygulanması" neden iki ayrı adım — sektöre yeni giren birine, middleware sırası örneğini kullanarak kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why "defining a rule" and "the rule actually being enforced" are two separate steps in Express, using the middleware-order example, to a newcomer.',
    keywords: ['middleware', 'sira', 'sonuc', 'oku', 'express', 'validationresult', 'next'],
    minScore: 3,
    modelAnswerTr: 'Express minimal bir framework olduğu için hiçbir şeyi senin yerine otomatik yapmaz: bir doğrulama kütüphanesi kural TANIMLAR ama sonucu OKUYUP karar vermek (validationResult + 400 döndürmek) sana kalır; aynı şekilde express.json() gibi bir middleware doğru sırada kayıtlı değilse route hiç çalışmasa da hata vermez, sadece veriyi sessizce boş bırakır. Bu yüzden Express\'te "kod var" ile "kod gerçekten devrede" arasında bir boşluk vardır ve tester bunu her zaman gerçek bir istekle doğrular.',
    modelAnswerEn: 'Because Express is a minimal framework it does not do anything automatically for you: a validation library DEFINES rules but READING the result and deciding (calling validationResult and returning 400) is left to you; likewise, if a middleware like express.json() is not registered in the right order, the route does not error, it just silently leaves the data empty. This is why in Express there is a gap between "the code exists" and "the code is really active", and a tester always verifies it with a real request.',
  },
  {
    sectionIndex: 25,
    promptTr: 'NestJS\'te bir decorator/pipe/filter "doğru yazılmış" olmasına rağmen neden hiçbir etkisi olmayabilir — sektöre yeni giren birine, modül/global kayıt kavramını kullanarak kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why a decorator/pipe/filter in NestJS can be "written correctly" yet have zero effect, using the module/global-registration concept, to a newcomer.',
    keywords: ['modul', 'kayit', 'global', 'pipe', 'filter', 'validationpipe', 'nest'],
    minScore: 3,
    modelAnswerTr: 'Nest, Spring gibi decorator tabanlı bir yapı kullanır ama Spring\'in aksine bileşenleri otomatik taramaz: bir controller @Module\'ün controllers dizisine EKLENMEZSE hiç çalışmaz, bir DTO\'nun class-validator decorator\'ları main.ts\'te app.useGlobalPipes(new ValidationPipe()) çağrılmazsa asla tetiklenmez, bir Exception Filter da app.useGlobalFilters(...) ile kaydedilmezse devreye girmez. Yani decorator YAZMAK ile onu GLOBAL olarak KAYDETMEK iki ayrı adımdır; tester her ikisinin de yapıldığını gerçek bir istekle doğrular, sadece dosyayı okumakla yetinmez.',
    modelAnswerEn: 'Nest uses a decorator-based structure like Spring, but unlike Spring it does not scan components automatically: a controller never works if it is not ADDED to @Module\'s controllers array, a DTO\'s class-validator decorators never trigger unless app.useGlobalPipes(new ValidationPipe()) is called in main.ts, and an Exception Filter never engages unless registered with app.useGlobalFilters(...). So WRITING a decorator and GLOBALLY REGISTERING it are two separate steps; a tester verifies both were done with a real request, never settling for just reading the file.',
  },
]

fillMissingFeynman(apiTestingData, apiFeynmanDefs)
