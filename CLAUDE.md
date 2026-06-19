# CLAUDE.md — QA Learning Platform (Proje Anayasası)

> **OTURUM BAŞLANGIÇ PROTOKOLÜ**
> Her yeni oturumda önce bu dosyayı oku. Bu dosya **kalıcı kuralları** içerir —
> commit hash, "şu an ne yapıyoruz" gibi anlık bilgi **burada asla tutulmaz**,
> onun için `.claude/NEXT_SESSION.md` var. Aşağıdaki "Dosya Haritası" bölümü
> hangi konuda hangi dosyaya bakacağını gösterir. Kullanıcıdan proje hakkında
> aynı bilgiyi tekrar isteme — cevap bu dosyalarda ve kodun kendisinde.

**Misyon:** Kullanıcı dostu, kaliteli ve zengin içerikli; Google aramalarında
QA/test otomasyonu sorgularında öne çıkan bir web uygulaması inşa etmek.
İçerik derinliği ve SEO, eşit öncelikli iki temel hedeftir — biri diğeri
pahasına feda edilmez.

---

## 0. Dosya Haritası — Hangi Konuda Hangi Dosyaya Bak

Bu proje birden fazla AI aracıyla (Claude Code, Codex) geliştiriliyor.
Çelişki ve kafa karışıklığını önlemek için **tek kaynak ilkesi** geçerlidir:

| Dosya | İçerdiği Şey | Ne Zaman Oku |
|-------|--------------|--------------|
| **`CLAUDE.md`** (bu dosya) | Kalıcı proje kuralları, mimari, route haritası, içerik kuralları. Anayasa. | Her oturum başında, ilk. |
| **`AGENTS.md`** | Sadece `CLAUDE.md`'ye yönlendiren kısa pointer (Codex için). | Codex bunu okur; içerik burada değil orada. |
| **`.claude/NEXT_SESSION.md`** | **TEK güncel durum dosyası.** Son yapılanlar, sıradaki görevler, git/deploy durumu, SEO durumu — hepsi burada, tarihli. | `CLAUDE.md`'den hemen sonra, her oturumda. |
| **`codexSeo.md`** | SEO kurallarının ve mimarisinin **kalıcı** referansı (nasıl çalışır, hangi script ne yapar, GSC checklist, uzun vadeli SEO stratejisi). Anlık durum/yapılacaklar listesi **burada değil**, `NEXT_SESSION.md`'de. | SEO/routing/metadata işi yaparken. |
| **`DEPLOY.md`** | Netlify/GitHub Pages yayın adımları, Google Search Console kurulum adımları. | Yayın veya GSC işlerinde. |
| **`promptkurallar.md`** | Kullanıcının (Hasan) AI araçlarına (Claude Code, Codex) nasıl prompt yazacağına dair rehber — bu dosyaların kuralı değil, kullanıcının iş akışı kuralı. | Kullanıcı nasıl prompt yazacağını sorduğunda. |
| **`.claude/CONTENT_RULES.md`** | İçerik yazım kuralları: block formatları, mülakat sorusu formatı, hata sözlüğü formatı, kurulum formatı. | İçerik yazarken, W3Schools kapsam kontrolü yaparken. |
| **`.claude/UI_STANDARDS.md`** | Görsel/animasyon/renk standartları. | UI bileşeni eklerken. |
| **`.claude/TECH_SPEC.md`** | Editör, toggle, localStorage, performans teknik gereksinimleri. | Etkileşimli editör/teknik altyapı işlerinde. |
| **`.claude/QA_FRAMEWORK_SPEC.md`** | pytest/Selenium/Playwright derinlik kuralları. | Test framework içeriği yazarken. |
| **`.claude/COMPONENT_LIBRARY.md`** | Tekrar kullanılan bileşenler. | Yeni bileşen eklerken. |
| **`.claude/INTERVIEW_TEMPLATE.md`** | Mülakat soruları şablonu. | Mülakat sekmesi yazarken. |
| **`.claude/JAVA_COMPARISON.md`** | Java ↔ Python/TS karşılaştırma kuralları. | Python/TS anlatırken. |

**Kural:** Bu dosyalardan biri diğeriyle çelişiyorsa, en güncel olanı değil,
**bu dosyanın (CLAUDE.md) tanımladığı sorumluluk alanına uygun olanı** doğru
kabul et — yani SEO sorusu varsa `codexSeo.md`, güncel durum sorusu varsa
`NEXT_SESSION.md` otoritedir. **`NEXT_SESSION.md` hariç** hiçbir kalıcı kural
dosyasına (CLAUDE.md, AGENTS.md, codexSeo.md, `.claude/CONTENT_RULES.md` gibi
diğer `.claude/*.md` kural dosyaları) commit hash veya "şu an X yapıldı, push
bekliyor" gibi anlık bilgi yazma — bu bilgi yazıldığı an
güncelliğini yitirir. Anlık durum sadece `NEXT_SESSION.md`'dedir.

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
- `/python` — Python + pytest/Selenium/Playwright
- `/typescript` — TypeScript + Playwright TS
- `/sql` — SQL + interactive practice
- `/java` — Java for QA Automation
- `/jmeter` — JMeter performance testing
- `/postman` — Postman API testing
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
- `/java-document` — Java reference document reader

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
