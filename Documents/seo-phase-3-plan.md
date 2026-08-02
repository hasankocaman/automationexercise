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

## 0. İLERLEME DURUMU

| Faz | Konu | Durum |
|-----|------|-------|
| **A1** | Sekme-seviyesi URL mimarisi (`/selenium/wait-stratejileri`) | ⬜ Başlanmadı |
| **A2** | Sekme shell'i + türetilmiş metadata + sitemap genişletmesi | ⬜ Başlanmadı |
| **A3** | İnce içerik (thin content) eşiği + tekil başlık guard'ı | ⬜ Başlanmadı |
| **B1** | `seoAnswer` alanı — her sayfa/sekme için 40-70 kelimelik doğrudan cevap | ⬜ Başlanmadı |
| **B2** | Shell'de "cevap önce" yerleşimi + `FAQPage` (kilitsiz kaynaktan) | ⬜ Başlanmadı |
| **C1** | Sorgu-eşleşmeli yeni giriş sayfaları (kariyer / test otomasyonu hub) | ⬜ Başlanmadı |
| **C2** | Mevcut sayfaların sorgu hizalaması (`/what-is-testing`, `/manual-testing`, `/qa-mentor`) | ⬜ Başlanmadı |
| **D1** | `lastmod` (git tarihinden), `HowTo`, sekme `BreadcrumbList` | ⬜ Başlanmadı |
| **D2** | E-E-A-T: yazar/kurum kimliği, güncelleme tarihi, kaynakça | ⬜ Başlanmadı |
| **E1** | Dış otorite: repo/README/profil linkleri, çapraz yayın, topluluk | ⬜ Başlanmadı |
| **F1** | Ölçüm: GSC sorgu takibi + sıralama günlüğü + aylık kontrol ritmi | ⬜ Başlanmadı |

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
| selenium nedir | `/selenium` | bilgi | Var, ince | B1 doğrudan cevap + A1 sekme URL'leri |
| selenium kullanımı / selenium ile test otomasyonu | `/selenium/<kurulum-sekmesi>` | öğretici | Sekme var, URL yok | A1 |
| playwright nedir | `/playwright` | bilgi | Var, ince | B1 |
| cypress nedir | `/cypress` | bilgi | Var, ince | B1 |
| test otomasyonu (nedir/araçları) | **`/test-automation`** (YENİ hub) | bilgi + karşılaştırma | **YOK** | C1 |
| testerlık öğren / yazılım test uzmanı nasıl olunur | `/qa-mentor` | kariyer | Var ama sorguya hizalı değil | C2 |
| yazılım testi nedir | `/what-is-testing` | bilgi | Var | C2 (metadata hizalama) |
| manuel test nedir | `/manual-testing` | bilgi | Var | C2 |
| qa mühendisi ne iş yapar | `/qa-mentor` (alt bölüm) | kariyer | Kısmen | C2 |
| pytest nedir / python ile test otomasyonu | `/python/<pytest-sekmesi>` | öğretici | Sekme var, URL yok | A1 |
| sql join örnekleri (tester için) | `/sql/<join-sekmesi>` | öğretici | Sekme var, URL yok | A1 |
| api testi nasıl yapılır | `/api-testing` | öğretici | Var | B1 |
| selenium mülakat soruları | `/selenium/<mulakat-sekmesi>` | hazırlık | **Kilitli (%60 quiz)** | Bkz. §4.2 uyarısı |

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

## 3. Sütun A — İndekslenebilir Yüzeyi 15 Katına Çıkar (EN YÜKSEK GETİRİ)

> Bu, planın **tek en önemli maddesidir.** Yeni içerik yazmayı gerektirmez —
> zaten var olan 400+ bloğu Google'a görünür kılar.

### A1. Sekme-seviyesi URL

**Hedef:** `/selenium/wait-stratejileri`, `/en/selenium/wait-strategies`

- `App.jsx`: `/:page/:sectionSlug` alt route'u (mevcut `TopicPage` yeniden
  kullanılır, yeni sayfa bileşeni yazılmaz).
- `TopicPage`: `useParams().sectionSlug` → `activeTab` başlangıç değeri.
  Mevcut `location.state.openTab` mekanizması korunur (portfolyo/mentor
  yönlendirmeleri kırılmaz). Sekme değiştiğinde `navigate(..., {replace:true})`
  ile URL güncellenir → kullanıcı derin link paylaşabilir (ürün kazancı da var).
- **Slug kaynağı:** her `section`'a `slug: { tr, en }` alanı. Elle yazılmaz —
  `scripts/generate-section-slugs.mjs` başlıktan üretir, `Documents/`
  altına değil `src/data/sectionSlugs.generated.js`'e yazar; **stabil olmalı**
  (başlık değişse bile slug sabit kalır, yoksa link çürür). Değişiklik
  gerekirse eski slug 301 ile yenisine gider.
