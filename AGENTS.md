# AGENTS.md - QA Learning Platform

> OTURUM BASLANGIC PROTOKOLU:
> Her yeni oturumda once bu dosyayi, sonra `.claude/` altindaki diger MD
> dosyalarini sirayla oku. Kullanicidan tekrar aciklama isteme; cevap bu
> dosyalarda ve proje kodunda.

---

## 1. Proje Ozeti

Bu proje, QA muhendislerini sifirdan mulakat seviyesine tasimayi hedefleyen,
self-contained bir React + Vite ogrenme platformudur.

Marka ve domain:

- Site markasi: `LearnQA.dev`
- Urun adi: `QA Learning Platform`
- Production URL: `https://learnqa.dev`

Hedef kullanici:

- Core Java biliyor, Collections dahil
- Python ve TypeScript ogreniyor
- QA automation, API testing, DevOps ve cloud test pratiklerine odaklaniyor
- Anlatim dili: Turkce aciklama + Ingilizce teknik terimler
- Python/TypeScript/QA anlatimlarinda Java analojisi zorunlu

---

## 2. Guncel Route Haritasi

Uygulama temiz URL yapisi kullanir. Hash URL kullanilmaz.

Ana route listesi:

- `/` - Home / automation playground
- `/selenium` - Selenium WebDriver
- `/playwright` - Playwright
- `/python` - Python + pytest/Selenium/Playwright
- `/typescript` - TypeScript + Playwright TS
- `/sql` - SQL + interactive practice
- `/java` - Java for QA Automation
- `/jmeter` - JMeter performance testing
- `/postman` - Postman API testing
- `/rest-assured` - REST Assured Java API testing
- `/docker` - Docker for QA
- `/jenkins` - Jenkins CI/CD
- `/kubernetes` - Kubernetes for QA
- `/kafka` - Kafka for QA
- `/appium` - Appium mobile testing
- `/browserstack` - BrowserStack cloud testing
- `/aws` - AWS for QA
- `/azure` - Azure / Azure DevOps for QA
- `/test-frameworks` - pytest, Selenium, Playwright comparison
- `/java-document` - Java reference document reader

Routing:

- `src/main.jsx` uses `BrowserRouter`.
- Legacy `/#/...` URLs are migrated to clean paths with `history.replaceState`.
- Netlify SPA fallback is configured in `netlify.toml`.

---

## 3. Teknik Stack

| Katman | Teknoloji |
| --- | --- |
| Framework | React 18 |
| Build | Vite 5 |
| Routing | react-router-dom, BrowserRouter |
| Styling | Tailwind CSS + custom CSS |
| SEO | route metadata + generated sitemap/robots + static route HTML shells |
| Interactive Python | Pyodide CDN |
| Interactive SQL | sql.js WebAssembly |
| Interactive TypeScript | Babel standalone transpile + eval sandbox |
| Syntax highlight | Prism.js CDN |
| Font | Inter, Plus Jakarta Sans, JetBrains Mono via Google Fonts CDN |
| State | React state/context + localStorage |
| API mock | MSW |

---

## 4. Proje Klasor Yapisi

```text
automationexercise/
├── AGENTS.md
├── CLAUDE.md
├── codexSeo.md
├── DEPLOY.md
├── index.html
├── netlify.toml
├── package.json
├── .claude/
│   ├── CONTENT_RULES.md
│   ├── UI_STANDARDS.md
│   ├── TECH_SPEC.md
│   ├── QA_FRAMEWORK_SPEC.md
│   ├── COMPONENT_LIBRARY.md
│   ├── INTERVIEW_TEMPLATE.md
│   ├── JAVA_COMPARISON.md
│   └── NEXT_SESSION.md
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.svg
│   ├── site.webmanifest
│   └── documents/
│       ├── JavaNotesForProfessionals.md
│       └── JavaNotesForProfessionals_tr.md
├── scripts/
│   ├── check-seo.mjs
│   ├── generate-seo-files.mjs
│   ├── generate-static-routes.mjs
│   └── check-dist-seo.mjs
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── dark-overrides.css
│   ├── context/
│   │   ├── LanguageContext.jsx
│   │   └── ZoomContext.jsx
│   ├── components/
│   ├── data/
│   ├── mocks/
│   └── utils/
│       ├── api-spec.js
│       └── seo.js
└── dist/
```

Not: Tarihsel dokumanlarda `.Codex` adi gecebilir; guncel klasor `.claude` klasorudur.

---

## 5. Oturumda Okunacak Dokumanlar

Sirayla oku:

1. `.claude/CONTENT_RULES.md`
2. `.claude/UI_STANDARDS.md`
3. `.claude/TECH_SPEC.md`
4. `.claude/QA_FRAMEWORK_SPEC.md`
5. `.claude/COMPONENT_LIBRARY.md`
6. `.claude/INTERVIEW_TEMPLATE.md`
7. `.claude/JAVA_COMPARISON.md`
8. `codexSeo.md` - SEO veya deploy islerinde
9. `DEPLOY.md` - yayin / Google Search Console islerinde

---

## 6. Mimari Kararlar

