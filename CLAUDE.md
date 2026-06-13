# CLAUDE.md — QA Learning Platform

> **OTURUM BAŞLANGIÇ PROTOKOLÜ:**  
> Her yeni oturumda önce bu dosyayı, sonra aşağıda listelenen diğer MD  
> dosyalarını sırayla oku. Kullanıcıdan tekrar açıklama isteme — cevap bu dosyalarda.

---

## 1. Proje Özeti

Bu proje, QA mühendisleri için sıfırdan mülakat seviyesine kadar götüren,  
self-contained bir öğrenme platformudur. React + Vite ile yazılmıştır.

**5 ana route:**
- `/jmeter` — JMeter yük testi
- `/python` — Python (W3Schools genişliğinde) + pytest/Selenium/Playwright
- `/sql` — SQL (W3Schools genişliğinde) + sql.js etkileşimli editör
- `/typescript` — TypeScript (W3Schools genişliğinde) + Playwright TS
- `/test-frameworks` — pytest · Selenium · Playwright karşılaştırma (PythonPage'den bağlantılı)

**Hedef kullanıcı:** Core Java bilen, Python/TS öğrenmek isteyen QA mühendisi.  
Anlatımlarda HER ZAMAN Java analogisi kullan. ("Java'da X şöyle yapılır, Python'da ise...")

---

## 2. Teknik Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | React 18 (JSX) |
| Build | Vite 5 |
| Routing | react-router-dom v6 |
| Styling | Tailwind CSS + custom CSS |
| Etkileşimli Python | Pyodide (CDN) |
| Etkileşimli SQL | sql.js (WebAssembly) |
| Etkileşimli TS | TypeScript → Babel transpile → eval |
| Syntax highlight | Prism.js (CDN) |
| Font | Inter (UI), JetBrains Mono (kod) — Google Fonts CDN |
| State yönetimi | React useState/useContext, localStorage |

---

## 3. Proje Klasör Yapısı

```
automationexercise/
├── CLAUDE.md                        ← (bu dosya) her oturumda oku
├── index.html                       ← HTML entry (Google Fonts + Prism.js CDN burada)
├── .claude/
│   ├── CONTENT_RULES.md             ← içerik yazım kuralları
│   ├── UI_STANDARDS.md              ← görsel/animasyon standartları
│   ├── TECH_SPEC.md                 ← teknik gereksinimler (editör, toggle, localStorage)
│   ├── QA_FRAMEWORK_SPEC.md         ← pytest/Selenium/Playwright derinlik kuralları
│   ├── COMPONENT_LIBRARY.md         ← tekrar kullanılan bileşenler (HTML/CSS/JS)
│   ├── INTERVIEW_TEMPLATE.md        ← mülakat soruları şablonu
│   └── JAVA_COMPARISON.md           ← Java ↔ Python/TS karşılaştırma kuralları
├── src/
│   ├── App.jsx                      ← Route tanımları (5 route)
│   ├── main.jsx                     ← React entry point (MSW mock + HashRouter)
│   ├── index.css                    ← Tailwind base + global styles
│   ├── dark-overrides.css           ← Dark mode CSS overrides
│   ├── context/
│   │   └── LanguageContext.jsx      ← TR/ENG global state (localStorage key: 'language', default: 'tr')
│   ├── locales/
│   │   ├── en.json                  ← İngilizce çeviriler (t() fonksiyonu için)
│   │   └── tr.json                  ← Türkçe çeviriler
│   ├── components/
│   │   ├── HomePage.jsx             ← Ana sayfa (automation playground)
│   │   ├── TopicHeader.jsx          ← Topic sayfaları ortak header (geri butonu + dil toggle)
│   │   ├── TopicPage.jsx            ← Tüm topic sayfalarını render eden wrapper
│   │   ├── JMeterPage.jsx           ← /jmeter route
│   │   ├── PythonPage.jsx           ← /python route
│   │   ├── SQLPage.jsx              ← /sql route
│   │   ├── TypeScriptPage.jsx       ← /typescript route
│   │   ├── TestFrameworksPage.jsx   ← /test-frameworks route (pytest·Selenium·Playwright)
│   │   ├── FrameworkComparison.jsx  ← Cypress/Selenium/Playwright karşılaştırma tablosu
│   │   ├── PlaywrightLangCompare.jsx← Playwright JS/TS/Python 3 dil karşılaştırma
│   │   ├── BasicElements.jsx        ← Ana sayfa: temel form elementleri (Selenium practice)
│   │   ├── ComplexInteractions.jsx  ← Ana sayfa: drag-drop, modal, iframe
│   │   ├── AdvancedScenarios.jsx    ← Ana sayfa: Shadow DOM, dynamic content, file upload
│   │   ├── DataTable.jsx            ← Ana sayfa: sort/search/paginate tablo
│   │   ├── APISimulation.jsx        ← Ana sayfa: API mock (MSW) + SwaggerDocs wrapper
│   │   ├── SwaggerDocs.jsx          ← APISimulation içinde kullanılan Swagger UI benzeri panel
│   │   ├── LocatorGuide.jsx         ← Ana sayfa: Selenium vs Playwright locator rehberi
│   │   └── Practice.jsx             ← Ana sayfa: Uygulama Bahçesi
│   ├── data/
│   │   ├── pythonData.js            ← Python içerik (9 tab, TR+EN)
│   │   ├── typescriptData.js        ← TS içerik (9 tab, TR+EN)
│   │   ├── sqlData.js               ← SQL içerik (TR+EN)
│   │   └── jmeterData.js            ← JMeter içerik (TR+EN)
│   ├── mocks/
│   │   ├── browser.js               ← MSW browser worker kurulumu
│   │   └── handlers.js              ← API mock handler'ları (Books CRUD)
│   └── utils/
│       └── api-spec.js              ← Swagger/API endpoint tanımları
└── dist/                            ← Build çıktısı (git'e ekleme)
```

---

## 4. Mimari Karar Notları

- **Data-driven yaklaşım:** İçerik `*Data.js` dosyalarında obje dizisi olarak tutulur.  
  Component bu veriyi render eder. Yeni konu eklemek = data dosyasına yeni obje eklemek.
- **Block sistemi:** Her konu `blocks` dizisi içerir. Block tipleri:  
  `text | code | heading | grid | table | quiz | editor | diagram | comparison | glossary | error-dict | interview-questions`
- **Dil sistemi:** `LanguageContext` global state tutar (`tr` | `en`).  
  Her block'un `tr` ve `en` varyantı olabilir. Kod bloğu asla değişmez.
- **Etkileşimli editör:** `editor` tipli block'lar Pyodide/sql.js/Babel kullanır.  
  Her editör kendi sandbox'ında çalışır, global state'i kirletmez.

---

## 5. İçerik Genişlik Kuralı (ZORUNLU)

Python, TypeScript **ve SQL** sayfaları W3Schools'daki TÜM konuları kapsamalıdır.  
Eksik konu bırakılamaz. Detaylar: `.claude/CONTENT_RULES.md`

---

## 6. Diğer MD Dosyaları — Okuma Sırası

Aşağıdaki dosyaları bu sırayla oku. Göreve göre ilgili dosyaya odaklan:

| # | Dosya | Ne Zaman Kritik |
|---|-------|-----------------|
| 1 | `.claude/CONTENT_RULES.md` | İçerik yazarken, W3Schools kapsam kontrolü yaparken |
| 2 | `.claude/UI_STANDARDS.md` | UI bileşeni eklerken, renk/font/animasyon kararı verirken |
| 3 | `.claude/TECH_SPEC.md` | Editör, toggle, localStorage, performans konularında |
| 4 | `.claude/QA_FRAMEWORK_SPEC.md` | pytest/Selenium/Playwright bölümü yazarken |
| 5 | `.claude/COMPONENT_LIBRARY.md` | Tekrar kullanılacak bileşen eklerken |
| 6 | `.claude/INTERVIEW_TEMPLATE.md` | Mülakat sorusu bölümü yazarken |
| 7 | `.claude/JAVA_COMPARISON.md` | Python/TS anlatırken Java karşılaştırması yaparken |

---

## 7. Bu Projeye Yeni Başlarken Yap

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Dev server başlat
npm run dev
# → http://localhost:5173

# 3. Build (production)
npm run build
```

---

## 8. Kodlama Kuralları

- Yeni bileşen eklerken mevcut `*Page.jsx` yapısını taklit et.
- İçerik değişikliği = `src/data/*Data.js` dosyasını düzenle, component'e dokunma.
- Renk paleti (WCAG AAA token): light bg `#F8F5EE`, dark bg `#1A1816`, accent `#7c3aed`, success `#10b981`, warning `#f59e0b`, error `#ef4444`. Tam token sistemi `src/index.css`'de.
- Her sayfada zorunlular: TR/ENG toggle (sağ üst), **dikey sidebar nav (sol — sekmeleri alt alta)**, home butonu (sağ alt fixed — HER ZAMAN görünür, 🏠 ikonu, sayfanın başına döner), scroll progress bar (en üst).
- **Sekme navigasyonu (ZORUNLU):** Sekme içeren tüm sayfalarda sekmeler yatay (üst) değil, **dikey sidebar** (sol taraf, alt alta) olarak konumlanmalıdır. `TopicPage` bileşenindeki sidebar layout referans alınır: `flex-shrink-0 w-10 md:w-52 sticky top-3 rounded-xl`. Mobilde emoji-only, desktop'ta tam etiket gösterilir.
- Kod bloğu = Prism.js highlight + copy butonu + satır yorumları zorunlu.
- `simple-box` block: `title` field YOK, sadece `emoji` + `content` (bilingual). Günlük hayat benzetmesiyle basitçe açıkla, teknik terim kullanma.

---

## 9. Kullanıcı Profili

- Core Java biliyor (Collections dahil)
- Python ve TypeScript öğreniyor
- QA mühendisi perspektifinden öğreniyor
- Her anlatımda Java analoji ZORUNLU: "Java'da nasıl?" → "Burada nasıl?"
- Dil: Türkçe açıklama + İngilizce teknik terimler (çevrilmez)

---

## 10. Sık Yapılan Hatalar — Yapma

- ❌ `*Data.js` dışında içerik hardcode etme
- ❌ Dış görsel dosyası kullan (SVG inline olmalı)
- ❌ Teknik terimi Türkçeye çevirme ("fixture" → "fikstür" değil, "fixture" kalır)
- ❌ Editör olmadan kod bloğu bırakma (her kodun denenebilir editörü olmalı)
- ❌ Java karşılaştırması yapmadan Python/TS konusu anlatma
- ❌ W3Schools'daki bir konuyu atlama (Python/TS/SQL için)
- ❌ Sayfayı ayrı HTML dosyasına çıkarma (React component kalmalı)
- ❌ Sekmeleri yatay (üst nav bar) yapma — her zaman dikey sidebar kullan

---

## 11. Mobile Responsive Kuralları (ZORUNLU)

Tüm bileşenler iOS, Android (telefon + tablet) dahil her platformda web ile aynı kalitede görüntülenmelidir.

### Temel Kurallar

- **Responsive padding/margin:** `px-3 py-2 md:px-6 md:py-4` örüntüsünü takip et. Mobilde büyük padding kullanma.
- **Responsive font:** Başlıklar için `text-xl md:text-4xl`, alt başlıklar `text-sm md:text-xl`.
- **Nav scroll:** Çok sayıda button içeren navlar mobilde `overflow-x-auto scrollbar-hide` ile yatay kaydırılabilir olmalı, `flex-wrap` ile alt satıra taşmamalı.
- **Touch target:** Her buton ve link min `36px` yüksekliğinde olmalı (WCAG 2.5.5).
- **iOS input:** `input`, `select`, `textarea` — `font-size: 16px` zorunlu (iOS zoom bug önlenir).
- **Horizontal overflow:** `html, body { overflow-x: hidden }` global kural — yatay kaydırma olmamalı.
- **Dark mode button:** Mobilde (`< md`) ikon-only göster, label `hidden md:inline`.
- **Kod blokları:** `overflow-x-auto` ile horizontal scroll, `max-width: 100%`.
- **Grid:** `grid-cols-N` kullanırken mobil breakpoint ekle: `grid-cols-1 md:grid-cols-2`.
- **Touch action:** `touch-action: manipulation` — butonlarda 300ms gecikme engeli.

### `index.css`'de Mevcut Mobile Altyapı

- `.scrollbar-hide` — scrollbar gizleme utility class'ı
- `@media (max-width: 768px)` — input font-size, min touch target, pre max-width
- `touch-action: manipulation` — tüm button/link'lere global
- `overflow-x: hidden` — html/body'de tanımlı

---

## 12. Teknoloji Sayfaları İçerik Derinlik Kuralı (ZORUNLU)

Her teknoloji sayfası (Docker, Jenkins, Kubernetes, Kafka, JMeter, Postman, REST Assured vb.) şu bölümleri **MUTLAKA** içermelidir:

### Zorunlu Sekmeler

| Sekme | İçerik |
|-------|--------|
| ⚙️ Kurulum / Installation | Windows + Mac + Linux için adım adım terminal komutları. Verification steps dahil. |
| 🛠️ Gerçek Hayat / Real World | Birebir hands-on senaryo: "Bu komutu çalıştır → bu çıktıyı gör → şimdi bu adımı yap" |
| 🔗 Ekosistem / Ecosystem | İlgili teknolojilerle ilişkisi, birlikte nasıl çalışırlar, hangi problemi birlikte çözerler |
| 🚨 Yaygın Hatalar | Gerçek hata mesajları, nedenleri ve çözümleri (`error-dictionary` block tipi kullanılır) |
| 💼 Mülakat Soruları | Basic / Intermediate / Advanced seviyelerinde — her soruya detaylı cevap |

### Kurulum Bölümü Kuralları

- Üç işletim sistemi için ayrı komutlar: Windows (winget/chocolatey/PowerShell), Mac (Homebrew), Linux (apt/yum/binary)
- Her adımda beklenen çıktı gösterilmeli ("Output you should see:")
- Verification step zorunlu: kurulumun başarılı olduğunu doğrulayan komut

### Gerçek Hayat Bölümü Kuralları

- End-to-end senaryo: "Gerçek bir e-ticaret / Spring Boot projesi" gibi somut context
- Her adımda tam terminal komutu + açıklaması
- Orta seviye bir QA mühendisinin bizzat takip edebileceği ayrıntı

### Ekosistem Bölümü Kuralları

- İlişki tablosu veya akış diyagramı zorunlu
- En az 3 teknoloji ilişkisi ele alınmalı
- Örnek: Docker ↔ Kubernetes ↔ Jenkins ↔ Kafka

### Mülakat Soruları Kuralları

- Minimum: 3 Basic + 3 Intermediate + 3 Advanced soru
- Her soruya 3-5 cümle detaylı cevap
- Cevaplarda Java karşılaştırması kullan (CLAUDE.md Kural 9)
