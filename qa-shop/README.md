# QA Shop — Test Otomasyonu Pratik Ortamı

Gerçek bir PostgreSQL veritabanı ve ona bağlı gerçek bir REST API. Amaç tek
bir sistem üzerinde **database testi + API testi** yapabilmek — ve ileride
aynı veriye bağlı bir arayüzle **UI otomasyonu**.

Mock değil: veri kalıcı, işlemler transaction içinde, stok gerçekten düşüyor.
DBeaver ile bağlanıp SQL yazabilir, Postman/REST Assured/Newman ile dışarıdan
istek atabilirsin.

---

## Kurulum

Tek gereksinim Docker.

```bash
cd qa-shop
docker compose up -d
```

İlk açılış ~30 saniye sürer (imaj indirme + şema + tohum veri). Hazır olunca:

```bash
curl http://localhost:4000/health
# {"status":"ok","database":"up",...}
```

Durdurma / temizleme:

```bash
docker compose down       # durdurur, veri kalır
docker compose down -v    # veriyi de siler (şema değiştirdiysen bunu kullan)
```

> `schema.sql` veya `seed.sql` dosyasını değiştirdiysen `down -v` **zorunlu**.
> Postgres init script'lerini yalnızca veri dizini boşken çalıştırır; aksi
> hâlde değişikliğin hiçbir etkisi olmaz ve bunu sana söylemez.

---

## Veritabanına bağlan (DBeaver)

| Alan | Değer |
|---|---|
| Host | `localhost` |
| Port | **5433** |
| Database | `qashop` |
| Kullanıcı | `qashop` |
| Parola | `qashop` |

> Port 5433, 5432 değil — makinende zaten bir PostgreSQL varsa çakışmasın diye.

Bağlandıktan sonra `db/validation-queries.sql` dosyasını aç ve çalıştır. O
dosya bir SQL test paketidir: her sorgunun sözleşmesi **0 satır = geçti**.

Komut satırını tercih edersen:

```bash
docker exec -it qashop-db psql -U qashop -d qashop
```

---

## Sandbox: kendi izole veri alanın

Her kullanıcı kendi kopyasını alır. Kimse kimsenin verisini bozamaz.

```bash
# 1) Kendi alanını aç
curl -s -X POST http://localhost:4000/api/v1/sandbox \
     -H 'Content-Type: application/json' \
     -d '{"label":"benim-pratik-alanim"}'
```

Dönen `apiKey` değerini sakla ve bundan sonraki her isteğe ekle:

```
X-Sandbox-Key: qas_xxxxxxxxxxxx
```

Anahtar göndermezsen **demo verisine salt okunur** bağlanırsın — `GET`
istekleri çalışır, yazma denemeleri 401 döner. İlk denemeyi kolaylaştırmak
için böyle.

**En önemli endpoint:**

```bash
curl -X POST http://localhost:4000/api/v1/sandbox/reset -H "X-Sandbox-Key: $KEY"
```

Tohum veriye döner. Test paketinin `beforeAll` adımına koy — "her koşumdan
önce temiz durum" otomasyonun en temel disiplinidir ve burada bir endpoint
olarak hazır.

---

## Uçtan uca sipariş akışı (kopyala-çalıştır)

```bash
BASE=http://localhost:4000/api/v1

# 1) Sandbox aç
KEY=$(curl -s -X POST $BASE/sandbox -H 'Content-Type: application/json' \
      -d '{"label":"demo"}' | grep -o '"apiKey":"[^"]*' | cut -d'"' -f4)
echo "KEY=$KEY"

# 2) Giriş yap (tohum veride hazır hesap)
TOKEN=$(curl -s -X POST $BASE/auth/login \
        -H "X-Sandbox-Key: $KEY" -H 'Content-Type: application/json' \
        -d '{"email":"demo@qashop.test","password":"Password123!"}' \
        | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# 3) Ürünleri listele — ilk ürünün id'sini AL (sabit yazma, aşağıdaki nota bak)
PROD=$(curl -s "$BASE/products?size=1" -H "X-Sandbox-Key: $KEY" \
       | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
echo "PROD=$PROD"

# 4) O ürünün varyantlarını gör (stok burada) ve bir varyant id'si al
curl -s "$BASE/products/$PROD/variants" -H "X-Sandbox-Key: $KEY"
VAR=$(curl -s "$BASE/products/$PROD/variants" -H "X-Sandbox-Key: $KEY" \
      | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)

# 5) Sepet aç
CART=$(curl -s -X POST $BASE/carts \
       -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" \
       | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)

# 6) Sepete ürün at
curl -s -X POST $BASE/carts/$CART/items \
     -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" \
     -H 'Content-Type: application/json' \
     -d "{\"variantId\":$VAR,\"qty\":2}"

# 7) Kupon uygula
curl -s -X POST $BASE/carts/$CART/coupon \
     -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" \
     -H 'Content-Type: application/json' -d '{"code":"WELCOME10"}'

# 8) Sipariş ver
curl -s -X POST $BASE/orders \
     -H "X-Sandbox-Key: $KEY" -H "Authorization: Bearer $TOKEN" \
     -H 'Content-Type: application/json' -d "{\"cartId\":$CART}"

# 9) Log zincirini oku
curl -s "$BASE/sandbox/logs?limit=10" -H "X-Sandbox-Key: $KEY"
```

