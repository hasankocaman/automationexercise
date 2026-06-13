// playwrightData.js — Playwright tam öğrenme sayfası
// 10 bölüm: Intro, Kurulum, Aksiyonlar, Locator, Wait, iframe/Alert, Dosya/Network, Gerçek Hayat, Hatalar, 50 Mülakat

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
      '🖼️ iframe · Alert · Popup',
      '📁 Dosya · Network · API',
      '🌍 Gerçek Hayat',
      '🚨 Yaygın Hatalar',
      '💼 50 Mülakat Sorusu',
    ],
    sections: [s0.tr, s1.tr, s2.tr, s3.tr, s4.tr, s5.tr, s6.tr, s7.tr, s8.tr, s9.tr],
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
      '🖼️ iframe · Alert · Popup',
      '📁 File · Network · API',
      '🌍 Real World',
      '🚨 Common Errors',
      '💼 50 Interview Questions',
    ],
    sections: [s0.en, s1.en, s2.en, s3.en, s4.en, s5.en, s6.en, s7.en, s8.en, s9.en],
  },
}
