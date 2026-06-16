# NEXT SESSION — Devam Noktası

> Bu dosyayı oturum başında oku, kullanıcıdan tekrar açıklama isteme.

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
2. **Docker / Jenkins / Postman — kısmi Section 12 eksikliği:**
   - Docker: ayrı bir **Ecosystem** sekmesi yok (Core Commands kısmen real-world'ü karşılıyor).
   - Jenkins: ayrı **Ecosystem** ve **Real World** sekmesi yok (QA Integration kısmen karşılıyor).
   - Postman: **Real World**, **Ecosystem**, **Common Errors** sekmelerinin hiçbiri yok.
   - REST Assured: Ecosystem yerine "🆆 Araç Karşılaştırması" var — kabul edilebilir, düşük öncelik.
3. **Python / SQL / Java sayfalarında hiç `simulation` (Gör-Anla-Dene) block'u yok** — Selenium(8), Appium(4), AWS/Azure(2), diğerleri(1) ile karşılaştırıldığında bu 3 sayfa platformun "aktif felsefesi"nin dışında kalıyor. (Not: Python'da `PythonFrameworksTab.jsx` içinde elle yazılmış bir pytest runner var ama bu `pythonData.js`'in kendi `simulation` sistemini kullanmıyor, ayrı bir component.)
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
- ✅ `npm run build` başarılı
- ✅ Netlify'da canlı: https://learnqa.dev
- ⚠️ Bundle 3.4MB (chunk uyarısı var, kritik değil)
- Son production commit: `779ccc7`

---

## Kullanıcı Profili Hatırlatması

- Core Java biliyor, QA mühendisi perspektifi
- Her anlatımda Java analogisi zorunlu
- Türkçe açıklama + İngilizce teknik terimler
- **Görsel + animasyon öncelikli** — metin secondary
- Token kısıtı varsa adım adım, onay alarak devam et
