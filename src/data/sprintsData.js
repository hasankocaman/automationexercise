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
            tr: 'Gerçek bir Cucumber koşumu değil; amaç gözlenebilir sonucu yazma refleksini pekiştirmek. Anahtar kelimeler (Given / When / Then / And) Gherkin dilinin kendi sözdizimidir — SELECT veya JOIN gibi İngilizce kalır: Given = ön koşul, When = kullanıcının yaptığı eylem, Then = gözlenebilir sonuç, And = bir önceki adımın devamı.',
            en: 'This is not a real Cucumber run; the goal is to reinforce the reflex of writing an observable outcome. The keywords (Given / When / Then / And) are Gherkin syntax, not prose: Given = precondition, When = the action the user takes, Then = the observable outcome, And = a continuation of the previous step.',
          },
          code: {
            tr: `Scenario: Yanlis sifre girildiginde kullanici uyarilir\n  Given kullanici login sayfasindadir\n  When kullanici gecerli bir e-posta ve YANLIS bir sifre girer\n  And giris butonuna tiklar\n  Then ekranda "Sifre hatali" mesaji gorunur`,
            en: `Scenario: The user is warned when a wrong password is entered\n  Given the user is on the login page\n  When the user enters a valid email and a WRONG password\n  And clicks the sign in button\n  Then the message "Wrong password" is visible on screen`,
          },
          starterCode: {
            tr: `Scenario: Yanlis sifre girildiginde kullanici uyarilir\n  Given kullanici login sayfasindadir\n  When kullanici gecerli bir e-posta ve YANLIS bir sifre girer\n  And giris butonuna tiklar\n  # TODO: gozlenebilir sonucu yazan Then satirini ekle`,
            en: `Scenario: The user is warned when a wrong password is entered\n  Given the user is on the login page\n  When the user enters a valid email and a WRONG password\n  And clicks the sign in button\n  # TODO: add the Then line that states the observable outcome`,
          },
          solutionCode: {
            tr: `Scenario: Yanlis sifre girildiginde kullanici uyarilir\n  Given kullanici login sayfasindadir\n  When kullanici gecerli bir e-posta ve YANLIS bir sifre girer\n  And giris butonuna tiklar\n  Then ekranda "Sifre hatali" mesaji gorunur`,
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
            tr: 'Gerçek bir koşum değil; amaç "bug\'ı maskeleyen adımı test case\'e koyma" refleksini pekiştirmek. Anahtar kelimeler (Given / When / Then / And) Gherkin dilinin kendi sözdizimidir — SELECT veya JOIN gibi İngilizce kalır: Given = ön koşul, When = kullanıcının yaptığı eylem, Then = gözlenebilir sonuç, And = bir önceki adımın devamı.',
            en: 'Not a real run; the goal is to reinforce the reflex of not putting the bug-masking step into the test case. The keywords (Given / When / Then / And) are Gherkin syntax, not prose: Given = precondition, When = the action the user takes, Then = the observable outcome, And = a continuation of the previous step.',
          },
          code: {
            tr: `Scenario: Adet artirilinca alt toplam aninda guncellenir\n  Given sepette 100 TL'lik 1 adet urun vardir\n  When kullanici adedi 3 yapar\n  Then alt toplam sayfa yenilenmeden 300 TL gorunur`,
            en: `Scenario: The subtotal updates instantly when the quantity is raised\n  Given the cart holds 1 item priced at 100\n  When the user sets the quantity to 3\n  Then the subtotal shows 300 without a page refresh`,
          },
          starterCode: {
            tr: `Scenario: Adet artirilinca alt toplam aninda guncellenir\n  Given sepette 100 TL'lik 1 adet urun vardir\n  When kullanici adedi 3 yapar\n  # TODO: yenileme ADIMI OLMADAN dogrulayan Then satirini ekle`,
            en: `Scenario: The subtotal updates instantly when the quantity is raised\n  Given the cart holds 1 item priced at 100\n  When the user sets the quantity to 3\n  # TODO: add the Then line that verifies it WITHOUT a refresh step`,
          },
          solutionCode: {
            tr: `Scenario: Adet artirilinca alt toplam aninda guncellenir\n  Given sepette 100 TL'lik 1 adet urun vardir\n  When kullanici adedi 3 yapar\n  Then alt toplam sayfa yenilenmeden 300 TL gorunur`,
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
// LQA-103 — Ödeme butonuna çift tıklayınca sipariş iki kez oluşuyor (critical)
// ─────────────────────────────────────────────────────────────────────────────
const bugDoubleOrderSubmit = {
  id: 'lqa-103',
  key: 'LQA-103',
  severity: 'critical',
  title: {
    tr: 'Ödeme butonuna hızlı çift tıklanınca sipariş iki kez oluşuyor',
    en: 'Rapidly double-clicking the payment button creates the order twice',
  },
  reporter: { tr: 'Muhasebe Ekibi', en: 'Finance Team' },
  summary: {
    tr: 'Muhasebe ekibi son hafta 12 müşteriden "iki kez ücret kesildi" şikayeti aldı. İnceleyince, kullanıcı ödeme butonuna 300ms arayla iki kez tıkladığında iki AYRI sipariş ve iki ayrı ödeme isteği gönderildiği görüldü.',
    en: 'The finance team received 12 "charged twice" complaints from customers last week. On inspection, when a user clicks the payment button twice within 300ms, two SEPARATE order and payment requests get sent.',
  },
  mission: {
    type: 'mission',
    id: 'sprint1-lqa-103-mission',
    xpReward: 50,
    relatedTopicId: 'sprint-1-lqa-103',
    persona: { tr: 'QA Engineer · Sprint 24 · Gün 4', en: 'QA Engineer · Sprint 24 · Day 4' },
    scenario: {
      tr: 'Bu bug para ile ilgili olduğu için sprint\'in en öncelikli maddesi. Ders okumayacaksın — gerçek bir QA gibi kök nedeni katman katman izleyecek, bir sonraki sprint\'te bu bug\'ın bir daha asla geri gelmeyeceğinden emin olacaksın.',
      en: 'Because this bug involves money, it is the top priority item in the sprint. You will not read a lesson — like a real QA you will trace the root cause layer by layer and make sure this bug can never return in a future sprint.',
    },
    steps: [
      // ── 1) ANALİZ ──────────────────────────────────────────────────────────
      {
        id: 'lqa-103-step-analyze',
        brief: { tr: '1) ANALİZ — Çift isteğe karşı EN SAĞLAM çözüm hangisi?', en: '1) ANALYZE — Which is the MOST ROBUST fix against a duplicate request?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Frontend\'de butonu tıklanınca devre dışı bırakmak faydalıdır ama bir GARANTİ değildir: ağ gecikmesi, hızlı bir çift dokunma veya doğrudan API\'ye giden bir istek bu koruyucuyu atlayabilir. Java\'da bir metodun `synchronized` olmadan "thread-safe görünmesi" gibi — görünüşte çalışır ama garanti yoktur. Gerçek garanti her zaman SUNUCUDA olmalıdır: istemci ne yaparsa yapsın, sunucu aynı isteği iki kez işlememelidir.',
          en: 'Disabling the button on click in the frontend helps, but it is not a GUARANTEE: network latency, a fast double-tap, or a request sent directly to the API can bypass that guard. It is like a Java method "looking thread-safe" without being `synchronized` — it appears to work but offers no guarantee. The real guarantee must always live on the SERVER: no matter what the client does, the server must not process the same request twice.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-103-analyze-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-103',
          prompt: {
            tr: 'Buton çift tıklamada iki istek gönderiyor. Hangi çözüm bug\'ı KALICI olarak kapatır?',
            en: 'The button sends two requests on a double click. Which fix closes the bug PERMANENTLY?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Sunucu, aynı isteği bir idempotency key ile tanır ve ikinci isteği yeni bir sipariş OLUŞTURMADAN aynı sonucu döner', en: 'The server recognizes the same request via an idempotency key and returns the same result for the second request WITHOUT creating a new order' },
              correct: true,
            },
            {
              id: 'b',
              label: { tr: 'Sadece frontend\'de butonu tıklanınca disable et, sunucuya dokunma', en: 'Only disable the button on click in the frontend, do not touch the server' },
              why: {
                tr: 'Bu bir UX iyileştirmesidir ama garanti değildir — bkz. mini-lesson: ikinci bir istek yine de sunucuya ulaşabilir.',
                en: 'This is a UX improvement but not a guarantee — see the mini-lesson: a second request can still reach the server.',
              },
            },
            {
              id: 'c',
              label: { tr: 'Kullanıcıya "lütfen bir kez tıklayın" uyarısı göster', en: 'Show the user a "please click only once" warning' },
              why: {
                tr: 'Kullanıcı davranışına güvenmek bir mühendislik garantisi değildir; bug tekrar üretilebilir kalır.',
                en: 'Relying on user behavior is not an engineering guarantee; the bug remains reproducible.',
              },
            },
          ],
          reveal: {
            tr: 'Doğru: garanti sunucuda olmalı. İdempotency key, istemcinin her deneme için ürettiği benzersiz bir kimliktir — sunucu aynı key\'i ikinci kez görünce yeni bir sipariş OLUŞTURMAZ, ilk isteğin sonucunu döner. Frontend\'de butonu devre dışı bırakmak İYİ bir ek katmandır ama TEK BAŞINA yeterli değildir.',
            en: 'Correct: the guarantee must live on the server. An idempotency key is a unique id the client generates per attempt — when the server sees the same key a second time it does NOT create a new order, it returns the first request\'s result. Disabling the button in the frontend is a GOOD extra layer but not sufficient ALONE.',
          },
        },
      },
      // ── 2) TEST CASE ──────────────────────────────────────────────────────
      {
        id: 'lqa-103-step-testcase',
        brief: { tr: '2) TEST CASE — Aynı idempotency key ile gelen ikinci isteği doğrulayan case\'i yaz.', en: '2) TEST CASE — Write the case that verifies a second request with the same idempotency key.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bu test case\'in kritik noktası "kaç sipariş oluştu" sorusunu SAYARAK sormaktır, "sipariş oluştu mu" diye sormak yetmez. "Sipariş oluştu mu?" sorusuna cevap her zaman EVET olur — asıl soru "KAÇ TANE oluştu?" ve doğru cevap her zaman 1\'dir, kullanıcı kaç kez tıklarsa tıklasın.',
          en: 'The critical point of this test case is asking "how many orders were created" by COUNTING, not just "was an order created". The answer to "was an order created?" is always YES — the real question is "HOW MANY were created?" and the correct answer is always 1, no matter how many times the user clicks.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-103-testcase-code',
          relatedTopicId: 'sprint1-lqa-103-mission',
          language: 'gherkin',
          label: { tr: 'Çift ödeme test case\'ini tamamla', en: 'Complete the double-payment test case' },
          task: {
            tr: 'TODO satırını, aynı idempotency key ile İKİ istek gönderilse bile sadece 1 sipariş oluştuğunu doğrulayan Then satırıyla tamamla.',
            en: 'Complete the TODO line with a Then step verifying that only 1 order is created even when two requests share the same idempotency key.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç "var mı?" değil "kaç tane?" sorusunu sorma refleksini pekiştirmek. Anahtar kelimeler (Given / When / Then / And) Gherkin dilinin kendi sözdizimidir — SELECT veya JOIN gibi İngilizce kalır: Given = ön koşul, When = kullanıcının yaptığı eylem, Then = gözlenebilir sonuç, And = bir önceki adımın devamı.',
            en: 'Not a real run; the goal is to reinforce asking "how many?" instead of just "did it happen?". The keywords (Given / When / Then / And) are Gherkin syntax, not prose: Given = precondition, When = the action the user takes, Then = the observable outcome, And = a continuation of the previous step.',
          },
          code: {
            tr: `Scenario: Ayni idempotency key ile ikinci istek yeni siparis olusturmaz\n  Given kullanici odeme butonuna "abc-123" idempotency key'i ile bir istek gonderdi\n  When kullanici ayni "abc-123" key'i ile ikinci bir istek daha gonderir\n  Then sistemde TOPLAM 1 siparis olusur`,
            en: `Scenario: A second request with the same idempotency key does not create a new order\n  Given the user sent a request to the payment button with idempotency key "abc-123"\n  When the user sends a second request with the SAME "abc-123" key\n  Then the system has a TOTAL of 1 order`,
          },
          starterCode: {
            tr: `Scenario: Ayni idempotency key ile ikinci istek yeni siparis olusturmaz\n  Given kullanici odeme butonuna "abc-123" idempotency key'i ile bir istek gonderdi\n  When kullanici ayni "abc-123" key'i ile ikinci bir istek daha gonderir\n  # TODO: TOPLAM siparis sayisini dogrulayan Then satirini ekle`,
            en: `Scenario: A second request with the same idempotency key does not create a new order\n  Given the user sent a request to the payment button with idempotency key "abc-123"\n  When the user sends a second request with the SAME "abc-123" key\n  # TODO: add the Then line that verifies the TOTAL order count`,
          },
          solutionCode: {
            tr: `Scenario: Ayni idempotency key ile ikinci istek yeni siparis olusturmaz\n  Given kullanici odeme butonuna "abc-123" idempotency key'i ile bir istek gonderdi\n  When kullanici ayni "abc-123" key'i ile ikinci bir istek daha gonderir\n  Then sistemde TOPLAM 1 siparis olusur`,
            en: `Scenario: A second request with the same idempotency key does not create a new order\n  Given the user sent a request to the payment button with idempotency key "abc-123"\n  When the user sends a second request with the SAME "abc-123" key\n  Then the system has a TOTAL of 1 order`,
          },
          expected: {
            tr: 'Test case artık "kaç tane?" sorusunu açıkça soruyor — bug tam olarak burada yakalanır.',
            en: 'The test case now explicitly asks "how many?" — this is exactly where the bug is caught.',
          },
          hints: [
            { tr: 'Then satırında bir SAYI (1) geçmeli; "sipariş oluştu" gibi belirsiz bir ifade YETERSİZDİR.', en: 'The Then line must contain a NUMBER (1); a vague phrase like "an order was created" is NOT enough.' },
            { tr: '"TOPLAM" kelimesi, iki isteğin birleşik sonucunu saydığını netleştirir.', en: 'The word "TOTAL" makes clear you are counting the combined result of both requests.' },
          ],
          xpReward: 10,
        },
      },
      // ── 3) OTOMASYON ──────────────────────────────────────────────────────
      {
        id: 'lqa-103-step-automate',
        brief: { tr: '3) OTOMASYON — İki isteğin AYNI sipariş id\'sini döndürdüğünü doğrula.', en: '3) AUTOMATE — Verify both requests return the SAME order id.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'İki farklı sipariş id\'si dönmesi, iki AYRI kaydın oluştuğunun kanıtıdır. Bu yüzden otomasyonun asserti "istek başarılı mı?" değil, "iki yanıt AYNI id\'yi mi taşıyor?" olmalıdır — API testinde çok değerli bir teknik: bir yan etkinin GERÇEKLEŞMEDİĞİNİ, iki yanıtı birbirine karşı karşılaştırarak kanıtlarsın.',
          en: 'Getting two different order ids back is proof that two SEPARATE records were created. That is why the automation\'s assertion must not be "did the request succeed?" but "do both responses carry the SAME id?" — a valuable API testing technique: you prove a side effect did NOT happen by comparing two responses against each other.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-103-automate-code',
          relatedTopicId: 'sprint1-lqa-103-mission',
          language: 'java',
          label: { tr: 'İki yanıtı karşılaştıran assertion\'ı yaz', en: 'Write the assertion comparing both responses' },
          task: {
            tr: 'TODO satırını, iki yanıtın sipariş id\'sinin AYNI olduğunu doğrulayan assertion ile tamamla.',
            en: 'Complete the TODO line with an assertion verifying both responses share the SAME order id.',
          },
          explanation: {
            tr: 'Gerçek bir API koşumu değil; amaç "yan etkinin olmadığını karşılaştırarak kanıtlama" refleksini pekiştirmek.',
            en: 'Not a real API run; the goal is to reinforce proving the absence of a side effect by comparison.',
          },
          code: {
            tr: `@Test\nvoid ayniIdempotencyKeyIkinciSiparisOlusturmaz() {\n    String key = "abc-123";\n\n    Response ilkYanit = given().header("Idempotency-Key", key).post("/orders");\n    Response ikinciYanit = given().header("Idempotency-Key", key).post("/orders");\n\n    // Iki yanit AYNI siparis id'sini tasimali\n    assertEquals(\n        ilkYanit.jsonPath().getString("orderId"),\n        ikinciYanit.jsonPath().getString("orderId"));\n}`,
            en: `@Test\nvoid sameIdempotencyKeyDoesNotCreateSecondOrder() {\n    String key = "abc-123";\n\n    Response firstResponse = given().header("Idempotency-Key", key).post("/orders");\n    Response secondResponse = given().header("Idempotency-Key", key).post("/orders");\n\n    // Both responses must carry the SAME order id\n    assertEquals(\n        firstResponse.jsonPath().getString("orderId"),\n        secondResponse.jsonPath().getString("orderId"));\n}`,
          },
          starterCode: {
            tr: `@Test\nvoid ayniIdempotencyKeyIkinciSiparisOlusturmaz() {\n    String key = "abc-123";\n\n    Response ilkYanit = given().header("Idempotency-Key", key).post("/orders");\n    Response ikinciYanit = given().header("Idempotency-Key", key).post("/orders");\n\n    // TODO: iki yanitin AYNI siparis id'sini tasidigini dogrula\n}`,
            en: `@Test\nvoid sameIdempotencyKeyDoesNotCreateSecondOrder() {\n    String key = "abc-123";\n\n    Response firstResponse = given().header("Idempotency-Key", key).post("/orders");\n    Response secondResponse = given().header("Idempotency-Key", key).post("/orders");\n\n    // TODO: verify both responses carry the SAME order id\n}`,
          },
          solutionCode: {
            tr: `@Test\nvoid ayniIdempotencyKeyIkinciSiparisOlusturmaz() {\n    String key = "abc-123";\n\n    Response ilkYanit = given().header("Idempotency-Key", key).post("/orders");\n    Response ikinciYanit = given().header("Idempotency-Key", key).post("/orders");\n\n    assertEquals(\n        ilkYanit.jsonPath().getString("orderId"),\n        ikinciYanit.jsonPath().getString("orderId"));\n}`,
            en: `@Test\nvoid sameIdempotencyKeyDoesNotCreateSecondOrder() {\n    String key = "abc-123";\n\n    Response firstResponse = given().header("Idempotency-Key", key).post("/orders");\n    Response secondResponse = given().header("Idempotency-Key", key).post("/orders");\n\n    assertEquals(\n        firstResponse.jsonPath().getString("orderId"),\n        secondResponse.jsonPath().getString("orderId"));\n}`,
          },
          expected: {
            tr: 'Test artık bug varken KIRMIZI yanıyor — iki yanıt farklı id taşıyor.',
            en: 'The test now goes RED while the bug exists — the two responses carry different ids.',
          },
          hints: [
            { tr: '`assertEquals` iki değeri karşılaştırır; burada iki AYRI HTTP yanıtından gelen id\'leri karşılaştırıyorsun.', en: '`assertEquals` compares two values; here you compare ids coming from two SEPARATE HTTP responses.' },
            { tr: 'Aynı `key` değişkenini HER İKİ istekte de kullan — farklı key kullanırsan test anlamını yitirir.', en: 'Use the SAME `key` variable in BOTH requests — using a different key would make the test meaningless.' },
          ],
          xpReward: 10,
        },
      },
      // ── 4) CI ─────────────────────────────────────────────────────────────
      {
        id: 'lqa-103-step-ci',
        brief: { tr: '4) CI — Test yerelde geçiyor ama CI\'da bazı koşumlarda İKİ farklı sipariş oluşuyor. Kök neden?', en: '4) CI — The test passes locally but in some CI runs TWO different orders are created. Root cause?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'İki isteği ARKA ARKAYA (sırayla) göndermek ile GERÇEKTEN eşzamanlı göndermek farklı şeylerdir. Yerelde sırayla çalışan iki istek arasında uygulamanın "önce kontrol et, sonra kaydet" (check-then-act) mantığı tamamlanmaya yetecek kadar zaman bulur. CI\'da ağ zamanlaması değiştiğinde iki istek TAM OLARAK aynı anda "kontrol" adımına girebilir — ikisi de "bu key daha önce yok" der ve İKİSİ DE kaydeder. Bu, Java\'da iki thread\'in aynı `if (counter == 0)` kontrolünü `synchronized` olmadan aynı anda geçmesiyle birebir aynı yarış durumudur (race condition).',
          en: 'Sending two requests SEQUENTIALLY (one after another) is different from sending them TRULY concurrently. When run locally, sequential requests give the application\'s "check then save" (check-then-act) logic enough time to complete between them. When CI timing shifts, both requests can enter the "check" step at EXACTLY the same moment — both see "this key does not exist yet" and BOTH save. This is the exact same race condition as two Java threads passing an unsynchronized `if (counter == 0)` check at the same time.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-103-ci-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-103',
          prompt: {
            tr: 'Test yerelde her zaman geçiyor. CI\'da 10 koşumun 2\'sinde İKİ farklı sipariş id\'si dönüyor. En olası kök neden?',
            en: 'The test always passes locally. In CI, 2 of 10 runs return TWO different order ids. Most likely root cause?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Uygulama kodu isteği önce KONTROL EDİP sonra KAYDEDİYOR (check-then-act); bu ikisi arasında bir yarış durumu var ve veritabanında idempotency key\'e UNIQUE constraint yok', en: 'The application code CHECKS the request first and then SAVES it (check-then-act); there is a race condition between the two steps and there is no UNIQUE constraint on the idempotency key in the database' },
              correct: true,
            },
            {
              id: 'b',
              label: { tr: 'CI sunucusunun ağı yavaş, test timeout\'a uğruyor', en: 'The CI server\'s network is slow, the test is timing out' },
              why: {
                tr: 'Sonuç bir timeout değil, İKİ FARKLI ID — bu ağ yavaşlığıyla değil, eşzamanlılık tasarımıyla ilgili bir belirtidir.',
                en: 'The result is not a timeout but TWO DIFFERENT ids — that symptom points to concurrency design, not network slowness.',
              },
            },
            {
              id: 'c',
              label: { tr: 'REST Assured kütüphanesi bazen isteği iki kez gönderiyor', en: 'The REST Assured library sometimes sends the request twice' },
              why: {
                tr: 'Kütüphane isteği tam olarak yazdığın kadar gönderir; iki farklı id\'nin nedeni sunucu tarafındaki yarış durumudur.',
                en: 'The library sends exactly the request you wrote; the reason for two different ids is a race condition on the server side.',
              },
            },
          ],
          reveal: {
            tr: 'Doğru: kök neden check-then-act yarış durumu + eksik veritabanı garantisi. Yalnızca uygulama kodunda "bu key var mı?" diye bakıp sonra kaydetmek YETERSİZDİR, çünkü iki istek bu kontrolü aynı anda geçebilir. Kalıcı çözüm bir sonraki adımda: veritabanı seviyesinde bir UNIQUE constraint, "aynı anda iki kayıt" senaryosunu FİZİKSEL OLARAK imkânsız kılar.',
            en: 'Correct: the root cause is a check-then-act race condition plus a missing database guarantee. Merely checking "does this key exist?" in application code before saving is NOT ENOUGH, because two requests can pass that check at the same instant. The permanent fix, in the next step, is a database-level UNIQUE constraint that makes "two records at once" PHYSICALLY impossible.',
          },
        },
      },
      // ── 5) MERGE ──────────────────────────────────────────────────────────
      {
        id: 'lqa-103-step-merge',
        brief: { tr: '5) MERGE — Yarış durumunu FİZİKSEL OLARAK imkânsız kılan veritabanı kısıtını ekle.', en: '5) MERGE — Add the database constraint that makes the race condition PHYSICALLY impossible.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Uygulama kodundaki bir "kontrol et" adımı her zaman atlatılabilir çünkü kontrol ile kayıt arasında bir an vardır. Ama veritabanındaki bir UNIQUE constraint atlatılamaz — veritabanının kendisi, aynı değere sahip ikinci bir satırı KAYDETMEYİ REDDEDER, uygulama kodu ne yaparsa yapsın. Bu, "iki farklı katmanda aynı kuralı tekrarlama" (defense in depth) ilkesinin somut bir örneğidir: uygulama kodu hızlı bir ön kontrol yapar, veritabanı SON VE KESİN bekçidir.',
          en: 'A "check" step in application code can always be bypassed because there is a moment between checking and saving. But a UNIQUE constraint in the database cannot be bypassed — the database itself REFUSES to save a second row with the same value, no matter what the application code does. This is a concrete example of "repeating the same rule at two layers" (defense in depth): application code does a fast pre-check, the database is the FINAL AND ABSOLUTE gatekeeper.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-103-merge-code',
          relatedTopicId: 'sprint1-lqa-103-mission',
          language: 'sql',
          label: { tr: 'idempotency_key kolonuna kalıcı kısıtı ekle', en: 'Add the permanent constraint on the idempotency_key column' },
          task: {
            tr: 'TODO satırını, aynı idempotency_key değeriyle iki satırın KAYDEDİLEMEYECEĞİNİ garanti eden kısıtla tamamla.',
            en: 'Complete the TODO line with the constraint that guarantees two rows CANNOT be saved with the same idempotency_key value.',
          },
          explanation: {
            tr: 'Gerçek bir veritabanı koşumu değil; amaç "uygulama kontrolü atlatılabilir, veritabanı kısıtı atlatılamaz" refleksini pekiştirmek.',
            en: 'Not a real database run; the goal is to reinforce that "an application check can be bypassed, a database constraint cannot".',
          },
          code: {
            tr: `ALTER TABLE orders\nADD COLUMN idempotency_key VARCHAR(64);\n\nALTER TABLE orders\nADD CONSTRAINT uq_orders_idempotency_key UNIQUE (idempotency_key);`,
            en: `ALTER TABLE orders\nADD COLUMN idempotency_key VARCHAR(64);\n\nALTER TABLE orders\nADD CONSTRAINT uq_orders_idempotency_key UNIQUE (idempotency_key);`,
          },
          starterCode: {
            tr: `ALTER TABLE orders\nADD COLUMN idempotency_key VARCHAR(64);\n\n-- TODO: idempotency_key'in ayni degerle IKI KEZ kaydedilemeyecegini garanti eden kisiti ekle`,
            en: `ALTER TABLE orders\nADD COLUMN idempotency_key VARCHAR(64);\n\n-- TODO: add the constraint guaranteeing idempotency_key cannot be saved TWICE with the same value`,
          },
          solutionCode: {
            tr: `ALTER TABLE orders\nADD COLUMN idempotency_key VARCHAR(64);\n\nALTER TABLE orders\nADD CONSTRAINT uq_orders_idempotency_key UNIQUE (idempotency_key);`,
            en: `ALTER TABLE orders\nADD COLUMN idempotency_key VARCHAR(64);\n\nALTER TABLE orders\nADD CONSTRAINT uq_orders_idempotency_key UNIQUE (idempotency_key);`,
          },
          expected: {
            tr: 'Artık iki eşzamanlı istek check-then-act penceresini geçse bile, veritabanı ikinci kaydı FİZİKSEL olarak reddeder.',
            en: 'Now even if two concurrent requests slip through the check-then-act window, the database PHYSICALLY refuses the second save.',
          },
          hints: [
            { tr: 'PostgreSQL/MySQL\'de bir kolonun tekilliğini garanti eden anahtar kelime `UNIQUE`dır.', en: 'In PostgreSQL/MySQL the keyword guaranteeing a column\'s uniqueness is `UNIQUE`.' },
            { tr: '`ADD CONSTRAINT <isim> UNIQUE (<kolon>)` kalıbını kullan; isim serbest ama açıklayıcı olmalı.', en: 'Use the `ADD CONSTRAINT <name> UNIQUE (<column>)` pattern; the name is free-form but should be descriptive.' },
          ],
          xpReward: 10,
        },
      },
    ],
    debrief: {
      tr: 'Bu bug\'da en değerli ders "iki katmanlı savunma" oldu: frontend\'de butonu disable etmek İYİ bir ilk katmandır ama TEK BAŞINA yeterli değildir; asıl garanti sunucudaki idempotency key KONTROLÜ + veritabanındaki UNIQUE KISITIDIR. CI\'daki aralıklı kırmızı, uygulama kodundaki bir "kontrol et" adımının HER ZAMAN atlatılabilir olduğunu, oysa bir veritabanı kısıtının FİZİKSEL OLARAK atlatılamayacağını kanıtladı.',
      en: 'The most valuable lesson in this bug was "defense in depth": disabling the button in the frontend is a GOOD first layer but NOT sufficient ALONE; the real guarantee is the server-side idempotency key CHECK plus the database UNIQUE CONSTRAINT. The intermittent red in CI proved that a "check" step in application code can ALWAYS be bypassed, whereas a database constraint PHYSICALLY cannot.',
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// LQA-104 — Süresi geçmiş kupon kodu hâlâ indirim uyguluyor (minor)
// ─────────────────────────────────────────────────────────────────────────────
const bugExpiredCouponStillValid = {
  id: 'lqa-104',
  key: 'LQA-104',
  severity: 'minor',
  title: {
    tr: 'Süresi geçmiş kupon kodu hâlâ indirim uyguluyor',
    en: 'An expired coupon code still applies the discount',
  },
  reporter: { tr: 'Pazarlama Ekibi', en: 'Marketing Team' },
  summary: {
    tr: '1 Mayıs\'ta biten "BAHAR20" kupon kodu, 2 Mayıs\'ta hâlâ %20 indirim uyguluyor. Pazarlama ekibi kampanyayı kapattığını sanıyordu ama indirim bazı isteklerde uygulanmaya devam ediyor.',
    en: 'The "BAHAR20" coupon code that ended on May 1st still applies a 20% discount on May 2nd. The marketing team thought the campaign was closed, but the discount keeps being applied on some requests.',
  },
  mission: {
    type: 'mission',
    id: 'sprint1-lqa-104-mission',
    xpReward: 45,
    relatedTopicId: 'sprint-1-lqa-104',
    persona: { tr: 'QA Engineer · Sprint 24 · Gün 5', en: 'QA Engineer · Sprint 24 · Day 5' },
    scenario: {
      tr: 'Küçük görünen ama tehlikeli bir bug: para kaybettiren bir kupon hatası. Ders okumayacaksın — API isteğindeki şüpheli bir alanı fark edip kök nedeni bulacak, sonra testinin KENDİSİNİN de güvenilir olduğundan emin olacaksın.',
      en: 'A small-looking but dangerous bug: a coupon fault that loses money. You will not read a lesson — you will spot a suspicious field in the API request, find the root cause, and then make sure your OWN test is trustworthy too.',
    },
    steps: [
      // ── 1) ANALİZ ──────────────────────────────────────────────────────────
      {
        id: 'lqa-104-step-analyze',
        brief: { tr: '1) ANALİZ — API isteğinde "today" alanını kim gönderiyor, ve bu neden risklidir?', en: '1) ANALYZE — Who sends the "today" field in the API request, and why is that risky?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Kupon geçerliliğini kontrol eden koda bakınca `req.body.today <= coupon.validUntil` satırını görüyorsun — yani "bugünün tarihi" İSTEMCİDEN (client) geliyor. Bu, güvenlik derslerinde sık geçen bir ilkeyi çiğniyor: iş kuralına (business rule) etki eden hiçbir veri, istemcinin SÖYLEDİĞİ şeye göre değil, sunucunun KENDİ bildiği şeye göre değerlendirilmelidir. Java\'da bir yetkilendirme kontrolünü istemcinin gönderdiği bir "isAdmin: true" alanına göre yapmak ne kadar tehlikeliyse, geçerlilik tarihini istemcinin gönderdiği tarihe göre kontrol etmek de o kadar tehlikelidir.',
          en: 'Looking at the code that checks coupon validity, you see the line `req.body.today <= coupon.validUntil` — meaning "today\'s date" comes from the CLIENT. This violates a principle common in security lessons: no data that affects a business rule should be evaluated based on what the client SAYS, only on what the server ITSELF knows. It is exactly as dangerous as performing an authorization check based on a client-submitted "isAdmin: true" field would be in Java — checking an expiry date against a client-submitted date is just as dangerous.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-104-analyze-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-104',
          prompt: {
            tr: 'Kupon geçerliliği API\'de `req.body.today <= coupon.validUntil` şeklinde kontrol ediliyor — yani tarihi istemci gönderiyor. Bu tasarımın en büyük riski nedir?',
            en: 'Coupon validity is checked in the API as `req.body.today <= coupon.validUntil` — meaning the client sends the date. What is the biggest risk of this design?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Sadece küçük bir zaman dilimi (timezone) kayması yaratır, önemsizdir', en: 'It only creates a small timezone drift, it is unimportant' },
              why: {
                tr: 'Sorun zaman dilimi kaymasından çok daha büyüktür: istemci tarihi TAMAMEN kontrol edebilir, sadece birkaç saatlik bir kaymadan ibaret değildir.',
                en: 'The problem is much bigger than timezone drift: the client can control the date COMPLETELY, it is not merely a few hours\' shift.',
              },
            },
            {
              id: 'b',
              label: { tr: 'Bu sadece bir performans sorunu yaratır, doğruluk veya güvenlik sorunu değildir', en: 'It only creates a performance issue, not a correctness or security issue' },
              why: {
                tr: 'Performansla hiç ilgisi yok — burada tartışılan şey verinin DOĞRULUĞU ve güvenilirliğidir.',
                en: 'It has nothing to do with performance — what is at stake here is the CORRECTNESS and trustworthiness of the data.',
              },
            },
            {
              id: 'c',
              label: { tr: 'Kullanıcı, tarayıcısının saatini değiştirerek ya da isteği doğrudan düzenleyerek süresi geçmiş bir kuponu SONSUZA kadar geçerli gösterebilir', en: 'A user can make an expired coupon valid FOREVER by changing their browser clock or by editing the request directly' },
              correct: true,
            },
          ],
          reveal: {
            tr: 'Doğru: istemcinin gönderdiği herhangi bir alan (tarih dahil) güvenilmez kabul edilmelidir — kullanıcı isteği doğrudan düzenleyip `today: "2026-04-01"` gönderebilir ve kupon SONSUZA kadar geçerli görünür. İş kuralına etki eden tarih, sunucunun KENDİ saatinden (`Date.now()` sunucu tarafında) gelmelidir, istemcinin söylediğinden değil.',
            en: 'Correct: any field the client sends (including a date) must be treated as untrustworthy — a user can edit the request directly to send `today: "2026-04-01"` and the coupon will appear valid FOREVER. A date that affects a business rule must come from the server\'s OWN clock (`Date.now()` on the server side), not from what the client claims.',
          },
        },
      },
      // ── 2) TEST CASE ──────────────────────────────────────────────────────
      {
        id: 'lqa-104-step-testcase',
        brief: { tr: '2) TEST CASE — İstemcinin sahte bir tarih göndermesine karşı case\'i yaz.', en: '2) TEST CASE — Write the case guarding against the client sending a fake date.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bu test case\'in özü, kullanıcı davranışını GERÇEKÇİ ama KÖTÜ NİYETLİ varsaymaktır: "kullanıcı isteği doğrudan düzenleyip geçmiş bir tarih gönderirse ne olur?" Bir QA, sadece normal kullanıcı yolunu değil, verinin manipüle edilebileceği yolu da test eder — bu, güvenlik testinin (security testing) fonksiyonel testle kesiştiği noktadır.',
          en: 'The essence of this test case is assuming realistic but MALICIOUS behavior: "what if the user edits the request directly and sends a past date?" A QA tests not just the normal user path but also the path where data can be manipulated — this is exactly where security testing intersects with functional testing.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-104-testcase-code',
          relatedTopicId: 'sprint1-lqa-104-mission',
          language: 'gherkin',
          label: { tr: 'Sahte tarih test case\'ini tamamla', en: 'Complete the fake-date test case' },
          task: {
            tr: 'TODO satırını, istemcinin gönderdiği sahte tarihe RAĞMEN sunucunun kuponu geçersiz sayması gerektiğini belirten Then satırıyla tamamla.',
            en: 'Complete the TODO line with a Then step stating the server must treat the coupon as invalid DESPITE the fake date the client sent.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç istemci verisine güvenmeme refleksini pekiştirmek. Anahtar kelimeler (Given / When / Then / And) Gherkin dilinin kendi sözdizimidir — SELECT veya JOIN gibi İngilizce kalır: Given = ön koşul, When = kullanıcının yaptığı eylem, Then = gözlenebilir sonuç, And = bir önceki adımın devamı.',
            en: 'Not a real run; the goal is to reinforce the reflex of not trusting client-submitted data. The keywords (Given / When / Then / And) are Gherkin syntax, not prose: Given = precondition, When = the action the user takes, Then = the observable outcome, And = a continuation of the previous step.',
          },
          code: {
            tr: `Scenario: Istemcinin gonderdigi sahte tarih kuponu gecerli kilmaz\n  Given "BAHAR20" kuponu sunucu saatine gore 1 Mayis'ta sona erdi\n  When kullanici istegi duzenleyip "today" alanina "2026-04-30" (gecmis bir tarih) gonderir\n  Then sunucu kuponu GECERSIZ sayar`,
            en: `Scenario: A fake date sent by the client does not make the coupon valid\n  Given the "BAHAR20" coupon ended on May 1st according to the server clock\n  When the user edits the request and sends "today" as "2026-04-30" (a past date)\n  Then the server treats the coupon as INVALID`,
          },
          starterCode: {
            tr: `Scenario: Istemcinin gonderdigi sahte tarih kuponu gecerli kilmaz\n  Given "BAHAR20" kuponu sunucu saatine gore 1 Mayis'ta sona erdi\n  When kullanici istegi duzenleyip "today" alanina "2026-04-30" (gecmis bir tarih) gonderir\n  # TODO: sunucunun kendi saatini kullandigini dogrulayan Then satirini ekle`,
            en: `Scenario: A fake date sent by the client does not make the coupon valid\n  Given the "BAHAR20" coupon ended on May 1st according to the server clock\n  When the user edits the request and sends "today" as "2026-04-30" (a past date)\n  # TODO: add the Then line verifying the server uses its own clock`,
          },
          solutionCode: {
            tr: `Scenario: Istemcinin gonderdigi sahte tarih kuponu gecerli kilmaz\n  Given "BAHAR20" kuponu sunucu saatine gore 1 Mayis'ta sona erdi\n  When kullanici istegi duzenleyip "today" alanina "2026-04-30" (gecmis bir tarih) gonderir\n  Then sunucu kuponu GECERSIZ sayar`,
            en: `Scenario: A fake date sent by the client does not make the coupon valid\n  Given the "BAHAR20" coupon ended on May 1st according to the server clock\n  When the user edits the request and sends "today" as "2026-04-30" (a past date)\n  Then the server treats the coupon as INVALID`,
          },
          expected: {
            tr: 'Test case artık bug\'ı doğrudan hedefliyor: istemcinin iddiasına değil, sunucunun kararına bakıyor.',
            en: 'The test case now targets the bug directly: it checks the server\'s decision, not the client\'s claim.',
          },
          hints: [
            { tr: 'When adımında istemcinin GÖNDERDİĞİ sahte veriyi, Then adımında SUNUCUNUN kararını ayır.', en: 'Separate the fake data the client SENDS in the When step from the SERVER\'s decision in the Then step.' },
            { tr: '"Sunucu saatine göre" ifadesi, doğru kaynağın hangisi olduğunu netleştirir.', en: 'The phrase "according to the server clock" makes clear which source is authoritative.' },
          ],
          xpReward: 10,
        },
      },
      // ── 3) OTOMASYON ──────────────────────────────────────────────────────
      {
        id: 'lqa-104-step-automate',
        brief: { tr: '3) OTOMASYON — Sahte tarihli isteğin reddedildiğini doğrulayan testi yaz.', en: '3) AUTOMATE — Write the test verifying the fake-dated request is rejected.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bu testte istemcinin gönderdiği `today` alanı BİLEREK yanlış (geçmiş) bir değerdir — bu bir test hatası değil, testin KENDİSİDİR: "sunucu istemciye güveniyor mu, kendi saatine mi bakıyor?" sorusunu yanıtlamanın tek yolu, istemciye kasıtlı olarak yanlış bir değer verdirmektir.',
          en: 'In this test the `today` field the client sends is DELIBERATELY wrong (a past value) — this is not a test mistake, it IS the test: the only way to answer "does the server trust the client, or check its own clock?" is to deliberately make the client supply a wrong value.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-104-automate-code',
          relatedTopicId: 'sprint1-lqa-104-mission',
          language: 'java',
          label: { tr: 'Sunucu tarafı doğrulamasını yaz', en: 'Write the server-side validation assertion' },
          task: {
            tr: 'TODO satırını, sahte geçmiş tarih gönderilse bile yanıtın kuponu geçersiz saydığını doğrulayan assertion ile tamamla.',
            en: 'Complete the TODO line with an assertion verifying the response treats the coupon as invalid even with the fake past date.',
          },
          explanation: {
            tr: 'Gerçek bir API koşumu değil; amaç sunucu-taraflı doğrulama refleksini pekiştirmek.',
            en: 'Not a real API run; the goal is to reinforce the server-side validation reflex.',
          },
          code: {
            tr: `@Test\nvoid sahteGecmisTarihKuponuGecerliKilmamali() {\n    given()\n        .body(Map.of("couponCode", "BAHAR20", "today", "2026-04-30")) // sahte, gecmis tarih\n    .when()\n        .post("/coupons/validate")\n    .then()\n        .statusCode(400)\n        .body("error", equalTo("coupon_expired"));\n}`,
            en: `@Test\nvoid fakePastDateShouldNotValidateCoupon() {\n    given()\n        .body(Map.of("couponCode", "BAHAR20", "today", "2026-04-30")) // fake, past date\n    .when()\n        .post("/coupons/validate")\n    .then()\n        .statusCode(400)\n        .body("error", equalTo("coupon_expired"));\n}`,
          },
          starterCode: {
            tr: `@Test\nvoid sahteGecmisTarihKuponuGecerliKilmamali() {\n    given()\n        .body(Map.of("couponCode", "BAHAR20", "today", "2026-04-30")) // sahte, gecmis tarih\n    .when()\n        .post("/coupons/validate")\n    .then()\n        // TODO: yanitin kuponu GECERSIZ saydigini dogrula (400 + hata mesaji)\n}`,
            en: `@Test\nvoid fakePastDateShouldNotValidateCoupon() {\n    given()\n        .body(Map.of("couponCode", "BAHAR20", "today", "2026-04-30")) // fake, past date\n    .when()\n        .post("/coupons/validate")\n    .then()\n        // TODO: verify the response treats the coupon as INVALID (400 + error message)\n}`,
          },
          solutionCode: {
            tr: `@Test\nvoid sahteGecmisTarihKuponuGecerliKilmamali() {\n    given()\n        .body(Map.of("couponCode", "BAHAR20", "today", "2026-04-30")) // sahte, gecmis tarih\n    .when()\n        .post("/coupons/validate")\n    .then()\n        .statusCode(400)\n        .body("error", equalTo("coupon_expired"));\n}`,
            en: `@Test\nvoid fakePastDateShouldNotValidateCoupon() {\n    given()\n        .body(Map.of("couponCode", "BAHAR20", "today", "2026-04-30")) // fake, past date\n    .when()\n        .post("/coupons/validate")\n    .then()\n        .statusCode(400)\n        .body("error", equalTo("coupon_expired"));\n}`,
          },
          expected: {
            tr: 'Test artık bug varken KIRMIZI yanıyor — sunucu istemcinin sahte tarihine güvenip kuponu geçerli sayıyordu.',
            en: 'The test now goes RED while the bug exists — the server trusted the client\'s fake date and treated the coupon as valid.',
          },
          hints: [
            { tr: 'Beklenen davranış bir HATA durumudur (`400`), başarı değil — kuponun geçersiz sayılmasını test ediyorsun.', en: 'The expected behavior is an ERROR state (`400`), not success — you are testing that the coupon is rejected.' },
            { tr: 'Yanıt gövdesindeki hata alanı, RED nedenini netleştirir; sadece status code yeterli değildir.', en: 'The error field in the response body clarifies the reason for the rejection; the status code alone is not enough.' },
          ],
          xpReward: 10,
        },
      },
      // ── 4) CI ─────────────────────────────────────────────────────────────
      {
        id: 'lqa-104-step-ci',
        brief: { tr: '4) CI — Bir takım arkadaşın kupon bitiş tarihini DİNAMİK hesaplıyor. Bu neden riskli?', en: '4) CI — A teammate calculates the coupon expiry date DYNAMICALLY. Why is that risky?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bir test verisi "bugünden 1 gün önce" gibi GÖRELİ (relative) bir hesaplamayla üretildiğinde, testin sonucu ÇALIŞTIRILDIĞI ANA bağımlı hâle gelir — özellikle gece yarısına yakın koşumlarda, yerel makine ile CI sunucusunun saat dilimi farkı "dün" ile "bugün" arasındaki sınırın hangi tarafa düştüğünü değiştirebilir. Deterministik bir test, HER ZAMAN aynı, SABİT bir veriyle çalışmalıdır — Java\'da bir testin `Clock.fixed(...)` ile sabit bir saate bağlanması tam olarak bu yüzdendir.',
          en: 'When test data is generated with a RELATIVE calculation like "one day before today", the test\'s outcome becomes dependent on the MOMENT it runs — especially near midnight, a timezone difference between the local machine and the CI server can shift which side of the "yesterday vs today" boundary the data falls on. A deterministic test should ALWAYS run against the SAME, FIXED data — this is exactly why a Java test is pinned to a fixed clock using `Clock.fixed(...)`.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-104-ci-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-1-lqa-104',
          prompt: {
            tr: 'Bir takım arkadaşın testi şöyle kurgulamış: kupon bitiş tarihi = `LocalDate.now().minusDays(1)` (yani her koşumda "dün"). CI sunucusu bazı koşumlarda BEKLENMEDİK sonuç veriyor. Kök neden?',
            en: 'A teammate set up the test like this: coupon expiry date = `LocalDate.now().minusDays(1)` (i.e., always "yesterday" at run time). The CI server produces an UNEXPECTED result in some runs. Root cause?',
          },
          code: {
            tr: `LocalDate kuponBitis = LocalDate.now().minusDays(1); // "dun" - her kosumda degisir`,
            en: `LocalDate couponExpiry = LocalDate.now().minusDays(1); // "yesterday" - changes on every run`,
          },
          codeLanguage: 'java',
          options: [
            {
              id: 'a',
              label: { tr: '`minusDays(1)` metodu Java\'da hatalıdır', en: 'The `minusDays(1)` method is buggy in Java' },
              why: {
                tr: 'Metodun kendisi doğru çalışır; sorun test verisinin ÇALIŞMA ANINA bağlı olarak değişmesidir.',
                en: 'The method itself works correctly; the problem is that the test data changes depending on the MOMENT it runs.',
              },
            },
            {
              id: 'b',
              label: { tr: 'CI sunucusunun interneti yavaş, tarih hesaplaması gecikiyor', en: 'The CI server\'s internet is slow, the date calculation is delayed' },
              why: {
                tr: 'Tarih hesaplaması yerel bir işlemdir, ağ hızıyla ilgisi yoktur.',
                en: 'A date calculation is a local operation; it has nothing to do with network speed.',
              },
            },
            {
              id: 'c',
              label: { tr: 'Test verisi ÇALIŞMA ANINA göre hesaplanıyor; gece yarısına yakın koşumlarda yerel/CI saat dilimi farkı "dün" sınırının hangi tarafa düştüğünü değiştirebiliyor — test DETERMİNİSTİK değil', en: 'The test data is computed based on the MOMENT it runs; near midnight, a local/CI timezone difference can shift which side of the "yesterday" boundary it falls on — the test is NOT deterministic' },
              correct: true,
            },
          ],
          reveal: {
            tr: 'Doğru: test verisi göreli (relative) hesaplandığı için deterministik değil. Kalıcı çözüm: test verisini SABİT, hardcoded bir tarihle tanımlamak (ör. `LocalDate.of(2026, 5, 1)`) ya da testte saati sabitleyen bir `Clock` enjekte etmek — hangisi olursa olsun, test HER ORTAMDA ve HER SAATTE AYNI sonucu vermelidir.',
            en: 'Correct: the test data is not deterministic because it is calculated relatively. The permanent fix: define the test data with a FIXED, hardcoded date (e.g., `LocalDate.of(2026, 5, 1)`) or inject a `Clock` that pins the time in the test — either way, the test should produce the SAME result in EVERY environment and at EVERY hour.',
          },
        },
      },
      // ── 5) MERGE ──────────────────────────────────────────────────────────
      {
        id: 'lqa-104-step-merge',
        brief: { tr: '5) MERGE — Test verisini SABİT bir tarihe bağlayarak deterministik yap.', en: '5) MERGE — Make the test data deterministic by pinning it to a FIXED date.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bu son adım, bir önceki adımda tespit ettiğin sorunu KALICI olarak kapatır. Sabit bir tarih kullanmak, testin ne zaman koşulursa koşulsun (bugün, yarın, altı ay sonra) AYNI senaryoyu test etmesini garanti eder — bu, regression suite\'inin güvenilirliğinin temelidir: bir test, "şu an ne zaman?" sorusuna göre farklı davranmamalıdır.',
          en: 'This final step permanently closes the issue you found in the previous step. Using a fixed date guarantees the test always exercises the SAME scenario no matter when it runs (today, tomorrow, six months from now) — this is the foundation of a regression suite\'s reliability: a test should never behave differently depending on "what time is it right now?".',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-104-merge-code',
          relatedTopicId: 'sprint1-lqa-104-mission',
          language: 'java',
          label: { tr: 'Test verisini sabit tarihe bağla', en: 'Pin the test data to a fixed date' },
          task: {
            tr: 'TODO satırını, göreli hesaplama YERİNE sabit (hardcoded) bir tarih tanımlayan satırla tamamla.',
            en: 'Complete the TODO line with a fixed (hardcoded) date definition INSTEAD OF a relative calculation.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç deterministik test verisi refleksini pekiştirmek.',
            en: 'Not a real run; the goal is to reinforce the reflex of using deterministic test data.',
          },
          code: {
            tr: `// ONCEKI (kirilgan): LocalDate kuponBitis = LocalDate.now().minusDays(1);\nLocalDate kuponBitis = LocalDate.of(2026, 5, 1);`,
            en: `// BEFORE (fragile): LocalDate couponExpiry = LocalDate.now().minusDays(1);\nLocalDate couponExpiry = LocalDate.of(2026, 5, 1);`,
          },
          starterCode: {
            tr: `// ONCEKI (kirilgan): LocalDate kuponBitis = LocalDate.now().minusDays(1);\n// TODO: sabit (deterministik) bir tarih tanimla`,
            en: `// BEFORE (fragile): LocalDate couponExpiry = LocalDate.now().minusDays(1);\n// TODO: define a fixed (deterministic) date`,
          },
          solutionCode: {
            tr: `// ONCEKI (kirilgan): LocalDate kuponBitis = LocalDate.now().minusDays(1);\nLocalDate kuponBitis = LocalDate.of(2026, 5, 1);`,
            en: `// BEFORE (fragile): LocalDate couponExpiry = LocalDate.now().minusDays(1);\nLocalDate couponExpiry = LocalDate.of(2026, 5, 1);`,
          },
          expected: {
            tr: 'Test artık hangi anda çalıştırılırsa çalıştırılsın AYNI senaryoyu doğruluyor — deterministik.',
            en: 'The test now verifies the SAME scenario no matter when it runs — deterministic.',
          },
          hints: [
            { tr: '`LocalDate.of(yil, ay, gun)` sabit, göreli olmayan bir tarih oluşturur.', en: '`LocalDate.of(year, month, day)` creates a fixed, non-relative date.' },
            { tr: 'Yorumdaki "ÖNCEKİ" satırını SİLME — bir sonraki geliştiricinin neden değiştiğini anlaması için orada kalmalı.', en: 'Do NOT delete the "BEFORE" comment line — it should stay so the next developer understands why it changed.' },
          ],
          xpReward: 10,
        },
      },
    ],
    debrief: {
      tr: 'Bu bug küçük görünüyordu ama iki büyük ilkeyi birden öğretti: (1) iş kuralına etki eden HİÇBİR veri istemciden güvenilerek alınmamalı, sunucu kendi saatine bakmalı; (2) test verisi de aynı disipline tabidir — göreli ("dün", "bugünden 1 gün önce") hesaplamalar testi ÇALIŞMA ANINA bağımlı ve deterministik-olmayan hâle getirir. İkisi de aynı köke iniyor: güvenilir bir sistem, "şu an ne zaman?" sorusuna dışarıdan gelen cevaba göre değil, KENDİ bildiği gerçeğe göre karar vermelidir.',
      en: 'This bug looked small but taught two big principles at once: (1) no data affecting a business rule should be trusted from the client, the server must consult its own clock; (2) test data is subject to the same discipline — relative calculations ("yesterday", "one day before today") make a test dependent on the MOMENT it runs and non-deterministic. Both trace back to the same root: a trustworthy system should decide "what time is it right now?" based on what it itself knows, not on an answer supplied from outside.',
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// LQA-201 — Ürün listesi endpoint'i N+1 sorgu yüzünden yavaşlıyor (major)
// ─────────────────────────────────────────────────────────────────────────────
const bugSlowProductListNPlusOne = {
  id: 'lqa-201',
  key: 'LQA-201',
  severity: 'major',
  title: {
    tr: 'Ürün listesi endpoint\'i 200 üründen sonra çok yavaşlıyor',
    en: 'The product list endpoint becomes very slow past 200 products',
  },
  reporter: { tr: 'Mobil Uygulama Ekibi', en: 'Mobile App Team' },
  summary: {
    tr: 'Mobil ekip, ürün kataloğu 200\'ü geçince `/api/products` endpoint\'inin 4 saniyeden uzun sürdüğünü bildirdi. 50 ürün için yanıt süresi 300ms iken 200 ürün için 4 saniyeye çıkıyor — süre ürün SAYISIYLA orantılı büyüyor.',
    en: 'The mobile team reported that once the product catalog passes 200 items, the `/api/products` endpoint takes over 4 seconds. Response time is 300ms for 50 products but climbs to 4 seconds for 200 — the duration scales with the product COUNT.',
  },
  mission: {
    type: 'mission',
    id: 'sprint2-lqa-201-mission',
    xpReward: 50,
    relatedTopicId: 'sprint-2-lqa-201',
    persona: { tr: 'QA Engineer · Sprint 25 · Gün 1', en: 'QA Engineer · Sprint 25 · Day 1' },
    scenario: {
      tr: 'Yeni sprint, yeni ekip: bu sefer Platform/Backend ekibindesin ve odak performans. Ders okumayacaksın — bir performans belirtisinden kök nedene, oradan da CI\'da güvenilir bir performans testine kadar gerçek bir QA gibi ilerleyeceksin.',
      en: 'A new sprint, a new team: this time you are on the Platform/Backend team and the focus is performance. You will not read a lesson — like a real QA you will go from a performance symptom to its root cause, and from there to a performance test that is actually reliable in CI.',
    },
    steps: [
      // ── 1) ANALİZ ──────────────────────────────────────────────────────────
      {
        id: 'lqa-201-step-analyze',
        brief: { tr: '1) ANALİZ — Süre ürün sayısıyla orantılı büyüyor. Kök neden ne olabilir?', en: '1) ANALYZE — The duration scales with the product count. What could the root cause be?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bir yanıt süresinin veri SAYISIYLA orantılı büyümesi, klasik bir imzadır: uygulama her kayıt için AYRI bir veritabanı sorgusu atıyordur. Buna "N+1 sorgu problemi" denir — 1 sorgu ana listeyi çeker, sonra HER BİR kayıt için (N tane) ayrı bir sorgu daha atılır. Java/Hibernate\'te bu genelde "lazy loading"in bir döngü içinde tetiklenmesiyle olur: `for (Product p : products) { p.getCategory(); }` gibi bir kod, her `p.getCategory()` çağrısında YENİ bir SQL sorgusu tetikler.',
          en: 'A response time growing proportionally with the data COUNT is a classic signature: the application is firing a SEPARATE database query per record. This is called the "N+1 query problem" — 1 query fetches the main list, then ONE MORE query fires for EACH record (N of them). In Java/Hibernate this usually happens when lazy loading gets triggered inside a loop: code like `for (Product p : products) { p.getCategory(); }` fires a NEW SQL query on every `p.getCategory()` call.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-201-analyze-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-2-lqa-201',
          prompt: {
            tr: '50 ürün 300ms, 200 ürün 4 saniye. Yanıt süresi ürün SAYISIYLA orantılı büyüyor. En olası kök neden?',
            en: '50 products take 300ms, 200 products take 4 seconds. The response time scales with the product COUNT. Most likely root cause?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Ağ bant genişliği yetersiz kalıyor', en: 'The network bandwidth is insufficient' },
              why: {
                tr: 'Bant genişliği sorunu olsaydı büyük bir yanıt gövdesinde sabit bir gecikme görülürdü; burada süre SAYIYLA orantılı büyüyor, bu farklı bir belirtidir.',
                en: 'A bandwidth issue would show a flat delay for a large response body; here the duration scales WITH the count, which is a different signature.',
              },
            },
            {
              id: 'b',
              label: { tr: 'Veritabanı ana liste sorgusundan SONRA her ürün için AYRI bir kategori sorgusu atıyor (N+1 sorgu problemi)', en: 'The database fires a SEPARATE category query for each product AFTER the main list query (N+1 query problem)' },
              correct: true,
            },
            {
              id: 'c',
              label: { tr: 'Sunucunun CPU\'su yetersiz', en: 'The server\'s CPU is insufficient' },
              why: {
                tr: 'CPU yetersizliği tüm isteklerde sabit bir yavaşlık yaratır; burada süre spesifik olarak KAYIT SAYISIYLA orantılı — bu bir sorgu deseni belirtisidir.',
                en: 'Insufficient CPU would create a flat slowdown across all requests; here the duration scales specifically WITH the record count — that is a query-pattern signature.',
              },
            },
          ],
          reveal: {
            tr: 'Doğru: N+1 sorgu problemi. 200 ürün = 1 (ana liste) + 200 (her ürünün kategorisi) = 201 sorgu. Bunu doğrulamanın en hızlı yolu veritabanı sorgu logunu açıp istek başına kaç sorgu çalıştığını saymaktır — sayı, ürün sayısıyla BİREBİR artıyorsa N+1 kanıtlanmış olur.',
            en: 'Correct: an N+1 query problem. 200 products = 1 (main list) + 200 (each product\'s category) = 201 queries. The fastest way to confirm this is to turn on the database query log and count how many queries run per request — if the count grows IN LOCKSTEP with the product count, N+1 is confirmed.',
          },
        },
      },
      // ── 2) TEST CASE ──────────────────────────────────────────────────────
      {
        id: 'lqa-201-step-testcase',
        brief: { tr: '2) TEST CASE — Yanıt süresi VE sorgu sayısı için bir eşik belirleyen case yaz.', en: '2) TEST CASE — Write the case that sets a threshold for both response time AND query count.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Performans test case\'lerinde tek bir sayıya ("hızlı olmalı") güvenmek yetersizdir — "hızlı" göreceli ve donanıma bağlıdır. Bu yüzden test case hem GÖZLENEBİLİR bir üst sınır (yanıt süresi) hem de kök nedenin kendisini yakalayan bir DAVRANIŞ (sorgu sayısı sabit kalmalı, ürün sayısıyla ARTMAMALI) tanımlamalıdır.',
          en: 'Relying on a single number ("it should be fast") in performance test cases is not enough — "fast" is relative and hardware-dependent. That is why the test case should define both an OBSERVABLE upper bound (response time) and a BEHAVIOR that catches the root cause itself (the query count should stay constant, NOT grow with the product count).',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-201-testcase-code',
          relatedTopicId: 'sprint2-lqa-201-mission',
          language: 'gherkin',
          label: { tr: 'Performans test case\'ini tamamla', en: 'Complete the performance test case' },
          task: {
            tr: 'TODO satırını, sorgu sayısının ürün sayısından BAĞIMSIZ, sabit bir üst sınırın altında kalması gerektiğini belirten Then satırıyla tamamla.',
            en: 'Complete the TODO line with a Then step stating the query count must stay under a fixed upper bound, INDEPENDENT of the product count.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç "süre yerine kök nedeni doğrudan yakala" refleksini pekiştirmek. Anahtar kelimeler (Given / When / Then / And) Gherkin dilinin kendi sözdizimidir — SELECT veya JOIN gibi İngilizce kalır: Given = ön koşul, When = kullanıcının yaptığı eylem, Then = gözlenebilir sonuç, And = bir önceki adımın devamı.',
            en: 'Not a real run; the goal is to reinforce catching the root cause directly instead of relying on duration alone. The keywords (Given / When / Then / And) are Gherkin syntax, not prose: Given = precondition, When = the action the user takes, Then = the observable outcome, And = a continuation of the previous step.',
          },
          code: {
            tr: `Scenario: Urun sayisi artsa bile calisan sorgu sayisi sabit kalir\n  Given katalogda 200 urun ve her urunun bir kategorisi var\n  When kullanici "/api/products" endpoint'ine istek atar\n  Then calisan toplam sorgu sayisi 5'in ALTINDA kalir`,
            en: `Scenario: The query count stays constant even as the product count grows\n  Given the catalog has 200 products and each product has a category\n  When the user requests the "/api/products" endpoint\n  Then the total number of queries executed stays UNDER 5`,
          },
          starterCode: {
            tr: `Scenario: Urun sayisi artsa bile calisan sorgu sayisi sabit kalir\n  Given katalogda 200 urun ve her urunun bir kategorisi var\n  When kullanici "/api/products" endpoint'ine istek atar\n  # TODO: sorgu sayisinin sabit bir ust sinirin altinda kaldigini dogrulayan Then satirini ekle`,
            en: `Scenario: The query count stays constant even as the product count grows\n  Given the catalog has 200 products and each product has a category\n  When the user requests the "/api/products" endpoint\n  # TODO: add the Then line verifying the query count stays under a fixed upper bound`,
          },
          solutionCode: {
            tr: `Scenario: Urun sayisi artsa bile calisan sorgu sayisi sabit kalir\n  Given katalogda 200 urun ve her urunun bir kategorisi var\n  When kullanici "/api/products" endpoint'ine istek atar\n  Then calisan toplam sorgu sayisi 5'in ALTINDA kalir`,
            en: `Scenario: The query count stays constant even as the product count grows\n  Given the catalog has 200 products and each product has a category\n  When the user requests the "/api/products" endpoint\n  Then the total number of queries executed stays UNDER 5`,
          },
          expected: {
            tr: 'Test case artık N+1\'in KENDİSİNİ hedefliyor — sadece süreye değil, sorgu sayısına bakıyor.',
            en: 'The test case now targets the N+1 problem ITSELF — it looks at the query count, not just the duration.',
          },
          hints: [
            { tr: 'Sabit bir sayı ("5\'in altında") sorgu sayısının ürün sayısıyla BÜYÜMEMESİ gerektiğini ima eder.', en: 'A fixed number ("under 5") implies the query count must NOT grow with the product count.' },
            { tr: 'Bu, önceki adımdaki N+1 tespitini doğrudan test edilebilir bir ifadeye çevirir.', en: 'This turns the N+1 diagnosis from the previous step into a directly testable statement.' },
          ],
          xpReward: 10,
        },
      },
      // ── 3) OTOMASYON ──────────────────────────────────────────────────────
      {
        id: 'lqa-201-step-automate',
        brief: { tr: '3) OTOMASYON — REST Assured ile yanıt süresi assertion\'ını yaz.', en: '3) AUTOMATE — Write the response-time assertion with REST Assured.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'REST Assured\'ın `.time(lessThan(...))` matcher\'ı, API testinde performans doğrulamasını fonksiyonel doğrulamayla AYNI zincire yerleştirmeni sağlar — ayrı bir performans aracına geçmeden, aynı testin içinde "doğru veriyi VE hızlı biçimde döndü mü?" sorusunu birlikte sorabilirsin.',
          en: 'REST Assured\'s `.time(lessThan(...))` matcher lets you place a performance check in the SAME chain as your functional assertions in an API test — without switching to a separate performance tool, you can ask "did it return the right data AND did it return it quickly?" together, in the same test.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-201-automate-code',
          relatedTopicId: 'sprint2-lqa-201-mission',
          language: 'java',
          label: { tr: 'Yanıt süresi assertion\'ını yaz', en: 'Write the response-time assertion' },
          task: {
            tr: 'TODO satırını, yanıt süresinin 500 milisaniyenin ALTINDA olduğunu doğrulayan assertion ile tamamla.',
            en: 'Complete the TODO line with an assertion verifying the response time is UNDER 500 milliseconds.',
          },
          explanation: {
            tr: 'Gerçek bir API koşumu değil; amaç API testinde performans assertion\'ı yazma refleksini pekiştirmek.',
            en: 'Not a real API run; the goal is to reinforce writing a performance assertion inside an API test.',
          },
          code: {
            tr: `@Test\nvoid urunListesiEndpointiHizliDonmeli() {\n    given()\n    .when()\n        .get("/api/products")\n    .then()\n        .statusCode(200)\n        .time(lessThan(500L));\n}`,
            en: `@Test\nvoid productListEndpointShouldRespondQuickly() {\n    given()\n    .when()\n        .get("/api/products")\n    .then()\n        .statusCode(200)\n        .time(lessThan(500L));\n}`,
          },
          starterCode: {
            tr: `@Test\nvoid urunListesiEndpointiHizliDonmeli() {\n    given()\n    .when()\n        .get("/api/products")\n    .then()\n        .statusCode(200)\n        // TODO: yanit suresinin 500 ms'nin ALTINDA oldugunu dogrula\n}`,
            en: `@Test\nvoid productListEndpointShouldRespondQuickly() {\n    given()\n    .when()\n        .get("/api/products")\n    .then()\n        .statusCode(200)\n        // TODO: verify the response time is UNDER 500 ms\n}`,
          },
          solutionCode: {
            tr: `@Test\nvoid urunListesiEndpointiHizliDonmeli() {\n    given()\n    .when()\n        .get("/api/products")\n    .then()\n        .statusCode(200)\n        .time(lessThan(500L));\n}`,
            en: `@Test\nvoid productListEndpointShouldRespondQuickly() {\n    given()\n    .when()\n        .get("/api/products")\n    .then()\n        .statusCode(200)\n        .time(lessThan(500L));\n}`,
          },
          expected: {
            tr: 'Test artık N+1 varken KIRMIZI yanıyor — 200 ürünlük yanıt 500ms eşiğini aşıyor.',
            en: 'The test now goes RED while N+1 exists — the response for 200 products exceeds the 500ms threshold.',
          },
          hints: [
            { tr: 'REST Assured\'da `.time(lessThan(değer))` yanıt süresini milisaniye cinsinden doğrular.', en: 'In REST Assured, `.time(lessThan(value))` verifies the response time in milliseconds.' },
            { tr: '`lessThan` bir Hamcrest matcher\'ıdır; `Matchers.lessThan` importunu gerektirir.', en: '`lessThan` is a Hamcrest matcher; it requires the `Matchers.lessThan` import.' },
          ],
          xpReward: 10,
        },
      },
      // ── 4) CI ─────────────────────────────────────────────────────────────
      {
        id: 'lqa-201-step-ci',
        brief: { tr: '4) CI — Test yerelde 300ms\'de geçiyor, CI\'da bazen 600ms\'ye çıkıp kırmızı yanıyor. En doğru yaklaşım?', en: '4) CI — The test passes at 300ms locally but sometimes hits 600ms and goes red in CI. What is the right approach?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Mutlak bir süre eşiği (500ms gibi) DONANIMA bağlıdır: paylaşımlı CI runner\'ları bazen yerel makineden daha yavaştır. Eşiği büyük bir güvenlik payıyla yükseltmek (ör. 5000ms) testi anlamsızlaştırır — o zaman N+1 regresyonu ASLA yakalanmaz. Daha sağlam yol, süre yerine (ya da süreye EK olarak) N+1\'in gerçek göstergesi olan SORGU SAYISINI doğrulamaktır — bu, donanım hızından BAĞIMSIZ bir metriktir.',
          en: 'An absolute duration threshold (like 500ms) is HARDWARE-dependent: shared CI runners are sometimes slower than a local machine. Raising the threshold with a huge safety margin (e.g., 5000ms) makes the test meaningless — it would NEVER catch an N+1 regression again. The more robust path is to assert on the QUERY COUNT — the real indicator of N+1 — instead of (or in addition to) duration, since that metric is INDEPENDENT of hardware speed.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-201-ci-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-2-lqa-201',
          prompt: {
            tr: 'Test yerelde 300ms, CI\'da bazen 600ms\'ye çıkıp kırmızı yanıyor. EN DOĞRU yaklaşım hangisi?',
            en: 'The test is 300ms locally but sometimes hits 600ms and goes red in CI. Which is the MOST CORRECT approach?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Eşiği CI\'nın en yavaş anına göre çok yükselt (ör. 5000ms)', en: 'Raise the threshold a lot to cover CI\'s slowest moment (e.g., 5000ms)' },
              why: {
                tr: 'Bu, testi bir N+1 regresyonunu bir daha asla yakalayamayacak kadar anlamsızlaştırır.',
                en: 'This makes the test so lenient it would never catch an N+1 regression again.',
              },
            },
            {
              id: 'b',
              label: { tr: 'Mutlak süre yerine (ya da ona ek olarak), donanımdan BAĞIMSIZ olan sorgu SAYISINI doğrulayan bir assertion ekle/tercih et', en: 'Instead of (or in addition to) absolute duration, add/prefer an assertion on the query COUNT, which is INDEPENDENT of hardware' },
              correct: true,
            },
            {
              id: 'c',
              label: { tr: 'Testi CI\'da devre dışı bırak, sadece yerelde çalıştır', en: 'Disable the test in CI, only run it locally' },
              why: {
                tr: 'Bu, regresyonu CI\'da bir daha hiç yakalamamak anlamına gelir — regression suite\'in tüm amacını iptal eder.',
                en: 'This means the regression will never be caught in CI again — it defeats the entire purpose of a regression suite.',
              },
            },
          ],
          reveal: {
            tr: 'Doğru: sorgu sayısı donanım hızından bağımsız, DETERMİNİSTİK bir metriktir — N+1 varsa 201 sorgu çalışır, yoksa sabit kalır; bu CI\'nın o an ne kadar yavaş olduğuyla değişmez. Süre assertion\'ı yine de faydalı bir ek sinyal olarak kalabilir, ama TEK başına güvenilir kanıt değildir.',
            en: 'Correct: the query count is a DETERMINISTIC metric independent of hardware speed — if N+1 exists, 201 queries run, otherwise the count stays fixed; this does not change based on how slow CI happens to be at that moment. The duration assertion can still be a useful extra signal, but it is not reliable evidence on its OWN.',
          },
        },
      },
      // ── 5) MERGE ──────────────────────────────────────────────────────────
      {
        id: 'lqa-201-step-merge',
        brief: { tr: '5) MERGE — Sorgu sayısını doğrudan doğrulayan, donanımdan bağımsız testi tamamla.', en: '5) MERGE — Complete the hardware-independent test that verifies the query count directly.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bir sorgu sayacı (query counter) kullanmak, N+1\'in KENDİSİNİ — semptomunu değil nedenini — regresyona karşı kilitler. Bu test artık "ürün sayısı 200\'den 2000\'e çıksa bile sorgu sayısı SABİT kalmalı" garantisini verir; bu, N+1\'in bir daha asla sessizce geri gelemeyeceği anlamına gelir.',
          en: 'Using a query counter locks the N+1 problem ITSELF — the cause, not the symptom — against regression. This test now guarantees "even if the product count grows from 200 to 2000, the query count must stay CONSTANT"; meaning N+1 can never silently return.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-201-merge-code',
          relatedTopicId: 'sprint2-lqa-201-mission',
          language: 'java',
          label: { tr: 'Sorgu sayısı assertion\'ını tamamla', en: 'Complete the query-count assertion' },
          task: {
            tr: 'TODO satırını, kalan sorgu sayısının sabit küçük bir üst sınırın (3) altında olduğunu doğrulayan assertion ile tamamla.',
            en: 'Complete the TODO line with an assertion verifying the remaining query count is under a fixed small upper bound (3).',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç donanımdan bağımsız, deterministik bir performans doğrulaması yazma refleksini pekiştirmek.',
            en: 'Not a real run; the goal is to reinforce writing a hardware-independent, deterministic performance assertion.',
          },
          code: {
            tr: `@Test\nvoid urunSayisiArtsaBileSorguSayisiSabitKalmali() {\n    queryCounter.reset();\n    productService.listProducts(); // 200 urun\n\n    assertTrue(queryCounter.getCount() <= 3);\n}`,
            en: `@Test\nvoid queryCountShouldStayConstantAsProductCountGrows() {\n    queryCounter.reset();\n    productService.listProducts(); // 200 products\n\n    assertTrue(queryCounter.getCount() <= 3);\n}`,
          },
          starterCode: {
            tr: `@Test\nvoid urunSayisiArtsaBileSorguSayisiSabitKalmali() {\n    queryCounter.reset();\n    productService.listProducts(); // 200 urun\n\n    // TODO: sorgu sayisinin 200 DEGIL, sabit kucuk bir ust sinirin (3) altinda oldugunu dogrula\n}`,
            en: `@Test\nvoid queryCountShouldStayConstantAsProductCountGrows() {\n    queryCounter.reset();\n    productService.listProducts(); // 200 products\n\n    // TODO: verify the query count is under a fixed small upper bound (3), NOT 200\n}`,
          },
          solutionCode: {
            tr: `@Test\nvoid urunSayisiArtsaBileSorguSayisiSabitKalmali() {\n    queryCounter.reset();\n    productService.listProducts(); // 200 urun\n\n    assertTrue(queryCounter.getCount() <= 3);\n}`,
            en: `@Test\nvoid queryCountShouldStayConstantAsProductCountGrows() {\n    queryCounter.reset();\n    productService.listProducts(); // 200 products\n\n    assertTrue(queryCounter.getCount() <= 3);\n}`,
          },
          expected: {
            tr: 'Bu test artık donanımdan bağımsız — CI ne kadar yavaş olursa olsun, N+1 varsa güvenilir şekilde kırmızı yanar.',
            en: 'This test is now hardware-independent — no matter how slow CI is, it fails reliably if N+1 exists.',
          },
          hints: [
            { tr: '`<= 3` gibi küçük, sabit bir sayı; N+1\'de sorgu sayısı ürün sayısıyla (200) BİRLİKTE büyür.', en: 'A small, fixed number like `<= 3`; under N+1 the query count grows WITH the product count (200).' },
            { tr: 'Bu assertion, önceki adımdaki `.time(lessThan(500L))`\'a bir ALTERNATİF değil, TAMAMLAYICIDIR.', en: 'This assertion is not an ALTERNATIVE to the previous step\'s `.time(lessThan(500L))`, it is a COMPLEMENT.' },
          ],
          xpReward: 10,
        },
      },
    ],
    debrief: {
      tr: 'Bu bug\'da öğrendiğin en değerli şey performans testinde METRİK SEÇİMİydi: mutlak süre (500ms) kullanıcıya en yakın anlamı taşır ama donanıma bağlıdır ve CI\'da flaky olabilir; sorgu SAYISI ise N+1\'in kendisini doğrudan yakalayan, donanımdan bağımsız bir metriktir. İkisini BİRLİKTE kullanmak — biri kullanıcı deneyimini, diğeri kök nedeni koruyan — en sağlam performans regresyon stratejisidir.',
      en: 'The most valuable thing you learned on this bug was METRIC SELECTION in performance testing: an absolute duration (500ms) carries the meaning closest to the user but is hardware-dependent and can be flaky in CI; the query COUNT is a hardware-independent metric that directly catches the N+1 problem itself. Using both TOGETHER — one protecting the user experience, the other the root cause — is the most robust performance regression strategy.',
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// LQA-202 — Eşzamanlı sipariş istekleri bazen 500 dönüyor (critical)
// ─────────────────────────────────────────────────────────────────────────────
const bugConcurrentOrderStockRace = {
  id: 'lqa-202',
  key: 'LQA-202',
  severity: 'critical',
  title: {
    tr: 'Aynı anda gelen sipariş istekleri bazen 500 hatası döndürüyor',
    en: 'Concurrent order requests sometimes return a 500 error',
  },
  reporter: { tr: 'SRE / Platform Ekibi', en: 'SRE / Platform Team' },
  summary: {
    tr: 'Yoğun saatlerde (ör. kampanya başlangıcı) aynı ürüne aynı anda gelen sipariş istekleri bazen 500 Internal Server Error dönüyor. Loglar "stok güncellenirken satır kilidi zaman aşımı" hatası gösteriyor.',
    en: 'During peak hours (e.g., a campaign launch), concurrent order requests for the same product sometimes return a 500 Internal Server Error. Logs show a "row lock timeout while updating stock" error.',
  },
  mission: {
    type: 'mission',
    id: 'sprint2-lqa-202-mission',
    xpReward: 55,
    relatedTopicId: 'sprint-2-lqa-202',
    persona: { tr: 'QA Engineer · Sprint 25 · Gün 2', en: 'QA Engineer · Sprint 25 · Day 2' },
    scenario: {
      tr: 'SRE ekibi bu bug\'ı critical\'a yükseltti çünkü kampanya başlangıcında müşteri kaybına yol açıyor. Ders okumayacaksın — eşzamanlılık altında ortaya çıkan bir yarış durumunu yükten (load) test ederek yakalayacak, kalıcı çözümü SQL seviyesinde uygulayacaksın.',
      en: 'The SRE team escalated this bug to critical because it causes customer loss at campaign launch. You will not read a lesson — you will catch a race condition that only appears under concurrency by load-testing it, and apply the permanent fix at the SQL level.',
    },
    steps: [
      // ── 1) ANALİZ ──────────────────────────────────────────────────────────
      {
        id: 'lqa-202-step-analyze',
        brief: { tr: '1) ANALİZ — "Satır kilidi zaman aşımı" logu neyin belirtisi?', en: '1) ANALYZE — What is the "row lock timeout" log a symptom of?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Çok sayıda eşzamanlı istek AYNI satırı (bir ürünün stok kaydını) güncellemeye çalıştığında, veritabanı her istek için o satırı KİLİTLER; diğer istekler kilidin açılmasını BEKLEMEK zorunda kalır. Bekleyen istek sayısı arttıkça bazıları zaman aşımına uğrar. Bu, Java\'da çok sayıda thread\'in aynı `synchronized` bloğuna girmeye çalışıp SIRAYA GİRMESİYLE aynı mekanizmadır — fark şu ki burada kilit veritabanı satırı seviyesindedir ve QA bunu yalnızca YÜK (load) altında, tek istekli fonksiyonel testte GÖREMEZ.',
          en: 'When many concurrent requests try to update the SAME row (one product\'s stock record), the database LOCKS that row for each request; other requests must WAIT for the lock to release. As the number of waiting requests grows, some time out. This is the same mechanism as many Java threads trying to enter the same `synchronized` block and QUEUING UP — the difference is the lock here is at the database row level, and a QA cannot SEE this in a single-request functional test, only under LOAD.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-202-analyze-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-2-lqa-202',
          prompt: {
            tr: 'Log: "satır kilidi zaman aşımı". Aynı anda 50 istek AYNI ürünün stoğunu güncellemeye çalışıyor. En olası kök neden?',
            en: 'Log: "row lock timeout". 50 concurrent requests try to update the SAME product\'s stock. Most likely root cause?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Çok sayıda eşzamanlı istek AYNI satır için kilit bekliyor (yüksek contention) ve bazıları zaman aşımına uğruyor', en: 'Many concurrent requests are waiting for a lock on the SAME row (high contention) and some time out' },
              correct: true,
            },
            {
              id: 'b',
              label: { tr: 'Veritabanı bozulmuş (corrupt), yeniden kurulmalı', en: 'The database is corrupt and needs to be reinstalled' },
              why: {
                tr: 'Log spesifik olarak bir KİLİT zaman aşımı gösteriyor, bir bozulma (corruption) hatası değil — aşırı bir teşhis.',
                en: 'The log specifically shows a LOCK timeout, not a corruption error — this is an overreaching diagnosis.',
              },
            },
            {
              id: 'c',
              label: { tr: 'API sunucusunun yeterince RAM\'i yok', en: 'The API server does not have enough RAM' },
              why: {
                tr: 'Belirti kilit çekişmesi (contention), bellek yetersizliği değil — bellek sorunları farklı hata mesajları üretir.',
                en: 'The symptom is lock contention, not insufficient memory — memory problems produce different error messages.',
              },
            },
          ],
          reveal: {
            tr: 'Doğru: yüksek kilit çekişmesi (contention). Bu bug tek istekli fonksiyonel testte HİÇBİR ZAMAN görünmez — yalnızca gerçekçi bir eşzamanlılık/yük senaryosunda ortaya çıkar. Bu yüzden bir sonraki adımda bu senaryoyu bilerek YÜK ALTINDA test edeceksin.',
            en: 'Correct: high lock contention. This bug NEVER shows up in a single-request functional test — it only appears under a realistic concurrency/load scenario. That is why in the next step you will deliberately test this scenario UNDER LOAD.',
          },
        },
      },
      // ── 2) TEST CASE ──────────────────────────────────────────────────────
      {
        id: 'lqa-202-step-testcase',
        brief: { tr: '2) TEST CASE — Eşzamanlı isteklerin stoğu negatife düşürmediğini doğrulayan case yaz.', en: '2) TEST CASE — Write the case verifying concurrent requests do not push stock negative.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bu test case\'in özü "50 istek AYNI ANDA" ifadesidir — sırayla gönderilen 50 istek bu bug\'ı ASLA yakalamaz, çünkü yarış durumu sadece isteklerin ÇAKIŞTIĞI dar zaman penceresinde ortaya çıkar. Beklenen sonuç da iki parçalıdır: stok asla negatif olmamalı VE stoktan fazla sipariş başarısız olmalı — sadece "hata vermedi" yeterli değildir.',
          en: 'The essence of this test case is the phrase "50 requests AT THE SAME TIME" — 50 requests sent sequentially would NEVER catch this bug, because the race condition only appears in the narrow window where requests OVERLAP. The expected outcome also has two parts: stock must never go negative AND orders beyond available stock must fail — "it did not error" alone is not enough.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-202-testcase-code',
          relatedTopicId: 'sprint2-lqa-202-mission',
          language: 'gherkin',
          label: { tr: 'Eşzamanlılık test case\'ini tamamla', en: 'Complete the concurrency test case' },
          task: {
            tr: 'TODO satırını, stoğun negatife düşmediğini VE en fazla mevcut stok kadar siparişin başarılı olduğunu belirten Then satırıyla tamamla.',
            en: 'Complete the TODO line with a Then step stating stock never goes negative AND at most as many orders as available stock succeed.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç eşzamanlılık senaryosunda "iki parçalı beklenen sonuç" yazma refleksini pekiştirmek. Anahtar kelimeler (Given / When / Then / And) Gherkin dilinin kendi sözdizimidir — SELECT veya JOIN gibi İngilizce kalır: Given = ön koşul, When = kullanıcının yaptığı eylem, Then = gözlenebilir sonuç, And = bir önceki adımın devamı.',
            en: 'Not a real run; the goal is to reinforce writing a "two-part expected outcome" for a concurrency scenario. The keywords (Given / When / Then / And) are Gherkin syntax, not prose: Given = precondition, When = the action the user takes, Then = the observable outcome, And = a continuation of the previous step.',
          },
          code: {
            tr: `Scenario: Eszamanli siparisler stogu negatife dusurmez\n  Given bir urunun stogu 10 adettir\n  When 50 eszamanli istek AYNI ANDA bu urun icin siparis olusturmaya calisir\n  Then kalan stok negatif olmaz VE en fazla 10 siparis basarili olur`,
            en: `Scenario: Concurrent orders do not push stock negative\n  Given a product has a stock of 10\n  When 50 concurrent requests try to order this product AT THE SAME TIME\n  Then the remaining stock is never negative AND at most 10 orders succeed`,
          },
          starterCode: {
            tr: `Scenario: Eszamanli siparisler stogu negatife dusurmez\n  Given bir urunun stogu 10 adettir\n  When 50 eszamanli istek AYNI ANDA bu urun icin siparis olusturmaya calisir\n  # TODO: iki parcali beklenen sonucu (negatif olmaz + en fazla 10 basarili) yazan Then satirini ekle`,
            en: `Scenario: Concurrent orders do not push stock negative\n  Given a product has a stock of 10\n  When 50 concurrent requests try to order this product AT THE SAME TIME\n  # TODO: add the Then line stating the two-part expected outcome (never negative + at most 10 succeed)`,
          },
          solutionCode: {
            tr: `Scenario: Eszamanli siparisler stogu negatife dusurmez\n  Given bir urunun stogu 10 adettir\n  When 50 eszamanli istek AYNI ANDA bu urun icin siparis olusturmaya calisir\n  Then kalan stok negatif olmaz VE en fazla 10 siparis basarili olur`,
            en: `Scenario: Concurrent orders do not push stock negative\n  Given a product has a stock of 10\n  When 50 concurrent requests try to order this product AT THE SAME TIME\n  Then the remaining stock is never negative AND at most 10 orders succeed`,
          },
          expected: {
            tr: 'Test case artık iki koşulu birlikte doğruluyor — sadece biri yeterli değildi.',
            en: 'The test case now verifies both conditions together — either one alone was not enough.',
          },
          hints: [
            { tr: '"AYNI ANDA" ifadesi When adımında MUTLAKA geçmeli; sıralı istekler bu bug\'ı yakalamaz.', en: 'The phrase "AT THE SAME TIME" must appear in the When step; sequential requests will not catch this bug.' },
            { tr: 'İki koşulu "VE" ile bağla — biri stok değerini, diğeri başarılı sipariş sayısını doğrular.', en: 'Connect the two conditions with "AND" — one verifies the stock value, the other the count of successful orders.' },
          ],
          xpReward: 10,
        },
      },
      // ── 3) OTOMASYON ──────────────────────────────────────────────────────
      {
        id: 'lqa-202-step-automate',
        brief: { tr: '3) OTOMASYON — Gerçekten EŞZAMANLI istekler gönderen bir test yaz.', en: '3) AUTOMATE — Write a test that sends TRULY concurrent requests.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bir döngüde sırayla 50 istek göndermek eşzamanlılığı SİMÜLE ETMEZ — her istek bir öncekinin bitmesini bekler. Gerçek eşzamanlılık için 50 thread\'i AYNI ANDA başlatmak gerekir; bir `CountDownLatch` tam olarak bunu yapar: tüm thread\'ler hazır bekler, TEK bir sinyalle hepsi birden koşmaya başlar — böylece gerçek bir çakışma penceresi yaratılır.',
          en: 'Sending 50 requests sequentially in a loop does NOT simulate concurrency — each request waits for the previous one to finish. True concurrency requires starting 50 threads AT THE SAME MOMENT; a `CountDownLatch` does exactly that: all threads wait ready, and a SINGLE signal releases them all at once — creating a genuine overlap window.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-202-automate-code',
          relatedTopicId: 'sprint2-lqa-202-mission',
          language: 'java',
          label: { tr: 'Eşzamanlılık testini tamamla', en: 'Complete the concurrency test' },
          task: {
            tr: 'TODO satırını, kalan stoğun NEGATİF olamayacağını doğrulayan assertion ile tamamla.',
            en: 'Complete the TODO line with an assertion verifying the remaining stock cannot be NEGATIVE.',
          },
          explanation: {
            tr: 'Gerçek bir koşum değil; amaç `CountDownLatch` ile gerçek eşzamanlılık yaratma refleksini pekiştirmek.',
            en: 'Not a real run; the goal is to reinforce creating true concurrency with `CountDownLatch`.',
          },
          code: {
            tr: `@Test\nvoid esZamanliSiparislerStoguNegatifeDusurmemeli() throws Exception {\n    ExecutorService havuz = Executors.newFixedThreadPool(50);\n    CountDownLatch basla = new CountDownLatch(1);\n\n    for (int i = 0; i < 50; i++) {\n        havuz.submit(() -> {\n            basla.await();\n            siparisServisi.siparisOlustur(urunId, 1);\n        });\n    }\n    basla.countDown(); // 50 thread AYNI ANDA baslar\n    havuz.shutdown();\n    havuz.awaitTermination(10, TimeUnit.SECONDS);\n\n    int kalanStok = stokServisi.getStok(urunId);\n    assertTrue(kalanStok >= 0);\n}`,
            en: `@Test\nvoid concurrentOrdersShouldNotPushStockNegative() throws Exception {\n    ExecutorService pool = Executors.newFixedThreadPool(50);\n    CountDownLatch start = new CountDownLatch(1);\n\n    for (int i = 0; i < 50; i++) {\n        pool.submit(() -> {\n            start.await();\n            orderService.createOrder(productId, 1);\n        });\n    }\n    start.countDown(); // 50 threads start AT THE SAME MOMENT\n    pool.shutdown();\n    pool.awaitTermination(10, TimeUnit.SECONDS);\n\n    int remainingStock = stockService.getStock(productId);\n    assertTrue(remainingStock >= 0);\n}`,
          },
          starterCode: {
            tr: `@Test\nvoid esZamanliSiparislerStoguNegatifeDusurmemeli() throws Exception {\n    ExecutorService havuz = Executors.newFixedThreadPool(50);\n    CountDownLatch basla = new CountDownLatch(1);\n\n    for (int i = 0; i < 50; i++) {\n        havuz.submit(() -> {\n            basla.await();\n            siparisServisi.siparisOlustur(urunId, 1);\n        });\n    }\n    basla.countDown(); // 50 thread AYNI ANDA baslar\n    havuz.shutdown();\n    havuz.awaitTermination(10, TimeUnit.SECONDS);\n\n    int kalanStok = stokServisi.getStok(urunId);\n    // TODO: kalan stogun NEGATIF olamayacagini dogrula\n}`,
            en: `@Test\nvoid concurrentOrdersShouldNotPushStockNegative() throws Exception {\n    ExecutorService pool = Executors.newFixedThreadPool(50);\n    CountDownLatch start = new CountDownLatch(1);\n\n    for (int i = 0; i < 50; i++) {\n        pool.submit(() -> {\n            start.await();\n            orderService.createOrder(productId, 1);\n        });\n    }\n    start.countDown(); // 50 threads start AT THE SAME MOMENT\n    pool.shutdown();\n    pool.awaitTermination(10, TimeUnit.SECONDS);\n\n    int remainingStock = stockService.getStock(productId);\n    // TODO: verify the remaining stock cannot be NEGATIVE\n}`,
          },
          solutionCode: {
            tr: `@Test\nvoid esZamanliSiparislerStoguNegatifeDusurmemeli() throws Exception {\n    ExecutorService havuz = Executors.newFixedThreadPool(50);\n    CountDownLatch basla = new CountDownLatch(1);\n\n    for (int i = 0; i < 50; i++) {\n        havuz.submit(() -> {\n            basla.await();\n            siparisServisi.siparisOlustur(urunId, 1);\n        });\n    }\n    basla.countDown(); // 50 thread AYNI ANDA baslar\n    havuz.shutdown();\n    havuz.awaitTermination(10, TimeUnit.SECONDS);\n\n    int kalanStok = stokServisi.getStok(urunId);\n    assertTrue(kalanStok >= 0);\n}`,
            en: `@Test\nvoid concurrentOrdersShouldNotPushStockNegative() throws Exception {\n    ExecutorService pool = Executors.newFixedThreadPool(50);\n    CountDownLatch start = new CountDownLatch(1);\n\n    for (int i = 0; i < 50; i++) {\n        pool.submit(() -> {\n            start.await();\n            orderService.createOrder(productId, 1);\n        });\n    }\n    start.countDown(); // 50 threads start AT THE SAME MOMENT\n    pool.shutdown();\n    pool.awaitTermination(10, TimeUnit.SECONDS);\n\n    int remainingStock = stockService.getStock(productId);\n    assertTrue(remainingStock >= 0);\n}`,
          },
          expected: {
            tr: 'Test artık gerçek bir eşzamanlılık senaryosu yaratıyor — bug varsa ARA SIRA kalan stoğun negatif çıktığını yakalayabilir.',
            en: 'The test now creates a genuine concurrency scenario — if the bug exists it can catch remaining stock coming out negative, INTERMITTENTLY.',
          },
          hints: [
            { tr: '`CountDownLatch.await()` bir thread\'i, `countDown()` çağrılana kadar BEKLETİR.', en: '`CountDownLatch.await()` makes a thread WAIT until `countDown()` is called.' },
            { tr: 'Assertion, stok servisinin GERÇEK son durumuna bakar; bireysel isteklerin başarılı/başarısız olmasına değil.', en: 'The assertion looks at the stock service\'s ACTUAL final state, not whether individual requests succeeded or failed.' },
          ],
          xpReward: 10,
        },
      },
      // ── 4) CI ─────────────────────────────────────────────────────────────
      {
        id: 'lqa-202-step-ci',
        brief: { tr: '4) CI — Bu test bazen geçiyor, bazen stok -3 gibi negatif çıkıyor. Bu "bazen" ne KANITLIYOR?', en: '4) CI — This test sometimes passes, sometimes stock comes out negative like -3. What does this "sometimes" PROVE?' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Bir eşzamanlılık testinin ARALIKLI (bazen geçen, bazen kırılan) kırılması genellikle testin bir hatası DEĞİLDİR — bu, bug\'ın KENDİSİNİN doğası gereği aralıklı (non-deterministic) olduğunun kanıtıdır. Üretimde de AYNI ŞEKİLDE davranır: bazen 50 istek çakışmaz ve sorun görünmez, bazen tam olarak çakışır ve stok negatife düşer. Bu tür bug\'lar özellikle tehlikelidir çünkü kod incelemesinden (code review) ve tekli-istek testinden SESSİZCE geçerler.',
          en: 'A concurrency test failing INTERMITTENTLY (sometimes passing, sometimes not) is usually NOT a fault of the test — it is proof that the bug ITSELF is inherently non-deterministic by nature. It behaves the SAME WAY in production: sometimes 50 requests do not overlap and the problem is invisible, sometimes they overlap exactly and stock goes negative. Bugs like this are especially dangerous because they pass code review and single-request testing SILENTLY.',
        },
        block: {
          type: 'prediction',
          id: 'lqa-202-ci-choice',
          xpReward: 10,
          relatedTopicId: 'sprint-2-lqa-202',
          prompt: {
            tr: 'Bu eşzamanlılık testi CI\'da bazen geçiyor, bazen stok negatif çıkıyor. Bu aralıklı kırılma neyi KANITLIYOR?',
            en: 'This concurrency test sometimes passes in CI, sometimes stock comes out negative. What does this intermittent failure PROVE?',
          },
          options: [
            {
              id: 'a',
              label: { tr: 'Test yanlış yazılmış, silinmeli', en: 'The test is written incorrectly and should be deleted' },
              why: {
                tr: 'Aksine, test tam olarak yapması gerekeni yapıyor — bir yarış durumunu ARA SIRA yakalıyor, çünkü bug\'ın kendisi ara sıra ortaya çıkıyor.',
                en: 'On the contrary, the test is doing exactly what it should — catching a race condition INTERMITTENTLY, because the bug itself surfaces intermittently.',
              },
            },
            {
              id: 'b',
              label: { tr: 'CI sunucusu paralel test çalıştırmaya uygun değildir', en: 'The CI server is not suitable for running parallel tests' },
              why: {
                tr: 'Yanlış çıkarım — CI paralellik için tasarlanmıştır; sorun ortamda değil, uygulamanın eşzamanlılık tasarımındadır.',
                en: 'A wrong inference — CI is designed for concurrency; the problem is not the environment but the application\'s concurrency design.',
              },
            },
            {
              id: 'c',
              label: { tr: 'Bu, bug\'ın DETERMİNİSTİK olmadığını, üretimde de aynı şekilde ARA SIRA oluşacağını kanıtlar', en: 'This proves the bug is NOT deterministic and will occur intermittently in production the same way' },
              correct: true,
            },
          ],
          reveal: {
            tr: 'Doğru: bu aralıklı kırılma, bug\'ın rastgele/aralıklı doğasının kanıtıdır — testin hatası değil, bug\'ın hatasıdır. Fix\'in yapması gereken, bu rastgeleliği TAMAMEN ortadan kaldırmaktır (bir sonraki adımda), sadece testi tekrar çalıştırıp "bu sefer geçti" demek değil.',
            en: 'Correct: this intermittent failure is proof of the bug\'s random/intermittent nature — it is the bug\'s fault, not the test\'s. The fix must ELIMINATE this randomness entirely (in the next step), not just rerun the test and say "it passed this time".',
          },
        },
      },
      // ── 5) MERGE ──────────────────────────────────────────────────────────
      {
        id: 'lqa-202-step-merge',
        brief: { tr: '5) MERGE — Kontrol-sonra-yaz yarışını TEK ATOMİK sorguyla ortadan kaldır.', en: '5) MERGE — Eliminate the check-then-act race with a SINGLE ATOMIC query.' },
        successCriterion: 'onFirstSuccess',
        miniLesson: {
          tr: 'Kök neden, "önce stoğu OKU, sonra ayrı bir adımda AZALT" mantığıdır (check-then-act) — bu iki adım arasında başka bir istek araya girebilir. Çözüm, okuma ve yazmayı TEK bir atomik SQL cümlesinde birleştirmektir: `UPDATE ... WHERE stok > 0`. Veritabanı bu tek satırı işlerken satırı otomatik kilitler, böylece "arada" diye bir an KALMAZ — tıpkı lqa-103\'teki UNIQUE kısıtının check-then-act\'i ortadan kaldırması gibi, burada da tek atomik ifade aynı işi yapar.',
          en: 'The root cause is "first READ the stock, then DECREMENT it in a separate step" logic (check-then-act) — another request can slip in between those two steps. The fix is to combine the read and the write into a SINGLE atomic SQL statement: `UPDATE ... WHERE stock > 0`. While the database processes this one row, it locks the row automatically, so there is NO "in-between" moment left — just like the UNIQUE constraint in lqa-103 eliminated a check-then-act race, a single atomic statement does the same job here.',
        },
        block: {
          type: 'code-playground',
          id: 'lqa-202-merge-code',
          relatedTopicId: 'sprint2-lqa-202-mission',
          language: 'sql',
          label: { tr: 'Atomik stok azaltma sorgusunu yaz', en: 'Write the atomic stock-decrement query' },
          task: {
            tr: 'TODO satırını, okuma ve yazmayı TEK atomik sorguda birleştiren güvenli UPDATE ifadesiyle tamamla.',
            en: 'Complete the TODO line with the safe UPDATE statement that combines the read and the write into a SINGLE atomic query.',
          },
          explanation: {
            tr: 'Gerçek bir veritabanı koşumu değil; amaç check-then-act yarışını tek atomik ifadeyle ortadan kaldırma refleksini pekiştirmek.',
            en: 'Not a real database run; the goal is to reinforce eliminating a check-then-act race with a single atomic statement.',
          },
          code: {
            tr: `-- ONCEKI (yaris durumuna acik):\n-- SELECT stok FROM products WHERE id = 1;\n-- eger stok > 0 ise: UPDATE products SET stok = stok - 1 WHERE id = 1;\n\nUPDATE products SET stok = stok - 1 WHERE id = 1 AND stok > 0;`,
            en: `-- BEFORE (open to a race condition):\n-- SELECT stock FROM products WHERE id = 1;\n-- if stock > 0: UPDATE products SET stock = stock - 1 WHERE id = 1;\n\nUPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0;`,
          },
          starterCode: {
            tr: `-- ONCEKI (yaris durumuna acik):\n-- SELECT stok FROM products WHERE id = 1;\n-- eger stok > 0 ise: UPDATE products SET stok = stok - 1 WHERE id = 1;\n\n-- TODO: okuma ve yazmayi TEK atomik sorguda birlestiren guvenli UPDATE'i yaz`,
            en: `-- BEFORE (open to a race condition):\n-- SELECT stock FROM products WHERE id = 1;\n-- if stock > 0: UPDATE products SET stock = stock - 1 WHERE id = 1;\n\n-- TODO: write the safe UPDATE that combines the read and the write into ONE atomic query`,
          },
          solutionCode: {
            tr: `-- ONCEKI (yaris durumuna acik):\n-- SELECT stok FROM products WHERE id = 1;\n-- eger stok > 0 ise: UPDATE products SET stok = stok - 1 WHERE id = 1;\n\nUPDATE products SET stok = stok - 1 WHERE id = 1 AND stok > 0;`,
            en: `-- BEFORE (open to a race condition):\n-- SELECT stock FROM products WHERE id = 1;\n-- if stock > 0: UPDATE products SET stock = stock - 1 WHERE id = 1;\n\nUPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0;`,
          },
          expected: {
            tr: 'Artık okuma ve yazma arasında başka bir isteğin girebileceği bir an kalmıyor — yarış durumu KÖKTEN ortadan kalktı.',
            en: 'There is no longer a moment between the read and the write where another request can slip in — the race condition is eliminated at the ROOT.',
          },
          hints: [
            { tr: '`WHERE stok > 0` koşulu, azaltma işlemini KENDİ İÇİNDE bir kontrole dönüştürür — ayrı bir SELECT gerekmez.', en: 'The `WHERE stock > 0` condition turns the decrement itself into a check — a separate SELECT is not needed.' },
            { tr: 'Bu tek satır, önceki iki adımlık (SELECT + UPDATE) mantığın YERİNİ alır, ona ek değildir.', en: 'This single line REPLACES the previous two-step (SELECT + UPDATE) logic, it does not add to it.' },
          ],
          xpReward: 10,
        },
      },
    ],
    debrief: {
      tr: 'Bu bug, lqa-103\'teki check-then-act dersini FARKLI bir alanda (idempotency key yerine stok) tekrar gösterdi: "önce oku, sonra yaz" iki adımlı mantık her zaman bir yarış durumuna açıktır, tek çözüm okuma ile yazmayı TEK atomik işlemde birleştirmektir. Ayrıca eşzamanlılık bug\'larının kendine özgü bir imzası olduğunu gördün: ARALIKLI kırılma bir test hatası değil, bug\'ın rastgele doğasının kanıtıdır — ve bu tür bug\'lar sadece YÜK altında görünür hâle gelir.',
      en: 'This bug showed the same check-then-act lesson from lqa-103 again, in a DIFFERENT domain (stock instead of an idempotency key): "read then write" two-step logic is always open to a race condition, and the only fix is combining the read and the write into ONE atomic operation. You also saw that concurrency bugs have their own signature: an INTERMITTENT failure is not a test defect but proof of the bug\'s random nature — and bugs like this only become visible under LOAD.',
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
        tr: 'Ödeme akışına giden yoldaki kritik hataları kapat ve her biri için kalıcı regresyon koruması bırak.',
        en: 'Close the critical faults on the path to checkout and leave permanent regression protection for each.',
      },
      xpBonus: 80,
      retro: {
        tr: 'Sprint kapandı. Dört bug\'ın hepsinde aynı desen tekrar etti: önce KATMANI doğru tespit ettin (frontend\'in 401\'i yutması, arayüzün bayat kopyayı göstermesi, sunucunun istemciye güvenmesi, check-then-act yarış durumu), sonra bug\'ı maskelemeyen bir test case yazdın, onu koşul-bekleyen bir otomasyona dönüştürdün ve CI\'daki kırmızıyı kanıt olarak kullandın. Bir QA\'in işi kod yazmak değil, kanıt üretmektir — bu sprint boyunca yaptığın tam olarak buydu.',
        en: 'Sprint closed. The same pattern repeated across all four bugs: first you identified the LAYER correctly (the frontend swallowing a 401, the interface showing a stale copy, the server trusting the client, a check-then-act race condition), then you wrote a test case that did not mask the bug, turned it into automation that waits on a condition, and used the CI red as evidence. A QA\'s job is not to write code but to produce evidence — which is exactly what you did across this sprint.',
      },
      bugs: [bugSilentLoginFailure, bugStaleCartTotal, bugDoubleOrderSubmit, bugExpiredCouponStillValid],
    },
    {
      id: 'sprint-2',
      code: 'SPRINT-25',
      title: { tr: 'API Performans ve Güvenilirlik', en: 'API Performance and Reliability' },
      company: { tr: 'ShopLab · Platform/Backend ekibi', en: 'ShopLab · Platform/Backend team' },
      goal: {
        tr: 'API katmanındaki performans ve eşzamanlılık hatalarını kapat, her ikisi için de donanımdan bağımsız, güvenilir bir regresyon koruması bırak.',
        en: 'Close the performance and concurrency faults in the API layer, leaving a hardware-independent, reliable regression guard for each.',
      },
      xpBonus: 70,
      retro: {
        tr: 'Sprint kapandı. Bu sprint\'in dersi bir öncekinden farklıydı: hatalar tek istekli fonksiyonel testte GÖRÜNMÜYORDU — biri veri SAYISI büyüdükçe, diğeri istekler ÇAKIŞTIĞINDA ortaya çıkıyordu. İkisinde de öğrendiğin ortak ilke şuydu: donanıma bağlı bir metriğe (yanıt süresi gibi) güvenmek yerine, bug\'ın KENDİSİNİ doğrudan yakalayan deterministik bir sinyal (sorgu sayısı, atomik UPDATE) bulmak gerekir.',
        en: 'Sprint closed. This sprint\'s lesson was different from the last: the faults did NOT show up in single-request functional testing — one emerged as the data COUNT grew, the other when requests OVERLAPPED. The shared principle you learned in both: instead of trusting a hardware-dependent metric (like response time), you must find a deterministic signal (query count, an atomic UPDATE) that directly catches the bug ITSELF.',
      },
      bugs: [bugSlowProductListNPlusOne, bugConcurrentOrderStockRace],
    },
  ],
}

export default sprintsData
