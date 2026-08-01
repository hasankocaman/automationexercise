# NEXT SESSION - Devam Noktası (TEK Güncel Durum Dosyası)

> Bu dosyayı `CLAUDE.md`'den hemen sonra, her oturum başında oku.
> Kullanıcıdan proje durumunu tekrar isteme. Kalıcı kurallar `CLAUDE.md`,
> SEO mimarisi `codexSeo.md`, deploy/GSC adımları `DEPLOY.md`; güncel iş
> listesi ve son inceleme sonucu sadece bu dosyadadır.
>
> Bu dosyada commit hash/anlık durum tutulabilir; kalıcı kural dosyalarına
> commit hash/anlık not yazılmaz (bkz. CLAUDE.md §0).
>
> **2026-07-25'te bu dosya 10.000+ satırlık kronolojik bir oturum günlüğüne
> dönüşmüştü (Haziran sonundan beri her oturumun tam anlatımı birikmişti).
> Temizlendi:** kalıcı değeri olan bulgular `CLAUDE.md` §9.3/§23'e taşındı,
> geri kalan tamamlanmış/main'e gitmiş iş anlatıları silindi — tam ayrıntı
> her zaman `git log --oneline` çıktısında ve commit mesajlarında duruyor
> (mesajlar açıklayıcı yazılır, ör. `feat(api-testing): GRUP K tamamlandı`).
> Bundan sonra bu dosyayı **güncel durum + açık işler** olarak tut, kapanan
> her iş için ayrı bir bölüm biriktirme — CLAUDE.md'ye taşınacak kalıcı bir
> kural/bulgu yoksa ilgili girdiyi commit'e güvenip sil.

---

## 📌 Şu An Ne Durumdayız (son güncelleme: 2026-08-01, Opus — test kapsamı denetimi: 3 boşluk + 1 gerçek test bug'ı)

- **Aktif branch: `feature/seo-phase-2`.** Kural dosyaları (§10, §22, §22.1) ile
  mevcut test/denetim listeleri karşılaştırıldı. **Üç gerçek kapsam boşluğu ve
  bir gerçek test hatası bulundu; hepsi kapatıldı.**
