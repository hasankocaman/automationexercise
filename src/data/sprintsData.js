// QA Sprint Simulator — sprint/bug içeriği
// (Documents/sprint-simulator-and-open-items-plan.md §2.1)
//
// BİR BUG = BİR MISSION. Görevin 5 adımı QA iş akışının 5 aşamasına birebir
// oturur: Analiz → Test Case → Otomasyon → CI → Merge. Bu sıra bağlayıcıdır;
// yeni bug eklerken değiştirme (plan §6.1 Sonnet promptu).
//
// Gömülü bloklar SADECE mevcut tiplerden seçilir (`prediction`, `code-playground`)
// ve TopicPage'in `renderBlock` makinesinden geçer — bu dosya YENİ BİLEŞEN veya
// YENİ BLOK TİPİ TANIMLAMAZ (challenge-first "YENİ SANDBOX YAZMA" ilkesi).
//
// Bu dosya `check-i18n-leaks.mjs` STRICT_ZERO listesindedir: EN tarafında TEK bir
// Türkçe karakter (ığşçöüİĞŞÇÖÜ) build'i kırar.

// ─────────────────────────────────────────────────────────────────────────────
// LQA-101 — Sessiz login hatası (critical)
// ─────────────────────────────────────────────────────────────────────────────
const bugSilentLoginFailure = {
  id: 'lqa-101',
  key: 'LQA-101',
  severity: 'critical',
  title: {
    tr: 'Yanlış şifre girilince hiçbir hata mesajı çıkmıyor',
    en: 'No error message appears when a wrong password is entered',
  },
  reporter: { tr: 'Müşteri Destek Ekibi', en: 'Customer Support Team' },
  summary: {
    tr: 'Kullanıcı yanlış şifre girdiğinde form temizleniyor ama ekranda HİÇBİR uyarı görünmüyor. Kullanıcılar "sistem bozuk" diye destek talebi açıyor. Son 24 saatte 37 ticket geldi.',
    en: 'When a user enters a wrong password the form clears, but NO warning appears on screen. Users open support tickets saying "the system is broken". 37 tickets arrived in the last 24 hours.',
  },
  mission: {
    type: 'mission',
    id: 'sprint1-lqa-101-mission',
    xpReward: 50,
    relatedTopicId: 'sprint-1-lqa-101',
    persona: { tr: 'QA Engineer · Sprint 24 · Gün 2', en: 'QA Engineer · Sprint 24 · Day 2' },
    scenario: {
      tr: 'Sabah stand-up\'ında bu bug sana atandı. Ders okumayacaksın — gerçek bir QA gibi bug\'ı analiz edecek, test case yazacak, otomasyona dökecek, CI\'da koşturacak ve merge\'e hazır hâle getireceksin. Takıldığın adımda "Mini-lesson aç" ile ipucu alabilirsin.',
      en: 'This bug was assigned to you in the morning stand-up. You will not read a lesson — like a real QA you will analyze the bug, write a test case, automate it, run it in CI, and get it ready to merge. If you get stuck, open the mini-lesson for a hint.',
    },
    steps: [
      // ── 1) ANALİZ ──────────────────────────────────────────────────────────
      {
        id: 'lqa-101-step-analyze',
        brief: { tr: '1) ANALİZ — Bug raporunu aldın. İlk yapman gereken ne?', en: '1) ANALYZE — You received the bug report. What should you do first?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bir QA\'in ilk refleksi doğrulamaktır, düzeltmek değil. Yeniden üretemediğin (reproduce) bir bug\'ı ne test edebilirsin ne de düzeldiğini kanıtlayabilirsin. Java\'da bir NullPointerException\'ı stack trace olmadan çözmeye çalışmak gibidir: hangi satırın patladığını bilmeden yazdığın her düzeltme tahmindir. Adımları yazarak yeniden üretmek aynı zamanda bug raporunu da developer için kullanılabilir hâle getirir.',
          en: 'A QA\'s first reflex is to verify, not to fix. A bug you cannot reproduce is one you can neither test nor prove fixed. It is like trying to solve a NullPointerException in Java without the stack trace: without knowing which line blew up, every fix you write is a guess. Reproducing it step by step also turns the bug report into something a developer can actually use.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-101-analyze-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-101',
          prompt: {
            tr: 'Destek ekibi "login çalışmıyor" diyor. Elinde sadece bu cümle var. İLK adımın ne olmalı?',
            en: 'Support says "login is broken". That sentence is all you have. What should your FIRST step be?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Hemen bir otomasyon testi yazmaya başla', en: 'Start writing an automated test right away' },
              why: {
                tr: 'Neyi assert edeceğini henüz bilmiyorsun. Yanlış varsayımla yazılan test, yanlış şeyi yeşile boyar — en tehlikeli test budur.',
                en: 'You do not yet know what to assert. A test written on a wrong assumption turns the wrong thing green — that is the most dangerous kind of test.',
              },
            },
            {
              id: 'b',
              label: { tr: 'Ticket\'ı doğrudan developer\'a ata, o baksın', en: 'Assign the ticket straight to a developer and let them look' },
              why: {
                tr: 'Developer\'ın ilk soracağı şey "nasıl yeniden üretiyorum?" olacak. Doğrulanmamış ticket ping-pong\'a döner, sprint\'te gün kaybedersin.',
                en: 'The first thing the developer will ask is "how do I reproduce it?". An unverified ticket turns into ping-pong and costs you days in the sprint.',
              },
            },
            {
              id: 'c',
              label: { tr: 'Bug\'ı kendi ortamında adım adım yeniden üret (reproduce) ve gerçek davranışı not al', en: 'Reproduce the bug step by step in your own environment and note the actual behavior' },
              correct: true,
            },
          ],
          reveal: {
            tr: 'Doğru: önce yeniden üret. Yeniden ürettiğinde şunu görüyorsun — yanlış şifreyle form temizleniyor, ağ isteği 401 dönüyor ama ekranda hiçbir mesaj yok. Yani bug backend\'de DEĞİL: API doğru cevabı veriyor, frontend 401\'i sessizce yutuyor. Bu tek gözlem, bug\'ı doğru ekibe ve doğru katmana yönlendirir.',
            en: 'Correct: reproduce first. When you do, you see this — with a wrong password the form clears, the network request returns 401, but no message appears on screen. So the bug is NOT in the backend: the API answers correctly and the frontend silently swallows the 401. That single observation routes the bug to the right team and the right layer.',
          },
        },
      },
      // ── 2) TEST CASE ──────────────────────────────────────────────────────
      {
        id: 'lqa-101-step-testcase',
        brief: { tr: '2) TEST CASE — Bug\'ı yakalayan negatif test case\'i yaz.', en: '2) TEST CASE — Write the negative test case that catches this bug.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Test case, otomasyondan ÖNCE gelir çünkü otomasyon "nasıl" sorusunu, test case ise "ne" sorusunu yanıtlar. Given/When/Then kalıbı bu ayrımı zorlar: Given başlangıç durumu, When kullanıcının eylemi, Then GÖZLENEBİLİR sonuç. Buradaki kritik nokta Then satırıdır — "login başarısız olur" YETERSİZDİR, çünkü bug tam olarak buydu: login zaten başarısız oluyordu, görünen bir mesaj yoktu. Then satırı kullanıcının EKRANDA gördüğü şeyi söylemelidir.',
          en: 'The test case comes BEFORE automation because automation answers "how" while the test case answers "what". The Given/When/Then pattern forces that separation: Given the starting state, When the user action, Then the OBSERVABLE result. The critical line here is Then — "login fails" is NOT enough, because that was exactly the bug: login already failed, there was just no visible message. The Then line must state what the user SEES on screen.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-101-testcase-code',
          relatedTopicId: 'sprint1-lqa-101-mission',
          language: 'gherkin',
          label: { tr: 'Negatif login test case\'ini tamamla', en: 'Complete the negative login test case' },
          task: {
            tr: 'TODO satırını, kullanıcının EKRANDA göreceği hata mesajını doğrulayan bir Then satırıyla tamamla.',
            en: 'Complete the TODO line with a Then step that verifies the error message the user SEES on screen.',
          },
          explanation: {
            tr: 'Gerçek bir Cucumber koşumu değil; amaç gözlenebilir sonucu yazma refleksini pekiştirmek.',
            en: 'This is not a real Cucumber run; the goal is to reinforce the reflex of writing an observable outcome.',
          },
          code: {
            tr: `Senaryo: Yanlis sifre girildiginde kullanici uyarilir\n  Diyelim ki kullanici login sayfasindadir\n  Kullanici gecerli bir e-posta ve YANLIS bir sifre girer\n  Ve giris butonuna tiklar\n  O zaman ekranda "Sifre hatali" mesaji gorunur`,
            en: `Scenario: The user is warned when a wrong password is entered\n  Given the user is on the login page\n  When the user enters a valid email and a WRONG password\n  And clicks the sign in button\n  Then the message "Wrong password" is visible on screen`,
          },
          starterCode: {
            tr: `Senaryo: Yanlis sifre girildiginde kullanici uyarilir\n  Diyelim ki kullanici login sayfasindadir\n  Kullanici gecerli bir e-posta ve YANLIS bir sifre girer\n  Ve giris butonuna tiklar\n  # TODO: gozlenebilir sonucu yazan O zaman satirini ekle`,
            en: `Scenario: The user is warned when a wrong password is entered\n  Given the user is on the login page\n  When the user enters a valid email and a WRONG password\n  And clicks the sign in button\n  # TODO: add the Then line that states the observable outcome`,
          },
          solutionCode: {
            tr: `Senaryo: Yanlis sifre girildiginde kullanici uyarilir\n  Diyelim ki kullanici login sayfasindadir\n  Kullanici gecerli bir e-posta ve YANLIS bir sifre girer\n  Ve giris butonuna tiklar\n  O zaman ekranda "Sifre hatali" mesaji gorunur`,
            en: `Scenario: The user is warned when a wrong password is entered\n  Given the user is on the login page\n  When the user enters a valid email and a WRONG password\n  And clicks the sign in button\n  Then the message "Wrong password" is visible on screen`,
          },
          expected: {
            tr: 'Test case artık kullanıcının gördüğü somut bir sonucu doğruluyor — "başarısız oldu" gibi görünmez bir durumu değil.',
            en: 'The test case now verifies a concrete outcome the user sees — not an invisible state like "it failed".',
          },
          hints: [
            { tr: 'Then satırı, EKRANDA görünen bir şeyi tarif etmelidir; iç durumu değil.', en: 'The Then line must describe something visible ON SCREEN, not internal state.' },
            { tr: 'Mesajın metnini tırnak içinde yaz ki test neyi aradığını açıkça söylesin.', en: 'Put the message text in quotes so the test states exactly what it looks for.' },
          ],
          xpReward: 10,
        },
      },
      // ── 3) OTOMASYON ──────────────────────────────────────────────────────
      {
        id: 'lqa-101-step-automate',
        brief: { tr: '3) OTOMASYON — Test case\'i çalışan bir Selenium testine dönüştür.', en: '3) AUTOMATE — Turn the test case into a running Selenium test.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Assertion olmayan bir test, test değildir — sadece bir tıklama betiğidir. Tarayıcıyı açıp şifreyi yazıp butona basmak bug\'ı YAKALAMAZ; bug zaten "hiçbir şey olmuyor" durumuydu ve hiçbir şey olmadığında bu betik de sorunsuz biter, yani YEŞİL yanar. Bug\'ı yakalayan tek satır, hata mesajının görünürlüğünü kontrol eden assertion satırıdır.',
          en: 'A test without an assertion is not a test — it is just a click script. Opening the browser, typing the password and pressing the button does NOT catch the bug; the bug was precisely "nothing happens", and when nothing happens this script also finishes fine, meaning it goes GREEN. The one line that catches the bug is the assertion that checks the error message is visible.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-101-automate-code',
          relatedTopicId: 'sprint1-lqa-101-mission',
          language: 'java',
          label: { tr: 'Bug\'ı yakalayan assertion\'ı yaz', en: 'Write the assertion that catches the bug' },
          task: {
            tr: 'TODO satırını, hata mesajının görünür olduğunu doğrulayan bir assertion ile tamamla.',
            en: 'Complete the TODO line with an assertion verifying the error message is displayed.',
          },
          explanation: {
            tr: 'Gerçek bir tarayıcı koşumu değil; amaç "assertion olmadan test yeşil yanar" refleksini pekiştirmek.',
            en: 'Not a real browser run; the goal is to reinforce the reflex that "without an assertion the test goes green".',
          },
          code: {
            tr: `@Test\nvoid yanlisSifreUyariGosterir() {\n    driver.findElement(By.id("email")).sendKeys("test@learnqa.dev");\n    driver.findElement(By.id("password")).sendKeys("kesinlikle-yanlis");\n    driver.findElement(By.id("loginBtn")).click();\n\n    // Bug'i yakalayan satir: mesaj GORUNUR olmali\n    WebElement hata = wait.until(\n        ExpectedConditions.visibilityOfElementLocated(By.id("loginError")));\n    assertTrue(hata.isDisplayed());\n}`,
            en: `@Test\nvoid wrongPasswordShowsWarning() {\n    driver.findElement(By.id("email")).sendKeys("test@learnqa.dev");\n    driver.findElement(By.id("password")).sendKeys("definitely-wrong");\n    driver.findElement(By.id("loginBtn")).click();\n\n    // The line that catches the bug: the message must be VISIBLE\n    WebElement error = wait.until(\n        ExpectedConditions.visibilityOfElementLocated(By.id("loginError")));\n    assertTrue(error.isDisplayed());\n}`,
          },
          starterCode: {
            tr: `@Test\nvoid yanlisSifreUyariGosterir() {\n    driver.findElement(By.id("email")).sendKeys("test@learnqa.dev");\n    driver.findElement(By.id("password")).sendKeys("kesinlikle-yanlis");\n    driver.findElement(By.id("loginBtn")).click();\n\n    // TODO: hata mesajinin GORUNUR oldugunu dogrulayan assertion'i yaz\n}`,
            en: `@Test\nvoid wrongPasswordShowsWarning() {\n    driver.findElement(By.id("email")).sendKeys("test@learnqa.dev");\n    driver.findElement(By.id("password")).sendKeys("definitely-wrong");\n    driver.findElement(By.id("loginBtn")).click();\n\n    // TODO: write the assertion verifying the error message is VISIBLE\n}`,
          },
          solutionCode: {
            tr: `@Test\nvoid yanlisSifreUyariGosterir() {\n    driver.findElement(By.id("email")).sendKeys("test@learnqa.dev");\n    driver.findElement(By.id("password")).sendKeys("kesinlikle-yanlis");\n    driver.findElement(By.id("loginBtn")).click();\n\n    WebElement hata = wait.until(\n        ExpectedConditions.visibilityOfElementLocated(By.id("loginError")));\n    assertTrue(hata.isDisplayed());\n}`,
            en: `@Test\nvoid wrongPasswordShowsWarning() {\n    driver.findElement(By.id("email")).sendKeys("test@learnqa.dev");\n    driver.findElement(By.id("password")).sendKeys("definitely-wrong");\n    driver.findElement(By.id("loginBtn")).click();\n\n    WebElement error = wait.until(\n        ExpectedConditions.visibilityOfElementLocated(By.id("loginError")));\n    assertTrue(error.isDisplayed());\n}`,
          },
          expected: {
            tr: 'Test artık bug varken KIRMIZI yanıyor — bir testin ilk kez yapması gereken tam olarak budur.',
            en: 'The test now goes RED while the bug exists — which is exactly what a test should do the first time.',
          },
          hints: [
            { tr: '`visibilityOfElementLocated` sadece DOM\'da var olmayı değil, GÖRÜNÜR olmayı bekler.', en: '`visibilityOfElementLocated` waits for the element to be VISIBLE, not merely present in the DOM.' },
            { tr: '`Thread.sleep` kullanma — koşulu bekle, süreyi değil (flaky test\'in en sık kök nedeni).', en: 'Do not use `Thread.sleep` — wait for the condition, not for a duration (the most common root cause of flaky tests).' },
          ],
          xpReward: 10,
        },
      },
      // ── 4) CI ─────────────────────────────────────────────────────────────
      {
        id: 'lqa-101-step-ci',
        brief: { tr: '4) CI — Testi pipeline\'a koydun ve build KIRMIZI oldu. Ne anlama geliyor?', en: '4) CI — You added the test to the pipeline and the build went RED. What does that mean?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Yeni yazılan bir regression testinin ilk koşumda kırmızı yanması BAŞARIDIR, başarısızlık değil. Bu, testin gerçekten o bug\'a duyarlı olduğunun tek kanıtıdır. Hiç kırmızı yanmamış bir test, aslında hiçbir şeyi koruyor olmayabilir — koşulu yanlış yazmış da olabilirsin ve bunu asla anlamazsın. Bu yüzden disiplin şudur: önce kırmızıyı GÖR, sonra fix gelsin, sonra yeşile dönsün. Kırmızı → yeşil geçişi, testin bug ile fix arasındaki bağı kanıtlar.',
          en: 'A newly written regression test going red on its first run is a SUCCESS, not a failure. It is the only proof that the test is actually sensitive to that bug. A test that has never gone red may in fact be protecting nothing — you could have written the condition wrong and would never find out. So the discipline is: SEE the red first, then let the fix land, then watch it turn green. The red-to-green transition proves the link between the test and the fix.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-101-ci-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-101',
          prompt: {
            tr: 'Testi pipeline\'a ekledin, build kırmızı. Fix henüz yazılmadı. Şimdi ne yaparsın?',
            en: 'You added the test to the pipeline, the build is red. The fix has not been written yet. What do you do now?',
          },
          code: {
            tr: `$ mvn test\n[ERROR] wrongPasswordShowsWarning  Time elapsed: 10.2 s  <<< FAILURE!\norg.openqa.selenium.TimeoutException:\n  Expected condition failed: waiting for visibility of By.id: loginError\n\nTests run: 42, Failures: 1, Errors: 0, Skipped: 0`,
            en: `$ mvn test\n[ERROR] wrongPasswordShowsWarning  Time elapsed: 10.2 s  <<< FAILURE!\norg.openqa.selenium.TimeoutException:\n  Expected condition failed: waiting for visibility of By.id: loginError\n\nTests run: 42, Failures: 1, Errors: 0, Skipped: 0`,
          },
          codeLanguage: 'bash',
          options: [
            {
              id: 'a',
              label: { tr: 'Testi `@Disabled` ile kapat, pipeline yeşile dönsün', en: 'Disable the test with `@Disabled` so the pipeline goes green' },
              why: {
                tr: 'Bu, bug\'ı gizlemektir. Pipeline yeşil olur ama kullanıcı hâlâ hata mesajı görmez — üstelik artık kimse bunu fark etmez.',
                en: 'That hides the bug. The pipeline goes green while the user still sees no error message — and now nobody will notice.',
              },
            },
            {
              id: 'b',
              label: { tr: 'Kırmızıyı KANIT olarak kullan: bug\'ı bu çıktıyla developer\'a ilet, fix gelince yeşile döneceğini doğrula', en: 'Use the red as PROOF: hand this output to the developer, then verify it turns green once the fix lands' },
              correct: true,
            },
            {
              id: 'c',
              label: { tr: 'Timeout süresini 60 saniyeye çıkar, belki mesaj geç geliyordur', en: 'Raise the timeout to 60 seconds, maybe the message is just slow' },
              why: {
                tr: 'Mesaj HİÇ gelmiyor, geç gelmiyor. Timeout büyütmek yalnızca kırmızı yanma süresini uzatır — klasik bir "semptomu bekleterek gizleme" hatası.',
                en: 'The message never arrives at all — it is not late. Raising the timeout only makes the failure take longer — a classic "hide the symptom by waiting" mistake.',
              },
            },
          ],
          reveal: {
            tr: 'Doğru: kırmızı senin kanıtın. `TimeoutException: waiting for visibility of By.id: loginError` satırı, "mesaj hiç görünmedi" iddiasını tartışmasız kanıtlar — bug raporundaki "bende olmuyor" tartışmasını tek başına bitirir. Fix geldiğinde aynı test yeşile döner ve artık o bug bir daha sessizce geri gelemez.',
            en: 'Correct: the red is your evidence. The line `TimeoutException: waiting for visibility of By.id: loginError` proves beyond argument that the message never appeared — it single-handedly ends the "works on my machine" debate. Once the fix lands the same test turns green, and that bug can never silently return.',
          },
        },
      },
      // ── 5) MERGE ──────────────────────────────────────────────────────────
      {
        id: 'lqa-101-step-merge',
        brief: { tr: '5) MERGE — Testi regression suite\'ine bağla ki bug bir daha geri gelmesin.', en: '5) MERGE — Wire the test into the regression suite so the bug cannot return.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bir bug\'ın gerçekten kapandığı an, fix\'in merge edildiği an değil; o bug\'ı yakalayan testin her koşumda otomatik çalışmaya başladığı andır. Etiketlenmemiş (tag\'siz) bir test, nightly regression suite\'inde koşmayabilir — o zaman altı ay sonra biri aynı satırı yanlışlıkla silince kimse fark etmez. Bu yüzden merge öncesi son adım, testi doğru suite\'e bağlamaktır: `@Tag("regression")` bu testi kalıcı bir bekçiye dönüştürür.',
          en: 'The moment a bug is truly closed is not when the fix is merged; it is when the test that catches it starts running automatically on every run. An untagged test may not run in the nightly regression suite — and then, six months later, when someone accidentally deletes that line, nobody notices. So the last step before merge is wiring the test into the right suite: `@Tag("regression")` turns this test into a permanent guard.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-101-merge-code',
          relatedTopicId: 'sprint1-lqa-101-mission',
          language: 'java',
          label: { tr: 'Testi regression suite\'ine etiketle', en: 'Tag the test into the regression suite' },
          task: {
            tr: 'TODO satırını, testi regression suite\'ine dahil eden JUnit 5 etiketiyle tamamla.',
            en: 'Complete the TODO line with the JUnit 5 tag that includes this test in the regression suite.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç "bug kapanışı = kalıcı bekçi" refleksini pekiştirmek.',
            en: 'Not a real run; the goal is to reinforce the reflex that "closing a bug = leaving a permanent guard".',
          },
          code: {
            tr: `@Test\n@Tag("regression")\nvoid yanlisSifreUyariGosterir() {\n    // LQA-101 regresyon bekcisi\n}`,
            en: `@Test\n@Tag("regression")\nvoid wrongPasswordShowsWarning() {\n    // LQA-101 regression guard\n}`,
          },
          starterCode: {
            tr: `@Test\n// TODO: bu testi regression suite'ine dahil eden etiketi ekle\nvoid yanlisSifreUyariGosterir() {\n    // LQA-101 regresyon bekcisi\n}`,
            en: `@Test\n// TODO: add the tag that includes this test in the regression suite\nvoid wrongPasswordShowsWarning() {\n    // LQA-101 regression guard\n}`,
          },
          solutionCode: {
            tr: `@Test\n@Tag("regression")\nvoid yanlisSifreUyariGosterir() {\n    // LQA-101 regresyon bekcisi\n}`,
            en: `@Test\n@Tag("regression")\nvoid wrongPasswordShowsWarning() {\n    // LQA-101 regression guard\n}`,
          },
          expected: {
            tr: 'Test artık her regression koşumunda otomatik çalışır — bug sessizce geri dönemez.',
            en: 'The test now runs automatically in every regression run — the bug cannot silently return.',
          },
          hints: [
            { tr: 'JUnit 5\'te suite etiketi `@Tag("...")` ile verilir.', en: 'In JUnit 5 a suite label is applied with `@Tag("...")`.' },
            { tr: 'Etiket, `@Test` ile metot imzası arasına yazılır.', en: 'The tag goes between `@Test` and the method signature.' },
          ],
          xpReward: 10,
        },
      },
    ],
    debrief: {
      tr: 'Bu bug\'ı bir QA\'in yaptığı sırayla kapattın: önce YENİDEN ÜRETTİN (bug\'ın frontend\'de olduğunu buldun), sonra gözlenebilir sonucu yazan bir TEST CASE kurdun, onu assertion\'lı bir OTOMASYONA dönüştürdün, CI\'daki KIRMIZIYI kanıt olarak kullandın ve son olarak testi regression suite\'ine bağlayıp kalıcı bir bekçi bıraktın. Dikkat et: bu zincirin hiçbir adımında "kod yazmayı" değil, KANIT ÜRETMEYİ yaptın. QA işinin özü budur.',
      en: 'You closed this bug in the order a QA actually works: you REPRODUCED it first (finding the bug was in the frontend), then built a TEST CASE stating an observable outcome, turned it into an AUTOMATED test with an assertion, used the CI RED as evidence, and finally wired the test into the regression suite as a permanent guard. Notice that at no point in this chain were you merely "writing code" — you were PRODUCING EVIDENCE. That is the essence of QA work.',
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// LQA-102 — Sepet toplamı güncellenmiyor (major)
// ─────────────────────────────────────────────────────────────────────────────
const bugStaleCartTotal = {
  id: 'lqa-102',
  key: 'LQA-102',
  severity: 'major',
  title: {
    tr: 'Sepette adet artırılınca toplam fiyat eski değerde kalıyor',
    en: 'Cart total stays at the old value when the quantity is increased',
  },
  reporter: { tr: 'Product Owner', en: 'Product Owner' },
  summary: {
    tr: 'Kullanıcı sepette bir ürünün adedini 1\'den 3\'e çıkarıyor. Satır adedi 3 oluyor ama ALT TOPLAM hâlâ tek ürünün fiyatını gösteriyor. Sayfa yenilenince doğru değer geliyor. Ödeme adımına yanlış tutarla geçiliyor.',
    en: 'A user raises an item quantity from 1 to 3 in the cart. The row quantity becomes 3 but the SUBTOTAL still shows the price of a single item. After a page refresh the correct value appears. Checkout is reached with the wrong amount.',
  },
  mission: {
    type: 'mission',
    id: 'sprint1-lqa-102-mission',
    xpReward: 50,
    relatedTopicId: 'sprint-1-lqa-102',
    persona: { tr: 'QA Engineer · Sprint 24 · Gün 3', en: 'QA Engineer · Sprint 24 · Day 3' },
    scenario: {
      tr: 'Product Owner bu bug\'ı "para ile ilgili" diye critical\'a yükseltmek istiyor. Sen önce katmanı doğru tespit edeceksin: hata UI\'da mı, API\'de mi? Aynı 5 aşamalı akışı izleyeceksin — Analiz, Test Case, Otomasyon, CI, Merge.',
      en: 'The Product Owner wants to raise this bug to critical because "it involves money". First you will identify the right layer: is the fault in the UI or in the API? You will follow the same five stages — Analyze, Test Case, Automate, CI, Merge.',
    },
    steps: [
      // ── 1) ANALİZ ──────────────────────────────────────────────────────────
      {
        id: 'lqa-102-step-analyze',
        brief: { tr: '1) ANALİZ — "Yenileyince düzeliyor" ipucu sana hangi katmanı gösteriyor?', en: '1) ANALYZE — What layer does the clue "a refresh fixes it" point to?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: '"Sayfayı yenileyince düzeliyor" cümlesi bir QA için altın değerindedir çünkü katmanı tek başına daraltır. Yenileme, sunucudan veriyi TEKRAR çeker ve arayüzü sıfırdan çizer. Yenilemeden sonra değer DOĞRU geliyorsa, sunucunun hesabı zaten doğruydu — yanlış olan, arayüzün elindeki eski (stale) kopyadır. Java\'da bir nesnenin alanını değiştirip ekrandaki eski referansı güncellemeyi unutmak gibi: veri doğru, gösterilen kopya bayat.',
          en: 'The sentence "a refresh fixes it" is gold for a QA because it narrows the layer on its own. A refresh pulls the data from the server AGAIN and redraws the interface from scratch. If the value is CORRECT after the refresh, the server\'s calculation was already right — what is wrong is the stale copy the interface is holding. It is like changing an object\'s field in Java and forgetting to update the old reference on screen: the data is right, the displayed copy is stale.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-102-analyze-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-102',
          prompt: {
            tr: 'Adet 3 oluyor, alt toplam eski kalıyor, F5 sonrası doğru geliyor. Hata büyük olasılıkla nerede?',
            en: 'The quantity becomes 3, the subtotal stays old, and after F5 it is correct. Where is the fault most likely?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Backend\'in fiyat hesaplama mantığında', en: 'In the backend price calculation logic' },
              why: {
                tr: 'Backend yanlış hesaplasaydı yenileme de yanlış değeri getirirdi. F5 sonrası doğru gelmesi, sunucunun hesabının en başından doğru olduğunu kanıtlar.',
                en: 'If the backend calculated it wrong, a refresh would return the wrong value too. Getting the correct value after F5 proves the server\'s math was right all along.',
              },
            },
            {
              id: 'b',
              label: { tr: 'Veritabanında yanlış fiyat kayıtlı', en: 'A wrong price is stored in the database' },
              why: {
                tr: 'O durumda yenileme sonrası da yanlış fiyat görünürdü ve tek ürünlü senaryoda da hata verirdi. Belirti buna uymuyor.',
                en: 'Then the wrong price would also show after a refresh, and it would fail in the single-item case too. The symptom does not match.',
              },
            },
            {
              id: 'c',
              label: { tr: 'Frontend\'de: adet değişince toplam yeniden hesaplanıp/çekilip ekrana yazılmıyor', en: 'In the frontend: when quantity changes the total is not recalculated or re-fetched and rendered' },
              correct: true,
            },
          ],
          reveal: {
            tr: 'Doğru: hata frontend\'de. Bu tespit sprint için kritik çünkü bug\'ı doğru ekibe yönlendirir ve test stratejini belirler — backend API\'sine değil, arayüzün ADET DEĞİŞİNCE ne yaptığına test yazacaksın. Yanlış katmana yazılmış bir test, bug varken bile yeşil yanar.',
            en: 'Correct: the fault is in the frontend. This finding is critical for the sprint because it routes the bug to the right team and sets your test strategy — you will test what the interface does ON QUANTITY CHANGE, not the backend API. A test written against the wrong layer goes green even while the bug is present.',
          },
        },
      },
      // ── 2) TEST CASE ──────────────────────────────────────────────────────
      {
        id: 'lqa-102-step-testcase',
        brief: { tr: '2) TEST CASE — Yenilemeden, anında güncellemeyi doğrulayan case\'i yaz.', en: '2) TEST CASE — Write the case that verifies the instant update, without a refresh.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bu test case\'in püf noktası, bug\'ı MASKELEYEN adımı dışarıda bırakmaktır. Test case\'e "sayfayı yenile" adımı koyarsan test yeşil yanar ve bug\'ı asla yakalayamazsın — çünkü yenileme zaten doğru değeri getiriyor. Bu, QA\'de sık yapılan sinsi bir hatadır: testi çalışan yoldan geçirip "geçti" demek. Test case, kullanıcının GERÇEKTE yaptığı yolu izlemelidir; kullanıcı adedi değiştirip F5 basmaz, doğrudan ödemeye gider.',
          en: 'The key to this test case is leaving out the step that MASKS the bug. If you put "refresh the page" into the test case it goes green and never catches the bug — because a refresh already returns the correct value. This is a sneaky and common QA mistake: routing the test down the working path and calling it passed. A test case must follow the path the user ACTUALLY takes; a user does not change the quantity and then press F5, they go straight to checkout.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-102-testcase-code',
          relatedTopicId: 'sprint1-lqa-102-mission',
          language: 'gherkin',
          label: { tr: 'Sepet toplamı test case\'ini tamamla', en: 'Complete the cart total test case' },
          task: {
            tr: 'TODO satırını, SAYFA YENİLEMEDEN alt toplamın anında güncellendiğini doğrulayan Then satırıyla tamamla.',
            en: 'Complete the TODO line with a Then step verifying the subtotal updates instantly, WITHOUT a page refresh.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç "bug\'ı maskeleyen adımı test case\'e koyma" refleksini pekiştirmek.',
            en: 'Not a real run; the goal is to reinforce the reflex of not putting the bug-masking step into the test case.',
          },
          code: {
            tr: `Senaryo: Adet artirilinca alt toplam aninda guncellenir\n  Diyelim ki sepette 100 TL'lik 1 adet urun vardir\n  Kullanici adedi 3 yapar\n  O zaman alt toplam sayfa yenilenmeden 300 TL gorunur`,
            en: `Scenario: The subtotal updates instantly when the quantity is raised\n  Given the cart holds 1 item priced at 100\n  When the user sets the quantity to 3\n  Then the subtotal shows 300 without a page refresh`,
          },
          starterCode: {
            tr: `Senaryo: Adet artirilinca alt toplam aninda guncellenir\n  Diyelim ki sepette 100 TL'lik 1 adet urun vardir\n  Kullanici adedi 3 yapar\n  # TODO: yenileme ADIMI OLMADAN dogrulayan O zaman satirini ekle`,
            en: `Scenario: The subtotal updates instantly when the quantity is raised\n  Given the cart holds 1 item priced at 100\n  When the user sets the quantity to 3\n  # TODO: add the Then line that verifies it WITHOUT a refresh step`,
          },
          solutionCode: {
            tr: `Senaryo: Adet artirilinca alt toplam aninda guncellenir\n  Diyelim ki sepette 100 TL'lik 1 adet urun vardir\n  Kullanici adedi 3 yapar\n  O zaman alt toplam sayfa yenilenmeden 300 TL gorunur`,
            en: `Scenario: The subtotal updates instantly when the quantity is raised\n  Given the cart holds 1 item priced at 100\n  When the user sets the quantity to 3\n  Then the subtotal shows 300 without a page refresh`,
          },
          expected: {
            tr: 'Test case artık bug\'ın yaşadığı yolu izliyor — maskeleyen yenileme adımı yok.',
            en: 'The test case now follows the path where the bug lives — there is no masking refresh step.',
          },
          hints: [
            { tr: 'Test case\'e "sayfayı yenile" adımı KOYMA; bug tam olarak orada saklanıyor.', en: 'Do NOT add a "refresh the page" step; that is exactly where the bug hides.' },
            { tr: 'Beklenen değeri açıkça yaz (300) ki test neyi aradığını söylesin.', en: 'State the expected value explicitly (300) so the test says what it looks for.' },
          ],
          xpReward: 10,
        },
      },
      // ── 3) OTOMASYON ──────────────────────────────────────────────────────
      {
        id: 'lqa-102-step-automate',
        brief: { tr: '3) OTOMASYON — Playwright ile web-first assertion yaz.', en: '3) AUTOMATE — Write a web-first assertion with Playwright.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bu tür "anında güncellenmeli" bug\'larında en sık yapılan otomasyon hatası, değeri değişkene alıp öyle karşılaştırmaktır (`const t = await el.textContent()`), çünkü bu ANLIK bir fotoğraf çeker — arayüz bir milisaniye sonra güncellense bile test yanlış değeri görüp kırılır ya da tam tersi, flaky olur. Playwright\'ın `expect(locator).toHaveText(...)` çağrısı web-first assertion\'dır: koşul sağlanana kadar OTOMATİK yeniden dener. Java/Selenium\'daki `WebDriverWait` ile aynı felsefe — süreyi değil, koşulu bekle.',
          en: 'In "must update instantly" bugs like this one, the most common automation mistake is pulling the value into a variable and comparing that (`const t = await el.textContent()`), because it takes an INSTANT snapshot — even if the interface updates a millisecond later, the test sees the wrong value and breaks, or worse, becomes flaky. Playwright\'s `expect(locator).toHaveText(...)` is a web-first assertion: it retries AUTOMATICALLY until the condition holds. Same philosophy as `WebDriverWait` in Java/Selenium — wait for the condition, not for a duration.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-102-automate-code',
          relatedTopicId: 'sprint1-lqa-102-mission',
          language: 'typescript',
          label: { tr: 'Web-first assertion\'ı yaz', en: 'Write the web-first assertion' },
          task: {
            tr: 'TODO satırını, alt toplamın 300 olmasını OTOMATİK yeniden deneyerek bekleyen assertion ile tamamla.',
            en: 'Complete the TODO line with an assertion that waits for the subtotal to become 300, retrying AUTOMATICALLY.',
          },
          explanation: {
            tr: 'Gerçek bir tarayıcı koşumu değil; amaç web-first assertion refleksini pekiştirmek.',
            en: 'Not a real browser run; the goal is to reinforce the web-first assertion reflex.',
          },
          code: {
            tr: `test('adet artinca alt toplam guncellenir', async ({ page }) => {\n  await page.goto('/cart');\n  await page.getByTestId('qty-input').fill('3');\n\n  // Web-first assertion: kosul saglanana kadar OTOMATIK yeniden dener\n  await expect(page.getByTestId('subtotal')).toHaveText('300');\n});`,
            en: `test('subtotal updates when quantity changes', async ({ page }) => {\n  await page.goto('/cart');\n  await page.getByTestId('qty-input').fill('3');\n\n  // Web-first assertion: retries AUTOMATICALLY until the condition holds\n  await expect(page.getByTestId('subtotal')).toHaveText('300');\n});`,
          },
          starterCode: {
            tr: `test('adet artinca alt toplam guncellenir', async ({ page }) => {\n  await page.goto('/cart');\n  await page.getByTestId('qty-input').fill('3');\n\n  // TODO: alt toplamin 300 olmasini bekleyen web-first assertion'i yaz\n});`,
            en: `test('subtotal updates when quantity changes', async ({ page }) => {\n  await page.goto('/cart');\n  await page.getByTestId('qty-input').fill('3');\n\n  // TODO: write the web-first assertion waiting for the subtotal to be 300\n});`,
          },
          solutionCode: {
            tr: `test('adet artinca alt toplam guncellenir', async ({ page }) => {\n  await page.goto('/cart');\n  await page.getByTestId('qty-input').fill('3');\n\n  await expect(page.getByTestId('subtotal')).toHaveText('300');\n});`,
            en: `test('subtotal updates when quantity changes', async ({ page }) => {\n  await page.goto('/cart');\n  await page.getByTestId('qty-input').fill('3');\n\n  await expect(page.getByTestId('subtotal')).toHaveText('300');\n});`,
          },
          expected: {
            tr: 'Test artık zamanlamaya değil koşula bağlı — bug varken güvenilir şekilde kırmızı yanar.',
            en: 'The test now depends on a condition, not on timing — it fails reliably while the bug exists.',
          },
          hints: [
            { tr: '`expect(locator).toHaveText(...)` koşul sağlanana kadar kendisi yeniden dener.', en: '`expect(locator).toHaveText(...)` retries by itself until the condition holds.' },
            { tr: 'Değeri önce değişkene alma — anlık fotoğraf çekmiş olursun, yeniden deneme kaybolur.', en: 'Do not pull the value into a variable first — that takes an instant snapshot and loses the retry.' },
          ],
          xpReward: 10,
        },
      },
      // ── 4) CI ─────────────────────────────────────────────────────────────
      {
        id: 'lqa-102-step-ci',
        brief: { tr: '4) CI — Test yerelde geçiyor, CI\'da bazen kırmızı. Kök neden ne?', en: '4) CI — The test passes locally but is sometimes red in CI. What is the root cause?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: '"Bende çalışıyor ama CI\'da bazen kırmızı" cümlesi neredeyse her zaman ZAMANLAMA VARSAYIMINA işaret eder. CI runner\'ları paylaşımlı donanımda çalışır: CPU daha yavaş, ağ daha yavaş, tarayıcı başlatma daha uzun sürer. Yerelde 50ms\'de dönen bir istek CI\'da 400ms sürebilir. Sabit bekleme (`waitForTimeout`) yazdığında testin doğruluğunu makinenin hızına bağlamış olursun — bu, flaky test\'in bir numaralı kaynağıdır ve en pahalı olanıdır, çünkü ekip bir süre sonra kırmızıya güvenmeyi bırakır.',
          en: 'The sentence "it works for me but is sometimes red in CI" almost always points to a TIMING ASSUMPTION. CI runners run on shared hardware: slower CPU, slower network, longer browser startup. A request that returns in 50ms locally can take 400ms in CI. When you write a fixed wait (`waitForTimeout`) you tie the correctness of the test to the speed of the machine — the number one source of flaky tests, and the most expensive one, because eventually the team stops trusting red builds.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-102-ci-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-102',
          prompt: {
            tr: 'Bir takım arkadaşın testi şöyle yazmış. CI\'da 10 koşumun 3\'ünde kırmızı. Kök neden?',
            en: 'A teammate wrote the test like this. It is red in 3 of 10 CI runs. What is the root cause?',
          },
          code: {
            tr: `await page.getByTestId('qty-input').fill('3');\nawait page.waitForTimeout(200);              // sabit bekleme\nconst total = await page.getByTestId('subtotal').textContent();\nexpect(total).toBe('300');`,
            en: `await page.getByTestId('qty-input').fill('3');\nawait page.waitForTimeout(200);              // fixed wait\nconst total = await page.getByTestId('subtotal').textContent();\nexpect(total).toBe('300');`,
          },
          codeLanguage: 'typescript',
          options: [
            {
              id: 'a',
              label: { tr: 'CI makinesi bazen 200ms\'den yavaş; sabit bekleme + anlık okuma yeniden deneme yapmıyor', en: 'The CI machine is sometimes slower than 200ms; a fixed wait plus an instant read never retries' },
              correct: true,
            },
            {
              id: 'b',
              label: { tr: 'Beklemeyi 2000ms yapmak sorunu kalıcı olarak çözer', en: 'Raising the wait to 2000ms solves it for good' },
              why: {
                tr: 'Bu sadece kırmızı olma olasılığını düşürür, kaldırmaz — ve her testte 2 saniye kaybedersin. 300 testlik suite\'te 10 dakika demektir.',
                en: 'That only lowers the probability of red, it does not remove it — and you lose 2 seconds per test. Across a 300-test suite that is 10 minutes.',
              },
            },
            {
              id: 'c',
              label: { tr: 'Test yanlış locator kullanıyor', en: 'The test uses the wrong locator' },
              why: {
                tr: 'Locator yanlış olsaydı test 10 koşumun 10\'unda da kırmızı olurdu. Aralıklı (intermittent) kırmızı, locator\'ı değil zamanlamayı işaret eder.',
                en: 'If the locator were wrong the test would be red in all 10 runs. Intermittent red points at timing, not at the locator.',
              },
            },
          ],
          reveal: {
            tr: 'Doğru: sabit bekleme + `textContent()` ile anlık okuma, yeniden deneme yeteneğini tamamen yok eder. Çözüm süreyi büyütmek değil, önceki adımda yazdığın web-first assertion\'a dönmektir: `await expect(locator).toHaveText(\'300\')` koşul sağlanana kadar kendisi yeniden dener, sağlanınca da HEMEN geçer — hem güvenilir hem hızlı olur.',
            en: 'Correct: a fixed wait plus an instant `textContent()` read destroys any ability to retry. The fix is not a longer wait but returning to the web-first assertion you wrote in the previous step: `await expect(locator).toHaveText(\'300\')` retries by itself until the condition holds and passes IMMEDIATELY once it does — reliable and fast at the same time.',
          },
        },
      },
      // ── 5) MERGE ──────────────────────────────────────────────────────────
      {
        id: 'lqa-102-step-merge',
        brief: { tr: '5) MERGE — Pipeline\'ı bu testi her PR\'da koşacak şekilde bağla.', en: '5) MERGE — Wire the pipeline to run this test on every PR.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Regression testinin gerçek değeri, MERGE EDİLMEDEN ÖNCE koşmasındadır. Yalnızca gecelik (nightly) koşan bir test, hatayı ertesi sabah bulur — o zamana kadar hatalı kod main\'e girmiş, üstüne başka commit\'ler binmiş olur ve geri almak pahalılaşır. Pull request tetikleyicisi (`on: pull_request`) testi bir KAPIYA dönüştürür: kırmızıysa kod main\'e giremez. Bu, "kaliteyi sonradan ölçme"den "kaliteyi kapıda tutma"ya geçiştir.',
          en: 'The real value of a regression test is that it runs BEFORE the merge. A test that only runs nightly finds the fault the next morning — by then the faulty code is on main, other commits are stacked on top, and reverting has become expensive. A pull request trigger (`on: pull_request`) turns the test into a GATE: if it is red, the code cannot enter main. That is the shift from measuring quality afterwards to holding quality at the gate.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-102-merge-code',
          relatedTopicId: 'sprint1-lqa-102-mission',
          language: 'yaml',
          label: { tr: 'Pipeline tetikleyicisini tamamla', en: 'Complete the pipeline trigger' },
          task: {
            tr: 'TODO satırını, workflow\'un her pull request\'te de koşmasını sağlayan tetikleyiciyle tamamla.',
            en: 'Complete the TODO line with the trigger that also runs the workflow on every pull request.',
          },
          explanation: {
            tr: 'Gerçek bir pipeline koşumu değil; amaç "test bir kapıdır" refleksini pekiştirmek.',
            en: 'Not a real pipeline run; the goal is to reinforce the reflex that "a test is a gate".',
          },
          code: {
            tr: `name: e2e-tests\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest`,
            en: `name: e2e-tests\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest`,
          },
          starterCode: {
            tr: `name: e2e-tests\n\non:\n  push:\n    branches: [main]\n  # TODO: her pull request'te de kossun diye tetikleyiciyi ekle\n\njobs:\n  test:\n    runs-on: ubuntu-latest`,
            en: `name: e2e-tests\n\non:\n  push:\n    branches: [main]\n  # TODO: add the trigger so it also runs on every pull request\n\njobs:\n  test:\n    runs-on: ubuntu-latest`,
          },
          solutionCode: {
            tr: `name: e2e-tests\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest`,
            en: `name: e2e-tests\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest`,
          },
          expected: {
            tr: 'Test artık main\'e girmeden önce koşan bir kapı — hatalı kod merge edilemez.',
            en: 'The test is now a gate that runs before code reaches main — faulty code cannot be merged.',
          },
          hints: [
            { tr: 'GitHub Actions\'ta PR tetikleyicisi `pull_request:` anahtarıdır.', en: 'In GitHub Actions the PR trigger is the `pull_request:` key.' },
            { tr: 'Tetikleyici `on:` bloğunun altına, `push:` ile aynı girinti seviyesine yazılır.', en: 'The trigger goes under the `on:` block, at the same indentation level as `push:`.' },
          ],
          xpReward: 10,
        },
      },
    ],
    debrief: {
      tr: 'Bu bug\'da öğrendiğin en değerli şey teknik değil, TEŞHİS refleksiydi: "yenileyince düzeliyor" tek cümlesi bug\'ı backend\'den frontend\'e taşıdı ve test stratejini baştan değiştirdi. Yanlış katmana yazılmış bir test, bug tam karşısında dururken bile yeşil yanar. Sonra üç ayrı yerde aynı ilkeyi gördün — test case\'e yenileme adımı koymamak, `textContent()` yerine web-first assertion kullanmak, sabit bekleme yerine koşul beklemek: hepsi "süreyi değil, koşulu bekle" ilkesinin farklı yüzleri.',
      en: 'The most valuable thing you learned on this bug was not technical but DIAGNOSTIC: the single sentence "a refresh fixes it" moved the bug from the backend to the frontend and changed your test strategy from the start. A test written against the wrong layer goes green even with the bug right in front of it. Then you saw the same principle in three separate places — leaving the refresh out of the test case, using a web-first assertion instead of `textContent()`, and waiting for a condition instead of a fixed duration: all different faces of "wait for the condition, not for a duration".',
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
export const sprintsData = {
  hero: {
    title: { tr: 'QA Sprint Simülatörü', en: 'QA Sprint Simulator' },
    intro: {
      tr: 'Burada ders okumuyorsun — bir ekibe giriyorsun. Sprint açılır, bug düşer; sen onu bir QA mühendisinin gerçekten izlediği sırayla kapatırsın: Analiz → Test Case → Otomasyon → CI → Merge.',
      en: 'You are not reading a lesson here — you are joining a team. A sprint opens, a bug lands, and you close it in the order a QA engineer actually follows: Analyze → Test Case → Automate → CI → Merge.',
    },
  },
  sprints: [
    {
      id: 'sprint-1',
      code: 'SPRINT-24',
      title: { tr: 'Checkout Akışı Kararlılığı', en: 'Checkout Flow Stability' },
      company: { tr: 'ShopLab · E-ticaret ekibi', en: 'ShopLab · E-commerce team' },
      goal: {
        tr: 'Ödeme akışına giden yoldaki iki kritik hatayı kapat ve her ikisi için de kalıcı regresyon koruması bırak.',
        en: 'Close the two critical faults on the path to checkout and leave permanent regression protection for both.',
      },
      xpBonus: 60,
      retro: {
        tr: 'Sprint kapandı. İki bug\'da da aynı deseni gördün: önce KATMANI doğru tespit ettin (biri frontend\'in 401\'i yutması, diğeri arayüzün bayat kopyayı göstermesi), sonra bug\'ı maskelemeyen bir test case yazdın, onu koşul-bekleyen bir otomasyona dönüştürdün ve CI\'daki kırmızıyı kanıt olarak kullandın. Bir QA\'in işi kod yazmak değil, kanıt üretmektir — bu sprint boyunca yaptığın tam olarak buydu.',
        en: 'Sprint closed. You saw the same pattern in both bugs: first you identified the LAYER correctly (one was the frontend swallowing a 401, the other was the interface showing a stale copy), then you wrote a test case that did not mask the bug, turned it into automation that waits on a condition, and used the CI red as evidence. A QA\'s job is not to write code but to produce evidence — which is exactly what you did across this sprint.',
      },
      bugs: [bugSilentLoginFailure, bugStaleCartTotal],
    },
  ],
}

export default sprintsData
