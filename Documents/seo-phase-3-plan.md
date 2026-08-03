# SEO Faz 3 Planı — Marka Sorgusundan Rekabetçi Sorgulara

> **Branch:** `feature/seo-phase-3-serp-rankings`
> **Oluşturuldu:** 2026-08-02
> **Öncülü:** `codexSeo.md` (kalıcı SEO mimarisi) + `Documents/seo-phase-2-plan.md`
> (dil-ayrık URL, hreflang, zengin snippet — TAMAMLANDI, main'de)
> **Hedef:** `learnqa` marka sorgusundaki 1. sıralığı, **markasız ve rekabetçi**
> sorgulara taşımak: "selenium nedir", "test otomasyonu", "testerlık öğren",
> "playwright nedir" ve İngilizce karşılıkları.
> **Bu plan Faz 2'yi DEĞİŞTİRMEZ, üstüne kurar.**

---

## 0. İLERLEME DURUMU VE GÖREV DAĞILIMI

**Ayrım ilkesi:** Opus = mimari, routing, üretim/denetim script'leri, guard ve
testler (bir kez yazılır, yanlış olursa 750 URL birden bozulur). Sonnet = içerik
ve metin (sayfa sayfa tekrarlanan, kalıp belli olduğunda paralelleştirilebilen
iş). Sonnet promptları: `Documents/seo-phase-3-sonnet-prompts.md`.

| Faz | Konu | Sahip | Durum |
|-----|------|-------|-------|
| **A1** | Sekme-seviyesi URL mimarisi (`/selenium/wait-strategies`) | **Opus** | ✅ TAMAMLANDI |
| **A2** | Sekme shell'i + türetilmiş metadata + sitemap genişletmesi | **Opus** | ✅ TAMAMLANDI |
| **A3** | İnce içerik eşiği + tekil başlık/description guard'ı | **Opus** | ✅ TAMAMLANDI |
| **A4** | Çalışma zamanı sekme metadata'sı (shell ile aynı türetme) | **Opus** | ✅ TAMAMLANDI |
| **D1a** | `lastmod` — veri dosyasının gerçek commit tarihinden | **Opus** | ✅ TAMAMLANDI |
| **D1c** | Sekme `BreadcrumbList` (3 basamak) | **Opus** | ✅ TAMAMLANDI |
| **B0** | `seoAnswer` ALTYAPISI — alan desteği, görünür render, shell'de ilk paragraf | **Opus** | ✅ TAMAMLANDI |
| **B2a** | `FAQPage` ALTYAPISI — kilitsiz kaynak + "görünürlük" guard'ı | **Opus** | ⬜ Sırada |
| **C0** | `/test-automation` route + metadata + shell iskeleti | **Opus** | ✅ TAMAMLANDI |
| **D1b** | `HowTo` şeması (kurulum sekmeleri) | **Opus** | ⬜ Sırada |
| **D2a** | E-E-A-T: yazar/kurum şeması + görünür "son güncelleme" | **Opus** | ⬜ Sırada |
| **B1** | `seoAnswer` METNİ — 10 öncelikli sayfa için 40-70 kelimelik cevap | Sonnet | ✅ TAMAMLANDI |
| **B2b** | Sayfa başına kilitsiz 5-8 soruluk "Sık Sorulan Sorular" bloğu | Sonnet | ✅ TAMAMLANDI (10 sayfa) |
| **C1** | `/test-automation` hub sayfasının İÇERİĞİ | Sonnet | ✅ TAMAMLANDI (8 sekme) |
| **C2** | Sorgu hizalaması: `/qa-mentor`, `/what-is-testing`, `/manual-testing`, `/test-frameworks` | Sonnet | ⬜ S4 promptu |
| **E1** | Dış otorite: README/repo metinleri, çapraz yayın özetleri | Sonnet | ⬜ S5 promptu |
| **F1** | Ölçüm: GSC sorgu takibi + aylık kontrol ritmi | Kullanıcı | ⬜ Yayından sonra |

### A fazı — ölçülen sonuç (2026-08-02)

| Metrik | Öncesi | Sonrası |
|---|---|---|
| Sitemap'teki URL sayısı | 94 | **754** |
| Üretilen statik shell | 94 | **918** (94 hub + 824 sekme) |
| `/selenium` ailesinin crawl edilebilir kelimesi | 665 (1 URL) | **7.290** (16 URL) |
| İndekslenebilir sekme (dil başına) | 0 | **337** |
| İndekslenmeyen sekme | — | 75 (kilitli mülakat, hub kopyası, ince içerik) |
| Sitemap `lastmod` | yok | veri dosyasının gerçek commit tarihi |

---

## 1. Teşhis — "learnqa" neden kolaydı, bunlar neden değil

`learnqa` **navigasyonel/marka** sorgusudur: o kelimeyi arayan kişi zaten bizi
arıyor ve o kelimeye sahip başka bir rakip yok. Teknik SEO temeli (Faz 1-2)
tamamlanır tamamlanmaz 1. sıra kaçınılmazdı.

"selenium nedir" ise **bilgi amaçlı (informational)** sorgudur: aynı niyeti
hedefleyen, yıllardır yayında olan, dış link toplamış onlarca sayfa var.
Burada teknik temel *bilet fiyatıdır, kazanma sebebi değildir.*

### 1.1. Gerçek SERP manzarası (2026-08-02'de ölçüldü)

| Sorgu | Şu an ilk sıralarda kim var | Bizim şansımız |
|---|---|---|
| `selenium nedir` | Medium blog yazıları (Berk Sarıkamış, M. Talha Çevik), siberegitmen.com — **ve SERP'in yarısı "selenyum" mineraliyle dolu** (Acıbadem, Liv Hospital, Abdi İbrahim) | **YÜKSEK.** Yazılım niyeti için güçlü rakip yok; çoğu sonuç 800-1200 kelimelik tek yazı. Anlam karışıklığı rekabeti seyreltiyor. |
| `test otomasyonu` | Kurumsal blog + kariyer siteleri: innova.com.tr, kariyer.net, coderspace.io, patika.dev, virgosol.com, Medium | **ORTA.** Rakipler kurumsal domain otoritesine sahip ama içerik yüzeysel (tanım + 5 madde avantaj). Derinlik + interaktiflik farkı bizde. |
| `yazılım test uzmanı nasıl olunur` / `testerlık öğren` | udemy.com, kariyer.net, eleman.net, goit.global — **ticari niyet ağır** | **ORTA-DÜŞÜK.** Udemy/kariyer.net domain otoritesi çok yüksek. Ama hiçbiri **ücretsiz, uçtan uca, uygulamalı yol haritası** sunmuyor — bizim `/qa-mentor` bu boşluğa oturur. |
| `what is playwright` / `playwright tutorial` | testgrid.io, nareshit.com, Udemy, GitHub repo'ları, (ve organik olarak playwright.dev) | **DÜŞÜK-ORTA.** İngilizce SERP en zor cephe: BrowserStack/LambdaTest/TestGrid gibi ticari QA platformları SEO'ya bütçe ayırıyor. |

**Stratejik sonuç:** Önce **Türkçe** cephede saldır. TR sorgularda rakip içerik
kalitesi düşük, biz ise 15-25 sekmelik derinliğe sahibiz. İngilizce cephede
head term yerine **uzun kuyruk** (long-tail) ile başla.

### 1.2. Bizim tarafımızdaki ölçülmüş engeller

Bunlar tahmin değil, bu depoda ölçüldü:

| Bulgu | Ölçüm | Neden önemli |
|---|---|---|
| **Crawl edilebilir metin çok az** | `dist/selenium/index.html` → **665 kelime** görünür metin (`/python` 632, `/en/selenium` 730) | "selenium nedir" için 1. sıradaki Medium yazısı ~1000+ kelime. Statik shell'imiz onunla yarışamaz. |
| **İçeriğin ~%93'ü indekslenemiyor** | `seleniumData.js` **15 sekme / 428 blok**, `sqlData.js` 25 sekme, `pythonData.js` 23 sekme / 655 blok — ama shell'de yalnızca ilk sekmeden 8 başlık özeti var | Sitede devasa içerik var, Google'ın gördüğü sayfada yok. |
| **Sekme başına URL yok** | `TopicPage.jsx:20426` — `activeTab` React state'i; DOM'da her an **tek** sekme render edilir, URL değişmez | Google "playwright locator" için ayrı bir URL bulamıyor; 15 farklı arama niyeti tek URL'de yarışıyor (iç kanibalizasyon). |
| **`lastmod` yok** | `public/sitemap.xml` yalnızca `changefreq` + `priority` içeriyor | Google güncellik sinyalini alamıyor; `changefreq`/`priority` Google tarafından yıllardır yok sayılıyor. |
| **Sayfa içi `FAQPage` yok** | `FAQPage` yalnızca ana sayfada (`generate-static-routes.mjs`) | Her teknoloji sayfasında 50 mülakat sorusu var — SERP'te "Sıkça sorulan sorular" alanı kazanmak için hazır hammadde. |
| **Doğrudan cevap paragrafı yok** | Shell'in ilk paragrafı meta description'ın tekrarı | "X nedir" sorgularında Google öne çıkan snippet için 40-60 kelimelik net bir tanım arar. |

---

## 2. Anahtar Kelime → URL Haritası

**Kural:** Her sorgunun **tek bir sahibi** olacak. İki sayfa aynı sorguyu
hedeflerse ikisi de kaybeder (kanibalizasyon).

### 2.1. Türkçe (öncelikli cephe)

| Sorgu | Hedef URL | Niyet | Durum | Aksiyon |
|---|---|---|---|---|
| selenium nedir | `/selenium` | bilgi | ✅ Cevap paragrafı eklendi | — |
| selenium kullanımı / kurulumu | `/selenium/installation` | öğretici | ✅ URL yayında | — |
| selenium wait / bekleme | `/selenium/wait-strategies` | öğretici | ✅ URL yayında | — |
| playwright nedir | `/playwright` | bilgi | Var, cevap paragrafı yok | B1 |
| playwright locator | `/playwright/locator-strategies` | öğretici | ✅ URL yayında | — |
| cypress nedir | `/cypress` | bilgi | Var, cevap paragrafı yok | B1 |
| test otomasyonu (nedir/araçları) | **`/test-automation`** (YENİ hub) | bilgi + karşılaştırma | **YOK** | C1 |
| testerlık öğren / yazılım test uzmanı nasıl olunur | `/qa-mentor` | kariyer | Var ama sorguya hizalı değil | C2 |
| yazılım testi nedir | `/what-is-testing` | bilgi | Var | C2 (metadata hizalama) |
| manuel test nedir | `/manual-testing` | bilgi | Var | C2 |
| qa mühendisi ne iş yapar | `/qa-mentor` (alt bölüm) | kariyer | Kısmen | C2 |
| python ile test otomasyonu / pytest | `/python/real-world-pytest` | öğretici | ✅ URL yayında | — |
| sql join örnekleri (tester için) | `/sql/sql-joins` | öğretici | ✅ URL yayında | — |
| api testi nasıl yapılır | `/api-testing` | öğretici | Var | B1 |
| selenium mülakat soruları | `/selenium/interview-questions` | hazırlık | **Kilitli (%60 quiz) — bilerek indekslenmiyor** | Bkz. §4.2 |

### 2.2. İngilizce (uzun kuyruk önce)

| Sorgu | Hedef URL | Gerçekçi hedef |
|---|---|---|
| what is selenium webdriver | `/en/selenium` | İlk 20 → ilk 10 |
| playwright vs selenium | `/en/test-frameworks` | **İlk 10 gerçekçi** — karşılaştırma sayfamız güçlü |
| playwright locators tutorial | `/en/playwright/<locator-sekmesi>` | uzun kuyruk, ilk 10 |
| selenium wait strategies | `/en/selenium/<wait-sekmesi>` | uzun kuyruk, ilk 10 |
| sql for testers / sql join for qa | `/en/sql/<join-sekmesi>` | uzun kuyruk, ilk 5 |
| pytest fixtures explained | `/en/python/<fixture-sekmesi>` | uzun kuyruk |
| how to become a qa engineer | `/en/qa-mentor` | zor, 12+ ay |
| test automation tutorial | `/en/test-automation` | zor, 12+ ay |

**Neden uzun kuyruk önce:** "playwright locators tutorial" gibi sorgular hem
daha az rekabetli hem daha yüksek dönüşümlü. 20 uzun kuyruk sorgusunda 1. sıra,
1 head term'de 8. sıradan daha çok trafik getirir — ve toplanan tıklama/etkileşim
sinyalleri head term'e tırmanmanın yakıtıdır.

---

## 3. Sütun A — İndekslenebilir Yüzeyi 15 Katına Çıkar ✅ TAMAMLANDI

> Planın **tek en önemli maddesiydi.** Yeni içerik yazmayı gerektirmedi —
> zaten var olan 412 bölümü Google'a görünür kıldı.

### 3.0. Uygulanan tasarım (referans)

| Parça | Dosya | Not |
|---|---|---|
| Slug manifesti (DONDURULMUŞ) | `src/data/generated/sectionSlugs.js` | `npm run seo:section-slugs` üretir; build `--check` ile eskimişse kırılır |
| Slug üretimi + metadata türetme (saf) | `src/utils/sectionSeoText.js` | Build ve runtime AYNI fonksiyonu kullanır |
| Katalog/indeks + ince içerik kararı | `scripts/lib/sectionSeo.mjs` | `MIN_INDEXABLE_WORDS = 180` |
| Ders sayfası → veri modülü tablosu | `scripts/lib/topicDataModules.mjs` | Tek kaynak (eskiden shell script'inde gömülüydü) |
| Runtime slug ↔ sekme eşlemesi | `src/utils/sectionRoutes.js` | `basePathOf`, `pathForSection`, `sectionIndexFromSlug` |
| Route tanımı | `src/App.jsx` → `SECTION_PAGE_ELEMENTS` | 30 sayfa; `check-seo.mjs` manifestle eşleşmeyi zorlar |
| Sekme ↔ URL senkronu | `src/components/TopicPage.jsx` | URL otoritedir; sekme değişimi `replace` ile adresi günceller |
| Çalışma zamanı başlık/description | `src/lib/seoOverride.js` + `SeoMeta.jsx` | Ham HTML ile render sonrası başlık ayrışmasın diye |
| Sekme shell'leri | `scripts/generate-static-routes.mjs` | Gerçek bölüm metni + kardeş sekme linkleri + breadcrumb |
| Sitemap + `lastmod` | `scripts/generate-seo-files.mjs` | Sığ klonda lastmod YAZILMAZ (CI'da `fetch-depth: 0`) |
| Denetim | `check-seo.mjs`, `check-dist-seo.mjs` | Tekillik, canonical, noindex, kelime eşiği — hepsi hard-fail |
| Testler | `tests/seo-section-routes.spec.ts` | 10 test: derin bağlantı, dil, geri tuşu, kendini onaran slug |

**Karar kaydı (sonradan tartışılmasın diye):**
- **Slug iki dilde de aynıdır** (İngilizce başlıktan türetilir). `basename="/en"`
  mimarisinde TR ve EN aynı path'i paylaşır; dile göre slug iki yönlü eşleme +
  yönlendirme katmanı isterdi. Slug'ın sıralamaya katkısı zayıf, başlık/h1/gövde
  zaten sayfanın dilinde.
- **İlk sekme hub URL'inde kalır.** `/selenium/what-is-selenium` shell'i üretilir
  (derin bağlantı kırılmasın) ama canonical'ı `/selenium`'a gider ve sitemap'e
  girmez. Üstüne `noindex` KONMAZ — canonical + noindex çelişkili sinyaldir.
- **Mülakat sekmeleri indekslenmez.** İçerik %60 quiz kilidinin arkasında;
  kullanıcının göremediğini arama motoruna sunmak politika ihlalidir.
- **Bilinmeyen slug 404 vermez**, hub'a düşer ve adres kendini onarır.

### 3.1. Plandan sapmalar (uygulama sırasında alınan kararlar)

İlk taslakta yazılan üç şey UYGULANMADI; sebepleri:

| Taslakta | Uygulamada | Neden |
|---|---|---|
| Dile göre slug (`/selenium/wait-stratejileri`) | Tek slug, iki dilde ortak | `basename="/en"` mimarisi path'i paylaştırıyor; çift slug iki yönlü eşleme + yönlendirme tablosu isterdi |
| Her sekme kendine canonical | İlk sekme hub'a canonical | Hub ile ilk sekme aynı sorguyu hedefliyor — ikisi de indekslenirse birbirini yer |
| `slug: {tr, en}` alanı veri dosyalarına | Ayrı, üretilen manifest | 412 bölüme elle alan eklemek 30 veri dosyasını şişirir; manifest tek yerde ve denetlenebilir |

**Ölçülen etki:** `/selenium` ailesi 665 kelime / 1 URL → **7.290 kelime / 16 URL**.
Site geneli sitemap 94 → 754 URL.

## 4. Sütun B — "Cevap Önce" ve Zengin Sonuç

### B0. Altyapı ✅ TAMAMLANDI

- Alan: her veri dosyasının `tr`/`en` ağacında `hero`'nun yanında `seoAnswer`.
- Görünür render: `TopicPage` hero'nun hemen altında, YALNIZCA ilk sekmede
  (cevap sayfanın tanımıdır, tek bir bölümün değil).
- Statik HTML: `<h1>`'den hemen sonra, `data-seo-answer="true"` işaretli ilk
  paragraf.
- Guard (`check-dist-seo.mjs`): alan tanımlıysa İKİ dilde de dolu olmalı,
  25-120 kelime aralığında olmalı ve statik HTML'de GERÇEKTEN basılmış olmalı.
  Üçüncü kural kritik: yalnızca metadata'da kalıp sayfada görünmeyen metin,
  kullanıcının göremediği içeriği arama motoruna sunmak demektir.
- Referans uygulama: `/selenium` (TR 50 kelime, EN 66 kelime). Kalan 9 sayfa
  Sonnet'in S1 görevinde.

### B1. `seoAnswer` alanı

Her sayfanın (ve mümkünse her sekmenin) veri dosyasına:

```js
seoAnswer: {
  tr: 'Selenium, web tarayıcılarını gerçek bir kullanıcı gibi kontrol eden ...',  // 40-70 kelime
  en: 'Selenium is a W3C-standard browser automation protocol that ...',
}
```

Kurallar:
- **İlk cümle sorguyu doğrudan cevaplar** ("Selenium nedir?" → "Selenium, ...dır.")
  Girizgâh, "bu yazıda öğreneceksiniz" tarzı ısıtma cümlesi YASAK.
- Shell'de `<h1>`'in hemen ardındaki ilk `<p>` olarak basılır.
- Uygulamada da görünür (kullanıcı ile crawler aynı şeyi görmeli — bkz. §4.2).

### B2. Sayfa içi `FAQPage`

Her teknoloji sayfası için `FAQPage` JSON-LD üret.

> ⚠ **Kritik uyarı — cloaking riski:** Mülakat soruları arayüzde **%60 quiz
> barajının arkasında** (CLAUDE.md §22). Kilitli içeriği yapılandırılmış veriye
> koymak Google'ın "kullanıcının göremediği içeriği işaretleme" kuralını ihlal
> eder ve manuel ceza riski taşır. Ana sayfadaki çözüm zaten doğru kalıbı
> gösteriyor: **Mülakat Isınma Turu** (gate'siz, görünür metin) ve şema
> YALNIZCA ondan üretiliyor.
>
> **Bu yüzden sayfa içi FAQ kaynağı:** (a) sekmedeki `error-dictionary`
> blokları (gate'siz, "X hatası neden alınır" = mükemmel FAQ hammaddesi),
> (b) quiz açıklamaları, (c) her sayfaya eklenecek **kilitsiz 5-8 soruluk**
> "Sık Sorulan Sorular" bloğu. Kilitli mülakat sorularından **asla** şema
> üretilmez — bu kural `check-dist-seo.mjs`'e kontrol olarak yazılır.

---

## 5. Sütun C — Sorgu-Eşleşmeli Sayfalar

### C1. Yeni: `/test-automation` — "test otomasyonu" hub'ı

Şu an "test otomasyonu" sorgusunun sahibi **hiçbir sayfamız değil**; ana sayfa
ile `/test-frameworks` bölüşüyor. Yeni hub sayfası:

- "Test otomasyonu nedir" doğrudan cevabı → ne zaman otomasyon, ne zaman manuel
  → araç seçim ağacı (interaktif) → dile göre başlangıç yolları → maliyet/ROI →
  yaygın başarısızlık nedenleri (flaky test, bakım maliyeti).
- **Her bölümden ilgili derin sayfaya link** (iç link mimarisinin merkezi olur).
- Bu bir "SEO sayfası" değil, gerçek bir ders sayfası olmalı — CLAUDE.md §9.5
  standardı (video + animasyon + sandbox) baştan uygulanır.

> **URL slug kısıtı (mimari gerçek):** `basename="/en"` yaklaşımı nedeniyle TR ve
> EN aynı path'i paylaşır (`/test-automation` ↔ `/en/test-automation`).
> Türkçe slug (`/test-otomasyonu`) seçilirse İngilizce URL de Türkçe olur.
> **Karar: İngilizce slug kullan.** Slug'ın sıralamaya etkisi zayıftır;
> `title`, `h1`, `seoAnswer` ve içerik Türkçe olduğu sürece TR sorguda sorun
> yaratmaz. Dile göre slug istenirse ayrı bir faz gerekir (yönlendirme tablosu
> + canonical yönetimi) — şimdilik kapsam dışı.

### C2. Mevcut sayfaların sorgu hizalaması

| Sayfa | Şu anki hedef | Yeni hedef | Yapılacak |
|---|---|---|---|
| `/qa-mentor` | marka odaklı ("QA Mentor") | "yazılım test uzmanı nasıl olunur", "testerlık öğren", "qa nasıl olunur" | TR title/description'ı sorgu diliyle yeniden yaz; sayfaya kilitsiz "0'dan QA olmak: 6 aşamalı yol" özet bölümü ekle (şu an sihirbaz arkasında) |
| `/what-is-testing` | "yazılım testine giriş" | "yazılım testi nedir", "test türleri nelerdir" | `seoAnswer` + FAQ; başlıkları sorgu diliyle hizala |
| `/manual-testing` | manuel test öğrenme | "manuel test nedir", "manuel test senaryosu örneği" | Aynı |
| `/test-frameworks` | karşılaştırma | **"playwright vs selenium"** (EN'de en gerçekçi ilk-10 şansımız) | Karşılaştırma tablosunu shell'e taşı; `seoAnswer`'da net kazanan/kaybeden cümlesi |

---

## 6. Sütun D — Teknik Güven Sinyalleri

| # | İş | Detay |
|---|---|---|
| D1a | **`lastmod`** | `generate-seo-files.mjs`, her route'un veri dosyası için `git log -1 --format=%cI -- src/data/<x>Data.js` çalıştırıp gerçek tarihi yazar. `changefreq`/`priority` kaldırılabilir (Google yok sayıyor). |
| D1b | **`HowTo` şeması** | Kurulum sekmeleri adım adım yapıda — `HowTo` JSON-LD SERP'te adım listesi kazandırır. |
| D1c | **Sekme `BreadcrumbList`** | Ana Sayfa › Selenium › Wait Stratejileri — SERP'te URL yerine breadcrumb gösterilir. |
| D2a | **Yazar/kurum kimliği (E-E-A-T)** | `Person`/`Organization` şeması, "Bu sayfayı kim yazdı" bölümü, LinkedIn/GitHub bağlantısı. Google 2024+ sonrası bilgi amaçlı sorgularda deneyim sinyali arıyor; anonim site dezavantajlı. |
| D2b | **Görünür güncelleme tarihi** | "Son güncelleme: 2 Ağustos 2026" — hem kullanıcı güveni hem tazelik sinyali. `lastmod` ile aynı kaynaktan. |
| D2c | **Core Web Vitals** | `javaData`/`typescriptData` chunk'ları 500KB+ (CLAUDE.md §23.8). Sekme URL'leri geldikten sonra **sekme bazında lazy load** ile LCP ölçülmeli; mobil LCP > 2.5s ise sıralama kaybı gerçektir. |

---

## 7. Sütun E — Kodla Çözülemeyen Kısım (Dış Otorite)

Bu sütun olmadan **head term'ler alınmaz.** Rakiplerin (kariyer.net, patika.dev,
BrowserStack) tek gerçek üstünlüğü budur.

1. **GitHub:** repo `About` → `https://learnqa.dev`; README'ye canlı demo linki,
   ekran görüntüsü, "Türkçe QA öğrenme platformu" açıklaması. Repo'ya
   `qa-automation`, `selenium`, `playwright`, `turkish` topic'leri.
2. **Çapraz yayın:** Her derin sekmeden türetilmiş **özet** yazıları dev.to /
   Medium / Hashnode'a koy, kanonik linki learnqa.dev'e ver
   (`<link rel="canonical">` veya platformun canonical alanı). Tam kopya
   yapıştırma değil — özet + "devamı ve interaktif alıştırmalar sitede".
3. **Türkçe topluluklar:** Turkish Testing Board, QA odaklı LinkedIn grupları,
   Reddit r/QualityAssurance (EN), Ekşi/Donanımhaber teknik başlıklar — spam
   değil, gerçek soruya gerçek cevap + ilgili derin link.
4. **YouTube:** Site zaten `video-scene` filmleri üretiyor (CLAUDE.md §9.5).
   Bunların ekran kaydı + sesli anlatımı YouTube'a → açıklamada site linki.
   Video, "nedir" sorgularında SERP'te ayrı bir alan kazandırır.
5. **Ücretsiz araç yemleri (link magnet):** `/leaderboard`, sertifika doğrulama
   gibi paylaşılabilir çıktılar zaten var; "QA mülakat sorusu üretici" veya
   "locator çevirici" gibi tek amaçlı mini araçlar doğal link toplar.
6. **Marka sorgusu büyüt:** "learnqa" araması arttıkça markasız sorgularda da
   otorite artar. Sertifika/rozet paylaşımını teşvik et.

---

## 8. Uygulama Sırası ve Kabul Kriterleri

> Her adım sonunda CLAUDE.md §1.1 checklist'i (içerik bütünlüğü, ipucu bağı,
> TR yorum taraması, build) + ilgili doğrulama komutu koşulur.

### Aşama 1 — Yüzey (A1+A2+A3+A4) · ✅ TAMAMLANDI (2026-08-02)
- [x] `/:page/:sectionSlug` route'u çalışıyor; `openTab` state akışı kırılmadı.
- [x] `npm run build` sonrası `dist/selenium/<slug>/index.html` üretiliyor,
      içinde o sekmenin gerçek metni var (medyan 486 kelime).
- [x] Hiçbir iki shell aynı title/description taşımıyor (`check-dist-seo.mjs`).
- [x] 180 kelime altındaki, kilitli ve hub kopyası sekmeler sitemap dışı.
- [x] `tests/seo-section-routes.spec.ts` — 10/10 yeşil.
- [x] Çalışma zamanı başlığı shell başlığıyla aynı türetmeden geliyor.
- **Kabul (ölçüldü):** `/selenium` ailesi **7.290 kelime** (hedef ≥ 5.000). ✅

### Aşama 2 — Cevap (B1+B2) · ✅ TAMAMLANDI (2026-08-02)
- [x] En yüksek öncelikli 10 sayfada `seoAnswer` var, ilk cümle sorguyu cevaplıyor
      (Selenium, Playwright, Cypress, Python, SQL, Java, Docker, Jenkins,
      API Testing, Yazılım Testi Nedir).
- [x] Shell'de `<h1>` sonrası ilk paragraf `seoAnswer` — build: "Answer-first
      paragraphs: 11 sayfa" (10 + /test-automation).
- [x] `FAQPage` yalnızca kilitsiz kaynaklardan üretiliyor (`faq` blok tipi,
      `interview-questions` ASLA kaynak değil); `check-dist-seo.mjs` +
      `tests/seo-phase2-coverage.spec.ts` her sorunun görünür olduğunu
      TÜM route'larda doğruluyor (24 FAQPage örneği, hepsi yeşil).

### Aşama 3 — Sayfalar (C1+C2) · ✅ TAMAMLANDI (2026-08-02)
- [x] `/test-automation` yayında, §9.5 standardına uygun (8 sekme, her birinde
      video-scene + step-animation + code-playground).
- [x] `/qa-mentor`, `/what-is-testing`, `/manual-testing`, `/test-frameworks`
      TR+EN metadata'sı sorgu diliyle yeniden yazıldı; `check-seo.mjs` geçiyor.
- [x] Kanibalizasyon kontrolü: `/test-automation`="test otomasyonu",
      `/qa-mentor`="yazılım test uzmanı nasıl olunur", `/what-is-testing`=
      "yazılım testi nedir", `/manual-testing`="manuel test nedir",
      `/test-frameworks`="playwright vs selenium" — beşi de ayrı sorgu.

### Aşama 4 — Güven (D1+D2)
- [ ] Sitemap'te gerçek `lastmod`.
- [ ] Kurulum sekmelerinde `HowTo`, sekme URL'lerinde `BreadcrumbList`.
- [ ] Yazar/kurum bölümü + görünür "son güncelleme".
- [ ] Mobil LCP ölçüldü ve `NEXT_SESSION.md`'ye not edildi.

### Aşama 5 — Otorite (E1) · süreklidir, biter değil
- [ ] §7'deki 1-3 maddeleri tamam.
- [ ] Aylık ritim kuruldu (§9).

---

## 9. Ölçüm — Nereden Bileceğiz?

**Tek gerçek kaynak: Google Search Console.** Sıralama tahmin edilmez, ölçülür.

| Metrik | Nereden | Hedef (90 gün) |
|---|---|---|
| İndekslenen URL sayısı | GSC → Sayfalar | 47 → **500+** |
| Toplam gösterim (impressions) | GSC → Performans | 5x artış |
| Markasız sorgu sayısı (>10 gösterim) | GSC → Sorgular, "learnqa" hariç | 20+ sorgu |
| İlk 10'daki sorgu sayısı | GSC ortalama pozisyon < 10 | 15+ (çoğu uzun kuyruk) |
| `selenium nedir` ortalama pozisyonu | GSC | ilk 20'ye giriş |

**Aylık ritim (ayın ilk haftası):**
1. GSC → Performans → son 28 gün → sorguları CSV indir.
2. Gösterimi yüksek ama tıklaması düşük sorgular → o sayfanın `title`/
   `seoAnswer`'ı sorguyla hizalı mı? (En hızlı kazanç burada.)
3. Pozisyon 11-20 arası sorgular → **öncelik listesi**; o sayfaya derinlik ekle.
4. `Crawled - currently not indexed` artıyorsa → ince içerik uyarısı, A3
   eşiğini yükselt.
5. Sonuçları `.claude/NEXT_SESSION.md`'ye tarihli tek paragraf olarak yaz.

---

## 10. Dürüst Beklenti Yönetimi

| Sorgu tipi | Örnek | Gerçekçi süre |
|---|---|---|
| Marka | `learnqa` | ✅ Alındı |
| Uzun kuyruk / niş | `selenium wait stratejileri`, `pytest fixture nedir` | **4-10 hafta** (Aşama 1-2 sonrası) |
| Orta rekabet TR | `selenium nedir`, `playwright nedir`, `manuel test nedir` | **3-6 ay** |
| Head term TR | `test otomasyonu`, `testerlık öğren` | **6-12 ay**, §7 olmadan olmaz |
| Head term EN | `test automation tutorial`, `what is playwright` | **12+ ay**; önce `playwright vs selenium` gibi karşılaştırma sorgularıyla giriş yap |

**Kimse "yarın 1. sıra" diyemez.** Ama şu ölçülebilir: Aşama 1 bittiğinde
indekslenebilir sayfa sayımız 47'den ~500'e çıkar. Google'a 10 kat daha fazla
kanca atmış oluruz ve hangi kancanın tuttuğunu GSC söyler — sonraki hamleleri
tahminle değil veriyle yaparız.

## 11. Riskler

| Risk | Önlem |
|---|---|
| 750 ince sayfa → site kalite algısı düşer | A3 kelime eşiği + `noindex`, build hard-fail |
| Sekme URL'leri mevcut derin link akışını kırar (portfolyo, mentor, "devam et") | `openTab` state yolu korunur; `portfolio-mission-tabs.spec.ts` regresyon bekçisi |
| Kilitli mülakat sorularının şemaya sızması → manuel ceza | `check-dist-seo.mjs` kontrolü; FAQ yalnızca kilitsiz kaynaktan |
| Build süresi 750 shell ile şişer | Shell üretimi paralelleştirilebilir; süre `NEXT_SESSION.md`'ye not edilir |
| Slug değişince link çürümesi | Slug'lar üretildikten sonra **dondurulur**, değişirse 301 |
| Yeni hub sayfası mevcut sayfayla kanibalize olur | §2 haritasında her sorgunun tek sahibi var; C2'de metadata hizalaması zorunlu |

---

## 12.5. MANUEL TEST REHBERİ — Faz 3'te Yapılanları Elle Nasıl Doğrularsın

> Bu bölüm, Faz 3'te eklenen her şeyi **kendi gözünle** doğrulaman için
> yazıldı. Otomatik testler (§12.6) çoğunu zaten koruyor; buradaki liste
> **otomatik testin göremediği** ya da **gözle görülmesi gereken** şeylere
> odaklanır. Her adımda "beklenen" ve "bozuksa ne görürsün" ayrı yazıldı —
> ikisini karşılaştır.

### 12.5.0. Hazırlık (5 dakika)

```bash
npm run build          # SEO kontrolleri dahil tam zincir; hata verirse DUR
npm run preview        # http://localhost:4173
```

⚠️ **`vite preview` adreslerinin sonuna `/` koy** (`/selenium/` gibi).
Sondaki `/` olmadan preview sunucusu dosyayı bulamaz — bu yalnızca yerel
preview aracının kısıtıdır, yayında böyle bir sorun yoktur.

İki şeyi ayrı ayrı test edeceksin, karıştırma:
- **Tarayıcıda gördüğün** = JavaScript çalıştıktan sonraki hâl (kullanıcı deneyimi)
- **Sayfa kaynağında gördüğün** (Ctrl+U) = Google'ın ilk gördüğü ham HTML

İkisinin **ayrışması** bu mimarideki en tehlikeli hata türüdür: kullanıcıya
bir şey, arama motoruna başka bir şey göstermek politika ihlalidir.

---

### 12.5.1. Sekme URL'leri — her dikey sekmenin kendi adresi

| # | Ne yap | Beklenen | Bozuksa ne görürsün |
|---|---|---|---|
| 1 | Adres çubuğuna `localhost:4173/selenium/wait-strategies/` yaz | Sayfa **doğrudan** "Wait Stratejileri" sekmesi açık gelir | İlk sekme ("Selenium Nedir?") açılır → URL otoritesi kırık |
| 2 | Aynı sayfada sekmeler arasında tıkla | Adres çubuğu her tıklamada değişir (`/selenium/locators` vb.) | Adres `/selenium`'da donuk kalır → sekmeler paylaşılamaz |
| 3 | Birkaç sekme gezdikten sonra tarayıcı **geri** tuşu | Bir önceki **sekmeye** döner | Sayfadan tamamen çıkar veya hiç tepki vermez |
| 4 | İlk sekmeye dön | Adres `/selenium` olur, `/selenium/what-is-selenium` OLMAZ | İlk sekme kendi URL'ini alır → aynı içerik iki adreste yarışır |
| 5 | `localhost:4173/selenium/boyle-bir-bolum-yok/` | 404 YOK; adres kendini `/selenium`'a onarır | Beyaz ekran / hata sayfası |
| 6 | Bir sekmedeyken sağ üstten dili **ENG** yap | Aynı sekmede kalır, adres `/en/selenium/wait-strategies` olur | Ana sayfaya veya ilk sekmeye düşer |
| 7 | Sekmedeyken tarayıcı sekmesinin **başlığına** bak | Bölümün kendi başlığı ("Wait Stratejileri...") | Her sekmede aynı hub başlığı → 688 URL aynı başlıkla yarışır |

**Neden önemli:** 4. ve 7. maddeler kanibalizasyon önlemidir. İkisi bozulursa
sekme URL'leri birbirini yer ve Faz 3'ün tüm kazancı kaybolur.

---

### 12.5.2. Google'ın gördüğü ham HTML (en kritik bölüm)

Bu adımlar **tarayıcıda değil, sayfa kaynağında** yapılır: `Ctrl+U`.

| # | Ne yap | Beklenen |
|---|---|---|
| 1 | `/selenium/wait-strategies/` → Ctrl+U → `Ctrl+F` ile "WebDriverWait" ara | Bölümün **gerçek metni** ham HTML'de var (sadece JS'te değil) |
| 2 | Aynı kaynakta `canonical` ara | `https://learnqa.dev/selenium/wait-strategies` (kendini gösterir) |
| 3 | `/selenium/what-is-selenium/` kaynağında `canonical` ara | `https://learnqa.dev/selenium` — **hub'ı** gösterir (ilk sekme kanibalizasyon önlemi) |
| 4 | `/selenium/interview-questions/` kaynağında `robots` ara | `noindex,follow` — kilitli içerik indekslenmez |
| 5 | `/selenium/` (hub) kaynağında `Bu dersin bölümleri` ara | Bölüm bağlantı listesi var; oradan sekme URL'lerine `<a href>` çıkıyor |
| 6 | Hub kaynağında `hreflang` ara | `tr` ve `en` karşılıkları var |

**5. madde neden var:** Sitemap yalnızca *keşif* sağlar; sayfanın önemini ve
tarama önceliğini **iç bağlantılar** belirler. Hub'dan bölüme link çıkmazsa
688 sekme URL'i link grafiğinde öksüz kalır — sitemap'te olsalar bile Google
onlara düşük öncelik verir.

---

### 12.5.3. Cevap-önce paragrafı ve Sık Sorulan Sorular

| # | Ne yap | Beklenen |
|---|---|---|
| 1 | `/playwright/` aç, başlığın hemen altına bak | Kısa, tanım niteliğinde bir paragraf ("Playwright, Microsoft tarafından...") |
| 2 | Aynı sayfada aşağı in | "❓ Sık Sorulan Sorular" kutusu var, soru/cevaplar **açık** duruyor |
| 3 | SSS'yi görmek için quiz çözmen gerekiyor mu? | **HAYIR.** Kilitsiz olmalı |
| 4 | Ctrl+U → `FAQPage` ara | Şema var |
| 5 | Şemadaki bir soruyu kopyala, sayfada Ctrl+F ile ara | Soru **birebir** ekranda da yazıyor |

**3. ve 5. madde neden kritik:** Şemaya girip ekranda görünmeyen içerik
Google'a göre "cloaking"tir ve manuel cezaya yol açar. Mülakat soruları %60
quiz barajının arkasında olduğu için şemaya **asla** girmemeli — SSS bloğu
tam da bu yüzden ayrı, kilitsiz bir kaynak olarak yazıldı.

| # | Ne yap | Beklenen |
|---|---|---|
| 6 | `/selenium/interview-questions/` kaynağında `FAQPage` ara | **Bulunmamalı** — sekme shell'lerinde FAQ şeması yok |

---

### 12.5.4. `/test-automation` — yeni hub sayfası

| # | Ne yap | Beklenen |
|---|---|---|
| 1 | `/test-automation/` aç | 8 sekme, sol dikey menüde |
| 2 | Her sekmeyi tek tek gez | Her birinde film (▶ oynatıcı) + adım adım animasyon + kod yazma alanı var |
| 3 | Bir filmi ▶ ile oynat | Sahneler ilerler; son sahnede ileri tuşu pasifleşir (silinmez, soluklaşır) |
| 4 | "Araç Seçimi" sekmesindeki bağlantı kartlarına tıkla | Gerçekten `/selenium`, `/playwright`, `/cypress`, `/appium`'a gider |
| 5 | Dili ENG yap, aynı sekmeleri gez | Türkçe metin **sızmıyor** (kod yorumları dahil) |
| 6 | Sekmeleri gezerken sol menüdeki quiz'lere bak | Quiz hiçbir sekmede **ilk blok değil** — önce anlatım gelir |

---

### 12.5.5. Sorgu hizalaması — kanibalizasyon gözle kontrolü

Şu 5 sayfanın tarayıcı sekmesi başlığını yan yana karşılaştır. **Hiçbiri
aynı sorguyu hedeflememeli:**

| Sayfa | Sahip olduğu sorgu |
|---|---|
| `/test-automation` | "test otomasyonu" |
| `/what-is-testing` | "yazılım testi nedir", "test türleri" |
| `/manual-testing` | "manuel test nedir", "test senaryosu örnekleri" |
| `/test-frameworks` | "playwright vs selenium" |
| `/qa-mentor` | "yazılım test uzmanı nasıl olunur" |

İkisi aynı sorguyu hedefliyorsa Google ikisini de geri iter — bu, tek tek
sayfaların kalitesinden bağımsız bir kayıptır.

Ayrıca `/qa-mentor/` açıp **sihirbazı başlatmadan** sayfada "Sıfırdan QA
mühendisi olmak: 6 aşama" özetinin göründüğünü doğrula (sihirbaz arkasında
kalırsa o metin Google'a görünmez).

---

### 12.5.6. Otomatik testin GÖREMEDİĞİ, sadece senin bakabileceğin şeyler

Bunlar için otomatik kontrol yazılamaz — insan yargısı gerekir:

1. **Cevap paragrafı gerçekten sorunun cevabı mı?** "Playwright nedir?" diye
   arayan biri ilk cümleyi okuyunca tatmin oluyor mu, yoksa pazarlama dili mi?
2. **SSS soruları gerçek arama sorgusu mu?** İnsanların Google'a yazdığı
   biçimde mi ("playwright mi selenium mu?"), yoksa bizim uydurduğumuz
   yapay sorular mı?
3. **Analojiler düşündürüyor mu?** Her bölümün açılış kutusu tek cümlelik
   yüzeysel bir benzetme değil, gerçekten mekanizmayı yansıtan bir anlatım mı?
4. **Türkçe akıcı mı?** Otomatik kontrol sadece Türkçe karakter arar;
   "bakiyor", "hazir" gibi ASCII'ye düşmüş Türkçeyi ve bozuk cümleyi yakalayamaz.
5. **Mobilde okunabilir mi?** Telefonda aç, yatay kaydırma çıkıyor mu, kod
   blokları taşıyor mu?

---

### 12.5.7. Yayına çıktıktan sonra (Google Search Console)

Bunlar **yayın sonrası** ve zamana yayılır — hemen sonuç bekleme:

| Ne zaman | Ne yap | Beklenen |
|---|---|---|
| Yayın günü | GSC → Sitemaps → `sitemap.xml` gönder | "Başarılı", ~761 URL keşfedildi |
| 1. gün | GSC → URL Denetimi → `/selenium/wait-strategies` | "URL Google'da değil" ama **taranabilir**; "Canlı testi" yap |
| 3-7. gün | GSC → Sayfalar raporu | "Dizine eklendi" sayısı artmaya başlar |
| 2-4. hafta | GSC → Performans → Sorgular | Markasız sorgular ("selenium nedir" vb.) görünmeye başlar |
| 4-8. hafta | Zengin Sonuçlar raporu | FAQPage/Course şemaları hatasız |

⚠️ Bir sekme URL'i "Kopya, Google farklı bir kanonik seçti" derse: o bölümün
metni komşusuna fazla benziyor demektir — içeriği ayrıştır veya `noindex` yap.

---

## 12.6. Bu Sürümü Koruyan Otomatik Testler

| Test dosyası | Neyi korur |
|---|---|
| `tests/seo-section-routes.spec.ts` | Derin bağlantı, sekme↔adres senkronu, geri tuşu, bilinmeyen slug onarımı, slug manifesti tekilliği |
| `tests/seo-phase3-integrity.spec.ts` | Slug dondurma kuralının **gerçekten çalıştığı**, hub→bölüm iç bağlantıları, türetilmiş metadata uzunlukları, canonical/noindex tutarlılığı, SSS'nin kilitsizliği |
| `tests/seo-phase2-coverage.spec.ts` | Sitemap URL sayısı, FAQPage şemasının görünür metne dayandığı, sekme shell'lerinde FAQ olmadığı |
| `tests/video-scene.spec.ts` | `/test-automation` dahil film bloklarının render olduğu |
| `scripts/check-dist-seo.mjs` (build) | 92 sayfa + 840 sekme shell'inin başlık/description/canonical/noindex/gövde bütünlüğü |

---

## 12. İlgili Dosyalar

- `codexSeo.md` — kalıcı SEO mimarisi (bu plan onu genişletir; Aşama 1 bitince
  §0'a sekme URL mimarisi bölümü eklenir)
- `Documents/seo-phase-2-plan.md` — dil-ayrık URL mimarisi (öncül)
- `src/utils/seo.js`, `src/components/SeoMeta.jsx`, `src/components/TopicPage.jsx`
- `scripts/check-seo.mjs`, `scripts/generate-seo-files.mjs`,
  `scripts/generate-static-routes.mjs`, `scripts/check-dist-seo.mjs`
- `DEPLOY.md` — yayın ve Google Search Console adımları
