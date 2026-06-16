# NEXT SESSION — Devam Noktası (TEK Güncel Durum Dosyası)

> Bu dosyayı `CLAUDE.md`'den hemen sonra, her oturum başında oku.
> Kullanıcıdan tekrar açıklama isteme. Bu dosya hem **içerik/feature**
> hem **SEO/routing/deploy** durumunu tek yerde takip eder — `codexSeo.md`
> artık sadece SEO'nun kalıcı kural/mimari referansıdır, durum günlüğü
> değildir. Git commit hash gibi anlık bilgiler SADECE burada yazılır,
> `CLAUDE.md`/`AGENTS.md`/`codexSeo.md`'ye yazılmaz (bkz. `CLAUDE.md` Bölüm 0).

---

## 🎯 AKTİF FELSEFE

**"Gör, Anla, Dene ve Test Et."** — Her konu için:
1. **Animasyonlu simülasyon** (önce gör)
2. **DOM / state görselleştirme** (arka planda ne oluyor)
3. **Otomasyon kodu** (nasıl test ederim)

---

## 🌐 CANLI DEPLOYMENT BİLGİLERİ (2026-06-16)

| Alan | Değer |
|------|-------|
| **Canlı URL** | https://learnqa.dev |
| **Hosting** | Netlify (ücretsiz tier, private repo destekler) |
| **Netlify subdomain** | https://sprightly-cactus-c9482b.netlify.app |
| **Domain registrar** | Porkbun — yenileme $12.87/yıl (2027-06-16) |
| **GitHub repo** | https://github.com/hasankocaman/automationexercise (public) |
| **Eski URL** | https://hasankocaman.github.io/automationexercise/ → learnqa.dev'e yönlendirir |

### Deploy Akışı
- `git push origin main` → Netlify otomatik build + deploy eder (~18 saniye)
- GitHub Pages: sadece `learnqa.dev`'e yönlendiren tek HTML sayfası yayınlar
- `DEPLOY.md` dosyasında tüm kurulum adımları belgelenmiştir

