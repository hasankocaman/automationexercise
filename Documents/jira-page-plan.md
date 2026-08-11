# `/jira` Sayfası — Plan + Görev Dağılımı (Opus / Sonnet)

> **Branch:** `feature/jira-page`
> **Durum:** ✅ TAMAMLANDI (2026-08-11) — Opus tarafı (iskelet + wiring + referans atom) ve Sonnet fazlarının tamamı (S1-S12) bitti. 13 sekme, 50 mülakat sorusu, 9 gerçek hata, min 1 video+1 animasyon+1 sandbox her sekmede. Build/i18n/içerik bütünlüğü/mülakat denetimi yeşil. Branch main'e merge edilmedi — karar kullanıcıda.
> **Hazırlayan:** Claude Code (Opus) oturumu, 2026-08-11 (iskelet); Claude Code (Sonnet) oturumu, 2026-08-11 (S1-S12).
> **Hedef sorgu:** "jira nedir", "jira bug raporu nasıl yazılır", "JQL sorguları",
> "jira test yönetimi", "jira for QA engineers" (+ İngilizce karşılıkları).

Bu dosya 6 bölümden oluşur:
- **§A** — Kod okumasıyla doğrulanmış tespitler ve alınan kararlar.
- **§B** — Opus'un kodladığı işler (bu commit).
- **§C** — Sonnet'in faz faz kodlayacağı işler.
- **§D** — Sonnet için hazır promptlar (kopyala-yapıştır).
- **§E** — Sayfa mimarisi referansı (sekme listesi, blok kalıpları, id sözlüğü).
- **§F** — Manuel test rehberi (sayfa bittikten sonra elle nasıl doğrulanır).

---

## §A. Değerlendirme — Kod Okuması ve Kararlar

### A.0. Depoda doğrulanan tespitler

| Kontrol | Sonuç |
|---|---|
| `src/data/jiraData.js` var mı? | **Yok** — temiz yeni sayfa, çakışma yok. |
| `App.jsx` / `seo.js` / `topicDataModules.mjs`'de `jira`? | **Yoktu** — Opus ekledi. |
| "Jira" kelimesi başka nerede geçiyor? | `playwrightData`, `jenkinsData`, `javaData`, `gaugeData`, `claudeAiData`, `browserstackData`, `manualTestingData`, `brunoData`, `llmAgentsData` içinde **tek cümlelik değinmeler** (örn. "@AfterScenario'da Jira REST API'ye POST at"). Hiçbiri ders anlatımı değil — çakışma yok, aksine bu sayfa o değinmelerin **hedefi** olur. |
| En yakın kardeş veri dosyası yapısı | **`gaugeData.js` / `qaFrontendData.js` → TEK AĞAÇLI** (`{ tr:{hero,tabs,sections}, en:{...} }`, `sections` iki dile AYNI referans, her metin `{tr,en}`). Bu sayfa da **tek ağaçlı** kurulur. |
| Manuel test/bug kavramı zaten nerede? | `/manual-testing` bug'ı **bulmayı** öğretir. Bu sayfa bulunan bug'ın **hayat döngüsünü** (raporla → önceliklendir → workflow → doğrula → kapat → ölç) öğretir. Kesişen yerde tekrar değil link. |
| Sprint/Kanban kavramı zaten nerede? | `/sprint` bir **simülatör** (Kanban panosu + bug görevleri), ders sayfası değil. Bu sayfanın Scrum/Kanban sekmesi kavramı öğretir ve `/sprint`'e "şimdi uygula" linki verir. |

### A.1. Alınan kararlar (kod okuması sonrası)

1. **`fillMissingCodeTrios` bu sayfada KULLANILMAZ.** Filler yalnızca `type:'code'`
   olan ve dili bash/shell/text OLMAYAN bloklara üretim yapar; üstelik profil
   tablosu (`resolveProfile`) sayfa anahtarına göre çalışır ve bilinmeyen bir
   anahtarda jenerik `'code'` profiline düşer. Jira sekmelerinin çoğu kod değil
   **süreç/araç** anlatımıdır — jenerik filler burada konuyla ilgisiz sandbox
   üretirdi. **Her animasyon ve sandbox ELLE yazılır.** (`fillMissingFeynman`
   kullanılır, o güvenli.)
2. **Sekme başlıkları DONDURULMUŞTUR.** `npm run seo:section-slugs` çalıştırıldı;
   13 sekmenin slug'ı `src/data/generated/sectionSlugs.js`'e yazıldı. Sonnet
   **sekme başlıklarını değiştiremez, sıralarını bozamaz, araya sekme ekleyemez** —
   slug'lar başlıktan türetilir, değişirse yayınlanmış URL'ler sessizce başka
   içeriğe düşer. Blok EKLEMEK serbesttir, sekme listesine dokunmak değil.
