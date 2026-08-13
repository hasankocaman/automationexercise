# SEO Kuralları ve Mimarisi — LearnQA.dev

> Bu dosya SEO'nun **kalıcı** kural ve mimari referansıdır — nasıl çalıştığını,
> hangi script'in ne yaptığını, hangi kuralın neden var olduğunu anlatır.
> **Güncel durum / yapılacaklar listesi burada değil**, `.claude/NEXT_SESSION.md`'de
> tutulur. Proje kurallarının tamamı için `CLAUDE.md`'ye bak.

## Amaç

LearnQA.dev sitesinin Google aramalarında daha iyi bulunması için teknik SEO
temelini güçlendirmek ve korumak. Ana hedefler:

- Hash URL yapısından temiz URL yapısına geçmek: `/#/selenium` yerine `/selenium`.
- Her sayfa için route'a özel `title`, `description`, `canonical`, Open Graph ve Twitter metadata üretmek.
- Google'ın görebileceği `robots.txt` ve `sitemap.xml` dosyalarını üretmek.
- React SPA olduğu için her route için crawl edilebilir statik HTML shell üretmek.
- Site markasını `QA Learning Platform` ve `LearnQA.dev` olarak tutarlı hale getirmek.
- Build sürecinde SEO hatalarını otomatik yakalamak.
- Sonraki deploylarda Google Search Console kontrol adımlarını netleştirmek.

---

## SEO Mimarisi — Nasıl Çalışıyor

### 0. Dil-ayrık URL mimarisi (SEO Faz 2 — ZORUNLU)

Site iki dilli içerik üretir ama uzun süre TEK URL kümesi vardı: `<html lang="en">`,
tüm metadata İngilizce, buna karşılık varsayılan arayüz dili `tr`. Sonuç: Google
her sayfayı İngilizce sanıyordu ve Türkçe içeriğin indekslenecek hiçbir URL'i
yoktu. 2026-08-01'de düzeltildi.

**Kural:**

| URL | Dil |
|---|---|
| `/selenium` (çıplak path) | **Türkçe** (varsayılan) |
| `/en/selenium` | **İngilizce** |

- **URL dil için TEK OTORİTEDİR.** `localStorage.language` dili belirlemez,
  yalnızca yansıtır. Otomatik yönlendirme YOKTUR.
- Uygulama `src/main.jsx`'te `<BrowserRouter basename="/en">` ile kurulur (URL
  `/en` ile başlıyorsa). Bu sayede **`App.jsx`'teki route'lar ikilenmez** ve tüm
  `<Link to="/x">` / `useNavigate('/x')` çağrıları otomatik olarak `/en/x` olur.
  → **Route eklerken `/en` varyantı ELLE eklenmez, kendiliğinden oluşur.**
- Dil düğmesi artık URL değiştirir (`window.location.assign`) — `basename` mount
  anında sabitlendiği için tam navigasyon zorunludur.
- Her `ROUTE_SEO` girdisi `tr: { title, description }` bloğu taşımak ZORUNDADIR;
  `check-seo.mjs` eksik/İngilizceyle özdeş TR metadata'yı hard-fail eder.
- `hreflang` (`tr`, `en`, `x-default`) hem runtime'da (`SeoMeta.jsx`) hem statik
  shell'lerde üretilir; sitemap her route'u iki dilde + `xhtml:link` alternates
  ile listeler.
- Kod tarafında router'ı atlayan ham `<a href="/...">` veya
  `window.location.href = '/...'` KULLANMA — EN oturumunu TR'ye düşürür.

Detaylı gerekçe ve mimari seçenek karşılaştırması: `Documents/seo-phase-2-plan.md` §2.

### 1. CLAUDE.md SEO kuralları
`CLAUDE.md` Bölüm 6'da SEO ve yayın stratejisi kuralları tanımlıdır (temiz URL, metadata zorunluluğu, robots/sitemap, build zinciri).

### 2. BrowserRouter + GitHub Pages static route shells
`src/main.jsx` routing `HashRouter` değil `BrowserRouter` kullanır. Eski hash URL'ler (`/#/selenium`) `history.replaceState` ile temiz path'lere (`/selenium`) taşınır.

Production deploy GitHub Pages üzerinden yapılır. GitHub Pages, Netlify tarzı `/* -> index.html` server fallback sağlamadığı için build zinciri her route için statik HTML shell üretir:

