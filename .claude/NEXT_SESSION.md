# NEXT SESSION - Devam Noktasi (TEK Guncel Durum Dosyasi)

> Bu dosyayi `CLAUDE.md`'den hemen sonra, her oturum basinda oku.
> Kullanicidan proje durumunu tekrar isteme. Kalici kurallar `CLAUDE.md`,
> SEO mimarisi `codexSeo.md`, deploy/GSC adimlari `DEPLOY.md`; guncel is
> listesi ve son inceleme sonucu sadece bu dosyadadir.
>
> Bu dosyada commit hash ve anlik durum tutulabilir; kalici kural dosyalarina
> commit hash/anlik not yazilmaz.

---

## Guncel Branch Durumu (2026-06-29)

- Aktif branch: `main`.
- `test -> main` fast-forward merge tamamlandi (merge commit olusmadi),
  main pointer dogrudan test'in son commit'ine (`329c8e1`) ilerledi.
- `origin/main` push edildi. Calisma agaci temiz (`git status` bos).
- 62 dosya, tum test altyapisi, AC dokumanlari ve i18n duzeltmeleri main'de.

---

## Bu Oturumda Yapilan Is (2026-06-29 — Devam)

### Java Sayfasindaki TUM Kod Bolumlerine Interaktif Bloklar Eklendi (2. Tur)

Onceki oturumda sA (Basic Syntax) + OOP + Test Frameworks + Selenium bolumlerine
eklenen playground/step-animation/order-sort pattern'i kalan 7 bolume de yayildi:

- **sB (Strings & Math):** `javaPlaygroundStringMethods` (trim tuzagi) +
  `javaStepAnimationStringImmutable` (String immutability 5 adim) +
  `javaChallengeOrderStringChain` (driver.getTitle().trim()... zincir sirasi)
- **sC (Control Flow):** `javaPlaygroundIfElse` (koşul sırası bug) +
  `javaStepAnimationIfElse` (score=75 yolculugu) +
  `javaChallengeOrderIfElse` (PASS/FAIL/Pending if-else sirasi)
- **sD (Arrays):** `javaPlaygroundArrays` (ArrayIndexOutOfBounds) +
  `javaStepAnimationArrayMemory` (bellek modeli, length field) +
  `javaChallengeOrderArrayLifecycle` (new→assign→length→for-each→last element)
- **sE (Methods):** `javaPlaygroundMethods` (missing return statement) +
  `javaStepAnimationMethodCall` (add(5,3) → parametre → body → return akisi) +
  `javaChallengeOrderMethodAnatomy` (static+int+add+(int a,int b)+body)
- **sF (Advanced OOP):** `javaPlaygroundEnum` (switch fall-through) +
  `javaStepAnimationEnum` (break olmayinca fall-through demonstrasyon) +
  `javaChallengeOrderTryCatch` (try→catch→finally sirasi)
- **sCucumber:** `javaPlaygroundCucumber` (Given→When→Then sira bug) +
  `javaStepAnimationCucumberFlow` (feature→step def→Java metod→rapor) +
  `javaChallengeOrderCucumber` (Feature→Scenario→Given/When/Then→step defs→runner)
- **sPlaywright:** `javaPlaygroundPlaywright` (assert before navigate bug) +
  `javaStepAnimationPlaywrightFlow` (create→launch→navigate→locator→assertThat→auto-close) +
  `javaChallengeOrderPlaywright` (browser start→navigate→locator→assert→auto-close)

withExtraBlocks dizileri export icinde tum bolumler icin (sB, sC, sD, sE, sF,
sCucumber, sPlaywright) guncellendi. npm run build PASS, 785KB javaData chunk.

### Java Exercise Aciklamalari Iyilestirildi + Animasyon/Drag-Drop Eklendi

- `CodePlaygroundBlock.jsx`: `block.task` alani destegi eklendi — playground basliginin
  altinda mavi bir info kutusu render eder; kullaniciya 3 adimli gorev anlatiyor
  (Calistir → Bozuk kodu duzelt → Hint kullan).
