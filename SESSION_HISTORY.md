# Oturum Geçmişi & Yapılan İşler

> Oluşturulma: 2026-06-09 | Son Güncelleme: 2026-06-10 (4. oturum)
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

## Proje Özeti — Mevcut Durum (2026-06-10, 3. Oturum)

```
Route            Bileşen               W3Schools Kapsam        TR/EN    Durum
/                HomePage              N/A                     ✅       ✅
/python          PythonPage            40 konu (38+2 QA)       ✅       ✅
/typescript      TypeScriptPage        16 konu (TAM)           ✅       ✅
/sql             SQLPage               Tam + 11 editör         ✅       ✅ ← düzeltildi
/jmeter          JMeterPage            Tam                     ✅       ✅
/test-frameworks TestFrameworksPage    N/A                     ✅       ✅
```

---

## Teknik Stack & Mimari

| Katman | Teknoloji / Not |
|--------|-----------------|
| Framework | React 18 + Vite 5 |
| Routing | react-router-dom v6 + HashRouter (GitHub Pages uyumlu) |
| Styling | Tailwind CSS + CSS Custom Properties (WCAG AAA token sistemi) |
| Syntax Highlighting | Prism.js (CDN, defer) — `index.html`'de tanımlı |
| Fontlar | Inter + Plus Jakarta Sans (UI) + JetBrains Mono (kod) — `index.html` `<link>` ile |
| İnteraktif Python | Pyodide (CDN, lazy load) |
| İnteraktif SQL | sql.js v1.10.2 (WebAssembly, CDN, singleton pattern) |
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
├── index.html                      ← Google Fonts CDN (Inter + Plus Jakarta Sans + JetBrains Mono) + Prism.js CDN
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
│   ├── index.css                   ← WCAG AAA token sistemi (fontlar @import yok — HTML'den)
│   ├── dark-overrides.css          ← Dark mode CSS token override'ları
│   ├── context/
│   │   └── LanguageContext.jsx     ← TR/EN global state (default: 'tr')
│   ├── locales/
│   │   ├── en.json                 ← İngilizce çeviriler
│   │   └── tr.json                 ← Türkçe çeviriler
│   ├── components/
│   │   ├── TopicPage.jsx           ← Evrensel renderer (30+ block tipi + SQLEditor bileşeni)
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
│   │   ├── pythonData.js           ← 40 konu (38 W3S + 2 QA) | simple-box title temizlendi
│   │   ├── typescriptData.js       ← 16 W3S konu + QA ek | simple-box title temizlendi
│   │   ├── sqlData.js              ← 8 sekme | 11 SQL editör | TR indeksleri düzeltildi
│   │   └── jmeterData.js           ← JMeter içerik (TR+EN)
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

**Heading blok property farkı (ÖNEMLİ — typescriptData.js):**
- `sections[0–3]` ve `sections[5–8]`: headings `content` property kullanır → override'da `content` yaz
- `sections[4]` (Advanced): headings `text` property kullanır → override'da `text` yaz
- TopicPage.jsx render: `tx(block.text || block.content, language)` — önce `text`, sonra `content`

---

## WCAG AAA Tasarım Sistemi

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
| `--bg-base` | `#1A1816` | Sıcak kömür |
| `--text-primary` | `#F0EDE4` | 15.2:1 AAA ✅ |
| `--text-secondary` | `#B5B0A7` | 8.3:1 AAA ✅ |
| `--accent-text` | `#A5B4FC` | 8.8:1 AAA ✅ |

---

## SQL Editör Altyapısı (sqlData.js)

### SQLEditor Bileşeni (TopicPage.jsx içinde)
- sql.js v1.10.2 CDN: `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js`
- Singleton pattern: `window._sqlJsInstance` / `window._sqlJsLoading`
- SQLite dialect: `INTEGER PRIMARY KEY` (AUTO_INCREMENT yok), `TEXT` (VARCHAR değil)
- `renderBlock` → `case 'editor'` → `block.lang === 'sql'` → `<SQLEditor>`
- Her editör: `{ type: 'editor', lang: 'sql', schema: '...CREATE+INSERT...', defaultCode: '...' }`

### 11 SQL Editörünün Konumları
| # | Bağlam | Sekme |
|---|--------|-------|
| 1 | SELECT / WHERE / ORDER BY | 🟢 Foundations |
| 2 | Interactive Example: test_results | 🟢 Foundations |
| 3 | Aggregate Functions | 🟡 Intermediate |
| 4 | GROUP BY and HAVING | 🟡 Intermediate |
| 5 | JOINs — Combining Tables | 🟡 Intermediate |
| 6 | Subqueries | 🟡 Intermediate |
| 7 | LIKE, BETWEEN, IN | 🟡 Intermediate |
| 8 | Bug Tracking DB — Interactive Example | 🟡 Intermediate |
| 9 | Window Functions | 🔴 Advanced |
| 10 | CTEs | 🔴 Advanced |
| 11 | Views | 🔴 Advanced |

---

## İçerik Kapsamı — TypeScript (typescriptData.js)

**Toplam: 16 W3S konu + QA ek**

### W3Schools Konuları (16 adet — TAM)
| # | Konu | Başlık (EN) | applyTr index |
|---|------|-------------|---------------|
| 1-11 | Foundations + Intermediate | sections[2], sections[3] | her section kendi applyTr'ında |
| 12 | Basic Generics | sections[4] index 0 | `text: "Temel Generic'ler"` |
| 13 | Utility Types | sections[4] index 7 | `text: "Utility Type'lar"` |
| 14 | Keyof | sections[4] index 12 | `text: "Keyof"` (değişmez) |
| 15 | Null Safety | sections[4] index 17 | `text: "Null Güvenliği"` |
| 16 | Definitely Typed | sections[4] index 22 | `text: "Definitely Typed & @types Paketleri"` |
| QA+ | Conditional & Mapped Types | sections[4] index 30 | `text: "Koşullu & Eşlenmiş Type'lar"` |

### sections[4] Blok Haritası (heading'leri bulmak için)
```
 0 — heading "Basic Generics"         (W3S #12)
 1 — simple-box
 2 — text (bilingual)
 3 — code
 4 — editor
 5 — comparison (bilingual)
 6 — quiz (bilingual)
 7 — heading "Utility Types"          (W3S #13)
 8 — simple-box
 9 — code
10 — editor
11 — quiz (bilingual)
12 — heading "Keyof"                  (W3S #14)
13 — simple-box
14 — code
15 — editor
16 — quiz (bilingual)
17 — heading "Null Safety"            (W3S #15)
18 — simple-box
19 — code
20 — editor
21 — quiz (bilingual)
22 — heading "Definitely Typed"       (W3S #16)
23 — simple-box
24 — text (bilingual)
25 — code
26 — code
27 — editor
28 — java-compare
29 — quiz (bilingual)
30 — heading "Conditional & Mapped"   (QA+)
31 — simple-box
32 — code
33 — editor
34 — quiz (bilingual)
35 — interview-questions (bilingual)
```

---

## İçerik Kapsamı — Python (pythonData.js)

**Toplam: 40 konu | W3Schools Konuları (38 adet)**

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
| 12 | Sets | 31 | Polymorphism |
| 13 | Dictionaries | 32 | Arrays |
| 14 | If...Else | 33 | Dates |
| 15 | While Loops | 34 | Math |
| 16 | For Loops | 35 | PIP |
| 17 | Functions | 36 | User Input |
| 18 | Lambda | 37 | String Formatting |
| 19 | Classes/Objects | 38 | File Handling |

**QA Ek Konular (2):** Dataclasses, argparse

### Sekme Yapısı (9 sekme)
`Intro | Installation | Foundations | Intermediate | Advanced | QA Use Cases | Interview | Practice | Java→Python`

---

## sqlData.js — TR Override İndeks Haritası (KRİTİK)

`applyTr()` blokları **indeks numarasıyla** override eder. Editör bloğu eklemek tüm sonraki indeksleri kaydırır.

### sections[2] (Foundations) — 1 editör eklendi, indeks ≥ 6 için +1 kayma
```
Orijinal → Güncel   İçerik
0          0        heading CREATE TABLE
2          2        heading INSERT INTO
4          4        heading SELECT
[6]        [6]      ← YENİ editor (SELECT editörü) — TR override gereksiz
6 → 7               heading UPDATE and DELETE
8 → 9               warning
9 → 10              heading NULL Values
11 → 12             heading Interactive Example
[13]       [13]     ← YENİ editor (Interactive Example) — TR override gereksiz
13 → 14             heading SQL Execution Order
14 → 15             text
15 → 16             visual/flow
16 → 17             visual/table
17 → 18             heading NULL Mistake
18 → 19             text
19 → 20             comparison
20 → 21             quiz
21 → 22             heading Java DB
22 → 23             java-compare DB Connection
23 → 24             java-compare SELECT
24 → 25             heading Java DML
25 → 26             java-compare INSERT
26 → 27             java-compare UPDATE/DELETE
```

### sections[3] (Intermediate) — 5 editör eklendi, değişken kayma
```
Orijinal → Güncel   İçerik
0          0        heading Aggregate Functions
[2]        [2]      ← YENİ editor (Aggregate)
2 → 3               heading GROUP BY
3 → 4               text GROUP BY
[6]        [6]      ← YENİ editor (GROUP BY)
5 → 7               heading JOINs
6 → 8               text JOINs
[10]       [10]     ← YENİ editor (JOINs)
8 → 11              heading Subqueries
[13]       [13]     ← YENİ editor (Subqueries)
10 → 14             heading LIKE
[16]       [16]     ← YENİ editor (LIKE)
12 → 17             heading Bug Tracking DB
[18]       [18]     ← YENİ editor (Bug Tracking, replacement)
14 → 19             heading Visual JOIN Guide
15 → 20             text
16 → 21             visual INNER JOIN
17 → 22             visual LEFT JOIN
18 → 23             visual RIGHT JOIN
19 → 24             comparison
20 → 25             quiz
21 → 26             heading Java
22 → 27             java-compare PreparedStatement
23 → 28             java-compare Transaction
```

### sections[4] (Advanced) — 3 editör eklendi
```
Orijinal → Güncel   İçerik
0          0        heading Window Functions
1          1        text
[3]        [3]      ← YENİ editor (Window Functions)
3 → 4               heading CTEs
[6]        [6]      ← YENİ editor (CTEs)
5 → 7               heading Transactions
7 → 9               heading Indexes
9 → 11              heading Views
[13]       [13]     ← YENİ editor (Views)
11 → 14             heading SQL Injection
13 → 16             visual ACID
14 → 17             visual Transaction lifecycle
```

---

## Bu Oturumda Yapılanlar (3. Oturum — 2026-06-10)

### 1. SQL Editör Blokları Tamamlandı (`sqlData.js`)
Önceki oturumda yarım kalan SQL editör blokları tamamlandı. 11 editör bloğu artık tüm önemli SQL konularını kapsıyor.

**Bu oturumda eklenen editörler:**
| Konu | Değişiklik |
|------|------------|
| GROUP BY and HAVING | Yeni editör eklendi (test_results 8 satır, GROUP BY/HAVING örnekleri) |
| JOINs — Combining Tables | Yeni editör eklendi (testers+bugs+projects şeması, INNER/LEFT/multi JOIN) |
| Subqueries | Yeni editör eklendi (scalar subquery, IN subquery) |
| LIKE, BETWEEN, IN | Yeni editör eklendi |
| Bug Tracking DB — Interactive Example | MySQL `AUTO_INCREMENT`/`VARCHAR` statik kod bloğu → sql.js editörüyle değiştirildi |
| Window Functions | Yeni editör eklendi (ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY) |
| CTEs | Yeni editör eklendi (WITH ifadesi, birden fazla CTE) |
| Views | Yeni editör eklendi (CREATE VIEW, view'ı tablo gibi kullan) |

**Tüm şemalar SQLite uyumlu:** `INTEGER PRIMARY KEY` (AUTO_INCREMENT değil), `TEXT` (VARCHAR değil).

---

### 2. TR Override İndeks Hatası Düzeltildi (`sqlData.js`) ← KRİTİK FIX
**Sorun:** `applyTr()` fonksiyonu blokları sıra numarasıyla override eder. Editör blokları eklenince sonraki tüm blokların sıra numaraları kaydı ama `trSections` içindeki override indeksleri güncellenmemişti. Sonuç: TR seçildiğinde SQL sayfasının büyük bölümü İngilizce kalıyordu.

**Düzeltme:**
- `sections[2]` override'ları: indeks ≥ 6 için +1 güncellendi
- `sections[3]` override'ları: 5 editör eklendiğinden değişken kayma hesaplanıp güncellendi
- `sections[4]` override'ları: 3 editör eklendiğinden değişken kayma hesaplanıp güncellendi

**Sonuç:** TR seçildiğinde SQL sayfasının tüm metin/başlık/quiz/tablo blokları artık doğru Türkçe gösteriyor.

---

### 3. `simple-box` Title Alanı Temizlendi (`pythonData.js`, `typescriptData.js`)
**Sorun:** CLAUDE.md kuralı — `simple-box` bloklarında `title` field OLMAMALI. Eski bloklar `title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }` içeriyordu.

**Düzeltme:**
- `pythonData.js`: 40 `simple-box` bloğundan `title` alanı kaldırıldı
- `typescriptData.js`: 17 `simple-box` bloğundan `title` alanı kaldırıldı

Not: `TopicPage.jsx` bu alanı zaten render etmiyordu (sessizce görmezden geliyordu), ancak veri dosyaları CLAUDE.md kuralına aykırıydı.

---

### 4. Build Doğrulaması
`npm run build` → hatasız ✅ (7.23s, 4 dosya)
Tüm 4 veri dosyası Node.js `require()` ile syntax-clean doğrulandı ✅

---

## Bilinen Sorunlar

| # | Sorun | Dosya | Önem |
|---|-------|-------|------|
| 1 | Chunk boyutu 1 MB+ (Vite uyarısı) | Build config | 🟢 Bilgi |

---

## Sıradaki Önerilen Adımlar

### 🟡 Orta Öncelik
1. **Code splitting** — Vite `manualChunks` ile 1MB chunk'ı böl
2. **Prism.js CSS override** — `pre[class*="language-"]` background rengini token sistemiyle uyumlu hale getir
3. **Python QA hata sözlüğü genişletme** — Playwright Python hatalarını pythonData.js'e ekle (CONTENT_RULES kural 7 — mevcut Selenium+pytest var, Playwright Python eksik)

### 🟢 Düşük Öncelik
4. **Python QA bölümü genişletme** — pytest/Selenium/Playwright içerik derinleştirme
5. **JMeter editör blokları** — JMeter sayfasında hiç `editor` bloğu yok

---

## Bu Oturumda Yapılanlar (4. Oturum — 2026-06-10)

### 1. TypeScript `error-dictionary` Eklendi (`typescriptData.js`)
Playwright TypeScript için 6 yaygın hata senaryosu eklendi: TimeoutError (locator.click), strict mode violation (birden fazla element), page has been closed, net::ERR_CONNECTION_REFUSED, expect(locator).toBeVisible() timeout, TS2345 tip uyumsuzluğu. Her hata için: tam hata mesajı, neden/çözüm (tr+en), yanlış/doğru kod örneği.

### 2. SQL `error-dictionary` Eklendi (`sqlData.js`)
7 yaygın SQL/SQLite hatası eklendi: UNIQUE constraint failed, FOREIGN KEY constraint failed, NOT NULL constraint failed, syntax error near '...', no such table, ambiguous column name, wrong number of values. Glossary-section'dan hemen önce eklendi.

### 3. JMeter `error-dictionary` + Ek Quiz + Ek Interview-Questions Eklendi (`jmeterData.js`)
- **EN section:** 4 JMeter hatası (Connection refused, EXTRACTION_FAILED, OOM, ConnectTimeoutException) + 2 yeni quiz + `interview-questions` bloğu (JMeter Advanced, 3 soru)
- **TR section:** Paralel Türkçe hata sözlüğü + 2 yeni quiz (JSON Extractor, P99 persentil) + yeni `interview-questions` bloğu (JMeter Advanced)

### 4. Build Doğrulaması
`npm run build` → başarılı ✅ (13.13s, 4 dosya, bilinen chunk uyarısı devam ediyor)

---

## Commit Geçmişi (Son 7)

| Hash | Tarih | Değişiklik |
|------|-------|-----------|
| yeni | 2026-06-10 | error-dictionary: TypeScript (Playwright TS) + SQL + JMeter; JMeter quiz+interview-questions |
| `bbb1fcc` | 2026-06-10 | Python W3S topics 31-38 + TypeScript Definitely Typed + repo cleanup |
| `041a8be` | 2026-06-10 | WCAG AAA color system + typography tokens |
| `abc8afc` | 2026-06-10 | Smooth hover scale sistemi |
| `855689a` | 2026-06-10 | TestFrameworksPage + PlaywrightLangCompare + .claude/ MD dosyaları |
| `ba8de8a` | önceki | W3Schools-style kapsamlı içerik (SQL/Python/TypeScript) |
| `7ea6a8e` | önceki | JMeter/SQL/TypeScript/Python tam sayfa |
| `a3da937` | önceki | 5 route eklendi |

---

## Bu Oturumda Değiştirilen Dosyalar (3. Oturum)

| Dosya | Değişiklik |
|-------|-----------|
| `src/data/sqlData.js` | 8 yeni SQL editör bloğu eklendi; Bug Tracking DB statik kod → editöre çevrildi; `trSections` içindeki `applyTr` override indeksleri sections[2/3/4] için düzeltildi |
| `src/data/pythonData.js` | 40 `simple-box` bloğundan `title` alanı kaldırıldı |
| `src/data/typescriptData.js` | 17 `simple-box` bloğundan `title` alanı kaldırıldı |

---

*Son güncelleme: 2026-06-10 (3. oturum) — Claude Sonnet 4.6 tarafından güncellendi*
