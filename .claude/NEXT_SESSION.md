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

## 📌 Şu An Ne Durumdayız (son güncelleme: 2026-07-30, Opus — Challenge-First Phase 1 Opus tarafı)

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
  - 🔜 **Sırada:** `tests/mission-flow.spec.ts` (P1-S3) + CLAUDE.md §5'e
    `mission` ekleme (P1-S4). Ardından Phase 1.5 tooltip sözlüğü genişletme
    (§7.3, P1.5-S1…S3).
  - **Açık iş:** `main`'e merge/PR kararı kullanıcıda. Phase 2 (Sprint Simulator) ve
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
    yalnızca deploy sonrası prod'da devreye girer. `main`'e merge/PR kararı
    kullanıcıda.

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

0. **YENİ PLAN (2026-07-30) — `Documents/challenge-first-experience-plan.md`:**
   Kullanıcının stratejik değerlendirme yazısı denetlendi. Sonuç: yazının
   "Phase 3" listesinin çoğu ZATEN BİTMİŞ (mentor/prediction/memory-viz/analytics).
   Gerçek yeni değer → **Phase 1: Challenge-First Senaryo Katmanı** (yeni `mission`
   blok tipi; mevcut sandbox'ları göreve sarar, frontend-only). Kullanıcı bu yönü
   seçti (2026-07-30). Phase 2 = Sprint/Company Simulator, Phase 3 = adaptif zorluk,
   Phase 4 = park. Opus/Sonnet hazır promptları planın §7'sinde. **Açık karar
   (Opus başlamadan):** görevler sayfa-içi mi ayrı sekme mi (öneri: sayfa-içi).

1. **i18n EN-sızıntı temizliği TAMAMEN BİTTİ (2026-07-25 → 2026-07-29, çoklu oturum, KAPALI):** `check-i18n-leaks.mjs` scanner'ı sıfırdan inşa edildi ve art arda düzeltildi — yanlış-ağaç tarama (8490 hayalet leak), paylaşımlı-sabit tespiti, `why`/`note` ve `field`/`fieldEn` sibling farkındalığı, `codeCommentTranslations` runtime simülasyonu. Borç azalma sırası: 8490(hayalet) → 646 → 365 → 223 → 199 → 109 → 67 → 9 → **0**. Kök neden/çözüm kalıpları kalıcı olarak **CLAUDE.md §23.1 ve §23.6**'da belgeli (yeni bir "OPUS"/"YERİNDE-ÇEVİR" leak'e rastlarsan önce oraya bak); adım adım geçmiş `git log --oneline`'daki `fix(i18n...)` commit'lerinde duruyor, burada tekrarlanmıyor. `npm run i18n:check` artık "grandfathered borç: 0" basıyor — herhangi bir yeni sızıntı build'i kırar.
2. **`/qa-frontend` → `main` merge/PR kararı** kullanıcıda; sayfa içerik olarak bitti, manuel test rehberi (`Documents/qa-frontend-page-plan.md` §F) hazır, isteğe bağlı olarak `npm run test:e2e` ile Playwright koşumu yapılabilir.
3. **`main`'e merge/PR kararı** (her iki açık branch için de) kullanıcıda.
4. **AC08 çoklu tema paleti** — kullanıcı "şimdilik atla" dedi, plan `Documents/acceptancecriterias.md` Madde 11'de hazır bekliyor.
5. **Bilinen ASCII-normalize Türkçe kör noktası** — `bakiyor`, `gunceller` gibi Türkçe-özgü karakter içermeyen sızıntılar hiçbir otomatik kontrolle yakalanamıyor, elle göz gezdirmek gerekiyor.

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
