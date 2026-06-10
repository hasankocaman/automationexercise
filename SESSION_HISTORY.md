# Oturum Geçmişi & Yapılan İşler

> Oluşturulma: 2026-06-09 | Son Güncelleme: 2026-06-10  
> Proje: `d:\ANTIGRAVITY\automationexercise` — React 18 + Vite 5 + Tailwind + HashRouter

---

## Kullanıcı Profili

| Alan | Değer |
|------|-------|
| Dil | Türkçe açıklama + İngilizce teknik terim |
| Java deneyimi | Core Java + Collections (ArrayList, HashMap, HashSet) |
| Öğreniyor | Python, TypeScript — **Java karşılaştırmalı anlatım zorunlu** |
| Hedef | QA Mühendisi — test otomasyonu |
| TR/EN varsayılan | **TR** (`localStorage key: 'language'`, default: `'tr'`) |

---

## Proje Özeti — Mevcut Durum (2026-06-10)

```
Route            Bileşen               W3Schools Kapsam        TR/EN    Durum
/                HomePage              N/A                     ✅       ✅
/python          PythonPage            40 konu (38+2 QA)       ✅       ✅
/typescript      TypeScriptPage        16 konu (TAM)           ✅       ✅ *
/sql             SQLPage               Tam                     ✅       ✅
/jmeter          JMeterPage            Tam                     ✅       ✅
/test-frameworks TestFrameworksPage    N/A                     ✅       ✅
```

> `*` TypeScript Advanced section'da TR heading çevirilerinde index kayması var (minor, critical değil)

---

## Teknik Stack & Mimari

| Katman | Teknoloji / Not |
|--------|-----------------|
| Framework | React 18 + Vite 5 |
| Routing | react-router-dom v6 + HashRouter (GitHub Pages uyumlu) |
| Styling | Tailwind CSS + CSS Custom Properties (WCAG AAA token sistemi) |
| Syntax Highlighting | Prism.js (CDN, defer) — `index.html`'de tanımlı |
| Fontlar | Inter + Plus Jakarta Sans (UI) + JetBrains Mono (kod) |
| İnteraktif Python | Pyodide (CDN, lazy load) |
| İnteraktif SQL | sql.js (WebAssembly) |
| İnteraktif TS/JS | Babel Standalone (CDN) |
| API Mock | MSW (Mock Service Worker) — Books CRUD |
| State | React useState + localStorage |
| Dil sistemi | `LanguageContext.jsx` — `useLanguage()` hook → `language` / `t()` / `toggleLanguage()` |

---

## Dosya Yapısı (Güncel)

