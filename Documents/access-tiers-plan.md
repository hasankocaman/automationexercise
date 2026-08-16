# Erişim Katmanları Planı — Ziyaretçi Ne Görür, Admin Ne Görür

> **Durum:** 🚧 Kararların bir kısmı UYGULANDI (2026-08-16). Yazım: 2026-08-15.
> Uygulananların ayrıntısı §9.5'te; §10 özet tablosu güncel.
>
> | Karar | Durum |
> |---|---|
> | `/security` → 🟢 herkese açık | ✅ Uygulandı (route + nav + sitemap + testler) |
> | `/backend` → 🔴 admin kalsın | ✅ Değişiklik yapılmadı |
> | `/qa-shop-setup` → 🔴 admin | ✅ Eklendi, 3 giriş noktası |
> | `/work-goals` → 🔴 admin | ⬜ Sayfa henüz yazılmadı |
> | `/admin` hub | ⬜ Kullanıcı kararı bekliyor |
> | `/leaderboard` alan denetimi | ⬜ Yapılmadı |
> **Kapsam:** Sitenin tüm yüzeylerinin üç erişim katmanına ayrılması; QA Shop
> pratik ortamı ve iş hedefleri takipçisi dahil.

---

## 1. Karar ölçütü

Bir sayfayı hangi katmana koyacağımıza tek tek değil, **dört soruyla sırayla**
karar veriyoruz. İlk "evet" katmanı belirler:

| # | Soru | Evetse |
|---|------|--------|
| 1 | Bu sayfa **başkasının verisini** mi taşıyor? (işveren, müşteri, başka kullanıcı) | 🔴 Admin |
| 2 | Bu sayfa **sitenin kendi altyapısını** mı açık ediyor? (backend kurulumu, anahtar yönetimi, kota) | 🔴 Admin |
| 3 | Bu sayfa **her açılışta maliyet** mi doğuruyor? (AI çağrısı, dış kota) | 🟡 Üye |
| 4 | Hiçbiri değil | 🟢 Herkese açık |

**Varsayılan herkese açıktır.** Bu sitenin misyonunun yarısı arama
görünürlüğü; kapatmak istisnadır ve gerekçe ister. "Ne olur ne olmaz
kapatalım" bir gerekçe değildir — kapalı sayfa ne kullanıcı çeker ne
bağlantı toplar.

Tersi de doğru: bir sayfayı **önce açıp sonra kapatmak geri alınamaz.**
Arama motorları ve insanlar onu çoktan görmüştür. Bu yüzden 1. ve 2. sorunun
cevabından şüphedeysen kapalı başla.

---

## 2. Üç katman ve mekanizması

| Katman | Kim görür | Mekanizma | Arama motoru |
|--------|-----------|-----------|--------------|
| 🟢 **Herkese açık** | Herkes, üyelik yok | — | İndekslenir, sitemap'te |
| 🟡 **Üye** | Giriş yapmış kullanıcı | `<ProtectedRoute>` | `noindex`, sitemap dışı |
| 🔴 **Admin** | `profile.is_admin = true` | `<RequireAdmin>` | `noindex`, sitemap dışı |

`RequireAdmin` zaten `ProtectedRoute`'u sarmalıyor (önce giriş, sonra admin
kontrolü) ve Supabase yapılandırılmamışsa **hiç kimseye** açılmıyor. Yeni bir
mekanizma yazılmayacak.

---

## 3. Mevcut durum

| Katman | Sayfalar |
|--------|----------|
| 🟢 Açık | ~40 ders sayfası, `/sprint`, `/portfolio`, `/leaderboard`, `/qa-mentor`, `/algorithms`, `/basit-backend`, `/what-is-testing`, `/manual-testing` |
| 🟡 Üye | `/qa-assistant` |
| 🔴 Admin | `/backend`, `/security` |

---

## 4. Mevcut kararlarda önerilen iki değişiklik

### `/security` → 🟢 herkese açık yapılsın

Sayfa OWASP Top 10 ve genel güvenlik simülasyonlarını anlatıyor. 1665 satırın
tamamı tarandı: **sitenin kendi altyapısına dair hiçbir şey yok** — Supabase
referansı yok, anahtar yok, ortam değişkeni yok. Yani 1. ve 2. sorunun ikisi
de "hayır".

