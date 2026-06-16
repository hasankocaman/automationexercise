# Codex SEO Calisma Notu - LearnQA.dev

## Guncel Calisma Notu - 2026-06-16

Bu oturumda yapilan ek duzeltmeler:

- Commit hazirlik notu: Canli `/test-frameworks` kontrolunde eski `public/test-frameworks.html`
  dosyasinin hala servis edildigi goruldu. Bu nedenle silme degisikligi commit/push icine mutlaka
  alinmali.
- `AGENTS.md` gercek proje durumuna gore yenilendi:
  - `.Codex` yerine guncel `.claude` klasoru yazildi.
  - 5 route bilgisi yerine guncel 20 route listesi yazildi.
  - `HashRouter` yerine guncel `BrowserRouter` ve hash migration bilgisi yazildi.
  - SEO build zinciri, `language` localStorage key'i ve deploy/GSC notlari guncellendi.
- `scripts/generate-static-routes.mjs` icinde `/test-frameworks` icin ozel zengin fallback content eklendi:
  - Framework Comparison
  - Playwright Language Comparison
  - Python Frameworks
- `scripts/generate-static-routes.mjs` icinde `/java-document` icin ozel fallback content eklendi:
  - `public/documents/JavaNotesForProfessionals.md` build sirasinda okunuyor.
  - Ilk chapter basliklari static HTML shell icine crawl edilebilir olarak yaziliyor.
  - TOC satirlarindaki nokta/sayfa indeksleri filtreleniyor.

Dogrulama:

- `npm run build` basarili calisti.
- `SEO check passed for 20 routes.`
- `Generated robots.txt and sitemap.xml for 20 routes.`
- `Generated 20 static route HTML shells.`
- `Dist SEO check passed for 20 generated pages.`
- Yerel `dist/test-frameworks/index.html` icinde yeni framework fallback basliklari goruldu.
- Yerel `dist/java-document/index.html` icinde temiz chapter basliklari goruldu.

Canli site kontrolu:

- `https://learnqa.dev/robots.txt` 200 dondu.
- `https://learnqa.dev/sitemap.xml` 200 dondu.
- `https://learnqa.dev/selenium`, `/playwright`, `/python`, `/sql` 301 ile slash'li URL'ye gidip 200 dondu.
- Canonical URL'ler slash'siz temiz URL olarak goruldu.
- Canli `/test-frameworks` henuz eski title/fallback durumunda gorundu; yeni fallback icin bu commit/deployment yayinlanmali.
- Sonradan yapilan fix: `public/test-frameworks.html` eski standalone HTML oldugu ve `/test-frameworks`
  React route'unu/SEO shell'ini golgeledigi icin kaldirildi. Build sonrasi `dist/test-frameworks.html`
  artik uretilmiyor; sadece `dist/test-frameworks/index.html` kaliyor.

Google Search Console:

- Kod tarafinda yapilacaklar hazir.
- GSC domain property, DNS verification, sitemap submission ve URL Inspection islemleri hesap yetkisi gerektirdigi icin manuel yapilacak.

---

## Amac

LearnQA.dev sitesinin Google aramalarinda daha iyi bulunmasi icin teknik SEO temelini guclendirmek.

Ana hedefler:

- Hash URL yapisindan temiz URL yapisina gecmek: `/#/selenium` yerine `/selenium`.
- Her sayfa icin route'a ozel `title`, `description`, `canonical`, Open Graph ve Twitter metadata uretmek.
- Google'in gorebilecegi `robots.txt` ve `sitemap.xml` dosyalarini uretmek.
- React SPA oldugu icin her route icin crawl edilebilir statik HTML shell uretmek.
- Site markasini `QA Learning Platform` ve `LearnQA.dev` olarak tutarli hale getirmek.
- Build surecinde SEO hatalarini otomatik yakalamak.
- Sonraki deploylarda Google Search Console kontrol adimlarini netlestirmek.