---

> ### ⚠ ID'LERİ SABİT YAZMA — en sinsi tuzak
>
> `clone_sandbox` satırları aynı tablolara `bigserial` id'lerle kopyalar. Yani
> **her yeni sandbox'ta id'ler kayar:** şablonda ürünler 1-120, ilk klonda
> 121-240, ikincide 241-360...
>
> Tuzağın sinsi yanı şu: **anahtarsız istek şablon sandbox'a gider** ve orada
> `id = 1` gerçekten vardır. Yani `curl .../products/1/variants` elle denerken
> ÇALIŞIR. Kendi alanını açıp aynı adresi çağırdığın an `404` alırsın ve hata,
> testinde ilgisiz bir yerde patlar.
>
> Dahası: **`POST /sandbox/reset` de id'leri yeniden kaydırır** (satırları silip
> yeniden klonlar) ve **açık oturumları iptal eder**. Sıfırlamadan önce alınmış
> bir id ya da token, sıfırlamadan sonra geçersizdir.
>
> Kural: id'yi ve token'ı **listeden oku, sabit yazma ve sıfırlamanın ötesinde
> önbellekleme.**

## Swagger / OpenAPI sözleşmesi

Tüm uçların makine okunabilir sözleşmesi: [`api/openapi.yaml`](api/openapi.yaml)
(OpenAPI 3.0.3 — 38 path, 44 operasyon, 25 şema).

> Sözleşme ile uygulama **iki yönlü kilitli**: `api/` içinde `npm test`,
> sözleşmedeki her yolun Express'te monte edildiğini VE monte edilen her iş
> ucunun sözleşmede beyan edildiğini denetler. Docker gerekmez.

Ayakta olan servisten de alınabilir:

```
http://localhost:4000/api/v1/openapi.yaml
```

| Nerede kullanılır | Nasıl |
|---|---|
| **Swagger UI** | https://editor.swagger.io → File > Import File (ya da Import URL) |
| **Postman** | Import > Link > yukarıdaki adres — koleksiyon otomatik oluşur |
| **REST Assured / Playwright** | Şema doğrulaması ve istek gövdesi referansı |

---

## Endpoint listesi (41 iş ucu)

Ayrıca üç sistem ucu var: `GET /health`, `GET /api/v1` (keşif),
`GET /api/v1/openapi.yaml` (sözleşme).

`X-Sandbox-Key` tüm `/api/v1/*` uçlarında geçerli. 🔒 = giriş (Bearer token) ister.

### Sandbox (4)
| Method | Path | Not |
|---|---|---|
| POST | `/sandbox` | Yeni alan aç, `apiKey` döner |
| GET | `/sandbox/state` | Satır sayıları — test öncesi/sonrası kıyas |
| POST | `/sandbox/reset` | Tohum veriye dön |
| GET | `/sandbox/logs` | `?level=ERROR&correlationId=...&action=...` |

### Kimlik (5)
| Method | Path | Not |
|---|---|---|
| POST | `/auth/register` | Zayıf parola → 422, mükerrer e-posta → 409 |
| POST | `/auth/login` | Hatalı bilgi → 401 |
| GET | `/auth/me` | 🔒 |
| POST | `/auth/logout` | 🔒 Oturumu gerçekten iptal eder |
| POST | `/auth/refresh` | 🔒 Eskiyi kapatır, yeni token verir |

