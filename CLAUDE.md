# CLAUDE.md — QA Learning Platform (Proje Anayasası)

> **OTURUM BAŞLANGIÇ PROTOKOLÜ**
> Her yeni oturumda önce bu dosyayı oku. Bu dosya **kalıcı kuralları** içerir —
> commit hash, "şu an ne yapıyoruz" gibi anlık bilgi **burada asla tutulmaz**,
> onun için `.claude/NEXT_SESSION.md` var. Aşağıdaki "Dosya Haritası" bölümü
> hangi konuda hangi dosyaya bakacağını gösterir. Kullanıcıdan proje hakkında
> aynı bilgiyi tekrar isteme — cevap bu dosyalarda ve kodun kendisinde.

**Misyon:** Kullanıcı dostu, kaliteli ve zengin içerikli; Google aramalarında QA/test otomasyonu sorgularında öne çıkan bir web uygulaması inşa etmek. İçerik derinliği, görsel anlatım kalitesi ve SEO, eşit öncelikli temel hedeflerdir.

---

## 0. Dosya Haritası — Hangi Konuda Hangi Dosyaya Bak

Bu proje birden fazla AI aracıyla (Claude Code, Antigravity, Windsurf, Trae) geliştiriliyor. Çelişki ve kafa karışıklığını önlemek için **tek kaynak ilkesi** geçerlidir:

| Dosya | İçerdiği Şey | Ne Zaman Oku |
|-------|--------------|--------------|
| **`CLAUDE.md`** (bu dosya) | Kalıcı proje kuralları, mimari, route haritası, içerik ve pedagoji kuralları. Anayasa. | Her oturum başında, ilk. |
| **`.claude/NEXT_SESSION.md`** | "Şu an ne yapıyoruz?", son yapılanlar, bir sonraki adımda yapılacaklar listesi. | Projede kodlamaya başlamadan hemen önce. |

**Diğer referans dosyalar** (ihtiyaç duyulduğunda):

| Dosya | İçerdiği Şey | Ne Zaman Oku |
|-------|--------------|--------------|
| **`AGENTS.md`** | Sadece `CLAUDE.md`'ye yönlendiren kısa pointer (Codex için). | Codex bunu okur; içerik burada değil orada. |
| **`codexSeo.md`** | SEO kurallarının ve mimarisinin **kalıcı** referansı (nasıl çalışır, hangi script ne yapar, GSC checklist, uzun vadeli SEO stratejisi). | SEO/routing/metadata işi yaparken. |
| **`DEPLOY.md`** | Netlify/GitHub Pages yayın adımları, Google Search Console kurulum adımları. | Yayın veya GSC işlerinde. |
| **`promptkurallar.md`** | Kullanıcının (Hasan) AI araçlarına nasıl prompt yazacağına dair rehber. | Kullanıcı nasıl prompt yazacağını sorduğunda. |
| **`.claude/CONTENT_RULES.md`** | İçerik yazım kuralları: block formatları, mülakat sorusu formatı, hata sözlüğü formatı, kurulum formatı. | İçerik yazarken, W3Schools kapsam kontrolü yaparken. |
| **`.claude/UI_STANDARDS.md`** | Görsel/animasyon/renk standartları. | UI bileşeni eklerken. |
| **`.claude/TECH_SPEC.md`** | Editör, toggle, localStorage, performans teknik gereksinimleri. | Etkileşimli editör/teknik altyapı işlerinde. |
| **`.claude/QA_FRAMEWORK_SPEC.md`** | pytest/Selenium/Playwright derinlik kuralları. | Test framework içeriği yazarken. |
| **`.claude/COMPONENT_LIBRARY.md`** | Tekrar kullanılan bileşenler. | Yeni bileşen eklerken. |
| **`.claude/INTERVIEW_TEMPLATE.md`** | Mülakat soruları şablonu. | Mülakat sekmesi yazarken. |
| **`.claude/JAVA_COMPARISON.md`** | Java ↔ Python/TS karşılaştırma kuralları. | Python/TS anlatırken. |
| **`Documents/acceptancecriterias.md`** | Sistem kabul kriterleri (Acceptance Criteria) — navigasyon, quiz/retry mekanizması, i18n (TR/EN içerik+yorum kuralları), %60 mülakat gating, AI quiz açıklaması, mülakat AI değerlendirme döngüsü, %80 bitirme rozeti + reset akışı (Major AC 01-07); tema/erişilebilirlik ve roadmap ilerleme takibi (Minor AC 08-09). | Yeni özellik/sayfa geliştirirken veya bir akışı (gating, AI değerlendirme, reset, i18n) test ederken — bu dosyadaki AC'lere göre doğrula. |

