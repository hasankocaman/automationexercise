# QA Shop — Test Pratik Platformu Planı (DB + API + UI)

> **Durum:** 🚧 İLK DİLİM YAZILDI (2026-08-16), ÇALIŞTIRILMADI. Yazım: 2026-08-15.
>
> ## Uygulama durumu
>
> | Faz | Durum | Not |
> |---|---|---|
> | Faz 1 — Sözleşme ve şema | ✅ Yazıldı | `db/schema.sql` (18 tablo), `db/seed.sql`, `api/openapi.yaml` (27 path / 29 operasyon / 19 şema) |
> | Faz 2 — K1 tarayıcı içi | ⬜ Yapılmadı | MSW + sql.js + `/qa-shop` arayüzü |
> | Faz 3 — K3 lokal Docker | 🚧 Kısmen | API + `docker-compose.yml` yazıldı; Postman koleksiyonu ve REST Assured başlangıç projesi YOK |
> | Faz 4 — Bug anahtarları | ⬜ Yapılmadı | `sandbox.bug_flags` sütunu duruyor, mekanizma bağlanmadı |
> | Faz 5 — K2 barındırılan | ⬜ Bilinçli olarak ertelendi | Maliyet + kötüye kullanım yüzeyi; talep kanıtlanınca |
>
> ### ⚠️ HİÇBİRİ ÇALIŞTIRILMADI
>
> Geliştirme makinesinde `docker` kurulu olmadığı için şema, tohum veri ve
> API **hiç koşmadı**. Doğrulanan tek şeyler: SQL'in gözle incelenmesi,
> `openapi.yaml`'ın ayrıştırılması + `$ref` çözümü, 16 JS dosyasının
> `node --check`'i. İlk `docker compose up` sonrası düzeltme gerekebilir;
> en olası yer `seed.sql` (`clone_sandbox` ve sipariş toplamlarının
> satırlardan hesaplanması).
>
> ### Kullanıcının onayladığı kararlar (yeniden tartışılmayacak)
>
> - **Node/Express** — iş mantığı tek çekirdek olsun, tarayıcı içi katmanla
>   ikiye bölünmesin (Spring Boot seçilseydi her kural iki dilde iki kez yazılırdı)
> - **Katman sırası K3 → K1 → K2** — lokal Docker önce, barındırılan ertelendi
> - **Tek e-ticaret domaini** — çeşitlilik senaryodan gelecek, ikinci domainden değil
> - **Kayıtsız sandbox** — sürtünme pratik alanlarının en büyük kaybı
> - **İçerikli tek SEO sayfası** — çıplak uygulama kabuğu aramada değersiz
>
> ### Ek olarak yazılanlar (planda yoktu, sonradan istendi)
>
> - `db/validation-queries.sql` — 25+ SQL testi (0 satır = GEÇTİ), tek ekranda
>   özet sorgusu, ve **kusur enjeksiyon bölümü** (kontrolü bilerek kırmızıya
>   düşürüp `ROLLBACK`). Yöneticiye gösterilecek çıktı bu.
> - `/qa-shop-setup` (🔴 admin) — kurulum rehberi sayfası: DBeaver bağlantısı,
>   Swagger sözleşmesini okuma, manuel + Postman testi. Bkz. `access-tiers-plan.md`.
>
> ### İzolasyon kuralı (kullanıcı şartı, doğrulandı)
>
> Pratik yığını sitenin GERÇEK backend'iyle (Supabase auth, ilerleme, rozet)
> hiçbir ilişki kurmaz. İki yönde de tarandı: `qa-shop/` içinde Supabase /
> learnqa / `VITE_` / `service_role` geçmiyor; ana site de `qa-shop` /
> `localhost:4000` / `5433` bilmiyor. **Sıfır referans.**
> **Amaç:** Hem kullanıcının kendi iş hedefleri hem sitenin diğer kullanıcıları
> için; gerçek bir veritabanı, gerçek bir API ve o API'ye bağlı gerçek bir
> arayüz üzerinde **database testi + API testi + UI otomasyonu** pratiği.
> **İlişkili:** `Documents/work-goals-tracker-plan.md` (bu platform 30 endpoint
> ve 36 test case hedeflerinin antrenman sahasıdır).

