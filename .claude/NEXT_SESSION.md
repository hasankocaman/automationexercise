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

## 📌 Şu An Ne Durumdayız (2026-07-25)

- **Aktif branch: `frontenddevelopment-for-qa`.** Yeni sayfa üzerinde çalışılıyor: **`/qa-frontend` — "QA için Frontend: Developer'la Aynı Dili Konuşmak"**. Plan + görev dağılımı (Opus/Sonnet) + hazır Sonnet promptları: `Documents/qa-frontend-page-plan.md`.
  - **Wiring tam ✅** (Opus, commit `fa48f2f`): route (`App.jsx`), SEO (`seo.js`), statik shell (`generate-static-routes.mjs`), `QaFrontendPage.jsx`, HomePage kartı ("Test Araçları" grubunda, commit `d8f9c4b`), `tests/video-scene.spec.ts` render testi, i18n `STRICT_ZERO_FILES` kaydı.
  - **GRUP A (Tarayıcı Nasıl Çalışır) TAMAMLANDI ✅** (A1 Opus, A2-A6 Sonnet, commit `7114a93`): 6 atomik başlık, 2 video-scene (Kaynak→Sayfa, Render'ın 5 Adımı), 4 step-animation, 1 order-sort challenge, 5 code-playground (relatedTopicId'li), 6 quiz+retryQuestion, 1 feynman-checkpoint.
  - **GRUP B (HTML: Locator'ın Ham Maddesi) TAMAMLANDI ✅** (Sonnet, faz D-S2): 5 atomik başlık (B1 Semantik Elementler, B2 Attribute'lar, B3 id/class/data-testid dayanıklılık, B4 Form/label-for, B5 Accessibility Tree). 1 video-scene ("Semantik Element mi, Div mi?"), 4 step-animation, 1 durability `table`, 1 order-sort `challenge`, 3 code-playground (relatedTopicId'li), `bugCardLocatorExplorer` tekrar kullanıldı (B5), 5 quiz+retryQuestion, 1 feynman-checkpoint. Selenium/Playwright syntax'ı öğretilmedi, sadece pratik amaçlı minimal Playwright çağrıları kullanıldı (GRUP A kalıbıyla tutarlı).
  - **GRUP C (CSS: Neden Locator'ı Kırar) TAMAMLANDI ✅** (Sonnet, faz D-S3): 6 atomik başlık (C1 Selector Mantığı, C2 Specificity/Cascade, C3 CSS Modules hash, C4 Utility CSS/Tailwind, C5 Runtime Styling styled-components/emotion, C6 Pseudo-element/state). 1 video-scene ("Class Hash'i Neden Değişir?"), 2 step-animation, 2 table, 2 Kaynak→DOM→Locator pano (C3, C5 — grid cols:3 + 🎯), 1 code-playground (relatedTopicId'li), 6 quiz+retryQuestion, 1 feynman-checkpoint. Not: bir syntax hatası (kaçırılmamış apostrof, CLAUDE.md §23.2 tip 1) yazım sırasında yakalanıp düzeltildi — `node --check` disiplini işe yaradı.
  - **GRUP D (JavaScript: DOM'u Kim Değiştiriyor) TAMAMLANDI ✅** (Sonnet, faz D-S4): 5 atomik başlık (D1 DOM Manipülasyonu, D2 Event Listener, D3 Async/Fetch, D4 Mutation/wait, D5 data-* JS'ten okuma). 1 video-scene ("Fetch Bitmeden Locate Etmek: Bir Yarış Hikayesi" — kendi özgün filmi, "Veri Gelince DOM Doluyor" başlığı GRUP E'ye ayrılmış durumda, bkz. plan §4 film listesi), 4 step-animation, 1 code-playground (relatedTopicId'li), 5 quiz+retryQuestion, 1 feynman-checkpoint.
  - **GRUP E (Frontend & Backend Nasıl Konuşur) TAMAMLANDI ✅** (Sonnet, faz D-S5): 5 atomik başlık (E1 fetch/XHR + Network paneli, E2 Response→State→Render, E3 CSR/SSR/SSG, E4 Hydration, E5 Loading/Error/Empty state). Zorunlu "Veri Gelince DOM Doluyor" video-scene filmi (E2, orijinal prompt §4'teki atamayla), 2 step-animation, 2 table (render türü→locate zamanlaması, 3-state developer/tester), 1 code-playground (hydration bekleme), 5 quiz+retryQuestion, 1 feynman-checkpoint. `/api-testing` köprü linki grup girişinde.
  - **GRUP F (React: Kaynağı Okumak) TAMAMLANDI ✅** (Opus BugCard pano referansı + Sonnet F1-F7, faz D-S6): 7 atomik başlık. Zorunlu "Component Bir Fonksiyondur" video-scene filmi (F1), 1 step-animation (F2 JSX→DOM), 1 table (F3 Props vs State), **4 Kaynak→DOM→Locator panosu** (BugCard/hash — Opus referansı F7'ye taşındı, Modal/conditional-render F4, StatusBadge/list-render F5, Toast/data-testid-ekleme F6 — hepsi grid cols:3 + 🎯), 1 code-playground (Toast'a data-testid ekleme), 7 quiz+retryQuestion, 1 feynman-checkpoint. `fillMissingFeynman`'daki eski `sectionIndex:5` GRUP F tanımı artık no-op (manuel feynman eklendiği için mekanizma otomatik atlıyor — kontrol edildi, `interactiveTrioFillers.js` `hasFeynman` kontrolü var).
  - **GRUP G (Angular: Kaynağı Okumak) TAMAMLANDI ✅** (Sonnet, faz D-S7): 6 atomik başlık (G1 Component+Template ayrımı .ts/.html, G2 Template syntax, G3 *ngIf/*ngFor↔React, G4 _ngcontent/_nghost, G5 [attr.data-testid] binding, G6 Sağlam Locator Stratejisi). Zorunlu "*ngIf Kapıyı Açıp Kapıyor" video-scene filmi (G3), 2 step-animation, 1 React-karşılaştırma `table`, 1 Kaynak→DOM→Locator pano (_ngcontent hash, G4), 1 code-playground ([attr.*] binding yazma, G5), 6 quiz+retryQuestion, 1 feynman-checkpoint. GRUP F ile SÜREKLİ karşılaştırma yapıldı (React↔Angular paralellik dersi).
  - **GRUP H (Locator Ustalığı — SAYFANIN KALBİ) TAMAMLANDI ✅** (Opus lab referansı + Sonnet H1-H8, faz D-S8): 8 atomik başlık. Zorunlu **"5 Locator Yarışı"** video-scene filmi (H3, sayfanın en kritik filmi — XPath index SESSİZCE yanlış elemente düşerken hash class AÇIK hata verir, data-testid/role hayatta kalır), 1 Locator Laboratuvarı (`locator-explorer`, H1), 1 deploy-kırılganlığı `code-playground` (H3), 2 step-animation (H4 conditional/dynamic wait, H6 shadow DOM/iframe context), 1 code-playground (H5 ilişkisel satır bulma, index YASAK), 3 table (H2 antipattern'ler, H7 developer'dan ne istenir, H8 code review checklist), 8 quiz+retryQuestion, 1 feynman-checkpoint (mevcut, taşındı).
  - **GRUP I, J: henüz boş/placeholder** — sadece açılış `simple-box` var, atomik başlıklar yok.
  - **Çalışma düzeni (kullanıcı talimatı, 2026-07-25):** her fazın sonunda (1) bu dosya güncellenir, (2) **test/build çalıştırılmadan** commit atılır (sadece `node --check` ile syntax doğrulanır — bu "test" sayılmıyor, çökme riskini önlemek için), (3) plandaki bir sonraki hazır Sonnet promptuyla devam edilir — bu döngü tüm fazlar bitene kadar tekrarlanır. Kapsamlı doğrulama (content-integrity/i18n/build) sadece plan §D-S11 (kapanış fazı) sonunda tek seferde yapılacak.
  - **Sıradaki faz: D-S9 (GRUP I — Yaygın Hatalar, error-dictionary min 12)**, prompt plan dosyası §D'de hazır.
- `feature/api-testing-page` branch'i (ayrı branch, bu oturumda dokunulmadı): `origin/feature/api-testing-page` ile senkron (`bac59ee`). `/api-testing` sayfası içerik olarak TAMAMLANDI (57 sekme, GRUP A-K, Faz 1-10). Plan: `Documents/api-testing-page-plan.md`. `main`'e henüz merge/PR açılmadı — karar kullanıcıda.
- Bu branch'e geçmeden önceki oturumda `feature/api-testing-page` üzerinde **i18n EN-sızıntı temizliği** yapılmıştı: video-scene pasif buton görünürlüğü düzeltildi, 6 tablo + error-dictionary bilingual yapıldı, code-playground yorumları bilingual hale getirildi (TR Türkçe / EN İngilizce), ve yeni bir **statik scanner** eklendi: `scripts/check-i18n-leaks.mjs` (build zincirinde + `pre-commit`'te çalışır, `npm run i18n:check` / `npm run i18n:baseline`). Kök neden, çözüm ve kullanım detayı: **CLAUDE.md §23.1**.

## 🔜 Açık İşler / Sıradaki Adımlar

1. **`/qa-frontend` sayfasını bitirmek (aktif hedef, `frontenddevelopment-for-qa` branch'i).** Sıradaki fazlar (plan: `Documents/qa-frontend-page-plan.md` §C/§D): D-S2 GRUP B (HTML) → D-S3 GRUP C (CSS) → D-S4 GRUP D (JS) → D-S5 GRUP E (Frontend↔Backend) → D-S6 GRUP F (React, panoları tamamla) → D-S7 GRUP G (Angular) → D-S8 GRUP H (Locator Ustalığı, lab'ı tamamla) → D-S9 GRUP I (error-dictionary, min 12) → D-S10 GRUP J (mülakat, min 50) → D-S11 kapanış denetimi (i18n TRIO_COMPLETE_PAGES kaydı, §9.5 denetimi, build/i18n/content-integrity nihai doğrulama, bu dosyanın güncellenmesi).
2. **i18n baseline borcunu sayfa sayfa düşürmek** (`feature/api-testing-page` branch'inde kalan iş, kullanıcı onayladı, aktif hedef). `scripts/i18n-leaks-baseline.json` sitedeki mevcut (grandfathered) sızıntıyı dosya başına sayıyor — toplam **8490**. En yüklü dosyalar: `javaData.js` 676 · `playwrightData.js` 630 · `gitGithubData.js` 608 · `cypressData.js` 520 · `seleniumData.js` 499 · `backendData.js` 488 · `llmAgentsData.js` 475 · `claudeAiData.js` 401 · `appiumData.js` 392 · `kubernetesData.js` 379 · `kafkaData.js` 372 · `sqlData.js` 335 · `jmeterData.js` 334 · `brunoData.js` 328 · `postmanData.js` 310 · `jenkinsData.js` 303 · `linuxData.js` 273 · `pythonData.js` 266 · `dockerData.js` 221 · `awsData.js` 156 · `typescriptData.js` 158 · `basitBackendData.js` 142 · `azureData.js` 132 · `browserstackData.js` 41 · `algorithmsData.js` 25 · `restAssuredData.js` 12 · `gaugeData.js` 10 · `javascriptData.js` 3 · `securityData.js` 1. Bir dosya temizlenince `npm run i18n:baseline` ile borç kalıcı düşürülür (asla yükseltilmez); tamamen temizlenen sayfa `STRICT_ZERO_FILES`'a eklenip sıfır-tolerans yapılabilir. Detay: CLAUDE.md §23.1, script: `scripts/check-i18n-leaks.mjs`.
3. **`main`'e merge/PR kararı** (her iki açık branch için de) kullanıcıda.
4. **AC08 çoklu tema paleti** — kullanıcı "şimdilik atla" dedi, plan `Documents/acceptancecriterias.md` Madde 11'de hazır bekliyor.
5. **Bilinen ASCII-normalize Türkçe kör noktası** — `bakiyor`, `gunceller` gibi Türkçe-özgü karakter içermeyen sızıntılar hiçbir otomatik kontrolle yakalanamıyor, elle göz gezdirmek gerekiyor (CLAUDE.md §23.1).

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
