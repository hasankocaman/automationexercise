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
| **`Documents/search-console-checklist.md`** | Google Search Console'da ELLE yapılacak adımların kutucuklu, güncel durumlu listesi: sahiplik doğrulaması (yapıldı), kademeli sitemap gönderimi, dizine ekleme istekleri, ilk 2 hafta beklentisi, ölçüm ritmi, sorun giderme tablosu. Ayrıca hesap gerektiren diğer adımlar (GitHub repo About/Website, LinkedIn, Bing, analytics, tanıtım yazıları). | Search Console / yayın sonrası görünürlük işlerinde. `codexSeo.md` ile çakışırsa BU dosya günceldir. |
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
- `/jira` — Jira: QA için iş takibi, bug raporlama, workflow, JQL, Scrum/Kanban, test yönetimi, REST API otomasyonu (tek ağaçlı `src/data/jiraData.js`; `fillMissingCodeTrios` KULLANMAZ, animasyon/sandbox elle yazılır)
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
- `/security` — Siber Güvenlik / OWASP Top 10, interaktif güvenlik simülasyonları. Herkese açık.
- `/qa-shop-spec` — QA Shop ürün analizi ve user story'ler. Pratik ortamının **giriş kapısı**: büyük resim (ne olduğu, sabit cevaplı deneme API'lerinden farkı, beş dakikada başlangıç) ÖNCE gelir, detaylar (veri modeli, sipariş durum makinesi, iş kuralları, hata kataloğu, 16 user story) sonra. `TopicPage` KULLANMAZ — bu bir referans belgedir, ders sayfası değil; kendi hafif blok renderer'ı var (`QaShopSpecPage.jsx` + `qaShopSpecData.js`). Sayfadaki SSS bloğu aynı zamanda FAQPage şemasının kaynağıdır (bkz. §23.16).
- `/qa-shop-setup` — QA Shop kurulum rehberi: Docker kurulumu, DBeaver ile veritabanı bağlantısı, OpenAPI sözleşmesini okuma, uçları elle ve Postman ile test etme. Repo indirmeden kurulum yolunu da anlatır. `TopicPage` KULLANMAZ (yordam rehberi).
- `/qa-shop` — QA Shop dükkân arayüzü: UI otomasyonu pratiğinin hedefi. Kullanıcının kendi makinesinde çalışan API'ye (`localhost:4000`) bağlanır; yığın kapalıyken boş hata değil, yönlendirme gösterir. Her etkileşimli öğe kararlı `data-testid` taşır. `TopicPage` KULLANMAZ (canlı uygulama).

> **QA Shop üçlüsü hakkında:** pratik yığınının kendisi `qa-shop/` klasöründedir
> (ayrı PostgreSQL + ayrı Express API, sitenin kendi backend'inden TAMAMEN
> bağımsız). Üç sayfa da herkese açıktır ve indekslenir.
>
> **Öğrenme sırası `dükkân → av → sözleşme/story referansı → otomasyon →
> belge`dir** (kullanıcı kararı, 2026-08-27). Ana sayfadaki afiş, öne çıkan
> giriş linki, kart listesi, footer ve görünür site haritası **dükkâna**
> işaret eder; şartname, API sözleşmesi ve kurulum referans rafıdır ve
> dükkânın üstündeki geçiş şeridinden bir tık uzaktadır.
>
> ⚠ Bu, **iptal edilmiş** bir kararın yerine geçti: "afiş bilerek şartnameye
> işaret eder — kullanıcı önce ne olduğunu görmeli, sonra kurmalı"
> (2026-08-18). Gerekçe sağlamdı ama ölçüm kullanıcının önce KURCALAMAK
> istediğini gösterdi; dükkân zaten Docker olmadan da açılıyor (tarayıcı
> modu), yani giriş kapısı bir okuma listesi değil çalışan bir sistem.
> Sırayı yeniden tartışmaya açma.

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
- **Terimi Türkçeleştirme yasağı — somut liste (kullanıcı talebi, 2026-08-18):**
  Yerleşik bir yazılım terimi TR metinde de İngilizce kalır; Türkçeleştirilmiş
  karşılığı kullanıcı için ANLAŞILMAZDIR. Gerçekten yapılmış ve düzeltilmiş
  hatalar:

  | ❌ Yazılmıştı | ✅ Doğrusu |
  |---|---|
  | tohum / tohumlama | `seed` / `seeding` |
  | dikiş (test dikişi) | `seam` |
  | belirlenimci | `deterministic` |
  | kiracı / çok kiracılı | `tenant` / `multi-tenant` |
  | uç / uç nokta | `endpoint` |
  | yığın (Docker / teknoloji yığını) | `stack` |
  | kusur | `defect` |

  Kural terimin KENDİSİNE bağlıdır, kelimeye değil: `playwrightData.js`'teki
  "kiracı ofis" bir BİNA benzetmesidir (gerçek dünya anlamı), yazılım terimi
  değildir — çevrilmez, olduğu gibi kalır. Toplu dönüşüm yapmadan önce her
  eşleşmenin bağlamını oku.

  ⚠ Son üç satır (2026-08-26) kuralın NEDEN kelime bazlı uygulanamayacağının
  en net kanıtı. Ölçüldü: `uç` kelimesi `uçak`, `uçuş`, `uçur`, `uçucu`
  içinde geçiyor; `uçtan uca` bir DEYİM (end-to-end); `main'in ucu` = tip;
  `uç değer` = boundary value; `matkap ucu` = drill bit; `uç cevap` =
  extreme; `çift uçlu kuyruk` = deque. `kusur` ise QA Shop dışında
  neredeyse tamamen `kusursuz` (flawless) olarak geçiyor. Doğru yöntem:
  her eşleşmeyi bağlamıyla listele, gözle ayıkla, sonra TAM DİZE
  eşleşmesiyle değiştir — asla kelime bazlı `replace` ile değil.

  ⚠ Aynı turda ikinci tuzak: apostrof eklerken "tüm `endpoint'` geçişlerini
  kaçır" gibi kör bir kural, dizeyi KAPATAN tırnağı da kaçırır
  (`'6 endpoint'` → `'6 endpoint\'`) ve dosya hiç kapanmayan bir dizeyle
  kırılır (§23.2). Kaçış YALNIZCA ardından Türkçe eki gelen apostrofa
  uygulanır; `node --check` her dönüşümden sonra koşturulur.

  ⚠ Bu dönüşümü yaparken §23.3 tuzağı iki kez daha yaşandı: `tohum→seed`
  kuralı `tohumlar` kelimesinin İÇİNDE ateşleyip **`seedlar`** üretti,
  `kiracı→tenant` kuralı da büyük harfli `Çok kiracılı`yı kaçırıp
  **`Çok tenantlı`** bıraktı. Kural: uzun formu önce eşle, büyük/küçük harf
  varyantlarını ayrı yaz ve dönüşümden sonra DEĞİŞEN HER SATIRI oku.
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
- ❌ Dış görsel dosyası kullanma (SVG inline olmalı). **TEK İSTİSNA — QA Shop
  ürün fotoğrafları (kullanıcı talebi, 2026-08-26):** `/qa-shop` vitrini
  `public/qa-shop/urunler/` altındaki gerçek ürün fotoğraflarını kullanabilir.
  Gerekçe: dükkânın öğretici değeri gerçek bir mağazaya benzemesine bağlı ve
  çizim bunu veremiyor. Kuralın koruduğu şey kaybolmadı — dosyalar **depoda
  barındırılır** (dış servise/CDN'e bağımlılık YOK) ve dosya bulunmadığında
  vitrin mevcut inline SVG'ye düşer, yani görselsiz ortamda (CI) sayfa
  bozulmaz. Ders anlatımı, diyagram ve şemalar için kural **aynen sürer**.
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
- ❌ **Bir sayfayı herkese açarken altı maddeden birini atlamak.** Açılış tek
  satır değildir; şunların HEPSİ birlikte yapılır, biri eksik kalırsa açılış
  yarım kalır ve bunu hiçbir kapı söylemez:
  1. `App.jsx`'te route koruması (`RequireAdmin`) kaldırılır
  2. `seo.js`'te `noindex` silinir (sayfa sitemap'e girer)
  3. `scripts/check-test-coverage.mjs` içindeki kapsam istisnası SİLİNİR ve
     gerçek bir E2E testi yazılır
  4. Ana sayfa ve footer'daki linklerin `isAdmin` koşulu kaldırılır — sayfa
     açık ama linki gizliyse adresini bilmeyen kullanıcı ulaşamaz
  5. Görünür site haritasına (`whatIsTestingData.js`) eklenir, yoksa iç
     bağlantı grafiğinde öksüz kalır
  6. `TopicPage` kullanmayan bir sayfaysa `generate-static-routes.mjs`'e
     kabuk içeriği yazılır — yoksa arama motoru sayfayı BOŞ görür (§23.16)
  (Kaynak: `/security` açılışında 4. madde, QA Shop açılışında 6. madde
  atlanmıştı; ikisi de ancak elle ölçünce fark edildi.)