```
automationexercise/
├── CLAUDE.md                       ← Her oturumda oku (proje kuralları)
├── SESSION_HISTORY.md              ← Bu dosya
├── index.html                      ← Google Fonts CDN + Prism.js CDN
├── tailwind.config.js              ← WCAG AAA canvas/ink/accent renk sistemi
├── .claude/
│   ├── CONTENT_RULES.md
│   ├── UI_STANDARDS.md
│   ├── TECH_SPEC.md
│   ├── QA_FRAMEWORK_SPEC.md
│   ├── COMPONENT_LIBRARY.md
│   ├── INTERVIEW_TEMPLATE.md
│   └── JAVA_COMPARISON.md
├── src/
│   ├── App.jsx                     ← 6 Route tanımı
│   ├── main.jsx                    ← HashRouter + MSW mock kurulumu
│   ├── index.css                   ← WCAG AAA token sistemi (600+ satır)
│   ├── dark-overrides.css          ← Dark mode CSS token override'ları
│   ├── context/
│   │   └── LanguageContext.jsx     ← TR/EN global state (default: 'tr')
│   ├── locales/
│   │   ├── en.json                 ← İngilizce çeviriler
│   │   └── tr.json                 ← Türkçe çeviriler
│   ├── components/
│   │   ├── TopicPage.jsx           ← Evrensel renderer (1303 satır, 30+ block tipi)
│   │   ├── TopicHeader.jsx         ← Ortak header (geri + dil toggle + dark mode)
│   │   ├── HomePage.jsx            ← Ana sayfa (Selenium/Playwright practice)
│   │   ├── PythonPage.jsx          ← /python route + TestFrameworksBanner
│   │   ├── TypeScriptPage.jsx      ← /typescript route
│   │   ├── SQLPage.jsx             ← /sql route
│   │   ├── JMeterPage.jsx          ← /jmeter route
│   │   ├── TestFrameworksPage.jsx  ← /test-frameworks route (2 sekme)
│   │   ├── FrameworkComparison.jsx ← Cypress/Selenium/Playwright tablosu (TR/EN ✅)
│   │   ├── PlaywrightLangCompare.jsx ← Python/JS/Java/TS karşılaştırma
│   │   ├── BasicElements.jsx       ← Form elementleri practice
│   │   ├── ComplexInteractions.jsx ← Drag-drop, modal, iframe
│   │   ├── AdvancedScenarios.jsx   ← Shadow DOM, dynamic content
│   │   ├── DataTable.jsx           ← Sort/search/paginate tablo
│   │   ├── APISimulation.jsx       ← MSW mock API
│   │   ├── SwaggerDocs.jsx         ← Swagger UI benzeri panel
│   │   ├── LocatorGuide.jsx        ← Selenium vs Playwright locator rehberi
│   │   └── Practice.jsx            ← Uygulama Bahçesi
│   ├── data/
│   │   ├── pythonData.js           ← 4591 satır: 40 konu (38 W3S + 2 QA)
│   │   ├── typescriptData.js       ← 3785 satır: 16 W3S konu + QA ek
│   │   ├── sqlData.js              ← 2106 satır
│   │   └── jmeterData.js           ← 1304 satır
│   ├── mocks/
│   │   ├── browser.js              ← MSW worker kurulumu
│   │   └── handlers.js             ← Books CRUD mock handler'ları
│   └── utils/
│       └── api-spec.js             ← Swagger endpoint tanımları
```

---

## TopicPage.jsx — Desteklenen Block Tipleri (30+)

| Kategori | Block Tipleri |
|----------|--------------|
| Metin | `text`, `heading`, `subheading` |
| Kod | `code` (Prism.js highlight + copy), `editor` (Pyodide/Babel/sql.js) |
| Bilgi kutuları | `tip`, `info`, `warning`, `callout` |
| Yapı | `divider`, `list`, `steps`, `grid`, `table` |
| Öğrenme | `simple-box`, `comparison`, `java-compare`, `quiz`, `quiz-fill`, `exercise` |
| Görsel | `visual` → `join/table/flow/boxes/pyramid/data-structure`, `diagram-svg` |
| Özel | `qa`, `installation`, `file-tree`, `glossary-term`, `glossary-section`, `interview-questions`, `error-dictionary` |

**Data yapısı:** `sections` dizisi → her section: `{ title, blocks[] }`. Blocks bilingual: `{ tr: '...', en: '...' }` veya `applyTr()` helper ile.

---

## WCAG AAA Tasarım Sistemi (CSS Token'lar)

`src/index.css` + `src/dark-overrides.css` + `tailwind.config.js` ile bütünleşik renk sistemi.

### Light Mode Tokenlar
| Token | Değer | Kontras |
|-------|-------|---------|
| `--bg-base` | `#F8F5EE` | Sıcak kağıt zemini |
| `--text-primary` | `#1C1917` | 15.8:1 AAA ✅ |
| `--text-secondary` | `#524E49` | 7.4:1 AAA ✅ |
| `--accent-primary` | `#3B2FC6` | 8.1:1 AAA ✅ |

### Dark Mode Tokenlar
| Token | Değer | Kontras |
|-------|-------|---------|
| `--bg-base` | `#1A1816` | Sıcak kömür (halation yok) |
| `--text-primary` | `#F0EDE4` | 15.2:1 AAA ✅ |
| `--text-secondary` | `#B5B0A7` | 8.3:1 AAA ✅ |
| `--accent-text` | `#A5B4FC` | 8.8:1 AAA ✅ |