## Tamamlananlar

### 1. CLAUDE.md SEO kurallari

`CLAUDE.md` dosyasina SEO ve yayin stratejisi bolumu eklendi.

Eklenen prensipler:

- Temiz URL kullanimi zorunlu.
- BrowserRouter kullanimi zorunlu.
- Her route icin metadata zorunlu.
- `robots.txt` ve `sitemap.xml` zorunlu.
- Statik/prerender uyumlu HTML hedefi.
- Icerik SEO kurallari.

### 2. HashRouter yerine BrowserRouter

`src/main.jsx` icinde routing `HashRouter` yerine `BrowserRouter` yapildi.

Eski hash URL'ler icin gecis destegi eklendi:

- `/#/selenium` acilirsa `/selenium` adresine tasinir.

Netlify tarafinda SPA fallback zaten mevcut:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Route bazli SEO metadata

`src/utils/seo.js` eklendi.

Icerigi:

- `SITE_URL`
- `DEFAULT_SEO`
- `ROUTE_SEO`
- `getSeoForPath`
- `canonicalUrl`

Toplam 20 route icin SEO metadata tanimlandi:

- `/`
- `/selenium`
- `/playwright`
- `/python`
- `/typescript`
- `/sql`
- `/java`
- `/jmeter`
- `/postman`
- `/rest-assured`
- `/docker`
- `/jenkins`
- `/kubernetes`
- `/kafka`
- `/appium`
- `/browserstack`
- `/aws`
- `/azure`
- `/test-frameworks`
- `/java-document`

### 4. Runtime metadata guncelleme

`src/components/SeoMeta.jsx` eklendi.

Bu component route degistikce sunlari guncelliyor:

- `document.title`
- meta description
- canonical URL
- Open Graph title, description, URL, site name, type
- Twitter card, title, description

`src/App.jsx` icine `<SeoMeta />` eklendi.

### 5. Static route HTML shell uretimi

`scripts/generate-static-routes.mjs` eklendi.

Build sonrasi her route icin statik HTML uretiyor:

- `/dist/index.html`
- `/dist/selenium/index.html`
- `/dist/playwright/index.html`
- diger route klasorleri

Her HTML icine route'a ozel olarak sunlar yaziliyor:

- `title`
- `description`
- `canonical`
- Open Graph metadata
- Twitter metadata
- `WebPage` structured data
- `BreadcrumbList` structured data
- `data-seo-fallback="true"` olan crawl edilebilir fallback content

Fallback content, ilgili `src/data/*Data.js` dosyalarindan gercek konu basliklari ve kisa icerik parcalari cekiyor.

Ornek kontrol edilen sayfalar:

- `dist/selenium/index.html`
- `dist/sql/index.html`
- `dist/python/index.html`

### 6. robots.txt ve sitemap.xml

`scripts/generate-seo-files.mjs` eklendi.

Build oncesinde su dosyalari uretiliyor:

- `public/robots.txt`
- `public/sitemap.xml`

`sitemap.xml`, `ROUTE_SEO` listesindeki 20 route'u iceriyor.

### 7. SEO build kontrolu

`scripts/check-seo.mjs` eklendi.

Kontrol ettigi seyler:

- `src/App.jsx` route'lari ile `ROUTE_SEO` listesi eslesiyor mu?
- Her route icin SEO metadata var mi?
- Title yeterli mi ve `LearnQA.dev` iceriyor mu?
- Description uygun uzunlukta mi?
- Canonical URL gecerli mi?

### 8. Dist SEO kontrolu

`scripts/check-dist-seo.mjs` eklendi.

Build sonrasi uretilen HTML dosyalarini kontrol ediyor:

- Her route icin `dist/<route>/index.html` var mi?
- `title` var mi?
- `canonical` var mi?
- `description` var mi?
- Crawl edilebilir fallback content var mi?
- `WebPage` structured data var mi?
- `BreadcrumbList` structured data var mi?