- `vite build` ana assetleri üretir.
- `scripts/generate-static-routes.mjs` `/java`, `/selenium`, `/python` gibi route klasörlerine `index.html` yazar.
- GitHub Pages workflow'u bilinmeyen client-side path'ler için `dist/index.html` dosyasını `dist/404.html` olarak kopyalar.
- Legacy `.html` URL gerekiyorsa `public/*.html` içinde hafif canonical redirect dosyası olarak tutulur.

### 3. Route bazlı SEO metadata
`src/utils/seo.js` içeriği:
- `SITE_URL`
- `DEFAULT_SEO`
- `ROUTE_SEO` — 20 route için tanımlı metadata
- `getSeoForPath`
- `canonicalUrl`

### 4. Runtime metadata güncelleme
`src/components/SeoMeta.jsx` (App.jsx içinde `<SeoMeta />` olarak kullanılır), route değiştikçe şunları günceller: `document.title`, meta description, canonical URL, Open Graph (title/description/url/site name/type), Twitter card (title/description).

### 5. Static route HTML shell üretimi
`scripts/generate-static-routes.mjs` — build sonrası her route için statik HTML üretir (`dist/<route>/index.html`). Her HTML'e route'a özel `title`, `description`, `canonical`, OG/Twitter metadata, `WebPage` + `BreadcrumbList` structured data ve `data-seo-fallback="true"` olan crawl edilebilir fallback content yazılır. Fallback content ilgili `src/data/*Data.js` dosyalarından gerçek konu başlıkları ve kısa içerik parçaları çeker.

Özel fallback içeriği olan route'lar:
- `/test-frameworks` — Framework Comparison, Playwright Language Comparison, Python Frameworks içeriklerinden zengin fallback.
- `/java-document` — `public/documents/JavaNotesForProfessionals.md` build sırasında okunur, ilk chapter başlıkları crawl edilebilir şekilde HTML shell'e yazılır.

### 6. robots.txt ve sitemap (indeks + dört alt sitemap)
`scripts/generate-seo-files.mjs` — build öncesinde `public/robots.txt` ve sitemap dosyalarını üretir.

`sitemap.xml` **tek bir urlset DEĞİL, bir `sitemapindex`'tir**; URL'ler dil × sayfa tipi kırılımıyla dört çocuk dosyada durur:

| Dosya | İçerik |
|---|---|
| `sitemap-tr-hubs.xml` | Türkçe ana sayfa/route URL'leri |
| `sitemap-tr-sections.xml` | Türkçe bölüm (sekme) URL'leri |
| `sitemap-en-hubs.xml` | İngilizce ana sayfa/route URL'leri |
| `sitemap-en-sections.xml` | İngilizce bölüm URL'leri |

**Neden bölündü:** Tek urlset'te Search Console "gönderilen / dizine eklenen" sayısını tek blok olarak raporlar; o rakam "hangi grup takıldı?" sorusuna cevap veremez. Grup başına ayrı dosya, her grubun indekslenme oranını ayrı ayrı ölçülebilir yapar.

**Kurallar:**
- `robots.txt` yalnızca `sitemap.xml`'i (indeksi) bildirir — çocukları motor kendisi keşfeder, ayrıca bildirilmez.
- `sitemap.xml` adı KORUNUR. Arama motoruna daha önce bu adres gönderildiyse yeniden gönderim gerekmez.
- İndeksteki her `<lastmod>`, o alt sitemap'teki en yeni sayfa tarihidir.
- **Sitemap içeriğini denetleyen bir test yazarken `sitemap.xml`'i tek başına okuma** — orada hiç sayfa URL'i yoktur, kontrol hep yeşil kalır (gerçekte hiçbir şey doğrulamayan bekçi). Çocukları indeksten okuyup gez; kalıp: `tests/seo-phase2-coverage.spec.ts` → `readAllSitemapUrlBlocks()`.

**Ana sayfa `lastmod`:** `/` bir `*Data.js` dosyası taşımadığı için uzun süre tarihsizdi. `scripts/lib/lastmod.mjs` içindeki `EXTRA_SOURCES` tablosu veri dosyası olmayan route'ları kaynak dosyalarıyla eşler (en yeni commit tarihi kazanır). Yeni bir veri-dosyasız route eklenirse oraya da girmelidir.