### Kritik Yapılandırma
- `vite.config.js` → `base: '/'` (Netlify için, GitHub Pages'den değiştirildi)
- `netlify.toml` → build config + SPA redirect kuralı
- `.github/workflows/deploy.yml` → artık sadece redirect HTML deploy eder (build yok)

---

## ⚠️ GÜNCEL DURUM — GIT, SEO, STRAY DOSYALAR (2026-06-17 itibarıyla doğrulandı)

**Bu bölüm önemli — her oturum başında oku, üstüne yaz/güncelle.**

### Git durumu
- **Son local commit:** `755f81a fix: Java interview question accordion crashing on open`. **Push edildi** (`86d6a6b..755f81a`, kullanıcı talimatıyla) — local ve origin/main artık senkron.
- Push edilen commit zinciri: `e6d1dd9` (SEO redirect/guard) → `129b8e3` (Postman/Docker/Jenkins içerik + duplicate heading fix) → `c33a0e2` (NEXT_SESSION.md reconcile) → `f3c98b2` (CLAUDE.md/AGENTS.md/codexSeo.md/NEXT_SESSION.md anayasa birleştirme) → `755f81a` (Java mülakat sorusu açılmama bug fix — kök neden: `q.code` javaData.js'te bilingual `{tr,en}` obje, `CodeBlock`'a string yerine obje gidip render'da çöküyordu; Codex tarafından TopicPage.jsx'te düzeltildi, ben devraldım/doğruladım/commit+push ettim).
- Netlify otomatik build tetiklendi (~18sn) — bir sonraki oturumda `https://learnqa.dev` üzerinde Java sayfası mülakat sekmesi ve yeni SEO redirect'leri (`/test-frameworks.html`, `/comparison.html`) canlıda tekrar doğrulanmalı.

### SEO/routing altyapısı — gerçek ve commit'li
`BrowserRouter` (`src/main.jsx`), `src/utils/seo.js`, `src/components/SeoMeta.jsx`, `scripts/generate-static-routes.mjs`, `scripts/check-seo.mjs`, `scripts/check-dist-seo.mjs`, `scripts/generate-seo-files.mjs` — hepsi committed ve artık push'lu. `App.jsx`'te 20 route + 20 `React.lazy()` import var. Mimari detayları `codexSeo.md`'de (kalıcı referans olarak).

**SEO canlı doğrulama durumu — bir sonraki oturumda tekrar kontrol edilmeli (push yeni yapıldı):**
- `https://learnqa.dev/robots.txt` ve `/sitemap.xml` 200 dönüyor mu?
- `https://learnqa.dev/test-frameworks.html` → `/test-frameworks` 301 ile yönleniyor mu? (`e6d1dd9`'da eklendi, ilk kez bu push ile canlıya çıkıyor)
- `https://learnqa.dev/comparison.html` → `/test-frameworks` 301 ile yönleniyor mu? (aynı şekilde ilk kez canlıya çıkıyor)
- **Henüz yapılmamış (hesap yetkisi gerektirir):** Google Search Console domain property + DNS verification + sitemap submission + URL Inspection. Checklist: `codexSeo.md` → "Google Search Console — Tekrar Kullanılabilir Checklist".

### Hâlâ gerçekten stray/uncommitted olanlar
Bunlara dokunulmadı, kullanıcı kararı bekleniyor: paralel bir TSX rewrite (`src/App.tsx`, `src/main.tsx` [.tsx, .jsx'ten ayrı], `src/sections/`, `src/components/Header.tsx`, `Navigation.tsx`, `CodeBlock.tsx`, `FeatureCard.tsx`, `src/hooks/`, `src/i18n/`, `src/styles/`, `tsconfig*.json` — mevcut JSX mimarisiyle çakışıyor, kullanılmıyor), ~25 adet tek-seferlik `.mjs` içerik script'i, ve kök dizindeki `documents/JavaNotesForProfessionals.md` (doğrulandı: `public/documents/JavaNotesForProfessionals.md` ile byte-byte aynı, tamamen gereksiz duplikasyon — silinebilir).

---

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 4. kısım — Java mülakat fix + push)

| Görev | Durum |
|-------|-------|
| Kullanıcı "Java mülakat soruları açılmıyordu, Codex düzeltti" dedi. Kontrol edildi: Codex, `src/components/TopicPage.jsx`'te `InterviewQuestionsBlock`/`QAItem`'ı gerçek zamanlı (uncommitted) düzenlemişti. Kök neden doğrulandı: `javaData.js`'teki mülakat sorularında `code:` alanı bilingual `{tr, en}` obje, eski kod bunu `tx()` ile çözmeden direkt `CodeBlock`'a veriyordu → kod örneği olan bir soru açılınca render çöküyordu. | ✅ |
| Fix: `code={tx(q.code, language)}`. Ayrıca `javaData.js`'te zaten var olan ama hiç render edilmeyen `analogy`/`keyPoints`/`tip` alanları da `QAItem`'a bağlandı (Java analoji kutusu, key points listesi, mülakat notu). | ✅ |
| `npm run build` + Playwright ile `/java` → Mülakat sekmesi → "Maven" sorusu açıldı, kod bloğu + cevap doğru render oluyor, console hatası yok. | ✅ |
| Commit edildi (`755f81a`) ve kullanıcı talimatıyla **push edildi** (`86d6a6b..755f81a`, 5 commit: SEO redirect/guard, içerik gap'leri, NEXT_SESSION reconcile, anayasa birleştirme, bu fix). Netlify otomatik deploy tetiklendi. | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 3. kısım — anayasa birleştirme)

Kullanıcı, CLAUDE.md/AGENTS.md/codexSeo.md/NEXT_SESSION.md arasında sürekli çelişki ve kafa karışıklığı olduğunu belirtti, dört dosyayı tek bir tutarlı sisteme oturtmamı istedi. Yapılanlar:

| Görev | Durum |
|-------|-------|
| **`CLAUDE.md` tam "anayasa" olarak yeniden yazıldı**: 20 route, tam Türkçe diyakritik (eski ASCII Codex versiyonu yerine), Bölüm 0'da net "Dosya Haritası" (hangi konuda hangi dosyaya bakılacağı), **mülakat soruları için KESİN KURAL** (min 50 soru: 15 Basic + 20 Intermediate + 15 Advanced — Bölüm 10), "ilk block her zaman simple-box, teknik terimsiz" kuralı geri getirildi, "Sık Yapılan Hatalar" kısa listesi geri getirildi. Kalıcı kural dosyalarına commit hash/anlık durum yazılmaması kuralı eklendi (Bölüm 0 + 11). | ✅ |
| **`AGENTS.md` ince pointer'a dönüştürüldü**: Artık içerik taşımıyor, sadece "kurallar için CLAUDE.md'ye bak" diyor. Çift bakım riski ortadan kalktı. | ✅ |
| **`codexSeo.md` durum günlüğünden kalıcı referansa dönüştürüldü**: Tarihli "Son Durum 2026-06-17" / "Güncel Çalışma Notu 2026-06-16" gibi durum-günlüğü bölümleri çıkarıldı (içerikleri bu dosyaya taşındı — yukarıdaki "GÜNCEL DURUM" bölümü). Geriye SEO mimarisinin nasıl çalıştığı (13 maddelik kalıcı referans), GSC checklist'i, uzun kuyruk SEO stratejisi, marka/ranking stratejisi kaldı — hepsi zamana bağlı olmayan, tekrar kullanılabilir kurallar. | ✅ |
| **`NEXT_SESSION.md` (bu dosya) tek "güncel durum" dosyası haline getirildi**: codexSeo.md'den çıkarılan SEO canlı doğrulama durumu + push bekleyen iş listesi buraya taşındı ("GÜNCEL DURUM" bölümü). Kendi kendini geçersiz kılan "son commit: X" tekrarları tek bir yere indirildi. | ✅ |
| Dört dosya arası çapraz referanslar kontrol edildi: CLAUDE.md ↔ AGENTS.md ↔ codexSeo.md ↔ NEXT_SESSION.md, sarkan/yanlış pointer yok. | ✅ |

> Commit edildi (`f3c98b2`) ve push edildi. Detay için yukarıdaki "GÜNCEL DURUM" bölümüne bak.

## ✅ Bu Oturumda Tamamlananlar (2026-06-17, 2. kısım — bug fix)

| Görev | Durum |
|-------|-------|
| **Bug fix: Mülakat Soruları / Hata Sözlüğü başlık tekrarı** — Kullanıcı Docker sayfasında "Docker Mülakat Soruları" (sayfa H2) ile "Docker — Mülakat Soruları" (block içi H4) aynı anda göründüğünü bildirdi (screenshot). Kök neden: `InterviewQuestionsBlock` ve `ErrorDictionaryBlock` her zaman kendi iç başlığını render ediyordu, section title zaten aynı şeyi söylese bile. | ✅ |
| **Çözüm**: `TopicPage.jsx`'teki `renderBlock()` fonksiyonuna `sectionTitle` parametresi eklendi (çağrı noktası: `sections[activeTab]?.blocks?.map(...)`). `interview-questions` block'u artık section title `mülakat`/`interview` içeriyorsa kendi başlığını gizliyor; `error-dictionary` block'u section title `sözlüğü`/`dictionary` içeriyorsa kendi başlığını gizliyor. Appium'daki konu-içi gömülü mini mülakat recap'leri (section title farklıysa) etkilenmedi — hâlâ kendi başlığını gösteriyor (istenen davranış). | ✅ |
| Etkilenen sayfalar doğrulandı: Docker, Jenkins, Postman (Mülakat S&C sekmeleri — artık tekrar yok), Appium (50 Soruluk mega-tab'da 3x tekrar düzeldi, konu-içi recap'ler bozulmadı), Playwright (Hata Sözlüğü sekmesi — artık tekrar yok), Postman Yaygın Hatalar (literal tekrar olmadığı için block başlığı doğru şekilde kaldı) | ✅ |
| `npm run build` + Playwright ile canlı tarayıcıda tüm senaryolar doğrulandı — console/page hatası yok | ✅ |

> Bu mekanizma artık otomatik — yeni dedicated "💼 Interview Q&A" veya "🚨 Error Dictionary" tab eklerken block içi başlığı manuel gizlemeye gerek yok.

## ✅ Bu Oturumda Tamamlananlar (2026-06-17)

| Görev | Durum |
|-------|-------|
| **Postman sayfası — CLAUDE.md Section 12 eksiklikleri tamamlandı**: 🛠️ Real World, 🔗 Ecosystem, 🚨 Common Errors sekmeleri eklendi (EN+TR, postmanData.js'in fully-separate en/tr mimarisine uygun). Real World: mikroservis sipariş akışı senaryosu (Auth→Catalog→Cart→Orders, collection variable chaining), Postman vs curl vs REST Assured karşılaştırma tablosu, hands-on mini proje (jsonplaceholder.typicode.com 2-istek zinciri). Ecosystem: Newman/Git/CI-CD/Mock Server ilişki tablosu + boxes akış diyagramı. Common Errors: error-dictionary block, 8 yeni hata senaryosu (401, timeout, JSON parse, undefined variable, pre-request ReferenceError, Newman 429, body not received, CORS) — mevcut Test Automation sekmesindeki 4 hatadan farklı. | ✅ |
| **Docker sayfası — Ecosystem sekmesi eklendi** (EN+TR): Jenkins/Docker/Registry/Kubernetes/Monitoring boxes diyagramı, 4 ilişki tablosu (CI, K8s, Registry, Selenium Grid) | ✅ |
| **Jenkins sayfası — Real World + Ecosystem sekmeleri eklendi** (EN+TR): Real World: Spring Boot+React monorepo PR pipeline senaryosu (parallel test, Selenium E2E stage, SonarQube gate), Jenkins vs GitHub Actions vs GitLab CI tablosu, hands-on Jenkinsfile mini proje. Ecosystem: Git/Docker/SonarQube/Slack ilişki tablosu + boxes diyagramı | ✅ |
| `npm run build` ile her üç dosya (postmanData.js, dockerData.js, jenkinsData.js) syntax doğrulandı, Playwright ile canlı tarayıcıda her yeni sekme TR+EN modda tıklanıp screenshot alındı — console/page hatası yok | ✅ |

> Bu oturumda repoda NEXT_SESSION.md'de bahsedilmeyen, başka bir oturum/araçtan (muhtemelen Codex — tracked codexSeo.md dosyası mevcut) kalan committed olmamış dosyalar bulundu: paralel bir TSX rewrite (src/App.tsx, src/main.tsx, src/sections/, yeni Header.tsx/Navigation.tsx — mevcut JSX mimarisiyle çakışıyor) ve ~25 adet tek-seferlik .mjs içerik scripti + documents/ klasörü. Kullanıcı talimatıyla bu dosyalara dokunulmadı, görmezden gelinip NEXT_SESSION.md önceliklerine devam edildi. Bir sonraki oturumda bu dosyaların hâlâ orada olup olmadığı kontrol edilmeli ve kullanıcıya tekrar sorulmalı.

## ✅ Bu Oturumda Tamamlananlar (2026-06-16, 3. kısım)

| Görev | Commit | Durum |
|-------|--------|-------|
| JMeter sayfasına **🛠️ Real World** ve **🔗 Ecosystem** sekmeleri eklendi (EN+TR, tam ayrı yazılmış içerik — jmeterData.js'in fully-separate en/tr mimarisine uygun) | — | ✅ |
| Real World sekmesi: e-ticaret flash-sale senaryosu (500 user, DB pool exhaustion → HikariCP fix), JMeter vs k6 vs Locust karşılaştırma tablosu, 6 adımlı akış diyagramı, hands-on mini proje (jsonplaceholder.typicode.com) | — | ✅ |
| Ecosystem sekmesi: Jenkins/GH Actions, Docker, Grafana+InfluxDB, Kubernetes ilişki tablosu + boxes akış diyagramı | — | ✅ |
| Yeni `simulation` scenario eklendi: `jmeter-load-test` (Real World sekmesi) — `renderJmeterLoadTestPlayground` (terminal: launching→rampup→firing→aggregating→done, 10-dot ramp-up göstergesi) + DOM visualizer (Aggregate Report tablosu: Samples/Avg/Min/Max/90-95-99%/Error%/Throughput, HTML rapor önizleme + bar chart, Java/Gatling analoji) | — | ✅ |
| Playwright ile doğrulandı: Real World tab, simülasyon öncesi/sonrası (terminal animasyonu + Aggregate Report dolduruluyor), Ecosystem tab — console/page hatası yok (sadece zararsız React inline-style uyarısı) | — | ✅ |

## ✅ Bu Oturumda Tamamlananlar (2026-06-16, 2. kısım)

| Görev | Commit | Durum |
|-------|--------|-------|
| Appium sayfasına simülasyon eklendi: `appium-element-detection` (Locator & POM sekmesi) — Appium Inspector arayüzü, element ağacı tarama, locator önerisi | — | ✅ |
| Appium sayfasına simülasyon eklendi: `appium-swipe` (Gerçek Senaryo sekmesi) — mobil ekran, W3C Actions API ile swipe gesture | — | ✅ |
| Playwright ile görsel doğrulama yapıldı (her iki simülasyon screenshot'ta doğru render oluyor, console hatası yok) | — | ✅ |
| BrowserStack sayfasına simülasyon eklendi: `browserstack-cloud-run` (Selenium Entegrasyonu sekmesi) — local terminal → BrowserStack Hub → Automate Dashboard akışı | — | ✅ |
| Playwright ile BrowserStack simülasyonu doğrulandı (terminal log animasyonu + dashboard session kartı doğru render oluyor, console hatası yok) | — | ✅ |
| AWS sayfasına simülasyon eklendi: `aws-codepipeline` (Gerçek Hayat sekmesi) — git push → CodeBuild aşamaları → CloudWatch log → S3 bucket akışı | — | ✅ |
| Azure sayfasına simülasyon eklendi: `azure-devops-pipeline` (Gerçek Hayat sekmesi) — git push → Azure Pipelines task'ları → Pipeline Artifacts akışı | — | ✅ |
| Playwright ile AWS + Azure simülasyonları doğrulandı (her iki simülasyon screenshot'ta doğru render oluyor, console hatası yok) | — | ✅ |
| `PythonFrameworksTab.jsx`'e `PytestRunnerSim` eklendi (pytest sekmesi, "🎬 Canlı pytest Runner") — `▶ pytest -v` butonu 5 test_login.py testini sırayla çalıştırır, 1 tanesi kasıtlı AssertionError ile FAILED olur, sağ panelde Passed/Failed sayaç + traceback + pytest-html raporu gösterilir | `c78ceb5` | ✅ |
| Playwright ile pytest runner simülasyonu doğrulandı (4 passed/1 failed doğru render oluyor, console hatası yok) | — | ✅ |
| `typescriptData.js`'e yeni 10. tab/section eklendi: "🏃 Test Runners" (Vitest & Unit Testing) — Vitest açıklaması, formatPrice.ts/test.ts kod örneği, `vitest-runner` simülasyonu, JUnit vs Vitest java-compare bloğu | `04c2416` | ✅ |
| `TopicPage.jsx`'e `vitest-runner` scenario eklendi: `renderVitestRunnerPlayground` (3 testi sırayla PASSED yapan terminal UI) + DOM visualizer (Passed/Dosya/Süre sayaçları, coverage/index.html paneli, Java Surefire karşılaştırması) | `04c2416` | ✅ |
| Playwright ile vitest runner simülasyonu doğrulandı (3/3 passed doğru render oluyor, console hatası yok) | — | ✅ |

---

## ✅ Bu Oturumda Tamamlananlar (2026-06-16)

| Görev | Commit | Durum |
|-------|--------|-------|
| Crash bug fix: `VisualBlock` + `DataStructureDiagram` missing `language` prop | — | ✅ |
| Crash bug fix: `ComparisonBlock` missing `useLanguage()` hook | — | ✅ |
| `LanguageContext` default dil 'tr' olarak sabitlendi (browser detection kaldırıldı) | — | ✅ |
| Python sayfası boş sekme sorunu çözüldü (ComparisonBlock ReferenceError) | — | ✅ |
| `PythonFrameworksTab.jsx` oluşturuldu (pytest + Robot Framework, 950+ satır) | — | ✅ |
| `TestFrameworksPage.jsx` güncellendi — "🐍 Python Frameworks" sekmesi eklendi | — | ✅ |
| EN modunda "Java Biliyorsan" Türkçe kalıyordu → `JavaBox` + `JavaCompareBlock` düzeltildi | — | ✅ |
| `src/utils/searchIndex.js` git'e eklendi (CI build crash root cause) | `c41507e` | ✅ |
| `netlify.toml` + `vite.config.js` base path Netlify için düzenlendi | `99c283c` | ✅ |
| `DEPLOY.md` oluşturuldu — tüm deploy adımları belgelendi | `6110035` | ✅ |
| GitHub Pages → redirect to learnqa.dev (workflow güncellendi) | `779ccc7` | ✅ |
| **learnqa.dev canlıya alındı** | — | ✅ |

---

## ✅ Önceki Oturumlarda Tamamlananlar (2026-06-16 ve öncesi)

| Özellik | Dosya | Durum |
|---------|-------|-------|
| `SimulationBlock` component + `animated-timeline` block tipi | `TopicPage.jsx` | ✅ |
| Selenium: implicit/explicit wait, drag-drop, alert-sim, multi-window, iframe, shadow-dom | `seleniumData.js` | ✅ |
| Playwright: pw-autowait (5 actionability check) | `playwrightData.js` | ✅ |
| Docker, Postman, K8s, Jenkins, Kafka, REST Assured simülasyonları | data dosyaları | ✅ |
| **6 playground gerçek araç arayüzüne dönüştürüldü** (Postman, Blue Ocean, Confluent, Docker Desktop, kubectl, IntelliJ) | `TopicPage.jsx` | ✅ |
| JavaDocPage ENG modunda 181 bölüm başlığı İngilizce | `javaData.js` | ✅ |

---

## 📋 Sıradaki Görevler (Öncelik Sırasıyla)

> 2026-06-16 tarihinde tüm proje üzerinde bir eksik-konu denetimi yapıldı (`grep` ile her `*Data.js` dosyasında `simulation` block sayısı + tab listeleri karşılaştırıldı). Sonuçlar aşağıda, öncelik sırasına göre.

1. ~~**JMeter sayfası — CLAUDE.md Section 12 eksiklikleri**~~ ✅ **TAMAMLANDI (2026-06-16, 3. kısım)** — Real World + Ecosystem sekmeleri ve `jmeter-load-test` simülasyonu eklendi.
   - Hata sözlüğü (`error-dictionary`) hâlâ ayrı bir "🚨 Yaygın Hatalar" sekmesi değil, mevcut sekmelerin içine gömülü — düşük öncelikli kalan eksik.
2. ~~**Docker / Jenkins / Postman — kısmi Section 12 eksikliği**~~ ✅ **TAMAMLANDI (2026-06-17)** — Postman: Real World+Ecosystem+Common Errors; Docker: Ecosystem; Jenkins: Real World+Ecosystem.
   - REST Assured: Ecosystem yerine "🆆 Araç Karşılaştırması" var — kabul edilebilir, düşük öncelik (dokunulmadı).
3. **Python / SQL / Java sayfalarında hiç `simulation` (Gör-Anla-Dene) block'u yok** — Selenium(8), Appium(4), AWS/Azure(2), diğerleri(1) ile karşılaştırıldığında bu 3 sayfa platformun "aktif felsefesi"nin dışında kalıyor. (Not: Python'da `PythonFrameworksTab.jsx` içinde elle yazılmış bir pytest runner var ama bu `pythonData.js`'in kendi `simulation` sistemini kullanmıyor, ayrı bir component.) **← Bir sonraki oturumun önceliği bu.**
4. **Bundle boyutu optimizasyonu** — 3.4MB chunk uyarısı var (özellikle javaData.js 639KB), code splitting yapılabilir (zorunlu değil)

> Not: "Python/TypeScript sayfalarına simülasyon — pytest/vitest runner arayüzü" görevi tamamlandı (her iki yarı da bitti).

---

## Teknik Notlar

### Mevcut Block Tipleri (Güncel)
```
text | code | heading | grid | table | quiz | editor | diagram | comparison |
glossary | error-dict | interview-questions | simple-box | visual | callout |
locator-visual | selenium-visual | playwright-visual | simulation | animated-timeline
```

### Önemli Dosyalar
- `src/components/TopicPage.jsx` — `SimulationBlock` ~1870. satır, `renderBlock` switch içinde `case 'simulation':` var
- `src/components/PythonFrameworksTab.jsx` — pytest + Robot Framework detaylı içerik (yeni dosya)
- `src/utils/searchIndex.js` — global arama indeksi, tüm *Data.js dosyalarını import eder
- `netlify.toml` — Netlify build config + SPA redirect
- `DEPLOY.md` — tam deploy dokümantasyonu

### `SimulationBlock` Mimarisi
```
SimulationBlock({ block, darkMode, language })
  ├── simState: string (idle | phase1 | phase2 | ...)
  ├── isRunning: boolean
  ├── timersRef: ref (temizleme için)
  ├── runSteps([[state, delay], ...]) — animasyon sekansı
  ├── resetSim() — tüm timer'ları temizle
  ├── renderXxxPlayground() — sol panel (interaktif)
  ├── renderDomVisualizer() — sağ panel (DOM/state gösterimi)
  └── Layout: header | description | grid(playground | visualizer) | code block
```

### Mevcut Scenario ID'leri (Tüm Liste)

| Scenario ID | Açıklama | Dosya |
|-------------|----------|-------|
| `implicit-wait` | Without/With wait karşılaştırması | seleniumData.js s4 |
| `explicit-wait` | Spinner → DOM → element bulundu | seleniumData.js s4 |
| `drag-drop` | dragstart→drag→dragenter→drop event zinciri | seleniumData.js s3 |
| `alert-sim` | Alert/Confirm/Prompt interaktif | seleniumData.js s5 |
| `multi-window` | Tab opening + switchTo() adım adım | seleniumData.js s5 |
| `iframe-detection` | Sayfa taraması → iframe vurgulama → switchTo | seleniumData.js s5 |
| `shadow-dom` | Adım adım host/root/target keşfi | seleniumData.js s5 |
| `shadow-dom-xray` | findElement() hata → X-Ray → pierce | seleniumData.js s5 |
| `pw-autowait` | 5 actionability check → click() | playwrightData.js Wait sekmesi |
| `docker-lifecycle` | pull → run → exec → stop container | dockerData.js |
| `api-request` | Postman Send → server → response → pm.test() | postmanData.js |
| `k8s-pod` | kubectl → API Server → etcd → Scheduler → Pod | kubernetesData.js |
| `jenkins-pipeline` | Checkout → Build → Test → SonarQube → Deploy | jenkinsData.js |
| `kafka-flow` | Producer → partition routing → broker → consumer | kafkaData.js |
| `rest-assured-chain` | given() → when() → then() → assertions | restAssuredData.js |
| `appium-element-detection` | Appium Inspector tarama → element ağacı → locator önerisi | appiumData.js s3 (Locator & POM) |
| `appium-swipe` | W3C Actions pointerDown→move→pointerUp → liste kayar | appiumData.js s4 (Gerçek Senaryo) |
| `browserstack-cloud-run` | Local pytest terminal → Hub bağlantısı → Automate Dashboard session kartı | browserstackData.js s2 (Selenium Entegrasyonu) |
| `aws-codepipeline` | git push → Source/Install/Test/Upload aşamaları → CloudWatch log → S3 bucket | awsData.js (Gerçek Hayat) |
| `azure-devops-pipeline` | git push → Trigger/Install/Test/Publish aşamaları → task listesi → Pipeline Artifacts | azureData.js (Gerçek Hayat) |
| `vitest-runner` | npx vitest run → 3 test sırayla PASSED → coverage raporu paneli | typescriptData.js s9 (Test Runners) |
| `jmeter-load-test` | jmeter -n -t → launching→rampup→firing→aggregating→done terminal + Aggregate Report tablosu | jmeterData.js (Gerçek Hayat) |

### Build Durumu
- ✅ `npm run build` başarılı (SEO check + static route shell üretimi dahil, bkz. `codexSeo.md`)
- ✅ Netlify'da canlı: https://learnqa.dev
- ⚠️ `javaData` chunk hâlâ ~639KB tek başına büyük (route-based code splitting sayesinde ana bundle ~235KB'a indi, kritik değil)
- Güncel commit/push durumu için bu dosyanın en üstündeki **"GÜNCEL DURUM"** bölümüne bak (tek kaynak — burada tekrar edilmiyor).

---

## Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifi
- Her anlatımda Java analogisi zorunlu
- Türkçe açıklama + İngilizce teknik terimler
- **Görsel + animasyon öncelikli** — metin secondary
- Token kısıtı varsa adım adım, onay alarak devam et
