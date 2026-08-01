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
| **`.claude/CONTENT_RULES.md`** | İçerik yazım kuralları: block formatları, mülakat sorusu formatı, hata sözlüğü formatı, kurulum formatı. **KURAL 12:** dil/tutarlılık zorunlulukları — `relatedTopicId` zorunluluğu, tekrar yasağı, yorum kapsamı. | İçerik yazarken, W3Schools kapsam kontrolü yaparken, yeni block eklerken. |
| **`.claude/UI_STANDARDS.md`** | Görsel/animasyon/renk standartları. | UI bileşeni eklerken. |
| **`.claude/TECH_SPEC.md`** | Editör, toggle, localStorage, performans teknik gereksinimleri. | Etkileşimli editör/teknik altyapı işlerinde. |
| **`.claude/QA_FRAMEWORK_SPEC.md`** | pytest/Selenium/Playwright derinlik kuralları. | Test framework içeriği yazarken. |
| **`.claude/COMPONENT_LIBRARY.md`** | Tekrar kullanılan bileşenler. | Yeni bileşen eklerken. |
| **`.claude/INTERVIEW_TEMPLATE.md`** | Mülakat soruları şablonu. | Mülakat sekmesi yazarken. |
| **`.claude/JAVA_COMPARISON.md`** | Java ↔ Python/TS karşılaştırma kuralları. | Python/TS anlatırken. |
| **`Documents/acceptancecriterias.md`** | Sistem kabul kriterleri (Acceptance Criteria) — navigasyon, quiz/retry mekanizması, i18n (TR/EN içerik+yorum kuralları), %60 mülakat gating, AI quiz açıklaması, mülakat AI değerlendirme döngüsü, %80 bitirme rozeti + reset akışı (Major AC 01-07); tema/erişilebilirlik ve roadmap ilerleme takibi (Minor AC 08-09). | Yeni özellik/sayfa geliştirirken veya bir akışı (gating, AI değerlendirme, reset, i18n) test ederken — bu dosyadaki AC'lere göre doğrula. |
| **`Documents/video-rollout-plan.md`** | Video-scene (film bloğu) veri şeması referansı, film spesifikasyon kalıbı ve ilk dalgaların (pilot sayfalar) uygulama detayları + Sonnet prompt şablonları. | Herhangi bir sayfaya `video-scene` filmi eklerken — şema ve kalıp buradan alınır. |
| **`Documents/video-sitewide-plan.md`** | "Her sekmede video + animasyon + sandbox" standardının (Bölüm 9.5) kalan TÜM sayfalara sıralı yayılım planı: dalga sırası, sayfa envanteri, sayfa başına iş akışı, parametrik prompt şablonu. | Sıradaki sayfayı Bölüm 9.5 standardına yükseltirken — hangi sayfa, hangi sırayla, nasıl. |
| **`Documents/sandbox-and-framework-plan.md`** | İki kalıcı yayılım planı: (1) her sekmede her konudan sonra sandbox/practice ekleme (Bölüm 9.1/9.2 boşluk kapatma), (2) framework kurulması gereken sayfalara (Selenium, Playwright, Cypress, REST Assured, Appium, Gauge) SOLID/POM mindmap mimari modülü ekleme. Fable/Sonnet görev dağılımı ve parametrik promptlar içerir. | Sandbox boşluğu kapatırken veya framework mimarisi modülü eklerken — hangi sayfa öncelikli, hangi promptla. |

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

## 1.1. Hız Değil Doğruluk Önceliklidir (Zorunlu Checklist)

> **Bu bölüm tüm geliştirme oturumlarında bağlayıcıdır — atlanamaz, ihmal edilemez.**

**Bir görevi "tamamladım", "bitirdi", "hazır" olarak raporlamadan önce aşağıdaki 4 maddeyi KENDİN çalıştır ve her birini tek tek doğrula:**

1. **İçerik bütünlük kontrolü:** `node scripts/check-content-integrity.mjs` çalıştırıldı mı, sıfır ihlal var mı?
2. **İpucu-konu bağı doğrulaması:** Eklenen/değiştirilen her `code-playground`/hint/practice bloğu, anlatılan konudan bağımsız test edildi mi — yani "bu ipucu gerçekten bir önceki koda mı ait?" diye kendi kendine soruldu mu?
3. **TR yorum taraması:** Türkçe sayfa bağlamında eklenen TÜM yorum satırları (`#`, `//`, `/* */`, `--`) tek tek okundu mu, İngilizce kalan var mı?
4. **Build doğrulaması:** `npm run build` hatasız geçti mi?

**Bu dört maddeden biri bile doğrulanmadan "tamamlandı", "bitirdi", "hazır" gibi ifadeler KULLANILMAZ.**

Şüpheli veya emin olunmayan bir nokta varsa: `"tamamladım"` yerine `"şunu kontrol etmen gerekebilir: ..."` şeklinde raporla.

Görev büyükse (birden fazla dosya/blok), tek seferde hepsini bitirmeye çalışmak yerine **parça parça ilerle**, her parçadan sonra bu 4 maddeyi tekrar çalıştır.

---

## 2. Güncel Route Haritası

Uygulama temiz URL yapısı kullanır. Hash URL (`/#/...`) kullanılmaz.