### Katalog (7)
| Method | Path | Not |
|---|---|---|
| GET | `/products` | `?page&size&sort&order&category&brand&minPrice&maxPrice&q&includeInactive` |
| GET | `/products/{id}` | Pasif ürün → 404 |
| GET | `/products/{id}/variants` | Stok ve satılabilir adet |
| GET | `/categories` | Ağaç yapısı |
| GET | `/categories/{id}/products` | Alt kategorileri de kapsar |
| GET | `/brands` | |
| GET | `/search?q=` | 2 karakterden kısa → 400 |

### Sepet (6)
| Method | Path | Not |
|---|---|---|
| POST | `/carts` | Girişli veya misafir |
| GET | `/carts/{id}` | Fiyat değişimi uyarısı içerir |
| POST | `/carts/{id}/items` | Stok yetersiz → 409 |
| PATCH | `/carts/{id}/items/{itemId}` | `qty` 0 olamaz → 422 |
| DELETE | `/carts/{id}/items/{itemId}` | 204, rezervasyon serbest kalır |
| POST | `/carts/{id}/coupon` | Reddetme nedeni ayrı kodla döner |

### Sipariş (9) — hepsi 🔒
| Method | Path | Not |
|---|---|---|
| POST | `/orders` | Boş sepet → 422, stok → 409, kupon yeniden doğrulanır |
| GET | `/orders` | Yalnızca kendi siparişlerin |
| GET | `/orders/{id}` | Başkasınınki → 403 |
| POST | `/orders/{id}/cancel` | Kargolanmışsa → 409, stok geri yüklenir, ödeme iade edilir |
| GET | `/orders/{id}/invoice` | `reconciled` alanı mutabakatı beyan eder |
| POST | `/orders/{id}/pay` | `placed` → `paid`. `simulateFailure: true` ile **402** ve durum DEĞİŞMEZ |
| POST | `/orders/{id}/ship` | `paid` → `shipped`. Ödemesiz kargo → 409 |
| POST | `/orders/{id}/deliver` | `shipped` → `delivered`, teslim anı kaydedilir |
| POST | `/orders/{id}/return` | 14 günlük pencere, stok geri yüklenir, ödeme iade edilir |

### Adres (4) — hepsi 🔒
| Method | Path | Not |
|---|---|---|
| GET | `/addresses` | Varsayılan adres listenin başında |
| POST | `/addresses` | İlk adres otomatik varsayılan; `isDefault` diğerlerini DÜŞÜRÜR |
| PATCH | `/addresses/{id}` | Kısmi güncelleme, boş gövde → 422 |
| DELETE | `/addresses/{id}` | Varsayılan silinirse kalanlardan biri varsayılan olur |

### Yorum (4)
| Method | Path | Not |
|---|---|---|
| GET | `/products/{id}/reviews` | Varsayılan yalnızca onaylı; `?status=pending` moderasyon kuyruğu |
| GET | `/products/{id}/rating` | Ortalama **yalnızca onaylı** yorumlardan |
| POST | `/products/{id}/reviews` | 🔒 `pending` doğar; 201 "yayınlandı" DEMEK DEĞİLDİR |
| PATCH | `/reviews/{id}` | 🔒 Onayla / reddet |

### Kontrollü kusurlar (2)
| Method | Path | Not |
|---|---|---|
| GET | `/sandbox/bugs` | Katalog: her kusur nasıl yakalanacağını söyler |
| PATCH | `/sandbox/bugs` | Aç/kapat. Tanımsız anahtar → 422 |

### Hata gövdesi (her uçta aynı)

```json
{
  "error": { "code": "OUT_OF_STOCK", "message": "Stokta yalnızca 2 adet var",
             "details": { "requested": 5, "available": 2 } },
  "correlationId": "req-8f3c..."
}
```

`correlationId` cevabın başlığında da döner. Bir hata aldığında o id ile
`GET /sandbox/logs?correlationId=...` çağırıp isteğin log zincirini
görebilirsin — kök neden analizi pratiğinin tam da bu.

---

## Tohum veride ne var

