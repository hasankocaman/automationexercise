# NEXT SESSION - Devam Noktası (TEK Güncel Durum Dosyası)

> Bu dosyayı `CLAUDE.md`'den hemen sonra, her oturum başında oku.
> Kullanıcıdan proje durumunu tekrar isteme. Kalıcı kurallar `CLAUDE.md`,
> SEO mimarisi `codexSeo.md`, deploy/GSC adımları `DEPLOY.md`; güncel iş
> listesi ve son inceleme sonucu sadece bu dosyadadır.
>
> Bu dosyada commit hash/anlık durum tutulabilir; kalıcı kural dosyalarına
> commit hash/anlık not yazılmaz (bkz. CLAUDE.md §0).

---

## 🚩 OTURUM DEVİR NOTU (2026-08-28, Opus) — YENİ OTURUM BURADAN BAŞLASIN

> Çelişki olursa BU bölüm günceldir. Alttaki "Önceki Durum" bölümleri tarih
> sırasıyla duruyor ama artık bağlayıcı değil.

### ⚠️ ÖNCE BUNU OKU

Son commit hâlâ **`f4ef66b`**. Ondan sonraki TÜM iş çalışma ağacında —
**kullanıcı commit istemedi, sormadan commit atılmayacak.** Çalışma ağacında
79 değişik/yeni dosya var (üç oturumun birikimi).

Bu oturumun teması iki başlıkta toplanıyor:
1. **Üçüncü test katmanını (veritabanı) yola bağlamak** — ama cevap anahtarını
   vermeden.
2. **Arayüzü kendini anlatır hâle getirmek** — ama genel bilgi anlatmadan.

---

### 🎯 Bu oturumda kullanıcıdan gelen ÜÇ bağlayıcı karar

**1. İnce ayrıntılar ve püf noktaları yalnızca admin'e.**
> *"diğer kullanıcılar olası defectleri kendileri analiz etmeli ve test
> tecrübelerini yeteneklerini gösterebilmeliler"*

Sonuç: SQL sorgusu ↔ iş kuralı ↔ story ↔ defect eşlemesi admin tarafına
alındı. Kalıcı kural: `CLAUDE.md` §25.2.1 + §11 hata listesi.

**2. Repo'ya bağlı belge gösterme.**
> *"normal kullanıcı repoyu indirmeden sadece docker ile hem api hem database
> görmüyor mu"*

Sonuç: SQL paketi siteden indirilebilir yapıldı, rehber üç yolu birden veriyor.
Kalıcı kural: `CLAUDE.md` **§25.8** (yeni).

**3. Arayüz açıklamaları yalnızca bize mahsus olanı anlatır.**
> *"api ne demek database ne demek swagger ne demek açıklamaya gerek yok...
> ama örneğin kupon bizim uygulamamızda nasıl etki yapıyor açıkla"*

Sonuç: kavram sözlüğü bu ölçüte göre yeniden yazıldı. Kalıcı kural:
`CLAUDE.md` **§25.7** (yeni).

---

### 📋 Bu Oturumda Yapılanlar

**1. Faz 6.4 — SQL katmanı yola bağlandı (üç katmanlı yerleşim).**

| Nerede | Ne | Kim görür |
|---|---|---|
| `qa-shop/db/validation-queries.sql` | 30 sorgu, her birinde nötr "Ne bakar" satırı | herkes |
| `src/data/qaShopSqlPackData.js` | gruplu dizin, iki dilli, kural/story atfı YOK | herkes (kurulum rehberinde) |
| `src/data/qaShopSqlMap.js` | sorgu ↔ kural ↔ story ↔ defect eşlemesi | **yalnız admin** |

- SQL dosyasından **cevap sızdıran satırlar çıkarıldı**: `Yakaladığı gerçek
  bug: indirim iki kez uygulanır` (= `discount_twice` anahtarının adı),
  `adet güncellenirken line_total yeniden hesaplanmıyor` (= `wrong_line_total`),
  `Katalog endpoint'i bu ürünleri döndürüyorsa bug vardır`, ve başlıktaki
  "ilk çalıştırmada neredeyse hepsi 0 satır döner" ön-duyurusu.
- **Kalanlar bilinçli:** SQL zanaat notları (LEFT JOIN + IS NULL kalıbı,
  `percentile_cont` neden `OVER` alamaz, JDBC'nin `?` tuzağı) ve F bölümü
  (kendi kontrolünü bozup kırmızıya döndürme) — bunlar defect göstermez.
- Eşleme kural ve story kartlarının admin panelinde render ediliyor
  (`SQL_CHECKS_BY_RULE` / `SQL_CHECKS_BY_STORY`, ters indeks türetiliyor).

⚠️ **Ölçüm düzeltmesi:** önceki devir notundaki "127 sorgu" YANLIŞ. Dosyada
**30 adlı sorgu** (A1-A4, B1-B5, C1-C8, D1-D5, E1-E4, G1-G4) + Z özeti +
4 defect enjeksiyon bloğu var.

**2. SQL paketi herkes için edinilebilir oldu (kullanıcı bulgusu).**
Rehber `qa-shop/db/validation-queries.sql dosyasını DBeaver'da aç` diyordu —
imajlarla kuran kullanıcıda o dosya YOK. Ölçüldü: dosya yayınlanan veritabanı
imajının içinde var (`/opt/qa-shop/validation-queries.sql`) ama konteynerin
içindeki bir dosya DBeaver'da açılamaz.
- `scripts/build-qa-shop-downloads.mjs`'e eklendi →
  `/qa-shop/indirilebilir/qa-shop-validation-queries.sql`
- Rehber üç yolu veriyor: indir · depodan aç · konteynerin içinden çalıştır
- psql alternatifi TERSİNE çevrildi: en kısa yol (hiç dosya istemeyen
  `docker exec ... -f /opt/qa-shop/validation-queries.sql`) artık başta

**3. Faz 6.5 — giriş kapısı dükkâna çevrildi.**
Afiş, öne çıkan giriş linki, kart listesi, footer ve görünür site haritası
artık `/qa-shop`'a gidiyor. `CLAUDE.md` §2'deki üçlü açıklaması da güncellendi
(eski karar iptal notuyla birlikte yazıldı).
- `nav-qa-shop-spec` testid'i yanıltıcı hâle geldiği için
  **`nav-qa-shop-store-cta`** olarak yeniden adlandırıldı.

**4. "Sonunda: ... olacaksın" özetleri tamamen kaldırıldı** (kullanıcı isteği).
10 tane: `qaShopSetupData.js` 4, `qaShopSpecData.js` 6. Hem veri alanları hem
render satırları gitti.
⚠️ Bu alanlar statik kabuğun TEK içerik kaynağıydı; yerine bölümün/adımın
kendi ilk açıklama bloğundan türetme kondu (`ilkAciklama`).

**5. Kavram baloncukları (`QaShopKavram`) — arayüz kendini anlatıyor.**
15 kavram, iki dilli, `src/data/qaShopKavramlarData.js`. Hover + tıklama +
klavye; ESC ve dışarı-tık kapatır.
- **Dükkânda:** Docker gerekliliği · tarayıcı kipi · API adresi · sandbox ·
  sandbox anahtarı · kendi alanımı aç · veriyi sıfırla · anahtarı unut ·
  anahtarsız erişim · kupon burada nasıl davranır · sepete eklemek stoğa ne
  yapar · defect anahtarı · gizli tur · olay günlüğü
- **API sayfasında:** Docker ön koşulu · iki katmanlı kimlik · sandbox
- **Çıkarılanlar** (genel bilgi, kullanıcı ölçütü): endpoint, istek gövdesi,
  cevap gövdesi, base URL, data-testid, seed veri

**6. Baloncuk okunabilirliği düzeltildi (kullanıcı bildirdi).**
Üst şeritteki mod rozetinin baloncuğu görüş alanının üstünde kalıyordu.
Portal ile `document.body`'ye taşındı + `position: fixed` + gerçek yüksekliği
ölçüp yer yoksa ters yöne çevirme + yatay sıkıştırma + açıkken scroll/resize
takibi.

---

### 🔬 Bu oturumun kalıcı dersleri (hepsi `CLAUDE.md`'ye yazıldı)

1. **`toBeVisible()` okunabilirlik sinyali değildir** (§23.21) — görüş alanının
   dışındaki öğe de Playwright için görünürdür. Konumu `boundingBox()` ile ölç.
2. **CRLF dosyada kör metin değiştirme sessizce eşleşmez** (§23.22) — depoda
   satır sonları KARIŞIK (`HomePage.jsx` CRLF, veri dosyaları LF).
3. **`generate-static-routes.mjs` tek başına koşturulursa yanlış kabuk üretir**
   (§23.23) — idempotent değil; TR ve EN uzunlukları birebir aynı çıkıyorsa
   şüphelen.
4. **Arayüz açıklaması genel bilgi anlatmaz** (§25.7) — pratik testi: cümleyi
   başka bir e-ticaret sitesi için de yazabiliyorsan oraya ait değildir.
5. **Repo'ya bağlı belge, repo indirmeyene YOK demektir** (§25.8).
6. **Hover ve tıklama AYRI durumlarda tutulmalı** — tek bayrakla yazılınca fare
   zaten üstteyken tıklamak baloncuğu KAPATIYORDU (test yakaladı).
7. **Testin kendisi de eskir** — bu oturumda 4 test eski davranışı koruyordu
   (afiş şartnameye gitmeli, `kavram-baseUrl`, eski baloncuk metni, `href`
   desen eşlemesi üç QA Shop sayfasını da kabul ediyordu).

---

### 🛡️ Bu oturumda eklenen bekçiler (HEPSİ bozularak kırmızıya döndürüldü)

| Bekçi | Ne kırar |
|---|---|
| `scripts/check-qa-shop-sql-map.mjs` | SQL ↔ dizin ↔ eşleme ayrışması, eksik "Ne bakar", ölü kural/story/defect atfı, cevap sızdıran satırın geri gelmesi (5 kontrol) |
| `scripts/check-qa-shop-kavramlar.mjs` | Tanımsız/kullanılmayan kavram, eksik iki dillilik, düz genel terim başlığı (4 kontrol) |
| `tests/qa-shop-pages.spec.ts` — dizin sızıntısı | Herkese açık dizinde kural/story/defect adı görünmesi |
| ... — şartname eşlemesi | Anonim ziyaretçiye sorgu eşlemesi render edilmesi |
| ... — afiş hedefi | Afiş/giriş linkinin dükkândan başka yere gitmesi |
| ... — indirilebilir SQL | Link ya da arkasındaki dosya kaybolması |
| ... — baloncuk okunabilirliği | Baloncuğun görüş alanı dışına taşması (375px mobil dahil) |

⚠️ Bir düzeltme: `pointer-events: none` bir ara "bugünkü yerleşimde taşıyıcı
değil" diye ölçülmüştü (baloncuk hep yukarı açıldığı için düğmeyi örtmüyordu).
**Artık taşıyıcı** — baloncuk yer yokken aşağı açılıyor ve düğmeyi örtebiliyor.

---

### ✅ Doğrulama durumu (bu oturum, TÜM değişikliklerden sonra)

`npm run build` ✔ · `check-content-integrity` ✔ · `check-i18n-leaks` ✔
(borç 0; iki yeni dosya sıfır-toleransa eklendi) · `check-qa-shop-sql-map` ✔
(30 sorgu) · `check-qa-shop-kavramlar` ✔ (15 kavram) ·
`qa-shop-pages` + `no-internal-jargon` + `theme-and-accessibility` **45/45**

Kabuk ölçümü: `/qa-shop-setup` 4208 → **6076** karakter (30 sorgunun 30'u
kabukta) · `/qa-shop-spec` **6408** karakter.

---

### 🎯 SIRADAKİ İŞ

| # | İş | Bedel | Not |
|---|---|---|---|
| 1 | **Kavram baloncuklarını vitrine yay** | Orta | Şu an 15 kavram QA paneli + API sayfasında. Vitrin/sepet/ödeme akışında bize mahsus davranışlar var: sipariş durum geçişleri, ödeme başarısız senaryosu, adres varsayılanı, yorum onay akışı. ⚠️ §25.7 ölçütünü uygula — "sepet nedir" YAZILMAZ. |
| 2 | **`/qa-shop-spec` tema/erişilebilirlik testine ekle** | Küçük | Devreden iş; diğer üç QA Shop sayfası ekli, bu değil. |
| 3 | **Rate limit kararı** | Orta | API'de yok, 429 dönmüyor. Kullanıcı sormuştu, karar bekliyor. Eklenirse iyi bir negatif test hedefi olur. |
| 4 | **İmaj yayını** | Küçük | `qa-shop-v1.0.0` etiketi + GHCR paketlerini Public yapma. Dışa dönük, kullanıcı kararı. |
| 5 | **Üyelik senkronizasyonu** | Orta | Aynı Supabase kullanıcısı için kalıcı sandbox (şu an her giriş yeni alan açıyor). |

**Faz 6 kabul kriteri (karşılandı görünüyor, elle doğrulanmadı):**
Dükkâna ilk giren kullanıcı hiçbir beklenen status kodu görmeden bir defect
bulabiliyor ve bulduğunu anahtarı aç/kapat yaparak kendisi doğrulayabiliyor.

---

### 🚫 Bilinçli olarak YAPILMAYACAK (yeniden tartışma açma)

- **`/qa-shop/docs` diye ayrı route ağacı** — kabuk yazma yükü getirir,
  karşılığı yok.
- **Swagger'ı kısmak** — sözleşme sahada da tam verilir.
- **Story sayısını azaltmak** — 16 kalır.
- **Av turunu sunucuda varsayılan yapmak** — otomasyon paketlerinin temiz
  başlangıcını bozar.
- **Giriş kapısını şartnameye geri çevirmek** — 2026-08-27'de ölçülüp
  değiştirildi, gerekçesi `CLAUDE.md` §2'de yazılı.
- **Kavram baloncuğuna genel kavram eklemek** — §25.7, build kapısı kırar.
- **SQL eşlemesini herkese açmak** — §25.2.1.

---

### 📂 Çalışma ağacı durumu

Commit YOK. Bu oturumda değişen/eklenen dosyalar:

```
M  CLAUDE.md                                §2 üçlü sırası, §11 (+4 madde),
                                            §23.21-23.23, §25.7, §25.8
M  .claude/NEXT_SESSION.md                  bu not
M  package.json                             2 yeni build kapısı + 2 alias
M  qa-shop/db/validation-queries.sql        cevap sızdıran satırlar çıktı,
                                            30 sorguya "Ne bakar" eklendi
?? scripts/check-qa-shop-sql-map.mjs        YENİ bekçi
?? scripts/check-qa-shop-kavramlar.mjs      YENİ bekçi
M  scripts/build-qa-shop-downloads.mjs      SQL paketi indirilebilir
M  scripts/check-i18n-leaks.mjs             2 dosya sıfır-toleransa
M  scripts/generate-static-routes.mjs       ilkAciklama() + SQL dizini kabuğa
?? src/data/qaShopSqlPackData.js            YENİ — herkese açık dizin
?? src/data/qaShopSqlMap.js                 YENİ — admin eşlemesi
?? src/data/qaShopKavramlarData.js          YENİ — 15 kavram
?? src/components/QaShopKavram.jsx          YENİ — portal + konum hesabı
M  src/components/QaShopPage.jsx            kavram yerleşimleri
M  src/components/QaShopSetupPage.jsx       sqlPack blok tipi, goal kaldırıldı
?? src/components/QaShopApiPage.jsx         kavram yerleşimleri
?? src/components/QaShopSpecPage.jsx        SqlChecksRow, goal kaldırıldı
M  src/components/HomePage.jsx              afiş + nav dükkâna
M  src/data/qaShopSetupData.js              SQL dizini + indirme + goal kaldırıldı
?? src/data/qaShopSpecData.js               goal kaldırıldı
M  src/data/whatIsTestingData.js            site haritası sırası
?? tests/qa-shop-pages.spec.ts              +5 test, 4 test güncellendi
```

Önceki oturumlardan devreden kirli dosyalar da duruyor (Supabase köprüsü,
admin rehber sayfası, ürün fotoğrafları). Tam liste: `git status --short`
(79 dosya).

---

### 📋 SONRAKİ SOHBET İÇİN PROMPT (kopyala-yapıştır)

    Önce CLAUDE.md'yi, sonra .claude/NEXT_SESSION.md'yi oku — en üstteki
    "2026-08-28, Opus" devir notu geçerli. Hiçbir şey commit edilmedi
    (son commit f4ef66b); commit/push konusunda bana sormadan bir şey yapma.

    Üç bağlayıcı ölçüt, hepsi CLAUDE.md'de yazılı:

    1. §25.2.1 — bilgi "kuralın ne olduğunu" söylüyorsa VERİLİR; "o kuralı
       sınamak için ne yapıp hangi cevabı bekleyeceğini" söylüyorsa VERİLMEZ.
       İnce ayrıntı ve püf noktası admin'e; normal kullanıcı defect'i kendisi
       analiz etsin.
    2. §25.7 — arayüz açıklaması YALNIZCA bu uygulamaya mahsus davranışı
       anlatır. "API nedir", "sepet nedir" YAZILMAZ. Pratik testi: cümleyi
       başka bir e-ticaret sitesi için de yazabiliyorsan oraya ait değildir.
    3. §25.8 — repoyu indirmeyen, sadece Docker imajlarıyla kuran kullanıcı
       da her belgeye ulaşabilmeli.

    Sıradaki iş (devir notundaki tabloya bak):

    1. Kavram baloncuklarını dükkânın VİTRİN tarafına yay: sipariş durum
       geçişleri, ödeme başarısız senaryosu, adres varsayılanı, yorum onay
       akışı. Her biri için önce "bu bize mi mahsus?" diye sor.
       Bileşen ve sözlük hazır: src/components/QaShopKavram.jsx +
       src/data/qaShopKavramlarData.js. Yeni bileşen yazma, sadece veri ekle.
    2. /qa-shop-spec'i tests/theme-and-accessibility.spec.ts'e ekle.

    Her adımdan sonra CLAUDE.md §1.1'deki 4 maddelik checklist'i çalıştır
    (içerik bütünlüğü, ipucu-konu bağı, TR yorum taraması, npm run build).
    Yeni bir bekçi yazarsan BOZUK durumu bilerek üretip kırmızıya döndüğünü
    gör — yeşil bir test tek başına hiçbir şey kanıtlamaz.

    Not: bu depoda satır sonları KARIŞIK (HomePage.jsx CRLF, veri dosyaları
    LF). Çok satırlı düzenlemede Edit aracını kullan; script yazacaksan önce
    satır sonunu ölç (§23.22).

---

## 📌 Önceki Durum (2026-08-27 · Opus — cevap anahtarını kullanıcının önünden çekmek)

> ⚠ Bağlayıcı DEĞİL; en üstteki nota bak. Bu oturumun ana katkısı
> `CLAUDE.md` §25.2.1 (tester'ın gerçekten ihtiyaç duyduğu dört şey).

### 🎯 Bağlayıcı ölçüt — tester'ın gerçekten ihtiyaç duyduğu dört şey

Kullanıcının sözleriyle: sahada bir tester'ın en çok işine yarayan şey
**(1)** expected result'ı iyi anlamak — şemalar, analiz belgeleri;
**(2)** ayrıntılı Swagger dokümanı; **(3)** kullanabildiği UI;
**(4)** erişebildiği veritabanı. *"Bundan fazlasını kullanıcıya neden
veriyoruz?"*

**Sınır (ezberlenecek tek cümle):** bilgi *"kuralın ne olduğunu"* söylüyorsa
VERİLİR; *"o kuralı sınamak için ne yapıp hangi cevabı bekleyeceğini"*
söylüyorsa VERİLMEZ.

| Aynı konu | ✅ Kural (verilir) | ❌ Reçete (verilmez) |
|---|---|---|
| Durum geçişi | "Ödenmemiş sipariş kargolanamaz" | "Ödemesiz kargola → 409 INVALID_TRANSITION bekle" |
| Yetki | "Kimse başkasının siparişini göremez" | "B, A'nın id'sini çağırdı → 403. 404 değil 403 — kodu sabitle" |
| Sınır | "Sayfa boyutunun üst sınırı var, aşan istek reddedilmez" | "size=9999 → 200 ve 100 kayıt" |
| Hata kodu | Sözlük: `COUPON_EXPIRED` = süresi dolmuş | Katalog: "süresi geçmiş kupon → 422 COUPON_EXPIRED" |

### 📋 O Oturumda Yapılanlar

1. **Çıkış akışı testi bitirildi.** Önceki oturum yazmış ama yeşil olduğunu
   görmemişti. 3/4 düşmüştü — sebep üründe değil testteydi (uydurma kimlikle
   giriş deneniyordu; seed demo hesabı `demo@qashop.test` / `Password123!`).
   Yeniden yazıldı, **5/5**. Bekçi olduğu kanıtlandı.
   ⚠ Yan bulgu: önceki oturumun "düzeltmesi" gereksizdi — `token` state'ini
   izleyen `useEffect` zaten depodan siliyor. Oturumun yenilemeden sonra geri
   gelmemesini sağlayan asıl şey `logout`'un token'ı SUNUCUDA iptal etmesi.
2. **Faz 6.1 — gizli defect modu VARSAYILAN.** Kendi veri alanı yazılabilir
   olur olmaz dükkân kendiliğinden gizli tur açıyor (3 defect). Adlı liste
   artık düğmeyle açılıyor.
   ⚠ Av SUNUCUDA varsayılan yapılmadı: `POST /sandbox` temiz alan döndürmeye
   devam ediyor, çünkü Postman/REST Assured paketleri kusursuz başlangıç bekler.
3. **Faz 6.3 — paketler indirilebilir.** `scripts/build-qa-shop-downloads.mjs`
   her build'de Postman koleksiyonu + ortam + README ve REST Assured starter
   zip'ini üretiyor (depoya GİRMİYOR). Zip yazıcısı elle yazıldı, gerçek
   `unzip` ile doğrulandı.
4. **Terim düzeltmesi:** uç → **endpoint**, yığın → **stack**, kusur →
   **defect**. 20 dosyada ~110 dize; her eşleşme bağlamıyla ayıklandı
   (`uçak`/`uçuş`/`uçtan uca`/`matkap ucu`/`uç değer`/`kusursuz` korundu).
5. **User story'ler sadeleşti.** Story listesinin başındaki iki öğretici panel
   ve karttan "kıran anahtar"/"Dikkat" kutuları kaldırıldı.
6. **Kabul kriterleri ikiye ayrıldı.** Herkes SADE kriteri görüyor ("Adet sıfır
   yapılamaz"), admin ek olarak Given/When/Then dökümünü, status kodlarını ve
   test verisi tablosunu. 16 story için **62 sade kriter** yazıldı, iki dilde.
7. **Sözleşme ayrıntısı sayfaya taşındı.** Ölçüm: `openapi.yaml` 19 maddelik
   listenin 16'sını karşılıyordu ama **sayfanın okuduğu build türevi çoğunu
   hiç taşımıyordu**. Türev genişletildi: base URL, iki katmanlı kimlik
   (42/46 endpoint'te başlık rozeti), gövde alan/tip/zorunluluk tablosu
   (14), cevap gövdesi (31), örnek istek (11), örnek cevap (24).
   Karşılanmayan iki madde **uydurulmadı**: tek ortam var, rate limit yok.
8. **Kurulum rehberine tek ekran görüntüsü + Docker ön koşulu.** Ekran
   **inline SVG** olarak çizildi; değerler ayakta bir stack'te ölçüldü.
9. **Şartname sayfasından cevap anahtarları temizlendi.** "Geçiş kuralları
   (ölçüldü)" → "İzinli ve yasak geçişler"; "Hata kataloğu" (21 satır) →
   "Hata sözlüğü" (19 satır); kural kartında "NASIL DOĞRULANIR" ve "kıran
   anahtar" admin'e alındı.
10. **Çelişkiler kapatıldı.** Manuel tur tersine çevrildi (adımı yap →
    gördüğün status kodunu yaz → sistem doğrular); ilerleme sayacı artık
    kapatılan bulguyu sayıyor. Şartname modu hover paneli sade kriteri
    gösteriyor.

### 🔬 O oturumun kalıcı dersleri

1. **Statik tarama cevap sızıntısını yakalayamaz.** 38 bulgunun çoğu
   yanlış-pozitifti ve gerçek sızıntıyı hiç görmedi — durum makinesi
   açıklaması bileşene HARDCODE edilmişti ("her geçiş yasaktır **ve 409
   döner**"). Yalnızca tarayıcıda render edilen metni tarayan test yakaladı.
2. **"Sözleşmede var" ile "ekranda var" iki ayrı şeydir.** Türev geçerliydi,
   hash tutuyordu, 46 endpoint görünüyordu — ama yarısı taşınmıyordu.
3. **§23.3 iki kez daha ısırdı.** `uç` kelimesi kelime bazlı dönüştürülemez;
   apostrof kaçışını körlemesine uygulamak dizeyi KAPATAN tırnağı da kaçırıp
   dört dosyayı kırdı.
4. **Testin kendisi de eskiyebilir.** İki test eski davranışı koruyordu ve
   biri yıllardır yanlış şeye bakıyordu — kapalı API adresi uygulamayı
   tarayıcı moduna düşürüyor, orada kilit hiç devreye girmiyor.

---

## 📌 Önceki Durum (2026-08-26 akşam · Opus — keşif önceliği kararı, CLAUDE.md §25 yazıldı)

> ⚠️ Bağlayıcı DEĞİL; en üstteki nota bak. Bu oturumun ana katkısı
> CLAUDE.md §25 (Keşif Önceliği) ve plan dosyasının Bölüm 0'ı.

### ⚠️ ÖNCE BUNU OKU

Bu oturumda **kod değil, YÖN değişti.** Kullanıcı QA Shop paketinin
pedagojisini reddetti ve haklıydı. Kalıcı kural yazıldı, plan yeniden
yazıldı. Sıradaki iş artık "eksik özellik eklemek" değil, **var olanın
görünürlük sırasını değiştirmek**.

Son commit hâlâ **`f4ef66b`**. Ondan sonraki TÜM iş çalışma ağacında —
**kullanıcı commit istemedi, sormadan commit atılmayacak.**

---

### 🎯 Bu oturumun ana kararı — keşif önceliği

Kullanıcının sözleriyle: *"Sen her ihtimali test eden kullanıcıya söyleme.
Kullanıcı kendisi keşfetsin. Bırak önce kullanıcı kendisi keşfetsin."*

**İlke:** Sistem bulguyu **DOĞRULAR**, asla **İLAN ETMEZ**.

Test etmek, sistemin nerede kırılacağı hakkında hipotez üretmektir — meslekte
öğrenilmesi en uzun süren beceri. Hazır verildiğinde hiç öğrenilmiyor. Şu anki
ürün cevabı peşinen dağıtıyor: "6. adım: stoğu aşmayı dene, 409 bekle",
`catchableBy` alanları, "testine `Ayse@x.com` ekle" ipuçları, adlı kusur
listesi.

**Yazıldığı yer:** `CLAUDE.md` **§25** (yeni bölüm, 6 alt başlık) + §11 hata
listesine 5 yeni madde.

**Kritik ayrım (§25.2):**
- ✅ **Verilir:** gerçek görünen UI, TAM OpenAPI sözleşmesi, user story +
  kabul kriterleri, sıfırlanabilir ortam. Sahada da QA'ya verilir.
- ❌ **Verilmez:** kusurun yeri, beklenen status kodu, somut test verisi
  ipucu, açık kusurların adlı listesi.

---

### 🔍 Ölçülen bulgu — eksik olan içerik DEĞİL, raf

Bir dış inceleme "şunları üret" dedi. Neredeyse tamamı **zaten yazılmıştı**:

| İnceleme "yok" dedi | Gerçekte | Ulaşılabilir mi? |
|---|---|---|
| Postman paketi happy+negative | 6 klasör, 7 NEGATİF istek | ❌ link yok, `public/`'te değil |
| Starter test repo | REST Assured 4 test sınıfı, koşturulmuş | ❌ sitede adı geçmiyor |
| Bilinçli kusur listesi | 10 anahtar + `catchableBy` + gizli av | ⚠️ sayfa dibinde |
| UI turu 12 adım | tam 12 adım, gerçek pedagoji | ⚠️ kapalı, 1724 satırın 1719'unda |
| DB doğrulama | 127 sorgu, "0 satır = GEÇTİ" | ❌ docker hatası dipnotunda |

**Daha derin bulgu:** Doğru pedagoji de zaten yazılmış. Kusur panelindeki
metin aynen: *"Gizli tur başka bir soru sorar: kusuru BULABİLİYOR musun?
Sistem birkaç kusuru açar, hangileri olduğunu söylemez. Sahada da kimse
söylemez."* Kod tarafı tam (`pickRandomFlags`, `hiddenCount`, `isHidden`,
`describeFlagsHidden`). **Sadece varsayılan değil.** Varsayılan, cevap anahtarı.

---

### 📋 Bu Oturumda Yapılanlar

1. **`CLAUDE.md` §25 yazıldı** — Keşif Önceliği, 6 alt başlık: ilke · iş
   malzemesi ile iş çıktısı çizgisi · üç katmanlı açığa çıkarma · varsayılan
   kuralları · geri bildirim zorunluluğu · ilerleme ölçütü.
2. **`CLAUDE.md` §11'e 5 yeni hata maddesi** eklendi (cevap anahtarını öne
   almak, sadece hover ipucu, geri bildirimsiz keşif vb.).
3. **Plan yeniden yazıldı** — `Documents/qa-shop-practice-platform-plan.md`'ye
   **Bölüm 0 (Yeniden Yönlendirme)** eklendi ve dosyanın en güncel bölümü
   ilan edildi. İçinde: teşhis tablosu, yeni öğrenme sırası, **Faz 6** iş
   kalemleri (6.1-6.7), kapsam dışı kararlar.
4. **Bayat faz satırları düzeltildi** — Faz 2 ve Faz 4 "yapılmadı/kısmen"
   yazıyordu, ikisi de tamam.
5. **Logout düzeltmesi** — `QaShopPage.jsx` `cikisYap()` fonksiyonu token'ı
   state'ten siliyordu ama `localStorage`'dan silmiyordu; `removeItem` eklendi.

---

### ⚠️ DOĞRULANMAMIŞ — sonraki oturum ilk bunu bitirsin

**`tests/qa-shop-logout-flow.spec.ts` yazıldı ama YEŞİL OLDUĞU GÖRÜLMEDİ.**

İlk koşumda 4/4 senaryo düştü: testler giriş formunun sayfada hazır durduğunu
varsayıyordu, oysa form varsayılan KAPALI ve `giris-ac` düğmesiyle açılıyor.
Seçiciler `data-testid`'lere çevrildi (`giris-ac`, `giris-eposta`,
`giris-parola`, `giris-yap`, `cikis-yap`) **ama düzeltilmiş hâli hiç
koşturulmadı.** Yeşil olduğu iddia edilemez.

Koşum komutu: `npm run test:e2e -- tests/qa-shop-logout-flow.spec.ts`

Not: paket production build'e karşı koşar (port 4175), dev sunucusuna değil.

---

### 🎯 SIRADAKİ İŞ — Faz 6 (keşif önceliği), ucuzdan pahalıya

Ayrıntı: `Documents/qa-shop-practice-platform-plan.md` Bölüm 0.5.

| # | İş | Bedel |
|---|---|---|
| 6.1 | **Gizli mod varsayılan olsun** — "bu alanda N kusur açık, hangileri söylenmiyor". Adlı liste opt-in. Mekanizma HAZIR, sadece varsayılan değişecek | Küçük |
| 6.2 | **Manuel tur → kendi kendini sınama.** Sıra: bulgu → kayıt → doğrulama. Şu an: cevap → uygula | Orta |
| 6.3 | **Postman + REST Assured starter indirilebilir olsun** — `public/` altına kopyala, kurulum/API sayfalarından link ver. Yazma işi yok, görünür kılma | Küçük |
| 6.4 | **SQL katmanını yola bağla** — 127 sorgu senaryolara eşlensin | Orta |
| 6.5 | **Afişi ve nav'ı dükkâna çevir**, şartname referans rafına insin | Küçük |
| 6.6 | **Story ipuçlarını Katman 1'e indir** — `hint` gizli, tıkla/hover ile açılır, metni cevaptan dürtmeye | Orta |
| 6.7 | **İlerleme "gezdim"den "kapattım"a** | Küçük |

**Faz 6 kabul kriteri:** Dükkâna ilk giren kullanıcı hiçbir beklenen status
kodu görmeden bir kusur bulabiliyor ve bulduğunu anahtarı aç/kapat yaparak
kendisi doğrulayabiliyor.

**Öneri:** 6.1 + 6.3 ile başla — ikisi birlikte yarım saatlik iş ve etkisi en
büyüğü.

---

### 🚫 Bilinçli olarak YAPILMAYACAK (yeniden tartışma açma)

- **`/qa-shop/docs` diye ayrı route ağacı** — inceleme önerdi, reddedildi.
  Yeni route arama motoru tarafında elle kabuk yazma yükü getirir (§23.16),
  karşılığı yok. Aynı sonuç giriş kapısını ters çevirerek alınır (6.5).
- **Swagger'ı kısmak / "önce 12 uç"** — sözleşme sahada da tam verilir.
- **Story sayısını azaltmak** — 16 kalır; sorun sayı değil ipucunun katmanı.
- **"Hiçbir test flaky değil" demek** — kanıtlanmamış iddia, kullanılmayacak.

---

### ⚠️ İPTAL EDİLEN ESKİ KARAR

"Afiş ve nav linkleri bilerek şartnameye işaret eder — kullanıcı önce ne
olduğunu görmeli, sonra kurmalı" (2026-08-18) kararı **iptal edildi**. Gerekçe
sağlamdı ama ölçüm kullanıcının önce *kurcalamak* istediğini gösterdi. Yeni
sıra: **Dükkân → av → sözleşme/story referans → otomasyon → belge.**

⚠️ `CLAUDE.md` §2'deki QA Shop üçlüsü açıklaması hâlâ eski sırayı
(şartname, kurulum, dükkân) yazıyor. 6.5 yapılırken orası da güncellenmeli.

---

### 📂 Çalışma ağacı durumu

Commit YOK. Bu oturumda değişenler:

- `M CLAUDE.md` — §25 yeni + §11'e 5 madde
- `M Documents/qa-shop-practice-platform-plan.md` — Bölüm 0 + Faz 6 + bayat satır düzeltmeleri
- `M .claude/NEXT_SESSION.md` — bu not
- `M src/components/QaShopPage.jsx` — logout localStorage temizliği
- `?? tests/qa-shop-logout-flow.spec.ts` — YENİ, henüz yeşil görülmedi

Önceki oturumlardan devreden kirli dosyalar da duruyor (Supabase köprüsü,
admin rehber sayfası, ürün fotoğrafları). Tam liste: `git status --short`.

---

### 📋 SONRAKİ SOHBET İÇİN PROMPT (kopyala-yapıştır)

    CLAUDE.md ve .claude/NEXT_SESSION.md'yi oku (en üstteki 2026-08-26 akşam
    devir notu geçerli).

    Bu oturumda QA Shop'ta KEŞİF ÖNCELİĞİ'ne (CLAUDE.md §25) geçiyoruz. İlke:
    sistem bulguyu doğrular, ilan etmez. Kullanıcı kusurun yerini, beklenen
    status kodunu ve test verisi ipucunu PEŞİNEN görmemeli; önce kendisi
    kurcalayıp bulmalı.

    Sırayla:

    1. ÖNCE doğrulanmamış işi bitir:
       npm run test:e2e -- tests/qa-shop-logout-flow.spec.ts
       (seçiciler düzeltildi ama yeşil olduğu HİÇ görülmedi, 4/4 düşmüştü)

    2. Sonra Faz 6.1 + 6.3'u yap (plan dosyasi Bölüm 0.5):
       - 6.1 Gizli kusur modu VARSAYILAN olsun: dükkân açılışında "bu alanda
         N kusur açık, hangileri söylenmiyor". Adlı liste yalnızca kullanıcı
         isterse. Mekanizma hazır (pickRandomFlags/hiddenCount/isHidden),
         değişen sadece hangi durumun ilk açıldığı.
       - 6.3 Postman koleksiyonunu ve REST Assured starter'ı public/ altına
         koyup kurulum + API sayfalarından linkle. Şu an ikisi de repoda var
         ama siteden ERİŞİLEMİYOR.

    3. Her adımdan sonra CLAUDE.md §1.1'deki 4 maddelik checklist'i çalıştır
       (içerik bütünlüğü, ipucu-konu bağı, TR yorum taraması, npm run build).

    Commit ATMA, istemeden commit yok.

---

## 📌 Önceki Durum (2026-08-26 PM · Haiku — Supabase köprüsü, admin rehber sayfası)

### ⚠️ ÖNCE BUNU OKU

Son commit **`f4ef66b`**. Ondan sonraki TÜM iş çalışma ağacında duruyor —
**kullanıcı commit istemedi, sormadan commit atılmayacak.**

Docker Desktop bu makinede **açık** (ayakta). Lokal API modunda test edildi.

---

### 📋 Bu Oturumda Yapılanlar (2026-08-26 PM)

**✔ Tamamlanan İşler:**

1. **Lokal API Doğrulaması**
   - Docker Desktop açıldı, konteynerler ayakta (qashop-api, qashop-db)
   - `curl` ile `POST /sandbox` 201 döndü (sandbox oluşturma)
   - `curl` ile `POST /auth/login` 200 döndü (token alındı)
   - **Sonuç:** Giriş düzeltmesi lokal modda çalışıyor

2. **Ürün Fotoğrafları**
   - `Classic Black T-Shirt.webp` → `tshirts.webp` yeniden adlandırıldı
   - `npm run qa-shop:gorseller` çalıştırıldı
   - **Sonuç:** Sekiz kategorinin tamamında fotoğraf var (11 MB → 244 KB)

3. **Admin-only "Detaylı Test Rehberi" Sayfası**
   - Route: `/qa-shop-detailed-guide` (RequireAdmin korumalı)
   - İçerik: 16 US için test stratejileri, API endpoint'leri, edge case'ler, kusur anahtarları
   - Data: `src/data/qaShopDetailedGuideData.js` (6 section, bilingual)
   - Component: `src/components/QaShopDetailedGuidePage.jsx` (genişletilebilir accordion)
   - SEO: `seo.js`'e metadata eklendi (noindex: true)
   - Test: `check-test-coverage.mjs` EXCEPTIONS'a eklendi
   - **Sonuç:** Build ✔, 52 route + admin sayfa

4. **Supabase Bridge — Backend (API)**
   - Endpoint: `POST /api/v1/auth/supabase-bridge`
   - Input: `supabaseToken`, `userEmail`, `userName`
   - İş: Supabase üyesi için sandbox oluştur, user yarat, token döndür
   - Mock token doğrulaması (supabase_ prefix kontrol)
   - Real JWT doğrulaması deployment'ta eklenebilir
   - **Dosya:** `qa-shop/api/src/routes/auth.js` (~60 satır)
   - **Sonuç:** Endpoint doğrulandı

5. **Supabase Bridge — Frontend (Bootstrap)**
   - Logic: Sayfa yükleme sırasında Supabase token localStorage kontrol
   - Varsa: `POST /auth/supabase-bridge` çağrısı → otomatik login
   - Yoksa: Manuel giriş akışı (mevcut form)
   - **Dosya:** `src/components/QaShopPage.jsx` (useEffect eklendi)
   - **Sonuç:** Build ✔, tarayıcıda test hazır

6. **Build & Kontrolleri**
   - `npm run build` — 104 route, 52 (56 önceki + 1 admin sayfa yeni)
   - SEO check ✔ (noindex: 10)
   - Content integrity ✔
   - i18n leaks ✔

---

### ⚠️ AÇIK KALANLAR — SONRAKI OTURUM

| # | İş | Not |
|---|---|---|
| 1 | **Logout akışı doğrulaması** | Tarayıcıda "Çıkış yap" tıkla → token temizlensin → manual giriş mümkün |
| 2 | **Kalan 10 user story bağlama** | `/qa-shop-spec` şartname modunda (hover) US-07 ila US-16 |
| 3 | **Nav linklerinden erişim** | Ana sayfa + footer'dan `/qa-shop-spec` linki (nav'da görünür) |
| 4 | **İmaj yayını (GHCR)** | `qa-shop-v1.0.0` etiketi, özel dil public yapma (dışa dönük) |
| 5 | **Tema/erişilebilirlik testi** | `/qa-shop-spec` tests/theme-and-accessibility.spec.ts'e ekleme |
| 6 | **Üyelik senkronizasyonu** | Aynı Supabase user için persistent sandbox (şimdi her giriş yeni) |

**Komit Durum:**
- Commit YOK (kullanıcı istemedi)
- Çalışma ağacı temiz DEĞİL — aşağıdaki dosyalar değişti:
  ```
  M .claude/NEXT_SESSION.md (bu dosya)
  M src/App.jsx (route + lazy import)
  M src/components/QaShopPage.jsx (Supabase bootstrap)
  M src/utils/seo.js (metadata)
  M scripts/check-test-coverage.mjs (exception)
  ?? src/data/qaShopDetailedGuideData.js
  ?? src/components/QaShopDetailedGuidePage.jsx
  M qa-shop/api/src/routes/auth.js (Supabase endpoint)
  ```
- Sonraki oturum başında: `git status` çıktısı yukarıdakiyle eşleşmelidir

---

### 📍 QA Shop — Dört Sayfalı Pratik Ortamı

| Sayfa | Ne |
|---|---|
| `/qa-shop-spec` | 16 user story, kabul kriterleri, iş kuralları, hata kataloğu |
| `/qa-shop-setup` | Docker, DBeaver, Postman kurulumu |
| `/qa-shop-api` | Swagger görünümü — 46 uç, status kodlarıyla |
| `/qa-shop` | Çalışan dükkân (gerçek ürün fotoğraflarıyla) |

Dördü de birbirine bağlı: üstte geçiş şeridi (derin bağlantılı), altta her
kaydırma konumunda görünen sabit şerit.

---

### 🔑 En kritik mimari karar: iki mod, tek sözleşme

`/qa-shop` açılışta lokal yığını **1200 ms timeout** ile yokluyor:

- **Ayaktaysa** → Lokal API modu (gerçek Postgres, DBeaver/Postman erişebilir)
- **Değilse** → **Tarayıcı modu** sessizce devreye giriyor (sql.js + IndexedDB)

Tarayıcı modunda **MSW gerçek Service Worker modunda** — bellek içi yama DEĞİL.
İstek gerçekten ağ katmanına iniyor ve DevTools → Network'te method/path/status
ile görünüyor. Her cevapta `X-QA-Shop-Mode: browser` başlığı var. Bu, "manuel
adımı yap, gerçek HTTP status'ünü gör" vaadinin tek dayanağı.

İki modda da yol aynı: `/api/v1/...`. Kullanıcı aynı isteği iki modda da görür.

---

### 🧬 Türev üretimi — dört türev, üçü hash korumalı

Şema, iş kuralları ve sözleşme TEK kaynaktan türetiliyor; ikinci kopya elle
yazılmadı.

| Komut | Kaynak → Türev | Build'de |
|---|---|---|
| `npm run qa-shop:seed` | `qa-shop/db/*.sql` → sql.js tohum verisi | hash doğrulanır |
| `npm run qa-shop:core` | `qa-shop/api/src/core/` → iş kuralları | hash doğrulanır |
| `npm run qa-shop:openapi` | `openapi.yaml` → sözleşme JSON'u | hash doğrulanır |
| `npm run qa-shop:gorseller` | `qa-shop/urunler/` → optimize fotoğraf + manifest | **doğrulanmaz** |

Üçünde kaynak değişip türev yenilenmezse build kırılır (bilerek bozup
doğrulandı). Fotoğraflarda hash kapısı YOK — fotoğraflar bilinçli olarak
opsiyonel, klasör boşken SVG yolu birinci sınıf davranış; kapı koymak görseli
olmayan geliştiricinin build'ini sebepsiz kırardı.

⚠️ **Tohum üreteci "çevirici" değil "dökümcü".** `schema.sql`'i regex'le
SQLite'a çevirmek ölçülüp reddedildi (793 satırda 7 `generate_series`, 3 plpgsql
fonksiyonu, jsonb/uuid/interval). Bunun yerine çalışan Postgres'ten
`information_schema` ile dökülüyor ve çıktı sql.js'e gerçekten yüklenerek
doğrulanıyor. Üretim Docker ister; **CI yalnızca hash doğrular.**

⚠️ **Parola:** WebCrypto scrypt desteklemiyor. Üreteç seed parolasını
`seed.sql`'den OKUYUP gerçek scrypt özetine karşı DOĞRULUYOR, sonra PBKDF2'ye
çeviriyor. 41/41 kullanıcı doğrulandı — tahmin yok.

---

### 🖼️ Ürün fotoğrafları — 7/8 kategori kapalı

| Klasör | Ne | Depoya girer mi |
|---|---|---|
| `qa-shop/urunler/` | KAYNAK — 2048px, 11 MB | ✖ gitignore |
| `public/qa-shop/urunler/` | TÜREV — 800px, 244 KB | ✔ commit |

Ölçüldü: **11.03 MB → 0.22 MB (%98)**. Kart ~330px gösteriyor; 2048px sunmak 40
kat gereksiz veri indirtiyordu.

| Kategori | Ürün adı | Durum |
|---|---|---|
| shirts / dresses / jeans / sneakers / boots / bags | — | ✔ |
| coats | Casual **Green** Coat | ✔ görsel var ama **antrasit** |
| **tshirts** | **Classic Black T-Shirt** | ✖ **EKSİK** — 15 ürün SVG'de |

Sekiz kategorinin her birinde tam 15 ürün var; hiçbiri opsiyonel değil. Eksik
kategori vitrini bozmuyor, SVG çizimine düşüyor.

⚠️ **Dosya adı ≠ içerik.** Kaynak `slim fit red tshirt.webp` ama içi yakalı,
düğmeli bir GÖMLEK. Ada bakan otomatik eşleyici onu `tshirts`e gönderirdi.
Bu yüzden `scripts/optimize-qa-shop-images.mjs` içinde gözle doğrulanmış açık
bir `ELLE_ESLEME` tablosu var. Yeni dosya: ya adı doğrudan kategori olsun
(`tshirts.webp`), ya o tabloya satır.

`CLAUDE.md` §11'e gerekçeli istisna yazıldı (dış görsel yasağı — QA Shop ürün
fotoğrafları hariç: depoda barındırılır, dosya yoksa SVG'ye düşer).

---

### 🐞 Kusur anahtarları ve gizli tur

10 anahtar + **gizli tur**: sistem rastgele N kusuru açar, hangileri olduğunu
SÖYLEMEZ. Gizleme **sunucuda** — `GET /sandbox/bugs` cevabında `enabled`/`active`
alanları hiç yok (tarayıcıya gelen tüm gövdeler ölçüldü). Denetim kaydına da
seçilen anahtarlar yazılmıyor; gizli tur sürerken `PATCH` reddediliyor
(ikili aramayla cevabı bulmayı önlemek için).

---

### 🧪 Şartname modu (bağlamsal user story)

Dükkândaki öğeye hover → o öğenin user story'si + kabul kriterleri.
Bağlı: US-04, US-05, US-07, US-10, US-15, US-16.

⚠️ **BOZMA:** `/qa-shop` bir Selenium/Playwright HEDEFİ. Hover katmanı
otomasyonu bozabilir (`.click()` önce hover yapar → katman tıklamayı keser →
hedef flaky olur). İki koruma var ve ikisi de teste bağlı:
1. Mod KAPALIYKEN bileşen sarmalayıcı element bile eklemez.
2. Mod açıkken bile ipucu ve rozet `pointer-events: none` taşır.

---

### ⚠️ AÇIK KALANLAR — sıradaki oturum bunlarla başlasın

1. **Giriş düzeltmesi LOKAL MODDA doğrulanmadı.** Kod yazıldı ve tarayıcı
   modunda çalışıyor, ama hatanın gerçekten yaşandığı yol Docker kapalı olduğu
   için sınanamadı. **İlk iş bu olmalı:** Docker'ı aç → temiz profil →
   `/qa-shop` → QA paneline DOKUNMADAN giriş. Beklenen: `POST /sandbox` 201,
   ardından `POST /auth/login` 200.
2. **`tshirts.webp` eksik** — "Classic Black T-Shirt" için siyah tişört görseli.
   Kullanıcı üretecek. Sonra tek komut: `npm run qa-shop:gorseller`.
   (İsteğe bağlı: `coats.webp` ürün adına uysun diye yeşil olabilir.)
3. **"Site üyesi qa-shop'ta da üye sayılsın"** — kullanıcı istedi, YAPILMADI.
   Yapılırsa qa-shop'un KENDİ auth'u üzerinden köprü kurulmalı (Supabase
   qa-shop'a sızdırılmadan, izolasyon korunarak).
4. **Kusur anahtarlarının DAVRANIŞI tarayıcı modunda ölçülmedi.** Kod paylaşılan
   modülden geliyor ama "anahtarı aç → davranış bozuldu" zinciri yalnızca lokal
   modda sınandı (`skip_reserve` ile).
5. **Şartname modunda kalan 10 story bağlanmadı**
   (US-01/02/03/06/08/09/11/12/13/14). Kalıp kurulu, eklemesi mekanik.
6. **Site navigasyonundan doğrudan `/qa-shop` erişimi** ve `/qa-frontend` →
   canlı hedef linki hâlâ yok.
7. **İmaj yayını** — `qa-shop-v1.0.0` etiketi + GHCR paketlerini Public yapma.
   Dışa dönük adım, kullanıcı kararı.
8. **`/qa-shop-spec` tema/erişilebilirlik testine eklenmedi.**

---

### 📌 Bilinmesi gerekenler

- **API kaynağı imaja gömülü.** `qa-shop/api/src` değişirse
  `docker compose up -d --build api` gerekir; sadece `restart` eski kodu
  çalıştırmaya devam eder.
- Tarayıcı modunu elle denemek için: `localStorage.qaShopApiBase` değerini
  kapalı bir adrese ayarla (ör. `http://127.0.0.1:45999`).
- sql.js WASM (658 KB) ve tohum veri (328 KB) YALNIZCA `/qa-shop` açılınca
  yükleniyor — ana sayfa paketi büyümedi.
- Docker kapalıyken konsolda 1 ağ hatası görünür (sağlık yoklaması kapalı
  adrese gidiyor). Tarayıcının kendi kaydı, JavaScript'ten bastırılamaz.
- **Sütun adları ÖLÇÜLDÜ, varsayılmadı:** `sessions.jti` (token sütunu YOK),
  `users.name`, `orders.placed_at`, `cart_items.added_at`,
  `order_items.name_snapshot`, `product_variants.price_delta` (mutlak fiyat yok
  — ürün fiyatı + delta). İlk yazımda beşi birden yanlış varsayılmıştı.
- Testlerde paralel koşumda ara sıra 1 flake görülüyor (kusur paneli testi);
  seri koşumda ve izole tekrarda temiz. Retry yakalıyor.
- Bu oturumda öğrenilen kalıcı tuzaklar `CLAUDE.md` §23.17-23.20'ye taşındı:
  Tailwind `flex`i katmansız CSS'in yenmesi · testin kendi kurulumunun hatayı
  gizlemesi · React güncelleyicisi içinde ref okumak · `[data-testid$=""]`.

---

### ✅ Son doğrulama durumu

`npm run build` ✔ · `check-content-integrity` ✔ · `check-i18n-leaks` ✔ ·
`check-test-coverage` 49/49 ✔ · `tests/qa-shop-pages.spec.ts` **22/22** (seri) ·
`tests/no-internal-jargon.spec.ts` 9/9 ✔ · `qa-shop/api` **85/85** ✔

---

### 📋 SONRAKİ SOHBET İÇİN PROMPT (kopyala-yapıştır)

```
Önce CLAUDE.md'yi, sonra .claude/NEXT_SESSION.md'yi oku.
En üstteki 2026-08-26 tarihli devir notundan devam ediyoruz.

Durum: QA Shop dört sayfalı bir pratik ortamı (/qa-shop-spec, /qa-shop-setup,
/qa-shop-api, /qa-shop). Docker kurmayan ziyaretçi için tarayıcı modu çalışıyor
(MSW Service Worker + sql.js). Gerçek ürün fotoğrafları bağlandı. Build ve
22 test yeşil. HİÇBİR ŞEY COMMIT EDİLMEDİ — son commit f4ef66b.

Commit/push konusunda bana sormadan bir şey yapma.

İlk iş: Docker Desktop'ı açacağım. Sonra giriş düzeltmesini GERÇEK yolda
doğrula — temiz profille /qa-shop aç, QA paneline HİÇ dokunmadan giriş yap.
Beklenen: POST /sandbox 201, ardından POST /auth/login 200. Bu düzeltme
şimdiye kadar yalnızca tarayıcı modunda sınandı.

İkinci iş: tshirts.webp görselini qa-shop/urunler/ altına koyacağım
("Classic Black T-Shirt" için siyah tişört). Koyduğumda
npm run qa-shop:gorseller çalıştır ve sekiz kategorinin de fotoğrafla
geldiğini doğrula.

Üçüncü iş: ana sayfada üye olan kişi /qa-shop'ta da otomatik üye sayılsın.
Ama qa-shop'un izolasyonunu bozma — Supabase'i qa-shop'a sızdırma, köprüyü
qa-shop'un kendi auth uçları üzerinden kur.
```

---

## 📌 Önceki Durum (2026-08-18 · ikinci oturum — kusur paneli, gizli tur, mağaza)

> ⚠️ Bağlayıcı DEĞİL; en üstteki nota bak.

> Çelişki olursa BU bölüm günceldir.

### ⚠️ ÖNCE BUNU OKU: çalışma ağacı hâlâ KİRLİ, commit ATILMADI

Son commit hâlâ **`f4ef66b`**. Kullanıcı bu oturumda da commit/push istemedi
ve "sormadan bir şey yapma" dedi — commit ATILMADI. Önceki oturumun tüm işi
+ bu oturumun işi çalışma ağacında duruyor.

### ✅ Bu oturumda tamamlananlar

#### 1. `/qa-shop` arayüzü GERÇEK yığına karşı tarayıcıdan koşturuldu (13/13)

Devir notunun 1. maddesi kapandı. Kullanıcının makinesinde ayakta olan yığına
(`qashop-db` healthy, `qashop-api`) karşı gerçek tarayıcıdan sürüldü ve her
adım veritabanından `psql` ile doğrulandı:

| Doğrulanan | Ölçüm |
|---|---|
| Sağlık göstergesi API'yi buluyor | `API: up` |
| "Kendi alanımı aç" veritabanına satır yazıyor | `sandbox` satırı |
| **Sepete ekleme rezervasyon satırı yaratıyor** | `reserved_qty 0 → 1` |
| Rezervasyon satış DEĞİL | `stock_qty 14 → 14` |
| `cart_items` doğru sandbox altında | `qty=1` |
| Arayüz azalan satılabilir adedi geri okuyor | ekran `14 → 13` |
| Sipariş stoğu düşürüp rezervasyonu bırakıyor | `stock 14→13`, `reserved 1→0` |
| Sipariş toplamı mutabakatı | `grand_total = subtotal − discount + shipping` |

Tarayıcının attığı çağrı zinciri beklenen sırayla geldi: `POST /sandbox` →
`login` → `products/:id/variants` → `POST /carts` → `POST /carts/:id/items`
→ `POST /orders`.

Doğrulama script'i bilinçli olarak scratchpad'de kaldı, projeye EKLENMEDİ
(önceki oturumun kararıyla aynı gerekçe: hazır çözüm yayınlamak sayfanın
"testini kendin yaz" amacını bozar).

#### 2. Kusur anahtarları paneli `/qa-shop` arayüzüne eklendi (3. madde)

`QaShopPage.jsx` içine `bolum-kusurlar` bölümü: 10 anahtarın tamamı başlığı,
neyi bozduğu ve hangi kontrolün yakalaması gerektiğiyle listeleniyor; her
satırda aç/kapat düğmesi, üstte açık kusur sayacı ve "Hepsini kapat".

**Kritik tasarım kararı:** yazma yetkisi anahtarın tarayıcıda VAR OLMASINDAN
değil, sunucunun bildirdiği `mode` alanından okunuyor
(`kusurYazilabilir = kusurModu === 'private'`). Süresi dolmuş bir anahtar
`localStorage`'da duruyor olabilir; varlığa bakılsaydı panel açık görünür ve
her tıklamada 401 dönerdi.

Canlı yığına karşı 10/10 doğrulandı — sadece bağlandığı değil, **anahtarın
gerçekten sistemi bozduğu** da ölçüldü: `skip_reserve` açıkken sepete ekleme
`reserved_qty`'yi 0'da bıraktı, kapatınca 1'e çıktı. Bu, devir notunun
4. maddesini (kusur DAVRANIŞI doğrulanmadı) 10 anahtardan biri için kapatır.

Projeye eklenen test (`qa-shop-pages.spec.ts`) yalnızca **KİLİT** davranışını
korur — CI'da yığın yoktur. Test geçersiz bir anahtar kalıntısını bilerek
`localStorage`'a yazar: kilit anahtarın varlığına baksaydı kırmızıya dönerdi.

#### 3. Gizli kusur turu — kusuru AÇMAK değil, BULMAK pratiği

Kullanıcının kararı: "amacımız kusurları benim ve site kullanıcılarının
bulması". Adlı anahtar "testim kırmızıya dönüyor mu?" sorusunu cevaplıyordu;
gizli tur "kusuru bulabiliyor muyum?" sorusunu soruyor.

**Gizleme SUNUCUDA yapıldı, arayüzde değil.** Bu sayfanın kitlesi ağ
sekmesinde yaşayan QA mühendisleri; arayüzde saklanan bir cevap otuz
saniyede bulunur ve mekanizmanın sahte olduğu öğrenilir. Gizli turda
`GET /sandbox/bugs` cevabında `enabled` ve `active` alanları HİÇ yok —
ölçüldü, tarayıcıya gelen hiçbir gövdede geçmiyor.

| Ne | Nerede |
|---|---|
| `POST /sandbox/bugs/hidden` (rastgele N kusur, hangileri söylenmez) | `api/src/routes/sandbox.js` |
| `POST /sandbox/bugs/reveal` (cevabı aç, kendini denetle) | aynı dosya |
| Gizli turda `PATCH` reddi (`HIDDEN_ROUND_ACTIVE`) | aynı dosya |
| `HIDDEN_KEY` / `isHidden` / `pickRandomFlags` / `describeFlagsHidden` | `api/src/core/bugFlags.js` |
| Kumanda paneli + av listesi + cevap ekranı | `QaShopPage.jsx` |

Kaçırılan sızıntı yolları kapatıldı: **denetim kaydına seçilen anahtarlar
yazılmıyor** (kullanıcı kendi günlüğünü okuyabiliyor, oraya yazmak cevabı
arka kapıdan vermek olurdu) ve gizli tur sürerken `PATCH` reddediliyor
(tek tek deneme cevabı ikili aramayla bulmanın yoluydu).

Durum ayrı sütun yerine `bug_flags` jsonb içinde ayrılmış `__hidden`
anahtarında tutuluyor — şema göçü ve veritabanı imajı yeniden derlemesi
gerekmedi. `activeFlags`/`describeFlags` yalnızca bilinen anahtarlar
üzerinde döndüğü için bu işaret onlara görünmüyor; kullanıcı da PATCH ile
yazamıyor (`unknownFlagKeys` reddediyor).

**Bilinen sınır:** kurulum rehberi kullanıcıya DBeaver ile veritabanına
bağlanmayı öğretiyor; isteyen `select bug_flags from sandbox` ile cevabı
görebilir. Kapatılmadı — kasıtlı hile gerektiriyor ve SQL pratiği zaten
platformun bir parçası.

**API kaynağı imaja gömülü olduğu için kullanıcının konteyneri yeniden
derlendi** (`docker compose up -d --build api`). Yığın şu an yeni kodla
ayakta.

Doğrulama: uçlar canlı yığında elle sınandı · tarayıcıdan **11/11** ·
`qa-shop/api` paketi **85/85** (7 yeni çekirdek testi: gizli katalogda
`enabled` alanı olmamalı, seçim tekrarsız ve sabit değil, ayrılmış anahtar
kusur sayılmamalı).

**Sözleşme bekçisi işe yaradı:** iki yeni uç `openapi.yaml`a eklenmeden
`contract.test.mjs` "uygulamada var, sözleşmede YOK" diyerek kırdı.
Sözleşme güncellendi.

#### 4. `/qa-shop` gerçek bir mağazaya dönüştürüldü

Kullanıcının kararı: "ürün anlatımı çok teknik. İlk önce kullanıcı Trendyol
gibi Amazon gibi alışveriş yapacağı ekranı görmeli... UI görüntü gerçeğin
aynısı olmalı."

Sayfa bir kontrol paneliydi; artık vitrin. Akış gerçek dükkân akışı:
**vitrin → ürün → sepet → adres → ödeme → sipariş onayı → siparişlerim**.

| Ne | Nerede |
|---|---|
| Yapışkan mağaza başlığı: logo, arama, hesap, sepet rozeti | `QaShopPage.jsx` |
| Kategori şeridi (yalnızca ürünü OLAN kategoriler) | aynı dosya |
| Ürün kartı: görsel, marka, yıldız puanı, fiyat, Sepete Ekle | `QaShopStore.jsx` (yeni) |
| Ürün detayı: büyük görsel, beden seçimi, stok, açıklama, yorumlar | `QaShopPage.jsx` |
| Sepet: adet artır/azalt, kupon, tutar özeti | aynı dosya |
| Ödeme: adres seçimi + üç ödeme yöntemi (card/transfer/cod) + kart alanları | aynı dosya |
| Sipariş onayı: sipariş no, durum rozeti | aynı dosya |
| Teknik panel (bağlantı, kusurlar, olay günlüğü) | `<details>` içinde, KAPALI |

**Ürün görselleri dış dosya DEĞİL** — her biri üründen türetilen inline SVG
(kategori siluetleri + addaki renk kelimesinden gerçek renk). Projede dışa
bağımlı görsel kullanılmaz ve üretilen görsel her makinede aynı çıkar.

⚠ **Siluet ADDAN seçilir, kategoriden değil.** Seed verisinde ad ile kategori
her zaman örtüşmüyor: "Slim Fit Red Shirt" adlı ürünün kategorisi `boots`.
Kategoriye güvenilince vitrinde gömlek yazan kartta BOT resmi çıkıyordu —
ekran ilk bakışta yanlış görünüyordu. Kullanıcının okuduğu şey ADDIR.

**Tarayıcı koşumu iki gerçek hata yakaladı:**
1. Onay ekranı `placed` gösteriyordu ama veritabanı `paid` diyordu — arayüz
   sipariş OLUŞTURMA cevabındaki durumu gösteriyor, ÖDEME cevabındakini
   değil. Kullanıcı ödemesinin geçmediğini sanırdı.
2. Adres formunda `full_name` ve `phone` alanları vardı; API adres modelinde
   bu alanlar YOK (`label/line1/city/country/postal_code`). Kullanıcı doldurur,
   veri hiçbir yere yazılmazdı. Form gerçek modele oturtuldu.

Vitrin görünümüne `<h1>` eklendi: hem erişilebilirlik için hem de test
yardımcısı sayfa hazırlığını `h1` ile doğruluyor.

**Korunan `data-testid`'ler:** şartname sayfası kullanıcıya "her etkileşimli
öğe kararlı bir data-testid taşır" sözü veriyor. Kavramı süren isimler aynen
korundu (`sepete-ekle-{variantId}`, `sepet-satirlari`, `siparis-tamamla`,
`toplam-genel`, `giris-yap`, `kusur-*`, `gizli-tur-*`, `api-adresi` …), yenileri
eklendi (`urun-detay-*`, `beden-*`, `adet-artir-*`, `odeme-yontemi-*`,
`sepet-sayaci`, `kategori-*`, `siparis-onay`).

Depo testi güncellendi: teknik panel artık kapalı geldiği için testler onu
`qa-paneli-ac` ile açıyor.

Doğrulama: tarayıcıdan uçtan uca **19/19** (vitrin → ödeme → onay, her adım
veritabanından `psql` ile) · `qa-shop-pages.spec.ts` **10/10** ·
`qa-shop/api` **85/85**.

**Açık kalan (küçük):** seed verisinde aynı ad birden çok üründe tekrar
ediyor (üç tane "Slim Fit Red Shirt", farklı fiyatlarla). Gerçek bir vitrinde
tuhaf duruyor ama seed veriyi değiştirmek 79 kabul kriterinin sayılarını
kaydırır — bilerek dokunulmadı.

### ⚠️ BULUNAN GERÇEK ARIZA — kullanıcı kararı gerekiyor, DOKUNULMADI

`supabase/functions/_shared/groq.ts:9` → `DEFAULT_MODEL = 'llama-3.3-70b-versatile'`

Groq bu modeli kaldırmış; canlı çağrı **HTTP 404 `model_not_found`** dönüyor.
Etkilenen: `/qa-assistant` ve mülakat AI değerlendirmesi — yani üründe
GERÇEKTEN kırık, sadece test sorunu değil.

Tam paketteki 2 düşen test bunlar (`api-endpoints.spec.ts` qa-assistant ·
`docker-interview-mastery-flow.spec.ts`). İkisi de CLAUDE.md §23.8 gereği
CI'da SKIP edildiğinden **CI yeşil kalır ve bu arıza CI'da hiç görünmez.**

Düzeltilmedi çünkü (a) istenen işin kapsamı dışında, (b) yeni model seçimi
kullanıcının kararı, (c) düzeltme Edge Function yeniden deploy'u gerektirir
(dışa dönük adım). Yapılacak iş: güncel bir Groq modeli seç, bu satırı
güncelle, fonksiyonu yeniden deploy et.

### ✅ Doğrulananlar

| Kontrol | Sonuç |
|---|---|
| `npm run build` | ✔ 50 route, öksüz sayfa yok |
| `check-content-integrity` | ✔ 45 dosya, sıfır ihlal |
| `check-i18n-leaks` | ✔ regresyon yok (borç 0) |
| `check-test-coverage` | ✔ 48/48 route |
| `tests/no-internal-jargon.spec.ts` | ✔ 9/9 |
| `tests/qa-shop-pages.spec.ts` | ✔ 10/10 (yeni kilit testiyle) |
| **Tam paket** | **395 geçti · 2 düştü (yukarıdaki Groq arızası) · 2 koşmadı** |
| Canlı yığın — uçtan uca akış | ✔ 13/13 |
| Canlı yığın — kusur paneli | ✔ 10/10 |
| EN panelde Türkçe karakter | ✔ yok |
| Pasif düğme görünürlüğü | ✔ `disabled` gerçek, opaklık 0.5, `cursor-not-allowed` |

### 🎯 Sıradaki iş (öncelik sırasıyla)

1. **Groq modeli arızası** (yukarıda) — üründe kırık, CI görmüyor.
2. **İmaj yayını** — `qa-shop-v1.0.0` etiketi + GitHub Packages görünürlüğünü
   Public yapma. Kullanıcı kararı, dışa dönük adım.
3. **Kalan 9 kusur anahtarının DAVRANIŞI** tek tek doğrulanmadı —
   kullanıcının kararıyla BİLEREK bırakıldı: kusurları bulmak
   kullanıcıların ve site ziyaretçilerinin işi. Bu madde artık bir
   eksik değil, tasarım tercihi.
4. **`/qa-shop-spec` tema/erişilebilirlik testine eklenmedi** —
   `theme-and-accessibility.spec.ts` kapsamına alınabilir.
5. `/work-goals` takipçisi — plan hazır, kod yok.

### 📌 Bilinmesi gerekenler (önceki notlardan devam)

- **API kaynağı imaja gömülü.** `qa-shop/api/src` değişirse
  `docker compose up -d --build api` gerekir.
- Kullanıcının yığını bu makinede AYAKTA (port 5433/4000). Bu oturumda ona
  karşı koşuldu; veri sandbox'lar içinde izole kaldı, şablon bozulmadı.
- Tam paket ~25 dakika sürüyor; 600 sn'lik tek komut penceresine sığmaz,
  arka planda koştur.
- Bu ortamda `git push` ve ağ erişimi yalnızca sandbox kapalıyken çalışıyor.

### 📋 SONRAKİ SOHBET İÇİN PROMPT (kopyala-yapıştır)

```
Önce CLAUDE.md'yi, sonra .claude/NEXT_SESSION.md'yi oku.
En üstteki 2026-08-18 ikinci oturum devir notundan devam ediyoruz.

Durum: QA Shop üç sayfası tamamlandı; arayüz gerçek yığına karşı
tarayıcıdan doğrulandı (13/13) ve kusur anahtarları paneli eklendi
(10/10). HİÇBİR ŞEY COMMIT EDİLMEDİ — son commit f4ef66b.

Commit/push konusunda bana sormadan bir şey yapma.
```

---

## 📌 Önceki Durum (2026-08-18 · birinci oturum, Opus — QA Shop açılışı)

> ⚠️ Bu bölüm artık bağlayıcı DEĞİLDİR; en üstteki nota bak. "Sıradaki iş"
> listesinin 1. ve 3. maddesi tamamlandı, kalanlar üstteki listeye taşındı.

> Çelişki olursa BU bölüm günceldir. Alttaki "Önceki Durum" bölümleri tarih
> sırasıyla korunuyor ama artık bağlayıcı değil.

### ⚠️ ÖNCE BUNU OKU: çalışma ağacı KİRLİ, commit ATILMADI

Son commit **`f4ef66b`** (2026-08-17, önceki oturum). Ondan sonraki TÜM iş
çalışma ağacında duruyor — kullanıcı commit/push istemedi ve **sormadan
commit atılmayacak.** Durum:

```
 M .claude/NEXT_SESSION.md · CLAUDE.md
 M scripts/check-test-coverage.mjs · scripts/generate-static-routes.mjs
 M src/App.jsx · src/components/HomePage.jsx · src/utils/seo.js
 M src/data/qaShopSetupData.js · src/data/whatIsTestingData.js
 M qa-shop/README.md · qa-shop/api/Dockerfile · qa-shop/docker-compose.yml
 M public/sitemap-*.xml · src/data/generated/pageUpdated.js   (build türevi)
?? .github/workflows/qa-shop-images.yml
?? qa-shop/db/Dockerfile · qa-shop/docker-compose.hub.yml
?? src/components/QaShopSpecPage.jsx · src/data/qaShopSpecData.js
?? tests/qa-shop-pages.spec.ts
```

### 📍 Şu anki durum: QA Shop pratik ortamı HERKESE AÇIK ve ilan edildi

CI yeşil (`f4ef66b` #148: test → build → deploy üçü de success). Dört push'un
dördü de geçmişti; düzeltilecek bir şey çıkmadı.

Bu oturumda üç iş yapıldı: **(1)** repo indirmeden kurulum (GHCR, çoklu
mimari), **(2)** şartname sayfası + üç sayfanın herkese açılması, **(3)** ana
sayfada ilan + SEO + büyük resim anlatımı.

#### 1. Repo istemeyen kurulum — HAZIR, HENÜZ YAYINLANMADI

Karar: **iki imaj + compose dosyası** (tek "şişman" imaj DEĞİL). Gerekçe:
şişman imaj supervisor ister, logları karıştırır, sağlık sinyalini
bulanıklaştırır; tek avantajı olan "tek komut, sıfır dosya" üç `docker run`
komutuyla zaten karşılanıyor.

| Dosya | Ne |
|---|---|
| `qa-shop/db/Dockerfile` | Şema+tohum GÖMÜLÜ Postgres 16; `validation-queries.sql` de `/opt/qa-shop/` altında |
| `qa-shop/docker-compose.hub.yml` | GHCR imajları, `build:` ve bind mount YOK, `QA_SHOP_TAG` ile sürüm sabitleme |
| `.github/workflows/qa-shop-images.yml` | `qa-shop-v*` ETİKETİNE bağlı; buildx amd64+arm64, GHCR'a push, manifest ve canlı sağlık doğrulaması |
| `qa-shop/api/Dockerfile` | HEALTHCHECK (node fetch) + OCI etiketleri |

Yerelde gerçekten koşturuldu: iki imaj da amd64+arm64 derlendi, **arm64 imajı
çalıştırıldı** (`aarch64`, 13.9 s'de tohumlandı, 18 tablo, healthcheck
`healthy`), hub compose ile yığın ayağa kalktı, uçtan uca akış geçti,
`validation-queries.sql` imajın içinden koştu (17 kontrol + 4 kusur
enjeksiyonu).

**Yan bulgu — gerçek yarış koşulu düzeltildi:** `docker-compose.yml`in
healthcheck'i `pg_isready`yi socket üstünden çağırıyordu. Ölçüldü: socket
**4.7 s**'de yeşile dönüyor, tohumlama **8.3 s**'de bitiyor — API ~3.5 saniye
boyunca yarı dolu bir veritabanına bağlanabiliyordu. `-h 127.0.0.1` eklendi.

**AÇIK:** hiçbir imaj yayınlanmadı. Yayın için `qa-shop-v1.0.0` gibi bir etiket
push edilmeli (dışa dönük adım, kullanıcı karar verecek). Yayından sonra ELLE:
GitHub → Packages → her paket → *Change visibility* → **Public**, yoksa
"repo indirmeden kurulum" vaadi `docker login` istediği için yarım kalır.

#### 2. `/qa-shop-spec` yazıldı, üç sayfa herkese açıldı

Yeni sayfa: `src/data/qaShopSpecData.js` + `src/components/QaShopSpecPage.jsx`.
`TopicPage` KULLANMAZ (referans belge). İçerik: büyük resim → veri modeli
(SVG) → sipariş durum makinesi (SVG) → 7 iş kuralı kartı → 21 satırlık hata
kataloğu → **16 user story** (5 başlangıç / 7 orta / 4 ileri) → 6 soruluk SSS.
Zorluk ve katman filtreleri çalışıyor.

Üç sayfa da herkese açıldı ve **altı adımın hepsi** yapıldı (route koruması,
noindex, kapsam istisnası, nav linkleri, görünür site haritası, statik kabuk).
Bu altı maddelik liste artık `CLAUDE.md` §11'de kalıcı kural.

**İçerik ÖLÇÜMLE yazıldı.** Hiçbir HTTP/hata/kupon kodu sözleşmeden tahmin
edilmedi; canlı yığına istek atılıp davranış ölçüldü. Ölçüm üç yanlış
varsayımı yakaladı: (a) kupon kodları uydurulmuştu, gerçek 12 kod
veritabanından okundu; (b) ürün listesi 100'de tavanlanıyor, `includeInactive`
farkı `total` alanından ölçülür; (c) "ilk adres otomatik varsayılan" ancak
tohum adresi OLMAYAN kullanıcıda ölçülebilir.

**Doğrulama: 79/79 kabul kriteri canlı yığında geçti.** Doğrulama script'i
bilinçli olarak scratchpad'de kaldı, projeye EKLENMEDİ — sayfa kullanıcıdan
test case'i kendisinin yazmasını istiyor, hazır çözüm yayınlamak o amacı bozar.

#### 3. İlan + SEO + büyük resim

**En kritik bulgu — sessiz SEO açığı:** üç QA Shop sayfası `TopicPage`
kullanmadığı için otomatik kabuk üretimine hiç girmiyordu ve `return null`a
düşüyordu. Arama motoru `/qa-shop-spec`te **1278 karakter** görüyordu, neredeyse
tamamı navigasyon linkiydi. Hiçbir kapı bunu kırmıyordu. Kalıcı ders
`CLAUDE.md` §23.16'ya taşındı.

Kabuk içerikleri artık **veri dosyalarından TÜRETİLİYOR** (`qaShopSpecShell` /
`qaShopSetupShell`), elle kopyalanmıyor. Sonuç: 1278 → **5803 karakter** (TR),
5938 (EN).

| Ne | Nerede |
|---|---|
| Ana sayfa afişi (üst şerit, yeşil, 4 rakam çipi) | `HomePage.jsx` `data-testid="qa-shop-banner"` → `/qa-shop-spec` |
| Büyük resim (detaylardan ÖNCE) | `qaShopSpecData.js` → `meta.bigPicture` |
| Animasyonlu UI→API→DB akışı (saf CSS, `prefers-reduced-motion` saygılı) | `QaShopSpecPage.jsx` → `LayerFlow` |
| Sabit cevaplı deneme API'leriyle 6 satırlık karşılaştırma | `bigPicture.comparison` |
| Beş dakikada ilk istek (4 adım, kopyalanabilir komut) | `bigPicture.quickStart` |
| 6 soruluk SSS — sayfada GÖRÜNÜR + FAQPage şeması | `qaShopSpecData.faq` |

Metadata hedefleri: `/qa-shop-spec` → "ücretsiz API ve database test ortamı" ·
`/qa-shop-setup` → "Docker ile yerel API test ortamı kurulumu" · `/qa-shop` →
"Selenium ve Playwright pratik sitesi". Altı başlık da ≤55 karakter.
**FAQPage 26 → 28 sayfa.**

### ✅ Doğrulananlar

| Kontrol | Sonuç |
|---|---|
| `npm run build` | ✔ 50 route, öksüz sayfa yok, noindex kabuk 12→8 |
| `check-content-integrity` · `check-i18n-leaks` | ✔ sıfır ihlal / sıfır sızıntı |
| `tests/qa-shop-pages.spec.ts` | ✔ 9/9 |
| Etkilenen 8 paketle birlikte | ✔ **90/90, 0 flaky** |
| 16 user story kabul kriteri (canlı yığın) | ✔ **79/79** |
| Kabuk görünür metni (TR/EN, üç route) | ✔ 5803 / 5938 / 2457 / 2574 / 2576 / 2663 |
| FAQPage şeması iki dilde | ✔ 6 soru, hepsi sayfada da görünür |
| Koyu + açık tema | ✔ gözle doğrulandı (açık: `rgb(248,250,252)`) |

### 🎯 Sıradaki iş (öncelik sırasıyla)

1. **`/qa-shop` arayüzü GERÇEK yığına karşı tarayıcıdan hiç koşturulmadı.**
   Servis ve veri katmanı 79 kriterle kanıtlı ama "sepete ekle → veritabanında
   rezervasyon satırı" zinciri tarayıcıdan geçirilmedi. Kullanıcıya soruldu,
   cevap beklendi.
2. **İmaj yayını** — `qa-shop-v1.0.0` etiketi + paket görünürlüğünü Public
   yapma (yukarıda). Kullanıcı kararı.
3. **Bug anahtarlarının arayüzden açılması** — mekanizma ve uçlar hazır,
   `/qa-shop` arayüzünde açma/kapama paneli yok. Şartname her story'de bir
   anahtar adı veriyor; panel gelince ikisi birleşir.
4. **Kusur anahtarlarının DAVRANIŞI story bazında doğrulanmadı.** 10/10
   anahtarın sistemde VAR olduğu doğrulandı ama "bu anahtarı açınca şu
   story'nin testi kırmızıya döner" iddiası tek tek sınanmadı.
5. **`/qa-shop-spec` tema/erişilebilirlik testine eklenmedi** —
   `theme-and-accessibility.spec.ts` kapsamına alınabilir.
6. `/work-goals` takipçisi — plan hazır, kod yok.

### 📌 Bilinmesi gerekenler

- **API kaynağı imaja gömülü.** `qa-shop/api/src` değişirse
  `docker compose up -d --build api` gerekir; sadece `restart` eski kodu
  çalıştırmaya devam eder.
- Kullanıcının yığını bu makinede AYAKTA olabilir (`qashop-db`, `qashop-api`,
  port 5433/4000). Test için kendi kopyanı ayrı port ve proje adıyla kur,
  onunkine dokunma.
- `qa-shop/api/node_modules` ve `rest-assured/target` gitignore'da.
- Kullanıcının iki makinesi var: Windows (`d:\ANTIGRAVITY\automationexercise`)
  ve MacBook Air (`~/automationexercise`). İkisinde de Docker kurulu.
- Bu ortamda `git push` ve ağ erişimi **yalnızca sandbox kapalıyken** çalışıyor.
- Testleri kullanıcı ve son kullanıcılar yazacak — şartname sayfası bilerek
  hazır test case vermiyor, yalnızca kabul kriteri veriyor.

### 📋 SONRAKİ SOHBET İÇİN PROMPT (kopyala-yapıştır)

```
Önce CLAUDE.md'yi, sonra .claude/NEXT_SESSION.md'yi oku.
En üstteki 2026-08-18 tarihli devir notundan devam ediyoruz.

Durum: QA Shop pratik ortamı (üç sayfa: /qa-shop-spec, /qa-shop-setup,
/qa-shop) tamamlandı, herkese açıldı, SEO kabukları ve ana sayfa afişi
eklendi. Build + 90 test yeşil. AMA HİÇBİR ŞEY COMMIT EDİLMEDİ — son
commit f4ef66b, geri kalan her şey çalışma ağacında duruyor.

Commit/push konusunda bana sormadan bir şey yapma.

İlk iş: devir notundaki "Sıradaki iş" listesinin 1. maddesi —
/qa-shop arayüzünü benim makinemde çalışan GERÇEK yığına karşı
tarayıcıdan koştur ve UI → API → veritabanı zincirini uçtan uca
doğrula (sepete eklenen ürün veritabanında rezervasyon satırı
yaratıyor mu). Yığın ayakta değilse önce `cd qa-shop && docker
compose up -d` ile kaldır.

Sonra 3. madde: /qa-shop arayüzüne bug anahtarlarını açıp kapatan
paneli ekle — uçlar (GET/PATCH /sandbox/bugs) ve 10 anahtar hazır,
şartname sayfası her story'de hangi anahtarın o kuralı kırdığını
zaten söylüyor.
```

---

## 📌 Önceki Durum (2026-08-16 · ikinci oturum, Opus — QA Shop ilk yazım)

> ⚠️ **BU BÖLÜM TARİHÎDİR — bağlayıcı değildir.** Buradaki "Docker kurulu
değil" ve "DOĞRULANAMAYAN" uyarılarının HEPSİ çözüldü: Docker kuruldu,
yığın iki makinede koşturuldu, dört paket de yeşil. Güncel durum için en
üstteki 2026-08-18 devir notuna bak.

> ⚠️ Aşağıdaki "çalışma ağacı kirli / commit atılmadı" uyarısı ARTIK
> GEÇERSİZDİR — her şey commit edilip push edildi (yukarıdaki nota bak).

### ⚠️ Çalışma ağacı hâlâ KİRLİ, branch yok, commit atılmadı

Kullanıcı commit/branch istemedi. Bir önceki devir notundaki 21 yolun üstüne
bu oturumda eklenenler:

```
 M .claude/NEXT_SESSION.md · scripts/check-test-coverage.mjs · src/App.jsx
 M src/utils/seo.js · src/data/qaShopSetupData.js
 M src/components/QaShopSetupPage.jsx        (clickpath bloğu + yol haritası)
?? src/components/QaShopPage.jsx             ← YENİ arayüz
   qa-shop/ altında: api/core/bugFlags.js · api/routes/{addresses,reviews}.js
   api/test/ (4 dosya) · postman/ (3 dosya) · rest-assured/ (Maven projesi)
```

### 📍 Bu oturumda ne yapıldı

**Kullanıcının isteği:** kurulumları kendisi yapacak, kod tarafındaki her şey
(UI dahil) bitsin, "practice altyapısı tamamen hazır olsun".

1. **`/qa-shop-setup` rehberi sıfırdan kuruluma göre yeniden yazıldı** — 3 →
   4 adım. Docker kurulumu adımı EKLENDİ (önceki sürüm Docker'ı kurulu
   varsayıyordu). Windows öncelikli komutlar; PowerShell'de `curl`ün gerçek
   cURL olmadığı uyarısı; DBeaver'ın `\set` ve `:'sandbox'` psql sözdizimini
   anlamadığı ve nasıl aşılacağı.
2. **Bug anahtarları** (`api/src/core/bugFlags.js`, 10 kusur) + `GET/PATCH
   /sandbox/bugs`. Kusurlar cart/orders/auth/reviews route'larına bağlandı.
3. **14 yeni uç**: adresler (4), yorumlar (4), sipariş yaşam döngüsü
   pay/ship/deliver/return (4), kusur anahtarları (2). Şemaya
   `shipments.delivered_at` eklendi (iade penceresi için).
4. **`openapi.yaml` 27 → 44 operasyon**, 19 → 25 şema.
5. **`api/test/` — 81 test, Docker GEREKTİRMEZ.** Saf kurallar + uygulama
   iskeleti + **sözleşme ↔ uygulama iki yönlü kilit** + Postman koleksiyon
   kalitesi. `cd qa-shop/api && npm test`.
6. **Postman/Newman paketi** (`postman/`, 6 klasör / 26 istek, hepsi
   doğrulamalı) ve **REST Assured projesi** (`rest-assured/`, Maven,
   `mvn test-compile` yeşil).
7. **`/qa-shop` arayüzü** — dükkân ekranı, 63 kararlı `data-testid`, olay
   günlüğü (her UI hareketi → hangi API çağrısı). `RequireAdmin` + `noindex`,
   `check-test-coverage.mjs`'e gerekçeli istisna eklendi.

### ✅ Doğrulananlar

| Kontrol | Sonuç |
|---|---|
| `npm run build` | ✔ 49 route, öksüz sayfa yok, noindex shell 12 |
| `check-content-integrity` · `check-i18n-leaks` | ✔ sıfır ihlal / sıfır sızıntı |
| `qa-shop/api` → `npm test` | ✔ 81/81 |
| `rest-assured` → `mvn test-compile` | ✔ exit 0 |
| API veritabanısız ayağa kalkıyor | ✔ `/health` 503 degraded, route'lar monte |
| `/qa-shop-setup` tarayıcı render | ✔ 4 adım, 42 tıklama maddesi, 0 konsol hatası |
| `/qa-shop` tarayıcı render | ✔ API kapalıyken yönlendirme; sözleşme-şekilli sahte API ile tam akış (ürün → sandbox → giriş → sepet → sipariş), 0 konsol hatası |

### ❌ HÂLÂ DOĞRULANAMAYAN — yeni oturumun ilk işi

> ✅ Bu bölümdeki her madde 2026-08-17'de KAPANDI; yeni oturumun işi DEĞİL.

**Docker bu makinede kurulu değil** (Docker Desktop kaldırılmış; WSL Ubuntu
diski de bağlanamıyor: `E_ACCESSDENIED`). Yani:

- `schema.sql` + `seed.sql` **gerçek PostgreSQL'de hiç çalıştırılmadı**
- Hiçbir uç **canlı veritabanına karşı** koşmadı (81 test DB'siz yüzeyi
  denetliyor, iş mantığını canlı veriyle DEĞİL)
- `validation-queries.sql` çalıştırılmadı
- Postman/Newman ve REST Assured paketleri **koşturulmadı** (ikisi de yığın
  kapalıyken anlaşılır mesajla duruyor — bu doğrulandı)

Kullanıcı Docker'ı kendisi kuracak. Kurulunca sıra:

```bash
cd qa-shop && docker compose up -d
curl.exe http://localhost:4000/health
cd api && npm test
cd ../rest-assured && mvn test
newman run ../postman/qa-shop.postman_collection.json -e ../postman/qa-shop.postman_environment.json
```

Hata çıkarsa en olası yer `seed.sql` (`clone_sandbox`, sipariş toplamlarının
satırlardan hesaplanması).

### 🎯 Sıradaki iş

1. Yığını ayağa kaldır, dört paketi de koştur, çıkan hataları düzelt
2. `/qa-shop` ve `/qa-shop-setup` herkese açılacak mı? Açılırsa: `RequireAdmin`
   + `noindex` + kapsam istisnası birlikte kaldırılmalı ve gerçek E2E testi
   yazılmalı (sayfa localhost API'ye bağlı olduğu için CI'da yığını ayağa
   kaldıran bir kurulum gerekir)
3. Tarayıcı içi katman (kurulumsuz pratik) ve barındırılan sürüm — hâlâ yok
4. `/work-goals` takipçisi — plan hazır, kod yok

---

## 📌 Önceki Durum (2026-08-16, Opus — QA Shop pratik ortamı + erişim katmanları)

> ⚠️ **BU BÖLÜM TARİHÎDİR — bağlayıcı değildir.** Tasarım kararları hâlâ
geçerli (yeniden tartışmaya gerek yok) ama durum bilgisi eskidir. Güncel
durum için en üstteki 2026-08-18 devir notuna bak.

> Çelişki olursa bu bölüm günceldir. Alttaki bölümler korunuyor.

### ⚠️ ÖNCE BUNU OKU: çalışma ağacı KİRLİ, branch yok

**Her şey `main` üzerinde ve COMMIT EDİLMEMİŞ.** Son commit `cf0d45e`
(önceki oturumdan). Kullanıcı commit/push istemedi; oturum bittiğinde
çalışma ağacında 15 değişmiş + 6 yeni yol duruyordu:

```
 M public/sitemap-{en,tr}-{hubs,sections}.xml   (build çıktısı)
 M scripts/check-test-coverage.mjs
 M src/App.jsx
 M src/components/HomePage.jsx
 M src/components/SecurityLegoVisual.jsx        ← gerçek bug düzeltmesi
 M src/data/generated/sectionSlugs.js           (üretilmiş)
 M src/data/whatIsTestingData.js
 M src/utils/seo.js
 M tests/{i18n-content-toggle,mobile-smoke,no-internal-jargon,topic-pages-ui}.spec.ts
?? Documents/{access-tiers,qa-shop-practice-platform,work-goals-tracker}-plan.md
?? qa-shop/                                     ← 25 dosya, yeni pratik yığını
?? src/components/QaShopSetupPage.jsx
?? src/data/qaShopSetupData.js
```

Yeni oturumun ilk kararı: bunlar commit edilecek mi, branch'e mi alınacak.
Kullanıcıya sor, kendiliğinden commit atma.

### 📍 Bu oturumda ne yapıldı (4 iş)

Kullanıcının çıkış noktası: **işyeri performans hedeflerini (2026, 4 KSF)
bu platformda ölçülebilir kılmak ve yöneticilerine "her tür testi
yapabildiğini" ayrı bir projeyle gösterebilmek.** Oradan üç plan ve bir
çalışan yığın çıktı.

#### 1. Üç plan dosyası yazıldı (`Documents/`)

| Dosya | Ne içerir | Durum |
|---|---|---|
| `work-goals-tracker-plan.md` | İşyeri KPI takipçisi (`/work-goals`): 4 KSF'nin 9 alt metriğe bölünmesi, formüller, veri modeli, skor motoru, tempo şeridi, aylık rapor | 📝 Plan, **kod YAZILMADI** |
| `qa-shop-practice-platform-plan.md` | QA Shop pratik ortamı: 3 katmanlı mimari, 18 tablo, 43 endpoint, bug anahtarları, faz planı | 📝 Plan, **ilk dilim YAZILDI** (aşağıda) |
| `access-tiers-plan.md` | Erişim katmanları: 4 soruluk karar ölçütü, 🟢 açık / 🟡 üye / 🔴 admin, yeni admin sayfası eklerken 5 adım | 📝 Plan, **uygulanan kararlar §9.5'te işaretli** |

#### 2. `/security` HERKESE AÇILDI (kullanıcı kararı)

- `App.jsx`: `RequireAdmin` kaldırıldı; `SECTION_PAGE_ELEMENTS`'e eklendi
  (bölüm slug'ları üretilince build bunu zorunlu kıldı)
- `seo.js`: `noindex` silindi
- `whatIsTestingData.js`: görünür site haritasına **yeni "🔐 Güvenlik Testi"
  kategorisi** eklendi (Database Testi ile Mobil Test arasına)
- `check-test-coverage.mjs`: `/security` istisnası KALDIRILDI
- Testlere eklendi: `topic-pages-ui` (TOPIC_ROUTES) + `i18n-content-toggle`
  (SAMPLE_ROUTES_FOR_EN_AUDIT); `mobile-smoke` ve `no-internal-jargon`
  yorumlarındaki eskiyen istisna listesi düzeltildi
- `npm run seo:section-slugs` çalıştırıldı → 33 sayfa / 445 bölüm (12 yeni)

**Doğrulandı:** sitemap'te var, kabukta gerçek içerik basılıyor, `noindex`
yok, iki Playwright testi yeşil, anonim tarayıcıda kilit ekranı çıkmıyor.

#### 3. ⚠️ AÇILIŞ GERÇEK BİR BUG ORTAYA ÇIKARDI (kalıcı ders)

`/security` **8. sekmesinde ("Business Logic Flaws") sayfa TAMAMEN
BOŞALIYORDU.** Ekran kapkaranlık, React error #310.

Kök neden: `SecurityLegoVisual.jsx`, `useState`'i `if (variant === 'logic')`
bloğunun **içinde** çağırıyordu. Bileşen tek bir fonksiyon ve `variant`
propuna göre farklı dal döndürüyor; sekme değişince hook sayısı değişiyor ve
React ağacı düşürüyordu. Hook bileşenin en üstüne alındı.

> **Ders (CLAUDE.md'ye taşınmaya aday):** admin kapısı bir sayfayı KORUMAZ,
> yalnızca GİZLER. Test kapsamı dışına alınan her sayfa, kimsenin görmediği
> bir kusuru sessizce taşır ve bu borç sayfayı açtığın gün ödenir. Bu bug
> aylardır oradaydı; sayfa hiçbir suite'te geçmediği için görülmedi.

#### 4. QA Shop pratik yığını — İLK DİLİM YAZILDI (`qa-shop/`, 25 dosya)

Kullanıcının onayladığı tavsiyeler: **Node/Express** (iş mantığı tek çekirdek
olsun, tarayıcı içi katmanla ikiye bölünmesin), **lokal Docker önce**
(barındırılan katman ertelendi — maliyet + kötüye kullanım), **tek e-ticaret
domaini**, **kayıtsız sandbox**, **içerikli tek SEO sayfası**.

```
qa-shop/
├── db/schema.sql              18 tablo + clone_sandbox/reset_sandbox/purge fonksiyonları
├── db/seed.sql                belirlenimci tohum (random() YOK): 120 ürün, 360 varyant,
│                              41 kullanıcı, 150 sipariş, ~300 satır, 200 yorum,
│                              12 kupon (5'i FARKLI nedenle geçersiz), 300 log
├── db/validation-queries.sql  25+ SQL testi (0 satır = GEÇTİ) + tek ekranda özet
│                              + "F. Kusur enjeksiyonu" (kontrolü kırmızıya düşürüp ROLLBACK)
├── api/openapi.yaml           OpenAPI 3.0.3 — 27 path / 29 operasyon / 19 şema
├── api/src/                   Express, 2 bağımlılık (express+pg)
│   ├── core/                  SAF iş kuralları (pricing, rules) — MSW ile paylaşılacak
│   ├── lib/                   token (JWT, kütüphanesiz), password (scrypt), errors, audit
│   ├── middleware/            sandbox çözümleme, auth
│   └── routes/                sandbox 4 · auth 5 · katalog 7 · sepet 6 · sipariş 5
├── docker-compose.yml         postgres:16 (host portu 5433!) + api (4000)
└── README.md                  kurulum, DBeaver, curl akışı, endpoint tablosu
```

**Tasarım kararları (yeniden tartışmaya gerek yok):**
- Anahtarsız istek reddedilmez → demo verisine **salt okunur** bağlanır
- `logout` GERÇEKTEN iptal eder (`sessions.revoked_at`) — stateless JWT'de
  test yanlış yere yeşil geçerdi
- Kupon **checkout anında yeniden doğrulanır**
- Sepete ekleme stok REZERVE eder (`FOR UPDATE` kilidiyle)
- Klonlama doğal anahtarlarla yapılır (sku/email/order_no) — bigserial id'ler kopyada değişir
- Şema/tohum **tek kaynak**; ileride sql.js ve barındırılan katman buradan türeyecek

#### 5. `/qa-shop-setup` sayfası eklendi (🔴 ADMIN, şimdilik)

Kullanıcının istediği üç adım: **(1)** DBeaver ile pratik veritabanına
bağlanma, **(2)** Swagger/OpenAPI sözleşmesini okuma, **(3)** uçları önce
manuel sonra Postman+Newman ile test etme. Dördüncü adım (arayüz pratiği)
**herkese açık olacak**, arayüz yazılınca.

- `src/data/qaShopSetupData.js` + `src/components/QaShopSetupPage.jsx`
- **TopicPage KULLANILMADI** — bu bir yordam rehberi, ders sayfası değil;
  TopicPage her sekmede video+animasyon+sandbox yükümlülüğü doğururdu
- ⚠️ **Oturum içinde YENİDEN ADLANDIRILDI:** `/practice-lab` →
  `/qa-shop-setup`. Sebep: ana sayfada ZATEN "PRACTICE LAB" başlıklı bir
  bölüm var (sayfa içi element/locator oyun alanı) ve kullanıcı ikisini
  ayırt edemedi. Eski adın hiçbir izi kalmadı.
- **3 giriş noktası, hepsi `isAdmin`:** üstteki DEVOPS kartı
  (`nav-qa-shop-setup-card`), PRACTICE LAB başlık çubuğu
  (`nav-qa-shop-setup`), footer → DevOps & Cloud

> İlk denemede kullanıcı butonu **bulamadı**: yalnızca mor başlık çubuğunun
> en sağına, 11px yazıyla konmuştu. Çözüm, admin linklerinin ZATEN durduğu
> yere (`/backend` "Basit Backend"in yanına) koymak oldu. Yeni admin linki
> eklerken bunu tekrarla.

#### 6. Yan düzeltme: `/security` linkleri de `isAdmin`'e bağlıydı

Route açıldı ama `HomePage.jsx`'te İKİ yerde link hâlâ `isAdmin` koşulundaydı
— yani sayfa açıktı, adresini bilmeyen ulaşamıyordu. İkisi de kaldırıldı.
**Ders: bir sayfayı açmak = route + noindex + sitemap + görünür site haritası
+ NAV LİNKLERİ + test kapsamı. Beşi eksik kalırsa açılış yarım kalır.**

Ayrıca PRACTICE LAB başlık satırına `flex-wrap` eklendi: dış kapsayıcı
`overflow-hidden` taşıdığı için sarma olmadan sağdaki buton dar ekranda
sessizce kırpılabilirdi.

### ✅ Doğrulananlar

| Kontrol | Sonuç |
|---|---|
| `npm run build` | ✔ 49 route, kapsam 45/45 (%100) + 3 gerekçeli istisna, öksüz sayfa yok |
| `/security` Playwright (topic-pages-ui + i18n) | ✔ 2/2 |
| Anonim: Siber Güvenlik linki görünüyor, sayfa kilitsiz | ✔ |
| Anonim: 3 QA Shop linki de gizli, `/qa-shop-setup` giriş ekranı | ✔ |
| `/qa-shop-setup` kabuğu içerik sızdırmıyor (DBeaver/5433/X-Sandbox-Key) | ✔ 254 karakter |
| `openapi.yaml` ayrıştırma + tüm `$ref` çözümü | ✔ |
| API'nin 16 JS dosyası `node --check` | ✔ |
| İzolasyon: qa-shop ↔ gerçek backend referansı | ✔ iki yönde de SIFIR |

### ❌ DOĞRULANAMAYAN — yeni oturumun İLK işi

> ✅ Bu bölümdeki her madde 2026-08-17'de KAPANDI; yeni oturumun işi DEĞİL.

**Bu makinede `docker` KURULU DEĞİL.** Yığın hiç ayağa kaldırılamadı:

- `schema.sql` ve `seed.sql` **hiç çalıştırılmadı** — PostgreSQL sözdizimi
  satır satır gözden geçirildi ama sınanmadı
- API'ye **tek bir istek bile atılmadı** — 27 ucun hiçbiri koşmadı
- `validation-queries.sql` **hiç çalıştırılmadı**

```bash
cd qa-shop && docker compose up -d
curl http://localhost:4000/health          # {"status":"ok","database":"up"} beklenir
```

Sağlık yeşilse `qa-shop/README.md`'deki uçtan uca akışı koştur (sandbox →
login → sepet → sipariş). Hata çıkarsa düzeltilecek yer büyük olasılıkla
`seed.sql` (en karmaşık SQL orada: `clone_sandbox`, sipariş toplamlarının
satırlardan hesaplanması).

### 🎯 Sıradaki iş (öncelik sırasıyla)

1. **Yığını ayağa kaldır ve doğrula** (yukarıdaki blok) — her şey buna bağlı
2. **Postman koleksiyonu + REST Assured başlangıç projesi** — kullanıcının
   yöneticisine göstereceği somut kanıt bu olacak
3. **Ödeme/kargo/yorum/adres uçları** — tabloları ve tohum verisi VAR,
   HTTP ucu yok (SQL pratiği şimdiden yapılabilir)
4. **Arayüz (`/qa-shop`)** + Adım 4'ün herkese açık dokümantasyonu.
   Kapsamı `access-tiers-plan.md` §9.5'te tablo olarak hazır: hangi arayüz
   hareketi DB ve API'de neyi değiştirir
5. **Bug anahtarları** — `sandbox.bug_flags` sütunu duruyor, mekanizma bağlanmadı
6. `/work-goals` takipçisi — plan hazır, kod yok. Kullanıcının Faz 0'daki
   üç sorusu (alt ağırlıklar, debug hedefi, otomasyon oranının paydası)
   yöneticisiyle netleşmeden başlanmasa da olur

### 📌 Kullanıcının açık soruları / bekleyen kararları

- `/admin` hub sayfası yapılsın mı? (admin yüzeyi sayısı 3'e çıktı: `/backend`,
  `/qa-shop-setup`, ileride `/work-goals`)
- **Bulgu, dokunulmadı:** ana sayfadaki "Basit Backend" linki `/basit-backend`'e
  değil, admin'e kapalı `/backend`'e gidiyor. Herkese açık olan
  `/basit-backend` sayfasının ana sayfada HİÇ linki yok. Kullanıcıya
  bildirildi, düzeltme istenmedi.
- `/leaderboard` çıktısında yalnızca görünen ad olduğu doğrulanmalı (e-posta asla)

---

## 📌 Önceki Durum (2026-08-14, Opus — arama görünürlüğü çalışması MAIN'E MERGE EDİLDİ ve PUSH EDİLDİ)

> Alttaki bölümler korunuyor.

### 📍 Şu anki durum

**`feature/seo-visibility-fixes` main'e merge edildi ve push edildi**
(merge commit `6cbd8aa`, 10 commit: 1 plan + 3 Opus altyapı + 4 Sonnet
içerik + 1 denetim düzeltmesi + 1 devir notu). Çalışma ağacı temiz.

⚠️ **PUSH = YAYIN.** `main`'e push, test → build → GitHub Pages deploy
zincirini tetikler; deploy'dan SONRA IndexNow adımı çalışıp değişen URL'leri
Bing/Yandex'e bildirir. Yani bu çalışma artık canlıdır.

**Yayından hemen sonra kontrol edilmesi gerekenler:**
1. GitHub Actions'ta `Test & Deploy` akışı yeşil mi? (test job kırmızıysa
   deploy HİÇ çalışmaz — site eski hâlinde kalır, sessizce.)
2. `https://learnqa.dev/bd612d5cca6f783b2753e50f59d60581.txt` **200 dönüyor
   mu?** Dönmezse IndexNow bildirimleri sessizce reddedilir.
3. `https://learnqa.dev/sitemap.xml` artık bir `sitemapindex` mi, dört çocuk
   sitemap'i de 200 dönüyor mu?

Çıkış noktası: `Documents/seo-visibility-report-2026-08-13.md`. Rapor sitenin
794 URL'inden yalnızca 1'inin indekslendiğini, marka aramasında bile
görünmediğini ölçmüştü. Aynı dosyaya kök neden analizi + 4 fazlı plan +
Opus/Sonnet görev dağılımı + Sonnet promptları eklendi (bölüm 8-16).

**Teşhis (kanıtla doğrulandı, tekrar araştırmaya gerek yok):** teknik SEO
altyapısı ÇALIŞIYOR — canlı `/selenium` 2000+ kelime gerçek içerik dönüyor,
`/en/selenium` İngilizce, sitemap geçerli, robots engellemiyor, şema yerinde.
Sorun üç yerde: (1) alan adı 8 haftalık ve dışarıdan tek referansı yok —
GitHub reposu API'de `description: null, homepage: null, topics: []` dönüyor,
yani şemadaki `sameAs` karşılıksız; (2) marka adını learnqa.ru tutuyor;
(3) Search Console/analytics kurulmamış, ölçüm yok.

### Bu oturumda yapılan (Opus tarafı, hepsi build+test yeşil)

1. **Sitemap indeks yapısına bölündü** — `sitemap.xml` artık `sitemapindex`;
   `sitemap-{tr,en}-{hubs,sections}.xml` dört çocuk. Toplam 794 URL değişmedi.
   Amaç: Search Console'un indekslenme oranını grup bazında raporlaması.
   ⚠️ `tests/seo-phase2-coverage.spec.ts`'e `readAllSitemapUrlBlocks()` eklendi —
   sitemap denetleyen YENİ bir test yazarken `sitemap.xml`'i TEK BAŞINA okuma,
   orada sayfa URL'i yok, kontrol hep yeşil kalır.
2. **IndexNow** — `scripts/ping-indexnow.mjs`, `public/bd612d5cca6f783b2753e50f59d60581.txt`,
   `deploy.yml`'de deploy SONRASI adım. Son 7 günde değişenleri bildirir,
   deploy'u kırmaz. `npm run seo:indexnow -- --dry-run`.
3. **`Organization` şeması** — `alternateName`, iki dilli `description`,
   `foundingDate`. `organizationNode(locale)` artık dile göre tanım basıyor.
4. **Ana sayfa `lastmod`** — `scripts/lib/lastmod.mjs` → `EXTRA_SOURCES`.
   `/` daha önce tarihsizdi.
5. **Ölçüm kancası** — `src/utils/analytics.js`, `VITE_PLAUSIBLE_DOMAIN`
   tanımlı değilse HİÇBİR istek gitmez. `.env.example` güncellendi.
6. **İç bağlantı grafiği kümelendi** — hub shell'lerinin alt link bloğu artık
   düz "herkes herkese" listesi değil: kendi konu ailesi + her diğer
   kategoriden bir çapa sayfası (`/selenium` TR: 41 düz link → 4 aile + 14
   çapa). Kümeler UYDURULMADI, `scripts/lib/topicClusters.mjs` sitenin
   **görünür site haritasından** (`whatIsTestingData.js` → Site Haritası
   sekmesi, 14 kategori / 41 sayfa) türetiyor — ikinci bir kategori listesi
   elle tutulsaydı yeni sayfa eklendiğinde sessizce ayrışırdı.
   ⚠️ **Yeni sayfa eklerken route'u görünür site haritasına da ekle** — yoksa
   sayfa yalnızca ana sayfadan link alır, konu ailesine bağlanmaz.
   Ana sayfa tam dizini BİLİNÇLİ olarak korundu (bağlantı grafiğinin güvenlik
   ağı). `check-dist-seo.mjs`'e öksüz sayfa kontrolü eklendi.
7. `codexSeo.md` §6/§6.1/§10.1 yeni sitemap, IndexNow ve kümeleme mimarisiyle
   güncellendi; "dil bazlı SEO eksikliği" maddesi (çözülmüştü, hâlâ açık
   görünüyordu) düzeltildi.

**Opus tarafında açık iş KALMADI.**

### Sonnet işleri — ilerleme (S1-S5, sıra: S1 → S4 → S2 → S3 → S5)

- [x] **S1 — TR arama başlıkları** (`src/utils/seo.js`). 12 sayfanın
  (`/selenium`, `/playwright`, `/cypress`, `/python`, `/java`, `/sql`,
  `/jira`, `/postman`, `/docker`, `/jenkins`, `/manual-testing`,
  `/what-is-testing`) TR başlık/açıklaması zaten arama niyetine göre
  yazılmıştı ("X Nedir?" formatı); tek gerçek ihlal 6 başlığın 60 karakter
  sınırını aşmasıydı (`/selenium` 62, `/python` 64, `/sql` 62, `/jira` 63,
  `/manual-testing` 67, `/what-is-testing` 63). Hedef sorgu korunarak
  kısaltıldı, hepsi artık ≤60. `check-seo.mjs` + `npm run build` yeşil.
- [x] **S4 — outreach taslakları yayına hazır.** `Documents/outreach/`
  altındaki üç dosya (selenium wait, sql joins, playwright vs selenium)
  eskiden yalnızca İngilizce tam metindi. Her birine eklendi: (1) dosya
  başında canonical talimatı — Türkçe teaser için bare path
  (`/selenium/wait-strategies`, `/sql/sql-joins`, `/test-frameworks`),
  İngilizce tam metin için `/en/...`; (2) tam metnin ~%40'ı uzunluğunda
  Türkçe teaser (Medium Türkiye hedefli), en az 2 doğal iç link ile
  bitiyor; (3) mevcut İngilizce tam metin korunmuş, dev.to için ayrı
  bölüm olarak altta. Üç hedef link de sitemap'te doğrulandı (indekslenebilir,
  noindex değil). Kod dosyasına dokunulmadı — `git status --short` yalnızca
  bu 3 dosyayı gösteriyor.
- [x] **S2 — `/jira` JQL örnek listesi** (`src/data/jiraData.js`). GRUP F
  (JQL) sekmesinin sonuna yeni bir alt bölüm eklendi: "F5. Kopyala-Çalıştır:
  16 Hazır JQL Sorgusu" — heading + text + bilingual `code` bloğu
  (`jqlCopyPasteLibrary`). 16 sorgu, sekmenin zaten öğrettiği alan/operatör/
  zaman fonksiyonlarını (WAS, CHANGED, startOfWeek(), currentUser(),
  openSprints()) gerçekçi kombinasyonlarla birleştiriyor. JQL anahtar
  kelimeleri Türkçeleştirilmedi, yalnızca yorum satırları TR/EN ayrı. Düz
  `code` bloğu olduğu için `relatedTopicId` gerekmiyor (yalnızca
  code-playground/interview-questions/error-dictionary için zorunlu).
  Konu anlatımından sonra, GRUP G başlamadan önce yerleşti — quiz sıralama
  kuralını bozmuyor. `node --check` + `check-content-integrity.mjs` +
  `npm run build` yeşil.
  ⚠️ **DENETİMDE İKİ HATALI SORGU BULUNDU VE DÜZELTİLDİ** (commit `a47807e`,
  ayrıntı aşağıdaki "Denetim" bölümünde) — blok kullanıcıya "doğrudan
  kopyalayıp Jira'da çalıştırabilirsin" dediği için bu iki hata vaadi
  tutmuyordu.
- [x] **S3 — kariyer odaklı giriş metni, kapsam uyarlamasıyla.** Planın S3
  promptu `qaMentorData.js`'e de bir `simple-box` bloğu eklenmesini
  varsayıyordu — yürütme sırasında bu varsayım YANLIŞ çıktı: `qaMentorData.js`
  bir `blocks`/`sections` TopicPage şeması değil, sohbet-sihirbazı verisi
  (`DIALOG`, `MENTOR_STEPS`, `ALL_MAPS`); `QAMentorPage.jsx` hiçbir zaman
  `simple-box`/`heading`/`text` render etmiyor. `/qa-mentor`'ın statik SEO
  kabuğu da `generate-static-routes.mjs` içinde ELLE yazılı (Opus/script
  bölgesi), veri dosyasından türetilmiyor. Bu yüzden içerik tamamen
  **`whatIsTestingData.js`**'e (gerçek TopicPage, ilk sekme "Giriş & Neden")
  yoğunlaştırıldı — orası zaten bu sorgunun crawl edilebilir kanonik kaynağı
  (FAQ bloğu quiz gating'inin arkasında değil, FAQPage şemasının tek kaynağı).
  Eklenen: "QA Mühendisi Nasıl Olunur?" heading + 4 katmanlı `simple-box`
  (mimar/denetçi analojisi, "geliştiriciler zaten kendi kodunu test ediyorken
  neden QA?" sorusu, geliştirici/test mühendisi karşılaştırması, Knight
  Capital örneği) + beceri sırası metni (Temel Kavramlar → Dil → Framework →
  Araç → CI/CD, manuel→otomasyon geçişi, ilk iş beklentisi) + mevcut FAQ
  bloğuna yeni bir soru ("QA mühendisi nasıl olunur?"). `qaMentorData.js`'e
  DOKUNULMADI — dokunmak ölü kod (asla render edilmeyen veri) üretirdi.
  `node --check` + `check-content-integrity.mjs` + `npm run build` yeşil.
- [x] **S5 — FAQ genişletme, kapsam uyarlamasıyla.** Hedef 8 sayfadan 7'si
  (`/selenium`, `/playwright`, `/python`, `/sql`, `/java`, `/jira`,
  `/docker`) zaten `≥5` soruya sahipti (çoğu 6); her birine "X mülakatında
  en çok hangi soru sorulur?" tarzı bir soru eklendi (eksik olan tek ortak
  desen buydu), `/sql`'e ayrıca kurulum sorusu ("SQL çalıştırmak için ne
  kurmam gerekir?") eklendi. Yedisi de artık **7 soru**, hepsi iki dilli.
  **`/manual-testing` BİLİNÇLİ OLARAK ATLANDI:** bu sayfa TopicPage
  `blocks`/`sections` şeması kullanmıyor — kendi bileşeni (`ManualTestingPage.jsx`,
  `lessons` dizisi), `case 'faq':` render eden bir yüzeyi yok. FAQ'ı yalnızca
  statik SEO kabuğuna eklemek (canlı sayfada görünmeyecek şekilde) projenin
  kendi kuralını ihlal ederdi — CLAUDE.md §23.11 "kabuk ile tarayıcı
  ayrışmamalı (cloaking önlemi)": kullanıcı JS yüklendikten sonra göremeyeceği
  içeriği arama motoruna göstermek. S3'teki qa-mentor uyarlamasıyla AYNI kök
  neden. `node --check` (7 dosya) + `check-content-integrity.mjs` +
  `npm run build` yeşil; FAQPage sayfa sayısı 26'da sabit kaldı (yeni sayfa
  değil, mevcut FAQ bloklarına soru eklendi).

**Sonnet tarafında planlanan 5 iş (S1-S5) TAMAMLANDI.** İki tanesi (S3, S5)
planın öngörmediği bir mimari gerçekle karşılaştı ve kapsamı buna göre
uyarlandı — ayrıntı yukarıdaki maddelerde.

### Denetim (2026-08-14, Opus — S1-S5 çıktı kontrolü)

Beş işin çıktısı iddiaya değil **build çıktısına** bakılarak denetlendi.
Dördü doğru çıktı, birinde iki gerçek hata bulundu ve düzeltildi.

| İş | Denetim sonucu |
|---|---|
| S1 | ✅ 12 başlığın hepsi ≤60, açıklamalar 80-180 arası, `check-seo` geçiyor. Kısaltma sırasında `/selenium`'dan "Python", `/python`'dan "Playwright" anahtar kelimesi düştü — açıklamalarda hâlâ geçtiği için kabul edilebilir bir ödünleşim. 12 başlıktan 7'sinde "Nedir?" kalıbı var, 5'i ("Eğitim"/"Öğren" kalıbı) farklı bir sorgu ailesini hedefliyor — kusur değil, bilinçli çeşitlilik. |
| S2 | ❌→✅ **İki hatalı sorgu bulundu**, düzeltildi (commit `a47807e`). Ayrıntı aşağıda. |
| S3 | ✅ Yeni heading + `simple-box` + metin İKİ dil ağacında da var (tek ağaçlı dosya, 19 blok), FAQ sorusu hem görünür gövdede hem FAQPage şemasında (`/what-is-testing` kabuğunda 6 SSS). |
| S4 | ✅ Üç canonical hedefi de (`/selenium/wait-strategies`, `/sql/sql-joins`, `/test-frameworks`) sitemap'te İKİ dilde var ve `dist/` altında gerçek shell'leri üretiliyor — yani taslakların işaret ettiği adresler indekslenebilir. |
| S5 | ✅ Yedi sayfanın da kabuğunda **7 SSS** basılıyor, hepsi TR+EN. |

**S2'deki iki hata (blok "doğrudan kopyalayıp Jira'da çalıştırabilirsin" dediği için ikisi de vaadi bozuyordu):**

1. **Sorgu 16 geçersiz JQL'di.** `comment is EMPTY` yazılmıştı; Jira'nın
   `comment` alanı YALNIZCA `~` / `!~` destekler ve bu sorgu *"The field
   'comment' does not support searching for an empty string"* hatası döner.
   Kopyalayan kullanıcı doğrudan hataya düşerdi. Alanın gerçekten
   desteklediği operatörle gerçek bir QA senaryosuna çevrildi (yorumunda
   "yeniden üretilemedi" geçen buglar) ve yorum satırına neden `is EMPTY`
   yazılamayacağı eklendi.
2. **Sorgu 9 anlamsal olarak yanlıştı ve sayfanın KENDİ dersiyle
   çelişiyordu.** Etiket "Bu ay Done'a taşınan buglar" ama sorgu
   `status = Done AND updated >= startOfMonth()` idi — bu "şu an Done olan ve
   bu ay herhangi bir nedenle dokunulmuş" kayıtları getirir (3 ay önce
   kapanıp bugün yorum alan bug yanlışlıkla girer; bu ay Done'a taşınıp
   sonra reopen edilen bug hiç görünmez). Aynı sekmedeki quiz tam bu ayrımı
   öğretiyor. `status CHANGED TO Done AFTER startOfMonth()` yapıldı.

Kalan 14 sorgu tek tek doğrulandı (WAS…AFTER, CHANGED AFTER, `assignee is
EMPTY`, `IN`, `startOfWeek()`/`startOfMonth()`, ikili ORDER BY) — hepsi geçerli.

⚠️ **Ders:** Bu tür "kopyala-çalıştır" bloklarında build yeşil olması hiçbir
şey kanıtlamaz — `check-content-integrity` JQL'in Jira'da çalışıp
çalışmayacağını bilemez. Yeni bir komut/sorgu kütüphanesi eklerken her satırın
hedef sistemde GERÇEKTEN geçerli olduğu ayrıca doğrulanmalı.

### Sıradaki iş

**Kod tarafında açık iş YOK.** Bundan sonrası hesap yetkisi gerektiriyor —
kod bunlarsız ölçülebilir sonuç üretmez.

> 📋 **Elle yapılacak adımların işlenebilir listesi artık ayrı bir dosyada:
> `Documents/search-console-checklist.md`** (kutucuklu, güncel durumlu,
> sorun giderme tablolu). Aşağıdaki özet onunla çakışırsa checklist
> günceldir.
>
> **Search Console sahiplik doğrulaması TAMAMLANDI (2026-08-14):**
> `https://learnqa.dev/` URL öneki mülkü, HTML etiketi yöntemiyle. Token
> `index.html` head'inde; **silinirse doğrulama düşer ve tüm veri kesilir.**
> Sıradaki elle adım: iki hub sitemap'inin gönderilmesi (indeks dosyası
> DEĞİL — gerekçe checklist'te).

1. **Search Console** — alan adı doğrulaması + `sitemap.xml` gönderimi.
   ⚠️ Gönderirken dikkat: sitemap artık bir indeks ve 794 URL'in ~%89'u
   bölüm sayfası (710 indekslenebilir bölüm / 42 hub). 8 haftalık bir alan
   adı için bu oran agresif. **Önerilen sıra: önce yalnızca iki hub
   sitemap'ini gönder** (`sitemap-tr-hubs.xml`, `sitemap-en-hubs.xml`),
   hub'ların indekslenme oranı oturduktan sonra bölüm sitemap'lerini ekle.
   Sitemap'in bölünmüş olması tam da bu hamleyi mümkün kılıyor.
2. **GitHub repo ayarları** — About + **Website alanı** + topics. Şemadaki
   `sameAs` beyanı bu yapılmadan karşılıksız kalıyor (repo API'de hâlâ
   `description: null, homepage: null, topics: []`). Metinler
   `Documents/outreach/github-repo-about.md`'de hazır.
3. **LinkedIn** — profile site linki + bir tanıtım gönderisi.
4. **Bing Webmaster Tools** — Search Console'dan içe aktarmayla ~2 dakika.
5. **Plausible/GA4 hesabı** — açılınca `VITE_PLAUSIBLE_DOMAIN` deploy
   ortamına eklenecek; kanca zaten yerinde ve kapalı.
6. **Outreach yazıları** — üç taslak Türkçe teaser + canonical talimatıyla
   yayına hazır, Medium/dev.to'ya elle yayınlanacak.

**Ölçüm ritmi:** haftalık Search Console → Sayfalar (dizine eklenen artıyor
mu), aylık → Sorgular CSV. 3 ay sonra görünürlük raporundaki sorgular tekrar
çalıştırılıp karşılaştırılmalı.

**Beklenti kalibrasyonu (yanlış alarm vermemek için):** Sitemap gönderildikten
1-2 hafta sonra "Keşfedildi – şu anda dizine eklenmedi" sayısı yüzlerle ifade
edilecek. Bu arıza değil, yeni bir alan adının normal karşılığıdır. Bakılacak
sayı toplam değil, **hub sitemap'lerinin indekslenme oranıdır**.

**İsteğe bağlı, ertelenmiş teknik iş:** `/manual-testing` SSS'i gerçekten
istenirse `ManualTestingPage.jsx`'e yeni bir render yüzeyi + statik kabukla
senkron küçük bir değişiklik gerekir — içerik işi değil, bileşen işi olarak
ayrıca planlanmalı.

### Bu oturumdan kalıcı ders

**Bir bekçinin yeşil olması doğru çalıştığını kanıtlamaz.** Sitemap bölününce,
`sitemap.xml`'i okumaya devam eden sızıntı kontrolü hiçbir şeye bakmıyor
olurdu (o dosyada artık sayfa URL'i yok) ama yine yeşil kalırdı. Hem sitemap
sızıntı bekçisi hem yeni öksüz sayfa bekçisi, BOZUK durum bilerek üretilip
kırmızıya döndükleri görülerek doğrulandı. Yeni bir guard yazınca aynısını yap.

---

## 📌 Önceki Durum (2026-08-12, Opus — `/jira` yol haritalarına + site haritası tamamlandı, MAIN'E MERGE EDİLDİ)

> Alttaki bölümler korunuyor.

### 📍 Şu anki durum

`/jira` sayfası ve bu oturumdaki tüm işler **`main`'de ve push edildi**.
Çalışma ağacı temiz, açık branch yok. Bu oturumda toplam üç iş main'e girdi:

1. `feature/jira-page` → `/jira` sayfasının tamamı (13 sekme, 51 mülakat
   sorusu) — merge `c98c7c5`.
2. `feature/jira-in-roadmaps` → Jira'nın 5 QA Mentor yol haritasına ve site
   haritasına eklenmesi + site haritasındaki 10 eksik sayfanın tamamlanması.

**Sıradaki iş:** `/jira` tarafında açık kalan bir şey YOK. Önceki oturumlardan
devam eden açık işler aşağıdaki "Önceki Durum" bölümlerinde
(`fix/test-suite-flakiness` merge kararı, `npm run seo:lcp` yeniden ölçümü,
outreach taslakları, Plausible analytics) — hiçbiri bu oturumda ele alınmadı.

### Bu oturumda yapılan (3. istek)

Kullanıcı `/jira`'nın (1) görünür site haritasında ve (2) QA Mentor'un ürettiği
HER yol haritasında doğru yerde görünmesini istedi; konumlandırma ölçütünü de
verdi: "yazılım geçmişi olmayan biri Selenium'dan veya diğer test araçlarından
sonra Jira öğrenebilir".

1. **Görünür site haritası** (`/what-is-testing` → 🗺️ Site Haritası sekmesi,
   `whatIsTestingData.js`): yeni bir kategori eklendi — **"📋 Süreç, İş Takibi
   & Hata Yönetimi"**, "🎨 UI / Web Test Otomasyonu"dan HEMEN SONRA (yol
   haritasındaki sırayla tutarlı olsun diye), "🔌 API Testi"nden önce.
   NOT: bu, `public/sitemap.xml` DEĞİL — o zaten build'de otomatik üretiliyor
   ve `/jira`'yı ilk günden beri içeriyordu.

2. **QA Mentor (`qaMentorData.js`)**: paylaşılan bir `JIRA_NODE(id)` fabrikası
   eklendi (SQL_NODE/GIT_GITHUB_NODE kalıbıyla aynı, 6 saat tahmin) ve BEŞ
   şablonun hepsine **UI otomasyon aracından hemen sonra** yerleştirildi:
   MAP_A #7 (Selenium sonrası), MAP_B #5, MAP_B_SEL #6, MAP_C1 #4, MAP_C2 #4.
   Parametrik katman (`resolveMap`) 6 farklı cevap kombinasyonuyla doğrulandı —
   Java+"ikisi de"de Playwright overlay'i araya girince Jira ondan sonraya
   kayıyor, Python+yalnız-Selenium'da Playwright düşünce Selenium'dan hemen
   sonra kalıyor. İkisi de doğru.
   Ayrıca sihirbaz öncesi genel özete (`ZERO_TO_QA_STAGES`) 7. aşama olarak
   "İş takibi ve bug yönetimi" eklendi.

3. **Mentor notları**: 5 şablonun notu + `SINGLE_LANG_NOTES`'taki 6 varyant
   (python/typescript × map_b/map_b_sel_both/map_b_sel_selenium) Jira'nın NEDEN
   o sırada olduğunu anlatacak şekilde güncellendi — harita bir düğüm
   gösterirken notun ondan hiç bahsetmemesi tutarsızlık olurdu.

4. **Yan düzeltme:** `QAMentorPage.jsx`'te "Sıfırdan QA mühendisi olmak: **6**
   aşama" başlığındaki sayı GÖMÜLÜYDÜ; listeye 7. aşama eklenince sessizce
   yanlış olacaktı. Artık `ZERO_TO_QA_STAGES.length`'ten türetiliyor.

5. **Test:** `qa-mentor-roadmap-order.spec.ts` MAP_A sırasını kilitliyor;
   beklenen listeye `map-node-jira` (selenium sonrası) eklendi.

**Doğrulama:** `check-content-integrity` ✓ · `i18n:check` (trio dahil) ✓ ·
`npm run build` ✓ · QA Mentor test paketi **17/17** geçti
(`qa-mentor-roadmap-order` + `career-map` + `career-map-milestones`).
Gerçek tarayıcıda da doğrulandı: site haritasında Jira kartı görünüyor, MAP_A'da
düğüm "#7 Jira" olarak Selenium (#6) ile Postman (#8) arasında render oluyor.

⚠️ **Bilinen kısıt:** Yol haritası kullanıcının localStorage'ındaki profile
kaydedilir (`qaMentorProfile`). ÖNCEDEN harita oluşturmuş kullanıcıların kayıtlı
profilinde Jira YOKTUR; haritayı sıfırlayıp yeniden oluşturana kadar görmezler.
Bu, yeni bir düğüm eklemenin doğal sonucudur — geriye dönük migrasyon YAZILMADI.

📋 **Site haritasındaki 10 eksik sayfa da aynı oturumda tamamlandı** (aşağıdaki
4. istek bölümüne bak).

### Bu oturumda yapılan (4. istek) — görünür site haritası TAMAMLANDI

Yukarıda raporlanan 10 eksik sayfa (+ kullanıcıya açıkça belirtilerek eklenen
`/portfolio` ve `/leaderboard`) görünür site haritasına eklendi. Site haritası
artık **41 link** taşıyor ve `ROUTE_SEO`'daki auth/admin dışı HER route'u
kapsıyor — script'le doğrulandı: tekrar eden link yok, geçersiz route yok,
kalan eksik yok.

Yerleşim:
- **Mevcut kategorilere eklenenler:** `/test-automation` → Test Temelleri
  (cols 2→3); `/gauge` + `/qa-frontend` → UI/Web Test Otomasyonu;
  `/api-testing` + `/bruno` → API Testi; `/javascript` → Programlama Dilleri.
- **İki yeni kategori:** "🤖 Yapay Zekâ & QA" (`/claude-ai`, `/llm-agents`) ve
  "🎮 Uygulamalı Lab & Simülasyon" (`/sprint`, `/basit-backend`).
- **Kariyer & Rehberlik** grubu genişletildi (cols 2→3): `/qa-mentor` yanına
  `/portfolio` ve `/leaderboard`.

Açıklama metinleri UYDURULMADI — her biri o route'un `ROUTE_SEO` TR/EN
description'ından türetildi, böylece site haritası kartı ile sayfanın kendi
meta açıklaması çelişmiyor.

**Doğrulama:** `check-content-integrity` ✓ · `i18n:check` ✓ · `npm run build` ✓.
Gerçek tarayıcıda: 12 yeni linkin hepsi tam 1 kez render oluyor, üç yeni/
değişen kategori başlığı görünür, `/claude-ai` ve `/sprint` linkleri tıklanıp
doğru sayfaya gittiği teyit edildi, konsol hatası 0.

⚠️ **Kapsam notu:** Kullanıcı "10 eksik" demişti; `/portfolio` ve `/leaderboard`
o listede YOKTU (önceki denetimde ders sayfası olmadıkları için elenmişlerdi).
İkisi de herkese açık ve site haritasının amacı "bu platformda neler var"
olduğu için eklendi ve kullanıcıya açıkça bildirildi — istenmezse çıkarılabilir.

---

## 📌 Önceki Durum (2026-08-12, Sonnet — `/jira`'ya dolan ev butonu + kavram ipucu maskotu eklendi)

> Çelişki olursa bu bölüm günceldir. Alttaki bölümler korunuyor.

### Bu oturumda yapılan (2. istek)

Kullanıcı iki eksiklik bildirdi: (1) sağ alttaki ev/scroll-to-top butonu diğer
25 teknoloji sayfasındaki gibi kaydırma yüzdesiyle "dolmuyor" (düz mor daire
kalıyordu), (2) sayfaya ilk girişte "altı çizgili kelimenin üstüne gelince
açıklanacağını" söyleyen maskot (`TooltipGuideMascot`) görünmüyordu.

**Kök neden:** `JiraPage.jsx` iki şeyi de içermiyordu.
- Dolan buton kalıbı (`ra-wave-progress`/`gg-dial-progress` tarzı) 25 sayfada
  var ama her sayfa kendi CSS dosyasıyla (parçacık efektleri, glitch, mıknatıs
  buton gibi koca bir "efekt paketi" ile) geliyor — Jira'ya SADECE istenen
  buton eklendi, o efekt paketinin geri kalanı (parçacıklar, glitch, mıknatıs,
  ambient ses) BİLEREÇ eklenmedi (CLAUDE.md "istenenin ötesine geçme" kuralı).
  Yeni `JiraScrollHomeButton` bileşeni tamamen React state + satır içi stille
  yazıldı, yeni CSS dosyası YOK.
- `TooltipGuideMascot`, tasarım gereği yalnızca 3 giriş sayfasına
  (`/what-is-testing`, `/manual-testing`, `/algorithms`) o sayfaların KENDİ
  wrapper'ına eklenmişti (TopicPage.jsx'e dokunulmadan — CLAUDE.md'deki
  "TopicPage onlarca sayfada paylaşılır" kısıtı). `/jira` bu 3 sayfa
  listesinde yoktu. `highlightGlossaryTerms` (altı çizgili terim tooltip'i)
  zaten TopicPage.jsx'te GLOBAL çalışıyordu — yalnızca onu TANITAN maskot
  eksikti.

**Düzeltme:** `JiraPage.jsx`'e `<TooltipGuideMascot />` (varsayılan props) ve
yeni `JiraScrollHomeButton` (58px, mavi/indigo su dolumu, kaydırma yüzdesi,
`data-testid="jira-dial-progress"`) eklendi.

**Doğrulama:** `npm run build` yeşil. Dev sunucusu açılıp gerçek tarayıcıda
(Playwright ile) test edildi: dial %55 doğru doluyor, maskot rozeti tıklanınca
balon açılıp doğru mesajı gösteriyor (ekran görüntüleriyle doğrulandı). `/jira`
için topic-pages-ui + i18n-content-toggle + video-scene testleri (3/3) tekrar
koşulup geçti.

---

## 📌 Önceki Durum (2026-08-12, Sonnet — `/jira` GRUP A'da öğretilmeden sorulan JQL alıştırması düzeltildi)

> Çelişki olursa bu bölüm günceldir. Alttaki bölümler korunuyor.

### Bu oturumda yapılan

Kullanıcı GRUP A'daki (Jira Nedir?) `firstJqlPlayground` alıştırmasının JQL
sözdizimi hiç öğretilmeden sorulduğunu fark etti (ekran görüntüsüyle
bildirdi). Doğrulandı: alıştırma `AND`, `!=`, `currentUser()`, `ORDER BY`
gerektiriyordu ama öncesindeki metin yalnızca "JQL'i ilerideki sekmede
işleyeceğiz, burada sadece görmen yeterli" diyordu — CLAUDE.md §9.1 "önce
mantık, sonra komut" kuralının ihlaliydi. **Diğer 15 `code-playground`
bloğu kontrol edildi, hepsi kendinden önceki anlatıma dayanıyor** (JQL
kullanan diğer tüm playground'lar GRUP F'den — JQL'in gerçek öğretildiği
sekmeden — sonra geliyor); sorun yalnızca bu ilk örnekteydi.

**Düzeltme:** Metin yeniden yazıldı + alıştırmadan hemen önce annotasyonlu
bir `code` örneği eklendi ("benim açtığım, henüz kapanmamış issue'lar" —
ALAN=DEĞER, AND, `!=`, `currentUser()` gösterilir ve açıklanır). Alıştırma
artık aynı üç parçayı, bir alan adı değişikliğiyle (`reporter`→`assignee`)
ve bir yeni-ama-tahmin-edilebilir koşulla (`issuetype = Bug`, aynı kalıp)
istiyor. `ORDER BY` gereksinimi tamamen kaldırıldı (solutionCode'dan) —
hiç öğretilmemiş bir üçüncü kavramdı, çıkarılması alıştırmayı gerçekten
çözülebilir kıldı.

Doğrulama: `check-content-integrity`, `i18n:check` (trio dahil), `npm run
build`, ve `/jira` için topic-pages-ui + i18n-content-toggle + video-scene
testleri (3/3) tekrar koşulup geçti.

**Aynı oturumda ek istek:** Kullanıcı gerçek bir Jira hesabında JQL'in NEREDE
yazıldığını sordu (hangi menü). JQL sekmesinde (F1) `callout` bloğu eklendi:
üst nav → "Filters" → "Advanced issue search" → issue navigator ekranındaki
"Basic / JQL" değiştirme anahtarı. GRUP A'daki ilk JQL örneğine de bu detayın
JQL sekmesinde olduğuna dair tek cümlelik bir yönlendirme eklendi. Build/i18n
tekrar doğrulandı, yeşil.

---

## 📌 Önceki Durum (2026-08-11, Sonnet — `/jira` sayfası TAMAMLANDI, S1-S12 bitti)

> Çelişki olursa bu bölüm günceldir. Alttaki bölümler korunuyor.

### Neredeyiz

- **Branch: `feature/jira-page`** — ⚠️ bu satır yazıldığında merge edilmemişti;
  SONRADAN `main`'e merge edildi (`c98c7c5`) ve push edildi.
- Yeni ders sayfası `/jira` açıldı: **13 sekme, tek ağaçlı `src/data/jiraData.js`**.
  Opus tarafı (wiring + iskelet + referans atomlar) BİTTİ, build yeşil.
- Plan ve Sonnet promptları: **`Documents/jira-page-plan.md`** (§B Opus'un yaptığı,
  §C faz tablosu, §D S1-S12 kopyala-yapıştır promptlar, §E mimari referans,
  §F manuel test rehberi).
- **Faz S1 (D-S1, GRUP A tamamlama A2-A5) BİTTİ:** A2 (rol karşılaştırması `grid`),
  A3 (Cloud vs Data Center `table` + `callout`), A4 (izlenebilirlik zinciri
  `python-flow-diagram`), A5 (Jira olmadan çöküş `step-animation`) eklendi —
  her başlıkta quiz+retryQuestion. GRUP A artık tam referans sekme.
- **Faz S2 (D-S2, GRUP B — Kurulum & İlk Proje) BİTTİ:** "Boş Bir Jira
  Projesinden İlk Bug'a" filmi (6 sahne) + B1 hesap açma `step-animation`,
  B2 team-managed/company-managed `table`+`callout`, B3 izin şeması anlatımı
  (`private` erişim belirleyici analojisi), B4 issue key anatomisi
  `code-playground` + kurulum sırası `challenge` (order-sort). Her başlıkta
  quiz+retryQuestion.
- **Faz S3 (D-S3, GRUP C — Issue Türleri ve Hiyerarşi) BİTTİ:** "Bir Epic'in
  Altında Bug Nasıl Doğar" filmi (5 sahne) + C1 hiyerarşi kurulumu
  `step-animation` (Java paket/sınıf/metot analojisi, kırıldığı yer dahil),
  C2 issue tipi ↔ alan `table` + 5 iş kalemini eşleştir `code-playground`,
  C3 alan/ekran/şema üçlüsü (`private`+getter analojisi), C4 link tipleri
  `table` + hiyerarşi sıralama `challenge`. Her başlıkta quiz+retryQuestion.
- **Faz S4 (D-S4, GRUP D — Bug Raporlama Sanatı tamamlama) BİTTİ:** GRUP D
  D1-D5 kalıbına yeniden düzenlendi (önceki severity/priority içeriği artık
  D3). "Kötü Bir Bug Raporunun 5 Günü" filmi (5 sahne) eklendi. D1 anatomi
  (var olan step-animation+playground D1'e taşındı), D2 deterministik adım
  disiplini (`table` + `.first()` locator analojisi), D3 severity/priority
  (korunan içerik), D4 kanıt türleri `grid`, D5 üç raporu code review eden
  `code-playground`. GRUP D artık sayfanın en zengin grubu.
- **Faz S5 (D-S5, GRUP E — Workflow ve Durumlar) BİTTİ:** "Bir Bug'ın
  Reopened'a Düşüşü" filmi (5 sahne, resolution zamanlaması kontrastı) + E1
  status/transition/resolution üçlüsü (trafik ışığı analojisi), E2 tipik bug
  workflow'u `python-flow-diagram`, E3 resolution alanının doğru zamanlaması
  `step-animation`, E4 otomasyon kuralları + doğru geçişi seç
  `code-playground` + workflow sıralama `challenge`.
  ⚠ **Önemli ders bu fazda çıktı:** içerik yazarken yanlışlıkla iç
  koordinasyon jargonuna benzeyen referanslar ("§B3'te", "GRUP A'dan beri")
  kullanılmış, fark edilip sekme adlarıyla ("Kurulum & İlk Proje sekmesinde
  gördüğün gibi") değiştirildi (CLAUDE.md §24). Yeni sekme yazarken önceki
  sekmelere atıf yaparken DAİMA görünür sekme başlığını kullan, harf/rakam
  kısaltması (A2, B3, §D1) kullanma — otomatik denetim yalnızca `§\d` kalıbını
  yakalıyor, harf+rakam kalıbını (§B3, A2) YAKALAMIYOR; bu yüzden elle
  taranmalı. Bu bulgu CLAUDE.md §23.13'e kalıcı olarak eklendi.
- **Faz S6 (D-S6, GRUP F — JQL tamamlama) BİTTİ:** "Bir JQL Sorgusunun
  Jira'yı Nasıl Süzdüğü" filmi (5 sahne) + F1 JQL anatomisi + JQL vs SQL
  `table` (JOIN'in olmaması vurgulandı), F2 operatörler/zaman fonksiyonları
  `table` + koşul değerlendirme sırası `step-animation` + unutulmuş bug
  `code-playground`, F3 günlük sorgular (WAS operatörü playground'u taşındı,
  retryQuestion eklendi), F4 kaydedilmiş filtre/abonelik `code-playground`.
  Toplam 3 code-playground (plan gereksinimi karşılandı).
- **Faz S7 (D-S7, GRUP G — Scrum ve Kanban Panoları) BİTTİ:** "Bir İş
  Kaleminin Backlog'dan Panoya Yolculuğu" filmi (6 sahne, donmuş kart
  kontrastı) + G1 backlog/sprint/pano zinciri quiz, G2 Scrum vs Kanban
  `table`, G3 "QA sütunu" tartışması (iki taraf da sunuldu, dayatma yok) +
  hızlı filtre `code-playground` + `/sprint` simülatörüne `link-grid`, G4
  WIP limiti darboğazı `step-animation`, G5 sprint ritüelleri `table`.
- **Faz S8 (D-S8, GRUP H — Test Yönetimi: Xray & Zephyr) BİTTİ:** "Bir Test
  Senaryosunun 50 Koşumu" filmi (5 sahne, tanım/koşum ayrımı) + H1 bug
  takibi≠test yönetimi, H2 beş issue tipi `table` + ilişki `step-animation`,
  H3 izlenebilirlik matrisi `python-flow-diagram` (Jira Nedir? sekmesindeki
  zincirin somutlaşmış hâli), H4 otomasyon sonucu akışı + Test Execution
  JQL `code-playground`, H5 Xray vs Zephyr karar tablosu.
- **Faz S9 (D-S9, GRUP I+J — CI/CD entegrasyonu ve REST API) BİTTİ:**
  GRUP I: "Bir CI Koşumu Kırıldığında" filmi (5 sahne, arama-önce
  stratejisi) + I1 smart commit `table`, I2 arama-önce `step-animation` +
  duplicate arama `code-playground`, I3 gürültü tuzağı, I4 ortam/artefakt
  iliştirme. GRUP J: "Bir REST API Çağrısının Jira'ya Bug Açması" filmi
  (5 sahne, 401 kontrastı) + J1 kimlik doğrulama + issue oluşturma
  (`curl`), J2 JQL ile arama (`curl`), J3 Java (REST Assured)
  `code-playground` + Python karşılığı, J4 webhook kavramı, J5 hata kodları
  `table` + teşhis `step-animation`. İki grup da ayrı film taşıyor (plan
  gereksinimi).
- **Faz S10 (D-S10, GRUP K — Dashboard ve QA Metrikleri) BİTTİ:** "Burndown
  Grafiği Düz Bir Çizgi Çizdiğinde" filmi (5 sahne, iki olası neden
  kontrastı) + K1 filtre→gadget→pano zinciri, K2 burndown/velocity ne
  söyler-söylemez, K3 kontrol grafiği/kümülatif akış darboğaz teşhisi
  `step-animation`, K4 dört QA metriği formül+JQL `table` + reopen rate
  ham veri `code-playground`, K5 metrik istismarı (Goodhart yasası).
- **Faz S11 (D-S11, GRUP L — error-dictionary min 8 hata) BİTTİ:** "Bir Hata
  Mesajının Katman Katman Çözülmesi" filmi (5 sahne, izin→konfigürasyon→
  sözdizimi sırası) + 7 yeni hata eklendi (toplam 9): yanlış resolution,
  401 vs 403 karışıklığı, API 400 zorunlu alan, 3 kez açılan duplicate bug,
  sprint kapanınca bitmemiş issue'lar, board'da kart görünmüyor, bildirim
  fırtınası. "Board'da kart neden görünmüyor" `step-animation` + katman
  eşleştirme `code-playground` eklendi (GRUP L'de daha önce video/animasyon/
  sandbox YOKTU, bu fazda tamamlandı).
- **Faz S12 (D-S12, GRUP M min 50 mülakat + kapanış) BİTTİ — SAYFA TAMAMLANDI:**
  47 yeni mülakat sorusu eklendi (toplam 51: 15 basic / 21 intermediate / 15
  advanced, `audit-interview-questions.mjs` geçti). GRUP M'ye önceden hiç
  video/animasyon/sandbox yoktu — "Bir Mülakat Cevabının Anatomisi: Zayıftan
  Güçlüye" filmi (5 sahne) + güçlü cevap kurma `step-animation` + zayıf→güçlü
  cevap dönüştürme `code-playground` eklendi. GRUP A'nın sonuna 6 sorulu `faq`
  bloğu eklendi (build sonucu FAQPage sayfa sayısı 24→26).
  **Kapanış görevleri tamamlandı:**
  - `scripts/audit-interview-questions.mjs` `PAGES`'e `/jira` eklendi, denetim geçti.
  - `scripts/generate-interview-showcase.mjs` `PAGES`'e `/jira` eklendi (ana
    sayfa mülakat ısınma turuna girdi).
  - `scripts/check-i18n-leaks.mjs` `TRIO_COMPLETE_PAGES`'e `jiraData.js`
    eklendi — 13 sekmenin HEPSİNDE ≥1 video + ≥1 animasyon + ≥1 sandbox
    doğrulandı (13. sekmedeki eksiklik bu fazda kapatıldı).
  - `npm run build` yeşil (47 route, 866 section shell, "26 with FAQPage").
  - Playwright: `/jira` film render ✓, sekme/buton denetimi ✓, EN modda TR
    karakter taraması ✓ — üçü de tekrar koşulup doğrulandı.
  - `Documents/jira-page-plan.md` durumu ✅ TAMAMLANDI olarak güncellendi.
  - ⚠ Bu fazda da (S1-S5'teki gibi) birkaç yerde yanlışlıkla iç grup
    referansı (`GRUP F'de`, `I2'de`) yazılmış, elle taranıp sekme adına
    çevrildi — CLAUDE.md §23.13'teki kalıcı uyarı bir kez daha doğrulandı.

### O anki sıradaki iş (ARTIK GEÇERSİZ — sonradan yapıldı)

> Bu madde yazıldığında `/jira` branch'i henüz merge edilmemişti. Sonradan
> merge + push edildi; güncel durum için EN ÜSTTEKİ devir notuna bak.

1. ~~`/jira` sayfası içerik olarak TAMAMLANDI, merge kararı kullanıcıda.~~
   → Merge edildi (`c98c7c5`) ve push edildi.
2. İstenirse `Documents/jira-page-plan.md` §F'deki manuel test rehberi elle
   uygulanabilir (otomatik testlerin göremediği görsel/etkileşim doğrulaması) —
   HÂLÂ AÇIK, yapılmadı.

### Bu oturumda yapılanlar

1. **Wiring tam:** `App.jsx` (lazy + route + `SECTION_PAGE_ELEMENTS`), `seo.js`
   (EN+TR metadata), `topicDataModules.mjs`, `generate-mastery-manifest.mjs`
   `ROUTE_MAP`, `check-i18n-leaks.mjs` `STRICT_ZERO_FILES`, `JiraPage.jsx`
   (TopicPage sarmalayıcı + canlı mini Kanban banner'ı, yeni CSS dosyası YOK),
   `HomePage.jsx` (etiket + üst nav + footer), `progressStore` (foundations),
   `mentorAdvice`, `LearningAnalytics`, `portfolioData`, CLAUDE.md route haritası.
2. **Sekme slug'ları donduruldu:** `npm run seo:section-slugs` → 32 sayfa /
   433 bölüm (13 yeni). Sonnet **sekme başlıklarını değiştiremez**; değiştirirse
   yayınlanan adres başka içeriğe düşer.
3. **İçerik iskeleti:** 13 sekmenin hepsinde 4 katmanlı açılış `simple-box`'ı +
   yönlendirme metni. Tam referans atom GRUP A'da (film "Bir Bug'ın Jira'daki
   Yolculuğu" 8 sahne + step-animation + grid + JQL playground + quiz/retry +
   order-sort). GRUP D'de severity↔priority tablosu + rapor düzeltme
   playground'u + step-animation; GRUP F'de JQL kod bloğu + WAS operatörü
   playground'u; GRUP L'de 2 hata; GRUP M'de 3 mülakat sorusu.
4. **Karar: bu sayfa `fillMissingCodeTrios` KULLANMIYOR.** Filler yalnızca kod
   bloklarından sonra üretim yapar ve bilinmeyen sayfa anahtarında jenerik
   profile düşer; Jira sekmelerinin çoğu kod değil süreç anlatımı. Animasyon ve
   sandbox ELLE yazılıyor. `fillMissingFeynman` kullanılıyor (2 checkpoint).

### Doğrulama

- `npm run build` ✓ (47 route, 94 shell, 866 bölüm shell'i, dist SEO ✓).
- `check-seo` 48 route ✓ · `check-test-coverage` 44/44 ✓ ·
  `check-content-integrity` ✓ · `i18n:check` regresyon yok, borç 0 ✓.
- Playwright: `/jira` film render ✓, `/jira` sekme+buton denetimi ✓,
  `/jira` EN modda Türkçe karakter taraması ✓ (3/3).

### Sıradaki iş

1. **Sonnet fazları S1-S12** — promptlar hazır (`Documents/jira-page-plan.md` §D).
   Sıra: GRUP A tamamlama → B → C → D (sayfanın kalbi) → … → M + kapanış.
2. ⚠ **Kapanışta unutulmaması gerekenler (S12):** `/jira`'yı
   `scripts/audit-interview-questions.mjs` PAGES listesine (50 soru barajı) ve
   `scripts/generate-interview-showcase.mjs` PAGES listesine ekle; `jiraData.js`'i
   `check-i18n-leaks.mjs` `TRIO_COMPLETE_PAGES`'e ekle (her sekmede video +
   animasyon + sandbox kapısı açılır).
3. Bir önceki oturumdan devam eden açık işler aşağıdaki bölümde duruyor
   (`fix/test-suite-flakiness` merge kararı, `npm run seo:lcp` yeniden ölçümü).

---

## 📌 Önceki Durum (2026-08-05, Opus — kalan 4 flaky testin kökü kazındı)

> Çelişki olursa bu bölüm günceldir. Alttaki bölümler korunuyor.

### Neredeyiz

- **Tam paket YEŞİL ve DETERMİNİSTİK: 380 passed / 0 failed / 0 flaky / 23.6 dk**
  (öncesi: 375 passed / 4 flaky / 24.4 dk).
- Bir önceki oturumdan kalan **4 flaky testin dördü de kökünden çözüldü.**
  Bunlar tek bir sebebe bağlı değildi — üç ayrı kök neden çıktı, biri ürünün
  değil TEST ORTAMININ kusuruydu ve tek başına paketin güvenilirliğini
  sarsıyordu.
- İş **`fix/test-suite-flakiness` dalında commit edildi**; main'e merge ve push
  EDİLMEDİ, karar kullanıcıda.

### Bulunan kökler (dördü de "tek başına geçiyor, pakette düşüyor" idi)

1. **`vite preview` uzantısız yolda YANLIŞ kabuğu servis ediyordu** (asıl bulgu,
   CLAUDE.md §23.11'e kalıcı olarak yazıldı). `curl localhost:4175/docker` ana
   sayfanın kabuğunu döndürüyordu; `/docker/` (eğik çizgiyle) doğru kabuğu.
   Yani paket, "yayınlanan artefaktı test ediyoruz" derken sayfa başına üretilen
   840 kabuğu HTTP üzerinden HİÇ sınamıyordu ve her sayfa React mount olana
   kadar ana sayfanın başlığını/canonical'ını/hreflang'ini taşıyordu.
   Düzeltme: `vite.config.js` → `previewDirectoryIndex` eklentisi (içeriden
   yeniden yazma; adres `/docker` kalır). Doğrulandı: `/docker`, `/en/docker`,
   `/selenium/wait-strategies` kendi canonical'ıyla geliyor; asset'ler ve
   bilinmeyen yol yedeği bozulmadı.
2. **Kaybolan bir an doğrulanıyordu** (CLAUDE.md §23.12). `/java` kod yürüyüşü
   testi "Adım 1/" arıyordu; o metin otomatik oynatma yüzünden 1100 ms yaşıyor.
   Aynı kusur bellek modeli testinde de vardı (1300 ms). Düzeltme:
   `assertStepWalkthrough` — sayacın varlığı + Sıfırla→İleri→İleri zinciri
   (zamanlayıcısız, makineden bağımsız). `CodeTraceBlock`/`HeapStackBlock`'a
   `data-testid` eklendi ki doğrulama yanlış bloğa gitmesin.
3. **İki gerçek bekleme eksiği.** (a) Dil düğmesi tam sayfa navigasyonu yapıyor
   (`window.location.assign`), ana sayfa rozet testi bunu beklemiyordu.
   (b) `/java` sekme testi ÜÇÜNCÜ TARAF bir servisten gelen 502'yi ürün hatası
   sayıyordu — tarayıcı adresi mesaj metnine koymadığı için mevcut filtre
   göremiyordu. Filtre artık kaynağın adresine bakıyor; **kendi sunucumuzun
   502'si hâlâ hata sayılıyor** ve bunu kanıtlayan kendi testi var.

### Bu iş sırasında ortaya çıkan ve düzeltilen diğer şeyler

- **Ürün:** bölüm adreslerinde (`/sql/sql-joins`) uygulama açılınca başlık kısa
  süre HUB başlığına gerileyip sonra düzeliyordu. `SeoMeta` artık sekmeye özgü
  başlık gelene kadar kabuğun yazdığı doğru başlığı korur.
- **Yeni tuzak:** kabuklar artık gerçek içerik taşıdığı için "beklenen metin
  göründü" de hazırlık sinyali DEĞİL. `seo-phase3-integrity` ve
  `seo-section-routes` dosyalarına `waitForAppReady` + yük toleranslı süreler
  eklendi (bu ikisi en ağır sayfalara gidiyor ama hiç beklemiyordu).
- **Film oynatıcı testleri:** 3. sahneye atlayıp "altyazı değişti mi" diyorlardı;
  otomatik oynatma zaten oraya varmış olabiliyordu. Artık BAŞA atlanıp altyazının
  ilk sahne metnine EŞİT olduğu doğrulanıyor (yarış yok, doğrulama daha güçlü).
  Bütçeleri de 60→150 sn: bu iki test filmi gerçekten OYNATIYOR (sahne başına
  3.4 sn duvar saati), 60 sn ürünü değil işin uzunluğunu kesiyordu.
- **`/java`-`/sql`-`/typescript` ilk-boya testi BAŞTAN BERİ kırıkmış**
  (`seo-phase2-coverage`): `h1` görünürlüğü de "yükleme göstergesi yok" koşulu da
  uygulama hiç çalışmadan sağlanıyordu, ardından gelen `count()` boş DOM'u
  sayıyordu. `waitForAppReady` + yinelenen sekme doğrulaması eklendi.
- **Ana sayfa mülakat testi** (10 soruyu tek tek açıyor) ve **tema testleri**
  kendi bütçelerini aşıyordu; süre varsayılanları (aşağıdaki açık karar) ve
  90 sn'lik özel bütçe ile çözüldü.
- **`topic-pages-ui` bütçesi artık sekme sayısına göre** (`60 sn + sekme×10 sn`).
  Sabit 180 sn, 19 sekmeli `/playwright`'ta sekme başına 9 sn bırakıyordu.

### Doğrulama

- **Hedeflenen 4 test KANITLANDI:** 4 worker (paketin gerçek ayarı) × 5 tekrar,
  retry KAPALI → 55/55. Oynatıcı testleri 10/10, bölüm/SEO testleri 87/87,
  `topic-pages-ui` tam dosya 31/31.
- **Tam paket koşumları (aynı gün, sırayla):**

  | # | Sonuç | Not |
  |---|---|---|
  | ref | 375 geçti · 4 flaky · 24.4 dk | önceki oturum |
  | 1 | 378 geçti · 2 flaky · 23.6 dk | kabuk düzeltmesi |
  | 2 | 375 geçti · 5 flaky · **1.9 saat** | makine tıkanması, aşağıya bak |
  | 3 | 379 geçti · 1 flaky · 24.8 dk | |
  | 4 | 376 geçti · **2 hata** · 25.6 dk | ilk-boya + mülakat testi |
  | 5 | 377 geçti · **1 hata** · 25.3 dk | tema testleri |
  | 6 | 378 geçti · **1 hata** · 31.9 dk | süpürme testi bütçesi |
  | **7** | **380 geçti · 0 hata · 0 FLAKY · 23.6 dk** | **son durum** |

- **Paket ilk kez tamamen deterministik: 380/380, sıfır flaky, sıfır retry** —
  üstelik referanstan (24.4 dk) hızlı. Bir sonraki oturum bu tabloyu referans
  alsın; yeni bir flaky çıkarsa önce §23.10-23.12'deki üç tuzağa bak.

- **Ders: her koşum FARKLI bir testi düşürdü ve hepsi AYNI sınıftandı** —
  hazırlık sinyalinin yanlış tanımlanması ya da varsayılan sürelerin yük altında
  yetmemesi. Bunlar yeni arızalar değil; kabuklar artık gerçek içerik taşıdığı
  için görünme sıklıkları arttı. Örnek: `/java` ilk-boya testi BAŞTAN BERİ
  kırıkmış — hem `h1` hem "yükleme göstergesi yok" koşulu uygulama hiç
  çalışmadan sağlanabiliyordu, ardından gelen `count()` boş DOM'u sayıyordu.
- ⚠ 2 numaralı koşum 1.9 saat sürdü. İncelendi: dört test aynı anda (~5340. sn)
  zaman aşımına düşüp teardown'da takılmış, yeniden denemede 17-93 sn'de geçmiş —
  dört worker aynı anda ~88 dakika DONMUŞ. Makine düzeyinde tıkanma; sonraki
  koşum 24.8 dk'ya döndü. Benzer tablo görülürse önce makine yükünü sorgula.

### ⚠ Açık karar — süre varsayılanları yükseltildi

`playwright.config.ts`'te doğrulama süresi 5→15 sn, test bütçesi 30→90 sn
yapıldı ve `topic-pages-ui`'nin bütçesi sekme sayısına göre hesaplanır oldu.
Bu, 2026-08-04'teki "süreleri uzatmak gizler" kararını KISMEN tersine çevirir.
Gerekçe dosyanın içinde yazılı: o günkü kök neden (dev sunucusunun derleme
süresini ölçmek) kapandı; kalan şey 8 çekirdekte 4 worker'ın 0.5-1.6 MB'lık
paketleri aynı anda ayrıştırması. Bu sınırlar bir bekleme ÜST SINIRIdır,
doğruluk ölçüsü değil — bozuk bir özellik hiçbir süre içinde doğrulamayı
sağlamaz. **Alternatif:** yerel worker sayısını 4'ten 2-3'e düşürmek
(çekişmeyi kökten azaltır, yerel süreyi ~2 katına çıkarır). Karar kullanıcıda.

### Bilinmesi gereken yan etki

- **Mobil LCP ölçümü (`npm run seo:lcp`) aynı preview sunucusunu kullanıyor.**
  Yani 2026-08-03'te kaydedilen LCP değerleri kök dışındaki HER sayfa için
  yanlış belge (ana sayfa kabuğu) üzerinden alınmış. Sayılar artık gerçek
  sayfayı ölçecek — yeniden ölçülmeden eski değerlere güvenme.

### Sıradaki iş

1. **`fix/test-suite-flakiness` dalını main'e merge + push kararı — kullanıcıda.**
   Açık kod işi kalmadı; paket 380/380 sıfır flaky.
2. `npm run seo:lcp` YENİDEN ölçülmeli — eski değerler geçersiz (yukarıdaki
   yan etki).
3. Deploy sonrası GitHub Actions'ı ve arama konsolunu izle.
4. Dış tanıtım taslakları (`Documents/outreach/`) hâlâ manuel yayınlanmadı.
5. Plausible analytics hesabı hâlâ açılmadı.

---

## 📌 Önceki Durum (2026-08-04, Opus — test paketi production build'e taşındı, kapsam %100 kapıya bağlandı)

> Alttaki bölümler korunuyor.

### Neredeyiz

- **Tam paket YEŞİL: 375 passed / 0 failed / 4 flaky / 24.4 dk** (öncesi:
  353 passed / 7 failed / 13 flaky / ~1.9 saat).
- Test kapsamı **43/43 route (%100)**, artık build zincirinde zorunlu.
- Branch main'e merge edildi ve push'landı → deploy tetiklendi.

### Bu oturumda yapılanlar

1. **Paket artık dev sunucusunda değil, PRODUCTION BUILD üzerinde koşuyor.**
   `pretest:e2e` önce tam `npm run build` alıyor, `playwright.config.ts`
   testleri `vite preview` ile servis edilen `dist/`e yöneltiyor (port 4175).
   - Ölçüm: ilk `<h1>` dev sunucusunda ana sayfada **17.003 ms**, `/en/`'de
     6.512 ms, sekme URL'inde 5.993 ms; aynı sayfalar production build'de
     **79 / 48 / 46 ms**. 130-215 kat fark. Varsayılan 5 sn'lik doğrulama
     süresiyle paketin bir kısmı ürünü değil **Vite'ın derleme süresini**
     ölçüyordu — süreleri uzatmak bunu çözmez, gizlerdi.
   - CI'da çift build olmasın diye iki iş akışındaki ayrı "Build" adımı
     kaldırıldı; geçitler zaten build'in içinde ve hâlâ testlerden önce koşuyor.
2. **Bunun ortaya çıkardığı GERÇEK kusur — kalıcı olarak belgelendi
   (CLAUDE.md §23.10).** Testler "sayfa hazır mı"yı `waitForSelector('h1')` ile
   soruyordu. Yayınlanan her sayfada arama motoru için üretilen statik gövdenin
   **kendi `<h1>`'i var**, yani bekleme JavaScript çalışmadan çözülüyor ve
   otomatik tekrarı olmayan çağrılar (`count()`, `evaluate()`, `boundingBox()`)
   boş DOM görüyordu. Dev sunucusunda bu tuzak görünmez (kabuk basılmaz).
   - Çözüm: `tests/helpers/app-ready.ts` → `waitForAppReady(page)`.
     **40 dosyada 163 çağrı** dönüştürüldü. Dev'e karşı geriye dönük güvenli.
   - Bu tek düzeltme 6 mobil hatayı ve flaky'lerin çoğunu kapattı.
3. **`topic-pages-ui` artık aynı şeyi 21.715 kez doğrulamıyor.** Eski hâli her
   sekmedeki her butona iki tarayıcı çağrısı yapıyordu (~43.000 gidiş-dönüş) ve
   yaptığı iş boştu: seçici zaten `:visible` filtresi taşırken `toBeVisible()`
   çağrılıyor, `isEnabled()` sonucu hiçbir yerde doğrulanmıyordu.
   - Yeni hâli sekme başına TEK `evaluate` (`tests/helpers/button-audit.ts`) ve
     üstüne gerçekten başarısız olabilecek iki kontrol: 0×0 boyutlu buton
     (bozuk render) ve görünür+enabled olduğu hâlde `pointer-events:none` olan
     buton (tıklanabilir görünüp tıklanmayan).
   - **Denetçinin kendi testi var:** sayfaya bilerek iki bozuk buton enjekte
     edip yakalandığını kanıtlıyor. "Hep yeşil" tek başına kanıt değildir.
4. **Kapsam kapısı: `scripts/check-test-coverage.mjs`** (build zincirinde).
   Her route en az bir testte geçmeli, yoksa `EXCEPTIONS` sözlüğünde
   **gerekçesiyle** bulunmalı. Ölü istisna da hard-fail. Diş testi iki yönde de
   yapıldı. Kapsam listesi artık belgede değil kodda (CLAUDE.md §22.1 not düştü).
5. **Açık iki kapsam boşluğu gerçek testle kapatıldı** (`tests/auth-pages.spec.ts`):
   `/login` (giriş formu gerçekten çalışıyor mu) ve `/qa-assistant` (anonim
   ziyaretçi gerçekten engelleniyor mu — koruma kalkarsa hiçbir hata üretmez).
6. **Slug manifesti kapısındaki gerçek kusur düzeltildi.** Karşılaştırma satır
   sonlarını da içeriyordu; `core.autocrlf=true` olan Windows'ta her
   `git checkout` sonrası içerik hiç değişmediği hâlde build kırılıyordu.
7. **`npm run test:report`** — `tests/*.spec.ts`'i ayrıştırıp her senaryonun
   adımlarını ve beklenen sonucunu gösteren tek dosyalık renkli HTML rapor
   (`reports/test-report.html`, git'e girmez). 50 dosya · 254 senaryo ·
   1150 adım · 1073 doğrulama · %100 sayfa kapsamı.

### Bilinmesi gerekenler

- **4 flaky test duruyor** (ilk denemede düşüp retry'da geçen): ana sayfa EN
  rozeti, `/java` code-trace, hreflang, `/java` sekme testi. 13'ten 4'e indi ama
  "flaky" yeşil demek değil — deterministik paket istenirse sıradaki iş budur.
- Paket artık `npm run dev`'i hiç çalıştırmıyor; dev sunucusu bozulursa test
  yakalamaz. Bilinçli takas.
- Mobil testlerde `ResizeObserver loop` mesajı dar bir filtreyle zararsız
  sayılıyor (sayfa başına tam 1 kez çıkıyor, döngü değil).
- 24.4 dakikanın içinde tam build var.

### Sıradaki iş

1. Deploy sonrası GitHub Actions'ı ve ardından arama konsolunu izle.
2. Kalan 4 flaky testi kökünden çöz (istenirse).
3. Dış tanıtım taslakları (`Documents/outreach/`) hâlâ manuel yayınlanmadı.
4. Plausible analytics hesabı hâlâ açılmadı.

---

## 📌 Önceki Durum (2026-08-03, Opus — Aşama 4: HowTo + yazar/kurum kimliği + mobil LCP)

> Alttaki bölümler korunuyor.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** — main'e MERGE EDİLMEDİ,
  remote'a PUSH EDİLMEDİ. Karar hâlâ kullanıcıda.
- Faz 3'ün **Aşama 4'ü (teknik güven sinyalleri) BİTTİ.** Planda açık kalan
  tek kod işi buydu; geriye yalnızca kullanıcı aksiyonları kaldı.
- Build yeşil, `seo-phase3-integrity` **19/19** (12 → 19, yedi yeni test).

### Bu oturumda yapılanlar

1. **Kurulum sekmelerine `HowTo` şeması (13 bölüm × 2 dil = 26 sayfa).**
   - Kaynak YALNIZCA `installation` ve `steps` blokları. `step-animation`
     bilerek hariç tutuldu: adları adım gibi görünse de o blok bir mekanizma
     anlatır ("Sürüm bir sözleşmedir"), uygulanabilir talimat değil — onu
     prosedür diye işaretlemek sahte bir kurulum rehberi ilan etmek olurdu.
     Kapsam 24 kurulum sekmesinin 13'ü; eksik kapsam yanlış prosedüre yeğdir.
   - **Asıl kazanç yan üründe:** kurulum adımları bu iş sayesinde İLK KEZ
     crawl edilebilir metne girdi. `cmd` alanı ve düz metin adım listeleri
     SEO metnine giren alanlar listesinde YOKTU — yani "docker kurulumu"
     sayfasının gerçek adımlarını Google hiç görmüyordu. Artık statik
     HTML'de numaralı liste olarak basılıyor.
   - ⚠ Google `HowTo` zengin sonuçlarını 2023'te kaldırdı; bu şema Google'da
     görsel bir zengin sonuç ÜRETMEZ. Bing hâlâ kullanıyor ve şema sayfanın
     bir prosedür olduğunu makineye bildiriyor — bu yüzden yine de değerli,
     ama "SERP'te adım listesi çıkacak" beklentisi kurma.
2. **Yazar/kurum kimliği (E-E-A-T).** `Organization` + `Person` düğümleri her
   sayfada, `@id` referansıyla (her sayfada kişiyi yeniden tarif etmek yerine
   tek kimliğe işaret etmek, motorun kişiyi site genelinde tek varlık olarak
   tanımasını sağlar). `WebPage` ve `Course` bu düğümlere `author`/`publisher`
   ile bağlanıyor.
   - **Görünür künye** hem statik HTML'de hem JavaScript sonrası duruyor:
     "Yazan: Hasan Kocaman · QA Otomasyon Mühendisi · Yayıncı: LearnQA.dev ·
     Son güncelleme: 2 Ağustos 2026" (EN'de İngilizce). Yalnızca shell'de
     kalsaydı Google'ın render ettiği sayfada yazar bilgisi kaybolurdu.
   - Metinlerin ve şemanın TEK kaynağı `src/utils/authorship.js`.
3. **Tarih artık üç yerde de aynı.** `scripts/lib/lastmod.mjs` (git commit
   tarihi) → sitemap `lastmod` + şema `dateModified` + görünür künye. Tarayıcı
   git göremediği için build sırasında `src/data/generated/pageUpdated.js`
   üretiliyor (36 sayfa). Shallow clone'da tarih hiç üretilmez, künye tarihsiz
   basılır — yanlış tarih göstermektense hiç göstermemek.
4. **Mobil LCP ölçüm aracı: `npm run seo:lcp`.** Pixel 5 + 4x CPU kısma +
   Slow 4G, sayfa başına 3 koşum, medyan. Rapor `reports/mobile-lcp.json`
   (git'e girmez). `--strict` ile bütçe aşımında çıkış kodu 1.
   - **Ölçüm sonucu (2026-08-03, 7 sayfa): hepsi bütçe içinde.**
     LCP 1204-1984 ms (bütçe 2500), CLS 0.009-0.053 (bütçe 0.1).
     En yavaş: `/en/selenium` 1984 ms, `/selenium` 1960 ms.
   - ⚠ **İlk koşum bilerek ATILIR.** Isınmamış ilk istekte ana sayfa 7566 ms,
     ısındıktan sonra ~1300 ms ölçüldü; ısınma koşumu olmadan medyan bu tek
     aykırı değerle zehirlenip olmayan bir regresyon bildiriyordu.
   - ⚠ Git Bash'te `--routes /` argümanı yol dönüşümüne uğrar (`C:/Program
     Files/Git/` olur). Belirli sayfa ölçeceksen PowerShell kullan.
5. **Guard'lar ve testler.** `check-dist-seo.mjs` artık her sayfada
   yazar/kurum şemasını + görünür künyeyi, kurulum sekmelerinde her HowTo
   adımının gövdede görünür olduğunu hard-fail ile zorluyor.
   `tests/seo-phase3-integrity.spec.ts` 12 → 19 test.

### Doğrulama durumu

- `npm run build` ✓ · içerik bütünlüğü ✓ (42 dosya) · i18n leak 0 ✓.
- Build çıktısı: 26 HowTo sayfası, 24 FAQPage, 70 Course, 688 indekslenebilir
  sekme, 770 sitemap URL.
- `seo-phase3-integrity` 19/19 · `no-internal-jargon` + `seo-phase2-coverage`
  + `seo-section-routes` 36/36 · `i18n-content-toggle` + `mobile-smoke` 40/40.
- Tam `npm run test:e2e` paketi bu oturumda koşulmadı — merge öncesi bir kez
  koşturmak faydalı olur.

### Sıradaki iş

1. **Branch main'e merge + push kararı — kullanıcıda.** Faz 3'te açık kod işi
   KALMADI.
2. Dış tanıtım taslakları (`Documents/outreach/`) hazır ama GitHub About /
   dev.to / Medium'a manuel yayınlanmadı — kullanıcı aksiyonu.
3. Plausible analytics hesabı hâlâ açılmadı; deploy'dan önce açılmazsa ilk
   günlerin ölçümü kalıcı olarak kaybolur.
4. Yayından sonra Google Search Console'da sekme URL'lerinin indekslenmesini
   izle.

---

## 📌 Önceki Durum (2026-08-03, Opus — Faz 3 kod incelemesi: 3 sessiz arıza + manuel rehber + regresyon testleri)

> Alttaki bölümler korunuyor; oradaki mimari kararlar hâlâ geçerli, bu oturum
> onların ÜSTÜNE düzeltme yaptı.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** — main'e MERGE EDİLMEDİ,
  remote'a PUSH EDİLMEDİ. Karar kullanıcıda.
- S1-S5 içeriği ve sekme-URL mimarisi bitti (alttaki bölümler). Bu oturum
  onları **denetledi** ve üç sessiz arıza buldu — üçü de düzeltildi ve
  regresyon testi altına alındı.
- Son commit: `486edb8`. Build yeşil, `seo-phase3-integrity` 12/12.

### Bu oturumda bulunan ve düzeltilen 3 arıza

Üçünün ortak yanı: **hiçbiri hata vermiyordu** — build yeşil, sayfa çalışıyor,
test kırmızı değil. Bu yüzden ancak elle okuyup ölçerek bulundular.

1. **Slug dondurma kuralı 420 bölümün 379'unda ÖLÜYDÜ**
   (`scripts/generate-section-slugs.mjs`). Manifest başlıkları
   `stripLeadingEmoji` ile YAZILIYOR ("What is Selenium?"), katalog başlıkları
   emoji'yi KORUYOR ("🟢 What is Selenium?") — `byTitle.get()` hiç tutmuyordu.
   Sonuç: slug'lar başlığa değil **yalnızca index'e** bağlıydı. Bir veri
   dosyasının ORTASINA bölüm eklenince `/selenium/locators` sessizce BAŞKA bir
   bölümün içeriğini göstermeye başlardı (404 bile değil — yanlış içerik).
   **Düzeltme:** iki tarafta da strip. 420/420 isabet, mevcut slug'larda
   **sıfır** değişiklik (geriye dönük güvenli).
   ⚠️ Yeni bir veri dosyası eklerken bu kuralın hâlâ canlı olduğunu
   `seo-phase3-integrity.spec.ts` doğruluyor — o test kırmızıya dönerse
   URL'lerin içerikten koptuğunu anla.

2. **688 sekme URL'i iç bağlantı grafiğinde ÖKSÜZDÜ**
   (`scripts/generate-static-routes.mjs`). Hub shell'i (sitenin en çok link
   alan sayfası) kendi bölümlerine HİÇ `<a href>` vermiyordu; sekmeler
   yalnızca sitemap'ten keşfedilebiliyordu. Sitemap **keşif** sağlar ama
   tarama önceliğini ve sayfa otoritesini **iç bağlantılar** dağıtır — Faz
   3'ün tüm kazancı buna bağlıyken tek link yoktu.
   **Düzeltme:** `buildSectionSeoIndex` artık hub döngüsünden ÖNCE
   hesaplanıyor, hub gövdesine "Bu dersin bölümleri" listesi basılıyor
   (selenium 13, sql 23, python 19, test-automation 7 — iki dilde).
   İlk sekme (hub kopyası) ve kilitli mülakat sekmesi bilinçli HARİÇ.

3. **SSS bloğu JavaScript sonrası başlık yapısını kaybediyordu**
   (`TopicPage.jsx` `case 'faq'`). Statik shell `<h2>/<h3>` basarken React
   `<div>/<p>` basıyordu — Google'ın render ettiği DOM ile ham HTML ayrışıyor,
   ekran okuyucu da soruları başlıktan başlığa gezemiyordu. `<h3>/<h4>` yapıldı
   (bölüm başlığı `<h2>` olduğu için hiyerarşi h2 → h3 → h4).

### Denetlenip TEMİZ çıkanlar (tekrar bakmaya gerek yok)

- `/test-automation` 8 sekmenin hepsinde video + animasyon + sandbox tam.
- 11 sayfanın SSS blokları iki dilde de eksiksiz; 132 sorunun hepsi benzersiz.
- 688 indekslenebilir sekme metadata'sının tamamı SERP sınırları içinde
  (title ≤62, description 80-180) — tekilleştirme adımı bile sınırı aşmıyor.
- İlk sekme URL'i (`/selenium/what-is-selenium`) runtime'da hub'a onarılıyor;
  canonical hub'da kalıyor (kanibalizasyon önlemi JS sonrası da geçerli).

### Eklenen kalıcı belge ve testler

- **`Documents/seo-phase-3-plan.md` §12.5 — MANUEL TEST REHBERİ.** Kullanıcının
  elle doğrulaması için: hazırlık, sekme URL'leri (7 madde), Ctrl+U ile ham
  HTML (6 madde), SSS/cevap paragrafı cloaking kontrolü, `/test-automation`,
  kanibalizasyon tablosu, **otomatik testin göremediği 5 şey**, yayın sonrası
  GSC takvimi. §12.6 = hangi test dosyası neyi koruyor tablosu.
- **`tests/seo-phase3-integrity.spec.ts` (12 test, 12/12 yeşil).** Yukarıdaki
  üç arızanın üçü de artık bekçi altında; ayrıca metadata sınırları,
  shell↔tarayıcı canonical/başlık tutarlılığı, SSS'nin kilitsizliği.
  ⚠️ `dist/` ister — önce `npm run build`.

### Sıradaki iş

1. Kurulum sekmeleri için `HowTo` şeması, E-E-A-T yazar/kurum şeması, mobil
   LCP ölçümü — henüz başlanmadı (plan §8 Aşama 4).
2. Outreach taslakları (`Documents/outreach/`) hazır ama GitHub About /
   dev.to / Medium'a **manuel yayınlanmadı** — kullanıcı aksiyonu (Aşama 5).
3. Branch main'e merge + push kararı.

---

## 📌 Önceki Durum (2026-08-02, Sonnet — SEO Faz 3 / S1+S4+S5 içerik + FAQ altyapısı)

> Bu oturumun ürettiği içerik hâlâ geçerli; üstteki bölüm onun üstüne
> düzeltme yaptı.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** (main'e MERGE EDİLMEDİ).
- `Documents/seo-phase-3-sonnet-prompts.md`'deki S1-S5 promptları uygulanıyor;
  her prompt kendi commit'inde. Bu oturumda S1, S4, S5 BİTTİ; `faq` blok
  altyapısı (S2'nin önkoşulu) kuruldu. S2 ve S3 sırada.

### Bu oturumda TAMAMLANAN

1. **S1 — `seoAnswer` 9 sayfaya eklendi:** playwright, cypress, python, sql,
   java, docker, jenkins, api-testing, what-is-testing. Build sonu
   "Answer-first paragraphs: 10 sayfa" ile doğrulandı (selenium + bu 9'u).
   Her ikisi 25-120 kelime aralığında, ilk cümle doğrudan tanım.
2. **S4 — 4 sayfanın metadata'sı sorgu diliyle hizalandı:**
   `/qa-mentor` → "yazılım test uzmanı nasıl olunur"/"testerlık öğren",
   `/what-is-testing` → "test türleri nelerdir" eklendi,
   `/manual-testing` → "test senaryosu örnekleri" eklendi,
   `/test-frameworks` → EN title'a birebir "Playwright vs Selenium" yazıldı.
   Ek olarak `/qa-mentor`'a sihirbaz BAŞLAMADAN görünen "Sıfırdan QA mühendisi
   olmak: 6 aşama" özeti eklendi (`ZERO_TO_QA_STAGES`, `qaMentorData.js` +
   `QAMentorPage.jsx`) — sihirbazın kişiselleştirdiği 4 haritadan (MAP_A/B/C1/C2)
   BAĞIMSIZ, genel bir önizlemedir.
3. **S5 — Dış otorite metinleri:** `README.md` üst bölümü QA Learning
   Platform'u yansıtacak şekilde yeniden yazıldı (playground açıklaması
   korunarak altına eklendi). `Documents/outreach/` altında GitHub About
   metni + 3 tanıtım yazısı taslağı (Selenium wait, SQL JOIN, Playwright vs
   Selenium) — hiçbiri build'i etkilemez, salt metin.
4. **`faq` blok tipi + TAM ALTYAPI (S2'nin önkoşulu) — BİTTİ:**
   `TopicPage.jsx`'e `case 'faq':` — `{ items: [{q:{tr,en}, a:{tr,en}}] }`
   şemasıyla, **quiz/mülakat gating'ine tabi değil**. `interview-questions`'ın
   YERİNE geçmez, ayrı bir kilitsiz kaynaktır. Tamamlanan parçalar:
   - `generate-static-routes.mjs`: `faqItemsFromContent()` sayfanın
     `sections`'ındaki `faq` bloklarını toplar; shell'e görünür "Sık Sorulan
     Sorular" bölümü olarak basılır (ana sayfadaki `interviewWarmupData`
     kalıbıyla birebir aynı ilke: ekranda yazan = şemaya giren).
   - `structuredDataFor`'daki `FAQPage` artık ana sayfaya özel DEĞİL — her
     route kendi `faqItems`'ından (≥3 soru) kendi şemasını üretebilir.
   - `check-dist-seo.mjs` görünürlük guard'ı TÜM route'lara genelleştirildi.
   - `tests/seo-phase2-coverage.spec.ts` güncellendi (homepage-only varsayımı
     kaldırıldı, sekme shell'lerinde FAQ ASLA olmadığı ayrı testle doğrulandı)
     + sitemap URL sayısı testi artık sekme URL'lerini de hesaba katıyor
     (daha önce A-fazından kalan bir regresyon riskiydi, bu oturumda yakalandı
     ve düzeltildi — 17/17 yeşil).
   - Build doğrulaması: "Rich results: 68 pages with Course, 2 with FAQPage"
     (S2 içeriği eklenmeden önce beklenen durum — sadece ana sayfa).

5. **S2 — 10 sayfaya `faq` bloğu içerik olarak eklendi — BİTTİ:** Selenium,
   Playwright, Cypress, Python, SQL, Java, Docker, Jenkins, API Testing,
   Yazılım Testi Nedir. Her sayfada ilk sekmenin sonuna, ilk quiz bloğundan
   HEMEN ÖNCE 5-6 soru. Build sonucu: "Rich results: 68 pages with Course,
   **22 with FAQPage**" (10 sayfa × 2 dil + 2 ana sayfa = 22, tam beklenen).
   `tests/seo-phase2-coverage.spec.ts` 17/17 yeşil.
   - **Dosya-yapısı notu (sonraki sayfalar için önemli):** `pythonData.js` ve
     `typescriptData.js` gibi dosyalar `applyTr(enSection, overrides)`
     index-eşleşmesi kullanır (CLAUDE.md §23.4) — yeni blok EKLERKEN mevcut
     override index'lerinden (0-8 gibi) SONRAKİ, henüz override'ı olmayan bir
     konuma eklendi (quiz'den hemen önce), böylece hiçbir override kaymadı.
     Yeni bir applyTr dosyasına dokunursan önce override anahtarlarının hangi
     indekslere kadar gittiğini say.
   - `sqlData.js`/`selenium`/`playwright`/`cypress`/`java`/`docker`/`jenkins`
     dual-tree (ayrı tr/en blok dizileri) — paylaşılan bilingual `faq` const'ı
     HER İKİ ağaca da aynı referansla eklendi (`sqlIntroWhyFilm` ile aynı kalıp).
   - `apiTestingData.js`/`whatIsTestingData.js` tek ağaçlı (sections shared) —
     tek insertion yeterli.

6. **`/test-automation` route + altyapı + S3 içeriği — BİTTİ:** "test
   otomasyonu" sorgusunun TEK sahibi yeni hub sayfası. Route (`App.jsx`),
   SEO metadata (`seo.js`), sayfa bileşeni (`TestAutomationPage.jsx`) ve
   veri modülü kaydı (`scripts/lib/topicDataModules.mjs`) eklendi — sekme-URL
   sistemine OTOMATİK dahil oldu (`npm run seo:section-slugs` çalıştırıldı:
   31 sayfa/420 bölüm, 8'i yeni). 8 sekme: Test Otomasyonu Nedir, Ne Zaman
   Otomatikleştirilir, Araç Seçimi, İlk Otomasyon Testin, Maliyet ve ROI,
   Otomasyon Neden Başarısız Olur, Kariyer, SSS. Her sekmede video-scene +
   step-animation + code-playground üçlüsü + 4 katmanlı analoji içeren
   `simple-box`. İki `link-grid` bloğuyla Selenium/Playwright/Cypress/Appium
   ve API testi/Python/Jenkins/QA Mentor'a gerçek iç link.
   - Build sonucu: 46 route (+1), 344 indekslenebilir sekme (+7), "Answer-first
     paragraphs: 11 sayfa" (+1), "70 with Course, 24 with FAQPage" (+2/+2).
   - `tests/video-scene.spec.ts`'e temsili render testi eklendi (1/1 yeşil).
   - `tests/seo-section-routes.spec.ts` + `seo-phase2-coverage.spec.ts`
     27/27 yeşil. Canlı smoke test: sekmeler arası gezinti + link-grid'in
     gerçekten `/selenium`'a yönlendirdiği + `/qa-mentor` özetinin göründüğü
     doğrulandı.
   - **Ders:** İlk yazımda `table`/`list` bloklarının şemasını YANLIŞ
     varsaydım (`headers:{tr:[...],en:[...]}` gibi tüm diziyi bilingual
     sarmak) — gerçek şema HER HÜCRE/HER ÖĞE ayrı ayrı `{tr,en}` olmalı
     (`TopicPage.jsx` `tx()` her hücreyi tek tek çağırıyor). Yeni bir blok
     tipi kullanmadan önce renderer'ın gerçek beklediği şekli oku.
   - 3 `code-playground` bloğunda Türkçe karakterli düz string starterCode/
     solutionCode i18n taramasında yakalandı, `{tr,en}` ikili formata çevrilip
     düzeltildi (CLAUDE.md §8 kuralı).

### Tam E2E doğrulaması yapıldı (2026-08-02 gece) — S1-S5 kapandı

`npx playwright test` tam paket: **340 passed, 8 failed, 6 flaky (1.9h)**.
8 "failed" tek tek izole edilerek incelendi — hiçbiri bu oturumun S1-S5
işinden kaynaklanan gerçek bir regresyon DEĞİL:

- `seo-section-routes.spec.ts` (3 test, /selenium/wait-strategies etrafında)
  ve `topic-pages-ui.spec.ts` (/sql, /typescript, /python) — tam paket
  `fullyParallel` + çoklu worker'la aynı anda en büyük data chunk'larını
  (selenium ~650KB, sql/typescript/java 800KB-1.1MB) Vite dev server'a
  isteyince transform süresi varsayılan 5000ms `expect` timeout'unu aşıyor.
  **Kanıt:** aynı testler `--workers=1` (seo-section-routes: 10/10) ve
  `--workers=2` (topic-pages-ui: 29/29, /sql-/typescript-/python dahil)
  ile TAM YEŞİL. Gerçek bug değil, dev-server kaynak çekişmesi.
- `analytics-events.spec.ts` ve `homepage-recommended-badges.spec.ts` —
  izole `--workers=1` koşumda da başarısız KALDI, ama bu iki test dosyası
  ve etkiledikleri `HomePage.jsx` bu branch'te `main`'e göre **hiç
  değişmemiş** (`git diff main --stat` boş) — bu oturumdan önce de var olan
  flaky testler, S1-S5 ile ilgisi yok.
- 6 flaky (retry'de geçti) hepsi de dokunulmamış sayfalar/akışlar
  (interview-grading-and-reset, other-pages-ui, portfolio-page) — aynı
  paralel-yük deseni.

**Sonuç:** SEO Faz 3 S1-S5 içeriği (seoAnswer, FAQ altyapısı, /test-automation,
metadata hizalama, outreach) hiçbir mevcut testi bozmadı.

### Sıradaki iş

1. Kurulum sekmeleri için `HowTo` şeması, E-E-A-T yazar/kurum şeması + mobil
   LCP ölçümü — henüz başlanmadı (plan §8 Aşama 4).
2. Outreach taslakları (`Documents/outreach/`) hazır ama GitHub About /
   dev.to / Medium'a **manuel yayınlanmadı** — kullanıcı aksiyonu (plan §8
   Aşama 5).
3. Branch `feature/seo-phase-3-serp-rankings` main'e merge edilmedi, remote'a
   push edilmedi — karar kullanıcıda.

---

## 📌 Önceki Durum (2026-08-02, Opus — SEO Faz 3 / Sekme URL'leri)

> Çelişki olursa bu bölüm günceldir.

### Neredeyiz

- **Branch: `feature/seo-phase-3-serp-rankings`** (main'e MERGE EDİLMEDİ,
  karar kullanıcıda). `main` bir önceki oturumun sonunda (`aa96dd1`).
- Yeni hedef: `learnqa` marka sorgusundaki 1. sıralığı **markasız** sorgulara
  taşımak ("selenium nedir", "test otomasyonu", "testerlık öğren", "playwright
  nedir" + İngilizce karşılıkları).
- Plan: `Documents/seo-phase-3-plan.md` (§0'da Opus/Sonnet görev dağılımı).
  Sonnet promptları: `Documents/seo-phase-3-sonnet-prompts.md`.

### Bu oturumda TAMAMLANAN (Opus tarafı — A fazı)

**Teşhis (ölçüldü, tahmin değil):** Sitenin içeriğinin ~%93'ü Google'a
görünmüyordu. `/selenium` sayfasında 15 sekme / 428 blok var ama statik
HTML'de yalnızca **665 kelime**; sekmeler React state'iydi, URL'i yoktu, tek
URL 15 farklı arama niyetiyle yarışıyordu.

**Çözüm: her dikey sekmeye kendi URL'i** (`/selenium/wait-strategies`).

| Ne | Nerede |
|---|---|
| Slug manifesti (dondurulmuş, 30 sayfa / 412 bölüm) | `src/data/generated/sectionSlugs.js` |
| Manifest üreticisi (`--check` modu build'de) | `scripts/generate-section-slugs.mjs` |
| Slug + metadata türetme (build ve runtime ORTAK) | `src/utils/sectionSeoText.js` |
| Katalog, ince içerik kararı, tekilleştirme | `scripts/lib/sectionSeo.mjs` |
| Ders sayfası → veri modülü tablosu (tek kaynak) | `scripts/lib/topicDataModules.mjs` |
| Runtime slug ↔ sekme eşlemesi | `src/utils/sectionRoutes.js` |
| Route'lar (`SECTION_PAGE_ELEMENTS`, 30 sayfa) | `src/App.jsx` |
| Sekme ↔ URL senkronu, sayfa-düzeyi `basePath` | `src/components/TopicPage.jsx` |
| Çalışma zamanı sekme başlığı/description'ı | `src/lib/seoOverride.js` + `SeoMeta.jsx` |
| Sekme shell'leri (gerçek metin + kardeş linkler) | `scripts/generate-static-routes.mjs` |
| Sitemap + gerçek `lastmod` | `scripts/generate-seo-files.mjs` |
| Guard'lar (hepsi hard-fail) | `check-seo.mjs`, `check-dist-seo.mjs` |
| Testler (10/10 yeşil) | `tests/seo-section-routes.spec.ts` |

**Ölçülen sonuç:** sitemap 94 → **754 URL**; üretilen shell 94 → **918**;
`/selenium` ailesinin crawl edilebilir metni 665 kelime / 1 URL → **7.290
kelime / 16 URL**; indekslenebilir sekme (dil başına) **337**.

**Dikkat edilmesi gereken kararlar (yeniden tartışmadan önce oku):**
- Slug iki dilde de AYNI (İngilizce başlıktan). `basename="/en"` path'i
  paylaştırdığı için dile göre slug iki yönlü eşleme tablosu isterdi.
- İlk sekme hub URL'inde kalır; shell'i üretilir ama canonical'ı hub'a gider
  (kanibalizasyon önlemi). Üstüne `noindex` KONMAZ — çelişkili sinyal olur.
- Mülakat sekmeleri (quiz kilidi arkasında) ve 180 kelime altı bölümler
  sitemap dışı + `noindex`.
- Bilinmeyen slug 404 vermez, hub'a düşer, adres kendini onarır.
- `TopicPage`'deki 9 adet `location.pathname` kullanımı `basePath`'e çevrildi
  (ilerleme, ustalık, yorumlar, rozet sayfa düzeyindedir — sekme başına
  parçalanmamalı). Yeni kod yazarken bu ayrımı koru.
- `seoOverride` effect'inin bağımlılıklarında `sections` ZORUNLU: büyük
  sayfalar önce boş bölümlü stub ile mount olup veriyi arkadan yüklüyor.
- `.github/workflows/deploy.yml` build job'ına `fetch-depth: 0` eklendi —
  sığ klonda `lastmod` güvenilmez olduğu için hiç yazılmıyor.

### Sıradaki iş

**Opus (altyapı, sırayla):**
1. ✅ `seoAnswer` altyapısı BİTTİ — alan `hero`'nun yanında, hero altında
   görünür render ediliyor, statik HTML'de `<h1>` sonrası ilk paragraf,
   `check-dist-seo.mjs` üç kuralı zorluyor (iki dilde dolu, 25-120 kelime,
   gövdede gerçekten basılı). Referans: `/selenium`. Kalan 9 sayfa Sonnet'te.
2. `FAQPage` altyapısı — kilitsiz kaynaktan üretim + görünürlük guard'ı.
   (S2 promptu buna bağlı.)
3. `/test-automation` route + metadata + sayfa iskeleti. (S3 promptu buna bağlı.)
4. Kurulum sekmeleri için `HowTo` şeması.
5. E-E-A-T: yazar/kurum şeması + görünür "son güncelleme" tarihi.

**Sonnet:** `Documents/seo-phase-3-sonnet-prompts.md` içindeki S1-S5.
S3/S4/S5'in bağımlılığı yok, hemen başlatılabilir.

**Kullanıcı:** yayından sonra Google Search Console'da sekme URL'lerinin
indekslenmesini izle (aylık ritim planın §9'unda).

### Bilinen not

- Build süresi sekme shell'leri yüzünden uzadı (918 HTML dosyası üretiliyor).
- `dist` boyutu arttı; GitHub Pages artifact sınırının çok altında.

---

## 📌 Önceki Durum (2026-08-02, Sonnet — portfolyo: görev yönlendirme + "Sıradaki Görev")

> Bu bölüm, yeni bir oturumun 30 saniyede duruma hâkim olması için yazıldı.
> Ayrıntılar aşağıdaki tarihli bölümlerde; **çelişki olursa bu bölüm günceldir.**

### Neredeyiz

- **`feature/seo-phase-2`, `main`'e fast-forward merge edildi ve `origin/main`'e
  push edildi** (`aa96dd1`, tam `npm run test:e2e` paketi — 342/342 PASS,
  14.3 dk — geçtikten sonra). SEO Faz 2, Portfolio Builder ve test/otomasyon
  borcu kapatma işlerinin TAMAMI artık `main`'de; production deploy
  `.github/workflows/deploy.yml` üzerinden tetiklendi. Bir önceki bölümdeki
  (ve altındaki onlarca "Önceki Durum" kaydındaki) "main'e merge kararı
  kullanıcıda" notu **ÇÖZÜLDÜ.**
- Aşağıdaki tüm tarihli bölümler artık **tarihsel kayıt** — o işler main'e
  gitti, ayrıntı git log'da duruyor. Yeni oturum bu bölümden devam etsin.
- `feature/seo-phase-2` local/origin'de hâlâ duruyor (silinmedi) — main artık
  onunla aynı commit'te, branch'e devam eden bir iş yoksa temizlik kullanıcı
  kararı.

### Bu oturumda yapılanlar

1. **Portfolyo görev kartları artık dersin KENDİ sekmesine götürüyor
   (kullanıcı raporu).** `/portfolio`'daki "aç" linkleri önceden sadece
   route'a gidiyordu, kullanıcı her zaman sayfanın ilk sekmesinde açılıyordu —
   görevin gerçek konumu ne olursa olsun. `missionCatalog`'taki 18 ders
   görevinin her birine, o görevin GERÇEKTEN bulunduğu sekme indeksini elle
   tespit edip (`seleniumData.js` vb. 12 veri dosyası tek tek grep'lendi)
   `openTab` alanı eklendi; `TopicPage`'in zaten var olan
   `location.state.openTab` mekanizmasına bağlandı (aynı mekanizma HomePage
   "devam et" ve mentor önerilerinde de kullanılıyor, yeni bir altyapı
   yazılmadı).
   - Yeni `tests/portfolio-mission-tabs.spec.ts` (36 test): 18 görevin
     `openTab`'i data dosyasından okunan GERÇEK sekme indeksiyle eşleşiyor mu
     (config drift bekçisi, tarayıcı açmaz) + 18 görevin `taskTitle`i
     tanımlı ve `title`dan farklı mı (aşağıya bkz).
   - `tests/portfolio-page.spec.ts`'e 4 yeni test: boş durum CTA'sı + görev
     kartı "aç" linki gerçekten doğru sekmeyi (ikinci tıklama olmadan) açıyor,
     kataloğun tamamı bitince "Sıradaki Görev" kartı kayboluyor.
2. **Yeni "🎯 Sıradaki Görev" kartı** (kullanıcı isteği: "bana yeni görev
   vermiyor"). `/portfolio` önceden sadece GEÇMİŞE bakıyordu (AGGREGATOR
   mimarisi korunuyor — kendi state'i yok, `missionCatalog` sırasına göre ilk
   TAMAMLANMAMIŞ görevi `portfolioSnapshot.js`'te türetiyor). Tüm 18 görev
   bitince kart sessizce kayboluyor, olmayan bir görev uydurulmuyor.
   - **🐛 Kullanıcı ikinci bir hata buldu ve düzeltildi:** kart, "İnşa
     Ettiklerin"deki GERİYE bakan `title`i ("Login smoke testi kur**dun**")
     kullanıyordu — henüz yapılmamış bir görev BİTMİŞ gibi görünüyordu. Her
     18 görev için ayrı, İLERİYE bakan bir `taskTitle` eklendi ("Login smoke
     testi kur**mak**"); `title` "İnşa Ettiklerin"de aynen kalıyor.
3. **Değişen dosyalar:** `src/data/portfolioData.js` (18× `openTab` + 18×
   `taskTitle` + 3 yeni UI metni), `src/lib/portfolioSnapshot.js`
   (`buildNextMission()`), `src/components/PortfolioPage.jsx` (yeni bölüm +
   `state={{openTab}}` geçen linkler), `tests/portfolio-page.spec.ts` (4 yeni
   test), `tests/portfolio-mission-tabs.spec.ts` (yeni, 36 test).

### Doğrulama durumu (bu oturumun sonu)

- İçerik bütünlüğü ✓ · i18n leak taraması ✓ (0 regresyon) · `npm run build` ✓.
- Portfolyo test dosyaları: 47/47 PASS (`portfolio-page.spec.ts` 11 +
  `portfolio-mission-tabs.spec.ts` 36).
- Tam `npm run test:e2e` paketinin bu oturumdaki sonucu (merge/push kararı
  buna bağlı) — bkz. "Neredeyiz".

### Sıradaki iş

- **A. Kullanıcı tarafı (kod işi değil, hâlâ açık):** Plausible analytics
  hesabını aç (`DEPLOY.md` §8) — açık kaldıkça `/en` geçişinin ilk günlerine
  ait ölçüm kalıcı olarak kayboluyor. Deploy sonrası GSC'ye sitemap'i yeniden
  gönder (80 URL).
- **B. Küçük, net kod işleri (düşük öncelik, sıraya alınabilir):**
  `/qa-mentor`'daki rozet şeridinin yanına portfolyoya link, portfolyo
  paylaşım kartı görseli (`<canvas>`), bilinmeyen `/en/...` yollarında gerçek
  bir 404 arayüzü olmaması (çöküyor değil, sadece ideal değil).

---

## 📌 Önceki Durum (2026-08-02, Sonnet — mülakat bölümü kompaktlaştırma + yayın kapısı otomasyonu)

### Neredeyiz

- **Branch: `feature/seo-phase-2`** — `main`'in **28 commit** önünde (bu oturumun
  commit'leri hariç), çalışma ağacı bu oturumun sonunda commit edildi.
  **`main`'e merge EDİLMEDİ; karar hâlâ kullanıcıda.**

### Bu oturumda yapılanlar

1. **Ana sayfadaki "Mülakat Isınma Turu" kompakt hale getirildi.** Kullanıcı
   bölümün çok yer kapladığını, sadece içerik hakkında bilgi verip asıl
   soru-cevaba tıklamayla ulaşılması gerektiğini belirtti. `InterviewWarmup.jsx`
   + `interviewWarmupData.js`: başlık/açıklama metni kısaltıldı, "amaç" kutusu
   tek satırlık şeride indirildi, kart başına padding/font küçültüldü, "cevabı
   göster" + "bu konuyu çalış →" aynı satıra alındı. Tıklama hedefi
   DEĞİŞMEDİ (kullanıcı seçimi: ilgili dersin sayfasına gitmeye devam ediyor).
   Ölçüm: 1280px genişlikte bölüm yüksekliği ~950px → **706px**. FAQPage şeması
   etkilenmedi (soru metinleri hâlâ tam görünür, şema sadece bunu şart koşuyor).
   `tests/interview-warmup.spec.ts` 6/6 PASS.
2. **`DEPLOY.md` §9'daki doğrulama komutlarında gerçek bir kusur bulundu ve
   düzeltildi.** Kullanıcı `curl http://localhost:4173/en/selenium` (sonda `/`
   OLMADAN) çalıştırınca hem TR hem EN'de `lang="tr"` gördü. Kök neden: `vite
   preview`'ın statik sunucusu (`sirv`), sondaki `/` olmadan bir alt-route
   istendiğinde o route'un shell'ini bulamıyor ve sessizce KÖK `dist/index.html`'e
   (her zaman TR) düşüyor — 404 vermeden, 200 ile. `dist/` çıktısının kendisi
   doğruydu (`dist/en/selenium/index.html` içinde `lang="en"` doğru duruyordu);
   sorun yalnızca yerel test yönteminde. DEPLOY.md'deki 10+ curl komutuna/URL'e
   sonda `/` eklendi + bu kısıtı açıklayan bir uyarı notu kondu. Ayrıca **iki yan
   bulgu** düzeltildi: (a) `dist/404.html` yerelde YOKTUR (yalnızca
   `.github/workflows/deploy.yml`'deki "Prepare GitHub Pages compatibility
   files" adımı üretir) — F1'deki `ls dist/404.html` beklentisi netleştirildi;
   (b) kullanıcının PowerShell konsolunda Türkçe karakterler bozuk görünüyordu
   (`E─şitimi`) — dosyanın kendisi doğru UTF-8, sorun konsolun kod sayfası
   (`chcp 65001` notu eklendi).
3. **D1 (mükerrer başlık kontrolü) otomatikleştirildi.** Önceden DEPLOY.md'de
   elle koşulan, çok satırlı bir `node -e` komutuydu — kullanıcının PowerShell
   oturumunda hem Türkçe-özgü karakterler hem de bir satır (`for (const r of
   ROUTE_SEO)`) kayboldu (muhtemelen konsol kod sayfası/yapıştırma kaynaklı).
   Artık `scripts/check-seo.mjs`'te kalıcı bir kontrol (`seenTitles` Map'i,
   mevcut `seenDescriptions` ile simetrik) — `npm run build`/`seo:check`
   sırasında otomatik çalışıyor. Diş doğrulandı (geçici mükerrer title enjekte
   edildi → build kırıldı → geri alındı → yeşile döndü).
4. **YENİ: `npm run test:release-gate` — DEPLOY.md §9'un A1/A5/A6/A7/A8/D3/F1/F2
   maddelerinin otomatik karşılığı.** Kullanıcı isteği: "bu kontrolleri testlere
   ekle". Yeni dosyalar: `playwright.release-gate.config.ts` (ayrı port 4174,
   `pretest:release-gate` önce TAM `npm run build` koşturur, `reuseExistingServer:
   false` — bilerek, bu bir yayın kapısı, eski/unutulmuş bir preview sunucusuna
   güvenmemeli), `tests-release-gate/deploy-gate.spec.ts` (72 test).
   - **Neden ayrı bir katman:** `tests/seo-phase2-coverage.spec.ts` dist
     dosyalarını DOSYA SİSTEMİNDEN okur — sunucunun HTTP davranışını (trailing-
     slash çözümü gibi) test etmez. `tests/seo-i18n-routing.spec.ts` ise `npm
     run dev` üzerinden HİDRATE OLMUŞ uygulamayı test eder — ham, JS öncesi
     HTML'i göremez. Bu suite tam olarak o iki testin GÖRMEDİĞİ katmanı — HTTP
     üzerinden servis edilen ham shell'i — test ediyor; madde 2'deki regresyon
     tam olarak burada yakalanabilirdi.
   - **Kapsam:** A5 artık 40 route'un TAMAMINDA (yalnızca örnek bir sayfada
     değil) hash→temiz-URL yönlendirmesini doğruluyor. A1/A6/A7/D3/F2 5 temsili
     route × 2 dil üzerinde (`/`, `/selenium`, `/git-github`, `/portfolio`,
     `/docker`) HTTP üzerinden title/lang/hreflang/canonical/gövde-içerik
     kontrolü yapıyor. F1 derin bağlantı + sert yenileme. A8 bilinmeyen `/en`
     yolunun çökmediğini doğruluyor (**not:** gerçek bir "sayfa bulunamadı"
     arayüzü YOK — React Router'da wildcard route tanımlı değil, yalnızca boş
     içerik + çalışan widget'lar render oluyor; bu test yalnızca "sunucu hatası/
     JS çökmesi yok" asgari barını doğruluyor, gerçek bir 404 UI eklemek ayrı
     bir ürün kararı, kapsam dışı bırakıldı).
   - **Doğrulama:** 72/72 PASS (37s). Diş doğrulandı: `dist/en/selenium/index.html`'e
     elle `lang="tr"` enjekte edildi → ilgili test kırıldı → geri alındı → yeşile
     döndü.
   - Otomatikleşmeyen maddeler (D2 SERP gözle, C2 rich-results validator gözle,
     C3 Course alan doğruluğu gözle, E1/E2 analytics — yalnızca canlı domainde
     ölçülebilir, F3 post-deploy GSC adımları) DEPLOY.md'de elle kalmaya devam
     ediyor; bu köşe niyetli, otomatikleştirilebilir değil.

### Doğrulama durumu (bu oturumun sonu)

- `npm run build` ✓ (birden fazla kez, tutarlı) · `node scripts/check-seo.mjs` ✓
  (46 route, 0 mükerrer title/description) · içerik bütünlüğü ✓ · i18n baseline 0 ✓.
- `tests/interview-warmup.spec.ts` 6/6 ✓ · `npm run test:release-gate` 72/72 ✓ (37s).
- Bu oturum ana `npm run test:e2e` paketini yeniden koşmadı (değişiklikler SEO/
  doküman/yeni-ayrı-suite kapsamında, mevcut 303 teste dokunmadı) — bir sonraki
  oturumda merge öncesi tam paketi bir kez daha koşturmak faydalı olur.

### Sıradaki iş — öncelik sırasıyla

**A. Kullanıcı kararı bekleyen (kod işi yok):**
1. **`main`'e merge kararı.** Yayını engelleyen açık bulgu YOK. `npm run
   test:release-gate` artık DEPLOY.md §9'un çoğunu otomatik doğruluyor —
   merge öncesi tek komut yeterli, öncesinde D2/C2/C3'ü gözle bir kez geçmek
   yine de önerilir (~10 dk, otomatikleşmeyen kısımlar).
2. **Plausible hesabını deploy'dan ÖNCE aç** (`DEPLOY.md` §8/E1). Sonra
   açılırsa `/en` geçişinin ilk günlerine ait ölçüm kalıcı olarak kaybolur.
3. Deploy sonrası: GSC'ye sitemap'i yeniden gönder (80 URL).

**B. Küçük, net kod işleri (hazır, sıraya alınabilir):**
1. **Portfolyo giriş noktası eksik:** `/qa-mentor`'daki rozet şeridinin yanına
   "kazandıklarını portfolyonda gör" linki (ana sayfa kartı zaten var).
2. **Portfolyo paylaşım kartı görseli** (`<canvas>` + `toDataURL`) — düşük
   öncelik, `Documents/portfolio-builder-plan.md` §7.2'de park edilmiş.
3. **(Düşük öncelik, keşfedildi ama düzeltilmedi) `/en/olmayan-bir-sayfa` gibi
   bilinmeyen bir yol gerçek bir 404 arayüzü göstermiyor** — React Router'da
   wildcard route yok, yalnızca boş içerik alanı + floating widget'lar render
   oluyor. Çökmüyor (release-gate A8 bunu doğruluyor) ama kullanıcı deneyimi
   ideal değil. Gerçek bir "sayfa bulunamadı" bileşeni eklemek ayrı bir ürün
   kararı — henüz istenmedi.

**C. Bilinen kısıtlar (aksiyon gerekmiyor, bilinsin):**
- `npm run test:interview-flows` art arda koşulunca Groq rate limit'ine
  takılabiliyor. Tek tek koşulunca geçer. CI'da zaten koşmuyor.
- CI'da Supabase auth gerektiren testler bilinçli skip ediliyor (§23.8).
- `npm run test:release-gate` her koşumda TAM bir `npm run build` tetikler
  (~25-60s) — bilerek: bu bir yayın kapısı, gerçekten yayınlanacak dist'i
  doğrulamalı, eski/yarım bir build'i değil.

---

## 📌 Önceki Durum (2026-08-01, Opus)

> Bu bölüm, yeni bir oturumun 30 saniyede duruma hâkim olması için yazıldı.
> Ayrıntılar aşağıdaki tarihli bölümlerde; **çelişki olursa bu bölüm günceldir.**

### Neredeyiz

- **Branch: `feature/seo-phase-2`** — `main`'in **28 commit** önünde, çalışma
  ağacı temiz, `origin`'e push edildi. **`main`'e merge EDİLMEDİ; karar
  kullanıcıda.**
- Branch şu üç işi bir arada taşıyor: **SEO Faz 2** (dil-ayrık `/en` URL, iki
  dilli metadata, statik shell'ler, kod bölme, analytics), **Portfolio Builder**
  (`/portfolio`) ve **test/otomasyon borcunun kapatılması**.

### Bu oturumda yapılanlar (7 commit: `df4d403` → `d9fc3b7`)

1. **`/portfolio` çekirdeği** (`df4d403`, `0335b24`) — çözülen görevleri,
   kapatılan bug'ları, ustalık ve rozetleri toplayan AGGREGATOR sayfa. Kendi
   ilerleme state'i tutmaz. En kritik nokta: `xp.js` anahtarı sayfa URL'inden
   türediği için portfolyo global tarama yapar (aksi hâlde sessizce boş görünür).
   Ayrıntılı manuel test rehberi: `Documents/portfolio-builder-plan.md` §13.
2. **Test kapsamı denetimi** (`2066caa`) — §10/§22 kurallarıyla mevcut listeler
   karşılaştırıldı; 3 kapsam boşluğu kapatıldı ve **mülakat akış suite'inde
   yıllardır gizli duran gerçek bir hata** bulunup düzeltildi (sekme takip
   değişkeni kilit kontrolünden sonra eskiyor, test olmayan bir butonu sonsuza
   kadar bekliyordu → 300 s'de takılan test 39 s'de geçiyor).
3. **SEO Faz 2'nin test edilmeyen 5 maddesi E2E'ye alındı** (`38780e1`) —
   sitemap bütünlüğü, JSON-LD, kod bölme, analytics (4 olayın 4'ü) ve TÜM
   ders görevleri (18 mission, önceden 18'de 1).
4. **Yayın kapısı rehberi** (`794d83b`) — `DEPLOY.md` §9: geri dönüşü pahalı
   değişiklikler için ayrıntılı yayın öncesi manuel doğrulama + karar tablosu.
5. **İki yayın öncesi SEO riski kapatıldı** (`d9b5f7a`) — korumalı/işlevsel
   sayfalar sitemap'ten çıkarıldı (`noindex` + `robots` meta), görünmeyen
   içeriği işaret eden FAQPage şeması kaldırıldı.
6. **Mülakat Isınma Turu** (`d9fc3b7`) — ana sayfada gate'siz, görünür 12 soru;
   FAQPage şeması politikaya uygun biçimde geri kazanıldı. Gating (AC 04)
   değişmedi.

### Doğrulama durumu (bu oturumun sonu)

- `npm run build` ✓ — 80 sitemap URL, 90 statik shell, 68 sayfa `Course`,
  2 sayfa `FAQPage` (görünür içerikle doğrulandı), 10 noindex shell.
- İçerik bütünlüğü ✓ (41 dosya) · i18n baseline 0 ✓ · mülakat denetimi 27/27 ✓.
- **Tam E2E paketi: 303/303 PASS (14.6 dk), 0 hata.** (Oturum başında 253'tü;
  bu oturumda eklenen kapsamla 303'e çıktı.)
- Auth gerektiren suite'ler (§23.8) ve `test:interview-flows` bu koşumda yok —
  ikisi de bilinçli olarak ana pakette değil.

### Sıradaki iş — öncelik sırasıyla

**A. Kullanıcı kararı bekleyen (kod işi yok):**
1. **`main`'e merge kararı.** Yayını engelleyen açık bulgu KALMADI. Merge =
   canlı deploy (GitHub Pages). Öncesinde `DEPLOY.md` §9'daki A ve F
   bölümlerini gözle geçirmek önerilir (~15 dk).
2. **Plausible hesabını deploy'dan ÖNCE aç** (`DEPLOY.md` §8). Sonra açılırsa
   `/en` geçişinin ilk günlerine ait ölçüm kalıcı olarak kaybolur — geri
   doldurulamaz.
3. Deploy sonrası: GSC'ye sitemap'i **yeniden gönder** (artık **80 URL**),
   1-2 hafta sonra hreflang hatalarına bak.

**B. Küçük, net kod işleri (hazır, sıraya alınabilir):**
4. **Mükerrer başlık denetimi otomatik değil.** `check-seo.mjs` mükerrer
   *description*'ı build'de kırıyor ama *title*'ı hiç kontrol etmiyor. Şu an
   mükerrer YOK; eksik olan bekçi. Komut `DEPLOY.md` §9.4 D1'de hazır —
   `check-seo.mjs`'e taşımak ~10 satırlık iş.
5. **Portfolyo giriş noktası eksik:** `/qa-mentor`'daki rozet şeridinin yanına
   "kazandıklarını portfolyonda gör" linki (ana sayfa kartı zaten var).
6. **Portfolyo paylaşım kartı görseli** (`<canvas>` + `toDataURL`) — düşük
   öncelik, `Documents/portfolio-builder-plan.md` §7.2'de park edilmiş.

**C. Bilinen kısıtlar (aksiyon gerekmiyor, bilinsin):**
- `npm run test:interview-flows` art arda koşulunca Groq rate limit'ine
  takılabiliyor (`grade-interview-answer` 200 dönmez). Tek tek koşulunca geçer.
  CI'da zaten koşmuyor.
- CI'da Supabase auth gerektiren testler bilinçli skip ediliyor (§23.8) —
  altyapı kısıtı, yeniden teşhis etmeye gerek yok.

---

## 📌 Önceki Durum (2026-08-01, Opus — ana sayfada Mülakat Isınma Turu + FAQPage geri kazanıldı)

- **Aktif branch: `feature/seo-phase-2`.** Kullanıcının fikri uygulandı: mülakat
  soruları %60 barajının arkasında olduğu için FAQPage şeması kaldırılmıştı;
  şimdi **ana sayfada herkese açık, gate'siz bir "Mülakat Isınma Turu"** var ve
  şema oradan üretiliyor. Gating kuralına (AC 04) DOKUNULMADI — ders sonundaki
  AI değerlendirmeli mülakat pratiği aynen barajın arkasında.
- **Yeni dosyalar:** `scripts/generate-interview-showcase.mjs` (build-time
  örnekleyici), `src/data/generated/interviewShowcase.js` (üretilen),
  `src/data/interviewWarmupData.js` (bölümün metinleri, STRICT_ZERO),
  `src/components/InterviewWarmup.jsx`, `tests/interview-warmup.spec.ts` (6 test).
- **Neden build-time:** sorular 12 ayrı ders dosyasında ve o dosyalar 300 KB-1 MB.
  Ana sayfanın onları runtime import etmesi ilk boyayı yıkardı (S1'de tam tersi
  yapılmıştı). Script Node'da okuyup yalnızca seçilenleri küçük bir dosyaya yazar.
- **Seçim deterministik:** rastgelelik yok — her build aynı çıktı. 12 sayfadan
  1'er soru, seviye rotasyonuyla (**4 basic / 4 intermediate / 4 advanced**).
  TR/EN eşlemesi indeksle yapılır; iki ağacın soru sayısı tutmuyorsa o sayfa
  ATLANIR (uydurma eşleme yerine sessizce dışarıda bırakmak — §23.4 dersi).
  8 sorunun altına düşerse script build'i kırar.
- **Şema kuralı kalıcılaştı:** FAQPage yalnızca ana sayfada olabilir VE şemadaki
  her sorunun aynı sayfanın GÖRÜNÜR gövdesinde bulunması zorunlu.
  `check-dist-seo.mjs` şemayı PARSE edip bunu doğrular (hard-fail).
  - **🐛 Kontrolün ilk hâli yanlış yöndeydi:** kaynak listeyi geziyordu, şemayı
    değil — şemaya elle görünmeyen bir soru eklense KAÇIRIRDI. Sonda testiyle
    yakalandı ve yön düzeltildi (artık şemanın kendisi geziliyor). E2E bekçisi
    zaten doğru yöndeydi.
- **Doğrulama:** build ✓ (80 sitemap URL, 90 shell, **2 sayfada FAQPage —
  görünür içerikle doğrulandı**, 68 Course, 10 noindex shell) ·
  content-integrity ✓ · i18n baseline 0 ✓ · `interview-warmup` 6/6 ·
  `seo-phase2-coverage` 16/16 · görünürlük bekçisinin dişi doğrulandı
  (şemaya görünmeyen soru enjekte edildi → hem build kontrolü hem E2E kırıldı).

---

## 📌 Önceki Durum (2026-08-01, Opus — yayın öncesi 2 SEO riski kapatıldı)

- **Aktif branch: `feature/seo-phase-2`.** `DEPLOY.md` §9'daki yayın kapısı
  rehberi yazılırken ölçülen **iki açık bulgu düzeltildi**. İkisi de "geri
  dönüşü pahalı" kategorisindeydi — yayına çıkıp indekslendikten sonra
  düzeltmek haftalar sürerdi.
- **✅ Bulgu 1 — sitemap korumalı/işlevsel sayfaları indekslenmeye sunuyordu.**
  `/backend`, `/security` (RequireAdmin), `/qa-assistant` (ProtectedRoute),
  `/login` ve `/auth/callback` sitemap'teydi. İlk üçü ziyaretçiye içerik
  göstermediği için thin content/soft 404 sinyali üretirdi; `/auth/callback`
  bir OAuth dönüş adresi, arama sonucundan tıklanırsa kullanıcı bozuk bir akışa
  düşerdi.
  - **Çözüm:** `seo.js`'te bu 5 girdiye `noindex: true`.
    `generate-seo-files.mjs` sitemap'ten çıkarır (**90 → 80 URL**);
    `generate-static-routes.mjs` shell'lerini YİNE üretir (GitHub Pages'te derin
    bağlantıda sert yenileme için gerekir) ama `robots=noindex,follow` basar.
    `check-dist-seo.mjs` her iki yönü de hard-fail eder (noindex sayfada meta
    eksikse VE indekslenen sayfaya yanlışlıkla noindex bulaştıysa).
- **✅ Bulgu 2 — FAQPage şeması görünmeyen içeriği işaret ediyordu.** Ölçüm:
  şemada 10 soru vardı, **0'ı** sayfanın görünür gövdesinde. Statik shell'de
  yalnızca JSON-LD içindeydiler; uygulamada ise mülakat sekmesi %60 quiz
  barajının arkasında (AC 04, bir ürün kararı). Crawler'ın gördüğüyle
  kullanıcının gördüğü ayrışıyordu — Google'ın FAQPage politikası içeriğin
  kullanıcıya görünür olmasını şart koşar.
  - **Çözüm: şema kaldırıldı.** Gerekçe iki katmanlı: politika riski gerçekti VE
    FAQ zengin sonuçları 2023'ten beri yalnızca resmî kurum/sağlık siteleri için
    gösteriliyor — yani riskin karşılığında kazanç yoktu. `Course` şeması
    dokunulmadı (68 sayfa).
  - Geri eklemek için iki koşul birlikte sağlanmalı: şemadaki metin sayfada
    gate'siz GÖRÜNÜR olmalı ve bu AC 04'le çelişmemeli (pratikte: gate'in
    önünde, herkese açık ayrı bir SSS bölümü).
- **Bekçiler:** `tests/seo-phase2-coverage.spec.ts`'e 4 yeni test —
  korumalı route'lar sitemap'te YOK, noindex shell'leri robots meta'sı taşıyor,
  indekslenen sayfalara noindex bulaşmamış, FAQPage geri gelmemiş. **Üçünün de
  dişi doğrulandı** (dist'e FAQPage enjekte edildi / sitemap'e `/login` eklendi /
  robots meta'sı silindi → 5 test kırıldı, sonra geri alındı).
- **`DEPLOY.md` §9 güncellendi:** B2 ve C1 artık "ÇÖZÜLDÜ — regresyon kontrolü
  olarak kalır" biçiminde; karar tablosu ve URL sayıları (80/160) yenilendi.
- **Geriye kalan yayın öncesi işler (hiçbiri kod değil):** D1 mükerrer başlık
  komutunu bir kez elle koş, D2 SERP görünümünü gözle kontrol et, **E1 Plausible
  hesabını deploy'dan ÖNCE aç** (sonra açılırsa geçişin ilk günlerine ait veri
  kalıcı olarak kaybolur).

---

## 📌 Önceki Durum (2026-08-01, Opus — SEO Faz 2'nin test edilmeyen 5 maddesi E2E'ye alındı)

- **Aktif branch: `feature/seo-phase-2`.** `Documents/seo-phase-2-plan.md`'deki 12
  maddenin her biri için "otomasyona dahil mi, test ediliyor mu" denetimi
  yapıldı. **7 madde zaten kapsamdaydı, 5'i değildi — hepsi kapatıldı.**
- **Denetim sonucu (öncesi):** O1/O3/O5/O7/S4 build zincirinde hard-fail
  ediyordu, O2/O8 E2E'deydi. Kapsam DIŞINDA olanlar: **O4 sitemap** (üretiliyor
  ama üretilen dosyayı okuyan hiçbir kontrol yoktu), **O6 JSON-LD** (yalnızca
  SAYILIP yazdırılıyordu, sıfıra düşse build yeşil kalırdı), **S3 analytics**
  (hiç test yoktu), **S1 kod bölme** (yalnızca yükleme göstergesi bekleniyordu,
  asıl iddia ölçülmüyordu; `/java` hiç kapsanmıyordu), **S2 mission yayılımı**
  (sayılıyor + şema denetleniyor ama "gerçekten çözülebiliyor mu" test
  edilmiyordu).
- **Yeni: `tests/seo-phase2-coverage.spec.ts` (13 test).** Build ÇIKTISINI
  doğrular (`dist/`; iki CI workflow'u da E2E'den önce build alıyor):
  - **O4:** sitemap URL sayısı = route × dil, mükerrer `<loc>` yok, her girdide
    `hreflang` çifti, her route'un iki dilli URL'i gerçekten listede,
    `robots.txt` sitemap'e işaret ediyor ve site geneli `Disallow: /` yok,
    yayınlanan `/sitemap.xml` tarayıcıdan da erişilebiliyor.
  - **O6:** JSON-LD blokları GERÇEKTEN parse ediliyor (bozuk JSON patlar),
    `FAQPage.mainEntity` boş değil, her `Question` soru+cevap taşıyor, TR
    shell'de Türkçe / EN shell'de Türkçe karakter YOK, `Course` şeması var ve
    **site geneli alt eşik** (≥40 FAQPage, ≥50 Course) — üretim çökerse kırılır.
  - **S1:** `JavaPage`/`TypeScriptPage`/`SQLPage` chunk'ları veri chunk'ını
    STATİK değil DİNAMİK import ediyor (build artefaktından doğrulanır) +
    üç sayfada da başlık ağır veri beklenmeden boyanıyor (`/java` ilk kez kapsamda).
  - **Dişi doğrulandı:** dist'teki bir `<url>` silindi → sitemap testi KIRILDI;
    `"FAQPage"` bozuldu → şema testi KIRILDI; dinamik import silindi → kod
    bölme testi KIRILDI. Üçü de geri alındı.
- **Yeni: `tests/analytics-events.spec.ts` (3 test) + `tests/helpers/analytics.ts`.**
  - **🐛 Test yazarken bulunan tuzak:** gerçek `plausible.io/js/script.js`
    yükleniyor ve `window.plausible`ı KENDİ fonksiyonuyla EZİYOR; o fonksiyon
    localhost'ta bilinçli olarak hiçbir şey göndermiyor. Yani script
    engellenmeden yazılan bir analytics testi, olay hiç tetiklenmese bile
    sessizce "geçer" görünürdü. Yardımcı artık isteği `route.abort()` ile
    engelliyor.
  - Kapsanan: `language_changed` (SEO Faz 2'nin `/en` kullanımını ölçen kritik
    olayı), Plausible yokken sayfanın kırılmaması (no-op güvenliği), olay
    property'lerinde kişisel veri olmaması.
  - Kalan 3 olay MEVCUT akışlara bağlandı (ağır akışı ikinci kez oynatmamak
    için): `mission_completed` → `mission-flow` + `mission-spread`,
    `sprint_closed` → `sprint-flow`, `lesson_completed` → `lesson-completion`.
    **4 olayın 4'ü de artık test ediliyor.**
- **Yeni: `tests/mission-spread.spec.ts` (12 test).** Yalnızca S2'nin 6 sayfası
  değil, `mission` bloğu olan **TÜM 12 ders sayfasındaki 18 görevin TAMAMI**
  uçtan uca oynatılıyor: adım kilidi sırayla açılıyor, tüm adımlar bitince
  tamamlanma banner'ı + o sayfanın KENDİ XP havuzuna kayıt + beceri sinyali +
  `mission_completed` olayı. Önceden yalnızca `/selenium`'un İLK görevi test
  ediliyordu (18'de 1).
  - **🐛 Yakalanan gerçek tuzak:** `pythonData`'da bir seçenek etiketi çift
    tırnak içeriyor (`("KeyError: 'email'")`); regex tabanlı `getByRole` seçicisi
    Playwright'ın iç seçici dizesinde ayrıştırma hatası veriyordu. Düz string
    `hasText` eşleşmesine geçildi.
- **Doğrulama:** yeni/etkilenen suite'ler tek tek PASS (13 + 3 + 12 + bağlanan
  akışlar 13). Tam paket koşumu aşağıda.

---

## 📌 Önceki Durum (2026-08-01, Opus — test kapsamı denetimi: 3 boşluk + 1 gerçek test bug'ı)

- **Aktif branch: `feature/seo-phase-2`.** Kural dosyaları (§10, §22, §22.1) ile
  mevcut test/denetim listeleri karşılaştırıldı. **Üç gerçek kapsam boşluğu ve
  bir gerçek test hatası bulundu; hepsi kapatıldı.**
- **🐛 GERÇEK TEST HATASI — `tests-extended/interview-mastery-flows.spec.ts`:**
  Suite, eşiğin ALTINDA bir miktar quiz cevapladıktan sonra kilidi doğrulamak
  için mülakat sekmesine tıklıyor, ama sekme takip değişkeni (`activeTab`) son
  İÇERİK sekmesini göstermeye devam ediyordu. Sonraki döngü "sekme değişmediyse
  tıklama" mantığı kullandığından, sıradaki quiz AYNI içerik sekmesindeyse
  sayfaya geri DÖNÜLMÜYOR ve test mülakat sekmesinde var olmayan bir quiz
  butonunu **sonsuza kadar bekliyordu**. Çoğu sayfada sıradaki quiz farklı bir
  sekmede olduğu için hata yıllardır görünmemişti; `/qa-frontend` (48 quiz,
  eşik 29 → son iki quiz aynı sekmede) eklenince ortaya çıktı.
  - Teşhis: Playwright call log'unda "resolved to" satırı YOKTU → buton
    aktörlük sorunu değil, DOM'da hiç yok. Sidebar indeks kayması ve metin
    eşleşmesi hipotezleri ölçülerek ELENDİ (buton metni birebir eşleşiyor,
    sidebar 10 sekmede 10 buton).
  - Düzeltme: kilit kontrolünden sonra `activeTab = -1` (tek satır).
    **Sonuç: 300 s'de takılan test 39 s'de geçiyor.** Test timeout'u da
    120 s → 180 s yapıldı (29 quiz'lik sayfalar için pay).
- **Kapatılan 3 kapsam boşluğu:**
  1. `tests/topic-pages-ui.spec.ts` — `/api-testing` ve `/qa-frontend` TopicPage
     tabanlı ders sayfası oldukları hâlde listede YOKTU (§22 kontrol 1 kapsam
     dışıydı). Eklendi, **2/2 PASS**.
  2. `tests-extended/interview-mastery-flows.spec.ts` — `/claude-ai`,
     `/llm-agents`, `/qa-frontend`, `/api-testing` `interview-questions` bloğu
     taşıdığı hâlde suite'te YOKTU (§22 kontrol 3 "TÜM sayfalar" demesine
     rağmen). Dördü de eklendi, **4/4 PASS** (qa-frontend yukarıdaki düzeltmeyle).
  3. `scripts/audit-interview-questions.mjs` — `/gauge` ve `/api-testing`
     denetlenmiyordu (§10'un 50 soru kuralı onlar için hiç kontrol edilmemişti).
     Eklendi; ikisi de zaten 50 soru + 15/20/15 dağılımıyla uyumlu çıktı,
     build kırılmadı. **25 → 27 sayfa, 27/27 ✅.** Ayrıca başlıktaki sabit sayı
     ("22 teknoloji sayfası") `PAGES.length`'ten türetilir yapıldı — sayfa
     eklendikçe sessizce eskiyordu.
- **Ek kapsam:** `/sprint` ve `/portfolio` `tests/other-pages-ui.spec.ts`'e
  eklendi (kendi akış suite'leri vardı ama ikisi de console/page HATASI
  taramıyordu). **10/10 PASS.**
- **Belge senkronu:** `Documents/acceptancecriterias.md`'ye **AC 13 — QA
  Portfolyo** eklendi (§22'nin "önce AC, sonra test maddesi" kuralı gereği;
  portfolyo suite'i önceki oturumda AC karşılığı olmadan eklenmişti).
- **Not (regresyon değil):** Art arda birden fazla mülakat akışı koşturulunca
  `grade-interview-answer` geçici olarak 200 dönmeyebiliyor (Groq rate limit —
  config'in `workers: 1` yorumunun uyardığı durum). `/docker` tek başına
  koşturulunca **PASS**; suite'i sayfa sayfa koşturmak gerekebilir.

---

## 📌 Önceki Durum (2026-08-01, Opus — Portfolio Builder çekirdeği `/portfolio` TAMAMLANDI)

- **Aktif branch: `feature/seo-phase-2`.** `Documents/portfolio-builder-plan.md`'deki
  Opus çekirdeği (O1-O7) uygulandı. `/portfolio` artık canlı bir sayfa.
- **Yeni dosyalar:** `src/lib/portfolioSnapshot.js` (türetme), `src/data/portfolioData.js`
  (tüm metinler + 18 görev kataloğu + 6 bug kataloğu + boş durum kopyası),
  `src/components/PortfolioPage.jsx`, `tests/portfolio-page.spec.ts`.
  **Sadece-ekleme yapılan paylaşılan dosyalar:** `App.jsx` (lazy route),
  `src/utils/seo.js` (TR+EN metadata), `scripts/generate-static-routes.mjs`
  (shell tanıtım metni), `scripts/check-i18n-leaks.mjs` (STRICT_ZERO'ya
  `portfolioData.js`), `src/components/HomePage.jsx` (teal giriş kartı),
  `tests/no-internal-jargon.spec.ts` (route listesine `/portfolio`), `CLAUDE.md` §2.
- **⚠ Planın en kritik maddesi uygulandı — route-kapsamı tuzağı:** `xp.js`
  depolama anahtarını bulunulan sayfanın URL'inden türetir, bu yüzden
  `getCompletedExercises()` ve onun üstüne kurulu TÜM `sprintStore`
  fonksiyonları `/portfolio` sayfasında sessizce boş döner. `xp.js`/`sprintStore.js`
  DEĞİŞTİRİLMEDİ; `portfolioSnapshot.js` tüm `learnqa_xp_*` anahtarlarını
  tarayan global bir küme kuruyor (`progressStore.getTotalXp()`'nin kanıtlanmış
  deseni). **Testin dişi doğrulandı:** global tarama geçici olarak route-kapsamlı
  okumaya çevrildi → 2 test KIRILDI → geri alındı.
- **Plandan bilinçli 3 sapma (hepsi dürüstlük gerekçeli):**
  1. Plan "en uzun streak" istiyordu — `activityLog` bunu TUTMUYOR (yalnızca
     güncel seri + aktif gün türetilebilir). Olmayan metrik uydurulmadı, gerçekten
     ölçülen ikisi gösteriliyor.
  2. Plan 18 mission diyordu; S2'den sonra gerçek sayı **24** (18 ders görevi +
     6 sprint bug'ı). Katalog buna göre yazıldı.
  3. Plan "44 → 45 shell" diyordu; dil-ayrık URL'lerden sonra gerçek sayı
     **88 → 90** (45 route × 2 dil).
  4. Ana sayfa giriş kartı planda Sonnet görevi (S4) idi — erişilemeyen bir
     sayfa teslim edilmiş sayılmayacağı için çekirdeğe alındı.
- **Milestone bölümü:** profil düğüm kopyası (`{route,title,emoji}`) `isMain`
  taşımadığından "SDET yolu tamam" rozeti profilden hesaplanamıyor; harita
  sayfasının zaten yazdığı `learnqa_map_milestones` kaydıyla birleştiriliyor
  (yeni state değil, mevcut deponun okunması).
- **Doğrulama:** `node --check` (2 yeni dosya) ✓ · content-integrity ✓ (40 dosya) ·
  i18n baseline 0 ✓ · build ✓ (**90 shell**, dist-SEO geçti, 56 FAQPage/68 Course) ·
  `portfolio-page.spec.ts` **8/8** ✓ (diş doğrulandı) · regresyon: no-internal-jargon
  (9, `/portfolio` dahil) + sprint-flow (4) + seo-i18n-routing (6) +
  homepage-recommended-badges (2) + other-pages-ui + mobile-smoke (16) +
  theme-and-accessibility (5) = **50/50 PASS**.
- **🔜 Kalan portfolyo işleri (planın Sonnet tarafı, opsiyonel):** `/qa-mentor`
  rozet şeridinin yanına portfolyo linki (S4'ün ikinci yarısı) ve paylaşılabilir
  kart görseli (`<canvas>`) — ikisi de düşük öncelik, ayrı oturum.
- **🔜 Değişmeyen açık iş:** `main`'e merge kararı kullanıcıda; Plausible hesabı
  ve GSC sitemap yeniden gönderimi (90 URL) hâlâ kullanıcı tarafında.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — `feature/portfolio-builder` `feature/seo-phase-2`'ye merge edildi)

- **`origin/feature/portfolio-builder` fetch edilip `feature/seo-phase-2`'ye
  merge edildi** (commit `c06c21e`). O branch `main`'den yalnızca 2 commit
  ileride idi (`Documents/portfolio-builder-plan.md` planı + iç koordinasyon
  dili sızıntısını engelleyen yeni bir kural: `CLAUDE.md` §24, yeni
  `check-content-integrity.mjs` Kontrol [H], yeni `tests/no-internal-jargon.spec.ts`,
  ayrıca `cypressData/gaugeData/javaData/javascriptData/qaFrontendData.js`'te
  küçük içerik düzeltmeleri). Tek çakışma `CLAUDE.md`'de aynı satıra iki ayrı
  dalın birer kural eklemesiydi — ikisi de korunarak çözüldü, içerik kaybı
  yok. `src/data/javaData.js` otomatik (çakışmasız) birleşti.
  - Bundan sonra geliştirme **`feature/seo-phase-2` branch'inden** devam
    ediyor — iki dalın da işleri artık burada bir arada. Ayrı
    `feature/portfolio-builder` branch'i (local + origin) hâlâ duruyor,
    silinmedi.
  - Merge sonrası `check-content-integrity` ✓, `npm run build` ✓ (88 shell,
    dist-SEO temiz), tam E2E suite ✓ — **253/253 test yeşil** (yeni
    `no-internal-jargon.spec.ts`'in 8 testi dahil, 12 dk).
  - **`feature/seo-phase-2` artık hem SEO Faz 2 (O1-O8 + S1-S4) hem Portfolio
    Builder planı + iç-koordinasyon-dili kuralını içeriyor, `main`'e merge
    kararı kullanıcıda.**

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 TAMAMLANDI: S1-S4 + E2E doğrulaması)

- **✅ Kapsamlı son E2E testi TAMAMLANDI, TAM SUITE YEŞİL: 245/245 ✅**
  (commit `b7e04f8`): tam suite (40 spec dosyası) 2 kez koşuldu — ilk koşuda
  2 gerçek regresyon + 1 flaky test bulundu ve düzeltildi, ikinci (son) koşuda
  **245 test, 0 hata, 11.5 dk**:
  - `seo-i18n-routing.spec.ts`: S4'te `/docker` TR title'ı "Docker Eğitimi"
    → "Docker Nedir?" olarak cilalandığı için eski pattern'i bekleyen test
    kırılmıştı — test yeni başlığa göre güncellendi (kod tarafında hata yoktu,
    test beklentisi eskiydi).
  - `typescript-page.spec.ts` (flaky) + `sql-page.spec.ts` (proaktif, aynı
    risk): S1'in stub+arka-plan-swap deseni (`TypeScriptPage.jsx`/`SQLPage.jsx`)
    yüzünden test sekmelere tıklamaya gerçek veri yüklenmeden başlayabiliyordu
    ("Kurulum" sekmesi bazen boş görünüyordu). `topic-content-loading`
    göstergesinin kaybolmasını bekleyen bir adım eklendi.
  - Düzeltme sonrası ilgili 3 test dosyası (8 test) tek tek yeşil, ardından
    `check-content-integrity` + `npm run build` temiz geçti.
  - **SEO Faz 2 (O1-O8 + S1-S4) artık tamamen doğrulanmış durumda. `main`'e
    merge kararı kullanıcıda (CLAUDE.md §21).**

- **Aktif branch: `feature/seo-phase-2`.** Opus'un O1-O8 çekirdeğinin ardından
  Sonnet'in S1-S4 görevlerinin TÜMÜ tamamlandı (`Documents/seo-phase-2-plan.md`).
  Plandaki 12 madde de ✅. **S1 ve S2 detayları aşağıdaki iki bölümde**; bu
  bölüm S3 (analytics) + S4 (TR metadata + mülakat dağılımı) ve genel özet.

- **✅ S3 — Çerezsiz analytics (Plausible) TAMAMLANDI** (commit `ba80b58`):
  `index.html`'e `data-domain="learnqa.dev"` ile script eklendi (Google
  Analytics BİLİNÇLİ kullanılmadı — çerez rızası yükü). `src/lib/analytics.js`
  → `trackEvent()`, `window.plausible` yoksa sessizce no-op. 4 olay bağlandı:
  `lesson_completed` (AuthContext, anonim+üye), `mission_completed`
  (MissionBlock), `sprint_closed` (SprintPage), `language_changed`
  (LanguageContext — SEO Faz 2'nin `/en` kullanımını ölçmek için kritik).
  `DEPLOY.md` §8'e hesap kurulum adımları eklendi. **Kullanıcı tarafı açık iş:**
  Plausible hesabı açılıp `learnqa.dev` domain'i eklenmeli — kod hazır, hesap yok.

- **✅ S4 — TR metadata cilası + mülakat dağılımı TAMAMLANDI** (commit `e40d2d6`):
  - En yüksek trafikli 12 sayfanın (`selenium`, `playwright`, `sql`, `python`,
    `java`, `docker`, `jenkins`, `git-github`, `security`, `what-is-testing`,
    `manual-testing`) TR title/description'ları gerçek arama niyeti kalıplarıyla
    güçlendirildi ("selenium nedir", "playwright türkçe", "sql sorguları",
    "docker nedir" gibi) — Opus fazındaki doğrudan çeviriden farklı olarak.
  - `/postman` (16/19/15) ve `/playwright` (15/15/20) mülakat seviye dağılımı
    15/20/15 altındaydı — soru SİLİNMEDİ, eksik intermediate seviyeye senaryo
    tabanlı sorular eklendi (playwright +5, postman +1, her ikisi de hem TR hem
    EN tarafına — postman'ın iki bloğu FARKLI formatta: EN düz string, TR
    bilingual `{tr,en}` per-soru, ikisi de elle güncellendi). **Sonuç:
    audit-interview-questions artık 25/25 sayfa ✅, 0 uyarı** (önceki durum:
    23/25, 2 uyarı).
- **Doğrulama:** seo:check (45 route) ✓ · audit-interview-questions (25/25 ✅) ✓ ·
  content-integrity ✓ · i18n baseline 0 ✓ · build ✓ (88 shell, dist-SEO).

- **🎯 SEO Faz 2 ÖZET (O1-O8 + S1-S4, plan §0'daki TÜM maddeler ✅):**
  - Dil-ayrık URL (`/en` prefix), 88 statik shell, FAQPage+Course JSON-LD
    (56+68 sayfa), `/typescript`+`/java`+`/sql` ilk-boya JS'i ~%98 küçüldü,
    6 yeni sayfaya mission eklendi (18→24 toplam), çerezsiz analytics, TR
    metadata cilası, mülakat dağılımı 25/25 ✅.
  - Toplam commit: `f5350b8`, `80034c2`, `52c0fc0`..`e990852` (6 mission +
    1 audit script), `f46ac67`, `ba80b58`, `e40d2d6` = **12 commit**.
- **🔜 Kalan tek adım:** kapsamlı son E2E doğrulaması (bu oturumda devam
  ediyor) — bitince `main`'e merge kararı kullanıcıda (CLAUDE.md §21), öncesinde
  plan §8'deki 9 adımlı manuel test rehberi önerilir.
- **🔜 Kullanıcı (Hasan) tarafı, planın §5'i (hâlâ açık, bu plan onları
  kapatmaz):** GSC'ye sitemap'i yeniden gönder (88 URL), Plausible hesabı aç,
  `sprint-simulator-and-open-items-plan.md` §5'teki 4 madde (edge function
  deploy'ları, social-proof RPC, trending-skills aktivasyonu).

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 / S2 mission yayılımı)

- **Aktif branch: `feature/seo-phase-2`.** S1'in hemen ardından **S2 — mission
  yayılımı TAMAMLANDI** (plan §7.2). Ölçülen durum: 25 teknoloji sayfasından
  yalnızca 6'sında (`selenium`, `playwright`, `cypress`, `python`, `sql`,
  `rest-assured`) mission vardı — hiçbiri en yüksek trafikli sayfalarda değildi.
  - **6 yeni sayfaya birer 5 adımlık mission eklendi** (her biri AYRI commit,
    `52c0fc0`..`e990852`): `docker` (QA: Selenium Grid sekmesi — container/hub-node
    compose/yarış durumu/RemoteWebDriver/shm_size), `jenkins` (First Jenkinsfile
    sekmesi — pipeline-as-code/stage-steps/sessiz başarısızlık/post-failure/agent
    seçimi), `git-github` (Merge & Conflict sekmesi, plan promptunda önerilen —
    çakışma işaretleri/temizlik/add-commit/status doğrulama), `java` (Test
    Frameworks sekmesi, ben seçtim çünkü sayfa zaten test kodu yazmayı öğretiyor —
    @ParameterizedTest ile kopyala-yapıştır testlerin sessiz tutarsızlık riskini
    yapısal olarak kapatma), `postman` (Writing Automated Tests sekmesi —
    pm.test() status assertion/token çıkarma/hardcode riski/{{değişken}} zinciri),
    `linux` (Real-World QA Scenarios sekmesi, plan promptunda "CI agent debug"
    olarak önerildi — ps/grep, lsof, tail -f üçlüsüyle GUI'siz hata ayıklama).
  - Toplam mission sayısı: **18 → 24**, prediction: **78 → 96**.
  - `scripts/audit-learning-blocks.mjs`'in `MISSION_FILES` listesine 5 yeni dosya
    eklendi (`dockerData.js`, `jenkinsData.js`, `gitGithubData.js`, `postmanData.js`,
    `linuxData.js` — `javaData.js` zaten `FILES`teydi) — yoksa şema denetimi bu
    görevleri hiç görmezdi.
  - **🐛 Gerçek hata yakalanıp düzeltildi (linuxData.js):** apostrof kaçış hatası
    (`process'i` tek tırnaklı string içinde escape edilmeden) `node --check`i
    kırdı — CLAUDE.md §23.2'nin tam olarak uyardığı tuzak. Düzeltildi, tüm 6
    dosya `node --check` ile tek tek doğrulandı.
  - **🐛 İkinci hata (jenkins+linux, i18n scanner yakaladı):** 2 `prediction.code`
    alanı düz string olarak Türkçe-özgü karakter (`ğ`/`ş`) içeriyordu, EN modda
    sızıyordu — `{tr,en}` bilingual yapıldı.
  - **🔍 Üçüncü, scanner'ın YAKALAYAMADIĞI bir kör nokta elle bulundu (CLAUDE.md
    §23.1'in tarif ettiği tam senaryo):** 13 tane daha `prediction.code` alanı
    ASCII-normalize Türkçe kullanıyordu (`ayni`, `farkli`, `cozuldu`,
    `yapistirildi` gibi — Türkçe-özgü karakter YOK, otomatik tarayıcı bunları
    göremiyor). Referans selenium mission'ı da bu kalıbı kullanıyordu (muhtemelen
    aynı kör noktaya sahip, dokunulmadı — kapsam dışı). Kendi 13 alanımın
    HEPSİ elle `{tr,en}` bilingual yapıldı — artık EN modda gerçekten İngilizce.
  - **🎯 Dördüncü, kendi kendine yapılan kalite denetimi (istenmedi ama proaktif
    yapıldı):** `audit-learning-blocks.mjs`nin `positionDist` çıktısı, YENİ
    eklenen 18 prediction'ın HEPSİNDE doğru cevabın "a" (ilk seçenek) pozisyonunda
    olduğunu gösterdi — NEXT_SESSION geçmişinde daha önce flag'lenen "hep B"
    gaming riskinin bu kez "hep A" versiyonu. 18 sorunun 12'sinde seçenek sırası
    elle karıştırılıp **6/6/6 (a/b/c) dağılımına** getirildi (site geneli hâlâ
    B'ye kaymış durumda — bu ÖNCEDEN VAR olan, kapsam dışı bir borç, sadece
    kendi yeni 18 sorumun dağılımı düzeltildi).
  - **Doğrulama:** her dosya için `node --check` ✓ · content-integrity ✓
    (39 dosya) · i18n baseline 0 ✓ · audit-learning-blocks ✓ (mission:24,
    prediction:96, dağılım kendi 18'imde 6/6/6) · build ✓ (88 shell, dist-SEO
    geçti) · E2E 63/63 PASS (`mission-flow` referans testi + `topic-pages-ui`
    25 sayfa + `i18n-content-toggle` 32 test + `learning-blocks-render`/java 3).
  - **🔜 Sırada:** S3 (çerezsiz analytics), S4 (TR metadata cilası + mülakat
    dağılımı) — plan §7.3-§7.4, sırayla, kullanıcı onayı beklenmeden.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 / S1 performans)

- **Aktif branch: `feature/seo-phase-2`.** Opus'un O1-O8 çekirdeğinin (aşağıda)
  hemen ardından, kullanıcı `Documents/seo-phase-2-plan.md`'deki Sonnet
  görevlerini (S1-S4) sırayla, sormadan, tamamına kadar uygulamamı istedi.
  **S1 — Performans/kod bölme TAMAMLANDI.**
  - **Sorun:** `/typescript`, `/java`, `/sql` sayfalarına girmek 850KB-1.1MB'lık
    TEK bir veri chunk'ının TAMAMEN indirilmesini gerektiriyordu — kullanıcı bir
    seferde tek sekme görürken 17-25 sekmenin verisi senkron iniyordu (mobilde
    LCP'yi düşürüyordu).
  - **Mimari karar (plan §7.1'in "davranış değişmeyecek" kısıtına uyularak):**
    `TopicPage.jsx`'e (21.697 satır, renderBlock/quiz motoru) **HİÇ
    DOKUNULMADI** — bunun yerine 3 sayfanın WRAPPER bileşeni (`TypeScriptPage.jsx`,
    `JavaPage.jsx`, `SQLPage.jsx`) değiştirildi:
    1. `scripts/generate-data-stubs.mjs` (yeni, build zincirine eklendi) —
       kaynak `<name>Data.js` dosyasına HİÇ dokunmadan, onu dinamik `import()`
       ile okuyup SADECE `hero` + `tabs` (sekme etiketleri) + BOŞ `sections`
       içeren minik bir "stub" (`<name>DataStub.js`, ~2-2.4KB) üretir. Kaynak
       dosyalar hâlâ TEK doğruluk kaynağı (CLAUDE.md §5) — stub asla elle
       düzenlenmez, her `npm run build`'de ve `npm run dev` öncesinde (`predev`)
       GÜNCEL kaynaktan yeniden üretilir.
    2. Wrapper bileşenleri artık `data={pageData}` kullanır: `useState(stub)`
       ile SENKRON hızlı ilk boya, `useEffect`'te GERÇEK veri dosyası dinamik
       `import()` ile arka planda yüklenip `setPageData(fullData)` ile
       değiştirilir. Yüklenirken küçük bir "İçerik yükleniyor…" pill gösterilir
       (`data-testid="topic-content-loading"`, TopicPage'e DOKUNMADAN, wrapper'ın
       kendi JSX'inde sibling olarak).
  - **Neden "sekmeye tıklanınca" değil "mount sonrası arka planda" yükleme
    seçildi (plan §7.1'den bilinçli sapma):** `activeTab` state'i TopicPage
    İÇİNDE yaşıyor, wrapper'dan görünmüyor; ayrıca `location.state.openTab` ile
    DOĞRUDAN N. sekmeye deep-link YAPILABİLİYOR (HomePage resume banner,
    MentorPanel önerileri — `mentorAdvice.js`'de `/sql` openTab:4, `/java`
    openTab:2 gibi). "Sadece tıklanan sekmeyi yükle" tasarımı TopicPage'in
    `sections[activeTab]` senkron okuma sözleşmesine dokunmayı gerektirirdi —
    riskli. Bunun yerine: arka plan yüklemesi MOUNT'ta hemen başlar (kullanıcı
    eylemine bağlı değil), tipik ağ gecikmesi insan tepki süresinden kısa
    olduğundan pratikte "tıklamadan önce zaten hazır" davranışına çok yakın
    sonuç verir, ama TopicPage'in senkron okuma varsayımını hiç bozmaz.
  - **`check-content-integrity.mjs`/`check-i18n-leaks.mjs` etkilenmedi:** stub
    dosyaları `*Data.js` glob filtresine (`f.endsWith('Data.js')`) UYMUYOR
    (`*DataStub.js`), bilinçli olarak — içerikleri zaten kaynak dosyada
    denetleniyor, aynı metni ikinci kez farklı bir dosyada "ilişkisiz kopya"
    olarak işaretletmemek için. `generate-static-routes.mjs` ve
    `audit-learning-blocks.mjs`/`check-i18n-leaks.mjs` HÂLÂ orijinal
    `typescriptData.js`/`javaData.js`/`sqlData.js`'i import ediyor —
    crawler'a giden statik shell'ler ve tüm Node script'leri TAM içeriği
    görüyor, sadece GERÇEK TARAYICI kullanıcısı hızlı stub + arka plan
    yüklemesi deneyimliyor.
  - **Ölçüm (önce/sonra, ilk boya için gereken senkron JS):**

    | Sayfa | ÖNCE (route chunk + veri chunk senkron) | SONRA (ilk boya için senkron) | Azalma |
    |---|---|---|---|
    | `/typescript` | ~1.1 MB (typescriptData 1,115.86 kB) | 15.70 kB (`TypeScriptPage-*.js`, stub dahil) | ~%98.6 |
    | `/java` | ~962 KB (javaData 961.87 kB) | 17.43 kB (`JavaPage-*.js`, stub dahil) | ~%98.2 |
    | `/sql` | ~867 KB (sqlData 866.60 kB) | 16.01 kB (`SQLPage-*.js`, stub dahil) | ~%98.2 |

    Doğrulama: `dist/assets/TypeScriptPage-*.js` içinde `import("./typescriptData-*.js")`
    çağrısının `useEffect` GÖVDESİNDE olduğu build çıktısından grep ile teyit
    edildi (statik değil, gerçekten ertelenmiş dinamik import). Veri
    dosyalarının KENDİSİ değişmedi (hâlâ 866KB-1.1MB) — toplam indirilen bayt
    aynı kalır, sadece İLK BOYA için gereken KRİTİK YOL küçüldü.
  - **Riskli senaryo elle doğrulandı:** `mentor-panel.spec.ts`'teki
    `openTab:2` deep-link testi (`/java`'ya tab 2 açık gelip "Önce Tahmin Et"
    prediction bloğunun 30s içinde görünmesini bekliyor — bu test ZATEN yavaş
    chunk yüklemesini tolere edecek şekilde yazılmıştı) **PASS** — arka plan
    yüklemesi + `toBeVisible` polling'i bu senaryoyu sorunsuz kapsıyor.
  - **Doğrulama:** content-integrity ✓ (39 dosya, stub'lar glob dışı) ·
    i18n baseline 0 ✓ · audit-learning-blocks ✓ · build ✓ (88 shell, dist-SEO
    geçti, static shell'ler hâlâ TAM içerik gösteriyor) · **E2E 81 PASS / 0
    FAIL** (topic-pages-ui 25 tam sayfa taraması + typescript/sql tab-tıklama
    testleri 2 + mentor-panel openTab dahil 5 + learning-blocks-render/java 3 +
    mission-flow/selenium 1 + i18n-content-toggle 32 tam paket + önceki S1
    öncesi genel regresyon çakışan testler).
  - **🔜 Sırada:** S2 (`mission` yayılımı), S3 (analytics), S4 (TR metadata
    cilası + mülakat dağılımı) — plan §7.2-§7.4'teki promptlarla sırayla
    devam ediliyor, kullanıcı onayı beklenmeden.

---

## 📌 Önceki Durum (2026-08-01, Opus — SEO Faz 2 / dil-ayrık URL)

- **Aktif branch: `feature/seo-phase-2`** (`main`'den açıldı; `feature/sprint-simulator`
  merge edilmiş durumda, `6ab2254`). Kullanıcı `Documents/` altındaki 21 plan
  dosyasının denetlenmesini ve fikir/öneri istedi. **Ölçüm sonucu: içerik borcu
  KAPANMIŞ** (mülakat 25/25 sayfa ≥50 soru · animasyon kapsamı %100, 0 açık ·
  interaktif üçlü 0 boşluk · i18n baseline 0). Yani "daha çok içerik" artık en
  yüksek getirili iş değil. Yeni plan: **`Documents/seo-phase-2-plan.md`**.

- **🔴 Bulunan kritik açık — Türkçe içerik Google'da HİÇ YOKTU:** `index.html`
  `<html lang="en">`, `seo.js`'teki 44 route'un TAMAMININ metadata'sı İngilizce,
  statik shell gövdesi de İngilizce (`textValue()` daima `.en` seçiyordu) — ama
  varsayılan arayüz dili `tr`. Google her sayfayı İngilizce sanıp doymuş
  İngilizce sorgularda yarıştırıyordu; "selenium nedir", "playwright türkçe
  eğitim" gibi asıl fırsat sorgularında indekslenecek Türkçe URL yoktu.

- **✅ FAZ 2 OPUS TARAFI TAMAMLANDI (O1-O8):**
  - **Mimari karar (plan §2):** çıplak path = **TR**, `/en/<path>` = **EN**
    (Seçenek A). Gerekçe: mevcut URL otoritesi korunur, çıplak URL'in dili
    varsayılan arayüz diliyle eşitlenir, GitHub Pages'te ek altyapı gerekmez.
    `/tr` prefix'li Seçenek B reddedildi — GitHub Pages'te server redirect yok.
  - **Uygulama tekniği:** `main.jsx`'te URL `/en` ile başlıyorsa
    `<BrowserRouter basename="/en">`. **`App.jsx`'e HİÇ DOKUNULMADI** — 43 lazy
    route ikilenmedi, `check-seo.mjs`'in `<Route path>` ayrıştırması bozulmadı ve
    tüm `<Link to>` / `useNavigate` çağrıları otomatik `/en` öneki aldı.
    Doğrulandı: kodda router'ı atlayan ham `<a href="/...">` YOK.
  - **Dil otoritesi URL'e geçti (§2.2):** `localStorage.language` artık dili
    BELİRLEMEZ, yalnızca yansıtır. Otomatik yönlendirme bilinçli olarak
    EKLENMEDİ (39 E2E spec'inde sürpriz kırılma üretirdi). Dil düğmesi artık
    URL değiştirir (`window.location.assign`) — `basename` mount anında
    sabitlendiği için tam navigasyon zorunlu.
  - `seo.js`: `LOCALES`/`DEFAULT_LOCALE`/`EN_PREFIX` + her route'a `tr:{title,
    description}` (44 route için TR metadata yazıldı) + `localeFromPathname`,
    `stripLocalePrefix`, `localizedPath`, `seoFor`, `alternatesFor`.
    `getSeoForPath` artık TAM pathname alır.
  - `SeoMeta.jsx`: dile göre meta + `<html lang>` + `hreflang` (tr/en/x-default)
    + `og:locale`. `generate-seo-files.mjs`: sitemap **44 → 88 URL**, her girdide
    `xhtml:link` alternates.
  - `generate-static-routes.mjs`: shell'ler **iki dilde** üretiliyor
    (`dist/<route>` + `dist/en/<route>`) = **88 shell**. TR gövde metni ELLE
    YAZILMADI, `textValue(value, locale)` ile mevcut bilingual veriden geliyor;
    script içindeki sabit İngilizce arayüz metinleri iki dilli yapıldı.
    `/java-document` ve `/git-document` TR'de `*_tr.md` dosyalarını okuyor.
  - **JSON-LD zenginleştirme:** `FAQPage` mülakat sorularından otomatik üretiliyor
    (`interview-questions` blokları, dile uygun `q`/`a`, ilk 10 soru) + `Course`
    şeması. Ölçülen sonuç: **56 sayfada FAQPage, 68 sayfada Course** (önceden 0).
  - `check-seo.mjs`: TR metadata zorunlu, uzunluk sınırları İKİ dilde de kontrol,
    **duplicate description** kontrolü ve "TR metadata İngilizceyle özdeş mi"
    kontrolü eklendi. `check-dist-seo.mjs`: her route iki dilde de üretilmiş mi,
    `<html lang>` doğru mu, hreflang üçlüsü tam mı — hepsi hard-fail.
  - `tests/seo-i18n-routing.spec.ts` (yeni, 6 test) — **6/6 PASS.**
- **🐛 Regresyonun yakaladığı gerçek kırılma (düzeltildi):**
  `homepage-recommended-badges.spec.ts` EN testi `a[href="/what-is-testing"]`
  selector'ı kullanıyordu; EN modda href artık `/en/what-is-testing` olduğu için
  kırıldı. Selector `href$=` yapıldı — testin kodladığı eski varsayım güncellendi,
  davranış doğru.
- **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ ·
  audit-learning-blocks ✓ (mission:18, prediction:78) · audit-interview-questions ✓ ·
  build ✓ (88 shell, 88 sitemap URL, dist-SEO geçti) · **E2E toplam 196 PASS, 0 FAIL**
  (seo-i18n-routing 6 · i18n-content-toggle 32 · topic-pages-ui + other-pages-ui +
  mission-flow + sprint-flow + theme-accessibility + mobile-smoke 53 · lesson-completion
  + term-tooltip + quiz-retry + learning-blocks-render + career-map(+milestones) +
  tooltip-guide-mascot + video-scene 98 · daily-loop + review-queue + mentor-* +
  code-playground + sql/js/ts-page + tr-code-comments 28 · sandbox'lar + lab'lar +
  roadmap-order 15 — sayımda homepage-badges'ın 2'si düzeltme sonrası ayrıca koşuldu).
  Auth gerektiren suite'ler (§23.8) koşturulmadı.
- **Kalıcı kurallar yazıldı:** `codexSeo.md` **§0** (dil-ayrık URL mimarisi, tam
  kural seti) + `CLAUDE.md` §6 (iki dilli metadata zorunluluğu) ve §11'e 2 yeni
  "yapma" maddesi.
- **🔜 Sırada — Sonnet promptları planın §7'sinde HAZIR:** S1 performans/kod bölme
  (TopicPage chunk 1.6 MB, typescriptData 1.1 MB), S2 `mission` yayılımı (25
  sayfadan sadece 6'sında var), S3 çerezsiz analytics (sitede HİÇ analytics yok),
  S4 TR metadata kalite geçişi + `/postman` ve `/playwright` mülakat dağılımı.
- **🔜 Kullanıcı (Hasan) tarafı, planın §5'i:** deploy sonrası GSC'ye sitemap'i
  YENİDEN GÖNDER (88 URL, `/en/*` kümesi yeni), 1-2 hafta sonra hreflang
  hatalarını GSC'den doğrula, analytics hesabı aç. **Ayrıca hâlâ açık:**
  `sprint-simulator-and-open-items-plan.md` §5'teki 4 madde (edge function
  deploy'ları, social-proof RPC, trending-skills aktivasyonu) — bu plan onları
  kapatmaz.
- **Açık iş:** `main`'e merge kararı kullanıcıda. Merge öncesi plan §8'deki
  9 adımlı manuel test rehberi uygulanmalı.

---

## 📌 Önceki Durum (2026-08-01, Opus — /sprint UX düzeltmesi)

- **Aktif branch: `feature/sprint-simulator`.** Kullanıcı `/sprint`'i elle gezerken
  **gerçek bir UX bug'ı bildirdi:** "Görevi aç"a basınca hiçbir şey olmuyor gibi
  görünüyor. **Teşhis:** state DOĞRU değişiyordu (kart seçiliyor, panel render
  ediliyor) ama bug detay paneli Kanban panosunun ALTINDA duruyor ve hiçbir
  scroll yapılmıyordu — kullanıcı ekranın altındaki paneli hiç görmüyordu.
  `renderBlock` imzası/köprüsü sağlamdı, sorun tamamen görünürlüktü.
  - **Düzeltme 1 — göreve kaydırma:** `SprintPage.jsx`'e `bugDetailRef` +
    `selectedBugId` değişince `scrollIntoView({behavior:'smooth',block:'start'})`
    eklendi; section'a `scroll-mt-24` (TopicHeader `sticky top-0` olduğu için
    panelin üstü header'ın altında kalmasın diye).
  - **Düzeltme 2 — bağlama duyarlı rehber maskot:** Kullanıcı "ne yapması
    gerektiğini tarif eden bir maskot" istedi. **Yeni bileşen YAZILMADI** —
    mevcut `TooltipGuideMascot.jsx` props'landı (`message`/`emoji`/`ariaLabel`/
    `initiallyOpen`); TÜM props opsiyonel ve varsayılanları eski davranışın
    birebir aynısı, yani mevcut 3 giriş sayfası hiç etkilenmedi. `/sprint`'te
    🐞 maskotu balonu AÇIK başlar ve pano durumuna göre 5 fazda TEK bir
    sonraki adımı söyler (Backlog'dan çek → Görevi aç → adım kilidi/mini-lesson
    → Sprint'i kapat → sprint kapandı). Balon açık kaldığı sürece metin canlı
    güncellenir.
  - **`tests/sprint-flow.spec.ts`'e 4. test eklendi** — maskotun faz faz doğru
    metni verdiği + "Görevi aç"ın paneli GERÇEKTEN viewport'a getirdiği
    (`toBeInViewport()`). **Testin dişi doğrulandı:** `scrollIntoView` geçici
    olarak kapatılıp test'in KIRILDIĞI görüldü, sonra geri alındı.
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell) · `sprint-flow.spec.ts` 4/4 ✓ · `tooltip-guide-mascot.spec.ts`
    regresyon 6/6 ✓ (toplam 10/10).
  - **Açık iş:** `main`'e merge/PR kararı hâlâ kullanıcıda.

- **Aynı gün, ikinci tur — Gherkin anahtar kelimeleri (kullanıcı raporu):**
  Kullanıcı `/sprint` görevindeki Gherkin bloğunda anahtar kelimelerin
  Türkçeleştirildiğini gördü (`Senaryo:`, `Diyelim ki`, `Ve`, `O zaman`).
  Kural (CLAUDE.md §8): dilin KENDİ sözdizimi, TR sayfada bile İngilizce kalır.
  - **`sprintsData.js` — 18 blok düzeltildi** (6 mission × code/starterCode/
    solutionCode). **Yan bulgu:** `When` satırı 18 bloğun HEPSİNDE tamamen
    DÜŞMÜŞTÜ (adım anahtar kelimesizdi) — bloklar geçerli Gherkin bile değildi;
    dönüşüm sırasında eklendi. Mekanik dönüşüm önce dry-run ile gözle
    doğrulandı (CLAUDE.md §23.3), rakamla başlayan adım satırı korundu.
  - **`gaugeData.js`** (film `code` alanı + eşlik eden aktör etiketi) ve
    **`claudeAiData.js`** (prompt şablonundaki `Özellik:` → `Feature:`) de
    düzeltildi. Düz Türkçe başlıklar ("Senaryo: EC2'de Selenium Grid",
    `manualTestingData.js`'in "Özellik: Kahve Yap" etiketi) Gherkin DEĞİLDİR,
    dokunulmadı.
  - **Hover açıklaması (kullanıcı isteği):** Kod bloklarına tooltip mimari
    olarak bağlanamıyor (`highlightGlossaryTerms` `<pre>` içeriğini asla
    sarmaz), bu yüzden anahtar kelime açıklaması 6 gherkin bloğunun
    **`explanation` alanına** iki dilli olarak eklendi (blok render'ında kodun
    hemen üstünde çıkar). `termGlossary.js`'e `gherkin` + `cucumber` terimleri
    eklendi; `Given/When/Then/And` BİLEREK eklenmedi — EN modda her cümlede
    altları çizilirdi (dosyanın "aşırı yaygın kelime ekleme" kuralı).
  - **Kalıcı kontrol eklendi:** `check-content-integrity.mjs` **Kontrol [G]**
    (`checkGherkinKeywords`) — build + pre-commit'te hard-fail. İlk yazımında
    12 yanlış-pozitif verdi (düz Türkçe başlıklar), daraltıldı: bir string
    ancak çok satırlı olup adım satırı içeriyorsa ya da bir kod alanına
    yazılmışsa denetlenir. **Dişi doğrulandı** — geçici sonda dosyasıyla 4
    anahtar kelimenin de yakalandığı görüldü, sonra silindi.
  - **CLAUDE.md güncellendi:** §23.9 (kök neden/çözüm/önleme) + §11'e hata maddesi.
  - **Doğrulama:** content-integrity ✓ (0 ihlal, [G] dahil) · i18n baseline 0 ✓ ·
    audit-learning-blocks ✓ · build ✓ (44 shell) · `sprint-flow.spec.ts` 4/4 ✓ ·
    `term-tooltip.spec.ts` regresyon 2/2 ✓.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Test kapsamı S4)

- **Aktif branch: `feature/sprint-simulator`.** Plan §6.3'teki Sonnet promptu
  uygulandı: **S4 — Test kapsamı boşlukları (mobil viewport + çapraz tarayıcı)
  TAMAMLANDI.** `Documents/testcoverage.md` (2026-07-03, bayat) yerine önce
  `tests/` klasörü elle tarandı — mobil kapsamın hâlâ sadece `/` ve `/docker`
  olduğu doğrulandı, çapraz tarayıcı project'i hiç yoktu.
  - **S4.1 — Mobil viewport genişletme:** `tests/mobile-smoke.spec.ts`'e 6 yeni
    route eklendi (`/python`, `/java`, `/sql` — dil sayfaları; `/selenium`,
    `/jenkins`, `/kubernetes` — araç sayfaları), `/` + `/docker` ile birlikte
    **toplam 8 sayfa**. Her route için: yatay kayma yok (CLAUDE.md §12), ilk
    sidebar sekmesi WCAG 2.5.5 36px dokunma hedefini karşılıyor, sekmeye
    dokunma sayfayı bozmuyor, console/page hatası yok. §22.1 istisna listesi
    (`/basit-backend`, `/security`, `/backend`) EKLENMEDİ. **8/8 PASS.**
  - **S4.2 — Çapraz tarayıcı (Firefox + WebKit):** Ana `playwright.config.ts`
    DEĞİŞTİRİLMEDİ (hâlâ sadece chromium, `npm run test:e2e` süresi etkilenmedi)
    — mevcut `playwright.quiz-audit.config.ts`/`playwright.interview-flows.config.ts`
    kalıbı izlenerek **ayrı** `playwright.cross-browser.config.ts` (yeni) +
    `tests-cross-browser/cross-browser-smoke.spec.ts` (yeni) eklendi. Sadece
    temsili 2 sayfa (`/` + `/docker`, CLAUDE.md §22 kalıbı) Firefox + WebKit
    project'lerinde SMOKE seviyesinde doğrulanıyor (derinlik değil, tarayıcıya
    özgü render/etkileşim kırılması riski). `npm run test:cross-browser`
    script'i eklendi (`package.json`). Firefox + WebKit browser binary'leri
    `npx playwright install` ile kuruldu. **4/4 PASS** (2 test × 2 tarayıcı).
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell, `playwright.config.ts` değişmedi) · mobile-smoke genişletilmiş
    8/8 PASS · cross-browser-smoke 4/4 PASS.
  - **✅ PLANDAKİ TÜM SONNET GÖREVLERİ (S1-S4) TAMAMLANDI.** Kalan tek kalem
    Faz 3 (Kullanıcı/Hasan'ın deploy/doğrulama açık uçları, plan §5) — kod işi
    değil, credential/panel işi.
  - **Açık iş:** `main`'e merge/PR kararı kullanıcıda.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Career Map Faz 2 S3)

- **Aktif branch: `feature/sprint-simulator`.** Plan §6.2'deki Sonnet promptu
  uygulandı: **S3 — Career Map Faz 2 (milestone/rozet + breadcrumb) TAMAMLANDI**
  (`Documents/career-map-feature-plan.md` §4.3/§4.4c). MVP'ye (v2 sorular,
  localStorage kalıcılığı, `estimatedHours`, `trackMapEvent`) DOKUNULMADI,
  üstüne kuruldu.
  - **S3.1 — Milestone/rozet sistemi:** `src/utils/careerMapMilestones.js`
    (yeni) — 5 milestone tanımı (plan §4.3 tablosu birebir): 🏁 İlk adım
    (haritanın ilk düğümü tamamlandı), 🏁 Kod yazan testçi (Java/Python/TS'ten
    biri), 🏁 Otomasyoncu (Selenium/Playwright'tan biri), 🏁 Full-stack tester
    (Postman/REST Assured + SQL), 🏆 SDET yolu tamam (ana yol düğümlerinin
    %80'i). Tamamen local-first, KENDİ ilerleme state'i TUTMAZ — mevcut
    `getLocalCompletedRoutes()`'tan HER render'da yeniden türetilir (tek
    doğruluk kaynağı ilkesi, CLAUDE.md §23.4). Ayrı bir `learnqa_map_milestones`
    anahtarı SADECE "bu milestone daha önce kutlandı mı?" bilgisini tutar (xp.js
    `completed` ilkesiyle aynı desen — konfeti/`trackMapEvent('milestone_earned')`
    bir kez tetiklensin diye).
    - **Not (dürüst sadeleştirme):** Plandaki "İlk quizin çözülmesi" tetikleyicisi
      mevcut altyapıda YOK (yalnızca route-seviyeli tam tamamlanma izleniyor) —
      "İlk adım" milestone'ı haritanın ilk düğümünün TAMAMEN bitmesine bağlandı.
    - `QAMentorPage.jsx`'e `MilestoneStrip` alt bileşeni eklendi (`MindMapView`
      içinde, süre rozeti bloğunun hemen ardında) — kazanılan/kazanılmayan
      rozetler renk farkıyla gösterilir, yeni kazanımda `ConfettiExplosion`.
  - **S3.2 — Ders sayfasında "haritanda neredesin" breadcrumb'ı:**
    `TopicHeader.jsx`'e `useMapBreadcrumb()` eklendi — `TopicHeader` TÜM ders
    sayfalarında (TopicPage üzerinden ~25 teknoloji sayfası + Algorithms/
    ManualTesting/WhatIsTesting) paylaşıldığından buraya eklemek TEK NOKTADAN
    tüm sitede yayılım sağladı. **`TopicPage.jsx`'in quiz motoruna
    DOKUNULMADI** (plan kısıtı). `/qa-mentor`, `/leaderboard`,
    `/verify-certificate`, `/qa-assistant`, `/sprint` hariç tutuldu (harita
    düğümü değiller). Breadcrumb'a tıklayınca `/qa-mentor`'a gider.
  - **`tests/career-map-milestones.spec.ts` (yeni, 4 test):** milestone
    kazanımı (first-step + code-writing-tester kazanılır, diğerleri
    kazanılmaz), breadcrumb doğru pozisyon gösterir + tıklanınca /qa-mentor'a
    gider, profil yokken breadcrumb hiç görünmez, /qa-mentor'da breadcrumb
    kendisi görünmez. **4/4 PASS.**
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell) · yeni testler 4/4 ✓ · regresyon `career-map.spec.ts` (12) +
    `qa-mentor-progress-tracking.spec.ts` (1) + `qa-mentor-roadmap-order.spec.ts`
    (1) = **14/14 PASS** (hiç kırılma yok).
  - **S3.3 (opsiyonel, planda "en son" işaretli) YAPILMADI:** paylaşılabilir
    harita görseli (`<canvas>` + `toDataURL()`) — düşük öncelik, istenirse
    ayrı bir oturumda eklenebilir.
  - **🔜 Sırada (plan §6.3, Sonnet promptu hazır):** S4 test kapsamı boşlukları
    (mobil viewport genişletme + çapraz tarayıcı).

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Sprint içerik genişletme S1)

- **Aktif branch: `feature/sprint-simulator`.** Opus'un Faz 1 çekirdeğinin
  (aşağıda) hemen ardından, plan §6.1'deki Sonnet promptu uygulandı: **S1 —
  Sprint içerik genişletme + HomePage giriş kartı TAMAMLANDI.**
  - **`src/data/sprintsData.js`'e 2 yeni bug eklendi (Sprint 1 → 4 bug):**
    LQA-103 (ödeme butonuna çift tıklayınca sipariş iki kez oluşuyor —
    idempotency key + veritabanı UNIQUE constraint, check-then-act yarış durumu
    dersi), LQA-104 (süresi geçmiş kupon hâlâ geçerli — istemciden gelen tarihe
    güvenmeme + test verisinde deterministik/sabit tarih kullanma dersi).
  - **Yeni `sprint-2` eklendi** ("API Performans ve Güvenilirlik", ShopLab
    Platform/Backend ekibi, 2 bug): LQA-201 (ürün listesi N+1 sorgu — REST
    Assured `.time(lessThan(...))` + donanımdan bağımsız sorgu-sayısı
    assertion'ı dersi), LQA-202 (eşzamanlı sipariş istekleri stoğu negatife
    düşürüyor — `CountDownLatch` ile gerçek eşzamanlılık testi + atomik
    `UPDATE ... WHERE stok > 0` çözümü, LQA-103'teki check-then-act dersinin
    farklı bir alanda tekrarı).
  - **🐛 Gerçek bug bulundu ve düzeltildi (kapsam dışı ama zorunlu):** Sprint 2
    eklenince `SprintPage.jsx` hâlâ sabit `sprintsData.sprints[0]` gösteriyordu
    — yeni sprint hiçbir zaman ERİŞİLEMEZ olurdu. `SprintPage.jsx`'e sprint
    seçici (tab bar, `data-testid="sprint-tab"`) eklendi; sprint değişince bug
    detay paneli kapanır. Bu değişiklik plan promptunun orijinal dosya kapsamı
    dışındaydı ama içerik eklemenin doğal sonucu olarak zorunluydu.
  - **`src/components/HomePage.jsx`'e "QA Sprint Simülatörü" giriş kartı
    eklendi** — mevcut `resume-banner` statik kalıbı KOPYALANDI (yeni tasarım
    icat edilmedi), amber/orange renk şeması ile ayrıştırıldı.
  - **Yan iyileştirme — denetim tutarlılığı:** Yeni prediction'ların doğru şık
    pozisyonları bilinçli çeşitlendirildi (A/B/C dağılımı), "hep B" gaming
    riskini büyütmemek için (bkz. §23'teki bilinen 47/50 uyarısı — bu artık
    Sprint bloklarında tekrarlanmadı).
  - **`tests/sprint-flow.spec.ts`'e 3. test eklendi:** sprint sekmesi
    değiştirince farklı sprint'in bug'ları gösteriliyor mu (yukarıdaki
    SprintPage bug'ının regresyon testi). **3/3 PASS.**
  - **Doğrulama:** `node --check sprintsData.js` ✓ · content-integrity ✓
    (39 dosya) · i18n baseline 0 ✓ · audit-learning-blocks ✓ (mission:18,
    prediction:78, 0 ihlal) · build ✓ (44 shell) · `sprint-flow.spec.ts` 3/3 ✓ ·
    `homepage-recommended-badges.spec.ts` regresyon 2/2 ✓.
  - **🔜 Sırada (plan §6.2/§6.3, Sonnet promptları hazır):** S3 Career Map
    Faz 2 (milestone/rozet + breadcrumb), S4 test kapsamı (mobil viewport +
    çapraz tarayıcı).

---

## 📌 Önceki Durum (2026-08-01, Opus — Sprint Simulator Faz 1)

- **Aktif branch: `feature/sprint-simulator`** (`main`'den açıldı). Kullanıcı
  `Documents/` altındaki 20 plan dosyasının denetlenmesini ve açık kalan işler
  için yeni bir plan + Opus/Sonnet görev dağılımı istedi. Yeni plan:
  **`Documents/sprint-simulator-and-open-items-plan.md`**.
  - **✅ FAZ 1 — QA SPRINT SIMULATOR (`/sprint`) OPUS TARAFI TAMAMLANDI (O1-O8):**
    - `src/lib/sprintStore.js` (yeni) — local-first pano durumu. **Tek-doğruluk
      ilkesi:** bug'ın "bitti" bilgisi BURADA TUTULMAZ, `xp.js`'ten türetilir
      (`getCompletedExercises`); depo yalnızca "sprint'e çekildi" + "sprint
      kapatıldı" tutar. İkinci bir tamamlanma state'i drift üretirdi (§23.4).
    - `src/components/TopicPage.jsx` — **tek satır:** `renderBlock` `export`
      edildi. Sprint sayfası bug görevlerinin gömülü bloklarını (code-playground,
      prediction…) AYNI makineden geçirir — kendi renderer'ını yazmak
      challenge-first'in "YENİ SANDBOX YAZMA" ilkesinin ihlali olurdu.
    - `src/components/SprintBoard.jsx` (yeni) — Kanban panosu (Backlog/In
      Progress/Done), bug kartı, severity rozeti. Saf Tailwind, dış paket yok.
    - `src/components/SprintPage.jsx` (yeni) — sayfa kabuğu, sprint özeti +
      ilerleme, bug raporu paneli, MissionBlock host'u, sprint kapanış töreni
      (bonus XP + konfeti + retrospektif + skill signal).
    - `src/data/sprintsData.js` (yeni) — Sprint 1 "Checkout Akışı Kararlılığı",
      2 referans bug. **BİR BUG = BİR MISSION**, 5 adım QA iş akışına birebir
      oturur: Analiz → Test Case → Otomasyon → CI → Merge. LQA-101 (sessiz login
      hatası, frontend 401'i yutuyor) + LQA-102 (bayat sepet toplamı). Tam
      bilingual, STRICT_ZERO.
    - Rota bağlandı: `App.jsx` (lazy+Route), `seo.js` ROUTE_SEO,
      `generate-static-routes.mjs` specialRouteContent, `CLAUDE.md` §2 route
      haritası. Build artık **44** statik shell üretiyor (43'ten +1).
    - `tests/sprint-flow.spec.ts` (yeni, 2 test) — veri-güdümlü E2E: 3 kolon
      render, "Sprint'e al" geçişi, adım kilidi, tüm bug'lar kapanınca Done +
      sprint kapatma + XP/localStorage + F5 kalıcılığı. **2/2 PASS.**
  - **🐛 Testin yakaladığı GERÇEK bug (düzeltildi):** `renderBlock`'un 2.
    parametresi React key'ine dönüşüyor; ilk yazımda sabit `0` verilmişti, bu
    yüzden React iki farklı bug'ın MissionBlock'unu aynı instance sanıp yeniden
    kullanıyor, önceki bug'ın "tamamlandı" state'i taşınıyor ve ikinci bug HİÇ
    tamamlanmış işaretlenmiyordu. Key `selectedBug.id` yapıldı.
  - **🔍 Yan bulgu — denetim kör noktası kapatıldı:** `audit-learning-blocks.mjs`
    prediction şema kontrolünü YALNIZCA dil sayfalarında (`FILES`) yapıyordu;
    mission içine gömülü prediction'lar (seleniumData, playwrightData,
    cypressData, restAssuredData, sprintsData) HİÇ doğrulanmıyordu — eksik
    `reveal` veya iki `correct` sessizce geçerdi. Kontrol `MISSION_FILES`'a da
    genişletildi: **denetlenen prediction 50 → 70**, hepsi şemayı karşılıyor.
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ ·
    audit-learning-blocks ✓ (mission:14, prediction:70, 0 ihlal) · build ✓
    (44 shell, SEO geçti) · `tests/sprint-flow.spec.ts` 2/2 ✓ ·
    regresyon `mission-flow` + `learning-blocks-render` 4/4 ✓.
  - **🔜 Sırada (Sonnet promptları planın §6'sında HAZIR):** S1 sprint içerik
    genişletme (Sprint 1'e +2 bug, Sprint 2 API/performans temalı), S2 HomePage
    giriş kartı, S3 Career Map Faz 2 (milestone/rozet + breadcrumb), S4 test
    kapsamı (mobil viewport + çapraz tarayıcı).
  - **🔜 Kullanıcı (Hasan) tarafı, planın §5'i:** `explain-code-output` ve
    `mentor-advice` edge function deploy teyidi, social-proof RPC yeniden
    çalıştırma, trending-skills aktivasyon adımları.

---

## 📌 Önceki Durum (2026-08-01 — merge durumu doğrulandı)

- **✅ AKTİF BRANCH: `main`.** `feature/challenge-first` main'e merge edildi
  (`62dccf2 Merge branch 'feature/challenge-first'`). Ayrıca `frontenddevelopment-for-qa`
  (`/qa-frontend` sayfası) ve `feature/api-testing-page` (`/api-testing` sayfası)
  branch'leri de doğrulandı: ikisi de `main`'e göre 0 commit ileride — yani
  içerikleri zaten `main`'de. Aşağıdaki geçmiş girdilerdeki "main'e merge/PR
  kararı kullanıcıda" notları artık ÇÖZÜLMÜŞ durumda; yeni bir aksiyon gerekmiyor.
  Çalışma ağacı temiz.

- **Önceki iş (2026-07-31, Sonnet — Kavram Tooltip yoğunlaştırma, `feature/challenge-first`
  üzerinde yapıldı, artık main'de):** Mission Dalga 2'nin (aşağıda)
  hemen ardından, kullanıcı "kavram tooltip'i özellikle yeni başlayanlar için
  önemli, ilk girilen sayfalarda (Test Nedir, Manuel Test, Algoritma Temelleri,
  Java/TS/Python) daha yoğun olmalı" dedi. **Gerçek bir mimari boşluk
  bulundu:** `/manual-testing` ve `/algorithms` `TopicPage.jsx` kullanmıyordu
  (kendi özel component'leri var) — `highlightGlossaryTerms` bu iki sayfada
  HİÇ çalışmıyordu (0 tetikleyici, ölçüldü). Düzeltildi: `ManualTestingPage.jsx`
  (`InfoBox`) + `AlgorithmsPage.jsx` (`LessonCard`) render noktalarına
  `highlightGlossaryTerms` bağlandı; `termGlossary.js` 57→84 terime genişletildi
  (test temelleri, manuel test, algoritma, dil temelleri, ortam). Ölçülen etki:
  `/manual-testing` 0→33, `/algorithms` 0→7 tetikleyici. Detay: plan §3.6.4.
  Doğrulama: content-integrity + i18n baseline 0 + build + 2 E2E test regresyonu
  (term-tooltip + mission-flow, 3/3 PASS). Commit `8fe795e`.

- **Aynı gün, hemen ardından — Rehber Karakter (Mascot):** Kullanıcı "sevimli
  bir animasyon karakteri + konuşma balonu, bilmediğin kelimenin üstüne gel de
  görsün diye yönlendirsin" istedi. AskUserQuestion ile 3 tasarım kararı
  netleştirildi: sabit köşe (scroll takip ETMEZ), sadece 3 giriş sayfası,
  her ziyarette rozet + tıklayınca balon. `TooltipGuideMascot.jsx` (yeni,
  🦉 emoji + self-contained dark-mode algılama) yazıldı; `TopicPage.jsx`'e
  DOKUNULMADI (paylaşılan dosya), 3 sayfanın kendi wrapper'ına eklendi
  (`WhatIsTestingPage`/`ManualTestingPage`/`AlgorithmsPage`). **Gerçek
  tarayıcı testiyle bulunan bug:** ilk sürüm sol-alt köşedeydi, App.jsx'teki
  global `ChatWidget`'la (bottom-20 left-4) çakışıyordu (balon açılınca
  üstüne biniyordu) — sol kenar dikey-orta konuma taşınarak düzeltildi.
  `tests/tooltip-guide-mascot.spec.ts` (yeni, 5 test: 3 sayfa aç/kapa +
  kapsam-dışı sayfada yokluk + ChatWidget çakışma kontrolü) **5/5 PASS**.
  Doğrulama: content-integrity + i18n baseline 0 + build + mascot testi (5/5)
  + term-tooltip/mission-flow regresyonu (3/3) — hepsi geçti. Detay: plan §3.6.5.

- **Aynı gün, üçüncü tur — Dikkat Çekme Animasyonu:** Kullanıcı "maskot ilk
  sayfa açılışta yanıp sönsün, kullanıcı bir defa tıklayınca boyutuna geri
  dönsün ve sadece sabit kalsın" istedi. `hasInteracted` state eklendi: rozet
  İLK tıklamaya kadar sürekli yanıp söner (`tooltipGuideAttention`, ölçek+
  opaklık pulse, 1.1sn), ilk tıklamadan SONRA kalıcı olarak durur + normal
  boyutuna döner. **2 gerçek bug bulunup düzeltildi:** (1) `@keyframes`
  tanımı yanlışlıkla sadece balonun içindeydi — rozet balon açılmadan ÖNCE
  yanıp sönmesi gerektiğinden dışarı taşındı; (2) rozet sürekli pulse ettiği
  için Playwright'ın "stable" actionability kontrolü ilk tıklamada asla
  geçmiyordu (test timeout) — gerçek kullanıcıyı ETKİLEMEZ, test'te ilk
  tıklama `force:true` ile düzeltildi. `tooltip-guide-mascot.spec.ts`'e yeni
  test eklendi (animasyon öncesi/sonrası + boyut kontrolü). **6/6 PASS**
  (temiz/tek-worker koşumda; art arda çok test dev server'ı meşgul edip
  transient timeout verebiliyor — mascot mantığıyla ilgisiz, bilinen not).
  Doğrulama: content-integrity + i18n baseline 0 + build + mascot testi (6/6)
  + term-tooltip/mission-flow regresyonu (3/3) — hepsi geçti. Detay: plan §3.6.5.

- **Önceki iş (aynı gün) — Mission Dalga 2:** Phase 1 + Phase 1.5 önceki
  oturumda TAMAMLANMIŞTI (6 sayfa × 1 mission + kavram tooltip'i). Bu oturumda
  kullanıcı "bu görevleri ne kadar genişletebilirsin, her dikey sekmede
  uygulanabilir mi?" diye sordu. Değerlendirme: teknik engel yok ama HER
  sekmede zorlama görev, kullanıcının orijinal stratejik yazısının uyardığı
  "özellik sayısı, derinlik değil" tuzağına düşer — sadece "aksiyon" sekmeleri
  (Framework Mimarisi, Network, Troubleshooting, JOINs, Test Zinciri gibi)
  buna uygun. Kullanıcı **"mevcut 6 sayfada, aksiyon sekmelerine +1-2 görev"**
  seçeneğini onayladı.
  - **✅ MISSION DALGA 2 TAMAMLANDI — 6 sayfanın HER BİRİNE ikinci bir görev
    eklendi** (plan §9.2 Dalga 2 tablosu, 6 ayrı commit):
    1. **Selenium** → Framework Mimarisi (SOLID+POM) sekmesi: "Ham testi POM'a
       refactor et" (`selenium-pom-refactor-mission`) — locator tekrarının
       riski (prediction) → LoginPage sınıfı yaz → login() metodu yaz →
       bakım maliyeti 10→1 dosya (prediction) → testi Page Object'le yeniden yaz.
    2. **Playwright** → Framework Mimarisi sekmesi: aynı POM teması TypeScript
       karşılığı (`playwright-pom-refactor-mission`) — sekmenin zaten
       derinlemesine işlediği fixture/DI konusuyla ÇAKIŞMAZ.
    3. **Cypress** → Network & cy.intercept() sekmesi: "Yavaş API'yi stub'la,
       loading/hata durumunu test et" (`cypress-network-stub-mission`) — farklı
       tema (network stubbing). ⚠️ **Gerçek bug yakalandı:** bu sekme (s5)
       ÇİFT-AĞAÇLI, ilk yazımda görev SADECE EN ağacına gitmişti, doğrulama
       sırasında TR ağacına da eklendi.
    4. **Python** → Troubleshooting/Yaygın Hatalar sekmesi: "CI'da patlayan
       traceback'i oku, kök nedeni bul, düzelt" (`python-traceback-debug-mission`)
       — stepAnimationTracebackReading'in "en alttan oku" kalıbını uygulamalı
       yapıyor. `finalEnSections`/`finalTrSections`'a (Dalga A8 güvenli kalıp).
    5. **SQL** → SQL JOINs sekmesi: "Sipariş verisinde yetim kayıt bul"
       (`sql-orphan-orders-mission`) — LEFT JOIN + WHERE IS NULL idiyomu.
    6. **REST Assured** → Test Zinciri sekmesi: "Kullanıcı oluştur, id çıkar,
       GET ile doğrula" (`restassured-chain-mission`) — sekmenin zaten
       gösterdiği tam `UserCrudE2ETest` zincirinin en küçük yapı taşı.
  - **Toplam mission sayısı: 6 → 12** (`audit-learning-blocks.mjs` çıktısı).
  - **Doğrulama (her commit'te ayrı ayrı):** content-integrity ✓ · i18n
    baseline 0 ✓ · audit-learning-blocks (mission:12, 0 ihlal) ✓ · build ✓
    (43 shell) · `tests/mission-flow.spec.ts` regresyon testi (Selenium'da
    artık 2 mission var, test hâlâ doğru olanı — Locators'takini — bulup
    PASS oluyor) ✓.
  - Plan §9.2 manuel test rehberi Dalga 1/Dalga 2 tablolarıyla güncellendi.
  - **Açık iş:** Merge tamamlandı (yukarı bak). Phase 2/Phase 3 hâlâ
    ayrı onay + planlama ister.

- **Önceki oturum (2026-07-30, Opus) — Challenge-First Phase 1 Opus tarafı:**

- **Aktif branch: `feature/challenge-first`** (yeni, `main`'den açıldı). Kullanıcının
  stratejik değerlendirme yazısı denetlenip yeni plan yazıldı:
  **`Documents/challenge-first-experience-plan.md`** (learning-science planının halefi).
  Değerlendirme özeti: yazının "Phase 3" listesi (AI coach / prediction / memory-viz /
  analytics) ZATEN BİTMİŞ; gerçek yeni değer challenge-first + iş simülasyonu.
  Kullanıcı **Phase 1 = Challenge-First Senaryo Katmanı** yönünü seçti; açık ürün
  kararı (sayfa-içi vs ayrı sekme) önerilen "sayfa-içi" ile ilerletildi.
  - **PHASE 1 OPUS TARAFI (P1-O1…O5) TAMAMLANDI — bu oturum:**
    - `src/lib/skillSignals.js` (yeni) — local-first beceri sinyali deposu
      (`recordSkillSignal`/`getSkillSignals`/`getSkillSignalCounts`/`hasSkillSignal`).
      Phase 3'te SkillRadar'ı "çözülen challenge"dan besleyecek; şimdilik toplar.
    - `src/components/MissionBlock.jsx` (yeni) — `type:'mission'` görev zinciri:
      adım sırayla kilit açar, gömülü blok `onFirstSuccess` verince adım biter,
      "💡 Takıldın mı? Mini-lesson aç" (challenge-first çekirdeği), tamamlanınca
      XP+konfeti+beceri sinyali+debrief. YENİ SANDBOX YAZMAZ.
    - `src/components/TopicPage.jsx` — `import MissionBlock` + `case 'mission'`:
      `renderInner` callback'i her adımın gömülü bloğunu (code-playground/prediction/
      editor/sandbox…) AYNI `renderBlock` makinesinden geçirir.
    - `scripts/audit-learning-blocks.mjs` — `mission` şema değişmezi eklendi
      (id benzersiz + relatedTopicId + ≥3 adım + her adımda brief/miniLesson/
      type'lı block + successCriterion geçerli). Build hard-fail. MISSION_FILES
      listesi seleniumData.js dahil — Sonnet rollout ederken yeni dosyaları ekleyecek.
    - `src/data/seleniumData.js` — REFERANS görev "Login sayfasını test et"
      (Locators sekmesi, 5 adım: locator seç → tıkla → assert → wait stratejisi
      seç → explicit wait yaz; çift-ağaç `s2.tr/s2.en`'e tek sabit push).
  - **Doğrulama:** `audit-learning-blocks` ✓ (mission: 1, 0 ihlal) · content-integrity
    ✓ (38 dosya) · i18n:check ✓ (baseline 0, regresyon yok) · `npm run build` ✓
    (43 static shell, SEO geçti; seleniumData chunk 633 kB — bilinen büyük-chunk
    uyarısı, §14/§23.8).
  - **PHASE 1.5 — KAVRAM TOOLTIP OPUS TARAFI (P1.5-O1…O3) da TAMAMLANDI — aynı oturum:**
    Kullanıcı gözlemi: "yazılım bilmeyen kullanıcı en basit kavramları anlamıyor."
    Çözüm: terimlerin üstüne gelince/dokununca günlük-hayat benzetmesi baloncuğu.
    - `src/data/termGlossary.js` (yeni) — terim→benzetme sözlüğü, ~24 tohum terim
      (locator, selector, assertion, fixture, XPath, DOM, API, endpoint, CI/CD,
      pipeline, commit, merge, branch, framework, boolean, null, exception,
      variable, array, query, flaky test, timeout, mock, regression).
    - `src/components/TermTooltip.jsx` (yeni) — hover/focus/tap ile açılan,
      ESC/dışarı-tık kapanan, klavye-erişilebilir, dark-mode + bilingual popover +
      `highlightGlossaryTerms` helper (modül-seviyesi tek regex, `\b` ASCII sınırı,
      blok başına ilk-geçiş ≤8 terim; kod blokları ASLA sarılmaz).
    - `src/components/TopicPage.jsx` — `case 'text'` ve `case 'simple-box'` prose
      render'ına `highlightGlossaryTerms(...)` bağlandı (minimal, düşük risk).
    - **Not:** termGlossary.js `*Glossary.js` olduğundan i18n scanner'ın `*Data.js`
      glob'una GİRMİYOR — `en` saf İngilizce + `aliases` ASCII elle korunmalı
      (plan §3.6.1). Gate'ler yeşil (content-integrity + i18n:0 + build 43 shell).
- **Bu oturum (2026-07-30, Sonnet) — Phase 1 mission rollout devam ediyor
  (branch `feature/challenge-first`, plan §7.2/§7.3):**
  - ✅ **playwrightData.js — "Sepete ürün ekle" mission görevi eklendi** (commit
    aşağıda). Locator Stratejileri sekmesi (s3), 5 adım: sağlam locator seç
    (getByRole vs class vs XPath, prediction) → tıkla (code-playground) →
    web-first assertion yaz (code-playground) → auto-wait'in Thread.sleep'i
    neden gereksiz kıldığını anla (prediction) → uçtan uca birleştir
    (code-playground). automationexercise.com'u hedefliyor (sitenin kendi test
    konusu — projeyle tutarlı). Çift-ağaç `s3.tr/s3.en`'e tek sabit push.
    `scripts/audit-learning-blocks.mjs` `MISSION_FILES`'e `playwrightData.js`
    eklendi. **Doğrulama:** audit (mission: 2, 0 ihlal) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ✅ **cypressData.js — "Ürün ara ve sonuçları doğrula" mission görevi eklendi.**
    Temel Komutlar & Selector Stratejisi sekmesi (s2), 5 adım: data-cy selector
    seç (prediction) → yaz (code-playground) → retry-able .should() assertion
    yaz (code-playground) → cy.wait(sayı)'nın neden flaky testin en sık kök
    nedeni olduğunu anla (prediction) → uçtan uca birleştir (code-playground).
    Debrief üç aracı (WebDriverWait/web-first assertion/.should()) "aynı
    problemi çözer: koşulu bekle, süreyi değil" diye bağlıyor. Çift-ağaç
    `s2.tr/s2.en`'e tek sabit push. `MISSION_FILES`'e `cypressData.js` eklendi.
    **Doğrulama:** audit (mission: 3, 0 ihlal) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ✅ **pythonData.js — "Kullanıcı API'sini pytest ile test et" mission görevi
    eklendi.** Real World (pytest) sekmesi (final section index 16), 5 adım:
    fixture ile tekrarı önleme kararı (prediction) → base_url fixture'ını yaz
    (code-playground) → status_code assert et (code-playground) → parametrize
    kararı (prediction) → fixture+parametrize'ı uçtan uca birleştir
    (code-playground). pythonData.js'in RİSKLİ `applyTr`/index-override
    mekanizmasına DOKUNULMADI — güvenli kalıbı takip ederek mission sabiti
    SADECE `finalEnSections[16]`/`finalTrSections[16]` dizi literal'lerine
    (spread sonrası) eklendi (bkz. dosyadaki "GUVENLIK NOTU" — Dalga A8 kalıbı).
    **Doğrulama:** audit (mission: 4, prediction: 44) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ⚠️ **Yan bulgu ve düzeltme — ASCII-normalize Türkçe kör noktası (CLAUDE.md
    §23.1) 3 yerde gerçekten yakalandı:** `check-i18n-leaks.mjs` özel Türkçe
    karakter (ığşçöüİĞŞÇÖÜ) arıyor; "bazen 200ms, bazen 1.5sn" gibi özel
    karaktersiz Türkçe yorumlar plain-string `prediction.code` alanlarında
    sessizce EN moda sızıyordu. Python'daki yeni blok scanner'ın YAKALADIĞI
    (özel karakterli) 1 leak'i düzeltirken, aynı kalıbın **playwrightData.js**
    (`pw-mission-autowait-choice`), **cypressData.js** (`cy-mission-nowait-
    choice`) ve **seleniumData.js** (`sel-mission-wait-choice`, önceki Opus
    oturumundan kalma) içinde de var olduğu elle taranarak bulundu — üçü de
    `{tr,en}` bilingual yapıldı. Ders: yeni prediction `code` alanı yazarken
    düz string + Türkçe yorum kombinasyonundan KAÇIN, baştan `{tr,en}` yaz.
  - ✅ **sqlData.js — "Ürün fiyat verisini doğrula" mission görevi eklendi.**
    SELECT & Sort sekmesi, 5 adım: doğru WHERE koşulu seçimi (prediction) →
    negatif fiyatları getiren sorguyu yaz → ORDER BY ile en kötü fiyatı üste
    sırala → NULL'ın karşılaştırmalarda SESSİZCE elendiğini anlama (prediction)
    → negatif+NULL'ı birleştiren tam sorguyu yaz. `predSqlDistinctMultiCol`
    kalıbını takip etti: tek bilingual sabit, hem EN hem TR "SELECT & Sort"
    section'ına AYNI referansla (`replace_all`) eklendi. **Doğrulama:** audit
    (mission: 5, prediction: 46) ✓ · content-integrity ✓ · i18n baseline 0 ✓ ·
    build ✓ (43 shell).
  - ✅ **restAssuredData.js — "GET /api/users/2 isteğini given/when/then ile
    test et" mission görevi eklendi.** Assertions (Hamcrest) sekmesi, 5 adım:
    eksik .then() zincirinin sonucunu tahmin et (prediction) → status code
    doğrula → body içeriğini (JSON Path + Hamcrest) doğrula → negatif senaryo
    kararı — var olmayan kullanıcı için doğru HTTP kodu (prediction) → negatif
    senaryoyu yaz (id=9999 → 404). Plan §3.3'ün "API (Postman/REST Assured —
    istek→assertion→negatif senaryo)" hedefini birebir karşılıyor. Tek-ağaçlı
    dosya (§9.5): sabit `sections[5]`'e (paylaşılan tr/en referansı) TEK yere
    eklendi. `MISSION_FILES`'e `restAssuredData.js` eklendi. **Doğrulama:**
    audit (mission: 6, 0 ihlal) ✓ · content-integrity ✓ · i18n baseline 0 ✓ ·
    build ✓ (43 shell).
  - **✅ P1-S1 (6 sayfa mission rollout) TAMAMLANDI** — Selenium (Opus referans) +
    Playwright + Cypress + Python + SQL + REST Assured, plan §3.4'teki "en az
    6 sayfa" hedefine ULAŞILDI.
  - ✅ **P1-S3 + P1-S4 TAMAMLANDI:**
    - `tests/mission-flow.spec.ts` (yeni) — /selenium referans görevi üzerinde
      TAM veri-güdümlü E2E: adım kilidinin sırayla açıldığı, "Mini-lesson aç"ın
      çalıştığı (metin `steps[].miniLesson`'dan okunur), tüm 5 adım (2
      prediction + 3 code-playground) sırayla tamamlanınca tamamlanma banner'ı
      + `learnqa_xp_selenium` localStorage'a XP/completed'ın gerçekten
      yazıldığı doğrulanıyor. Sabit metin/id gömülmez — `seleniumData`'dan
      hesaplanır (`tests/learning-blocks-render.spec.ts` ile aynı ilke).
      **Yerel Chromium'da PASS (37.8s).** Yeni route yok → §22.1 değişmez.
    - `src/components/MissionBlock.jsx` — testi güvenilir kılmak için 4
      `data-testid` eklendi (`mission-block` + `data-mission-id`/`data-
      mission-complete`, `mission-step` + `data-step-index`/`data-step-
      locked`/`data-step-done`, `mission-mini-lesson`, `mission-complete-
      banner`) — `mentor-panel`/`mentor-ai-button` kalıbıyla aynı (içerik
      DEĞİŞMEDİ, sadece test-scoping).
    - `CLAUDE.md` §5 blok listesine `prediction | code-trace | heap-stack | mission`
      eklendi (üçü zaten vardı ama listeye hiç girmemişti — fırsatçı düzeltme).
    - **Doğrulama:** content-integrity ✓ · i18n baseline 0 ✓ · audit-learning-
      blocks (mission:6, 0 ihlal) ✓ · build ✓ (43 shell) · `npx playwright test
      tests/mission-flow.spec.ts` ✓ (1/1 PASS).
  - **✅ PHASE 1 (Challenge-First Senaryo Katmanı) TAMAMLANDI** — plan §3.4
    "bitti" tanımının tamamı karşılandı: 6 sayfa (Selenium+Playwright+Cypress+
    Python+SQL+REST Assured), audit/i18n/build kapıları yeşil, E2E test yeşil,
    `skillSignals.js` her görev bitince sinyal topluyor (Phase 3 hazır).
  - ✅ **P1.5-S1 — `termGlossary.js` 24 → 57 terime genişletildi** (33 yeni
    terim): loop, condition, class/object, inheritance, JSON, HTTP status
    code, cookie/session, container, image, pod, thread, async/await,
    promise, callback, closure, generic, regex, environment variable,
    dependency, repository, deploy, rollback, cache, latency, idempotent,
    token, schema, webhook, payload, queue, load balancer, log/stack trace,
    race condition. Her biri günlük-hayat benzetmeli + bilingual + ASCII
    aliases; script ile 0 duplicate alias + 0 non-ASCII + 0 eksik EN alanı
    doğrulandı. **Doğrulama:** node --check ✓ · content-integrity ✓ · i18n
    baseline 0 ✓ · build ✓ (43 shell). (Not: `termGlossary.js` `*Data.js`
    glob'una girmediği için i18n scanner'ın 38-dosya taramasına dahil DEĞİL —
    ASCII/EN bütünlüğü yukarıdaki özel script ile elle doğrulandı.)
  - ✅ **P1.5-S3 — `tests/term-tooltip.spec.ts` (yeni) TAMAMLANDI:** /selenium
    Locators sekmesi üzerinde tam veri-güdümlü E2E (hangi sekmede/terimde test
    edileceği `TERM_GLOSSARY` + `seleniumData` TARANARAK bulunur, sabit
    gömülmez). İki test: (1) bilinen terim noktalı-çizgili sarılıyor, hover ile
    popover açılıp benzetme metnini gösteriyor, ESC ile kapanıyor, TAB
    (klavye) ile fokuslanınca da açılıp blur'da kapanıyor (§3.6.1 "hover VE
    focus VE tap" gereksinimi); (2) `<pre>` kod bloğu içinde HİÇ tooltip
    tetikleyici yok (mekanizma mimari olarak sadece text/simple-box'a bağlı).
    **Bulgu (test yazarken düzeltildi):** ilk yazımda hover sonrası aynı
    elemente `.click()` atmak popover'ı AÇMAK yerine KAPATIYORDU (imleç zaten
    üstteyken click, hover'ın açtığı state'i toggle'lıyor) — click-toggle
    testi bunun yerine klavye focus/blur ile değiştirildi (hem daha güvenilir
    hem erişilebilirlik iddiasını daha doğrudan kanıtlıyor). Ayrıca test
    güvenilirliği için `TermTooltip.jsx`'e 3 `data-testid` eklendi
    (`term-tooltip-trigger` + `data-term-key`, `term-tooltip-popover`).
    **Yerel Chromium'da 2/2 PASS (33.2s).**
  - **✅ PHASE 1.5 (Kavram Tooltip'i) TAMAMEN BİTTİ.** P1.5-S2 (kapsamı
    callout/info/tip render'larına genişletme) BİLİNÇLİ OLARAK ATLANDI —
    opsiyonel işaretliydi (plan §7.3), mevcut text/simple-box kapsamı
    çekirdek kullanıcı deneyimini zaten karşılıyor; istenirse sonraki
    oturumda eklenebilir.
  - **✅✅ PHASE 1 + PHASE 1.5 TAMAMEN BİTTİ (bu oturum, 2026-07-30→31).**
    Tüm doğrulama kapıları (content-integrity + i18n baseline 0 +
    audit-learning-blocks + build 43 shell + 2 yeni E2E test dosyası, toplam
    3/3 PASS yerel Chromium'da) yeşil. `main`'e merge/PR kararı kullanıcıda.
  - 🔜 **Sırada (kullanıcı onayı + ayrı planlama gerektirir, plan §4/§5):**
    Phase 2 (QA Sprint/Company Simulator, yeni `/sprint` rotası) veya Phase 3
    (adaptif zorluk + SkillRadar'ı `skillSignals.js`'ten besleme).
  - **Açık iş:** Merge tamamlandı (yukarı bak, `main`'de). Phase 2 (Sprint Simulator) ve
    Phase 3 (adaptif zorluk) ayrı onay + planlama ister (plan §4/§5).

- **Önceki oturum (2026-07-30, Opus) — plan denetimi + öğrenme-blok testleri
  (branch `feature/prediction-blocks`):** Bu oturumun SON işi (2026-07-30, Opus):
  `learning-science-upgrade-plan.md`'nin ne kadar yerine getirildiği denetlendi
  ve **test kapsamı boşluğu kapatıldı** (commit `142d8d5`):
  - **Denetim sonucu — plan TAM yerine getirilmiş:** prediction (java=10/js=9/
    python=8/sql=8/ts=7 = 42 benzersiz id, runtime-walk ile İKİ dil ağacında da
    wired doğrulandı), code-trace 5 + heap-stack 5, mentor Katman A/B (O1-O6 +
    S1-S5) tam, #7 Learning Analytics + MentorPanel + MentorNudge HomePage/App'te
    wired, edge function + şema ACTIVE. Mentor-advice her iki projede (test+prod)
    ACTIVE v2, GROQ_API_KEY mevcut.
  - **Eklenen kalıcı kontroller:** (1) `scripts/audit-learning-blocks.mjs` build
    zincirine girdi (`audit-interview-questions`'tan sonra) + `npm run
    audit:learning-blocks` — prediction/code-trace/heap-stack şema değişmezlerini
    (tam 1 correct, boş olmayan reveal, benzersiz id, code düz string, steps[].line
    sayısal) hard-fail eder. (2) `tests/mentor-panel.spec.ts` + `mentor-snapshot-
    weakness.spec.ts` (Sonnet) + `tests/learning-blocks-render.spec.ts` (Opus, 3
    test: /java'da üç blok tipinin render + etkileşimi).
  - **⚠️ Tespit edilen içerik bulgusu (kullanıcı kararı bekliyor, build kırmaz):**
    42 prediction'ın **40'ında doğru cevap 'B' pozisyonunda** — kullanıcı "hep B
    seç" ile gaming yapabilir. Şıkları karıştırmak önerilir ama bu 5 çift-ağaç
    dosyada 40 bloklu riskli bir içerik düzenlemesi; Opus tek başına yapmadı,
    audit UYARI olarak sürekli raporluyor. Düzeltme kararı kullanıcıda.
  - **Doğrulama:** `audit-learning-blocks` ✓ (0 ihlal) · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell) · 3 render + 8 mentor testi PASS.

- **Bu oturumda (2026-07-30, Sonnet)**
  `Documents/learning-science-upgrade-plan.md` Bölüm 6 §6.6'daki hazır promptla
  **#5 Kişisel AI Mentor — Sonnet tarafı (S1-S5) TAMAMLANDI** (Opus'un O1-O6
  backend/bileşen işi önceki oturumda bitmişti, bkz. plan §6 durum notu).
  3 ayrı commit:
  1. **S1 — `feat(mentor): oğüt şablolarını 14 route'a genişlet`** (`e912e05`):
     `mentorAdvice.js`'teki `ROUTE_ADVICE` havuzu 12 route'tan 26 route'a
     çıkarıldı — rest-assured, postman, bruno, jenkins, kubernetes, kafka,
     appium, aws, azure, jmeter, browserstack, gauge, test-frameworks,
     qa-frontend eklendi. Her girdi bilingual, somut (o teknolojinin en sık
     tuzağı) ve uygun yerde Java analojili.
  2. **S2 — `polish(mentor): MentorPanel giriş/AI-sonuç animasyonlarını cilala`**
     (`59014d0`): panel açılışına `animate-fadeIn`, AI sonucuna `animate-scaleIn`
     + `shadow-focus-accent`, AI hatasına `animate-fadeIn` — mevcut Tailwind
     animasyon kalıpları (yeni paket/CDN yok). Loading/empty/error state'leri ve
     36px touch target'lar zaten doğruydu.
  3. **S3+S4 — `test(mentor): panel + snapshot smoke testleri`** (`4a4941f`):
     `tests/mentor-snapshot-weakness.spec.ts` (`getPersistentWeakness`
     daysStruggling 1/7/14 gün + trend stuck/worsening/improving, seeded
     `learnqa_mentor_snapshots`) ve `tests/mentor-panel.spec.ts` (Katman A:
     proaktif panel + AI butonunun üye-değilken gizli olduğu + MentorNudge akışı
     + boş-veri durumunda hiçbir bileşenin render edilmediği; Katman B: gerçek
     Supabase girişi + `page.route()` ile mock'lanmış `mentor-advice` yanıtıyla
     AI butonu/sonucu, `GITHUB_ACTIONS==='true'` guard'ıyla CI'da skip). **Bu
     oturumda 4+4=8 testin TAMAMI yerel Chromium'da PASS oldu** (AI katmanı
     dahil — `.env.local`'de test kullanıcısı zaten yapılandırılıydı, gerçek
     Groq çağrısı yapılmadı, yalnızca edge function mock'landı).
  - **Doğrulama (her commit'te ayrı ayrı):** `node --check` ✓ ·
    `check-content-integrity.mjs` ✓ (38 dosya) · `check-i18n-leaks.mjs` ✓
    (baseline 0, regresyon yok — `mentorAdvice.js`/`MentorPanel.jsx` zaten
    `src/data/*.js` kapsamı dışında) · `npm run build` ✓ (43 static shell, SEO
    geçti).
  - **Kalan (kullanıcıda, plan §6.2):** `supabase functions deploy mentor-advice
    --project-ref <ref>` gerçek deploy'u henüz teyit edilmedi — Katman A
    (yerel, üyeliksiz) deploy'suz da tam çalışır; Katman B (gerçek AI, üye-only)
    yalnızca deploy sonrası prod'da devreye girer. Branch merge tamamlandı (`main`'de).

- **Önceki oturum (2026-07-29) — i18n leak sıfırlama + sPlaywright temizliği:**
  4 ayrı commit ile şu iş tamamlandı:
  1. **`sPlaywright.en` ölü kod bug'ı çözüldü** (`9b00924`) — `javaData.js`'de
     override tarafından hiç render edilmeyen ~1250 satırlık eski `en:` objesi
     silindi (20506→19249 satır). Detay: CLAUDE.md §23.4 ilgili not.
  2. **i18n scanner'daki hatalı "⚠ OPUS" varsayımı çürütüldü ve scanner düzeltildi**
     (`7c67e80`, `16a2f2d`, `0e4642f`) — `locator-visual`/`playwright-visual`
     blokların çıplak `field`/`fieldEn` kalıbı, `code`/`codeWrong`/`codeFixed`
     alanlarının `getLocalizedCode()` üzerinden zaten desteklenen runtime
     yorum-çevirisi, ve `linuxErrors`'ın iç-içe paylaşımı — hiçbiri gerçek
     renderer eksikliği değildi (tek gerçek istisna: `BackendPracticeBlock`/
     `GitPracticeBlock`'ta `example` alanı, tek satırlık `tx()` eklendi).
     **Sonuç: proje geneli i18n leak baseline'ı 109 → 0.** Kök neden/çözüm
     kalıpları kalıcı olarak CLAUDE.md §23.1 ve §23.6'da belgeli; adım adım
     dönüşüm geçmişi `git log --oneline` ve ilgili `fix(i18n...)` commit
     mesajlarında duruyor, burada tekrarlanmıyor.
  - **Doğrulama (her commit'te ayrı ayrı):** `node --check` ✓ · `check-content-integrity.mjs` ✓ (38 dosya) · `check-i18n-leaks.mjs` ✓ (baseline 0) · `npm run build` ✓ (43 static shell, SEO geçti).
- **Önceki oturum (2026-07-28) — prediction/code-trace/heap-stack dalgası:** Kullanıcının öğrenme bilimi değerlendirme yazısına (2026-07-27) karşılık, `Documents/learning-science-upgrade-plan.md` planı uygulandı. **3 yeni blok tipi + 5 dile rollout TAMAMLANDI:**
  - **Yeni bileşenler (Opus, self-contained, backend gerektirmez):** `PredictionBlock.jsx` (`type: 'prediction'` — "Önce Tahmin Et, Sonra Gör" / active recall), `CodeTraceBlock.jsx` (`type: 'code-trace'` — satır satır kod yürüyüşü), `HeapStackBlock.jsx` (`type: 'heap-stack'` — Stack/Heap bellek görselleştirmesi). Üçü de `TopicPage.jsx`'te kayıtlı, şemalar plan dosyasının Bölüm 2'sinde.
  - **Görev S1 (prediction rollout) TAMAMLANDI:** javaData.js (7 blok: string concat, division promotion, operator precedence, switch fall-through, Integer cache, unboxing NPE, array equality), pythonData.js (3: is/==, mutable default arg, float precision), sqlData.js (2: COUNT(*)/NULL, JOIN row multiplication), javascriptData.js (3: hoisting, ==/===, closure+var), typescriptData.js (2: excess property check, structural typing) — **toplam 17 prediction bloğu** (bir eski commit mesajında "20" yazıyor ama gerçek sayı 17; kod doğru, mesaj kozmetik hata).
  - **Görev S2 (code-trace + heap-stack rollout) TAMAMLANDI:** javaData.js (for loop trace + OOP aliasing heap-stack), pythonData.js (for loop trace + mutable-default heap-stack), javascriptData.js (for loop trace + object reference heap-stack).
  - **Doğrulama:** her commit'te `node --check` + `check-content-integrity.mjs` + `check-i18n-leaks.mjs` (i18n baseline 109 sabit, regresyon yok) + `npm run build` ayrı ayrı çalıştırıldı, hepsi geçti.
  - **#7 Learning Analytics dashboard TAMAMLANDI (Opus, 2026-07-28):** `getLearningAnalytics()` (progressStore.js) + `getMostMissedAreas()` (reviewQueue.js) + `LearningAnalytics.jsx` panosu, HomePage'de ActivityHeatmap'ten sonra render ediliyor. Tamamen local-first (backend yok): ortalama quiz başarısı, en güçlü/en zayıf konu, en çok hata yapılan alan. Seeded-localStorage smoke testiyle doğrulandı (accuracy/strongest/weakest/most-missed hepsi doğru). Commit `e081451`.
  - **code-trace/heap-stack genişletme TAMAMLANDI (Opus, 2026-07-28, düşük öncelik seçildi, commit `5daa148`):** Mevcut sayfalara 4 yeni blok eklendi — javaData: String Pool heap-stack (`==` interning tuzağı) + iki-işaretçi dizi ters çevirme code-trace; pythonData: `b=a` vs `b=a[:]` list-copy heap-stack; javascriptData: `.reduce()` akümülatör code-trace. Hepsi tek sabit + ağaç referansı; `code` alanları yorumsuz (renderer düz string), açıklamalar bilingual `note`'larda. `node --check` + content-integrity + i18n (baseline 109) + build hepsi geçti.
  - **Prediction derinleştirme TAMAMLANDI (Opus, 2026-07-28, commit `40fd0d1`):** Dil sayfalarının boş/az kapsanan sekmelerine 8 yeni `prediction` bloğu — sqlData: `= NULL` vs `IS NULL` + `WHERE`'de aggregate hatası (HAVING); typescriptData: `any` vs `unknown` + `as` type assertion (runtime TypeError); pythonData: `[[0]]*3` paylaşımlı iç liste + `for...else`; javascriptData: `.sort()` sözlüksel varsayılan + `typeof null/[]/NaN`. Çift-ağaç dosyalarda tek sabit + iki ağaç referansı (SQL/TS `replace_all` ile). Tüm geçitler yeşil (content-integrity + i18n 109 + build).
  - **Prediction DOYURMA dalgası TAMAMLANDI (Opus, 2026-07-28, commit'ler SQL/Java/Python/JS/TS ayrı):** kullanıcı "aynı sayfalarda maksimum sayıda ekle" dedi → her dil sayfasının kalan gotcha'ya değer sekmeleri kapsandı. +16 yeni prediction: SQL +4 (DISTINCT çoklu-sütun, WHERE'siz UPDATE, NOT IN+NULL, BETWEEN dahil-uç), Java +3 (for-each remove→CME, int taşması wrap, finally return ezme), Python +3 (1/1.0/True dict anahtarı, class-level mutable paylaşım, UnboundLocalError), JS +4 ("5"+1 vs "5"-1, setTimeout(0) makrotask, Promise mikrotask önceliği, koparılmış metotta this→TypeError), TS +3 (tuple.push bypass, ?? vs ||, catch e:unknown). **Güncel kapsam: java=10, js=9, python=8, sql=8, ts=7.** Her biri bilingual + Java analojisi + QA bağlamı; tüm geçitler yeşil (node --check + content-integrity + i18n 109 + build 43 shell). Boş kalan sekmeler ya kavramsal olarak gotcha'ya uygun değil (kurulum/mülakat/pratik) ya da düşük değerli (Generics/Utility Types predict-output'a uymaz).
  - **🔜 SIRADAKİ OTURUM — buradan devam et** (2026-07-30 güncellemesi: #5 Kişisel
    AI Mentor artık TAMAMLANDI, yukarıdaki 2026-07-30 bölümüne bak — kalanlar
    hâlâ backend/mimari/product kararı ister, kullanıcı onayı olmadan tek başına
    kodlanmaz; detay `learning-science-upgrade-plan.md` §0 + §5):
    1. **#6 Adaptif zorluk** — quiz motoruna (TopicPage ~18k satır, çok E2E testi) dokunur, zorluk-etiketli soru havuzu gerekir. Riskli, ayrı planla.
    2. **#8 Portföy/proje üretimi** — en büyük epik.
    3. **Düşük öncelik (opsiyonel):** Java/Python/JS'e code-trace/heap-stack genişletme dalgası 2026-07-28'de yapıldı (yukarı bak, commit `5daa148`). Kalan: SQL/TS'e ekleme — SQL için heap/stack kavramsal uymaz; TS runtime = JS (düşük değer).
  - **Açık iş:** Merge tamamlandı — `feature/prediction-blocks` branch'i artık mevcut değil, içerik `main`'de.

- **`frontenddevelopment-for-qa` branch'i** (2026-08-01'de doğrulandı: `main`'e göre 0 commit ileride — içeriği zaten `main`'de): **`/qa-frontend` — "QA için Frontend: Developer'la Aynı Dili Konuşmak" sayfası içerik olarak TAMAMLANDI** (Opus iskelet+referanslar + Sonnet GRUP A-J + D-S11 kapanış denetimi, hepsi 2026-07-25). Detaylı geliştirme geçmişi (hangi GRUP'ta ne yazıldığı) artık tekrarlanmıyor — `git log --oneline` (commit'ler `feat(qa-frontend): GRUP X tamamlandı` formatında açıklayıcı) ve `Documents/qa-frontend-page-plan.md` yeterli referanstır.
  - **Sayfanın içeriği:** 10 GRUP (A-J), 12 video-scene filmi (dahil "5 Locator Yarışı" — sayfanın en kritik filmi, "Stale Element", "*ngIf Kapıyı Açıp Kapıyor"), 4 Kaynak→DOM→Locator panosu (BugCard/Modal/StatusBadge/Toast), 12 error-dictionary hatası, **50 mülakat sorusu (15/20/15, `node scripts/audit-interview-questions.mjs` ile bağımsız doğrulandı — script artık `/qa-frontend`'i de içeriyor)**, tüm quiz'lerde retryQuestion, §9.5 trio'su (video+animasyon+sandbox) GRUP A-J'nin TAMAMINDA doğrulandı.
  - **Doğrulama durumu:** `check-content-integrity` ✓ · `i18n:check` ✓ (sıfır sızıntı, `qaFrontendData.js` hem `STRICT_ZERO_FILES` hem `TRIO_COMPLETE_PAGES`'te) · `npm run build` ✓ (43 statik shell, SEO geçti) · `audit-interview-questions.mjs` ✓ — hepsi geçti.
  - **Manuel test rehberi hazır:** `Documents/qa-frontend-page-plan.md` §F — kurulumdan (`npm run dev` → `/qa-frontend`) grup grup elle test adımlarına (video-scene oynatma, quiz-gating akışı, Locator Lab, feynman AI değerlendirmesi vb.) kadar adım adım rehber.
  - **Bilinen uyarı:** `QaFrontendPage` chunk'ı 515.59 kB (build'i bozmuyor, CLAUDE.md §14/§23.8 kapsamında bilinen durum).
  - **Açık kalan (opsiyonel):** `npm run test:e2e` (Playwright) bu sayfa için henüz koşulmadı.
- `feature/api-testing-page` branch'i (2026-08-01'de doğrulandı: `main`'e göre 0 commit ileride — içeriği zaten `main`'de). `/api-testing` sayfası içerik olarak TAMAMLANDI (57 sekme, GRUP A-K, Faz 1-10). Plan: `Documents/api-testing-page-plan.md`.
- Bu branch'e geçmeden önceki oturumda `feature/api-testing-page` üzerinde **i18n EN-sızıntı temizliği** yapılmıştı: video-scene pasif buton görünürlüğü düzeltildi, 6 tablo + error-dictionary bilingual yapıldı, code-playground yorumları bilingual hale getirildi (TR Türkçe / EN İngilizce), ve yeni bir **statik scanner** eklendi: `scripts/check-i18n-leaks.mjs` (build zincirinde + `pre-commit`'te çalışır, `npm run i18n:check` / `npm run i18n:baseline`). Kök neden, çözüm ve kullanım detayı: **CLAUDE.md §23.1**.

## 🔜 Açık İşler / Sıradaki Adımlar

0. **YENİ PLAN (2026-07-30) — `Documents/challenge-first-experience-plan.md`:**
   Kullanıcının stratejik değerlendirme yazısı denetlendi. Sonuç: yazının
   "Phase 3" listesinin çoğu ZATEN BİTMİŞ (mentor/prediction/memory-viz/analytics).
   Gerçek yeni değer → **Phase 1: Challenge-First Senaryo Katmanı** (yeni `mission`
   blok tipi; mevcut sandbox'ları göreve sarar, frontend-only). Kullanıcı bu yönü
   seçti (2026-07-30). Phase 2 = Sprint/Company Simulator, Phase 3 = adaptif zorluk,
   Phase 4 = park. Opus/Sonnet hazır promptları planın §7'sinde. **Açık karar
   (Opus başlamadan):** görevler sayfa-içi mi ayrı sekme mi (öneri: sayfa-içi).

1. **i18n EN-sızıntı temizliği TAMAMEN BİTTİ (2026-07-25 → 2026-07-29, çoklu oturum, KAPALI):** `check-i18n-leaks.mjs` scanner'ı sıfırdan inşa edildi ve art arda düzeltildi — yanlış-ağaç tarama (8490 hayalet leak), paylaşımlı-sabit tespiti, `why`/`note` ve `field`/`fieldEn` sibling farkındalığı, `codeCommentTranslations` runtime simülasyonu. Borç azalma sırası: 8490(hayalet) → 646 → 365 → 223 → 199 → 109 → 67 → 9 → **0**. Kök neden/çözüm kalıpları kalıcı olarak **CLAUDE.md §23.1 ve §23.6**'da belgeli (yeni bir "OPUS"/"YERİNDE-ÇEVİR" leak'e rastlarsan önce oraya bak); adım adım geçmiş `git log --oneline`'daki `fix(i18n...)` commit'lerinde duruyor, burada tekrarlanmıyor. `npm run i18n:check` artık "grandfathered borç: 0" basıyor — herhangi bir yeni sızıntı build'i kırar.
2. **Tüm branch merge'leri TAMAMLANDI (2026-08-01'de doğrulandı):** `feature/challenge-first`, `frontenddevelopment-for-qa` (`/qa-frontend`) ve `feature/api-testing-page` (`/api-testing`) — üçü de `main`'e göre 0 commit ileride, yani içerikleri `main`'de. Aktif branch artık `main`. `/qa-frontend` için opsiyonel `npm run test:e2e` koşumu hâlâ yapılmadı.
3. **AC08 çoklu tema paleti** — kullanıcı "şimdilik atla" dedi, plan `Documents/acceptancecriterias.md` Madde 11'de hazır bekliyor.
4. **Bilinen ASCII-normalize Türkçe kör noktası** — `bakiyor`, `gunceller` gibi Türkçe-özgü karakter içermeyen sızıntılar hiçbir otomatik kontrolle yakalanamıyor, elle göz gezdirmek gerekiyor.
5. **Sırada (kullanıcı onayı + ayrı planlama gerektirir):** Phase 2 (QA Sprint/Company Simulator) veya Phase 3 (adaptif zorluk), bkz. `Documents/challenge-first-experience-plan.md` §4/§5.

## ✅ Proje Geneli Denetim Durumu (2026-07-25'te script ile taze ölçüldü)

- **§9.3 (4-katmanlı analoji standardı):** `node scripts/audit-analogy-depth.mjs --missing` → 24 sayfa, 488 bölüm, **0 standart altı**. Script bir triyaj aracıdır, sınırları için bkz. CLAUDE.md §9.3.
- **İnteraktif üçlü (animasyon + drag-drop + practice, §9.1/9.2):** `node scripts/audit-interactive.mjs --missing` → 25 sayfa, **0 eksik**.
- **§9.5 (video-scene + animasyon + sandbox trio) / §9.6 (framework mimarisi 5-görünüm rollout):** hangi sayfanın/dalganın tamamlandığı artık kendi plan dosyalarında takip ediliyor — `Documents/video-sitewide-plan.md` ve `Documents/sandbox-and-framework-plan.md`. Güncel dalga/faz durumu için oraya bak, burada tekrar edilmiyor.
- **i18n & sekme-trio statik denetim:** `npm run i18n:check` → tüm kontroller geçti, regresyon yok (madde 1'deki grandfathered borç hariç).

## 🧪 Test Kapsamı (özet — detaylı döküm için CLAUDE.md §22 + sohbet geçmişi)

- `tests/` — 31 dosya, `npm run test:e2e`, her push/PR'de CI'da otomatik (bkz. `.github/workflows/deploy.yml` / `ci-tests.yml`).
- `tests-extended/interview-mastery-flows.spec.ts` — 23 sayfanın tamamında gerçek Groq AI çağrısıyla mülakat gating+grading akışı, `npm run test:interview-flows`, elle çalıştırılır (rate-limit riski).
- `tests-quiz-audit/quiz-full-audit.spec.ts` — 346 quiz bloğunun tamamı (23 sayfa × TR+EN) tek tek denetlenir, `npm run test:quiz-audit`, elle çalıştırılır (~10 dk).
- CLAUDE.md §22'deki 6 zorunlu kontrolden 1-2-4-5 tam kapsanıyor; 3 (gating açık — her ders için) ve 6 (bitirme rozeti toast'ı) sadece `/docker` temsili sayfası üzerinden `tests/` içinde, tam kapsam `tests-extended/`'de.
- §22.1 kalıcı istisna listesi (hiçbir suite'e dahil değil): `/basit-backend`, `/security`, `/backend`.

---

## 📚 Daha Eski Geçmiş

Haziran sonu – Temmuz 2026 arası onlarca oturumun tam anlatımı (video-scene
rollout Dalga 1-22, AIQA_ROADMAP, `/claude-ai` ve `/llm-agents` sayfalarının
yazımı, interaktif üçlü rollout'u, Kariyer Haritası v2, Learning OS/retention
çalışmaları, GJL içerik planı CP1-CP9 vb.) — hepsi tamamlanıp `main`'e gitti.
Ayrıntı için `git log --oneline` ve ilgili commit mesajlarına bakın; kalıcı
değeri olan mimari kararlar zaten `CLAUDE.md`'nin ilgili bölümlerine (§9.1-9.6,
§23) işlenmiş durumda.