- `/` — Home / automation playground. Ayrıca **Mülakat Isınma Turu**: 12 konudan karışık, herkese açık (gate'siz) gerçek mülakat soruları — ders sayfalarındaki mülakat sekmesi %60 quiz barajının arkasında olduğu için yapılandırılmış veriye giren metin orada kullanıcıya görünmüyordu. Sorular build sırasında ders verisinden türetilir (`scripts/generate-interview-showcase.mjs`), ana sayfanın FAQPage şeması YALNIZCA bu görünür metinden üretilir. Şemaya görünmeyen soru eklenmesi build'i kırar
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
- `/sprint` — QA Sprint Simulator: Kanban panosu + bug görevleri (Analiz → Test Case → Otomasyon → CI → Merge). Ders sayfası DEĞİL; içerik `src/data/sprintsData.js`, görevler Phase 1 `mission` primitifini kullanır (bkz. `Documents/sprint-simulator-and-open-items-plan.md`)
- `/portfolio` — QA Portfolyo: çözülen görevleri, kapatılan sprint bug'larını, ustalık skorlarını ve rozetleri tek sayfada toplayan AGGREGATOR (üretmez, toplar). Kendi ilerleme state'i TUTMAZ — her render'da mevcut depolardan türetilir (`src/lib/portfolioSnapshot.js`); tek istisna kullanıcının kendi yazdığı ad/unvan. Metinler `src/data/portfolioData.js`'te
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
- **Ortak render yapısı:** `TopicPage.jsx` üzerinden ilerler; her sayfa `blocks` dizisi render eder (`text | code | heading | grid | table | quiz | editor | diagram | comparison | glossary | error-dictionary | interview-questions | simple-box | visual | callout | locator-visual | selenium-visual | playwright-visual | simulation | animated-timeline | prediction | code-trace | heap-stack | mission`). `mission` (challenge-first-experience-plan.md §3) mevcut interaktif blokları (code-playground/prediction/editor/sandbox) bir görev zincirine sarar — yeni sandbox yazmaz, `renderInner` ile adımları mevcut `renderBlock`'tan geçirir.
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
- **Dil-ayrık URL (zorunlu):** çıplak path = **Türkçe**, `/en/<path>` = **İngilizce**. URL dil için tek otoritedir; `localStorage.language` dili belirlemez. `/en` varyantı `main.jsx`'teki `basename` ile otomatik oluşur — yeni route eklerken elle `/en` route'u YAZILMAZ. Detay: `codexSeo.md` §0.
- Her route için `src/utils/seo.js` içinde metadata olmalı; title `LearnQA.dev` içermeli, description 80–180 karakter aralığında olmalı, canonical `https://learnqa.dev/...` formatında olmalı. **Metadata İKİ dilde de zorunludur:** girdinin `title`/`description` alanları İngilizce, `tr: { title, description }` bloğu Türkçe. Eksik veya İngilizceyle özdeş TR metadata build'i kırar.
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
- **Yeni `code`/`editor` bloğu eklenirken zorunlu kontrol (TÜM sayfalar için):** Yeni bir `type: 'code'` veya `type: 'editor'` bloğu eklendiğinde ya da mevcutu değiştirildiğinde şu iki seçenekten biri uygulanmalıdır:
  1. **Bilingual format:** Kodu `{tr: '...', en: '...'}` objesine çevir; TR versiyonunda tüm açıklama yorumları Türkçe olsun. Bu en kesin yöntemdir.
  2. **`englishToTurkishCodeComments` kaydı:** Kod bloğu düz string (plain string) kalıyorsa, içindeki her açıklayıcı İngilizce yorum ifadesinin `TopicPage.jsx`'teki `englishToTurkishCodeComments` dizisinde karşılığı olduğunu doğrula; yoksa ekle. Terminal/program çıktısı olan yorumlar (gerçek çıktı satırları, sürüm numaraları) bu kapsama girmez — bunlar teknik terim olarak değerlendirilir ve İngilizce kalabilir.
- **Dil kuralı (açık tanım):** Sadece yerleşik yazılım terimleri (`fixture`, `locator`, `assertion`, `selector`, `CI/CD`, `pipeline`, `commit`, `merge`, `SELECT`, `JOIN`, `NULL` gibi) ve terminal/program çıktısı satırları İngilizce kalır. Bunların dışındaki tüm konu anlatımı, açıklama cümleleri, yorum satırları ve arayüz metinleri Türkçe olmalıdır.
- **Kapsam:** Bu TR yorum kuralı TÜM teknoloji sayfaları için geçerlidir (Python, Selenium, Playwright, Docker, Jenkins, Git vb.) — sadece Python sayfasıyla sınırlı değildir. `tests/i18n-content-toggle.spec.ts` EN modda Türkçe sızıntısını test eder; TR modda yorum dili kalitesi `Documents/acceptancecriterias.md` AC 10 kapsamındadır.

---

## 9. İçerik Kapsam Kuralları

- Python, TypeScript ve SQL sayfaları W3Schools kapsamındaki konuları **eksiksiz** kapsamalıdır.
- Her teknoloji sayfası şu sekimleri içermelidir: **Kurulum/Installation, Gerçek Hayat/Real World, Ekosistem/Ecosystem, Yaygın Hatalar/Troubleshooting, Mülakat Soruları/Interview Questions.**
- **Her konunun ilk block'u mutlaka `simple-box` olmalı** ve konuyu somut bir günlük hayat benzetmesiyle açmalı — bu benzetme yüzeysel bir tek cümle olamaz, Bölüm 9.3'teki "Düşündürücü Analoji Standardı"nın 4 katmanını karşılamalıdır. Ardından teknik tanıma geçilir, zıplama yapılmaz.
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
- **Her kod bloğundan sonra interaktif öğretme üçlüsü zorunlu:** Yeni eklenen veya düzenlenen her `code`/konu anlatımı kod bloğunun ardına, mümkün olduğu her yerde şu üçü yerleştirilmelidir:
  1. **Animasyon** — adım adım görselleştirme (`step-animation`, `animated-timeline`, `simulation` gibi bloklar).
  2. **Drag-and-drop** — sürükle-bırak ile sıralama/eşleştirme alıştırması (`challenge` block, `variant: 'order-sort'`; native HTML5 DnD + ↑/↓ erişilebilir fallback, bkz. `OrderSort.jsx`).
  3. **Practice (Kendin Yaz ve Dene)** — kullanıcının sıfırdan kod yazıp kontrollü bir sonuçla karşılaştırabileceği bir deneyim (`code-playground` block, `starterCode`/`solutionCode` alanlarıyla; gerçek runtime güvenliyse değerlendirilir, değilse beklenen çözümle metin karşılaştırması yapılır).
  Bu üçlü, sekme başına bir kez değil, **konunun izin verdiği her atomik kod bloğunun ardına** tekrarlanmalıdır — kullanıcı pasif okumak yerine her adımda aktif olarak denemeli, sürüklemeli ve yazmalıdır. Referans uygulama ve tüm sayfalara yayılım kuralı için Bölüm 9.2'ye bak.

### 9.2. Referans Uygulama: Python Sayfası — Tüm Teknoloji Sayfalarına Yayılım Zorunluluğu

`/python` sayfası, Bölüm 9.1'deki interaktif öğretme üçlüsünün (animasyon + drag-and-drop + practice) en eksiksiz uygulandığı **referans sayfadır**:
- Sayfadaki tüm playground egzersizlerinde (`code-playground` block) hem "Bozuk Testi Düzelt" hem sıfırdan "Kod Yaz ve Dene" (`starterCode`/`solutionCode`) modu çalışır.
- Her sekmede en az 3 farklı drag-and-drop (`challenge`, `variant: 'order-sort'`) alıştırması bulunur.
- Her sekmede en az 1 `step-animation` bulunur.

Bu kalıp **Python sayfasıyla sınırlı bir deney değildir** — tüm teknoloji sayfalarına (Selenium, Playwright, Cypress, Java, TypeScript, JavaScript, SQL, Docker, Jenkins, Kubernetes, Postman, Bruno, REST Assured, JMeter, Kafka, Appium, BrowserStack, AWS, Azure, Git & GitHub, Linux, test-frameworks vb. — bkz. Bölüm 2 route haritası) zaman içinde aynı yoğunlukta yayılması gereken **kalıcı bir hedeftir**. Yeni bir sayfaya içerik eklenirken veya mevcut bir sayfa güncellenirken:
- Python sayfasındaki bu üçlü (playground/practice + step-animation + drag-and-drop) örnek alınmalı, component'ler tekrar yazılmadan (`CodePlaygroundBlock`, `StepAnimationBlock`, `ChallengeBlock`/`OrderSort` zaten hazır) sadece o sayfanın `*Data.js` dosyasına veri olarak eklenmelidir.
- Hangi sayfanın bu kalıba ne kadar ulaştığı (örn. "Java'da X eklendi, Y eklenmedi") **`NEXT_SESSION.md`'de** güncel tutulur, bu dosyada değil (bkz. Bölüm 0).

### 9.3. Düşündürücü Analoji Standardı

`/bruno` sayfasındaki `simple-box` analojileri bu standardın referans kalite barıdır. Yüzeysel tek cümlelik benzetmeler ("X, Y gibidir") **YETERSİZDİR** — her `simple-box`, kullanıcıyı pasif okumaktan çıkarıp aktif düşünmeye sevk eden şu 4 katmanı içermelidir:

1. **Somut, mekanizması konuyla birebir örtüşen bir analoji** — boş bir süs değil, açıkladığı tekniğin GERÇEKTEN nasıl çalıştığını yansıtan bir benzetme (örn. "süslü parantez yerine girinti = tarif kitabındaki adım girintisi: göz otomatik görür, derleyici SAYARAK yapar").
2. **Düşündürücü bir "neden" sorusu** — doğrudan cevabı vermeden önce, "zaten X yapıyorken neden Y'ye de ihtiyaç var?" tarzı bir akıl yürütmeye zorlayan soru.
3. **Karşılaştırma/zıtlık** — Java (veya sayfanın karşılaştırma kuralına göre ilgili referans teknoloji) ile yan yana konularak fark somutlaştırılır.
4. **İş dünyası/QA bağlamı** — bunun gerçek bir otomasyon/QA senaryosunda (flaky test, sessiz bug, yanlış PASS, production incident vb.) NEDEN önemli olduğu — analojiyi soyut bir oyundan çıkarıp meslekle bağlar.

Bu 4 katman, Bölüm 9'daki "ilk block `simple-box` olmalı" kuralının **uygulama standardıdır** ve eski "teknik terim kullanmadan, 10 yaşındaki çocuğa anlatır gibi" ifadesinin yerine geçer — hedef kitle yetişkin bir QA mühendisi olduğundan teknik terim kullanmak sorun değildir; asıl hedef kullanıcıyı düşündürmek ve meslekle bağ kurdurmaktır. Bu standart yeni yazılan veya güncellenen **her** `simple-box` bloğuna uygulanır; hangi sayfanın bu standarda ne kadar yükseltildiği `NEXT_SESSION.md`'de takip edilir, bu dosyada değil (bkz. Bölüm 0).

**Denetim aracı:** `node scripts/audit-analogy-depth.mjs [--missing] [sayfa...]` 4 katmanı sözcük ipuçlarıyla ("gibi", "like", "hayal et"...) arayan bir **triyaj aracıdır, hakem değildir** — denetim birimi tek bir blok değil, bölümün açılış `simple-box`'ı + onu izleyen ≤6 anlatım bloğudur (4. katman çoğu zaman `simple-box`'ın içinde değil, ardından gelen `heading`/`text` bloğundadır). Sözcüksüz metaforlarda ("Consider how a Formula 1 team...") yanlış-pozitif verebilir — bayrağı kaldırılan bir bölümü düzeltmeden önce metni oku.