- `javaData.js` — mevcut bloklar iyilestirildi:
  - `javaPlaygroundMainMethod`: label + task + explanation + 3 hint tamamen yeniden yazildi.
    Kullanici ne yapacagini, neden yapacagini ve her butonun ne ise yaradigini anlatiyor.
  - `javaPlaygroundJUnitAssertion`: ayni sekilde; assertEquals(expected,actual) sirasini
    ve CI/CD'de println vs assertion farkini acikliyor.
  - `javaChallengeMainSignature`: her yanlis secenek icin somut hata mesaji + neden yanlis aciklamasi.
  - `javaChallengeFillAssertEquals`: "assertion olmazsa test kalite karari vermez" vurgusu eklendi.
  - `javaChallengeMavenOrder`: her item emoji + daha aciklayici; "yanlis sirada Maven da hata verir" not.
  - `javaChallengeBugSpotSemicolon`: "error: ';' expected" hata mesajini dogrudan gosteriyor.
- `javaData.js` — yeni bloklar eklendi (6 adet):
  - `javaStepAnimationMainExecution` (Basic Syntax): JVM'nin main'i nasil bulup satir satir
    calistirdigini 5 adimda gosteriyor; Python farkliliklari notlaniyor.
  - `javaChallengeOrderMainStructure` (Basic Syntax, order-sort): class → main → degisken →
    println siralamasini surukle-birak ile ogret.
  - `javaStepAnimationAssertionFlow` (Test Frameworks): @Test tetiklemesinden PASSED/FAILED
    kararina 5 adim; println vs assertion farki somut mesajla gosteriliyor.
  - `javaChallengeOrderJUnitTest` (Test Frameworks, order-sort): import → class → @Test →
    assertion sirasi.
  - `javaStepAnimationWebDriverWait` (Selenium): click → WebDriverWait olustur → 500ms
    polling → element gorunur → getText() akisini 5 adimda gosteriyor.
  - `javaChallengeOrderWebDriverWait` (Selenium, order-sort): WebDriverWait kullanim
    adimlarini surukle-birak.
  - `javaChallengeOrderOopCreation` (OOP, order-sort): class yaz → new → constructor →
    reference → metod cagrisi.
- `withExtraBlocks` dizileri guncellendi; her bolumde animasyon + order-sort yerlestirildi.
- `npm run build` PASS — 38 static route shell, SEO check gecti.

### Java Sayfasina Python Ogretme Yontemi Yayildi (Codex)

- Aktif calisma branch'i bu oturumda `codex` olarak dogrulandi.
- `Documents/acceptancecriterias.md` ve Python sayfasindaki son block sistemi
  incelendi: `code-playground`, `good-vs-bad`, `step-animation`,
  `interactive-diagram`, `challenge` altyapisi Java sayfasina da uygulanabilir.
- `src/data/javaData.js` icine Java'ya ozel interaktif bloklar eklendi:
  - Basic Syntax: main method playground + main signature challenge + semicolon bug-spot.
  - OOP & Collections: object creation step-animation.
  - JUnit5/TestNG: test katmanlari diagrami, JUnit lifecycle, Maven flow,
    JUnit assertion playground, console vs assertion good-vs-bad, Maven order challenge.
  - Selenium: Thread.sleep vs WebDriverWait good-vs-bad.
  - Real World: test katmanlari diagrami + Maven flow.
- `src/lib/xp.js` route-aware hale getirildi; Java bloklari artik Python XP
  havuzunu kirletmeden `learnqa_xp_java` anahtarini kullanir. Python route'u
  geriye donuk uyumluluk icin `learnqa_xp_python` kullanmaya devam eder.
- Dogrulama: `npm run build` PASS; local preview `http://127.0.0.1:5173/java`
  200 dondu.

### AC03 — EN Modda Turkce Karakter Temizligi (Tamamlandi)