### Tailwind CSS Sınıfları
```
bg-canvas-{base/surface/subtle/overlay/inset}
text-ink / text-ink-secondary / text-ink-muted / text-ink-link
bg-accent / bg-success / bg-warn / bg-danger (semantic)
```

### Hover Scale Sistemi
```css
--hover-scale: 1.04;           /* Kartlar, bağlantılar */
--hover-scale-sm: 1.02;        /* Küçük elementler */
--hover-scale-lg: 1.07;        /* Büyük CTA'lar */
--hover-duration: 0.3s ease-in-out;
.hover-card → div/section kartları için utility class
```

---

## İçerik Kapsamı — Python (pythonData.js)

**Toplam: 40 konu | 4591 satır**

### W3Schools Konuları (38 adet)
| # | Konu | # | Konu |
|---|------|---|------|
| 1 | Syntax | 20 | Inheritance |
| 2 | Comments | 21 | Scope |
| 3 | Variables | 22 | Modules |
| 4 | Data Types | 23 | Try...Except |
| 5 | Numbers | 24 | JSON |
| 6 | Casting | 25 | RegEx |
| 7 | Strings | 26 | Comprehensions |
| 8 | Booleans | 27 | Iterators |
| 9 | Operators | 28 | Decorators |
| 10 | Lists | 29 | Context Managers |
| 11 | Tuples | 30 | Type Hints |
| 12 | Sets | 31 | **Polymorphism** |
| 13 | Dictionaries | 32 | **Arrays** (array modülü) |
| 14 | If...Else | 33 | **Dates** (datetime) |
| 15 | While Loops | 34 | **Math** (math modülü) |
| 16 | For Loops | 35 | **PIP** |
| 17 | Functions | 36 | **User Input** |
| 18 | Lambda | 37 | **String Formatting** |
| 19 | Classes/Objects | 38 | **File Handling** |

### QA Ek Konular (2 adet)
- **Dataclasses** — `@dataclass`, `field()`, `frozen=True`, test verisi modelleme
- **argparse** — CLI argümanları, test scriptleri için

### Sekme Yapısı (9 sekme)
`Intro | Installation | Foundations | Intermediate | Advanced | QA Use Cases | Interview | Practice | Java→Python`

---

## İçerik Kapsamı — TypeScript (typescriptData.js)

**Toplam: 16 W3S konu + QA ek | 3785 satır**

### W3Schools Konuları (16 adet — TAM)
| # | Konu | # | Konu |
|---|------|---|------|
| 1 | Simple Types | 9 | Functions |
| 2 | Special Types | 10 | Casting |
| 3 | Arrays | 11 | Classes |
| 4 | Tuples | 12 | Basic Generics |
| 5 | Object Types | 13 | Utility Types |
| 6 | Enums | 14 | Keyof |
| 7 | Aliases & Interfaces | 15 | Null Safety |
| 8 | Union Types | 16 | **Definitely Typed** ← *son eklendi* |

### QA Ek Konular
Type Guards, Discriminated Unions, Conditional Types, Mapped Types, Template Literal Types, Decorators, tsconfig.json, Playwright TS, async/await, Error handling

### TR Çeviri Notu
TypeScript data'sı `applyTr()` helper kullanır. Advanced section'daki (sections[4]) TR heading index'leri yanlış hizalanmış — heading'ler TR'de İngilizce görünüyor. `simple-box`, `text`, `quiz` blokları `{ tr, en }` bilingual objects içerdiğinden TR'de doğru çalışıyor.

---

## İçerik Kapsamı — SQL & JMeter

**SQL (sqlData.js — 2106 satır):** SELECT, WHERE, ORDER BY, JOIN türleri, GROUP BY, subquery, CRUD, indexes. sql.js (WebAssembly) ile tarayıcıda çalışan interaktif SQL editörü.

**JMeter (jmeterData.js — 1304 satır):** Test planı, Thread Group, Samplers, Listeners, Assertions, parameterization, CI/CD entegrasyonu.

