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
  - **GRUP F (React) kısmi:** Opus tarafından imza "Kaynak→DOM→Locator" pano referansı (grid cols:3 + 🎯) eklendi, başlıklar (F1-F7) henüz atomik olarak işlenmedi.
  - **GRUP H (Locator Ustalığı) kısmi:** Opus tarafından Locator Laboratuvarı referansı (`locator-explorer` + deploy-kırılganlığı `code-playground`) eklendi, başlıklar (H1-H8) henüz atomik olarak işlenmedi.
  - **GRUP B, C, D, E, G, I, J: henüz boş/placeholder** — sadece açılış `simple-box` var, atomik başlıklar yok.
  - **Çalışma düzeni (kullanıcı talimatı, 2026-07-25):** her fazın sonunda (1) bu dosya güncellenir, (2) **test/build çalıştırılmadan** commit atılır, (3) plandaki bir sonraki hazır Sonnet promptuyla devam edilir — bu döngü tüm fazlar bitene kadar tekrarlanır. Kapsamlı doğrulama (content-integrity/i18n/build) sadece plan §D-S11 (kapanış fazı) sonunda tek seferde yapılacak.
  - **Sıradaki faz: D-S2 (GRUP B — HTML: Locator'ın Ham Maddesi)**, prompt plan dosyası §D'de hazır.
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