AC03 testi (`tests/i18n-content-toggle.spec.ts`) artik **28 passed, 0 failed**.
Onceki oturumdan gelen 3 fail tamamlandi:

1. **`/java` sekme 12: `// Ag sessizlesene kadar`**
   - `TopicPage.jsx` `codeCommentTranslations` dizisine
     `[/Ag sessizlesene kadar/gi, 'Until network is idle']` eklendi.

2. **`/browserstack` sekme 2: `Terminal — local makinende calistir`**
   - `SimulationBlock` renderinda `block.code` getLocalizedCode ile sarmalandi.
   - `browserstackData.js` ilgili simulation code block bilingual `{tr, en}` yapildi.

3. **`/test-frameworks` timeout**
   - `TestFrameworksPage.jsx` dil toggle wrapper'ina `data-testid="language-toggle"` eklendi.
   - Gercek icerik ihlali da cikti: `PythonFrameworksTab.jsx`'te
     `# Ornek: Chrome ayarlari sayfasindaki shadow DOM` yorumuna ozgul ceviri kurali eklendi.

### Diger Duzeltmeler (Ayni Oturum)

- `javaData.js`:
  - `Auto-Wait karsilastirma` label bilingual yapildi.
  - `Screenshot ve JavaScript islemleri` label (sSelenium + sPlaywright) bilingual yapildi.
  - Multi-page playwright-visual step kodu bilingual `{tr, en}` yapildi.
  - `sSelenium.en` by-xpath locator kodundaki `Giris Yap` -> `Login` duzeltildi.

- `TopicPage.jsx`:
  - `PlaywrightVisualBlock` step.code getLocalizedCode ile sarmalandi.
  - `SimulationBlock` block.code getLocalizedCode ile sarmalandi.
  - 10 yeni `codeCommentTranslations` kaydi eklendi.

### Test Coverage Raporu Olusturuldu

`Documents/testcoverage.md` dosyasi olusturuldu.
- 78 test, 13 dosya analiz edildi.
- AC bazinda kapsam tablosu (AC01-AC09).
- Test teknikleri, gercek bosliklar ve oncelikli iyilestirme onerileri belgelendi.

### test -> main Merge Tamamlandi

- Fast-forward merge: merge commit olusmadi, pointer ilerledi.
- `origin/main` push edildi.
- Calisma agaci temiz.

---

## Test Sonuclari (2026-06-29 — Son Kosum)

- `npm run build` PASS — 38 static route HTML shell, dist SEO check passed.
- `tests/i18n-content-toggle.spec.ts` PASS — **28 passed, 0 failed** (Java sayfasi dahil).
- `tests/topic-pages-ui.spec.ts` PASS — **24 passed, 0 flaky** (tam paralel kosumda da).
- `tests/topic-pages-ui.spec.ts` + `other-pages-ui.spec.ts` + `example.spec.ts` + tum dosyalar — **76 passed, 0 failed**.
- Onceki: 1 failed (/python) + 3 flaky (playwright/cypress/selenium) → **simdi hepsi pass**.

### Bu Oturumda Yapilan Test Duzeltmeleri

- `tests/python-page.spec.ts` SILINDI — hash URL kullaniyordu, yanlis sayfada calisiyor.
- `tests/sql-page.spec.ts` DUZELTILDI — `toBe(25)` → `toBeGreaterThan(20)` + `💼` emoji interview tab tespiti.
- `tests/javascript-page.spec.ts` DUZELTILDI — son sekme pozisyon varsayimi → `💼` emoji tespiti.
- `src/data/javaData.js` — `javaPlaygroundCucumber` + `javaPlaygroundPlaywright` `code` alani bilingual.
- `src/components/CodePlaygroundBlock.jsx` — `block.code` → `pick(block.code, isTr)` bilingual destegi.
- `playwright.config.ts` — `retries: 0 → 1` lokal ortamda flaky'leri azaltmak icin.
- **`src/components/TopicPage.jsx` — Pyodide CDN `.catch()` + `s.onerror` eklendi** (KRITIK).
  - Kök neden: `window.loadPyodide()` promise'inde `.catch()` yoktu; paralel test
    kosumunda CDN gecikmesi olunca unhandled promise rejection → Playwright pageerror.
  - Duzeltme: `.catch(() => { window._pyodideLoading = false })` + `s.onerror` handler.
  - Sonuc: /python testi tam paralelde de 0 fail, 0 flaky.
