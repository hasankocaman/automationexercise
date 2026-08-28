// QA Shop Detaylı Test Rehberi (Admin Only)
//
// Bu sayfa tester'ların bağımsız olarak test case yazması ve uygulamayı
// keşfetmesi için rehberdir. Swagger, user story'ler ve hata kataloğuna
// ek olarak her duruma ait test stratejisi ve edge case'ler burada anlatılır.
//
// Yapı: şartname sayfasındaki 16 user story'nin her birinde test case
// yazarken nelere dikkat edilmeli, hangi API endpoint'lerini kullanmalı, hangi
// hata senaryoları denenmeli, hangi gizli defect anahtarları test etmeli.

export const qaShopDetailedGuideData = {
  title: 'QA Shop Detaylı Test Rehberi (Admin Only)',
  description: 'Tester\'ların bağımsız olarak test yazması için rehber',
  sections: [
    {
      id: 'intro',
      titleTr: 'Başlangıç — Tester Bağımsızlığı',
      titleEn: 'Getting Started — Tester Independence',
      blocks: [
        {
          type: 'text',
          tr: `Bu sayfa, tester\'ların **Swagger API sözleşmesi**, **16 user story** ve **ürün hata kataloğu** ile çalışarak kendileri test case yazmasını desteklemek için yazılmıştır.

Sizin rolünüz rehber olmak; test case\'leri yazmak DEĞİL. Tester\'ların:
- Uygulamayı ilk kez keşfetmesi
- Swagger'dan hangi endpoint'leri nasıl çağıracağını öğrenmesi
- User story'lerden test case'lerini çıkarması
- Hata senaryolarını tespit etmesi
- Gizli defect'leri bulması

Bu yolculuğun bir kısmıdır. İşte her user story için bilmeniz gereken teknik detaylar:`,
          en: `This page is designed to help testers work independently with the **Swagger API contract**, **16 user stories**, and **product error catalog** to write their own test cases.

Your role is to provide guidance; not to write test cases. Testers should:
- Discover the application for the first time
- Learn how to call each endpoint from Swagger
- Extract test cases from user stories
- Identify error scenarios
- Find hidden bugs

Here are the technical details testers need to know for each user story:`,
        },
      ],
    },
    {
      id: 'us-01-sandbox-creation',
      titleTr: 'US-01: Kendi Alanını Aç (Sandbox Oluştur)',
      titleEn: 'US-01: Create Your Own Sandbox',
      blocks: [
        {
          type: 'text',
          tr: `**Tester ne yapacak?**
POST /api/v1/sandbox isteğini başlamadan çağrarak kendi izole sandbox'ını oluşturması. Hiç kayıt gerekmiyor.

**API Endpoint:**
- POST /api/v1/sandbox
- Body: \`{"label":"My QA Shop"}\` (isteğe bağlı)
- Response: sandboxId, apiKey, expiresAt (7 gün)

**Test Strategy:**
1. **Başarılı oluşturma:** POST çağrısı 201 döndürmeli, apiKey ver
2. **API key'i header'a koy:** Bundan sonraki TÜM isteklerde \`X-Sandbox-Key: <apiKey>\` ekle
3. **TTL kontrol:** expiresAt 7 gün sonrasını göstermeli
4. **Birden çok sandbox:** Aynı user aynı anda birden çok sandbox açabilmeli

**Gizli Defect'ler (Hidden Bugs):**
- Hiçbiri yoktur; sandbox oluşturma clean bir işlemdir.

**Edge Case'ler:**
- Label 80 karakterden uzun olabilir mi? → Sunucu kesecektir
- Çok hızlı arka arkaya çağrılar? → Paralellik test edilebilir`,
          en: `**What will the tester do?**
Call POST /api/v1/sandbox before doing anything to create their own isolated sandbox. No registration needed.

**API Endpoint:**
- POST /api/v1/sandbox
- Body: \`{"label":"My QA Shop"}\` (optional)
- Response: sandboxId, apiKey, expiresAt (7 days)

**Test Strategy:**
1. **Successful creation:** POST should return 201 with apiKey
2. **Add API key to header:** From now on, add \`X-Sandbox-Key: <apiKey>\` to ALL requests
3. **TTL check:** expiresAt should be 7 days from now
4. **Multiple sandboxes:** Same user should be able to open multiple sandboxes simultaneously

**Hidden Bugs:**
- None; sandbox creation is a clean operation.

**Edge Cases:**
- What if label is longer than 80 chars? → Server will truncate it
- Rapid consecutive calls? → Parallelism can be tested`,
        },
      ],
    },
    {
      id: 'us-02-user-login',
      titleTr: 'US-02: Demo Kullanıcı ile Giriş Yap',
      titleEn: 'US-02: Login with Demo User',
      blocks: [
        {
          type: 'text',
          tr: `**Tester ne yapacak?**
POST /auth/login çağrısı ile demo kullanıcı (demo@qashop.test / Password123!) ile giriş yapması ve token alması.

**API Endpoint:**
- POST /api/v1/auth/login
- Header: \`X-Sandbox-Key: <apiKey>\` (sandbox oluştur isteği sonrası)
- Body: \`{"email":"demo@qashop.test","password":"Password123!"}\`
- Response: token (JWT), expiresIn (3600 saniye)

**Test Strategy:**
1. **Başarılı giriş:** 200 döndürmeli, JWT token ver
2. **Token süresi:** expiresIn 3600 saniye (1 saat) olmalı
3. **Yanlış şifre:** 401 Unauthorized döndürmeli
4. **Yanlış kullanıcı:** 401 döndürmeli
5. **Token'ı Authorization header'a koy:** \`Authorization: Bearer <token>\`

**Gizli Defect'ler (Yakalanması Gereken):**
- **bug_flag: "skip_auth"** — giriş atlanabilir; hiçbir endpoint giriş gerektirmez
- Tester bu flag'i açarsa tüm istekler başarılı olur, ama bu ürünün GERÇEK davranışı değildir

**Edge Case'ler:**
- Çok hızlı arka arkaya giriş? → Rate limiting var mı?
- Geçersiz JWT ile istek? → 401 mi yoksa 403 mü?
- Token süresi dolmuş? → 401 Unauthorized döndürmeli`,
          en: `**What will the tester do?**
Call POST /auth/login with the demo user (demo@qashop.test / Password123!) to log in and get a token.

**API Endpoint:**
- POST /api/v1/auth/login
- Header: \`X-Sandbox-Key: <apiKey>\` (after creating sandbox)
- Body: \`{"email":"demo@qashop.test","password":"Password123!"}\`
- Response: token (JWT), expiresIn (3600 seconds)

**Test Strategy:**
1. **Successful login:** Should return 200 with JWT token
2. **Token expiry:** expiresIn should be 3600 seconds (1 hour)
3. **Wrong password:** Should return 401 Unauthorized
4. **Non-existent user:** Should return 401
5. **Add token to header:** \`Authorization: Bearer <token>\`

**Hidden Bugs (To Be Caught):**
- **bug_flag: "skip_auth"** — authentication can be skipped; no endpoint requires login
- If tester enables this flag, all requests succeed, but this is NOT the real product behavior

**Edge Cases:**
- Rapid consecutive logins? → Is there rate limiting?
- Invalid JWT in request? → 401 or 403?
- Expired token? → Should return 401 Unauthorized`,
        },
      ],
    },
    {
      id: 'us-03-browse-catalog',
      titleTr: 'US-03 ila US-05: Kataloğu Tarayıp Ürün Detayı Görmek',
      titleEn: 'US-03 to US-05: Browse Catalog and View Product Details',
      blocks: [
        {
          type: 'text',
          tr: `**Üç user story aynı API endpoint'lerini kullanır:**
- US-03: Kategoriye göre ürünleri listele
- US-04: Ürün detayına erişme (siluet ve açıklama)
- US-05: Ürün türü ve fiyat seçimi

**API Endpoint'ler:**
- GET /api/v1/products — tüm ürünleri sayfalanmış listele (page, size parametreleri)
- GET /api/v1/products/:id — tek ürün detayı, variant'lar ve ilgili story'ler
- GET /api/v1/categories — tüm kategoriler (filtreleme için)

**Test Strategy (Her üç US için):**
1. **Sayfalanma:** page=1&size=10 ile istekleri test et; başka page'leri de iste
2. **Kategori filtreleme:** ?categoryId=<id> ile sadece o kategorideki ürünler gelir mi?
3. **Arama:** ?search=red ile isim/açıklamada "red" olanlar gelir mi?
4. **Variant'lar:** Aynı ürünün (örn. "Red Shirt") farklı bedenleri (XS, S, M) variant'lar mı?
5. **Fiyat:** Her variant'ın kendi fiyatı var mı?
6. **Stok:** available_qty kalan stok gösteriyor mu?

**Gizli Defect'ler (Yakalanması Gereken):**
- **bug_flag: "wrong_prices"** — ürün fiyatları yanlış gösterilir
- **bug_flag: "hidden_products"** — bazı ürünler listeye gelmez ama doğrudan URL ile erişilebilir
- Tester bu flag'leri açarsa katalog tamamlanmamış veya yanlış görünür

**Edge Case'ler:**
- Sayfa numarası son sayfadan sonra? → Boş liste mi yoksa error mi?
- Size=999? → Sunucu sınırlandırıyor mu?
- Yanlış kategori ID? → 404 mi yoksa boş liste mi?
- İlişkili story'ler (US-04 hover story'sinde bahsedilenler) fetch edilmeli mi?`,
          en: `**Three user stories use the same API endpoints:**
- US-03: List products by category
- US-04: Access product details (silhouette and description)
- US-05: Select product variant and price

**API Endpoints:**
- GET /api/v1/products — list all products paginated (page, size parameters)
- GET /api/v1/products/:id — single product detail with variants and related stories
- GET /api/v1/categories — all categories (for filtering)

**Test Strategy (For All Three US):**
1. **Pagination:** Test with page=1&size=10; request other pages
2. **Category filtering:** ?categoryId=<id> returns only products in that category?
3. **Search:** ?search=red returns items with "red" in name/description?
4. **Variants:** Does same product (e.g., "Red Shirt") have different sizes (XS, S, M) as variants?
5. **Pricing:** Does each variant have its own price?
6. **Stock:** Does available_qty show remaining stock?

**Hidden Bugs (To Be Caught):**
- **bug_flag: "wrong_prices"** — product prices are displayed incorrectly
- **bug_flag: "hidden_products"** — some products don't appear in list but are accessible by direct URL
- When tester enables these flags, catalog appears incomplete or wrong

**Edge Cases:**
- Page number beyond last page? → Empty list or error?
- Size=999? → Does server enforce a limit?
- Invalid category ID? → 404 or empty list?
- Related stories (mentioned in US-04 hover) — should they be fetched?`,
        },
      ],
    },
    {
      id: 'us-06-add-to-cart',
      titleTr: 'US-06: Sepete Ürün Ekleme',
      titleEn: 'US-06: Add Product to Cart',
      blocks: [
        {
          type: 'text',
          tr: `**Tester ne yapacak?**
Ürün variant'ını seçip POST /carts/:id/items ile sepete eklemesi.

**API Endpoint'ler:**
- POST /api/v1/carts — yeni sepet oluştur (otomatik, ilk çağrı sırasında)
- POST /api/v1/carts/:id/items — variant ekle; body: \`{"variantId":"<id>","qty":1}\`
- GET /api/v1/carts/:id — sepet durumunu kontrol et

**Test Strategy:**
1. **Sepet oluşturma:** İlk POST /carts çağrısında yeni sepet oluşturulmalı
2. **Ürün ekleme:** Sepete ürün eklendiğinde cart_items tablosuna bir satır eklenmeli
3. **Stok kontrol:** Sepete eklenen ürünün reserved_qty artmalı, stock_qty azalmamalı
4. **Tekrar ekleme:** Aynı variant tekrar eklenirse qty artmalı, ikinci satır olmamalı
5. **Maksimum qty:** Sepete 100 adet aynı ürün ekleyebilir mi? Sınır var mı?

**Gizli Defect'ler (Yakalanması Gereken):**
- **bug_flag: "skip_reserve"** — stok rezervasyonu yapılmaz; reserved_qty artmaz, stok hemen azalır
- **bug_flag: "double_charge"** — sepete aynı ürünü iki kez eklerken iki satır oluşturulur (bir satırda qty artmalı)
- Tester bu flag'leri açarsa stok yönetimi bozulur veya sepet çiftleşmiş item'ler barındırır

**Edge Case'ler:**
- Stok 0 olan ürün sepete eklenebilir mi? → 400/409 Conflict döndürmeli
- Negatif qty? → 400 Bad Request
- Sepet silinmişse? → 404 Not Found
- Sepet başka sandbox'a ait ise? → 403 Forbidden`,
          en: `**What will the tester do?**
Select a product variant and add it to cart using POST /carts/:id/items.

**API Endpoints:**
- POST /api/v1/carts — create new cart (automatic on first call)
- POST /api/v1/carts/:id/items — add variant; body: \`{"variantId":"<id>","qty":1}\`
- GET /api/v1/carts/:id — check cart status

**Test Strategy:**
1. **Cart creation:** First POST /carts should create a new cart
2. **Add product:** Adding to cart should insert row in cart_items
3. **Stock check:** added product's reserved_qty should increase; stock_qty should not decrease
4. **Add again:** Adding same variant again should increase qty, not create second row
5. **Max qty:** Can you add 100 of same product? Is there a limit?

**Hidden Bugs (To Be Caught):**
- **bug_flag: "skip_reserve"** — stock reservation is skipped; reserved_qty doesn't increase, stock immediately decreases
- **bug_flag: "double_charge"** — adding same item twice creates two rows instead of one (qty should increase)
- When tester enables these flags, inventory breaks or cart has duplicate items

**Edge Cases:**
- Can you add out-of-stock product? → Should return 400/409 Conflict
- Negative qty? → 400 Bad Request
- Cart deleted? → 404 Not Found
- Cart from different sandbox? → 403 Forbidden`,
        },
      ],
    },
    {
      id: 'defect-anahtarlari',
      titleTr: 'Defect Anahtarları — Gizli Bugları Nasıl Test Ederim?',
      titleEn: 'Bug Flags — How Do I Test Hidden Bugs?',
      blocks: [
        {
          type: 'text',
          tr: `QA Shop'un 10 defect anahtarı vardır. Hangisini açarsanız, ürün o davranışı gösterecektir.

**Defect Anahtarlarını Açmak:**
- GET /api/v1/sandbox/bugs — tüm 10 defect ve açıklamaları listesi
- POST /api/v1/sandbox/bugs/flag — \`{"flagKey":"skip_auth","enable":true}\` ile aç

**Gizli Tur (Hidden Round):**
Eğer kendi testlerinizi yazıyorsanız, defect'leri **gizli mod**'da test edebilirsiniz:
- POST /api/v1/sandbox/bugs/hidden — rastgele N defect seç, hangileri olduğunu söyleme
- Testini yaz, çalıştır, başarısız mı başarılı mı kontrol et
- POST /api/v1/sandbox/bugs/reveal — cevabı aç, hangi defect'ler açıktı kontrol et

**10 Defect (US'lara Göre):**
1. **skip_auth** — giriş atlanır (US-02 testi kırılır)
2. **wrong_prices** — fiyatlar yanlış (US-05 testi kırılır)
3. **hidden_products** — bazı ürünler gizli (US-03 testi kırılır)
4. **skip_reserve** — stok rezervasyonu yapılmaz (US-06 testi kırılır)
5. ... (5 daha, şartname sayfasından görün)

**Test Case Örneği:**
\`\`\`
1. Sandbox oluştur
2. GET /sandbox/bugs/hidden çağrısı yap (cevap: gizli defect'ler)
3. Standart test akışını çalıştır (login → katalog → sepet → sipariş)
4. Tüm testler başarılı mı?
5. POST /sandbox/bugs/reveal çağrısı yap
6. Açık olan defect'leri not et
7. Hangi testlerin kırılması gerekiyordu? Kırıldı mı?
\`\`\``,
          en: `QA Shop has 10 bug flags. Enable whichever you want, and the product will exhibit that behavior.

**Enable Bug Flags:**
- GET /api/v1/sandbox/bugs — list all 10 bugs and their descriptions
- POST /api/v1/sandbox/bugs/flag — \`{"flagKey":"skip_auth","enable":true}\` to enable

**Hidden Round (For Your Tests):**
If you're writing your own tests, you can test bugs in **hidden mode**:
- POST /api/v1/sandbox/bugs/hidden — pick random N bugs, don't tell which ones
- Write your test, run it, check if it passes or fails
- POST /api/v1/sandbox/bugs/reveal — reveal the answer, see which bugs were enabled

**10 Bugs (By US):**
1. **skip_auth** — authentication skipped (US-02 test fails)
2. **wrong_prices** — prices are incorrect (US-05 test fails)
3. **hidden_products** — some products are hidden (US-03 test fails)
4. **skip_reserve** — stock reservation not done (US-06 test fails)
5. ... (5 more, see spec page)

**Example Test Case:**
\`\`\`
1. Create sandbox
2. Call GET /sandbox/bugs/hidden (returns: hidden bugs)
3. Run standard test flow (login → catalog → cart → order)
4. Do all tests pass?
5. Call POST /sandbox/bugs/reveal
6. Note which bugs were enabled
7. Which tests should have failed? Did they?
\`\`\``,
        },
      ],
    },
    {
      id: 'supabase-auth',
      titleTr: 'Site Üyesi Olarak QA Shop\'ta Giriş Yapma',
      titleEn: 'Sign in to QA Shop as a Site Member',
      blocks: [
        {
          type: 'text',
          tr: `Eğer LearnQA.dev sitesine üye iseniz (Supabase auth), /qa-shop'a gidince otomatik olarak site hesabınız ile giriş yapabilirsiniz.

**Nasıl çalışır?**
1. /qa-shop aç → bootstrap.js otomatik kontrol eder: "Supabase token var mı?"
2. Varsa → backend'e token gönder, orada bir sandbox oluştur ve kullanıcı adını ekle
3. Yoksa → kullanıcı hiç kayıt olmadan (anonim) qa-shop'ta çalışır

**Test Case'ler:**
- **Üye ile giriş:** LearnQA.dev'de login → /qa-shop aç → otomatik giriş yapılıyor mu?
- **Anonim:** Login yapmadan /qa-shop aç → POST /sandbox ile manuel sandbox oluştur
- **Logout:** QA Shop panelinde "Çıkış Yap" tıkla → site çıkış yapıyor mu? Sandbox'ın kendi token'ı kalıyor mu?
- **Tekrar login:** Çıkış yaptıktan sonra site'ye yeniden login → /qa-shop'ta yeni sandbox mı oluşturuluyor?`,
          en: `If you're a member of LearnQA.dev (Supabase auth), when you visit /qa-shop, you can automatically sign in with your site account.

**How it works:**
1. Open /qa-shop → bootstrap.js automatically checks: "Is there a Supabase token?"
2. If yes → send token to backend, create a sandbox there, add user's name
3. If no → user works anonymously in qa-shop without registration

**Test Cases:**
- **Member sign-in:** Login at LearnQA.dev → open /qa-shop → is automatic sign-in working?
- **Anonymous:** Open /qa-shop without login → manually create sandbox with POST /sandbox
- **Logout:** Click "Sign Out" in QA Shop panel → does site logout? Does sandbox's own token remain?
- **Re-login:** After logout, login to site again → is new sandbox created in /qa-shop?`,
        },
      ],
    },
  ],
}