### 9.4. İçerik Bütünlüğü ve Dil Tutarlılığı

Bu bölümdeki kurallar `scripts/check-content-integrity.mjs` script'i tarafından otomatik denetlenir. İhlal varsa build kırılır.

**Dil kapsamı (genişletilmiş):**
"Türkçe sayfalarda kod ve komut yorumları Türkçe olmalıdır" kuralı (Bölüm 8) yalnızca `type: 'code'`/`type: 'editor'` bloklarını değil, yorum satırı (`#`, `//`, `/* */`, `--`) içeren **HER** block tipini kapsar:
- `code-playground` — `starterCode`, `solutionCode`, `hint` alanları dahil
- `interview-questions` — cevaplardaki kod örnekleri dahil
- `error-dictionary` — `codeWrong`/`codeFixed` alanları dahil
- Yorum satırı içeren diğer tüm block tipleri

Kapsam dışı bırakılan hiçbir alan olamaz.

**İçerik ilişkisellik zorunluluğu:**
Her `code-playground`, `interview-questions` ve `error-dictionary` bloğu, hangi konu/kod bloğunun devamı olduğunu belirten zorunlu bir **`relatedTopicId`** alanı taşımalıdır. Bu alan olmadan blok eklenemez — `check-content-integrity.mjs` "ilişkisiz blok" olarak raporlar ve build'i kırar.

**Tekrar yasağı:**
Aynı veya birbirine %85'ten fazla benzeyen hint/ipucu/practice metni birden fazla farklı `topicId` altında kullanılamaz. Yeni bir ipucu/practice eklemeden önce mevcut projede aynı/benzer bir ipucunun olup olmadığını kontrol et (`check-content-integrity.mjs` bunu otomatik tespit eder).

### 9.5. Sekme Standardı: Her Dikey Sekmede Video + Animasyon + Sandbox (Katman 1)

Bu standart pilot sayfalarda (`/git-github`, `/gauge`) tamamlanmış olup **tüm
teknoloji sayfalarına yayılması kalıcı bir hedeftir** — Bölüm 9.2'deki üçlü
kuralın sekme düzeyindeki tamamlayıcısıdır. Sıralı yayılım planı
`Documents/video-sitewide-plan.md`'de, hangi sayfanın tamamlandığı
`NEXT_SESSION.md`'dedir.

**Tanımlar (bağlayıcı):**
- **Video** = `video-scene` bloğu (`VideoSceneBlock` filmi). Başka hiçbir blok video sayılmaz.
- **Animasyon** = `step-animation` | `simulation` | `animated-timeline` | `css-animation`.
- **Sandbox** = kullanıcı girdisi alan + sonucu değerlendiren interaktif blok: `code-playground` | `git-practice` | `editor` | `java-practice`. `simulation` sandbox SAYILMAZ (izleme ağırlıklı).

**Standart:** İçerik sayfasındaki her dikey sekmede en az **1 video + 1
animasyon + 1 sandbox** bulunmalıdır. Yeni bir sekme veya sayfa eklenirken bu
standart baştan uygulanır; mevcut bir sekme güncellenirken eksikler
tamamlanır.