Şu an kapalı olması iki şeye mal oluyor: "OWASP Top 10 Türkçe", "SQL injection
nedir" gibi yüksek hacimli sorgular karşılıksız kalıyor, ve sitenin en görsel
içeriklerinden biri kimseye görünmüyor.

**Karar senin** — bilinçli bir tercihse kalır. Ama admin arkasında olmasının
teknik bir gerekçesi bulunamadı.

### `/backend` → 🔴 admin kalsın

Bu sayfa senin **kendi backend kurulumunu** anlatıyor: auth akışı, ilerleme
tabloları, paywall, realtime. 2. sorunun cevabı net "evet". Yayınlanması,
sitenin saldırı yüzeyinin haritasını vermek olur. Değişiklik önerilmiyor.

### Küçük not: `/leaderboard`

Herkese açık kalmalı ama gösterilen alan **yalnızca görünen ad** olmalı,
e-posta asla. Şu anki `get_leaderboard` çıktısı bu açıdan bir kez gözden
geçirilsin — liderlik tablosu tanımı gereği herkese açık bir yüzeydir ve
oraya sızan her alan kalıcı olarak açıktır.

---

## 5. QA Shop pratik ortamı

Burası en çok ayrıştırma gerektiren yer, çünkü hem bir **ders yüzeyi** hem bir
**işletilen servis**.

| Yüzey | Katman | Gerekçe |
|---|---|---|
| `/qa-shop` tanıtım + dokümantasyon sayfası | 🟢 Açık | Asıl SEO değeri burada: "test otomasyonu pratik sitesi", "api testing practice" sorguları. Bu tür sayfalar doğal bağlantı toplar |
| Endpoint tablosu, curl örnekleri, SQL rehberi | 🟢 Açık | Dokümantasyon gizlenmez; gizli dokümantasyon kullanılmayan dokümantasyondur |
| Tarayıcı içi pratik (ileride) | 🟢 Açık | Kurulumsuz ilk temas |
| Sandbox açma / sıfırlama | 🟢 Açık, kayıtsız | Sürtünme pratik alanlarının en büyük kaybı. Herkes kendi izole kopyasını alır |
| Bug anahtarlarını aç/kapat | 🟢 Açık | Kendi sandbox'ında, kendi verisinde. Kimseyi etkilemez |
| **Lokal Docker yığını** | Kimlik yok | Kullanıcının kendi makinesi, kendi verisi. Oraya auth koymak anlamsız olurdu |
| **Barındırılan API yönetim konsolu** | 🔴 Admin | Aşağıda |
| **Şablon (tohum) veriyi değiştirme** | 🔴 Admin | Şablon bozulursa TÜM yeni sandbox'lar bozulur — tek noktadan hasar |

### Admin konsolu ne içerir (barındırılan sürüm açılırsa)

Bunlar 2. sorunun kapsamında: kota, kötüye kullanım, altyapı.