**Kural:** Bu dosyalardan biri diğeriyle çelişiyorsa, en güncel olanı değil, **bu dosyanın (CLAUDE.md) tanımladığı sorumluluk alanına uygun olanı** doğru kabul et — yani SEO sorusu varsa `codexSeo.md`, güncel durum sorusu varsa `NEXT_SESSION.md` otoritedir. **`NEXT_SESSION.md` hariç** hiçbir kalıcı kural dosyasına commit hash veya anlık bilgi yazma — anlık durum sadece `NEXT_SESSION.md`'dedir.

---

## 1. Proje Özeti

Bu proje, QA mühendislerini sıfırdan mülakat seviyesine taşımayı hedefleyen,
self-contained bir React + Vite öğrenme platformudur.

**Marka ve domain:**
- Site markası: `LearnQA.dev`
- Ürün adı: `QA Learning Platform`
- Production URL: `https://learnqa.dev`

**Hedef kullanıcı:**
- Core Java biliyor (Collections dahil)
- Python ve TypeScript öğreniyor
- QA automation, API testing, DevOps ve cloud test pratiklerine odaklanıyor
- Anlatım dili: Türkçe açıklama + İngilizce teknik terimler (terimler
  Türkçeleştirilmez: `fixture`, `locator`, `assertion`, `selector`, `CI/CD`
  gibi terimler aynen kalır)
- Python/TypeScript/QA anlatımlarında Java analojisi **zorunlu**
  ("Java'da X şöyle yapılır, burada ise...")

---

## 2. Güncel Route Haritası

Uygulama temiz URL yapısı kullanır. Hash URL (`/#/...`) kullanılmaz.