| Tablo | Adet | İçindeki test dikişi |
|---|---|---|
| products | 120 | 9 pasif (soft delete), 10 markasız (NULL FK → LEFT JOIN dersi) |
| product_variants | 360 | |
| inventory | 360 | ~21 tükendi (0), bir kısmı son 1 adet (yarış koşulu) |
| users | 41 | 2 pasif hesap (login reddedilmeli) · parola: `Password123!` |
| orders | 150 | 6 farklı durum, ~6 ayına yayılmış |
| order_items | ~300 | Toplamlar satırlardan HESAPLANMIŞ (mutabakat tutar) |
| coupons | 12 | Süresi bitmiş / henüz başlamamış / limiti dolmuş — her biri farklı nedenle geçersiz |
| reviews | 200 | ~%30 onaysız (ortalama puana girmemeli) |
| audit_log | 300 | ~%8 ERROR, correlation zincirleriyle |

Veri **belirlenimcidir** — hiçbir yerde `random()` yok. Aynı dosya her
makinede aynı veriyi kurar; "bazen 12 satır dönüyor" diyen bir test yazılamaz.

---

## SQL pratiği

`db/validation-queries.sql` altı bölümden oluşuyor:

- **A · Mutabakat** — sipariş toplamı bileşenleriyle tutuyor mu, satır
  toplamlarıyla tutuyor mu. Arayüzün asla gösteremeyeceği hata sınıfı.
- **B · Referans bütünlüğü ve kiracı izolasyonu** — bir kullanıcının verisi
  diğerine sızmış mı. FK bunu yakalamaz: FK "bir yere bağlı mı" diye bakar,
  "doğru kiracıya mı bağlı" diye bakmaz.
- **C · İş kuralı ihlalleri** — oversell, süresi geçmiş kuponla indirim,
  ödemesiz kargolanmış sipariş.
- **D · Veri kalitesi** — harf farkıyla mükerrer e-posta, gelecek tarihli kayıt.
- **E · Log analizi** — hangi işlem çok hata veriyor, bir hatanın zinciri,
  p95 üstü yavaş istekler.
- **G · Analiz** — ciro sıralaması (window function), aylık rapor, self-join
  ile kategori ağacı.

Sonunda **Bölüm Z** hepsini tek tabloda toplar: `kontrol | ihlal | sonuç`.
Sprint sonu raporunda veya değerlendirme görüşmesinde gösterilecek çıktı budur.

### Sorgunun gerçekten çalıştığını kanıtlamak

Tohum veri tutarlıdır — yani ilk çalıştırmada kontroller yeşil döner. Ama
**her zaman yeşil kalan bir kontrol ile hiçbir şeye bakmayan bir kontrol
ekranda birbirinin aynısıdır.**

Bu yüzden dosyanın sonunda **Bölüm F · Kusur enjeksiyonu** var: kusuru
bilerek üretir, kontrolün kırmızıya döndüğünü gösterir, `ROLLBACK` ile geri
alır. Bir sorguya güvenmeden önce oradan geçir.

---

## Kontrollü kusurlar — testinin gerçekten baktığını kanıtla

Bir test paketinin tamamen yeşil dönmesi iyi bir haber gibi görünür ama tek
başına hiçbir şey kanıtlamaz: **her zaman yeşil kalan bir kontrol ile hiçbir
şeye bakmayan bozuk bir kontrol, rapor ekranında birbirinin aynısıdır.**
Aradaki farkı görmenin tek yolu, kusuru bilerek üretip kontrolün KIRMIZIYA
döndüğünü görmektir.

```bash
KEY=<sandbox anahtarin>

# Katalog: hangi kusur ne bozuyor, hangi kontrol yakalamali
curl -s http://localhost:4000/api/v1/sandbox/bugs -H "X-Sandbox-Key: $KEY"

# Bir kusur ac
curl -X PATCH http://localhost:4000/api/v1/sandbox/bugs \
     -H "X-Sandbox-Key: $KEY" -H 'Content-Type: application/json' \
     -d '{"skip_stock_decrement":true}'
```