---

## 1. Elimizde ZATEN ne var (sıfırdan başlamıyoruz)

Plan yazmadan önce envanter çıkarıldı. Yeniden yazılmaması gerekenler:

| Var olan | Ne yapıyor | Bu planda kaderi |
|---|---|---|
| `src/mocks/handlers.js` | MSW ile 8 endpoint (products, login, createOrder, books CRUD). Bellekte, sayfa yenilenince sıfırlanır | **Genişletilecek** — Katman 1'in çekirdeği olur |
| `src/utils/api-spec.js` | Aynı 8 endpoint'in Swagger tarzı dokümanı | **Genişletilecek** — tek API sözleşmesine dönüşür |
| `/basit-backend` | 1211 satırlık **öğretici**: DBeaver + PostgreSQL kurulumu, Next.js TS API yazımı | **Korunur, dokunulmaz** — "kendi backend'ini kur" dersi. Bu plan ise "hazır backend'i test et" tarafı. İkisi kardeş, rakip değil |
| `/api-testing` | HTTP temelleri + Spring Boot ile kendi API'ni yazma (bug-tracker domain) | Korunur |
| `/qa-frontend` | DOM, locator stratejileri, bekleme, attribute seçimi | Korunur — QA Shop bu dersin **canlı hedefi** olur |
| Supabase | Auth, leaderboard RPC, 9 Edge Function, RLS'li şemalar. Kurulu ve çalışıyor | **Katman 2'nin altyapısı** |

**Sonuç:** eksik olan şey ders içeriği değil. Eksik olan, **kalıcı veri tutan,
dışarıdan erişilebilen, üstünde gerçekten test yazılabilen bir sistem.**

---

## 2. Mimariyi belirleyen kısıt

Site **GitHub Pages**'e deploy oluyor — yani tamamen statik. Kendi
sunucumuz yok, PHP/Node process'i çalışmıyor, port dinlenmiyor.

Bunun doğrudan sonucu:

- MSW (mevcut mock) **yalnızca tarayıcı içinde** yaşar. Postman, REST Assured,
  Newman, curl **asla** ona ulaşamaz. Sayfa içi pratik için mükemmel, dış
  araçla pratik için sıfır.
- Dışarıdan erişilebilir gerçek bir API için ya Supabase (zaten var) ya da
  kullanıcının kendi makinesi gerekir.

Bu yüzden tek bir katman yetmiyor. Üç katman gerekiyor ve **üçü de aynı
şemayı ve aynı tohum veriyi** paylaşıyor.

---

## 3. Üç katmanlı mimari

| Katman | Nerede çalışır | Kim erişir | Maliyet | Ne için |
|---|---|---|---|---|
| **K1 · Tarayıcı içi** | MSW + sql.js, kullanıcının sekmesinde | Sadece sayfa içi bloklar | 0 | Kayıt olmadan, anında pratik. Sitenin tüm ziyaretçileri |
| **K2 · Barındırılan API** | Supabase Postgres + PostgREST/Edge Function | Postman, REST Assured, Newman, curl, Playwright API — **dışarıdan** | Supabase kotası | Gerçek API otomasyonu pratiği |
| **K3 · Lokal Docker** | `docker compose up` ile kullanıcının makinesinde | Her şey + DBeaver/JDBC ile **doğrudan DB** | 0 (bizim için) | Ciddi pratik: gerçek SQL bağlantısı, sınırsız, offline |

**Önerilen sıra: K1 → K3 → K2.**

Gerekçe: K1 tüm ziyaretçilere anında değer verir ve hiçbir risk taşımaz. K3
en yüksek öğrenme değerini verir (gerçek Postgres bağlantısı, DBeaver, JDBC —
senin işteki 10 SQL/sprint hedefinin birebir provası) ve **bize hiçbir maliyet
çıkarmaz**. K2 en çekici olan ama **para harcayan ve kötüye kullanıma açık**
olan katman — talep kanıtlanmadan açılmamalı.

> ⚠️ K2 hakkında dürüst uyarı: herkese açık, **yazma yapabilen** bir API
> demek; bot trafiği, kota tüketimi ve veri kirliliği demek. Bölüm 8'deki
> sandbox izolasyonu ve Bölüm 12'deki maliyet kontrolü olmadan açılmamalı.

