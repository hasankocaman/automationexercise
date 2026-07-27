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

## 📌 Şu An Ne Durumdayız (son güncelleme: 2026-07-27)

- **Aktif branch: `frontenddevelopment-for-qa`.** **`/qa-frontend` — "QA için Frontend: Developer'la Aynı Dili Konuşmak" sayfası içerik olarak TAMAMLANDI** (Opus iskelet+referanslar + Sonnet GRUP A-J + D-S11 kapanış denetimi, hepsi 2026-07-25). Detaylı geliştirme geçmişi (hangi GRUP'ta ne yazıldığı) artık tekrarlanmıyor — `git log --oneline` (commit'ler `feat(qa-frontend): GRUP X tamamlandı` formatında açıklayıcı) ve `Documents/qa-frontend-page-plan.md` yeterli referanstır.
  - **Sayfanın içeriği:** 10 GRUP (A-J), 12 video-scene filmi (dahil "5 Locator Yarışı" — sayfanın en kritik filmi, "Stale Element", "*ngIf Kapıyı Açıp Kapıyor"), 4 Kaynak→DOM→Locator panosu (BugCard/Modal/StatusBadge/Toast), 12 error-dictionary hatası, **50 mülakat sorusu (15/20/15, `node scripts/audit-interview-questions.mjs` ile bağımsız doğrulandı — script artık `/qa-frontend`'i de içeriyor)**, tüm quiz'lerde retryQuestion, §9.5 trio'su (video+animasyon+sandbox) GRUP A-J'nin TAMAMINDA doğrulandı.
  - **Doğrulama durumu:** `check-content-integrity` ✓ · `i18n:check` ✓ (sıfır sızıntı, `qaFrontendData.js` hem `STRICT_ZERO_FILES` hem `TRIO_COMPLETE_PAGES`'te) · `npm run build` ✓ (43 statik shell, SEO geçti) · `audit-interview-questions.mjs` ✓ — hepsi geçti.
  - **Manuel test rehberi hazır:** `Documents/qa-frontend-page-plan.md` §F — kurulumdan (`npm run dev` → `/qa-frontend`) grup grup elle test adımlarına (video-scene oynatma, quiz-gating akışı, Locator Lab, feynman AI değerlendirmesi vb.) kadar adım adım rehber.
  - **Bilinen uyarı:** `QaFrontendPage` chunk'ı 515.59 kB (build'i bozmuyor, CLAUDE.md §14/§23.8 kapsamında bilinen durum).
  - **Açık kalan (opsiyonel):** `npm run test:e2e` (Playwright) bu sayfa için henüz koşulmadı; `main`'e merge kararı kullanıcıda.
- `feature/api-testing-page` branch'i (ayrı branch, bu oturumda dokunulmadı): `origin/feature/api-testing-page` ile senkron (`bac59ee`). `/api-testing` sayfası içerik olarak TAMAMLANDI (57 sekme, GRUP A-K, Faz 1-10). Plan: `Documents/api-testing-page-plan.md`. `main`'e henüz merge/PR açılmadı — karar kullanıcıda.
- Bu branch'e geçmeden önceki oturumda `feature/api-testing-page` üzerinde **i18n EN-sızıntı temizliği** yapılmıştı: video-scene pasif buton görünürlüğü düzeltildi, 6 tablo + error-dictionary bilingual yapıldı, code-playground yorumları bilingual hale getirildi (TR Türkçe / EN İngilizce), ve yeni bir **statik scanner** eklendi: `scripts/check-i18n-leaks.mjs` (build zincirinde + `pre-commit`'te çalışır, `npm run i18n:check` / `npm run i18n:baseline`). Kök neden, çözüm ve kullanım detayı: **CLAUDE.md §23.1**.

## 🔜 Açık İşler / Sıradaki Adımlar