### 9. package.json build zinciri

`package.json` build script'i guncellendi.

Su anda build zinciri:

```bash
node scripts/check-seo.mjs &&
node scripts/generate-seo-files.mjs &&
vite build &&
node scripts/generate-static-routes.mjs &&
node scripts/check-dist-seo.mjs
```

Ek script:

```bash
npm run seo:check-dist
```

### 10. Ana sayfa link yapisi

`src/components/HomePage.jsx` icindeki teknoloji navigasyonu SEO dostu hale getirildi.

Onemli degisiklikler:

- Route navigasyonlari `button + navigate()` yerine `Link` kullanmaya basladi.
- Bu sayede crawler tarafinda gercek link sinyali olustu.

Route linkleri:

- Java
- Python
- TypeScript
- Playwright
- REST Assured
- Appium
- Selenium
- BrowserStack
- JMeter
- Postman
- Docker
- Jenkins
- Kubernetes
- Kafka
- AWS
- Azure
- SQL

### 11. Code splitting

`src/App.jsx` icinde route componentleri `React.lazy` ile bolundu.

Sonuc:

- Ilk ana JS bundle yaklasik 3.5 MB seviyesinden yaklasik 235 KB seviyesine indi.
- Buyuk data chunk'lari ilgili route acildiginda yukleniyor.

Not:

- `javaData` chunk'i hala buyuk. Build uyarisi veriyor ama production build'i bozmuyor.

### 12. index.html SEO temeli

`index.html` guncellendi.

Eklenenler:

- Ana title: `QA Learning Platform for Test Automation Engineers | LearnQA.dev`
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter metadata
- `WebSite` JSON-LD structured data
- `theme-color`
- manifest link
- favicon link

### 13. Marka favicon ve manifest

Vite varsayilan favicon'u kaldirildi.

Eklenen dosyalar:

- `public/favicon.svg`
- `public/site.webmanifest`

`index.html` artik `/favicon.svg` ve `/site.webmanifest` kullaniyor.

### 14. Deploy dokumani

`DEPLOY.md` icine SEO yayin kontrol listesi eklendi.

Not: Dosyanin eski bolumlerinde encoding bozuk gorunuyor. Yeni eklenen SEO bolumu ASCII yazildi, tekrar bozulmamasi icin.

Eklenen kontrol basliklari:

- `robots.txt` kontrolu
- `sitemap.xml` kontrolu
- Temiz URL kontrolu
- Eski hash URL migration kontrolu
- Sayfa kaynaginda metadata kontrolu
- Google Search Console adimlari
- Sitemap gonderme
- URL Inspection ve Request Indexing adimlari

## Dogrulama Sonuclari

### Build

`npm run build` basarili calisti.

Build sirasinda gorulen basarili kontroller:

- `SEO check passed for 20 routes.`
- `Generated robots.txt and sitemap.xml for 20 routes.`
- `Generated 20 static route HTML shells.`
- `Dist SEO check passed for 20 generated pages.`

### Tarayici kontrolu

Yerel dev server ile su URL kontrol edildi:

```text
http://127.0.0.1:5173/selenium
```

Sonuc:

- HTTP status: `200`
- Sayfa render oldu.
- H1: `Selenium WebDriver`
- Title: `Selenium WebDriver Tutorial for QA Engineers | LearnQA.dev`
- Canonical: `https://learnqa.dev/selenium`
- Favicon: `/favicon.svg`
- Manifest: `/site.webmanifest`

## Kalan Uyarilar

### 1. Browserslist eski veri uyarisi

Build sirasinda su uyarinin benzeri goruluyor:

```text
Browserslist: browsers data (caniuse-lite) is 6 months old.
```

Bu build'i bozmuyor. Sonradan guncellenebilir.

### 2. Buyuk Java chunk uyarisi