- ❌ Yeni route eklerken `src/utils/seo.js`'e sadece İngilizce metadata yazmak — `tr: { title, description }` bloğu zorunludur ve İngilizcenin kopyası olamaz (Bölüm 6, `codexSeo.md` §0). `check-seo.mjs` ikisini de hard-fail eder.
- ❌ Uygulama içinde router'ı atlayan ham `<a href="/docker">` veya `window.location.href = '/docker'` kullanmak — `/en` oturumundaki kullanıcıyı sessizce Türkçe sayfaya düşürür. Daima `<Link to>` / `useNavigate` kullan (`codexSeo.md` §0).
- ❌ Ders içeriğine, arayüz metnine veya kullanıcıya verdiğin cevaba iç koordinasyon dili yazmak — plan dosyası adı (`CLAUDE.md`, `NEXT_SESSION.md`, `Documents/*-plan.md`), `§` bölüm numarası, faz/görev kodu (`S3 promptu`, `Faz 1 Opus tarafı`) kullanıcının okumadığı belgelere atıftır (Bölüm 24). Kuralın KENDİSİNİ anlat, kaynağını değil. Kod yorumları muaftır. `check-content-integrity.mjs` Kontrol [H] + `tests/no-internal-jargon.spec.ts` bunu denetler.
- ❌ Bir dilin KENDİ sözdizimini Türkçeleştirmek — Gherkin'in `Scenario/Given/When/Then/And`'i, SQL'in `SELECT/JOIN`'i gibi anahtar kelimelerdir ve TR sayfada da İngilizce kalır; Türkçeleşen sadece adım/açıklama METNİDİR (Bölüm 8, §23.9). `check-content-integrity.mjs` Kontrol [G] bunu hard-fail eder.
- ❌ Bir pratik/sandbox ekranında kullanıcıya kusurun YERİNİ, beklenen status kodunu veya somut test verisini peşinen söylemek — bu, test etmenin kendisi olan hipotez üretme becerisini okuma alıştırmasına çevirir (Bölüm 25). Sistem bulguyu DOĞRULAR, ilan etmez.
- ❌ Cevap anahtarı niteliğindeki bir paneli (adım + beklenen status turu, açık kusurların adlı listesi) varsayılan açık yapmak ya da ekranın öne çıkan yerine koymak — varsayılan gizli moddur, adlı liste ancak kullanıcı isterse (Bölüm 25.4).
- ❌ İpucunu YALNIZCA `:hover` ile açmak — dokunmatik cihazda hover yoktur, ipucu erişilemez olur; tıkla-aç da desteklenmelidir (Bölüm 25.3, Bölüm 12).
- ❌ Bir keşif alanında kullanıcıya "bul" deyip bulgusunu kendi doğrulayabileceği bir zemin (kusur anahtarı gibi aç/kapa karşılaştırması) vermemek — geri bildirimsiz keşif dolaşmadır (Bölüm 25.5).
- ❌ Pratik alanında ilerlemeyi "kaç sayfa/adım gezildi" diye saymak — pratik ilerlemesi kapatılan senaryoyla ölçülür (Bölüm 25.6).
- ❌ Arayüz açıklamasında genel bir yazılım kavramını (API, database, Swagger, endpoint, sepet, kupon) tanımlamak — açıklama YALNIZCA o kavramın bu uygulamadaki karşılığını anlatır (Bölüm 25.7). Cümleyi başka bir siteye de yazabiliyorsan, oraya ait değildir.
- ❌ Bir açıklama katmanının okunabilirliğini `toBeVisible()` ile doğrulamak — görüş alanının dışındaki öğe de "görünür"dür; dört kenarın viewport içinde kaldığını `boundingBox()` ile ölç (Bölüm 23.21).
- ❌ Bir rehber adımında dosyayı YALNIZCA depo yoluyla tarif etmek — imajlarla kuran kullanıcının o dosyası yoktur; indirme bağlantısı ya da konteyner içi yol da verilmelidir (Bölüm 25.8).
- ❌ Cevap anahtarı niteliğindeki bir eşlemeyi (hangi SQL sorgusu hangi kuralı/story'yi/defect'i görür) herkese açık dosyaya ya da sayfaya yazmak — bu bağı kurmak test edenin işidir, eşleme admin tarafında kalır (Bölüm 25.2.1).

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
çalıştırmaz (bkz. `scripts/pre-push-tests.sh`).