- Icerik data-driven tutulur: teknoloji sayfalarinda asil icerik `src/data/*Data.js` dosyalarindadir.
- Ortak teknoloji render yapisi `TopicPage.jsx` uzerinden ilerler.
- Route metadata `src/utils/seo.js` icindedir.
- Runtime SEO guncellemesi `src/components/SeoMeta.jsx` ile yapilir.
- Build sirasinda `robots.txt`, `sitemap.xml` ve route bazli static HTML shell uretimi vardir.
- `/java-document` sayfasi `public/documents` altindaki markdown dosyalarini okur ve client tarafinda parse eder.

---

## 7. SEO Kurallari

SEO altyapisi zorunludur:

- Temiz URL kullan: `/selenium`, `/#/selenium` degil.
- Her App route'u icin `src/utils/seo.js` icinde metadata olmalidir.
- Her route title'i `LearnQA.dev` icermelidir.
- Description 80-180 karakter araliginda olmalidir.
- Canonical URL `https://learnqa.dev/...` formatinda olmalidir.
- Build zinciri SEO kontrollerini gecmelidir.
- `public/robots.txt` ve `public/sitemap.xml` build oncesi uretilir.
- Her route icin `dist/<route>/index.html` static shell uretilir.
- Yeni route eklenirse hem `App.jsx` hem `ROUTE_SEO` hem gerekirse static fallback kaynagi guncellenir.

Build zinciri:

```bash
npm run build
```

Bu komut sunlari calistirir:

```text
check-seo -> generate-seo-files -> vite build -> generate-static-routes -> check-dist-seo
```

---

## 8. Dil ve localStorage

Guncel dil sistemi:

- `LanguageContext.jsx` localStorage key: `language`
- Degerler: `tr` veya `en`
- Default: `tr`

Dark mode:

- localStorage key: `darkMode`

Tamamlama / progress gibi ek state'lerde mevcut kodun kullandigi key'leri takip et.

---

## 9. Kodlama Kurallari

- Yeni bileşen eklerken mevcut `*Page.jsx` ve `TopicPage.jsx` kaliplarini takip et.
- Icerik degisikligi mumkunse `src/data/*Data.js` dosyasinda kalmali.
- Yeni teknoloji route'u eklenirse ayri component, ayri route, ayri data dosyasi ve SEO metadata eklenir.
- Sekmeli sayfalarda yatay tab bar yerine sol dikey sidebar kullan.
- Her sayfada dil toggle, scroll progress ve fixed back-to-top/home butonu korunur.
- Kod bloklari Prism highlight ve copy button ile gosterilir.
- Disa bagimli gorsel dosyasi ekleme; diyagram gerekiyorsa inline SVG veya CSS kullan.
- Teknik terimleri Turkcelestirme: `fixture`, `locator`, `assertion`, `selector`, `CI/CD` gibi terimler aynen kalir.
- Python/TypeScript anlatiminda Java karsilastirmasi yap.
- `simple-box` block formatinda `title` field kullanma; sadece `emoji` ve bilingual `content` kullan.

---

## 10. Icerik Kapsam Kurallari

Python, TypeScript ve SQL sayfalari W3Schools kapsamindaki konulari eksiksiz kapsamalidir.

Teknoloji sayfalari icin zorunlu sekmeler:

- Kurulum / Installation
- Gercek Hayat / Real World
- Ekosistem / Ecosystem
- Yaygin Hatalar / Troubleshooting
- Mulakat Sorulari / Interview Questions

Yeni veya buyuk teknoloji sayfalarinda:

- Her sekmede en az bir `simple-box`
- Kurulumda Windows, macOS, Linux komutlari
- Gercek hata mesajlari icin `error-dictionary`
- Mulakat sekmesinde 50 soru hedefi
- Inline SVG / CSS-only animasyon / badge / progress / comparison table

Detayli kurallar icin `.claude/CONTENT_RULES.md` ve ilgili dosyalari oku.

---

## 11. Mobile Responsive Kurallari

- Mobilde buyuk padding kullanma: `px-3 py-2 md:px-6 md:py-4` oruntusunu takip et.
- Buton ve linklerde minimum 36px touch target.
- Input/select/textarea font-size mobilde 16px olmali.
- Kod bloklari `overflow-x-auto` ile tasabilir olmali.
- Gridlerde mobil breakpoint kullan: `grid-cols-1 md:grid-cols-2`.
- `html, body` yatay overflow uretmemeli.
- Dark mode button mobilde icon-only olabilir.

---

## 12. Buyuk Gorevlerde Calisma Protokolu

- Gorevi dosya veya bolum bazinda parcalara ayir.
- Gereksiz tekrar okuma yapma.
- Once mevcut pattern'i oku, sonra kucuk ve dogrudan degisiklik yap.
- Build veya ilgili kontrol komutunu calistir.
- Canli deploy / Google Search Console gibi credential gerektiren islerde kod tarafini hazirla, kullaniciya net manuel adimlari ver.

---

## 13. Bilinen Uyarilar

- `javaData` chunk'i buyuktur; build uyarisi verebilir ama production build'i bozmaz.
- Browserslist / caniuse-lite eski veri uyarisi gorulebilir; build'i bozmaz.
- `dist/` build ciktisidir; gereksiz elle duzenleme yapma.
- Calisma agacinda kullaniciya ait degisiklikler olabilir; izin olmadan geri alma.