- `/` — Home / automation playground
- `/selenium` — Selenium WebDriver
- `/playwright` — Playwright
- `/cypress` — Cypress E2E testing
- `/python` — Python + pytest/Selenium/Playwright
- `/typescript` — TypeScript + Playwright TS
- `/javascript` — JavaScript for QA Automation (DOM, events, async)
- `/sql` — SQL + interactive practice
- `/java` — Java for QA Automation
- `/java-document` — Java reference document reader
- `/git-github` — Git & GitHub for QA
- `/git-document` — Git/GitHub reference document reader
- `/linux` — Linux command line for QA engineers
- `/jmeter` — JMeter performance testing
- `/postman` — Postman API testing
- `/bruno` — Bruno (Git-native API client)
- `/rest-assured` — REST Assured Java API testing
- `/docker` — Docker for QA
- `/jenkins` — Jenkins CI/CD
- `/kubernetes` — Kubernetes for QA
- `/kafka` — Kafka for QA
- `/appium` — Appium mobile testing
- `/browserstack` — BrowserStack cloud testing
- `/aws` — AWS for QA
- `/azure` — Azure / Azure DevOps for QA
- `/test-frameworks` — pytest, Selenium, Playwright karşılaştırma
- `/what-is-testing` — Yazılım testine giriş / temel kavramlar
- `/manual-testing` — Manuel test öğrenme sayfası (görsel/oyunlaştırılmış senaryolar)
- `/algorithms` — Algoritmalar: QA mühendisi için görsel problem çözme atölyesi
- `/advanced-algorithms` — İleri seviye algoritmalar
- `/qa-mentor` — QA Mentor: kariyer yol haritası sihirbazı, ilerleme % takibi, sertifika
- `/leaderboard` — XP/streak liderlik tablosu (public, `get_leaderboard` RPC)
- `/verify-certificate/:id` — Sertifika doğrulama (public, dinamik route — sitemap'e eklenmez, bkz. `seo.js` `dynamic: true`)
- `/qa-assistant` — AI QA asistanı (`<ProtectedRoute>`, sadece üye)
- `/login`, `/auth/callback` — Giriş sayfası ve OAuth callback handler
- `/backend` — Basit Backend (Supabase tabanlı backend kurulum rehberi: auth/login, progress kaydı, rozetler, feedback, realtime chat, premium paywall). `<RequireAdmin>` ile korunuyor.
- `/basit-backend` — Basit Backend: E-Ticaret SQL ve API Lab (DBeaver ile PostgreSQL kurulumu + Next.js API, herkese açık — `/backend` ile karıştırılmamalı, ayrı bir sayfa). Kalıcı E2E test istisnası, bkz. §22.1.
- `/security` — Siber Güvenlik / OWASP Top 10, interaktif güvenlik simülasyonları. `<RequireAdmin>` ile korunuyor.

**Routing:**
- `src/main.jsx` → `BrowserRouter` kullanır.
- Eski `/#/...` URL'ler `history.replaceState` ile temiz path'lere taşınır.
- Production deploy GitHub Pages üzerinden yapılır; `.github/workflows/deploy.yml` `npm run build` ile `dist` üretir ve Pages artifact olarak yayınlar.
- GitHub Pages'te Netlify tarzı server redirect/fallback yoktur. Bu yüzden `scripts/generate-static-routes.mjs` her route için statik HTML shell üretir; workflow ayrıca `dist/index.html` → `dist/404.html` kopyalar.
- Yeni route eklenirse: `App.jsx`'e route + `React.lazy` import, `src/utils/seo.js`'e `ROUTE_SEO` girişi, gerekirse `scripts/generate-static-routes.mjs`'e static fallback içeriği eklenir.

---

## 3. Teknik Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Routing | react-router-dom, `BrowserRouter` |
| Styling | Tailwind CSS + custom CSS |
| SEO | route metadata + generated sitemap/robots + static route HTML shell'ler |
| Etkileşimli Python | Pyodide (CDN) |
| Etkileşimli SQL | sql.js (WebAssembly) |
| Etkileşimli TypeScript | Babel standalone transpile + eval sandbox |
| Syntax highlight | Prism.js (CDN) |
| Font | Inter, Plus Jakarta Sans, JetBrains Mono — Google Fonts CDN |
| State yönetimi | React state/context + localStorage |
| API mock | MSW |

---

## 4. Proje Klasör Yapısı

```text
automationexercise/
├── CLAUDE.md                 ← bu dosya, anayasa
├── AGENTS.md                 ← Codex için CLAUDE.md'ye pointer
├── codexSeo.md                ← SEO kuralları/mimarisi referansı
├── DEPLOY.md                  ← yayın/GSC adımları
├── promptkurallar.md          ← kullanıcının AI araçlarına prompt yazma rehberi
├── index.html
├── netlify.toml
├── package.json
├── .claude/
│   ├── NEXT_SESSION.md        ← TEK güncel durum dosyası
│   ├── CONTENT_RULES.md
│   ├── UI_STANDARDS.md
│   ├── TECH_SPEC.md
│   ├── QA_FRAMEWORK_SPEC.md
│   ├── COMPONENT_LIBRARY.md
│   ├── INTERVIEW_TEMPLATE.md
│   └── JAVA_COMPARISON.md
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
│   ├── context/            ← LanguageContext, ZoomContext
│   ├── components/
│   ├── data/                ← *Data.js, asıl içerik burada
│   ├── mocks/
│   └── utils/                ← seo.js, api-spec.js
└── dist/                     ← build çıktısı, elle düzenleme
```

---

## 5. Mimari Kararlar

- **Data-driven içerik:** Teknoloji sayfalarında asıl içerik `src/data/*Data.js` dosyalarındadır. İçerik değişikliği = data dosyasını düzenle, component'e dokunma.
- **Ortak render yapısı:** `TopicPage.jsx` üzerinden ilerler; her sayfa `blocks` dizisi render eder (`text | code | heading | grid | table | quiz | editor | diagram | comparison | glossary | error-dictionary | interview-questions | simple-box | visual | callout | locator-visual | selenium-visual | playwright-visual | simulation | animated-timeline`).
- **Dil sistemi:** `LanguageContext` global state tutar (`tr` | `en`). Her block'un `tr`/`en` varyantı olabilir; kod bloğu asla değişmez.
- **Route metadata:** `src/utils/seo.js` içindedir (`SITE_URL`, `DEFAULT_SEO`, `ROUTE_SEO`, `getSeoForPath`, `canonicalUrl`).
- **Runtime SEO güncellemesi:** `src/components/SeoMeta.jsx` route değiştikçe title/description/canonical/OG/Twitter günceller.
- **Static SEO shell üretimi:** Build sırasında her route için `robots.txt`, `sitemap.xml` ve crawl edilebilir static HTML shell üretilir (`scripts/generate-static-routes.mjs`). Detay: `codexSeo.md`.
- **`/java-document`** sayfası `public/documents/` altındaki markdown dosyalarını okuyup client tarafında parse eder.
- **Etkileşimli editör:** Her editör kendi sandbox'ında çalışır, global state'i kirletmez.
- **Progress/rozet üyelik zorunlu değildir:** Ders ilerleme kaydı (kaldığı yerden devam) ve rozetler, kullanıcı üye/login olmadan da çalışmalıdır (anonim/local-first, örn. localStorage). Üyelik (Supabase Auth) bu deneyimi senkronize eden **opsiyonel** bir katmandır, ön koşul değildir.
- **Üyelik ile premium/ödeme birbirinden bağımsız aç/kapa edilebilmelidir:** Üyelik (login/membership) ve premium/ödeme (paywall) iki ayrı özelliktir; biri prod'da aktifken diğeri feature-flag/ortam (test vs. prod) ile kapalı tutulabilmelidir. Hangi ortamda hangisinin aktif olduğunun güncel durumu `NEXT_SESSION.md`'dedir.

---

## 6. SEO ve Yayın Kuralları (Zorunlu)

SEO altyapısı bu projede **zorunludur**, opsiyonel değildir — misyonun yarısı bu.

- Temiz URL kullan: `/selenium`, asla `/#/selenium` değil.
- Her route için `src/utils/seo.js` içinde metadata olmalı; title `LearnQA.dev` içermeli, description 80–180 karakter aralığında olmalı, canonical `https://learnqa.dev/...` formatında olmalı.
- Build zinciri (`npm run build`) SEO kontrollerini geçmelidir: `check-seo → generate-seo-files → vite build → generate-static-routes → check-dist-seo`.
- Eski standalone `.html` dosyaları React route'larını gölgelememeli; legacy `.html` URL gerekiyorsa `public/*.html` içinde hafif canonical redirect dosyası olarak tutulmalı.
- İçerik SEO'su: her sayfa tek bir ana arama niyetini hedeflemeli (örn. "Selenium WebDriver tutorial for QA engineers"); sadece araç ismi değil, problem odaklı başlıklar da üretilmeli (wait strategies, Page Object Model, API testing gibi).
- SEO kuralları, script'lerin ne yaptığı, Google Search Console checklist'i ve uzun vadeli SEO stratejisi için **`codexSeo.md`'ye bak** — burada tekrar edilmez.

---

## 7. Dil ve localStorage

- `LanguageContext.jsx` → localStorage key: `language`, değerler `tr`/`en`, default `tr`.
- Dark mode → localStorage key: `darkMode`.
- Tamamlama/progress gibi ek state'lerde mevcut kodun kullandığı key'leri takip et, yenisini icat etme.

---

## 8. Kodlama Kuralları

- Yeni bileşen eklerken mevcut `*Page.jsx` ve `TopicPage.jsx` kalıplarını taklit et.
- İçerik değişikliği mümkünse sadece `src/data/*Data.js` dosyasında kalmalı.
- Yeni teknoloji route'u eklenirse: ayrı component, ayrı route, ayrı data dosyası ve SEO metadata birlikte eklenir (Bölüm 2).
- Sekmeli sayfalarda yatay tab bar değil, **sol dikey sidebar** kullan (`TopicPage` referans).
- Her sayfada zorunlu: dil toggle (sağ üst), scroll progress bar, fixed home butonu (sağ alt, 🏠).
- Kod blokları Prism highlight + copy button ile gösterilir, satır yorumları zorunlu.
- Dışa bağımlı görsel dosyası ekleme; diyagram gerekiyorsa inline SVG veya CSS kullan.
- `simple-box` block formatında `title` field kullanma; sadece `emoji` + bilingual `content`.
- `Documents/_Java notlar.md` yerel çalışma notudur ve **asla git tarafından takip edilmemelidir**. Her commit/stage işleminden önce `.gitignore` içinde bu path'in bulunduğunu ve `git status --short` çıktısında bu dosyanın görünmediğini kontrol et.
- **Türkçe sayfalarda kod ve komut yorumları Türkçe olmalıdır:** Sayfa dili `tr` olduğunda, kod bloklarındaki ve komut örneklerindeki tüm yorum satırları (`#`, `//`, `/* */`, `--` SQL stili dahil) Türkçe olmalıdır. Yerleşik İngilizce yazılım terimleri (`SELECT`, `INSERT`, `NULL`, `JOIN`, `PRIMARY KEY`, `assert`, `fixture` vb.) yorum içinde geçse dahi Türkçeye çevrilmez; ancak açıklama cümleleri (`-- single row insert`, `// run all tests` gibi) Türkçe olmalıdır. `TopicPage.jsx`'teki `localizeCodeComments` mekanizması bunu çalışma zamanında otomatik yapar; yeni yorum ifadeleri eklenirse `englishToTurkishCodeComments` dizisine çeviri çifti de eklenmelidir.
- **Dil kuralı (açık tanım):** Sadece yerleşik yazılım terimleri (`fixture`, `locator`, `assertion`, `selector`, `CI/CD`, `pipeline`, `commit`, `merge`, `SELECT`, `JOIN`, `NULL` gibi) İngilizce kalır. Bunların dışındaki tüm konu anlatımı, açıklama cümleleri, yorum satırları ve arayüz metinleri Türkçe olmalıdır.

---

## 9. İçerik Kapsam Kuralları

- Python, TypeScript ve SQL sayfaları W3Schools kapsamındaki konuları **eksiksiz** kapsamalıdır.
- Her teknoloji sayfası şu sekimleri içermelidir: **Kurulum/Installation, Gerçek Hayat/Real World, Ekosistem/Ecosystem, Yaygın Hatalar/Troubleshooting, Mülakat Soruları/Interview Questions.**
- **Her konunun ilk block'u mutlaka `simple-box` olmalı** ve teknolojiyi hiç teknik terim kullanmadan, günlük hayat benzetmesiyle açıklamalı (10 yaşındaki birine anlatır gibi). Ardından teknik tanıma geçilir, zıplama yapılmaz.
- Kurulum sekmesinde Windows/macOS/Linux komutları + her adım sonrası beklenen çıktı + verification komutu zorunlu.
- Gerçek hata mesajları için `error-dictionary` block'u kullanılır, minimum 8 farklı gerçek hata senaryosu.
- Her sekmede en az 1 inline SVG/CSS-only animasyon, badge/progress, karşılaştırma tablosu.

### 9.1. Öğretme Yöntemi ve Odak Kuralları

- **Odak dışına çıkma:** Kullanıcının öğrenmesi gereken ana konu dışında dikkat dağıtan, kafa karıştıran veya o anda gerekli olmayan yan konulara girme. Ek kavram gerekiyorsa yalnızca mevcut konuyu anlamayı doğrudan kolaylaştırıyorsa ekle.
- **Önce mantık, sonra komut:** Komut öğretmeden önce kullanıcıya işlemin amacını, sıradaki yerini, yapılmazsa ne olacağını ve gerçek işteki riskini göster. Komut ezberi yerine neden-sonuç akışı kur.
- **Görsel + animasyon + deneme zorunlu:** Yeni öğretici içerik, mümkün olan her durumda görsel/animasyonlu bir simülasyon, kullanıcının kendisinin deneyebileceği `try it yourself` pratiği ve deneme sonucunu açıkça gösteren başarı/uyarı çıktısı içermelidir.
- **Sonuç görünür olmalı:** Kullanıcı bir komut sırası, kod veya pratik denediğinde ekranda neyin doğru, neyin eksik ve bir sonraki güvenli adımın ne olduğu görünmelidir.
- **Kendi geliştirmelerini denetle:** Her içerik/UI geliştirmesinden sonra şu üç soruyu kontrol et ve gerekirse düzelt: konu odağı net mi, görsel/animasyon/pratik kullanıcıya gerçekten öğretiyor mu, kullanıcı sonucu görüp hatasını anlayabiliyor mu?
- **Daha iyi olabilir mi kontrolü:** İş bittiğinde yalnızca build'in geçmesine bakma; anlatımın daha sade, daha adım adım, daha görsel veya daha deneyerek öğrenilebilir hale gelip gelemeyeceğini değerlendir.
- **Quiz sıralaması zorunlu:** Bir `quiz` bloğu asla ilk blok olamaz ve konu anlatımı olmadan eklenemez. Her quiz; konuyu açıklayan `simple-box`, `text`, `code` veya animasyon bloklarından **sonra** yer almalıdır. Konu anlatımı ve içerik gelmeden quiz sorusu sorulmaz.

---

## 10. KESİN KURAL — Mülakat Soruları (Esnek Değildir)

Her teknoloji sayfasının mülakat sekmesinde **minimum 50 soru** bulunur:

| Seviye | Adet | Odak |
|--------|------|------|
| Basic | 15 | Kurulum, temel kavramlar |
| Intermediate | 20 | Gerçek iş senaryoları, yaygın hatalar, best practice |
| Advanced | 15 | Mimari kararlar, performans, CI/CD entegrasyonu |

- ❌ "X nedir?" tarzı salt tanım sorusu yasak.
- ✅ "Production'da X ile şu sorunla karşılaştın, ne yaparsın?" tarzı senaryo tabanlı sorular.
- Her soruya 3–6 cümle detaylı cevap (gerekirse kod örneği), Java karşılaştırması içermeli.
- Format detayı: `.claude/CONTENT_RULES.md` Kural 6, `.claude/INTERVIEW_TEMPLATE.md`.

---

## 11. Sık Yapılan Hatalar — Yapma

- ❌ `*Data.js` dışında içerik hardcode etme.
- ❌ Dış görsel dosyası kullanma (SVG inline olmalı).
- ❌ Teknik terimi Türkçeye çevirme.
- ❌ Editör/canlı örnek olmadan kod bloğu bırakma.
- ❌ Java karşılaştırması yapmadan Python/TS konusu anlatma.
- ❌ W3Schools'daki bir konuyu atlama (Python/TS/SQL).
- ❌ Sekmeleri yatay nav bar yapma — her zaman dikey sidebar.
- ❌ 50'den az mülakat sorusu yazmak (Bölüm 10).
- ❌ Kalıcı kural dosyalarına (bu dosya, AGENTS.md, codexSeo.md, `NEXT_SESSION.md` hariç diğer `.claude/*.md` dosyaları) commit hash veya anlık durum yazmak — bu bilgi sadece `NEXT_SESSION.md`'dedir.
- ❌ Konu anlatımı olmadan quiz sorusu sormak — her `quiz` bloğu, açıklama/kod/animasyon bloklarından sonra gelmelidir (Bölüm 9.1).
- ❌ Türkçe sayfada kod bloğu ve komut yorumlarını İngilizce bırakmak — `#`, `//`, `/* */` yorumlar Türkçe olmalıdır; sadece yerleşik yazılım terimleri İngilizce kalır (Bölüm 8).

---

## 12. Mobile Responsive Kuralları

- Mobilde büyük padding kullanma: `px-3 py-2 md:px-6 md:py-4` örüntüsü.
- Buton/link minimum 36px touch target (WCAG 2.5.5).
- `input`/`select`/`textarea` font-size mobilde 16px (iOS zoom bug önlenir).
- Kod blokları `overflow-x-auto` ile taşabilir olmalı.
- Grid'lerde mobil breakpoint: `grid-cols-1 md:grid-cols-2`.
- `html, body { overflow-x: hidden }` — yatay kaydırma olmamalı.
- Dark mode butonu mobilde (`<md`) icon-only olabilir.

---

## 13. Büyük Görevlerde Çalışma Protokolü

- Görevi dosya/bölüm bazında parçalara ayır, tek seferde her şeyi yazmaya çalışma.
- Daha önce okunan dosyaları tekrar okuma; konuşma bağlamından devam et.
- Önce mevcut pattern'i oku, sonra küçük ve doğrudan değişiklik yap.
- Her adımdan sonra `npm run build` veya ilgili kontrol komutunu çalıştır.
- Bağımsız işlemler için paralel araç çağrısı kullan, sıralı bağımlılığı olanlarda kullanma.
- Canlı deploy / Google Search Console gibi credential gerektiren işlerde kod tarafını hazırla, kullanıcıya net manuel adımları ver (bkz. `DEPLOY.md`).

---

## 14. Bilinen Uyarılar

- `javaData` chunk'ı büyüktür (~640KB); build uyarısı verebilir ama production build'i bozmaz.
- Browserslist/caniuse-lite eski veri uyarısı görülebilir; build'i bozmaz.
- `dist/` build çıktısıdır; gereksiz elle düzenleme yapma.
- Çalışma ağacında kullanıcıya ait uncommitted değişiklikler olabilir; izin olmadan geri alma veya silme — `NEXT_SESSION.md`'deki güncel listeye bak.

---

## 15. Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifinden öğreniyor.
- Her anlatımda Java analojisi zorunlu.
- Türkçe açıklama + İngilizce teknik terimler.
- **Görsel + animasyon önceliklidir** — metin secondary.
- Token kısıtı varsa adım adım, onay alarak devam et (Bölüm 13).

---

## 16. W3Schools İçerik ve Menü Standardı

Uygulamaya eklenecek olan herhangi bir dil, kütüphane veya araç (Python, JavaScript, TypeScript, SQL, Docker, Jenkins, Kubernetes vb.) eğitimi kesinlikle şu kurallara uymalıdır:

1. **Konu Eksiksizliği:** Eğitim içeriği tasarlanırken önce mutlaka `https://www.w3schools.com/` adresindeki ilgili dersin müfredatına bakılmalıdır. W3Schools üzerinde listelenen tüm konu başlıkları, bizim uygulamamızda da eksiksiz olarak yer almalıdır.
2. **Sekme ve Menü Yapısı:** Dersler "Basit - Orta - İleri" gibi yapay ve geniş kategorilere/sekmelere AYRILMAMALIDIR. Sol menü veya sekme yapısı, tıpkı W3Schools'ta olduğu gibi, en küçük atomik konu başlıklarına kadar dikey bir hiyerarşiyle bölünmelidir (Örn: JS Variables, JS Let, JS Const, JS Operators, JS Data Types...).

---

## 17. Pedagojik İçerik Standardı: "2 - 2 - 2 - 2" Kuralı

Kullanıcıyı hiçbir şekilde kuru teoride veya sadece ham kod bloklarında boğmamalıyız. Herhangi bir atomik konu başlığı anlatılırken üretilen içerik mutlaka şu altın oranı karşılamalıdır:

- **2 Adet Analoji (Benzetme):** Soyut kavramı günlük hayattan somut bir duruma benzeten 2 farklı açıklama.
- **2 Adet Akıl Yürütme (Logical Reasoning):** Kullanıcının mantık kurarak "Neden bu şekilde tasarlanmış?" sorusuna cevap bulmasını sağlayan 2 senaryo.
- **2 Adet LEGO ile Anlatım:** Kavramı renkli lego parçalarıyla oynamak, birleştirmek veya ayırmak üzerinden açıklayan 2 görselleştirme metni.
- **2 Adet İnteraktif Quiz:** Konuyu pekiştirecek 2 adet çoktan seçmeli veya interaktif kod tamamlama sorusu.

---

## 18. Dinamik Quiz ve Hata Algoritması

1. **Yedek Soru Hazırlığı:** Her quiz sorusu için arka planda mutlaka alternatif bir "Yedek Soru" mimarisi kurulmalıdır.
2. **Alternatif Akış:** Eğer kullanıcı quiz sorusunu YANLIŞ cevaplarsa, moral bozucu kırmızı bir hata ekranı yerine, hatayı açıklayan animasyonlu bir mikro-geri bildirim gösterilmeli ve kullanıcıya hemen **alternatif/başka bir quiz sorusu** sunularak şansını tekrar denemesi sağlanmalıdır.

---

## 19. Feynman Tekniği Checkpoint'leri

1. **Mini Mucit Alanı:** Her atomik konunun/modülün en sonuna interaktif bir 'Feynman Alanı' (Input text alanı veya sevimli bir canavar/robot karakter simülasyonu) eklenmelidir.
2. **Çocuksu Sorgulama:** Sistem kullanıcıdan, az önce öğrendiği karmaşık konsepti (Örn: Closures, Generics, Promises, Docker Volumes) teknik terim veya jargona boğulmadan **"5 yaşındaki bir çocuğa (veya sektöre yeni giren birine) anlatır gibi"** kendi cümleleriyle özetlemesini istemelidir.
3. **Mantıksal Doğrulama:** Kullanıcının girdisini değerlendiren mini bir mantıksal kontrolör veya mock/regex/AI validation yapısı kurulmalı, doğru mantık oturtulduğunda neşeli onaylamalar tetiklenmelidir.

---

## 20. Öğrenme Mühendisliği Core Promptu (Disney/Pixar & LEGO Modu)

AI Geliştirme araçları (Antigravity, Claude, Windsurf vb.) arayüz bileşenlerini, animasyonları ve akışları tasarlarken kendilerini bir **"Full-Stack UI/UX Animasyon ve Öğrenme Mühendisi"** olarak görmelidir. Kodlama yaparken aşağıdaki vizyon rehber alınmalıdır:

- **Çizgi Film Dinamikleri:** Arayüz gri, resmi veya statik teknik doküman gibi görünmemelidir. 5 yaşındaki bir çocuğun çizgi film izlerken veya legolarla oynarken yaşadığı o pürüzsüz, büyüleyici ve hiper-görsel deneyim web arayüzüne taşınmalıdır.
- **Frame-by-Frame Adım Adım İlerleme:** Her komutta, her kod satırında, verinin bir yerden bir yere gidişi (`framer-motion`, CSS keyframes veya geçiş efektleriyle) adım adım hareket eden mikro-animasyonlarla canlandırılmalıdır.
- **Çizgi Film Tarzı Hata Görselleri:** Kod derleyicisi hata verdiğinde veya kullanıcı yanlış eşleştirme yaptığında (Örn: Yuvarlak bir deliğe kare lego parçasını zorla sokmaya çalışmak gibi) sallanan, tıkanıp "Cızz!" diyen, iFrame sınırlarını kırmızıyla parlatan eğlenceli görsel efektler kullanılmalıdır. Başarı durumlarında ise ekrandan konfetiler fırlatılmalı, elementler parlayarak havaya zıplamalıdır.

---

## 21. Proje Teknolojik Yığını ve Geliştirme Kuralları

- **Teknoloji Koruma:** Mevcut projenin teknoloji yığınını (UI kütüphanesi, global state yönetimi, Tailwind CSS vb.) bozma. Mevcut tasarıma sadık kalarak, tüm çocuksu, animasyonlu özellikleri **Fonksiyonel Bileşenler (Functional Components)** olarak entegre et.
- **Analiz Protokolü:** Kodlamaya başlamadan önce her zaman etkilenen dosyaları analiz et. Kullanıcıya en kritik dosyaların listesini ve yapacağın yapısal, görsel ve animasyon odaklı değişiklikleri özetle, onay aldıktan sonra kodlamaya başla.

---

## 22. KESİN KURAL — Her Commit'te Zorunlu E2E Test Kontrolleri

> Bu bölümdeki kontroller `Documents/acceptancecriterias.md`'deki resmi kabul
> kriterlerinin (AC 01-07) operasyonel/test karşılığıdır. AC dokümanı "ne"
> beklendiğini tanımlar (gating eşiği, reset akışı, i18n kuralı vb.); bu bölüm
> "nasıl test edilir"i tanımlar. Yeni bir AC eklenirse veya değişirse, önce
> `acceptancecriterias.md` güncellenir, sonra buradaki ilgili kontrol maddesi
> senkronize edilir — iki dosya birbirine çelişmemelidir.

Bu proje kullanıcıya somut vaatlerde bulunur (bkz. Bölüm 9, 10, 17, 19). Bu vaatlerin
her commit'te hâlâ doğru çalıştığından emin olunmalıdır — `npm run test:e2e`
(post-commit hook ile otomatik tetiklenir, `simple-git-hooks` + `scripts/post-commit-tests.sh`)
aşağıdaki 6 kontrolü **mutlaka** kapsamalıdır. Yeni bir sayfa/özellik eklenirken veya
mevcut test suite'i değiştirilirken bu liste referans alınmalı, kapsam dışı kalan
kontrol varsa ilgili Playwright test dosyasına eklenmelidir:

1. **Buton tıklanabilirliği:** Ana sayfada ve her ders/test sayfasında her butonun
   görünür VE tıklanabilir (disabled/overlay ile bloklanmamış) olduğu doğrulanmalı.
2. **Mülakat gating — kapalı durum:** Bir derste konu quizlerinin **%60'ı doğru
   cevaplanmadıysa**, mülakat sorularının sekmede **gözükmediği** (kilitli/gizli
   olduğu) doğrulanmalı.
3. **Mülakat gating — açık durum:** **Her ders için** (tek bir örnek sayfa değil,
   `interview-questions` formatı kullanan tüm sayfalar) quizlerin %60'ı doğru
   cevaplanırsa mülakat sorularının sekmede **gözüktüğü** doğrulanmalı.
4. **Cevap input alanı:** Mülakat sorularında kullanıcının kendi cevabını
   yazabileceği bir input/textarea alanının var olduğu doğrulanmalı.
5. **AI değerlendirme:** Kullanıcının mülakat sorusuna girdiği cevabın yapay zeka
   tarafından (`grade-interview-answer` Edge Function) kontrol edildiği ve bir
   sonuç/puan döndüğü doğrulanmalı.
6. **Bitirme rozeti:** Mülakat sorularının **%80'ine** doğru cevap verdiği
   belirlenen kullanıcıya bitirme rozetinin verildiği doğrulanmalı.

**Not:** 2-6 arası kontroller her gerçek AI çağrısı gerektirdiğinden (Groq rate
limit riski), post-commit hook'ta **temsili bir sayfa** üzerinden hızlı koşulabilir;
**tüm sayfalar için tam koşum** ayrı bir suite'te (`npm run test:interview-flows`
gibi) tutulabilir — ama bu ayrım ve o an hangi sayfaların kapsam içinde/dışında
olduğu `NEXT_SESSION.md`'de güncel tutulmalıdır, bu dosyada değil (bkz. Bölüm 0).

### 22.1 Test Kapsamı Dışı Sayfalar (Kalıcı İstisna Listesi)

Aşağıdaki sayfalar hiçbir otomatik E2E/Playwright test suite'ine (post-commit,
`test:interview-flows`, `test:quiz-audit` vb.) dahil edilmez. Yeni bir test
dosyası/suite yazılırken bu sayfalar route listelerine eklenmemeli:

- **`/basit-backend`** — kullanıcı isteğiyle test kapsamı dışında tutuluyor.
- **`/security`, `/backend`** — `RequireAdmin` ile korunuyor, normal test
  hesabıyla erişilemiyor.