3. **Sandbox tipi seçimi:** Jira'nın çalıştırılabilir bir runtime'ı yok. Sandbox
   ihtiyacı `code-playground` bloğunun **metin karşılaştırması** moduyla karşılanır
   (`starterCode`/`solutionCode`/`hint`/`successMessage`) — bu blok gerçek runtime
   olmadan da çalışır ve XP verir. Üç doğal kullanım: (a) **JQL sorgusu yaz**,
   (b) **kötü bug raporunu iyi bug raporuna dönüştür**, (c) **REST API çağrısı /
   otomasyon kodu yaz**. Yeni bileşen YAZILMAZ.
4. **`relatedTopicId` zorunlu** her `code-playground` / `interview-questions` /
   `error-dictionary` bloğunda — yoksa içerik bütünlüğü denetimi build'i kırar.
   Bu sayfada `relatedTopicId` değerleri §E.3'teki id sözlüğünden seçilir.
5. **i18n sıfır-tolerans:** `jiraData.js` sızıntı taramasında baseline 0'dır
   (`STRICT_ZERO_FILES`). EN alanlarında Türkçe-özgü karakter (`çöüğşıİĞŞÇÖÜ`)
   olursa build kırılır. Sayfa tamamlanınca dosya `TRIO_COMPLETE_PAGES`'e de
   eklenir — o an her sekmede ≥1 video + ≥1 animasyon + ≥1 sandbox aranır.
6. **Ekran görüntüsü YOK.** Jira anlatımının klasik yolu ekran görüntüsüdür; bu
   projede dışa bağımlı görsel dosyası yasaktır. Jira arayüzü **inline SVG/CSS ile
   şematik olarak** ya da `grid`/`table`/`step-animation`/`video-scene` blokları
   üzerinden anlatılır. Bu bir kısıt değil avantaj: Jira arayüzü yılda birkaç kez
   değişir, şematik anlatım eskimez.
7. **Sürüm tuzağı:** Jira Cloud ile Jira Data Center/Server arayüz ve özellik
   olarak ayrışır (örn. "Company-managed" vs "Team-managed" proje). Anlatım
   **Jira Cloud** temellidir; farklılık önemli olduğunda ayrı bir `callout`/
   `simple-box` ile belirtilir, sessizce geçilmez.
