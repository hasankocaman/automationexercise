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
        tr: 'Bu sayfa boyunca tek bir örnek API kullanacağız: **`/api/v1/bugs` — Bug Tracker**. Tester\'ın kendi dünyası olduğu için öğrenme yükü sıfır. İstemci (Postman, tarayıcı, mobil uygulama, test kodu) bir **request** gönderir; sunucu (Java/Spring, Express veya NestJS ile yazacağımız uygulama) **sözleşmeye** göre bir **response** döner. Sözleşme = hangi yolun (`/api/v1/bugs`) hangi metodu (GET/POST/...) kabul ettiği, hangi alanların zorunlu olduğu ve response\'un şekli. Sözleşmeyi ileride Swagger/OpenAPI ile makine-okunur hale getireceğiz (GRUP F).',
        en: 'Throughout this page we use a single example API: **`/api/v1/bugs` — Bug Tracker**. Being the tester\'s own world, its learning cost is zero. A client (Postman, a browser, a mobile app, test code) sends a **request**; the server (the app we\'ll write in Java/Spring, Express, or NestJS) returns a **response** according to the **contract**. The contract = which path (`/api/v1/bugs`) accepts which method (GET/POST/...), which fields are required, and the shape of the response. Later we\'ll make the contract machine-readable with Swagger/OpenAPI (GROUP F).',
      },
    },
    {
      type: 'grid', cols: 3,
      items: [
        { icon: '🧑‍💻', label: { tr: 'İstemci (Client)', en: 'Client' }, desc: { tr: 'Request\'i başlatan taraf: Postman, tarayıcı, mobil uygulama veya test kodu.', en: 'The side initiating the request: Postman, browser, mobile app, or test code.' } },
        { icon: '🖥️', label: { tr: 'Sunucu (Server)', en: 'Server' }, desc: { tr: 'Request\'i işleyip response üreten uygulama: bizim /api/v1/bugs servisimiz.', en: 'The app that processes the request and produces a response: our /api/v1/bugs service.' } },
        { icon: '📜', label: { tr: 'Sözleşme (Contract)', en: 'Contract' }, desc: { tr: 'Kuralların tanımı: yol, metod, zorunlu alanlar, response şekli. Test ettiğin şey budur.', en: 'The rules: path, method, required fields, response shape. This is what you test.' } },
      ],
    },
    {
      type: 'video-scene',
      id: 'api-a1-request-journey-film',
      title: { tr: '🎬 Bir Request\'in Yolculuğu: İstemciden Sunucuya ve Geri', en: '🎬 The Journey of a Request: From Client to Server and Back' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'client', emoji: '🧑‍💻', label: { tr: 'İstemci (Tester)', en: 'Client (Tester)' }, color: '#0ea5e9' },
        { id: 'request', emoji: '📤', label: { tr: 'HTTP Request', en: 'HTTP Request' }, color: '#f59e0b' },
        { id: 'contract', emoji: '📜', label: { tr: 'Sözleşme', en: 'Contract' }, color: '#a78bfa' },
        { id: 'server', emoji: '🖥️', label: { tr: 'API Sunucusu', en: 'API Server' }, color: '#8b5cf6' },
        { id: 'response', emoji: '📥', label: { tr: 'JSON Response', en: 'JSON Response' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir tester olarak `GET /api/v1/bugs` request\'ini göndermek istiyorsun — peki bu request, sunucuya ulaşana kadar hangi duraklardan geçer?', en: 'As a tester you want to send the `GET /api/v1/bugs` request — but which stops does this request pass through before it reaches the server?' },
          positions: { client: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Adım 1 — İstemci, method + yol + header\'ları gerçek bir HTTP request\'ine paketler. Sunucunun iç yapısını (Java mı Express mi) BİLMEZ; sadece sözleşmeyi bilir.', en: 'Step 1 — The client packs method + path + headers into a real HTTP request. It does NOT know the server internals (Java or Express); it only knows the contract.' },
          code: { tr: 'GET /api/v1/bugs\nAccept: application/json', en: 'GET /api/v1/bugs\nAccept: application/json' },
          positions: { client: { x: 20, y: 40 }, request: { x: 55, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'client', to: 'request', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Adım 2 — Request önce SÖZLEŞMEYE çarpar: yol tanımlı mı, metod destekleniyor mu? Sözleşme bir kapı bekçisi gibidir — uymayan request daha sunucuya varmadan reddedilebilir.', en: 'Step 2 — The request first hits the CONTRACT: is the path defined, is the method supported? The contract is a gatekeeper — a non-conforming request can be rejected before it even reaches the server.' },
          positions: { request: { x: 22, y: 40 }, contract: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'request', to: 'contract', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Adım 3 — Sözleşmeye uyan request sunucuya ulaşır, sunucu bug listesini hazırlar ve JSON\'a çevirir.', en: 'Step 3 — A conforming request reaches the server, which prepares the bug list and serializes it to JSON.' },
          positions: { contract: { x: 22, y: 40, opacity: 0.6 }, server: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'contract', to: 'server', color: '#8b5cf6' }],
        },
        {
          caption: { tr: 'Ders — İstemci ve sunucu birbirinin içini bilmez, aralarındaki tek bağ sözleşmedir. Tester olarak sen bu sözleşmeyi test edersin: response söz verilen şekle uyuyor mu?', en: 'The lesson — Client and server do not know each other\'s internals; their only bond is the contract. As a tester you test that contract: does the response match the promised shape?' },
          positions: { server: { x: 35, y: 50 }, response: { x: 65, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'server', to: 'response', color: '#22c55e' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'İstemci–Sunucu–Sözleşme: Zincir Nasıl İşler?', en: 'Client–Server–Contract: How the Chain Works' },
      steps: [
        { id: 1, icon: '🧑‍💻', label: { tr: 'İstemci request\'i başlatır…', en: 'Client starts the request…' }, detail: { tr: 'İstemci (Postman/test kodu) method + yol + gövdeyi hazırlar. Sunucunun dilini/mimarisini bilmesi GEREKMEZ.', en: 'The client (Postman/test code) prepares method + path + body. It does NOT need to know the server\'s language/architecture.' } },
        { id: 2, icon: '📜', label: { tr: 'Sözleşme kapıyı tutar…', en: 'Contract holds the gate…' }, detail: { tr: 'Yol/metod/zorunlu alanlar sözleşmeye uyuyor mu? Uymuyorsa request 4xx ile reddedilir — bu bir hata değil, sözleşmenin çalışmasıdır.', en: 'Do path/method/required fields match the contract? If not, the request is rejected with 4xx — that is not a failure, it is the contract working.' } },
        { id: 3, icon: '📥', label: { tr: 'Sunucu sözleşmeye göre response döner…', en: 'Server responds per contract…' }, detail: { tr: 'Sunucu işi yapar ve söz verilen şekilde (status + JSON) döner. Tester bu şekli doğrular — mutfağın içini değil.', en: 'The server does the work and returns in the promised shape (status + JSON). The tester verifies that shape — not the kitchen internals.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-a1-order-01',
      question: { tr: 'Bir API request\'inin istemciden response\'a kadar geçtiği sırayı diz.', en: 'Order the stages an API request passes through from client to response.' },
      items: [
        { id: '1', text: { tr: 'İstemci method + yol + header/gövdeyi HTTP request\'ine paketler', en: 'Client packs method + path + headers/body into an HTTP request' }, order: 1 },
        { id: '2', text: { tr: 'Request sözleşmeye çarpar: yol/metod tanımlı mı?', en: 'Request hits the contract: is the path/method defined?' }, order: 2 },
        { id: '3', text: { tr: 'Sunucu request\'i işler ve veriyi hazırlar', en: 'Server processes the request and prepares the data' }, order: 3 },
        { id: '4', text: { tr: 'Sunucu status kodu + JSON gövdeyle response döner', en: 'Server returns a status code + JSON body response' }, order: 4 },
        { id: '5', text: { tr: 'İstemci response\'u okur; tester şekli/sözleşmeyi doğrular', en: 'Client reads the response; tester verifies the shape/contract' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a1-what-is-api',
      id: 'api-a1-what-is-api',
      title: { tr: 'Kendin Dene: Sözleşmenin Zorunlu Alanını Tamamla', en: 'Try It Yourself: Complete the Contract\'s Required Field' },
      starterCode: { tr: `// Bug Tracker sözleşmesi: yeni bug oluşturma request'i
// TODO: sözleşmeye göre ZORUNLU olan alanı ekle (ipucuna bak)
POST /api/v1/bugs
{
  "severity": "HIGH"
}`, en: `// Bug Tracker contract: create-a-new-bug request
// TODO: add the field that is REQUIRED by the contract (see the hint)
POST /api/v1/bugs
{
  "severity": "HIGH"
}` },
      solutionCode: { tr: `// title 3-120 karakter ZORUNLUDUR — sözleşmenin çekirdeği
POST /api/v1/bugs
{
  "title": "Login butonu 500 donuyor",
  "severity": "HIGH"
}`, en: `// title MUST be 3-120 characters — the core of the contract
POST /api/v1/bugs
{
  "title": "Login butonu 500 donuyor",
  "severity": "HIGH"
}` },
      hint: { tr: 'Bug Tracker modelinde `title` (3-120 karakter) zorunludur; onsuz sunucu 400 dönmelidir. `severity` tek başına yeterli değildir — sözleşme neyi zorunlu kılıyorsa onu göndermelisin.', en: 'In the Bug Tracker model `title` (3-120 chars) is required; without it the server should return 400. `severity` alone is not enough — you must send whatever the contract makes mandatory.' },
      successMessage: { tr: 'Doğru! Sözleşmenin zorunlu alanını göndermezsen sunucu request\'i reddeder — tester olarak bu kuralı İSTEYEREK test edersin.', en: 'Correct! Omit a required field and the server rejects the request — as a tester you deliberately test this rule.' },
    },
    {
      // Kilitsiz Sık Sorulan Sorular bloğu (SEO Faz 3 §4 B2). %60 quiz
      // kilidinin ARKASINDA DEĞİL; sayfa içi FAQPage şemasının TEK kaynağıdır.
      type: 'faq',
      items: [
        {
          q: { tr: 'API testi nasıl yapılır?', en: 'How do you do API testing?' },
          a: {
            tr: 'API testi, bir uygulamanın arayüzü olmadan, doğrudan HTTP endpoint\'lerine istek göndererek doğru veriyi, doğru durum kodunu ve doğru hata davranışını döndürüp döndürmediğini kontrol etmektir. En yaygın araçlar Postman (elle test) ve REST Assured (Java ile otomasyon).',
            en: 'API testing means sending requests directly to an application\'s HTTP endpoints, without the UI, to verify it returns the right data, status code and error behavior. The most common tools are Postman for manual testing and REST Assured for Java-based automation.',
          },
        },
        {
          q: { tr: 'API testi ile UI testi arasındaki fark nedir?', en: 'What is the difference between API testing and UI testing?' },
          a: {
            tr: 'API testi veritabanı ve iş mantığına arayüzün üzerinden geçmeden ulaşır, bu yüzden çok daha hızlı ve kararlıdır; UI testi ise kullanıcının gerçekte gördüğü ekranı doğrular ama tarayıcı render\'ına bağımlı olduğu için daha yavaş ve daha kırılgandır.',
            en: 'API testing reaches the database and business logic without going through the interface, making it much faster and more stable; UI testing verifies what the user actually sees on screen but is slower and more fragile because it depends on browser rendering.',
          },
        },
        {
          q: { tr: 'API testi öğrenmek ne kadar sürer?', en: 'How long does it take to learn API testing?' },
          a: {
            tr: 'Postman ile temel GET/POST isteklerini bir günde öğrenebilirsin. REST Assured ile Java tabanlı otomasyon, şema doğrulama ve authentication dahil mülakat seviyesine gelmek genelde 3-4 hafta düzenli pratik gerektirir.',
            en: 'You can learn basic GET/POST requests with Postman in a day. Reaching interview-ready level — including Java-based automation with REST Assured, schema validation and authentication — usually takes 3-4 weeks of regular practice.',
          },
        },
        {
          q: { tr: 'API testi için hangi araçlar ücretsizdir?', en: 'Which API testing tools are free?' },
          a: {
            tr: 'Postman\'in temel özellikleri, REST Assured (açık kaynak Java kütüphanesi) ve tarayıcının kendi DevTools Network paneli tamamen ücretsizdir. Postman\'in takım/otomasyon özellikleri (Newman CI entegrasyonu hariç) bazı senaryolarda ücretli plana geçer.',
            en: 'Postman\'s core features, REST Assured (an open-source Java library) and the browser\'s own DevTools Network panel are all completely free. Some of Postman\'s team/collaboration features move to a paid plan.',
          },
        },
        {
          q: { tr: 'API testinde en sık yapılan hata nedir?', en: 'What is the most common mistake in API testing?' },
          a: {
            tr: 'Yalnızca durum kodunu (`200 OK`) kontrol edip response body\'nin gerçek içeriğini doğrulamamak. Sunucu 200 dönebilir ama yanlış veriyi veya eksik bir alanı döndürüyor olabilir — bu yüzden şema ve alan bazlı assertion şarttır.',
            en: 'Checking only the status code (`200 OK`) without verifying the actual content of the response body. The server can return 200 while sending the wrong data or a missing field — which is why schema and field-level assertions are essential.',
          },
        },
      ],
    },
    {
      type: 'quiz',
      question: { tr: 'API\'yi "istemci ile sunucu arasındaki sözleşme" olarak tanımlarsak, tester olarak asıl test ettiğin şey nedir?', en: 'If we define an API as "the contract between client and server", what do you as a tester actually test?' },
      options: [
        { id: 'a', text: { tr: 'Sunucunun veritabanı tablo isimleri ve indeksleri', en: 'The server\'s database table names and indexes' } },
        { id: 'b', text: { tr: 'Sözleşme: yolun, metodun, zorunlu alanların ve response şeklinin söz verildiği gibi davranması', en: 'The contract: that the path, method, required fields, and response shape behave as promised' } },
        { id: 'c', text: { tr: 'Sunucunun hangi programlama diliyle yazıldığı', en: 'Which programming language the server is written in' } },
        { id: 'd', text: { tr: 'Sadece UI\'daki butonların rengi', en: 'Only the color of the buttons in the UI' } },
      ],
      correct: 'b',
      explanation: { tr: 'Tester sözleşmeyi test eder: aynı sözleşme Java, Express veya NestJS ile karşılanabilir — mutfağın içi değişse de test aynı kalır. İç detaylar (tablo, dil) sözleşmenin parçası değildir.', en: 'The tester tests the contract: the same contract can be fulfilled by Java, Express, or NestJS — the test stays the same even if the kitchen changes. Internals (tables, language) are not part of the contract.' },
      retryQuestion: {
        question: { tr: 'Bir geliştirici response\'taki `title` alanını sessizce `name` olarak değiştirdi. UI hâlâ çalışıyor ama mobil uygulama çöktü. Bu neyin kırılmasıdır?', en: 'A developer silently renamed the response field `title` to `name`. The UI still works but the mobile app crashed. What broke?' },
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
        tr: 'Bir HTTP request\'i, **kargo gönderisine** benzer: bir **eylem etiketi** (method — al/gönder/sil), bir **adres** (URL — kime), **gönderi notları** (header\'lar — nasıl paketlensin, kim gönderiyor) ve varsa **kutunun içindeki paket** (body — taşınan veri). Peki adresi zaten yazdıysak, neden ayrıca method\'a ihtiyaç var? Çünkü aynı adrese (`/api/v1/bugs`) hem "listeyi getir" (GET) hem "yeni ekle" (POST) diyebilirsin — adres NEREYE, method ise NE YAPILACAĞINI söyler. Java\'da bunun karşılığı bir metot çağrısıdır: URL nesnenin adı, method çağırdığın fonksiyon, header\'lar `@RequestHeader`, body ise `@RequestBody` parametresidir. QA açısından önemi: bir bug\'ın kaynağı çoğu zaman body\'de değil, gözden kaçan bir header\'dadır — `Content-Type: application/json` göndermezsen sunucu JSON\'ı ayrıştıramaz ve body\'yi boş sanır; request "gönderildi" ama sunucu "boş kutu aldım" der. Bu, testerların en sık düştüğü sessiz tuzaklardan biridir.',
        en: 'An HTTP request is like a **shipping parcel**: an **action label** (method — fetch/send/delete), an **address** (URL — to whom), **shipping notes** (headers — how to pack it, who is sending), and, when present, the **package inside the box** (body — the data being carried). But if we already wrote the address, why also need a method? Because to the same address (`/api/v1/bugs`) you can say both "fetch the list" (GET) and "add a new one" (POST) — the address says WHERE, the method says WHAT TO DO. In Java the equivalent is a method call: the URL is the object\'s name, the method is the function you call, headers are `@RequestHeader`, and the body is the `@RequestBody` parameter. Its QA importance: a bug\'s source is often not in the body but in an overlooked header — omit `Content-Type: application/json` and the server cannot parse the JSON and treats the body as empty; the request was "sent" but the server says "I received an empty box." This is one of the silent traps testers fall into most.',
      },
    },
    { type: 'heading', text: { tr: 'Bir Request\'in Dört Parçası', en: 'The Four Parts of a Request' } },
    {
      type: 'table',
      headers: [{ tr: 'Parça', en: 'Part' }, { tr: 'Ne işe yarar', en: 'Purpose' }, { tr: 'Örnek', en: 'Example' }],
      rows: [
        ['Method', { tr: 'Ne yapılacak (fiil)', en: 'What to do (verb)' }, 'POST'],
        ['URL', { tr: 'Nereye', en: 'Where' }, '/api/v1/bugs'],
        ['Header', { tr: 'Request\'in meta bilgisi', en: 'Request metadata' }, 'Content-Type: application/json'],
        ['Body', { tr: 'Taşınan veri (yalnız POST/PUT/PATCH)', en: 'Carried data (POST/PUT/PATCH only)' }, '{ "title": "..." }'],
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
      title: { tr: '🎬 Bir Request\'in Dört Parçası: Kargo Kutusu Açılıyor', en: '🎬 The Four Parts of a Request: Opening the Parcel' },
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
          caption: { tr: 'Bir POST request\'i gönderiyorsun. Sunucuya varan bu tek kutunun içinde aslında dört ayrı parça var — hangisi ne işe yarar?', en: 'You send a POST request. Inside this single parcel that reaches the server there are actually four parts — which does what?' },
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
      question: { tr: 'Geçerli bir POST request\'ini oluşturma sırasını diz.', en: 'Order the steps to build a valid POST request.' },
      items: [
        { id: '1', text: { tr: 'Method\'u POST, URL\'i /api/v1/bugs seç', en: 'Choose method POST, URL /api/v1/bugs' }, order: 1 },
        { id: '2', text: { tr: 'Content-Type: application/json header\'ını ekle', en: 'Add the Content-Type: application/json header' }, order: 2 },
        { id: '3', text: { tr: 'Gerekiyorsa Authorization header\'ını ekle', en: 'Add the Authorization header if required' }, order: 3 },
        { id: '4', text: { tr: 'Body\'ye zorunlu alanları içeren JSON yaz', en: 'Write JSON with required fields into the body' }, order: 4 },
        { id: '5', text: { tr: 'Request\'i gönder ve status + response\'u incele', en: 'Send the request and inspect status + response' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a2-request-anatomy',
      id: 'api-a2-request-anatomy',
      title: { tr: 'Kendin Dene: Eksik Header\'ı Ekle', en: 'Try It Yourself: Add the Missing Header' },
      starterCode: { tr: `// BUG: gövde JSON ama sunucu bunu bilmiyor -> boş body sanıyor
POST /api/v1/bugs

{ "title": "Sepet toplami yanlis", "severity": "MEDIUM" }`, en: `// BUG: the body is JSON but the server does not know it -> assumes an empty body
POST /api/v1/bugs

{ "title": "Sepet toplami yanlis", "severity": "MEDIUM" }` },
      solutionCode: { tr: `// FIX: Content-Type header'i gövdenin JSON oldugunu sunucuya soyler
POST /api/v1/bugs
Content-Type: application/json

{ "title": "Sepet toplami yanlis", "severity": "MEDIUM" }`, en: `// FIX: the Content-Type header tells the server that the body is JSON
POST /api/v1/bugs
Content-Type: application/json

{ "title": "Sepet toplami yanlis", "severity": "MEDIUM" }` },
      hint: { tr: 'Gövde JSON olsa bile sunucu bunu `Content-Type: application/json` header\'ı olmadan bilemez; header eksikse gövdeyi ayrıştıramaz ve boş sanır.', en: 'Even if the body is JSON, the server cannot know that without the `Content-Type: application/json` header; missing it, the server cannot parse the body and treats it as empty.' },
      successMessage: { tr: 'Doğru! Bug\'ların çoğu body\'de değil, gözden kaçan bir header\'dadır — bunu test etmek tester\'ın işidir.', en: 'Correct! Most bugs live not in the body but in an overlooked header — testing that is the tester\'s job.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir POST /api/v1/bugs request\'i gövdesinde geçerli JSON var ama sunucu "title zorunlu" diyerek 400 dönüyor. En olası sessiz neden?', en: 'A POST /api/v1/bugs request has valid JSON in the body, but the server returns 400 saying "title required". Most likely silent cause?' },
      options: [
        { id: 'a', text: { tr: 'Sunucu çökmüş', en: 'The server crashed' } },
        { id: 'b', text: { tr: 'Content-Type header\'ı eksik/yanlış — sunucu gövdeyi ayrıştıramadı, boş sandı', en: 'The Content-Type header is missing/wrong — the server couldn\'t parse the body and treated it as empty' } },
        { id: 'c', text: { tr: 'URL yanlış', en: 'The URL is wrong' } },
        { id: 'd', text: { tr: 'severity değeri geçersiz', en: 'The severity value is invalid' } },
      ],
      correct: 'b',
      explanation: { tr: 'JSON geçerli olsa bile `Content-Type: application/json` yoksa sunucu gövdeyi JSON olarak ayrıştırmaz; `title` dahil tüm alanları boş görür ve "zorunlu alan yok" der. Belirti body gibi görünür ama kök neden header\'dır.', en: 'Even with valid JSON, without `Content-Type: application/json` the server does not parse the body as JSON; it sees all fields including `title` as empty and says "required field missing". The symptom looks like the body but the root cause is the header.' },
      retryQuestion: {
        question: { tr: 'Aynı URL\'e (`/api/v1/bugs`) hem "listeyi getir" hem "yeni ekle" diyebiliyorsak, iki request\'i birbirinden ne ayırır?', en: 'If to the same URL (`/api/v1/bugs`) we can say both "fetch the list" and "add a new one", what distinguishes the two requests?' },
        options: [
          { id: 'a', text: { tr: 'HTTP method (GET vs POST)', en: 'The HTTP method (GET vs POST)' } },
          { id: 'b', text: { tr: 'Sunucunun IP adresi', en: 'The server\'s IP address' } },
          { id: 'c', text: { tr: 'Request\'in gönderildiği saat', en: 'The time the request was sent' } },
          { id: 'd', text: { tr: 'Tarayıcının sürümü', en: 'The browser version' } },
        ],
        correct: 'a',
        explanation: { tr: 'URL NEREYE, method NE YAPILACAĞINI söyler. Aynı URL\'e GET "oku", POST "oluştur" der — method request\'in niyetini belirleyen parçadır.', en: 'The URL says WHERE, the method says WHAT TO DO. To the same URL, GET means "read", POST means "create" — the method is the part that defines the request\'s intent.' },
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
        tr: 'Bir HTTP response\'u, bir **teslimat makbuzu + paket** gibidir: en üstte büyük bir **damga** (status code — işlem başarılı mı, 200/201/404/500) vardır, altında **teslimat notları** (header\'lar — içerik tipi, önbellek, boyut) ve en sonda **paketin kendisi** (body — asıl veri) bulunur. Peki status kodu zaten "başarılı" diyorsa, neden body\'yi de kontrol edelim? Çünkü status yalnızca request\'in sunucuya ULAŞIP İŞLENDİĞİNİ söyler, içindeki verinin DOĞRU olduğunu değil: sunucu 200 döner ama `severity` alanı beklenenden farklı olabilir — yeşil ışık yanar ama araç yanlış yola gitmektedir. Java\'da bunun karşılığı bir metodun `return` değeridir: metot exception atmadan döndü diye (200) dönen nesnenin alanları doğru demek değildir; `assertEquals` ile içeriği de doğrularsın. QA açısından bu, "yanlış PASS"in doğduğu yerdir: sadece status koduna bakan bir test yeşil görünür ama gerçekte hatalı veriyi geçirir — production\'da sessiz bir bug olarak patlar.',
        en: 'An HTTP response is like a **delivery receipt + package**: at the top a big **stamp** (status code — did it succeed, 200/201/404/500), below it **delivery notes** (headers — content type, cache, size), and at the very end **the package itself** (body — the actual data). But if the status code already says "success", why also check the body? Because the status only tells you the request REACHED and was PROCESSED by the server, not that the data inside is CORRECT: the server returns 200 but the `severity` field may differ from what was expected — the light is green but the vehicle took the wrong road. In Java the equivalent is a method\'s `return` value: a method returning without throwing (200) does not mean the returned object\'s fields are right; you also verify the content with `assertEquals`. In QA this is where the "false PASS" is born: a test that only checks the status code looks green but actually lets wrong data through — it detonates as a silent bug in production.',
      },
    },
    { type: 'heading', text: { tr: 'Bir Response\'un Üç Parçası', en: 'The Three Parts of a Response' } },
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
          caption: { tr: 'Status kodu yalnızca "request işlendi" der. Asıl veri body\'dedir — ve orada `severity` beklenen `CRITICAL` yerine `LOW` dönmüş.', en: 'The status code only says "request processed". The actual data is in the body — and there `severity` came back `LOW` instead of the expected `CRITICAL`.' },
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
      question: { tr: 'Bir response\'u DOĞRU şekilde doğrulama sırasını diz (yalnız status yeterli değil).', en: 'Order the correct way to verify a response (status alone is not enough).' },
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
      starterCode: { tr: `// BUG: sadece status'a bakiyor -> yanlis veri gecer (yanlis PASS)
function verify(response) {
  return response.status === 200;
}`, en: `// BUG: only checks the status -> wrong data passes (false PASS)
function verify(response) {
  return response.status === 200;
}` },
      solutionCode: { tr: `// FIX: status + body birlikte dogrulanir
function verify(response) {
  if (response.status !== 200) return false;
  // govdedeki kritik alan da beklenen deger mi?
  return response.body.severity === "CRITICAL";
}`, en: `// FIX: status + body birlikte dogrulanir
function verify(response) {
  if (response.status !== 200) return false;
  // is the critical field in the body also the expected value?
  return response.body.severity === "CRITICAL";
}` },
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
        tr: 'HTTP metotları, bir bug kaydı üzerindeki **eylem fiilleridir**; tıpkı bir dosya dolabındaki hareketler gibi: **GET** = klasörü aç ve OKU (hiçbir şeyi değiştirmeden), **POST** = yeni bir kağıt EKLE, **PUT** = kağıdı komple YENİSİYLE DEĞİŞTİR, **PATCH** = kağıdın tek satırını DÜZELT, **DELETE** = kağıdı ÇÖPE AT. Peki hepsi "veriye dokunuyorsa" neden ayrı fiillere ihtiyaç var? Çünkü her fiilin **güvenlik ve tekrarlanabilirlik** sözü farklıdır: GET güvenlidir (100 kez çağır, hiçbir şey değişmez), POST idempotent DEĞİLDİR (iki kez çağırırsan iki kayıt), PUT/DELETE ise idempotenttir (beş kez çağır, sonuç bir kezki ile aynı). Java\'da bunun karşılığı bir metodun yan etkisidir: `getBug()` saf bir okuyucudur, `createBug()` her çağrıda listeyi büyütür, `deleteBug(id)` ilk çağrıda siler, sonrakiler zaten silinmişi bulur. QA açısından kritik: bir "ödeme" endpoint\'i POST ile yazıldıysa ve kullanıcı butona iki kez basarsa, idempotency yoksa **çift tahsilat** olur — testerın "aynı request\'i iki kez göndererek" bu sınıf hataları avlaması gerekir.',
        en: 'HTTP methods are the **action verbs** on a bug record; like moves on a filing cabinet: **GET** = open the folder and READ (changing nothing), **POST** = ADD a new sheet, **PUT** = REPLACE the sheet entirely with a new one, **PATCH** = FIX a single line of the sheet, **DELETE** = THROW the sheet away. But if they all "touch data", why need separate verbs? Because each verb\'s **safety and repeatability** promise differs: GET is safe (call it 100 times, nothing changes), POST is NOT idempotent (call it twice, two records), while PUT/DELETE are idempotent (call five times, same result as once). In Java the equivalent is a method\'s side effect: `getBug()` is a pure reader, `createBug()` grows the list on every call, `deleteBug(id)` deletes on the first call and finds it already gone afterwards. The QA crux: if a "payment" endpoint is written with POST and the user double-clicks, without idempotency you get a **double charge** — the tester must hunt this class of bugs by "sending the same request twice".',
      },
    },
    { type: 'heading', text: { tr: 'Beş Metod, Beş Söz', en: 'Five Methods, Five Promises' } },
    {
      type: 'table',
      headers: ['Method', { tr: 'Bug Tracker eylemi', en: 'Bug Tracker action' }, 'Body?', { tr: 'Güvenli', en: 'Safe' }, 'Idempotent'],
      rows: [
        ['GET', { tr: 'GET /api/v1/bugs — listeyi oku', en: 'GET /api/v1/bugs — read list' }, '❌', '✅', '✅'],
        ['POST', { tr: 'POST /api/v1/bugs — yeni bug oluştur', en: 'POST /api/v1/bugs — create' }, '✅', '❌', '❌'],
        ['PUT', { tr: 'PUT /api/v1/bugs/42 — komple değiştir', en: 'PUT /api/v1/bugs/42 — full replace' }, '✅', '❌', '✅'],
        ['PATCH', { tr: 'PATCH /api/v1/bugs/42/status — kısmi güncelle', en: 'PATCH /api/v1/bugs/42/status — partial' }, '✅', '❌', { tr: '⚠️ genelde', en: '⚠️ usually' }],
        ['DELETE', { tr: 'DELETE /api/v1/bugs/42 — sil', en: 'DELETE /api/v1/bugs/42 — remove' }, '❌', '❌', '✅'],
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
          caption: { tr: 'İkinci POST de gider — sunucu bunun aynı request olduğunu BİLMEZ, çünkü POST idempotent değildir. İkinci bir kayıt daha oluşturur (id: 43).', en: 'The second POST goes too — the server does NOT know it is the same request, because POST is not idempotent. It creates a second record (id: 43).' },
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
      question: { tr: 'Idempotency\'yi test etmek için "aynı request\'i iki kez gönderme" senaryosunu diz.', en: 'Order the "send the same request twice" scenario to test idempotency.' },
      items: [
        { id: '1', text: { tr: 'Başlangıç durumunu kaydet (kaç bug var?)', en: 'Record the initial state (how many bugs?)' }, order: 1 },
        { id: '2', text: { tr: 'Request\'i bir kez gönder ve sonucu gözle', en: 'Send the request once and observe the result' }, order: 2 },
        { id: '3', text: { tr: 'AYNI request\'i ikinci kez gönder', en: 'Send the SAME request a second time' }, order: 3 },
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
      starterCode: { tr: `// Gereksinim: mevcut bir bug'in SADECE status alanini "CLOSED" yap
// TODO: dogru metodu ve yolu sec (butun kaydi degistirme!)
??? /api/v1/bugs/42/???
{ "status": "CLOSED" }`, en: `// Requirement: set ONLY the status field of an existing bug to "CLOSED"
// TODO: pick the right method and path (do not replace the whole record!)
??? /api/v1/bugs/42/???
{ "status": "CLOSED" }` },
      solutionCode: { tr: `// PATCH sadece tek alani gunceller, diger alanlara dokunmaz
PATCH /api/v1/bugs/42/status
{ "status": "CLOSED" }`, en: `// PATCH updates only a single field, does not touch the others
PATCH /api/v1/bugs/42/status
{ "status": "CLOSED" }` },
      hint: { tr: 'Yalnızca tek bir alanı (status) değiştirmek istiyorsun. PUT tüm kaydı değiştirir ve göndermediğin alanları silebilir; kısmi güncelleme için PATCH kullan.', en: 'You want to change only a single field (status). PUT replaces the whole record and can drop fields you omit; use PATCH for partial updates.' },
      successMessage: { tr: 'Doğru! PATCH kısmi günceller — title ve severity gibi diğer alanlar korunur.', en: 'Correct! PATCH updates partially — other fields like title and severity are preserved.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir ödeme "Öde" butonu POST ile çalışıyor ve idempotency yok. Kullanıcı butona iki kez basarsa ne olur, tester bunu nasıl yakalar?', en: 'A payment "Pay" button uses POST with no idempotency. What happens on a double-click, and how does the tester catch it?' },
      options: [
        { id: 'a', text: { tr: 'Hiçbir şey; POST idempotenttir, ikinci request yok sayılır', en: 'Nothing; POST is idempotent, the second request is ignored' } },
        { id: 'b', text: { tr: 'Çift tahsilat olur; tester aynı POST\'u iki kez gönderip kayıt sayısını karşılaştırarak yakalar', en: 'A double charge occurs; the tester catches it by sending the same POST twice and comparing record counts' } },
        { id: 'c', text: { tr: 'Sunucu çöker (500)', en: 'The server crashes (500)' } },
        { id: 'd', text: { tr: 'URL 404 döner', en: 'The URL returns 404' } },
      ],
      correct: 'b',
      explanation: { tr: 'POST idempotent değildir: aynı request\'i iki kez göndermek iki ayrı kayıt/işlem yaratır — ödemede çift tahsilat. Tester bunu "aynı request\'i iki kez gönder, durumu karşılaştır" ile avlar; çözüm PUT veya idempotency-key\'dir.', en: 'POST is not idempotent: sending the same request twice creates two separate records/operations — a double charge in payments. The tester hunts it with "send twice, compare state"; the fix is PUT or an idempotency key.' },
      retryQuestion: {
        question: { tr: 'Bir GET /api/v1/bugs request\'ini 100 kez gönderdin. Sunucudaki bug sayısı nasıl değişir?', en: 'You sent a GET /api/v1/bugs request 100 times. How does the bug count on the server change?' },
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
        tr: 'Status kodları, sunucunun **trafik lambası**dır ama üç renkli değil, dört mahalleli: **2xx** = yeşil (başardım), **3xx** = tabela (başka yola git — yönlendirme), **4xx** = "senin hatan" (request yanlış: eksik alan, yanlış yol, yetkisiz), **5xx** = "benim hatam" (sunucu çöktü). Peki neden yüzlerce kod var, "başardı/başaramadı" iki değer yetmez mi? Çünkü bir testerın bir sonraki adımı **koda bağlıdır**: 4xx görürsen test verini/request\'ini düzeltirsin (bu senin işin), 5xx görürsen geliştiriciye escalate edersin (bu onların bug\'ı) — kodu yanlış okursan yanlış kişiyi suçlarsın. Java\'da bunun karşılığı exception türüdür: `IllegalArgumentException` (4xx, çağıran yanlış girdi verdi) ile `NullPointerException`/`SQLException` (5xx, kodun içi patladı) farkı; birini çağıran düzeltir, diğerini kodu yazan. QA açısından en pahalı karışıklık 401 (kimliğin yok) ile 403 (kimliğin var ama yetkin yok) arasındadır: birini diğeri sanmak, bir güvenlik açığını "login bug\'ı" diye kapatmana yol açar.',
        en: 'Status codes are the server\'s **traffic light**, but not three colors — four districts: **2xx** = green (I did it), **3xx** = a sign (go another way — redirect), **4xx** = "your fault" (bad request: missing field, wrong path, unauthorized), **5xx** = "my fault" (the server crashed). But why hundreds of codes — aren\'t two values, "succeeded/failed", enough? Because a tester\'s next move **depends on the code**: see 4xx and you fix your test data/request (your job), see 5xx and you escalate to the developer (their bug) — misread the code and you blame the wrong person. In Java the equivalent is the exception type: `IllegalArgumentException` (4xx, the caller passed bad input) vs `NullPointerException`/`SQLException` (5xx, the code blew up inside); the caller fixes one, the author fixes the other. In QA the costliest confusion is 401 (you have no identity) vs 403 (you have identity but no permission): mistaking one for the other makes you close a security hole as a "login bug".',
      },
    },
    { type: 'heading', text: { tr: 'Dört Mahalle ve Testerın Tepkisi', en: 'Four Districts and the Tester\'s Reaction' } },
    {
      type: 'visual', variant: 'pyramid',
      title: { tr: 'HTTP Status Grupları', en: 'HTTP Status Groups' },
      levels: [
        { label: { tr: '5xx — Sunucu Hatası (escalate)', en: '5xx — Server Error (escalate)' }, color: 'red', desc: { tr: '500 Internal · 502 Bad Gateway · 503 Unavailable', en: '500 Internal · 502 Bad Gateway · 503 Unavailable' } },
        { label: { tr: '4xx — İstemci Hatası (request\'i düzelt)', en: '4xx — Client Error (fix the request)' }, color: 'orange', desc: { tr: '400 · 401 kimlik yok · 403 yetki yok · 404 · 422', en: '400 · 401 no identity · 403 no permission · 404 · 422' } },
        { label: { tr: '3xx — Yönlendirme', en: '3xx — Redirection' }, color: 'yellow', desc: { tr: '301 kalıcı · 302 geçici · 304 değişmedi', en: '301 permanent · 302 temporary · 304 not modified' } },
        { label: { tr: '2xx — Başarı', en: '2xx — Success' }, color: 'green', desc: { tr: '200 OK · 201 Created · 204 No Content', en: '200 OK · 201 Created · 204 No Content' } },
      ],
      note: { tr: '2xx = geç. 4xx = request/veri/yetki senin tarafında yanlış. 5xx = sunucu bug\'ı, geliştiriciye escalate et.', en: '2xx = pass. 4xx = request/data/auth wrong on your side. 5xx = server bug, escalate to the developer.' },
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
        { id: 1, icon: '🟠', label: { tr: '4xx görürsen…', en: 'If you see 4xx…' }, detail: { tr: '4xx = request senin tarafında yanlış: eksik alan (400), kimlik yok (401), yetki yok (403), yol yok (404). Önce request\'ini/verini düzelt.', en: '4xx = the request is wrong on your side: missing field (400), no identity (401), no permission (403), no path (404). Fix your request/data first.' } },
        { id: 2, icon: '🔴', label: { tr: '5xx görürsen…', en: 'If you see 5xx…' }, detail: { tr: '5xx = sunucu içi patladı (500) veya erişilemez (503). Request\'in doğruydu; bu geliştiricinin bug\'ıdır, escalate et.', en: '5xx = the server blew up inside (500) or is unreachable (503). Your request was fine; this is the developer\'s bug, escalate.' } },
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
        { id: '3', text: { tr: '4xx ise request\'i/veriyi/yetkiyi kontrol et', en: 'If 4xx, check the request/data/permission' }, order: 3 },
        { id: '4', text: { tr: '5xx ise request\'inin doğruluğunu teyit et, sonra escalate', en: 'If 5xx, confirm your request is valid, then escalate' }, order: 4 },
        { id: '5', text: { tr: 'Bulguyu doğru ekibe yönlendirerek raporla', en: 'Report by routing the finding to the right team' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-a5-status-codes',
      id: 'api-a5-status-codes',
      title: { tr: 'Kendin Dene: Doğru Status Kodunu Eşle', en: 'Try It Yourself: Match the Right Status Code' },
      starterCode: { tr: `// Durum: gecerli token var ama kullanici baskasinin bug'ini silmeye calisiyor
// TODO: sunucu hangi status kodunu donmeli? (401 mi 403 mu?)
DELETE /api/v1/bugs/42  ->  ??? `, en: `// Situation: a valid token exists but the user tries to delete someone else's bug
// TODO: which status code should the server return? (401 or 403?)
DELETE /api/v1/bugs/42  ->  ??? ` },
      solutionCode: { tr: `// Kimlik var (token gecerli) ama YETKI yok -> 403 Forbidden
DELETE /api/v1/bugs/42  ->  403 Forbidden`, en: `// Identity exists (token valid) but NO PERMISSION -> 403 Forbidden
DELETE /api/v1/bugs/42  ->  403 Forbidden` },
      hint: { tr: 'Token geçerli olduğu için kimlik (authentication) sorunu YOK — o 401 olurdu. Sorun izin (authorization): kullanıcı tanınıyor ama bu işlemi yapamaz. Bu 403\'tür.', en: 'Since the token is valid there is NO authentication problem — that would be 401. The problem is authorization: the user is recognized but cannot do this. That is 403.' },
      successMessage: { tr: 'Doğru! 403, başkasının verisine erişebildiğini gösterebilir — bir IDOR açığının ilk işareti olabilir.', en: 'Correct! A 403 can reveal you can reach another\'s data — possibly the first sign of an IDOR hole.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir POST /api/v1/bugs request\'i 500 Internal Server Error döndü. Tester\'ın doğru ilk hamlesi nedir?', en: 'A POST /api/v1/bugs request returned 500 Internal Server Error. What is the tester\'s correct first move?' },
      options: [
        { id: 'a', text: { tr: 'Test verisini değiştirip tekrar dener, çünkü hata onun tarafındadır', en: 'Change the test data and retry, since the error is on their side' } },
        { id: 'b', text: { tr: 'Request\'inin geçerliliğini teyit eder, sonra geliştiriciye escalate eder — 5xx sunucu bug\'ıdır', en: 'Confirms the request is valid, then escalates to the developer — 5xx is a server bug' } },
        { id: 'c', text: { tr: 'Hatayı görmezden gelir', en: 'Ignores the error' } },
        { id: 'd', text: { tr: 'Bug\'ı "kullanıcı hatası" olarak kapatır', en: 'Closes the bug as "user error"' } },
      ],
      correct: 'b',
      explanation: { tr: '5xx = sunucu içi patladı; request\'in geçerliyse bu geliştiricinin bug\'ıdır. 4xx olsaydı request\'i/veriyi düzeltmek testerın işi olurdu. Kodu yanlış okuyup 500\'ü "kendi hatam" sanmak gerçek bug\'ı gizler.', en: '5xx = the server blew up inside; if your request is valid this is the developer\'s bug. A 4xx would make fixing the request/data the tester\'s job. Misreading it and treating a 500 as "my fault" hides a real bug.' },
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
        tr: 'Header\'lar, bir kargonun üstündeki **etiketler ve gümrük evraklarıdır**: paketin içine (body) dokunmadan "bu ne, nasıl açılmalı, kim gönderiyor, saklanabilir mi" sorularını cevaplarlar. **Content-Type** = "içerideki paket JSON\'dır" (sunucu böyle ayrıştırır), **Accept** = "bana JSON dilinde cevap ver" (istemcinin tercihi), **Authorization** = "kimliğim bu" (Bearer token), **Cache-Control** = "bu paketi saklama / şu kadar sakla". Peki veri zaten body\'de gidiyorsa, bu görünmez etiketler neden bu kadar önemli? Çünkü header yanlış/eksikse body doğru olsa bile işlem çöker: `Content-Type` eksikse sunucu JSON\'ı düz metin sanır, `Authorization` eksikse 401 alırsın, `Cache-Control` yanlışsa eski veri önbellekten döner ve testin "phantom" bir bug görür. Java\'da bunun karşılığı `@RequestHeader` ve `HttpHeaders`\'tır; header\'lar metot parametresi gibi davranışı yönlendirir. QA açısından header\'lar en sinsi bug kaynağıdır çünkü GÖRÜNMEZLER: Postman\'de çalışan bir request, otomasyonda header unutulduğu için düşer ve saatlerce "kod aynı ama sonuç farklı" diye debug edilir.',
        en: 'Headers are the **labels and customs paperwork** on a parcel: without touching the contents (body), they answer "what is this, how should it be opened, who sends it, can it be cached". **Content-Type** = "the package inside is JSON" (so the server parses it that way), **Accept** = "reply to me in JSON" (the client\'s preference), **Authorization** = "this is my identity" (Bearer token), **Cache-Control** = "don\'t cache this / cache for this long". But if the data already travels in the body, why do these invisible labels matter so much? Because if a header is wrong/missing, the operation fails even with a correct body: missing `Content-Type` and the server treats JSON as plain text, missing `Authorization` and you get 401, wrong `Cache-Control` and stale data returns from cache so the test sees a "phantom" bug. In Java the equivalent is `@RequestHeader` and `HttpHeaders`; headers steer behavior like method parameters. In QA headers are the most insidious bug source because they are INVISIBLE: a request that works in Postman fails in automation because a header was forgotten, and gets debugged for hours as "same code, different result".',
      },
    },
    { type: 'heading', text: { tr: 'Bir Testerın Bilmesi Gereken Dört Header', en: 'Four Headers a Tester Must Know' } },
    {
      type: 'table',
      headers: ['Header', { tr: 'Anlam', en: 'Meaning' }, { tr: 'Eksikse', en: 'If missing' }],
      rows: [
        ['Content-Type', { tr: 'Gövdenin tipi (request)', en: 'body type (request)' }, { tr: 'JSON ayrıştırılamaz, boş body', en: 'JSON unparsed, empty body' }],
        ['Accept', { tr: 'İstenen response tipi', en: 'desired response type' }, { tr: '406 veya beklenmeyen format', en: '406 or unexpected format' }],
        ['Authorization', { tr: 'Kimlik (Bearer token)', en: 'identity' }, '401 Unauthorized'],
        ['Cache-Control', { tr: 'Önbellek politikası', en: 'cache policy' }, { tr: 'Eski veri döner (phantom bug)', en: 'stale data (phantom bug)' }],
      ],
    },
    {
      type: 'video-scene',
      id: 'api-a6-headers-film',
      title: { tr: '🎬 Görünmez Suçlu: Postman\'de Çalışıp Otomasyonda Düşen Request', en: '🎬 The Invisible Culprit: Works in Postman, Fails in Automation' },
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
          caption: { tr: 'Aynı POST /api/v1/bugs request\'i Postman\'de 201 döner ama otomasyon testinde 400 verir. Kod aynı — fark ne?', en: 'The same POST /api/v1/bugs returns 201 in Postman but 400 in the automation test. The code is identical — what differs?' },
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
        { id: 1, icon: '🔑', label: { tr: 'Bearer token gönderilir…', en: 'Bearer token is sent…' }, detail: { tr: '`Authorization: Bearer <token>` header\'ı request\'in kimliğini taşır — sunucu bununla "sen kimsin"i bilir.', en: 'The `Authorization: Bearer <token>` header carries the request\'s identity — with it the server knows "who you are".' } },
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
        { id: '3', text: { tr: 'Otomasyon request\'inin header\'larını yan yana koy', en: 'Put the automation request\'s headers side by side' }, order: 3 },
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
      starterCode: `// BUG: korumali endpoint'e header'siz request -> 401 doner
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
      question: { tr: 'Bir request Postman\'de 201, otomasyonda 400 ("title zorunlu") dönüyor ama iki tarafta da title gönderiliyor. En olası kök neden?', en: 'A request returns 201 in Postman but 400 ("title required") in automation, yet title is sent in both. Most likely root cause?' },
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
          { id: 'a', text: { tr: 'İstemcinin hangi formatta response istediğini söyler (ör. application/json)', en: 'Tells which format the client wants back (e.g. application/json)' } },
          { id: 'b', text: { tr: 'Request\'in gövdesini şifreler', en: 'Encrypts the request body' } },
          { id: 'c', text: { tr: 'Sunucuyu yeniden başlatır', en: 'Restarts the server' } },
          { id: 'd', text: { tr: 'Token üretir', en: 'Generates a token' } },
        ],
        correct: 'a',
        explanation: { tr: 'Accept, istemcinin tercih ettiği response formatını belirtir. Content-Type request\'in gövde tipini, Accept ise beklenen response tipini söyler — ikisi farklı yönlerdir.', en: 'Accept states the client\'s preferred response format. Content-Type describes the request body type, while Accept states the expected response type — two different directions.' },
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
          caption: { tr: 'İki farklı response: birinde `reporter: null`, diğerinde reporter alanı HİÇ yok. Gözle bakınca ikisi de "boş" görünür.', en: 'Two different responses: one has `reporter: null`, the other has NO reporter field at all. To the eye both look "empty".' },
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
      question: { tr: 'Bir JSON response\'unda bir alanın "null mı, yok mu" olduğunu doğru test etme sırasını diz.', en: 'Order the correct way to test whether a field is "null or missing" in a JSON response.' },
      items: [
        { id: '1', text: { tr: 'Response\'u JSON olarak ayrıştır', en: 'Parse the response as JSON' }, order: 1 },
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
      starterCode: { tr: `// BUG: bu kontrol null ile "alan yok"u AYIRAMAZ (ikisi de false)
function hasReporterField(bug) {
  return Boolean(bug.reporter);
}`, en: `// BUG: this check CANNOT distinguish null from "field absent" (both are false)
function hasReporterField(bug) {
  return Boolean(bug.reporter);
}` },
      solutionCode: { tr: `// FIX: anahtarin VARLIGINI ayrica kontrol et
function hasReporterField(bug) {
  // "reporter" anahtari var mi? null bile olsa true doner
  return "reporter" in bug;
}`, en: `// FIX: also check the EXISTENCE of the key
function hasReporterField(bug) {
  // does the "reporter" key exist? returns true even if null
  return "reporter" in bug;
}` },
      hint: { tr: '`Boolean(bug.reporter)` hem `null` hem "alan yok" durumunda false verir. Anahtarın varlığını test etmek için `"reporter" in bug` kullan; bu, değer null olsa bile anahtar varsa true döner.', en: '`Boolean(bug.reporter)` returns false for both `null` and "field missing". To test key existence use `"reporter" in bug`; it returns true when the key exists even if the value is null.' },
      successMessage: { tr: 'Doğru! Artık "alan null döndü" (veri) ile "alan kayboldu" (contract regresyonu) durumlarını ayırabilirsin.', en: 'Correct! Now you can separate "field returned null" (data) from "field vanished" (contract regression).' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir API response\'unda `reporter` alanı bir gün tamamen kayboldu (önceden null dönüyordu). `if (bug.reporter)` yazan test hâlâ yeşil. Bu neden tehlikeli?', en: 'In an API response the `reporter` field vanished one day (it used to return null). A test writing `if (bug.reporter)` still passes green. Why is this dangerous?' },
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
        tr: 'Bir Spring Boot projesi kurmak, bir **restoran açmadan önce mutfağı döşemek** gibidir: henüz tek bir yemek (endpoint) yapmadan önce ocağı, tezgahı ve elektriği (web sunucusu, dependency\'ler, çalıştırma mekanizması) hazırlarsın. `spring-boot-starter-web` bir "başlangıç paketi"dir — tek satır bağımlılık eklersin, arkasında gömülü bir Tomcat sunucusu, JSON dönüştürücü (Jackson) ve tüm web altyapısı gelir. Peki neden her parçayı tek tek eklemek yerine bir "starter" kullanıyoruz? Çünkü uyumlu sürümleri elle eşleştirmek (Tomcat X, Jackson Y, Spring Z) saatler alır ve bir sürüm çakışması tüm uygulamayı çökertir; starter bu uyumlu seti tek kararla getirir. Bunun tester için anlamı: API henüz "iş" yapmasa da `mvn spring-boot:run` ile ayağa kalkmalı ve boş bir `/api/v1/bugs` bile bir response dönebilmelidir — kurulum kırıksa hiçbir test koşamaz. QA açısından ilk "smoke test", uygulamanın hiç hata vermeden başlayıp bir port dinlemesidir; bu geçmeden fonksiyonel testlere geçmek zaman kaybıdır.',
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
        tr: '**🐞 Defect Doğum Anı — `spring-boot-starter-validation` unutulursa**\n\n**Kod:** `pom.xml`\'e sadece `starter-web` eklendi, `starter-validation` YOK.\n\n**Ne olur:** B6\'da `@Valid` ile `@NotBlank` yazarsın ama sınıf yolunda validation kütüphanesi olmadığı için Spring bu annotation\'ları SESSİZCE görmezden gelir. `POST /api/v1/bugs { "title": "" }` request\'i 400 yerine 201 döner ve boş başlıklı bug kaydedilir.\n\n**Neden sinsi:** Kod derlenir, uygulama başlar, `@Valid` orada durur — hiçbir hata yok. Sadece çalışma zamanında "doğrulama hiç tetiklenmiyor" fark edilir, o da ancak biri boş title göndermeyi denerse.\n\n**Tester nerede yakalar:** Kurulum sonrası ilk negatif testte — boş `title` gönderip 400 beklerken 201 alınca. Bu, "dependency eksikliğinin sessiz davranış değişikliğine" yol açtığının kanıtıdır.',
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
          caption: { tr: '`mvn spring-boot:run` — uygulama 8080 portunu dinlemeye başlar. Artık istemciler request gönderebilir.', en: '`mvn spring-boot:run` — the app starts listening on port 8080. Clients can now send requests.' },
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
      title: { tr: 'Kurulumdan İlk Response\'a', en: 'From Setup to First Response' },
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
        { id: '5', text: { tr: 'curl ile smoke test at, uygulamanın response verdiğini doğrula', en: 'Run a smoke test with curl, verify the app responds' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b1-skeleton',
      id: 'api-b1-skeleton',
      title: { tr: 'Kendin Dene: Eksik Bağımlılığı Ekle', en: 'Try It Yourself: Add the Missing Dependency' },
      starterCode: { tr: `<!-- BUG: @Valid kullanacagiz ama validation starter'i eksik -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>`, en: `<!-- BUG: we will use @Valid but the validation starter is missing -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>` },
      solutionCode: { tr: `<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <!-- @Valid annotation'larinin CALISMASI icin sart -->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>`, en: `<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <!-- required for the @Valid annotations to WORK -->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>` },
      hint: { tr: '`@Valid`/`@NotBlank` gibi Bean Validation annotation\'ları yalnızca sınıf yolunda validation kütüphanesi varsa çalışır. `spring-boot-starter-validation` eklenmezse annotation\'lar sessizce yok sayılır.', en: 'Bean Validation annotations like `@Valid`/`@NotBlank` only work if a validation library is on the classpath. Without `spring-boot-starter-validation` the annotations are silently ignored.' },
      successMessage: { tr: 'Doğru! Artık B6\'da yazacağın @Valid gerçekten tetiklenecek ve boş title 400 dönecek.', en: 'Correct! Now the @Valid you\'ll write in B6 actually fires and an empty title returns 400.' },
    },
    {
      type: 'quiz',
      question: { tr: '`spring-boot-starter-validation` eklenmeden `@Valid` + `@NotBlank` yazılırsa ne olur?', en: 'What happens if `@Valid` + `@NotBlank` are written without adding `spring-boot-starter-validation`?' },
      options: [
        { id: 'a', text: { tr: 'Derleme hatası verir, uygulama başlamaz', en: 'A compile error, the app won\'t start' } },
        { id: 'b', text: { tr: 'Annotation\'lar sessizce yok sayılır; boş title 400 yerine 201 döner', en: 'The annotations are silently ignored; empty title returns 201 instead of 400' } },
        { id: 'c', text: { tr: 'Sunucu her request\'te çöker', en: 'The server crashes on every request' } },
        { id: 'd', text: { tr: 'Tüm request\'ler 401 döner', en: 'All requests return 401' } },
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
        tr: '**🐞 Defect Doğum Anı — `severity` enum yerine `String` bırakılırsa**\n\n**Kod:** `private String severity;` (enum DEĞİL).\n\n**Ne olur:** `POST /api/v1/bugs { "severity": "acil" }` request\'i 400 yerine 201 döner; veritabanına geçersiz bir öncelik yazılır. Bir gün sonra "kritik bugları getir" filtresi (`severity == "CRITICAL"`) bu kaydı ISKALAR — kritik bir bug rapor ekranında hiç görünmez.\n\n**Neden sinsi:** Kayıt başarıyla oluşur (201), UI onu listeler, hiçbir hata yoktur. Sorun ancak bir filtre/rapor çalışınca, hem de sessizce ortaya çıkar: yanlış yazılmış öncelik bir "hayalet kayıt" olur.\n\n**Tester nerede yakalar:** Negatif testte — geçersiz bir `severity` değeri (`"acil"`, `"critical"`, `"5"`) gönderip 400 beklerken 201 alınca. Enum olsaydı sunucu bu değeri deserialization\'da reddederdi.',
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
          caption: { tr: 'Bir request geçersiz bir öncelikle geliyor: `severity: "acil"` — bu dört geçerli değerden biri değil. Ne olacak, modele bağlı.', en: 'A request arrives with an invalid priority: `severity: "urgent"` — not one of the four valid values. What happens depends on the model.' },
          positions: { req: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Model enum ise: deserialization bir kapı gibi çalışır, "acil" tanınmaz ve request 400 ile REDDEDİLİR. Geçersiz veri hiç içeri girmez.', en: 'If the model is an enum: deserialization acts like a gate, "urgent" is unrecognized, and the request is REJECTED with 400. Invalid data never gets in.' },
          code: { tr: '400 Bad Request -> gecersiz severity', en: '400 Bad Request -> invalid severity' },
          positions: { req: { x: 22, y: 40 }, enumGate: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'req', to: 'enumGate', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ama model String ise kapı YOKTUR: "acil" olduğu gibi kabul edilir ve veritabanına yazılır. Request 201 döner — sorun görünmez.', en: 'But if the model is a String there is NO gate: "urgent" is accepted as-is and written to the database. The request returns 201 — the problem is invisible.' },
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
      starterCode: { tr: `// BUG: severity String -> "acil" gibi gecersiz deger kabul edilir
public class Bug {
    private String title;
    private String severity;   // <- sorun burada
}`, en: `// BUG: severity is a String -> an invalid value like "acil" is accepted
public class Bug {
    private String title;
    private String severity;   // <- sorun burada
}` },
      solutionCode: { tr: `// FIX: enum sadece 4 gecerli degeri kabul eder, gerisini kapida reddeder
public class Bug {
    private String title;
    private Severity severity;
}
public enum Severity { LOW, MEDIUM, HIGH, CRITICAL }`, en: `// FIX: the enum accepts only the 4 valid values, rejects the rest at the gate
public class Bug {
    private String title;
    private Severity severity;
}
public enum Severity { LOW, MEDIUM, HIGH, CRITICAL }` },
      hint: { tr: '`String severity` her metni kabul eder (`"acil"`, `"Critical"`, `"5"`). Bir `enum Severity { LOW, MEDIUM, HIGH, CRITICAL }` tanımlarsan geçersiz değerler deserialization\'da 400 ile reddedilir.', en: 'A `String severity` accepts any text (`"urgent"`, `"Critical"`, `"5"`). Define an `enum Severity { LOW, MEDIUM, HIGH, CRITICAL }` and invalid values are rejected with 400 during deserialization.' },
      successMessage: { tr: 'Doğru! Artık geçersiz öncelikler daha kapıda reddedilir — hayalet kayıt oluşmaz.', en: 'Correct! Now invalid priorities are rejected at the gate — no ghost records.' },
    },
    {
      type: 'quiz',
      question: { tr: '`severity` alanı `String` olarak bırakılırsa, `POST { "severity": "acil" }` request\'i ne döner ve asıl risk nedir?', en: 'If `severity` is left as a `String`, what does `POST { "severity": "urgent" }` return, and what is the real risk?' },
      options: [
        { id: 'a', text: { tr: '400 döner, risk yok', en: '400, no risk' } },
        { id: 'b', text: { tr: '201 döner; geçersiz değer kaydedilir ve "kritik" filtreleri onu ıskalar (hayalet kayıt)', en: '201; the invalid value is saved and "critical" filters miss it (a ghost record)' } },
        { id: 'c', text: { tr: '500 döner', en: '500' } },
        { id: 'd', text: { tr: 'Kayıt hiç oluşmaz', en: 'No record is created' } },
      ],
      correct: 'b',
      explanation: { tr: 'String her metni kabul eder, bu yüzden request 201 döner ve geçersiz "acil" değeri kaydedilir. Sonrasında `severity == "CRITICAL"` filtresi bu kaydı ıskalar; kritik bir bug raporlarda görünmez. Enum kullanmak geçersiz değeri deserialization\'da 400 ile reddederdi.', en: 'A String accepts any text, so the request returns 201 and the invalid "urgent" value is saved. Later a `severity == "CRITICAL"` filter misses this record; a critical bug is invisible in reports. Using an enum would reject the invalid value with 400 during deserialization.' },
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
        tr: '**🐞 Defect Doğum Anı — `findById` `null` yerine boş `Optional` dönmezse**\n\n**Kod:** `public Bug findById(Long id) { return store.get(id); }` — kayıt yoksa doğrudan `null` döner (Optional yok).\n\n**Ne olur:** Servis katmanı `repository.findById(999).getSeverity()` çağırdığında, olmayan kayıt `null` döner ve `.getSeverity()` bir **NullPointerException** fırlatır. Sonuç: `GET /api/v1/bugs/999` request\'i 404 yerine **500 Internal Server Error** döner.\n\n**Neden sinsi:** "Kayıt bulunamadı" aslında normal, beklenen bir durumdur (404) — ama `null` döndürmek onu bir sunucu çökmesine (500) çevirir. Belirtiye bakan tester "sunucu bug\'ı" der, oysa kök neden eksik bir null-güvenliğidir.\n\n**Tester nerede yakalar:** Olmayan bir id ile `GET /api/v1/bugs/999` gönderip 404 beklerken 500 alınca. `Optional` döndürmek, üst katmanı "yoksa 404 dön" demeye zorlar ve çökmeyi engeller.',
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
          caption: { tr: 'Bir request olmayan bir kaydı istiyor: GET /api/v1/bugs/999. Repository ne dönerse sonuç ona bağlı.', en: 'A request wants a nonexistent record: GET /api/v1/bugs/999. The outcome depends on what the repository returns.' },
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
          caption: { tr: 'Boş Optional üst katmanı "yoksa 404 dön" demeye zorlar. İstemci doğru, beklenen response\'u alır: 404 Not Found.', en: 'An empty Optional forces the upper layer to say "return 404 if absent". The client gets the correct, expected response: 404 Not Found.' },
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
      starterCode: { tr: `// BUG: kayit yoksa null doner -> ust katmanda NPE -> 500
public Bug findById(Long id) {
    return store.get(id);
}`, en: `// BUG: returns null when there is no record -> NPE in the upper layer -> 500
public Bug findById(Long id) {
    return store.get(id);
}` },
      solutionCode: { tr: `// FIX: Optional "yok" durumunu acikca temsil eder -> ust katman 404 doner
public Optional<Bug> findById(Long id) {
    return Optional.ofNullable(store.get(id));
}`, en: `// FIX: Optional explicitly represents the "absent" case -> the upper layer returns 404
public Optional<Bug> findById(Long id) {
    return Optional.ofNullable(store.get(id));
}` },
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
        tr: 'Service katmanı, API\'nin **karar veren yöneticisidir**: repository ham depolamayı yapar, controller request\'i karşılar — ama "bir CLOSED bug tekrar açılabilir mi?", "aynı başlıkla iki bug oluşturulabilir mi?" gibi **iş kuralları** burada yaşar. Peki bu kuralları neden controller\'a ya da repository\'ye koymuyoruz, orada da çalışmaz mı? Çünkü iş kuralı controller\'a girerse her yeni giriş noktası (REST, mesaj kuyruğu, zamanlanmış görev) aynı kuralı tekrar yazmak zorunda kalır ve biri sessizce farklılaşır; repository\'ye girerse depolama teknolojisiyle iş mantığı birbirine yapışır. Service, kuralların **tek doğru kaynağıdır**. Java\'da bunun karşılığı, bir `@Service` sınıfında toplanan ve `@Transactional` ile korunan iş mantığıdır; controller sadece "bunu yap" der, nasıl yapıldığını bilmez. QA açısından service katmanı, en değerli hataların yaşadığı yerdir: bir alan validasyonu değil, bir **iş kuralı ihlali** (kapalı bug\'ın yeniden açılması, çift kayıt) çoğu zaman UI\'dan görünmez ama veriyi sessizce bozar — testerın bu kuralları senaryo bazlı (state geçişleri) test etmesi gerekir.',
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
        tr: '**🐞 Defect Doğum Anı — "zaten CLOSED" kuralı unutulursa**\n\n**Kod:** `closeBug` içindeki `if (bug.getStatus() == Status.CLOSED) throw ...` kontrolü YOK; metot doğrudan status\'u CLOSED yapıp kaydediyor.\n\n**Ne olur:** Zaten kapalı bir bug\'a tekrar `PATCH /api/v1/bugs/42/status {"status":"CLOSED"}` gönderilince request 409/400 yerine 200 döner. Görünürde sorun yok ama eğer kapatma işlemi bir sayaç artırıyor, bildirim gönderiyor veya bir SLA kronometresi durduruyorsa, bu işlemler İKİNCİ kez tetiklenir — çift bildirim, yanlış metrik.\n\n**Neden sinsi:** Tek bir request\'te hiçbir şey görünmez; kayıt zaten CLOSED\'du, yine CLOSED. Yan etkiler (bildirim, metrik) sessizce tekrarlanır ve ancak raporlar tutarsızlaşınca fark edilir.\n\n**Tester nerede yakalar:** State-geçiş testinde — bir bug\'ı kapat, sonra AYNI kapatmayı tekrar gönder; ikinci request\'te hata (409 Conflict) bekle. İş kuralı yoksa ikinci kapatma sessizce geçer.',
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
          caption: { tr: 'Aynı kapatma request\'i tekrar geliyor (çift tık, retry, race). Kayıt zaten CLOSED. Şimdi iş kuralı devreye girmeli.', en: 'The same close request arrives again (double click, retry, race). The record is already CLOSED. Now the business rule must step in.' },
          positions: { close2: { x: 30, y: 50, pulse: true }, rule: { x: 62, y: 50, scale: 1.1 } },
          beams: [{ from: 'close2', to: 'rule', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Kural VARSA: "zaten CLOSED" kontrolü ikinci request\'i 409 Conflict ile reddeder. Yan etki bir kez çalışır. Sistem tutarlı kalır.', en: 'If the rule EXISTS: the "already CLOSED" check rejects the second request with 409 Conflict. The side effect runs once. The system stays consistent.' },
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
        { id: 1, icon: '🎛️', label: { tr: 'Controller sadece kapı…', en: 'Controller is just a door…' }, detail: { tr: 'Controller request\'i alır ve service\'e devreder; iş kuralı bilmez. Farklı giriş noktaları aynı service\'i kullanır.', en: 'The controller receives the request and delegates to the service; it knows no rule. Different entry points use the same service.' } },
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
        { id: '3', text: { tr: 'AYNI kapatma request\'ini tekrar gönder', en: 'Send the SAME close request again' }, order: 3 },
        { id: '4', text: { tr: 'İkinci request\'te 409 Conflict bekle', en: 'Expect 409 Conflict on the second request' }, order: 4 },
        { id: '5', text: { tr: 'Yan etkinin (bildirim/metrik) tek kez çalıştığını doğrula', en: 'Verify the side effect (notification/metric) ran only once' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b4-service',
      id: 'api-b4-service',
      title: { tr: 'Kendin Dene: İş Kuralını Ekle', en: 'Try It Yourself: Add the Business Rule' },
      starterCode: { tr: `// BUG: zaten CLOSED bir bug tekrar kapatilabiliyor -> yan etki iki kez calisir
public Bug closeBug(Long id) {
    Bug bug = repository.findById(id).orElseThrow(() -> new BugNotFoundException(id));
    bug.setStatus(Status.CLOSED);
    return repository.save(bug);
}`, en: `// BUG: an already CLOSED bug can be closed again -> the side effect runs twice
public Bug closeBug(Long id) {
    Bug bug = repository.findById(id).orElseThrow(() -> new BugNotFoundException(id));
    bug.setStatus(Status.CLOSED);
    return repository.save(bug);
}` },
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
      question: { tr: 'Service\'te "zaten CLOSED reddedilir" kuralı yoksa, kapalı bir bug\'a ikinci kez kapatma request\'i gelince asıl risk nedir?', en: 'Without the "reject if already CLOSED" rule in the service, what is the real risk when a second close request hits a closed bug?' },
      options: [
        { id: 'a', text: { tr: 'Hiç risk yok, status zaten CLOSED', en: 'No risk, the status is already CLOSED' } },
        { id: 'b', text: { tr: 'Kapatmanın yan etkileri (bildirim, SLA, metrik) ikinci kez tetiklenir — sessiz veri/metrik bozulması', en: 'The close\'s side effects (notification, SLA, metric) fire a second time — silent data/metric corruption' } },
        { id: 'c', text: { tr: 'Sunucu çöker', en: 'The server crashes' } },
        { id: 'd', text: { tr: 'URL 404 döner', en: 'The URL returns 404' } },
      ],
      correct: 'b',
      explanation: { tr: 'Status görünürde değişmese de, kapatma işlemine bağlı yan etkiler (bildirim gönderme, metrik artırma, SLA durdurma) ikinci request\'te tekrar çalışır. İş kuralı (zaten CLOSED ise 409) bu tekrarı engeller. Tester bunu state-geçiş senaryosuyla yakalar.', en: 'Even if the status seems unchanged, side effects tied to closing (sending notifications, incrementing metrics, stopping SLA) run again on the second request. The business rule (409 if already CLOSED) prevents the repeat. The tester catches it with a state-transition scenario.' },
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
        tr: 'Controller katmanı, API\'nin **resepsiyon görevlisidir**: gelen HTTP request\'ini karşılar, "hangi yol, hangi metod, hangi parametreler" diye ayrıştırır ve doğru service metoduna yönlendirir — kendisi iş yapmaz, yönlendirir. İki tür parametreyi ayırt eder: **path variable** (yolun İÇİNDE, bir kaynağı KİMLİKLER — `/api/v1/bugs/42`\'deki `42`) ve **query param** (yolun SONUNDA `?` ile, listeyi SÜZER/sayfalar — `?status=OPEN&page=2`). Peki ikisi de "parametre" ise neden ayrı kavramlar? Çünkü niyetleri farklıdır: path variable "hangi kaydı" (tekil, zorunlu), query param "nasıl filtreleyeyim" (opsiyonel, çoğul) der — birini diğerinin yerine koymak URL tasarımını ve testleri bozar. Java\'da bunun karşılığı `@PathVariable Long id` ile `@RequestParam(required=false) String status` ayrımıdır; Spring bu annotation\'larla URL parçalarını metot parametrelerine bağlar. QA açısından controller, **sınır testlerinin** kapısıdır: eksik/yanlış tipte path variable (`/bugs/abc`), tanımsız query param, sayfalama sınırları (`page=-1`, `size=99999`) — bu girdiler çoğu bug\'ın doğduğu yerdir ve controller seviyesinde test edilir.',
        en: 'The controller layer is the API\'s **receptionist**: it receives the incoming HTTP request, parses "which path, which method, which parameters", and routes to the right service method — it does no work itself, it routes. It distinguishes two parameter kinds: a **path variable** (INSIDE the path, IDENTIFIES a resource — the `42` in `/api/v1/bugs/42`) and a **query param** (at the END with `?`, FILTERS/paginates the list — `?status=OPEN&page=2`). But if both are "parameters", why separate concepts? Because their intents differ: a path variable says "which record" (singular, required), a query param says "how do I filter" (optional, plural) — swapping one for the other breaks URL design and tests. In Java the equivalent is the `@PathVariable Long id` vs `@RequestParam(required=false) String status` distinction; Spring binds URL parts to method parameters via these annotations. In QA the controller is the gate of **boundary tests**: missing/wrong-typed path variable (`/bugs/abc`), undefined query param, pagination bounds (`page=-1`, `size=99999`) — these inputs are where most bugs are born and are tested at the controller level.',
      },
    },
    { type: 'heading', text: { tr: 'Controller: Yol, Path Variable, Query Param', en: 'Controller: Path, Path Variable, Query Param' } },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugController.java — request\'leri karsilar ve service'e yonlendirir
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
        tr: '**🐞 Defect Doğum Anı — sayfalama `size` sınırlanmazsa**\n\n**Kod:** `@RequestParam(defaultValue = "20") int size` — üst sınır yok; `size` doğrudan service\'e/DB\'ye geçiyor.\n\n**Ne olur:** `GET /api/v1/bugs?size=1000000` request\'i milyonlarca kaydı tek response\'ta çekmeye çalışır. Sunucu belleği şişer, response saniyelerce sürer veya OutOfMemory ile 500 döner. Kötü niyetli tek bir request servisi yavaşlatabilir (DoS).\n\n**Neden sinsi:** Normal kullanımda (`size=20`) her şey mükemmel çalışır, testler geçer. Sorun yalnızca sınır-dışı bir değerle ortaya çıkar — kimse "ya biri size=1000000 gönderirse?" diye düşünmediği için production\'a kadar gizli kalır.\n\n**Tester nerede yakalar:** Sınır testinde — `size=0`, `size=-1`, `size=999999` gönderip makul bir davranış (400 veya sabit üst sınıra kırpma) beklerken sunucunun zorlandığını/500 döndüğünü görünce. Controller, bu tür girdi sınırlarının test edildiği katmandır.',
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
        { id: '5', text: { tr: 'Her durumda makul bir response (400/kırpma) doğrula', en: 'Verify a sane response (400/clamp) in each case' }, order: 5 },
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
      solutionCode: { tr: `// FIX: size'i makul bir ust sinira kirp (or. 100)
@GetMapping
public List<Bug> list(@RequestParam(defaultValue = "20") int size) {
    int safeSize = Math.min(Math.max(size, 1), 100);  // 1..100 araligina kirp
    return service.list(safeSize);
}`, en: `// FIX: clamp size to a reasonable upper bound (e.g. 100)
@GetMapping
public List<Bug> list(@RequestParam(defaultValue = "20") int size) {
    int safeSize = Math.min(Math.max(size, 1), 100);  // 1..100 araligina kirp
    return service.list(safeSize);
}` },
      hint: { tr: '`size` doğrudan service\'e geçerse `size=1000000` sunucuyu boğabilir. `Math.min(size, 100)` gibi bir üst sınırla (ve alt sınırla) kırparak sınır-dışı değerleri güvenli hale getir.', en: 'If `size` flows straight to the service, `size=1000000` can overwhelm the server. Clamp with an upper (and lower) bound like `Math.min(size, 100)` to make out-of-bound values safe.' },
      successMessage: { tr: 'Doğru! Artık aşırı büyük size değerleri güvenli sınıra kırpılır — tek bir request\'le DoS riski kalkar.', en: 'Correct! Now oversized size values are clamped to a safe bound — the single-request DoS risk is gone.' },
    },
    {
      type: 'quiz',
      question: { tr: '`GET /api/v1/bugs?size=1000000` request\'i neden bir bug kaynağıdır ve tester bunu nasıl yakalar?', en: 'Why is `GET /api/v1/bugs?size=1000000` a bug source, and how does the tester catch it?' },
      options: [
        { id: 'a', text: { tr: 'Değildir; büyük size iyidir', en: 'It is not; a large size is good' } },
        { id: 'b', text: { tr: 'Sınırsız size sunucuyu boğabilir (bellek/yavaşlık/DoS); tester sınır testiyle (size=-1, 999999) yakalar', en: 'An uncapped size can overwhelm the server (memory/slowness/DoS); the tester catches it with boundary tests (size=-1, 999999)' } },
        { id: 'c', text: { tr: 'Sadece 404 döner', en: 'It just returns 404' } },
        { id: 'd', text: { tr: 'Token gerektirir', en: 'It requires a token' } },
      ],
      correct: 'b',
      explanation: { tr: 'Üst sınırı olmayan `size` milyonlarca kaydı tek response\'ta çekmeye çalışır; bellek şişer, response yavaşlar veya 500 gelir — tek request\'le DoS. Normal değerlerde (20) her şey iyi görünür, bu yüzden yalnızca sınır testleri (size=-1, 0, 999999) bunu ortaya çıkarır. Çözüm: size\'ı makul bir üst sınıra kırpmak.', en: 'An uncapped `size` tries to pull millions of records in one response; memory balloons, responses slow, or 500 appears — a single-request DoS. With normal values (20) all looks fine, so only boundary tests (size=-1, 0, 999999) reveal it. The fix: clamp size to a sane maximum.' },
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
        tr: '`@Valid`, API\'nin **kapı bekçisidir**: bir POST request\'i içeri girmeden önce gövdedeki her alanı kurallara göre yoklar — `title` boş mu, 3-120 karakter mi, `reporter` gerçek bir email mi? Kurala uymayan request daha service\'e VARMADAN 400 ile geri çevrilir. Peki UI zaten boş başlığı JavaScript ile engelliyorsa, sunucuda ayrıca doğrulamaya neden gerek var? Çünkü UI sadece BİR istemcidir: mobil uygulama, Postman, başka bir servis veya kötü niyetli bir script doğrudan API\'ye vurabilir ve UI\'nın JS kontrolünü tamamen atlar — sunucu doğrulaması, güvenilebilecek TEK savunma hattıdır. Java\'da bunun karşılığı Bean Validation\'dır: DTO alanlarına `@NotBlank`, `@Size(min=3,max=120)`, `@Email` annotation\'ları koyarsın ve `@Valid` bunları tetikler; controller metodu hiç çalışmadan hatalı request reddedilir. QA açısından bu, en klasik "yanlış güven" tuzağının panzehiridir: "UI valide ediyor, o yüzden API güvenli" varsayımı yanlıştır — tester UI\'yı bypass edip doğrudan API\'ye geçersiz veri göndererek sunucu doğrulamasını KANITLAMALIDIR.',
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
        tr: '**🐞 Defect Doğum Anı — `@Valid` annotation\'ı unutulursa**\n\n**Kod:** `public ResponseEntity<Bug> create(@RequestBody BugRequest req)` — `@Valid` YOK (yalnızca `@RequestBody`).\n\n**Ne olur:** DTO\'daki `@NotBlank`/`@Size` kuralları TANIMLI ama tetiklenmez. `POST /api/v1/bugs { "title": "" }` request\'i 400 yerine **201 Created** döner ve veritabanına boş başlıklı bir bug yazılır.\n\n**Neden sinsi:** UI\'daki JavaScript zaten boş başlığı engelliyor, bu yüzden manuel/UI testi PASS verir — hata hiç görünmez. Ama mobil uygulama veya Postman doğrudan API\'ye vurunca boş kayıt açılır: production\'da "boş bug" kirliliği. Kurallar kodda DURUYOR ama bekçi olmadan hiçbir işe yaramıyor.\n\n**Tester nerede yakalar:** Postman\'de UI\'yı bypass edip boş `title` göndererek — 400 beklerken 201 alınca. Bu, "UI valide ediyor" güveninin neden yanlış olduğunun doğrudan kanıtıdır.',
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
          caption: { tr: '@Valid VARSA: kapı bekçisi boş title\'ı yakalar ve request\'i 400 ile geri çevirir. Sunucu, güvenilebilecek son savunma hattı olarak çalışır.', en: 'If @Valid EXISTS: the gatekeeper catches the empty title and turns the request back with 400. The server acts as the trustworthy last line of defense.' },
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
        { id: '2', text: { tr: 'UI\'yı bypass ederek doğrudan API\'ye request hazırla (Postman)', en: 'Prepare a direct API request bypassing the UI (Postman)' }, order: 2 },
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
      starterCode: { tr: `// BUG: @Valid yok -> DTO kurallari tetiklenmez -> bos title 201 doner
@PostMapping
public ResponseEntity<Bug> create(@RequestBody BugRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
}`, en: `// BUG: no @Valid -> DTO rules are not triggered -> empty title returns 201
@PostMapping
public ResponseEntity<Bug> create(@RequestBody BugRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(req));
}` },
      solutionCode: `// FIX: @Valid kurallari kapida tetikler -> gecersiz request otomatik 400
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
          { id: 'a', text: { tr: 'DTO\'daki Bean Validation kurallarını (@NotBlank, @Size, @Email) tetikler; geçersiz request controller\'a girmeden 400 döner', en: 'It fires the Bean Validation rules on the DTO (@NotBlank, @Size, @Email); an invalid request returns 400 before entering the controller' } },
          { id: 'b', text: { tr: 'Veritabanını temizler', en: 'It cleans the database' } },
          { id: 'c', text: { tr: 'Token üretir', en: 'It generates a token' } },
          { id: 'd', text: { tr: 'Response\'u JSON\'a çevirir', en: 'It converts the response to JSON' } },
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
        tr: 'Exception handling, API\'nin **itfaiye ve tercüman ekibidir**: kodun içinde bir şey ters gittiğinde (kayıt yok, iş kuralı ihlali, beklenmeyen çökme) ham Java exception\'ını istemcinin anlayacağı temiz bir HTTP response\'una ÇEVİRİR. `@RestControllerAdvice`, tüm controller\'lar için tek merkezî hata çevirmenidir: `BugNotFoundException` → 404, `IllegalStateException` → 409, geri kalan her şey → 500. Peki her metotta try-catch yazsak olmaz mı, neden merkezî bir yapı? Çünkü hata çevirisi controller\'lara dağılırsa biri 404 döner, biri 500, biri hiç yakalamaz ve istemci tutarsız response\'larla karşılaşır; merkezî advice, hata→status eşlemesinin TEK doğru kaynağıdır. Java\'da bunun karşılığı global bir `try-catch` değil, `@ExceptionHandler` metotlarıdır; her exception türü kendi status kodu ve gövdesiyle eşlenir. QA açısından bu katman, **hata response\'larının sözleşmesidir**: bir tester yalnızca "mutlu yol"u değil, hata durumlarının da doğru status + anlamlı mesaj döndüğünü test etmelidir — çünkü kötü bir hata response\'u (500 yerine 200, ya da stack trace sızması) hem istemciyi yanıltır hem güvenlik açığı olur.',
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
        tr: '**🐞 Defect Doğum Anı — ham exception istemciye sızarsa**\n\n**Kod:** `@RestControllerAdvice` YOK ya da genel bir handler tüm exception\'ları yakalayıp `ex.getMessage()`\'ı olduğu gibi 500 gövdesine koyuyor.\n\n**Ne olur:** Bir `SQLException` veya `NullPointerException` istemciye ham haliyle döner: response gövdesinde tam **stack trace**, veritabanı tablo/sütun adları, hatta dosya yolları görünür. Kötü niyetli biri için bu bir hazine haritasıdır (sistem içini ifşa eder); ayrıca istemci "ne oldu" diye net bir mesaj alamaz.\n\n**Neden sinsi:** Mutlu yol testlerinde hiç görünmez — her şey 200/201 döner. Sızıntı yalnızca bir hata tetiklendiğinde ortaya çıkar ve çoğu ekip hata response\'larını hiç test etmez.\n\n**Tester nerede yakalar:** Kasıtlı olarak hata tetikleyerek (olmayan id, geçersiz veri, bozuk JSON) response gövdesini inceleyince — stack trace, SQL, iç yol görürse bu hem bir bilgi sızıntısı (güvenlik) hem de kötü bir hata sözleşmesidir.',
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
          caption: { tr: 'Merkezî advice VARSA: exception yakalanır ve temiz bir 404 + anlamlı mesaja çevrilir. İstemci "kayıt yok" diye net bir response alır.', en: 'If the central advice EXISTS: the exception is caught and translated into a clean 404 + meaningful message. The client gets a clear "record not found" response.' },
          code: { tr: '404 { "code": "BUG_NOT_FOUND" }', en: '404 { "code": "BUG_NOT_FOUND" }' },
          positions: { ex: { x: 22, y: 40 }, advice: { x: 45, y: 50 }, clean: { x: 72, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'ex', to: 'advice', color: '#22c55e' }, { from: 'advice', to: 'clean', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Advice YOKSA: ham exception istemciye sızar — response gövdesinde tam stack trace, SQL, tablo adları, dosya yolları görünür.', en: 'If the advice is MISSING: the raw exception leaks to the client — the response body shows the full stack trace, SQL, table names, file paths.' },
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
          caption: { tr: 'Ders — Hata response\'ları da bir sözleşmedir: doğru status + anlamlı mesaj, ham iç detay SIZDIRMADAN. Tester hataları kasıtlı tetikleyip gövdeyi denetler.', en: 'The lesson — Error responses are a contract too: the right status + a meaningful message, WITHOUT leaking raw internals. The tester triggers errors deliberately and audits the body.' },
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
      question: { tr: 'Hata response\'larını test etme sırasını diz.', en: 'Order the steps to test error responses.' },
      items: [
        { id: '1', text: { tr: 'Her hata türü için tetikleyici bir request hazırla (yok id, geçersiz veri)', en: 'Prepare a trigger request per error type (missing id, invalid data)' }, order: 1 },
        { id: '2', text: { tr: 'Beklenen status kodunu belirle (404/409/400/500)', en: 'Determine the expected status code (404/409/400/500)' }, order: 2 },
        { id: '3', text: { tr: 'Request\'i gönder ve gerçek status\'u karşılaştır', en: 'Send the request and compare the actual status' }, order: 3 },
        { id: '4', text: { tr: 'Response gövdesinde anlamlı mesaj VAR, stack trace YOK doğrula', en: 'Verify the body HAS a meaningful message and NO stack trace' }, order: 4 },
        { id: '5', text: { tr: 'İç detay (SQL, yol, tablo) sızıntısı varsa güvenlik bug\'ı olarak raporla', en: 'If internals (SQL, path, table) leak, report a security bug' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-b7-exception',
      id: 'api-b7-exception',
      title: { tr: 'Kendin Dene: Not Found\'u 404\'e Eşle', en: 'Try It Yourself: Map Not Found to 404' },
      starterCode: { tr: `// BUG: BugNotFoundException icin handler yok -> 500 + stack trace sizinti
@RestControllerAdvice
public class GlobalExceptionHandler {
    // TODO: BugNotFoundException'i temiz bir 404'e cevir
}`, en: `// BUG: no handler for BugNotFoundException -> 500 + stack trace leak
@RestControllerAdvice
public class GlobalExceptionHandler {
    // TODO: convert BugNotFoundException into a clean 404
}` },
      solutionCode: { tr: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BugNotFoundException.class)
    public ResponseEntity<ApiError> notFound(BugNotFoundException ex) {
        // beklenen durum -> temiz 404, stack trace SIZDIRMADAN
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiError("BUG_NOT_FOUND", ex.getMessage()));
    }
}`, en: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BugNotFoundException.class)
    public ResponseEntity<ApiError> notFound(BugNotFoundException ex) {
        // expected outcome -> a clean 404, WITHOUT leaking a stack trace
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiError("BUG_NOT_FOUND", ex.getMessage()));
    }
}` },
      hint: { tr: 'Handler yoksa BugNotFoundException genel 500\'e düşer ve stack trace sızabilir. `@ExceptionHandler(BugNotFoundException.class)` ile bunu temiz bir 404 + anlamlı mesaja çevir.', en: 'Without a handler, BugNotFoundException falls to a generic 500 and a stack trace can leak. Use `@ExceptionHandler(BugNotFoundException.class)` to map it to a clean 404 + meaningful message.' },
      successMessage: { tr: 'Doğru! Artık "bulunamadı" temiz bir 404 döner, iç detay sızmaz.', en: 'Correct! Now "not found" returns a clean 404 with no internal leak.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir API, hata durumunda response gövdesinde tam stack trace ve SQL sorgusunu döndürüyor. Bu neden iki katmanlı bir problemdir?', en: 'On errors, an API returns the full stack trace and SQL query in the response body. Why is this a two-layer problem?' },
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
        tr: '`ResponseEntity`, geliştiricinin **response\'un tam kontrolünü** eline aldığı araçtır: sadece gövdeyi değil, status kodunu ve header\'ları da bilinçli seçer. Başarı bile tek bir kod değildir: **200 OK** = "işte sonuç" (GET), **201 Created** = "yeni kaynak oluşturdum, adresi de Location header\'ında" (POST), **204 No Content** = "yaptım ama dönecek gövde yok" (DELETE/bazı PUT). Peki hepsi "başarı" ise 200 dönsek olmaz mı, istemci nasılsa çalışır? Çoğu zaman "çalışır" ama sözleşme bozulur: bir POST 201 yerine 200 dönerse, istemci `Location` header\'ından yeni kaydın adresini alan otomasyon zinciri kırılır; bir DELETE 204 yerine 200 + boş gövde dönerse, gövdeyi ayrıştırmaya çalışan istemci hata verebilir. Java\'da bunun karşılığı `return bug;` (Spring 200 varsayar) ile `ResponseEntity.status(201).header("Location", ...).body(bug)` arasındaki bilinçli farktır. QA açısından status kodu **anlamsal bir sözleşmedir**: tester yalnızca "başarılı mı" değil, "DOĞRU başarı kodu mu" diye test eder — çünkü yanlış ama 2xx bir kod, istemci otomasyonlarını sessizce bozan bir contract hatasıdır.',
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
        { id: 'next', emoji: '🔗', label: { tr: 'Sonraki request', en: 'Next request' }, color: '#0ea5e9' },
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
          caption: { tr: 'Sonraki request Location\'dan adresi almaya çalışır ama header yok — zincir kırılır. Test "oluşturma başarısız" gibi görünmez, "sonraki adım null" der.', en: 'The next request tries to read the address from Location but there is none — the chain breaks. The test does not look like "create failed", it says "next step is null".' },
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
      starterCode: { tr: `// BUG: return bug -> Spring 200 doner, Location header yok -> zincir kirilir
@PostMapping
public Bug create(@Valid @RequestBody BugRequest req) {
    return service.create(req);
}`, en: `// BUG: return bug -> Spring returns 200, no Location header -> the chain breaks
@PostMapping
public Bug create(@Valid @RequestBody BugRequest req) {
    return service.create(req);
}` },
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
        tr: '**🐞 Defect Doğum Anı — `app.listen(...)` unutulursa**\n\n**Kod:** `app.get(...)` yazıldı, route tanımlandı, ama dosyanın sonunda `app.listen(PORT, ...)` satırı YOK.\n\n**Ne olur:** `node index.js` çalıştırılır, script hatasız biter, terminal sessizce komut istemine döner — hiçbir hata mesajı YOKTUR. Hiçbir port dinlenmediği için `curl http://localhost:3000/api/v1/bugs` `ECONNREFUSED` verir.\n\n**Neden sinsi:** Kodda syntax hatası yok, route doğru yazılmış, derleme/parse aşaması sorunsuz geçer. Bir stack trace bile yoktur — sadece "hiçbir şey olmaz". Yeni başlayan bir geliştirici bunu "sunucu çöktü" sanıp saatlerce route kodunda hata arayabilir.\n\n**Tester nerede yakalar:** Otomasyonun ilk request\'inde bağlantı reddi (`ECONNREFUSED`) alınca — bu GRUP J\'deki "sunucuya hiç ulaşılamıyor" hata kategorisinin köküdür.',
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
          caption: { tr: 'Ders — `node index.js` hatasız bitmesi "çalışıyor" anlamına gelmez; tester ilk kanıtı gerçek bir request\'le (`curl`/Postman) ister.', en: 'The lesson — `node index.js` ending without error does not mean "it works"; the tester wants the first proof from a real request (`curl`/Postman).' },
          positions: { listen: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'listen', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Boş Klasörden İlk Response\'a', en: 'From an Empty Folder to the First Response' },
      steps: [
        { id: 1, icon: '📭', label: { tr: 'Proje aç…', en: 'Open project…' }, detail: { tr: 'npm init -y ile boş package.json oluştur, npm install express ile kütüphaneyi ekle.', en: 'Create an empty package.json with npm init -y, add the library with npm install express.' } },
        { id: 2, icon: '🛣️', label: { tr: 'Route yaz…', en: 'Write route…' }, detail: { tr: 'app.get(\'/api/v1/bugs\', ...) ile ilk yolu tanımla — bu henüz sunucuyu ayağa kaldırmaz.', en: 'Define the first path with app.get(\'/api/v1/bugs\', ...) — this does not start the server yet.' } },
        { id: 3, icon: '👂', label: { tr: 'Dinlemeye başla…', en: 'Start listening…' }, detail: { tr: 'app.listen(PORT, ...) çağrısı olmadan hiçbir request sunucuya ulaşamaz.', en: 'Without calling app.listen(PORT, ...) no request can ever reach the server.' } },
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
        { id: '5', text: { tr: 'curl ile smoke test at, response geldiğini doğrula', en: 'Run a smoke test with curl, verify a response arrives' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-c1-setup',
      id: 'api-c1-setup',
      title: { tr: 'Kendin Dene: Sunucuyu Dinlemeye Al', en: 'Try It Yourself: Make the Server Listen' },
      starterCode: { tr: `const express = require('express')
const app = express()

app.get('/api/v1/bugs', (req, res) => {
  res.json([])
})

// BUG: sunucu hicbir portu dinlemiyor
console.log('Bugs API hazir')`, en: `const express = require('express')
const app = express()

app.get('/api/v1/bugs', (req, res) => {
  res.json([])
})

// BUG: the server is not listening on any port
console.log('Bugs API ready')` },
      solutionCode: { tr: `const express = require('express')
const app = express()

app.get('/api/v1/bugs', (req, res) => {
  res.json([])
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(\`Bugs API port \${PORT} dinliyor\`)
})`, en: `const express = require('express')
const app = express()

app.get('/api/v1/bugs', (req, res) => {
  res.json([])
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(\`Bugs API listening on port \${PORT}\`)
})` },
      hint: { tr: 'Route tanımlamak sunucuyu başlatmaz. Bir Express uygulamasının request kabul edebilmesi için mutlaka `app.listen(port, callback)` çağrısı gerekir; bu satır yoksa süreç sessizce sonlanır.', en: 'Defining a route does not start the server. An Express app must call `app.listen(port, callback)` before it can accept requests; without this line the process ends silently.' },
      successMessage: { tr: 'Doğru! Artık process sonlanmaz, port dinlenir ve curl/Postman gerçek bir response alır.', en: 'Correct! Now the process does not exit, the port is listened on, and curl/Postman get a real response.' },
    },
    {
      type: 'quiz',
      question: { tr: '`app.listen(PORT, ...)` çağrısı olmadan `node index.js` çalıştırılırsa ne olur?', en: 'What happens if `node index.js` is run without calling `app.listen(PORT, ...)`?' },
      options: [
        { id: 'a', text: { tr: 'Node bir syntax hatası fırlatır', en: 'Node throws a syntax error' } },
        { id: 'b', text: { tr: 'Script sessizce biter; hiçbir port dinlenmez, request\'ler ECONNREFUSED alır', en: 'The script ends silently; no port is listened on, requests get ECONNREFUSED' } },
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
        tr: 'Bir Express route\'u, otelde **oda numarası ve resepsiyon talimatı** gibidir: `app.get(\'/api/v1/bugs/:id\', ...)` yazdığında `:id` kısmı değişken bir "oda numarası" (path parameter), `?status=OPEN` gibi bir sorgu ise resepsiyona bırakılan bir "not" (query parameter) — biri **yolun kendisinin bir parçası**, diğeri **isteğe bağlı bir ek bilgi**dir. Spring\'de bu ikisi `@PathVariable` ve `@RequestParam` annotation\'larıyla imzada açıkça görünür; Express\'te ise `req.params.id` ve `req.query.status` ile fonksiyon gövdesinde elle okunur — annotation yerine sözleşme, fonksiyonun İÇİNDE yaşar. Peki neden bazı bilgi yola (`/bugs/42`), bazısı sorguya (`?status=OPEN`) konur? Çünkü yol bir **kaynağın kimliğini** taşır (42 numaralı bug olmadan bu request anlamsızdır), sorgu ise bir **filtreleme/isteğe bağlı davranışı** taşır (status olmadan da liste request\'i geçerlidir). Tester için bunun anlamı: `req.params` HER ZAMAN string gelir — JavaScript\'in tip sistemi zayıf olduğundan `"1" === 1` FALSE\'tur; bu, ID karşılaştırmalarında sinsi bir hata kaynağıdır ve az sonra göreceğin gibi gerçek bir defect doğurur.',
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
        tr: '**🐞 Defect Doğum Anı — `req.params.id` tip dönüşümü unutulursa**\n\n**Kod:** `bugs.find(b => b.id === req.params.id)` — `b.id` bir **number** (1, 2, ...), `req.params.id` her zaman bir **string** (`"1"`, `"2"`, ...).\n\n**Ne olur:** `GET /api/v1/bugs/1` request\'i gönderilir, kayıt VERİTABANINDA vardır, ama `1 === "1"` JavaScript\'te `false` olduğu için `find` hiçbir zaman eşleşme bulamaz — sonuç her zaman 404\'tür, kayıt var olsa bile.\n\n**Neden sinsi:** Kod okunduğunda mantık tamamen doğru görünür ("id\'leri karşılaştırıyoruz"). Hata bir syntax veya runtime exception değil, sessiz bir mantık hatasıdır — sadece testerin "bu ID kesinlikle var, neden 404 alıyorum?" diye şaşırmasıyla ortaya çıkar.\n\n**Tester nerede yakalar:** Var olduğu bilinen bir ID ile GET request\'i atıp 200 yerine 404 alınca — bu, JS\'in zayıf tipleme tuzağının klasik bir örneğidir; düzeltme `Number(req.params.id)` ile tip dönüşümü yapmaktır.',
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
          caption: { tr: 'İstemci `/api/v1/bugs/1` request\'i gönderiyor — URL her zaman metin karakterlerinden oluşur.', en: 'The client sends a request to `/api/v1/bugs/1` — a URL is always made of text characters.' },
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
        { id: 'c', text: { tr: 'GET request\'leri asla path parametresi kabul etmez', en: 'GET requests never accept path parameters' } },
        { id: 'd', text: { tr: 'bugs dizisi her request\'te sıfırlanır', en: 'The bugs array resets on every request' } },
      ],
      correct: 'a',
      explanation: { tr: 'JavaScript\'in `===` operatörü tip dönüşümü yapmaz; `"1" === 1` daima `false`\'tur. `req.params` her zaman string olduğundan, sayısal `id` alanıyla dönüşümsüz karşılaştırma sessizce başarısız olur ve `find` hiçbir zaman eşleşme bulamaz.', en: 'JavaScript\'s `===` operator does not coerce types; `"1" === 1` is always `false`. Since `req.params` is always a string, comparing it against a numeric `id` field without conversion silently fails, and `find` never matches.' },
      retryQuestion: {
        question: { tr: '`req.query` ile `req.params` arasındaki temel fark nedir?', en: 'What is the fundamental difference between `req.query` and `req.params`?' },
        options: [
          { id: 'a', text: { tr: 'params yolun bir parçasıdır (kaynak kimliği), query isteğe bağlı filtre/ek bilgidir', en: 'params is part of the path (resource identity), query is optional filter/extra info' } },
          { id: 'b', text: { tr: 'İkisi de aynı şeydir, birbirinin yerine kullanılabilir', en: 'They are the same thing and interchangeable' } },
          { id: 'c', text: { tr: 'params sadece POST request\'lerinde, query sadece GET request\'lerinde çalışır', en: 'params only works on POST requests, query only on GET requests' } },
          { id: 'd', text: { tr: 'query her zaman sayı, params her zaman metin döner', en: 'query always returns a number, params always returns text' } },
        ],
        correct: 'a',
        explanation: { tr: '`/bugs/:id` gibi bir path parametresi kaynağın kimliğini taşır — onsuz request anlamsızdır. `?status=OPEN` gibi bir query parametresi ise isteğe bağlı bir filtre/davranıştır — olmadan da request geçerlidir.', en: 'A path parameter like `/bugs/:id` carries a resource\'s identity — the request is meaningless without it. A query parameter like `?status=OPEN` is an optional filter/behavior — the request is still valid without it.' },
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
        tr: 'Middleware zinciri, bir **havalimanı güvenlik koridoru** gibidir: yolcu (request) sırayla check-in, bagaj taraması, pasaport kontrolü kontrol noktalarından geçer; her kontrol noktası (`function(req, res, next)`) yolcuyu inceleyebilir, üzerine bir şey ekleyebilir (bagaj etiketi) veya durdurabilir — ve bir sonraki noktaya SADECE `next()` çağrılırsa geçilir. `express.json()` de tam olarak böyle bir kontrol noktasıdır: gelen JSON gövdesini okuyup `req.body`\'ye "etiketler", route handler\'a devretmeden önce. Peki Spring\'de bu iş neden tek bir `@RequestBody` annotation\'ıyla otomatik olurken Express\'te ayrı bir adım gerekiyor? Çünkü Spring MVC\'nin arkasında hazır bir request işleme hattı (dispatcher servlet) vardır ve gövde ayrıştırma bu hattın standart bir parçasıdır; Express\'te böyle bir hat YOKTUR — sen zinciri elle, sırayla kurarsın; en yakın Java karşılığı Servlet **Filter** zinciridir (her filter `chain.doFilter()` çağırana kadar bir sonrakine geçilmez). Tester için kritik nokta: middleware\'lerin SIRASI davranışı belirler — `express.json()` route\'lardan sonra tanımlanırsa, route\'lar asla ayrıştırılmış bir gövde göremez; bu, "kod doğru ama sıra yanlış" kategorisindeki en sinsi hata türüdür.',
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
  next()   // cagrilmazsa request burada TAKILIR KALIR
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
        tr: '**🐞 Defect Doğum Anı — `express.json()` route\'lardan SONRA tanımlanırsa**\n\n**Kod:** `app.post(\'/api/v1/bugs\', ...)` önce, `app.use(express.json())` en altta.\n\n**Ne olur:** `POST /api/v1/bugs { "title": "...", "severity": "HIGH" }` request\'i gönderilir; handler çalıştığında `req.body` HÂLÂ `undefined`\'dır çünkü ayrıştırıcı middleware zincirde daha SONRAKI bir noktada. `const { title, severity } = req.body` çökmez (destructuring `undefined`\'dan `undefined` üretir), sunucu `201 Created` döner ama `title: undefined, severity: undefined` ile bir kayıt oluşturulur.\n\n**Neden sinsi:** Request 201 ile "başarılı" görünür, sunucu çökmez, hata log\'u yoktur — ama veritabanında (bellekte) tamamen boş bir bug kaydı oluşur. Kodun KENDİSİ (`express.json()` çağrısı) doğrudur, tek sorun SIRASIDIR.\n\n**Tester nerede yakalar:** POST sonrası dönen kaydı GET ile tekrar okuyup `title` alanının `null`/`undefined` geldiğini görünce — bu, "201 aldım ama içerik boş" sınıfındaki en klasik middleware sıralama hatasıdır.',
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
        { id: 'request', emoji: '📤', label: { tr: 'POST request', en: 'POST request' }, color: '#f59e0b' },
        { id: 'json', emoji: '📦', label: { tr: 'express.json()', en: 'express.json()' }, color: '#0ea5e9' },
        { id: 'logger', emoji: '📝', label: { tr: 'Logger middleware', en: 'Logger middleware' }, color: '#a78bfa' },
        { id: 'route', emoji: '🛣️', label: { tr: 'Route handler', en: 'Route handler' }, color: '#22c55e' },
        { id: 'broken', emoji: '💥', label: { tr: 'Sıra bozuk: req.body = undefined', en: 'Order broken: req.body = undefined' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'GET ile kanıt: title boş geldi', en: 'GET evidence: title arrived empty' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'İstemci `POST /api/v1/bugs` request\'ini `{ "title": "Login donuyor", "severity": "HIGH" }` gövdesiyle gönderiyor.', en: 'The client sends a `POST /api/v1/bugs` request with the body `{ "title": "Login freezes", "severity": "HIGH" }`.' },
          positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'DOĞRU SIRADA: request önce `express.json()`\'a uğrar — ham JSON metni ayrıştırılıp `req.body` nesnesine dönüştürülür.', en: 'IN THE CORRECT ORDER: the request first hits `express.json()` — the raw JSON text is parsed into the `req.body` object.' },
          positions: { request: { x: 18, y: 35 }, json: { x: 55, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'request', to: 'json', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Sonra logger middleware request\'i loglar ve `next()` ile bir sonraki halkaya devreder — zincir kırılmadan devam eder.', en: 'Then the logger middleware logs the request and hands off with `next()` to the next link — the chain continues unbroken.' },
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
      title: { tr: 'Bir POST Request\'inin Zincirdeki Yolculuğu', en: 'A POST Request\'s Journey Through the Chain' },
      steps: [
        { id: 1, icon: '📤', label: { tr: 'Request gelir…', en: 'Request arrives…' }, detail: { tr: 'Ham HTTP request\'i (JSON metin gövdeli) Express\'e ulaşır.', en: 'The raw HTTP request (with a JSON text body) reaches Express.' } },
        { id: 2, icon: '📦', label: { tr: 'express.json() çalışır…', en: 'express.json() runs…' }, detail: { tr: 'Ham metni ayrıştırıp req.body\'ye JavaScript nesnesi olarak koyar; next() ile devreder.', en: 'It parses the raw text and places it on req.body as a JavaScript object; hands off with next().' } },
        { id: 3, icon: '📝', label: { tr: 'Logger çalışır…', en: 'Logger runs…' }, detail: { tr: 'Request\'i kaydeder, next() ile bir sonraki halkaya geçer.', en: 'It logs the request, moves to the next link with next().' } },
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
      starterCode: { tr: `const express = require('express')
const app = express()

// BUG: govde ayristirici route'lardan SONRA tanimlanmis
app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body   // undefined gelir
  res.status(201).json({ id: 1, title, severity })
})

app.use(express.json())`, en: `const express = require('express')
const app = express()

// BUG: the body parser is defined AFTER the routes
app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body   // comes undefined
  res.status(201).json({ id: 1, title, severity })
})

app.use(express.json())` },
      solutionCode: { tr: `const express = require('express')
const app = express()

// FIX: govde ayristirici HER ZAMAN route'lardan ONCE tanimlanir
app.use(express.json())

app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body   // artik dolu gelir
  res.status(201).json({ id: 1, title, severity })
})`, en: `const express = require('express')
const app = express()

// FIX: the body parser is ALWAYS defined BEFORE the routes
app.use(express.json())

app.post('/api/v1/bugs', (req, res) => {
  const { title, severity } = req.body   // now comes filled
  res.status(201).json({ id: 1, title, severity })
})` },
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
        { id: 'd', text: { tr: 'Request 400 Bad Request ile reddedilir', en: 'The request is rejected with 400 Bad Request' } },
      ],
      correct: 'b',
      explanation: { tr: 'Middleware\'ler kayıt sırasına göre çalışır. Ayrıştırıcı henüz çalışmamışsa `req.body` `undefined` kalır; `const { title } = undefined` çökmeden `undefined` üretir, bu yüzden sunucu 201 ile ama tamamen boş alanlarla bir kayıt oluşturur — sessiz bir veri bütünlüğü hatası.', en: 'Middlewares run in registration order. If the parser has not run yet, `req.body` stays `undefined`; `const { title } = undefined` yields `undefined` without crashing, so the server creates a record with 201 but entirely empty fields — a silent data-integrity bug.' },
      retryQuestion: {
        question: { tr: 'Bir middleware fonksiyonu `next()` çağırmazsa ne olur?', en: 'What happens if a middleware function never calls `next()`?' },
        options: [
          { id: 'a', text: { tr: 'Request o middleware\'de takılı kalır, zincirdeki sonraki adım hiç çalışmaz', en: 'The request gets stuck at that middleware, the next step in the chain never runs' } },
          { id: 'b', text: { tr: 'Express otomatik olarak bir sonraki middleware\'e geçer', en: 'Express automatically moves to the next middleware' } },
          { id: 'c', text: { tr: 'Request 200 ile hemen tamamlanır', en: 'The request completes immediately with 200' } },
          { id: 'd', text: { tr: 'Sunucu yeniden başlatılır', en: 'The server restarts' } },
        ],
        correct: 'a',
        explanation: { tr: '`next()` çağrılmazsa Express bir sonraki middleware/route\'a geçmez — request o noktada asılı kalır ve sonunda zaman aşımına uğrayabilir. Bu, unutulan bir `next()` çağrısının neden ciddi bir kesinti sebebi olduğunu açıklar.', en: 'Without calling `next()`, Express never proceeds to the next middleware/route — the request hangs at that point and may eventually time out. This explains why a forgotten `next()` call is a serious source of outages.' },
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
        tr: '**🐞 Defect Doğum Anı — `validationResult(req)` kontrolü unutulursa**\n\n**Kod:** `body(\'title\').isLength(...)` kuralları TANIMLANDI, ama handler içinde `validationResult(req)` çağrısı ve `if (!errors.isEmpty())` kontrolü YOK.\n\n**Ne olur:** `express-validator` kuralları arka planda ÇALIŞIR ve hataları biriktirir, ama hiç kimse bu sonucu OKUMADIĞI için hatalar sessizce göz ardı edilir. `POST /api/v1/bugs { "title": "" }` request\'i 400 yerine 201 döner ve boş başlıklı bug kaydedilir.\n\n**Neden sinsi:** Kod incelendiğinde validation kuralları GERÇEKTEN oradadır — bir code review\'da "validation var" denip geçilebilir. Ama kural TANIMLAMAK ile kuralın SONUCUNU okumak iki ayrı adımdır; ilkini yapıp ikincisini unutmak, Spring\'deki `starter-validation` eksikliğinden (B1) FARKLI bir kök nedenle AYNI sonucu (sessiz 201) doğurur.\n\n**Tester nerede yakalar:** Geçersiz veriyle (boş title, geçersiz e-posta) negatif test atıp 201 alınca — "kural var ama okunmuyor" defect ailesinin Express\'teki karşılığı budur.',
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
          caption: { tr: 'Request geldiğinde bu kural gerçekten ÇALIŞIR ve `title` alanını kontrol eder.', en: 'When a request arrives, this rule REALLY RUNS and checks the `title` field.' },
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
        { id: 2, icon: '⚙️', label: { tr: 'Kural çalışsın…', en: 'Let the rule run…' }, detail: { tr: 'Request geldiğinde her kural otomatik çalışır ve hataları errors nesnesinde biriktirir.', en: 'When a request arrives, every rule runs automatically and collects errors into the errors object.' } },
        { id: 3, icon: '📖', label: { tr: 'Sonucu OKU…', en: 'READ the result…' }, detail: { tr: 'validationResult(req) ile errors okunur; boş değilse handler 400 ile erken döner.', en: 'validationResult(req) reads the errors; if not empty, the handler returns 400 early.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-c4-order-01',
      question: { tr: 'express-validator ile bir POST request\'ini doğrulama akışını sırala.', en: 'Order the flow for validating a POST request with express-validator.' },
      items: [
        { id: '1', text: { tr: 'body(\'title\').isLength(...) gibi kuralları route zincirine ekle', en: 'Add rules like body(\'title\').isLength(...) to the route chain' }, order: 1 },
        { id: '2', text: { tr: 'Request gelince kurallar otomatik çalışır', en: 'Rules run automatically when the request arrives' }, order: 2 },
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
      starterCode: { tr: `app.post('/api/v1/bugs',
  body('title').isLength({ min: 3, max: 120 }),
  body('severity').isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  (req, res) => {
    // BUG: kurallar tanimlandi ama sonuc hic okunmuyor
    const { title, severity } = req.body
    res.status(201).json({ id: 1, title, severity })
  }
)`, en: `app.post('/api/v1/bugs',
  body('title').isLength({ min: 3, max: 120 }),
  body('severity').isIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  (req, res) => {
    // BUG: the rules are defined but the result is never read
    const { title, severity } = req.body
    res.status(201).json({ id: 1, title, severity })
  }
)` },
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
        { id: 'd', text: { tr: 'Request otomatik olarak reddedilir', en: 'The request is automatically rejected' } },
      ],
      correct: 'b',
      explanation: { tr: 'express-validator kuralları middleware zincirinde çalışıp hataları biriktirir, ama bu hataları OKUYUP karar veren kod SENDEN beklenir. `validationResult(req)` çağrılmazsa, biriken hatalar hiçbir zaman handler\'ın davranışını etkilemez.', en: 'express-validator rules run in the middleware chain and collect errors, but the code that READS those errors and decides is expected FROM YOU. Without calling `validationResult(req)`, the collected errors never affect the handler\'s behavior.' },
      retryQuestion: {
        question: { tr: 'Spring\'deki `@Valid` ile Express\'teki `express-validator` arasındaki temel fark nedir?', en: 'What is the fundamental difference between Spring\'s `@Valid` and Express\'s `express-validator`?' },
        options: [
          { id: 'a', text: { tr: '@Valid framework tarafından otomatik tetiklenir; express-validator\'da sonucu OKUMAK geliştiricinin sorumluluğudur', en: '@Valid is triggered automatically by the framework; in express-validator, READING the result is the developer\'s responsibility' } },
          { id: 'b', text: { tr: 'İkisi de tamamen otomatiktir, fark yoktur', en: 'Both are fully automatic, there is no difference' } },
          { id: 'c', text: { tr: '@Valid sadece GET request\'lerinde çalışır', en: '@Valid only works on GET requests' } },
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
        tr: '**🐞 Defect Doğum Anı — hata yakalayıcı middleware route\'lardan ÖNCE tanımlanırsa**\n\n**Kod:** 4 parametreli `(err, req, res, next)` middleware\'i dosyanın EN ÜSTÜNE, route tanımlarından önce konmuş.\n\n**Ne olur:** `GET /api/v1/bugs/999` (var olmayan id) request\'i atılır; route içinde `next({status:404, ...})` çağrılır ama Express, kayıt SIRASINDA bu noktadan SONRA gelen bir hata middleware\'i arar — geriye doğru bakmaz. Hiçbiri bulunamadığı için Express kendi VARSAYILAN hata sayfasını (HTML, stack trace içeren) döner.\n\n**Neden sinsi:** Geliştirici "hata yakalayıcımı yazdım" der ve code review\'dan geçer — kod GERÇEKTEN doğru yazılmıştır, sadece dosyadaki KONUMU yanlıştır. Sonuç, beklenen `{"error": "Bug bulunamadi"}` JSON\'u yerine HTML bir hata sayfasıdır.\n\n**Tester nerede yakalar:** Otomasyon `response.json()` ile gövdeyi ayrıştırmaya çalıştığında `SyntaxError: Unexpected token \'<\'` alınca — HTML\'i JSON sanıp parse etmeye çalışmak, bu hata sınıfının imzasıdır (bkz. GRUP J).',
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
      starterCode: { tr: `const express = require('express')
const app = express()

// BUG: hata yakalayici route'lardan ONCE tanimlanmis
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = findBug(req.params.id)
  if (!bug) return next({ status: 404, message: 'Bug bulunamadi' })
  res.json(bug)
})`, en: `const express = require('express')
const app = express()

// BUG: the error handler is defined BEFORE the routes
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = findBug(req.params.id)
  if (!bug) return next({ status: 404, message: 'Bug bulunamadi' })
  res.json(bug)
})` },
      solutionCode: { tr: `const express = require('express')
const app = express()

app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = findBug(req.params.id)
  if (!bug) return next({ status: 404, message: 'Bug bulunamadi' })
  res.json(bug)
})

// FIX: hata yakalayici HER ZAMAN TUM route'lardan SONRA tanimlanir
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})`, en: `const express = require('express')
const app = express()

app.get('/api/v1/bugs/:id', (req, res, next) => {
  const bug = findBug(req.params.id)
  if (!bug) return next({ status: 404, message: 'Bug bulunamadi' })
  res.json(bug)
})

// FIX: the error handler is ALWAYS defined AFTER ALL routes
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})` },
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
          { id: 'd', text: { tr: 'Sadece POST request\'lerinde çalışmaz', en: 'It only fails to work for POST requests' } },
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
      headers: [{ tr: 'Konu', en: 'Topic' }, 'Spring Boot (Java)', 'Express.js', 'NestJS'],
      rows: [
        [{ tr: 'Route tanımı', en: 'Route definition' }, '@GetMapping("/bugs")', "app.get('/bugs', handler)", '@Get()'],
        [{ tr: 'Body okuma', en: 'Reading body' }, '@RequestBody BugRequest req', { tr: 'req.body (express.json() şart)', en: 'req.body (express.json() required)' }, '@Body() dto: CreateBugDto'],
        ['Validation', '@Valid + Bean Validation', { tr: 'express-validator / zod (elle okunur)', en: 'express-validator / zod (read manually)' }, 'ValidationPipe + class-validator'],
        [{ tr: 'Hata yönetimi', en: 'Error handling' }, '@RestControllerAdvice', { tr: '4 parametreli (err,req,res,next)', en: '4-parameter (err,req,res,next)' }, '@Catch() Exception Filter'],
        [{ tr: 'DI (bağımlılık enjeksiyonu)', en: 'DI (dependency injection)' }, 'Spring IoC container', { tr: 'manuel / factory fonksiyon', en: 'manual / factory function' }, 'Nest IoC container'],
        [{ tr: 'Sıra hassasiyeti', en: 'Order sensitivity' }, { tr: 'Düşük — annotation tabanlı', en: 'Low — annotation-based' }, { tr: 'YÜKSEK — middleware SIRASI kritik', en: 'HIGH — middleware ORDER is critical' }, { tr: 'Orta — modül/pipe kaydı önemli', en: 'Medium — module/pipe registration matters' }],
        [{ tr: 'En sık sessiz hata', en: 'Most common silent bug' }, { tr: 'Eksik starter/annotation', en: 'Missing starter/annotation' }, { tr: 'Yanlış middleware sırası', en: 'Wrong middleware order' }, { tr: 'Unutulan global pipe/filter kaydı', en: 'Forgotten global pipe/filter registration' }],
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
        { id: 'request', emoji: '📤', label: { tr: 'Aynı POST request', en: 'The same POST request' }, color: '#f59e0b' },
        { id: 'spring', emoji: '☕', label: { tr: 'Spring: @Valid otomatik', en: 'Spring: @Valid automatic' }, color: '#22c55e' },
        { id: 'express', emoji: '🟢', label: { tr: 'Express: elle sıralı zincir', en: 'Express: hand-ordered chain' }, color: '#0ea5e9' },
        { id: 'nest', emoji: '🐈', label: { tr: 'Nest: decorator + pipe', en: 'Nest: decorator + pipe' }, color: '#a78bfa' },
        { id: 'response', emoji: '📥', label: { tr: 'Aynı JSON sözleşmesi', en: 'The same JSON contract' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Aynı `POST /api/v1/bugs { "title": "" }` request\'i üç farklı sunucuya gönderiliyor.', en: 'The same `POST /api/v1/bugs { "title": "" }` request is sent to three different servers.' },
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
      question: { tr: 'Bir POST /api/v1/bugs request\'inin üç frameworkte de takip ettiği ORTAK adımları sırala.', en: 'Order the COMMON steps a POST /api/v1/bugs request follows in all three frameworks.' },
      items: [
        { id: '1', text: { tr: 'Request route/controller katmanına ulaşır', en: 'The request reaches the route/controller layer' }, order: 1 },
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
      starterCode: { tr: `// Spring Boot (Java):
// @GetMapping("/api/v1/bugs/{id}")
// public Bug getBug(@PathVariable Long id) { ... }

// TODO: ayni isi yapan Express satirini yaz
`, en: `// Spring Boot (Java):
// @GetMapping("/api/v1/bugs/{id}")
// public Bug getBug(@PathVariable Long id) { ... }

// TODO: write the Express line that does the same job
` },
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
        tr: '**🐞 Defect Doğum Anı — `BugsController` `@Module`\'e eklenmezse**\n\n**Kod:** `bugs.controller.ts` dosyası tamamen doğru yazıldı (`@Controller`, `@Get()` decorator\'ları hepsi doğru), ama `app.module.ts`\'teki `controllers: [...]` dizisine EKLENMEDİ.\n\n**Ne olur:** Uygulama HATASIZ başlar (TypeScript derleyicisi bunu bir hata olarak görmez — sınıf hâlâ geçerli bir sınıftır), ama Nest\'in DI container\'ı bu controller\'dan HİÇ haberdar olmaz. `GET /api/v1/bugs` request\'i atıldığında Nest\'in kendi varsayılan 404\'ü döner — sanki route hiç yazılmamış gibi.\n\n**Neden sinsi:** Bir code review\'da dosyayı açan biri "controller doğru yazılmış" der ve geçer — çünkü dosyanın İÇİ gerçekten doğrudur. Eksik olan tek satır, başka bir dosyadaki (`app.module.ts`) bir DİZİ elemanıdır; bu, "doğru kod, yanlış yerde kayıtlı değil" kategorisinin NestJS\'teki karşılığıdır.\n\n**Tester nerede yakalar:** Code review "her şey doğru görünüyor" dese bile, gerçek bir request atıp 404 alınca — bu, "kod incelemesi yeterli değildir, çalışan sistemde doğrulama şarttır" prensibinin somut kanıtıdır.',
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
          caption: { tr: '`GET /api/v1/bugs` request\'i atılır — route TANIMLI olsa da DI container\'a KAYITLI olmadığı için Nest 404 döner.', en: 'A `GET /api/v1/bugs` request is sent — even though the route is DEFINED, since it is not REGISTERED with the DI container, Nest returns 404.' },
          positions: { di: { x: 22, y: 40 }, missing: { x: 58, y: 55, scale: 1.2, pulse: true } },
          beams: [{ from: 'di', to: 'missing', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Kod incelemesi "dosya doğru yazılmış" der ama çalışan sistemde route yoktur. Tester her zaman gerçek bir request\'le doğrular.', en: 'The lesson — code review says "the file is written correctly" but the route does not exist in the running system. A tester always verifies with a real request.' },
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
        { id: 3, icon: '🔌', label: { tr: 'DI container bağlasın…', en: 'Let the DI container wire it…' }, detail: { tr: 'Kayıtlı olan controller artık gerçek request\'lere response verebilir.', en: 'Once registered, the controller can now respond to real requests.' } },
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
        { id: '5', text: { tr: 'GET request\'i artık DI container üzerinden controller\'a ulaşır', en: 'A GET request now reaches the controller through the DI container' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d1-module',
      id: 'api-d1-module',
      title: { tr: 'Kendin Dene: Controller\'ı Modüle Kaydet', en: 'Try It Yourself: Register the Controller with the Module' },
      starterCode: { tr: `import { Module } from '@nestjs/common'
import { BugsController } from './bugs.controller'
import { BugsService } from './bugs.service'

// BUG: BugsController dizide yok, kod dogru ama route hic calismayacak
@Module({
  controllers: [],
  providers: [BugsService],
})
export class AppModule {}`, en: `import { Module } from '@nestjs/common'
import { BugsController } from './bugs.controller'
import { BugsService } from './bugs.service'

// BUG: BugsController is not in the array, the code is correct but the route will never run
@Module({
  controllers: [],
  providers: [BugsService],
})
export class AppModule {}` },
      solutionCode: `import { Module } from '@nestjs/common'
import { BugsController } from './bugs.controller'
import { BugsService } from './bugs.service'

@Module({
  controllers: [BugsController],
  providers: [BugsService],
})
export class AppModule {}`,
      hint: { tr: 'Bir sınıfın `@Controller()` decorator\'ıyla doğru yazılmış olması yetmez; Nest\'in DI container\'ının onu tanıması için `@Module({ controllers: [...] })` dizisine EKLENMESİ gerekir.', en: 'A class being correctly written with `@Controller()` is not enough; for Nest\'s DI container to recognize it, it must be ADDED to the `@Module({ controllers: [...] })` array.' },
      successMessage: { tr: 'Doğru! Artık DI container BugsController\'ı tanır, GET /api/v1/bugs gerçekten response döner.', en: 'Correct! Now the DI container recognizes BugsController, GET /api/v1/bugs actually responds.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir controller sınıfı doğru yazılmış ama `@Module`\'ün `controllers` dizisine eklenmemişse ne olur?', en: 'What happens if a controller class is written correctly but is not added to `@Module`\'s `controllers` array?' },
      options: [
        { id: 'a', text: { tr: 'TypeScript derleme hatası verir', en: 'TypeScript throws a compile error' } },
        { id: 'b', text: { tr: 'Uygulama hatasız başlar ama o controller\'ın route\'ları hiç var olmaz; request\'ler 404 alır', en: 'The app starts without error but that controller\'s routes never exist; requests get 404' } },
        { id: 'c', text: { tr: 'Nest otomatik olarak dosyayı tarayıp ekler', en: 'Nest automatically scans and adds the file' } },
        { id: 'd', text: { tr: 'Sadece POST route\'ları etkilenir', en: 'Only POST routes are affected' } },
      ],
      correct: 'b',
      explanation: { tr: 'TypeScript sınıfın kendisini geçerli bulur, derleme hatası vermez. Ama Nest\'in DI container\'ı SADECE `@Module`\'e kayıtlı sınıfları bilir; kayıtsız bir controller\'ın route\'ları hiçbir zaman gerçek bir request\'e response vermez — sanki hiç yazılmamış gibi 404 döner.', en: 'TypeScript finds the class itself valid and throws no compile error. But Nest\'s DI container ONLY knows classes registered with `@Module`; an unregistered controller\'s routes never respond to a real request — they return 404 as if never written.' },
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
        tr: '**🐞 Defect Doğum Anı — `@Body()` decorator\'ı unutulursa**\n\n**Kod:** `create(body: any)` — parametre var, tipi de yazılmış, ama başına `@Body()` decorator\'ı KONMAMIŞ.\n\n**Ne olur:** Nest\'in HTTP adaptörü (Express) gövdeyi zaten ayrıştırmıştır, ama decorator olmadan Nest bu veriyi metoda HANGİ parametreye bağlayacağını bilemez — `body` parametresi `undefined` kalır. `POST /api/v1/bugs { "title": "..." }` request\'i 201 döner ama kayıt tamamen boştur.\n\n**Neden sinsi:** TypeScript hiçbir hata vermez (`body: any` geçerli bir parametredir), Nest de çalışma zamanında sessizce `undefined` geçer — tıpkı C3\'teki `express.json()` sıra hatasının SONUCU gibi görünür ama kök nedeni tamamen farklıdır (orada middleware sırası, burada eksik decorator).\n\n**Tester nerede yakalar:** POST sonrası GET ile kaydı tekrar okuyup tüm alanların boş geldiğini görünce — "201 aldım ama içerik boş" ailesinin NestJS\'teki üçüncü örneği (bkz. B1, C3).',
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
          caption: { tr: 'İstemci `POST /api/v1/bugs` request\'ini JSON gövdeyle gönderiyor.', en: 'The client sends a `POST /api/v1/bugs` request with a JSON body.' },
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
      title: { tr: 'Request\'ten Metot Parametresine', en: 'From Request to Method Parameter' },
      steps: [
        { id: 1, icon: '📤', label: { tr: 'Request gelir…', en: 'Request arrives…' }, detail: { tr: 'HTTP adaptörü gövdeyi/parametreleri ayrıştırır — bu Express katmanının işidir.', en: 'The HTTP adapter parses the body/params — this is the Express layer\'s job.' } },
        { id: 2, icon: '🏷️', label: { tr: 'Decorator bağlar…', en: 'Decorator binds it…' }, detail: { tr: '@Body()/@Param()/@Query() ayrıştırılmış veriyi doğru metot parametresine yerleştirir.', en: '@Body()/@Param()/@Query() place the parsed data into the correct method parameter.' } },
        { id: 3, icon: '⚙️', label: { tr: 'Metot çalışır…', en: 'Method runs…' }, detail: { tr: 'Parametre doluysa handler doğru veriyle çalışır; decorator eksikse undefined ile çalışır.', en: 'If the parameter is filled, the handler runs with correct data; if the decorator is missing, it runs with undefined.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-d2-order-01',
      question: { tr: 'Bir Nest POST request\'inde veri akışını sırala.', en: 'Order the data flow for a Nest POST request.' },
      items: [
        { id: '1', text: { tr: 'İstemci JSON gövdeyle POST request\'i gönderir', en: 'Client sends a POST request with a JSON body' }, order: 1 },
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
      starterCode: { tr: `@Post()
// BUG: parametrenin basinda decorator yok, body her zaman undefined gelir
create(body: any) {
  return this.bugsService.create(body)
}`, en: `@Post()
// BUG: no decorator in front of the parameter, body always comes undefined
create(body: any) {
  return this.bugsService.create(body)
}` },
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
        { id: 'c', text: { tr: 'Request otomatik olarak 400 ile reddedilir', en: 'The request is automatically rejected with 400' } },
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
        tr: '**🐞 Defect Doğum Anı — `app.useGlobalPipes(new ValidationPipe())` unutulursa**\n\n**Kod:** `CreateBugDto` tüm `class-validator` decorator\'larıyla KUSURSUZ yazıldı, controller `@Body() dto: CreateBugDto` ile DOĞRU tip kullanıyor — ama `main.ts`\'te `app.useGlobalPipes(new ValidationPipe())` satırı YOK.\n\n**Ne olur:** Nest, DTO\'yu sadece bir TypeScript TİPİ olarak kullanır (derleme zamanı bilgisi, JavaScript\'e derlenince kaybolur); `class-validator` decorator\'larını kimse ÇALIŞTIRMAZ. `POST /api/v1/bugs { "title": "" }` request\'i 400 yerine 201 döner.\n\n**Neden sinsi:** DTO dosyası açıldığında decorator\'lar tamamen doğru görünür — bir code review "validation var" der ve geçer. Ama decorator\'ların ÇALIŞMASI için global bir pipe\'ın etkinleştirilmesi gerekir; bu, B1\'deki eksik dependency\'den ve C4\'teki okunmayan sonuçtan FARKLI bir üçüncü kök nedendir: "kurallar var, ama hiç TETİKLENMİYOR".\n\n**Tester nerede yakalar:** Boş title ile POST atıp 201 alınca — DTO dosyasını incelemek yeterli değildir, `main.ts`\'te `useGlobalPipes` çağrısının GERÇEKTEN var olduğu ayrıca doğrulanmalıdır.',
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
          caption: { tr: 'İstemci geçersiz bir gövdeyle (`title: ""`) `POST /api/v1/bugs` request\'i gönderiyor.', en: 'The client sends a `POST /api/v1/bugs` request with an invalid body (`title: ""`).' },
          positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Request `CreateBugDto`\'nun sınırından geçer — bu sınıfta `@Length(3,120)` gibi kurallar TANIMLIDIR.', en: 'The request passes through the `CreateBugDto` boundary — this class has rules like `@Length(3,120)` DEFINED on it.' },
          positions: { request: { x: 18, y: 35 }, dto: { x: 55, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'request', to: 'dto', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'DOĞRU KURULUMDA: `ValidationPipe` global olarak etkinse, controller\'a ulaşmadan ÖNCE request\'i durdurup 400 döner.', en: 'IN THE CORRECT SETUP: if `ValidationPipe` is globally active, it stops the request and returns 400 BEFORE it reaches the controller.' },
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
      title: { tr: 'DTO\'dan Reddedilen Request\'e', en: 'From a DTO to a Rejected Request' },
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
        { id: '4', text: { tr: 'Geçersiz request gönder, pipe onu controller\'a ULAŞMADAN durdurur', en: 'Send an invalid request, the pipe stops it BEFORE reaching the controller' }, order: 4 },
        { id: '5', text: { tr: 'Geçerli request 201 ile kaydı oluşturur', en: 'A valid request creates the record with 201' }, order: 5 },
      ],
      xpReward: 13,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d3-pipe',
      id: 'api-d3-pipe',
      title: { tr: 'Kendin Dene: ValidationPipe\'ı Etkinleştir', en: 'Try It Yourself: Activate the ValidationPipe' },
      starterCode: { tr: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// BUG: DTO decorator'lari yazildi ama hicbir zaman calismayacak
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()`, en: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

// BUG: the DTO decorators are written but will never run
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()` },
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
        { id: 'd', text: { tr: 'Sadece GET request\'lerinde doğrulama devre dışı kalır', en: 'Validation is only disabled for GET requests' } },
      ],
      correct: 'b',
      explanation: { tr: '`ValidationPipe` global olarak etkinleştirilmeden, `class-validator` decorator\'ları Nest\'in request işleme hattına HİÇ dahil edilmez — DTO sadece derleme zamanı bir TypeScript tipi olarak kalır. Bu yüzden geçersiz veri de tıpkı geçerli veri gibi controller\'a ulaşır.', en: 'Without `ValidationPipe` being globally activated, `class-validator` decorators are NEVER wired into Nest\'s request pipeline — the DTO remains merely a compile-time TypeScript type. So invalid data reaches the controller just like valid data would.' },
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
        tr: '**🐞 Defect Doğum Anı — `app.useGlobalFilters(...)` unutulursa**\n\n**Kod:** `HttpExceptionFilter` sınıfı `@Catch(HttpException)` ile KUSURSUZ yazıldı, `{ error: exception.message }` sözleşmeye tam uyuyor — ama `main.ts`\'te `app.useGlobalFilters(new HttpExceptionFilter())` çağrısı YOK.\n\n**Ne olur:** `GET /api/v1/bugs/999` request\'i için `throw new NotFoundException(...)` çalışır, ama özel filter kayıtlı olmadığı için Nest kendi VARSAYILAN hata işleyicisine düşer — bu da JSON döner ama proje sözleşmesindeki `{ error: "..." }` yerine Nest\'in kendi şekli olan `{ statusCode: 404, message: "...", error: "Not Found" }`\'u döndürür.\n\n**Neden sinsi:** Request yine JSON döner (Express\'teki HTML sürprizinden farklı olarak SUNUCU tarafında "çökmüş" görünmez), hatta 404 status kodu da doğrudur — ama gövdenin ŞEKLİ projenin beklediğinden farklıdır. Bir tester sadece status kodunu kontrol ediyorsa bu farkı HİÇ fark etmez.\n\n**Tester nerede yakalar:** Hata gövdesinin TAM ŞEKLİNİ (`error` alanının varlığını, `statusCode`/`message` gibi fazladan alanların olup olmadığını) doğrulayan bir assertion yazınca — sadece "404 mü?" diye sormak yetersizdir, "gövde SÖZLEŞMEYE uyuyor mu?" sorusu şarttır.',
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
        { id: '5', text: { tr: 'Sözleşmeye uygun { error } gövdesiyle response döner', en: 'A contract-compliant { error } body is returned' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-d4-filter',
      id: 'api-d4-filter',
      title: { tr: 'Kendin Dene: Filtreyi Global Olarak Kaydet', en: 'Try It Yourself: Register the Filter Globally' },
      starterCode: { tr: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'

// BUG: filter yazildi ama hicbir yerde kayitli degil
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()`, en: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'

// BUG: the filter is written but not registered anywhere
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()` },
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
        { id: 'd', text: { tr: 'Filter sadece POST request\'lerinde çalışır', en: 'The filter only works on POST requests' } },
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
      headers: [{ tr: 'Konu', en: 'Topic' }, 'Spring Boot (Java)', 'Express.js', 'NestJS'],
      rows: [
        [{ tr: 'Route tanımı', en: 'Route definition' }, '@GetMapping("/bugs")', "app.get('/bugs', handler)", '@Get()'],
        [{ tr: 'Body okuma', en: 'Reading body' }, '@RequestBody BugRequest req', { tr: 'req.body (express.json() şart)', en: 'req.body (express.json() required)' }, '@Body() dto: CreateBugDto'],
        ['Validation', '@Valid + Bean Validation', { tr: 'express-validator / zod (elle okunur)', en: 'express-validator / zod (read manually)' }, 'ValidationPipe + class-validator'],
        [{ tr: 'Hata yönetimi', en: 'Error handling' }, '@RestControllerAdvice', { tr: '4 parametreli (err,req,res,next)', en: '4-parameter (err,req,res,next)' }, '@Catch() Exception Filter'],
        [{ tr: 'DI (bağımlılık enjeksiyonu)', en: 'DI (dependency injection)' }, 'Spring IoC container', { tr: 'manuel / factory fonksiyon', en: 'manual / factory function' }, 'Nest IoC container'],
        [{ tr: 'Modül/kayıt kaygısı', en: 'Registration' }, { tr: 'Component scan otomatik', en: 'Automatic component scan' }, { tr: 'Yok — dosya import edilince aktif', en: 'None — active once the file is imported' }, { tr: '@Module dizisine EKLENMEZSE controller yok sayılır', en: 'If NOT ADDED to the @Module array, the controller is ignored' }],
        [{ tr: 'En sık sessiz hata', en: 'Most common silent bug' }, { tr: 'Eksik starter/annotation', en: 'Missing starter/annotation' }, { tr: 'Yanlış middleware sırası', en: 'Wrong middleware order' }, { tr: 'Unutulan global pipe/filter/modül kaydı', en: 'Forgotten global pipe/filter/module registration' }],
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
      starterCode: { tr: `// Spring Boot (Java):
// @RestControllerAdvice
// public class GlobalExceptionHandler {
//   @ExceptionHandler(NotFoundException.class)
//   public ResponseEntity<?> handle(NotFoundException ex) { ... }
// }

// TODO: ayni isi yapan Nest yapisinin decorator'larini yaz
`, en: `// Spring Boot (Java):
// @RestControllerAdvice
// public class GlobalExceptionHandler {
//   @ExceptionHandler(NotFoundException.class)
//   public ResponseEntity<?> handle(NotFoundException ex) { ... }
// }

// TODO: write the decorators of the Nest structure that does the same job
` },
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
        explanation: { tr: 'B1 (eksik starter), C3-C5 (yanlış middleware sırası), D1-D4 (kayıtsız controller/pipe/filter) — hepsi AYNI köke iner: doğru görünen kod, framework tarafından GERÇEKTEN devreye alınmadıkça hiçbir şey garanti etmez. Bu yüzden tester her zaman gerçek bir request\'le davranışı doğrular, kod incelemesiyle yetinmez.', en: 'B1 (missing starter), C3-C5 (wrong middleware order), D1-D4 (unregistered controller/pipe/filter) — all trace back to the SAME root: code that looks correct guarantees nothing until it is REALLY activated by the framework. This is why a tester always verifies behavior with a real request, never settling for a code review alone.' },
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
  <text x='20' y='26' fill='#94a3b8' font-size='12' font-weight='bold'>Unfiltered (All)</text>
  <rect x='16' y='34' width='140' height='24' rx='5' fill='#2a2c45'/><text x='24' y='50' fill='#94a3b8' font-size='11'>logo.svg (img)</text>
  <rect x='16' y='62' width='140' height='24' rx='5' fill='#2a2c45'/><text x='24' y='78' fill='#94a3b8' font-size='11'>style.css</text>
  <rect x='16' y='90' width='140' height='24' rx='5' fill='#1a2e22'/><text x='24' y='106' fill='#e5e7eb' font-size='11'>bugs (fetch)</text>
  <rect x='16' y='118' width='140' height='24' rx='5' fill='#2a2c45'/><text x='24' y='134' fill='#94a3b8' font-size='11'>font.woff2</text>
  <path d='M 180 90 L 260 90' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrow)'/>
  <defs><marker id='arrow' markerWidth='8' markerHeight='8' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 z' fill='#f59e0b'/></marker></defs>
  <text x='210' y='60' fill='#f59e0b' font-size='11' font-weight='bold'>Fetch/XHR</text>
  <text x='300' y='26' fill='#94a3b8' font-size='12' font-weight='bold'>Filtered</text>
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
  <text x='20' y='128' fill='#f59e0b' font-size='12' font-weight='bold'>Toplam 2.9s icinde en buyuk pay Waiting -> SERVER is at fault, not the network</text>
</svg>`

const silentBugSvg = `<svg viewBox='0 0 680 170' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <text x='20' y='28' fill='#94a3b8' font-size='12' font-weight='bold'>UI</text>
  <rect x='16' y='36' width='300' height='60' rx='8' fill='#142314'/>
  <text x='36' y='72' fill='#4ade80' font-size='14' font-weight='bold'>✔ "Bug created successfully"</text>
  <text x='360' y='28' fill='#94a3b8' font-size='12' font-weight='bold'>Network</text>
  <rect x='356' y='36' width='308' height='60' rx='8' fill='#3a1a1a'/>
  <text x='372' y='60' fill='#f87171' font-size='13' font-family='monospace'>POST /api/v1/bugs</text>
  <text x='372' y='82' fill='#f87171' font-size='16' font-weight='bold'>500 Internal Server Error</text>
  <path d='M 320 66 L 352 66' stroke='#ef4444' stroke-width='2' stroke-dasharray='4 3'/>
  <text x='120' y='130' fill='#f59e0b' font-size='12' font-weight='bold'>UI shows NO error — only the Network row tells the truth</text>
</svg>`

const curlImportFlowSvg = `<svg viewBox='0 0 680 150' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <rect x='16' y='50' width='150' height='50' rx='8' fill='#242640'/><text x='34' y='80' fill='#e5e7eb' font-size='12'>Network row</text>
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
        tr: 'DevTools Network paneli, bir **hava trafik kontrol kulesinin radar ekranı** gibidir: her uçuş (request) ekranda bir satır olarak belirir — nereye gittiği (Name), inişinin başarılı olup olmadığı (Status), ne taşıdığı (Type), ne kadar yer kapladığı (Size) ve ne kadar sürdüğü (Time) tek bakışta görünür. Peki Postman zaten varken, tarayıcının kendi radarına neden bakıyoruz? Çünkü Postman SEN request\'i gönderdiğinde çalışır — ama gerçek kullanıcı deneyiminde request\'ler UI\'nın kendisi (JavaScript) tarafından, senin haberin olmadan tetiklenir; Network paneli UI\'nın ARKASINDA gerçekten ne olduğunu gösteren TEK yerdir. Java\'da bunun en yakın karşılığı bir `HttpClient` loglama interceptor\'ıdır — `OkHttp`\'nin `HttpLoggingInterceptor`\'ı gibi, her giden request\'i ve gelen response\'u konsola yazar; DevTools Network de tarayıcının GUI\'li, otomatik interceptor\'ıdır. QA açısından bu panel, kariyerinin en sık kullanacağın araçlarından biri olur çünkü şu senaryoyu SIK yaşarsın: ekranda her şey normal görünür, buton "Başarılı!" der — ama Network panelini açtığında kırmızı bir 500 satırı seni bekliyordur. UI seni yanıltabilir, Network paneli yanıltmaz.',
        en: 'The DevTools Network panel is like an **air traffic control tower\'s radar screen**: every flight (request) appears as a row on screen — where it is going (Name), whether it landed successfully (Status), what it is carrying (Type), how much space it takes (Size), and how long it took (Time) are all visible at a glance. So if Postman already exists, why look at the browser\'s own radar? Because Postman runs when YOU send the request — but in a real user experience, requests are triggered by the UI itself (JavaScript), without you knowing; the Network panel is the ONLY place that shows what REALLY happens BEHIND the UI. The closest Java equivalent is an `HttpClient` logging interceptor — like OkHttp\'s `HttpLoggingInterceptor`, which writes every outgoing request and incoming response to the console; DevTools Network is the browser\'s GUI-based, automatic interceptor. For QA this panel becomes one of the most-used tools in your career because you WILL repeatedly face this scenario: everything looks normal on screen, the button says "Success!" — but opening the Network panel, a red 500 row is waiting for you. The UI can mislead you, the Network panel does not.',
      },
    },
    { type: 'heading', text: { tr: 'Beş Sütun: Tek Bakışta Bir Request\'in Özeti', en: 'Five Columns: A Request\'s Summary at a Glance' } },
    {
      type: 'text',
      content: {
        tr: 'Her satır bir HTTP request\'tir. **Name** yolu/dosya adını, **Status** sunucunun cevabını (200/404/500...), **Type** request\'in türünü (`fetch`/`xhr`/`img`/`css`), **Size** response\'un boyutunu, **Time** ne kadar sürdüğünü gösterir. `/api/v1/bugs` gibi bir API request\'i genelde `fetch` veya `xhr` tipindedir — bu, E2\'de kullanacağın filtrenin temelidir.',
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
      title: { tr: '🎬 Bir Request Network Panelinde Nasıl Belirir?', en: '🎬 How a Request Appears in the Network Panel' },
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
          caption: { tr: 'Sunucudan response gelince Status (200/500), Size ve Time sütunları anında güncellenir.', en: 'When the server responds, the Status (200/500), Size, and Time columns update instantly.' },
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
      title: { tr: 'DevTools\'u Açıp İlk Request\'i Görmek', en: 'Opening DevTools and Seeing the First Request' },
      steps: [
        { id: 1, icon: '⌨️', label: { tr: 'DevTools\'u aç…', en: 'Open DevTools…' }, detail: { tr: 'F12 veya sağ tık → İncele, sonra Network sekmesine geç.', en: 'F12 or right-click → Inspect, then switch to the Network tab.' } },
        { id: 2, icon: '🔄', label: { tr: 'Bir eylem tetikle…', en: 'Trigger an action…' }, detail: { tr: 'Sayfayı yenile veya bir API çağrısı yapan bir butona tıkla.', en: 'Refresh the page or click a button that triggers an API call.' } },
        { id: 3, icon: '👀', label: { tr: 'Satırı oku…', en: 'Read the row…' }, detail: { tr: 'Name/Status/Type/Size/Time sütunlarına bakarak request\'in özetini çıkar.', en: 'Read Name/Status/Type/Size/Time to get the request\'s summary.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e1-order-01',
      question: { tr: 'Network panelinde bir request\'i ilk kez incelerken izlenecek sırayı diz.', en: 'Order the steps for inspecting a request in the Network panel for the first time.' },
      items: [
        { id: '1', text: { tr: 'DevTools\'u aç, Network sekmesine geç', en: 'Open DevTools, switch to the Network tab' }, order: 1 },
        { id: '2', text: { tr: 'Eylemi tetikle (yenile/butona tıkla)', en: 'Trigger the action (refresh/click button)' }, order: 2 },
        { id: '3', text: { tr: 'Yeni satırın Name sütununu oku', en: 'Read the new row\'s Name column' }, order: 3 },
        { id: '4', text: { tr: 'Status sütununa bak — 2xx mi 4xx/5xx mi?', en: 'Check the Status column — 2xx or 4xx/5xx?' }, order: 4 },
        { id: '5', text: { tr: 'Size ve Time ile request\'in ağırlığını/hızını değerlendir', en: 'Assess the request\'s weight/speed via Size and Time' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e1-panel-anatomy',
      id: 'api-e1-panel-anatomy',
      title: { tr: 'Kendin Dene: Doğru Sütunu Eşle', en: 'Try It Yourself: Match the Right Column' },
      starterCode: { tr: `// Network panelinde bir satir: /api/v1/bugs -> 500 -> fetch -> 0.3 kB -> 612 ms
// TODO: "sunucunun cevabini" hangi sutun gosterir?
Sutun adi: ???`, en: `// A row in the Network panel: /api/v1/bugs -> 500 -> fetch -> 0.3 kB -> 612 ms
// TODO: "sunucunun cevabini" hangi sutun gosterir?
Sutun adi: ???` },
      solutionCode: `// Sunucunun cevabini (basarili/basarisiz) gosteren sutun STATUS'tur
Sutun adi: Status`,
      hint: { tr: 'Name yolu, Type request\'in türünü, Size response boyutunu, Time süreyi gösterir. Sunucunun "başardım/başaramadım" cevabını taşıyan tek sütun Status\'tur.', en: 'Name shows the path, Type the request kind, Size the response size, Time the duration. The only column carrying the server\'s "I succeeded/failed" answer is Status.' },
      successMessage: { tr: 'Doğru! Status sütunu, bir request\'in gerçekten başarılı olup olmadığının tek güvenilir kanıtıdır.', en: 'Correct! The Status column is the only reliable evidence of whether a request truly succeeded.' },
    },
    {
      type: 'quiz',
      question: { tr: 'UI ekranda "Bug başarıyla oluşturuldu" mesajı gösteriyor. Bunun gerçekten doğru olduğunu nasıl doğrularsın?', en: 'The UI shows "Bug created successfully" on screen. How do you verify this is really true?' },
      options: [
        { id: 'a', text: { tr: 'Mesaja güvenip geçerim, UI zaten doğru söylüyordur', en: 'Trust the message and move on, the UI is surely telling the truth' } },
        { id: 'b', text: { tr: 'Network panelini açıp request\'in GERÇEK Status kodunu kontrol ederim', en: 'Open the Network panel and check the request\'s REAL Status code' } },
        { id: 'c', text: { tr: 'Sayfayı yeniden başlatırım', en: 'Restart the page' } },
        { id: 'd', text: { tr: 'Sadece ekran görüntüsü alırım', en: 'Just take a screenshot' } },
      ],
      correct: 'b',
      explanation: { tr: 'UI mesajları geliştiricinin YAZDIĞI metindir, sunucunun GERÇEK cevabı değildir — bir hata durumunda bile yanlışlıkla "başarılı" mesajı gösterilebilir. Network panelindeki Status sütunu, sunucunun ne döndürdüğünün tek doğrudan kanıtıdır.', en: 'UI messages are text the developer WROTE, not the server\'s REAL answer — even on failure, a "success" message can mistakenly show. The Status column in the Network panel is the only direct evidence of what the server actually returned.' },
      retryQuestion: {
        question: { tr: 'Network panelindeki "Type" sütunu ne gösterir?', en: 'What does the "Type" column in the Network panel show?' },
        options: [
          { id: 'a', text: { tr: 'Request\'in türünü (fetch, xhr, img, css gibi)', en: 'The kind of request (fetch, xhr, img, css, etc.)' } },
          { id: 'b', text: { tr: 'Sunucunun IP adresini', en: 'The server\'s IP address' } },
          { id: 'c', text: { tr: 'Kullanıcının tarayıcı sürümünü', en: 'The user\'s browser version' } },
          { id: 'd', text: { tr: 'Request\'in ne zaman gönderildiğini', en: 'When the request was sent' } },
        ],
        correct: 'a',
        explanation: { tr: 'Type sütunu request\'in kaynağını/türünü gösterir — bir API çağrısı genelde `fetch`/`xhr`, bir resim `img`, bir stil dosyası `css`\'tir. Bu ayrım, E2\'de göreceğin filtrelemenin temelidir.', en: 'The Type column shows the request\'s source/kind — an API call is usually `fetch`/`xhr`, an image is `img`, a stylesheet is `css`. This distinction is the basis of the filtering you will see in E2.' },
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
        tr: 'Fetch/XHR filtresi, bir **radyo istasyonu ayar düğmesi** gibidir: eter (tüm ağ trafiği) yüzlerce frekansla (resim, CSS, font, reklam scripti, API request\'i) doludur; filtre olmadan bir sayfa yüklemesi onlarca satır üretir ve aradığın TEK API request\'ini bulmak saman yığınında iğne aramaya döner. Filtreyi "Fetch/XHR"a çevirdiğinde, sadece JavaScript\'in kod içinden başlattığı request\'ler (tam da API çağrıların) kalır — statik dosyalar (resim, font, stil) sessizleşir. Peki neden tarayıcı varsayılan olarak HER ŞEYİ göstersin ki, API testerının işini zorlaştırsın? Çünkü Network paneli SADECE testerlar için değildir — bir frontend geliştirici performans optimizasyonu yaparken TÜM kaynakları (resimler dahil) görmek ister; filtre, senin ROLÜNE göre gürültüyü SEN ayıklarsın. Java\'da bunun karşılığı log seviyesi filtrelemedir: `DEBUG` seviyesinde HER ŞEY loglanır, ama sen sadece `ERROR` seviyesini görmek istersin — log4j/logback\'te seviyeyi süzersin, DevTools\'ta da request TÜRÜNÜ süzersin. QA açısından bu filtre olmadan çalışmak ciddi bir risktir: 50 satırlık bir sayfa yüklemesinde gerçek API request\'ini KAÇIRMAK, bir defect\'i hiç görmeden geçmek anlamına gelir.',
        en: 'The Fetch/XHR filter is like a **radio tuning dial**: the ether (all network traffic) is full of hundreds of frequencies (images, CSS, fonts, ad scripts, API calls); without a filter, loading one page produces dozens of rows and finding the ONE API request you want becomes finding a needle in a haystack. Turning the filter to "Fetch/XHR" leaves only the requests JavaScript itself started from code (exactly your API calls) — static files (images, fonts, styles) go quiet. So why does the browser show EVERYTHING by default, making an API tester\'s job harder? Because the Network panel is NOT only for testers — a frontend developer doing performance work wants to see ALL resources (images included); the filter lets YOU cut the noise according to YOUR role. The Java equivalent is log-level filtering: at `DEBUG` level EVERYTHING is logged, but you only want to see `ERROR` — you filter by level in log4j/logback, and in DevTools you filter by request TYPE. For QA, working without this filter is a real risk: MISSING the real API request in a 50-row page load means walking right past a defect without ever seeing it.',
      },
    },
    { type: 'heading', text: { tr: 'Gürültüden Sinyale', en: 'From Noise to Signal' } },
    {
      type: 'text',
      content: {
        tr: 'Network panelinin üstündeki filtre çubuğunda `Fetch/XHR` seçeneğine tıklamak, listeyi sadece JavaScript kodunun (`fetch()`/`XMLHttpRequest`) başlattığı request\'lere indirger. Bir metin araması (`bugs`) ile de daraltabilirsin. Bu ikisi birlikte, düzinelerce statik dosya arasından tam olarak aradığın API request\'ine saniyeler içinde ulaştırır.',
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
      title: { tr: '🎬 50 Satır Arasında Kaybolan Tek API Request', en: '🎬 The One API Request Lost Among 50 Rows' },
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
          caption: { tr: 'Sayfa yüklenir: resimler, fontlar, stiller, reklam scriptleri ve BİR API request\'i — toplam 50 satır.', en: 'The page loads: images, fonts, styles, ad scripts, and ONE API request — 50 rows total.' },
          positions: { load: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Filtre kullanmadan tester gözle satır satır arar — yavaş ve hataya açık.', en: 'Without a filter the tester searches row by row with their eyes — slow and error-prone.' },
          positions: { load: { x: 20, y: 40 }, search: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'load', to: 'search', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Filtre çubuğunda "Fetch/XHR" seçilir — sadece JavaScript\'in başlattığı request\'ler kalır.', en: 'The "Fetch/XHR" option is selected in the filter bar — only JavaScript-started requests remain.' },
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
        { id: 2, icon: '🎚️', label: { tr: 'Fetch/XHR\'ı seç…', en: 'Select Fetch/XHR…' }, detail: { tr: 'Filtre çubuğunda Fetch/XHR\'a tıkla — sadece JS kaynaklı request\'ler kalır.', en: 'Click Fetch/XHR in the filter bar — only JS-originated requests remain.' } },
        { id: 3, icon: '🔎', label: { tr: 'Metinle daralt…', en: 'Narrow with text…' }, detail: { tr: 'Gerekirse "bugs" gibi bir arama terimiyle listeyi tek satıra indir.', en: 'If needed, narrow to a single row with a search term like "bugs".' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e2-order-01',
      question: { tr: 'Kalabalık bir sayfa yüklemesinde tek bir API request\'ini bulma sırasını diz.', en: 'Order the steps to find one API request in a crowded page load.' },
      items: [
        { id: '1', text: { tr: 'Sayfayı yükle, Network panelini gözlemle', en: 'Load the page, observe the Network panel' }, order: 1 },
        { id: '2', text: { tr: 'Filtre çubuğunda Fetch/XHR\'ı seç', en: 'Select Fetch/XHR in the filter bar' }, order: 2 },
        { id: '3', text: { tr: 'Kalan listeyi metin aramasıyla daralt', en: 'Narrow the remaining list with a text search' }, order: 3 },
        { id: '4', text: { tr: 'Hedef API request\'ini tek satırda bul', en: 'Find the target API request in a single row' }, order: 4 },
        { id: '5', text: { tr: 'Status/Time üzerinden request\'i değerlendir', en: 'Evaluate the request via Status/Time' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e2-fetch-xhr-filter',
      id: 'api-e2-fetch-xhr-filter',
      title: { tr: 'Kendin Dene: Fetch/XHR Filtresinde Kalanı Seç', en: 'Try It Yourself: Pick What Survives the Fetch/XHR Filter' },
      starterCode: { tr: `// Filtrelenmemis liste: logo.svg (img), style.css, /api/v1/bugs (fetch), font.woff2
// TODO: Fetch/XHR filtresi acildiginda listede SADECE hangisi kalir?
Kalan: ???`, en: `// Unfiltered list: logo.svg (img), style.css, /api/v1/bugs (fetch), font.woff2
// TODO: when the Fetch/XHR filter is on, which one ONLY remains in the list?
Kalan: ???` },
      solutionCode: { tr: `// Sadece JavaScript'in baslattigi request (fetch/xhr turu) kalir
Kalan: /api/v1/bugs (fetch)`, en: `// Only the requests started by JavaScript (fetch/xhr type) remain
Kalan: /api/v1/bugs (fetch)` },
      hint: { tr: '`img`, `css` ve `font` türündeki dosyalar tarayıcının kendisi tarafından sayfa render edilirken istenir — bunlar JavaScript kodundan değildir, bu yüzden Fetch/XHR filtresinde ELENİR.', en: '`img`, `css`, and `font` type files are requested by the browser itself while rendering the page — these do not come from JavaScript code, so they are FILTERED OUT by the Fetch/XHR filter.' },
      successMessage: { tr: 'Doğru! Fetch/XHR filtresi tam olarak API request\'lerinin yaşadığı yerdir.', en: 'Correct! Fetch/XHR is exactly where API requests live in the filter.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Fetch/XHR filtresi neden tercih edilir?', en: 'Why is the Fetch/XHR filter preferred?' },
      options: [
        { id: 'a', text: { tr: 'Sadece JavaScript kodunun başlattığı request\'leri (API çağrıları) gösterip statik dosya gürültüsünü eler', en: 'It shows only requests started by JavaScript code (API calls) and cuts static-file noise' } },
        { id: 'b', text: { tr: 'Tüm request\'lerin hızını otomatik artırır', en: 'It automatically speeds up all requests' } },
        { id: 'c', text: { tr: 'Sadece HTTPS request\'lerini gösterir', en: 'It shows only HTTPS requests' } },
        { id: 'd', text: { tr: 'Sunucudaki hataları otomatik düzeltir', en: 'It automatically fixes server-side errors' } },
      ],
      correct: 'a',
      explanation: { tr: 'Fetch/XHR filtresi, request\'in TÜRÜNE göre süzer: resim/font/CSS gibi statik kaynak request\'leri (tarayıcı tarafından otomatik başlatılır) elenir, sadece JavaScript\'in `fetch()`/`XMLHttpRequest` ile başlattığı — yani genelde API — request\'ler kalır.', en: 'The Fetch/XHR filter sieves by request TYPE: static resource requests like images/fonts/CSS (auto-started by the browser) are filtered out, leaving only requests JavaScript started with `fetch()`/`XMLHttpRequest` — typically API calls.' },
      retryQuestion: {
        question: { tr: 'Filtre kullanmadan Network panelinde API request\'i aramanın en büyük riski nedir?', en: 'What is the biggest risk of searching for an API request in the Network panel without a filter?' },
        options: [
          { id: 'a', text: { tr: 'Onlarca alakasız satır arasında gerçek request\'i/defect\'i kaçırmak', en: 'Missing the real request/defect among dozens of unrelated rows' } },
          { id: 'b', text: { tr: 'Tarayıcının çökmesi', en: 'Crashing the browser' } },
          { id: 'c', text: { tr: 'Sunucunun request\'i reddetmesi', en: 'The server rejecting the request' } },
          { id: 'd', text: { tr: 'İnternet bağlantısının kesilmesi', en: 'Losing the internet connection' } },
        ],
        correct: 'a',
        explanation: { tr: 'Filtre olmadan bir sayfa yüklemesi onlarca satır üretebilir; bu kalabalıkta gerçek API request\'ini (ve içindeki olası bir 500/boş body defect\'ini) atlamak kolaydır — filtre bu riski ortadan kaldırır.', en: 'Without a filter, one page load can produce dozens of rows; in that crowd it is easy to skip the real API request (and a possible 500/empty-body defect inside it) — the filter removes that risk.' },
      },
    },
  ],
}

const E3 = {
  title: { tr: '📖 E3 · Bir Request\'i Okumak: Headers / Payload / Preview / Response / Timing', en: '📖 E3 · Reading a Request: Headers / Payload / Preview / Response / Timing' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📖',
      content: {
        tr: 'Bir Network rowna tıklayıp açılan 5 sekme (`Headers`, `Payload`, `Preview`, `Response`, `Timing`), bir **zarfı katman katman açmak** gibidir: `Headers` zarfın dışındaki adres/pul bilgisidir (meta veri — Content-Type, Authorization); `Payload` içindeki mektubun SEN gönderdiğin hâlidir (request gövdesi); `Response` sunucudan gelen mektubun HAM hâlidir (ayrıştırılmamış metin); `Preview` ise aynı mektubun OKUNAKLI, biçimlendirilmiş hâlidir (JSON güzelce girintili); `Timing` ise mektubun postalanmasından teslimine kadar geçen süredir. Peki `Response` varken `Preview`\'e neden ihtiyaç var — ikisi aynı veriyi göstermiyor mu? Evet aynı veriyi gösterirler ama `Response` ham metindir (büyük bir JSON\'da okumak gözünü yorar), `Preview` ise tarayıcının senin için AYRIŞTIRIP güzelce sunduğu hâlidir — küçük farkları (bir alanın eksikliği, yanlış tipte bir değer) `Preview`\'de çok daha hızlı yakalarsın. Java\'da bunun karşılığı bir `HttpResponse` nesnesinin `headers()`, `body()` alanlarıdır — `Payload` bir `HttpRequest.BodyPublisher`\'a, `Response` bir `HttpResponse<String>`\'e karşılık gelir; `Timing` ise bir profiler\'ın ölçtüğü süreye. QA açısından bu 5 sekmeyi ayrı ayrı bilmek kritiktir çünkü bir hata farklı sekmelerde farklı görünür: yanlış `Content-Type` `Headers`\'da, eksik bir alan `Payload`\'da, beklenmeyen bir `passwordHash` alanı `Response`\'ta saklıdır.',
        en: 'The 5 tabs (`Headers`, `Payload`, `Preview`, `Response`, `Timing`) that open when you click a Network row are like **opening an envelope layer by layer**: `Headers` is the address/stamp info on the outside of the envelope (metadata — Content-Type, Authorization); `Payload` is the letter inside as YOU sent it (the request body); `Response` is the RAW form of the letter that came back from the server (unparsed text); `Preview` is the same letter\'s READABLE, formatted form (JSON nicely indented); `Timing` is how long it took from posting to delivery. So why do we need `Preview` when `Response` exists — don\'t they show the same data? Yes, they show the same data, but `Response` is raw text (tiring on the eyes in a large JSON), while `Preview` is the browser PARSING and presenting it nicely for you — small differences (a missing field, a wrongly typed value) are caught much faster in `Preview`. The Java equivalent is an `HttpResponse` object\'s `headers()`, `body()` fields — `Payload` maps to an `HttpRequest.BodyPublisher`, `Response` to an `HttpResponse<String>`, `Timing` to what a profiler measures. For QA, knowing these 5 tabs separately is critical because a bug shows up differently in different tabs: a wrong `Content-Type` hides in `Headers`, a missing field in `Payload`, an unexpected `passwordHash` field in `Response`.',
      },
    },
    { type: 'heading', text: { tr: 'Zarfı Katman Katman Açmak', en: 'Opening the Envelope Layer by Layer' } },
    {
      type: 'text',
      content: {
        tr: 'Bir satıra tıkladığında yan panelde bu 5 sekme açılır. `Preview` sekmesi, sunucunun döndürdüğü JSON\'u okunaklı ağaç yapısında gösterir — özellikle büyük response\'larda ilk bakılacak sekme budur.',
        en: 'Clicking a row opens these 5 tabs in the side panel. The `Preview` tab shows the JSON the server returned in a readable tree structure — this is the first tab to check, especially for large responses.',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Bir Request\'in 5 Sekmesi (Preview seçili)', en: 'A Request\'s 5 Tabs (Preview selected)' },
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
        { id: 'row', emoji: '📡', label: { tr: 'Network rowna tıkla', en: 'Click the Network row' }, color: '#f59e0b' },
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
          caption: { tr: '`Payload` sekmesi testerın gönderdiği request\'i aynen gösterir — "ben ne yolladım?" sorusunun cevabı.', en: 'The `Payload` tab shows exactly what the tester sent — the answer to "what did I send?"' },
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
      title: { tr: 'Bir Request\'i Baştan Sona Okuma Sırası', en: 'The Order for Reading a Request End to End' },
      steps: [
        { id: 1, icon: '📇', label: { tr: 'Headers\'a bak…', en: 'Check Headers…' }, detail: { tr: 'Content-Type, Authorization gibi meta bilgilerin doğru olduğunu doğrula.', en: 'Verify metadata like Content-Type, Authorization is correct.' } },
        { id: 2, icon: '📝', label: { tr: 'Payload\'ı doğrula…', en: 'Verify Payload…' }, detail: { tr: 'POST/PUT request\'lerinde gerçekten göndermeyi düşündüğün veriyi gönderdiğini kontrol et.', en: 'On POST/PUT requests, check you really sent the data you intended.' } },
        { id: 3, icon: '📥', label: { tr: 'Preview/Response\'u incele…', en: 'Inspect Preview/Response…' }, detail: { tr: 'Sunucunun döndürdüğü gerçek veriyi (ve olmaması gereken alanları) kontrol et, sonra Timing\'e bak.', en: 'Check the real data the server returned (and any field that should not be there), then check Timing.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e3-order-01',
      question: { tr: 'Bir request\'i baştan sona incelerken sekmeleri sırala.', en: 'Order the tabs when inspecting a request end to end.' },
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
      starterCode: { tr: `// Sorun: response govdesinde olmamasi gereken bir "passwordHash" alani var
// TODO: bu sizintiyi hangi sekmede yakalarsin?
Sekme: ???`, en: `// Problem: the response body has a "passwordHash" field that should not be there
// TODO: bu sizintiyi hangi sekmede yakalarsin?
Sekme: ???` },
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
        { id: 'b', text: { tr: 'İkisi tamamen farklı request\'lere aittir', en: 'They belong to completely different requests' } },
        { id: 'c', text: { tr: 'Preview sadece hata durumunda görünür', en: 'Preview only appears on errors' } },
        { id: 'd', text: { tr: 'Response sadece GET request\'lerinde vardır', en: 'Response only exists for GET requests' } },
      ],
      correct: 'a',
      explanation: { tr: 'Her iki sekme de AYNI response verisini gösterir; `Response` sunucudan geldiği ham hâliyle, `Preview` ise tarayıcının ayrıştırıp okunaklı bir ağaç yapısında sunduğu hâliyle. Küçük farkları (eksik alan, sızan alan) yakalamak için `Preview` genelde daha hızlıdır.', en: 'Both tabs show the SAME response data; `Response` in its raw form as it came from the server, `Preview` as the browser parses and presents it in a readable tree. `Preview` is usually faster for catching small differences (a missing field, a leaked field).' },
      retryQuestion: {
        question: { tr: '`Payload` sekmesi neyi gösterir?', en: 'What does the `Payload` tab show?' },
        options: [
          { id: 'a', text: { tr: 'İstemcinin (senin) sunucuya gönderdiği request gövdesini', en: 'The request body the client (you) sent to the server' } },
          { id: 'b', text: { tr: 'Sunucunun döndürdüğü veriyi', en: 'The data the server returned' } },
          { id: 'c', text: { tr: 'Request\'in ne kadar sürdüğünü', en: 'How long the request took' } },
          { id: 'd', text: { tr: 'Tarayıcının önbelleğini', en: 'The browser\'s cache' } },
        ],
        correct: 'a',
        explanation: { tr: '`Payload`, POST/PUT/PATCH gibi bir gövde taşıyan request\'lerde SENİN gönderdiğin veriyi gösterir — sunucunun cevabı değil. "Ben gerçekten doğru veriyi mi gönderdim?" sorusunu bu sekmede cevaplarsın.', en: '`Payload` shows the data YOU sent on requests carrying a body, like POST/PUT/PATCH — not the server\'s answer. You answer "did I really send the right data?" in this tab.' },
      },
    },
  ],
}

const E4 = {
  title: { tr: '⏱️ E4 · Timing Sekmesi: TTFB, Waiting, Download', en: '⏱️ E4 · Timing Tab: TTFB, Waiting, Download' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '⏱️',
      content: {
        tr: 'Timing sekmesi, bir **kargo takip sayfası** gibidir: bir request "yola çıktığında" tek bir "2.9 saniye sürdü" sayısı sana hiçbir şey ANLATMAZ, ama kargo takibi gibi süreyi aşamalara bölersen ("depoda bekledi", "yolda gitti", "kapıya teslim edildi") gecikmenin TAM OLARAK nerede olduğunu görürsün. `TTFB` (Time To First Byte) = sunucunun ilk baytı göndermesi ne kadar sürdü, `Waiting` = sunucunun request\'i İŞLEMESİ ne kadar sürdü (genelde en büyük dilim), `Content Download` = response verisinin İNMESİ ne kadar sürdü. Peki neden bu ayrım bu kadar önemli — "3 saniye yavaş" demek yetmez mi? Çünkü çözüm TAMAMEN farklıdır: `Waiting` büyükse suçlu SUNUCUdur (yavaş bir SQL sorgusu, N+1 problemi — geliştiriciye escalate edilir), `Content Download` büyükse suçlu VERİ BOYUTU/AĞdır (gereksiz büyük bir JSON, sıkıştırma eksikliği). Java\'da bunun karşılığı bir metodun içine konan `System.currentTimeMillis()` ile yapılan elle profiling\'dir — ama orada SEN segmentleri elle ölçersin, tarayıcı Timing sekmesinde bunu SENİN için otomatik yapar. QA açısından "yavaş" bir performans bug raporu Timing verisi olmadan neredeyse değersizdir — geliştirici "hangi katman yavaş?" diye sorduğunda "bilmiyorum, genel olarak yavaştı" cevabı, raporu geri gönderilmeye mahkûm eder.',
        en: 'The Timing tab is like a **package tracking page**: a single number saying a request "took 2.9 seconds" TELLS YOU NOTHING, but like package tracking, if you split the time into phases ("waited in the warehouse", "was in transit", "delivered to the door") you see EXACTLY where the delay is. `TTFB` (Time To First Byte) = how long the server took to send its first byte, `Waiting` = how long the server took to PROCESS the request (usually the biggest slice), `Content Download` = how long the response data took to DOWNLOAD. So why does this split matter so much — isn\'t "3 seconds slow" enough to say? Because the fix is COMPLETELY different: if `Waiting` is large the culprit is the SERVER (a slow SQL query, an N+1 problem — escalate to the developer); if `Content Download` is large the culprit is DATA SIZE/NETWORK (an unnecessarily huge JSON, missing compression). The Java equivalent is manual profiling with `System.currentTimeMillis()` inside a method — but there YOU measure the segments by hand, in the browser the Timing tab does it automatically FOR you. For QA, a "slow" performance bug report is nearly worthless without Timing data — when a developer asks "which layer is slow?", answering "I don\'t know, it was generally slow" gets the report bounced back.',
      },
    },
    { type: 'heading', text: { tr: 'Bir Request\'in Üç Aşaması', en: 'A Request\'s Three Phases' } },
    {
      type: 'text',
      content: {
        tr: 'Timing sekmesindeki yatay çubuk, bir request\'in süresini renkli dilimlere ayırır. `TTFB` genelde küçüktür (sunucunun "aldım" demesi hızlıdır); `Waiting` request\'in GERÇEKTEN işlendiği süredir — burada bir veritabanı sorgusu, bir dış servis çağrısı veya kötü bir algoritma zaman harcayabilir; `Content Download` ise büyük bir response gövdesinin (örn. binlerce bug kaydı) inmesi için geçen süredir.',
        en: 'The horizontal bar in the Timing tab splits a request\'s duration into colored slices. `TTFB` is usually small (the server saying "got it" is fast); `Waiting` is the time the request is REALLY being processed — a database query, an external service call, or a bad algorithm can eat time here; `Content Download` is how long a large response body (e.g. thousands of bug records) takes to download.',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Timing Çubuğu — TTFB / Waiting / Content Download', en: 'Timing Bar — TTFB / Waiting / Content Download' },
      svg: timingBarSvg,
    },
    {
      type: 'video-scene',
      id: 'api-e4-timing-film',
      title: { tr: '🎬 3 Saniyelik Gecikme: Ağ mı, Sunucu mu?', en: '🎬 A 3-Second Delay: Network or Server?' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'req', emoji: '📤', label: { tr: 'GET /bugs/42 — 2.9s', en: 'GET /bugs/42 — 2.9s' }, color: '#f59e0b' },
        { id: 'ttfb', emoji: '🚀', label: { tr: 'TTFB: 0.1s', en: 'TTFB: 0.1s' }, color: '#a78bfa' },
        { id: 'waiting', emoji: '🐢', label: { tr: 'Waiting: 2.7s', en: 'Waiting: 2.7s' }, color: '#f59e0b' },
        { id: 'download', emoji: '📥', label: { tr: 'Download: 0.1s', en: 'Download: 0.1s' }, color: '#22c55e' },
        { id: 'verdict', emoji: '⚖️', label: { tr: 'Suçlu: SUNUCU', en: 'Culprit: SERVER' }, color: '#ef4444' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir request toplamda 2.9 saniye sürüyor — tester tek başına bu sayı ile hiçbir şey diyemez.', en: 'A request takes 2.9 seconds total — alone, this number tells the tester nothing.' },
          positions: { req: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Timing sekmesi süreyi üçe böler. `TTFB` sadece 0.1s — sunucuya ulaşmak ve ilk response\'u almak hızlı.', en: 'The Timing tab splits the duration into three. `TTFB` is only 0.1s — reaching the server and getting the first byte is fast.' },
          positions: { req: { x: 18, y: 35 }, ttfb: { x: 55, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'req', to: 'ttfb', color: '#a78bfa' }],
        },
        {
          caption: { tr: '`Waiting` 2.7s — toplam sürenin neredeyse tamamı burada. Sunucu request\'i işlerken (bir sorgu, bir hesaplama) zaman harcıyor.', en: '`Waiting` is 2.7s — almost the entire total duration is here. The server spends time processing the request (a query, a calculation).' },
          positions: { ttfb: { x: 18, y: 35 }, waiting: { x: 55, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'ttfb', to: 'waiting', color: '#f59e0b' }],
        },
        {
          caption: { tr: '`Content Download` sadece 0.1s — response verisi küçük, indirme hızlı. Ağ/veri boyutu SUÇLU DEĞİL.', en: '`Content Download` is only 0.1s — the response data is small, download is fast. Network/data size is NOT the culprit.' },
          positions: { waiting: { x: 18, y: 35 }, download: { x: 55, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'waiting', to: 'download', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — 2.7s / 2.9s Waiting\'e ait: gecikme AĞDA değil SUNUCUDA. Bug raporu "genel olarak yavaş" değil, "Waiting fazında 2.7s, muhtemel N+1/yavaş sorgu" diye açılmalı.', en: 'The lesson — 2.7s of 2.9s belongs to Waiting: the delay is in the SERVER, not the NETWORK. The bug report should not say "generally slow" but "2.7s in the Waiting phase, likely N+1/slow query".' },
          positions: { download: { x: 25, y: 45 }, verdict: { x: 60, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'download', to: 'verdict', color: '#ef4444' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Yavaşlığın Suçlusunu Teşhis Etme Sırası', en: 'The Order for Diagnosing the Cause of Slowness' },
      steps: [
        { id: 1, icon: '🚀', label: { tr: 'TTFB\'ye bak…', en: 'Check TTFB…' }, detail: { tr: 'Büyükse sunucuya ulaşmak/ilk response bile gecikiyordur (ağ/DNS/sunucu yükü).', en: 'If large, even reaching the server/first response is delayed (network/DNS/server load).' } },
        { id: 2, icon: '🐢', label: { tr: 'Waiting\'e bak…', en: 'Check Waiting…' }, detail: { tr: 'Büyükse sunucu request\'i İŞLERKEN yavaş — bir sorgu/hesaplama şüphelidir, geliştiriciye escalate edilir.', en: 'If large, the server is slow while PROCESSING — a query/calculation is suspect, escalate to the developer.' } },
        { id: 3, icon: '📥', label: { tr: 'Content Download\'a bak…', en: 'Check Content Download…' }, detail: { tr: 'Büyükse response verisi/ağ suçlu — gereksiz büyük JSON, sıkıştırma eksikliği şüphelidir.', en: 'If large, response data/network is the culprit — an unnecessarily large JSON, missing compression is suspect.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e4-order-01',
      question: { tr: 'Bir request\'in toplam süresini oluşturan aşamaları kronolojik sırala.', en: 'Order the phases that make up a request\'s total duration chronologically.' },
      items: [
        { id: '1', text: { tr: 'Request gönderilir', en: 'The request is sent' }, order: 1 },
        { id: '2', text: { tr: 'TTFB — sunucudan ilk bayt gelir', en: 'TTFB — the first byte arrives from the server' }, order: 2 },
        { id: '3', text: { tr: 'Waiting — sunucu request\'i işler', en: 'Waiting — the server processes the request' }, order: 3 },
        { id: '4', text: { tr: 'Content Download — response gövdesi iner', en: 'Content Download — the response body downloads' }, order: 4 },
        { id: '5', text: { tr: 'Request tamamlanır, toplam süre kaydedilir', en: 'The request completes, total time is recorded' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e4-timing',
      id: 'api-e4-timing',
      title: { tr: 'Kendin Dene: Yavaşlığın Suçlusunu Bul', en: 'Try It Yourself: Find the Cause of the Slowness' },
      starterCode: { tr: `// Timing: TTFB 0.1s, Waiting 2.7s, Content Download 0.1s (toplam 2.9s)
// TODO: bu degerlere gore yavasligin suclusu kim: SUNUCU mu AG mi?
Suclu: ???`, en: `// Timing: TTFB 0.1s, Waiting 2.7s, Content Download 0.1s (toplam 2.9s)
// TODO: based on these values, who is to blame for the slowness: the SERVER or the NETWORK?
Suclu: ???` },
      solutionCode: { tr: `// Toplam surenin buyuk kismi Waiting'te -> sunucu istegi islerken yavas
Suclu: SUNUCU (yavas sorgu/islem suphesi, gelistiriciye escalate)`, en: `// Most of the total time is in Waiting -> the server is slow while processing the request
Suclu: SUNUCU (yavas sorgu/islem suphesi, gelistiriciye escalate)` },
      hint: { tr: '`Waiting`, sunucunun request\'i işlediği süredir. Toplam sürenin büyük kısmı `Waiting`\'e aitse, gecikme ağda/veri boyutunda değil sunucunun İŞLEM mantığındadır.', en: '`Waiting` is the time the server spends processing the request. If most of the total time belongs to `Waiting`, the delay is in the server\'s PROCESSING logic, not the network/data size.' },
      successMessage: { tr: 'Doğru! Waiting ağırlıklı bir gecikme, bug raporunu doğrudan geliştiriciye ve muhtemel bir sorguya yönlendirir.', en: 'Correct! A Waiting-heavy delay routes the bug report straight to the developer and a likely query issue.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir request\'in `Content Download` süresi büyükse, en olası suçlu nedir?', en: 'If a request\'s `Content Download` time is large, what is the most likely culprit?' },
      options: [
        { id: 'a', text: { tr: 'Response verisinin boyutu (gereksiz büyük JSON, sıkıştırma eksikliği) veya ağ hızı', en: 'The response data\'s size (unnecessarily large JSON, missing compression) or network speed' } },
        { id: 'b', text: { tr: 'Sunucudaki yavaş bir SQL sorgusu', en: 'A slow SQL query on the server' } },
        { id: 'c', text: { tr: 'İstemcinin CPU\'su', en: 'The client\'s CPU' } },
        { id: 'd', text: { tr: 'Tarayıcının önbelleği', en: 'The browser\'s cache' } },
      ],
      correct: 'a',
      explanation: { tr: '`Content Download`, response gövdesinin İNDİRİLME süresidir — büyük bir response gövdesi veya yavaş bir bağlantı bu süreyi uzatır. Bu, sunucunun request\'i İŞLEME süresi olan `Waiting`\'den TAMAMEN farklı bir sorun kaynağıdır.', en: '`Content Download` is the time the response body takes to DOWNLOAD — a large response body or a slow connection extends this. This is a COMPLETELY different problem source from `Waiting`, which is the server\'s PROCESSING time.' },
      retryQuestion: {
        question: { tr: '`TTFB` (Time To First Byte) neyi ölçer?', en: 'What does `TTFB` (Time To First Byte) measure?' },
        options: [
          { id: 'a', text: { tr: 'Request gönderildikten sonra sunucudan ilk baytın gelmesine kadar geçen süreyi', en: 'The time from sending the request until the first byte arrives from the server' } },
          { id: 'b', text: { tr: 'Response gövdesinin tamamının indirilme süresini', en: 'The time to download the entire response body' } },
          { id: 'c', text: { tr: 'Kullanıcının sayfayı okuma süresini', en: 'How long the user takes to read the page' } },
          { id: 'd', text: { tr: 'Tarayıcının açılma süresini', en: 'How long the browser takes to open' } },
        ],
        correct: 'a',
        explanation: { tr: 'TTFB, request\'in gönderilmesinden sunucudan gelen ilk baytın alınmasına kadar geçen süredir — sunucuya ulaşmanın ve ilk tepkinin ne kadar hızlı olduğunu gösterir, response\'un TAMAMININ inmesini değil.', en: 'TTFB is the time from sending the request to receiving the first byte from the server — it shows how fast reaching the server and the first response is, not how long the ENTIRE response takes to download.' },
      },
    },
  ],
}

const E5 = {
  title: { tr: '🐞 E5 · Network\'ten Defect Yakalama', en: '🐞 E5 · Catching Defects from Network' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🐞',
      content: {
        tr: 'E1-E4\'te öğrendiğin her şey (sütunlar, filtre, sekmeler, Timing) tek bir amaç için var: **Network paneli, UI\'nın SÖYLEDİĞİ ile sunucunun GERÇEKTEN YAPTIĞI arasındaki farkı ortaya çıkaran bir yalan makinesidir.** UI her zaman geliştiricinin YAZDIĞI metni gösterir ("Başarılı!"), Network paneli ise sunucunun GERÇEKTEN döndürdüğünü gösterir (500, boş body, sızan bir alan) — ikisi arasındaki uyumsuzluk tam olarak bir defect\'in doğduğu yerdir. Peki neden bu kadar sık UI ile gerçeklik arasında fark olur — geliştirici bilerek mi yalan söylüyor? Hayır — çoğu zaman geliştirici sadece "mutlu yol"u (happy path) test eder, hata durumunu (`catch` bloğunu) ya hiç yazmaz ya da orada da yanlışlıkla "başarılı" mesajı gösterir; bu bir kasıt değil, bir GÖZDEN KAÇMADIR. Java\'da bunun karşılığı, bir `try` bloğunun `catch (Exception e) { }` ile SESSİZCE yutulmasıdır — hata gerçekten olur ama hiçbir yere loglanmaz/bildirilmez, tıpkı UI\'nın 500\'ü "başarılı" göstermesi gibi. QA açısından bu sekme, sayfanın tüm GRUP E\'sinin doruk noktasıdır: artık sadece paneli OKUMUYORSUN, panelde SAKLI olan gerçek bug\'ları AVLIYORSUN.',
        en: 'Everything you learned in E1-E4 (columns, filter, tabs, Timing) exists for one purpose: **the Network panel is a lie detector that reveals the gap between what the UI SAYS and what the server REALLY DID.** The UI always shows text the developer WROTE ("Success!"), the Network panel shows what the server REALLY returned (500, an empty body, a leaked field) — the mismatch between the two is exactly where a defect is born. So why is there so often a gap between UI and reality — is the developer lying on purpose? No — most of the time the developer only tests the happy path, and either never writes the error case (the `catch` block) or mistakenly shows a "success" message there too; this is not intent, it is an OVERSIGHT. The Java equivalent is a `try` block SILENTLY swallowed by `catch (Exception e) { }` — the error really happens but is never logged/reported anywhere, just like the UI showing a 500 as "success". For QA, this tab is the peak of the entire GROUP E — you are no longer just READING the panel, you are HUNTING for real bugs HIDDEN inside it.',
      },
    },
    { type: 'heading', text: { tr: '5 Gerçek Defect Senaryosu ve Hangi Katmanda Yakalanır', en: '5 Real Defect Scenarios and Which Layer Catches Them' } },
    {
      type: 'text',
      content: {
        tr: 'Aşağıdaki 5 senaryo, Network panelinden yakalanan gerçek defect kategorileridir. Her biri farklı bir "UI ile gerçeklik arasındaki fark" türünü temsil eder.',
        en: 'The 5 scenarios below are real defect categories caught from the Network panel. Each represents a different kind of "gap between UI and reality".',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'UI "Başarılı" Diyor, Network "500" Diyor', en: 'The UI Says "Success", the Network Says "500"' },
      svg: silentBugSvg,
    },
    {
      type: 'simple-box',
      emoji: '1️⃣',
      content: {
        tr: '**1. Sessiz 500 (Silent 500)** — UI hiçbir hata göstermeden "İşlem tamamlandı" der, ama Network panelinde ilgili request `500 Internal Server Error` döner. **Kök neden:** frontend kodu response\'un status kodunu HİÇ kontrol etmeden `.then()` bloğunu çalıştırır. **Tester nerede yakalar:** Network panelinde Status sütununu UI mesajından BAĞIMSIZ olarak her zaman kontrol ederek.',
        en: '**1. Silent 500** — the UI says "Operation complete" with no visible error, but in the Network panel the request returns `500 Internal Server Error`. **Root cause:** the frontend code runs its `.then()` block without EVER checking the response status code. **Where the tester catches it:** always checking the Status column in the Network panel, INDEPENDENTLY of the UI message.',
      },
    },
    {
      type: 'simple-box',
      emoji: '2️⃣',
      content: {
        tr: '**2. Çift POST (Double POST)** — Kullanıcı "Kaydet" butonuna sabırsızca iki kez tıklar; buton devre dışı bırakılmadığı için Network panelinde AYNI `POST /api/v1/bugs` request\'i İKİ KEZ görünür, iki ayrı bug kaydı oluşur. **Kök neden:** buton, request devam ederken `disabled` yapılmamış. **Tester nerede yakalar:** hızlı çift tıklama sonrası Network panelinde aynı request\'in tekrarını sayarak.',
        en: '**2. Double POST** — the user impatiently clicks "Save" twice; since the button is not disabled, the SAME `POST /api/v1/bugs` request appears TWICE in the Network panel, creating two separate bug records. **Root cause:** the button is not made `disabled` while the request is in flight. **Where the tester catches it:** counting the repeat of the same request in the Network panel after a rapid double-click.',
      },
    },
    {
      type: 'simple-box',
      emoji: '3️⃣',
      content: {
        tr: '**3. N+1 Request** — Bug listesi sayfası ÖNCE `GET /api/v1/bugs` ile 10 kayıt çeker, sonra HER kayıt için ayrı ayrı `GET /api/v1/bugs/{id}/details` çağırır — 1 yerine 11 request. **Kök neden:** liste endpoint\'i zaten ihtiyaç duyulan detayı döndürmüyor, frontend her satır için ayrı request atmak ZORUNDA kalıyor. **Tester nerede yakalar:** Network panelinde AYNI URL kalıbının kayıt sayısı kadar tekrarlandığını görerek.',
        en: '**3. N+1 requests** — the bug list page FIRST fetches 10 records with `GET /api/v1/bugs`, then calls `GET /api/v1/bugs/{id}/details` separately for EACH record — 11 requests instead of 1. **Root cause:** the list endpoint does not already return the needed detail, forcing the frontend to fire a separate request per row. **Where the tester catches it:** seeing the SAME URL pattern repeated as many times as there are records in the Network panel.',
      },
    },
    {
      type: 'simple-box',
      emoji: '4️⃣',
      content: {
        tr: '**4. Response\'ta Sızan `passwordHash`** — Bir kullanıcı listesi request\'inin `Response`/`Preview` sekmesinde, UI hiç göstermese bile, JSON gövdesinde `passwordHash` gibi ASLA dönmemesi gereken bir alan görülür. **Kök neden:** backend, veritabanı entity\'sini (tüm alanlarıyla) doğrudan JSON\'a çeviriyor, bir DTO/response modeliyle alan filtrelemiyor. **Tester nerede yakalar:** Response/Preview sekmesinde JSON\'u UI\'da GÖRÜNMEYEN alanlar için de tarayarak — bu bir güvenlik açığıdır, sadece bir "kozmetik" fazlalık değil.',
        en: '**4. Leaked `passwordHash` in the Response** — in a user list request\'s `Response`/`Preview` tab, even though the UI never displays it, the JSON body contains a field like `passwordHash` that should NEVER be returned. **Root cause:** the backend serializes the database entity (with all its fields) directly to JSON, without filtering fields through a DTO/response model. **Where the tester catches it:** scanning the JSON in the Response/Preview tab even for fields NOT VISIBLE in the UI — this is a security hole, not just a "cosmetic" extra.',
      },
    },
    {
      type: 'simple-box',
      emoji: '5️⃣',
      content: {
        tr: '**5. Cache-Control Eksikliği** — Bir kullanıcı hassas bir bug detayını görüntüler, çıkış yapar; tarayıcının GERİ tuşuna basınca aynı sayfa, YENİ bir request atmadan, ÖNBELLEKTEN eski (ve artık yetkisiz olması gereken) veriyi gösterir. **Kök neden:** response header\'larında `Cache-Control: no-store` YOK, tarayıcı hassas response\'u serbestçe önbelleğe alıyor. **Tester nerede yakalar:** Headers sekmesinde `Cache-Control` alanının varlığını/değerini kontrol ederek, sonra geri tuşu senaryosunu deneyerek.',
        en: '**5. Missing Cache-Control** — a user views a sensitive bug detail, logs out; pressing the browser\'s BACK button shows the same page with the old (now supposed-to-be-unauthorized) data FROM CACHE, without firing a new request. **Root cause:** the response headers have NO `Cache-Control: no-store`, so the browser freely caches the sensitive response. **Where the tester catches it:** checking the presence/value of the `Cache-Control` field in the Headers tab, then trying the back-button scenario.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-e5-bug-hunt-film',
      title: { tr: '🎬 Network Panelinde Bir Bug', en: '🎬 A Bug in the Network Panel' },
      xpReward: 15,
      sceneDurationMs: 3400,
      stageHeight: 280,
      actors: [
        { id: 'user', emoji: '🧑‍💻', label: { tr: 'Kullanıcı: "Kaydet"e basar', en: 'User: clicks "Save"' }, color: '#f59e0b' },
        { id: 'ui', emoji: '✅', label: { tr: 'UI: "Başarıyla oluşturuldu"', en: 'UI: "Created successfully"' }, color: '#22c55e' },
        { id: 'network', emoji: '📡', label: { tr: 'Network: 500 Internal Error', en: 'Network: 500 Internal Error' }, color: '#ef4444' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Tester Network\'ü açar', en: 'Tester opens Network' }, color: '#8b5cf6' },
        { id: 'proof', emoji: '📸', label: { tr: 'Kanıt: satır + Response gövdesi', en: 'Evidence: row + Response body' }, color: '#a78bfa' },
      ],
      scenes: [
        {
          caption: { tr: 'Kullanıcı yeni bir bug kaydetmek için "Kaydet" butonuna basar.', en: 'The user clicks "Save" to create a new bug.' },
          positions: { user: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'UI anında yeşil bir mesaj gösterir: "Bug başarıyla oluşturuldu" — kullanıcı memnun ayrılır.', en: 'The UI instantly shows a green message: "Bug created successfully" — the user leaves satisfied.' },
          positions: { user: { x: 18, y: 35 }, ui: { x: 55, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'user', to: 'ui', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ama tester aynı anda Network panelini açık tutuyordu — orada request\'in GERÇEK sonucu görünür: `500 Internal Server Error`.', en: 'But the tester had the Network panel open at the same time — there the request\'s REAL outcome shows: `500 Internal Server Error`.' },
          positions: { ui: { x: 18, y: 35, opacity: 0.5 }, network: { x: 55, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'user', to: 'network', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Tester Network rowna tıklar, `Response` sekmesini açar — sunucudaki gerçek hata mesajını okur.', en: 'The tester clicks the Network row, opens the `Response` tab — reads the real error message from the server.' },
          positions: { network: { x: 20, y: 65 }, tester: { x: 55, y: 65, scale: 1.15, pulse: true } },
          beams: [{ from: 'network', to: 'tester', color: '#8b5cf6' }],
        },
        {
          caption: { tr: 'Tester ekran görüntüsünü DEĞİL, Network rownı ve Response gövdesini kanıt olarak bug raporuna ekler.', en: 'The tester attaches NOT a screenshot, but the Network row and Response body to the bug report as evidence.' },
          positions: { tester: { x: 30, y: 45 }, proof: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'tester', to: 'proof', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — "UI\'da her şey normal görünüyordu" bir savunma değildir. Bir tester için Network paneli her zaman AÇIK kalmalı, UI\'nın söylediği her zaman doğrulanmalıdır.', en: 'The lesson — "everything looked normal in the UI" is not a defense. For a tester, the Network panel should always stay OPEN, and what the UI says must always be verified.' },
          positions: { proof: { x: 40, y: 48, scale: 1.15, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir Defect\'i Network\'ten Rapor Etme Sırası', en: 'The Order for Reporting a Defect from Network' },
      steps: [
        { id: 1, icon: '📡', label: { tr: 'Network\'ü açık tut…', en: 'Keep Network open…' }, detail: { tr: 'Her test eyleminde Network paneli AÇIK olmalı — sadece UI\'ya bakmak yeterli değildir.', en: 'The Network panel should be OPEN during every test action — looking at the UI alone is not enough.' } },
        { id: 2, icon: '🔍', label: { tr: 'Uyumsuzluğu yakala…', en: 'Catch the mismatch…' }, detail: { tr: 'UI mesajı ile Status/Response arasında bir çelişki var mı diye her zaman karşılaştır.', en: 'Always compare whether there is a contradiction between the UI message and Status/Response.' } },
        { id: 3, icon: '📸', label: { tr: 'Kanıtla raporla…', en: 'Report with evidence…' }, detail: { tr: 'Ekran görüntüsü yerine Network rownı + Response gövdesini kanıt olarak ekle.', en: 'Attach the Network row + Response body as evidence instead of a screenshot.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e5-order-01',
      question: { tr: 'Network\'ten bir defect avlama sürecini sırala.', en: 'Order the process for hunting a defect from Network.' },
      items: [
        { id: '1', text: { tr: 'Test eylemini yap, Network panelini açık tut', en: 'Perform the test action, keep the Network panel open' }, order: 1 },
        { id: '2', text: { tr: 'UI mesajı ile Status kodunu karşılaştır', en: 'Compare the UI message with the Status code' }, order: 2 },
        { id: '3', text: { tr: 'Uyumsuzluk varsa Response/Headers sekmesini incele', en: 'If there is a mismatch, inspect the Response/Headers tab' }, order: 3 },
        { id: '4', text: { tr: 'Kök nedeni (sessiz 500, sızan alan, vb.) belirle', en: 'Identify the root cause (silent 500, leaked field, etc.)' }, order: 4 },
        { id: '5', text: { tr: 'Network row + Response gövdesiyle bug raporu aç', en: 'File the bug report with the Network row + Response body' }, order: 5 },
      ],
      xpReward: 13,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e5-network-defects',
      id: 'api-e5-network-defects',
      title: { tr: 'Kendin Dene: Defect\'i Doğru Katmana Yönlendir', en: 'Try It Yourself: Route the Defect to the Right Layer' },
      starterCode: { tr: `// Senaryo: Kullanici listesi yanitinda "passwordHash" alani goruluyor (UI bunu HIC gostermiyor)
// TODO: bu bir guvenlik acigi mi, sadece kozmetik bir sorun mu? Hangi ekibe escalate edilir?
Karar: ???`, en: `// Scenario: a "passwordHash" field appears in the user list response (the UI NEVER shows it)
// TODO: is this a security hole or just a cosmetic issue? Which team do you escalate to?
Karar: ???` },
      solutionCode: { tr: `// Hassas bir alanin API yanitinda sizmasi GUVENLIK acigidir (kozmetik degil)
// Backend ekibine (DTO/response model ile alan filtrelemesi icin) escalate edilir
Karar: GUVENLIK ACIGI -> backend ekibine escalate`, en: `// Leaking a sensitive field in the API response is a SECURITY hole (not cosmetic)
// escalate to the backend team (to filter the field via the DTO/response model)
Karar: GUVENLIK ACIGI -> backend ekibine escalate` },
      hint: { tr: 'Bir alanın UI\'da GÖRÜNMEMESİ onun güvenli olduğu anlamına gelmez — API response\'u tarayıcı DevTools\'u ile herkes tarafından okunabilir. `passwordHash` gibi bir alanın sızması her zaman bir güvenlik açığıdır.', en: 'A field not being VISIBLE in the UI does not mean it is safe — the API response can be read by anyone via browser DevTools. A leaked field like `passwordHash` is always a security hole.' },
      successMessage: { tr: 'Doğru! "UI\'da görünmüyor" güvenlik savunması değildir — API response\'u her zaman erişilebilirdir.', en: 'Correct! "It is not visible in the UI" is not a security defense — the API response is always reachable.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Kullanıcı bir butona hızlıca iki kez tıklıyor ve Network panelinde AYNI POST request\'i iki kez görünüyor. Bu neyin işaretidir?', en: 'A user rapidly double-clicks a button and the SAME POST request appears twice in the Network panel. What is this a sign of?' },
      options: [
        { id: 'a', text: { tr: 'Buton, request devam ederken devre dışı bırakılmamış — çift kayıt riski (Çift POST defect\'i)', en: 'The button was not disabled while the request was in flight — a double-record risk (the Double POST defect)' } },
        { id: 'b', text: { tr: 'Tarayıcı bir hata yaptı, önemli değil', en: 'The browser made a mistake, not important' } },
        { id: 'c', text: { tr: 'Bu normal ve beklenen bir davranıştır', en: 'This is normal and expected behavior' } },
        { id: 'd', text: { tr: 'Sunucu request\'i otomatik olarak iki kez işler', en: 'The server automatically processes the request twice' } },
      ],
      correct: 'a',
      explanation: { tr: 'Network panelinde aynı request\'in tekrarı, genelde butonun request devam ederken `disabled` yapılmadığının kanıtıdır. Bu, kullanıcı deneyimi sorunundan öte, veritabanında GERÇEK bir çift-kayıt defect\'idir.', en: 'A repeated request in the Network panel is usually evidence that the button was not made `disabled` while the request was in flight. Beyond a UX issue, this is a REAL double-record defect in the database.' },
      retryQuestion: {
        question: { tr: '"Sessiz 500" defect\'inin tanımı nedir?', en: 'What defines a "Silent 500" defect?' },
        options: [
          { id: 'a', text: { tr: 'UI hiçbir hata göstermeden başarı mesajı verirken, Network panelinde request gerçekte 500 dönmesi', en: 'The UI shows a success message with no visible error, while the Network panel shows the request actually returned 500' } },
          { id: 'b', text: { tr: 'Sunucunun hiç response vermemesi', en: 'The server not responding at all' } },
          { id: 'c', text: { tr: 'Request\'in 5 dakika sürmesi', en: 'The request taking 5 minutes' } },
          { id: 'd', text: { tr: 'Tarayıcının sessize alınması', en: 'The browser being muted' } },
        ],
        correct: 'a',
        explanation: { tr: 'Sessiz 500, frontend kodunun response\'un status kodunu kontrol etmeden başarı akışını çalıştırmasından doğar — kullanıcı ve hatta manuel test eden biri UI\'ya bakarak hiçbir sorun görmez, sadece Network panelini kontrol eden biri gerçeği yakalar.', en: 'A silent 500 is born when the frontend code runs its success flow without checking the response status code — a user, or even someone manually testing by watching the UI, sees no problem at all; only someone checking the Network panel catches the truth.' },
      },
    },
  ],
}

const E6 = {
  title: { tr: '🔗 E6 · Copy as cURL → Postman Import', en: '🔗 E6 · Copy as cURL → Postman Import' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔗',
      content: {
        tr: '"Copy as cURL", bir Network rownı **fotokopi çeken bir tarif kartı makinesi** gibidir: gözlemlediğin bir request\'i (method, URL, header\'lar, body dahil) tek tıkla, TEKRARLANABİLİR bir metin komutuna dönüştürür — artık o request\'i elle yeniden yazmana gerek kalmaz, aynı "tarifi" başka bir mutfakta (Postman, terminal, bir script) pişirebilirsin. Bu, GRUP E\'yi (gözlem) GRUP G\'ye (Postman ile aktif test) bağlayan KÖPRÜdür. Peki neden doğrudan Postman\'de sıfırdan yazmak yerine Network\'ten kopyalıyoruz? Çünkü UI zaten request\'i DOĞRU header\'lar ve auth token\'la göndermiştir — bunu elle yeniden yazmaya kalkarsan bir header\'ı unutabilir, yanlış yazabilirsin; `Copy as cURL`, GERÇEKTEN gönderilen request\'in BİREBİR kopyasını verir, tahmin gerektirmez. Java\'da bunun karşılığı bir `HttpRequest` nesnesini serialize edip başka bir ortamda replay etmektir — burada tarayıcı bu serialize işlemini senin için otomatik yapar. QA açısından bu, "UI\'da gördüğüm bug\'ı nasıl tekrarlarım/paylaşırım" sorusunun cevabıdır: bir cURL komutu, bir geliştiriciye "şu request\'i şu şekilde gönder, aynı hatayı sen de göreceksin" demenin en kesin yoludur — ekran görüntüsünden çok daha güçlü bir kanıttır.',
        en: '"Copy as cURL" is like a **photocopier for a recipe card**: with one click it turns an observed request (method, URL, headers, body included) into a REPEATABLE text command — you no longer need to rewrite that request by hand, you can "cook" the same recipe in another kitchen (Postman, a terminal, a script). This is the BRIDGE connecting GROUP E (observation) to GROUP G (active testing with Postman). So why copy from Network instead of writing it fresh in Postman? Because the UI already sent the request with the CORRECT headers and auth token — rewriting it by hand risks forgetting or mistyping a header; `Copy as cURL` gives an EXACT copy of the request that was REALLY sent, no guessing required. The Java equivalent is serializing an `HttpRequest` object and replaying it in another environment — here the browser does that serialization automatically for you. For QA, this answers the question "how do I reproduce/share the bug I saw in the UI": a cURL command is the most precise way to tell a developer "send this exact request, you will see the same error" — far stronger evidence than a screenshot.',
      },
    },
    { type: 'heading', text: { tr: 'Gözlemden Aktif Teste Köprü', en: 'The Bridge from Observation to Active Testing' } },
    {
      type: 'text',
      content: {
        tr: 'Bir Network rowna sağ tıklayıp `Copy → Copy as cURL` seçince, request\'in tam bir metin komutu panoya kopyalanır. Postman\'de `Import → Raw text` ile bu metni yapıştırdığında, Postman method/URL/header/body\'yi otomatik ayrıştırıp bir request olarak kurar — artık o request\'i Postman\'in tüm gücüyle (environment, assertion, koleksiyon) test edebilirsin.',
        en: 'Right-clicking a Network row and choosing `Copy → Copy as cURL` copies the request as a full text command to the clipboard. Pasting this text in Postman via `Import → Raw text`, Postman automatically parses the method/URL/headers/body and sets it up as a request — now you can test it with Postman\'s full power (environments, assertions, collections).',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Network Satırı → cURL → Postman İmport', en: 'Network Row → cURL → Postman Import' },
      svg: curlImportFlowSvg,
    },
    {
      type: 'video-scene',
      id: 'api-e6-curl-import-film',
      title: { tr: '🎬 Gördüğün Request\'i Postman\'e Taşımak', en: '🎬 Carrying the Request You Saw into Postman' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'row', emoji: '📡', label: { tr: 'Network row (gözlemlendi)', en: 'Network row (observed)' }, color: '#f59e0b' },
        { id: 'curl', emoji: '📋', label: { tr: 'Copy as cURL', en: 'Copy as cURL' }, color: '#0ea5e9' },
        { id: 'clipboard', emoji: '📎', label: { tr: 'Pano: tam metin komut', en: 'Clipboard: full text command' }, color: '#a78bfa' },
        { id: 'postman', emoji: '📮', label: { tr: 'Postman → Import', en: 'Postman → Import' }, color: '#22c55e' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Artık aktif test edilebilir', en: 'Now actively testable' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Tester Network panelinde şüpheli bir request satırı buldu — bunu başka bir araçta tekrar etmek istiyor.', en: 'The tester found a suspicious request row in the Network panel — they want to repeat it in another tool.' },
          positions: { row: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Satıra sağ tıklayıp `Copy → Copy as cURL` seçer — method, URL, header, body TEK metin komutuna dönüşür.', en: 'They right-click the row and choose `Copy → Copy as cURL` — method, URL, headers, body turn into ONE text command.' },
          positions: { row: { x: 20, y: 35 }, curl: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'row', to: 'curl', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Komut panoya kopyalanır — artık taşınabilir, paylaşılabilir bir metindir.', en: 'The command is copied to the clipboard — now it is a portable, shareable piece of text.' },
          positions: { curl: { x: 20, y: 35 }, clipboard: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'curl', to: 'clipboard', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Postman\'de `Import → Raw text` ile yapıştırılır — Postman method/URL/header/body\'yi OTOMATİK ayrıştırır.', en: 'It is pasted in Postman via `Import → Raw text` — Postman AUTOMATICALLY parses method/URL/headers/body.' },
          positions: { clipboard: { x: 20, y: 35 }, postman: { x: 58, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'clipboard', to: 'postman', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — Artık bu request Postman\'in tüm gücüyle (environment, `pm.test` assertion, koleksiyon) test edilebilir; bu, GRUP E\'den GRUP G\'ye giden köprüdür.', en: 'The lesson — this request can now be tested with Postman\'s full power (environments, `pm.test` assertions, collections); this is the bridge from GROUP E to GROUP G.' },
          positions: { postman: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'postman', to: 'tester', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Gözlemden Postman\'e Taşıma Sırası', en: 'The Order for Moving from Observation to Postman' },
      steps: [
        { id: 1, icon: '📡', label: { tr: 'Request\'i Network\'te bul…', en: 'Find the request in Network…' }, detail: { tr: 'Şüpheli/incelenmek istenen request\'in satırını bul, üzerine tıkla.', en: 'Find the row of the suspicious/interesting request, click on it.' } },
        { id: 2, icon: '📋', label: { tr: 'cURL olarak kopyala…', en: 'Copy as cURL…' }, detail: { tr: 'Sağ tık → Copy → Copy as cURL ile tam request metnini panoya al.', en: 'Right-click → Copy → Copy as cURL to grab the full request text to the clipboard.' } },
        { id: 3, icon: '📮', label: { tr: 'Postman\'e import et…', en: 'Import into Postman…' }, detail: { tr: 'Import → Raw text ile yapıştır; Postman request\'i otomatik ayrıştırıp kurar.', en: 'Paste via Import → Raw text; Postman automatically parses and sets up the request.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-e6-order-01',
      question: { tr: 'Network\'te gözlemlenen bir request\'i Postman\'e taşıma sırasını diz.', en: 'Order the steps to carry a request observed in Network into Postman.' },
      items: [
        { id: '1', text: { tr: 'Network panelinde ilgili satırı bul', en: 'Find the relevant row in the Network panel' }, order: 1 },
        { id: '2', text: { tr: 'Sağ tık → Copy → Copy as cURL', en: 'Right-click → Copy → Copy as cURL' }, order: 2 },
        { id: '3', text: { tr: 'Postman\'de Import → Raw text\'i aç', en: 'Open Import → Raw text in Postman' }, order: 3 },
        { id: '4', text: { tr: 'Kopyalanan metni yapıştır', en: 'Paste the copied text' }, order: 4 },
        { id: '5', text: { tr: 'Postman request\'i otomatik kurar, artık test edilebilir', en: 'Postman sets up the request automatically, now testable' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-e6-curl-import',
      id: 'api-e6-curl-import',
      title: { tr: 'Kendin Dene: cURL\'ün Neden Elle Yazmaktan Daha Güvenilir Olduğunu Belirle', en: 'Try It Yourself: Determine Why cURL Is More Reliable Than Writing by Hand' },
      starterCode: { tr: `// Senaryo: UI bir Authorization header'i ile request gonderiyor
// Sen bu istegi Postman'de SIFIRDAN elle yazacaksin
// TODO: bu yaklasimin en buyuk riski nedir?
Risk: ???`, en: `// Scenario: the UI sends a request with an Authorization header
// Sen bu istegi Postman'de SIFIRDAN elle yazacaksin
// TODO: bu yaklasimin en buyuk riski nedir?
Risk: ???` },
      solutionCode: { tr: `// Elle yazarken bir header'i (ozellikle Authorization/Content-Type) unutabilir
// veya yanlis yazabilirsin -> Copy as cURL bu riski ORTADAN KALDIRIR
Risk: header/deger unutma veya yanlis yazma -> Copy as cURL bunu engeller`, en: `// When typing by hand you may forget a header (especially Authorization/Content-Type)
// or you may type it wrong -> Copy as cURL ELIMINATES this risk
Risk: header/deger unutma veya yanlis yazma -> Copy as cURL bunu engeller` },
      hint: { tr: 'UI, request\'i doğru header\'lar ve token\'la GERÇEKTEN göndermiştir — bunu elle yeniden yazmaya kalkışmak insan hatasına (unutulan bir header, yanlış yazılan bir değer) açıktır. `Copy as cURL` bu riski tamamen ortadan kaldırır.', en: 'The UI has REALLY sent the request with the correct headers and token — trying to rewrite it by hand is open to human error (a forgotten header, a mistyped value). `Copy as cURL` removes this risk entirely.' },
      successMessage: { tr: 'Doğru! Copy as cURL, tahmine değil gerçekten gönderilen request\'e dayanır.', en: 'Correct! Copy as cURL relies on the request that was really sent, not a guess.' },
    },
    {
      type: 'quiz',
      question: { tr: '`Copy as cURL` özelliği GRUP E ile GRUP G (Postman) arasında nasıl bir rol oynar?', en: 'What role does the `Copy as cURL` feature play between GROUP E and GROUP G (Postman)?' },
      options: [
        { id: 'a', text: { tr: 'Gözlemlenen bir request\'i elle yeniden yazmadan, birebir kopyasıyla Postman\'e taşıyan bir köprüdür', en: 'It is a bridge that carries an observed request into Postman as an exact copy, without hand-rewriting it' } },
        { id: 'b', text: { tr: 'Sadece bir dekorasyon özelliğidir, işlevi yoktur', en: 'It is purely decorative, with no function' } },
        { id: 'c', text: { tr: 'Postman\'i tamamen devre dışı bırakır', en: 'It completely disables Postman' } },
        { id: 'd', text: { tr: 'Sadece GET request\'lerinde çalışır', en: 'It only works for GET requests' } },
      ],
      correct: 'a',
      explanation: { tr: '`Copy as cURL`, tarayıcının GERÇEKTEN gönderdiği request\'i (method/URL/header/body dahil) tam bir metin komutuna çevirir; bu metin Postman\'e import edilerek, elle yeniden yazmanın insan hatası riskini taşımadan aynı request\'in AKTİF test edilmesine imkân verir.', en: '`Copy as cURL` turns the request the browser REALLY sent (method/URL/headers/body included) into a complete text command; importing this text into Postman lets the same request be ACTIVELY tested without the human-error risk of rewriting it by hand.' },
      retryQuestion: {
        question: { tr: 'Bir request\'i elle Postman\'de sıfırdan yeniden yazmanın en büyük riski nedir?', en: 'What is the biggest risk of rewriting a request from scratch by hand in Postman?' },
        options: [
          { id: 'a', text: { tr: 'Bir header\'ı veya değeri unutmak/yanlış yazmak, gerçek request\'i tam yansıtmamak', en: 'Forgetting or mistyping a header or value, not fully reflecting the real request' } },
          { id: 'b', text: { tr: 'Postman\'in çökmesi', en: 'Postman crashing' } },
          { id: 'c', text: { tr: 'İnternetin kesilmesi', en: 'Losing internet' } },
          { id: 'd', text: { tr: 'Hiçbir risk yoktur', en: 'There is no risk at all' } },
        ],
        correct: 'a',
        explanation: { tr: 'Elle yeniden yazmak insan hatasına açıktır — bir `Authorization` header\'ı, bir query parametresi veya body\'deki bir alan unutulabilir/yanlış yazılabilir; bu da Postman\'deki request\'in tarayıcıda GÖZLEMLENEN gerçek request\'ten farklı davranmasına yol açar.', en: 'Rewriting by hand is open to human error — an `Authorization` header, a query parameter, or a field in the body can be forgotten/mistyped; this makes the Postman request behave differently from the real request OBSERVED in the browser.' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP F — Swagger / OpenAPI (kısmen kodsuz: spec/şema okuma şablonu)
// ═══════════════════════════════════════════════════════════════════════════

const swaggerUiFlowSvg = `<svg viewBox='0 0 680 150' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <rect x='16' y='50' width='140' height='50' rx='8' fill='#242640'/><text x='30' y='80' fill='#e5e7eb' font-size='12'>openapi.yaml</text>
  <path d='M 162 75 L 210 75' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrowF)'/>
  <defs><marker id='arrowF' markerWidth='8' markerHeight='8' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 z' fill='#f59e0b'/></marker></defs>
  <rect x='214' y='50' width='140' height='50' rx='8' fill='#1a2e22'/><text x='230' y='80' fill='#4ade80' font-size='12'>Swagger UI</text>
  <path d='M 360 75 L 408 75' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrowF)'/>
  <rect x='412' y='50' width='140' height='50' rx='8' fill='#3b3220'/><text x='424' y='80' fill='#f59e0b' font-size='12'>Try it out</text>
  <path d='M 558 75 L 606 75' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrowF)'/>
  <rect x='610' y='50' width='58' height='50' rx='8' fill='#242640'/><text x='618' y='80' fill='#e5e7eb' font-size='12'>API</text>
</svg>`

const contractBreakSvg = `<svg viewBox='0 0 680 170' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <text x='20' y='28' fill='#94a3b8' font-size='12' font-weight='bold'>Document (openapi.yaml)</text>
  <rect x='16' y='36' width='300' height='60' rx='8' fill='#142314'/>
  <text x='36' y='60' fill='#4ade80' font-size='12' font-family='monospace'>responses: 200</text>
  <text x='36' y='80' fill='#4ade80' font-size='12' font-family='monospace'>severity: enum[LOW,MED,HIGH]</text>
  <text x='360' y='28' fill='#94a3b8' font-size='12' font-weight='bold'>Real API</text>
  <rect x='356' y='36' width='308' height='60' rx='8' fill='#3a1a1a'/>
  <text x='372' y='60' fill='#f87171' font-size='12' font-family='monospace'>status: 201</text>
  <text x='372' y='80' fill='#f87171' font-size='12' font-family='monospace'>severity: "CRITICAL" (new value!)</text>
  <path d='M 320 66 L 352 66' stroke='#ef4444' stroke-width='2' stroke-dasharray='4 3'/>
  <text x='170' y='140' fill='#f59e0b' font-size='12' font-weight='bold'>Contract BROKEN — the document and reality DIVERGE</text>
</svg>`

const F1 = {
  title: { tr: '📜 F1 · OpenAPI Spec Nedir? Sözleşme kavramı', en: '📜 F1 · What Is an OpenAPI Spec? The Contract Concept' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📜',
      content: {
        tr: 'Bir OpenAPI spec\'i (`openapi.yaml`/`.json`), bir binanın **mimari çizimidir** — bina (kod) zaten var ve çalışıyor, ama bir elektrikçinin (başka bir ekibin, bir test aracının) binayı anlamak için içeri girip her odayı elle dolaşmasına gerek yoktur; çizime bakması yeterlidir. GRUP A\'da "sözleşme" kavramını görmüştün (A1) — OpenAPI spec, o soyut sözleşmeyi **makine-okunur, standart bir formata** döker: hangi yol (`/api/v1/bugs`) hangi metodu (GET/POST) kabul eder, hangi alanlar zorunludur, response nasıl görünür — hepsi TEK bir dosyada, İngilizce açıklama okumaya gerek kalmadan. Peki kod zaten varken (Java\'da bir `Controller` sınıfı, TypeScript\'te bir DTO) neden ayrı bir spec dosyasına ihtiyaç var? Çünkü kod SADECE o dili bilen bir geliştiricinin okuyabileceği bir formattadır; spec ise Postman, Swagger UI, kod üretici araçlar, sözleşme testleri gibi ONLARCA farklı aracın AYNI ANDA okuyabileceği ORTAK bir dildir. Java\'da bunun en yakın karşılığı bir `interface` + JavaDoc birleşimidir: `interface` metodun İMZASINI (ne alır, ne döner) garanti eder, JavaDoc bunu İNSAN tarafından okunur açıklar; OpenAPI spec ikisini birden, hem makine hem insan için, TEK dosyada yapar. QA açısından bu spec, kod okumadan bir API\'nin sözleşmesini öğrenmenin en hızlı yoludur — ve GRUP F boyunca göreceğin gibi, bu sözleşme ile GERÇEĞİN AYRIŞTIĞI an, tam olarak bir "contract defect"in doğduğu andır.',
        en: 'An OpenAPI spec (`openapi.yaml`/`.json`) is a building\'s **architectural blueprint** — the building (the code) already exists and works, but an electrician (another team, a test tool) does not need to walk through every room by hand to understand the building; looking at the blueprint is enough. You saw the "contract" concept in GROUP A (A1) — the OpenAPI spec puts that abstract contract into a **machine-readable, standard format**: which path (`/api/v1/bugs`) accepts which method (GET/POST), which fields are required, what the response looks like — all in ONE file, with no need to read prose. So if the code already exists (a `Controller` class in Java, a DTO in TypeScript), why is a separate spec file needed? Because code is a format only a developer who knows that language can read; the spec is a COMMON language that DOZENS of different tools — Postman, Swagger UI, code generators, contract tests — can read SIMULTANEOUSLY. The closest Java equivalent is an `interface` combined with JavaDoc: the `interface` guarantees the method\'s SIGNATURE (what it takes, what it returns), the JavaDoc explains it for a HUMAN; an OpenAPI spec does both, for machine and human, in ONE file. For QA, this spec is the fastest way to learn an API\'s contract without reading code — and as you will see throughout GROUP F, the moment this contract DIVERGES from REALITY is exactly the moment a "contract defect" is born.',
      },
    },
    { type: 'heading', text: { tr: '/api/v1/bugs — Minimum Bir Spec', en: '/api/v1/bugs — A Minimal Spec' } },
    {
      type: 'code',
      language: 'yaml',
      code: {
        tr: `# openapi.yaml — /api/v1/bugs sozlesmesinin cekirdegi
openapi: 3.0.0
info:
  title: Bug Tracker API
  version: 1.0.0
paths:
  /api/v1/bugs:
    get:
      summary: Bug listesini getir
      responses:
        '200':
          description: Basarili liste yaniti
    post:
      summary: Yeni bug olustur
      responses:
        '201':
          description: Bug olusturuldu
        '400':
          description: Gecersiz request (ornegin bos title)`,
        en: `# openapi.yaml — the core of the /api/v1/bugs contract
openapi: 3.0.0
info:
  title: Bug Tracker API
  version: 1.0.0
paths:
  /api/v1/bugs:
    get:
      summary: Get the bug list
      responses:
        '200':
          description: Successful list response
    post:
      summary: Create a new bug
      responses:
        '201':
          description: Bug created
        '400':
          description: Invalid request (e.g. empty title)`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-f1-spec-film',
      title: { tr: '🎬 Kod Var, Ama Kimse Onu Okumak Zorunda Değil', en: '🎬 The Code Exists, but Nobody Has to Read It' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'code', emoji: '💻', label: { tr: 'Controller kodu', en: 'Controller code' }, color: '#f59e0b' },
        { id: 'spec', emoji: '📜', label: { tr: 'openapi.yaml', en: 'openapi.yaml' }, color: '#0ea5e9' },
        { id: 'tools', emoji: '🧰', label: { tr: 'Postman / Swagger UI / Testler', en: 'Postman / Swagger UI / Tests' }, color: '#a78bfa' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Tester kod okumadan öğrenir', en: 'Tester learns without reading code' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Bir geliştirici `/api/v1/bugs` için Controller kodunu yazar — sözleşme kodun İÇİNDE gömülüdür.', en: 'A developer writes the Controller code for `/api/v1/bugs` — the contract is embedded INSIDE the code.' },
          positions: { code: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Bu sözleşme `openapi.yaml`\'e DÖKÜLÜR — artık kod okumadan da okunabilir bir formattadır.', en: 'This contract is POURED into `openapi.yaml` — now it is readable without reading code.' },
          positions: { code: { x: 20, y: 40 }, spec: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'code', to: 'spec', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Postman, Swagger UI, sözleşme testleri — ONLARCA araç bu TEK dosyayı AYNI ANDA okuyabilir.', en: 'Postman, Swagger UI, contract tests — DOZENS of tools can read this ONE file SIMULTANEOUSLY.' },
          positions: { spec: { x: 20, y: 40 }, tools: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'spec', to: 'tools', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — Tester, Java/TypeScript bilmese bile spec\'i okuyarak API\'nin ne kabul ettiğini, ne döndürdüğünü öğrenir.', en: 'The lesson — even without knowing Java/TypeScript, a tester learns what the API accepts and returns by reading the spec.' },
          positions: { tools: { x: 30, y: 45 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'tools', to: 'tester', color: '#22c55e' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir Sözleşmenin Kaynak Kod → Spec Yolculuğu', en: 'A Contract\'s Journey from Source Code to Spec' },
      steps: [
        { id: 1, icon: '💻', label: { tr: 'Kod yazılır…', en: 'Code is written…' }, detail: { tr: 'Controller/DTO sınıfları sözleşmeyi kodun içinde taşır — ama sadece geliştirici okuyabilir.', en: 'Controller/DTO classes carry the contract inside the code — but only a developer can read it.' } },
        { id: 2, icon: '📜', label: { tr: 'Spec üretilir/yazılır…', en: 'Spec is generated/written…' }, detail: { tr: 'openapi.yaml, aynı sözleşmeyi standart, makine-okunur bir formata döker (F2\'de otomatik üretimi göreceksin).', en: 'openapi.yaml pours the same contract into a standard, machine-readable format (you will see auto-generation in F2).' } },
        { id: 3, icon: '🧰', label: { tr: 'Araçlar okur…', en: 'Tools read it…' }, detail: { tr: 'Swagger UI, Postman, test araçları kod OKUMADAN spec\'ten API\'yi anlar.', en: 'Swagger UI, Postman, and test tools understand the API from the spec, WITHOUT reading code.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-f1-order-01',
      question: { tr: 'Bir sözleşmenin kod yazımından araçlara ulaşmasına kadarki yolculuğunu sırala.', en: 'Order a contract\'s journey from writing code to reaching tools.' },
      items: [
        { id: '1', text: { tr: 'Geliştirici Controller/DTO kodunu yazar', en: 'The developer writes the Controller/DTO code' }, order: 1 },
        { id: '2', text: { tr: 'Sözleşme openapi.yaml formatına dökülür', en: 'The contract is poured into openapi.yaml format' }, order: 2 },
        { id: '3', text: { tr: 'Swagger UI spec\'i okuyup görsel bir arayüz üretir', en: 'Swagger UI reads the spec and generates a visual interface' }, order: 3 },
        { id: '4', text: { tr: 'Tester spec/Swagger UI\'dan API\'yi öğrenir', en: 'The tester learns the API from the spec/Swagger UI' }, order: 4 },
        { id: '5', text: { tr: 'Tester bu bilgiyle test senaryoları yazar', en: 'The tester writes test scenarios with this knowledge' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-f1-openapi-spec',
      id: 'api-f1-openapi-spec',
      title: { tr: 'Kendin Dene: Spec\'te Eksik Metodu Tamamla', en: 'Try It Yourself: Complete the Missing Method in the Spec' },
      starterCode: { tr: `# /api/v1/bugs/{id} icin sadece GET tanimli
# TODO: bug'i SILMEK icin hangi HTTP metodu eksik?
paths:
  /api/v1/bugs/{id}:
    get:
      summary: Tek bir bug getir
    ???:
      summary: Bug'i sil`, en: `# only GET is defined for /api/v1/bugs/{id}
# TODO: which HTTP method is missing to DELETE the bug?
paths:
  /api/v1/bugs/{id}:
    get:
      summary: Tek bir bug getir
    ???:
      summary: Bug'i sil` },
      solutionCode: `paths:
  /api/v1/bugs/{id}:
    get:
      summary: Tek bir bug getir
    delete:
      summary: Bug'i sil`,
      hint: { tr: 'Bug Tracker omurgasında silme işlemi `DELETE /api/v1/bugs/{id}` olarak tanımlanmıştı (Bölüm A4). OpenAPI spec\'inde her HTTP metodu path altında ayrı bir anahtardır.', en: 'In the Bug Tracker backbone, deletion was defined as `DELETE /api/v1/bugs/{id}` (Section A4). In an OpenAPI spec, each HTTP method is a separate key under the path.' },
      successMessage: { tr: 'Doğru! Spec artık silme işlemini de doğru şekilde belgeliyor.', en: 'Correct! The spec now correctly documents the delete operation too.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir OpenAPI spec dosyasının en temel amacı nedir?', en: 'What is the core purpose of an OpenAPI spec file?' },
      options: [
        { id: 'a', text: { tr: 'API sözleşmesini kod okumadan anlaşılabilir, makine-okunur standart bir formata dökmek', en: 'To pour the API contract into a standard, machine-readable format understandable without reading code' } },
        { id: 'b', text: { tr: 'Veritabanı şemasını tanımlamak', en: 'To define the database schema' } },
        { id: 'c', text: { tr: 'Sunucunun donanım gereksinimlerini belirtmek', en: 'To specify the server\'s hardware requirements' } },
        { id: 'd', text: { tr: 'Kullanıcı arayüzünün renk paletini belirlemek', en: 'To determine the UI\'s color palette' } },
      ],
      correct: 'a',
      explanation: { tr: 'OpenAPI spec, bir API\'nin sözleşmesini (yollar, metodlar, zorunlu alanlar, response şekilleri) standart, makine-okunur bir formatta tanımlar — Postman, Swagger UI, test araçları gibi onlarca farklı araç bu TEK dosyayı okuyarak API\'yi anlayabilir.', en: 'An OpenAPI spec defines an API\'s contract (paths, methods, required fields, response shapes) in a standard, machine-readable format — dozens of tools like Postman, Swagger UI, and test tools can understand the API by reading this ONE file.' },
      retryQuestion: {
        question: { tr: 'OpenAPI spec\'in Java\'daki en yakın karşılığı nedir?', en: 'What is the closest Java equivalent of an OpenAPI spec?' },
        options: [
          { id: 'a', text: { tr: 'Bir interface + JavaDoc birleşimi (imza + insan tarafından okunur açıklama)', en: 'A combination of an interface + JavaDoc (signature + human-readable description)' } },
          { id: 'b', text: { tr: 'Bir pom.xml dosyası', en: 'A pom.xml file' } },
          { id: 'c', text: { tr: 'Bir .gitignore dosyası', en: 'A .gitignore file' } },
          { id: 'd', text: { tr: 'Bir Dockerfile', en: 'A Dockerfile' } },
        ],
        correct: 'a',
        explanation: { tr: 'Bir `interface` metodun imzasını (ne alır, ne döner) garanti eder, JavaDoc bunu insan için açıklar; OpenAPI spec her ikisini de, hem makine hem insan için, tek dosyada birleştirir.', en: 'An `interface` guarantees a method\'s signature (what it takes, what it returns), JavaDoc explains it for humans; an OpenAPI spec merges both, for machine and human, into one file.' },
      },
    },
  ],
}

const F2 = {
  title: { tr: '🏭 F2 · Swagger Üretimi: springdoc / @nestjs/swagger', en: '🏭 F2 · Swagger Generation: springdoc / @nestjs/swagger' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🏭',
      content: {
        tr: 'Elle yazılan bir `openapi.yaml`, bir **fotokopisi eskiyen belge** gibidir: geliştirici kodu değiştirir (yeni bir alan ekler, bir status kodunu değiştirir) ama dokümanı güncellemeyi UNUTUR — zamanla doküman gerçeği yansıtmaz olur. `springdoc-openapi` (Spring/Java) ve `@nestjs/swagger` (NestJS), bu riski ortadan kaldıran bir **otomatik fotokopi makinesidir**: spec\'i elle yazmazsın, KODUN KENDİSİNDEN (annotation\'lardan/decorator\'lardan) her build\'de otomatik üretilir — kod ile doküman ASLA birbirinden kopamaz, çünkü doküman kodun bir YANSIMASIdır. Peki neden Express\'in (GRUP C) bu tür bir otomatik üretici KÜTÜPHANESİ yoktur (ya da manuel kurulum gerektirir) — çünkü kod zaten sözleşmeyi annotation/decorator olarak İÇERMİYOR: Express\'te route tanımı ve validation kuralı ayrı ayrı fonksiyonlarda yaşar, üretici bunlardan "sözleşmeyi" çıkaracak sabit bir kalıp bulamaz; Spring/Nest\'te ise `@GetMapping`/`@Get()`, `@RequestBody`/`@Body()` zaten sözleşmeyi yapısal olarak TAŞIR, üretici bunu OKUYUP spec\'e çevirir. QA açısından bu fark kritiktir: springdoc/`@nestjs/swagger` ile üretilen bir spec, koddan SAPMASI mimarî olarak daha ZOR olan bir spec\'tir — ama F5\'te göreceğin gibi, "daha zor" imkânsız demek değildir.',
        en: 'A hand-written `openapi.yaml` is like a **photocopy that goes stale**: the developer changes the code (adds a new field, changes a status code) but FORGETS to update the doc — over time the doc stops reflecting reality. `springdoc-openapi` (Spring/Java) and `@nestjs/swagger` (NestJS) are an **automatic photocopier** that removes this risk: you do not write the spec by hand, it is auto-generated FROM THE CODE ITSELF (from annotations/decorators) on every build — code and doc can NEVER drift apart, because the doc is a REFLECTION of the code. So why does Express (GROUP C) not have such an auto-generator library (or it requires manual setup)? Because the code does not already CONTAIN the contract as annotations/decorators: in Express, route definitions and validation rules live in separate functions, so a generator finds no fixed pattern to extract "the contract" from; in Spring/Nest, `@GetMapping`/`@Get()`, `@RequestBody`/`@Body()` already CARRY the contract structurally, and the generator READS it into a spec. For QA this difference matters: a spec generated by springdoc/`@nestjs/swagger` is architecturally HARDER to drift from the code — but as you will see in F5, "harder" does not mean impossible.',
      },
    },
    { type: 'heading', text: { tr: 'Aynı Kod, Otomatik Doğan Spec', en: 'The Same Code, an Auto-Born Spec' } },
    {
      type: 'code',
      language: 'xml',
      code: {
        tr: `<!-- pom.xml — Spring'de tek bagimlilik, spec otomatik dogar -->
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.5.0</version>
</dependency>
<!-- Ayaga kalkinca /swagger-ui.html otomatik hazir olur -->`,
        en: `<!-- pom.xml — one dependency in Spring, the spec is born automatically -->
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.5.0</version>
</dependency>
<!-- Once started, /swagger-ui.html is ready automatically -->`,
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// main.ts — NestJS'te @nestjs/swagger kurulumu
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const config = new DocumentBuilder()
  .setTitle('Bug Tracker API')
  .setVersion('1.0')
  .build()

const document = SwaggerModule.createDocument(app, config)
// TODO: bu satir olmadan /api-docs hic acilmaz
SwaggerModule.setup('api-docs', app, document)`,
        en: `// main.ts — setting up @nestjs/swagger in NestJS
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const config = new DocumentBuilder()
  .setTitle('Bug Tracker API')
  .setVersion('1.0')
  .build()

const document = SwaggerModule.createDocument(app, config)
// TODO: without this line /api-docs never opens
SwaggerModule.setup('api-docs', app, document)`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-f2-autogen-film',
      title: { tr: '🎬 Kod Değişir, Doküman Kendiliğinden Güncellenir', en: '🎬 Code Changes, the Doc Updates Itself' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'annotation', emoji: '🏷️', label: { tr: '@Get()/@GetMapping', en: '@Get()/@GetMapping' }, color: '#f59e0b' },
        { id: 'build', emoji: '🏗️', label: { tr: 'Build/başlatma', en: 'Build/startup' }, color: '#0ea5e9' },
        { id: 'gen', emoji: '🏭', label: { tr: 'springdoc/@nestjs/swagger', en: 'springdoc/@nestjs/swagger' }, color: '#a78bfa' },
        { id: 'doc', emoji: '📜', label: { tr: 'Güncel spec', en: 'Up-to-date spec' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Geliştirici bir controller\'a yeni bir `@Get(\'stats\')` metodu ekler.', en: 'The developer adds a new `@Get(\'stats\')` method to a controller.' },
          positions: { annotation: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Uygulama yeniden başlar/build alınır.', en: 'The application restarts/is rebuilt.' },
          positions: { annotation: { x: 20, y: 40 }, build: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'annotation', to: 'build', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'springdoc/`@nestjs/swagger` bu YENİ annotation\'ı OKUR ve spec\'e otomatik ekler — hiçbir manuel yazım gerekmez.', en: 'springdoc/`@nestjs/swagger` READS this NEW annotation and adds it to the spec automatically — no manual writing needed.' },
          positions: { build: { x: 20, y: 40 }, gen: { x: 58, y: 55, scale: 1.15, pulse: true } },
          beams: [{ from: 'build', to: 'gen', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — Doküman kodla AYNI ANDA doğar; elle yazılan bir spec\'te olası "unutma" riski burada mimari olarak yoktur.', en: 'The lesson — the doc is born AT THE SAME TIME as the code; the "forgetting" risk possible with a hand-written spec does not architecturally exist here.' },
          positions: { gen: { x: 30, y: 45 }, doc: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'gen', to: 'doc', color: '#22c55e' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Annotation\'dan Otomatik Spec\'e', en: 'From Annotation to Auto-Generated Spec' },
      steps: [
        { id: 1, icon: '🏷️', label: { tr: 'Annotation/decorator yaz…', en: 'Write annotation/decorator…' }, detail: { tr: '@GetMapping/@Get() gibi zaten yazdığın kod, sözleşmeyi yapısal olarak taşır.', en: 'Code you already wrote, like @GetMapping/@Get(), structurally carries the contract.' } },
        { id: 2, icon: '🏭', label: { tr: 'Üretici okusun…', en: 'Let the generator read it…' }, detail: { tr: 'springdoc/@nestjs/swagger başlangıçta/build\'de bu annotation\'ları tarar.', en: 'springdoc/@nestjs/swagger scans these annotations at startup/build.' } },
        { id: 3, icon: '📜', label: { tr: 'Spec otomatik doğsun…', en: 'The spec is born automatically…' }, detail: { tr: '/swagger-ui.html veya /api-docs her zaman KODUN GÜNCEL hâlini yansıtır.', en: '/swagger-ui.html or /api-docs always reflects the CURRENT state of the code.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-f2-order-01',
      question: { tr: 'Otomatik Swagger üretiminin kurulum sırasını diz.', en: 'Order the setup steps for automatic Swagger generation.' },
      items: [
        { id: '1', text: { tr: 'springdoc/@nestjs/swagger bağımlılığını ekle', en: 'Add the springdoc/@nestjs/swagger dependency' }, order: 1 },
        { id: '2', text: { tr: 'Controller/DTO\'lardaki mevcut annotation/decorator\'ları KORU', en: 'KEEP the existing annotations/decorators on Controllers/DTOs' }, order: 2 },
        { id: '3', text: { tr: 'Uygulamayı başlat/build al', en: 'Start the app/build it' }, order: 3 },
        { id: '4', text: { tr: 'Üretici bu annotation\'ları tarar', en: 'The generator scans these annotations' }, order: 4 },
        { id: '5', text: { tr: '/swagger-ui.html veya /api-docs güncel spec\'i gösterir', en: '/swagger-ui.html or /api-docs shows the up-to-date spec' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-f2-swagger-generation',
      id: 'api-f2-swagger-generation',
      title: { tr: 'Kendin Dene: Eksik Kurulum Satırını Tamamla', en: 'Try It Yourself: Complete the Missing Setup Line' },
      starterCode: { tr: `const document = SwaggerModule.createDocument(app, config)
// BUG: document olusturuldu ama hicbir yere BAGLANMADI
// TODO: /api-docs'un acilmasi icin eksik cagriyi ekle`, en: `const document = SwaggerModule.createDocument(app, config)
// BUG: the document was created but NOT WIRED anywhere
// TODO: add the missing call so /api-docs opens` },
      solutionCode: `const document = SwaggerModule.createDocument(app, config)
SwaggerModule.setup('api-docs', app, document)`,
      hint: { tr: '`createDocument` sadece spec nesnesini bellekte OLUŞTURUR; onu bir URL\'e (`/api-docs`) BAĞLAYAN ayrı bir `SwaggerModule.setup(...)` çağrısı gerekir.', en: '`createDocument` only CREATES the spec object in memory; a separate `SwaggerModule.setup(...)` call is needed to BIND it to a URL (`/api-docs`).' },
      successMessage: { tr: 'Doğru! Artık /api-docs gerçekten tarayıcıda açılabilir.', en: 'Correct! Now /api-docs can actually be opened in the browser.' },
    },
    {
      type: 'quiz',
      question: { tr: 'springdoc/@nestjs/swagger ile otomatik üretilen bir spec, elle yazılan bir spec\'e göre en büyük avantajı nedir?', en: 'What is the biggest advantage of a spec auto-generated by springdoc/@nestjs/swagger over a hand-written spec?' },
      options: [
        { id: 'a', text: { tr: 'Kod değiştiğinde spec de OTOMATİK güncellenir — elle yazılan bir spec\'in "eskime" riski yoktur', en: 'The spec updates AUTOMATICALLY when the code changes — a hand-written spec\'s "staleness" risk does not exist' } },
        { id: 'b', text: { tr: 'Daha az disk alanı kaplar', en: 'It takes up less disk space' } },
        { id: 'c', text: { tr: 'Sunucuyu daha hızlı başlatır', en: 'It starts the server faster' } },
        { id: 'd', text: { tr: 'Veritabanı bağlantısını otomatik kurar', en: 'It automatically sets up the database connection' } },
      ],
      correct: 'a',
      explanation: { tr: 'Otomatik üretim, spec\'i kodun kendisinden (annotation/decorator) çıkardığı için kod ile doküman arasında bir "senkronizasyon kaybı" mimari olarak zorlaşır — elle yazılan bir spec\'te ise geliştirici dokümanı güncellemeyi unutabilir.', en: 'Because auto-generation extracts the spec from the code itself (annotations/decorators), a "sync loss" between code and doc becomes architecturally harder — with a hand-written spec, the developer can forget to update the doc.' },
      retryQuestion: {
        question: { tr: 'Express\'in (GRUP C) springdoc/@nestjs/swagger gibi bir otomatik üreticisi neden daha zayıftır/yoktur?', en: 'Why is Express\'s (GROUP C) auto-generator weaker/absent compared to springdoc/@nestjs/swagger?' },
        options: [
          { id: 'a', text: { tr: 'Route/validation kuralı ayrı fonksiyonlarda yaşar, kod sözleşmeyi annotation gibi yapısal taşımaz', en: 'Routes/validation rules live in separate functions, the code does not structurally carry the contract like an annotation' } },
          { id: 'b', text: { tr: 'Express JSON desteklemez', en: 'Express does not support JSON' } },
          { id: 'c', text: { tr: 'Express HTTP\'yi desteklemez', en: 'Express does not support HTTP' } },
          { id: 'd', text: { tr: 'Node.js YAML dosyalarını okuyamaz', en: 'Node.js cannot read YAML files' } },
        ],
        correct: 'a',
        explanation: { tr: 'Spring/Nest\'te annotation/decorator\'lar (`@GetMapping`/`@Get()`) sözleşmeyi kodun yapısında SABİT bir kalıpla taşır; bir üretici bunu güvenle okuyabilir. Express\'te route ve validation ayrı fonksiyonlarda yaşadığından, aynı sabit kalıp yoktur — otomatik üretim için ekstra kurulum/kütüphane gerekir.', en: 'In Spring/Nest, annotations/decorators (`@GetMapping`/`@Get()`) carry the contract in a FIXED pattern in the code\'s structure; a generator can safely read it. In Express, routes and validation live in separate functions, so the same fixed pattern does not exist — auto-generation needs extra setup/libraries.' },
      },
    },
  ],
}

const F3 = {
  title: { tr: '👆 F3 · Swagger UI "Try it out": ilk elle test', en: '👆 F3 · Swagger UI "Try it out": First Manual Test' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '👆',
      content: {
        tr: 'Swagger UI, spec dosyasından otomatik oluşan bir **showroom**dur: bir araba showroom\'unda arabanın teknik özelliklerini kağıttan okumak yerine direksiyona oturup gaza basabilirsin — Swagger UI de spec\'teki her endpoint\'i "Try it out" butonuyla GERÇEKTEN çağırmana izin verir, hiçbir kod yazmadan, hiçbir Postman kurulumu olmadan. Peki Postman zaten varken bu neden ayrı bir araç? Çünkü Swagger UI, spec\'in kendisinden DOĞAR — Postman\'de bir request\'i elle kurman gerekirken (endpoint\'i, alanları biliyor olman gerekir), Swagger UI spec\'i okuyup SANA formu otomatik hazırlar: hangi alanın zorunlu olduğunu, hangi değerlerin geçerli olduğunu (enum) ÖNCEDEN gösterir. Java\'da bunun karşılığı bir REPL (`jshell`) gibidir — kodu derleyip paketlemeden, doğrudan DENEYEBİLDİĞİN bir ortam. QA açısından Swagger UI, bir API\'yi ilk kez gören bir testerın "önce anla, sonra otomasyona geç" akışındaki İLK elle test aracıdır — derin otomasyon (GRUP G-I) buradan SONRA gelir.',
        en: 'Swagger UI is a **showroom** auto-built from the spec file: instead of reading a car\'s technical specs on paper in a showroom, you can sit in the driver\'s seat and press the gas — Swagger UI lets you REALLY call every endpoint in the spec with the "Try it out" button, without writing any code, without setting up Postman. So why is this a separate tool when Postman already exists? Because Swagger UI is BORN from the spec itself — while in Postman you must set up a request by hand (you need to already know the endpoint, the fields), Swagger UI reads the spec and auto-prepares the form FOR YOU: it shows in advance which field is required, which values are valid (enum). The Java equivalent is a REPL (`jshell`) — an environment where you can TRY code directly without compiling and packaging. For QA, Swagger UI is the FIRST hands-on test tool in a tester\'s "understand first, automate later" flow when seeing an API for the first time — deep automation (GROUP G-I) comes AFTER this.',
      },
    },
    { type: 'heading', text: { tr: 'Formdan Gerçek Request\'e', en: 'From a Form to a Real Request' } },
    {
      type: 'text',
      content: {
        tr: 'Swagger UI\'da bir endpoint\'e tıkladığında `Try it out` butonu belirir. Bu butona basınca alanlar DÜZENLENEBİLİR hale gelir, `Execute` butonu ise GERÇEK bir HTTP request\'i gönderir — sonucu (status kodu, response gövdesi) tam olarak DevTools Network panelinde (GRUP E) göreceğinle aynı şekilde gösterir.',
        en: 'Clicking an endpoint in Swagger UI reveals a `Try it out` button. Pressing it makes the fields EDITABLE, and the `Execute` button sends a REAL HTTP request — showing the result (status code, response body) exactly as you would see it in the DevTools Network panel (GROUP E).',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Spec → Swagger UI → Try it out → Gerçek Request', en: 'Spec → Swagger UI → Try it out → Real Request' },
      svg: swaggerUiFlowSvg,
    },
    {
      type: 'video-scene',
      id: 'api-f3-tryitout-film',
      title: { tr: '🎬 Kod Yazmadan İlk API Çağrısı', en: '🎬 The First API Call Without Writing Code' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'ui', emoji: '🖥️', label: { tr: 'Swagger UI açılır', en: 'Swagger UI opens' }, color: '#f59e0b' },
        { id: 'try', emoji: '👆', label: { tr: '"Try it out" tıklanır', en: '"Try it out" clicked' }, color: '#0ea5e9' },
        { id: 'fill', emoji: '✏️', label: { tr: 'Alanlar doldurulur', en: 'Fields are filled' }, color: '#a78bfa' },
        { id: 'exec', emoji: '▶️', label: { tr: '"Execute" tıklanır', en: '"Execute" clicked' }, color: '#22c55e' },
        { id: 'result', emoji: '📥', label: { tr: 'Gerçek status + gövde', en: 'Real status + body' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Tester `/swagger-ui.html`\'i açar — spec\'teki tüm endpoint\'ler görsel bir listede belirir.', en: 'The tester opens `/swagger-ui.html` — all endpoints from the spec appear in a visual list.' },
          positions: { ui: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: '`POST /api/v1/bugs` üzerinde `Try it out` butonuna basar — form artık DÜZENLENEBİLİR.', en: 'They press `Try it out` on `POST /api/v1/bugs` — the form is now EDITABLE.' },
          positions: { ui: { x: 20, y: 35 }, try: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'ui', to: 'try', color: '#0ea5e9' }],
        },
        {
          caption: { tr: 'Spec\'in zaten bildiği alanları (title, severity) doldurur — enum değerleri bile ÖNCEDEN listelenmiştir.', en: 'They fill the fields the spec already knows (title, severity) — even enum values are PRE-LISTED.' },
          positions: { try: { x: 20, y: 35 }, fill: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'try', to: 'fill', color: '#a78bfa' }],
        },
        {
          caption: { tr: '`Execute`\'e basınca GERÇEK bir HTTP request\'i sunucuya gider — bu bir simülasyon değildir.', en: 'Pressing `Execute` sends a REAL HTTP request to the server — this is not a simulation.' },
          positions: { fill: { x: 20, y: 35 }, exec: { x: 58, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'fill', to: 'exec', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Ders — Sonuç (status + gövde) DevTools\'ta göreceğinle aynıdır; Swagger UI kod yazmadan yapılan bir "gerçek" ilk testtir, süs değildir.', en: 'The lesson — the result (status + body) is the same as what you would see in DevTools; Swagger UI is a "real" first test without writing code, not a nicety.' },
          positions: { exec: { x: 30, y: 45 }, result: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'exec', to: 'result', color: '#8b5cf6' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Swagger UI\'da İlk Elle Test Sırası', en: 'The Order for a First Hands-On Test in Swagger UI' },
      steps: [
        { id: 1, icon: '🖥️', label: { tr: 'Swagger UI\'ı aç…', en: 'Open Swagger UI…' }, detail: { tr: 'Genelde /swagger-ui.html veya /api-docs adresinde çalışır.', en: 'Usually runs at /swagger-ui.html or /api-docs.' } },
        { id: 2, icon: '👆', label: { tr: 'Endpoint seç, Try it out\'a bas…', en: 'Pick an endpoint, press Try it out…' }, detail: { tr: 'Form düzenlenebilir hale gelir, spec\'teki alan kuralları (required/enum) görünür.', en: 'The form becomes editable, the spec\'s field rules (required/enum) become visible.' } },
        { id: 3, icon: '▶️', label: { tr: 'Execute et, sonucu oku…', en: 'Execute, read the result…' }, detail: { tr: 'Gerçek status + gövde gelir — DevTools Network panelindekiyle aynı gerçekliktir.', en: 'A real status + body arrives — the same reality as in the DevTools Network panel.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-f3-order-01',
      question: { tr: 'Swagger UI ile ilk elle testi yapma sırasını diz.', en: 'Order the steps for making the first hands-on test with Swagger UI.' },
      items: [
        { id: '1', text: { tr: '/swagger-ui.html\'i tarayıcıda aç', en: 'Open /swagger-ui.html in the browser' }, order: 1 },
        { id: '2', text: { tr: 'Test etmek istediğin endpoint\'i bul', en: 'Find the endpoint you want to test' }, order: 2 },
        { id: '3', text: { tr: '"Try it out" tıkla, alanları doldur', en: 'Click "Try it out", fill the fields' }, order: 3 },
        { id: '4', text: { tr: '"Execute" ile gerçek request\'i gönder', en: 'Send the real request with "Execute"' }, order: 4 },
        { id: '5', text: { tr: 'Dönen status/gövdeyi spec\'in vaadiyle karşılaştır', en: 'Compare the returned status/body with the spec\'s promise' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-f3-try-it-out',
      id: 'api-f3-try-it-out',
      title: { tr: 'Kendin Dene: Swagger UI\'da Ne Zaman "Execute" Aktif Olur?', en: 'Try It Yourself: When Does "Execute" Become Active in Swagger UI?' },
      starterCode: { tr: `// Durum: bir endpoint sayfasi acildi ama alanlar DUZENLENEMEZ, Execute butonu YOK
// TODO: hangi butona basilmadan bu durum degismez?
Eksik adim: ???`, en: `// Situation: an endpoint page opened but the fields are NOT EDITABLE, no Execute button
// TODO: without pressing which button does this state not change?
Eksik adim: ???` },
      solutionCode: { tr: `// "Try it out" tiklanmadan form salt-okunur kalir, Execute gorunmez
Eksik adim: "Try it out" butonuna basmak`, en: `// until "Try it out" is clicked the form stays read-only, Execute is hidden
Eksik adim: "Try it out" butonuna basmak` },
      hint: { tr: 'Swagger UI varsayılan olarak spec\'i SALT-OKUNUR gösterir (dokümantasyon modu). `Try it out` butonuna basmadan form düzenlenemez ve `Execute` görünmez.', en: 'Swagger UI shows the spec READ-ONLY by default (documentation mode). Without pressing `Try it out`, the form cannot be edited and `Execute` does not appear.' },
      successMessage: { tr: 'Doğru! "Try it out" olmadan Swagger UI sadece bir doküman görüntüleyicidir, test aracı değil.', en: 'Correct! Without "Try it out", Swagger UI is just a doc viewer, not a test tool.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Swagger UI\'daki "Execute" butonuna basmak neye karşılık gelir?', en: 'What does pressing the "Execute" button in Swagger UI correspond to?' },
      options: [
        { id: 'a', text: { tr: 'Sunucuya GERÇEK bir HTTP request\'i gönderir — bir simülasyon değildir', en: 'It sends a REAL HTTP request to the server — it is not a simulation' } },
        { id: 'b', text: { tr: 'Sadece spec dosyasını yeniden yükler', en: 'It only reloads the spec file' } },
        { id: 'c', text: { tr: 'Sunucuyu yeniden başlatır', en: 'It restarts the server' } },
        { id: 'd', text: { tr: 'Hiçbir şey yapmaz, sadece görsel bir animasyondur', en: 'It does nothing, it is just a visual animation' } },
      ],
      correct: 'a',
      explanation: { tr: '`Execute`, tarayıcının doğrudan sunucuya gönderdiği gerçek bir HTTP request\'tir; dönen status kodu ve gövde, DevTools Network panelinde göreceğinle birebir aynı gerçekliktir.', en: '`Execute` is a real HTTP request the browser sends directly to the server; the returned status code and body are the exact same reality you would see in the DevTools Network panel.' },
      retryQuestion: {
        question: { tr: 'Swagger UI, spec\'teki `enum` alanlarını "Try it out" formunda nasıl gösterir?', en: 'How does Swagger UI show a spec\'s `enum` fields in the "Try it out" form?' },
        options: [
          { id: 'a', text: { tr: 'Geçerli değerleri önceden listeleyen bir seçim kutusu olarak', en: 'As a dropdown that pre-lists the valid values' } },
          { id: 'b', text: { tr: 'Boş bir metin kutusu olarak, hiçbir ipucu vermeden', en: 'As an empty text box, with no hints' } },
          { id: 'c', text: { tr: 'Enum alanlarını hiç göstermez', en: 'It does not show enum fields at all' } },
          { id: 'd', text: { tr: 'Sadece sayısal alanlarda çalışır', en: 'It only works on numeric fields' } },
        ],
        correct: 'a',
        explanation: { tr: 'Swagger UI, spec\'teki `enum` tanımını okuyup formu buna göre kurar — geçerli değerleri (örn. LOW/MEDIUM/HIGH/CRITICAL) önceden bir seçim kutusunda listeler, kullanıcının tahmin etmesine gerek bırakmaz.', en: 'Swagger UI reads the spec\'s `enum` definition and builds the form accordingly — it pre-lists the valid values (e.g. LOW/MEDIUM/HIGH/CRITICAL) in a dropdown, so the user does not need to guess.' },
      },
    },
  ],
}

const F4 = {
  title: { tr: '🔎 F4 · Schema Okuma: required, type, enum, example', en: '🔎 F4 · Reading Schema: required, type, enum, example' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔎',
      content: {
        tr: 'Bir OpenAPI şeması, bir **başvuru formunun kılavuzudur**: `required` hangi alanları BOŞ bırakamayacağını söyler (kırmızı yıldızlı alanlar), `type` her alanın hangi tür veri beklediğini söyler (isim mi, sayı mı), `enum` bir alanın sadece BELİRLİ değerleri kabul ettiğini söyler (bir açılır liste gibi), `example` ise formun nasıl doldurulacağına dair örnek bir doldurulmuş kopyadır. Peki bu 4 kelimeyi neden tek tek bilmek gerekiyor — "şemaya bak" demek yeterli değil mi? Çünkü her biri FARKLI bir test senaryosu DOĞURUR: `required` eksikse "bu alan olmadan ne olur?" testi, `type` yanlışsa "yanlış tipte veri gönderirsem ne olur?" testi, `enum` dışı bir değer "tanımsız bir değer gönderirsem ne olur?" testi. Java\'da bunun karşılığı Bean Validation annotation\'larıdır: `required` ≈ `@NotNull`/`@NotBlank`, `type` ≈ alanın Java tipi (`String`, `Integer`), `enum` ≈ bir Java `enum` sınıfı veya `@Pattern`. QA açısından bir şemayı OKUMAK, bir test senaryosu LİSTESİ üretmenin en hızlı yoludur — F6\'da tam olarak bunu, sistematik bir şekilde yapacaksın.',
        en: 'An OpenAPI schema is a **guide to a signup form**: `required` says which fields cannot be left BLANK (the red-starred fields), `type` says what kind of data each field expects (a name or a number), `enum` says a field only accepts SPECIFIC values (like a dropdown), and `example` is a sample filled-in copy showing how to fill the form. So why know these 4 words individually — isn\'t "look at the schema" enough? Because each one BIRTHS a DIFFERENT test scenario: a missing `required` births the "what happens without this field?" test, a wrong `type` births the "what happens if I send the wrong data type?" test, an out-of-`enum` value births the "what happens if I send an undefined value?" test. The Java equivalent is Bean Validation annotations: `required` ≈ `@NotNull`/`@NotBlank`, `type` ≈ the field\'s Java type (`String`, `Integer`), `enum` ≈ a Java `enum` class or `@Pattern`. For QA, READING a schema is the fastest way to produce a LIST of test scenarios — in F6 you will do exactly this, systematically.',
      },
    },
    { type: 'heading', text: { tr: 'Bug Kaydının Şeması', en: 'The Bug Record\'s Schema' } },
    {
      type: 'code',
      language: 'json',
      code: {
        tr: `{
  "Bug": {
    "type": "object",
    "required": ["title", "severity", "reporter"],
    "properties": {
      "title": { "type": "string", "minLength": 3, "maxLength": 120, "example": "Login butonu donuyor" },
      "severity": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"], "example": "HIGH" },
      "status": { "type": "string", "enum": ["OPEN", "IN_PROGRESS", "CLOSED"], "example": "OPEN" },
      "reporter": { "type": "string", "format": "email", "example": "tester@learnqa.dev" },
      "createdAt": { "type": "string", "format": "date-time" }
    }
  }
}`,
        en: `{
  "Bug": {
    "type": "object",
    "required": ["title", "severity", "reporter"],
    "properties": {
      "title": { "type": "string", "minLength": 3, "maxLength": 120, "example": "Login button freezes" },
      "severity": { "type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "CRITICAL"], "example": "HIGH" },
      "status": { "type": "string", "enum": ["OPEN", "IN_PROGRESS", "CLOSED"], "example": "OPEN" },
      "reporter": { "type": "string", "format": "email", "example": "tester@learnqa.dev" },
      "createdAt": { "type": "string", "format": "date-time" }
    }
  }
}`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-f4-schema-film',
      title: { tr: '🎬 Bir Şema Satırından Bir Test Senaryosuna', en: '🎬 From a Schema Line to a Test Scenario' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'required', emoji: '⭐', label: { tr: 'required: [title]', en: 'required: [title]' }, color: '#ef4444' },
        { id: 'type', emoji: '🔤', label: { tr: 'type: string', en: 'type: string' }, color: '#0ea5e9' },
        { id: 'enum', emoji: '📋', label: { tr: 'enum: [LOW..CRITICAL]', en: 'enum: [LOW..CRITICAL]' }, color: '#a78bfa' },
        { id: 'tests', emoji: '🧪', label: { tr: '3 test senaryosu doğar', en: '3 test scenarios are born' }, color: '#22c55e' },
      ],
      scenes: [
        {
          caption: { tr: 'Tester şemayı okur: `required: ["title", "severity", "reporter"]`.', en: 'The tester reads the schema: `required: ["title", "severity", "reporter"]`.' },
          positions: { required: { x: 50, y: 40, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Bu satır tek başına bir test senaryosu doğurur: "title olmadan POST atarsam 400 mü alırım?"', en: 'This line alone births a test scenario: "if I POST without title, do I get 400?"' },
          positions: { required: { x: 20, y: 30 }, tests: { x: 60, y: 65, scale: 1.1, pulse: true } },
          beams: [{ from: 'required', to: 'tests', color: '#ef4444' }],
        },
        {
          caption: { tr: '`type: "string"` başka bir senaryo doğurur: "title yerine bir sayı gönderirsem ne olur?"', en: '`type: "string"` births another scenario: "what if I send a number instead of title?"' },
          positions: { type: { x: 50, y: 45, scale: 1.1, pulse: true } },
          beams: [{ from: 'type', to: 'tests', color: '#0ea5e9' }],
        },
        {
          caption: { tr: '`enum: [LOW,MEDIUM,HIGH,CRITICAL]` bir üçüncü senaryo doğurur: "severity: \'URGENT\' gönderirsem ne olur (tanımsız değer)?"', en: '`enum: [LOW,MEDIUM,HIGH,CRITICAL]` births a third scenario: "what if I send severity: \'URGENT\' (an undefined value)?"' },
          positions: { enum: { x: 50, y: 50, scale: 1.1, pulse: true } },
          beams: [{ from: 'enum', to: 'tests', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Ders — Şemadaki her kısıt, sistematik olarak en az bir negatif test senaryosuna dönüşür; şema okumak aslında bir test tasarım tekniğidir.', en: 'The lesson — every constraint in the schema systematically turns into at least one negative test scenario; reading a schema is really a test design technique.' },
          positions: { tests: { x: 50, y: 50, scale: 1.2, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir Şemayı Test Senaryosuna Çevirme Sırası', en: 'The Order for Turning a Schema into Test Scenarios' },
      steps: [
        { id: 1, icon: '⭐', label: { tr: 'required alanlarını listele…', en: 'List required fields…' }, detail: { tr: 'Her zorunlu alan için "onsuz gönderirsem?" negatif testi tasarla.', en: 'Design a "what if I send without it?" negative test for each required field.' } },
        { id: 2, icon: '🔤', label: { tr: 'type uyumsuzluğunu dene…', en: 'Try type mismatches…' }, detail: { tr: 'Beklenen tipin dışında bir değer (sayı yerine metin) göndererek test et.', en: 'Test by sending a value outside the expected type (text instead of number).' } },
        { id: 3, icon: '📋', label: { tr: 'enum dışı değer dene…', en: 'Try an out-of-enum value…' }, detail: { tr: 'Tanımlı olmayan bir değer göndererek sunucunun tepkisini gözlemle.', en: 'Observe the server\'s reaction by sending an undefined value.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-f4-order-01',
      question: { tr: 'Bir şema alanını incelerken sorulacak soruların sırasını diz.', en: 'Order the questions to ask when examining a schema field.' },
      items: [
        { id: '1', text: { tr: 'Bu alan required listesinde mi?', en: 'Is this field in the required list?' }, order: 1 },
        { id: '2', text: { tr: 'type alanı hangi veri türünü bekliyor?', en: 'What data type does the type field expect?' }, order: 2 },
        { id: '3', text: { tr: 'Bir enum kısıtı var mı, hangi değerler geçerli?', en: 'Is there an enum constraint, which values are valid?' }, order: 3 },
        { id: '4', text: { tr: 'example alanı doğru/gerçekçi bir değer mi gösteriyor?', en: 'Does the example field show a correct/realistic value?' }, order: 4 },
        { id: '5', text: { tr: 'Bu bilgilerden negatif test senaryoları türet', en: 'Derive negative test scenarios from this information' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-f4-schema-reading',
      id: 'api-f4-schema-reading',
      title: { tr: 'Kendin Dene: Şemadan Eksik Test Senaryosunu Bul', en: 'Try It Yourself: Find the Missing Test Scenario from the Schema' },
      starterCode: { tr: `// Sema: "severity": { "type": "string", "enum": ["LOW","MEDIUM","HIGH","CRITICAL"] }
// Yazilan testler: gecerli deger (HIGH), bos deger
// TODO: enum kisitina gore hangi ONEMLI negatif test EKSIK?
Eksik test: ???`, en: `// Sema: "severity": { "type": "string", "enum": ["LOW","MEDIUM","HIGH","CRITICAL"] }
// Tests written: valid value (HIGH), empty value
// TODO: enum kisitina gore hangi ONEMLI negatif test EKSIK?
Eksik test: ???` },
      solutionCode: { tr: `// enum LISTESI DISINDA bir deger (ornegin "URGENT") gonderme testi eksik
Eksik test: severity: "URGENT" (tanimsiz enum degeri) gonderip sunucunun tepkisini dogrula`, en: `// a test that sends a value OUTSIDE the enum LIST (for example "URGENT") is missing
Eksik test: severity: "URGENT" (tanimsiz enum degeri) gonderip sunucunun tepkisini dogrula` },
      hint: { tr: '`enum` kısıtı sadece belirli değerlere izin verir. Geçerli bir değer ve boş değer test edilmiş olsa da, listede OLMAYAN bir değerin (tanımsız enum) sunucuyu nasıl etkilediği ayrı ve kritik bir negatif testtir.', en: 'An `enum` constraint only allows specific values. Even if a valid value and an empty value are tested, how a value NOT in the list (an undefined enum) affects the server is a separate, critical negative test.' },
      successMessage: { tr: 'Doğru! enum dışı değer testi, şema kısıtlarının GERÇEKTEN uygulandığını kanıtlayan kritik bir senaryodur.', en: 'Correct! An out-of-enum test is a critical scenario that proves the schema constraint is REALLY enforced.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir şemadaki `enum: ["LOW","MEDIUM","HIGH","CRITICAL"]` kısıtı hangi test senaryosunu DOĞRUDAN doğurur?', en: 'Which test scenario does an `enum: ["LOW","MEDIUM","HIGH","CRITICAL"]` schema constraint DIRECTLY birth?' },
      options: [
        { id: 'a', text: { tr: 'Listede olmayan bir değer (örn. "URGENT") gönderilirse sunucunun nasıl tepki verdiğini test etmek', en: 'Testing how the server reacts if a value not in the list (e.g. "URGENT") is sent' } },
        { id: 'b', text: { tr: 'Sunucunun ne kadar hızlı response verdiğini test etmek', en: 'Testing how fast the server responds' } },
        { id: 'c', text: { tr: 'Veritabanı bağlantısını test etmek', en: 'Testing the database connection' } },
        { id: 'd', text: { tr: 'CSS stillerinin doğru yüklendiğini test etmek', en: 'Testing that CSS styles load correctly' } },
      ],
      correct: 'a',
      explanation: { tr: '`enum`, bir alanın sadece belirli değerleri kabul ettiğini bildirir; bunun doğal test senaryosu, listede OLMAYAN bir değer göndererek sunucunun bunu reddedip reddetmediğini (400 dönüp dönmediğini) doğrulamaktır.', en: '`enum` declares that a field only accepts specific values; the natural test scenario is sending a value NOT in the list and verifying whether the server rejects it (returns 400 or not).' },
      retryQuestion: {
        question: { tr: 'Bir şemada `required` listesinde olmayan bir alan ne anlama gelir?', en: 'What does a field NOT in a schema\'s `required` list mean?' },
        options: [
          { id: 'a', text: { tr: 'Alan opsiyoneldir — onsuz gönderilen bir request de geçerli olmalıdır', en: 'The field is optional — a request sent without it should still be valid' } },
          { id: 'b', text: { tr: 'Alan asla gönderilemez', en: 'The field can never be sent' } },
          { id: 'c', text: { tr: 'Alan sadece GET request\'lerinde geçerlidir', en: 'The field is only valid on GET requests' } },
          { id: 'd', text: { tr: 'Şema bu alanı yok sayar', en: 'The schema ignores this field' } },
        ],
        correct: 'a',
        explanation: { tr: '`required` listesinde OLMAYAN bir alan opsiyoneldir; sözleşmeye göre bu alan olmadan gönderilen bir request de geçerli kabul edilmelidir — testerın doğrulayacağı şey tam olarak budur.', en: 'A field NOT in the `required` list is optional; per the contract, a request sent without it should still be accepted as valid — this is exactly what a tester verifies.' },
      },
    },
  ],
}

const F5 = {
  title: { tr: '⚠️ F5 · Contract Defect\'leri', en: '⚠️ F5 · Contract Defects' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '⚠️',
      content: {
        tr: 'Bir contract defect, F1\'de öğrendiğin "mimari çizim" analojisine geri döner: çizimde "bu oda 20 metrekare" yazarken gerçekte 15 metrekare olması gibi — bina (kod) ÇALIŞIYOR, çizim (spec) de VAR, ama ikisi birbirini YALANLIYOR. F2\'de gördüğün otomatik üretim bu riski AZALTIR ama SIFIRLAMAZ: spec üretilirken bile bir geliştirici yanlış bir `@ApiResponse` annotation\'ı yazabilir, veya spec elle düzenlendiyse kod değişince güncellenmemiş olabilir. Peki bu neden özellikle SİNSİ bir defect kategorisidir — normal bir fonksiyonel bug\'dan farkı ne? Çünkü UI\'daki manuel test veya fonksiyonel bir otomasyon testi genelde SADECE "request başarılı mı?" sorar, "response tam olarak DOKÜMANDAKİ ŞEKİLDE mi?" sorusunu SORMAZ — bu yüzden bir contract defect, aylarca fark edilmeden production\'da yaşayabilir, ta ki spec\'e güvenen bir mobil uygulama veya üçüncü taraf entegrasyonu YANLIŞ varsayımla çökene kadar. Java\'da bunun karşılığı, bir `interface`\'in JavaDoc\'unun kodla senkronize kalmaması gibidir — derleyici bunu YAKALAMAZ, çünkü JavaDoc derlemenin bir parçası değildir; tıpkı bir spec\'in "derlemenin" (build\'in) bir parçası olmasına rağmen İÇERİĞİNİN doğruluğunun ayrıca test EDİLMESİ gerektiği gibi. QA açısından contract testing, tam olarak bu boşluğu kapatan disiplindir.',
        en: 'A contract defect returns to the "architectural blueprint" analogy from F1: the blueprint says "this room is 20 square meters" while it is really 15 — the building (the code) WORKS, the blueprint (the spec) EXISTS, but the two CONTRADICT each other. The auto-generation you saw in F2 REDUCES this risk but does not ZERO it out: even while generating a spec, a developer can write a wrong `@ApiResponse` annotation, or if the spec was hand-edited it may not have been updated when the code changed. So why is this an especially SNEAKY defect category — how does it differ from a normal functional bug? Because manual testing in the UI or a functional automation test usually ONLY asks "did the request succeed?", it does NOT ask "does the response EXACTLY match the DOCUMENTED shape?" — so a contract defect can live in production unnoticed for months, until a mobile app or a third-party integration trusting the spec crashes on a WRONG assumption. The Java equivalent is an `interface`\'s JavaDoc falling out of sync with the code — the compiler does NOT catch this, because JavaDoc is not part of compilation; just as a spec being part of the "build" does not mean its CONTENT\'s accuracy is separately TESTED. For QA, contract testing is exactly the discipline that closes this gap.',
      },
    },
    { type: 'heading', text: { tr: '4 Gerçek Contract Defect Senaryosu', en: '4 Real Contract Defect Scenarios' } },
    {
      type: 'diagram-svg',
      title: { tr: 'Doküman Diyor ki... — Gerçek API Diyor ki...', en: 'The Doc Says... — The Real API Says...' },
      svg: contractBreakSvg,
    },
    {
      type: 'simple-box',
      emoji: '1️⃣',
      content: {
        tr: '**1. Status Kodu Uyumsuzluğu** — Spec `POST /api/v1/bugs` için `200` döndüğünü söyler, ama gerçek API `201 Created` döner. **Kök neden:** geliştirici kod tarafında doğru pratiğe (`201` = oluşturma) geçmiş ama spec\'i güncellemeyi UNUTMUŞ. **Tester nasıl yakalar:** Swagger UI\'da `Try it out` ile gerçek request\'i çalıştırıp dönen status kodunu dokümandaki ile birebir karşılaştırarak.',
        en: '**1. Status code mismatch** — the spec says `POST /api/v1/bugs` returns `200`, but the real API returns `201 Created`. **Root cause:** the developer moved to the correct practice on the code side (`201` = creation) but FORGOT to update the spec. **How the tester catches it:** running the real request with `Try it out` in Swagger UI and comparing the returned status code exactly against the doc.',
      },
    },
    {
      type: 'simple-box',
      emoji: '2️⃣',
      content: {
        tr: '**2. Enum Drift** — Spec `severity` için `[LOW, MEDIUM, HIGH]` üç değer listeler, ama geliştirici kod tarafına yeni bir `CRITICAL` değeri EKLEMİŞ ve spec\'e YANSITMAMIŞ. **Kök neden:** enum bir Java/TS sabitler listesinde kolayca genişletilebilir ama spec\'teki karşılığı elle güncellenmesi gereken AYRI bir liste. **Tester nasıl yakalar:** gerçek response\'larda dokümanda OLMAYAN bir değer görerek, veya negatif testte "CRITICAL reddedilmeli" beklerken kabul edildiğini fark ederek.',
        en: '**2. Enum drift** — the spec lists three `severity` values `[LOW, MEDIUM, HIGH]`, but the developer ADDED a new `CRITICAL` value on the code side and did NOT reflect it in the spec. **Root cause:** an enum can easily expand in a Java/TS constants list, but its counterpart in the spec is a SEPARATE list that must be updated by hand. **How the tester catches it:** seeing a value NOT in the doc in real responses, or expecting "CRITICAL should be rejected" in a negative test and noticing it is accepted instead.',
      },
    },
    {
      type: 'simple-box',
      emoji: '3️⃣',
      content: {
        tr: '**3. Required Yalanı** — Spec `reporter` alanını `required` listesinde gösterir, ama gerçek API bu alan OLMADAN gönderilen bir request\'i de kabul edip `201` döner. **Kök neden:** backend\'deki doğrulama kuralı (`@NotBlank`/`@IsNotEmpty`) ya hiç yazılmamış ya da bir yerde SESSİZCE devre dışı (bkz. B1/D3\'teki eksik pipe/starter defect\'leri) — spec doğru yazılmış ama koddaki GERÇEK davranış farklı. **Tester nasıl yakalar:** "zorunlu" işaretli her alanı bilerek BOŞ bırakarak deneyip 400 yerine 201 alındığında.',
        en: '**3. The required lie** — the spec lists `reporter` in the `required` list, but the real API also accepts a request sent WITHOUT this field and returns `201`. **Root cause:** the backend validation rule (`@NotBlank`/`@IsNotEmpty`) was either never written or is SILENTLY disabled somewhere (see the missing pipe/starter defects in B1/D3) — the spec is written correctly, but the code\'s REAL behavior differs. **How the tester catches it:** deliberately leaving every field marked "required" empty and getting 201 instead of 400.',
      },
    },
    {
      type: 'simple-box',
      emoji: '4️⃣',
      content: {
        tr: '**4. Alan Tipi Uyumsuzluğu** — Spec `createdAt` alanının `type: string, format: date-time` (ISO-8601, örn. `2026-07-24T10:00:00Z`) olduğunu söyler, ama gerçek API bunu bir UNIX timestamp sayısı (`1753350000`) olarak döner. **Kök neden:** backend\'de serialization ayarı değişmiş (örn. farklı bir JSON kütüphanesi/konfigürasyon) ama spec bu değişikliği YAKALAMAMIŞ. **Tester nasıl yakalar:** gerçek response\'ta bir alanın TİPİNİ (string mi sayı mı) spec\'teki `type`/`format` ile birebir karşılaştırarak — özellikle spec\'e güvenerek otomatik parse eden bir istemci (mobil uygulama) bu farkta ÇÖKER.',
        en: '**4. Field type mismatch** — the spec says `createdAt` is `type: string, format: date-time` (ISO-8601, e.g. `2026-07-24T10:00:00Z`), but the real API returns it as a UNIX timestamp number (`1753350000`). **Root cause:** a serialization setting changed on the backend (e.g. a different JSON library/config) but the spec did NOT catch this change. **How the tester catches it:** comparing a real response field\'s TYPE (string or number) exactly against the spec\'s `type`/`format` — a client (mobile app) that trusts the spec and auto-parses will CRASH on this mismatch.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-f5-contract-broken-film',
      title: { tr: '🎬 Sözleşme Bozuldu', en: '🎬 The Contract Broke' },
      xpReward: 15,
      sceneDurationMs: 3400,
      stageHeight: 280,
      actors: [
        { id: 'doc', emoji: '📜', label: { tr: 'Doküman: 200 diyor', en: 'Doc: says 200' }, color: '#22c55e' },
        { id: 'dev', emoji: '👨‍💻', label: { tr: 'Geliştirici kodu değiştirdi', en: 'Developer changed the code' }, color: '#f59e0b' },
        { id: 'api', emoji: '🖥️', label: { tr: 'Gerçek API: 201 dönüyor', en: 'Real API: returns 201' }, color: '#ef4444' },
        { id: 'client', emoji: '📱', label: { tr: 'Mobil uygulama dokümana güveniyor', en: 'Mobile app trusts the doc' }, color: '#a78bfa' },
        { id: 'tester', emoji: '🕵️', label: { tr: 'Tester ayrışmayı yakalar', en: 'Tester catches the divergence' }, color: '#8b5cf6' },
      ],
      scenes: [
        {
          caption: { tr: 'Doküman aylarca doğruydu: `POST /api/v1/bugs` başarıyla `200` döner diyordu, ve öyleydi.', en: 'The doc was correct for months: it said `POST /api/v1/bugs` returns `200` on success, and it did.' },
          positions: { doc: { x: 50, y: 45, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Bir geliştirici kodu "doğru pratiğe" (`201 Created`) taşır — ama spec\'i güncellemeyi UNUTUR.', en: 'A developer moves the code to "correct practice" (`201 Created`) — but FORGETS to update the spec.' },
          positions: { doc: { x: 20, y: 30 }, dev: { x: 58, y: 45, scale: 1.15, pulse: true } },
          beams: [{ from: 'doc', to: 'dev', color: '#f59e0b' }],
        },
        {
          caption: { tr: 'Gerçek API artık `201` dönüyor — ama doküman HÂLÂ `200` diyor. Sözleşme SESSİZCE bozuldu.', en: 'The real API now returns `201` — but the doc STILL says `200`. The contract SILENTLY broke.' },
          positions: { dev: { x: 20, y: 30 }, api: { x: 58, y: 45, scale: 1.2, pulse: true } },
          beams: [{ from: 'dev', to: 'api', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Dokümana güvenen bir mobil uygulama "sadece 200 = başarı" mantığıyla yazılmıştı — `201`\'i TANIMAZ, kullanıcıya hata gösterir.', en: 'A mobile app that trusts the doc was written with "only 200 = success" logic — it does NOT recognize `201`, shows the user an error.' },
          positions: { api: { x: 20, y: 65 }, client: { x: 58, y: 65, scale: 1.15, pulse: true } },
          beams: [{ from: 'api', to: 'client', color: '#a78bfa' }],
        },
        {
          caption: { tr: 'Tester, Swagger UI\'da `Try it out` çalıştırıp dönen `201`\'i dokümanın vaat ettiği `200` ile KARŞILAŞTIRIR — ayrışmayı bulur.', en: 'The tester runs `Try it out` in Swagger UI and COMPARES the returned `201` against the doc\'s promised `200` — finds the divergence.' },
          positions: { client: { x: 30, y: 50 }, tester: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'client', to: 'tester', color: '#8b5cf6' }],
        },
        {
          caption: { tr: 'Ders — "Kod doğru, doküman eski" bir mazeret DEĞİL, bir bug\'dır: sözleşmeye güvenen HERKES (mobil, entegrasyon, test) yanlış varsayımla çalışır.', en: 'The lesson — "the code is right, the doc is old" is NOT an excuse, it is a bug: EVERYONE trusting the contract (mobile, integrations, tests) operates on a wrong assumption.' },
          positions: { tester: { x: 40, y: 48, scale: 1.15, pulse: true } },
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir Contract Defect\'i Kanıtlama Sırası', en: 'The Order for Proving a Contract Defect' },
      steps: [
        { id: 1, icon: '📜', label: { tr: 'Spec\'in vaadini oku…', en: 'Read the spec\'s promise…' }, detail: { tr: 'Status kodu, alan tipi, enum listesi gibi somut bir iddiayı not al.', en: 'Note a concrete claim like status code, field type, or enum list.' } },
        { id: 2, icon: '▶️', label: { tr: 'Gerçek request\'i çalıştır…', en: 'Run the real request…' }, detail: { tr: 'Swagger UI Try it out veya Postman ile gerçek response\'u al.', en: 'Get the real response with Swagger UI Try it out or Postman.' } },
        { id: 3, icon: '⚖️', label: { tr: 'Vaat ile gerçeği karşılaştır…', en: 'Compare the promise with reality…' }, detail: { tr: 'Uyumsuzluk varsa bunu "kod doğru, doküman eski" savunmasına karşı BUG olarak raporla.', en: 'If there is a mismatch, report it as a BUG against the "code is right, doc is old" defense.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-f5-order-01',
      question: { tr: 'Bir contract defect\'i tespit etme ve raporlama sürecini sırala.', en: 'Order the process for detecting and reporting a contract defect.' },
      items: [
        { id: '1', text: { tr: 'Spec\'teki somut bir iddiayı (status/type/enum) not al', en: 'Note a concrete claim in the spec (status/type/enum)' }, order: 1 },
        { id: '2', text: { tr: 'Aynı request\'i gerçek API\'ye gönder', en: 'Send the same request to the real API' }, order: 2 },
        { id: '3', text: { tr: 'Gerçek sonucu spec\'in vaadiyle satır satır karşılaştır', en: 'Compare the real result against the spec\'s promise line by line' }, order: 3 },
        { id: '4', text: { tr: 'Uyumsuzluğu (varsa) kanıtla', en: 'Prove the mismatch (if any)' }, order: 4 },
        { id: '5', text: { tr: 'Bug olarak aç, "doküman eski" mazeretini kabul etme', en: 'File it as a bug, do not accept the "the doc is old" excuse' }, order: 5 },
      ],
      xpReward: 13,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-f5-contract-defects',
      id: 'api-f5-contract-defects',
      title: { tr: 'Kendin Dene: Contract Defect\'i Sınıflandır', en: 'Try It Yourself: Classify the Contract Defect' },
      starterCode: { tr: `// Spec: "severity" enum'i [LOW, MEDIUM, HIGH] (3 deger)
// Gercek API yaniti: "severity": "CRITICAL" (spec'te olmayan 4. deger)
// TODO: bu hangi contract defect kategorisidir?
Kategori: ???`, en: `// Spec: the "severity" enum is [LOW, MEDIUM, HIGH] (3 values)
// Real API response: "severity": "CRITICAL" (a 4th value not in the spec)
// TODO: bu hangi contract defect kategorisidir?
Kategori: ???` },
      solutionCode: { tr: `// Kodda enum genisletilmis (yeni deger eklenmis) ama spec guncellenmemis
Kategori: Enum drift`, en: `// The enum was extended in the code (a new value added) but the spec was not updated
Kategori: Enum drift` },
      hint: { tr: 'Spec\'te tanımlı olmayan yeni bir değerin gerçek response\'ta belirmesi, kodun spec\'ten daha "ileride" olduğu, yani enum listesinin spec\'te GÜNCELLENMEDİĞİ anlamına gelir — bu "enum drift"tir.', en: 'A new value not defined in the spec appearing in the real response means the code is "ahead" of the spec — the enum list was NOT UPDATED in the spec — this is "enum drift".' },
      successMessage: { tr: 'Doğru! Enum drift, spec\'in en sık gözden kaçan ayrışma türlerinden biridir.', en: 'Correct! Enum drift is one of the most commonly overlooked divergence types in a spec.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Swagger dokümanı `200` diyor ama gerçek API `201` dönüyor; geliştirici "kod doğru, doküman eski" diyor. Bunu bug olarak açar mısın, neden?', en: 'The Swagger doc says `200` but the real API returns `201`; the developer says "the code is right, the doc is old". Do you file this as a bug, and why?' },
      options: [
        { id: 'a', text: { tr: 'Evet — sözleşmeye güvenen HERKES (mobil, entegrasyon, otomasyon) yanlış varsayımla çalışır; doküman eskiyse GÜNCELLENMELİDİR', en: 'Yes — EVERYONE trusting the contract (mobile, integrations, automation) operates on a wrong assumption; if the doc is stale it MUST be updated' } },
        { id: 'b', text: { tr: 'Hayır, kod doğruysa sorun yoktur', en: 'No, if the code is correct there is no problem' } },
        { id: 'c', text: { tr: 'Hayır, status kodu önemli değildir', en: 'No, the status code does not matter' } },
        { id: 'd', text: { tr: 'Evet ama sadece görsel bir sorundur, ciddiyeti düşüktür', en: 'Yes but it is only a cosmetic issue, low severity' } },
      ],
      correct: 'a',
      explanation: { tr: 'Bir spec sadece bir "not" değil, diğer ekiplerin/araçların GÜVENDİĞİ bir sözleşmedir. "Kod doğru, doküman eski" ifadesi sorunu ÇÖZMEZ, sadece nedenini açıklar — sözleşmeye güvenen mobil uygulama, entegrasyon veya otomasyon testi hâlâ YANLIŞ varsayımla çalışıyor olur.', en: 'A spec is not just a "note", it is a contract that OTHER teams/tools TRUST. "The code is right, the doc is old" does not FIX the problem, it only explains its cause — a mobile app, integration, or automation test trusting the contract still operates on a WRONG assumption.' },
      retryQuestion: {
        question: { tr: '"Required yalanı" contract defect\'inin tanımı nedir?', en: 'What defines a "required lie" contract defect?' },
        options: [
          { id: 'a', text: { tr: 'Spec bir alanı zorunlu gösterirken, gerçek API bu alan olmadan da request\'i kabul etmesi', en: 'The spec marks a field as required, but the real API accepts the request without it too' } },
          { id: 'b', text: { tr: 'Bir alanın hiç var olmaması', en: 'A field not existing at all' } },
          { id: 'c', text: { tr: 'Sunucunun yavaş response vermesi', en: 'The server responding slowly' } },
          { id: 'd', text: { tr: 'Spec dosyasının bulunamaması', en: 'The spec file not being found' } },
        ],
        correct: 'a',
        explanation: { tr: '"Required yalanı", spec\'in bir alanı zorunlu (`required`) olarak BİLDİRMESİNE rağmen, backend\'deki gerçek doğrulama kuralının eksik/devre dışı olması nedeniyle o alan olmadan da request\'in kabul edilmesidir — spec ile GERÇEK davranış arasındaki bir uyumsuzluktur.', en: 'A "required lie" is when the spec DECLARES a field as required, but because the real validation rule on the backend is missing/disabled, a request is accepted without that field too — a mismatch between the spec and REAL behavior.' },
      },
    },
  ],
}

const F6 = {
  title: { tr: '🧾 F6 · Swagger\'dan Test Senaryosu Türetmek', en: '🧾 F6 · Deriving Test Scenarios from Swagger' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧾',
      content: {
        tr: 'F1-F5\'te öğrendiğin her şey (sözleşme kavramı, otomatik üretim, Try it out, şema okuma, contract defect\'leri) tek bir BECERİDE birleşir: bir spec dosyasından SİSTEMATİK bir test senaryosu ÇEKLİSTESİ türetmek. Bu, bir mimari çizimden bir **denetim listesi** çıkarmaya benzer: elektrikçi çizime bakıp "her prizin doğru yerde olduğunu, her kablonun doğru kalınlıkta olduğunu" TEK TEK kontrol eder — rastgele dolaşmaz. Peki bu neden "rastgele test etmekten" DAHA İYİdir? Çünkü şemadaki her `required`/`type`/`enum` kısıtı GARANTİLİ bir test senaryosu üretir (F4), ve her endpoint için 2xx/4xx/5xx olasılıkları BELLİDİR (A5) — bu ikisini birleştirdiğinde, "aklına ne gelirse test et" yerine "spec\'in İZİN VERDİĞİ ve YASAKLADIĞI her durumu sistematik olarak dene" checklist\'ine geçersin. Java\'da bunun karşılığı bir `interface`\'in tüm implementasyonlarını test eden bir "contract test" paketidir — her implementasyon AYNI davranış sözleşmesini karşılamalıdır. QA açısından bu, GRUP F\'in doruk noktasıdır: artık spec sadece OKUDUĞUN bir belge değil, test PLANLADIĞIN bir kaynak kod.',
        en: 'Everything you learned in F1-F5 (the contract concept, auto-generation, Try it out, schema reading, contract defects) merges into ONE SKILL: deriving a SYSTEMATIC test scenario CHECKLIST from a spec file. This is like extracting an **inspection checklist** from an architectural blueprint: an electrician looks at the blueprint and checks ONE BY ONE that "every outlet is in the right place, every wire is the right gauge" — they do not wander randomly. So why is this BETTER than "testing randomly"? Because every `required`/`type`/`enum` constraint in the schema GUARANTEES a test scenario (F4), and every endpoint\'s 2xx/4xx/5xx possibilities are KNOWN (A5) — combining the two, you move from "test whatever comes to mind" to a checklist of "systematically try every case the spec ALLOWS and FORBIDS". The Java equivalent is a "contract test" suite that tests all implementations of an `interface` — every implementation must satisfy the SAME behavior contract. For QA, this is the peak of GROUP F: the spec is no longer just a document you READ, it is source material you PLAN tests from.',
      },
    },
    { type: 'heading', text: { tr: 'Bir Şemadan Bir Checklist\'e', en: 'From a Schema to a Checklist' } },
    {
      type: 'code',
      language: 'yaml',
      code: {
        tr: `# POST /api/v1/bugs icin sema ozeti
required: [title, severity, reporter]
title: { type: string, minLength: 3, maxLength: 120 }
severity: { enum: [LOW, MEDIUM, HIGH, CRITICAL] }
reporter: { format: email }

# Bu semadan TURETILEN checklist (ornek):
# 1. Tum alanlar gecerliyken -> 201 beklenir
# 2. title eksikken -> 400 beklenir (required)
# 3. title 2 karakterken -> 400 beklenir (minLength ihlali)
# 4. title 121 karakterken -> 400 beklenir (maxLength ihlali)
# 5. severity: "URGENT" (enum disi) -> 400 beklenir
# 6. reporter: "gecersiz-email" (format ihlali) -> 400 beklenir`,
        en: `# schema summary for POST /api/v1/bugs
required: [title, severity, reporter]
title: { type: string, minLength: 3, maxLength: 120 }
severity: { enum: [LOW, MEDIUM, HIGH, CRITICAL] }
reporter: { format: email }

# checklist DERIVED from this schema (example):
# 1. all fields valid -> expect 201
# 2. title missing -> expect 400 (required)
# 3. title 2 chars -> expect 400 (minLength violation)
# 4. title 121 chars -> expect 400 (maxLength violation)
# 5. severity: "URGENT" (out of enum) -> expect 400
# 6. reporter: "invalid-email" (format violation) -> expect 400`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-f6-checklist-film',
      title: { tr: '🎬 Bir Şemadan 6 Test Senaryosu Doğar', en: '🎬 6 Test Scenarios Are Born from One Schema' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'schema', emoji: '📐', label: { tr: 'Şema kısıtları', en: 'Schema constraints' }, color: '#f59e0b' },
        { id: 'happy', emoji: '✅', label: { tr: 'Mutlu yol: 1 senaryo', en: 'Happy path: 1 scenario' }, color: '#22c55e' },
        { id: 'negative', emoji: '🚫', label: { tr: 'Negatif: 5 senaryo', en: 'Negative: 5 scenarios' }, color: '#ef4444' },
        { id: 'checklist', emoji: '📋', label: { tr: 'Tam checklist', en: 'Complete checklist' }, color: '#a78bfa' },
      ],
      scenes: [
        {
          caption: { tr: 'Tester bir endpoint\'in şemasına bakar: `required`, `minLength`/`maxLength`, `enum`, `format` kısıtları listelenir.', en: 'The tester looks at an endpoint\'s schema: `required`, `minLength`/`maxLength`, `enum`, `format` constraints are listed.' },
          positions: { schema: { x: 50, y: 50, scale: 1.1, pulse: true } },
        },
        {
          caption: { tr: 'Tüm kısıtlara uyan TEK bir "mutlu yol" senaryosu türer: geçerli veri → 201 beklenir.', en: 'ONE "happy path" scenario that satisfies all constraints emerges: valid data → expect 201.' },
          positions: { schema: { x: 20, y: 35 }, happy: { x: 58, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'schema', to: 'happy', color: '#22c55e' }],
        },
        {
          caption: { tr: 'Her kısıtın İHLALİ ayrı bir negatif senaryo doğurur: eksik alan, çok kısa/uzun metin, enum dışı değer, geçersiz format — 5 senaryo.', en: 'VIOLATING each constraint births a separate negative scenario: missing field, too-short/long text, out-of-enum value, invalid format — 5 scenarios.' },
          positions: { happy: { x: 20, y: 35 }, negative: { x: 58, y: 50, scale: 1.2, pulse: true } },
          beams: [{ from: 'happy', to: 'negative', color: '#ef4444' }],
        },
        {
          caption: { tr: 'Ders — Bu 6 senaryo tahmin değil, DOĞRUDAN şemadan türetildi; bu sistematik yöntem, "aklına gelen" testten çok daha kapsamlıdır.', en: 'The lesson — these 6 scenarios are not guesses, they were DIRECTLY derived from the schema; this systematic method is far more thorough than "whatever comes to mind" testing.' },
          positions: { negative: { x: 30, y: 45 }, checklist: { x: 62, y: 50, scale: 1.15, pulse: true } },
          beams: [{ from: 'negative', to: 'checklist', color: '#a78bfa' }],
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Şemadan Checklist\'e Türetme Sırası', en: 'The Order for Deriving a Checklist from a Schema' },
      steps: [
        { id: 1, icon: '✅', label: { tr: 'Mutlu yolu yaz…', en: 'Write the happy path…' }, detail: { tr: 'Tüm kısıtlara uyan geçerli veriyle bir senaryo: beklenen 2xx.', en: 'One scenario with data satisfying all constraints: expect 2xx.' } },
        { id: 2, icon: '⭐', label: { tr: 'required ihlallerini ekle…', en: 'Add required violations…' }, detail: { tr: 'Her zorunlu alanı tek tek eksik bırakan ayrı senaryolar: beklenen 400.', en: 'A separate scenario for each required field left out one at a time: expect 400.' } },
        { id: 3, icon: '📋', label: { tr: 'type/enum/format ihlallerini ekle…', en: 'Add type/enum/format violations…' }, detail: { tr: 'Yanlış tip, enum dışı değer, geçersiz format için ayrı senaryolar: beklenen 400.', en: 'Separate scenarios for wrong type, out-of-enum value, invalid format: expect 400.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-f6-order-01',
      question: { tr: 'Bir checklist\'i şemadan türetme sürecini önem/kapsam sırasına göre diz.', en: 'Order the process for deriving a checklist from a schema by importance/scope.' },
      items: [
        { id: '1', text: { tr: 'Şemayı oku: required/type/enum/format kısıtlarını listele', en: 'Read the schema: list required/type/enum/format constraints' }, order: 1 },
        { id: '2', text: { tr: 'Mutlu yol senaryosunu yaz (tüm kısıtlara uyan veri)', en: 'Write the happy-path scenario (data satisfying all constraints)' }, order: 2 },
        { id: '3', text: { tr: 'Her required alanı için "eksikken" senaryosu ekle', en: 'Add a "when missing" scenario for each required field' }, order: 3 },
        { id: '4', text: { tr: 'Her type/enum/format kısıtı için ihlal senaryosu ekle', en: 'Add a violation scenario for each type/enum/format constraint' }, order: 4 },
        { id: '5', text: { tr: 'Checklist\'i otomasyona (Postman/REST Assured/Playwright) taşı', en: 'Move the checklist into automation (Postman/REST Assured/Playwright)' }, order: 5 },
      ],
      xpReward: 12,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-f6-derive-checklist',
      id: 'api-f6-derive-checklist',
      title: { tr: 'Kendin Dene: Şemadan Eksik Senaryoyu Türet', en: 'Try It Yourself: Derive the Missing Scenario from the Schema' },
      starterCode: { tr: `// Sema: "title": { "type": "string", "minLength": 3, "maxLength": 120 }
// Yazilan senaryolar: gecerli title, title eksik (required ihlali)
// TODO: minLength/maxLength kisitindan hangi 2 senaryo daha turemeli?
Eksik senaryolar: ???`, en: `// Sema: "title": { "type": "string", "minLength": 3, "maxLength": 120 }
// Scenarios written: valid title, missing title (required violation)
// TODO: which 2 more scenarios should derive from the minLength/maxLength constraint?
Eksik senaryolar: ???` },
      solutionCode: `// minLength ihlali: 2 karakterlik title -> 400 beklenir
// maxLength ihlali: 121 karakterlik title -> 400 beklenir
Eksik senaryolar: cok kisa title (minLength altinda) ve cok uzun title (maxLength ustunde)`,
      hint: { tr: '`minLength`/`maxLength` kısıtları iki AYRI sınırı tanımlar — her sınırın İKİ tarafında (sınırın altında ve üstünde) ayrı bir negatif senaryo test edilmelidir, sadece "eksik alan" senaryosu bu kısıtları KAPSAMAZ.', en: '`minLength`/`maxLength` constraints define two SEPARATE boundaries — a separate negative scenario must be tested on EITHER side of each boundary (below and above); the "missing field" scenario alone does NOT cover these constraints.' },
      successMessage: { tr: 'Doğru! Sınır değer (boundary) testleri, şemadan türetilen checklist\'in vazgeçilmez bir parçasıdır.', en: 'Correct! Boundary-value tests are an indispensable part of a schema-derived checklist.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir şemadan sistematik test senaryosu türetmenin "rastgele test etmeye" göre en büyük avantajı nedir?', en: 'What is the biggest advantage of systematically deriving test scenarios from a schema over "testing randomly"?' },
      options: [
        { id: 'a', text: { tr: 'Şemadaki her kısıt garantili bir senaryo üretir — hiçbir required/type/enum kuralı test EDİLMEDEN atlanmaz', en: 'Every constraint in the schema guarantees a scenario — no required/type/enum rule is skipped WITHOUT being tested' } },
        { id: 'b', text: { tr: 'Testler daha hızlı çalışır', en: 'Tests run faster' } },
        { id: 'c', text: { tr: 'Sunucu daha az yük alır', en: 'The server takes less load' } },
        { id: 'd', text: { tr: 'Kod daha az satır olur', en: 'The code has fewer lines' } },
      ],
      correct: 'a',
      explanation: { tr: 'Rastgele test etmek testerın aklına gelenle sınırlıdır ve kısıtları atlayabilir; şemadan sistematik türetme ise her `required`/`type`/`enum`/`format` kısıtının EN AZ bir test senaryosuna dönüşmesini GARANTİ eder — kapsam tahmine değil şemaya dayanır.', en: 'Random testing is limited to what comes to the tester\'s mind and can skip constraints; systematic derivation from the schema GUARANTEES every `required`/`type`/`enum`/`format` constraint turns into AT LEAST one test scenario — coverage is based on the schema, not guesswork.' },
      retryQuestion: {
        question: { tr: 'GRUP F\'in (Swagger/OpenAPI) sayfanın genel akışındaki rolü nedir?', en: 'What is GROUP F\'s (Swagger/OpenAPI) role in the page\'s overall flow?' },
        options: [
          { id: 'a', text: { tr: 'Geliştirmede (GRUP B-D) yazılan sözleşmeyi makine-okunur hale getirip, aktif test araçlarına (GRUP G-I) sistematik bir checklist olarak köprü kurar', en: 'It makes the contract written in development (GROUP B-D) machine-readable and bridges it to active test tools (GROUP G-I) as a systematic checklist' } },
          { id: 'b', text: { tr: 'Sadece görsel bir dokümantasyon aracıdır, teste hiç katkısı yoktur', en: 'It is purely a visual documentation tool with no contribution to testing' } },
          { id: 'c', text: { tr: 'GRUP E (DevTools Network) ile hiçbir ilgisi yoktur', en: 'It has no relation to GROUP E (DevTools Network)' } },
          { id: 'd', text: { tr: 'Sadece Java geliştiriciler için geçerlidir', en: 'It only applies to Java developers' } },
        ],
        correct: 'a',
        explanation: { tr: 'GRUP F, GRUP B-D\'de kodun İÇİNDE yazılan sözleşmeyi bir spec\'e döker, F4-F6\'da bu spec\'i sistematik bir test checklist\'ine çevirir — bu checklist doğrudan GRUP G (Postman), H (REST Assured) ve I (Playwright)\'a taşınır.', en: 'GROUP F pours the contract written INSIDE the code in GROUP B-D into a spec, and in F4-F6 turns this spec into a systematic test checklist — this checklist is carried directly into GROUP G (Postman), H (REST Assured), and I (Playwright).' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP G — Postman ile Test (ÇAKIŞMA KURALI: derin anlatım → /postman'e link,
// burada sadece "/api/v1/bugs'u şimdi bu araçla test edelim" seviyesi)
// ═══════════════════════════════════════════════════════════════════════════

const G1 = {
  title: { tr: '📁 G1 · Collection ve Klasör Yapısı', en: '📁 G1 · Collection and Folder Structure' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📁',
      content: {
        tr: 'Bir Postman Collection, `/api/v1/bugs` için yazılmış tüm request\'leri saklayan bir **test klasörüdür** — ama bunları ENDPOINT\'e göre değil, gerçek bir kullanım AKIŞINA göre grupladığında ("Bug Oluşturma Akışı", "Bug Yaşam Döngüsü") anlamlı olur. Java\'da en yakın karşılığı, `src/test/java` altında paketleri özelliğe göre (`bugcreation`, `buglifecycle`) ayırmaktır — teknik katmana göre değil, iş akışına göre. **Derin Collection/klasör mimarisi rehberi için → `/postman` sayfasına bak; burada sadece Bug Tracker\'ı Postman\'e taşıyoruz.**',
        en: 'A Postman Collection is a **test folder** holding all requests written for `/api/v1/bugs` — but it only makes sense when grouped not by endpoint, but by a real usage FLOW ("Bug Creation Flow", "Bug Lifecycle"). The closest Java equivalent is splitting packages under `src/test/java` by feature (`bugcreation`, `buglifecycle`), not by technical layer. **For a deep Collection/folder architecture guide → see the `/postman` page; here we are just carrying the Bug Tracker into Postman.**',
      },
    },
    {
      type: 'code',
      language: 'json',
      code: {
        tr: `// Bug Tracker koleksiyonu — akisa gore gruplanmis klasorler
{
  "info": { "name": "Bug Tracker API" },
  "item": [
    { "name": "Bug Olusturma Akisi", "item": ["POST /bugs", "GET /bugs/{id}"] },
    { "name": "Bug Yasam Dongusu", "item": ["PATCH /bugs/{id}/status", "DELETE /bugs/{id}"] }
  ]
}`,
        en: `// Bug Tracker collection — folders grouped by flow
{
  "info": { "name": "Bug Tracker API" },
  "item": [
    { "name": "Bug Creation Flow", "item": ["POST /bugs", "GET /bugs/{id}"] },
    { "name": "Bug Lifecycle", "item": ["PATCH /bugs/{id}/status", "DELETE /bugs/{id}"] }
  ]
}`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-g1-collection-film',
      title: { tr: '🎬 Bug Tracker\'ı Postman\'e Taşımak', en: '🎬 Carrying the Bug Tracker into Postman' },
      xpReward: 10,
      sceneDurationMs: 3400,
      stageHeight: 240,
      actors: [
        { id: 'endpoints', emoji: '🔌', label: { tr: '6 endpoint', en: '6 endpoints' }, color: '#f59e0b' },
        { id: 'flow', emoji: '🔀', label: { tr: 'Akışa göre grupla', en: 'Group by flow' }, color: '#0ea5e9' },
        { id: 'collection', emoji: '📁', label: { tr: 'Bug Tracker Collection', en: 'Bug Tracker Collection' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'GRUP B-D\'de kurduğumuz 6 endpoint\'i (`/api/v1/bugs`) şimdi Postman\'e taşıyacağız.', en: 'We now carry the 6 endpoints (`/api/v1/bugs`) we built in GROUP B-D into Postman.' }, positions: { endpoints: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Onları endpoint listesi olarak değil, gerçek bir akış olarak grupluyoruz: önce oluştur, sonra yaşam döngüsünü yönet.', en: 'We group them not as an endpoint list, but as a real flow: create first, then manage the lifecycle.' }, positions: { endpoints: { x: 20, y: 40 }, flow: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'endpoints', to: 'flow', color: '#0ea5e9' }] },
        { caption: { tr: 'Sonuç: bir bakışta okunabilir, akışa dayalı bir Collection.', en: 'The result: a flow-based Collection, readable at a glance.' }, positions: { flow: { x: 20, y: 40 }, collection: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'flow', to: 'collection', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Endpoint\'ten Collection\'a', en: 'From Endpoints to a Collection' },
      steps: [
        { id: 1, icon: '🔌', label: { tr: 'Endpoint\'leri listele…', en: 'List the endpoints…' }, detail: { tr: '/api/v1/bugs\'un 6 endpoint\'ini gözden geçir (GRUP B-D).', en: 'Review the 6 endpoints of /api/v1/bugs (GROUP B-D).' } },
        { id: 2, icon: '🔀', label: { tr: 'Akışlara ayır…', en: 'Split into flows…' }, detail: { tr: 'Endpoint yerine "oluşturma", "yaşam döngüsü" gibi gerçek kullanım akışlarına grupla.', en: 'Group by real usage flows like "creation", "lifecycle" instead of by endpoint.' } },
        { id: 3, icon: '📁', label: { tr: 'Klasörleri kur…', en: 'Set up the folders…' }, detail: { tr: 'Her akış bir klasör, her request o klasörün altında bir öğe olur.', en: 'Each flow is a folder, each request an item under it.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-g1-order-01',
      question: { tr: 'Bir Postman collection\'ı akışa göre kurma sırasını diz.', en: 'Order the steps for setting up a Postman collection by flow.' },
      items: [
        { id: '1', text: { tr: 'Endpoint listesini gözden geçir', en: 'Review the endpoint list' }, order: 1 },
        { id: '2', text: { tr: 'Gerçek kullanım akışlarını belirle', en: 'Identify real usage flows' }, order: 2 },
        { id: '3', text: { tr: 'Her akış için bir klasör oluştur', en: 'Create a folder for each flow' }, order: 3 },
        { id: '4', text: { tr: 'Request\'leri ilgili klasöre yerleştir', en: 'Place requests into the relevant folder' }, order: 4 },
        { id: '5', text: { tr: 'Collection\'ı takımla paylaş', en: 'Share the collection with the team' }, order: 5 },
      ],
      xpReward: 9,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-g1-collection-structure',
      id: 'api-g1-collection-structure',
      title: { tr: 'Kendin Dene: Doğru Klasörü Seç', en: 'Try It Yourself: Pick the Right Folder' },
      starterCode: `// Request\'ler: POST /bugs, GET /bugs/{id}, PATCH /bugs/{id}/status, DELETE /bugs/{id}
// TODO: "PATCH /bugs/{id}/status" hangi akis klasorune ait?
Klasor: ???`,
      solutionCode: { tr: `// Status guncelleme, bir bug'in YASAM DONGUSUNUN parcasidir (olusturma degil)
Klasor: Bug Yasam Dongusu`, en: `// A status update is part of a bug's LIFECYCLE (not creation)
Klasor: Bug Yasam Dongusu` },
      hint: { tr: 'Klasörler ENDPOINT\'e değil AKIŞA göre kurulur. `PATCH /bugs/{id}/status`, bir bug oluşturulduktan SONRAKİ bir aşamayı (durum değişimi) temsil eder — yaşam döngüsü akışına aittir.', en: 'Folders are built by FLOW, not by endpoint. `PATCH /bugs/{id}/status` represents a stage AFTER a bug is created (status change) — it belongs to the lifecycle flow.' },
      successMessage: { tr: 'Doğru! Akışa göre gruplama, koleksiyonu bir bakışta anlaşılır kılar.', en: 'Correct! Grouping by flow makes the collection understandable at a glance.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Postman collection\'larını endpoint yerine akışa göre gruplamanın avantajı nedir?', en: 'What is the advantage of grouping Postman collections by flow instead of by endpoint?' },
      options: [
        { id: 'a', text: { tr: 'Koleksiyon gerçek kullanım senaryolarını yansıtır, ekip bir bakışta iş akışını anlar', en: 'The collection reflects real usage scenarios, the team understands the workflow at a glance' } },
        { id: 'b', text: { tr: 'Postman daha hızlı çalışır', en: 'Postman runs faster' } },
        { id: 'c', text: { tr: 'Sunucu daha az yük alır', en: 'The server takes less load' } },
        { id: 'd', text: { tr: 'Hiçbir farkı yoktur', en: 'It makes no difference' } },
      ],
      correct: 'a',
      explanation: { tr: 'Endpoint bazlı gruplama teknik bir listedir; akış bazlı gruplama ("önce oluştur, sonra yönet") gerçek kullanım senaryosunu yansıtır ve yeni bir takım üyesinin koleksiyonu hızla anlamasını sağlar.', en: 'Endpoint-based grouping is a technical list; flow-based grouping ("create first, then manage") reflects the real usage scenario and lets a new team member quickly understand the collection.' },
      retryQuestion: {
        question: { tr: 'Postman Collection\'ların Java\'daki en yakın karşılığı nedir?', en: 'What is the closest Java equivalent of Postman Collections?' },
        options: [
          { id: 'a', text: { tr: 'src/test/java altında özelliğe göre gruplanan test paketleri', en: 'Test packages under src/test/java grouped by feature' } },
          { id: 'b', text: { tr: 'pom.xml dosyası', en: 'The pom.xml file' } },
          { id: 'c', text: { tr: 'Bir Dockerfile', en: 'A Dockerfile' } },
          { id: 'd', text: { tr: 'application.properties', en: 'application.properties' } },
        ],
        correct: 'a',
        explanation: { tr: 'Tıpkı bir Java projesinde test paketlerinin teknik katmana değil özelliğe göre gruplanması gibi, Postman collection\'ları da endpoint\'e değil gerçek kullanım akışına göre gruplanır.', en: 'Just as Java test packages are grouped by feature rather than technical layer, Postman collections are grouped by real usage flow rather than by endpoint.' },
      },
    },
  ],
}

const G2 = {
  title: { tr: '🌍 G2 · Environment + Variable: {{baseUrl}}, {{bugId}}', en: '🌍 G2 · Environment + Variable: {{baseUrl}}, {{bugId}}' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🌍',
      content: {
        tr: '`{{baseUrl}}` gibi bir Postman değişkeni, Java\'daki `application.properties`\'teki `${server.url}` gibi bir **yer tutucudur** — request\'in İÇİNE sabit bir değer yazmak yerine, ortam DEĞİŞİNCE (dev/staging/prod) tek bir yerden değişen bir referans kullanırsın. `{{bugId}}` ise bir request\'in SONUCUNU bir SONRAKİ request\'e TAŞIYAN bir köprüdür (G4\'te bunu aktif olarak kuracaksın). **Derin environment/variable scope rehberi için → `/postman` sayfasına bak.**',
        en: 'A Postman variable like `{{baseUrl}}` is a **placeholder**, much like `${server.url}` in Java\'s `application.properties` — instead of hardcoding a value INSIDE the request, you use a single reference that changes when the environment (dev/staging/prod) changes. `{{bugId}}` is a bridge that CARRIES one request\'s RESULT into the NEXT request (you will build this actively in G4). **For a deep environment/variable scope guide → see the `/postman` page.**',
      },
    },
    {
      type: 'code',
      language: 'text',
      code: {
        tr: `# Environment: "Bug Tracker - Local"
baseUrl = http://localhost:3000

# Request artik sabit degil, degiskenle yazilir:
GET {{baseUrl}}/api/v1/bugs/{{bugId}}`,
        en: `# Environment: "Bug Tracker - Local"
baseUrl = http://localhost:3000

# The request is no longer hardcoded, it uses a variable:
GET {{baseUrl}}/api/v1/bugs/{{bugId}}`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-g2-env-film',
      title: { tr: '🎬 Tek Tıkla dev\'den staging\'e Geçmek', en: '🎬 Switching from dev to staging with One Click' },
      xpReward: 10,
      sceneDurationMs: 3400,
      stageHeight: 240,
      actors: [
        { id: 'hardcoded', emoji: '🔒', label: { tr: 'Sabit URL (kırılgan)', en: 'Hardcoded URL (fragile)' }, color: '#ef4444' },
        { id: 'variable', emoji: '🌍', label: { tr: '{{baseUrl}} değişkeni', en: '{{baseUrl}} variable' }, color: '#0ea5e9' },
        { id: 'switch', emoji: '🔀', label: { tr: 'Environment değiştir', en: 'Switch environment' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Request\'te URL sabit yazılırsa, her ortam değişiminde ONLARCA request\'i elle düzeltmek gerekir.', en: 'If the URL is hardcoded in the request, dozens of requests must be fixed by hand on every environment change.' }, positions: { hardcoded: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: '`{{baseUrl}}` değişkenine geçince request artık ortamdan BAĞIMSIZ yazılmış olur.', en: 'Switching to the `{{baseUrl}}` variable, the request is now written INDEPENDENT of the environment.' }, positions: { hardcoded: { x: 20, y: 40 }, variable: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'hardcoded', to: 'variable', color: '#0ea5e9' }] },
        { caption: { tr: 'Environment\'ı "Local"dan "Staging"e değiştirmek TEK tıkla TÜM request\'leri günceller.', en: 'Switching the environment from "Local" to "Staging" updates ALL requests with ONE click.' }, positions: { variable: { x: 20, y: 40 }, switch: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'variable', to: 'switch', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Sabit Değerden Ortam Değişkenine', en: 'From a Hardcoded Value to an Environment Variable' },
      steps: [
        { id: 1, icon: '🌍', label: { tr: 'Environment oluştur…', en: 'Create an environment…' }, detail: { tr: '"Bug Tracker - Local" gibi bir environment aç, baseUrl değişkenini tanımla.', en: 'Open an environment like "Bug Tracker - Local", define the baseUrl variable.' } },
        { id: 2, icon: '✏️', label: { tr: 'Request\'lerde kullan…', en: 'Use it in requests…' }, detail: { tr: 'URL\'i sabit yazmak yerine {{baseUrl}} referansıyla yaz.', en: 'Instead of hardcoding the URL, write it as a {{baseUrl}} reference.' } },
        { id: 3, icon: '🔀', label: { tr: 'Ortamı değiştir…', en: 'Switch the environment…' }, detail: { tr: 'Sağ üstteki environment seçiciyle dev/staging arasında tek tıkla geçiş yap.', en: 'Switch between dev/staging with one click via the environment selector top-right.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-g2-order-01',
      question: { tr: 'Sabit URL\'den ortam değişkenine geçiş sırasını diz.', en: 'Order the steps for moving from a hardcoded URL to an environment variable.' },
      items: [
        { id: '1', text: { tr: 'Yeni bir Environment oluştur', en: 'Create a new Environment' }, order: 1 },
        { id: '2', text: { tr: 'baseUrl değişkenini tanımla', en: 'Define the baseUrl variable' }, order: 2 },
        { id: '3', text: { tr: 'Request\'lerdeki sabit URL\'i {{baseUrl}} ile değiştir', en: 'Replace hardcoded URLs in requests with {{baseUrl}}' }, order: 3 },
        { id: '4', text: { tr: 'Environment\'ı seçiciden aktif et', en: 'Activate the environment from the selector' }, order: 4 },
        { id: '5', text: { tr: 'Request\'i çalıştır, doğru ortama gittiğini doğrula', en: 'Run the request, verify it hit the right environment' }, order: 5 },
      ],
      xpReward: 9,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-g2-environment-variable',
      id: 'api-g2-environment-variable',
      title: { tr: 'Kendin Dene: Sabit URL\'i Değişkene Çevir', en: 'Try It Yourself: Turn the Hardcoded URL into a Variable' },
      starterCode: `// BUG: URL sabit yazilmis, ortam degisince elle duzeltmek gerekir
GET http://localhost:3000/api/v1/bugs/42`,
      solutionCode: `// FIX: baseUrl degiskeni kullanildi, ortam degisince otomatik guncellenir
GET {{baseUrl}}/api/v1/bugs/{{bugId}}`,
      hint: { tr: 'Sabit yazılan her URL, ortam değişince ELLE düzeltilmesi gereken bir bakım yüküdür. `{{baseUrl}}` ve `{{bugId}}` gibi değişkenler bu yükü ortadan kaldırır.', en: 'Every hardcoded URL is a maintenance burden that must be fixed by hand when the environment changes. Variables like `{{baseUrl}}` and `{{bugId}}` remove that burden.' },
      successMessage: { tr: 'Doğru! Artık environment değişince request otomatik doğru ortama gider.', en: 'Correct! Now the request automatically goes to the right environment when it switches.' },
    },
    {
      type: 'quiz',
      question: { tr: '`{{baseUrl}}` gibi bir Postman değişkeni kullanmanın en büyük avantajı nedir?', en: 'What is the biggest advantage of using a Postman variable like `{{baseUrl}}`?' },
      options: [
        { id: 'a', text: { tr: 'Ortam (dev/staging/prod) değişince tüm request\'ler TEK bir yerden güncellenir', en: 'When the environment (dev/staging/prod) changes, all requests update from ONE place' } },
        { id: 'b', text: { tr: 'Request\'leri daha hızlı gönderir', en: 'It sends requests faster' } },
        { id: 'c', text: { tr: 'Sunucuyu otomatik başlatır', en: 'It automatically starts the server' } },
        { id: 'd', text: { tr: 'JSON gövdesini otomatik doğrular', en: 'It automatically validates the JSON body' } },
      ],
      correct: 'a',
      explanation: { tr: 'Sabit yazılan bir URL her ortam değişiminde onlarca request\'i elle güncellemeyi gerektirir; bir değişken kullanmak bu güncellemeyi TEK bir yere (Environment tanımına) indirger.', en: 'A hardcoded URL requires manually updating dozens of requests on every environment change; using a variable reduces this update to ONE place (the Environment definition).' },
      retryQuestion: {
        question: { tr: '`{{bugId}}` gibi bir değişkenin G4\'teki rolü ne olacak?', en: 'What role will a variable like `{{bugId}}` play in G4?' },
        options: [
          { id: 'a', text: { tr: 'Bir POST request\'inin sonucundaki id\'yi bir sonraki GET request\'ine taşıyan köprü olacak', en: 'It will be the bridge carrying a POST request\'s resulting id into the next GET request' } },
          { id: 'b', text: { tr: 'Sadece dokümantasyon amaçlı olacak', en: 'It will be purely for documentation purposes' } },
          { id: 'c', text: { tr: 'Hiçbir işlevi olmayacak', en: 'It will have no function' } },
          { id: 'd', text: { tr: 'Sadece hata mesajlarında görünecek', en: 'It will only appear in error messages' } },
        ],
        correct: 'a',
        explanation: { tr: 'G4\'te bir Pre-request/Test script, POST response\'undan gelen `id`\'yi `pm.environment.set(\'bugId\', ...)` ile bu değişkene yazacak — sonraki request\'ler bu değeri `{{bugId}}` ile okuyacak.', en: 'In G4, a Pre-request/Test script will write the `id` from the POST response into this variable with `pm.environment.set(\'bugId\', ...)` — subsequent requests will read that value via `{{bugId}}`.' },
      },
    },
  ],
}

const G3 = {
  title: { tr: '🧪 G3 · pm.test ile Assertion', en: '🧪 G3 · Assertions with pm.test' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🧪',
      content: {
        tr: '`pm.test(...)`, Postman\'in JavaScript ile yazılan **assertion cümlesidir** — Java\'da JUnit\'teki `assertEquals`/`assertThat`\'in birebir karşılığı, sadece dil ve syntax farklı. `pm.response.to.have.status(201)` demek, JUnit\'te `assertEquals(201, response.getStatus())` demekle AYNI işi yapar. Peki neden sadece "request\'i gönder, gözle bak" yetmiyor? Çünkü göz kontrolü ÖLÇEKLENMEZ ve TEKRARLANAMAZ — `pm.test` yazınca bu kontrol her koşumda OTOMATİK ve TUTARLI çalışır. **Derin `pm.test`/Chai assertion rehberi için → `/postman` sayfasına bak.**',
        en: '`pm.test(...)` is Postman\'s JavaScript-written **assertion statement** — the direct counterpart of JUnit\'s `assertEquals`/`assertThat` in Java, only the language and syntax differ. Saying `pm.response.to.have.status(201)` does the SAME job as `assertEquals(201, response.getStatus())` in JUnit. So why isn\'t "send the request, eyeball it" enough? Because eyeballing does not SCALE and is not REPEATABLE — writing `pm.test` makes this check run AUTOMATICALLY and CONSISTENTLY on every run. **For a deep `pm.test`/Chai assertion guide → see the `/postman` page.**',
      },
    },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `// POST /api/v1/bugs sonrasi Tests sekmesine yazilir
pm.test('Status 201 doner', () => {
  pm.response.to.have.status(201)
})

pm.test('Yanit title alanini icerir', () => {
  const body = pm.response.json()
  pm.expect(body.title).to.eql('Login butonu donuyor')
})`,
        en: `// written in the Tests tab after POST /api/v1/bugs
pm.test('Status is 201', () => {
  pm.response.to.have.status(201)
})

pm.test('Response contains the title field', () => {
  const body = pm.response.json()
  pm.expect(body.title).to.eql('Login button freezes')
})`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-g3-assertion-film',
      title: { tr: '🎬 Gözle Bakmaktan Otomatik Doğrulamaya', en: '🎬 From Eyeballing to Automated Verification' },
      xpReward: 10,
      sceneDurationMs: 3400,
      stageHeight: 240,
      actors: [
        { id: 'eye', emoji: '👁️', label: { tr: 'Gözle kontrol (ölçeklenmez)', en: 'Eyeball check (does not scale)' }, color: '#ef4444' },
        { id: 'test', emoji: '🧪', label: { tr: 'pm.test yazılır', en: 'pm.test is written' }, color: '#0ea5e9' },
        { id: 'auto', emoji: '✅', label: { tr: 'Her koşumda otomatik', en: 'Automatic on every run' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Bir tester her request\'ten sonra response\'u gözle kontrol ediyor — yorucu ve hataya açık.', en: 'A tester eyeballs the response after every request — tiring and error-prone.' }, positions: { eye: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: '`Tests` sekmesine `pm.test(...)` yazılır — kontrol artık KOD haline gelir.', en: '`pm.test(...)` is written in the `Tests` tab — the check becomes CODE.' }, positions: { eye: { x: 20, y: 40 }, test: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'eye', to: 'test', color: '#0ea5e9' }] },
        { caption: { tr: 'Artık her koşumda status ve gövde OTOMATİK doğrulanır — tekrar tekrar aynı titizlikle.', en: 'Now status and body are AUTOMATICALLY verified on every run — repeatedly, with the same rigor.' }, positions: { test: { x: 20, y: 40 }, auto: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'test', to: 'auto', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir Assertion Yazma Sırası', en: 'The Order for Writing an Assertion' },
      steps: [
        { id: 1, icon: '📤', label: { tr: 'Request\'i gönder…', en: 'Send the request…' }, detail: { tr: 'POST /api/v1/bugs request\'ini çalıştır, response\'u gözlemle.', en: 'Run the POST /api/v1/bugs request, observe the response.' } },
        { id: 2, icon: '🧪', label: { tr: 'Tests sekmesine yaz…', en: 'Write in the Tests tab…' }, detail: { tr: 'pm.test(...) ile status ve gövde kontrolünü koda döktür.', en: 'Turn the status and body check into code with pm.test(...).' } },
        { id: 3, icon: '✅', label: { tr: 'Sonucu doğrula…', en: 'Verify the result…' }, detail: { tr: 'Test Results sekmesinde yeşil/kırmızı sonucu oku.', en: 'Read the green/red result in the Test Results tab.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-g3-order-01',
      question: { tr: 'Bir pm.test yazma ve doğrulama sürecini sırala.', en: 'Order the process for writing and verifying a pm.test.' },
      items: [
        { id: '1', text: { tr: 'Request\'i gönder, ham response\'u gör', en: 'Send the request, see the raw response' }, order: 1 },
        { id: '2', text: { tr: 'Tests sekmesini aç', en: 'Open the Tests tab' }, order: 2 },
        { id: '3', text: { tr: 'pm.test(...) ile status kontrolü yaz', en: 'Write a status check with pm.test(...)' }, order: 3 },
        { id: '4', text: { tr: 'pm.expect(...) ile gövde kontrolü ekle', en: 'Add a body check with pm.expect(...)' }, order: 4 },
        { id: '5', text: { tr: 'Test Results\'ta yeşil/kırmızı sonucu doğrula', en: 'Verify the green/red result in Test Results' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-g3-pm-test-assertion',
      id: 'api-g3-pm-test-assertion',
      title: { tr: 'Kendin Dene: Eksik Assertion\'ı Tamamla', en: 'Try It Yourself: Complete the Missing Assertion' },
      starterCode: { tr: `pm.test('Status 201 doner', () => {
  pm.response.to.have.status(201)
})
// TODO: yanitin "severity" alaninin "HIGH" oldugunu dogrulayan testi ekle`, en: `pm.test('Status 201 doner', () => {
  pm.response.to.have.status(201)
})
// TODO: add a test asserting the response's "severity" field is "HIGH"` },
      solutionCode: `pm.test('Status 201 doner', () => {
  pm.response.to.have.status(201)
})

pm.test('severity alani HIGH', () => {
  const body = pm.response.json()
  pm.expect(body.severity).to.eql('HIGH')
})`,
      hint: { tr: 'Sadece status kodu kontrolü, gövdenin İÇERİĞİNİ doğrulamaz. `pm.response.json()` ile gövdeyi ayrıştırıp `pm.expect(...)` ile belirli bir alanı kontrol etmen gerekir.', en: 'Checking only the status code does not verify the body\'s CONTENT. You need to parse the body with `pm.response.json()` and check a specific field with `pm.expect(...)`.' },
      successMessage: { tr: 'Doğru! Artık hem status hem gövde içeriği otomatik doğrulanıyor.', en: 'Correct! Now both the status and body content are automatically verified.' },
    },
    {
      type: 'quiz',
      question: { tr: '`pm.test(...)` yazmanın "response\'u gözle kontrol etmeye" göre en büyük avantajı nedir?', en: 'What is the biggest advantage of writing `pm.test(...)` over "eyeballing the response"?' },
      options: [
        { id: 'a', text: { tr: 'Kontrol koda dönüşür — her koşumda otomatik ve tutarlı çalışır, ölçeklenir', en: 'The check becomes code — it runs automatically and consistently on every run, and scales' } },
        { id: 'b', text: { tr: 'Request\'i daha hızlı gönderir', en: 'It sends the request faster' } },
        { id: 'c', text: { tr: 'Sunucu yükünü azaltır', en: 'It reduces server load' } },
        { id: 'd', text: { tr: 'Hiçbir farkı yoktur', en: 'It makes no difference' } },
      ],
      correct: 'a',
      explanation: { tr: 'Gözle kontrol her koşumda tekrar edilmesi gereken, yorucu ve tutarsız bir eylemdir. `pm.test` yazınca bu kontrol KOD haline gelir — her koşumda otomatik çalışır, insan hatasına açık değildir ve CI\'da (G6) ölçeklenir.', en: 'Eyeballing is a tiring, inconsistent action that must be repeated every run. Writing `pm.test` turns the check into CODE — it runs automatically every time, is not open to human error, and scales in CI (G6).' },
      retryQuestion: {
        question: { tr: '`pm.test(...)`\'in Java\'daki en yakın karşılığı nedir?', en: 'What is the closest Java equivalent of `pm.test(...)`?' },
        options: [
          { id: 'a', text: { tr: 'JUnit\'teki bir @Test metodu içindeki assertEquals/assertThat çağrısı', en: 'An assertEquals/assertThat call inside a JUnit @Test method' } },
          { id: 'b', text: { tr: 'Bir @Entity sınıfı', en: 'An @Entity class' } },
          { id: 'c', text: { tr: 'Bir Dockerfile komutu', en: 'A Dockerfile command' } },
          { id: 'd', text: { tr: 'Bir application.properties satırı', en: 'An application.properties line' } },
        ],
        correct: 'a',
        explanation: { tr: 'İkisi de aynı fikri taşır: bir beklentiyi (status/alan değeri) koda döküp otomatik, tekrarlanabilir bir doğrulama yapmak — sadece dil (Java/JavaScript) ve syntax farklıdır.', en: 'Both carry the same idea: turning an expectation (status/field value) into code for automatic, repeatable verification — only the language (Java/JavaScript) and syntax differ.' },
      },
    },
  ],
}

const G4 = {
  title: { tr: '🔗 G4 · Pre-request Script ve Test Zinciri', en: '🔗 G4 · Pre-request Script and Test Chaining' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔗',
      content: {
        tr: 'Test zincirleme, bir POST request\'inin ÜRETTİĞİ `id`\'yi bir sonraki GET request\'ine TAŞIMAKTIR — Java\'da bir metodun dönüş değerini bir sonraki metoda PARAMETRE olarak geçirmenin Postman\'deki karşılığıdır. `Tests` sekmesinde `pm.environment.set(\'bugId\', body.id)` yazınca, POST\'un response\'undan gelen id G2\'de tanımladığın `{{bugId}}` değişkenine YAZILIR; bir sonraki request bu değeri OKUYUP kullanır. Peki bu neden tek bir request\'te her şeyi test etmekten daha iyi? Çünkü gerçek bir kullanıcı akışı da TAM OLARAK böyledir: önce bir bug OLUŞTURULUR, SONRA o bug\'a REFERANSLA işlem yapılır — zincirleme test bu gerçek akışı BİREBİR simüle eder. **Derin pre-request script rehberi için → `/postman` sayfasına bak.**',
        en: 'Test chaining CARRIES the `id` PRODUCED by a POST request into the next GET request — the Postman counterpart of passing a method\'s return value as a PARAMETER to the next method in Java. Writing `pm.environment.set(\'bugId\', body.id)` in the `Tests` tab WRITES the id from the POST response into the `{{bugId}}` variable you defined in G2; the next request READS and uses that value. So why is this better than testing everything in one request? Because a real user flow is EXACTLY like this: a bug is FIRST created, THEN acted upon BY REFERENCE — test chaining EXACTLY simulates this real flow. **For a deep pre-request script guide → see the `/postman` page.**',
      },
    },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `// POST /api/v1/bugs -> Tests sekmesi
pm.test('Bug olusturuldu', () => {
  pm.response.to.have.status(201)
  const body = pm.response.json()
  // TODO: id'yi bir sonraki istege TASI
  pm.environment.set('bugId', body.id)
})

// Sonraki request: GET {{baseUrl}}/api/v1/bugs/{{bugId}}
// bugId artik onceki POST'tan gelen GERCEK id'dir`,
        en: `// POST /api/v1/bugs -> Tests tab
pm.test('Bug was created', () => {
  pm.response.to.have.status(201)
  const body = pm.response.json()
  // TODO: CARRY the id into the next request
  pm.environment.set('bugId', body.id)
})

// Next request: GET {{baseUrl}}/api/v1/bugs/{{bugId}}
// bugId is now the REAL id that came from the previous POST`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-g4-chain-film',
      title: { tr: '🎬 Zincirleme Test', en: '🎬 Chained Testing' },
      xpReward: 14,
      sceneDurationMs: 3400,
      stageHeight: 270,
      actors: [
        { id: 'post', emoji: '📤', label: { tr: 'POST /bugs → id: 42', en: 'POST /bugs → id: 42' }, color: '#f59e0b' },
        { id: 'set', emoji: '💾', label: { tr: 'pm.environment.set("bugId", 42)', en: 'pm.environment.set("bugId", 42)' }, color: '#0ea5e9' },
        { id: 'var', emoji: '🌍', label: { tr: '{{bugId}} = 42', en: '{{bugId}} = 42' }, color: '#a78bfa' },
        { id: 'get', emoji: '📥', label: { tr: 'GET /bugs/{{bugId}}', en: 'GET /bugs/{{bugId}}' }, color: '#22c55e' },
        { id: 'proof', emoji: '✅', label: { tr: 'Gerçek akış test edildi', en: 'The real flow was tested' }, color: '#8b5cf6' },
      ],
      scenes: [
        { caption: { tr: '`POST /api/v1/bugs` çalıştırılır — sunucu YENİ bir kayıt oluşturur, `id: 42` döner.', en: '`POST /api/v1/bugs` runs — the server creates a NEW record, returns `id: 42`.' }, positions: { post: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Tests sekmesindeki script bu id\'yi YAKALAR ve `pm.environment.set(...)` ile kaydeder.', en: 'The script in the Tests tab CAPTURES this id and saves it with `pm.environment.set(...)`.' }, positions: { post: { x: 18, y: 35 }, set: { x: 55, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'post', to: 'set', color: '#0ea5e9' }] },
        { caption: { tr: '`{{bugId}}` değişkeni artık GERÇEK id (42) değerini taşıyor — bir sonraki request\'e HAZIR.', en: 'The `{{bugId}}` variable now carries the REAL id value (42) — READY for the next request.' }, positions: { set: { x: 18, y: 35 }, var: { x: 55, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'set', to: 'var', color: '#a78bfa' }] },
        { caption: { tr: '`GET /api/v1/bugs/{{bugId}}` çalıştırıldığında Postman bunu OTOMATİK `/api/v1/bugs/42`\'ye çevirir.', en: 'When `GET /api/v1/bugs/{{bugId}}` runs, Postman AUTOMATICALLY turns it into `/api/v1/bugs/42`.' }, positions: { var: { x: 18, y: 35 }, get: { x: 55, y: 50, scale: 1.2, pulse: true } }, beams: [{ from: 'var', to: 'get', color: '#22c55e' }] },
        { caption: { tr: 'Ders — İki request artık BİRBİRİNE BAĞLIDIR; bu, "önce oluştur, sonra referansla işlem yap" gerçek kullanıcı akışının BİREBİR testidir.', en: 'The lesson — the two requests are now LINKED; this is an EXACT test of the real user flow "create first, then act by reference".' }, positions: { get: { x: 30, y: 45 }, proof: { x: 62, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'get', to: 'proof', color: '#8b5cf6' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'İki Request\'i Zincirleme Sırası', en: 'The Order for Chaining Two Requests' },
      steps: [
        { id: 1, icon: '📤', label: { tr: 'POST çalıştır…', en: 'Run POST…' }, detail: { tr: 'Yeni bug oluştur, response\'taki id\'yi gözlemle.', en: 'Create a new bug, observe the id in the response.' } },
        { id: 2, icon: '💾', label: { tr: 'id\'yi kaydet…', en: 'Save the id…' }, detail: { tr: 'Tests sekmesinde pm.environment.set(\'bugId\', body.id) yaz.', en: 'Write pm.environment.set(\'bugId\', body.id) in the Tests tab.' } },
        { id: 3, icon: '📥', label: { tr: 'GET ile kullan…', en: 'Use it in GET…' }, detail: { tr: 'Sonraki request\'te {{bugId}} değişkenini kullanarak aynı kaydı sorgula.', en: 'In the next request, query the same record using the {{bugId}} variable.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-g4-order-01',
      question: { tr: 'Postman\'de bir test zinciri kurma sırasını diz.', en: 'Order the steps for building a test chain in Postman.' },
      items: [
        { id: '1', text: { tr: 'POST /api/v1/bugs request\'ini çalıştır', en: 'Run the POST /api/v1/bugs request' }, order: 1 },
        { id: '2', text: { tr: 'Tests sekmesinde response\'tan id\'yi oku', en: 'Read the id from the response in the Tests tab' }, order: 2 },
        { id: '3', text: { tr: 'pm.environment.set ile id\'yi değişkene yaz', en: 'Write the id into a variable with pm.environment.set' }, order: 3 },
        { id: '4', text: { tr: 'GET request\'inde {{bugId}} değişkenini kullan', en: 'Use the {{bugId}} variable in the GET request' }, order: 4 },
        { id: '5', text: { tr: 'GET request\'inin AYNI kaydı döndürdüğünü doğrula', en: 'Verify the GET request returns the SAME record' }, order: 5 },
      ],
      xpReward: 13,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-g4-test-chaining',
      id: 'api-g4-test-chaining',
      title: { tr: 'Kendin Dene: Eksik Zincirleme Satırını Ekle', en: 'Try It Yourself: Add the Missing Chaining Line' },
      starterCode: { tr: `pm.test('Bug olusturuldu', () => {
  pm.response.to.have.status(201)
  const body = pm.response.json()
  // BUG: id hicbir yere kaydedilmiyor, sonraki request bosta kalir
})`, en: `pm.test('Bug olusturuldu', () => {
  pm.response.to.have.status(201)
  const body = pm.response.json()
  // BUG: the id is not saved anywhere, so the next request is left empty
})` },
      solutionCode: `pm.test('Bug olusturuldu', () => {
  pm.response.to.have.status(201)
  const body = pm.response.json()
  pm.environment.set('bugId', body.id)
})`,
      hint: { tr: 'Response\'tan `id`\'yi okumak yetmez — bir sonraki request\'in `{{bugId}}` değişkenini kullanabilmesi için bu id\'yi `pm.environment.set(...)` ile KAYDETMEK gerekir.', en: 'Reading the `id` from the response is not enough — it must be SAVED with `pm.environment.set(...)` so the next request can use the `{{bugId}}` variable.' },
      successMessage: { tr: 'Doğru! Artık POST ile GET request\'i gerçek bir akışta zincirlendi.', en: 'Correct! Now the POST and GET requests are chained into a real flow.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Test zincirleme (pre-request/test script ile değişken taşıma) neden gerçekçi bir test yöntemidir?', en: 'Why is test chaining (carrying a variable via pre-request/test scripts) a realistic testing method?' },
      options: [
        { id: 'a', text: { tr: 'Gerçek kullanıcı akışını (önce oluştur, sonra referansla işlem yap) birebir simüle eder', en: 'It exactly simulates the real user flow (create first, then act by reference)' } },
        { id: 'b', text: { tr: 'Testleri daha hızlı çalıştırır', en: 'It makes tests run faster' } },
        { id: 'c', text: { tr: 'Sunucuyu otomatik yeniden başlatır', en: 'It automatically restarts the server' } },
        { id: 'd', text: { tr: 'Hiçbir gerçekçilik katmaz, sadece bir kısayoldur', en: 'It adds no realism, it is just a shortcut' } },
      ],
      correct: 'a',
      explanation: { tr: 'Gerçek bir kullanıcı önce bir kaynak oluşturur, sonra o kaynağa REFERANSLA (id ile) işlem yapar. Test zincirleme, POST\'un ürettiği id\'yi GET\'e taşıyarak bu gerçek akışı test eder — sabit/uydurma bir id ile test etmekten çok daha güvenilirdir.', en: 'A real user first creates a resource, then acts on it BY REFERENCE (with an id). Test chaining tests this real flow by carrying the id POST produced into GET — far more reliable than testing with a fixed/made-up id.' },
      retryQuestion: {
        question: { tr: '`pm.environment.set(\'bugId\', body.id)` çağrısı hangi sekmede yazılır?', en: 'In which tab is the `pm.environment.set(\'bugId\', body.id)` call written?' },
        options: [
          { id: 'a', text: { tr: 'Tests sekmesinde — response geldikten SONRA çalışır', en: 'In the Tests tab — it runs AFTER the response arrives' } },
          { id: 'b', text: { tr: 'Headers sekmesinde', en: 'In the Headers tab' } },
          { id: 'c', text: { tr: 'Body sekmesinde', en: 'In the Body tab' } },
          { id: 'd', text: { tr: 'Params sekmesinde', en: 'In the Params tab' } },
        ],
        correct: 'a',
        explanation: { tr: '`Tests` sekmesindeki script, request\'in YANITI geldikten sonra çalışır — bu yüzden response\'tan `body.id`\'yi okuyup bir sonraki request\'e taşımak için doğru yer burasıdır.', en: 'The script in the `Tests` tab runs after the request\'s RESPONSE arrives — this is why it is the right place to read `body.id` from the response and carry it to the next request.' },
      },
    },
  ],
}

const G5 = {
  title: { tr: '🚫 G5 · Negatif Test Setleri', en: '🚫 G5 · Negative Test Sets' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🚫',
      content: {
        tr: 'Negatif test setleri, F4/F6\'da şemadan TÜRETTİĞİN checklist\'in Postman\'de HAYATA GEÇİRİLMESİDİR: her `required`/`type`/`enum` ihlali artık bir Postman klasöründe AYRI bir request\'tir. Java\'da bunun karşılığı, bir metodun her geçersiz girdi kombinasyonu için AYRI bir `@Test` yazmaktır (`@ParameterizedTest` ile bile). Peki neden bunları AYRI request\'ler olarak tutuyoruz, tek bir request\'te birleştirmiyoruz? Çünkü her negatif senaryo AYRI bir kanıt üretmelidir — biri başarısız olduğunda HANGİSİNİN başarısız olduğu belirsiz kalmamalıdır; birleştirilmiş bir request "bir şey yanlış" der, ayrı request\'ler "TAM OLARAK bu kural ihlal edildi" der. **Derin negatif test tasarımı için → `/postman` sayfasına bak.**',
        en: 'Negative test sets are F4/F6\'s schema-DERIVED checklist BROUGHT TO LIFE in Postman: every `required`/`type`/`enum` violation is now a SEPARATE request in a Postman folder. The Java equivalent is writing a SEPARATE `@Test` for every invalid input combination of a method (even with `@ParameterizedTest`). So why keep these as SEPARATE requests instead of merging them into one? Because every negative scenario should produce SEPARATE evidence — when one fails, it should not stay unclear WHICH one failed; a merged request says "something is wrong", separate requests say "EXACTLY this rule was violated". **For deep negative test design → see the `/postman` page.**',
      },
    },
    {
      type: 'code',
      language: 'javascript',
      code: {
        tr: `// Klasor: "Negatif Testler"
// Request 1: POST /bugs { severity: "HIGH" } (title EKSIK)
pm.test('title eksikken 400 doner', () => {
  pm.response.to.have.status(400)
})

// Request 2: POST /bugs { title: "x", severity: "URGENT" } (enum DISI)
pm.test('enum disi severity 400 doner', () => {
  pm.response.to.have.status(400)
})`,
        en: `// Folder: "Negative Tests"
// Request 1: POST /bugs { severity: "HIGH" } (title MISSING)
pm.test('400 when title is missing', () => {
  pm.response.to.have.status(400)
})

// Request 2: POST /bugs { title: "x", severity: "URGENT" } (out of enum)
pm.test('400 for out-of-enum severity', () => {
  pm.response.to.have.status(400)
})`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-g5-negative-film',
      title: { tr: '🎬 Bir Şema Kısıtından Bir Postman Klasörüne', en: '🎬 From a Schema Constraint to a Postman Folder' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'schema', emoji: '📐', label: { tr: 'F6: şema checklist\'i', en: 'F6: schema checklist' }, color: '#f59e0b' },
        { id: 'folder', emoji: '🚫', label: { tr: '"Negatif Testler" klasörü', en: '"Negative Tests" folder' }, color: '#0ea5e9' },
        { id: 'proof', emoji: '📋', label: { tr: 'Her ihlal için ayrı kanıt', en: 'Separate evidence per violation' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'F6\'da şemadan türetilen checklist elimizde: eksik title, enum dışı severity, geçersiz email...', en: 'We have the checklist derived from the schema in F6: missing title, out-of-enum severity, invalid email...' }, positions: { schema: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Her checklist maddesi Postman\'de AYRI bir request/klasör öğesi olur — "Negatif Testler" klasörü doğar.', en: 'Each checklist item becomes a SEPARATE request/folder item in Postman — the "Negative Tests" folder is born.' }, positions: { schema: { x: 20, y: 40 }, folder: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'schema', to: 'folder', color: '#0ea5e9' }] },
        { caption: { tr: 'Koşum sonrası hangi kuralın ihlal edildiğinde sunucunun HATA VERDİĞİ, hangisinde SESSİZCE KABUL ETTİĞİ netleşir.', en: 'After the run it becomes clear which rule violation the server ERRORS on, and which it SILENTLY ACCEPTS.' }, positions: { folder: { x: 20, y: 40 }, proof: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'folder', to: 'proof', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Şemadan Negatif Test Klasörüne', en: 'From Schema to Negative Test Folder' },
      steps: [
        { id: 1, icon: '📐', label: { tr: 'Checklist\'i al…', en: 'Take the checklist…' }, detail: { tr: 'F6\'da şemadan türetilen negatif senaryo listesini kullan.', en: 'Use the negative scenario list derived from the schema in F6.' } },
        { id: 2, icon: '🚫', label: { tr: 'Her madde bir request olsun…', en: 'Each item becomes a request…' }, detail: { tr: 'Her ihlal için ayrı bir Postman request\'i oluştur, ilgili pm.test\'i yaz.', en: 'Create a separate Postman request for each violation, write the relevant pm.test.' } },
        { id: 3, icon: '📋', label: { tr: 'Sonuçları karşılaştır…', en: 'Compare the results…' }, detail: { tr: 'Hangi kuralın gerçekten uygulandığını, hangisinin sessizce geçtiğini gör.', en: 'See which rule is really enforced, and which silently passes.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-g5-order-01',
      question: { tr: 'Bir negatif test setini kurma sırasını diz.', en: 'Order the steps for building a negative test set.' },
      items: [
        { id: '1', text: { tr: 'F6\'daki şema checklist\'ini gözden geçir', en: 'Review the schema checklist from F6' }, order: 1 },
        { id: '2', text: { tr: '"Negatif Testler" klasörünü oluştur', en: 'Create a "Negative Tests" folder' }, order: 2 },
        { id: '3', text: { tr: 'Her ihlal için ayrı bir request ekle', en: 'Add a separate request for each violation' }, order: 3 },
        { id: '4', text: { tr: 'Her request\'e "400 beklenir" assertion\'ı yaz', en: 'Write an "expect 400" assertion for each request' }, order: 4 },
        { id: '5', text: { tr: 'Koşum sonrası hangi kuralın uygulanmadığını raporla', en: 'Report which rule was not enforced after the run' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-g5-negative-tests',
      id: 'api-g5-negative-tests',
      title: { tr: 'Kendin Dene: Eksik Negatif Senaryoyu Ekle', en: 'Try It Yourself: Add the Missing Negative Scenario' },
      starterCode: `// Yazilan request\'ler: title eksik, severity enum disi
// TODO: F4'teki "reporter format" kisitindan hangi request EKSIK?
Eksik request: ???`,
      solutionCode: { tr: `// reporter alaninin email formatinda OLMADIGI bir request eksik
Eksik request: POST /bugs { title: "x", severity: "HIGH", reporter: "gecersiz-string" } -> 400 beklenir`, en: `// a request where the reporter field is NOT in email format is missing
Eksik request: POST /bugs { title: "x", severity: "HIGH", reporter: "gecersiz-string" } -> 400 beklenir` },
      hint: { tr: 'F4\'te `reporter` alanının `format: email` kısıtı olduğunu görmüştün. Bu kısıtın da diğerleri gibi (required, enum) AYRI bir negatif test senaryosu olması gerekir.', en: 'You saw in F4 that the `reporter` field has a `format: email` constraint. This constraint, like the others (required, enum), needs its own SEPARATE negative test scenario.' },
      successMessage: { tr: 'Doğru! Şemadaki her kısıt, negatif test setinde ayrı bir kanıt satırı olmalı.', en: 'Correct! Every constraint in the schema deserves its own evidence line in the negative test set.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Negatif test senaryolarını TEK bir request\'te birleştirmek yerine AYRI request\'ler olarak tutmanın avantajı nedir?', en: 'What is the advantage of keeping negative test scenarios as SEPARATE requests instead of merging them into ONE?' },
      options: [
        { id: 'a', text: { tr: 'Bir request başarısız olduğunda, TAM OLARAK hangi kuralın ihlal edildiği belirsiz kalmaz', en: 'When a request fails, it stays clear EXACTLY which rule was violated' } },
        { id: 'b', text: { tr: 'Postman daha hızlı çalışır', en: 'Postman runs faster' } },
        { id: 'c', text: { tr: 'Daha az disk alanı kaplar', en: 'It takes up less disk space' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: 'Birleştirilmiş bir request başarısız olduğunda "bir şey yanlış" der ama HANGİ kuralın ihlal edildiği net değildir. Ayrı request\'ler her biri TEK bir kuralı test eder — başarısızlık doğrudan o kurala işaret eder.', en: 'A merged request failing says "something is wrong" but it is not clear WHICH rule was violated. Separate requests each test ONE rule — a failure points directly to that rule.' },
      retryQuestion: {
        question: { tr: 'Negatif test setlerinin kaynağı nereden gelir?', en: 'Where do negative test sets come from?' },
        options: [
          { id: 'a', text: { tr: 'F4/F6\'da OpenAPI şemasından sistematik olarak türetilen checklist\'ten', en: 'From the checklist systematically derived from the OpenAPI schema in F4/F6' } },
          { id: 'b', text: { tr: 'Testerın rastgele aklına gelen fikirlerden', en: 'From whatever ideas randomly come to the tester\'s mind' } },
          { id: 'c', text: { tr: 'Sadece UI\'da görülen hatalardan', en: 'Only from errors seen in the UI' } },
          { id: 'd', text: { tr: 'Rastgele sayı üreticisinden', en: 'From a random number generator' } },
        ],
        correct: 'a',
        explanation: { tr: 'GRUP F\'te öğrendiğin gibi, bir şemadaki her `required`/`type`/`enum`/`format` kısıtı sistematik olarak bir negatif senaryo doğurur; G5 bu checklist\'i Postman request\'lerine dönüştürür.', en: 'As you learned in GROUP F, every `required`/`type`/`enum`/`format` constraint in a schema systematically births a negative scenario; G5 turns this checklist into Postman requests.' },
      },
    },
  ],
}

const G6 = {
  title: { tr: '⚡ G6 · Collection Runner + Newman ile CI', en: '⚡ G6 · Collection Runner + Newman in CI' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '⚡',
      content: {
        tr: 'Newman, bir Postman koleksiyonunu **komut satırından çalıştıran** bir motordur — Java\'da `mvn test`in bir Maven projesindeki TÜM testleri komut satırından koşturmasıyla birebir aynı rolü oynar. `Collection Runner`, koleksiyonu Postman ARAYÜZÜNDEN manuel çalıştırırken, `newman run collection.json` AYNI koleksiyonu CI sunucusunda (GitHub Actions) İNSAN olmadan çalıştırır. Peki neden bu adım "son" adımdır — G1-G5\'i elle Postman\'de kurduktan sonra neden CI\'ya taşıyoruz? Çünkü elle koşulan bir test koleksiyonu, unutulabilir/atlanabilir; CI\'ya bağlanan bir koleksiyon HER PUSH\'ta OTOMATİK çalışır — GRUP B-D\'de yazdığın kodda bir regresyon olduğunda, kimse "test etmeyi unutmadan önce" bunu YAKALAR. **Derin Newman/CI kurulumu için → `/postman` sayfasına bak.**',
        en: 'Newman is an engine that **runs a Postman collection from the command line** — it plays the exact same role in Postman as `mvn test` running ALL tests in a Maven project from the command line. `Collection Runner` runs the collection manually from the Postman INTERFACE, while `newman run collection.json` runs the SAME collection on a CI server (GitHub Actions) WITHOUT a human. So why is this the "final" step — why move to CI after setting up G1-G5 by hand in Postman? Because a manually run test collection can be forgotten/skipped; a collection wired into CI runs AUTOMATICALLY on EVERY push — when a regression appears in the code you wrote in GROUP B-D, it gets CAUGHT before anyone "forgets to test". **For a deep Newman/CI setup guide → see the `/postman` page.**',
      },
    },
    {
      type: 'code',
      language: 'yaml',
      code: {
        tr: `# .github/workflows/api-tests.yml
name: Bug Tracker API Testleri
on: [push]
jobs:
  newman:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g newman
      # TODO: koleksiyon ve environment dosyasi PUSH'ta otomatik calisir
      - run: newman run bug-tracker.postman_collection.json -e local.postman_environment.json`,
        en: `# .github/workflows/api-tests.yml
name: Bug Tracker API Tests
on: [push]
jobs:
  newman:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g newman
      # TODO: the collection and environment file run automatically on PUSH
      - run: newman run bug-tracker.postman_collection.json -e local.postman_environment.json`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-g6-newman-ci-film',
      title: { tr: '🎬 Elle Koşumdan CI\'da Otomatik Koşuma', en: '🎬 From a Manual Run to an Automatic CI Run' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'manual', emoji: '🖱️', label: { tr: 'Elle "Run Collection"', en: 'Manual "Run Collection"' }, color: '#94a3b8' },
        { id: 'newman', emoji: '⚡', label: { tr: 'newman run ...', en: 'newman run ...' }, color: '#0ea5e9' },
        { id: 'push', emoji: '📤', label: { tr: 'Her push tetikler', en: 'Every push triggers it' }, color: '#f59e0b' },
        { id: 'gate', emoji: '🚧', label: { tr: 'Regresyon yakalanır', en: 'Regression is caught' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Tester koleksiyonu Postman\'de elle "Run Collection"a basarak çalıştırıyor — unutulabilir bir adım.', en: 'The tester runs the collection manually by pressing "Run Collection" in Postman — a step that can be forgotten.' }, positions: { manual: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Aynı koleksiyon `newman run` komutuyla komut satırından ÇALIŞABİLİR hale gelir.', en: 'The same collection becomes RUNNABLE from the command line with `newman run`.' }, positions: { manual: { x: 20, y: 40 }, newman: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'manual', to: 'newman', color: '#0ea5e9' }] },
        { caption: { tr: 'Bu komut bir CI pipeline\'ına (GitHub Actions) bağlanır — artık HER push otomatik tetikler.', en: 'This command is wired into a CI pipeline (GitHub Actions) — now EVERY push triggers it automatically.' }, positions: { newman: { x: 20, y: 40 }, push: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'newman', to: 'push', color: '#f59e0b' }] },
        { caption: { tr: 'Ders — Bir geliştirici GRUP B-D\'deki koda yanlışlıkla bir regresyon sokarsa, bunu bir insan değil CI YAKALAR.', en: 'The lesson — if a developer accidentally introduces a regression into the code from GROUP B-D, it is CI that CATCHES it, not a human.' }, positions: { push: { x: 30, y: 45 }, gate: { x: 62, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'push', to: 'gate', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Koleksiyondan CI\'a Taşıma Sırası', en: 'The Order for Moving a Collection into CI' },
      steps: [
        { id: 1, icon: '📦', label: { tr: 'Koleksiyon/environment\'ı dışa aktar…', en: 'Export the collection/environment…' }, detail: { tr: 'Postman\'den .json dosyaları olarak indir, repoya ekle.', en: 'Download as .json files from Postman, add them to the repo.' } },
        { id: 2, icon: '⚡', label: { tr: 'Newman ile test et…', en: 'Test with Newman…' }, detail: { tr: 'newman run collection.json -e environment.json komutunu yerelde doğrula.', en: 'Verify the newman run collection.json -e environment.json command locally.' } },
        { id: 3, icon: '🚧', label: { tr: 'CI\'a bağla…', en: 'Wire into CI…' }, detail: { tr: 'Aynı komutu bir GitHub Actions workflow\'una ekle, her push\'ta çalışsın.', en: 'Add the same command to a GitHub Actions workflow, run it on every push.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-g6-order-01',
      question: { tr: 'Bir koleksiyonu CI\'a bağlama sürecini sırala.', en: 'Order the process for wiring a collection into CI.' },
      items: [
        { id: '1', text: { tr: 'Koleksiyonu ve environment\'ı .json olarak dışa aktar', en: 'Export the collection and environment as .json' }, order: 1 },
        { id: '2', text: { tr: 'newman\'i kur, yerelde çalıştır', en: 'Install newman, run it locally' }, order: 2 },
        { id: '3', text: { tr: 'GitHub Actions workflow dosyasını yaz', en: 'Write the GitHub Actions workflow file' }, order: 3 },
        { id: '4', text: { tr: 'newman run komutunu workflow\'a ekle', en: 'Add the newman run command to the workflow' }, order: 4 },
        { id: '5', text: { tr: 'Push at, CI\'ın otomatik çalıştığını doğrula', en: 'Push, verify CI runs automatically' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-g6-newman-ci',
      id: 'api-g6-newman-ci',
      title: { tr: 'Kendin Dene: Eksik Newman Komutunu Tamamla', en: 'Try It Yourself: Complete the Missing Newman Command' },
      starterCode: { tr: `# newman kuruldu ama koleksiyonu CALISTIRAN komut eksik
npm install -g newman
# TODO: bug-tracker.postman_collection.json'i local environment ile calistir`, en: `# newman is installed but the command that RUNS the collection is missing
npm install -g newman
# TODO: run bug-tracker.postman_collection.json with the local environment` },
      solutionCode: `npm install -g newman
newman run bug-tracker.postman_collection.json -e local.postman_environment.json`,
      hint: { tr: '`newman run <collection.json>` koleksiyonu çalıştırır; `-e <environment.json>` bayrağı hangi environment\'ın (baseUrl gibi değişkenlerin) kullanılacağını belirtir.', en: '`newman run <collection.json>` runs the collection; the `-e <environment.json>` flag specifies which environment (variables like baseUrl) to use.' },
      successMessage: { tr: 'Doğru! Artık bu komut CI\'da her push\'ta koleksiyonu otomatik çalıştırabilir.', en: 'Correct! Now this command can automatically run the collection on every push in CI.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir Postman koleksiyonunu Newman ile CI\'a bağlamanın en büyük faydası nedir?', en: 'What is the biggest benefit of wiring a Postman collection into CI with Newman?' },
      options: [
        { id: 'a', text: { tr: 'Testler her push\'ta OTOMATİK çalışır — elle koşmayı unutma riski ortadan kalkar', en: 'Tests run AUTOMATICALLY on every push — the risk of forgetting to run them manually disappears' } },
        { id: 'b', text: { tr: 'Postman arayüzüne artık hiç gerek kalmaz', en: 'The Postman interface is no longer needed at all' } },
        { id: 'c', text: { tr: 'Sunucu performansı otomatik artar', en: 'Server performance automatically improves' } },
        { id: 'd', text: { tr: 'Veritabanı otomatik yedeklenir', en: 'The database is automatically backed up' } },
      ],
      correct: 'a',
      explanation: { tr: 'Elle çalıştırılan bir koleksiyon insan hafızasına bağımlıdır — unutulabilir. Newman ile CI\'a bağlanan bir koleksiyon HER push\'ta otomatik çalışır, bir regresyonu insan onu test etmeyi hatırlamadan YAKALAR.', en: 'A manually run collection depends on human memory — it can be forgotten. A collection wired into CI with Newman runs automatically on EVERY push, catching a regression before a human remembers to test it.' },
      retryQuestion: {
        question: { tr: 'Newman\'in Java dünyasındaki en yakın karşılığı nedir?', en: 'What is Newman\'s closest counterpart in the Java world?' },
        options: [
          { id: 'a', text: { tr: 'mvn test — bir projedeki tüm testleri komut satırından/CI\'da çalıştıran araç', en: 'mvn test — the tool that runs all tests in a project from the command line/in CI' } },
          { id: 'b', text: { tr: 'pom.xml dosyası', en: 'The pom.xml file' } },
          { id: 'c', text: { tr: 'Bir @Entity sınıfı', en: 'An @Entity class' } },
          { id: 'd', text: { tr: 'Spring Boot starter\'ı', en: 'A Spring Boot starter' } },
        ],
        correct: 'a',
        explanation: { tr: 'Tıpkı `mvn test`in bir Maven projesindeki tüm testleri insan müdahalesi olmadan komut satırından/CI\'da çalıştırması gibi, Newman de bir Postman koleksiyonunu aynı şekilde komut satırından/CI\'da çalıştırır.', en: 'Just as `mvn test` runs all tests in a Maven project from the command line/in CI without human intervention, Newman runs a Postman collection the same way from the command line/in CI.' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP H — REST Assured ile Otomasyon (Java) (ÇAKIŞMA KURALI: derin anlatım
// → /rest-assured'e link, burada "/api/v1/bugs'u şimdi bununla test edelim")
// ═══════════════════════════════════════════════════════════════════════════

const H1 = {
  title: { tr: '🎬 H1 · Bağımlılıklar ve İlk Test: given/when/then', en: '🎬 H1 · Dependencies and First Test: given/when/then' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🎬',
      content: {
        tr: 'REST Assured\'un `given().when().then()` zinciri, çıplak `HttpClient` + JUnit `assert` kodunu bir **cümleye** dönüştürür: "GİVEN şu ön koşullar VARKEN, WHEN şu request\'i ATTIĞIMDA, THEN şunu BEKLERİM" — İngilizce okunduğunda bile anlaşılır. Java\'da `HttpClient` ile aynı testi yazmak onlarca satır boilerplate (bağlantı kurma, header ekleme, gövdeyi ayrıştırma) gerektirirken, REST Assured bunu ÜÇ okunabilir satıra indirger — Bean Validation\'ın `@Valid` ile validation boilerplate\'ini yok etmesine benzer bir sadeleştirme. Peki bu "cümle" yapısı neden sadece sözdizimsel bir şeker değil? Çünkü bir test raporu okuyan bir PAYDAŞ (yönetici, ürün sahibi), `given/when/then` yapısındaki bir test ADINI okuyarak SENARYOYU anlayabilir — çıplak bir `assertEquals` satırı bunu sağlamaz. **Derin REST Assured rehberi için → `/rest-assured` sayfasına bak; burada sadece Bug Tracker\'ı REST Assured ile test etmeye başlıyoruz.**',
        en: 'REST Assured\'s `given().when().then()` chain turns bare `HttpClient` + JUnit `assert` code into a **sentence**: "GIVEN these preconditions, WHEN I make this request, THEN I expect this" — understandable even read as plain English. Writing the same test with `HttpClient` in Java takes dozens of boilerplate lines (connecting, adding headers, parsing the body), while REST Assured reduces it to THREE readable lines — a simplification similar to how `@Valid` removes Bean Validation boilerplate. So why is this "sentence" structure more than syntactic sugar? Because a STAKEHOLDER (a manager, a product owner) reading a test report can understand the SCENARIO just by reading a `given/when/then`-structured test name — a bare `assertEquals` line does not provide that. **For a deep REST Assured guide → see the `/rest-assured` page; here we are just starting to test the Bug Tracker with REST Assured.**',
      },
    },
    {
      type: 'code',
      language: 'xml',
      code: {
        tr: `<!-- pom.xml -->
<dependency>
  <groupId>io.rest-assured</groupId>
  <artifactId>rest-assured</artifactId>
  <version>5.4.0</version>
  <scope>test</scope>
</dependency>`,
        en: `<!-- pom.xml -->
<dependency>
  <groupId>io.rest-assured</groupId>
  <artifactId>rest-assured</artifactId>
  <version>5.4.0</version>
  <scope>test</scope>
</dependency>`,
      },
    },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

class BugsApiTest {
    @Test
    void bugListesiBasariyla200Doner() {
        given()
            .baseUri("http://localhost:3000")
        .when()
            .get("/api/v1/bugs")
        .then()
            // TODO: sadece status degil govdeyi de dogrula
            .statusCode(200);
    }
}`,
        en: `import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

class BugsApiTest {
    @Test
    void bugListReturns200Successfully() {
        given()
            .baseUri("http://localhost:3000")
        .when()
            .get("/api/v1/bugs")
        .then()
            // TODO: verify the body too, not just the status
            .statusCode(200);
    }
}`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-h1-given-when-then-film',
      title: { tr: '🎬 given / when / then', en: '🎬 given / when / then' },
      xpReward: 14,
      sceneDurationMs: 3400,
      stageHeight: 270,
      actors: [
        { id: 'given', emoji: '⚙️', label: { tr: 'GIVEN: ön koşullar', en: 'GIVEN: preconditions' }, color: '#f59e0b' },
        { id: 'when', emoji: '📤', label: { tr: 'WHEN: request\'i at', en: 'WHEN: make the request' }, color: '#0ea5e9' },
        { id: 'then', emoji: '✅', label: { tr: 'THEN: beklentiyi doğrula', en: 'THEN: verify the expectation' }, color: '#22c55e' },
        { id: 'stakeholder', emoji: '👔', label: { tr: 'Paydaş test adını okur', en: 'Stakeholder reads the test name' }, color: '#8b5cf6' },
      ],
      scenes: [
        { caption: { tr: '`given()` bloğu ön koşulları kurar: `baseUri`, header\'lar, auth token — sahnenin dekoru hazırlanır.', en: 'The `given()` block sets up preconditions: `baseUri`, headers, auth token — the stage\'s scenery is set.' }, positions: { given: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: '`when()` bloğu GERÇEK eylemi tanımlar: `get("/api/v1/bugs")` — sahnede olay gerçekleşir.', en: 'The `when()` block defines the REAL action: `get("/api/v1/bugs")` — the event happens on stage.' }, positions: { given: { x: 18, y: 35 }, when: { x: 55, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'given', to: 'when', color: '#0ea5e9' }] },
        { caption: { tr: '`then()` bloğu SONUCU denetler: `statusCode(200)`, `body(...)` — beklenti gerçekle karşılaştırılır.', en: 'The `then()` block checks the RESULT: `statusCode(200)`, `body(...)` — expectation meets reality.' }, positions: { when: { x: 18, y: 35 }, then: { x: 55, y: 50, scale: 1.2, pulse: true } }, beams: [{ from: 'when', to: 'then', color: '#22c55e' }] },
        { caption: { tr: 'Ders — Bu üçlü sadece kod değil, İNGİLİZCE bir cümledir; kod OKUNMADAN bile testin ne yaptığı anlaşılır, teknik olmayan bir paydaş bile senaryoyu takip edebilir.', en: 'The lesson — this trio is not just code, it is an ENGLISH sentence; the test\'s intent is understood even WITHOUT reading the code, even a non-technical stakeholder can follow the scenario.' }, positions: { then: { x: 30, y: 45 }, stakeholder: { x: 62, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'then', to: 'stakeholder', color: '#8b5cf6' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'İlk REST Assured Testini Yazma Sırası', en: 'The Order for Writing the First REST Assured Test' },
      steps: [
        { id: 1, icon: '📦', label: { tr: 'Bağımlılığı ekle…', en: 'Add the dependency…' }, detail: { tr: 'rest-assured\'ı pom.xml\'e test scope\'unda ekle.', en: 'Add rest-assured to pom.xml in test scope.' } },
        { id: 2, icon: '⚙️', label: { tr: 'given() ile kur…', en: 'Set up with given()…' }, detail: { tr: 'baseUri gibi ön koşulları tanımla.', en: 'Define preconditions like baseUri.' } },
        { id: 3, icon: '✅', label: { tr: 'when/then ile doğrula…', en: 'Verify with when/then…' }, detail: { tr: 'Request\'i at, statusCode ve gövdeyi kontrol et.', en: 'Make the request, check statusCode and the body.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-h1-order-01',
      question: { tr: 'given/when/then zincirinin doğru sırasını diz.', en: 'Order the given/when/then chain correctly.' },
      items: [
        { id: '1', text: { tr: 'given() — ön koşulları (baseUri, header) kur', en: 'given() — set up preconditions (baseUri, headers)' }, order: 1 },
        { id: '2', text: { tr: 'when() — gerçek request\'i tanımla (get/post)', en: 'when() — define the real request (get/post)' }, order: 2 },
        { id: '3', text: { tr: 'then() — beklenen sonucu doğrula (statusCode/body)', en: 'then() — verify the expected result (statusCode/body)' }, order: 3 },
        { id: '4', text: { tr: 'Testi çalıştır', en: 'Run the test' }, order: 4 },
        { id: '5', text: { tr: 'Test raporunu oku', en: 'Read the test report' }, order: 5 },
      ],
      xpReward: 12,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-h1-given-when-then',
      id: 'api-h1-given-when-then',
      title: { tr: 'Kendin Dene: Gövde Doğrulamasını Ekle', en: 'Try It Yourself: Add the Body Verification' },
      starterCode: { tr: `given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs")
.then()
    .statusCode(200);
    // TODO: govdenin bir dizi oldugunu da dogrula`, en: `given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs")
.then()
    .statusCode(200);
    // TODO: also assert that the body is an array` },
      solutionCode: `given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs")
.then()
    .statusCode(200)
    .body("size()", greaterThanOrEqualTo(0));`,
      hint: { tr: 'Sadece `statusCode(200)` kontrolü, gövdenin GERÇEKTEN beklenen şekilde olduğunu KANITLAMAZ. `.body(...)` ile Hamcrest matcher\'ları (`greaterThanOrEqualTo` gibi) ekleyerek gövdeyi de doğrula.', en: 'Checking only `statusCode(200)` does not PROVE the body is REALLY in the expected shape. Add Hamcrest matchers (like `greaterThanOrEqualTo`) with `.body(...)` to verify the body too.' },
      successMessage: { tr: 'Doğru! Artık sadece status değil, gövdenin şekli de doğrulanıyor.', en: 'Correct! Now not just the status, but the body\'s shape is verified too.' },
    },
    {
      type: 'quiz',
      question: { tr: '`given().when().then()` yapısının çıplak `HttpClient` koduna göre en büyük avantajı nedir?', en: 'What is the biggest advantage of `given().when().then()` over bare `HttpClient` code?' },
      options: [
        { id: 'a', text: { tr: 'Testi okunabilir bir cümleye dönüştürür — teknik olmayan biri bile senaryoyu anlayabilir', en: 'It turns the test into a readable sentence — even a non-technical person can understand the scenario' } },
        { id: 'b', text: { tr: 'Sunucuyu otomatik başlatır', en: 'It automatically starts the server' } },
        { id: 'c', text: { tr: 'Veritabanı bağlantısını yönetir', en: 'It manages the database connection' } },
        { id: 'd', text: { tr: 'Testleri daha hızlı çalıştırır', en: 'It makes tests run faster' } },
      ],
      correct: 'a',
      explanation: { tr: 'Çıplak `HttpClient` kodu onlarca satır bağlantı/ayrıştırma boilerplate\'i içerir ve okuması zordur. `given/when/then` bunu üç okunabilir bölüme ayırır — test raporu bir İngilizce cümle gibi okunur.', en: 'Bare `HttpClient` code contains dozens of lines of connection/parsing boilerplate and is hard to read. `given/when/then` splits it into three readable sections — the test report reads like an English sentence.' },
      retryQuestion: {
        question: { tr: '`then()` bloğunun rolü nedir?', en: 'What is the role of the `then()` block?' },
        options: [
          { id: 'a', text: { tr: 'Request\'in sonucunu (status, gövde, header) beklenenle karşılaştırıp doğrular', en: 'It verifies the request\'s result (status, body, headers) against expectations' } },
          { id: 'b', text: { tr: 'Request\'i gönderir', en: 'It sends the request' } },
          { id: 'c', text: { tr: 'Bağlantı bilgilerini tanımlar', en: 'It defines connection info' } },
          { id: 'd', text: { tr: 'Veritabanını sıfırlar', en: 'It resets the database' } },
        ],
        correct: 'a',
        explanation: { tr: '`given()` hazırlar, `when()` eylemi yapar, `then()` SONUCU denetler — tıpkı bir JUnit testindeki `assert` satırları gibi, ama okunabilir bir zincirde.', en: '`given()` prepares, `when()` performs the action, `then()` checks the RESULT — just like `assert` lines in a JUnit test, but in a readable chain.' },
      },
    },
  ],
}

const H2 = {
  title: { tr: '✔️ H2 · Response Doğrulama: statusCode, jsonPath', en: '✔️ H2 · Response Validation: statusCode, jsonPath' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '✔️',
      content: {
        tr: '`jsonPath()`, bir JSON gövdesinde belirli bir alana GİTMEK için bir **harita koordinatı** gibidir — `"title"` demek yeterlidir, elle `JSONObject` ayrıştırma yazmana GEREK KALMAZ. Hamcrest matcher\'ları (`hasItem`, `equalTo`, `hasSize`) ise bu değeri KARŞILAŞTIRAN cümlelerdir. Java\'da bunun karşılığı, elle `ObjectMapper` ile bir `Map<String,Object>`\'e dönüştürüp iç içe `get()` çağırmaktır — çalışır ama KIRILGANdır (bir alan adı yanlış yazılırsa derleme zamanında YAKALANMAZ). `jsonPath()` bunu TEK satıra indirger. **Derin jsonPath/Hamcrest rehberi için → `/rest-assured` sayfasına bak.**',
        en: '`jsonPath()` is like a **map coordinate** for GOING to a specific field in a JSON body — saying `"title"` is enough, you do NOT need to write manual `JSONObject` parsing. Hamcrest matchers (`hasItem`, `equalTo`, `hasSize`) are the sentences that COMPARE this value. The Java equivalent is manually converting to a `Map<String,Object>` with `ObjectMapper` and calling nested `get()`s — it works but is FRAGILE (a misspelled field name is NOT caught at compile time). `jsonPath()` reduces this to ONE line. **For a deep jsonPath/Hamcrest guide → see the `/rest-assured` page.**',
      },
    },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs/42")
.then()
    .statusCode(200)
    .body("title", equalTo("Login butonu donuyor"))
    .body("severity", oneOf("LOW", "MEDIUM", "HIGH", "CRITICAL"))
    // TODO: reporter alaninin e-posta formatinda oldugunu dogrula
    ;`,
        en: `given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs/42")
.then()
    .statusCode(200)
    .body("title", equalTo("Login button freezes"))
    .body("severity", oneOf("LOW", "MEDIUM", "HIGH", "CRITICAL"))
    // TODO: verify the reporter field is in email format
    ;`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-h2-jsonpath-film',
      title: { tr: '🎬 Elle Ayrıştırmadan Tek Satır Koordinata', en: '🎬 From Manual Parsing to a One-Line Coordinate' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'manual', emoji: '🗺️', label: { tr: 'Elle Map/get() zinciri', en: 'Manual Map/get() chain' }, color: '#ef4444' },
        { id: 'jsonpath', emoji: '📍', label: { tr: 'jsonPath("title")', en: 'jsonPath("title")' }, color: '#0ea5e9' },
        { id: 'matcher', emoji: '⚖️', label: { tr: 'equalTo(...) ile karşılaştır', en: 'compare with equalTo(...)' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Elle yaklaşım: ObjectMapper ile Map\'e çevir, iç içe get("bugs").get(0).get("title") yaz — kırılgan.', en: 'Manual approach: convert to a Map with ObjectMapper, write nested get("bugs").get(0).get("title") — fragile.' }, positions: { manual: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: '`jsonPath("title")` aynı alana TEK satırda, okunabilir bir koordinatla gider.', en: '`jsonPath("title")` reaches the same field in ONE readable-coordinate line.' }, positions: { manual: { x: 20, y: 40 }, jsonpath: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'manual', to: 'jsonpath', color: '#0ea5e9' }] },
        { caption: { tr: 'Hamcrest `equalTo(...)`/`hasItem(...)` ile değeri karşılaştırır — okunabilir bir doğrulama cümlesi tamamlanır.', en: 'Hamcrest `equalTo(...)`/`hasItem(...)` compares the value — a readable verification sentence completes.' }, positions: { jsonpath: { x: 20, y: 40 }, matcher: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'jsonpath', to: 'matcher', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'jsonPath ile Doğrulama Sırası', en: 'The Order for Verifying with jsonPath' },
      steps: [
        { id: 1, icon: '📍', label: { tr: 'Alanın yolunu belirle…', en: 'Identify the field\'s path…' }, detail: { tr: 'JSON gövdesindeki alan adını (title, severity) not al.', en: 'Note the field name (title, severity) in the JSON body.' } },
        { id: 2, icon: '⚖️', label: { tr: 'Matcher seç…', en: 'Choose a matcher…' }, detail: { tr: 'equalTo, hasItem, oneOf gibi Hamcrest matcher\'larından uygun olanı seç.', en: 'Pick the right Hamcrest matcher, like equalTo, hasItem, oneOf.' } },
        { id: 3, icon: '✅', label: { tr: '.body(...) ile bağla…', en: 'Bind with .body(...)…' }, detail: { tr: 'then() zincirine .body("alan", matcher) ekleyerek doğrulamayı tamamla.', en: 'Complete the verification by adding .body("field", matcher) to the then() chain.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-h2-order-01',
      question: { tr: 'jsonPath ile bir alanı doğrulama sürecini sırala.', en: 'Order the process for verifying a field with jsonPath.' },
      items: [
        { id: '1', text: { tr: 'Request\'i gönder, response\'u al', en: 'Send the request, get the response' }, order: 1 },
        { id: '2', text: { tr: 'Doğrulanacak alanın adını belirle', en: 'Identify the field name to verify' }, order: 2 },
        { id: '3', text: { tr: 'Uygun Hamcrest matcher\'ını seç', en: 'Choose the appropriate Hamcrest matcher' }, order: 3 },
        { id: '4', text: { tr: '.body("alan", matcher) ile bağla', en: 'Bind with .body("field", matcher)' }, order: 4 },
        { id: '5', text: { tr: 'Testi çalıştır, sonucu doğrula', en: 'Run the test, verify the result' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-h2-response-verification',
      id: 'api-h2-response-verification',
      title: { tr: 'Kendin Dene: Eksik jsonPath Doğrulamasını Ekle', en: 'Try It Yourself: Add the Missing jsonPath Verification' },
      starterCode: { tr: `.then()
    .statusCode(200)
    .body("title", equalTo("Login butonu donuyor"))
    // TODO: reporter alaninin "tester@learnqa.dev" oldugunu dogrula`, en: `.then()
    .statusCode(200)
    .body("title", equalTo("Login butonu donuyor"))
    // TODO: assert that the reporter field is "tester@learnqa.dev"` },
      solutionCode: `.then()
    .statusCode(200)
    .body("title", equalTo("Login butonu donuyor"))
    .body("reporter", equalTo("tester@learnqa.dev"))`,
      hint: { tr: 'Aynı `.body("alan", matcher)` kalıbı zincire eklenerek her yeni alan doğrulaması eklenir — `jsonPath` her alan için AYRI bir koordinattır.', en: 'The same `.body("field", matcher)` pattern is added to the chain for each new field verification — `jsonPath` is a SEPARATE coordinate for each field.' },
      successMessage: { tr: 'Doğru! Artık title yanında reporter alanı da doğrulanıyor.', en: 'Correct! Now the reporter field is verified alongside title.' },
    },
    {
      type: 'quiz',
      question: { tr: '`jsonPath`, elle `ObjectMapper` + `Map<String,Object>` yaklaşımına göre en büyük avantajı nedir?', en: 'What is `jsonPath`\'s biggest advantage over the manual `ObjectMapper` + `Map<String,Object>` approach?' },
      options: [
        { id: 'a', text: { tr: 'Bir alana TEK, okunabilir bir satırla erişir — iç içe get() zincirinin kırılganlığı yoktur', en: 'It reaches a field in ONE readable line — without the fragility of a nested get() chain' } },
        { id: 'b', text: { tr: 'Veritabanına doğrudan erişir', en: 'It accesses the database directly' } },
        { id: 'c', text: { tr: 'Sunucuyu otomatik yeniden başlatır', en: 'It automatically restarts the server' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: 'Elle `Map`\'e dönüştürüp iç içe `get()` çağırmak hem uzun hem kırılgandır (bir adım yanlış yazılırsa derleme zamanında yakalanmaz). `jsonPath("title")` aynı işi tek, okunabilir bir satırda yapar.', en: 'Manually converting to a `Map` and calling nested `get()`s is both long and fragile (a misspelled step is not caught at compile time). `jsonPath("title")` does the same job in one readable line.' },
      retryQuestion: {
        question: { tr: 'Hamcrest `oneOf("LOW", "MEDIUM", "HIGH", "CRITICAL")` matcher\'ı ne test eder?', en: 'What does the Hamcrest `oneOf("LOW", "MEDIUM", "HIGH", "CRITICAL")` matcher test?' },
        options: [
          { id: 'a', text: { tr: 'Değerin, listelenen değerlerden BİRİNE eşit olduğunu — enum kısıtını doğrular', en: 'That the value equals ONE of the listed values — it verifies an enum constraint' } },
          { id: 'b', text: { tr: 'Değerin tüm listedeki değerlere eşit olduğunu', en: 'That the value equals all values in the list' } },
          { id: 'c', text: { tr: 'Değerin bir sayı olduğunu', en: 'That the value is a number' } },
          { id: 'd', text: { tr: 'Değerin boş olduğunu', en: 'That the value is empty' } },
        ],
        correct: 'a',
        explanation: { tr: '`oneOf(...)`, F4\'te gördüğün `enum` şema kısıtının REST Assured\'daki karşılığıdır — değerin verilen listeden SADECE birine eşit olmasını doğrular.', en: '`oneOf(...)` is REST Assured\'s counterpart of the `enum` schema constraint you saw in F4 — it verifies the value equals ONLY one of the given list.' },
      },
    },
  ],
}

const H3 = {
  title: { tr: '🔄 H3 · POJO Serialization/Deserialization', en: '🔄 H3 · POJO Serialization/Deserialization' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔄',
      content: {
        tr: 'POJO (Plain Old Java Object) deserialization, B2\'de tanımladığın `Bug` sınıfını ÖDÜNÇ ALIP test kodunda YENİDEN KULLANMAKTIR — API\'nin ÜRETTİĞİ JSON\'u elle alan alan okumak yerine, `.as(Bug.class)` ile TEK satırda bir Java nesnesine dönüştürürsün. Bu, DRY (Don\'t Repeat Yourself) prensibinin API testindeki en somut örneğidir: uygulama kodu ile test kodu AYNI sınıfı (`Bug`) paylaşır, ikisi arasında bir tutarsızlık riski YOKTUR — `Bug` sınıfına bir alan eklenirse, test kodu da otomatik olarak bunu "görür" (derleme zamanında). Peki bu neden sadece bir kolaylık değil? Çünkü `Bug bug = response.as(Bug.class)` satırı, response\'un Java\'nın TİP SİSTEMİNE uyduğunu da DOLAYLI olarak test eder — alan tipi uyuşmuyorsa (F5\'teki "alan tipi uyumsuzluğu" contract defect\'i gibi) bu satır ÇALIŞMA ZAMANINDA hata fırlatır. **Derin POJO/serialization rehberi için → `/rest-assured` sayfasına bak.**',
        en: 'POJO (Plain Old Java Object) deserialization BORROWS the `Bug` class you defined in B2 and REUSES it in test code — instead of manually reading the JSON the API PRODUCES field by field, you convert it to a Java object in ONE line with `.as(Bug.class)`. This is the most concrete example of the DRY (Don\'t Repeat Yourself) principle in API testing: the application code and test code SHARE the SAME class (`Bug`), so there is NO risk of inconsistency between them — if a field is added to the `Bug` class, the test code automatically "sees" it too (at compile time). So why is this more than just convenience? Because the line `Bug bug = response.as(Bug.class)` also INDIRECTLY tests that the response matches Java\'s TYPE SYSTEM — if a field type mismatches (like the "field type mismatch" contract defect from F5), this line throws an error AT RUNTIME. **For a deep POJO/serialization guide → see the `/rest-assured` page.**',
      },
    },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// Bug.java — B2'de yazilan sinifin AYNISI, test kodunda TEKRAR KULLANILIYOR
public class Bug {
    public Long id;
    public String title;
    public String severity;
    public String status;
    public String reporter;
}`,
        en: `// Bug.java — the SAME class written in B2, REUSED in test code
public class Bug {
    public Long id;
    public String title;
    public String severity;
    public String status;
    public String reporter;
}`,
      },
    },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `Bug bug = given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs/42")
.then()
    .statusCode(200)
.extract()
    // TODO: JSON govdesini elle okumak yerine POJO'ya donustur
    .as(Bug.class);

assertEquals("Login butonu donuyor", bug.title);`,
        en: `Bug bug = given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs/42")
.then()
    .statusCode(200)
.extract()
    // TODO: convert to a POJO instead of manually reading the JSON body
    .as(Bug.class);

assertEquals("Login button freezes", bug.title);`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-h3-pojo-film',
      title: { tr: '🎬 Aynı Bug Sınıfı, İki Dünyada', en: '🎬 The Same Bug Class, in Two Worlds' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'app', emoji: '🖥️', label: { tr: 'Uygulama: Bug.java', en: 'App: Bug.java' }, color: '#f59e0b' },
        { id: 'json', emoji: '📄', label: { tr: 'API response\'u: JSON', en: 'API response: JSON' }, color: '#0ea5e9' },
        { id: 'test', emoji: '🧪', label: { tr: 'Test: .as(Bug.class)', en: 'Test: .as(Bug.class)' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'B2\'de yazılan `Bug` sınıfı uygulamanın İÇİNDE, veriyi taşımak için kullanılıyor.', en: 'The `Bug` class written in B2 is used INSIDE the app, to carry data.' }, positions: { app: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'API bu sınıfı JSON\'a çevirip response olarak döner.', en: 'The API converts this class to JSON and returns it as the response.' }, positions: { app: { x: 20, y: 40 }, json: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'app', to: 'json', color: '#0ea5e9' }] },
        { caption: { tr: 'Test kodu AYNI `Bug` sınıfını ÖDÜNÇ alıp `.as(Bug.class)` ile JSON\'u GERİ bir Java nesnesine çevirir — döngü tamamlanır.', en: 'The test code BORROWS the SAME `Bug` class and converts the JSON BACK into a Java object with `.as(Bug.class)` — the loop closes.' }, positions: { json: { x: 20, y: 40 }, test: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'json', to: 'test', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'JSON\'dan POJO\'ya Dönüşüm Sırası', en: 'The Order for Converting JSON to a POJO' },
      steps: [
        { id: 1, icon: '📄', label: { tr: 'Response\'u al…', en: 'Get the response…' }, detail: { tr: 'Request\'i gönder, ham JSON response\'unu .extract() ile yakala.', en: 'Send the request, capture the raw JSON response with .extract().' } },
        { id: 2, icon: '🔄', label: { tr: 'POJO\'ya dönüştür…', en: 'Convert to a POJO…' }, detail: { tr: '.as(Bug.class) ile JSON\'u B2\'deki AYNI Bug sınıfına deserialize et.', en: 'Deserialize the JSON into the SAME Bug class from B2 with .as(Bug.class).' } },
        { id: 3, icon: '✅', label: { tr: 'Alanları doğrula…', en: 'Verify the fields…' }, detail: { tr: 'Artık bug.title gibi tip-güvenli Java alanlarıyla assert yaz.', en: 'Now write asserts with type-safe Java fields like bug.title.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-h3-order-01',
      question: { tr: 'JSON\'dan POJO\'ya dönüşüm sürecini sırala.', en: 'Order the process for converting JSON to a POJO.' },
      items: [
        { id: '1', text: { tr: 'Uygulamadaki Bug sınıfını test moduluyle paylaş', en: 'Share the app\'s Bug class with the test module' }, order: 1 },
        { id: '2', text: { tr: 'Request\'i gönder, response\'u al', en: 'Send the request, get the response' }, order: 2 },
        { id: '3', text: { tr: '.extract().as(Bug.class) ile POJO\'ya dönüştür', en: 'Convert to a POJO with .extract().as(Bug.class)' }, order: 3 },
        { id: '4', text: { tr: 'bug.title gibi tip-güvenli alanlarla assert yaz', en: 'Write asserts with type-safe fields like bug.title' }, order: 4 },
        { id: '5', text: { tr: 'Testi çalıştır, sonucu doğrula', en: 'Run the test, verify the result' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-h3-pojo-deserialization',
      id: 'api-h3-pojo-deserialization',
      title: { tr: 'Kendin Dene: JSON\'u POJO\'ya Dönüştür', en: 'Try It Yourself: Convert JSON to a POJO' },
      starterCode: { tr: `// BUG: yanit .as(Bug.class) ile POJO'ya CEVRILMIYOR, ham Response kaliyor
Response response = given().baseUri("http://localhost:3000")
    .when().get("/api/v1/bugs/42")
    .then().statusCode(200).extract().response();`, en: `// BUG: the response is NOT converted to a POJO via .as(Bug.class), stays a raw Response
Response response = given().baseUri("http://localhost:3000")
    .when().get("/api/v1/bugs/42")
    .then().statusCode(200).extract().response();` },
      solutionCode: `Bug bug = given().baseUri("http://localhost:3000")
    .when().get("/api/v1/bugs/42")
    .then().statusCode(200).extract().as(Bug.class);`,
      hint: { tr: '`.extract().response()` ham bir `Response` nesnesi verir — alanları hâlâ elle okumak gerekir. `.extract().as(Bug.class)` ise doğrudan tip-güvenli bir `Bug` nesnesi verir.', en: '`.extract().response()` gives a raw `Response` object — fields must still be read manually. `.extract().as(Bug.class)` directly gives a type-safe `Bug` object.' },
      successMessage: { tr: 'Doğru! Artık bug.title gibi alanlara doğrudan, tip-güvenli erişebilirsin.', en: 'Correct! Now you can access fields like bug.title directly, type-safely.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Test kodunda uygulamadaki AYNI `Bug` sınıfını yeniden kullanmanın en büyük avantajı nedir?', en: 'What is the biggest advantage of reusing the SAME `Bug` class from the app in test code?' },
      options: [
        { id: 'a', text: { tr: 'Uygulama ile test arasında bir tutarsızlık riski olmaz — sınıfa alan eklenirse test kodu bunu derleme zamanında görür', en: 'There is no inconsistency risk between app and test — if a field is added to the class, the test code sees it at compile time' } },
        { id: 'b', text: { tr: 'Testler daha hızlı çalışır', en: 'Tests run faster' } },
        { id: 'c', text: { tr: 'Sunucu daha az bellek kullanır', en: 'The server uses less memory' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: 'Test kodu KENDİ ayrı bir `Bug` sınıfı tanımlasaydı, uygulama sınıfı değiştiğinde iki sınıf birbirinden SESSİZCE ayrışabilirdi. Aynı sınıfı paylaşmak bu riski ORTADAN KALDIRIR — DRY prensibinin doğrudan bir uygulamasıdır.', en: 'If test code defined its OWN separate `Bug` class, the two classes could SILENTLY diverge when the app class changes. Sharing the same class REMOVES this risk — a direct application of the DRY principle.' },
      retryQuestion: {
        question: { tr: '`.as(Bug.class)` çağrısı çalışma zamanında ne zaman hata fırlatır?', en: 'When does the `.as(Bug.class)` call throw an error at runtime?' },
        options: [
          { id: 'a', text: { tr: 'Response\'taki bir alanın tipi, Bug sınıfındaki karşılığıyla uyuşmadığında', en: 'When a field\'s type in the response does not match its counterpart in the Bug class' } },
          { id: 'b', text: { tr: 'Asla hata fırlatmaz', en: 'It never throws an error' } },
          { id: 'c', text: { tr: 'Sadece sunucu kapalıyken', en: 'Only when the server is down' } },
          { id: 'd', text: { tr: 'Sadece GET request\'lerinde', en: 'Only on GET requests' } },
        ],
        correct: 'a',
        explanation: { tr: 'Deserialization, response\'un Java tip sistemine UYMASINI dolaylı olarak test eder — F5\'teki "alan tipi uyumsuzluğu" gibi bir contract defect varsa (örn. sayı yerine metin), `.as(Bug.class)` çalışma zamanında bir istisna fırlatır.', en: 'Deserialization indirectly tests that the response MATCHES Java\'s type system — if there is a contract defect like the "field type mismatch" from F5 (e.g. text instead of a number), `.as(Bug.class)` throws an exception at runtime.' },
      },
    },
  ],
}

const H4 = {
  title: { tr: '📐 H4 · JSON Schema Validation ile contract testi', en: '📐 H4 · Contract Testing with JSON Schema Validation' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '📐',
      content: {
        tr: 'H2\'de her alanı TEK TEK doğrulamıştın (`title`, `severity`, ...); JSON Schema Validation ise F4\'te gördüğün ŞEMANIN TAMAMINI TEK bir satırda doğrular: `matchesJsonSchemaInClasspath("bug-schema.json")`. Bu, F5\'teki "contract defect" avcılığını OTOMATİKLEŞTİRİR — artık her response\'u elle karşılaştırmak yerine, spec\'ten üretilen bir JSON Schema dosyasını REST Assured\'a "bunu her zaman kontrol et" dersin. Peki neden hâlâ H2\'deki tek tek `.body(...)` doğrulamalarını da kullanıyoruz, sadece şema doğrulaması YETMEZ mi? Çünkü şema doğrulaması sadece ŞEKLİ (tip, zorunlu alan) kontrol eder — belirli bir DEĞERİ (örn. "title tam olarak bu metin olmalı") kontrol ETMEZ; ikisi TAMAMLAYICIDIR: şema "yapı doğru mu", tek tek `.body()` "içerik doğru mu" sorusuna cevap verir. **Derin JSON Schema Validation rehberi için → `/rest-assured` sayfasına bak.**',
        en: 'In H2 you verified each field ONE BY ONE (`title`, `severity`, ...); JSON Schema Validation verifies the ENTIRE schema you saw in F4 in ONE line: `matchesJsonSchemaInClasspath("bug-schema.json")`. This AUTOMATES the "contract defect" hunt from F5 — instead of manually comparing every response, you tell REST Assured "always check this" using a JSON Schema file generated from the spec. So why still use H2\'s individual `.body(...)` checks too, isn\'t schema validation ENOUGH alone? Because schema validation only checks the SHAPE (type, required field) — it does NOT check a SPECIFIC value (e.g. "title must be exactly this text"); the two are COMPLEMENTARY: schema answers "is the structure correct", individual `.body()` answers "is the content correct". **For a deep JSON Schema Validation guide → see the `/rest-assured` page.**',
      },
    },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// pom.xml'e json-schema-validator bagimliligi eklendi (rest-assured'in bir modulu)
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs/42")
.then()
    .statusCode(200)
    // TODO: F4'teki semanin TAMAMINI tek satirda dogrula
    .body(matchesJsonSchemaInClasspath("bug-schema.json"));`,
        en: `// json-schema-validator dependency added to pom.xml (a rest-assured module)
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

given()
    .baseUri("http://localhost:3000")
.when()
    .get("/api/v1/bugs/42")
.then()
    .statusCode(200)
    // TODO: verify the ENTIRE schema from F4 in one line
    .body(matchesJsonSchemaInClasspath("bug-schema.json"));`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-h4-schema-validation-film',
      title: { tr: '🎬 F5\'teki Avı Otomatikleştirmek', en: '🎬 Automating the Hunt from F5' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'manual', emoji: '🕵️', label: { tr: 'Elle karşılaştırma (F5)', en: 'Manual comparison (F5)' }, color: '#94a3b8' },
        { id: 'schema', emoji: '📐', label: { tr: 'bug-schema.json', en: 'bug-schema.json' }, color: '#0ea5e9' },
        { id: 'auto', emoji: '🤖', label: { tr: 'Her koşumda otomatik kontrol', en: 'Automatic check on every run' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'F5\'te contract defect\'leri ELLE, spec\'i gerçek response\'la karşılaştırarak buluyordun.', en: 'In F5 you found contract defects by MANUALLY comparing the spec against real responses.' }, positions: { manual: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'F4/F6\'daki şema bir `bug-schema.json` dosyasına dönüştürülür.', en: 'The schema from F4/F6 is turned into a `bug-schema.json` file.' }, positions: { manual: { x: 20, y: 40 }, schema: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'manual', to: 'schema', color: '#0ea5e9' }] },
        { caption: { tr: '`matchesJsonSchemaInClasspath(...)` bu dosyayı HER test koşumunda otomatik kontrol eder — elle karşılaştırma artık geçmişte kaldı.', en: '`matchesJsonSchemaInClasspath(...)` automatically checks this file on EVERY test run — manual comparison is now history.' }, positions: { schema: { x: 20, y: 40 }, auto: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'schema', to: 'auto', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Şemadan Otomatik Contract Testine', en: 'From Schema to Automated Contract Testing' },
      steps: [
        { id: 1, icon: '📐', label: { tr: 'Şemayı dosyaya al…', en: 'Put the schema into a file…' }, detail: { tr: 'F4/F6\'daki JSON şemasını bir .json dosyası olarak projeye ekle.', en: 'Add the JSON schema from F4/F6 to the project as a .json file.' } },
        { id: 2, icon: '📦', label: { tr: 'Doğrulayıcıyı ekle…', en: 'Add the validator…' }, detail: { tr: 'json-schema-validator bağımlılığını ekle, matchesJsonSchemaInClasspath\'i import et.', en: 'Add the json-schema-validator dependency, import matchesJsonSchemaInClasspath.' } },
        { id: 3, icon: '🤖', label: { tr: 'then() zincirine ekle…', en: 'Add to the then() chain…' }, detail: { tr: '.body(matchesJsonSchemaInClasspath(...)) ile her koşumda otomatik kontrol kur.', en: 'Set up automatic checking on every run with .body(matchesJsonSchemaInClasspath(...)).' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-h4-order-01',
      question: { tr: 'JSON Schema Validation kurma sürecini sırala.', en: 'Order the process for setting up JSON Schema Validation.' },
      items: [
        { id: '1', text: { tr: 'F4/F6\'daki şemayı bir .json dosyasına aktar', en: 'Export the schema from F4/F6 into a .json file' }, order: 1 },
        { id: '2', text: { tr: 'json-schema-validator bağımlılığını ekle', en: 'Add the json-schema-validator dependency' }, order: 2 },
        { id: '3', text: { tr: 'matchesJsonSchemaInClasspath\'i import et', en: 'Import matchesJsonSchemaInClasspath' }, order: 3 },
        { id: '4', text: { tr: 'then() zincirine .body(matchesJsonSchemaInClasspath(...)) ekle', en: 'Add .body(matchesJsonSchemaInClasspath(...)) to the then() chain' }, order: 4 },
        { id: '5', text: { tr: 'Testi çalıştır, şema uyumunu doğrula', en: 'Run the test, verify schema compliance' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-h4-json-schema-validation',
      id: 'api-h4-json-schema-validation',
      title: { tr: 'Kendin Dene: Eksik Şema Doğrulamasını Ekle', en: 'Try It Yourself: Add the Missing Schema Verification' },
      starterCode: `given().baseUri("http://localhost:3000")
    .when().get("/api/v1/bugs/42")
    .then().statusCode(200);
    // BUG: govdenin semaya UYDUGU hic dogrulanmiyor`,
      solutionCode: `given().baseUri("http://localhost:3000")
    .when().get("/api/v1/bugs/42")
    .then().statusCode(200)
    .body(matchesJsonSchemaInClasspath("bug-schema.json"));`,
      hint: { tr: 'Sadece `statusCode(200)` kontrolü, gövdenin ŞEKLİNİN (required/type/enum) doğru olduğunu KANITLAMAZ. `matchesJsonSchemaInClasspath(...)` ile bu şekli TEK satırda doğrula.', en: 'Checking only `statusCode(200)` does not PROVE the body\'s SHAPE (required/type/enum) is correct. Verify this shape in ONE line with `matchesJsonSchemaInClasspath(...)`.' },
      successMessage: { tr: 'Doğru! Artık her koşumda gövde F4/F6\'daki şemayla otomatik karşılaştırılıyor.', en: 'Correct! Now the body is automatically compared against the schema from F4/F6 on every run.' },
    },
    {
      type: 'quiz',
      question: { tr: 'JSON Schema Validation ile H2\'deki tek tek `.body("alan", matcher)` doğrulamaları arasındaki ilişki nedir?', en: 'What is the relationship between JSON Schema Validation and H2\'s individual `.body("field", matcher)` verifications?' },
      options: [
        { id: 'a', text: { tr: 'Tamamlayıcıdırlar — şema "yapı doğru mu", tek tek doğrulama "içerik doğru mu" sorusuna cevap verir', en: 'They are complementary — schema answers "is the structure correct", individual checks answer "is the content correct"' } },
        { id: 'b', text: { tr: 'Birbirinin YERİNE geçer, ikisini birden kullanmaya gerek yoktur', en: 'They REPLACE each other, there is no need to use both' } },
        { id: 'c', text: { tr: 'Şema doğrulaması sadece GET request\'lerinde çalışır', en: 'Schema validation only works on GET requests' } },
        { id: 'd', text: { tr: 'Hiçbir ilişkileri yoktur', en: 'They have no relationship' } },
      ],
      correct: 'a',
      explanation: { tr: 'Şema doğrulaması sadece ŞEKLİ (tip, zorunlu alan, enum) kontrol eder, belirli bir DEĞERİ kontrol etmez. Tek tek `.body()` doğrulamaları ise belirli bir değeri kontrol eder ama tüm şemayı KAPSAMAZ — ikisi birlikte hem yapıyı hem içeriği güvence altına alır.', en: 'Schema validation only checks the SHAPE (type, required field, enum), not a specific VALUE. Individual `.body()` checks verify a specific value but do NOT cover the entire schema — together they secure both structure and content.' },
      retryQuestion: {
        question: { tr: 'JSON Schema Validation, GRUP F\'teki hangi kavramla doğrudan bağlantılıdır?', en: 'Which concept from GROUP F is JSON Schema Validation directly linked to?' },
        options: [
          { id: 'a', text: { tr: 'F4\'teki schema (required/type/enum) ve F5\'teki contract defect kavramlarıyla', en: 'With F4\'s schema (required/type/enum) and F5\'s contract defect concepts' } },
          { id: 'b', text: { tr: 'E4\'teki Timing sekmesiyle', en: 'With E4\'s Timing tab' } },
          { id: 'c', text: { tr: 'C3\'teki middleware zinciriyle', en: 'With C3\'s middleware chain' } },
          { id: 'd', text: { tr: 'Hiçbir GRUP F konusuyla ilgisi yoktur', en: 'It has nothing to do with any GROUP F topic' } },
        ],
        correct: 'a',
        explanation: { tr: 'JSON Schema Validation, F4\'te öğrendiğin şema kavramını bir dosyaya (`bug-schema.json`) döker ve F5\'teki contract defect avcılığını her test koşumunda OTOMATİK hale getirir.', en: 'JSON Schema Validation pours the schema concept you learned in F4 into a file (`bug-schema.json`) and makes the contract defect hunt from F5 AUTOMATIC on every test run.' },
      },
    },
  ],
}

const H5 = {
  title: { tr: '♻️ H5 · RequestSpecification ile tekrarı yok etmek', en: '♻️ H5 · Removing Duplication with RequestSpecification' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '♻️',
      content: {
        tr: '`RequestSpecification`, API testinin **Page Object Model** karşılığıdır: Selenium\'da her sayfa için locator\'ları TEK bir sınıfta toplayıp tekrarı önlerken, `RequestSpecification` her testte tekrarlanan `baseUri`, ortak header\'lar (`Content-Type`), auth token gibi bilgileri TEK bir yerde toplar. H1-H4\'teki her test `given().baseUri("http://localhost:3000")` satırını TEKRAR TEKRAR yazdı — `baseUri` değişirse (örn. staging\'e geçilirse) HER TEST dosyasını elle güncellemek gerekirdi. Peki bu neden sadece bir "kısayol" değil? Çünkü tekrarlanan kurulum kodu, F5\'teki gibi bir "sessiz ayrışma" kaynağıdır — bir testte `baseUri` güncellenip diğerinde UNUTULURSA, testler birbirinden SESSİZCE farklı ortamlara karşı çalışmaya başlar. **Derin RequestSpecification rehberi için → `/rest-assured` sayfasına bak.**',
        en: '`RequestSpecification` is the **Page Object Model** counterpart in API testing: just as Selenium gathers locators for a page into ONE class to avoid duplication, `RequestSpecification` gathers information repeated across every test — `baseUri`, common headers (`Content-Type`), auth token — into ONE place. Every test in H1-H4 wrote the `given().baseUri("http://localhost:3000")` line OVER AND OVER — if `baseUri` changes (e.g. moving to staging), EVERY test file would need manual updating. So why is this more than just a "shortcut"? Because duplicated setup code is a source of "silent divergence" like the one in F5 — if `baseUri` is updated in one test and FORGOTTEN in another, tests SILENTLY start running against different environments. **For a deep RequestSpecification guide → see the `/rest-assured` page.**',
      },
    },
    {
      type: 'code',
      language: 'java',
      code: {
        tr: `// BugApiSpec.java — TUM testlerin PAYLASTIGI tek bir kurulum
public class BugApiSpec {
    public static RequestSpecification spec() {
        return new RequestSpecBuilder()
            .setBaseUri("http://localhost:3000")
            .setContentType("application/json")
            // TODO: auth token da buraya EKLENEBILIR
            .build();
    }
}

// Kullanim: HER testte tekrar yazilmiyor
given().spec(BugApiSpec.spec())
    .when().get("/api/v1/bugs")
    .then().statusCode(200);`,
        en: `// BugApiSpec.java — the ONE setup ALL tests SHARE
public class BugApiSpec {
    public static RequestSpecification spec() {
        return new RequestSpecBuilder()
            .setBaseUri("http://localhost:3000")
            .setContentType("application/json")
            // TODO: an auth token could also be ADDED here
            .build();
    }
}

// Usage: no longer rewritten in EVERY test
given().spec(BugApiSpec.spec())
    .when().get("/api/v1/bugs")
    .then().statusCode(200);`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-h5-request-spec-film',
      title: { tr: '🎬 API Testinin Page Object Model\'i', en: '🎬 API Testing\'s Page Object Model' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'repeated', emoji: '📋', label: { tr: 'Her testte tekrarlanan kurulum', en: 'Setup repeated in every test' }, color: '#ef4444' },
        { id: 'spec', emoji: '♻️', label: { tr: 'RequestSpecification', en: 'RequestSpecification' }, color: '#0ea5e9' },
        { id: 'shared', emoji: '✅', label: { tr: 'Tek yerden yönetilen kurulum', en: 'Setup managed from one place' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'H1-H4\'teki her test AYNI `baseUri`/header kurulumunu tekrar tekrar yazıyordu.', en: 'Every test in H1-H4 wrote the SAME `baseUri`/header setup over and over.' }, positions: { repeated: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Bu tekrar bir `RequestSpecification` sınıfına TAŞINIR — tıpkı Selenium\'da locator\'ların bir Page Object\'e taşınması gibi.', en: 'This repetition is MOVED into a `RequestSpecification` class — just like moving locators into a Page Object in Selenium.' }, positions: { repeated: { x: 20, y: 40 }, spec: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'repeated', to: 'spec', color: '#0ea5e9' }] },
        { caption: { tr: 'Artık `baseUri` değişirse TEK bir yer (BugApiSpec) güncellenir, TÜM testler otomatik doğru ortama gider.', en: 'Now if `baseUri` changes, ONE place (BugApiSpec) is updated, ALL tests automatically hit the right environment.' }, positions: { spec: { x: 20, y: 40 }, shared: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'spec', to: 'shared', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Tekrarı Yok Etme Sırası', en: 'The Order for Removing Duplication' },
      steps: [
        { id: 1, icon: '📋', label: { tr: 'Tekrarı fark et…', en: 'Notice the duplication…' }, detail: { tr: 'Her testte aynı baseUri/header/token satırlarının yazıldığını gözlemle.', en: 'Observe the same baseUri/header/token lines written in every test.' } },
        { id: 2, icon: '♻️', label: { tr: 'Spec\'i çıkar…', en: 'Extract the spec…' }, detail: { tr: 'RequestSpecBuilder ile ortak kurulumu TEK bir sınıfa topla.', en: 'Gather the common setup into ONE class with RequestSpecBuilder.' } },
        { id: 3, icon: '✅', label: { tr: 'Testlerde kullan…', en: 'Use it in tests…' }, detail: { tr: 'given().spec(BugApiSpec.spec()) ile her testte AYNI kurulumu paylaş.', en: 'Share the SAME setup in every test with given().spec(BugApiSpec.spec()).' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-h5-order-01',
      question: { tr: 'Bir RequestSpecification çıkarma sürecini sırala.', en: 'Order the process for extracting a RequestSpecification.' },
      items: [
        { id: '1', text: { tr: 'Testlerdeki tekrarlanan kurulum satırlarını belirle', en: 'Identify the repeated setup lines across tests' }, order: 1 },
        { id: '2', text: { tr: 'RequestSpecBuilder ile ortak bir spec() metodu yaz', en: 'Write a shared spec() method with RequestSpecBuilder' }, order: 2 },
        { id: '3', text: { tr: 'Her testte given().spec(...) ile bu metodu kullan', en: 'Use this method in every test with given().spec(...)' }, order: 3 },
        { id: '4', text: { tr: 'Tekrarlanan eski kurulum satırlarını sil', en: 'Delete the old repeated setup lines' }, order: 4 },
        { id: '5', text: { tr: 'Tüm testlerin hâlâ geçtiğini doğrula', en: 'Verify all tests still pass' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-h5-request-specification',
      id: 'api-h5-request-specification',
      title: { tr: 'Kendin Dene: Tekrarlanan Kurulumu Spec\'e Taşı', en: 'Try It Yourself: Move the Repeated Setup into a Spec' },
      starterCode: { tr: `// BUG: baseUri her testte AYRI AYRI yaziliyor
@Test void test1() { given().baseUri("http://localhost:3000")...; }
@Test void test2() { given().baseUri("http://localhost:3000")...; }`, en: `// BUG: baseUri is written SEPARATELY in every test
@Test void test1() { given().baseUri("http://localhost:3000")...; }
@Test void test2() { given().baseUri("http://localhost:3000")...; }` },
      solutionCode: { tr: `// FIX: TEK bir spec, her testte paylasiliyor
RequestSpecification spec = BugApiSpec.spec();
@Test void test1() { given().spec(spec)...; }
@Test void test2() { given().spec(spec)...; }`, en: `// FIX: a SINGLE spec, shared across every test
RequestSpecification spec = BugApiSpec.spec();
@Test void test1() { given().spec(spec)...; }
@Test void test2() { given().spec(spec)...; }` },
      hint: { tr: 'İki testte de AYNI `baseUri` yazılıyorsa, bu bir tekrar sinyalidir. `RequestSpecification` bu ortak kurulumu TEK bir yere taşır, her test onu PAYLAŞIR.', en: 'If the SAME `baseUri` is written in two tests, that is a duplication signal. `RequestSpecification` moves this common setup to ONE place, every test SHARES it.' },
      successMessage: { tr: 'Doğru! Artık baseUri değişirse tek bir yer güncellenir, testler otomatik senkron kalır.', en: 'Correct! Now if baseUri changes, one place is updated, tests stay automatically in sync.' },
    },
    {
      type: 'quiz',
      question: { tr: '`RequestSpecification` kullanmamanın en büyük riski nedir?', en: 'What is the biggest risk of not using `RequestSpecification`?' },
      options: [
        { id: 'a', text: { tr: 'Bir testte kurulum (baseUri/header) güncellenip diğerinde unutulursa, testler sessizce farklı ortamlara karşı çalışır', en: 'If setup (baseUri/header) is updated in one test and forgotten in another, tests silently run against different environments' } },
        { id: 'b', text: { tr: 'Testler daha yavaş çalışır', en: 'Tests run slower' } },
        { id: 'c', text: { tr: 'Sunucu çöker', en: 'The server crashes' } },
        { id: 'd', text: { tr: 'Hiçbir risk yoktur', en: 'There is no risk' } },
      ],
      correct: 'a',
      explanation: { tr: 'Tekrarlanan kurulum kodu, GÜNCELLEME sırasında bir yerin unutulmasına açıktır — bu, testlerin sessizce birbirinden farklı ortamlara/ayarlara karşı çalışmasına, yani güvenilmez bir test paketine yol açar.', en: 'Duplicated setup code is open to a spot being forgotten during an UPDATE — this leads to tests silently running against different environments/settings, i.e. an unreliable test suite.' },
      retryQuestion: {
        question: { tr: '`RequestSpecification`\'ın Selenium\'daki en yakın karşılığı nedir?', en: 'What is the closest Selenium equivalent of `RequestSpecification`?' },
        options: [
          { id: 'a', text: { tr: 'Page Object Model — tekrarlanan bilgiyi (locator\'lar/kurulum) tek bir sınıfta toplamak', en: 'The Page Object Model — gathering repeated information (locators/setup) into one class' } },
          { id: 'b', text: { tr: 'WebDriverWait', en: 'WebDriverWait' } },
          { id: 'c', text: { tr: 'By.cssSelector', en: 'By.cssSelector' } },
          { id: 'd', text: { tr: 'ChromeOptions', en: 'ChromeOptions' } },
        ],
        correct: 'a',
        explanation: { tr: 'İkisi de aynı prensibi taşır: tekrarlanan bir bilgiyi (Selenium\'da locator\'lar, REST Assured\'da baseUri/header) TEK bir yere toplayıp bakımı kolaylaştırmak ve tutarsızlık riskini azaltmak.', en: 'Both carry the same principle: gathering repeated information (locators in Selenium, baseUri/headers in REST Assured) into ONE place to ease maintenance and reduce inconsistency risk.' },
      },
    },
  ],
}

const H6 = {
  title: { tr: '🔁 H6 · JUnit 5/TestNG entegrasyonu + CI', en: '🔁 H6 · JUnit 5/TestNG Integration + CI' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔁',
      content: {
        tr: 'REST Assured yalnızca bir HTTP İSTEMCİSİDİR — request\'i kim ÇALIŞTIRACAK, kim RAPORLAYACAK sorusunun cevabı JUnit 5 veya TestNG\'dir. Bu, G6\'da gördüğün Newman\'ın rolüyle AYNIDIR: Newman bir Postman koleksiyonunu ÇALIŞTIRIR/RAPORLAR, JUnit/TestNG ise bir REST Assured test SINIFINI çalıştırır/raporlar. `mvn test` (veya `mvn verify`) bu testleri komut satırından/CI\'da tetikler — GRUP B\'de yazdığın uygulama koduyla AYNI Maven projesinde yaşarlar. Peki bu neden önemli — testler ayrı bir proje olamaz mıydı? Çünkü aynı projede yaşamak, kod DEĞİŞTİĞİNDE testin AYNI `mvn install`/CI adımında OTOMATİK çalışmasını garanti eder; ayrı bir proje olsaydı, "testleri de çalıştırmayı unutma" riski (G4\'teki gibi) geri dönerdi. **Derin JUnit/TestNG+CI kurulumu için → `/rest-assured` sayfasına bak.**',
        en: 'REST Assured is ONLY an HTTP CLIENT — the answer to "who RUNS the request, who REPORTS it" is JUnit 5 or TestNG. This is the EXACT same role as Newman from G6: Newman RUNS/REPORTS a Postman collection, JUnit/TestNG runs/reports a REST Assured test CLASS. `mvn test` (or `mvn verify`) triggers these tests from the command line/in CI — they live in the SAME Maven project as the app code you wrote in GROUP B. So why does this matter — couldn\'t tests be a separate project? Because living in the same project GUARANTEES the test runs AUTOMATICALLY in the SAME `mvn install`/CI step when the code CHANGES; if it were a separate project, the "forgetting to run tests too" risk (like in G4) would return. **For a deep JUnit/TestNG+CI setup guide → see the `/rest-assured` page.**',
      },
    },
    {
      type: 'code',
      language: 'yaml',
      code: {
        tr: `# .github/workflows/api-tests.yml
name: Bug Tracker API Testleri (REST Assured)
on: [push]
jobs:
  rest-assured:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '17', distribution: 'temurin' }
      # TODO: uygulamayi baslat, SONRA testleri calistir
      - run: mvn spring-boot:run &
      - run: mvn test`,
        en: `# .github/workflows/api-tests.yml
name: Bug Tracker API Tests (REST Assured)
on: [push]
jobs:
  rest-assured:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '17', distribution: 'temurin' }
      # TODO: start the app, THEN run the tests
      - run: mvn spring-boot:run &
      - run: mvn test`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-h6-junit-ci-film',
      title: { tr: '🎬 REST Assured\'un Newman Karşılığı', en: '🎬 REST Assured\'s Newman Counterpart' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'ra', emoji: '📡', label: { tr: 'REST Assured: sadece istemci', en: 'REST Assured: just a client' }, color: '#f59e0b' },
        { id: 'junit', emoji: '🔁', label: { tr: 'JUnit/TestNG çalıştırır', en: 'JUnit/TestNG runs it' }, color: '#0ea5e9' },
        { id: 'ci', emoji: '🚧', label: { tr: 'mvn test → CI', en: 'mvn test → CI' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'REST Assured tek başına sadece bir request gönderme aracıdır — onu KİM çalıştıracak?', en: 'REST Assured alone is just a request-sending tool — WHO will run it?' }, positions: { ra: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'JUnit 5/TestNG, `@Test` metotlarını bulup ÇALIŞTIRIR ve sonucu RAPORLAR — G6\'daki Newman\'ın REST Assured karşılığı.', en: 'JUnit 5/TestNG finds `@Test` methods, RUNS them, and REPORTS the result — the REST Assured counterpart of G6\'s Newman.' }, positions: { ra: { x: 20, y: 40 }, junit: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'ra', to: 'junit', color: '#0ea5e9' }] },
        { caption: { tr: '`mvn test` bunu CI\'a bağlar — GRUP B kodunun bulunduğu AYNI projede, her push\'ta OTOMATİK çalışır.', en: '`mvn test` wires this into CI — in the SAME project as the GROUP B code, running AUTOMATICALLY on every push.' }, positions: { junit: { x: 20, y: 40 }, ci: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'junit', to: 'ci', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'REST Assured Testini CI\'a Bağlama Sırası', en: 'The Order for Wiring a REST Assured Test into CI' },
      steps: [
        { id: 1, icon: '🔁', label: { tr: 'JUnit/TestNG ile yaz…', en: 'Write with JUnit/TestNG…' }, detail: { tr: '@Test annotation\'ı ile REST Assured kodunu bir test metoduna sar.', en: 'Wrap the REST Assured code in a test method with the @Test annotation.' } },
        { id: 2, icon: '▶️', label: { tr: 'mvn test ile doğrula…', en: 'Verify with mvn test…' }, detail: { tr: 'Yerelde mvn test çalıştırıp testin geçtiğini doğrula.', en: 'Run mvn test locally and verify the test passes.' } },
        { id: 3, icon: '🚧', label: { tr: 'CI\'a ekle…', en: 'Add to CI…' }, detail: { tr: 'Uygulamayı başlatan adımdan SONRA mvn test\'i workflow\'a ekle.', en: 'Add mvn test to the workflow AFTER the step that starts the app.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-h6-order-01',
      question: { tr: 'REST Assured testlerini CI\'a bağlama sürecini sırala.', en: 'Order the process for wiring REST Assured tests into CI.' },
      items: [
        { id: '1', text: { tr: 'Testleri @Test ile JUnit 5/TestNG metoduna sar', en: 'Wrap tests in a JUnit 5/TestNG @Test method' }, order: 1 },
        { id: '2', text: { tr: 'mvn test ile yerelde doğrula', en: 'Verify locally with mvn test' }, order: 2 },
        { id: '3', text: { tr: 'CI workflow\'unda önce uygulamayı başlat', en: 'Start the app first in the CI workflow' }, order: 3 },
        { id: '4', text: { tr: 'Sonra mvn test adımını ekle', en: 'Then add the mvn test step' }, order: 4 },
        { id: '5', text: { tr: 'Push at, testlerin CI\'da otomatik çalıştığını doğrula', en: 'Push, verify tests run automatically in CI' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-h6-junit-ci',
      id: 'api-h6-junit-ci',
      title: { tr: 'Kendin Dene: CI Adım Sırasını Düzelt', en: 'Try It Yourself: Fix the CI Step Order' },
      starterCode: `# BUG: testler uygulama BASLAMADAN calisiyor -> baglanti hatasi
steps:
  - run: mvn test
  - run: mvn spring-boot:run &`,
      solutionCode: `steps:
  - run: mvn spring-boot:run &
  - run: mvn test`,
      hint: { tr: 'REST Assured testleri, sunucuya GERÇEK bir HTTP request\'i atar — sunucu henüz başlamamışsa request bağlantı hatasıyla başarısız olur. Uygulamayı başlatan adım her zaman ÖNCE gelmelidir.', en: 'REST Assured tests send a REAL HTTP request to the server — if the server has not started yet, the request fails with a connection error. The step that starts the app must always come FIRST.' },
      successMessage: { tr: 'Doğru! Artık testler sunucu ayaktayken çalışıyor.', en: 'Correct! Now tests run while the server is up.' },
    },
    {
      type: 'quiz',
      question: { tr: 'REST Assured testlerini uygulamanın AYNI Maven projesinde tutmanın avantajı nedir?', en: 'What is the advantage of keeping REST Assured tests in the SAME Maven project as the app?' },
      options: [
        { id: 'a', text: { tr: 'Kod değiştiğinde testler AYNI mvn install/CI adımında otomatik çalışır — "testleri unutma" riski kalmaz', en: 'When the code changes, tests run automatically in the SAME mvn install/CI step — no "forgetting the tests" risk' } },
        { id: 'b', text: { tr: 'Uygulama daha hızlı başlar', en: 'The app starts faster' } },
        { id: 'c', text: { tr: 'Veritabanı otomatik yedeklenir', en: 'The database is automatically backed up' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: 'Testler ayrı bir projede olsaydı, ayrı bir adımda ELLE tetiklenmesi gerekirdi ve unutulabilirdi (G4\'teki çift-tıklama defect\'i gibi bir "unutma" riski). Aynı projede olmak, testin build\'in AYRILMAZ bir parçası olmasını garanti eder.', en: 'If tests were in a separate project, they would need to be triggered MANUALLY in a separate step and could be forgotten (a "forgetting" risk like the double-click defect from G4). Being in the same project guarantees the test is an INSEPARABLE part of the build.' },
      retryQuestion: {
        question: { tr: 'REST Assured ile JUnit 5/TestNG arasındaki iş bölümü nedir?', en: 'What is the division of labor between REST Assured and JUnit 5/TestNG?' },
        options: [
          { id: 'a', text: { tr: 'REST Assured request\'i gönderir/doğrular, JUnit/TestNG testi çalıştırır ve raporlar', en: 'REST Assured sends/verifies the request, JUnit/TestNG runs and reports the test' } },
          { id: 'b', text: { tr: 'İkisi aynı işi yapar, biri gereksizdir', en: 'They do the same job, one is redundant' } },
          { id: 'c', text: { tr: 'JUnit/TestNG request\'i gönderir, REST Assured raporlar', en: 'JUnit/TestNG sends the request, REST Assured reports it' } },
          { id: 'd', text: { tr: 'REST Assured sadece veritabanı testleri içindir', en: 'REST Assured is only for database tests' } },
        ],
        correct: 'a',
        explanation: { tr: 'REST Assured bir HTTP istemci KÜTÜPHANESİdir (request\'i gönderir, `given/when/then` ile doğrular); JUnit 5/TestNG ise bir test ÇALIŞTIRICISI ve RAPORLAYICISIDIR (`@Test` metotlarını bulur, çalıştırır, sonucu raporlar) — G6\'daki Postman/Newman ayrımıyla birebir aynı mantık.', en: 'REST Assured is an HTTP client LIBRARY (sends the request, verifies with `given/when/then`); JUnit 5/TestNG is a test RUNNER and REPORTER (finds `@Test` methods, runs them, reports the result) — the exact same logic as the Postman/Newman split in G6.' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP I — Playwright ile API Testi (TypeScript) (ÇAKIŞMA KURALI: derin
// Playwright anlatımı yok, burada API+UI hibrit gücü öne çıkar)
// ═══════════════════════════════════════════════════════════════════════════

const I1 = {
  title: { tr: '🎭 I1 · request fixture ve APIRequestContext', en: '🎭 I1 · request fixture and APIRequestContext' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🎭',
      content: {
        tr: 'Playwright\'ın `request` fixture\'ı, H1\'de gördüğün REST Assured\'un `given()`\'ının TypeScript karşılığıdır — `APIRequestContext`, tarayıcı AÇMADAN doğrudan HTTP request\'leri gönderen bir istemcidir. Peki Playwright zaten bir TARAYICI otomasyon aracıyken, neden ayrı bir API istemcisi taşıyor? Çünkü GRUP I\'nin asıl gücü (I3\'te göreceğin gibi) API ile UI\'yı AYNI test dosyasında BİRLEŞTİREBİLMEKTİR — ayrı bir araca (REST Assured) geçmeden, aynı TypeScript test dosyasında hem `/api/v1/bugs`\'a request atabilir hem tarayıcıyı kontrol edebilirsin. Java\'da bunun karşılığı, bir Selenium testi içinde HttpClient\'ı da enjekte edip kullanmaktır — mümkündür ama Playwright bunu framework\'ün DOĞAL bir parçası yapar. **Derin Playwright rehberi için → `/playwright` sayfasına bak; burada sadece API tarafını görüyoruz.**',
        en: 'Playwright\'s `request` fixture is the TypeScript counterpart of the `given()` you saw in REST Assured in H1 — `APIRequestContext` is a client that sends HTTP requests directly WITHOUT opening a browser. So why does Playwright, already a BROWSER automation tool, carry a separate API client? Because GROUP I\'s real power (as you will see in I3) is being able to COMBINE API and UI in the SAME test file — without switching to a separate tool (REST Assured), you can both hit `/api/v1/bugs` and control the browser in the same TypeScript test file. The Java equivalent is injecting and using an HttpClient inside a Selenium test — possible, but Playwright makes it a NATURAL part of the framework. **For a deep Playwright guide → see the `/playwright` page; here we only see the API side.**',
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `import { test, expect } from '@playwright/test'

test('bug listesi getirilir', async ({ request }) => {
  // TODO: tarayici ACMADAN dogrudan HTTP istegi
  const response = await request.get('http://localhost:3000/api/v1/bugs')
  expect(response.ok()).toBeTruthy()
})`,
        en: `import { test, expect } from '@playwright/test'

test('fetches the bug list', async ({ request }) => {
  // TODO: a direct HTTP request WITHOUT opening a browser
  const response = await request.get('http://localhost:3000/api/v1/bugs')
  expect(response.ok()).toBeTruthy()
})`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-i1-request-fixture-film',
      title: { tr: '🎬 Tarayıcı Açmadan Bir Request Atmak', en: '🎬 Sending a Request Without Opening a Browser' },
      xpReward: 11,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'test', emoji: '🎭', label: { tr: 'test(\'...\', async ({ request }) =>', en: 'test(\'...\', async ({ request }) =>' }, color: '#f59e0b' },
        { id: 'ctx', emoji: '🎯', label: { tr: 'APIRequestContext', en: 'APIRequestContext' }, color: '#0ea5e9' },
        { id: 'api', emoji: '🖥️', label: { tr: '/api/v1/bugs', en: '/api/v1/bugs' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Playwright testi `request` fixture\'ını parametre olarak ister.', en: 'A Playwright test asks for the `request` fixture as a parameter.' }, positions: { test: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Playwright bir `APIRequestContext` sağlar — HİÇBİR tarayıcı sekmesi açılmaz.', en: 'Playwright provides an `APIRequestContext` — NO browser tab opens.' }, positions: { test: { x: 20, y: 40 }, ctx: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'test', to: 'ctx', color: '#0ea5e9' }] },
        { caption: { tr: '`request.get(...)` doğrudan `/api/v1/bugs`\'a bir HTTP request\'i atar — hızlı ve tarayıcı yükünden bağımsız.', en: '`request.get(...)` sends an HTTP request directly to `/api/v1/bugs` — fast and independent of browser overhead.' }, positions: { ctx: { x: 20, y: 40 }, api: { x: 58, y: 55, scale: 1.15, pulse: true } }, beams: [{ from: 'ctx', to: 'api', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'İlk Playwright API Testini Yazma Sırası', en: 'The Order for Writing the First Playwright API Test' },
      steps: [
        { id: 1, icon: '📦', label: { tr: '@playwright/test\'i kur…', en: 'Set up @playwright/test…' }, detail: { tr: 'Proje zaten kuruluysa ekstra kurulum gerekmez.', en: 'No extra setup needed if the project is already set up.' } },
        { id: 2, icon: '🎯', label: { tr: 'request fixture\'ını al…', en: 'Get the request fixture…' }, detail: { tr: 'Test fonksiyonunun parametresinde { request } destructuring\'i yap.', en: 'Destructure { request } in the test function\'s parameter.' } },
        { id: 3, icon: '📤', label: { tr: 'Request\'i gönder…', en: 'Send the request…' }, detail: { tr: 'request.get/post ile /api/v1/bugs\'a doğrudan request at.', en: 'Send a direct request to /api/v1/bugs with request.get/post.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-i1-order-01',
      question: { tr: 'Playwright ile bir API testi yazma sırasını diz.', en: 'Order the steps for writing an API test with Playwright.' },
      items: [
        { id: '1', text: { tr: 'test fonksiyonunda { request } parametresini al', en: 'Take the { request } parameter in the test function' }, order: 1 },
        { id: '2', text: { tr: 'request.get/post ile request\'i gönder', en: 'Send the request with request.get/post' }, order: 2 },
        { id: '3', text: { tr: 'response.ok() ile status\'u kontrol et', en: 'Check the status with response.ok()' }, order: 3 },
        { id: '4', text: { tr: 'response.json() ile gövdeyi ayrıştır', en: 'Parse the body with response.json()' }, order: 4 },
        { id: '5', text: { tr: 'expect(...) ile beklentiyi doğrula', en: 'Verify the expectation with expect(...)' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-i1-request-fixture',
      id: 'api-i1-request-fixture',
      title: { tr: 'Kendin Dene: Eksik Fixture Parametresini Ekle', en: 'Try It Yourself: Add the Missing Fixture Parameter' },
      starterCode: `// BUG: request fixture'i parametre olarak alinmiyor
test('bug listesi getirilir', async () => {
  const response = await request.get('http://localhost:3000/api/v1/bugs')
})`,
      solutionCode: `test('bug listesi getirilir', async ({ request }) => {
  const response = await request.get('http://localhost:3000/api/v1/bugs')
  expect(response.ok()).toBeTruthy()
})`,
      hint: { tr: 'Playwright\'ta `request` global bir değişken DEĞİLDİR — her testin kendi izole `APIRequestContext`\'i olması için test fonksiyonunun PARAMETRESİNDEN `{ request }` olarak alınması gerekir.', en: 'In Playwright, `request` is NOT a global variable — it must be taken from the test function\'s PARAMETER as `{ request }` so each test gets its own isolated `APIRequestContext`.' },
      successMessage: { tr: 'Doğru! Artık her test kendi izole API context\'iyle çalışıyor.', en: 'Correct! Now each test runs with its own isolated API context.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Playwright\'ın `request` fixture\'ı ile bir HTTP request\'i göndermenin tarayıcı üzerinden gitmeye göre avantajı nedir?', en: 'What is the advantage of sending an HTTP request with Playwright\'s `request` fixture over going through the browser?' },
      options: [
        { id: 'a', text: { tr: 'Tarayıcı açma/render yükü olmadan, doğrudan ve hızlı bir request gönderir', en: 'It sends a direct, fast request without browser-opening/rendering overhead' } },
        { id: 'b', text: { tr: 'Sunucuyu otomatik başlatır', en: 'It automatically starts the server' } },
        { id: 'c', text: { tr: 'Veritabanını sıfırlar', en: 'It resets the database' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: '`APIRequestContext`, bir tarayıcı sekmesi açıp render etmeden doğrudan HTTP request\'i gönderir — bu, sadece API\'yi test etmek istediğinde çok daha hızlı ve hafiftir.', en: '`APIRequestContext` sends an HTTP request directly, without opening and rendering a browser tab — much faster and lighter when you only want to test the API.' },
      retryQuestion: {
        question: { tr: 'Playwright\'ın `request` fixture\'ının REST Assured\'daki en yakın karşılığı nedir?', en: 'What is the closest REST Assured equivalent of Playwright\'s `request` fixture?' },
        options: [
          { id: 'a', text: { tr: '`given()` — bir HTTP request\'i göndermek için hazırlık/istemci sağlar', en: '`given()` — provides the setup/client for sending an HTTP request' } },
          { id: 'b', text: { tr: '`@Test` annotation\'ı', en: 'The `@Test` annotation' } },
          { id: 'c', text: { tr: 'Bir POJO sınıfı', en: 'A POJO class' } },
          { id: 'd', text: { tr: 'Bir Maven bağımlılığı', en: 'A Maven dependency' } },
        ],
        correct: 'a',
        explanation: { tr: 'İkisi de bir HTTP request\'i göndermek için gereken istemci/bağlamı sağlar — REST Assured\'da `given()` ile başlanır, Playwright\'ta `request` fixture\'ı ile.', en: 'Both provide the client/context needed to send an HTTP request — in REST Assured you start with `given()`, in Playwright with the `request` fixture.' },
      },
    },
  ],
}

const I2 = {
  title: { tr: '🟩 I2 · expect(response).toBeOK() ve JSON assertion', en: '🟩 I2 · expect(response).toBeOK() and JSON Assertion' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🟩',
      content: {
        tr: '`expect(response).toBeOK()`, Playwright\'ın 2xx status kontrolü için yazdığı bir KISAYOLDUR — H1\'deki `.statusCode(200)`\'ün TypeScript\'e çevirisi, ama tek bir kod yerine TÜM 2xx aralığını (200-299) kontrol eder. JSON gövdesini doğrulamak için ise `await response.json()` ile ayrıştırıp normal Playwright `expect(...)` assertion\'larını (`toBe`, `toEqual`, `toContain`) kullanırsın — UI testlerinde `expect(locator).toBeVisible()` yazmanla AYNI `expect` API\'sidir, sadece nesne bir DOM elementi değil bir veri parçasıdır. Peki bu neden önemli bir tutarlılık? Çünkü GRUP I\'nin gücü (I3) API ve UI assertion\'larını AYNI sözdizimiyle YAZDIRTMASINDA yatar — testerın zihninde "API modu" ile "UI modu" arasında geçiş yükü OLMAZ. **Derin Playwright assertion rehberi için → `/playwright` sayfasına bak.**',
        en: '`expect(response).toBeOK()` is a SHORTCUT Playwright wrote for checking a 2xx status — the TypeScript translation of H1\'s `.statusCode(200)`, but checking the ENTIRE 2xx range (200-299) instead of a single code. To verify the JSON body, you parse it with `await response.json()` and use normal Playwright `expect(...)` assertions (`toBe`, `toEqual`, `toContain`) — the SAME `expect` API you use writing `expect(locator).toBeVisible()` in UI tests, only the object is a piece of data instead of a DOM element. Why does this consistency matter? Because GROUP I\'s power (I3) lies in making API and UI assertions WRITTEN with the SAME syntax — there is NO context-switching burden in the tester\'s mind between "API mode" and "UI mode". **For a deep Playwright assertion guide → see the `/playwright` page.**',
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `test('bug detayi dogru donuyor', async ({ request }) => {
  const response = await request.get('http://localhost:3000/api/v1/bugs/42')
  expect(response.ok()).toBeTruthy()   // toBeOK() ile ayni: 2xx araligi

  const body = await response.json()
  // TODO: severity alaninin gecerli bir enum degeri oldugunu dogrula
  expect(body.title).toBe('Login butonu donuyor')`,
        en: `test('bug details return correctly', async ({ request }) => {
  const response = await request.get('http://localhost:3000/api/v1/bugs/42')
  expect(response.ok()).toBeTruthy()   // same as toBeOK(): the 2xx range

  const body = await response.json()
  // TODO: verify severity is a valid enum value
  expect(body.title).toBe('Login button freezes')`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-i2-json-assertion-film',
      title: { tr: '🎬 Aynı expect(), İki Farklı Nesne', en: '🎬 The Same expect(), Two Different Objects' },
      xpReward: 10,
      sceneDurationMs: 3400,
      stageHeight: 240,
      actors: [
        { id: 'ui', emoji: '🖱️', label: { tr: 'expect(locator).toBeVisible()', en: 'expect(locator).toBeVisible()' }, color: '#f59e0b' },
        { id: 'api', emoji: '📡', label: { tr: 'expect(body.title).toBe(...)', en: 'expect(body.title).toBe(...)' }, color: '#0ea5e9' },
        { id: 'unified', emoji: '🎯', label: { tr: 'Tek zihinsel model', en: 'One mental model' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Bir UI testinde `expect(locator).toBeVisible()` yazarsın — bir DOM elementini doğrularsın.', en: 'In a UI test you write `expect(locator).toBeVisible()` — verifying a DOM element.' }, positions: { ui: { x: 50, y: 40, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Bir API testinde `expect(body.title).toBe(...)` yazarsın — AYNI `expect` fonksiyonu, farklı bir nesne.', en: 'In an API test you write `expect(body.title).toBe(...)` — the SAME `expect` function, a different object.' }, positions: { api: { x: 50, y: 55, scale: 1.1, pulse: true } } },
        { caption: { tr: 'Ders — Zihinsel model AYNIDIR; sadece kontrol ettiğin şey (DOM mu, JSON mu) değişir. Bu, I3\'teki hibrit testlerin TEMELİDİR.', en: 'The lesson — the mental model is the SAME; only what you check (DOM or JSON) changes. This is the FOUNDATION of the hybrid tests in I3.' }, positions: { ui: { x: 25, y: 45 }, api: { x: 25, y: 60 }, unified: { x: 65, y: 52, scale: 1.15, pulse: true } }, beams: [{ from: 'ui', to: 'unified', color: '#22c55e' }, { from: 'api', to: 'unified', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Status ve Gövde Doğrulama Sırası', en: 'The Order for Verifying Status and Body' },
      steps: [
        { id: 1, icon: '🟩', label: { tr: 'Status kontrol et…', en: 'Check the status…' }, detail: { tr: 'expect(response.ok()).toBeTruthy() veya toBeOK() ile 2xx aralığını doğrula.', en: 'Verify the 2xx range with expect(response.ok()).toBeTruthy() or toBeOK().' } },
        { id: 2, icon: '📄', label: { tr: 'Gövdeyi ayrıştır…', en: 'Parse the body…' }, detail: { tr: 'await response.json() ile ham JSON\'u bir JavaScript nesnesine çevir.', en: 'Convert the raw JSON to a JavaScript object with await response.json().' } },
        { id: 3, icon: '🎯', label: { tr: 'Alanları doğrula…', en: 'Verify the fields…' }, detail: { tr: 'expect(body.alan).toBe(...)/toContain(...) ile içeriği kontrol et.', en: 'Check the content with expect(body.field).toBe(...)/toContain(...).' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-i2-order-01',
      question: { tr: 'Bir Playwright API response\'unu doğrulama sırasını diz.', en: 'Order the steps for verifying a Playwright API response.' },
      items: [
        { id: '1', text: { tr: 'Request\'i gönder, response nesnesini al', en: 'Send the request, get the response object' }, order: 1 },
        { id: '2', text: { tr: 'response.ok()/toBeOK() ile status\'u kontrol et', en: 'Check the status with response.ok()/toBeOK()' }, order: 2 },
        { id: '3', text: { tr: 'await response.json() ile gövdeyi ayrıştır', en: 'Parse the body with await response.json()' }, order: 3 },
        { id: '4', text: { tr: 'expect(body.alan).toBe(...) ile içeriği doğrula', en: 'Verify the content with expect(body.field).toBe(...)' }, order: 4 },
        { id: '5', text: { tr: 'Test sonucunu oku', en: 'Read the test result' }, order: 5 },
      ],
      xpReward: 10,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-i2-json-assertion',
      id: 'api-i2-json-assertion',
      title: { tr: 'Kendin Dene: Eksik JSON Doğrulamasını Ekle', en: 'Try It Yourself: Add the Missing JSON Verification' },
      starterCode: { tr: `const body = await response.json()
expect(body.title).toBe('Login butonu donuyor')
// TODO: body.severity'nin gecerli enum degerlerinden biri oldugunu dogrula`, en: `const body = await response.json()
expect(body.title).toBe('Login butonu donuyor')
// TODO: assert that body.severity is one of the valid enum values` },
      solutionCode: `const body = await response.json()
expect(body.title).toBe('Login butonu donuyor')
expect(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).toContain(body.severity)`,
      hint: { tr: 'Bir dizinin belirli bir değeri İÇERDİĞİNİ doğrulamak için `expect(dizi).toContain(deger)` kullanılır — bu, F4\'teki `enum` kısıtının Playwright karşılığıdır.', en: 'To verify an array CONTAINS a specific value, use `expect(array).toContain(value)` — this is the Playwright counterpart of F4\'s `enum` constraint.' },
      successMessage: { tr: 'Doğru! Artık severity alanı da geçerli enum listesine karşı doğrulanıyor.', en: 'Correct! Now the severity field is also verified against the valid enum list.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Playwright\'ta hem UI hem API testlerinde AYNI `expect(...)` fonksiyonunu kullanmanın avantajı nedir?', en: 'What is the advantage of using the SAME `expect(...)` function in both UI and API tests in Playwright?' },
      options: [
        { id: 'a', text: { tr: 'Testerın zihninde "API modu"/"UI modu" arasında geçiş yükü olmaz — tek bir tutarlı sözdizimi öğrenilir', en: 'There is no context-switching burden between "API mode"/"UI mode" in the tester\'s mind — one consistent syntax is learned' } },
        { id: 'b', text: { tr: 'Testler daha hızlı çalışır', en: 'Tests run faster' } },
        { id: 'c', text: { tr: 'Sunucu yükü azalır', en: 'Server load decreases' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: 'Aynı `expect` API\'si hem `locator` hem `response`/JSON nesneleri üzerinde çalışır; bu tutarlılık, testerın iki farklı araç/sözdizimi arasında geçiş yapma yükünü ortadan kaldırır — I3\'teki hibrit testlerin temelini oluşturur.', en: 'The same `expect` API works on both `locator` and `response`/JSON objects; this consistency removes the burden of switching between two different tools/syntaxes — it is the foundation of the hybrid tests in I3.' },
      retryQuestion: {
        question: { tr: '`expect(response).toBeOK()` tam olarak neyi kontrol eder?', en: 'What exactly does `expect(response).toBeOK()` check?' },
        options: [
          { id: 'a', text: { tr: 'Status kodunun 200-299 (2xx) aralığında olduğunu', en: 'That the status code is in the 200-299 (2xx) range' } },
          { id: 'b', text: { tr: 'Sadece status kodunun tam olarak 200 olduğunu', en: 'Only that the status code is exactly 200' } },
          { id: 'c', text: { tr: 'Gövdenin boş olduğunu', en: 'That the body is empty' } },
          { id: 'd', text: { tr: 'Request\'in 1 saniyeden hızlı olduğunu', en: 'That the request is faster than 1 second' } },
        ],
        correct: 'a',
        explanation: { tr: '`toBeOK()`, H1\'deki tek bir `.statusCode(200)` kontrolünden farklı olarak, TÜM başarı aralığını (200, 201, 204 dahil 2xx) kontrol eden bir kısayoldur.', en: 'Unlike H1\'s single `.statusCode(200)` check, `toBeOK()` is a shortcut that checks the ENTIRE success range (2xx, including 200, 201, 204).' },
      },
    },
  ],
}

const I3 = {
  title: { tr: '🔀 I3 · Hibrit Güç: API ile kur, UI\'da doğrula', en: '🔀 I3 · Hybrid Power: Set Up with API, Verify in UI' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔀',
      content: {
        tr: 'Hibrit test, GRUP I\'nin (ve bu sayfanın) en güçlü fikirlerinden biridir: bir bug\'ı UI\'DAN OLUŞTURMAK (form doldur, butona tıkla — YAVAŞ ve KIRILGAN) yerine, `request.post(...)` ile API\'DEN doğrudan oluşturursun (HIZLI ve GÜVENİLİR), sonra SADECE test etmek istediğin şeyi (bug\'ın listede göründüğünü) tarayıcıda DOĞRULARSIN. Bu, bir tiyatro provasına benzer: her sahneyi baştan sona OYNAMAK yerine, sadece test etmek istediğin SAHNEYE ışıkları AÇARSIN — geri kalan dekor (10 bug kaydı) API ile SANİYELER içinde kurulur. Peki neden HER ŞEYİ UI ile kurmuyoruz — daha "gerçekçi" olmaz mıydı? Çünkü UI\'dan 10 bug oluşturmak dakikalar sürer ve HER adımda kırılma riski taşır (bir buton kayarsa TÜM test çöker); oysa test SENARYOSUNUN amacı genelde "listeleme özelliğinin doğru çalıştığını" görmektir, "bug oluşturma formunun" DEĞİL — o zaten B6/C4/D3\'te ayrıca test edildi. Java\'da bunun karşılığı, bir Selenium testinde veritabanına doğrudan test verisi ENJEKTE etmektir (`@Sql` script\'i gibi) — API burada o "hızlı veri kurma" katmanının GÜVENİLİR, sözleşmeye uygun (F GRUP) versiyonudur. **Derin Playwright UI otomasyonu için → `/playwright` sayfasına bak.**',
        en: 'Hybrid testing is one of GROUP I\'s (and this page\'s) most powerful ideas: instead of CREATING a bug FROM THE UI (fill a form, click a button — SLOW and FRAGILE), you create it directly FROM THE API with `request.post(...)` (FAST and RELIABLE), then ONLY VERIFY in the browser the thing you actually want to test (that the bug appears in the list). This is like a theater rehearsal: instead of PLAYING every scene start to finish, you turn the LIGHTS ON only for the SCENE you want to test — the rest of the set (10 bug records) is built with the API in SECONDS. So why not build EVERYTHING through the UI — wouldn\'t that be more "realistic"? Because creating 10 bugs from the UI takes minutes and carries a break risk at EVERY step (if one button shifts, the WHOLE test collapses); yet the test SCENARIO\'s goal is usually to see "the listing feature works correctly", NOT "the bug creation form" — that was already tested separately in B6/C4/D3. The Java equivalent is directly INJECTING test data into the database in a Selenium test (like an `@Sql` script) — here the API is the RELIABLE, contract-compliant (GROUP F) version of that "fast data setup" layer. **For deep Playwright UI automation → see the `/playwright` page.**',
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `test('yeni bug listede gorunur', async ({ request, page }) => {
  // 1. KURULUM: API ile HIZLICA bir bug olustur (UI'dan GECME)
  const created = await request.post('http://localhost:3000/api/v1/bugs', {
    data: { title: 'Odeme sayfasi 500 veriyor', severity: 'CRITICAL', reporter: 'tester@learnqa.dev' },
  })
  const bug = await created.json()

  // 2. DOGRULAMA: SADECE test edilen seyi tarayicida kontrol et
  await page.goto('http://localhost:3000/bugs')
  // TODO: yeni olusturulan bug'in listede GORUNDUGUNU dogrula
  await expect(page.getByText(bug.title)).toBeVisible()
})`,
        en: `test('new bug appears in the list', async ({ request, page }) => {
  // 1. SETUP: create a bug QUICKLY with the API (SKIP the UI)
  const created = await request.post('http://localhost:3000/api/v1/bugs', {
    data: { title: 'Payment page returns 500', severity: 'CRITICAL', reporter: 'tester@learnqa.dev' },
  })
  const bug = await created.json()

  // 2. VERIFICATION: check ONLY the thing under test, in the browser
  await page.goto('http://localhost:3000/bugs')
  // TODO: verify the newly created bug APPEARS in the list
  await expect(page.getByText(bug.title)).toBeVisible()
})`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-i3-hybrid-power-film',
      title: { tr: '🎬 API ile Kur, UI\'da Doğrula', en: '🎬 Set Up with API, Verify in UI' },
      xpReward: 15,
      sceneDurationMs: 3400,
      stageHeight: 280,
      actors: [
        { id: 'uiSlow', emoji: '🐢', label: { tr: 'UI ile kurulum: dakikalar', en: 'UI setup: minutes' }, color: '#ef4444' },
        { id: 'apiSetup', emoji: '⚡', label: { tr: 'API ile kurulum: saniyeler', en: 'API setup: seconds' }, color: '#f59e0b' },
        { id: 'bug', emoji: '🐛', label: { tr: 'Bug oluştu (id: 99)', en: 'Bug created (id: 99)' }, color: '#a78bfa' },
        { id: 'navigate', emoji: '🌐', label: { tr: 'Sadece listeye git', en: 'Only navigate to the list' }, color: '#0ea5e9' },
        { id: 'verify', emoji: '✅', label: { tr: 'Sadece bunu DOĞRULA', en: 'ONLY VERIFY this' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'YAVAŞ YOL: UI\'dan 10 bug oluşturmak — her biri form doldurma + tıklama + bekleme, dakikalar sürer ve KIRILGANdır.', en: 'THE SLOW PATH: creating 10 bugs from the UI — each one filling a form + clicking + waiting, taking minutes and being FRAGILE.' }, positions: { uiSlow: { x: 50, y: 40, scale: 1.1, pulse: true } } },
        { caption: { tr: 'HIZLI YOL: `request.post(...)` ile AYNI veri SANİYELER içinde, UI\'ya HİÇ dokunmadan oluşturulur.', en: 'THE FAST PATH: the SAME data is created in SECONDS with `request.post(...)`, WITHOUT touching the UI at all.' }, positions: { uiSlow: { x: 20, y: 30 }, apiSetup: { x: 58, y: 45, scale: 1.15, pulse: true } }, beams: [{ from: 'uiSlow', to: 'apiSetup', color: '#f59e0b' }] },
        { caption: { tr: 'API response\'undan gerçek bir `bug` nesnesi (id: 99) elde edilir — test verisi HAZIRDIR.', en: 'A real `bug` object (id: 99) is obtained from the API response — the test data is READY.' }, positions: { apiSetup: { x: 20, y: 35 }, bug: { x: 58, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'apiSetup', to: 'bug', color: '#a78bfa' }] },
        { caption: { tr: 'ANCAK ŞİMDİ tarayıcı açılır — `page.goto(...)` ile DOĞRUDAN bug listesine gidilir, kurulum adımları ATLANIR.', en: 'ONLY NOW does the browser open — `page.goto(...)` navigates DIRECTLY to the bug list, setup steps are SKIPPED.' }, positions: { bug: { x: 20, y: 35 }, navigate: { x: 58, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'bug', to: 'navigate', color: '#0ea5e9' }] },
        { caption: { tr: 'Ders — Test SADECE gerçekten test edilmek istenen şeyi (bug\'ın listede görünmesi) doğrular; kurulum HIZLI ve GÜVENİLİR API ile, doğrulama GERÇEK kullanıcı deneyimiyle (UI) yapılır.', en: 'The lesson — the test verifies ONLY the thing actually under test (the bug appearing in the list); setup happens via the FAST, RELIABLE API, verification happens via the REAL user experience (UI).' }, positions: { navigate: { x: 30, y: 45 }, verify: { x: 62, y: 50, scale: 1.2, pulse: true } }, beams: [{ from: 'navigate', to: 'verify', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Hibrit Bir Test Kurma Sırası', en: 'The Order for Building a Hybrid Test' },
      steps: [
        { id: 1, icon: '⚡', label: { tr: 'API ile kur…', en: 'Set up with the API…' }, detail: { tr: 'request.post(...) ile ihtiyaç duyulan veriyi (bug kaydı) hızlıca oluştur.', en: 'Quickly create the needed data (a bug record) with request.post(...).' } },
        { id: 2, icon: '🌐', label: { tr: 'Doğrudan hedefe git…', en: 'Navigate straight to the target…' }, detail: { tr: 'page.goto(...) ile gereksiz UI adımlarını atlayarak test edilecek sayfaya git.', en: 'Skip unnecessary UI steps and go straight to the page under test with page.goto(...).' } },
        { id: 3, icon: '✅', label: { tr: 'Sadece hedefi doğrula…', en: 'Verify only the target…' }, detail: { tr: 'expect(page...).toBeVisible() ile SADECE test edilmek istenen davranışı kontrol et.', en: 'Check ONLY the behavior actually under test with expect(page...).toBeVisible().' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-i3-order-01',
      question: { tr: 'Bir hibrit (API+UI) testin doğru akışını sırala.', en: 'Order the correct flow of a hybrid (API+UI) test.' },
      items: [
        { id: '1', text: { tr: 'request.post(...) ile API üzerinden test verisini oluştur', en: 'Create the test data via the API with request.post(...)' }, order: 1 },
        { id: '2', text: { tr: 'API response\'undan oluşturulan kaydın bilgilerini al', en: 'Get the created record\'s info from the API response' }, order: 2 },
        { id: '3', text: { tr: 'page.goto(...) ile doğrudan ilgili sayfaya git', en: 'Navigate directly to the relevant page with page.goto(...)' }, order: 3 },
        { id: '4', text: { tr: 'Sadece test edilen davranışı (görünürlük) doğrula', en: 'Verify only the behavior under test (visibility)' }, order: 4 },
        { id: '5', text: { tr: 'Testi tamamla, sonucu raporla', en: 'Complete the test, report the result' }, order: 5 },
      ],
      xpReward: 13,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-i3-hybrid-setup',
      id: 'api-i3-hybrid-setup',
      title: { tr: 'Kendin Dene: UI Kurulumunu API\'ye Taşı', en: 'Try It Yourself: Move the UI Setup to the API' },
      starterCode: { tr: `// BUG: her test bug'i UI'DAN olusturuyor - yavas ve kirilgan
test('yeni bug listede gorunur', async ({ page }) => {
  await page.goto('http://localhost:3000/bugs/new')
  await page.getByLabel('Title').fill('Odeme sayfasi 500 veriyor')
  await page.getByRole('button', { name: 'Kaydet' }).click()
  await page.goto('http://localhost:3000/bugs')
  await expect(page.getByText('Odeme sayfasi 500 veriyor')).toBeVisible()
})`, en: `// BUG: every test creates the bug FROM THE UI - slow and fragile
test('yeni bug listede gorunur', async ({ page }) => {
  await page.goto('http://localhost:3000/bugs/new')
  await page.getByLabel('Title').fill('Odeme sayfasi 500 veriyor')
  await page.getByRole('button', { name: 'Kaydet' }).click()
  await page.goto('http://localhost:3000/bugs')
  await expect(page.getByText('Odeme sayfasi 500 veriyor')).toBeVisible()
})` },
      solutionCode: `test('yeni bug listede gorunur', async ({ request, page }) => {
  const created = await request.post('http://localhost:3000/api/v1/bugs', {
    data: { title: 'Odeme sayfasi 500 veriyor', severity: 'CRITICAL', reporter: 'tester@learnqa.dev' },
  })
  const bug = await created.json()
  await page.goto('http://localhost:3000/bugs')
  await expect(page.getByText(bug.title)).toBeVisible()
})`,
      hint: { tr: 'Form doldurma/tıklama adımları YAVAŞ ve KIRILGANDIR; bu adımların amacı test SENARYOSUNUN parçası değilse (burada amaç "listeleme" çalışıyor mu), API ile hızlıca kurulup sadece doğrulama UI\'da yapılmalıdır.', en: 'Form-filling/clicking steps are SLOW and FRAGILE; if these steps are not part of the test SCENARIO (here the goal is "does listing work"), setup should be done quickly via the API, with only verification happening in the UI.' },
      successMessage: { tr: 'Doğru! Artık test çok daha hızlı ve sadece listeleme davranışına odaklanıyor.', en: 'Correct! Now the test is much faster and focused only on the listing behavior.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Bir bug\'ı test verisi olarak UI yerine API ile oluşturmanın en büyük avantajı nedir?', en: 'What is the biggest advantage of creating a bug as test data via the API instead of the UI?' },
      options: [
        { id: 'a', text: { tr: 'Çok daha hızlı ve güvenilirdir; test SADECE gerçekten test edilmek istenen davranışa (ör. listeleme) odaklanabilir', en: 'It is much faster and more reliable; the test can focus ONLY on the behavior actually under test (e.g. listing)' } },
        { id: 'b', text: { tr: 'UI testleri artık hiç gerekmez', en: 'UI tests are no longer needed at all' } },
        { id: 'c', text: { tr: 'Sunucu performansı artar', en: 'Server performance improves' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: 'Form doldurma/tıklama adımları yavaştır ve her adımda kırılma riski taşır. Test verisini API ile kurmak bu riski ortadan kaldırır ve testin SADECE gerçekten doğrulanmak istenen davranışa odaklanmasını sağlar — UI testleri hâlâ gereklidir, ama form/kurulum akışlarını AYRICA test etmek için (B6/C4/D3\'te olduğu gibi).', en: 'Form-filling/clicking steps are slow and carry a break risk at every step. Setting up test data via the API removes this risk and lets the test focus ONLY on the behavior actually being verified — UI tests are still necessary, but to test form/setup flows SEPARATELY (as in B6/C4/D3).' },
      retryQuestion: {
        question: { tr: 'Hibrit testin Java/Selenium dünyasındaki en yakın karşılığı nedir?', en: 'What is the closest Java/Selenium-world equivalent of a hybrid test?' },
        options: [
          { id: 'a', text: { tr: 'Test verisini bir @Sql script\'i veya doğrudan veritabanı enjeksiyonuyla hızlıca kurup, sadece UI davranışını Selenium ile doğrulamak', en: 'Quickly setting up test data with an @Sql script or direct database injection, then verifying only the UI behavior with Selenium' } },
          { id: 'b', text: { tr: 'Tüm testleri sadece UI ile yazmak', en: 'Writing all tests only through the UI' } },
          { id: 'c', text: { tr: 'Testleri hiç otomatikleştirmemek', en: 'Not automating tests at all' } },
          { id: 'd', text: { tr: 'Sadece manuel test yapmak', en: 'Only doing manual testing' } },
        ],
        correct: 'a',
        explanation: { tr: 'İkisi de aynı fikri taşır: yavaş/kırılgan bir kurulum katmanını (UI form doldurma) hızlı, güvenilir bir alternatifle (API çağrısı, DB script\'i) değiştirip, otomasyonun kısıtlı zamanını SADECE gerçek test hedefine ayırmak.', en: 'Both carry the same idea: replacing a slow/fragile setup layer (UI form filling) with a fast, reliable alternative (an API call, a DB script), spending automation\'s limited time ONLY on the real test target.' },
      },
    },
  ],
}

const I4 = {
  title: { tr: '🔑 I4 · storageState ile API üzerinden login', en: '🔑 I4 · Login via API with storageState' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🔑',
      content: {
        tr: '`storageState`, I3\'teki hibrit fikrin LOGIN\'e uygulanmış hâlidir: her testte UI\'dan kullanıcı adı/şifre yazıp "Giriş Yap"a tıklamak yerine (YAVAŞ, HER testte TEKRARLANAN bir adım), API üzerinden bir kez login olup dönen oturum bilgisini (cookie/token) bir DOSYAYA kaydedersin — sonraki her test bu dosyayı YÜKLEYEREK, sanki kullanıcı ZATEN giriş yapmış gibi başlar. Bu, Java\'da bir test SÜİTİNİN başında BİR KEZ oturum açıp o oturumu tüm testler arasında PAYLAŞMasına benzer (`@BeforeAll` ile bir kez kurup paylaşmak). Peki neden bu kadar önemli — login testi zaten I3\'te AYRICA test edilmedi mi? Çünkü GRUP I\'deki DİĞER testlerin (bug listesi, detay sayfası) AMACI login akışını test etmek DEĞİLDİR — her testin başında login formunu YENİDEN doldurmak, o testin ASIL amacından SAPMAK ve gereksiz kırılganlık eklemektir. **Derin Playwright auth/storageState rehberi için → `/playwright` sayfasına bak.**',
        en: '`storageState` is I3\'s hybrid idea applied to LOGIN: instead of typing a username/password in the UI and clicking "Log In" in every test (SLOW, a step REPEATED in every test), you log in ONCE via the API and save the resulting session info (cookie/token) to a FILE — every subsequent test LOADS this file and starts as if the user is ALREADY logged in. In Java this is similar to logging in ONCE at the start of a test SUITE and SHARING that session across all tests (setting it up once with `@BeforeAll` and sharing it). So why does this matter so much — wasn\'t login already tested SEPARATELY in I3? Because the OTHER tests in GROUP I (bug list, detail page) do NOT aim to test the login flow — REFILLING the login form at the start of every test DEVIATES from that test\'s ACTUAL purpose and adds needless fragility. **For a deep Playwright auth/storageState guide → see the `/playwright` page.**',
      },
    },
    {
      type: 'code',
      language: 'typescript',
      code: {
        tr: `// auth.setup.ts — TESTLERDEN ONCE BIR KEZ calisir
import { test as setup } from '@playwright/test'

setup('API ile giris yap', async ({ request }) => {
  const response = await request.post('http://localhost:3000/api/v1/login', {
    data: { email: 'tester@learnqa.dev', password: 'secret' },
  })
  // TODO: donen oturum bilgisini dosyaya kaydet
  await request.storageState({ path: 'auth.json' })
})

// bugs.spec.ts — auth.json KULLANARAK, login formunu HIC gormeden baslar
test.use({ storageState: 'auth.json' })
test('giris yapmis kullanici bug listesini gorur', async ({ page }) => {
  await page.goto('http://localhost:3000/bugs')  // zaten giris yapilmis
})`,
        en: `// auth.setup.ts — runs ONCE BEFORE the tests
import { test as setup } from '@playwright/test'

setup('log in via the API', async ({ request }) => {
  const response = await request.post('http://localhost:3000/api/v1/login', {
    data: { email: 'tester@learnqa.dev', password: 'secret' },
  })
  // TODO: save the returned session info to a file
  await request.storageState({ path: 'auth.json' })
})

// bugs.spec.ts — starts USING auth.json, NEVER seeing the login form
test.use({ storageState: 'auth.json' })
test('logged-in user sees the bug list', async ({ page }) => {
  await page.goto('http://localhost:3000/bugs')  // already logged in
})`,
      },
    },
    {
      type: 'video-scene',
      id: 'api-i4-storage-state-film',
      title: { tr: '🎬 Bir Kez Giriş, Yüzlerce Test', en: '🎬 One Login, Hundreds of Tests' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'repeat', emoji: '🔁', label: { tr: 'Her testte form + tıkla', en: 'Fill form + click in every test' }, color: '#ef4444' },
        { id: 'once', emoji: '🔑', label: { tr: 'API ile BİR KEZ login', en: 'ONE-TIME API login' }, color: '#f59e0b' },
        { id: 'save', emoji: '💾', label: { tr: 'auth.json\'a kaydet', en: 'Save to auth.json' }, color: '#0ea5e9' },
        { id: 'reuse', emoji: '♻️', label: { tr: 'Her test bunu YÜKLER', en: 'Every test LOADS it' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'YAVAŞ YOL: 50 test dosyası, HER BİRİ kendi login formunu doldurup butona tıklıyor — 50 kez tekrarlanan yavaş bir adım.', en: 'THE SLOW PATH: 50 test files, EACH filling its own login form and clicking — a slow step repeated 50 times.' }, positions: { repeat: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'HIZLI YOL: API üzerinden `POST /login` ile BİR KEZ giriş yapılır.', en: 'THE FAST PATH: log in ONCE via the API with `POST /login`.' }, positions: { repeat: { x: 20, y: 35 }, once: { x: 58, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'repeat', to: 'once', color: '#f59e0b' }] },
        { caption: { tr: 'Dönen oturum bilgisi (cookie/token) `auth.json` dosyasına kaydedilir.', en: 'The returned session info (cookie/token) is saved to `auth.json`.' }, positions: { once: { x: 20, y: 35 }, save: { x: 58, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'once', to: 'save', color: '#0ea5e9' }] },
        { caption: { tr: 'Ders — 50 test dosyasının HER BİRİ, artık `auth.json`\'u YÜKLEYEREK, login formunu HİÇ görmeden "zaten giriş yapmış" başlar.', en: 'The lesson — EACH of the 50 test files now starts "already logged in" by LOADING `auth.json`, NEVER seeing the login form.' }, positions: { save: { x: 30, y: 45 }, reuse: { x: 62, y: 50, scale: 1.2, pulse: true } }, beams: [{ from: 'save', to: 'reuse', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'API ile Login Paylaşma Sırası', en: 'The Order for Sharing an API Login' },
      steps: [
        { id: 1, icon: '🔑', label: { tr: 'Setup dosyası yaz…', en: 'Write a setup file…' }, detail: { tr: 'Testlerden önce çalışan bir setup projesi/dosyası oluştur.', en: 'Create a setup project/file that runs before the tests.' } },
        { id: 2, icon: '💾', label: { tr: 'Oturumu kaydet…', en: 'Save the session…' }, detail: { tr: 'API login sonrası storageState({ path: ... }) ile oturum bilgisini dosyaya yaz.', en: 'After API login, write the session info to a file with storageState({ path: ... }).' } },
        { id: 3, icon: '♻️', label: { tr: 'Testlerde yeniden kullan…', en: 'Reuse in tests…' }, detail: { tr: 'test.use({ storageState: ... }) ile bu dosyayı her test dosyasında paylaş.', en: 'Share this file across every test file with test.use({ storageState: ... }).' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-i4-order-01',
      question: { tr: 'storageState ile API login paylaşımını kurma sırasını diz.', en: 'Order the steps for setting up shared API login with storageState.' },
      items: [
        { id: '1', text: { tr: 'auth.setup.ts dosyasında API ile login request\'i gönder', en: 'Send the API login request in auth.setup.ts' }, order: 1 },
        { id: '2', text: { tr: 'Dönen oturumu storageState ile auth.json\'a kaydet', en: 'Save the returned session to auth.json with storageState' }, order: 2 },
        { id: '3', text: { tr: 'Test dosyalarında test.use({ storageState: ... }) yaz', en: 'Write test.use({ storageState: ... }) in test files' }, order: 3 },
        { id: '4', text: { tr: 'Testler artık login formunu görmeden başlar', en: 'Tests now start without seeing the login form' }, order: 4 },
        { id: '5', text: { tr: 'Giriş gerektiren sayfaları doğrudan test et', en: 'Test pages that require login directly' }, order: 5 },
      ],
      xpReward: 11,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-i4-storage-state-login',
      id: 'api-i4-storage-state-login',
      title: { tr: 'Kendin Dene: Tekrarlanan Login Adımlarını Kaldır', en: 'Try It Yourself: Remove the Repeated Login Steps' },
      starterCode: { tr: `// BUG: her test dosyasi login formunu AYRI AYRI dolduruyor
test('bug listesi gorunur', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('tester@learnqa.dev')
  await page.getByLabel('Sifre').fill('secret')
  await page.getByRole('button', { name: 'Giris' }).click()
  await page.goto('/bugs')
})`, en: `// BUG: every test file fills the login form SEPARATELY
test('bug listesi gorunur', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('tester@learnqa.dev')
  await page.getByLabel('Sifre').fill('secret')
  await page.getByRole('button', { name: 'Giris' }).click()
  await page.goto('/bugs')
})` },
      solutionCode: `// FIX: auth.json PAYLASILIYOR, login formu hic gorulmuyor
test.use({ storageState: 'auth.json' })
test('bug listesi gorunur', async ({ page }) => {
  await page.goto('/bugs')
})`,
      hint: { tr: 'Login formunu her test dosyasında ayrı ayrı doldurmak, o testin ASIL amacından (bug listesini test etmek) SAPAR ve gereksiz kırılganlık ekler. `storageState` bu tekrarı ortadan kaldırır.', en: 'Filling the login form separately in every test file DEVIATES from that test\'s ACTUAL purpose (testing the bug list) and adds needless fragility. `storageState` removes this repetition.' },
      successMessage: { tr: 'Doğru! Artık test sadece bug listesine odaklanıyor, login formunu tekrar tekrar doldurmuyor.', en: 'Correct! Now the test focuses only on the bug list, no longer refilling the login form repeatedly.' },
    },
    {
      type: 'quiz',
      question: { tr: '`storageState` ile API üzerinden bir kez login olup oturumu paylaşmanın en büyük avantajı nedir?', en: 'What is the biggest advantage of logging in once via the API and sharing the session with `storageState`?' },
      options: [
        { id: 'a', text: { tr: 'Her test dosyasının login formunu tekrar tekrar doldurma yükünden ve kırılganlığından kurtulur', en: 'It removes the burden and fragility of every test file refilling the login form repeatedly' } },
        { id: 'b', text: { tr: 'Kullanıcı şifresini değiştirir', en: 'It changes the user\'s password' } },
        { id: 'c', text: { tr: 'Veritabanını sıfırlar', en: 'It resets the database' } },
        { id: 'd', text: { tr: 'Hiçbir avantajı yoktur', en: 'It has no advantage' } },
      ],
      correct: 'a',
      explanation: { tr: 'Login formunu her test dosyasında ayrı ayrı doldurmak hem yavaştır hem de o testin gerçek amacından sapar. `storageState`, I3\'teki "sadece gerekeni kur" fikrini login\'e uygulayarak bu tekrarı ortadan kaldırır.', en: 'Filling the login form separately in every test file is both slow and deviates from that test\'s real purpose. `storageState` applies I3\'s "set up only what is needed" idea to login, removing this repetition.' },
      retryQuestion: {
        question: { tr: '`storageState` dosyasında tipik olarak ne saklanır?', en: 'What is typically stored in a `storageState` file?' },
        options: [
          { id: 'a', text: { tr: 'Oturum bilgisi: cookie\'ler ve/veya token\'lar', en: 'Session info: cookies and/or tokens' } },
          { id: 'b', text: { tr: 'Veritabanı şeması', en: 'The database schema' } },
          { id: 'c', text: { tr: 'Sunucunun kaynak kodu', en: 'The server\'s source code' } },
          { id: 'd', text: { tr: 'Test raporunun HTML çıktısı', en: 'The test report\'s HTML output' } },
        ],
        correct: 'a',
        explanation: { tr: '`storageState`, bir tarayıcı oturumunun kimlik durumunu (cookie\'ler, `localStorage`, token\'lar) bir dosyaya kaydeder — bu dosya yüklendiğinde tarayıcı sanki o kullanıcı ZATEN giriş yapmış gibi davranır.', en: '`storageState` saves a browser session\'s identity state (cookies, `localStorage`, tokens) to a file — when this file is loaded, the browser behaves as if that user is ALREADY logged in.' },
      },
    },
  ],
}

const I5 = {
  title: { tr: '⚔️ I5 · REST Assured ↔ Playwright Karşılaştırması', en: '⚔️ I5 · REST Assured ↔ Playwright Comparison' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '⚔️',
      content: {
        tr: 'GRUP H ve I\'yi bitirdikten sonra bir Java geliştiricisi olarak şu soruyu sormalısın: `/api/v1/bugs`\'u test etmek için REST Assured mü, Playwright mü? Cevap "ikisi de" ile başlar ama NEDEN\'i önemlidir: REST Assured, Java ekosisteminin İÇİNDE kalıp `Bug` POJO\'sunu (H3), `RequestSpecification`\'ı (H5) ve JUnit/TestNG raporlamasını (H6) DOĞRUDAN paylaşır — eğer takımın Selenium/REST Assured ile Java\'da yaşıyorsa, sürtünme SIFIRA yakındır. Playwright ise TypeScript\'te yaşar ve I3\'teki hibrit gücü (API+UI AYNI dosyada) sağlar — eğer takım zaten Playwright ile UI test yazıyorsa, API testlerini AYRI bir Java projesine (REST Assured) taşımak yerine AYNI TypeScript projesinde tutmak tutarlılık sağlar. Bu, "hangisi daha iyi" değil, **"takımın hangi dilde/ekosistemde yaşadığı"** sorusudur — tıpkı C6/D5\'teki Express/Nest kararı gibi. **Derin Playwright rehberi için → `/playwright` sayfasına bak.**',
        en: 'After finishing GROUP H and I, as a Java developer you should ask: to test `/api/v1/bugs`, REST Assured or Playwright? The answer starts with "both", but the WHY matters: REST Assured stays INSIDE the Java ecosystem and directly shares the `Bug` POJO (H3), `RequestSpecification` (H5), and JUnit/TestNG reporting (H6) — if your team lives in Java with Selenium/REST Assured, the friction is near ZERO. Playwright lives in TypeScript and provides I3\'s hybrid power (API+UI in the SAME file) — if the team already writes UI tests with Playwright, keeping API tests in the SAME TypeScript project instead of moving them to a separate Java project (REST Assured) provides consistency. This is not "which is better", it is the **"which language/ecosystem does the team live in"** question — just like the Express/Nest decision in C6/D5. **For a deep Playwright guide → see the `/playwright` page.**',
      },
    },
    { type: 'heading', text: { tr: 'Aynı Test, İki Dilde', en: 'The Same Test, in Two Languages' } },
    {
      type: 'table',
      headers: [{ tr: 'Konu', en: 'Topic' }, 'REST Assured (Java)', 'Playwright (TypeScript)'],
      rows: [
        [{ tr: 'Sözdizim başlangıcı', en: 'Syntax start' }, 'given().when().then()', 'const response = await request.get(...)'],
        [{ tr: 'Status doğrulama', en: 'Status check' }, '.statusCode(200)', 'expect(response.ok()).toBeTruthy()'],
        [{ tr: 'Alan doğrulama', en: 'Field check' }, '.body("title", equalTo(...))', 'expect(body.title).toBe(...)'],
        [{ tr: 'Şema doğrulama', en: 'Schema check' }, 'matchesJsonSchemaInClasspath(...)', { tr: 'ayrı bir kütüphane (örn. ajv) gerekir', en: 'requires a separate library (e.g. ajv)' }],
        [{ tr: 'UI ile hibrit', en: 'Hybrid with UI' }, { tr: 'Ayrı araç gerekir (Selenium + REST Assured)', en: 'Requires a separate tool (Selenium + REST Assured)' }, { tr: 'AYNI dosyada { request, page } — doğal', en: 'SAME file { request, page } — natural' }],
        [{ tr: 'Ekosistem', en: 'Ecosystem' }, { tr: 'Java/Maven — Selenium ile aynı dil', en: 'Java/Maven — same language as Selenium' }, { tr: 'TypeScript/npm — UI testleriyle aynı dil', en: 'TypeScript/npm — same language as UI tests' }],
        [{ tr: 'Çalıştırıcı', en: 'Runner' }, 'JUnit 5/TestNG + mvn test', { tr: 'Playwright Test Runner (dahili)', en: 'Playwright Test Runner (built-in)' }],
      ],
    },
    {
      type: 'video-scene',
      id: 'api-i5-compare-film',
      title: { tr: '🎬 Aynı Bug, İki Test Ekosistemi', en: '🎬 The Same Bug, Two Test Ecosystems' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 250,
      actors: [
        { id: 'request', emoji: '📤', label: { tr: 'GET /api/v1/bugs/42', en: 'GET /api/v1/bugs/42' }, color: '#f59e0b' },
        { id: 'ra', emoji: '☕', label: { tr: 'REST Assured (Java)', en: 'REST Assured (Java)' }, color: '#22c55e' },
        { id: 'pw', emoji: '🎭', label: { tr: 'Playwright (TypeScript)', en: 'Playwright (TypeScript)' }, color: '#0ea5e9' },
        { id: 'choice', emoji: '🤔', label: { tr: 'Takımın dili karar verir', en: 'The team\'s language decides' }, color: '#8b5cf6' },
      ],
      scenes: [
        { caption: { tr: 'Aynı `GET /api/v1/bugs/42` request\'i iki farklı ekosistemde test edilecek.', en: 'The same `GET /api/v1/bugs/42` request will be tested in two different ecosystems.' }, positions: { request: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'REST Assured: `given/when/then`, `Bug` POJO\'su, JUnit raporu — Java ekosisteminin İÇİNDE.', en: 'REST Assured: `given/when/then`, the `Bug` POJO, a JUnit report — INSIDE the Java ecosystem.' }, positions: { request: { x: 20, y: 30 }, ra: { x: 62, y: 30, scale: 1.15, pulse: true } }, beams: [{ from: 'request', to: 'ra', color: '#22c55e' }] },
        { caption: { tr: 'Playwright: `request`/`expect`, AYNI dosyada `page` ile UI\'a geçiş — TypeScript ekosisteminin İÇİNDE.', en: 'Playwright: `request`/`expect`, switching to `page` for UI in the SAME file — INSIDE the TypeScript ecosystem.' }, positions: { request: { x: 20, y: 65 }, pw: { x: 62, y: 65, scale: 1.15, pulse: true } }, beams: [{ from: 'request', to: 'pw', color: '#0ea5e9' }] },
        { caption: { tr: 'Ders — İkisi de AYNI endpoint\'i doğru test eder; seçim "hangisi daha iyi" değil, "takım hangi dilde yaşıyor, hibrit güç mü Java ekosistem entegrasyonu mu öncelikli" sorusuna bağlıdır.', en: 'The lesson — both correctly test the SAME endpoint; the choice is not "which is better", it depends on "which language the team lives in, is hybrid power or Java ecosystem integration the priority".' }, positions: { ra: { x: 30, y: 45 }, pw: { x: 50, y: 55 }, choice: { x: 68, y: 48, scale: 1.15, pulse: true } }, beams: [{ from: 'ra', to: 'choice', color: '#8b5cf6' }, { from: 'pw', to: 'choice', color: '#8b5cf6' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Doğru Aracı Seçme Sırası', en: 'The Order for Choosing the Right Tool' },
      steps: [
        { id: 1, icon: '👥', label: { tr: 'Takımın ekosistemine bak…', en: 'Look at the team\'s ecosystem…' }, detail: { tr: 'Takım zaten Java/Selenium mı yoksa TypeScript/Playwright ile mi çalışıyor?', en: 'Does the team already work in Java/Selenium or TypeScript/Playwright?' } },
        { id: 2, icon: '🔀', label: { tr: 'Hibrit ihtiyacı sor…', en: 'Ask about hybrid needs…' }, detail: { tr: 'API+UI aynı dosyada mı gerekli (I3), yoksa saf API testi mi yeterli?', en: 'Is API+UI needed in the same file (I3), or is pure API testing enough?' } },
        { id: 3, icon: '⚖️', label: { tr: 'Karar ver…', en: 'Decide…' }, detail: { tr: 'İkisi de doğru sonuca ulaşır; seçim ekosistem tutarlılığına dayanır.', en: 'Both reach the correct result; the choice rests on ecosystem consistency.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-i5-order-01',
      question: { tr: 'Aynı GET request\'inin REST Assured ve Playwright\'ta ORTAK doğrulama adımlarını sırala.', en: 'Order the COMMON verification steps for the same GET request in REST Assured and Playwright.' },
      items: [
        { id: '1', text: { tr: 'Request\'i gönder', en: 'Send the request' }, order: 1 },
        { id: '2', text: { tr: 'Status kodunu doğrula (2xx)', en: 'Verify the status code (2xx)' }, order: 2 },
        { id: '3', text: { tr: 'Gövdeyi ayrıştır (POJO veya JSON nesnesi)', en: 'Parse the body (POJO or JSON object)' }, order: 3 },
        { id: '4', text: { tr: 'Belirli alanları doğrula', en: 'Verify specific fields' }, order: 4 },
        { id: '5', text: { tr: 'Test çalıştırıcısı (JUnit/Playwright Runner) sonucu raporlar', en: 'The test runner (JUnit/Playwright Runner) reports the result' }, order: 5 },
      ],
      xpReward: 12,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-i5-comparison',
      id: 'api-i5-comparison',
      title: { tr: 'Kendin Dene: REST Assured Satırını Playwright\'a Çevir', en: 'Try It Yourself: Translate the REST Assured Line to Playwright' },
      starterCode: { tr: `// REST Assured (Java):
// given().baseUri("http://localhost:3000")
//   .when().get("/api/v1/bugs/42")
//   .then().statusCode(200).body("title", equalTo("Login butonu donuyor"));

// TODO: ayni dogrulamayi Playwright/TypeScript'te yaz
`, en: `// REST Assured (Java):
// given().baseUri("http://localhost:3000")
//   .when().get("/api/v1/bugs/42")
//   .then().statusCode(200).body("title", equalTo("Login butonu donuyor"));

// TODO: write the same assertion in Playwright/TypeScript
` },
      solutionCode: `// Playwright (TypeScript):
const response = await request.get('http://localhost:3000/api/v1/bugs/42')
expect(response.ok()).toBeTruthy()
const body = await response.json()
expect(body.title).toBe('Login butonu donuyor')`,
      hint: { tr: '`given/when/then` zinciri Playwright\'ta üç adıma bölünür: `request.get(...)` ile request\'i gönder, `response.ok()` ile status\'u, `response.json()` sonrası `expect(body.alan)` ile içeriği doğrula.', en: 'The `given/when/then` chain splits into three steps in Playwright: send the request with `request.get(...)`, verify status with `response.ok()`, verify content with `expect(body.field)` after `response.json()`.' },
      successMessage: { tr: 'Doğru! İki framework de aynı doğrulamayı taşıyor, sadece sözdizimi farklı.', en: 'Correct! Both frameworks carry the same verification, only the syntax differs.' },
    },
    {
      type: 'quiz',
      question: { tr: 'REST Assured ile Playwright arasında seçim yaparken en belirleyici faktör nedir?', en: 'What is the most decisive factor when choosing between REST Assured and Playwright?' },
      options: [
        { id: 'a', text: { tr: 'Takımın hangi dil/ekosistemde yaşadığı ve API+UI hibrit testine ihtiyaç olup olmadığı', en: 'Which language/ecosystem the team lives in, and whether API+UI hybrid testing is needed' } },
        { id: 'b', text: { tr: 'Hangisinin adı daha kısa olduğu', en: 'Which one has a shorter name' } },
        { id: 'c', text: { tr: 'Hangisinin daha eski olduğu', en: 'Which one is older' } },
        { id: 'd', text: { tr: 'Hiçbir fark yoktur, rastgele seçilebilir', en: 'There is no difference, either can be chosen at random' } },
      ],
      correct: 'a',
      explanation: { tr: 'REST Assured, Java/Selenium ekosisteminde yaşayan bir takım için sürtünmesizdir (aynı POJO\'lar, aynı JUnit raporlama). Playwright, TypeScript\'te UI testi yazan bir takım için I3\'teki hibrit gücü doğal olarak sağlar. Seçim, "hangisi daha iyi" değil, ekosistem uyumuna dayanır.', en: 'REST Assured is frictionless for a team living in the Java/Selenium ecosystem (same POJOs, same JUnit reporting). Playwright naturally provides I3\'s hybrid power for a team writing UI tests in TypeScript. The choice is not "which is better", it rests on ecosystem fit.' },
      retryQuestion: {
        question: { tr: 'Playwright\'ın REST Assured\'a göre en büyük farkı nedir?', en: 'What is Playwright\'s biggest difference from REST Assured?' },
        options: [
          { id: 'a', text: { tr: 'API ve UI testlerini AYNI dosyada, aynı test çalıştırıcısıyla birleştirebilmesi (I3)', en: 'Being able to combine API and UI tests in the SAME file, with the same test runner (I3)' } },
          { id: 'b', text: { tr: 'JSON desteklememesi', en: 'Not supporting JSON' } },
          { id: 'c', text: { tr: 'Sadece GET request\'lerini desteklemesi', en: 'Only supporting GET requests' } },
          { id: 'd', text: { tr: 'HTTP\'yi desteklememesi', en: 'Not supporting HTTP' } },
        ],
        correct: 'a',
        explanation: { tr: 'REST Assured saf bir API test kütüphanesidir; UI testi için ayrı bir araca (Selenium) geçmen gerekir. Playwright ise `request` ve `page` fixture\'larını AYNI dosyada, AYNI test çalıştırıcısıyla sunar — I3\'teki hibrit testlerin temeli budur.', en: 'REST Assured is a pure API testing library; you need to switch to a separate tool (Selenium) for UI testing. Playwright offers `request` and `page` fixtures in the SAME file, with the SAME test runner — this is the foundation of I3\'s hybrid tests.' },
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// GRUP J — Yaygın Hatalar (error-dictionary, kodsuz sekme — elle trio)
// ═══════════════════════════════════════════════════════════════════════════

const errorDiagnosisSvg = `<svg viewBox='0 0 680 170' xmlns='http://www.w3.org/2000/svg' style='background:#1e2030;border-radius:12px;font-family:sans-serif;'>
  <rect x='16' y='20' width='150' height='40' rx='8' fill='#3a1a1a'/><text x='30' y='45' fill='#f87171' font-size='12'>Error message</text>
  <path d='M 172 40 L 220 40' stroke='#f59e0b' stroke-width='2' marker-end='url(#arrowJ)'/>
  <defs><marker id='arrowJ' markerWidth='8' markerHeight='8' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 z' fill='#f59e0b'/></marker></defs>
  <rect x='224' y='20' width='150' height='40' rx='8' fill='#242640'/><text x='236' y='45' fill='#e5e7eb' font-size='12'>Which layer?</text>
  <path d='M 224 70 L 130 100' stroke='#0ea5e9' stroke-width='2'/>
  <path d='M 300 70 L 300 100' stroke='#0ea5e9' stroke-width='2'/>
  <path d='M 374 70 L 470 100' stroke='#0ea5e9' stroke-width='2'/>
  <rect x='60' y='108' width='140' height='40' rx='8' fill='#1a2e22'/><text x='72' y='132' fill='#4ade80' font-size='11'>Client/Network</text>
  <rect x='230' y='108' width='140' height='40' rx='8' fill='#1a2e22'/><text x='250' y='132' fill='#4ade80' font-size='11'>Server/Code</text>
  <rect x='420' y='108' width='140' height='40' rx='8' fill='#1a2e22'/><text x='438' y='132' fill='#4ade80' font-size='11'>Contract/Spec</text>
</svg>`

const J = {
  title: { tr: '🚨 J · Yaygın Hatalar ve Çözümleri', en: '🚨 J · Common Errors and Fixes' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '🚨',
      content: {
        tr: 'Bu sözlük, bir **doktorun ayırıcı tanı (differential diagnosis) el kitabı** gibidir: AYNI belirti (örn. "request başarısız oldu") onlarca FARKLI kök nedenden gelebilir, ve yanlış teşhis yanlış tedaviye (yanlış ekibe escalate) yol açar. GRUP A-I boyunca (B1\'deki eksik dependency, C3\'teki middleware sırası, F5\'teki contract defect, G4\'teki test zinciri) HER GRUP kendi hata sınıfını doğurdu — bu sözlük onları TEK bir referans noktasında TOPLAR. Java\'da bunun karşılığı bir "runbook"tur — production\'da bir alarm çaldığında hangi log\'a, hangi metriğe bakılacağını önceden yazılı olarak bilmek, panikle rastgele arama yapmaktan ÇOK daha hızlıdır. Peki bu sözlük neden ezberlemek yerine BAŞVURU kaynağı olarak kullanılmalı? Çünkü gerçek bir production ortamında karşılaşacağın hata mesajı BİREBİR burada olmayabilir — ama BURADAKİ 12 kalıp, "belirtiden kök nedene, kök nedenden doğru ekibe" giden DÜŞÜNME BİÇİMİNİ öğretir; bu düşünme biçimi her yeni, hiç görmediğin hataya da uygulanabilir.',
        en: 'This dictionary is like a **doctor\'s differential diagnosis handbook**: the SAME symptom (e.g. "the request failed") can come from dozens of DIFFERENT root causes, and a wrong diagnosis leads to wrong treatment (escalating to the wrong team). Throughout GROUP A-I (the missing dependency in B1, the middleware order in C3, the contract defect in F5, the test chain in G4), EVERY group birthed its own error class — this dictionary GATHERS them at ONE reference point. The Java equivalent is a "runbook" — knowing in advance which log, which metric to check when a production alarm fires is FAR faster than panicked random searching. So why should this dictionary be used as a REFERENCE rather than memorized? Because the exact error message you meet in a real production environment may NOT be EXACTLY here — but the 12 patterns HERE teach the WAY OF THINKING that goes "from symptom to root cause, from root cause to the right team"; this way of thinking applies to any new error you have never seen too.',
      },
    },
    {
      type: 'text',
      content: {
        tr: 'Aşağıdaki 12 hata, bu sayfa boyunca gördüğün gerçek senaryolara dayanır. Her giriş: belirti (gerçek hata mesajı), kök neden, bozuk/düzeltilmiş kod örneği ve testerın bunu HANGİ katmanda (istemci/network, sunucu/kod, sözleşme/spec) yakaladığını içerir.',
        en: 'The 12 errors below are based on real scenarios you saw throughout this page. Each entry includes: the symptom (the real error message), the root cause, a broken/fixed code example, and WHICH layer (client/network, server/code, contract/spec) the tester catches it in.',
      },
    },
    {
      type: 'diagram-svg',
      title: { tr: 'Bir Hatayı Katmana Göre Teşhis Etmek', en: 'Diagnosing an Error by Layer' },
      svg: errorDiagnosisSvg,
    },
    {
      type: 'video-scene',
      id: 'api-j-diagnosis-order-film',
      title: { tr: '🎬 Bir Hatanın Teşhis Sırası', en: '🎬 The Diagnosis Order for an Error' },
      xpReward: 13,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'symptom', emoji: '🚨', label: { tr: 'Belirti: request başarısız', en: 'Symptom: request failed' }, color: '#f59e0b' },
        { id: 'layer', emoji: '🔍', label: { tr: 'Which layer?', en: 'Which layer?' }, color: '#0ea5e9' },
        { id: 'client', emoji: '🌐', label: { tr: 'Client/Network mü?', en: 'Client/Network?' }, color: '#a78bfa' },
        { id: 'server', emoji: '🖥️', label: { tr: 'Server/Code mu?', en: 'Server/Code?' }, color: '#ef4444' },
        { id: 'contract', emoji: '📜', label: { tr: 'Contract/Spec mi?', en: 'Contract/Spec?' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Bir request başarısız oldu — ama "başarısız" tek başına HANGİ EKİBE gideceğini söylemez.', en: 'A request failed — but "failed" alone does not tell you WHICH TEAM to go to.' }, positions: { symptom: { x: 50, y: 50, scale: 1.1, pulse: true } } },
        { caption: { tr: 'İlk soru: bu HANGİ KATMANDA doğdu? Network paneli (GRUP E) ilk bakılacak yerdir.', en: 'First question: WHICH LAYER did this originate in? The Network panel (GROUP E) is the first place to check.' }, positions: { symptom: { x: 20, y: 35 }, layer: { x: 58, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'symptom', to: 'layer', color: '#0ea5e9' }] },
        { caption: { tr: 'Request sunucuya HİÇ ULAŞMADIYSA (ECONNREFUSED, CORS, timeout) → Client/Network katmanı.', en: 'If the request NEVER REACHED the server (ECONNREFUSED, CORS, timeout) → Client/Network layer.' }, positions: { layer: { x: 20, y: 65 }, client: { x: 58, y: 65, scale: 1.15, pulse: true } }, beams: [{ from: 'layer', to: 'client', color: '#a78bfa' }] },
        { caption: { tr: 'Request ULAŞTI ama yanlış/sessiz bir sonuç döndüyse (400 yerine 201, boş body) → Server/Code katmanı.', en: 'If the request REACHED but returned a wrong/silent result (201 instead of 400, empty body) → Server/Code layer.' }, positions: { layer: { x: 35, y: 40 }, server: { x: 62, y: 40, scale: 1.15, pulse: true } }, beams: [{ from: 'layer', to: 'server', color: '#ef4444' }] },
        { caption: { tr: 'Ders — Sunucu doğru çalıştı ama DOKÜMANLA uyuşmuyorsa (F5) → Contract/Spec katmanı. Doğru katmanı bulmak, doğru ekibe escalate etmenin ilk adımıdır.', en: 'The lesson — if the server worked correctly but does NOT match the DOCUMENT (F5) → Contract/Spec layer. Finding the right layer is the first step to escalating to the right team.' }, positions: { server: { x: 30, y: 45 }, contract: { x: 62, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'server', to: 'contract', color: '#22c55e' }] },
      ],
    },
    {
      type: 'error-dictionary',
      relatedTopicId: 'api-testing-common-errors',
      framework: 'API Testing',
      errors: [
        {
          error: '415 Unsupported Media Type',
          fullMessage: 'POST /api/v1/bugs -> 415 Unsupported Media Type',
          cause: {
            tr: 'Request gövdesi JSON olmasına rağmen `Content-Type` header\'ı eksik veya `text/plain` gibi yanlış — sunucu gövdeyi hangi formatta ayrıştıracağını bilemiyor.',
            en: 'The request body is JSON, but the `Content-Type` header is missing or wrong (like `text/plain`) — the server cannot know what format to parse the body as.',
          },
          solution: {
            tr: '`Content-Type: application/json` header\'ını EKLE. Tester bunu E3\'teki Headers sekmesinde, giden request\'in header\'larını kontrol ederek yakalar — istemci/network katmanı.',
            en: 'ADD the `Content-Type: application/json` header. The tester catches this by checking the outgoing request\'s headers in E3\'s Headers tab — client/network layer.',
          },
          codeWrong: `// BUG: Content-Type header'i eksik
fetch('/api/v1/bugs', {
  method: 'POST',
  body: JSON.stringify({ title: 'Login butonu donuyor' }),
})`,
          codeFixed: `// FIX: govdenin JSON oldugu ACIKCA belirtiliyor
fetch('/api/v1/bugs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Login butonu donuyor' }),
})`,
        },
        {
          error: { tr: '400 Bad Request vs 422 Unprocessable Entity karışıklığı', en: '400 Bad Request vs 422 Unprocessable Entity confusion' },
          fullMessage: { tr: 'POST /api/v1/bugs { "title": "ab" } -> 400 mü 422 mi dönmeli?', en: 'POST /api/v1/bugs { "title": "ab" } -> should it return 400 or 422?' },
          cause: {
            tr: '400, gövde HİÇ ayrıştırılamadığında (bozuk JSON); 422, gövde ayrıştırıldı ama bir İŞ KURALINI (minLength gibi) ihlal ettiğinde kullanılır. Çoğu API bu ayrımı yapmadan HER İKİ durumu da 400 döner — bu bir standart hatası değil ama sözleşmede AÇIKÇA belirtilmesi gerekir.',
            en: '400 is used when the body could NOT be parsed AT ALL (broken JSON); 422 is used when the body was parsed but violates a BUSINESS RULE (like minLength). Most APIs return 400 for BOTH cases without distinguishing — not a standards violation, but it must be EXPLICITLY stated in the contract.',
          },
          solution: {
            tr: 'F1/F4\'teki spec\'te hangi durumda hangi kodun döneceği NETLEŞTİRİLMELİDİR. Tester bu ayrımı F5\'teki contract testinde doğrular — sözleşme/spec katmanı.',
            en: 'F1/F4\'s spec must CLARIFY which code is returned in which case. The tester verifies this distinction in F5\'s contract test — contract/spec layer.',
          },
          codeWrong: `// BUG: sozlesmede hangi kodun donecegi belirtilmemis
// "gecersiz request" -> 400 mi 422 mi? Belirsiz.`,
          codeFixed: `// FIX: spec'te acikca ayristirilir
// bozuk JSON (parse hatasi) -> 400 Bad Request
// gecerli JSON ama is kurali ihlali (title cok kisa) -> 422 Unprocessable Entity`,
        },
        {
          error: { tr: 'CORS preflight request\'i başarısız', en: 'CORS preflight request failed' },
          fullMessage: "Access to fetch at 'http://localhost:3000/api/v1/bugs' from origin 'http://localhost:5173' has been blocked by CORS policy",
          cause: {
            tr: 'Tarayıcı, farklı bir origin\'e (portlar bile farklı origin sayılır) request atmadan önce bir `OPTIONS` request\'i (preflight) gönderir; sunucu bu request\'e `Access-Control-Allow-Origin` header\'ıyla CEVAP VERMEZSE tarayıcı GERÇEK request\'i hiç göndermez.',
            en: 'Before sending a request to a different origin (even a different port counts as a different origin), the browser sends an `OPTIONS` request (preflight); if the server does NOT RESPOND with an `Access-Control-Allow-Origin` header, the browser never sends the REAL request at all.',
          },
          solution: {
            tr: 'Backend\'e bir CORS middleware/config eklenmelidir. Tester bunu E grubundaki Network panelinde `OPTIONS` request\'inin response header\'larını inceleyerek yakalar — istemci/network katmanı (ama kök neden sunucu tarafı bir eksik konfigürasyondur).',
            en: 'A CORS middleware/config must be added to the backend. The tester catches this by inspecting the `OPTIONS` request\'s response headers in the GROUP E Network panel — client/network layer (though the root cause is a missing server-side configuration).',
          },
          codeWrong: `// BUG: sunucuda CORS middleware'i yok
const app = express()
app.post('/api/v1/bugs', handler)   // Access-Control-Allow-Origin HIC gonderilmiyor`,
          codeFixed: `// FIX: CORS middleware'i eklendi
const cors = require('cors')
const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.post('/api/v1/bugs', handler)`,
        },
        {
          error: 'ECONNREFUSED',
          fullMessage: 'Error: connect ECONNREFUSED 127.0.0.1:3000',
          cause: {
            tr: 'Sunucu o portta HİÇ dinlemiyor — ya hiç başlatılmamış, ya çökmüş, ya da yanlış porta bağlanmaya çalışılıyor (bkz. C1\'deki unutulan `app.listen`).',
            en: 'The server is NOT listening on that port at all — either it was never started, it crashed, or the wrong port is being connected to (see C1\'s forgotten `app.listen`).',
          },
          solution: {
            tr: 'Sunucunun GERÇEKTEN çalıştığını (`curl`/tarayıcı ile smoke test) doğrula, doğru portu kullandığını kontrol et. Tester bunu ilk request\'te, HİÇBİR response gelmeden yakalar — istemci/network katmanı.',
            en: 'Verify the server is REALLY running (a `curl`/browser smoke test), check it is using the right port. The tester catches this on the very first request, with NO response arriving at all — client/network layer.',
          },
          codeWrong: `// BUG: sunucu hicbir zaman baslatilmadi (app.listen eksik, bkz. C1)
const app = express()
app.get('/api/v1/bugs', handler)
// app.listen(3000) SATIRI YOK`,
          codeFixed: `const app = express()
app.get('/api/v1/bugs', handler)
app.listen(3000, () => console.log('Port 3000 dinleniyor'))`,
        },
        {
          error: { tr: '401 Unauthorized vs 403 Forbidden karışıklığı', en: '401 Unauthorized vs 403 Forbidden confusion' },
          fullMessage: 'DELETE /api/v1/bugs/42 -> beklenen 403, gelen 401 (veya tam tersi)',
          cause: {
            tr: 'Backend, "kimlik yok" (401) ile "kimlik var ama yetki yok" (403) senaryolarını AYNI kod ile karıştırıyor — genelde auth middleware\'i her iki durumda da 401 döndürüyor.',
            en: 'The backend confuses "no identity" (401) with "identity exists but no permission" (403) scenarios using the SAME code — usually the auth middleware returns 401 for both cases.',
          },
          solution: {
            tr: 'Backend\'de kimlik doğrulama (authentication) ve yetkilendirme (authorization) katmanları AYRI kontrol edilmeli (bkz. A5). Tester bunu iki AYRI negatif testle (token yok / token var ama yetki yok) doğrular — sunucu/kod katmanı.',
            en: 'Authentication and authorization checks must be SEPARATE layers on the backend (see A5). The tester verifies this with two SEPARATE negative tests (no token / token exists but no permission) — server/code layer.',
          },
          codeWrong: `// BUG: yetki kontrolu YOK, sadece token varligi kontrol ediliyor
if (!token) return res.status(401).send()
// TODO: token gecerli ama BU KAYNAGA yetkisi var mi kontrolu eksik
next()`,
          codeFixed: `if (!token) return res.status(401).send()   // kimlik yok
if (!userCanDelete(token, bugId)) return res.status(403).send()   // yetki yok
next()`,
        },
        {
          error: 'Trailing slash 404',
          fullMessage: 'GET /api/v1/bugs/ (sonda slash ile) -> 404 Not Found',
          cause: {
            tr: 'Bazı framework\'lerde (özellikle strict routing açıksa) `/api/v1/bugs` ile `/api/v1/bugs/` FARKLI route\'lar sayılır — sonda slash olan request TANIMSIZ kalır.',
            en: 'In some frameworks (especially with strict routing enabled), `/api/v1/bugs` and `/api/v1/bugs/` are counted as DIFFERENT routes — the request with a trailing slash stays UNDEFINED.',
          },
          solution: {
            tr: 'Framework\'ün strict routing ayarı kapatılmalı veya her iki varyant da tanımlanmalıdır. Tester bunu hem slash\'li hem slash\'sız versiyonu deneyerek yakalar — istemci/network katmanı (ama kök neden sunucu route yapılandırmasıdır).',
            en: 'The framework\'s strict routing setting must be disabled, or both variants defined. The tester catches this by trying both the with-slash and without-slash versions — client/network layer (though the root cause is server route configuration).',
          },
          codeWrong: `// BUG: strict routing acik, sadece TEK varyant calisiyor
const app = express()
app.set('strict routing', true)
app.get('/api/v1/bugs', handler)   // /api/v1/bugs/ 404 doner`,
          codeFixed: `const app = express()
app.set('strict routing', false)   // her iki varyant da calisir
app.get('/api/v1/bugs', handler)`,
        },
        {
          error: { tr: 'Content-Type eksikliğinden boş body (req.body undefined)', en: 'Empty body due to missing Content-Type (req.body undefined)' },
          fullMessage: { tr: 'POST /api/v1/bugs -> 201 Created ama title: undefined ile kayıt oluştu', en: 'POST /api/v1/bugs -> 201 Created but a record was saved with title: undefined' },
          cause: {
            tr: 'İstemci `Content-Type: application/json` göndermeden JSON gövde yolladı; sunucudaki gövde ayrıştırıcı (`express.json()`) bu request\'i JSON olarak TANIMAZ, `req.body` boş kalır — ama validation da yoksa sunucu yine de 201 döner (bkz. C3, C4).',
            en: 'The client sent a JSON body without `Content-Type: application/json`; the server\'s body parser (`express.json()`) does NOT RECOGNIZE this request as JSON, `req.body` stays empty — but if there is no validation either, the server still returns 201 (see C3, C4).',
          },
          solution: {
            tr: 'İstemci tarafında `Content-Type` header\'ı eklenmeli, sunucu tarafında ise boş/eksik zorunlu alanlar için validation (B6/C4/D3) devrede olmalıdır. Tester bunu POST sonrası GET ile kaydı okuyup boş alanları görerek yakalar — hem istemci hem sunucu/kod katmanı.',
            en: 'The client must add the `Content-Type` header, and the server must have validation (B6/C4/D3) active for empty/missing required fields. The tester catches this by reading the record back with a GET after POST and seeing empty fields — both client AND server/code layer.',
          },
          codeWrong: `// BUG: Content-Type eksik + sunucuda validation yok
fetch('/api/v1/bugs', { method: 'POST', body: JSON.stringify({ title: 'x' }) })`,
          codeFixed: `fetch('/api/v1/bugs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'x' }),
})`,
        },
        {
          error: { tr: 'Tarih formatı parse hatası', en: 'Date format parse error' },
          fullMessage: { tr: 'createdAt: "24/07/2026" -> istemci Date.parse() ile \'Invalid Date\' üretir', en: 'createdAt: "24/07/2026" -> the client produces \'Invalid Date\' via Date.parse()' },
          cause: {
            tr: 'Backend, F4\'teki spec\'in vaat ettiği ISO-8601 (`2026-07-24T10:00:00Z`) yerine yerel bir formatta (`gün/ay/yıl`) tarih dönüyor — bu bir F5 tarzı contract defect\'idir (alan tipi/format uyumsuzluğu).',
            en: 'Instead of the ISO-8601 format promised by F4\'s spec (`2026-07-24T10:00:00Z`), the backend returns a date in a local format (`day/month/year`) — this is an F5-style contract defect (field type/format mismatch).',
          },
          solution: {
            tr: 'Backend\'de tarih serialization\'ı ISO-8601 olarak SABİTLENMELİDİR (JSON\'da tarih standardı budur). Tester bunu H4\'teki JSON Schema Validation\'ın `format: date-time` kontrolüyle otomatik yakalar — sözleşme/spec katmanı.',
            en: 'Date serialization on the backend must be PINNED to ISO-8601 (the JSON standard for dates). The tester catches this automatically with H4\'s JSON Schema Validation `format: date-time` check — contract/spec layer.',
          },
          codeWrong: `// BUG: yerel format donuluyor, spec ISO-8601 vaat ediyor
res.json({ ...bug, createdAt: '24/07/2026' })`,
          codeFixed: `res.json({ ...bug, createdAt: new Date().toISOString() })   // 2026-07-24T10:00:00.000Z`,
        },
        {
          error: { tr: 'null vs alan yokluğu', en: 'null vs absent field' },
          fullMessage: { tr: '{ "reporter": null } vs { } (reporter alanı hiç yok)', en: '{ "reporter": null } vs { } (reporter field entirely absent)' },
          cause: {
            tr: '`null`, alanın VAR olduğu ama değerinin bilinçli olarak boş olduğu anlamına gelir; alanın HİÇ olmaması ise anahtarın kaybolduğu (olası bir contract regresyonu) anlamına gelir — ikisi AYNI şey DEĞİLDİR ama zayıf bir kontrol (`if (!bug.reporter)`) ikisini de aynı sayar.',
            en: '`null` means the field EXISTS but its value is intentionally empty; the field being ENTIRELY absent means the key vanished (a possible contract regression) — the two are NOT the SAME thing, but a weak check (`if (!bug.reporter)`) treats them identically.',
          },
          solution: {
            tr: 'İstemci kodu `hasOwnProperty`/`in` operatörüyle alanın VARLIĞINI, ayrı bir kontrolle DEĞERİNİ kontrol etmelidir. Tester bunu iki AYRI senaryo (null gönder / alanı hiç gönderme) ile test eder — sözleşme/spec katmanı.',
            en: 'Client code should check the field\'s EXISTENCE with `hasOwnProperty`/the `in` operator, and its VALUE with a separate check. The tester tests this with two SEPARATE scenarios (send null / never send the field) — contract/spec layer.',
          },
          codeWrong: `// BUG: null ile "alan yok" ayni sayiliyor
if (!bug.reporter) {
  console.log('reporter eksik')   // null icin de, alan yoksa da AYNI davranir
}`,
          codeFixed: `if (!('reporter' in bug)) {
  console.log('reporter alani HIC YOK — olasi contract regresyonu')
} else if (bug.reporter === null) {
  console.log('reporter bilincli olarak bos birakilmis')
}`,
        },
        {
          error: 'Request timeout',
          fullMessage: 'Error: timeout of 5000ms exceeded / 504 Gateway Timeout',
          cause: {
            tr: 'Sunucu belirlenen sürede response VERMİYOR — ya işlem gerçekten çok yavaş (E4\'teki gibi büyük bir `Waiting` süresi), ya da sunucu bir yerde SONSUZ DÖNGÜYE girmiş/kilitlenmiştir.',
            en: 'The server does NOT respond within the given time — either the operation is genuinely very slow (a large `Waiting` duration like in E4), or the server is stuck in an INFINITE LOOP/deadlock somewhere.',
          },
          solution: {
            tr: 'E4\'teki Timing sekmesiyle HANGİ fazın (Waiting mi, Content Download mu) uzun sürdüğü belirlenmelidir. Tester bunu timeout hatası aldığında ilk elden Timing verisiyle teşhis eder — sunucu/kod katmanı.',
            en: 'E4\'s Timing tab must be used to identify WHICH phase (Waiting or Content Download) is taking long. The tester diagnoses this firsthand with Timing data when a timeout error occurs — server/code layer.',
          },
          codeWrong: `// BUG: sorgu N+1 sorunu yuzunden asiri yavas (bkz. E5)
const bugs = await Bug.findAll()
for (const bug of bugs) {
  bug.details = await Detail.findOne({ bugId: bug.id })   // HER kayit icin ayri sorgu
}`,
          codeFixed: `// FIX: tek sorguda JOIN ile getir
const bugs = await Bug.findAll({ include: [Detail] })`,
        },
        {
          error: 'gzip/encoding sorunu',
          fullMessage: { tr: 'Response gövdesi bozuk karakterlerle geliyor -> JSON.parse() SyntaxError verir', en: 'The response body arrives with corrupted characters -> JSON.parse() throws SyntaxError' },
          cause: {
            tr: 'Sunucu response\'u `Content-Encoding: gzip` ile sıkıştırıp gönderiyor ama istemci (veya aradaki bir proxy) bunu doğru DECODE etmiyor — ham, sıkıştırılmış baytlar metin olarak okunmaya çalışılıyor.',
            en: 'The server sends the response compressed with `Content-Encoding: gzip`, but the client (or an intermediate proxy) does not DECODE it correctly — raw, compressed bytes are being read as text.',
          },
          solution: {
            tr: 'İstemcinin `Accept-Encoding` header\'ı ve otomatik decode desteği doğrulanmalıdır. Tester bunu Headers sekmesinde `Content-Encoding` alanını kontrol edip, gövdenin GERÇEKTEN doğru decode edildiğini doğrulayarak yakalar — istemci/network katmanı.',
            en: 'The client\'s `Accept-Encoding` header and automatic decode support must be verified. The tester catches this by checking the `Content-Encoding` field in the Headers tab and verifying the body is REALLY decoded correctly — client/network layer.',
          },
          codeWrong: `// BUG: gzip yanit elle, decode ETMEDEN okunuyor
const raw = await response.arrayBuffer()
const text = new TextDecoder().decode(raw)   // sikistirilmis baytlar CIG olarak okunuyor`,
          codeFixed: `// FIX: fetch/http kutuphanesi gzip'i OTOMATIK decode eder, elle mudahale etme
const body = await response.json()   // dogru sekilde decode edilmis veri`,
        },
        {
          error: { tr: 'Postman\'de çalışıp otomasyonda düşen test', en: 'Test that passes in Postman but fails in automation' },
          fullMessage: { tr: 'Postman: tüm request\'ler PASS. CI\'daki Newman/Playwright koşumu: aynı senaryo FAIL.', en: 'Postman: all requests PASS. Newman/Playwright run in CI: same scenario FAILs.' },
          cause: {
            tr: 'Postman\'de request\'ler genelde ELLE, SIRAYLA çalıştırılır ve önceki bir koşumdan kalan veriye (sabit bir `id`, önceden oluşturulmuş bir kayıt) SESSİZCE güvenilir; CI\'da ise her koşum TEMİZ bir ortamda, bazen PARALEL çalışır — o "hazır" veri artık YOKTUR.',
            en: 'In Postman, requests are usually run MANUALLY, IN ORDER, and SILENTLY rely on data left over from a previous run (a fixed `id`, a pre-created record); in CI, every run happens in a CLEAN environment, sometimes PARALLEL — that "ready" data no longer EXISTS.',
          },
          solution: {
            tr: 'Her testin KENDİ bağımsız verisini oluşturması gerekir (G4\'teki test zincirleme mantığı) — sabit/varsayılan id\'lere GÜVENİLMEMELİDİR. Tester bunu testi TEMİZ bir ortamda (veya CI\'da) tekrar çalıştırarak yakalar — sunucu/kod katmanı değil, TEST TASARIMI katmanı.',
            en: 'Every test must create its OWN independent data (the test-chaining logic from G4) — fixed/default ids must NOT be TRUSTED. The tester catches this by re-running the test in a CLEAN environment (or in CI) — not the server/code layer, the TEST DESIGN layer.',
          },
          codeWrong: `// BUG: sabit id'ye guveniliyor, oncesinde MANUEL olusturulmus varsayiliyor
pm.test('bug detayi dogru', () => {
  pm.sendRequest('{{baseUrl}}/api/v1/bugs/1', (err, res) => {   // id=1 HER ZAMAN var mi?
    pm.expect(res.code).to.eql(200)
  })
})`,
          codeFixed: `// FIX: test KENDI verisini olusturup ONA referansla calisir (G4'teki zincirleme)
pm.test('bug olustur ve detayini dogrula', () => {
  // 1. once POST ile YENI bir bug olustur, id'yi {{bugId}}'e kaydet
  // 2. GET {{baseUrl}}/api/v1/bugs/{{bugId}} ile SADECE kendi olusturdugunu sorgula
})`,
        },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Belirtiden Doğru Ekibe', en: 'From Symptom to the Right Team' },
      steps: [
        { id: 1, icon: '🚨', label: { tr: 'Belirtiyi topla…', en: 'Gather the symptom…' }, detail: { tr: 'Gerçek hata mesajını, status kodunu, hangi request\'te olduğunu not al.', en: 'Note the real error message, status code, and which request it occurred on.' } },
        { id: 2, icon: '🔍', label: { tr: 'Katmanı belirle…', en: 'Identify the layer…' }, detail: { tr: 'Request sunucuya ulaştı mı (Network paneli)? Ulaştıysa response sözleşmeye uyuyor mu (spec)?', en: 'Did the request reach the server (Network panel)? If so, does the response match the contract (spec)?' } },
        { id: 3, icon: '📋', label: { tr: 'Bu sözlükle eşleştir…', en: 'Match against this dictionary…' }, detail: { tr: '12 kalıptan biriyle örtüşüyor mu, örtüşmüyorsa aynı DÜŞÜNME BİÇİMİNİ yeni hataya uygula.', en: 'Does it match one of the 12 patterns? If not, apply the same WAY OF THINKING to the new error.' } },
      ],
    },
    {
      type: 'challenge',
      variant: 'order-sort',
      id: 'api-j-order-01',
      question: { tr: 'Bir API hatasını teşhis etme sırasını diz.', en: 'Order the steps for diagnosing an API error.' },
      items: [
        { id: '1', text: { tr: 'Gerçek hata mesajını ve status kodunu kaydet', en: 'Record the real error message and status code' }, order: 1 },
        { id: '2', text: { tr: 'Request\'in sunucuya ulaşıp ulaşmadığını Network panelinde kontrol et', en: 'Check in the Network panel whether the request reached the server' }, order: 2 },
        { id: '3', text: { tr: 'Ulaştıysa response\'un sözleşmeye (spec) uyup uymadığını kontrol et', en: 'If it reached, check whether the response matches the contract (spec)' } , order: 3 },
        { id: '4', text: { tr: 'Bu sözlükteki 12 kalıptan biriyle eşleştir', en: 'Match it against one of the 12 patterns in this dictionary' }, order: 4 },
        { id: '5', text: { tr: 'Doğru ekibe (istemci/sunucu/spec sahibi) escalate et', en: 'Escalate to the right team (client/server/spec owner)' }, order: 5 },
      ],
      xpReward: 12,
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-j-error-layer-diagnosis',
      id: 'api-j-error-layer-diagnosis',
      title: { tr: 'Kendin Dene: Hatayı Doğru Katmana Yönlendir', en: 'Try It Yourself: Route the Error to the Right Layer' },
      starterCode: { tr: `// Hata: "Access to fetch at '...' has been blocked by CORS policy"
// TODO: bu hata hangi katmanda dogar - istemci/network mi, sunucu/kod mu, sozlesme/spec mi?
Katman: ???`, en: `// Error: "Access to fetch at '...' has been blocked by CORS policy"
// TODO: in which layer does this error arise - client/network, server/code, or contract/spec?
Katman: ???` },
      solutionCode: { tr: `// CORS, sunucunun OPTIONS istegine dogru header ile cevap vermemesinden dogar
// ama tester bunu Network panelinde (istemci/network katmaninda) GOZLEMLER
Katman: Istemci/Network (Network panelinde gozlemlenir, kok neden sunucu config eksikligi)`, en: `// CORS arises when the server does not answer the OPTIONS request with the right header
// but the tester OBSERVES this in the Network panel (the client/network layer)
Katman: Istemci/Network (Network panelinde gozlemlenir, kok neden sunucu config eksikligi)` },
      hint: { tr: 'Bazı hataların kök nedeni bir katmanda (sunucu config), ama testerın onu İLK GÖZLEMLEDİĞİ yer başka bir katman (Network paneli) olabilir. Bu sözlükteki her giriş ikisini de ayırt eder.', en: 'Some errors have their root cause in one layer (server config), but the layer a tester FIRST OBSERVES them in can be different (the Network panel). Every entry in this dictionary distinguishes between the two.' },
      successMessage: { tr: 'Doğru! Katman teşhisi, doğru ekibe hızlı escalate etmenin anahtarıdır.', en: 'Correct! Layer diagnosis is the key to fast, correct escalation.' },
    },
    {
      type: 'quiz',
      question: { tr: 'Postman\'de PASS olan bir test CI\'da neden FAIL olabilir?', en: 'Why might a test that PASSes in Postman FAIL in CI?' },
      options: [
        { id: 'a', text: { tr: 'Postman\'de sabit/önceden var olan veriye sessizce güvenilmiş olabilir; CI temiz bir ortamda çalışır ve o veri yoktur', en: 'Postman may have silently relied on fixed/pre-existing data; CI runs in a clean environment where that data does not exist' } },
        { id: 'b', text: { tr: 'CI her zaman yanlış sonuç üretir', en: 'CI always produces wrong results' } },
        { id: 'c', text: { tr: 'Postman testleri hiçbir zaman güvenilir değildir', en: 'Postman tests are never reliable' } },
        { id: 'd', text: { tr: 'Bu asla olmaz', en: 'This never happens' } },
      ],
      correct: 'a',
      explanation: { tr: 'Postman\'de elle, sırayla çalıştırılan testler önceki koşumdan kalan veriye (sabit id gibi) sessizce güvenebilir. CI temiz/paralel bir ortamda çalıştığından bu veri yoktur — çözüm her testin G4\'teki gibi kendi verisini oluşturmasıdır.', en: 'Tests run manually, in order, in Postman can silently rely on data left from a previous run (like a fixed id). Since CI runs in a clean/parallel environment, that data does not exist — the fix is for every test to create its own data, as in G4.' },
      retryQuestion: {
        question: { tr: '`null` bir alan değeri ile alanın HİÇ olmaması arasındaki fark neden önemlidir?', en: 'Why does the difference between a `null` field value and the field being entirely absent matter?' },
        options: [
          { id: 'a', text: { tr: 'null bilinçli bir veri durumudur, alanın yokluğu ise bir contract regresyonu olabilir — zayıf bir kontrol ikisini karıştırabilir', en: 'null is an intentional data state, absence of the field can be a contract regression — a weak check can conflate the two' } },
          { id: 'b', text: { tr: 'Hiçbir farkı yoktur', en: 'There is no difference' } },
          { id: 'c', text: { tr: 'null her zaman bir hatadır', en: 'null is always an error' } },
          { id: 'd', text: { tr: 'Alanın yokluğu her zaman güvenlidir', en: 'A field\'s absence is always safe' } },
        ],
        correct: 'a',
        explanation: { tr: '`if (!bug.reporter)` gibi zayıf bir kontrol hem `null` hem "alan yok" durumunu aynı sayar; oysa biri bilinçli bir veri durumu, diğeri sessiz bir sözleşme kaybı olabilir — ayırt etmek için `hasOwnProperty`/`in` gerekir.', en: 'A weak check like `if (!bug.reporter)` treats both `null` and "field absent" the same; but one is an intentional data state, the other can be a silent contract loss — `hasOwnProperty`/`in` is needed to distinguish them.' },
      },
    },
  ],
}

const K = {
  title: { tr: '💼 K · Mülakat Soruları', en: '💼 K · Interview Questions' },
  blocks: [
    {
      type: 'simple-box',
      emoji: '💼',
      content: {
        tr: 'Bu sekme, A\'dan J\'ye kadar bu sayfada geliştirdiğin (Java/Spring, Express, NestJS) ve test ettiğin (DevTools, Swagger, Postman, REST Assured, Playwright) her şeyin **mülakat sınavına** dönüşmüş hâlidir — bir mülakatçı "X nedir?" diye sormaz, "production\'da şunu gördün, ne yaparsın?" diye sorar, tıpkı B1\'deki eksik `starter-validation`\'ı veya F5\'teki "kod doğru, doküman eski" senaryosunu yaşamış biri gibi. Bu 50 soru, sayfa boyunca gördüğün GERÇEK defect\'lere ve kararlara dayanır; ezberlemek yerine, her sorunun ARKASINDAKİ mekanizmayı (neden bu bug oluştu, tester nerede yakaladı) hatırlarsan cevap kendiliğinden gelir.',
        en: 'This tab is the **interview exam** version of everything you built (Java/Spring, Express, NestJS) and tested (DevTools, Swagger, Postman, REST Assured, Playwright) on this page from A to J — an interviewer does not ask "what is X?", they ask "you saw this in production, what do you do?", just like someone who lived through B1\'s missing `starter-validation` or F5\'s "code is right, doc is old" scenario. These 50 questions are based on the REAL defects and decisions you saw throughout the page; instead of memorizing, if you remember the mechanism BEHIND each question (why this bug happened, where the tester caught it), the answer comes naturally.',
      },
    },
    {
      type: 'video-scene',
      id: 'api-k-interview-layers-film',
      title: { tr: '🎬 Mülakat Katmanları: API vs UI Testi', en: '🎬 Interview Layers: API vs UI Testing' },
      xpReward: 12,
      sceneDurationMs: 3400,
      stageHeight: 260,
      actors: [
        { id: 'interviewer', emoji: '🎙️', label: { tr: 'Mülakatçı: senaryo sorusu', en: 'Interviewer: scenario question' }, color: '#6366f1' },
        { id: 'ui', emoji: '🖥️', label: { tr: 'UI: "çalışıyor gibi"', en: 'UI: "looks fine"' }, color: '#f59e0b' },
        { id: 'api', emoji: '🔌', label: { tr: 'API katmanı: gerçek', en: 'API layer: the truth' }, color: '#0ea5e9' },
        { id: 'defect', emoji: '🐞', label: { tr: 'Kök neden / defect', en: 'Root cause / defect' }, color: '#ef4444' },
        { id: 'answer', emoji: '💡', label: { tr: 'Güçlü cevap', en: 'Strong answer' }, color: '#22c55e' },
      ],
      scenes: [
        { caption: { tr: 'Mülakatçı "API nedir?" sormaz — "UI\'da her şey normal görünüyor ama bir bug var, nasıl bulursun?" der. Ölçtüğü şey ezber değil, katman düşüncesi.', en: 'The interviewer does not ask "what is an API?" — they ask "everything looks normal in the UI but there is a bug, how do you find it?". What they measure is layer thinking, not memorization.' }, positions: { interviewer: { x: 50, y: 45, scale: 1.15, pulse: true } } },
        { caption: { tr: 'Zayıf aday UI ekranına bakar: "Ekranda hata yok, sorun yok." Bu, UI\'nın gösterdiği metne güvenmenin tuzağıdır (GRUP E).', en: 'A weak candidate looks at the UI screen: "no error on screen, no problem." This is the trap of trusting the text the UI shows (GROUP E).' }, positions: { interviewer: { x: 20, y: 30 }, ui: { x: 58, y: 50, scale: 1.1, pulse: true } }, beams: [{ from: 'interviewer', to: 'ui', color: '#f59e0b' }] },
        { caption: { tr: 'Güçlü aday UI\'yı bypass eder ve doğrudan API katmanına iner: `POST /api/v1/bugs` boş title ile 400 yerine 201 dönüyor mu? Gerçek burada saklı.', en: 'A strong candidate bypasses the UI and drops down to the API layer directly: does `POST /api/v1/bugs` with an empty title return 201 instead of 400? The truth is hidden here.' }, positions: { ui: { x: 20, y: 60 }, api: { x: 58, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'ui', to: 'api', color: '#0ea5e9' }] },
        { caption: { tr: 'API katmanı defect\'i ortaya çıkarır: geliştirici B6\'daki `@Valid` kapısını unutmuş, UI\'nın JS kontrolü bu boşluğu gizliyordu. Kök neden bulundu.', en: 'The API layer reveals the defect: the developer forgot the `@Valid` gate from B6, and the UI\'s JS check was hiding this gap. The root cause is found.' }, positions: { api: { x: 25, y: 40 }, defect: { x: 62, y: 50, scale: 1.15, pulse: true } }, beams: [{ from: 'api', to: 'defect', color: '#ef4444' }] },
        { caption: { tr: 'Ders — Güçlü cevap katmanı ADIYLA söyler: "UI valide ediyor ama sunucuda `@Valid` yok; Java\'da Bean Validation\'ın karşılığı bu. Postman\'de boş title göndererek kanıtlarım." Katman + kök neden + Java = tam puan.', en: 'The lesson — a strong answer names the layer: "the UI validates but the server has no `@Valid`; this is the Bean Validation counterpart in Java. I prove it by sending an empty title in Postman." Layer + root cause + Java = full marks.' }, positions: { defect: { x: 30, y: 45 }, answer: { x: 62, y: 50, scale: 1.2, pulse: true } }, beams: [{ from: 'defect', to: 'answer', color: '#22c55e' }] },
      ],
    },
    {
      type: 'step-animation',
      title: { tr: 'Bir Mülakat Sorusuna Cevap Kurma Sırası', en: 'The Order for Building an Interview Answer' },
      steps: [
        { id: 1, icon: '🎯', label: { tr: 'Senaryoyu somutlaştır…', en: 'Concretize the scenario…' }, detail: { tr: 'Soruyu "hangi endpoint, hangi katman, hangi belirti" olarak zihninde canlandır.', en: 'Picture the question as "which endpoint, which layer, which symptom" in your mind.' } },
        { id: 2, icon: '🔍', label: { tr: 'Kök nedeni bağla…', en: 'Connect the root cause…' }, detail: { tr: 'Bu sayfada gördüğün bir gruba (B-J) geri bağlan: aynı kalıp daha önce nerede geçti?', en: 'Connect back to a group (B-J) you saw on this page: where did the same pattern appear before?' } },
        { id: 3, icon: '☕', label: { tr: 'Java ile karşılaştır…', en: 'Compare with Java…' }, detail: { tr: 'Mümkünse Spring/Java karşılığını söyleyerek cevabına derinlik kat.', en: 'Add depth to your answer by mentioning the Spring/Java counterpart when possible.' } },
      ],
    },
    {
      type: 'code-playground',
      relatedTopicId: 'api-k-interview-warmup',
      id: 'api-k-interview-warmup',
      title: { tr: 'Kendin Dene: Bir Mülakat Sorusuna Isınma Turu', en: 'Try It Yourself: Warm Up for an Interview Question' },
      starterCode: { tr: `// Mulakatci: "POST /api/v1/bugs 201 yerine 200 donuyor, bunu bug olarak acar misin?"
// TODO: cevabini 2 cumleyle (KOK NEDEN + ETKI) yaz
Cevabim: ???`, en: `// Mulakatci: "POST /api/v1/bugs 201 yerine 200 donuyor, bunu bug olarak acar misin?"
// TODO: write your answer in 2 sentences (ROOT CAUSE + IMPACT)
Cevabim: ???` },
      solutionCode: { tr: `// Iyi bir cevap KOK NEDEN + ETKI icerir, sadece "evet/hayir" degil
Cevabim: Evet - sozlesme (F1/F4) 201 vaat ediyorsa spec'e guvenen her istemci (mobil, otomasyon) 200'u "beklenmeyen" sayabilir; kod calissa da sozlesmeye uymayan davranis bir contract defect'idir (F5).`, en: `// A good answer includes ROOT CAUSE + IMPACT, not just "yes/no"
Cevabim: Evet - sozlesme (F1/F4) 201 vaat ediyorsa spec'e guvenen her istemci (mobil, otomasyon) 200'u "beklenmeyen" sayabilir; kod calissa da sozlesmeye uymayan davranis bir contract defect'idir (F5).` },
      hint: { tr: 'Güçlü bir mülakat cevabı SADECE "evet, bug\'dır" demez — NEDEN bug olduğunu (sözleşmeye güvenen sistemler) ve bunun hangi GRUP\'taki kavrama (F5 contract defect) bağlandığını gösterir.', en: 'A strong interview answer does not just say "yes, it is a bug" — it shows WHY it is a bug (systems trusting the contract) and which GROUP concept (F5 contract defect) it connects to.' },
      successMessage: { tr: 'Doğru refleks! Şimdi aşağıdaki 50 soruda aynı derinliği uygula.', en: 'The right instinct! Now apply the same depth to the 50 questions below.' },
    },
    {
      type: 'interview-questions',
      relatedTopicId: 'api-testing-interview',
      topic: 'API Testing',
      questions: [
        // ══════════════════ BASIC (15) ══════════════════
        {
          level: 'basic',
          q: { tr: 'API\'yi hiç görmemiş bir tester olarak `GET /api/v1/bugs` request\'ini Postman\'de gönderiyorsun ve `200 OK` + boş bir dizi `[]` alıyorsun. Bu bir bug mudur? Nasıl karar verirsin?', en: 'As a tester who has never seen an API, you send `GET /api/v1/bugs` in Postman and get `200 OK` + an empty array `[]`. Is this a bug? How do you decide?' },
          a: { tr: 'Tek başına değil — boş bir liste, "hiç kayıt yok" durumunun GEÇERLİ bir temsili olabilir; sözleşmeye (F grubu) veya iş kuralına bakmadan "bug" dememek gerekir. Karar vermek için önce veritabanında/ortamda GERÇEKTEN kayıt olup olmadığını doğrularım — varsa ve dönmüyorsa bu bir filtreleme/sorgu hatasıdır. Java\'da bunun karşılığı boş bir `List<Bug>` dönmesi gibidir — `null` dönmesi ayrı bir sorundur, boş liste dönmesi genelde doğru davranıştır.', en: 'Not on its own — an empty list can be a VALID representation of "no records exist"; you should not call it a "bug" without checking the contract (GROUP F) or the business rule. To decide, I first verify whether records REALLY exist in the database/environment — if they do and are not returned, that is a filtering/query bug. The Java equivalent is returning an empty `List<Bug>` — returning `null` would be a separate problem, an empty list is usually correct behavior.' },
        },
        {
          level: 'basic',
          q: { tr: 'Bir junior geliştirici "Postman\'de Content-Type header\'ı olmadan da POST çalışıyor, neden ekliyoruz?" diye soruyor. Ne açıklarsın, eklemezsen risk nedir?', en: 'A junior developer asks "POST works in Postman even without a Content-Type header, why do we add it?" What do you explain, and what is the risk of skipping it?' },
          a: { tr: 'Postman bazen JSON body\'yi otomatik algılayıp header\'ı kendisi eklediği için bu "çalışıyor" YANILSAMASI oluşur; gerçek bir istemcide (mobil uygulama, başka bir servis) bu otomatik algılama OLMAYABİLİR. Header eksikse sunucu gövdeyi doğru ayrıştıramaz ve C grubunda gördüğün gibi `req.body` boş kalabilir — sessizce boş kayıt oluşur. Java\'da `HttpURLConnection` ile de aynı risk vardır: `setRequestProperty("Content-Type", ...)` unutulursa sunucu request\'i JSON olarak tanımaz.', en: 'This "it works" illusion happens because Postman sometimes auto-detects a JSON body and adds the header itself; a real client (a mobile app, another service) may NOT have that auto-detection. Without the header, the server cannot parse the body correctly, and as you saw in GROUP C, `req.body` can stay empty — silently creating an empty record. The same risk exists in Java with `HttpURLConnection`: forgetting `setRequestProperty("Content-Type", ...)` means the server does not recognize the request as JSON.' },
        },
        {
          level: 'basic',
          q: { tr: '`/api/v1/bugs/{id}` yolu ile `/api/v1/bugs?id=...` sorgu parametresi arasında ne zaman hangisini kullanırsın, Bug Tracker örneğiyle açıkla.', en: 'When do you use `/api/v1/bugs/{id}` versus a `/api/v1/bugs?id=...` query parameter — explain with the Bug Tracker example.' },
          a: { tr: 'Path parametresi bir KAYNAĞIN KİMLİĞİNİ taşır — `/bugs/42` olmadan request anlamsızdır, bu yüzden tek bir bug\'ı getirmek path\'e aittir. Query parametresi İSTEĞE BAĞLI bir filtreyi taşır — `?status=OPEN` olmadan da liste request\'i geçerlidir, bu yüzden filtreleme query\'e aittir. Java\'da bu, bir metodun ZORUNLU parametresi (path) ile opsiyonel/overload edilmiş bir parametresi (query) arasındaki farka benzer.', en: 'A path parameter carries a resource\'s IDENTITY — `/bugs/42` is meaningless without it, so fetching a single bug belongs in the path. A query parameter carries an OPTIONAL filter — a list request is still valid without `?status=OPEN`, so filtering belongs in the query. In Java this is similar to the difference between a method\'s REQUIRED parameter (path) and an optional/overloaded one (query).' },
        },
        {
          level: 'basic',
          q: { tr: 'Bir takım arkadaşın "PUT ve PATCH ikisi de güncelleme, aynı şey" diyor. `/api/v1/bugs/42` üzerinde ikisi gerçekten aynı mı? Idempotency farkını açıkla.', en: 'A teammate says "PUT and PATCH are both updates, they are the same thing". Are they really the same on `/api/v1/bugs/42`? Explain the idempotency difference.' },
          a: { tr: 'Aynı değiller — PUT TAM güncelleme yapar (gönderilmeyen alanlar silinebilir/sıfırlanabilir) ve idempotenttir (aynı request\'i 5 kez atmak AYNI sonucu verir). PATCH KISMİ güncelleme yapar (sadece gönderilen alan değişir) ve genellikle idempotent olsa da her zaman garanti değildir. Java\'da bunun karşılığı bir nesnenin TÜM alanlarını `setAll(newObject)` ile değiştirmek (PUT) ile SADECE bir setter (`setStatus(...)`) çağırmak (PATCH) arasındaki farka benzer.', en: 'They are not the same — PUT does a FULL update (unsent fields can be deleted/reset) and is idempotent (sending the same request 5 times gives the SAME result). PATCH does a PARTIAL update (only the sent field changes) and is usually idempotent but not always guaranteed. In Java this resembles the difference between replacing ALL of an object\'s fields with `setAll(newObject)` (PUT) versus calling just ONE setter (`setStatus(...)`) (PATCH).' },
        },
        {
          level: 'basic',
          q: { tr: 'Var olmayan bir kayıt için `GET /api/v1/bugs/999` request\'ine `404` alıyorsun — bu bir bug mu? Peki yazım hatalı `GET /api/v1/bug/999` (tekil "bug") request\'ine gelen `404` ne anlama gelir?', en: 'You get `404` for `GET /api/v1/bugs/999` on a non-existent record — is this a bug? What about a `404` on a typo\'d `GET /api/v1/bug/999` (singular "bug")?' },
          a: { tr: 'İlki DEĞİL — var olmayan bir kaynak için 404 dönmek SÖZLEŞMEYE tam uygun, doğru davranıştır. İkincisi de teknik olarak 404\'tür ama farklı bir NEDENDEN: yol hiç tanımlı değildir (route yok), bu bir istemci hatasıdır (yanlış URL), API\'nin bug\'ı değildir. Java\'da bu, `NoSuchElementException` (kayıt yok, beklenen) ile hiç var olmayan bir metodu çağırmaya çalışmak (derleme hatası, hiç oraya varılmaz) arasındaki farka benzer.', en: 'The first is NOT a bug — returning 404 for a non-existent resource is exactly what the CONTRACT expects, correct behavior. The second is also technically a 404 but for a different REASON: the path is not defined at all (no such route), a client error (wrong URL), not the API\'s bug. In Java this resembles the difference between a `NoSuchElementException` (record missing, expected) and trying to call a method that does not exist at all (compile error, you never even get there).' },
        },
        {
          level: 'basic',
          q: { tr: '`POST /api/v1/bugs` request\'inin `201` yerine `200` dönmesinin ne anlama geldiğini ve testlerde "yine de geçiyor" olmasına rağmen neden teknik olarak yanlış olduğunu açıkla.', en: 'Explain what it means for `POST /api/v1/bugs` to return `200` instead of `201`, and why it is technically wrong even though tests "still pass".' },
          a: { tr: '`201 Created`, "yeni bir kaynak oluşturuldu" anlamına gelen ÖZEL bir koddur; `200 OK` genel bir başarı kodudur ve OLUŞTURMA ile GÜNCELLEME/OKUMA arasında AYRIM yapmaz. Testler genelde sadece "2xx mi?" kontrol ettiği için "yine de geçer", ama bir istemci (mobil uygulama) status koduna göre farklı davranıyorsa (örn. 201\'de "Location" header\'ını okuyorsa) bu sessizce kırılır. Java\'da bunun karşılığı, `ResponseEntity.ok()` yerine `ResponseEntity.status(HttpStatus.CREATED)` kullanmanın SPESİFİK anlam taşıması gibidir.', en: '`201 Created` is a SPECIFIC code meaning "a new resource was created"; `200 OK` is a generic success code that does NOT DISTINGUISH between CREATION and UPDATE/READ. Tests usually "still pass" because they often only check "is it 2xx?", but if a client (a mobile app) behaves differently based on the status code (e.g. reading the "Location" header on 201), it silently breaks. The Java equivalent is that using `ResponseEntity.status(HttpStatus.CREATED)` instead of `ResponseEntity.ok()` carries SPECIFIC meaning.' },
        },
        {
          level: 'basic',
          q: { tr: 'İlk REST Assured testini yazman isteniyor. `given/when/then` zincirinin üç mantıksal parçası nedir ve her biri ne kontrol eder?', en: 'You are asked to write your first REST Assured test. What are the three logical parts of the `given/when/then` chain and what does each check?' },
          a: { tr: '`given()` ÖN KOŞULLARI kurar (baseUri, header\'lar, auth token); `when()` GERÇEK eylemi tanımlar (hangi metod, hangi yol); `then()` SONUCU denetler (status kodu, gövde, header\'lar). Bu üçlü, testi "GIVEN şu koşullarda, WHEN şunu yaptığımda, THEN şunu beklerim" cümlesine dönüştürür. Java\'da bunun en yakın karşılığı bir JUnit testindeki setup/act/assert (Arrange-Act-Assert) desenidir.', en: '`given()` sets up PRECONDITIONS (baseUri, headers, auth token); `when()` defines the REAL action (which method, which path); `then()` checks the RESULT (status code, body, headers). This trio turns the test into "GIVEN these conditions, WHEN I do this, THEN I expect this". The closest Java equivalent is the setup/act/assert (Arrange-Act-Assert) pattern in a JUnit test.' },
        },
        {
          level: 'basic',
          q: { tr: 'Bir Postman koleksiyonunu endpoint listesine göre değil, kullanıcı akışına göre organize etmenin yeni bir tester için neden daha hızlı bir öğrenme sağladığını açıkla.', en: 'Explain why organizing a Postman collection by user flow rather than by raw endpoint list helps a new tester learn faster.' },
          a: { tr: 'Endpoint listesi TEKNİK bir görünümdür ("burada 6 request var"), akış organizasyonu ise İŞ MANTIĞINI yansıtır ("önce oluştur, sonra yönet") — yeni bir kişi klasör isimlerini okuyarak sistemin NASIL kullanıldığını anlar, her request\'i tek tek incelemesi gerekmez. Java\'da bu, test paketlerini teknik katmana (`controllers`, `services`) göre değil, özelliğe (`bugcreation`, `buglifecycle`) göre paketlemeye benzer.', en: 'An endpoint list is a TECHNICAL view ("there are 6 requests here"), flow organization reflects the BUSINESS LOGIC ("create first, then manage") — a newcomer understands HOW the system is used just by reading folder names, without inspecting every request individually. In Java this resembles packaging test suites by feature (`bugcreation`, `buglifecycle`) rather than by technical layer (`controllers`, `services`).' },
        },
        {
          level: 'basic',
          q: { tr: 'Bir bug raporunu incelerken DevTools\'ta `Response` sekmesi ile `Preview` sekmesi arasında pratik fark nedir?', en: 'When investigating a bug report, what is the practical difference between the `Response` and `Preview` tabs in DevTools?' },
          a: { tr: 'İkisi de AYNI veriyi gösterir; `Response` ham/ayrıştırılmamış metindir (büyük bir JSON\'da okumak zordur), `Preview` ise tarayıcının ayrıştırıp okunaklı bir ağaç yapısında sunduğu hâlidir. Pratikte bir alanın eksikliğini/sızmasını hızlıca yakalamak için `Preview`\'i, ham metni bir yere kopyalamak (ör. bir bug raporuna eklemek) için `Response`\'u kullanırım.', en: 'Both show the SAME data; `Response` is the raw/unparsed text (hard to read in a large JSON), `Preview` is the browser\'s parsed, readable tree form. In practice I use `Preview` to quickly spot a missing/leaked field, and `Response` to copy the raw text somewhere (e.g. attaching it to a bug report).' },
        },
        {
          level: 'basic',
          q: { tr: 'Bir spec\'te `severity` alanı `enum: [LOW, MEDIUM, HIGH, CRITICAL]` olarak tanımlı. Bu kısıt etrafında nasıl bir test yazarsın?', en: 'A spec defines `severity` as `enum: [LOW, MEDIUM, HIGH, CRITICAL]`. What kind of test would you write around this constraint?' },
          a: { tr: 'İki AYRI senaryo yazarım: (1) listedeki geçerli bir değerle (örn. `HIGH`) request\'in kabul edildiğini doğrulayan bir pozitif test, (2) listede OLMAYAN bir değerle (örn. `URGENT`) request\'in 400 ile REDDEDİLDİĞİNİ doğrulayan bir negatif test. Java\'da bu, bir `enum` sınıfına geçersiz bir string atamaya çalışmanın derleme zamanında değil, burada ÇALIŞMA ZAMANINDA (API sınırında) yakalanması gerektiğini gösterir.', en: 'I write two SEPARATE scenarios: (1) a positive test verifying the request is accepted with a valid value from the list (e.g. `HIGH`), (2) a negative test verifying the request is REJECTED with 400 for a value NOT in the list (e.g. `URGENT`). In Java, this shows that assigning an invalid string to an `enum` class would fail at compile time — here it must be caught at RUNTIME instead (at the API boundary).' },
        },
        {
          level: 'basic',
          q: { tr: 'Yeni işe başlayan birine "UI\'da her şey başarılı görünüyor" ifadesinin neden API çağrısının GERÇEKTEN başarılı olduğunun kanıtı olmadığını açıkla.', en: 'Explain to a new hire why "everything looks successful in the UI" is not proof that the API call REALLY succeeded.' },
          a: { tr: 'UI mesajları geliştiricinin YAZDIĞI metindir, sunucunun GERÇEK cevabı değildir — hata durumu (catch bloğu) yanlış yazılmışsa UI "başarılı" der ama sunucu aslında 500 dönmüş olabilir (E5\'teki "sessiz 500"). Java\'da bu, bir `try/catch` bloğunda hatayı SESSİZCE yutup kullanıcıya sahte bir başarı mesajı göstermeye benzer — hata gerçekten olur ama hiçbir yere loglanmaz.', en: 'UI messages are text the developer WROTE, not the server\'s REAL answer — if the error case (the catch block) is written incorrectly, the UI says "success" while the server may have actually returned 500 (E5\'s "silent 500"). In Java this resembles silently swallowing an error in a `try/catch` block and showing the user a fake success message — the error really happens but is never logged anywhere.' },
        },
        {
          level: 'basic',
          q: { tr: 'Postman environment\'ında `{{baseUrl}}` localhost\'u gösteriyor. Staging\'e deploy ettikten sonra bunu değiştirmeyi unutuyorsun. Ne olur, bunu nasıl hızlıca fark edersin?', en: 'Your Postman environment\'s `{{baseUrl}}` points to localhost. You forget to switch it after deploying to staging. What happens, and how do you quickly notice it?' },
          a: { tr: 'Tüm request\'ler yerel makinene gider — eğer yerelde sunucu çalışmıyorsa TÜM testler `ECONNREFUSED` ile başarısız olur; çalışıyorsa daha KÖTÜSÜ olur, staging yerine YEREL/eski veriye karşı test edip yanlış bir "her şey yolunda" sonucu alırsın. Bunu hızlıca fark etmenin yolu her koşum öncesi aktif environment\'ın adını (G2) kontrol etmek ve ilk request\'in response\'undaki bir ortam-özgü değeri (ör. bir sürüm numarası) doğrulamaktır.', en: 'All requests go to your local machine — if the server is not running locally, ALL tests fail with `ECONNREFUSED`; if it IS running, it is WORSE, you test against LOCAL/stale data instead of staging and get a false "everything is fine" result. The quick way to notice this is checking the active environment\'s name (G2) before every run and verifying an environment-specific value (e.g. a version number) in the first response.' },
        },
        {
          level: 'basic',
          q: { tr: 'Bir geliştirici "@NotBlank ile validation ekledim ama spring-boot-starter-validation eklemeyi unuttum" diyor. Testerlık yaparken ne gözlemlersin?', en: 'A developer says "I added validation with @NotBlank but forgot to add spring-boot-starter-validation". As a tester, what would you observe?' },
          a: { tr: 'Kod DERLENİR ve uygulama HATASIZ başlar — hiçbir uyarı görmezsin. Ama boş `title` ile bir `POST` request\'i attığında 400 yerine 201 alırsın çünkü `@NotBlank` sessizce yok sayılır (B1). Bu, "kod var" ile "kod DEVREDE" arasındaki farkın klasik bir örneğidir — sadece kod okuyarak bunu YAKALAYAMAZSIN, gerçek bir request\'le test etmen gerekir.', en: 'The code COMPILES and the app starts WITHOUT ERROR — you see no warning at all. But sending a `POST` with an empty `title` gets you 201 instead of 400, because `@NotBlank` is silently ignored (B1). This is a classic example of the gap between "the code exists" and "the code is ACTIVE" — you cannot CATCH this just by reading code, you have to test with a real request.' },
        },
        {
          level: 'basic',
          q: { tr: 'Bug Tracker\'da geçerli bir token\'la ama başkasının bug\'ını silmeye çalıştığında `401` ile `403` arasındaki pratik farkı somut bir örnekle açıkla.', en: 'Using a valid token but trying to delete someone else\'s bug in the Bug Tracker, explain the practical difference between `401` and `403` with a concrete example.' },
          a: { tr: '`401`, "seni HİÇ tanımıyorum" demektir — kimlik (authentication) eksik/geçersizdir; token hiç yoksa veya süresi dolmuşsa gelir. `403`, "seni tanıyorum ama BU işleme iznin yok" demektir — kimlik geçerlidir ama yetki (authorization) eksiktir; kendi bug\'ın olmayan bir kaydı silmeye çalışmak buna örnektir. Bu ayrımı karıştırmak (403\'ü 401 sanmak) bir yetki açığını "login sorunu" diye kapatıp GÜVENLİK AÇIĞINI gizleyebilir.', en: '`401` means "I don\'t know you AT ALL" — identity (authentication) is missing/invalid; happens when there is no token or it is expired. `403` means "I know you but you have no permission for THIS action" — identity is valid but authorization is missing; trying to delete a bug that is not yours is an example. Confusing this distinction (mistaking 403 for 401) can close a permission hole as a "login issue" and hide a SECURITY VULNERABILITY.' },
        },
        {
          level: 'basic',
          q: { tr: 'Zaten çalışan bir kodun olduğu bir projede, elle yazılan bir spec/dokümana neden hâlâ ihtiyaç duyulur?', en: 'Why is a manually written spec/document still needed on a project where working code already exists?' },
          a: { tr: 'Kod SADECE o dili bilen bir geliştiricinin okuyabileceği bir formattadır; spec ise Postman, Swagger UI, test araçları gibi ONLARCA farklı aracın AYNI ANDA okuyabileceği standart, makine-okunur bir formattır. Bir tester Java/TypeScript bilmeden bile spec\'i okuyarak API\'nin sözleşmesini öğrenebilir. Java\'da bunun karşılığı bir `interface` + JavaDoc birleşimidir — imza + insan tarafından okunur açıklama.', en: 'Code is a format only a developer who knows that language can read; a spec is a standard, machine-readable format that DOZENS of different tools — Postman, Swagger UI, test tools — can read SIMULTANEOUSLY. A tester can learn the API\'s contract by reading the spec even without knowing Java/TypeScript. The Java equivalent is a combination of an `interface` + JavaDoc — signature + human-readable explanation.' },
        },

        // ══════════════════ INTERMEDIATE (20) ══════════════════
        {
          level: 'intermediate',
          q: { tr: 'Express uygulamanız bazen `req.body`\'yi boş, bazen dolu döndürüyor — tutarsız. Hipotezin ne olur, ilk nereye bakarsın?', en: 'Your Express app sometimes returns an empty `req.body`, sometimes filled — inconsistent. What is your hypothesis, where do you look first?' },
          a: { tr: 'Hipotezim `express.json()` middleware\'inin kayıt SIRASIYLA ilgili bir sorun (C3) — belki bazı route\'lar bu middleware\'den ÖNCE tanımlı, bazıları SONRA. İlk bakacağım yer, tüm `app.use(express.json())` ve route tanımlarının dosyadaki SIRASIdır; middleware\'ler kayıt sırasına göre çalışır, "bazen çalışıyor" ifadesi genelde bir sıralama tutarsızlığına işaret eder. Java\'da bunun karşılığı bir Servlet Filter\'ın `web.xml`\'de yanlış sırada tanımlanmasıdır.', en: 'My hypothesis is a middleware REGISTRATION ORDER problem with `express.json()` (C3) — maybe some routes are defined BEFORE this middleware, others AFTER. The first place I look is the ORDER of all `app.use(express.json())` calls and route definitions in the file; middlewares run by registration order, "sometimes works" usually points to an ordering inconsistency. The Java equivalent is a Servlet Filter defined in the wrong order in `web.xml`.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Code review\'da `express.json()` middleware\'inin route handler\'lardan SONRA kayıtlı olduğunu görüyorsun. Bu gerçek hangi bug\'a yol açar, ve bunu code review yerine testle nasıl kanıtlarsın?', en: 'In code review you see `express.json()` registered AFTER the route handlers. What real bug does this cause, and how would you prove it with a test rather than just code review?' },
          a: { tr: 'Bu, POST request\'lerinde `req.body`\'nin `undefined` kalmasına yol açar — sunucu yine de 201 döner ama tüm alanlar `undefined` olarak kaydedilir, sessiz bir veri bütünlüğü hatası (C3). Kanıtlamak için gerçek bir POST request\'i atıp dönen kaydı GET ile okur, `title` gibi alanların boş geldiğini gösteririm — "kod incelemesi yeterli değildir, çalışan sistemde doğrulama şarttır" prensibinin somut kanıtı budur.', en: 'This causes `req.body` to stay `undefined` on POST requests — the server still returns 201, but all fields get saved as `undefined`, a silent data-integrity bug (C3). To prove it, I send a real POST request and read the record back with a GET, showing fields like `title` come back empty — concrete proof of the principle that "code review is not enough, verification on a running system is mandatory".' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir NestJS controller\'ı tamamen doğru görünüyor — decorator\'lar, DTO, her şey yerinde — ama GET request\'leri 404 dönüyor. Farklı KATMANLARDAN gelen İKİ AYRI kök nedeni say.', en: 'A NestJS controller looks completely correct — decorators, DTO, everything in place — but GET requests return 404. Name TWO SEPARATE root causes from different layers.' },
          a: { tr: 'Birincisi: controller `@Module`\'ün `controllers` dizisine EKLENMEMİŞ olabilir (D1) — kod doğru ama DI container\'a hiç kayıtlı değil, Nest onu ASLA tanımaz. İkincisi: yol tanımında bir yazım/parametre hatası olabilir (`@Get(\':id\')` yerine `@Get(\'id\')` gibi) — burada sorun modül kaydı değil, decorator\'ın kendisidir. İkisi de "kod var" ama farklı SEBEPLERLE 404 üretir; tester her ikisini de ayrı ayrı ELEMESİ gerekir.', en: 'First: the controller may not be ADDED to `@Module`\'s `controllers` array (D1) — the code is correct but never registered with the DI container, Nest NEVER recognizes it. Second: there may be a typo/parameter mistake in the path definition (like `@Get(\'id\')` instead of `@Get(\':id\')`) — here the problem is not module registration, it is the decorator itself. Both produce 404 despite "the code existing", for different REASONS; the tester must RULE OUT each separately.' },
        },
        {
          level: 'intermediate',
          q: { tr: '`POST /api/v1/bugs`\'un OpenAPI şemasından, "tahmin etmek" yerine sistematik bir negatif test seti nasıl tasarlarsın?', en: 'How would you design a systematic negative test set for `POST /api/v1/bugs` from its OpenAPI schema, instead of "guessing" cases?' },
          a: { tr: 'Şemadaki HER kısıtı (F4) ayrı bir test senaryosuna çeviririm: her `required` alan için "eksikken 400 mü" testi, her `type`/`format` kısıtı için yanlış tip/format testi, her `enum` için listede olmayan bir değer testi. Bu, "aklıma ne gelirse" yaklaşımından farklı olarak, şemanın İZİN VERDİĞİ ve YASAKLADIĞI her durumu SİSTEMATİK olarak kapsar (F6). Java\'da bunun karşılığı bir `interface`\'in TÜM implementasyonlarını test eden bir contract test paketidir.', en: 'I turn EVERY constraint in the schema (F4) into a separate test scenario: a "400 when missing" test for each `required` field, a wrong-type/format test for each `type`/`format` constraint, an out-of-list-value test for each `enum`. Unlike a "whatever comes to mind" approach, this SYSTEMATICALLY covers every case the schema ALLOWS and FORBIDS (F6). The Java equivalent is a contract test suite testing ALL implementations of an `interface`.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir test Postman\'de elle PASS oluyor ama CI\'da Newman ile FAIL oluyor. İlk hipotezin ne, bunu nasıl doğrularsın?', en: 'A test PASSes manually in Postman but FAILs in CI via Newman. What is your first hypothesis, how do you verify it?' },
          a: { tr: 'İlk hipotezim test verisi izolasyonu — Postman\'de elle, sırayla çalıştırılan testler önceki koşumdan kalan SABİT bir veriye (ör. `id: 1`) sessizce güvenmiş olabilir; CI TEMİZ bir ortamda çalıştığından o veri yoktur (GRUP J). Bunu doğrulamak için testi yerelde TEMİZ bir environment\'la (veya sıfırdan bir veritabanıyla) tekrar çalıştırırım — aynı şekilde başarısız olursa hipotez doğrulanır.', en: 'My first hypothesis is test data isolation — tests run manually, in order, in Postman may have silently relied on FIXED data left from a previous run (like `id: 1`); since CI runs in a CLEAN environment, that data does not exist (GROUP J). To verify, I re-run the test locally with a CLEAN environment (or a fresh database) — if it fails the same way, the hypothesis is confirmed.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Production response\'larında OpenAPI\'nin `enum` listesinde OLMAYAN iki `severity` değeri görüyorsun. Bu hangi defect türüdür ve muhtemelen NASIL oluştu?', en: 'You see two `severity` values in production responses that are NOT in the OpenAPI `enum` list. What kind of defect is this, and how did it likely happen?' },
          a: { tr: 'Bu bir "enum drift" contract defect\'idir (F5) — kod tarafında enum genişletilmiş (yeni bir değer eklenmiş) ama spec elle güncellenmediği için AYRIŞMIŞTIR. Muhtemelen bir geliştirici Java/TS enum sınıfına hızlıca yeni bir değer eklemiş, ama spec\'in ayrı bir dosya olduğunu (ve otomatik üretilmediğini, F2) unutmuş veya spec\'i elle güncellemeyi atlamıştır.', en: 'This is an "enum drift" contract defect (F5) — the enum was expanded on the code side (a new value added) but the spec DIVERGED because it was not manually updated. A developer likely quickly added a new value to the Java/TS enum class but forgot the spec is a separate file (and is not auto-generated, F2) or skipped manually updating it.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'AYNI `/api/v1/bugs/42` endpoint\'inde PATCH ile PUT\'un yanlış kullanıldığında GERÇEKTEN farklı sonuç üretebileceği bir senaryo tarif et.', en: 'Describe a scenario where PATCH and PUT, if misused, would genuinely produce different outcomes on the SAME `/api/v1/bugs/42` endpoint.' },
          a: { tr: 'Bir istemci sadece `{ "status": "CLOSED" }` gönderip PUT kullanırsa (PATCH yerine), sunucu bunu TAM güncelleme sayıp `title`/`severity`/`reporter` gibi gönderilmeyen alanları SIFIRLAYABİLİR/silebilir — kayıt sessizce veri kaybeder. Aynı request PATCH ile gönderilseydi SADECE `status` değişirdi. Java\'da bu, bir nesnenin `equals`/`copy` metodunda yanlışlıkla tüm alanları `null`\'a set etmeye benzer.', en: 'If a client sends only `{ "status": "CLOSED" }` using PUT (instead of PATCH), the server may treat it as a FULL update and RESET/delete unsent fields like `title`/`severity`/`reporter` — the record silently loses data. The same request sent with PATCH would change ONLY `status`. In Java this resembles accidentally setting all fields to `null` in an object\'s `equals`/`copy` method.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir bug raporu "API yavaş" diyor. Herhangi bir şey yapmadan ÖNCE raportördan hangi veriyi istersin, neden?', en: 'A bug report says "the API is slow". Before doing anything, what data do you request from the reporter, and why?' },
          a: { tr: 'DevTools Network panelindeki Timing sekmesinin (E4) ekran görüntüsünü isterim — `TTFB`, `Waiting`, `Content Download` ayrımı olmadan "yavaş" tek başına HANGİ katmanın (sunucu mu ağ mı) sorumlu olduğunu SÖYLEMEZ. Bu veri olmadan araştırmaya başlamak, doğru ekibe (backend mi frontend mi) yönlenmeden önce zaman kaybetmek demektir.', en: 'I ask for a screenshot of the Timing tab (E4) in the DevTools Network panel — without the `TTFB`/`Waiting`/`Content Download` breakdown, "slow" alone does NOT SAY which layer (server or network) is responsible. Starting to investigate without this data means wasting time before routing to the right team (backend or frontend).' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Hibrit bir Playwright testi eklemen isteniyor: bir bug\'ı API ile oluştur, UI\'da doğrula. Bu senaryo için tüm akışı UI\'dan yapmaya göre neden tercih edilir?', en: 'You are asked to add a hybrid Playwright test: create a bug via the API, verify it in the UI. Why is this preferred over doing the whole flow through the UI for this scenario?' },
          a: { tr: 'Testin AMACI "listeleme özelliğinin doğru çalıştığını" görmektir, "bug oluşturma formunu" DEĞİL — form akışı zaten B6/C4/D3\'te ayrıca test edildi. UI\'dan 10 bug oluşturmak dakikalar sürer ve HER adımda kırılma riski taşır; API ile kurulum saniyeler sürer ve test SADECE gerçek hedefe (I3) odaklanır. Java\'da bu, bir Selenium testinde veritabanına doğrudan test verisi enjekte etmeye (`@Sql`) benzer.', en: 'The test\'s GOAL is to see "the listing feature works correctly", NOT "the bug creation form" — the form flow was already tested separately in B6/C4/D3. Creating 10 bugs from the UI takes minutes and carries a break risk at EVERY step; setting up via the API takes seconds and lets the test focus ONLY on its real target (I3). In Java this resembles directly injecting test data into the database (`@Sql`) in a Selenium test.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir REST Assured testi sabit bir bug `id=1` kullanıyor ve CI\'da rastgele başarısız olmaya başlıyor. Teşhis et.', en: 'A REST Assured test uses a hardcoded bug `id=1` and starts failing randomly in CI. Diagnose it.' },
          a: { tr: 'Kök neden muhtemelen test izolasyonu eksikliği — paralel koşan başka bir test aynı `id=1`\'i SİLMİŞ veya değiştirmiş olabilir, ya da veritabanı her koşumda SIFIRLANDIĞI için `id=1` hiç YOK olabilir. Doğru çözüm G4\'teki gibi testin KENDİ verisini oluşturup o veriye REFERANSLA (dönen id ile) devam etmesidir, sabit bir id\'ye asla güvenmemektir.', en: 'The root cause is likely a lack of test isolation — another test running in parallel may have DELETED or changed the same `id=1`, or `id=1` may not EXIST at all because the database resets every run. The correct fix is for the test to create its OWN data (like in G4) and continue by REFERENCE to that data (the returned id), never trusting a hardcoded id.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'REST Assured\'daki `RequestSpecification`, Selenium\'daki Page Object Model ile nasıl kavramsal olarak eşleşir, ve bu tutarlılık bakım için neden önemlidir?', en: 'How does REST Assured\'s `RequestSpecification` conceptually map to the Page Object Model in Selenium, and why does that consistency matter for maintenance?' },
          a: { tr: 'İkisi de AYNI prensibi taşır: tekrarlanan bir bilgiyi (Selenium\'da locator\'lar, REST Assured\'da `baseUri`/header) TEK bir yere toplayıp bakımı kolaylaştırmak. Bu tutarlılık önemlidir çünkü bir takım her iki test türünü de yazıyorsa (API + UI), AYNI "tekrarı önle" zihniyetini her ikisine de uygulamak, kod incelemesini ve eğitim süresini kısaltır — biri diğerinin doğal bir uzantısı gibi öğrenilir.', en: 'Both carry the SAME principle: gathering repeated information (locators in Selenium, `baseUri`/headers in REST Assured) into ONE place to ease maintenance. This consistency matters because if a team writes both test types (API + UI), applying the SAME "avoid duplication" mindset to both shortens code review and onboarding time — one is learned as a natural extension of the other.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Yöneticin "Postman ile mi test edelim, REST Assured mı yazalım" diye soruyor. Hangi karar faktörlerini sunarsın?', en: 'Your manager asks "should we test via Postman or write REST Assured tests?" What deciding factors do you present?' },
          a: { tr: 'Üç faktör sunarım: (1) takımın diline uygunluk — Java takımı için REST Assured sürtünmesiz, kod-yazmayan paydaşlar için Postman daha erişilebilirdir; (2) CI entegrasyonu ihtiyacı — ikisi de mümkündür (Newman/JUnit) ama REST Assured aynı projede yaşayarak "testleri unutma" riskini azaltır; (3) hız — keşifsel/manuel test için Postman daha hızlı kurulur, uzun vadeli regresyon paketi için REST Assured daha sürdürülebilirdir.', en: 'I present three factors: (1) fit with the team\'s language — REST Assured is frictionless for a Java team, Postman is more accessible for non-coding stakeholders; (2) CI integration need — both are possible (Newman/JUnit) but REST Assured living in the same project reduces the "forgetting the tests" risk; (3) speed — Postman sets up faster for exploratory/manual testing, REST Assured is more maintainable for a long-term regression suite.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Spring, Express ve NestJS\'in eksik bir zorunlu alanı MİMARİ düzeyde nasıl farklı ele aldığını karşılaştır — her birinin risk kalıbı nedir?', en: 'Compare how Spring, Express, and NestJS each handle a missing required field differently at the ARCHITECTURAL level — what is the risk pattern for each?' },
          a: { tr: 'Spring: `@Valid` + Bean Validation OTOMATİK tetiklenir, risk EKSİK bir dependency\'dir (B1). Express: doğrulama kütüphanesi kuralı TANIMLAR ama SONUCU okumak elle yapılmalıdır, risk "kural var ama okunmuyor"dur (C4). NestJS: DTO decorator\'ları YAZILIR ama `ValidationPipe` GLOBAL olarak KAYDEDİLMEZSE hiç tetiklenmez, risk "yazıldı ama devrede değil"dir (D3). Üçü de aynı SONUCA (201 yerine 400 beklenirken) farklı KÖK NEDENLERLE ulaşır.', en: 'Spring: `@Valid` + Bean Validation triggers AUTOMATICALLY, the risk is a MISSING dependency (B1). Express: the validation library DEFINES the rule but READING the result must be done by hand, the risk is "the rule exists but is not read" (C4). NestJS: DTO decorators are WRITTEN but never trigger unless `ValidationPipe` is GLOBALLY REGISTERED, the risk is "written but not active" (D3). All three reach the SAME OUTCOME (201 when 400 is expected) via different ROOT CAUSES.' },
        },
        {
          level: 'intermediate',
          q: { tr: '"Sessiz 500" defect\'inin ne olduğunu açıkla ve bunu production\'a ulaşmadan yakalayacak bir checklist maddesi tasarla.', en: 'Explain what a "silent 500" defect is and design a checklist item that would catch it before it reaches production.' },
          a: { tr: 'Sessiz 500, frontend kodunun response\'un status kodunu HİÇ kontrol etmeden başarı akışını çalıştırmasıyla oluşur — UI "başarılı" der ama sunucu aslında 500 dönmüştür (E5). Checklist maddesi: "her API çağrısından sonra, UI\'nın gösterdiği mesajdan BAĞIMSIZ olarak Network panelindeki GERÇEK Status kodunu doğrula" — bu, otomasyonda `response.ok()`/`statusCode()` assertion\'ının HER request\'e eklenmesini zorunlu kılan bir code review kuralına dönüştürülebilir.', en: 'A silent 500 happens when frontend code runs its success flow WITHOUT EVER checking the response status code — the UI says "success" while the server actually returned 500 (E5). Checklist item: "after every API call, verify the REAL Status code in the Network panel, INDEPENDENT of what the UI displays" — this can become a code review rule requiring a `response.ok()`/`statusCode()` assertion on EVERY request in automation.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Hassas kullanıcı verisi döndüren bir endpoint için `Cache-Control` header\'ını neden kontrol etmekte ısrar edersin?', en: 'Why would you insist on checking the `Cache-Control` header for an endpoint that returns sensitive user data?' },
          a: { tr: 'Header eksikse tarayıcı response\'u ÖNBELLEĞE alabilir — kullanıcı çıkış yaptıktan SONRA bile geri tuşuyla ESKİ, hassas veriyi (bir başkasının bilgisayarında) görebilir (GRUP J\'deki Cache-Control eksikliği). Bu bir performans sorunu DEĞİL, bir GÜVENLİK açığıdır — Java\'da bunun karşılığı bir servlet response\'unda `Cache-Control: no-store` header\'ını eklemeyi unutmaktır.', en: 'Without the header, the browser may CACHE the response — even AFTER the user logs out, the back button can show OLD, sensitive data (on someone else\'s computer) (the missing Cache-Control from GROUP J). This is NOT a performance issue, it is a SECURITY hole — the Java equivalent is forgetting to add the `Cache-Control: no-store` header on a servlet response.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir REST Assured JSON Schema Validation testi PASS oluyor, ama manuel bir incelemede bir alanda YANLIŞ bir değer buluyorsun. Şema testi bunu neden yakalamadı, ek olarak ne gerekir?', en: 'A REST Assured JSON Schema Validation test PASSes, but a manual review finds a WRONG value in a field. Why did schema validation not catch this, and what additional check is needed?' },
          a: { tr: 'Şema doğrulaması sadece ŞEKLİ (tip, zorunlu alan, enum) kontrol eder, belirli bir DEĞERİ kontrol ETMEZ — bir `title` alanı `string` tipinde ve dolu olsa da, İÇERİĞİ yanlış olabilir. Ek olarak H2\'deki tek tek `.body("alan", equalTo(...))` doğrulamaları gerekir — şema "yapı doğru mu", tek tek doğrulama "içerik doğru mu" sorusuna cevap verir, ikisi TAMAMLAYICIDIR.', en: 'Schema validation only checks the SHAPE (type, required field, enum), it does NOT check a specific VALUE — a `title` field can be `string` type and non-empty while its CONTENT is wrong. Individual `.body("field", equalTo(...))` checks from H2 are additionally needed — schema answers "is the structure correct", individual checks answer "is the content correct", the two are COMPLEMENTARY.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'N+1 request örüntüsünü, backend kodunu okumadan SADECE Network panelinden gözlemleyerek nasıl fark edersin?', en: 'How do you notice an N+1 request pattern purely by observing the Network panel, without reading backend code?' },
          a: { tr: 'Bir liste sayfasının önce TEK bir `GET /bugs` request\'i attığını, ardından AYNI URL kalıbının (örn. `GET /bugs/{id}/details`) kayıt sayısı kadar TEKRARLANDIĞINI görürüm — 10 kayıt için 11 request (GRUP E5). Bu, Network panelindeki satır sayısının kayıt sayısıyla orantılı büyümesiyle GÖZLE fark edilir, kod okumaya gerek yoktur.', en: 'I see a list page fire ONE `GET /bugs` request first, then the SAME URL pattern (e.g. `GET /bugs/{id}/details`) REPEATED as many times as there are records — 11 requests for 10 records (GROUP E5). This is noticeable JUST BY EYE from the Network panel row count growing proportionally with the record count, no code reading needed.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'Bir hibrit test API ile bug oluşturup UI\'da anında görünmesini bekliyor ama test kararsız (flaky). API\'nin doğruluğuyla İLGİSİZ iki olası neden öner.', en: 'A hybrid test creates a bug via the API and expects it to instantly appear in the UI, but the test is flaky. Propose two possible causes UNRELATED to the API\'s correctness.' },
          a: { tr: 'Birincisi: UI, veriyi periyodik olarak (ör. 5 saniyede bir) POLLING ile çekiyor olabilir — test API request\'inden HEMEN sonra sayfaya gidiyorsa, UI henüz YENİLENMEMİŞ olabilir; çözüm `page.reload()` veya bir bekleme koşuludur. İkincisi: UI tarafında bir ÖNBELLEK (client-side cache) katmanı liste sonucunu ESKİ tutuyor olabilir — API doğru çalışsa da UI eski veriyi gösterir.', en: 'First: the UI may be POLLING data periodically (e.g. every 5 seconds) — if the test navigates to the page IMMEDIATELY after the API call, the UI may not have REFRESHED yet; the fix is `page.reload()` or a wait condition. Second: a client-side CACHE layer in the UI may be keeping the list result STALE — even if the API works correctly, the UI shows old data.' },
        },
        {
          level: 'intermediate',
          q: { tr: '"Doğru kod" ile "dokümana uygun kod" her zaman AYNI şey değildir — GRUP F\'teki gibi somut bir örnekle açıkla.', en: '"Correct code" and "documentation-compliant code" are not always the SAME thing — explain with a concrete example, like the ones in GROUP F.' },
          a: { tr: 'Bir geliştirici `POST /bugs`\'u `201 Created` dönecek şekilde "doğru pratiğe" göre yazar (kod DOĞRUDUR), ama spec HÂLÂ `200` vaat ediyorsa (dokümanı GÜNCELLEMEYİ unutmuşsa), kod doğru olsa bile SÖZLEŞMEYE UYMAZ (F5). Sözleşmeye güvenen bir mobil uygulama "sadece 200 = başarı" mantığıyla yazılmışsa, gerçek başarıyı hata sanır — "kod doğru, doküman eski" bir mazerettir, SORUNU çözmez.', en: 'A developer writes `POST /bugs` to return `201 Created` following "correct practice" (the code IS correct), but if the spec STILL promises `200` (the doc was never updated), the code does not MATCH THE CONTRACT even though it is correct (F5). A mobile app trusting the contract, written with "only 200 = success" logic, mistakes a real success for an error — "the code is right, the doc is old" is an excuse, it does not FIX the problem.' },
        },
        {
          level: 'intermediate',
          q: { tr: 'CI pipeline\'ında `mvn test`, `mvn spring-boot:run` uygulamayı başlatmayı BİTİRMEDEN çalışıyor. Ne olur, pipeline\'ı nasıl düzeltirsin?', en: 'Your CI pipeline runs `mvn test` BEFORE `mvn spring-boot:run` finishes starting the app. What happens, and how do you fix the pipeline?' },
          a: { tr: 'REST Assured testleri sunucuya GERÇEK bir HTTP request\'i atar — sunucu henüz dinlemeye başlamadıysa request\'ler `ECONNREFUSED` ile başarısız olur (H6, C1\'deki aynı hatayla aynı belirti). Düzeltme: uygulamayı başlatan adımı ÖNCE koymak ve gerekirse (`sleep`/healthcheck endpoint\'i) sunucunun GERÇEKTEN hazır olduğunu doğrulayan bir adım eklemek, sonra `mvn test`\'i çalıştırmaktır.', en: 'REST Assured tests send REAL HTTP requests to the server — if the server has not started listening yet, requests fail with `ECONNREFUSED` (H6, same symptom as C1\'s error). The fix: put the app-starting step FIRST, add a step (a `sleep`/healthcheck endpoint) that verifies the server is REALLY ready if needed, and only then run `mvn test`.' },
        },

        // ══════════════════ ADVANCED (15) ══════════════════
        {
          level: 'advanced',
          q: { tr: 'REST Assured POJO\'larının uygulamanın GERÇEK sözleşmesiyle uzun vadede senkron kalması için bir strateji tasarla — hem elle kayma riskini hem generator tabanlı yaklaşımları göz önüne al.', en: 'Design a strategy for keeping REST Assured POJOs in sync with the app\'s REAL contract long-term — consider both manual drift risk and generator-based approaches.' },
          a: { tr: 'Öncelik, H3\'teki gibi test POJO\'sunun uygulamanın KENDİ `Bug` sınıfıyla PAYLAŞILAN bir modül olmasıdır (mono-repo/shared-library) — bu, iki sınıfın SESSİZCE ayrışma riskini ortadan kaldırır. Paylaşılan bir modül mümkün değilse, F2\'deki gibi OpenAPI spec\'ten POJO\'ları OTOMATİK üreten bir araç (`openapi-generator`) CI\'a eklenir, böylece spec değiştiğinde POJO da OTOMATİK güncellenir; elle bakım SADECE ikisi de mümkün olmadığında son çare olmalıdır.', en: 'The priority is for the test POJO to be a SHARED module with the app\'s OWN `Bug` class, like in H3 (mono-repo/shared library) — this removes the risk of the two classes SILENTLY diverging. If a shared module is not possible, a tool that AUTOMATICALLY generates POJOs from the OpenAPI spec (`openapi-generator`), like in F2, is added to CI, so the POJO AUTOMATICALLY updates when the spec changes; manual maintenance should be a LAST RESORT only when neither is possible.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Java backend ve TypeScript frontend/QA mühendislerinden oluşan bir takımda, tek bir aracı seçmek yerine hibrit bir REST Assured + Playwright stratejisini nasıl savunursun?', en: 'On a team split between Java backend and TypeScript frontend/QA engineers, how would you argue for a hybrid REST Assured + Playwright strategy instead of picking only one?' },
          a: { tr: 'Java ekibinin API/backend-odaklı regresyon paketini REST Assured\'da tutması (H1-H6\'daki `Bug` POJO/`RequestSpecification` paylaşımı ile SIFIR sürtünme) verimlidir; ama I3\'teki hibrit güç (API+UI TEK dosyada) sadece Playwright\'ta doğal olduğundan, UI akışlarını doğrulayan senaryolar TypeScript ekosisteminde kalmalıdır. İki aracı da tutmak, HER takımın kendi güçlü olduğu dilde yazması ve CI\'da PARALEL koşabilmesi anlamına gelir — "hangisi daha iyi" değil "her ikisi de kendi bağlamında en iyisi" mantığı.', en: 'It is efficient for the Java team to keep the API/backend-focused regression suite in REST Assured (with ZERO friction via the `Bug` POJO/`RequestSpecification` sharing from H1-H6); but since I3\'s hybrid power (API+UI in ONE file) is only natural in Playwright, scenarios verifying UI flows should stay in the TypeScript ecosystem. Keeping both tools means each team writes in the language it is strong in, and CI can run them in PARALLEL — not "which is better" but "each is best in its own context".' },
        },
        {
          level: 'advanced',
          q: { tr: 'Bir enum drift contract defect\'ini (spec 3 değer diyor, kod 4\'e izin veriyor) production\'a ulaşmadan yakalayacak bir CI kapısı (gate) tasarla.', en: 'Design a CI gate that would catch an enum drift contract defect (spec says 3 values, code allows 4) before it reaches production.' },
          a: { tr: 'CI\'a H4\'teki JSON Schema Validation testini bir "contract test" olarak EKLERİM — her merge öncesi, GERÇEK API response\'u (staging\'e deploy edilmiş build üzerinden) spec\'teki `enum` listesiyle otomatik karşılaştırılır; şemadaki listede olmayan bir değer görülürse build KIRILIR. Ek olarak F2\'deki otomatik spec üretimi (springdoc/@nestjs/swagger) kullanılırsa, enum\'un kod ile spec arasında AYRIŞMASI mimari olarak imkansız hale gelir.', en: 'I ADD H4\'s JSON Schema Validation test to CI as a "contract test" — before every merge, the REAL API response (from a build deployed to staging) is automatically compared against the spec\'s `enum` list; if a value not in the schema list is seen, the build BREAKS. Additionally, if F2\'s automatic spec generation (springdoc/@nestjs/swagger) is used, the enum diverging between code and spec becomes architecturally impossible.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Bir production olayı: mobil uygulama API\'nin `created_at`\'i ISO-8601 string\'den Unix timestamp\'e değiştirmesiyle çöküyor. Bunu yayından ÖNCE yakalayacak bir contract testi tasarla.', en: 'A production incident: a mobile app crashes because the API changed `created_at` from an ISO-8601 string to a Unix timestamp. Design a contract test that would have caught this pre-release.' },
          a: { tr: 'H4\'teki JSON Schema Validation\'ı `format: date-time` kısıtıyla (F4) her CI koşumunda çalıştırırım — bir alanın TİPİ/FORMATI değiştiğinde (string yerine number) şema doğrulaması ANINDA başarısız olur, üretim kodu merge edilmeden ÖNCE. Ayrıca deploy pipeline\'ına "önceki sürümün response\'unu YENİ sürümle karşılaştır" (contract diffing) adımı eklenirse, formattaki her sessiz değişiklik otomatik FLAG\'lenir.', en: 'I run H4\'s JSON Schema Validation with the `format: date-time` constraint (F4) on every CI run — when a field\'s TYPE/FORMAT changes (a number instead of a string), schema validation FAILS INSTANTLY, BEFORE the production code is even merged. Additionally, adding a "compare the previous version\'s response against the NEW version" (contract diffing) step to the deploy pipeline automatically FLAGS any silent format change.' },
        },
        {
          level: 'advanced',
          q: { tr: 'HER otomatik testte TAM bir JSON Schema doğrulaması yapmanın, sadece hedefli alan assertion\'ları kullanmaya göre trade-off\'larını tartış.', en: 'Discuss the trade-offs of running a FULL JSON Schema validation in EVERY automated test versus using only targeted field assertions.' },
          a: { tr: 'Tam şema doğrulaması geniş bir "hiçbir alan sözleşmeden sapmadı" güvencesi verir ama YAVAŞTIR (her response\'u tüm şemayla karşılaştırır) ve şemadaki KÜÇÜK bir değişiklik (yeni bir opsiyonel alan) İLGİSİZ testleri KIRABİLİR. Hedefli assertion\'lar (H2) hızlıdır ve sadece o testin İLGİLENDİĞİ alanlara odaklanır ama şemanın GERİ KALANINDAKİ bir sapmayı KAÇIRABİLİR. Pratik denge: kritik contract testlerinde (H4, az sayıda) tam şema, günlük fonksiyonel testlerde (çoğunluk) hedefli assertion.', en: 'Full schema validation gives a broad "nothing in the contract diverged" guarantee but is SLOW (compares every response against the whole schema) and a SMALL schema change (a new optional field) can BREAK unrelated tests. Targeted assertions (H2) are fast and focus only on the fields THAT test cares about, but can MISS a divergence elsewhere in the schema. Practical balance: full schema in a small number of critical contract tests (H4), targeted assertions in the majority of everyday functional tests.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Test verisi izolasyonunun (a) elle Postman keşfi ve (b) paralel CI koşumları için MİMARİ olarak nasıl farklı kurulması gerektiğini tartış. Ayrımı yapmazsan ne kırılır?', en: 'Discuss how test data isolation should be ARCHITECTED differently for (a) manual Postman exploration and (b) parallel CI runs. What breaks if you don\'t differentiate?' },
          a: { tr: 'Elle keşifte SABİT, tekrar kullanılabilir bir test kaydı (kolay hatırlanan bir `id`) VERİMLİLİK sağlar — testerın her seferinde yeni veri oluşturmasına gerek yoktur. Paralel CI\'da ise HER test kendi BENZERSİZ verisini oluşturmalıdır (G4\'teki zincirleme) — aynı sabit `id`\'yi kullanan iki paralel test birbirinin verisini SİLEBİLİR/değiştirebilir. Ayrımı yapmazsan (CI\'da da sabit id kullanırsan) GRUP J\'deki "Postman\'de PASS, CI\'da FAIL" senaryosu tam olarak budur.', en: 'In manual exploration, a FIXED, reusable test record (an easy-to-remember `id`) provides EFFICIENCY — the tester does not need to create new data every time. In parallel CI, EVERY test must create its OWN UNIQUE data (the chaining from G4) — two parallel tests using the same fixed `id` can DELETE/change each other\'s data. If you don\'t differentiate (using a fixed id in CI too), GROUP J\'s "PASS in Postman, FAIL in CI" scenario is exactly this.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Takımın bir Express API\'yi NestJS\'e taşımayı planladığını varsay. İş mantığından DEĞİL, framework-DÜZEYİ mimari farklardan kaynaklanan regresyonları yakalayacak bir test stratejisi öner.', en: 'Assume your team is migrating an Express API to NestJS. Propose a testing strategy specifically to catch regressions from framework-LEVEL architectural differences, not business logic.' },
          a: { tr: 'Odak noktam C ve D gruplarında gördüğün YAPISAL farklar olurdu: middleware SIRASI (Express) yerine modül KAYDI (Nest) davranış değiştirir mi (D1), validation OKUNMASI (Express) yerine `ValidationPipe` KAYDI (Nest) devrede mi (D3), hata gövdesinin ŞEKLİ (`{error}` mi yoksa Nest\'in varsayılanı mı) değişti mi (D4). Bu üç noktayı hedefleyen bir contract/regression test seti (H4\'teki JSON Schema ile) migrasyon ÖNCESİ ve SONRASI aynı endpoint\'lere karşı koşulur, SADECE response ŞEKLİNDEKİ farkları raporlar.', en: 'My focus would be the STRUCTURAL differences you saw in groups C and D: does behavior change based on middleware ORDER (Express) versus module REGISTRATION (Nest) (D1), is validation active via READING the result (Express) versus `ValidationPipe` REGISTRATION (Nest) (D3), did the error body\'s SHAPE (`{error}` or Nest\'s default) change (D4). A contract/regression test set targeting these three points (with H4\'s JSON Schema) is run against the SAME endpoints BEFORE and AFTER migration, reporting ONLY differences in response SHAPE.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Şu anda "bu frontend mi backend mi sözleşme mi" diye ayrım yapan resmi bir sürecin OLMADIĞI bir takım için GRUP J\'deki katman teşhisi gibi bir escalation matrisi tasarla.', en: 'Design an escalation matrix, like GROUP J\'s layer diagnosis, for a team that currently has NO formal process for triaging "is this frontend, backend, or contract".' },
          a: { tr: 'Üç aşamalı bir karar ağacı kurarım: (1) Request sunucuya ULAŞTI MI (Network paneli, E grubu)? Ulaşmadıysa → istemci/network ekibi. (2) Ulaştıysa, response SÖZLEŞMEYE (spec, F grubu) uyuyor mu? Uymuyorsa → API sahibi ekip (spec ile GERÇEK davranış senkronize edilmeli). (3) Sözleşmeye uyuyor ama BEKLENEN İŞ SONUCU yanlışsa → backend iş mantığı ekibi. Bu matris GRUP J\'nin "belirti → katman → escalate" mantığının kurumsallaştırılmış hâlidir.', en: 'I would build a three-stage decision tree: (1) Did the request REACH the server (Network panel, GROUP E)? If not → client/network team. (2) If it reached, does the response match the CONTRACT (spec, GROUP F)? If not → the API-owning team (spec and REAL behavior must be synced). (3) If it matches the contract but the EXPECTED BUSINESS OUTCOME is wrong → the backend business-logic team. This matrix is the institutionalized form of GROUP J\'s "symptom → layer → escalate" logic.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Newman + REST Assured + Playwright\'ı tek bir CI pipeline\'ında, kapsamı TEKRARLAMADAN nasıl birlikte çalıştırırdın?', en: 'How would you architect Newman + REST Assured + Playwright to run together in a single CI pipeline without duplicating coverage?' },
          a: { tr: 'Sorumlulukları AYRIŞTIRIRIM: Postman/Newman (G6) hızlı, keşifsel/smoke testler ve manuel-yazılmış negatif senaryolar için; REST Assured (H6) Java backend ekibinin derinlemesine, POJO-tabanlı regresyon paketi için; Playwright (I3-I5) SADECE hibrit API+UI senaryoları için — SAF API testini Playwright\'ta TEKRAR yazmam. Her katman FARKLI bir soruyu cevaplar, bu yüzden aynı senaryo iki araçta YAZILMAZ; CI\'da paralel job\'lar olarak koşarlar.', en: 'I SEPARATE responsibilities: Postman/Newman (G6) for fast, exploratory/smoke tests and manually written negative scenarios; REST Assured (H6) for the Java backend team\'s deep, POJO-based regression suite; Playwright (I3-I5) ONLY for hybrid API+UI scenarios — I do NOT rewrite pure API testing in Playwright. Each layer answers a DIFFERENT question, so the same scenario is NOT WRITTEN in two tools; they run as parallel jobs in CI.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Bir güvenlik incelemesi `DELETE /bugs/{id}`\'nin sahiplik (ownership) kontrolü yapmadığını buluyor. Sadece kimliği doğrulanmış (authenticated) Postman request\'leri kullanarak, kod erişimi OLMADAN bunu nasıl yakalardın?', en: 'A security review finds that `DELETE /bugs/{id}` does not check ownership. Using only authenticated Postman requests, WITHOUT code access, how would you have caught this?' },
          a: { tr: 'İki farklı kullanıcı hesabıyla iki token alırım; Kullanıcı A\'nın bug\'ını Kullanıcı B\'nin token\'ıyla SİLMEYİ denerim. Beklenen sonuç `403 Forbidden`\'dır (A5\'teki yetki farkı); `200`/`204` gelirse bu bir IDOR (Insecure Direct Object Reference) güvenlik açığıdır. Bu test SADECE Postman + iki farklı token ile, hiçbir kod erişimi olmadan tasarlanabilir ve çalıştırılabilir — güvenlik testinin API testinden AYRI bir disiplin olmadığının kanıtıdır.', en: 'I get two tokens with two different user accounts; I try to DELETE User A\'s bug with User B\'s token. The expected result is `403 Forbidden` (the authorization difference from A5); getting `200`/`204` means this is an IDOR (Insecure Direct Object Reference) security hole. This test can be designed and run with ONLY Postman + two different tokens, with zero code access — proof that security testing is not a SEPARATE discipline from API testing.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Timing sekmesindeki bulguların (büyük `Waiting` fazı) performans testi açısından ne anlama geldiğini tartış — backend\'de NEYİ araştırmayı önerirsin, NEYİ suçlamazsın?', en: 'Discuss the performance-testing implications of Timing tab findings (a large `Waiting` phase) — what would you recommend investigating on the backend, and what would you NOT blame?' },
          a: { tr: 'Büyük `Waiting`, sunucunun request\'i İŞLERKEN yavaş olduğunu gösterir — araştıracağım ilk şeyler yavaş bir SQL sorgusu (indeks eksikliği), bir N+1 request örüntüsü (E5) veya senkron bir dış servis çağrısıdır. SUÇLAMAYACAĞIM şey ağ/veri boyutu — `Content-Download` küçükse (E4), bant genişliği veya response boyutu bu gecikmenin nedeni DEĞİLDİR; bu yanlış katmana odaklanıp gerçek sorunu (backend işlem mantığı) gözden kaçırmak anlamına gelir.', en: 'A large `Waiting` shows the server is slow while PROCESSING the request — the first things I would investigate are a slow SQL query (missing index), an N+1 request pattern (E5), or a synchronous external service call. What I would NOT blame is network/data size — if `Content-Download` is small (E4), bandwidth or response size is NOT the cause of this delay; focusing on the wrong layer means missing the real problem (backend processing logic).' },
        },
        {
          level: 'advanced',
          q: { tr: 'POST endpoint\'lerinin tasarım gereği neden idempotent OLMADIĞINI açıkla ve bir istemcinin network timeout\'unda saf bir şekilde POST\'u yeniden denemesinin somut bir gerçek-dünya sonucunu ver.', en: 'Explain why POST endpoints are non-idempotent by design, and give a concrete real-world consequence if a client naively retries a POST on network timeout.' },
          a: { tr: 'POST her çağrıldığında YENİ bir kaynak (yeni bir `id`) oluşturur — AYNI request\'i 2 kez göndermek 2 AYRI kayıt üretir (idempotent OLMAMASI budur, A4). Somut sonuç: bir istemci bir POST request\'i timeout\'a uğradığında (response gelmeden önce) "başarısız oldu" sanıp OTOMATİK yeniden denerse, sunucu aslında ilk request\'i İŞLEMİŞ olabilir ve şimdi AYNI bug\'ın İKİ KOPYASI oluşur — GRUP E5\'teki "çift POST" defect\'inin timeout versiyonu.', en: 'POST creates a NEW resource (a new `id`) every time it is called — sending the SAME request twice produces 2 SEPARATE records (this is what non-idempotent means, A4). Concrete consequence: if a client\'s POST request times out (before the response arrives) and it assumes "it failed" and AUTOMATICALLY retries, the server may have actually PROCESSED the first request, and now TWO COPIES of the SAME bug exist — the timeout version of GROUP E5\'s "double POST" defect.' },
        },
        {
          level: 'advanced',
          q: { tr: 'Playwright\'ta `storageState` tabanlı kimlik doğrulamanın, dikkatsizce TÜM test paketinde kullanıldığında GERÇEK bir login bug\'ını nasıl GİZLEYEBİLECEĞİNİ tartış.', en: 'Discuss how `storageState`-based authentication in Playwright could MASK a real login bug if used carelessly across the WHOLE test suite.' },
          a: { tr: 'I4\'teki `storageState`, login formunu HİÇ TETİKLEMEDEN oturum yükler — eğer TÜM test paketi bu kısayolu kullanıyorsa ve login FORMUNUN kendisi hiçbir zaman AYRI test edilmiyorsa, formda gerçek bir bug (bir buton kırık, bir validation hatalı) FARK EDİLMEZ. Doğru mimari: birkaç ÖZEL test login akışını UI\'dan UÇTAN UCA test eder (regresyon garantisi için), GERİ KALAN testler ise (I3\'teki gibi) hızlı `storageState`\'i kullanır — ikisi birbirinin YERİNE geçmez.', en: 'I4\'s `storageState` loads a session WITHOUT EVER TRIGGERING the login form — if the WHOLE test suite uses this shortcut and the login FORM itself is never tested SEPARATELY, a real bug in the form (a broken button, faulty validation) goes UNNOTICED. The correct architecture: a few DEDICATED tests exercise the login flow END TO END through the UI (for regression assurance), the REST of the tests use the fast `storageState` (like in I3) — neither REPLACES the other.' },
        },
        {
          level: 'advanced',
          q: { tr: 'QA test kapsamı açısından, elle yazılan ile otomatik üretilen (springdoc/@nestjs/swagger) OpenAPI spec\'lerinin uzun vadeli bakım maliyetini karşılaştır.', en: 'Compare the long-term maintenance cost of hand-written versus auto-generated (springdoc/@nestjs/swagger) OpenAPI specs, from a QA test-coverage perspective.' },
          a: { tr: 'Elle yazılan spec\'in maliyeti ZAMANLA ARTAR — her kod değişikliğinde AYRICA güncellenmesi gerekir ve F5\'teki gibi contract defect\'lerin en sık kaynağıdır. Otomatik üretilen spec\'in İLK kurulum maliyeti (annotation/decorator disiplinini öğrenmek) daha yüksektir ama SÜREKLİ bakım maliyeti neredeyse SIFIRDIR — kod ile spec ASLA ayrışamaz. QA kapsamı açısından bu, H4\'teki contract testlerinin GÜVENİLİRLİĞİNİ doğrudan etkiler: otomatik üretilen bir spec\'e karşı yazılan testler daha az "yanlış pozitif/negatif" üretir.', en: 'A hand-written spec\'s cost GROWS OVER TIME — it must be SEPARATELY updated on every code change and is the most common source of contract defects, as in F5. An auto-generated spec has a HIGHER upfront cost (learning annotation/decorator discipline) but its ONGOING maintenance cost is nearly ZERO — code and spec can NEVER diverge. From a QA coverage perspective, this directly affects the RELIABILITY of H4\'s contract tests: tests written against an auto-generated spec produce fewer "false positives/negatives".' },
        },
        {
          level: 'advanced',
          q: { tr: 'Hiç `RequestSpecification` veya POJO kullanmayan, her testin kurulumu ve JSON ayrıştırmasını TEKRARLADIĞI bir REST Assured paketini devraldın. Bir refactor planını ÖNCELİKLENDİR ve sırayı gerekçelendir.', en: 'You inherit a REST Assured suite with zero use of `RequestSpecification` or POJOs — every test duplicates setup and manual JSON parsing. Prioritize a refactor plan and justify the order.' },
          a: { tr: 'ÖNCE `RequestSpecification`\'ı çıkarırım (H5) — bu en YÜKSEK riskli tekrarı (baseUri/header, F5\'teki gibi sessiz ortam ayrışması riski taşır) en HIZLI şekilde giderir ve TÜM testleri etkiler. SONRA POJO deserialization\'a geçerim (H3) — bu, uygulamanın `Bug` sınıfıyla PAYLAŞILAN bir bağ kurar ve elle JSON ayrıştırmadaki kırılganlığı yok eder. EN SON JSON Schema Validation\'ı (H4) ekler, mevcut tek tek assertion\'ları TAMAMLARIM — çünkü bu bir EKLEME\'dir, mevcut testleri BOZMA riski taşımaz, bu yüzden en güvenli adım en sona bırakılır.', en: 'I extract `RequestSpecification` FIRST (H5) — this fixes the HIGHEST-risk duplication (baseUri/header, carrying the same silent environment-divergence risk as F5) FASTEST and affects ALL tests. THEN I move to POJO deserialization (H3) — this creates a SHARED bond with the app\'s `Bug` class and removes the fragility of manual JSON parsing. LAST I add JSON Schema Validation (H4) to COMPLEMENT the existing individual assertions — because this is an ADDITION, it carries no risk of BREAKING existing tests, so the safest step is saved for last.' },
        },
      ],
    },
  ],
}

// ─── sections: düz liste (sidebar bunu birebir sekme olarak render eder) ─────
const sections = [
  A1, A2, A3, A4, A5, A6, A7,
  B1, B2, B3, B4, B5, B6, B7, B8,
  C1, C2, C3, C4, C5, C6,
  D1, D2, D3, D4, D5,
  E1, E2, E3, E4, E5, E6,
  F1, F2, F3, F4, F5, F6,
  G1, G2, G3, G4, G5, G6,
  H1, H2, H3, H4, H5, H6,
  I1, I2, I3, I4, I5,
  J,
  K,
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

const trSeoAnswer = 'API testi, bir uygulamanın arayüzü olmadan, doğrudan sunduğu HTTP endpoint\'lerine istek göndererek doğru veriyi, doğru durum kodunu ve doğru hata davranışını döndürüp döndürmediğini kontrol etmektir. En yaygın araçlar Postman (elle test), REST Assured (Java ile otomasyon) ve Playwright\'ın API modülüdür. Arayüz testinden farkı, veritabanı ve iş mantığına arayüzün üzerinden geçmeden, çok daha hızlı ve kararlı şekilde ulaşmasıdır — bu yüzden regresyon testlerinin önemli bir kısmı API seviyesinde yazılır.';
const enSeoAnswer = 'API testing means sending requests directly to an application\'s HTTP endpoints, without going through its user interface, to verify that it returns the right data, the right status code and the right error behavior. The most common tools are Postman for manual testing, REST Assured for Java-based automation, and Playwright\'s API module. Its key advantage over UI testing is speed and stability — it reaches the database and business logic without passing through the interface, which is why a large share of regression tests are written at the API level.';

const trTabs = sections.map(s => s.title.tr)
const enTabs = sections.map(s => s.title.en)

// ─── Export (tek ağaç: sections İKİ dile de aynı referans) ───────────────────
export const apiTestingData = {
  tr: { hero: trHero, tabs: trTabs, sections, seoAnswer: trSeoAnswer },
  en: { hero: enHero, tabs: enTabs, sections, seoAnswer: enSeoAnswer },
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
    promptTr: 'Bir JSON response\'unda `"reporter": null` ile reporter alanının HİÇ olmaması arasındaki farkı ve bunun neden bir tester için önemli olduğunu kendi cümlelerinle anlat.',
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
    modelAnswerTr: 'Express minimal bir framework olduğu için hiçbir şeyi senin yerine otomatik yapmaz: bir doğrulama kütüphanesi kural TANIMLAR ama sonucu OKUYUP karar vermek (validationResult + 400 döndürmek) sana kalır; aynı şekilde express.json() gibi bir middleware doğru sırada kayıtlı değilse route hiç çalışmasa da hata vermez, sadece veriyi sessizce boş bırakır. Bu yüzden Express\'te "kod var" ile "kod gerçekten devrede" arasında bir boşluk vardır ve tester bunu her zaman gerçek bir request\'le doğrular.',
    modelAnswerEn: 'Because Express is a minimal framework it does not do anything automatically for you: a validation library DEFINES rules but READING the result and deciding (calling validationResult and returning 400) is left to you; likewise, if a middleware like express.json() is not registered in the right order, the route does not error, it just silently leaves the data empty. This is why in Express there is a gap between "the code exists" and "the code is really active", and a tester always verifies it with a real request.',
  },
  {
    sectionIndex: 25,
    promptTr: 'NestJS\'te bir decorator/pipe/filter "doğru yazılmış" olmasına rağmen neden hiçbir etkisi olmayabilir — sektöre yeni giren birine, modül/global kayıt kavramını kullanarak kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why a decorator/pipe/filter in NestJS can be "written correctly" yet have zero effect, using the module/global-registration concept, to a newcomer.',
    keywords: ['modul', 'kayit', 'global', 'pipe', 'filter', 'validationpipe', 'nest'],
    minScore: 3,
    modelAnswerTr: 'Nest, Spring gibi decorator tabanlı bir yapı kullanır ama Spring\'in aksine bileşenleri otomatik taramaz: bir controller @Module\'ün controllers dizisine EKLENMEZSE hiç çalışmaz, bir DTO\'nun class-validator decorator\'ları main.ts\'te app.useGlobalPipes(new ValidationPipe()) çağrılmazsa asla tetiklenmez, bir Exception Filter da app.useGlobalFilters(...) ile kaydedilmezse devreye girmez. Yani decorator YAZMAK ile onu GLOBAL olarak KAYDETMEK iki ayrı adımdır; tester her ikisinin de yapıldığını gerçek bir request\'le doğrular, sadece dosyayı okumakla yetinmez.',
    modelAnswerEn: 'Nest uses a decorator-based structure like Spring, but unlike Spring it does not scan components automatically: a controller never works if it is not ADDED to @Module\'s controllers array, a DTO\'s class-validator decorators never trigger unless app.useGlobalPipes(new ValidationPipe()) is called in main.ts, and an Exception Filter never engages unless registered with app.useGlobalFilters(...). So WRITING a decorator and GLOBALLY REGISTERING it are two separate steps; a tester verifies both were done with a real request, never settling for just reading the file.',
  },
  {
    sectionIndex: 31,
    promptTr: 'UI\'da "her şey normal görünüyor" olması neden bir testere yeterli bir kanıt değildir — Network panelinin bunu nasıl çürüttüğünü sektöre yeni giren birine kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why the UI "looking fine" is not sufficient evidence for a tester — how the Network panel disproves it — to a newcomer.',
    keywords: ['network', 'ui', 'status', 'sessiz', 'response', 'panel', 'gercek'],
    minScore: 3,
    modelAnswerTr: 'UI ekranında gösterilen mesaj geliştiricinin YAZDIĞI bir metindir, sunucunun GERÇEKTEN döndürdüğü cevap değildir; hata durumu (catch bloğu) yanlışlıkla veya hiç yazılmamışsa UI "başarılı" der ama sunucu aslında 500 dönmüş, boş bir veri göndermiş veya olmaması gereken bir alan (passwordHash gibi) sızdırmış olabilir. Network paneli bu ikisi arasındaki farkı ortaya çıkaran tek yerdir; bu yüzden tester her zaman UI mesajına değil Network panelindeki gerçek Status/Response\'a güvenir.',
    modelAnswerEn: 'The message shown in the UI is text the developer WROTE, not the server\'s REAL answer; if the error case (the catch block) is mistakenly or never written, the UI says "success" while the server actually returned 500, sent empty data, or leaked a field that should not exist (like passwordHash). The Network panel is the only place that reveals the gap between the two; that is why a tester always trusts the real Status/Response in the Network panel, not the UI message.',
  },
  {
    sectionIndex: 37,
    promptTr: 'Bir geliştiricinin "kod doğru, doküman eski" demesi neden bir mazeret değil bir bug\'dır — sektöre yeni giren birine, sözleşmeye güvenen başka sistemleri örnek göstererek kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why a developer saying "the code is right, the doc is old" is not an excuse but a bug — using other systems that trust the contract as an example, to a newcomer.',
    keywords: ['sozlesme', 'spec', 'dokuman', 'guven', 'mobil', 'contract', 'ayrisma'],
    minScore: 3,
    modelAnswerTr: 'Bir API spec\'i sadece bir not değil, başka sistemlerin (mobil uygulama, üçüncü taraf entegrasyon, otomasyon testi) GÜVENDİĞİ bir sözleşmedir. Kod değişip spec güncellenmezse, spec\'e güvenerek yazılmış bir istemci hâlâ ESKİ vaade göre çalışır — örneğin dokümanda 200 yazarken kod 201 dönerse, "sadece 200 = başarı" mantığıyla yazılmış bir mobil uygulama gerçek başarıyı hata sanır. Bu yüzden "kod doğru, doküman eski" bir açıklama olabilir ama SORUNU çözmez; spec de kodla birlikte güncellenmelidir.',
    modelAnswerEn: 'An API spec is not just a note, it is a contract other systems (a mobile app, a third-party integration, an automation test) TRUST. If the code changes and the spec is not updated, a client written trusting the spec still operates on the OLD promise — for example, if the doc says 200 while the code returns 201, a mobile app written with "only 200 = success" logic mistakes a real success for an error. So "the code is right, the doc is old" can be an explanation, but it does not FIX the problem; the spec must be updated along with the code.',
  },
  {
    sectionIndex: 43,
    promptTr: 'Postman\'de bir test koleksiyonunu Newman ile CI\'a bağlamak neden elle koşmaktan daha güvenilirdir — sektöre yeni giren birine kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why wiring a Postman test collection into CI with Newman is more reliable than running it manually, to a newcomer.',
    keywords: ['newman', 'ci', 'otomatik', 'push', 'unutma', 'regresyon', 'mvn'],
    minScore: 3,
    modelAnswerTr: 'Elle çalıştırılan bir koleksiyon insan hafızasına bağımlıdır — bir geliştirici testleri koşmayı unutabilir. Newman, koleksiyonu komut satırından çalıştırabilir hale getirir; bunu bir CI pipeline\'ına (GitHub Actions) bağlayınca testler HER push\'ta otomatik çalışır. Böylece GRUP B-D\'deki kodda bir regresyon olduğunda, bunu bir insanın hatırlaması değil CI\'ın otomatik koşumu yakalar.',
    modelAnswerEn: 'A manually run collection depends on human memory — a developer can forget to run the tests. Newman makes the collection runnable from the command line; wiring this into a CI pipeline (GitHub Actions) makes the tests run automatically on EVERY push. So when a regression appears in the GROUP B-D code, it is CI\'s automatic run that catches it, not a human remembering.',
  },
  {
    sectionIndex: 49,
    promptTr: 'REST Assured ile JUnit 5/TestNG arasındaki iş bölümünü — kim request\'i gönderir, kim testi çalıştırıp raporlar — sektöre yeni giren birine kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, the division of labor between REST Assured and JUnit 5/TestNG — who sends the request, who runs and reports the test — to a newcomer.',
    keywords: ['restassured', 'junit', 'testng', 'calistir', 'rapor', 'given', 'mvn'],
    minScore: 3,
    modelAnswerTr: 'REST Assured sadece bir HTTP istemci kütüphanesidir — given/when/then ile request\'i gönderir ve doğrular. Ama bu kodu KİMİN çalıştıracağı ve sonucu KİMİN raporlayacağı ayrı bir sorudur; bunun cevabı JUnit 5 veya TestNG\'dir. @Test annotation\'ı ile işaretlenen metodu bu çalıştırıcılar bulur, çalıştırır ve bir rapor üretir; mvn test bu ikisini CI\'da tetikler.',
    modelAnswerEn: 'REST Assured is just an HTTP client library — it sends and verifies the request with given/when/then. But WHO runs this code and WHO reports the result is a separate question; the answer is JUnit 5 or TestNG. These runners find the method marked with @Test, run it, and produce a report; mvn test triggers both in CI.',
  },
  {
    sectionIndex: 54,
    promptTr: 'REST Assured ile Playwright arasında seçim yaparken "hangisi daha iyi" yerine hangi soruyu sormak gerekir — sektöre yeni giren birine kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, what question to ask instead of "which is better" when choosing between REST Assured and Playwright, to a newcomer.',
    keywords: ['ekosistem', 'takim', 'dil', 'hibrit', 'java', 'typescript', 'sectiing'],
    minScore: 3,
    modelAnswerTr: '"Hangisi daha iyi" yanlış sorudur; doğru soru "takım hangi dilde/ekosistemde yaşıyor" ve "API+UI\'ı aynı dosyada birleştirmeye ihtiyacım var mı"dır. Takım zaten Java/Selenium/REST Assured ile çalışıyorsa REST Assured sürtünmesizdir. Takım TypeScript/Playwright ile UI testi yazıyorsa ve I3\'teki gibi hibrit teste ihtiyaç varsa Playwright daha tutarlıdır.',
    modelAnswerEn: '"Which is better" is the wrong question; the right question is "which language/ecosystem does the team live in" and "do I need to combine API+UI in the same file". If the team already works in Java/Selenium/REST Assured, REST Assured is frictionless. If the team writes UI tests in TypeScript/Playwright and needs hybrid testing like I3, Playwright is more consistent.',
  },
  {
    sectionIndex: 55,
    promptTr: 'Bu sayfadaki bir hata sözlüğünün "ezberlenecek liste" değil "başvuru kaynağı" olarak kullanılması gerektiğini — hiç görmediğin yeni bir hatayla karşılaşan bir tester örneğiyle — kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why an error dictionary like this should be used as a "reference resource" rather than a "list to memorize" — using the example of a tester facing a brand-new error they have never seen — to a newcomer.',
    keywords: ['katman', 'teshis', 'belirti', 'kok neden', 'network', 'sozlesme', 'escalate'],
    minScore: 3,
    modelAnswerTr: 'Gerçek production hataları burada BİREBİR olmayabilir, ama sözlükteki her giriş aynı düşünme biçimini öğretir: önce belirtiyi (hata mesajı, status kodu) topla, sonra request\'in sunucuya ulaşıp ulaşmadığını Network panelinde kontrol ederek katmanı (istemci/network, sunucu/kod, sözleşme/spec) belirle, sonra o katmanın sahibine escalate et. Hiç görmediğim yeni bir hatada da bu ÜÇ ADIMI (belirti → katman → escalate) uygularım, listeyi ezbere bilmeme gerek kalmaz.',
    modelAnswerEn: 'A real production error may not be EXACTLY here, but every entry in the dictionary teaches the same way of thinking: first gather the symptom (error message, status code), then determine the layer (client/network, server/code, contract/spec) by checking in the Network panel whether the request reached the server, then escalate to that layer\'s owner. For a brand-new error I have never seen, I apply the same THREE STEPS (symptom → layer → escalate), without needing to memorize the list.',
  },
  {
    sectionIndex: 56,
    promptTr: 'Bu sayfadaki 50 mülakat sorusunun neden "X nedir?" tarzı tanım sorularından değil, senaryo tabanlı sorulardan oluştuğunu — bir mülakatçının GERÇEKTE ne ölçmek istediğini düşünerek — kendi cümlelerinle anlat.',
    promptEn: 'Explain, in your own words, why the 50 interview questions on this page are scenario-based rather than "what is X?" definition questions — by thinking about what an interviewer REALLY wants to measure.',
    keywords: ['senaryo', 'production', 'kok neden', 'katman', 'mulakat', 'deneyim'],
    minScore: 3,
    modelAnswerTr: 'Bir mülakatçı "X nedir?" sorusuyla sadece ezberi ölçer; "production\'da şunu gördün, ne yaparsın?" sorusuyla ise adayın GERÇEK bir defect\'in kök nedenini bulup doğru katmana/ekibe yönlendirebildiğini ölçer. Bu sayfadaki her soru, A\'dan J\'ye kadar gördüğüm gerçek bir senaryoya (eksik dependency, middleware sırası, contract defect, test izolasyonu) dayanıyor; bu yüzden tanımı ezberlemek yerine mekanizmayı anlamak cevap vermemi sağlıyor.',
    modelAnswerEn: 'An interviewer asking "what is X?" only measures memorization; asking "you saw this in production, what do you do?" measures whether the candidate can find a REAL defect\'s root cause and route it to the right layer/team. Every question on this page is based on a real scenario I saw from A to J (a missing dependency, middleware order, a contract defect, test isolation); so understanding the mechanism, rather than memorizing a definition, is what lets me answer.',
  },
]

fillMissingFeynman(apiTestingData, apiFeynmanDefs)