---

## Test Frameworks Sayfası (/test-frameworks)

**TestFrameworksPage.jsx** — 2 sekme:
1. **Framework Karşılaştırma** (`FrameworkComparison.jsx`) — Cypress vs Selenium vs Playwright: 9 bölüm, komut tabloları, performans matrisi, örnek login testi
2. **Playwright Dil Karşılaştırma** (`PlaywrightLangCompare.jsx`) — Python / JavaScript / Java / TypeScript yan yana

PythonPage'de `TestFrameworksBanner` ile deep-link (gradient card, → icon hover animasyonu).

---

## Commit Geçmişi (Son 6)

| Hash | Tarih | Değişiklik |
|------|-------|-----------|
| `041a8be` | 2026-06-10 | WCAG AAA color system + typography tokens |
| `abc8afc` | 2026-06-10 | Smooth hover scale sistemi (CSS custom props) |
| `855689a` | 2026-06-10 | TestFrameworksPage + PlaywrightLangCompare + .claude/ MD dosyaları |
| `ba8de8a` | önceki | W3Schools-style kapsamlı içerik (SQL/Python/TypeScript) |
| `7ea6a8e` | önceki | JMeter/SQL/TypeScript/Python tam sayfa |
| `a3da937` | önceki | 5 route eklendi |

---

## Commit Edilmemiş Değişiklikler (Unstaged)

| Dosya | Değişiklik | Neden |
|-------|-----------|-------|
| `src/data/pythonData.js` | +755 satır | Topics 31-38 + Dataclasses + argparse |
| `src/data/typescriptData.js` | +110 satır | Topic 16 (Definitely Typed) |
| `src/components/FrameworkComparison.jsx` | TR/EN desteği | `useLanguage` + bilingual text |
| `src/dark-overrides.css` | +315 satır | WCAG AAA token refactor |
| `dist/index.html` | Build çıktısı | `npm run build` sonrası |
| `SESSION_HISTORY.md` | Bu güncelleme | — |

---

## Bilinen Sorunlar

| # | Sorun | Dosya | Önem |
|---|-------|-------|------|
| 1 | TypeScript Advanced TR heading'leri İngilizce kalıyor | `typescriptData.js` `applyTr(sections[4])` | 🟡 Düşük |
| 2 | Google Fonts `index.html` → sadece Inter yüklüyor (Plus Jakarta Sans eksik) | `index.html` | 🟡 Düşük |
| 3 | Chunk boyutu 1 MB+ (Vite uyarısı) | Build config | 🟢 Bilgi |
| 4 | CSS `@import` sırası uyarısı (`src/index.css`) | `index.css` | 🟢 Bilgi |
| 5 | 40+ `.png` screenshot dosyası root'da, `dist/` commit edilmemiş | — | 🟢 Cleanup |

---

## Sıradaki Önerilen Adımlar

### 🔴 Yüksek Öncelik
1. **Tüm değişiklikleri commit et** — pythonData, typescriptData, FrameworkComparison, dark-overrides hepsi unstaged
2. **index.html'e Plus Jakarta Sans ekle** — `src/index.css`'de var ama HTML link tag'ında yok

### 🟡 Orta Öncelik
3. **TypeScript Advanced TR headings düzelt** — `applyTr(sections[4])` block index'lerini yeniden hesapla
4. **Definitely Typed heading'e TR çevirisi ekle** — `text: "Definitely Typed & @types Packages"` string'dir, obje olmalı

### 🟢 Düşük Öncelik
5. **Root'taki .png dosyalarını temizle** — 40+ screenshot dosyası `verify_*.png` vb.
6. **Code splitting** — Vite `manualChunks` ile 1MB chunk'ı böl
7. **Prism.js CSS override** — `src/index.css`'e `pre[class*="language-"] { background: #1e2030 !important; }` ekle

---

*Son güncelleme: 2026-06-10 — Claude Sonnet 4.6 tarafından güncellendi*