**Film (video-scene) kuralları:**
- 5-8 sahne · `caption: {tr,en}` zorunlu · benzersiz `id` (XP tekilliği) · `xpReward` 10-15 · `sceneDurationMs: 3400` · aktör hareketi veri akışını GÖSTERMELİ (süs değil).
- Film, sekmenin GERÇEK içeriğine bağlı olmalı (o sekmedeki kod bloğu/simulation'ın anlattığı mekanizmayı görselleştirir) — konudan bağımsız film uydurulmaz.
- TR caption'larda açıklama cümleleri Türkçe, teknik terimler İngilizce kalır (Bölüm 8); `code` alanı varsa `{tr,en}` bilingual, TR yorumlar Türkçe.
- Yerleşim: sekmenin ana konu anlatım bloğunun (kod/simulation) hemen ARDINA, quiz/challenge'dan ÖNCE (Bölüm 9.1).
- Bileşen hazırdır (`VideoSceneBlock`, `type: 'video-scene'`, TopicPage'de kayıtlı) — yeni bileşen yazılmaz, sadece `*Data.js`'e veri eklenir. Veri şeması referansı: `Documents/video-rollout-plan.md` + mevcut film sabitleri (örn. `gitGithubData.js`).
- **EN+TR ayrı ağaçlı** veri dosyalarında film sabiti dosyanın başında tanımlanır ve İKİ section ağacına da AYNI referansla konur; **tek ağaçlı** (bilingual field) dosyalarda (örn. `gaugeData.js`) SADECE bir yere konur. İşe başlamadan önce dosyanın hangi yapıda olduğu tespit edilir.

**Animasyon/sandbox tamamlama kuralları:**
- `fillMissingCodeTrios` (interactiveTrioFillers.js) yalnızca `type: 'code'` bloğu olan ve dili bash/shell/text OLMAYAN yerlere otomatik üretim yapar; kodsuz sekmelere (hata sözlüğü, mülakat vb.) blok ELLE yazılır ve elle yazılan her `code-playground`'a `relatedTopicId` ZORUNLUDUR (Bölüm 9.4).
- Mülakat sekmesine eklenen bloklar quiz-gating (%60) kilidi arkasında kalır — bu beklenen davranıştır, hata değildir.

**Doğrulama:** Her sayfa yükseltmesinden sonra Bölüm 1.1 checklist'ine ek
olarak `tests/video-scene.spec.ts`'e o sayfa için en az 1 temsili render
testi eklenir (mülakat sekmesi gating nedeniyle test kapsamına alınmaz veya
gating'i açan yardımcıyla test edilir). Bölüm 22.1'deki sayfalar bu testlere
eklenmez. Çok büyük veri dosyalarında (örn. `javaData`, `typescriptData`)
build sonrası chunk boyutu izlenir ve `NEXT_SESSION.md`'ye not edilir.

### 9.6. Framework Mimarisi Sekmelerinde Çoklu Görünüm Standardı

Framework kurulması gereken sayfalardaki (Selenium, Playwright, Cypress, REST
Assured, Appium, Gauge — hedef sayfa listesi ve yayılım sırası
`Documents/sandbox-and-framework-plan.md` Faz A'da) "Adım 1 — Büyük Resim
Mindmap" anlatımı, tek bir devasa ASCII `code` (`language: 'text'`) bloğu
OLARAK YAZILAMAZ — okuyucu göz akışıyla bunu takip edemez, mimari tek
bakışta kavranamaz. Bunun yerine mimari EN AZ şu beş görünüme bölünerek
anlatılır (referans/pilot uygulama: `/gauge` → Framework Mimarisi → Adım 1,
`gaugeData.js`):

1. **Ana Akış** — `python-flow-diagram` bloğu (▶ Animasyon butonlu, adım adım
   renklenen zincir): bir isteğin/step'in hangi sınıftan hangi sınıfa geçtiği.
2. **Kurulum Akışı** — ayrı bir `python-flow-diagram`: config/ortam
   değişkenlerinin driver'a/instance'a nasıl ulaştığı (ana akıştan AYRI bir
   kutu, çünkü ondan ÖNCE ve ters yönde kurulur).
3. **Paralel Çalışma** — `grid` bloğu (`cols: 3`): ThreadLocal/paralel koşum
   mekanizması varsa her çalışma biriminin (thread/worker/context) bağımsız
   örneğini gösteren kartlar.
4. **Veri Paylaşım Kapsamı** — `grid` bloğu: DataStore/context/fixture-scope
   benzeri kapsam farklarını (senaryo/dosya/suite gibi) karşılaştıran kartlar.
5. **Kim Ne Yapar** — `grid` bloğu: her sınıfın ✔ (yapar) / ✘ (yapmaz)
   sorumluluk listesi.

**Zorunlu kısıtlar:**
- Yeni component YAZILMAZ — `python-flow-diagram` ve `grid` (veya o sayfada
  zaten kayıtlı eşdeğer bir görsel bileşen) kullanılır; bu blok tipleri hazır
  ve `TopicPage.jsx`'te kayıtlıdır (Bölüm 5'teki "sadece data ekle" ilkesi).
- Mermaid.js veya başka bir CDN tabanlı diyagram kütüphanesi EKLENMEZ —
  Bölüm 8'in "dışa bağımlı görsel dosyası ekleme, diyagram gerekiyorsa inline
  SVG veya CSS kullan" kuralına aykırı düşer.
- Her görünüm bilingual (`{tr, en}`) olmalı; TR açıklamalarda teknik terimler
  İngilizce kalır (Bölüm 8).
- Bu görünümlerin ardından gelen `quiz` bloğu (Bölüm 9.1 sıralama kuralı)
  KORUNUR, silinmez veya konu anlatımından önce gelmez.
- Hangi sayfanın bu standarda ne zaman yükseltildiği `NEXT_SESSION.md`'de
  takip edilir, bu dosyada değil (Bölüm 0).

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
- ❌ Türkçe sayfada kod bloğu ve komut yorumlarını İngilizce bırakmak — `#`, `//`, `/* */` yorumlar Türkçe olmalıdır; sadece yerleşik yazılım terimleri ve terminal çıktısı İngilizce kalır (Bölüm 8).
- ❌ Yeni `code`/`editor` bloğu eklerken TR yorum kontrolü yapmamak — bloğu plain string bırakıyorsan `englishToTurkishCodeComments`'te karşılığı olduğunu doğrula; yoksa ekle ya da bloğu `{tr, en}` bilingual formatına çevir (Bölüm 8). Bu kural tüm sayfalarda geçerlidir, yalnızca Python sayfasında değil.
- ❌ Bir kod bloğu eklerken animasyon + drag-and-drop + practice üçlüsünden birini atlamak — bu üçü her atomik kod bloğunun ardına, sadece sekme başına bir kez değil tekrarlanmalıdır (Bölüm 9.1).
- ❌ Bu interaktif kalıbı (playground/practice + step-animation + drag-and-drop) sadece Python sayfasında bırakmak — Python referans uygulamadır, diğer tüm teknoloji sayfalarına da yayılması kalıcı bir hedeftir (Bölüm 9.2).
- ❌ Tek cümlelik, yüzeysel bir `simple-box` analojisi yazmak ("X, Y gibidir" ve bitirmek) — Bölüm 9.3'teki 4 katman (somut analoji + düşündürücü "neden" sorusu + Java/karşılaştırma + iş dünyası/QA bağlamı) eksiksiz olmalıdır.
- ❌ Türkçe bağlamdaki `code-playground`, `interview-questions`, `error-dictionary` bloklarındaki yorum satırlarını İngilizce bırakmak — kapsam yalnızca `code`/`editor` değil, yorum satırı içeren HER block tipini kapsar (Bölüm 9.4).
- ❌ `code-playground`, `interview-questions`, `error-dictionary` bloğuna `relatedTopicId` alanı koymadan eklemek — bu alan zorunludur, eksik blok build'i kırar (Bölüm 9.4).
- ❌ Aynı veya %85'ten fazla benzer hint/ipucu metnini farklı `topicId`'ler altında tekrarlamak — her ipucu benzersiz ve konuya özgü olmalıdır (Bölüm 9.4).
- ❌ Yeni bir sekme/sayfa eklerken veya mevcut sekmeyi güncellerken Bölüm 9.5 standardını (her dikey sekmede ≥1 video + ≥1 animasyon + ≥1 sandbox) atlamak — standart yalnızca pilot sayfalara (`/git-github`, `/gauge`) özgü değildir.
- ❌ EN+TR ayrı ağaçlı bir veri dosyasına `video-scene` film sabitini SADECE bir ağaca koymak — öbür dilde film görünmez; sabit iki section ağacına da aynı referansla konur (tek ağaçlı dosyalarda ise tam tersi: yalnızca bir yere) (Bölüm 9.5).
- ❌ Sekmenin gerçek içeriğiyle bağı olmayan, konudan kopuk bir film uydurmak — her film o sekmedeki kod/simulation'ın anlattığı mekanizmayı görselleştirmelidir (Bölüm 9.5).
- ❌ Framework Mimarisi sekmelerinde "Büyük Resim Mindmap"i tek bir devasa ASCII `code` bloğunda anlatmak — Bölüm 9.6'daki beş görünüme (Ana Akış / Kurulum Akışı / Paralel Çalışma / Veri Paylaşım Kapsamı / Kim Ne Yapar) bölünmeli, hazır `python-flow-diagram`/`grid` bileşenleri kullanılmalıdır.
- ❌ Bölüm 1.1'deki 4 maddelik doğruluk checklist'ini çalıştırmadan "tamamladım", "hazır", "bitti" demek.
- ❌ Yeni route eklerken `src/utils/seo.js`'e sadece İngilizce metadata yazmak — `tr: { title, description }` bloğu zorunludur ve İngilizcenin kopyası olamaz (Bölüm 6, `codexSeo.md` §0). `check-seo.mjs` ikisini de hard-fail eder.
- ❌ Uygulama içinde router'ı atlayan ham `<a href="/docker">` veya `window.location.href = '/docker'` kullanmak — `/en` oturumundaki kullanıcıyı sessizce Türkçe sayfaya düşürür. Daima `<Link to>` / `useNavigate` kullan (`codexSeo.md` §0).
- ❌ Ders içeriğine, arayüz metnine veya kullanıcıya verdiğin cevaba iç koordinasyon dili yazmak — plan dosyası adı (`CLAUDE.md`, `NEXT_SESSION.md`, `Documents/*-plan.md`), `§` bölüm numarası, faz/görev kodu (`S3 promptu`, `Faz 1 Opus tarafı`) kullanıcının okumadığı belgelere atıftır (Bölüm 24). Kuralın KENDİSİNİ anlat, kaynağını değil. Kod yorumları muaftır. `check-content-integrity.mjs` Kontrol [H] + `tests/no-internal-jargon.spec.ts` bunu denetler.
- ❌ Bir dilin KENDİ sözdizimini Türkçeleştirmek — Gherkin'in `Scenario/Given/When/Then/And`'i, SQL'in `SELECT/JOIN`'i gibi anahtar kelimelerdir ve TR sayfada da İngilizce kalır; Türkçeleşen sadece adım/açıklama METNİDİR (Bölüm 8, §23.9). `check-content-integrity.mjs` Kontrol [G] bunu hard-fail eder.

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

## 22. KESİN KURAL — Her Push/PR'de Zorunlu E2E Test Kontrolleri

> Bu bölümdeki kontroller `Documents/acceptancecriterias.md`'deki resmi kabul
> kriterlerinin (AC 01-07) operasyonel/test karşılığıdır. AC dokümanı "ne"
> beklendiğini tanımlar (gating eşiği, reset akışı, i18n kuralı vb.); bu bölüm
> "nasıl test edilir"i tanımlar. Yeni bir AC eklenirse veya değişirse, önce
> `acceptancecriterias.md` güncellenir, sonra buradaki ilgili kontrol maddesi
> senkronize edilir — iki dosya birbirine çelişmemelidir.

Bu proje kullanıcıya somut vaatlerde bulunur (bkz. Bölüm 9, 10, 17, 19). Bu vaatlerin
her push/PR'de hâlâ doğru çalıştığından emin olunmalıdır — `npm run test:e2e`
GitHub Actions üzerinde otomatik koşar: `main`'e push'ta `.github/workflows/deploy.yml`
içindeki `test` job'ı (testler kırmızıysa `build`/`deploy` hiç çalışmaz), `main`'e açılan
PR'larda ise `.github/workflows/ci-tests.yml`. Yerel `pre-push` hook'u sadece hızlı
build/içerik-bütünlüğü doğrulaması yapar, tarayıcı açan E2E testlerini artık lokalde
çalıştırmaz (bkz. `scripts/pre-push-tests.sh`). Bu testler aşağıdaki 6 kontrolü
**mutlaka** kapsamalıdır. Yeni bir sayfa/özellik eklenirken veya
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
limit riski), CI'daki `test:e2e` job'ında **temsili bir sayfa** üzerinden hızlı
koşulabilir; **tüm sayfalar için tam koşum** ayrı bir suite'te (`npm run
test:interview-flows` gibi, gerekirse ayrı bir GitHub Actions job'ı/workflow'u
olarak) tutulabilir — ama bu ayrım ve o an hangi sayfaların kapsam içinde/dışında
olduğu `NEXT_SESSION.md`'de güncel tutulmalıdır, bu dosyada değil (bkz. Bölüm 0).

### 22.1 Test Kapsamı Dışı Sayfalar (Kalıcı İstisna Listesi)

Aşağıdaki sayfalar hiçbir otomatik E2E/Playwright test suite'ine (CI'daki
`test:e2e` job'ı, `test:interview-flows`, `test:quiz-audit` vb.) dahil edilmez. Yeni bir test
dosyası/suite yazılırken bu sayfalar route listelerine eklenmemeli:

- **`/basit-backend`** — kullanıcı isteğiyle test kapsamı dışında tutuluyor.
- **`/security`, `/backend`** — `RequireAdmin` ile korunuyor, normal test
  hesabıyla erişilemiyor.

---

## 23. En Sık Karşılaşılan Hatalar — Kök Neden ve Çözüm (Kalıcı Hata Sözlüğü)

> Bu bölüm, projede **tekrar tekrar** karşılaşılan gerçek hataların kök nedenini
> ve doğrulanmış çözümünü listeler. Yeni bir görev yaparken önce buraya bak —
> aynı tuzağa ikinci kez düşme. Her madde: **Belirti → Kök Neden → Çözüm →
> Önleme**. Yeni bir tekrarlayan hata çıkarsa buraya ekle.

### 23.1. EN modda Türkçe sızıntısı (i18n leak) — EN SIK HATA

- **Belirti:** Sayfa dili EN iken tablolarda, kod editörlerinde (`code-playground`),
  hata sözlüğünde veya SVG diyagramlarında Türkçe metin görünüyor. (Tersi de olur:
  TR modda kod yorumları İngilizce kalıyor — bkz. 23.2 kuralı, §8.)
- **Kök Neden:** İçerik `{tr, en}` bilingual obje yerine **düz string** olarak
  yazılmış (ör. `headers: ['Parça / Part']`, `starterCode: \`// Türkçe yorum\``,
  `error: '... karışıklığı'`). Düz string her iki dilde AYNI render edilir, TR sızar.
  İkincil neden: renderer alanı `tx(field, language)` ile basmıyor (ör. eski
  `error-dictionary` `fullMessage`, `diagram-svg` `svg` alanı `tx`'siz basılıyordu).
- **Çözüm:** İçeriği `{ tr: '...', en: '...' }` yap. Renderer `tx(...)` kullanmıyorsa
  onu da düzelt (bkz. `ErrorDictionaryBlock` `fullMessage` → `tx(...)`). `code`/
  `code-playground` bloklarında TR yorum Türkçe, EN yorum İngilizce ayrı tut.
  `diagram-svg` `tx`'siz olduğundan ya SVG metnini İngilizce yap (TR'de de kabul,
  §8 diyagram etiketi) ya da renderer'ı `tx`'li yapıp SVG'yi `{tr,en}` kur.
- **Önleme (BİRİNCİL — statik scanner):** `scripts/check-i18n-leaks.mjs` veri
  dosyalarını doğrudan gezerek `{tr,en}` objelerinin `en` tarafında ve düz
  string'lerde Türkçe-özgü karakterleri (`ığşçöüİĞŞÇÖÜ` — sadece `ığş` DEĞİL;
  "Parça"/"Örnek" ancak `ç/ö` ile yakalanır) yakalar. Build zincirinde ve
  `pre-commit`'te koşar. Sitede ~8500 mevcut sızıntı `scripts/i18n-leaks-baseline.json`
  ile grandfather edilmiştir; scanner yalnızca **baseline'ı AŞAN regresyonda**
  veya **baseline'ı 0 olan sayfalarda** (ör. `apiTestingData.js`) FAIL eder.
  Bir sayfayı temizledikten sonra baseline'ı `npm run i18n:baseline` ile DÜŞÜR
  (asla yükseltme). Yeni sayfayı `STRICT_ZERO_FILES`'a ekleyerek sıfır-tolerans yap.