**Paket DEV SUNUCUSUNA DEĞİL, PRODUCTION BUILD'E karşı koşar (2026-08-04):**
`pretest:e2e` önce tam `npm run build` çalıştırır, `playwright.config.ts` de
testleri `vite preview` ile servis edilen `dist/`e yöneltir (port 4175).
Gerekçe ölçümle sabittir: dev sunucusunda ilk `<h1>` ana sayfada 17.003 ms'de
geliyordu, aynı sayfa production build'de 79 ms — 130-215 kat fark. Varsayılan
5 sn'lik doğrulama süresiyle paketin bir kısmı ürünü değil Vite'ın derleme
süresini ölçüyordu. Yeni bir suite/config yazarken bu ilkeyi koru: **yayınlanan
artefaktı test et.** (Bunun getirdiği tuzak için §23.10'a bak.)

**Kapsam artık makineyle zorunludur:** `scripts/check-test-coverage.mjs` build
zincirinde koşar ve her route'un en az bir testte geçtiğini doğrular. Test
kapsamı listesi bir belgede TUTULMAZ — kapsam dışı bırakılacak route, o
script'teki `EXCEPTIONS` sözlüğüne **gerekçesiyle** yazılır. Ölü istisna
(artık var olmayan ya da aslında test edilmiş route) da hard-fail eder.

Bu testler aşağıdaki 6 kontrolü **mutlaka** kapsamalıdır. Yeni bir sayfa/özellik eklenirken veya
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
- **`/backend`** — `RequireAdmin` ile korunuyor, normal test hesabıyla
  erişilemiyor.

> `/security`, `/qa-shop`, `/qa-shop-setup` ve `/qa-shop-spec` bu listede
> DEĞİLDİR — hepsi herkese açıldı ve gerçek testleri yazıldı. Bir sayfayı
> herkese açarken kapsam istisnasını silmek o açılışın parçasıdır (§11'deki
> altı maddelik liste).

⚠️ **Bu liste artık yalnızca açıklama içindir; OTORİTE koddadır:**
`scripts/check-test-coverage.mjs` içindeki `EXCEPTIONS` sözlüğü. Bir sayfayı
kapsam dışına almak için oraya gerekçesiyle eklenir — buraya yazmak tek başına
hiçbir şey yapmaz ve build yine kırılır. Bu bilinçli: belgeye yazılan kapsam
listesi ilk yeni sayfada sessizce eskiyordu, kod eskiyemez.

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
- **Somut ikinci örnek (2026-08-17, bu tuzağın gerçekten kaçınılmaz olduğunun
  kanıtı):** ASCII yazılmış Türkçe kabul kriterlerini düzeltmek için kelime
  haritalı bir script yazıldı. Haritadaki `icin → için` kuralı, `kullanicinin`
  kelimesinin **İÇİNDE** ateşleyip ortaya **`kullaniçinin`** çıkardı. Kelime
  sınırı kullanılmadığı için kısa bir eşleşme uzun bir kelimeyi bozdu.
  Yakalanmasının TEK sebebi dönüşümden sonra 61 kriterin tamamının gözle
  okunmasıydı — hiçbir otomatik kontrol ASCII-normalize Türkçeyi göremez
  (§23.1 "kalan kör nokta"). Ders: kelime bazlı toplu dönüşüm yaptıysan
  çıktının TAMAMINI oku; örnekleme yeterli değildir. İkinci turda düzeltmeler
  tam-dize eşleşmeleriyle yapıldı, kelime tahminiyle değil.
- **Yan kural — apostrof:** Türkçe düzeltmelerde `A'nın` gibi apostroflu
  yazım, tek tırnaklı JS dizesine girdiğinde dosyayı kırar (§23.2). Toplu
  dönüşümde apostrof üretmek yerine apostrofsuz yeniden yazım tercih edilir
  (`A kullanıcısının`).

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

### 23.10. `waitForSelector('h1')` HAZIRLIK SİNYALİ DEĞİLDİR (statik kabuk tuzağı)

- **Belirti:** Testler "sidebar sekmesi bulunamadı" (`count()` → 0) diye düşüyor
  ya da rastgele flaky oluyor; aynı test tek başına koşunca geçiyor. 2026-08-04'te
  6 mobil test bu yüzden kırmızıydı, 13 test flaky işaretlenmişti.
- **Kök Neden:** Yayınlanan her sayfa, arama motorları için üretilmiş bir statik
  gövde taşır (`data-seo-fallback`) ve o gövdenin **kendi `<h1>`'i vardır**. Yani
  `h1`, JavaScript çalışmadan ÖNCE de DOM'dadır: `waitForSelector('h1')` anında
  çözülür, test React mount olmadan ilerler ve otomatik yeniden denemesi OLMAYAN
  her çağrı (`count()`, `evaluate()`, `boundingBox()`, `innerText()`) boş DOM
  görür. Dev sunucusunda bu tuzak GÖRÜNMEZ (orada kabuk basılmaz, ilk `h1`
  zorunlu olarak React'in başlığıdır) — bu yüzden yıllarca kazara çalıştı ve
  ancak paket production build'e taşınınca ortaya çıktı.
- **Çözüm:** `tests/helpers/app-ready.ts` → `waitForAppReady(page)`. Kabuğun
  React tarafından SİLİNMİŞ olmasını bekler (`[data-seo-fallback]` yok olur),
  sonra `h1`'i doğrular. Dev sunucusuna karşı da güvenlidir (kabuk hiç
  basılmadığı için koşul baştan sağlanır).
- **Önleme:** Yeni testte sayfa hazırlığı için **asla** `waitForSelector('h1')`
  kullanma; `waitForAppReady(page)` çağır. Aynı mantık `[data-testid]` gibi
  yalnızca React'in bastığı seçiciler için gerekmez — onlar zaten kabukta yoktur.
- **Yan ders:** Bir doğrulama "hep yeşil" diye doğru sayılmaz. Her zaman boş liste
  döndüren kırık bir denetçi de aynen böyle görünür. Yeni bir guard yazınca
  BOZUK durumu bilerek üretip kırmızıya döndüğünü gör (örnek: `topic-pages-ui`
  içindeki "guard'ın kendi testi" — sayfaya 0×0 ve tıklanamaz buton enjekte edip
  denetçinin yakaladığını kanıtlar).

### 23.11. `vite preview` uzantısız yolda YANLIŞ kabuğu servis eder

- **Belirti:** Testler tek başına geçiyor, tam pakette rastgele düşüyor. Düşen
  doğrulama sayfanın `<title>`'ı, canonical'ı veya hreflang'i oluyor ve gelen
  değer hep ANA SAYFANIN değeri.
- **Kök Neden (ölçüldü, 2026-08-05):** `curl localhost:4175/docker` ana sayfanın
  kabuğunu döndürüyordu (`canonical https://learnqa.dev/`); aynı adres sondaki
  eğik çizgiyle, `/docker/`, doğru kabuğu veriyordu. Preview'in statik katmanı
  uzantısız yolu dosyaya çözemeyince istek tek-sayfa yedeğine düşüp
  `dist/index.html` dönüyor. GitHub Pages ise `/docker/index.html` servis eder —
  yani preview YAYINLANAN şeyi taklit etmiyordu. Sonuç: her sayfa React mount
  olana kadar ana sayfanın metadata'sını taşıyor, bu değerleri okuyan her
  doğrulama uygulamayla yarışıyordu.
- **Çözüm:** `vite.config.js` içindeki `previewDirectoryIndex` eklentisi.
  Uzantısız ve eğik çizgisiz yollarda `dist/<yol>/index.html` varsa isteği
  İÇERİDEN yeniden yazar (yönlendirme YAPMAZ — adres `/docker` kalmalı, testler
  ve uygulama bunu bekliyor). Asset'ler ve bilinmeyen yol yedeği etkilenmez.
- **⚠ Bunun getirdiği YENİ tuzak:** artık her sayfa KENDİ kabuğunu aldığı için
  kabuk, sayfanın gerçek başlıklarını ve SSS metnini içerir. Yani "beklenen metin
  göründü" de tek başına hazırlık sinyali DEĞİLDİR (§23.10'un genişlemiş hâli) —
  `getByRole('heading', ...)` kabuktan da karşılanabilir. Sayfa içeriğine bakan
  her testte önce `waitForAppReady(page)` çağır.
- **Yan bulgu (ürün):** bölüm adreslerinde (`/sql/sql-joins`) uygulama açılınca
  başlık kısa süre HUB başlığına geriliyordu; `SeoMeta` artık sekmeye özgü
  başlık gelene kadar kabuğun yazdığı doğru başlığı korur.

### 23.12. Kaybolan bir anı doğrulamak (animasyon sayaçları)

- **Belirti:** Bir etkileşim testi "element bulunamadı" diyor ama ekran
  görüntüsünde her şey yerli yerinde; tek başına koşunca geçiyor.
- **Kök Neden:** Doğrulama, ekranda yalnızca birkaç yüz milisaniye duran bir
  duruma bakıyor. `code-trace` ve `heap-stack` blokları ▶ Başlat'tan sonra
  otomatik oynatmaya geçer: "Adım 1/N" metni 1100-1300 ms sonra kendiliğinden
  "Adım 2/N" olur ve BİR DAHA GERİ GELMEZ. Paralel worker'lar CPU'yu paylaşırken
  ilk yoklama o pencereyi kaçırıyor ve doğrulama kalıcı olarak düşüyor.
- **Çözüm:** Kaybolan anı değil KALICI gerçeği doğrula. Referans:
  `learning-blocks-render.spec.ts` → `assertStepWalkthrough` — (1) Başlat sonrası
  sayacın VARLIĞI, (2) Sıfırla → İleri → İleri zincirinin sayacı 1'den 2'ye
  taşıması. İkinci zincir hiçbir zamanlayıcı içermez, sonuç makineden bağımsızdır.
- **Önleme:** Bir doğrulama zamanlayıcıya bağlı bir duruma bakıyorsa ya kalıcı
  bir duruma çevir ya da bekleme payını duvar saatinden TÜRET (örnek:
  `video-scene.spec.ts` → `SCENE_DURATION_MS * 4`), rastgele bir sayı yazma.
  Geniş pay doğruluğu gizlemez: sahne hiç ilerlemezse test yine düşer.

### 23.14. "Derleme geçti" ve "test yeşil" bir paketi ÇALIŞIYOR yapmaz

> 2026-08-17'de `qa-shop` yığını ilk kez gerçek bir PostgreSQL'e karşı
> koşturulunca ortaya çıkan üç hata da, o ana kadar **her kontrolden geçmişti**.

- **Belirti:** Derleme yeşil, DB'siz test paketi yeşil, statik denetimler
  yeşil — ama paket gerçek bir sisteme karşı koşturulunca ilk adımda düşüyor.
- **Kök neden (üç ayrı biçimde yaşandı):**
  1. **Çalışma-anı bağımlılığı derlemede görünmez.** REST Assured, bir Java
     nesnesini JSON'a çevirmek için classpath'te bir serileştirici ARAR ama
     kendisi içermez. `jackson-databind` yokken `mvn test-compile` **sorunsuz
     geçti**; hata yalnızca ilk istek atılırken çıktı.
  2. **Bekçi kör olabilir.** `router.use(requireAuth)` Express'te mount
     yolunun ALTINDAKİ HER istekte çalışır — route eşleşmese bile. Yani
     "404 dönmüyorsa route bağlanmıştır" çıkarımı o router'da hiçbir şeye
     bakmıyordu: uydurma bir yol da 401 dönüyordu. Canlı sistemde sipariş
     uçları 404 verirken bu test yeşildi (bkz. §23.10'un aynı ailesi).
  3. **Sabit id'ler yalnızca "ilk denemede" çalışır.** Çok kiracılı bir
     şemada satırlar kopyalanırken `bigserial` id'ler kayar. Sabit yazılmış
     `/products/1` **şablon kiracıda gerçekten vardır** — elle denerken
     çalışır, kendi alanını açan test aynı adreste 404 alır. Üstelik
     sıfırlama satırları yeniden klonladığı için id'ler tekrar kayar ve
     oturumları da iptal eder: sıfırlamadan önce alınmış her id ve token
     bayattır.
- **Çözüm/Önleme:**
  - Bir bekçi yazınca **BOZUK durumu bilerek üret ve kırmızıya döndüğünü gör**
    (§23.10 ve bu bölüm aynı dersi iki kez öğretti). Ayırt edemiyorsa, o
    kontrolün yerine gerçek kanıt üreten bir kontrol koy — burada Express
    router yığınını sözleşmeyle iki yönlü karşılaştıran test.
  - Kimlik/id gibi **türetilmiş değerleri önbellekleme**; listeden oku ve
    sıfırlamanın ötesine taşıma.
  - Bir test paketini "hazır" saymadan önce **hedef sisteme karşı en az bir
    kez koştur.** Derleme ve mock'lu testler kapsamın yalnızca bir kısmını
    kanıtlar.

### 23.13. Sekme-içi çapraz atıflarda harf+rakam kısaltması (statik denetimin kör noktası)

- **Belirti:** İçerik metninde (quiz açıklaması, hint, playground successMessage
  gibi) "§B3'te gördüğün gibi", "GRUP A'dan beri", "A2'deki" gibi ifadeler —
  build YEŞİL kalıyor, `check-content-integrity.mjs` Kontrol [H] hiçbir şey
  raporlamıyor.
- **Kök Neden:** Kontrol [H]'nin regex'i yalnızca `§\s*\d` (§ + rakam) arıyor.
  Çok sekmeli yeni bir sayfa yazarken önceki sekmeye atıf yapmak doğaldır, ama
  yazım sırasında plan dosyasındaki iç grup harflendirmesi (`GRUP A`, `A2`,
  `§B3`) yanlışlıkla kullanıcıya görünen metne sızabilir — bunlar § + HARF
  (§B3) ya da sadece harf+rakam (A2, GRUP A) olduğu için mevcut regex'i
  atlatır. Kullanıcı ne "GRUP A"nın ne "§B3"ün ne olduğunu bilir.
- **Çözüm:** Sekmeler arası atıf yaparken DAİMA görünür sekme başlığını kullan
  ("Kurulum & İlk Proje sekmesinde gördüğün gibi"), harf/rakam kısaltması
  değil. 2026-08-11'de `/jira` sayfasında S1-S5 fazlarında keşfedildi ve elle
  taranıp düzeltildi (`jiraData.js`).
- **Önleme:** Bir fazı bitirmeden önce `grep -n "§\|GRUP [A-Z]'" src/data/<sayfa>Data.js`
  ile içerik alanlarını (yorum satırları hariç) elle tara — otomatik kapı bunu
  yakalamaz.

### 23.15. `page.route` Service Worker'ın ele aldığı isteği KESEMEZ

- **Belirti:** Bir testte `page.route(...)` ile bir adrese giden istekler
  kesilmeye çalışılıyor ama sayfa isteği başarıyla atmaya devam ediyor. Kesici
  hiç ateşlenmiyor, sayaç sıfırda kalıyor ve test "beklenen hata durumu
  görünmedi" diye düşüyor — ürün doğru çalışırken.
- **Kök Neden (ölçüldü, 2026-08-17):** Bu uygulama bir Service Worker
  kaydediyor (`mockServiceWorker.js`, API mock altyapısı). Playwright'ın
  `page.route`'u Service Worker tarafından ele alınan istekleri ELE GEÇİREMEZ.
  `page.on('request')` o istekleri RAPORLAR — yani ağ trafiğini görürsün ama
  kesemezsin; bu ikilik hatayı çok kafa karıştırıcı yapar.
  ⚠ Ek tuzak: ilk denemede glob deseni (`'http://localhost:4000/**'`)
  kullanılmıştı ve o da SESSİZCE eşleşmedi. Yani iki ayrı sebepten aynı
  sonuç alınıyordu ve hangisinin geçerli olduğu belirsizdi.
- **Çözüm:** Ağı kesmeye çalışma. Uygulamayı KENDİ yapılandırmasıyla istenen
  duruma sok — `/qa-shop` örneğinde API adresi `localStorage`'daki
  `qaShopApiBase` anahtarından okunuyor, `page.addInitScript` ile kapalı bir
  adres (`http://127.0.0.1:45999`) yazmak hem ele geçirme semantiğine hiç
  bağlı değil hem de ürünün gerçekten desteklediği yolu sınıyor.
- **Önleme:** Bir kurulum adımının GERÇEKTEN uygulandığını testin içinde
  doğrula (örn. adres alanının kapalı adresi gösterdiğini `expect` et). Bu
  satır olmadan hatalı bir kurulum testi sessizce yanlış tarafa bakarken
  bırakır ve düşen beklenti ürün yüzünden düşmüş gibi görünür.
  Alternatif: o teste özel `test.use({ serviceWorkers: 'block' })`.

### 23.16. `TopicPage` KULLANMAYAN sayfa arama motoruna BOŞ görünür

- **Belirti:** Yeni bir sayfa yazıldı, sitemap'te var, `noindex` değil, build
  ve tüm SEO kapıları yeşil — ama Google'da hiçbir sorguda çıkmıyor.
- **Kök Neden (ölçüldü, 2026-08-18):** `scripts/generate-static-routes.mjs`
  ders sayfalarının kabuğunu veri modülünden OTOMATİK üretir. `TopicPage`
  kullanmayan özel sayfalar (`/qa-shop-spec`, `/qa-shop-setup`, `/qa-shop`,
  `/sprint`, `/portfolio`, `/qa-mentor` …) bu yola girmez; onlar için içerik
  **elle** yazılır ve girdisi olmayan route `return null`a düşer. O zaman
  kabukta yalnızca başlık + navigasyon linkleri kalır. Ölçülen: `/qa-shop-spec`
  kabuğunda **1278 karakter** görünür metin vardı ve neredeyse tamamı başka
  sayfaların linkiydi — 16 user story, 7 iş kuralı ve 21 satırlık hata
  kataloğu arama motoruna HİÇ görünmüyordu. **Hiçbir kapı bunu kırmaz:**
  sayfa teknik olarak geçerli, indekslenebilir ve linkli olduğu için tüm
  kontroller yeşil kalır. Yalnızca kabuğun görünür metnini ÖLÇÜNCE görülür.
- **Çözüm:** Özel sayfa için `generate-static-routes.mjs` içine içerik
  fonksiyonu yaz. İçeriği **veri dosyasından TÜRET**, elle kopyalama —
  kopyalanan metin sayfa güncellenince sessizce eskir ve arama motoruna artık
  doğru olmayan bir şey gösterirsin (`qaShopSpecShell` referans alınabilir:
  bölüm hedeflerini, iş kurallarını ve story başlıklarını veriden okur).
- **Bonus:** Özel içerik objesine 3+ `faqItems` koyulursa o sayfa için
  **FAQPage** zengin sonuç şeması da üretilir. ⚠ Şemadaki her soru sayfanın
  GÖRÜNÜR gövdesinde de bulunmak ZORUNDA — yalnızca kabuğa yazmak cloaking
  olur ve proje bunu daha önce `/manual-testing`'de bilerek reddetmişti.
  Doğru yol: soruları veri dosyasına koy, hem React sayfası hem kabuk aynı
  veriden bassın.
- **Önleme:** Yeni bir özel sayfa eklerken kabuğun görünür metnini ÖLÇ:
  `node -e "…"` ile `data-seo-fallback` gövdesinden etiketleri temizleyip
  karakter say. 2000 karakterin altındaysa sayfanın asıl içeriği kabukta yok
  demektir.

### 23.17. Tailwind `flex` çalışmıyor — katmansız CSS onu YENER

- **Belirti:** Bir öğeye `className="flex items-center"` yazılmış ama çocuklar
  yan yana değil ALT ALTA duruyor. DevTools'ta `className` içinde `flex`
  görünüyor, hesaplanan `display` ise `inline-block`.
- **Kök Neden (ölçüldü, 2026-08-26):** `src/index.css`'te KATMANSIZ bir kural
  var: `.flex > a, .grid > a, li > a, p > a, nav a, header a { display:
  inline-block }`. Tailwind yardımcıları `@layer utilities` içindedir ve CSS
  cascade'inde **katmansız kurallar katmanlı olanları ÖZGÜLLÜKTEN BAĞIMSIZ
  yener**. Yani `.flex` (0,1,0) `nav a`'dan (0,0,2) daha özgül olmasına rağmen
  kaybeder. Bu kural `<nav>`, `<li>`, `<p>`, `<header>` içindeki HER bağlantıyı
  etkiler.
- **Çözüm:** Bağlantı etiketini flex yapmaya çalışma; dizilimi bağlantının
  İÇİNDEKİ bir `<span>`'e al (global kural span'lere dokunmuyor). `!important`
  ya da `!flex` ile kuralı ezmek de işe yarar ama global bir davranışı tek bir
  bileşen için delmek olur — sarmalayıcı daha ucuz ve yerel.
- **Önleme:** `nav`/`li`/`header` içine flex bir link koyacaksan, tarayıcıda
  hesaplanan `display`'i ÖLÇ. Ekran görüntüsüne bakmak yetmez: kısa etiketlerde
  alt alta düşen iki öğe "tasarım böyle" gibi görünebilir.

### 23.18. Testin KENDİ KURULUMU hatayı gizler

- **Belirti:** Ürün gerçek kullanımda kırık ama paket tamamen yeşil. Kullanıcı
  "çalışmıyor" diyor, testler "çalışıyor" diyor.
- **Kök Neden (ölçüldü, 2026-08-26):** `/qa-shop`'ta giriş 401 dönüyordu çünkü
  sunucuda `POST /auth/login` `requireWritableSandbox` arkasındaydı ve kullanıcı
  önce "Kendi alanımı aç" demek zorundaydı. Testler bunu HİÇ görmedi çünkü
  hepsi girişten önce `alan-ac`'a tıklıyordu — kurulum adımı, ürünün kullanıcıdan
  istediği ama söylemediği adımı sessizce yapıyordu.
- **Çözüm:** Kritik akışlar için EN AZ BİR test, kullanıcının gerçekten yapacağı
  minimum adımla koşmalı: hazırlık yardımcıları olmadan, "sıfırdan gelen kişi"
  gibi. `/qa-shop`'ta bu test "QA paneline hiç dokunmadan giriş".
- **Önleme:** Bir `beforeEach`/kurulum adımı eklerken sor: *bunu kullanıcı da
  yapmak zorunda mı, yoksa ben testi kolaylaştırmak için mi yapıyorum?* İkincisi
  ise ürün o adımı kendisi yapmalı ya da en az bir test onsuz koşmalı.
  (§23.10 ve §23.14 ile aynı aile: yeşil bir paket, ürünün çalıştığını kanıtlamaz.)

### 23.19. React state güncelleyicisinin İÇİNDE ref okumak

- **Belirti:** Konsolda kalıcı "Encountered two children with the same key"
  uyarısı; listede bir id iki kez, bir id hiç yok.
- **Kök Neden (ölçüldü, 2026-08-26):** Kayıt numarası `setState` güncelleyicisinin
  İÇİNDE okunuyordu (`setGunluk((g) => [{ id: sayac.current, … }, ...g])`).
  React güncelleyiciyi sıraya alır ve SONRA çalıştırır; o ana kadar ref başka bir
  eşzamanlı istek tarafından çoktan artırılmış olur. İki güncelleyici aynı değeri
  okur. Ölçüm: id 6 iki kez, 5 hiç yok.
- **Çözüm:** Değeri güncelleyiciden ÖNCE yakala:
  `sayac.current += 1; const id = sayac.current; setState((s) => [{ id, … }, ...s])`.
- **Önleme:** Güncelleyici fonksiyonu SAF olmalı — dışarıdaki değişken bir değeri
  (ref, module state) okuması onu saf olmaktan çıkarır ve React'in çalıştırma
  zamanlamasına bağımlı hâle getirir.

### 23.21. `toBeVisible()` OKUNABİLİRLİK SİNYALİ DEĞİLDİR

- **Belirti:** Bir açıklama/ipucu katmanı ekranda okunamıyor (görüş alanının
  dışında kalıyor, üst şeride giriyor) ama testler yeşil.
- **Kök Neden (ölçüldü, 2026-08-28):** Playwright için "görünür" demek
  *render edilmiş ve `display:none`/`visibility:hidden` değil* demektir —
  görüş alanının DIŞINDA duran bir öğe de görünürdür. `/qa-shop`'ta sayfanın
  üst şeridindeki rozetin baloncuğu `bottom: 100%` ile yukarı açılıyor ve
  ekranın üstünde kalıyordu; `toBeVisible()` bunu hiç görmedi.
  İkinci sebep aynı anda vardı: konumlandırılmış bir katman, üstündeki
  `overflow` sınırlarına takılır — "yer yoksa aşağı çevir" tek başına yetmez.
- **Çözüm:** Katmanı `createPortal` ile `document.body`'ye taşı ve
  `position: fixed` kullan (taşma sınırlarından kurtulur); açılırken GERÇEK
  yüksekliğini ölç, yer yoksa ters yöne çevir, yatayda kenardan içeri çek;
  açıkken `scroll` (capture) ve `resize` dinleyip yeniden ölç. Ölçüm bitene
  kadar `visibility: hidden` ama YER KAPLAR — yoksa yükseklik ölçülemez.
- **Önleme:** Görünürlüğü değil KONUMU doğrula: `boundingBox()` alıp dört
  kenarın da `viewportSize()` içinde kaldığını `expect` et. Dar ekranı
  (375px) ayrıca sına — yatay sıkıştırma asıl orada kırılır.

### 23.22. CRLF dosyada kör metin değiştirme SESSİZCE eşleşmez

- **Belirti:** Toplu düzenleme script'i "hiçbir değişiklik olmadı" diyor ya da
  daha kötüsü sessizce hiçbir şey yapmıyor; oysa aranan metin dosyada duruyor.
- **Kök Neden (ölçüldü, 2026-08-28):** Bu depoda satır sonları KARIŞIK.
  `src/components/HomePage.jsx` CRLF, `src/data/qaShopSetupData.js` LF.
  Çok satırlı bir desende `\n` yazmak CRLF dosyada eşleşmez.
- **Çözüm/Önleme:** Çok satırlı düzenlemede `Edit` aracını kullan (satır sonunu
  kendisi çözer). Script yazman gerekiyorsa ÖNCE ölç:
  `node -e "console.log(fs.readFileSync(f,'utf8').includes('\r\n'))"`.
  Her toplu dönüşümde "hiç eşleşme yoksa `process.exit(1)`" koy — sessiz
  başarısızlık en pahalısıdır (§23.3 ile aynı aile).

### 23.23. `generate-static-routes.mjs` tek başına koşturulursa YANLIŞ kabuk üretir

- **Belirti:** Kabuğun görünür metnini ölçüyorsun ve her sayfada ANA SAYFANIN
  içeriğini görüyorsun; TR ve EN karakter sayıları birbirinin aynısı çıkıyor.
- **Kök Neden:** Script `dist/`teki HTML'e kabuk enjekte eder ve **idempotent
  değildir**. Build zincirinde önünde her zaman `vite build` olduğu (yani
  `dist/` temiz üretildiği) için bu görünmez; elle `node scripts/generate-static-routes.mjs`
  çağırınca zaten enjekte edilmiş çıktının üstüne tekrar yazar.
- **Önleme:** Kabuk ölçümü yaparken **tam `npm run build`** koştur, script'i
  tek başına çağırma. Ölçümün ilk turunda TR ve EN uzunlukları BİREBİR aynıysa
  şüphelen — gerçek içerikte iki dil asla tam olarak aynı uzunlukta olmaz.

### 23.24. Ekranda duran her düğme ÇALIŞIYOR demek değildir

- **Belirti:** Sayfa açılıyor, düğme görünüyor, testler yeşil — ama düğmeye
  basınca hiçbir şey olmuyor ya da konsola `is not a function` düşüyor.
- **Kök neden (iki ayrı biçimde ölçüldü, 2026-08-28):**
  1. **Ortak bileşen kontrolü KOŞULSUZ render eder, durumu dışarıdan alır.**
     `TopicHeader` odak modu düğmesini her zaman basar ve `setFocusMode`'u
     çağırır. `TopicPage` kullanmayan dört QA Shop sayfası ona durum
     vermiyordu: düğme ekrandaydı, tıklayınca patlıyordu. Aynı ailede ikinci
     bir ayrışma: dört sayfa tema kancasını KOPYALAMIŞTI ve iki kopya kök
     öğeye `dark`, ikisi `dark-mode`/`light-mode-forced` yazıyordu — ikisinde
     tema düğmesi sitenin geri kalanını hiç etkilemiyordu.
  2. **İstemci kodu hiç ateşlenmeyen bir koşulun arkasında olabilir.** QA
     Shop'un Supabase köprüsü `localStorage`'daki `sb-token`/`sb-user-email`
     anahtarlarını okuyordu; uygulamanın hiçbir yeri o anahtarları YAZMIYORDU.
     Kod yıllarca "vardı" ama bir kez bile çalışmadı; üstelik çalışsaydı da
     yanlış değeri (alan kimliğini, alan anahtarını değil) yazacaktı.
- **Çözüm:** Kopyalanan durum kancalarını tek dosyaya al (`src/hooks/`) —
  ayrışma kopya varken kaçınılmazdır ve hiçbir kapı onu göremez. Ortak bir
  başlığı kullanan yeni sayfada, başlığın İSTEDİĞİ tüm durumları ver.
- **Önleme:** Bir kontrolün varlığını değil DAVRANIŞINI doğrula: tıkla, sonucu
  ölç (kök öğedeki sınıf, `localStorage` değeri) ve `pageerror` sayacının
  sıfır kaldığını iddia et. `toBeVisible()` bir düğme için hiçbir şey
  kanıtlamaz (§23.21 ile aynı aile). Bir "köprü" yazdıysan, köprünün KARŞI
  ucunu kimin yazdığını da doğrula — okuyan taraf tek başına köprü değildir.

### 23.20. `[data-testid$=""]` hiçbir şeyle eşleşmez

- **Belirti:** Playwright locator'ı "element bulunamadı" diyor, `count()` 0
  dönüyor; oysa öğeler ekranda duruyor.
- **Kök Neden:** "Şu önekle başlayan ama tam olarak o olmayan" öğeleri seçmek
  için yazılan `[data-testid^="urun-"][data-testid$=""]` kalıbı. CSS'te
  `$=""` (boş dizeyle biter) **hiçbir zaman doğru değildir** — seçici sessizce
  boş küme döner. Bu oturumda iki kez yazıldı.
- **Çözüm:** Kapsayıcıdan git: `ul[data-testid="urun-listesi"] > li`. Ya da
  gerçekten önek eşlemesi gerekiyorsa yalnızca `^=` kullan.
- **Önleme:** Bir locator 0 döndüğünde önce SEÇİCİYİ şüphelen, ürünü değil —
  özellikle `$=""`, `*=""` gibi boş değer içeren kalıplarda.

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

---

## 25. KESİN KURAL — Keşif Önceliği: Sistem Bulguyu DOĞRULAR, İLAN ETMEZ

> Kullanıcı talebi, 2026-08-26. Pratik ortamları (`/qa-shop` üçlüsü, sandbox'lar,
> bug avı, gelecekteki her "kendin test et" alanı) için bağlayıcıdır.
> Ders sayfalarındaki konu anlatımı bu kuralın DIŞINDADIR — orada öğretmek
> zaten amaçtır (bkz. §9.1 "önce mantık, sonra komut").

### 25.1. İlke

**Sistem bulguyu doğrular, asla ilan etmez.**

Test etmek, bir sistemin nerede kırılabileceği hakkında hipotez üretmektir.
Bu, meslekte öğrenilmesi en uzun süren beceridir ve **hazır verildiğinde hiç
öğrenilmez**. Kusurun yerini, beklenen status kodunu veya "şu testi yaz"
talimatını peşinen söyleyen bir ekran, öğrenene okuma alıştırması yaptırır —
test alıştırması değil.

**Pratik testi:** Bir öğe kullanıcıya *nereye bakacağını* mı söylüyor, yoksa
*baktığı yerde haklı olup olmadığını* mı? Birincisi keşfi öldürür, ikincisi
keşfi mümkün kılar. Şüphede kalınırsa ikincisi seçilir.

### 25.2. Çizgi — iş malzemesi ≠ senin üretmen gereken

Gerçek bir QA işe başladığında bazı şeyleri ALIR. Bunlar spoiler değildir,
kısılmaz; aksine ne kadar gerçekçi olursa o kadar iyidir:

| ✅ Verilir (zenginleştir) | Neden |
|---|---|
| Çalışan, gerçek görünen arayüz (Amazon'a girer gibi) | Test hedefi kontrol paneline benzerse öğrenilen de o kadar kalır |
| Gerçek OpenAPI/Swagger sözleşmesi, TAM hâliyle | Sahada da sözleşme verilir |
| User story + kabul kriterleri — **iş dilinde, tek cümlelik** | Sahada da story verilir; ama kriter "422 döner" diye yazılmaz |
| Test verisi olan, sıfırlanabilir bir ortam | Sahada da test ortamı verilir |

Gerçek bir QA'ya **kimse şunları vermez**. Bunlar kullanıcının ÜRETMESİ
gereken iş çıktısıdır ve peşinen gösterilmesi yasaktır:

| ❌ Verilmez | Öldürdüğü beceri |
|---|---|
| "Stoğu aşmayı dene → 409 bekle" tarzı adım+beklenen status listesi | Sınır değer analizini *yapma* fırsatı |
| "Bu kusuru şu kontrol yakalar" (`catchableBy` tarzı alanlar) | Kusurun nasıl yakalanacağını bulma işi |
| "Testine `Ayse@x.com` ekle" tarzı somut test verisi ipucu | Harf duyarlılığını *fark etme* anı |
| Açık kusurların adları ve açıklamalarıyla listelenmesi | Avın kendisi |
| Kabul kriterinin İÇİNE yazılmış beklenen status kodu / hata sabiti / alan adı | Kriteri test case'e çevirme işi |

**Kabul kriteri nasıl yazılır (2026-08-27, kullanıcı kararı):** sahada bir
tester'ın eline gelen kriter iş dilindedir — "adet sıfır yapılamaz",
"süresi geçmiş bir kupon kabul edilmez". Given/When/Then dökümü, beklenen
status kodu ve gerçek test verisi kriterin İÇİNE yazılmaz; bunlar test edenin
ÜRETECEĞİ iş çıktısıdır.

Ayrıntılı sürüm silinmez, **admin'e** açılır (`useAuth().isAdmin`). Gerekçe:
içeriği yazan taraf doğruluğunu denetleyebilmeli, ama öğrenen cevabı hazır
bulmamalı. Referans uygulama: `/qa-shop-spec` user story kartı —
`acceptance` (herkes) + `criteria`/`testData` (yalnızca admin,
varsayılan kapalı bir açılır bölümde).

⚠ Bu ayrımı hiçbir derleme kapısı yakalayamaz: teknik kriteri geri koymak
sayfayı bozmaz, yalnızca öğretmeyi bozar. Koruyan şey
`tests/qa-shop-pages.spec.ts` içindeki "kabul kriterleri sahadaki gibi sade"
testidir — anonim ziyaretçinin gövdesinde `Given`/`When`/`Then`, status
kodu ve hata sabiti ARAMAZ olduğunu doğrular.

### 25.2.1. Tester'ın gerçekten ihtiyaç duyduğu dört şey (kullanıcı kararı, 2026-08-27)

Sahada bir tester'ın en çok işine yarayan şey dörttür. Pratik ortamı bunları
**zenginleştirmeli**; bunların ÖTESİ cevabı peşinen vermektir:

1. **Expected result'ı iyi anlamak** — şemalar, analiz belgeleri, iş kuralları,
   durum makinesi, veri modeli. Kuralın KENDİSİ verilir.
2. **Ayrıntılı Swagger dokümanı** — base URL, kimlik başlıkları, parametreler,
   gövde alanları/tipleri/zorunlulukları/doğrulama kuralları, cevap gövdeleri,
   örnekler. TAM hâliyle verilir.
3. **Kullanabildiği UI** — gerçek bir dükkân gibi görünen, kararlı test id'leri
   olan çalışan arayüz.
4. **Erişebildiği veritabanı** — DBeaver ile bağlanılabilen gerçek şema.

**Sınır:** bir bilgi "kuralın ne olduğunu" söylüyorsa VERİLİR; "o kuralı
sınamak için ne yapıp hangi cevabı bekleyeceğini" söylüyorsa VERİLMEZ.

| Aynı konu | ✅ Kural (verilir) | ❌ Reçete (verilmez) |
|---|---|---|
| Durum geçişi | "Ödenmemiş sipariş kargolanamaz" | "Ödemesiz kargola → 409 INVALID_TRANSITION bekle" |
| Yetki | "Kimse başkasının siparişini göremez" | "B, A'nın id'sini çağırdı → 403 FORBIDDEN. 404 değil 403 — beklediğin kodu sabitle" |
| Sınır | "Sayfa boyutunun bir üst sınırı vardır, aşan istek reddedilmez, sonuç tavanlanır" | "size=9999 → 200 ve 100 kayıt" |
| Hata kodları | Sözlük: `COUPON_EXPIRED` = kuponun süresi dolmuş | Katalog: "süresi geçmiş kupon → 422 COUPON_EXPIRED" |

Hangi endpoint'in hangi kodu döndürebileceği **sözleşmede** yazılıdır ve orada
kalması doğrudur (madde 2). Yanlış olan, aynı bilgiyi *senaryoyla eşleştirip*
şartname sayfasına taşımaktır: biri sözleşme okuryazarlığı, öbürü hazır test
tasarımı.

⚠ **Statik tarama bunu yakalayamaz — iki kez ölçüldü.** Bir kez veri
dosyasında (`verify`/`breaks` alanları), bir kez de bileşene HARDCODE
edilmiş bir açıklamada ("Okla gösterilmeyen her geçiş yasaktır ve 409 döner").
İkincisini yalnızca tarayıcıda render edilen metni tarayan test yakaladı
(§24.4 ile aynı aile). Koruyan test: `tests/qa-shop-pages.spec.ts` →
"kabul kriterleri sahadaki gibi sade".

### 25.3. Üç katmanlı açığa çıkarma (progressive disclosure)

Her pratik ekranı üç katmana ayrılır. Varsayılan HER ZAMAN Katman 0'dır:

- **Katman 0 — sürekli görünür, sıfır spoiler:** arayüz, sözleşme, story'ler,
  kabul kriterleri. Kullanıcı buraya kurcalamaya gelir.
- **Katman 1 — istek üzerine açılan ipucu:** cevap değil **dürtme**.
  ✅ "Bu ekranda bir sınır var" · ❌ "409 bekle".
  Etkileşim: masaüstünde hover, **dokunmatikte tıkla-aç** (hover yoktur —
  yalnızca `:hover`'a bağlanan ipucu mobilde ERİŞİLEMEZ olur, bu bir
  erişilebilirlik hatasıdır, §12).
- **Katman 2 — yalnızca kullanıcı bulgusunu KAYDETTİKTEN sonra:** doğrulama
  ve cevap. Sıra **bulgu → kayıt → doğrulama**'dır; asla cevap → uygula değil.

### 25.4. Varsayılan durum kuralları

- Kusur/bug avı içeren her alanda **gizli mod varsayılandır**: "bu alanda N
  kusur açık, hangileri söylenmiyor". Adlı liste ancak kullanıcı açıkça
  isterse görünür.
- Cevap anahtarı niteliğindeki paneller (adım+beklenen status turları, kusur
  adı listeleri) **varsayılan kapalı** ve ekranın öne çıkan yerinde DEĞİL.
- Bir turu/rehberi "öne almak" istiyorsan önce §25.1 pratik testini uygula:
  cevap anahtarını öne almak, keşfi tamamen ortadan kaldırır.

### 25.5. Keşif geri bildirimsiz bırakılamaz

Geri bildirimsiz keşif, keşif değil dolaşmadır. Kullanıcı bir sınırı zorlayıp
409 aldığında, bunun **doğru davranış mı yoksa bulduğu kusur mu** olduğunu
ayırt edemezse hiçbir şey öğrenmez.

Bu yüzden her keşif alanında kullanıcının kendi bulgusunu **hakemsiz
doğrulayabileceği bir zemin** bulunmalıdır. `/qa-shop`'ta bu zemin kusur
anahtarıdır: aynı adımı anahtar açık ve kapalıyken koşturmak, cevabı kimse
söylemeden farkı gösterir. Yeni bir pratik alanı tasarlarken bu zemini
kurmadan keşif serbestisi verme.

### 25.6. İlerleme "gezdim" değil "kapattım" olmalı

Pratik alanlarında ilerleme göstergesi sayfa ziyaretini değil, **kapatılan
senaryoyu** saymalıdır. Ölçüt: kullanıcı bir bulgu kaydetti mi, doğruladı mı,
testini yazdı mı. "14 adımın 1'indesin" bir okuma göstergesidir; pratik
alanında yanıltıcıdır.

### 25.7. Arayüz açıklamaları: yalnızca BU UYGULAMAYA mahsus olan anlatılır

> Kullanıcı kararı, 2026-08-28. Pratik ortamlarındaki kavram baloncukları
> (`QaShopKavram`) ve benzeri her açıklama katmanı için bağlayıcıdır.

Bir düğmenin ya da etiketin üstüne gelince açılan açıklama, **genel bilgi
ansiklopedisi değildir.**

| ❌ Açıklanmaz (herkes bilir) | ✅ Açıklanır (bize mahsus) |
|---|---|
| API nedir, database nedir, Swagger nedir | Bu API'de kimlik neden iki katmanlı |
| endpoint, istek gövdesi, cevap gövdesi, base URL | Bu adres Docker'a bağlı; Docker kapalıysa ne olur, sonucu nasıl görürsün |
| sepet nedir, kupon nedir, sipariş nedir | Kupon BURADA checkout'ta yeniden doğrulanır; sepetteki indirim garanti değildir |
| sandbox'ın sözlük anlamı | Sandbox BURADA ayrı sunucu değil, aynı veritabanında tohum verinin sana kopyası |

**Pratik testi:** cümleyi başka bir e-ticaret sitesi için de aynen
yazabiliyorsan, o kavram oraya ait değildir — çıkar.

Genel kavram açıklamak zararsız değildir: okuyanın zamanını alır ve asıl
bilinmeyeni (uygulamaya özgü davranışı) gölgeler.

**İkinci sınır — §25.2.1 burada da geçerli:** açıklama KURALI anlatır
("ödenmemiş sipariş kargolanamaz"), o kuralı sınama reçetesini değil
("şunu dene, şu kodu bekle"). Baloncuğa status kodu yazılmaz.

**Otomasyon kısıtı:** bu katmanlar `/qa-shop` gibi bir Selenium/Playwright
hedefine konuyorsa `pointer-events: none` ZORUNLUDUR — Playwright tıklamadan
önce hover yapar ve açılan katman tıklamayı keserse pratik hedefi flaky olur.
Tetikleyici düğmenin İÇİNE değil YANINA konur; düğmenin `data-testid`'si
değişmez.

**Erişilebilirlik:** yalnızca hover ile açılan açıklama dokunmatikte
erişilemez (§25.3). Hover + tıklama + klavye üçü birden desteklenir; hover ve
tıklama AYRI durumlarda tutulur — tek bir `acik` bayrağıyla yazılırsa fare
zaten üstteyken tıklamak baloncuğu KAPATIR.

**Denetim:** `scripts/check-qa-shop-kavramlar.mjs` build zincirinde koşar;
sözlükte olmayan anahtarı, kullanılmayan ölü kaydı, eksik iki dilliliği ve
düz genel terim başlığını hard-fail eder.

### 25.8. Repo'ya bağlı belge, repo indirmeyen kullanıcıya YOK demektir

> Kullanıcı bulgusu, 2026-08-27.

Bu ortam iki yoldan kurulabiliyor: depoyu klonlayarak ya da yalnızca
yayınlanmış Docker imajlarıyla. İkinci yoldan gelen kullanıcının makinesinde
depo dosyaları **yoktur**.

Bu yüzden bir rehber adımı `qa-shop/db/validation-queries.sql dosyasını aç`
diyorsa, o adım kullanıcıların bir kısmı için uygulanamaz — ve bunu hiçbir
derleme kapısı söylemez, sayfa çalışmaya devam eder.

**Kural:** kullanıcıya bir dosya gösteriliyorsa, onu edinmenin repo
GEREKTİRMEYEN bir yolu da verilmelidir. Üç seçenek sırayla sunulur:
1. Siteden indirme bağlantısı (`scripts/build-qa-shop-downloads.mjs` her
   build'de `public/qa-shop/indirilebilir/` altına üretir — depoya girmez).
2. Depo yolu (klonlayanlar için).
3. Hiç edinmeden konteynerin içinden çalıştırma (imaja gömülü dosyalar
   `/opt/qa-shop/` altındadır).

⚠ "İmajın içinde var" tek başına yeterli DEĞİLDİR: konteynerin içindeki bir
dosya DBeaver'da `File > Open File` ile açılamaz. Dosyanın kullanıcının
diskinde olması gereken bir akış varsa indirme bağlantısı zorunludur.