### 6.1. IndexNow (Bing/Yandex bildirimi)
`scripts/ping-indexnow.mjs` — deploy TAMAMLANDIKTAN sonra (`deploy.yml` → `deploy` job'ının son adımı) son 7 günde `lastmod`'u değişmiş URL'leri bildirir.

- Anahtar `public/<key>.txt` dosyasındadır; **dosya adı ile içeriği birebir aynı olmak zorundadır** (motor anahtarı bu dosyayı çekip doğrular).
- Google IndexNow kullanmaz — kazanç Bing/Yandex indeksidir (ve Bing indeksini kullanan yapay zeka asistanları).
- Script deploy'u ASLA kırmaz: eksik anahtar, ağ hatası, 4xx/5xx — hepsinde uyarı basıp `0` ile çıkar.
- Değişmemiş URL'i her deploy'da yeniden bildirmek protokolün caydırdığı bir davranıştır; bu yüzden tarih filtresi vardır. Elle çalıştırma: `npm run seo:indexnow -- --dry-run [--days N]`.

### 7. SEO build kontrolü
`scripts/check-seo.mjs` kontrol eder:
- `src/App.jsx` route'ları ile `ROUTE_SEO` listesi eşleşiyor mu?
- Her route için SEO metadata var mı, title `LearnQA.dev` içeriyor mu, description uygun uzunlukta mı, canonical URL geçerli mi?
- `public/<route>.html` gibi bir dosya React route'unu gölgeliyorsa build fail eder (shadow dosya guard'ı).
- Explicit Netlify redirect'i olmayan `public/*.html` dosyaları varsa build fail eder.

### 8. Dist SEO kontrolü
`scripts/check-dist-seo.mjs` — build sonrası üretilen HTML dosyalarını kontrol eder: her route için `dist/<route>/index.html` var mı, title/canonical/description var mı, crawl edilebilir fallback content var mı, `WebPage`/`BreadcrumbList` structured data var mı?

### 9. package.json build zinciri

```bash
node scripts/check-seo.mjs &&
node scripts/generate-seo-files.mjs &&
vite build &&
node scripts/generate-static-routes.mjs &&
node scripts/check-dist-seo.mjs
```

Ek script: `npm run seo:check-dist`

### 10. Ana sayfa link yapısı
`src/components/HomePage.jsx` teknoloji navigasyonu `button + navigate()` yerine `Link` kullanır — crawler için gerçek link sinyali oluşturur.

### 11. Code splitting
`src/App.jsx` route component'leri `React.lazy` ile bölünmüştür. İlk ana JS bundle ~3.5MB'tan ~235KB'a indi; büyük data chunk'ları ilgili route açıldığında yüklenir. (`javaData` chunk'ı hâlâ büyük — bkz. Bilinen Uyarılar.)

### 12. index.html SEO temeli
`index.html` içeriği: ana title (`QA Learning Platform for Test Automation Engineers | LearnQA.dev`), meta description, canonical URL, Open Graph metadata, Twitter metadata, `WebSite` JSON-LD structured data, `theme-color`, manifest link, favicon link.

### 13. Marka favicon ve manifest
`public/favicon.svg`, `public/site.webmanifest` — Vite varsayılan favicon'u yerine geçer.

---

## SEO Kuralları (Zorunlu — özet, detay CLAUDE.md Bölüm 6'da)

- Temiz URL kullanımı zorunlu, `BrowserRouter` zorunlu.
- Her route için metadata zorunlu, title `LearnQA.dev` içermeli.
- `robots.txt` ve `sitemap.xml` build öncesi otomatik üretilir.
- Her route için crawl edilebilir static HTML shell üretilir.
- Eski standalone `.html` dosyaları React route'larını gölgelememeli; gerekiyorsa `public/*.html` içinde hafif canonical redirect dosyası olarak korunur.
- İçerik SEO'su: her sayfa tek bir ana arama niyetini hedeflemeli, problem odaklı başlıklar da üretilmeli (wait strategies, Page Object Model, API testing gibi).

---

## Bilinen Uyarılar / Sınırlamalar

1. **Browserslist eski veri uyarısı** — `caniuse-lite` 6+ ay eski olabilir, build'i bozmaz, `npx update-browserslist-db@latest` ile güncellenebilir.
2. **Büyük `javaData` chunk uyarısı** — 500KB üstü uyarı normaldir, build'i bozmaz. İyileştirme seçenekleri: data dosyasını parçalara bölmek, route içi lazy content yüklemek, `manualChunks` ile kontrollü chunk stratejisi.
3. **Dil bazlı SEO** — ARTIK EKSİK DEĞİL. Çıplak path Türkçe, `/en/...` İngilizce; `hreflang` hem runtime hem statik shell'lerde üretiliyor (bkz. §0). Bu madde eskiden "yapılacak" olarak duruyordu, 2026-08-01'de çözüldü.
4. **Gerçek Google Search Console işlemleri** kod tarafında hazır ama hesap yetkisi gerektirir — aşağıdaki checklist'e bak.
5. **`sameAs` tek yönlüdür ve koddan düzeltilemez** — `src/utils/authorship.js` GitHub ve LinkedIn adreslerini beyan eder; o hesaplar siteye GERİ link vermediği sürece doğrulama zinciri kapanmaz ve beyanın değeri neredeyse sıfırdır. Bu bir hesap ayarıdır, kod değişikliğiyle çözülmez.

---

## Google Search Console — Tekrar Kullanılabilir Checklist

1. `learnqa.dev` domain property olarak ekle.
2. DNS TXT verification kaydını domain DNS paneline ekle.
3. Verification tamamlanınca `https://learnqa.dev/sitemap.xml` sitemap'ini gönder. Bu bir **indeks**tir; gönderdikten sonra Sitemaps ekranında dört alt sitemap ayrı satır olarak görünür ve her biri kendi "gönderilen / dizine eklenen" sayısını raporlar — teşhis bu kırılımdan okunur (Türkçe hub'lar mı girmiyor, bölüm sayfaları mı?). Alt sitemap'leri ayrıca göndermeye gerek yoktur.
4. URL Inspection ile şu URL'leri tek tek kontrol et:
   - `https://learnqa.dev/`
   - `https://learnqa.dev/selenium`
   - `https://learnqa.dev/playwright`
   - `https://learnqa.dev/python`
   - `https://learnqa.dev/sql`
   - `https://learnqa.dev/java`
   - `https://learnqa.dev/test-frameworks`
   - `https://learnqa.dev/java-document`
