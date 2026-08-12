// OTOMATİK ÜRETİLDİ — elle düzenleme, npm run build sırasında yeniden yazılır.
// Kaynak: scripts/generate-interview-showcase.mjs
//
// Ana sayfadaki herkese açık mülakat ısınma bölümünün verisi. Ders
// sayfalarındaki mülakat sekmesi %60 quiz barajının arkasındadır; burası
// gate'siz ve GÖRÜNÜRDÜR — ana sayfanın FAQPage şeması yalnızca bu görünür
// metinden üretilir, böylece şema ile ekranda yazan şey birebir aynıdır.

export const INTERVIEW_SHOWCASE = [
  {
    "route": "/selenium",
    "level": "basic",
    "q": {
      "tr": "Bir web formunu test ediyorsunuz ve testiniz bazen \"NoSuchElementException\" veriyor ama sayfayı elle açtığınızda her şey normal görünüyor. Nedeni ne olabilir?",
      "en": "Your web form test sometimes throws NoSuchElementException but the page looks fine manually. What could be the cause?"
    },
    "a": {
      "tr": "Bu hatanın en yaygın sebebi timing (zamanlama) sorunudur. Sayfa görsel olarak hazır görünse bile DOM elementleri JavaScript tarafından sonradan ekleniyor olabilir. Çözüm: Thread.sleep() yerine WebDriverWait + ExpectedConditions.visibilityOfElementLocated() veya elementToBeClickable() kullanın. Java'da FluentWait ile polling interval da belirleyebilirsiniz. Ikinci olası sebep iframe: element bir iframe içindeyse önce driver.switchTo().frame() yapılmalıdır. Üçüncü sebep: farklı ağ hızları — CI/CD ortamında lokal makineden daha yavaş olabilir, timeout süresini artırın.",
      "en": "The most common cause is a timing issue. Even if the page appears ready, DOM elements may be added later by JavaScript. Solution: use WebDriverWait + ExpectedConditions instead of Thread.sleep(). Also check for iframes — call switchTo().frame() first. Another cause: CI/CD runs slower than local, increase the timeout."
    }
  },
  {
    "route": "/playwright",
    "level": "intermediate",
    "q": {
      "tr": "Page Object Model (POM) Playwright'ta nasıl uygulanır?",
      "en": "How do you implement Page Object Model (POM) in Playwright?"
    },
    "a": {
      "tr": "Her sayfa için class, constructor'a Page: class LoginPage { constructor(page) { this.emailInput = page.locator(\"[data-qa='login-email']\"); } async login(e, p) { await this.emailInput.fill(e); } }. Test'te: const lp = new LoginPage(page); await lp.login(). Java POM ile birebir aynıdır.",
      "en": "Create class per page, pass Page in constructor: class LoginPage { constructor(page) { this.emailInput = page.locator(\"[data-qa='login-email']\"); } async login(e,p) { await this.emailInput.fill(e); } }. In tests: const lp = new LoginPage(page); await lp.login(). Identical to Java POM pattern."
    }
  },
  {
    "route": "/cypress",
    "level": "advanced",
    "q": {
      "tr": "Cypress'in mimarisi (aynı browser process içinde çalışması) Selenium/Playwright'tan nasıl farklı, avantaj/dezavantajları nedir?",
      "en": "How does Cypress's architecture (running in the same browser process) differ from Selenium/Playwright, and what are the trade-offs?"
    },
    "a": {
      "tr": "Cypress, test kodunu doğrudan tarayıcının JavaScript run-loop'unda çalıştırır; Selenium ve Playwright ise ayrı bir process'ten tarayıcıyı \"uzaktan\" yönetir. Avantaj: network gecikmesi yok, DOM'a doğrudan erişim, time-travel debugging. Dezavantaj: sadece JavaScript/TypeScript, tek sekme sınırı, aynı origin kısıtlaması. Java/Selenium dünyasında alışık olduğun \"tam izolasyon\" Cypress'te yoktur.",
      "en": "Cypress runs test code directly in the browser's JavaScript run-loop; Selenium and Playwright manage the browser \"remotely\" from a separate process. Advantage: no network latency, direct DOM access, time-travel debugging. Disadvantage: JavaScript/TypeScript only, single-tab limit, same-origin restriction. The \"full isolation\" you're used to in the Java/Selenium world doesn't exist in Cypress."
    }
  },
  {
    "route": "/java",
    "level": "basic",
    "q": {
      "tr": "Maven'da BUILD FAILURE görüyorsun — ilk hangi adımı atarsın ve neden?",
      "en": "You see BUILD FAILURE in Maven — what is your first step and why?"
    },
    "a": {
      "tr": "İlk iş terminal çıktısında \"Tests run: X, Failures: Y, Errors: Z\" satırını bulmak. Failures sayısı > 0 ise assertion hatası var demektir; yani test çalıştı ama beklenen değerle gerçek değer uyuşmadı. Errors > 0 ise test başlamadan önce bir setup problemi var (örn. driver başlatılamadı, dosya bulunamadı). Surefire-reports klasöründeki XML ya da TXT dosyaları her test için ayrı yığın izini içerir; asıl kök nedeni oradan okursun. CI ortamında bu klasörü artifact olarak sakla ki daha sonra analiz edebilelim.",
      "en": "First, find the \"Tests run: X, Failures: Y, Errors: Z\" line in the terminal output. Failures > 0 means an assertion error — the test ran but expected vs actual values didn't match. Errors > 0 means a setup problem before the test even started (e.g. driver couldn't be created, file not found). The XML or TXT files in target/surefire-reports contain a separate stack trace for each test — read the root cause from there. In CI, save this folder as an artifact for later analysis."
    }
  },
  {
    "route": "/python",
    "level": "intermediate",
    "q": {
      "tr": "Python'da *args ve **kwargs ne işe yarar?",
      "en": "What are *args and **kwargs in Python?"
    },
    "a": {
      "tr": "*args, belirsiz sayıda pozisyonel argüman alır — tuple olarak gelir. **kwargs, belirsiz sayıda keyword argüman alır — dict olarak gelir. def log(*args, **kwargs) hem log(\"msg1\", \"msg2\") hem de log(level=\"INFO\", test=\"login\") çağrılarını kabul eder.",
      "en": "*args accepts a variable number of positional arguments — arrives as a tuple. **kwargs accepts variable keyword arguments — arrives as a dict. def log(*args, **kwargs) can accept both log(\"msg1\", \"msg2\") and log(level=\"INFO\", test=\"login\")."
    }
  },
  {
    "route": "/sql",
    "level": "advanced",
    "q": {
      "tr": "Soru 36: COALESCE ve NULLIF fonksiyonları arasındaki fark nedir?",
      "en": "Q36: What is the difference between COALESCE and NULLIF?"
    },
    "a": {
      "tr": "`COALESCE(val1, val2, ...)` verilen parametreler arasından NULL olmayan ilk değeri döndürür (varsayılan değer sağlamak için kullanılır). `NULLIF(val1, val2)` ise iki değer birbirine eşitse NULL, eşit değilse ilk değeri döndürür (bölme işlemlerinde sıfıra bölme hatasını önlemek için kullanılır).",
      "en": "`COALESCE(val1, val2, ...)` returns the first non-NULL value in the list (used for default fallbacks). `NULLIF(val1, val2)` returns NULL if the two arguments are equal, otherwise it returns the first value (used to prevent division-by-zero errors)."
    }
  },
  {
    "route": "/javascript",
    "level": "basic",
    "q": {
      "tr": "var, let ve const arasındaki farklar nelerdir? Hangisini ne zaman tercih etmeliyiz?",
      "en": "What is the difference between var, let, and const? When should you use which?"
    },
    "a": {
      "tr": "`var` fonksiyon kapsamlıdır (function scope) ve yukarı çekildiğinde (hoisting) `undefined` değeri alır. `let` ve `const` ise blok kapsamlıdır (block scope) ve tanımlanmadan önce erişilmeye çalışıldığında hata verir. `const` tanımlandıktan sonra yeniden atanamaz (read-only), `let` ise yeniden atanabilir. Modern JavaScript'te `var` kullanımı sızıntılara yol açtığı için önerilmez; varsayılan olarak `const`, değeri değişecekse `let` kullanılmalıdır.",
      "en": "`var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and stay in the Temporal Dead Zone (TDZ) before initialization. `const` cannot be reassigned after declaration, while `let` allows reassignment. In modern JS, `var` is avoided to prevent scoping bugs; prefer `const` by default, and use `let` only when you expect variable updates."
    }
  },
  {
    "route": "/typescript",
    "level": "intermediate",
    "q": {
      "tr": "TypeScript'te tuple ne zaman kullanılmalı?",
      "en": "When should you use a tuple in TypeScript?"
    },
    "a": {
      "tr": "Sabit sayıda eleman ve her pozisyonun tipi farklı olduğunda. Örneğin: [string, number, boolean] — name, age, active gibi. Genellikle fonksiyon dönüş değerleri için kullanılır: function useState<T>(init: T): [T, (v: T) => void]. Nesne daha okunabilirse, tuple yerine obje tercih et.",
      "en": "When you have a fixed number of elements and each position has a different type. Example: [string, number, boolean] — like name, age, active. Often used for function return values: function useState<T>(init: T): [T, (v: T) => void]. If an object would be more readable, prefer that over a tuple."
    }
  },
  {
    "route": "/docker",
    "level": "advanced",
    "q": {
      "tr": "500 Selenium testi için Docker kullanarak paralel test çalıştırma kurulumunu nasıl tasarlarsın?",
      "en": "How would you design a parallel test execution setup using Docker for 500 Selenium tests?"
    },
    "a": {
      "tr": "Docker Compose'da Selenium Grid kullan: selenium-hub + birden fazla selenium/node-chrome container. Her Chrome node 4-6 paralel session yönetir. 500 test için: 3 Chrome node × 5 session = 15 paralel test = sıralı 2 saat yerine ~10 dakika. CI sunucu kapasitesine göre Chrome node'larını ölçeklendir: docker compose scale chrome=5. pytest-xdist ile --dist=loadscope kullan. Her node temiz bir browser session alır. Sonuçları kalıcı tutmak için reports dizinini mount et. Testler başlamadan önce node'ların hazır olduğundan emin olmak için healthcheck ekle.",
      "en": "Use Selenium Grid in Docker Compose: selenium-hub + multiple selenium/node-chrome containers. Each Chrome node handles 4-6 parallel sessions. For 500 tests: 3 Chrome nodes × 5 sessions = 15 parallel tests = ~10 min vs 2 hours sequential. Scale Chrome nodes based on CI server capacity: docker compose scale chrome=5. Use pytest-xdist with --dist=loadscope to distribute tests. Each node gets a clean browser session. Mount reports directory to persist results. Add healthchecks to ensure nodes are ready before tests start."
    }
  },
  {
    "route": "/jenkins",
    "level": "basic",
    "q": {
      "tr": "Jenkins nedir ve yazılım geliştirmede neden kullanılır?",
      "en": "What is Jenkins and why is it used in software development?"
    },
    "a": {
      "tr": "Jenkins, Java ile yazılmış açık kaynaklı bir CI/CD otomasyon sunucusudur. Her developer kod push'ladığında Jenkins otomatik olarak build eder, test eder ve opsiyonel olarak deploy eder. Hataları commit'ten dakikalar içinde yakalar, manuel işi azaltır ve her değişiklikte tutarlı kalite sağlar. QA'da Jenkins, test suite'lerimizin yaşadığı ve çalıştığı yerdir — her commit Selenium, pytest veya Playwright testlerimizi otomatik olarak tetikler.",
      "en": "Jenkins is an open-source CI/CD automation server written in Java. Every time a developer pushes code, Jenkins automatically builds, tests, and optionally deploys it. It catches bugs within minutes of committing, reduces manual work, and ensures consistent quality on every change. In QA, Jenkins is where our test suites live and run — every commit triggers our Selenium, pytest, or Playwright tests automatically."
    }
  },
  {
    "route": "/git-github",
    "level": "intermediate",
    "q": {
      "tr": "PR açmadan önce kendi branch’ini main ile güncellemek için hangi akışı tercih edersin?",
      "en": "Before opening a PR, how do you update your branch with main?"
    },
    "a": {
      "tr": "Önce `git fetch origin` çalıştırır, sonra ekip standardına göre `git merge origin/main` veya `git rebase origin/main` kullanırım. Paylaşılmış branch’te rebase yapacaksam çok dikkat ederim çünkü commit hash’leri değişir. Java’da dependency update öncesi testleri çalıştırmak gibi, branch güncellemeden sonra test suite’i tekrar koştururum.",
      "en": "I run `git fetch origin` first, then use either `git merge origin/main` or `git rebase origin/main` depending on team convention. I am careful with rebase on shared branches because commit hashes change. Like running tests after a Java dependency update, I rerun the test suite after updating the branch."
    }
  },
  {
    "route": "/postman",
    "level": "advanced",
    "q": {
      "tr": "Postman'da data-driven API testi nasıl uygulanır?",
      "en": "How do you implement data-driven API testing in Postman?"
    },
    "a": {
      "tr": "Data-driven test, her satırın ayrı bir test iterasyonu olduğu harici CSV veya JSON dosyası kullanır. CSV oluştur: email,password,expectedStatus\\nayse@test.com,dogru_sifre,200\\nyanlish@test.com,kotu_sifre,401. Test scriptlerinde: pm.iterationData.get(\"expectedStatus\"). Collection Runner ile (GUI) CSV dosyasını yükle. Newman CLI ile: newman run collection.json --iteration-data data.csv. 100 ayrı istek olmadan 100 giriş senaryosunu test eder — sınır değer testi ve denklik bölümleme için zorunlu.",
      "en": "Use external CSV/JSON where each row is an iteration. pm.iterationData.get(\"field\") in scripts. Newman: --iteration-data data.csv. Test 100 scenarios without 100 separate requests."
    }
  },
  {
    "route": "/jira",
    "level": "basic",
    "q": {
      "tr": "Yeni katıldığın takımda bug'lar bazen Jira'ya, bazen Slack'e yazılıyor. Takım lideri sana \"sen ne önerirsin\" diyor. Ne cevap verirsin ve önerini neye dayandırırsın?",
      "en": "On the team you just joined, bugs are sometimes written into Jira and sometimes into Slack. The team lead asks what you would recommend. What do you answer and what do you base it on?"
    },
    "a": {
      "tr": "Tek kayıt yerinin Jira olması gerektiğini, Slack'in ise yalnızca haber verme kanalı olarak kalmasını öneririm. Gerekçem üç somut kayıptır: Slack'te yazılan bug aranamaz (üç ay sonra aynı hata döndüğünde hiçbir bağlam bulunmaz), ölçülemez (kaç bug hangi modülden çıktı sorusu cevapsız kalır) ve bağlanamaz (commit ile kayıt arasında iz kalmaz). Öneriyi dayatma olarak değil, bir ay sonra ölçülebilir bir sonuçla getiririm: Slack'te kalan bug'ların ne kadarının kaybolduğunu göstermek, kuralın kendisinden daha ikna edicidir. Geçiş için de düşük sürtünmeli bir yol öneririm — Slack'ten tek tıkla issue oluşturan bir entegrasyon, insanları alışkanlıklarını değiştirmeye zorlamadan kaydı yerine taşır.",
      "en": "I would recommend Jira as the single place of record, with Slack kept only as a notification channel. My reasoning rests on three concrete losses: a bug written in Slack is not searchable (when the same failure returns three months later there is no context), not measurable (the question of how many bugs came from which module stays unanswered), and not linkable (no trace remains between a commit and a record). I would present this not as a mandate but with a measurable outcome a month later: showing how many Slack-only bugs were lost is more persuasive than the rule itself. For the transition I would propose a low-friction path -- an integration that creates an issue from Slack in one click moves the record to the right place without forcing people to change habits."
    }
  }
]

export default INTERVIEW_SHOWCASE