| Anahtar | Ne bozar | Yakalayan kontrol |
|---|---|---|
| `oversell` | Sepette satılabilir adet yerine ham stoğa bakılır | Stoktan fazla ekleme 409 beklerken 201 alır |
| `skip_reserve` | Sepete eklerken rezervasyon yazılmaz | Envanteri okuyan SQL/API kontrolü |
| `discount_twice` | İndirim toplamdan iki kez düşülür | Mutabakat: `grand_total = subtotal − discount + shipping` |
| `wrong_line_total` | `line_total` adetle çarpılmaz | Satır toplamı kontrolü · faturadaki `reconciled` |
| `skip_stock_decrement` | Sipariş sonrası stok düşmez | Sipariş öncesi/sonrası stok karşılaştırması |
| `ignore_coupon_expiry` | Kupon checkout'ta yeniden doğrulanmaz | "Süresi geçmiş kuponla indirim" iş kuralı kontrolü |
| `leak_other_users_orders` | `GET /orders` kullanıcıya göre filtrelenmez | Yetki testi: A, B'nin siparişini görüyor mu |
| `weak_password_accepted` | Parola politikası uygulanmaz | Negatif kayıt testi |
| `pending_reviews_in_average` | Onaysız yorumlar ortalamaya girer | Ortalamayı kendisi hesaplayan test |
| `no_stock_restore_on_cancel` | İptalde stok geri yüklenmez | İptal akışı testi |

Kusurlar **yalnızca senin sandbox'ında** geçerlidir. `POST /sandbox/reset`
hepsini kapatır — temiz durum, kusursuz durumdur.

---

## Hazır test paketleri

| Klasör | Ne |
|---|---|
| [`api/test/`](api/test) | **Docker gerektirmeyen** 81 test: saf iş kuralları, uygulama iskeleti, sözleşme ↔ uygulama tutarlılığı, Postman koleksiyonunun kalitesi. `cd api && npm test` |
| [`postman/`](postman) | Zincirli, doğrulamalı Newman paketi (6 klasör / 26 istek) |
| [`rest-assured/`](rest-assured) | Aynı akışın Java karşılığı (JUnit 5 + REST Assured). `mvn test` |

Üçü bilerek paralel tutuldu: aynı sistemi üç farklı yerden test etmek, her
aracın neyi kolaylaştırdığını ve neyi gizlediğini yan yana gösterir.

---

## Şu an ne YOK

Dürüst liste — bunlar planlı ama yazılmadı:

- **Tarayıcı içi katman.** Kurulum istemeden sayfa üstünde pratik.
- **Barındırılan sürüm.** Şimdilik yalnızca lokal.
- **Şema ve tohum verinin canlı doğrulaması.** `schema.sql` ve `seed.sql`
  sözdizimi gözden geçirildi ama henüz gerçek bir PostgreSQL üstünde
  çalıştırılmadı; ilk `docker compose up -d` bunu doğrulayacak.

> Daha önce bu listede olan **ödeme / kargo / yorum / adres uçları**, **bug
> anahtarları** ve **arayüz** artık yazıldı — aşağıdaki bölümlere bak.

---

## Dizin yapısı

```
qa-shop/
├── db/
│   ├── schema.sql              18 tablo + klonlama/sıfırlama fonksiyonları
│   ├── seed.sql                belirlenimci tohum veri (şablon sandbox)
│   └── validation-queries.sql  SQL test paketi + kusur enjeksiyonu
├── api/
│   ├── src/
│   │   ├── core/               saf iş kuralları (fiyat, kupon, stok, durum geçişi, bug anahtarları)
│   │   ├── lib/                token, parola, hata, denetim kaydı
│   │   ├── middleware/         sandbox çözümleme, kimlik doğrulama
│   │   ├── routes/             sandbox, auth, katalog, sepet, sipariş, adres, yorum
│   │   ├── app.js  db.js  server.js
│   ├── test/                   Docker gerektirmeyen 81 test
│   ├── openapi.yaml            sözleşme (38 path / 44 operasyon)
│   └── Dockerfile
├── postman/                    zincirli Newman paketi + ortam dosyası
├── rest-assured/               Java (JUnit 5 + REST Assured) test projesi
├── docker-compose.yml
└── README.md
```

Arayüz bu klasörde DEĞİL: dükkân ekranı ana uygulamanın içinde, `/qa-shop`
adresinde (`src/components/QaShopPage.jsx`). Buradaki API'ye bağlanır ve UI
otomasyonu pratiğinin hedefidir — her etkileşimli öğesi kararlı bir
`data-testid` taşır.

`core/` klasörü bilinçli olarak ayrı: fiyat ve kural hesapları veritabanından
ve Express'ten bağımsız saf fonksiyonlar. Aynı kurallar ileride tarayıcı içi
katmanda da çalışacak — route handler'ının içine gömülselerdi ikinci kez
yazılmaları ve zamanla ayrışmaları kaçınılmaz olurdu.