5. Her kritik URL için `Request Indexing` yap.
6. Coverage/Pages raporunda `Discovered - currently not indexed`, `Crawled - currently not indexed`, `Duplicate without user-selected canonical` gibi durumları izle.
7. Sitemap status `Success` olana kadar tekrar kontrol et.

**Google görünürlük yorumlama rehberi:**
- `site:learnqa.dev` hiç sonuç vermiyorsa → öncelik crawl/index (GSC setup + sitemap submission + URL Inspection).
- `site:learnqa.dev` sonuç veriyor ama `learnqa` (markasız sorgu) vermiyorsa → öncelik ranking/marka otoritesi sinyalleri, index sorunu değil.
- Google için sıra her zaman: Crawl → Index → Rank. Teknik SEO temeli tamamlanmış olması rank'i garanti etmez; marka sinyali, dış link, içerik otoritesi ve zaman gerekir.

---

## Uzun Kuyruk SEO Sayfa Stratejisi

Tekil arama niyetlerine hitap eden, mevcut teknoloji sayfalarından daha dar
kapsamlı landing sayfa adayları (ayrı plan/issue gerektirir, henüz
uygulanmadı — güncel durumu `.claude/NEXT_SESSION.md`'de takip et):

- `/selenium-waits`
- `/playwright-locators`
- `/sql-joins-for-testers`
- `/pytest-fixtures`
- `/rest-assured-authentication`

---

## Marka / Ranking Sinyalleri Stratejisi

1. GitHub repo `About` alanına website olarak `https://learnqa.dev` ekle.
2. GitHub repo description'da `LearnQA.dev` ve `QA Learning Platform` ifadelerini kullan.
3. README üst bölümüne canlı site linki ve kısa marka açıklaması ekle.
4. Kişisel GitHub profili, LinkedIn veya portfolyo sayfasından `https://learnqa.dev` linki ver.
5. Marka sorgusu için düzenli kontrol: `site:learnqa.dev`, `learnqa.dev`, `"LearnQA.dev"`, `"QA Learning Platform" "LearnQA.dev"`.

---

## İlgili Dosyalar

- `CLAUDE.md` — proje anayasası, SEO kuralları Bölüm 6
- `.claude/NEXT_SESSION.md` — güncel SEO/deploy durumu
- `src/utils/seo.js`, `src/components/SeoMeta.jsx`
- `scripts/check-seo.mjs`, `scripts/generate-seo-files.mjs`, `scripts/generate-static-routes.mjs`, `scripts/check-dist-seo.mjs`
- `package.json`, `index.html`, `DEPLOY.md`