- **🐛 GERÇEK TEST HATASI — `tests-extended/interview-mastery-flows.spec.ts`:**
  Suite, eşiğin ALTINDA bir miktar quiz cevapladıktan sonra kilidi doğrulamak
  için mülakat sekmesine tıklıyor, ama sekme takip değişkeni (`activeTab`) son
  İÇERİK sekmesini göstermeye devam ediyordu. Sonraki döngü "sekme değişmediyse
  tıklama" mantığı kullandığından, sıradaki quiz AYNI içerik sekmesindeyse
  sayfaya geri DÖNÜLMÜYOR ve test mülakat sekmesinde var olmayan bir quiz
  butonunu **sonsuza kadar bekliyordu**. Çoğu sayfada sıradaki quiz farklı bir
  sekmede olduğu için hata yıllardır görünmemişti; `/qa-frontend` (48 quiz,
  eşik 29 → son iki quiz aynı sekmede) eklenince ortaya çıktı.
  - Teşhis: Playwright call log'unda "resolved to" satırı YOKTU → buton
    aktörlük sorunu değil, DOM'da hiç yok. Sidebar indeks kayması ve metin
    eşleşmesi hipotezleri ölçülerek ELENDİ (buton metni birebir eşleşiyor,
    sidebar 10 sekmede 10 buton).
  - Düzeltme: kilit kontrolünden sonra `activeTab = -1` (tek satır).
    **Sonuç: 300 s'de takılan test 39 s'de geçiyor.** Test timeout'u da
    120 s → 180 s yapıldı (29 quiz'lik sayfalar için pay).
- **Kapatılan 3 kapsam boşluğu:**
  1. `tests/topic-pages-ui.spec.ts` — `/api-testing` ve `/qa-frontend` TopicPage
     tabanlı ders sayfası oldukları hâlde listede YOKTU (§22 kontrol 1 kapsam
     dışıydı). Eklendi, **2/2 PASS**.
  2. `tests-extended/interview-mastery-flows.spec.ts` — `/claude-ai`,
     `/llm-agents`, `/qa-frontend`, `/api-testing` `interview-questions` bloğu
     taşıdığı hâlde suite'te YOKTU (§22 kontrol 3 "TÜM sayfalar" demesine
     rağmen). Dördü de eklendi, **4/4 PASS** (qa-frontend yukarıdaki düzeltmeyle).
  3. `scripts/audit-interview-questions.mjs` — `/gauge` ve `/api-testing`
     denetlenmiyordu (§10'un 50 soru kuralı onlar için hiç kontrol edilmemişti).
     Eklendi; ikisi de zaten 50 soru + 15/20/15 dağılımıyla uyumlu çıktı,
     build kırılmadı. **25 → 27 sayfa, 27/27 ✅.** Ayrıca başlıktaki sabit sayı
     ("22 teknoloji sayfası") `PAGES.length`'ten türetilir yapıldı — sayfa
     eklendikçe sessizce eskiyordu.
- **Ek kapsam:** `/sprint` ve `/portfolio` `tests/other-pages-ui.spec.ts`'e
  eklendi (kendi akış suite'leri vardı ama ikisi de console/page HATASI
  taramıyordu). **10/10 PASS.**
- **Belge senkronu:** `Documents/acceptancecriterias.md`'ye **AC 13 — QA
  Portfolyo** eklendi (§22'nin "önce AC, sonra test maddesi" kuralı gereği;
  portfolyo suite'i önceki oturumda AC karşılığı olmadan eklenmişti).
- **Not (regresyon değil):** Art arda birden fazla mülakat akışı koşturulunca
  `grade-interview-answer` geçici olarak 200 dönmeyebiliyor (Groq rate limit —
  config'in `workers: 1` yorumunun uyardığı durum). `/docker` tek başına
  koşturulunca **PASS**; suite'i sayfa sayfa koşturmak gerekebilir.

---

## 📌 Önceki Durum (2026-08-01, Opus — Portfolio Builder çekirdeği `/portfolio` TAMAMLANDI)

- **Aktif branch: `feature/seo-phase-2`.** `Documents/portfolio-builder-plan.md`'deki
  Opus çekirdeği (O1-O7) uygulandı. `/portfolio` artık canlı bir sayfa.
- **Yeni dosyalar:** `src/lib/portfolioSnapshot.js` (türetme), `src/data/portfolioData.js`
  (tüm metinler + 18 görev kataloğu + 6 bug kataloğu + boş durum kopyası),
  `src/components/PortfolioPage.jsx`, `tests/portfolio-page.spec.ts`.
  **Sadece-ekleme yapılan paylaşılan dosyalar:** `App.jsx` (lazy route),
  `src/utils/seo.js` (TR+EN metadata), `scripts/generate-static-routes.mjs`
  (shell tanıtım metni), `scripts/check-i18n-leaks.mjs` (STRICT_ZERO'ya
  `portfolioData.js`), `src/components/HomePage.jsx` (teal giriş kartı),
  `tests/no-internal-jargon.spec.ts` (route listesine `/portfolio`), `CLAUDE.md` §2.
- **⚠ Planın en kritik maddesi uygulandı — route-kapsamı tuzağı:** `xp.js`
  depolama anahtarını bulunulan sayfanın URL'inden türetir, bu yüzden
  `getCompletedExercises()` ve onun üstüne kurulu TÜM `sprintStore`
  fonksiyonları `/portfolio` sayfasında sessizce boş döner. `xp.js`/`sprintStore.js`
  DEĞİŞTİRİLMEDİ; `portfolioSnapshot.js` tüm `learnqa_xp_*` anahtarlarını
  tarayan global bir küme kuruyor (`progressStore.getTotalXp()`'nin kanıtlanmış
  deseni). **Testin dişi doğrulandı:** global tarama geçici olarak route-kapsamlı
  okumaya çevrildi → 2 test KIRILDI → geri alındı.
- **Plandan bilinçli 3 sapma (hepsi dürüstlük gerekçeli):**
  1. Plan "en uzun streak" istiyordu — `activityLog` bunu TUTMUYOR (yalnızca
     güncel seri + aktif gün türetilebilir). Olmayan metrik uydurulmadı, gerçekten
     ölçülen ikisi gösteriliyor.
  2. Plan 18 mission diyordu; S2'den sonra gerçek sayı **24** (18 ders görevi +
     6 sprint bug'ı). Katalog buna göre yazıldı.
  3. Plan "44 → 45 shell" diyordu; dil-ayrık URL'lerden sonra gerçek sayı
     **88 → 90** (45 route × 2 dil).
  4. Ana sayfa giriş kartı planda Sonnet görevi (S4) idi — erişilemeyen bir
     sayfa teslim edilmiş sayılmayacağı için çekirdeğe alındı.
- **Milestone bölümü:** profil düğüm kopyası (`{route,title,emoji}`) `isMain`
  taşımadığından "SDET yolu tamam" rozeti profilden hesaplanamıyor; harita
  sayfasının zaten yazdığı `learnqa_map_milestones` kaydıyla birleştiriliyor
  (yeni state değil, mevcut deponun okunması).
- **Doğrulama:** `node --check` (2 yeni dosya) ✓ · content-integrity ✓ (40 dosya) ·
  i18n baseline 0 ✓ · build ✓ (**90 shell**, dist-SEO geçti, 56 FAQPage/68 Course) ·
  `portfolio-page.spec.ts` **8/8** ✓ (diş doğrulandı) · regresyon: no-internal-jargon
  (9, `/portfolio` dahil) + sprint-flow (4) + seo-i18n-routing (6) +
  homepage-recommended-badges (2) + other-pages-ui + mobile-smoke (16) +
  theme-and-accessibility (5) = **50/50 PASS**.
- **🔜 Kalan portfolyo işleri (planın Sonnet tarafı, opsiyonel):** `/qa-mentor`
  rozet şeridinin yanına portfolyo linki (S4'ün ikinci yarısı) ve paylaşılabilir
  kart görseli (`<canvas>`) — ikisi de düşük öncelik, ayrı oturum.
- **🔜 Değişmeyen açık iş:** `main`'e merge kararı kullanıcıda; Plausible hesabı
  ve GSC sitemap yeniden gönderimi (90 URL) hâlâ kullanıcı tarafında.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — `feature/portfolio-builder` `feature/seo-phase-2`'ye merge edildi)

- **`origin/feature/portfolio-builder` fetch edilip `feature/seo-phase-2`'ye
  merge edildi** (commit `c06c21e`). O branch `main`'den yalnızca 2 commit
  ileride idi (`Documents/portfolio-builder-plan.md` planı + iç koordinasyon
  dili sızıntısını engelleyen yeni bir kural: `CLAUDE.md` §24, yeni
  `check-content-integrity.mjs` Kontrol [H], yeni `tests/no-internal-jargon.spec.ts`,
  ayrıca `cypressData/gaugeData/javaData/javascriptData/qaFrontendData.js`'te
  küçük içerik düzeltmeleri). Tek çakışma `CLAUDE.md`'de aynı satıra iki ayrı
  dalın birer kural eklemesiydi — ikisi de korunarak çözüldü, içerik kaybı
  yok. `src/data/javaData.js` otomatik (çakışmasız) birleşti.
  - Bundan sonra geliştirme **`feature/seo-phase-2` branch'inden** devam
    ediyor — iki dalın da işleri artık burada bir arada. Ayrı
    `feature/portfolio-builder` branch'i (local + origin) hâlâ duruyor,
    silinmedi.
  - Merge sonrası `check-content-integrity` ✓, `npm run build` ✓ (88 shell,
    dist-SEO temiz), tam E2E suite ✓ — **253/253 test yeşil** (yeni
    `no-internal-jargon.spec.ts`'in 8 testi dahil, 12 dk).
  - **`feature/seo-phase-2` artık hem SEO Faz 2 (O1-O8 + S1-S4) hem Portfolio
    Builder planı + iç-koordinasyon-dili kuralını içeriyor, `main`'e merge
    kararı kullanıcıda.**

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 TAMAMLANDI: S1-S4 + E2E doğrulaması)

- **✅ Kapsamlı son E2E testi TAMAMLANDI, TAM SUITE YEŞİL: 245/245 ✅**
  (commit `b7e04f8`): tam suite (40 spec dosyası) 2 kez koşuldu — ilk koşuda
  2 gerçek regresyon + 1 flaky test bulundu ve düzeltildi, ikinci (son) koşuda
  **245 test, 0 hata, 11.5 dk**:
  - `seo-i18n-routing.spec.ts`: S4'te `/docker` TR title'ı "Docker Eğitimi"
    → "Docker Nedir?" olarak cilalandığı için eski pattern'i bekleyen test
    kırılmıştı — test yeni başlığa göre güncellendi (kod tarafında hata yoktu,
    test beklentisi eskiydi).
  - `typescript-page.spec.ts` (flaky) + `sql-page.spec.ts` (proaktif, aynı
    risk): S1'in stub+arka-plan-swap deseni (`TypeScriptPage.jsx`/`SQLPage.jsx`)
    yüzünden test sekmelere tıklamaya gerçek veri yüklenmeden başlayabiliyordu
    ("Kurulum" sekmesi bazen boş görünüyordu). `topic-content-loading`
    göstergesinin kaybolmasını bekleyen bir adım eklendi.
  - Düzeltme sonrası ilgili 3 test dosyası (8 test) tek tek yeşil, ardından
    `check-content-integrity` + `npm run build` temiz geçti.
  - **SEO Faz 2 (O1-O8 + S1-S4) artık tamamen doğrulanmış durumda. `main`'e
    merge kararı kullanıcıda (CLAUDE.md §21).**

- **Aktif branch: `feature/seo-phase-2`.** Opus'un O1-O8 çekirdeğinin ardından
  Sonnet'in S1-S4 görevlerinin TÜMÜ tamamlandı (`Documents/seo-phase-2-plan.md`).
  Plandaki 12 madde de ✅. **S1 ve S2 detayları aşağıdaki iki bölümde**; bu
  bölüm S3 (analytics) + S4 (TR metadata + mülakat dağılımı) ve genel özet.

- **✅ S3 — Çerezsiz analytics (Plausible) TAMAMLANDI** (commit `ba80b58`):
  `index.html`'e `data-domain="learnqa.dev"` ile script eklendi (Google
  Analytics BİLİNÇLİ kullanılmadı — çerez rızası yükü). `src/lib/analytics.js`
  → `trackEvent()`, `window.plausible` yoksa sessizce no-op. 4 olay bağlandı:
  `lesson_completed` (AuthContext, anonim+üye), `mission_completed`
  (MissionBlock), `sprint_closed` (SprintPage), `language_changed`
  (LanguageContext — SEO Faz 2'nin `/en` kullanımını ölçmek için kritik).
  `DEPLOY.md` §8'e hesap kurulum adımları eklendi. **Kullanıcı tarafı açık iş:**
  Plausible hesabı açılıp `learnqa.dev` domain'i eklenmeli — kod hazır, hesap yok.

- **✅ S4 — TR metadata cilası + mülakat dağılımı TAMAMLANDI** (commit `e40d2d6`):
  - En yüksek trafikli 12 sayfanın (`selenium`, `playwright`, `sql`, `python`,
    `java`, `docker`, `jenkins`, `git-github`, `security`, `what-is-testing`,
    `manual-testing`) TR title/description'ları gerçek arama niyeti kalıplarıyla
    güçlendirildi ("selenium nedir", "playwright türkçe", "sql sorguları",
    "docker nedir" gibi) — Opus fazındaki doğrudan çeviriden farklı olarak.
  - `/postman` (16/19/15) ve `/playwright` (15/15/20) mülakat seviye dağılımı
    15/20/15 altındaydı — soru SİLİNMEDİ, eksik intermediate seviyeye senaryo
    tabanlı sorular eklendi (playwright +5, postman +1, her ikisi de hem TR hem
    EN tarafına — postman'ın iki bloğu FARKLI formatta: EN düz string, TR
    bilingual `{tr,en}` per-soru, ikisi de elle güncellendi). **Sonuç:
    audit-interview-questions artık 25/25 sayfa ✅, 0 uyarı** (önceki durum:
    23/25, 2 uyarı).
- **Doğrulama:** seo:check (45 route) ✓ · audit-interview-questions (25/25 ✅) ✓ ·
  content-integrity ✓ · i18n baseline 0 ✓ · build ✓ (88 shell, dist-SEO).

- **🎯 SEO Faz 2 ÖZET (O1-O8 + S1-S4, plan §0'daki TÜM maddeler ✅):**
  - Dil-ayrık URL (`/en` prefix), 88 statik shell, FAQPage+Course JSON-LD
    (56+68 sayfa), `/typescript`+`/java`+`/sql` ilk-boya JS'i ~%98 küçüldü,
    6 yeni sayfaya mission eklendi (18→24 toplam), çerezsiz analytics, TR
    metadata cilası, mülakat dağılımı 25/25 ✅.
  - Toplam commit: `f5350b8`, `80034c2`, `52c0fc0`..`e990852` (6 mission +
    1 audit script), `f46ac67`, `ba80b58`, `e40d2d6` = **12 commit**.
- **🔜 Kalan tek adım:** kapsamlı son E2E doğrulaması (bu oturumda devam
  ediyor) — bitince `main`'e merge kararı kullanıcıda (CLAUDE.md §21), öncesinde
  plan §8'deki 9 adımlı manuel test rehberi önerilir.
- **🔜 Kullanıcı (Hasan) tarafı, planın §5'i (hâlâ açık, bu plan onları
  kapatmaz):** GSC'ye sitemap'i yeniden gönder (88 URL), Plausible hesabı aç,
  `sprint-simulator-and-open-items-plan.md` §5'teki 4 madde (edge function
  deploy'ları, social-proof RPC, trending-skills aktivasyonu).

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 / S2 mission yayılımı)

- **Aktif branch: `feature/seo-phase-2`.** S1'in hemen ardından **S2 — mission
  yayılımı TAMAMLANDI** (plan §7.2). Ölçülen durum: 25 teknoloji sayfasından
  yalnızca 6'sında (`selenium`, `playwright`, `cypress`, `python`, `sql`,
  `rest-assured`) mission vardı — hiçbiri en yüksek trafikli sayfalarda değildi.
  - **6 yeni sayfaya birer 5 adımlık mission eklendi** (her biri AYRI commit,
    `52c0fc0`..`e990852`): `docker` (QA: Selenium Grid sekmesi — container/hub-node
    compose/yarış durumu/RemoteWebDriver/shm_size), `jenkins` (First Jenkinsfile
    sekmesi — pipeline-as-code/stage-steps/sessiz başarısızlık/post-failure/agent
    seçimi), `git-github` (Merge & Conflict sekmesi, plan promptunda önerilen —
    çakışma işaretleri/temizlik/add-commit/status doğrulama), `java` (Test
    Frameworks sekmesi, ben seçtim çünkü sayfa zaten test kodu yazmayı öğretiyor —
    @ParameterizedTest ile kopyala-yapıştır testlerin sessiz tutarsızlık riskini
    yapısal olarak kapatma), `postman` (Writing Automated Tests sekmesi —
    pm.test() status assertion/token çıkarma/hardcode riski/{{değişken}} zinciri),
    `linux` (Real-World QA Scenarios sekmesi, plan promptunda "CI agent debug"
    olarak önerildi — ps/grep, lsof, tail -f üçlüsüyle GUI'siz hata ayıklama).
  - Toplam mission sayısı: **18 → 24**, prediction: **78 → 96**.
  - `scripts/audit-learning-blocks.mjs`'in `MISSION_FILES` listesine 5 yeni dosya
    eklendi (`dockerData.js`, `jenkinsData.js`, `gitGithubData.js`, `postmanData.js`,
    `linuxData.js` — `javaData.js` zaten `FILES`teydi) — yoksa şema denetimi bu
    görevleri hiç görmezdi.
  - **🐛 Gerçek hata yakalanıp düzeltildi (linuxData.js):** apostrof kaçış hatası
    (`process'i` tek tırnaklı string içinde escape edilmeden) `node --check`i
    kırdı — CLAUDE.md §23.2'nin tam olarak uyardığı tuzak. Düzeltildi, tüm 6
    dosya `node --check` ile tek tek doğrulandı.
  - **🐛 İkinci hata (jenkins+linux, i18n scanner yakaladı):** 2 `prediction.code`
    alanı düz string olarak Türkçe-özgü karakter (`ğ`/`ş`) içeriyordu, EN modda
    sızıyordu — `{tr,en}` bilingual yapıldı.
  - **🔍 Üçüncü, scanner'ın YAKALAYAMADIĞI bir kör nokta elle bulundu (CLAUDE.md
    §23.1'in tarif ettiği tam senaryo):** 13 tane daha `prediction.code` alanı
    ASCII-normalize Türkçe kullanıyordu (`ayni`, `farkli`, `cozuldu`,
    `yapistirildi` gibi — Türkçe-özgü karakter YOK, otomatik tarayıcı bunları
    göremiyor). Referans selenium mission'ı da bu kalıbı kullanıyordu (muhtemelen
    aynı kör noktaya sahip, dokunulmadı — kapsam dışı). Kendi 13 alanımın
    HEPSİ elle `{tr,en}` bilingual yapıldı — artık EN modda gerçekten İngilizce.
  - **🎯 Dördüncü, kendi kendine yapılan kalite denetimi (istenmedi ama proaktif
    yapıldı):** `audit-learning-blocks.mjs`nin `positionDist` çıktısı, YENİ
    eklenen 18 prediction'ın HEPSİNDE doğru cevabın "a" (ilk seçenek) pozisyonunda
    olduğunu gösterdi — NEXT_SESSION geçmişinde daha önce flag'lenen "hep B"
    gaming riskinin bu kez "hep A" versiyonu. 18 sorunun 12'sinde seçenek sırası
    elle karıştırılıp **6/6/6 (a/b/c) dağılımına** getirildi (site geneli hâlâ
    B'ye kaymış durumda — bu ÖNCEDEN VAR olan, kapsam dışı bir borç, sadece
    kendi yeni 18 sorumun dağılımı düzeltildi).
  - **Doğrulama:** her dosya için `node --check` ✓ · content-integrity ✓
    (39 dosya) · i18n baseline 0 ✓ · audit-learning-blocks ✓ (mission:24,
    prediction:96, dağılım kendi 18'imde 6/6/6) · build ✓ (88 shell, dist-SEO
    geçti) · E2E 63/63 PASS (`mission-flow` referans testi + `topic-pages-ui`
    25 sayfa + `i18n-content-toggle` 32 test + `learning-blocks-render`/java 3).
  - **🔜 Sırada:** S3 (çerezsiz analytics), S4 (TR metadata cilası + mülakat
    dağılımı) — plan §7.3-§7.4, sırayla, kullanıcı onayı beklenmeden.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — SEO Faz 2 / S1 performans)

- **Aktif branch: `feature/seo-phase-2`.** Opus'un O1-O8 çekirdeğinin (aşağıda)
  hemen ardından, kullanıcı `Documents/seo-phase-2-plan.md`'deki Sonnet
  görevlerini (S1-S4) sırayla, sormadan, tamamına kadar uygulamamı istedi.
  **S1 — Performans/kod bölme TAMAMLANDI.**
  - **Sorun:** `/typescript`, `/java`, `/sql` sayfalarına girmek 850KB-1.1MB'lık
    TEK bir veri chunk'ının TAMAMEN indirilmesini gerektiriyordu — kullanıcı bir
    seferde tek sekme görürken 17-25 sekmenin verisi senkron iniyordu (mobilde
    LCP'yi düşürüyordu).
  - **Mimari karar (plan §7.1'in "davranış değişmeyecek" kısıtına uyularak):**
    `TopicPage.jsx`'e (21.697 satır, renderBlock/quiz motoru) **HİÇ
    DOKUNULMADI** — bunun yerine 3 sayfanın WRAPPER bileşeni (`TypeScriptPage.jsx`,
    `JavaPage.jsx`, `SQLPage.jsx`) değiştirildi:
    1. `scripts/generate-data-stubs.mjs` (yeni, build zincirine eklendi) —
       kaynak `<name>Data.js` dosyasına HİÇ dokunmadan, onu dinamik `import()`
       ile okuyup SADECE `hero` + `tabs` (sekme etiketleri) + BOŞ `sections`
       içeren minik bir "stub" (`<name>DataStub.js`, ~2-2.4KB) üretir. Kaynak
       dosyalar hâlâ TEK doğruluk kaynağı (CLAUDE.md §5) — stub asla elle
       düzenlenmez, her `npm run build`'de ve `npm run dev` öncesinde (`predev`)
       GÜNCEL kaynaktan yeniden üretilir.
    2. Wrapper bileşenleri artık `data={pageData}` kullanır: `useState(stub)`
       ile SENKRON hızlı ilk boya, `useEffect`'te GERÇEK veri dosyası dinamik
       `import()` ile arka planda yüklenip `setPageData(fullData)` ile
       değiştirilir. Yüklenirken küçük bir "İçerik yükleniyor…" pill gösterilir
       (`data-testid="topic-content-loading"`, TopicPage'e DOKUNMADAN, wrapper'ın
       kendi JSX'inde sibling olarak).
  - **Neden "sekmeye tıklanınca" değil "mount sonrası arka planda" yükleme
    seçildi (plan §7.1'den bilinçli sapma):** `activeTab` state'i TopicPage
    İÇİNDE yaşıyor, wrapper'dan görünmüyor; ayrıca `location.state.openTab` ile
    DOĞRUDAN N. sekmeye deep-link YAPILABİLİYOR (HomePage resume banner,
    MentorPanel önerileri — `mentorAdvice.js`'de `/sql` openTab:4, `/java`
    openTab:2 gibi). "Sadece tıklanan sekmeyi yükle" tasarımı TopicPage'in
    `sections[activeTab]` senkron okuma sözleşmesine dokunmayı gerektirirdi —
    riskli. Bunun yerine: arka plan yüklemesi MOUNT'ta hemen başlar (kullanıcı
    eylemine bağlı değil), tipik ağ gecikmesi insan tepki süresinden kısa
    olduğundan pratikte "tıklamadan önce zaten hazır" davranışına çok yakın
    sonuç verir, ama TopicPage'in senkron okuma varsayımını hiç bozmaz.
  - **`check-content-integrity.mjs`/`check-i18n-leaks.mjs` etkilenmedi:** stub
    dosyaları `*Data.js` glob filtresine (`f.endsWith('Data.js')`) UYMUYOR
    (`*DataStub.js`), bilinçli olarak — içerikleri zaten kaynak dosyada
    denetleniyor, aynı metni ikinci kez farklı bir dosyada "ilişkisiz kopya"
    olarak işaretletmemek için. `generate-static-routes.mjs` ve
    `audit-learning-blocks.mjs`/`check-i18n-leaks.mjs` HÂLÂ orijinal
    `typescriptData.js`/`javaData.js`/`sqlData.js`'i import ediyor —
    crawler'a giden statik shell'ler ve tüm Node script'leri TAM içeriği
    görüyor, sadece GERÇEK TARAYICI kullanıcısı hızlı stub + arka plan
    yüklemesi deneyimliyor.
  - **Ölçüm (önce/sonra, ilk boya için gereken senkron JS):**

    | Sayfa | ÖNCE (route chunk + veri chunk senkron) | SONRA (ilk boya için senkron) | Azalma |
    |---|---|---|---|
    | `/typescript` | ~1.1 MB (typescriptData 1,115.86 kB) | 15.70 kB (`TypeScriptPage-*.js`, stub dahil) | ~%98.6 |
    | `/java` | ~962 KB (javaData 961.87 kB) | 17.43 kB (`JavaPage-*.js`, stub dahil) | ~%98.2 |
    | `/sql` | ~867 KB (sqlData 866.60 kB) | 16.01 kB (`SQLPage-*.js`, stub dahil) | ~%98.2 |

    Doğrulama: `dist/assets/TypeScriptPage-*.js` içinde `import("./typescriptData-*.js")`
    çağrısının `useEffect` GÖVDESİNDE olduğu build çıktısından grep ile teyit
    edildi (statik değil, gerçekten ertelenmiş dinamik import). Veri
    dosyalarının KENDİSİ değişmedi (hâlâ 866KB-1.1MB) — toplam indirilen bayt
    aynı kalır, sadece İLK BOYA için gereken KRİTİK YOL küçüldü.
  - **Riskli senaryo elle doğrulandı:** `mentor-panel.spec.ts`'teki
    `openTab:2` deep-link testi (`/java`'ya tab 2 açık gelip "Önce Tahmin Et"
    prediction bloğunun 30s içinde görünmesini bekliyor — bu test ZATEN yavaş
    chunk yüklemesini tolere edecek şekilde yazılmıştı) **PASS** — arka plan
    yüklemesi + `toBeVisible` polling'i bu senaryoyu sorunsuz kapsıyor.
  - **Doğrulama:** content-integrity ✓ (39 dosya, stub'lar glob dışı) ·
    i18n baseline 0 ✓ · audit-learning-blocks ✓ · build ✓ (88 shell, dist-SEO
    geçti, static shell'ler hâlâ TAM içerik gösteriyor) · **E2E 81 PASS / 0
    FAIL** (topic-pages-ui 25 tam sayfa taraması + typescript/sql tab-tıklama
    testleri 2 + mentor-panel openTab dahil 5 + learning-blocks-render/java 3 +
    mission-flow/selenium 1 + i18n-content-toggle 32 tam paket + önceki S1
    öncesi genel regresyon çakışan testler).
  - **🔜 Sırada:** S2 (`mission` yayılımı), S3 (analytics), S4 (TR metadata
    cilası + mülakat dağılımı) — plan §7.2-§7.4'teki promptlarla sırayla
    devam ediliyor, kullanıcı onayı beklenmeden.

---

## 📌 Önceki Durum (2026-08-01, Opus — SEO Faz 2 / dil-ayrık URL)

- **Aktif branch: `feature/seo-phase-2`** (`main`'den açıldı; `feature/sprint-simulator`
  merge edilmiş durumda, `6ab2254`). Kullanıcı `Documents/` altındaki 21 plan
  dosyasının denetlenmesini ve fikir/öneri istedi. **Ölçüm sonucu: içerik borcu
  KAPANMIŞ** (mülakat 25/25 sayfa ≥50 soru · animasyon kapsamı %100, 0 açık ·
  interaktif üçlü 0 boşluk · i18n baseline 0). Yani "daha çok içerik" artık en
  yüksek getirili iş değil. Yeni plan: **`Documents/seo-phase-2-plan.md`**.

- **🔴 Bulunan kritik açık — Türkçe içerik Google'da HİÇ YOKTU:** `index.html`
  `<html lang="en">`, `seo.js`'teki 44 route'un TAMAMININ metadata'sı İngilizce,
  statik shell gövdesi de İngilizce (`textValue()` daima `.en` seçiyordu) — ama
  varsayılan arayüz dili `tr`. Google her sayfayı İngilizce sanıp doymuş
  İngilizce sorgularda yarıştırıyordu; "selenium nedir", "playwright türkçe
  eğitim" gibi asıl fırsat sorgularında indekslenecek Türkçe URL yoktu.

- **✅ FAZ 2 OPUS TARAFI TAMAMLANDI (O1-O8):**
  - **Mimari karar (plan §2):** çıplak path = **TR**, `/en/<path>` = **EN**
    (Seçenek A). Gerekçe: mevcut URL otoritesi korunur, çıplak URL'in dili
    varsayılan arayüz diliyle eşitlenir, GitHub Pages'te ek altyapı gerekmez.
    `/tr` prefix'li Seçenek B reddedildi — GitHub Pages'te server redirect yok.
  - **Uygulama tekniği:** `main.jsx`'te URL `/en` ile başlıyorsa
    `<BrowserRouter basename="/en">`. **`App.jsx`'e HİÇ DOKUNULMADI** — 43 lazy
    route ikilenmedi, `check-seo.mjs`'in `<Route path>` ayrıştırması bozulmadı ve
    tüm `<Link to>` / `useNavigate` çağrıları otomatik `/en` öneki aldı.
    Doğrulandı: kodda router'ı atlayan ham `<a href="/...">` YOK.
  - **Dil otoritesi URL'e geçti (§2.2):** `localStorage.language` artık dili
    BELİRLEMEZ, yalnızca yansıtır. Otomatik yönlendirme bilinçli olarak
    EKLENMEDİ (39 E2E spec'inde sürpriz kırılma üretirdi). Dil düğmesi artık
    URL değiştirir (`window.location.assign`) — `basename` mount anında
    sabitlendiği için tam navigasyon zorunlu.
  - `seo.js`: `LOCALES`/`DEFAULT_LOCALE`/`EN_PREFIX` + her route'a `tr:{title,
    description}` (44 route için TR metadata yazıldı) + `localeFromPathname`,
    `stripLocalePrefix`, `localizedPath`, `seoFor`, `alternatesFor`.
    `getSeoForPath` artık TAM pathname alır.
  - `SeoMeta.jsx`: dile göre meta + `<html lang>` + `hreflang` (tr/en/x-default)
    + `og:locale`. `generate-seo-files.mjs`: sitemap **44 → 88 URL**, her girdide
    `xhtml:link` alternates.
  - `generate-static-routes.mjs`: shell'ler **iki dilde** üretiliyor
    (`dist/<route>` + `dist/en/<route>`) = **88 shell**. TR gövde metni ELLE
    YAZILMADI, `textValue(value, locale)` ile mevcut bilingual veriden geliyor;
    script içindeki sabit İngilizce arayüz metinleri iki dilli yapıldı.
    `/java-document` ve `/git-document` TR'de `*_tr.md` dosyalarını okuyor.
  - **JSON-LD zenginleştirme:** `FAQPage` mülakat sorularından otomatik üretiliyor
    (`interview-questions` blokları, dile uygun `q`/`a`, ilk 10 soru) + `Course`
    şeması. Ölçülen sonuç: **56 sayfada FAQPage, 68 sayfada Course** (önceden 0).
  - `check-seo.mjs`: TR metadata zorunlu, uzunluk sınırları İKİ dilde de kontrol,
    **duplicate description** kontrolü ve "TR metadata İngilizceyle özdeş mi"
    kontrolü eklendi. `check-dist-seo.mjs`: her route iki dilde de üretilmiş mi,
    `<html lang>` doğru mu, hreflang üçlüsü tam mı — hepsi hard-fail.
  - `tests/seo-i18n-routing.spec.ts` (yeni, 6 test) — **6/6 PASS.**
- **🐛 Regresyonun yakaladığı gerçek kırılma (düzeltildi):**
  `homepage-recommended-badges.spec.ts` EN testi `a[href="/what-is-testing"]`
  selector'ı kullanıyordu; EN modda href artık `/en/what-is-testing` olduğu için
  kırıldı. Selector `href$=` yapıldı — testin kodladığı eski varsayım güncellendi,
  davranış doğru.
- **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ ·
  audit-learning-blocks ✓ (mission:18, prediction:78) · audit-interview-questions ✓ ·
  build ✓ (88 shell, 88 sitemap URL, dist-SEO geçti) · **E2E toplam 196 PASS, 0 FAIL**
  (seo-i18n-routing 6 · i18n-content-toggle 32 · topic-pages-ui + other-pages-ui +
  mission-flow + sprint-flow + theme-accessibility + mobile-smoke 53 · lesson-completion
  + term-tooltip + quiz-retry + learning-blocks-render + career-map(+milestones) +
  tooltip-guide-mascot + video-scene 98 · daily-loop + review-queue + mentor-* +
  code-playground + sql/js/ts-page + tr-code-comments 28 · sandbox'lar + lab'lar +
  roadmap-order 15 — sayımda homepage-badges'ın 2'si düzeltme sonrası ayrıca koşuldu).
  Auth gerektiren suite'ler (§23.8) koşturulmadı.
- **Kalıcı kurallar yazıldı:** `codexSeo.md` **§0** (dil-ayrık URL mimarisi, tam
  kural seti) + `CLAUDE.md` §6 (iki dilli metadata zorunluluğu) ve §11'e 2 yeni
  "yapma" maddesi.
- **🔜 Sırada — Sonnet promptları planın §7'sinde HAZIR:** S1 performans/kod bölme
  (TopicPage chunk 1.6 MB, typescriptData 1.1 MB), S2 `mission` yayılımı (25
  sayfadan sadece 6'sında var), S3 çerezsiz analytics (sitede HİÇ analytics yok),
  S4 TR metadata kalite geçişi + `/postman` ve `/playwright` mülakat dağılımı.
- **🔜 Kullanıcı (Hasan) tarafı, planın §5'i:** deploy sonrası GSC'ye sitemap'i
  YENİDEN GÖNDER (88 URL, `/en/*` kümesi yeni), 1-2 hafta sonra hreflang
  hatalarını GSC'den doğrula, analytics hesabı aç. **Ayrıca hâlâ açık:**
  `sprint-simulator-and-open-items-plan.md` §5'teki 4 madde (edge function
  deploy'ları, social-proof RPC, trending-skills aktivasyonu) — bu plan onları
  kapatmaz.
- **Açık iş:** `main`'e merge kararı kullanıcıda. Merge öncesi plan §8'deki
  9 adımlı manuel test rehberi uygulanmalı.

---

## 📌 Önceki Durum (2026-08-01, Opus — /sprint UX düzeltmesi)

- **Aktif branch: `feature/sprint-simulator`.** Kullanıcı `/sprint`'i elle gezerken
  **gerçek bir UX bug'ı bildirdi:** "Görevi aç"a basınca hiçbir şey olmuyor gibi
  görünüyor. **Teşhis:** state DOĞRU değişiyordu (kart seçiliyor, panel render
  ediliyor) ama bug detay paneli Kanban panosunun ALTINDA duruyor ve hiçbir
  scroll yapılmıyordu — kullanıcı ekranın altındaki paneli hiç görmüyordu.
  `renderBlock` imzası/köprüsü sağlamdı, sorun tamamen görünürlüktü.
  - **Düzeltme 1 — göreve kaydırma:** `SprintPage.jsx`'e `bugDetailRef` +
    `selectedBugId` değişince `scrollIntoView({behavior:'smooth',block:'start'})`
    eklendi; section'a `scroll-mt-24` (TopicHeader `sticky top-0` olduğu için
    panelin üstü header'ın altında kalmasın diye).
  - **Düzeltme 2 — bağlama duyarlı rehber maskot:** Kullanıcı "ne yapması
    gerektiğini tarif eden bir maskot" istedi. **Yeni bileşen YAZILMADI** —
    mevcut `TooltipGuideMascot.jsx` props'landı (`message`/`emoji`/`ariaLabel`/
    `initiallyOpen`); TÜM props opsiyonel ve varsayılanları eski davranışın
    birebir aynısı, yani mevcut 3 giriş sayfası hiç etkilenmedi. `/sprint`'te
    🐞 maskotu balonu AÇIK başlar ve pano durumuna göre 5 fazda TEK bir
    sonraki adımı söyler (Backlog'dan çek → Görevi aç → adım kilidi/mini-lesson
    → Sprint'i kapat → sprint kapandı). Balon açık kaldığı sürece metin canlı
    güncellenir.
  - **`tests/sprint-flow.spec.ts`'e 4. test eklendi** — maskotun faz faz doğru
    metni verdiği + "Görevi aç"ın paneli GERÇEKTEN viewport'a getirdiği
    (`toBeInViewport()`). **Testin dişi doğrulandı:** `scrollIntoView` geçici
    olarak kapatılıp test'in KIRILDIĞI görüldü, sonra geri alındı.
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell) · `sprint-flow.spec.ts` 4/4 ✓ · `tooltip-guide-mascot.spec.ts`
    regresyon 6/6 ✓ (toplam 10/10).
  - **Açık iş:** `main`'e merge/PR kararı hâlâ kullanıcıda.

- **Aynı gün, ikinci tur — Gherkin anahtar kelimeleri (kullanıcı raporu):**
  Kullanıcı `/sprint` görevindeki Gherkin bloğunda anahtar kelimelerin
  Türkçeleştirildiğini gördü (`Senaryo:`, `Diyelim ki`, `Ve`, `O zaman`).
  Kural (CLAUDE.md §8): dilin KENDİ sözdizimi, TR sayfada bile İngilizce kalır.
  - **`sprintsData.js` — 18 blok düzeltildi** (6 mission × code/starterCode/
    solutionCode). **Yan bulgu:** `When` satırı 18 bloğun HEPSİNDE tamamen
    DÜŞMÜŞTÜ (adım anahtar kelimesizdi) — bloklar geçerli Gherkin bile değildi;
    dönüşüm sırasında eklendi. Mekanik dönüşüm önce dry-run ile gözle
    doğrulandı (CLAUDE.md §23.3), rakamla başlayan adım satırı korundu.
  - **`gaugeData.js`** (film `code` alanı + eşlik eden aktör etiketi) ve
    **`claudeAiData.js`** (prompt şablonundaki `Özellik:` → `Feature:`) de
    düzeltildi. Düz Türkçe başlıklar ("Senaryo: EC2'de Selenium Grid",
    `manualTestingData.js`'in "Özellik: Kahve Yap" etiketi) Gherkin DEĞİLDİR,
    dokunulmadı.
  - **Hover açıklaması (kullanıcı isteği):** Kod bloklarına tooltip mimari
    olarak bağlanamıyor (`highlightGlossaryTerms` `<pre>` içeriğini asla
    sarmaz), bu yüzden anahtar kelime açıklaması 6 gherkin bloğunun
    **`explanation` alanına** iki dilli olarak eklendi (blok render'ında kodun
    hemen üstünde çıkar). `termGlossary.js`'e `gherkin` + `cucumber` terimleri
    eklendi; `Given/When/Then/And` BİLEREK eklenmedi — EN modda her cümlede
    altları çizilirdi (dosyanın "aşırı yaygın kelime ekleme" kuralı).
  - **Kalıcı kontrol eklendi:** `check-content-integrity.mjs` **Kontrol [G]**
    (`checkGherkinKeywords`) — build + pre-commit'te hard-fail. İlk yazımında
    12 yanlış-pozitif verdi (düz Türkçe başlıklar), daraltıldı: bir string
    ancak çok satırlı olup adım satırı içeriyorsa ya da bir kod alanına
    yazılmışsa denetlenir. **Dişi doğrulandı** — geçici sonda dosyasıyla 4
    anahtar kelimenin de yakalandığı görüldü, sonra silindi.
  - **CLAUDE.md güncellendi:** §23.9 (kök neden/çözüm/önleme) + §11'e hata maddesi.
  - **Doğrulama:** content-integrity ✓ (0 ihlal, [G] dahil) · i18n baseline 0 ✓ ·
    audit-learning-blocks ✓ · build ✓ (44 shell) · `sprint-flow.spec.ts` 4/4 ✓ ·
    `term-tooltip.spec.ts` regresyon 2/2 ✓.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Test kapsamı S4)

- **Aktif branch: `feature/sprint-simulator`.** Plan §6.3'teki Sonnet promptu
  uygulandı: **S4 — Test kapsamı boşlukları (mobil viewport + çapraz tarayıcı)
  TAMAMLANDI.** `Documents/testcoverage.md` (2026-07-03, bayat) yerine önce
  `tests/` klasörü elle tarandı — mobil kapsamın hâlâ sadece `/` ve `/docker`
  olduğu doğrulandı, çapraz tarayıcı project'i hiç yoktu.
  - **S4.1 — Mobil viewport genişletme:** `tests/mobile-smoke.spec.ts`'e 6 yeni
    route eklendi (`/python`, `/java`, `/sql` — dil sayfaları; `/selenium`,
    `/jenkins`, `/kubernetes` — araç sayfaları), `/` + `/docker` ile birlikte
    **toplam 8 sayfa**. Her route için: yatay kayma yok (CLAUDE.md §12), ilk
    sidebar sekmesi WCAG 2.5.5 36px dokunma hedefini karşılıyor, sekmeye
    dokunma sayfayı bozmuyor, console/page hatası yok. §22.1 istisna listesi
    (`/basit-backend`, `/security`, `/backend`) EKLENMEDİ. **8/8 PASS.**
  - **S4.2 — Çapraz tarayıcı (Firefox + WebKit):** Ana `playwright.config.ts`
    DEĞİŞTİRİLMEDİ (hâlâ sadece chromium, `npm run test:e2e` süresi etkilenmedi)
    — mevcut `playwright.quiz-audit.config.ts`/`playwright.interview-flows.config.ts`
    kalıbı izlenerek **ayrı** `playwright.cross-browser.config.ts` (yeni) +
    `tests-cross-browser/cross-browser-smoke.spec.ts` (yeni) eklendi. Sadece
    temsili 2 sayfa (`/` + `/docker`, CLAUDE.md §22 kalıbı) Firefox + WebKit
    project'lerinde SMOKE seviyesinde doğrulanıyor (derinlik değil, tarayıcıya
    özgü render/etkileşim kırılması riski). `npm run test:cross-browser`
    script'i eklendi (`package.json`). Firefox + WebKit browser binary'leri
    `npx playwright install` ile kuruldu. **4/4 PASS** (2 test × 2 tarayıcı).
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell, `playwright.config.ts` değişmedi) · mobile-smoke genişletilmiş
    8/8 PASS · cross-browser-smoke 4/4 PASS.
  - **✅ PLANDAKİ TÜM SONNET GÖREVLERİ (S1-S4) TAMAMLANDI.** Kalan tek kalem
    Faz 3 (Kullanıcı/Hasan'ın deploy/doğrulama açık uçları, plan §5) — kod işi
    değil, credential/panel işi.
  - **Açık iş:** `main`'e merge/PR kararı kullanıcıda.

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Career Map Faz 2 S3)

- **Aktif branch: `feature/sprint-simulator`.** Plan §6.2'deki Sonnet promptu
  uygulandı: **S3 — Career Map Faz 2 (milestone/rozet + breadcrumb) TAMAMLANDI**
  (`Documents/career-map-feature-plan.md` §4.3/§4.4c). MVP'ye (v2 sorular,
  localStorage kalıcılığı, `estimatedHours`, `trackMapEvent`) DOKUNULMADI,
  üstüne kuruldu.
  - **S3.1 — Milestone/rozet sistemi:** `src/utils/careerMapMilestones.js`
    (yeni) — 5 milestone tanımı (plan §4.3 tablosu birebir): 🏁 İlk adım
    (haritanın ilk düğümü tamamlandı), 🏁 Kod yazan testçi (Java/Python/TS'ten
    biri), 🏁 Otomasyoncu (Selenium/Playwright'tan biri), 🏁 Full-stack tester
    (Postman/REST Assured + SQL), 🏆 SDET yolu tamam (ana yol düğümlerinin
    %80'i). Tamamen local-first, KENDİ ilerleme state'i TUTMAZ — mevcut
    `getLocalCompletedRoutes()`'tan HER render'da yeniden türetilir (tek
    doğruluk kaynağı ilkesi, CLAUDE.md §23.4). Ayrı bir `learnqa_map_milestones`
    anahtarı SADECE "bu milestone daha önce kutlandı mı?" bilgisini tutar (xp.js
    `completed` ilkesiyle aynı desen — konfeti/`trackMapEvent('milestone_earned')`
    bir kez tetiklensin diye).
    - **Not (dürüst sadeleştirme):** Plandaki "İlk quizin çözülmesi" tetikleyicisi
      mevcut altyapıda YOK (yalnızca route-seviyeli tam tamamlanma izleniyor) —
      "İlk adım" milestone'ı haritanın ilk düğümünün TAMAMEN bitmesine bağlandı.
    - `QAMentorPage.jsx`'e `MilestoneStrip` alt bileşeni eklendi (`MindMapView`
      içinde, süre rozeti bloğunun hemen ardında) — kazanılan/kazanılmayan
      rozetler renk farkıyla gösterilir, yeni kazanımda `ConfettiExplosion`.
  - **S3.2 — Ders sayfasında "haritanda neredesin" breadcrumb'ı:**
    `TopicHeader.jsx`'e `useMapBreadcrumb()` eklendi — `TopicHeader` TÜM ders
    sayfalarında (TopicPage üzerinden ~25 teknoloji sayfası + Algorithms/
    ManualTesting/WhatIsTesting) paylaşıldığından buraya eklemek TEK NOKTADAN
    tüm sitede yayılım sağladı. **`TopicPage.jsx`'in quiz motoruna
    DOKUNULMADI** (plan kısıtı). `/qa-mentor`, `/leaderboard`,
    `/verify-certificate`, `/qa-assistant`, `/sprint` hariç tutuldu (harita
    düğümü değiller). Breadcrumb'a tıklayınca `/qa-mentor`'a gider.
  - **`tests/career-map-milestones.spec.ts` (yeni, 4 test):** milestone
    kazanımı (first-step + code-writing-tester kazanılır, diğerleri
    kazanılmaz), breadcrumb doğru pozisyon gösterir + tıklanınca /qa-mentor'a
    gider, profil yokken breadcrumb hiç görünmez, /qa-mentor'da breadcrumb
    kendisi görünmez. **4/4 PASS.**
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ · build ✓
    (44 shell) · yeni testler 4/4 ✓ · regresyon `career-map.spec.ts` (12) +
    `qa-mentor-progress-tracking.spec.ts` (1) + `qa-mentor-roadmap-order.spec.ts`
    (1) = **14/14 PASS** (hiç kırılma yok).
  - **S3.3 (opsiyonel, planda "en son" işaretli) YAPILMADI:** paylaşılabilir
    harita görseli (`<canvas>` + `toDataURL()`) — düşük öncelik, istenirse
    ayrı bir oturumda eklenebilir.
  - **🔜 Sırada (plan §6.3, Sonnet promptu hazır):** S4 test kapsamı boşlukları
    (mobil viewport genişletme + çapraz tarayıcı).

---

## 📌 Önceki Durum (2026-08-01, Sonnet — Sprint içerik genişletme S1)

- **Aktif branch: `feature/sprint-simulator`.** Opus'un Faz 1 çekirdeğinin
  (aşağıda) hemen ardından, plan §6.1'deki Sonnet promptu uygulandı: **S1 —
  Sprint içerik genişletme + HomePage giriş kartı TAMAMLANDI.**
  - **`src/data/sprintsData.js`'e 2 yeni bug eklendi (Sprint 1 → 4 bug):**
    LQA-103 (ödeme butonuna çift tıklayınca sipariş iki kez oluşuyor —
    idempotency key + veritabanı UNIQUE constraint, check-then-act yarış durumu
    dersi), LQA-104 (süresi geçmiş kupon hâlâ geçerli — istemciden gelen tarihe
    güvenmeme + test verisinde deterministik/sabit tarih kullanma dersi).
  - **Yeni `sprint-2` eklendi** ("API Performans ve Güvenilirlik", ShopLab
    Platform/Backend ekibi, 2 bug): LQA-201 (ürün listesi N+1 sorgu — REST
    Assured `.time(lessThan(...))` + donanımdan bağımsız sorgu-sayısı
    assertion'ı dersi), LQA-202 (eşzamanlı sipariş istekleri stoğu negatife
    düşürüyor — `CountDownLatch` ile gerçek eşzamanlılık testi + atomik
    `UPDATE ... WHERE stok > 0` çözümü, LQA-103'teki check-then-act dersinin
    farklı bir alanda tekrarı).
  - **🐛 Gerçek bug bulundu ve düzeltildi (kapsam dışı ama zorunlu):** Sprint 2
    eklenince `SprintPage.jsx` hâlâ sabit `sprintsData.sprints[0]` gösteriyordu
    — yeni sprint hiçbir zaman ERİŞİLEMEZ olurdu. `SprintPage.jsx`'e sprint
    seçici (tab bar, `data-testid="sprint-tab"`) eklendi; sprint değişince bug
    detay paneli kapanır. Bu değişiklik plan promptunun orijinal dosya kapsamı
    dışındaydı ama içerik eklemenin doğal sonucu olarak zorunluydu.
  - **`src/components/HomePage.jsx`'e "QA Sprint Simülatörü" giriş kartı
    eklendi** — mevcut `resume-banner` statik kalıbı KOPYALANDI (yeni tasarım
    icat edilmedi), amber/orange renk şeması ile ayrıştırıldı.
  - **Yan iyileştirme — denetim tutarlılığı:** Yeni prediction'ların doğru şık
    pozisyonları bilinçli çeşitlendirildi (A/B/C dağılımı), "hep B" gaming
    riskini büyütmemek için (bkz. §23'teki bilinen 47/50 uyarısı — bu artık
    Sprint bloklarında tekrarlanmadı).
  - **`tests/sprint-flow.spec.ts`'e 3. test eklendi:** sprint sekmesi
    değiştirince farklı sprint'in bug'ları gösteriliyor mu (yukarıdaki
    SprintPage bug'ının regresyon testi). **3/3 PASS.**
  - **Doğrulama:** `node --check sprintsData.js` ✓ · content-integrity ✓
    (39 dosya) · i18n baseline 0 ✓ · audit-learning-blocks ✓ (mission:18,
    prediction:78, 0 ihlal) · build ✓ (44 shell) · `sprint-flow.spec.ts` 3/3 ✓ ·
    `homepage-recommended-badges.spec.ts` regresyon 2/2 ✓.
  - **🔜 Sırada (plan §6.2/§6.3, Sonnet promptları hazır):** S3 Career Map
    Faz 2 (milestone/rozet + breadcrumb), S4 test kapsamı (mobil viewport +
    çapraz tarayıcı).

---

## 📌 Önceki Durum (2026-08-01, Opus — Sprint Simulator Faz 1)

- **Aktif branch: `feature/sprint-simulator`** (`main`'den açıldı). Kullanıcı
  `Documents/` altındaki 20 plan dosyasının denetlenmesini ve açık kalan işler
  için yeni bir plan + Opus/Sonnet görev dağılımı istedi. Yeni plan:
  **`Documents/sprint-simulator-and-open-items-plan.md`**.
  - **✅ FAZ 1 — QA SPRINT SIMULATOR (`/sprint`) OPUS TARAFI TAMAMLANDI (O1-O8):**
    - `src/lib/sprintStore.js` (yeni) — local-first pano durumu. **Tek-doğruluk
      ilkesi:** bug'ın "bitti" bilgisi BURADA TUTULMAZ, `xp.js`'ten türetilir
      (`getCompletedExercises`); depo yalnızca "sprint'e çekildi" + "sprint
      kapatıldı" tutar. İkinci bir tamamlanma state'i drift üretirdi (§23.4).
    - `src/components/TopicPage.jsx` — **tek satır:** `renderBlock` `export`
      edildi. Sprint sayfası bug görevlerinin gömülü bloklarını (code-playground,
      prediction…) AYNI makineden geçirir — kendi renderer'ını yazmak
      challenge-first'in "YENİ SANDBOX YAZMA" ilkesinin ihlali olurdu.
    - `src/components/SprintBoard.jsx` (yeni) — Kanban panosu (Backlog/In
      Progress/Done), bug kartı, severity rozeti. Saf Tailwind, dış paket yok.
    - `src/components/SprintPage.jsx` (yeni) — sayfa kabuğu, sprint özeti +
      ilerleme, bug raporu paneli, MissionBlock host'u, sprint kapanış töreni
      (bonus XP + konfeti + retrospektif + skill signal).
    - `src/data/sprintsData.js` (yeni) — Sprint 1 "Checkout Akışı Kararlılığı",
      2 referans bug. **BİR BUG = BİR MISSION**, 5 adım QA iş akışına birebir
      oturur: Analiz → Test Case → Otomasyon → CI → Merge. LQA-101 (sessiz login
      hatası, frontend 401'i yutuyor) + LQA-102 (bayat sepet toplamı). Tam
      bilingual, STRICT_ZERO.
    - Rota bağlandı: `App.jsx` (lazy+Route), `seo.js` ROUTE_SEO,
      `generate-static-routes.mjs` specialRouteContent, `CLAUDE.md` §2 route
      haritası. Build artık **44** statik shell üretiyor (43'ten +1).
    - `tests/sprint-flow.spec.ts` (yeni, 2 test) — veri-güdümlü E2E: 3 kolon
      render, "Sprint'e al" geçişi, adım kilidi, tüm bug'lar kapanınca Done +
      sprint kapatma + XP/localStorage + F5 kalıcılığı. **2/2 PASS.**
  - **🐛 Testin yakaladığı GERÇEK bug (düzeltildi):** `renderBlock`'un 2.
    parametresi React key'ine dönüşüyor; ilk yazımda sabit `0` verilmişti, bu
    yüzden React iki farklı bug'ın MissionBlock'unu aynı instance sanıp yeniden
    kullanıyor, önceki bug'ın "tamamlandı" state'i taşınıyor ve ikinci bug HİÇ
    tamamlanmış işaretlenmiyordu. Key `selectedBug.id` yapıldı.
  - **🔍 Yan bulgu — denetim kör noktası kapatıldı:** `audit-learning-blocks.mjs`
    prediction şema kontrolünü YALNIZCA dil sayfalarında (`FILES`) yapıyordu;
    mission içine gömülü prediction'lar (seleniumData, playwrightData,
    cypressData, restAssuredData, sprintsData) HİÇ doğrulanmıyordu — eksik
    `reveal` veya iki `correct` sessizce geçerdi. Kontrol `MISSION_FILES`'a da
    genişletildi: **denetlenen prediction 50 → 70**, hepsi şemayı karşılıyor.
  - **Doğrulama:** content-integrity ✓ (39 dosya) · i18n baseline 0 ✓ ·
    audit-learning-blocks ✓ (mission:14, prediction:70, 0 ihlal) · build ✓
    (44 shell, SEO geçti) · `tests/sprint-flow.spec.ts` 2/2 ✓ ·
    regresyon `mission-flow` + `learning-blocks-render` 4/4 ✓.
  - **🔜 Sırada (Sonnet promptları planın §6'sında HAZIR):** S1 sprint içerik
    genişletme (Sprint 1'e +2 bug, Sprint 2 API/performans temalı), S2 HomePage
    giriş kartı, S3 Career Map Faz 2 (milestone/rozet + breadcrumb), S4 test
    kapsamı (mobil viewport + çapraz tarayıcı).
  - **🔜 Kullanıcı (Hasan) tarafı, planın §5'i:** `explain-code-output` ve
    `mentor-advice` edge function deploy teyidi, social-proof RPC yeniden
    çalıştırma, trending-skills aktivasyon adımları.

---

## 📌 Önceki Durum (2026-08-01 — merge durumu doğrulandı)

- **✅ AKTİF BRANCH: `main`.** `feature/challenge-first` main'e merge edildi
  (`62dccf2 Merge branch 'feature/challenge-first'`). Ayrıca `frontenddevelopment-for-qa`
  (`/qa-frontend` sayfası) ve `feature/api-testing-page` (`/api-testing` sayfası)
  branch'leri de doğrulandı: ikisi de `main`'e göre 0 commit ileride — yani
  içerikleri zaten `main`'de. Aşağıdaki geçmiş girdilerdeki "main'e merge/PR
  kararı kullanıcıda" notları artık ÇÖZÜLMÜŞ durumda; yeni bir aksiyon gerekmiyor.
  Çalışma ağacı temiz.

- **Önceki iş (2026-07-31, Sonnet — Kavram Tooltip yoğunlaştırma, `feature/challenge-first`
  üzerinde yapıldı, artık main'de):** Mission Dalga 2'nin (aşağıda)
  hemen ardından, kullanıcı "kavram tooltip'i özellikle yeni başlayanlar için
  önemli, ilk girilen sayfalarda (Test Nedir, Manuel Test, Algoritma Temelleri,
  Java/TS/Python) daha yoğun olmalı" dedi. **Gerçek bir mimari boşluk
  bulundu:** `/manual-testing` ve `/algorithms` `TopicPage.jsx` kullanmıyordu
  (kendi özel component'leri var) — `highlightGlossaryTerms` bu iki sayfada
  HİÇ çalışmıyordu (0 tetikleyici, ölçüldü). Düzeltildi: `ManualTestingPage.jsx`
  (`InfoBox`) + `AlgorithmsPage.jsx` (`LessonCard`) render noktalarına
  `highlightGlossaryTerms` bağlandı; `termGlossary.js` 57→84 terime genişletildi
  (test temelleri, manuel test, algoritma, dil temelleri, ortam). Ölçülen etki:
  `/manual-testing` 0→33, `/algorithms` 0→7 tetikleyici. Detay: plan §3.6.4.
  Doğrulama: content-integrity + i18n baseline 0 + build + 2 E2E test regresyonu
  (term-tooltip + mission-flow, 3/3 PASS). Commit `8fe795e`.

- **Aynı gün, hemen ardından — Rehber Karakter (Mascot):** Kullanıcı "sevimli
  bir animasyon karakteri + konuşma balonu, bilmediğin kelimenin üstüne gel de
  görsün diye yönlendirsin" istedi. AskUserQuestion ile 3 tasarım kararı
  netleştirildi: sabit köşe (scroll takip ETMEZ), sadece 3 giriş sayfası,
  her ziyarette rozet + tıklayınca balon. `TooltipGuideMascot.jsx` (yeni,
  🦉 emoji + self-contained dark-mode algılama) yazıldı; `TopicPage.jsx`'e
  DOKUNULMADI (paylaşılan dosya), 3 sayfanın kendi wrapper'ına eklendi
  (`WhatIsTestingPage`/`ManualTestingPage`/`AlgorithmsPage`). **Gerçek
  tarayıcı testiyle bulunan bug:** ilk sürüm sol-alt köşedeydi, App.jsx'teki
  global `ChatWidget`'la (bottom-20 left-4) çakışıyordu (balon açılınca
  üstüne biniyordu) — sol kenar dikey-orta konuma taşınarak düzeltildi.
  `tests/tooltip-guide-mascot.spec.ts` (yeni, 5 test: 3 sayfa aç/kapa +
  kapsam-dışı sayfada yokluk + ChatWidget çakışma kontrolü) **5/5 PASS**.
  Doğrulama: content-integrity + i18n baseline 0 + build + mascot testi (5/5)
  + term-tooltip/mission-flow regresyonu (3/3) — hepsi geçti. Detay: plan §3.6.5.

- **Aynı gün, üçüncü tur — Dikkat Çekme Animasyonu:** Kullanıcı "maskot ilk
  sayfa açılışta yanıp sönsün, kullanıcı bir defa tıklayınca boyutuna geri
  dönsün ve sadece sabit kalsın" istedi. `hasInteracted` state eklendi: rozet
  İLK tıklamaya kadar sürekli yanıp söner (`tooltipGuideAttention`, ölçek+
  opaklık pulse, 1.1sn), ilk tıklamadan SONRA kalıcı olarak durur + normal
  boyutuna döner. **2 gerçek bug bulunup düzeltildi:** (1) `@keyframes`
  tanımı yanlışlıkla sadece balonun içindeydi — rozet balon açılmadan ÖNCE
  yanıp sönmesi gerektiğinden dışarı taşındı; (2) rozet sürekli pulse ettiği
  için Playwright'ın "stable" actionability kontrolü ilk tıklamada asla
  geçmiyordu (test timeout) — gerçek kullanıcıyı ETKİLEMEZ, test'te ilk
  tıklama `force:true` ile düzeltildi. `tooltip-guide-mascot.spec.ts`'e yeni
  test eklendi (animasyon öncesi/sonrası + boyut kontrolü). **6/6 PASS**
  (temiz/tek-worker koşumda; art arda çok test dev server'ı meşgul edip
  transient timeout verebiliyor — mascot mantığıyla ilgisiz, bilinen not).
  Doğrulama: content-integrity + i18n baseline 0 + build + mascot testi (6/6)
  + term-tooltip/mission-flow regresyonu (3/3) — hepsi geçti. Detay: plan §3.6.5.

- **Önceki iş (aynı gün) — Mission Dalga 2:** Phase 1 + Phase 1.5 önceki
  oturumda TAMAMLANMIŞTI (6 sayfa × 1 mission + kavram tooltip'i). Bu oturumda
  kullanıcı "bu görevleri ne kadar genişletebilirsin, her dikey sekmede
  uygulanabilir mi?" diye sordu. Değerlendirme: teknik engel yok ama HER
  sekmede zorlama görev, kullanıcının orijinal stratejik yazısının uyardığı
  "özellik sayısı, derinlik değil" tuzağına düşer — sadece "aksiyon" sekmeleri
  (Framework Mimarisi, Network, Troubleshooting, JOINs, Test Zinciri gibi)
  buna uygun. Kullanıcı **"mevcut 6 sayfada, aksiyon sekmelerine +1-2 görev"**
  seçeneğini onayladı.
  - **✅ MISSION DALGA 2 TAMAMLANDI — 6 sayfanın HER BİRİNE ikinci bir görev
    eklendi** (plan §9.2 Dalga 2 tablosu, 6 ayrı commit):
    1. **Selenium** → Framework Mimarisi (SOLID+POM) sekmesi: "Ham testi POM'a
       refactor et" (`selenium-pom-refactor-mission`) — locator tekrarının
       riski (prediction) → LoginPage sınıfı yaz → login() metodu yaz →
       bakım maliyeti 10→1 dosya (prediction) → testi Page Object'le yeniden yaz.
    2. **Playwright** → Framework Mimarisi sekmesi: aynı POM teması TypeScript
       karşılığı (`playwright-pom-refactor-mission`) — sekmenin zaten
       derinlemesine işlediği fixture/DI konusuyla ÇAKIŞMAZ.
    3. **Cypress** → Network & cy.intercept() sekmesi: "Yavaş API'yi stub'la,
       loading/hata durumunu test et" (`cypress-network-stub-mission`) — farklı
       tema (network stubbing). ⚠️ **Gerçek bug yakalandı:** bu sekme (s5)
       ÇİFT-AĞAÇLI, ilk yazımda görev SADECE EN ağacına gitmişti, doğrulama
       sırasında TR ağacına da eklendi.
    4. **Python** → Troubleshooting/Yaygın Hatalar sekmesi: "CI'da patlayan
       traceback'i oku, kök nedeni bul, düzelt" (`python-traceback-debug-mission`)
       — stepAnimationTracebackReading'in "en alttan oku" kalıbını uygulamalı
       yapıyor. `finalEnSections`/`finalTrSections`'a (Dalga A8 güvenli kalıp).
    5. **SQL** → SQL JOINs sekmesi: "Sipariş verisinde yetim kayıt bul"
       (`sql-orphan-orders-mission`) — LEFT JOIN + WHERE IS NULL idiyomu.
    6. **REST Assured** → Test Zinciri sekmesi: "Kullanıcı oluştur, id çıkar,
       GET ile doğrula" (`restassured-chain-mission`) — sekmenin zaten
       gösterdiği tam `UserCrudE2ETest` zincirinin en küçük yapı taşı.
  - **Toplam mission sayısı: 6 → 12** (`audit-learning-blocks.mjs` çıktısı).
  - **Doğrulama (her commit'te ayrı ayrı):** content-integrity ✓ · i18n
    baseline 0 ✓ · audit-learning-blocks (mission:12, 0 ihlal) ✓ · build ✓
    (43 shell) · `tests/mission-flow.spec.ts` regresyon testi (Selenium'da
    artık 2 mission var, test hâlâ doğru olanı — Locators'takini — bulup
    PASS oluyor) ✓.
  - Plan §9.2 manuel test rehberi Dalga 1/Dalga 2 tablolarıyla güncellendi.
  - **Açık iş:** Merge tamamlandı (yukarı bak). Phase 2/Phase 3 hâlâ
    ayrı onay + planlama ister.

- **Önceki oturum (2026-07-30, Opus) — Challenge-First Phase 1 Opus tarafı:**

- **Aktif branch: `feature/challenge-first`** (yeni, `main`'den açıldı). Kullanıcının
  stratejik değerlendirme yazısı denetlenip yeni plan yazıldı:
  **`Documents/challenge-first-experience-plan.md`** (learning-science planının halefi).
  Değerlendirme özeti: yazının "Phase 3" listesi (AI coach / prediction / memory-viz /
  analytics) ZATEN BİTMİŞ; gerçek yeni değer challenge-first + iş simülasyonu.
  Kullanıcı **Phase 1 = Challenge-First Senaryo Katmanı** yönünü seçti; açık ürün
  kararı (sayfa-içi vs ayrı sekme) önerilen "sayfa-içi" ile ilerletildi.
  - **PHASE 1 OPUS TARAFI (P1-O1…O5) TAMAMLANDI — bu oturum:**
    - `src/lib/skillSignals.js` (yeni) — local-first beceri sinyali deposu
      (`recordSkillSignal`/`getSkillSignals`/`getSkillSignalCounts`/`hasSkillSignal`).
      Phase 3'te SkillRadar'ı "çözülen challenge"dan besleyecek; şimdilik toplar.
    - `src/components/MissionBlock.jsx` (yeni) — `type:'mission'` görev zinciri:
      adım sırayla kilit açar, gömülü blok `onFirstSuccess` verince adım biter,
      "💡 Takıldın mı? Mini-lesson aç" (challenge-first çekirdeği), tamamlanınca
      XP+konfeti+beceri sinyali+debrief. YENİ SANDBOX YAZMAZ.
    - `src/components/TopicPage.jsx` — `import MissionBlock` + `case 'mission'`:
      `renderInner` callback'i her adımın gömülü bloğunu (code-playground/prediction/
      editor/sandbox…) AYNI `renderBlock` makinesinden geçirir.
    - `scripts/audit-learning-blocks.mjs` — `mission` şema değişmezi eklendi
      (id benzersiz + relatedTopicId + ≥3 adım + her adımda brief/miniLesson/
      type'lı block + successCriterion geçerli). Build hard-fail. MISSION_FILES
      listesi seleniumData.js dahil — Sonnet rollout ederken yeni dosyaları ekleyecek.
    - `src/data/seleniumData.js` — REFERANS görev "Login sayfasını test et"
      (Locators sekmesi, 5 adım: locator seç → tıkla → assert → wait stratejisi
      seç → explicit wait yaz; çift-ağaç `s2.tr/s2.en`'e tek sabit push).
  - **Doğrulama:** `audit-learning-blocks` ✓ (mission: 1, 0 ihlal) · content-integrity
    ✓ (38 dosya) · i18n:check ✓ (baseline 0, regresyon yok) · `npm run build` ✓
    (43 static shell, SEO geçti; seleniumData chunk 633 kB — bilinen büyük-chunk
    uyarısı, §14/§23.8).
  - **PHASE 1.5 — KAVRAM TOOLTIP OPUS TARAFI (P1.5-O1…O3) da TAMAMLANDI — aynı oturum:**
    Kullanıcı gözlemi: "yazılım bilmeyen kullanıcı en basit kavramları anlamıyor."
    Çözüm: terimlerin üstüne gelince/dokununca günlük-hayat benzetmesi baloncuğu.
    - `src/data/termGlossary.js` (yeni) — terim→benzetme sözlüğü, ~24 tohum terim
      (locator, selector, assertion, fixture, XPath, DOM, API, endpoint, CI/CD,
      pipeline, commit, merge, branch, framework, boolean, null, exception,
      variable, array, query, flaky test, timeout, mock, regression).
    - `src/components/TermTooltip.jsx` (yeni) — hover/focus/tap ile açılan,
      ESC/dışarı-tık kapanan, klavye-erişilebilir, dark-mode + bilingual popover +
      `highlightGlossaryTerms` helper (modül-seviyesi tek regex, `\b` ASCII sınırı,
      blok başına ilk-geçiş ≤8 terim; kod blokları ASLA sarılmaz).
    - `src/components/TopicPage.jsx` — `case 'text'` ve `case 'simple-box'` prose
      render'ına `highlightGlossaryTerms(...)` bağlandı (minimal, düşük risk).
    - **Not:** termGlossary.js `*Glossary.js` olduğundan i18n scanner'ın `*Data.js`
      glob'una GİRMİYOR — `en` saf İngilizce + `aliases` ASCII elle korunmalı
      (plan §3.6.1). Gate'ler yeşil (content-integrity + i18n:0 + build 43 shell).
- **Bu oturum (2026-07-30, Sonnet) — Phase 1 mission rollout devam ediyor
  (branch `feature/challenge-first`, plan §7.2/§7.3):**
  - ✅ **playwrightData.js — "Sepete ürün ekle" mission görevi eklendi** (commit
    aşağıda). Locator Stratejileri sekmesi (s3), 5 adım: sağlam locator seç
    (getByRole vs class vs XPath, prediction) → tıkla (code-playground) →
    web-first assertion yaz (code-playground) → auto-wait'in Thread.sleep'i
    neden gereksiz kıldığını anla (prediction) → uçtan uca birleştir
    (code-playground). automationexercise.com'u hedefliyor (sitenin kendi test
    konusu — projeyle tutarlı). Çift-ağaç `s3.tr/s3.en`'e tek sabit push.
    `scripts/audit-learning-blocks.mjs` `MISSION_FILES`'e `playwrightData.js`
    eklendi. **Doğrulama:** audit (mission: 2, 0 ihlal) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ✅ **cypressData.js — "Ürün ara ve sonuçları doğrula" mission görevi eklendi.**
    Temel Komutlar & Selector Stratejisi sekmesi (s2), 5 adım: data-cy selector
    seç (prediction) → yaz (code-playground) → retry-able .should() assertion
    yaz (code-playground) → cy.wait(sayı)'nın neden flaky testin en sık kök
    nedeni olduğunu anla (prediction) → uçtan uca birleştir (code-playground).
    Debrief üç aracı (WebDriverWait/web-first assertion/.should()) "aynı
    problemi çözer: koşulu bekle, süreyi değil" diye bağlıyor. Çift-ağaç
    `s2.tr/s2.en`'e tek sabit push. `MISSION_FILES`'e `cypressData.js` eklendi.
    **Doğrulama:** audit (mission: 3, 0 ihlal) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ✅ **pythonData.js — "Kullanıcı API'sini pytest ile test et" mission görevi
    eklendi.** Real World (pytest) sekmesi (final section index 16), 5 adım:
    fixture ile tekrarı önleme kararı (prediction) → base_url fixture'ını yaz
    (code-playground) → status_code assert et (code-playground) → parametrize
    kararı (prediction) → fixture+parametrize'ı uçtan uca birleştir
    (code-playground). pythonData.js'in RİSKLİ `applyTr`/index-override
    mekanizmasına DOKUNULMADI — güvenli kalıbı takip ederek mission sabiti
    SADECE `finalEnSections[16]`/`finalTrSections[16]` dizi literal'lerine
    (spread sonrası) eklendi (bkz. dosyadaki "GUVENLIK NOTU" — Dalga A8 kalıbı).
    **Doğrulama:** audit (mission: 4, prediction: 44) ✓ · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell).
  - ⚠️ **Yan bulgu ve düzeltme — ASCII-normalize Türkçe kör noktası (CLAUDE.md
    §23.1) 3 yerde gerçekten yakalandı:** `check-i18n-leaks.mjs` özel Türkçe
    karakter (ığşçöüİĞŞÇÖÜ) arıyor; "bazen 200ms, bazen 1.5sn" gibi özel
    karaktersiz Türkçe yorumlar plain-string `prediction.code` alanlarında
    sessizce EN moda sızıyordu. Python'daki yeni blok scanner'ın YAKALADIĞI
    (özel karakterli) 1 leak'i düzeltirken, aynı kalıbın **playwrightData.js**
    (`pw-mission-autowait-choice`), **cypressData.js** (`cy-mission-nowait-
    choice`) ve **seleniumData.js** (`sel-mission-wait-choice`, önceki Opus
    oturumundan kalma) içinde de var olduğu elle taranarak bulundu — üçü de
    `{tr,en}` bilingual yapıldı. Ders: yeni prediction `code` alanı yazarken
    düz string + Türkçe yorum kombinasyonundan KAÇIN, baştan `{tr,en}` yaz.
  - ✅ **sqlData.js — "Ürün fiyat verisini doğrula" mission görevi eklendi.**
    SELECT & Sort sekmesi, 5 adım: doğru WHERE koşulu seçimi (prediction) →
    negatif fiyatları getiren sorguyu yaz → ORDER BY ile en kötü fiyatı üste
    sırala → NULL'ın karşılaştırmalarda SESSİZCE elendiğini anlama (prediction)
    → negatif+NULL'ı birleştiren tam sorguyu yaz. `predSqlDistinctMultiCol`
    kalıbını takip etti: tek bilingual sabit, hem EN hem TR "SELECT & Sort"
    section'ına AYNI referansla (`replace_all`) eklendi. **Doğrulama:** audit
    (mission: 5, prediction: 46) ✓ · content-integrity ✓ · i18n baseline 0 ✓ ·
    build ✓ (43 shell).
  - ✅ **restAssuredData.js — "GET /api/users/2 isteğini given/when/then ile
    test et" mission görevi eklendi.** Assertions (Hamcrest) sekmesi, 5 adım:
    eksik .then() zincirinin sonucunu tahmin et (prediction) → status code
    doğrula → body içeriğini (JSON Path + Hamcrest) doğrula → negatif senaryo
    kararı — var olmayan kullanıcı için doğru HTTP kodu (prediction) → negatif
    senaryoyu yaz (id=9999 → 404). Plan §3.3'ün "API (Postman/REST Assured —
    istek→assertion→negatif senaryo)" hedefini birebir karşılıyor. Tek-ağaçlı
    dosya (§9.5): sabit `sections[5]`'e (paylaşılan tr/en referansı) TEK yere
    eklendi. `MISSION_FILES`'e `restAssuredData.js` eklendi. **Doğrulama:**
    audit (mission: 6, 0 ihlal) ✓ · content-integrity ✓ · i18n baseline 0 ✓ ·
    build ✓ (43 shell).
  - **✅ P1-S1 (6 sayfa mission rollout) TAMAMLANDI** — Selenium (Opus referans) +
    Playwright + Cypress + Python + SQL + REST Assured, plan §3.4'teki "en az
    6 sayfa" hedefine ULAŞILDI.
  - ✅ **P1-S3 + P1-S4 TAMAMLANDI:**
    - `tests/mission-flow.spec.ts` (yeni) — /selenium referans görevi üzerinde
      TAM veri-güdümlü E2E: adım kilidinin sırayla açıldığı, "Mini-lesson aç"ın
      çalıştığı (metin `steps[].miniLesson`'dan okunur), tüm 5 adım (2
      prediction + 3 code-playground) sırayla tamamlanınca tamamlanma banner'ı
      + `learnqa_xp_selenium` localStorage'a XP/completed'ın gerçekten
      yazıldığı doğrulanıyor. Sabit metin/id gömülmez — `seleniumData`'dan
      hesaplanır (`tests/learning-blocks-render.spec.ts` ile aynı ilke).
      **Yerel Chromium'da PASS (37.8s).** Yeni route yok → §22.1 değişmez.
    - `src/components/MissionBlock.jsx` — testi güvenilir kılmak için 4
      `data-testid` eklendi (`mission-block` + `data-mission-id`/`data-
      mission-complete`, `mission-step` + `data-step-index`/`data-step-
      locked`/`data-step-done`, `mission-mini-lesson`, `mission-complete-
      banner`) — `mentor-panel`/`mentor-ai-button` kalıbıyla aynı (içerik
      DEĞİŞMEDİ, sadece test-scoping).
    - `CLAUDE.md` §5 blok listesine `prediction | code-trace | heap-stack | mission`
      eklendi (üçü zaten vardı ama listeye hiç girmemişti — fırsatçı düzeltme).
    - **Doğrulama:** content-integrity ✓ · i18n baseline 0 ✓ · audit-learning-
      blocks (mission:6, 0 ihlal) ✓ · build ✓ (43 shell) · `npx playwright test
      tests/mission-flow.spec.ts` ✓ (1/1 PASS).
  - **✅ PHASE 1 (Challenge-First Senaryo Katmanı) TAMAMLANDI** — plan §3.4
    "bitti" tanımının tamamı karşılandı: 6 sayfa (Selenium+Playwright+Cypress+
    Python+SQL+REST Assured), audit/i18n/build kapıları yeşil, E2E test yeşil,
    `skillSignals.js` her görev bitince sinyal topluyor (Phase 3 hazır).
  - ✅ **P1.5-S1 — `termGlossary.js` 24 → 57 terime genişletildi** (33 yeni
    terim): loop, condition, class/object, inheritance, JSON, HTTP status
    code, cookie/session, container, image, pod, thread, async/await,
    promise, callback, closure, generic, regex, environment variable,
    dependency, repository, deploy, rollback, cache, latency, idempotent,
    token, schema, webhook, payload, queue, load balancer, log/stack trace,
    race condition. Her biri günlük-hayat benzetmeli + bilingual + ASCII
    aliases; script ile 0 duplicate alias + 0 non-ASCII + 0 eksik EN alanı
    doğrulandı. **Doğrulama:** node --check ✓ · content-integrity ✓ · i18n
    baseline 0 ✓ · build ✓ (43 shell). (Not: `termGlossary.js` `*Data.js`
    glob'una girmediği için i18n scanner'ın 38-dosya taramasına dahil DEĞİL —
    ASCII/EN bütünlüğü yukarıdaki özel script ile elle doğrulandı.)
  - ✅ **P1.5-S3 — `tests/term-tooltip.spec.ts` (yeni) TAMAMLANDI:** /selenium
    Locators sekmesi üzerinde tam veri-güdümlü E2E (hangi sekmede/terimde test
    edileceği `TERM_GLOSSARY` + `seleniumData` TARANARAK bulunur, sabit
    gömülmez). İki test: (1) bilinen terim noktalı-çizgili sarılıyor, hover ile
    popover açılıp benzetme metnini gösteriyor, ESC ile kapanıyor, TAB
    (klavye) ile fokuslanınca da açılıp blur'da kapanıyor (§3.6.1 "hover VE
    focus VE tap" gereksinimi); (2) `<pre>` kod bloğu içinde HİÇ tooltip
    tetikleyici yok (mekanizma mimari olarak sadece text/simple-box'a bağlı).
    **Bulgu (test yazarken düzeltildi):** ilk yazımda hover sonrası aynı
    elemente `.click()` atmak popover'ı AÇMAK yerine KAPATIYORDU (imleç zaten
    üstteyken click, hover'ın açtığı state'i toggle'lıyor) — click-toggle
    testi bunun yerine klavye focus/blur ile değiştirildi (hem daha güvenilir
    hem erişilebilirlik iddiasını daha doğrudan kanıtlıyor). Ayrıca test
    güvenilirliği için `TermTooltip.jsx`'e 3 `data-testid` eklendi
    (`term-tooltip-trigger` + `data-term-key`, `term-tooltip-popover`).
    **Yerel Chromium'da 2/2 PASS (33.2s).**
  - **✅ PHASE 1.5 (Kavram Tooltip'i) TAMAMEN BİTTİ.** P1.5-S2 (kapsamı
    callout/info/tip render'larına genişletme) BİLİNÇLİ OLARAK ATLANDI —
    opsiyonel işaretliydi (plan §7.3), mevcut text/simple-box kapsamı
    çekirdek kullanıcı deneyimini zaten karşılıyor; istenirse sonraki
    oturumda eklenebilir.
  - **✅✅ PHASE 1 + PHASE 1.5 TAMAMEN BİTTİ (bu oturum, 2026-07-30→31).**
    Tüm doğrulama kapıları (content-integrity + i18n baseline 0 +
    audit-learning-blocks + build 43 shell + 2 yeni E2E test dosyası, toplam
    3/3 PASS yerel Chromium'da) yeşil. `main`'e merge/PR kararı kullanıcıda.
  - 🔜 **Sırada (kullanıcı onayı + ayrı planlama gerektirir, plan §4/§5):**
    Phase 2 (QA Sprint/Company Simulator, yeni `/sprint` rotası) veya Phase 3
    (adaptif zorluk + SkillRadar'ı `skillSignals.js`'ten besleme).
  - **Açık iş:** Merge tamamlandı (yukarı bak, `main`'de). Phase 2 (Sprint Simulator) ve
    Phase 3 (adaptif zorluk) ayrı onay + planlama ister (plan §4/§5).

- **Önceki oturum (2026-07-30, Opus) — plan denetimi + öğrenme-blok testleri
  (branch `feature/prediction-blocks`):** Bu oturumun SON işi (2026-07-30, Opus):
  `learning-science-upgrade-plan.md`'nin ne kadar yerine getirildiği denetlendi
  ve **test kapsamı boşluğu kapatıldı** (commit `142d8d5`):
  - **Denetim sonucu — plan TAM yerine getirilmiş:** prediction (java=10/js=9/
    python=8/sql=8/ts=7 = 42 benzersiz id, runtime-walk ile İKİ dil ağacında da
    wired doğrulandı), code-trace 5 + heap-stack 5, mentor Katman A/B (O1-O6 +
    S1-S5) tam, #7 Learning Analytics + MentorPanel + MentorNudge HomePage/App'te
    wired, edge function + şema ACTIVE. Mentor-advice her iki projede (test+prod)
    ACTIVE v2, GROQ_API_KEY mevcut.
  - **Eklenen kalıcı kontroller:** (1) `scripts/audit-learning-blocks.mjs` build
    zincirine girdi (`audit-interview-questions`'tan sonra) + `npm run
    audit:learning-blocks` — prediction/code-trace/heap-stack şema değişmezlerini
    (tam 1 correct, boş olmayan reveal, benzersiz id, code düz string, steps[].line
    sayısal) hard-fail eder. (2) `tests/mentor-panel.spec.ts` + `mentor-snapshot-
    weakness.spec.ts` (Sonnet) + `tests/learning-blocks-render.spec.ts` (Opus, 3
    test: /java'da üç blok tipinin render + etkileşimi).
  - **⚠️ Tespit edilen içerik bulgusu (kullanıcı kararı bekliyor, build kırmaz):**
    42 prediction'ın **40'ında doğru cevap 'B' pozisyonunda** — kullanıcı "hep B
    seç" ile gaming yapabilir. Şıkları karıştırmak önerilir ama bu 5 çift-ağaç
    dosyada 40 bloklu riskli bir içerik düzenlemesi; Opus tek başına yapmadı,
    audit UYARI olarak sürekli raporluyor. Düzeltme kararı kullanıcıda.
  - **Doğrulama:** `audit-learning-blocks` ✓ (0 ihlal) · content-integrity ✓ ·
    i18n baseline 0 ✓ · build ✓ (43 shell) · 3 render + 8 mentor testi PASS.

- **Bu oturumda (2026-07-30, Sonnet)**
  `Documents/learning-science-upgrade-plan.md` Bölüm 6 §6.6'daki hazır promptla
  **#5 Kişisel AI Mentor — Sonnet tarafı (S1-S5) TAMAMLANDI** (Opus'un O1-O6
  backend/bileşen işi önceki oturumda bitmişti, bkz. plan §6 durum notu).
  3 ayrı commit:
  1. **S1 — `feat(mentor): oğüt şablolarını 14 route'a genişlet`** (`e912e05`):
     `mentorAdvice.js`'teki `ROUTE_ADVICE` havuzu 12 route'tan 26 route'a
     çıkarıldı — rest-assured, postman, bruno, jenkins, kubernetes, kafka,
     appium, aws, azure, jmeter, browserstack, gauge, test-frameworks,
     qa-frontend eklendi. Her girdi bilingual, somut (o teknolojinin en sık
     tuzağı) ve uygun yerde Java analojili.
  2. **S2 — `polish(mentor): MentorPanel giriş/AI-sonuç animasyonlarını cilala`**
     (`59014d0`): panel açılışına `animate-fadeIn`, AI sonucuna `animate-scaleIn`
     + `shadow-focus-accent`, AI hatasına `animate-fadeIn` — mevcut Tailwind
     animasyon kalıpları (yeni paket/CDN yok). Loading/empty/error state'leri ve
     36px touch target'lar zaten doğruydu.
  3. **S3+S4 — `test(mentor): panel + snapshot smoke testleri`** (`4a4941f`):
     `tests/mentor-snapshot-weakness.spec.ts` (`getPersistentWeakness`
     daysStruggling 1/7/14 gün + trend stuck/worsening/improving, seeded
     `learnqa_mentor_snapshots`) ve `tests/mentor-panel.spec.ts` (Katman A:
     proaktif panel + AI butonunun üye-değilken gizli olduğu + MentorNudge akışı
     + boş-veri durumunda hiçbir bileşenin render edilmediği; Katman B: gerçek
     Supabase girişi + `page.route()` ile mock'lanmış `mentor-advice` yanıtıyla
     AI butonu/sonucu, `GITHUB_ACTIONS==='true'` guard'ıyla CI'da skip). **Bu
     oturumda 4+4=8 testin TAMAMI yerel Chromium'da PASS oldu** (AI katmanı
     dahil — `.env.local`'de test kullanıcısı zaten yapılandırılıydı, gerçek
     Groq çağrısı yapılmadı, yalnızca edge function mock'landı).
  - **Doğrulama (her commit'te ayrı ayrı):** `node --check` ✓ ·
    `check-content-integrity.mjs` ✓ (38 dosya) · `check-i18n-leaks.mjs` ✓
    (baseline 0, regresyon yok — `mentorAdvice.js`/`MentorPanel.jsx` zaten
    `src/data/*.js` kapsamı dışında) · `npm run build` ✓ (43 static shell, SEO
    geçti).
  - **Kalan (kullanıcıda, plan §6.2):** `supabase functions deploy mentor-advice
    --project-ref <ref>` gerçek deploy'u henüz teyit edilmedi — Katman A
    (yerel, üyeliksiz) deploy'suz da tam çalışır; Katman B (gerçek AI, üye-only)
    yalnızca deploy sonrası prod'da devreye girer. Branch merge tamamlandı (`main`'de).

- **Önceki oturum (2026-07-29) — i18n leak sıfırlama + sPlaywright temizliği:**
  4 ayrı commit ile şu iş tamamlandı:
  1. **`sPlaywright.en` ölü kod bug'ı çözüldü** (`9b00924`) — `javaData.js`'de
     override tarafından hiç render edilmeyen ~1250 satırlık eski `en:` objesi
     silindi (20506→19249 satır). Detay: CLAUDE.md §23.4 ilgili not.
  2. **i18n scanner'daki hatalı "⚠ OPUS" varsayımı çürütüldü ve scanner düzeltildi**
     (`7c67e80`, `16a2f2d`, `0e4642f`) — `locator-visual`/`playwright-visual`
     blokların çıplak `field`/`fieldEn` kalıbı, `code`/`codeWrong`/`codeFixed`
     alanlarının `getLocalizedCode()` üzerinden zaten desteklenen runtime
     yorum-çevirisi, ve `linuxErrors`'ın iç-içe paylaşımı — hiçbiri gerçek
     renderer eksikliği değildi (tek gerçek istisna: `BackendPracticeBlock`/
     `GitPracticeBlock`'ta `example` alanı, tek satırlık `tx()` eklendi).
     **Sonuç: proje geneli i18n leak baseline'ı 109 → 0.** Kök neden/çözüm
     kalıpları kalıcı olarak CLAUDE.md §23.1 ve §23.6'da belgeli; adım adım
     dönüşüm geçmişi `git log --oneline` ve ilgili `fix(i18n...)` commit
     mesajlarında duruyor, burada tekrarlanmıyor.
  - **Doğrulama (her commit'te ayrı ayrı):** `node --check` ✓ · `check-content-integrity.mjs` ✓ (38 dosya) · `check-i18n-leaks.mjs` ✓ (baseline 0) · `npm run build` ✓ (43 static shell, SEO geçti).
- **Önceki oturum (2026-07-28) — prediction/code-trace/heap-stack dalgası:** Kullanıcının öğrenme bilimi değerlendirme yazısına (2026-07-27) karşılık, `Documents/learning-science-upgrade-plan.md` planı uygulandı. **3 yeni blok tipi + 5 dile rollout TAMAMLANDI:**
  - **Yeni bileşenler (Opus, self-contained, backend gerektirmez):** `PredictionBlock.jsx` (`type: 'prediction'` — "Önce Tahmin Et, Sonra Gör" / active recall), `CodeTraceBlock.jsx` (`type: 'code-trace'` — satır satır kod yürüyüşü), `HeapStackBlock.jsx` (`type: 'heap-stack'` — Stack/Heap bellek görselleştirmesi). Üçü de `TopicPage.jsx`'te kayıtlı, şemalar plan dosyasının Bölüm 2'sinde.
  - **Görev S1 (prediction rollout) TAMAMLANDI:** javaData.js (7 blok: string concat, division promotion, operator precedence, switch fall-through, Integer cache, unboxing NPE, array equality), pythonData.js (3: is/==, mutable default arg, float precision), sqlData.js (2: COUNT(*)/NULL, JOIN row multiplication), javascriptData.js (3: hoisting, ==/===, closure+var), typescriptData.js (2: excess property check, structural typing) — **toplam 17 prediction bloğu** (bir eski commit mesajında "20" yazıyor ama gerçek sayı 17; kod doğru, mesaj kozmetik hata).
  - **Görev S2 (code-trace + heap-stack rollout) TAMAMLANDI:** javaData.js (for loop trace + OOP aliasing heap-stack), pythonData.js (for loop trace + mutable-default heap-stack), javascriptData.js (for loop trace + object reference heap-stack).
  - **Doğrulama:** her commit'te `node --check` + `check-content-integrity.mjs` + `check-i18n-leaks.mjs` (i18n baseline 109 sabit, regresyon yok) + `npm run build` ayrı ayrı çalıştırıldı, hepsi geçti.
  - **#7 Learning Analytics dashboard TAMAMLANDI (Opus, 2026-07-28):** `getLearningAnalytics()` (progressStore.js) + `getMostMissedAreas()` (reviewQueue.js) + `LearningAnalytics.jsx` panosu, HomePage'de ActivityHeatmap'ten sonra render ediliyor. Tamamen local-first (backend yok): ortalama quiz başarısı, en güçlü/en zayıf konu, en çok hata yapılan alan. Seeded-localStorage smoke testiyle doğrulandı (accuracy/strongest/weakest/most-missed hepsi doğru). Commit `e081451`.
  - **code-trace/heap-stack genişletme TAMAMLANDI (Opus, 2026-07-28, düşük öncelik seçildi, commit `5daa148`):** Mevcut sayfalara 4 yeni blok eklendi — javaData: String Pool heap-stack (`==` interning tuzağı) + iki-işaretçi dizi ters çevirme code-trace; pythonData: `b=a` vs `b=a[:]` list-copy heap-stack; javascriptData: `.reduce()` akümülatör code-trace. Hepsi tek sabit + ağaç referansı; `code` alanları yorumsuz (renderer düz string), açıklamalar bilingual `note`'larda. `node --check` + content-integrity + i18n (baseline 109) + build hepsi geçti.
  - **Prediction derinleştirme TAMAMLANDI (Opus, 2026-07-28, commit `40fd0d1`):** Dil sayfalarının boş/az kapsanan sekmelerine 8 yeni `prediction` bloğu — sqlData: `= NULL` vs `IS NULL` + `WHERE`'de aggregate hatası (HAVING); typescriptData: `any` vs `unknown` + `as` type assertion (runtime TypeError); pythonData: `[[0]]*3` paylaşımlı iç liste + `for...else`; javascriptData: `.sort()` sözlüksel varsayılan + `typeof null/[]/NaN`. Çift-ağaç dosyalarda tek sabit + iki ağaç referansı (SQL/TS `replace_all` ile). Tüm geçitler yeşil (content-integrity + i18n 109 + build).
  - **Prediction DOYURMA dalgası TAMAMLANDI (Opus, 2026-07-28, commit'ler SQL/Java/Python/JS/TS ayrı):** kullanıcı "aynı sayfalarda maksimum sayıda ekle" dedi → her dil sayfasının kalan gotcha'ya değer sekmeleri kapsandı. +16 yeni prediction: SQL +4 (DISTINCT çoklu-sütun, WHERE'siz UPDATE, NOT IN+NULL, BETWEEN dahil-uç), Java +3 (for-each remove→CME, int taşması wrap, finally return ezme), Python +3 (1/1.0/True dict anahtarı, class-level mutable paylaşım, UnboundLocalError), JS +4 ("5"+1 vs "5"-1, setTimeout(0) makrotask, Promise mikrotask önceliği, koparılmış metotta this→TypeError), TS +3 (tuple.push bypass, ?? vs ||, catch e:unknown). **Güncel kapsam: java=10, js=9, python=8, sql=8, ts=7.** Her biri bilingual + Java analojisi + QA bağlamı; tüm geçitler yeşil (node --check + content-integrity + i18n 109 + build 43 shell). Boş kalan sekmeler ya kavramsal olarak gotcha'ya uygun değil (kurulum/mülakat/pratik) ya da düşük değerli (Generics/Utility Types predict-output'a uymaz).
  - **🔜 SIRADAKİ OTURUM — buradan devam et** (2026-07-30 güncellemesi: #5 Kişisel
    AI Mentor artık TAMAMLANDI, yukarıdaki 2026-07-30 bölümüne bak — kalanlar
    hâlâ backend/mimari/product kararı ister, kullanıcı onayı olmadan tek başına
    kodlanmaz; detay `learning-science-upgrade-plan.md` §0 + §5):
    1. **#6 Adaptif zorluk** — quiz motoruna (TopicPage ~18k satır, çok E2E testi) dokunur, zorluk-etiketli soru havuzu gerekir. Riskli, ayrı planla.
    2. **#8 Portföy/proje üretimi** — en büyük epik.
    3. **Düşük öncelik (opsiyonel):** Java/Python/JS'e code-trace/heap-stack genişletme dalgası 2026-07-28'de yapıldı (yukarı bak, commit `5daa148`). Kalan: SQL/TS'e ekleme — SQL için heap/stack kavramsal uymaz; TS runtime = JS (düşük değer).
  - **Açık iş:** Merge tamamlandı — `feature/prediction-blocks` branch'i artık mevcut değil, içerik `main`'de.

- **`frontenddevelopment-for-qa` branch'i** (2026-08-01'de doğrulandı: `main`'e göre 0 commit ileride — içeriği zaten `main`'de): **`/qa-frontend` — "QA için Frontend: Developer'la Aynı Dili Konuşmak" sayfası içerik olarak TAMAMLANDI** (Opus iskelet+referanslar + Sonnet GRUP A-J + D-S11 kapanış denetimi, hepsi 2026-07-25). Detaylı geliştirme geçmişi (hangi GRUP'ta ne yazıldığı) artık tekrarlanmıyor — `git log --oneline` (commit'ler `feat(qa-frontend): GRUP X tamamlandı` formatında açıklayıcı) ve `Documents/qa-frontend-page-plan.md` yeterli referanstır.
  - **Sayfanın içeriği:** 10 GRUP (A-J), 12 video-scene filmi (dahil "5 Locator Yarışı" — sayfanın en kritik filmi, "Stale Element", "*ngIf Kapıyı Açıp Kapıyor"), 4 Kaynak→DOM→Locator panosu (BugCard/Modal/StatusBadge/Toast), 12 error-dictionary hatası, **50 mülakat sorusu (15/20/15, `node scripts/audit-interview-questions.mjs` ile bağımsız doğrulandı — script artık `/qa-frontend`'i de içeriyor)**, tüm quiz'lerde retryQuestion, §9.5 trio'su (video+animasyon+sandbox) GRUP A-J'nin TAMAMINDA doğrulandı.
  - **Doğrulama durumu:** `check-content-integrity` ✓ · `i18n:check` ✓ (sıfır sızıntı, `qaFrontendData.js` hem `STRICT_ZERO_FILES` hem `TRIO_COMPLETE_PAGES`'te) · `npm run build` ✓ (43 statik shell, SEO geçti) · `audit-interview-questions.mjs` ✓ — hepsi geçti.
  - **Manuel test rehberi hazır:** `Documents/qa-frontend-page-plan.md` §F — kurulumdan (`npm run dev` → `/qa-frontend`) grup grup elle test adımlarına (video-scene oynatma, quiz-gating akışı, Locator Lab, feynman AI değerlendirmesi vb.) kadar adım adım rehber.
  - **Bilinen uyarı:** `QaFrontendPage` chunk'ı 515.59 kB (build'i bozmuyor, CLAUDE.md §14/§23.8 kapsamında bilinen durum).
  - **Açık kalan (opsiyonel):** `npm run test:e2e` (Playwright) bu sayfa için henüz koşulmadı.
- `feature/api-testing-page` branch'i (2026-08-01'de doğrulandı: `main`'e göre 0 commit ileride — içeriği zaten `main`'de). `/api-testing` sayfası içerik olarak TAMAMLANDI (57 sekme, GRUP A-K, Faz 1-10). Plan: `Documents/api-testing-page-plan.md`.
- Bu branch'e geçmeden önceki oturumda `feature/api-testing-page` üzerinde **i18n EN-sızıntı temizliği** yapılmıştı: video-scene pasif buton görünürlüğü düzeltildi, 6 tablo + error-dictionary bilingual yapıldı, code-playground yorumları bilingual hale getirildi (TR Türkçe / EN İngilizce), ve yeni bir **statik scanner** eklendi: `scripts/check-i18n-leaks.mjs` (build zincirinde + `pre-commit`'te çalışır, `npm run i18n:check` / `npm run i18n:baseline`). Kök neden, çözüm ve kullanım detayı: **CLAUDE.md §23.1**.

## 🔜 Açık İşler / Sıradaki Adımlar

0. **YENİ PLAN (2026-07-30) — `Documents/challenge-first-experience-plan.md`:**
   Kullanıcının stratejik değerlendirme yazısı denetlendi. Sonuç: yazının
   "Phase 3" listesinin çoğu ZATEN BİTMİŞ (mentor/prediction/memory-viz/analytics).
   Gerçek yeni değer → **Phase 1: Challenge-First Senaryo Katmanı** (yeni `mission`
   blok tipi; mevcut sandbox'ları göreve sarar, frontend-only). Kullanıcı bu yönü
   seçti (2026-07-30). Phase 2 = Sprint/Company Simulator, Phase 3 = adaptif zorluk,
   Phase 4 = park. Opus/Sonnet hazır promptları planın §7'sinde. **Açık karar
   (Opus başlamadan):** görevler sayfa-içi mi ayrı sekme mi (öneri: sayfa-içi).

1. **i18n EN-sızıntı temizliği TAMAMEN BİTTİ (2026-07-25 → 2026-07-29, çoklu oturum, KAPALI):** `check-i18n-leaks.mjs` scanner'ı sıfırdan inşa edildi ve art arda düzeltildi — yanlış-ağaç tarama (8490 hayalet leak), paylaşımlı-sabit tespiti, `why`/`note` ve `field`/`fieldEn` sibling farkındalığı, `codeCommentTranslations` runtime simülasyonu. Borç azalma sırası: 8490(hayalet) → 646 → 365 → 223 → 199 → 109 → 67 → 9 → **0**. Kök neden/çözüm kalıpları kalıcı olarak **CLAUDE.md §23.1 ve §23.6**'da belgeli (yeni bir "OPUS"/"YERİNDE-ÇEVİR" leak'e rastlarsan önce oraya bak); adım adım geçmiş `git log --oneline`'daki `fix(i18n...)` commit'lerinde duruyor, burada tekrarlanmıyor. `npm run i18n:check` artık "grandfathered borç: 0" basıyor — herhangi bir yeni sızıntı build'i kırar.
2. **Tüm branch merge'leri TAMAMLANDI (2026-08-01'de doğrulandı):** `feature/challenge-first`, `frontenddevelopment-for-qa` (`/qa-frontend`) ve `feature/api-testing-page` (`/api-testing`) — üçü de `main`'e göre 0 commit ileride, yani içerikleri `main`'de. Aktif branch artık `main`. `/qa-frontend` için opsiyonel `npm run test:e2e` koşumu hâlâ yapılmadı.
3. **AC08 çoklu tema paleti** — kullanıcı "şimdilik atla" dedi, plan `Documents/acceptancecriterias.md` Madde 11'de hazır bekliyor.
4. **Bilinen ASCII-normalize Türkçe kör noktası** — `bakiyor`, `gunceller` gibi Türkçe-özgü karakter içermeyen sızıntılar hiçbir otomatik kontrolle yakalanamıyor, elle göz gezdirmek gerekiyor.
5. **Sırada (kullanıcı onayı + ayrı planlama gerektirir):** Phase 2 (QA Sprint/Company Simulator) veya Phase 3 (adaptif zorluk), bkz. `Documents/challenge-first-experience-plan.md` §4/§5.

## ✅ Proje Geneli Denetim Durumu (2026-07-25'te script ile taze ölçüldü)

- **§9.3 (4-katmanlı analoji standardı):** `node scripts/audit-analogy-depth.mjs --missing` → 24 sayfa, 488 bölüm, **0 standart altı**. Script bir triyaj aracıdır, sınırları için bkz. CLAUDE.md §9.3.
- **İnteraktif üçlü (animasyon + drag-drop + practice, §9.1/9.2):** `node scripts/audit-interactive.mjs --missing` → 25 sayfa, **0 eksik**.
- **§9.5 (video-scene + animasyon + sandbox trio) / §9.6 (framework mimarisi 5-görünüm rollout):** hangi sayfanın/dalganın tamamlandığı artık kendi plan dosyalarında takip ediliyor — `Documents/video-sitewide-plan.md` ve `Documents/sandbox-and-framework-plan.md`. Güncel dalga/faz durumu için oraya bak, burada tekrar edilmiyor.
- **i18n & sekme-trio statik denetim:** `npm run i18n:check` → tüm kontroller geçti, regresyon yok (madde 1'deki grandfathered borç hariç).

## 🧪 Test Kapsamı (özet — detaylı döküm için CLAUDE.md §22 + sohbet geçmişi)

- `tests/` — 31 dosya, `npm run test:e2e`, her push/PR'de CI'da otomatik (bkz. `.github/workflows/deploy.yml` / `ci-tests.yml`).
- `tests-extended/interview-mastery-flows.spec.ts` — 23 sayfanın tamamında gerçek Groq AI çağrısıyla mülakat gating+grading akışı, `npm run test:interview-flows`, elle çalıştırılır (rate-limit riski).
- `tests-quiz-audit/quiz-full-audit.spec.ts` — 346 quiz bloğunun tamamı (23 sayfa × TR+EN) tek tek denetlenir, `npm run test:quiz-audit`, elle çalıştırılır (~10 dk).
- CLAUDE.md §22'deki 6 zorunlu kontrolden 1-2-4-5 tam kapsanıyor; 3 (gating açık — her ders için) ve 6 (bitirme rozeti toast'ı) sadece `/docker` temsili sayfası üzerinden `tests/` içinde, tam kapsam `tests-extended/`'de.
- §22.1 kalıcı istisna listesi (hiçbir suite'e dahil değil): `/basit-backend`, `/security`, `/backend`.

---

## 📚 Daha Eski Geçmiş

Haziran sonu – Temmuz 2026 arası onlarca oturumun tam anlatımı (video-scene
rollout Dalga 1-22, AIQA_ROADMAP, `/claude-ai` ve `/llm-agents` sayfalarının
yazımı, interaktif üçlü rollout'u, Kariyer Haritası v2, Learning OS/retention
çalışmaları, GJL içerik planı CP1-CP9 vb.) — hepsi tamamlanıp `main`'e gitti.
Ayrıntı için `git log --oneline` ve ilgili commit mesajlarına bakın; kalıcı
değeri olan mimari kararlar zaten `CLAUDE.md`'nin ilgili bölümlerine (§9.1-9.6,
§23) işlenmiş durumda.