1. **i18n scanner'da kritik bug bulundu ve düzeltildi (2026-07-27, commit `71c527b`):** `check-i18n-leaks.mjs` çift-ağaçlı dosyalarda **yanlış ağacı** tarıyordu (`data.tr.sections` yerine EN modunda gerçekten görünen `data.en.sections` taranmalıydı) — eski baseline'daki **8490** sızıntının büyük çoğunluğu hayaletti (TR-ağacı içeriğini yanlışlıkla "leak" sayıyordu). Gerçek borç ölçüldü: **365 → bu oturumda 223'e indirildi**. Ayrıca Windows'ta `import()` ham dosya yolu hatası scanner'ı sessizce no-op yapıyordu (düzeltildi, `pathToFileURL`). Scanner'a iki kalıcı iyileştirme eklendi: `pattern` alanı SAFE_KEYS'e alındı (görünmez regex alanı) ve `why`/`note` için sibling-aware kontrol eklendi (`why_en`/`note_en` doluysa leak sayılmıyor — java-compare bloklarının çoğunda zaten vardı, yanlış-pozitifti).
   - **Tam temizlenen 8 dosya** (`STRICT_ZERO_FILES`'a eklendi, sıfır-tolerans): `kafkaData.js`, `basitBackendData.js`, `jmeterData.js`, `playwrightData.js`, `cypressData.js`, `typescriptData.js`, `sqlData.js`, `pythonData.js`.
   - **`basitBackendData.js`, `pythonData.js` ve `backendData.js`'de gizli paylaşımlı sabit riski bulundu:** bazı `code`/`python`/`java` alanları TR ve EN ağaçları arasında AYNI JS `const` değişkenini paylaşıyordu (wrapper blok objesi farklı olsa bile) — scanner bunu "paylaşımsız" sanıp yanlış etiketliyordu. Doğru fix uygulandı: yeni İngilizce sabitler oluşturulup `{tr, en}` wrapper ile sarıldı, TR içeriğine dokunulmadı (kanıtlanmış: TR tarafı hâlâ Türkçe gösteriyor).
   - **`linuxData.js` kısmi (3/5 temizlendi):** kalan 2 `codeFixed` leak'i `linuxErrors` adlı, hem TR hem EN wrapper bloğunda AYNI referansla kullanılan bir diziye ait — bilinçli olarak dokunulmadı, `STRICT_ZERO_FILES`'a eklenmedi.
   - **Doğrulama:** `check-content-integrity` ✓ · `npm run build` ✓ · `i18n:check` ✓ (223, regresyon yok) · Playwright `i18n-content-toggle.spec.ts` 32/32 geçti (gerçek tarayıcıda EN-mod Türkçe karakter taraması, python/sql/typescript/jmeter dahil).
   - Commit: `71c527b` (scanner fix + 8 dosya) · `4c98dea` (bu dosya güncellemesi).
   - Detaylı Sonnet-görev şablonu ve fix-etiketleme mantığı: `Documents/i18n-cleanup-sonnet-prompt.md` (artık kısmen güncel değil — kalan dosyalar için madde 2'ye bak).
2. **`backendData.js` de temizlendi (2026-07-27, commit `12d2bee`):** 24 `code` alanının tamamı aynı paylaşımlı-sabit kalıbıyla düzeltildi (schemaSql, authCode, stripeCheckoutFunctionCode vb. — 6 Supabase SQL şeması/RLS/trigger + Auth client/API/callback/form + Progress/Badge/Feedback/Chat API + Premium paywall şeması/RLS/4 Edge Function/React state). Kalan **7 leak** (`backend-practice` `example` alanı) ⚠ OPUS etiketli — paylaşımlı + ComparisonBlock'un ham (tx'siz) render ettiği bir alan, bilinçli dokunulmadı. Bu arada **`check-content-integrity.mjs`'de bir kör nokta bulundu ve düzeltildi**: İngilizce-yorum denetimi yalnızca inline `en: \`...\`` alanlarını güvenli sayıyordu, projenin kendi `const xxxEn = \`...\`` sabit kalıbını (basitBackendData.js'de zaten kuruluydu) tanımıyordu — genişletildi. `/backend` §22.1 kalıcı test istisnası (RequireAdmin) olduğu için Playwright kapsamında değil, doğrulama programatik yapıldı (24/24 alan). Baseline: 223 → **199**.
3. **i18n baseline borcunu düşürmeye devam** — kalan **199**, 2 dosyada: `javaData.js` **149**, `browserstackData.js` **41**, artı `backendData.js`'deki 7 kalıcı OPUS leak. `javaData`/`browserstackData` da muhtemelen aynı paylaşımlı-sabit deseni taşıyor (doğrulanmadı) — fix aynı iki adımlı kalıp: (1) yeni İngilizce sabit oluştur, (2) `code: { tr: eskiSabit, en: yeniSabit }` şeklinde sar, TR'ye dokunma. `node scripts/check-i18n-leaks.mjs --list <dosya>.js` her sızıntıyı shared/en-only tespiti + fix önerisiyle listeler (EN-ÇEVİR / YERİNDE-ÇEVİR / {TR,EN} / ⚠ OPUS). ⚠ OPUS etiketli leak'lere hiçbir zaman dokunulmamalı — renderer güncellemesi gerektirir. **Bir dosyayı `STRICT_ZERO_FILES`'a eklemeden önce mutlaka `--list` ile kalan leak sayısının GERÇEKTEN 0 olduğunu doğrula** — OPUS leak kalan bir dosyayı STRICT_ZERO'ya eklemek build'i kırar (bu oturumda `backendData.js` ile bir kez yaşandı, düzeltildi).
4. **`/qa-frontend` → `main` merge/PR kararı** kullanıcıda; sayfa içerik olarak bitti, manuel test rehberi (`Documents/qa-frontend-page-plan.md` §F) hazır, isteğe bağlı olarak `npm run test:e2e` ile Playwright koşumu yapılabilir.
5. **`main`'e merge/PR kararı** (her iki açık branch için de) kullanıcıda.
6. **AC08 çoklu tema paleti** — kullanıcı "şimdilik atla" dedi, plan `Documents/acceptancecriterias.md` Madde 11'de hazır bekliyor.
7. **Bilinen ASCII-normalize Türkçe kör noktası** — `bakiyor`, `gunceller` gibi Türkçe-özgü karakter içermeyen sızıntılar hiçbir otomatik kontrolle yakalanamıyor, elle göz gezdirmek gerekiyor.

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
