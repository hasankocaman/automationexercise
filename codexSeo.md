# Codex SEO Calisma Notu - LearnQA.dev

## Guncel Calisma Notu - 2026-06-16

Son durum: SEO altyapisinin teknik kismi canli sitede dogrulandi. `/test-frameworks`
icin eski standalone HTML golgelemesi giderildi ve `/java-document` zengin fallback'i
canliya geçti.

Bu oturumda yapilan ek duzeltmeler:

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
- `public/test-frameworks.html` eski standalone HTML oldugu ve `/test-frameworks`
  React route'unu/SEO shell'ini golgeledigi icin kaldirildi.
- Build sonrasi `dist/test-frameworks.html` artik uretilmiyor; sadece
  `dist/test-frameworks/index.html` kaliyor.

Dogrulama:

- `npm run build` basarili calisti.
- `SEO check passed for 20 routes.`
- `Generated robots.txt and sitemap.xml for 20 routes.`
- `Generated 20 static route HTML shells.`
- `Dist SEO check passed for 20 generated pages.`
- Yerel `dist/test-frameworks/index.html` icinde yeni framework fallback basliklari goruldu.
- Yerel `dist/java-document/index.html` icinde temiz chapter basliklari goruldu.

Canli site kontrolu - push sonrasi:

- `https://learnqa.dev/robots.txt` 200 dondu.
- `https://learnqa.dev/sitemap.xml` 200 dondu.
- `https://learnqa.dev/test-frameworks` 301 ile `https://learnqa.dev/test-frameworks/`
  adresine gidip 200 dondu.
- `/test-frameworks/` title dogru: `Pytest vs Selenium vs Playwright Comparison | LearnQA.dev`.
- `/test-frameworks/` canonical dogru: `https://learnqa.dev/test-frameworks`.
- `/test-frameworks/` icinde `data-seo-fallback="true"` goruldu.
- `/test-frameworks/` icinde yeni `Playwright Language Comparison` fallback'i goruldu.
- Eski `Python Test Frameworks` title'i artik `/test-frameworks` route'unda gorunmuyor.
- `https://learnqa.dev/java-document/` 200 dondu.
- `/java-document/` canonical dogru: `https://learnqa.dev/java-document`.
- `/java-document/` icinde `data-seo-fallback="true"` goruldu.
- `/java-document/` icinde `Chapter 1: Getting started with Java Language` fallback'i goruldu.
- `https://learnqa.dev/selenium` 301 ile slash'li URL'ye gidip 200 dondu; title,
  canonical ve fallback dogru goruldu.
- Not: `https://learnqa.dev/test-frameworks.html` artik eski dosyayi servis etmiyor,
  Netlify SPA fallback ile ana shell'e dusuyor. Ileride bu URL icin 301 redirect eklenebilir.

Google Search Console:

- Kod tarafinda yapilacaklar hazir.
- GSC domain property, DNS verification, sitemap submission ve URL Inspection islemleri hesap yetkisi gerektirdigi icin manuel yapilacak.

Google gorunurluk notu:

- Kullanici Google'da `learnqa` aramasi yaptiginda siteyi ilk 6 sayfada gormedigini bildirdi.
- Bu, su an tek basina teknik SEO hatasi anlamina gelmez. Google icin sira genelde:
  1. Crawl: Siteyi kesfeder.
  2. Index: Sayfalari dizine alir.
  3. Rank: Marka veya konu sorgularinda siralamaya baslar.
- Teknik SEO temelimiz artik canli sitede dogrulandi; fakat index/ranking icin Search Console,
  dis link, marka sinyali, icerik otoritesi ve zaman gerekir.
- Hemen kontrol edilecek sorgular:
  - `site:learnqa.dev`
  - `learnqa.dev`
  - `"LearnQA.dev"`
  - `"QA Learning Platform" "LearnQA.dev"`
- Eger `site:learnqa.dev` hic sonuc vermiyorsa oncelik GSC setup + sitemap submission + URL Inspection.
- Eger `site:learnqa.dev` sonuc veriyor ama `learnqa` vermiyorsa sorun index degil, ranking/brand authority
  sinyallerinin zayif olmasidir.

Kalan eksikler ve oncelikli sonraki adimlar:

1. Google Search Console kurulumu tamamlanmali.
   - `learnqa.dev` domain property olarak eklenmeli.
   - DNS TXT verification yapilmali.
   - `https://learnqa.dev/sitemap.xml` sitemap olarak gonderilmeli.
   - Ana sayfa, `/selenium`, `/playwright`, `/python`, `/sql`, `/java`,
     `/test-frameworks`, `/java-document` icin URL Inspection calistirilmali.
   - Onemli sayfalarda `Request Indexing` yapilmali.
2. Eski `.html` URL'ler icin Netlify 301 redirect dusunulmeli.
   - Ornek: `/test-frameworks.html` -> `/test-frameworks`.
   - Varsa diger eski standalone HTML dosyalari taranmali.
   - Bu, duplicate/yanlis canonical riskini azaltir.
3. Dil bazli SEO mimarisi planlanmali.
   - Su anda dil localStorage ile degisiyor; Google icin TR/EN ayri URL degil.
   - Orta vadede `/tr/...` ve `/en/...` route yapisi + `hreflang` daha saglikli olur.
   - Bu buyuk mimari degisiklik oldugu icin ayri planlanmali.