- **Önleme (ikincil — runtime):** Yeni route'u `tests/i18n-content-toggle.spec.ts`
  `SAMPLE_ROUTES_FOR_EN_AUDIT` listesine de ekle (tarayıcıda görünür metni tarar).
- **Kalan kör nokta:** Hiçbir otomatik kontrol **ASCII-normalize Türkçe'yi**
  (`bakiyor`, `gunceller`, `hazir` — Türkçe-özgü karakter içermez) yakalayamaz;
  bunları elle göz gezdirerek ayıkla.

### 23.2. Template literal / string kaçış hatası (`node --check` patlar)

- **Belirti:** `npm run build` veya `node --check` "Unexpected token" / "Unterminated
  string" ile patlıyor; genelde büyük bir `*Data.js` düzenlemesinden sonra.
- **Kök Neden (3 alt tip, hepsi bu projede gerçekten kırdı):**
  1. **Tek tırnaklı string içinde kaçırılmamış apostrof:** `'...bug'a...'` veya
     `'...API'ye...'` → string erken kapanır. `request'i`, `route'lardan` gibi
     Türkçe ekli İngilizce terimler bunun en sık kaynağı.
  2. **Template literal (backtick) içine backtick yazmak:** markdown vurgusu için
     `` `kod` `` koyunca dıştaki backtick string'i erken kapanır.
  3. **Ters tık içine yazılan kodun İÇİNDEKİ tek tırnaklar:** ör. mülakat cevabında
     `` `@Get(':id')` `` — içteki `'` işaretleri de escape ister.