- Kalan risk: `buggyCode`/`fixedCode` icindeki Turkce yorumlar panel kapali → scan yakalamaz. `testcoverage.md` paragraf 7'de kayitli.

---

## Bitmis / Kapanmis Konular

- AC03 EN mod Turkce karakter ihlalleri: tum 24 route temizlendi.
- `test -> main` merge yapildi, `origin/main` push edildi.

---

## Eksikler / Riskler / Yapilacaklar (Oncelik Sirasi)

1. **Stale test dosyalari duzeltilmeli (testcoverage.md paragraf 7 referansi).**
   - `python-page.spec.ts`: `/#/python` ve `/#/typescript` eski hash URL'ler.
     Temiz path'e guncellenmeli veya `topic-pages-ui.spec.ts` kapsadigindan silinmeli.
   - `sql-page.spec.ts`: `expect(count).toBe(25)` hardcoded sayi; `toBeGreaterThan(20)` yapilmali.
   - `javascript-page.spec.ts` + `sql-page.spec.ts`: son sekme interview varsayimi;
     `typescript-page.spec.ts`'deki emoji yontemi uygulanmali.

2. **Uyelik gerektiren full AI/interview testleri kosturulmali.**
   - `.env.local` icine `TEST_USER_EMAIL` ve `TEST_USER_PASSWORD` eklenerek
     `npm run test:interview-flows` ve `tests/api-endpoints.spec.ts` uyelikli
     testleri tamamlanmali.

3. **Python interaktif ozellikleri diger sayfalara yayilabilir.**
   - Java sayfasina ilk yayilim yapildi: code-playground, good-vs-bad,
     step-animation, interactive-diagram ve challenge bloklari eklendi.
   - Selenium ve Playwright sayfalarina ayni block type'lari icerik ekleyerek
     tasinabilir.
   - Component mimarisi hazir; yeni component gerekmez.

4. **AC08 coklu tema paleti eksik.**
   - Kullanici "simdilik atla" demis. Gerekirse `Documents/acceptancecriterias.md`
     Madde 11 plani hazir.

5. **Bundle boyutu (teknik borc).**
   - `TopicPage` chunk ~1.3MB+.
   - Acil degil; code-splitting / manualChunks ile iyilestirilebilir.

---

## Onemli Dosyalar

- `src/components/TopicPage.jsx` — ortak block renderer, getLocalizedCode,
  codeCommentTranslations, quiz/interview gating, reset akisi.
- `src/data/javaData.js` — sSelenium ve sPlaywright bilingual label/code fix'leri.
- `src/components/PythonFrameworksTab.jsx` — kendi codeCommentTranslations dizisi var.
- `src/components/TestFrameworksPage.jsx` — data-testid="language-toggle" eklendi.
- `src/data/browserstackData.js` — simulation code bilingual.
- `tests/i18n-content-toggle.spec.ts` — AC03 Kosul B, 28 test.
- `Documents/testcoverage.md` — test kapsam raporu.
- `Documents/acceptancecriterias.md` — sistem kabul kriterleri (AC01-AC09).

---

## Hatirlatma

- Kullanici Core Java biliyor; QA muhendisi perspektifiyle ogreniyor.
- Turkce anlatim + Ingilizce teknik terimler.
- Python/TypeScript/QA anlatimlarinda Java analojisi zorunlu.
- Gorsel, animasyon ve deneme odakli ogretim tercih ediliyor.
