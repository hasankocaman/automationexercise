# NEXT SESSION - Devam Noktasi (TEK Guncel Durum Dosyasi)

> Bu dosyayi `CLAUDE.md`'den hemen sonra, her oturum basinda oku.
> Kullanicidan proje durumunu tekrar isteme. Kalici kurallar `CLAUDE.md`,
> SEO mimarisi `codexSeo.md`, deploy/GSC adimlari `DEPLOY.md`; guncel is
> listesi ve son inceleme sonucu sadece bu dosyadadir.
>
> Bu dosyada commit hash ve anlik durum tutulabilir; kalici kural dosyalarina
> commit hash/anlik not yazilmaz.

---

## Guncel Branch Durumu (2026-06-28)

- Aktif branch: `test`.
- Remote `origin/test` var ve local `test` branch fast-forward ile guncellendi.
- Pull sonrasi temel remote HEAD: `23de8b7` (`fix(i18n): localize the leaked Turkish option text in the fixture-scope challenge`).
- Calisma agacinda commit'e dahil EDILMEMESI gereken local izler olabilir:
  - `.claude/settings.local.json` local ayar dosyasi, untracked kalmali.
  - `dist/index.html` ve `public/sitemap.xml` onceki build dogrulamasindan sonra dirty gorunebilir; icerik degisikligi commitlenmeden once ayrica kontrol edilmeli.
  - `Documents/acceptancecriterias.md` bu oturumda agent tarafindan degistirilmedi
    ama `git status --short` icinde modified gorundu; commit oncesi sahibi/icerigi
    ayrica kontrol edilmeli.

---

## Son Oturum Notu (2026-06-28)

Bu oturumda kullanicinin istedigi iki entegrasyon duzeltmesi yapildi:

1. **Python static SEO import fix tamamlandi.**
   - `src/data/pythonData.js` icindeki
     `./pythonPlaygroundData` import'u `./pythonPlaygroundData.js` yapildi.
   - `npm run build` sonrasi `/python` icin onceki `Could not load SEO content`
     uyarisi artik gorunmedi.

2. **Bruno global search index'e eklendi.**
   - `src/utils/searchIndex.js` icine `brunoData` import'u eklendi.
   - `ALL_DATA` listesine `{ data: brunoData, route: '/bruno', name: 'Bruno' }`
     entry'si eklendi.
   - UI smoke dogrulamasi: ana sayfada search modalinda `Bruno` arandi,
     sonuc gorundu ve tiklayinca `http://127.0.0.1:5173/bruno` route'una gitti.

**Dogrulama sonucu:**

- `npm run build` PASS.
  - SEO check passed for 39 routes.
  - 38 static route HTML shell uretildi.
  - Dist SEO check passed for 38 generated pages.
- `npm run test:e2e` PASS.
  - Sandbox icinde ilk deneme Node `EPERM: lstat 'C:\Users\1'` hatasiyla
    baslamadan durdu; ayni komut escalation ile kosuldu.
  - Sonuc: 54 passed, 6 skipped.
- `npm run test:interview-flows` kosuldu ama full suite gercekten calismadi.
  - Sonuc: 22 skipped.
  - Sebep: `.env.local` icinde `TEST_USER_EMAIL` ve `TEST_USER_PASSWORD` yok.
    `VITE_SUPABASE_URL` ve `VITE_SUPABASE_PUBLISHABLE_KEY` var.
- Kullanici istegiyle tum runnable testler tekrar kosuldu.
  - `npm run build` PASS.
  - `npm run test:e2e` PASS: 54 passed, 6 skipped.
  - `test:quiz-audit` tam kapsami route gruplarina bolunerek tamamlandi:
    23/23 route passed.
  - `npx playwright test tests/api-endpoints.spec.ts` PARTIAL: public
    `get_leaderboard` passed, uyelik gerektiren 3 Edge Function testi skipped.
  - `npm run test:interview-flows` PARTIAL: 22 skipped.
  - Skip sebebi: `.env.local` icinde `VITE_SUPABASE_URL`,
    `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_ENABLE_PREMIUM` var; fakat
    `TEST_USER_EMAIL` ve `TEST_USER_PASSWORD` yok.
  - Bu nedenle uyelik/AI happy-path testleri tamamlanmis sayilmaz; env'e test
    kullanici bilgileri eklenirse tekrar kosulmali.

---

## Son Proje Incelemesi - Neler Degisti?

`test` branch'ine gelen degisiklikler genis kapsamli. Ana hatlar:

1. **Yeni `/bruno` sayfasi eklendi.**
   - `src/components/BrunoPage.jsx` yeni route component'i.
   - `src/data/brunoData.js` Bruno API Client egitim icerigi.
   - `src/App.jsx`, `src/components/HomePage.jsx`, `src/utils/seo.js`,
     `scripts/generate-static-routes.mjs` ve `public/sitemap.xml` tarafina
     `/bruno` route/SEO/nav/static shell baglantilari eklendi.
   - Bruno mulakat sekmesi EN/TR tarafinda 50 soru ve 15/20/15 dagilimiyle
     kurala uygun.

2. **Python sayfasina yeni interaktif ogrenme katmani geldi.**
   - `ManualTestingLabBlock.jsx`, `BuggyLoginForm.jsx`,
     `src/data/manualTestingLabBugs.js`: kasitli bug iceren login formu ve
     rule-based bug report puanlama.
   - `CodePlaygroundBlock.jsx`, `src/data/pythonPlaygroundData.js`: Run /
     Show Expected Output / Fix the Failing Test / Hint akisli kod pratikleri.
   - `src/lib/xp.js`, `src/components/XpStat.jsx`: Python sayfasi icin ortak
     local-first XP havuzu (`learnqa_xp_python`).
   - `GoodVsBadBlock.jsx`, `StepAnimationBlock.jsx`,
     `InteractiveDiagramBlock.jsx`: gorsel/animasyonlu anlatim bloklari.
   - `ChallengeBlock.jsx` ve `src/components/challenges/*`: multiple-choice,
     order-sort, fill-blank, bug-spot mini gorevleri. Bu is artik "sirada"
     degil, repoda tamamlanmis ve Python verisine baglanmis durumda.

3. **`TopicPage.jsx` ortak renderer genisledi.**
   - Yeni block type'lar eklendi:
     `manual-testing-lab`, `code-playground`, `good-vs-bad`,
     `step-animation`, `interactive-diagram`, `challenge`.
   - `CodeBlock` export edildi ve playground tarafinda yeniden kullaniliyor.
   - Mülakat akisi genisletildi: %80 altinda kalan kullanici icin sayfa
     hard-reset akisi var.
   - `ErrorDictionaryBlock` ve comparison/code yorum lokalizasyonu gibi i18n
     duzeltmeleri geldi.

4. **AI/quiz/interview kabul kriterleri icin test altyapisi genisledi.**
   - Yeni Playwright spec'leri eklendi: quiz retry, i18n content toggle,
     interview grading/reset, quiz AI explanation, API endpoint smoke,
     topic/other pages UI kontrolleri.
   - Ayrica uzun kosan ayri suite'ler geldi:
     `tests-extended/interview-mastery-flows.spec.ts`,
     `tests-quiz-audit/quiz-full-audit.spec.ts`.
   - `playwright.interview-flows.config.ts`,
     `playwright.quiz-audit.config.ts` ve `scripts/post-commit-tests.sh`
     eklendi.
   - `package.json` icine `test:interview-flows`, `test:quiz-audit` ve
     `simple-git-hooks` post-commit hook eklendi.

5. **Acceptance Criteria dokumani eklendi.**
   - `Documents/acceptancecriterias.md` AC01-AC09 kurallarini topluyor:
     navigasyon, quiz retry, i18n, %60 interview gate, AI aciklama,
     interview AI grading, %80 completion badge/reset, tema/roadmap.
   - `CLAUDE.md` bu dosyaya referans verecek sekilde guncellenmis.

---

## Dogru Yapilanlar

- Mevcut data-driven mimari korunmus: yeni egitim icerikleri agirlikli olarak
  `src/data/*Data.js` icinde, renderer ise `TopicPage.jsx` switch pattern'iyle
  genisletilmis.
- `/bruno` route'u sadece component olarak degil; nav, SEO metadata, sitemap ve
  static route shell uretimine de baglanmis.
- Bruno mulakat sorulari kural ile uyumlu: 50 soru, Basic 15 / Intermediate 20 /
  Advanced 15.
- Yeni Python ogrenme deneyimleri local-first calisiyor; XP localStorage ile
  kaydediliyor ve tekrar XP kazanimi `completed` listesiyle sinirlanmis.
- Challenge sistemi gercek component'lere bolunmus; ana `ChallengeBlock` sadece
  ortak chrome/XP/status sorumlulugunu tasiyor.
- Playwright test altyapisi sadece tek smoke testten ibaret kalmamis; AC02-AC07
  gibi kritik akislari hedefleyen testler yazilmis.