- **Kanonik:** sekme URL'i **kendine** canonical verir (içerik farklı).
  Ana sayfa (`/selenium`) sekme listesini içeren hub olarak kalır.

### A2. Sekme shell'i + türetilmiş metadata

- `generate-static-routes.mjs` her sekme için ayrı `dist/<page>/<slug>/index.html`
  üretir; içine **o sekmenin gerçek bloklarından** çıkarılmış metin yazılır
  (mevcut `snippetFromBlock` mantığı sekme kapsamında yeniden kullanılır).
- Metadata otomatik türetilir: `title` = `<Sekme başlığı> — <Sayfa> | LearnQA.dev`,
  `description` = sekmenin ilk `simple-box`/`text` bloğundan 120-160 karakter.
  `seo.js`'e **elle 250 satır yazılmaz**; `ROUTE_SEO` genişletmesi çalışma
  zamanında türetilir, yalnızca istisnalar elle override edilir.
- `generate-seo-files.mjs` sitemap'e sekme URL'lerini ekler (`priority` 0.7,
  hreflang alternatifleriyle).
- **Ölçek:** ~25 sayfa × ort. 15 sekme × 2 dil ≈ **750 yeni URL.** Build süresi
  ve sitemap boyutu izlenmeli (sitemap 50k URL sınırının çok altında, sorun yok).

### A3. İnce içerik guard'ı (ZORUNLU)

750 zayıf sayfa, 25 iyi sayfadan **daha kötüdür.** Bu yüzden:

- Bir sekme shell'i ancak **≥180 kelime** çıkarılabilir metin üretiyorsa
  yayınlanır; altındakiler sitemap'e girmez ve `noindex` alır (route yine
  çalışır, sadece indekslenmez).
- `check-dist-seo.mjs`'e yeni kontroller: (a) hiçbir iki shell **aynı**
  `title`/`description`'a sahip olamaz, (b) her yayınlanan sekme shell'i
  kelime eşiğini geçer, (c) her sekme URL'i sitemap'te ve canonical'ı kendisi.
- Bu kontroller **build'i kırar** (projenin mevcut hard-fail kültürü).

**Beklenen etki:** `/selenium` için crawl edilebilir metin 665 kelimeden,
15 URL'e yayılmış **~6.000+ kelimeye** çıkar; her biri tek bir arama niyetine
odaklı.

---

## 4. Sütun B — "Cevap Önce" ve Zengin Sonuç

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

### Aşama 1 — Yüzey (A1+A2+A3) · en yüksek getiri
- [ ] `/:page/:sectionSlug` route'u çalışıyor; `openTab` state akışı kırılmadı
      (`tests/portfolio-mission-tabs.spec.ts` yeşil).
- [ ] `npm run build` sonrası `dist/selenium/<slug>/index.html` üretiliyor,
      içinde o sekmenin gerçek metni var.
- [ ] Hiçbir iki shell aynı title/description taşımıyor (`check-dist-seo.mjs`).
- [ ] 180 kelime altındaki sekmeler `noindex` + sitemap dışı.
- [ ] Yeni `tests/seo-section-routes.spec.ts`: derin link doğru sekmeyi açıyor,
      canonical kendine, TR/EN hreflang doğru.
- **Kabul:** `/selenium` ailesinin toplam crawl edilebilir kelimesi ≥ 5.000.

### Aşama 2 — Cevap (B1+B2)
- [ ] En yüksek öncelikli 10 sayfada `seoAnswer` var, ilk cümle sorguyu cevaplıyor.
- [ ] Shell'de `<h1>` sonrası ilk paragraf `seoAnswer`.
- [ ] `FAQPage` yalnızca kilitsiz kaynaklardan üretiliyor; `check-dist-seo.mjs`
      kilitli mülakat sorusu sızarsa build'i kırıyor.

### Aşama 3 — Sayfalar (C1+C2)
- [ ] `/test-automation` yayında, §9.5 standardına uygun (video+animasyon+sandbox).
- [ ] `/qa-mentor`, `/what-is-testing`, `/manual-testing` TR metadata'sı sorgu
      diliyle yeniden yazıldı; `check-seo.mjs` geçiyor.
- [ ] Kanibalizasyon kontrolü: iki sayfa aynı ana sorguyu hedeflemiyor.

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

## 12. İlgili Dosyalar

- `codexSeo.md` — kalıcı SEO mimarisi (bu plan onu genişletir; Aşama 1 bitince
  §0'a sekme URL mimarisi bölümü eklenir)
- `Documents/seo-phase-2-plan.md` — dil-ayrık URL mimarisi (öncül)
- `src/utils/seo.js`, `src/components/SeoMeta.jsx`, `src/components/TopicPage.jsx`
- `scripts/check-seo.mjs`, `scripts/generate-seo-files.mjs`,
  `scripts/generate-static-routes.mjs`, `scripts/check-dist-seo.mjs`
- `DEPLOY.md` — yayın ve Google Search Console adımları