4. Uzun kuyruk SEO landing sayfalari dusunulmeli.
   - Ornek: `/selenium-waits`, `/playwright-locators`, `/sql-joins-for-testers`,
     `/pytest-fixtures`, `/rest-assured-authentication`.
   - Bu sayfalar spesifik arama niyetlerine hitap eder.
5. Performance ve bundle optimizasyonu devam etmeli.
   - `javaData` chunk'i buyuk; build uyarisi normal ama iyilestirilebilir.
   - Java document/data parcalama veya route ici lazy content yukleme dusunulebilir.
   - `caniuse-lite` / Browserslist verisi guncellenebilir.
6. Dokuman kalitesi temizligi yapilmali.
   - `DEPLOY.md` eski bolumlerinde encoding bozukluklari var.
   - Eski `.Codex` referanslari baska dosyalarda kaldiysa `.claude` olarak guncellenmeli.
7. SEO check kapsami genisletilebilir.
   - `check-dist-seo.mjs`, eski `.html` shadow dosyalarini yakalayacak ek kontrol
     ekleyebilir.
   - Ornek: `public/<route>.html` varsa build'i fail ettirmek.
   - Bu, `/test-frameworks.html` gibi sorunlarin tekrarini engeller.

Kucuk parcalara bolunmus uygulama plani:

Asama 1 - Dokumantasyon ve durum kaydi:
- `codexSeo.md` icine son Google gorunurluk durumu, canli teknik dogrulama ve kalan eksikler yazildi.
- Durum: Bu asama tamamlandi.

Asama 2 - Eski `.html` URL redirectleri:
- `netlify.toml` icine eski standalone URL'ler icin 301 redirect eklenecek.
- Ilk aday: `/test-frameworks.html` -> `/test-frameworks`.
- Sonra build/canli kontrol yapilacak.
- Durum: Tamamlandi.
- Eklenen redirectler:
  - `/test-frameworks.html` -> `/test-frameworks` 301
  - `/comparison.html` -> `/test-frameworks` 301
- Redirectler SPA fallback'ten once tanimlandi.
- `npm run build` basarili calisti; SEO ve dist SEO kontrolleri gecti.

Asama 3 - Build guard:
- `scripts/check-seo.mjs` veya yeni kucuk bir script ile `public/<route>.html` shadow dosyalari yakalanacak.
- Build zincirine eklenirse ayni sorun tekrar production'a cikmadan yakalanir.
- Durum: Tamamlandi.
- `scripts/check-seo.mjs` genisletildi:
  - `public/<route>.html` dosyasi React route'unu golgeliyorsa build fail eder.
  - `public/*.html` dosyasi varsa ve Netlify'da explicit redirect yoksa build fail eder.
  - `comparison.html` public icinde kaldigi icin redirect kontrolu ile korunuyor.
- `npm run build` basarili calisti; yeni guard mevcut durumda hata vermedi.

Asama 4 - GSC manuel aksiyon listesi:
- GSC kurulum adimlari DEPLOY veya SEO notunda checklist haline getirilecek.
- Kullanici GSC ekraninda uygulayacak; kod tarafinda credential gerektiren bir is yapilmayacak.
- Durum: Dokumantasyon olarak tamamlandi; uygulama kullanici/GSC hesabi gerektirir.
- Google Search Console checklist:
  1. `learnqa.dev` domain property olarak ekle.
  2. DNS TXT verification kaydini domain DNS paneline ekle.
  3. Verification tamamlaninca `https://learnqa.dev/sitemap.xml` sitemap'ini gonder.
  4. URL Inspection ile su URL'leri tek tek kontrol et:
     - `https://learnqa.dev/`
     - `https://learnqa.dev/selenium`
     - `https://learnqa.dev/playwright`
     - `https://learnqa.dev/python`
     - `https://learnqa.dev/sql`
     - `https://learnqa.dev/java`
     - `https://learnqa.dev/test-frameworks`
     - `https://learnqa.dev/java-document`
  5. Her kritik URL icin `Request Indexing` yap.
  6. Coverage/Pages raporunda `Discovered - currently not indexed`, `Crawled - currently not indexed`,
     `Duplicate without user-selected canonical` gibi durumlari izle.
  7. Sitemap status `Success` olana kadar tekrar kontrol et.

Asama 5 - Marka/ranking sinyali:
- README, GitHub repo description, sosyal/profil linkleri ve varsa dis kaynaklardan `https://learnqa.dev`
  linkleri guclendirilecek.
- Uzun kuyruk SEO sayfalari icin ayri plan cikacak.
- Durum: Plan tamamlandi; uygulama kismen hesap/dis platform erisimi gerektirir.
- Oncelikli marka/ranking aksiyonlari:
  1. GitHub repo `About` alanina website olarak `https://learnqa.dev` ekle.
  2. GitHub repo description icinde `LearnQA.dev` ve `QA Learning Platform` ifadelerini kullan.
  3. README ust bolumune canli site linki ve kisa marka aciklamasi ekle. Durum: Tamamlandi.
  4. Kisisel GitHub profil, LinkedIn veya portfolyo sayfasindan `https://learnqa.dev` linki ver.
  5. Ilk uzun kuyruk sayfa adaylari icin ayri issue/plan ac:
     - Selenium waits
     - Playwright locators
     - SQL joins for testers
     - pytest fixtures
     - REST Assured authentication
  6. Marka sorgusu icin duzenli kontrol:
     - `site:learnqa.dev`
     - `learnqa.dev`
     - `"LearnQA.dev"`
     - `"QA Learning Platform" "LearnQA.dev"`

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