- **Çözüm:** Tek tırnaklı string'te apostrofu `\'` yap. Backtick içinde markdown
  vurgusu gerekiyorsa ya tek tırnaklı string'e çevir ya vurgusuz yaz. Toplu
  metin dönüşümü yapan script'lerde apostrofu daima `\'` olarak üret.
- **Önleme:** Her `*Data.js` düzenlemesinden SONRA (build beklemeden)
  `node --check src/data/<dosya>.js` çalıştır — hatayı satırıyla anında verir.

### 23.3. Mekanik toplu metin dönüşümünde isim/fiil ve deyim çakışması

- **Belirti:** Toplu bul-değiştir sonrası cümle bozuluyor (ör. "Sunucu sözleşmeye
  göre **response'lar**…" — "responds" fiili yanlışlıkla "responses" ismi oldu),
  veya bir deyim bozuldu ("**isteğe bağlı**" = optional → yanlışça "request'e bağlı").
- **Kök Neden:** Kelimenin çok anlamlılığı (`yanıtlar` = responds/responses) ve
  deyimler (`isteğe bağlı`) körlemesine `replace` ile ezildi.
- **Çözüm:** Bağlam-duyarlı script yaz: deyimleri sentinel ile koru, en uzun formu
  önce eşle, kelime sınırı (lookaround) kullan, dönüşüm sonrası **spot-check** yap
  (birkaç örneği gözle doğrula). Türkçe-özgü formlar İngilizce kelimelerin içine
  gömülmez (güvenli), ama fiil/isim çakışmalarını elle ayıkla.
- **Önleme:** Toplu dönüşümü doğrudan uygulama; önce **dry-run** ile ayrı dosyaya
  yaz, `node --check` + örnek diff incele, sonra uygula.

### 23.4. Çift-ağaçlı veri dosyasında index/senkron kayması (drift)

- **Belirti:** EN sekmede TR içerik (veya tersi) görünüyor; iki dil ağacı birbirini
  tutmuyor.
- **Kök Neden:** Dosya **çift ağaçlı** (`export const xData = { en: {sections},
  tr: {sections} }` — iki AYRI section dizisi) ya da `applyTr(enSection, overrides)`
  gibi **index eşleşmesine** dayalı; içerik genişleyince ağaçlar/indeksler sessizce
  kayar (bkz. memory: `applyTr-mechanism-risks`).
- **Çözüm/Önleme:** Yeni veri dosyalarını **tek ağaçlı** kur — `{ tr:{...}, en:{...} }`
  ama `sections` İKİ tarafta AYNI referans ve her metin alanı `{tr,en}` (referans
  kalıp: `gaugeData.js`, `apiTestingData.js`). `video-scene` sabiti tek ağaçta
  TEK yere konur. Çift-ağaçlı bir dosyaya dokunuyorsan film/sabiti İKİ ağaca da
  aynı referansla koymayı unutma (§9.5).

### 23.5. `fillMissingCodeTrios` kodsuz sekmelerde çalışmaz

- **Belirti:** Kodsuz bir sekmeye (hata sözlüğü, mülakat, saf kavram) otomatik
  animasyon/sandbox üretilmedi; §9.5 denetimi "eksik sandbox/animasyon" veriyor.
- **Kök Neden:** `fillMissingCodeTrios` (interactiveTrioFillers.js) **yalnızca**
  `type:'code'` olan VE dili bash/shell/text OLMAYAN bloklara üretim yapar
  (bkz. memory: `fillMissingCodeTrios-deficit`). Kodsuz gruplar (A kavramlar,
  E Network, F Swagger okuma, J hata sözlüğü, K mülakat) kapsam dışıdır.
- **Çözüm:** Bu sekmelere `step-animation`/`simulation` ve `code-playground`
  (seç/eşleştir/tamamla modu) bloklarını **elle** ekle. Her elle `code-playground`,
  `interview-questions`, `error-dictionary` bloğuna **`relatedTopicId` ZORUNLU**
  (§9.4) — yoksa `check-content-integrity.mjs` build'i kırar.
- **Önleme:** `scripts/check-i18n-leaks.mjs` içindeki `TRIO_COMPLETE_PAGES`
  listesine tamamlanmış sayfayı ekle — scanner o sayfanın HER sekmesinde ≥1
  video-scene + ≥1 animasyon + ≥1 sandbox olduğunu build/pre-commit'te doğrular
  (GRUP K'deki eksik video-scene defect'i bu kontrolle yakalanır). Sadece
  temsili render testine (`video-scene.spec.ts`) güvenme — o her sekmeyi taramaz.

### 23.6. Dil-varyantlı alanlar taramada "yanlış-pozitif leak"

- **Belirti:** i18n/sızıntı taraması `promptTr`, `modelAnswerTr`, `keywords` gibi
  alanları "EN'de Türkçe" diye işaretliyor ama aslında sorun yok.
- **Kök Neden:** `feynman-checkpoint` bloğu `promptTr/En` ve `modelAnswerTr/En`
  çiftlerini tutar; render EN modda `promptEn/modelAnswerEn` kullanır, `keywords`
  ise sadece cevap doğrulaması içindir (kullanıcıya GÖSTERİLMEZ). Yani bu alanlar
  render'da dile göre seçilir — düz string sızıntısı değildir.
- **Çözüm/Önleme:** Tarama yazarken bir alanın gerçekten sızıp sızmadığını
  **renderer'ın dil seçimine bakarak** doğrula. Feynman için: her tanımda
  `promptEn` VE `modelAnswerEn` var mı ve bunlar İngilizce mi — bunu kontrol et,
  `promptTr`/`keywords`'ü leak sayma.
- **İkinci örnek (2026-07-29, javaData.js 86→44):** `locator-visual`/
  `playwright-visual` blokları `{tr,en}` obje değil, çıplak `field`/`fieldEn`
  çift alan kullanır (`title`/`titleEn`, `explanation`/`explanationEn`,
  `tip`/`tipEn`, `when`/`whenEn`, `label`/`labelEn`). Renderer `isTr ? loc.title
  : (loc.titleEn || loc.title)` ile EN'de doğru alanı seçer (`TopicPage.jsx`
  satır ~4572/4576/4586/4591/4985) — `title` alanı Türkçe kalsa da EN modda hiç
  render edilmez, leak değildir. `check-i18n-leaks.mjs`'e `EN_SIBLING_FIELDS_CAMEL`
  seti eklenerek (kardeş `${key}En` doluysa leak sayma) düzeltildi; javaData.js
  borcu 86→44'e düştü (baseline güncellendi, gerçek borç artık sadece `code`
  alanındaki — `codeCommentTranslations` tablosunda karşılığı olmayan — yorumlar).
  Ayrıca `locator-visual`'ın `highlights` alanı (sadece HTML'de vurgu eşleştirmesi
  için kullanılır, hiçbir zaman ekrana basılmaz) `SAFE_KEYS`'e eklendi.