- Node 20+ ile `.env.local` yukleme `process.loadEnvFile` uzerinden yapiliyor;
  mevcut local Node 22 ve GitHub Actions Node 20 ile uyumlu.
- Build calisti: `npm run build` SEO check + static route generation +
  dist SEO check zincirini gecirdi.

---

## Eksikler / Riskler

1. **Supabase RLS SQL'leri kullanici tarafinda calistirilmali.**
   - AC07 reset akisinda `AuthContext.resetLessonProgress()` hazir.
   - `user_progress` delete policy yoksa Supabase tarafinda reset sessizce
     basarisiz olabilir.
   - Calistirilacak SQL:
     ```sql
     create policy "users delete own progress"
     on public.user_progress
     for delete
     using (auth.uid() = user_id);
     ```
   - `user_badges` INSERT/upsert RLS policy'si de kontrol edilmeli.

2. **Uyelik gerektiren full AI/interview testleri env eksigi nedeniyle skip.**
   - `.env.local` icinde `TEST_USER_EMAIL` ve `TEST_USER_PASSWORD` yok.
   - Bu yuzden `tests/api-endpoints.spec.ts` icindeki 3 uyelikli Edge Function
     testi ve `test:interview-flows` icindeki 22 full-flow test skip oluyor.
   - Bu iki test kullanici degiskeni eklenirse uyelik/AI happy-path suite'leri
     tekrar kosulmali.

3. **`/basit-backend` EN icerik eksigi bilerek duruyor.**
   - Tab 0 ve tab 3'te TR'de quiz var, EN tarafinda yok.
   - Kullanici talimati: onemsiz, zaman harcanmasin.

4. **AC08 coklu tema paleti eksik.**
   - Platformda dark/light mode var.
   - Acceptance Criteria alternatif renk paletleri istiyor.
   - Kullanici "simdilik atla" dedigi icin kodlanmadi.

5. **Bundle boyutu buyuk.**
   - `TopicPage` chunk ~1.3MB+.
   - `typescriptData`, `javaData`, `sqlData` 500KB+.
   - Build'i bozmaz, fakat code-splitting/manual chunk adayi.

---

## Yapilmasi Gerekenler (Oncelik Sirasi)

1. **Supabase manuel isleri:**
   - `learnqa-test` ve `learnqa-prod` icin `user_progress` DELETE RLS policy'sini
     ekle.
   - `user_badges` upsert/insert RLS policy'sini kontrol et.
   - Uzun interview suite'i gercekten kosmak icin `.env.local` icine
     `TEST_USER_EMAIL` ve `TEST_USER_PASSWORD` eklenmeli.

2. **Python interaktif ozelliklerini onaydan sonra diger sayfalara yay:**
   - Selenium, Playwright, Java, API testing sayfalarina ayni block type'lari
     veri/icerik ekleyerek tasinabilir.
   - Component mimarisi hazir; yeni component yazmak yerine data eklemek yeterli.

3. **Opsiyonel teknik borc:**
   - `TopicPage` ve buyuk data chunk'lari icin code-splitting/manualChunks
     degerlendir.
   - `test:quiz-audit` periyodik GitHub Actions job'ina baglanabilir.

---

## Onemli Dosyalar

- `src/components/TopicPage.jsx` - ortak block renderer, quiz/interview gating,
  reset akisi, simulation ve yeni block type case'leri.
- `src/data/pythonData.js` - Python sayfasi tab/section kompozisyonu.
- `src/data/pythonPlaygroundData.js` - Python code playground egzersiz verisi.
- `src/components/ManualTestingLabBlock.jsx` - manual bug report lab.
- `src/components/CodePlaygroundBlock.jsx` - Run/Fix/Hint playground.
- `src/components/ChallengeBlock.jsx` ve `src/components/challenges/*` - mini
  gorev sistemi.
- `src/lib/xp.js` - Python XP localStorage havuzu.
- `src/components/XpStat.jsx` - XP count-up ve toast UI.
- `src/data/brunoData.js` - Bruno API Client icerigi.
- `src/utils/searchIndex.js` - global search index; yeni public sayfa eklenirse
  buraya da eklenmeli.
- `Documents/acceptancecriterias.md` - AC01-AC09 kabul kriterleri.

---

## Hatirlatma

- Kullanici Core Java biliyor; QA muhendisi perspektifiyle ogreniyor.
- Turkce anlatim + Ingilizce teknik terimler.
- Python/TypeScript/QA anlatimlarinda Java analojisi zorunlu.
- Gorsel, animasyon ve deneme odakli ogretim tercih ediliyor.