---

## 4. Konu: QA Shop (e-ticaret)

Kullanıcının önerisi doğru — e-ticaret otomasyon pratiğinin kanonik alanı
(saucedemo, automationexercise, opencart hep bu). Tanıdık olduğu için
öğrenen kişi domaini değil **tekniği** öğrenmeye odaklanır.

Ama düz bir e-ticaret klonu yetmez. Asıl değer, şemanın **kasıtlı test
dikişleriyle** tasarlanmasında:

| Dikiş | Ürettiği test senaryosu |
|---|---|
| `cart_items.unit_price_snapshot` | Sepete attıktan sonra fiyat değişirse ne olur? (UI ile DB'nin ayrıştığı klasik yer) |
| `inventory.stock_qty` vs `reserved_qty` | Son ürünü iki kişi aynı anda alırsa? Oversell var mı? |
| `orders.grand_total` vs `sum(order_items.line_total)` | Toplam mutabakatı — **SQL ile yakalanır, UI'da görünmez** |
| `coupons.valid_to`, `max_uses` | Süresi geçmiş/limiti dolmuş kupon kabul ediliyor mu? |
| `reviews.status` (moderation) | Onaysız yorum listede görünüyor mu? |
| Soft delete (`is_active`) | Pasif ürün arama sonucunda çıkıyor mu? Siparişi hâlâ görünüyor mu? |
| `audit_log` | **Log analizi ile kök neden** pratiği (iş hedefin: bugların %70'i) |

Bu dikişler tesadüf değil, tasarım. Her biri hem bir SQL sorgusu hem bir API
testi hem bir UI senaryosu üretir — üç disiplin tek veri modelinde buluşur.

---

## 5. Veritabanı şeması

17 tablo. Tek bir `schema.sql` dosyasında yaşar ve **üç katmana da aynı
dosyadan** beslenir (Bölüm 9).

```sql
-- ─── Sandbox (çok kiracılılık) ───────────────────────────────────────────
create table sandbox (
  id            uuid primary key default gen_random_uuid(),
  api_key       text unique not null,
  label         text,
  bug_flags     jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  last_reset_at timestamptz not null default now(),
  expires_at    timestamptz not null default now() + interval '7 days'
);

-- ─── Kimlik ──────────────────────────────────────────────────────────────
create table users (
  id          bigserial primary key,
  sandbox_id  uuid not null references sandbox on delete cascade,
  email       text not null,
  password_hash text not null,
  name        text not null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  unique (sandbox_id, email)
);

create table addresses (
  id         bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  user_id    bigint not null references users on delete cascade,
  line1      text not null,
  city       text not null,
  country    text not null,
  postal_code text,
  is_default boolean not null default false
);

-- ─── Katalog ─────────────────────────────────────────────────────────────
create table categories (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  name text not null, slug text not null,
  parent_id bigint references categories      -- self-join pratiği
);

create table brands (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  name text not null
);

create table products (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  sku text not null, name text not null,
  category_id bigint references categories,
  brand_id    bigint references brands,       -- NULL olabilir → LEFT JOIN dersi
  price numeric(10,2) not null check (price >= 0),
  currency char(3) not null default 'TRY',
  is_active boolean not null default true,    -- soft delete dikişi
  created_at timestamptz not null default now(),
  unique (sandbox_id, sku)
);

create table product_variants (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  product_id bigint not null references products on delete cascade,
  size text, color text,
  sku text not null,
  price_delta numeric(10,2) not null default 0
);

create table inventory (
  variant_id   bigint primary key references product_variants on delete cascade,
  sandbox_id   uuid not null references sandbox on delete cascade,
  stock_qty    int not null default 0 check (stock_qty >= 0),
  reserved_qty int not null default 0          -- oversell dikişi
);

-- ─── Sepet ───────────────────────────────────────────────────────────────
create table carts (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  user_id bigint references users,             -- NULL = misafir sepeti
  guest_token text,
  status text not null default 'open',         -- open | converted | abandoned
  created_at timestamptz not null default now()
);

create table cart_items (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  cart_id bigint not null references carts on delete cascade,
  variant_id bigint not null references product_variants,
  qty int not null check (qty > 0),
  unit_price_snapshot numeric(10,2) not null,  -- ← en verimli test dikişi
  unique (cart_id, variant_id)
);

-- ─── Kupon ───────────────────────────────────────────────────────────────
create table coupons (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  code text not null, kind text not null,      -- percent | fixed
  value numeric(10,2) not null,
  min_total numeric(10,2) not null default 0,
  valid_from timestamptz, valid_to timestamptz,
  max_uses int, used_count int not null default 0,
  unique (sandbox_id, code)
);

-- ─── Sipariş ─────────────────────────────────────────────────────────────
create table orders (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  user_id bigint not null references users,
  status text not null default 'placed',       -- placed|paid|shipped|delivered|cancelled|returned
  subtotal       numeric(10,2) not null,
  discount_total numeric(10,2) not null default 0,
  shipping_total numeric(10,2) not null default 0,
  grand_total    numeric(10,2) not null,       -- ← mutabakat dikişi
  coupon_code text,
  placed_at timestamptz not null default now()
);

create table order_items (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  order_id bigint not null references orders on delete cascade,
  variant_id bigint not null references product_variants,
  qty int not null, unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null
);

create table payments (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  order_id bigint not null references orders on delete cascade,
  method text not null,                        -- card | transfer | cod
  status text not null,                        -- pending|success|failed|refunded
  amount numeric(10,2) not null,
  txn_ref text
);

create table shipments (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  order_id bigint not null references orders on delete cascade,
  carrier text, tracking_no text,
  status text not null default 'preparing',
  shipped_at timestamptz
);

create table reviews (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  product_id bigint not null references products on delete cascade,
  user_id bigint references users,
  rating int not null check (rating between 1 and 5),
  comment text,
  status text not null default 'pending',      -- pending|approved|rejected
  created_at timestamptz not null default now()
);

-- ─── Denetim kaydı (log analizi pratiği) ─────────────────────────────────
create table audit_log (
  id bigserial primary key,
  sandbox_id uuid not null references sandbox on delete cascade,
  at timestamptz not null default now(),
  level text not null default 'INFO',           -- INFO|WARN|ERROR
  actor text, action text, entity text, entity_id text,
  correlation_id text,                          -- ← istek zinciri takibi
  detail jsonb
);
```

**Neden bu şema iyi SQL pratiği üretir:** 4+ tablolu JOIN (order → order_items
→ variants → products → brands), `parent_id` ile self-join, NULL'lu FK ile
INNER/LEFT farkı, `numeric` ile toplam mutabakatı, window function için
gerçek veri (ürün başına ciro sıralaması), öksüz satır avı, tarih aralığı
mantığı (kupon geçerliliği).

### 5.1. Tohum veri (seed)

Sabit ve **belirlenimci** olmalı — testler rastgele veriye dayanamaz.
Hedef büyüklük: 6 kategori, 8 marka, 120 ürün, 300 varyant, 40 kullanıcı,
150 sipariş, 400 sipariş satırı, 200 yorum, 12 kupon, ~2000 log satırı.

150 sipariş, `GROUP BY`/window function alıştırmalarının anlamlı sonuç
vermesi için gereken alt sınır. Daha azı "3 satırlık oyuncak tablo" hissi
verir ve gerçek sorgu planı/index dersi yapılamaz.

---

## 6. API yüzeyi — 43 endpoint

`/api/v1` altında. Kimlik: `X-Sandbox-Key` header'ı (hangi sandbox), kullanıcı
oturumu için ayrıca `Authorization: Bearer <token>`.

| # | Method | Path | Not |
|---|--------|------|-----|
| **Auth (5)** ||||
| 1 | POST | `/auth/register` | 201, zayıf parola → 422 |
| 2 | POST | `/auth/login` | 200 + token, yanlış → 401 |
| 3 | POST | `/auth/logout` | 204 |
| 4 | GET | `/auth/me` | tokensiz → 401 |
| 5 | POST | `/auth/refresh` | süresi geçmiş → 401 |
| **Katalog (7)** ||||
| 6 | GET | `/products` | `?page&size&sort&category&brand&minPrice&maxPrice` |
| 7 | GET | `/products/{id}` | pasif ürün → 404 mü 200 mü (dikiş) |
| 8 | GET | `/products/{id}/variants` | |
| 9 | GET | `/categories` | ağaç yapısı |
| 10 | GET | `/categories/{id}/products` | |
| 11 | GET | `/brands` | |
| 12 | GET | `/search?q=` | boş `q` davranışı |
| **Sepet (6)** ||||
| 13 | POST | `/carts` | misafir sepeti |
| 14 | GET | `/carts/{id}` | |
| 15 | POST | `/carts/{id}/items` | stoktan fazla → 409 |
| 16 | PATCH | `/carts/{id}/items/{itemId}` | qty=0 davranışı |
| 17 | DELETE | `/carts/{id}/items/{itemId}` | 204 |
| 18 | POST | `/carts/{id}/coupon` | geçersiz kupon → 422 |
| **Sipariş (6)** ||||
| 19 | POST | `/orders` | checkout; boş sepet → 422 |
| 20 | GET | `/orders` | sadece kendi siparişleri (yetki dikişi) |
| 21 | GET | `/orders/{id}` | başkasınınki → 403 |
| 22 | POST | `/orders/{id}/cancel` | kargolanmış → 409 |
| 23 | GET | `/orders/{id}/invoice` | |
| 24 | POST | `/orders/{id}/return` | süre aşımı → 422 |
| **Ödeme (3)** ||||
| 25 | POST | `/payments` | kart no'ya göre başarı/hata simülasyonu |
| 26 | GET | `/payments/{id}` | |
| 27 | POST | `/payments/{id}/refund` | fazla iade → 422 |
| **Kargo (2)** ||||
| 28 | GET | `/shipments/{id}` | |
| 29 | POST | `/shipments/{id}/track` | |
| **Yorum (4)** ||||
| 30 | POST | `/products/{id}/reviews` | rating 0/6 → 422 |
| 31 | GET | `/products/{id}/reviews` | onaysızlar görünmemeli |
| 32 | PATCH | `/reviews/{id}` | |
| 33 | DELETE | `/reviews/{id}` | |
| **Adres (4)** ||||
| 34-37 | GET/POST `/addresses`, PATCH/DELETE `/addresses/{id}` | |
| **Sandbox yönetimi (6)** ||||
| 38 | POST | `/sandbox` | yeni API key üretir |
| 39 | POST | `/sandbox/reset` | **tohum veriye döner** |
| 40 | GET | `/sandbox/state` | satır sayıları |
| 41 | GET | `/sandbox/bugs` | aktif bug anahtarları |
| 42 | PATCH | `/sandbox/bugs` | bug aç/kapat |
| 43 | GET | `/sandbox/logs` | `audit_log` — log analizi pratiği |

Bu 43 endpoint, iş hedefindeki **30 endpoint kotasını rahatça karşılar** ve
üzerine pratik payı bırakır.

### 6.1. Sözleşme tek kaynaktan

`src/utils/api-spec.js` genişletilerek **tek sözleşme dosyası** olur ve
şunları besler: (a) sayfadaki Swagger paneli, (b) MSW handler'ları, (c) K2/K3
sunucusunun route tanımları, (d) OpenAPI `.json` indirmesi (Postman/REST
Assured'a doğrudan import edilir).

Sözleşme ile gerçeğin ayrışması bu projede daha önce bedeli ödenmiş bir hata
sınıfı — bu yüzden dokümantasyon elle yazılmaz, sözleşmeden üretilir.

---

## 7. Bug anahtarları — platformun ayırt edici özelliği

Çoğu pratik sitesi **kazara** bugludur. Burada bug **kontrollü** olur:
kullanıcı açar, testinin yakalamasını bekler.

```http
PATCH /api/v1/sandbox/bugs
{ "cart.price_snapshot_ignored": true }
```

| Anahtar | Açtığında ne bozulur | Hangi beceriyi öğretir |
|---|---|---|
| `cart.price_snapshot_ignored` | Sepetteki fiyat güncel fiyata kayar | UI/DB tutarsızlığı |
| `stock.oversell` | Stoktan fazla sipariş kabul edilir | Sınır değer testi |
| `order.total_mismatch` | `grand_total` satır toplamıyla uyuşmaz | **SQL mutabakatı** |
| `coupon.expired_accepted` | Süresi geçmiş kupon geçer | Tarih mantığı |
| `auth.token_never_expires` | Token süresi dolmaz | Güvenlik testi |
| `review.unmoderated_visible` | Onaysız yorum listede çıkar | İş kuralı testi |
| `pagination.off_by_one` | Son sayfada bir kayıt kaybolur | Sayfalama testi |
| `api.random_500` | %5 istek 500 döner | Flaky teşhisi, retry |
| `api.slow_endpoint` | Belirli uç 3 sn gecikir | Timeout/wait stratejisi |
| `ui.dynamic_ids` | Arayüzde id'ler her render değişir | **XPath/CSS dayanıklılığı** |
| `ui.flaky_loader` | Yükleme göstergesi rastgele gecikir | Explicit wait |

Son iki anahtar, iş hedefindeki "XPath/CSS selector kontrolleriyle debugging"
maddesinin doğrudan antrenmanı.

Her anahtar bir **görev** olur: "aç → testini yaz → kırmızıya döndüğünü gör →
kapat → yeşile döndüğünü gör". Bu, testin gerçekten bir şey ölçtüğünü
kanıtlamanın tek yolu ve projenin kendi öğrendiği bir ders (hep yeşil kalan
bir kontrol, hiçbir şey kontrol etmiyor olabilir).

---

## 8. Sandbox izolasyonu ve sıfırlama

Herkese açık, yazılabilir bir API'de tek gerçek çözüm **kiracı başına
izolasyon**:

- Her kullanıcı `POST /sandbox` ile kendi `api_key`'ini alır (kayıt gerekmez)
- Her tablo `sandbox_id` taşır; Supabase'de **RLS** ile zorlanır — projenin
  mevcut şemalarındaki ilkenin aynısı
- `POST /sandbox/reset` tohum veriye döner → **her test koşumundan önce temiz
  durum** (otomasyonun en temel disiplini, burada zorunlu kılınıyor)
- Sandbox'lar 7 gün sonra otomatik silinir (kota koruması)
- Rate limit: dakikada 60 istek/key

Kullanıcılar birbirinin verisini bozamaz — pratik sitelerinin en büyük
şikâyeti budur ve baştan çözülmüş olur.

---

## 9. Tek şema, üç hedef (ayrışmayı önleme)

Bu planın en kritik teknik kararı. `schema.sql` + `seed.sql` **tek kaynaktır**
ve üç yere de oradan gider:

```
db/schema.sql + db/seed.sql
   ├─→ supabase/qa_shop_schema.sql   (K2, panoda bir kez çalıştırılır)
   ├─→ docker/postgres/init/         (K3, compose ilk açılışta yükler)
   └─→ scripts/build-sqljs-seed.mjs  (K1, sql.js için ikili dosya üretir)
```

Üç ayrı yerde elle tutulan şema, kaçınılmaz olarak birbirinden kayar — bu
projede daha önce çift veri ağacı ve ikinci ilerleme state'i tam olarak
böyle bozuldu. Build zincirine bir kontrol eklenir: üç türev, kaynak
dosyanın hash'iyle uyumlu mu?

---

## 10. Arayüz — `/qa-shop`

API'ye bağlı gerçek bir dükkân: ürün listesi, filtre, ürün detayı, sepet,
kupon, checkout, sipariş geçmişi, yorum. Selenium/Playwright'ın hedefi olur.

Tasarım kuralı — arayüz **iki yüzlü** olmalı:

- **Varsayılan:** temiz, `data-testid` taşıyan, erişilebilir DOM. Doğru
  otomasyonun nasıl göründüğünü öğretir.
- **`ui.dynamic_ids` / `ui.flaky_loader` açıkken:** id'ler değişir, tablo
  indeksleri kayar, yükleyici rastgele gecikir. Kırılgan locator'ın neden
  kırıldığını **yaşatarak** öğretir.

Aynı ekran, iki mod. `/qa-frontend` dersindeki locator anlatımının canlı
laboratuvarı olur.

---

## 11. Faz planı

### Faz 1 — Sözleşme ve şema (kod az, karar çok)
`db/schema.sql`, `db/seed.sql`, genişletilmiş `api-spec.js` (43 endpoint),
OpenAPI çıktısı. Çalışan hiçbir şey yok ama **her şeyin kaynağı** hazır.

**Kabul:** OpenAPI dosyası Postman'e import edilebiliyor; şema lokal
Postgres'te hatasız kuruluyor; tohum veri belirlenimci.

### Faz 2 — K1: tarayıcı içi (en geniş kitle)
MSW handler'ları sözleşmeden üretilir; sql.js ile aynı tohum veri; `/qa-shop`
arayüzü; sayfa içi API konsolu + SQL konsolu.

**Kabul:** Ziyaretçi hiçbir kurulum yapmadan ürün listeleyip sepete atabiliyor
ve aynı veriye SQL sorgusu çalıştırabiliyor.

### Faz 3 — K3: lokal Docker (en yüksek öğrenme değeri, sıfır maliyet)
`docker-compose.yml` (Postgres + API), `README`, DBeaver bağlantı adımları,
Postman koleksiyonu, REST Assured ve Playwright API başlangıç projeleri.

**Kabul:** `docker compose up` sonrası DBeaver bağlanıyor, Postman koleksiyonu
43 endpoint'te yeşil, REST Assured örnek testi geçiyor.

### Faz 4 — Bug anahtarları ve görevler
Bug motoru + her anahtar için "aç, yakala, kapat" görevi.

### Faz 5 — K2: barındırılan API *(opsiyonel, talep görülürse)*
Supabase şeması + RLS + Edge Function router + rate limit + sandbox yaşam
döngüsü + kota izleme.

**Kabul:** Dışarıdan `curl` ile erişilebiliyor; iki farklı sandbox birbirinin
verisini göremiyor; kota alarmı çalışıyor.

---

## 12. Riskler ve maliyet

| Risk | Etki | Karşılık |
|---|---|---|
| K2'de kötüye kullanım | Supabase kotası tükenir, ücret çıkar | Rate limit, 7 günlük sandbox ömrü, yazma boyut sınırı, kota alarmı. **Faz 5 ertelenebilir** |
| Şema üç yerde ayrışır | Sessiz yanlış ders | Bölüm 9'daki tek kaynak + build kontrolü |
| `/basit-backend` ile karışma | Kullanıcı hangisini kullanacağını bilemez | İki sayfa birbirine açıkça yönlendirir: "kendin kur" vs "hazırı test et" |
| Kapsam şişmesi | 43 endpoint + UI + 3 katman büyük iş | Faz 2 tek başına yayınlanabilir ve değerli |
| Test paketi yükü | Yeni sayfa + API testleri CI süresini uzatır | `/qa-shop` için ayrı, hızlı bir suite |

**SEO yan faydası (küçümsenmemeli):** "api testing practice site", "test
otomasyonu pratik sitesi" gibi sorgular yüksek hacimli ve bu tür siteler
doğal backlink toplar. Sitenin görünürlük sorununa içerik üretmeden çözüm
getirebilecek nadir hamlelerden biri.

---

## 13. Karar bekleyen sorular

1. **Katman sırası** — önerim K1 → K3 → K2. Barındırılan API'yi (K2) baştan
   isteyip Supabase maliyetini göze alır mısın, yoksa lokal Docker yeterli mi?
2. **Domain** — QA Shop e-ticaret onaylanıyor mu? Alternatif/ek olarak
   otel rezervasyonu veya banka gibi ikinci bir domain düşünülüyor mu?
3. **API teknolojisi (K3)** — Docker içindeki API neyle yazılsın? Node/Express
   (repoyla aynı dil), Spring Boot (senin Java geçmişin + REST Assured'a
   yakın) veya Next.js (`/basit-backend` dersiyle tutarlı)?
4. **Üyelik** — sandbox anahtarı kayıtsız mı verilsin (kolay ama kötüye
   kullanıma açık), yoksa giriş yapan kullanıcıya mı?
5. **`/qa-shop` indekslensin mi?** SEO değeri yüksek ama pratik alanı ders
   sayfası değil — arama sonucunda nasıl konumlanacağı ayrı düşünülmeli.