- **Üçüncü örnek — `code`/`codeWrong`/`codeFixed` de OPUS DEĞİL (2026-07-29, aynı
  oturum):** Bu alanlar `CodeBlock` → `getLocalizedCode()` üzerinden basılır; bu
  fonksiyon hem `{tr,en}` objesini hem düz string'i (RUNTIME'da `codeCommentTranslations`
  regex tablosuyla, `TopicPage.jsx` satır ~45-365) destekler. Scanner'a bu runtime
  çeviriyi simüle eden `simulateEnCode()` eklendi — tabloda zaten karşılığı olan
  Türkçe yorumlar artık yanlışlıkla leak sayılmıyor (javaData.js 44→26,
  browserstackData.js 14→1). Kalanlar (tabloda karşılığı OLMAYAN yorumlar) elle
  `{tr,en}` bilingual yapılarak kapatıldı (javaData.js 26→0, browserstackData.js
  1→0 — `java-compare` bloğunun `java`/`python`/`typescript`/`sql` alanları da
  aynı `getLocalizedCode()`'u kullandığından `CODE_COMMENT_FIELDS`'e eklendi).
  **Sonuç: site-geneli baseline 67 → 9** (kalan 9 = `backendData.js` 7 + `linuxData.js`
  2, ayrı belgelenmiş ComparisonBlock/shared-array istisnaları). ⚠ OPUS etiketi artık
  YALNIZCA gerçekten `tx()`/`getLocalizedCode()` KULLANMAYAN, ham render eden
  alanlar için geçerli — yeni bir "OPUS" leak görürsen önce renderer'da hangi
  fonksiyonla basıldığını doğrula, körü körüne "dokunma" deme.
- **Dördüncü örnek — son 9 leak de gerçek OPUS/paylaşım-körlüğü değildi
  (2026-07-29, aynı oturum):** `backendData.js`'in 7 leak'i (`BackendPracticeBlock`/
  `GitPracticeBlock`'ta `example: step.example` gerçekten `tx()` kullanmıyordu) —
  bu SEFERKİ gerçek bir renderer eksikliğiydi ama düzeltmesi tek satır ve geriye
  dönük güvenli: `example: tx(step.example, language)` (tx() plain string'te
  no-op döner). `linuxData.js`'in 2 leak'i ise scanner'ın "paylaşımsız" (YERİNDE-ÇEVİR)
  demesine rağmen aslında paylaşımlıydı — `linuxErrors` sabiti hem TR hem EN
  wrapper bloğunda AYNI dizi referansıyla kullanılıyordu, ama scanner'ın shared-
  tespiti yalnızca `type` alanlı ÜST bloğu (iki ayrı `error-dictionary` obje
  literali) karşılaştırdığından iç-içe paylaşılan diziyi kaçırıyordu — yerinde
  çeviri yapılsaydı TR modda da İngilizce görünürdü. Doğru çözüm: `{tr,en}` yap.
  **Sonuç: site-geneli i18n leak baseline'ı 9 → 0.** Ders: "⚠ OPUS" ve "YERİNDE-ÇEVİR"
  etiketleri de scanner'ın heuristic'idir, kör nokta içerebilir — bir leak'i
  kalıcı kabul etmeden önce renderer'ı ve paylaşım zincirini elle doğrula.

### 23.7. video-scene son/ilk sahnede pasif buton "kayboldu" görünüyor

- **Belirti:** Film son sahnedeyken ileri (⏭) butonu (veya ilk sahnede geri ⏮)
  yok gibi görünüyor.
- **Kök Neden:** Buton `disabled` olunca `disabled:opacity-40` ile koyu temada
  neredeyse görünmez oluyordu — silinmiş değil, sadece aşırı soluk.
- **Çözüm:** `VideoSceneBlock` `btnCls` pasif opaklığı yükseltildi (70/60) +
  `cursor-not-allowed`. **Davranışı değiştirme** (son sahnede ileri pasif kalmalı)
  — oynatıcı testleri (`video-scene.spec.ts`) `nextBtn.isDisabled()` ile biter,
  butonu hep-aktif/döngü yaparsan bu testler kırılır.

### 23.8. Bilinen, build'i BOZMAYAN uyarılar (aksiyon gerekmez)

- **Büyük chunk uyarısı:** `javaData`, `typescriptData`, `apiTestingData`,
  `sqlData`, `TopicPage` 500 kB+ — Vite uyarır ama production build sağlamdır
  (§14). Yeni büyük sayfa sonrası chunk boyutunu `NEXT_SESSION.md`'ye not et.
- **Browserslist/caniuse-lite eski veri uyarısı:** build'i bozmaz.
- **`scripts/post-commit-tests.sh: No such file or directory`:** commit sonrası
  hook eksik bir script'e işaret ediyor; commit yine de tamamlanır. Gerçek
  pre-commit doğrulaması (content-integrity) çalışır ve geçerse commit atılır.
- **GitHub Actions'ta canlı Supabase Auth çağrısı gerektiren testler skip edilir
  (2026-07-23/24'te teşhis edildi, kalıcı altyapı kısıtlaması):** CI runner'ının
  paylaşımlı IP'sinden gelen tüm `/auth/v1/*` istekleri (hem public `signInWithPassword`
  hem `service_role` ile admin API) Supabase tarafında reddediliyor — secrets/rate
  limit/captcha ayarlarından kaynaklanmıyor, proje ayarlarından düzeltilemez (Supabase
  Support veya self-hosted runner gerekir). Geçici çözüm: `tests/api-endpoints.spec.ts`,
  `tests/quiz-ai-explanation-access.spec.ts`, `tests/docker-interview-mastery-flow.spec.ts`,
  `tests/interview-grading-and-reset.spec.ts`, `tests/qa-mentor-progress-tracking.spec.ts`
  içindeki üyelik gerektiren describe'lar `process.env.GITHUB_ACTIONS === 'true'` koşuluyla
  SADECE CI'da skip ediliyor (yerelde/pre-push'ta normal çalışır). Yeniden teşhis etmeye
  gerek yok; sadece Supabase Support'tan yanıt gelirse veya self-hosted runner'a geçilirse
  bu skip'ler gözden geçirilir.