8. **Tek örnek uygulama:** Sayfa boyunca aynı ürün kullanılır — **"ShopQA"
   e-ticaret uygulamasının ödeme akışı**. Bug örnekleri, JQL sorguları, board
   örnekleri ve API çağrıları hep bu domaine ait olur (`SHOP-142` gibi tutarlı
   issue key'ler). Örnek terk edilmez, sekmeden sekmeye taşınır.

### A.2. Kullanılacak blok tipleri (hepsi hazır, sadece `jiraData.js`'e veri)

`simple-box` · `heading` · `text` · `callout` · `grid` (cols 2/3) · `table` ·
`code` · `code-playground` · `quiz` · `challenge` (`variant:'order-sort'`) ·
`step-animation` · `simulation` · `animated-timeline` · `video-scene` ·
`python-flow-diagram` (workflow/entegrasyon akış diyagramı) ·
`feynman-checkpoint` · `error-dictionary` · `interview-questions` · `faq`.

---

## §B. OPUS — Bu Commit'te Kodlananlar

**Amaç:** Sayfayı build-yeşil ve gerçekten gezilebilir hâle getirmek; Sonnet'in
kopyalayacağı **her benzersiz kalıbın referans örneğini** koymak.

1. **Wiring (tam):**
   - `src/App.jsx` — `React.lazy` import + `<Route path="/jira">` + `SECTION_PAGE_ELEMENTS` girişi.
   - `src/utils/seo.js` — `ROUTE_SEO` girişi (EN + zorunlu `tr` bloğu).
   - `scripts/lib/topicDataModules.mjs` — `DATA_MODULES` girişi (statik shell + sekme URL'leri).
   - `scripts/generate-mastery-manifest.mjs` — `ROUTE_MAP` girişi (ustalık yüzdesi).
   - `scripts/check-i18n-leaks.mjs` — `STRICT_ZERO_FILES`'a `jiraData.js`.
   - `src/components/JiraPage.jsx` — `TopicPage` sarmalayıcı + issue akış banner'ı.
   - `src/components/HomePage.jsx` — sayfa etiketi, üst nav linki, footer linki.
   - `src/lib/progressStore.js` (`SKILL_CATEGORIES` → `foundations`),
     `src/lib/mentorAdvice.js`, `src/components/LearningAnalytics.jsx`,
     `src/data/portfolioData.js` — route etiketi.
   - `src/data/generated/sectionSlugs.js` — 13 sekmenin slug'ı üretildi (dondu).
   - Testler: `tests/topic-pages-ui.spec.ts`, `tests/i18n-content-toggle.spec.ts`,
     `tests/video-scene.spec.ts` (film render testi), `tests/no-internal-jargon.spec.ts`.
   - `CLAUDE.md` Bölüm 2 route haritası.
2. **`src/data/jiraData.js` (tek ağaçlı):**
   - `hero` (tr/en) + `tabs = sections.map(...)` + `export` + `fillMissingFeynman`.
   - **13 sekme (GRUP A-M)** section olarak var; **her biri 4 katmanlı açılış
     `simple-box`'ı** ile dolu → sayfa boş değil, kalite barı belli.
   - **GRUP A tam referans atom:** `simple-box` → `heading` → `text` →
     `video-scene` film ("Bir Bug'ın Jira'daki Yolculuğu", 7 sahne) →
     `step-animation` → `grid` → `code-playground` (JQL) → `quiz` →
     `challenge` (order-sort).
   - **GRUP D imza kalıbı:** severity ↔ priority `table` + "kötü raporu iyi rapora
     çevir" `code-playground`'u + `step-animation`.
   - **GRUP F referansı:** JQL `code` bloğu + JQL yazma `code-playground`'u.
   - **`error-dictionary` referansı (GRUP L):** 2 gerçek hata (kalan ≥6 Sonnet'te).
   - **`interview-questions` referansı (GRUP M):** 3 soru (kalan ≥47 Sonnet'te).

Bu commit tek başına build'den geçer; Sonnet eksik atomları doldurur.

⚠️ **Bilerek YAPILMADI (Sonnet'in kapanış fazında yapılacak):**
`scripts/audit-interview-questions.mjs` içindeki `PAGES` listesine `/jira`
**eklenmedi** — o liste 50 soru barajını hard-fail eder ve şu an 3 soru var.
`scripts/generate-interview-showcase.mjs` `PAGES` listesi de aynı sebeple
bekliyor. İkisi de S12'de eklenir.

---

## §C. SONNET — Faz Faz Kodlanacaklar

Her faz sonunda **doğruluk checklist'i** (içerik bütünlüğü → ipucu-konu bağı →
TR yorum taraması → build) çalıştırılır. Referans atom Opus'un **GRUP A**'sıdır —
kalıbı birebir kopyala, içeriği konuya uyarla.

| Faz | Kapsam | Çıktı |
|---|---|---|
| **S1** | GRUP A tamamlama (A2-A5 atomik başlıklar) | Jira'nın QA'deki yeri, Cloud vs DC, kimler kullanır, "izlenebilirlik" kavramı |
| **S2** | GRUP B — Kurulum & İlk Proje | Ücretsiz Cloud hesabı, proje tipi seçimi (team- vs company-managed), ekip/rol, ilk issue |
| **S3** | GRUP C — Issue Türleri ve Hiyerarşi | Epic→Story→Task→Sub-task + Bug; alanlar (field), ekran (screen), issue key anatomisi |
| **S4** | GRUP D — Bug Raporlama Sanatı (SAYFANIN KALBİ) | Anatomi, tekrar üretim adımları, severity↔priority, ekler, "cannot reproduce" önleme |
| **S5** | GRUP E — Workflow ve Durumlar | Status/transition/resolution, QA'in workflow'daki yeri, doğrulama döngüsü, otomasyon kuralları |
| **S6** | GRUP F — JQL | Alanlar, operatörler, fonksiyonlar (`currentUser()`, `startOfSprint()`), kaydedilmiş filtre, abonelik |
| **S7** | GRUP G — Scrum & Kanban Panoları | Backlog, sprint, board konfigürasyonu, swimlane, WIP limit, "QA sütunu" tartışması |
| **S8** | GRUP H — Test Yönetimi (Xray & Zephyr) | Test/Test Set/Test Plan/Test Execution, izlenebilirlik matrisi, requirement↔test↔bug bağı |
| **S9** | GRUP I + J — CI/CD entegrasyonu ve REST API | Jenkins/GitHub bağı, smart commit, otomatik bug açma, REST API (curl + Java/Python), webhook |
| **S10** | GRUP K — Dashboard ve QA Metrikleri | Gadget'lar, burndown/velocity/kontrol grafiği, defect density/leakage/reopen rate, metrik istismarı |
| **S11** | GRUP L — `error-dictionary` (min 8 gerçek sorun) | Kapalı bug'ın geri açılması, permission hatası, JQL sözdizimi, workflow'a takılma, API 401/403… |
| **S12** | GRUP M + Kapanış | Min 50 mülakat sorusu (15/20/15) + denetim listelerine kayıt + trio/i18n kapanışı |

---

## §D. Sonnet İçin Hazır Promptlar

> Her promptun başına şu ortak protokol eklenir:

**ORTAK PROTOKOL (her Sonnet fazında):**
> Önce oku: `CLAUDE.md` (§8, §9.1, §9.3, §9.4, §9.5, §10, §16, §17, §19, §24),
> `Documents/jira-page-plan.md` (bu dosya, özellikle §E), ve
> `src/data/jiraData.js`'teki **GRUP A referans atomu** — kalıbı buradan kopyala.
> Veri dosyası **tek ağaçlı**: her metin alanı `{tr, en}`, `sections` iki dile aynı
> referans. **Sekme başlıklarını DEĞİŞTİRME, sırasını bozma, yeni sekme EKLEME**
> (slug'lar donduruldu). Yeni bileşen YAZMA — sadece `jiraData.js`'in ilgili
> section'ının `blocks` dizisine veri ekle. Bu sayfa `fillMissingCodeTrios`
> KULLANMAZ: animasyonu ve sandbox'ı **elle** yaz. EN alanlarında Türkçe-özgü
> karakter (çöüğşıİĞŞÇÖÜ) BIRAKMA. TR kod/komut yorumları Türkçe olsun (JQL
> anahtar kelimeleri — `project`, `AND`, `ORDER BY` — dilin kendi sözdizimidir,
> çevrilmez). Her `code-playground`/`interview-questions`/`error-dictionary`
> bloğuna `relatedTopicId` koy; her `code-playground` ve `challenge` bloğuna
> benzersiz `id` koy; her `quiz` şıkkına `id` koy. Örnek uygulama sayfa boyunca
> **ShopQA e-ticaret ödeme akışı** (`SHOP-142` gibi issue key'ler) — yeni bir
> örnek uydurma. Bittiğinde: `node scripts/check-content-integrity.mjs`,
> `npm run i18n:check`, `npm run build` → üçü de yeşil olmadan "bitti" deme.

---

### D-S1 — GRUP A tamamlama (A2-A5)

> `jiraData.js` GRUP A'da A1 atomu (Jira nedir + "Bir Bug'ın Jira'daki Yolculuğu"
> filmi + step-animation + JQL playground + quiz + order-sort) Opus tarafından
> tamamlandı. Şu atomik başlıkları **aynı kalıpla** ekle: **A2** Jira'yı kimler
> kullanır ve QA burada nerede durur (developer/PO/QA rol karşılaştırması `grid`),
> **A3** Jira Cloud vs Data Center (fark tablosu + hangi anlatım hangisine ait
> `callout`), **A4** İzlenebilirlik (traceability) nedir — bir requirement'tan
> bug'a giden zincir (`python-flow-diagram`), **A5** Jira olmadan ne olur:
> e-posta/Excel ile bug takibinin çöküşü (`simulation` veya `animated-timeline`).
> Her başlıkta 2 analoji + 2 akıl yürütme + 2 LEGO anlatımı + 2 quiz olsun; her
> quiz'e yanlış cevapta gösterilecek bir `retryQuestion` ekle. A5'e bir
> `video-scene` filmi daha ekleme — GRUP A'da zaten film var, onun yerine
> animasyon kullan.

### D-S2 — GRUP B (Kurulum & İlk Proje)

> GRUP B'yi doldur: **B1** Ücretsiz Jira Cloud hesabı açma (adım adım, her adımın
> beklenen çıktısıyla — `step-animation` + numaralı adım listesi), **B2** Proje
> tipi seçimi: team-managed vs company-managed (fark `table`'ı + "yanlış seçersen
> ne olur" `callout`), **B3** Ekip, rol ve izinler (permission scheme kavramı
> yüzeysel değil: "QA neden bazı geçişleri yapamıyor" sorusuna cevap versin),
> **B4** İlk issue'nun oluşturulması ve issue key anatomisi (`SHOP-142` →
> proje anahtarı + sıra numarası). Kurulum sekmesi kuralı gereği her adımın
> **beklenen sonucu** görünür olmalı ve bir doğrulama adımı bulunmalı. ≥1
> `video-scene` filmi ("Boş Bir Jira Projesinden İlk Bug'a"), ≥1 animasyon,
> ≥1 sandbox (kurulum sırasını diz — `challenge` order-sort + bir
> `code-playground`: proje anahtarı/isimlendirme kuralına uygun issue key üret).

### D-S3 — GRUP C (Issue Türleri ve Hiyerarşi)

> GRUP C'yi doldur: **C1** Hiyerarşi (Epic → Story → Task → Sub-task) ve Bug'ın
> bu ağaçtaki yeri — Java analojisi zorunlu (Epic ≈ paket, Story ≈ sınıf,
> Sub-task ≈ metot gibi bir eşleme kur ve NEREDE kırıldığını da söyle),
> **C2** Bug bir issue tipidir: kendi alanları, kendi ekranı, **C3** Alan (field),
> ekran (screen) ve şema (scheme) üçlüsü — "bu alan neden bu projede yok"
> sorusunun cevabı, **C4** Link tipleri (blocks / is blocked by / relates to /
> duplicates) ve yanlış link'in sprint planlamasını nasıl bozduğu. ≥1
> `video-scene` ("Bir Epic'in Altında Bug Nasıl Doğar"), ≥1 `step-animation`,
> ≥1 `code-playground` (verilen 5 iş kaleminden doğru issue tipini seç/eşleştir),
> ≥1 `challenge` (order-sort: hiyerarşiyi diz), 2 quiz + retryQuestion.

### D-S4 — GRUP D (Bug Raporlama Sanatı — SAYFANIN KALBİ)

> Opus GRUP D'ye severity↔priority `table`'ını, "kötü raporu iyi rapora çevir"
> `code-playground`'unu ve bir `step-animation` koydu. Şu başlıkları tamamla:
> **D1** İyi bir bug raporunun anatomisi (başlık formülü, ortam, ön koşul, adımlar,
> beklenen/gerçekleşen, kanıt), **D2** Tekrar üretim adımları: "cannot reproduce"
> nasıl önlenir (deterministik adım yazma disiplini), **D3** Severity vs Priority:
> ikisinin farklı eksenler olduğu ve kimin karar verdiği, **D4** Ekler ve kanıt
> (log, HAR, konsol çıktısı, video) — otomasyon koşumundan gelen kanıtın raporda
> nasıl kullanıldığı, **D5** Bug raporu code review'i: verilen 3 raporu kritik et.
> ≥1 `video-scene` ("Kötü Bir Bug Raporunun 5 Günü" — sessiz gecikmenin maliyeti),
> her başlıkta 2 quiz + retryQuestion. Bu grup sayfanın en detaylı grubudur —
> diğer gruplardan belirgin şekilde daha zengin olmalı.

### D-S5 — GRUP E (Workflow ve Durumlar)

> GRUP E'yi doldur: **E1** Status / transition / resolution üçlüsü (üçünün farkı
> net olsun — en sık karıştırılan konu), **E2** Tipik bug workflow'u ve QA'in
> içindeki yeri (`python-flow-diagram` ile akış: Open → In Progress → Ready for
> QA → In QA → Reopened/Done), **E3** "Done" ne demek: definition of done ve
> resolution alanının yanlış kullanımı, **E4** Otomasyon kuralları (belirli bir
> geçişte otomatik atama/etiketleme) — kavramsal, ekran görüntüsüz. ≥1
> `video-scene` ("Bir Bug'ın Reopened'a Düşüşü"), ≥1 `simulation` veya
> `step-animation`, ≥1 `code-playground` (verilen senaryoda hangi geçişin
> yapılması gerektiğini yaz/seç), ≥1 order-sort challenge.

### D-S6 — GRUP F (JQL)

> Opus GRUP F'ye bir JQL `code` bloğu ve bir JQL `code-playground`'u koydu.
> Tamamla: **F1** JQL anatomisi (alan + operatör + değer + `ORDER BY`) ve SQL ile
> karşılaştırma — benzerlik ve **kritik farklar** (JQL bir veritabanı sorgu dili
> DEĞİLDİR: JOIN yok, alan bazlı), **F2** Operatörler (`=`, `!=`, `IN`, `~`,
> `WAS`, `CHANGED`) ve zaman fonksiyonları (`startOfDay()`, `-7d`), **F3** QA'in
> günlük 8 sorgusu (bana atanan açık bug'lar, bu sprintte reopen olanlar, 30
> gündür dokunulmamışlar…) — her biri ayrı `code` + açıklama, **F4** Kaydedilmiş
> filtre, abonelik ve filtreden board üretme. **En az 3 ayrı `code-playground`**
> (JQL yaz) — bu grup sayfanın en yoğun sandbox grubudur. JQL anahtar kelimeleri
> İngilizce kalır, açıklama Türkçe. ≥1 `video-scene` ("Bir JQL Sorgusunun Jira'yı
> Nasıl Süzdüğü"), ≥1 `step-animation`.

### D-S7 — GRUP G (Scrum & Kanban Panoları)

> GRUP G'yi doldur: **G1** Backlog → sprint → board zinciri, **G2** Scrum board vs
> Kanban board (fark `table`'ı ve hangi ekibe hangisi), **G3** Board
> konfigürasyonu: sütunlar, swimlane, hızlı filtre; "QA sütunu koymalı mıyız"
> tartışması (iki tarafın da argümanı verilsin, tek doğru dayatılmasın),
> **G4** WIP limit ve darboğaz: QA sütununda biriken kartların anlamı,
> **G5** Sprint ritüellerinde QA (planning'de tahmin, daily'de blocker,
> review/retro'da kalite verisi). Sayfa içinden `/sprint` simülatörüne "şimdi
> uygula" linki ver (`<Link>` değil, `link-grid` bloğu ya da metin içi referans —
> mevcut kalıba bak). ≥1 `video-scene`, ≥1 animasyon, ≥1 sandbox.

### D-S8 — GRUP H (Test Yönetimi: Xray & Zephyr)

> GRUP H'yi doldur: **H1** Neden Jira tek başına test yönetimi yapmaz (bug takibi
> ≠ test yönetimi), **H2** Xray/Zephyr'ın getirdiği yeni issue tipleri (Test,
> Test Set, Test Plan, Test Execution, Precondition) ve aralarındaki ilişki,
> **H3** İzlenebilirlik matrisi: requirement ↔ test ↔ execution ↔ bug zinciri
> (`python-flow-diagram`), **H4** Otomasyon sonuçlarının Jira'ya akması (JUnit XML
> içe aktarma kavramı) — kod örneği REST API çağrısı düzeyinde kalsın, ürün
> sürümüne bağlı ekran adımı verme, **H5** Xray vs Zephyr karşılaştırması ve
> "hangisi" kararının kriterleri. ≥1 `video-scene`, ≥1 animasyon, ≥1
> `code-playground`.

### D-S9 — GRUP I + J (CI/CD entegrasyonu ve REST API)

> **GRUP I:** **I1** Git commit mesajından issue'ya bağ (smart commit sözdizimi),
> **I2** Jenkins/GitHub Actions koşumu kırıldığında otomatik bug açma akışı,
> **I3** Otomatik açılan bug'ın tuzağı: gürültü ve tekrar eden ticket'lar
> (aynı hata için var olan ticket'a yorum atma stratejisi), **I4** Ortam bilgisi
> ve koşum artefaktının (rapor linki) bug'a iliştirilmesi.
> **GRUP J:** **J1** Jira REST API temeli: kimlik doğrulama (API token) ve
> `POST /rest/api/3/issue`, **J2** Arama: `POST /rest/api/3/search` ile JQL,
> **J3** Java (REST Assured) ve Python örnekleri — Java analojisi zorunlu,
> **J4** Webhook: Jira'dan dışarı olay göndermek, **J5** Rate limit ve hata
> yönetimi (401/403/429 ne anlatır). Kod blokları `{tr,en}` bilingual, TR
> yorumlar Türkçe. ≥1 `video-scene` (her iki grupta değil, ikisinden birinde
> yeterli DEĞİL — **her sekmede en az 1 film** kuralı gereği I ve J'ye AYRI birer
> film), ≥1 animasyon ve ≥1 sandbox her iki grupta da.

### D-S10 — GRUP K (Dashboard ve QA Metrikleri)

> GRUP K'yi doldur: **K1** Dashboard ve gadget kavramı (filtre → gadget → pano),
> **K2** Scrum grafikleri: burndown, velocity; **ne söyler, ne söylemez**,
> **K3** Kanban grafikleri: kontrol grafiği (cycle time), kümülatif akış — QA
> darboğazı bu grafiklerde nasıl görünür, **K4** QA metrikleri: defect density,
> defect leakage, reopen rate, bug yaşı — her birinin **formülü + hangi JQL ile
> ölçüldüğü** verilsin, **K5** Metriklerin istismarı: "kapatılan bug sayısı"na
> göre performans ölçmenin yarattığı davranış bozulması (Goodhart yasası) —
> düşündürücü bir bölüm olsun. ≥1 `video-scene`, ≥1 animasyon, ≥1
> `code-playground` (metriği ölçen JQL'i yaz).

### D-S11 — GRUP L (`error-dictionary`, min 8 gerçek sorun)

> Opus 2 hata koydu; **en az 6 tane daha** ekle. Adaylar: (1) "Field 'X' does not
> exist or you do not have permission to view it" JQL hatası, (2) bug'ın yanlış
> resolution ile kapatılıp raporlardan düşmesi, (3) sürekli Reopened'a dönen bug
> (yetersiz tekrar üretim adımı), (4) transition butonunun görünmemesi (workflow
> condition/permission), (5) API 401 vs 403 karışıklığı (token yanlış mı, izin mi
> yok), (6) `POST /rest/api/3/issue` 400: zorunlu alan (customfield) eksik,
> (7) aynı bug'ın 3 kez açılması (duplicate) ve arama disiplini, (8) sprint
> kapanınca bitmemiş issue'ların nereye gittiği, (9) board'da kart görünmüyor
> (board filtresi/JQL kapsamı), (10) e-posta bildirim fırtınası (notification
> scheme). Her biri `error-dictionary` formatında: gerçek hata metni + kök neden +
> çözüm + önleme; kod alanları (`codeWrong`/`codeFixed`) bilingual, TR yorumlar
> Türkçe; her bloğa `relatedTopicId`. ≥1 `video-scene`, ≥1 animasyon, ≥1 sandbox.

### D-S12 — GRUP M (mülakat, min 50) + Kapanış

> **GRUP M:** min 50 soru — 15 Basic / 20 Intermediate / 15 Advanced. "X nedir?"
> tarzı salt tanım sorusu YASAK; hepsi senaryo tabanlı olsun. Kalite barı örneği:
> *"Sprint'in son günü; bir bug 4 kez Reopened oldu, developer 'bende çalışıyor'
> diyor, PO sprint'i kapatmak istiyor. Jira'da hangi veriyi çıkarır, kime ne
> söylersin?"* Her cevap 3-6 cümle, gerektiğinde JQL/kod örneği ve Java/otomasyon
> dünyasından bir karşılaştırma içersin. `interview-questions` bloğuna
> `relatedTopicId` koy. Mülakat sekmesi %60 quiz barajının arkasında kalır —
> beklenen davranış.
>
> **KAPANIŞ (bu faz bitmeden "bitti" deme):**
> 1. `scripts/audit-interview-questions.mjs` içindeki `PAGES` listesine
>    `{ route: '/jira', file: 'jiraData.js', exportName: 'jiraData' }` ekle ve
>    denetimi çalıştır — 50/15/20/15 barajını geçmeli.
> 2. `scripts/generate-interview-showcase.mjs` `PAGES` listesine `/jira`'yı ekle
>    (ana sayfadaki mülakat ısınma turuna girsin) ve build'i yeniden koştur.
> 3. `scripts/check-i18n-leaks.mjs` içindeki `TRIO_COMPLETE_PAGES`'e
>    `jiraData.js`'i ekle — her sekmede ≥1 video + ≥1 animasyon + ≥1 sandbox
>    kontrolü açılır; eksik varsa kapat.
> 4. Sekmelerin en az birine `faq` bloğu ekle (5-6 soru) — arama sonuçlarındaki
>    soru-cevap görünürlüğü için; sorular ekranda görünen metinden gelmelidir.
> 5. `tests/video-scene.spec.ts`'teki `/jira` testinin hâlâ geçtiğini doğrula.
> 6. `.claude/NEXT_SESSION.md`'yi güncelle.

---

## §E. Sayfa Mimarisi Referansı

### E.1. Sekme listesi (DONDURULDU — değiştirilemez)

| # | TR | EN | Slug |
|---|---|---|---|
| 0 | 🏠 Jira Nedir? | 🏠 What is Jira? | `what-is-jira` |
| 1 | ⚙️ Kurulum & İlk Proje | ⚙️ Setup & First Project | `setup-and-first-project` |
| 2 | 🧩 Issue Türleri ve Hiyerarşi | 🧩 Issue Types & Hierarchy | `issue-types-and-hierarchy` |
| 3 | 🐞 Bug Raporlama Sanatı | 🐞 The Art of Bug Reporting | `the-art-of-bug-reporting` |
| 4 | 🔄 Workflow ve Durumlar | 🔄 Workflows & Statuses | `workflows-and-statuses` |
| 5 | 🔍 JQL: Jira Sorgu Dili | 🔍 JQL: Jira Query Language | `jql-jira-query-language` |
| 6 | 📋 Scrum ve Kanban Panoları | 📋 Scrum & Kanban Boards | `scrum-and-kanban-boards` |
| 7 | 🧪 Test Yönetimi: Xray & Zephyr | 🧪 Test Management: Xray & Zephyr | `test-management-xray-and-zephyr` |
| 8 | 🔗 CI/CD ve Otomasyon Entegrasyonu | 🔗 CI/CD & Automation Integration | `ci-cd-and-automation-integration` |
| 9 | 🤖 Jira REST API ile Otomasyon | 🤖 Automating with the Jira REST API | `automating-with-the-jira-rest-api` |
| 10 | 📊 Dashboard ve QA Metrikleri | 📊 Dashboards & QA Metrics | `dashboards-and-qa-metrics` |
| 11 | 🚨 Gerçek Hayat Sorunları | 🚨 Real-Life Issues | `real-life-issues` |
| 12 | 💼 Mülakat Soruları | 💼 Interview Q&A | `interview-q` |

> Slug'lar `npm run seo:section-slugs` ile üretilip manifest'e yazıldı. Başlık
> değişirse slug da değişir ve yayınlanmış URL başka içeriğe düşer — bu yüzden
> başlıklar donmuştur. Kesin liste her zaman `src/data/generated/sectionSlugs.js`.

### E.2. Sekme başına zorunlu asgari (her sekmede)

- ≥1 `video-scene` (film) · ≥1 animasyon (`step-animation` | `simulation` |
  `animated-timeline`) · ≥1 sandbox (`code-playground`).
- Açılış bloğu **her zaman** 4 katmanlı `simple-box`: (1) mekanizması konuyla
  birebir örtüşen somut analoji, (2) düşündürücü "neden" sorusu, (3)
  karşılaştırma/zıtlık, (4) gerçek QA/iş dünyası bağlamı.
- Quiz asla ilk blok olamaz; konu anlatımından sonra gelir.

### E.3. `id` / `relatedTopicId` sözlüğü

Konu id'leri `jira-<grup harfi><sıra>-<konu>` kalıbındadır ve `relatedTopicId`
buradan seçilir. Opus'un koyduğu değerler:

| id | Nerede |
|---|---|
| `jira-a1-what-is-jira` | GRUP A açılış atomu |
| `jira-d1-bug-report-anatomy` | GRUP D bug raporu anatomisi |
| `jira-f1-jql-basics` | GRUP F JQL temeli |
| `jira-l1-common-failures` | GRUP L hata sözlüğü |
| `jira-m1-interview` | GRUP M mülakat |

Sonnet yeni başlık eklerken aynı kalıbı sürdürür (`jira-c2-...`, `jira-g3-...`).
Blok `id`'leri (XP tekilliği için) `jira-` önekiyle benzersiz olmalıdır.

### E.4. Örnek uygulama sözlüğü (tutarlılık için)

| Kavram | Sabit değer |
|---|---|
| Ürün | ShopQA (e-ticaret) |
| Proje anahtarı | `SHOP` |
| Örnek bug | `SHOP-142` — "Ödeme adımında kupon kodu tutarı iki kez düşülüyor" |
| Örnek story | `SHOP-118` — Kupon kodu uygulama |
| Örnek epic | `SHOP-100` — Ödeme akışı yenileme |
| Ortam | `staging`, Chrome 141, Windows 11 |
| Kullanıcılar | QA: Ayşe · Developer: Mert · PO: Deniz |

---

## §F. Manuel Test Rehberi

> Sayfa Sonnet fazları bittikten sonra bu rehberle elle doğrulanır. Otomatik
> kontrollerin (içerik bütünlüğü, i18n taraması, build, mülakat denetimi)
> göremediği şeyler burada.

### F.0. Kurulum

```bash
npm run dev
# Tarayıcıda: http://localhost:5173/jira
```

DevTools → Console'u açık tut; test boyunca kırmızı hata çıkmamalı.

### F.1. Sayfa iskeleti (2 dakika)

1. Sol tarafta **dikey sidebar** görünmeli (yatay tab bar DEĞİL) — 13 sekme.
2. Sağ üstteki dil toggle'ı çevir: sadece başlıklar değil `simple-box` metinleri,
   tablo hücreleri ve film altyazıları da GERÇEKTEN değişmeli.
3. Scroll progress bar ilerliyor mu, sağ altta 🏠 butonu var mı.
4. Dark mode aç/kapa: tablo, kod bloğu ve film sahnesi okunur kalmalı.
5. 375px genişlikte yatay kaydırma olmamalı; tablolar kendi içinde kaymalı.

### F.2. Ana sayfa girişleri (1 dakika)

Ana sayfadaki üst nav'da ve footer "Test Araçları" listesinde 📋 Jira linki
görünmeli ve `/jira`'ya gitmeli.

### F.3. GRUP A — referans kalite (5 dakika)

1. **"Bir Bug'ın Jira'daki Yolculuğu"** filmini ▶ ile oynat: 7 sahne geçmeli,
   altyazı her sahnede değişmeli, ⏮/⏭ ile manuel gezinme çalışmalı, son sahnede
   ⏭ pasif ama GÖRÜNÜR olmalı (koyu temada da).
2. `step-animation` adımları arasında gezin.
3. JQL playground'unda önce yanlış bir sorgu yaz (ipucunun yardımcı olduğunu gör),
   sonra doğru cevabı yaz ve başarı mesajını al.
4. Quiz'i yanlış cevapla — yedek soru gelmeli; sonra doğru cevapla.
5. Order-sort challenge'ı hem fare ile sürükleyerek hem klavye (↑/↓) ile çöz.

### F.4. GRUP B-K — her grup ~3 dakika

Aynı döngü: oku → film/animasyon oynat → sandbox'ı hem yanlış hem doğru dene →
quiz'i çöz. Özellikle:
- **D** — severity/priority tablosunun mobilde okunabilirliği; "kötü raporu iyi
  rapora çevir" playground'unun zayıf cevabı kabul ETMEDİĞİ.
- **F** — JQL playground'larının hepsi; sözdizimi hatalı girişte ipucunun yönlendirmesi.
- **H** — izlenebilirlik akış diyagramının adım adım renklendiği.
- **K** — metrik formüllerinin yanındaki JQL'lerin F grubundakilerle çelişmediği.

### F.5. GRUP M — mülakat ve gating (10 dakika)

1. Temiz bir oturumda (gizli sekme) hiç quiz çözmeden GRUP M'ye git: sorular
   **kilitli/görünmez** olmalı.
2. Quiz'leri çözerek %60'ı geç: mülakat sekmesi **açılmalı**.
3. Soru sayısını say (≥50), bir soruya tıklayınca cevap yazılacak alan çıkmalı.
4. Kısa/zayıf bir cevap yaz, gönder: AI değerlendirmesi bir puan/geri bildirim
   döndürmeli (gerçek AI çağrısı — sık tekrarlama).
5. Soruların %80'ine yeterli cevap verildiğinde bitirme rozeti çıkmalı.

### F.6. Çapraz link ve SEO (3 dakika)

1. Sayfa içindeki `/manual-testing`, `/sprint`, `/jenkins`, `/rest-assured`
   linklerine tıkla — hepsi doğru sayfaya gitmeli.
2. Sekme başlığı (`<title>`) "Jira" içermeli; `Ctrl+U` ile ham HTML'de
   `<meta name="description">` dolu olmalı.
3. `/jira/jql-jira-query-language` adresini doğrudan aç (yenileyerek): doğru
   sekme seçili gelmeli ve başlık o sekmeye ait olmalı.
4. `/en/jira` açıldığında sayfanın tamamı İngilizce olmalı.

### F.7. Bir şey bozuk görünüyorsa

Önce `CLAUDE.md` §23'teki tekrarlayan hata sözlüğüne bak — özellikle EN modda
Türkçe sızıntısı ve film oynatıcı son-sahne buton görünürlüğü bu sayfada da
geçerli kalıplardır. Yeni ve tekrarlayan bir hata bulursan oraya yaz, bu dosyaya
değil.