- Aktif sandbox listesi: oluşturulma, son sıfırlama, satır sayıları
- Süresi geçmişleri temizle (`purge_expired_sandboxes`)
- Kota göstergesi: toplam satır, disk, günlük istek
- Hata oranı ve en çok hata veren uçlar
- Anahtar iptali (kötüye kullanan sandbox'ı kapatma)
- Rate limit ayarları

Lokal Docker aşamasında bu konsol **gerekmiyor** — yazılması ertelensin.
`psql` ile aynı bilgiye erişiliyor ve kullanıcı yalnızca sen olduğun sürece
arayüz yazmak boş iş.

---

## 6. İş hedefleri takipçisi (`/work-goals`) → 🔴 Admin

Bu, planın en net kararı ve gerekçesini açıkça yazmak gerekiyor çünkü ilk
bakışta gereksiz görünüyor.

**Yanlış gerekçe:** "Verilerim başkasına görünmesin." Görünmüyor zaten —
depo tamamen tarayıcıda (`localStorage`), hiçbir yere gönderilmiyor. Sayfa
herkese açık olsa bile her ziyaretçi kendi boş takipçisini görür.

**Doğru gerekçe:** Sayfanın **içeriği** işverenin belgesidir. Hedef tanımları,
KPI metinleri, ağırlıklar — bunlar şirketin performans değerlendirme
sisteminden alınmış ifadelerdir. Veri girilmemiş, bomboş bir sayfa bile bu
metni yayınlar. 1. soru: "başkasının verisini mi taşıyor?" → **evet**.

İki çıkış yolu vardı:

1. **Genel takipçi yap** — hedef tanımları boş gelir, kullanıcı kendi
   hedeflerini girer. İşveren metni hiç yayınlanmaz ve araç diğer QA
   mühendisleri için de gerçekten kullanışlı olur.
2. **Admin arkasına al** — hedefler hazır gelir, sen kullanırsın.

**Öneri: şimdilik (2).** Gerekçe: (1) fazladan bir hedef-tanımlama arayüzü
yazmayı gerektiriyor ve senin acil ihtiyacın olan şey o değil; ayrıca
kapalıdan açığa geçmek kolay, açıktan kapalıya geçmek **imkânsız**.

İleride genel sürüm istenirse yol açık: hedef tanımlarını veri dosyasından
kullanıcı deposuna taşımak yeterli, skor motoru ve defterler aynen kalır.

### İki ek koruma

- **Dışa aktarma dosyası** işveren verisi taşır. İndirilen markdown/CSV
  yanlışlıkla repoya commit edilmesin — `.gitignore` girdisi baştan konsun.
- **Gizli mod** (referans alanlarını hiç kaydetmeyen ayar) yine de yazılsın:
  ekran paylaşımlı bir toplantıda sayfayı açman gerekebilir.

---

## 7. Yeni: `/admin` giriş sayfası

Şu an admin yüzeyleri dağınık (`/backend`, `/security`) ve adreslerini
ezberlemek gerekiyor. Tek bir hub sayfası önerilir:

- Admin yüzeylerinin listesi ve kısa açıklamaları
- Ortam göstergesi: hangi Supabase projesi (test/prod), premium açık mı
- Hızlı sağlık bakışı: son deploy, sitemap URL sayısı, kırık test var mı

Küçük bir sayfa ama iki işi çözüyor: adres ezberi biter, ve yeni bir admin
yüzeyi eklendiğinde nereye bağlanacağı belli olur.

Kendisi de doğal olarak 🔴 admin.

---

## 8. Yeni bir admin sayfası eklerken — 5 adım

1. `App.jsx` → route `<RequireAdmin>` ile sarılır
2. `seo.js` → `ROUTE_SEO` girdisi: **EN + TR metadata zorunlu**, artı `noindex: true`
3. `generate-static-routes.mjs` → statik kabuk üretilir, `robots=noindex` ile
4. `check-test-coverage.mjs` → `EXCEPTIONS` sözlüğüne **gerekçesiyle** eklenir
5. Görünür site haritasına (`whatIsTestingData.js`) **eklenmez**

### ⚠ Kabuk kuralı — atlanırsa sessiz sızıntı olur

Admin sayfasının statik kabuğu **gerçek içeriği taşımamalıdır.** Kabuk,
JavaScript çalışmadan önce herkese servis edilen HTML'dir; oraya gerçek
içeriği yazmak, kullanıcıdan gizlediğin şeyi arama motoruna vermek olur.

Bu hem bir veri sızıntısı hem de arama motorlarının açıkça yasakladığı bir
davranış (kullanıcıya ve tarayıcıya farklı içerik göstermek). Admin
kabukları yalnızca başlık ve "bu sayfa yalnızca yöneticiler içindir" cümlesi
içermeli.

---

## 9. Doğrulama

Her katman değişikliğinden sonra:

| Kontrol | Nasıl |
|---|---|
| Anonim ziyaretçi admin sayfasını göremiyor | Playwright: oturumsuz git → kilit ekranı görünmeli, içerik görünmemeli |
| Admin olmayan üye de göremiyor | Normal test hesabıyla gir → "admin olarak işaretli değil" ekranı |
| Kabuk içerik sızdırmıyor | `dist/<route>/index.html` içinde gerçek içerik metni **aranmalı ve bulunmamalı** |
| Sitemap dışı | `sitemap*.xml` içinde adres geçmemeli |
| Açık sayfa gerçekten açık | `/security` açılırsa: sitemap'e girdiği ve kabuğunun içerik taşıdığı doğrulanmalı |

Son satır önemli: bir sayfayı açmak, kapatmak kadar doğrulama ister —
`noindex` kaldırılmadan sitemap'e eklenirse sayfa yine indekslenmez ve
"açtık ama hiçbir şey değişmedi" denir.

---

## 9.5. Uygulanan kararlar (2026-08-15)

### ✅ `/security` herkese açıldı

`RequireAdmin` kaldırıldı, `noindex` silindi, görünür site haritasına yeni bir
"🔐 Güvenlik Testi" kategorisi altında eklendi, `check-test-coverage` istisnası
kaldırıldı ve sayfa iki test paketine dahil edildi.

**Açılış bir bug ortaya çıkardı.** Sayfa hiçbir otomatik teste dahil olmadığı
için, 8. sekmede ("Business Logic Flaws") sayfanın TAMAMEN BOŞALDIĞI bir çöküş
fark edilmemişti: `SecurityLegoVisual` bileşeni `useState`'i bir `if` bloğunun
içinde çağırıyordu. Bileşen tek bir fonksiyondur ve `variant` propuna göre
farklı dallar döndürür; sekme değişince hook sayısı değişiyor ve React
"Rendered more hooks than during the previous render" ile ağacı düşürüyordu.
Hook en üste alınarak düzeltildi.

> **Kalıcı ders:** admin kapısı bir sayfayı korumaz, yalnızca gizler. Test
> kapsamı dışında kalan her sayfa, kimsenin görmediği bir kusuru sessizce
> taşıyabilir. Bir sayfayı kapatırken "nasıl olsa kimse görmüyor" diye test
> kapsamı dışına almak, o sayfayı açtığın gün ödenecek bir borç yaratır.

### ⚠️ Bir sayfayı açmak beş yerde birden iş ister

`/security` açılırken route'tan `RequireAdmin` kaldırıldı ama **`HomePage.jsx`'te
iki nav linki hâlâ `isAdmin` koşulundaydı.** Sonuç: sayfa herkese açıktı ama
adresini bilmeyen kimse ulaşamıyordu — kullanıcı bunu bildirdi.

Bir sayfayı açmak şu **beşinin tamamı** demektir; biri eksikse açılış yarım kalır:

1. `App.jsx` → gate kaldırılır
2. `seo.js` → `noindex` silinir
3. `whatIsTestingData.js` → görünür site haritasına eklenir
4. **`HomePage.jsx` → nav linklerindeki `isAdmin` koşulları kaldırılır**
5. `check-test-coverage.mjs` → istisna silinir + gerçek test yazılır

Ek olarak, sayfa bölüm slug'ı üretiyorsa `App.jsx`'teki `SECTION_PAGE_ELEMENTS`
girdisi de gerekir — build bunu zaten hard-fail ediyor.

### 🔴 `/qa-shop-setup` eklendi (admin)

QA Shop pratik ortamının kurulum ve ilk test adımları — üç adım: DBeaver ile
veritabanına bağlanma, OpenAPI sözleşmesini okuma, uçları manuel ve Postman
ile test etme.

Şimdilik admin. Herkese açılacağı gün yukarıdaki **beş adımın tamamı**
uygulanmalı — dördüncü madde (nav linkleri) tam da bu oturumda atlanan yer.

**Ad çakışması düzeltildi:** sayfa önce `/practice-lab` → "Pratik
Laboratuvarı" olarak açıldı, ama ana sayfada ZATEN "PRACTICE LAB" başlıklı
bir bölüm var (sayfa içi element/locator oyun alanı). Kullanıcı ikisini
ayırt edemedi. `/qa-shop-setup` → "🛠️ QA Shop Kurulum Rehberi" olarak
yeniden adlandırıldı; dosyalar da (`QaShopSetupPage.jsx`,
`qaShopSetupData.js`) buna göre değişti.

**Giriş noktası dersi:** ilk sürümde tek giriş, PRACTICE LAB başlık
çubuğunun en sağındaki 11px'lik bir butondu ve kullanıcı **iki kez**
bulamadı. Çözüm, admin linklerinin ZATEN durduğu yerlere koymak oldu.
Şu an üç giriş var, hepsi `isAdmin`:

| Yer | testid |
|---|---|
| Üstteki DEVOPS kartı (`/backend`'in yanı) | `nav-qa-shop-setup-card` |
| PRACTICE LAB başlık çubuğu | `nav-qa-shop-setup` |
| Footer → DevOps & Cloud (`/backend`'in yanı) | — |

> Yeni bir admin sayfası eklerken girişi **mevcut admin linklerinin yanına**
> koy. Semantik olarak "daha doğru" ama alışılmadık bir yer, pratikte
> bulunamayan bir yerdir.

Ayrıca PRACTICE LAB başlık satırına `flex-wrap` eklendi: dış kapsayıcı
`overflow-hidden` taşıdığı için, sarma olmadan sağdaki buton dar ekranda
kırpılıp DOM'da var ama görünmez hâle gelebiliyordu.

`TopicPage` KULLANILMADI: bu bir ders sayfası değil, sıralı bir yordam
rehberi. TopicPage'in quiz/mülakat/ustalık makinesi burada her sekmede
video + animasyon + sandbox gibi anlamsız yükümlülükler doğururdu.

### 🟢 Adım 4 — arayüz pratiği (henüz yazılmadı, herkese açık olacak)

Dükkân arayüzü inşa edildiğinde yayınlanacak. Kapsamı şimdiden sabit:
**arayüzdeki hangi hareket, veritabanında ve API'de neyi değiştirir.**

| Arayüzdeki hareket | API'de | Veritabanında | Doğrulanacak |
|---|---|---|---|
| Sepete ekle | `POST /carts/{id}/items` | `cart_items` satırı + `inventory.reserved_qty` artar | Stok DÜŞMEZ, yalnızca rezerve edilir |
| Adet artır | `PATCH .../items/{itemId}` | `cart_items.qty` + rezerve farkı | Fark kadar rezerve, toplam kadar değil |
| Sepetten çıkar | `DELETE .../items/{itemId}` | Satır silinir, rezerve geri bırakılır | Rezervasyon sızmamalı |
| Kupon uygula | `POST .../coupon` | `carts.coupon_code` | Reddedilirse hangi kodla |
| Siparişi tamamla | `POST /orders` | `orders` + `order_items`, `stock_qty` düşer, rezerve serbest | Toplam mutabakatı |
| Siparişi iptal et | `POST /orders/{id}/cancel` | Stok geri yüklenir, kupon sayacı düşer | Stok sızıntısı olmamalı |

Bu tablo, arayüzü test eden kişiyi "buton çalışıyor mu" sorusundan "sistem
tutarlı kaldı mı" sorusuna taşıdığı için herkese açık anlatılmaya değer —
içinde altyapı sırrı yok, yalnızca pratik ortamının kendi mekaniği var.

---

## 10. Özet tablo

| Yüzey | Katman |
|---|---|
| Ders sayfaları, `/sprint`, `/portfolio`, `/leaderboard`, `/qa-mentor`, `/basit-backend` | 🟢 |
| `/qa-shop` tanıtım + dokümantasyon + tarayıcı içi pratik + sandbox | 🟢 |
| `/security` | 🟢 *(2026-08-15'te açıldı)* |
| `/qa-assistant` | 🟡 |
| `/backend` | 🔴 |
| `/qa-shop-setup` | 🔴 *(2026-08-15'te eklendi, şimdilik)* |
| `/work-goals` | 🔴 *(yeni)* |
| QA Shop barındırılan API konsolu | 🔴 *(ertelendi)* |
| `/admin` hub | 🔴 *(yeni)* |

---

## 11. Karar bekleyen sorular

1. **`/security` açılsın mı?** Teknik engel yok, SEO kazancı gerçek. Bilinçli
   bir tercihse gerekçesini bilmek isterim.
2. **`/admin` hub'ı şimdi mi?** Küçük bir iş ama admin yüzeyi sayısı 2-3'ken
   ertelenebilir.
3. **`/work-goals` ileride genel sürüme açılsın mı?** Şimdi karar gerekmiyor;
   admin başlamak her iki yolu da açık bırakıyor.
