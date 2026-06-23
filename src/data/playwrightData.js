// playwrightData.js — Playwright tam öğrenme sayfası
// 18 bölüm: Intro, Kurulum, Aksiyonlar, Locator, Wait, Assertions, Test Organizasyonu & Fixtures,
// Page Object Model, iframe/Alert, Dosya/Network, Debugging & Trace, Codegen, Playwright MCP,
// Paralel/CI-CD, Auth & Session, Gerçek Hayat, Hatalar, 50 Mülakat

const s0 = {
  tr: {
    title: '🎭 Playwright Nedir? Neden Kullanılır?',
    blocks: [
      {
        type: 'simple-box', emoji: '🎮',
        content: 'Playwright\'ı bir oyun kumandasına benzetin. Siz düğmelere basarsınız (test kodu), kumanda (Playwright) sinyali iletir, ekrandaki oyun karakteri (tarayıcı) harekete geçer. Selenium da aynı işi yapıyor ama Playwright daha "akıllı" bir kumanda — beklemenize gerek kalmadan yüklenmeyi bekliyor.',
      },
      {
        type: 'text',
        content: 'Playwright, Microsoft tarafından 2020\'de piyasaya sürülen açık kaynaklı tarayıcı otomasyon kütüphanesidir. Chromium (Chrome/Edge), Firefox ve WebKit (Safari) motorlarını TEK bir API ile kontrol eder. Java\'da Selenium WebDriver kullandıysanız, Playwright\'ı "Selenium\'un modern, daha güçlü kuzeni" olarak düşünebilirsiniz.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Java\'da ChromeDriver driver = new ChromeDriver() yazıp driver.findElement(By.id("x")).click() yapıyordun. Playwright\'ta browser = playwright.chromium().launch() yazıyorsun, page.locator("#x").click() yapıyorsun. Kavramlar birebir aynı, sözdizimi daha kısa ve "auto-wait" sayesinde explicit wait yazmak zorunda kalmıyorsun.',
      },
      {
        type: 'heading', text: 'Playwright vs Selenium — Ana Farklar',
      },
      {
        type: 'table',
        headers: ['Özellik', 'Selenium', 'Playwright'],
        rows: [
          ['Çıkış yılı', '2004', '2020'],
          ['Geliştirici', 'ThoughtWorks → Apache', 'Microsoft'],
          ['Tarayıcı desteği', 'Chrome, Firefox, Safari, Edge, IE', 'Chromium, Firefox, WebKit'],
          ['Dil desteği', 'Java, Python, C#, JS, Ruby, Kotlin', 'TypeScript, JavaScript, Python, Java, C#'],
          ['Auto-wait', '❌ Manuel wait yazılır', '✅ Her aksiyon öncesi otomatik bekler'],
          ['Network mock', '❌ Ek kütüphane gerekir', '✅ page.route() ile built-in'],
          ['iframe', 'switchTo().frame() → karmaşık', 'frameLocator() → tek satır'],
          ['Multiple tabs', '❌ Zor', '✅ context.newPage() ile kolay'],
          ['Test runner', 'TestNG / JUnit (Java)', '@playwright/test (built-in)'],
          ['Screenshot/video', '❌ Ek kütüphane', '✅ Built-in'],
          ['Mobile emulation', '❌ Appium gerekir', '✅ devices ile emulation'],
          ['Headless mode', '✅ Chrome headless', '✅ Tüm browserlar headless'],
          ['Paralel test', '❌ Grid gerekir', '✅ Built-in workers'],
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Playwright Çalışma Mimarisi',
        steps: [
          { num: 1, label: 'Test Kodu', desc: 'TS / Java / Python', highlight: true },
          { num: 2, label: 'Playwright', desc: 'API Katmanı', highlight: false },
          { num: 3, label: 'CDP / WebSocket', desc: 'Protocol', highlight: false },
          { num: 4, label: 'Browser', desc: 'Chromium / FF / WebKit', highlight: true },
          { num: 5, label: 'Sonuç', desc: 'Pass / Fail + Report', highlight: false },
        ],
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '⚡', label: 'Auto-Wait', desc: 'Eleman tıklanabilir olana kadar otomatik bekler. Stale element hatası yok.' },
          { icon: '🌐', label: 'Multi-Browser', desc: 'Chromium, Firefox, WebKit — aynı test 3 motorda çalışır.' },
          { icon: '🔗', label: 'Network Mock', desc: 'page.route() ile API yanıtlarını sahte veriyle değiştirebilirsin.' },
          { icon: '📸', label: 'Visual Test', desc: 'Screenshot karşılaştırması ve video kayıt built-in gelir.' },
          { icon: '📱', label: 'Mobile Emulation', desc: 'devices["iPhone 13"] ile gerçek mobil görünüm simülasyonu.' },
          { icon: '🔀', label: 'Paralel', desc: 'Workers ile testler aynı anda birden fazla tarayıcıda çalışır.' },
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta "auto-wait" ne anlama gelir?', en: 'What does "auto-wait" mean in Playwright?' },
        options: [
          { id: 'a', text: 'Sadece sayfa yüklenirken bekler' },
          { id: 'b', text: 'Her aksiyon öncesinde element hazır olana kadar otomatik bekler' },
          { id: 'c', text: 'Thread.sleep() gibi sabit süre bekler' },
          { id: 'd', text: 'Sadece network isteklerini bekler' },
        ],
        correct: 'b',
        explanation: { tr: 'Auto-wait: click(), fill(), type() gibi her aksiyondan önce Playwright elementi otomatik olarak "görünür", "tıklanabilir" ve "stabil" olana kadar bekler. Selenium\'da bunu WebDriverWait ile manuel yazman gerekirdi.', en: 'Auto-wait means before every action like click(), fill(), type(), Playwright automatically waits for the element to be visible, enabled, and stable. In Selenium you had to write this manually with WebDriverWait.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ın sağladığı \"aksiyon öncesi bekleme\" (auto-wait) mekanizmasının temel amacı nedir?",
            "en": "What is the main purpose of the \"auto-wait\" mechanism provided by Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Ağ trafiğinin tamamlanmasını garantilemek",
                        "en": "To ensure network traffic is complete"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "İşlem yapılmadan önce elementin etkileşime hazır olmasını sağlamak",
                        "en": "To ensure the element is actionable before performing an interaction"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Kodun çalışma hızını yavaşlatarak senkronizasyon sağlamak",
                        "en": "To slow down execution speed for synchronization"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Sadece DOM yapısının yüklenmesini beklemek",
                        "en": "To wait only for the DOM structure to load"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Auto-wait, Playwright'ın bir element üzerinde aksiyon almadan önce o elementin görünür, aktif ve tıklanabilir durumda olup olmadığını kontrol etme özelliğidir. Bu sayede 'element not found' veya 'element not clickable' hatalarının çoğu otomatik olarak engellenir.",
            "en": "Auto-wait is Playwright's feature to verify if an element is visible, stable, and enabled before interacting with it. This automatically prevents many common 'element not found' or 'element not clickable' errors."
      }
}
},
    ],
  },
  en: {
    title: '🎭 What is Playwright? Why Use It?',
    blocks: [
      {
        type: 'simple-box', emoji: '🎮',
        content: 'Think of Playwright like a game controller. You press buttons (test code), the controller (Playwright) sends the signal, and the game character on screen (browser) reacts. Selenium does the same thing but Playwright is a "smarter" controller — it automatically waits for things to load without you having to ask.',
      },
      {
        type: 'text',
        content: 'Playwright is an open-source browser automation library released by Microsoft in 2020. It controls Chromium (Chrome/Edge), Firefox, and WebKit (Safari) engines with a SINGLE API. If you\'ve used Selenium WebDriver in Java, think of Playwright as "Selenium\'s modern, more powerful cousin".',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Java you wrote ChromeDriver driver = new ChromeDriver() and driver.findElement(By.id("x")).click(). In Playwright you write browser = playwright.chromium().launch() and page.locator("#x").click(). The concepts are identical — the syntax is shorter and auto-wait means you rarely need explicit waits.',
      },
      { type: 'heading', text: 'Playwright vs Selenium — Key Differences' },
      {
        type: 'table',
        headers: ['Feature', 'Selenium', 'Playwright'],
        rows: [
          ['Released', '2004', '2020'],
          ['Developer', 'ThoughtWorks → Apache', 'Microsoft'],
          ['Browser support', 'Chrome, Firefox, Safari, Edge, IE', 'Chromium, Firefox, WebKit'],
          ['Languages', 'Java, Python, C#, JS, Ruby, Kotlin', 'TypeScript, JavaScript, Python, Java, C#'],
          ['Auto-wait', '❌ Manual waits required', '✅ Waits automatically before every action'],
          ['Network mock', '❌ Needs extra library', '✅ Built-in page.route()'],
          ['iframe', 'switchTo().frame() → complex', 'frameLocator() → one line'],
          ['Multiple tabs', '❌ Difficult', '✅ Easy with context.newPage()'],
          ['Test runner', 'TestNG / JUnit (Java)', '@playwright/test (built-in)'],
          ['Screenshot/video', '❌ Extra library', '✅ Built-in'],
          ['Mobile emulation', '❌ Needs Appium', '✅ Built-in devices'],
          ['Parallel tests', '❌ Needs Grid', '✅ Built-in workers'],
        ],
      },
      {
        type: 'visual', variant: 'flow', title: 'Playwright Architecture',
        steps: [
          { num: 1, label: 'Test Code', desc: 'TS / Java / Python', highlight: true },
          { num: 2, label: 'Playwright', desc: 'API Layer', highlight: false },
          { num: 3, label: 'CDP / WebSocket', desc: 'Protocol', highlight: false },
          { num: 4, label: 'Browser', desc: 'Chromium / FF / WebKit', highlight: true },
          { num: 5, label: 'Result', desc: 'Pass / Fail + Report', highlight: false },
        ],
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '⚡', label: 'Auto-Wait', desc: 'Automatically waits until element is clickable. No more stale element errors.' },
          { icon: '🌐', label: 'Multi-Browser', desc: 'Chromium, Firefox, WebKit — same test runs on all 3 engines.' },
          { icon: '🔗', label: 'Network Mock', desc: 'page.route() lets you replace real API responses with fake data.' },
          { icon: '📸', label: 'Visual Test', desc: 'Screenshot comparison and video recording are built-in.' },
          { icon: '📱', label: 'Mobile Emulation', desc: 'devices["iPhone 13"] simulates real mobile viewport and touch.' },
          { icon: '🔀', label: 'Parallel', desc: 'Workers run tests simultaneously across multiple browsers.' },
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta "auto-wait" ne anlama gelir?', en: 'What does "auto-wait" mean in Playwright?' },
        options: [
          { id: 'a', text: 'Only waits while the page loads' },
          { id: 'b', text: 'Automatically waits before each action until the element is ready' },
          { id: 'c', text: 'Waits a fixed time like Thread.sleep()' },
          { id: 'd', text: 'Only waits for network requests' },
        ],
        correct: 'b',
        explanation: { tr: 'Auto-wait: her aksiyondan önce Playwright elementi otomatik bekler.', en: 'Auto-wait means Playwright automatically waits for elements to be visible, enabled and stable before every action like click() or fill().' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta bir element ile etkileşime girmeden önce otomatik olarak yapılan kontrollerden biri değildir?",
            "en": "Which of the following is NOT one of the checks automatically performed by Playwright before interacting with an element?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Elementin görünür olması",
                        "en": "Visibility of the element"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Elementin tıklanabilir olması",
                        "en": "Clickability of the element"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Elementin sabit (hareketsiz) olması",
                        "en": "Stability of the element"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Elementin arka plan renginin değişmesi",
                        "en": "Change in element background color"
                  }
            }
      ],
      "correct": "d",
      "explanation": {
            "tr": "Playwright, aksiyon öncesi elementin görünürlüğünü, tıklanabilirliğini ve kararlılığını (stabilite) kontrol eder, ancak CSS özellikleri (renk değişimi gibi) test edilmez.",
            "en": "Playwright checks visibility, clickability, and stability before actions, but does not perform checks on CSS properties like background color changes."
      }
}
},
    ],
  },
}

const s1 = {
  tr: {
    title: '⚙️ Kurulum — TypeScript · Java · Python',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'Playwright\'ı kurmak, bir IKEA dolabı kurmak gibi. TypeScript için tek bir komut her şeyi (tarayıcılar dahil) indirir. Java için Maven pom.xml\'e dependency eklersin. Python için pip install + playwright install — iki adım, bitti.',
      },
      { type: 'heading', text: '1️⃣ TypeScript / JavaScript Kurulumu' },
      {
        type: 'callout', color: 'blue', emoji: '📋',
        title: 'Ön Koşul',
        content: 'Node.js 18+ yüklü olmalı. Kontrol: node --version',
      },
      {
        type: 'installation',
        title: { tr: 'TypeScript — Otomatik Kurulum (Önerilen)', en: 'TypeScript — Auto Setup (Recommended)' },
        steps: [
          { cmd: 'npm init playwright@latest', explanation: { tr: 'Playwright installer başlar. Dil (TS/JS), klasör adı, CI kurulumu sorar. HEPSİNE ENTER basabilirsin — varsayılanlar zaten doğru.', en: 'Starts the Playwright installer. Asks language (TS/JS), folder name, CI setup. Press ENTER for all — defaults are correct.' } },
          { cmd: 'npx playwright test', explanation: { tr: 'Örnek testleri çalıştırır. 3 tarayıcıda toplam 6 test — hepsi PASS olmalı.', en: 'Runs the example tests. 6 tests across 3 browsers — all should PASS.' } },
          { cmd: 'npx playwright show-report', explanation: { tr: 'HTML raporunu tarayıcıda açar. Geçen/kalan testler, ekran görüntüleri, video.', en: 'Opens the HTML report in the browser. Passed/failed tests, screenshots, video.' } },
        ],
      },
      {
        type: 'file-tree',
        title: { tr: 'Oluşturulan Proje Yapısı', en: 'Generated Project Structure' },
        tree: `my-project/
├── tests/
│   └── example.spec.ts      ← Örnek test dosyası
├── tests-examples/
│   └── demo-todo-app.spec.ts
├── playwright.config.ts     ← Tarayıcı, timeout, baseURL ayarları
├── package.json
└── node_modules/`,
        note: { tr: 'playwright.config.ts en önemli dosya — baseURL, retries, workers burada ayarlanır.', en: 'playwright.config.ts is the key file — baseURL, retries, workers are configured here.' },
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// playwright.config.ts — temel ayarlar
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // test dosyaları nerede
  timeout: 30_000,             // her test için max 30 saniye
  retries: 1,                  // başarısız olunca 1 kez tekrar dene
  workers: 4,                  // aynı anda kaç test çalışsın
  reporter: 'html',            // HTML rapor oluştur

  use: {
    baseURL: 'https://example.com',   // tüm page.goto('/login') buna eklenir
    headless: true,                    // tarayıcı penceresi açılmasın
    screenshot: 'only-on-failure',    // sadece hata olunca screenshot al
    video: 'retain-on-failure',       // sadece hata olunca video kaydet
    trace: 'on-first-retry',          // hata ayıklama için trace
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
});`,
      },
      { type: 'heading', text: '2️⃣ Java (Maven) Kurulumu' },
      {
        type: 'callout', color: 'orange', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Selenium\'da pom.xml\'e selenium-java dependency ekliyordun. Playwright\'ta da aynı — sadece groupId "com.microsoft.playwright" oluyor. TestNG veya JUnit kullanmaya devam edebilirsin.',
      },
      {
        type: 'code', language: 'XML (pom.xml)',
        code: `<!-- pom.xml — Maven bağımlılıkları -->
<dependencies>
  <!-- Playwright Java API -->
  <dependency>
    <groupId>com.microsoft.playwright</groupId>
    <artifactId>playwright</artifactId>
    <version>1.45.0</version>  <!-- en güncel sürüm için mvnrepository.com -->
  </dependency>

  <!-- JUnit 5 (isteğe bağlı ama önerilir) -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.1.2</version>
    </plugin>
  </plugins>
</build>`,
      },
      {
        type: 'installation',
        title: { tr: 'Java — Tarayıcıları İndir', en: 'Java — Download Browsers' },
        steps: [
          { cmd: 'mvn dependency:resolve', explanation: { tr: 'Maven bağımlılıkları indirir. İlk seferinde birkaç dakika sürebilir.', en: 'Maven downloads dependencies. May take a few minutes on first run.' } },
          { cmd: 'mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"', explanation: { tr: 'Playwright tarayıcılarını indirir (Chromium, Firefox, WebKit). Sadece 1 kez çalıştırman yeterli.', en: 'Downloads Playwright browsers (Chromium, Firefox, WebKit). Only needs to run once.' } },
        ],
      },
      {
        type: 'code', language: 'Java',
        code: `// İlk Java Playwright testi — HelloPlaywright.java
import com.microsoft.playwright.*;

public class HelloPlaywright {
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {          // Playwright başlat
            Browser browser = playwright.chromium().launch();        // Chrome aç
            Page page = browser.newPage();                           // Yeni sayfa
            page.navigate("https://playwright.dev");                 // URL'ye git
            System.out.println(page.title());                        // Sayfa başlığını yazdır
            browser.close();                                         // Tarayıcıyı kapat
        }
        // try-with-resources: Java'daki AutoCloseable gibi — otomatik kapatır
    }
}`,
      },
      { type: 'heading', text: '3️⃣ Python Kurulumu' },
      {
        type: 'installation',
        title: { tr: 'Python — pip ile Kurulum', en: 'Python — Install with pip' },
        steps: [
          { cmd: 'pip install playwright', explanation: { tr: 'Playwright Python kütüphanesini yükler. Java\'da pom.xml, Python\'da pip — aynı mantık.', en: 'Installs the Playwright Python library. In Java it\'s pom.xml, in Python it\'s pip — same concept.' } },
          { cmd: 'playwright install', explanation: { tr: 'Tarayıcıları indirir. Bu adımı atlama! Tarayıcısız Playwright çalışmaz.', en: 'Downloads the browsers. Don\'t skip this! Playwright won\'t work without browsers.' } },
          { cmd: 'playwright install --with-deps', explanation: { tr: 'Linux\'ta sistem bağımlılıklarını da yükler. CI/CD ortamlarında zorunlu.', en: 'Also installs system dependencies on Linux. Required in CI/CD environments.' } },
          { cmd: 'python -m pytest --version', explanation: { tr: 'pytest kurulu olduğunu doğrula. Yoksa: pip install pytest pytest-playwright', en: 'Verify pytest is installed. If not: pip install pytest pytest-playwright' } },
        ],
      },
      {
        type: 'code', language: 'Python',
        code: `# İlk Python Playwright testi — test_hello.py
from playwright.sync_api import sync_playwright   # sync API import et

def test_playwright_hello():
    with sync_playwright() as p:                   # context manager — Java'daki try-with-resources
        browser = p.chromium.launch()              # Chrome aç (headless varsayılan)
        page = browser.new_page()                  # yeni sayfa oluştur
        page.goto("https://playwright.dev")        # URL'ye git
        assert "Playwright" in page.title()        # başlıkta "Playwright" var mı
        browser.close()                            # tarayıcıyı kapat

# pytest ile çalıştır:
# pytest test_hello.py -v`,
      },
      {
        type: 'code', language: 'Python',
        code: `# pytest-playwright ile daha kısa versiyon — fixture kullanır
import pytest
from playwright.sync_api import Page, expect

def test_playwright_hello(page: Page):   # 'page' fixture — pytest-playwright sağlar
    page.goto("https://playwright.dev")  # URL'ye git
    expect(page).to_have_title("Fast and reliable end-to-end testing for modern web apps | Playwright")
    # NOT: pytest-playwright otomatik browser aç/kapat yapar — sen sadece test yaz`,
      },
      {
        type: 'table',
        headers: ['Komut / Kavram', 'Java', 'TypeScript', 'Python'],
        rows: [
          ['Import', 'import com.microsoft.playwright.*', 'import { chromium } from "playwright"', 'from playwright.sync_api import sync_playwright'],
          ['Playwright başlat', 'Playwright.create()', 'chromium.launch()', 'p.chromium.launch()'],
          ['Yeni sayfa', 'browser.newPage()', 'await browser.newPage()', 'browser.new_page()'],
          ['URL\'ye git', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Click', 'page.locator("sel").click()', 'await page.locator("sel").click()', 'page.locator("sel").click()'],
          ['Metin yaz', 'page.locator("sel").fill("text")', 'await page.locator("sel").fill("text")', 'page.locator("sel").fill("text")'],
          ['Kapat', 'browser.close()', 'await browser.close()', 'browser.close()'],
          ['Async?', 'HAYIR — sync', 'EVET — async/await zorunlu', 'HAYIR — sync_api ile sync'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Python\'da Playwright\'ı yükledikten sonra tarayıcıları indirmek için hangi komut kullanılır?', en: 'After installing Playwright in Python, which command downloads the browsers?' },
        options: [
          { id: 'a', text: 'pip install browsers' },
          { id: 'b', text: 'playwright install' },
          { id: 'c', text: 'npm install chromium' },
          { id: 'd', text: 'python download_browsers.py' },
        ],
        correct: 'b',
        explanation: { tr: '"playwright install" komutu Chromium, Firefox ve WebKit tarayıcılarını sisteme indirir. Bu adımı atlarsan "Browser is not installed" hatası alırsın.', en: '"playwright install" downloads Chromium, Firefox, and WebKit to your system. Skip this and you\'ll get "Browser is not installed" errors.' },
      
        retryQuestion: {
      "question": {
            "tr": "Terminal üzerinde 'playwright install' komutunu çalıştırmazsak ne olur?",
            "en": "What happens if we do not run the 'playwright install' command in the terminal?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Kütüphane Python içine kurulmaz",
                        "en": "The library will not be installed into Python"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Tarayıcı motorları eksik olduğu için testler başarısız olur",
                        "en": "Tests will fail because browser engines are missing"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Sadece Chromium tarayıcısı çalışmaz",
                        "en": "Only the Chromium browser will not work"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Kod editörü Playwright komutlarını tanımaz",
                        "en": "The code editor will not recognize Playwright commands"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Playwright'ı 'pip install' ile kursanız bile, tarayıcıların çalışabilmesi için 'playwright install' komutuyla gerekli olan Chromium, Firefox ve WebKit binary dosyalarının yerel dizine indirilmesi gerekir.",
            "en": "Even if you install the Playwright package with 'pip', you must run 'playwright install' to download the necessary binary files for Chromium, Firefox, and WebKit for the tests to execute."
      }
}
},
    ],
  },
  en: {
    title: '⚙️ Installation — TypeScript · Java · Python',
    blocks: [
      {
        type: 'simple-box', emoji: '🏗️',
        content: 'Installing Playwright is like assembling IKEA furniture. For TypeScript, one command downloads everything (browsers included). For Java, add a dependency to pom.xml. For Python, pip install + playwright install — two steps, done.',
      },
      { type: 'heading', text: '1️⃣ TypeScript / JavaScript Setup' },
      {
        type: 'callout', color: 'blue', emoji: '📋',
        title: 'Prerequisite',
        content: 'Node.js 18+ must be installed. Check: node --version',
      },
      {
        type: 'installation',
        title: { tr: 'TypeScript — Otomatik Kurulum (Önerilen)', en: 'TypeScript — Auto Setup (Recommended)' },
        steps: [
          { cmd: 'npm init playwright@latest', explanation: { tr: 'Playwright installer başlar.', en: 'Starts the Playwright installer. Asks language (TS/JS), folder name, CI setup. Press ENTER for all — defaults are correct.' } },
          { cmd: 'npx playwright test', explanation: { tr: 'Örnek testleri çalıştırır.', en: 'Runs the example tests. 6 tests across 3 browsers — all should PASS.' } },
          { cmd: 'npx playwright show-report', explanation: { tr: 'HTML raporunu açar.', en: 'Opens the HTML report in the browser.' } },
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// playwright.config.ts — basic setup
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // where test files live
  timeout: 30_000,             // max 30 seconds per test
  retries: 1,                  // retry once on failure
  workers: 4,                  // how many tests run simultaneously
  reporter: 'html',            // generate HTML report

  use: {
    baseURL: 'https://example.com',   // page.goto('/login') resolves against this
    headless: true,                    // no browser window
    screenshot: 'only-on-failure',    // screenshot only on failure
    video: 'retain-on-failure',       // video only on failure
    trace: 'on-first-retry',          // trace for debugging
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
});`,
      },
      { type: 'heading', text: '2️⃣ Java (Maven) Setup' },
      {
        type: 'callout', color: 'orange', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Selenium you added selenium-java to pom.xml. Same here — the groupId is "com.microsoft.playwright". You can keep using TestNG or JUnit.',
      },
      {
        type: 'code', language: 'Java',
        code: `// First Java Playwright test
import com.microsoft.playwright.*;

public class HelloPlaywright {
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {   // start Playwright
            Browser browser = playwright.chromium().launch(); // open Chrome
            Page page = browser.newPage();                    // new tab
            page.navigate("https://playwright.dev");          // go to URL
            System.out.println(page.title());                 // print page title
            browser.close();                                  // close browser
        }
        // try-with-resources: like AutoCloseable in Java — auto-closes
    }
}`,
      },
      { type: 'heading', text: '3️⃣ Python Setup' },
      {
        type: 'installation',
        title: { tr: 'Python — pip ile Kurulum', en: 'Python — Install with pip' },
        steps: [
          { cmd: 'pip install playwright', explanation: { tr: 'Playwright Python kütüphanesini yükler.', en: 'Installs the Playwright Python library.' } },
          { cmd: 'playwright install', explanation: { tr: 'Tarayıcıları indirir.', en: 'Downloads the browsers. Don\'t skip this!' } },
          { cmd: 'playwright install --with-deps', explanation: { tr: 'Linux sistem bağımlılıkları.', en: 'Also installs system dependencies on Linux. Required in CI/CD.' } },
        ],
      },
      {
        type: 'code', language: 'Python',
        code: `# First Python Playwright test — test_hello.py
from playwright.sync_api import Page, expect

def test_playwright_hello(page: Page):   # 'page' fixture from pytest-playwright
    page.goto("https://playwright.dev")  # go to URL
    expect(page).to_have_title("Fast and reliable end-to-end testing for modern web apps | Playwright")
    # pytest-playwright handles browser open/close automatically`,
      },
      {
        type: 'table',
        headers: ['Command / Concept', 'Java', 'TypeScript', 'Python'],
        rows: [
          ['Import', 'import com.microsoft.playwright.*', 'import { chromium } from "playwright"', 'from playwright.sync_api import sync_playwright'],
          ['Launch browser', 'Playwright.create()', 'chromium.launch()', 'p.chromium.launch()'],
          ['New page', 'browser.newPage()', 'await browser.newPage()', 'browser.new_page()'],
          ['Navigate', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Click', 'page.locator("sel").click()', 'await page.locator("sel").click()', 'page.locator("sel").click()'],
          ['Fill text', 'page.locator("sel").fill("text")', 'await page.locator("sel").fill("text")', 'page.locator("sel").fill("text")'],
          ['Close', 'browser.close()', 'await browser.close()', 'browser.close()'],
          ['Async?', 'NO — sync', 'YES — async/await required', 'NO — sync_api is sync'],
        ],
      },
      {
        type: 'quiz',
        question: { tr: 'Python\'da Playwright\'ı yükledikten sonra tarayıcıları indirmek için hangi komut kullanılır?', en: 'After installing Playwright in Python, which command downloads the browsers?' },
        options: [
          { id: 'a', text: 'pip install browsers' },
          { id: 'b', text: 'playwright install' },
          { id: 'c', text: 'npm install chromium' },
          { id: 'd', text: 'python download_browsers.py' },
        ],
        correct: 'b',
        explanation: { tr: '"playwright install" Chromium, Firefox ve WebKit indirir.', en: '"playwright install" downloads Chromium, Firefox, and WebKit browsers to your system.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Playwright kurulumundan sonra tarayıcı ikili dosyalarını (binaries) sisteme eklemek için kullanılan CLI komutu hangisidir?",
            "en": "Which CLI command is used to add the browser binaries to your system after installing Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "playwright setup"
            },
            {
                  "id": "b",
                  "text": "playwright install"
            },
            {
                  "id": "c",
                  "text": "pip setup-browsers"
            },
            {
                  "id": "d",
                  "text": "playwright download"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Playwright kütüphanesi yüklendikten sonra 'playwright install' komutu, testlerin çalışması için gerekli olan tarayıcı sürücülerini (Chromium, Firefox, WebKit) varsayılan konumlara indirir.",
            "en": "After the Playwright library is installed, the 'playwright install' command downloads the necessary browser binaries (Chromium, Firefox, WebKit) required for tests to run."
      }
}
},
    ],
  },
}

// Placeholder sections — sonraki adımlarda doldurulacak
const s2 = {
  tr: {
    title: '🖱️ Temel Aksiyonlar — Selenium ile Karşılaştırma',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'Selenium\'da her aksiyon için "önce elementi bul, sonra aksiyon yap" iki adım vardı. Playwright\'ta locator bir kez tanımlanır, aksiyon doğrudan üstüne çağrılır — ve element kendiliğinden hazır olana kadar bekler.',
      },
      { type: 'heading', text: 'Tüm Aksiyonlar — 3 Dil Karşılaştırması' },
      {
        type: 'table',
        headers: ['Aksiyon', 'Selenium (Java)', 'Playwright Java', 'Playwright TypeScript', 'Playwright Python'],
        rows: [
          ['Tıklama', 'driver.findElement(By.id("x")).click()', 'page.locator("#x").click()', 'await page.locator("#x").click()', 'page.locator("#x").click()'],
          ['Metin yazma', 'element.sendKeys("text")', 'page.locator("#x").fill("text")', 'await page.locator("#x").fill("text")', 'page.locator("#x").fill("text")'],
          ['Temizle+yaz', 'element.clear(); element.sendKeys("t")', 'page.locator("#x").fill("t") ← clear dahil', 'await page.locator("#x").fill("t")', 'page.locator("#x").fill("t")'],
          ['URL\'ye git', 'driver.get("url")', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Geri git', 'driver.navigate().back()', 'page.goBack()', 'await page.goBack()', 'page.go_back()'],
          ['Yenile', 'driver.navigate().refresh()', 'page.reload()', 'await page.reload()', 'page.reload()'],
          ['Metin al', 'element.getText()', 'page.locator("#x").innerText()', 'await page.locator("#x").innerText()', 'page.locator("#x").inner_text()'],
          ['Attribute al', 'element.getAttribute("href")', 'page.locator("#x").getAttribute("href")', 'await page.locator("#x").getAttribute("href")', 'page.locator("#x").get_attribute("href")'],
          ['Hover', 'new Actions(driver).moveToElement(el).perform()', 'page.locator("#x").hover()', 'await page.locator("#x").hover()', 'page.locator("#x").hover()'],
          ['Çift tıklama', 'new Actions(driver).doubleClick(el).perform()', 'page.locator("#x").dblclick()', 'await page.locator("#x").dblclick()', 'page.locator("#x").dblclick()'],
          ['Sağ tıklama', 'new Actions(driver).contextClick(el).perform()', 'page.locator("#x").click({button:"right"})', 'await page.locator("#x").click({button:"right"})', 'page.locator("#x").click(button="right")'],
          ['Tuşa bas', 'element.sendKeys(Keys.ENTER)', 'page.locator("#x").press("Enter")', 'await page.locator("#x").press("Enter")', 'page.locator("#x").press("Enter")'],
          ['Checkbox seç', 'if(!el.isSelected()) el.click()', 'page.locator("#x").check()', 'await page.locator("#x").check()', 'page.locator("#x").check()'],
          ['Dropdown seç', 'new Select(el).selectByValue("v")', 'page.locator("select").selectOption("v")', 'await page.locator("select").selectOption("v")', 'page.locator("select").select_option("v")'],
          ['Screenshot', 'TakesScreenshot + FileUtils', 'page.screenshot({path:"s.png"})', 'await page.screenshot({path:"s.png"})', 'page.screenshot(path="s.png")'],
          ['Sayfa başlığı', 'driver.getTitle()', 'page.title()', 'await page.title()', 'page.title()'],
          ['Mevcut URL', 'driver.getCurrentUrl()', 'page.url()', 'page.url()', 'page.url'],
          ['Görünür mü?', 'element.isDisplayed()', 'page.locator("#x").isVisible()', 'await page.locator("#x").isVisible()', 'page.locator("#x").is_visible()'],
          ['Aktif mi?', 'element.isEnabled()', 'page.locator("#x").isEnabled()', 'await page.locator("#x").isEnabled()', 'page.locator("#x").is_enabled()'],
          ['JS çalıştır', 'js.executeScript("return...")', 'page.evaluate("return...")', 'await page.evaluate("return...")', 'page.evaluate("return...")'],
          ['Scroll et', 'js.executeScript("window.scrollBy(0,500)")', 'page.locator("#x").scrollIntoViewIfNeeded()', 'await page.locator("#x").scrollIntoViewIfNeeded()', 'page.locator("#x").scroll_into_view_if_needed()'],
          ['Drag & Drop', 'Actions.dragAndDrop(src,dst).perform()', 'page.locator("#src").dragTo(page.locator("#dst"))', 'await page.locator("#src").dragTo(page.locator("#dst"))', 'page.locator("#src").drag_to(page.locator("#dst"))'],
        ],
      },
      { type: 'heading', text: 'Detaylı Kod Örnekleri' },
      {
        type: 'code', language: 'TypeScript',
        code: `// test_basic_actions.spec.ts — Temel aksiyonlar
import { test, expect } from '@playwright/test';

test('temel aksiyon örnekleri', async ({ page }) => {
  await page.goto('https://automationexercise.com/login'); // URL'ye git

  // --- FILL (sendKeys'in Playwright karşılığı) ---
  await page.locator('#email').fill('test@example.com');   // email yaz
  await page.locator('#password').fill('secretpass');       // şifre yaz
  await page.locator('[data-qa="login-button"]').click();  // giriş yap

  // --- METİN OKUMA ---
  const welcomeText = await page.locator('.logged-in').innerText(); // metin al
  console.log(welcomeText);                                // ekrana yazdır

  // --- HOVER ---
  await page.locator('#header .nav-link').hover();         // menüye hover

  // --- DROPDOWN ---
  await page.locator('#sort-by').selectOption('price-asc'); // dropdown seç

  // --- CHECKBOX ---
  await page.locator('#newsletter').check();               // checkbox işaretle
  await page.locator('#newsletter').uncheck();             // işareti kaldır

  // --- SCREENSHOT ---
  await page.screenshot({ path: 'evidence.png', fullPage: true }); // screenshot

  // --- ASSERTION ---
  await expect(page).toHaveURL(/dashboard/);              // URL doğrula
  await expect(page.locator('h1')).toHaveText('Welcome'); // metin doğrula
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// BasicActionsTest.java — Java Playwright
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.SelectOption;
import org.junit.jupiter.api.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class BasicActionsTest {
    static Playwright playwright;
    static Browser browser;
    Page page;

    @BeforeAll
    static void launchBrowser() {
        playwright = Playwright.create();                    // Playwright başlat
        browser = playwright.chromium().launch(             // Chrome aç
            new BrowserType.LaunchOptions().setHeadless(false)
        );
    }

    @BeforeEach
    void createPage() {
        page = browser.newPage();                           // her test için yeni sayfa
    }

    @Test
    void testBasicActions() {
        page.navigate("https://automationexercise.com/login"); // URL'ye git

        // FILL — Selenium'daki sendKeys
        page.locator("#email").fill("test@example.com");    // email yaz
        page.locator("#password").fill("secretpass");       // şifre yaz
        page.locator("[data-qa='login-button']").click();   // butona tıkla

        // METİN OKUMA
        String welcome = page.locator(".logged-in").innerText(); // metin al
        System.out.println(welcome);

        // ASSERTION
        assertThat(page).hasURL(Pattern.compile("dashboard")); // URL doğrula
        assertThat(page.locator("h1")).hasText("Welcome");     // metin doğrula

        // SCREENSHOT
        page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("evidence.png")));
    }

    @AfterEach
    void closePage() { page.close(); }                     // sayfayı kapat

    @AfterAll
    static void closeBrowser() {
        browser.close();                                    // tarayıcıyı kapat
        playwright.close();                                 // Playwright'ı kapat
    }
}`,
      },
      {
        type: 'code', language: 'Python',
        code: `# test_basic_actions.py — Python Playwright
import pytest
from playwright.sync_api import Page, expect

def test_basic_actions(page: Page):
    page.goto("https://automationexercise.com/login")   # URL'ye git

    # FILL — Python'da sendKeys yok, fill() kullan
    page.locator("#email").fill("test@example.com")     # email yaz
    page.locator("#password").fill("secretpass")        # şifre yaz
    page.locator("[data-qa='login-button']").click()    # tıkla

    # METİN OKUMA
    welcome = page.locator(".logged-in").inner_text()   # Python'da snake_case
    print(welcome)

    # HOVER
    page.locator("#header .nav-link").hover()           # hover

    # DROPDOWN
    page.locator("#sort-by").select_option("price-asc") # dropdown seç (snake_case!)

    # KEYBOARD
    page.locator("#search").press("Enter")             # Enter tuşuna bas

    # ASSERTION
    expect(page).to_have_url(re.compile("dashboard"))  # URL kontrol
    expect(page.locator("h1")).to_have_text("Welcome") # metin kontrol

    # SCREENSHOT
    page.screenshot(path="evidence.png", full_page=True)`,
      },
      {
        type: 'callout', color: 'green', emoji: '💡',
        title: 'Önemli Fark: fill() vs type()',
        content: 'fill() — Önce alanı temizler, sonra yazar. Selenium\'daki clear() + sendKeys() kombinasyonu. type() — Temizlemez, karakterleri tek tek yazar (klavyede gerçekten yazmak gibi). Çoğu durumda fill() kullanın.',
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir input alanını önce temizleyip sonra metin yazmak için hangi metod kullanılır?', en: 'Which method in Playwright clears an input field and then types text?' },
        options: [
          { id: 'a', text: 'sendKeys("text")' },
          { id: 'b', text: 'clear() + type("text")' },
          { id: 'c', text: 'fill("text")' },
          { id: 'd', text: 'setValue("text")' },
        ],
        correct: 'c',
        explanation: { tr: 'fill() Selenium\'daki clear() + sendKeys() kombinasyonunun karşılığıdır. Önce alanı temizler, sonra metni yazar. type() ise temizlemeden sadece yazar.', en: 'fill() is the equivalent of Selenium\'s clear() + sendKeys() combination. It clears the field first, then types the text. type() types without clearing.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Playwright'ta bir web formundaki metin kutusunun mevcut içeriğini tamamen silip yeni bir değer yazmak için en güvenli metod hangisidir?",
            "en": "Which method is the most reliable way in Playwright to completely clear the existing content of a text box in a web form and enter a new value?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "type()"
            },
            {
                  "id": "b",
                  "text": "clear_and_type()"
            },
            {
                  "id": "c",
                  "text": "fill()"
            },
            {
                  "id": "d",
                  "text": "press_sequentially()"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "fill() metodu, ilgili elementin içeriğini otomatik olarak temizler ve ardından yeni veriyi girer; bu işlem, type() metoduna göre daha atomik ve güvenilirdir.",
            "en": "The fill() method automatically clears the content of the element before entering the new data; this operation is more atomic and reliable than using the type() method."
      }
}
},
    ],
  },
  en: {
    title: '🖱️ Basic Actions — Selenium Comparison',
    blocks: [
      {
        type: 'simple-box', emoji: '🕹️',
        content: 'In Selenium, every action was two steps: "find element, then act on it." In Playwright, you define a locator once and call the action directly — and it automatically waits for the element to be ready.',
      },
      { type: 'heading', text: 'All Actions — 3-Language Comparison' },
      {
        type: 'table',
        headers: ['Action', 'Selenium (Java)', 'Playwright Java', 'Playwright TypeScript', 'Playwright Python'],
        rows: [
          ['Click', 'driver.findElement(By.id("x")).click()', 'page.locator("#x").click()', 'await page.locator("#x").click()', 'page.locator("#x").click()'],
          ['Type text', 'element.sendKeys("text")', 'page.locator("#x").fill("text")', 'await page.locator("#x").fill("text")', 'page.locator("#x").fill("text")'],
          ['Navigate', 'driver.get("url")', 'page.navigate("url")', 'await page.goto("url")', 'page.goto("url")'],
          ['Get text', 'element.getText()', 'page.locator("#x").innerText()', 'await page.locator("#x").innerText()', 'page.locator("#x").inner_text()'],
          ['Get attribute', 'element.getAttribute("href")', 'page.locator("#x").getAttribute("href")', 'await page.locator("#x").getAttribute("href")', 'page.locator("#x").get_attribute("href")'],
          ['Hover', 'new Actions(driver).moveToElement(el).perform()', 'page.locator("#x").hover()', 'await page.locator("#x").hover()', 'page.locator("#x").hover()'],
          ['Double click', 'new Actions(driver).doubleClick(el).perform()', 'page.locator("#x").dblclick()', 'await page.locator("#x").dblclick()', 'page.locator("#x").dblclick()'],
          ['Checkbox', 'if(!el.isSelected()) el.click()', 'page.locator("#x").check()', 'await page.locator("#x").check()', 'page.locator("#x").check()'],
          ['Dropdown', 'new Select(el).selectByValue("v")', 'page.locator("select").selectOption("v")', 'await page.locator("select").selectOption("v")', 'page.locator("select").select_option("v")'],
          ['Screenshot', 'TakesScreenshot + FileUtils', 'page.screenshot({path:"s.png"})', 'await page.screenshot({path:"s.png"})', 'page.screenshot(path="s.png")'],
          ['Drag & Drop', 'Actions.dragAndDrop().perform()', 'page.locator("#src").dragTo(dst)', 'await page.locator("#src").dragTo(dst)', 'page.locator("#src").drag_to(dst)'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// test_basic_actions.spec.ts
import { test, expect } from '@playwright/test';

test('basic actions example', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');

  await page.locator('#email').fill('test@example.com');    // fill = clear + type
  await page.locator('#password').fill('secretpass');
  await page.locator('[data-qa="login-button"]').click();

  const welcomeText = await page.locator('.logged-in').innerText();
  console.log(welcomeText);

  await page.locator('#sort-by').selectOption('price-asc'); // dropdown
  await page.locator('#newsletter').check();                 // checkbox

  await page.screenshot({ path: 'evidence.png', fullPage: true });

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h1')).toHaveText('Welcome');
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# test_basic_actions.py
from playwright.sync_api import Page, expect
import re

def test_basic_actions(page: Page):
    page.goto("https://automationexercise.com/login")

    page.locator("#email").fill("test@example.com")      # fill = clear + type
    page.locator("#password").fill("secretpass")
    page.locator("[data-qa='login-button']").click()

    welcome = page.locator(".logged-in").inner_text()    # snake_case in Python
    page.locator("#sort-by").select_option("price-asc")  # snake_case!
    page.locator("#newsletter").check()
    page.screenshot(path="evidence.png", full_page=True)

    expect(page).to_have_url(re.compile("dashboard"))
    expect(page.locator("h1")).to_have_text("Welcome")`,
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir input alanını önce temizleyip sonra metin yazmak için hangi metod kullanılır?', en: 'Which method in Playwright clears an input field and then types text?' },
        options: [
          { id: 'a', text: 'sendKeys("text")' },
          { id: 'b', text: 'clear() + type("text")' },
          { id: 'c', text: 'fill("text")' },
          { id: 'd', text: 'setValue("text")' },
        ],
        correct: 'c',
        explanation: { tr: 'fill() clear() + sendKeys() kombinasyonunun karşılığıdır.', en: 'fill() is the equivalent of Selenium\'s clear() + sendKeys(). It clears the field first, then types the text.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Bir kullanıcı adı alanına veri girişi yaparken, eski metinleri temizleyip yeni metni eklemek için Playwright hangi metodun kullanılmasını önerir?",
            "en": "When entering data into a username field, which method does Playwright recommend to clear old text and insert the new text?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "write()"
            },
            {
                  "id": "b",
                  "text": "insert()"
            },
            {
                  "id": "c",
                  "text": "fill()"
            },
            {
                  "id": "d",
                  "text": "replace()"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "fill() metodu, bir input veya textarea alanındaki mevcut tüm metni sildiği için, form doldurma senaryolarında en çok tercih edilen metoddur.",
            "en": "Since the fill() method clears all existing text in an input or textarea field, it is the most preferred method for form-filling scenarios."
      }
}
},
    ],
  },
}
const s3 = {
  tr: {
    title: '🎯 Locator Stratejileri',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'Locator, sayfada bir elementi bulmak için kullandığın "tarif"tir. "Sarı kapıdaki 3. katta mutfak" gibi — ne kadar özgün tarif edersen, yanlış yere gidilmez. Playwright\'ın önerdiği yöntem: önce role/text/testid kullan, XPath\'ı son çare bırak.',
      },
      { type: 'heading', text: 'Locator Türleri — Selenium vs Playwright' },
      {
        type: 'table',
        headers: ['Strateji', 'Selenium Java', 'Playwright (3 dil)'],
        rows: [
          ['ID', 'By.id("login")', '#login veya page.locator("#login")'],
          ['CSS', 'By.cssSelector(".btn-primary")', 'page.locator(".btn-primary")'],
          ['XPath', 'By.xpath("//button[@id=\'x\']")', 'page.locator("xpath=//button[@id=\'x\']")'],
          ['Name', 'By.name("username")', 'page.locator("[name=\'username\']")'],
          ['Class', 'By.className("header")', 'page.locator(".header")'],
          ['Text içeriği', 'By.xpath("//*[text()=\'Login\']")', 'page.getByText("Login") ← ÇOK DAHA KOLAY'],
          ['Role (ARIA)', '❌ Yok', 'page.getByRole("button", {name:"Submit"})'],
          ['Placeholder', '❌ Yok', 'page.getByPlaceholder("Email address")'],
          ['Label', '❌ Yok', 'page.getByLabel("Username")'],
          ['data-testid', 'By.cssSelector("[data-testid=\'x\']")', 'page.getByTestId("x") ← EN SAĞLAM'],
          ['Alt text (img)', '❌ Zor', 'page.getByAltText("Logo")'],
          ['Title', '❌ Zor', 'page.getByTitle("Tooltip text")'],
        ],
      },
      { type: 'heading', text: 'Playwright\'a Özgü Locator\'lar (Selenium\'da yok)' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright'ın güçlü locator API'leri
import { test, expect } from '@playwright/test';

test('locator strategies', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. getByRole — ARIA rolüne göre (EN ÖNERİLEN)
  await page.getByRole('button', { name: 'Add to Cart' }).click();   // buton ara
  await page.getByRole('link', { name: 'Home' }).click();             // link ara
  await page.getByRole('textbox', { name: 'Email' }).fill('a@b.com');// input ara
  await page.getByRole('checkbox', { name: 'Newsletter' }).check();   // checkbox ara

  // 2. getByText — metin içeriğine göre
  await page.getByText('Sign In').click();                            // tam metin
  await page.getByText('Product', { exact: false }).first().click(); // kısmi metin

  // 3. getByLabel — label'a bağlı input
  await page.getByLabel('Password').fill('secret123');                // label text

  // 4. getByPlaceholder — placeholder'a göre
  await page.getByPlaceholder('Search products...').fill('shirt');   // placeholder

  // 5. getByTestId — data-testid attribute
  await page.getByTestId('login-button').click();                     // EN SAĞLAM

  // 6. locator filtreleme — birden fazla sonuç varsa daralt
  await page.locator('.product-card')
    .filter({ hasText: 'Blue Shirt' })                                // metin içereni filtrele
    .getByRole('button', { name: 'Buy' })
    .click();

  // 7. nth — index ile seç (dikkatli kullan!)
  await page.locator('.product-card').nth(0).click();                 // ilk kart
  await page.locator('.product-card').last().click();                 // son kart
  await page.locator('.product-card').first().click();                // first()

  // 8. İç içe locator (chaining)
  const loginForm = page.locator('#login-form');                      // form locator
  await loginForm.locator('#email').fill('test@example.com');         // form içinde ara
  await loginForm.locator('#password').fill('pass');

  // 9. has — içinde başka element bulunanı bul
  await page.locator('.product', { has: page.locator('.on-sale') }).first().click();
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// Java — Playwright locator örnekleri
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;

Page page = browser.newPage();
page.navigate("https://automationexercise.com");

// getByRole — ARIA rol bazlı (EN ÖNERİLEN)
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Add to Cart")).click();
page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Home")).click();
page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Email")).fill("a@b.com");

// getByText — metin bazlı
page.getByText("Sign In").click();                   // tam metin eşleşme

// getByLabel
page.getByLabel("Password").fill("secret123");       // label'a bağlı input

// getByTestId
page.getByTestId("login-button").click();            // data-testid

// locator + filter
page.locator(".product-card")
    .filter(new Locator.FilterOptions().setHasText("Blue Shirt"))
    .getByRole(AriaRole.BUTTON, new Locator.GetByRoleOptions().setName("Buy"))
    .click();

// nth / first / last
page.locator(".product-card").nth(0).click();        // indeks
page.locator(".product-card").first().click();
page.locator(".product-card").last().click();`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — Playwright locator örnekleri
from playwright.sync_api import Page

def test_locators(page: Page):
    page.goto("https://automationexercise.com")

    # getByRole — snake_case API
    page.get_by_role("button", name="Add to Cart").click()
    page.get_by_role("link", name="Home").click()

    # getByText
    page.get_by_text("Sign In").click()

    # getByLabel
    page.get_by_label("Password").fill("secret123")

    # getByPlaceholder
    page.get_by_placeholder("Search products...").fill("shirt")

    # getByTestId
    page.get_by_test_id("login-button").click()

    # filter — Python'da da aynı
    page.locator(".product-card").filter(has_text="Blue Shirt").first().click()

    # nth / first / last
    page.locator(".product-card").nth(0).click()
    page.locator(".product-card").first().click()
    page.locator(".product-card").last().click()`,
      },
      {
        type: 'callout', color: 'green', emoji: '✅',
        title: 'Locator Öncelik Sırası (Playwright Resmi Tavsiyesi)',
        content: '1. getByRole → 2. getByLabel → 3. getByPlaceholder → 4. getByText → 5. getByTestId → 6. CSS/XPath. XPath\'ı son çare kullan — sayfa yapısı değişince kırılır.',
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta data-testid="submit-btn" olan bir elementi bulmak için en doğru yöntem hangisidir?', en: 'What is the best way to find an element with data-testid="submit-btn" in Playwright?' },
        options: [
          { id: 'a', text: 'page.locator("//button[@data-testid=\'submit-btn\']")' },
          { id: 'b', text: 'page.getByTestId("submit-btn")' },
          { id: 'c', text: 'page.locator("[data-testid]")' },
          { id: 'd', text: 'page.getByRole("button")' },
        ],
        correct: 'b',
        explanation: { tr: 'getByTestId("submit-btn") hem en okunabilir hem de en sağlam yöntemdir. CSS/XPath\'tan daha anlamlıdır ve sayfa yeniden yapılandırılsa bile kırılmaz.', en: 'getByTestId("submit-btn") is both the most readable and most resilient approach. It\'s more meaningful than CSS/XPath and won\'t break if the page is restructured.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright\\'ta data-testid=\"login-input\" olan bir input alanını seçmek için en ideal yöntem hangisidir?",
            "en": "What is the most ideal method to select an input field with data-testid=\"login-input\" in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.locator(\"input[data-testid='login-input']\")"
            },
            {
                  "id": "b",
                  "text": "page.getByTestId(\"login-input\")"
            },
            {
                  "id": "c",
                  "text": "page.querySelector(\"[data-testid='login-input']\")"
            },
            {
                  "id": "d",
                  "text": "page.getByLabel(\"login\")"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "getByTestId() metodu, test otomasyonunda seçicileri (selectors) test odaklı hale getirmek için tercih edilen, sürdürülebilir ve okunabilir bir Playwright yöntemidir.",
            "en": "The getByTestId() method is a preferred, maintainable, and readable Playwright approach to make selectors test-oriented in automation."
      }
}
},
    ],
  },
  en: {
    title: '🎯 Locator Strategies',
    blocks: [
      {
        type: 'simple-box', emoji: '🔍',
        content: 'A locator is the "address" you use to find an element on the page — like "the kitchen on the 3rd floor with the yellow door." The more unique the description, the less chance of ending up in the wrong place. Playwright recommends: use role/text/testid first, leave XPath as a last resort.',
      },
      { type: 'heading', text: 'Locator Types — Selenium vs Playwright' },
      {
        type: 'table',
        headers: ['Strategy', 'Selenium Java', 'Playwright'],
        rows: [
          ['ID', 'By.id("login")', '#login or page.locator("#login")'],
          ['CSS', 'By.cssSelector(".btn-primary")', 'page.locator(".btn-primary")'],
          ['XPath', 'By.xpath("//button[@id=\'x\']")', 'page.locator("xpath=//button")'],
          ['Text content', 'By.xpath("//*[text()=\'Login\']")', 'page.getByText("Login") ← MUCH EASIER'],
          ['Role (ARIA)', '❌ Not available', 'page.getByRole("button", {name:"Submit"})'],
          ['Placeholder', '❌ Not available', 'page.getByPlaceholder("Email address")'],
          ['Label', '❌ Not available', 'page.getByLabel("Username")'],
          ['data-testid', 'By.cssSelector("[data-testid=\'x\']")', 'page.getByTestId("x") ← MOST ROBUST'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright locator strategies
import { test } from '@playwright/test';

test('locators', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // Role-based (RECOMMENDED)
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('a@b.com');

  // Text-based
  await page.getByText('Sign In').click();

  // Label-based (finds the input associated with the label)
  await page.getByLabel('Password').fill('secret123');

  // Test ID — most robust, doesn't break on UI changes
  await page.getByTestId('login-button').click();

  // Filter — narrow down when multiple matches
  await page.locator('.product-card')
    .filter({ hasText: 'Blue Shirt' })
    .getByRole('button', { name: 'Buy' })
    .click();
});`,
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta data-testid="submit-btn" olan bir elementi bulmak için en doğru yöntem hangisidir?', en: 'What is the best way to find an element with data-testid="submit-btn" in Playwright?' },
        options: [
          { id: 'a', text: 'page.locator("//button[@data-testid=\'submit-btn\']")' },
          { id: 'b', text: 'page.getByTestId("submit-btn")' },
          { id: 'c', text: 'page.locator("[data-testid]")' },
          { id: 'd', text: 'page.getByRole("button")' },
        ],
        correct: 'b',
        explanation: { tr: 'getByTestId() en sağlam ve okunabilir yöntemdir.', en: 'getByTestId("submit-btn") is both the most readable and most resilient approach — it won\'t break if the page is restructured.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir HTML öğesinin data-testid=\"nav-menu\" niteliğine sahip olduğunu varsayarsak, bu öğeyi Playwright ile bulmanın en iyi yolu nedir?",
            "en": "Assuming an HTML element has the attribute data-testid=\"nav-menu\", what is the best way to locate this element using Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.locator(\"div > .nav-menu\")"
            },
            {
                  "id": "b",
                  "text": "page.getByTestId(\"nav-menu\")"
            },
            {
                  "id": "c",
                  "text": "page.getByClassName(\"nav-menu\")"
            },
            {
                  "id": "d",
                  "text": "page.$x(\"//div[@data-testid='nav-menu']\")"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "getByTestId(), uygulama içindeki değişikliklerden en az etkilenen ve testlerin daha kararlı çalışmasını sağlayan önerilen yöntemdir.",
            "en": "getByTestId() is the recommended method as it is least affected by changes in the application, ensuring more stable test execution."
      }
}
},
    ],
  },
}

const s4 = {
  tr: {
    title: '⏳ Bekleme Mekanizmaları (Wait)',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'Selenium\'da "element yüklenene kadar bekle" için WebDriverWait + ExpectedConditions yazman gerekiyordu — 5 satır kod. Playwright\'ta her aksiyon zaten bekliyor — ekstra kod yazmana gerek yok. Sadece özel durumlarda explicit wait kullanırsın.',
      },
      {
        type: 'callout', color: 'green', emoji: '⚡',
        title: 'Auto-Wait — Playwright\'ın Süper Gücü',
        content: 'click(), fill(), check() gibi TÜM aksiyonlar çağrılmadan önce Playwright şunu kontrol eder: Element DOM\'da var mı? Görünür mü? Tıklanabilir mi? Stabil mi? (DOM değişiyor mu?) Hepsi hazır olunca aksiyon yapılır. Timeout aşılırsa TimeoutError fırlatır.',
      },
      {
        type: 'table',
        headers: ['Wait Türü', 'Selenium (Java)', 'Playwright'],
        rows: [
          ['Implicit wait', 'driver.manage().timeouts().implicitlyWait(10, SECONDS)', '❌ Yok — auto-wait karşılıyor'],
          ['Explicit wait (görünür)', 'wait.until(EC.visibility_of(el))', 'page.locator("#x").waitFor({state:"visible"})'],
          ['Explicit wait (tıklanabilir)', 'wait.until(EC.element_to_be_clickable(el))', 'Otomatik — sadece click() yaz'],
          ['URL değişmesini bekle', 'wait.until(EC.url_contains("dashboard"))', 'await page.waitForURL("**/dashboard")'],
          ['Yeni sayfa yüklenmesini bekle', 'WebDriverWait ile karmaşık', 'await page.waitForLoadState("networkidle")'],
          ['Element yok olmasını bekle', 'wait.until(EC.invisibility_of(el))', 'page.locator("#x").waitFor({state:"hidden"})'],
          ['API yanıtını bekle', '❌ Selenium\'da yok', 'await page.waitForResponse("**/api/products")'],
          ['Sabit süre bekle (kötü pratik!)', 'Thread.sleep(2000)', 'await page.waitForTimeout(2000) — KAÇIN!'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright wait örnekleri
import { test, expect } from '@playwright/test';

test('wait examples', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. AUTO-WAIT — ekstra kod gerekmez
  await page.getByRole('button', { name: 'Add to Cart' }).click();   // element hazır olana BEKLER

  // 2. waitForURL — URL değişmesini bekle
  await page.waitForURL('**/cart');                                  // URL */cart/* olana dek bekle

  // 3. waitFor — element state bekle
  await page.locator('#spinner').waitFor({ state: 'hidden' });       // spinner kaybolsun
  await page.locator('#content').waitFor({ state: 'visible' });      // içerik görünsün
  await page.locator('#result').waitFor({ state: 'attached' });      // DOM'a eklensin

  // 4. waitForLoadState — sayfa yüklenme durumu
  await page.waitForLoadState('domcontentloaded');                   // DOM hazır
  await page.waitForLoadState('networkidle');                        // ağ aktivitesi durdu

  // 5. waitForSelector — CSS selector bekle (eski API ama çalışır)
  await page.waitForSelector('.product-list', { state: 'visible' });

  // 6. waitForResponse — API yanıtı bekle
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/cart')),  // API yanıtı bekle
    page.getByText('Add to Cart').click(),                           // tıkla (isteği tetikle)
  ]);
  console.log(await response.json());                                // yanıtı oku

  // 7. expect ile bekleme — ASSERTION + WAIT birleşik
  await expect(page.locator('#success-msg')).toBeVisible();         // görünene kadar bekle + assert
  await expect(page.locator('#count')).toHaveText('3');             // metin "3" olana dek bekle
  await expect(page).toHaveURL(/dashboard/);                        // URL pattern bekle

  // ❌ KÖTÜ PRATİK — sabit bekleme (race condition riski)
  // await page.waitForTimeout(2000);  // KULLANMA — flaky test üretir
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// Java — Playwright wait örnekleri
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.WaitForSelectorState;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

// AUTO-WAIT: click() zaten bekler — extra kod gerekmez
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Add to Cart")).click();

// waitForURL
page.waitForURL("**/cart");

// waitFor state
page.locator("#spinner").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
page.locator("#content").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));

// waitForLoadState
page.waitForLoadState(LoadState.NETWORKIDLE);

// waitForResponse
Response response = page.waitForResponse(
    r -> r.url().contains("/api/cart"),      // hangi URL'yi bekle
    () -> page.getByText("Add to Cart").click() // aksiyonu lambda ile ver
);

// Assertion = otomatik wait
assertThat(page.locator("#success-msg")).isVisible();   // görünene dek bekler
assertThat(page.locator("#count")).hasText("3");         // "3" olana dek bekler`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — Playwright wait örnekleri
from playwright.sync_api import Page, expect

def test_waits(page: Page):
    page.goto("https://automationexercise.com")

    # AUTO-WAIT: click() zaten bekler
    page.get_by_role("button", name="Add to Cart").click()

    # waitForURL
    page.wait_for_url("**/cart")                                  # snake_case!

    # waitFor state
    page.locator("#spinner").wait_for(state="hidden")             # spinner kaybol
    page.locator("#content").wait_for(state="visible")            # içerik görünsün

    # waitForLoadState
    page.wait_for_load_state("networkidle")

    # waitForResponse
    with page.expect_response(lambda r: "/api/cart" in r.url) as resp_info:
        page.get_by_text("Add to Cart").click()
    response = resp_info.value
    print(response.json())

    # Assertion = bekleme
    expect(page.locator("#success-msg")).to_be_visible()
    expect(page.locator("#count")).to_have_text("3")`,
      },
      {
        type: 'simulation',
        icon: '⚡',
        color: '#10b981',
        title: { tr: 'Auto-Wait — Playwright Aksiyondan Önce Ne Kontrol Eder?', en: 'Auto-Wait — What Does Playwright Check Before Acting?' },
        scenario: 'pw-autowait',
        description: {
          tr: '"▶ Butona Tıkla" → Playwright tıklamadan önce 5 actionability check\'i sırayla yapar. Tüm checkler yeşil olunca gerçek tıklama gerçekleşir. Sağda hangi check\'in şu an yapıldığını izle.',
          en: '▶ Click the button → Playwright runs 5 actionability checks before clicking. Only when all pass does the real click happen. Watch which check is running on the right.',
        },
        code: `// TypeScript — Auto-Wait örneği
// Tek satır — Playwright ARKAPLANda bunu yapar:
await page.getByRole('button', { name: 'Sepete Ekle' }).click();

// ↑ Bu satır şunları otomatik kontrol eder:
// 1. Element DOM'da var mı?          → attached
// 2. Element görünür mü?             → visible
// 3. Element animasyondan çıktı mı?  → stable
// 4. Pointer eventleri alıyor mu?    → receives events
// 5. Element enabled mi?             → enabled

// Timeout aşılırsa: TimeoutError fırlatır
// Default timeout: 30 saniye (playwright.config.ts'de ayarlanır)

// Java eşdeğeri (aynı auto-wait geçerli):
// page.getByRole(AriaRole.BUTTON, ...).click(); // no extra wait needed`,
        language: 'typescript',
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir spinner\'ın kaybolmasını beklemek için hangi kod kullanılır?', en: 'Which code waits for a spinner to disappear in Playwright?' },
        options: [
          { id: 'a', text: 'Thread.sleep(3000)' },
          { id: 'b', text: 'page.locator("#spinner").waitFor({state:"hidden"})' },
          { id: 'c', text: 'wait.until(invisibility_of("#spinner"))' },
          { id: 'd', text: 'page.waitForSelector("#spinner", {visible:false})' },
        ],
        correct: 'b',
        explanation: { tr: 'waitFor({state:"hidden"}) elementi hidden veya DOM\'dan çıkana kadar bekler. Python\'da: wait_for(state="hidden"). Java\'da: WaitForSelectorState.HIDDEN.', en: 'waitFor({state:"hidden"}) waits until the element is hidden or removed from the DOM. In Python: wait_for(state="hidden"). In Java: WaitForSelectorState.HIDDEN.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright\\'ta bir yükleme animasyonu (loading-overlay) ekrandan kalkana kadar beklemek için doğru yöntem hangisidir?",
            "en": "Which method is correct to wait until a loading animation (loading-overlay) disappears in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.waitForTimeout(5000)"
            },
            {
                  "id": "b",
                  "text": "page.locator(\".loading-overlay\").waitFor({state: \"hidden\"})"
            },
            {
                  "id": "c",
                  "text": "page.waitForElement(\".loading-overlay\", {visible: false})"
            },
            {
                  "id": "d",
                  "text": "page.click(\".loading-overlay\", {timeout: 0})"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "waitFor({state: \"hidden\"}) kullanımı, elementin DOM\\'dan ayrılmasını veya görünürlüğünü yitirmesini bekleyen Playwright\\'ın yerleşik ve önerilen bekleme yöntemidir.",
            "en": "Using waitFor({state: \"hidden\"}) is the built-in and recommended Playwright wait method that waits for the element to be removed from the DOM or become hidden."
      }
}
},
    ],
  },
  en: {
    title: '⏳ Wait Mechanisms',
    blocks: [
      {
        type: 'simple-box', emoji: '⏰',
        content: 'In Selenium you needed WebDriverWait + ExpectedConditions — 5 lines of code just to wait for an element. In Playwright every action already waits — no extra code needed. You only write explicit waits for special cases.',
      },
      {
        type: 'callout', color: 'green', emoji: '⚡',
        title: 'Auto-Wait — Playwright\'s Superpower',
        content: 'Before ALL actions like click(), fill(), check(), Playwright checks: Is the element in the DOM? Is it visible? Is it clickable? Is it stable? Only when all conditions are met does it perform the action. If timeout is exceeded, it throws TimeoutError.',
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Playwright wait examples
import { test, expect } from '@playwright/test';

test('wait examples', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. AUTO-WAIT — no extra code needed
  await page.getByRole('button', { name: 'Add to Cart' }).click(); // WAITS automatically

  // 2. waitForURL
  await page.waitForURL('**/cart');

  // 3. waitFor state
  await page.locator('#spinner').waitFor({ state: 'hidden' });     // wait for spinner to disappear
  await page.locator('#content').waitFor({ state: 'visible' });    // wait for content to appear

  // 4. waitForResponse — wait for API call
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/cart')),
    page.getByText('Add to Cart').click(),
  ]);

  // 5. expect = wait + assertion
  await expect(page.locator('#success-msg')).toBeVisible();
  await expect(page.locator('#count')).toHaveText('3');

  // ❌ BAD PRACTICE
  // await page.waitForTimeout(2000); // avoid — causes flaky tests
});`,
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir spinner\'ın kaybolmasını beklemek için hangi kod kullanılır?', en: 'Which code waits for a spinner to disappear in Playwright?' },
        options: [
          { id: 'a', text: 'Thread.sleep(3000)' },
          { id: 'b', text: 'page.locator("#spinner").waitFor({state:"hidden"})' },
          { id: 'c', text: 'wait.until(invisibility_of("#spinner"))' },
          { id: 'd', text: 'page.waitForSelector("#spinner", {visible:false})' },
        ],
        correct: 'b',
        explanation: { tr: 'waitFor({state:"hidden"}) elementi hidden veya DOM\'dan çıkana kadar bekler.', en: 'waitFor({state:"hidden"}) waits until the element is hidden or removed from the DOM.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta bir yükleme çubuğunun (loading bar) DOM'dan tamamen kaldırılmasını beklemek için en doğru yöntem nedir?",
            "en": "What is the best way to wait for a loading bar to be completely removed from the DOM in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.waitForTimeout(5000)"
            },
            {
                  "id": "b",
                  "text": "page.locator(\".loader\").waitFor({state: \"detached\"})"
            },
            {
                  "id": "c",
                  "text": "page.waitForElement(\".loader\", {hidden: true})"
            },
            {
                  "id": "d",
                  "text": "page.expect(\".loader\").toBeInvisible()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "{state: \"detached\"} seçeneği, elementin DOM yapısından tamamen silinmesini beklemek için kullanılır.",
            "en": "The {state: \"detached\"} option is used to wait for the element to be completely removed from the DOM."
      }
}
},
    ],
  },
}

const s5 = {
  tr: {
    title: '🖼️ iframe · Alert · Popup · Çoklu Sekme',
    blocks: [
      {
        type: 'simple-box', emoji: '🪟',
        content: 'iframe, sayfa içinde başka bir sayfanın çerçevesidir — ekran içinde ekran gibi. Alert ise tarayıcının kendi açtığı uyarı penceresidir. Selenium\'da bunlar için switchTo() yazıp geri dönmek zorundaydın. Playwright\'ta frameLocator() ve dialog event ile çok daha temiz.',
      },
      { type: 'heading', text: '1️⃣ iframe — Selenium vs Playwright' },
      {
        type: 'comparison',
        left: { label: '❌ Selenium — Karmaşık switchTo()', code: `// Selenium — iframe geçişi
driver.switchTo().frame("myFrame");      // isme göre geç
WebElement btn = driver.findElement(By.id("submit"));
btn.click();
driver.switchTo().defaultContent();      // ANA SAYFAYA DÖN (unutma!)

// Nested iframe — çok daha karmaşık
driver.switchTo().frame(0);             // dış iframe
driver.switchTo().frame("inner");       // iç iframe
driver.findElement(By.id("x")).click();
driver.switchTo().defaultContent();     // tüm yoldan çık` },
        right: { label: '✅ Playwright — frameLocator()', code: `// Playwright — tek satır, geri dönme yok
const frame = page.frameLocator('#myFrame');  // iframe'i seç
await frame.locator('#submit').click();       // iframe İÇİNDE ara — otomatik

// Nested iframe
const inner = page.frameLocator('#outer').frameLocator('#inner');
await inner.locator('#x').click();

// src ile seçmek
const frame2 = page.frameLocator('iframe[src*="payment"]');
await frame2.locator('#card-number').fill('4111111111111111');` },
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — iframe
from playwright.sync_api import Page

def test_iframe(page: Page):
    page.goto("https://example.com/iframe-page")

    # iframe locator oluştur
    frame = page.frame_locator("#myFrame")    # ID ile seç

    # iframe İÇİNDE aksiyon yap — geri dönmek gerek yok!
    frame.locator("#username").fill("testuser")
    frame.locator("#submit").click()

    # Nested iframe
    inner = page.frame_locator("#outer").frame_locator("#inner")
    inner.locator("#target").click()

    # Tüm iframe'leri listele
    for frame_obj in page.frames:
        print(frame_obj.url)   # her iframe'in URL'si`,
      },
      { type: 'heading', text: '2️⃣ Alert · Confirm · Prompt' },
      {
        type: 'table',
        headers: ['Dialog Türü', 'Selenium Java', 'Playwright'],
        rows: [
          ['Alert kabul et', 'driver.switchTo().alert().accept()', 'page.on("dialog", d => d.accept()) — event listener'],
          ['Alert reddet', 'driver.switchTo().alert().dismiss()', 'page.on("dialog", d => d.dismiss())'],
          ['Alert metni oku', 'driver.switchTo().alert().getText()', 'dialog.message()'],
          ['Prompt\'a yaz', 'alert.sendKeys("text"); alert.accept()', 'dialog.accept("text")'],
        ],
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Alert / Confirm / Prompt yönetimi
import { test, expect } from '@playwright/test';

test('dialog handling', async ({ page }) => {
  await page.goto('https://automationexercise.com');

  // 1. Alert — ÖNCE listener ekle, SONRA tetikle
  page.on('dialog', async dialog => {
    console.log('Dialog type:', dialog.type());    // alert / confirm / prompt
    console.log('Dialog message:', dialog.message()); // "Are you sure?"
    await dialog.accept();                          // OK / kabul et
    // await dialog.dismiss();                      // İptal / reddet
  });

  await page.getByText('Delete Account').click();  // alert tetikle

  // 2. Prompt — değer girerek kabul et
  page.on('dialog', async dialog => {
    if (dialog.type() === 'prompt') {
      await dialog.accept('John Doe');              // prompt'a yaz + kabul et
    }
  });

  // 3. Specific dialog bekleme
  const dialogPromise = page.waitForEvent('dialog'); // dialog olayını bekle
  await page.getByText('Show Alert').click();         // tetikle
  const dialog = await dialogPromise;
  expect(dialog.message()).toBe('Hello World!');       // mesajı doğrula
  await dialog.accept();
});`,
      },
      {
        type: 'code', language: 'Java',
        code: `// Java — Alert/Dialog
page.onDialog(dialog -> {
    System.out.println("Type: " + dialog.type());      // alert/confirm/prompt
    System.out.println("Message: " + dialog.message());
    dialog.accept();                                   // OK bas
    // dialog.dismiss();                               // İptal bas
    // dialog.accept("input text");                    // Prompt'a yaz
});

page.getByText("Delete Account").click();              // dialog tetikle`,
      },
      { type: 'heading', text: '3️⃣ Yeni Sekme / Popup Yönetimi' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Çoklu sekme ve popup yönetimi
import { test, expect } from '@playwright/test';

test('new tab / popup', async ({ browser }) => {
  const context = await browser.newContext();          // yeni browser context
  const page = await context.newPage();
  await page.goto('https://example.com');

  // 1. Popup bekleme (yeni pencere/sekme açan link)
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),                      // yeni sayfa açılmasını bekle
    page.getByText('Open in New Tab').click(),         // tıkla
  ]);

  await newPage.waitForLoadState('domcontentloaded'); // popup yüklenmesini bekle
  console.log(newPage.url());                         // popup URL'si
  await newPage.locator('#login').fill('user');        // popup'ta işlem yap
  await newPage.close();                               // popup'ı kapat

  // 2. Manuel yeni sayfa
  const page2 = await context.newPage();
  await page2.goto('https://other-site.com');
  await page2.locator('#confirm').click();

  // 3. Tüm açık sayfalar
  console.log(context.pages().length);                // kaç sayfa açık

  // Cleanup
  await context.close();
});

// 4. Browser Context — izolasyon (her test yeni context)
test('isolated context', async ({ browser }) => {
  const userA = await browser.newContext({ storageState: 'user-a.json' });
  const userB = await browser.newContext({ storageState: 'user-b.json' });

  const pageA = await userA.newPage();  // A kullanıcısı
  const pageB = await userB.newPage();  // B kullanıcısı — tam izolasyon

  await userA.close();
  await userB.close();
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — çoklu sekme
from playwright.sync_api import Browser, expect

def test_new_tab(browser: Browser):
    context = browser.new_context()                   # yeni context
    page = context.new_page()
    page.goto("https://example.com")

    # Popup bekle
    with context.expect_page() as new_page_info:      # context manager ile bekle
        page.get_by_text("Open in New Tab").click()   # tıkla
    new_page = new_page_info.value                    # popup page nesnesi
    new_page.wait_for_load_state("domcontentloaded")

    print(new_page.url)
    new_page.locator("#login").fill("user")
    new_page.close()

    context.close()`,
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir iframe içindeki elementi bulmak için hangi yöntem kullanılır?', en: 'Which method is used to find an element inside an iframe in Playwright?' },
        options: [
          { id: 'a', text: 'page.switchTo().frame("id")' },
          { id: 'b', text: 'page.frameLocator("#id").locator("#el")' },
          { id: 'c', text: 'page.findFrame("#id").click()' },
          { id: 'd', text: 'page.getByFrame("#id")' },
        ],
        correct: 'b',
        explanation: { tr: 'frameLocator("#id") iframe\'i seçer, ardından .locator() ile iframe içinde element aranır. switchTo().defaultContent() gibi geri dönme adımı gerekmez.', en: 'frameLocator("#id") selects the iframe, then .locator() searches inside it. No need for switchTo().defaultContent() to return — Playwright handles scope automatically.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright ile bir iframe içerisindeki butona tıklamak için hangi yaklaşım doğrudur?",
            "en": "Which approach is correct to click a button inside an iframe using Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.frame(\"myFrame\").click(\"#submit\")"
            },
            {
                  "id": "b",
                  "text": "page.frameLocator(\"iframe#myFrame\").locator(\"#submit\").click()"
            },
            {
                  "id": "c",
                  "text": "page.enterFrame(\"#myFrame\").click(\"#submit\")"
            },
            {
                  "id": "d",
                  "text": "page.switch_to_frame(\"#myFrame\").find(\"#submit\").click()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Playwright'ta frameLocator() metodu, iframe içinde zincirleme işlem yapmayı sağlar ve kapsamı otomatik yönetir.",
            "en": "In Playwright, the frameLocator() method allows for chaining operations inside an iframe and manages scope automatically."
      }
}
},
    ],
  },
  en: {
    title: '🖼️ iframe · Alert · Popup · Multiple Tabs',
    blocks: [
      {
        type: 'simple-box', emoji: '🪟',
        content: 'An iframe is a page inside a page — like a screen within a screen. An alert is a browser\'s own popup warning. In Selenium you had to switchTo() and remember to switch back. In Playwright, frameLocator() and dialog events make this much cleaner.',
      },
      { type: 'heading', text: '1️⃣ iframe Handling' },
      {
        type: 'code', language: 'TypeScript',
        code: `// iframe handling
import { test } from '@playwright/test';

test('iframe', async ({ page }) => {
  await page.goto('https://example.com/iframe-page');

  // Select iframe and act inside — no need to switch back!
  const frame = page.frameLocator('#myFrame');
  await frame.locator('#username').fill('testuser');
  await frame.locator('#submit').click();

  // Nested iframes
  const inner = page.frameLocator('#outer').frameLocator('#inner');
  await inner.locator('#target').click();

  // Select by src URL
  const payment = page.frameLocator('iframe[src*="payment"]');
  await payment.locator('#card-number').fill('4111111111111111');
});`,
      },
      { type: 'heading', text: '2️⃣ Alert · Confirm · Prompt' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Dialog handling
test('dialogs', async ({ page }) => {
  await page.goto('https://example.com');

  // Add listener BEFORE triggering the dialog
  page.on('dialog', async dialog => {
    console.log(dialog.type());    // alert / confirm / prompt
    console.log(dialog.message()); // the message text
    await dialog.accept();         // click OK
    // await dialog.dismiss();     // click Cancel
    // await dialog.accept('text'); // for prompts — type and accept
  });

  await page.getByText('Delete Account').click(); // triggers dialog
});`,
      },
      { type: 'heading', text: '3️⃣ New Tab / Popup' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Multiple tabs and popups
test('new tab', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');

  // Wait for popup to open
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),              // wait for new page event
    page.getByText('Open in New Tab').click(), // trigger it
  ]);

  await newPage.waitForLoadState('domcontentloaded');
  await newPage.locator('#login').fill('user');
  await newPage.close();
  await context.close();
});`,
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir iframe içindeki elementi bulmak için hangi yöntem kullanılır?', en: 'Which method is used to find an element inside an iframe in Playwright?' },
        options: [
          { id: 'a', text: 'page.switchTo().frame("id")' },
          { id: 'b', text: 'page.frameLocator("#id").locator("#el")' },
          { id: 'c', text: 'page.findFrame("#id").click()' },
          { id: 'd', text: 'page.getByFrame("#id")' },
        ],
        correct: 'b',
        explanation: { tr: 'frameLocator() iframe\'i seçer, ardından .locator() ile içinde arama yapılır.', en: 'frameLocator() selects the iframe, then .locator() searches inside it. No switchTo().defaultContent() needed.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta bir iframe içindeki form alanına veri girişi yapmak için kullanılan yöntem hangisidir?",
            "en": "Which method is used to input text into a form field inside an iframe in Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.iframe(\"#id\").fill(\"#input\", \"text\")"
            },
            {
                  "id": "b",
                  "text": "page.frameLocator(\"#id\").locator(\"#input\").fill(\"text\")"
            },
            {
                  "id": "c",
                  "text": "page.selectFrame(\"#id\").type(\"#input\", \"text\")"
            },
            {
                  "id": "d",
                  "text": "page.driver.switchTo(\"#id\").fill(\"#input\", \"text\")"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "frameLocator() ile iframe seçilir ve locator() ile içerideki element hedeflenerek fill() komutu çalıştırılır.",
            "en": "The iframe is selected via frameLocator(), and the fill() command is executed by targeting the inner element with locator()."
      }
}
},
    ],
  },
}
const s6 = {
  tr: {
    title: '📁 Dosya · Network İzleme · API Mock',
    blocks: [
      {
        type: 'simple-box', emoji: '🌐',
        content: 'Selenium\'da "API çağrısını yakala" veya "sahte yanıt döndür" yapmak için ayrı bir proxy kurman gerekiyordu. Playwright\'ta page.route() ile tek satırda API yanıtını değiştirebilirsin — sanki gerçek sunucu cevap vermiş gibi.',
      },
      { type: 'heading', text: '1️⃣ Dosya Yükleme (Upload)' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Dosya yükleme
import { test } from '@playwright/test';
import path from 'path';

test('file upload', async ({ page }) => {
  await page.goto('https://automationexercise.com/upload');

  // Tek dosya yükleme
  await page.locator('input[type="file"]').setInputFiles('test-file.txt');

  // Birden fazla dosya
  await page.locator('input[type="file"]').setInputFiles([
    'file1.pdf',
    'file2.png',
    path.join(__dirname, 'fixtures', 'document.docx'),
  ]);

  // Drag & Drop ile dosya yükleme (file chooser)
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),        // dosya seçici açılmasını bekle
    page.getByText('Choose File').click(),   // butona tıkla
  ]);
  await fileChooser.setFiles('upload-me.jpg');

  await page.getByRole('button', { name: 'Upload' }).click();
  await page.locator('#upload-success').waitFor({ state: 'visible' });
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — dosya yükleme
from playwright.sync_api import Page

def test_file_upload(page: Page):
    page.goto("https://automationexercise.com/upload")

    # Tek dosya
    page.locator("input[type='file']").set_input_files("test-file.txt")

    # Birden fazla dosya
    page.locator("input[type='file']").set_input_files(["file1.pdf", "file2.png"])

    # File chooser ile
    with page.expect_file_chooser() as fc_info:
        page.get_by_text("Choose File").click()
    file_chooser = fc_info.value
    file_chooser.set_files("upload-me.jpg")

    page.get_by_role("button", name="Upload").click()`,
      },
      { type: 'heading', text: '2️⃣ Dosya İndirme (Download)' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Dosya indirme
test('file download', async ({ page }) => {
  await page.goto('https://example.com/downloads');

  // Download event bekle
  const [download] = await Promise.all([
    page.waitForEvent('download'),                    // indirme başlamasını bekle
    page.getByText('Download Report').click(),        // tetikle
  ]);

  // Dosyayı kaydet
  await download.saveAs('./downloads/' + download.suggestedFilename()); // önerilen isimle kaydet

  console.log('Dosya adı:', download.suggestedFilename());  // "report.pdf"
  console.log('Geçici yol:', await download.path());         // temp konumu
});`,
      },
      { type: 'heading', text: '3️⃣ Network İzleme ve API Mock' },
      {
        type: 'code', language: 'TypeScript',
        code: `// Network interception & API mocking
import { test, expect } from '@playwright/test';

test('network mock', async ({ page }) => {

  // 1. API yanıtını taklit et (MOCK)
  await page.route('**/api/products', async route => {
    await route.fulfill({                             // yanıtı taklit et
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Mock Product', price: 99.99 }
      ]),
    });
  });

  // 2. İsteği değiştir (MODIFY)
  await page.route('**/api/login', async route => {
    const request = route.request();
    await route.continue({                            // isteği değiştirerek devam et
      headers: {
        ...request.headers(),
        'X-Test-Header': 'playwright-test',           // header ekle
      },
    });
  });

  // 3. İsteği engelle (BLOCK)
  await page.route('**/*.{png,jpg,jpeg,gif,svg}', route => route.abort()); // resimleri engelle (hız!)

  // 4. İsteği izle (SPY)
  const requests: string[] = [];
  page.on('request', req => requests.push(req.url()));
  page.on('response', async res => {
    if (res.url().includes('/api/')) {
      console.log(res.request().method() + ' ' + res.url() + ' → ' + res.status());
    }
  });

  await page.goto('https://automationexercise.com');
  console.log('Toplam istek:', requests.length);

  // 5. Belirli API yanıtını bekle
  const [response] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/products') && r.status() === 200),
    page.reload(),
  ]);
  const data = await response.json();
  expect(data[0].name).toBe('Mock Product');          // mock veri geldi mi?
});`,
      },
      {
        type: 'code', language: 'Python',
        code: `# Python — API mock
from playwright.sync_api import Page, Route
import json

def test_api_mock(page: Page):
    # API yanıtını taklit et
    def mock_products(route: Route):
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps([{"id": 1, "name": "Mock Product", "price": 99.99}])
        )

    page.route("**/api/products", mock_products)

    # Resimleri engelle (test hızını artırır)
    page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())

    # İsteği izle
    page.on("request", lambda req: print(f"→ {req.method} {req.url}"))
    page.on("response", lambda res: print(f"← {res.status} {res.url}"))

    page.goto("https://automationexercise.com")`,
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir API çağrısını sahte veriyle yanıtlamak için hangi metod kullanılır?', en: 'Which method in Playwright intercepts an API call and returns fake data?' },
        options: [
          { id: 'a', text: 'page.intercept()' },
          { id: 'b', text: 'page.route() + route.fulfill()' },
          { id: 'c', text: 'page.mockAPI()' },
          { id: 'd', text: 'page.stub()' },
        ],
        correct: 'b',
        explanation: { tr: 'page.route(pattern, handler) ile URL pattern eşleştirip route.fulfill() ile sahte yanıt döndürürsün. route.continue() ise isteği değiştirerek gerçek sunucuya iletir.', en: 'page.route(pattern, handler) matches URL patterns, and route.fulfill() returns fake responses. route.continue() modifies and forwards the request to the real server.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Playwright'ta bir ağ isteğini (network request) durdurup içeriğini değiştirmek için hangi mekanizma kullanılır?",
            "en": "Which mechanism is used in Playwright to intercept and modify the content of a network request?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.on('request')"
            },
            {
                  "id": "b",
                  "text": "page.route() + route.fulfill()"
            },
            {
                  "id": "c",
                  "text": "page.hook()"
            },
            {
                  "id": "d",
                  "text": "page.replace()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "page.route() metodu ağ trafiğini izler ve belirli bir URL ile eşleştiğinde route.fulfill() kullanarak isteği sahte veya değiştirilmiş bir yanıtla sonlandırabilir.",
            "en": "The page.route() method intercepts network traffic, and when it matches a URL pattern, you can use route.fulfill() to terminate the request with a mocked or modified response."
      }
}
},
    ],
  },
  en: {
    title: '📁 File · Network · API Mock',
    blocks: [
      {
        type: 'simple-box', emoji: '🌐',
        content: 'In Selenium you needed a separate proxy to intercept API calls or return fake responses. In Playwright, page.route() lets you replace any API response in a single line — as if the real server responded.',
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// File upload
import { test } from '@playwright/test';

test('file upload', async ({ page }) => {
  await page.goto('https://automationexercise.com/upload');

  // Single file
  await page.locator('input[type="file"]').setInputFiles('test-file.txt');

  // Multiple files
  await page.locator('input[type="file"]').setInputFiles(['file1.pdf', 'file2.png']);

  // Via file chooser dialog
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByText('Choose File').click(),
  ]);
  await fileChooser.setFiles('upload-me.jpg');
});`,
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// Network mock
test('network mock', async ({ page }) => {
  // Mock API response
  await page.route('**/api/products', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, name: 'Mock Product', price: 99.99 }]),
    });
  });

  // Block images (speeds up tests)
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

  // Spy on requests
  page.on('request', req => console.log('→', req.method(), req.url()));
  page.on('response', res => console.log('←', res.status(), res.url()));

  await page.goto('https://automationexercise.com');
});`,
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright\'ta bir API çağrısını sahte veriyle yanıtlamak için hangi metod kullanılır?', en: 'Which method in Playwright intercepts an API call and returns fake data?' },
        options: [
          { id: 'a', text: 'page.intercept()' },
          { id: 'b', text: 'page.route() + route.fulfill()' },
          { id: 'c', text: 'page.mockAPI()' },
          { id: 'd', text: 'page.stub()' },
        ],
        correct: 'b',
        explanation: { tr: 'page.route() + route.fulfill() ile API yanıtı taklit edilir.', en: 'page.route(pattern, handler) with route.fulfill() returns fake responses. route.continue() modifies and forwards to the real server.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Bir API yanıtını Playwright kullanarak mock'lamak için hangi ikili kullanılır?",
            "en": "Which combination is used to mock an API response using Playwright?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "page.intercept + response.send"
            },
            {
                  "id": "b",
                  "text": "page.route() + route.fulfill()"
            },
            {
                  "id": "c",
                  "text": "page.mock() + route.send()"
            },
            {
                  "id": "d",
                  "text": "page.handle() + route.mock()"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "API yanıtlarını taklit etmek için page.route() ile rota tanımlanır ve route.fulfill() ile özel bir JSON veya durum kodu döndürülür.",
            "en": "To mock API responses, a route is defined with page.route(), and a custom JSON or status code is returned using route.fulfill()."
      }
}
},
    ],
  },
}

const s7 = {
  tr: {
    title: '🌍 Gerçek Hayat — E-Ticaret Tam Senaryo',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'Gerçek bir QA mühendisi olarak çalıştığını düşün. Görevin: "Kullanıcı giriş yapar, ürün arar, sepete ekler, ödeme yapar" akışını test et. Aşağıda bu senaryonun TypeScript, Java ve Python ile tam implementasyonu var.',
      },
      {
        type: 'callout', color: 'blue', emoji: '🎯',
        title: 'Test Senaryosu',
        content: '1) automationexercise.com\'a git  2) Kayıt ol / Giriş yap  3) "Dress" ara  4) İlk ürünü sepete ekle  5) Sepete git  6) Ödeme bilgilerini doldur  7) Siparişi tamamla  8) Sipariş onay sayfasını doğrula',
      },
      { type: 'heading', text: 'TypeScript — Tam E2E Test' },
      {
        type: 'code', language: 'TypeScript',
        code: `// e2e/ecommerce.spec.ts — Tam e-ticaret senaryosu
import { test, expect } from '@playwright/test';

test.describe('E-Ticaret Akış Testi', () => {

  test('kayıt → ürün → sepet → ödeme', async ({ page }) => {

    // ─── 1. ANASAYFAYA GİT ───────────────────────────────────────
    await page.goto('https://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);        // başlık doğrula

    // ─── 2. KAYIT / GİRİŞ ────────────────────────────────────────
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page).toHaveURL(/login/);

    // Yeni kayıt
    await page.locator('[data-qa="signup-name"]').fill('Test User');
    await page.locator('[data-qa="signup-email"]').fill(\`test\${Date.now()}@example.com\`);
    await page.locator('[data-qa="signup-button"]').click();

    // Kayıt formu — kişisel bilgiler
    await page.locator('#id_gender1').check();                    // Bay
    await page.locator('#password').fill('Secure@123!');
    await page.locator('#first_name').fill('Test');
    await page.locator('#last_name').fill('User');
    await page.locator('#address1').fill('123 Test Street');
    await page.locator('#country').selectOption('Canada');
    await page.locator('#state').fill('Ontario');
    await page.locator('#city').fill('Toronto');
    await page.locator('#zipcode').fill('M5V 3L9');
    await page.locator('#mobile_number').fill('5551234567');
    await page.locator('[data-qa="create-account"]').click();

    // Kayıt başarı doğrula
    await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click();

    // ─── 3. ÜRÜN ARA ─────────────────────────────────────────────
    await page.getByRole('link', { name: 'Products' }).click();
    await page.locator('#search_product').fill('Dress');          // arama yap
    await page.locator('#submit_search').click();

    await expect(page.locator('.product-image-wrapper')).toHaveCount(
      await page.locator('.product-image-wrapper').count()        // en az 1 sonuç
    );

    // ─── 4. ÜRÜNÜ SEPETE EKLE ────────────────────────────────────
    const firstProduct = page.locator('.product-image-wrapper').first();
    await firstProduct.hover();                                   // hover ile "Add to Cart" göster
    await firstProduct.getByText('Add to cart').click();

    // Modal çıktı — "Continue Shopping" veya "View Cart" seç
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // ─── 5. SEPET SAYFASI ─────────────────────────────────────────
    await page.locator('#cart_items').getByRole('link', { name: 'Cart' }).click();
    await expect(page.locator('.cart_product')).toHaveCount(1);  // 1 ürün var mı?

    // ─── 6. ÖDEMEYE GEÇ ───────────────────────────────────────────
    await page.getByText('Proceed To Checkout').click();

    // Sipariş notu
    await page.locator('#ordermsg textarea').fill('Lütfen dikkatli paketleyin');
    await page.getByText('Place Order').click();

    // ─── 7. ÖDEME BİLGİLERİ ──────────────────────────────────────
    await page.locator('[data-qa="name-on-card"]').fill('Test User');
    await page.locator('[data-qa="card-number"]').fill('4111111111111111');
    await page.locator('[data-qa="cvc"]').fill('123');
    await page.locator('[data-qa="expiry-month"]').fill('12');
    await page.locator('[data-qa="expiry-year"]').fill('2027');
    await page.locator('[data-qa="pay-button"]').click();

    // ─── 8. SİPARİŞ ONAYI ─────────────────────────────────────────
    await expect(page.getByText('ORDER PLACED!')).toBeVisible();  // onay mesajı
    await expect(page).toHaveURL(/order_placed/);                 // URL doğrula

    // Screenshot al — kanıt olarak sakla
    await page.screenshot({ path: 'evidence/order-confirmed.png', fullPage: true });
  });
});`,
      },
      { type: 'heading', text: 'Java — Aynı Senaryo' },
      {
        type: 'code', language: 'Java',
        code: `// EcommerceTest.java — Java Playwright E2E testi
import com.microsoft.playwright.*;
import com.microsoft.playwright.options.*;
import org.junit.jupiter.api.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;
import java.util.regex.Pattern;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EcommerceTest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;

    @BeforeAll
    static void setup() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch(
            new BrowserType.LaunchOptions().setHeadless(false)
        );
    }

    @BeforeEach
    void createContext() {
        context = browser.newContext();
        page = context.newPage();
    }

    @Test
    @Order(1)
    void testFullEcommerceFlow() {
        // 1. Anasayfaya git
        page.navigate("https://automationexercise.com");
        assertThat(page).hasTitle(Pattern.compile("Automation Exercise"));

        // 2. Giriş yap
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Signup / Login")).click();
        page.locator("[data-qa='login-email']").fill("existing@test.com");
        page.locator("[data-qa='login-password']").fill("Secure@123!");
        page.locator("[data-qa='login-button']").click();
        assertThat(page.getByText("Logged in as")).isVisible();

        // 3. Ürün ara
        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Products")).click();
        page.locator("#search_product").fill("Dress");
        page.locator("#submit_search").click();

        // 4. Sepete ekle
        page.locator(".product-image-wrapper").first().hover();
        page.locator(".product-image-wrapper").first()
            .getByText("Add to cart").click();
        page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Continue Shopping")).click();

        // 5. Sepet
        page.navigate("https://automationexercise.com/view_cart");
        assertThat(page.locator(".cart_product")).hasCount(1);

        // 6. Ödeme
        page.getByText("Proceed To Checkout").click();
        page.getByText("Place Order").click();

        // 7. Kart bilgileri
        page.locator("[data-qa='name-on-card']").fill("Test User");
        page.locator("[data-qa='card-number']").fill("4111111111111111");
        page.locator("[data-qa='cvc']").fill("123");
        page.locator("[data-qa='expiry-month']").fill("12");
        page.locator("[data-qa='expiry-year']").fill("2027");
        page.locator("[data-qa='pay-button']").click();

        // 8. Onay
        assertThat(page.getByText("ORDER PLACED!")).isVisible();
        page.screenshot(new Page.ScreenshotOptions()
            .setPath(Paths.get("evidence/order-confirmed.png"))
            .setFullPage(true));
    }

    @AfterEach
    void cleanup() { context.close(); }

    @AfterAll
    static void teardown() {
        browser.close();
        playwright.close();
    }
}`,
      },
      { type: 'heading', text: 'Python — Aynı Senaryo' },
      {
        type: 'code', language: 'Python',
        code: `# test_ecommerce.py — Python Playwright E2E testi
import pytest
import re
import time
from playwright.sync_api import Page, expect

@pytest.fixture
def logged_in_page(page: Page):
    """Login fixture — her testte yeniden login yapmayı önler"""
    page.goto("https://automationexercise.com/login")
    page.locator("[data-qa='login-email']").fill("existing@test.com")
    page.locator("[data-qa='login-password']").fill("Secure@123!")
    page.locator("[data-qa='login-button']").click()
    expect(page.get_by_text("Logged in as")).to_be_visible()
    return page

def test_full_ecommerce_flow(logged_in_page: Page):
    page = logged_in_page

    # 3. Ürün ara
    page.get_by_role("link", name="Products").click()
    page.locator("#search_product").fill("Dress")
    page.locator("#submit_search").click()

    # 4. İlk ürünü sepete ekle
    first = page.locator(".product-image-wrapper").first()
    first.hover()                                                   # hover ile butonu göster
    first.get_by_text("Add to cart").click()
    page.get_by_role("button", name="Continue Shopping").click()

    # 5. Sepete git
    page.goto("https://automationexercise.com/view_cart")
    expect(page.locator(".cart_product")).to_have_count(1)         # 1 ürün

    # 6. Ödeme adımları
    page.get_by_text("Proceed To Checkout").click()
    page.get_by_text("Place Order").click()

    # 7. Kart bilgileri
    page.locator("[data-qa='name-on-card']").fill("Test User")
    page.locator("[data-qa='card-number']").fill("4111111111111111")
    page.locator("[data-qa='cvc']").fill("123")
    page.locator("[data-qa='expiry-month']").fill("12")
    page.locator("[data-qa='expiry-year']").fill("2027")
    page.locator("[data-qa='pay-button']").click()

    # 8. Sipariş onayı
    expect(page.get_by_text("ORDER PLACED!")).to_be_visible()
    expect(page).to_have_url(re.compile("order_placed"))

    # Kanıt screenshot
    page.screenshot(path="evidence/order-confirmed.png", full_page=True)

# Paralel çalıştır: pytest test_ecommerce.py -n 4 --headed`,
      },
      {
        type: 'quiz',
        question: 'Yukarıdaki uçtan uca checkout senaryosunda, "Siparişi tamamla" adımından SONRA gelen "Sipariş onayını doğrula" adımı neden ayrı bir assertion gerektirir?',
        options: [
          { id: 'a', text: 'Çünkü ödeme her zaman başarısız olur' },
          { id: 'b', text: 'Çünkü bir butona tıklamak, işlemin gerçekten sunucu tarafında başarıyla tamamlandığını kanıtlamaz — UI state ile backend state ayrı doğrulanmalı' },
          { id: 'c', text: 'Çünkü Playwright otomatik olarak sipariş onayını doğrulamaz' },
          { id: 'd', text: 'Çünkü ekran görüntüsü almak zorunludur' },
        ],
        correct: 'b',
        explanation: 'Bir butona (ör. "Place Order") tıklamak sadece bir UI eylemidir — sunucunun isteği kabul ettiğini, ödemeyi işlediğini ve siparişi gerçekten oluşturduğunu garanti etmez. Bu yüzden test, "ORDER PLACED!" metnini ve URL\'in order_placed içerdiğini AYRICA doğrular. Java/JUnit\'te bir POST isteği gönderip sadece HTTP 200 almakla, response body\'deki gerçek veriyi assert etmek arasındaki farkla aynı mantık.',
        retryQuestion: {
          question: 'Bir test sadece `await page.click(\'#placeOrderBtn\')` çağırıp hiçbir assertion yapmazsa, sipariş gerçekte başarısız olsa bile test neden yine de "geçer"?',
          options: [
            { id: 'a', text: 'Playwright her tıklamayı otomatik doğrular' },
            { id: 'b', text: 'Test, hiçbir koşulu kontrol etmediği için sadece tıklamanın çalışıp çalışmadığına bakar — sonucun ne olduğuna değil' },
            { id: 'c', text: 'Sunucu her zaman başarılı yanıt döner' },
            { id: 'd', text: 'click() metodu otomatik olarak HTTP durumunu kontrol eder' },
          ],
          correct: 'b',
          explanation: 'Bir test sadece bir aksiyon çalıştırıp (`click()`) hiçbir `expect()`/assertion içermiyorsa, "geçme" kriteri sadece o satırın exception fırlatmadan çalışmasıdır — backend\'in isteği gerçekten kabul edip etmediğiyle hiç ilgisi yoktur. Bu yüzden her kritik aksiyondan sonra UI\'da veya backend\'de gözlemlenebilir bir sonucu (metin, URL, API yanıtı) doğrulayan bir assertion eklemek zorunludur.',
        },
      },
    ],
  },
  en: {
    title: '🌍 Real World — E-Commerce Full Scenario',
    blocks: [
      {
        type: 'simple-box', emoji: '🛒',
        content: 'Imagine you\'re a real QA engineer. Your task: test the "user logs in, searches for a product, adds to cart, completes payment" flow. Below is the full implementation of this scenario in TypeScript, Java, and Python.',
      },
      {
        type: 'code', language: 'TypeScript',
        code: `// e2e/ecommerce.spec.ts — Full E2E test
import { test, expect } from '@playwright/test';

test('register → product → cart → payment', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Login
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('[data-qa="login-email"]').fill('test@example.com');
  await page.locator('[data-qa="login-password"]').fill('Secure@123!');
  await page.locator('[data-qa="login-button"]').click();

  // Search product
  await page.getByRole('link', { name: 'Products' }).click();
  await page.locator('#search_product').fill('Dress');
  await page.locator('#submit_search').click();

  // Add to cart
  const first = page.locator('.product-image-wrapper').first();
  await first.hover();
  await first.getByText('Add to cart').click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // View cart
  await page.goto('https://automationexercise.com/view_cart');
  await expect(page.locator('.cart_product')).toHaveCount(1);

  // Checkout
  await page.getByText('Proceed To Checkout').click();
  await page.getByText('Place Order').click();

  // Payment
  await page.locator('[data-qa="name-on-card"]').fill('Test User');
  await page.locator('[data-qa="card-number"]').fill('4111111111111111');
  await page.locator('[data-qa="cvc"]').fill('123');
  await page.locator('[data-qa="expiry-month"]').fill('12');
  await page.locator('[data-qa="expiry-year"]').fill('2027');
  await page.locator('[data-qa="pay-button"]').click();

  // Confirm
  await expect(page.getByText('ORDER PLACED!')).toBeVisible();
  await page.screenshot({ path: 'evidence/order-confirmed.png', fullPage: true });
});`,
      },
      {
        type: 'quiz',
        question: 'In the end-to-end checkout scenario above, why does the "verify order confirmation" step AFTER "complete the order" require a separate assertion?',
        options: [
          { id: 'a', text: 'Because payment always fails' },
          { id: 'b', text: "Because clicking a button doesn't prove the operation actually succeeded server-side — UI state and backend state must be verified separately" },
          { id: 'c', text: 'Because Playwright automatically verifies order confirmation' },
          { id: 'd', text: 'Because taking a screenshot is mandatory' },
        ],
        correct: 'b',
        explanation: 'Clicking a button (e.g. "Place Order") is only a UI action — it does not guarantee the server accepted the request, processed payment, and actually created the order. That\'s why the test ALSO asserts the "ORDER PLACED!" text and that the URL contains order_placed. Same logic as in Java/JUnit: sending a POST request and only checking for HTTP 200 is not the same as asserting the actual data in the response body.',
        retryQuestion: {
          question: 'If a test only calls `await page.click(\'#placeOrderBtn\')` with no assertion at all, why does the test still "pass" even if the order actually failed?',
          options: [
            { id: 'a', text: 'Playwright automatically verifies every click' },
            { id: 'b', text: 'Without any condition being checked, the test only cares whether the click itself ran — not what the outcome was' },
            { id: 'c', text: 'The server always returns a success response' },
            { id: 'd', text: 'The click() method automatically checks the HTTP status' },
          ],
          correct: 'b',
          explanation: "If a test only runs an action (`click()`) with no `expect()`/assertion, its only \"pass\" criterion is that the line ran without throwing — it has nothing to do with whether the backend actually accepted the request. That's why every critical action needs a follow-up assertion verifying an observable outcome (text, URL, API response) in the UI or backend.",
        },
      },
    ],
  },
}

const s8 = {
  tr: {
    title: '🚨 Yaygın Hatalar — Hata Sözlüğü',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Hata mesajları seni korkutmasın. Playwright\'ın hata mesajları oldukça açıklayıcıdır — mesajı okuyunca genellikle ne yapman gerektiğini anlarsın. Aşağıdaki 10 hata en sık karşılaşılanlardır.',
      },
      {
        type: 'error-dictionary',
        framework: 'Playwright',
        errors: [
          {
            error: 'TimeoutError: locator.click: Timeout 30000ms exceeded',
            fullMessage: 'TimeoutError: locator.click: Timeout 30000ms exceeded.\nCall log:\n  - waiting for locator("#submit-btn") to be visible',
            cause: { tr: 'Element 30 saniye içinde bulunamadı/görülemedi. Yanlış locator, element henüz yüklenmediyse veya farklı bir iframe içindeyse oluşur.', en: 'Element not found/visible within 30 seconds. Wrong locator, element not yet loaded, or inside an iframe.' },
            solution: { tr: '1) DevTools\'da locator\'ı kontrol et. 2) Element bir iframe içindeyse frameLocator() kullan. 3) Timeout\'u artır: locator.click({timeout:60000}). 4) waitFor() ile state bekle.', en: '1) Check locator in DevTools. 2) If inside iframe use frameLocator(). 3) Increase timeout: click({timeout:60000}). 4) Use waitFor() for state.' },
            codeWrong: `// YANLIŞ — element iframe içinde ama frameLocator yok
await page.locator('#card-number').fill('4111');   // TimeoutError!`,
            codeFixed: `// DOĞRU — iframe içindeyse frameLocator kullan
const frame = page.frameLocator('iframe[src*="payment"]');
await frame.locator('#card-number').fill('4111');  // çalışır`,
          },
          {
            error: 'Error: strict mode violation: locator resolved to X elements',
            fullMessage: 'Error: strict mode violation: locator(".button") resolved to 5 elements',
            cause: { tr: 'Locator birden fazla elementi eşleştiriyor. Playwright strict mode\'da tek eşleşme bekler.', en: 'The locator matches multiple elements. Playwright strict mode expects a single match.' },
            solution: { tr: '1) Daha özgün bir locator yaz. 2) .first()/.last()/.nth(n) kullan. 3) .filter() ile daralt.', en: '1) Write a more specific locator. 2) Use .first()/.last()/.nth(n). 3) Narrow down with .filter().' },
            codeWrong: `// YANLIŞ — ".btn" birden fazla elementi eşleştiriyor
await page.locator('.btn').click();   // strict mode violation!`,
            codeFixed: `// DOĞRU — 3 seçenek
await page.getByRole('button', { name: 'Submit' }).click();  // 1) rol + isim
await page.locator('.btn').first().click();                   // 2) ilk element
await page.locator('.product').filter({ hasText: 'Nike' })   // 3) filtrele
          .locator('.btn').click();`,
          },
          {
            error: 'Error: page.goto: net::ERR_CONNECTION_REFUSED',
            fullMessage: 'Error: page.goto: net::ERR_CONNECTION_REFUSED at https://localhost:3000',
            cause: { tr: 'Hedef sunucu çalışmıyor. Local dev server başlatılmamış veya yanlış port kullanılıyor.', en: 'Target server is not running. Local dev server not started or wrong port used.' },
            solution: { tr: '1) npm run dev / mvn spring-boot:run ile sunucuyu başlat. 2) playwright.config.ts\'te baseURL\'i kontrol et. 3) Test öncesinde webServer ayarı kullan.', en: '1) Start the server with npm run dev / mvn spring-boot:run. 2) Check baseURL in playwright.config.ts. 3) Use webServer config option.' },
            codeWrong: `// playwright.config.ts — baseURL yanlış
use: { baseURL: 'http://localhost:3000' }  // ama sunucu 8080'de çalışıyor`,
            codeFixed: `// DOĞRU — port ve webServer ayarı
webServer: {
  command: 'npm run dev',        // test öncesi sunucuyu otomatik başlat
  url: 'http://localhost:8080',
  reuseExistingServer: true,
},
use: { baseURL: 'http://localhost:8080' }`,
          },
          {
            error: 'Error: page has been closed',
            fullMessage: 'Error: page.locator.click: Target page, context or browser has been closed',
            cause: { tr: 'Test bittikten sonra page nesnesi üzerinde aksiyon yapılmaya çalışıldı. Genellikle async/await eksikliğinden kaynaklanan race condition.', en: 'An action was attempted on a page object after the test completed. Usually a race condition from missing async/await.' },
            solution: { tr: 'TypeScript\'te tüm Playwright çağrılarının önünde await olduğunu kontrol et. waitForEvent() veya waitForResponse() için Promise.all kullan.', en: 'Ensure all Playwright calls in TypeScript have await. Use Promise.all for waitForEvent() or waitForResponse().' },
            codeWrong: `// YANLIŞ — await eksik
page.locator('#btn').click();         // await yok — race condition
page.waitForURL('/dashboard');         // await yok`,
            codeFixed: `// DOĞRU — await her zaman
await page.locator('#btn').click();
await page.waitForURL('/dashboard');`,
          },
          {
            error: 'TimeoutError: expect(locator).toBeVisible() timeout',
            fullMessage: 'TimeoutError: expect(locator).toBeVisible() failed\nExpected: visible\nReceived: hidden',
            cause: { tr: 'expect() assertion\'ı default 5000ms içinde başarılı olamadı. Element var ama görünmüyor veya yüklenme çok uzun sürüyor.', en: 'The expect() assertion failed to succeed within the default 5000ms. The element exists but is hidden or loading takes too long.' },
            solution: { tr: '1) expect timeout\'unu artır: expect(locator, {timeout:10000}).toBeVisible(). 2) Assertion\'dan önce explicit wait ekle. 3) Doğru elementi hedeflediğini kontrol et.', en: '1) Increase assertion timeout: expect(locator, {timeout:10000}).toBeVisible(). 2) Add explicit wait before assertion. 3) Verify you\'re targeting the correct element.' },
            codeWrong: `// Yüklenme geç olunca timeout
await expect(page.locator('#result')).toBeVisible(); // 5s içinde görünmeyince hata`,
            codeFixed: `// Timeout artır
await expect(page.locator('#result')).toBeVisible({ timeout: 15_000 });

// YA DA önce bekle, sonra doğrula
await page.locator('#result').waitFor({ state: 'visible', timeout: 15_000 });
await expect(page.locator('#result')).toBeVisible();`,
          },
          {
            error: 'Error: browserType.launch: Executable doesn\'t exist',
            fullMessage: 'Error: browserType.launch: Executable doesn\'t exist at /home/user/.cache/ms-playwright/chromium-xxx/chrome-linux/chrome',
            cause: { tr: 'Playwright tarayıcıları indirilmemiş. "playwright install" komutu çalıştırılmamış veya CI ortamında eksik.', en: 'Playwright browsers not downloaded. "playwright install" was not run, or missing in CI environment.' },
            solution: { tr: '1) npx playwright install komutu çalıştır. 2) CI\'da: npx playwright install --with-deps. 3) Java\'da: mvn exec:java ... -D exec.args="install"', en: '1) Run npx playwright install. 2) In CI: npx playwright install --with-deps. 3) In Java: mvn exec:java ... -D exec.args="install"' },
            codeWrong: `# pip install playwright yaptın ama ikinci adımı unuttun
import playwright  # kurulu
browser = playwright.chromium.launch()  # ❌ tarayıcı bulunamadı!`,
            codeFixed: `# Önce tarayıcıları indir
# playwright install   ← terminalde çalıştır

from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()  # ✅ artık çalışır`,
          },
        ],
      },
      {
        type: 'quiz',
        question: '`webServer: { command: "npm run dev", url: "http://localhost:8080" }` konfigürasyonu eksikken Playwright testleri "ECONNREFUSED" hatasıyla başarısız oluyorsa, en olası neden nedir?',
        options: [
          { id: 'a', text: 'Playwright sürümü eski' },
          { id: 'b', text: 'Test, uygulama sunucusu henüz başlamadan/dinlemeden tarayıcıyı o adrese yönlendirmeye çalışıyor' },
          { id: 'c', text: 'Tarayıcı binary\'si indirilmemiş' },
          { id: 'd', text: 'baseURL alanı zorunlu değildir' },
        ],
        correct: 'b',
        explanation: '`webServer` config bloğu olmadan Playwright, dev sunucusunun zaten ayakta olduğunu varsayar. Sunucu henüz dinlemiyorsa bağlantı reddedilir (ECONNREFUSED). `webServer` ayarı, testler başlamadan önce komutu çalıştırıp `url` alanındaki adres yanıt verene kadar bekler — CI ortamında bir Spring Boot/Express sunucusunu testlerden önce ayağa kaldırıp health-check beklemekle aynı mantık.',
        retryQuestion: {
          question: '`webServer` config\'inde `url` alanını YANLIŞ bir port (örn. uygulamanın gerçekte dinlediği port değil) olarak ayarlarsan ne olur?',
          options: [
            { id: 'a', text: 'Playwright otomatik olarak doğru portu bulur' },
            { id: 'b', text: 'Playwright o yanlış URL\'i sonsuza kadar (timeout\'a kadar) yoklar, sunucu gerçekte hazır olsa bile testler başlamaz' },
            { id: 'c', text: 'Test hemen başarısız olur, hiç beklemez' },
            { id: 'd', text: 'webServer ayarı tamamen devre dışı kalır' },
          ],
          correct: 'b',
          explanation: '`webServer.url`, Playwright\'in "sunucu hazır" kabul etmek için yokladığı (poll ettiği) adrestir. Yanlış bir port verilirse, gerçek sunucu farklı bir portta tamamen sağlıklı çalışıyor olsa bile Playwright o yanlış adresten asla 200 alamaz ve sonunda timeout ile başarısız olur — sorunun görünürdeki belirtisi "sunucu başlamadı" gibi görünse de gerçek kök neden yanlış yapılandırılmış URL\'dir.',
        },
      },
    ],
  },
  en: {
    title: '🚨 Common Errors — Error Dictionary',
    blocks: [
      {
        type: 'simple-box', emoji: '🔧',
        content: 'Don\'t let error messages scare you. Playwright\'s error messages are quite descriptive — reading them usually tells you what to do. The 6 errors below are the most common ones you\'ll encounter.',
      },
      {
        type: 'error-dictionary',
        framework: 'Playwright',
        errors: [
          {
            error: 'TimeoutError: locator.click: Timeout 30000ms exceeded',
            fullMessage: 'TimeoutError: locator.click: Timeout 30000ms exceeded.\nCall log:\n  - waiting for locator("#submit-btn") to be visible',
            cause: { tr: 'Element 30 saniye içinde bulunamadı.', en: 'Element not found/visible within 30 seconds. Wrong locator, not yet loaded, or inside an iframe.' },
            solution: { tr: '1) Locator\'ı kontrol et. 2) frameLocator() kullan. 3) Timeout artır.', en: '1) Check locator in DevTools. 2) Use frameLocator() if inside iframe. 3) Increase timeout.' },
            codeWrong: `// Wrong — element is inside iframe but no frameLocator
await page.locator('#card-number').fill('4111');   // TimeoutError!`,
            codeFixed: `// Correct — use frameLocator for iframe content
const frame = page.frameLocator('iframe[src*="payment"]');
await frame.locator('#card-number').fill('4111');`,
          },
          {
            error: 'Error: strict mode violation: locator resolved to X elements',
            fullMessage: 'Error: strict mode violation: locator(".button") resolved to 5 elements',
            cause: { tr: 'Locator birden fazla elementi eşleştiriyor.', en: 'The locator matches multiple elements. Playwright strict mode expects exactly one match.' },
            solution: { tr: 'Daha özgün locator, .first(), veya .filter() kullan.', en: 'Write a more specific locator, use .first()/.nth(n), or narrow down with .filter().' },
            codeWrong: `// Wrong — ".btn" matches multiple elements
await page.locator('.btn').click();   // strict mode violation!`,
            codeFixed: `// Correct
await page.getByRole('button', { name: 'Submit' }).click();
// or
await page.locator('.btn').first().click();`,
          },
          {
            error: 'Error: page.goto: net::ERR_CONNECTION_REFUSED',
            fullMessage: 'Error: page.goto: net::ERR_CONNECTION_REFUSED at https://localhost:3000',
            cause: { tr: 'Sunucu çalışmıyor.', en: 'Target server is not running or wrong port.' },
            solution: { tr: 'Sunucuyu başlat, webServer config kullan.', en: 'Start the server first, or use playwright.config.ts webServer option to auto-start.' },
            codeWrong: `// Wrong baseURL in playwright.config.ts
use: { baseURL: 'http://localhost:3000' }  // server runs on 8080!`,
            codeFixed: `// Correct — with auto-start
webServer: { command: 'npm run dev', url: 'http://localhost:8080' },
use: { baseURL: 'http://localhost:8080' }`,
          },
        ],
      },
      {
        type: 'quiz',
        question: 'If Playwright tests fail with "ECONNREFUSED" when the `webServer: { command: "npm run dev", url: "http://localhost:8080" }` config is missing, what is the most likely cause?',
        options: [
          { id: 'a', text: 'The Playwright version is outdated' },
          { id: 'b', text: "The test is navigating the browser to that address before the app server has started listening" },
          { id: 'c', text: 'The browser binary was not downloaded' },
          { id: 'd', text: 'The baseURL field is not required' },
        ],
        correct: 'b',
        explanation: "Without the `webServer` config block, Playwright assumes the dev server is already running. If the server isn't listening yet, the connection is refused (ECONNREFUSED). The `webServer` setting runs the command and waits for the `url` to respond before tests start — the same logic as spinning up a Spring Boot/Express server and waiting on a health check before running tests in CI.",
        retryQuestion: {
          question: 'What happens if you set the `webServer` config\'s `url` field to the WRONG port (not the one the app actually listens on)?',
          options: [
            { id: 'a', text: 'Playwright automatically finds the correct port' },
            { id: 'b', text: 'Playwright keeps polling that wrong URL until timeout, and tests never start even though the server is actually ready' },
            { id: 'c', text: 'The test fails immediately with no waiting' },
            { id: 'd', text: 'The webServer setting is disabled entirely' },
          ],
          correct: 'b',
          explanation: '`webServer.url` is the address Playwright polls to consider the server "ready." If given the wrong port, Playwright will never get a 200 from that wrong address even if the real server is perfectly healthy on a different port — it eventually fails with a timeout. The visible symptom looks like "server never started," but the real root cause is a misconfigured URL.',
        },
      },
    ],
  },
}
const s9 = {
  tr: {
    title: '💼 50 Mülakat Sorusu',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'Bu 50 soru, Junior → Senior Playwright QA mülakatlarında gerçekten sorulan sorulardır. "Basic" seviyeyi geçemeden "Advanced"e bakma — temeli sağlam tut.',
      },
      {
        type: 'interview-questions',
        topic: 'Playwright',
        questions: [
          { level: 'basic', q: 'Playwright nedir ve Selenium\'dan farkı nedir?', a: 'Playwright, Microsoft\'un 2020\'de geliştirdiği modern tarayıcı otomasyon kütüphanesidir. TypeScript, JavaScript, Python, Java ve C# destekler. En önemli farkı: auto-wait sayesinde elementlerin yüklenmesini otomatik bekler, explicit wait yazmak gerekmez. Tek API ile Chromium, Firefox ve WebKit kontrolü sağlar.' },
          { level: 'basic', q: 'Playwright kurulumu nasıl yapılır? (TypeScript için)', a: 'npm init playwright@latest komutu çalıştırılır. @playwright/test paketi yüklenir, playwright.config.ts oluşturulur, tarayıcılar indirilir (npx playwright install), örnek test dosyaları oluşturulur. Ardından npx playwright test ile testler çalıştırılır.' },
          { level: 'basic', q: 'Playwright\'ta tarayıcı nasıl başlatılır ve kapatılır?', a: 'Test framework\'te browser yönetimi otomatiktir. Manuel: const browser = await playwright.chromium.launch(); const page = await browser.newPage(); ... await browser.close(). Java\'da: Browser browser = playwright.chromium().launch(); Page page = browser.newPage(); ... browser.close();' },
          { level: 'basic', q: 'page.goto() nedir ve nasıl kullanılır?', a: 'page.goto(url) ile belirtilen URL\'ye gidilir, varsayılan olarak load event\'ini bekler. Opsiyonel: page.goto(url, { waitUntil: "networkidle" }). Java\'da: page.navigate("https://example.com");' },
          { level: 'basic', q: 'Playwright\'ta element nasıl bulunur?', a: 'Önerilen sıra: 1) getByRole() — aria role ile (en iyi pratik), 2) getByText() — görünür metin ile, 3) getByLabel() — form label ile, 4) getByTestId() — data-testid ile, 5) locator(css/xpath). Selenium\'dan farkı: ID/class/xpath yerine anlam taşıyan locator\'lar tercih edilir.' },
          { level: 'basic', q: 'click(), fill(), type() metodları arasındaki fark nedir?', a: 'fill() inputu temizler sonra değeri tek seferde yazar — hızlıdır, production\'da tercih edilir. type() klavye tuşlarını birer birer simüle eder — key event dinleyen inputlar için gereklidir. click() elementin tıklanabilir olmasını bekler, hover+focus+click yapar.' },
          { level: 'basic', q: 'Playwright\'ta auto-wait mekanizması nasıl çalışır?', a: 'Her aksiyon (click, fill vb.) öncesinde element\'in visible, stable, enabled ve editable durumunu otomatik bekler. Thread.sleep() veya explicit WebDriverWait yazmak gerekmez. Ek bekleme gerekirse: await page.waitForURL(pattern), await locator.waitFor({ state: "visible" }) kullanılır.' },
          { level: 'basic', q: 'expect() ile assertion nasıl yapılır?', a: 'await expect(locator).toBeVisible() — görünür mü?, await expect(locator).toHaveText("text") — içerik doğru mu?, await expect(page).toHaveURL(/pattern/) — URL doğru mu?, await expect(locator).toHaveCount(3) — sayı. Java: assertThat(page.locator("#id")).isVisible();' },
          { level: 'basic', q: 'playwright.config.ts nedir, ne içerir?', a: 'Merkezi konfigürasyon: baseURL, timeout, retries, workers, projects (tarayıcı/viewport), reporter (console/html/junit), use (headless, screenshot, video). Maven\'daki pom.xml\'e benzer.' },
          { level: 'basic', q: 'Headless ve headed mod arasındaki fark nedir?', a: 'Headless: tarayıcı arayüzü yok — CI/CD\'de tercih edilir, hızlıdır. Headed: gerçek tarayıcı penceresi — debug için. chromium.launch({ headless: false }) headed, headless: true (default) headless. Config: use: { headless: false }.' },
          { level: 'basic', q: 'Screenshot nasıl alınır?', a: 'page.screenshot({ path: "s.png" }) viewport; page.screenshot({ path: "s.png", fullPage: true }) tam sayfa. Element: locator.screenshot({ path: "el.png" }). Config: use: { screenshot: "on" } her test sonrası otomatik, "only-on-failure" sadece hata olunca.' },
          { level: 'basic', q: 'Video kayıt nasıl yapılır?', a: 'Config\'de use: { video: "on" } veya "retain-on-failure". Testler sonrası test-results/ klasöründe video oluşur. Manuel: browser.newContext({ recordVideo: { dir: "videos/" } }) — context.close() ile kaydedilir.' },
          { level: 'basic', q: 'Playwright\'ta test nasıl çalıştırılır?', a: 'npx playwright test — tüm testler; npx playwright test login.spec.ts — belirli dosya; --grep "login" — regex filtre; --headed — tarayıcıyla; --ui — interaktif UI mode; --debug — Playwright Inspector adım adım. Java: mvn test -Dtest=LoginTest.' },
          { level: 'basic', q: 'getByRole() neden en çok tercih edilir?', a: 'ARIA standartlarına göre arar: 1) CSS class değişse test kırılmaz, 2) Accessibility uyumludur, 3) Kullanıcının gördüğünü hedefler. page.getByRole("button", { name: "Submit" }) butonu bulur. Selenium\'da By.cssSelector(".btn") kırılgandır.' },
          { level: 'basic', q: 'Playwright\'ta test raporu nasıl üretilir?', a: 'npx playwright test --reporter=html ile HTML rapor üretilir. npx playwright show-report tarayıcıda açar. Config: reporter: [["html", { open: "never" }], ["junit", { outputFile: "results.xml" }]]. junit reporter Jenkins/GitLab entegrasyonu için kullanılır.' },
          { level: 'intermediate', q: 'Page Object Model (POM) Playwright\'ta nasıl uygulanır?', a: 'Her sayfa için class, constructor\'a Page: class LoginPage { constructor(page) { this.emailInput = page.locator("[data-qa=\'login-email\']"); } async login(e, p) { await this.emailInput.fill(e); } }. Test\'te: const lp = new LoginPage(page); await lp.login(). Java POM ile birebir aynıdır.' },
          { level: 'intermediate', q: 'fixtures nedir ve nasıl kullanılır?', a: 'test.extend() ile özel fixture: const test = base.extend({ loggedInPage: async ({ page }, use) => { await login(page); await use(page); } }); Her testte tekrar login yazmak yerine inject edilir. Java @BeforeEach+@AfterEach gibi ama daha modüler.' },
          { level: 'intermediate', q: 'beforeEach, afterEach, beforeAll, afterAll ne zaman kullanılır?', a: 'beforeEach: her test öncesi (login, sayfa). afterEach: her test sonrası (cleanup). beforeAll: suite başında bir kez (DB seed). afterAll: tüm testler bitince (browser kapat). Java @BeforeEach, @AfterEach, @BeforeAll, @AfterAll annotation\'ları ile aynıdır.' },
          { level: 'intermediate', q: 'iframe içindeki elementlere nasıl erişilir?', a: 'Selenium\'da driver.switchTo().frame(). Playwright\'ta frameLocator() — geçiş gerekmez: const frame = page.frameLocator(\'iframe[src*="payment"]\'); await frame.locator(\'#card-number\').fill(\'4111\'); İşlem sonrası otomatik ana frame\'e dönülür — switchTo().defaultContent() yazmak gerekmez.' },
          { level: 'intermediate', q: 'Alert, Confirm ve Prompt dialoglarını nasıl handle edersiniz?', a: 'page.on("dialog", dialog => dialog.accept()) ile accept, dialog.dismiss() ile red, dialog.fill("text") ile prompt değeri. Listener ÖNCE tanımlanmalı, tetikleyici aksiyon sonra. Selenium: driver.switchTo().alert().accept(). Playwright\'ta switchTo() yoktur.' },
          { level: 'intermediate', q: 'Çoklu sayfa (multi-tab) ve yeni pencere nasıl yönetilir?', a: 'const [newPage] = await Promise.all([context.waitForEvent("page"), page.getByText("Open Tab").click()]); await newPage.waitForLoadState(); Java: Page newPage = context.waitForPage(() -> page.click(loc)). Selenium driver.getWindowHandles() + switchTo().window() yerine.' },
          { level: 'intermediate', q: 'page.route() ile API interception nasıl yapılır?', a: 'await page.route("**/api/products", route => route.fulfill({ status: 200, body: JSON.stringify([{id:1}]) })); İstekleri yakalar, sahte yanıt döndürür. route.continue() gerçek sunucuya iletir, route.abort() engeller. Selenium\'da BrowserMob Proxy gibi harici araç gerekirdi.' },
          { level: 'intermediate', q: 'Playwright\'ta paralel test çalıştırma nasıl yapılır?', a: 'Config: workers: 4 (veya process.env.CI ? 2 : 4). Farklı dosyalar varsayılan paralel, aynı dosya sıralı. test.describe.parallel() aynı dosyada paralel, test.describe.serial() zorunda sıralı. Java JUnit 5 @Execution(ExecutionMode.CONCURRENT) gibi.' },
          { level: 'intermediate', q: 'Playwright Trace Viewer nedir?', a: 'Her aksiyonu, network isteğini, screenshot ve console log\'u kaydeder. Config: use: { trace: "on-first-retry" }. npx playwright show-trace trace.zip ile görüntülenir. CI\'da hata ayıklamak için idealdir.' },
          { level: 'intermediate', q: 'locator.filter() nasıl kullanılır?', a: 'page.locator(".product").filter({ hasText: "Nike" }) — sadece "Nike" içerenleri bulur. .filter({ has: page.locator(".in-stock") }) — içinde belirli element olanları. Java stream().filter() ile WebElement listesi filtrelemeye benzer ama okunabilirdir.' },
          { level: 'intermediate', q: 'Playwright\'ta test data nasıl yönetilir?', a: '1) fixtures/ klasöründe JSON/CSV, 2) @faker-js/faker ile random data, 3) request fixture ile API\'den data, 4) beforeAll\'da DB seed. En iyi pratik: her test kendi datasını oluşturur ve temizler. Shared mutable data paralelde çakışır.' },
          { level: 'intermediate', q: 'Authentication nasıl hızlandırılır?', a: 'storageState ile: 1) Login yapıp kaydet: await page.context().storageState({ path: "auth.json" }), 2) Testlerde yükle: use: { storageState: "auth.json" }. Login bir kez, cookie/localStorage tüm testlere. Java: Browser.NewContextOptions().setStorageStatePath(...).' },
          { level: 'intermediate', q: 'Visual regression testing nedir?', a: 'expect(page).toHaveScreenshot("home.png") referans alır, sonraki çalıştırmalarda pixel karşılaştırır. Güncelleme: --update-snapshots. Threshold: toHaveScreenshot({ maxDiffPixelRatio: 0.1 }). Built-in — Applitools gerekmez.' },
          { level: 'intermediate', q: 'Soft assertions nedir, ne zaman kullanılır?', a: 'Normal assertion başarısızlıkta testi durdurur. Soft: expect.soft(locator).toBeVisible() — tüm kontroller yapılır, sonda raporlanır. Form validasyonunda tüm hata mesajlarını tek geçişte kontrol etmek için idealdir. Java AssertJ SoftAssertions ile aynı konsept.' },
          { level: 'intermediate', q: 'Network request spy nasıl yapılır?', a: 'page.on("request", cb) ve page.on("response", cb). Belirli istek beklemek: const [resp] = await Promise.all([page.waitForResponse(r => r.url().includes("/api/data")), page.click("#load")]); const data = await resp.json(); Backend entegrasyon testleri için çok değerlidir.' },
          { level: 'advanced', q: 'BrowserContext nedir, Page\'den farkı nedir?', a: 'BrowserContext tarayıcı içinde izole oturum — kendi cookie, localStorage, session\'ına sahip ayrı "profil". Bir Context içinde birden fazla Page (sekme). Örnek: iki kullanıcıyı simüle için iki context. browser.newContext() ile context, context.newPage() ile sekme.' },
          { level: 'advanced', q: 'Playwright\'ı CI/CD pipeline\'ına nasıl entegre edersiniz?', a: 'GitHub Actions: npx playwright install --with-deps, npx playwright test. workers: process.env.CI ? 2 : 4. Artifacts: upload-artifact ile test-results/ ve playwright-report/. Jenkins: sh("npx playwright test --reporter=junit") + JUnit publish. Paralel: --shard=N/M + matrix strategy.' },
          { level: 'advanced', q: 'Test sharding nedir, nasıl kullanılır?', a: 'Büyük suite\'leri CI runner\'lara böler. 100 test, 4 runner: --shard=1/4, --shard=2/4 vb. Sonra: npx playwright merge-reports blob-reports/ tek rapor. GitHub Actions matrix strategy ile kurulur. Java Maven failsafe plugin fork count\'a benzer.' },
          { level: 'advanced', q: 'Component testing vs E2E testing farkı nedir?', a: '@playwright/experimental-ct-react ile React/Vue komponentleri izole test edilir. E2E: tüm uygulama gerçek tarayıcıda. Component: sadece komponent mount edilir — çok daha hızlı. const comp = await mount(<Button label="OK" />); await expect(comp).toContainText("OK");' },
          { level: 'advanced', q: 'request fixture ile API testing nasıl yapılır?', a: 'Built-in: const response = await request.post("/api/login", { data: { email, password } }); expect(response.status()).toBe(200); const body = await response.json(); APIRequestContext ile cookie taşıyarak authenticated çağrı. Java: playwright.request().newContext();' },
          { level: 'advanced', q: 'Shadow DOM elementi nasıl handle edilir?', a: 'Playwright locator\'ları Shadow DOM\'u otomatik pierce eder — Selenium\'daki JavascriptExecutor hack\'ine gerek yoktur. page.locator(".inner-button") ile Shadow DOM içindeki elemente direkt erişilir. Playwright\'ın en büyük üstünlüklerinden biridir.' },
          { level: 'advanced', q: 'Electron, mobile ve desktop uygulama testleri nasıl yapılır?', a: 'Electron: playwright.electron.launch({ executablePath }). Mobile emulation: use: { ...devices["iPhone 13"] } — UserAgent+viewport otomatik. Desktop: use: { viewport: { width: 1920, height: 1080 } }. Real device: Appium bridge veya Mobile Playwright (beta).' },
          { level: 'advanced', q: 'Custom reporter nasıl yazılır?', a: 'class MyReporter { onBegin(c,s){} onTestEnd(t,r){} onEnd(r){} }. module.exports = MyReporter. Config: reporter: [["./my-reporter.js"]]. Kullanım: Slack bildirim, dashboard güncelleme, DB\'ye yazma. Java TestNG ITestListener veya JUnit Extension\'ın karşılığı.' },
          { level: 'advanced', q: 'Performans metrikleri nasıl ölçülür?', a: 'Web Vitals: page.evaluate(() => JSON.stringify(window.performance.timing)). CDP Session: const client = await page.context().newCDPSession(page); await client.send("Performance.enable"); const perf = await client.send("Performance.getMetrics"). Network event\'lerinden timing bilgisi alınabilir.' },
          { level: 'advanced', q: '@playwright/test vs playwright core farkı nedir?', a: '@playwright/test: test runner + assertion + fixture + reporter + parallelism — tam framework. playwright: sadece browser automation, test runner yok. @playwright/test daima tercih edilir: browser/page/context/request fixture\'ları otomatik yönetilir, parallel/retry/reporting built-in.' },
          { level: 'advanced', q: 'Geolocation, permissions ve clipboard nasıl test edilir?', a: 'browser.newContext({ geolocation: { latitude: 41.0082, longitude: 28.9784 }, permissions: ["geolocation"] }). Kamera/mikrofon: ["camera","microphone"]. Bildirim: ["notifications"]. Headless modda da çalışır — Playwright izinleri doğrudan tarayıcıya verir.' },
          { level: 'advanced', q: 'Debugging için en iyi araçlar nelerdir?', a: 'PWDEBUG=1 npx playwright test ile Inspector. await page.pause() ile test durur, manuel devam. npx playwright test --ui görsel mode. Trace Viewer: trace:"on". page.on("console", msg => console.log(msg)) tarayıcı console. Java\'da da PWDEBUG çalışır.' },
          { level: 'advanced', q: 'Retry mekanizması ve flaky test azaltma?', a: 'Config: retries: 2. test.describe.configure({ retries: 3 }) suite için. Flaky nedenler: 1) sleep yerine auto-wait, 2) test order bağımlılığı, 3) shared state paralelde çakışma, 4) CI kaynak yetersizliği. Çözüm: her test kendi datasını oluşturur ve temizler.' },
          { level: 'advanced', q: 'Accessibility (a11y) testi nasıl yapılır?', a: '@axe-core/playwright: const results = await new AxeBuilder({ page }).analyze(); expect(results.violations).toEqual([]). Kurallar: .withRules(["color-contrast"]). Element: .include("#main"). getByRole, getByLabel locator\'ları accessibility\'i de artırır.' },
          { level: 'advanced', q: 'Web scraping Playwright ile nasıl yapılır?', a: 'const names = await page.locator(".product-name").allTextContents(); tüm isimleri array döndürür. page.$$eval(".price", els => els.map(el => el.textContent)) alternatif. Test vs Scraping: testler assertion yapar; scraping veri çeker. Üretimde playwright-extra + stealth bot tespitini önler.' },
          { level: 'advanced', q: 'Type-safe Page Object TypeScript\'te nasıl yazılır?', a: 'interface PageLocators { email: Locator; password: Locator; } class LoginPage { readonly locators: PageLocators; constructor(private page: Page) { this.locators = { email: page.locator("[data-qa=\'login-email\']"), password: page.locator("[data-qa=\'login-password\']") }; } async login(e: string, p: string): Promise<void> { await this.locators.email.fill(e); } }' },
          { level: 'advanced', q: 'Playwright Codegen nedir, production\'da kullanılır mı?', a: 'npx playwright codegen https://example.com ile aksiyonlar otomatik TS/Python/Java koduna dönüşür. Production için önerilmez: kırılgan CSS locator üretir, POM uygulamaz, assertion eklemez. Locator keşfi ve prototip için hızlıdır — başlangıç noktası olarak kullan, manuel refine et.' },
          { level: 'advanced', q: 'Docker\'da test nasıl çalıştırılır?', a: 'mcr.microsoft.com/playwright:v1.44.0-focal resmi image. FROM mcr.microsoft.com/playwright:v1.44.0-focal; WORKDIR /app; COPY . .; RUN npm ci; CMD ["npx","playwright","test"]. Tüm tarayıcı bağımlılıkları dahil — ayrıca install gerekmez. Java: mcr.microsoft.com/playwright/java image.' },
          { level: 'advanced', q: 'Custom wait stratejisi nasıl yazılır?', a: 'await page.waitForFunction(() => window.dataLoaded === true, { timeout: 10000 }); Locator: await locator.waitFor({ state: "visible", timeout: 15000 }); Poll+retry: await expect(async () => { const c = await page.locator(".item").count(); expect(c).toBeGreaterThan(5); }).toPass({ timeout: 30000 }); toPass() çok güçlü.' },
          { level: 'advanced', q: 'Playwright\'ı Selenium\'a tercih etmeniz veya etmemeniz için gerçek senaryo?', a: 'Tercih ederim: 1) Modern SPA — auto-wait ile az flaky test, 2) API mocking — page.route() proxy ihtiyacı yok, 3) Multi-browser tek API, 4) CI/CD hızı. Tercih etmem: 1) IE desteği gerekiyorsa, 2) Büyük Selenium codebase. Gerçek: Fintech payment iframe — Selenium 3 switchTo()+explicit wait; Playwright frameLocator()+auto-wait 3 satır, sıfır flakiness.' },
        ],
      },
    ],
  },
  en: {
    title: '💼 50 Interview Questions',
    blocks: [
      {
        type: 'simple-box', emoji: '🎯',
        content: 'These 50 questions are actually asked in Junior → Senior Playwright QA interviews. Don\'t skip to Advanced before mastering Basic — a solid foundation is everything.',
      },
      {
        type: 'interview-questions',
        topic: 'Playwright',
        questions: [
          { level: 'basic', q: 'What is Playwright and how does it differ from Selenium?', a: 'Playwright is a modern browser automation library by Microsoft (2020). Supports TypeScript, JavaScript, Python, Java, C#. Key difference: auto-wait automatically waits for elements to load, eliminating explicit waits. Single API controls Chromium, Firefox, and WebKit.' },
          { level: 'basic', q: 'How do you install Playwright for TypeScript?', a: 'Run npm init playwright@latest — installs @playwright/test, creates playwright.config.ts, downloads browsers (npx playwright install), generates example tests. Then npx playwright test to execute.' },
          { level: 'basic', q: 'How do you launch and close a browser in Playwright?', a: 'With test framework, browser management is automatic. Manually: const browser = await playwright.chromium.launch(); const page = await browser.newPage(); ... await browser.close(); Java: Browser browser = playwright.chromium().launch(); Page page = browser.newPage(); ... browser.close();' },
          { level: 'basic', q: 'What is page.goto() and how is it used?', a: 'page.goto(url) navigates to the URL, waits for load event by default. Optional: page.goto(url, { waitUntil: "networkidle" }). Java: page.navigate("https://example.com");' },
          { level: 'basic', q: 'What are the recommended locator strategies in Playwright?', a: 'In order: 1) getByRole() — aria role (best practice), 2) getByText() — visible text, 3) getByLabel() — form label, 4) getByTestId() — data-testid, 5) locator(css/xpath). Unlike Selenium\'s brittle CSS/XPath locators, Playwright prefers semantic ones.' },
          { level: 'basic', q: 'What is the difference between fill(), type(), and click()?', a: 'fill() clears then types at once — fast, preferred in production. type() simulates key-by-key — needed for inputs with key listeners. click() waits for clickable state, does hover+focus+click. fill() ≈ Selenium clear() + sendKeys().' },
          { level: 'basic', q: 'How does Playwright\'s auto-wait mechanism work?', a: 'Before each action (click, fill, etc.) Playwright auto-waits for element to be visible, stable, enabled, and editable — eliminating Thread.sleep() or WebDriverWait. For extra waits: page.waitForURL(pattern), locator.waitFor({ state: "visible" }), page.waitForResponse(url).' },
          { level: 'basic', q: 'How do you make assertions in Playwright?', a: 'await expect(locator).toBeVisible(), await expect(locator).toHaveText("text"), await expect(page).toHaveURL(/pattern/), await expect(locator).toHaveCount(3). Java: assertThat(page.locator("#id")).isVisible(). Replaces JUnit assertEquals.' },
          { level: 'basic', q: 'What does playwright.config.ts contain?', a: 'Central config: baseURL, timeout, retries, workers, projects (browser/viewport combos), reporter (console/html/junit), use (headless, screenshot, video). Similar to Maven\'s pom.xml.' },
          { level: 'basic', q: 'What is the difference between headless and headed mode?', a: 'Headless: no browser UI — preferred in CI/CD, faster. Headed: real browser window — for debugging. chromium.launch({ headless: false }) for headed, true (default) for headless. Config: use: { headless: false }.' },
          { level: 'basic', q: 'How do you take screenshots?', a: 'page.screenshot({ path: "s.png" }) for viewport; page.screenshot({ path: "s.png", fullPage: true }) for full page. Element: locator.screenshot({ path: "el.png" }). Config: use: { screenshot: "on" } after every test, "only-on-failure" for failures.' },
          { level: 'basic', q: 'How do you record video in Playwright?', a: 'Config: use: { video: "on" } or "retain-on-failure". Videos saved in test-results/. Manually: browser.newContext({ recordVideo: { dir: "videos/" } }) — context.close() saves the video.' },
          { level: 'basic', q: 'How do you run Playwright tests?', a: 'npx playwright test — all; npx playwright test login.spec.ts — specific file; --grep "login" — regex filter; --headed — with browser; --ui — interactive UI mode; --debug — Inspector step-by-step. Java: mvn test -Dtest=LoginTest.' },
          { level: 'basic', q: 'Why is getByRole() the most preferred locator?', a: 'Uses ARIA standards: 1) CSS class changes don\'t break tests, 2) Accessibility-aligned, 3) Targets what users see. page.getByRole("button", { name: "Submit" }) finds Submit button. Selenium By.cssSelector(".btn") is brittle to refactoring.' },
          { level: 'basic', q: 'How do you generate test reports?', a: 'npx playwright test --reporter=html generates HTML report. npx playwright show-report opens in browser. Config supports multiple: reporter: [["html"],["junit",{outputFile:"results.xml"}]]. JUnit reporter for Jenkins/GitLab integration.' },
          { level: 'intermediate', q: 'How do you implement Page Object Model (POM) in Playwright?', a: 'Create class per page, pass Page in constructor: class LoginPage { constructor(page) { this.emailInput = page.locator("[data-qa=\'login-email\']"); } async login(e,p) { await this.emailInput.fill(e); } }. In tests: const lp = new LoginPage(page); await lp.login(). Identical to Java POM pattern.' },
          { level: 'intermediate', q: 'What are Playwright fixtures and how are they used?', a: 'const test = base.extend({ loggedInPage: async ({ page }, use) => { await login(page); await use(page); } }); Injects fixture instead of repeating login. Similar to Java @BeforeEach + @AfterEach but more modular and composable.' },
          { level: 'intermediate', q: 'When do you use beforeEach, afterEach, beforeAll, afterAll?', a: 'beforeEach: before each test (login, navigate). afterEach: after each (cleanup). beforeAll: once before all (DB seed). afterAll: once after all (browser close). Maps to Java @BeforeEach, @AfterEach, @BeforeAll, @AfterAll.' },
          { level: 'intermediate', q: 'How do you handle iframes in Playwright?', a: 'Selenium: driver.switchTo().frame(). Playwright: frameLocator() — no switching: const frame = page.frameLocator(\'iframe[src*="payment"]\'); await frame.locator(\'#card-number\').fill(\'4111\'); Auto-returns to main frame after interaction — no switchTo().defaultContent() needed.' },
          { level: 'intermediate', q: 'How do you handle Alert, Confirm, and Prompt dialogs?', a: 'page.on("dialog", dialog => dialog.accept()) to accept; dialog.dismiss() to reject; dialog.fill("text") for prompts. Listener must be registered BEFORE the triggering action. Selenium: driver.switchTo().alert().accept(). No switchTo() in Playwright.' },
          { level: 'intermediate', q: 'How do you manage multiple tabs and new windows?', a: 'const [newPage] = await Promise.all([context.waitForEvent("page"), page.getByText("Open Tab").click()]); await newPage.waitForLoadState(); Java: Page newPage = context.waitForPage(() -> page.click(loc)). Replaces Selenium getWindowHandles() + switchTo().window().' },
          { level: 'intermediate', q: 'How do you intercept API calls with page.route()?', a: 'await page.route("**/api/products", route => route.fulfill({ status: 200, body: JSON.stringify([{id:1}]) })); Intercepts matching requests, returns fake response. route.continue() forwards; route.abort() blocks. Selenium needed external tools like BrowserMob Proxy.' },
          { level: 'intermediate', q: 'How do you run Playwright tests in parallel?', a: 'Config: workers: 4 (or process.env.CI ? 2 : 4). Files run parallel by default; same-file tests sequential. test.describe.parallel() for same-file parallel; test.describe.serial() for forced sequential. Like JUnit 5 @Execution(ExecutionMode.CONCURRENT).' },
          { level: 'intermediate', q: 'What is Playwright Trace Viewer?', a: 'Records every action, network request, screenshot, console log. Config: use: { trace: "on-first-retry" }. View: npx playwright show-trace trace.zip. Ideal for debugging CI failures — see exactly what happened at each step without re-running locally.' },
          { level: 'intermediate', q: 'How do you use locator.filter()?', a: 'page.locator(".product").filter({ hasText: "Nike" }) — only "Nike" items. .filter({ has: page.locator(".in-stock") }) — items with specific child element. Similar to Java stream().filter() on WebElement lists but far more readable.' },
          { level: 'intermediate', q: 'How do you manage test data in Playwright?', a: '1) JSON/CSV in fixtures/, 2) @faker-js/faker for random data, 3) request fixture for API data, 4) DB seed in beforeAll. Best practice: each test creates and cleans its own data. Shared mutable data causes conflicts in parallel runs.' },
          { level: 'intermediate', q: 'How do you speed up authentication in Playwright?', a: 'storageState: 1) Login once and save: await page.context().storageState({ path: "auth.json" }), 2) Tests load: use: { storageState: "auth.json" }. Login happens once, cookies/localStorage shared. Java: Browser.NewContextOptions().setStorageStatePath(...).' },
          { level: 'intermediate', q: 'What is visual regression testing in Playwright?', a: 'expect(page).toHaveScreenshot("home.png") takes reference; subsequent runs do pixel comparison. Update: --update-snapshots. Threshold: toHaveScreenshot({ maxDiffPixelRatio: 0.1 }). Built-in — no Applitools needed.' },
          { level: 'intermediate', q: 'What are soft assertions and when do you use them?', a: 'Normal assertion stops test on failure. Soft: expect.soft(locator).toBeVisible() — all checks run, failures reported at end. Use case: form validation, checking all error messages in one pass. Same as AssertJ SoftAssertions in Java.' },
          { level: 'intermediate', q: 'How do you spy on network requests?', a: 'page.on("request", cb) and page.on("response", cb). Await specific request: const [resp] = await Promise.all([page.waitForResponse(r => r.url().includes("/api/data")), page.click("#load")]); const data = await resp.json(); Validates API response after UI actions.' },
          { level: 'advanced', q: 'What is BrowserContext and how does it differ from Page?', a: 'BrowserContext is an isolated session — own cookies, localStorage, session, like a separate browser profile. Multiple Pages (tabs) open within one Context. Use case: two Contexts to simulate two users simultaneously. browser.newContext() creates context, context.newPage() opens tab.' },
          { level: 'advanced', q: 'How do you integrate Playwright into a CI/CD pipeline?', a: 'GitHub Actions: npx playwright install --with-deps, npx playwright test. workers: process.env.CI ? 2 : 4. Artifacts: upload-artifact for test-results/ and playwright-report/. Jenkins: sh("npx playwright test --reporter=junit") + JUnit publish. Parallel: --shard=N/M + matrix strategy.' },
          { level: 'advanced', q: 'What is test sharding in Playwright?', a: 'Splits large suites across CI runners: 100 tests, 4 runners → --shard=1/4, --shard=2/4, etc. Then: npx playwright merge-reports blob-reports/ to combine. GitHub Actions matrix strategy makes it easy. Analogous to Maven failsafe plugin fork count.' },
          { level: 'advanced', q: 'How does Playwright handle Shadow DOM?', a: 'Playwright locators automatically pierce Shadow DOM — no need for Selenium\'s JavascriptExecutor hack. page.locator(".inner-button") directly accesses Shadow DOM elements. One of Playwright\'s biggest advantages over Selenium.' },
          { level: 'advanced', q: 'How do you write a custom reporter?', a: 'class MyReporter { onBegin(c,s){} onTestEnd(t,r){} onEnd(r){} }. module.exports = MyReporter. Config: reporter:[["./my-reporter.js"]]. Use cases: Slack notifications, dashboard updates, DB writes. Equivalent to TestNG ITestListener or JUnit Extension in Java.' },
          { level: 'advanced', q: 'How do you use the request fixture for API testing?', a: 'Built-in: const response = await request.post("/api/login", { data: { email, password } }); expect(response.status()).toBe(200); const body = await response.json(); APIRequestContext carries cookies for authenticated calls. Java: playwright.request().newContext();' },
          { level: 'advanced', q: 'What is toPass() and when should you use it?', a: 'Polls async assertion until pass or timeout: await expect(async () => { const c = await page.locator(".item").count(); expect(c).toBeGreaterThan(5); }).toPass({ timeout: 30000 }); Use when exact timing is unknown — waiting for background jobs. More powerful than waitForFunction() for complex assertions.' },
          { level: 'advanced', q: 'How do you run Playwright tests in Docker?', a: 'Use mcr.microsoft.com/playwright:v1.44.0-focal image. FROM mcr.microsoft.com/playwright:v1.44.0-focal; WORKDIR /app; COPY . .; RUN npm ci; CMD ["npx","playwright","test"]. All browser deps included — no playwright install needed. Java: mcr.microsoft.com/playwright/java image.' },
          { level: 'advanced', q: 'How do you test geolocation and browser permissions?', a: 'browser.newContext({ geolocation: { latitude: 41.0082, longitude: 28.9784 }, permissions: ["geolocation"] }). Camera/mic: ["camera","microphone"]. Notifications: ["notifications"]. Works in headless — Playwright grants permissions directly to the browser.' },
          { level: 'advanced', q: 'When would you choose Playwright over Selenium, and when not?', a: 'Choose Playwright: 1) Modern SPA — auto-wait minimizes flaky tests, 2) API mocking — page.route() eliminates proxy, 3) Multi-browser single API, 4) CI/CD speed — parallel+sharding built-in. Avoid: 1) IE required, 2) Large Selenium codebase — migration cost. Real: Fintech payment iframe — Selenium needed 3 switchTo() calls; Playwright: frameLocator()+auto-wait in 3 lines, zero flakiness.' },
        ],
      },
    ],
  },
}


// ─── YENİ SEKMELER (2026-06-19) — CosmoCode "Getting Started" serisiyle kıyaslanan eksikler ───
// Eksik bulunan konular: Assertions, Test Organization, Fixtures, Page Object Model,
// Debugging/Traces/CI-CD, Auth & Sessions. Aşağıda 5 yeni sekme olarak eklendi.

const s10 = {
  tr: {
    title: '✅ Doğru Assertion Yazımı (expect)',
    blocks: [
      {
        type: 'simple-box', emoji: '🚪',
        content: 'Bir bina girişindeki güvenlik görevlisini düşün: kart okutmadan içeri almaz ama kapıda dikilip "olmadı, çık" demez — kartı okutana kadar (en fazla 5 saniye) bekler, sonra kontrol eder. Playwright\'ın expect() fonksiyonu tam böyle çalışır: koşul doğru olana kadar arka planda tekrar tekrar kontrol eder, vazgeçmeden önce birkaç saniye şans verir.',
      },
      {
        type: 'text',
        content: 'expect(), Playwright\'ın assertion (doğrulama) fonksiyonudur. Ama JUnit\'teki assertEquals() veya Selenium projelerinde kullandığın klasik assert\'lerden farklı çalışır: bir locator üzerinde çağrılan "web-first" assertion\'lar (toBeVisible(), toHaveText() gibi) varsayılan olarak 5 saniye boyunca otomatik tekrar dener (auto-retry). Koşul anında doğru değilse hemen patlamaz, sayfa state\'i değişene kadar bekler.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'JUnit\'te Assert.assertEquals("Beklenen", element.getText()) yazdığında, o satır çalıştığı an element\'in text\'i o değilse test ANINDA patlar — element\'in metni 200ms sonra doğru olacak olsa bile. Playwright\'ta await expect(locator).toHaveText("Beklenen") yazarsan, Playwright o metni 5 saniye boyunca tekrar tekrar okur; metin 200ms sonra doğru olursa test geçer. AssertJ\'nin await().atMost(5, SECONDS).until(...) (Awaitility) yazdığın senaryoyu built-in olarak düşün.',
      },
      { type: 'heading', text: 'Web-First Assertion vs Generic Assertion' },
      {
        type: 'table',
        headers: ['Tür', 'Örnek', 'Auto-retry?', 'Ne zaman kullan'],
        rows: [
          ['Locator-based (web-first)', 'expect(locator).toBeVisible()', '✅ 5s tekrar dener', 'DOM/element durumu kontrolü'],
          ['Page-based', 'expect(page).toHaveURL(/dashboard/)', '✅ 5s tekrar dener', 'Navigasyon/URL/title kontrolü'],
          ['Generic (value-based)', 'expect(count).toBe(5)', '❌ Anında kontrol', 'Düz JS değeri (sayı, string, obje)'],
        ],
      },
      {
        type: 'text',
        content: 'En sık kullanılan web-first assertion\'lar: toBeVisible() / toBeHidden(), toHaveText() / toContainText(), toHaveValue(), toBeChecked(), toBeEnabled() / toBeDisabled(), toHaveAttribute(), toHaveClass(), toHaveCSS(), toHaveCount(), toHaveURL(), toHaveTitle(). Her birinin başına .not. koyarak tersini doğrulayabilirsin: expect(locator).not.toBeVisible().',
      },
      {
        type: 'playwright-visual',
        concept: 'assertion-retry',
        icon: '✅',
        title: { tr: 'expect() Nasıl Tekrar Dener (Auto-Retry)', en: 'How expect() Auto-Retries' },
        steps: [
          {
            id: 'fail-fast', label: 'Klasik Assert (JUnit)', labelEn: 'Classic Assert (JUnit)', visualState: 'fail-fast',
            description: { tr: 'assertEquals çalıştığı anki DOM\'a bakar. Spinner hâlâ dönüyorsa ya da metin henüz güncellenmediyse test anında FAIL olur.', en: 'assertEquals looks at the DOM at the exact instant it runs. If a spinner is still spinning or the text hasn\'t updated yet, the test FAILS immediately.' },
            code: `// Selenium + JUnit\nAssert.assertEquals(\n  "Sipariş Onaylandı",\n  successMsg.getText()\n); // ❌ Mesaj 300ms sonra geliyorsa burada patlar`,
            tip: { tr: '300ms sonra doğru olacak bir şeyi anında kontrol etmek "flaky test"in en yaygın nedenidir.', en: 'Checking something that will be correct in 300ms, right now, is the most common cause of flaky tests.' },
          },
          {
            id: 'checking', label: 'Playwright — Kontrol Ediyor', labelEn: 'Playwright — Checking', visualState: 'pw-way',
            description: { tr: 'await expect(locator).toHaveText(...) çağrıldığı an Playwright ilk kontrolü yapar. Henüz doğru değilse hata fırlatmaz, polling döngüsüne girer.', en: 'The moment await expect(locator).toHaveText(...) runs, Playwright performs the first check. If it\'s not correct yet, it doesn\'t throw — it enters a polling loop.' },
            code: `await expect(\n  page.getByText('Sipariş Onaylandı')\n).toBeVisible();\n// İlk kontrol: henüz görünmüyor → bekle`,
          },
          {
            id: 'retry', label: 'Tekrar Deniyor (Polling)', labelEn: 'Retrying (Polling)', visualState: 'retry',
            description: { tr: 'Playwright her ~100ms\'de bir koşulu yeniden kontrol eder. Bu, sayfa state\'i değişene (spinner kaybolup mesaj görününceye) kadar sessizce devam eder — sen hiçbir ekstra kod yazmazsın.', en: 'Playwright re-checks the condition roughly every ~100ms. This silently continues until the page state changes (spinner disappears, message appears) — you write zero extra code for this.' },
            code: `// Arka planda otomatik:\n// check (t=0ms) → false\n// check (t=100ms) → false\n// check (t=300ms) → true ✅`,
          },
          {
            id: 'passed', label: 'Koşul Doğru → Geçti', labelEn: 'Condition True → Passed', visualState: 'found',
            description: { tr: 'Koşul 5 saniyeden önce doğru olduğu an assertion anında geçer ve bir sonraki satıra devam edilir. Toplam bekleme süresi sadece gerçekten gereken süre kadar — sabit Thread.sleep(5000) gibi gereksiz bekleme yok.', en: 'The moment the condition becomes true (before the 5s budget runs out), the assertion passes immediately and execution moves to the next line. The total wait is exactly as long as needed — no wasted fixed Thread.sleep(5000).' },
            code: `await expect(\n  page.getByText('Sipariş Onaylandı')\n).toBeVisible();\n// ✅ 280ms sonra geçti, devam!`,
          },
          {
            id: 'timeout', label: 'Hiç Doğru Olmazsa → Timeout', labelEn: 'Never True → Timeout', visualState: 'timeout',
            description: { tr: 'Koşul 5 saniye boyunca hiç doğru olmazsa Playwright TimeoutError fırlatır ve hata mesajına son denenen DOM durumunu da ekler — bu yüzden hata mesajları Selenium\'a göre çok daha açıklayıcıdır.', en: 'If the condition is never true within the 5-second budget, Playwright throws a TimeoutError and includes the last-seen DOM state in the error message — which is why Playwright\'s failure messages are far more descriptive than Selenium\'s.' },
            code: `// 5000ms boyunca hep false\n// → TimeoutError: \n//   expect(locator).toBeVisible()\n//   Locator: getByText('Sipariş Onaylandı')\n//   Expected: visible\n//   Received: <element not found>`,
          },
        ],
      },
      { type: 'heading', text: 'Soft Assertion & Özel Timeout' },
      {
        type: 'code', language: 'typescript',
        code: `// Soft assertion: hata olsa da test devam eder, sonunda hepsi raporlanır
test('form validation — tüm hata mesajlarını göster', async ({ page }) => {
  await page.getByRole('button', { name: 'Gönder' }).click();

  await expect.soft(page.getByText('E-posta zorunludur')).toBeVisible();
  await expect.soft(page.getByText('Şifre zorunludur')).toBeVisible();
  await expect.soft(page.getByText('Ad zorunludur')).toBeVisible();
  // Üçü de kontrol edilir; biri fail olsa diğerleri de çalışır.
  // Test sonunda kaç soft assertion fail oldu, hepsi tek raporda görünür.
});

// Tek assertion için özel timeout (varsayılan: 5000ms)
await expect(page.getByText('Rapor Hazır')).toBeVisible({ timeout: 30000 });

// Global config (playwright.config.ts)
export default defineConfig({
  expect: { timeout: 10000 },
});`,
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '👁️', label: 'toBeVisible() / toBeHidden()', desc: 'Element görünür mü, gizli mi?' },
          { icon: '📝', label: 'toHaveText() / toContainText()', desc: 'Tam metin veya içeren metin kontrolü.' },
          { icon: '🔢', label: 'toHaveValue()', desc: 'Input/textarea\'nın güncel değeri.' },
          { icon: '☑️', label: 'toBeChecked()', desc: 'Checkbox/radio işaretli mi?' },
          { icon: '🔓', label: 'toBeEnabled() / toBeDisabled()', desc: 'Buton tıklanabilir mi?' },
          { icon: '🔢', label: 'toHaveCount()', desc: 'Eşleşen eleman sayısı (örn. 5 ürün kartı).' },
          { icon: '🔗', label: 'toHaveURL()', desc: 'Sayfanın güncel adresi (regex destekli).' },
          { icon: '🏷️', label: 'toHaveTitle()', desc: 'Sayfa <title> içeriği.' },
          { icon: '🚫', label: '.not. ile tersi', desc: 'expect(x).not.toBeVisible() gibi her assertion\'ın tersi yazılabilir.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Checkout Akışı İçin Doğru Assertion Sırası', en: 'Try It Yourself — Correct Assertion Order for a Checkout Flow' },
        intro: { tr: 'Bir "sepeti onayla" akışı için doğru sırayla expect() satırlarını yaz: önce buton tıklanabilir mi kontrol et, tıkla, sonra başarı mesajını ve yeni URL\'i doğrula.', en: 'Write the expect() lines in the correct order for a "confirm cart" flow: first check the button is clickable, click it, then verify the success message and the new URL.' },
        starterCommands: {
          tr: `await expect(page.getByRole('button', { name: 'Onayla' })).toBeEnabled();
await page.getByRole('button', { name: 'Onayla' }).click();
await expect(page.getByText('Siparişiniz Alındı')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
          en: `await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled();
await page.getByRole('button', { name: 'Confirm' }).click();
await expect(page.getByText('Order Received')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
        },
        expectedSteps: [
          { pattern: 'toBeEnabled', label: { tr: '1) Butonun tıklanabilir olduğunu doğrula', en: '1) Verify the button is enabled' }, example: "await expect(button).toBeEnabled();" },
          { pattern: '\\.click\\(', label: { tr: '2) Butona tıkla', en: '2) Click the button' }, example: 'await button.click();' },
          { pattern: 'toBeVisible', label: { tr: '3) Başarı mesajının göründüğünü doğrula', en: '3) Verify the success message is visible' }, example: 'await expect(msg).toBeVisible();' },
          { pattern: 'toHaveURL', label: { tr: '4) Yeni URL\'e geçildiğini doğrula', en: '4) Verify the URL changed' }, example: 'await expect(page).toHaveURL(/confirmed/);' },
        ],
        dangerousPatterns: [
          { pattern: 'waitForTimeout', label: { tr: 'waitForTimeout(...) sabit bekleme demektir — auto-retry assertion varken buna gerek yok ve testi yavaşlatır/flaky yapar.', en: 'waitForTimeout(...) is a fixed sleep — unnecessary with auto-retry assertions, and it slows tests down / makes them flaky.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra! Buton kontrolü → tıkla → mesaj doğrulama → URL doğrulama. Her expect() kendi içinde otomatik tekrar deniyor, ekstra sleep yazmana gerek yok.', en: '✅ Correct order! Check button → click → verify message → verify URL. Each expect() auto-retries on its own — no extra sleep needed.' },
        retryOutput: { tr: '❌ Sıra veya adım eksik. 4 adımı da doğru sırada yazdığından emin ol.', en: '❌ Order or a step is missing. Make sure all 4 steps are present in the right order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Aşağıdakilerden hangisi auto-retry YAPMAZ?', en: 'Which of the following does NOT auto-retry?' },
        options: [
          { id: 'a', text: 'expect(locator).toBeVisible()' },
          { id: 'b', text: 'expect(page).toHaveURL(/dashboard/)' },
          { id: 'c', text: 'expect(orderCount).toBe(5)  // orderCount bir number değişkeni' },
          { id: 'd', text: 'expect(locator).toHaveText("Tamam")' },
        ],
        correct: 'c',
        explanation: { tr: 'Generic (value-based) assertion\'lar — düz bir JS değeri (number, string, object) üzerinde çalışanlar — anında kontrol eder, retry yapmaz. Web-first assertion\'lar (locator veya page üzerinde çalışanlar) 5 saniye boyunca tekrar dener.', en: 'Generic (value-based) assertions — the ones operating on a plain JS value (number, string, object) — check instantly and never retry. Web-first assertions (the ones operating on a locator or page) retry for up to 5 seconds.' },
      
        retryQuestion: {
      "type": "quiz",
      "question": {
            "tr": "Aşağıdaki ifadelerden hangisi 'web-first' assertion (otomatik tekrar deneme yapan) DEĞİLDİR?",
            "en": "Which of the following is NOT a 'web-first' assertion (does NOT support auto-retry)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "expect(page.locator('.btn')).toBeDisabled()"
            },
            {
                  "id": "b",
                  "text": "expect(page).toHaveTitle('Ana Sayfa')"
            },
            {
                  "id": "c",
                  "text": "expect(users.length).toBe(10) // users bir dizi"
            },
            {
                  "id": "d",
                  "text": "expect(page.locator('h1')).toHaveText(/Merhaba/)"
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Düz bir JavaScript değişkeni veya dizisi (users.length) üzerinde yapılan 'expect' kontrolleri anında değerlendirilir. 'Web-first' assertion'lar ise doğrudan locator veya page nesneleri üzerinde çağrılmalıdır.",
            "en": "'expect' checks performed on a plain JavaScript variable or array (users.length) are evaluated instantly. 'Web-first' assertions must be called directly on locator or page objects to trigger auto-retry."
      }
}
},
    ],
  },
  en: {
    title: '✅ Writing Good Assertions (expect)',
    blocks: [
      {
        type: 'simple-box', emoji: '🚪',
        content: 'Think of a security guard at a building entrance: he won\'t let you in without a badge, but he also won\'t just stand there shouting "no" once — he gives you a few seconds (up to 5) to scan your badge before deciding. Playwright\'s expect() works exactly like that: it quietly re-checks a condition in the background until it\'s true, giving it a few seconds before giving up.',
      },
      {
        type: 'text',
        content: 'expect() is Playwright\'s assertion function. But it works differently from JUnit\'s assertEquals() or the classic asserts you might have used in Selenium projects: "web-first" assertions called on a locator (like toBeVisible(), toHaveText()) auto-retry for 5 seconds by default. If the condition isn\'t true the instant it\'s checked, it doesn\'t blow up right away — it waits until the page state changes.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In JUnit, Assert.assertEquals("Expected", element.getText()) fails the INSTANT that line runs if the element\'s text isn\'t that value yet — even if the text would be correct 200ms later. In Playwright, await expect(locator).toHaveText("Expected") re-reads that text for up to 5 seconds; if it becomes correct after 200ms, the test passes. Think of it as a built-in version of the Awaitility pattern: await().atMost(5, SECONDS).until(...).',
      },
      { type: 'heading', text: 'Web-First Assertions vs Generic Assertions' },
      {
        type: 'table',
        headers: ['Type', 'Example', 'Auto-retry?', 'When to use'],
        rows: [
          ['Locator-based (web-first)', 'expect(locator).toBeVisible()', '✅ retries for 5s', 'Checking DOM/element state'],
          ['Page-based', 'expect(page).toHaveURL(/dashboard/)', '✅ retries for 5s', 'Checking navigation/URL/title'],
          ['Generic (value-based)', 'expect(count).toBe(5)', '❌ checked instantly', 'Plain JS values (number, string, object)'],
        ],
      },
      {
        type: 'text',
        content: 'The most common web-first assertions: toBeVisible() / toBeHidden(), toHaveText() / toContainText(), toHaveValue(), toBeChecked(), toBeEnabled() / toBeDisabled(), toHaveAttribute(), toHaveClass(), toHaveCSS(), toHaveCount(), toHaveURL(), toHaveTitle(). Prefix any of them with .not. to assert the opposite: expect(locator).not.toBeVisible().',
      },
      {
        type: 'playwright-visual',
        concept: 'assertion-retry',
        icon: '✅',
        title: { tr: 'expect() Nasıl Tekrar Dener (Auto-Retry)', en: 'How expect() Auto-Retries' },
        steps: [
          {
            id: 'fail-fast', label: 'Classic Assert (JUnit)', labelEn: 'Classic Assert (JUnit)', visualState: 'fail-fast',
            description: { tr: 'assertEquals çalıştığı anki DOM\'a bakar. Spinner hâlâ dönüyorsa ya da metin henüz güncellenmediyse test anında FAIL olur.', en: 'assertEquals looks at the DOM at the exact instant it runs. If a spinner is still spinning or the text hasn\'t updated yet, the test FAILS immediately.' },
            code: `// Selenium + JUnit\nAssert.assertEquals(\n  "Order Confirmed",\n  successMsg.getText()\n); // ❌ Fails here if the message arrives 300ms later`,
            tip: { tr: '300ms sonra doğru olacak bir şeyi anında kontrol etmek "flaky test"in en yaygın nedenidir.', en: 'Checking something that will be correct in 300ms, right now, is the most common cause of flaky tests.' },
          },
          {
            id: 'checking', label: 'Playwright — Checking', labelEn: 'Playwright — Checking', visualState: 'pw-way',
            description: { tr: 'await expect(locator).toHaveText(...) çağrıldığı an Playwright ilk kontrolü yapar. Henüz doğru değilse hata fırlatmaz, polling döngüsüne girer.', en: 'The moment await expect(locator).toHaveText(...) runs, Playwright performs the first check. If it\'s not correct yet, it doesn\'t throw — it enters a polling loop.' },
            code: `await expect(\n  page.getByText('Order Confirmed')\n).toBeVisible();\n// First check: not visible yet → wait`,
          },
          {
            id: 'retry', label: 'Retrying (Polling)', labelEn: 'Retrying (Polling)', visualState: 'retry',
            description: { tr: 'Playwright her ~100ms\'de bir koşulu yeniden kontrol eder. Bu, sayfa state\'i değişene kadar sessizce devam eder — sen hiçbir ekstra kod yazmazsın.', en: 'Playwright re-checks the condition roughly every ~100ms. This silently continues until the page state changes (spinner disappears, message appears) — you write zero extra code for this.' },
            code: `// Automatic in the background:\n// check (t=0ms) → false\n// check (t=100ms) → false\n// check (t=300ms) → true ✅`,
          },
          {
            id: 'passed', label: 'Condition True → Passed', labelEn: 'Condition True → Passed', visualState: 'found',
            description: { tr: 'Koşul 5 saniyeden önce doğru olduğu an assertion anında geçer ve bir sonraki satıra devam edilir.', en: 'The moment the condition becomes true (before the 5s budget runs out), the assertion passes immediately and execution moves to the next line. The total wait is exactly as long as needed — no wasted fixed Thread.sleep(5000).' },
            code: `await expect(\n  page.getByText('Order Confirmed')\n).toBeVisible();\n// ✅ Passed after 280ms, continue!`,
          },
          {
            id: 'timeout', label: 'Never True → Timeout', labelEn: 'Never True → Timeout', visualState: 'timeout',
            description: { tr: 'Koşul 5 saniye boyunca hiç doğru olmazsa Playwright TimeoutError fırlatır ve son denenen DOM durumunu hata mesajına ekler.', en: 'If the condition is never true within the 5-second budget, Playwright throws a TimeoutError and includes the last-seen DOM state in the error message — which is why Playwright\'s failure messages are far more descriptive than Selenium\'s.' },
            code: `// false for the full 5000ms\n// → TimeoutError:\n//   expect(locator).toBeVisible()\n//   Locator: getByText('Order Confirmed')\n//   Expected: visible\n//   Received: <element not found>`,
          },
        ],
      },
      { type: 'heading', text: 'Soft Assertions & Custom Timeouts' },
      {
        type: 'code', language: 'typescript',
        code: `// Soft assertion: test keeps running even on failure, all failures reported at the end
test('form validation — show all error messages', async ({ page }) => {
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect.soft(page.getByText('Email is required')).toBeVisible();
  await expect.soft(page.getByText('Password is required')).toBeVisible();
  await expect.soft(page.getByText('Name is required')).toBeVisible();
  // All three are checked; one failing doesn't stop the others.
  // The final report shows how many soft assertions failed in one place.
});

// Custom timeout for one assertion (default: 5000ms)
await expect(page.getByText('Report Ready')).toBeVisible({ timeout: 30000 });

// Global config (playwright.config.ts)
export default defineConfig({
  expect: { timeout: 10000 },
});`,
      },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '👁️', label: 'toBeVisible() / toBeHidden()', desc: 'Is the element visible or hidden?' },
          { icon: '📝', label: 'toHaveText() / toContainText()', desc: 'Exact text or substring match.' },
          { icon: '🔢', label: 'toHaveValue()', desc: 'Current value of an input/textarea.' },
          { icon: '☑️', label: 'toBeChecked()', desc: 'Is a checkbox/radio checked?' },
          { icon: '🔓', label: 'toBeEnabled() / toBeDisabled()', desc: 'Is the button clickable?' },
          { icon: '🔢', label: 'toHaveCount()', desc: 'Number of matching elements (e.g. 5 product cards).' },
          { icon: '🔗', label: 'toHaveURL()', desc: 'The page\'s current address (regex supported).' },
          { icon: '🏷️', label: 'toHaveTitle()', desc: 'The page <title> content.' },
          { icon: '🚫', label: 'Negate with .not.', desc: 'Any assertion can be inverted: expect(x).not.toBeVisible().' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Checkout Akışı İçin Doğru Assertion Sırası', en: 'Try It Yourself — Correct Assertion Order for a Checkout Flow' },
        intro: { tr: 'Bir "sepeti onayla" akışı için doğru sırayla expect() satırlarını yaz.', en: 'Write the expect() lines in the correct order for a "confirm cart" flow: first check the button is clickable, click it, then verify the success message and the new URL.' },
        starterCommands: {
          tr: `await expect(page.getByRole('button', { name: 'Onayla' })).toBeEnabled();
await page.getByRole('button', { name: 'Onayla' }).click();
await expect(page.getByText('Siparişiniz Alındı')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
          en: `await expect(page.getByRole('button', { name: 'Confirm' })).toBeEnabled();
await page.getByRole('button', { name: 'Confirm' }).click();
await expect(page.getByText('Order Received')).toBeVisible();
await expect(page).toHaveURL(/.*\\/order-confirmed/);`,
        },
        expectedSteps: [
          { pattern: 'toBeEnabled', label: { tr: '1) Butonun tıklanabilir olduğunu doğrula', en: '1) Verify the button is enabled' }, example: "await expect(button).toBeEnabled();" },
          { pattern: '\\.click\\(', label: { tr: '2) Butona tıkla', en: '2) Click the button' }, example: 'await button.click();' },
          { pattern: 'toBeVisible', label: { tr: '3) Başarı mesajının göründüğünü doğrula', en: '3) Verify the success message is visible' }, example: 'await expect(msg).toBeVisible();' },
          { pattern: 'toHaveURL', label: { tr: '4) Yeni URL\'e geçildiğini doğrula', en: '4) Verify the URL changed' }, example: 'await expect(page).toHaveURL(/confirmed/);' },
        ],
        dangerousPatterns: [
          { pattern: 'waitForTimeout', label: { tr: 'waitForTimeout(...) sabit bekleme demektir — auto-retry assertion varken buna gerek yok ve testi yavaşlatır/flaky yapar.', en: 'waitForTimeout(...) is a fixed sleep — unnecessary with auto-retry assertions, and it slows tests down / makes them flaky.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra! Buton kontrolü → tıkla → mesaj doğrulama → URL doğrulama.', en: '✅ Correct order! Check button → click → verify message → verify URL. Each expect() auto-retries on its own — no extra sleep needed.' },
        retryOutput: { tr: '❌ Sıra veya adım eksik.', en: '❌ Order or a step is missing. Make sure all 4 steps are present in the right order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Aşağıdakilerden hangisi auto-retry YAPMAZ?', en: 'Which of the following does NOT auto-retry?' },
        options: [
          { id: 'a', text: 'expect(locator).toBeVisible()' },
          { id: 'b', text: 'expect(page).toHaveURL(/dashboard/)' },
          { id: 'c', text: 'expect(orderCount).toBe(5)  // orderCount is a plain number variable' },
          { id: 'd', text: 'expect(locator).toHaveText("OK")' },
        ],
        correct: 'c',
        explanation: { tr: 'Generic (value-based) assertion\'lar anında kontrol eder, retry yapmaz. Web-first assertion\'lar (locator/page üzerinde) 5 saniye boyunca tekrar dener.', en: 'Generic (value-based) assertions check instantly and never retry. Web-first assertions (on a locator or page) retry for up to 5 seconds.' },
      
        retryQuestion: {
      "question": {
            "tr": "Aşağıdaki ifadelerden hangisi Playwright'ta 'auto-retry' mekanizmasını tetiklemez?",
            "en": "Which of the following does NOT trigger Playwright's auto-retry mechanism?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "await expect(page.locator('.btn')).toBeEnabled()",
                        "en": "await expect(page.locator('.btn')).toBeEnabled()"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "await expect(page).toHaveTitle('Home Page')",
                        "en": "await expect(page).toHaveTitle('Home Page')"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "const status = 200; expect(status).toBe(200)",
                        "en": "const status = 200; expect(status).toBe(200)"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "await expect(page.locator('input')).toHaveValue('test')",
                        "en": "await expect(page.locator('input')).toHaveValue('test')"
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "Web-first assertion'lar (page veya locator nesneleri ile kullanılanlar) otomatik olarak yeniden dener (retry). Ancak basit bir değer (number, string, boolean) üzerinde yapılan kontrol anlıktır ve tekrar deneme yapmaz.",
            "en": "Web-first assertions (used with page or locator objects) automatically retry. However, assertions performed on simple values (number, string, boolean) are evaluated instantly and do not retry."
      }
}
},
    ],
  },
}

const s11 = {
  tr: {
    title: '🗂️ Test Organizasyonu & Fixtures',
    blocks: [
      {
        type: 'simple-box', emoji: '🧰',
        content: 'Her testin en başında "önce giriş yap, sonra sepete ürün ekle" gibi hazırlık adımları tekrar tekrar yazmak, her yemek tarifinin başında "önce mutfağı kur, ocağı yak, tencereyi al" diye yeniden anlatmaya benzer. Fixture\'lar, mutfağı senin için önceden kurup hazır teslim eden bir komi gibidir — sen sadece "loggedInPage" istersin, Playwright login işini arkada halleder ve sana hazır sayfayı verir.',
      },
      {
        type: 'text',
        content: 'Test organizasyonu iki ana parçadan oluşur: (1) testleri test.describe() ile mantıklı gruplara ayırmak ve beforeEach/afterEach gibi hook\'larla ortak hazırlık/temizlik kodu yazmak, (2) fixture\'lar ile bu hazırlık kodunu "dependency injection" şeklinde testlere otomatik enjekte etmek. İkisi birlikte, yüzlerce testte tekrar eden kodu sıfıra indirir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'test.describe() bir JUnit @Nested test class\'ı gibidir. test.beforeEach() / afterEach() → JUnit @BeforeEach / @AfterEach. test.beforeAll() / afterAll() → @BeforeAll / @AfterAll (ama bunlar { browser } alır, { page } almaz — page testler arası paylaşılmaz). Fixture\'lar ise Spring\'in @Autowired dependency injection\'ına benzer: ihtiyacın olan şeyi parametre olarak istersin, çerçeve onu sana hazır verir — new LoginPage(driver) diye manuel oluşturmazsın.',
      },
      { type: 'heading', text: 'Testin Anatomisi — Arrange / Act / Assert' },
      {
        type: 'code', language: 'typescript',
        code: `import { test, expect } from '@playwright/test';

test('giriş başarılı olursa dashboard\\'a yönlendirir', async ({ page }) => {
  // Arrange — hazırlık
  await page.goto('/login');

  // Act — eylem
  await page.getByLabel('E-posta').fill('kullanici@example.com');
  await page.getByLabel('Şifre').fill('sifre123');
  await page.getByRole('button', { name: 'Giriş Yap' }).click();

  // Assert — doğrulama
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Tekrar hoş geldin')).toBeVisible();
});`,
      },
      { type: 'heading', text: 'describe ile Gruplama + Hook\'lar' },
      {
        type: 'code', language: 'typescript',
        code: `test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Bu grup içindeki HER testten önce çalışır
    await page.goto('/login');
    await page.getByLabel('E-posta').fill('kullanici@example.com');
    await page.getByLabel('Şifre').fill('sifre123');
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('hoş geldin mesajını gösterir', async ({ page }) => {
    await expect(page.getByText('Tekrar hoş geldin')).toBeVisible();
  });

  test('son siparişleri listeler', async ({ page }) => {
    await expect(page.getByRole('list', { name: 'Son Siparişler' })).toBeVisible();
  });
});`,
      },
      {
        type: 'table',
        headers: ['Kontrol', 'Ne işe yarar', 'Java karşılığı'],
        rows: [
          ['test.skip(...)', 'Testi şimdilik atla (henüz hazır değil)', '@Disabled'],
          ['test.only(...)', 'Geliştirme sırasında SADECE bu testi çalıştır', '@Tag ile filtreleme'],
          ['test.fail(...)', 'Bilinen bug — test FAIL ederse PASS sayılır', '@Disabled + JIRA linki yerine canlı takip'],
          ['test.slow(...)', 'Timeout\'u 3\'e katla (yavaş bir işlem için)', '@Timeout artırımı'],
          ['test.describe.serial(...)', 'Bu gruptaki testler sırayla ve birbirine bağımlı çalışır', '@TestMethodOrder'],
          ['npx playwright test --grep @smoke', '"@smoke" etiketli testleri çalıştır', '@Tag("smoke") + Maven profile'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Test Isolation — Testler Birbirine Güvenmemeli',
        content: '"create product" testi çalışmadan "edit product" testi başarısız oluyorsa, bu iki test BİRBİRİNE BAĞIMLI demektir — paralel çalıştığında veya sırası değiştiğinde patlar. Her test kendi verisini kendisi oluşturmalı (self-contained). Playwright her teste otomatik olarak taze bir browser context/page verir — bu, yanlışlıkla state paylaşmanı bir nebze önler ama test verisi (DB kaydı, oluşturulan ürün) hâlâ senin sorumluluğundadır.',
      },
      { type: 'heading', text: 'Fixture\'lar — Dependency Injection' },
      {
        type: 'text',
        content: '{ page } yazdığında page\'in nereden geldiğini sormazsın — Playwright onu sana hazır verir. Bu bir fixture\'dır. Built-in fixture\'lar: page (taze sayfa), context (page\'in ait olduğu browser context — cookie/oturum paylaşımı için), browser (yeni context\'ler açmak için), request (UI olmadan API çağrısı için), browserName (chromium/firefox/webkit ayrımı için).',
      },
      {
        type: 'code', language: 'typescript',
        code: `// fixtures.ts — kendi fixture'ını tanımla
import { test as base } from '@playwright/test';

type MyFixtures = { loggedInPage: import('@playwright/test').Page };

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    // SETUP — test başlamadan önce
    await page.goto('/login');
    await page.getByLabel('E-posta').fill('kullanici@example.com');
    await page.getByLabel('Şifre').fill('sifre123');
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    await page.waitForURL('/dashboard');

    await use(page); // ← testin kendisi burada çalışır

    // TEARDOWN — test bittikten sonra (use() satırından sonrası)
    await page.goto('/logout');
  },
});
export { expect } from '@playwright/test';

// test dosyasında:
import { test, expect } from './fixtures';
test('dashboard zaten giriş yapılmış geliyor', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Tekrar hoş geldin')).toBeVisible();
  // login kodu burada YOK — fixture hallediyor
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'fixture-di',
        icon: '🧩',
        title: { tr: 'Fixture Dependency Injection Akışı', en: 'Fixture Dependency Injection Flow' },
        steps: [
          {
            id: 'request', label: 'Test İmzasında İste', labelEn: 'Request in Test Signature', visualState: 'request',
            description: { tr: 'Test fonksiyonu parametre olarak { loggedInPage } ister. Henüz hiçbir login kodu çalışmadı — sadece "buna ihtiyacım var" denildi.', en: 'The test function asks for { loggedInPage } as a parameter. No login code has run yet — it just says "I need this".' },
            code: `test('...', async ({ loggedInPage }) => {\n  // henüz çalışmadı\n});`,
          },
          {
            id: 'setup', label: 'Fixture Setup Çalışır', labelEn: 'Fixture Setup Runs', visualState: 'setup',
            description: { tr: 'Playwright loggedInPage fixture\'ının setup kodunu (login adımları) otomatik çalıştırır — test kodu bunu görmez.', en: 'Playwright automatically runs the loggedInPage fixture\'s setup code (the login steps) — the test code never sees this.' },
            code: `await page.goto('/login');\nawait page.getByLabel('E-posta').fill(...);\n...`,
          },
          {
            id: 'inject', label: 'use() ile Enjekte Edilir', labelEn: 'Injected via use()', visualState: 'inject',
            description: { tr: 'await use(page) çağrıldığında, artık login olmuş page objesi test fonksiyonuna parametre olarak geçer.', en: 'When await use(page) is called, the now-logged-in page object is passed into the test function as its parameter.' },
            code: `test('...', async ({ loggedInPage }) => {\n  // loggedInPage = giriş yapılmış page\n});`,
          },
          {
            id: 'teardown', label: 'Test Biter → Teardown', labelEn: 'Test Ends → Teardown', visualState: 'teardown',
            description: { tr: 'Test fonksiyonu bittiğinde, use() satırından sonraki kod (teardown) otomatik çalışır — örn. logout.', en: 'When the test function finishes, the code after the use() line (teardown) runs automatically — e.g. logout.' },
            code: `await use(page);\n// ↓ test bitince buradan devam\nawait page.goto('/logout');`,
          },
        ],
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌐', label: 'Test Scope (varsayılan)', desc: 'Her test için yeni bir fixture örneği oluşturulur.' },
          { icon: '👷', label: 'Worker Scope', desc: '{ scope: "worker" } — aynı worker\'daki tüm testler tek bir örneği paylaşır (örn. DB bağlantısı).' },
          { icon: '🤖', label: 'Auto Fixture', desc: '{ auto: true } — test parametresinde istenmese bile her testte otomatik çalışır (örn. console log dinleyici).' },
          { icon: '🔗', label: 'Birleştirme', desc: 'Bir fixture başka bir fixture\'a bağımlı olabilir: loggedInPage, testUser fixture\'ını kullanabilir.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — beforeEach + Test Sırası', en: 'Try It Yourself — beforeEach + Test Order' },
        intro: { tr: 'Bir test.describe() bloğu içinde önce beforeEach ile login yap, sonra iki testi sırayla yaz, en sonda describe.serial işaretlemesini ekle.', en: 'Inside a test.describe() block, first log in with beforeEach, then write two tests in order, and finally add the describe.serial marker.' },
        starterCommands: {
          tr: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('hoş geldin mesajı görünür', async ({ page }) => {});
test('son siparişler listelenir', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
          en: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('shows welcome message', async ({ page }) => {});
test('lists recent orders', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
        },
        expectedSteps: [
          { pattern: 'test\\.describe\\(', label: { tr: '1) test.describe ile grupla', en: '1) Group with test.describe' }, example: "test.describe('Dashboard', () => {...})" },
          { pattern: 'beforeEach', label: { tr: '2) beforeEach ile login adımını yaz', en: '2) Write the login step in beforeEach' }, example: 'test.beforeEach(async ({ page }) => {...})' },
          { pattern: "test\\('", label: { tr: '3) En az bir test ekle', en: '3) Add at least one test' }, example: "test('...', async ({ page }) => {...})" },
          { pattern: 'mode.*serial|describe\\.serial', label: { tr: '4) Gerekirse serial mode belirt', en: '4) Specify serial mode if needed' }, example: "test.describe.configure({ mode: 'serial' });" },
        ],
        successOutput: { tr: '✅ Doğru yapı! Login mantığı tek bir yerde (beforeEach), her test sadece kendi davranışına odaklanıyor.', en: '✅ Correct structure! Login logic lives in one place (beforeEach), each test focuses only on its own behavior.' },
        retryOutput: { tr: '❌ Eksik adım var — describe, beforeEach ve en az bir test gerekli.', en: '❌ A step is missing — you need describe, beforeEach, and at least one test.' },
      },
      {
        type: 'quiz',
        question: { tr: 'test.beforeAll() içinde { page } yerine neden { browser } kullanılır?', en: 'Why does test.beforeAll() use { browser } instead of { page }?' },
        options: [
          { id: 'a', text: 'page fixture sadece her test için ayrı oluşturulur, beforeAll\'da paylaşılan bir page yoktur' },
          { id: 'b', text: 'browser daha hızlı çalışır' },
          { id: 'c', text: 'page fixture\'ı sadece TypeScript\'te çalışır' },
          { id: 'd', text: 'Hiçbir fark yoktur, ikisi de aynı şeydir' },
        ],
        correct: 'a',
        explanation: { tr: 'page fixture test-scoped\'dır — her test için sıfırdan oluşturulur ve testler arası izolasyonu garanti eder. beforeAll bir kere çalıştığı için page fixture\'ı orada anlamlı değildir; bunun yerine browser fixture verilir, gerekirse browser.newPage() ile manuel sayfa açılır.', en: 'The page fixture is test-scoped — it\'s created fresh for every single test to guarantee isolation. Since beforeAll runs only once, the page fixture doesn\'t make sense there; instead the browser fixture is provided, and you can manually open a page with browser.newPage() if needed.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright testlerinde 'test.beforeAll' bloğunda 'page' fixture'ı neden kullanılamaz?",
            "en": "Why can't the 'page' fixture be used within a 'test.beforeAll' block in Playwright tests?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "page fixture'ı her bir test için özel olarak izole edilmiş bir şekilde oluşturulur.",
                        "en": "The page fixture is created specifically isolated for each individual test."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "beforeAll bloğu içerisinde sadece browserContext kullanılabilir.",
                        "en": "Only the browserContext can be used inside a beforeAll block."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Playwright mimarisi beforeAll içinde UI etkileşimlerini yasaklar.",
                        "en": "Playwright architecture forbids UI interactions inside beforeAll."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "beforeAll sadece asenkron işlemler için tasarlanmıştır.",
                        "en": "beforeAll is designed only for asynchronous operations."
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "page fixture'ı test seviyesinde (test-scoped) tanımlanmıştır. Yani her test kendi temiz 'page' nesnesine sahiptir. beforeAll ise tüm test dosyasından önce bir kez çalışır, bu yüzden o an henüz oluşturulmuş bir test-specific page yoktur.",
            "en": "The page fixture is test-scoped. This means every test receives its own clean 'page' object. Since beforeAll runs only once before all tests in the file, there is no test-specific page available at that point."
      }
}
},
    ],
  },
  en: {
    title: '🗂️ Test Organization & Fixtures',
    blocks: [
      {
        type: 'simple-box', emoji: '🧰',
        content: 'Re-typing "first log in, then add an item to the cart" at the top of every single test is like re-explaining "first set up the kitchen, light the stove, grab a pot" at the start of every recipe. Fixtures are like a sous-chef who sets up the kitchen for you ahead of time — you just ask for "loggedInPage", and Playwright handles the login in the background and hands you the ready-to-use page.',
      },
      {
        type: 'text',
        content: 'Test organization has two main pieces: (1) grouping tests into logical groups with test.describe() and writing shared setup/teardown code with hooks like beforeEach/afterEach, and (2) using fixtures to inject that setup code into tests automatically as "dependency injection". Together, they reduce repeated code across hundreds of tests to near zero.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'test.describe() is like a JUnit @Nested test class. test.beforeEach() / afterEach() → JUnit @BeforeEach / @AfterEach. test.beforeAll() / afterAll() → @BeforeAll / @AfterAll (but these receive { browser }, not { page } — page is never shared between tests). Fixtures are similar to Spring\'s @Autowired dependency injection: you ask for what you need as a parameter, and the framework hands it to you ready-made — you don\'t manually do new LoginPage(driver).',
      },
      { type: 'heading', text: 'The Anatomy of a Test — Arrange / Act / Assert' },
      {
        type: 'code', language: 'typescript',
        code: `import { test, expect } from '@playwright/test';

test('successful login redirects to dashboard', async ({ page }) => {
  // Arrange — set up
  await page.goto('/login');

  // Act — do the thing
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Assert — verify
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome back')).toBeVisible();
});`,
      },
      { type: 'heading', text: 'Grouping with describe + Hooks' },
      {
        type: 'code', language: 'typescript',
        code: `test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Runs before EVERY test in this group
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('shows welcome message', async ({ page }) => {
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('lists recent orders', async ({ page }) => {
    await expect(page.getByRole('list', { name: 'Recent Orders' })).toBeVisible();
  });
});`,
      },
      {
        type: 'table',
        headers: ['Control', 'What it does', 'Java equivalent'],
        rows: [
          ['test.skip(...)', 'Skip the test for now (not ready yet)', '@Disabled'],
          ['test.only(...)', 'Run ONLY this test while developing', 'Filtering with @Tag'],
          ['test.fail(...)', 'Known bug — test passes if it FAILS', '@Disabled + tracking via a live ticket instead'],
          ['test.slow(...)', 'Triples the timeout (for a slow operation)', 'Increasing @Timeout'],
          ['test.describe.serial(...)', 'Tests in this group run in order and depend on each other', '@TestMethodOrder'],
          ['npx playwright test --grep @smoke', 'Run only tests tagged "@smoke"', '@Tag("smoke") + a Maven profile'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Test Isolation — Tests Must Not Trust Each Other',
        content: 'If "edit product" fails whenever "create product" hasn\'t run, those two tests are COUPLED — they\'ll break under parallel execution or if the order changes. Each test should create its own data (self-contained). Playwright gives every test a fresh browser context/page automatically — that prevents accidental state sharing, but test data (DB rows, created products) is still your responsibility.',
      },
      { type: 'heading', text: 'Fixtures — Dependency Injection' },
      {
        type: 'text',
        content: 'When you write { page }, you never ask where page comes from — Playwright hands it to you ready-made. That\'s a fixture. Built-in fixtures: page (a fresh page), context (the browser context the page belongs to — for sharing cookies/sessions), browser (for opening new contexts), request (for calling APIs without a UI), browserName (to branch logic for chromium/firefox/webkit).',
      },
      {
        type: 'code', language: 'typescript',
        code: `// fixtures.ts — define your own fixture
import { test as base } from '@playwright/test';

type MyFixtures = { loggedInPage: import('@playwright/test').Page };

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    // SETUP — before the test starts
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('/dashboard');

    await use(page); // ← the test itself runs here

    // TEARDOWN — after the test finishes (code after use())
    await page.goto('/logout');
  },
});
export { expect } from '@playwright/test';

// in a test file:
import { test, expect } from './fixtures';
test('dashboard arrives already logged in', async ({ loggedInPage }) => {
  await expect(loggedInPage.getByText('Welcome back')).toBeVisible();
  // no login code here — the fixture handles it
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'fixture-di',
        icon: '🧩',
        title: { tr: 'Fixture Dependency Injection Akışı', en: 'Fixture Dependency Injection Flow' },
        steps: [
          {
            id: 'request', label: 'Request in Test Signature', labelEn: 'Request in Test Signature', visualState: 'request',
            description: { tr: 'Test fonksiyonu parametre olarak { loggedInPage } ister. Henüz hiçbir login kodu çalışmadı.', en: 'The test function asks for { loggedInPage } as a parameter. No login code has run yet — it just says "I need this".' },
            code: `test('...', async ({ loggedInPage }) => {\n  // hasn't run yet\n});`,
          },
          {
            id: 'setup', label: 'Fixture Setup Runs', labelEn: 'Fixture Setup Runs', visualState: 'setup',
            description: { tr: 'Playwright loggedInPage fixture\'ının setup kodunu otomatik çalıştırır.', en: 'Playwright automatically runs the loggedInPage fixture\'s setup code (the login steps) — the test code never sees this.' },
            code: `await page.goto('/login');\nawait page.getByLabel('Email').fill(...);\n...`,
          },
          {
            id: 'inject', label: 'Injected via use()', labelEn: 'Injected via use()', visualState: 'inject',
            description: { tr: 'await use(page) çağrıldığında, login olmuş page objesi test fonksiyonuna geçer.', en: 'When await use(page) is called, the now-logged-in page object is passed into the test function as its parameter.' },
            code: `test('...', async ({ loggedInPage }) => {\n  // loggedInPage = already logged in\n});`,
          },
          {
            id: 'teardown', label: 'Test Ends → Teardown', labelEn: 'Test Ends → Teardown', visualState: 'teardown',
            description: { tr: 'Test fonksiyonu bittiğinde, use() satırından sonraki kod (teardown) otomatik çalışır.', en: 'When the test function finishes, the code after the use() line (teardown) runs automatically — e.g. logout.' },
            code: `await use(page);\n// ↓ continues here after the test ends\nawait page.goto('/logout');`,
          },
        ],
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌐', label: 'Test Scope (default)', desc: 'A new fixture instance is created for every test.' },
          { icon: '👷', label: 'Worker Scope', desc: '{ scope: "worker" } — all tests in the same worker share a single instance (e.g. a DB connection).' },
          { icon: '🤖', label: 'Auto Fixture', desc: '{ auto: true } — runs automatically on every test even if not requested as a parameter (e.g. a console log listener).' },
          { icon: '🔗', label: 'Composition', desc: 'A fixture can depend on another fixture: loggedInPage can use the testUser fixture.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — beforeEach + Test Sırası', en: 'Try It Yourself — beforeEach + Test Order' },
        intro: { tr: 'Bir test.describe() bloğu içinde önce beforeEach ile login yap, sonra iki testi sırayla yaz, en sonda describe.serial işaretlemesini ekle.', en: 'Inside a test.describe() block, first log in with beforeEach, then write two tests in order, and finally add the describe.serial marker.' },
        starterCommands: {
          tr: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('hoş geldin mesajı görünür', async ({ page }) => {});
test('son siparişler listelenir', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
          en: `test.describe('Dashboard', () => {
test.beforeEach(async ({ page }) => { await page.goto('/login'); });
test('shows welcome message', async ({ page }) => {});
test('lists recent orders', async ({ page }) => {});
test.describe.configure({ mode: 'serial' });`,
        },
        expectedSteps: [
          { pattern: 'test\\.describe\\(', label: { tr: '1) test.describe ile grupla', en: '1) Group with test.describe' }, example: "test.describe('Dashboard', () => {...})" },
          { pattern: 'beforeEach', label: { tr: '2) beforeEach ile login adımını yaz', en: '2) Write the login step in beforeEach' }, example: 'test.beforeEach(async ({ page }) => {...})' },
          { pattern: "test\\('", label: { tr: '3) En az bir test ekle', en: '3) Add at least one test' }, example: "test('...', async ({ page }) => {...})" },
          { pattern: 'mode.*serial|describe\\.serial', label: { tr: '4) Gerekirse serial mode belirt', en: '4) Specify serial mode if needed' }, example: "test.describe.configure({ mode: 'serial' });" },
        ],
        successOutput: { tr: '✅ Doğru yapı!', en: '✅ Correct structure! Login logic lives in one place (beforeEach), each test focuses only on its own behavior.' },
        retryOutput: { tr: '❌ Eksik adım var.', en: '❌ A step is missing — you need describe, beforeEach, and at least one test.' },
      },
      {
        type: 'quiz',
        question: { tr: 'test.beforeAll() içinde { page } yerine neden { browser } kullanılır?', en: 'Why does test.beforeAll() use { browser } instead of { page }?' },
        options: [
          { id: 'a', text: 'page is created fresh per test, there\'s no shared page available in beforeAll' },
          { id: 'b', text: 'browser runs faster' },
          { id: 'c', text: 'The page fixture only works in TypeScript' },
          { id: 'd', text: 'There is no difference, they are the same thing' },
        ],
        correct: 'a',
        explanation: { tr: 'page fixture test-scoped\'dır ve testler arası izolasyonu garanti eder. beforeAll bir kere çalıştığı için page fixture\'ı orada anlamlı değildir.', en: 'The page fixture is test-scoped — it\'s created fresh for every single test to guarantee isolation. Since beforeAll runs only once, the page fixture doesn\'t make sense there; instead the browser fixture is provided, and you can manually open a page with browser.newPage() if needed.' },
      
        retryQuestion: {
      "question": {
            "tr": "test.beforeAll() kullanırken neden 'browser' fixture'ını tercih etmeliyiz?",
            "en": "Why should we prefer the 'browser' fixture when using test.beforeAll()?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Çünkü browser fixture'ı testler arası izolasyonu bozar.",
                        "en": "Because the browser fixture breaks test isolation."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Çünkü page fixture'ı sadece test.beforeEach() içinde erişilebilirdir.",
                        "en": "Because the page fixture is only accessible within test.beforeEach()."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Çünkü browser fixture'ı, beforeAll içinde manuel olarak context ve page oluşturmamıza olanak sağlar.",
                        "en": "Because the browser fixture allows us to manually create contexts and pages within beforeAll."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Çünkü browser fixture'ı test süresini kısaltır.",
                        "en": "Because the browser fixture shortens the test execution time."
                  }
            }
      ],
      "correct": "c",
      "explanation": {
            "tr": "beforeAll, tekil testlerin yaşam döngüsünden bağımsız olduğu için otomatik page fixture'ına sahip değildir. Browser fixture'ını kullanarak manuel bir sayfa veya context oluşturmak, kurulum işlemlerini (setUp) özelleştirmenize imkan verir.",
            "en": "Since beforeAll is independent of individual test lifecycles, it does not have the automatic page fixture. Using the browser fixture allows you to manually instantiate a context or page, giving you control over the setup process."
      }
}
},
    ],
  },
}

const s12 = {
  tr: {
    title: '📦 Page Object Model — Doğru Yapılışı',
    blocks: [
      {
        type: 'simple-box', emoji: '🏠',
        content: 'Login sayfasının kapısının nerede olduğunu 50 farklı arkadaşına 50 kere ayrı ayrı tarif etmek yerine, tek bir kroki çizip herkese o krokiyi gösterirsin — kapı yeri değişirse tek krokiyi güncellersin, 50 arkadaşına tekrar tarif etmen gerekmez. Page Object Model (POM) tam bunu yapar: bir sayfanın elemanlarını ve eylemlerini TEK bir sınıfta toplar, testler o sınıfı kullanır.',
      },
      {
        type: 'text',
        content: 'POM olmadan: 20 farklı test dosyasında aynı login locator\'ları ve aynı login adımları kopyalanır. Login butonu "Giriş Yap" yerine "Oturum Aç" olarak değiştiğinde, 20 dosyayı tek tek düzeltmen gerekir. POM ile: locator ve login mantığı LoginPage sınıfında bir kere yazılır; buton metni değiştiğinde sadece o sınıfı güncellersin, tüm testler otomatik düzelir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Bu, Selenium projelerinde yazdığın "Page Object" sınıflarıyla %100 aynı tasarım deseni — @FindBy ile alan tanımlayıp login() metodu yazdığın LoginPage class\'ını hatırla. Playwright\'ta @FindBy yerine constructor içinde page.getByRole(...) ile locator tanımlarsın; PageFactory.initElements() gibi ekstra bir başlatma adımına gerek yoktur, locator\'lar "lazy" çalışır (gerçek arama, kullanıldığı anda olur).',
      },
      { type: 'heading', text: 'İlk Page Object\'in' },
      {
        type: 'code', language: 'typescript',
        code: `// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('E-posta');
    this.passwordInput = page.getByLabel('Şifre');
    this.signInButton = page.getByRole('button', { name: 'Giriş Yap' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('başarılı giriş dashboard\\'a yönlendirir', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('kullanici@example.com', 'sifre123');
  await expect(page).toHaveURL('/dashboard');
});

test('yanlış şifre hata mesajı gösterir', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('kullanici@example.com', 'yanlissifre');
  await expect(loginPage.errorMessage).toHaveText('Geçersiz kimlik bilgileri');
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'pom-flow',
        icon: '📦',
        title: { tr: 'POM Olmadan vs POM ile', en: 'Without POM vs With POM' },
        steps: [
          {
            id: 'no-pom', label: 'POM Yok — Kod Tekrarı', labelEn: 'No POM — Duplicated Code', visualState: 'no-pom',
            description: { tr: '20 test dosyasının her birinde aynı email/password locator\'ları ve aynı login adımları ayrı ayrı yazılmış. Buton metni değişirse 20 dosya elle düzeltilmeli.', en: '20 test files each have the same email/password locators and the same login steps copy-pasted. If the button text changes, all 20 files need manual fixing.' },
            code: `// login.spec.ts\npage.getByLabel('E-posta').fill(...)\n// checkout.spec.ts\npage.getByLabel('E-posta').fill(...)\n// profile.spec.ts\npage.getByLabel('E-posta').fill(...)\n// ...17 dosya daha 😱`,
          },
          {
            id: 'extract', label: 'LoginPage Sınıfına Taşı', labelEn: 'Extract into LoginPage Class', visualState: 'extract',
            description: { tr: 'Tekrar eden locator + login mantığı TEK bir LoginPage sınıfına taşınır. Artık "tek doğru kaynak" (single source of truth) var.', en: 'The duplicated locator + login logic is moved into ONE LoginPage class. Now there\'s a single source of truth.' },
            code: `class LoginPage {\n  emailInput = page.getByLabel('E-posta');\n  async login(e, p) { ... }\n}`,
          },
          {
            id: 'reuse', label: '20 Test Aynı Sınıfı Kullanır', labelEn: '20 Tests Reuse the Same Class', visualState: 'reuse',
            description: { tr: 'Her test dosyası new LoginPage(page) yapıp loginPage.login(...) çağırır. Locator tanımı artık sadece bir yerde.', en: 'Every test file does new LoginPage(page) and calls loginPage.login(...). The locator definition now lives in exactly one place.' },
            code: `const loginPage = new LoginPage(page);\nawait loginPage.login(email, pass);`,
          },
          {
            id: 'change', label: 'UI Değişti → Tek Yer Düzelt', labelEn: 'UI Changes → Fix One Place', visualState: 'change',
            description: { tr: '"Giriş Yap" butonu "Oturum Aç" oldu. Sadece LoginPage.ts içindeki bir satırı değiştirirsin — 20 test dosyasına dokunmazsın, hepsi otomatik düzelir.', en: 'The "Sign in" button becomes "Log in". You change exactly one line in LoginPage.ts — you never touch the 20 test files, they all just work.' },
            code: `// LoginPage.ts — TEK satır değişti\nsignInButton = page.getByRole('button',\n  { name: 'Oturum Aç' }); // ✅`,
          },
        ],
      },
      { type: 'heading', text: 'En İyi Pratikler' },
      {
        type: 'table',
        headers: ['Kural', 'Neden'],
        rows: [
          ['Eylemleri expose et, implementasyonu değil', 'login(email, pass) yaz; emailInput\'u dışarıya açıp testte .fill() çağırma — iç yapı değişirse test kırılır'],
          ['Navigasyon yapan metot, yeni Page Object döndürsün', 'async login(): Promise<DashboardPage> { ...; return new DashboardPage(this.page); } → zincirleme kullanım mümkün olur'],
          ['Assertion\'ları Page Object\'in İÇİNE yazma', 'Page Object veri ve eylem sağlar; doğrulamayı test kendisi yapar — farklı testler farklı assertion isteyebilir'],
          ['Dinamik locator\'lar için metot kullan', 'productCard(name) gibi parametre alan bir metot yaz; statik locator\'lar property olarak kalsın'],
          ['Tekrarlayan UI parçaları (navbar, modal) için Component Object yaz', 'NavBar sınıfı ProductsPage içine inject edilebilir, kod tekrarını önler'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🤔',
        title: 'POM Her Zaman Gerekli mi?',
        content: 'Hayır. Tek seferlik bir keşif testi yazıyorsan, UI hâlâ hızla değişiyorsa ya da sayfa çok basitse (1-2 eleman) POM ekstra karmaşıklık katar. Kural: "Önce POM olmadan başla, kod tekrarını fark ettiğin anda çıkar (extract)." Erken POM yazmak, henüz şekillenmemiş bir UI için yanlış bir abstraction oluşturabilir.',
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — LoginPage Sınıfını Doğru Kullan', en: 'Try It Yourself — Use the LoginPage Class Correctly' },
        intro: { tr: 'Bir testte LoginPage sınıfını doğru sırayla kullan: önce instance oluştur, sayfaya git, login ol, sonra assertion yaz.', en: 'Use the LoginPage class correctly in a test: first create an instance, navigate, log in, then assert.' },
        starterCommands: {
          tr: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('kullanici@example.com', 'sifre123');
await expect(page).toHaveURL('/dashboard');`,
          en: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user@example.com', 'password123');
await expect(page).toHaveURL('/dashboard');`,
        },
        expectedSteps: [
          { pattern: 'new LoginPage', label: { tr: '1) LoginPage instance\'ı oluştur', en: '1) Create a LoginPage instance' }, example: 'const loginPage = new LoginPage(page);' },
          { pattern: '\\.goto\\(', label: { tr: '2) Sayfaya git', en: '2) Navigate to the page' }, example: 'await loginPage.goto();' },
          { pattern: '\\.login\\(', label: { tr: '3) login() metodunu çağır', en: '3) Call the login() method' }, example: "await loginPage.login(email, pass);" },
          { pattern: 'expect\\(', label: { tr: '4) Sonucu test içinde doğrula', en: '4) Assert the result in the test' }, example: "await expect(page).toHaveURL('/dashboard');" },
        ],
        successOutput: { tr: '✅ Doğru kullanım! Locator/login mantığı LoginPage\'de, assertion testin kendisinde — sorumluluklar net ayrılmış.', en: '✅ Correct usage! Locator/login logic lives in LoginPage, the assertion lives in the test — responsibilities are cleanly separated.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Page Object sınıfının içine assertion (expect) yazmamak neden önerilir?', en: 'Why is it recommended NOT to put assertions (expect) inside a Page Object class?' },
        options: [
          { id: 'a', text: 'Playwright Page Object içinde expect() çalıştırmaya izin vermez' },
          { id: 'b', text: 'Farklı testler aynı eylemden sonra farklı şeyler doğrulamak isteyebilir; Page Object veri/eylem sağlamalı, doğrulama testin sorumluluğunda olmalı' },
          { id: 'c', text: 'Assertion\'lar sadece test dosyasının en üstünde tanımlanabilir' },
          { id: 'd', text: 'Performans nedeniyle assertion\'lar Page Object\'i yavaşlatır' },
        ],
        correct: 'b',
        explanation: { tr: 'Page Object\'ler "ne yapılabilir ve hangi veri var" sağlar (eylemler + locator\'lar). "Bu sonucun doğru olup olmadığı" testin bağlamına göre değişir — bu yüzden esnekliği korumak için assertion testte kalmalı.', en: 'Page Objects provide "what can be done and what data exists" (actions + locators). "Whether this result is correct" depends on the test\'s context — so assertions should stay in the test to preserve flexibility.' },
      
        retryQuestion: {
      "question": {
            "tr": "Page Object Model (POM) kullanırken, assertion'ları (doğrulamaları) testin kendisinde tutmanın temel avantajı nedir?",
            "en": "What is the primary advantage of keeping assertions inside the test itself when using the Page Object Model (POM)?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Assertion'ları PO'ya yazmak kodun çalışma süresini kısaltır",
                        "en": "Writing assertions in PO decreases the code execution time"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Testlerin, PO tarafından sağlanan eylemlerden sonra kendi doğrulama mantıklarını özelleştirebilmesini sağlar",
                        "en": "It allows tests to customize their own verification logic after actions provided by the PO"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "PO'lar, expect() fonksiyonunun çalışması için gerekli olan bağımlılıklara sahip değildir",
                        "en": "PO's do not possess the necessary dependencies for the expect() function to run"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Playwright'ta assertion'ların Page Object'ler içinde kullanılması yasaktır",
                        "en": "It is forbidden to use assertions inside Page Objects in Playwright"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "PO'lar eylemlerin ve yapıların bir temsilidir. Testin başarısı bağlamına göre değişebilir, bu nedenle doğrulamayı testin sorumluluğunda bırakmak kodun yeniden kullanılabilirliğini artırır.",
            "en": "POs are a representation of actions and structures. A test's success condition can vary by context, so leaving verification as the test's responsibility improves reusability."
      }
}
},
    ],
  },
  en: {
    title: '📦 Page Object Model Done Right',
    blocks: [
      {
        type: 'simple-box', emoji: '🏠',
        content: 'Instead of describing where the login page\'s door is to 50 different friends, 50 separate times, you draw one map and show that same map to everyone — if the door moves, you update one map instead of re-explaining it 50 times. The Page Object Model (POM) does exactly this: it gathers a page\'s elements and actions into ONE class, and tests use that class.',
      },
      {
        type: 'text',
        content: 'Without POM: the same login locators and login steps get copy-pasted across 20 test files. When the login button changes from "Sign in" to "Log in", you have to fix 20 files one by one. With POM: the locator and login logic are written once in a LoginPage class; when the button text changes, you update that one class, and every test automatically works again.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'This is the exact same design pattern as the "Page Object" classes you wrote in Selenium projects — remember the LoginPage class with @FindBy fields and a login() method? In Playwright, instead of @FindBy you define locators in the constructor with page.getByRole(...); there\'s no extra initialization step like PageFactory.initElements() — locators are "lazy" (the actual lookup happens only when used).',
      },
      { type: 'heading', text: 'Creating Your First Page Object' },
      {
        type: 'code', language: 'typescript',
        code: `// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('successful login redirects to dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});

test('wrong password shows an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'wrongpassword');
  await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
});`,
      },
      {
        type: 'playwright-visual',
        concept: 'pom-flow',
        icon: '📦',
        title: { tr: 'POM Olmadan vs POM ile', en: 'Without POM vs With POM' },
        steps: [
          {
            id: 'no-pom', label: 'No POM — Duplicated Code', labelEn: 'No POM — Duplicated Code', visualState: 'no-pom',
            description: { tr: '20 test dosyasının her birinde aynı email/password locator\'ları ayrı ayrı yazılmış.', en: '20 test files each have the same email/password locators and the same login steps copy-pasted. If the button text changes, all 20 files need manual fixing.' },
            code: `// login.spec.ts\npage.getByLabel('Email').fill(...)\n// checkout.spec.ts\npage.getByLabel('Email').fill(...)\n// profile.spec.ts\npage.getByLabel('Email').fill(...)\n// ...17 more files 😱`,
          },
          {
            id: 'extract', label: 'Extract into LoginPage Class', labelEn: 'Extract into LoginPage Class', visualState: 'extract',
            description: { tr: 'Tekrar eden locator + login mantığı TEK bir LoginPage sınıfına taşınır.', en: 'The duplicated locator + login logic is moved into ONE LoginPage class. Now there\'s a single source of truth.' },
            code: `class LoginPage {\n  emailInput = page.getByLabel('Email');\n  async login(e, p) { ... }\n}`,
          },
          {
            id: 'reuse', label: '20 Tests Reuse the Same Class', labelEn: '20 Tests Reuse the Same Class', visualState: 'reuse',
            description: { tr: 'Her test dosyası new LoginPage(page) yapıp loginPage.login(...) çağırır.', en: 'Every test file does new LoginPage(page) and calls loginPage.login(...). The locator definition now lives in exactly one place.' },
            code: `const loginPage = new LoginPage(page);\nawait loginPage.login(email, pass);`,
          },
          {
            id: 'change', label: 'UI Changes → Fix One Place', labelEn: 'UI Changes → Fix One Place', visualState: 'change',
            description: { tr: '"Giriş Yap" butonu "Oturum Aç" oldu. Sadece LoginPage.ts içindeki bir satırı değiştirirsin.', en: 'The "Sign in" button becomes "Log in". You change exactly one line in LoginPage.ts — you never touch the 20 test files, they all just work.' },
            code: `// LoginPage.ts — ONE line changed\nsignInButton = page.getByRole('button',\n  { name: 'Log in' }); // ✅`,
          },
        ],
      },
      { type: 'heading', text: 'Best Practices' },
      {
        type: 'table',
        headers: ['Rule', 'Why'],
        rows: [
          ['Expose actions, not implementation', 'Write login(email, pass); don\'t expose emailInput and call .fill() in the test — internal changes would break tests'],
          ['Methods that navigate should return a new Page Object', 'async login(): Promise<DashboardPage> { ...; return new DashboardPage(this.page); } → enables chaining'],
          ['Don\'t put assertions INSIDE the Page Object', 'Page Objects provide data and actions; the test itself should verify — different tests may need different assertions'],
          ['Use methods for dynamic locators', 'Write a method that takes a parameter, like productCard(name); keep static locators as properties'],
          ['Write Component Objects for repeated UI pieces (navbar, modal)', 'A NavBar class can be injected into ProductsPage, avoiding duplication'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🤔',
        title: 'Is POM Always Necessary?',
        content: 'No. If you\'re writing a one-off exploratory test, the UI is still changing rapidly, or the page is very simple (1-2 elements), POM adds unnecessary complexity. The rule of thumb: "Start without page objects. Extract them when you notice duplication." Writing POM too early can lock in the wrong abstraction for a UI that hasn\'t settled yet.',
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — LoginPage Sınıfını Doğru Kullan', en: 'Try It Yourself — Use the LoginPage Class Correctly' },
        intro: { tr: 'Bir testte LoginPage sınıfını doğru sırayla kullan.', en: 'Use the LoginPage class correctly in a test: first create an instance, navigate, log in, then assert.' },
        starterCommands: {
          tr: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('kullanici@example.com', 'sifre123');
await expect(page).toHaveURL('/dashboard');`,
          en: `const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user@example.com', 'password123');
await expect(page).toHaveURL('/dashboard');`,
        },
        expectedSteps: [
          { pattern: 'new LoginPage', label: { tr: '1) LoginPage instance\'ı oluştur', en: '1) Create a LoginPage instance' }, example: 'const loginPage = new LoginPage(page);' },
          { pattern: '\\.goto\\(', label: { tr: '2) Sayfaya git', en: '2) Navigate to the page' }, example: 'await loginPage.goto();' },
          { pattern: '\\.login\\(', label: { tr: '3) login() metodunu çağır', en: '3) Call the login() method' }, example: "await loginPage.login(email, pass);" },
          { pattern: 'expect\\(', label: { tr: '4) Sonucu test içinde doğrula', en: '4) Assert the result in the test' }, example: "await expect(page).toHaveURL('/dashboard');" },
        ],
        successOutput: { tr: '✅ Doğru kullanım!', en: '✅ Correct usage! Locator/login logic lives in LoginPage, the assertion lives in the test — responsibilities are cleanly separated.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Page Object sınıfının içine assertion (expect) yazmamak neden önerilir?', en: 'Why is it recommended NOT to put assertions (expect) inside a Page Object class?' },
        options: [
          { id: 'a', text: 'Playwright does not allow calling expect() inside a Page Object' },
          { id: 'b', text: 'Different tests may want to verify different things after the same action; the Page Object should provide data/actions, while verification stays the test\'s responsibility' },
          { id: 'c', text: 'Assertions can only be defined at the top of a test file' },
          { id: 'd', text: 'Assertions slow down the Page Object for performance reasons' },
        ],
        correct: 'b',
        explanation: { tr: 'Page Object\'ler "ne yapılabilir ve hangi veri var" sağlar. Sonucun doğru olup olmadığı testin bağlamına göre değişir.', en: 'Page Objects provide "what can be done and what data exists" (actions + locators). "Whether this result is correct" depends on the test\'s context — so assertions should stay in the test to preserve flexibility.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright testlerinde Page Object sınıfı içinde assertion barındırmamanın en önemli sebebi nedir?",
            "en": "What is the most significant reason to avoid including assertions within a Page Object class in Playwright tests?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Playwright mimarisi Page Object içinde assertion'ların kullanılmasını desteklemez",
                        "en": "Playwright architecture does not support the use of assertions within Page Objects"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Page Object sadece arayüz etkileşimlerine odaklanmalı; farklı testler aynı eylem için farklı doğrulama kriterlerine sahip olabilir",
                        "en": "Page Object should focus only on UI interactions; different tests might have different verification criteria for the same action"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Assertion kodları sadece test dosyalarının en alt satırında kullanılabilir",
                        "en": "Assertion codes can only be used on the very last line of test files"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Page Object'in karmaşıklığını artırarak testlerin başarısız olmasına yol açar",
                        "en": "It increases the complexity of the Page Object and leads to test failures"
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Page Object'ler sayfa yapısını ve eylemleri temsil etmelidir. Eğer assertion'ı PO içine gömerseniz, aynı sayfayı farklı bir test senaryosunda farklı bir şeyi kontrol etmek için kullanamazsınız.",
            "en": "Page Objects should represent the page structure and actions. If you embed the assertion inside the PO, you cannot use the same page in a different test scenario to check something else."
      }
}
},
    ],
  },
}

const s13 = {
  tr: {
    title: '🐞 Debugging — UI Mode & Trace Viewer',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'Bir maç hakemi anlık bir kararı tartışmalı bulduğunda VAR\'a (Video Asistan Hakem) bakar — olayı yavaşlatıp, farklı açılardan, adım adım izler. Playwright\'ın Trace Viewer\'ı testin VAR kaydı gibidir: test CI\'da sabah 3\'te patladıysa, sen orada olmasan da, neyin ne zaman olduğunu adım adım, ekran görüntüsüyle birlikte tekrar izleyebilirsin.',
      },
      {
        type: 'text',
        content: 'Selenium\'da bir test CI\'da fail olduğunda elinde genelde sadece bir stack trace ve belki bir log satırı olur — "neden" sorusuna cevap vermek için testi local\'de tekrar tekrar çalıştırman gerekir. Playwright\'ta bunun için üç farklı araç var: UI Mode (testi canlı, adım adım gözlemleme), Trace Viewer (geçmişe dönük "zaman yolculuğu" — kayıttan tekrar izleme) ve screenshot/video (statik kanıt).',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Selenium projelerinde flaky bir test CI\'da patladığında elinde TestNG/Allure raporundaki bir stack trace ve en fazla manuel eklediğin bir ekran görüntüsü olurdu — "tam o anda DOM neye benziyordu" sorusunun cevabı genelde yoktu. Playwright\'ın trace.zip dosyası, o anki TÜM DOM snapshot\'ını, network isteklerini, console loglarını ve her adımın ekran görüntüsünü saklar — local\'de hiç koşturmadan "zaman yolculuğu" yaparsın.',
      },
      { type: 'heading', text: 'Hızlı Debug Komutları' },
      {
        type: 'table',
        headers: ['Komut', 'Ne yapar'],
        rows: [
          ['npx playwright test --debug', 'Inspector açılır, test adım adım duraklatılabilir, Pick Locator ile elemana tıklayıp locator üretebilirsin'],
          ['npx playwright test --ui', 'UI Mode — testleri görsel arayüzden çalıştır, timeline\'da gezin, "time travel" ile her adımdaki DOM\'u gör'],
          ['npx playwright test --headed', 'Tarayıcı görünür şekilde çalışır (headless değil)'],
          ['npx playwright test --headed --slowmo=500', 'Her aksiyon arasına 500ms yavaşlatma ekler — gözle takip etmek için'],
          ['page.pause()', 'Kod içinde bu satıra gelince Inspector açılır, oradan devam/adım adım ilerletebilirsin'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'ui-mode',
        icon: '🖥️',
        title: { tr: 'Playwright UI Mode — Gerçek Arayüz', en: 'Playwright UI Mode — The Real Interface' },
        steps: [
          {
            id: 'launch', label: 'UI Mode Açılıyor', labelEn: 'Launching UI Mode', visualState: 'launch',
            description: { tr: 'npx playwright test --ui komutu, sol tarafta tüm test dosyalarının ağaç görünümünü, ortada bir önizleme alanını içeren ayrı bir pencere açar.', en: 'The command npx playwright test --ui opens a dedicated window with a tree view of all test files on the left and a preview area in the middle.' },
            code: `$ npx playwright test --ui`,
          },
          {
            id: 'run', label: 'Test Çalıştırılıyor', labelEn: 'Running a Test', visualState: 'run',
            description: { tr: 'Bir teste tıkladığında, her adım (goto, fill, click, expect) sırayla yeşil ✓ veya kırmızı ✗ ile işaretlenerek listelenir; testin canlı browser görüntüsü ortada akar.', en: 'Clicking a test lists every step (goto, fill, click, expect) one by one, marking each green ✓ or red ✗; the live browser view streams in the middle.' },
            code: `▶ login.spec.ts > successful login\n  ✓ goto('/login')\n  ✓ fill('Email')\n  ⏳ click('Sign in')`,
          },
          {
            id: 'timetravel', label: 'Time Travel — Adıma Tıkla', labelEn: 'Time Travel — Click a Step', visualState: 'timetravel',
            description: { tr: 'Geçmişteki herhangi bir adıma tıkladığında, sayfanın O ANDAKİ tam görünümü (DOM snapshot) anında gösterilir — testi yeniden çalıştırmana gerek yok.', en: 'Clicking any past step instantly shows the page\'s exact appearance (DOM snapshot) AT THAT MOMENT — no need to re-run the test.' },
            code: `// 3. adıma tıkla → o anki DOM görünür\n✓ fill('Email') ← buraya tıklandı\n  📸 snapshot anında gösterilir`,
          },
          {
            id: 'fail', label: 'Hata Anını İncele', labelEn: 'Inspect the Failure', visualState: 'fail',
            description: { tr: 'Bir adım kırmızı ✗ ise, sağ panelde tam hata mesajı, "Expected vs Received" karşılaştırması ve o anki DOM\'un ekran görüntüsü birlikte görünür.', en: 'When a step is red ✗, the right panel shows the full error message, an "Expected vs Received" comparison, and a screenshot of the DOM at that moment — all together.' },
            code: `✗ expect(locator).toBeVisible()\n  Expected: visible\n  Received: <element not found>\n  📸 [hata anı ekran görüntüsü]`,
          },
        ],
      },
      { type: 'heading', text: 'Trace Viewer — Geçmişe Dönük Tam Kayıt' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'on-first-retry',   // CI için ideal: sadece retry'da kaydet
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

// Kaydedilen trace'i incele:
// npx playwright show-trace test-results/login-chromium/trace.zip`,
      },
      {
        type: 'playwright-visual',
        concept: 'trace',
        icon: '📊',
        title: { tr: 'Trace Kaydı — Adım Adım', en: 'Trace Recording — Step by Step' },
        steps: [
          { id: 'record', label: 'Kayıt Başladı', labelEn: 'Recording Started', visualState: 'record', description: { tr: 'context.tracing.start() (veya config\'teki trace ayarı) ile her action, network isteği ve DOM snapshot kaydedilmeye başlar.', en: 'context.tracing.start() (or the trace config) begins recording every action, network request, and DOM snapshot.' }, code: `await context.tracing.start({\n  screenshots: true, snapshots: true\n});` },
          { id: 'screenshot', label: 'Hata → Screenshot', labelEn: 'Failure → Screenshot', visualState: 'screenshot', description: { tr: 'screenshot: "only-on-failure" ayarıyla sadece test fail olduğunda bir ekran görüntüsü otomatik kaydedilir — diskte yer kaplamadan.', en: 'With screenshot: "only-on-failure", a screenshot is automatically captured only when the test fails — without wasting disk space.' }, code: `screenshot: 'only-on-failure'` },
          { id: 'video', label: 'Video Kaydı', labelEn: 'Video Recording', visualState: 'video', description: { tr: 'video: "retain-on-failure" tüm testi kaydeder ama test PASS olursa videoyu otomatik siler — sadece fail olanlar saklanır.', en: 'video: "retain-on-failure" records the whole test but auto-deletes the video if the test passes — only failures are kept.' }, code: `video: 'retain-on-failure'` },
          { id: 'viewer', label: 'show-trace ile Aç', labelEn: 'Open with show-trace', visualState: 'viewer', description: { tr: 'npx playwright show-trace trace.zip ile timeline, network sekmesi, console logları ve kaynak kod satırı tek ekranda açılır.', en: 'npx playwright show-trace trace.zip opens the timeline, network tab, console logs, and source code line all on one screen.' }, code: `$ npx playwright show-trace trace.zip` },
        ],
      },
      {
        type: 'table',
        headers: ['Strateji', 'trace', 'screenshot', 'video', 'Ne zaman'],
        rows: [
          ['CI (önerilen)', 'on-first-retry', 'only-on-failure', 'retain-on-failure', 'Disk/zaman israfı olmadan yeterli kanıt'],
          ['Lokal geliştirme', 'off (UI Mode kullan)', 'off', 'off', 'UI Mode zaten canlı görüntü sağlıyor'],
          ['Kritik release smoke', 'on', 'on', 'on', 'Stakeholder\'a gösterim / tam kanıt arşivi'],
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Debug Sırasını Doğru Kur', en: 'Try It Yourself — Build the Right Debug Sequence' },
        intro: { tr: 'CI\'da fail eden bir testi incelemek için doğru sırayı kur: önce raporu indir, sonra trace.zip\'i aç, ardından UI Mode\'da yeniden çalıştır.', en: 'Build the right sequence to investigate a test that failed in CI: download the report first, then open trace.zip, then re-run it in UI Mode.' },
        starterCommands: {
          tr: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
          en: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
        },
        expectedSteps: [
          { pattern: 'show-report', label: { tr: '1) HTML raporunu aç', en: '1) Open the HTML report' }, example: 'npx playwright show-report' },
          { pattern: 'show-trace', label: { tr: '2) İlgili trace.zip\'i aç', en: '2) Open the relevant trace.zip' }, example: 'npx playwright show-trace trace.zip' },
          { pattern: '--ui', label: { tr: '3) UI Mode\'da yeniden çalıştır', en: '3) Re-run it in UI Mode' }, example: 'npx playwright test --ui' },
        ],
        successOutput: { tr: '✅ Doğru sıra! Önce kanıtı (rapor+trace) incele, sonra gerekirse canlı UI Mode\'da tekrar üret.', en: '✅ Correct order! Inspect the evidence (report+trace) first, then reproduce live in UI Mode if needed.' },
        retryOutput: { tr: '❌ Adım eksik veya sırası ters.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'CI\'da neden video: "on" yerine genellikle video: "retain-on-failure" tercih edilir?', en: 'Why is video: "retain-on-failure" usually preferred over video: "on" in CI?' },
        options: [
          { id: 'a', text: 'retain-on-failure videoyu sadece test fail olursa saklar; PASS olan binlerce testin videosunu diskte tutmak gereksiz yer/maliyet yaratır' },
          { id: 'b', text: '"on" ayarı geçersizdir' },
          { id: 'c', text: 'retain-on-failure daha yüksek çözünürlükte kayıt yapar' },
          { id: 'd', text: 'Hiçbir fark yoktur' },
        ],
        correct: 'a',
        explanation: { tr: 'Yüzlerce/binlerce PASS testin videosunu saklamak depolama maliyeti ve artifact upload süresini ciddi şekilde artırır. retain-on-failure sadece gerçekten incelemen gereken (fail olan) testlerin videosunu tutar.', en: 'Keeping videos for hundreds or thousands of passing tests seriously increases storage cost and artifact upload time. retain-on-failure keeps videos only for the tests you actually need to investigate (the failing ones).' },
      
        retryQuestion: {
      "question": {
            "tr": "CI ortamında 'video: on' yerine 'video: retain-on-failure' ayarının kullanılmasının temel sebebi nedir?",
            "en": "What is the primary reason for using the 'video: retain-on-failure' setting instead of 'video: on' in a CI environment?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Depolama alanı tasarrufu sağlar ve başarılı testlerin video yükleme yükünü azaltır",
                        "en": "It saves storage space and reduces the upload burden of passing tests"
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "'on' ayarı sadece yerel bilgisayarlarda çalışır",
                        "en": "'on' setting only works on local computers"
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Sadece 'retain-on-failure' ile videoları indirip inceleyebilirsiniz",
                        "en": "You can only download and examine videos with 'retain-on-failure'"
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Video kalitesini artırır",
                        "en": "It improves the video quality"
                  }
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "CI üzerinde her test için video kaydetmek disk maliyetini ve artifact yükleme süresini artırır. 'retain-on-failure' sadece hata ayıklama gerektiren başarısız testleri tutarak kaynak tasarrufu sağlar.",
            "en": "Recording video for every test on CI increases disk costs and artifact upload time. 'retain-on-failure' saves resources by keeping only the failing tests that require debugging."
      }
}
},
    ],
  },
  en: {
    title: '🐞 Debugging — UI Mode & Trace Viewer',
    blocks: [
      {
        type: 'simple-box', emoji: '🎥',
        content: 'When a referee finds a live call too close to decide, they check VAR (Video Assistant Referee) — slowing the moment down, watching it from different angles, step by step. Playwright\'s Trace Viewer is exactly that VAR recording for a test: if a test failed in CI at 3 AM and you weren\'t there, you can still watch step by step, with screenshots, exactly what happened.',
      },
      {
        type: 'text',
        content: 'In Selenium, when a test fails in CI you usually have only a stack trace and maybe one log line — answering "why" often means re-running the test locally over and over. Playwright gives you three dedicated tools for this: UI Mode (watch a test live, step by step), Trace Viewer (a recorded "time travel" replay after the fact), and screenshots/video (static evidence).',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'In Selenium projects, when a flaky test failed in CI, you usually had a stack trace in the TestNG/Allure report and maybe a manually-added screenshot — "what did the DOM actually look like at that exact moment" usually had no answer. Playwright\'s trace.zip stores the ENTIRE DOM snapshot, network requests, console logs, and a screenshot of every step at that moment — letting you "time travel" without re-running anything locally.',
      },
      { type: 'heading', text: 'Quick Debug Commands' },
      {
        type: 'table',
        headers: ['Command', 'What it does'],
        rows: [
          ['npx playwright test --debug', 'Opens the Inspector — pause step by step, use Pick Locator to click an element and generate its locator'],
          ['npx playwright test --ui', 'UI Mode — run tests from a visual interface, scrub the timeline, "time travel" to see the DOM at any step'],
          ['npx playwright test --headed', 'Runs the browser visibly (not headless)'],
          ['npx playwright test --headed --slowmo=500', 'Adds a 500ms delay between actions — for watching with your own eyes'],
          ['page.pause()', 'Opens the Inspector right when execution reaches this line; resume or step from there'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'ui-mode',
        icon: '🖥️',
        title: { tr: 'Playwright UI Mode — Gerçek Arayüz', en: 'Playwright UI Mode — The Real Interface' },
        steps: [
          {
            id: 'launch', label: 'Launching UI Mode', labelEn: 'Launching UI Mode', visualState: 'launch',
            description: { tr: 'npx playwright test --ui komutu, sol tarafta tüm test dosyalarının ağaç görünümünü, ortada bir önizleme alanını içeren ayrı bir pencere açar.', en: 'The command npx playwright test --ui opens a dedicated window with a tree view of all test files on the left and a preview area in the middle.' },
            code: `$ npx playwright test --ui`,
          },
          {
            id: 'run', label: 'Running a Test', labelEn: 'Running a Test', visualState: 'run',
            description: { tr: 'Bir teste tıkladığında, her adım sırayla yeşil ✓ veya kırmızı ✗ ile işaretlenerek listelenir.', en: 'Clicking a test lists every step (goto, fill, click, expect) one by one, marking each green ✓ or red ✗; the live browser view streams in the middle.' },
            code: `▶ login.spec.ts > successful login\n  ✓ goto('/login')\n  ✓ fill('Email')\n  ⏳ click('Sign in')`,
          },
          {
            id: 'timetravel', label: 'Time Travel — Click a Step', labelEn: 'Time Travel — Click a Step', visualState: 'timetravel',
            description: { tr: 'Geçmişteki herhangi bir adıma tıkladığında, sayfanın o anki tam görünümü anında gösterilir.', en: 'Clicking any past step instantly shows the page\'s exact appearance (DOM snapshot) AT THAT MOMENT — no need to re-run the test.' },
            code: `// click step 3 → that exact DOM appears\n✓ fill('Email') ← clicked here\n  📸 snapshot shown instantly`,
          },
          {
            id: 'fail', label: 'Inspect the Failure', labelEn: 'Inspect the Failure', visualState: 'fail',
            description: { tr: 'Bir adım kırmızı ✗ ise, sağ panelde tam hata mesajı ve "Expected vs Received" karşılaştırması görünür.', en: 'When a step is red ✗, the right panel shows the full error message, an "Expected vs Received" comparison, and a screenshot of the DOM at that moment — all together.' },
            code: `✗ expect(locator).toBeVisible()\n  Expected: visible\n  Received: <element not found>\n  📸 [screenshot at failure]`,
          },
        ],
      },
      { type: 'heading', text: 'Trace Viewer — A Full Historical Record' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'on-first-retry',   // ideal for CI: record only on retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

// Inspect a recorded trace:
// npx playwright show-trace test-results/login-chromium/trace.zip`,
      },
      {
        type: 'playwright-visual',
        concept: 'trace',
        icon: '📊',
        title: { tr: 'Trace Kaydı — Adım Adım', en: 'Trace Recording — Step by Step' },
        steps: [
          { id: 'record', label: 'Recording Started', labelEn: 'Recording Started', visualState: 'record', description: { tr: 'context.tracing.start() ile her action, network isteği ve DOM snapshot kaydedilmeye başlar.', en: 'context.tracing.start() (or the trace config) begins recording every action, network request, and DOM snapshot.' }, code: `await context.tracing.start({\n  screenshots: true, snapshots: true\n});` },
          { id: 'screenshot', label: 'Failure → Screenshot', labelEn: 'Failure → Screenshot', visualState: 'screenshot', description: { tr: 'screenshot: "only-on-failure" ayarıyla sadece test fail olduğunda bir ekran görüntüsü otomatik kaydedilir.', en: 'With screenshot: "only-on-failure", a screenshot is automatically captured only when the test fails — without wasting disk space.' }, code: `screenshot: 'only-on-failure'` },
          { id: 'video', label: 'Video Recording', labelEn: 'Video Recording', visualState: 'video', description: { tr: 'video: "retain-on-failure" tüm testi kaydeder ama test PASS olursa videoyu otomatik siler.', en: 'video: "retain-on-failure" records the whole test but auto-deletes the video if the test passes — only failures are kept.' }, code: `video: 'retain-on-failure'` },
          { id: 'viewer', label: 'Open with show-trace', labelEn: 'Open with show-trace', visualState: 'viewer', description: { tr: 'npx playwright show-trace trace.zip ile timeline, network sekmesi, console logları tek ekranda açılır.', en: 'npx playwright show-trace trace.zip opens the timeline, network tab, console logs, and source code line all on one screen.' }, code: `$ npx playwright show-trace trace.zip` },
        ],
      },
      {
        type: 'table',
        headers: ['Strategy', 'trace', 'screenshot', 'video', 'When'],
        rows: [
          ['CI (recommended)', 'on-first-retry', 'only-on-failure', 'retain-on-failure', 'Enough evidence without wasting disk/time'],
          ['Local development', 'off (use UI Mode)', 'off', 'off', 'UI Mode already gives you live visibility'],
          ['Critical release smoke', 'on', 'on', 'on', 'Stakeholder demos / a full evidence archive'],
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Debug Sırasını Doğru Kur', en: 'Try It Yourself — Build the Right Debug Sequence' },
        intro: { tr: 'CI\'da fail eden bir testi incelemek için doğru sırayı kur.', en: 'Build the right sequence to investigate a test that failed in CI: download the report first, then open trace.zip, then re-run it in UI Mode.' },
        starterCommands: {
          tr: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
          en: `npx playwright show-report
npx playwright show-trace test-results/login-chromium/trace.zip
npx playwright test login.spec.ts --ui`,
        },
        expectedSteps: [
          { pattern: 'show-report', label: { tr: '1) HTML raporunu aç', en: '1) Open the HTML report' }, example: 'npx playwright show-report' },
          { pattern: 'show-trace', label: { tr: '2) İlgili trace.zip\'i aç', en: '2) Open the relevant trace.zip' }, example: 'npx playwright show-trace trace.zip' },
          { pattern: '--ui', label: { tr: '3) UI Mode\'da yeniden çalıştır', en: '3) Re-run it in UI Mode' }, example: 'npx playwright test --ui' },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Inspect the evidence (report+trace) first, then reproduce live in UI Mode if needed.' },
        retryOutput: { tr: '❌ Adım eksik veya sırası ters.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'CI\'da neden video: "on" yerine genellikle video: "retain-on-failure" tercih edilir?', en: 'Why is video: "retain-on-failure" usually preferred over video: "on" in CI?' },
        options: [
          { id: 'a', text: 'retain-on-failure keeps the video only if the test fails; storing video for thousands of passing tests wastes disk and money for no reason' },
          { id: 'b', text: 'The "on" setting is invalid' },
          { id: 'c', text: 'retain-on-failure records at a higher resolution' },
          { id: 'd', text: 'There is no difference' },
        ],
        correct: 'a',
        explanation: { tr: 'Yüzlerce/binlerce PASS testin videosunu saklamak depolama maliyeti ve artifact upload süresini ciddi şekilde artırır.', en: 'Keeping videos for hundreds or thousands of passing tests seriously increases storage cost and artifact upload time. retain-on-failure keeps videos only for the tests you actually need to investigate (the failing ones).' },
      
        retryQuestion: {
      "question": {
            "tr": "CI ortamında trace: 'on' yerine trace: 'retain-on-failure' yapılandırmasını seçmenin temel avantajı nedir?",
            "en": "What is the primary advantage of choosing trace: 'retain-on-failure' over trace: 'on' in a CI environment?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "retain-on-failure yalnızca başarısız testlerde trace dosyası üretir, böylece başarılı binlerce testin yarattığı depolama yükü ve ağ trafiği önlenmiş olur"
            },
            {
                  "id": "b",
                  "text": "retain-on-failure trace dosyasını buluta otomatik olarak yedekler"
            },
            {
                  "id": "c",
                  "text": "trace: 'on' ayarı performans sorunlarına yol açtığı için devre dışı bırakılmıştır"
            },
            {
                  "id": "d",
                  "text": "İki seçenek arasında dosya boyutu veya kaynak kullanımı açısından bir fark yoktur"
            }
      ],
      "correct": "a",
      "explanation": {
            "tr": "Trace dosyaları detaylı hata ayıklama bilgisi içerir ve oldukça büyük olabilir. Başarılı testler için trace saklamak depolama maliyetlerini artırır ve CI pipeline süresini gereksiz yere uzatır. retain-on-failure sadece hata durumunda bu veriyi tutarak verimli bir süreç sağlar.",
            "en": "Trace files contain detailed debugging information and can be quite large. Storing traces for successful tests increases storage costs and unnecessarily extends CI pipeline duration. retain-on-failure provides an efficient process by only preserving this data in case of failure."
      }
}
},
    ],
  },
}

const s14 = {
  tr: {
    title: '⚡ Paralel · Cross-Browser · CI/CD',
    blocks: [
      {
        type: 'simple-box', emoji: '🏎️',
        content: '1 kasiyerli bir markette 100 müşteriyi tek tek sıraya dizmek yerine, 4 kasa açıp müşterileri 4 sıraya bölersin — toplam bekleme süresi yaklaşık 4\'e bölünür. Playwright\'ın "workers"ı tam bunu yapar: 100 testi 1 worker\'da sırayla değil, 4 worker\'da paralel çalıştırır. "Cross-browser" ise aynı 100 testi 3 farklı markette (Chrome, Firefox, Safari motorları) aynı anda denetlemek gibidir.',
      },
      {
        type: 'text',
        content: '30 dakika süren bir test paketi her commit\'te göz ardı edilir; 3 dakika süren bir paket her commit\'te koşulur. Bunu sağlayan iki mekanizma var: (1) paralel worker\'lar — testleri birden fazla CPU çekirdeğine bölmek, (2) sharding — testleri birden fazla CI makinesine bölmek. CI/CD entegrasyonu da bunları otomatik tetikleyen pipeline\'dır.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'workers ayarı, Maven Surefire/Failsafe plugin\'inin forkCount + parallel="methods" ayarına karşılık gelir. test.describe.serial() → JUnit 5\'in @TestMethodOrder ile sıralı zorunlu testleri. --shard=1/4 → CI\'da matrix build\'lerle testleri makineler arası bölmenin Playwright\'taki built-in karşılığı (Selenium Grid\'de bunu manuel kurman gerekirdi).',
      },
      { type: 'heading', text: 'Paralel Çalışma — Worker Ayarları' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  fullyParallel: true,          // aynı dosyadaki testler de paralelleşsin
  workers: process.env.CI ? 2 : undefined, // CI'da 2, lokalde yarı çekirdek (default)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});

// Bağımlı (sıralı) bir grup — checkout adımları birbirine bağlı
test.describe.serial('sıralı ödeme akışı', () => {
  test('1. sepete ekle', async ({ page }) => { /* ... */ });
  test('2. teslimat bilgisi gir', async ({ page }) => { /* ... */ });
  test('3. ödemeyi tamamla', async ({ page }) => { /* ... */ });
  // Biri fail olursa kalanlar otomatik skip edilir
});`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Serial vs Paralel (4 Worker) — Aynı 4 Test Dosyası', en: '⏱️ Serial vs Parallel (4 Workers) — the Same 4 Test Files' },
        description: { tr: 'Her dosya ~8 saniye sürüyor. Tek worker\'da sırayla çalıştığında toplam süre toplanır; 4 worker\'da paralel çalıştığında en uzun dosya kadar sürer.', en: 'Each file takes ~8 seconds. Running serially on one worker, the times add up; running in parallel on 4 workers, it only takes as long as the slowest single file.' },
        tracks: [
          { label: 'Serial — workers: 1', labelEn: 'Serial — workers: 1', duration: 32000, color: '#ef4444', badge: { tr: '32s', en: '32s' }, detail: { tr: '4 dosya × 8s, sırayla', en: '4 files × 8s, one after another' } },
          { label: 'Paralel — workers: 4', labelEn: 'Parallel — workers: 4', duration: 8500, color: '#10b981', badge: { tr: '8.5s', en: '8.5s' }, detail: { tr: '4 dosya aynı anda, en uzunu kadar sürer', en: '4 files run simultaneously, takes as long as the slowest one' } },
        ],
      },
      { type: 'heading', text: 'Cross-Browser & Mobil Emulation' },
      {
        type: 'table',
        headers: ['Motor', 'Gerçek tarayıcı', 'Komut'],
        rows: [
          ['chromium', 'Chrome, Edge', 'npx playwright test --project=chromium'],
          ['firefox', 'Firefox (Gecko)', 'npx playwright test --project=firefox'],
          ['webkit', 'Safari (macOS/iOS)', 'npx playwright test --project=webkit'],
        ],
      },
      {
        type: 'code', language: 'typescript',
        code: `// Mobil emulation — gerçek cihaz profilleri
projects: [
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  { name: 'iPad', use: { ...devices['iPad Pro 11'] } },
],

// Sadece bir tarayıcıda bilinen sorun varsa
test.skip(browserName === 'webkit', 'Safari\\'de henüz desteklenmiyor — bkz. JIRA-482');`,
      },
      { type: 'heading', text: 'GitHub Actions ile CI/CD' },
      {
        type: 'code', language: 'yaml',
        code: `# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]   # 4 makineye böl
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: playwright-report-\${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7`,
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔀', label: '--shard=1/4 ... 4/4', desc: 'Test paketini 4 CI makinesine böler; 20dk\'lık paket ~5dk\'ya iner.' },
          { icon: '🔐', label: 'GitHub Secrets', desc: 'Şifre/token gibi bilgiler ${{ secrets.X }} ile workflow\'a, process.env.X ile koda enjekte edilir.' },
          { icon: '🌐', label: 'webServer ayarı', desc: 'playwright.config.ts içinde webServer: { command: "npm start", url: "..." } ile Playwright önce uygulamanı başlatır, sonra testi koşar.' },
          { icon: '📦', label: 'Resmi Docker image', desc: 'mcr.microsoft.com/playwright:v1.4x — tüm tarayıcılar/dependency\'ler kurulu gelir, playwright install gerekmez.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — CI Workflow Adımlarını Doğru Sırala', en: 'Try It Yourself — Order the CI Workflow Steps Correctly' },
        intro: { tr: 'Bir GitHub Actions workflow\'unun doğru adım sırasını yaz: checkout, kurulum, browser indirme, test çalıştırma, artifact yükleme.', en: 'Write the correct step order for a GitHub Actions workflow: checkout, install, install browsers, run tests, upload artifacts.' },
        starterCommands: {
          tr: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
          en: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
        },
        expectedSteps: [
          { pattern: 'checkout', label: { tr: '1) Kodu checkout et', en: '1) Check out the code' }, example: 'actions/checkout@v4' },
          { pattern: 'npm ci', label: { tr: '2) Bağımlılıkları kur', en: '2) Install dependencies' }, example: 'npm ci' },
          { pattern: 'playwright install', label: { tr: '3) Tarayıcıları kur', en: '3) Install browsers' }, example: 'npx playwright install --with-deps' },
          { pattern: 'playwright test', label: { tr: '4) Testleri çalıştır', en: '4) Run the tests' }, example: 'npx playwright test' },
          { pattern: 'upload-artifact', label: { tr: '5) Raporu artifact olarak yükle', en: '5) Upload the report as an artifact' }, example: 'actions/upload-artifact@v4' },
        ],
        successOutput: { tr: '✅ Doğru sıra! Bu sıra olmadan (örn. browser kurmadan test çalıştırmak) pipeline patlar.', en: '✅ Correct order! Without this exact order (e.g. running tests before installing browsers), the pipeline breaks.' },
        retryOutput: { tr: '❌ Sıra yanlış veya bir adım eksik.', en: '❌ Wrong order or a step is missing.' },
      },
      {
        type: 'quiz',
        question: { tr: '--shard=1/4 ne işe yarar?', en: 'What does --shard=1/4 do?' },
        options: [
          { id: 'a', text: 'Testleri 4 kat hızlandırır, hiçbir ek makine gerekmez' },
          { id: 'b', text: 'Test paketinin 1/4\'lük dilimini bu makinede çalıştırır; diğer dilimler ayrı CI job\'larında (2/4, 3/4, 4/4) paralel koşar' },
          { id: 'c', text: 'Sadece ilk 4 testi çalıştırır' },
          { id: 'd', text: 'Testleri 4 farklı tarayıcıda art arda çalıştırır' },
        ],
        correct: 'b',
        explanation: { tr: 'Sharding, BÜYÜK bir test paketini CI\'da birden fazla MAKİNEYE (job) böler — her job sadece kendi diliminden sorumludur. Bu, paralel worker\'lardan (aynı makinedeki CPU çekirdekleri) farklıdır; ikisi birlikte kullanılır.', en: 'Sharding splits a LARGE test suite across multiple CI MACHINES (jobs) — each job is only responsible for its own slice. This is different from parallel workers (CPU cores on the same machine); the two are typically combined.' },
      
        retryQuestion: {
      "question": {
            "tr": "Bir CI pipeline yapılandırmasında --shard=3/5 parametresi ne anlama gelir?",
            "en": "What does the --shard=3/5 parameter mean in a CI pipeline configuration?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Testleri 5 farklı tarayıcıda aynı anda çalıştırır"
            },
            {
                  "id": "b",
                  "text": "Test paketini 5 parçaya böler ve mevcut makine bu parçalardan 3. olanını işler"
            },
            {
                  "id": "c",
                  "text": "Toplamda 3 makine kullanır ve her birinde 5 worker çalıştırır"
            },
            {
                  "id": "d",
                  "text": "Sadece 3. ve 5. testleri çalıştırır"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Sharding, test paketini toplam 'N' parçaya böler ve 'M/N' ifadesiyle bu job'ın kaçıncı parçadan sorumlu olduğu belirtilir. Bu, farklı makinelere dağıtılan paralel bir iş yükü yönetimidir.",
            "en": "Sharding divides the test suite into a total of 'N' slices, and 'M/N' indicates which specific slice this job is responsible for. This is a parallel workload management distributed across different machines."
      }
}
},
    ],
  },
  en: {
    title: '⚡ Parallel · Cross-Browser · CI/CD',
    blocks: [
      {
        type: 'simple-box', emoji: '🏎️',
        content: 'Instead of putting 100 customers through a single checkout lane, a store opens 4 lanes and splits the customers across them — the total wait time roughly divides by 4. Playwright\'s "workers" do exactly this: instead of running 100 tests sequentially on 1 worker, it runs them in parallel across 4 workers. "Cross-browser" is like inspecting the same 100 customers across 3 different stores (the Chrome, Firefox, and Safari engines) at the same time.',
      },
      {
        type: 'text',
        content: 'A test suite that takes 30 minutes gets ignored on every commit; one that takes 3 minutes gets run on every commit. Two mechanisms make this possible: (1) parallel workers — splitting tests across multiple CPU cores, and (2) sharding — splitting tests across multiple CI machines. CI/CD integration is the pipeline that triggers all of this automatically.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'The workers setting corresponds to Maven Surefire/Failsafe\'s forkCount + parallel="methods" setting. test.describe.serial() → JUnit 5\'s @TestMethodOrder for tests that must run in order. --shard=1/4 → Playwright\'s built-in equivalent of splitting tests across machines via CI matrix builds (something you had to set up manually with Selenium Grid).',
      },
      { type: 'heading', text: 'Parallel Execution — Worker Settings' },
      {
        type: 'code', language: 'typescript',
        code: `// playwright.config.ts
export default defineConfig({
  fullyParallel: true,          // parallelize tests within the same file too
  workers: process.env.CI ? 2 : undefined, // 2 in CI, half the cores locally (default)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});

// A dependent (serial) group — checkout steps depend on each other
test.describe.serial('sequential checkout flow', () => {
  test('1. add to cart', async ({ page }) => { /* ... */ });
  test('2. enter shipping info', async ({ page }) => { /* ... */ });
  test('3. complete payment', async ({ page }) => { /* ... */ });
  // If one fails, the rest are automatically skipped
});`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Serial vs Paralel (4 Worker) — Aynı 4 Test Dosyası', en: '⏱️ Serial vs Parallel (4 Workers) — the Same 4 Test Files' },
        description: { tr: 'Her dosya ~8 saniye sürüyor. Tek worker\'da sırayla çalıştığında toplam süre toplanır.', en: 'Each file takes ~8 seconds. Running serially on one worker, the times add up; running in parallel on 4 workers, it only takes as long as the slowest single file.' },
        tracks: [
          { label: 'Serial — workers: 1', labelEn: 'Serial — workers: 1', duration: 32000, color: '#ef4444', badge: { tr: '32s', en: '32s' }, detail: { tr: '4 dosya × 8s, sırayla', en: '4 files × 8s, one after another' } },
          { label: 'Paralel — workers: 4', labelEn: 'Parallel — workers: 4', duration: 8500, color: '#10b981', badge: { tr: '8.5s', en: '8.5s' }, detail: { tr: '4 dosya aynı anda, en uzunu kadar sürer', en: '4 files run simultaneously, takes as long as the slowest one' } },
        ],
      },
      { type: 'heading', text: 'Cross-Browser & Mobile Emulation' },
      {
        type: 'table',
        headers: ['Engine', 'Real browser', 'Command'],
        rows: [
          ['chromium', 'Chrome, Edge', 'npx playwright test --project=chromium'],
          ['firefox', 'Firefox (Gecko)', 'npx playwright test --project=firefox'],
          ['webkit', 'Safari (macOS/iOS)', 'npx playwright test --project=webkit'],
        ],
      },
      {
        type: 'code', language: 'typescript',
        code: `// Mobile emulation — real device profiles
projects: [
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  { name: 'iPad', use: { ...devices['iPad Pro 11'] } },
],

// Skip a test only when a browser has a known issue
test.skip(browserName === 'webkit', 'Not supported in Safari yet — see JIRA-482');`,
      },
      { type: 'heading', text: 'CI/CD with GitHub Actions' },
      {
        type: 'code', language: 'yaml',
        code: `# .github/workflows/playwright.yml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]   # split across 4 machines
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}/4
      - uses: actions/upload-artifact@v4
        if: \${{ !cancelled() }}
        with:
          name: playwright-report-\${{ matrix.shard }}
          path: playwright-report/
          retention-days: 7`,
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔀', label: '--shard=1/4 ... 4/4', desc: 'Splits the suite across 4 CI machines; a 20-minute suite drops to ~5 minutes.' },
          { icon: '🔐', label: 'GitHub Secrets', desc: 'Sensitive values are injected into the workflow with ${{ secrets.X }} and into code with process.env.X.' },
          { icon: '🌐', label: 'webServer setting', desc: 'In playwright.config.ts, webServer: { command: "npm start", url: "..." } makes Playwright start your app first, then run tests.' },
          { icon: '📦', label: 'Official Docker image', desc: 'mcr.microsoft.com/playwright:v1.4x — comes with all browsers/dependencies pre-installed, no playwright install needed.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — CI Workflow Adımlarını Doğru Sırala', en: 'Try It Yourself — Order the CI Workflow Steps Correctly' },
        intro: { tr: 'Bir GitHub Actions workflow\'unun doğru adım sırasını yaz.', en: 'Write the correct step order for a GitHub Actions workflow: checkout, install, install browsers, run tests, upload artifacts.' },
        starterCommands: {
          tr: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
          en: `actions/checkout@v4
npm ci
npx playwright install --with-deps
npx playwright test
actions/upload-artifact@v4`,
        },
        expectedSteps: [
          { pattern: 'checkout', label: { tr: '1) Kodu checkout et', en: '1) Check out the code' }, example: 'actions/checkout@v4' },
          { pattern: 'npm ci', label: { tr: '2) Bağımlılıkları kur', en: '2) Install dependencies' }, example: 'npm ci' },
          { pattern: 'playwright install', label: { tr: '3) Tarayıcıları kur', en: '3) Install browsers' }, example: 'npx playwright install --with-deps' },
          { pattern: 'playwright test', label: { tr: '4) Testleri çalıştır', en: '4) Run the tests' }, example: 'npx playwright test' },
          { pattern: 'upload-artifact', label: { tr: '5) Raporu artifact olarak yükle', en: '5) Upload the report as an artifact' }, example: 'actions/upload-artifact@v4' },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Without this exact order (e.g. running tests before installing browsers), the pipeline breaks.' },
        retryOutput: { tr: '❌ Sıra yanlış veya bir adım eksik.', en: '❌ Wrong order or a step is missing.' },
      },
      {
        type: 'quiz',
        question: { tr: '--shard=1/4 ne işe yarar?', en: 'What does --shard=1/4 do?' },
        options: [
          { id: 'a', text: 'It makes tests run 4x faster on a single machine, no extra machines needed' },
          { id: 'b', text: 'It runs 1/4 of the suite on this machine; the other slices (2/4, 3/4, 4/4) run in parallel in separate CI jobs' },
          { id: 'c', text: 'It only runs the first 4 tests' },
          { id: 'd', text: 'It runs the tests on 4 different browsers one after another' },
        ],
        correct: 'b',
        explanation: { tr: 'Sharding, BÜYÜK bir test paketini CI\'da birden fazla MAKİNEYE böler. Bu, paralel worker\'lardan farklıdır; ikisi birlikte kullanılır.', en: 'Sharding splits a LARGE test suite across multiple CI MACHINES (jobs) — each job is only responsible for its own slice. This is different from parallel workers (CPU cores on the same machine); the two are typically combined.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta Sharding (örneğin --shard=2/3) kullanımı hakkında hangisi doğrudur?",
            "en": "Which statement about using Sharding (e.g., --shard=2/3) in Playwright is true?"
      },
      "options": [
            {
                  "id": "a",
                  "text": "Sharding, tek bir makine içindeki CPU çekirdeklerini kullanır, harici makine gerektirmez"
            },
            {
                  "id": "b",
                  "text": "Sharding, toplam test paketini parçalara ayırıp farklı CI job'ları arasında dağıtarak toplam test süresini düşürmeyi hedefler"
            },
            {
                  "id": "c",
                  "text": "Sharding sadece görsel regresyon testleri için kullanılabilir"
            },
            {
                  "id": "d",
                  "text": "Sharding kullanıldığında --workers ayarının kullanılmasına gerek kalmaz"
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Sharding, test paketini mantıksal parçalara ayırarak farklı makinelerde (job'larda) aynı anda çalışmasını sağlar. Bu yöntem, paralel worker kullanımıyla (aynı makinedeki CPU kullanımı) birlikte çalışarak test süresini optimize eder.",
            "en": "Sharding splits the test suite into logical chunks to run them simultaneously on different machines (jobs). This method works alongside parallel worker usage (CPU usage on the same machine) to optimize overall test execution time."
      }
}
},
    ],
  },
}

const s15 = {
  tr: {
    title: '🔐 Auth & Session Yönetimi',
    blocks: [
      {
        type: 'simple-box', emoji: '🎫',
        content: 'Bir konsere her girişte yeniden bilet almak yerine, bir kere bilet alıp bileği rengini gösterip her seferinde kapıdan geçersin. storageState tam bu bileğin görevini görür: bir kere login olup o oturumu (cookie + localStorage) bir dosyaya kaydedersin, sonraki tüm testler o dosyayı gösterip "zaten girişliyim" diyerek doğrudan içeri girer.',
      },
      {
        type: 'text',
        content: 'Her testin başında UI\'dan login olmak (email yaz, şifre yaz, butona tıkla, dashboard\'u bekle) yavaştır ve kırılgandır: 2 saniyelik bir login\'i 100 testte tekrarlarsan 200 saniye boşa gider, login ekranındaki herhangi bir küçük UI değişikliği TÜM testleri kırabilir. Çözüm: login\'i SADECE BİR KERE test et (ayrı bir "login akışı" test grubunda), sonra diğer tüm testler için oturumu storageState ile sakla ve yeniden kullan.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Bu, Selenium\'da bazı projelerde yaptığın "login\'i API\'den yap, sonra cookie\'yi driver.manage().addCookie() ile enjekte et" hack\'inin resmî, built-in versiyonudur. storageState({ path: "auth.json" }) → context.addCookies(...) + localStorage enjeksiyonunu birlikte, tek dosyada saklar. playwright.config.ts içindeki projects + dependencies yapısı, TestNG\'deki @BeforeSuite ile bir kere login olup session\'ı tüm sınıflara yaymaya benzer ama dosya tabanlı ve paralel-güvenlidir.',
      },
      { type: 'heading', text: 'Login Akışını Bir Kere, İyice Test Et' },
      {
        type: 'code', language: 'typescript',
        code: `// auth.spec.ts — login mantığının KENDİSİ burada, sadece burada test edilir
test.describe('Login', () => {
  test('doğru bilgilerle dashboard\\'a yönlendirir', async ({ page }) => { /* ... */ });
  test('yanlış şifre hata gösterir', async ({ page }) => { /* ... */ });
  test('çıkış yapınca oturum temizlenir', async ({ page }) => { /* ... */ });
});
// Diğer 100 test dosyası BİR DAHA login UI'ını test ETMEZ — storageState kullanır.`,
      },
      { type: 'heading', text: '3 Adımda storageState Kurulumu' },
      {
        type: 'code', language: 'typescript',
        code: `// 1) tests/auth.setup.ts — login yap, oturumu kaydet
import { test as setup } from '@playwright/test';
setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('E-posta').fill('kullanici@example.com');
  await page.getByLabel('Şifre').fill('sifre123');
  await page.getByRole('button', { name: 'Giriş Yap' }).click();
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: '.auth/user.json' });
});

// 2) playwright.config.ts — setup'ı bağımlılık yap
export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
    {
      name: 'tests',
      dependencies: ['setup'],          // önce setup çalışır
      use: { storageState: '.auth/user.json' }, // sonra bu oturum yüklenir
    },
  ],
});

// 3) .gitignore — oturum dosyasını commit ETME
// .auth/`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Her Testte UI Login vs storageState', en: '⏱️ UI Login Every Test vs storageState' },
        description: { tr: '100 test için: her testte UI\'dan login olmak vs bir kere login + 100 test için anında hazır oturum.', en: 'For 100 tests: logging in via the UI every single time vs logging in once + an instantly-ready session for all 100 tests.' },
        tracks: [
          { label: 'Her testte UI login (100 test × 2s)', labelEn: 'UI login every test (100 × 2s)', duration: 20000, color: '#ef4444', badge: { tr: '~200s toplam', en: '~200s total' }, detail: { tr: 'Login UI\'daki tek bir küçük değişiklik 100 testi de kırabilir', en: 'One small login UI change can break all 100 tests' } },
          { label: 'storageState (1 login + 100 anında)', labelEn: 'storageState (1 login + 100 instant)', duration: 2200, color: '#10b981', badge: { tr: '~2s toplam', en: '~2s total' }, detail: { tr: 'Login mantığı sadece auth.spec.ts\'de test edilir/kırılır', en: 'Login logic is tested/breaks in exactly one place: auth.spec.ts' } },
        ],
      },
      { type: 'heading', text: 'Çoklu Rol (Admin / Customer / Guest)' },
      {
        type: 'table',
        headers: ['Proje', 'storageState', 'Kullanım'],
        rows: [
          ['admin-tests', '.auth/admin.json', 'Admin paneli, kullanıcı yönetimi testleri'],
          ['customer-tests', '.auth/customer.json', 'Sepet, ödeme, profil testleri'],
          ['guest-tests', '(storageState yok)', 'Login olmadan erişilen genel sayfalar'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🔑',
        title: 'API ile Login — Daha da Hızlı',
        content: 'UI\'dan login yerine doğrudan request.post("/api/login", { data: { email, password } }) çağırıp dönen token\'ı cookie/localStorage olarak set edebilirsin. UI\'ya hiç dokunmadığı için saniyenin altında çalışır. MFA/2FA için: test ortamında MFA\'yı kapatmak, MFA\'sız özel bir test kullanıcısı kullanmak veya otpauth gibi bir kütüphaneyle TOTP kodu üretmek üç yaygın çözümdür.',
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — storageState Kurulum Sırası', en: 'Try It Yourself — storageState Setup Order' },
        intro: { tr: 'Bir setup test dosyasında doğru sırayı yaz: login ol, dashboard\'u bekle, oturumu kaydet.', en: 'Write the correct order in a setup test file: log in, wait for the dashboard, save the session.' },
        starterCommands: {
          tr: `await page.goto('/login');
await page.getByLabel('E-posta').fill('kullanici@example.com');
await page.getByRole('button', { name: 'Giriş Yap' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
          en: `await page.goto('/login');
await page.getByLabel('Email').fill('user@example.com');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
        },
        expectedSteps: [
          { pattern: "goto\\('/login'\\)", label: { tr: '1) Login sayfasına git', en: '1) Navigate to the login page' }, example: "await page.goto('/login');" },
          { pattern: '\\.fill\\(', label: { tr: '2) Bilgileri doldur', en: '2) Fill in the credentials' }, example: "await page.getByLabel('Email').fill(...);" },
          { pattern: '\\.click\\(', label: { tr: '3) Giriş butonuna tıkla', en: '3) Click the sign-in button' }, example: "await page.getByRole('button').click();" },
          { pattern: 'waitForURL', label: { tr: '4) Dashboard\'a yönlendirmeyi bekle', en: '4) Wait for the dashboard redirect' }, example: "await page.waitForURL('/dashboard');" },
          { pattern: 'storageState', label: { tr: '5) Oturumu dosyaya kaydet', en: '5) Save the session to a file' }, example: "await page.context().storageState({ path: '...' });" },
        ],
        successOutput: { tr: '✅ Doğru sıra! storageState dosyası şimdi diğer tüm projeler tarafından kullanılabilir.', en: '✅ Correct order! The storageState file can now be used by every other project.' },
        retryOutput: { tr: '❌ Sıra yanlış veya adım eksik — özellikle storageState kaydı en sonda olmalı.', en: '❌ Wrong order or a step is missing — storageState must be saved last.' },
      },
      {
        type: 'quiz',
        question: { tr: 'storageState dosyasını .gitignore\'a eklemek neden önemlidir?', en: 'Why is it important to add the storageState file to .gitignore?' },
        options: [
          { id: 'a', text: 'Dosya çok büyük olduğu için repo şişer' },
          { id: 'b', text: 'İçinde gerçek oturum cookie\'leri/token\'ları vardır — commit edilirse bu kimlik bilgileri repo geçmişinde sızar ve başkası tarafından kullanılabilir' },
          { id: 'c', text: 'Git .json dosyalarını desteklemez' },
          { id: 'd', text: 'CI bu dosyayı otomatik silmek için arar' },
        ],
        correct: 'b',
        explanation: { tr: 'storageState dosyası gerçek bir oturumun cookie/localStorage verisini içerir — bu, kullanıcı adı/şifreden farksız bir kimlik bilgisidir. Git geçmişine girerse, dosya silinse bile geçmiş commit\'lerde kalır ve güvenlik riski oluşturur.', en: 'The storageState file contains a real session\'s cookie/localStorage data — that\'s just as sensitive as a username/password. If it lands in git history, it stays in old commits even after deletion, creating a security risk.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright projelerinde .auth klasörünü veya içinde yer alan oturum dosyalarını version control (Git) sistemine eklememenin temel sebebi nedir?",
            "en": "What is the primary reason for avoiding the addition of the .auth folder or session files to version control (Git) in Playwright projects?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Dosya formatı Git ile uyumlu değildir.",
                        "en": "The file format is incompatible with Git."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Bu dosyalar canlı oturum verileri ve hassas tokenlar içerir; commit edilmeleri güvenlik açığına ve kimlik hırsızlığına yol açar.",
                        "en": "These files contain live session data and sensitive tokens; committing them leads to security vulnerabilities and credential theft."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Oturum dosyaları çok küçüktür ve Git tarafından yok sayılır.",
                        "en": "Session files are too small and are ignored by Git."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Playwright bu dosyaları her çalıştırmada yeniden oluşturur.",
                        "en": "Playwright recreates these files on every run."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Oturum dosyaları, uygulamanın kimlik doğrulama bilgilerini doğrudan depolar. Bunları repo içinde tutmak, kimlik bilgilerini herkese açık hale getirmekle aynıdır ve büyük bir güvenlik riski oluşturur.",
            "en": "Session files store the raw authentication data of the application. Keeping them in the repository is equivalent to hardcoding credentials, which poses a significant security risk."
      }
}
},
    ],
  },
  en: {
    title: '🔐 Handling Auth & Sessions',
    blocks: [
      {
        type: 'simple-box', emoji: '🎫',
        content: 'Instead of buying a new ticket every time you re-enter a concert, you buy one ticket, get a wristband, and just show it at the gate each time. storageState plays exactly that role: you log in once, save that session (cookies + localStorage) to a file, and every later test just presents that file and walks straight in, already logged in.',
      },
      {
        type: 'text',
        content: 'Logging in through the UI at the start of every test (type email, type password, click the button, wait for the dashboard) is slow and fragile: a 2-second login repeated across 100 tests wastes 200 seconds, and any small UI change on the login screen can break ALL of them. The fix: test login ONLY ONCE (in a dedicated "login flow" test group), then save and reuse that session via storageState for every other test.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'This is the official, built-in version of a hack you may have done in Selenium — "log in via the API, then inject the cookie with driver.manage().addCookie()". storageState({ path: "auth.json" }) stores the equivalent of context.addCookies(...) plus localStorage injection together, in one file. The projects + dependencies structure in playwright.config.ts is similar to logging in once in a TestNG @BeforeSuite and sharing the session across all classes, but file-based and parallel-safe.',
      },
      { type: 'heading', text: 'Test the Login Flow Once, Thoroughly' },
      {
        type: 'code', language: 'typescript',
        code: `// auth.spec.ts — the login logic ITSELF is tested here, and only here
test.describe('Login', () => {
  test('successful login redirects to dashboard', async ({ page }) => { /* ... */ });
  test('invalid credentials shows error', async ({ page }) => { /* ... */ });
  test('logout clears the session', async ({ page }) => { /* ... */ });
});
// The other 100 test files NEVER test the login UI again — they use storageState.`,
      },
      { type: 'heading', text: 'storageState Setup in 3 Steps' },
      {
        type: 'code', language: 'typescript',
        code: `// 1) tests/auth.setup.ts — log in, save the session
import { test as setup } from '@playwright/test';
setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: '.auth/user.json' });
});

// 2) playwright.config.ts — make setup a dependency
export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
    {
      name: 'tests',
      dependencies: ['setup'],          // setup runs first
      use: { storageState: '.auth/user.json' }, // then this session is loaded
    },
  ],
});

// 3) .gitignore — DO NOT commit the session file
// .auth/`,
      },
      {
        type: 'animated-timeline',
        title: { tr: '⏱️ Her Testte UI Login vs storageState', en: '⏱️ UI Login Every Test vs storageState' },
        description: { tr: '100 test için: her testte UI\'dan login olmak vs bir kere login + 100 test için anında hazır oturum.', en: 'For 100 tests: logging in via the UI every single time vs logging in once + an instantly-ready session for all 100 tests.' },
        tracks: [
          { label: 'Serial — UI login every test (100 × 2s)', labelEn: 'UI login every test (100 × 2s)', duration: 20000, color: '#ef4444', badge: { tr: '~200s toplam', en: '~200s total' }, detail: { tr: 'Login UI\'daki tek bir küçük değişiklik 100 testi de kırabilir', en: 'One small login UI change can break all 100 tests' } },
          { label: 'storageState (1 login + 100 instant)', labelEn: 'storageState (1 login + 100 instant)', duration: 2200, color: '#10b981', badge: { tr: '~2s toplam', en: '~2s total' }, detail: { tr: 'Login mantığı sadece auth.spec.ts\'de test edilir/kırılır', en: 'Login logic is tested/breaks in exactly one place: auth.spec.ts' } },
        ],
      },
      { type: 'heading', text: 'Multiple Roles (Admin / Customer / Guest)' },
      {
        type: 'table',
        headers: ['Project', 'storageState', 'Used for'],
        rows: [
          ['admin-tests', '.auth/admin.json', 'Admin panel, user management tests'],
          ['customer-tests', '.auth/customer.json', 'Cart, checkout, profile tests'],
          ['guest-tests', '(no storageState)', 'Public pages accessed without logging in'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🔑',
        title: 'API-Based Login — Even Faster',
        content: 'Instead of logging in via the UI, you can call request.post("/api/login", { data: { email, password } }) directly and set the returned token as a cookie/localStorage value. Since it never touches the UI, it runs in well under a second. For MFA/2FA, three common solutions: disable MFA in the test environment, use a dedicated test user without MFA, or generate a TOTP code with a library like otpauth.',
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — storageState Kurulum Sırası', en: 'Try It Yourself — storageState Setup Order' },
        intro: { tr: 'Bir setup test dosyasında doğru sırayı yaz.', en: 'Write the correct order in a setup test file: log in, wait for the dashboard, save the session.' },
        starterCommands: {
          tr: `await page.goto('/login');
await page.getByLabel('E-posta').fill('kullanici@example.com');
await page.getByRole('button', { name: 'Giriş Yap' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
          en: `await page.goto('/login');
await page.getByLabel('Email').fill('user@example.com');
await page.getByRole('button', { name: 'Sign in' }).click();
await page.waitForURL('/dashboard');
await page.context().storageState({ path: '.auth/user.json' });`,
        },
        expectedSteps: [
          { pattern: "goto\\('/login'\\)", label: { tr: '1) Login sayfasına git', en: '1) Navigate to the login page' }, example: "await page.goto('/login');" },
          { pattern: '\\.fill\\(', label: { tr: '2) Bilgileri doldur', en: '2) Fill in the credentials' }, example: "await page.getByLabel('Email').fill(...);" },
          { pattern: '\\.click\\(', label: { tr: '3) Giriş butonuna tıkla', en: '3) Click the sign-in button' }, example: "await page.getByRole('button').click();" },
          { pattern: 'waitForURL', label: { tr: '4) Dashboard\'a yönlendirmeyi bekle', en: '4) Wait for the dashboard redirect' }, example: "await page.waitForURL('/dashboard');" },
          { pattern: 'storageState', label: { tr: '5) Oturumu dosyaya kaydet', en: '5) Save the session to a file' }, example: "await page.context().storageState({ path: '...' });" },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! The storageState file can now be used by every other project.' },
        retryOutput: { tr: '❌ Sıra yanlış veya adım eksik.', en: '❌ Wrong order or a step is missing — storageState must be saved last.' },
      },
      {
        type: 'quiz',
        question: { tr: 'storageState dosyasını .gitignore\'a eklemek neden önemlidir?', en: 'Why is it important to add the storageState file to .gitignore?' },
        options: [
          { id: 'a', text: 'The file is too large and bloats the repo' },
          { id: 'b', text: 'It contains real session cookies/tokens — committing it leaks credentials into the repo history where anyone could reuse them' },
          { id: 'c', text: 'Git does not support .json files' },
          { id: 'd', text: 'CI looks for this file to delete it automatically' },
        ],
        correct: 'b',
        explanation: { tr: 'storageState dosyası gerçek bir oturumun cookie/localStorage verisini içerir — bu bir kimlik bilgisidir. Git geçmişine girerse, dosya silinse bile geçmiş commit\'lerde kalır.', en: 'The storageState file contains a real session\'s cookie/localStorage data — that\'s just as sensitive as a username/password. If it lands in git history, it stays in old commits even after deletion, creating a security risk.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright Codegen aracını kullandıktan sonra ortaya çıkan test kodunun doğrudan projeye kopyalanması yerine 'refactor' edilmesinin (iyileştirilmesinin) en önemli sebebi nedir?",
            "en": "What is the most important reason for refactoring the test code generated by Playwright Codegen instead of copying it directly into the project?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Codegen her zaman yanlış locator'lar üretir.",
                        "en": "Codegen always produces incorrect locators."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Codegen tarafından üretilen kod bakım gerektiren, tekrar eden ve sürdürülebilirliği zayıf bir yapıya sahip olabilir; optimize edilmesi gerekir.",
                        "en": "Codegen-generated code can be repetitive and hard to maintain; it requires optimization for better sustainability."
                  }
            },
            {
                  "id": "c",
                  "text": "Codegen sadece tek bir test senaryosu üretebilir.",
                  "en": "Codegen can only generate a single test scenario."
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Codegen kodu sadece yerel makinede çalışır.",
                        "en": "Codegen code only runs on local machines."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Codegen, test senaryosu oluştururken hızlı bir iskelet sağlar ancak bu iskelet genellikle hard-coded değerler ve kopyalanmış adımlar içerir. Testlerin ölçeklenebilir ve sağlam olması için Page Object Model gibi yapılara taşınması şarttır.",
            "en": "Codegen provides a quick skeleton for a test case, but it often contains hard-coded values and duplicated steps. Refactoring it into structures like the Page Object Model is essential for scalable and robust testing."
      }
}
},
    ],
  },
}

// ─── YENİ SEKMELER (2026-06-19, devam) — Codegen & Playwright MCP ───

const s16 = {
  tr: {
    title: '🎬 Codegen — Kodu Senin Yerine Yazdır',
    blocks: [
      {
        type: 'simple-box', emoji: '🎙️',
        content: 'Sesli not uygulamasını düşün: sen konuşursun, o senin yerine yazıya döker. npx playwright codegen de tam böyle çalışır — sen tarayıcıda normal bir kullanıcı gibi tıklar, yazar, seçim yaparsın; Playwright arkanda durup her hareketini izler ve gerçek zamanlı olarak çalışan Playwright kodunu senin için yazar.',
      },
      {
        type: 'text',
        content: 'npx playwright codegen <url> komutu İKİ pencere açar: (1) gerçek bir tarayıcı penceresi — burada normal kullanıcı gibi gezinirsin, (2) Playwright Inspector penceresi — burada attığın her adımın karşılığı olan kod satırı CANLI olarak belirir. İşin bitince o kodu kopyalayıp test dosyana yapıştırırsın; genelde küçük rötuşlarla (locator önceliklendirme, assertion ekleme) production-ready hâle gelir.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'Bu, Selenium IDE\'nin (tarayıcı eklentisi olarak kayıt yapıp Java/diğer dillerde kod export eden araç) Playwright\'taki built-in, komut satırından çalışan, dış eklenti gerektirmeyen versiyonudur. Fark: Selenium IDE genelde CSS/XPath üretirken, Playwright codegen öncelik sırasına göre getByRole/getByLabel gibi dayanıklı locator\'lar üretir — bu yüzden çıkan kod genelde Selenium IDE çıktısından daha az kırılgandır.',
      },
      { type: 'heading', text: 'Komutlar ve Seçenekler' },
      {
        type: 'table',
        headers: ['Komut', 'Ne yapar'],
        rows: [
          ['npx playwright codegen', 'Boş bir sayfayla codegen başlatır'],
          ['npx playwright codegen https://example.com', 'Belirtilen URL ile başlatır'],
          ['npx playwright codegen --target=python https://example.com', 'Python kodu üretir (varsayılan: JavaScript/TypeScript)'],
          ['npx playwright codegen --target=java https://example.com', 'Java (Selenium\'dan geçenler için en tanıdık çıktı)'],
          ['npx playwright codegen --device="iPhone 13" https://example.com', 'Mobil cihaz emülasyonuyla başlatır'],
          ['npx playwright codegen --viewport-size=1280,720 https://example.com', 'Özel pencere boyutuyla başlatır'],
          ['npx playwright codegen --save-storage=auth.json https://example.com', 'Sonunda login session\'ı dosyaya kaydeder (storageState için)'],
          ['npx playwright codegen --load-storage=auth.json https://example.com', 'Kayıtlı bir oturumla (zaten login) başlatır'],
          ['npx playwright codegen -o login.spec.ts https://example.com', 'Üretilen kodu doğrudan bir dosyaya yazar'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'codegen-flow',
        icon: '🎬',
        title: { tr: 'Codegen Çalışırken — Gerçek Pencere Akışı', en: 'Codegen in Action — the Real Window Flow' },
        steps: [
          {
            id: 'launch', label: 'Codegen Başlatıldı', labelEn: 'Codegen Launched', visualState: 'launch',
            description: { tr: 'Komut çalıştırıldığında iki pencere açılır: gerçek tarayıcı + boş bir Playwright Inspector paneli. Inspector\'da "Record" (kayıt) açık, dil seçici (JavaScript/Python/Java/C#) görünür.', en: 'Running the command opens two windows: a real browser + an empty Playwright Inspector panel. "Record" is on, and a language picker (JavaScript/Python/Java/C#) is visible.' },
            code: `$ npx playwright codegen https://example.com/login`,
          },
          {
            id: 'recording', label: 'Tıkla, Yaz — Kod Anında Belirir', labelEn: 'Click, Type — Code Appears Instantly', visualState: 'recording',
            description: { tr: 'E-posta kutusuna tıklayıp yazınca .fill(...) satırı belirir; "Giriş Yap" butonuna tıklayınca .click() satırı eklenir. Sen hiçbir kod yazmıyorsun — sadece normal kullanıcı gibi geziniyorsun.', en: 'Clicking and typing in the email box produces a .fill(...) line; clicking "Sign in" adds a .click() line. You write zero code — you just browse like a normal user.' },
            code: `await page.getByLabel('E-posta').click();\nawait page.getByLabel('E-posta').fill('kullanici@example.com');\nawait page.getByRole('button', { name: 'Giriş Yap' }).click();`,
          },
          {
            id: 'assert', label: 'Assertion Ekle (Pick Locator)', labelEn: 'Add an Assertion (Pick Locator)', visualState: 'assert',
            description: { tr: 'Inspector\'daki "Assert visibility" butonuna basıp sayfada bir elemana tıklarsan, otomatik bir expect(...).toBeVisible() satırı eklenir — assertion\'ları da elle yazmana gerek kalmaz.', en: 'Clicking the "Assert visibility" button in the Inspector and then clicking an element on the page adds an automatic expect(...).toBeVisible() line — you don\'t even have to hand-write assertions.' },
            code: `await expect(\n  page.getByText('Tekrar hoş geldin')\n).toBeVisible();`,
          },
          {
            id: 'save', label: 'Kopyala / Kaydet', labelEn: 'Copy / Save', visualState: 'save',
            description: { tr: 'İşin bitince "Copy" butonuyla tüm kodu panoya alır, test dosyana yapıştırırsın. -o login.spec.ts ile baştan bir dosyaya yazdırman da mümkün.', en: 'When you\'re done, the "Copy" button puts all the code on your clipboard to paste into your test file. You can also have it write straight to a file from the start with -o login.spec.ts.' },
            code: `// Panoya kopyalandı ✅\n// login.spec.ts içine yapıştır`,
          },
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Codegen Bir Başlangıç Noktasıdır, Bitmiş Test Değil',
        content: 'Codegen çıktısı genelde çalışır ama kör kör güvenme: (1) bazen gereksiz tıklamalar/duplicate satırlar kaydeder — temizle. (2) Otomatik üretilen locator bazen .first() gerektiren belirsiz bir eşleşme olabilir — kontrol et. (3) Login gibi tekrar eden akışları her test dosyasında yeniden kaydetme — bir kere kaydet, Page Object\'e veya fixture\'a taşı (bkz. önceki sekmeler). (4) --save-storage ile kaydedilen oturum dosyasını ASLA git\'e commit etme.',
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔍', label: 'Hızlı keşif', desc: 'Bilmediğin bir sayfada hangi locator\'ın doğru çalıştığını anında görürsün.' },
          { icon: '🎯', label: 'Doğru locator önerisi', desc: 'getByRole/getByLabel öncelikli üretir — elle yazsan bulman zaman alacak locator\'ları saniyede üretir.' },
          { icon: '🔐', label: 'Auth akışı kaydetme', desc: '--save-storage ile login\'i bir kere kaydedip storageState olarak diğer testlerde kullanırsın.' },
          { icon: '🌐', label: 'Çok dilli çıktı', desc: 'Aynı kaydı --target ile JS/TS, Python, Java veya C# kodu olarak alabilirsin.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Codegen ile Auth Kaydı Doğru Sıra', en: 'Try It Yourself — Correct Order for Recording Auth with Codegen' },
        intro: { tr: 'Bir login akışını kaydedip storageState olarak kaydetmenin doğru komut sırasını yaz.', en: 'Write the correct command order for recording a login flow and saving it as storageState.' },
        starterCommands: {
          tr: `npx playwright codegen --save-storage=auth.json https://example.com/login
# Tarayıcıda login ol, pencereyi kapat
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
          en: `npx playwright codegen --save-storage=auth.json https://example.com/login
# log in in the browser, close the window
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
        },
        expectedSteps: [
          { pattern: 'save-storage', label: { tr: '1) --save-storage ile codegen başlat', en: '1) Start codegen with --save-storage' }, example: 'npx playwright codegen --save-storage=auth.json <url>' },
          { pattern: 'load-storage', label: { tr: '2) --load-storage ile kayıtlı oturumu kullan', en: '2) Use the saved session with --load-storage' }, example: 'npx playwright codegen --load-storage=auth.json <url>' },
        ],
        dangerousPatterns: [
          { pattern: 'git add.*auth\\.json|git commit.*auth\\.json', label: { tr: 'auth.json gerçek oturum verisi içerir — asla commit etme, .gitignore\'a ekle.', en: 'auth.json contains real session data — never commit it, add it to .gitignore.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra! Önce oturumu kaydet, sonra her codegen/test çalışmasında o dosyayı yükleyip login\'i tekrarlama.', en: '✅ Correct order! Save the session once, then load that file in every later codegen/test run instead of logging in again.' },
        retryOutput: { tr: '❌ Sıra yanlış — önce save-storage, sonra load-storage gelmeli.', en: '❌ Wrong order — save-storage must come before load-storage.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Codegen ile üretilen kodu test dosyasına koymadan önce neden gözden geçirmek gerekir?', en: 'Why should you review codegen-generated code before putting it in a test file?' },
        options: [
          { id: 'a', text: 'Codegen kod üretmez, sadece ekran görüntüsü alır' },
          { id: 'b', text: 'Üretilen kod genelde çalışır ama gereksiz/duplicate satırlar, belirsiz locator eşleşmeleri veya tekrar eden login bloklarını içerebilir — bunlar temizlenip Page Object/fixture\'a taşınmalı' },
          { id: 'c', text: 'Codegen sadece Chrome\'da çalışır, diğer tarayıcılarda kod hatalı olur' },
          { id: 'd', text: 'Üretilen kod asla çalışmaz, sadece referans amaçlıdır' },
        ],
        correct: 'b',
        explanation: { tr: 'Codegen mükemmel bir başlangıç noktasıdır ama bir "ham taslak"tır — production kalitesine getirmek için temizlik, locator kontrolü ve tekrar eden mantığın (login gibi) Page Object/fixture\'a çıkarılması gerekir.', en: 'Codegen is an excellent starting point but it\'s a "rough draft" — getting it to production quality requires cleanup, locator review, and extracting repeated logic (like login) into a Page Object/fixture.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright'ta 'Codegen' aracı tarafından üretilen locator'lar neden her zaman en iyi seçenek olmayabilir?",
            "en": "Why are the locators generated by the Playwright 'Codegen' tool sometimes not the best choice?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Codegen locator üretemez.",
                        "en": "Codegen cannot generate locators."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Codegen bazen çok kırılgan (testin bozulmasına müsait) ve dinamik olmayan CSS/XPath seçicileri üretebilir; bunlar yerine daha anlamlı 'test-id' gibi öğeler tercih edilmelidir.",
                        "en": "Codegen sometimes generates brittle and non-dynamic CSS/XPath selectors; more meaningful elements like 'test-ids' should be preferred instead."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Codegen sadece ID'leri kullanır.",
                        "en": "Codegen only uses IDs."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Codegen çok yavaştır.",
                        "en": "Codegen is too slow."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Codegen, ekrandaki elemanları seçmek için rastgele hiyerarşik yollar (örneğin nth-child) kullanabilir. Bu yapılar DOM'da küçük bir değişiklikte bozulur. İdeal olan, daha sağlam olan 'data-testid' gibi attribute'ları kullanmaktır.",
            "en": "Codegen may use random hierarchical paths (like nth-child) to select elements. These structures break with minor DOM changes. The ideal approach is to use more robust attributes like 'data-testid'."
      }
}
},
    ],
  },
  en: {
    title: '🎬 Codegen — Let It Write the Code for You',
    blocks: [
      {
        type: 'simple-box', emoji: '🎙️',
        content: 'Think of a voice-to-text app: you talk, it writes it down for you. npx playwright codegen works exactly like that — you click, type, and select things in the browser like a normal user; Playwright stands behind you, watches every move, and writes the real, working Playwright code for you in real time.',
      },
      {
        type: 'text',
        content: 'The command npx playwright codegen <url> opens TWO windows: (1) a real browser window — where you browse like a normal user, and (2) a Playwright Inspector window — where the code line matching every step you take appears LIVE. When you\'re done, you copy that code into your test file; with a few small touch-ups (locator priority, adding assertions) it\'s usually production-ready.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'This is the built-in, command-line, no-extension-required version of Selenium IDE (the browser extension that records actions and exports Java/other-language code). The difference: Selenium IDE usually generates CSS/XPath, while Playwright codegen prioritizes durable locators like getByRole/getByLabel — so the resulting code is usually less brittle than Selenium IDE\'s output.',
      },
      { type: 'heading', text: 'Commands and Options' },
      {
        type: 'table',
        headers: ['Command', 'What it does'],
        rows: [
          ['npx playwright codegen', 'Starts codegen with a blank page'],
          ['npx playwright codegen https://example.com', 'Starts with the given URL'],
          ['npx playwright codegen --target=python https://example.com', 'Generates Python code (default: JavaScript/TypeScript)'],
          ['npx playwright codegen --target=java https://example.com', 'Java (the most familiar output for Selenium veterans)'],
          ['npx playwright codegen --device="iPhone 13" https://example.com', 'Starts with mobile device emulation'],
          ['npx playwright codegen --viewport-size=1280,720 https://example.com', 'Starts with a custom window size'],
          ['npx playwright codegen --save-storage=auth.json https://example.com', 'Saves the login session to a file at the end (for storageState)'],
          ['npx playwright codegen --load-storage=auth.json https://example.com', 'Starts with a saved session (already logged in)'],
          ['npx playwright codegen -o login.spec.ts https://example.com', 'Writes the generated code straight to a file'],
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'codegen-flow',
        icon: '🎬',
        title: { tr: 'Codegen Çalışırken — Gerçek Pencere Akışı', en: 'Codegen in Action — the Real Window Flow' },
        steps: [
          {
            id: 'launch', label: 'Codegen Launched', labelEn: 'Codegen Launched', visualState: 'launch',
            description: { tr: 'Komut çalıştırıldığında iki pencere açılır: gerçek tarayıcı + boş bir Playwright Inspector paneli.', en: 'Running the command opens two windows: a real browser + an empty Playwright Inspector panel. "Record" is on, and a language picker (JavaScript/Python/Java/C#) is visible.' },
            code: `$ npx playwright codegen https://example.com/login`,
          },
          {
            id: 'recording', label: 'Click, Type — Code Appears Instantly', labelEn: 'Click, Type — Code Appears Instantly', visualState: 'recording',
            description: { tr: 'E-posta kutusuna tıklayıp yazınca .fill(...) satırı belirir; butona tıklayınca .click() satırı eklenir.', en: 'Clicking and typing in the email box produces a .fill(...) line; clicking "Sign in" adds a .click() line. You write zero code — you just browse like a normal user.' },
            code: `await page.getByLabel('Email').click();\nawait page.getByLabel('Email').fill('user@example.com');\nawait page.getByRole('button', { name: 'Sign in' }).click();`,
          },
          {
            id: 'assert', label: 'Add an Assertion (Pick Locator)', labelEn: 'Add an Assertion (Pick Locator)', visualState: 'assert',
            description: { tr: '"Assert visibility" butonuna basıp bir elemana tıklarsan, otomatik bir expect(...).toBeVisible() satırı eklenir.', en: 'Clicking the "Assert visibility" button in the Inspector and then clicking an element on the page adds an automatic expect(...).toBeVisible() line — you don\'t even have to hand-write assertions.' },
            code: `await expect(\n  page.getByText('Welcome back')\n).toBeVisible();`,
          },
          {
            id: 'save', label: 'Copy / Save', labelEn: 'Copy / Save', visualState: 'save',
            description: { tr: 'İşin bitince "Copy" butonuyla tüm kodu panoya alır, test dosyana yapıştırırsın.', en: 'When you\'re done, the "Copy" button puts all the code on your clipboard to paste into your test file. You can also have it write straight to a file from the start with -o login.spec.ts.' },
            code: `// Copied to clipboard ✅\n// paste into login.spec.ts`,
          },
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '⚠️',
        title: 'Codegen Is a Starting Point, Not a Finished Test',
        content: 'Codegen output usually works, but don\'t trust it blindly: (1) it sometimes records unnecessary clicks/duplicate lines — clean them up. (2) An auto-generated locator can sometimes be an ambiguous match needing .first() — check it. (3) Don\'t re-record repeated flows like login in every test file — record it once, move it into a Page Object or fixture (see earlier tabs). (4) NEVER commit the session file saved by --save-storage to git.',
      },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🔍', label: 'Fast exploration', desc: 'Instantly see which locator actually works on a page you don\'t know yet.' },
          { icon: '🎯', label: 'Good locator suggestions', desc: 'Prioritizes getByRole/getByLabel — it produces in a second the locators that would take you a while to find by hand.' },
          { icon: '🔐', label: 'Recording an auth flow', desc: 'With --save-storage, record login once and reuse it as storageState in other tests.' },
          { icon: '🌐', label: 'Multi-language output', desc: 'Take the same recording as JS/TS, Python, Java, or C# code with --target.' },
        ],
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Codegen ile Auth Kaydı Doğru Sıra', en: 'Try It Yourself — Correct Order for Recording Auth with Codegen' },
        intro: { tr: 'Bir login akışını kaydedip storageState olarak kaydetmenin doğru komut sırasını yaz.', en: 'Write the correct command order for recording a login flow and saving it as storageState.' },
        starterCommands: {
          tr: `npx playwright codegen --save-storage=auth.json https://example.com/login
# Tarayıcıda login ol, pencereyi kapat
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
          en: `npx playwright codegen --save-storage=auth.json https://example.com/login
# log in in the browser, close the window
npx playwright codegen --load-storage=auth.json https://example.com/dashboard`,
        },
        expectedSteps: [
          { pattern: 'save-storage', label: { tr: '1) --save-storage ile codegen başlat', en: '1) Start codegen with --save-storage' }, example: 'npx playwright codegen --save-storage=auth.json <url>' },
          { pattern: 'load-storage', label: { tr: '2) --load-storage ile kayıtlı oturumu kullan', en: '2) Use the saved session with --load-storage' }, example: 'npx playwright codegen --load-storage=auth.json <url>' },
        ],
        dangerousPatterns: [
          { pattern: 'git add.*auth\\.json|git commit.*auth\\.json', label: { tr: 'auth.json gerçek oturum verisi içerir — asla commit etme, .gitignore\'a ekle.', en: 'auth.json contains real session data — never commit it, add it to .gitignore.' } },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Save the session once, then load that file in every later codegen/test run instead of logging in again.' },
        retryOutput: { tr: '❌ Sıra yanlış.', en: '❌ Wrong order — save-storage must come before load-storage.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Codegen ile üretilen kodu test dosyasına koymadan önce neden gözden geçirmek gerekir?', en: 'Why should you review codegen-generated code before putting it in a test file?' },
        options: [
          { id: 'a', text: 'Codegen doesn\'t generate code at all, it only takes screenshots' },
          { id: 'b', text: 'The generated code usually works but may contain unnecessary/duplicate lines, ambiguous locator matches, or repeated login blocks — these should be cleaned up and moved into a Page Object/fixture' },
          { id: 'c', text: 'Codegen only works in Chrome, code is broken in other browsers' },
          { id: 'd', text: 'The generated code never actually works, it\'s for reference only' },
        ],
        correct: 'b',
        explanation: { tr: 'Codegen mükemmel bir başlangıç noktasıdır ama bir "ham taslak"tır — production kalitesine getirmek için temizlik ve refactor gerekir.', en: 'Codegen is an excellent starting point but it\'s a "rough draft" — getting it to production quality requires cleanup, locator review, and extracting repeated logic (like login) into a Page Object/fixture.' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright Codegen ile oluşturulan bir otomasyon scriptini doğrudan 'production' ortamında kullanmanın en önemli risklerinden biri nedir?",
            "en": "What is one of the primary risks of using an automation script generated by Playwright Codegen directly in a production-grade test suite?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Codegen tarafından üretilen kod sadece işletim sistemi seviyesinde çalışır, web tarayıcılarında hata verir.",
                        "en": "Codegen-generated code only works at the operating system level and fails in web browsers."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Codegen, kodun sürdürülebilirliğini azaltan sert kodlanmış (hardcoded) lokatörler veya tekrar eden eylemler üretebilir; bu yüzden Page Object Model gibi yapılara dönüştürülmelidir.",
                        "en": "Codegen may produce hardcoded locators or redundant actions that decrease maintainability; therefore, it should be refactored into patterns like Page Object Model."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Codegen tarafından üretilen kodlar sadece JavaScript ile sınırlıdır ve TypeScript ile kullanılamaz.",
                        "en": "Codegen-generated code is limited to JavaScript and cannot be used with TypeScript."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Codegen, test edilen web sitesinin güvenlik duvarı (firewall) tarafından her zaman engellenir.",
                        "en": "Codegen is always blocked by the firewall of the website being tested."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Codegen, bir senaryoyu kaydetmek için harika bir araçtır ancak oluşturduğu kod genellikle bakım zorluğu yaratır. Kodun temizlenmesi, lokatörlerin iyileştirilmesi ve ortak mantığın (login, navigation) nesne tabanlı yapılara taşınması otomasyonun kalitesini artırır.",
            "en": "While Codegen is an excellent tool for recording scenarios, the raw code it produces is often difficult to maintain. Cleaning up the code, optimizing locators, and extracting common logic into design patterns like Page Objects is essential for high-quality, long-term testing."
      }
}
},
    ],
  },
}

const s17 = {
  tr: {
    title: '🔌 Playwright MCP — AI Agent\'lara Tarayıcı Yeteneği',
    blocks: [
      {
        type: 'simple-box', emoji: '🗺️',
        content: 'Bir taksi şoförüne "Taksim Meydanı\'na git" dersin — sokak sokak "300 metre düz git, sonra sağa dön" diye tarif etmen gerekmez, çünkü şoförün kafasında zaten şehrin haritası var. Playwright MCP de AI\'a tam bunu sağlar: "şu siteye gir, giriş yap" dediğinde AI, ekran görüntüsüne bakıp piksel piksel koordinat hesaplamak zorunda kalmaz — sayfanın "iskelet haritasını" (accessibility tree) okur ve doğru elemana doğrudan gider.',
      },
      {
        type: 'text',
        content: 'MCP (Model Context Protocol), bir AI modelinin dış araçlarla (dosya sistemi, veritabanı, tarayıcı, API\'ler) konuşmasını standartlaştıran açık bir protokoldür. Playwright MCP, Microsoft\'un resmi olarak yayınladığı bir MCP sunucusudur (npm paketi: @playwright/mcp) ve AI istemcilerine (Claude, Cursor, VS Code Copilot gibi) gerçek bir tarayıcıyı kontrol etme yeteneği "tool" (araç) olarak sağlar — browser_navigate, browser_click, browser_type gibi.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'Java Biliyorsan:',
        content: 'MCP sunucusunu, Selenium Grid\'in bir node\'unun WebDriver komutlarını HTTP üzerinden dış istemcilere sunmasına benzet — fark, burada istemci bir insan değil bir AI modelidir ve protokol (JSON-RPC tabanlı MCP) özellikle AI araç çağrısı için tasarlanmıştır. "Snapshot mode", sayfanın DOM\'unu System.out.println(driver.getPageSource()) yerine, Selenium\'un Accessibility API\'sine benzer şekilde yapılandırılmış (rol + isim + ref) bir ağaç olarak AI\'a verir — AI piksel koordinatı değil, "ref=e3" gibi kararlı bir referans kullanarak tıklar.',
      },
      { type: 'heading', text: 'Temel Özellikler' },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌳', label: 'Accessibility-tree tabanlı', desc: 'Ekran görüntüsü + görüntü tanıma modeli gerekmez; sayfa yapılandırılmış (rol/isim/ref) veri olarak okunur — hızlı ve deterministik.' },
          { icon: '🧰', label: 'Geniş tool seti', desc: 'browser_navigate, browser_click, browser_type, browser_snapshot, browser_take_screenshot, browser_select_option, browser_file_upload, browser_handle_dialog, browser_wait_for, browser_tabs, browser_network_requests, browser_console_messages...' },
          { icon: '👁️', label: 'Snapshot mode vs Vision mode', desc: 'Varsayılan: accessibility snapshot (metin tabanlı, hızlı). Vision mode: ekran görüntüsü + koordinat tabanlı tıklama — görsel modeller için.' },
          { icon: '🔒', label: 'İzole / kalıcı profil', desc: '--isolated ile her oturum sıfırdan (gizli sekme gibi); --user-data-dir ile login durumu kalıcı tutulabilir.' },
          { icon: '🌐', label: 'Çok motorlu', desc: '--browser ile chromium, firefox, webkit veya msedge seçilebilir; --headless ile arka planda çalıştırılabilir.' },
          { icon: '🔐', label: 'Origin kısıtlama', desc: '--allowed-origins / --blocked-origins ile AI\'ın hangi sitelere gidebileceği sınırlanabilir — güvenlik için önemli.' },
        ],
      },
      { type: 'heading', text: 'Mimari — Bir İstek Nasıl İşlenir?' },
      {
        type: 'visual', variant: 'flow', title: { tr: 'AI İsteğinden Tarayıcı Aksiyonuna', en: 'From AI Request to Browser Action' },
        steps: [
          { num: 1, label: 'Kullanıcı', desc: 'Doğal dilde istek', highlight: true },
          { num: 2, label: 'AI Model', desc: 'Claude / Cursor / Copilot', highlight: false },
          { num: 3, label: 'MCP Protokolü', desc: 'JSON-RPC (stdio/HTTP)', highlight: false },
          { num: 4, label: 'Playwright MCP Server', desc: '@playwright/mcp', highlight: true },
          { num: 5, label: 'Gerçek Tarayıcı', desc: 'Chromium/Firefox/WebKit', highlight: true },
          { num: 6, label: 'Sonuç', desc: 'Snapshot/screenshot → AI\'a', highlight: false },
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'mcp-flow',
        icon: '🔌',
        title: { tr: 'MCP Tool-Calling Döngüsü — Adım Adım', en: 'The MCP Tool-Calling Loop — Step by Step' },
        steps: [
          {
            id: 'prompt', label: 'Kullanıcı İsteği', labelEn: 'User Prompt', visualState: 'prompt',
            description: { tr: 'Kullanıcı doğal dilde bir görev tanımlar. AI, bu görevi tamamlamak için hangi browser_* tool\'unu çağıracağına karar verir.', en: 'The user describes a task in natural language. The AI decides which browser_* tool to call to accomplish it.' },
            code: `Kullanıcı: "example.com'a git ve\nbaşlığı söyle"`,
          },
          {
            id: 'tool-call', label: 'AI Tool Çağırır', labelEn: 'AI Calls a Tool', visualState: 'tool-call',
            description: { tr: 'AI, MCP protokolü üzerinden browser_navigate({ url: ... }) çağrısı yapar. Bu çağrı MCP server\'a iletilir, server gerçek tarayıcıyı (yoksa) başlatıp URL\'e gider.', en: 'The AI makes a browser_navigate({ url: ... }) call over the MCP protocol. The call reaches the MCP server, which launches the real browser (if needed) and navigates to the URL.' },
            code: `browser_navigate({\n  url: "https://example.com"\n})`,
          },
          {
            id: 'snapshot', label: 'Accessibility Snapshot Döner', labelEn: 'Accessibility Snapshot Returns', visualState: 'snapshot',
            description: { tr: 'AI sayfayı "görmek" için browser_snapshot çağırır. Server, ekran görüntüsü DEĞİL, yapılandırılmış bir ağaç döner: her elemanın rolü, ismi ve kararlı bir "ref" kimliği.', en: 'The AI calls browser_snapshot to "see" the page. The server returns NOT a screenshot, but a structured tree: every element\'s role, name, and a stable "ref" id.' },
            code: `- heading "Example Domain" [ref=e1]\n- link "More information..." [ref=e2]`,
          },
          {
            id: 'result', label: 'Ref ile Aksiyon → Sonuç', labelEn: 'Action via Ref → Result', visualState: 'result',
            description: { tr: 'AI artık piksel koordinatı tahmin etmez — doğrudan browser_click({ ref: "e2" }) çağırır. Aksiyon tamamlanır, sonuç AI\'a döner, AI kullanıcıya doğal dilde cevap verir.', en: 'The AI never has to guess pixel coordinates — it calls browser_click({ ref: "e2" }) directly. The action completes, the result returns to the AI, and the AI answers the user in natural language.' },
            code: `browser_click({ ref: "e2" })\n// ✅ AI: "Başlık: Example Domain"`,
          },
        ],
      },
      { type: 'heading', text: 'Kurulum — Adım Adım' },
      {
        type: 'text',
        content: 'Önkoşul: Node.js 18+ kurulu olmalı (npx ile aynı şekilde gelir). Global bir kurulum GEREKMEZ — npx, paketi her çalıştığında ihtiyaç olursa indirir.',
      },
      {
        type: 'installation',
        title: { tr: '1) Önce komut satırından dene', en: '1) Test it from the command line first' },
        steps: [
          { cmd: 'npx @playwright/mcp@latest --help', explanation: { tr: 'Global kurulum gerekmez — npx paketi gerektiğinde indirir. Çıktıda --browser, --headless, --isolated gibi flag listesini görmelisin.', en: 'No global install needed — npx downloads the package on demand. The output should list flags like --browser, --headless, --isolated.' } },
          { cmd: 'npx @playwright/mcp@latest --version', explanation: { tr: 'Sürüm numarasını yazdırır — paketin doğru indirildiğini doğrular.', en: 'Prints the version number — confirms the package downloaded correctly.' } },
        ],
      },
      {
        type: 'code', language: 'json',
        code: `// 2) Claude Desktop için config dosyasına ekle
// macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
// Windows: %APPDATA%\\Claude\\claude_desktop_config.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}

// 3) Claude Code için (proje veya kullanıcı seviyesinde) — terminalden:
// $ claude mcp add playwright npx @playwright/mcp@latest
// veya .mcp.json içine elle aynı bloğu ekle.

// 4) İstemciyi (Claude Desktop / Claude Code / Cursor) yeniden başlat.
// 5) Araç (tool) listesinde browser_navigate, browser_click, browser_snapshot
//    gibi isimlerin göründüğünü doğrula.
// 6) İlk komutu dene: "https://example.com adresine git, sayfa başlığını söyle."`,
      },
      {
        type: 'table',
        headers: ['Flag', 'Ne işe yarar'],
        rows: [
          ['--browser=firefox', 'chromium yerine firefox/webkit/msedge motorunu kullan'],
          ['--headless', 'Tarayıcıyı görünmeden (arka planda) çalıştır'],
          ['--device="iPhone 13"', 'Mobil cihaz emülasyonu ile başlat'],
          ['--isolated', 'Her oturumu sıfırdan başlat (gizli sekme gibi, kalıcı login yok)'],
          ['--user-data-dir=./profile', 'Login/cookie durumunu oturumlar arası kalıcı tut'],
          ['--allowed-origins=https://example.com', 'AI\'ın yalnızca belirtilen origin\'lere gidebilmesini sağla'],
          ['--save-trace', 'Oturumu Playwright trace olarak kaydet (sonradan incelemek için)'],
          ['--vision', 'Accessibility snapshot yerine ekran görüntüsü + koordinat tabanlı mod'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🛡️',
        title: 'Güvenlik — AI\'a Gerçek Tarayıcı Vermek Risklidir',
        content: 'Playwright MCP\'ye bağlı bir AI, gerçek formlara veri girebilir, gerçek butonlara (silme, satın alma, gönder) tıklayabilir. (1) --allowed-origins ile AI\'ı sadece test/staging ortamına kilitle. (2) Gerçek production ödeme/silme akışlarında AI\'ı insan onayı olmadan serbest bırakma. (3) --user-data-dir kullanıyorsan, o profildeki gerçek oturumların (kişisel e-posta, banka vb.) AI tarafından da erişilebilir olduğunu unutma — test için ayrı, izole bir profil kullan.',
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Doğru Kurulum Sırası', en: 'Try It Yourself — the Correct Setup Order' },
        intro: { tr: 'Playwright MCP\'yi bir AI istemcisine bağlamanın doğru sırasını yaz: önce komut satırından dene, sonra config\'e ekle, sonra istemciyi yeniden başlat, sonra ilk komutu ver.', en: 'Write the correct order for connecting Playwright MCP to an AI client: test from the command line first, then add it to the config, then restart the client, then try your first command.' },
        starterCommands: {
          tr: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# Claude Code'u yeniden başlat
# "https://example.com'a git ve başlığı söyle" yaz`,
          en: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# restart Claude Code
# type "go to https://example.com and tell me the title"`,
        },
        expectedSteps: [
          { pattern: '--help', label: { tr: '1) Paketin çalıştığını komut satırından doğrula', en: '1) Verify the package works from the command line' }, example: 'npx @playwright/mcp@latest --help' },
          { pattern: 'mcp add', label: { tr: '2) İstemciye MCP server\'ı ekle', en: '2) Add the MCP server to the client' }, example: 'claude mcp add playwright npx @playwright/mcp@latest' },
          { pattern: 'yeniden başlat|restart', label: { tr: '3) İstemciyi yeniden başlat', en: '3) Restart the client' }, example: '# restart the client' },
          { pattern: "git|tell me|söyle|adresine", label: { tr: '4) İlk doğal dil komutunu dene', en: '4) Try your first natural-language command' }, example: '"go to ... and tell me ..."' },
        ],
        successOutput: { tr: '✅ Doğru sıra! Önce paketin çalıştığını doğrulamak, config hatalarını (yanlış komut/path) erkenden yakalamanı sağlar.', en: '✅ Correct order! Verifying the package works first catches config mistakes (wrong command/path) early.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright MCP\'nin varsayılan "snapshot mode"u, görüntü tanıma (vision) moduna göre neden genelde daha hızlı ve güvenilirdir?', en: 'Why is Playwright MCP\'s default "snapshot mode" usually faster and more reliable than vision mode?' },
        options: [
          { id: 'a', text: 'Snapshot mode internet bağlantısı gerektirmez' },
          { id: 'b', text: 'Snapshot mode, sayfayı yapılandırılmış (rol/isim/ref) veri olarak verir; AI piksel koordinatı tahmin etmek veya bir görüntü modelini çalıştırmak zorunda kalmaz — doğrudan ref ile kararlı bir elemana gider' },
          { id: 'c', text: 'Vision mode sadece mobil cihazlarda çalışır' },
          { id: 'd', text: 'İkisi arasında performans farkı yoktur' },
        ],
        correct: 'b',
        explanation: { tr: 'Accessibility tree, sayfanın anlamsal yapısını (buton, link, textbox + isimleri) doğrudan verir. AI bu yapıdaki "ref" kimliğini kullanarak hatasız tıklar — ekran görüntüsünden piksel koordinatı çıkarmaya (ve bunun için ayrı bir görsel modele) gerek kalmaz.', en: 'The accessibility tree gives the page\'s semantic structure (buttons, links, textboxes + their names) directly. The AI clicks reliably using the "ref" id in that structure — no need to infer pixel coordinates from a screenshot (and no need for a separate vision model to do it).' },
      
        retryQuestion: {
      "question": {
            "tr": "Playwright MCP kullanırken, görüntü tabanlı (vision) mod yerine 'snapshot mode' tercih etmenin temel mimari avantajı nedir?",
            "en": "What is the primary architectural advantage of using 'snapshot mode' over vision-based mode when using Playwright MCP?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Snapshot mode, GPU gücü gerektirmediği için daha az enerji tüketir.",
                        "en": "Snapshot mode consumes less energy as it does not require GPU power."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Snapshot mode, sayfayı DOM ve accessibility tree verileriyle yapılandırılmış şekilde iletir, bu da AI'nın piksel bazlı yorumlama yapmasına gerek kalmadan hedef elemana kesin olarak ulaşmasını sağlar.",
                        "en": "Snapshot mode provides the page as structured data via the DOM and accessibility tree, allowing the AI to interact with target elements precisely without needing pixel-based inference."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Snapshot mode, sadece yerel bilgisayarlarda çalışır; bulut ortamlarında vision mode zorunludur.",
                        "en": "Snapshot mode only works on local machines; vision mode is mandatory for cloud environments."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Snapshot mode, sayfanın görüntüsünü daha yüksek çözünürlükte işlediği için daha net sonuçlar verir.",
                        "en": "Snapshot mode provides clearer results because it processes the page image at a higher resolution."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Snapshot mode, sayfanın anlamsal yapısını (Accessibility Tree) AI'ya metinsel ve yapısal bir formatta sunar. Bu sayede AI, görsel bir analize veya piksel tahmini yapmaya ihtiyaç duymadan doğrudan hedeflenen öğeyi (ref ID ile) seçebilir, bu da hızı ve doğruluğu ciddi oranda artırır.",
            "en": "Snapshot mode delivers the page's semantic structure (Accessibility Tree) to the AI in a textual, structured format. This allows the AI to select elements directly using ref IDs without performing resource-heavy visual analysis or pixel inference, resulting in faster and more reliable interactions."
      }
}
},
    ],
  },
  en: {
    title: '🔌 Playwright MCP — Giving AI Agents Browser Powers',
    blocks: [
      {
        type: 'simple-box', emoji: '🗺️',
        content: 'You tell a taxi driver "take me to Times Square" — you don\'t need to describe "go straight 300 meters, then turn right," because the driver already has the city map in their head. Playwright MCP gives an AI exactly that: when you say "go to this site and log in," the AI doesn\'t have to stare at a screenshot and guess pixel coordinates — it reads the page\'s "skeleton map" (the accessibility tree) and goes straight to the right element.',
      },
      {
        type: 'text',
        content: 'MCP (Model Context Protocol) is an open protocol that standardizes how an AI model talks to external tools (file systems, databases, browsers, APIs). Playwright MCP is the official MCP server published by Microsoft (npm package: @playwright/mcp), and it gives AI clients (Claude, Cursor, VS Code Copilot, etc.) the ability to control a real browser as a set of "tools" — browser_navigate, browser_click, browser_type, and so on.',
      },
      {
        type: 'callout', color: 'blue', emoji: '☕',
        title: 'If You Know Java:',
        content: 'Think of the MCP server like a Selenium Grid node exposing WebDriver commands over HTTP to outside clients — the difference is the client here is an AI model, not a human, and the protocol (JSON-RPC-based MCP) is purpose-built for AI tool calling. "Snapshot mode" gives the AI the page\'s DOM not as System.out.println(driver.getPageSource()), but as a structured tree (role + name + ref) similar to Selenium\'s Accessibility API — the AI clicks using a stable reference like "ref=e3", not a pixel coordinate.',
      },
      { type: 'heading', text: 'Key Features' },
      {
        type: 'grid', cols: 2,
        items: [
          { icon: '🌳', label: 'Accessibility-tree based', desc: 'No screenshots or vision models needed; the page is read as structured (role/name/ref) data — fast and deterministic.' },
          { icon: '🧰', label: 'Wide tool set', desc: 'browser_navigate, browser_click, browser_type, browser_snapshot, browser_take_screenshot, browser_select_option, browser_file_upload, browser_handle_dialog, browser_wait_for, browser_tabs, browser_network_requests, browser_console_messages...' },
          { icon: '👁️', label: 'Snapshot mode vs Vision mode', desc: 'Default: accessibility snapshot (text-based, fast). Vision mode: screenshot + coordinate-based clicking — for vision-capable models.' },
          { icon: '🔒', label: 'Isolated / persistent profile', desc: 'With --isolated, every session starts fresh (like incognito); with --user-data-dir, login state can persist.' },
          { icon: '🌐', label: 'Multi-engine', desc: 'Choose chromium, firefox, webkit, or msedge with --browser; run in the background with --headless.' },
          { icon: '🔐', label: 'Origin restriction', desc: 'With --allowed-origins / --blocked-origins, limit which sites the AI is allowed to reach — important for security.' },
        ],
      },
      { type: 'heading', text: 'Architecture — How a Request Gets Handled' },
      {
        type: 'visual', variant: 'flow', title: { tr: 'AI İsteğinden Tarayıcı Aksiyonuna', en: 'From AI Request to Browser Action' },
        steps: [
          { num: 1, label: 'User', desc: 'Natural-language request', highlight: true },
          { num: 2, label: 'AI Model', desc: 'Claude / Cursor / Copilot', highlight: false },
          { num: 3, label: 'MCP Protocol', desc: 'JSON-RPC (stdio/HTTP)', highlight: false },
          { num: 4, label: 'Playwright MCP Server', desc: '@playwright/mcp', highlight: true },
          { num: 5, label: 'Real Browser', desc: 'Chromium/Firefox/WebKit', highlight: true },
          { num: 6, label: 'Result', desc: 'Snapshot/screenshot → back to AI', highlight: false },
        ],
      },
      {
        type: 'playwright-visual',
        concept: 'mcp-flow',
        icon: '🔌',
        title: { tr: 'MCP Tool-Calling Döngüsü — Adım Adım', en: 'The MCP Tool-Calling Loop — Step by Step' },
        steps: [
          {
            id: 'prompt', label: 'User Prompt', labelEn: 'User Prompt', visualState: 'prompt',
            description: { tr: 'Kullanıcı doğal dilde bir görev tanımlar. AI, bu görevi tamamlamak için hangi browser_* tool\'unu çağıracağına karar verir.', en: 'The user describes a task in natural language. The AI decides which browser_* tool to call to accomplish it.' },
            code: `User: "go to example.com and\ntell me the title"`,
          },
          {
            id: 'tool-call', label: 'AI Calls a Tool', labelEn: 'AI Calls a Tool', visualState: 'tool-call',
            description: { tr: 'AI, MCP protokolü üzerinden browser_navigate({ url: ... }) çağrısı yapar. Bu çağrı MCP server\'a iletilir, server gerçek tarayıcıyı başlatıp URL\'e gider.', en: 'The AI makes a browser_navigate({ url: ... }) call over the MCP protocol. The call reaches the MCP server, which launches the real browser (if needed) and navigates to the URL.' },
            code: `browser_navigate({\n  url: "https://example.com"\n})`,
          },
          {
            id: 'snapshot', label: 'Accessibility Snapshot Returns', labelEn: 'Accessibility Snapshot Returns', visualState: 'snapshot',
            description: { tr: 'AI sayfayı "görmek" için browser_snapshot çağırır. Server, ekran görüntüsü DEĞİL, yapılandırılmış bir ağaç döner.', en: 'The AI calls browser_snapshot to "see" the page. The server returns NOT a screenshot, but a structured tree: every element\'s role, name, and a stable "ref" id.' },
            code: `- heading "Example Domain" [ref=e1]\n- link "More information..." [ref=e2]`,
          },
          {
            id: 'result', label: 'Action via Ref → Result', labelEn: 'Action via Ref → Result', visualState: 'result',
            description: { tr: 'AI artık piksel koordinatı tahmin etmez — doğrudan browser_click({ ref: "e2" }) çağırır.', en: 'The AI never has to guess pixel coordinates — it calls browser_click({ ref: "e2" }) directly. The action completes, the result returns to the AI, and the AI answers the user in natural language.' },
            code: `browser_click({ ref: "e2" })\n// ✅ AI: "Title: Example Domain"`,
          },
        ],
      },
      { type: 'heading', text: 'Installation — Step by Step' },
      {
        type: 'text',
        content: 'Prerequisite: Node.js 18+ must be installed (npx comes with it). A global install is NOT required — npx downloads the package on demand whenever it runs.',
      },
      {
        type: 'installation',
        title: { tr: '1) Önce komut satırından dene', en: '1) Test it from the command line first' },
        steps: [
          { cmd: 'npx @playwright/mcp@latest --help', explanation: { tr: 'Global kurulum gerekmez — npx paketi gerektiğinde indirir.', en: 'No global install needed — npx downloads the package on demand. The output should list flags like --browser, --headless, --isolated.' } },
          { cmd: 'npx @playwright/mcp@latest --version', explanation: { tr: 'Sürüm numarasını yazdırır.', en: 'Prints the version number — confirms the package downloaded correctly.' } },
        ],
      },
      {
        type: 'code', language: 'json',
        code: `// 2) Add to the config file for Claude Desktop
// macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
// Windows: %APPDATA%\\Claude\\claude_desktop_config.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}

// 3) For Claude Code (user- or project-level) — from the terminal:
// $ claude mcp add playwright npx @playwright/mcp@latest
// or add the same block by hand to .mcp.json.

// 4) Restart the client (Claude Desktop / Claude Code / Cursor).
// 5) Verify names like browser_navigate, browser_click, browser_snapshot
//    show up in the tool list.
// 6) Try your first command: "Go to https://example.com and tell me the page title."`,
      },
      {
        type: 'table',
        headers: ['Flag', 'What it does'],
        rows: [
          ['--browser=firefox', 'Use the firefox/webkit/msedge engine instead of chromium'],
          ['--headless', 'Run the browser without a visible window (in the background)'],
          ['--device="iPhone 13"', 'Start with mobile device emulation'],
          ['--isolated', 'Start every session fresh (like incognito, no persistent login)'],
          ['--user-data-dir=./profile', 'Keep login/cookie state persistent across sessions'],
          ['--allowed-origins=https://example.com', 'Restrict which origins the AI is allowed to navigate to'],
          ['--save-trace', 'Record the session as a Playwright trace (for later inspection)'],
          ['--vision', 'Use screenshot + coordinate-based mode instead of accessibility snapshots'],
        ],
      },
      {
        type: 'callout', color: 'amber', emoji: '🛡️',
        title: 'Security — Giving an AI a Real Browser Is Risky',
        content: 'An AI connected to Playwright MCP can fill in real forms and click real buttons (delete, purchase, submit). (1) Use --allowed-origins to lock the AI to a test/staging environment only. (2) Don\'t let the AI loose on real production payment/delete flows without human approval. (3) If you use --user-data-dir, remember the AI can also access whatever real sessions (personal email, banking, etc.) are logged into that profile — use a separate, isolated profile for testing.',
      },
      {
        type: 'git-practice',
        icon: '🎭',
        title: { tr: 'Kendin Dene — Doğru Kurulum Sırası', en: 'Try It Yourself — the Correct Setup Order' },
        intro: { tr: 'Playwright MCP\'yi bir AI istemcisine bağlamanın doğru sırasını yaz.', en: 'Write the correct order for connecting Playwright MCP to an AI client: test from the command line first, then add it to the config, then restart the client, then try your first command.' },
        starterCommands: {
          tr: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# Claude Code'u yeniden başlat
# "https://example.com'a git ve başlığı söyle" yaz`,
          en: `npx @playwright/mcp@latest --help
claude mcp add playwright npx @playwright/mcp@latest
# restart Claude Code
# type "go to https://example.com and tell me the title"`,
        },
        expectedSteps: [
          { pattern: '--help', label: { tr: '1) Paketin çalıştığını komut satırından doğrula', en: '1) Verify the package works from the command line' }, example: 'npx @playwright/mcp@latest --help' },
          { pattern: 'mcp add', label: { tr: '2) İstemciye MCP server\'ı ekle', en: '2) Add the MCP server to the client' }, example: 'claude mcp add playwright npx @playwright/mcp@latest' },
          { pattern: 'yeniden başlat|restart', label: { tr: '3) İstemciyi yeniden başlat', en: '3) Restart the client' }, example: '# restart the client' },
          { pattern: "git|tell me|söyle|adresine", label: { tr: '4) İlk doğal dil komutunu dene', en: '4) Try your first natural-language command' }, example: '"go to ... and tell me ..."' },
        ],
        successOutput: { tr: '✅ Doğru sıra!', en: '✅ Correct order! Verifying the package works first catches config mistakes (wrong command/path) early.' },
        retryOutput: { tr: '❌ Bir adım eksik veya sırası yanlış.', en: '❌ A step is missing or out of order.' },
      },
      {
        type: 'quiz',
        question: { tr: 'Playwright MCP\'nin varsayılan "snapshot mode"u, görüntü tanıma (vision) moduna göre neden genelde daha hızlı ve güvenilirdir?', en: 'Why is Playwright MCP\'s default "snapshot mode" usually faster and more reliable than vision mode?' },
        options: [
          { id: 'a', text: 'Snapshot mode doesn\'t require an internet connection' },
          { id: 'b', text: 'Snapshot mode gives the page as structured (role/name/ref) data; the AI never has to guess pixel coordinates or run a vision model — it goes straight to a stable element via its ref' },
          { id: 'c', text: 'Vision mode only works on mobile devices' },
          { id: 'd', text: 'There is no performance difference between the two' },
        ],
        correct: 'b',
        explanation: { tr: 'Accessibility tree, sayfanın anlamsal yapısını doğrudan verir. AI bu yapıdaki "ref" kimliğini kullanarak hatasız tıklar — ekran görüntüsünden piksel koordinatı çıkarmaya gerek kalmaz.', en: 'The accessibility tree gives the page\'s semantic structure (buttons, links, textboxes + their names) directly. The AI clicks reliably using the "ref" id in that structure — no need to infer pixel coordinates from a screenshot (and no need for a separate vision model to do it).' },
      
        retryQuestion: {
      "question": {
            "tr": "Görüntü tanıma (vision) moduna kıyasla snapshot mode kullanılmasının test otomasyonundaki doğruluk payı üzerindeki etkisi nedir?",
            "en": "What is the effect of using snapshot mode on test automation accuracy compared to vision mode?"
      },
      "options": [
            {
                  "id": "a",
                  "text": {
                        "tr": "Snapshot mode, görsel karmaşaya karşı daha duyarlı olduğu için hata payı artar.",
                        "en": "Snapshot mode has a higher error rate as it is more sensitive to visual clutter."
                  }
            },
            {
                  "id": "b",
                  "text": {
                        "tr": "Snapshot mode, yapısal veri kullandığı için AI'nın yanlış elemana tıklama riskini azaltır ve görsel modeldeki belirsizlikleri ortadan kaldırır.",
                        "en": "Snapshot mode uses structured data, which minimizes the risk of the AI clicking the wrong element and eliminates the uncertainties associated with visual models."
                  }
            },
            {
                  "id": "c",
                  "text": {
                        "tr": "Görsel modeller her zaman snapshot mode'dan daha hatasız çalışır.",
                        "en": "Visual models always perform more accurately than snapshot mode."
                  }
            },
            {
                  "id": "d",
                  "text": {
                        "tr": "Snapshot mode sadece basit web sitelerinde çalışır, karmaşık yapılarda hata verir.",
                        "en": "Snapshot mode only works on simple websites and fails on complex structures."
                  }
            }
      ],
      "correct": "b",
      "explanation": {
            "tr": "Vision (görüntü) modelleri piksel ve görsel ipuçlarına dayandığı için bazen yanlış elemanları tahmin edebilir. Snapshot mode ise sayfanın yapısal (DOM/Accessibility) bilgisini kullandığı için elemanları kimliklerine göre tanımlar, bu da hatalı etkileşim riskini minimize eder.",
            "en": "Vision models rely on pixels and visual cues, which can occasionally lead to misinterpretation. Snapshot mode uses structural (DOM/Accessibility) information to identify elements by their inherent properties, thereby minimizing the risk of incorrect interactions."
      }
}
},
    ],
  },
}

export const playwrightData = {
  tr: {
    hero: {
      title: '🎭 Playwright — Modern Tarayıcı Otomasyonu',
      subtitle: 'TypeScript · Java · Python ile öğren, Selenium ile karşılaştır',
      intro: 'Microsoft\'un geliştirdiği Playwright, Chrome, Firefox ve Safari\'yi tek API ile kontrol eder. Auto-wait, network mocking ve paralel test desteğiyle modern QA\'nın vazgeçilmezi.',
    },
    tabs: [
      '🎭 Playwright Nedir?',
      '⚙️ Kurulum',
      '🖱️ Temel Aksiyonlar',
      '🎯 Locator Stratejileri',
      '⏳ Bekleme & Wait',
      '✅ Assertions',
      '🗂️ Test Organizasyonu',
      '📦 Page Object Model',
      '🖼️ iframe · Alert · Popup',
      '📁 Dosya · Network · API',
      '🐞 Debugging & Trace',
      '🎬 Codegen',
      '🔌 Playwright MCP',
      '⚡ Paralel & CI/CD',
      '🔐 Auth & Session',
      '🌍 Gerçek Hayat',
      '🚨 Yaygın Hatalar',
      '💼 50 Mülakat Sorusu',
    ],
    sections: [s0.tr, s1.tr, s2.tr, s3.tr, s4.tr, s10.tr, s11.tr, s12.tr, s5.tr, s6.tr, s13.tr, s16.tr, s17.tr, s14.tr, s15.tr, s7.tr, s8.tr, s9.tr],
  },
  en: {
    hero: {
      title: '🎭 Playwright — Modern Browser Automation',
      subtitle: 'Learn with TypeScript · Java · Python, compare with Selenium',
      intro: 'Developed by Microsoft, Playwright controls Chrome, Firefox and Safari with a single API. Auto-wait, network mocking and parallel tests make it essential for modern QA engineers.',
    },
    tabs: [
      '🎭 What is Playwright?',
      '⚙️ Installation',
      '🖱️ Basic Actions',
      '🎯 Locator Strategies',
      '⏳ Wait Mechanisms',
      '✅ Assertions',
      '🗂️ Test Organization',
      '📦 Page Object Model',
      '🖼️ iframe · Alert · Popup',
      '📁 File · Network · API',
      '🐞 Debugging & Trace',
      '🎬 Codegen',
      '🔌 Playwright MCP',
      '⚡ Parallel & CI/CD',
      '🔐 Auth & Sessions',
      '🌍 Real World',
      '🚨 Common Errors',
      '💼 50 Interview Questions',
    ],
    sections: [s0.en, s1.en, s2.en, s3.en, s4.en, s10.en, s11.en, s12.en, s5.en, s6.en, s13.en, s16.en, s17.en, s14.en, s15.en, s7.en, s8.en, s9.en],
  },
}