Build sirasinda `javaData` chunk'i icin 500 KB ustu uyarisi goruluyor.

Bu build'i bozmuyor. Sebep: Java icerigi buyuk.

Sonradan yapilabilecekler:

- Java data dosyasini parcalara bolmek.
- Java sayfasi icinde alt konu bazli lazy data yuklemek.
- `manualChunks` ile daha kontrollu chunk stratejisi kurmak.

### 3. DEPLOY.md encoding temizligi

`DEPLOY.md` dosyasinin eski kisimlarinda Turkce karakterler bozuk gorunuyor.

Bu SEO isinin ana amacini engellemiyor ama dokuman kalitesi icin sonra temizlenebilir.

### 4. Gercek Google Search Console islemleri

Kod tarafinda sitemap/robots hazir.

Hala manuel yapilmasi gerekenler:

- Google Search Console'a `learnqa.dev` domain property eklemek.
- DNS dogrulamasini yapmak.
- `https://learnqa.dev/sitemap.xml` gondermek.
- Kritik URL'ler icin URL Inspection yapmak.
- Gerekirse Request Indexing yapmak.

## Eksik Kalan / Sonraki Adimlar

Oncelik sirasina gore:

1. Canli deploy sonrasi `https://learnqa.dev/robots.txt` kontrolu.
2. Canli deploy sonrasi `https://learnqa.dev/sitemap.xml` kontrolu.
3. Canli temiz URL kontrolleri:
   - `https://learnqa.dev/selenium`
   - `https://learnqa.dev/playwright`
   - `https://learnqa.dev/python`
   - `https://learnqa.dev/sql`
4. Eski hash URL migration kontrolu:
   - `https://learnqa.dev/#/selenium` -> `https://learnqa.dev/selenium`
5. Google Search Console kurulumu ve sitemap gonderimi.
6. En onemli sayfalar icin URL Inspection:
   - Ana sayfa
   - Selenium
   - Playwright
   - Python
   - SQL
   - Java
7. Uzun vadeli SEO icerik stratejisi:
   - Tekil arama niyetlerine uygun daha dar sayfalar dusunulebilir.
   - Ornek: `/selenium-waits`, `/playwright-locators`, `/sql-joins-for-testers`.
8. Dil bazli SEO mimarisi dusunulebilir:
   - Su anda dil localStorage ile degisiyor.
   - Google icin ileride `/en/...` ve `/tr/...` route yapisi + `hreflang` daha iyi olur.
   - Bu daha buyuk bir mimari degisikliktir.
9. Java chunk buyuklugu optimize edilebilir.
10. `DEPLOY.md` encoding temizligi yapilabilir.

## Devam Ederken Bakilacak Ana Dosyalar

- `CLAUDE.md`
- `codexSeo.md`
- `src/utils/seo.js`
- `src/components/SeoMeta.jsx`
- `scripts/check-seo.mjs`
- `scripts/generate-seo-files.mjs`
- `scripts/generate-static-routes.mjs`
- `scripts/check-dist-seo.mjs`
- `package.json`
- `index.html`
- `DEPLOY.md`

## Mevcut Durum Ozeti

Teknik SEO temelinin buyuk kismi tamamlandi.

Su an proje:

- Temiz URL destekliyor.
- Eski hash URL'leri yeni temiz URL'lere tasiyor.
- 20 route icin metadata uretiyor.
- Sitemap ve robots uretiyor.
- Her route icin crawl edilebilir static HTML shell uretiyor.
- Build sirasinda SEO hatalarini yakaliyor.
- Marka favicon ve manifest kullaniyor.

Kod tarafinda SEO altyapisi tamam seviyesinde.

Bir sonraki pratik odak:

1. Bu degisiklikleri deploy etmek.
2. Canli sitede robots/sitemap/route kontrollerini yapmak.
3. Google Search Console'a sitemap gondermek.
4. Index durumunu izlemek.