### 23.9. Dilin KENDİ sözdizimini Türkçeleştirmek (Gherkin tuzağı)

- **Belirti:** TR sayfada bir Gherkin bloğu `Senaryo:` / `Diyelim ki` / `O zaman` /
  `Ve` ile yazılmış. Kullanıcı raporu (2026-08-01, `/sprint`).
- **Kök Neden:** "TR sayfada açıklama Türkçe olmalı" kuralı (§8), anahtar
  kelimeleri de kapsıyor sanılıyor. Oysa Gherkin'in `Scenario/Given/When/Then/
  And`'i tıpkı `SELECT`/`JOIN`/`NULL` gibi **dilin kendi sözdizimidir** —
  çevrilirse hiçbir Cucumber koşumunun ayrıştıramayacağı sahte bir dil çıkar.
  Aynı tuzak SQL/YAML/JSON anahtar kelimeleri için de geçerlidir.
- **Yan bulgu:** `sprintsData.js`'teki 18 blokta `When` satırı tamamen DÜŞMÜŞTÜ
  (adım hiç anahtar kelimesizdi) — yani blok geçerli Gherkin bile değildi.
  Türkçeleştirme çoğu zaman yapıyı da bozar, sadece kelimeyi değil.
- **Çözüm:** Anahtar kelime İngilizce; **adım METNİ Türkçe kalır**
  (`When kullanici gecerli bir e-posta girer`). Anlamını açıklamak gerekiyorsa
  kod bloğunun **hemen üstündeki** `explanation` alanına iki dilli bir açıklama
  yaz — kod bloğunun İÇİNE tooltip bağlanamaz (`highlightGlossaryTerms` `<pre>`
  içeriğini tasarım gereği ASLA sarmaz).
- **Önleme:** `check-content-integrity.mjs` **Kontrol [G]** (`checkGherkinKeywords`)
  build ve pre-commit'te hard-fail eder. Yanlış-pozitif koruması vardır: "Senaryo:
  EC2'de Selenium Grid" gibi düz Türkçe BAŞLIKLAR Gherkin sayılmaz — bir string
  ancak ya çok satırlı olup en az bir adım satırı içeriyorsa ya da bir kod alanına
  (`code`/`starterCode`/`solutionCode`/`codeWrong`/`codeFixed`) yazılmışsa
  denetlenir.
- **Sözlük notu:** `Given`/`When`/`Then`/`And` `termGlossary.js`'e BİLEREK
  eklenmedi — günlük İngilizcede aşırı yaygın oldukları için EN modda her cümlede
  altları çizilirdi. Sadece `gherkin` ve `cucumber` terimleri eklendi.

---

## 24. KESİN KURAL — İç Koordinasyon Dili Kullanıcıya SIZMAZ

> Bu bölüm hem **kullanıcıya yazdığın mesajlar** hem de **uygulamanın içeriği**
> için bağlayıcıdır. Esnek değildir.

Bu proje birden fazla AI aracıyla (Claude Code, Antigravity, Windsurf, Trae)
geliştiriliyor ve bu araçlar birbirlerine plan dosyaları, `§` bölüm numaraları
ve görev kodları üzerinden referans veriyor. **Bu dil modellerin kendi
aralarındaki koordinasyon dilidir — kullanıcının dili değildir.**

Kullanıcı `CLAUDE.md`'yi, `NEXT_SESSION.md`'yi veya `Documents/` altındaki plan
dosyalarını okumak zorunda değildir ve çoğu zaman okumaz. Bu dosyalara yapılan
bir atıf kullanıcı için **doğrulanamayan bir kaynağa atıftır** — anlatımı
anlaşılmaz kılar ve güveni zedeler.

### 24.1. Yasak olan (her iki bağlamda da)

- Plan dosyası adları/yolları: `CLAUDE.md`, `NEXT_SESSION.md`, `AGENTS.md`,
  `codexSeo.md`, `Documents/*-plan.md`
- Plan bölüm numaraları: `§9.1`, `§23.4`, "planın §6'sı", "Bölüm 17 gereği"
- Faz/dalga/görev kodları: `Faz 1 Opus tarafı`, `S3 promptu`, `O1`, `Dalga 2`,
  `P1-S4`
- Model/araç görev dağılımı: "bunu Sonnet yapacak", "Opus çekirdeği", "Sonnet
  içeriği ekler"
- Prompt mühendisliği jargonu: `paste-ready`, "prompt şablonu", "geçit"

### 24.2. Nerede geçerli

| Bağlam | Kural |
|--------|-------|
| **Ders içeriği** (`src/data/*Data.js`, konu anlatımı, quiz, mülakat cevabı, film caption'ı, ipucu) | ❌ Asla. Bir kuralı anlatman gerekiyorsa kuralın KENDİSİNİ anlat, kaynağını değil: "CLAUDE.md'deki şu kural" DEĞİL, "her test bağımsız çalışabilmeli". |
| **Arayüz metni** (buton, başlık, boş durum, tooltip, hata mesajı) | ❌ Asla. |
| **Kullanıcıya verdiğin cevap/rapor** (sohbet mesajları) | ❌ Asla. Ne yaptığını sonuç diliyle anlat: "planın §3.1'indeki türetme util'ini yazdım" DEĞİL, "ilerleme verisini toplayan yardımcıyı yazdım". |
| **Kod yorumları** (`.jsx`/`.js` içindeki `//` ve `/* */`) | ✅ Serbest. Bunlar geliştirici dokümantasyonudur, kullanıcı görmez — mevcut yorumlardaki referanslar temizlenmez, yeni yorumlarda da kullanılabilir. |
| **Plan/kural `.md` dosyalarının kendisi** | ✅ Serbest. Zaten model-arası koordinasyon içindir. |

### 24.3. Tek istisna — konu olarak anlatılan AI araçları

`/claude-ai` ve `/llm-agents` sayfaları Claude Code'u ve ajan yapılandırma
dosyası kavramını **ders konusu** olarak anlatır. Orada "Claude Code",
"CLAUDE.md" gerçek bir ürün özelliğinin adıdır, iç koordinasyon jargonu
değildir — muaftır. **Muafiyet pattern bazındadır, dosya bazında topyekûn
değil:** bu sayfalarda da plan bölüm numarası (`§9.1`) veya görev kodu (`S3`)
yazılamaz.

### 24.4. Otomatik denetim (iki katman)

1. **`scripts/check-content-integrity.mjs` Kontrol [H]** — veri modülünü import
   edip TÜM string değerlerini gezer. Build + pre-commit'te **hard-fail**.
   Kod yorumlarını doğal olarak kapsam dışı bırakır (import edilmiş nesnede
   yorum yoktur).
2. **`tests/no-internal-jargon.spec.ts`** — gerçek tarayıcıda render edilen
   metni tarar. Statik denetimin göremediği yerleri yakalar: bileşen içine
   hardcode edilmiş JSX metni, `*Data.js` dışındaki içerik kaynakları
   (`termGlossary.js` gibi), runtime'da birleştirilen dizeler.

Hiçbir otomatik kontrol **kullanıcıya yazdığın mesajları** denetleyemez —
§24.2'nin üçüncü satırı yalnızca bu kurala uymanla sağlanır.
