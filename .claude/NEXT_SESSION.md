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

## 📌 Şu An Ne Durumdayız (son güncelleme: 2026-07-28, prediction/code-trace/heap-stack dalgası)

- **Aktif branch: `feature/prediction-blocks`.** Kullanıcının öğrenme bilimi değerlendirme yazısına (2026-07-27) karşılık, `Documents/learning-science-upgrade-plan.md` planı uygulandı. **3 yeni blok tipi + 5 dile rollout TAMAMLANDI:**
  - **Yeni bileşenler (Opus, self-contained, backend gerektirmez):** `PredictionBlock.jsx` (`type: 'prediction'` — "Önce Tahmin Et, Sonra Gör" / active recall), `CodeTraceBlock.jsx` (`type: 'code-trace'` — satır satır kod yürüyüşü), `HeapStackBlock.jsx` (`type: 'heap-stack'` — Stack/Heap bellek görselleştirmesi). Üçü de `TopicPage.jsx`'te kayıtlı, şemalar plan dosyasının Bölüm 2'sinde.
  - **Görev S1 (prediction rollout) TAMAMLANDI:** javaData.js (7 blok: string concat, division promotion, operator precedence, switch fall-through, Integer cache, unboxing NPE, array equality), pythonData.js (3: is/==, mutable default arg, float precision), sqlData.js (2: COUNT(*)/NULL, JOIN row multiplication), javascriptData.js (3: hoisting, ==/===, closure+var), typescriptData.js (2: excess property check, structural typing) — **toplam 17 prediction bloğu** (bir eski commit mesajında "20" yazıyor ama gerçek sayı 17; kod doğru, mesaj kozmetik hata).
  - **Görev S2 (code-trace + heap-stack rollout) TAMAMLANDI:** javaData.js (for loop trace + OOP aliasing heap-stack), pythonData.js (for loop trace + mutable-default heap-stack), javascriptData.js (for loop trace + object reference heap-stack).
  - **Doğrulama:** her commit'te `node --check` + `check-content-integrity.mjs` + `check-i18n-leaks.mjs` (i18n baseline 109 sabit, regresyon yok) + `npm run build` ayrı ayrı çalıştırıldı, hepsi geçti.
  - **#7 Learning Analytics dashboard TAMAMLANDI (Opus, 2026-07-28):** `getLearningAnalytics()` (progressStore.js) + `getMostMissedAreas()` (reviewQueue.js) + `LearningAnalytics.jsx` panosu, HomePage'de ActivityHeatmap'ten sonra render ediliyor. Tamamen local-first (backend yok): ortalama quiz başarısı, en güçlü/en zayıf konu, en çok hata yapılan alan. Seeded-localStorage smoke testiyle doğrulandı (accuracy/strongest/weakest/most-missed hepsi doğru). Commit `e081451`.
  - **code-trace/heap-stack genişletme TAMAMLANDI (Opus, 2026-07-28, düşük öncelik seçildi, commit `5daa148`):** Mevcut sayfalara 4 yeni blok eklendi — javaData: String Pool heap-stack (`==` interning tuzağı) + iki-işaretçi dizi ters çevirme code-trace; pythonData: `b=a` vs `b=a[:]` list-copy heap-stack; javascriptData: `.reduce()` akümülatör code-trace. Hepsi tek sabit + ağaç referansı; `code` alanları yorumsuz (renderer düz string), açıklamalar bilingual `note`'larda. `node --check` + content-integrity + i18n (baseline 109) + build hepsi geçti.
  - **Prediction derinleştirme TAMAMLANDI (Opus, 2026-07-28, commit `40fd0d1`):** Dil sayfalarının boş/az kapsanan sekmelerine 8 yeni `prediction` bloğu — sqlData: `= NULL` vs `IS NULL` + `WHERE`'de aggregate hatası (HAVING); typescriptData: `any` vs `unknown` + `as` type assertion (runtime TypeError); pythonData: `[[0]]*3` paylaşımlı iç liste + `for...else`; javascriptData: `.sort()` sözlüksel varsayılan + `typeof null/[]/NaN`. Çift-ağaç dosyalarda tek sabit + iki ağaç referansı (SQL/TS `replace_all` ile). Tüm geçitler yeşil (content-integrity + i18n 109 + build).
  - **Prediction DOYURMA dalgası TAMAMLANDI (Opus, 2026-07-28, commit'ler SQL/Java/Python/JS/TS ayrı):** kullanıcı "aynı sayfalarda maksimum sayıda ekle" dedi → her dil sayfasının kalan gotcha'ya değer sekmeleri kapsandı. +16 yeni prediction: SQL +4 (DISTINCT çoklu-sütun, WHERE'siz UPDATE, NOT IN+NULL, BETWEEN dahil-uç), Java +3 (for-each remove→CME, int taşması wrap, finally return ezme), Python +3 (1/1.0/True dict anahtarı, class-level mutable paylaşım, UnboundLocalError), JS +4 ("5"+1 vs "5"-1, setTimeout(0) makrotask, Promise mikrotask önceliği, koparılmış metotta this→TypeError), TS +3 (tuple.push bypass, ?? vs ||, catch e:unknown). **Güncel kapsam: java=10, js=9, python=8, sql=8, ts=7.** Her biri bilingual + Java analojisi + QA bağlamı; tüm geçitler yeşil (node --check + content-integrity + i18n 109 + build 43 shell). Boş kalan sekmeler ya kavramsal olarak gotcha'ya uygun değil (kurulum/mülakat/pratik) ya da düşük değerli (Generics/Utility Types predict-output'a uymaz).
  - **🔜 SIRADAKİ OTURUM — buradan devam et** (hepsi backend/mimari/product kararı ister, kullanıcı onayı olmadan tek başına kodlanmaz; detay `learning-science-upgrade-plan.md` §0 + §5):
    1. **#6 Adaptif zorluk** — quiz motoruna (TopicPage ~18k satır, çok E2E testi) dokunur, zorluk-etiketli soru havuzu gerekir. Riskli, ayrı planla.
    2. **#5 Kişisel AI Mentor** — "hangi konuda zorlanıyorsun" verisi #7 analytics ile YERELDE zaten var; konuşan/AI katmanı Supabase tablo+RPC+edge function ister.
    3. **#8 Portföy/proje üretimi** — en büyük epik.
    4. **Düşük öncelik (opsiyonel):** Java/Python/JS'e code-trace/heap-stack genişletme dalgası 2026-07-28'de yapıldı (yukarı bak, commit `5daa148`). Kalan: SQL/TS'e ekleme — SQL için heap/stack kavramsal uymaz; TS runtime = JS (düşük değer).
  - **Açık iş:** `main`'e merge/PR kararı kullanıcıda. Branch içerik olarak tamamlandı, tüm geçitler yeşil (`node --check` + content-integrity + i18n:check baseline 109 + build).

- **`frontenddevelopment-for-qa` branch'i** (önceki oturum, bu dalgada dokunulmadı): **`/qa-frontend` — "QA için Frontend: Developer'la Aynı Dili Konuşmak" sayfası içerik olarak TAMAMLANDI** (Opus iskelet+referanslar + Sonnet GRUP A-J + D-S11 kapanış denetimi, hepsi 2026-07-25). Detaylı geliştirme geçmişi (hangi GRUP'ta ne yazıldığı) artık tekrarlanmıyor — `git log --oneline` (commit'ler `feat(qa-frontend): GRUP X tamamlandı` formatında açıklayıcı) ve `Documents/qa-frontend-page-plan.md` yeterli referanstır.
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
3. **`javaData.js` (149→86) ve `browserstackData.js` (41→14) temizlendi (2026-07-27, bu oturum, henüz commit edilmedi):** Her iki dosyada da tüm `{TR,EN}` ve `EN-ÇEVİR` etiketli sızıntılar düzeltildi — kalan sayılar TAMAMEN ⚠ OPUS (renderer HAM basıyor, dokunulmadı, kural gereği). Baseline **199 → 109** (`npm run i18n:baseline` ile güncellendi). Kalan borç: `javaData.js` 86 (hepsi OPUS, çoğu `locator-visual`/`playwright-visual` blokları), `browserstackData.js` 14 (hepsi OPUS, `error-dictionary` `codeWrong`/`codeFixed`), `backendData.js`'deki 7 kalıcı OPUS leak.
   - **`javaData.js`'deki `sPlaywright.en` "ölü kod" bug'ı ÇÖZÜLDÜ (2026-07-29, Sonnet):** `sPlaywright` const'ında ~1250 satırlık, `sPlaywright.en = { title, blocks: sPlaywright.tr.blocks }` override'ı tarafından hiç render edilmeyen (ulaşılamaz) eski bir `en: {...}` objesi vardı — kullanıcı iki seçenekten (b)'yi seçti: ölü obje tamamen silindi (1257 satır, `git diff --stat` ile doğrulandı: sadece silme, 0 ekleme), override (`sPlaywright.en = {...blocks: sPlaywright.tr.blocks}`) kalıcı çözüm olarak korundu — zaten `sPlaywright.tr.blocks` alan-bazlı `{tr,en}` içeriyor. Doğrulama: `node --check` ✓, `check-content-integrity.mjs` ✓ (38 dosya), `check-i18n-leaks.mjs` ✓ (baseline 109 sabit), `npm run build` ✓ (43 static shell). `javaData.js` 20506 → 19249 satıra indi.
   - `node scripts/check-i18n-leaks.mjs --list <dosya>.js` her sızıntıyı shared/en-only tespiti + fix önerisiyle listeler (EN-ÇEVİR / YERİNDE-ÇEVİR / {TR,EN} / ⚠ OPUS). ⚠ OPUS etiketli leak'lere hiçbir zaman dokunulmamalı — renderer güncellemesi gerektirir. **Bir dosyayı `STRICT_ZERO_FILES`'a eklemeden önce mutlaka `--list` ile kalan leak sayısının GERÇEKTEN 0 olduğunu doğrula.**
   - **Doğrulama:** `check-content-integrity` ✓ · `npm run build` ✓ (43 static shell, SEO geçti) · `node --check` her iki dosya için ✓.
   - **⚠ OPUS etiketi ÇÜRÜTÜLDÜ, scanner düzeltildi (2026-07-29, Sonnet):** `javaData.js`'in 86 kalan "OPUS" leak'inin gerçekte scanner'ın kör noktası olduğu bulundu — `locator-visual`/`playwright-visual` blokları `{tr,en}` obje değil, çıplak `field`/`fieldEn` çift alan kullanıyor (`title`/`titleEn` vb.) ve renderer bunu zaten doğru seçiyor (`TopicPage.jsx` satır ~4572-4991, `isTr ? loc.title : (loc.titleEn||loc.title)`) — HİÇBİR renderer değişikliği gerekmiyor. `check-i18n-leaks.mjs`'e `EN_SIBLING_FIELDS_CAMEL` seti eklendi (kardeş `${key}En` doluysa leak sayma) + `highlights` alanı `SAFE_KEYS`'e eklendi (sadece HTML vurgu eşleştirmesi, hiç ekrana basılmıyor). Sonuç: javaData.js **86→44**, baseline **109→67**. Detay: CLAUDE.md §23.6.
   - **Kalan gerçek borç (44 javaData.js + 14 browserstackData.js) DA renderer işi DEĞİL:** Kalanların tamamı `code`/`codeWrong`/`codeFixed` alanları — bunlar `CodeBlock` → `getLocalizedCode()` üzerinden basılıyor, bu fonksiyon hem `{tr,en}` objesini hem düz string'i (regex tabanlı `codeCommentTranslations`/`englishToTurkishCodeComments`, `TopicPage.jsx` satır 45/366) destekliyor — yani bu 58 leak de PURE VERİ işiyle kapanır: ya eksik yorum ifadesini `codeCommentTranslations`'a ekle, ya da `code` alanını `{tr,en}` yap. Renderer'a hiç dokunulmadan ilerlenebilir. Sıradaki oturumda ele alınabilir.
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
